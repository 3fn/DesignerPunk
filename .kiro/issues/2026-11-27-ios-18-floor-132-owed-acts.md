# Issue: the iOS 18 floor's owed acts in Spec 132 — CI on iOS 18 every release, `generate` restoring the floor, docs stating what is tested

**Date**: 2026-11-27
**Owner**: Thurgood (filer, and Spec 132's formalizer). Items name their seats: A Kenya; B Ada; C and D 132's docs units.
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — the event that owes this record's close is Spec 132's requirements: the commit that adds them takes these items in or leaves them out with a reason (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec").
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Thurgood, owner, rule 12: Peter's ruling creates these acts; no reader is misled while 132 has made no support claim.)*
**Source**: Peter, received 2026-11-27T18:32:45Z, verbatim: "(B), raise to iOS 18", on Spec 132's P-6; confirmed 2026-11-27T18:36:18Z, verbatim: "Yes, (B) still stands, raise to iOS 18", after being told the floor drops three iPads. (B), as put to him: "raise the minimum to iOS 18 before the first claim (a Core Goals ballot), with free CI testing 18 every release, `generate` restoring the floor if lowered, and docs stating what's tested". The Core Goals raise is ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`. Filed under README rule 10 in that ballot's PR.

---

## Items (detail: that ballot § 6)

- **A. Free CI testing on iOS 18 every release** (Kenya): a release-time run on the oldest 18.x simulator runtime the free `macos-15` image carries, under an issue-row grant for its workflow.
- **B. `generate` restores the floor** (Ada's call): the generated `Package.swift` declares `platforms: [.iOS(.v18)]`, and `generate` restores a lowered value on its next run, or warns, as Ada rules.
- **C. Docs state what is tested** (132's docs units): the minimum beside the tested runtime, read from the lane's printed toolchain; the support-boundary sentence ("lowering the minimum in the generated `Package.swift` compiles but is unsupported"); one generated value read by `Package.swift`, D4's target, the guide, INSTALL and the walkthrough.
- **D. When free images stop carrying 18**: the text states the gap; the floor does not follow the runner images' schedule.

*Signed: Thurgood, 2026-11-27.*
