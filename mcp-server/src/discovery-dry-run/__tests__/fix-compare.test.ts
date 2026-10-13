/**
 * Discovery indexer fix — comparison + acceptance tests (PURE).
 *
 * TEMPORARY TEST — retire with the indexer-fix study instrument
 * (.kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md). Pins the pre-registered
 * acceptance so it cannot drift between the fresh set's freeze and the runs.
 */

import { diffSet, evaluateAcceptance, FIX_ACCEPTANCE, SetRun, OracleSummary } from '../fix-compare';
import { scorePositive, scoreNegative, StudyHit } from '../study-scoring';

const hit = (id: string, rank: number, tier: 'strong' | 'partial'): StudyHit => ({ id, rank, matchConfidence: tier });
const posAt = (rank: number | null) => scorePositive('x', rank === null ? [] : [hit('x', rank, 'partial')]);
const negWithStrongAt = (rank: number | null) =>
  scoreNegative(rank === null ? [hit('a', 1, 'partial')] : [hit('a', 1, 'partial'), hit('b', rank, 'strong')].sort((p, q) => p.rank - q.rank));

const ORACLE_OK: OracleSummary = { total: 83, pass: 83, weak: 0, miss: 0, rank1Strong: 77 };

function run(pos: Record<string, number | null>, neg: Record<string, number | null>): SetRun {
  return {
    positives: Object.entries(pos).map(([id, r]) => ({ id, score: posAt(r) })),
    negatives: Object.entries(neg).map(([id, r]) => ({ id, score: negWithStrongAt(r) })),
  };
}

describe('pre-registered acceptance constants', () => {
  it('match the fixture header', () => {
    expect(FIX_ACCEPTANCE).toEqual({
      oraclePass: 83, oracleWeak: 0, oracleMiss: 0, oracleRank1StrongMin: 77,
      freshNetMin: 2, freshLostMax: 2, newConfidentWrongMax: 0,
    });
  });
});

describe('diffSet', () => {
  it('counts gained, lost, net and rank changes on positives', () => {
    const d = diffSet(run({ P1: 3, P2: null, P3: 1, P4: 2 }, {}), run({ P1: 1, P2: 2, P3: 5, P4: 2 }, {}));
    expect(d.gained.sort()).toEqual(['P1', 'P2']);
    expect(d.lost).toEqual(['P3']);
    expect(d.net).toBe(1);
    expect(d.rankChanges.map((c) => c.id).sort()).toEqual(['P1', 'P2', 'P3']);
  });

  it('flags a new confident-wrong only when a base-correct negative gains a top-3 strong', () => {
    const d = diffSet(run({}, { N1: null, N2: 4, N3: 1 }), run({}, { N1: 3, N2: 2, N3: null }));
    expect(d.newConfidentWrong.sort()).toEqual(['N1', 'N2']);
    expect(d.resolvedConfidentWrong).toEqual(['N3']);
  });

  it('a strong moving from rank 4 to rank 4 is not new', () => {
    expect(diffSet(run({}, { N1: 4 }), run({}, { N1: 4 })).newConfidentWrong).toEqual([]);
  });

  it('reports ids present in only one run', () => {
    expect(diffSet(run({ P1: 1 }, {}), run({ P2: 1 }, {})).missingIds.sort()).toEqual(['P1', 'P2']);
  });
});

describe('evaluateAcceptance', () => {
  const ok = diffSet(run({ P1: 3, P2: null }, { N1: null }), run({ P1: 1, P2: 2 }, { N1: null }));

  it('ACCEPTS when (a), (b) and (c) all hold', () => {
    const r = evaluateAcceptance(ORACLE_OK, ok);
    expect(r.accept).toBe(true);
    expect(r.criteria.map((c) => c.pass)).toEqual([true, true, true]);
  });

  it('(a) fails on any oracle WEAK, or rank-1-strong below 77', () => {
    expect(evaluateAcceptance({ ...ORACLE_OK, pass: 82, weak: 1 }, ok).criteria[0].pass).toBe(false);
    expect(evaluateAcceptance({ ...ORACLE_OK, rank1Strong: 76 }, ok).criteria[0].pass).toBe(false);
    expect(evaluateAcceptance({ ...ORACLE_OK, rank1Strong: 80 }, ok).criteria[0].pass).toBe(true);
  });

  it('(b) fails at net +1, and when more than 2 are lost even if net >= +2', () => {
    const net1 = diffSet(run({ P1: 3 }, {}), run({ P1: 1 }, {}));
    expect(evaluateAcceptance(ORACLE_OK, net1).criteria[1].pass).toBe(false);
    const lost3 = diffSet(
      run({ G1: null, G2: null, G3: null, G4: null, G5: null, L1: 1, L2: 1, L3: 1 }, {}),
      run({ G1: 1, G2: 1, G3: 1, G4: 1, G5: 1, L1: null, L2: null, L3: null }, {}),
    );
    expect(lost3.net).toBe(2);
    expect(evaluateAcceptance(ORACLE_OK, lost3).criteria[1].pass).toBe(false);
  });

  it('(c) fails on one new confident-wrong', () => {
    const d = diffSet(run({ P1: 3, P2: null }, { N1: null }), run({ P1: 1, P2: 2 }, { N1: 2 }));
    const r = evaluateAcceptance(ORACLE_OK, d);
    expect(r.criteria[2].pass).toBe(false);
    expect(r.accept).toBe(false);
  });

  it('a malformed comparison fails (b) and (c)', () => {
    const d = diffSet(run({ P1: 3 }, {}), run({ P9: 1 }, {}));
    const r = evaluateAcceptance(ORACLE_OK, d);
    expect(r.criteria[1].pass).toBe(false);
    expect(r.criteria[2].pass).toBe(false);
  });
});
