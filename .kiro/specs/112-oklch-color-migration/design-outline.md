# Design Outline: OKLCH Color Migration

**Spec**: 112 - OKLCH Color Migration
**Date**: 2026-06-01
**Status**: Design Outline
**Agent**: Thurgood (formalization) + Ada (execution)

---

## Problem Statement

DesignerPunk's color system uses RGB/RGBA internally and in output. This creates two problems:

1. **Composition limitation**: Product code frequently needs "system color at system opacity" (e.g., white at 56% for muted text). CSS custom properties can't decompose RGBA, forcing product teams to create workaround tokens for every color+opacity combination. With OKLCH, CSS relative color syntax enables direct composition: `oklch(from var(--color) l c h / var(--opacity))`.

2. **Perceptual non-uniformity**: RGB lightness doesn't correspond to human perception. The 100-500 color scale has uneven perceptual steps. OKLCH is perceptually uniform, making programmatic color manipulation (darken, lighten, desaturate) predictable and mathematically meaningful.

---

## Proposed Solution

Migrate the entire color system from RGBA to OKLCH:
- Token source authored in OKLCH values
- Web output: native CSS `oklch()` (enables composition)
- iOS output: `Color.oklch(...)` via ChromaKit (or inlined conversion)
- Android output: `Oklch(...).toComposeColor()` via colormath

Single spec, sequential tasks, one release. RGBA regression validation used during development only — not shipped.

---

## Platform Support

| Platform | OKLCH Support | Mechanism |
|----------|--------------|-----------|
| **Web** | Native | CSS `oklch(L C H / alpha)` + relative color syntax |
| **iOS** | Via library | [ChromaKit](https://github.com/HarshilShah/ChromaKit) — `Color.oklch(L, C, H)` for SwiftUI/UIKit |
| **Android** | Via library | [colormath](https://github.com/ajalt/colormath) — `Oklch(L, C, H).toComposeColor()` with Compose extension |

**Alternative for iOS**: Instead of ChromaKit dependency, generate the OKLCH→sRGB conversion inline (~30 lines of Swift). Removes runtime dependency concern (ChromaKit has bus-factor-of-1). Tradeoff: slightly larger generated files.

**Decision needed**: ChromaKit vs inlined conversion for iOS output.

---

## Scope

### In Scope
- Token source format migration (ColorTokens.ts: RGBA → OKLCH)
- Mode resolution pipeline update (SemanticOverrideResolver, SemanticValueResolver)
- WebFormatGenerator: output `oklch()` CSS
- iOSFormatGenerator: output OKLCH via ChromaKit or inlined conversion
- AndroidFormatGenerator: output OKLCH via colormath
- DTCG/Figma export (convert OKLCH → sRGB hex for Figma compatibility)
- Color validators: WCAG contrast checking against OKLCH values
- Blend utilities: rework for OKLCH color space
- Theme override files: convert values to OKLCH
- Token-index: update stored color format
- Consumer migration: `npx designerpunk sync` (Spec 111) handles file updates
- `@3fn/core` init: scaffold ChromaKit/colormath dependencies for new consumers

### Out of Scope
- Non-color tokens (spacing, typography, motion, etc.)
- Component logic changes (components consume tokens by name — format is transparent)
- Product token migration (product teams migrate their own `value:` color tokens)

---

## Key Design Decisions

### Decision 1: Source Format — Channel-Primitive Composition (DRAFT — awaiting Ada review)

**The model**: Color primitives are composed from three independently-managed channel layers, all per-family:

1. **Hue** (one per color family) — defines family identity (pink, blue, green, etc.)
2. **Lightness scale** (per-family) — defines each family's light/dark progression, tunable per customer
3. **Chroma scale** (per-family) — defines vibrancy at each step, respecting each hue's gamut capacity

```
// One hue per family — the family's identity
pinkHue = 10.24
blueHue = 255.0
greenHue = 145.0

// Per-family lightness scale — tunable per customer/brand
pinkLightness100 = 0.92
pinkLightness200 = 0.76
pinkLightness300 = 0.65
pinkLightness400 = 0.55
pinkLightness500 = 0.40

blueLightness100 = 0.95
blueLightness200 = 0.82
blueLightness300 = 0.70
blueLightness400 = 0.55
blueLightness500 = 0.40

// Per-family chroma scale — respects gamut limits per hue
pinkChroma100 = 0.05
pinkChroma200 = 0.17
pinkChroma300 = 0.24
pinkChroma400 = 0.20
pinkChroma500 = 0.14

// Composed color primitives
pink300 = oklch(pinkLightness300, pinkChroma300, pinkHue)
blue300 = oklch(blueLightness300, blueChroma300, blueHue)

// Semantic layer references as normal
color.feedback.error.text = pink400
```

**Why per-family lightness (not shared)**:
- **Customer flexibility**: Different products need different lightness progressions per family. A fintech may want dark, serious reds and bright, celebratory greens. Shared lightness imposes one opinion.
- **Preserves brand identity during migration**: Existing palette can be encoded without forced visual changes.
- **Scale and diverse needs**: The `configure` wizard (Spec 113) can offer per-family lightness tuning as a meaningful customization point.
- **Gamut-friendly**: Each family's lightness can sit at the L value where its hue achieves maximum chroma, rather than being forced to a shared L that constrains vibrancy.

**What's still shared**:
- The *structure* is consistent (every family has 5 lightness steps, 5 chroma steps, 1 hue)
- The *step names* (100-500) mean the same thing structurally across families
- The *composition pattern* is identical: `oklch(familyLightness[step], familyChroma[step], familyHue)`

**Cross-family weight matching** (Leonardo's concern): Handled at the semantic layer, not the primitive layer. `color.feedback.error.text` and `color.feedback.success.text` reference whichever step produces correct contrast — the semantic mapping provides intent-matching, not numeric step equivalence.

**Open questions for Ada**:
- Can chroma at each step be derived from a formula (e.g., `chromaBase * lightnessRelativeFactor`), or does each family need 5 explicit chroma values?
- What does generation look like per platform? Web composes at runtime (`oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue))`). iOS/Android resolve at build time — are channel primitives source-only with concrete resolved output?
- Does this model align with or conflict with the existing mathematical relationships in the spacing/scale token architecture?
- For hue arithmetic (complementary/analogous): is this a designed-in capability or informal?

**This is a DRAFT architectural proposal.** Ada's expertise on OKLCH gamut behavior, mathematical relationships, and generation pipeline implications is needed before this becomes a spec decision.

### Decisions Resolved (from R1/R2 feedback)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Lightness scale | Per-family (not shared) | Customer flexibility, brand preservation, gamut-friendly |
| Chroma derivation | 5 explicit values per family | Formula as validator constraint, not derivation. Steps 100-200 have no cross-family pattern. |
| Web output | Emit BOTH channel primitives AND composed colors | Negligible cost, enables advanced product composition |
| iOS/Android output | Resolved concrete values (channel primitives are source-only) | No runtime channel composition on native platforms |
| Token-index/MCP | Channels as metadata on composed colors (not separate top-level entries) | Leonardo consumes composed colors; channels are authoring-layer |
| Mathematical relationship | Hand-tuned with validator constraints (monotonicity, min step ≥0.08, k-ratio, gamut) | Color perception isn't purely mathematical like spacing |
| Hue arithmetic | Designed-in, documented, NOT tokenized | Don't create relationship tokens; document in Token-Family-Color.md |
| HC chroma | Per-family HC chroma overrides supported (all families except teal need them at extreme L) | Architecture naturally supports via theme config |
| Token count | 77 channel primitives + 35 composed = 112 total (+77 from current) | Manageable; no MCP structural changes; components reference composed only |
| Neutral partition | Three non-overlapping bands: White 1.0→0.80, Gray 0.72→0.32, Black 0.28→0.00 | Clean role separation; eliminates current overlap; buffer gaps prevent creep |
| Neutral hue | Single `neutralHue` token matching product's primary color hue | Neutrals subtly complement the brand; configurable per product via `configure` wizard |
| Neutral chroma | Parabolic curve peaking in gray mid-range (C≈0.020), near-zero at extremes | Hue perceptible in structural range, invisible in surfaces and deep darks |
| Gray050 / gray shift | Superseded by full neutral partition redesign | Gap solved architecturally, not by adding tokens or shifting values |

### Neutral Partition Architecture

```
// Single neutral hue — follows primary color
neutralHue = primaryHue   // e.g., 260° if primary is purple-blue

// White family: bright surfaces (L 1.0 → 0.80)
whiteLightness = [1.00, 0.95, 0.90, 0.85, 0.80]
whiteChroma    = [0.006, 0.009, 0.012, 0.014, 0.015]

   ── 0.08 buffer gap ──

// Gray family: mid-tones, structure, text (L 0.72 → 0.32)
grayLightness = [0.72, 0.62, 0.52, 0.42, 0.32]
grayChroma    = [0.018, 0.020, 0.020, 0.018, 0.015]

   ── 0.04 buffer gap ──

// Black family: dark surfaces, deep backgrounds (L 0.28 → 0.00)
blackLightness = [0.28, 0.21, 0.14, 0.07, 0.00]
blackChroma    = [0.013, 0.010, 0.008, 0.005, 0.000]

// All composed from same hue:
white300 = oklch(0.90, 0.012, neutralHue)
gray500  = oklch(0.32, 0.015, neutralHue)   // body text
black300 = oklch(0.14, 0.008, neutralHue)   // dark mode surface
```

**Role assignment:**
- White = light surfaces, backgrounds, cards
- Gray = structural elements, muted content, borders, body text (gray500)
- Black = dark mode surfaces, deep containers, high-contrast anchors

### Decision 2: iOS Output Strategy

**Options:**
- A) Depend on ChromaKit (runtime dependency for consumers)
- B) Inline OKLCH→sRGB conversion in generated Swift (~30 lines of helper + per-token usage)
- C) Generate sRGB UIColor from OKLCH at build time (same as today, just different source)

**Leaning:** A or B (needs Peter's input). C loses the benefit of OKLCH in iOS code.

### Decision 3: WCAG Contrast Validation

OKLCH lightness (L) is perceptual but isn't the WCAG formula. Standards-compliant contrast ratios require sRGB relative luminance.

**Approach:** Validators convert OKLCH → linear sRGB → relative luminance for WCAG checks. The conversion is deterministic math (well-documented in CSS Color L4 spec). Build-time only.

### Decision 4: Figma/DTCG Integration

Figma uses sRGB hex. DTCG format may not support OKLCH.

**Approach:** DTCG and Figma export generators convert OKLCH → sRGB hex at generation time. These are output formats, not source formats. The source is OKLCH; backward-compatible outputs are generated for tools that don't support it.

### Decision 5: Regression Validation Strategy

**Approach:** During development, convert all current RGBA values to OKLCH and back. Verify round-trip produces visually identical results (within ΔE < 1 tolerance). This validates the math before shipping. Removed before release — not a permanent artifact.

---

## Key Files Affected

| Area | Files | Nature of Change |
|------|-------|-----------------|
| Token source | `src/tokens/ColorTokens.ts` | RGBA strings → OKLCH objects |
| Theme overrides | `src/tokens/themes/*/SemanticOverrides.ts` | RGBA → OKLCH |
| Mode resolution | `src/build/tokens/SemanticOverrideResolver.ts`, `SemanticValueResolver.ts` | Handle OKLCH format |
| Web generator | `src/generators/WebFormatGenerator.ts` | Output `oklch()` |
| iOS generator | `src/generators/iOSFormatGenerator.ts` | Output ChromaKit or inline OKLCH |
| Android generator | `src/generators/AndroidFormatGenerator.ts` | Output colormath OKLCH |
| DTCG generator | `src/generators/DTCGFormatGenerator.ts` | OKLCH → sRGB hex conversion |
| Figma generator | `src/generators/FigmaFormatGenerator.ts` | OKLCH → sRGB hex conversion |
| Validators | `src/validators/` (color-related) | Parse OKLCH, convert for WCAG |
| Blend utilities | `src/blend/` | Rework for OKLCH interpolation |
| Token index | `token-index/` | Updated color format |
| Tests | Multiple test files | RGBA assertions → OKLCH assertions |

---

## Risks

1. **Color drift from rounding**: OKLCH→sRGB conversion introduces floating-point rounding. Visually imperceptible (ΔE < 1) but snapshot tests will fail. Plan for baseline resets.

2. **Gamut clipping**: Some OKLCH values have no sRGB representation. Need validation that authored OKLCH values are within sRGB gamut (or P3 gamut for Apple devices). Add gamut-boundary validator.

3. **Blast radius**: Touching every color value + resolver chain + all generators simultaneously. Mitigated by sequential task execution and regression validation at each step.

4. **Consumer breaking change**: Major version bump. Products need to add platform dependencies (ChromaKit/colormath) and regenerate. Spec 111 (sync command) helps, but this is still a migration.

---

## Dependencies

- **Spec 111 (Sync Command)**: Not a hard blocker, but having `npx designerpunk sync` available makes consumer migration smoother. Can ship OKLCH without sync — consumers would manually copy files as they do today.

---

## Success Criteria

- All color tokens authored in OKLCH format
- Web output uses native `oklch()` — enables `oklch(from var(--color) l c h / var(--opacity))` composition
- iOS output uses OKLCH (via ChromaKit or inline)
- Android output uses OKLCH (via colormath)
- DTCG and Figma output produce valid sRGB hex (backward-compatible)
- WCAG contrast validation passes with OKLCH values
- Blend utilities produce perceptually correct results in OKLCH space
- All existing tests pass (with updated assertions)
- Product token composition issue (4 workaround tokens) eliminated on web

---

## Stakeholder Review

- **Ada** — primary executor; owns Rosetta pipeline, mathematical foundations, generation
- **Lina** — component impact review (verify components are format-agnostic)
- **Kenya** — iOS platform validation (ChromaKit integration)
- **Data** — Android platform validation (colormath integration)
- **Sparky** — Web validation (OKLCH composition patterns)
- **Thurgood** — governance, test coverage, spec formalization

---

## Open Questions

1. ~~**ChromaKit vs inline Swift**~~ → **Decision: ChromaKit.** Runtime dependency accepted. Tiny pure-math library, MIT licensed, trivially vendorable if abandoned.
2. ~~**Gamut strategy**~~ → **Decision: Allow P3.** Don't restrict the palette. Add gamut-boundary validator to flag tokens that exceed sRGB for visibility on older displays.
3. ~~**Blend utility scope**~~ → **Decision: Full rework.** Blend utilities rewritten for OKLCH. Blend percentages re-tuned. Visual audit of all component interaction states. Behavioral contracts updated.
4. ~~**Version bump**~~ → **Decision: Major (12.0.0).** Breaking change: new output format, new platform dependencies, blend percentage changes.

## Additional Scope (Identified Post-Outline)

### Behavioral Contract Updates (Lina)

The blend utility rework will produce different visual results for interaction states (hover, pressed, disabled). This requires:
- Visual audit of all component interaction states post-rework
- Blend percentage re-tuning to match perceptual intent
- Behavioral contract updates for visual state specifications
- Platform implementation verification across web/iOS/Android

### Expanded Stakeholder Involvement

| Agent | Role |
|-------|------|
| Ada | Primary executor — pipeline, generators, validators, math |
| Lina | Contract updates, component visual audit, blend re-tuning |
| Kenya | iOS validation — ChromaKit integration, visual correctness |
| Data | Android validation — colormath integration, visual correctness |
| Sparky | Web validation — OKLCH composition patterns, blend states |
| Thurgood | Governance, test coverage, spec formalization |

### Revised Effort Estimate

5-6 parent tasks (up from Ada's 4-5 estimate due to blend rework + contract updates):
1. Source format migration + resolver chain
2. Generator updates (all three platforms + DTCG/Figma)
3. Blend utility rework + percentage re-tuning
4. Validator updates (WCAG + gamut boundary)
5. Component visual audit + contract updates
6. Integration testing + regression validation

### Documentation Updates Required

This migration affects documentation across multiple layers:

| Document | What Changes |
|----------|-------------|
| **Token-Family-Color.md** | OKLCH format, new channel descriptions (L/C/H vs R/G/B/A), gamut notes |
| **Token-Quick-Reference.md** | Color token value format examples |
| **Product-Token-Governance.md** | Update "Perceptual Tolerance Guidelines" color row: RGB ±2/channel → OKLCH ΔE threshold |
| **Rosetta-System-Architecture.md** | Pipeline stage descriptions reflect OKLCH source format |
| **Token-Governance.md** | Color token creation rules updated for OKLCH authoring |
| **Component-Family docs** (any referencing color) | Blend state descriptions reflect OKLCH terminology |
| **DesignerPunk-Integration-Guide.md** | Platform dependency additions (ChromaKit, colormath) |
| **Token-Semantic-Structure.md** | Color semantic resolution updated for OKLCH |
| **README.md** | If color system is described, update format references |

**Agent prompts**: If any agent prompt references specific color values or RGB patterns, update to OKLCH terminology.

**Release notes**: Major version. Breaking change section documenting: new output format, platform dependency requirements (ChromaKit for iOS, colormath for Android), blend percentage changes, required regeneration.
