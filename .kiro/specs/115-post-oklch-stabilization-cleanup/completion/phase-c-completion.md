# Phase C Completion: Update Steering Docs RGBA → OKLCH

**Date**: 2026-06-10
**Task**: Phase C — Update remaining steering docs with RGBA references to OKLCH
**Type**: Documentation
**Status**: Complete

---

## Summary

Updated 10 steering docs + 1 component README to replace RGBA format references with OKLCH equivalents, reflecting the pipeline's current output format.

## Files Updated

### 1. `.kiro/steering/Rosetta-System-Architecture.md` (11 changes)
- **Conversion Rules section**: Replaced RGBA format descriptions with OKLCH platform output formats
- **Baked-In Alpha section**: Updated example from `rgba(184, 182, 200, 0.48)` to `oklch(0.78 0.02 280 / 0.48)` with platform variants
- **Generation Subsystem diagram**: Updated format labels (RGBA → OKLCH, UIColor → Color.oklch, Color.argb → Oklch().toComposeColor())
- **Color Format Conversion utilities**: Updated function names (parseRgbaString → formatOklchValue, etc.)
- **Mode Resolution**: Updated "resolves to rgba values" → "resolves to OKLCH values"
- **Subsystem Entry Points**: Updated Color Tokens description from "RGBA primitive definitions" to "OKLCH channel-primitive definitions"
- **MCP Query Examples**: Updated heading reference from "RGBA Color Pipeline" to "OKLCH Color Pipeline"

### 2. `.kiro/steering/Token-Family-Glow.md` (1 change)
- **Web CSS conceptual example**: Replaced `rgba(139, 92, 246, 0.8)` with `oklch(0.55 0.27 295 / 0.8)` in multi-layer glow box-shadow

### 3. `.kiro/steering/Token-Family-Opacity.md` (2 changes)
- **CSS usage examples**: Replaced `rgba(0, 0, 0, var(--opacity-heavy))` with `oklch(0 0 0 / var(--opacity-heavy))`
- **Hover/interaction examples**: Replaced `rgba(255, 255, 255, ...)` / `rgba(0, 0, 0, ...)` with `oklch()` equivalents

### 4. `.kiro/steering/Token-Family-Shadow.md` (4 changes)
- **CSS generated custom properties**: Replaced all rgba values with oklch equivalents
- **Custom shadow CSS example**: Updated rgba → oklch
- **Browser support note**: Updated from "rgba colors" to "OKLCH colors (Chrome 111+, Safari 15.4+, Firefox 113+)"
- **iOS Swift code**: Replaced `UIColor(red:green:blue:alpha:)` with `Color.oklch(L, C, H)` via ChromaKit

### 5. `.kiro/steering/Token-Quick-Reference.md` (1 change)
- **Level 1 mode example**: Replaced `rgba(255, 255, 255, 1)` / `rgba(30, 30, 30, 1)` with `oklch(1.0 0 0)` / `oklch(0.21 0 0)`

### 6. `.kiro/steering/rosetta-system-principles.md` (1 change)
- **Shadow composition example comment**: Replaced `// rgba(0,0,0,1)` with `// oklch(0 0 0)`

### 7. `.kiro/steering/DTCG-Integration-Guide.md` (3 changes)
- **Color primitive example**: Changed `rgba(176, 38, 255, 1)` to `#b026ff` (sRGB hex) with explanatory note about OKLCH→sRGB conversion for DTCG compatibility
- **Shadow composite examples** (×2): Changed `rgba(0, 0, 0, 0.3)` to `#0000004d` (sRGB hex with alpha)

### 8. `.kiro/steering/MCP-Integration-Guide.md` (2 changes)
- **Shadow query example**: Updated rgba output to sRGB hex (`#0000004d`)
- **Resolved alias example**: Updated rgba output to sRGB hex with OKLCH source note

### 9. `.kiro/steering/DesignerPunk-Integration-Guide.md` (0 changes needed)
- Only RGBA reference is in the "OKLCH Color Migration (v12+)" section which correctly describes the upgrade path ("from RGBA to OKLCH"). Preserved as historical/instructional context.

### 10. `src/components/core/Progress-Pagination-Base/README.md` (1 change)
- **Container Tokens table**: Replaced `rgba(0,0,0,0.80)` with `oklch(0 0 0 / 0.80)`

## Design Decisions

### DTCG Output Format
DTCG still outputs sRGB hex (not OKLCH) because DTCG-consuming tools (Figma, Style Dictionary, Tokens Studio) expect sRGB color format. Added explicit note documenting that OKLCH source values are converted to sRGB hex for DTCG interchange. This is technically accurate — the DTCG generator performs OKLCH→sRGB conversion.

### Preserved Historical Context
The DesignerPunk-Integration-Guide's migration section ("from RGBA to OKLCH") was deliberately left unchanged — it describes the upgrade path for consumers and correctly references RGBA as the old format.

### OKLCH Value Approximations
For documentation examples (shadow colors, glow colors), I used representative OKLCH values that approximate the visual intent. These are documentation examples, not pipeline output — actual generated values come from the channel-primitive composition model.

## Validation

- ✅ `grep -r "rgba(" .kiro/steering/` — 0 matches in current-format contexts (only migration instruction preserved)
- ✅ `grep -r "UIColor(red:" .kiro/steering/` — 0 matches
- ✅ `grep -r "Color.argb" .kiro/steering/` — 0 matches
- ✅ `grep -r "rgba(" src/components/core/Progress-Pagination-Base/` — 0 matches
- ✅ All DTCG examples now show sRGB hex with OKLCH source note
- ✅ All platform output examples reflect actual generator format (CSS oklch(), Swift ChromaKit, Android colormath)
