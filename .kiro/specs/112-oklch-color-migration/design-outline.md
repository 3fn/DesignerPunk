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

### Decision 1: Source Format

**Options:**
- A) Store as OKLCH string: `'oklch(0.75 0.15 280)'`
- B) Store as structured object: `{ l: 0.75, c: 0.15, h: 280 }`
- C) Store as tuple: `[0.75, 0.15, 280]`

**Leaning:** B — structured object. Enables validation of individual channels (L: 0-1, C: 0-0.4ish, H: 0-360). Generators format to platform-specific strings. Parser/formatter logic is clean.

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
