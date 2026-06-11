# Task 5.2 Completion: Update behavioral contracts

**Date**: 2026-06-10
**Task**: 5.2 Update behavioral contracts
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/components/core/Button-CTA/contracts.yaml` | hover, pressed, disabled → OKLCH thresholds |
| `src/components/core/Button-Icon/contracts.yaml` | hover, pressed → OKLCH thresholds |
| `src/components/core/Button-VerticalList-Item/contracts.yaml` | hover, pressed → OKLCH thresholds |
| `src/components/core/Chip-Base/contracts.yaml` | state_styling, hover, pressed → OKLCH thresholds |
| `src/components/core/Input-Checkbox-Base/contracts.yaml` | hover, pressed → OKLCH thresholds |
| `src/components/core/Input-Radio-Base/contracts.yaml` | hover, pressed → OKLCH thresholds |
| `src/components/core/Nav-SegmentedChoice-Base/contracts.yaml` | hover → OKLCH thresholds |
| `src/components/core/Nav-TabBar-Base/contracts.yaml` | pressable, noop_active, hover exclusion |
| `src/components/core/Container-Card-Base/contracts.yaml` | hover, pressed → OKLCH thresholds |
| `src/components/core/Container-Base/contracts.yaml` | hover → OKLCH thresholds |
| `src/components/core/Icon-Base/contracts.yaml` | optical balance → OKLCH thresholds |

## Contract Language Migration

**Before** (RGB-era):
```yaml
description: Visual feedback on hover (desktop only)
behavior: Uses blend.hoverDarker token (8% darker) for primary variant background color change.
validation: Hover state uses blend.hoverDarker token
```

**After** (OKLCH intent-based):
```yaml
description: Perceptibly darker on hover (desktop only)
behavior: Background darkens by a perceptible but subtle amount (OKLCH ΔL 0.02–0.05, surface-aware direction). Chroma is preserved.
validation: Background color darkens on mouse enter (ΔL 0.02–0.05)
```

## Pattern Applied

| State | Intent Description | Numeric Threshold |
|-------|-------------------|-------------------|
| Hover | "perceptibly darker" | ΔL 0.02–0.05 |
| Pressed | "distinctly darker" | ΔL 0.05–0.10 |
| Focused | "chroma boost" | ΔC ≥0.02 |
| Disabled | "visually muted via chroma reduction" | ΔC ≥0.03 |
| Icon balance | "perceptibly lighter" | ΔL 0.02–0.04 |

## Validation

- TypeScript compilation: clean
- Component tests: 2377/2377 passing (80 suites)
- Zero remaining blend percentage references in contracts
- Requirements addressed: R6 AC4-5
