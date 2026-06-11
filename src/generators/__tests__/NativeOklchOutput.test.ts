/**
 * @category evergreen
 * @purpose Verify iOS and Android OKLCH output format (Spec 112 R4)
 */

import { iOSFormatGenerator } from '../../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';

describe('Native OKLCH output (Spec 112 R4)', () => {
  describe('iOS (ChromaKit)', () => {
    let gen: iOSFormatGenerator;

    beforeEach(() => {
      gen = new iOSFormatGenerator();
    });

    it('produces Color.oklch() format', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('Color.oklch(0.65, 0.242, 10)');
    });

    it('uses camelCase token name', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('static let');
      expect(result).toContain('pink300');
    });

    it('handles neutral colors', () => {
      const result = gen.formatOklchColor('gray500', 0.32, 0.015, 260);
      expect(result).toContain('Color.oklch(0.32, 0.015, 260)');
    });
  });

  describe('Android (colormath)', () => {
    let gen: AndroidFormatGenerator;

    beforeEach(() => {
      gen = new AndroidFormatGenerator('kotlin');
    });

    it('produces Oklch().toComposeColor() format', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('Oklch(0.65f, 0.242f, 10f).toComposeColor()');
    });

    it('uses camelCase token name with val', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('val');
    });

    it('handles neutral colors', () => {
      const result = gen.formatOklchColor('gray500', 0.32, 0.015, 260);
      expect(result).toContain('Oklch(0.32f, 0.015f, 260f).toComposeColor()');
    });
  });
});
