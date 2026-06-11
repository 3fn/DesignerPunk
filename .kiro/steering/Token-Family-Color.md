---
inclusion: manual
name: Token-Family-Color
description: Color token family — OKLCH channel-primitive architecture, palette structure, semantic color tokens, neutral partition, blend model, theme support, and WCAG compliance. Load when working with color tokens, color selection, theme variants, or color-related accessibility.
---

# Color Tokens Guide

**Date**: 2026-06-10
**Last Reviewed**: 2026-06-10
**Purpose**: Complete reference for the OKLCH color system — channel primitives, palette architecture, semantic tokens, and platform output
**Organization**: token-documentation
**Scope**: cross-project
**Layer**: 3
**Relevant Tasks**: component-development, token-selection, product-token-authoring

---

## Overview

DesignerPunk's color system is built on **OKLCH** — a perceptually uniform color space where lightness, chroma, and hue are independently meaningful channels. Colors are authored as channel-primitive compositions and organized by semantic concept for discovery and reasoning.

**Key Principles**:
- **Channel-Primitive Architecture**: Colors composed from independent hue, lightness, and chroma tokens
- **Perceptual Uniformity**: Equal numeric steps produce equal visual steps (OKLCH's core guarantee)
- **Concept-First Semantics**: Tokens grouped by meaning (feedback, identity, action, contrast, structure)
- **Three-Tier Neutral Partition**: White, gray, black occupy distinct lightness bands with clear roles
- **OKLCH-Native Output**: Web gets runtime channel composition; native platforms get resolved values
- **Accessibility First**: WCAG compliance via OKLCH→sRGB luminance, contrast validated at build time

---

## Channel-Primitive Architecture

### The Model

Every color in the system is composed from three independently-managed channels:

```
color = oklch(familyLightness[step], familyChroma[step], familyHue)
```

| Channel | Scope | What It Controls |
|---------|-------|-----------------|
| **Hue** | One per family | Color identity (pink, blue, green...) |
| **Lightness** | Per-family, 5 steps | Light/dark progression |
| **Chroma** | Per-family, 5 steps | Vibrancy/saturation at each step |

### Why This Matters

- **Change a hue** → entire family shifts identity (pink becomes coral)
- **Change a lightness step** → one level gets lighter/darker across that family
- **Change chroma** → one level gets more/less vivid
- **Dark mode** → swap lightness scale, preserve hue and chroma
- **Brand customization** → swap hue, system recalculates everything

### Token Structure Per Family

Each chromatic family has **11 channel tokens** + **5 composed colors**:

```
pinkHue = 10.0                             ← 1 hue

pinkLightness100 = 0.92                    ← 5 lightness steps
pinkLightness200 = 0.76
pinkLightness300 = 0.65
pinkLightness400 = 0.55
pinkLightness500 = 0.40

pinkChroma100 = 0.045                      ← 5 chroma steps
pinkChroma200 = 0.160
pinkChroma300 = 0.242
pinkChroma400 = 0.203
pinkChroma500 = 0.141

pink100 = oklch(0.92, 0.045, 10.0)        ← 5 composed colors
pink200 = oklch(0.76, 0.160, 10.0)
pink300 = oklch(0.65, 0.242, 10.0)
pink400 = oklch(0.55, 0.203, 10.0)
pink500 = oklch(0.40, 0.141, 10.0)
```

### What Agents Consume

**Composed colors** (`pink300`, `cyan400`) are used in screen specs, component references, and semantic mappings. Channel primitives are authoring-layer concerns — agents reference composed colors, reason about channels.

---

## Neutral Partition

Neutral colors (white, gray, black) occupy **non-overlapping lightness bands**, each with a distinct role:

| Family | Lightness Range | Step Size | Role |
|--------|----------------|-----------|------|
| **White** | 1.00 → 0.80 | ~0.05 | Bright surfaces, backgrounds, cards |
| **Gray** | 0.72 → 0.32 | ~0.10 | Structure, borders, muted content, body text |
| **Black** | 0.28 → 0.00 | ~0.07 | Dark mode surfaces, deep containers, anchors |

**Buffer gaps** between families prevent overlap creep:
- White500 (L=0.80) → Gray100 (L=0.72) = **0.08 gap**
- Gray500 (L=0.32) → Black100 (L=0.28) = **0.04 gap**

### Neutral Hue

All neutral families share a single `neutralHue` token. The system default is **260°** (cool purple-blue). Products can override this to match their primary color hue, creating a subtle warm/cool relationship between brand identity and neutral surfaces.

- Primary is pink (H≈8°) → neutrals have a warm tint
- Primary is cyan (H≈204°) → neutrals have a cool tint
- Override to any value; set chroma to 0 for pure achromatic

Neutral chroma follows a parabolic curve — higher in the gray mid-range (C≈0.020, where tint is visible on structural elements) and near-zero at the white/black extremes (where tint would be distracting).

---

## Chromatic Families

Seven chromatic families, each with a single hue identity:

| Family | Hue | Semantic Role | Gamut Note |
|--------|-----|---------------|------------|
| **Pink** | ~10° | Error, danger, passion | High chroma capacity |
| **Orange** | ~42° | Warning, warmth, human identity | Good chroma capacity |
| **Yellow** | ~109° | Attention, highlights, energy | Max chroma at high lightness |
| **Green** | ~150° | Success, growth, confirmation | High chroma capacity |
| **Cyan** | ~204° | Action, navigation, primary interactive | Limited chroma at dark lightness |
| **Teal** | ~208° | Info, secondary, AI identity | Limited chroma capacity |
| **Purple** | ~307° | Data, tech, code | Highest chroma capacity |

### Gamut Capacity and Color Strategy

Not all families can achieve the same vibrancy. This affects color strategy declarations:

| Strategy | Can Use | Limited |
|----------|---------|---------|
| **Drenched** (max saturation surfaces) | Purple, pink, green, orange, yellow | Cyan (limited), Teal (cannot) |
| **Full Palette** (3-4 roles at equal weight) | All families at matched lightness steps | — |
| **Committed** (one family dominant) | All families | — |
| **Restrained** (minimal color) | All families | — |

---

## Semantic Color Tokens

Semantic tokens express meaning independent of any component. Pattern:

```
color.{concept}.{role}.{property?}.{state?}
```

### Feedback Concept

| Token | Primitive | Purpose |
|-------|-----------|---------|
| `color.feedback.success.text` | green400 | Success messages, validation |
| `color.feedback.success.background` | green100 | Success alert backgrounds |
| `color.feedback.success.border` | green400 | Success borders |
| `color.feedback.error.text` | pink400 | Error messages |
| `color.feedback.error.background` | pink100 | Error alert backgrounds |
| `color.feedback.error.border` | pink400 | Error borders |
| `color.feedback.warning.text` | orange400 | Caution messages |
| `color.feedback.warning.background` | orange100 | Warning backgrounds |
| `color.feedback.warning.border` | orange400 | Warning borders |
| `color.feedback.info.text` | teal400 | Informational messages |
| `color.feedback.info.background` | teal100 | Info backgrounds |
| `color.feedback.info.border` | teal400 | Info borders |

### Identity, Action, Contrast, Structure, Progress

These follow the same concept-first pattern documented in semantic token source. Reference `src/tokens/semantic/ColorTokens.ts` for the complete mapping.

---

## Blend Model

Interaction states (hover, pressed, focused, disabled) use **OKLCH-space interpolation**. Blend thresholds are defined as perceptual deltas from the rest state:

| State | ΔL | ΔC | Direction |
|-------|----|----|-----------|
| **Hover** | 0.02–0.05 | Preserve | Lighter on dark, darker on light |
| **Pressed** | 0.05–0.10 | Preserve | Same as hover, further |
| **Focused** | 0 | +0.02 min | Chroma boost (not lightness) |
| **Disabled** | 0 | -0.03 min | Desaturate |
| **Icon lighter** | 0.02–0.04 | Preserve | Lighter (optical balance) |

**Web**: Uses `color-mix(in oklch, ...)` for runtime blending.
**Native**: Blend results pre-resolved at build time.

---

## Theme Support

### Dark Mode

Dark mode swaps the **lightness** direction while preserving hue and chroma identity. The semantic layer handles mode-switching — component code doesn't change.

### WCAG High-Contrast

High-contrast themes use per-family **lightness + chroma overrides**:
- Lightness pushed toward extremes (maximum contrast)
- Chroma may be boosted at extreme lightness to maintain visibility
- Hue is ALWAYS preserved (no hue drift between themes — orange stays orange)

### Theme Override Architecture

Overrides are registered via `designerpunk.config.ts` and applied through the `SemanticOverrideResolver`. Override values are OKLCH — the same format as source.

---

## Platform Output

### Web (CSS)

```css
/* Channel primitives (enable runtime composition) */
--pink-hue: 10;
--pink-l300: 0.65;
--pink-c300: 0.242;

/* Composed colors */
--pink-300: oklch(0.65 0.242 10);

/* Product composition at runtime */
--overlay: oklch(from var(--pink-300) l c h / 0.56);
```

### iOS (ChromaKit)

```swift
static let pink300 = Color.oklch(0.65, 0.242, 10.0)
```

### Android (colormath)

```kotlin
val pink300 = Oklch(0.65f, 0.242f, 10.0f).toComposeColor()
```

### DTCG / Figma

sRGB hex output (backward-compatible):
```json
{ "pink-300": { "$value": "#ff2a6d", "$type": "color" } }
```

---

## Hue Arithmetic

Hue relationships are a **designed-in capability** (not tokenized):

| Relationship | Calculation | Use Case |
|-------------|-------------|----------|
| Complementary | hue + 180° | Maximum contrast between families |
| Analogous | hue ± 30° | Harmonious adjacent families |
| Triadic | hue + 120°, hue + 240° | Balanced three-family palettes |

These calculations can inform color strategy but don't produce tokens. Document in spec rationale when used.

---

## Validator Constraints

All color tokens are validated at authoring time:

| Constraint | Rule | Applies To |
|-----------|------|------------|
| Lightness monotonicity | L[n] > L[n+1] for adjacent steps | All families |
| Minimum step distance | |L[n] - L[n+1]| ≥ 0.08 | All families |
| Chroma monotonicity (300→500) | C[n] ≥ C[n+1] for steps 300→500 | Chromatic families |
| sRGB gamut compliance | Resolved oklch(L,C,H) within sRGB | All tokens |
| P3 gamut awareness | Resolved value exceeds sRGB | Warning (not error) |
| Hue consistency | All tokens in family share one hue | All families |
| Neutral chroma ceiling | C ≤ 0.035 | White, gray, black |
| Neutral partition gaps | White→gray ≥0.08, gray→black ≥0.04 | Neutral families |

---

## WCAG Compliance

### Contrast Validation

WCAG contrast is validated by converting OKLCH → sRGB relative luminance → contrast ratio. This is a build-time check, not a runtime concern.

- **Normal text**: Minimum 4.5:1
- **Large text**: Minimum 3:1
- **UI components**: Minimum 3:1

### Perceptual Tolerance (Product Tokens)

When authoring product color tokens, the System-First Value Selection rule applies (see Product-Token-Governance.md). Color tolerance uses **CIEDE2000 ΔE₀₀** — not RGB channel comparison.

---

## Source Locations

| Content | Path |
|---------|------|
| Channel primitives (hues) | `src/tokens/color/channels/hues.ts` |
| Channel primitives (lightness) | `src/tokens/color/channels/lightness/` |
| Channel primitives (chroma) | `src/tokens/color/channels/chroma/` |
| Composed colors | `src/tokens/color/primitives/` |
| Semantic mappings | `src/tokens/semantic/ColorTokens.ts` |
| Theme overrides | `src/tokens/themes/` |
| Blend utilities | `src/blend/OklchBlendCalculator.ts` |
| Validators | `src/color/OklchValidator.ts`, `src/color/OklchConverter.ts` |

---

## Related Documentation

- **Token Governance**: `.kiro/steering/Token-Governance.md`
- **Product Token Governance**: `.kiro/steering/Product-Token-Governance.md` (System-First Value Selection)
- **Rosetta Architecture**: `.kiro/steering/Rosetta-System-Architecture.md`
- **Component Development Guide**: `.kiro/steering/Component-Development-Guide.md`
- **WCAG Guidelines**: [Web Content Accessibility Guidelines 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
