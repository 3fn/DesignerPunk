# Owed for Spec 132: our iOS component module builds in Swift 6 language mode, set in the root manifest

**Date**: 2026-11-28
**Owner**: Kenya. She owns the iOS half of Spec 132: packaging, the D4 app and the render lane (132 outline § "Owners"). **Filed by**: Kenya, under `.kiro/issues/README.md` rule 10. The obligation was passed down by her 129 inbound. Until now only the native goal record held it, and that record closes in #880.
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md`. The event that owes this record's close is Spec 132's requirements: the commit that adds them takes this item in, or leaves it out with a reason (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec").
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Kenya, owner, rule 12: no reader is misled, because nothing shipped declares a language mode for our components (there is no generated `Package.swift` yet), and 132 has made no support claim.)*
**Source**:
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-kenya-design-2026-11-05.md` § 1, "Why Swift 6 for the token tier and Swift 5 for the component tier" (L60–L67): "Moving the components to Swift 6 belongs to 132's packaging: the root manifest's language mode. It is not a 129 row."
- 132 outline § 4.3, "Kenya" (at `683188c44`): "owed: Kenya to file under rule 10".
- `[KENYA R10]`, in `consults-2026-11-27/answers-132/kenya-reshape-check.md`, outside the repository, and `[THURGOOD R22]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md`, both proposing this record.

---

## What is owed

1. **The root manifest sets Swift 6 language mode for our module.**
   - The manifest is the `Package.swift` that `generate` owns (132 § 2, WP4; Ada's manifest conditions).
   - Our component tier is compiled in Swift 6 language mode, not Swift 5.
   - Today the harness compiles the token tier at `swiftVersion: "6"` and the component tier at `swiftVersion: "5"` (`harness/pins.yaml` L87–L95, VERIFIED at `ed69ae6b2`). The component tier's pin moves to 6 with the module.
2. **The Swift 6 errors are repaired, family by family.**
   - Under Swift 6 the shipped components gained 8 errors, in `Avatar`, `BadgeCountBase`, `BadgeCountNotification`, `BadgeLabelBase`, `NavHeaderPage` and `ThemeAwareBlendUtilities` (the inbound, L66: VERIFIED on 2026-11-05, not re-run here).
   - `ThemeAwareBlendUtilities` is deleted in 133 U1 under the pivot (132 outline § 3), so its share falls away there.
   - The rest are repaired in the unit that claims each family, under the D3-to-zero rule.
3. **D4 proves both sides.**
   - Our module builds in Swift 6 mode.
   - The adopter's own language mode stays the adopter's. D4's app is built in both Swift 5 and Swift 6 language modes (P-1 addition (2); 132 outline § 1, D4 details, "Release builds").

**Out of scope**: the token tier, which is already compiled at Swift 6 by Spec 129's harness.

## Closes when

Spec 132's requirements take items 1–3 in, or leave them out with a reason. When they take it in, this record closes under rule 5 with that commit named, and the requirement carries the work.
