/**
 * Discovery indexer fix — run comparison and pre-registered acceptance (PURE; no index, no filesystem)
 *
 * Issue + pre-registration block: .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md.
 * Acceptance, as pre-registered in scripts/__fixtures__/discovery-fresh-set.ts:
 *  (a) oracle 83 / 0 / 0 PASS / WEAK / MISS and rank-1-strong ≥ 77 (at the compared head);
 *  (b) fresh positives, base → head: net passes (rank ≤ 2) ≥ +2, with ≤ 2 positives lost;
 *  (c) fresh negatives: no new confident-wrong (correct at base → a `strong` in the top 3 at head);
 *  (d) Q2 re-run REPORTED AS SPENT — diffed here for the record, never a criterion.
 *
 * Separate from study-scoring.ts so the Stage 1 instrument stays exactly as pre-registered.
 * TEMPORARY study instrument: retire with the indexer-fix findings.
 */

import { PositiveScore, NegativeScore } from './study-scoring';

export interface ScoredRow<S> {
  id: string;
  score: S;
}

export interface SetRun {
  positives: ScoredRow<PositiveScore>[];
  negatives: ScoredRow<NegativeScore>[];
}

export interface OracleSummary {
  total: number;
  pass: number;
  weak: number;
  miss: number;
  rank1Strong: number;
}

export const FIX_ACCEPTANCE = {
  oraclePass: 83,
  oracleWeak: 0,
  oracleMiss: 0,
  oracleRank1StrongMin: 77,
  freshNetMin: 2,
  freshLostMax: 2,
  newConfidentWrongMax: 0,
} as const;

export interface RankChange {
  id: string;
  base: number | null;
  head: number | null;
}

export interface SetDiff {
  /** Positives failing (rank > 2 or absent) at base, passing (rank ≤ 2) at head. */
  gained: string[];
  /** Positives passing at base, failing at head. */
  lost: string[];
  net: number;
  /** Every positive whose rank of the correct doc moved. */
  rankChanges: RankChange[];
  /** Negatives correct at base with a `strong` in the top 3 at head. */
  newConfidentWrong: string[];
  /** Negatives confident-wrong at base, correct at head. */
  resolvedConfidentWrong: string[];
  /** Ids present in one run and not the other (a malformed comparison). */
  missingIds: string[];
}

function byId<S>(rows: ScoredRow<S>[]): Map<string, S> {
  return new Map(rows.map((r) => [r.id, r.score]));
}

export function diffSet(base: SetRun, head: SetRun): SetDiff {
  const bp = byId(base.positives);
  const hp = byId(head.positives);
  const bn = byId(base.negatives);
  const hn = byId(head.negatives);
  const missingIds: string[] = [];
  for (const id of new Set([...bp.keys(), ...hp.keys()])) if (!bp.has(id) || !hp.has(id)) missingIds.push(id);
  for (const id of new Set([...bn.keys(), ...hn.keys()])) if (!bn.has(id) || !hn.has(id)) missingIds.push(id);

  const gained: string[] = [];
  const lost: string[] = [];
  const rankChanges: RankChange[] = [];
  for (const [id, b] of bp) {
    const h = hp.get(id);
    if (!h) continue;
    if (!b.r2 && h.r2) gained.push(id);
    if (b.r2 && !h.r2) lost.push(id);
    if (b.rankOfCorrect !== h.rankOfCorrect) rankChanges.push({ id, base: b.rankOfCorrect, head: h.rankOfCorrect });
  }
  const newConfidentWrong: string[] = [];
  const resolvedConfidentWrong: string[] = [];
  for (const [id, b] of bn) {
    const h = hn.get(id);
    if (!h) continue;
    if (b.correct && !h.correct) newConfidentWrong.push(id);
    if (!b.correct && h.correct) resolvedConfidentWrong.push(id);
  }
  return { gained, lost, net: gained.length - lost.length, rankChanges, newConfidentWrong, resolvedConfidentWrong, missingIds };
}

export interface CriterionResult {
  id: 'a' | 'b' | 'c';
  label: string;
  pass: boolean;
  detail: string;
}

export interface AcceptanceResult {
  criteria: CriterionResult[];
  accept: boolean;
}

/** Evaluate (a)–(c). A malformed comparison (missing ids) fails (b) and (c) outright. */
export function evaluateAcceptance(headOracle: OracleSummary, fresh: SetDiff): AcceptanceResult {
  const A = FIX_ACCEPTANCE;
  const malformed = fresh.missingIds.length > 0;
  const a: CriterionResult = {
    id: 'a',
    label: 'oracle 83/0/0 and rank-1-strong >= 77',
    pass:
      headOracle.pass === A.oraclePass &&
      headOracle.weak === A.oracleWeak &&
      headOracle.miss === A.oracleMiss &&
      headOracle.rank1Strong >= A.oracleRank1StrongMin,
    detail: `${headOracle.pass}/${headOracle.weak}/${headOracle.miss}, rank-1-strong ${headOracle.rank1Strong}`,
  };
  const b: CriterionResult = {
    id: 'b',
    label: 'fresh net passes >= +2 with <= 2 lost',
    pass: !malformed && fresh.net >= A.freshNetMin && fresh.lost.length <= A.freshLostMax,
    detail: malformed
      ? `malformed comparison: ids missing in one run: ${fresh.missingIds.join(', ')}`
      : `net ${fresh.net >= 0 ? '+' : ''}${fresh.net} (gained ${fresh.gained.length}, lost ${fresh.lost.length})`,
  };
  const c: CriterionResult = {
    id: 'c',
    label: 'no new confident-wrong in the top 3 (fresh negatives)',
    pass: !malformed && fresh.newConfidentWrong.length <= A.newConfidentWrongMax,
    detail: malformed
      ? 'malformed comparison'
      : `new confident-wrong: ${fresh.newConfidentWrong.join(', ') || 'none'}`,
  };
  const criteria = [a, b, c];
  return { criteria, accept: criteria.every((x) => x.pass) };
}
