/**
 * @category evergreen
 * @purpose Verify WebFormatGenerator OKLCH output (Spec 112 R3)
 */

import { WebFormatGenerator } from '../../providers/WebFormatGenerator';

describe('WebFormatGenerator OKLCH output (Spec 112 R3)', () => {
  let gen: WebFormatGenerator;

  beforeEach(() => {
    gen = new WebFormatGenerator();
  });

  describe('formatOklchColor', () => {
    it('produces oklch() CSS custom property', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('oklch(0.65 0.242 10)');
    });

    it('uses correct token name format (--kebab-case)', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('--pink-300:');
    });

    it('handles neutral colors', () => {
      const result = gen.formatOklchColor('gray500', 0.32, 0.015, 260);
      expect(result).toContain('--gray-500:');
      expect(result).toContain('oklch(0.32 0.015 260)');
    });

    it('handles zero chroma (achromatic)', () => {
      const result = gen.formatOklchColor('white100', 1, 0, 260);
      expect(result).toContain('oklch(1 0 260)');
    });
  });

  describe('formatOklchChannels', () => {
    it('produces hue custom property', () => {
      const lines = gen.formatOklchChannels('pink', 10, { 300: 0.65 }, { 300: 0.242 });
      expect(lines[0]).toBe('  --pink-hue: 10;');
    });

    it('produces lightness custom properties per step', () => {
      const lines = gen.formatOklchChannels('pink', 10, { 100: 0.92, 200: 0.76, 300: 0.65 }, {});
      expect(lines).toContain('  --pink-l100: 0.92;');
      expect(lines).toContain('  --pink-l200: 0.76;');
      expect(lines).toContain('  --pink-l300: 0.65;');
    });

    it('produces chroma custom properties per step', () => {
      const lines = gen.formatOklchChannels('pink', 10, {}, { 100: 0.045, 300: 0.242 });
      expect(lines).toContain('  --pink-c100: 0.045;');
      expect(lines).toContain('  --pink-c300: 0.242;');
    });

    it('produces neutral-hue for neutral families', () => {
      const lines = gen.formatOklchChannels('neutral', 260, {}, {});
      expect(lines[0]).toBe('  --neutral-hue: 260;');
    });

    it('output enables CSS relative color syntax composition', () => {
      // Verify the format is compatible with:
      // oklch(var(--pink-l300) var(--pink-c300) var(--pink-hue) / var(--opacity))
      const lines = gen.formatOklchChannels('pink', 10, { 300: 0.65 }, { 300: 0.242 });
      // Channels are bare numbers (no units) — required for oklch() composition
      expect(lines[0]).toMatch(/--pink-hue: \d+(\.\d+)?;/);
      expect(lines.find(l => l.includes('--pink-l300'))).toMatch(/--pink-l300: \d+(\.\d+)?;/);
      expect(lines.find(l => l.includes('--pink-c300'))).toMatch(/--pink-c300: \d+(\.\d+)?;/);
    });
  });
});
