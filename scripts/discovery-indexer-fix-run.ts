/**
 * Discovery indexer fix — runner (the shipped or fixed lexical matcher at HEAD)
 *
 * Issue + pre-registration block: .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md.
 * Sibling of scripts/discovery-study-stage1.ts (left unchanged). TEMPORARY: retire with the fix findings.
 *
 * Usage:
 *   npx tsx scripts/discovery-indexer-fix-run.ts --verify-only
 *   npx tsx scripts/discovery-indexer-fix-run.ts --line shipped  > shipped.txt   # at the PR's merge-base
 *   npx tsx scripts/discovery-indexer-fix-run.ts --line fence    --compare shipped.txt
 *   npx tsx scripts/discovery-indexer-fix-run.ts --line headings --compare shipped.txt
 *   npx tsx scripts/discovery-indexer-fix-run.ts --line atoms    --compare shipped.txt
 *
 * `--line` labels the result line (shipped | fence | headings | atoms). It changes NOTHING about
 * what runs: the matcher is whatever code is at HEAD. `--compare <file>` reads an earlier run's
 * output (a pure JSON file, or a captured stdout containing the '--- JSON ---' marker), diffs it
 * against this run, and prints ACCEPT/REJECT per pre-registered criterion. Q2 is diffed for the
 * record only: it is SPENT and is never a criterion.
 *
 * Integrity (every mode; any failure exits 2 before scoring):
 *   1. every fresh query line appears VERBATIM in the fresh raw file, every Q2 line in the Stage 1 raw;
 *   2. ids unique per set, and each raw file's query lines are accounted for exactly once;
 *   3. the fresh fixture's precomputed mode / cueExposed match the mechanical recomputation;
 *   4. the oracle and the Q2 fixture are byte-identical to main.
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
} from '../mcp-server/src/discovery-dry-run/study-scoring';
import { diffSet, evaluateAcceptance, SetRun, OracleSummary } from '../mcp-server/src/discovery-dry-run/fix-compare';
import { DISCOVERY_ORACLE } from './__fixtures__/discovery-oracle';
import { Q2_POSITIVES, Q2_NEGATIVES, Q2_DROPPED, Q2_HELD, SEAT_CUES, SeatId } from './__fixtures__/discovery-q2-seats';
import {
  FRESH_POSITIVES,
  FRESH_NEGATIVES,
  FRESH_DROPPED_Q2_DUPLICATE,
  FRESH_DROPPED_WITHIN_DUPLICATE,
  FRESH_DROPPED_NO_SINGLE_ANSWER,
  FRESH_HELD,
} from './__fixtures__/discovery-fresh-set';

const REPO = path.resolve(__dirname, '..');
const Q2_RAW = path.join(REPO, '.kiro/docs/discovery-study-stage1-seat-queries.raw.md');
const FRESH_RAW = path.join(REPO, '.kiro/docs/discovery-indexer-fix-fresh-queries.raw.md');
const FROZEN = ['scripts/__fixtures__/discovery-oracle.ts', 'scripts/__fixtures__/discovery-q2-seats.ts'];
const LINES = ['shipped', 'fence', 'headings', 'atoms'] as const;

interface Entry { id: string; seat: SeatId; query: string; seatTool: string; seatIntent: string }

function sh(cmd: string): string {
  return execSync(cmd, { cwd: REPO, encoding: 'utf8' }).trim();
}

function rawQueryLines(rawPath: string): string[] {
  const raw = fs.readFileSync(rawPath, 'utf8');
  const fenced = raw.match(/```\n([\s\S]*?)\n```/g) ?? [];
  // The first fence in each raw file is the sealed prompt.
  return fenced.slice(1).flatMap((b) => b.split('\n')).filter((l) => l.includes(' | '));
}

function checkSet(label: string, rawPath: string, entries: Entry[], errors: string[]): void {
  const lines = rawQueryLines(rawPath);
  const lineSet = new Set(lines);
  const ids = new Set<string>();
  for (const e of entries) {
    if (ids.has(e.id)) errors.push(`${label}: duplicate id ${e.id}`);
    ids.add(e.id);
    if (!lineSet.has(`${e.query} | ${e.seatTool} | ${e.seatIntent}`)) errors.push(`${label}: ${e.id} not verbatim in raw file`);
  }
  if (lines.length !== entries.length) errors.push(`${label}: raw has ${lines.length} query lines; fixture accounts for ${entries.length}`);
}

function integrity(): string[] {
  const errors: string[] = [];
  checkSet('Q2', Q2_RAW, [...Q2_POSITIVES, ...Q2_NEGATIVES, ...Q2_DROPPED, ...Q2_HELD], errors);
  const fresh = [
    ...FRESH_POSITIVES, ...FRESH_NEGATIVES, ...FRESH_DROPPED_Q2_DUPLICATE,
    ...FRESH_DROPPED_WITHIN_DUPLICATE, ...FRESH_DROPPED_NO_SINGLE_ANSWER, ...FRESH_HELD,
  ];
  checkSet('fresh', FRESH_RAW, fresh, errors);
  for (const e of fresh) {
    if (intentMode(e.seatTool) !== e.mode) errors.push(`fresh: ${e.id} mode mismatch`);
    if (isCueExposed(e.query, e.seatTool, SEAT_CUES[e.seat]) !== e.cueExposed) errors.push(`fresh: ${e.id} cueExposed mismatch`);
  }
  for (const f of FROZEN) {
    try {
      sh(`git diff --quiet main -- ${f}`);
    } catch {
      errors.push(`frozen fixture differs from main: ${f}`);
    }
  }
  return errors;
}

interface Row<S> { id: string; seat: SeatId; mode: string; cue: boolean; score: S }

function strataSummary(pos: Row<PositiveScore>[], neg: Row<NegativeScore>[]): Record<string, unknown> {
  const keys = new Set<string>(['total']);
  const tag = (r: Row<unknown>) => [`seat:${r.seat}`, `mode:${r.mode}`, `cueExposed:${r.cue}`];
  for (const r of [...pos, ...neg]) tag(r).forEach((k) => keys.add(k));
  const out: Record<string, unknown> = {};
  for (const k of [...keys].sort()) {
    const sel = <S>(rows: Row<S>[]) => (k === 'total' ? rows : rows.filter((r) => tag(r).includes(k)));
    out[k] = { positives: summarizePositives(sel(pos)), negatives: summarizeNegatives(sel(neg)) };
  }
  return out;
}

function readBase(file: string): { line: string; head: string; oracle: OracleSummary; q2: SetRun; fresh: SetRun } {
  const text = fs.readFileSync(file, 'utf8');
  const json = text.includes('--- JSON ---') ? text.split('--- JSON ---')[1] : text;
  const d = JSON.parse(json);
  return { line: d.line, head: d.head, oracle: d.oracle, q2: { positives: d.positives, negatives: d.negatives }, fresh: d.fresh };
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main(): Promise<void> {
  const verifyOnly = process.argv.includes('--verify-only');
  const line = arg('--line');
  const compare = arg('--compare');
  if (!verifyOnly && (!line || !(LINES as readonly string[]).includes(line))) {
    console.error(`--line must be one of: ${LINES.join(', ')} (or pass --verify-only)`);
    process.exit(2);
  }
  const head = sh('git rev-parse HEAD');
  console.log(`\n=== Discovery indexer fix — ${verifyOnly ? 'VERIFY ONLY (nothing scored)' : `RUN, line: ${line}`} ===`);
  console.log(`HEAD: ${head}`);
  console.log(`Fresh: ${FRESH_POSITIVES.length} positives / ${FRESH_NEGATIVES.length} negatives / ${FRESH_DROPPED_Q2_DUPLICATE.length} Q2-duplicate / ${FRESH_DROPPED_WITHIN_DUPLICATE.length} within-duplicate / ${FRESH_DROPPED_NO_SINGLE_ANSWER.length} no-single-answer / ${FRESH_HELD.length} held`);
  console.log(`Q2 (spent, descriptive): ${Q2_POSITIVES.length} positives / ${Q2_NEGATIVES.length} negatives`);

  const errors = integrity();
  if (errors.length > 0) {
    console.error('INTEGRITY FAILED:\n  ' + errors.join('\n  '));
    process.exit(2);
  }
  console.log('Integrity: verbatim OK (fresh + Q2); ids unique; raw lines accounted; mode/cue recomputed; oracle + Q2 byte-identical to main.');
  if (verifyOnly) return;

  const indexer = new DocumentIndexer();
  await indexer.indexDirectory(DEFAULT_GOVERNANCE_DIR);
  const docs = indexer.getAllDocuments();
  const pathToId = buildPathToId(indexer);
  const known = new Set(pathToId.values());
  for (const p of [...Q2_POSITIVES, ...FRESH_POSITIVES]) {
    if (!known.has(p.expectedDocId)) {
      console.error(`KEY ERROR: ${p.id} expects '${p.expectedDocId}', not a served doc id`);
      process.exit(2);
    }
  }

  const oracleRun = await runDiscoveryDryRun('no-regression', DISCOVERY_ORACLE, { indexer });
  const oracle: OracleSummary = oracleRun.summary;

  const hits = (q: string) => toStudyHits(findDocsConcept(docs, q).data, pathToId);
  const flags = (e: Entry) => ({ mode: intentMode(e.seatTool), cue: isCueExposed(e.query, e.seatTool, SEAT_CUES[e.seat]) });
  const scorePos = (es: Array<Entry & { expectedDocId: string }>): Row<PositiveScore>[] =>
    es.map((e) => ({ id: e.id, seat: e.seat, ...flags(e), score: scorePositive(e.expectedDocId, hits(e.query)) }));
  const scoreNeg = (es: Entry[]): Row<NegativeScore>[] =>
    es.map((e) => ({ id: e.id, seat: e.seat, ...flags(e), score: scoreNegative(hits(e.query)) }));

  const q2pos = scorePos(Q2_POSITIVES);
  const q2neg = scoreNeg(Q2_NEGATIVES);
  const frpos = scorePos(FRESH_POSITIVES);
  const frneg = scoreNeg(FRESH_NEGATIVES);

  const fs1 = summarizePositives(frpos);
  const fn1 = summarizeNegatives(frneg);
  const qs1 = summarizePositives(q2pos);
  const qn1 = summarizeNegatives(q2neg);
  console.log(`\nOracle: ${oracle.pass}/${oracle.weak}/${oracle.miss} PASS/WEAK/MISS; rank-1-strong ${oracle.rank1Strong}/${oracle.total}`);
  console.log(`Fresh positives: n ${fs1.n} / R@1 ${fs1.r1} / R@2 ${fs1.r2} / tiered PASS ${fs1.tieredPass}; misses: ${fs1.misses.join(', ') || '(none)'}`);
  console.log(`Fresh negatives: n ${fn1.n} / correct ${fn1.correct} / confident-wrong top-3 ${fn1.confidentWrongTop3} / strong@1 ${fn1.strongAtRank1} / strong top-2 ${fn1.strongInTop2}`);
  console.log(`Q2 (SPENT, descriptive): R@1 ${qs1.r1} / R@2 ${qs1.r2} of ${qs1.n}; negatives correct ${qn1.correct}/${qn1.n}`);

  console.log('\nFresh positives  id      rank tier     R@2  mode    cue   expected');
  for (const r of frpos) {
    const e = FRESH_POSITIVES.find((p) => p.id === r.id)!;
    console.log(`                 ${r.id.padEnd(7)} ${String(r.score.rankOfCorrect ?? '--').padStart(4)} ${String(r.score.tierOfCorrect ?? '-').padEnd(8)} ${r.score.r2 ? 'y' : 'N'}    ${r.mode.padEnd(7)} ${String(r.cue).padEnd(5)} ${e.expectedDocId}  strong@${r.score.strongRanks.join(',') || '-'}`);
  }
  console.log('\nFresh negatives  id      outcome          top-3 (id:tier)');
  for (const r of frneg) {
    console.log(`                 ${r.id.padEnd(7)} ${r.score.outcome.padEnd(16)} ${r.score.top3.map((h) => `${h.id}:${h.matchConfidence}`).join(', ') || '(empty)'}`);
  }

  const record = {
    line, head, oracle,
    strata: strataSummary(q2pos, q2neg), positives: q2pos, negatives: q2neg,
    fresh: { strata: strataSummary(frpos, frneg), positives: frpos, negatives: frneg },
  };

  if (compare) {
    const base = readBase(compare);
    const fresh = diffSet(base.fresh, { positives: frpos, negatives: frneg });
    const q2 = diffSet(base.q2, { positives: q2pos, negatives: q2neg });
    const acc = evaluateAcceptance(oracle, fresh);
    console.log(`\n=== Compare: base line '${base.line}' @ ${base.head} → head line '${line}' @ ${head} ===`);
    console.log(`Oracle: base ${base.oracle.pass}/${base.oracle.weak}/${base.oracle.miss} r1s ${base.oracle.rank1Strong} → head ${oracle.pass}/${oracle.weak}/${oracle.miss} r1s ${oracle.rank1Strong}`);
    console.log(`Fresh: gained ${fresh.gained.join(', ') || '-'} | lost ${fresh.lost.join(', ') || '-'} | net ${fresh.net >= 0 ? '+' : ''}${fresh.net}`);
    console.log(`Fresh rank changes: ${fresh.rankChanges.map((c) => `${c.id} ${c.base ?? '--'}→${c.head ?? '--'}`).join(', ') || 'none'}`);
    console.log(`Fresh negatives: new confident-wrong ${fresh.newConfidentWrong.join(', ') || 'none'} | resolved ${fresh.resolvedConfidentWrong.join(', ') || 'none'}`);
    console.log(`Q2 (SPENT — descriptive only, never a criterion): gained ${q2.gained.join(', ') || '-'} | lost ${q2.lost.join(', ') || '-'} | net ${q2.net >= 0 ? '+' : ''}${q2.net} | new confident-wrong ${q2.newConfidentWrong.join(', ') || 'none'}`);
    for (const c of acc.criteria) console.log(`  (${c.id}) ${c.pass ? 'ACCEPT' : 'REJECT'} — ${c.label}: ${c.detail}`);
    console.log(`  OVERALL: ${acc.accept ? 'ACCEPT' : 'REJECT'}`);
    Object.assign(record, { compare: { base: { line: base.line, head: base.head }, fresh, q2, acceptance: acc } });
  }

  console.log('\n--- JSON ---');
  console.log(JSON.stringify(record, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
