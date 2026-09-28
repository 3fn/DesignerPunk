/**
 * triviality.records.test.ts — Spec 123 Task 13.4, criterion (iii) "live-record invariants"
 * (design C18 clause 2; Lina R1, U2b-cut amendment review):
 *
 *   over every unit with a non-empty item set in every committed canonical/operative-sets/*.yaml
 *   record (units derived from the records, count asserted; zero-item units are 0/0, INAPPLICABLE):
 *   a rendering byte-identical to the canonical unit scores |items|/|items|; and, for every item,
 *   deleting one occurrence of that item's text from the canonical unit gives a score below |items|
 *   (the deletion invariant; per-item `includes` fails it on exactly documentation-3 /
 *   lessons-learned-capture-2).
 *
 * "The occurrence deleted" is the one the identity witness assigned to that item.
 * The identity rendering is scored with assignOccurrences directly: classifyUnit would (correctly)
 * put a byte-identical rendering outside the entry set, which is not the property under test.
 */
import { assignOccurrences, classifyUnit } from '../regrounding/triviality';
import { includesCount, liveUnits, sha256 } from './triviality.helpers';

const all = liveUnits();
const nonEmpty = all.filter((u) => u.unit.items.length > 0);
const zeroItem = all.filter((u) => u.unit.items.length === 0);
const label = (u: (typeof all)[number]) => `${u.record} ${u.anchor}`;

/** Remove the occurrence of `text` at `offset`. */
const deleteAt = (canonical: string, offset: number, text: string) => canonical.slice(0, offset) + canonical.slice(offset + text.length);

describe('(iii) live-record invariants over every committed operative-set record', () => {
  it('derives its units from the records — count asserted (floor 22 units / 123 items, derived 2026-09-28)', () => {
    // Exact coverage: every non-empty unit is iterated below (describe.each over `nonEmpty`).
    expect(nonEmpty.length + zeroItem.length).toBe(all.length);
    expect(nonEmpty.length).toBeGreaterThanOrEqual(22);
    expect(nonEmpty.reduce((n, u) => n + u.unit.items.length, 0)).toBeGreaterThanOrEqual(123);
  });

  it('reads records that are fresh against canonical (else the invariants test stale text)', () => {
    expect(all.filter((u) => sha256(u.canonical) !== u.unit.canonicalHash).map(label)).toEqual([]);
  });

  describe.each(nonEmpty.map((u) => [label(u), u] as const))('%s', (_l, u) => {
    const n = u.unit.items.length;
    const identity = assignOccurrences(u.canonical, u.unit.items);

    it(`the byte-identical rendering scores ${n}/${n}`, () => {
      expect(`${identity.length}/${n}`).toBe(`${n}/${n}`);
    });

    it('deleting any one item’s occurrence scores below |items| (the deletion invariant)', () => {
      const survivors = u.unit.items.filter((item) => {
        const credit = identity.find((c) => c.itemId === item.id);
        if (!credit) return true; // unreachable when the identity score holds
        return assignOccurrences(deleteAt(u.canonical, credit.offset, item.text), u.unit.items).length >= n;
      });
      expect(survivors.map((i) => i.id)).toEqual([]);
    });
  });

  it('zero-item units are 0/0 and INAPPLICABLE on any non-identical rendering', () => {
    expect(zeroItem.length).toBeGreaterThanOrEqual(2); // F's #purpose and #family-overview:preamble
    for (const u of zeroItem) {
      const r = classifyUnit({ anchor: u.anchor, canonical: u.canonical, rendering: u.canonical + ' ', items: u.unit.items });
      expect(r).toEqual({ anchor: u.anchor, entered: true, verdict: 'INAPPLICABLE', total: 0 });
    }
  });

  it('CONTRAST: per-item includes fails the deletion invariant on exactly documentation-3 / lessons-learned-capture-2', () => {
    const failing: string[] = [];
    for (const u of nonEmpty) {
      const n = u.unit.items.length;
      const identity = assignOccurrences(u.canonical, u.unit.items);
      for (const item of u.unit.items) {
        const credit = identity.find((c) => c.itemId === item.id);
        if (credit && includesCount(deleteAt(u.canonical, credit.offset, item.text), u.unit.items) >= n) {
          failing.push(`${u.anchor} ${item.id}`);
        }
      }
    }
    expect(failing).toEqual(['#audit-checklist documentation-3', '#audit-checklist lessons-learned-capture-2']);
  });
});
