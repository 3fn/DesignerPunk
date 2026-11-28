# Issue: `generate` owning our native module's manifest — three conditions, and D10's same-name `.kt` case

**Date**: 2026-11-28
**Owner**: Ada
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — the event that owes this record's close is Spec 132's requirements. The commit that adds them either takes in items 1–4 below or leaves one out with a reason.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Ada, owner, rule 12. These are design conditions the 129 plan handed to 132's packaging unit; nothing shipped depends on them yet. Re-class reading: if `generate` begins writing a root `Package.swift` before condition 1 is enforced, this becomes P1 consumer-blocking, because it would overwrite an adopter's own manifest.)*
**Source**:
- `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r2.md` L46–70 (the manifest, and its three conditions).
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-design-2026-11-05.md` § D-5 (the Kotlin same-name refusal).
- `[ADA R1]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` L123–124.
- Kenya R2 there (the `.package(name:path:)` form, VERIFIED: the plain form fails, because a path dependency's identity is the adopter's directory name).
- `[ADA R14]`, ibid. L4255 onward (owed: the goal record closes in #880).

---

## Items

1. **An adopter's own root `Package.swift`.** `generate` writes the root manifest only when the file is absent or carries our generated header. Otherwise it stops with a message naming the file. For that adopter the `sync` region becomes the fallback.
2. **Writing outside `output` is new for `generate`.** The root manifest and the Android module folder need per-platform paths (129 item (v)) and an entry in `docs/consumer/COMMIT-POLICY.md`. Whether those files are committed is the team's call, with Leonardo for the adopter journey.
3. **The adopter's component module imports ours by local path.** On iOS this is written `.package(name: "DesignerPunk", path: …)`. Kenya and Data own whether it holds in the D4 app layout.
4. **D10's same-name `.kt` case.** `generate` already fails on a `.kt` file in the consumer's tree that declares `com.designerpunk.tokens` or `com.designerpunk.components…` (`src/cli/shared/reservedKotlinPackages.ts`). The refusal is VERIFIED to exist; that it holds in a real adopter app is not. D10's adopter component carries one such same-name case and proves it.

## Close

This record closes, under rule 5, when 132's `requirements.md` carries items 1–4. Any item left out needs a reason stated there.

*Signed: Ada, 2026-11-28.*
