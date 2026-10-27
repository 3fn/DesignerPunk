import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as yaml from 'js-yaml';
import { generateTokenIndex, relativeTierDir } from '../generateTokenIndex';
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

/**
 * Minimal ModeResolvedTokens for the generator (Spec 117 Task 3 shared-source input).
 * `nativeThemeVaryingTokens` defaults to the base set; pass it to tell the two apart.
 */
function makeModeResolved(
  themeVaryingTokens = new Set<string>(),
  nativeThemeVaryingTokens: Set<string> = themeVaryingTokens,
) {
  return {
    resolvedLight: [],
    resolvedDark: [],
    themeVaryingTokens,
    nativeThemeVaryingTokens,
    primitiveOklch: new Map(),
  };
}

/**
 * Default component-schema scan root for tests that don't exercise the consumer map
 * (Spec 118 Task 9.5.2, Class C′). Points at a non-existent dir — `buildConsumerMap`
 * returns an empty map for a missing dir, so `consumers` arrays are empty (the
 * behavior these fixtures assert against). The dedicated consumer-map test below
 * provides a real schema dir.
 */
const NO_SCHEMA_DIR = path.join(os.tmpdir(), '__no_such_schema_dir__');

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
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
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
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
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
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
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
      modeResolved: makeModeResolved(new Set(['color.action.primary'])),
      componentSchemaDir: NO_SCHEMA_DIR,
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
      modeResolved: makeModeResolved(new Set(['color.action.primary'])),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any;
    const platforms = content.tokens['color.action.primary'].platforms;
    expect(platforms.ios).toMatch(/^theme\./);
    expect(platforms.android).toMatch(/^theme\./);
  });

  // .kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md, plan item 5: the native
  // columns take `theme.` from the set the native generators consume; `themeVarying` keeps the
  // base-scoped (light/dark) meaning.
  it('takes the native theme. prefix from the native set, and themeVarying from the base set', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [
        makeSemantic('color.action.primary', 'cyan300', 'color'),
        makeSemantic('color.text.default', 'gray300', 'color'),
        makeSemantic('color.structure.canvas', 'white100', 'color'),
      ],
      componentTokens: [],
      modeResolved: makeModeResolved(
        new Set(['color.text.default']),
        new Set(['color.text.default', 'color.action.primary']),
      ),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const t = (yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any).tokens;
    // A WCAG-only override: not light/dark-varying, but out of DesignTokens on native.
    expect(t['color.action.primary'].themeVarying).toBe(false);
    expect(t['color.action.primary'].platforms).toEqual({
      web: '--color-action-primary', ios: 'theme.colorActionPrimary', android: 'theme.color_action_primary',
    });
    expect(t['color.text.default'].themeVarying).toBe(true);
    expect(t['color.text.default'].platforms.ios).toBe('theme.colorTextDefault');
    expect(t['color.structure.canvas'].platforms).toEqual({
      web: '--color-structure-canvas', ios: 'colorStructureCanvas', android: 'color_structure_canvas',
    });
  });

  // Same record, plan item 1: a composite row lists the names the generators emit for it.
  it('lists a composite token by the names each generator emits', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [
        { name: 'typography.bodyMd', category: 'typography', description: '', context: '',
          primitiveReferences: { fontSize: 'fontSize100', lineHeight: 'lineHeight100' } } as SemanticToken,
        { name: 'shadow.container', category: 'shadow', description: '', context: '',
          primitiveReferences: { offsetX: 'shadowOffsetX.000', offsetY: 'shadowOffsetY.100', blur: 'blur075', opacity: 'shadowOpacityModerate', color: 'shadowBlack100' } } as SemanticToken,
        { name: 'motion.floatLabel', category: 'interaction', description: '', context: '',
          primitiveReferences: { duration: 'duration250', easing: 'easingStandard' } } as SemanticToken,
      ],
      componentTokens: [],
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const t = (yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any).tokens;
    expect(t['typography.bodyMd'].platforms).toEqual({
      web: ['--typography-body-md-font-size', '--typography-body-md-line-height'],
      ios: 'typographyBodyMd',
      android: 'typography_body_md',
    });
    // Shadow: the composite first, then one property per key.
    expect(t['shadow.container'].platforms.web).toEqual([
      '--shadow-container',
      '--shadow-container-offset-x', '--shadow-container-offset-y', '--shadow-container-blur',
      '--shadow-container-opacity', '--shadow-container-color',
    ]);
    expect(t['shadow.container'].platforms.ios).toBe('shadowContainer');
    expect(t['motion.floatLabel'].platforms).toEqual({
      web: ['--motion-float-label-duration', '--motion-float-label-easing'],
      ios: ['MotionFloatLabel.duration', 'MotionFloatLabel.easing'],
      android: ['MotionFloatLabel.duration', 'MotionFloatLabel.easing'],
    });
    expect(t['typography.bodyMd'].platformNotes).toBeUndefined();
  });

  // Same record, plan item 1: a row respects the token's `platforms` list.
  it('gives null, with a note, on a platform the token does not declare', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [],
      semanticTokens: [
        { name: 'elevation.container', category: 'layering', value: 8, platforms: ['android'], description: '' } as unknown as SemanticToken,
        { name: 'zIndex.container', category: 'layering', value: 100, platforms: ['web', 'ios'], description: '' } as unknown as SemanticToken,
      ],
      componentTokens: [],
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const t = (yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any).tokens;
    expect(t['elevation.container'].platforms).toEqual({ web: null, ios: null, android: 'elevation_container' });
    expect(t['elevation.container'].platformNotes).toEqual({
      web: 'Use z-index + shadow tokens instead', ios: 'Use z-index + shadow tokens instead',
    });
    expect(t['zIndex.container'].platforms).toEqual({ web: '--z-index-container', ios: 'zIndexContainer', android: null });
    expect(t['zIndex.container'].platformNotes).toEqual({ android: 'Use elevation tokens instead' });
  });

  it('gives null on every platform to a colour primitive the generators do not emit', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [makePrimitive('shadowBlack100', TokenCategory.COLOR, 0), makePrimitive('teal300', TokenCategory.COLOR, 0)],
      semanticTokens: [],
      componentTokens: [],
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const t = (yaml.load(fs.readFileSync(path.join(outputDir, 'primitives.yaml'), 'utf-8')) as any).tokens;
    expect(t['shadowBlack100'].platforms).toEqual({ web: null, ios: null, android: null });
    expect(Object.keys(t['shadowBlack100'].platformNotes)).toEqual(['web', 'ios', 'android']);
    expect(t['teal300'].platforms).toEqual({ web: '--teal-300', ios: 'teal300', android: 'teal_300' });
    expect(t['teal300'].platformNotes).toBeUndefined();
  });

  it('does not include tokens not in the provided input', () => {
    generateTokenIndex(outputDir, {
      primitiveTokens: [makePrimitive('space100')],
      semanticTokens: [],
      componentTokens: [],
      modeResolved: makeModeResolved(),
      componentSchemaDir: NO_SCHEMA_DIR,
    });

    const content = yaml.load(fs.readFileSync(path.join(outputDir, 'primitives.yaml'), 'utf-8')) as any;
    expect(Object.keys(content.tokens)).toEqual(['space100']);
  });

  // Spec 118 Task 9.5.2 (Class C′): the consumer map is built from the schema dir the
  // CALLER passes in (`componentSchemaDir`), not from `__dirname`. This certifies the
  // generator reads the provided root — the unit-level half of the consumer-aware change
  // (the packed-consumer arbiter lives in tests/consumer-integration.test.ts).
  it('populates semantic consumers from the provided componentSchemaDir (scalar tokens shape)', () => {
    const schemaRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-root-'));
    const compDir = path.join(schemaRoot, 'Pricing-Card');
    fs.mkdirSync(compDir, { recursive: true });
    fs.writeFileSync(
      path.join(compDir, 'Pricing-Card.schema.yaml'),
      [
        'name: PricingCard',
        'tokens:',
        '  surface: color.action.primary',
      ].join('\n') + '\n',
    );

    try {
      generateTokenIndex(outputDir, {
        primitiveTokens: [],
        semanticTokens: [makeSemantic('color.action.primary', 'cyan300', 'color')],
        componentTokens: [],
        modeResolved: makeModeResolved(),
        componentSchemaDir: schemaRoot,
      });

      const content = yaml.load(fs.readFileSync(path.join(outputDir, 'semantics.yaml'), 'utf-8')) as any;
      expect(content.tokens['color.action.primary'].consumers).toContain('PricingCard');
    } finally {
      fs.rmSync(schemaRoot, { recursive: true, force: true });
    }
  });

  // Ruling 2026-10-23 § 3b (`.kiro/issues/2026-06-25-component-schema-token-name-drift.md`):
  // `consumers` is written on all three tiers. Before, only semantic entries carried it, so
  // `get_token_consumers` answered [] for every primitive and component token a schema
  // declared (e.g. Avatar-Base's `space300` and `avatar.size.md`).
  it('writes consumers on primitive and component-token entries, not only semantic ones', () => {
    const schemaRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-root-'));
    const compDir = path.join(schemaRoot, 'Avatar-Base');
    fs.mkdirSync(compDir, { recursive: true });
    fs.writeFileSync(
      path.join(compDir, 'Avatar-Base.schema.yaml'),
      [
        'name: Avatar-Base',
        'tokens:',
        '  spacing:',
        '    - space300',
        '  component:',
        '    - avatar.size.md',
        '  color:',
        '    - color.action.primary',
      ].join('\n') + '\n',
    );

    try {
      generateTokenIndex(outputDir, {
        primitiveTokens: [makePrimitive('space300', TokenCategory.SPACING, 24), makePrimitive('space100')],
        semanticTokens: [makeSemantic('color.action.primary', 'cyan300', 'color')],
        componentTokens: [
          makeComponentToken('avatar.size.md', 'Avatar', 'size600'),
          makeComponentToken('avatar.size.lg', 'Avatar', 'size700'),
        ],
        modeResolved: makeModeResolved(),
        componentSchemaDir: schemaRoot,
      });

      const read = (f: string) => (yaml.load(fs.readFileSync(path.join(outputDir, f), 'utf-8')) as any).tokens;
      const primitives = read('primitives.yaml');
      const components = read('components.yaml');
      const semantics = read('semantics.yaml');

      expect(primitives['space300'].consumers).toEqual(['Avatar-Base']);
      expect(components['avatar.size.md'].consumers).toEqual(['Avatar-Base']);
      expect(semantics['color.action.primary'].consumers).toEqual(['Avatar-Base']);
      // An undeclared token on each tier still carries the key, empty — one shape per tier.
      expect(primitives['space100'].consumers).toEqual([]);
      expect(components['avatar.size.lg'].consumers).toEqual([]);
    } finally {
      fs.rmSync(schemaRoot, { recursive: true, force: true });
    }
  });

  // Spec 123 Task 1.5 (DD24): meta.json's tierDir is what lets the application MCP's
  // theme readers follow the served index instead of guessing a project root.
  describe('meta.json (Spec 123 Task 1.5, DD24)', () => {
    // F2 (.kiro/issues/2026-10-02-token-index-meta-ships-absolute-path.md): the value is
    // written RELATIVE to the index dir, so the shipped file never carries the build
    // machine's absolute path.
    it('writes tierDir relative to the index directory, never the absolute path it was given', () => {
      const tierDir = path.join(path.dirname(outputDir), 'consumer-repo', 'src', 'tokens');
      generateTokenIndex(outputDir, {
        primitiveTokens: [],
        semanticTokens: [],
        componentTokens: [],
        modeResolved: makeModeResolved(),
        componentSchemaDir: NO_SCHEMA_DIR,
        tierDir,
      });

      const meta = JSON.parse(fs.readFileSync(path.join(outputDir, 'meta.json'), 'utf-8'));
      expect(meta).toEqual({ tierDir: '../consumer-repo/src/tokens' });
      expect(path.isAbsolute(meta.tierDir)).toBe(false);
      expect(fs.readFileSync(path.join(outputDir, 'meta.json'), 'utf-8')).not.toContain(path.dirname(outputDir));
      // Round-trip: resolving against the index dir recovers the tier the writer was given.
      expect(path.resolve(outputDir, meta.tierDir)).toBe(path.resolve(tierDir));
    });

    it('the package layout (<root>/token-index, <root>/src/tokens) records ../src/tokens', () => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'pkg-root-'));
      const indexDir = path.join(root, 'token-index');
      try {
        generateTokenIndex(indexDir, {
          primitiveTokens: [],
          semanticTokens: [],
          componentTokens: [],
          modeResolved: makeModeResolved(),
          componentSchemaDir: NO_SCHEMA_DIR,
          tierDir: path.join(root, 'src', 'tokens'),
        });

        const meta = JSON.parse(fs.readFileSync(path.join(indexDir, 'meta.json'), 'utf-8'));
        expect(meta).toEqual({ tierDir: '../src/tokens' });
      } finally {
        fs.rmSync(root, { recursive: true, force: true });
      }
    });

    it('relativeTierDir: "." when the tier is the index dir; undefined stays undefined', () => {
      expect(relativeTierDir('/a/b', '/a/b')).toBe('.');
      expect(relativeTierDir('/a/token-index', undefined)).toBeUndefined();
    });

    it('omits tierDir (never writes it as null/undefined) when not provided', () => {
      generateTokenIndex(outputDir, {
        primitiveTokens: [],
        semanticTokens: [],
        componentTokens: [],
        modeResolved: makeModeResolved(),
        componentSchemaDir: NO_SCHEMA_DIR,
      });

      const meta = JSON.parse(fs.readFileSync(path.join(outputDir, 'meta.json'), 'utf-8'));
      expect(meta).toEqual({});
      expect(Object.prototype.hasOwnProperty.call(meta, 'tierDir')).toBe(false);
    });
  });
});
