# Sweep: every other web element's served prop names against its accessors

**Date**: 2026-10-25
**Filed by**: Lina, under README rule 10, from Peter's ruling on the E5 fork (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`, E5, the 2026-10-25 sweep-timing line).
**Owner**: **Lina**
**Class**: P2 obligation (record) · defect *(rule 12. A served prop list may hide another `onPress`-class mismatch, a served prop the web element does not carry. None is proven beyond the E5 Button instance, which is carried in the E5 record at P0. If the sweep finds one that misleads a reader today, that item is classed on its own record when found.)*
**Trigger**: `release:16.3.0:phase-1` — the event that owes the close is the merge of the application PR of ballot `2026-10-30-web-prop-property-or-attribute-only` (#579), no later than 16.3.0's S. That ballot puts the sweep, its `web` markers and its guard test in one PR. The sweep fixes property names only: each attribute-only or unmapped prop is marked and appended to the G-4 charter's § 4 list, and served callbacks are listed for G-4, not changed. *(Re-ruled 2026-11-01, Lina, owner, rules 9 and 11. Disposition: fix-now by 16.3.0's S, run under the property-half ballot (sheet r2.1, rows A1 and E; R8 item 6, "Re: 6, Ratify"). Authority: Peter's one-off delegation, `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "Delegation"), under which the collective's disposition sheet r2.1 ruled this row; his R8 answers, `R8@0184efb3fd7b2956677351fdf84899767a5ac74a`; and his ruling of 2026-11-01 that the dispositions ruled under DLG and R8 are a valid state for 16.2.0 (relayed via the Spec 131 session, received before 2026-11-01T13:42:54Z: "Proceed as you recommend", on "(a) on both"). Owner's recommendation: the 16.2.0 escalation package, Lina's file, as cross-read by the collective. The superseded line is quoted verbatim at the end of this record.)*
**Consulted**: none needed for a filing; the timing is Peter's ruling on the E5 fork.

---

## The obligation

Compare every web element's served prop names against what the element carries. The E5 finding is the first instance: Button-CTA and Button-Icon served `variant` and `onPress` in their schema and carried `buttonVariant` and a `press` event only (fixed at #482).

## Method

For each web element under `src/components/`:

1. Read the schema's `properties` names (the served list).
2. Read the element's accessors, `observedAttributes`, and callback props in its `*.web.ts`.
3. Record each served name that has no matching JS property (the served prop name is the element's property name; an attribute is its hyphenated form), and each served callback `onX` with no `onX` property.
4. Fix the mismatches at the element, or correct the served name where the schema is wrong. The mapping rule itself (attribute vs property, event vs callback) is filed at `.kiro/issues/2026-10-25-web-prop-mapping-rule-gap.md`; the sweep applies the rule that record's ballot lands, or the E5 reading if the ballot has not.

## Surviving counter-argument

Stacy found `onPress` only because she looked. A name-by-name comparison finds the mismatches it is written to find. A prop that is present but behaves wrongly (an accessor that does not reflect, a callback that double-fires) passes it, so the sweep is a floor on names, not a behavior check.

## What closes it

The sweep's merge, with a dated outcome line here (rule 5): the elements compared, the mismatches found and fixed, and any left open with their own records. Then the record moves to `archive/`.

*(2026-11-01, Lina, owner, rules 9 and 11: Trigger re-ruled as above. The superseded Trigger line, verbatim:)*

> **Trigger**: `release:next:phase-1` *(rule 1. Prose: the sweep runs after the 16.1.0 release (Peter, 2026-10-25, chat, relayed: "Re: sweep-timing answer, let's go with the recommendation"). This record closes at the sweep's merge; at the sweep's open the Trigger becomes `merge:#<N>`. Only the owner writes or changes this line (rule 9).)*
