/**
 * @jest-environment node
 * @category evergreen
 * @purpose R1-7 (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md`; ruling 2026-10-23 § 4):
 *   `generate`'s token-index consumer map reads the SAME component universe the Application
 *   MCP serves — the consumer's components AND DesignerPunk's, consumer first, one component
 *   per declared name — through `resolveComponentRoots` + `resolveComponentSources`. Before,
 *   it read only the consumer's own schemas (the retired `resolveComponentSchemaDir`, whose
 *   born-repo cases from `.kiro/issues/2026-09-26-product-server-component-root.md` are kept
 *   below as union cases), so a born repo's index never counted DesignerPunk's components.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { resolveGenerateComponentRoots } from '../designerpunk';
import { resolveComponentSources } from '../shared/componentSources';
import { generateTokenIndex } from '../../generators/generateTokenIndex';
import type { DesignSystemRoot } from '../shared/bornRepo';
import type { SemanticToken } from '../../types/SemanticToken';

function writeComponent(root: string, dir: string, name: string, tokens: string[] = []): void {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
  fs.writeFileSync(path.join(root, dir, 'component-meta.yaml'), `purpose: ${name} fixture\n`);
  const tokenLines = tokens.length ? ['tokens:', '  color:', ...tokens.map(t => `    - ${t}`)] : [];
  fs.writeFileSync(path.join(root, dir, `${dir}.schema.yaml`), [`name: ${name}`, ...tokenLines].join('\n') + '\n');
}

function ds(state: DesignSystemRoot['state'], root: string | null): DesignSystemRoot {
  return { state, root, tierDir: null, signals: { config: true, tier: true, manifest: false, legacyManifest: false } };
}

function semantic(name: string): SemanticToken {
  return { name, category: 'color', description: '', primitiveReferences: { value: 'cyan300' }, context: '' } as SemanticToken;
}

describe('resolveGenerateComponentRoots + resolveComponentSources (generate reads the union)', () => {
  let tmp: string;
  let pkgRoot: string;
  let pkgComponents: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'generate-component-roots-'));
    // A fake installed package: node_modules/@3fn/core/src/components/core/<Name>/.
    pkgRoot = path.join(tmp, 'consumer', 'node_modules', '@3fn', 'core');
    pkgComponents = path.join(pkgRoot, 'src', 'components', 'core');
    writeComponent(pkgComponents, 'Button-CTA', 'Button-CTA', ['color.action.primary']);
    writeComponent(pkgComponents, 'Avatar-Base', 'Avatar-Base', ['color.identity.human']);
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  it('BORN repo: the roots are the consumer root then the package root', () => {
    const bornRoot = path.join(tmp, 'consumer');
    expect(resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot)).toEqual([
      path.join(bornRoot, 'src', 'components'),
      path.resolve(pkgComponents),
    ]);
  });

  it('BORN repo: a consumer component directly under src/components/ is in the universe, with every package component', () => {
    const bornRoot = path.join(tmp, 'consumer');
    writeComponent(path.join(bornRoot, 'src', 'components'), 'MyButton', 'MyButton');
    fs.writeFileSync(path.join(bornRoot, 'src', 'components', 'README.md'), '# Your components\n');

    const names = resolveComponentSources(resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot)).winners.map(w => w.declaredName);
    expect(names).toEqual(['MyButton', 'Avatar-Base', 'Button-CTA']);
  });

  it('BORN repo, freshly born (README only): the package components alone', () => {
    const bornRoot = path.join(tmp, 'consumer');
    fs.mkdirSync(path.join(bornRoot, 'src', 'components'), { recursive: true });
    fs.writeFileSync(path.join(bornRoot, 'src', 'components', 'README.md'), '# Your components\n');

    const names = resolveComponentSources(resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot)).winners.map(w => w.declaredName);
    expect(names).toEqual(['Avatar-Base', 'Button-CTA']);
  });

  it('BORN repo, legacy pre-123 layout (src/components/core/<Name>/): read as one legacy level of the consumer root, with a warning', () => {
    const bornRoot = path.join(tmp, 'consumer');
    writeComponent(path.join(bornRoot, 'src', 'components', 'core'), 'LegacyButton', 'LegacyButton');

    const result = resolveComponentSources(resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot));
    const legacy = result.winners.find(w => w.declaredName === 'LegacyButton');
    expect(legacy).toMatchObject({ rank: 0, legacy: true });
    expect(result.warnings.some(w => w.startsWith('Legacy component level:'))).toBe(true);
  });

  it('PACKAGE-MODE (the steward repo at its own root): the package root alone — <repo>/src/components/core, as before', () => {
    expect(resolveGenerateComponentRoots(ds('package-mode', pkgRoot), pkgRoot)).toEqual([path.resolve(pkgComponents)]);
  });

  it('UNBORN: the package root alone, as the MCP serves it', () => {
    expect(resolveGenerateComponentRoots(ds('unborn', null), pkgRoot)).toEqual([path.resolve(pkgComponents)]);
  });

  it('a consumer component declaring the same name as a package component replaces it (the declared name, not the directory)', () => {
    const bornRoot = path.join(tmp, 'consumer');
    // Different directory name, same declared name: precedence keys on `name`.
    writeComponent(path.join(bornRoot, 'src', 'components'), 'MyCTA', 'Button-CTA', ['color.brand.accent']);

    const result = resolveComponentSources(resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot));
    const cta = result.winners.filter(w => w.declaredName === 'Button-CTA');
    expect(cta).toHaveLength(1);
    expect(cta[0].dirPath).toBe(path.join(bornRoot, 'src', 'components', 'MyCTA'));
    expect(result.shadowed.map(s => s.source.dirPath)).toEqual([path.join(pkgComponents, 'Button-CTA')]);
  });

  it('the generated index counts a package component, a consumer component, and only the consumer\'s fork of an overridden one', () => {
    const bornRoot = path.join(tmp, 'consumer');
    const consumerComponents = path.join(bornRoot, 'src', 'components');
    writeComponent(consumerComponents, 'Pricing-Card', 'PricingCard', ['color.action.primary']);
    // The consumer's Button-CTA no longer declares color.action.primary; it declares color.brand.accent.
    writeComponent(consumerComponents, 'Button-CTA', 'Button-CTA', ['color.brand.accent']);
    const outDir = path.join(bornRoot, 'token-index');
    jest.spyOn(console, 'log').mockImplementation(() => {});

    try {
      generateTokenIndex(outDir, {
        primitiveTokens: [],
        semanticTokens: [semantic('color.action.primary'), semantic('color.identity.human'), semantic('color.brand.accent')],
        componentTokens: [],
        modeResolved: { resolvedLight: [], resolvedDark: [], themeVaryingTokens: new Set(), nativeThemeVaryingTokens: new Set(), primitiveOklch: new Map() } as any,
        componentSchemaDir: resolveGenerateComponentRoots(ds('born', bornRoot), pkgRoot),
      });
    } finally {
      jest.restoreAllMocks();
    }

    const tokens = (yaml.load(fs.readFileSync(path.join(outDir, 'semantics.yaml'), 'utf-8')) as any).tokens;
    // A package component the consumer never copied is a consumer (R1-7).
    expect(tokens['color.identity.human'].consumers).toEqual(['Avatar-Base']);
    // The consumer's own component is a consumer.
    expect(tokens['color.action.primary'].consumers).toEqual(['PricingCard']);
    // The fork replaces the package's Button-CTA: the package schema's declaration is not counted.
    expect(tokens['color.brand.accent'].consumers).toEqual(['Button-CTA']);
    expect(tokens['color.action.primary'].consumers).not.toContain('Button-CTA');
  });
});
