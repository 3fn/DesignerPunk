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
 *
 * C18 CLAUSE 5, THE ENTRY GRAIN (ballot 2026-10-21-routes-floor-re-pointed-frontmatter-members § 3
 * site 1, Lina's conditions): `routesEntry`'s cases, and a pin that `classifyCharter`'s output over
 * the body-unit inputs it already had is unchanged by the clause. The pin's expected lines were
 * frozen BEFORE clause 5 was written (the application branch's base, `dae569756`) and are
 * unchanged after it; they move only with an explicit re-derivation, as the g1 record pin does.
 */
import fc from 'fast-check';
import {
  assignmentViolations,
  assignOccurrences,
  classifyCharter,
  occurrences,
  routesEntry,
  type OperativeItem,
  type UnitResult,
} from '../regrounding/triviality';
import { loadG1Manifest, readG1Rendering, type G1Fixture } from '../__fixtures__/g1-renderings';
import { canonicalUnits, readRecord } from './triviality.helpers';

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

describe('C18 clause 5 — the entry grain (routesEntry)', () => {
  it('a re-pointed frontmatter row ROUTES, reason re-pointed-entry', () => {
    expect(routesEntry('frontmatter', { disposition: 're-pointed', destination: 'frontmatter:tools[x]' })).toEqual({
      verdict: 'ROUTES',
      routedBy: ['re-pointed-entry'],
    });
  });

  it('a re-pointed members row ROUTES, reason re-pointed-entry', () => {
    expect(routesEntry('members', { disposition: 're-pointed', removals: [{ text: 'Peter', cites: 'subtraction-2' }] })).toEqual({
      verdict: 'ROUTES',
      routedBy: ['re-pointed-entry'],
    });
  });

  it('routes whether or not the entry carries a removal or a signature (no measure exists, so nothing is counted)', () => {
    const signed = { disposition: 're-pointed', signature: { signer: 'kenya' } };
    expect(routesEntry('frontmatter', signed)?.routedBy).toEqual(['re-pointed-entry']);
    expect(routesEntry('frontmatter', { disposition: 're-pointed' })?.routedBy).toEqual(['re-pointed-entry']);
  });

  it.each(['retained', 'no-consumer-counterpart', 'superseded-by'])('a %s frontmatter or members row is not routed by clause 5', (disposition) => {
    expect(routesEntry('frontmatter', { disposition })).toBeUndefined();
    expect(routesEntry('members', { disposition })).toBeUndefined();
  });

  it('a body unit is never routed by clause 5, re-pointed or not (it is classifyCharter’s)', () => {
    expect(routesEntry('body', { disposition: 're-pointed' })).toBeUndefined();
    expect(routesEntry('body', { disposition: 'retained' })).toBeUndefined();
  });

  it('a row that is not a map is not routed', () => {
    for (const row of [undefined, null, 're-pointed', ['re-pointed'], 3]) expect(routesEntry('frontmatter', row)).toBeUndefined();
  });

  it('the verdict is never a score and never a condemnation', () => {
    const r = routesEntry('frontmatter', { disposition: 're-pointed' });
    expect(Object.keys(r ?? {}).sort()).toEqual(['routedBy', 'verdict']);
  });
});

describe('C18 clause 5 leaves classifyCharter untouched — its output over the existing body-unit inputs is frozen', () => {
  /** One line per result: `<exemplar> <anchor>: <retained>/<total> <VERDICT> [reasons] @<item:offset,…>`. */
  const line = (exemplar: string, r: UnitResult): string =>
    !r.entered
      ? `${exemplar} ${r.anchor}: outside`
      : r.verdict === 'INAPPLICABLE'
        ? `${exemplar} ${r.anchor}: 0/0 INAPPLICABLE`
        : `${exemplar} ${r.anchor}: ${r.retained}/${r.total} ${r.verdict} [${r.routedBy.join(',')}] @${r.assignment.map((c) => `${c.itemId}:${c.offset}`).join(',')}`;

  it('every G1 rendering, scored at the charter grain per (exemplar, record), gives the lines frozen before clause 5', () => {
    const groups = new Map<string, G1Fixture[]>();
    for (const f of loadG1Manifest()) groups.set(`${f.exemplar}\t${f.record}`, [...(groups.get(`${f.exemplar}\t${f.record}`) ?? []), f]);
    const out: string[] = [];
    for (const [key, fixtures] of groups) {
      const [exemplar, rel] = key.split('\t');
      const record = readRecord(rel);
      const results = classifyCharter({
        canonicalUnits: canonicalUnits(record.source),
        renderedUnits: new Map(fixtures.map((f) => [f.anchor, readG1Rendering(f)] as [string, string])),
        items: new Map(Object.entries(record.units).map(([a, u]) => [a, u.items] as [string, OperativeItem[]])),
      });
      for (const r of results) out.push(line(exemplar, r));
    }
    expect(out).toEqual([
      "A #audit-checklist: 0/30 ROUTES [below-half] @",
      "B #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script: 0/13 ROUTES [below-half] @",
      "C(c2) #what-parity-means: 0/7 ROUTES [below-half] @",
      "D #the-trigger-set-the-114-superset-table-names-never-numbers: 1/13 ROUTES [below-half] @trigger-closeout:145",
      "E #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script: 0/13 ROUTES [below-half] @",
      "Lina-1 #platform-implementation-true-native-architecture:preamble: 0/2 ROUTES [below-half] @",
      "Lina-1 #web: 0/4 ROUTES [below-half] @",
      "Lina-1 #ios: 0/3 ROUTES [below-half] @",
      "Lina-1 #android: 0/3 ROUTES [below-half] @",
      "Lina-2 #step-1-verify-component-family-doc: 0/2 ROUTES [below-half] @",
      "Lina-2 #step-2-create-typests: 0/1 ROUTES [below-half] @",
      "Lina-2 #step-3-author-contractsyaml: 0/5 ROUTES [below-half] @",
      "Lina-2 #step-4-create-platform-implementations: 0/5 ROUTES [below-half] @",
      "Lina-2 #step-5-create-tests: 0/1 ROUTES [below-half] @",
      "Lina-2 #step-6-create-or-review-component-metayaml: 0/9 ROUTES [below-half] @",
      "Lina-2 #step-7-create-readme: 0/1 ROUTES [below-half] @",
      "AX-1 #audit-checklist: 14/30 ROUTES [below-half] @spec-quality-1:22,spec-quality-2:84,spec-quality-3:161,implementation-coverage-1:214,implementation-coverage-2:263,implementation-coverage-3:317,test-coverage-1:361,test-coverage-2:403,test-coverage-3:479,process-adherence-2:557,metadata-accuracy-1:691,metadata-accuracy-2:790,metadata-accuracy-3:871,documentation-3:1025",
      "G-sketch #item-critical-wait-for-user-authorization-before-starting-new-tasks: 0/7 ROUTES [below-half] @",
      "G-blanket #item-critical-wait-for-user-authorization-before-starting-new-tasks: 0/7 ROUTES [below-half] @",
      "A-blanket #audit-checklist: 0/30 ROUTES [below-half] @",
      "G #item-critical-wait-for-user-authorization-before-starting-new-tasks: 0/7 ROUTES [below-half] @",
      "G′ #item-civitas-governance-health-check: 0/4 ROUTES [below-half] @",
    ]);
  });
});
