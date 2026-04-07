# Task 2.4 Completion: Kotlin Generator Theme Types

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 2.4 - Kotlin generator: theme types
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Implemented `generateKotlinThemeTypes` — new generation code that produces a Kotlin theme type system from registered themes.

### Generated Output Structure

- `{Name}Theme` data class with Compose `Color` properties for all theme-varying tokens
- `{Name}Themes` object with named instances (BaseLight, BaseDark, per-theme instances)
- `Local{Abbreviation}Theme` CompositionLocal with base light default

### Key Decisions

- **Compose `Color` type directly** — per task spec. Uses `Color(r, g, b, a)` with integer ARGB values.
- **Same theme-varying detection as Swift** — union of override keys + base light/dark differences.
- **Product naming** — `{Name}` and `{Abbreviation}` from config flow through to all generated type names.

---

## Validation

- Kotlin theme type tests: 6/6 passing
- Full test suite: 316 suites, 8179 tests, all passing
- Snapshot regression: all 8 files match

---

## Artifacts Created/Modified

1. `src/generators/TokenFileGenerator.ts` — added `generateKotlinThemeTypes`, `rgbaToComposeColor`; wired into `generateThemeOverrideBlocks`
2. `src/generators/__tests__/KotlinThemeTypes.test.ts` — 6 tests

---

## Requirements Traced

- R3 AC 12: Kotlin data class generated with theme-varying properties ✅
- R3 AC 13: Named instances per theme in Themes object ✅
- R3 AC 14: Light+dark variants for both-mode themes ✅
- R3 AC 15: Single instance for dark-only themes ✅
- R3 AC 16: CompositionLocal with base light default ✅
- R3 AC 17: Static tokens unchanged ✅
