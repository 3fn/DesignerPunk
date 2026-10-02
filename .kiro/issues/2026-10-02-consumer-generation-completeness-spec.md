# Charter: the consumer-generation completeness spec — the consumer's own `generate` becomes the single source of every token artifact their code compiles against

**Date**: 2026-10-02
**Status**: ACTIVE (chartered, not started)
**Owner**: Ada (token pipeline and generators). **Lina** owns the component tier: the component-token harvest, and the cross-check of the native components' `theme.<token>` names against what is emitted. **Thurgood** formalizes the spec (design outline → requirements → design → tasks). **Decision**: Peter, at each formalization gate.
**Trigger**: **the next spec kickoff after 15.0.0 ships.** "Ships" means the publish is verified: `scripts/verify-publish-rail.sh` passes and its record has merged (RELEASE-FLOW step 6).
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
   - **Per the consult**: `ComponentTokens.*` keeps shipping (the component surface), and the web CSS exports stay. **15.0.0 announced no deprecation**, so the retirement is announced in the release that does it.
4. **(iv) `init` runs `generate`, with `--output`.** The first render produces the consumer's own artifacts. Coordinate with U3 (Spec 123 Tasks 19–22, onboarding), which owns `init`'s user experience.
5. **(v) Per-platform output paths**: the M0b `platforms:` configuration (Integration Guide § "Native Platform Sync — Target Model (M0b)"). Each platform's output lands where that platform's build reads it.
6. **(vi) Tracked line: the Model-B theme-override leak.** Owners **Lina + Ada**. **Trigger**: this spec's design phase, where it is decided and not just carried.
   - **Read, not run, 2026-10-02**: `src/generators/generateTokenFiles.ts` L19–21 statically imports the **package's own** `tokens/themes/{dark,wcag,dark-wcag}/SemanticOverrides` and registers those (L135–148). It does not use the consumer's copied tier or the `themes` in their config.
   - **Consequence**: a consumer's `generate` takes its dark and WCAG values, and its native theme-varying strip set, from **whichever package version is installed**. That contradicts Model B ("our content never flows into theirs after birth").
   - 15.0.0's notes flag the dependent claim as `[VERIFY]` (the WCAG dark fixes reach existing installs through this path).
   - **The question**: is the consumer's copied theme tier (or their config `themes`) the source, and if so what does that do to (i)?

## Acceptance

> **A stranger's `init` → `generate` yields a compiling, themed target on all three platforms with nothing copied from `node_modules`.**

- Proven on a packed install, never in-repo (Spec 123 Req 3.1's rule).
- "Compiling" is established by a platform build, not by inspection. The platform build-verification harness charter (`2026-09-17-platform-build-verification-harness-candidate.md`, Kenya/Data) is the likely instrument, and the tasks round checks that it exists.

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
