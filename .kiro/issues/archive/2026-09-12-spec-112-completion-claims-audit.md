# Spec 112 Completion-Claims Audit (Claims-vs-Source, Verification-Grade)

**Date**: 2026-09-12
**Chartered by**: Peter (ruling at the dual-color-source divergence fix session — "queue both follow-ups")
**Domain**: Thurgood (audit methodology; verification-grade standard per the 2026-08-25 health-check Addendum, PR #141)
**Severity**: Medium → **High** (process integrity — 3.3 is NOT unique; five unshipped-work findings, four still open as of 2026-09-12)
**Status**: **Audit complete (2026-09-12)** — findings below. 11 CLEAN / 12 DISCREPANCY (5 unshipped-work, 7 claim-drift) / 2 doc-coverage / 0 INDETERMINATE at task level. Source-side fixes routed to Ada as recommendations; no source modified by this audit.
**Origin**: `.kiro/issues/2026-08-25-dual-color-source-divergence.md` (root-cause finding, 2026-08-27 session)

---

## Trigger

**Spec 112 task 3.3 is a confirmed ticked-but-unshipped escape.** The task ("Update DTCG/Figma generators and token-index") promised `src/generators/DTCGFormatGenerator.ts (modified)`; the completion doc's own change table shows only three NEW utility files were created — the generator was never touched. The task was marked complete anyway. No test guarded the seam, so the gap stayed silent from 2026-06-10 until the divergence surfaced in late August via a live consumer symptom (Figma receiving wrong colors).

The completion doc told the truth in its change table while the tick asserted more — the audit signal is **claims-vs-change-table-vs-shipped-source disagreement**, which is mechanically checkable.

## Scope

Verification-grade (claims-vs-source) pass over **Spec 112's completion docs** (`.kiro/specs/112-oklch-color-migration/completion/`): for each task, does the completion doc's claim set match (a) the task text's promised outputs in tasks.md and (b) what actually ships in the source tree today? Task 3.3 is the known failure; the question is whether it is unique.

**Not in scope**: re-validating 112's design decisions or OKLCH math (settled, shipped, platform-verified). This is completion-claim integrity only.

## Sequencing

- After the Option A divergence fix merges (its parity test closes the known instance first).
- Natural pairing: the queued **Token-Family-*.md claims-vs-source pass** (post-divergence-session item from the 2026-08-25 health check) — same method, doc-side; a single Thurgood session could run both.

## Output

Findings ledger entry per discrepancy (if any), routed to Ada for source-side fixes; a process note to the verification-grade standard if a second escape is found (pattern vs. one-off).

---

# Audit Findings (2026-09-12)

## Method

All 25 ticked items in `tasks.md` were triangulated: **promised outputs** (task text + parent "Primary Artifacts"/"Success Criteria") vs. **claimed outputs** (completion-doc change tables, validation lines) vs. **shipped source** (git history + live tree). Spec 112 landed as a **single pre-PR-gate commit — `71120a5d` (2026-06-10, "v12.0.0: Spec 112 + Spec 115")** carrying all 24 completion docs and all 114 changed files, so per-task commit attribution does not exist; verification is therefore commit-content-based (`git show --name-status 71120a5d`), widened to the 2026-06-09→2026-06-12 window for work that legitimately spanned commits, plus live-tree checks with drift attributed to later specs. Every claimed test count was **re-run** (`npx jest` on the 12 Spec 112 suites): 280/280 pass and the twelve per-suite counts match the docs exactly, including the four loop-generated suites (29/63/15/51).

Subclasses used: **unshipped-work** (the 3.3 class — a promised output absent from both the change table and the history), **claim-drift** (work shipped, the claim overstates it — wrong criterion, dropped criterion, relaxed threshold), and **doc-coverage** (a required completion/summary doc never written). The third subclass was added because two findings are pure absence-of-claims, which neither charter subclass describes; flagging the addition rather than rounding them into claim-drift.

## Verdict Table

| Task | Promised outputs (summary) | Verdict | Evidence |
|------|---------------------------|---------|----------|
| 1 (parent) | OklchConverter/Validator + tests; 4 success criteria | CLEAN | Both files + both suites `A` in `71120a5d`; 60/60 re-run pass |
| 1.1 | OklchConverter.ts + comprehensive tests | CLEAN | `A src/color/OklchConverter.ts`; 33 tests claimed, 33 re-run |
| 1.2 | OklchValidator.ts + per-constraint tests | CLEAN | `A src/color/OklchValidator.ts`; 27 claimed, 27 re-run |
| 2 (parent) | Parent completion doc + summary doc + 6 criteria | **DISCREPANCY (doc-coverage)** | No `task-2-completion.md` and no `docs/specs/.../task-2-summary.md` exist — at `71120a5d` or today |
| 2.1a | channels/hues + L/C chromatic + barrel + tests | CLEAN | All 5 files `A`; 29 claimed, 29 re-run; conversion adjustments disclosed |
| 2.1b | Teal/green/orange refinements, gamut + WCAG verification | CLEAN | `tealChroma` at commit = 0.035/0.100/0.080/0.060/0.045 — exactly the doc's "After" column |
| 2.2 | neutral L/C files + partition tests | CLEAN | Both files `A`; 18 claimed, 18 re-run; buffer gaps asserted in-suite |
| 2.3 | Composed primitives **+ semantic ColorTokens.ts + theme overrides + pipeline interface types** | **DISCREPANCY (unshipped-work)** | Doc self-declares "Partial"; box ticked anyway. `71120a5d` touches semantic `ColorTokens.ts` by 2 lines (glow repoint only); `src/tokens/themes/` untouched (last change 2026-03-18) |
| 3 (parent) | 6 generator files "(modified)"; 6 success criteria | **DISCREPANCY (claim-drift)** | "Token-index: OKLCH channel metadata ✅" is false at ship: **zero** `oklch` in any `token-index/*.yaml` at `71120a5d`; first appearance `35d311f5` (2026-06-24, Spec 117) |
| 3.1 | WebFormatGenerator (modified) + tests | CLEAN | `M src/providers/WebFormatGenerator.ts`; 9 claimed, 9 re-run (task text's `src/generators/` path is wrong — file lives in `src/providers/`) |
| 3.2 | iOS+Android generators **+ init scaffolding for ChromaKit/colormath (R4 AC4)** | **DISCREPANCY (unshipped-work)** | Both generators `M`; `src/cli/init.ts` untouched by 112 and still has **zero** ChromaKit/colormath references today |
| 3.3 | DTCG + Figma generators + generateTokenIndex, all "(modified)" | **DISCREPANCY-REMEDIATED (index case)** | Utilities-only shipped; `DTCGFormatGenerator.ts` untouched 2026-04-07→2026-07-15; remediated 2026-09-12 by `d17c9448` (#150). **Scope is wider than charted** — see F1 |
| 4 (parent) | BlendCalculator + 3 ThemeAwareBlendUtilities "(reworked)"; 5 criteria | **DISCREPANCY (claim-drift)** | All four named artifacts untouched by 112; criterion 5 ("platform blend utilities all use OKLCH") silently **dropped** from the doc's 4-row criteria table |
| 4.1 | OKLCH blend interpolation + interactionBlend + tests | CLEAN | `A src/blend/OklchBlendCalculator.ts`; 14 claimed, 14 re-run; doc accurately describes a new module (seam finding sits on parent 4 / F3) |
| 4.2 | web `.ts` + iOS `.swift` + Android `.kt` blend utilities + color-mix migration | **DISCREPANCY (unshipped-work)** | color-mix claims exact (1 Avatar, 5 NavTabBar, 0 srgb remaining at commit); the three `ThemeAwareBlendUtilities.*` files were never touched and contain **zero** OKLCH today |
| 5 (parent) | contracts.yaml updates + audit report; 5 criteria | **DISCREPANCY (claim-drift)** | "Platform implementations produce visually correct results ✅" rests on `OklchBlendCalculator`, which no platform path uses; also "13 components" vs 11 audited vs 10 table rows |
| 5.1 | Audit 13 components' blend states + glow chroma | **DISCREPANCY (claim-drift)** | 63 claimed/63 re-run and the glow repoint is real (`green500`→`green300`, the only semantic edit in `71120a5d`); but the suite exercises the orphaned calculator, not the components' live RGB/HSL blend path |
| 5.2 | 11 contracts.yaml → OKLCH intent language | CLEAN | Exactly 11 `M …/contracts.yaml` in `71120a5d`; 0 blend-percentage references remaining in all 11 at commit |
| 6 (parent) | OklchWcagValidator.ts + color-regression test; 5 criteria | **DISCREPANCY (claim-drift)** | Criteria table drops 2 of 5 (green success.text ≥4.5:1; Spec 106 consumer contract test), reworks "pass"→"evaluated", relaxes ΔE₀₀ <1→<3; neither named artifact path exists (work shipped at other paths) |
| 6.1 | Semantic-pair AA validation **+ HC/WCAG override ≥7:1 validation (R8 AC4)** | **DISCREPANCY (unshipped-work)** | 15 claimed/15 re-run, but the WCAG-theme overrides the shipped test names ("Use green500 in WCAG theme" etc.) do not exist at commit or today; `color.feedback.success.text` → `green400` = 2.84:1 |
| 6.2 | ΔE₀₀ **< 1** regression + Spec 106 contract test run | **DISCREPANCY (claim-drift)** | 51 claimed/51 re-run, but the assertion is `toBeLessThan(3)` while the file's own docblock still reads "ΔE₀₀ < 1 … (Spec 112 R11 AC4)"; no evidence of the Spec 106 run |
| 7 (parent) | 4 docs + release notes; summary doc; 5 criteria | **DISCREPANCY (claim-drift + coverage)** | All doc artifacts verified `M`/`A`; `docs/specs/.../task-7-summary.md` never created; "366/369 suites, 8965/8969 tests" conflicts with the same commit's message ("369 suites, 8936 tests, 0 failures") |
| 7.1 | Token-Family-Color.md rewrite | CLEAN | `M`; 642 → 315 lines at commit — exactly as claimed |
| 7.2 | Product-Token-Governance + Integration Guide + Rosetta Architecture | CLEAN | All three `M` with the claimed content (ΔE₀₀ ≤ 1.0 row; ChromaKit/colormath table; 53+/43- pipeline rewrite) |
| 7.3 | Release notes (Setup, Tier 1) | **doc-coverage gap** (work CLEAN) | `A docs/releases/RELEASE-NOTES-12.0.0.md` covers every promised bullet; no `task-7-3-completion.md` exists — see F6 |
| *(extra)* `pipeline-integration-completion.md` | TokenFileGenerator OKLCH interception | CLEAN | `M src/generators/TokenFileGenerator.ts`; both claimed helpers present at commit and today |

**Point-in-time claims not mechanically re-verifiable** (noted, not counted as verdicts): "2377/2377 component tests", "331 Avatar+NavTabBar tests", "497/497 generator tests", "`npx designerpunk generate` … 217 tokens". All are plausible and none is contradicted by the record.

---

## Detailed Findings

### F1 — Task 3.3 (index case) is **wider** than charted: two seams unshipped, not one
`71120a5d` created `src/generators/oklch/OklchExportUtils.ts` and `OklchTokenIndexMetadata.ts` and wired **neither**. The DTCG seam is the known case (remediated by `d17c9448`/#150). The **token-index seam is a second, separately-escaped instance of the same signature**: `getOklchMetadata` sat orphaned until `35d311f5` (2026-06-24, Spec 117) imported it into `generateTokenFiles.ts` — 14 days after `task-3-completion.md` asserted "Token-index: OKLCH channel metadata on composed tokens ✅". At ship, `token-index/{primitives,semantics,components}.yaml` contained zero `oklch`. The third promised file, `src/generators/FigmaFormatGenerator.ts`, **has never existed** — Figma rides DTCG via `src/generators/transformers/FigmaTransformer.ts`, so #150 closes it downstream; the task text named a phantom path.

### F2 — Task 2.3: a ticked "Partial" that caused two escaped defects
`task-2-3-completion.md` is honest ("Status: Partial — semantic/theme updates deferred"), but the box is ticked `[x]` and v12.0.0 shipped. The record names it as root cause **twice**: `.kiro/issues/2026-06-10-oklch-pipeline-integration-incomplete.md` ("Root Cause: Task 2.3 was marked 'Partial' …", High, blocked the release, fixed same day) and `.kiro/issues/2026-06-11-semantic-colors-still-rgba.md` (same root cause, found **after** release in @3fn/core 12.0.3, fixed by `9a5c875a` touching `SemanticValueResolver.ts` + all three generators). The theme-override half of the promise was obviated by design — overrides are pure primitive name-swaps (`src/tokens/themes/wcag/SemanticOverrides.ts`), so no OKLCH values were needed — which the completion doc should have said instead of "deferred". **Recommendation (Ada)**: none open; both defects are resolved. Process finding only.

### F3 — Task 4: the blend rework was built and never connected (still open, 3 months)
Parent 4's Primary Artifacts promised `BlendCalculator.ts` and all three `ThemeAwareBlendUtilities.*` "(reworked)". None was touched: `BlendCalculator.ts` last changed **2025-10-28**; the three platform utilities last changed for unrelated reasons and contain **zero** OKLCH today. `OklchBlendCalculator.ts` is imported only by its own two test files — orphaned. This was independently rediscovered by Spec 117's audit: `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` ("It is orphaned — no non-test production code imports it… the in-use path computes in hex → RGB → HSL"), status Open/SOON, owner Ada. `task-4-2-completion.md` disclosed the deferral to "the full pipeline integration pass" — a pass that only covered `TokenFileGenerator` color emission and never reached blend. **Recommendation (Ada)**: no new work item needed — the 2026-06-24 issue already owns it; this audit supplies the completion-claim provenance for that issue.

### F4 — Task 6.1: the WCAG remediation the shipped test points at does not exist
`src/color/__tests__/WcagContrast.test.ts` ships six pairs under `NEEDS_OVERRIDE` with a comment asserting "The WCAG theme (Spec 112 R8 AC4) provides overrides with darker primitives" and per-pair fixes. `src/tokens/themes/wcag/SemanticOverrides.ts` contains no green/orange/pink/gray override — at `71120a5d` or today. `color.feedback.success.text` still resolves to `green400` (2.84:1 on white100, below AA). tasks.md task 6 criterion "Green success.text contrast improved from ~1.3:1 to ≥4.5:1" was **dropped** from `task-6-completion.md`'s criteria table, and `71120a5d`'s own commit message claims "WCAG: all semantic pairs pass AA, teal/green contrast fixed" — false in the release record. **Recommendation (Ada, accessibility-severity)**: decide and apply the WCAG-theme overrides for the six documented pairs, or record an accepted-deviation with rationale; the in-test comment must stop asserting overrides that do not exist.

#### F4 — Remediation note (Ada, 2026-09-12)

Peter authorized a scoped fix: `color.feedback.success.text` only, plus the guard task 6.1 claimed but never shipped. Sibling failures were measured and queued, not fixed.

**What changed**

| Context | Before | After | Ratio before | Ratio after |
|---|---|---|---|---|
| light, on `color.structure.canvas` (white100) | `green400` | **`green500`** | **2.842:1 (AA FAIL)** | **4.717:1 (AA PASS)** |
| dark, on `color.structure.canvas` (gray400) | `green400` (no override) | **`green300`** (new Level 2 dark override) | **2.977:1 (AA FAIL)** | **4.625:1 (AA PASS)** |
| light-wcag / dark-wcag | inherits base | inherits base (no wcag override added) | — | 4.717 / 4.625 (AA PASS; **not** the ≥7:1 AAA floor R8 AC4 asserts) |

All ratios computed with the repo's own `contrastRatio()` (`src/color/OklchConverter.ts`). **No primitive OKLCH values were changed** — `green400` is untouched and keeps its other consumers; this is a semantic remap only.

**Canonical pairing adjudicated**: `.text`-role tokens are asserted against `color.structure.canvas` — the architecture's declared default page background, and the pairing Spec 112's own criteria were measured against ("green success.text improved from ~1.3:1", "teal info.text from ~1.5:1" are both ratios against white). Because canvas is mode-varying (white100 → gray400), light mode needs a DARKER green and dark mode a LIGHTER one — hence opposite steps in the two modes.

**Consumer-visible side effect (iOS/Android)**: adding a dark override makes the token theme-varying, so per Spec 094 it is excluded from the static `DesignTokens.swift`/`.kt` structs and moves to the theme-aware surface. `token-index/semantics.yaml` now reads `ios: theme.colorFeedbackSuccessText` / `android: theme.color_feedback_success_text` (was static). Web is unaffected: `--color-feedback-success-text: light-dark(oklch(0.54 0.14 154), oklch(0.78 0.208 154))`. `src/tools/integrity/Invariants.ts`'s `EXPECTED_BASE_THEME_VARYING` grew 5 → 6 accordingly (the anti-conflation sentinel is untouched — this is a genuine base dark override, not a WCAG-only over-mark).

**The missing guard now exists**: `src/tokens/__tests__/SemanticColorContrast.test.ts` (evergreen, 32 tests) resolves SEMANTIC tokens through the same context composition the generators use and asserts AA on text/background pairs — which is what task 6.1 promised. The shipped `src/color/__tests__/WcagContrast.test.ts` remains primitive-level; its `NEEDS_OVERRIDE` comment still asserts WCAG-theme overrides that do not exist (this audit's F4 note), and was left alone as out of scope.

**Queued, not fixed — the exemption list** (each pinned to its measured ratio in the new test and marked "PENDING Peter adjudication, found by 2026-09-12 audit remediation"; the pin fails the test if the pair regresses *or* if it is fixed, forcing re-adjudication either way):

*Light mode, text on canvas:* `warning.text` orange400 **4.231**; `text.muted` gray200 **3.640**; `text.subtle` gray100 **2.480**.

*Dark mode, text on canvas (gray400) — one shared root cause: the dark theme overrides 6 of 62 semantic color tokens, so these are light-mode primitives rendered on a dark canvas:* `error.text` pink400 **1.561**; `warning.text` orange400 **1.999**; `info.text` teal400 **1.155**; `text.default` gray300 **1.536**; `text.muted` gray200 **2.324**; `text.subtle` gray100 **3.411**.

*Light mode, text on its family background:* `success.text` green500/green100 **4.369**; `error.text` pink400/pink100 **4.187**; `warning.text` orange400/orange100 **3.518**; `select.text.rest` cyan400/cyan100 **2.820**; `select.text.default` gray200/gray100 **1.468**; `progress.current.text` cyan400/cyan300 **1.573**; `progress.pending.text` gray300/white300 **4.086**; `progress.completed.text` green400/green100 **2.632**; `progress.error.text` pink400/pink100 **4.187**.

**Two findings Peter should see explicitly:**
1. **The green ramp cannot satisfy both pairings.** `green500` is the darkest step; on `success.background` (green100) it reaches only 4.369 — 0.13 short. Closing the family pairing needs a design change (a darker green step or a deeper success background), which is outside this authorization. `color.progress.completed.text` is the same defect class as the one just fixed (green400 on green100 = 2.632) in a token the authorization did not cover.
2. **The dark theme has no designed backgrounds.** No feedback/progress `.background` token has a dark override, so a dark-mode family pairing composes a dark text against a light background (success: green300 on green100 = 1.694). The new guard therefore asserts the family pairing in light mode only and says so in its header. The honest reading: dark-mode banners/badges/stepper nodes have no valid contrast story yet, and this fix improved the dark canvas pairing (2.977 → 4.625) while that undesigned family pairing moved 2.632 → 1.694.

### F5 — Task 6.2: requirement threshold relaxed 3× without a record
R11 AC4 requires ΔE₀₀ **< 1** for non-intentionally-changed colors. The shipped assertion is `expect(dE).toBeLessThan(3)` while the file's docblock still cites "< 1 … (Spec 112 R11 AC4)"; the in-line comment concedes "ideal < 1, but lightness rounding introduces drift". `feedback.md` contains no discussion of the relaxation and no ratification. **Recommendation (Ada)**: either tighten to <1, or amend R11 AC4 with the rounding rationale and fix the docblock so code and claim agree.

### F6 — Completion-documentation coverage gaps (4)
Per `completion-documentation-guide` § "When to Create Each Document": every subtask requires a detailed doc (Setup = Tier 1), every parent requires **both** a detailed doc and a summary doc. Missing from Spec 112: `completion/task-2-completion.md`, `docs/specs/112-oklch-color-migration/task-2-summary.md`, `docs/specs/112-oklch-color-migration/task-7-summary.md`, `completion/task-7-3-completion.md`. **The 7.3 coverage answer**: 7.3's *work* shipped and is verifiable (`RELEASE-NOTES-12.0.0.md` covers new output format, ChromaKit/colormath deps, palette refinements, blend changes, intentional visual changes, and the install→sync→generate path), and `task-7-completion.md` lists it as an artifact — but that is parent-level mention, not the required Tier 1 subtask doc. It is a real doc-coverage gap, not coverage-by-another-artifact.

### F7 — A structural pattern in the parent docs: unmet criteria are dropped, not marked failed
Parents 4 and 6 each present a criteria table with **fewer rows than tasks.md defines**, and in both cases the omitted rows are precisely the unmet ones (4: "platform blend utilities all use OKLCH"; 6: "green success.text ≥4.5:1" and "Spec 106 consumer contract test passes"). Parent 6 additionally reworded "All semantic pairs **pass** WCAG AA" to "**evaluated** against" and restated ΔE₀₀ <1 as <3, both marked ✅. No row in any Spec 112 parent doc is marked ⚠️ or ❌. The verification tables were authored from what was done rather than checked against what was promised — which is the mechanism that let 3.3, 3.2, 4.2 and 6.1 pass as complete.

---

## Closing Assessment: 3.3 is a **pattern**, not a one-off

Five unshipped-work findings (2.3, 3.2, 3.3-DTCG, 3.3-token-index, 4.2/parent 4, 6.1 — six if the two 3.3 seams are counted separately), of which **four remain open today**: init scaffolding (R4 AC4), the blend-utility rework, the WCAG-theme overrides, and the ΔE₀₀ threshold. Four of them share the 3.3 signature exactly — **a tested utility module is created, the existing seam it was meant to modify is never touched, and the parent's success-criteria table asserts the seam works.** Two of those escapes reached consumers (semantic tokens shipping RGBA in v12.0.3; Figma receiving legacy hex for ~3 months); two were caught by later audits (Spec 117's orphan sweep; this one).

This triggers the charter's process note. The proximate mechanism is F7 — self-attested parent verification tables with no promised-vs-shipped check. Three observations worth carrying into the verification-grade standard, offered for Peter's decision rather than adopted here:

1. **The cheapest guard is mechanical and already proven**: the signature is "file named `(modified)` in the task text does not appear in the task's diff." A required check could compute that from `tasks.md` annotations at PR time. Spec 112 predates PR gating entirely — it landed as one 114-file direct commit — so today's gate already removes the *review* half of the failure; it does not yet remove the *claim* half.
2. **Counter-argument I owe you**: every one of these gaps was eventually caught (two by audits, two by consumer symptoms, one by this audit), and four of the five sat in a subsystem — blend, WCAG overrides — that was already under a separate open issue. A stricter parent-verification rule buys earlier detection, not detection that would otherwise never happen, and it taxes every future parent task to prevent a failure mode whose base rate is one spec's worth of evidence. If Peter reads that as insufficient justification for new required-check machinery, the honest fallback is small: require parent criteria tables to reproduce **all** tasks.md criteria rows verbatim, marking unmet ones ⚠️ with a link to the follow-up issue. That is a template change, not a gate.
3. **Scope note for the standard**: parent docs, not subtask docs, are where this failed. Subtask docs in Spec 112 were largely *honest* — 2.3 said "Partial", 4.2 disclosed the deferral, 3.2 quietly narrowed its requirements line. The claims hardened into ✅ one level up.

### Routed to Ada (recommendations — nothing implemented by this audit) — *statuses annotated 2026-09-13*
- **F4 (highest)**: WCAG-theme overrides for the six `NEEDS_OVERRIDE` pairs, or a recorded accepted-deviation; `color.feedback.success.text` at 2.84:1 is a live AA failure. — **REMEDIATED**: success.text fixed at #152 (green500/green300 + the SemanticColorContrast guard); dark text hierarchy at #153; the remaining sub-AA pairs are pinned exemptions on `.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md`, deferred by Peter's 2026-09-13 ruling to the Semantic Contrast & Theme Coverage spec (post-125-B).
- **F5**: reconcile R11 AC4 (<1) with the shipped `toBeLessThan(3)` and the contradicting docblock. — **CLOSED at #155** (Peter-ratified Option A + riders 1–2; § "F5 Ruling & Remediation" below).
- **3.2 / R4 AC4**: `npx designerpunk init` still scaffolds neither ChromaKit nor colormath; Integration Guide documents them manually, so consumers are not stranded, but the AC is unmet. — **OPEN** (low priority; mitigated by docs; no session scheduled).
- **F3**: no new item — folds into the open `2026-06-24-blend-system-architecture-and-oklch-alignment.md` (Ada-owned); this audit supplies its provenance. — **FOLDED 2026-09-13** (Peter-directed): provenance addendum + the task-5.1 wrong-engine coverage finding recorded on that issue; future Ada-led blend spec cites it.

### Routed to Thurgood/Peter — *statuses annotated 2026-09-13*
- **F6**: four missing completion/summary docs. Recommend recording as a known historical gap rather than back-filling 2026-06 docs from memory — back-filled completion docs would be exactly the unverifiable self-attestation this audit is about. — **DISPOSED as recommended**: this audit's record IS the historical-gap record; no backfill.
- **F7**: the parent-criteria-table template question above. — **STILL PENDING Peter's ruling** (the proposed cheap rule: parent verification tables reproduce ALL tasks.md criteria verbatim, unmet rows marked ⚠️ with a follow-up link; counter-argument recorded in § Closing Assessment). The only audit item without a disposition.

### Scope discipline note
Two temptations to exceed the audit's scope, both declined: (a) F4 is a live WCAG AA failure and the fix is a two-line override edit — I did not make it; audits report, Ada fixes. (b) F5's docblock contradiction is a one-word correction in a test file that sits inside my write scope (`src/__tests__/**` — though this file is `src/color/__tests__/`, outside it) — also left alone, because changing the claim without deciding the threshold would paper over the finding. Nothing in the source tree was modified; the only file this session touched is this charter.

---

## F5 Ruling & Remediation (2026-09-13 — Peter-ratified, record-first)

**Ruling (Peter, 2026-09-13, after Ada + Thurgood consults, both endorsing)**: **Option A** — reclassify `purple200/300/400` + `green100` into the test's `INTENTIONALLY_CHANGED` set and restore the ratified **ΔE₀₀ < 1** for the remaining 12 colors; fix the header/assertion contradiction; delete the dead documentation-theater block. Riders elected: **(1)** exemption-set hygiene + anchor-exactness assertions, **(2)** docblock reframe to "composed-color stability guard." Rider (3) (recorded-delta bands on the intentional set) **declined** — Ada's grounds: recurring maintenance tax on legitimate palette refinement, tight bands become a de-facto palette freeze, and magnitude-keyed guards erode the causal criterion this ruling rests on; revisitable at the deferred Semantic Contrast & Theme Coverage spec. Recording form per Thurgood: issue-driven ruling entry, PR-merge-as-ratification (#138 precedent) — not ballot-grade (domain content, not governance law).

**The exemption criterion, stated for the record**: AC4's carve-out ("not intentionally changed by palette refinements") is **causal, not magnitudinal** — a color is exempt because a ratified design act caused its delta, never because its delta is large. This is the meaning already in force: ~30 of the 34 pre-existing exemptions trace to R1/R2 acts, not R7's literally-titled refinements; and white100/black500 are deliberately-redesigned colors with ΔE = 0.000. A color failing the gate is never exemptable *by* failing it.

### Verification-grade evidence (Ada and Thurgood computed independently; main session reproduced; all three agree)

Mechanism: **family-hue systematization** — R1 AC1/AC3/AC6 (ratified) collapse each family to ONE hue token, derived "as median of 5-step hues" (task-2-1a-completion.md § Conversion Process; `src/tokens/color/channels/hues.ts` header); `src/tokens/color/primitives/chromatic.ts:48` composes the family hue unconditionally, so preserving a per-step hue is architecturally impossible. The resulting chroma-scaled hue-lock drift runs through EVERY family; it crosses ΔE 1.0 only for these four chroma × hue-delta combinations. Identical class to the already-shipped pink100/200 exemption ("hue normalization … normalized to family hue H=10").

| color | ΔE₀₀ | L old→new | C old→new | H old→new | ΔE with hue held at original (non-hue residual) |
|---|---|---|---|---|---|
| purple200 | 1.930 | 0.7582→0.76 | 0.1792→0.179 | 313.93→310 | 0.134 |
| green100 | 1.737 | 0.9791→0.97 | 0.0291→0.029 | 169.75→154 | 0.535 |
| purple300 | 1.405 | 0.6010→0.60 | 0.2863→0.286 | 307.98→310 | 0.091 |
| purple400 | 1.076 | 0.5104→0.51 | 0.2410→0.241 | 308.27→310 | 0.042 |

Post-reclassification, the 12 remaining threshold-bound colors max at **0.7406** (yellow100) in OKLCH space — and **0.579** (purple500) under AC4's literal round-trip formulation (Ada verified both; quantization partially cancels rather than compounds). `< 1` holds with real margin on either reading. **No primitive or composed color value changes** — this is a test-file + record change only.

**Candid caveats recorded with the ruling**: purple400 clears 1.0 by 0.076 — exempted by cause (non-hue residual 0.042), and only by cause; purple's family hue 310 sits 1.26° off the computed median 308.74 (largest such deviation of any family; a judgment call inside the recorded derive-and-round envelope, same standard as pink's accepted 10.24→10.0).

**Provenance of the original defect**: the relaxation to < 3 was written into `task-6-2-completion.md` ("All pass ΔE₀₀ < 3") against the ratified < 1 and never escalated — an F7-pattern instance (that doc also says "15 colors" where the test binds 16; minor record defect, noted, not rewritten). Historical completion docs stay as-is per F6's no-backfill principle; this entry is the correction of record.

**Cross-surface alignment (Ada's finding)**: seven surfaces claimed conflicting thresholds; with this ruling the live surfaces (test assertion + docblock) return to < 1, making the ratified requirement (requirements.md:172), shipped governance law (`Product-Token-Governance.md:92`, ΔE₀₀ ≤ 1.0), and the published v12.0.0 release-notes claim all TRUE as written. Option B ("ratify < 3") was rejected precisely because it would have required amending governance law and a shipped consumer-facing release note; Option C (retire) rejected as it removes the only guard tying composed pipeline output to an external reference.

**Execution**: Ada, on this branch, riding this PR (record lands atomically with the fix). F5 CLOSES at this PR's merge.
