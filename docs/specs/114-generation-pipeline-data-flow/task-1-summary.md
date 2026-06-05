# Task 1 Summary: Restructure generateTokenIndex Data Flow

**Date**: 2026-06-05
**Purpose**: Concise summary of Task 1 completion
**Organization**: spec-summary
**Scope**: 114-generation-pipeline-data-flow

---

## What Was Done

Restructured `generateTokenIndex` to receive all token data exclusively via a required `TokenIndexInput` parameter. Removed 5 barrel/registry imports and the internal ThemeRegistry instantiation. Created `computeThemeVaryingTokens` utility for theme-varying token detection. Updated standalone script and CLI to pass all required fields.

## Why It Matters

Product repos using `tokenSource` previously got incorrect token-index output because `generateTokenIndex` imported tokens from package barrels instead of using the locally-resolved source. This fix makes data flow explicit and unidirectional (CLI → generators), ensuring the index reflects the actual token source regardless of configuration.

## Key Changes

- `generateTokenIndex` requires `TokenIndexInput` with 4 fields (primitives, semantics, componentTokens, themeVaryingTokens)
- New `computeThemeVaryingTokens` utility in `src/cli/themeVarying.ts`
- Redundant `generateTokenIndex` call removed from `generateProductTokens`
- 13 new unit tests (7 themeVarying + 6 generateTokenIndex)

## Impact

- Fixes R1 (Explicit Token Input), R6 (Redundant Regeneration), R7 (Theme-Varying Accuracy), R8 (Script Compatibility)
- CLI's inline ThemeRegistry usage is temporary — Task 1.2's `computeThemeVaryingTokens` replaces it in Task 3
