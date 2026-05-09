# Task 2.2 Completion: Update All Call Sites

**Date**: 2026-05-09
**Task**: 2.2 Update all call sites
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/cli/designerpunk.ts` (updated) — `resolveTokens()` import, `runGenerate()` uses new signature
- `src/generators/__tests__/ProductRepoSimulation.test.ts` (updated) — 4 calls updated to new signature
- `scripts/generate-platform-tokens.ts` (updated) — Dynamic imports, uses new signature

---

## Implementation Details

### Approach

Updated all 4 call sites identified during the design phase. Each now resolves tokens via `resolveTokens(config)` and passes the result to `generateTokenFiles(tokens, config)`.

### Key Decisions

1. **CLI output updated in same pass**: Since `runGenerate()` was being rewritten anyway, the transparent source display (Task 2.3) was partially addressed here — the "Source:" line is now "Tokens:" with relative path and `(tokenSourceMode)` annotation.

2. **Tests use `resolveTokens(config)` inline**: Rather than extracting tokens to a variable, tests call `generateTokenFiles(resolveTokens(config), config)` directly. Concise and readable.

3. **Script uses dynamic imports**: `scripts/generate-platform-tokens.ts` already used dynamic `import()` for `generateTokenFiles`, so adding `resolveTokens` and `loadConfig` as dynamic imports maintains consistency.

### Integration Points

- All call sites now depend on `resolveTokens()` from Task 1.2
- `ProductRepoSimulation` tests serve as the regression gate — identical output verified

---

## Validation (Tier 2: Standard)

### Functional Validation
- ✅ TypeScript compilation: 0 errors
- ✅ ProductRepoSimulation tests: 5/5 passing
- ✅ Full test suite: 327 suites, 8295 tests passing
- ✅ No regressions from call site updates

### Requirements Compliance
- ✅ Req 3.3: All existing call sites updated to pass resolved token data
- ✅ Req 3.4: Identical output verified via ProductRepoSimulation tests
