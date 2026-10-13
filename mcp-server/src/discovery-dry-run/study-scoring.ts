/**
 * Discovery Study Stage 1 — scorer wrapper (PURE; no index, no filesystem)
 *
 * Charter: .kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md § 2 (pre-registration
 * contract). TEMPORARY study instrument: retire with the study (charter § 8 Closing), or keep
 * only if a later stage reuses it.
 *
 * Sits beside discovery-dry-run.ts and leaves its `scoreConcept` UNCHANGED. Differences, all
 * pre-registered:
 *   - Positives report rank-only R@1 / R@2 BESIDE A's tiered PASS (rank ≤ 2 AND tier ∈
 *     {strong, partial}). `scoreConcept` defaults a missing tier to 'partial'; this wrapper
 *     NEVER does — `toStudyHits` throws on a hit without a strong/partial tier.
 *   - Negatives go through their own branch (an empty key would score MISS in scoreConcept).
 *     Correct iff NO `strong` in the top THREE (fork F6, ruled 2026-10-12). Rank-1 and top-2
 *     subsets are reported alongside. Each negative also records the F5 outcome class:
 *     'none' (empty result) / 'labeled-closest' (results, no strong in top 3) /
 *     'confident-wrong' (a strong in top 3 — the only class that counts against the matcher).
 *   - The rank of EVERY `strong` hit is recorded, for positives and negatives.
 *   - intentMode and cueExposed are computed mechanically from the seat's verbatim strings.
 */

import { FindDocsEntry } from '../query/QueryEngine';

export type StudyTier = 'strong' | 'partial';

/** A ranked find_docs hit translated to the addressing plane (doc id), tier required. */
export interface StudyHit {
  id: string;
  rank: number;
  matchConfidence: StudyTier;
}

/** Rank bound for a positive PASS (same as the 119-A harness's PASS_RANK_BOUND). */
export const POSITIVE_RANK_BOUND = 2;
/** Rank bound within which a `strong` on a negative is confident-wrong (F6: top three). */
export const NEGATIVE_STRONG_BOUND = 3;
/** The find_docs tool name; a seat tool string starting with it is intentMode 'search'. */
export const FIND_DOCS_TOOL = 'mcp__designerpunk-docs__find_docs';

/**
 * Translate find_docs entries to StudyHits. Throws (never defaults) when an entry has no
 * strong/partial tier or its path does not map to a doc id.
 */
export function toStudyHits(entries: FindDocsEntry[], pathToId: Map<string, string>): StudyHit[] {
  return entries.map((e, idx) => {
    const id = pathToId.get(e.path);
    if (id === undefined) throw new Error(`study-scoring: unmapped path '${e.path}'`);
    if (e.matchConfidence !== 'strong' && e.matchConfidence !== 'partial') {
      throw new Error(`study-scoring: hit '${id}' has no strong/partial tier (got '${String(e.matchConfidence)}')`);
    }
    return { id, rank: typeof e.rank === 'number' ? e.rank : idx + 1, matchConfidence: e.matchConfidence };
  });
}

function strongRanksOf(hits: StudyHit[]): number[] {
  return hits.filter((h) => h.matchConfidence === 'strong').map((h) => h.rank).sort((a, b) => a - b);
}

export interface PositiveScore {
  rankOfCorrect: number | null;
  tierOfCorrect: StudyTier | null;
  /** Rank-only. */
  r1: boolean;
  /** Rank-only. */
  r2: boolean;
  /** A's own rule: rank ≤ 2 AND tier ∈ {strong, partial}. A miss = !tieredPass. */
  tieredPass: boolean;
  strongRanks: number[];
}

export function scorePositive(expectedDocId: string, hits: StudyHit[]): PositiveScore {
  let best: StudyHit | null = null;
  for (const h of hits) {
    if (h.id === expectedDocId && (best === null || h.rank < best.rank)) best = h;
  }
  const rank = best ? best.rank : null;
  return {
    rankOfCorrect: rank,
    tierOfCorrect: best ? best.matchConfidence : null,
    r1: rank === 1,
    r2: rank !== null && rank <= POSITIVE_RANK_BOUND,
    tieredPass: best !== null && best.rank <= POSITIVE_RANK_BOUND,
    strongRanks: strongRanksOf(hits),
  };
}

export type NegativeOutcome = 'none' | 'labeled-closest' | 'confident-wrong';

export interface NegativeScore {
  outcome: NegativeOutcome;
  /** Correct iff outcome !== 'confident-wrong'. */
  correct: boolean;
  strongRanks: number[];
  strongAtRank1: boolean;
  strongInTop2: boolean;
  strongInTop3: boolean;
  /** Top-3 ids with tiers, for the per-query table. */
  top3: StudyHit[];
}

export function scoreNegative(hits: StudyHit[]): NegativeScore {
  const strongRanks = strongRanksOf(hits);
  const strongInTop3 = strongRanks.some((r) => r <= NEGATIVE_STRONG_BOUND);
  const outcome: NegativeOutcome =
    hits.length === 0 ? 'none' : strongInTop3 ? 'confident-wrong' : 'labeled-closest';
  return {
    outcome,
    correct: outcome !== 'confident-wrong',
    strongRanks,
    strongAtRank1: strongRanks.includes(1),
    strongInTop2: strongRanks.some((r) => r <= 2),
    strongInTop3,
    top3: [...hits].sort((a, b) => a.rank - b.rank).slice(0, 3),
  };
}

export type IntentMode = 'search' | 'direct';

export function intentMode(seatTool: string): IntentMode {
  return seatTool.trim().startsWith(FIND_DOCS_TOOL) ? 'search' : 'direct';
}

export interface CueRef {
  docId: string;
  section: string | null;
}

function norm(s: string): string {
  return s.toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * cueExposed: a routing cue from the seat's own charter appears in the query text or the
 * seat's tool string — the cue's doc id, or its section title when it has ≥ 2 words.
 * Lowercased; '-' and '_' read as spaces.
 */
export function isCueExposed(query: string, seatTool: string, cues: CueRef[]): boolean {
  const hay = [norm(query), norm(seatTool)];
  return cues.some((c) => {
    const needles = [norm(c.docId)];
    if (c.section && norm(c.section).split(' ').length >= 2) needles.push(norm(c.section));
    return needles.some((n) => hay.some((h) => h.includes(n)));
  });
}

export interface PositiveSummary {
  n: number;
  r1: number;
  r2: number;
  tieredPass: number;
  /** Ids failing A's own rule — the bucketing worklist (charter § 1f). */
  misses: string[];
}

export function summarizePositives(rows: Array<{ id: string; score: PositiveScore }>): PositiveSummary {
  return {
    n: rows.length,
    r1: rows.filter((r) => r.score.r1).length,
    r2: rows.filter((r) => r.score.r2).length,
    tieredPass: rows.filter((r) => r.score.tieredPass).length,
    misses: rows.filter((r) => !r.score.tieredPass).map((r) => r.id),
  };
}

export interface NegativeSummary {
  n: number;
  correct: number;
  confidentWrongTop3: number;
  strongAtRank1: number;
  strongInTop2: number;
  outcomes: Record<NegativeOutcome, number>;
}

export function summarizeNegatives(rows: Array<{ id: string; score: NegativeScore }>): NegativeSummary {
  const outcomes: Record<NegativeOutcome, number> = { none: 0, 'labeled-closest': 0, 'confident-wrong': 0 };
  for (const r of rows) outcomes[r.score.outcome] += 1;
  return {
    n: rows.length,
    correct: rows.filter((r) => r.score.correct).length,
    confidentWrongTop3: rows.filter((r) => r.score.strongInTop3).length,
    strongAtRank1: rows.filter((r) => r.score.strongAtRank1).length,
    strongInTop2: rows.filter((r) => r.score.strongInTop2).length,
    outcomes,
  };
}
