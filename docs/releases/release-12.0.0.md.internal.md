# Release 12.0.0

**Date**: 2026-06-11  
**Previous**: 11.10.0  
**Bump**: major

## 🔴 Breaking / Consumer-Facing

- **Generator Updates** *(Token)*
  Added OKLCH output methods to all platform generators: Web (oklch() + channel custom properties), iOS (ChromaKit Color.oklch), Android (colormath Oklch.toComposeColor), DTCG/Figma (sRGB hex via CSS L4 gamut mapping), and token-index (OKLCH channel metadata).
- **Component Visual Audit + Contract Updates** *(Token)*
  Audited all 11 components with blend-dependent interaction states against OKLCH ΔL/ΔC thresholds. Verified glow token chroma preservation (found and resolved green500 conflict). Updated 11 contracts.yaml files to replace RGB-era blend percentage language with intent-based descriptions and measurable OKLCH thresholds.

## 🔵 Internal / Context

- **OKLCH Mathematical Foundation** *(Other)*
  Implemented the mathematical foundation for the OKLCH color migration: `OklchConverter` (conversion, WCAG, ΔE₀₀, CSS L4 gamut mapping) and `OklchValidator` (family constraint enforcement).
- **Blend Utility Rework** *(Other)*
  Implemented `OklchBlendCalculator` with perceptually uniform OKLCH-space interpolation and surface-aware interaction state blends. Migrated 6 `color-mix(in srgb)` instances to `color-mix(in oklch)` in Nav-TabBar-Base and Avatar-Base CSS.
- **WCAG Validation + Regression Testing** *(Other)*
  Validated WCAG AA contrast compliance and perceptual regression for the full OKLCH color palette against pre-migration RGB values.
