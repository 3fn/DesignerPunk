# Task 1.1 Completion: Remove barrel imports and make TokenIndexInput required

**Date**: 2026-06-05
**Task**: 1.1 Remove barrel imports and make TokenIndexInput required
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/generators/generateTokenIndex.ts` | Removed 5 imports (`getAllPrimitiveTokens`, `getAllSemanticTokens`, `ComponentTokenRegistry`, `ThemeRegistry`, theme overrides). Expanded `TokenIndexInput` to 4 required fields. Removed internal ThemeRegistry instantiation and barrel fallbacks. |
| `src/cli/designerpunk.ts` | Added imports for `ComponentTokenRegistry`, `ThemeRegistry`, theme overrides. Updated `generateTokenIndex` call to pass all 4 fields. |
| `src/cli/generateProductTokens.ts` | Removed redundant `generateTokenIndex` call and its import (Task 3.1 pull-forward — required for compilation). |

## Validation

- TypeScript compiles clean (`npx tsc --noEmit` → 0 errors)
- Existing CLI tests pass (5/6 suites, 1 pre-existing failure in init.test.ts)
- Requirements addressed: R1 AC1-3, R6 AC1, R7 AC1+3
