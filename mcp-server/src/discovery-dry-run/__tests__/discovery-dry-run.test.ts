/**
 * Discovery dry-run harness — unit tests (Spec 119-A Task 10.2).
 *
 * Covers the PURE scoring core (no index / no filesystem):
 *  - classify(): the Decision-4 PASS / WEAK / MISS boundaries
 *  - scoreConcept(): the B5 path→id translation, best-rank selection across
 *    multiple acceptable expected ids, and the MISS path when no expected id
 *    appears (or appears only under an un-translated path)
 *  - aggregate(): clearsThreshold (hard gate) + rank1StrongRate (soft signal)
 *    + weakOrMiss worklist extraction
 */

import {
  classify,
  scoreConcept,
  aggregate,
  PASS_RANK_BOUND,
  RANK1_STRONG_SIGNAL_THRESHOLD,
  OracleEntry,
  DryRunScore,
} from '../discovery-dry-run';
import { FindDocsEntry } from '../../query/QueryEngine';

function entry(
  pathKey: string,
  rank: number,
  matchConfidence: 'strong' | 'partial' | 'none',
): FindDocsEntry {
  return {
    path: pathKey,
    summary: 'fixture',
    owner: 'test',
    matchedOn: [],
    matchConfidence,
    rank,
  };
}

describe('classify (Decision 4 boundaries)', () => {
  it('MISS when the correct doc is absent (rank null)', () => {
    expect(classify(null, 'none')).toBe('MISS');
    expect(classify(null, 'strong')).toBe('MISS');
  });

  it('PASS at rank 1 strong and rank 2 partial (within bound, ≥ partial)', () => {
    expect(classify(1, 'strong')).toBe('PASS');
    expect(classify(1, 'partial')).toBe('PASS');
    expect(classify(2, 'strong')).toBe('PASS');
    expect(classify(2, 'partial')).toBe('PASS');
  });

  it('WEAK when reachable but past the rank bound', () => {
    expect(classify(3, 'strong')).toBe('WEAK');
    expect(classify(5, 'partial')).toBe('WEAK');
  });

  it('WEAK (defensive) when within bound but confidence is none', () => {
    expect(classify(1, 'none')).toBe('WEAK');
  });

  it('honors PASS_RANK_BOUND as the inclusive top-2 bar', () => {
    expect(PASS_RANK_BOUND).toBe(2);
  });
});

describe('scoreConcept (B5 path→id translation + best-rank selection)', () => {
  const oracle: OracleEntry = {
    concept: 'token governance',
    expectedDocIds: ['token-governance'],
  };
  // Path is the indexed relative key; id is the addressing-plane slug — they differ.
  const pathToId = new Map<string, string>([
    ['governance/Token-Governance.md', 'token-governance'],
    ['governance/Token-Quick-Reference.md', 'token-quick-reference'],
  ]);

  it('translates path→id before comparing (the load-bearing B5 step)', () => {
    const results = [
      entry('governance/Token-Governance.md', 1, 'strong'),
      entry('governance/Token-Quick-Reference.md', 2, 'partial'),
    ];
    const score = scoreConcept(oracle, results, pathToId);
    expect(score.rankOfCorrect).toBe(1);
    expect(score.matchedId).toBe('token-governance');
    expect(score.matchConfidence).toBe('strong');
    expect(score.classification).toBe('PASS');
  });

  it('scores MISS when the expected id is absent from results', () => {
    const results = [entry('governance/Token-Quick-Reference.md', 1, 'strong')];
    const score = scoreConcept(oracle, results, pathToId);
    expect(score.rankOfCorrect).toBeNull();
    expect(score.matchConfidence).toBe('none');
    expect(score.classification).toBe('MISS');
    expect(score.matchedId).toBeNull();
  });

  it('scores MISS when the path cannot be translated (no path→id entry)', () => {
    // Without the B5 map this WOULD be the silent failure: path present, id unknown.
    const results = [entry('governance/Unmapped-Doc.md', 1, 'strong')];
    const score = scoreConcept(oracle, results, pathToId);
    expect(score.classification).toBe('MISS');
  });

  it('takes the BEST (lowest) rank when several acceptable ids appear', () => {
    const multi: OracleEntry = {
      concept: 'color contrast accessibility',
      expectedDocIds: ['token-family-accessibility', 'token-family-color'],
    };
    const map = new Map<string, string>([
      ['governance/Token-Family-Color.md', 'token-family-color'],
      ['governance/Token-Family-Accessibility.md', 'token-family-accessibility'],
    ]);
    const results = [
      entry('governance/Token-Family-Color.md', 1, 'partial'),
      entry('governance/Token-Family-Accessibility.md', 4, 'partial'),
    ];
    const score = scoreConcept(multi, results, map);
    expect(score.rankOfCorrect).toBe(1);
    expect(score.matchedId).toBe('token-family-color');
    expect(score.classification).toBe('PASS');
  });

  it('classifies WEAK when the only acceptable id is past the rank bound', () => {
    const results = [
      entry('governance/Token-Quick-Reference.md', 1, 'strong'),
      entry('governance/Token-Quick-Reference.md', 2, 'strong'),
      entry('governance/Token-Governance.md', 3, 'partial'),
    ];
    const score = scoreConcept(oracle, results, pathToId);
    expect(score.rankOfCorrect).toBe(3);
    expect(score.classification).toBe('WEAK');
  });

  it('falls back to array index when entry.rank is absent', () => {
    const results: FindDocsEntry[] = [
      { path: 'governance/Token-Quick-Reference.md', summary: '', owner: '', matchedOn: [], matchConfidence: 'partial' },
      { path: 'governance/Token-Governance.md', summary: '', owner: '', matchedOn: [], matchConfidence: 'partial' },
    ];
    const score = scoreConcept(oracle, results, pathToId);
    expect(score.rankOfCorrect).toBe(2); // index 1 → 1-based rank 2
    expect(score.classification).toBe('PASS');
  });
});

describe('aggregate (hard gate + soft signal + worklist)', () => {
  function s(concept: string, classification: 'PASS' | 'WEAK' | 'MISS', rank: number | null, conf: 'strong' | 'partial' | 'none'): DryRunScore {
    return {
      concept,
      expectedDocIds: ['x'],
      rankOfCorrect: rank,
      matchConfidence: conf,
      classification,
      matchedId: rank === null ? null : 'x',
    };
  }

  it('clearsThreshold true iff no WEAK and no MISS', () => {
    const allPass = aggregate('floor', [
      s('a', 'PASS', 1, 'strong'),
      s('b', 'PASS', 2, 'partial'),
    ]);
    expect(allPass.clearsThreshold).toBe(true);
    expect(allPass.weakOrMiss).toEqual([]);

    const withWeak = aggregate('floor', [s('a', 'PASS', 1, 'strong'), s('b', 'WEAK', 4, 'partial')]);
    expect(withWeak.clearsThreshold).toBe(false);

    const withMiss = aggregate('floor', [s('a', 'PASS', 1, 'strong'), s('b', 'MISS', null, 'none')]);
    expect(withMiss.clearsThreshold).toBe(false);
  });

  it('weakOrMiss IS the alias-seeding worklist (every non-PASS concept)', () => {
    const r = aggregate('floor', [
      s('pass-one', 'PASS', 1, 'strong'),
      s('weak-one', 'WEAK', 3, 'partial'),
      s('miss-one', 'MISS', null, 'none'),
    ]);
    expect(r.weakOrMiss).toEqual(['weak-one', 'miss-one']);
  });

  it('rank1StrongRate counts only rank-1 strong hits over total', () => {
    const r = aggregate('floor', [
      s('a', 'PASS', 1, 'strong'),
      s('b', 'PASS', 1, 'strong'),
      s('c', 'PASS', 2, 'partial'),
      s('d', 'WEAK', 5, 'partial'),
    ]);
    expect(r.rank1StrongRate).toBeCloseTo(0.5);
    expect(r.summary).toEqual({ total: 4, pass: 3, weak: 1, miss: 0, rank1Strong: 2 });
  });

  it('rank1StrongRate is a SIGNAL, not the gate: can be below threshold while gate clears', () => {
    // All PASS (gate clears) but rank-1-strong rate is only 0.25 (< 0.8 signal).
    const r = aggregate('floor', [
      s('a', 'PASS', 1, 'strong'),
      s('b', 'PASS', 2, 'partial'),
      s('c', 'PASS', 2, 'partial'),
      s('d', 'PASS', 2, 'partial'),
    ]);
    expect(r.clearsThreshold).toBe(true);
    expect(r.rank1StrongRate).toBeLessThan(RANK1_STRONG_SIGNAL_THRESHOLD);
  });

  it('handles the empty oracle without dividing by zero', () => {
    const r = aggregate('floor', []);
    expect(r.rank1StrongRate).toBe(0);
    expect(r.clearsThreshold).toBe(true);
  });
});
