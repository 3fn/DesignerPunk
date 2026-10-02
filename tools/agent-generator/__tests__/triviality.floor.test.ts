/**
 * triviality.floor.test.ts — Spec 123 Task 13.4, the floor's rules over real canonical units.
 *
 * Criteria served (tasks.md Task 13):
 *   - "The entry set is every body unit not byte-identical passthrough (a one-byte change enters;
 *     untouched does not)."
 *   - "The floor matches complete item text, per unit": Lina-2's byte-identical preamble is outside
 *     the entry set; a verbatim unit with a subtraction-1 removal ROUTES.
 *   - "The floor never condemns, per unit": the verdict type has no TRIVIAL value; F's zero-item
 *     units (#purpose and #family-overview:preamble, read from the record) are INAPPLICABLE.
 *   - (v) "per-unit search scope": the search runs only within the unit's own rendered span; an
 *     item whose text appears only in a sibling unit's rendering is not credited.
 *   - "The hard floor fails when every non-empty-item unit is no-consumer-counterpart, including
 *     when a zero-item preamble is left retained."
 * (The Lina-2 step scores and Lina-1 #ios/#android are over the copied G1 fixtures: triviality.g1.test.ts.)
 */
import {
  classifyCharter,
  classifyUnit,
  entrySet,
  FLOOR_VERDICTS,
  hardFloor,
  TrivialityInputError,
  type FloorVerdict,
  type OperativeItem,
} from '../regrounding/triviality';
import type { Disposition } from '../regrounding/dispositions';
import { canonicalUnits, readRecord } from './triviality.helpers';

const lina = readRecord('canonical/operative-sets/lina.yaml');
const nav = readRecord('canonical/operative-sets/component-family-navigation.yaml');
const stacy = readRecord('canonical/operative-sets/stacy.yaml');
const linaUnits = canonicalUnits(lina.source);
const navUnits = canonicalUnits(nav.source);
const stacyUnits = canonicalUnits(stacy.source);
const itemsOf = (record: typeof lina) => new Map(Object.entries(record.units).map(([a, u]) => [a, u.items as readonly OperativeItem[]]));

describe('the floor never condemns', () => {
  it('the verdict type has no TRIVIAL value (compile-time) and the verdict set is closed (run-time)', () => {
    // If a condemning value is ever added to FloorVerdict, this line stops compiling.
    type Admits<T, U> = U extends T ? true : false;
    const admitsTrivial: Admits<FloorVerdict, 'TRIVIAL'> = false;
    const admitsNotTrivial: Admits<FloorVerdict, 'NOT TRIVIAL'> = false;
    expect([admitsTrivial, admitsNotTrivial]).toEqual([false, false]);
    expect([...FLOOR_VERDICTS]).toEqual(['INAPPLICABLE', 'CLEARS', 'ROUTES']);
  });

  it("F's zero-item units (#purpose, #family-overview:preamble), read from the record, are INAPPLICABLE", () => {
    for (const anchor of ['#purpose', '#family-overview:preamble']) {
      expect(nav.units[anchor].items).toEqual([]); // read from the record, not assumed
      const canonical = navUnits.get(anchor) as string;
      const rendering = canonical.replace('Navigation', 'Wayfinding'); // any non-identical rendering
      expect(rendering).not.toBe(canonical);
      expect(classifyUnit({ anchor, canonical, rendering, items: nav.units[anchor].items })).toEqual({
        anchor,
        entered: true,
        verdict: 'INAPPLICABLE',
        total: 0,
      });
    }
  });

  it('a unit entering with no committed operative set is refused, never read as zero items (11.6.5d)', () => {
    const anchor = '#when-to-use'; // a Navigation unit with no record entry
    const canonical = navUnits.get(anchor) as string;
    expect(() =>
      classifyCharter({
        canonicalUnits: new Map([[anchor, canonical]]),
        renderedUnits: new Map([[anchor, canonical + 'x']]),
        items: itemsOf(nav),
      })
    ).toThrow(TrivialityInputError);
  });
});

describe('the entry set', () => {
  it('a one-byte change enters; untouched does not; no rendering is reported absent, never dropped', () => {
    const anchors = ['#step-1-verify-component-family-doc', '#step-2-create-typests', '#step-5-create-tests'];
    const canonical = new Map(anchors.map((a) => [a, linaUnits.get(a) as string]));
    const c0 = canonical.get(anchors[0]) as string;
    const oneByte = c0.slice(0, -1) + (c0.endsWith(' ') ? '\t' : ' '); // the last byte replaced
    expect([oneByte.length, Array.from({ length: c0.length }, (_, i) => oneByte[i] !== c0[i]).filter(Boolean).length]).toEqual([c0.length, 1]);
    const rendered = new Map([
      [anchors[0], oneByte],
      [anchors[1], canonical.get(anchors[1]) as string],
    ]);
    expect(entrySet(canonical, rendered)).toEqual({ entered: [anchors[0]], passthrough: [anchors[1]], absent: [anchors[2]] });
  });

  it("Lina-2's byte-identical preamble is outside the entry set (G1 run 1's instantiation keeps it verbatim)", () => {
    const anchor = '#component-scaffolding-workflow:preamble';
    const canonical = linaUnits.get(anchor) as string;
    expect(classifyUnit({ anchor, canonical, rendering: canonical, items: lina.units[anchor].items })).toEqual({ anchor, entered: false });
  });

  it("C(c1)'s two units, rendered byte-identically, are outside the entry set (run 1: NOT A FINDING)", () => {
    for (const anchor of ['#the-charter-cut-ratified-verbatim', '#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument']) {
      const canonical = stacyUnits.get(anchor) as string;
      expect(classifyUnit({ anchor, canonical, rendering: canonical, items: stacy.units[anchor].items }).entered).toBe(false);
    }
  });
});

describe('the clearing condition — no removal cites subtraction 1–4', () => {
  // A verbatim unit: every item's complete text retained, the rendering differs (a block was removed).
  const anchor = '#step-4-create-platform-implementations';
  const canonical = linaUnits.get(anchor) as string;
  const items = lina.units[anchor].items;
  const removedBlock = canonical.split('\n').find((l) => l.trim() && !items.some((i) => l.includes(i.text) || i.text.includes(l.trim()))) as string;
  const rendering = canonical.replace(removedBlock + '\n', '');

  it('the construction really is verbatim and really differs', () => {
    expect(rendering).not.toBe(canonical);
    const r = classifyUnit({ anchor, canonical, rendering, items });
    expect(r.entered && r.verdict !== 'INAPPLICABLE' ? `${r.retained}/${r.total} ${r.verdict}` : r).toBe(`${items.length}/${items.length} CLEARS`);
  });

  it('with a subtraction-1 removal it ROUTES', () => {
    const r = classifyUnit({ anchor, canonical, rendering, items, row: { removals: [{ text: removedBlock, cites: 'subtraction-1' }] } });
    expect(r.entered && r.verdict !== 'INAPPLICABLE' ? `${r.retained}/${r.total} ${r.verdict} [${r.routedBy.join(',')}]` : r).toBe(
      `${items.length}/${items.length} ROUTES [repo-specific-removal]`
    );
  });

  it.each(['subtraction-2', 'subtraction-3', 'subtraction-4'] as const)('with a %s removal it ROUTES', (cites) => {
    const r = classifyUnit({ anchor, canonical, rendering, items, row: { removals: [{ text: removedBlock, cites }] } });
    expect(r.entered && r.verdict).toBe('ROUTES');
  });

  it('with only a subtraction-5 removal (a non-resolving route) it still CLEARS', () => {
    const r = classifyUnit({ anchor, canonical, rendering, items, row: { removals: [{ text: removedBlock, cites: 'subtraction-5' }] } });
    expect(r.entered && r.verdict).toBe('CLEARS');
  });

  it('exactly half clears; one below half routes (the ratio is ≥ 1/2)', () => {
    const two = lina.units['#step-1-verify-component-family-doc'].items; // 2 items
    const c = linaUnits.get('#step-1-verify-component-family-doc') as string;
    const one = classifyUnit({ anchor: 'x', canonical: c, rendering: two[0].text, items: two });
    const none = classifyUnit({ anchor: 'x', canonical: c, rendering: 'gone', items: two });
    expect([one.entered && one.verdict, none.entered && none.verdict]).toEqual(['CLEARS', 'ROUTES']);
  });
});

describe('(v) per-unit search scope', () => {
  it("an item whose text appears only in a sibling unit's rendering is not credited", () => {
    const a = '#step-2-create-typests';
    const b = '#step-5-create-tests';
    const aItems = lina.units[a].items;
    const canonical = new Map([
      [a, linaUnits.get(a) as string],
      [b, linaUnits.get(b) as string],
    ]);
    // Unit a is gutted; its item text is moved into unit b's rendering.
    const rendered = new Map([
      [a, '### Step 2: Create types.ts\nCreate the file.\n\n'],
      [b, (linaUnits.get(b) as string) + '\n' + aItems.map((i) => i.text).join('\n') + '\n'],
    ]);
    const results = classifyCharter({ canonicalUnits: canonical, renderedUnits: rendered, items: itemsOf(lina) });
    const ra = results.find((r) => r.anchor === a);
    expect(ra && ra.entered && ra.verdict !== 'INAPPLICABLE' ? `${ra.retained}/${ra.total} ${ra.verdict}` : ra).toBe(`0/${aItems.length} ROUTES`);
    // Control: the same text in the unit's OWN rendering is credited.
    const own = classifyUnit({ anchor: a, canonical: canonical.get(a) as string, rendering: rendered.get(b) as string, items: aItems });
    expect(own.entered && own.verdict !== 'INAPPLICABLE' ? own.retained : -1).toBe(aItems.length);
  });
});

describe('the hard floor (C18 clause 4)', () => {
  const items = itemsOf(lina);
  const population = [...items].filter(([, i]) => i.length > 0).map(([a]) => a);
  type Row = { disposition: Disposition };
  const allNcc = new Map<string, Row>(population.map((a) => [a, { disposition: 'no-consumer-counterpart' }]));

  it('fails when every non-empty-item unit is no-consumer-counterpart', () => {
    const r = hardFloor(items, allNcc, 'canonical/agents/lina.md');
    expect(r.fails && r.message).toBe(
      `hard floor: every unit of canonical/agents/lina.md with a non-empty operative set (${population.length}) is no-consumer-counterpart — the role does not ship; re-point at least one`
    );
  });

  it('still fails when a zero-item preamble is left retained', () => {
    const withZero = new Map(items);
    withZero.set('#identity:preamble', []);
    const rows = new Map<string, Row>([...allNcc, ['#identity:preamble', { disposition: 'retained' }]]);
    expect(hardFloor(withZero, rows, 'canonical/agents/lina.md').fails).toBe(true);
    // And with F's real zero-item units retained alongside a no-counterpart operative unit:
    const navRows = new Map<string, Row>([
      ['#purpose', { disposition: 'retained' }],
      ['#family-overview:preamble', { disposition: 'retained' }],
      ['#key-characteristics', { disposition: 'no-consumer-counterpart' }],
    ]);
    expect(hardFloor(itemsOf(nav), navRows, nav.source).fails).toBe(true);
  });

  it('passes when one non-empty-item unit ships (re-pointed or retained)', () => {
    const rows = new Map<string, Row>([...allNcc, [population[0], { disposition: 're-pointed' }]]);
    expect(hardFloor(items, rows, 'canonical/agents/lina.md')).toEqual({ fails: false, population });
  });

  it('fails on an empty population — zero is never a clean pass', () => {
    const r = hardFloor(new Map([['#purpose', []]]), new Map([['#purpose', { disposition: 'retained' as const }]]), 'x.md');
    expect(r.fails && r.message).toBe('hard floor: x.md has no unit with a non-empty operative set — the floor\'s population is empty, which is never a clean pass');
  });
});
