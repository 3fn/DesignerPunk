# Issue: deprecated-alias emission for the whole shared token surface, and D9's public-API diff, before the first native claim (17.0.0)

**Date**: 2026-11-28
**Owner**: Ada
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — the event that owes this record's close is Spec 132's requirements. The commit that adds them either carries both items below as preconditions of 17.0.0, the release that first claims native support, or leaves one out with a reason.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Ada, owner, rule 12. Peter's "7 (a)" creates this act. No generator emits a deprecated alias today (VERIFIED, `[ADA R1]`), and no native claim exists yet, so no reader is misled. Re-class reading: if 17.0.0, or any release that claims native support, ships without both items, this becomes P0 false-claim, because the claim would promise source stability that the alias mechanism is not there to keep.)*
**Source**:
- Peter, received 2026-11-05T13:05:54Z (orchestrator relay), verbatim: "yes, 4 (a), 7 (a)". Its "7 (a)" places native changes in minors before the claim, with aliases and D9's diff landing before it (Spec 129 `design.md` § 0, L40).
- P-7, RULED: 17.0.0 carries 132's first family alone. The ruling and its re-rule by the pivot are in `.kiro/specs/132-native-components-in-app/design-outline.md` § 4.4.
- `[ADA R1]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md`: L127–128 (none exist today) and L133 (D9 covers the generated files).
- `[ADA R1]`, ibid. L159–160 (aliases owed for every family, not per family).
- `[ADA R14]`, ibid. L4255 onward (owed: the goal record closes in #880).

---

## Items

1. **Deprecated-alias emission for the whole shared token surface**: `DesignTokens`, the theme types and `ComponentTokens` itself.
   - From the first claim onwards, a rename anywhere on that surface ships the new name plus a deprecated alias for the old one: `@available(*, deprecated, renamed:)` in Swift, `@Deprecated(replaceWith = …)` in Kotlin, and the CSS custom property kept alongside on web where it applies.
   - **The scope is the whole surface, not the claimed families.** The generated token API is shared by every family, so no per-family manifest filter reaches it, and a rename after the claim breaks any adopter regardless of which families they use (Ada; Kenya and Leonardo agree).
   - 133 U1's state tokens enter this surface before the claim, so they are covered too.
2. **D9's public-API diff** over our module, covering the generated token files (`DesignTokens`, `ComponentTokens`, the theme types) as well as component source.
   - A family's arrival counts as an addition.
   - A removed or renamed name without its alias is reported as breaking.

## Close

This record closes, under rule 5, when 132's `requirements.md` carries both items as 17.0.0 preconditions. The landing itself is held by the outline's § 4.4 and the requirements that carry it.

*Signed: Ada, 2026-11-28.*
