/**
 * @category evergreen
 * @purpose Verify OklchBlendCalculator threshold compliance for interaction states (Spec 112 R6)
 */

import { OklchBlendCalculator, INTERACTION_THRESHOLDS } from '../OklchBlendCalculator';
import type { Oklch } from '../../color/OklchConverter';

describe('OklchBlendCalculator (Spec 112 R6)', () => {
  let calc: OklchBlendCalculator;

  beforeEach(() => {
    calc = new OklchBlendCalculator();
  });

  describe('blend', () => {
    it('returns base at ratio 0', () => {
      const base: Oklch = { l: 0.5, c: 0.15, h: 200 };
      const overlay: Oklch = { l: 0.8, c: 0.05, h: 100 };
      const result = calc.blend(base, overlay, 0);
      expect(result.l).toBeCloseTo(0.5);
      expect(result.c).toBeCloseTo(0.15);
    });

    it('returns overlay at ratio 1', () => {
      const base: Oklch = { l: 0.5, c: 0.15, h: 200 };
      const overlay: Oklch = { l: 0.8, c: 0.05, h: 100 };
      const result = calc.blend(base, overlay, 1);
      expect(result.l).toBeCloseTo(0.8);
      expect(result.c).toBeCloseTo(0.05);
    });

    it('interpolates linearly at ratio 0.5', () => {
      const base: Oklch = { l: 0.4, c: 0.10, h: 0 };
      const overlay: Oklch = { l: 0.8, c: 0.20, h: 0 };
      const result = calc.blend(base, overlay, 0.5);
      expect(result.l).toBeCloseTo(0.6);
      expect(result.c).toBeCloseTo(0.15);
    });

    it('uses shortest-arc hue interpolation', () => {
      const base: Oklch = { l: 0.5, c: 0.1, h: 350 };
      const overlay: Oklch = { l: 0.5, c: 0.1, h: 10 };
      const result = calc.blend(base, overlay, 0.5);
      // Shortest arc: 350 → 10 crosses 0, midpoint should be 0
      expect(result.h).toBeCloseTo(0, 0);
    });
  });

  describe('interactionBlend — hover', () => {
    it('produces ΔL within 0.02-0.05 on light surface', () => {
      const base: Oklch = { l: 0.6, c: 0.2, h: 10 };
      const lightSurface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'hover', lightSurface);
      const deltaL = Math.abs(result.l - base.l);
      expect(deltaL).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.hover.deltaL.min);
      expect(deltaL).toBeLessThanOrEqual(INTERACTION_THRESHOLDS.hover.deltaL.max);
    });

    it('darkens on light surface', () => {
      const base: Oklch = { l: 0.6, c: 0.2, h: 10 };
      const lightSurface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'hover', lightSurface);
      expect(result.l).toBeLessThan(base.l);
    });

    it('lightens on dark surface', () => {
      const base: Oklch = { l: 0.4, c: 0.15, h: 200 };
      const darkSurface: Oklch = { l: 0.15, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'hover', darkSurface);
      expect(result.l).toBeGreaterThan(base.l);
    });

    it('preserves chroma', () => {
      const base: Oklch = { l: 0.6, c: 0.2, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'hover', surface);
      expect(result.c).toBe(base.c);
    });
  });

  describe('interactionBlend — pressed', () => {
    it('produces ΔL within 0.05-0.10', () => {
      const base: Oklch = { l: 0.6, c: 0.2, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'pressed', surface);
      const deltaL = Math.abs(result.l - base.l);
      expect(deltaL).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.pressed.deltaL.min);
      expect(deltaL).toBeLessThanOrEqual(INTERACTION_THRESHOLDS.pressed.deltaL.max);
    });

    it('same direction as hover but further', () => {
      const base: Oklch = { l: 0.6, c: 0.2, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const hover = calc.interactionBlend(base, 'hover', surface);
      const pressed = calc.interactionBlend(base, 'pressed', surface);
      expect(Math.abs(pressed.l - base.l)).toBeGreaterThan(Math.abs(hover.l - base.l));
    });
  });

  describe('interactionBlend — focused', () => {
    it('boosts chroma by ≥0.02', () => {
      const base: Oklch = { l: 0.6, c: 0.15, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'focused', surface);
      const deltaC = result.c - base.c;
      expect(deltaC).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.focused.deltaC.min);
    });

    it('preserves lightness', () => {
      const base: Oklch = { l: 0.6, c: 0.15, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'focused', surface);
      expect(result.l).toBe(base.l);
    });
  });

  describe('interactionBlend — disabled', () => {
    it('reduces chroma by ≥0.03', () => {
      const base: Oklch = { l: 0.6, c: 0.15, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'disabled', surface);
      const deltaC = base.c - result.c;
      expect(deltaC).toBeGreaterThanOrEqual(INTERACTION_THRESHOLDS.disabled.deltaC.min);
    });

    it('does not produce negative chroma', () => {
      const base: Oklch = { l: 0.6, c: 0.02, h: 10 };
      const surface: Oklch = { l: 0.95, c: 0, h: 0 };
      const result = calc.interactionBlend(base, 'disabled', surface);
      expect(result.c).toBeGreaterThanOrEqual(0);
    });
  });
});
