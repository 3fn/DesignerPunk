/**
 * The triviality floor — Spec 123 Task 13.4 (design C18; Req 11.6.5b, 11.6.5d, 11.6.5f).
 *
 * WHAT THIS IS: C18's MECHANICAL HALF, and nothing else. For each body unit of a consumer
 * rendering it decides one of:
 *
 *   outside the entry set   the rendering is a byte-identical passthrough of its canonical unit;
 *   INAPPLICABLE            the unit's committed operative set is empty (clause 1, domain);
 *   CLEARS                  a valid occurrence assignment credits ≥ half the unit's items AND no
 *                           removal cites subtraction 1–4 (clause 2 — "mechanically non-trivial");
 *   ROUTES                  anything else (clause 3) → a C17 signature row, judged by a human
 *                           under Req 11.6.5e's entailment rule.
 *
 * THE FLOOR NEVER CONDEMNS (Req 11.6.5b): there is no TRIVIAL verdict here, by type. TRIVIAL /
 * NOT TRIVIAL for a routed unit is the routed judgment's (11.6.5e), established at G1 — never by
 * code. A count below half is not a finding; it routes.
 *
 * THE COUNT IS AN OCCURRENCE ASSIGNMENT, NOT PER-ITEM `includes` (C18 clause 2; G1 run 1 B-1,
 * run 2 DR-1). {@link assignOccurrences} returns its WITNESS — each credited item paired with the
 * offset of the occurrence it was credited through:
 *   - each credited item's COMPLETE `text` occurs at its assigned offset;
 *   - no item is credited twice; no two assigned occurrences share or overlap bytes;
 *   - so items sharing a `text` are credited at most as often as it occurs disjointly, and an item
 *     whose text occurs only inside another credited item's occurrence is not credited.
 * The algorithm is greedy: candidate (item, occurrence) pairs are taken LONGEST text first, then
 * LEFTMOST offset, then record order, skipping any whose item is already credited or whose bytes
 * overlap a taken occurrence. It is NOT guaranteed maximal (the general problem is job-interval
 * selection). That is sound by construction: any valid assignment only under-counts relative to
 * the maximum, and an under-count routes (C18; G1 run 2 R2-A2 — "whether it is maximal is
 * 13.4's choice"). Longest-first is chosen over run 2's earliest-end greedy because it credits a
 * contained text that also occurs standalone (run 2's one `CHECK` edge case).
 *
 * PER-UNIT SCOPE (criterion (v); Req 11.6.5f; the mechanical twin of 11.6.5e's R2-F1 scope):
 * every function here takes ONE unit's rendered text. The search never sees the rendered charter
 * or a sibling unit's rendering — {@link classifyCharter} looks each unit's items up only in that
 * unit's own entry of the rendered-unit map. An item whose text survives only in a sibling unit
 * is not credited; its function takes a disposition for this unit (11.6.5e), which is the
 * routed judge's business, not this file's.
 *
 * THE DENOMINATOR IS READ, NEVER COMPUTED (Req 11.6.5d): items come from the committed
 * `canonical/operative-sets/*.yaml` record. Nothing here classifies text as operative.
 *
 * WHAT THIS DOES NOT ESTABLISH:
 *   - that a credited item is FUNCTIONALLY retained — the floor is sound compositionally with
 *     clauses (i) and (iv), not intrinsically (Req 11.6.5b, "What the floor's soundness covers");
 *   - that a removal citation APPLIES — clause (iii); the clearing condition keys on the DECLARED
 *     citation (`row.removals[].cites`, Task 13.1's shape), G1 run 1 A-2;
 *   - anything about ABSENT units (no rendering at all) — clause (ii)'s trigger, not triviality
 *     (Req 11.6.5f). {@link entrySet} reports them separately so they are never silently dropped;
 *   - that every unit has a disposition row, or that a key is current — Task 13.5.
 *
 * Traces to: Req 11.3, 11.6.5b, 11.6.5d, 11.6.5f; design C16, C18.
 */

import type { DispositionRow, Removal } from './dispositions';

// ============================================================================
// Shapes
// ============================================================================

/** One operative item as the committed record states it (C16). Only `id` and `text` are read. */
export interface OperativeItem {
  id: string;
  text: string;
}

/** The witness for one credited item: the byte offset (UTF-16 index) of the occurrence it holds. */
export interface Credit {
  itemId: string;
  offset: number;
}

/**
 * The floor's verdicts. Deliberately closed and deliberately without TRIVIAL: the mechanical half
 * can only clear, never condemn (Req 11.6.5b). Adding a condemning value here is a design change,
 * and `triviality.floor.test.ts` fails to compile if one appears.
 */
export const FLOOR_VERDICTS = Object.freeze(['INAPPLICABLE', 'CLEARS', 'ROUTES'] as const);
export type FloorVerdict = (typeof FLOOR_VERDICTS)[number];

/** Why a unit routed. Both may hold. */
export type RouteReason = 'below-half' | 'repo-specific-removal';

/** Subtraction bullets 1–4 name repo-specifics; a removal citing one forces routing (C18 clause 2). */
export const REPO_SPECIFIC_CITES: readonly string[] = Object.freeze([
  'subtraction-1',
  'subtraction-2',
  'subtraction-3',
  'subtraction-4',
]);

export type UnitResult =
  | { anchor: string; entered: false }
  | { anchor: string; entered: true; verdict: 'INAPPLICABLE'; total: 0 }
  | {
      anchor: string;
      entered: true;
      verdict: 'CLEARS' | 'ROUTES';
      /** The size of the occurrence assignment. */
      retained: number;
      /** |items| — the committed record's count. */
      total: number;
      /** The witness: what was counted, not only how many. */
      assignment: readonly Credit[];
      /** Empty iff CLEARS. */
      routedBy: readonly RouteReason[];
    };

// ============================================================================
// The occurrence assignment
// ============================================================================

/** Every start offset of `needle` in `hay`, including overlapping ones. */
export function occurrences(hay: string, needle: string): number[] {
  const found: number[] = [];
  for (let i = hay.indexOf(needle); i !== -1; i = hay.indexOf(needle, i + 1)) found.push(i);
  return found;
}

/**
 * A valid occurrence assignment of `items` in `rendering` (C18 clause 2), returned as its witness,
 * ordered by offset. See the file header for the validity conditions and the (non-maximal,
 * sound) greedy rule. Throws on an empty item text — it would "occur" everywhere.
 */
export function assignOccurrences(rendering: string, items: readonly OperativeItem[]): Credit[] {
  const candidates: { index: number; start: number; end: number }[] = [];
  items.forEach((item, index) => {
    if (item.text.length === 0) {
      throw new Error(`operative item ${item.id} has an empty text — an empty comparand credits itself everywhere`);
    }
    for (const start of occurrences(rendering, item.text)) {
      candidates.push({ index, start, end: start + item.text.length });
    }
  });
  candidates.sort((a, b) => b.end - b.start - (a.end - a.start) || a.start - b.start || a.index - b.index);

  const credited = new Set<number>();
  const taken: { start: number; end: number }[] = [];
  const credits: Credit[] = [];
  for (const c of candidates) {
    if (credited.has(c.index)) continue;
    if (taken.some((t) => c.start < t.end && t.start < c.end)) continue;
    credited.add(c.index);
    taken.push(c);
    credits.push({ itemId: items[c.index].id, offset: c.start });
  }
  return credits.sort((a, b) => a.offset - b.offset);
}

/**
 * Validity of an assignment as C18 clause 2 defines it — the property `triviality.assignment.test.ts`
 * asserts over generated renderings. Returns the violations (empty = valid). Exported so the
 * property is stated once and a future implementation is checked against the same definition.
 */
export function assignmentViolations(rendering: string, items: readonly OperativeItem[], assignment: readonly Credit[]): string[] {
  const violations: string[] = [];
  const byId = new Map(items.map((i) => [i.id, i]));
  const seen = new Set<string>();
  const spans: { id: string; start: number; end: number }[] = [];
  for (const credit of assignment) {
    const item = byId.get(credit.itemId);
    if (!item) {
      violations.push(`credits an item that is not in the set: ${credit.itemId}`);
      continue;
    }
    if (seen.has(credit.itemId)) violations.push(`credits ${credit.itemId} twice`);
    seen.add(credit.itemId);
    if (!rendering.startsWith(item.text, credit.offset)) {
      violations.push(`${credit.itemId}'s complete text does not occur at offset ${credit.offset}`);
    }
    spans.push({ id: credit.itemId, start: credit.offset, end: credit.offset + item.text.length });
  }
  for (let a = 0; a < spans.length; a++) {
    for (let b = a + 1; b < spans.length; b++) {
      if (spans[a].start < spans[b].end && spans[b].start < spans[a].end) {
        violations.push(`${spans[a].id} and ${spans[b].id} share or overlap an occurrence`);
      }
    }
  }
  return violations;
}

// ============================================================================
// Per-unit classification
// ============================================================================

export interface UnitInput {
  anchor: string;
  /** The canonical unit's exact text (partition() over the canonical body). */
  canonical: string;
  /** THIS unit's rendered text — never the charter, never a sibling (criterion (v)). */
  rendering: string;
  /** The committed record's items for this unit (11.6.5d) — never computed here. */
  items: readonly OperativeItem[];
  /** The unit's disposition row, if any; only `removals[].cites` is read. */
  row?: Pick<DispositionRow, 'removals'>;
}

/** C18 over one unit. */
export function classifyUnit(input: UnitInput): UnitResult {
  const { anchor, canonical, rendering, items, row } = input;
  if (rendering === canonical) return { anchor, entered: false };
  if (items.length === 0) return { anchor, entered: true, verdict: 'INAPPLICABLE', total: 0 };

  const assignment = assignOccurrences(rendering, items);
  const retained = assignment.length;
  const total = items.length;
  const routedBy: RouteReason[] = [];
  if (retained * 2 < total) routedBy.push('below-half');
  if ((row?.removals ?? []).some((r: Removal) => REPO_SPECIFIC_CITES.includes(r.cites))) {
    routedBy.push('repo-specific-removal');
  }
  return { anchor, entered: true, verdict: routedBy.length === 0 ? 'CLEARS' : 'ROUTES', retained, total, assignment, routedBy };
}

// ============================================================================
// Charter grain: the entry set, per-unit classification, the hard floor
// ============================================================================

export interface EntrySet {
  /** Rendered and not byte-identical → C18 applies. */
  entered: string[];
  /** Rendered byte-identically → outside the entry set. */
  passthrough: string[];
  /** No rendering at all → clause (ii)'s trigger, not triviality (Req 11.6.5f). */
  absent: string[];
}

/**
 * C18's entry set over a charter: every canonical body unit whose rendering is not a byte-identical
 * passthrough (a one-byte change enters; untouched does not). Canonical order is preserved.
 */
export function entrySet(canonicalUnits: ReadonlyMap<string, string>, renderedUnits: ReadonlyMap<string, string>): EntrySet {
  const out: EntrySet = { entered: [], passthrough: [], absent: [] };
  for (const [anchor, canonical] of canonicalUnits) {
    const rendering = renderedUnits.get(anchor);
    if (rendering === undefined) out.absent.push(anchor);
    else if (rendering === canonical) out.passthrough.push(anchor);
    else out.entered.push(anchor);
  }
  return out;
}

export interface CharterInput {
  /** anchor → canonical unit text, in canonical order. */
  canonicalUnits: ReadonlyMap<string, string>;
  /** anchor → that unit's rendered text (the caller slices the rendering by span). */
  renderedUnits: ReadonlyMap<string, string>;
  /** anchor → the committed record's items. A unit with no record entry has no committed set. */
  items: ReadonlyMap<string, readonly OperativeItem[]>;
  /** anchor → disposition row (Task 13.1's shape). */
  rows?: ReadonlyMap<string, Pick<DispositionRow, 'removals'>>;
}

export class TrivialityInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrivialityInputError';
  }
}

/**
 * C18 per unit over a charter (Req 11.6.5f: no aggregation). Each entered unit is classified
 * against ITS OWN rendering only. An entered unit with no committed operative-set entry is
 * refused, never read as zero items: reading absence as INAPPLICABLE would let a missing record
 * shrink the denominator to nothing (11.6.5d's attack), so it throws.
 */
export function classifyCharter(input: CharterInput): UnitResult[] {
  const { canonicalUnits, renderedUnits, items, rows } = input;
  const set = entrySet(canonicalUnits, renderedUnits);
  const results: UnitResult[] = set.passthrough.map((anchor) => ({ anchor, entered: false }));
  for (const anchor of set.entered) {
    const unitItems = items.get(anchor);
    if (unitItems === undefined) {
      throw new TrivialityInputError(
        `unit ${anchor} entered the triviality floor but has no committed operative set — confirm its set in canonical/operative-sets/ (Req 11.6.5d); absence is never read as zero items`
      );
    }
    results.push(
      classifyUnit({
        anchor,
        canonical: canonicalUnits.get(anchor) as string,
        rendering: renderedUnits.get(anchor) as string,
        items: unitItems,
        row: rows?.get(anchor),
      })
    );
  }
  const order = [...canonicalUnits.keys()];
  return results.sort((a, b) => order.indexOf(a.anchor) - order.indexOf(b.anchor));
}

export type HardFloorResult =
  | { fails: false; population: string[] }
  | { fails: true; population: string[]; message: string };

/**
 * C18 clause 4, the hard floor (S-D-A6): a charter in which EVERY body unit with a non-empty
 * committed item set is `no-consumer-counterpart` FAILS. The population is defined by the record,
 * so a zero-item unit — e.g. a preamble left `retained` — is not in it and cannot evade it.
 *
 * An EMPTY population also fails: a charter whose record carries no operative item at all has
 * nothing the floor could protect, and "zero is never a clean pass" (Req 11.3.5's shape).
 * A unit with no row is not counted as `no-consumer-counterpart`; a missing row is Task 13.5's
 * refusal, which runs before this.
 */
export function hardFloor(
  items: ReadonlyMap<string, readonly OperativeItem[]>,
  rows: ReadonlyMap<string, Pick<DispositionRow, 'disposition'>>,
  file: string
): HardFloorResult {
  const population = [...items].filter(([, unitItems]) => unitItems.length > 0).map(([anchor]) => anchor);
  if (population.length === 0) {
    return {
      fails: true,
      population,
      message: `hard floor: ${file} has no unit with a non-empty operative set — the floor's population is empty, which is never a clean pass`,
    };
  }
  if (population.every((anchor) => rows.get(anchor)?.disposition === 'no-consumer-counterpart')) {
    return {
      fails: true,
      population,
      message: `hard floor: every unit of ${file} with a non-empty operative set (${population.length}) is no-consumer-counterpart — the role does not ship; re-point at least one`,
    };
  }
  return { fails: false, population };
}
