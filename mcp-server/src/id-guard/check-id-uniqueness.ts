/**
 * Build-time `id` uniqueness guard — core (Spec 119-A, Task 4.1 / Component 4).
 *
 * Scans the on-disk steering corpus across BOTH roots — `governance/` (future;
 * does not exist yet — handled gracefully as empty) and `.kiro/steering/`
 * (identity docs) — and fails on any `id` collision, explicit OR derived. A
 * derived collision (two same-titled docs slugging to the same id) is treated
 * IDENTICALLY to an explicit one (design Decision 3 + B2): the guard's purpose
 * is to surface the slug clash BEFORE the backfill codemod freezes a duplicate
 * `id:` onto disk.
 *
 * Owner: Thurgood / Docs-MCP infra (same owner as the resolver + the legacy-path
 * producer — this is the third leg of the addressing-plane integrity machinery).
 *
 * `id` derivation REUSES the resolver's exactly — `extractFrontmatterInfo`
 * (explicit `id:` → slug of `name:` → slug of H1 → none). It does NOT reinvent
 * slug derivation. This is the SAME logic the Task 3 manifest producer used, so
 * the guard's view of every doc's id is consistent with the frozen manifest.
 *
 * ONE FUNCTION, TWO CALLERS (design B1): `checkIdUniqueness` is exported once and
 * invoked from BOTH the net-new `npm run check:id-uniqueness` CI script (the
 * backstop) AND the Thurgood metadata-validation hook (the day-to-day front
 * line). There is no second copy of this logic.
 *
 * On-disk filesystem paths vs. resolver indexed keys: the returned `collisions`
 * values are filesystem paths (relative to the project root), DISTINCT from the
 * resolver's indexed relative keys. The guard runs at build time over files on
 * disk; the resolver runs at query time over the in-memory index.
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractFrontmatterInfo } from '../indexer/frontmatter-parser';

export interface IdGuardResult {
  /** true iff no collisions (explicit or derived) across the scanned corpus. */
  ok: boolean;
  /**
   * id → [on-disk file paths] for any id claimed by >1 doc (explicit OR derived).
   * NOTE: the guard scans the on-disk corpus across both roots, so these are
   * filesystem paths — distinct from the resolver's indexed (relative) keys.
   */
  collisions: Record<string, string[]>;
  /**
   * On-disk file paths of docs whose id is DERIVED (no on-disk `id:` yet) — the
   * backfill worklist (Task 4.3). `idSource` of `derived-name` or `derived-h1`.
   */
  derived: string[];
  /** Total docs scanned across both roots. Expected 89 on the current corpus. */
  totalDocs: number;
  /**
   * On-disk file paths of docs with NO derivable id (`idSource: 'none'` — no
   * `id:`, no `name:`, no usable H1). Surfaced as EXPLICIT EXCEPTIONS for human
   * adjudication; never silently slugged to '' and never written `id: ''`.
   * (Additive to the design's IdGuardResult — does not change `ok`/`collisions`.)
   */
  exceptions: string[];
}

/** A single scanned doc's id view (internal). */
export interface ScannedDoc {
  /** Filesystem path relative to the project root (the collision-report unit). */
  relPath: string;
  /** Absolute path on disk. */
  absPath: string;
  /** Derived/explicit id, or undefined when idSource is 'none'. */
  id?: string;
  idSource: ReturnType<typeof extractFrontmatterInfo>['idSource'];
}

/** Recursively collect every `.md` file under a root (absolute paths). */
function collectMarkdownFiles(rootAbs: string): string[] {
  if (!fs.existsSync(rootAbs)) return []; // governance/ may not exist yet — empty
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(abs);
      else if (entry.isFile() && entry.name.endsWith('.md')) out.push(abs);
    }
  };
  walk(rootAbs);
  return out;
}

/**
 * Scan the corpus across the given roots and compute each doc's id view.
 *
 * @param roots        the roots to scan (absolute, OR relative to projectRoot)
 * @param projectRoot  repo root — collision paths are reported relative to it
 */
export function scanCorpus(roots: string[], projectRoot: string): ScannedDoc[] {
  const docs: ScannedDoc[] = [];
  for (const root of roots) {
    const rootAbs = path.isAbsolute(root) ? root : path.join(projectRoot, root);
    for (const absPath of collectMarkdownFiles(rootAbs)) {
      const content = fs.readFileSync(absPath, 'utf-8');
      const fm = extractFrontmatterInfo(content);
      docs.push({
        relPath: path.relative(projectRoot, absPath),
        absPath,
        id: fm.id,
        idSource: fm.idSource,
      });
    }
  }
  // Stable order (deterministic reports/worklists).
  docs.sort((a, b) => a.relPath.localeCompare(b.relPath));
  return docs;
}

/**
 * Compute the uniqueness verdict from an already-scanned set of docs. Factored
 * out so the backfill codemod can run the SAME collision semantics over its
 * PLANNED writes (Task 4.3 B2) without re-reading disk.
 */
export function verdictFromScan(docs: ScannedDoc[]): IdGuardResult {
  const byId = new Map<string, string[]>(); // id → relPaths
  const derived: string[] = [];
  const exceptions: string[] = [];

  for (const d of docs) {
    if (d.idSource === 'none' || !d.id) {
      exceptions.push(d.relPath);
      continue;
    }
    if (d.idSource === 'derived-name' || d.idSource === 'derived-h1') {
      derived.push(d.relPath);
    }
    const list = byId.get(d.id) ?? [];
    list.push(d.relPath);
    byId.set(d.id, list);
  }

  const collisions: Record<string, string[]> = {};
  for (const [id, paths] of byId) {
    if (paths.length > 1) collisions[id] = paths.slice().sort();
  }

  return {
    ok: Object.keys(collisions).length === 0,
    collisions,
    derived: derived.slice().sort(),
    totalDocs: docs.length,
    exceptions: exceptions.slice().sort(),
  };
}

/**
 * Scans BOTH `governance/` and `.kiro/steering/` (identity docs) and fails on
 * any id collision (explicit OR derived). Default `projectRoot` is the repo root
 * (two levels up from this file's compiled location is fragile; callers pass it).
 *
 * @param roots        filesystem roots to scan (relative to projectRoot or absolute)
 * @param projectRoot  repo root — collision paths are reported relative to it
 */
export function checkIdUniqueness(
  roots: string[],
  projectRoot: string = process.cwd(),
): IdGuardResult {
  return verdictFromScan(scanCorpus(roots, projectRoot));
}

/** The two on-disk roots of the steering corpus (relative to project root). */
export const STEERING_ROOTS = ['governance', '.kiro/steering'] as const;
