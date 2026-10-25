# Sweep: every other web element's served prop names against its accessors

**Date**: 2026-10-25
**Filed by**: Lina, under README rule 10, from Peter's ruling on the E5 fork (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`, E5, the 2026-10-25 sweep-timing line).
**Owner**: **Lina**
**Class**: P2 obligation (record) · defect *(rule 12. A served prop list may hide another `onPress`-class mismatch, a served prop the web element does not carry. None is proven beyond the E5 Button instance, which is carried in the E5 record at P0. If the sweep finds one that misleads a reader today, that item is classed on its own record when found.)*
**Trigger**: `release:next:phase-1` *(rule 1. Prose: the sweep runs after the 16.1.0 release (Peter, 2026-10-25, chat, relayed: "Re: sweep-timing answer, let's go with the recommendation"). This record closes at the sweep's merge; at the sweep's open the Trigger becomes `merge:#<N>`. Only the owner writes or changes this line (rule 9).)*
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
