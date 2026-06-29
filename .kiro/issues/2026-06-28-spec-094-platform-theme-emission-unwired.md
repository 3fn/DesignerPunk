# Spec-094 Platform Theme Emission Unwired (Shipped Half-Change)

**Date**: June 28, 2026
**Discovered By**: Kenya / Data (platform-agent AX assessments, Spec 119) → diagnosed by Ada (token pipeline)
**Spec**: 094-portable-pipeline-and-theme-registry (repair of deferred integration)
**Status**: Proposed — **DEFERRED** (captured to keep focus on Spec 119 formalization)
**Priority**: High (live native-platform contract gap)
**Impact**: All iOS/Android platform token output; migrated native components consume a theming contract the build does not emit
**Assigned To**: Ada (generator wiring) + Lina (component-contract cross-check) + Thurgood (governance audit signal)

---

## Summary

`dist/DesignTokens.ios.swift` and `dist/DesignTokens.android.kt` lack the Spec-094 theme scaffolding — flat `Color.oklch(...)` / `Oklch(...).toComposeColor()` literals, **no** `{Name}Theme` protocol/struct, **no** `EnvironmentKey` (Swift) / `CompositionLocal` (Kotlin). The Application MCP (`get_token_details`) reports theme-varying semantic colors (e.g. `color_action_navigation`, `color_structure_canvas`) as `themeVarying: true` with android access path `theme.<token>` — so **the index is faithful to the intended output; the generated files regressed below it.**

This is **not stale output** and **not an unbuilt feature** — it is a **shipped half-change**: the emission capability exists and is tested, but was never wired into the build, while the paired *removal* half and the dependent component migration both shipped.

## Root cause (verified at the call-graph level)

- **Capability exists + tested.** `src/generators/TokenFileGenerator.ts` → `generateThemeOverrideBlocks()` (~:1023) → `generateSwiftThemeTypes()` (~:1125) / `generateKotlinThemeTypes()` (~:1280) / `generateWebThemeBlock()` (~:1053). Tests `src/generators/__tests__/{SwiftThemeTypes,KotlinThemeTypes,CSSThemeScoping}.test.ts` — passing ("Spec 094").
- **Unwired.** The build path `scripts/generate-platform-tokens.ts:83` → `generateTokenFiles()` → `generateAll()` → `generatePlatformTokens()` (TokenFileGenerator.ts ~:1632) **never references `options.themeOverrides`**, and `generateThemeOverrideBlocks` has **no call site** outside its definition + the tests. Emission is gated on the optional `themeOverrides?: ThemeOverrideSet[]`, which the build never supplies. `generateTokenFiles.ts` passes `themeVaryingTokens` but not `themeOverrides`.

## The shipped-half-change history (why this slipped)

- **094 Task 2** deliberately deferred the wiring — completion doc, verbatim: *"new methods are additive, not yet wired into the generation path."*
- **094 Task 4.9** then shipped the *removal* half: wired `themeVaryingTokens` to **strip** the base theme-varying color statics from iOS/Android output — **without** the paired *emission* half. (Confirmed in dist: base `colorActionNavigation`/`colorStructureCanvas` statics gone; only `_wcag` variants remain.)
- **Lina's 094 Task 4** migrated every iOS/Android component to consume `theme.<token>` via `@Environment`/`CompositionLocal`.
- **094 was marked complete** across all tasks; **nothing tracks this gap** (`docs/roadmap/m0a-deferred-items.md` lists narrow theme deferrals, not this).

## Impact

The native iOS/Android components are **live against a theming contract the generated tokens don't provide** — the base theme-varying statics were removed and the replacement scaffolding was never emitted. Latent (or real, when those components compile in a consumer/native project) **native build gap**, not merely an agent-context inaccuracy. (Native platforms are generated-for-downstream, likely not compiled in this repo, so the break may be latent here and surface in consumers.)

## Recommended fix (Ada-specced; needs Peter's approval — changes all platform output)

Thread `themeOverrides` through the existing build: construct `ThemeOverrideSet[]` from the already-resolved contexts in `generateTokenFiles.ts` (~:222–234), pass via `generateAll` → `generatePlatformTokens`, and call `generateThemeOverrideBlocks(...)` appended **after** `generateFooter()` for iOS/Android (top-level types) and after `:root` for web. Match how the passing unit tests construct `ThemeOverrideSet`.

**Three forks (recommended low-risk defaults):**
1. **Wire it?** → **Yes** (confirmed defect; index + components already assume the contract).
2. **`ThemeOverrideSet` source** → **the resolved legacy contexts** (lowest divergence); migrating to `ThemeRegistry`/`resolveForRegistry()` is a possible separate follow-up.
3. **Scope** → **iOS/Android first** (where the removal happened and the contract is broken); web statics were *not* removed, so treat web separately to avoid unrelated diffs.

## Verification required before "done"

- Regenerate; confirm `dist/DesignTokens.ios.swift` has the `{Name}Theme` protocol/struct + `EnvironmentKey`/`EnvironmentValues` extension, and `dist/DesignTokens.android.kt` has the `Theme` data class + `CompositionLocal`.
- Emitted theme-varying tokens match `get_token_details` `themeVarying:true` + android `theme.<token>` access path for a sample (`color_action_navigation`, `color_structure_canvas`).
- **Cross-domain (the discipline that prevents a second half-change): Lina confirms her migrated components' expected `theme.<token>` names/access pattern match what's now emitted.**
- Run `{SwiftThemeTypes,KotlinThemeTypes,CSSThemeScoping}.test.ts` + the full token suite + `tsc`. **Deliberately re-baseline the 094 snapshot fixtures** (`094/fixtures/`) — wiring changes them by design; do it intentionally, not silently.

## Cross-domain / governance flags

- **Lina:** her 094 Task 4 component migration is already live against the unemitted contract — coordinate the wiring landing with a re-verify of her component compile/tests.
- **Thurgood (governance audit signal):** 094 is marked complete, yet the build regressed below the index and nothing tracked it. "Completion-claimed-but-regressed (one half of a paired change shipped)" is an audit/process signal worth a governance note, independent of the code fix.

## Evidence paths
- `scripts/generate-platform-tokens.ts` (build entry; no `themeOverrides`)
- `src/generators/generateTokenFiles.ts` (~:222–234 — the wiring site)
- `src/generators/TokenFileGenerator.ts` (`generateThemeOverrideBlocks` ~:1023; `generatePlatformTokens` ~:1632 — needs the call site)
- `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-2-parent-completion.md` (line ~15 — the "not yet wired" admission)
- `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-4-9-ada-completion.md` (the removal-half that shipped without emission)
- Test models: `src/generators/__tests__/{SwiftThemeTypes,KotlinThemeTypes,CSSThemeScoping}.test.ts`

## Decision needed
Approve the fix with the three defaults (yes / resolved-contexts / iOS-Android-first), or adjust — then Ada wires it, Lina cross-checks, full suite + fixtures verified. Deferred until Spec 119 formalization is at a stopping point.
