/**
 * OKLCH Blend Calculator — Perceptually uniform color blending.
 *
 * Interpolates in OKLCH space:
 * - L (lightness): linear interpolation
 * - C (chroma): linear interpolation
 * - H (hue): shortest-arc interpolation
 *
 * Interaction state blends produce results within testable thresholds:
 * - Hover:    ΔL 0.02–0.05, preserve chroma
 * - Pressed:  ΔL 0.05–0.10, preserve chroma
 * - Focused:  ΔC ≥0.02 (chroma boost)
 * - Disabled: ΔC ≥0.03 (chroma reduction)
 *
 * @see Spec 112 R6 AC1-3
 */

import type { Oklch } from '../color/OklchConverter';

// 'disabled' is deprecated calculator capability: DesignerPunk supports no disabled
// states (adjudicated 2026-07-15) — no component may use it; removal at next major.
export type InteractionState = 'hover' | 'pressed' | 'focused' | 'disabled';

/** Thresholds for interaction state blends. */
export const INTERACTION_THRESHOLDS = {
  hover:    { deltaL: { min: 0.02, max: 0.05 }, deltaC: 0 },
  pressed:  { deltaL: { min: 0.05, max: 0.10 }, deltaC: 0 },
  focused:  { deltaL: 0, deltaC: { min: 0.02 } },
  // deprecated 2026-07-15 (no-disabled-states philosophy) — removal at next major
  disabled: { deltaL: 0, deltaC: { min: 0.03 } },
} as const;

export class OklchBlendCalculator {
  /**
   * Blend two OKLCH colors at a given ratio.
   * Ratio 0 = base, ratio 1 = overlay.
   */
  blend(base: Oklch, overlay: Oklch, ratio: number): Oklch {
    const r = Math.max(0, Math.min(1, ratio));
    return {
      l: base.l + (overlay.l - base.l) * r,
      c: base.c + (overlay.c - base.c) * r,
      h: this.interpolateHue(base.h, overlay.h, r),
    };
  }

  /**
   * Compute interaction state blend.
   * Surface determines direction: lighter surface → darken for hover/pressed; darker surface → lighten.
   */
  interactionBlend(base: Oklch, state: InteractionState, surface: Oklch): Oklch {
    switch (state) {
      case 'hover':
        return this.lightnessShift(base, surface, 0.035);
      case 'pressed':
        return this.lightnessShift(base, surface, 0.075);
      case 'focused':
        return { ...base, c: base.c + 0.025 };
      case 'disabled':
        return { ...base, c: Math.max(0, base.c - 0.04) };
    }
  }

  /** Shift lightness toward or away from surface. */
  private lightnessShift(base: Oklch, surface: Oklch, amount: number): Oklch {
    // If base is lighter than surface, darken. If darker, lighten.
    const direction = base.l > surface.l ? -1 : 1;
    // On very light surfaces (cards, white bg), darken the element
    // On very dark surfaces (dark mode), lighten the element
    const effectiveDirection = surface.l > 0.5 ? -1 : 1;
    const shift = effectiveDirection * amount;
    return { ...base, l: Math.max(0, Math.min(1, base.l + shift)) };
  }

  /** Shortest-arc hue interpolation. */
  private interpolateHue(h1: number, h2: number, ratio: number): number {
    let diff = h2 - h1;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    return ((h1 + diff * ratio) % 360 + 360) % 360;
  }
}
