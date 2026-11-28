# Owed in Spec 132: the Android toolchain range numbers, from D4's builds at both ends, and the API-26 floor test in 132's module

**Date**: 2026-11-27
**Owner**: Data (the Android half of Spec 132: the Gradle module, the D4 Android app, the toolchain range and the floor test; Spec 132 outline § Owners). **Filed by**: Data, under `.kiro/issues/README.md` rule 10. These obligations were held only in my Spec 129 design inbound and in merged spec and ballot text. Peter ruled that such text does not count as a home: an obligation always needs an issue record ("Re: 3, Align with Thurgood", 2026-11-27, relayed by the orchestrator; ballot `2026-11-27-inbound-handoff-notes-definition`).
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Data, rule 12. Both items are promises to adopters once 132 ships a Gradle module: the range is what they may build with, and the floor is what they may target. Until this record existed, no record held either, but no reader was told anything false, so `(record)`. Not P1: nothing ships a module yet.)*
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md`. The event is Spec 132's requirements document being committed: that is where both items get the acceptance criteria that later units build to.
- The record does **not** close there. At that event the owner re-rules this Trigger to the event that owes the close: the unit that builds D4's Android app at both range ends and adds the floor test, by its completion doc's path or `merge:#<N>` once that PR exists.
- The record closes under rule 5 when all three items below are met.
- **This token does not fire at the outline's merge (#880)**: the outline PR adds no `requirements.md`. Spec 132's feedback doc says the later phase files are created only when their phase opens (`.kiro/specs/132-native-components-in-app/feedback/design-outline.md` L5, at `22e21990a`).

**Sources** (by path; this record is now the obligations' home, and these lines point to it):
- `.kiro/specs/129-consumer-generation-completeness/inbound-from-data-design-2026-11-05.md` § 6, "Plan decision 5: the Android minimum and the supported toolchain range" (L241–L282 at `8553499b1`);
- `.kiro/specs/129-consumer-generation-completeness/design.md` L38, "The range numbers stay with Spec 132's D4", and L734;
- `.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` L149 (F-1 (iii): the floor rule "becomes a **test in Spec 132's module**") and L296;
- the Spec 132 outline, § 4.3 "Data" and § 5.1 P-9 (draft #880, `.kiro/specs/132-native-components-in-app/design-outline.md`).

---

## What is owed

### 1. The Android toolchain range numbers

- **What**: the supported range of the Android Gradle plugin (AGP), Kotlin (with the Compose compiler plugin, which is versioned with Kotlin) and the Compose BOM that an adopter's app may build our module with. The range is stated as "built at these two points": the bottom and the top.
- **How it is measured**: D4's Android fixture app builds from a packed install at each end of the range. That is two CI builds on a free `ubuntu-24.04` runner.
  - They are a `.github/**` change, so they need an issue-row grant (README rule 8). A Spec 132 tasks row cannot grant them.
  - The runner image ships its SDK licence already accepted. No new licence act is planned, and if one is asked for, it goes to Peter.
- **Who decides**: the team proposes the numbers after both builds pass, and **Peter approves them** (Spec 129 `design.md` § 0, decision 5's row; Spec 132 outline P-9: "asked at the tasks round or later, not now").
- **Starting point**: the compile harness's pins are a candidate for the top end: AGP 9.5.0, Kotlin 2.4.21, Compose BOM 2026.09.00, JDK 17 (`harness/pins.yaml` § `android`). Kotlin `1.9.0` and `targetSdkVersion` 34, which 129 left in shipped component files, are range questions (Spec 129 `design.md` L734).

### 2. The API-26 floor test, in 132's module

- **What**: a non-model check, in the Gradle module 132 ships, that the module's `minSdk` equals Core Goals' Android number (API 26, `.kiro/steering/core-goals.md` § "Platform Minimum Versions") and is at least the highest floor its dependencies declare. Today that is Compose's `minSdkVersion="23"` under BOM 2026.09.00, measured 2026-11-04.
- **Also owed with it**:
  - lint `NewApi` as an error in that module;
  - one emulator run at API 26, since a Kotlin compile checks no API level (Spec 129 Req 2.9).
  - The emulator run depends on the render probe's answer (`.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`) and on Spec 132 P-8.
- **An engineering note** where the pin lives, in the module's documentation or `governance/platform-implementation-guidelines.md` (Lina's). Ballot `2026-11-05-core-goals-android-minimum` F-1 (iii) names both places.

### 3. Whether raising a toolchain floor counts as a major *(appended 2026-11-28, Data, per `[THURGOOD R22]`)*

- **What**: a rule, decided with item 1's numbers and approved by Peter together with them (Spec 132 P-9). It says whether raising the bottom of the supported range (AGP, Kotlin with its Compose compiler plugin, the Compose BOM, or `compileSdk`) is a breaking change that needs a major, or may ship in a minor. A `minSdk` raise is outside this rule: it moves Core Goals' number, which is a ballot.
- **Why it is owed**: androidx raises its floors over time. The `compileSdk` 37 finding at the end of this record is one case: at BOM 2026.09.00 an app build needs `compileSdk` 37, not 36. If every raise is a major, every Compose BOM bump forces one. If no raise is, `.kiro/issues/2026-11-28-main-releasable-as-16x-until-17-0-0.md` item A has a hole: a minor can stop an adopter on the old floor from building, with no deprecation step possible.
- **Sources**: `[DATA R6]` § 4 and `[DATA R10]` § 1, and `[THURGOOD R22]` ("append item 3 … whether raising a toolchain floor counts as a major, decided with P-9 (Data R10). The record's existing trigger stands."), all in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` on `spec/132-design-outline`.
- **Closes with**: the rule's text, with Peter's approval quoted and dated, in the same rule-5 outcome line as item 1. The trigger above stands.

---

## What closes it

All three items, recorded here with a dated rule-5 outcome line:
1. the range numbers, with Peter's approval quoted and dated, and the two builds' run URLs, together with item 3's rule and Peter's approval of it, quoted and dated;
2. the floor test's path and a run of it, the lint setting's path, and the API-26 emulator run's URL. If P-8 leaves Android without an emulator, the outcome line records the evidence kind used instead, labelled as such.

Then the record archives under rule 5.

## Counter-argument and what survives

- **"The spec will hold these; a record is a second copy."**
  - Peter has ruled that spec text is not a home for an obligation.
  - This record keeps the drift guard: it cites its sources by path and is the only place the items are listed. Spec 132's requirements will cite this record rather than restate it.
- **What survives**: a range proven at two points says nothing about the combinations between them. An adopter on a mid-range AGP with an old Kotlin is untested. The record states the range as "built at these two points" so that nobody reads it as more.

**Finding for item 1 (2026-11-27, Data)**: the top end cannot use the harness's `compileSdk 36` for an app build. In the render probe's run 46039771588 (#884), Compose 1.12.1, under BOM 2026.09.00, failed `checkDebugUnitTestAarMetadata`: it requires `compileSdk` 37 or later. The compile harness runs only `compileDebugKotlin`, so it never sees this. The range's top end at this BOM is therefore `compileSdk` 37. Whether the harness pin should move to 37 is a choice, not a repair, under ballot `2026-11-07-native-lane-ownership` item 3. The full result is in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Android render probe result (2026-11-27, Data)". *Signed: Data.*
