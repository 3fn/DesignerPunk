/**
 * @category evergreen
 * @purpose Verify Swift theme type generation for registered themes (Spec 094)
 */

import { TokenFileGenerator, ThemeOverrideSet } from '../TokenFileGenerator';
import { SemanticCategory } from '../../types/SemanticToken';

describe('Swift Theme Type Generation (Spec 094)', () => {
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

  test('generates protocol with theme-varying properties', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('public protocol WrKingClassTheme {');
    expect(output).toContain('var colorActionPrimary: Color { get }');
    expect(output).toContain('var colorStructureCanvas: Color { get }');
  });

  test('generates base light and dark structs', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('public struct WrKingClassBaseLight: WrKingClassTheme {');
    expect(output).toContain('public struct WrKingClassBaseDark: WrKingClassTheme {');
  });

  test('generates dark-only theme as single struct', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('public struct WrKingClassMarketing: WrKingClassTheme {');
    // Should NOT have light/dark variants for a dark-only theme
    expect(output).not.toContain('WrKingClassMarketingLight');
    expect(output).not.toContain('WrKingClassMarketingDark');
  });

  test('generates both-mode theme as light + dark structs', () => {
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

    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [bothTheme], 'Test', 'T');
    const output = lines.join('\n');

    expect(output).toContain('public struct TestWcagLight: TestTheme {');
    expect(output).toContain('public struct TestWcagDark: TestTheme {');
  });

  test('generates EnvironmentKey with correct naming', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'WrKingClass', 'WKC');
    const output = lines.join('\n');

    expect(output).toContain('public struct WKCThemeKey: EnvironmentKey {');
    expect(output).toContain('defaultValue: any WrKingClassTheme = WrKingClassBaseLight()');
    expect(output).toContain('var wkcTheme: any WrKingClassTheme {');
    expect(output).toContain('get { self[WKCThemeKey.self] }');
  });

  test('uses SwiftUI Color type, not UIColor', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'Test', 'T');
    const output = lines.join('\n');

    expect(output).toContain('import SwiftUI');
    expect(output).toContain(': Color { get }');
    expect(output).toContain('Color(red:');
    expect(output).not.toContain('UIColor');
  });

  test('uses correct rgba to Color conversion', () => {
    const lines = generator.generateThemeOverrideBlocks('ios', baseLight, baseDark, [darkTheme], 'Test', 'T');
    const output = lines.join('\n');

    // rgba(0, 240, 255, 1) → Color(red: 0.00, green: 0.94, blue: 1.00, opacity: 1.00)
    expect(output).toContain('Color(red: 0.00, green: 0.94, blue: 1.00, opacity: 1.00)');
  });
});
