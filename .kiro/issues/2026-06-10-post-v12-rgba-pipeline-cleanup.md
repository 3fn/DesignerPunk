# Post-v12 Cleanup: Remove Legacy RGBA Color Pipeline

**Date**: 2026-06-10
**Blocked by**: v12 release (OKLCH pipeline must ship and stabilize first)
**Agent**: Ada
**Severity**: Low — tech debt, no user impact
**Status**: Open (deferred)

---

## Context

Spec 112 added the OKLCH color pipeline alongside the existing RGBA pipeline. The old RGBA path is frozen (no new development) but remains in the codebase. Once v12 ships and the OKLCH pipeline is validated in production, this cleanup removes the dead code.

---

## Scope

### Files to Delete

- `src/tokens/ColorTokens.ts` — replace with barrel re-exporting from `src/tokens/color/`
- Remove RGBA `ColorTokenValue` interface from `src/types/PrimitiveToken.ts` (or deprecate)
- Remove `shadowColorTokens` RGBA definitions (migrate to OKLCH shadow colors)

### Methods to Remove from Generators

| Generator | Methods |
|-----------|---------|
| `WebFormatGenerator` | `parseRgbaString()`, `formatColorValue()`, RGBA branch in `formatCSSValue()` |
| `iOSFormatGenerator` | `rgbaStringToUIColor()`, `formatUIColor()`, RGBA branch in `formatSwiftValue()` |
| `AndroidFormatGenerator` | `rgbaStringToColorArgb()`, `parseRgbaString()`, RGBA branch in `formatKotlinValue()` |

### Pipeline Simplification

- `resolveTokens()` — remove color token loading from old `ColorTokens.ts` barrel
- `SemanticValueResolver.resolveSemanticTokenValue()` — remove RGBA resolution path (replace with OKLCH passthrough)
- `generateTokenFiles.ts` — remove `resolveColorPrimitive()` RGBA lookup, remove `parseRgba()` utility
- Mode resolution — simplify once OKLCH theme overrides replace the rgba-based ContextOverrideSet

### Test Updates

- ~50-100 tests reference RGBA values in assertions (snapshot-style)
- Color generation integration tests assert `rgba(` format
- SemanticValueResolver tests assert RGBA resolution
- Blend utility tests (old `BlendCalculator`) can be removed once `OklchBlendCalculator` is sole path

### Documentation Updates (Thurgood)

See issue file `2026-06-10-oklch-pipeline-integration-incomplete.md` for the list of 10+ steering docs with remaining RGBA references.

---

## Effort Estimate

- 1-2 parent tasks (Spec TBD)
- ~200 test assertion updates
- ~15 source file modifications
- Low risk if done after OKLCH pipeline is stable (no behavioral change, just dead code removal)

---

## Success Criteria

- `grep -r "rgba(" src/tokens/ src/providers/ src/generators/ src/resolvers/` returns zero matches (excluding test fixtures)
- `ColorTokenValue` interface removed from `PrimitiveToken.ts`
- Old `BlendCalculator` (RGB-space) removed; only `OklchBlendCalculator` remains
- All 8500+ tests still pass
- `npx designerpunk generate` output unchanged (same OKLCH values)
