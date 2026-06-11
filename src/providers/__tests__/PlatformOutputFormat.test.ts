/**
 * @category evergreen
 * @purpose Verify platform output format generators produce correct color output via public API
 */
/**
 * Platform Output Format Tests
 * 
 * Tests for platform-specific color output format generation.
 * Validates opacity composition resolution and alpha channel preservation
 * across Web (CSS), iOS (Swift/UIColor), and Android (Kotlin/Color.argb)
 * through the public formatSingleReferenceToken API.
 * 
 * Note: RGBA parsing helpers (parseRgbaString, rgbaStringToUIColor, rgbaStringToColorArgb)
 * are now private @internal methods used only by the opacity composition path.
 * They will be removed entirely once ColorTokens.ts RGBA values migrate to OKLCH.
 * 
 * **Validates: Requirements 8.3** - Platform output format tests
 */

import { WebFormatGenerator } from '../WebFormatGenerator';
import { iOSFormatGenerator } from '../iOSFormatGenerator';
import { AndroidFormatGenerator } from '../AndroidFormatGenerator';

describe('Platform Output Format Tests', () => {
  describe('Web Platform - Color Format', () => {
    let generator: WebFormatGenerator;

    beforeEach(() => {
      generator = new WebFormatGenerator();
    });

    describe('generateRgbaAlpha', () => {
      test('should generate correct RGBA format: rgba(r, g, b, a)', () => {
        const result = generator.generateRgbaAlpha(74, 222, 128, 1);
        expect(result).toBe('rgba(74, 222, 128, 1)');
      });

      test('should preserve alpha channel in output', () => {
        const result = generator.generateRgbaAlpha(184, 182, 200, 0.48);
        expect(result).toBe('rgba(184, 182, 200, 0.48)');
      });

      test('should handle zero alpha (fully transparent)', () => {
        const result = generator.generateRgbaAlpha(255, 0, 0, 0);
        expect(result).toBe('rgba(255, 0, 0, 0)');
      });
    });

    describe('formatColorValue', () => {
      test('should return string value as-is', () => {
        const result = generator.formatColorValue('oklch(0.65 0.242 10)');
        expect(result).toBe('oklch(0.65 0.242 10)');
      });

      test('should extract light/base value from mode-aware object', () => {
        const modeAwareColor = {
          light: { base: 'oklch(0.65 0.242 10)' },
          dark: { base: 'oklch(0.35 0.12 10)' }
        };
        const result = generator.formatColorValue(modeAwareColor);
        expect(result).toBe('oklch(0.65 0.242 10)');
      });
    });
  });

  describe('iOS Platform - Color Format', () => {
    let generator: iOSFormatGenerator;

    beforeEach(() => {
      generator = new iOSFormatGenerator();
    });

    describe('generateColorWithOpacity', () => {
      test('should generate SwiftUI Color format', () => {
        const result = generator.generateColorWithOpacity(0.72, 0.71, 0.78, 0.48);
        expect(result).toBe('Color(red: 0.72, green: 0.71, blue: 0.78, opacity: 0.48)');
      });

      test('should preserve opacity parameter', () => {
        const result = generator.generateColorWithOpacity(0.5, 0.5, 0.5, 0.32);
        expect(result).toContain('opacity: 0.32');
      });
    });
  });

  describe('Android Platform - Color Format', () => {
    let generator: AndroidFormatGenerator;

    beforeEach(() => {
      generator = new AndroidFormatGenerator('kotlin');
    });

    describe('generateColorWithAlpha', () => {
      test('should generate Jetpack Compose Color.copy format', () => {
        const result = generator.generateColorWithAlpha('0xFF6B50A4', 0.48);
        expect(result).toBe('Color(0xFF6B50A4).copy(alpha = 0.48f)');
      });

      test('should preserve alpha parameter with f suffix', () => {
        const result = generator.generateColorWithAlpha('0xFFB8B6C8', 0.32);
        expect(result).toContain('alpha = 0.32f');
      });
    });
  });

  describe('Alpha Channel Preservation', () => {
    test('Web should preserve alpha in RGBA output', () => {
      const generator = new WebFormatGenerator();
      const alphaValues = [0, 0.08, 0.16, 0.32, 0.48, 0.64, 0.80, 0.88, 1];
      
      alphaValues.forEach(alpha => {
        const result = generator.generateRgbaAlpha(128, 128, 128, alpha);
        expect(result).toContain(alpha.toString());
      });
    });
  });

  describe('Opacity Composition Resolution', () => {
    /**
     * Tests for opacity composition pattern: { color: 'gray100', opacity: 'opacity048' }
     * Validates that generators resolve color + opacity primitives to RGBA output
     * via the public formatSingleReferenceToken API.
     */

    describe('Web Platform - Opacity Composition', () => {
      let generator: WebFormatGenerator;

      beforeEach(() => {
        generator = new WebFormatGenerator();
      });

      test('should resolve opacity composition to rgba format', () => {
        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border with transparency',
          description: 'Semi-transparent border'
        };

        const result = generator.formatSingleReferenceToken(semanticToken as any);

        expect(result).toContain('--color-structure-border-subtle');
        expect(result).toContain('rgba(178, 188, 196, 0.48)');
      });

      test('should produce correct CSS output format', () => {
        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border',
          description: 'Semi-transparent border'
        };

        const result = generator.formatSingleReferenceToken(semanticToken as any);
        expect(result).toMatch(/--color-structure-border-subtle:\s*rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\);/);
      });
    });

    describe('iOS Platform - Opacity Composition', () => {
      let generator: iOSFormatGenerator;

      beforeEach(() => {
        generator = new iOSFormatGenerator();
      });

      test('should resolve opacity composition to UIColor format', () => {
        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border with transparency',
          description: 'Semi-transparent border'
        };

        const result = generator.formatSingleReferenceToken(semanticToken as any);

        expect(result).toContain('colorStructureBorderSubtle');
        expect(result).toContain('UIColor(red:');
        expect(result).toContain('alpha: 0.48');
      });
    });

    describe('Android Platform - Opacity Composition', () => {
      let generator: AndroidFormatGenerator;

      beforeEach(() => {
        generator = new AndroidFormatGenerator('kotlin');
      });

      test('should resolve opacity composition to Color.argb format', () => {
        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border with transparency',
          description: 'Semi-transparent border'
        };

        const result = generator.formatSingleReferenceToken(semanticToken as any);

        expect(result).toContain('color_structure_border_subtle');
        expect(result).toContain('Color.argb(');
        expect(result).toContain('Color.argb(122,');
      });

      test('should produce correct XML output format', () => {
        const xmlGenerator = new AndroidFormatGenerator('xml');
        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border',
          description: 'Semi-transparent border'
        };

        const result = xmlGenerator.formatSingleReferenceToken(semanticToken as any);

        expect(result).toContain('<color name="color_structure_border_subtle">');
        expect(result).toMatch(/#[0-9A-F]{8}/);
      });
    });

    describe('Cross-Platform Opacity Composition Consistency', () => {
      test('all platforms should resolve same opacity composition to equivalent values', () => {
        const webGenerator = new WebFormatGenerator();
        const iosGenerator = new iOSFormatGenerator();
        const androidGenerator = new AndroidFormatGenerator('kotlin');

        const semanticToken = {
          name: 'color.structure.border.subtle',
          primitiveReferences: { color: 'gray100', opacity: 'opacity048' },
          category: 'color',
          context: 'Subtle border',
          description: 'Semi-transparent border'
        };

        const webResult = webGenerator.formatSingleReferenceToken(semanticToken as any);
        const iosResult = iosGenerator.formatSingleReferenceToken(semanticToken as any);
        const androidResult = androidGenerator.formatSingleReferenceToken(semanticToken as any);

        // Web: rgba(178, 188, 196, 0.48)
        expect(webResult).toContain('rgba(178, 188, 196, 0.48)');
        // iOS: UIColor with alpha: 0.48
        expect(iosResult).toContain('alpha: 0.48');
        // Android: Color.argb(122, ...) where 122 = 0.48 * 255
        expect(androidResult).toContain('Color.argb(122,');
      });
    });
  });
});
