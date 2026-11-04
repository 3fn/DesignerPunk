# Design Outline: 129 — Consumer-Generation Completeness

**Date**: 2026-10-03 (placeholder); outline round opened 2026-11-04
**Spec**: 129 — Consumer-Generation Completeness
**Author**: Thurgood (formalizer). Owners, per the charter header: Ada (pipeline and generators), Lina (component tier). Peter decides at each gate.
**Status**: **Outline round, R1 folded** (six reviews; incorporation in `[THURGOOD R2]`). Peter's go (2026-11-04) is recorded in `feedback/design-outline.md`, entry `[PETER]`; this draft is the step-2 update and the round's first draft in one, his option (a). Nothing here is a requirement. The requirements round places § 3's rows and answers § 5.2. § 5.1's one question is open for Peter at this outline's gate.

---

## 1. Principle, scope and acceptance (by pointer)

The principle, the scope items (i)–(vi), the acceptance sentence, the consequence recorded for release 3, and the counter-arguments folded in and surviving are chartered in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`, sections "The principle (Peter's choice)", "Scope", "Acceptance", "Consequence recorded now" and "Counter-argument folded in, and what survives". They are not restated here; the charter is the text of record.

Two corrections to the charter's wording, carried for the requirements round:
- **Item (iv)** reads "`init` runs `generate`, which writes to the config's `output`." The charter's "with `--output`" names a flag `generate` does not have; the config's `output` key is meant (Ada, inbound 2026-11-04 § 2 item g).
- **Item (v) is new work.** `PLATFORM_KEYS` and a `platforms:` config key exist only as recorded recommendations, not in code (Ada's 2026-10-21 read).

**Relation to other specs:**
- **128**: Spec 129 owns native theme emission, item (i). 128 inherits the same generator code. Source: Peter's 2026-10-20 seam ruling, `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log", its 2026-10-20 entry on the 129/128 seam, with § 5 and § 3.2. Any adopter-ingested theme tier (128's story 3) waits for item (vi)'s design ruling or restates it.
- **130**: on iOS and Android, 130's switch reads its theme-varying colours (C5, C6) only through the emitted theme, so they wait on item (i). 129's harness gives 130 compile evidence, not announcement evidence (Lina, inbound 2026-11-04 § 4). Nothing in 129 waits on 130.
- **Order**: 129 → 131 → 128 → 130 (`.kiro/issues/2026-11-01-17-0-0-release-charter.md`, "The sequencing 129 → 131 → 128 → 130 is unchanged").

**Inputs to this round**: `inbound-from-ada-2026-11-04.md` and `inbound-from-lina-2026-11-04.md`. Ada's new inbound replaces her two older ones, which carry Superseded lines; detail it points to still holds there: item (i)'s three design defaults (`inbound-from-ada-2026-10-30.md` § 1) and I-1 and I-2 (`inbound-from-ada-android-generator-defects-2026-10-24.md` § I-1, § I-2). The harness owners' evidence is `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "Evaluation entry (2026-10-20) — § 3 trigger 2 fired (#432); owners' evaluation".

---

## 2. Peter's words that bind this spec

- **2026-10-20**, on the mathematical-relationship parser record (issues walk, PETER item 2; ledger `.kiro/issues/archive/TRIAGE-2026-10-20.md`): "Fold it into the spec".
- **2026-10-25**, on the shadow-colour warning (`.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`, its "Pin ruled" paragraph): "Let's go with A, but we need to remember to remove the warning when we do the work in 129".
- **17.0.0 charter** (`.kiro/issues/2026-11-01-17-0-0-release-charter.md`): "Breaking changes ship together there."
- **2026-11-04**, the go for this round: recorded in the feedback doc (Status line above).

Peter's 2026-10-02 and 2026-10-03 directions that created this spec are in the charter's **Source** line and in this file at `618bcaf5b`, § "Notes carried in", notes 1 and 2.

---

## 3. Records this spec takes up

Each row names a record by path. Owner, 129's part and scope item are a reading; the requirements round takes each record in or leaves it out with a reason (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec"). "Fires at" is the event its Trigger names: **the requirements commit does not fire rows marked CLOSEOUT, tasks, manual or 16.3.0**, so this row is what brings them in. Every record keeps its own Trigger.

All paths are under `.kiro/issues/`.

| # | Record | Owner | 129's part | Proposed under | Fires at |
|---|---|---|---|---|---|
| 1 | `2026-06-24-mathematical-relationship-parser-validation-gaps.md` | Ada | all (a validator, every consumer) | new item | CLOSEOUT |
| 2 | `2026-06-28-spec-094-platform-theme-emission-unwired.md` | Ada | all | (i) | requirements |
| 3 | `2026-08-13-component-token-platform-references-noncompiling.md` | Ada | all | (ii) | CLOSEOUT |
| 4 | `2026-10-03-native-generator-findings-for-spec-129-intake.md` | Ada | all (four items) | native output | CLOSEOUT |
| 5 | `2026-10-20-native-font-family-literals-unescaped-quotes.md` | Ada | all, and what a font family emits on native (§ 5.3) | native output | requirements |
| 6 | `2026-10-20-kotlin-output-no-import-block.md` | Ada | all | native output | requirements |
| 7 | `2026-10-24-kotlin-output-section-comment-bare-text.md` | Ada | all | native output | requirements |
| 8 | `2026-10-24-native-primitive-values-do-not-match-declared-type.md` | Ada | all | native output | requirements |
| 9 | `2026-10-26-ios-designtokens-members-not-public.md` | Ada | all | native output | requirements |
| 10 | `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` | Ada | all, plus the warning removal (§ 2) | new item, with row 11 | requirements |
| 11 | `2026-06-24-oklch-shadow-color-family-not-migrated.md` | Ada | all; the root of row 10 | with row 10 | requirements |
| 12 | `2026-10-24-android-component-unit-type-mismatches.md` | Lina (component reads); Ada (emitted types) | Lina: groups B and C, item 3, Button-CTA. Ada: I-1 (sizing as `Dp`), I-2 (the `fontSize` type, Data consulted). Group A is done | native output and (i) | requirements |
| 13 | `2026-10-26-token-index-platform-name-readers.md` | Ada (item 3); Lina (items 1, 2) | **item 3 only**, the product-token generator under `src/build/product/**` (needs a grant, § 4). Item 1 is done; item 2 is Lina's fix-now before the requirements commit | (ii) or new item | requirements |
| 14 | `2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | **the native half only**: I1–I3, A1–A7. The web half (W1, W2) is fix-now by 16.3.0's S, outside this spec; the PR that closes the last web item re-rules the Trigger to this spec's requirements | A5, A7: the pinned harness; A3: a guard, after its F-3 disposition; I1–I3, A1, A2, A4: a platform seat's read (§ 4) | 16.3.0 |
| 15 | `2026-09-26-native-component-theme-hardcoding.md` | Lina (Kenya, Data verify) | the theme-name hardcoding (question 12), and the `ContainerCardBase.ios.swift` L816 parse defect. Lina re-rules the Trigger to this spec's `requirements.md` in a record-only commit after the merge that names it | (i) | manual |
| 16 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` | Lina | all six reads; the fix follows question 13 | (i) | requirements |
| 17 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | Lina | **the test-pattern half only** (question 10); the served-wording half shipped in #591 | new item | requirements |
| 18 | `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` | Lina | **R1 and R5 only** (question 6) | (ii) | requirements |
| 19 | `2026-10-15-123-palette-read-from-package.md` | Ada (Lina consulted) | all; take INSTALL L77's six groups, not the title's "five parts" | (ii), and (vi)'s question | requirements |
| 20 | `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` | Ada | **row (g) only**, the base-config freshness check; row (h) is fix-now by 16.3.0's S | (i), (vi) | requirements |
| 21 | `2026-10-24-component-token-custom-values-unvalidated.md` | Ada | all | new item | requirements |
| 22 | `2026-10-03-semantic-override-map-type-not-exported.md` | Ada | all | new item | CLOSEOUT |
| 23 | `2026-09-17-platform-build-verification-harness-candidate.md` | Kenya, Data (designers); Ada, Lina (verified parties) | all: the acceptance instrument. The requirements round names it (Q5); the tasks round declares its build unit | acceptance | tasks |

**Also named**: `2026-10-24-native-theme-emission-owner-stated-two-ways.md` (Thurgood; Trigger on Spec 131). Its 129 half, saying in words that 129 owns native theme emission, is done in § 1 and Q2.

**Left out, with the reason** (each is outside this spec):
- `2026-10-03-ios-theme-environment-key-missing-backslash.md`: a fix in flight in #641. Once it merges, the nine iOS reads are spelled `\.dpTheme`, which item (i) on iOS needs.
- Row 13's item 2 and row 14's W1/W2: their owner's fix-now, as above.

---

## 4. What the rows carry beyond naming

**Acceptance and its instrument.** Each row is accepted by a named instrument, not by a reading.
- Which instrument it is, and what it compiles, is Q5.
- The requirements round names the instrument for each row, and where its run is recorded: a CI context on the unit PR. A run on a seat's machine is a report the claims pass cannot re-check (Stacy R1).
- The requirements round does not leave the instrument to the tasks round, which only builds it. The harness record's Trigger stays at `tasks.md`, where the build unit is declared.
- Until a Kotlin compiler has run, every Android "does not compile" is a reading.

**What a compile can and cannot accept.** A compile proves that code parses and type-checks under a pinned toolchain. It proves no behaviour.
- **Screen-reader speech** stays with each platform seat's device or emulator read: drawn-control I1, I2 and I3 (Kenya), and 130's N11 announcements.
- **The semantics Android sets** (A1 `stateDescription`, A2's hint, A4's key handling) can partly be asserted by a Compose semantics test. That is a third rung above compiling, and none of Q5's options builds it (Data R1 item 9).
- **Drawn-control A5 and A7** (`rememberRipple` → `ripple(...)`) are compile evidence only if the pin and a warning policy make the old form fail. A deprecation warning still compiles (Data R1 item 7).
- **Drawn-control A3** (44 → 48dp) **and row 8's `radius_half = 50.dp`** compile and are wrong. Each needs a text guard or a Compose test, and A3 needs its F-3 disposition first.
- So no compile lane closes row 14's native half.

**The harness, whichever option Q5 picks** (Kenya R1, Data R1; the tasks round sizes it):
- **Input**: the output of `generate` in a packed install (`npm pack`, a scratch consumer, `init`, `generate`). Never the repo's own `dist/`, which is un-themed and cannot show item (i).
- **Pins**: Xcode, the SDK and the Swift language mode; Kotlin, the Compose BOM, AGP, `compileSdk` and `minSdk`. These are harness pins, not the platform minimum. Android is "not yet constrained" (Core Goals), and a platform minimum is Peter's to set. The A5/A7 pin will set a de facto Compose floor either way.
- **iOS module topology**: the iOS tokens are built as their own module and read from a second module. Otherwise row 9 is invisible: inside one module, the 105 internal members read clean (Kenya, VERIFIED with `swiftc`).
- **Verdicts**: the token tier and the component tier are reported separately.
- **Measuring lane first**: the harness cannot be green until rows 4–9 and item (i) land. It starts as a measuring lane with a pinned expected-failure list that shrinks as rows land.
- **Android first runs**: these may surface defects one layer at a time. The first task makes the output parse (rows 5 and 7).
- **Product tokens**: their lane follows item (i), because their theme getters read the emitted `CompositionLocal`.
- **Test files**: `*Tests.swift` and the two `*Test.kt` files run only in a host lane.

**Same-PR coupling.** A component change lands in the same PR as the generator change it follows, so the harness never reads a half-converted tree:
- I-1 (sizing to `Dp`) lands with Lina's removal of the 16 `.dp` sites, guarded by `src/components/__tests__/AndroidSizingDpReads.test.ts`. Ada drafts the release note.
- I-2 (the `fontSize` type) lands with row 12's groups B and C. Lina extends `src/components/__tests__/AndroidDpTokenReads.test.ts` to cover `fontSize`.
- Row 6's import list is computed from the types emitted. So it lands with I-2 and with row 4's colour decision, or in an order the three agree.
- Item (i)'s emission lands with row 12's item 3 colours and Button-CTA.
- **The Android guideline.** The PR that changes `getKotlinType` also brings the per-family Android type statements in `governance/platform-implementation-guidelines.md` into line. Lina drafts, Peter approves under the ballot-measure model, and the change is applied in that PR.
- Row 10's fix also removes `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning `generate` prints, as Peter ruled (§ 2).
- **Charter text.** When item (i) ships, Kenya's and Data's charter theming sections are updated to say what is emitted, and both re-confirm. That text is charter text, so Peter merges it.

**Item (i)'s starting point.**
- **The theme key is never generated.** `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts` L1044) has no caller outside its tests. Nothing in `src/generators`, `src/providers`, `src/build` or `src/cli` defines `dpTheme` or `LocalDPTheme` (Lina, Kenya; VERIFIED).
- **The components read it anyway.** On iOS there are 27 `@Environment(…dpTheme)` reads in 26 files, 9 of them without the key-path backslash. On Android, 25 files read `LocalDPTheme.current`. Row 16's three iOS sites are not among the 27.
- **#641 fixes the nine spellings and is still OPEN.** The fix is necessary but not sufficient. While the key is undefined, the backslash form still fails to type-check; both spellings pass `swiftc -parse` (Kenya R1, VERIFIED). This outline assumes #641 merges first. If it does not, the nine spellings become part of item (i).
- **The reads are as #592 (`c176d2798`) left them.** The 094 fixtures are re-baselined against that state.

**Item (i)'s verification is a guard, not a confirmation by reading.**
- **What it checks**: Lina writes a two-sided Jest guard in `src/components/__tests__/`. It fails on any component `theme.` read that the generated Swift or Kotlin does not declare, and it carries a pinned list that shrinks as item (i) and the component PRs land (her inbound § 3.5).
- **When it starts guarding**: only once item (i) emits and Q13 defines what "declared" means. Before then it is a pinned baseline that is red by construction.
- **Consult**: if it is registered as a named instrument, Thurgood is consulted.
- **Its limit**: it proves that names resolve, not that the code type-checks.

**Before the harness's first iOS run.** Row 15's `ContainerCardBase.ios.swift` L816 parse defect fails whatever item (i) does. Lina lands its one-line fix before the harness unit, on her schedule (Lina R1).

**Token creation.** Row 11's fix may create or change colour primitives. Creating any system token requires Peter's review (Core Goals, Token Governance). The design round names the tokens it creates, so the review happens at design, not in a fixing PR.

**Write scope the rows need.** These are named now so that no grant is first noticed at execution. The tasks round confirms each path against the charters and lists it in the row that carries it, under ballot `2026-09-26-tasks-row-write-scope-grant`. Alternatively, Peter names the paths first in a merged record (README rule 10). The paths are a reading (Ada R1, Data R1, Lina R1):
- **Outside Ada's standing scope** (her charter's `writeScope`):
  - `src/providers/**`: rows 5–9, I-1 and I-2;
  - `src/build/product/**`: row 13, item 3;
  - `src/build/tokens/defineComponentTokens.ts` and `src/integration/ValidationCoordinator.ts`: row 21;
  - `src/config/index.ts`: row 22.
- **`src/cli/sync/**`** (row 18's R1) is in Ada's standing scope. A grant to Lina for it names Ada as consulted.
- **The harness** (row 23) needs `harness/**`, a new workflow under `.github/workflows/`, and a shared pack, init and generate driver under `scripts/`. A `.github/**` grant carries the acts README rule 8 excludes unless they are admitted.

---

## 5. Open questions

Question numbers are kept from the placeholder, because records cite them.
- Q1 (what "fast follow" means) is removed: Peter's go answered it.
- Q8 (a Spec 123 amendment) is removed: release 3 has shipped.
- Q14 (the grant route) has moved off the gate into § 4, "Write scope the rows need". Both routes build the same code (Ada R1), and the tasks-row grant already exists for exactly this.

### 5.1 For Peter, at this outline's gate

Only one question changes what is built at this gate.

**Q5. What must 129 prove compiles, and how?**

- **Problem.**
  - The charter promises "a compiling, themed target on all three platforms", with compiling "established by a platform build, not by inspection".
  - 16.2.0's CHANGELOG (L44, L118) tells readers that 129's first task is "a build check that actually compiles the output".
  - No Kotlin compiler has ever run on the Android output, and the iOS output fails `swiftc`.
  - The harness is built to whatever this answer is.
  - The reviews showed that "typecheck or host build" was the wrong axis. What differs between the options is which files are proven, and that differs by platform.
- **Option A: only the generated token files, by typecheck lanes.**
  - **iOS**: `swiftc` over the token files, with the tokens built as their own module so that row 9 shows. About 2–3 minutes per run, mostly pack, init and generate; the typecheck itself takes seconds (Kenya). Finds the Swift parse and type defects recorded in the token files.
  - **Android**: a small Gradle JVM project on the ubuntu runners CI already has, about 2–3 minutes per run. It reaches the token files only. Of the 39 component files, 13 import `android.*`, which no JVM build provides, and 25 read the theme nothing emits (Data R1).
  - **Opportunity**: the cheapest option. It can run on every PR, and the token rows (2–10, 13, 19–22) get a compile.
  - **Risk**: the component rows (12, 14's A-items, 15, 16) stay readings on Android and unproven on iOS. The CHANGELOG must then say "the token files type-check", and linking and dependency failures stay unfound until a consumer meets them.
- **Option B: token files and component source, compiled in the repo by host lanes.**
  - **iOS**: a host module on macOS that also runs the two XCTest files on a simulator. Kenya estimates two sessions to build it, after the generator fixes.
  - **Android**: a Gradle library module, not an app, with the Compose compiler plugin. It is the only lane that checks `@Composable` bodies. Minutes per run on a cold cache.
  - **Opportunity**: the component rows are accepted by a compile. It catches linking, dependency-resolution and Compose-plugin errors a typecheck cannot.
  - **Risk**: it stays red longest, because it cannot pass until rows 4–9 and item (i) land, so it starts as a measuring lane, not a gate. There are two instruments per platform to keep green, and its pins set a de facto Compose floor.
- **Option C: B, plus the components reach a consumer's own project from the package.**
  - Read literally, the charter's "compiling, themed target … with nothing copied from `node_modules`" includes the components. A consumer could then build them only through a package-shaped distribution (a SwiftPM package, a Gradle source module), and nothing in this outline names one (Kenya R1).
  - **Opportunity**: a consumer could start an iOS or Android product from the package, which 16.2.0 tells them not to do.
  - **Risk**: new distribution work that enlarges 129. It also decides row 9's `public`, Q13 (b), and where Q12's protocol lives.
- **Common to every option.**
  - **A macOS runner for iOS.** The iOS files import UIKit or SwiftUI, which only Apple's SDK provides. CI today is ubuntu-only (11 `ubuntu-latest` jobs), so this is a new runner class, and its billing for this repo is unverified. Android needs no new runner class.
  - **A CI context on the unit PR**, so that the result is a run anyone can read (Stacy R1). On Android this is the only option anyway: no seat's machine has a Kotlin toolchain today.
  - **Where each lane runs** (every PR, or once at CLOSEOUT) is a cost the tasks round sets inside whichever option is picked.
  - **No option proves behaviour** (§ 4).
- **Preventing a repeat.**
  - The shipped wording follows the pick: the next CHANGELOG states what the instrument proves.
  - The requirements name each row's instrument and its CI context, so a green is never read as more than it proves.
  - The harness's expected-failure list is pinned and shrinks, so a red measuring lane does not read as a broken one.
- **Evidence**: the harness evaluation entry (§ 1, Inputs), and `[KENYA R1]`, `[DATA R1]` and `[STACY R1]` in the feedback doc.

### 5.2 For the requirements round

- **Q2 (closed).** Spec 129 owns native theme emission, item (i). The 2026-10-20 seam ruling (§ 1) answers it.
- **Q3a. Item (vi), the Model-B theme-override leak.** Is the consumer's copied theme tier (or their config `themes`) the source? And what does that do to (i), and to the caveat that a custom theme does not emit on web?
- **Q3b. The web `data-theme` selector's scope** (archived record `2026-10-03-data-theme-scope-charter-vs-generator`, fix 2).
  - Today the web generator emits `:root[data-theme="…"]`, so a theme applies to the whole page. Whether an element may theme its own subtree is not decided.
  - Native already scopes by subtree, by construction.
  - **Leonardo's design read** (he co-owns the intent and does not pick): this leans toward subtree-capable on web. **Counter**: root-only is simpler, and it quietly forecloses a themed panel inside a page.
  - It changes what the web generator builds, so it goes to Peter as a fork, with a browser check in hand first (specificity against the `:root` block, custom properties in Shadow DOM, `color-scheme` per subtree).
  - Q3a and Q3b are separate so that ruling one cannot rule the other.
- **Q4. Item (iv).** `init` running `generate` removes a founder step.
  - What does that do to the pinned `path-steps: { founder: 5 }` (`docs/consumer/INSTALL.md` L2, asserted by `scripts/__tests__/install-doc.test.ts`)?
  - And to DD9, "The founder count is unchanged"?
  - Personal-note creation stays in the CLI layer, never in `src/generators/generateTokenFiles.ts` (Ada, 2026-10-03).
- **Q6. R1 and R5: do they become requirements of scope item (ii)?** For R5 the question is now: **does the freshness check compare versions or content?**
  - #596 (`b3dbabdb1`) built the nearest check, and it compares content, not versions. That is the opposite of R5's recorded premise that "fresh" needs a version stamp.
  - It is a design question, not a fork for Peter.
  - Ada's lean and its counter are in her inbound § 2 item e.
- **Q7 (conditional). Which major retires the native root files, item (iii)?**
  - Three 129 changes may be breaking: item (iii); I-1 (`DesignTokens.size_*` from `Float` to `Dp`); and I-2.
  - If native stays reference source, not a supported build input, none of them breaks a supported consumer. Then there is no question for Peter, and the release owner words the notes.
  - If the requirements round finds that one of them breaks a supported consumer, 129 must either wait for 17.0.0 or move 17.0.0 earlier. That changes what 129 ships and when, so it goes to Peter then, with the 17.0.0 charter quoted (§ 2).
  - It is not put to Peter at this gate. Q5's option C is the likeliest way for it to fire.
- **Q9. Reviewer set and round count.** The reviewer set is in `feedback/design-outline.md` § "Context for Reviewers". The round count stays open, with the spec-authoring cost model in view.
- **Q10. Readiness test patterns** (row 17). Does a TS-side `*.ios.test.ts` / `*.android.test.ts` Jest file count as a native test? Extending the patterns moves 2 of 34 components. Options, listed and not picked (costs: Lina's inbound § 2):
  - **(a)** leave the patterns and take the question out with a reason;
  - **(b)** count the TS-side files;
  - **(c)** make the harness's per-component result a readiness input (a served-contract change).
  - Lina leans to (a) now and (c) at the tasks round. The fork between (a) alone and (a) plus (c) is the requirements round's to put to Peter.
- **Q11. Does theme emission ship before the palette is read from the consumer's copy?** (Rows 2 and 19; Ada's inbound 2026-11-04 § 3, last bullet.)
  - If it ships first, the CHANGELOG limitation is rewritten, not removed.

### 5.3 For the design round (listed, not ruled)

**Q12 and Q13 belong together.** Both decide what a native component may write for a colour, so Lina recommends the design round settles them together.
- They bind 128 differently (Leonardo R1). Q12 binds 128 fully. Q13 binds only the access form; the React Native detail is 128's to design.
- The dated pointer in 128's outline is owed (`feedback/design-outline.md`, `[THURGOOD R2]`).

- **Q12. Theme names across consumers** (row 15; Lina's inbound § 3.2).
  - **The problem**: the emitter derives its names from the consumer's config, while the shipped components read `dpTheme`, `LocalDPTheme` and `DesignerPunkTheme`. So wiring the emitter fixes only the repo's own build.
  - **(a) Fixed names the package defines.** This changes Spec 094's behaviour: the consumer's abbreviation would then name only their own struct types.
  - **(b) Consumer-derived names, with components generic over the theme.** On iOS, `@Environment` cannot take a generic key type, so this collapses into (a)'s existential or into passing the theme as an initialiser parameter (Kenya R1).
  - **(c) Components regenerated per consumer.**
  - **Leonardo's design read**: (a) sits badly with the principle that generated names use the product's name.
- **Q13. Access form for static colours** (rows 12 and 16; Lina's inbound § 3.3).
  - **The problem**: the emitted theme carries only theme-varying colours, but the components read about 173 static colours through `theme.` (a text scan). #592 kept that form and left the decision to item (i).
  - **(a) The theme carries every semantic colour.**
    - Cost: the generator output grows, and the theme protocol no longer means "what varies".
    - On Android, every added colour changes the theme constructor, which breaks hand-written theme instances.
  - **(b) Components re-point static reads to `DesignTokens.<name>`.**
    - Size: about 173 reads in about 37 files (81 iOS reads in 20 files, 92 Android reads in 17), as one large component PR.
    - On Android it is a mechanical rename (Data R1 item 18).
    - On iOS it waits on row 9 only if the tokens are their own module (Kenya R1).
- **Android per-family Kotlin types, as one table** (`getKotlinType`, `src/providers/AndroidFormatGenerator.ts` L151–173). Settling these together avoids three passes through one function and its guideline (Data R1 item 12). Ada decides them, with Data consulted:
  - **I-2, `fontSize`.** Ada leans to `TextUnit`. Data's consult read rules out `Dp`, because it ignores the user's font scale. Between `TextUnit` (the platform type, which makes a wrong-unit read impossible to write) and `Float` (the smallest diff), it is a fork. The six badge `minWidth = (font_size * line_height).dp` sites are a design call either way.
  - **`fontWeight`**: `Int`, or Compose's `FontWeight` (row 8).
  - **A percent radius** (row 8's `radius_half`), which `Dp` cannot carry.
- **Native colour construction** (rows 4 and 11).
  - **The choice**: declare a dependency (`Color.oklch` on iOS, colormath on Android) or emit native colour values (Android: `ColorSpaces.Oklab`). Ada decides, once for both platforms (Kenya R1, Data R1 item 19).
  - **The coupling to Q5**: a dependency makes every typecheck lane resolve a package.
- **Row 5: what a font family emits on native.** An escaped CSS font stack compiles, but no iOS API takes it (Kenya R1). Ada decides between emitting the stack, a first resolvable name, or nothing.
- **Item (i) on Android: the `CompositionLocal`'s default and kind.**
  - An `error(...)` default compiles, then crashes wherever no provider exists. That includes the `@Preview` functions in 21 component files (Data R1 item 14).
  - The choice is between a default to a light-theme instance and an error.
- **Row 11's tokens**: which colour primitives the OKLCH migration creates or changes (§ 4, Token creation).

**Spec outcome (2026-11-04, Thurgood)**: open — the outline round opened on Peter's go, "Proceed as the team recommends" (received before 2026-11-04T03:19:41Z), recorded in `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "[PETER] Go for the outline round (2026-11-04; recorded by Thurgood)" (on `main` since #645, `9819f72ee`); R1 draft, six reviews and R1 folded — Peter, 2026-11-04T13:23:25Z, "A yes, B yes, approve the list, one PR"; ballot 2026-11-04-waiting-spec-row, Appendix B row 17, Thurgood's confirmation (own act)
