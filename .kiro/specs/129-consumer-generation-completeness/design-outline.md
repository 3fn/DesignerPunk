# Design Outline: 129 — Consumer-Generation Completeness

**Date**: 2026-10-03 (placeholder); outline round opened 2026-11-04
**Spec**: 129 — Consumer-Generation Completeness
**Author**: Thurgood (formalizer). Owners, per the charter header: Ada (pipeline and generators), Lina (component tier). Peter decides at each gate.
**Status**: **Outline round, R1 draft.** Peter's go (2026-11-04) is recorded in `feedback/design-outline.md`, entry `[PETER]`; this draft is the step-2 update and the round's first draft in one, his option (a). Nothing here is a requirement. The requirements round places § 3's rows and answers § 5.2. § 5.1's two questions are open for Peter at this outline's gate.

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

**Inputs to this round**: `inbound-from-ada-2026-11-04.md` (it replaces her two older inbounds in this directory, which carry Superseded lines) and `inbound-from-lina-2026-11-04.md`. The harness owners' evidence is `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "Evaluation entry (2026-10-20) — § 3 trigger 2 fired (#432); owners' evaluation".

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
| 5 | `2026-10-20-native-font-family-literals-unescaped-quotes.md` | Ada | all | native output | requirements |
| 6 | `2026-10-20-kotlin-output-no-import-block.md` | Ada | all | native output | requirements |
| 7 | `2026-10-24-kotlin-output-section-comment-bare-text.md` | Ada | all | native output | requirements |
| 8 | `2026-10-24-native-primitive-values-do-not-match-declared-type.md` | Ada | all | native output | requirements |
| 9 | `2026-10-26-ios-designtokens-members-not-public.md` | Ada | all | native output | requirements |
| 10 | `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md` | Ada | all, plus the warning removal (§ 2) | new item, with row 11 | requirements |
| 11 | `2026-06-24-oklch-shadow-color-family-not-migrated.md` | Ada | all; the root of row 10 | with row 10 | requirements |
| 12 | `2026-10-24-android-component-unit-type-mismatches.md` | Lina (component reads); Ada (emitted types) | Lina: groups B and C, item 3, Button-CTA. Ada: I-1 (sizing as `Dp`), I-2 (the `fontSize` type, Data consulted). Group A is done | native output and (i) | requirements |
| 13 | `2026-10-26-token-index-platform-name-readers.md` | Ada (item 3); Lina (items 1, 2) | **item 3 only**, the product-token generator under `src/build/product/**` (needs a grant, § 5.1). Item 1 is done; item 2 is Lina's fix-now before the requirements commit | (ii) or new item | requirements |
| 14 | `2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | **the native half only**: I1–I3, A1–A7. The web half (W1, W2) is fix-now by 16.3.0's S, outside this spec; the PR that closes the last web item re-rules the Trigger to this spec's requirements | tied to the harness unit | 16.3.0 |
| 15 | `2026-09-26-native-component-theme-hardcoding.md` | Lina (Kenya, Data verify) | the theme-name hardcoding (question 12), and the `ContainerCardBase.ios.swift` L816 parse defect | (i) | manual |
| 16 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` | Lina | all six reads; the fix follows question 13 | (i) | requirements |
| 17 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | Lina | **the test-pattern half only** (question 10); the served-wording half shipped in #591 | new item | requirements |
| 18 | `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` | Lina | **R1 and R5 only** (question 6) | (ii) | requirements |
| 19 | `2026-10-15-123-palette-read-from-package.md` | Ada (Lina consulted) | all; take INSTALL L77's six groups, not the title's "five parts" | (ii), and (vi)'s question | requirements |
| 20 | `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` | Ada | **row (g) only**, the base-config freshness check; row (h) is fix-now by 16.3.0's S | (i), (vi) | requirements |
| 21 | `2026-10-24-component-token-custom-values-unvalidated.md` | Ada | all | new item | requirements |
| 22 | `2026-10-03-semantic-override-map-type-not-exported.md` | Ada | all | new item | CLOSEOUT |
| 23 | `2026-09-17-platform-build-verification-harness-candidate.md` | Kenya, Data (designers); Ada, Lina (verified parties) | all: the acceptance instrument; build, fold or drop is decided at the tasks round | acceptance | tasks |

**Also named**: `2026-10-24-native-theme-emission-owner-stated-two-ways.md` (Thurgood; Trigger on Spec 131). Its 129 half, saying in words that 129 owns native theme emission, is done in § 1 and Q2.

**Left out, with the reason** (each is outside this spec):
- `2026-10-03-ios-theme-environment-key-missing-backslash.md`: a fix in flight in #641. Once it merges, the nine iOS reads are spelled `\.dpTheme`, which item (i) on iOS needs.
- Row 13's item 2 and row 14's W1/W2: their owner's fix-now, as above.

---

## 4. What the rows carry beyond naming

**Acceptance.** Each row's acceptance is the harness, not a guard or a reading. Until a Kotlin compiler has run, every Android "does not compile" is a reading.

**What the harness proves: compile evidence only.**
- Screen-reader behaviour stays with the platform seats: drawn-control I1, I2, I3, A1, A2 and A4, and 130's N11 announcements, each need that seat's device or emulator read.
- Compile-checkable: drawn-control A3, and A5/A7, which need a Compose version that has `ripple` (the harness's pinned toolchain decides).
- So the harness unit does not close row 14's native half.

**Same-PR coupling.** A component change lands in the same PR as the generator change it follows, so the harness never reads a half-converted tree:
- I-1 (sizing to `Dp`) with Lina's removal of the 16 `.dp` sites, guarded by `src/components/__tests__/AndroidSizingDpReads.test.ts`. Ada drafts the release note.
- I-2 (the `fontSize` type) with row 12's groups B and C. Lina extends `src/components/__tests__/AndroidDpTokenReads.test.ts` to `fontSize`.
- Item (i)'s emission with row 12's item 3 colours and Button-CTA.
- The PR that changes `getKotlinType` (I-1, I-2) also brings the per-family Android type statements in `governance/platform-implementation-guidelines.md` into line. Lina owns the guideline and writes the change.
- Row 10's fix also removes `KNOWN_UNEMITTED_SHADOW_COLORS` and the warning `generate` prints, as Peter ruled (§ 2).

**Item (i)'s verification is a guard, not a confirmation by reading.** Lina writes a two-sided Jest guard in `src/components/__tests__/` that fails on any component `theme.` read the generated Swift or Kotlin does not declare, with a pinned list that shrinks as item (i) and the component PRs land (her inbound § 3.5). If it is registered as a named instrument, Thurgood is consulted. It proves names resolve, not that code type-checks; only the harness proves that.

**Item (i)'s starting point.** The component reads are as #592 (`c176d2798`) left them, with #641's spelling fix; the 094 fixtures are re-baselined against that state.

**Before the harness's first iOS run.** Row 15's `ContainerCardBase.ios.swift` L816 parse defect fails whatever item (i) does. Lina offered to fix it first; the formalizer's answer is yes, before the harness unit, on her schedule.

**Token creation.** Row 11's fix may create or change colour primitives. Creating any system token requires Peter's review (Core Goals, Token Governance). The design round names the tokens it creates, so the review happens at design and not in a fixing PR.

---

## 5. Open questions

Question numbers are kept from the placeholder, because records cite them. Q1 (what "fast follow" means) is removed, answered by Peter's go; Q8 (a Spec 123 amendment) is removed, since release 3 has shipped.

### 5.1 For Peter, at this outline's gate

Each is asked only because it changes what is built or when its authority is recorded. Neither is answered here.

- **Q5. The acceptance verb: typecheck or host build?** It changes what is built, because the harness is built to it.
  - **Typecheck**: `swiftc -typecheck`, and a Kotlin compile of the token and component files. It is cheap, can run on every PR, and finds every defect class recorded so far (the 197 Swift diagnostics were found this way). If chosen, the next CHANGELOG rewords "actually compiles" to "type-checks".
  - **Host build**: an Xcode or Gradle build of a target app. It is what the charter's acceptance sentence says ("a compiling, themed target"; "'Compiling' is established by a platform build, not by inspection"). It needs a host toolchain in CI or on a seat's machine, and it finds linking, SDK and resource failures a typecheck does not.
  - The verb can differ by place: a typecheck as the per-PR gate and one host build as the acceptance proof at CLOSEOUT. That is the same choice made twice, not a third option.
  - **Shipped text already leans one way.** `CHANGELOG.md` L44 (16.2.0, § "Known limitations") says these defects "are planned for Spec 129, whose first task is a build check that actually compiles the output"; L118 says the same of the Android output. A reader takes "actually compiles" as a build.
  - Evidence: the harness evaluation entry (§ 1, Inputs).
- **Q14. Row 13's grant route for `src/build/product/**`**, a path in no seat's standing write scope; the record lists its grant paths as owed, not yet a grant (README rule 10). **This does not change what is built**: it is asked now so the grant is not first noticed at execution.
  - **(a)** The tasks row that carries item 3 lists the paths as its Primary Artifacts, and the grant takes effect at Peter's merge of `tasks.md` (ballot `2026-09-26-tasks-row-write-scope-grant`).
  - **(b)** Peter names the paths first, as a merged line in the record.

### 5.2 For the requirements round

- **Q2 (closed).** Spec 129 owns native theme emission, item (i). The 2026-10-20 seam ruling (§ 1) answers it.
- **Q3. Item (vi)**, the Model-B theme-override leak: is the consumer's copied theme tier (or their config `themes`) the source, and what does that do to (i) and to the "custom theme does not emit on web" caveat? It also carries the `data-theme` scoping intent (archived record `2026-10-03-data-theme-scope-charter-vs-generator`, fix 2): the web generator emits `:root[data-theme="…"]`, so a theme applies page-wide, and whether an element may theme its subtree is not decided. Leonardo co-owns the design-side intent.
- **Q4. Item (iv)**: `init` running `generate` removes a founder step. What does that do to the pinned `path-steps: { founder: 5 }` (`docs/consumer/INSTALL.md` L2, asserted by `scripts/__tests__/install-doc.test.ts`) and to DD9, "The founder count is unchanged"? Personal-note creation stays in the CLI layer, never in `src/generators/generateTokenFiles.ts` (Ada, 2026-10-03).
- **Q6. R1 and R5: do they become requirements of scope item (ii)?** For R5, the question is now: **does the freshness check compare versions or content?** #596 (`b3dbabdb1`) built the nearest check, and it compares content, not versions: the opposite of R5's recorded premise that "fresh" needs a version stamp. A design question, not a fork for Peter; Ada's lean and its counter are in her inbound § 2 item e.
- **Q7 (conditional). Which major retires the native root files, item (iii)?** Three 129 changes may be breaking: item (iii), I-1 (`DesignTokens.size_*` from `Float` to `Dp`) and I-2. If native stays reference source, not a supported build input, none of them breaks a supported consumer, and there is no question for Peter; the release owner words the notes. If the requirements round finds that one of them breaks a supported consumer, 129 must either wait for 17.0.0 or move 17.0.0 earlier. That changes what 129 ships and when, so it goes to Peter then, with the 17.0.0 charter quoted (§ 2). It is not put to Peter at this gate.
- **Q9. Reviewer set and round count**: the reviewer set is in `feedback/design-outline.md` § "Context for Reviewers". The round count stays open, with the spec-authoring cost model in view.
- **Q10. Readiness test patterns** (row 17): does a TS-side `*.ios.test.ts` / `*.android.test.ts` Jest file count as a native test? Extending the patterns moves 2 of 34 components. Options, listed and not picked (costs: Lina's inbound § 2):
  - **(a)** leave the patterns and take the question out with a reason;
  - **(b)** count the TS-side files;
  - **(c)** make the harness's per-component result a readiness input (a served-contract change).
  - Lina leans to (a) now and (c) at the tasks round. The fork between (a) alone and (a) plus (c) is the requirements round's to put to Peter.
- **Q11. Does theme emission ship before the palette is read from the consumer's copy** (rows 2 and 19)? Ada's 2026-10-30 inbound, open question 3, carried forward.

### 5.3 For the design round (listed, not ruled)

These two both decide what a native component may write for a colour, so Lina recommends the design round settles them together. In her judgment they also bind 128's React Native reads, so deciding them once in 129 saves 128 a second sitting.

- **Q12. Theme names across consumers** (row 15; Lina, inbound § 3.2). The emitter derives its names from the consumer's config, while the shipped components read `dpTheme`, `LocalDPTheme` and `DesignerPunkTheme`, so wiring the emitter fixes only the repo's own build. Options: **(a)** fixed names the package defines; **(b)** consumer-derived names, components generic over the theme; **(c)** components regenerated per consumer.
- **Q13. Access form for static colours** (rows 12 and 16; Lina, inbound § 3.3). The emitted theme carries only theme-varying colours, but the components read about 173 static colours through `theme.` (a text scan); #592 kept that form and left the decision to item (i). Options: **(a)** the theme carries every semantic colour; **(b)** components re-point static reads to `DesignTokens.<name>` (on iOS this waits on row 9).
- **I-2. The `fontSize` type**, Data consulted. Ada leans to `TextUnit`.
- **Row 11's tokens**: which colour primitives the OKLCH migration creates or changes (§ 4, Token creation).
