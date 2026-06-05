import { computeThemeVaryingTokens } from '../themeVarying';
import type { PrimitiveToken, ColorTokenValue } from '../../types/PrimitiveToken';
import type { SemanticToken } from '../../types/SemanticToken';
import type { ResolvedConfig } from '../../config/ConfigLoader';
import { TokenCategory } from '../../types/PrimitiveToken';

function makeConfig(themes: ResolvedConfig['themes'] = []): ResolvedConfig {
  return {
    name: 'Test',
    abbreviation: 'T',
    themes,
    tokenSourceRoot: '/tmp',
    tokenSourceMode: 'package',
    componentTokenDirs: [],
    outputDir: '/tmp/dist',
    configDir: '/tmp',
  };
}

function makeColorPrimitive(name: string, lightBase: string, darkBase: string): PrimitiveToken {
  const cv: ColorTokenValue = {
    light: { base: lightBase, wcag: lightBase },
    dark: { base: darkBase, wcag: darkBase },
  };
  return {
    name,
    category: TokenCategory.COLOR,
    baseValue: 0,
    familyBaseValue: 0,
    description: '',
    mathematicalRelationship: '',
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: {
      web: { value: cv, unit: 'rgba' },
      ios: { value: cv, unit: 'rgba' },
      android: { value: cv, unit: 'rgba' },
    },
  };
}

function makeSemanticToken(name: string, primitiveRef: string, category = 'color'): SemanticToken {
  return {
    name,
    category,
    description: '',
    primitiveReferences: { value: primitiveRef },
    context: '',
  } as SemanticToken;
}

describe('computeThemeVaryingTokens', () => {
  it('includes tokens with explicit overrides from registered themes', () => {
    const config = makeConfig([
      { name: 'dark', mode: 'dark', overrides: { 'color.action.nav': { primitiveReferences: { value: 'cyan100' } } } },
    ]);

    const result = computeThemeVaryingTokens(config, [], []);
    expect(result.has('color.action.nav')).toBe(true);
    expect(result.size).toBe(1);
  });

  it('unions override keys from multiple themes', () => {
    const config = makeConfig([
      { name: 'dark', mode: 'dark', overrides: { 'color.a': { primitiveReferences: { value: 'x' } } } },
      { name: 'wcag', mode: 'both', overrides: { 'color.b': { primitiveReferences: { value: 'y' } } } },
    ]);

    const result = computeThemeVaryingTokens(config, [], []);
    expect(result.has('color.a')).toBe(true);
    expect(result.has('color.b')).toBe(true);
  });

  it('includes color tokens whose primitive has different light/dark base values', () => {
    const config = makeConfig([]);
    const primitives = [makeColorPrimitive('cyan300', 'rgba(0,200,255,1)', 'rgba(0,100,200,1)')];
    const semantics = [makeSemanticToken('color.action.primary', 'cyan300')];

    const result = computeThemeVaryingTokens(config, semantics, primitives);
    expect(result.has('color.action.primary')).toBe(true);
  });

  it('excludes color tokens whose primitive has same light/dark base values', () => {
    const config = makeConfig([]);
    const primitives = [makeColorPrimitive('cyan300', 'rgba(0,200,255,1)', 'rgba(0,200,255,1)')];
    const semantics = [makeSemanticToken('color.action.primary', 'cyan300')];

    const result = computeThemeVaryingTokens(config, semantics, primitives);
    expect(result.has('color.action.primary')).toBe(false);
  });

  it('excludes non-color tokens without overrides', () => {
    const config = makeConfig([]);
    const semantics = [makeSemanticToken('space.inset.normal', 'space100', 'spacing')];

    const result = computeThemeVaryingTokens(config, semantics, []);
    expect(result.size).toBe(0);
  });

  it('skips tokens with modeInvariant flag', () => {
    const config = makeConfig([]);
    const primitives = [makeColorPrimitive('cyan300', 'rgba(0,200,255,1)', 'rgba(0,100,200,1)')];
    const semantics = [{ ...makeSemanticToken('color.print.accent', 'cyan300'), modeInvariant: true }];

    const result = computeThemeVaryingTokens(config, semantics, primitives);
    expect(result.has('color.print.accent')).toBe(false);
  });

  it('returns empty set with no themes and no light/dark differences', () => {
    const config = makeConfig([]);
    const result = computeThemeVaryingTokens(config, [], []);
    expect(result.size).toBe(0);
  });
});
