/**
 * @category evergreen
 * @purpose Verify OKLCH→hex export and token-index metadata (Spec 112 R5, R9)
 */

import { oklchToExportHex, formatDtcgColorToken } from '../oklch/OklchExportUtils';
import { getOklchMetadata } from '../oklch/OklchTokenIndexMetadata';
import type { ComposedColor } from '../../tokens/color/primitives/chromatic';

describe('OKLCH Export Utils (Spec 112 R5)', () => {
  describe('oklchToExportHex', () => {
    it('converts in-gamut OKLCH to hex without clamping', () => {
      const result = oklchToExportHex(0.5, 0.05, 200);
      expect(result.hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(result.gamutClamped).toBe(false);
    });

    it('clamps out-of-gamut OKLCH and flags it', () => {
      const result = oklchToExportHex(0.5, 0.4, 150);
      expect(result.hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(result.gamutClamped).toBe(true);
    });

    it('is deterministic (same input → same output)', () => {
      const a = oklchToExportHex(0.65, 0.242, 10);
      const b = oklchToExportHex(0.65, 0.242, 10);
      expect(a.hex).toBe(b.hex);
    });

    it('preserves original OKLCH values in result', () => {
      const result = oklchToExportHex(0.7, 0.15, 300);
      expect(result.original).toEqual({ l: 0.7, c: 0.15, h: 300 });
    });
  });

  describe('formatDtcgColorToken', () => {
    it('produces DTCG-compliant structure', () => {
      const token = formatDtcgColorToken('pink300', 0.65, 0.242, 10);
      expect(token.$value).toMatch(/^#[0-9a-f]{6}$/);
      expect(token.$type).toBe('color');
    });

    it('includes OKLCH source in extensions', () => {
      const token = formatDtcgColorToken('pink300', 0.65, 0.242, 10);
      expect(token.$extensions).toBeDefined();
      expect(token.$extensions!['com.designerpunk'].oklch).toEqual({ l: 0.65, c: 0.242, h: 10 });
    });

    it('flags gamut-clamped tokens', () => {
      const token = formatDtcgColorToken('outOfGamut', 0.5, 0.4, 150);
      expect(token.$extensions!['com.designerpunk'].gamutClamped).toBe(true);
    });
  });
});

describe('OKLCH Token-Index Metadata (Spec 112 R9)', () => {
  it('produces oklch channel metadata for a composed color', () => {
    const color: ComposedColor = {
      name: 'pink300',
      family: 'pink',
      step: 300,
      channels: { hue: 'pinkHue', lightness: 'pinkLightness300', chroma: 'pinkChroma300' },
      resolved: { l: 0.65, c: 0.242, h: 10 },
    };
    const meta = getOklchMetadata(color);
    expect(meta.oklch).toEqual({ l: 0.65, c: 0.242, h: 10 });
    expect(meta.channels.hue).toBe('pinkHue');
    expect(meta.channels.lightness).toBe('pinkLightness300');
    expect(meta.channels.chroma).toBe('pinkChroma300');
  });
});
