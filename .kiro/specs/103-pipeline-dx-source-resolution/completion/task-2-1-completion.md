# Task 2.1 Completion: Refactor `generateTokenFiles()` Signature

**Date**: 2026-05-09
**Task**: 2.1 Refactor `generateTokenFiles()` signature
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/generators/generateTokenFiles.ts` (refactored) — New DI signature, static token imports removed

---

## Implementation Details

### Approach

Changed the function signature from `generateTokenFiles(outputDir: string, config?: ResolvedConfig)` to `generateTokenFiles(tokens: TokenInput, config: ResolvedConfig)`. The generator is now source-agnostic — it receives token data and doesn't know or care where it came from.

### Key Decisions

1. **Removed legacy `outputDir` parameter**: Uses `config.outputDir` exclusively. No backward-compatible overload maintained.
2. **Fixed stale `outputDir` references**: The DTCG/Figma generation section had 3 references to the removed `outputDir` parameter — updated to `effectiveOutputDir`.
3. **Theme override imports remain static**: Added explicit comment explaining these are the base system's built-in themes, independent of `tokenSource`.

### Integration Points

- Imports `TokenInput` from `../cli/resolveTokens` (Task 1.2)
- Call sites (Task 2.2) must now resolve tokens and pass `TokenInput`
- Internal logic (registries, validation, theme resolution, generation) unchanged

---

## Validation (Tier 2: Standard)

### Functional Validation
- ✅ `generateTokenFiles.ts` compiles cleanly (no type errors in the file itself)
- ✅ Only remaining errors are the 5 call sites (expected — Task 2.2 scope)

### Requirements Compliance
- ✅ Req 3.1: Accepts primitive and semantic token arrays as parameters
- ✅ Req 3.2: Builds registries internally from injected data
- ✅ Req 3.4: Produces identical output for same token input (logic unchanged)
- ✅ Req 3.5: Component token generation remains registry-based (untouched)
