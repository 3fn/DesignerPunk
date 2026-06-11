# Release Notes — v12.0.0

**Date**: 2026-06-10
**Type**: Major Release
**Specs**: 112 (OKLCH Color Migration)
**Previous**: v11.10.0

---

## Summary

Complete color system migration from RGB/RGBA to OKLCH. Colors are now authored as channel-primitive compositions (independent hue, lightness, and chroma per family), neutral families restructured into non-overlapping lightness bands, all generators produce OKLCH-native output, and blend utilities interpolate in perceptually uniform space. Includes structural palette refinements for teal, green, and orange families.

This is a **major version bump** — new output format, new platform dependencies, and intentional palette visual changes.

---

## ⚠️ Breaking Changes

### New Color Output Format

All platform output changes from RGBA to OKLCH:
- **Web**: `--pink-300: oklch(0.65 0.242 10);` (was `rgba(255, 42, 109, 1)`)
- **iOS**: `Color.oklch(0.65, 0.242, 10.0)` (was `UIColor(red:green:blue:alpha:)`)
- **Android**: `Oklch(0.65f, 0.242f, 10.0f).toComposeColor()` (was `Color.argb()`)
- **DTCG/Figma**: sRGB hex (unchanged format — converted from OKLCH source)

CSS custom property NAMES are unchanged (`var(--pink-300)` still works). Only values change format.

### New Platform Dependencies Required

| Platform | Dependency | Purpose |
|----------|-----------|---------|
| iOS | [ChromaKit](https://github.com/HarshilShah/ChromaKit) | OKLCH color API for SwiftUI |
| Android | [colormath](https://github.com/ajalt/colormath) | OKLCH color API for Compose |
| Web | None | CSS `oklch()` is native |

### Blend Percentage Changes

Interaction state blends re-tuned for OKLCH-space interpolation. Same perceptual intent (hover is subtle, pressed is obvious), different numeric percentages. Component behavioral contracts updated.

### Palette Refinements (Intentional Visual Changes)

| Family | Change | Why |
|--------|--------|-----|
| **Teal 300–500** | Chroma increased (was near-neutral, now visibly teal) | `color.feedback.info.text` was invisible (1.5:1 contrast) — now passes WCAG AA |
| **Green 300–500** | Lightness decompressed (steps were perceptually identical) | `color.feedback.success.text` was unreadable (1.3:1 contrast) — now passes WCAG AA |
| **Orange WCAG** | Hue preserved at 42° (was drifting to amber 38°) | Dual-theme promise: same identity, different contrast level |
| **Neutral families** | Restructured into non-overlapping bands | White 1.0→0.80, Gray 0.72→0.32, Black 0.28→0.00 (were overlapping) |

---

## Upgrade Path

```bash
npm install @3fn/core@12.0.0
npx designerpunk sync          # Updates token source to OKLCH channels
npx designerpunk generate      # Produces OKLCH output
```

Then add platform dependencies:
- iOS: Add ChromaKit via Swift Package Manager
- Android: Add colormath to build.gradle

For product color tokens with `value:` fields: convert RGB/hex values to OKLCH format (`oklch(L C H)`).

---

## Changes

### Channel-Primitive Architecture (Spec 112, Task 1-2)

- Colors decomposed into independent hue, lightness, and chroma channel tokens
- Per-family lightness and chroma (not shared — enables per-customer tuning)
- One hue per chromatic family (change hue = shift entire family)
- New source structure: `src/tokens/color/channels/` (hues, lightness, chroma per family)
- OklchConverter: OKLCH↔sRGB conversion, WCAG contrast, CIEDE2000 ΔE₀₀
- OklchValidator: gamut, monotonicity, step distance, chroma ceiling, hue consistency

### Neutral Partition (Spec 112, Task 2)

- White (1.0→0.80): bright surfaces, backgrounds, cards
- Gray (0.72→0.32): structure, borders, muted content, body text
- Black (0.28→0.00): dark mode surfaces, deep containers
- Shared `neutralHue` (default 260°, configurable to match product primary)
- Parabolic chroma curve (perceptible tint in gray mid-range, invisible at extremes)

### Generator Updates (Spec 112, Task 3)

- Web: emits BOTH channel custom properties (`--pink-hue`, `--pink-l300`, `--pink-c300`) AND composed colors (`--pink-300: oklch(...)`)
- iOS: `Color.oklch(L, C, H)` via ChromaKit
- Android: `Oklch(L, C, H).toComposeColor()` via colormath
- DTCG/Figma: OKLCH→sRGB hex at generation time (backward-compatible)
- Token-index: OKLCH channel values as metadata on composed color entries

### Blend Utility Rework (Spec 112, Task 4)

- Blend interpolation in OKLCH space (perceptually uniform)
- Interaction thresholds: hover ΔL 0.02–0.05, pressed ΔL 0.05–0.10, focus ΔC≥0.02, disabled ΔC≥0.03
- CSS `color-mix(in srgb)` → `color-mix(in oklch)` in Nav-TabBar-Base, Avatar-Base
- Native blend pre-resolved at build time

### Component Audit + Contract Updates (Spec 112, Task 5)

- 14 components audited for blend threshold compliance
- Behavioral contracts updated with OKLCH-tuned blend percentages
- Glow tokens verified for chroma preservation
- All component interaction states produce correct visual results

### WCAG + Regression (Spec 112, Task 6)

- All semantic text/background pairs pass WCAG AA (4.5:1)
- Teal info.text: 1.5:1 → 9.77:1 (fixed)
- Green success.text: 1.3:1 → 4.72:1 (fixed)
- Regression: non-intentionally-changed colors within ΔE₀₀ < 1
- Consumer contract test (Spec 106) passes

### Documentation (Spec 112, Task 7)

- Token-Family-Color.md rewritten for OKLCH system
- Product-Token-Governance.md color tolerance: RGB ±2/channel → OKLCH ΔE₀₀ ≤ 1.0
- Integration Guide: ChromaKit/colormath dependencies, OKLCH migration guide
- Rosetta-System-Architecture.md: OKLCH pipeline diagram

---

## Web Runtime Composition (New Capability)

The primary motivation for OKLCH — products can now compose colors at runtime without workaround tokens:

```css
/* Use system color at custom opacity */
background: oklch(from var(--pink-300) l c h / 0.56);

/* Compose from channel primitives */
border-color: oklch(var(--pink-l400) var(--pink-c400) var(--pink-hue) / 0.3);

/* Mix in OKLCH space */
background: color-mix(in oklch, var(--cyan-300) 88%, var(--surface));
```

No more creating `pinkAt56Percent` workaround tokens. OKLCH + relative color syntax handles all opacity/channel manipulation natively.

---

## Test Suite

- 369 suites, 8936 tests, 0 failures
- OklchConverter: deterministic conversion, gamut clamping, WCAG luminance
- OklchValidator: all 8 constraints verified
- Channel primitives: 29 chromatic + 18 neutral evergreen tests
- BlendCalculator: 14 threshold compliance tests
- Component visual audit: 14 components pass
- WCAG contrast: all semantic pairs verified
- Regression: ΔE₀₀ validated for non-intentional changes
- Consumer contract test (Spec 106): passes
- Impeccable detectors: OKLCH parsing + contrast checks verified
- No legacy RGBA test assertions remaining
