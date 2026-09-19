# Issue: OKLCH Pipeline Integration Incomplete — Generators Still Output RGBA

**Date**: 2026-06-10
**Spec**: 112 (OKLCH Color Migration)
**Severity**: High — blocks v12 release (output doesn't match spec requirements)
**Discovered During**: Task 7 pipeline validation run
**Status**: Resolved (2026-06-10)
**Resolution**: Modified `TokenFileGenerator.generatePlatformTokens()` to intercept color-category tokens and emit OKLCH via composed color data. See `completion/pipeline-integration-completion.md`.

---

## Summary

`npx designerpunk generate` produces RGBA output (`rgba(255, 42, 109, 1)`) instead of OKLCH output (`oklch(0.65 0.242 10)`). The OKLCH channel primitives, composed colors, converter, validator, and generator format methods all exist and pass tests — but the pipeline orchestration layer (`TokenFileGenerator.generatePlatformTokens`) still reads from the old `src/tokens/ColorTokens.ts` PrimitiveToken objects (which store RGBA in `token.platforms.web.value`).

---

## Root Cause

Task 2.3 was marked "Partial" — composed color primitives were created (`src/tokens/color/primitives/`) with `resolved: Oklch` values, but:
1. The semantic layer (`src/tokens/semantic/ColorTokens.ts`) was NOT updated to reference new composed colors
2. Theme override files (`src/tokens/themes/`) were NOT updated to OKLCH values
3. **The pipeline entry path was NOT rewired** — `resolveTokens()` still loads `ColorTokens.ts` (RGBA PrimitiveTokens), not the new composed colors
4. `TokenFileGenerator.formatToken()` reads `token.platforms.web.value` (RGBA string), not the new `ComposedColor.resolved` OKLCH data

The OKLCH generator methods (`formatOklchColor` in `WebFormatGenerator`, `iOSFormatGenerator`, `AndroidFormatGenerator`) exist and are tested but are never called by `TokenFileGenerator` — it calls `formatToken()` which uses the old path.

---

## What Exists (Working)

| Component | Status | Location |
|-----------|--------|----------|
| OklchConverter | ✅ Passing tests | `src/color/OklchConverter.ts` |
| OklchValidator | ✅ Passing tests | `src/color/OklchValidator.ts` |
| Channel primitives (hues, L, C) | ✅ Validated | `src/tokens/color/channels/` |
| Composed colors (resolved Oklch) | ✅ Validated | `src/tokens/color/primitives/` |
| Web `formatOklchColor` method | ✅ Tests pass | `src/providers/WebFormatGenerator.ts` |
| iOS `formatOklchColor` method | ✅ Tests pass | `src/providers/iOSFormatGenerator.ts` |
| Android `formatOklchColor` method | ✅ Tests pass | `src/providers/AndroidFormatGenerator.ts` |
| DTCG/Figma OKLCH→hex export | ✅ Tests pass | `src/generators/oklch/OklchExportUtils.ts` |
| Token-index OKLCH metadata | ✅ Tests pass | `src/generators/oklch/OklchTokenIndexMetadata.ts` |
| OklchBlendCalculator | ✅ Tests pass | `src/blend/OklchBlendCalculator.ts` |

## What's Missing (The Wiring)

| Gap | What's Needed |
|-----|---------------|
| `resolveTokens()` loads old ColorTokens.ts | Must load composed OKLCH colors OR update ColorTokens.ts platform values to OKLCH strings |
| `TokenFileGenerator.formatToken()` reads RGBA from platforms.web.value | Must call `formatOklchColor(resolved.l, resolved.c, resolved.h)` for color tokens |
| Semantic layer references old primitives | `ColorSemanticTokens.ts` must reference composed OKLCH colors |
| Theme overrides use RGBA | Override files must use OKLCH values |
| Web output missing channel custom properties | `generatePlatformTokens` must emit `--pink-hue`, `--pink-l300`, etc. alongside composed colors |

---

## Recommended Fix

**Option A (Minimal — update PrimitiveToken values)**: Change `ColorTokens.ts` so `platforms.web.value` contains `oklch(L C H)` strings instead of `rgba()`. The pipeline then formats them as-is. Same for iOS/Android platform values. Downside: doesn't emit channel custom properties on web.

**Option B (Proper — rewire pipeline)**: 
1. Update `resolveTokens()` (or `generateTokenFiles.ts`) to load composed colors from `src/tokens/color/primitives/`
2. In `generatePlatformTokens`, detect color category tokens and call `formatOklchColor()` instead of `formatToken()`
3. Add a channel custom properties section to web output (iterate channel primitives, emit `--family-l-step`, `--family-c-step`, `--family-hue`)
4. Update semantic color resolution to output OKLCH values through the override/mode resolution chain

Option B is what the spec requires (R3: channel properties + composed colors). Option A is a stopgap.

---

## Impact

- **v12 cannot ship** with RGBA output — the entire spec's value proposition (runtime OKLCH composition on web) requires oklch() format in CSS output
- All existing tests pass (they test the old path OR test OKLCH methods in isolation)
- The consumer contract test (Spec 106) would NOT catch this because it validates "output exists and is non-empty" — not "output uses oklch format"
- Suggests adding a format assertion to the consumer contract test: verify color tokens in web output contain `oklch(`

---

## Effort Estimate

Option B (proper fix): ~2-3 subtasks for Ada
1. Rewire primitive color loading to use composed OKLCH colors in the generation pipeline
2. Add web channel custom property emission
3. Update semantic/theme resolution to carry OKLCH values through

**Post-fix documentation pass** (Thurgood): Once pipeline outputs OKLCH, update remaining RGBA references in:
- `.kiro/steering/Rosetta-System-Architecture.md` (16 remaining RGBA refs in Conversion Rules, semantic examples)
- `.kiro/steering/Token-Family-Glow.md` (glow value examples)
- `.kiro/steering/Token-Family-Opacity.md` (opacity composition examples)
- `.kiro/steering/Token-Family-Shadow.md` (shadow color values)
- `.kiro/steering/Token-Quick-Reference.md` (quick reference values)
- `.kiro/steering/rosetta-system-principles.md` (format references)
- `.kiro/steering/DTCG-Integration-Guide.md` (export format examples)
- `.kiro/steering/MCP-Integration-Guide.md` (MCP response examples)
- `.kiro/steering/DesignerPunk-Integration-Guide.md` (remaining refs)
- `src/components/core/Progress-Pagination-Base/README.md` (component doc)

---

## Reproduction

```bash
npx designerpunk generate
grep "pink-300\|cyan-300" dist/DesignTokens.web.css
# Shows: --pink-300: rgba(255, 42, 109, 1);
# Expected: --pink-300: oklch(0.65 0.242 10);
```
