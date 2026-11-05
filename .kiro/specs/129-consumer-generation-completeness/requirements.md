# Requirements Document: 129 — Consumer-Generation Completeness

**Date**: 2026-11-05
**Spec**: 129 - Consumer-Generation Completeness
**Status**: Requirements Phase — **R2**, the seven R1 entries folded in (`feedback/requirements.md`, `[THURGOOD R2]`). D1's probe sentence is amended by Peter's answer of 2026-11-05T05:14:42Z (Requirement 2.7). Design starts after this file merges (Spec-Feedback-Protocol § "Sequential Formalization Gate").
**Amended in the design round (2026-11-05)**: Requirements 2.6, 3.8 and 4.2, each with a dated line in place (`design.md` § 15).
**Amended in the tasks round (2026-11-05)**: Requirement 10.1, with a dated line in place (Ada R1); Requirement 2's "Records" line corrected (Kenya and Data R1).
**Author**: Thurgood (formalizer). Owners: Ada (pipeline, generators, validators), Lina (component tier). Harness designers: Kenya (iOS), Data (Android). Peter decides at each gate.
**Go**: Peter, received 2026-11-05T04:34:05Z, verbatim: "652, 653 and 654 are merged; go for requirements".
**Dependencies**: Spec 094 (the theme emission code that item (i) wires); Spec 123 (its Requirement 1.5 is reopened here, and its Requirement 3.1 rule that proof runs on a packed install applies); Spec 132 (planned, no directory yet: it receives what 129 does not close, `evidence/2026-11-05-native-plan/plan-r2.md` § 2); Specs 128 and 130 inherit item (i) and the harness (design-outline.md § 1, "Relation to other specs").
**Facts**: `evidence/facts-at-45f5262ee.md`, the unedited stdout of `bash .kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 4d10202b2 45f5262eeebfb3bbb2efa6d0b64df1790451237b`. Each record's Class and Trigger are in its row 3; E2's grep is its row 7. They are not restated here.

---

## Introduction

The principle and scope items (i)–(vi) are the charter's, `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` § "The principle (Peter's choice)" and § "Scope", and are not restated.

**Acceptance.** The charter's acceptance sentence at `b841db957` (#652), verbatim:

> **A stranger's `init` → `generate` yields their own token output, the component tier included, that compiles and is themed on all three platforms, with nothing copied from `node_modules`. DesignerPunk's native component source compiles against it in place from a packed install, except for pinned errors, each tagged to an open record and none tagged to a 129 row.**

- Peter narrowed it with "B (a)", received 2026-11-05T04:07:43Z (`evidence/2026-11-05-native-plan/peter-2026-11-05.md`). His original sentence moved word for word into the distribution charter as Spec 132's acceptance (`.kiro/issues/2026-09-26-native-component-distribution.md` at `c65bbeb86`, #653). The plan's approval merged as #654 (`45f5262ee`).
- **Stacy's handoff condition 1 is met**, checked by command in her R1: the narrowing is on `main` (#652, #654) before this file merges.

**129's part of done** is rows D1, D2 and D3 of `evidence/2026-11-05-native-plan/plan-r2.md` § 1 at `b89163c41` (Peter, "C yes"). Requirement 1 carries them. Rows D4–D10 are Spec 132's.

**How each requirement is written.** Each says what 129 delivers and how it is accepted. Each names its **instrument** and the **CI context where its run is recorded on the unit PR** (design-outline.md § 4, "Acceptance and its instrument"). A run on a seat's machine is a report a claims pass cannot re-check. Where a criterion can only be decided by reading, it says so ("a reading").

**Conventions.**
- Records are under `.kiro/issues/` and are named by file name. "Row N" is design-outline.md § 3's row number.
- **Harness contexts** (Q5's answer, design-outline.md § 5.1): `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens`, `harness-android-components`. The job that runs `generate` once and hands its output to them is `harness-generate` (Thurgood R4); the tasks round confirms its name.
- **Existing contexts**: `lane-functional-root` (the root Jest suite, which also runs `npm run test:pack-contents`), `Consumer Guard` (the packed-install flow in `tests/consumer-integration.test.ts`), `lane-typecheck`.
- **"Accepted at a unit PR"** means the named context's conclusion at the head the unit merged, cited by run URL in the carrying parent's completion doc (Requirement 2.13).
- **"Can fire"**: a record's Trigger can fire when its token is `path:`, `merge:#<N>` with N open, `tag:` or `release:` (README rule 1), not `manual`, and `scripts/issues-owned.sh` prints no `FIRED@` line for it.
- Criteria numbers are kept stable across rounds; a criterion removed in a round says so in place.

---

## Requirements

### Requirement 1: Acceptance and 129's part of done

**Owner**: Thurgood (the criteria). Stacy verifies at CLOSEOUT under her charter. A change to a D row is Peter's.

**User Story**: As Peter, I want 129's "done" to be something CI and git confirm, not something an agent says, so that 129's CLOSEOUT cannot read green against a sentence written to be achievable.

**Instrument**: D1, `harness-ios-tokens` and `harness-android-tokens`. D2, the set-equality check in `harness-generate`, with its completeness half (Requirement 5.10). D3, `harness-ios-components` and `harness-android-components`. Web, `Consumer Guard`.

#### Acceptance Criteria

1. The acceptance of Spec 129 SHALL be the charter's acceptance sentence at `b841db957`, and the quotation in this file's Introduction SHALL equal it byte for byte.
2. WHEN 129's final unit merges THEN `harness-ios-tokens` and `harness-android-tokens` SHALL conclude success at that head with zero entries on their expected-failure lists (D1).
3. WHEN 129's final unit merges THEN the D2 check SHALL conclude success at that head for iOS and Android: every component token in the consumer's merged index (`token-index/components.yaml`) appears in its generated output, and no component token outside the index does (D2). Because `generate` writes both sides, D2 is a consistency check; Requirement 5.10 is its completeness half.
4. WHEN 129's final unit merges THEN `harness-ios-components` and `harness-android-components` SHALL conclude success at that head, AND every entry still on their lists SHALL be tagged to an open root record whose Trigger can fire (Conventions), AND no entry SHALL be tagged to row 12, row 14's items A5, A6 (its ripple part) or A7, row 15 or row 16 (D3; plan-r2 § 6 item 4; Stacy condition 3).
5. The component-tier entries 129 does not close SHALL be tagged to one record that Lina files from the harness's first committed run (plan-r2 § 6 item 7), whose Trigger can fire, and that record SHALL be at the issues root before 129's CLOSEOUT. Its size is taken at the first run after rows 4 and 6 land, when masked errors show (Lina R1).
6. On web, "compiles" SHALL mean `Consumer Guard` concluding success at the final unit's head (charter § "Acceptance"), AND `Consumer Guard` SHALL assert, on the packed install's generated web CSS, that every custom property a `var()` references is defined in the generated web CSS files, with a pinned allowlist for properties set at run time (Sparky R1 item 1). This name check is the only web check behind "the component tier included"; it proves no rendering.
7. On iOS and Android, "themed" SHALL be accepted as compile evidence only: the emitted theme types exist, and the components' theme reads resolve against them, under the D1 and D3 contexts. 129 SHALL NOT claim runtime theme switching; that is Spec 132's D5. The second sentence is a reading of shipped text at RELEASE and CLOSEOUT (Stacy R1).
8. "With nothing copied from `node_modules`" SHALL be accepted by the harness reading the consumer's output in place from a packed install (Requirement 2.1).
9. IF a D1, D2 or D3 row is to change THEN Peter's dated words approving the change SHALL be on the record before the change merges, AND this file SHALL cite the row at its new SHA (Stacy condition 2).

---

### Requirement 2: The compile harness

**Owners**: Kenya (iOS lanes), Data (Android lanes), Ada (the packed-install driver), Thurgood (the comparator and the workflow wiring). Ada and Lina are the verified parties.

**User Story**: As a claims verifier, I want every iOS and Android "compiles" in 129 to rest on a CI run at a merge SHA, so that no native row is accepted on a reading.

**Records**: row 23, `2026-09-17-platform-build-verification-harness-candidate.md` (its Trigger stays at `tasks.md`; Kenya and Data re-rule it to `completion/claims-pass.md` at the commit that first adds `tasks.md`, Kenya R1). *(Corrected 2026-11-05, tasks round, Kenya and Data R1: the target is `completion/task-5-completion.md`, the harness parent's completion doc, re-ruled in their own record-only PR that merges before `tasks.md`; tasks.md § "Merge preconditions" item 2.)*

**Instrument**: the four harness contexts and `harness-generate`; the comparator's falsification test (Requirement 3.10); one recorded fault run (criterion 11).

#### Acceptance Criteria

1. The harness SHALL take as input the output of `generate` in a scratch consumer created from a packed install (`npm pack`, install, `init`, `generate`), read in place. It SHALL NOT read the repository's own `dist/` (design-outline.md § 4, "The harness").
2. The harness consumer SHALL use a config abbreviation other than `DP`, stated in the committed pin file, so that row 15's defect shows (plan-r2 D1).
3. The harness input SHALL include a product-token fixture that `ref`s a WCAG-only colour and a composite token (Stacy R3, property 7; Ada R2 § 2a, row 13).
4. The harness SHALL compile, on iOS and on Android, the generated token files and every non-test `.swift` or `.kt` file in the packed tarball, with the package's Android resources (Icon-Base `res/`) on the Android build. The components SHALL compile against the **consumer's** generated `ComponentTokens`, and the package's own `dist/ComponentTokens.*` SHALL be left out of the set (plan-r2 D3; Kenya R1). The generated files are the token tier; the hand-written shipped native files (`ThemeAwareBlendUtilities.*`, `MotionTokens.*`) are compiled in the component tier (Data R1, gap 1). The harness SHALL run no tests: `*Tests.swift` and `*Test.kt` are neither compiled nor run.
5. The harness SHALL report four verdicts as four CI contexts (the Conventions above), each able to be made a required check on its own (Thurgood R4 § 2 item 1).
6. **iOS**: a verdict SHALL come from a compile that emits object code, not a typecheck alone (Kenya R2; re-verified under Swift 6.4.2 in Kenya R1). For the component verdict, the generated tokens and the packaged components SHALL compile as one module. For the token verdict, a separate probe module SHALL read the generated members by plain `import`, never `@testable`. **Android**: the component verdict SHALL come from one compile in which the packaged component sources and the generated token files are one module, with the Compose compiler plugin applied. The token verdict SHALL come from a compile of the generated files alone and a second module that reads them from inside `@Composable` functions. **Both**: each context's list SHALL hold only diagnostics located in its own tier's files (Kenya R1), except that the component context SHALL also key each diagnostic located in a generated file that its own compile reports and that the same run's compile of the generated files alone, under the component compile's language settings, does not report; IF that compile's result is missing from the run THEN the component context SHALL fail. Each context SHALL give the compiler its files in a pinned order (package files first, then generated files, each sorted by path), and SHALL print that order with the exact compiler invocation it ran. *(Amended 2026-11-05, design round; prior text at `10ec4af5b`. (1) The Android sentence, Data's own R1 wording, had the token verdict come from the combined compile, where a module depending on a failing module gets no verdict, so D1's probe could never run while any component entry remains; the replacement is Data's (`inbound-from-data-design-2026-11-05.md` § 1.1, measured in `run-components.log`). It changes what the requirement asks for, so it is an amendment, not a correction (Stacy, design R1). **Changed reach**: the token verdict no longer sees a diagnostic that only the combined compile produces. (2) The exception in the "Both" sentence gives that sight back to the component context, on both platforms. Kenya measured that file order decides whether a cross-tier redeclaration lands in the generated file or the component file. The rule and the pinned order are Kenya's (iOS) and Data's (Android), with Stacy's conditions (design R1, R2; design.md § 3).)*
7. *(To D1 as Peter amended it on 2026-11-05; see the note below.)* The probe SHALL read every member the token index names for that platform, nested types included, whatever its declared access level. It SHALL print its read count beside the index's count and fail when they differ, AND a planted non-`public` member in a fixture SHALL produce an entry (Stacy R1; Ada R1; Kenya R1). It SHALL read the emitted theme under the names the components read (Requirement 4.2).
8. A committed pin file SHALL pin, and each context SHALL print: Xcode, the SDK, the Swift language mode and the iOS compile flags (object emission, whole-module, library parsing); Kotlin, the Compose BOM, AGP, the JDK, Gradle, `compileSdk`, `minSdk`, and each third-party library the component source imports, with its version (Coil, `material-icons-extended`, and any colour library) (Kenya R1; Data R1, gaps 2 and 3). The runner label lives in the workflow's `runs-on`, by version, never `-latest`, and the pin file names the same label. Compose SHALL be 1.7 or later, so that `rememberRipple` is an error; the baseline list holding entries tagged to row 14's A5, A6 and A7 is the check that the pin did this (Data R1).
9. The pin file SHALL state that its pins are harness pins, not platform minimums, except the iOS deployment target, which SHALL equal Core Goals' iOS minimum (Kenya R1). The minimums are Peter's (Open items, Design). No 129 green SHALL be read as "runs on the minimum": a Kotlin compile checks no API level (Data R1).
10. WHEN a 129 unit PR carries a row the harness accepts THEN all four harness contexts SHALL run on that PR (Stacy R2 § 2e). Whether they also run on every other PR is the tasks round's.
11. IF `harness-generate` fails or produces no output artifact THEN each compile context SHALL fail, not skip (Thurgood R4 § 2 item 2). One dispatched run with a forced `harness-generate` failure SHALL be recorded by run URL in the harness parent's completion doc (Stacy R1).
12. Each harness context SHALL enter as a non-required measuring lane. Promoting one to required is Peter's act for that context, on a measured-stability criterion the tasks round writes (plan-r2 § 7 decision 6).
13. WHEN a parent's completion doc cites a harness context as evidence THEN it SHALL cite the PR, the run URL at the head the unit merged, the comparator's summary line as printed, and the SHAs of the list file and the pin file at that head (Stacy R3 § 1; property 5).
14. Each row a harness context accepts SHALL have at least one entry tagged to it on that context's list at some commit before the PR that fixes the row, OR the requirement carrying the row SHALL name a different instrument for it until it does (Stacy R3, condition 2, as Stacy R1 restates its intent). Rows masked at the first run (row 12's groups B and C, behind row 6) and rows whose module cannot build yet (row 9, row 2's probe half) are covered this way (Lina R1; Kenya R1).

**D1's probe sentence, amended by Peter (2026-11-05).** D1's oracle text at `b89163c41` read "generated from the emitted members, so every public member is read". Read that way, a probe that reads only `public` members meets it, and row 9 (members that are not `public`) passes unseen. Under Requirement 1.9, Peter approved the replacement. His words, received 2026-11-05T05:14:42Z (`date -u` at receipt; orchestrator relay), verbatim: "Yes on D1; 659 and 660 are merged". The approved sentence, which D1 now carries: "The probe module that reads the tokens reads every member the token index names for that platform, whatever its declared access level, and the run fails if the probe's read count differs from that list's count." The record is `feedback/requirements.md` § "[PETER] D1's probe sentence" and the amendment line in `evidence/2026-11-05-native-plan/README.md`; `plan-r2.md` stays unchanged as the record of what he first approved. Criterion 7 is written to the amended D1.

---

### Requirement 3: The expected-failure list and its comparator

**Owner**: Thurgood (the instrument). Kenya and Data own how each platform's diagnostics are normalised. Stacy reads the falsification cases at review. The list's file format is the tasks round's.

**User Story**: As a claims verifier, I want "row N is fixed" to be decidable from git and one run, so that a red measuring lane is never read as broken, a correct fix is never a finding, and a green is never read as "compiles".

**Instrument**: the comparator, run inside each harness context; its Jest falsification test in `lane-functional-root`.

#### Acceptance Criteria

1. Each harness context SHALL compare its observed diagnostics against a committed expected-failure list of its own.
2. Each entry SHALL be keyed by file and normalised diagnostic, and carry a count and a tag naming one root `.kiro/issues/` record, optionally with an item label that the comparator finds in that record's text. A key MAY be split across tags with a count for each, and the comparator sums per key (Data R1). Normalisation SHALL: use the path relative to the package or consumer root, never an absolute path; keep a diagnostic's continuation lines; keep quoted identifiers in the message; count a Swift diagnostic printed twice (location and caret) once; contain no line number (Stacy R2, property 1; Data R1; Kenya R1).
3. **Two-sided.** WHEN an observed key is not on the list, OR an observed count is above or below its pinned count, OR a listed key does not occur THEN the context SHALL fail, except as criterion 5 admits. A fix and its list edit therefore land in the same diff.
4. **Floor.** The floor SHALL be computed at run time from the packed tarball's file list plus the generated files, per tier, and never stored as a number (Kenya R1; Stacy R1, the lowered-floor gap). IF fewer files reach the compiler than that floor, zero included, THEN the context SHALL fail. Each context SHALL print the count it gave the compiler.
5. **Additions.** WHEN an entry is added, or a count raised, relative to the list at the merge base THEN the context SHALL fail, unless one of these holds, each decided from the diff alone:
   - (a) a pinned version value in the pin file changes (a comment or whitespace edit does not count) (Stacy R1);
   - (b) the list does not exist at the merge base (the baseline run);
   - (c) **uncovered by a fix**: the same diff removes at least one entry from a list of the same platform, or edits the file the added entry is located in (Data R1; Lina R1; Stacy R1).

   Each entry added under (a), (b) or (c) SHALL be printed (`unmasked:` for (c)), SHALL carry a tag, and SHALL be counted in the summary line.
6. **Tags resolve and can fire.** IF a tag does not name a record at the issues root at the PR's head (a record under `archive/` or a missing file included), OR that record's Trigger token is `manual`, THEN the context SHALL fail (plan-r2 § 5; Stacy condition 3; Stacy R1).
7. **Retags and the protected set.** WHEN the tag on an existing key changes THEN the comparator SHALL print `retagged: <key> <from> → <to>` and count retags in its summary line. IF a tag moves away from a record in the protected set (the records 129 takes in, listed in a committed file under `harness/`) THEN the context SHALL fail, unless the entry carries a `retagged:` field (date, owner, the record it came from) AND the same diff appends a line naming the key to that record (plan-r2 § 5; Stacy condition 4). IF a record is removed from the protected-set file while it is still at the issues root THEN the context SHALL fail (Stacy R1).
8. **Summary line.** Each run SHALL print one summary line with the expected count, the observed count, new failures, stale entries, additions by exception (a)/(b)/(c), retags, files compiled against the floor, the entries remaining, and, in a component context, the cross-tier entries kept under Requirement 2.6's exception, counted separately. *(Amended 2026-11-05, design round, O-15: the cross-tier count, Stacy's condition 3; prior text at `10ec4af5b`.)* WHILE a context's list holds entries, the line SHALL state the remaining count, so that a green reads "the failures match the list", not "compiles" (Stacy R3 § 1, property 8).
9. The comparator SHALL read no PR body and need no credential. This is a reading of its code (Stacy R1).
10. A Jest falsification test SHALL make the comparator fail once for each failure in criteria 3 to 7 and for the floor, and SHALL show that a comment-only pin edit admits no addition. It SHALL also cover: a compile-only fixture (a missing return, which a typecheck passes and a compile rejects); probe completeness (a planted non-`public` member and a read-count mismatch); normalisation (a doubled Swift diagnostic and a multi-line Kotlin diagnostic); and a toolchain mismatch (criterion 11) (Kenya R1; Data R1). It SHALL run in `lane-functional-root` and be registered in `.github/in-lane-guards.json` (Thurgood R4).
11. **Toolchain match.** Each context SHALL read the running toolchain's versions (Xcode, SDK and Swift; JDK, Gradle and Kotlin) and fail if any differs from the pin file (Kenya R1, which measured 407 iOS diagnostics under Xcode 26.0.1 and 437 under 27.2 on identical input; Thurgood R3's fourth red reason).

**Its limits, stated so they are not read as covered**:
- The comparator checks that a reason exists in git, not that it is a good one. That stays Stacy's reading, and so does each `unmasked:` entry: exception (c) admits a regression that lands beside a fix in the same platform, printed and tagged.
- While a context is non-required, an added entry outside criterion 5 can merge over a red check; the next PR's base already holds it. Stacy's CLOSEOUT pass reads every addition from the list file's history over 129's range (Thurgood R4 § 1). A red harness context at a 129 merge is a finding on the author (Stacy R3, condition 3). Criterion 5 (c) is what keeps a correct, uncovering fix from being one.
- A token fix can still change counts in component files, because missing names cascade, so a token PR may edit a component list too (Kenya R1).

---

### Requirement 4: Native theme emission — item (i)

**Owners**: Ada (the generator); Lina (the component reads and the guard). Kenya and Data verify.

**User Story**: As an iOS or Android adopter, I want `generate` to emit the theme types my components read, in every theme and mode my build registers, so that the components compile against my own themed output instead of failing on a theme nothing defines.

**Records**: row 2, `2026-06-28-spec-094-platform-theme-emission-unwired.md`; row 15, `2026-09-26-native-component-theme-hardcoding.md` (the theme-name half); row 16, `2026-11-04-progress-bar-native-theme-reads-malformed.md`; row 12, `2026-10-24-android-component-unit-type-mismatches.md` (item 3's colours and Button-CTA).

**Instrument**: `harness-ios-tokens` and `harness-android-tokens` (the probe); `harness-ios-components` and `harness-android-components`; in `lane-functional-root`, Lina's guard and the existing generator tests (`src/generators/__tests__/SwiftThemeTypes.test.ts`, `KotlinThemeTypes.test.ts`).

#### Acceptance Criteria

1. WHEN a consumer runs `generate` THEN its output SHALL contain, for iOS, the theme protocol or struct, its `EnvironmentKey` and the `EnvironmentValues` property the components read, and for Android, the theme data class and its `CompositionLocal`, named as Q12 decides (charter, item (i); Kenya R1; Ada R1). The output SHALL contain one theme instance per registered theme and mode (base light and dark, WCAG light and dark), AND the probe SHALL construct each one (Ada R1).
2. The emitted theme SHALL carry every colour semantic that the token index names with a `theme.` platform name (under Q13 (a), every colour semantic; charter, item (i), "Today"), each with its resolved value for each theme and mode; a member that holds no colour (`Color.Unspecified`, `Color.clear`) does not meet this, and a Jest test on output generated from the repository's real token definitions SHALL fail on one. The probe's list of colours SHALL be that same index set, not a list taken from the emitted theme, and it SHALL read each one under the name the components read (Stacy R1). *(Amended 2026-11-05, design round, O-4, O-5, O-7; prior text at `10ec4af5b`: "the token index's theme-varying set" pointed at the base-scoped `themeVarying` flag (9 colours, missing the five WCAG-only ones), and "carry every … colour" was met by a member that holds no colour (Ada, Lina, Kenya design R1; Stacy design R1 on Requirement 1.7).)*
3. The Spec 094 fixtures SHALL be re-baselined in the PR that wires emission, against the component reads as #592 (`c176d2798`) left them, AND that PR's body SHALL name the re-baseline (design-outline.md § 4; Stacy R1).
4. Lina's two-sided Jest guard in `src/components/__tests__/` SHALL fail on any component `theme.` read that the generated Swift or Kotlin does not declare, and SHALL carry a pinned list that only shrinks. It SHALL start guarding once item (i) emits and Q13 defines "declared"; until then it is a pinned baseline (design-outline.md § 4). It is a temporary test: it retires when `harness-ios-components` and `harness-android-components` are both required (Lina R1). It does not see row 16's prefixed reads or Button-CTA's bare reads; only the harness accepts those. If it is registered as a named instrument, Thurgood is consulted.
5. WHEN item (i)'s emission lands THEN row 12's item 3 colours and its Button-CTA reads SHALL land in the same PR (design-outline.md § 4, "Same-PR coupling").
6. Row 16's six reads SHALL be rewritten in the access form Q13 decides, and accepted by `harness-ios-components` and `harness-android-components`.
7. Row 15's theme-name defect SHALL be accepted by the component contexts under the non-`DP` consumer (Requirement 2.2). Its `ContainerCardBase.ios.swift` L816 parse defect SHALL be fixed before the harness unit's first PR, or carried as a tagged entry (Lina R1).
8. The product-token files in the harness input SHALL be compiled by the token contexts. Until item (i) emits, their entries SHALL be tagged to row 2's record (theme getters) or row 13's (composite and WCAG-only references), by cause (Ada R1).
9. WHEN item (i) ships THEN Kenya's and Data's charter theming sections, AND the consumer overlays `canonical/profiles/consumer/kenya.overlay.md` and `data.overlay.md` (their "no theme surface today" lines), SHALL say what is emitted, each seat SHALL re-confirm, and the consumer-profile signatures SHALL be redone. That text is charter text, so Peter merges it (Leonardo R1).
10. Every component colour read, including the static colours read through `theme.` (about 173 by Lina's scan), SHALL resolve under the access form Q13 decides, accepted by the component contexts. Until Q13 is ruled, their entries SHALL be tagged to row 2's record (Lina R1).

**Carried to design**: Q12 (theme names across consumers) and Q13 (access form for static colours), settled together; the Android `CompositionLocal`'s default and kind. Owners Lina and Ada; Kenya and Data consulted. Both rulings stay provisional until Spec 132's D4 app builds (plan-r2 § 2, WP1). The dated pointer in 128's outline is Thurgood's, owed after the design ruling.

---

### Requirement 5: The component tier reaches the consumer's `generate` — item (ii)

**Owners**: Ada (the harvest, the precedence rule, the name contract); Lina (Spec 123 Requirement 1.5's recorded decision; row 18).

**User Story**: As an iOS or Android adopter, I want DesignerPunk's component tokens in my own generated output, bound to my primitives, so that our components compile against my tokens without anything copied from `node_modules`, and so that I am told when I break a name they rely on.

**Records**: row 3, `2026-08-13-component-token-platform-references-noncompiling.md`; row 13, `2026-10-26-token-index-platform-name-readers.md` (item 3 only); row 18, `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (R1 and R5 only).

**Instrument**: the D2 check and its completeness half in `harness-generate`; the token contexts for the `ComponentTokens` files; `pack-assert` for what ships; `Consumer Guard` for binding, the name contract, the replacement and missing-key reports, and R5; `lane-functional-root` for R1, the duplicate-group failure and row 13's refusal.

#### Acceptance Criteria

1. The package SHALL ship DesignerPunk's six harvestable component token definition files, and `pack-assert` SHALL assert each is present (plan-r2 WP1; Ada R1, which measured 0 shipped today). WHEN a consumer runs `generate` THEN those definitions SHALL be harvested into the consumer's own iOS and Android output, with references emitted by name, AND a `Consumer Guard` case that changes a referenced primitive's value SHALL find the component token following it (charter, item (ii); Lina R1; Stacy R1). The harvest SHALL report, not pass silently, a definition file that registers no tokens (Lina R1).
2. D2's set equality (Requirement 1.3) SHALL hold under the precedence rule of criterion 3, so the merged index merges per group, as the emission does (Ada R1).
3. WHEN a consumer's component-token group and DesignerPunk's share an emitted group name THEN the consumer's SHALL win, AND `generate` SHALL report each replacement by group name (plan-r2 § 3, item 2). IF two of the consumer's own files declare one group THEN `generate` SHALL fail with a message naming both files, accepted by a Jest test (plan-r2 WP1; Ada R1).
4. **The name contract covers the component tier.** IF a consumer renames or deletes a primitive or semantic token that a shipped component token references THEN `generate` SHALL report it (a report, not a failure), AND `sync` SHALL report such a reference that an upgrade introduces. The check SHALL read every platform's output. `Consumer Guard` SHALL accept both with a packed-install case that deletes a referenced primitive (charter, "Counter-argument folded in, and what survives"; Ada R1).
5. Spec 123 Requirement 1.5 SHALL be closed by a decision Lina records and signs in 129's `design.md`, saying that our component token definitions reach the consumer's harvest, citing D2 as the approved definition it follows, with a dated pointer line at Spec 123 Requirement 1.5 (Lina R1).
6. Row 13, item 3: a composite `ref` SHALL be refused by `validateProductTokens` with a message naming the token, accepted by a Jest test; a WCAG-only colour `ref` SHALL emit the theme path by its `theme.` prefix and compile, accepted by the token contexts with the fixture of Requirement 2.3 (the record's item 3; Ada R1).
7. Row 18, R1: WHEN `sync`'s pre-123 migration meets a copied component-token file in the single-family form THEN it SHALL report the file by path and offer the record's fix. Accepted by a Jest test in `lane-functional-root`.
8. Row 18, R5: WHEN the generated output is not fresh against the inputs `generate` would read now THEN the name-contract run SHALL say so. `Consumer Guard` SHALL accept it with a case whose inputs change after the last `generate`.
9. Row 3's `ComponentTokens` platform references SHALL compile, accepted by the token contexts (its half is folded into row 4's item 1).
10. **D2's completeness half.** The DesignerPunk entries in the consumer's merged index SHALL equal the component tokens defined in the shipped definition files of criterion 1, so a token dropped from both the index and the output fails (Stacy R1).
11. WHEN a consumer's group replaces ours AND a shipped component reads a key their group lacks THEN `sync` SHALL report the key and the component, accepted by a `Consumer Guard` case (Lina R1).

**Carried to design**: the precedence rule's detail (Ada); whether R5 compares versions or content (Q6; Ada's lean is content, her inbound § 2 item e); hand-written same-name declarations in the adopter's Kotlin package (plan-r2 § 3, item 3; Ada and Data); **whether item (ii) harvests into the consumer's web output at all** (Ada, Lina, Sparky; see `[THURGOOD R2]`: Ada's R1 asks for D2 on web, Lina's R1 says web binds late through the package CSS and harvesting would define each property twice).

---

### Requirement 6: The generated native token files compile

**Owner**: Ada. Data is consulted on Kotlin types; Lina on the component side of each coupling.

**User Story**: As an iOS or Android adopter, I want the token files `generate` writes to compile, with the colours they say, so that I am not the first person to run a Swift or Kotlin compiler on them.

**Records**: row 4, `2026-10-03-native-generator-findings-for-spec-129-intake.md` (four items); row 5, `2026-10-20-native-font-family-literals-unescaped-quotes.md`; row 6, `2026-10-20-kotlin-output-no-import-block.md`; row 7, `2026-10-24-kotlin-output-section-comment-bare-text.md`; row 8, `2026-10-24-native-primitive-values-do-not-match-declared-type.md`; row 9, `2026-10-26-ios-designtokens-members-not-public.md`; row 12, groups B and C and item 3's typography half, with Ada's I-1 and I-2.

**Instrument**: the token contexts; in `lane-functional-root`, Jest assertions on generator output (rows 5 and 8, colour values), row 9's interim text guard, and `src/components/__tests__/AndroidSizingDpReads.test.ts` and `AndroidDpTokenReads.test.ts`.

#### Acceptance Criteria

1. *(Removed in R2: it repeated Requirement 1.2, which already requires zero token entries.)*
2. Row 9: every member of the generated token types SHALL be `public`, accepted by the probe of Requirement 2.7. Until `harness-ios-tokens` first builds the token module, `src/generators/__tests__/tokenIndexPlatformNames.test.ts`, tightened to require `public`, SHALL be row 9's instrument, and it retires when the probe takes over (the record's fix plan, item 2; Kenya R1).
3. Row 5: font-family values SHALL parse on both platforms, and a Jest test on the generator output SHALL assert the form the design chooses.
4. Row 8: each family's emitted native value SHALL match its declared type. On iOS the token context accepts it, because the wrong values fail the compile (Kenya R1). On Android, because a wrong percent radius compiles, a Jest test on the generator output SHALL assert what `radius_half` emits.
5. Row 6: the import lists of both generated Kotlin files (`DesignTokens.android.kt` and `ComponentTokens.android.kt`) SHALL be computed from the types emitted, and SHALL land with I-2 and row 4's colour decision, or in an order the three owners agree (design-outline.md § 4; Data R1).
6. *(Removed in R2: an ordering rule, moved to the tasks round. K2 reports syntax and type errors in one pass, so its reason no longer holds; Data R1, Ada R1, Stacy R1.)*
7. WHEN sizing tokens are emitted as `Dp` (I-1) THEN Lina's removal of the 16 `.dp` sites SHALL land in the same PR, guarded by `AndroidSizingDpReads.test.ts`. Ada drafts the release note.
8. WHEN the `fontSize` type changes (I-2) THEN row 12's groups B and C, and item 3's typography constants in `InputTextBase.android.kt`, SHALL land in the same PR. IF I-2 emits a shape `AndroidDpTokenReads.test.ts` does not know (such as `TextUnit`) THEN the same PR SHALL teach it that shape (Lina R1).
9. WHEN `getKotlinType` changes THEN the same PR SHALL bring the per-family Android type statements in `governance/platform-implementation-guidelines.md` into line. Lina drafts, Peter approves under the ballot-measure model, and the change is applied in that PR.
10. A Jest test SHALL assert that each emitted native colour converts back to its OKLCH source within a ΔE₀₀ tolerance the design states, and that colours outside the target gamut are mapped by the rule the design states (Ada R1).

**Carried to design** (Ada decides; Data consulted on Android): the Kotlin type table as one decision (I-2's `TextUnit` or `Float`; `fontWeight`; a percent radius); native colour construction, a dependency or native values, once for both platforms (rows 4 and 11), with criterion 10's tolerance; and what a native font family emits (row 5).

---

### Requirement 7: Shadow colours and their OKLCH root

**Owner**: Ada. Any system token this creates is reviewed by Peter.

**User Story**: As an adopter on any platform, I want every shadow to use the colour token it names, so that shadows compile, and on web render, instead of pointing at nothing or at a hard-coded black.

**Records**: row 10, `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`; row 11, `2026-06-24-oklch-shadow-color-family-not-migrated.md`.

**Instrument**: the token contexts (the native half); in `lane-functional-root`, the `ColorReferenceEmissionValidator` test, which fails until `KNOWN_UNEMITTED_SHADOW_COLORS` is empty, and a test that no colour primitive a composite references goes unemitted; in `Consumer Guard`, the `var()` check of Requirement 1.6 and a check of one blue-tinted composite (Ada R1; Sparky R1).

#### Acceptance Criteria

1. Every shadow composite's colour reference SHALL resolve on web, iOS and Android. On web, each composite SHALL use its colour token, not a literal (the three blue-tinted shadows render black today), checked on one blue-tinted composite (Ada R1).
2. The fix SHALL remove `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning `generate` prints. Peter, 2026-10-25: "Let's go with A, but we need to remember to remove the warning when we do the work in 129".
3. WHERE the fix creates or changes a colour primitive, the design SHALL name each token, so that Peter's review happens at design and not in a fixing PR (Core Goals; design-outline.md § 4, "Token creation").
4. Row 11: the shadow colour family SHALL be defined in OKLCH like the other colour families, its tokens named at design under criterion 3, OR the design SHALL record why not and how the native generators emit its `rgba` primitives (Ada R1).

---

### Requirement 8: The component repairs 129 closes, and the drawn-control record's native half

**Owner**: Lina. Kenya and Data verify.

**User Story**: As Peter, I want the component defects that 129's own rows name closed by a compile, and every behaviour item moved to the spec that builds an instrument for it, so that no compile and no agent's reading is taken as proof of behaviour.

**Records**: row 12 (groups B and C, item 3, Button-CTA); row 14, `2026-10-18-drawn-control-drift-ios-android-web.md` (the native half); row 15 (its parse defect); row 16.

**Instrument**: the component contexts; a text guard in `lane-functional-root` for the dead import.

#### Acceptance Criteria

1. *(Removed in R2: it repeated Requirement 1.4, which binds rows 12, 14, 15 and 16.)*
2. Row 14's A5, A7 and A6's ripple part (`rememberRipple` to `ripple(...)`, at Button-Icon, Input-Checkbox-Base and Input-Radio-Base) SHALL be accepted by `harness-android-components` under the Compose pin of Requirement 2.8. The dead `rememberRipple` import in `VerticalListButtonItem.android.kt` gives no diagnostic, so its removal SHALL be accepted by a text guard (Data R1).
3. *(Removed in R2: A3 moves to Spec 132 with criterion 4.)*
4. Row 14's A3, I1–I3, A1, A2, A4 and A6's non-ripple parts are Spec 132's (D5, D6). No agent can hear VoiceOver or TalkBack, and 129 runs no tests, so nothing in 129 can accept them (Kenya R1; Data R1; Lina R1). A 129 component PR MAY carry their code changes, claimed only as "compiles", never as verified. Lina records the move in the record, and re-rules that half to Spec 132's path once its directory exists.
5. *(Removed as a criterion in R2, because a permission cannot fail. It stands as a note: a 129 component PR may fix a file's other errors, removing their entries in the same diff; plan-r2 § 2, WP3.)*

---

### Requirement 9: `generate` reads the consumer's own source — item (vi) and the palette

**Owners**: Lina and Ada (item (vi), per the charter); Ada (the palette and the base config).

**User Story**: As an adopter who owns their token source under Model B, I want `generate` to read my copy, not the installed package, so that my edits change my output and a package upgrade does not change it silently.

**Records**: row 19, `2026-10-15-123-palette-read-from-package.md`; row 20, `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (row (g) only).

**Instrument**: `Consumer Guard` (one packed-install case per group, and the removal case); `lane-functional-root` (row (g)'s check).

#### Acceptance Criteria

1. *(Moved in R2 to "Carried to design" below: it was a pointer to a design decision, not an acceptance criterion; Stacy R1.)*
2. WHEN a consumer edits one of the six groups that `docs/consumer/INSTALL.md` L77 names at `45f5262ee` (the colour palette; the dark and WCAG override maps; the opacity values that transparent colours are built from; the motion and layering tokens; the font-size and line-height values behind icon sizes; the DTCG/Figma export) in their copied source and runs `generate` THEN the output SHALL show the edited value; for web, the value SHALL appear in the generated CSS, not only a changed file. `Consumer Guard` SHALL hold one case per group. The override-map case follows the Q3a ruling (Stacy R1; Ada R1; Leonardo R1; Sparky R1).
3. IF item (i) ships before criterion 2 THEN that release's CHANGELOG limitation SHALL be rewritten to say what still comes from the package, not removed (Q11; Ada's inbound § 3).
4. Row (g): a Jest test SHALL fail when the repository's root token files differ from a fresh generation from the base config. It SHALL land in the PR that makes `themes` non-empty or changes how the config is read (the record; Ada's inbound § 3).
5. WHEN the package's own copies of the six groups are removed from the installed `node_modules` THEN `generate` SHALL still succeed with byte-identical output, accepted by a `Consumer Guard` case (Leonardo R1).

**Carried to design**:
- **Q3a, item (vi)'s source** (Lina, Ada). The charter names the design round as where it is decided, not just carried. The decision states its effect on item (i) and on the caveat that a custom theme does not emit on web, and, if it ships a custom-theme override on web, the `generate` message "registered, not applied yet" and the web agent doc change in that PR (Sparky R1).
- **Q3b, the web `data-theme` selector's scope.** It changes what the web generator builds, so it goes to Peter as a fork, with Sparky's browser check committed first as a finding naming the browser and its version (Sparky R1). Owner Ada; Leonardo co-owns the intent.

---

### Requirement 10: Retire the native root files, and name what may break — item (iii)

**Owner**: Ada. The release author words the notes.

**User Story**: As an adopter, I want the package to stop shipping native token snapshots I could mistake for my own, and to be told plainly when that happens, so that my build reads only my generated output.

**Instrument**: `npm run test:pack-contents` (`scripts/pack-assert.ts`, in `lane-functional-root`).

#### Acceptance Criteria

1. WHEN items (i) and (ii) are on `main` THEN the package SHALL stop shipping `dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`, `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt`, in the release Peter's decision 7 places, which carries (i) and (ii) or follows a release that does, AND `pack-assert` SHALL assert they are absent. *(Amended 2026-11-05, tasks round, Ada R1; prior text at `d7f87174c`: "WHEN items (i) and (ii) have shipped THEN … in the release Peter's decision 7 places (Open items, Design)". "Shipped" read as "published in an earlier release" would make 129 wait on a release between U8 and U12, which protects no supported consumer under Peter's 7 (a); the intent is that the replacement never arrives after the removal. **Changed reach**: the retirement may ship in the same release as items (i) and (ii).)* `dist/ComponentTokens.web.css` and the web CSS exports keep shipping, because shipped web components read them (plan-r2 WP1; Ada R1, who edits charter item (iii) to match).
2. The release that retires them SHALL announce the retirement in its notes. 15.0.0 announced no deprecation (charter, item (iii)).
3. The package's native resource folders SHALL hold only resources, asserted by `pack-assert` (plan-r2 § 2, WP1). Its instance, `2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md` (Lina), SHALL close no later than the harness's first Android run, which it otherwise fails before any Kotlin compiles (Data R1).
4. Each 129 change that may break a consumer SHALL be named in its release's notes: item (iii), I-1, I-2, and, if the design round takes it, item (ii)'s change to the consumer's web output. IF the design round finds that one breaks a supported consumer THEN it SHALL go to Peter with the 17.0.0 charter quoted (Q7; `.kiro/issues/2026-11-01-17-0-0-release-charter.md`, "Breaking changes ship together there").

---

### Requirement 11: `init` runs `generate` — item (iv)

**Owners**: Ada (`init`, `generate`); Thurgood (the INSTALL derivation and its test). Leonardo is consulted on the founder journey.

**User Story**: As a stranger founding a project, I want `init` to produce my own token output, and never to lose my new project to a token error, so that my first render already uses my artifacts.

**Instrument**: `Consumer Guard`; `scripts/__tests__/install-doc.test.ts` in `lane-functional-root`.

#### Acceptance Criteria

1. WHEN a consumer runs `init` THEN `init` SHALL run `generate`, which writes to the config's `output` key (design-outline.md § 1, the correction to item (iv)). `Consumer Guard` SHALL assert that the output and `token-index/` exist after `init` alone, AND that running `generate` straight after `init` writes byte-identical output (Leonardo R1).
2. Personal-note creation SHALL stay in the CLI layer and SHALL NOT move into `src/generators/generateTokenFiles.ts` (Ada, 2026-10-03, design-outline.md § 5.2 Q4).
3. IF item (iv) changes the founder path's step count THEN INSTALL's `path-steps` front matter and `install-doc.test.ts` SHALL change in the same PR (Q4). Spec 123's DD9 criterion closed with that spec's Task 22 and is not reopened.
4. IF `generate` fails inside `init` THEN `init` SHALL finish the birth (config, copied token source, agent layer), print `generate`'s message and the command to re-run, and exit non-zero, accepted by a `Consumer Guard` case (Ada R1; Leonardo R1).

**Carried to design**: the founder count itself. Leonardo's read: `generate` leaves the birth path and stays the first step of the edit loop, so the count drops by one. Ada decides; Leonardo consulted.

---

### Requirement 12: Per-platform output paths — item (v)

**Owner**: Ada.

**User Story**: As an adopter with an iOS or Android app, I want each platform's output written where that platform's build reads it, without moving my web CSS, so that I do not move files by hand after every `generate`.

**Instrument**: `Consumer Guard` (a packed install with a `platforms:` config); in `lane-functional-root`, the config's validation and a Jest test of what each folder holds; `pack-assert` for the file-name check.

#### Acceptance Criteria

1. The consumer config SHALL accept a `platforms:` key that names, per platform, where its output lands (charter, item (v)). This is new work: neither `PLATFORM_KEYS` nor the key exists in code (design-outline.md § 1).
2. WHEN `generate` runs THEN each platform `platforms:` names SHALL be written at its configured path, AND every other platform, web included, SHALL be written at `output` as today (Ada R1; Sparky R1).
3. IF a `platforms:` entry names a platform the generator does not know, OR a path that resolves outside the project root, THEN `generate` SHALL fail with a message naming it (Leonardo R1: Spec 132's D4 layout needs our generated sources inside the package root).
4. WHEN `platforms:` names a folder THEN `generate` SHALL write only that platform's files there, AND no generated native file SHALL share a file name with a packaged native source file (Ada R1; Kenya measured that SwiftPM refuses a file name used twice).

---

### Requirement 13: Validators and config types every consumer runs

**Owner**: Ada.

**User Story**: As an adopter, I want `validate` to pass on unmodified source and still catch a real violation, component-token custom values to be checked without breaking my web build, and the theme override types to be importable, so that the tools I run tell me the truth.

**Records**: row 1, `2026-06-24-mathematical-relationship-parser-validation-gaps.md`; row 21, `2026-10-24-component-token-custom-values-unvalidated.md`; row 22, `2026-10-03-semantic-override-map-type-not-exported.md`.

**Instrument**: row 1, the skipped `Consumer Guard` case re-enabled, and a Jest test in `lane-functional-root`; row 21, a `Consumer Guard` case and a Jest test; row 22, `tsc --noEmit` in `Consumer Guard` on a consumer `.ts` file that imports the types (Ada R2 § 2a).

#### Acceptance Criteria

1. WHEN `validate` runs on unmodified DesignerPunk token source THEN its mathematical-relationship check SHALL report no failure: the skipped `Consumer Guard` case `validate passes` (`tests/consumer-integration.test.ts` L354 at `c22c17a78`) SHALL be re-enabled and pass, AND a Jest case with a token that breaks its declared relationship SHALL still be reported (Ada R1; Stacy R1).
2. Row 21, under the rule the design rules: WHEN a consumer's component token has a non-conforming custom value THEN `generate` SHALL warn, naming the token, and SHALL NOT fail (failing would break supported web consumers; a failure is held for a major, or goes to Peter under Q7). WHEN a DesignerPunk component token does not conform THEN the repository's lane SHALL fail, and the ruling's PR disposes of the two known cases (Badge-Label-Base, Button-VerticalList-Item) (Ada R1).
3. Row 22: WHEN a consumer's TypeScript imports `SemanticOverrideMap` and `SemanticOverride` from `@3fn/core/config` THEN it SHALL type-check (the record's § "Fix shape"; Ada R1).

**Carried to design**: row 21's rule (Ada); row 1's fix and size, since it touches a validator every consumer runs (Ada R1).

---

### Requirement 14: Native readiness test patterns — row 17 (Q10)

**Owner**: Lina.

**User Story**: As an adopter reading served readiness, I want it never to claim native tests or readiness that the code does not have, so that readiness understates rather than overstates.

**Records**: row 17, `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` (the test-pattern half).

**Instrument**: git. Criterion 1 holds when `derivePlatformReadiness`'s patterns in `application-mcp-server/src/indexer/ComponentIndexer.ts` are unchanged over 129's range; no CI context is needed.

#### Acceptance Criteria

1. 129 SHALL leave `derivePlatformReadiness`'s native test patterns unchanged (option (a)), for the reason Lina gives: a TS-side Jest file tests the TS side, not the Swift or Kotlin (her inbound § 2).
2. Option (c), the harness's per-component result as a readiness input, SHALL be carried by Spec 132's D7 (plan-r2 § 1, D7: "132 (129's Q10 (c))"). 129 SHALL NOT change the served readiness contract. Lina confirmed this reading in her R1, so the fork does not go to Peter.
3. The served native status of Button-VerticalList-Item and Button-VerticalList-Set, served today as `production-ready` though their native source does not compile, SHALL be corrected through their schemas' `readiness.{ios,android}.reviewed` flags, in Lina's own PR before her close of row 17's record (Lina R1); landed as #660 (`a2e89c651`).

---

### Requirement 15: Shipped wording follows the instrument

**Owners**: Thurgood (release text; the limitation-marker test); each row's owner (its sentences); Kenya and Data (the "Native status" passage). Stacy reads release text at RELEASE under her charter.

**User Story**: As an adopter, I want everything shipped to me, including my agents' guidance, to claim exactly what the checks prove, so that "compiles" never means more than a pinned list allows.

**Instrument**: `scripts/__tests__/install-doc.test.ts` in `lane-functional-root`; a grep at each release's S, plus Stacy's RELEASE read for wording a grep cannot catch.

#### Acceptance Criteria

1. WHILE a harness context's list holds entries, no shipped text SHALL say that tier "compiles": the CHANGELOG, INSTALL, the Integration Guide, a README, the consumer agent overlays, the served corpus and `generate`'s messages (Leonardo R1; Sparky R1). The release that carries the harness SHALL say "compile except N pinned errors, listed at <path>; no app linked, no tests run", with N the list's count at that release's S (plan-r2 § 4). Web wording is held to Requirement 1.6's reach. A grep at S decides "compiles"; variants are a reading (Stacy R1).
2. Each limitation sentence in the Integration Guide's install region that a 129 row fixes SHALL carry `<!-- limitation: .kiro/issues/<file>.md -->`, AND `install-doc.test.ts` SHALL fail when a marked record is under `archive/` or missing while its sentence remains (plan-r2 § 5, the answer to Ada). Ada is consulted.
3. *(Removed as a criterion in R2: one INSTALL PR before each release's S is a batching rule, moved to the tasks round; Stacy R1.)*
4. WHERE a 129 row creates or changes a token, its token-family documentation SHALL change in the same PR (Process-Spec-Planning § "Documentation Requirements").
5. The guide's "Native status" passage SHALL state 129's reach as Requirement 1 accepts it: the token files compile, and the component source compiles except for pinned errors, each tagged to an open record (Leonardo R1, against the passage's Spec 129 line at `governance/DesignerPunk-Integration-Guide.md` L195 on `c22c17a78`). Kenya and Data own the wording; it is a CORRECTION edit.
6. WHEN items (i) and (vi) ship THEN `governance/Token-Governance.md` § "Theme Registry (Spec 094)", which today says a registered theme is "not applied yet", SHALL be brought in line by ballot edit in that release (Ada R1; the sentence she cites from record #22, "generates output for all registered themes", no longer appears there at `c22c17a78`).

**Documentation waiver, partial**: 129 creates no component, so no new component README is required. A component README changes only where a 129 PR changes the behaviour or the token reads it documents.

---

## Record dispositions: the records this file's path triggers

These 17 root records carry a Trigger glob on this file (facts row 3, 10 of them P1). Each needs a disposition here, or it is a finding (Stacy).

**What "intake" obliges, and the route.** Under Process-Spec-Planning § "Before Formalizing: Records That Name the Spec", the owner re-rules the Trigger to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` until tasks.md numbers the carrying parent. Under README rule 11, a record lapses at its firing commit unless an ancestor of that commit re-ruled or closed it. **Route (Stacy R1): each owner makes the acts in their own record-only PR, which merges before this file.** Commits on this branch would also stop the lapse, but after the squash merge `main` would show this PR, not the owner, changing the Trigger lines, so rule 9's authorship could not be checked from `main`. If R2's dispositions change after an owner's PR merges, the owner re-rules again.

| # | Record | Owner | Disposition | Carried by | Owner's act, in their PR before this file merges |
|---|---|---|---|---|---|
| 1 | `2026-06-28-spec-094-platform-theme-emission-unwired.md` | Ada | intake | Req 4 | re-rule to `completion/claims-pass.md` |
| 2 | `2026-10-20-native-font-family-literals-unescaped-quotes.md` | Ada | intake | Req 6.3 | re-rule, as #1 |
| 3 | `2026-10-20-kotlin-output-no-import-block.md` | Ada | intake | Req 6.5 | re-rule, as #1 |
| 4 | `2026-10-24-kotlin-output-section-comment-bare-text.md` | Ada | intake | Req 6 | re-rule, as #1 |
| 5 | `2026-10-24-native-primitive-values-do-not-match-declared-type.md` | Ada | intake | Req 6.4 | re-rule, as #1 |
| 6 | `2026-10-26-ios-designtokens-members-not-public.md` | Ada | intake | Req 2.7, 6.2 | re-rule, as #1 |
| 7 | `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` | Ada | intake | Req 7 | re-rule, as #1 |
| 8 | `2026-06-24-oklch-shadow-color-family-not-migrated.md` | Ada | intake | Req 7.4 | re-rule, as #1; Ada sets its Class after the fold (Req 7.4 now takes the migration) |
| 9 | `2026-10-26-token-index-platform-name-readers.md` | Ada (item 3); Lina (item 2) | intake, item 3 | Req 5.6 | Ada re-rules, as #1. Item 2 landed first as Lina's own PR, #659 (`0057d1f94`) |
| 10 | `2026-10-24-component-token-custom-values-unvalidated.md` | Ada | intake | Req 13.2 | re-rule, as #1 |
| 11 | `2026-10-15-123-palette-read-from-package.md` | Ada | intake | Req 9.2, 9.3, 9.5 | re-rule, as #1 |
| 12 | `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` | Ada | intake, row (g) only | Req 9.4 | re-rule, as #1. Row (h) stays fix-now by 16.3.0's S under its own record |
| 13 | `2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` | Ada | **leave out; re-rule to CLOSEOUT** | none | re-rule to `completion/claims-pass.md`, marked "not intake: left out of 129 at requirements; re-read at CLOSEOUT, with row 19 and item (ii) shipped" (Ada R1) |
| 14 | `2026-10-24-android-component-unit-type-mismatches.md` | Lina | intake | Req 4.5, 6.7, 6.8 | re-rule, as #1 |
| 15 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` | Lina | intake | Req 4.6 | re-rule, as #1 |
| 16 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | Lina | **close** (option (a)) | Req 14 | rule 5's dated outcome line, naming Req 14 and D7 as (c)'s successor, correcting the "never overstates" premise and citing her readiness-flag PR (Req 14.3), #660 |
| 17 | `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` | Lina | intake, R1 and R5 | Req 5.7, 5.8 | re-rule, as #1 |

**Counts**: carried 15 (intake), re-ruled out of 129 1 (#13), closed 1 (#16), none 0.

**After this file merges**: when tasks.md numbers the carrying parents, each intake record is re-ruled again, from `completion/claims-pass.md` to its parent's completion doc. Nothing fires that second re-rule, so the tasks round lists it among its merge preconditions (Stacy R1). The other records E2's grep finds are dispositioned in `feedback/requirements.md` § "Context for Reviewers".

---

## Open items for design and tasks

Named so they are not decided silently.

**For Peter now**: nothing. D1's wording was answered on 2026-11-05 (Requirement 2.7).

**Design round**:
- **Peter's, at design** (`evidence/2026-11-05-native-plan/README.md`): plan decision 4, the iOS minimum (it sets Requirement 2.9's deployment target); decision 5, the Android minimum and its toolchain range; decision 7, when native becomes a semver promise (it places Requirement 10.1).
- Q3a and Q3b (Requirement 9). Q6, R5: versions or content (Ada).
- Q12 and Q13 together (Lina, Ada; Kenya and Data consulted), provisional until 132's D4.
- Whether item (ii) harvests into the consumer's web output (Ada, Lina, Sparky).
- The Kotlin type table (Ada; Data). Native colour construction and its ΔE₀₀ tolerance (Ada). Row 5's native font family (Ada). Item (i)'s Android `CompositionLocal` default and kind (Ada; Data).
- Row 11's tokens, named for Peter's review (Ada). Row 21's rule (Ada). Row 1's fix and its size (Ada).
- Item (ii)'s precedence detail and the Kotlin same-name fix (Ada; Data).
- Q4's founder count (Ada; Leonardo consulted).
- **Spec 132 inputs drafted during 129's design round, not 129 acceptance** (plan-r2 § 6 item 5): the access-level ballot (Lina); the per-platform contract validation ballot (Lina; Thurgood consulted); the `rendering:` field record (Lina; Leonardo).

**Tasks round**:
- Plan decision 6, runner classes and required-check promotions: Peter's, on the measured-stability criterion (Requirement 2.12). The Xcode pin is a fork there: Xcode 26.x on `macos-26`, or 27.x, whose runner label is unverified (Kenya R1).
- The harness build unit and its grant for `harness/**`, the workflow and the `scripts/` driver; the other write-scope grants (design-outline.md § 4); a tasks-row grant to Lina for R1 under `src/cli/sync/**` names Ada consulted (Lina R1).
- The list's file format; whether the contexts run on every PR or on unit PRs only; `harness-generate`'s name.
- Order: rows 4 (item 2), 5 and 7 are small first Android fixes (Data R1); the first run after rows 4 and 6 land is the component repair's sizing event (Lina R1); Lina's L816 fix and the Icon-Base README record close before the harness's first runs.
- Parent splits (each its own parent, size flags): Requirement 9.2 (Ada); Requirement 6 (Ada); Requirement 4 as a generator parent (Ada) then a component parent (Lina).
- One INSTALL PR before each release's S for the limitation sentences (R1 Requirement 15.3).
- The second re-rule of the 15 intake records (Record dispositions). The MIDPOINT carrier, since 129 will declare three or more merge units (Stacy R1).
- Leonardo's suggestion that the harness consumer use D4's `ios/` and `android/` layout through `platforms:`, so Requirement 12 is accepted by the harness's own input.
- Whether `harness/**` and the comparator's source join Stacy's ARMING instrument-path list: law, so a ballot, named here and not proposed as a criterion (Stacy R1).

---

## Out of scope, with the reason

- D4–D10, option C (adopters build our components in their own app) and every test run: Spec 132's (plan-r2 § 1, § 2). So are row 14's behaviour items (Requirement 8.4).
- Row 14's web half (W1, W2) and row 13's item 2: their owner's fix-now (design-outline.md § 3).
- The iOS `\.dpTheme` backslash record: closed by #641 (`8fcf69b45`).
- The drift-report record: left out, and re-read at CLOSEOUT (dispositions, #13).
- A check that web component source resolves its tokens against a consumer's generated CSS: flagged by Sparky for 132's outline, not taken by 129.
