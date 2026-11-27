# Ballot Measure: Core Goals raises the iOS minimum to 18.0, before Spec 132's first support claim

**Date**: 2026-11-27 (drafted from 2026-11-27T18:35:10Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md` and profile author of its operative set). Direction: Peter, received 2026-11-27T18:32:45Z (the orchestrator's clock, at receipt), verbatim: **"(B), raise to iOS 18"**, on Spec 132's P-6. He was asked: "(A) keep iOS 17.0, test on current, with your one manual iOS 17 download at the claim; or (B) raise the minimum to iOS 18 before the first claim (a Core Goals ballot), with free CI testing 18 every release, `generate` restoring the floor if lowered, and docs stating what's tested". The basis was Kenya's `consults-2026-11-27/answers/kenya-ios-test-on-current.md` (`[KENYA R4]`) and Leonardo's `answers/leonardo-ios-minimum.md` (`[LEONARDO R4]`).
**Status**: **DRAFT (R3)**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure and ratifies nothing. Only Peter's dated words in this Status line ratify it. His 18:32:45Z words direct the draft; they are not ratified text. *R1 head `d85b09a18`. R2 splices Kenya's, Ada's, Leonardo's, Data's and Stacy's R1 (§ 12) and folds them (`[THURGOOD R2]`). R3 records Peter's F-1 and F-2 answers below.*
**Answered so far (not a ratification)**: Peter, received 2026-11-27T18:49:44Z (the orchestrator's clock, at receipt), verbatim: "Re: F-1, yes. Re: F-2, yes. Re-F-3, this is making me wonder if we should be naming deices at all and focus on the versions of the OS. Honest thoughts?" (his spelling kept). Read: **F-1 = yes**, item D promises that the minimum rises only in a major release, worded for both platforms; **F-2 = yes**, Ada's escape hatch is part of item B. **F-3 is open**: Peter reframes it toward OS versions only, and the orchestrator is checking a middle form with Leonardo and Kenya (state OS versions only; point to Apple's own device-compatibility list rather than naming devices).
**A fact Peter's ruling did not have, stated first** (§ 1): an 18.0 floor drops **no iPhone**, but it drops **three iPads** that run iPadOS 17 and cannot run 18. Leonardo's "probably shuts out no device" was marked UNVERIFIED, and Peter ruled after reading it. The orchestrator put the corrected fact to him: "Does (B), raising to iOS 18, still stand, knowing it drops those three older iPads (iPad 6th gen, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd gen)?" **Peter, received 2026-11-27T18:36:18Z (the orchestrator's clock, at receipt), verbatim: "Yes, (B) still stands, raise to iOS 18".** Both of his answers direct this draft; neither ratifies its text.
**Owner**: Thurgood (site 1, Core Goals; site 3 as profile author). Site 2 is Kenya's charter line, in his text. Site 4 is Kenya's lane.
**Required reviewer**: **Stacy**. She is the C1 confirmer and signer of Core Goals' `#core-project-context`, and the census reader.
**Consulted seats** (R1 each, § 12): **Kenya** (the iOS fact, his charter line, his signed unit, his lane's `deploymentTarget`), **Ada** (`generate` restoring the floor; `ConfigHelpers`' iOS defaults), **Leonardo** (the adopter-facing sentences), **Data** (Android parity in shared harness code and wording). **Peter** ratifies: Core Goals is identity law.
**Class**: LAW for site 1. iOS code and agents must meet a minimum higher than the one Core Goals requires today. Sites 2–4 are EXECUTION of this ballot.
**Amends**: `.kiro/steering/core-goals.md` L28, one line (site 1). Follow-on, at application: `canonical/agents/kenya.md` L472 (site 2); the operative-set items, overlays and one dispositions removal (site 3); `harness/pins.yaml`'s `ios.deploymentTarget` and its comments, with `harness/ios/lane.ts` L158's comment and the `probe-swift.test.ts` assertions that mirror the pin (site 4); the Integration Guide's two iOS compile lines, with INSTALL derived from it (site 5). Spec 132's units carry the rest (§ 6).
**Cap**: one law line, one charter line, the profile lines, one pin with its comment and its test mirror, two guide lines. **Retroactivity**: none. No shipped iOS build declares a deployment target to adopters today: there is no generated `Package.swift` yet (VERIFIED, `git ls-files | grep -i Package.swift` prints nothing outside `node_modules`), and the harness's `17.0` is a compile pin.
**Base**: `main` at `e03d3ae3f`. Every before-text below is quoted from that tree.

> **Conflict of interest, stated first.** I own Core Goals, I wrote the Android precedent this follows, and I author the profile lines whose seat acts it creates. Kenya's, Ada's, Leonardo's and Data's reads, Stacy's review and Peter's ratification are the checks.

---

## 1. What was ruled, and the device fact

**Ruled** (Peter, 2026-11-27T18:32:45Z): "(B), raise to iOS 18". (B), as put to him, has four parts: the Core Goals raise, before the first support claim; free CI testing on iOS 18 every release; `generate` restoring the floor if an adopter lowers it; and docs stating what is tested. **This ballot carries the first part as law and names the other three as Spec 132's owed acts** (§ 6), filed as a record under README rule 10.

**The device fact** (Kenya, from Xcode 27.2's bundled simulator device data, 2026-11-27, via the orchestrator; Apple's simulator data, not a hardware list):
- **No iPhone is dropped.** The iPhone XS, XS Max and XR, the oldest iPhones that run iOS 17, are listed up to 18.99.
- **Three iPads are dropped**: iPad (6th generation), iPad Pro (10.5-inch) and iPad Pro (12.9-inch, 2nd generation) are listed up to 17.99. They run iPadOS 17 and cannot run 18.
- So the ballot does not say "every iOS 17 device runs 18". An adopter whose app supports those iPads cannot adopt DesignerPunk's iOS components at an 18.0 floor.

**Why 18, from the consults** (Kenya R4, Leonardo R4):
- 18 is the oldest iOS that a free CI image carries (`macos-15`: simulators 18.5, 18.6, 26.0–26.2), so it is the oldest floor DesignerPunk can test reproducibly without an Apple ID.
- No code needs an iOS 18 API: zero availability errors at 17.0 (Kenya, VERIFIED at 129). The raise buys evidence, not features.
- Before the first support claim, raising costs no adopter anything; after it, it is a breaking change.
- **Leonardo's caution, carried**: the floor is a **product choice**, tested on the oldest free runtime available. It does not follow GitHub's image schedule. When the free images stop carrying 18, the gap is stated in the text; the floor does not rise to 26 by the same argument (§ 6, item D).

## 2. Site 1: `.kiro/steering/core-goals.md` L28 (LAW)

**Before** (L28 at `e03d3ae3f`):
> - iOS: 17.0+

**After** (one line, same line number; `<ratification date>` filled by the Status commit, here and in site 3c's removal):
> - iOS: 18.0+ *(Amended <ratification date> by ballot 2026-11-27-core-goals-ios-minimum-18, item 1; prior text at `e03d3ae3f`.)*

- The pointer follows L29's form, the Android precedent.
- The line carries no clause. Leonardo's two sentences (support boundary; product choice) go where an adopter and a lane owner meet them (sites 4 and 5, and § 6), not into identity law, following F-1 (iii) of the Android ballot, which dropped a clause from the same block.
- **Unchanged**: L27, L29 and L30.

## 3. Site 2: `canonical/agents/kenya.md` L472 (EXECUTION of this ballot)

**Before** (L472 at `e03d3ae3f`, in § "iOS-Specific Guidance", Kenya's signed unit `#ios-specific-guidance`):
> - iOS 17.0+ minimum (per Core Goals)

**After** (Kenya's final text, R1 § 1, byte for byte; Data's pointer form):
> - iOS minimum version per Core Goals

- The number then lives in Core Goals alone, so a later change is one law line and one signed unit, not two.
- EXECUTION, not CORRECTION: the referent (site 1) changes in the same PR, and the README's test says same-PR governance text never counts as a referent (the Android ballot § 3).
- Charters carry no dated pointer; the commit names this ballot.

## 4. Site 3: the profile lines (EXECUTION; the profile author's, with seat acts)

- **3a** `canonical/operative-sets/core-goals.yaml` item `principle-6` (L39–L42): `kind: obligation` (unchanged); label and text become `iOS: 18.0+` (the new line without the pointer, a verbatim substring of the unit).
- **3b** `canonical/operative-sets/kenya.yaml` item `native-7` (L604–L606): label and text become `iOS minimum version per Core Goals`, or Kenya's final text; **kind `obligation`**, as Data re-ruled his `native-7` (it binds Kenya to a number he can contradict by setting or accepting a lower target). Kenya rules the kind `obligation` at his confirm act (R1 § 1), as Data's was.
- **3c** the consumer rendering:
  - `canonical/profiles/consumer/always-set/core-goals.overlay.md` L14 becomes `- iOS: 18.0+`, and its unit pin re-grounds;
  - the `#core-project-context` row in `always-set/core-goals.dispositions.yaml` gains a removal: `{"text": " *(Amended <ratification date> by ballot 2026-11-27-core-goals-ios-minimum-18, item 1; prior text at `e03d3ae3f`.)*", "cites": "subtraction-2"}` (leading space included), beside the Android pointer's removal;
  - `canonical/profiles/consumer/kenya.overlay.md` L119 takes Kenya's final line, and its pin re-grounds.
- **Seat acts** (the Android precedent's § 5 boundary: the authoring commit never moves a `canonicalHash`):
  - **Stacy** re-confirms (C16) `#core-project-context` in `confirmations/core-goals.md`, appending a dated record above the existing ones, and re-signs (C1) in `signatures/core-goals.md`, after checking the consumer rendering (the removal's text must match the rendered pointer byte for byte).
  - **Kenya** re-confirms (C16) `#ios-specific-guidance` in `confirmations/kenya.md` and re-signs (C1) in `signatures/kenya.md`. The row's one removal ("the stale `dist/*.ios.swift` snapshots") quotes text outside the hunk and stands.
- **Generated**: `.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**`, `canonical/generated.lock`, by regeneration.

## 5. Sites 4 and 5: the compile pin, its test, and the served lines (EXECUTION; at application, under this ballot's grants)

**Until this ballot is ratified and applied**, Spec 129's wording stays true and stays as it is: "Built for iOS 17.0, not run on 17" (`harness/pins.yaml` L36–L37; Peter, 2026-11-05T13:05:54Z, "yes, 4 (a), 7 (a)"), and the guide's "compiled for an iOS 17.0 deployment target".

**Site 4, the compile pin and its mirror (Kenya's commit, under this ballot's grants).** Spec 129 Requirement 2.9 makes `ios.deploymentTarget` **equal** Core Goals' iOS minimum (`pins.yaml` L53–L54). It is not a P1–P7 repair, and ballot `2026-11-07-native-lane-ownership`'s P2 requires that `deploymentTarget` stay "unchanged by construction" under the standing scope, so this ballot grants it (§ 8) and Stacy's ARMING read takes this ballot's route (Kenya R1 G2; Stacy R1 § 5).
- **`harness/pins.yaml` L34–L37**, replaced by Kenya's text, byte for byte:
  ```
  # or iOS an adopter may use. The one exception is `deploymentTarget`, which equals Core Goals' iOS
  # minimum (18.0): it is the compile target, so "uses nothing newer than 18.0" is compile evidence.
  # The minimum is a product choice, made in Core Goals and tested on the oldest iOS a free runner image
  # carries; it does not move when the runner images do. "Built for iOS 18.0, not run on 18" is the
  # wording rule until something runs on iOS 18 (ballot 2026-11-27-core-goals-ios-minimum-18;
  # Peter, 2026-11-27T18:32:45Z, "(B), raise to iOS 18").
  ```
  This carries Leonardo's product-choice sentence in Kenya's words.
- **`harness/pins.yaml` L55**: `deploymentTarget: "18.0"`. L53's `statement` and L54's comment name no number and are unchanged.
- **`harness/ios/lane.ts` L158**: `` /** `arm64-apple-ios18.0-simulator`. */ `` (comment only; the function reads the pin).
- **`scripts/harness/__tests__/probe-swift.test.ts`** (G1, Kenya R1; Stacy R1 § 2): it reads the real pins and Core Goals and runs in the required `lane-functional-root`. Its four `17.0` assertions (L394, L409, L419, L432) turn red at site 1 alone. Kenya's fix, in the same commit: **derive the target from Core Goals**, so the next floor move needs no test edit.
  - L392's test title drops "17.0" ("deployment target equals Core Goals' iOS minimum");
  - L394, L419 and L432 compare against the parsed minimum, not a literal;
  - L408–L409 become `const m = coreGoals.match(/^- iOS: (\d+\.\d+)\+/m); expect(m).not.toBeNull(); expect(doc.ios.deploymentTarget).toBe(m![1]);`;
  - **a known-bad case**: a pins text with `deploymentTarget: "17.0"` against an 18.0 Core Goals must fail the equality.
  - The file sits under Stacy's instrument-path limb (deletions-zero): the application PR's body names the file and this ballot as its amendment, and quotes the changed lines.
- **Harness evidence**: Kenya compiled both tiers locally at 17.0 and 18.0 (Xcode 27.2): token tier 0 errors and 0 warnings at both; component tier 64 errors and 13 warnings at both, the `error:`/`warning:` sets identical with line and column removed. No warning is new at 18.0. On the pinned Xcode 26.6 it is UNVERIFIED, so the iOS harness contexts run at the application head (not required contexts; a red stops the application by this ballot's rule). If an 18.0 target moved any `harness/expected/*.tsv` entry, that file would join the grants, or P4 fails; Kenya expects none.

**Site 5, the guide's iOS lines** (`governance/DesignerPunk-Integration-Guide.md`; Android's L183, L200 and L202 are untouched, Data R1):
- **L179, the harness clause**: "compiled for an iOS 17.0 deployment target" → "compiled for an iOS 18.0 deployment target"; "not run on any device or simulator" stays true and stays.
- **L179, the platform-requirements clause**, in Leonardo's wording (R1 § 1), replacing "Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit).":
  > Platform requirements: **iOS and iPadOS 18.0+** (SwiftUI, UIKit). This is a support boundary, not a capability limit: the components use no iOS 18-only API, but DesignerPunk does not test or support them on earlier versions. [F-3's sentence, if Peter takes it: Every iPhone that runs iOS 17 also runs iOS 18; three iPads do not (iPad 6th generation, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd generation), so an app that supports them cannot use these components.]
- **L197**: "- iOS: the token files `generate` writes compile: compiled for an iOS 18.0 deployment target; not run on any device or simulator."
- **Pointer** (Stacy R1 § 5; `governance/**` owes one): after each changed line, `*(amended <application date> by ballot 2026-11-27-core-goals-ios-minimum-18, site 5; prior text at `e03d3ae3f`)*`.
- `docs/consumer/INSTALL.md` L165 and L183 are derived from the guide (`scripts/derive-install-doc.ts`) and regenerated.

## 6. What this ballot does not settle: Spec 132's owed acts, and other sites

**Owed by Spec 132's units** (Peter's (B) parts 2–4, plus Ada's item E; filed under README rule 10 in this PR as `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, Trigger `path:.kiro/specs/132-native-components-in-app/requirements.md`):
- **A. Free CI testing on iOS 18 every release** (Kenya). It shares T-15's per-lane grant. Kenya's runner fork ((a) `macos-15` with Xcode 26.3 on its installed 18.6 simulator, his lean; (b) `macos-26` with the pinned 26.6, downloading an 18.x runtime per run) goes to 132's planning, not this ballot. Its prerequisites, in Kenya's order: something to run (the D4 app, or #879's fixture as an interim); one dispatched probe that Xcode 26.3 on `macos-15` boots an 18.6 simulator and runs XCUITest; its pins in a file outside `.github/**`; one issue-row grant for its workflow; its result printed and pasted as the harness does. First run on the first family's unit PR, before the claim, then at each release.
- **B. `generate` restores the floor, and warns; never refuses** (Ada's ruling, R1 § 1). A `Package.swift` carrying DesignerPunk's generated header is `generate`'s file, so a lowered `platforms: [.iOS(...)]` is restored on the next run, with one warning and exit 0:
  > `Package.swift: platforms .iOS(<found>) is below DesignerPunk's iOS minimum (18.0); restored to .iOS(.v18). A lower minimum compiles but is unsupported. To keep your own value, take ownership of the file by removing its generated header; generate then stops writing it.`
  The value comes from the one generated minimum (item C), never a literal in the emitter. Tests: a lowered platform is restored, the warning printed, exit 0. **The generated file carries Leonardo's comment above `platforms:`**: `// DesignerPunk supports iOS and iPadOS 18.0 and later. A lower value still compiles, but it is unsupported, and the next \`npx designerpunk generate\` sets it back.` **Ada's escape hatch, F-2 answered yes** (Peter, 18:49:44Z): a `Package.swift` without DesignerPunk's generated header is the adopter's; `generate` does not write it, and, if its iOS platform is below the minimum, prints the same warning saying it is unsupported and that nothing was restored (exit 0). Test: a headerless manifest is not written, and the warning is printed.
- **C. Docs state what is tested** (132's docs units): "iOS and iPadOS 18.0+; tested on iOS 18.x and <lane runtime>", with the runtime read from the lane's printed toolchain; the support-boundary sentence for the generated `Package.swift` ("lowering the minimum in the generated `Package.swift` compiles but is unsupported"); the walkthrough's "You'll need" and "If not" (the latter naming the three iPads under F-3); one generated minimum read by `Package.swift`, D4's target, the guide, INSTALL, the walkthrough and item E's defaults.
- **D. The docs state the gap when free images stop carrying 18** (132's docs units): the text then reads "built for iOS 18.0; tested on iOS <runtime>", and the floor does not follow the images (the rule itself lives in site 4's comment). **F-1 answered yes** (Peter, 18:49:44Z): the docs also state, for both platforms, "DesignerPunk's iOS and Android minimums rise only in a major release."
- **E. `ConfigHelpers`' iOS defaults and an iOS validation floor** (Ada, R1 § 2): `src/build/workflow/ConfigHelpers.ts`' five `'17.0'` defaults (L436, L578, L614, L690, L721) read the single minimum of item C, and `validateiOSOptions` refuses a target below it, naming Core Goals, as the Android check does (L791–L792); in 132's packaging unit, under a tasks-row grant over `ConfigHelpers.ts`, `BuildOrchestrator.ts` and their tests. The Android precedent is "follow the floor, in a spec unit" (#719, `30e2f727b`). Until then the five literals contradict Core Goals; no consumer path reads them (`@3fn/core/build` does not export `ConfigHelpers`; Ada VERIFIED).

**Kenya's evidence** for the device fact and the 17.0/18.0 compiles: `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-18-floor-device-and-compile-evidence.md` @ `b35e1d041` (on #879, unmerged; cited by that commit until #879 merges).

**Every site that carries the iOS 17 floor today** (census: `git grep -n -E "iOS 17|iOS:? ?17\.0|\.v17|17\.0\+|ios17|deploymentTarget" -- . ':!.kiro/specs' ':!.kiro/issues/archive'` at `e03d3ae3f`, 60 files (Stacy re-ran it), plus `.kiro/specs/132-*` separately; generated roots and frozen fixtures read apart):

| Site | Carries | When / who |
|---|---|---|
| `.kiro/steering/core-goals.md` L28 | the floor | site 1, at application |
| `canonical/agents/kenya.md` L472; `operative-sets/kenya.yaml` L605–L606; `profiles/consumer/kenya.overlay.md` L119 | "iOS 17.0+ minimum (per Core Goals)" | sites 2, 3b, 3c, at application |
| `operative-sets/core-goals.yaml` L41–L42; `always-set/core-goals.overlay.md` L14 | "iOS: 17.0+" | sites 3a, 3c, at application |
| `harness/pins.yaml` L34–L37, L55; `harness/ios/lane.ts` L158 | the compile target and its wording rule | site 4, at application (Kenya, under grant). `lane.ts` L91, L136, L160 read the pin and are unchanged |
| `scripts/harness/__tests__/probe-swift.test.ts` L392, L394, L408–L409, L419, L432 | the target's test mirror | site 4, at application (Kenya, under grant) |
| `governance/DesignerPunk-Integration-Guide.md` L179 (two occurrences), L197; `docs/consumer/INSTALL.md` L165, L183 | the compile lines and the platform requirement | site 5, at application (INSTALL regenerated) |
| `src/build/workflow/ConfigHelpers.ts` L436, L578, L614, L690, L721 | code defaults | **owed by 132 (item E)** |
| `src/cli/templates/product/overview.yaml` L13 (`minimumVersions: ios: TODO`) | a consumer's own product minimum | **unchanged**: the adopter's field |
| `.kiro/specs/132-native-components-in-app/design-outline.md` L32, L48, L52 | "iOS 17.0 stays … asked again at Spec 132"; the iOS 17 probe | **recorded on #880 in its outline round**, as Peter's other answers are (Stacy R1 § 3); #880's `f25da3d8a` records P-6 |
| `.kiro/issues/2026-09-26-native-component-distribution.md` L164–L171 (the iOS 17 runtime probe) | an owed probe | **in the record's closing outcome line on #880** (Kenya writes, Data co-signs), which says the probe is superseded by item A, citing this ballot; #880 archives the record, and an archived record takes no edit (README rule 2) (Data R1; Kenya R1 § 6) |
| `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md` (#886, open; filed archived) | the iOS 17.5 probe owed for P-6 | **unchanged**: archived at filing; Peter's (B) answered P-6, and #880's close records `d84b28d6a` |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` L36 ("Our floor is 17") | a statement of the floor | **its owner** appends a dated line; the trait question is unchanged |
| `CHANGELOG.md` L54; `docs/releases/release-16.3.0.md` L32 | what shipped then | **unchanged**: release history |
| `governance/Component-Family-Navigation.md` L252; `governance/Token-Family-Motion.md` L80; `src/components/core/Nav-SegmentedChoice-Base/README.md` L308; `docs/releases/RELEASE-NOTES-10.0.0.md` L79; `src/build/platforms/iOSMotionTokenFormatter.ts` L73; `src/components/core/Nav-TabBar-Base/Nav-TabBar-Base.schema.yaml` L164; `.kiro/issues/ios-readonly-focusable-prototype.md` L18 | API availability ("iOS 17+" on an API), not the floor | **unchanged**: true at any floor of 17 or above |
| `.kiro/issues/2026-11-27-*` typecheck commands with `-target …ios17.0` | recorded runs | **unchanged**: evidence |
| `scripts/harness/__tests__/fixtures/parse-swift/*.txt` headers | fixture provenance | **unchanged**: frozen fixtures |
| `canonical/profiles/consumer/confirmations/kenya.md` L300; `confirmations/core-goals.md` L45 | ledgers | **unchanged**; the seat acts add records above them |
| `docs/specs/049-nav-segmentedchoice-base/task-4-summary.md`; `docs/specs/129-consumer-generation-completeness/task-18-summary.md`, `task-3-summary.md` | spec summaries | **unchanged**: history |
| ballots `2026-10-02-integration-guide-native-scoping`, `2026-10-03-123-b-u3-install-guide`, `2026-10-18-true-native-development-is-not-true-native-design`, `2026-11-05-core-goals-android-minimum`, `2026-11-07-native-lane-ownership`, `2026-11-08-token-governance-theme-registry-as-shipped`; ballots README | history | **unchanged** |
| `.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**` | generated | regeneration |
| `tests/onboarding-trio/fixtures/born-{cc,kiro}/**` | frozen install-time copies | **unchanged** (the Android precedent § 6) |

At application the sweep is re-run on the changed tree. Any hit outside this table stops the PR.

**Android parity, declined with reason** (Data R1 § 2): Leonardo's product-choice sentence is not added to the `android:` pins comment. The schedule it guards against does not bind Android (system images download on demand), Android's upward pressure is androidx's declared floor, whose rule is already Data's record's item 2 (`.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`), and a comment edit there is no P1–P6 repair. Data's parity text, if Peter or a later ballot wants it, is in his R1 § 2. *Surviving counter*: a reader comparing the two pins sections sees the sentence on one only.

## 7. Census (README § "Conventions", "Instrument census")

- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site removes or adds a get_section or get_document_* citation; the lines carry dated pointers`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep — no instrument code change; between the authoring commit and the seat acts the sweep reports core-goals #core-project-context and kenya #ios-specific-guidance stale, which are § 4's owed acts, not a change of the instrument's verdict`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency) — no instrument code change; the seat acts are its inputs at application, checked by links 1–3`
- `**Census**: not in scope — the register rows citing core-goals.md lines (no-autonomous-token-creation, :55-59; no-hardcoded-color, :50/:53) — the edit replaces L28 with one line, so no cited line moves`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — Core Goals and the guide are in its scope; the new lines name no token and no CSS attribute`
- `**Census**: not in scope — lane-functional-root (npm run test:scripts: scripts/harness/__tests__/probe-swift.test.ts L392, L394, L408–L409, L419, L432) — the four assertions are the pin's mirror; they move with site 4 in Kenya's commit, from literals to a parse of Core Goals, with one known-bad case added; at the application head the verdict is green before and after, and a pin that differs from Core Goals is red as before` *(Stacy R1 § 2, the form adapted to Kenya's derivation)*
- `**Census**: not in scope — lane-functional-root (npm run test:agent-generator, consumer-profile.real.test.ts; npm run test:scripts, install-doc.test.ts) — sites 3 and 5 change ordinary inputs (overlays, a removal, the guide's lines with INSTALL regenerated); no rule they implement changes; read green at application after the seat acts and the regeneration` *(Stacy R1 § 2, verbatim)*
- **The iOS harness contexts** read `harness/pins.yaml`. They are not registered checks (no register row names them, Stacy VERIFIED), so no census line is owed. Their run at the application head is evidence site 4 requires.

## 8. Application (on ratification; one PR, Peter-merged)

1. Status commit (record-first), with `<ratification date>` filled.
2. Thurgood's authoring commit: site 1; site 2 byte for byte from Kenya's text; sites 3a–3c, **including re-grounding the two overlay pins**, which is authoring (the pin must equal the current `canonicalHash` at the re-sign; no `canonicalHash` field moves here).
3. Kenya's commit: site 4 (pins, `lane.ts` comment, the test), under this ballot's grants.
4. Thurgood's commit: site 5's guide lines with their pointers; INSTALL regenerated.
5. **Seat acts, part 1**: Stacy re-confirms `#core-project-context`; Kenya re-confirms `#ios-specific-guidance` (and rules `native-7`'s kind `obligation`).
6. **Regeneration** of the generated roots (`.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**`), committed; not the lock.
7. **Seat acts, part 2**, each printed on a clean tree after step 6: Stacy re-signs; Kenya re-signs. (Stacy R1 § 1: a re-sign's `renderedHash` is read over the committed consumer output.)
8. `canonical/generated.lock`, last (its place in the lock queue named in the brief).
9. The iOS harness contexts at the head; `122-diff-guard` green; `verify-signing-chain --audit --pr`; `edit-kind-pointers`; the § 6 sweep; the census re-read; `rebuild_index` after merge.

**Edit kinds**: `.kiro/steering/core-goals.md` — LAW (this ballot); `canonical/agents/kenya.md` — EXECUTION (§ 3, site 2); `governance/DesignerPunk-Integration-Guide.md` — EXECUTION (§ 5, site 5).

**Grants** (Peter's ratification names these files, or a grant record does before the application PR; the PR body cites them, so Stacy's ARMING read takes this ballot's route for the instrument paths):
- `.kiro/steering/core-goals.md`;
- `canonical/agents/kenya.md` L472, byte for byte from Kenya's text;
- `canonical/operative-sets/{core-goals,kenya}.yaml`; `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/kenya.overlay.md`;
- `harness/pins.yaml` (`ios.deploymentTarget` and the L34–L37 comment block only); `harness/ios/lane.ts` (the L158 comment only); `scripts/harness/__tests__/probe-swift.test.ts` (L392, L394, L408–L409, L419, L432 and one added known-bad case);
- `governance/DesignerPunk-Integration-Guide.md` L179 and L197; `docs/consumer/INSTALL.md` (regenerated);
- `canonical/generated.lock` and the generated roots.

**When**: before Spec 132's first support claim.

## 9. Forks for Peter (none is picked here)

- **F-1: does item D promise "the iOS minimum rises only in a major release"? — ANSWERED yes** (Peter, 2026-11-27T18:49:44Z, "Re: F-1, yes"), worded for both platforms in item D.
  - **Include** (Leonardo's lean): it is the one thing about the floor an adopter plans around, and Kenya R4 already reads a raise after the claim as breaking under semver; no ruling states it as a promise.
  - **Leave out**: item D states the gap and nothing more.
  - **The drafter leans include, written to cover both platforms in one sentence**, as Leonardo suggests.
  - *Surviving counter to include*: the promise binds DesignerPunk; if Apple's toolchain forces a raise mid-cycle (an Xcode that drops iOS 18), the choice is between breaking the promise and an unplanned major.
  - *Surviving counter to leave out*: adopters plan around the floor with no statement of when it can move.
- **F-2: Ada's escape hatch — a `Package.swift` without DesignerPunk's generated header is the adopter's; `generate` warns and does not restore. — ANSWERED yes** (Peter, 2026-11-27T18:49:44Z, "Re: F-2, yes"), in item B.
  - **Take it**: an adopter who must support older iPads can keep their own manifest, and is told it is unsupported every run.
  - **Leave it**: `generate` restores the floor in every case it writes `Package.swift`, and a headerless file is not written at all, with no warning.
  - **The drafter leans take it**: it is Ada's plan-R2 ownership rule (a file without the header is the adopter's), and it keeps the warning on the unsupported path.
  - *Surviving counter to take*: it goes beyond Peter's "restoring the floor", and gives every adopter a documented way out of it.
  - *Surviving counter to leave*: an adopter's own manifest below the floor gets no word from `generate`.
- **F-3: name the three iPads in the guide and the walkthrough? — OPEN, reframed by Peter** (18:49:44Z): "this is making me wonder if we should be naming deices at all and focus on the versions of the OS." A middle form is being checked with Leonardo and Kenya: state OS versions only, and point to Apple's own device-compatibility list. The options as first put:
  - **Name them, once** (Leonardo): in the guide's platform requirements and the walkthrough's "If not", checked first against Apple's published iPadOS 18 compatibility list and citing it, not the simulator data.
  - **Don't name them** (Kenya's lean): Apple's device-support lists are the authority, and DesignerPunk's copy would need upkeep.
  - **The drafter leans name them, on Leonardo's source condition**: the list never goes stale (a device that cannot run iPadOS 18 never will), and it is the floor's only device cost.
  - *Surviving counter to name*: a hardware claim DesignerPunk did not measure on hardware, which a reader may take as complete; if Apple's list differs, the guide is wrong in a way adopters act on.
  - *Surviving counter to not name*: an adopter who supports old iPads finds out from Apple's lists, after adopting.

## 10. Who was asked what

Kenya, Ada, Leonardo and Data (consult files `consults-2026-11-27/<seat>-ios-18-ballot.md`) and Stacy as required reviewer; their R1 entries are in § 12.

## 11. Counter-argument (fold-back applied), residual

**Recommendation**: site 1 as drafted; sites 2–5 at application under § 8's grants and order; items A–E owed by 132; F-1 include, F-2 take, F-3 name.

**Counter-arguments**:
- **(i) The ruling rested on an unverified device claim.** Three iPads are dropped.
- **(ii) (B)'s benefit is temporary.** When `macos-15` retires, the oldest free runtime is 26.x (Leonardo).
- **(iii) One PR carries a law line, a charter line, a pin, a test, two guide lines and four seat acts.**
- **(iv) Item A may have no route.** If Xcode 26.3 cannot run the 18.x simulators on `macos-15`, "tested on the oldest free runtime" has none, and item D's text arrives early (Kenya R1).

**Folded in**:
- From (i): the fact is stated first; Peter confirmed at 18:36:18Z; F-3 asks whether adopters are told.
- From (ii): site 4's comment and item D make the floor a product choice that does not follow the images.
- From (iii): Requirement 2.9 and the required test bind the pin and the test to site 1; the § 8 order is Stacy's, so each act reads a committed state.
- From (iv): item A's prerequisites start with a dispatched probe.

**What survives**:
1. Teams whose apps support the three iPads are shut out until DesignerPunk lowers the floor again.
2. The CI-on-18 benefit lasts about as long as `macos-15` does, and may need a second toolchain.
3. Until item A lands, the text reads "built for iOS 18.0, not run on 18", which is (A)'s gap at a higher number.
4. Until item E lands, five code defaults read `'17.0'`.

## 12. Review record

#### [KENYA R1]

**Read at**: `ballot/core-goals-ios-minimum-18` `d85b09a18` (draft #888), with `origin/main` `e03d3ae3f`. Read-only on the ballot branch. The evidence this answer cites is committed on #879's branch (`chore/132-ios-render-spike`) at `b35e1d041`: `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-18-floor-device-and-compile-evidence.md`. It is on a draft PR, so the ballot should cite it by that commit until #879 merges, or #879 should merge first. Labels: VERIFIED or UNVERIFIED.

**Two gaps first, because each one stops the application as drafted:**
- **G1: a test the census missed fails at site 1.**
  - `scripts/harness/__tests__/probe-swift.test.ts` L404–L410 reads `.kiro/steering/core-goals.md` and asserts `/iOS: 17\.0\+/`, then asserts `deploymentTarget` is `'17.0'`. L394 asserts `'17.0'` too (VERIFIED, read at `e03d3ae3f`).
  - Site 1 alone turns it red. The § 6 sweep's regex matches it (`deploymentTarget`), but § 6's table does not list it, and § 7 has no census line for it.
  - The file is in my write scope. The fix is under Q3.
- **G2: site 4 is not under my standing scope.**
  - My `harness/pins.yaml` scope covers only `ios:` repair moves that pass the lane-ownership ballot's P1–P7. Any other move "goes by grant or spec row" (`canonical/agents/kenya.md`, the native compile harness paragraph). A `deploymentTarget` move is not a P1–P7 repair.
  - So § 8's "Kenya's commit: site 4, under his standing scope" is wrong for `pins.yaml`.
  - § 8's grants list must name `harness/pins.yaml` (the `ios.deploymentTarget` line and the L32–L37 comment block). `harness/ios/lane.ts` and `scripts/harness/__tests__/probe-swift.test.ts` are in my write scope (`harness/ios/**`, the named test file). Their change follows spec text (Req 2.9: the target "equals" Core Goals), so they need no grant.

---

**1. Site 2's final text, and the kind of `native-7`.**
- **Final text** (`canonical/agents/kenya.md` L472), byte for byte:
  ```
  - iOS minimum version per Core Goals
  ```
  It is the same form as Data's L474 ("- Android minimum version per Core Goals", VERIFIED). The number then lives in Core Goals alone.
- **`native-7`'s kind: `obligation`.** I rule it so at my confirm act, the same as Data's `native-7` (VERIFIED: `canonical/operative-sets/data.yaml` L599–L602). The line binds me not to set or accept a deployment target below Core Goals' number, which makes it a duty, not a membership fact. The label and text are the line above.
- **Surviving counter**: the pointer form means a reader of my charter does not see the number without opening Core Goals. That is accepted, because it removes a second place the number can go stale.

**2. Site 4's comment text** (`harness/pins.yaml`).
- **The block to replace is L34–L37, not L34–L36.** Peter's 2026-11-05 citation sits on L37 and goes with it.
- **Replacement**, byte for byte:
  ```
  # or iOS an adopter may use. The one exception is `deploymentTarget`, which equals Core Goals' iOS
  # minimum (18.0): it is the compile target, so "uses nothing newer than 18.0" is compile evidence.
  # The minimum is a product choice, made in Core Goals and tested on the oldest iOS a free runner image
  # carries; it does not move when the runner images do. "Built for iOS 18.0, not run on 18" is the
  # wording rule until something runs on iOS 18 (ballot 2026-11-27-core-goals-ios-minimum-18;
  # Peter, 2026-11-27T18:32:45Z, "(B), raise to iOS 18").
  ```
- **L55**: `deploymentTarget: "18.0"`.
- **L53's `statement` and L54's comment are unchanged.** Neither names a number.
- **`harness/ios/lane.ts` L158**: `` /** `arm64-apple-ios18.0-simulator`. */ ``. Only the comment changes; the function reads the pin.
- **Surviving counter**: "tested on the oldest iOS a free runner image carries" is a promise that item A keeps, and A does not exist yet. Until it does, the wording rule's "not run on 18" is what is true, and the comment says so.

**3. Does an 18.0 target change any harness verdict? Not on my toolchain.** VERIFIED locally, Xcode 27.2. The evidence file's § 2 has the commands.
- **Token tier** (Swift 6, `DPHarnessTokens`): 0 errors and 0 warnings at both 17.0 and 18.0.
- **Component tier** (Swift 5, `DesignerPunk`, every non-test package `.swift` plus the consumer's tokens): 64 errors and 13 warnings at both targets. The `error:` and `warning:` sets, with line and column removed, are **identical** (`diff` prints nothing).
- **Deprecations**: 11 of the 13 warnings are `onChange(of:perform:)` "deprecated in iOS 17.0", present at both targets. No warning is new at 18.0, and the harness keys errors only (design K-2).
- **On the pinned Xcode 26.6**: UNVERIFIED. The iOS harness contexts at the application head are the check, as § 5 says.
- **The verdict that does change is G1's test**, not a compile.
  - **Proposed fix, in the application PR, my commit:** make the test derive the target from Core Goals instead of naming a number, so the next floor move needs no test edit.
    - L392's title drops "17.0" ("deployment target equals Core Goals' iOS minimum").
    - L394 is replaced by an equality with the Core Goals parse below.
    - L408–L409 become:
      ```ts
      const m = coreGoals.match(/^- iOS: (\d+\.\d+)\+/m);
      expect(m).not.toBeNull();
      expect(doc.ios.deploymentTarget).toBe(m![1]);
      ```
    - A known-bad case is added: a pins text with `deploymentTarget: "17.0"` against the 18.0 Core Goals must fail the equality.
  - That needs a § 7 census line: `**Census**: in scope — probe-swift.test.ts (Core Goals ↔ ios.deploymentTarget equality) — its literal becomes a parse of Core Goals; verdict unchanged at the application head, red on a mismatch`.

**4. Site 5's two guide lines** (`governance/DesignerPunk-Integration-Guide.md`). Only the numbers change. The claim "not run on any device or simulator" stays true: DesignerPunk's checks still run nothing.
- **L179 has two occurrences, and the ballot names only the first.** The full set of edits on L179:
  - "compiled for an iOS 17.0 deployment target" → "compiled for an iOS **18.0** deployment target";
  - "Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit)" → "Platform requirements, for reference: **iOS 18.0+** (SwiftUI, UIKit)".
  - The second occurrence feeds INSTALL L165 as well (derived). The § 6 table's "Carries" cell for L179 should name both occurrences.
- **L197**: "- iOS: the token files `generate` writes compile: compiled for an iOS **18.0** deployment target; not run on any device or simulator."
- **No support-boundary sentence here yet.** No generated `Package.swift` exists, so "lowering it is unsupported" has nothing to point at. That is item C, with 132's docs.
- **Naming the three iPads** is Leonardo's call. My lean is not to name them: Apple's device-support lists are the authority, and our copy would need upkeep.

**5. The device fact: confirmed as § 1 states it**, with its source now committed (VERIFIED).
- **Path**: `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-18-floor-device-and-compile-evidence.md`, at `b35e1d041` on `chore/132-ios-render-spike`.
- **Source**: CoreSimulator's device-type profiles, `minRuntimeVersion` / `maxRuntimeVersion` in each `profile.plist` under `/Library/Developer/CoreSimulator/Profiles/DeviceTypes`. Xcode 27.2 (27B52); `simctl` CoreSimulator-1174.21; macOS 27.2.1. The file holds the exact command and the full 89-row output.
- **Result**:
  - 52 iPhone and iPad device types run iOS 17.
  - 24 of them are iPhones, and none stops before 18. The Xs, Xs Max and Xʀ have `max` 18.99.
  - Three iPads stop at 17.99: iPad (6th generation), iPad Pro (10.5-inch) and iPad Pro (12.9-inch) (2nd generation).
- **§ 1's caveat is right and should stay**: this is Apple's simulator data, not a hardware list.

**6. Item A: is a release-time `macos-15` run on iOS 18.x the right shape? Yes as the goal; it has prerequisites, and one open fork.**
- **What the images carry** (READ, `actions/runner-images` readmes, 2026-11-27):
  - `macos-15` (image 20261118.0550.1) installs the iOS 18.5 and 18.6 simulators, with Xcode 16.x and 26.0.1–26.3.
  - `macos-26` (image 20261117.0516.1) installs only 26.x simulators, with Xcode 26.6 as default, which is the lane's pin.
- **The fork** (team-level, in 132's design round):
  - **(a) `macos-15` with its newest Xcode, 26.3, on its installed 18.6 simulator.** It is free and needs no download, but it uses a second toolchain, not the lane's 26.6. Whether Xcode 26.3 runs the 18.x simulators there is UNVERIFIED: both are installed, but I have not run them.
  - **(b) `macos-26` with the pinned 26.6, downloading an 18.x runtime on each run.** This uses the same toolchain as the lane. It costs a download of several gigabytes on each run, and whether Xcode 26.6 offers 18.x for download is UNVERIFIED. This Mac's Xcode 27.2 refused 17.5 (#886).
  - **My lean is (a)**, labelled as its own toolchain in the lane's printed output. Its counter is that a failure seen only there may be a 26.3-versus-26.6 difference, not an iOS 18 difference.
- **What it needs first:**
  1. Something to run: the D4 app, or at least #879's fixture as an interim.
  2. One dispatched probe that Xcode 26.3 on `macos-15` boots an 18.6 simulator and runs XCUITest.
  3. Its pins (image, Xcode, runtime) in a file outside `.github/**`, beside `harness/pins.yaml` (my T-15 lean).
  4. One issue-row grant for its workflow (README rule 8).
  5. Its result printed and pasted the way the harness does, so a claims pass can read it.
- **Timing**: run it once on the first family's unit PR, before the support claim, and then at each release.
- **The goal record's item 2**, the iOS 17 runtime probe, is superseded by item A. The § 6 table asks its owners to append a dated line. I will do that in the #880 close commit, which also records #886's archive (`d84b28d6a`).

**Surviving counter to the whole ballot (mine).** A floor of 18 that only a different toolchain tests on (item A's option (a)) is a better gap than "built for 17, never run on 17", but it is still a gap. If (a)'s probe shows that Xcode 26.3 cannot run the 18.x simulators on `macos-15`, then "tested on the oldest free runtime" has no route. The text then has to say "built for iOS 18.0; tested on iOS 26.x", which is item D's rule arriving early.

#### [ADA R1]

Read at `d85b09a18` (`ballot/core-goals-ios-minimum-18`, #888), in my own detached worktree, on base `main` `e03d3ae3f`. Nothing is committed or pushed. VERIFIED means checked by me at that head; REASONING is an inference; UNVERIFIED means nobody has checked it.

1. **Item B. Final position: restore and warn. Never refuse.**
   - **Restoring is not a separate rule. It follows from who owns the file.**
     - Under the manifest design I accepted in plan R2, `generate` owns our module's `Package.swift` outright and rewrites it on every run (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r2.md` L46–L70, VERIFIED, read).
     - So a lowered `platforms: [.iOS(...)]` in a file that carries our generated header is overwritten on the next run, like any other edit to a generated file.
   - **The floor is a support boundary, not formatting, so the overwrite is not silent.** On a run that finds the value below Core Goals' minimum, `generate` restores it, prints one warning and exits 0. Proposed text:
     > `Package.swift: platforms .iOS(<found>) is below DesignerPunk's iOS minimum (18.0); restored to .iOS(.v18). A lower minimum compiles but is unsupported. To keep your own value, take ownership of the file by removing its generated header; generate then stops writing it.`
   - **A file without our header is the adopter's** (my plan-R2 condition 1: story 3, an existing root manifest). `generate` does not write it.
     - **I revise my plan-R2 wording here**, "Otherwise it stops with a message". It should warn and carry on (exit 0), not fail. If that file's iOS platform is below the floor, the same warning says it is unsupported and that nothing was restored.
   - **Why not refuse**: refusing fails `generate`, and with it every adopter run, for a value that compiles.
     - Requirement 13.2's "SHALL NOT fail" covers non-conforming component-token custom values, not manifests, so it does not bind here.
     - Its stated reason does fit: "failing would break supported web consumers; a failure is held for a major, or goes to Peter under Q7". Warning and restoring keeps that posture. A refusal would be a new failure mode in the consumer's loop, and that is Peter's to rule.
   - **Why not warn only**: then an edit to a file `generate` owns would persist, and the next rewrite would revert it anyway for some other reason. That is the "quietly persist" case Leonardo R4 named.
   - **The value comes from one place.** The floor `generate` writes is the single generated value that item C names (`Package.swift`, D4's target, the guide, INSTALL and the walkthrough all read it), never a literal in the emitter.
   - **Surviving counter**:
     - An adopter who lowered the target on purpose, for example for the three iPads, loses the edit on every run until they read the warning and take ownership of the file.
     - Taking ownership moves the manifest's upkeep to them: source paths, the union's winners, a 128 package split.
     - So the supported path and the "I need 17" path stay far apart, which is what the floor means. The warning is the only mitigation.
   - **Where it lands**: 132's packaging unit, with the manifest itself (item B in the owed-acts record). It needs a test that lowers the platform, runs `generate`, and asserts that the value is restored, the warning text is printed and the exit status is 0. It also needs a second case: a headerless manifest is not written, and the warning is printed.
2. **`ConfigHelpers.ts`' five `'17.0'` defaults. Final position: change them with 132's packaging unit, under a tasks-row grant, reading the same single value. Not at this ballot's application, and not left alone.**
   - **The Android precedent is not "left alone".** That ballot left `ConfigHelpers`' Android defaults out of its application (`.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` L74, "Ada's call, 'design or tasks'"). They were then moved to the floor in a Spec 129 unit: #719 (`30e2f727b`, Task 9, `**Agent**: Ada`) changed `minSdkVersion` from 24 to 26, added the `< 26` validation, and moved the iOS defaults from `'15.0'` to `'17.0'` (VERIFIED, `git show 30e2f727b -- src/build/workflow/ConfigHelpers.ts`). The precedent is: **follow the floor, in a spec unit.**
   - **Why not at this ballot's application**:
     - `src/build/**` is outside my standing write scope. #719 changed it under 129's tasks-row grant.
     - The application PR's cap is law, profile, pin and guide lines.
     - No reader is misled in the meantime. `ConfigHelpers` is not in the package's public surface: `@3fn/core/build` maps to `dist/build/tokens/index.*` (VERIFIED, root `package.json` `exports["./build"]`), and `src/cli` does not import it (VERIFIED, grep). It is internal build-orchestration code, reached only through `src/build/index.ts` and the workflow's own tests.
   - **Why not leave it**: a literal `'17.0'` five times over is how the floor drifts. #719 had to move it once already. Two changes are owed:
     - **The defaults read the one value** that item C creates. One constant feeds `generate`'s `Package.swift`, these defaults and the harness pin's check (Req 2.9 makes the pin equal the floor), so the next floor change is one line.
     - **An iOS validation floor matching Android's.** `validateiOSOptions` checks only that `minimumDeploymentTarget` is present (`ConfigHelpers.ts` L772–L773; `BuildOrchestrator.ts` L599–L600). Android refuses `< 26` (L791–L792). At 18 the iOS validator would accept `'17.0'` without a word. The new check refuses a target below the single value, naming Core Goals, as the Android one does.
   - **Where it is recorded**: the owed-acts record (`.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, Thurgood's) should gain an **item E**, so 132's requirements gate takes it in:
     > "E. `src/build/workflow/ConfigHelpers.ts`' iOS defaults (L436, L578, L614, L690, L721) and an iOS validation floor read the single minimum value of item C (Ada; a 132 tasks-row grant over `src/build/workflow/ConfigHelpers.ts`, `src/build/BuildOrchestrator.ts` and their tests), matching the Android validation at L791–L792."
   - The § 6 table's `ConfigHelpers` row then reads "**owed by 132 (item E)**" instead of "not touched here".
   - **Surviving counter**:
     - Between ratification and 132's packaging unit, the repository holds five `'17.0'` defaults that contradict Core Goals. They are unread by any consumer path, but an agent reading the code sees a floor that is not the law.
     - Changing the literals at application, outside the cap and under a grant, would close that window at the cost of a wider PR. I prefer one source of truth to a second literal edit, so I hold "with 132".

**Consulted**: none needed. This is a review entry.

*Signed: Ada, 2026-11-27.*

#### [LEONARDO R1]

**Read at**: `origin/ballot/core-goals-ios-minimum-18` @ `d85b09a18` (base `e03d3ae3f`), in a scratchpad worktree. Guide lines read at `e03d3ae3f`. Read-only. **A correction first**: my R4 "probably shuts out no device" was wrong. Kenya's device fact (§ 1) corrects it, and I write against that fact.

**1. Site 5 and item C: does the text say "support boundary, not capability limit" where an adopter meets it? Not yet. Site 5 changes a number. Item C says it in the docs, but not in the one place an adopter can lower the floor.**
- **What site 5 changes** (VERIFIED at `e03d3ae3f`): L179 carries two 17.0s. One is the harness's ("compiled for an iOS 17.0 deployment target; not run on any device or simulator"). The other is the adopter's floor ("Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit)"). L197 carries only the harness's. Changing the numbers keeps both true. Neither says what the floor means.
- **Where an adopter meets the floor**, in order:
  - (a) the guide's platform requirements, when deciding to adopt;
  - (b) the generated `Package.swift`, when their own target is lower;
  - (c) Xcode's resolution error, which we cannot reword;
  - (d) the walkthrough's "You'll need" and "If not".
- **Wording I would sign:**
  - **L179, the requirements clause** (in place of "Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit)."):
    > Platform requirements: **iOS and iPadOS 18.0+** (SwiftUI, UIKit). This is a support boundary, not a capability limit: the components use no iOS 18-only API, but DesignerPunk does not test or support them on earlier versions. Every iPhone that runs iOS 17 also runs iOS 18; three iPads do not (iPad 6th generation, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd generation), so an app that supports them cannot use these components.
  - **L179's harness clause and L197**: "compiled for an iOS 18.0 deployment target; not run on any device or simulator". Only the number changes. "Not run" stays true until item A lands, and then item C's tested-on text replaces it.
  - **Add to item B, the generated `Package.swift`** (it does not exist yet; this is 132's), one comment above `platforms:`. It is the only place an adopter can lower the floor, so it is where the sentence matters most. The wording depends on Ada's answer:
    - if `generate` rewrites: `// DesignerPunk supports iOS and iPadOS 18.0 and later. A lower value still compiles, but it is unsupported, and the next \`npx designerpunk generate\` sets it back.`
    - if it warns: the same first two clauses, then `\`npx designerpunk generate\` reports it.`
  - **Item C's sentence** ("lowering the minimum in the generated `Package.swift` compiles but is unsupported") stands for the guide and walkthrough. The walkthrough's "If not" names the three iPads in one clause, beside the resolution error.
- **Surviving counter**: "support boundary, not capability limit" also tells an adopter that lowering the floor works. Some will lower it anyway. The sentence is honest about that. It does not stop it, and only Ada's item B can.

**2. The three dropped iPads: name them, once, in the guide's platform requirements and the walkthrough's "If not". Not in Core Goals, not in charters.**
- **Why**: they are the floor's only device cost. An adopter who supports old iPads otherwise has to find out from Apple's lists, after adopting. The list also never goes stale. A device that cannot run iPadOS 18 never will, so the sentence stays true at any later floor of 18 or higher.
- **Also say "iOS and iPadOS"**. `.iOS(.v18)` covers iPad, but iPad teams read "iPadOS", and the dropped devices are all iPads.
- **Source condition**: the fact comes from Xcode's simulator device data, "not a hardware list" (§ 1). Before the line ships, Kenya should check it against Apple's published iPadOS 18 compatibility list, and the line should cite that list, not the simulator data. UNVERIFIED by me.
- **Surviving counter**: naming devices puts a hardware claim in our docs that we did not measure on hardware, and a reader may take it as complete. "Three iPads do not" is a closed claim. If Apple's list differs, the guide is wrong in a way adopters act on, so the source condition above is required, not optional.

**3. The "product choice, not GitHub's schedule" sentence: rightly placed for maintainers (the pins comment, site 4, and item D). An adopter does not need it. An adopter needs its consequence.**
- **Why not adopter-facing**: our runner images are our concern. An adopter asked "why 18?" is answered by item 1's "support boundary" sentence.
- **What an adopter does need**: a stability promise, "the iOS minimum rises only in a major release". Kenya R4 says a raise after the claim is breaking under semver, but no ruling states it as a promise, and this ballot's cap does not either.
  - **It is Peter's** (P-7's territory): add it to item D as a sentence for 132's docs, or leave it out.
  - My lean is to include it. It is the one thing about the floor an adopter plans around.
- **Data's question** (does the Android pins comment carry the same sentence) is his. The adopter promise, if Peter takes it, should cover both platforms in one sentence.
- **Surviving counter**: a "major only" promise binds us. If Apple's toolchain ever forces a raise mid-cycle (an Xcode that drops iOS 18 support, say), we would have to choose between breaking the promise and cutting an unplanned major. A promise we may be made to break is worse than none. That is why it is Peter's.

**For Peter**: (a) whether the adopter-facing "the iOS minimum rises only in a major release" goes into item D. Nothing else from me. Wording for site 5 and item B is above, for Thurgood and Ada.

*Leonardo, 2026-11-27.*

#### [DATA R1]

**Read at**: `d85b09a180bfb1fd007e954bd0f8dee9c84dac90` (`ballot/core-goals-ios-minimum-18`, draft #888), in my own detached scratchpad worktree, read-only. **Labels**: **VERIFIED**, I ran or read it myself at that head; **REASONING**, an inference; **UNVERIFIED**, nobody checked it.

**1. Does anything shared between the lanes need a matching Android change? Final position: no. One shared record needs its iOS line placed by the close of #880, not appended later.**
- **`scripts/harness/consumer.ts`: nothing.** It carries no floor and no deployment target. Its `ios` and `android` references are the output folders only (L94–L118, L250–L264, L301–L314, L518–L554; VERIFIED by `grep -n -E "17\.0|deploymentTarget|ios"`).
- **`harness/pins.yaml`'s top level: nothing.**
  - The header (L1–L8) and the `consumer:` section carry no floor.
  - The header's "These are HARNESS pins, not platform minimums (Req 2.9)" already has one exception per platform: `ios.deploymentTarget` and `android.minSdk` each equal Core Goals' number. My `android:` comment says so: "Equal to Core Goals' Android minimum (API 26, …)" (VERIFIED).
  - The iOS move changes neither the rule nor the Android exception.
- **The Android lane and the comparator read no iOS target**: `grep` for `deploymentTarget|minSdk|17\.0` in `harness/android/lane.ts`, `scripts/harness/compare.ts` and `native-rules.ts` finds nothing (VERIFIED).
- **The Android wording rule: unchanged, and still true.**
  - The Integration Guide's Android lines, L183 and L200 ("compiled for Android API 26 (`minSdk`); not run on any device or emulator"), and the shared L202 ("They do not link an app, run tests, or run anything on a device, simulator or emulator") describe DesignerPunk's checks.
  - My render probe (#884) ran an emulator, but it is a dispatch-only workflow on a toy module, not one of those checks. So the lines stay true.
  - Site 5 should edit L179 and L197 only. Leave L183, L200 and L202 as they are.
- **`ConfigHelpers.ts`**: its Android defaults are already `minSdkVersion: 26` (L583, L639, L695, L726; VERIFIED), equal to Core Goals.
  - Its `kotlinVersion: '1.9.0'` and `targetSdkVersion: 34` (L446) are range questions, held by my record `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`.
  - The iOS `'17.0'` defaults are Ada's question, as the ballot says. Nothing on Android moves with them.
- **The one shared place that needs care: the native distribution charter** (`.kiro/issues/2026-09-26-native-component-distribution.md`, co-owned by Kenya and me).
  - The ballot's § 6 row says its owners append a dated line in the application window, saying the iOS 17 runtime probe is superseded by item A.
  - **But #880's merge archives that record**, and an archived record is never edited again (README rule 2). If #880 merges before this ballot's application, the line cannot be appended.
  - **Proposed fix for § 6's row**: "its owners record the supersession in the charter's closing outcome line on #880, which must say where each item lives, or in a dated line if the application merges first". Kenya writes it, since the iOS items in the charter are signed by Kenya (rule 9); I co-sign the close.
  - **Surviving counter**: this ties the ballot's application to #880's timing. That costs nothing if the close line names the ballot as the supersession's authority, whichever lands first.

**2. Should the Android pins comment carry Leonardo's "product choice, not the images' schedule" sentence? Final position: not as written, and not in this ballot. If parity is wanted, Android needs a different sentence, because its pressure is different.**
- **The schedule Leonardo's sentence guards against does not bind Android.** The free runner does not ship Android system images; they are downloaded on demand. My render probe downloaded the API 26 AOSP image in 20 s and booted it in 35 s on `ubuntu-24.04` `20261122.23.1` (VERIFIED, #884, run 46040355947). No image retirement pushes the Android floor up.
- **Android's real upward pressure is androidx's floor.** Today Compose under BOM 2026.09.00 declares `minSdkVersion="23"` (VERIFIED in my 129 design inbound, measured 2026-11-04). The rule ballot `2026-11-05-core-goals-android-minimum` F-1 (iii) set is that the shipped module's `minSdk` equals Core Goals' number and is at least the libraries' floor, tested in 132's module (my record, item 2).
- **So the sentence that would give Android parity is**, if the drafter or Peter wants one (my text, for the `android:` comment above `minSdk`):
  > The minimum is a product choice (Peter, "Re: 5, 26"). It moves only by a Core Goals ballot, never because a library's floor rises: if androidx's declared floor rises above it, Spec 132's floor test fails first, and the choice goes to Peter.
- **Why not in this ballot**:
  - The cap is iOS: "one law line, one charter line, the profile lines, one pin, two guide lines".
  - The `android:` section is mine, but only for repair moves under P1–P6 (ballot `2026-11-07-native-lane-ownership` item 3). A comment edit is no repair, so it would need its path in this ballot's grant list, or a separate small PR under a grant.
  - The sentence's rule is already held, as an obligation, by my record's item 2. Adding it to the pin file would be a second copy.
- **Surviving counter-argument**: the asymmetry is visible. A reader comparing the `ios:` and `android:` sections sees a product-choice sentence on one and not the other, and may infer that the Android floor follows something else. If Thurgood or Peter weigh that above the cap, the sentence above is the text, and its path joins § 8's grant list.

*Signed: Data, 2026-11-27.*

#### [STACY R1]

*I read `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md` and `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` at `d85b09a18` (`ballot/core-goals-ios-minimum-18`, draft #888), against its base `e03d3ae3f`, in a detached worktree of my own, on 2026-11-27. This is read-only and I committed nothing. VERIFIED means I checked it at `e03d3ae3f`, or at the head, with the command named. UNVERIFIED means I did not check it. Under F12′ any text I give is for Thurgood to apply.*

**Verdict: site 1 is sound, and Peter's two answers are recorded as direction, not ratification.**
- **Not ready to apply as drafted, for three reasons, each found by a check:**
  1. site 4 breaks a required test that the sweep missed;
  2. site 4 is not under Kenya's standing scope, so the ballot's grants must name it;
  3. my re-sign as sequenced would be judged against a rendering that has not been committed yet.
- **Smaller points**: two census lines are missing, site 5 owes a dated pointer, and one sweep row is misfiled.

**1. The seat-act sequence (§ 4, § 8), against my acts on `#core-project-context` and Kenya's on `#ios-specific-guidance`.**
- **The objects are right.** VERIFIED:
  - I confirm `#core-project-context` (`confirmations/core-goals.md` L37–L40, `confirmer: stacy`) and sign its row (`signatures/core-goals.md` L7–L9; `always-set/core-goals.dispositions.yaml` L8, `signer: stacy`).
  - Kenya signs `kenya.dispositions.yaml#ios-specific-guidance` (L31, `signer: kenya`). Its one removal, "the stale `dist/*.ios.swift` snapshots", quotes text outside the hunk and stands.
- **The removal's form matches the Android precedent.** VERIFIED: the existing removal is `" *(Amended 2026-11-05 by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*"`, with a leading space and `subtraction-2`. The new one is that form, and it is a verbatim substring of site 1's After.
- **The order is wrong for both re-signs** (the signing-seat brief, S14).
  - `#core-project-context` and `#ios-specific-guidance` are `re-pointed` rows: they render. A re-sign's `renderedHash` is read over the committed `canonical/_consumer-output/`.
  - § 8 puts the seat acts (step 5) before the regeneration (step 6). A re-sign whose staleness sits in an uncommitted regeneration fails `--ci` link 1.
  - The re-confirms read the canonical unit only, so they can come early.
  - **Change** to § 8 steps 5 and 6:
    > "5. Seat acts, part 1: Stacy re-confirms `#core-project-context`; Kenya re-confirms `#ios-specific-guidance`. 6. Regeneration of the generated roots (`.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md`, `canonical/_consumer-output/**`), committed; not the lock. 7. Seat acts, part 2, each printed on a clean tree after step 6: Stacy re-signs; Kenya re-signs. 8. `canonical/generated.lock`."
  - The later steps renumber.
- **Who moves the overlay pin.** Site 3c's "its unit pin re-grounds" is the profile author's, in the authoring commit. At my re-sign the pin must equal the current `canonicalHash`, or I stop (S4). Say so in step 2, so the authoring commit is not read as moving a hash it must not move. The pin is authoring; the `canonicalHash` fields are the acts.

**2. The census lines (§ 7).**
- **The five lines given hold.** The L28 edit replaces one line with one line, so the line-cited register rows don't shift (VERIFIED, `core-goals.md` L26–L30). No register row names an iOS harness context (VERIFIED, `grep -c 'harness-ios\|harness-android' governance/classification-map.md` prints 0), so the "iOS contexts owe none" reading holds.
- **Two lines are missing.** Both are owed because `lane-functional-root` is a registered, armed check (the 125-A required-check set) whose command loads files these sites edit (condition 1):
  1. **`npm run test:scripts` loads `harness/pins.yaml`, and its verdict changes.**
     - VERIFIED: `scripts/harness/__tests__/probe-swift.test.ts` L73 reads the real `harness/pins.yaml`. L394 and L409 assert `deploymentTarget` is `'17.0'`, L419 asserts `arm64-apple-ios17.0-simulator`, and L432 asserts the `-target … ios17.0` line.
     - Site 4 turns all four red, and that is a required context. So it is not a not-in-scope case: the test's expectations are an instrument change that follows site 4.
     - **Owed**: those four lines become site 4's, as Kenya's (the file is in his `writeScope`, VERIFIED, `canonical/agents/kenya.md`), with a census line naming the change:
       > `**Census**: not in scope — lane-functional-root (npm run test:scripts: scripts/harness/__tests__/probe-swift.test.ts L394, L409, L419, L432) — the four assertions are the pin's mirror and move with it, 17.0 to 18.0, in site 4's commit; no other assertion or rule changes`
     - Or a real census, if Thurgood reads the assertion edit as an instrument change. The line's form is his call. Its absence would stop the application at its first CI run.
  2. **The consumer-profile and install-doc tests load the profile and guide files.** Same form as records-home:
     > `**Census**: not in scope — lane-functional-root (npm run test:agent-generator, consumer-profile.real.test.ts; npm run test:scripts, install-doc.test.ts) — sites 3 and 5 change ordinary inputs (overlays, a removal, the guide's two lines with INSTALL regenerated); no rule they implement changes; read green at application after the seat acts and the regeneration`

**3. The § 6 sweep and its dispositions.** VERIFIED by re-running the ballot's own grep at `e03d3ae3f`: 60 files.
- **Missed, and blocking**: `scripts/harness/__tests__/probe-swift.test.ts` (4 assertions, as above). It belongs in site 4, not in "unchanged".
- **Missed, unchanged, should be listed** (each states API availability, true at any floor of 17 or above):
  - `src/build/platforms/iOSMotionTokenFormatter.ts` L73 (an emitted comment, "CustomAnimation (iOS 17+)");
  - `src/components/core/Nav-TabBar-Base/Nav-TabBar-Base.schema.yaml` L164 ("UnitCurve (iOS 17+)");
  - `.kiro/issues/ios-readonly-focusable-prototype.md` L18 (`.focusable(interactions:)` "(iOS 17+)").
  - Also unchanged: `docs/specs/049-…/task-4-summary.md` and `docs/specs/129-…/task-18-summary.md` (summaries are history), and the ballots the table summarises as "others" (`2026-10-03-123-b-u3-install-guide`, `2026-10-18-true-native-…`, `2026-11-08-token-governance-theme-registry-as-shipped`, ballots README). The table's "Any hit outside this table stops the PR" would otherwise stop on them.
- **`harness/ios/lane.ts`**: four hits. Only L158's comment changes; L91, L136 and L160 read the pin. Correct as filed.
- **Misfiled, the 132 outline row**: "`.kiro/specs/132-…/design-outline.md` L32, L48, L52 → 132's formalizer, at 132's requirements round". #880 is still open in its outline round, and P-6 is now answered. So the outline records the answer in this round, on #880, as Peter's other answers are recorded. Waiting for requirements would leave a merged outline stating a question as open that Peter has answered.
- **A timing gap, the goal record row**: `.kiro/issues/2026-09-26-native-component-distribution.md` closes and archives at #880's merge (precondition 3), and an archived record takes no further edit (README rule 2). Its owners' dated line ("the iOS 17 probe is superseded by item A") must land before #880 merges, or it goes in #880's close outcome line. "In the application window" does not guarantee that order.

**4. Is the rule-10 record the right home for Peter's (B) parts 2–4, with that Trigger? Yes.**
- Peter's ruling creates owed acts with named seats (A Kenya, B Ada, C and D 132's docs units). Rule 10 files them in the ballot's PR. `path:.kiro/specs/132-native-components-in-app/requirements.md` puts them in front of 132's requirements gate, where they are taken in or left with a reason (VERIFIED, record header). That is right for work that must land before the first support claim, and the exact path fires on 132's root `requirements.md` alone.
- `P2 obligation (record) · owed-act` fits: no reader is misled before a claim exists.
- **One wording point**: item D ("the floor does not follow the runner images' schedule") is a rule, not an act. Its home as a rule is site 4's pins comment (Leonardo's sentence in Kenya's words) and 132's docs. The record's item D is then the owed docs text that states the gap, which is how § 6 D reads it. The record's one-line item D should say "docs state the gap …" so it reads as an act.

**5. Sites 4 and 5 as EXECUTION in site 1's PR: do the edit kinds hold?**
- **Site 1**: `.kiro/steering/**`, LAW. Site 2: `canonical/agents/**`, EXECUTION of this ballot, no pointer (charters carry none). Site 3's files are not governance paths. All hold.
- **Site 5 (`governance/DesignerPunk-Integration-Guide.md` L179, L197): EXECUTION holds, because the ballot names the edit. But it owes a dated pointer**, which the ballot omits. VERIFIED: ballots README § "Conventions", "Where the pointer is owed": "on exactly `governance/**`, `.kiro/steering/**` …". Without it, `edit-kind-pointers.ts` reads `pointer-missing`. **Change**: site 5 gains "Pointer: `*(amended <application date> by ballot 2026-11-27-core-goals-ios-minimum-18, site 5; prior text at `e03d3ae3f`)*` after each changed line", and INSTALL derives it.
- **Site 4 is not under Kenya's standing scope**, so "Kenya's commit: site 4, under his standing scope" (§ 8 step 3) is wrong.
  - VERIFIED: Kenya's `writeScope` grants `harness/pins.yaml` "the ios: section only, under P1–P7" (`canonical/agents/kenya.md`, the `writeScope` comment). Ballot `2026-11-07-native-lane-ownership`'s P2 requires that `ios.deploymentTarget` be "unchanged by construction" (L140).
  - So a deployment-target move fails P2. That is my ARMING read of an instrument path, which selects P1–P6 unless "a `tasks.md` row … or an issue-row grant … lists the path and the PR body cites it".
  - **Owed**: § 8's grants list gains `harness/pins.yaml` (`ios.deploymentTarget` and the L34–L36 comments), `harness/ios/lane.ts` L158 (comment only) and `scripts/harness/__tests__/probe-swift.test.ts` L394, L409, L419 and L432. The application PR body cites them, so the ARMING read takes this ballot's route, not P1–P6.
  - That test file also sits under my instrument-path limb's deletions-zero rule. The PR body names it and its amendment (this ballot), and the four changed lines are quoted.
  - If an 18.0 target moves any `harness/expected/*.tsv` entry (Kenya's question 3), that file joins the list too, or P4 fails.
- **Edit kind for the application PR**: `.kiro/steering/core-goals.md` LAW; `canonical/agents/kenya.md` EXECUTION (§ 3 site 2); `governance/DesignerPunk-Integration-Guide.md` EXECUTION (§ 5 site 5). Correct, once site 5's pointer is added.

**Smaller**: site 1's pointer says "item 1" while the ballot's sections say "Site 1". This follows the Android precedent's wording, and `edit-kind-pointers` reads the pointer's presence, not its item name, so I note it only.

**Points for Peter**: none new. The device fact is stated first and his 18:36:18Z confirmation is recorded. Every point above is application mechanics for Thurgood and Kenya.

**Standards implications**: none.

#### [THURGOOD R2]

*2026-11-27T18:43:15Z (`date -u`).* Five R1 entries spliced byte for byte. Folded:
- **Blocking (Kenya G1, Stacy § 2)**: `probe-swift.test.ts`'s four `17.0` assertions join site 4 as Kenya's commit, derived from Core Goals, with a known-bad case and a census line.
- **Blocking (Kenya G2, Stacy § 5)**: site 4 is not under Kenya's standing scope (P2); § 8's grants name `harness/pins.yaml` (`deploymentTarget` and L34–L37), the `lane.ts` L158 comment and the test file, with Kenya's text byte for byte.
- **Stacy § 1**: § 8 re-sequenced, re-confirms, then committed regeneration, then re-signs, then the lock; overlay pins are authoring in step 2.
- **Stacy, smaller**: two `lane-functional-root` census lines; three API-availability hits, the spec summaries and the other ballots listed as unchanged; site 5's dated pointer; item D worded as an owed act; the 132 outline row recorded on #880 now.
- **Data**: Android needs nothing; site 5 is L179/L197 only; the goal record's supersession goes in its closing outcome line on #880 (Kenya writes, Data co-signs); his parity sentence for Android is declined with reason (§ 6).
- **Ada**: item E (`ConfigHelpers` in 132's packaging unit, reading the single minimum, with an iOS validation floor); item B is restore **and** warn, never refuse, with her warning text. Her escape hatch is F-2.
- **Leonardo**: the guide's requirements clause ("iOS and iPadOS 18.0+ … a support boundary, not a capability limit") in site 5; the generated `Package.swift` comment in item B; the major-release promise is F-1; naming the iPads is F-3.
- **Mine**: a sweep row for #886's archived record; the interim sentence (129's wording stays until ratification); item A shares T-15's per-lane grant, with Kenya's runner fork left to 132's planning; Kenya's evidence cited at `b35e1d041` on #879.

#### [PETER] F-1, F-2, F-3 (2026-11-27; recorded by Thurgood)
- **His words**, verbatim, received 2026-11-27T18:49:44Z (the orchestrator's `date -u` at receipt; relayed by the orchestrator): **"Re: F-1, yes. Re: F-2, yes. Re-F-3, this is making me wonder if we should be naming deices at all and focus on the versions of the OS. Honest thoughts?"**
- **What it decides**: F-1 yes (the major-release promise, both platforms, in item D); F-2 yes (Ada's escape hatch, in item B).
- **What is still open**: F-3, reframed toward OS versions only; ratification.
