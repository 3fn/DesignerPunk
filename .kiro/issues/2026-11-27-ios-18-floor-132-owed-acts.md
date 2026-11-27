# Issue: the iOS 18 floor's owed acts in Spec 132 — CI on iOS 18 every release, `generate` restoring the floor, docs stating what is tested

**Date**: 2026-11-27
**Owner**: Thurgood (filer, and Spec 132's formalizer). Items name their seats: A Kenya; B Ada; C and D 132's docs units; E Ada.
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — the event that owes this record's close is Spec 132's requirements: the commit that adds them takes these items in or leaves them out with a reason (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec").
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Thurgood, owner, rule 12: Peter's ruling creates these acts; no reader is misled while 132 has made no support claim.)*
**Source**: Peter, received 2026-11-27T18:32:45Z, verbatim: "(B), raise to iOS 18", on Spec 132's P-6; confirmed 2026-11-27T18:36:18Z, verbatim: "Yes, (B) still stands, raise to iOS 18", after being told the floor drops three iPads. (B), as put to him: "raise the minimum to iOS 18 before the first claim (a Core Goals ballot), with free CI testing 18 every release, `generate` restoring the floor if lowered, and docs stating what's tested". The Core Goals raise is ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`. Filed under README rule 10 in that ballot's PR.

---

## Items (detail: that ballot § 6)

- **A. Free CI testing on iOS 18 every release** (Kenya): a release-time run on an 18.x simulator runtime, sharing T-15's per-lane grant; the runner choice (`macos-15` with Xcode 26.3, or `macos-26` with the pinned 26.6 and a downloaded runtime) is 132's planning. First run on the first family's unit PR, before the claim.
- **B. `generate` restores the floor, and warns; never refuses** (Ada, ruled at R1): the generated `Package.swift` declares `platforms: [.iOS(.v18)]` with Leonardo's comment above it, and `generate` restores a lowered value on its next run, printing one warning, exit 0. A headerless manifest is the adopter's: `generate` does not write it and warns if it is below the minimum (the ballot's F-2, Peter, 2026-11-27T18:49:44Z, "Re: F-2, yes").
- **C. Docs state what is tested** (132's docs units): the minimum beside the tested runtime, read from the lane's printed toolchain; the support-boundary sentence ("lowering the minimum in the generated `Package.swift` compiles but is unsupported"); one generated value read by `Package.swift`, D4's target, the guide, INSTALL and the walkthrough.
- **D. The docs state the gap when free images stop carrying 18** (132's docs units): "built for iOS 18.0; tested on iOS <runtime>". The rule that the floor does not follow the images lives in `harness/pins.yaml`'s comment (the ballot's site 4). D also states, for both platforms, "DesignerPunk's iOS and Android minimums rise only in a major release" (the ballot's F-1, Peter, 2026-11-27T18:49:44Z, "Re: F-1, yes").
- **E. `ConfigHelpers`' iOS defaults and an iOS validation floor** (Ada): `src/build/workflow/ConfigHelpers.ts`' five `'17.0'` defaults read item C's single minimum, and `validateiOSOptions` refuses a target below it, as the Android check does; in 132's packaging unit, under a tasks-row grant.

*Signed: Thurgood, 2026-11-27.*
