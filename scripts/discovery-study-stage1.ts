/**
 * Discovery Study Stage 1 — runner (lexical arm A only)
 *
 * Charter: .kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md § 1e, § 2.
 * TEMPORARY study instrument: retire with the study (charter § 8 Closing).
 *
 * Usage:
 *   npx tsx scripts/discovery-study-stage1.ts --verify-only   # integrity checks; scores NOTHING
 *   npx tsx scripts/discovery-study-stage1.ts                 # the run (only at/after the pre-registration commit)
 *
 * Integrity checks (both modes; any failure exits non-zero before scoring):
 *   1. every Q2 query line (query | seatTool | seatIntent) appears VERBATIM in the raw file;
 *   2. ids are unique and every raw-file line is accounted for exactly once;
 *   3. the frozen oracle is byte-identical to main (`git diff --quiet main -- <oracle>`).
 * The run builds its OWN DocumentIndexer over governance/ and calls the SAME findDocsConcept the
 * live find_docs tool calls. It imports the oracle and Q2 read-only. It does NOT import the
 * calibration-only set (never scored, charter § 1a).
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { DocumentIndexer } from '../mcp-server/src/indexer/DocumentIndexer';
import { findDocsConcept } from '../mcp-server/src/query/QueryEngine';
import {
  runDiscoveryDryRun,
  buildPathToId,
  DEFAULT_GOVERNANCE_DIR,
} from '../mcp-server/src/discovery-dry-run/discovery-dry-run';
import {
  toStudyHits,
  scorePositive,
  scoreNegative,
  intentMode,
  isCueExposed,
  summarizePositives,
  summarizeNegatives,
  PositiveScore,
  NegativeScore,
  IntentMode,
} from '../mcp-server/src/discovery-dry-run/study-scoring';
import { DISCOVERY_ORACLE } from './__fixtures__/discovery-oracle';
import {
  Q2_POSITIVES,
  Q2_NEGATIVES,
  Q2_DROPPED,
  Q2_HELD,
  SEAT_CUES,
  SeatId,
} from './__fixtures__/discovery-q2-seats';

const REPO = path.resolve(__dirname, '..');
const RAW = path.join(REPO, '.kiro/docs/discovery-study-stage1-seat-queries.raw.md');
const ORACLE_REL = 'scripts/__fixtures__/discovery-oracle.ts';

function sh(cmd: string): string {
  return execSync(cmd, { cwd: REPO, encoding: 'utf8' }).trim();
}

function integrity(): string[] {
  const errors: string[] = [];
  const raw = fs.readFileSync(RAW, 'utf8');
  const all = [...Q2_POSITIVES, ...Q2_NEGATIVES, ...Q2_DROPPED, ...Q2_HELD];
  const ids = new Set<string>();
  for (const e of all) {
    if (ids.has(e.id)) errors.push(`duplicate id ${e.id}`);
    ids.add(e.id);
    const line = `${e.query} | ${e.seatTool} | ${e.seatIntent}`;
    if (!raw.split('\n').includes(line)) errors.push(`${e.id}: line not found verbatim in raw file`);
  }
  // Every query line inside the seats' fenced blocks must be accounted for exactly once.
  const fenced = raw.match(/```\n([\s\S]*?)\n```/g) ?? [];
  const rawLines = fenced
    .slice(1) // the first fence is the sealed prompt
    .flatMap((b) => b.split('\n'))
    .filter((l) => l.includes(' | '));
  if (rawLines.length !== all.length) errors.push(`raw has ${rawLines.length} query lines; fixture accounts for ${all.length}`);
  try {
    sh(`git diff --quiet main -- ${ORACLE_REL}`);
  } catch {
    errors.push(`oracle differs from main: ${ORACLE_REL}`);
  }
  return errors;
}

interface Row<S> { id: string; seat: SeatId; mode: IntentMode; cue: boolean; score: S }

function strata<S>(rows: Row<S>[]): Record<string, Row<S>[]> {
  const out: Record<string, Row<S>[]> = { total: rows };
  for (const r of rows) {
    for (const k of [`seat:${r.seat}`, `mode:${r.mode}`, `cueExposed:${r.cue}`]) (out[k] ??= []).push(r);
  }
  return out;
}

async function main(): Promise<void> {
  const verifyOnly = process.argv.includes('--verify-only');
  const head = sh('git rev-parse HEAD');
  console.log(`\n=== Discovery Study Stage 1 — ${verifyOnly ? 'VERIFY ONLY (nothing scored)' : 'RUN (arm A, lexical)'} ===`);
  console.log(`HEAD: ${head}`);
  console.log(`Q2: ${Q2_POSITIVES.length} positives / ${Q2_NEGATIVES.length} negatives / ${Q2_DROPPED.length} dropped / ${Q2_HELD.length} held`);

  const errors = integrity();
  if (errors.length > 0) {
    console.error('INTEGRITY FAILED:\n  ' + errors.join('\n  '));
    process.exit(2);
  }
  console.log('Integrity: verbatim OK; ids unique; raw lines accounted; oracle byte-identical to main.');
  if (verifyOnly) return;

  const indexer = new DocumentIndexer();
  await indexer.indexDirectory(DEFAULT_GOVERNANCE_DIR);
  const docs = indexer.getAllDocuments();
  const pathToId = buildPathToId(indexer);
  const known = new Set(pathToId.values());
  for (const p of Q2_POSITIVES) {
    if (!known.has(p.expectedDocId)) {
      console.error(`KEY ERROR: ${p.id} expects '${p.expectedDocId}', not a served doc id`);
      process.exit(2);
    }
  }

  const oracle = await runDiscoveryDryRun('no-regression', DISCOVERY_ORACLE, { indexer });
  console.log(`\nQ1 oracle (regression only): ${oracle.summary.pass}/${oracle.summary.weak}/${oracle.summary.miss} PASS/WEAK/MISS; rank-1-strong ${oracle.summary.rank1Strong}/${oracle.summary.total}`);

  const flags = (e: { seat: SeatId; query: string; seatTool: string }) => ({
    mode: intentMode(e.seatTool),
    cue: isCueExposed(e.query, e.seatTool, SEAT_CUES[e.seat]),
  });

  const pos: Row<PositiveScore>[] = Q2_POSITIVES.map((e) => ({
    id: e.id, seat: e.seat, ...flags(e),
    score: scorePositive(e.expectedDocId, toStudyHits(findDocsConcept(docs, e.query).data, pathToId)),
  }));
  const neg: Row<NegativeScore>[] = Q2_NEGATIVES.map((e) => ({
    id: e.id, seat: e.seat, ...flags(e),
    score: scoreNegative(toStudyHits(findDocsConcept(docs, e.query).data, pathToId)),
  }));

  console.log('\nPositives  id     rank tier     R@1 R@2 PASS mode    cue   expected');
  for (const r of pos) {
    const e = Q2_POSITIVES.find((p) => p.id === r.id)!;
    const s = r.score;
    console.log(`           ${r.id.padEnd(6)} ${String(s.rankOfCorrect ?? '--').padStart(4)} ${String(s.tierOfCorrect ?? '-').padEnd(8)} ${s.r1 ? 'y' : '.'}   ${s.r2 ? 'y' : '.'}   ${s.tieredPass ? 'y' : 'N'}    ${r.mode.padEnd(7)} ${String(r.cue).padEnd(5)} ${e.expectedDocId}  strong@${s.strongRanks.join(',') || '-'}`);
  }
  console.log('\nNegatives  id     outcome          top-3 (id:tier)');
  for (const r of neg) {
    const s = r.score;
    console.log(`           ${r.id.padEnd(6)} ${s.outcome.padEnd(16)} ${s.top3.map((h) => `${h.id}:${h.matchConfidence}`).join(', ') || '(empty)'}  strong@${s.strongRanks.join(',') || '-'}`);
  }

  const ps = strata(pos);
  const ns = strata(neg);
  console.log('\nSummaries (positives: n / R@1 / R@2 / tieredPass; negatives: n / correct / confident-wrong top-3 / strong@1 / strong top-2)');
  const keys = Array.from(new Set([...Object.keys(ps), ...Object.keys(ns)])).sort();
  const json: Record<string, unknown> = {};
  for (const k of keys) {
    const p = summarizePositives(ps[k] ?? []);
    const n = summarizeNegatives(ns[k] ?? []);
    json[k] = { positives: p, negatives: n };
    console.log(`  ${k.padEnd(18)} P ${p.n}/${p.r1}/${p.r2}/${p.tieredPass}   N ${n.n}/${n.correct}/${n.confidentWrongTop3}/${n.strongAtRank1}/${n.strongInTop2}`);
  }
  console.log(`\nMiss worklist (tieredPass failed — bucket per charter § 1f): ${(json.total as { positives: { misses: string[] } }).positives.misses.join(', ') || '(none)'}`);

  console.log('\n--- JSON ---');
  console.log(JSON.stringify({ head, oracle: oracle.summary, strata: json,
    positives: pos, negatives: neg }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
