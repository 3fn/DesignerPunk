# AndroidBuilder camelCase dead path — latent naming divergence (audit confirmed)

**Date**: 2026-08-26
**Status**: Confirmed by Ada; Peter supportive of scoped deletion contingent on verification (2026-08-26). Implemented on `chore/androidbuilder-dead-path` — acceptance is the PR merge.
**Owner**: Ada (token/export pipeline)
**Type**: Latent divergence / dead-code hazard — no shipped output is wrong today

---

## Finding

`src/build/platforms/AndroidBuilder.ts` contains `toKotlinConstantName()` (~line 1264) producing **camelCase** Kotlin constants (`space100`), which contradicts the governed Android naming contract — **snake_case** (`space_100`), per `rosetta-system-principles` § "Naming Convention Governance", the Application MCP platform names, and the shipped `dist/android/DesignTokens.android.kt`.

**The camelCase path is dead in shipping code.** Verified (audit + Ada's independent pass):

1. The shipping pipeline is `npm run generate:platform-tokens` → `scripts/generate-platform-tokens.ts` → `TokenFileGenerator` → `src/providers/AndroidFormatGenerator.ts`, which does explicit snake_case conversion (lines ~125–135, ~592–599, ~636–643). Contract intact.
2. `TokenFileGenerator` uses `AndroidBuilder` **only** for the motion section (`generateMotionSection()`, ~1466–1505): `generateDurationTokens` / `generateEasingTokens` / `generateScaleTokens` / `generateSemanticMotionTokens`. Those use `toKotlinTypeName` (PascalCase nested objects — `Duration.Duration250`, `Easing.EasingStandard`), which matches shipped output and is a correct, distinct convention. These four methods are **live** code.
3. The camelCase path is reachable only via `AndroidBuilder.build()` → primitive/semantic/component generation (~491–863, incl. `generateSpacingTokensFile` etc., producing a separate `Tokens.kt`). Outside its own tests, **nothing calls `build()`**: not `BuildOrchestrator` (imports `TokenFileGenerator` directly), not the `src/build/platforms/index.ts` barrel (exports only `PlatformBuilder` + `iOSBuilder`), not the package `exports` map, not Spec 094's portable pipeline.
4. Origin: pre-numbered `cross-platform-build-system` spec (Oct 2025). Specs 076 (design.md ~114) and 079 (design.md ~87–89, tasks 1.4) refer to `AndroidBuilder` as "the Android generator" — **terminology-only conflation**: Ada traced 079 task 1.4's completion doc and the actual edit correctly landed in `AndroidFormatGenerator.ts`. No misdirected production edit has occurred yet.

## Hazard

- The dead path's tests (`AndroidBuilder.tokenGeneration.test.ts`, `AndroidBuildIntegration.test.ts`, etc.) stay green, lending false legitimacy.
- Spec prose has already conflated the two Android generators; a future author taking it at face value could wire `build()` into a real pipeline and ship camelCase constants.

## iOS/Web quick check (Ada)

No equivalent divergence: `iOSBuilder` → camelCase matches shipped Swift (idiomatic); `WebBuilder` → kebab-case matches shipped CSS. Android is the only platform where the dormant path's naming helper disagrees with the governed contract. (Grep-level check only, not a full reachability audit.)

## Ada's disposition recommendation (Peter to rule)

**Recommended: scoped deletion** — delete `AndroidBuilder`'s `.build()`-reachable primitive/semantic/component generation methods (+ `toKotlinConstantName`, the `*TokensFile` helpers) and their dedicated tests; **keep the four live motion methods**. Rationale: the path is affirmatively wrong against governance, not merely unused; aligning it to snake_case would create a second source of truth for the naming rule (the drift mechanism itself); green tests are the legitimacy-laundering vector.

**Counter-argument (Ada)**: deletion forecloses a potential future per-family Kotlin file-splitting builder for the Spec 094 portable-pipeline architecture; the cheap reversible alternative is a loud guard comment on `build()`/`toKotlinConstantName` ("NOT the shipping naming convention — see AndroidFormatGenerator") preserving optionality but leaving the landmine armed. Ada leans deletion; risk-tolerance judgment is Peter's.

**Pre-fix note**: if deletion is ruled, run the same reachability check on `iOSBuilder`/`WebBuilder` `.build()` paths — if symmetric, one cleanup task covers all three.

## Resolution (2026-08-26)

Scoped deletion implemented per Ada's recommendation, with Peter's verification condition satisfied:

- `AndroidBuilder.ts` rewritten as a motion-token-only generator: keeps the four live motion methods + `toKotlinTypeName`; deletes `build()`, the entire Android-library path (`generateAndroidLibrary`, `generateBuildGradle`, `generateAndroidManifest`, Compose component/extension/test-file generation), the camelCase primitive/semantic/component token generation, the `*TokensFile` splitters, `toKotlinConstantName`, `validate`/`clean`, and the `implements PlatformBuilder` contract. Header now documents the shipping pipeline and the retirement.
- Deleted dead-path tests: `src/build/platforms/__tests__/AndroidBuilder.tokenGeneration.test.ts`, `src/build/__tests__/AndroidBuildIntegration.test.ts`.
- Verification: full `tsc --noEmit` clean; full `npm test` green (365 suites / 8,888 tests); shipped `dist/android/DesignTokens.android.kt` regenerated under old vs new builder is **byte-identical excluding the timestamp header**.
- Follow-up flagged: `src/build/validation/AndroidBuildValidator.ts` orphaned by the deletion — **cleaned up 2026-08-26 on Peter's direction after #143 merged** (validator + its dedicated test + barrel export removed; nothing imports the `build/validation` barrel outside the validation dir; full suite green at 364 suites / 8,874 tests). iOS/Web dormant `.build()` paths carry no naming hazard (conventions coincide) — **swept 2026-08-26 on Peter's direction after #145 merged**: `iOSBuilder`/`WebBuilder` trimmed to motion-token-only generators (same shape as AndroidBuilder), their dead-path tests deleted (`iOSBuilder.test.ts`, `WebNPMPackageStructure.test.ts`, `WebCSSTokenGeneration.test.ts`), and both orphaned validators removed (`iOSBuildValidator` — already orphaned, no dedicated test existed; `WebBuildValidator` + its test) with their barrel exports. `PlatformBuilder.ts` kept: `ParallelExecutor` (production orchestration) imports it. Verified: tsc clean; full suite 360 suites / 8,799 tests green; all THREE regenerated dist outputs (android .kt, ios .swift, web .css) byte-identical excluding timestamp.

**New finding from the sweep**: all three ShadowGenerators (`src/build/platforms/{Web,IOS,Android}ShadowGenerator.ts`) were consumed by nothing except their own tests — **swept 2026-08-26 on Peter's direction after #146 merged** (all six files deleted; exported symbols `ShadowCSSValue`/`ShadowSwiftValue`/`ShadowKotlinValue` verified consumer-free; shipped shadow tokens come from the providers path and regenerate identically — 110 shadow lines intact in `DesignTokens.web.css`; tsc clean; 357 suites / 8,752 tests green). Remaining note: the `src/build/platforms/index.ts` barrel has zero importers (left as-is).

## Future chore (flagged 2026-08-26, Peter's direction): rename the trimmed Builders

After the sweep, `AndroidBuilder`/`iOSBuilder`/`WebBuilder` are motion-section formatters only (four motion methods each, called by `TokenFileGenerator.generateMotionSection()`), but the "Builder" names still imply they build platform output — the same misreading that led specs 076/079 to call `AndroidBuilder` "the Android generator." Rename to intent-revealing names (e.g. `AndroidMotionTokenFormatter`, or fold into the providers family's naming) and update: `TokenFileGenerator`'s three `require()` calls in `generateMotionSection()`, the three kept motion test files, `src/build/platforms/index.ts` (or retire the importer-less barrel in the same pass), and file headers. Mechanical rename; owner Ada; no behavior change — the byte-diff regeneration check from this arc is the acceptance test.
