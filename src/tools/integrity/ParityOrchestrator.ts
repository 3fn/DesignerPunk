/**
 * ParityOrchestrator (Spec 118, Increment 2 — Task 7.1 / R4 AC1, AC3).
 *
 * INVESTIGATION-ONLY. This is a NEW thin orchestrator that compares TWO FRESH
 * token trees produced by the SAME generator script under two different runtime
 * mechanisms (root A = ts-node-produced, root B = tsx-produced). It exists to
 * answer one question: does the runtime-resolution mechanism cause any *semantic*
 * divergence in generated output? (Increment 2 informs but does NOT pre-decide
 * the Task-8 direction; no swap/reconcile/migrate happens here.)
 *
 * SEAM (Ada MF-1 correction): the orchestrator reuses 117's
 * `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)`
 * DIRECTLY, iterating `INVENTORY` (`inventory.ts`) as the artifact-list driver.
 * These are PER-ARTIFACT, not per-tree, so the orchestrator reads each inventory
 * path from root A and root B, normalizes both sides with the SAME extended rule
 * set, and compares. `compare` is symmetric — the `committedValue`/`freshValue`
 * field labels are cosmetic in a parity context (here: A = "committed" slot,
 * B = "fresh" slot, purely positional).
 *
 * FORBIDDEN (and avoided): routing through `GenerationIntegrityCheckImpl` (it is
 * hardwired committed-vs-fresh — one FreshGenerator + reads committed itself, so
 * it cannot ingest TWO fresh trees); writing a second normalization/comparison
 * engine. This module is thin glue over the reused normalize+compare.
 *
 * The `FreshGenerator` abstraction is NOT needed for the two-tree seam — two roots
 * suffice. We read each tree's files directly with `fs` (the trivial read; the
 * `DiskFreshGenerator` adapter is available as a per-tree reader but adds nothing
 * here). See `runParity`'s `readArtifact`.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { INVENTORY } from './inventory';
import { Normalizer } from './Normalizer';
import { SemanticComparator } from './SemanticComparator';
import { PARITY_NORMALIZATION_RULES } from './ParityNormalizationRules';
import { ArtifactRef, Divergence, NormalizationRule } from './types';

/** How an artifact resolved on one side. */
export type ArtifactPresence = 'present' | 'absent';

/** Per-artifact parity outcome. */
export interface ArtifactParityResult {
  artifact: ArtifactRef;
  presenceA: ArtifactPresence;
  presenceB: ArtifactPresence;
  /** Semantic parity AFTER normalization. */
  semanticParity: 'green' | 'red';
  /** Raw (pre-normalization) byte equality — diagnostic only. */
  rawIdentical: boolean;
  /** Post-normalization divergences (empty when green). */
  divergences: Divergence[];
  notes: string;
}

export interface ParityReport {
  results: ArtifactParityResult[];
  /** True iff every NON-optional artifact is semantically green. */
  allGreen: boolean;
}

/** Mechanism descriptor: a runner CLI that executes the generator script. */
export interface Mechanism {
  label: string;
  /** argv prefix, e.g. ['npx', 'ts-node'] or ['npx', 'tsx']. */
  argv: string[];
}

export const TS_NODE_MECHANISM: Mechanism = { label: 'ts-node', argv: ['npx', 'ts-node'] };
export const TSX_MECHANISM: Mechanism = { label: 'tsx', argv: ['npx', 'tsx'] };

/**
 * Generate a fresh tree by running the generator script in a scratch cwd via the
 * given mechanism. The generator reads token SOURCES from package-relative module
 * paths but WRITES to cwd-relative dist/ + token-index/ — so a scratch cwd with
 * no config yields a clean DEFAULTS tree there. Returns the scratch root.
 *
 * Caller owns cleanup (see `withParityTrees`).
 */
export function generateFreshTree(opts: {
  mechanism: Mechanism;
  generatorScript: string;
  repoRoot: string;
}): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `parity-${opts.mechanism.label}-`));
  const [cmd, ...rest] = opts.mechanism.argv;
  const res = spawnSync(cmd, [...rest, opts.generatorScript], {
    cwd: root,
    encoding: 'utf-8',
    // macOS has no `timeout`; rely on natural exit. Generous belt-and-suspenders.
    timeout: 600_000,
  });
  if (res.status !== 0) {
    const tail = `${res.stdout ?? ''}\n${res.stderr ?? ''}`.trim().split('\n').slice(-15).join('\n');
    // Best-effort cleanup before throwing.
    try {
      fs.rmSync(root, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
    throw new Error(
      `[${opts.mechanism.label}] generator exited ${res.status ?? 'null (signal ' + res.signal + ')'}:\n${tail}`,
    );
  }
  return root;
}

/** Read an artifact from a tree root; null when absent (ENOENT); rethrow other I/O. */
function readArtifact(root: string, relPath: string): string | null {
  try {
    return fs.readFileSync(path.resolve(root, relPath), 'utf-8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

/**
 * Compare two already-produced fresh roots per-artifact over `INVENTORY`, reusing
 * 117's Normalizer + SemanticComparator directly. PURE over the two roots — no
 * subprocess, no temp dirs — so it is directly unit-testable against fixture trees.
 */
export function compareTrees(opts: {
  rootA: string;
  rootB: string;
  rules?: NormalizationRule[];
  inventory?: ArtifactRef[];
}): ParityReport {
  const normalizer = new Normalizer(opts.rules ?? PARITY_NORMALIZATION_RULES);
  const comparator = new SemanticComparator();
  const inventory = opts.inventory ?? INVENTORY;

  const results: ArtifactParityResult[] = inventory.map((artifact) => {
    const rawA = readArtifact(opts.rootA, artifact.path);
    const rawB = readArtifact(opts.rootB, artifact.path);
    const presenceA: ArtifactPresence = rawA === null ? 'absent' : 'present';
    const presenceB: ArtifactPresence = rawB === null ? 'absent' : 'present';

    // Optional artifact absent on BOTH sides is not a divergence (e.g. dist/product/*).
    if (rawA === null && rawB === null) {
      return {
        artifact,
        presenceA,
        presenceB,
        semanticParity: artifact.optional ? 'green' : 'red',
        rawIdentical: true,
        divergences: [],
        notes: artifact.optional ? 'optional; absent on both (not a divergence)' : 'MISSING on both sides',
      };
    }

    // Present on exactly one side → genuine presence divergence.
    if (rawA === null || rawB === null) {
      return {
        artifact,
        presenceA,
        presenceB,
        semanticParity: 'red',
        rawIdentical: false,
        divergences: [],
        notes: `present on only one side (A=${presenceA}, B=${presenceB})`,
      };
    }

    const rawIdentical = rawA === rawB;
    const normA = normalizer.normalize(rawA, artifact.kind);
    const normB = normalizer.normalize(rawB, artifact.kind);
    const divergences = comparator.compare(artifact, normA, normB);
    const green = divergences.length === 0;

    return {
      artifact,
      presenceA,
      presenceB,
      semanticParity: green ? 'green' : 'red',
      rawIdentical,
      divergences,
      notes: green
        ? rawIdentical
          ? 'byte-identical'
          : 'raw differs (volatile only); semantically equal after normalization'
        : `${divergences.length} semantic divergence(s)`,
    };
  });

  const allGreen = results.every((r) => r.artifact.optional || r.semanticParity === 'green');
  return { results, allGreen };
}

/**
 * Full end-to-end parity run: produce both fresh trees via the two mechanisms,
 * compare, clean up the scratch trees. The thin top-level entry the standalone
 * runner calls.
 */
export function runParity(opts: {
  generatorScript: string;
  repoRoot: string;
  mechanismA?: Mechanism;
  mechanismB?: Mechanism;
  rules?: NormalizationRule[];
}): ParityReport {
  const mechanismA = opts.mechanismA ?? TS_NODE_MECHANISM;
  const mechanismB = opts.mechanismB ?? TSX_MECHANISM;
  let rootA: string | undefined;
  let rootB: string | undefined;
  try {
    rootA = generateFreshTree({ mechanism: mechanismA, generatorScript: opts.generatorScript, repoRoot: opts.repoRoot });
    rootB = generateFreshTree({ mechanism: mechanismB, generatorScript: opts.generatorScript, repoRoot: opts.repoRoot });
    return compareTrees({ rootA, rootB, rules: opts.rules });
  } finally {
    for (const r of [rootA, rootB]) {
      if (r) {
        try {
          fs.rmSync(r, { recursive: true, force: true });
        } catch {
          /* leave nothing behind on a best-effort basis */
        }
      }
    }
  }
}

/** Render the green/red table to a string (the runner prints it). */
export function renderTable(report: ParityReport, mechA: string, mechB: string): string {
  const lines: string[] = [];
  const pad = (s: string, w: number) => s.padEnd(w);
  const pathW = Math.max(8, ...report.results.map((r) => r.artifact.path.length));
  const header = [pad('artifact', pathW), pad(mechA, 8), pad(mechB, 8), pad('parity', 8), 'notes'].join(' | ');
  lines.push('');
  lines.push('=== Spec 118 Parity Table (two fresh trees; normalized; NOT jest) ===');
  lines.push('');
  lines.push(header);
  lines.push('-'.repeat(header.length));
  for (const r of report.results) {
    lines.push(
      [
        pad(r.artifact.path, pathW),
        pad(r.presenceA, 8),
        pad(r.presenceB, 8),
        pad(r.semanticParity, 8),
        r.notes,
      ].join(' | '),
    );
  }
  lines.push('');
  lines.push(`Result: ${report.allGreen ? 'ALL GREEN (every non-optional artifact semantically equal)' : 'RED — semantic divergence present'}`);
  lines.push('');
  return lines.join('\n');
}
