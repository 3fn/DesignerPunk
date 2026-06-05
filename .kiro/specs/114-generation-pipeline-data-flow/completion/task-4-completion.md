# Task 4 Completion: Implement Staleness Detection and --product-only

**Date**: 2026-06-05
**Task**: 4. Implement Staleness Detection and --product-only
**Type**: Parent
**Status**: Complete
**Validation**: Tier 3 - Comprehensive

---

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| Adding a new YAML file and running `generate` produces updated output | ✅ |
| Up-to-date products are skipped with logged message | ✅ |
| `--force` always regenerates | ✅ |
| `--product-only` skips all system processing | ✅ |
| Staleness detection never silently skips | ✅ |

---

## Artifacts

| File | Change |
|------|--------|
| `src/cli/staleness.ts` | **New** — `isProductTokenStale`, `getProductTokenOutputPaths` |
| `src/cli/__tests__/staleness.test.ts` | **New** — 8 unit tests |
| `src/cli/__tests__/product-only.test.ts` | **New** — 8 integration tests |
| `src/cli/designerpunk.ts` | `--product-only` flag, `runProductOnly`, staleness in main pipeline, `--force` flag, updated help |
| `.kiro/steering/DesignerPunk-Integration-Guide.md` | Updated § "Generate Tokens" with flag table |

---

## Implementation Summary

### Staleness Detection

`isProductTokenStale(config, force)` compares mtime of YAML source files against the oldest product token output file. Returns true (stale) when:
- `--force` is set
- Any output file is missing
- Any source YAML is newer than the oldest output

### --product-only Mode

`runProductOnly(force)` skips the entire system pipeline — no `resolveTokens`, `loadComponentTokens`, `generateTokenFiles`, or `generateTokenIndex`. It reads the existing `token-index/` from disk and applies staleness detection before generating product tokens.

Errors when:
- `productTokens` not configured
- `token-index/` directory doesn't exist (directs user to run full `generate` first)

### Staleness in Full Pipeline

The product pipeline section of `runGenerate` now checks staleness before generating:
- Stale or forced → regenerate
- Up-to-date → log skip with timestamp

---

## Test Results

- `src/cli/__tests__/staleness.test.ts`: 8/8 passing
- `src/cli/__tests__/product-only.test.ts`: 8/8 passing
- All 23 related tests passing
- TypeScript compilation: clean

---

## Requirements Addressed

| Requirement | AC | Status |
|-------------|-----|--------|
| R4 (Staleness Detection) | AC1: Stale when source newer than output | ✅ |
| R4 | AC2: Skipped with log when up-to-date | ✅ |
| R4 | AC3: Always generate when output missing | ✅ |
| R4 | AC4: --force always regenerates | ✅ |
| R4 | AC5: Skip decision always logged | ✅ |
| R5 (Product-Only Mode) | AC1: Skips system pipeline | ✅ |
| R5 | AC2: Uses existing token-index | ✅ |
| R5 | AC3: Exits 0 on success | ✅ |
| R5 | AC4: Emits warning for missing refs (Spec 109 behavior) | ✅ |
| R5 | AC5: Staleness applies in --product-only | ✅ |
