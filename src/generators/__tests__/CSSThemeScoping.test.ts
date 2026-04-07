/**
 * @category evergreen
 * @purpose Verify CSS theme scoping output for registered themes (Spec 094)
 */

import { TokenFileGenerator, ThemeOverrideSet } from '../TokenFileGenerator';
import { SemanticCategory } from '../../types/SemanticToken';

describe('CSS Theme Scoping (Spec 094)', () => {
  let generator: TokenFileGenerator;

  beforeEach(() => {
    generator = new TokenFileGenerator();
  });

  function makeToken(name: string, value: string) {
    return {
      name,
      category: SemanticCategory.COLOR,
      context: 'test',
      description: 'test',
      primitiveReferences: { value },
    };
  }

  describe('generateThemeOverrideBlocks — web', () => {
    test('dark-only theme produces color-scheme: dark and static values', () => {
      const baseLight = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const baseDark = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const theme: ThemeOverrideSet = {
        name: 'marketing',
        mode: 'dark',
        lightTokens: [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')],
        darkTokens: [makeToken('color.action.primary', 'rgba(0, 200, 220, 1)')],
        overrideKeys: new Set(['color.action.primary']),
      };

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, [theme]);
      const output = lines.join('\n');

      expect(output).toContain(':root[data-theme="marketing"]');
      expect(output).toContain('color-scheme: dark;');
      expect(output).toContain('rgba(0, 200, 220, 1)');
      expect(output).not.toContain('light-dark(');
    });

    test('both-mode theme produces light-dark() when values differ', () => {
      const baseLight = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const baseDark = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const theme: ThemeOverrideSet = {
        name: 'wcag',
        mode: 'both',
        lightTokens: [makeToken('color.action.primary', 'rgba(26, 83, 92, 1)')],
        darkTokens: [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')],
        overrideKeys: new Set(['color.action.primary']),
      };

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, [theme]);
      const output = lines.join('\n');

      expect(output).toContain(':root[data-theme="wcag"]');
      expect(output).toContain('light-dark(rgba(26, 83, 92, 1), rgba(0, 240, 255, 1))');
      expect(output).not.toContain('color-scheme: dark;');
    });

    test('both-mode theme uses static value when light and dark are identical', () => {
      const baseLight = [makeToken('color.contrast.onAction', 'rgba(0, 0, 0, 1)')];
      const baseDark = [makeToken('color.contrast.onAction', 'rgba(0, 0, 0, 1)')];
      const theme: ThemeOverrideSet = {
        name: 'wcag',
        mode: 'both',
        lightTokens: [makeToken('color.contrast.onAction', 'rgba(255, 255, 255, 1)')],
        darkTokens: [makeToken('color.contrast.onAction', 'rgba(255, 255, 255, 1)')],
        overrideKeys: new Set(['color.contrast.onAction']),
      };

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, [theme]);
      const output = lines.join('\n');

      expect(output).toContain('rgba(255, 255, 255, 1)');
      expect(output).not.toContain('light-dark(');
    });

    test('only tokens in overrideKeys appear in the block', () => {
      const baseLight = [
        makeToken('color.action.primary', 'rgba(0, 240, 255, 1)'),
        makeToken('color.text.default', 'rgba(38, 50, 58, 1)'),
      ];
      const baseDark = [...baseLight];
      const theme: ThemeOverrideSet = {
        name: 'test',
        mode: 'dark',
        lightTokens: [
          makeToken('color.action.primary', 'rgba(100, 100, 100, 1)'),
          makeToken('color.text.default', 'rgba(200, 200, 200, 1)'),
        ],
        darkTokens: [
          makeToken('color.action.primary', 'rgba(100, 100, 100, 1)'),
          makeToken('color.text.default', 'rgba(200, 200, 200, 1)'),
        ],
        overrideKeys: new Set(['color.action.primary']),  // only one key
      };

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, [theme]);
      const output = lines.join('\n');

      expect(output).toContain('color-action-primary');
      expect(output).not.toContain('color-text-default');
    });

    test('multiple themes produce multiple blocks', () => {
      const baseLight = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const baseDark = [...baseLight];
      const themes: ThemeOverrideSet[] = [
        {
          name: 'wcag',
          mode: 'both',
          lightTokens: [makeToken('color.action.primary', 'rgba(26, 83, 92, 1)')],
          darkTokens: [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')],
          overrideKeys: new Set(['color.action.primary']),
        },
        {
          name: 'marketing',
          mode: 'dark',
          lightTokens: [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')],
          darkTokens: [makeToken('color.action.primary', 'rgba(0, 200, 220, 1)')],
          overrideKeys: new Set(['color.action.primary']),
        },
      ];

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, themes);
      const output = lines.join('\n');

      expect(output).toContain(':root[data-theme="wcag"]');
      expect(output).toContain(':root[data-theme="marketing"]');
    });

    test('empty overrideKeys produces no output', () => {
      const baseLight = [makeToken('color.action.primary', 'rgba(0, 240, 255, 1)')];
      const baseDark = [...baseLight];
      const theme: ThemeOverrideSet = {
        name: 'empty',
        mode: 'dark',
        lightTokens: [...baseLight],
        darkTokens: [...baseDark],
        overrideKeys: new Set(),
      };

      const lines = generator.generateThemeOverrideBlocks('web', baseLight, baseDark, [theme]);
      expect(lines).toEqual([]);
    });
  });
});
