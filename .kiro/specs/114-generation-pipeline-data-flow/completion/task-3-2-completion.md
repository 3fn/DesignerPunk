# Task 3.2 Completion: Restructure runGenerate with independent error boundaries

**Date**: 2026-06-05
**Task**: 3.2 Restructure runGenerate with independent error boundaries
**Type**: Architecture
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/cli/designerpunk.ts` | Restructured `runGenerate` — system pipeline (generateTokenFiles + generateTokenIndex) and product pipeline (generateProductTokens) in separate try/catch blocks. Added structured ✅/❌ output per stage. Added `--product-only` recommendation on system failure. Exit 1 if either fails. Replaced inline ThemeRegistry with `computeThemeVaryingTokens`. Exported `runGenerate` for testing. Guarded `main()` call with `require.main === module`. |

## Validation

- TypeScript compiles clean
- 548 tests passing across 33 suites
- Requirements addressed: R3 AC1-5, R6 AC2, R9 AC2
