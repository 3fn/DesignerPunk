# Task 1.2 Completion: Create computeThemeVaryingTokens utility

**Date**: 2026-06-05
**Task**: 1.2 Create computeThemeVaryingTokens utility
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/cli/themeVarying.ts` | **New** — `computeThemeVaryingTokens(config, semanticTokens, primitiveTokens)` returning `Set<string>` |
| `src/cli/__tests__/themeVarying.test.ts` | **New** — 7 unit tests covering override keys, light/dark diffs, non-color exclusion, modeInvariant skip |

## Implementation

Two-step algorithm:
1. Union of all override keys from `config.themes[].overrides`
2. For color semantic tokens: look up referenced primitive, check if `ColorTokenValue.light.base !== dark.base`

Currently step 2 produces no additional results (all color primitives have identical light/dark base values), but is architecturally correct for future mode-differentiated primitives.

## Validation

- 7/7 tests passing
- TypeScript compiles clean
- Requirements addressed: R7 AC1-2
