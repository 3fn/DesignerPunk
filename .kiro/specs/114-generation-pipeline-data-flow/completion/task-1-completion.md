# Task 1 Completion: Restructure generateTokenIndex Data Flow

**Date**: 2026-06-05
**Task**: 1. Restructure generateTokenIndex Data Flow
**Type**: Parent
**Status**: Complete
**Validation**: Tier 3 - Comprehensive

---

## Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| `generateTokenIndex` accepts required `TokenIndexInput` with all four fields | ✅ |
| No static barrel imports of token data remain in `generateTokenIndex.ts` | ✅ |
| No `ThemeRegistry` instantiation inside `generateTokenIndex.ts` | ✅ |
| All existing tests pass with updated interface | ✅ |
| `scripts/generate-token-index.ts` compiles and produces correct output | ✅ (217 primitives, 193 semantics, 27 component tokens) |

---

## Artifacts

| File | Change |
|------|--------|
| `src/generators/generateTokenIndex.ts` | Removed 5 barrel/registry imports; expanded `TokenIndexInput` to require all 4 fields; function uses only input data |
| `src/cli/themeVarying.ts` | **New** — `computeThemeVaryingTokens(config, semantics, primitives)` utility |
| `src/cli/__tests__/themeVarying.test.ts` | **New** — 7 unit tests for computeThemeVaryingTokens |
| `src/generators/__tests__/generateTokenIndex.test.ts` | **New** — 6 unit tests verifying generateTokenIndex uses only provided input |
| `scripts/generate-token-index.ts` | Updated to pass all 4 required fields using package barrel imports |
| `src/cli/designerpunk.ts` | Updated generateTokenIndex call to pass componentTokens + themeVaryingTokens |
| `src/cli/generateProductTokens.ts` | Removed redundant `generateTokenIndex` call (Task 3.1 pulled forward) |

---

## Implementation Summary

### Core Change

`generateTokenIndex` no longer fetches its own token data. All data flows in via a required `TokenIndexInput` parameter:

```typescript
export interface TokenIndexInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
  componentTokens: RegisteredComponentToken[];
  themeVaryingTokens: Set<string>;
}
```

This eliminates the barrel-import fallback pattern that caused product repos with `tokenSource` to generate indexes from package defaults instead of local source.

### computeThemeVaryingTokens

New utility extracts theme-varying token computation from the generator:
1. Collects explicit override keys from registered themes in config
2. Identifies color semantic tokens whose referenced primitive has different `light.base` vs `dark.base` values

Currently produces 10 theme-varying tokens (5 dark overrides + 5 combined wcag overrides). Step 2 catches zero additional tokens today (all color primitives have identical light/dark base values) but is architecturally correct for future primitives with mode-differentiated values.

### Task 3.1 Pull-Forward

The `generateProductTokens.ts` call to `generateTokenIndex(tokenIndexDir)` was removed in this task rather than waiting for Task 3.1. Reason: the interface change made the call uncompilable (required parameter missing), and the spec explicitly calls for its removal (R6 AC1). This is a clean deletion with no behavioral regression — the CLI already generates the index before calling product gen.

---

## Test Results

- `src/cli/__tests__/themeVarying.test.ts`: 7/7 passing
- `src/generators/__tests__/generateTokenIndex.test.ts`: 6/6 passing
- TypeScript compilation: clean (zero errors)
- `scripts/generate-token-index.ts`: produces correct YAML output

---

## Requirements Addressed

| Requirement | AC | Status |
|-------------|-----|--------|
| R1 (Explicit Token Input) | AC1: Uses only input parameter data | ✅ |
| R1 | AC2: No barrel imports in generateTokenIndex | ✅ |
| R1 | AC3: Missing input produces type error | ✅ |
| R6 (Redundant Regeneration) | AC1: generateProductTokens no longer calls generateTokenIndex | ✅ |
| R7 (Theme-Varying Accuracy) | AC1: Uses themeVaryingTokens from input | ✅ |
| R7 | AC3: No ThemeRegistry instantiation in generateTokenIndex | ✅ |
| R8 (Package-Internal Script) | AC1-3: Script passes explicit data, compiles clean | ✅ |
