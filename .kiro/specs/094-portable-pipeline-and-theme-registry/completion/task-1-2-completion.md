# Task 1.2 Completion: Implement ThemeRegistry

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 1.2 - Implement ThemeRegistry
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Created `src/themes/ThemeRegistry.ts` — the central theme collection for the token pipeline.

### Interface

- `register(theme)` — accepts name, mode (`'dark' | 'light' | 'both'`), and `SemanticOverrideMap`. Throws on duplicate name or invalid override references.
- `get(name)` — retrieve by name
- `getAll()` — all themes in registration order
- `getThemeVaryingTokens()` — union of all overridden token names across all themes. Used by generators to split static vs themed output.
- `setSemanticValidator(fn)` — optional callback for registration-time override validation
- `clear()` — remove all themes
- `size` — count

### Validation

Registration-time validation (fail fast):
- Duplicate name → `"Theme 'marketing' is already registered"`
- Unknown semantic token reference → `"Theme 'marketing' references unknown semantic token 'color.hero.accent'"` (when validator is set)

The validator is optional via `setSemanticValidator()` so the registry can be used standalone (tests, config loading) or with full validation (pipeline integration where the semantic registry is available).

### Test Coverage

8 tests covering:
- Valid registration (single and multiple)
- Duplicate name rejection
- Invalid override reference rejection
- Get by name (found and not found)
- GetAll ordering
- Theme-varying token set computation (empty, single theme, union across themes)
- Clear

---

## Validation

- ThemeRegistry tests: 8/8 passing
- Full test suite: 312 suites, 8146 tests, all passing
- No regressions (pre-migration snapshots still match)

---

## Artifacts Created

1. `src/themes/ThemeRegistry.ts` — ThemeRegistry implementation
2. `src/themes/__tests__/ThemeRegistry.test.ts` — unit tests

---

## Requirements Traced

- R1 AC 1: Theme registered with name, mode, and override map ✅
- R1 AC 2: Registry iterates over all registered themes ✅
- R1 AC 3: Duplicate name rejected with clear error ✅
- R1 AC 4: No custom themes → pipeline generates base themes only (registry supports empty state) ✅
- R2 AC 5: Override references validated against semantic token registry ✅
