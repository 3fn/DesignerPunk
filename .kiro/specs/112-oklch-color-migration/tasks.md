# Implementation Plan: OKLCH Color Migration

**Date**: 2026-06-10
**Spec**: 112 - OKLCH Color Migration
**Status**: Implementation Planning
**Dependencies**: Spec 106 (complete)

---

## Implementation Plan

Implementation follows a dependency chain: mathematical foundation first (converter, validator), then source format migration, then generator updates, then blend rework + palette refinements, then component audit + contracts, then documentation and regression validation.

---

## Task List

- [x] 1. OKLCH Mathematical Foundation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - OklchConverter produces correct sRGB hex, relative luminance, WCAG contrast ratios, and ΔE₀₀
  - OklchValidator enforces all constraints (monotonicity, step distance, gamut, chroma ceiling, hue consistency)
  - Round-trip OKLCH→sRGB→OKLCH within ΔE₀₀ < 0.1
  - Gamut clamping produces nearest in-gamut color

  **Primary Artifacts:**
  - `src/color/OklchConverter.ts`
  - `src/color/OklchValidator.ts`
  - `src/color/__tests__/`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-1-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-1-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 1 Complete: OKLCH Mathematical Foundation"`

  - [x] 1.1 Implement OklchConverter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Define standardized `Oklch` interface (`{ l: number; c: number; h: number }`) used across all color modules
    - OKLCH → OKLab → linear sRGB → sRGB → hex conversion
    - sRGB relative luminance calculation from OKLCH
    - WCAG contrast ratio between two OKLCH colors
    - CIEDE2000 ΔE₀₀ computation
    - Gamut clamping: implement **CSS Color Level 4 §13.2** algorithm (binary search on chroma with ΔE₀₀ < 0.02 convergence threshold + JND local minimum check)
    - Comprehensive unit tests (known conversion pairs, edge cases, gamut boundary)
    - _Requirements: R5 AC1-5, R8 AC1-3_

  - [x] 1.2 Implement OklchValidator
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Lightness monotonicity check
    - Minimum step distance ≥ 0.08
    - sRGB gamut compliance per token
    - P3 gamut check (warning, not error)
    - Chroma monotonicity for steps 300→500
    - Hue consistency within family
    - Neutral chroma ceiling (C ≤ 0.035)
    - Neutral partition buffer gap validation (`validateNeutralPartition`: white→gray ≥0.08, gray→black ≥0.04)
    - Unit tests for each constraint + edge cases
    - _Requirements: R1 AC6, R2 AC4, R8 AC2-3_

---

- [x] 2. Channel-Primitive Source Format

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All chromatic families authored as channel primitives (hue + lightness[5] + chroma[5])
  - Neutral families follow partition: White 1.0→0.80, Gray 0.72→0.32, Black 0.28→0.00
  - neutralHue references primary color hue
  - All composed colors pass gamut validation
  - Palette refinements applied (teal, green, orange)
  - Semantic token mappings preserved (references updated, not broken)

  **Primary Artifacts:**
  - `src/tokens/color/channels/` (new directory structure)
  - `src/tokens/color/primitives/` (composed colors)
  - `src/tokens/semantic/ColorTokens.ts` (updated values)
  - `src/tokens/themes/` (OKLCH override values)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-2-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-2-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Channel-Primitive Source Format"`

  - [x] 2.1a Author channel primitives for chromatic families (mechanical conversion)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/tokens/color/channels/hues.ts` with all family hues
    - Create lightness and chroma files per family (pink, orange, yellow, green, cyan, teal, purple)
    - Convert current RGB values to OKLCH channel primitives (preserving appearance where not intentionally changed)
    - Validate all values against sRGB gamut using OklchValidator
    - Validate chroma monotonicity, lightness monotonicity, min step distance
    - _Requirements: R1 AC1-5_

  - [x] 2.1b Apply palette refinements (design tuning)
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    - Teal 300-500: redesign to maintain chroma (proposed: L=0.50/0.38/0.26, C=0.09/0.08/0.06)
    - Green 300-500: decompress (proposed: L=0.72/0.56/0.40, C=0.20/0.16/0.11)
    - Orange WCAG overrides: preserve hue at H=42° (adjust L/C only for contrast)
    - Validate all refined values against gamut boundaries
    - Verify WCAG contrast improvements (teal info.text ≥4.5:1, green success.text ≥4.5:1)
    - Document design rationale for each refinement
    - _Requirements: R7 AC1-5_

  - [x] 2.2 Author neutral partition (white, gray, black)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create white lightness/chroma (L: 1.0, 0.95, 0.90, 0.85, 0.80)
    - Create gray lightness/chroma (L: 0.72, 0.62, 0.52, 0.42, 0.32)
    - Create black lightness/chroma (L: 0.28, 0.21, 0.14, 0.07, 0.00)
    - Set neutralHue to reference primary hue (configurable)
    - Validate neutral chroma ceiling (C ≤ 0.035)
    - Validate buffer gaps (white→gray: 0.08, gray→black: 0.04)
    - _Requirements: R2 AC1-7_

  - [x] 2.3 Create composed color primitives and update semantic layer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Compose all primitive colors from channel references (static composition at module load time — no new pipeline stage)
    - Resolve `neutralHue` binding at composition time (primitives absorb the hue reference; overrides remain name-swaps — no SemanticOverrideResolver change needed)
    - Update pipeline interface types (SemanticValueResolver output type, GenerationOptions) to carry OKLCH data
    - Update `src/tokens/semantic/ColorTokens.ts` with OKLCH primitive references
    - Update theme override files (`dark/`, `wcag/`, `dark-wcag/`) with OKLCH values
    - Verify all semantic mappings resolve correctly through the pipeline
    - Verify glow tokens maintain chroma ≥ original
    - _Requirements: R1 AC2, R7 AC5-6, R11 AC2_

---

- [x] 3. Generator Updates

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Web output: oklch() composed colors + channel custom properties
  - iOS output: Color.oklch(L, C, H) via ChromaKit
  - Android output: Oklch(L, C, H).toComposeColor()
  - DTCG/Figma: valid sRGB hex from OKLCH source
  - Token-index: OKLCH channel metadata on composed tokens
  - All generators produce valid, parseable output

  **Primary Artifacts:**
  - `src/generators/WebFormatGenerator.ts` (modified)
  - `src/generators/iOSFormatGenerator.ts` (modified)
  - `src/generators/AndroidFormatGenerator.ts` (modified)
  - `src/generators/DTCGFormatGenerator.ts` (modified)
  - `src/generators/FigmaFormatGenerator.ts` (modified)
  - `src/generators/generateTokenIndex.ts` (modified — channel metadata)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-3-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-3-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Generator Updates"`

  - [x] 3.1 Update WebFormatGenerator for OKLCH + channels
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Emit composed colors as `oklch(L C H)` (not rgba)
    - Emit channel primitives as separate custom properties (`--pink-hue`, `--pink-l300`, `--pink-c300`)
    - Emit neutralHue as `--neutral-hue`
    - Verify relative color syntax works: `oklch(from var(--pink-300) l c h / alpha)`
    - Update tests
    - _Requirements: R3 AC1-4_

  - [x] 3.2 Update iOS and Android generators
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - iOS: `Color.oklch(L, C, H)` via ChromaKit import
    - Android: `Oklch(L, C, H).toComposeColor()` via colormath import
    - Channel primitives are source-only (not emitted to native output)
    - Update init scaffolding to include ChromaKit/colormath dependencies
    - Update tests
    - _Requirements: R4 AC1-4_

  - [x] 3.3 Update DTCG/Figma generators and token-index
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - DTCG: convert OKLCH → sRGB hex via OklchConverter
    - Figma: same conversion
    - Gamut-exceeded values: clamp using **CSS Color Level 4 §13.2 gamut mapping algorithm** (binary search on chroma in OKLCH with ΔE₀₀ < 0.02 convergence) — matches browser behavior, single algorithm for all gamut clamping needs
    - Token-index: add `oklch: { l, c, h }` metadata to composed color entries
    - Token-index: channel primitives NOT added as top-level entries
    - Update tests
    - _Requirements: R5 AC1-5, R9 AC1-4_
    - _Decision: CSS L4 gamut mapping chosen over simple chroma reduction for consistency with browser rendering and to handle P3→sRGB clamping correctly (see design-outline feedback, 2026-06-10)_

---

- [x] 4. Blend Utility Rework

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Blend utilities interpolate in OKLCH space
  - Interaction state blends meet threshold targets (hover ΔL 0.02-0.05, pressed 0.05-0.10, etc.)
  - CSS color-mix migrated from srgb to oklch in affected components
  - All blend-related tests updated and passing
  - Platform blend utilities (web .ts, iOS .swift, Android .kt) all use OKLCH

  **Primary Artifacts:**
  - `src/blend/BlendCalculator.ts` (reworked)
  - `src/blend/ThemeAwareBlendUtilities.web.ts` (reworked)
  - `src/blend/ThemeAwareBlendUtilities.ios.swift` (reworked)
  - `src/blend/ThemeAwareBlendUtilities.android.kt` (reworked)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-4-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-4-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Blend Utility Rework"`

  - [x] 4.1 Rework BlendCalculator for OKLCH
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    - Rewrite blend interpolation in OKLCH space (L/C linear interpolation, H shortest-arc)
    - Tune interaction state percentages to meet ΔL/ΔC thresholds:
      - Hover: ΔL 0.02–0.05
      - Pressed: ΔL 0.05–0.10
      - Focused: ΔC ≥0.02
      - Disabled: ΔC ≥0.03 (reduction)
      - Icon optical balance (iconLighter): ΔL 0.02–0.04, lighter direction
    - Implement `interactionBlend()` with state-specific behavior
    - Write comprehensive tests verifying threshold compliance
    - _Requirements: R6 AC1-3_

  **Note**: Task 3 (generators) can start after Task 2.1a completes (one sample family sufficient). Task 3 and 2.1b can proceed in parallel.

  - [x] 4.2 Update platform blend utilities and CSS color-mix
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Lina
    - Web: update ThemeAwareBlendUtilities.web.ts for OKLCH
    - iOS: update ThemeAwareBlendUtilities.ios.swift for OKLCH (ChromaKit blend API)
    - Android: update ThemeAwareBlendUtilities.android.kt for OKLCH (colormath blend)
    - Migrate `color-mix(in srgb)` → `color-mix(in oklch)` in Nav-TabBar-Base, Avatar-Base
    - iOS/Android blends pre-resolved at build time
    - Update all blend-related tests
    - _Requirements: R6 AC6-7_

---

- [x] 5. Component Visual Audit + Contract Updates

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All 13 components with interaction states audited against blend thresholds
  - Behavioral contracts updated with OKLCH-tuned blend percentages
  - Glow tokens verified for chroma preservation
  - No component has invisible/imperceptible interaction state transitions
  - Platform implementations (web/iOS/Android) produce visually correct results

  **Primary Artifacts:**
  - Updated `contracts.yaml` files for affected components
  - Visual audit report (pass/fail per component per state)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-5-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-5-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Component Visual Audit + Contract Updates"`

  - [x] 5.1 Visual audit of interaction states
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Audit all 13 components with blend-based interaction states
    - Verify hover, pressed, focused, disabled meet ΔL/ΔC thresholds
    - Verify glow tokens maintain chroma ≥ original (green glow reassessment)
    - Document pass/fail per component per state
    - Flag any component requiring blend percentage adjustment
    - _Requirements: R6 AC3, R7 AC6_

  - [x] 5.2 Update behavioral contracts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Update blend percentages in contracts.yaml for affected components
    - Move toward intent-based descriptions where appropriate
    - Verify OKLCH-tuned percentages produce correct results on all platforms
    - Update contract tests to validate new thresholds
    - _Requirements: R6 AC4-5_

---

- [x] 6. WCAG Validation + Regression Testing

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All semantic text/background pairs pass WCAG AA (4.5:1)
  - Teal info.text contrast improved from ~1.5:1 to ≥4.5:1
  - Green success.text contrast improved from ~1.3:1 to ≥4.5:1
  - Regression: all non-intentionally-changed colors within ΔE₀₀ < 1 of originals
  - Consumer contract test (Spec 106) passes with new color output

  **Primary Artifacts:**
  - `src/validators/OklchWcagValidator.ts`
  - `src/__tests__/color-regression.test.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-6-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-6-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 6 Complete: WCAG Validation + Regression Testing"`

  - [x] 6.1 WCAG contrast validation for all semantic pairs
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Validate all text/background semantic pairs against 4.5:1 AA threshold
    - Validate refined palette tokens (teal, green, orange) specifically
    - Validate HC theme overrides produce ≥7:1 where required
    - _Requirements: R7 AC5, R8 AC1, R8 AC4_

  - [x] 6.2 Regression validation (ΔE₀₀)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Store pre-migration sRGB values as reference
    - Convert post-migration OKLCH values to sRGB
    - Compute ΔE₀₀ for each color pair
    - Assert < 1 for non-intentionally-changed colors
    - Document intentional changes (teal, green, orange, neutrals) with their ΔE₀₀ values
    - Run Spec 106 consumer contract test — must pass
    - _Requirements: R11 AC3-4_

---

- [x] 7. Documentation + Migration Support

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Token-Family-Color.md fully documents OKLCH system
  - Product-Token-Governance.md tolerance updated to ΔE₀₀
  - Integration Guide documents ChromaKit/colormath dependencies
  - Product token migration guidance documented
  - Release notes complete with palette refinements called out

  **Primary Artifacts:**
  - `.kiro/steering/Token-Family-Color.md` (rewritten)
  - `.kiro/steering/Product-Token-Governance.md` (updated)
  - `.kiro/steering/DesignerPunk-Integration-Guide.md` (updated)
  - `docs/releases/RELEASE-NOTES-<version>.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/112-oklch-color-migration/completion/task-7-completion.md`
  - Summary: `docs/specs/112-oklch-color-migration/task-7-summary.md`

  **Post-Completion:**
  - Commit: `./.kiro/hooks/commit-task.sh "Task 7 Complete: Documentation + Migration Support"`

  - [x] 7.1 Rewrite Token-Family-Color.md
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Thurgood
    - Document channel-primitive model (hue, lightness, chroma per family)
    - Document neutral partition (ranges, buffer gaps, neutralHue)
    - Document hue arithmetic (complementary, analogous — designed-in)
    - Document per-family gamut capacity (Drenched strategy guidance)
    - Document validator constraints
    - _Requirements: R10 AC1_

  - [x] 7.2 Update governance and integration docs
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Product-Token-Governance.md: color tolerance → ΔE₀₀ threshold
    - Integration Guide: ChromaKit/colormath dependency documentation
    - Rosetta-System-Architecture.md: OKLCH source format in pipeline
    - Product token migration guidance (converting `value:` RGB colors to OKLCH)
    - _Requirements: R10 AC2-5, R11 AC5_

  - [x] 7.3 Release notes
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Major version release notes
    - Document: new output format, platform dependencies, palette refinements, blend changes
    - Call out intentional visual changes (teal, green, orange, neutral restructure)
    - Document migration path (install → sync → generate)
    - _Requirements: R10 AC6_
