# Design Outline: 129 — Consumer-Generation Completeness

**Date**: 2026-10-03 (placeholder); outline round opened 2026-11-04
**Spec**: 129 — Consumer-Generation Completeness
**Author**: Thurgood (formalizer). Owners, per the charter header: Ada (pipeline and generators), Lina (component tier). Peter decides at each gate.
**Status**: **Outline round, R1 folded; Q5 answered and the native plan approved (Peter, 2026-11-05).** Peter's go (2026-11-04) is recorded in `feedback/design-outline.md`, entry `[PETER]`. The Q5 recommendation round (2026-11-04/05, same file) and the native plan that followed it are recorded under `evidence/2026-11-05-native-plan/`; his decisions are in `peter-2026-11-05.md` there, and its `README.md` lists which gate owns each decision he did not take. Nothing here is a requirement. The requirements round places § 3's rows and answers § 5.2. No question is open for Peter at this outline's gate.

---

## 1. Principle, scope and acceptance (by pointer)

The principle, the scope items (i)–(vi), the acceptance sentence, the consequence recorded for release 3, and the counter-arguments folded in and surviving are chartered in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`, sections "The principle (Peter's choice)", "Scope", "Acceptance", "Consequence recorded now" and "Counter-argument folded in, and what survives". They are not restated here; the charter is the text of record.

**Acceptance, narrowed (Peter, 2026-11-05).** Peter chose "B (a)": the charter's acceptance sentence is narrowed to the wording he approved, and his original sentence moves word for word into Spec 132. The narrowed sentence is the charter's text of record, in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` § "Acceptance" (edited in its own PR, by the charter's owner); this outline does not copy it. Web "compiles" means the existing consumer guard. The requirements round carries the narrowing into `requirements.md`, and it must be on record before `requirements.md` merges (Stacy, condition 1).

**129's part of "done" (Peter, 2026-11-05, "C yes").** Rows D1, D2 and D3 of the definition of done, as `evidence/2026-11-05-native-plan/plan-r2.md` § 1 states them at `b89163c41`:
- **D1**: the generated token files compile, per platform (`harness-ios-tokens` and `harness-android-tokens`, with no entries on their expected-failure lists).
- **D2**: DesignerPunk's component tier reaches the adopter's output, as set equality of component tokens against the merged index (a driver check, on each platform).
- **D3**: our component source compiles against the adopter's generated output (`harness-ios-components` and `harness-android-components`). 129 builds the instrument; Spec 132 brings it to zero. Under the narrowed sentence, 129 closes with the remaining errors pinned, each tagged to an open record and none to a 129 row.

The rows' text is the plan's, cited and not restated here. **A later change to a D row is Peter's decision** (Stacy, condition 2). Rows D4–D10 are Spec 132's.

Two corrections to the charter's wording, carried for the requirements round:
- **Item (iv)** reads "`init` runs `generate`, which writes to the config's `output`." The charter's "with `--output`" names a flag `generate` does not have; the config's `output` key is meant (Ada, inbound 2026-11-04 § 2 item g).
- **Item (v) is new work.** `PLATFORM_KEYS` and a `platforms:` config key exist only as recorded recommendations, not in code (Ada's 2026-10-21 read).

**Relation to other specs:**
- **128**: Spec 129 owns native theme emission, item (i). 128 inherits the same generator code. Source: Peter's 2026-10-20 seam ruling, `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log", its 2026-10-20 entry on the 129/128 seam, with § 5 and § 3.2. Any adopter-ingested theme tier (128's story 3) waits for item (vi)'s design ruling or restates it.
- **130**: on iOS and Android, 130's switch reads its theme-varying colours (C5, C6) only through the emitted theme, so they wait on item (i). 129's harness gives 130 compile evidence, not announcement evidence (Lina, inbound 2026-11-04 § 4). Nothing in 129 waits on 130.
- **132**: a planned spec under one goal with 129 (Peter, 2026-11-05, "A yes"). 129 owns what `generate` writes and what the package ships; 132 owns what is written into, or runs in, an adopter's app. The goal's home is the distribution charter (`.kiro/issues/2026-09-26-native-component-distribution.md`, edited in its own PR). 132's directory and outline do not exist yet. 132's outline round opens on Peter's go, seeded from the charter, the measured list, the probes and 129's rulings.
- **Order (Peter, 2026-11-05, "(x′) as defined")**: 129, then 132's first family, then Peter re-places the remaining families against 131 using that family's measured cost, then 131, 128, 130. This changes the earlier 129 → 131 → 128 → 130 (`.kiro/issues/2026-11-01-17-0-0-release-charter.md`, "The sequencing 129 → 131 → 128 → 130 is unchanged"), which stays as that charter's text; the priorities record carries the new order (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`, walk log, 2026-11-05).
- **Decisions Peter did not take, and the gate that owns each** (`evidence/2026-11-05-native-plan/README.md`):
  - The iOS minimum and the Android minimum with its toolchain range (plan decisions 4 and 5), and when native becomes a semver promise (decision 7): **this spec's design round**.
  - Runner classes and required-check promotions (decision 6): **this spec's tasks round**.
  - D4–D10 and decisions 8 to 11: **Spec 132's outline round**.

**Inputs to this round**: the Q5 round and the native plan (`feedback/design-outline.md` § "Q5 recommendation round (2026-11-04/05)"; `evidence/2026-11-05-native-plan/`), `inbound-from-ada-2026-11-04.md` and `inbound-from-lina-2026-11-04.md`. Ada's new inbound replaces her two older ones, which carry Superseded lines; detail it points to still holds there: item (i)'s three design defaults (`inbound-from-ada-2026-10-30.md` § 1) and I-1 and I-2 (`inbound-from-ada-android-generator-defects-2026-10-24.md` § I-1, § I-2). The harness owners' evidence is `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "Evaluation entry (2026-10-20) — § 3 trigger 2 fired (#432); owners' evaluation".

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
| 23 | `2026-09-17-platform-build-verification-harness-candidate.md` | Kenya, Data (designers); Ada, Lina (verified parties) | all: the acceptance instrument, as Q5 is answered (§ 5.1). The requirements round names it per row; the tasks round declares its build unit | acceptance | tasks |

**Also named**: `2026-10-24-native-theme-emission-owner-stated-two-ways.md` (Thurgood; Trigger on Spec 131). Its 129 half, saying in words that 129 owns native theme emission, is done in § 1 and Q2.

**Left out, with the reason** (each is outside this spec):
- `2026-10-03-ios-theme-environment-key-missing-backslash.md`: a fix in flight in #641. Once it merges, the nine iOS reads are spelled `\.dpTheme`, which item (i) on iOS needs.
- Row 13's item 2 and row 14's W1/W2: their owner's fix-now, as above.

---

## 4. What the rows carry beyond naming

**Acceptance and its instrument.** Each row is accepted by a named instrument, not by a reading.
- Which instrument it is, and what it compiles, is Q5's answer (§ 5.1): token files and component source, compiled on iOS and Android, reported separately, with no test runs.
- The requirements round names the instrument for each row, and where its run is recorded: a CI context on the unit PR. A run on a seat's machine is a report the claims pass cannot re-check (Stacy R1).
- The requirements round does not leave the instrument to the tasks round, which only builds it. The harness record's Trigger stays at `tasks.md`, where the build unit is declared.
- Until a Kotlin compiler has run, every Android "does not compile" is a reading.

**What a compile can and cannot accept.** A compile proves that code parses and type-checks under a pinned toolchain. It proves no behaviour.
- **Screen-reader speech** stays with each platform seat's device or emulator read: drawn-control I1, I2 and I3 (Kenya), and 130's N11 announcements.
- **The semantics Android sets** (A1 `stateDescription`, A2's hint, A4's key handling) can partly be asserted by a Compose semantics test. That is a third rung above compiling, and none of Q5's options built it, and Q5 is answered with no test runs in 129 (Data R1 item 9).
- **Drawn-control A5 and A7** (`rememberRipple` → `ripple(...)`) are compile evidence only if the pin and a warning policy make the old form fail. A deprecation warning still compiles (Data R1 item 7).
- **Drawn-control A3** (44 → 48dp) **and row 8's `radius_half = 50.dp`** compile and are wrong. Each needs a text guard or a Compose test, and A3 needs its F-3 disposition first.
- So no compile lane closes row 14's native half.

**The harness, as Q5 is answered** (Kenya R1, Data R1, and the Q5 round's converged shape; the tasks round sizes it):
- **Input**: the output of `generate` in a packed install (`npm pack`, a scratch consumer, `init`, `generate`). Never the repo's own `dist/`, which is un-themed and cannot show item (i).
- **Pins**: Xcode, the SDK and the Swift language mode; Kotlin, the Compose BOM, AGP, `compileSdk` and `minSdk`. These are harness pins, not the platform minimum. Android is "not yet constrained" (Core Goals), and a platform minimum is Peter's to set. The A5/A7 pin will set a de facto Compose floor either way.
- **iOS module topology** (replaced in the Q5 round; Kenya R3, Lina R2): the generated tokens and the packaged components compile as **one** module, because no component file imports a token module (all 41 files, VERIFIED, Kenya). A **separate probe module** reads the generated members by plain `import`, so that row 9 shows: inside one module the 105 internal members read clean (Kenya, VERIFIED with `swiftc`). The plan (D1) has the probe generated from the emitted members, so every public member is read.
- **Verdicts**: the token tier and the component tier are reported separately, as four compile contexts, one pair per platform (Thurgood R4).
- **Measuring lane first**: the harness cannot be green until rows 4–9 and item (i) land. It starts as a measuring lane with a pinned expected-failure list that shrinks as rows land.
- **Android first runs**: these may surface defects one layer at a time. The first task makes the output parse (rows 5 and 7).
- **Product tokens**: their lane follows item (i), because their theme getters read the emitted `CompositionLocal`.
- **Test files**: `*Tests.swift` and the two `*Test.kt` files do not run in 129 (Q5 answered: no test runs).

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
- **#641 fixed the nine spellings and has merged** (`8fcf69b45`, the Q5 round's base). The fix is necessary but not sufficient. While the key is undefined, the backslash form still fails to type-check; both spellings pass `swiftc -parse` (Kenya R1, VERIFIED).
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

### 5.1 For Peter, at this outline's gate (Q5 answered 2026-11-05)

Only one question changed what is built at this gate, and it is answered. Q14 had already moved off the gate.

**Q5. What must 129 prove compiles, and how?**

- **The answer (the round's converged answer, approved with the plan).**
  - **What is compiled**: the generated token files **and** DesignerPunk's component source, on iOS and Android, in CI, against the output of `generate` from a packed install.
  - **How it is reported**: as separate token and component results, four compile contexts (`harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens`, `harness-android-components`). Each starts as a measuring lane, not a gate.
  - **No test runs in 129.** A compile proves that code parses and type-checks, and no behaviour (§ 4).
  - **The pinned list**: each lane compares against a committed, two-sided expected-failure list. A count that rises fails, and so does one that falls without its list edit. Entries are keyed by file, normalised diagnostic and row id, with counts. The tasks round settles the file format.
  - **Option C** (adopters build our components in their own app, from the package) **is Spec 132's**, not 129's.
- **Peter's words.** He did not answer Q5 by name. At 2026-11-05T04:07:43Z he said "A yes, B (a), C yes; (x′) as defined". "A yes" approves the two-spec plan, whose work package 2 (`evidence/2026-11-05-native-plan/plan-r2.md` § 2) states the answer above. "B (a)" narrows the acceptance sentence so that the components compile "except for pinned errors". "C yes" fixes D1, D2 and D3 as 129's part of "done" (§ 1). The words and what he had read are in `evidence/2026-11-05-native-plan/peter-2026-11-05.md`.
- **The round.** `feedback/design-outline.md` § "Q5 recommendation round (2026-11-04/05)": seven round-1 entries, seven cross-reads, and the plan and order consult in the evidence folder. Six of seven seats converged on B's reach with no test runs (Kenya R3, Thurgood R4); the fork they left for Peter, B's reach in 129 against C, is the one his "A yes" and "B (a)" answer.
- **Forks the round put to Peter, and where each landed.**
  - *What "target" means* (B's reach in 129, or C): B's reach in 129, C in Spec 132.
  - *Must the component tier compile clean before 129 closes?* No: 129 closes with the remaining errors pinned, each tagged to an open record and none to a 129 row (B (a)). Lina files that record from the harness's first committed run.
  - *When a lane becomes a required check*: not answered here. It is plan decision 6, Peter's at 129's tasks round, on a measured-stability criterion.
  - *Whether the 87 iOS tests run in 129*: no test runs.
- **Left open for the rounds, as the round left it.**
  - The expected-failure list's file format; whether each lane runs on every PR or at unit PRs (a path filter is harmless only while a lane is not required); the harness's runner and toolchain pins (the minimums are plan decisions 4 and 5, at the design round); the `harness-generate` job and its did-it-really-run floor (tasks).
  - The tasks round declares the build unit and confirms the grant for `harness/**`, the workflow and the `scripts/` driver (§ 4, "Write scope the rows need"). The approval PR and its two sibling PRs merge before any commit touches `harness/**` (plan-r2 § 6 item 2).
- **Carried to the requirements round** (plan-r2 § 6 item 4, cited and not restated): the criterion that no expected-failure entry is tagged to rows 12, 14 A5/A7, 15 or 16; named instruments for rows 19 to 22; "web compiles" defined as the existing consumer guard; Requirement 1.5, led by Lina.
- **Preventing a repeat** (kept from the outline's first form):
  - The shipped wording follows the instrument: the next CHANGELOG states what it proves ("compile except N pinned errors, listed at <path>; no app linked, no tests run"), never "compiles" while entries remain.
  - The requirements name each row's instrument and its CI context, so a green is never read as more than it proves.
  - The expected-failure list is pinned and shrinks, so a red measuring lane does not read as a broken one.
- **The options as put to the round** (for readers of the records that cite them): **A**, the generated token files only, by typecheck lanes; **B**, token files and component source compiled in the repo; **C**, B plus the components reaching a consumer's own project from the package. The first form of this section, with their costs, is in this file at `b89163c41`.
- **Evidence**: the harness evaluation entry (§ 1, Inputs), `[KENYA R1]`, `[DATA R1]` and `[STACY R1]` in the feedback doc, and the Q5 round entries named above.

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
  - It is not put to Peter at this gate. Q5's option C was the likeliest way for it to fire, and Q5 is answered with C in Spec 132, so it fires here only if a 129 item breaks a supported consumer. Plan decision 7 (when native becomes a semver promise) is this question's design-round form, and is Peter's at 129's design round.
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
  - **The coupling to Q5**: a dependency makes every compile lane resolve a package.
- **Row 5: what a font family emits on native.** An escaped CSS font stack compiles, but no iOS API takes it (Kenya R1). Ada decides between emitting the stack, a first resolvable name, or nothing.
- **Item (i) on Android: the `CompositionLocal`'s default and kind.**
  - An `error(...)` default compiles, then crashes wherever no provider exists. That includes the `@Preview` functions in 21 component files (Data R1 item 14).
  - The choice is between a default to a light-theme instance and an error.
- **Row 11's tokens**: which colour primitives the OKLCH migration creates or changes (§ 4, Token creation).

**Spec outcome (2026-11-04, Thurgood)**: open — the outline round opened on Peter's go, "Proceed as the team recommends" (received before 2026-11-04T03:19:41Z), recorded in `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "[PETER] Go for the outline round (2026-11-04; recorded by Thurgood)" (on `main` since #645, `9819f72ee`); R1 draft, six reviews and R1 folded — Peter, 2026-11-04T13:23:25Z, "A yes, B yes, approve the list, one PR"; ballot 2026-11-04-waiting-spec-row, Appendix B row 17, Thurgood's confirmation (own act)
