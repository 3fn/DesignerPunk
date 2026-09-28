/**
 * The regenerate-and-diff guard (C6) — Spec 122 Task 6.1.
 *
 * design.md § "C6 — The regenerate-and-diff guard":
 *   (1) validate + regenerate everything into a TEMP tree ({@link generateAll} — the same
 *       code path real regeneration uses, so the guard cannot diverge from generation);
 *   (2) compare temp tree vs the working tree BIDIRECTIONALLY over the guarded roots
 *       (a hand-edited file, a stale extra, or a missing output all FAIL, with per-file
 *       detail in the report);
 *   (3) any delta → FAIL loud.
 *
 * FAST NO-OP (DD7 — the input-closure lock): `canonical/generated.lock` records
 * `sha256(inputClosure)` + `sha256(outputs)`. The input closure is COMPLETE over everything
 * the pipeline reads — including the two resolve-by-id roots `governance/**` and
 * `.kiro/steering/**` (the S-D3 fix: an edit to a resolved-and-embedded section changes
 * output without touching any other root; omitting these roots would let a stale lock pass
 * green with wrong outputs). The output hash covers the sorted `(path, content-hash)` pairs
 * over the guarded surface (S-D5: an added/dropped surface breaks the lock, not only a
 * changed byte). Both match → early-exit green in seconds (no MCP boots, no generation);
 * either mismatch → full run.
 *
 * OPERATIVE-SET FRESHNESS (Spec 123 Task 13.6; design C16): {@link runGuard} runs the
 * `operative-set-freshness` sweep (regrounding/freshness.ts) FIRST, on every run — including the
 * fast no-op path, which would otherwise skip it — and FAILs on any finding without refreshing
 * the lock. The sweep reads only the filesystem (no generation, no MCP), and `generate.ts` is
 * loaded lazily, so the sweep's verdict does not depend on the generation inputs being present.
 *
 * CLI: `npx tsx tools/agent-generator/diff-guard.ts [--root <dir>]`. `--root` (added at 13.6)
 * points the guard at another tree — the STANDING stale-unit fixture test uses it. Default: the
 * repo this file lives in.
 *
 * Traces to: Req 17 (all ACs), Req 20 AC2 (fast no-op without path-filtering), DD7, S-D3/S-D5;
 * Spec 123 Req 11.6.5d, design C16.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { formatFreshness, runFreshnessSweep, type FreshnessReport } from './regrounding/freshness';

/**
 * `generate.ts` loaded on first use, not at import: it pulls the generation pipeline (and the
 * MCP dist it reads), which the freshness sweep never needs. Same lazy-require idiom generate.ts
 * uses for coverage-map.ts.
 */
const generation = (): typeof import('./generate') => require('./generate') as typeof import('./generate');
const guardedRoots = (repoRoot?: string): string[] => generation().guardedRoots(repoRoot);

// ============================================================================
// Hashing (pure over injected file lists — unit-testable without the repo)
// ============================================================================

/** The DD7 input-closure roots + files. Every source the resolver reads by id is a root. */
export const INPUT_CLOSURE_ROOTS: readonly string[] = [
  'canonical',
  'skills',
  'tools/agent-generator',
  'mcp-server/src',
  'application-mcp-server/src',
  'product-mcp-server/src',
  'governance', //          resolve-by-id root (S-D3)
  '.kiro/steering', //      resolve-by-id root (S-D3)
];
export const INPUT_CLOSURE_FILES: readonly string[] = ['package.json', '.kiro/hooks/complete-task.sh'];

/** Recursively list files under `dir` (repo-relative paths), sorted; empty if absent. */
export function listFilesUnder(repoRoot: string, rel: string): string[] {
  const abs = path.join(repoRoot, rel);
  if (!fs.existsSync(abs)) return [];
  const results: string[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.isFile()) results.push(path.relative(repoRoot, p));
    }
  };
  const stat = fs.statSync(abs);
  if (stat.isFile()) return [rel];
  walk(abs);
  return results.sort();
}

function sha256(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/** Hash a set of files as sorted `(path, content-hash)` pairs (S-D5's shape). */
export function hashFileSet(repoRoot: string, relPaths: readonly string[]): string {
  const pairs = [...relPaths]
    .sort()
    .map((rel) => `${rel}\x00${sha256(fs.readFileSync(path.join(repoRoot, rel)))}`);
  return sha256(pairs.join('\n'));
}

/** The lock's input leg: hash of every file under the closure roots + the named files. */
export function computeInputClosureHash(repoRoot: string): string {
  // The lock itself lives under canonical/ — exclude it, or every refresh would
  // invalidate the closure it just recorded.
  const files = [
    ...INPUT_CLOSURE_ROOTS.flatMap((root) => listFilesUnder(repoRoot, root)),
    ...INPUT_CLOSURE_FILES.filter((f) => fs.existsSync(path.join(repoRoot, f))),
  ].filter((rel) => rel !== LOCK_PATH);
  return hashFileSet(repoRoot, files);
}

/**
 * `.gitkeep` placeholders are SCAFFOLDING, not generated surface (Task 1.1 created the
 * guarded dirs with them before any generation existed). They are excluded from the
 * guarded-surface comparison and output hash — but stay in the INPUT closure, where a
 * change to one is harmlessly conservative (forces a full run).
 */
export function isScaffolding(rel: string): boolean {
  return path.basename(rel) === '.gitkeep';
}

/** The lock's output leg: hash of the guarded roots' current on-disk contents. */
export function computeOutputsHash(repoRoot: string): string {
  const files = guardedRoots(repoRoot)
    .flatMap((root) => listFilesUnder(repoRoot, root))
    .filter((rel) => !isScaffolding(rel));
  return hashFileSet(repoRoot, files);
}

// ============================================================================
// The lock
// ============================================================================

export const LOCK_PATH = 'canonical/generated.lock';

export interface GeneratedLock {
  inputClosure: string;
  outputs: string;
}

export function readLock(repoRoot: string): GeneratedLock | undefined {
  const p = path.join(repoRoot, LOCK_PATH);
  if (!fs.existsSync(p)) return undefined;
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8')) as GeneratedLock;
  } catch {
    return undefined; // an unreadable lock is a stale lock — full run
  }
}

export function writeLock(repoRoot: string, lock: GeneratedLock): void {
  fs.writeFileSync(path.join(repoRoot, LOCK_PATH), `${JSON.stringify(lock, null, 2)}\n`);
}

// ============================================================================
// Bidirectional tree compare (pure over two roots — unit-testable)
// ============================================================================

export interface TreeDelta {
  /** In the regenerated tree but byte-different on disk (hand-edit or un-regenerated source change). */
  changed: string[];
  /** Regenerated but absent from the working tree. */
  missing: string[];
  /** Present under a guarded root on disk but NOT regenerated (stale extra). */
  extra: string[];
}

export function compareTrees(freshRoot: string, repoRoot: string, roots: readonly string[]): TreeDelta {
  const delta: TreeDelta = { changed: [], missing: [], extra: [] };
  const freshFiles = new Set(roots.flatMap((r) => listFilesUnder(freshRoot, r)).filter((f) => !isScaffolding(f)));
  const treeFiles = new Set(roots.flatMap((r) => listFilesUnder(repoRoot, r)).filter((f) => !isScaffolding(f)));

  for (const rel of [...freshFiles].sort()) {
    if (!treeFiles.has(rel)) {
      delta.missing.push(rel);
    } else {
      const a = fs.readFileSync(path.join(freshRoot, rel));
      const b = fs.readFileSync(path.join(repoRoot, rel));
      if (!a.equals(b)) delta.changed.push(rel);
    }
  }
  for (const rel of [...treeFiles].sort()) {
    if (!freshFiles.has(rel)) delta.extra.push(rel);
  }
  return delta;
}

// ============================================================================
// The guard
// ============================================================================

export interface GuardResult {
  verdict: 'no-op-green' | 'full-run-green' | 'FAIL';
  /** The operative-set-freshness sweep's report (Spec 123 Task 13.6) — present on every run. */
  freshness?: FreshnessReport;
  /** Which part failed, when verdict is FAIL. */
  failedBy?: 'operative-set-freshness' | 'tree-delta';
  /** Why a full run happened (absent for no-op-green). */
  fullRunReason?: 'no-lock' | 'input-closure-changed' | 'outputs-changed';
  delta?: TreeDelta;
}

/**
 * Run the guard. `refreshLock` (default true on a green full run) records the new hashes so
 * subsequent unrelated runs no-op. NEVER refreshes on FAIL.
 */
export async function runGuard(repoRoot: string, opts?: { refreshLock?: boolean }): Promise<GuardResult> {
  // The freshness sweep runs FIRST and ALWAYS (the no-op path below would otherwise skip it).
  const freshness = runFreshnessSweep(repoRoot);
  if (freshness.findings.length > 0) {
    return { verdict: 'FAIL', failedBy: 'operative-set-freshness', freshness };
  }

  const lock = readLock(repoRoot);
  const inputHash = computeInputClosureHash(repoRoot);
  const outputsHash = computeOutputsHash(repoRoot);

  if (lock && lock.inputClosure === inputHash && lock.outputs === outputsHash) {
    return { verdict: 'no-op-green', freshness };
  }
  const fullRunReason: GuardResult['fullRunReason'] = !lock
    ? 'no-lock'
    : lock.inputClosure !== inputHash
      ? 'input-closure-changed'
      : 'outputs-changed';

  // Full run: regenerate into a temp tree and compare bidirectionally.
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-diff-guard-'));
  try {
    const { generateAll, writeOutputs } = generation();
    const outputs = await generateAll(repoRoot);
    writeOutputs(temp, outputs);
    const delta = compareTrees(temp, repoRoot, guardedRoots(repoRoot));
    const clean = delta.changed.length === 0 && delta.missing.length === 0 && delta.extra.length === 0;

    if (!clean) {
      return { verdict: 'FAIL', failedBy: 'tree-delta', fullRunReason, delta, freshness };
    }
    if (opts?.refreshLock !== false) {
      writeLock(repoRoot, { inputClosure: computeInputClosureHash(repoRoot), outputs: outputsHash });
    }
    return { verdict: 'full-run-green', fullRunReason, freshness };
  } finally {
    fs.rmSync(temp, { recursive: true, force: true });
  }
}

// CLI: exit 0 on green (either form), 1 on FAIL with per-file detail.
/** `--root <dir>` → that dir (resolved against cwd); default the repo this file lives in. */
export function cliRepoRoot(argv: readonly string[], cwd = process.cwd()): string {
  const i = argv.indexOf('--root');
  if (i === -1) return path.resolve(__dirname, '..', '..');
  const dir = argv[i + 1];
  if (!dir || dir.startsWith('--')) throw new Error('--root needs a directory');
  return path.resolve(cwd, dir);
}

if (require.main === module) {
  let repoRoot: string;
  try {
    repoRoot = cliRepoRoot(process.argv.slice(2));
  } catch (error) {
    console.error(`diff-guard: ERROR — ${(error as Error).message}`);
    process.exit(2);
  }
  runGuard(repoRoot)
    .then((result) => {
      const freshnessLines = result.freshness ? formatFreshness(result.freshness) : [];
      if (result.failedBy === 'operative-set-freshness') {
        console.error('diff-guard: FAIL (operative-set-freshness)');
        for (const line of freshnessLines) console.error(line);
        process.exit(1);
      }
      for (const line of freshnessLines) console.log(line);
      if (result.verdict === 'FAIL') {
        console.error(`diff-guard: FAIL (${result.fullRunReason})`);
        for (const f of result.delta?.changed ?? []) console.error(`  changed: ${f}`);
        for (const f of result.delta?.missing ?? []) console.error(`  missing: ${f}`);
        for (const f of result.delta?.extra ?? []) console.error(`  extra:   ${f}`);
        process.exit(1);
      }
      console.log(`diff-guard: ${result.verdict}${result.fullRunReason ? ` (${result.fullRunReason})` : ''}`);
    })
    .catch((error) => {
      console.error('diff-guard: ERROR —', error.message);
      process.exit(1);
    });
}
