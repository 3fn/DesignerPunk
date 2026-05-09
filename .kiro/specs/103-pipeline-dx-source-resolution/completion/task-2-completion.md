# Task 2 Completion: Generator DI Refactor & CLI Update

**Date**: 2026-05-09
**Task**: 2. Generator DI Refactor & CLI Update
**Type**: Parent
**Status**: Complete

---

## Summary

Refactored `generateTokenFiles()` from static imports to dependency injection. The generator is now source-agnostic — it receives token arrays and doesn't know where they came from. All call sites updated, CLI output shows transparent source display with `(package)` / `(local)` annotation.

---

## Subtasks Completed

| Subtask | Description | Status |
|---------|-------------|--------|
| 2.1 | Refactor `generateTokenFiles()` signature | ✅ Complete |
| 2.2 | Update all call sites | ✅ Complete |
| 2.3 | Update CLI output for transparent source display | ✅ Complete |

---

## Artifacts Created

- `src/generators/generateTokenFiles.ts` (refactored) — New `(tokens: TokenInput, config: ResolvedConfig)` signature
- `src/cli/designerpunk.ts` (updated) — `resolveTokens()` + new signature + transparent output
- `src/generators/__tests__/ProductRepoSimulation.test.ts` (updated) — 4 calls to new signature
- `scripts/generate-platform-tokens.ts` (updated) — Dynamic imports, new signature

---

## Key Decisions

1. **Legacy signature removed entirely**: No backward-compatible overload. Clean break — 4 call sites updated.
2. **`if (require.main === module)` block removed**: CLI supersedes direct script execution.
3. **Fixed latent bug**: DTCG/Figma section had 3 stale `outputDir` references (the removed parameter) — now correctly uses `effectiveOutputDir`.
4. **Theme override imports remain static**: Explicitly commented — these are base system themes, independent of `tokenSource`.

---

## Validation

- ✅ TypeScript compilation: 0 errors
- ✅ ProductRepoSimulation tests: 5/5 passing (regression gate)
- ✅ Full test suite: 327 suites, 8295 tests passing
- ✅ CLI output verified: relative paths, mode annotation

### Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| `generateTokenFiles()` accepts `TokenInput` and `ResolvedConfig` | ✅ |
| Legacy signature removed (no overload) | ✅ |
| All 4 call sites updated | ✅ |
| Pipeline output shows accurate token source with annotation | ✅ |
| `ProductRepoSimulation` tests pass with identical output | ✅ |

---

## Requirements Satisfied

- Req 3.1–3.5: DI refactor, registry building, call site updates, identical output, component tokens untouched
- Req 4.1–4.5: Transparent source display with relative paths and mode annotation
