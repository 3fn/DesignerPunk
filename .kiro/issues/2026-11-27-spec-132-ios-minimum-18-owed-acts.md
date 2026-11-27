# Owed: the acts that Peter's iOS-minimum ruling for Spec 132 creates ("(B), raise to iOS 18")

**Date**: 2026-11-27
**Owners**: Kenya (items 3, 4 and 5: the iOS lane, the shipped wording and the iOS 17 probe record); Ada (item 2: `generate` restores the floor); Thurgood (item 1: the Core Goals ballot, drafted by the ballot seat). Data is consulted on item 3's grant, which shares T-15's lanes.
**Filed by**: Thurgood, under rule 10, in PR #880, which records the ruling. Rule 9 applies to every later edit: each owner rewrites only their own item.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Thurgood, for the owners, who confirm or re-class under rule 12. These are owed to a ruling of Peter's. No reader is misled today: shipped text says "compiled for an iOS 17.0 deployment target", which is true of every release before 132's first claim. Not P3: item 1 must land before 132's first support claim, and P2 (record) brings a second lapse to Peter.)*
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — Spec 132's requirements document being committed. That is where items 2 to 4 get their acceptance criteria. At that event each owner re-rules their item to its vehicle (the ballot's PR, the lane's grant, the fixing PR), or the record closes if all five are done.
**Source**: Peter, received 2026-11-27T18:32:45Z (the orchestrator's receipt time, relayed), verbatim: "(B), raise to iOS 18"; confirmed at 2026-11-27T18:36:18Z, verbatim: "Yes, (B) still stands, raise to iOS 18", after he was told the device cost (no iPhone dropped; three iPads that stop at iPadOS 17 are: iPad 6th generation, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd generation; Kenya's finding, relayed). The ruling is recorded in `.kiro/specs/132-native-components-in-app/design-outline.md` § 5.1, P-6, and in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] P-6". The answers he read before ruling are `[KENYA R4]` and `[LEONARDO R4]`, spliced into the same feedback file.

---

## The obligations

1. **A Core Goals ballot for the iOS minimum** (`.kiro/steering/core-goals.md` § "Core Project Context" reads "iOS: 17.0+" at `e03d3ae3f`). It is drafted separately by the ballot seat, as ballot `2026-11-05-core-goals-android-minimum` did for Android. Its census states the device cost above, with Kenya's evidence for it committed. **It must be ratified before Spec 132's first support claim.** After the claim, raising the minimum is a breaking change (Kenya R4).
2. **`generate` restores the declared floor** (Ada's call; Leonardo R4). The adopter's root `Package.swift` is generated into their repository, and our source needs no iOS 18 API. So a hand edit from `.v18` to `.v17` compiles, and the adopter is then outside support without knowing it. `generate` writes the declared value back on its next run. Composes with Ada's manifest conditions (design-outline.md § 4.3).
3. **A release-time run on iOS 18.5 or 18.6 on `macos-15`**, the oldest runtime a free image carries (Kenya R4). It joins Spec 132's T-15 lanes and their issue-row grant. Whether that image's Xcode 26.3 runs the 18.x runtimes is UNVERIFIED.
4. **The shipped wording form becomes "built for iOS 18.0; tested on <runtime>"**, with the runtime taken from the lane's printed toolchain, never typed by hand (Kenya R4; Leonardo R4). The minimum is never printed without the tested runtime beside it. It changes shipped text only once item 1 is ratified. Until then, Spec 129's rule stands: "built for iOS 17.0, not run on 17".
5. **The iOS 17 runtime probe record is moot.** `.kiro/issues/2026-11-27-ios-17-runtime-probe-owed.md` (PR #886) was filed for P-6's evidence, and P-6 is answered. Kenya re-rules or closes it, on its own PR.

## Done when

Item 1's ballot is ratified, and items 2 to 5 are each closed or re-ruled to their own vehicle with a dated line. Then this record gets rule 5's outcome line and moves to `archive/`.

*Filed: Thurgood, 2026-11-27.*
