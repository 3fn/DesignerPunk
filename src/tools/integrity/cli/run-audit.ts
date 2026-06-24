/**
 * Audit runner (Task 1.2 — empirical phase).
 *
 * Runs the GenerationIntegrityCheck over the full inventory (committed = cwd,
 * fresh = a worktree dir generated via the ts-node workaround) and prints a
 * structured evidence digest for classification (Ada, Task 1.2 interpretive phase).
 *
 * It runs TWO check types because they catch different findings:
 *   1. committed-vs-fresh reproduction  → catches Findings 3a (component drop)
 *      and 3b (theme-varying drift), where fresh DIFFERS from committed.
 *   2. absolute invariant scan (rgba)   → catches Finding 1, which is INVISIBLE
 *      to (1) because fresh reproduces committed (both legacy rgba); the defect
 *      is token-index-vs-dist-CSS, correctTarget = neither.
 *
 * Usage: npx ts-node --transpile-only src/tools/integrity/cli/run-audit.ts <worktree-path>
 *
 * This runner does NOT classify (four-bucket / correctTarget / shared-root-cause)
 * — that is Ada's Rosetta-domain phase. It produces the raw evidence only.
 */

import * as fs from 'fs';
import * as path from 'path';
import { GenerationIntegrityCheckImpl } from '../GenerationIntegrityCheck';
import { DiskFreshGenerator } from '../DiskFreshGenerator';
import { INVENTORY } from '../inventory';
import { EMPTY_MANIFEST } from '../manifest';
import { ArtifactDiff } from '../types';
import { assertTokenIndexInvariants, rgbaColorPrimitives, themeVaryingTrueKeys } from '../Invariants';

const worktree = process.argv[2] || process.env.AUDIT_WORKTREE;
if (!worktree) {
  console.error('usage: run-audit <worktree-path>');
  process.exit(1);
}

const repo = process.cwd();
// Provenance (Task 5.3 trust gate): post-Spec-118 the documented CLI runs end-to-end,
// so a documented-CLI fresh generate is NON-provisional (design P7). Default reflects that.
// Override to the historical ts-node workaround for comparison with `AUDIT_VIA=ts-node-workaround`.
const via = process.env.AUDIT_VIA === 'ts-node-workaround' ? 'ts-node-workaround' : 'documented-cli';
const provisional = via === 'ts-node-workaround';
const fresh = new DiskFreshGenerator(path.resolve(worktree), via, provisional);
const result = new GenerationIntegrityCheckImpl(fresh, repo).run({
  inventory: INVENTORY,
  manifest: EMPTY_MANIFEST,
});

console.log('============================================================');
console.log('  GENERATION-INTEGRITY AUDIT — RAW EVIDENCE (Task 1.2a)');
console.log(`  generatedVia: ${result.generatedVia}   provisional: ${result.provisional}`);
console.log(`  allEqual: ${result.allEqual}`);
console.log('============================================================\n');

console.log('--- CHECK 1: committed-vs-fresh reproduction ---\n');
for (const diff of result.diffs) {
  const tag = diff.status === 'equal' ? '   equal' : `✗  ${diff.status}`;
  console.log(`${tag.padEnd(20)} ${diff.artifact.path}  (${diff.divergences.length} divergences)`);
}

console.log('\n--- divergence detail (by artifact) ---');
for (const diff of result.diffs) {
  if (diff.status === 'equal') continue;
  console.log(`\n### ${diff.artifact.path} — ${diff.status} — ${diff.divergences.length} divergences`);
  console.log(`    dimensions: ${dimensionBreakdown(diff)}`);
  const sample = diff.divergences.slice(0, 8);
  for (const d of sample) {
    console.log(`    • ${d.locator}  [${d.dimension}]  committed=${trunc(d.committedValue)}  fresh=${trunc(d.freshValue)}`);
  }
  if (diff.divergences.length > sample.length) {
    console.log(`    … +${diff.divergences.length - sample.length} more`);
  }
}

console.log('\n\n--- CHECK 2: absolute invariant scan (P3 — catches Finding 1) ---\n');
rgbaScan('token-index/primitives.yaml');
rgbaScan('token-index/semantics.yaml');
oklchVsRgba('dist/DesignTokens.web.css');

// CHECK 3 (Task 5.1) — the absolute correctness-property assertions the re-diff cannot catch:
//   P3 (no rgba except the shadow allowlist) and P5 (theme-varying = base-scoped 5, not registry-wide 10).
// Run against the COMMITTED token-index (repo cwd) — these must hold regardless of drift.
console.log('\n--- CHECK 3: token-index invariants (P3 no-legacy-color, P5 theme-varying-base-scoped) ---\n');
const primitivesYaml = readMaybe(path.resolve(repo, 'token-index/primitives.yaml'));
const semanticsYaml = readMaybe(path.resolve(repo, 'token-index/semantics.yaml'));
let invariantViolations: ReturnType<typeof assertTokenIndexInvariants> = [];
if (primitivesYaml === null || semanticsYaml === null) {
  console.log('  ⚠ token-index primitives/semantics absent — cannot assert invariants');
} else {
  console.log(`  rgba color primitives (expect 4 shadow only): ${rgbaColorPrimitives(primitivesYaml).join(', ')}`);
  console.log(`  themeVarying:true keys (expect 5 base): ${themeVaryingTrueKeys(semanticsYaml).join(', ')}`);
  invariantViolations = assertTokenIndexInvariants({ primitivesYaml, semanticsYaml });
  console.log(`  P3 + P5: ${invariantViolations.length === 0 ? '✅ hold' : `✗ ${invariantViolations.length} VIOLATION(S)`}`);
  for (const v of invariantViolations) console.log(`    • [${v.invariant}] ${v.locator}: ${v.detail}`);
}

// Trust-gate verdict (Task 5.3 / P7): non-provisional certification requires a documented-CLI
// fresh generate, all-equal re-diff, AND the invariants holding.
const certifiable = result.allEqual && invariantViolations.length === 0 && !provisional;
console.log('\n============================================================');
console.log(`  VERDICT: allEqual=${result.allEqual}  invariants=${invariantViolations.length === 0 ? 'hold' : 'VIOLATED'}  via=${via}  provisional=${provisional}`);
console.log(`  ${certifiable ? '✅ TRUST GATE MET — ready to certify non-provisionally (pending ratification)' : '⛔ NOT certifiable as-is'}`);
console.log('============================================================');
process.exitCode = certifiable ? 0 : 1;

function dimensionBreakdown(diff: ArtifactDiff): string {
  const counts: Record<string, number> = {};
  for (const d of diff.divergences) counts[d.dimension] = (counts[d.dimension] ?? 0) + 1;
  return Object.entries(counts)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ');
}

function trunc(v: unknown): string {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  if (s === undefined) return 'undefined';
  return s.length > 60 ? `${s.slice(0, 57)}…` : s;
}

function rgbaScan(rel: string): void {
  const committed = readMaybe(path.resolve(repo, rel));
  const freshContent = fresh.read(rel);
  const cR = count(committed, /rgba\(/g);
  const fR = count(freshContent, /rgba\(/g);
  const cO = count(committed, /oklch\(/g);
  const fO = count(freshContent, /oklch\(/g);
  console.log(`  ${rel}:`);
  console.log(`     committed: rgba(=${cR}  oklch(=${cO}      fresh: rgba(=${fR}  oklch(=${fO})`);
}

function oklchVsRgba(rel: string): void {
  const committed = readMaybe(path.resolve(repo, rel));
  const freshContent = fresh.read(rel);
  console.log(`  ${rel} (the canonical color output to compare token-index against):`);
  console.log(`     committed: rgba(=${count(committed, /rgba\(/g)}  oklch(=${count(committed, /oklch\(/g)}` +
    `      fresh: rgba(=${count(freshContent, /rgba\(/g)}  oklch(=${count(freshContent, /oklch\(/g)})`);
}

function readMaybe(p: string): string | null {
  try {
    return fs.readFileSync(p, 'utf-8');
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

function count(s: string | null, re: RegExp): number {
  if (s === null) return -1; // -1 signals "file absent"
  return (s.match(re) ?? []).length;
}
