# Owed when Peter's own app first builds against a release: a dated real-app read of DesignerPunk's native components

**Date**: 2026-11-28
**Owners**: Kenya (iOS) and Data (Android), jointly. **Reader**: Stacy, who reads the record at the first build as a SYMPTOM-class claims audit against what D4 claims. **Filed by**: Kenya, for both owners, in the close commit for the goal record on #880's branch, under `.kiro/issues/README.md` rule 10. Data reviews and co-signs it in the next step on this branch.
**Trigger**: `manual`. The event that owes this record's close is Peter's own app first building against a DesignerPunk release with our native components as a dependency. Only Peter can see that event. When it happens, he or the orchestrator tells the owners, and the read is done against that build.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Kenya, owner, rule 12: Peter's ruling creates this act. No reader is misled: D4 is worded as our fixture app, which "stands in for an adopter's app and is not one" (132 outline § 1, D4 details, "What it is"). Not P3: a `manual` P3 is archived stale after two walks (rule 5), and this read must outlive an app that takes a long time.)*
**Source**:
- Peter, on Spec 132's P-1, received 2026-11-28T02:26:04Z (the orchestrator's receipt time), verbatim: "Yes, small means start small and grow; all three additions". Addition (3), as put to him: "file his real app as a record, not a D-row. When it first builds against a release it gets a dated read; it is evidence, not a gate."
- Recorded in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` § "[PETER] P-1".
- The record's shape (owners, reader, `manual`) follows `[THURGOOD R6]` ("Rule 10") and `[STACY R3]`.

---

## What is owed

1. **A dated read, per platform, at the first build of Peter's app against a release.** It records:
   - the date in UTC;
   - the DesignerPunk release and its commit;
   - Peter's app commit, if he shares it, or "not shared";
   - the toolchain: Xcode, Swift, and the iOS deployment target; or AGP, Kotlin, the Compose BOM and `compileSdk`;
   - what built, what failed, and what had to be changed in his app.
2. **The read looks at what our fixture cannot show** (Kenya R5 and R7; Data R5; Stacy R7):
   - an existing project layout that is not ours;
   - the app's own language mode and strict-concurrency settings;
   - Release and archive builds;
   - extension targets;
   - other dependencies whose names clash with ours;
   - real navigation and state around our components.
3. **Each failure the read finds** that D4–D10 did not catch is filed as its own record, and this read cites it.
4. **Stacy reads the record** as a SYMPTOM-class claims audit against what D4 claims. Her finding is cited here.

**Evidence, not a gate.** This read holds no merge, no release and no support claim.

## Surviving counter (Data R5; Stacy R3)

Both quotations are verbatim, except that their inner double quotation marks are changed to single ones.

- **Data** (`[DATA R5]`, in `feedback/design-outline.md`): "The trigger 'Peter's app is ready' is an event only Peter can see. It can lapse without anyone noticing, and nothing in D4–D10 would turn red."
- **Stacy** (`[STACY R3]`): "the real-app record has no forcing date. If Peter's app never becomes ready, the gap between 'our fixture' and 'your app' stays open for good, and nothing in the D rows ever closes it."
- **Neither is folded away.** `manual` has no git-visible event, so the read is invisible to every check until someone says the app has built. The owners re-read this record at each session start (Start Up Tasks item 9), and that is the only reminder.

## Closes when

The read for each platform that Peter's app targets, and Stacy's SYMPTOM read, are recorded here. Then this record closes under rule 5. If Peter's app targets only one platform, the other platform's line says so.

## Co-owner review (Data, 2026-11-28T05:10:52Z)

**Android, added to item 2** (from `[DATA R5]`, which item 2 cites). On Android, the read also looks at:
- the app's own AGP, Kotlin and Compose BOM versions, and how Gradle resolves them against our module's;
- an existing `MaterialTheme`, or the app's own theme, wrapping our theme provider;
- dependency injection and a multi-module build;
- a release build shrunk by R8, and whether our module needs keep rules for it.

*Co-signed: Data, 2026-11-28T05:10:52Z (`date -u`). I agree with the record as Kenya filed it: the owners, the reader, the `manual` trigger, its P2 class, and the surviving counter. The only change is the Android addition above.*
