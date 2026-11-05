# Requirements Document: 129 — Consumer-Generation Completeness

**Date**: 2026-11-05
**Spec**: 129 - Consumer-Generation Completeness
**Status**: Requirements Phase — R1 draft, for the seats' review (Spec-Feedback-Protocol § "Sequential Formalization Gate"). Design starts after this file is reviewed, incorporated and merged.
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
- **Stacy's handoff condition 1 is met**: the narrowing is on `main` (#652, #654) before this file merges (`stacy-plan-r1.md` § 1).

**129's part of done** is rows D1, D2 and D3 of `evidence/2026-11-05-native-plan/plan-r2.md` § 1 at `b89163c41` (Peter, "C yes"). Requirement 1 carries them. Rows D4–D10 are Spec 132's.

**How each requirement is written.** Each says what 129 delivers and how it is accepted. Each names its **instrument** and the **CI context where its run is recorded on the unit PR** (design-outline.md § 4, "Acceptance and its instrument"). A run on a seat's machine is a report a claims pass cannot re-check (Stacy R1). Where no instrument exists, the requirement says the acceptance is a named reading.

**Conventions.**
- Records are under `.kiro/issues/` and are named by file name. "Row N" is design-outline.md § 3's row number.
- **Harness contexts** (Q5's answer, design-outline.md § 5.1): `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens`, `harness-android-components`. The job that runs `generate` once and hands its output to them is `harness-generate` (Thurgood R4); the tasks round confirms its name and floor.
- **Existing contexts**: `lane-functional-root` (the root Jest suite, which also runs `npm run test:pack-contents`), `Consumer Guard` (the packed-install flow in `tests/consumer-integration.test.ts`), `lane-typecheck`.
- **"Accepted at a unit PR"** means the named context's conclusion at the head the unit merged, cited by run URL in the carrying parent's completion doc (Requirement 2.13).

---

## Requirements

### Requirement 1: Acceptance and 129's part of done

**Owner**: Thurgood (the criteria). Stacy verifies at CLOSEOUT under her charter. A change to a D row is Peter's.

**User Story**: As Peter, I want 129's "done" to be something CI and git confirm, not something an agent says, so that 129's CLOSEOUT cannot read green against a sentence written to be achievable.

**Instrument**: D1, `harness-ios-tokens` and `harness-android-tokens`. D2, the set-equality check in `harness-generate` (Requirement 5.2). D3, `harness-ios-components` and `harness-android-components`. Web, `Consumer Guard`.

#### Acceptance Criteria

1. The acceptance of Spec 129 SHALL be the charter's acceptance sentence at `b841db957`, and the quotation in this file's Introduction SHALL equal it byte for byte.
2. WHEN 129's final unit merges THEN `harness-ios-tokens` and `harness-android-tokens` SHALL conclude success at that head with zero entries on their expected-failure lists (D1).
3. WHEN 129's final unit merges THEN the D2 check SHALL conclude success at that head for iOS and Android: every component token in the consumer's merged index (`token-index/components.yaml`) appears in its generated output, and no component token outside the index does (D2).
4. WHEN 129's final unit merges THEN `harness-ios-components` and `harness-android-components` SHALL conclude success at that head, AND every entry still on their lists SHALL be tagged to an open root record whose Trigger can fire, AND no entry SHALL be tagged to row 12, row 14's items A5 or A7, row 15 or row 16 (D3; plan-r2 § 6 item 4; Stacy condition 3).
5. The component-tier entries 129 does not close SHALL be tagged to one record that Lina files from the harness's first committed run (plan-r2 § 6 item 7), and that record SHALL be at the issues root before 129's CLOSEOUT.
6. On web, "compiles" SHALL mean `Consumer Guard` concluding success at the final unit's head (charter § "Acceptance").
7. On iOS and Android, "themed" SHALL be accepted as compile evidence only: the emitted theme types exist, and the components' theme reads resolve against them, under the D1 and D3 contexts. 129 SHALL NOT claim runtime theme switching (Stacy R2 § 2b); that is Spec 132's D5.
8. "With nothing copied from `node_modules`" SHALL be accepted by the harness reading the consumer's output in place from a packed install (Requirement 2.1).
9. IF a D1, D2 or D3 row is to change THEN Peter's dated words approving the change SHALL be on the record before the change merges, AND this file SHALL cite the row at its new SHA (Stacy condition 2).

---

### Requirement 2: The compile harness

**Owners**: Kenya (iOS lanes), Data (Android lanes), Ada (the packed-install driver), Thurgood (the comparator and the workflow wiring). Ada and Lina are the verified parties.

**User Story**: As a claims verifier, I want every iOS and Android "compiles" in 129 to rest on a CI run at a merge SHA, so that no native row is accepted on a reading.

**Records**: row 23, `2026-09-17-platform-build-verification-harness-candidate.md` (its Trigger stays at `tasks.md`, where the build unit is declared).

**Instrument**: the four harness contexts and `harness-generate`; the comparator's falsification test (Requirement 3.10).

#### Acceptance Criteria

1. The harness SHALL take as input the output of `generate` in a scratch consumer created from a packed install (`npm pack`, install, `init`, `generate`), read in place. It SHALL NOT read the repository's own `dist/` (design-outline.md § 4, "The harness").
2. The harness consumer SHALL use a config abbreviation other than `DP`, stated in the committed pin file, so that row 15's defect shows (plan-r2 D1).
3. The harness input SHALL include a product-token fixture that `ref`s a WCAG-only colour and a composite token (Stacy R3, property 7; Ada R2 § 2a, row 13).
4. The harness SHALL compile, on iOS and on Android, the generated token files and DesignerPunk's native component source as shipped in the package, the components against the **consumer's** generated `ComponentTokens` (plan-r2 D3). It SHALL run no tests: `*Tests.swift` and `*Test.kt` files are not compiled or run.
5. The harness SHALL report four verdicts as four CI contexts (the Conventions above), each able to be made a required check on its own (Thurgood R4 § 2 item 1).
6. On iOS, a verdict SHALL come from a compile that emits object code for the module, not from a typecheck alone (Kenya R2: a typecheck passes code that a compile rejects). For the component verdict, the generated tokens and the packaged components SHALL compile as one module (no component file imports a token module). For the token verdict, a separate probe module SHALL read the generated members by plain `import`, never `@testable`, so that row 9 shows (design-outline.md § 4, "iOS module topology").
7. The probe SHALL be generated from the emitted members, so that every `public` member is read, AND it SHALL read the emitted theme under the names the components read (plan-r2 D1; Ada R2 § 2a, row 2).
8. A committed pin file SHALL pin the toolchain: Xcode, the SDK and the Swift language mode; Kotlin, the Compose BOM, AGP, `compileSdk` and `minSdk`; and each runner by a versioned label, never a `-latest` one. It SHALL pin Compose at 1.7 or later and say why: from 1.7 `rememberRipple` is an error, so row 14's A5 and A7 are compile evidence (Stacy R3, replacing her property 6; Data R2).
9. The pin file SHALL state that its pins are harness pins, not platform minimums. The minimums are Peter's (Open items, Design).
10. WHEN a 129 unit PR carries a row the harness accepts THEN all four harness contexts SHALL run on that PR (Stacy R2 § 2e). Whether they also run on every other PR is the tasks round's.
11. IF `harness-generate` fails or produces no output artifact THEN each compile context SHALL fail, not skip (Thurgood R4 § 2 item 2: a skipped job a required job needs reports success).
12. Each harness context SHALL enter as a non-required measuring lane. Promoting one to required is Peter's act for that context, on a measured-stability criterion the tasks round writes (plan-r2 § 7 decision 6).
13. WHEN a parent's completion doc cites a harness context as evidence THEN it SHALL cite the PR, the run URL at the head the unit merged, the comparator's summary line as printed, and the SHAs of the list file and the pin file at that head (Stacy R3 § 1; property 5).
14. The harness's first committed run SHALL be the baseline: each row a harness context accepts SHALL have at least one entry tagged to it on the list committed with that run, OR the requirement carrying the row SHALL name a different instrument for it (Stacy R3, condition 2).

---

### Requirement 3: The expected-failure list and its comparator

**Owner**: Thurgood (the instrument). Kenya and Data own how each platform's diagnostics are normalised. Stacy reads the comparator's falsification cases at review. The list's file format is the tasks round's.

**User Story**: As a claims verifier, I want "row N is fixed" to be decidable from git and one run, so that a red measuring lane is never read as broken and a green one is never read as "compiles".

**Instrument**: the comparator, run inside each harness context; its Jest falsification test in `lane-functional-root`.

#### Acceptance Criteria

1. Each harness context SHALL compare its observed diagnostics against a committed expected-failure list of its own.
2. Each entry SHALL be keyed by file and normalised diagnostic, carry a count, and carry a tag naming one root `.kiro/issues/` record, and that record's item where the record numbers or letters its items. No key SHALL contain a line number (Stacy R2, property 1; Stacy R3, condition 1; Thurgood R4).
3. **Two-sided.** WHEN an observed key is not on the list, OR an observed count is above or below its pinned count, OR a listed key does not occur THEN the context SHALL fail. A fix and its list edit therefore land in the same diff.
4. **Floor.** IF fewer files reach the compiler than the context's floor, zero included, THEN the context SHALL fail. List entries SHALL NOT count towards the floor.
5. **Additions.** WHEN an entry is added, or a count raised, relative to the list at the merge base THEN the context SHALL fail, unless the same diff changes the pin file, or the list does not exist at the merge base (the baseline run, Requirement 2.14). Each entry added under either exception SHALL be printed and SHALL carry a tag (Stacy R3 § 3).
6. **Tags resolve.** IF a tag does not name a record at the issues root at the PR's head, including a record under `archive/` or a missing file, THEN the context SHALL fail (plan-r2 § 5; Stacy condition 3).
7. **Retags.** WHEN the tag on an existing key changes THEN the comparator SHALL print `retagged: <key> <from> → <to>` and count retags in its summary line. IF a tag moves away from a record in the protected set (the records 129 takes in, listed in a committed file under `harness/`) THEN the context SHALL fail, unless the entry carries a `retagged:` field (date, owner, the record it came from) AND the same diff appends a line naming the key to that record (plan-r2 § 5; Stacy condition 4).
8. **Summary line.** Each run SHALL print one summary line with the expected count, the observed count, new failures, stale entries, retags, files compiled against the floor, and the entries remaining. WHILE a context's list holds entries, the line SHALL state the remaining count, so that a green reads "the failures match the list", not "compiles" (Stacy R3 § 1, property 8).
9. The comparator SHALL read no PR body and need no credential.
10. A Jest falsification test SHALL make the comparator fail once for each failure in criteria 3 to 7, and for the floor. It SHALL run in `lane-functional-root` and be registered in `.github/in-lane-guards.json` (Thurgood R4).

**Its limits, stated so they are not read as covered**:
- The comparator checks that a reason exists in git, not that it is a good one. That stays Stacy's reading.
- While a context is non-required, an added entry can merge over a red check; the next PR's base already holds it. Stacy's CLOSEOUT pass reads every addition from the list file's history over 129's range (Thurgood R4 § 1). A red harness context at a 129 merge is a finding on the author (Stacy R3, condition 3).

---

### Requirement 4: Native theme emission — item (i)

**Owners**: Ada (the generator); Lina (the component reads and the guard). Kenya and Data verify.

**User Story**: As an iOS or Android adopter, I want `generate` to emit the theme types my components read, so that the components compile against my own themed output instead of failing on a theme nothing defines.

**Records**: row 2, `2026-06-28-spec-094-platform-theme-emission-unwired.md`; row 15, `2026-09-26-native-component-theme-hardcoding.md` (the theme-name half); row 16, `2026-11-04-progress-bar-native-theme-reads-malformed.md`; row 12, `2026-10-24-android-component-unit-type-mismatches.md` (item 3's colours and Button-CTA).

**Instrument**: `harness-ios-tokens` and `harness-android-tokens` (the probe); `harness-ios-components` and `harness-android-components`; in `lane-functional-root`, Lina's guard and the existing generator tests (`src/generators/__tests__/SwiftThemeTypes.test.ts`, `KotlinThemeTypes.test.ts`).

#### Acceptance Criteria

1. WHEN a consumer runs `generate` THEN its output SHALL contain, for iOS, the theme protocol or struct and its `EnvironmentKey`, and for Android, the theme data class and its `CompositionLocal`, generated from the consumer's config (charter, item (i)).
2. The emitted theme SHALL carry every theme-varying semantic colour that the native base files leave out (charter, item (i), "Today"). The probe SHALL read each one under the name the components read.
3. The Spec 094 fixtures SHALL be re-baselined, deliberately, in the PR that wires emission, against the component reads as #592 (`c176d2798`) left them (design-outline.md § 4).
4. Lina's two-sided Jest guard in `src/components/__tests__/` SHALL fail on any component `theme.` read that the generated Swift or Kotlin does not declare, and SHALL carry a pinned list that only shrinks. It SHALL start guarding once item (i) emits and Q13 defines "declared"; until then it is a pinned baseline (design-outline.md § 4). If it is registered as a named instrument, Thurgood is consulted.
5. WHEN item (i)'s emission lands THEN row 12's item 3 colours and its Button-CTA reads SHALL land in the same PR (design-outline.md § 4, "Same-PR coupling").
6. Row 16's six reads SHALL be rewritten in the access form Q13 decides, and accepted by `harness-ios-components` and `harness-android-components`.
7. Row 15's theme-name defect SHALL be accepted by the component contexts under the non-`DP` consumer (Requirement 2.2). Its `ContainerCardBase.ios.swift` parse defect SHALL be fixed before the harness unit (Lina, design-outline.md § 4).
8. The product-token files in the harness input SHALL be compiled by the token contexts, and until item (i) emits, their entries SHALL be tagged to row 2's record (design-outline.md § 4, "Product tokens").
9. WHEN item (i) ships THEN Kenya's and Data's charter theming sections SHALL say what is emitted, and each SHALL re-confirm. That text is charter text, so Peter merges it.

**Carried to design**: Q12 (theme names across consumers) and Q13 (access form for static colours), settled together; the Android `CompositionLocal`'s default and kind. Owners Lina and Ada; Kenya and Data consulted. Both rulings stay provisional until Spec 132's D4 app builds (plan-r2 § 2, WP1). The dated pointer in 128's outline is Thurgood's, owed after the design ruling.

---

### Requirement 5: The component tier reaches the consumer's `generate` — item (ii)

**Owners**: Ada (the harvest, the precedence rule, the name contract); Lina (Spec 123 Requirement 1.5's recorded decision; row 18).

**User Story**: As an adopter, I want DesignerPunk's component tokens in my own generated output, bound to my primitives, so that our components compile against my tokens without anything copied from `node_modules`, and so that `sync` tells me when I break a name they rely on.

**Records**: row 3, `2026-08-13-component-token-platform-references-noncompiling.md`; row 13, `2026-10-26-token-index-platform-name-readers.md` (item 3 only); row 18, `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (R1 and R5 only).

**Instrument**: the D2 check in `harness-generate`; the token contexts for the `ComponentTokens` files; `Consumer Guard` for the name contract, the replacement report and R5; `lane-functional-root` for R1 and row 13's refusal half.

#### Acceptance Criteria

1. WHEN a consumer runs `generate` THEN DesignerPunk's component token definitions shipped in the package SHALL be harvested into the consumer's own generated output, with references emitted by name so that they bind to the consumer's primitives (charter, item (ii); plan-r2 § 2, WP1).
2. The D2 check (Requirement 1.3) SHALL run in `harness-generate` on each platform's output, under the precedence rule of criterion 3.
3. WHEN a consumer's component-token group and DesignerPunk's share an emitted group name THEN the consumer's SHALL win, AND `generate` SHALL report each replacement by group name (plan-r2 § 3, item 2).
4. **The name contract covers the component tier.** IF a consumer renames or deletes a primitive or semantic token that a shipped component token references THEN `sync` SHALL report it. `Consumer Guard` SHALL accept this with a packed-install case that deletes a referenced primitive (charter, "Counter-argument folded in, and what survives").
5. Spec 123 Requirement 1.5 SHALL be closed by a decision Lina records, saying that our component token definitions reach the consumer's harvest, and the decision SHALL cite D2, which Peter approved, as the definition it follows.
6. Row 13, item 3: the product-token emitters SHALL emit a valid reference for a composite token and for a WCAG-only colour. The token contexts SHALL accept it with the product-token fixture (Requirement 2.3), and a Jest test on `validateProductTokens` SHALL accept the refusal half (Ada R2 § 2a).
7. Row 18, R1: WHEN `sync`'s pre-123 migration meets a copied component-token file in the single-family form THEN it SHALL report the file by path and offer the record's fix. Accepted by a Jest test in `lane-functional-root`.
8. Row 18, R5: WHEN the generated output is not fresh against the inputs `generate` would read now THEN the name-contract run SHALL say so. `Consumer Guard` SHALL accept it with a case whose inputs change after the last `generate`.
9. Row 3's `ComponentTokens` platform references SHALL compile, accepted by the token contexts (its half is folded into row 4's item 1).

**Carried to design**: the precedence rule's detail (Ada; the merge moves from per token to per group, plan-r2 WP1); whether R5 compares versions or content (Q6; Ada's lean is content, her inbound § 2 item e); hand-written same-name declarations in the adopter's Kotlin package (plan-r2 § 3, item 3; Ada and Data); and whether `dist/ComponentTokens.*` keeps shipping (Requirement 10).

---

### Requirement 6: The generated native token files compile

**Owner**: Ada. Data is consulted on Kotlin types; Lina on the component side of each coupling.

**User Story**: As an iOS or Android adopter, I want the token files `generate` writes to compile, so that I am not the first person to run a Swift or Kotlin compiler on them.

**Records**: row 4, `2026-10-03-native-generator-findings-for-spec-129-intake.md` (four items); row 5, `2026-10-20-native-font-family-literals-unescaped-quotes.md`; row 6, `2026-10-20-kotlin-output-no-import-block.md`; row 7, `2026-10-24-kotlin-output-section-comment-bare-text.md`; row 8, `2026-10-24-native-primitive-values-do-not-match-declared-type.md`; row 9, `2026-10-26-ios-designtokens-members-not-public.md`; row 12, groups B and C, with Ada's I-1 and I-2.

**Instrument**: the token contexts; in `lane-functional-root`, Jest assertions on generator output for rows 5 and 8, and `src/components/__tests__/AndroidSizingDpReads.test.ts` and `AndroidDpTokenReads.test.ts`.

#### Acceptance Criteria

1. WHEN 129's final unit merges THEN no entry tagged to rows 3 to 9 SHALL remain on any token context's list (D1).
2. Row 9: every member of the generated token types that a consumer reads SHALL be `public`, accepted by the probe (Requirement 2.6 and 2.7).
3. Row 5: font-family values SHALL parse on both platforms. What a native font family emits is decided at design, and a Jest test on the generator output SHALL assert the result.
4. Row 8: each family's emitted native value SHALL match its declared type. Because a wrong percent radius compiles, a Jest test on the generator output SHALL assert what `radius_half` emits (design-outline.md § 4).
5. Row 6: the Kotlin import list SHALL be computed from the types emitted, and SHALL land with I-2 and row 4's colour decision, or in an order the three owners agree (design-outline.md § 4).
6. Rows 5 and 7 SHALL be the harness unit's first Android fixes, so that the Android output parses before its type errors are counted (Data R1 item 5).
7. WHEN sizing tokens are emitted as `Dp` (I-1) THEN Lina's removal of the 16 `.dp` sites SHALL land in the same PR, guarded by `AndroidSizingDpReads.test.ts`. Ada drafts the release note.
8. WHEN the `fontSize` type changes (I-2) THEN row 12's groups B and C SHALL land in the same PR, AND Lina SHALL extend `AndroidDpTokenReads.test.ts` to cover `fontSize`.
9. WHEN `getKotlinType` changes THEN the same PR SHALL bring the per-family Android type statements in `governance/platform-implementation-guidelines.md` into line. Lina drafts, Peter approves under the ballot-measure model, and the change is applied in that PR.

**Carried to design** (Ada decides; Data consulted on Android): the Kotlin type table as one decision (I-2's `TextUnit` or `Float`; `fontWeight`; a percent radius); native colour construction, a dependency or native values, once for both platforms (rows 4 and 11); and what a native font family emits (row 5).

---

### Requirement 7: Shadow colours and their OKLCH root

**Owner**: Ada. Any system token this creates is reviewed by Peter.

**User Story**: As an adopter on any platform, I want every shadow's colour to resolve to a token that exists, so that shadows compile and render instead of pointing at nothing.

**Records**: row 10, `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`; row 11, `2026-06-24-oklch-shadow-color-family-not-migrated.md`.

**Instrument**: the token contexts (the native half); a Jest test of `ColorReferenceEmissionValidator` with `KNOWN_UNEMITTED_SHADOW_COLORS` emptied, in `lane-functional-root`; a `Consumer Guard` assertion that `generate`'s output names no unemitted shadow colour (Ada R2 § 2a, row 10).

#### Acceptance Criteria

1. Every shadow composite's colour reference SHALL resolve on web, iOS and Android.
2. The fix SHALL remove `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning `generate` prints. Peter, 2026-10-25: "Let's go with A, but we need to remember to remove the warning when we do the work in 129".
3. WHERE the fix creates or changes a colour primitive, the design SHALL name each token, so that Peter's review happens at design and not in a fixing PR (Core Goals; design-outline.md § 4, "Token creation").

---

### Requirement 8: The component repairs 129 closes, and the drawn-control record's native half

**Owner**: Lina. Kenya and Data verify.

**User Story**: As Peter, I want the component defects that 129's own rows name closed by a compile, and the behaviour items named with the instrument that can actually accept them, so that no compile is read as proving behaviour.

**Records**: row 12 (groups B and C, item 3, Button-CTA); row 14, `2026-10-18-drawn-control-drift-ios-android-web.md` (the native half: I1–I3 and A1–A7); row 15 (its parse defect); row 16.

**Instrument**: the component contexts; per item below.

#### Acceptance Criteria

1. Requirement 1.4 binds: at 129's final unit, no component-context entry SHALL be tagged to rows 12, 14 (A5, A7), 15 or 16.
2. Row 14's A5 and A7 (`rememberRipple` to `ripple(...)`) SHALL be accepted by `harness-android-components` under the Compose pin of Requirement 2.8.
3. Row 14's A3 (44 to 48 dp) compiles either way. IF its F-3 disposition keeps the change in 129 THEN a text guard of the `AndroidDpTokenReads` kind in `lane-functional-root` SHALL accept it; otherwise Lina SHALL record its new disposition in the record.
4. Row 14's I1, I2 and I3 (VoiceOver) and A1, A2 and A4 (TalkBack and key handling) have no CI instrument in 129: no compile proves behaviour, and 129 runs no tests (design-outline.md § 4). Each one fixed in 129 SHALL be accepted as a labelled reading that names the seat, the device or emulator and its OS version (Kenya for I1–I3, Data for A1, A2 and A4). An item 129 does not fix SHALL move to Spec 132's D6 by Lina's re-rule of that half.
5. WHERE a 129 component PR touches a file that also fails for reasons outside 129's rows, the PR MAY fix those, removing their entries in the same diff (plan-r2 § 2, WP3).

---

### Requirement 9: `generate` reads the consumer's own source — item (vi) and the palette

**Owners**: Lina and Ada (item (vi), per the charter); Ada (the palette and the base config).

**User Story**: As an adopter who owns their token source under Model B, I want `generate` to read my copy, not the installed package, so that my palette and theme edits change my output and a package upgrade does not change it silently.

**Records**: row 19, `2026-10-15-123-palette-read-from-package.md`; row 20, `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (row (g) only).

**Instrument**: `Consumer Guard` (one packed-install case per part); `lane-functional-root` (row (g)'s check).

#### Acceptance Criteria

1. Item (vi), Q3a, SHALL be decided in the design round, which the charter names as the place it is decided and not just carried. The decision SHALL state its effect on item (i) and on the caveat that a custom theme does not emit on web.
2. WHEN a consumer edits a part their copied token source holds, for each of the six groups INSTALL's limitation line names (row 19, taken as Ada's inbound § 3 asks, not as the record title's "five parts"), and runs `generate` THEN the output SHALL change to match. `Consumer Guard` SHALL hold one case per group (the record's § "What closes it").
3. IF item (i) ships before criterion 2 THEN that release's CHANGELOG limitation SHALL be rewritten to say what still comes from the package, not removed (Q11; Ada's inbound § 3).
4. Row (g): a Jest test SHALL fail when the repository's root token files differ from a fresh generation from the base config. It SHALL land in the PR that makes `themes` non-empty or changes how the config is read (the record; Ada's inbound § 3).

**Carried to design**: Q3b, the web `data-theme` selector's scope. It changes what the web generator builds, so it goes to Peter as a fork, with a browser check in hand first (design-outline.md § 5.2). Owner Ada; Leonardo co-owns the intent; Sparky runs the browser check.

---

### Requirement 10: Retire the native root files, and name what may break — item (iii)

**Owner**: Ada. The release author words the notes.

**User Story**: As an adopter, I want the package to stop shipping token snapshots I could mistake for my own, and to be told plainly when that happens, so that my build reads only my generated output.

**Instrument**: `npm run test:pack-contents` (`scripts/pack-assert.ts`, in `lane-functional-root`).

#### Acceptance Criteria

1. WHEN items (i) and (ii) have shipped THEN the package SHALL stop shipping `dist/DesignTokens.ios.swift` and `dist/DesignTokens.android.kt`, in the release Peter's decision 7 places (Open items, Design), AND `pack-assert` SHALL assert they are absent. The web CSS exports stay (charter, item (iii)).
2. The release that retires them SHALL announce the retirement in its notes. 15.0.0 announced no deprecation (charter, item (iii)).
3. The package's native resource folders SHALL hold only resources, asserted by `pack-assert` (plan-r2 § 2, WP1: the Icon-Base `README.md` case).
4. Each 129 change that may break a consumer of native output (item (iii), I-1, I-2) SHALL be named in its release's notes. IF the design round finds that one breaks a supported consumer THEN it SHALL go to Peter with the 17.0.0 charter quoted (Q7; `.kiro/issues/2026-11-01-17-0-0-release-charter.md`, "Breaking changes ship together there").

**Carried to design**: whether `dist/ComponentTokens.*` keeps shipping. The charter's item (iii) says it does; plan-r2 WP1 says it stops under item (iii). Ada, as charter owner, with Lina.

---

### Requirement 11: `init` runs `generate` — item (iv)

**Owners**: Ada (`init`, `generate`); Thurgood (the INSTALL derivation and its test). Leonardo is consulted on the founder journey.

**User Story**: As a stranger founding a project, I want `init` to produce my own token output, so that my first render already uses my artifacts and I skip a step.

**Instrument**: `Consumer Guard`; `scripts/__tests__/install-doc.test.ts` in `lane-functional-root`.

#### Acceptance Criteria

1. WHEN a consumer runs `init` THEN `init` SHALL run `generate`, which writes to the config's `output` key (design-outline.md § 1, the correction to item (iv)). `Consumer Guard` SHALL assert the output exists after `init` alone.
2. Personal-note creation SHALL stay in the CLI layer and SHALL NOT move into `src/generators/generateTokenFiles.ts` (Ada, 2026-10-03, design-outline.md § 5.2 Q4).
3. IF item (iv) changes the founder path's step count THEN INSTALL's `path-steps` front matter and `install-doc.test.ts` SHALL change in the same PR (Q4). Spec 123's DD9 criterion closed with that spec's Task 22 and is not reopened.

**Carried to design**: the founder count itself, and whether a separate `generate` step stays documented. Ada; Leonardo consulted.

---

### Requirement 12: Per-platform output paths — item (v)

**Owner**: Ada.

**User Story**: As an adopter with an iOS or Android app, I want each platform's output written where that platform's build reads it, so that I do not move files by hand after every `generate`.

**Instrument**: `Consumer Guard` (a packed install with a `platforms:` config); `lane-functional-root` (the config's validation).

#### Acceptance Criteria

1. The consumer config SHALL accept a `platforms:` key that names, per platform, where its output lands (charter, item (v)). This is new work: neither `PLATFORM_KEYS` nor the key exists in code (design-outline.md § 1).
2. WHEN `generate` runs with `platforms:` set THEN each platform's output SHALL land at its configured path. WHEN it runs without `platforms:` THEN output SHALL land where it does today.
3. IF a `platforms:` entry names a platform the generator does not know THEN `generate` SHALL fail with a message naming it.

---

### Requirement 13: Validators and config types every consumer runs

**Owner**: Ada.

**User Story**: As an adopter, I want `validate` to pass on unmodified source, component-token custom values to be checked, and the theme override type to be importable, so that the tools I run tell me the truth.

**Records**: row 1, `2026-06-24-mathematical-relationship-parser-validation-gaps.md`; row 21, `2026-10-24-component-token-custom-values-unvalidated.md`; row 22, `2026-10-03-semantic-override-map-type-not-exported.md`.

**Instrument**: row 1, a Jest test in `lane-functional-root` and a `validate` run in `Consumer Guard`; row 21, a ruling at design, then a `Consumer Guard` case and a Jest test; row 22, `tsc --noEmit` in `Consumer Guard` on a consumer `.ts` file that imports the type (Ada R2 § 2a).

#### Acceptance Criteria

1. WHEN `validate` runs on unmodified DesignerPunk token source THEN its mathematical-relationship check SHALL report no failure for a token that meets its declared relationship (row 1).
2. Row 21: the rule for component-token custom values SHALL be ruled at design. WHEN a component token's custom value does not conform to it THEN `generate` SHALL fail with a message naming the token.
3. Row 22: WHEN a consumer's TypeScript imports `SemanticOverrideMap` from `@3fn/core/config` THEN it SHALL type-check.

---

### Requirement 14: Native readiness test patterns — row 17 (Q10)

**Owner**: Lina.

**User Story**: As an adopter reading served readiness, I want it never to claim native tests that exercise no Swift or Kotlin, so that readiness understates rather than overstates.

**Records**: row 17, `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` (the test-pattern half).

**Instrument**: git. Criterion 1 holds when `derivePlatformReadiness`'s patterns in `application-mcp-server/src/indexer/ComponentIndexer.ts` are unchanged over 129's range; no CI context is needed.

#### Acceptance Criteria

1. 129 SHALL leave `derivePlatformReadiness`'s native test patterns unchanged (option (a)), for the reason Lina gives: a TS-side Jest file tests the TS side, not the Swift or Kotlin (her inbound § 2).
2. Option (c), the harness's per-component result as a readiness input, SHALL be carried by Spec 132's D7 (plan-r2 § 1, D7: "132 (129's Q10 (c))"). 129 SHALL NOT change the served readiness contract.

**A reading, for Lina to confirm in R1.** The outline left the fork between (a) alone and (a) plus (c) for this round to put to Peter. The plan Peter approved as a whole already puts (c) in D7, which he rules at 132's outline (`evidence/2026-11-05-native-plan/README.md`). I read that as settling where (c) lives, not as Peter ruling (c) itself. If Lina reads it otherwise, the fork goes to Peter in R2.

---

### Requirement 15: Shipped wording follows the instrument

**Owners**: Thurgood (release text; the limitation-marker test); each row's owner (its sentences); Kenya and Data (the "Native status" passage). Stacy reads release text at RELEASE under her charter.

**User Story**: As an adopter, I want shipped text to claim exactly what the checks prove, so that "compiles" never means more than a pinned list allows.

**Instrument**: `scripts/__tests__/install-doc.test.ts` in `lane-functional-root`.

#### Acceptance Criteria

1. WHILE a harness context's list holds entries, no shipped text (CHANGELOG, INSTALL, the Integration Guide, a README) SHALL say that tier "compiles". The release that carries the harness SHALL say "compile except N pinned errors, listed at <path>; no app linked, no tests run", with N the list's count at that release's S (plan-r2 § 4).
2. Each limitation sentence in the Integration Guide's install region that a 129 row fixes SHALL carry `<!-- limitation: .kiro/issues/<file>.md -->`, AND `install-doc.test.ts` SHALL fail when a marked record is under `archive/` or missing while its sentence remains (plan-r2 § 5, the answer to Ada). Ada is consulted.
3. The edits to those sentences SHALL be batched into one INSTALL PR before each release's S (plan-r2 § 4).
4. WHERE a 129 row creates or changes a token, its token-family documentation SHALL change in the same PR (Process-Spec-Planning § "Documentation Requirements").

**Documentation waiver, partial**: 129 creates no component, so no new component README is required. A component README changes only where a 129 PR changes the behaviour or the token reads it documents.

---

## Record dispositions: the records this file's path triggers

These 17 root records carry a Trigger glob on this file (facts row 3, 10 of them P1). Each needs a disposition here, or it is a finding (Stacy).

**What "intake" obliges.** Under Process-Spec-Planning § "Before Formalizing: Records That Name the Spec", the owner re-rules the Trigger to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` until tasks.md numbers the carrying parent, and never to `requirements.md` or `design.md`. Under README rule 11, a record lapses at its firing commit unless an ancestor of that commit re-ruled or closed it. So **each owner's re-rule or close lands as a record-only commit on this branch, or in a PR that merges before it**. Otherwise these records lapse at this file's merge: ten first P1 lapses.

| # | Record | Owner | Disposition | Carried by | Owner's act before this file merges |
|---|---|---|---|---|---|
| 1 | `2026-06-28-spec-094-platform-theme-emission-unwired.md` | Ada | intake | Req 4 | re-rule to `completion/claims-pass.md` |
| 2 | `2026-10-20-native-font-family-literals-unescaped-quotes.md` | Ada | intake | Req 6.3, 6.6 | re-rule, as #1 |
| 3 | `2026-10-20-kotlin-output-no-import-block.md` | Ada | intake | Req 6.5 | re-rule, as #1 |
| 4 | `2026-10-24-kotlin-output-section-comment-bare-text.md` | Ada | intake | Req 6.6 | re-rule, as #1 |
| 5 | `2026-10-24-native-primitive-values-do-not-match-declared-type.md` | Ada | intake | Req 6.4 | re-rule, as #1 |
| 6 | `2026-10-26-ios-designtokens-members-not-public.md` | Ada | intake | Req 6.2 | re-rule, as #1 |
| 7 | `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` | Ada | intake | Req 7 | re-rule, as #1 |
| 8 | `2026-06-24-oklch-shadow-color-family-not-migrated.md` | Ada | intake | Req 7 | re-rule, as #1 |
| 9 | `2026-10-26-token-index-platform-name-readers.md` | Ada (item 3); Lina (item 2) | intake, item 3 | Req 5.6 | Ada re-rules, as #1. Item 2 is Lina's fix-now "before the requirements commit" (design-outline.md § 3 row 13); at `45f5262ee` it has not landed (`application-mcp-server/src/indexer/TokenIndexer.ts` L30 still types `platforms` as three strings; read by Thurgood) |
| 10 | `2026-10-24-component-token-custom-values-unvalidated.md` | Ada | intake | Req 13.2 | re-rule, as #1 |
| 11 | `2026-10-15-123-palette-read-from-package.md` | Ada | intake | Req 9.2, 9.3 | re-rule, as #1 |
| 12 | `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` | Ada | intake, row (g) only | Req 9.4 | re-rule, as #1. Row (h) stays fix-now by 16.3.0's S under its own record |
| 13 | `2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` | Ada | **re-rule or close (Ada's choice); proposed: out of 129** | none | not named by the outline (facts row 4). Proposed out because under Model B it is a convenience, not a defect (the record, Sparky's R1), and 129 is already large. Ada may instead take it in, and it becomes a requirement in R2. A P3 that rides another change takes `manual` naming its own fixing PR (README rule 1) |
| 14 | `2026-10-24-android-component-unit-type-mismatches.md` | Lina | intake | Req 4.5, 6.7, 6.8, 8 | re-rule, as #1 |
| 15 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` | Lina | intake | Req 4.6, 8 | re-rule, as #1 |
| 16 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | Lina | **close** (option (a)), or re-rule if Lina does not confirm Req 14's reading | Req 14 | rule 5's dated outcome line, naming Req 14 and D7 as (c)'s successor |
| 17 | `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` | Lina | intake, R1 and R5 | Req 5.7, 5.8 | re-rule, as #1 |

**Counts**: carried 15 (intake), re-ruled or closed by choice 2 (rows 13 and 16), none 0.

The other records E2's grep finds, the outline rows this file does not trigger, and the planned re-rule targets for rows 14 and 15 of the outline are dispositioned in `feedback/requirements.md` § "Context for Reviewers".

---

## Open items for design and tasks

Named so they are not decided silently. None is a question for Peter at this gate.

**Design round**:
- **Peter's, at design** (`evidence/2026-11-05-native-plan/README.md`): plan decision 4, the iOS minimum; decision 5, the Android minimum and its toolchain range; decision 7, when native becomes a semver promise (it places Requirement 10.1).
- Q3a, item (vi)'s source (Lina, Ada). Q3b, the web selector's scope (Ada; Leonardo; Sparky's browser check first; then a fork for Peter).
- Q6, R5: versions or content (Ada).
- Q12 and Q13 together (Lina, Ada; Kenya and Data consulted), provisional until 132's D4.
- The Kotlin type table (Ada; Data consulted). Native colour construction (Ada). Row 5's native font family (Ada). Item (i)'s Android `CompositionLocal` default and kind (Ada; Data consulted).
- Row 11's tokens, named for Peter's review (Ada). Row 21's rule (Ada).
- Item (ii)'s precedence detail and the Kotlin same-name fix (Ada; Data). Whether `dist/ComponentTokens.*` keeps shipping (Ada, Lina).
- Q4's founder count (Ada; Leonardo consulted).
- **Spec 132 inputs drafted during 129's design round, not 129 acceptance** (plan-r2 § 6 item 5): the access-level ballot (Lina); the per-platform contract validation ballot (Lina; Thurgood consulted); the `rendering:` field record (Lina; Leonardo).

**Tasks round**:
- Plan decision 6, runner classes and required-check promotions: Peter's, on the measured-stability criterion (Requirement 2.12).
- The harness build unit and its grant for `harness/**`, the workflow and the `scripts/` driver; the other write-scope grants the rows need (design-outline.md § 4, "Write scope the rows need").
- The list's file format; whether harness contexts run on every PR or on unit PRs only; `harness-generate`'s name and floor.

---

## Out of scope, with the reason

- D4–D10, option C (adopters build our components in their own app) and every test run: Spec 132's (plan-r2 § 1, § 2).
- Row 14's web half (W1, W2) and row 13's item 2: their owner's fix-now (design-outline.md § 3).
- The iOS `\.dpTheme` backslash record: closed by #641 (`8fcf69b45`).
- The drift-report record (dispositions, row 13): out unless Ada takes it in.
