/**
 * @category evergreen
 * @purpose Verify all composed color primitives resolve correctly and pass gamut check (Spec 112 R1 AC2)
 */

import { allComposedColors, composedColorMap } from '../color';
import { isInSrgbGamut } from '../../color/OklchConverter';

describe('Composed color primitives (Spec 112 R1 AC2)', () => {
  it('produces 50 total composed colors (7 chromatic × 5 + 3 neutral × 5)', () => {
    expect(allComposedColors).toHaveLength(50);
  });

  it('all colors have resolved L, C, H values', () => {
    for (const color of allComposedColors) {
      expect(color.resolved.l).toBeGreaterThanOrEqual(0);
      expect(color.resolved.l).toBeLessThanOrEqual(1);
      expect(color.resolved.c).toBeGreaterThanOrEqual(0);
      expect(color.resolved.h).toBeGreaterThanOrEqual(0);
      expect(color.resolved.h).toBeLessThan(360);
    }
  });

  it('all colors have channel references', () => {
    for (const color of allComposedColors) {
      expect(color.channels.hue).toBeTruthy();
      expect(color.channels.lightness).toBeTruthy();
      expect(color.channels.chroma).toBeTruthy();
    }
  });

  it('all neutral colors are in sRGB gamut', () => {
    const neutrals = allComposedColors.filter(c => ['white', 'gray', 'black'].includes(c.family));
    for (const color of neutrals) {
      const { l, c, h } = color.resolved;
      expect(isInSrgbGamut(l, c, h)).toBe(true);
    }
  });

  it('composedColorMap provides lookup by name', () => {
    expect(composedColorMap.get('pink300')).toBeDefined();
    expect(composedColorMap.get('gray500')).toBeDefined();
    expect(composedColorMap.get('white100')).toBeDefined();
    expect(composedColorMap.get('nonexistent')).toBeUndefined();
  });

  it('chromatic families have 5 steps each (100-500)', () => {
    const families = ['pink', 'orange', 'yellow', 'green', 'cyan', 'teal', 'purple'];
    for (const family of families) {
      const colors = allComposedColors.filter(c => c.family === family);
      expect(colors).toHaveLength(5);
      expect(colors.map(c => c.step).sort((a, b) => a - b)).toEqual([100, 200, 300, 400, 500]);
    }
  });

  it('neutral families have 5 steps each (100-500)', () => {
    for (const family of ['white', 'gray', 'black']) {
      const colors = allComposedColors.filter(c => c.family === family);
      expect(colors).toHaveLength(5);
    }
  });
});
