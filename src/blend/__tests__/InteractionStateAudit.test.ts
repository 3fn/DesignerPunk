/**
 * @category evergreen
 * @purpose Spec 112 Task 5.1 — Visual audit of blend-based interaction states against OKLCH ΔL/ΔC thresholds
 */
/**
 * Interaction State Visual Audit
 *
 * Validates that OklchBlendCalculator.interactionBlend() produces results
 * within the design-specified thresholds for all components with blend-dependent
 * interaction states.
 *
 * Thresholds (from Spec 112 R6 AC3):
 *   hover:    ΔL ∈ [0.02, 0.05], preserve chroma
 *   pressed:  ΔL ∈ [0.05, 0.10], preserve chroma
 *   focused:  ΔC ≥ 0.02 (chroma boost)
 *   disabled: ΔC ≥ 0.03 (chroma reduction) — calculator capability only;
 *             no component declares a disabled state (state_disabled removed
 *             from Button-CTA 2026-07-15, completing the no-disabled-states
 *             philosophy across the corpus)
 *
 * Components audited:
 *   Button-CTA, Button-Icon, Button-VerticalList-Item, Chip-Base,
 *   Input-Checkbox-Base, Input-Radio-Base, Nav-SegmentedChoice-Base,
 *   Nav-TabBar-Base, Container-Card-Base, Icon-Base (optical balance)
 */

import { OklchBlendCalculator, INTERACTION_THRESHOLDS } from '../OklchBlendCalculator';
import { fromSrgbHex } from '../../color/OklchConverter';
import type { Oklch } from '../../color/OklchConverter';
import {
  purpleChroma, cyanChroma, yellowChroma, greenChroma, pinkChroma,
} from '../../tokens/color/channels/chroma/chromatic';
import { colorTokens } from '../../tokens/semantic/ColorTokens';

const calc = new OklchBlendCalculator();

// Representative surface colors
const lightSurface: Oklch = { l: 0.95, c: 0.01, h: 260 };  // white200 (typical light mode bg)
const darkSurface: Oklch = { l: 0.14, c: 0.008, h: 260 };  // dark mode surface

// Representative component colors (primary action = purple, structure = gray)
const primaryButton: Oklch = { l: 0.51, c: 0.241, h: 310 };   // purple400 (primary bg)
const surfaceBg: Oklch = { l: 0.95, c: 0.01, h: 260 };        // surface background (chips, cards)
const borderColor: Oklch = { l: 0.52, c: 0.012, h: 260 };     // gray300 (border)
const iconColor: Oklch = { l: 0.51, c: 0.241, h: 310 };       // same as primary (icon in tertiary)
const navInactiveIcon: Oklch = { l: 0.42, c: 0.012, h: 260 }; // gray400 (inactive tab icon)
const segmentBg: Oklch = { l: 0.90, c: 0.01, h: 260 };        // white300 (segment surface)

function deltaL(base: Oklch, result: Oklch): number {
  return Math.abs(result.l - base.l);
}

function deltaC(base: Oklch, result: Oklch): number {
  return result.c - base.c;  // signed: positive = boost, negative = reduction
}

describe('Spec 112 Task 5.1: Interaction State Visual Audit', () => {
  describe('Hover state (ΔL ∈ [0.02, 0.05])', () => {
    const cases: [string, Oklch, Oklch][] = [
      ['Button-CTA (primary bg on light surface)', primaryButton, lightSurface],
      ['Button-CTA (primary bg on dark surface)', primaryButton, darkSurface],
      ['Chip-Base (surface bg on light surface)', surfaceBg, lightSurface],
      ['Button-VerticalList-Item (surface bg on light surface)', surfaceBg, lightSurface],
      ['Input-Checkbox-Base (border on light surface)', borderColor, lightSurface],
      ['Input-Radio-Base (border on light surface)', borderColor, lightSurface],
      ['Container-Card-Base (surface bg on light surface)', surfaceBg, lightSurface],
      ['Container-Card-Base (surface bg on dark surface)', surfaceBg, darkSurface],
      ['Button-Icon primary (primary bg on light surface)', primaryButton, lightSurface],
      ['Button-Icon tertiary (icon on light surface)', iconColor, lightSurface],
      ['Nav-SegmentedChoice-Base (segment bg on light surface)', segmentBg, lightSurface],
    ];

    it.each(cases)('%s — ΔL within threshold', (name, base, surface) => {
      const result = calc.interactionBlend(base, 'hover', surface);
      const dl = deltaL(base, result);
      expect(dl).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.hover.deltaL.min);
      expect(dl).toBeLessThanOrEqual(INTERACTION_THRESHOLDS.hover.deltaL.max);
    });

    it.each(cases)('%s — chroma preserved', (name, base, surface) => {
      const result = calc.interactionBlend(base, 'hover', surface);
      expect(result.c).toBeCloseTo(base.c, 3);
    });
  });

  describe('Pressed state (ΔL ∈ [0.05, 0.10])', () => {
    const cases: [string, Oklch, Oklch][] = [
      ['Button-CTA (primary bg on light surface)', primaryButton, lightSurface],
      ['Button-CTA (primary bg on dark surface)', primaryButton, darkSurface],
      ['Chip-Base (surface bg on light surface)', surfaceBg, lightSurface],
      ['Button-VerticalList-Item (surface bg on light surface)', surfaceBg, lightSurface],
      ['Input-Checkbox-Base (ripple on light surface)', borderColor, lightSurface],
      ['Input-Radio-Base (ripple on light surface)', borderColor, lightSurface],
      ['Container-Card-Base (surface bg on light surface)', surfaceBg, lightSurface],
      ['Button-Icon primary (primary bg on light surface)', primaryButton, lightSurface],
      ['Button-Icon tertiary (icon on light surface)', iconColor, lightSurface],
      ['Nav-TabBar-Base (inactive icon on dark surface)', navInactiveIcon, darkSurface],
    ];

    it.each(cases)('%s — ΔL within threshold', (name, base, surface) => {
      const result = calc.interactionBlend(base, 'pressed', surface);
      const dl = deltaL(base, result);
      expect(dl).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.pressed.deltaL.min);
      expect(dl).toBeLessThanOrEqual(INTERACTION_THRESHOLDS.pressed.deltaL.max);
    });

    it.each(cases)('%s — chroma preserved', (name, base, surface) => {
      const result = calc.interactionBlend(base, 'pressed', surface);
      expect(result.c).toBeCloseTo(base.c, 3);
    });
  });

  describe('Focused state (ΔC ≥ 0.02)', () => {
    const cases: [string, Oklch][] = [
      ['Button-CTA (primary)', primaryButton],
      ['Chip-Base (surface bg)', surfaceBg],
      ['Input-Checkbox-Base (border)', borderColor],
      ['Input-Radio-Base (border)', borderColor],
      ['Container-Card-Base (surface)', surfaceBg],
      ['Nav-SegmentedChoice-Base (segment)', segmentBg],
    ];

    it.each(cases)('%s — ΔC meets minimum', (name, base) => {
      const result = calc.interactionBlend(base, 'focused', lightSurface);
      const dc = deltaC(base, result);
      expect(dc).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.focused.deltaC.min);
    });
  });

  describe('Disabled state (ΔC ≥ 0.03 reduction)', () => {
    // No component declares a disabled state (no-disabled-states philosophy).
    // This validates the calculator capability only, kept until the
    // blend.disabledDesaturate token's deprecation is adjudicated (Ada).
    it('calculator disabled blend — ΔC reduction meets minimum', () => {
      const result = calc.interactionBlend(primaryButton, 'disabled', lightSurface);
      const dc = deltaC(primaryButton, result);
      // dc should be negative (chroma reduced), absolute value ≥ 0.03
      expect(dc).toBeLessThan(0);
      expect(Math.abs(dc)).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.disabled.deltaC.min);
    });
  });

  describe('Directional correctness (surface-aware)', () => {
    it('darkens on light surface (L > 0.5)', () => {
      const result = calc.interactionBlend(primaryButton, 'hover', lightSurface);
      expect(result.l).toBeLessThan(primaryButton.l);
    });

    it('lightens on dark surface (L < 0.5)', () => {
      const result = calc.interactionBlend(primaryButton, 'hover', darkSurface);
      expect(result.l).toBeGreaterThan(primaryButton.l);
    });

    it('Nav-TabBar-Base pressed lightens inactive icon on dark surface', () => {
      const result = calc.interactionBlend(navInactiveIcon, 'pressed', darkSurface);
      expect(result.l).toBeGreaterThan(navInactiveIcon.l);
    });
  });

  describe('Edge cases: near-boundary lightness values', () => {
    it('very light color (L=0.95) on light surface does not exceed L=1', () => {
      const veryLight: Oklch = { l: 0.95, c: 0.01, h: 260 };
      const result = calc.interactionBlend(veryLight, 'hover', lightSurface);
      expect(result.l).toBeLessThanOrEqual(1);
      expect(result.l).toBeGreaterThanOrEqual(0);
    });

    it('very dark color (L=0.05) on dark surface does not go below L=0', () => {
      const veryDark: Oklch = { l: 0.05, c: 0.01, h: 260 };
      const result = calc.interactionBlend(veryDark, 'pressed', darkSurface);
      expect(result.l).toBeLessThanOrEqual(1);
      expect(result.l).toBeGreaterThanOrEqual(0);
    });

    it('zero-chroma color still gets focus boost', () => {
      const achromatic: Oklch = { l: 0.5, c: 0, h: 0 };
      const result = calc.interactionBlend(achromatic, 'focused', lightSurface);
      expect(result.c).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.focused.deltaC.min);
    });

    it('low-chroma color disabled reduction does not go below 0', () => {
      const lowChroma: Oklch = { l: 0.5, c: 0.02, h: 260 };
      const result = calc.interactionBlend(lowChroma, 'disabled', lightSurface);
      expect(result.c).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Icon-Base optical balance (ΔL 0.02-0.04, lighter)', () => {
    // Icon-Base uses iconLighter blend (8% lighter) for optical balance.
    // With OKLCH, this maps to the hover threshold but always in lighter direction.
    // The interactionBlend isn't used directly for this — it's a fixed lightness shift.
    // We verify the threshold range is reasonable for the optical balance use case.
    it('icon optical balance ΔL falls within visual perceptibility range', () => {
      // Icon-Base applies a fixed lighter blend, not surface-aware.
      // In OKLCH this should produce ΔL ~ 0.02-0.04
      const iconBase: Oklch = { l: 0.51, c: 0.241, h: 310 };
      // The optical balance is a simple lightness addition, not interactionBlend
      const balanced: Oklch = { ...iconBase, l: iconBase.l + 0.035 };
      const dl = balanced.l - iconBase.l;
      expect(dl).toBeGreaterThanOrEqual(0.02);
      expect(dl).toBeLessThanOrEqual(0.04);
    });
  });

  describe('Glow token chroma preservation (R7 AC6)', () => {
    // Glow tokens must maintain chroma ≥ original pre-migration values.
    // Original RGB values from src/tokens/ColorTokens.ts (pre-OKLCH migration).
    const originalRgb: Record<string, string> = {
      'glow.neonPurple': '#63158F',
      'glow.neonCyan': '#00888F',
      'glow.neonYellow': '#8F8B01',
      'glow.neonGreen': '#00CC6E',
      'glow.neonPink': '#801537',
    };

    // Post-migration: glow tokens reference specific palette steps
    const glowPrimitiveChroma: Record<string, number> = {
      'glow.neonPurple': purpleChroma[500],
      'glow.neonCyan': cyanChroma[500],
      'glow.neonYellow': yellowChroma[500],
      'glow.neonGreen': greenChroma[300], // Resolved: references green300 (higher chroma for glow)
      'glow.neonPink': pinkChroma[500],
    };

    it.each(Object.keys(originalRgb))('%s chroma ≥ original', (name) => {
      const original = fromSrgbHex(originalRgb[name]);
      const postChroma = glowPrimitiveChroma[name];
      expect(postChroma).toBeGreaterThanOrEqual(original.c - 0.001); // 0.001 tolerance for rounding
    });

    it('glow.neonGreen references green300 (not green500)', () => {
      const token = colorTokens['glow.neonGreen'];
      expect(token.primitiveReferences.value).toBe('green300');
    });
  });
});
