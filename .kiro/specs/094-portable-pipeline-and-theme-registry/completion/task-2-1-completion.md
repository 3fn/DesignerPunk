# Task 2.1 Completion: Split generatePlatformTokens for Theme-Aware Output

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 2.1 - Split `generatePlatformTokens` for theme-aware output
**Type**: Architecture
**Validation Tier**: 3 - Comprehensive
**Agent**: Ada

---

## What Was Done

Added the architectural foundation for theme-aware platform output generation. This is the structural split that enables subtasks 2.2-2.4 to implement platform-specific theme generation.

### New Interfaces

**`ThemeOverrideSet`** — generalizes the WCAG-specific fields to support any registered theme:
- `name` — theme name for CSS `data-theme` attribute and generated type names
- `mode` — `'dark' | 'light' | 'both'`
- `lightTokens` / `darkTokens` — resolved tokens for each mode
- `overrideKeys` — token names that have overrides in this theme

Added `themeOverrides?: ThemeOverrideSet[]` to `GenerationOptions`.

### New Methods

**`generateThemeOverrideBlocks(platform, baseLight, baseDark, themeOverrides)`** — dispatches to platform-specific theme block generators. Entry point for all theme override generation.

**`generateWebThemeBlock(baseLight, baseDark, theme)`** — generates a single `:root[data-theme="name"] { ... }` CSS block with:
- `color-scheme: dark` for dark-only themes
- Static values (no `light-dark()`) for single-mode themes
- `light-dark()` wrapping for `mode: 'both'` themes when light/dark values differ

iOS and Android stubs are in place — Task 2.3 and 2.4 will implement them.

### What Didn't Change

- `generatePlatformTokens` — unchanged, still produces the static token portion
- `maybeGenerateWcagBlock` / `generateWcagOverrideBlock` — preserved for backward compatibility during migration
- All existing generation paths — no output change

### Architecture Decision

The existing `generatePlatformTokens` method stays as-is for the static portion. The new `generateThemeOverrideBlocks` method handles theme-specific output. This separation means:
- Static tokens (primitives, non-theme-varying semantics, motion, layering) use the shared code path
- Theme-varying output uses platform-specific methods that can diverge (CSS scoped blocks vs Swift protocol+structs vs Kotlin data class+instances)

The `{Name}` and `{Abbreviation}` config parameters will be threaded through when the config system (Task 3) is built. For now, the Swift and Kotlin stubs are placeholders.

---

## Validation

- Full test suite: 313 suites, 8160 tests, all passing
- Snapshot regression: all 8 files match (no output change — new methods not yet called from generation path)
- No regressions

---

## Artifacts Modified

1. `src/generators/TokenFileGenerator.ts` — added `ThemeOverrideSet` interface, `themeOverrides` field on `GenerationOptions`, `generateThemeOverrideBlocks`, `generateWebThemeBlock`

---

## Requirements Traced

- R3 AC 1-5: Web theme scoping architecture in place (generateWebThemeBlock) ✅
- R3 AC 2: `data-theme` attribute scoping implemented ✅
- R3 AC 3: Dark-only `color-scheme: dark` handling implemented ✅
