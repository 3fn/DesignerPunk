/**
 * find_docs — deep headings (H3/H4) through the co-occurrence gate (indexer fix 2, 2026-10-13).
 *
 * Issue + pre-registration: .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md.
 * Rubric: .kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md,
 * amendment "deep headings through a co-occurrence gate".
 *
 * PURE: synthetic DocumentMetadata fixtures; the corpus-level guard lives in
 * find-docs-deep-headings.corpus.test.ts.
 */

import { findDocsConcept, deepHeadingGateK, selectDeepHeading } from '../QueryEngine';
import { DocumentMetadata } from '../../models';
import { WithDeepSections } from '../../indexer/heading-parser';

function doc(overrides: Partial<DocumentMetadata & WithDeepSections>): DocumentMetadata & WithDeepSections {
  return {
    path: '.kiro/steering/Fixture.md',
    id: 'fixture',
    purpose: '',
    layer: 2,
    relevantTasks: [],
    lastReviewed: '',
    organization: 'Thurgood',
    sections: [],
    tokenCount: 100,
    ...overrides,
  };
}

describe('deepHeadingGateK — max(2, min(3, salient tokens))', () => {
  it.each([
    [1, 2],
    [2, 2],
    [3, 3],
    [4, 3],
    [7, 3],
  ])('%i salient tokens → K = %i', (n, k) => {
    expect(deepHeadingGateK(n)).toBe(k);
  });
});

describe('selectDeepHeading — the gate at 1/2/3/4-token queries', () => {
  const deep = ['CI provenance — where a green was measured', 'Unrelated Heading'];

  it('1-token query: a deep heading can never pass (K = 2)', () => {
    expect(selectDeepHeading(deep, ['provenance'])).toBeNull();
  });

  it('2-token query: passes only with both tokens in the same heading', () => {
    expect(selectDeepHeading(deep, ['ci', 'provenance'])?.heading).toBe(deep[0]);
    expect(selectDeepHeading(deep, ['ci', 'unrelated'])).toBeNull();
  });

  it('3-token query: needs all three in one heading', () => {
    expect(selectDeepHeading(deep, ['green', 'measured', 'provenance'])?.matched).toBe(3);
    expect(selectDeepHeading(deep, ['green', 'measured', 'banana'])).toBeNull();
  });

  it('4-token query: three of four in one heading pass (K = 3), two do not', () => {
    expect(selectDeepHeading(deep, ['green', 'measured', 'provenance', 'banana'])?.matched).toBe(3);
    expect(selectDeepHeading(deep, ['green', 'measured', 'apple', 'banana'])).toBeNull();
  });

  it('no deep headings, or no salient tokens → null', () => {
    expect(selectDeepHeading(undefined, ['a', 'b'])).toBeNull();
    expect(selectDeepHeading([], ['a', 'b'])).toBeNull();
    expect(selectDeepHeading(deep, [])).toBeNull();
  });
});

describe('single best deep heading per doc — scattered tokens never add up', () => {
  it('tokens spread across two headings do not combine', () => {
    // Each heading holds 2 of the 4 query tokens; K = 3 → neither passes.
    const sel = selectDeepHeading(['Base Variant', 'Inheritance Patterns'], ['base', 'variant', 'inheritance', 'patterns']);
    expect(sel).toBeNull();
  });

  it('only the best heading’s tokens are credited', () => {
    const d = doc({ id: 'd', path: 'd.md', deepSections: ['Alpha Beta Gamma', 'Delta'] });
    const r = findDocsConcept([d], 'alpha beta gamma delta');
    const on = r.data[0].matchedOn;
    expect(on).toEqual(expect.arrayContaining(['subsections:alpha', 'subsections:beta', 'subsections:gamma']));
    expect(on).not.toContain('subsections:delta');
  });

  it('a tie on matched count goes to the first heading in document order', () => {
    expect(selectDeepHeading(['Alpha Beta', 'Alpha Beta Again'], ['alpha', 'beta'])?.heading).toBe('Alpha Beta');
  });
});

describe('evidence and tier', () => {
  it("emits the 'subsections:' matchedOn class for gated deep-heading hits", () => {
    const d = doc({ id: 'd', path: 'd.md', deepSections: ['The delegated-tier line — unconditional'] });
    const r = findDocsConcept([d], 'delegated tier line');
    expect(r.data).toHaveLength(1);
    expect(r.data[0].matchedOn.filter((m) => m.startsWith('subsections:')).sort()).toEqual([
      'subsections:delegated', 'subsections:line', 'subsections:tier',
    ]);
  });

  it('a gated deep heading holding every salient token is an exact multi-token heading match → strong (tier rule unchanged)', () => {
    const d = doc({ id: 'd', path: 'd.md', deepSections: ['CI provenance'] });
    expect(findDocsConcept([d], 'ci provenance').data[0].matchConfidence).toBe('strong');
  });

  it('a deep heading that fails the gate contributes nothing (doc absent if nothing else matches)', () => {
    const d = doc({ id: 'd', path: 'd.md', deepSections: ['Provenance'] });
    expect(findDocsConcept([d], 'provenance').data).toEqual([]);
  });

  it('a token already credited to a higher field is not re-credited to subsections', () => {
    const d = doc({ id: 'd', path: 'd.md', title: 'Alpha', deepSections: ['Alpha Beta'] });
    const on = findDocsConcept([d], 'alpha beta').data[0].matchedOn;
    expect(on).toContain('title:alpha');
    expect(on).toContain('subsections:beta');
    expect(on).not.toContain('subsections:alpha');
  });
});
