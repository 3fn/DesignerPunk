# Task 2 Completion: Platform Generator Restructuring

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 2 - Platform Generator Restructuring (WS4 — Phase 2: Extend)
**Type**: Parent
**Validation Tier**: 3 - Comprehensive
**Agent**: Ada
**Status**: Complete

---

## Summary

Restructured all platform generators to support theme-aware output. Each platform now has a dedicated method that produces theme-varying token types using platform-native idioms: CSS `data-theme` scoped blocks, Swift protocol + structs + EnvironmentKey, Kotlin data class + instances + CompositionLocal. DTCG generator extended with theme metadata support. All existing output unchanged — new methods are additive, not yet wired into the generation path.

---

## Subtask Completion

| Subtask | Description | Status |
|---------|-------------|--------|
| 2.1 | Split `generatePlatformTokens` for theme-aware output | ✅ Complete |
| 2.2 | CSS generator: theme scoping | ✅ Complete |
| 2.3 | Swift generator: theme types | ✅ Complete |
| 2.4 | Kotlin generator: theme types | ✅ Complete |
| 2.5 | DTCG and Figma generator updates | ✅ Complete |

---

## Architecture Decisions

### Platform-Specific Theme Methods

The shared `generatePlatformTokens` method remains for static tokens (primitives, non-theme-varying semantics, motion, layering). Theme-aware output uses platform-specific methods that diverge by necessity:

- **Web**: `generateWebThemeBlock` — CSS `[data-theme="name"]` scoped rule sets
- **iOS**: `generateSwiftThemeTypes` — protocol + concrete structs + EnvironmentKey
- **Android**: `generateKotlinThemeTypes` — data class + named instances + CompositionLocal

This split keeps shared code shared and divergent code separate.

### SwiftUI Color, Not UIColor

The Swift generator uses SwiftUI `Color` type directly, not `UIColor`. This eliminates wrapping at the consumption site — components use `theme.colorActionPrimary` directly without `Color(DesignTokens.colorActionPrimary)`.

### Compose Color, Not Int/argb

The Kotlin generator uses Compose `Color` directly with integer RGBA constructor. Same rationale — clean consumption without conversion.

### Product Naming via Config

All generated type names use `{Name}` and `{Abbreviation}` parameters that will come from `designerpunk.config.ts` (Task 3). Examples: `WrKingClassTheme`, `WKCThemeKey`, `LocalWKCTheme`.

### Theme-Varying Token Detection

Deterministic: union of all override keys across registered themes, plus tokens that differ between base light and dark. Everything else stays static. No configuration needed — the registry data drives the split.

---

## Artifacts Created/Modified

### New Files
- `src/generators/__tests__/CSSThemeScoping.test.ts` — 6 tests
- `src/generators/__tests__/SwiftThemeTypes.test.ts` — 7 tests
- `src/generators/__tests__/KotlinThemeTypes.test.ts` — 6 tests

### Modified Files
- `src/generators/TokenFileGenerator.ts` — `ThemeOverrideSet` interface, `generateThemeOverrideBlocks`, `generateWebThemeBlock`, `generateSwiftThemeTypes`, `generateKotlinThemeTypes`, `getResolvedValue`, `rgbaToSwiftUIColor`, `rgbaToComposeColor`
- `src/generators/DTCGFormatGenerator.ts` — theme metadata in root extensions
- `src/generators/DTCGGeneratorConfig.ts` — `registeredThemes` config field
- `src/generators/types/DTCGTypes.ts` — `themes` field in extensions type

---

## Validation Results

| Check | Result |
|-------|--------|
| `npm test` | 316 suites, 8179 tests, all passing |
| `npm run generate:platform-tokens` | All platforms + DTCG generated successfully |
| Snapshot regression (8 files) | All match pre-migration baselines |
| CSS theme scoping tests | 6/6 passing |
| Swift theme type tests | 7/7 passing |
| Kotlin theme type tests | 6/6 passing |

---

## Requirements Traced

| Requirement | AC | Status |
|-------------|-----|--------|
| R3: CSS Output | AC 1-5 (web scoping) | ✅ |
| R3: Swift Output | AC 6-11 (protocol, structs, EnvironmentKey) | ✅ |
| R3: Kotlin Output | AC 12-17 (data class, instances, CompositionLocal) | ✅ |
| R6: Backward Compat | AC 1 (DTCG/Figma unchanged) | ✅ |

---

## Lessons Learned

1. **JSDoc comment boundaries are fragile during `str_replace` insertions.** A stray comment fragment broke TypeScript compilation for the entire `TokenFileGenerator` class (12 test suites). Always verify the insertion boundary includes the complete comment block.

2. **The DTCG generator is more self-contained than expected.** It reads tokens directly from source modules, not from the pipeline's resolved sets. Making it fully theme-aware (generating themed token values, not just metadata) requires passing the ThemeRegistry into it — that's Task 3 work.

3. **The Figma variable modes extension is more complex than DTCG metadata.** The Figma transformer produces variable collections with modes, and adding per-theme modes requires understanding the collection model. Deferred to Task 3 pipeline wiring rather than forcing it here.
