# Charter: the consumer-generation completeness spec — the consumer's own `generate` becomes the single source of every token artifact their code compiles against

**Date**: 2026-10-02
**Status**: ACTIVE (chartered, not started)
**Owner**: Ada (token pipeline and generators). **Lina** owns the component tier: the component-token harvest, and the cross-check of the native components' `theme.<token>` names against what is emitted. **Thurgood** formalizes the spec (design outline → requirements → design → tasks). **Decision**: Peter, at each formalization gate.
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass (CLOSEOUT), which reads whether the spec this charter chartered delivered scope items (i)–(vi). *(was: `manual` — Spec 129's formalization opens (rank 1 in `2026-10-18-spec-priorities-by-outcome.md`); the design outline is still a placeholder. *(was: **the next spec kickoff after 15.0.0 ships.** "Ships" means the publish is verified: `scripts/verify-publish-rail.sh` passes and its record has merged (RELEASE-FLOW step 6).)* *(Token set 2026-10-20, Ada, rules 1 and 9.)*)* *(Intake per E2 of ballot 2026-10-20-manual-records-routed-readers, re-ruled by the owner 2026-10-20, Ada, rule 9. The path is the delivering file named in the ballot's § 3 (D); once 129's tasks.md numbers the carrying parent, the owner re-rules it to that parent's completion doc.)*
**Class**: P2 obligation (record) · charter *(set 2026-10-20, Ada, rule 12. A chartered spec with a recorded principle, scope items (i)–(vi) and acceptance sentence; nothing built, and no reader is misled by the charter.)*
**Source**:
- Peter's rulings at the 15.0.0 release-prep sitting, 2026-10-02, relayed by the orchestrator:
  - 3a: *"Go with the middle path, ship 15 with the honest native scoping"*, which named this spec as the next work, Ada's with Lina;
  - 3b: *"Go with A, disclose — and capture the follow-up"*.
- The orchestrator consult (six seats: Ada, Lina, Leonardo, Kenya, Data, Sparky) on Peter's "what if we didn't ship the tokens?" idea.
- **Related issues**:
  - `2026-06-28-spec-094-platform-theme-emission-unwired.md` (item (i));
  - `2026-10-01-integration-guide-m0a-vs-snapshot-negative.md` (the guide text 15.0.0 ships);
  - `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` (the ship-directory hygiene, separate).

---

## The principle (Peter's choice)

> **The consumer's own `generate` is the single source of every token artifact their code compiles against. The package ships sources, generators and components — never a snapshot a consumer could mistake for theirs. The one exception is the labelled no-build web evaluation bundle.**

## Scope

1. **(i) Wire the Spec 094 theme emission for iOS and Android.** Thread the theme overrides into `generatePlatformTokens` so that `generateThemeOverrideBlocks` is called, emitting:
   - Swift: the `{Name}Theme` protocol/struct and the `EnvironmentKey`;
   - Kotlin: the theme data class and the `CompositionLocal`.

   **Today**: 14 theme-varying semantic colours are stripped from native output and emitted nowhere. Ten were absent at 14.1.0 and four are new in 15.0.0 (measured 2026-10-02). Lina cross-checks her components' `theme.<token>` names. The 094 fixtures are re-baselined deliberately. **This is the first deliverable.**
2. **(ii) Harvest the component tier at the consumer's `generate`.**
   - DesignerPunk's component token definitions must reach the consumer's own generated output.
   - The **name contract must cover the component tier**; today it excludes it (Peter's P1 ruling, Task 6).
   - **Spec 123 Requirement 1.5 is reopened**: the recorded decision on "whether our components' token definitions reach the consumer's harvest at all". Lina leads.
3. **(iii) Retire the native root files** `dist/DesignTokens.{ios.swift,android.kt}` at the **next MAJOR**, once (i) and (ii) have shipped.
   - **Per the approved plan**: the native `dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt` retire with the native root files, once item (ii) ships, because item (ii) then emits the same component-token groups into the consumer's own output. `dist/ComponentTokens.web.css` keeps shipping, because the shipped web components read its custom properties, and the web CSS exports stay. **15.0.0 announced no deprecation**, so the retirement is announced in the release that does it. *(Amended 2026-11-05, Ada, owner, rule 9. Source: Spec 129's native plan, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` § 2, WP1 ("`dist/ComponentTokens.*` stops shipping under item (iii); web keeps the package CSS until a major (Lina)"), at `b89163c41` (#651), approved as a whole by Peter, "A yes", received 2026-11-05T04:07:43Z (`evidence/2026-11-05-native-plan/README.md`). Plan-r2 § 7 names the question as the team's ("It reaches you only as item (iii) text"). Read in 129's requirements round as Requirement 10.1 ([ADA R1]). Why the native files go: once item (ii) ships, a shipped native copy is the snapshot a consumer could mistake for theirs, which the principle above rules out, and Kenya measured that in one module it is refused (`filename "ComponentTokens.ios.swift" used twice`, then `invalid redeclaration of 'ProgressTokens'`). Was, verbatim: "**Per the consult**: `ComponentTokens.*` keeps shipping (the component surface), and the web CSS exports stay. **15.0.0 announced no deprecation**, so the retirement is announced in the release that does it.")*
4. **(iv) `init` runs `generate`, with `--output`.** The first render produces the consumer's own artifacts. Coordinate with U3 (Spec 123 Tasks 19–22, onboarding), which owns `init`'s user experience.
5. **(v) Per-platform output paths**: the M0b `platforms:` configuration (Integration Guide § "Native Platform Sync — Target Model (M0b)"). Each platform's output lands where that platform's build reads it.
6. **(vi) Tracked line: the Model-B theme-override leak.** Owners **Lina + Ada**. **Trigger**: this spec's design phase, where it is decided and not just carried.
   - **Read, not run, 2026-10-02**: `src/generators/generateTokenFiles.ts` L19–21 statically imports the **package's own** `tokens/themes/{dark,wcag,dark-wcag}/SemanticOverrides` and registers those (L135–148). It does not use the consumer's copied tier or the `themes` in their config.
   - **Consequence**: a consumer's `generate` takes its dark and WCAG values, and its native theme-varying strip set, from **whichever package version is installed**. That contradicts Model B ("our content never flows into theirs after birth").
   - 15.0.0's notes flag the dependent claim as `[VERIFY]` (the WCAG dark fixes reach existing installs through this path).
   - **The question**: is the consumer's copied theme tier (or their config `themes`) the source, and if so what does that do to (i)?

## Acceptance

> **A stranger's `init` → `generate` yields their own token output, the component tier included, that compiles and is themed on all three platforms, with nothing copied from `node_modules`. DesignerPunk's native component source compiles against it in place from a packed install, except for pinned errors, each tagged to an open record and none tagged to a 129 row.**

- Proven on a packed install, never in-repo (Spec 123 Req 3.1's rule).
- "Compiling" is established by a platform build, not by inspection. The platform build-verification harness charter (`2026-09-17-platform-build-verification-harness-candidate.md`, Kenya/Data) is the likely instrument, and the tasks round checks that it exists.
- On web, "compiles" means the existing consumer guard (native plan `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` § 7 item 2).

**Narrowed 2026-11-05 (Ada, charter owner; Peter's words received 2026-11-05T04:07:43Z)**: the acceptance sentence above replaces the one this record carried since 2026-10-02, which read: "A stranger's `init` → `generate` yields a compiling, themed target on all three platforms with nothing copied from `node_modules`." That sentence moves word for word into Spec 132's acceptance. Until 132's outline exists, its home is `.kiro/issues/2026-09-26-native-component-distribution.md`. Peter, verbatim: "A yes, B (a), C yes; (x′) as defined". B (a) is the narrowing to this wording, which he had read verbatim at plan-r2 § 7 item 2 (Ada's wording, corrected by Stacy in PLAN R1).

## Consequence recorded now

**Release 3's "first release a stranger should be pointed at" claim narrows to web unless this spec lands first.** Thurgood carries this into U3's plan (Spec 123 `tasks.md` § "Expected release count", release 3).

## Counter-argument folded in, and what survives

- **Folded**: making the consumer's `generate` the single source (ii) removes the shipped-snapshot trap. It also couples two sources the consumer does not see as one: their primitives and our component tokens.
- **Surviving**: if a consumer renames or deletes a primitive that our component tokens reference, the component tier breaks silently. **The name contract excludes the component tier today**, so nothing reports it. Item (ii)'s name-contract coverage is the mitigation, and it is a requirement of (ii), not optional.
- **Also surviving**: retiring the native files (iii) removes the only artifact a consumer who does not run the pipeline could use. The principle accepts that cost knowingly; the web evaluation bundle is the only exception.

## Not in scope here

- Any code, spec text or Integration Guide edit. This file is the charter.
- The 15.0.0 guide wording, which is the ballot owed under the M0a issue.
- The ship-directory hygiene, which is its own issue.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 37, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (Spec 129's formalization opens; rank 1 in the priorities record) · `P2 obligation (record) · charter`.
