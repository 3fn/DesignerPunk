# Owed at the next release: the iOS minimum's move from 17.0 to 18.0, stated in its notes, and every shipped iOS-minimum line checked

**Date**: 2026-11-28
**Owner**: Kenya. She owns the iOS half of Spec 132, including the evidence for the iOS minimum (132 outline § "Owners"). **Filed by**: Kenya, under `.kiro/issues/README.md` rule 10, for the item that the 132 outline § 4.3 and § 5.1 list as "the pre-claim wording window, owed: Kenya".
**Trigger**: `release:next:phase-1`. The event that owes this record's close is the next release's phase 1, because that release is the first to ship the 18.0 text. Its notes must state the change, and its walk checks the lines. That release is expected to be 16.4.0, but this record follows whichever release comes next.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-28, Kenya, owner, rule 12: the shipped text on `main` already states 18.0 and is true. What is owed is that the release notes say the minimum changed. No adopter is misled, because nothing shipped declares a deployment target to adopters (ballot `2026-11-27-core-goals-ios-minimum-18` L14, "Retroactivity: none") and native products are still not to be started.)*
**Source**:
- Peter, received 2026-11-27T18:32:45Z, verbatim: "(B), raise to iOS 18".
- Peter, received 2026-11-27T18:36:18Z, verbatim: "Yes, (B) still stands, raise to iOS 18".
- Ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`, RATIFIED (#888, `b58c73da7`) and applied (#889, `35456bdbc`).
- 132 outline § 4.3, "Kenya" (at `683188c44`): "Which wording applies between the Core Goals ratification and the first claim is owed: Kenya".
- `[THURGOOD R22]`, item Kenya (2), in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md`.

---

## What the shipped text says (VERIFIED, read at `origin/main` `35456bdbc`, 2026-11-28)

| Where | Says | State |
|---|---|---|
| `governance/DesignerPunk-Integration-Guide.md` L179, L197 | "compiled for an iOS 18.0 deployment target"; "Platform requirements: iOS and iPadOS 18.0+" | 18.0, amended by the ballot's site 5 |
| `docs/consumer/INSTALL.md` L165, L183 | the same lines, derived from the guide | 18.0 |
| `harness/pins.yaml` L57 (also at `ed69ae6b2`) | `deploymentTarget: "18.0"` | 18.0, the ballot's site 4 |
| `CHANGELOG.md` L54 (the 16.3.0 entry) | "for an iOS 17.0 deployment target (Swift 6)" | release history. Left unchanged on purpose (ballot § 6, its table row for `CHANGELOG.md` L54: "unchanged: release history") |
| `src/build/workflow/ConfigHelpers.ts` L436, L578, L614, L690, L721 | `minimumDeploymentTarget: '17.0'` | 17.0. Owned by Ada as item E of `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, not here |

**The reading carried in `[THURGOOD R22]` from `[KENYA R10]` was wrong**: "today the text says 17.0" is not true of the served guide or of INSTALL. #889 already moved both. The only gap is in the release notes, below.

## What is owed

1. **The next release's `CHANGELOG.md` entry carries one iOS line** that says:
   - the compile target moved from iOS 17.0 to 18.0;
   - it moved in a minor because no shipped file declared a deployment target to adopters and no native support claim exists;
   - the line names OS versions, not devices (the ballot's F-3, Peter, 2026-11-27T19:12:17Z, "Re: 1, Yes.").

   The text I propose for the release author: "**iOS minimum: 18.0.** DesignerPunk's iOS checks now compile for an iOS 18.0 deployment target (16.3.0: 17.0). This is a minor change because no release has declared a deployment target to your app, and native support is not yet claimed. iPadOS 18 runs on fewer iPad models than iPadOS 17; check Apple's list if your app supports older iPads."
2. **At that release's walk, check every shipped iOS-minimum line** and record the result in this file:
   - the guide, INSTALL and the pins read 18.0;
   - release history stays as it was;
   - item E's `ConfigHelpers` defaults are named as still 17.0 if item E has not landed yet.
3. **This record covers the window only.**
   - The claim-time wording ("built for iOS 18.0; tested on <runtime from the lane>") is item C of the floor record.
   - The "minimums rise only in a major release" promise is item D.
   - Both are 132's docs units.

## Closes when

The next release's phase 1 runs with item 1 in its CHANGELOG draft and item 2's check recorded here. Then this record closes under rule 5.
