# Blend System Architecture — OKLCH Color-Space Alignment + Platform Delivery + Drift Guard

**Date**: 2026-06-24
**Discovered during**: Spec 117 close-out — investigating the dormant `BlendUtilities.*` generator (N1) for the steering-doc ballot (Task 6.1 / P3)
**Reporters**: Claude (investigation), Peter (scoping — "answer this holistically, especially within the context of OKLCH")
**Severity**: Medium — interaction states render correctly, but are computed in the wrong color space relative to the OKLCH foundation (perceptual-consistency gap, not a runtime break)
**Type**: Color foundation / blend architecture — OKLCH migration completeness
**Primary owner**: Ada (Rosetta color foundation) — with Lina (component consumers) and Leonardo (cross-platform) consulted
**Status**: Open — **SOON (triaged 2026-06-25, Task-8 milestone)**: scheduled as its own Ada-led spec (Lina/Leonardo consulted) — important-not-urgent (foundational OKLCH-consistency gap; not a runtime break). Captured for a holistic review, explicitly out of scope for Spec 117. See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".

---

## Why this is one issue, not three

Three questions about the blend subsystem are entangled and should be decided together, not piecemeal. Deciding any one in isolation (e.g. "just delete the dead generator") forecloses options for the others.

### 1. The OKLCH color-space gap (the primary finding)

The token system migrated to OKLCH (Spec 112) for perceptually-uniform color. **The blend system did not follow.**

- `src/blend/OklchBlendCalculator.ts` — "perceptually uniform color blending," interpolates in OKLCH (L linear, C linear, H shortest-arc) with defined interaction-state thresholds (Hover ΔL 0.02–0.05 preserve chroma; Pressed ΔL 0.05–0.10; Focused ΔC ≥0.02; Disabled ΔC ≥0.03). **It is orphaned — no non-test production code imports it.**
- The in-use path (`ThemeAwareBlendUtilities.{web,ios,android}` → `ColorSpaceUtils`/`BlendCalculator`) computes blends in **hex → RGB → HSL**. The public `./blend` export exposes the RGB/HSL calculators, not the OKLCH one.
- **Consequence:** every hover/pressed/focus/disabled state color in the component library is blended in RGB/HSL on top of an OKLCH color foundation — not perceptually uniform, and not consistent with how the design system's colors are defined.

This is the **same shape as Spec 117's findings** (an OKLCH-correct path orphaned while a legacy path runs — cf. `getOklchMetadata` / rgba-in-token-index). It is an **incomplete OKLCH migration of the blend subsystem.**

### 2. Platform delivery: generate vs hand-author (Layer 2)

How each platform gets its blend utilities is unresolved:

- **Dormant generator** (`BlendUtilityGenerator` + `BlendValueGenerator`, never wired into the pipeline): would generate per-platform utility files from one TS source → cross-platform-consistent **by construction** (anti-drift). But it only emits low-level *stateless* functions (`darkerBlend(color, value)`), not the theme-aware layer components consume — which is likely why it was bypassed.
- **In-use** (`ThemeAwareBlendUtilities.{web.ts, ios.swift, android.kt}`): ~1,007 lines **hand-authored across three platform files**, theme-aware and ergonomic, but **drift-prone** — git shows independent per-platform maintenance (e.g. an iOS-only "fix iOS pressed state" commit with no matching web/android change). NOTE: drift *risk* is demonstrated (independent maintenance); an actual algorithmic divergence has not been diff-confirmed.

The cross-platform-consistency test (`BlendCrossPlatformConsistency.test.ts`) guards the shared **calculator math**, NOT the three hand-authored platform wrappers — so the drift surface is currently unguarded.

### 3. The dormant generator's code disposition (absorbs Spec 117 N1)

Spec 117 finding N1 (`.kiro/issues/2026-06-13-blendutilities-not-generated.md`) asked: delete the dormant `BlendUtilityGenerator`/`generateBlendUtilities` write path, or activate it? **That decision moves here** — it cannot be made sensibly before #1 and #2 are decided. If blend moves to OKLCH delivery (#1), Layer 2 (#2) is rebuilt anyway and the disposition is moot. (Spec 117 handles only the *doc-accuracy* half of N1 — ballot item P3 corrects the steering doc that wrongly lists `dist/BlendUtilities.*` as outputs. The *code* disposition is deferred here.)

## Why out of scope for Spec 117

Spec 117 is token-**index** generation integrity, and it is certified. Blend **tokens** (`blend100`–`blend500`, `blendHoverDarker`, etc.) flow through the normal pipeline and ARE correctly in the token-index + dist — unaffected. This issue is about the blend **utilities / calculation layer** (a different subsystem), and the OKLCH-blend question is a deliberate design decision with cross-platform cost — not a generation-integrity defect. N1 was explicitly deferred from 117's inventory.

## Recommended approach

A dedicated investigation (likely a small spec), Ada-led, deciding in order:
1. **Should interaction-state blends be computed in OKLCH** (wire `OklchBlendCalculator`, retire/relegate the RGB/HSL path) for perceptual consistency with the OKLCH foundation? Weigh the cross-platform cost (iOS/Android need OKLCH blend at runtime).
2. **Given that answer, how is Layer 2 delivered** — generated-from-source (anti-drift) or hand-authored-with-a-real-cross-platform-consistency-guard?
3. **Then** the generator code disposition (delete vs rebuild) falls out.

## Cross-References

- Spec 117 N1 (doc half handled by P3; code disposition moved here): `.kiro/issues/2026-06-13-blendutilities-not-generated.md`
- Pattern siblings (orphaned OKLCH path / silent legacy path): Spec 117 (`getOklchMetadata`, rgba-in-index), Spec 118 (config loader)
- Shadow OKLCH gap (related incomplete-OKLCH-migration finding): `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md`
- Public blend API consumed by components: `@3fn/core/blend` → `src/blend/index.ts` (the runtime utilities — note this export points at raw `.ts`, tracked to Spec 118 Increment 3b)
