/**
 * Discovery Study Stage 1 — scorer wrapper tests (PURE; no index, no filesystem).
 *
 * TEMPORARY TEST — retire with the study instrument (charter
 * .kiro/issues/2026-10-12-discovery-study-stage1-docs-charter.md § 8 Closing).
 * Pins the pre-registered scoring contract (charter § 2) so it cannot drift between the
 * pre-registration commit and the results commit.
 */

import {
  toStudyHits,
  scorePositive,
  scoreNegative,
  intentMode,
  isCueExposed,
  summarizePositives,
  summarizeNegatives,
  StudyHit,
  NEGATIVE_STRONG_BOUND,
  POSITIVE_RANK_BOUND,
  FIND_DOCS_TOOL,
} from '../study-scoring';
import { FindDocsEntry } from '../../query/QueryEngine';

const hit = (id: string, rank: number, tier: 'strong' | 'partial'): StudyHit => ({ id, rank, matchConfidence: tier });

function entry(p: string, rank: number, mc?: 'strong' | 'partial' | 'none'): FindDocsEntry {
  return { path: p, summary: '', owner: '', matchedOn: [], matchConfidence: mc, rank };
}

describe('pre-registered constants', () => {
  it('positive rank bound is 2; negative strong bound is 3 (F6)', () => {
    expect(POSITIVE_RANK_BOUND).toBe(2);
    expect(NEGATIVE_STRONG_BOUND).toBe(3);
  });
});

describe('toStudyHits — never relies on the missing-tier default', () => {
  const map = new Map([['a.md', 'doc-a'], ['b.md', 'doc-b']]);

  it('translates path → id and keeps rank + tier', () => {
    expect(toStudyHits([entry('a.md', 1, 'strong'), entry('b.md', 2, 'partial')], map)).toEqual([
      hit('doc-a', 1, 'strong'),
      hit('doc-b', 2, 'partial'),
    ]);
  });

  it('throws on a hit with no tier (scoreConcept would have defaulted it to partial)', () => {
    expect(() => toStudyHits([entry('a.md', 1, undefined)], map)).toThrow(/no strong\/partial tier/);
  });

  it("throws on a per-entry 'none' tier", () => {
    expect(() => toStudyHits([entry('a.md', 1, 'none')], map)).toThrow(/no strong\/partial tier/);
  });

  it('throws on an unmapped path', () => {
    expect(() => toStudyHits([entry('zzz.md', 1, 'strong')], map)).toThrow(/unmapped path/);
  });
});

describe('scorePositive — rank-only R@1/R@2 beside tiered PASS', () => {
  it('rank 1 → r1, r2, tieredPass', () => {
    const s = scorePositive('x', [hit('x', 1, 'partial'), hit('y', 2, 'strong')]);
    expect(s).toMatchObject({ rankOfCorrect: 1, tierOfCorrect: 'partial', r1: true, r2: true, tieredPass: true });
    expect(s.strongRanks).toEqual([2]);
  });

  it('rank 2 → not r1, r2 and tieredPass', () => {
    expect(scorePositive('x', [hit('y', 1, 'strong'), hit('x', 2, 'strong')])).toMatchObject({ r1: false, r2: true, tieredPass: true });
  });

  it('rank 3 → a miss under A’s own rule', () => {
    expect(scorePositive('x', [hit('a', 1, 'strong'), hit('b', 2, 'strong'), hit('x', 3, 'strong')])).toMatchObject({
      rankOfCorrect: 3, r2: false, tieredPass: false,
    });
  });

  it('absent → rankOfCorrect null, miss', () => {
    expect(scorePositive('x', [hit('a', 1, 'strong')])).toMatchObject({ rankOfCorrect: null, tierOfCorrect: null, tieredPass: false });
  });

  it('records the rank of every strong', () => {
    expect(scorePositive('x', [hit('a', 3, 'strong'), hit('x', 1, 'partial'), hit('b', 2, 'strong')]).strongRanks).toEqual([2, 3]);
  });
});

describe('scoreNegative — correct iff no strong in the top THREE (F6), F5 outcome class', () => {
  it("empty result → 'none', correct", () => {
    expect(scoreNegative([])).toMatchObject({ outcome: 'none', correct: true, strongInTop3: false });
  });

  it("partial-only → 'labeled-closest', correct", () => {
    expect(scoreNegative([hit('a', 1, 'partial'), hit('b', 2, 'partial')])).toMatchObject({ outcome: 'labeled-closest', correct: true });
  });

  it("strong at rank 3 → 'confident-wrong', not in the top-2 or rank-1 subsets", () => {
    const s = scoreNegative([hit('a', 1, 'partial'), hit('b', 2, 'partial'), hit('c', 3, 'strong')]);
    expect(s).toMatchObject({ outcome: 'confident-wrong', correct: false, strongAtRank1: false, strongInTop2: false, strongInTop3: true });
  });

  it("strong at rank 1 → 'confident-wrong' in all three subsets", () => {
    expect(scoreNegative([hit('a', 1, 'strong')])).toMatchObject({ strongAtRank1: true, strongInTop2: true, strongInTop3: true, correct: false });
  });

  it("strong only at rank 4 → 'labeled-closest', correct (outside the F6 bound)", () => {
    const s = scoreNegative([hit('a', 1, 'partial'), hit('b', 2, 'partial'), hit('c', 3, 'partial'), hit('d', 4, 'strong')]);
    expect(s).toMatchObject({ outcome: 'labeled-closest', correct: true });
    expect(s.strongRanks).toEqual([4]);
    expect(s.top3.map((h) => h.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('intentMode — mechanical, from the verbatim tool string', () => {
  it("find_docs first → 'search' (incl. 'find_docs then …')", () => {
    expect(intentMode(FIND_DOCS_TOOL)).toBe('search');
    expect(intentMode(`${FIND_DOCS_TOOL} then get_document_summary (test-development-standards)`)).toBe('search');
  });

  it("get_section / get_document_summary → 'direct'", () => {
    expect(intentMode('mcp__designerpunk-docs__get_section (web-authoring-standards, "Quality Patterns")')).toBe('direct');
    expect(intentMode('mcp__designerpunk-docs__get_document_summary (test-behavioral-contract-validation)')).toBe('direct');
  });
});

describe('isCueExposed — the seat’s own routing cues, mechanical string compare', () => {
  const cues = [
    { docId: 'product-handoff-protocol', section: null },
    { docId: 'process-task-type-definitions', section: 'Overview' },
    { docId: 'web-authoring-standards', section: 'Quality Patterns' },
  ];

  it('doc id in the query text (hyphens read as spaces)', () => {
    expect(isCueExposed('implementation report format product handoff protocol tier 2', FIND_DOCS_TOOL, cues)).toBe(true);
  });

  it('doc id in the tool string', () => {
    expect(isCueExposed('some phrasing', 'mcp__designerpunk-docs__get_section (web-authoring-standards, "x")', cues)).toBe(true);
  });

  it('section title of ≥ 2 words in the query', () => {
    expect(isCueExposed('web css quality patterns shadow dom', FIND_DOCS_TOOL, cues)).toBe(true);
  });

  it('a one-word section title ("Overview") does not count', () => {
    expect(isCueExposed('overview of tiers', FIND_DOCS_TOOL, [{ docId: 'process-task-type-definitions', section: 'Overview' }])).toBe(false);
  });

  it('no cue present → false', () => {
    expect(isCueExposed('which token for touch target size', FIND_DOCS_TOOL, cues)).toBe(false);
  });
});

describe('summaries', () => {
  it('summarizePositives counts r1 / r2 / tieredPass and lists misses', () => {
    const rows = [
      { id: 'P1', score: scorePositive('x', [hit('x', 1, 'strong')]) },
      { id: 'P2', score: scorePositive('x', [hit('y', 1, 'strong'), hit('x', 2, 'partial')]) },
      { id: 'P3', score: scorePositive('x', [hit('y', 1, 'strong')]) },
    ];
    expect(summarizePositives(rows)).toEqual({ n: 3, r1: 1, r2: 2, tieredPass: 2, misses: ['P3'] });
  });

  it('summarizeNegatives counts outcomes and subsets', () => {
    const rows = [
      { id: 'N1', score: scoreNegative([]) },
      { id: 'N2', score: scoreNegative([hit('a', 1, 'partial')]) },
      { id: 'N3', score: scoreNegative([hit('a', 1, 'partial'), hit('b', 2, 'strong')]) },
    ];
    expect(summarizeNegatives(rows)).toEqual({
      n: 3, correct: 2, confidentWrongTop3: 1, strongAtRank1: 0, strongInTop2: 1,
      outcomes: { none: 1, 'labeled-closest': 1, 'confident-wrong': 1 },
    });
  });
});
