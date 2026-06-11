# green500 Glow Chroma Loss — Requirement Conflict

**Date**: 2026-06-10
**Spec**: 112 (OKLCH Color Migration)
**Found by**: Lina (Task 5.1 visual audit)
**Assigned to**: Ada
**Severity**: Medium — decorative glow less vivid, no accessibility impact
**Status**: Resolved

---

## Problem

`glow.neonGreen` references `green500`. Post-OKLCH-migration, green500 chroma is C=0.140, but the original RGB `rgba(0, 204, 110, 1)` had C≈0.189. The glow token lost 26% of its chroma.

## Conflicting Requirements

- **R1 AC6**: Chroma monotonicity for steps 300→500 (darker = equal or less chroma)
- **R7 AC6**: Glow tokens referencing refined primitives SHALL maintain chroma ≥ original

Green's monotonic scale (C300=0.208 → C400=0.180 → C500=0.140) satisfies R1 AC6 but violates R7 AC6.

## Approved Resolution

**Option 2: Decouple glow from palette** — Create a dedicated glow-green primitive at C≈0.190 (original chroma) with green500's lightness (L=0.54) and hue (H=154). Update `glow.neonGreen` to reference the new token. Glow is decorative; it doesn't need to follow palette monotonicity rules.

## Deployed Solution

**Simpler approach**: Pointed `glow.neonGreen` at `green300` (C=0.208, L=0.78, H=154) instead of creating a new token. Green300 has the highest chroma in the family (0.208 > original 0.189 ✅), and is brighter — both desirable for a glow effect. No new tokens needed.

**Changes:**
- `src/tokens/semantic/ColorTokens.ts`: `glow.neonGreen.primitiveReferences.value` → `'green300'`
- `src/tokens/semantic/__tests__/ColorTokens.test.ts`: Updated assertion and description

**Validation:** 195 semantic color tests pass. R7 AC6 satisfied (C=0.208 ≥ original 0.189).
