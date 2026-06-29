/**
 * 89-doc `id` backfill codemod — core (Spec 119-A, Task 4.3 / design B2).
 *
 * Writes the literal `id:` into the frontmatter of docs that lack one, freezing
 * the DERIVED slug onto disk so the resolver never re-derives it. FRONTMATTER
 * ONLY — the document body is never touched.
 *
 * Hard ordering (design B2 / Task 2.1 BLOCKING): the frontmatter `id`/`idSource`
 * READER (Task 2.1) must land before this WRITER. The codemod's idempotency skip
 * ("`id:` already present → skip") depends on the reader; reader-before-writer or
 * a re-run double-writes.
 *
 * Collision-surfacing duty (design B2): before writing anything, the codemod runs
 * `checkIdUniqueness` semantics over its PLANNED writes (the existing on-disk
 * `id:`s PLUS the ids it is about to write) and HALTS on any derived collision,
 * emitting both colliding paths for human adjudication. It NEVER writes colliding
 * `id:` values silently — that would defeat the build-time guard's purpose.
 *
 * `idSource: 'none'` docs (no `id:`, no `name:`, no usable H1) are surfaced as
 * EXPLICIT EXCEPTIONS — never written `id: ''`.
 *
 * Idempotent: a second run finds `id:` present (`idSource: 'frontmatter'`) and
 * skips. Re-runnable; partial failure is safe to re-run.
 *
 * Owner: Thurgood / Docs-MCP infra.
 */

import * as fs from 'fs';
import {
  scanCorpus,
  verdictFromScan,
  ScannedDoc,
  IdGuardResult,
} from './check-id-uniqueness';

export interface BackfillPlanRow {
  relPath: string;
  absPath: string;
  /** The id that WILL be written (the derived slug). */
  id: string;
  /** Which derivation produced it. */
  idSource: 'derived-name' | 'derived-h1';
}

export interface BackfillResult {
  /** Docs that received a freshly-written literal `id:`. */
  written: BackfillPlanRow[];
  /** Docs skipped because they already had an on-disk `id:` (idempotency). */
  skipped: string[];
  /** Docs with no derivable id (`idSource: 'none'`) — surfaced, NOT written. */
  exceptions: string[];
  /** Total docs scanned. */
  totalDocs: number;
  /** true iff a write (or, in dry-run, a planned write) actually occurred. */
  changed: boolean;
}

/** Raised when the planned writes contain a derived collision — HALT. */
export class BackfillCollisionError extends Error {
  constructor(public readonly collisions: Record<string, string[]>) {
    super(
      'Backfill HALTED — derived `id` collision in the planned writes. ' +
        'Two or more docs derive the same id; human adjudication required ' +
        '(do NOT write colliding ids). Colliding ids → paths:\n' +
        Object.entries(collisions)
          .map(([id, paths]) => `  ${id}: ${paths.join(', ')}`)
          .join('\n'),
    );
    this.name = 'BackfillCollisionError';
  }
}

/**
 * Build the projected post-backfill scan: take the current on-disk scan and,
 * for every doc that WOULD receive a written id, mark its idSource as
 * 'frontmatter' (because after the write the id is explicit on disk). This is the
 * exact corpus state the guard would see after a successful backfill, so running
 * `verdictFromScan` over it surfaces any collision the writes would create —
 * INCLUDING a derived id colliding with an already-frozen explicit id.
 */
function projectPlannedWrites(docs: ScannedDoc[]): ScannedDoc[] {
  return docs.map((d) => {
    if (d.idSource === 'derived-name' || d.idSource === 'derived-h1') {
      // After backfill this id is frozen explicit on disk.
      return { ...d, idSource: 'frontmatter' as const };
    }
    return d;
  });
}

/**
 * Insert a literal `id:` line into a doc's frontmatter block, FRONTMATTER ONLY.
 *
 * Placement: immediately after the opening `---` fence (top of the block) so the
 * id is the first frontmatter field and the body is provably untouched. Throws if
 * the doc has no opening `---` fence (should never happen for a doc whose id was
 * derived from `name:`; an H1-only doc with no frontmatter block is handled by
 * the no-frontmatter branch).
 */
export function insertIdIntoFrontmatter(content: string, id: string): string {
  const idLine = `id: ${id}`;

  if (content.startsWith('---')) {
    // Insert right after the opening fence line.
    const nl = content.indexOf('\n');
    if (nl === -1) {
      // Degenerate single-line `---` — treat as no usable block.
      return `---\n${idLine}\n---\n\n${content}`;
    }
    const head = content.slice(0, nl); // the opening '---'
    const rest = content.slice(nl + 1); // everything after the opening fence
    return `${head}\n${idLine}\n${rest}`;
  }

  // No frontmatter block at all (an H1-derived id on a doc with no `---` block):
  // create a minimal frontmatter block at the very top, body preserved verbatim.
  return `---\n${idLine}\n---\n\n${content}`;
}

/**
 * Run the backfill over the given roots.
 *
 * @param roots        filesystem roots to scan/backfill (relative to projectRoot or absolute)
 * @param projectRoot  repo root — report paths relative to it
 * @param opts.dryRun  when true, plan + collision-check but DO NOT write to disk
 */
export function backfillDocIds(
  roots: string[],
  projectRoot: string,
  opts: { dryRun?: boolean } = {},
): BackfillResult {
  const docs = scanCorpus(roots, projectRoot);

  // 1) Collision-surfacing duty FIRST: run guard semantics over the PROJECTED
  //    post-write corpus. HALT before any write if a derived collision exists.
  const projected = projectPlannedWrites(docs);
  const verdict: IdGuardResult = verdictFromScan(projected);
  if (!verdict.ok) {
    throw new BackfillCollisionError(verdict.collisions);
  }

  // 2) Partition into write / skip / exception.
  const written: BackfillPlanRow[] = [];
  const skipped: string[] = [];
  const exceptions: string[] = [];

  for (const d of docs) {
    if (d.idSource === 'frontmatter') {
      skipped.push(d.relPath); // already has on-disk `id:` — idempotency skip
      continue;
    }
    if (d.idSource === 'none' || !d.id) {
      exceptions.push(d.relPath); // unaddressable — surface, never write id: ''
      continue;
    }
    written.push({
      relPath: d.relPath,
      absPath: d.absPath,
      id: d.id,
      idSource: d.idSource,
    });
  }

  // 3) Apply the writes (frontmatter only) unless dry-run.
  if (!opts.dryRun) {
    for (const row of written) {
      const content = fs.readFileSync(row.absPath, 'utf-8');
      const next = insertIdIntoFrontmatter(content, row.id);
      fs.writeFileSync(row.absPath, next, 'utf-8');
    }
  }

  return {
    written,
    skipped: skipped.sort(),
    exceptions: exceptions.sort(),
    totalDocs: docs.length,
    changed: written.length > 0,
  };
}
