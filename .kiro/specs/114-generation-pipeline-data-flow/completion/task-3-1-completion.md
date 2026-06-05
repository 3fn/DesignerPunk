# Task 3.1 Completion: Remove redundant generateTokenIndex from generateProductTokens

**Date**: 2026-06-05
**Task**: 3.1 Remove redundant generateTokenIndex from generateProductTokens
**Type**: Implementation
**Status**: Complete (pull-forward from Task 1.1)

---

## Changes

Completed during Task 1.1 — the interface change to `generateTokenIndex` (required `TokenIndexInput` parameter) made the call in `generateProductTokens` uncompilable. Removed the import and call at that time.

| File | Change |
|------|--------|
| `src/cli/generateProductTokens.ts` | Removed `import { generateTokenIndex }` and the `generateTokenIndex(tokenIndexDir)` call |

## Validation

- TypeScript compiles clean
- Product token generation still works (reads existing token-index from disk)
- Requirements addressed: R6 AC1-2
