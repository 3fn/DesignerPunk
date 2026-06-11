/**
 * @category evergreen
 * @purpose Verify OklchConverter: conversion accuracy, WCAG, ΔE₀₀, gamut mapping (Spec 112 R5, R8)
 */

import {
  toSrgbHex,
  fromSrgbHex,
  toRelativeLuminance,
  contrastRatio,
  deltaE00,
  clampToGamut,
  isInSrgbGamut,
  Oklch,
} from '../OklchConverter';

describe('OklchConverter', () => {
  describe('toSrgbHex', () => {
    it('converts black correctly', () => {
      expect(toSrgbHex(0, 0, 0)).toBe('#000000');
    });

    it('converts white correctly', () => {
      expect(toSrgbHex(1, 0, 0)).toBe('#ffffff');
    });

    it('converts a known red-ish color', () => {
      // oklch(0.63 0.26 29) ≈ #ff0000-ish (saturated red-orange)
      const hex = toSrgbHex(0.63, 0.26, 29);
      // Should be a red/orange hex — verify it's in the right ballpark
      const r = parseInt(hex.slice(1, 3), 16);
      expect(r).toBeGreaterThan(200);
    });

    it('converts a known blue', () => {
      // oklch(0.45 0.20 265) ≈ a medium blue
      const hex = toSrgbHex(0.45, 0.20, 265);
      const b = parseInt(hex.slice(5, 7), 16);
      expect(b).toBeGreaterThan(100);
    });

    it('converts mid-gray (achromatic)', () => {
      const hex = toSrgbHex(0.5, 0, 0);
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      // Gray: R ≈ G ≈ B, around 50% perceived = ~109 sRGB
      expect(Math.abs(r - g)).toBeLessThan(2);
      expect(Math.abs(g - b)).toBeLessThan(2);
    });

    it('clamps out-of-gamut values to valid hex', () => {
      // Very high chroma — likely out of gamut
      const hex = toSrgbHex(0.7, 0.4, 150);
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
      // All channels should be 0-255 (clamped)
      const r = parseInt(hex.slice(1, 3), 16);
      expect(r).toBeGreaterThanOrEqual(0);
      expect(r).toBeLessThanOrEqual(255);
    });
  });

  describe('fromSrgbHex', () => {
    it('round-trips for in-gamut colors', () => {
      const testColors: Oklch[] = [
        { l: 0.5, c: 0.1, h: 30 },
        { l: 0.7, c: 0.15, h: 200 },
        { l: 0.3, c: 0.08, h: 310 },
      ];
      for (const color of testColors) {
        const hex = toSrgbHex(color.l, color.c, color.h);
        const result = fromSrgbHex(hex);
        // 8-bit quantization introduces errors up to ~0.03 in chroma
        expect(Math.abs(result.l - color.l)).toBeLessThan(0.03);
        expect(Math.abs(result.c - color.c)).toBeLessThan(0.04);
      }
    });

    it('parses pure red', () => {
      const result = fromSrgbHex('#ff0000');
      expect(result.l).toBeGreaterThan(0.5);
      expect(result.c).toBeGreaterThan(0.2);
      expect(result.h).toBeLessThan(40); // Red hue
    });

    it('parses achromatic correctly', () => {
      const gray = fromSrgbHex('#808080');
      expect(gray.c).toBeLessThan(0.005);
    });
  });

  describe('toRelativeLuminance', () => {
    it('returns 0 for black', () => {
      expect(toRelativeLuminance(0, 0, 0)).toBeCloseTo(0, 3);
    });

    it('returns 1 for white', () => {
      expect(toRelativeLuminance(1, 0, 0)).toBeCloseTo(1, 3);
    });

    it('returns ~0.2126 for pure red', () => {
      // Pure sRGB red (1,0,0) → luminance = 0.2126
      const redOklch = fromSrgbHex('#ff0000');
      const lum = toRelativeLuminance(redOklch.l, redOklch.c, redOklch.h);
      expect(lum).toBeCloseTo(0.2126, 2);
    });

    it('mid-gray has luminance ~0.18-0.22', () => {
      const lum = toRelativeLuminance(0.5, 0, 0);
      expect(lum).toBeGreaterThan(0.1);
      expect(lum).toBeLessThan(0.3);
    });
  });

  describe('contrastRatio', () => {
    it('black vs white = 21:1', () => {
      const ratio = contrastRatio({ l: 0, c: 0, h: 0 }, { l: 1, c: 0, h: 0 });
      expect(ratio).toBeCloseTo(21, 0);
    });

    it('same color = 1:1', () => {
      const color: Oklch = { l: 0.5, c: 0.1, h: 200 };
      expect(contrastRatio(color, color)).toBeCloseTo(1, 1);
    });

    it('dark text on white background passes WCAG AA', () => {
      const darkText: Oklch = { l: 0.3, c: 0, h: 0 };
      const whiteBg: Oklch = { l: 1, c: 0, h: 0 };
      expect(contrastRatio(darkText, whiteBg)).toBeGreaterThan(4.5);
    });

    it('is symmetric', () => {
      const a: Oklch = { l: 0.7, c: 0.15, h: 100 };
      const b: Oklch = { l: 0.3, c: 0.1, h: 250 };
      expect(contrastRatio(a, b)).toBeCloseTo(contrastRatio(b, a), 5);
    });
  });

  describe('deltaE00', () => {
    it('identical colors have ΔE₀₀ = 0', () => {
      const color: Oklch = { l: 0.5, c: 0.15, h: 200 };
      expect(deltaE00(color, color)).toBeCloseTo(0, 3);
    });

    it('very similar colors have small ΔE₀₀', () => {
      const a: Oklch = { l: 0.50, c: 0.15, h: 200 };
      const b: Oklch = { l: 0.51, c: 0.15, h: 200 };
      expect(deltaE00(a, b)).toBeLessThan(2);
    });

    it('very different colors have large ΔE₀₀', () => {
      const a: Oklch = { l: 0.9, c: 0.05, h: 100 };
      const b: Oklch = { l: 0.2, c: 0.20, h: 300 };
      expect(deltaE00(a, b)).toBeGreaterThan(30);
    });

    it('black vs white has large ΔE₀₀', () => {
      const black: Oklch = { l: 0, c: 0, h: 0 };
      const white: Oklch = { l: 1, c: 0, h: 0 };
      expect(deltaE00(black, white)).toBeGreaterThan(50);
    });
  });

  describe('isInSrgbGamut', () => {
    it('black is in gamut', () => {
      expect(isInSrgbGamut(0, 0, 0)).toBe(true);
    });

    it('white is in gamut', () => {
      expect(isInSrgbGamut(1, 0, 0)).toBe(true);
    });

    it('moderate chroma is in gamut', () => {
      expect(isInSrgbGamut(0.6, 0.12, 150)).toBe(true);
    });

    it('extreme chroma at mid-lightness is out of gamut', () => {
      expect(isInSrgbGamut(0.5, 0.4, 150)).toBe(false);
    });

    it('achromatic colors are always in gamut', () => {
      for (let l = 0; l <= 1; l += 0.1) {
        expect(isInSrgbGamut(l, 0, 0)).toBe(true);
      }
    });
  });

  describe('clampToGamut', () => {
    it('returns input unchanged when already in gamut', () => {
      const result = clampToGamut(0.5, 0.05, 200);
      expect(result.l).toBeCloseTo(0.5, 3);
      expect(result.c).toBeCloseTo(0.05, 3);
      expect(result.h).toBeCloseTo(200, 0);
    });

    it('reduces chroma for out-of-gamut colors', () => {
      const result = clampToGamut(0.5, 0.4, 150);
      expect(result.c).toBeLessThan(0.4);
      expect(isInSrgbGamut(result.l, result.c, result.h)).toBe(true);
    });

    it('preserves hue approximately', () => {
      const result = clampToGamut(0.7, 0.35, 120);
      // Hue should be close to original (CSS L4 may shift slightly due to clipping)
      expect(Math.abs(result.h - 120)).toBeLessThan(10);
    });

    it('handles L=1 (white)', () => {
      const result = clampToGamut(1, 0.1, 200);
      expect(result.l).toBe(1);
      expect(result.c).toBe(0);
    });

    it('handles L=0 (black)', () => {
      const result = clampToGamut(0, 0.1, 200);
      expect(result.l).toBe(0);
      expect(result.c).toBe(0);
    });

    it('clamped color is in sRGB gamut', () => {
      const outOfGamut: Oklch = { l: 0.6, c: 0.35, h: 150 };
      const clamped = clampToGamut(outOfGamut.l, outOfGamut.c, outOfGamut.h);
      expect(isInSrgbGamut(clamped.l, clamped.c, clamped.h)).toBe(true);
    });

    it('produces valid hex output for clamped colors', () => {
      const clamped = clampToGamut(0.6, 0.35, 150);
      const hex = toSrgbHex(clamped.l, clamped.c, clamped.h);
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    });
  });
});
