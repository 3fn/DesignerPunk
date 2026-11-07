/**
 * @category evergreen
 * @purpose Verify mode-aware generation produces correct platform output for light/dark tokens
 */
/**
 * Mode-Aware Generation Integration Tests (Spec 080, Task 5.6)
 *
 * Tests that the generator produces correct mode-aware output when given
 * pre-resolved light and dark semantic token sets with differing values.
 */

import { TokenFileGenerator } from '../TokenFileGenerator';
import { defaultSemanticOptions } from './helpers/defaultSemanticOptions';
import { SemanticCategory } from '../../types/SemanticToken';
import type { SemanticToken } from '../../types/SemanticToken';

// Test tokens with distinct light/dark resolved values
const lightToken: Omit<SemanticToken, 'primitiveTokens'> = {
  name: 'color.text.default',
  primitiveReferences: { value: 'rgba(38, 50, 58, 1)' },
  category: SemanticCategory.COLOR,
  context: 'Test',
  description: 'Default text color',
};

const darkToken: Omit<SemanticToken, 'primitiveTokens'> = {
  name: 'color.text.default',
  primitiveReferences: { value: 'rgba(178, 188, 196, 1)' },
  category: SemanticCategory.COLOR,
  context: 'Test',
  description: 'Default text color',
};

// Mode-invariant token (identical light/dark)
const invariantLight: Omit<SemanticToken, 'primitiveTokens'> = {
  name: 'color.print.default',
  primitiveReferences: { value: 'rgba(0, 0, 0, 1)' },
  category: SemanticCategory.COLOR,
  context: 'Test',
  description: 'Print color',
};

const invariantDark: Omit<SemanticToken, 'primitiveTokens'> = {
  ...invariantLight,
};

const lightTokens = [lightToken, invariantLight];
const darkTokens = [darkToken, invariantDark];

describe('Mode-Aware Generation (Spec 080)', () => {
  let generator: TokenFileGenerator;

  beforeEach(() => {
    generator = new TokenFileGenerator();
  });

  describe('Web platform', () => {
    it('should output light-dark() for mode-differentiated tokens', () => {
      const result = generator.generateWebTokens({
        semanticTokens: lightTokens,
        darkSemanticTokens: darkTokens,
      });
      expect(result.content).toContain(
        'light-dark(rgba(38, 50, 58, 1), rgba(178, 188, 196, 1))'
      );
    });

    it('should output single value for mode-invariant tokens', () => {
      const result = generator.generateWebTokens({
        semanticTokens: lightTokens,
        darkSemanticTokens: darkTokens,
      });
      // Mode-invariant: no light-dark() wrapper
      expect(result.content).toMatch(/--color-print-default:\s*rgba\(0, 0, 0, 1\);/);
      expect(result.content).not.toContain('light-dark(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))');
    });

    it('should include color-scheme declaration', () => {
      const result = generator.generateWebTokens({
        semanticTokens: lightTokens,
        darkSemanticTokens: darkTokens,
      });
      expect(result.content).toContain('color-scheme: light dark;');
    });
  });

  // Native: a colour semantic is a member of every theme instance (Spec 129 design § 4), so a
  // mode-differentiated token has different values in the base light and base dark instances,
  // and a mode-invariant one the same value in both.
  const memberLine = (content: string, open: string, member: string): string => {
    const start = content.indexOf(open);
    expect(start).toBeGreaterThan(-1);
    const end = content.indexOf('\n}', start);
    const block = content.slice(start, end);
    const line = block.split('\n').find(l => l.includes(member));
    expect(line).toBeDefined();
    return line!.trim();
  };

  describe('iOS platform', () => {
    const gen = () => generator.generateiOSTokens({ semanticTokens: lightTokens, darkSemanticTokens: darkTokens }).content;

    it('gives a mode-differentiated token different values in the light and dark instances', () => {
      const content = gen();
      const light = memberLine(content, 'public struct DesignerPunkBaseLightTheme', 'colorTextDefault');
      const dark = memberLine(content, 'public struct DesignerPunkBaseDarkTheme', 'colorTextDefault');
      expect(light).toMatch(/public let colorTextDefault: Color = Color\(\.displayP3, /);
      expect(dark).not.toBe(light);
    });

    it('gives a mode-invariant token the same value in both instances', () => {
      const content = gen();
      const light = memberLine(content, 'public struct DesignerPunkBaseLightTheme', 'colorPrintDefault');
      const dark = memberLine(content, 'public struct DesignerPunkBaseDarkTheme', 'colorPrintDefault');
      expect(dark).toBe(light);
      expect(content).not.toMatch(/userInterfaceStyle/);
    });
  });

  describe('Android platform', () => {
    const gen = () => generator.generateAndroidTokens({ semanticTokens: lightTokens, darkSemanticTokens: darkTokens }).content;

    it('gives a mode-differentiated token different values in BaseLight and BaseDark', () => {
      const content = gen();
      const light = memberLine(content, 'val BaseLight = DesignerPunkTheme(', 'color_text_default');
      const dark = memberLine(content, 'val BaseDark = DesignerPunkTheme(', 'color_text_default');
      expect(light).toMatch(/color_text_default = Color\(.*ColorSpaces\.DisplayP3\)/);
      expect(dark).not.toBe(light);
    });

    it('gives a mode-invariant token the same value in both and emits no _light or _dark member', () => {
      const content = gen();
      const light = memberLine(content, 'val BaseLight = DesignerPunkTheme(', 'color_print_default');
      const dark = memberLine(content, 'val BaseDark = DesignerPunkTheme(', 'color_print_default');
      expect(dark.replace(/,$/, '')).toBe(light.replace(/,$/, ''));
      expect(content).not.toContain('color_print_default_light');
    });
  });

  describe('DTCG export', () => {
    it('should not emit mode contexts when light/dark values are identical', () => {
      // color.text.default gained a genuine dark override on 2026-09-13 (interim
      // dark-text-hierarchy fix — see src/tokens/themes/dark/SemanticOverrides.ts), so
      // it's no longer a valid "identical light/dark" example. color.feedback.error.text
      // has no dark override — light/dark resolve identically.
      const { DTCGFormatGenerator } = require('../DTCGFormatGenerator');
      const gen = new DTCGFormatGenerator();
      const output = gen.generate();
      const sc = output.semanticColor as Record<string, any>;
      const errorText = sc['color.feedback.error.text'];
      expect(errorText).toBeDefined();
      const modes = errorText.$extensions?.designerpunk?.modes;
      // Should not have light/dark keys (values are identical)
      if (modes) {
        expect(modes.light).toBeUndefined();
        expect(modes.dark).toBeUndefined();
      }
    });

    it('should not emit wcag mode from inline wcagValue (migrated to theme files)', () => {
      const { DTCGFormatGenerator } = require('../DTCGFormatGenerator');
      const gen = new DTCGFormatGenerator();
      const output = gen.generate();
      const sc = output.semanticColor as Record<string, any>;
      const actionPrimary = sc['color.action.primary'];
      // wcagValue removed from token definitions — WCAG modes will come from 4-context generation
      expect(actionPrimary?.$extensions?.designerpunk?.modes?.wcag).toBeUndefined();
    });
  });

  // F37 guard removed in Task 5.7: TypeScript now enforces both semanticTokens
  // and darkSemanticTokens as required fields (compile-time safety replaces runtime guard).
});
