import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as yaml from 'js-yaml';
import { generateTokenIndex } from '../generateTokenIndex';
import type { PrimitiveToken } from '../../types/PrimitiveToken';
import type { SemanticToken } from '../../types/SemanticToken';
import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';
import { TokenCategory } from '../../types/PrimitiveToken';

function makePrimitive(name: string, category = TokenCategory.SPACING, value = 8): PrimitiveToken {
  return {
    name,
    category,
    baseValue: value,
    familyBaseValue: 8,
    description: '',
    mathematicalRelationship: 'base × 1 = 8',
    baselineGridAlignment: true,
    isStrategicFlexibility: false,
    isPrecisionTargeted: false,
    platforms: {
      web: { value, unit: 'px' },
      ios: { value, unit: 'pt' },
      android: { value, unit: 'dp' },
    },
  };
}

function makeSemantic(name: string, primitiveRef: string, category = 'spacing'): SemanticToken {
  return {
    name,
    category,
    description: '',
    primitiveReferences: { value: primitiveRef },
    context: '',
  } as SemanticToken;
}

function makeComponentToken(name: string, component: string, primitiveRef: string): RegisteredComponentToken {
  return {
    name,
    component,
    family: 'spacing',
    value: 12,
    primitiveReference: primitiveRef,
    reasoning: 'Test token',
  };
}

describe('generateTokenIndex', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'token-index-test-'));
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('writes primitives.yaml using provided primitiveTokens', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [makePrimitive('space100')],
      semanticTokens: [],
      componentTokens: [],
      themeVaryingTokens: new Set(),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'primitives.yaml'), 'utf-8')) as any;
    expect(content.tokens['space100']).toBeDefined();
    expect(content.tokens['space100'].family).toBe('spacing');
    expect(content.tokens['space100'].value).toBe(8);
  });

  it('writes semantics.yaml using provided semanticTokens', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [makeSemantic('space.inset.normal', 'space100')],
      componentTokens: [],
      themeVaryingTokens: new Set(),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any;
    expect(content.tokens['space.inset.normal']).toBeDefined();
    expect(content.tokens['space.inset.normal'].primitiveReferences.value).toBe('space100');
  });

  it('writes components.yaml using provided componentTokens', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [],
      componentTokens: [makeComponentToken('buttonicon.inset.large', 'ButtonIcon', 'space150')],
      themeVaryingTokens: new Set(),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'components.yaml'), 'utf-8')) as any;
    expect(content.tokens['buttonicon.inset.large']).toBeDefined();
    expect(content.tokens['buttonicon.inset.large'].component).toBe('ButtonIcon');
    expect(content.tokens['buttonicon.inset.large'].primitiveReferences.value).toBe('space150');
  });

  it('reflects themeVaryingTokens in semantic output', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [
        makeSemantic('color.action.primary', 'cyan300', 'color'),
        makeSemantic('color.structure.canvas', 'white100', 'color'),
      ],
      componentTokens: [],
      themeVaryingTokens: new Set(['color.action.primary']),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any;
    expect(content.tokens['color.action.primary'].themeVarying).toBe(true);
    expect(content.tokens['color.structure.canvas'].themeVarying).toBe(false);
  });

  it('theme-varying tokens get theme-prefixed platform names', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [makeSemantic('color.action.primary', 'cyan300', 'color')],
      componentTokens: [],
      themeVaryingTokens: new Set(['color.action.primary']),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any;
    const platforms = content.tokens['color.action.primary'].platforms;
    expect(platforms.ios).toMatch(/^theme\./);
    expect(platforms.android).toMatch(/^theme\./);
  });

  it('does not include tokens not in the provided input', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [makePrimitive('space100')],
      semanticTokens: [],
      componentTokens: [],
      themeVaryingTokens: new Set(),
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'primitives.yaml'), 'utf-8')) as any;
    expect(Object.keys(content.tokens)).toEqual(['space100']);
  });
});
