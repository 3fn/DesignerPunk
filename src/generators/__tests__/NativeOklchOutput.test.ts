/**
 * @category evergreen
 * @purpose Verify iOS and Android native colour output (Spec 112 R4; Spec 129 Task 8.1)
 *
 * Native colours are Display P3 constructors with channels computed at generation. No generated
 * file calls `Color.oklch`, imports ChromaKit, or calls colormath's `Oklch(...).toComposeColor()`.
 */

import { iOSFormatGenerator } from '../../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';

describe('Native colour output (Spec 129 design § 6)', () => {
  describe('iOS', () => {
    let gen: iOSFormatGenerator;

    beforeEach(() => {
      gen = new iOSFormatGenerator();
    });

    it('produces Color(.displayP3, red:, green:, blue:, opacity:)', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toMatch(
        /Color\(\.displayP3, red: [\d.]+, green: [\d.]+, blue: [\d.]+, opacity: 1\)$/,
      );
    });

    it('calls neither Color.oklch nor ChromaKit', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).not.toContain('oklch');
      expect(result).not.toContain('ChromaKit');
    });

    it('uses camelCase token name', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('static let');
      expect(result).toContain('pink300');
    });

    it('writes the member public, so another module can read it (Spec 129 row 9)', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toMatch(/^\s+public static let pink300 = /);
    });

    it('writes white and black as exact channels', () => {
      expect(gen.formatOklchColor('white100', 1, 0, 0)).toContain('red: 1, green: 1, blue: 1, opacity: 1');
      expect(gen.formatOklchColor('black100', 0, 0, 0)).toContain('red: 0, green: 0, blue: 0, opacity: 1');
    });

    it('imports SwiftUI in the file header', () => {
      expect(gen.generateHeader()).toContain('import SwiftUI');
    });
  });

  describe('Android', () => {
    let gen: AndroidFormatGenerator;

    beforeEach(() => {
      gen = new AndroidFormatGenerator('kotlin');
    });

    it('produces Color(r, g, b, alpha, ColorSpaces.DisplayP3)', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toMatch(
        /Color\([\d.]+f, [\d.]+f, [\d.]+f, 1f, ColorSpaces\.DisplayP3\)$/,
      );
    });

    it('calls no colormath', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).not.toContain('Oklch');
      expect(result).not.toContain('toComposeColor');
    });

    it('uses val', () => {
      const result = gen.formatOklchColor('pink300', 0.65, 0.242, 10);
      expect(result).toContain('val');
    });

    it('writes white and black as exact channels', () => {
      expect(gen.formatOklchColor('white100', 1, 0, 0)).toContain('Color(1f, 1f, 1f, 1f, ColorSpaces.DisplayP3)');
      expect(gen.formatOklchColor('black100', 0, 0, 0)).toContain('Color(0f, 0f, 0f, 1f, ColorSpaces.DisplayP3)');
    });
  });
});
