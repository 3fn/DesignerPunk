# Task 2.1a Completion: Author channel primitives for chromatic families

**Date**: 2026-06-10
**Task**: 2.1a Author channel primitives for chromatic families (mechanical conversion)
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/tokens/color/channels/hues.ts` | **New** — 7 chromatic hues + neutralHue |
| `src/tokens/color/channels/lightness/chromatic.ts` | **New** — 5 lightness steps per family (7 families) |
| `src/tokens/color/channels/chroma/chromatic.ts` | **New** — 5 chroma steps per family (7 families) |
| `src/tokens/color/channels/index.ts` | **New** — barrel export |
| `src/tokens/__tests__/chromatic-channels.test.ts` | **New** — 29 evergreen validation tests |

## Conversion Process

1. Extracted light.base RGBA values from existing ColorTokens.ts
2. Converted to OKLCH via `fromSrgbHex`
3. Derived per-family hue as median of 5-step hues
4. Rounded L/C values to clean decimals
5. Adjusted lightness scales to meet ≥0.08 min step constraint (yellow, green, cyan, teal required adjustment)
6. Fixed green chroma monotonicity (step 400 was higher than 300)
7. Validated all families against OklchValidator

## Adjustments from Mechanical Conversion

| Family | Issue | Fix |
|--------|-------|-----|
| Yellow | L steps 100→200→300 too close (0.98, 0.95, 0.93) | Redistributed: 0.98, 0.90, 0.80, 0.68, 0.56 |
| Green | L steps compressed + chroma monotonicity | Redistributed L + reduced chroma 400/500 |
| Cyan | L steps 100→200→300 too close | Redistributed: 0.96, 0.87, 0.76, 0.64, 0.52 |
| Teal | L steps 300→400→500 too close | Redistributed: 0.92, 0.72, 0.52, 0.38, 0.28 |

These adjustments change the absolute values from the original RGB palette. The regression test (Task 6.2) will document the ΔE₀₀ for these intentional changes.

## Validation

- 29/29 tests passing (7 families × 4 assertions + 1 count)
- All families pass: lightness monotonicity, min step ≥0.08, chroma monotonicity 300→500
- P3-only warnings present (expected, allowed per R8 AC3)
- TypeScript compiles clean
- Requirements addressed: R1 AC1-5
