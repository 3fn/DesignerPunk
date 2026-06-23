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

const worktree = process.argv[2] || process.env.AUDIT_WORKTREE;
if (!worktree) {
  console.error('usage: run-audit <worktree-path>');
  process.exit(1);
}

const repo = process.cwd();
const fresh = new DiskFreshGenerator(path.resolve(worktree), 'ts-node-workaround', true);
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

console.log('\n============================================================');
console.log('  END RAW EVIDENCE — hand to Ada for four-bucket classification');
console.log('============================================================');

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
