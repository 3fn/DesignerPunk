# Task 2.2 Completion: Author neutral partition (white, gray, black)

**Date**: 2026-06-10
**Task**: 2.2 Author neutral partition
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/tokens/color/channels/lightness/neutral.ts` | **New** — white/gray/black lightness scales |
| `src/tokens/color/channels/chroma/neutral.ts` | **New** — parabolic chroma curves |
| `src/tokens/color/channels/index.ts` | Added neutral exports |
| `src/tokens/__tests__/neutral-partition.test.ts` | **New** — 18 evergreen validation tests |

## Neutral Partition

| Family | L Range | Steps | Role |
|--------|---------|-------|------|
| White | 1.00 → 0.80 | 0.05/step | Bright surfaces, backgrounds, cards |
| Gray | 0.72 → 0.32 | 0.10/step | Structural elements, borders, body text |
| Black | 0.28 → 0.00 | 0.07/step | Dark mode surfaces, deep containers |

**Buffer gaps**: white500(0.80) → gray100(0.72) = 0.08; gray500(0.32) → black100(0.28) = 0.04

**Chroma**: Parabolic curve — white increases from 0 to 0.015, gray peaks at 0.020, black decreases from 0.013 to 0. All ≤ 0.035 ceiling.

**Shared hue**: `neutralHue = 260` (default; configurable per product)

## Validation

- 18/18 tests passing
- Buffer gaps ✅, chroma ceiling ✅, gamut ✅, monotonicity ✅
- TypeScript compiles clean
- Requirements addressed: R2 AC1-7
