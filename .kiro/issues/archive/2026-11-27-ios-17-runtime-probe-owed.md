# Owed for Spec 132's P-6: an iOS 17.5 simulator run of the render spike; Xcode 27.2 does not offer the runtime

**Date**: 2026-11-27
**Owner**: Kenya. Kenya owns the iOS half of Spec 132, including the evidence for the iOS minimum (Spec 132 outline § Owners). **Filed by**: Kenya, under `.kiro/issues/README.md` rule 10, for the obligation Peter's go below created. This record is that obligation's home. The goal record's item 2 (`.kiro/issues/2026-09-26-native-component-distribution.md` § "iOS obligations filed here under rule 10 (2026-11-27, Kenya)") points here from its close at #880.
**Class**: P2 obligation (record) · owed-act *(set 2026-11-27, Kenya, rule 12. P-6, the iOS minimum, is not put to Peter until this result is recorded, or until he says "not now". Shipped text says "built for iOS 17.0, not run on 17", which is true, so no reader is misled: `(record)`. Not P1: no consumer is blocked, and native onboarding is not supported.)*
**Trigger**: `merge:#880`. The merge of Spec 132's seeded design outline owes the close. The outline's merge precondition 2 puts the probes before the decision sitting that answers P-6, and that sitting precedes the merge (`.kiro/specs/132-native-components-in-app/design-outline.md` § 7, draft #880).
- If the probe cannot run by then, this Trigger is re-ruled before #880 merges, with Peter's answer to the options below as its reason.
- The record closes under rule 5 when the result is recorded, or as Peter's "not now" says (§ "What is owed").

---

## Peter's go (verbatim, with receipt times; relayed by the orchestrator)

- **2026-11-27T17:20:36Z**: "Re: 2, (a)". He had been asked: "(a) Download the iOS 17 simulator onto this Mac (a download you'd approve; unverified whether this Xcode can run it); (b) CI on macos-26 with the pinned Xcode; (c) CI on macos-15; (d) not now."
- **2026-11-27T18:07:40Z**: "17.5". He had been asked: "iOS 17.0 (7.6 GB) or 17.5 (7.3 GB)?"

## What is owed

- Run the render spike's tests on an **iOS 17.5** simulator runtime, the release build, not a beta. The tests: the nine original tests, plus the T-13 in-app walk and the T-12 Dynamic Type probe (`.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/`, PR #879).
- Record the result in that evidence directory, with a pointer here.
- That result is P-6's runtime evidence (Spec 132 outline § 5.1 P-6 and P-10).
- **If Peter answers "not now"**, P-6 is put on the evidence there is: built for 17.0, tools verified on iOS 26.0. This record then closes, or is re-ruled to a later event if he names one.

## Outcome so far (2026-11-27, Kenya)

- **Compatibility** (READ): Apple's Xcode support table, `developer.apple.com/support/xcode`, read 2026-11-27T17:24Z, lists Xcode 27.2's simulator range as "iOS 17 or later". Apple's simulator runtime index lists "iOS 17.5 Simulator Runtime" (build 21F79, 7,336,630,623 bytes), a disk image whose download needs authentication.
- **Download attempts** (VERIFIED). Both printed "Finding content...", needed no prompt, and downloaded nothing:
  - `xcodebuild -downloadPlatform iOS -buildVersion 21F79` at 18:08:07Z: "iOS 21F79 is not available for download.", exit code 70. The flag takes an OS version, not a build number.
  - `xcodebuild -downloadPlatform iOS -buildVersion 17.5` at 18:08:51Z: "iOS 17.5 is not available for download.", exit code 70.
- **So Xcode 27.2's own downloader does not offer the iOS 17.5 runtime** on this Mac (Xcode 27.2, 27B52; macOS 27.2.1). Why it does not is UNVERIFIED.
- **Three options are with Peter**, put by the orchestrator:
  1. A manual download of the runtime image by Peter, who signs in himself, then a local `xcodebuild -importPlatform`.
  2. A one-off CI run on `macos-15`, which needs an issue-row grant for its workflow.
  3. "Not now".
- His answer is recorded here when it is given.

## Parked (2026-11-27, Kenya)

- **Peter, received 2026-11-27T18:24:49Z (orchestrator relay), verbatim**: "Yes, ask Kenya and park the download".
- **The question he is weighing, received 18:18:45Z, verbatim**: "This is making me wonder if we should just work from the most current version. Please, forgive my ignorance, but maybe we should just be running the simulations on whatever version Apple recommends at the time? Honest thoughts?"
- **What "park" means here**: no route to an iOS 17 runtime is tried (no manual import, no CI image) until his answer to that question. The obligation stays here, and the Trigger is unchanged. His answer re-rules or closes this record.

## Outcome (2026-11-28, Kenya): closed. The probe is moot

- **Peter's answer to the parked question** was P-6's ruling, received 2026-11-27T18:32:45Z, verbatim: "(B), raise to iOS 18". He confirmed it at 18:36:18Z, after being told about the three iPads, verbatim: "Yes, (B) still stands, raise to iOS 18".
- **Its effect.** The iOS minimum is 18.0: Core Goals, ballot `2026-11-27-core-goals-ios-minimum-18`, RATIFIED in #888 (`b58c73da7`) and applied in #889 (`35456bdbc`). So no iOS 17 runtime is needed, and none will be tried.
- **The wording this record was protecting has been replaced.** It was "built for iOS 17.0, not run on 17". #889 changed the guide and INSTALL to "compiled for an iOS 18.0 deployment target" and moved `harness/pins.yaml`'s `deploymentTarget` to "18.0" (VERIFIED at `ed69ae6b2`).
- **Evidence at the new floor is not owed here.** The release-time iOS 18.x run is item A of `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`.
- **This closes the record before its Trigger (`merge:#880`) fires.**
- **Correcting my own close.** `d84b28d6a` (#886) archived this file and its message described a rule-5 outcome, but that outcome was never written. This record was therefore archived with no outcome. The commit before this one brought it back under rule 4, and this section is the missing outcome. My #879 note at `766eb242d` called the record "closed and archived". That is true only from this commit.
