/**
 * Discovery Dry-Run Harness — Spec 119-A, Task 10.2 (design Component 6; Req 13 AC3/AC5)
 *
 * Testable core. A thin runner wrapper lives at `scripts/discovery-dry-run.ts`.
 *
 * WHAT THIS IS
 * ----------------------------------------------------------------------------
 * `runDiscoveryDryRun(point, oracle)` scores `find_docs` discovery against a
 * frozen map-oracle (Task 10.1) at one of three baseline points (floor / lift /
 * no-regression — Req 13 AC4). For each oracle concept it records:
 *   - rankOfCorrect  : 1-based rank of the (best) expected doc in the ranked
 *                      results, or null when no expected doc appears (MISS)
 *   - matchConfidence: the matchConfidence the engine assigned to that hit
 *                      (the Spec-121 strong/partial/none signal), or 'none' on MISS
 *   - classification : PASS / WEAK / MISS (Decision 4)
 *
 * DECISION-4 CLASSIFICATION (the hard gate vs. the soft signal)
 * ----------------------------------------------------------------------------
 *   PASS  = correct doc at rank ≤ 2 AND matchConfidence ∈ {strong, partial}
 *           (the hard reachability bar every concept must clear).
 *   MISS  = no expected doc anywhere in the ranked results (unreachable).
 *   WEAK  = expected doc IS present but does NOT clear the bar (rank > 2, or
 *           — defensively — confidence 'none'). Reachable-but-not-good-enough.
 *   clearsThreshold = true iff NO concept is WEAK or MISS (HARD gate, Req 11/13 AC6).
 *   rank1StrongRate = share of concepts at rank-1 with confidence 'strong'
 *                     (a REPORTED quality SIGNAL, review-if-below-~80%, NOT a block).
 *
 * B5 (load-bearing): `find_docs` returns entries keyed on `path` (the indexed
 * relative key); the oracle is keyed on `id`. Scoring MUST translate each
 * returned `path` → `id` via a path→id map BEFORE computing rankOfCorrect, or
 * every concept scores MISS (`path !== id`). The pure scorer takes the path→id
 * map explicitly so this translation is unit-testable in isolation.
 */

import * as path from 'path';
import { DocumentIndexer } from '../indexer/DocumentIndexer';
import { findDocsConcept, FindDocsEntry } from '../query/QueryEngine';

export type MatchConfidence = 'strong' | 'partial' | 'none';
export type DryRunPoint = 'floor' | 'lift' | 'no-regression';
export type Classification = 'PASS' | 'WEAK' | 'MISS';

/** The hard-gate rank bound: correct doc must be at rank ≤ this (Decision 4). */
export const PASS_RANK_BOUND = 2;
/** The soft-signal review tripwire for rank-1-strong rate (Decision 4). NOT a gate. */
export const RANK1_STRONG_SIGNAL_THRESHOLD = 0.8;

export interface OracleEntry {
  concept: string;
  expectedDocIds: string[];
  source?: 'map-concept' | 'agent-query';
  agentDomain?: string;
}

export interface DryRunScore {
  concept: string;
  expectedDocIds: string[];
  /** 1-based rank of the best-ranked expected doc; null = not in results (MISS). */
  rankOfCorrect: number | null;
  /** The matchConfidence the engine assigned to the matched hit ('none' on MISS). */
  matchConfidence: MatchConfidence;
  classification: Classification;
  /** The id that actually matched (the best-ranked expected id found), for audit. */
  matchedId: string | null;
}

export interface DryRunResult {
  point: DryRunPoint;
  scores: DryRunScore[];
  /** Concepts scored WEAK or MISS — the Req 9 alias-seeding worklist (Req 13 AC5). */
  weakOrMiss: string[];
  /** HARD gate (Req 11 / Req 13 AC6): true iff no concept is WEAK/MISS. */
  clearsThreshold: boolean;
  /** SIGNAL, not a gate (Decision 4): share of concepts at rank-1 with 'strong'. */
  rank1StrongRate: number;
  /** Convenience tallies for reporting. */
  summary: {
    total: number;
    pass: number;
    weak: number;
    miss: number;
    rank1Strong: number;
  };
}

/**
 * PURE SCORER for a single concept.
 *
 * @param entry      the oracle concept + its expected (validated) doc ids
 * @param entries    the ranked find_docs results (path-keyed, with rank + matchConfidence)
 * @param pathToId   B5 translation map: indexed `path` → stable `id`
 *
 * Resolution: translate each result `path` → `id`; the rank-of-correct is the
 * MINIMUM rank among results whose translated id is in `expectedDocIds`. The
 * matchConfidence reported is the one the engine gave that best-ranked hit.
 */
export function scoreConcept(
  entry: OracleEntry,
  entries: FindDocsEntry[],
  pathToId: Map<string, string>,
): DryRunScore {
  const expected = new Set(entry.expectedDocIds);

  let bestRank: number | null = null;
  let bestConfidence: MatchConfidence = 'none';
  let bestId: string | null = null;

  entries.forEach((e, idx) => {
    // B5: translate path → id before comparing to the id-keyed oracle.
    const id = pathToId.get(e.path);
    if (id === undefined || !expected.has(id)) return;

    // Prefer the engine-emitted rank; fall back to array index (1-based) if absent.
    const rank = typeof e.rank === 'number' ? e.rank : idx + 1;
    if (bestRank === null || rank < bestRank) {
      bestRank = rank;
      bestConfidence = (e.matchConfidence ?? 'partial') as MatchConfidence;
      bestId = id;
    }
  });

  const classification = classify(bestRank, bestConfidence);

  return {
    concept: entry.concept,
    expectedDocIds: entry.expectedDocIds,
    rankOfCorrect: bestRank,
    matchConfidence: bestRank === null ? 'none' : bestConfidence,
    classification,
    matchedId: bestId,
  };
}

/**
 * Decision-4 classification.
 *   MISS  = correct doc absent from results (rank null).
 *   PASS  = rank ≤ PASS_RANK_BOUND AND confidence ∈ {strong, partial}.
 *   WEAK  = present but does not clear the bar (rank > bound, or confidence 'none').
 */
export function classify(rank: number | null, confidence: MatchConfidence): Classification {
  if (rank === null) return 'MISS';
  const confidenceOk = confidence === 'strong' || confidence === 'partial';
  if (rank <= PASS_RANK_BOUND && confidenceOk) return 'PASS';
  return 'WEAK';
}

/**
 * PURE aggregator: turn per-concept scores into a DryRunResult.
 * Separated from I/O so the gate math (clearsThreshold, rank1StrongRate) is
 * unit-testable without an index.
 */
export function aggregate(point: DryRunPoint, scores: DryRunScore[]): DryRunResult {
  const total = scores.length;
  const pass = scores.filter((s) => s.classification === 'PASS').length;
  const weak = scores.filter((s) => s.classification === 'WEAK').length;
  const miss = scores.filter((s) => s.classification === 'MISS').length;
  const rank1Strong = scores.filter(
    (s) => s.rankOfCorrect === 1 && s.matchConfidence === 'strong',
  ).length;

  const weakOrMiss = scores
    .filter((s) => s.classification !== 'PASS')
    .map((s) => s.concept);

  return {
    point,
    scores,
    weakOrMiss,
    clearsThreshold: weak === 0 && miss === 0,
    rank1StrongRate: total === 0 ? 0 : rank1Strong / total,
    summary: { total, pass, weak, miss, rank1Strong },
  };
}

/**
 * Build the B5 path→id translation map from an indexed corpus.
 * Keyed on the SAME `path` find_docs entries carry (the indexed relative key).
 */
export function buildPathToId(indexer: DocumentIndexer): Map<string, string> {
  const map = new Map<string, string>();
  for (const doc of indexer.getAllDocuments()) {
    map.set(doc.path, doc.id);
  }
  return map;
}

/** Default governance corpus root (the MCP-served, id-addressed non-identity set). */
export const DEFAULT_GOVERNANCE_DIR = path.resolve(__dirname, '../../../governance');

export interface RunOptions {
  /** Override the corpus directory (defaults to the repo `governance/` root). */
  governanceDir?: string;
  /** Inject a pre-built indexer (tests). When absent, one is built over governanceDir. */
  indexer?: DocumentIndexer;
}

/**
 * Run the dry-run at `point` against `oracle`.
 *
 * Instantiates its OWN DocumentIndexer over `governance/` (the same indexer the
 * live Docs MCP uses) and calls the SAME `findDocsConcept` the live `find_docs`
 * tool calls — so the dry-run measures real discovery behavior, not a stand-in.
 */
export async function runDiscoveryDryRun(
  point: DryRunPoint,
  oracle: OracleEntry[],
  opts: RunOptions = {},
): Promise<DryRunResult> {
  let indexer = opts.indexer;
  if (!indexer) {
    indexer = new DocumentIndexer();
    await indexer.indexDirectory(opts.governanceDir ?? DEFAULT_GOVERNANCE_DIR);
  }

  const allDocs = indexer.getAllDocuments();
  const pathToId = buildPathToId(indexer);

  const scores: DryRunScore[] = oracle.map((entry) => {
    const result = findDocsConcept(allDocs, entry.concept);
    return scoreConcept(entry, result.data, pathToId);
  });

  return aggregate(point, scores);
}
