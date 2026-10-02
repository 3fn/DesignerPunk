/**
 * triviality.assignment.test.ts — Spec 123 Task 13.4, criterion "The strict count is a valid
 * occurrence assignment, not per-item `includes`" (design C18 clause 2; closes G1 run 2 DR-1):
 *
 *   (i)  WITNESS — assignOccurrences returns the assignment it counted: each credited item id
 *        paired with the offset of its occurrence, not only the count;
 *   (ii) VALIDITY, AS A PROPERTY TEST over generated renderings — every returned assignment is
 *        valid: each credited item's complete text occurs at its assigned offset, no two credited
 *        items share an occurrence, and no two assigned occurrences overlap.
 *
 * (iii) is triviality.records.test.ts; (iv) and (v) are triviality.g1.test.ts / triviality.floor.test.ts.
 * Scope: any valid assignment is sound (C18); maximality is not asserted (G1 run 2 R2-A2).
 */
import fc from 'fast-check';
import { assignmentViolations, assignOccurrences, occurrences, type OperativeItem } from '../regrounding/triviality';

const items = (...texts: string[]): OperativeItem[] => texts.map((text, i) => ({ id: `i${i}`, text }));

describe('(i) the witness', () => {
  it('returns each credited item id paired with the offset of the occurrence it holds', () => {
    const set = items('Alpha rule.', 'Beta rule.');
    expect(assignOccurrences('x Beta rule. y Alpha rule.', set)).toEqual([
      { itemId: 'i1', offset: 2 },
      { itemId: 'i0', offset: 15 },
    ]);
  });

  it('credits items that share a text once per disjoint occurrence, in record order', () => {
    const set = items('X ok.', 'X ok.');
    expect(assignOccurrences('X ok. X ok.', set)).toEqual([
      { itemId: 'i0', offset: 0 },
      { itemId: 'i1', offset: 6 },
    ]);
    expect(assignOccurrences('X ok.', set)).toEqual([{ itemId: 'i0', offset: 0 }]);
  });

  it("does not credit a text that occurs only inside another credited item's occurrence", () => {
    expect(assignOccurrences('alpha beta gamma', items('alpha beta gamma', 'beta'))).toEqual([{ itemId: 'i0', offset: 0 }]);
  });

  it('credits a contained text that also occurs standalone (run 2 edge case "CHECK" — longest-first gets it)', () => {
    expect(assignOccurrences('alpha beta gamma. beta', items('alpha beta gamma', 'beta'))).toEqual([
      { itemId: 'i0', offset: 0 },
      { itemId: 'i1', offset: 18 },
    ]);
  });

  it("reproduces G1 run 2's six synthetic edge cases' expected counts", () => {
    const cases: [string, string[], number][] = [
      ['X ok. X ok.', ['X ok.', 'X ok.'], 2],
      ['X ok.', ['X ok.', 'X ok.'], 1],
      ['alpha beta gamma', ['alpha beta gamma', 'beta'], 1],
      ['alpha beta gamma. beta', ['alpha beta gamma', 'beta'], 2],
      ['p q r', ['p q', 'q r'], 1],
      ['p qq r', ['p q', 'q r'], 2],
    ];
    expect(cases.map(([text, t]) => assignOccurrences(text, items(...t)).length)).toEqual(cases.map(([, , want]) => want));
  });

  it('refuses an empty item text (it would occur everywhere)', () => {
    expect(() => assignOccurrences('anything', [{ id: 'e', text: '' }])).toThrow(/e has an empty text/);
  });

  it('the validity definition rejects what per-item includes produces on a shared text', () => {
    const set = items('X ok.', 'X ok.');
    const includesStyle = set.map((i) => ({ itemId: i.id, offset: 'X ok.'.indexOf(i.text) }));
    expect(assignmentViolations('X ok.', set, includesStyle)).toEqual(['i0 and i1 share or overlap an occurrence']);
  });
});

describe('(ii) validity — property test over generated renderings', () => {
  // A small alphabet makes shared, contained and overlapping texts common, which is the point.
  const token = fc.constantFrom('a', 'b', 'ab', 'ba', 'aab', ' ', '.', 'x');
  const text = fc.array(token, { minLength: 1, maxLength: 4 }).map((ts) => ts.join(''));
  const itemSet = fc.array(text, { minLength: 1, maxLength: 8 }).map((ts) => items(...ts));

  it('every returned assignment is valid, and credits only items that occur', () => {
    fc.assert(
      fc.property(
        itemSet,
        fc.array(fc.oneof(text, token), { maxLength: 20 }),
        fc.array(fc.nat(), { maxLength: 20 }),
        (set, filler, picks) => {
          // Renderings interleave filler with verbatim copies of chosen item texts, so assignments are non-trivial.
          const rendering = filler.map((f, k) => f + (k < picks.length ? set[picks[k] % set.length].text : '')).join('');
          const assignment = assignOccurrences(rendering, set);
          expect(assignmentViolations(rendering, set, assignment)).toEqual([]);
          for (const credit of assignment) {
            const item = set.find((i) => i.id === credit.itemId) as OperativeItem;
            expect(occurrences(rendering, item.text)).toContain(credit.offset);
          }
          expect(assignment.length).toBeLessThanOrEqual(set.length);
        }
      ),
      { numRuns: 2000, seed: 20260928 }
    );
  });

  it('is deterministic (the same input gives the same witness)', () => {
    fc.assert(
      fc.property(itemSet, fc.array(text, { maxLength: 12 }), (set, parts) => {
        const rendering = parts.join('');
        expect(assignOccurrences(rendering, set)).toEqual(assignOccurrences(rendering, set));
      }),
      { numRuns: 300, seed: 20260928 }
    );
  });
});
