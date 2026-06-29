/**
 * Discovery Dry-Run runner — Spec 119-A, Tasks 10.2/10.3/10.4/10.6
 *
 * Thin CLI wrapper over the testable core in
 * `mcp-server/src/discovery-dry-run/discovery-dry-run.ts`. Runs the dry-run at a
 * chosen baseline point against the frozen map-oracle and prints:
 *   - a per-query report: rank-of-correct + matchConfidence + PASS/WEAK/MISS
 *   - clearsThreshold (HARD gate, Decision 4) + rank1StrongRate (SIGNAL)
 *   - the weakOrMiss worklist (Task 8.4 alias-seeding input, Req 13 AC5)
 *
 * Usage:
 *   tsx scripts/discovery-dry-run.ts [floor|lift|no-regression]   (default: floor)
 *
 * The runner builds its OWN DocumentIndexer over `governance/` and calls the same
 * `findDocsConcept` the live `find_docs` tool uses — measuring real discovery.
 */

import {
  runDiscoveryDryRun,
  DryRunPoint,
  DryRunResult,
} from '../mcp-server/src/discovery-dry-run/discovery-dry-run';
import { DISCOVERY_ORACLE } from './__fixtures__/discovery-oracle';

function fmt(result: DryRunResult): string {
  const lines: string[] = [];
  lines.push(`\n=== Discovery Dry-Run — point: ${result.point} ===\n`);
  lines.push('  rank  conf      class   concept  →  matched-id / expected');
  lines.push('  ----  --------  ------  -------------------------------------------');
  for (const s of result.scores) {
    const rank = s.rankOfCorrect === null ? ' -- ' : String(s.rankOfCorrect).padStart(4);
    const conf = s.matchConfidence.padEnd(8);
    const cls = s.classification.padEnd(6);
    const matched = s.matchedId ?? `MISS (expected: ${s.expectedDocIds.join(', ')})`;
    lines.push(`  ${rank}  ${conf}  ${cls}  ${s.concept}  →  ${matched}`);
  }
  lines.push('');
  lines.push(`  Summary: ${result.summary.pass} PASS / ${result.summary.weak} WEAK / ${result.summary.miss} MISS  (total ${result.summary.total})`);
  lines.push(`  clearsThreshold (HARD gate): ${result.clearsThreshold}`);
  lines.push(`  rank1StrongRate (SIGNAL):    ${(result.rank1StrongRate * 100).toFixed(1)}%  (${result.summary.rank1Strong}/${result.summary.total})`);
  lines.push('');
  lines.push(`  weakOrMiss worklist (${result.weakOrMiss.length}) — feeds Task 8.4 alias seeding:`);
  if (result.weakOrMiss.length === 0) {
    lines.push('    (none — every oracle concept clears the hard bar)');
  } else {
    for (const c of result.weakOrMiss) lines.push(`    - ${c}`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main(): Promise<void> {
  const arg = (process.argv[2] ?? 'floor') as DryRunPoint;
  const valid: DryRunPoint[] = ['floor', 'lift', 'no-regression'];
  if (!valid.includes(arg)) {
    console.error(`Invalid point '${arg}'. Use one of: ${valid.join(', ')}`);
    process.exit(2);
  }

  const result = await runDiscoveryDryRun(arg, DISCOVERY_ORACLE);
  console.log(fmt(result));

  // Emit machine-readable JSON for downstream capture (the 8.4 dispatch consumes it).
  console.log('--- JSON ---');
  console.log(JSON.stringify({
    point: result.point,
    clearsThreshold: result.clearsThreshold,
    rank1StrongRate: result.rank1StrongRate,
    summary: result.summary,
    weakOrMiss: result.weakOrMiss,
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
