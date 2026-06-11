# Requirements Document: OKLCH Color Migration

**Date**: 2026-06-10
**Spec**: 112 - OKLCH Color Migration
**Status**: Requirements Phase
**Dependencies**: Spec 106 (complete — consumer contract tests protect this migration)

---

## Introduction

DesignerPunk's color system migrates from RGB/RGBA to OKLCH — a perceptually uniform color space that enables direct composition, mathematically meaningful manipulation, and proper theming through channel decomposition. Color primitives are restructured as channel-primitive compositions (hue, lightness scale, chroma scale per family), neutral families are partitioned into non-overlapping lightness bands, and all generators produce OKLCH-native output.

This is a major version bump. The migration changes visual output (blend percentages, palette values), requires new platform dependencies (ChromaKit for iOS, colormath for Android), and restructures how color tokens are authored and stored.

---

## Requirements

### Requirement 1: Channel-Primitive Source Format

**User Story**: As a token author, I want color primitives decomposed into hue, lightness, and chroma channels, so that I can modify one aspect of a color family without affecting others.

#### Acceptance Criteria

1. Each chromatic color family SHALL have exactly one hue token, 5 lightness tokens, and 5 chroma tokens
2. Each composed color primitive SHALL be defined as `oklch(familyLightness[step], familyChroma[step], familyHue)`
3. Hue tokens SHALL be singular per family (e.g., `pinkHue = 10.24`)
4. Lightness and chroma tokens SHALL be per-family, per-step (e.g., `pinkLightness300`, `pinkChroma300`)
5. Chroma values SHALL be 5 explicit values per family (not formula-derived)
6. Validators SHALL enforce: lightness monotonicity, minimum step distance ≥0.08, chroma within sRGB gamut for the family's hue at each lightness, chroma monotonicity for steps 300→500 (darker = equal or less chroma), hue consistency (all tokens in a family reference the same hue token), and neutral chroma ceiling (C ≤ 0.035 for neutral families)

---

### Requirement 2: Neutral Partition

**User Story**: As a designer, I want white, gray, and black to occupy distinct, non-overlapping lightness ranges, so that each family has a clear role without redundancy.

#### Acceptance Criteria

1. White family SHALL span L=1.00 to L=0.80 (5 steps, ~0.05/step)
2. Gray family SHALL span L=0.72 to L=0.32 (5 steps, ~0.10/step)
3. Black family SHALL span L=0.28 to L=0.00 (5 steps, ~0.07/step)
4. Buffer gaps SHALL exist: 0.08 between white500 and gray100, 0.04 between gray500 and black100
5. All neutral families SHALL share a single `neutralHue` token
6. `neutralHue` SHALL default to the product's primary color hue (configurable per product)
7. Neutral chroma SHALL follow a parabolic curve: higher in the gray mid-range (~0.020), near-zero at white/black extremes

---

### Requirement 3: Web Platform Output

**User Story**: As a web developer, I want OKLCH output with channel custom properties, so that I can compose colors at runtime using CSS relative color syntax.

#### Acceptance Criteria

1. Web generator SHALL output composed colors as `oklch()` CSS values (e.g., `--pink-300: oklch(0.65 0.245 8)`)
2. Web generator SHALL ALSO output channel primitives as separate custom properties (e.g., `--pink-l300: 0.65`, `--pink-c300: 0.245`, `--pink-hue: 8`)
3. Products SHALL be able to compose at runtime: `oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue) / var(--opacity))`
4. Relative color syntax SHALL work: `oklch(from var(--pink-300) l c h / 0.56)`

---

### Requirement 4: Native Platform Output

**User Story**: As an iOS/Android developer, I want OKLCH color values in platform-native format, so that colors render correctly without manual conversion.

#### Acceptance Criteria

1. iOS generator SHALL output `Color.oklch(L, C, H)` using ChromaKit
2. Android generator SHALL output `Oklch(L, C, H).toComposeColor()` using colormath
3. Channel primitives SHALL be source-only — native output receives pre-resolved concrete OKLCH values
4. `npx designerpunk init` SHALL scaffold ChromaKit (iOS) and colormath (Android) dependencies for new consumers

---

### Requirement 5: DTCG and Figma Backward Compatibility

**User Story**: As a designer using Figma, I want exported tokens to remain compatible with Figma's color format, so that my design tool workflow isn't disrupted.

#### Acceptance Criteria

1. DTCG generator SHALL convert OKLCH source values to sRGB hex for output
2. Figma generator SHALL convert OKLCH source values to sRGB hex for output
3. Conversion SHALL be deterministic (same OKLCH input always produces same hex output)
4. IF an OKLCH value exceeds sRGB gamut THEN the validator SHALL flag it and the generator SHALL clamp to nearest in-gamut value
5. 8-bit quantization introduces ΔE₀₀ ≈ 0.2–0.5 per conversion — this is expected and acceptable (below perceptual threshold)

---

### Requirement 6: Blend Utility Rework

**User Story**: As a component developer, I want blend utilities that produce perceptually correct results in OKLCH space, so that interaction states (hover, pressed, disabled) look intentional and consistent.

#### Acceptance Criteria

1. Blend utilities SHALL interpolate in OKLCH space (not RGB)
2. Blend percentages SHALL be re-tuned so that existing interaction states maintain their perceptual intent (e.g., "subtle highlight" remains subtle)
3. All component interaction states (hover, pressed, focused, disabled) SHALL be visually audited with testable thresholds: hover ΔL∈[0.02,0.05], pressed ΔL∈[0.05,0.10], focus ΔC≥0.02, disabled ΔC≥0.03 relative to rest state
4. Behavioral contracts that specify blend percentages SHALL be updated to reflect new OKLCH-tuned values
5. Contracts SHOULD move toward intent-based descriptions ("perceptibly darker than rest") over numeric percentages where possible
6. CSS `color-mix(in srgb, ...)` usage in components (Nav-TabBar-Base, Avatar-Base) SHALL be migrated to `color-mix(in oklch, ...)`
7. iOS/Android blend operations SHALL be pre-resolved at build time (no runtime OKLCH interpolation required on native)

---

### Requirement 7: Palette Refinements (Bundled)

**User Story**: As a product developer, I want structural palette issues fixed during the migration, so that accessibility failures and perceptual compression don't carry forward into the OKLCH system.

#### Acceptance Criteria

1. Teal 300-500 SHALL be redesigned to maintain chroma throughout (current values collapse to near-neutral)
2. Green 300-500 SHALL be decompressed so each step is perceptually distinct (current 300/400 differ by 0.007 L)
3. Orange WCAG overrides SHALL preserve hue (H≈42°) across themes (current overrides drift to amber H≈38°)
4. All refinement values SHALL be validated against sRGB gamut boundaries
5. Semantic tokens referencing refined primitives SHALL be verified for WCAG contrast compliance
6. Glow tokens referencing refined primitives SHALL maintain chroma ≥ original value (glow is decorative — WCAG contrast is not the validation metric; chroma preservation is)

---

### Requirement 8: WCAG Contrast Validation

**User Story**: As an accessibility-conscious developer, I want WCAG contrast checks to work correctly with OKLCH values, so that compliance is validated at build time.

#### Acceptance Criteria

1. WCAG contrast validator SHALL convert OKLCH values to sRGB relative luminance for contrast ratio calculation
2. Gamut boundary validator SHALL flag any authored OKLCH value that exceeds sRGB gamut
3. P3 gamut values SHALL be allowed but flagged with a warning (for Apple device support)
4. High-contrast theme mechanism SHALL support per-family lightness + chroma overrides

---

### Requirement 9: Token-Index and MCP

**User Story**: As an agent querying the Application MCP, I want color tokens to include OKLCH channel metadata, so that I can reason about color relationships when selecting components.

#### Acceptance Criteria

1. Token-index SHALL store channel data (L, C, H) as metadata on composed color tokens
2. Channel primitives SHALL NOT appear as separate top-level MCP entries
3. Application MCP `get_token_details` SHALL return OKLCH channel values alongside platform names
4. `search_tokens({ family: "color" })` SHALL continue to return composed colors (not individual channel tokens)

---

### Requirement 10: Documentation Updates

**User Story**: As a developer or agent, I want documentation to reflect the OKLCH color system accurately, so that I understand how to author and consume color tokens.

#### Acceptance Criteria

1. `Token-Family-Color.md` SHALL document OKLCH format, channel primitives, neutral partition, hue arithmetic, gamut constraints, and per-family gamut capacity (noting which families can/cannot support "Drenched" color strategy)
2. `Product-Token-Governance.md` color tolerance row SHALL be updated from RGB ±2/channel to OKLCH ΔE₀₀ threshold
3. `DesignerPunk-Integration-Guide.md` SHALL document ChromaKit/colormath platform dependencies
4. `Rosetta-System-Architecture.md` SHALL reflect OKLCH source format in pipeline descriptions
5. Behavioral contracts referencing blend percentages SHALL be updated to OKLCH-tuned values
6. Release notes SHALL document: new output format, platform dependencies, palette refinements, blend percentage changes

---

### Requirement 11: Backward Compatibility and Migration

**User Story**: As a consumer upgrading to the OKLCH version, I want a clear migration path, so that I can upgrade without guessing what changed.

#### Acceptance Criteria

1. `npx designerpunk sync` SHALL deliver all updated token source files to consumers
2. `npx designerpunk generate` SHALL produce OKLCH output from the new source format without additional configuration
3. Consumer CSS referencing `var(--pink-300)` SHALL continue to work (custom property names unchanged, values change from `rgba()` to `oklch()`)
4. A regression validation test SHALL verify round-trip OKLCH→sRGB produces results within CIEDE2000 ΔE₀₀ < 1 of original RGB values (for colors not intentionally changed by palette refinements)
5. Product tokens with `value:` color fields SHALL have a documented conversion path (guidance for consumers to convert their RGB values to OKLCH format)
