# The guidelines never say how a served prop maps to a web attribute, property, event or callback

**Date**: 2026-10-25
**Filed by**: Lina, under README rule 10, from the E5 fix (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`, E5) and her consult for it.
**Owner**: **Lina** (she maintains `governance/platform-implementation-guidelines.md`'s content; the change itself goes by ballot).
**Class**: P2 obligation (record) · defect *(rule 12. The record is wrong by omission, and no reader is misled by this file. The falsehoods it produced, E5's `variant` and `onPress`, are carried in the E5 record at P0.)*
**Trigger**: `release:16.3.0:phase-1` — the record carries two halves. **The property half** closes at the merge of the application PR of ballot `2026-10-30-web-prop-property-or-attribute-only` (#579), no later than 16.3.0's S; that PR adds rule 5's outcome line for the half and re-rules this line to the G-4 charter's event (`path:.kiro/specs/128-*/requirements.md`, `.kiro/issues/2026-10-30-g4-web-element-public-contract-charter.md`) for **the event and callback half**, which G-4 carries (charter § 5 item 3). The token is the release one, not the charter's, so the property half keeps its deadline. *(Re-ruled 2026-11-01, Lina, owner, rules 9 and 11. Disposition: property half by ballot now (R8 item 6, "Re: 6, Ratify"); event half to G-4 (sheet r2.1 row E; R8 item 5). Authority: Peter's one-off delegation, `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "Delegation"), under which the collective's sheet r2.1 row E ruled G-4 its own spec, chartered now at 128's requirements trigger; R8 item 5, "Re: 5, Gate", `R8@0184efb3fd7b2956677351fdf84899767a5ac74a`; and R10 fork 1 (a), `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`, under which the rows disposed of under DLG and R8 count as a valid state for 16.2.0. Owner's recommendation: the 16.2.0 escalation package, Lina's file, as cross-read by the collective. The superseded line is quoted verbatim at the end of this record.)*
**Consulted**: Stacy, whose read of E5 is the source for the gap (`scratchpad/read-e5-stacy.md`); none other needed for a filing.

---

## The gap

`governance/platform-implementation-guidelines.md` § "Property Name Consistency" (L68) says "All platforms MUST use identical property names", and § "Property Inconsistencies (PROHIBITED)" (L390) lists "different property names". Nothing there says, for web:

- when a served prop is an **attribute** (hyphenated, string-valued, observed) and when it is a **JS property** (camelCase, any type), or that a served prop name is always also the element's JS property name, whatever its attribute;
- that a served **callback** prop (`onPress`) maps to an `onX` callback property on the element **and** a DOM event (`press`), and that setting the property attaches one listener, so a consumer who wires both is called once each.

The web patterns block (L673) says only "Custom Events". With no rule, Button-CTA and Button-Icon shipped `buttonVariant` and no `onPress`, while the schema served `variant` and `onPress` (E5). The sweep of the other web elements against this rule is Peter's fork on the E5 record (before or after S).

## Fix shape

One line added to the guidelines' web section by **ballot** (the ballot-measure model; a steering/governance edit is not mine to make unilaterally): a served prop name is the web element's JS property name; an attribute is its hyphenated form where the prop is a string, number or boolean; a served callback `onX` is an element property that attaches a single `x` event listener. The ballot would also say what the sweep checks.

## What closes it

The ballot's merge adds the line, and the fixing PR adds rule 5's dated outcome line here and moves the record to `archive/`.

*(2026-11-01, Lina, owner, rules 9 and 11: Trigger re-ruled as above, under R10. The superseded Trigger line, verbatim:)*

> **Trigger**: `release:next:phase-1` *(rule 1: a P2 that would ride a later change takes this token, not a vehicle. Only the owner writes or changes this line (rule 9).)*
