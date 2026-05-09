# @3fn/core Feedback — Ada (Follow-Up: tokenSource Partial Source)

**Date**: 2026-05-09
**Context**: Attempted to use `tokenSource` config option (added in 11.2.0) with product repo's local `src/tokens/`
**Agent**: Ada — token development, pipeline integration
**Relates to**: `ada-2026-05-09.md` feedback item #2
**Tested on**: 11.2.0, 11.2.1

---

## Status After 11.2.1

**What 11.2.1 fixed:**
- ✅ Better error message — now distinguishes "file not found" from "unresolved imports" and suggests using `@3fn/core/types`
- ✅ `./types` subpath export added — `@3fn/core/types` now exports `PrimitiveToken`, `TokenCategory`, `PlatformValues`, `SemanticToken`, `SemanticCategory`, etc.
- ✅ `npx designerpunk validate` command added (feedback item #4 from original doc)

**What's still broken:**
- ❌ `tokenSource` still fails with product repos that have partial source trees

---

## The Deeper Problem

The issue isn't just `../types/PrimitiveToken`. The local `src/tokens/` files have dependencies across multiple parts of the core infrastructure:

| Import Pattern | Files Affected | Missing Locally |
|----------------|---------------|-----------------|
| `../types/PrimitiveToken` | 23 primitive token files | `src/types/` |
| `../../types/SemanticToken` | 7 semantic token files | `src/types/` |
| `../constants/StrategicFlexibilityTokens` | 1 (SpacingTokens) | `src/constants/` |
| `../../build/tokens/UnitConverter` | 1 (TypographyTokens) | `src/build/` |
| `../../build/tokens` (defineComponentTokens) | 1 (component tokens) | `src/build/` |
| `../../components/core/*/tokens` | 2 (re-exports in semantic ColorTokens) | circular dependency |

Simply adding `@3fn/core/types` as a subpath export solves the type imports, but the `constants`, `build`, and cross-directory component imports remain unresolved.

---

## Revised Suggestions

### Option A: Subpath exports for ALL dependencies (incremental)

Add subpath exports for each dependency category:
- `@3fn/core/types` ✅ (done in 11.2.1)
- `@3fn/core/constants` — exports `STRATEGIC_FLEXIBILITY_TOKENS`
- `@3fn/core/build` — exports `defineComponentTokens`, `UnitConverter`

Then update the product template's token files to use package imports. This is incremental but requires updating every import in every product repo.

### Option B: Pipeline injects module resolution (transparent fix)

When `tokenSource` is set, the pipeline configures the `tsx` loader to resolve `../types/*`, `../constants/*`, and `../../build/*` from the package automatically. Product token files keep their relative imports unchanged — the pipeline bridges the gap at load time.

This is the most seamless option for existing product repos. No file changes needed.

### Option C: `npx designerpunk init` scaffolds complete source (nuclear option)

Ship the full `src/` tree (types, constants, build, tokens) to product repos. This makes `tokenSource` work trivially but increases the product repo footprint and creates a maintenance burden (keeping local infrastructure in sync with package updates).

---

## My Revised Recommendation

**Option B** is the best balance. Product repos shouldn't need to know about the core's internal module structure. The pipeline already registers `tsx` — it could additionally register a custom resolver that maps relative imports from the `tokenSource` directory to the package's corresponding paths. The product developer's experience would be:

1. Set `tokenSource: './src/tokens'` in config
2. Edit token files normally (relative imports just work)
3. Pipeline handles resolution transparently

---

## Summary

| # | Priority | Type | Suggestion |
|---|----------|------|-----------|
| 1 | High | Bug/DX | `tokenSource` unusable — dependencies beyond types (constants, build, components) |
| 2 | ✅ Fixed | DX | Error message improved in 11.2.1 |
| 3 | Medium | Architecture | Recommend Option B (transparent module resolution in pipeline loader) |
