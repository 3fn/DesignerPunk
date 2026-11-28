# Issue: Q12, Q13 and the native type table stay provisional until Spec 132's D4 app builds

**Date**: 2026-11-28
**Owner**: Ada
**Trigger**: `path:.kiro/specs/132-native-components-in-app/design.md` — the event that owes this record's close is Spec 132's design round. The commit that adds its `design.md` either takes in the four D4 criteria below or leaves one out with a reason.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Ada, owner, rule 12. These are acts the 129 inbound handed to 132; no shipped surface is wrong because of them. Spec 129's `design.md` § 4 already labels Q12, Q13 and the type table provisional, so no reader is misled meanwhile. Re-class reading: if a 16.x release states them as settled for native adopters before D4 builds, this becomes P0 false-claim.)*
**Source**:
- Spec 129 `design.md` § 4: Q12 (fixed binding names), Q13 (every colour semantic in the theme) and the D-1 type table, all labelled provisional until 132's D4.
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-design-2026-11-05.md` § D-4.
- `[ADA R1]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` L134–138, which says what D4 must show.
- `[ADA R14]`, ibid. L4255 onward: this record is owed, because the goal record `2026-09-26-native-component-distribution.md` closes in #880.

---

## What D4 must show before these stop being provisional

1. **Q12, the fixed binding names** (`DesignerPunkTheme`, `\.dpTheme`, `LocalDPTheme`, `com.designerpunk.tokens`). They must be reached and read from the adopter's own module. An adopter component reads a theme colour through them. This depends on the access-level ballot (#877's record) naming them public.
2. **Q12's provider-name clash, which D4 will not see.** When a config's `name` defaults to `DesignerPunk`, the Android provider and the theme type share a name. A unit test covers that case.
3. **Q13, through the adopter's own theme.** D4's adopter theme overrides at least one colour semantic, and every colour semantic reaches the adopter's view through it.
4. **The type table on the primitive path, in real SwiftUI and Compose use.** D10's adopter component, with its own `defineComponentTokens` file, proves the component-token path. #870 shows that emitter keeps a second, lossy copy of the type map, so D4 can pass while D10 fails.

## Close

This record closes, under rule 5, when 132's `design.md` carries items 1–4 as D4/D10 criteria. Any item left out needs a reason stated there.

*Signed: Ada, 2026-11-28.*
