# Inbound to Spec 129 from Lina: the two-owner records, the component side of theme emission, and what reaches this spec from 130 and 128

**Date**: 2026-11-04
**Author**: Lina (component tier; owner of the component reads in the records below)
**For**: the design-outline round Thurgood authors. This inbound settles nothing. It names what I own that lands on Spec 129, its state at 16.2.0's S, and what the outline should carry. Every record keeps its own Trigger and Class; where an item lands in scope (i)–(vi) is the rounds' call.
**Authority for the round**: Peter, chat, received before 2026-11-04T03:19:41Z (orchestrator `date -u`), "Proceed as the team recommends", on the options message whose (a) opened this round with the step-2 update as its first draft. Authoring per Ada's R2 plan: Thurgood the outline, Ada one inbound replacing her two, Lina this one, Kenya and Data review.
**Read at**: S = `4d10202b2` (tag `v16.2.0`). `src/`, `token-index/` and `application-mcp-server/` are unchanged from S to the branch base `ee31decd3` (`git diff --stat 4d10202b2 ee31decd3 -- src token-index application-mcp-server` is empty), so line numbers hold at both.
**Gathering**: `.kiro/specs/131-governance-simplification/evidence/spec-facts.sh 129 618bcaf5b 4d10202b2`, output not committed. Its rows 3–9 were my starting list. Two of my findings below are in its blind spots: § 3.2's record is `manual` (row 3 does not list it), and § 3.3 is a premise no PR cites.

**Evidence labels**: **VERIFIED (Lina)** = I read it at S or ran the command named. **REPORTED (<seat>)** = a seat's reading I did not re-derive. **RELAYED** = stated in the orchestrator's brief, not found by me in a committed file or PR. Nothing here compiled Swift or Kotlin (R-2); `swiftc -parse` ran where named.

---

## 1. The two-owner P1 records

Ada's half of each is hers to write in her inbound. Mine follows.

### 1.1 `.kiro/issues/2026-10-24-android-component-unit-type-mismatches.md` (Lina; Ada on the generated types)

- **Group A is fixed.** #453 (`36ba2a55f`) removed 18 wrong `.dp` calls on 16 lines in 3 files, guarded by `src/components/__tests__/AndroidDpTokenReads.test.ts`. That is the record's own outcome line.
- **What remains, VERIFIED at S** (spot-read: `ChipBase.android.kt` L259–260, `BadgeCountBase.android.kt` L153, `InputTextBase.android.kt` and `ButtonCTA.android.kt` counts):
  - **Group B**: 12 sites, 5 files, `.sp`/`.dp` on a `Dp` fontSize.
  - **Group C**: 26 sites, 10 files, a `Dp` fontSize in a `Float` or `TextUnit` position. Plus `NavTabBarBase.android.kt` L326 (`Dp * Float` bound as a `Float`), which waits with C.
  - **Item 3**: `InputTextBase.android.kt` declares 34 properties with no initializer (L443–495), including `motionFloatLabelDuration` (L481). Of these, 8 are theme-varying colours and 16 are typography values sourced from `font_size_*`. Two name the retired `color.border` / `color.background`.
  - **Button-CTA**: 10 bare reads of `colorActionPrimary` / `colorBackground` / `colorContrastOnDark` that nothing in scope declares (the 2026-10-26 append).
- **What each waits on.** B, C and the typography half of item 3 wait on Ada's fontSize type (her I-2; Data consulted). The colour half of item 3 and Button-CTA wait on theme emission, item (i). Group A waited on nothing and is done.
- **What I ask of 129.** Take the record in. The component PR for B and C lands **in the same PR as the generator's fontSize change**, as I-1 already plans for sizing, so the harness reads both together and the tree is never half-converted. `AndroidDpTokenReads.test.ts` is two-sided on the generated type, so extending it to fontSize is mechanical. I write that extension.

### 1.2 `.kiro/issues/2026-10-26-token-index-platform-name-readers.md`, item 2 (Ada owns the record; item 2 is mine)

- **Item 1 is done at S, VERIFIED.** Both web resolve-guards type the index as `string | string[] | null`: `ContainerBase.token-resolution.test.ts` L54 and `InputTextFamily.token-resolution.test.ts` L52, with the flattening oracle.
- **Item 2 is open, VERIFIED.** `application-mcp-server/src/indexer/TokenIndexer.ts` L30 still types `platforms: { web: string; ios: string; android: string }`, and `platformNotes` is not declared. The record says item 2 lands "at Lina's next edit of the Application MCP or with item 3". I edited the Application MCP twice since then (#591, #596) without it. **That is my miss.**
- **The rider no longer applies.** The `search_tokens` match-signal rider moved off item 2 when #596 closed the stale-version record before item 2 opened (the rider's own condition). That signal's record now carries a Spec 131 Trigger.
- **What I ask of 129.** Leave item 2 **out** of the spec: it is a type and a re-baselined key-set guard in my write scope, not generation work. I open it as a small PR before 129's requirements commit, so the requirements round reads it as done. **Item 3** (the product-token generator, `src/build/product/**`, which needs a grant) is Ada's and is the record's 129 Trigger.

### 1.3 `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`

- **Native half → 129**: I1–I3 (iOS) and A1–A7 (Android). The outline already names them (#574) and ties them to the build-verification-harness unit, on Leonardo's condition.
- **Web half, fix-now by 16.3.0's S**: W1 (forced colors) and W2 (`prefers-contrast: high`). **I close both** in their owning component PRs, each with Sparky's browser line.
  - **W2 goes first.** Sparky's real-browser check runs first. Then one PR switches `high` → `more` across 20 rules in 18 components, and in the same PR flips the 9 pinned test assertions, the 2 contract lines, the README line and the 2 sync fixtures.
  - **Then W1**: forced-colors authoring for the drawn controls, checkbox and radio first.
- **When the Trigger moves.** The PR that closes the last web item re-rules the record's Trigger from `release:16.3.0:phase-1` to `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` for the native half. That is the record's own text (re-ruled 2026-11-01).
- **Two timing risks, stated so the outline does not assume them away:**
  1. If 129's requirements commit lands **before** that PR, the record's Trigger is not yet on 129, so the commit does not fire it. The requirements round must still read the native half, because the outline names it.
  2. If W1 or W2 is still open at 16.3.0's S, the record lapses **a second time**. Its first lapse is at `38f4ece47` (16.1.0's S). Under rule 11 a second P1 lapse goes to Peter with spec / drop / fix-now. That cost is mine, not 129's.
- **What the harness can and cannot close.** The native items are mostly **behaviour**: TalkBack and VoiceOver state text, hints, roles, focus. A build-verification harness proves the files compile; it does not prove what a screen reader says.
  - **Compile-checkable**: A3 (44 → 48dp), and A5/A7 (`rememberRipple` → `ripple(...)`). A5/A7 need a Compose version that has `ripple`, which the harness's pinned toolchain decides.
  - **Behaviour, needing a seat's device or emulator read**: I1, I2, I3, A1, A2 and A4. Kenya rules I1's trait pattern under the ratified § 1.2 rule.
  - **So the outline should not say the harness unit closes the native half.** It says the harness is the compile evidence and each behaviour item carries its platform seat's read.

---

## 2. The readiness test-pattern question (re-ruled to 129 in #640)

Record: `.kiro/issues/2026-10-13-native-readiness-test-patterns-miss-repo-tests.md`. The served-wording half shipped in #591 (`b77bd81ab`). #640 re-ruled the Trigger to this spec's `requirements.md` for the test-pattern half only.

**The question**: does a TS-side `*.ios.test.ts` / `*.android.test.ts` Jest file count as a native test? And would re-deriving the status change the served contract?

**Kenya's correction, VERIFIED at S** (`git ls-tree -r --name-only 4d10202b2 src/components`). The record's premise that most components have such tests and that the pattern misses them is false:

- `*.ios.test.ts` / `*.android.test.ts`: 2 components, Nav-SegmentedChoice-Base and Nav-TabBar-Base, one of each.
- `*Tests.swift` / `*Test.kt`: 2 components, Button-VerticalList-Item and Button-VerticalList-Set, one of each. These already match.
- `derivePlatformReadiness` patterns: `ComponentIndexer.ts` L919–920, unchanged.

So extending the patterns moves **2 of 34**, not 32. Most native implementations have no test of any form, and `hasTests: false` is mostly true. **Ada's 2026-10-30 inbound, open question 1, still states the old premise** ("Served readiness reads `scaffold` for most components because the pattern matches only…"). Her replacing inbound is the place to carry the correction. I flag it; the line is hers.

**Options for the requirements round** (listed, not picked):

- **(a) Leave the patterns as they are, and take the question out with a reason.** The served wording now says what `scaffold` means. A Jest file tests the TS side, not the Swift or Kotlin. Cost: two components keep reading `scaffold` beside real TS-side parity tests.
- **(b) Count the TS-side files.** Two components move to `development`. Cost: readiness then claims native tests that exercise no Swift or Kotlin, which is an overstatement where the record's class note says "understates, never overstates".
- **(c) Make the harness's per-component result a readiness input.** This is the only option that measures native code. Cost: it changes the served contract (a new field or a new status meaning), and it waits on the harness existing.

**My lean: (a) now, and (c) as a tasks-round question once the harness exists.** Working the counter-argument against it: (a) can read as dropping the question, so I folded in that it is left out *with* the reason above and with (c) named as its successor. **What survives:** (c) adds a served-contract change to a spec that is already large. Leaving it to the tasks round may mean it is never taken. This is a fork between (a) alone and (a)+(c), and it is the requirements round's to put to Peter. I do not pick it.

---

## 3. Component-side inputs to theme emission, item (i)

Ada's 2026-10-30 inbound § 1 names the generator half. Its verification step reads: "Lina confirms her components' `theme.<token>` reads match what is emitted." **At S they do not, for three reasons (§§ 3.1–3.3).** One more defect was found while counting (§ 3.4).

### 3.1 The theme key is never generated

- **VERIFIED.** `TokenFileGenerator.generateThemeOverrideBlocks` would emit `DPThemeKey: EnvironmentKey` with `EnvironmentValues.dpTheme`, and `LocalDPTheme` (defaults `name = 'DesignerPunk'`, `abbreviation = 'DP'`). It has no caller outside its tests, and nothing else in `src/generators`, `src/providers`, `src/build` or `src/cli` defines `dpTheme` or `LocalDPTheme`.
- **The shipped components read it anyway**:
  - iOS: 27 `@Environment(…dpTheme)` reads in 26 files. 18 have the key-path backslash at S; 9 do not.
  - Android: 25 files read `LocalDPTheme.current`.
  - One iOS file, `Button-VerticalList-Item/platforms/ios/VisualStateStyles.swift`, takes `any DesignerPunkTheme` in 11 places.
- **#641 is a fix in flight** (open at reading; `fix/ios-theme-environment-key-backslash`). It makes the nine edits from `@Environment(.dpTheme)` to `@Environment(\.dpTheme)`, which reverses that record's fork-D routing to Spec 131. Its body records `swiftc -parse` exit 0 before and after, and Kenya's PASS at parse level.
- **RELAYED**: Kenya's #641 verification shows the nine fixed reads still cannot type-check until 129 emits the key. The PR body states the same limit in its own words: "the edit is not shown to make any file type-check". After #641, spelling is no longer a reason the iOS tree fails; the missing key is.
- **Baseline for item (i)'s verification**: 27 iOS reads and 25 Android files, all spelled one way after #641.

### 3.2 Consumer abbreviation: the names the emitter would write are not the names the components read

- **VERIFIED.** The emitter derives its names from the config: `${abbreviation}ThemeKey`, `${lowerAbbr}Theme`, `Local${abbreviation}Theme`, `any ${name}Theme` (`TokenFileGenerator.ts` L1259–1267 and L1405). The product Kotlin emitter does the same (`KotlinEmitter.ts` L12).
- **So wiring the emitter makes the repo's own build define `dpTheme`, and nothing more.** In a consumer whose abbreviation is not `DP`, `generate` writes `\.acmeTheme` and `LocalACMETheme`, and every shipped component that reads `dpTheme` / `LocalDPTheme` / `DesignerPunkTheme` still fails to compile.
- **This is my record `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`** (P2 `(record)`, Trigger `manual`). One of its arms is "Spec 129's design phase opens on scope item (i)". **The outline does not name it.** spec-facts row 7 lists it; row 3 cannot, because the Trigger is `manual`.
  - **Ask**: the outline names it under item (i).
  - **My act**: from the merge that names it, I re-rule its Trigger to this spec's `requirements.md`, in a separate record-only commit.
  - The same record holds the `ContainerCardBase.ios.swift` L816 unterminated `/**`. **VERIFIED** with `swiftc -parse`: "unterminated '/*' comment". That file will be the harness's first iOS failure whatever item (i) does. It is a one-line fix in my scope, and I can land it before the harness unit if Thurgood wants the harness's first run to fail only for generation reasons.
- **Design fork for item (i)** (listed, not picked; Ada's generator seat and mine):
  - **(a)** Fixed names the components can hard-code (a protocol and key the package defines and a consumer's theme conforms to).
  - **(b)** Consumer-derived names, with components generic over the theme.
  - **(c)** Components regenerated per consumer.
  - The record's own text names (a) and (b).

### 3.3 Access form: components read static colours through `theme`, and the emitted theme carries only varying ones

- **VERIFIED, generator side.** `generateSwiftThemeTypes` builds the protocol from `varyingNames`: the override keys plus the tokens whose base light and dark differ. Kotlin works the same way. Static colours (`themeVarying: false`) stay on `DesignTokens`, per Ada's inbound § 1.
- **VERIFIED, component side.** A text scan of `theme.color…` reads in `platforms/ios/*.swift` and `platforms/android/*.kt`, comment lines and tests excluded, matched against `token-index/semantics.yaml` at S:

| | Reads of a varying colour | Reads of the five WCAG-only `theme.` names (`themeVarying: false`) | Reads of a colour the index names as static | Unmatched |
|---|---|---|---|---|
| iOS | 54 | 14 | **81, in 20 files** | 0 |
| Android | 50 | 11 | **92, in 17 files** | 0 |

- **What that means.** About 173 reads would not resolve against a theme object that carries only varying colours. Examples: `theme.colorIdentityHuman` (`Avatar.ios.swift` L538), `theme.color_scrim_standard` (`ProgressPaginationBase.android.kt` L170).
- **How confident the count is.** It is a lower-confidence count than a build: a regex sees no flow. But every matched name resolved to an index row, so it is not noise.
- **Why the baseline moved in this window.** #592 (`c176d2798`) re-pointed Avatar-Base and Container-Base to served names: Avatar's xxl border reads `theme.colorContrastOnDark`, and Container's border reads `theme.color_structure_border`. It deliberately **kept the `theme.` form for those static colours** and deferred the form to this spec. The archived record's outcome says so: "Whether the theme object carries static colours is Spec 129's item (i)." So #592 fixed names and added static-through-theme reads. Ada's R1 read (d) caught the moved baseline; no 129 file cites it.
- **Design fork for item (i)** (listed, not picked):
  - **(a) The theme object carries every semantic colour, static ones included.** No component change. Cost: generator output grows, and the theme protocol no longer means "what varies".
  - **(b) Components re-point static reads to `DesignTokens.<name>`.** About 173 reads in about 37 files. Cost: a large component PR. On iOS it also waits on `2026-10-26-ios-designtokens-members-not-public.md` (Ada), because 49 semantic colours are not `public` today.
- **How the two forks relate.** This fork and § 3.2's are separate, but both decide what a native component may write for a colour. I recommend the design round settles them together.

### 3.4 Found while counting: Progress-Bar-Base's six malformed reads

`ProgressBarTokens.theme.…` (iOS L54, L76), `ProgressBarTokens.intheme.…` (iOS L77) and `ProgressBarTokenstheme.…` (Android L91, L121, L160) are Spec 094 migration artifacts (2026-04-07) that name nothing. No record named them. **Filed in this commit**: `.kiro/issues/2026-11-04-progress-bar-native-theme-reads-malformed.md` (Lina; P1 consumer-blocking · defect; Trigger this spec's `requirements.md`). All six colours are static, so the fix follows § 3.3's fork.

### 3.5 Class option: a guard, not my read

**What I propose for item (i)'s verification line**: replace "Lina confirms her components' reads match what is emitted" with **a two-sided Jest guard in `src/components/__tests__/`**, my testing scope. It reads the generated Swift and Kotlin theme members and the component `theme.` reads, and fails on any read the generated output does not declare.

- The scan behind § 3.3 is its first draft.
- Its bite: today's tree turns it red on about 173 reads, plus Progress-Bar-Base.
- The pattern is `AndroidDpTokenReads.test.ts`.
- If it is registered as a named instrument, Thurgood is consulted.

**Cost**: one test file, and a pinned-shrinking list until item (i) and the component PR land.

**What survives the counter-argument**: a guard over generated text proves names resolve, not that the code type-checks. Only the harness proves that. So the guard narrows the harness's failures to real type errors; it does not replace the harness.

---

## 4. From my 130 and 128 reads, what lands on 129

- **Spec 130 (Input-Switch-Base, parked).** Two of its dependencies sit behind 129:
  - **N11's announcement evidence.** 130's outline § 10 says the iOS and Android "announces '<label>, switch, on'" criteria "ha[ve] no CI harness today". The same limit as § 1.3 applies: 129's harness, when built, gives 130 **compile** evidence, not announcement evidence. 130's requirements still choose the evidence class for announcements, so 129 should not be read as supplying it.
  - **C5 and C6 are theme-varying semantics** (130 § 6.2: the on fill and the off outline, both "NEEDED"). On native a theme-varying colour reaches a component only through the emitted theme. So 130's iOS and Android switch cannot read C5/C6 from generated output until item (i) lands. 130's web half does not depend on 129.
  - **Nothing in 129 should wait on 130.** 130 stays parked (Peter's "not now" on its R1, #642).
- **Spec 128 (React and React Native).** The 2026-10-20 seam ruling has 128 inherit 129's generator code. A React Native component reads a theme just as a SwiftUI or Compose one does. So **§ 3.2's naming fork and § 3.3's access-form fork bind 128's native-style reads too**. Deciding them once, in 129's design round, saves 128 a second sitting on them. This is my judgment, not a recorded ruling. 128's story 3 and item (vi) are already in the outline (2026-10-21 intake).
- **Not 129's**: my no-switch-binding line goes to 128's outline round (Thurgood/Leonardo), and the G-4 charter line naming the 130 switch merged in #640.

---

## 5. What the outline should carry, and what it should leave out

**Carry:**

1. **Name my records**, each by path with the half that is 129's:
   - the Android unit-type record (B, C, item 3, Button-CTA);
   - the drawn-control native half (I1–I3, A1–A7);
   - the readiness test-pattern question;
   - `2026-09-26-native-component-theme-hardcoding.md` (new to the outline);
   - `2026-11-04-progress-bar-native-theme-reads-malformed.md` (new).
2. **Two design-round questions under item (i)**: theme naming across consumers (§ 3.2) and the access form for static colours (§ 3.3). Listed as questions for the design round, not options to rule at the outline.
3. **Component PRs land in the same PR as the generator change they follow**: fontSize with groups B and C, emission with item 3's colours and Button-CTA, as I-1 already plans. The harness then never reads a half-converted tree.
4. **Harness scope, one line**: the harness is compile evidence. Screen-reader behaviour (drawn-control I1–I3, A1, A2, A4; 130's N11) needs a platform seat's read and is not closed by it.
5. **Item (i)'s verification is a guard** (§ 3.5), not an owner's confirmation by reading.
6. **Corrections to the outline's own lines**, which no longer match the records:
   - The 2026-10-30 intake says I "owe a dated CORRECTION line" (it landed 2026-11-01, the record's correction section), and that "each owner then re-rules" (done: drawn-control 2026-11-01, readiness in #640).
   - The 2026-11-01 batch names the whole token-index readers record. Only its item 3 is 129's (§ 1.2).

**Leave out:**

1. The web half of the drawn-control record (W1, W2) and Sparky's static-check fork: fix-now by 16.3.0's S, mine.
2. Token-index readers item 2: my fix-now (§ 1.2).
3. The readiness served-wording half: done in #591.
4. The iOS backslash record: fixed by #641. Its row in Spec 131's outline is Thurgood's to drop.
5. 130's token design (C5/C6 values, P-6, P-10, P-12, P-13): 130's rounds, not 129's.
6. Restated record contents. Cite the records; their bodies are the text of record.

**My counter-argument, worked against § 5.**

- **The objection**: putting two design forks (§§ 3.2, 3.3) into an outline round invites ruling design before requirements, the drift this round exists to end.
- **What I folded in**: they are carried as questions for the design round, with their costs, and the outline rules neither.
- **What survives:**
  1. Naming them now makes the outline longer, in a round Ada's R2 warned runs "under today's governance volume before 131 thins it".
  2. Leaving them out risks the design round meeting about 173 failing reads with no warning.

  I think the second cost is the larger. The outline's author weighs it.

*Signed: Lina, 2026-11-04.*
