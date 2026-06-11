# Design Document: OKLCH Color Migration

**Date**: 2026-06-10
**Spec**: 112 - OKLCH Color Migration
**Status**: Design Phase
**Dependencies**: Spec 106 (complete)

---

## Overview

This design migrates DesignerPunk's color system from RGB/RGBA to OKLCH using a channel-primitive composition model. Colors are decomposed into independently-managed hue, lightness, and chroma channels per family. The neutral palette is restructured into three non-overlapping bands. All generators, validators, blend utilities, and theme mechanisms are updated to operate in OKLCH space.

---

## Architecture

### Token Source Structure

```
src/tokens/
├── color/
│   ├── channels/
│   │   ├── hues.ts              — One hue per chromatic family + neutralHue
│   │   ├── lightness/
│   │   │   ├── pink.ts          — pinkLightness100–500
│   │   │   ├── blue.ts
│   │   │   ├── white.ts         — whiteLightness100–500
│   │   │   ├── gray.ts
│   │   │   └── black.ts
│   │   └── chroma/
│   │       ├── pink.ts          — pinkChroma100–500
│   │       ├── blue.ts
│   │       ├── white.ts         — whiteChroma100–500 (near-zero)
│   │       ├── gray.ts
│   │       └── black.ts
│   ├── primitives/
│   │   ├── chromatic.ts         — Composed: pink100–500, blue100–500, etc.
│   │   └── neutral.ts          — Composed: white100–500, gray100–500, black100–500
│   └── index.ts                 — Barrel exports
├── semantic/
│   └── ColorTokens.ts           — Semantic mappings (unchanged structure, updated values)
└── themes/
    ├── dark/SemanticOverrides.ts — OKLCH values
    └── wcag/SemanticOverrides.ts — OKLCH values (hue-preserved for orange)
```

### Pipeline Data Flow

```
Channel Primitives (hue, lightness[], chroma[])
    │
    ├── Composition: oklch(L, C, H) → Primitive Color Tokens
    │
    ├── Semantic Resolution: primitive → semantic (unchanged pattern)
    │
    ├── Theme Override: SemanticOverrideResolver (OKLCH values)
    │
    ├── Mode Resolution: light/dark/wcag contexts (unchanged pattern)
    │
    └── Generation:
        ├── Web: oklch() CSS + channel custom properties
        ├── iOS: Color.oklch(L, C, H) via ChromaKit (resolved)
        ├── Android: Oklch(L, C, H).toComposeColor() (resolved)
        ├── DTCG: OKLCH → sRGB hex conversion
        └── Figma: OKLCH → sRGB hex conversion
```

---

## Components and Interfaces

### ColorChannelToken (New Type)

```typescript
interface ColorChannelToken {
  name: string;                    // e.g., 'pinkHue', 'pinkLightness300'
  channel: 'hue' | 'lightness' | 'chroma';
  family: string;                  // e.g., 'pink', 'neutral'
  step?: number;                   // undefined for hue, 100-500 for L/C
  value: number;                   // Hue: 0-360, L: 0-1, C: 0-0.4
}
```

### ComposedColorToken (Replaces current color PrimitiveToken format)

```typescript
interface ComposedColorToken {
  name: string;                    // e.g., 'pink300'
  family: string;
  step: number;
  channels: {
    hue: string;                   // Reference: 'pinkHue'
    lightness: string;             // Reference: 'pinkLightness300'
    chroma: string;                // Reference: 'pinkChroma300'
  };
  resolved: { l: number; c: number; h: number };  // Resolved values for generation
}
```

### OklchValidator (New)

```typescript
interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

class OklchValidator {
  /** Validate a complete color family */
  validateFamily(family: ColorFamily): ValidationResult;

  /** Check sRGB gamut compliance */
  isInGamut(l: number, c: number, h: number): boolean;

  /** Check P3 gamut (warning, not error) */
  isInP3(l: number, c: number, h: number): boolean;

  /** Validate lightness monotonicity and min step */
  validateLightnessScale(steps: number[]): ValidationResult;

  /** Validate chroma monotonicity for steps 300-500 */
  validateChromaScale(steps: number[], lightnessSteps: number[]): ValidationResult;

  /** Validate neutral chroma ceiling */
  validateNeutralChroma(chroma: number[]): ValidationResult;

  /** Validate hue consistency across family */
  validateHueConsistency(family: ComposedColorToken[]): ValidationResult;
}
```

### OklchConverter (New)

```typescript
class OklchConverter {
  /** OKLCH → sRGB (for DTCG/Figma export) */
  toSrgbHex(l: number, c: number, h: number): string;

  /** OKLCH → sRGB relative luminance (for WCAG) */
  toRelativeLuminance(l: number, c: number, h: number): number;

  /** WCAG contrast ratio between two OKLCH colors */
  contrastRatio(color1: Oklch, color2: Oklch): number;

  /** CIEDE2000 ΔE between two colors */
  deltaE00(color1: Oklch, color2: Oklch): number;

  /** Clamp to nearest in-gamut sRGB value */
  clampToGamut(l: number, c: number, h: number): Oklch;
}
```

### BlendCalculator (Reworked)

```typescript
class OklchBlendCalculator {
  /** Blend two OKLCH colors at a given ratio */
  blend(base: Oklch, overlay: Oklch, ratio: number): Oklch;

  /** Apply opacity overlay (the primary composition use case) */
  applyOpacity(color: Oklch, opacity: number, surface: Oklch): Oklch;

  /** Compute interaction state blend */
  interactionBlend(
    base: Oklch,
    state: 'hover' | 'pressed' | 'focused' | 'disabled',
    surface: Oklch
  ): Oklch;
}
```

---

## Data Models

### Channel Primitive Storage

```typescript
// src/tokens/color/channels/hues.ts
export const colorHues = {
  pink: 8.2,
  orange: 42.5,
  yellow: 109.0,
  green: 150.0,
  cyan: 204.0,
  teal: 208.0,
  purple: 307.0,
  neutral: 260.0,  // Default — overridden by product's primary hue
};

// src/tokens/color/channels/lightness/pink.ts
export const pinkLightness = {
  100: 0.92,
  200: 0.76,
  300: 0.65,
  400: 0.55,
  500: 0.40,
};

// src/tokens/color/channels/chroma/pink.ts
export const pinkChroma = {
  100: 0.05,
  200: 0.17,
  300: 0.24,
  400: 0.20,
  500: 0.14,
};
```

### Theme Override Format (OKLCH)

```typescript
// src/tokens/themes/dark/SemanticOverrides.ts
export const darkSemanticOverrides: Record<string, Oklch> = {
  'color.surface.primary': { l: 0.14, c: 0.008, h: 'neutralHue' },
  'color.text.default': { l: 0.90, c: 0.012, h: 'neutralHue' },
  'color.action.primary': { l: 0.72, c: 0.18, h: 'primaryHue' },
};
```

---

## Generator Changes

### WebFormatGenerator

**Before**: `--pink-300: rgba(255, 42, 109, 1);`
**After**:
```css
/* Channel primitives */
--pink-hue: 8.2;
--pink-l100: 0.92; --pink-l200: 0.76; --pink-l300: 0.65; --pink-l400: 0.55; --pink-l500: 0.40;
--pink-c100: 0.05; --pink-c200: 0.17; --pink-c300: 0.24; --pink-c400: 0.20; --pink-c500: 0.14;

/* Composed colors */
--pink-300: oklch(0.65 0.245 8.2);
```

### iOSFormatGenerator

**Before**: `static let pink300 = UIColor(red: 1.0, green: 0.165, blue: 0.427, alpha: 1.0)`
**After**: `static let pink300 = Color.oklch(0.65, 0.245, 8.2)`

### AndroidFormatGenerator

**Before**: `val pink300 = Color(0xFFFF2A6D)`
**After**: `val pink300 = Oklch(0.65f, 0.245f, 8.2f).toComposeColor()`

### DTCGFormatGenerator / FigmaFormatGenerator

Output sRGB hex (unchanged format, values converted from OKLCH source):
```json
{ "pink-300": { "$value": "#ff2a6d", "$type": "color" } }
```

---

## Blend Utility Rework

### Interaction State Thresholds

| State | ΔL from rest | ΔC from rest | Direction |
|-------|-------------|-------------|-----------|
| Hover | 0.02–0.05 | 0 (preserve) | Lighter on dark, darker on light |
| Pressed | 0.05–0.10 | 0 (preserve) | Same direction as hover, further |
| Focused | 0 | +0.02 min | Chroma boost (not lightness) |
| Disabled | 0 | -0.03 min | Desaturate (chroma reduction) |

### CSS color-mix Migration

```css
/* Before */
background: color-mix(in srgb, var(--pink-300) 88%, var(--surface));

/* After */
background: color-mix(in oklch, var(--pink-300) 88%, var(--surface));
```

Components using `color-mix(in srgb)`: Nav-TabBar-Base, Avatar-Base. Both migrate to `color-mix(in oklch)`.

---

## Testing Strategy

### Unit Tests

- **OklchValidator**: All constraint checks (monotonicity, step distance, gamut, chroma ceiling, hue consistency)
- **OklchConverter**: Round-trip accuracy (OKLCH→sRGB→OKLCH within ΔE₀₀ < 0.1), gamut clamping, WCAG luminance
- **BlendCalculator**: Interaction state blends produce results within threshold ranges
- **Channel composition**: Composed colors resolve correctly from channel references
- **Neutral partition**: All steps within declared ranges, no overlap

### Integration Tests

- **Generator output**: Web emits both channels + composed; iOS/Android emit resolved values; DTCG/Figma emit hex
- **Theme resolution**: Dark/WCAG overrides produce correct OKLCH values through full pipeline
- **Regression**: ΔE₀₀ < 1 for all non-intentionally-changed colors vs pre-migration values
- **WCAG contrast**: All semantic text/background pairs pass AA (4.5:1) after migration

### Visual Audit (Manual + Automated)

- **13 components** with interaction states audited for blend threshold compliance
- **Glow tokens** verified for chroma preservation
- **Palette refinements** (teal, green, orange) verified for gamut compliance and WCAG

---

## Design Decisions

### Decision 1: Channel-Primitive Composition

Per-family hue, lightness, and chroma as independent tokens composed into colors. Enables single-channel modifications for theming and customization. Web gets runtime composition; native platforms resolve at build time.

### Decision 2: Per-Family Lightness (Not Shared)

Each family has its own lightness progression. Enables customer-specific tuning without cross-family effects. Trades cross-family weight matching (handled at semantic layer) for flexibility and brand preservation.

### Decision 3: Neutral Hue Follows Primary

`neutralHue` defaults to product's primary color hue. Creates subtle warm/cool complement between brand identity and neutral surfaces. Configurable per product.

### Decision 4: Blend in OKLCH Space

Interaction state blends interpolate in OKLCH (perceptually uniform). Percentages re-tuned from RGB values. Contracts updated with testable ΔL/ΔC thresholds.

### Decision 5: DTCG/Figma Remain sRGB

Export formats convert OKLCH→sRGB hex at generation time. Source is OKLCH; backward-compatible output for tools that don't support it.

### Decision 6: Regression via CIEDE2000

ΔE₀₀ < 1 threshold for non-intentionally-changed colors. Validates the migration doesn't drift colors beyond perceptibility. 8-bit quantization floor (ΔE₀₀ ≈ 0.2–0.5) is expected and acceptable.
