/**
 * @category evergreen
 * @purpose Verify Kotlin theme type generation for registered themes (Spec 094)
 */

import { TokenFileGenerator, ThemeOverrideSet } from '../TokenFileGenerator';
import { SemanticCategory } from '../../types/SemanticToken';

describe('Kotlin Theme Type Generation (Spec 094)', () => {
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

  const baseLight = [
    makeToken('color.action.primary', 'rgba(0, 240, 255, 1)'),
    makeToken('color.structure.canvas', 'rgba(255, 255, 255, 1)'),
  ];
  const baseDark = [
    makeToken('color.action.primary', 'rgba(0, 240, 255, 1)'),
    makeToken('color.structure.canvas', 'rgba(24, 34, 40, 1)'),
  ];

  const darkTheme: ThemeOverrideSet = {
    name: 'marketing',
    mode: 'dark',
    lightTokens: baseLight,
    darkTokens: [
      makeToken('color.action.primary', 'rgba(0, 200, 220, 1)'),
      makeToken('color.structure.canvas', 'rgba(10, 12, 16, 1)'),
    ],
    overrideKeys: new Set(['color.action.primary', 'color.structure.canvas']),
  };

  test('generates data class with theme-varying properties', () => {
    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('data class WrKingClassTheme(');
    expect(output).toContain('val color_action_primary: Color');
    expect(output).toContain('val color_structure_canvas: Color');
  });

  test('generates Themes object with base light and dark instances', () => {
    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('object WrKingClassThemes {');
    expect(output).toContain('val BaseLight = WrKingClassTheme(');
    expect(output).toContain('val BaseDark = WrKingClassTheme(');
  });

  test('generates dark-only theme as single instance', () => {
    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('val Marketing = WrKingClassTheme(');
    expect(output).not.toContain('MarketingLight');
    expect(output).not.toContain('MarketingDark');
  });

  test('generates both-mode theme as light + dark instances', () => {
    const bothTheme: ThemeOverrideSet = {
      name: 'wcag',
      mode: 'both',
      lightTokens: [
        makeToken('color.action.primary', 'rgba(26, 83, 92, 1)'),
        makeToken('color.structure.canvas', 'rgba(255, 255, 255, 1)'),
      ],
      darkTokens: [
        makeToken('color.action.primary', 'rgba(0, 240, 255, 1)'),
        makeToken('color.structure.canvas', 'rgba(24, 34, 40, 1)'),
      ],
      overrideKeys: new Set(['color.action.primary']),
    };

    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [bothTheme], 'Test', 'T');
    const output = lines.join('\n');

    expect(output).toContain('val WcagLight = TestTheme(');
    expect(output).toContain('val WcagDark = TestTheme(');
  });

  test('generates CompositionLocal with correct naming', () => {
    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('val LocalWKCTheme = compositionLocalOf { WrKingClassThemes.BaseLight }');
  });

  test('uses Compose Color type with integer ARGB', () => {
    const lines = generator.generateThemeOverrideBlocks('android', baseLight, baseDark, [darkTheme], 'Test', 'T');
    const output = lines.join('\n');

    expect(output).toContain('import androidx.compose.ui.graphics.Color');
    // rgba(0, 240, 255, 1) → Color(0, 240, 255, 255)
    expect(output).toContain('Color(0, 240, 255, 255)');
  });
});
