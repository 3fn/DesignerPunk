/**
 * @jest-environment node
 * @category evergreen
 * @purpose Shape (c) of `.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`
 *   (Peter's ruling, 2026-10-25): in a consumer repo, `generate` merges the installed package's
 *   shipped `token-index/components.yaml` entries for every package component the consumer has not
 *   replaced (the same-name precedence of `resolveComponentSources`), each tagged with the package
 *   version it came from; and `sync` reports an index left behind by an upgrade.
 *   Owner: Ada (`src/generators/generateTokenIndex.ts`, `src/cli/**`). Lina consulted (her
 *   components' entries); Thurgood consulted (the shared resolver).
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { generateTokenIndex } from '../../generators/generateTokenIndex';
import { resolveGenerateComponentRoots } from '../designerpunk';
import {
  readPackageComponentTokenIndex,
  assessIndexedPackageComponentTokens,
  mergePackageComponentTokens,
} from '../shared/packageComponentTokens';
import { resolveComponentSources } from '../shared/componentSources';
import { tokenIndexBehindPackageMessage } from '../shared/errorCatalog';
import { runSync } from '../sync';
import type { DesignSystemRoot } from '../shared/bornRepo';
import type { RegisteredComponentToken } from '../../registries/ComponentTokenRegistry';
import { createScratch, setupPackage, writeFile } from './syncTestKit';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';

const platforms = (web: string, enumProp: string) => ({ web, ios: enumProp, android: enumProp });

/** The package's shipped component-token index, as its own build writes it. */
const SHIPPED = {
  tokens: {
    'progress.node.size.md': { component: 'Progress', primitiveReferences: { value: 'size200' }, platforms: platforms('--progress-node-size-md', 'ProgressTokens.nodeSizeMd'), consumers: ['Progress-Indicator-Node-Base'] },
    'avatar.size.md': { component: 'Avatar', definedBy: 'Avatar-Base', primitiveReferences: { value: 'size500' }, platforms: platforms('--avatar-size-md', 'AvatarTokens.sizeMd'), consumers: ['Avatar-Base'] },
    'buttonicon.size.medium': { component: 'ButtonIcon', definedBy: 'Button-Icon', primitiveReferences: { value: 'size300' }, platforms: platforms('--buttonicon-size-medium', 'ButtonIconTokens.sizeMedium'), consumers: ['Button-Icon'] },
  },
};

function component(root: string, dir: string, name: string, tokens: string[]): void {
  writeFile(root, `${dir}/contracts.yaml`, `component: ${name}\n`);
  writeFile(root, `${dir}/${dir}.schema.yaml`, [`name: ${name}`, 'tokens:', '  size:', ...tokens.map(t => `    - ${t}`)].join('\n') + '\n');
}

/** A consumer repo with a fake installed `@3fn/core` carrying the shipped index and two components. */
function consumer(version = '16.1.0'): { scratch: string; pkgRoot: string } {
  const scratch = createScratch('dp-pkg-ctokens-');
  const pkgRoot = setupPackage(scratch, { version, files: { 'token-index/components.yaml': yaml.dump(SHIPPED) } });
  const pkgComponents = path.join(pkgRoot, 'src', 'components', 'core');
  component(pkgComponents, 'Avatar-Base', 'Avatar-Base', ['avatar.size.md']);
  component(pkgComponents, 'Button-Icon', 'Button-Icon', ['buttonicon.size.medium']);
  writeFile(scratch, 'designerpunk.config.ts', "export default { name: 'Acme', abbreviation: 'AC', tokenSource: './src/tokens', output: './build/tokens' };\n");
  writeFile(scratch, 'src/tokens/semantic/ColorTokens.ts', 'export const mine = 1;\n');
  fs.mkdirSync(path.join(scratch, 'src', 'components'), { recursive: true });
  return { scratch, pkgRoot };
}

const born = (root: string): DesignSystemRoot => ({ state: 'born', root, tierDir: null, signals: { config: true, tier: true, manifest: false, legacyManifest: false } });

const own = (name: string, componentName: string, primitiveReference: string): RegisteredComponentToken =>
  ({ name, component: componentName, family: 'size', value: 0, primitiveReference, reasoning: 'fixture' });

/** `generate`'s index step as `runGenerate` calls it, over the consumer's own component tokens. */
function generate(scratch: string, pkgRoot: string, componentTokens: RegisteredComponentToken[] = [], files = new Map<string, string>()) {
  const shipped = readPackageComponentTokenIndex(pkgRoot);
  const result = generateTokenIndex(path.join(scratch, 'token-index'), {
    primitiveTokens: [],
    semanticTokens: [],
    componentTokens,
    modeResolved: { resolvedLight: [], resolvedDark: [], themeVaryingTokens: new Set(), nativeThemeVaryingTokens: new Set(), primitiveOklch: new Map() } as any,
    componentSchemaDir: resolveGenerateComponentRoots(born(scratch), pkgRoot),
    componentTokenFiles: files,
    ...(shipped.index ? { packageComponentTokens: shipped.index } : {}),
  });
  const index = (yaml.load(fs.readFileSync(path.join(scratch, 'token-index', 'components.yaml'), 'utf-8')) as any).tokens;
  return { result, index };
}

const assess = (scratch: string, pkgRoot: string) =>
  assessIndexedPackageComponentTokens({
    tokenIndexDir: path.join(scratch, 'token-index'),
    packageRoot: pkgRoot,
    componentRoots: resolveGenerateComponentRoots(born(scratch), pkgRoot),
  });

describe('generate — DesignerPunk\'s component tokens in a consumer\'s token index (shape (c))', () => {
  beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it('merges a package component\'s tokens with the package\'s references and platform names, tagged with the package version', () => {
    const { scratch, pkgRoot } = consumer();
    const { index } = generate(scratch, pkgRoot);
    expect(index['avatar.size.md']).toEqual({
      component: 'Avatar',
      definedBy: 'Avatar-Base',
      primitiveReferences: { value: 'size500' },
      platforms: platforms('--avatar-size-md', 'AvatarTokens.sizeMd'),
      consumers: ['Avatar-Base'],
      source: { package: '@3fn/core', version: '16.1.0' },
    });
    expect(index['buttonicon.size.medium'].source).toEqual({ package: '@3fn/core', version: '16.1.0' });
  });

  it('counts consumers over this repo\'s universe, not the package\'s list: the package\'s schema declaration resolves', () => {
    const { scratch, pkgRoot } = consumer();
    // The consumer's own component reads DesignerPunk's Avatar token as well.
    component(path.join(scratch, 'src', 'components'), 'Profile-Card', 'Profile-Card', ['avatar.size.md']);
    const { index, result } = generate(scratch, pkgRoot);
    expect(index['avatar.size.md'].consumers).toEqual(['Profile-Card', 'Avatar-Base']);
    expect(result.unresolved.map(r => r.token)).not.toContain('avatar.size.md');
  });

  it('does not merge the tokens of a package component the consumer replaced (same declared name)', () => {
    const { scratch, pkgRoot } = consumer();
    component(path.join(scratch, 'src', 'components'), 'Avatar-Base', 'Avatar-Base', ['avatar.size.md']);
    const { index, result } = generate(scratch, pkgRoot);
    expect(index['avatar.size.md']).toBeUndefined();
    expect(index['buttonicon.size.medium']).toBeDefined();
    // The fork declares a token its own token source does not define: warned as the consumer's.
    expect(result.unresolved).toEqual([expect.objectContaining({ token: 'avatar.size.md', component: 'Avatar-Base', rank: 0 })]);
  });

  it('the consumer\'s own token of the same name wins, untagged', () => {
    const { scratch, pkgRoot } = consumer();
    const { index } = generate(scratch, pkgRoot, [own('buttonicon.size.medium', 'ButtonIcon', 'size400')]);
    expect(index['buttonicon.size.medium'].primitiveReferences).toEqual({ value: 'size400' });
    expect(index['buttonicon.size.medium']).not.toHaveProperty('source');
    expect(Object.keys(index).filter(k => k === 'buttonicon.size.medium')).toHaveLength(1);
  });

  it('never merges the token-source tier (no definedBy, e.g. the Progress tokens init copies)', () => {
    const { scratch, pkgRoot } = consumer();
    const { index } = generate(scratch, pkgRoot);
    expect(index['progress.node.size.md']).toBeUndefined();
  });

  it('writes definedBy from the file a token was harvested from; none for the token-source tier', () => {
    const { scratch, pkgRoot } = consumer();
    const mine = path.join(scratch, 'src', 'components');
    component(mine, 'Price-Tag', 'Price-Tag', []);
    const files = new Map([
      ['pricetag.inset', path.join(mine, 'Price-Tag', 'priceTag.tokens.ts')],
      ['progress.node.size.md', path.join(scratch, 'src', 'tokens', 'component', 'progress.ts')],
    ]);
    const { index } = generate(scratch, pkgRoot, [own('pricetag.inset', 'PriceTag', 'space100'), own('progress.node.size.md', 'Progress', 'size200')], files);
    expect(index['pricetag.inset'].definedBy).toBe('Price-Tag');
    expect(index['progress.node.size.md']).not.toHaveProperty('definedBy');
  });

  it('the merge rule is the resolver\'s: an entry whose definer is not a package winner is not merged', () => {
    const { scratch, pkgRoot } = consumer();
    component(path.join(scratch, 'src', 'components'), 'My-Avatar', 'Avatar-Base', []); // another dir, same declared name
    const pkg = readPackageComponentTokenIndex(pkgRoot).index!;
    const merged = mergePackageComponentTokens(pkg, resolveComponentSources(resolveGenerateComponentRoots(born(scratch), pkgRoot)), new Set());
    expect(merged.map(m => m.name)).toEqual(['buttonicon.size.medium']);
  });

  it('skips a shipped entry with no platform names rather than writing a half entry', () => {
    const { scratch, pkgRoot } = consumer();
    const pkg = readPackageComponentTokenIndex(pkgRoot).index!;
    pkg.tokens['avatar.size.lg'] = { component: 'Avatar', definedBy: 'Avatar-Base' };
    const merged = mergePackageComponentTokens(pkg, resolveComponentSources(resolveGenerateComponentRoots(born(scratch), pkgRoot)), new Set());
    expect(merged.map(m => m.name)).toEqual(['avatar.size.md', 'buttonicon.size.medium']);
  });

  it('a damaged install (no shipped index) reads as a reason, not a throw', () => {
    const { pkgRoot } = consumer();
    fs.rmSync(path.join(pkgRoot, 'token-index'), { recursive: true });
    const read = readPackageComponentTokenIndex(pkgRoot);
    expect(read.index).toBeNull();
    expect(read.reason).toBe('token-index/components.yaml is not there');
  });
});

describe('the token index against the installed package (the staleness check sync reads)', () => {
  beforeEach(() => jest.spyOn(console, 'log').mockImplementation(() => {}));
  afterEach(() => jest.restoreAllMocks());

  it('current right after generate', () => {
    const { scratch, pkgRoot } = consumer();
    generate(scratch, pkgRoot);
    expect(assess(scratch, pkgRoot)).toEqual({ state: 'current' });
  });

  it('an upgrade without a new generate is stale, naming the version the entries came from', () => {
    const { scratch, pkgRoot } = consumer('16.1.0');
    generate(scratch, pkgRoot);
    fs.writeFileSync(path.join(pkgRoot, 'package.json'), JSON.stringify({ name: '@3fn/core', version: '16.2.0' }));
    expect(assess(scratch, pkgRoot)).toEqual({
      state: 'stale',
      packageName: '@3fn/core',
      installedVersion: '16.2.0',
      indexedVersions: ['16.1.0'],
      missing: 0,
      example: 'avatar.size.md',
    });
    generate(scratch, pkgRoot);
    expect(assess(scratch, pkgRoot)).toEqual({ state: 'current' });
  });

  it('an index written before shape (c) (no tagged entries) is stale: it lacks what the installed version adds', () => {
    const { scratch, pkgRoot } = consumer();
    writeFile(scratch, 'token-index/components.yaml', yaml.dump({ tokens: { 'progress.node.size.md': SHIPPED.tokens['progress.node.size.md'] } }));
    expect(assess(scratch, pkgRoot)).toEqual({
      state: 'stale', packageName: '@3fn/core', installedVersion: '16.1.0', indexedVersions: [], missing: 2, example: 'avatar.size.md',
    });
  });

  it('a replaced component\'s tokens are not expected', () => {
    const { scratch, pkgRoot } = consumer();
    writeFile(scratch, 'token-index/components.yaml', yaml.dump({ tokens: {} }));
    component(path.join(scratch, 'src', 'components'), 'Avatar-Base', 'Avatar-Base', []);
    expect(assess(scratch, pkgRoot)).toMatchObject({ state: 'stale', missing: 1, example: 'buttonicon.size.medium' });
  });

  it('no token index yet: nothing to judge', () => {
    const { scratch, pkgRoot } = consumer();
    expect(assess(scratch, pkgRoot)).toEqual({ state: 'no-index' });
  });
});

describe('sync reports a token index an upgrade left behind (report only)', () => {
  let logSpy: jest.SpyInstance;
  beforeEach(() => { logSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); });
  afterEach(() => jest.restoreAllMocks());

  it('names the versions, counts it as still to do, and writes nothing to token-index/', async () => {
    const { scratch, pkgRoot } = consumer('16.1.0');
    generate(scratch, pkgRoot);
    fs.writeFileSync(path.join(pkgRoot, 'package.json'), JSON.stringify({ name: '@3fn/core', version: '16.2.0' }));
    const before = fs.readFileSync(path.join(scratch, 'token-index', 'components.yaml'), 'utf-8');
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, configLoader: jestConfigModuleLoader });
    expect(out.tokenIndex).toMatchObject({ state: 'stale', indexedVersions: ['16.1.0'], installedVersion: '16.2.0' });
    const line = tokenIndexBehindPackageMessage({ packageName: '@3fn/core', installedVersion: '16.2.0', indexedVersions: ['16.1.0'], missing: 0, example: 'avatar.size.md' });
    expect(line).toBe(
      "your token-index/ holds DesignerPunk's component tokens from @3fn/core 16.1.0, and 16.2.0 is installed, so get_token_details answers for them (for example avatar.size.md) from the older version. Run `npx designerpunk generate` to rebuild it. Nothing was changed.",
    );
    const report = out.report.join('\n');
    expect(report).toContain(line);
    expect(report).toContain('running npx designerpunk generate (your token-index/ is behind the installed package)');
    expect(fs.readFileSync(path.join(scratch, 'token-index', 'components.yaml'), 'utf-8')).toBe(before);
  });

  it('says nothing when the index is current', async () => {
    const { scratch, pkgRoot } = consumer();
    generate(scratch, pkgRoot);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, configLoader: jestConfigModuleLoader });
    expect(out.tokenIndex).toEqual({ state: 'current' });
    expect(out.report.join('\n')).not.toContain('token-index/');
  });
});
