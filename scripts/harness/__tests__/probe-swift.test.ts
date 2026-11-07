/**
 * probe-swift suite (Spec 129 Task 3.2, 3.3, 3.4). Owner: Kenya.
 *
 * Two subjects, one file, because the iOS lane's logic lives under `harness/ios/` where this config does not
 * select tests (`scripts/jest.config.js` has `rootDir: scripts/`), and the lane's helpers have to run in
 * `lane-functional-root`:
 *
 *   1. the probe generator (`scripts/harness/probe-swift.ts`): reads from the index, the consumer's themes and its
 *      product source; takes every rule from `native-rules.ts` and keeps no copy; counts each group of reads on its own;
 *   2. the lane (`harness/ios/lane.ts`): the invocations, the file selection and floor, the toolchain match, the
 *      self-tests' verdicts, the per-run instance check, and the whole flow of both contexts against a FAKE `swiftc`
 *      (no Xcode needed).
 *
 * What this suite does NOT show, and only a macOS run under the pinned Xcode can: that the real `swiftc` gives
 * the diagnostics the fake gives. The self-test fixtures exist for exactly that, and run on the runner.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { codePointCompare, parsePins as parseComparatorPins } from '../compare';
import { ROOT_TOKEN_FILES } from '../../pack-assert';
import {
  BINDING,
  instanceNames,
  swiftHolderMemberLine,
  swiftHolderOpenLine,
  type ThemeEntry,
} from '../native-rules';
import {
  formatCountLine,
  generateProbe,
  groupOf,
  indexIosNames,
  indexLookup,
  loadIndex,
  loadProductCategories,
  loadProductFiles,
  readsByGroup,
  themeMemberNames,
  type ProbeConfig,
  type TokenIndex,
} from '../probe-swift';
import {
  IOS_CONTEXTS,
  ROOT_TOKEN_SWIFT_FILES,
  TOOLCHAIN_FIELDS,
  checkThemeInstances,
  judgeMissingReturn,
  judgePlanted,
  parseIosPins,
  parseToolchain,
  probeConfigFromManifest,
  runLane,
  selectFiles,
  shellLine,
  swiftcArgs,
  targetTriple,
  toolchainMismatches,
  type CommandResult,
  type IosPins,
  type Runner,
} from '../../../harness/ios/lane';
import { parseSwift } from '../parse-swift';
import { productCategories } from '../native-rules';

const REPO = path.resolve(__dirname, '..', '..', '..');
const FIXTURES = path.join(__dirname, 'fixtures', 'swift');
const THEMES_FIXTURE = path.join(FIXTURES, 'index-themes');
const PRODUCT_FIXTURE = path.join(FIXTURES, 'product');
const PLANTED = path.join(REPO, 'harness', 'ios', 'selftest', 'planted', 'token-index');
const PINS_TEXT = fs.readFileSync(path.join(REPO, 'harness', 'pins.yaml'), 'utf8');

const readConfig = (file: string): ProbeConfig => JSON.parse(fs.readFileSync(path.join(FIXTURES, file), 'utf8')) as ProbeConfig;
const configS = (): ProbeConfig => JSON.parse(fs.readFileSync(path.join(THEMES_FIXTURE, 'config.json'), 'utf8')) as ProbeConfig;
const configC = (): ProbeConfig => readConfig('config-c.json');
const MODULE = 'DPHarnessTokens';
const lines = (src: string): string[] => src.split('\n');

// ─── 1. The probe generator ──────────────────────────────────────────────────────────────────────

describe('probe-swift: the reads come from the index, the themes and the product source', () => {
  const index = loadIndex(THEMES_FIXTURE);
  const products = loadProductCategories(PRODUCT_FIXTURE);
  const probe = generateProbe(index, configS(), { tokenModule: MODULE, products });
  const reads = lines(probe.source).filter((l) => /^ {4}_ = /.test(l));

  it('reads each index name under its root: DesignTokens for primitives and semantics, top-level for components', () => {
    expect(reads).toContain('    _ = DesignTokens.space100');
    expect(reads).toContain('    _ = DesignTokens.Duration.duration150');
    expect(reads).toContain('    _ = DesignTokens.typographyBodyMd');
    expect(reads).toContain('    _ = ProgressTokens.connectorThickness');
  });

  it('reads a list-valued name once per element, and nothing for a name the index gives as null', () => {
    expect(reads).toContain('    _ = DesignTokens.MotionFloatLabel.duration');
    expect(reads).toContain('    _ = DesignTokens.MotionFloatLabel.easing');
    expect(probe.source).not.toContain('elevation200');
  });

  it('reads one theme read per `theme.` colour per instance of the shared module: config S has four', () => {
    expect(probe.instances).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    const themeReads = reads.filter((l) => l.includes('FixtureThemes.'));
    expect(themeReads).toHaveLength(12);
    for (const member of ['colorActionPrimary', 'colorFeedbackErrorText', 'colorCanvas']) {
      for (const instance of probe.instances) expect(themeReads).toContain(`    _ = FixtureThemes.${instance}.${member}`);
    }
    // the old derivation's `darkDark` is gone: `dark` is a mode of the base theme and adds no instance
    expect(probe.source).not.toContain('darkDark');
    expect(probe.source).not.toMatch(/DesignTokens\.theme\./);
  });

  it('config C adds one instance per mode each other theme covers, in config order', () => {
    const c = generateProbe(index, configC(), { tokenModule: MODULE });
    expect(c.instances).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark', 'highContrastLight', 'highContrastDark', 'brandLight', 'defaultDark']);
    expect(c.source.split('\n').filter((l) => /^ {4}_ = FixtureThemes\./.test(l))).toHaveLength(3 * 8);
    expect(c.source).toContain('    _ = FixtureThemes.defaultDark.colorCanvas');
    expect(c.source).not.toContain('brandDark');
    expect(c.source).not.toContain('defaultLight');
  });

  it('reads one value through the environment key the components read, \\.dpTheme', () => {
    expect(reads.filter((l) => l.includes('EnvironmentValues().dpTheme') && !l.includes('dpTheme.'))).toEqual(['    _ = EnvironmentValues().dpTheme']);
  });

  it('holds one static of the theme type, which is a declaration and not a counted read', () => {
    expect(probe.source).toContain('static let theme: any DesignerPunkTheme = FixtureThemes.baseLight');
    expect(probe.source).toMatch(/^private enum ProbeStatics \{/m);
  });

  it('imports the token module by plain import, never testable', () => {
    expect(probe.source).toContain(`import ${MODULE}`);
    expect(probe.source).not.toMatch(/^\s*@testable\s+import/m);
  });

  it('reads the provider and the family from outside the module: the default, then one call per case', () => {
    expect(reads).toContain('    _ = EmptyView().fixtureTheme()');
    expect(reads).toContain('    _ = EmptyView().fixtureTheme(.base)');
    expect(reads).toContain('    _ = EmptyView().fixtureTheme(.wcag)');
    expect(reads.filter((l) => l.includes('EmptyView()'))).toHaveLength(3);
    const c = generateProbe(index, configC(), { tokenModule: MODULE });
    const providerReads = c.source.split('\n').filter((l) => l.includes('EmptyView()'));
    expect(providerReads).toEqual([
      '    _ = EmptyView().fixtureTheme()',
      '    _ = EmptyView().fixtureTheme(.base)',
      '    _ = EmptyView().fixtureTheme(.wcag)',
      '    _ = EmptyView().fixtureTheme(.highContrast)',
      '    _ = EmptyView().fixtureTheme(.brand)',
      '    _ = EmptyView().fixtureTheme(.default)',
    ]);
  });

  it('names the provider from the config name with its first letter lower-cased (the default name too)', () => {
    const d = generateProbe(index, { name: 'DesignerPunk', themes: [] }, { tokenModule: MODULE });
    expect(d.source).toContain('_ = EmptyView().designerPunkTheme()');
    expect(d.source).toContain('_ = DesignerPunkThemes.baseLight.colorCanvas');
  });

  it('prints one compared count line per group; the index-names line is the index\'s count', () => {
    // plain: space100, Duration.duration150, MotionFloatLabel x2, typographyBodyMd, ProgressTokens = 6; theme names 3
    expect(probe.groups.map(formatCountLine)).toEqual([
      'probe: read 9 of 9 index names',
      'probe: instances read 12 of 12',
      'probe: product read 5 of 5',
      'probe: provider read 3 of 3',
      'probe: key read 1 of 1',
    ]);
  });

  it('counts a `theme.` name once in the index-names line, however many instances read it', () => {
    const c = generateProbe(index, configC(), { tokenModule: MODULE });
    expect(groupOf(c, 'index names')).toEqual({ name: 'index names', n: 9, m: 9 });
    expect(groupOf(c, 'instances')).toEqual({ name: 'instances', n: 24, m: 24 });
  });

  it('makes neither a key read nor a static when the index names no theme colour, and prints 0 of 0', () => {
    const plain: TokenIndex = { primitives: index.primitives, semantics: {}, components: index.components };
    const out = generateProbe(plain, configS(), { tokenModule: MODULE, provider: false });
    expect(out.source).not.toContain('dpTheme');
    expect(out.source).not.toContain('ProbeStatics');
    expect(groupOf(out, 'key')).toEqual({ name: 'key', n: 0, m: 0 });
    expect(formatCountLine(groupOf(out, 'instances'))).toBe('probe: instances read 0 of 0');
    expect(out.groups.every((g) => g.n === g.m)).toBe(true);
  });

  it('needs no change to emit more: a new theme-named colour adds reads, a new registered theme adds instances', () => {
    const bigger: TokenIndex = JSON.parse(JSON.stringify(index));
    bigger.semantics['color.brand.accent'] = { platforms: { ios: 'theme.colorBrandAccent' } };
    const more: ProbeConfig = { ...configS(), themes: [...configS().themes, { name: 'night', mode: 'both' }] };
    const out = generateProbe(bigger, more, { tokenModule: MODULE });
    expect(groupOf(out, 'instances')).toEqual({ name: 'instances', n: 4 * 6, m: 4 * 6 });
    expect(out.groups.every((g) => g.n === g.m)).toBe(true);
  });
});

describe('probe-swift: the product reads (Task 3, the product-token criterion)', () => {
  const index = loadIndex(THEMES_FIXTURE);
  const cats = loadProductCategories(PRODUCT_FIXTURE);
  const probe = generateProbe(index, configS(), { tokenModule: MODULE, products: cats });
  const productLines = readsByGroup(probe.source).product;

  it('takes the category from the file name, not from the YAML\'s `category:` field, and splits it at "-" only', () => {
    expect(cats.map((c) => c.category)).toEqual(['brand-colors', 'plain']);
    expect(productLines.some((l) => l.startsWith('ProductBrandColors.'))).toBe(true);
    expect(probe.source).not.toContain('NotThisOne');
  });

  it('reads a static token as Product<Cat>.<key> and a theme member once, through the environment key', () => {
    expect(productLines).toEqual([
      'EnvironmentValues().dpTheme.productBrandColorsAccent',
      'ProductBrandColors.tint',
      'ProductBrandColors.radiusRound',
      'ProductBrandColors.iosOnly',
      'ProductPlain.gap',
    ]);
  });

  it('keeps a token whose platforms list is absent or names ios, and drops one that does not', () => {
    const joined = productLines.join('\n');
    expect(joined).toContain('iosOnly');
    expect(joined).not.toContain('webOnly');
    expect(joined).not.toContain('androidOnly');
    expect(joined).not.toContain('nowhere');
  });

  it('does not read a file in a subfolder, and a file with no tokens key contributes no category', () => {
    expect(probe.source).not.toContain('neverRead');
    expect(probe.source).not.toContain('ProductNotokens');
    expect(loadProductFiles(PRODUCT_FIXTURE).map((f) => f.path)).toEqual(['brand-colors.yaml', 'notokens.yaml', 'plain.yaml']);
  });

  it('a file that does not parse is skipped, as generate skips it', () => {
    const tmp = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'product-'));
    fs.writeFileSync(path.join(tmp, 'broken.yaml'), 'tokens: [this is: not valid\n');
    fs.writeFileSync(path.join(tmp, 'ok.yaml'), 'tokens:\n  a:\n    value: 1\n');
    expect(loadProductFiles(tmp).map((f) => f.path)).toEqual(['broken.yaml', 'ok.yaml']);
    expect(loadProductCategories(tmp).map((c) => c.category)).toEqual(['ok']);
    expect(loadProductCategories(path.join(tmp, 'missing'))).toEqual([]);
  });

  it('counts the product reads on their own line and `n` equals `m`', () => {
    expect(groupOf(probe, 'product')).toEqual({ name: 'product', n: 5, m: 5 });
    expect(formatCountLine(groupOf(probe, 'product'))).toBe('probe: product read 5 of 5');
  });

  it('a key that is not a Swift identifier writes no read, and the count then differs so a check fails', () => {
    const bad = productCategories(loadProductFiles(path.join(FIXTURES, 'product-bad')));
    const out = generateProbe(index, configS(), { tokenModule: MODULE, products: bad });
    expect(out.invalidProduct.map((r) => r.key)).toEqual(['primary-color']);
    expect(out.source).not.toContain('primary-color');
    expect(out.source).toContain('ProductBadkeys.fine');
    expect(groupOf(out, 'product')).toEqual({ name: 'product', n: 1, m: 2 });
  });

  it('over the committed fixture folder the product reads equal the tokens whose platforms list is absent or names ios, counted from the YAML here', () => {
    const dir = path.join(REPO, 'harness', 'fixtures', 'product-tokens');
    const expected: string[] = [];
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.yaml'))) {
      const doc = yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')) as { tokens: Record<string, { platforms?: string[] }> };
      for (const [key, t] of Object.entries(doc.tokens)) if (t.platforms === undefined || t.platforms.includes('ios')) expected.push(key);
    }
    expect(expected.length).toBeGreaterThan(0);
    const repoIndex = loadIndex(path.join(REPO, 'token-index'));
    const out = generateProbe(repoIndex, configS(), { tokenModule: MODULE, products: loadProductCategories(dir) });
    expect(groupOf(out, 'product')).toEqual({ name: 'product', n: expected.length, m: expected.length });
    // the fixture's WCAG-only ref is a theme member and its composite ref is static (design § 4, the access rule)
    const reads = readsByGroup(out.source).product;
    expect(reads.filter((r) => r.startsWith('EnvironmentValues().dpTheme.productHarness'))).toHaveLength(
      expected.includes('actionPrimaryRef') ? 1 : 0,
    );
    expect(reads.filter((r) => r.startsWith('ProductHarness.'))).toHaveLength(expected.length - reads.filter((r) => r.includes('dpTheme.')).length);
  });

  it('the lookup resolves a ref through semantics, then primitives, and reads an unresolvable ref as static', () => {
    const lookup = indexLookup(index);
    expect(lookup('color.action.primary', 'ios')).toBe('theme.colorActionPrimary');
    expect(lookup('space100', 'ios')).toBe('space100');
    expect(lookup('nope', 'ios')).toBeUndefined();
  });
});

describe('probe-swift: it keeps no copy of the shared module\'s rules (3.4)', () => {
  const src = fs.readFileSync(path.join(REPO, 'scripts', 'harness', 'probe-swift.ts'), 'utf8');
  it('imports native-rules and defines none of the old rule functions', () => {
    expect(src).toMatch(/from '\.\/native-rules'/);
    for (const name of ['themeInstances', 'themeHolder', 'themeMemberNames = ']) expect(src).not.toMatch(new RegExp(`function ${name}|const ${name}`));
    expect(src).not.toMatch(/mode === 'both'/);
    expect(src).not.toMatch(/Light`|Dark`/);
  });
  it('its instances equal the module\'s for each fixture config', () => {
    for (const cfg of [configS(), configC(), { name: 'X', themes: [] as ThemeEntry[] }]) {
      const out = generateProbe(loadIndex(THEMES_FIXTURE), cfg, { tokenModule: MODULE });
      expect(out.instances).toEqual(instanceNames(cfg.themes, 'ios'));
    }
  });
});

describe('probe-swift: a group\'s n differs from m when the generator drops or doubles a read', () => {
  const index = loadIndex(THEMES_FIXTURE);
  const probe = generateProbe(index, configS(), { tokenModule: MODULE, products: loadProductCategories(PRODUCT_FIXTURE) });

  it('a dropped read lowers that group\'s n below m', () => {
    const dropped = probe.source.replace('    _ = DesignTokens.space100\n', '');
    expect(readsByGroup(dropped)['index names']).toHaveLength(readsByGroup(probe.source)['index names'].length - 1);
    const droppedInst = probe.source.replace('    _ = FixtureThemes.wcagDark.colorCanvas\n', '');
    expect(readsByGroup(droppedInst).instances).toHaveLength(groupOf(probe, 'instances').m - 1);
    const droppedProduct = probe.source.replace('    _ = ProductPlain.gap\n', '');
    expect(readsByGroup(droppedProduct).product).toHaveLength(groupOf(probe, 'product').m - 1);
  });

  it('a doubled read raises n above m', () => {
    const doubled = probe.source.replace('    _ = EmptyView().fixtureTheme(.wcag)\n', '    _ = EmptyView().fixtureTheme(.wcag)\n    _ = EmptyView().fixtureTheme(.wcag)\n');
    expect(readsByGroup(doubled).provider).toHaveLength(groupOf(probe, 'provider').m + 1);
  });

  it('a name that is not a Swift member path throws, naming the token', () => {
    const bad: TokenIndex = { primitives: { 'space.100': { platforms: { ios: 'space 100' } } }, semantics: {}, components: {} };
    expect(() => generateProbe(bad, configS(), { tokenModule: MODULE })).toThrow(/primitives\.yaml token "space\.100"/);
  });
});

describe('probe-swift: the planted fixture (Task 3: "2 of 2")', () => {
  const index = loadIndex(PLANTED);
  const probe = generateProbe(index, { name: 'Planted', themes: [] }, { tokenModule: MODULE, provider: false });

  it('the planted index gives a read count of 2 of 2 and no other read', () => {
    expect(formatCountLine(groupOf(probe, 'index names'))).toBe('probe: read 2 of 2 index names');
    expect(probe.groups.filter((g) => g.name !== 'index names').every((g) => g.n === 0 && g.m === 0)).toBe(true);
  });

  it('reads the internal member too: the probe reads whatever the declared access level is', () => {
    expect(probe.source).toContain('_ = DesignTokens.plantedInternal');
    expect(probe.source).toContain('_ = DesignTokens.plantedPublic');
  });

  it('the planted token file declares exactly one member without `public`', () => {
    const src = fs.readFileSync(path.join(REPO, 'harness', 'ios', 'selftest', 'planted', 'PlantedTokens.swift'), 'utf8');
    const members = src.split('\n').filter((l) => /^\s+(public )?static let /.test(l));
    expect(members).toHaveLength(2);
    expect(members.filter((l) => !/public /.test(l))).toHaveLength(1);
  });

  it('judges a real-shaped compile: one inaccessible entry passes; none, or another, fails', () => {
    const roots = { gen: '/p', pkg: '/q', probe: '/w/probe' };
    const log = "/w/probe/Probe.swift:6:20: error: 'plantedInternal' is inaccessible due to 'internal' protection level\n";
    const one = parseSwift({ compile: 'ios.P', log, exitCode: 1, roots });
    expect(judgePlanted(one, probe).ok).toBe(true);
    const none = parseSwift({ compile: 'ios.P', log: '', exitCode: 0, roots });
    expect(judgePlanted(none, probe).ok).toBe(false);
    const other = parseSwift({ compile: 'ios.P', log: '/w/probe/Probe.swift:6:20: error: cannot find \'x\' in scope\n', exitCode: 1, roots });
    expect(judgePlanted(other, probe).ok).toBe(false);
    const short = { ...probe, groups: probe.groups.map((g) => (g.name === 'index names' ? { ...g, n: 1 } : g)) };
    expect(judgePlanted(one, short).ok).toBe(false);
  });
});

describe('probe-swift: against the repository\'s committed token index', () => {
  const index = loadIndex(path.join(REPO, 'token-index'));
  const cfg: ProbeConfig = { name: 'HarnessConsumer', themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }] };
  const products = loadProductCategories(path.join(REPO, 'harness', 'fixtures', 'product-tokens'));
  const probe = generateProbe(index, cfg, { tokenModule: MODULE, products });

  it('every group\'s n equals its m', () => {
    for (const g of probe.groups) expect([g.name, g.n]).toEqual([g.name, g.m]);
  });

  it('the index-names line is the index\'s count of distinct iOS names', () => {
    const names = indexIosNames(index);
    expect(groupOf(probe, 'index names').m).toBe(new Set(names.map((n) => n.name)).size);
    expect(themeMemberNames(names).length).toBeGreaterThan(0);
    expect(groupOf(probe, 'instances').m).toBe(new Set(themeMemberNames(names)).size * 4);
  });

  it('every plain name appears exactly once as a read line', () => {
    const set = new Set(lines(probe.source));
    for (const n of indexIosNames(index).filter((x) => !x.name.startsWith('theme.'))) {
      const root = n.file === 'components' ? '' : 'DesignTokens.';
      expect(set.has(`    _ = ${root}${n.name}`)).toBe(true);
    }
  });
});


// ─── 2. The lane ─────────────────────────────────────────────────────────────────────────────────

const parsePins = (text = PINS_TEXT): IosPins => parseIosPins(text);

describe('lane: the pins the invocations are built from', () => {
  const pins = parsePins();

  it('pins ios in harness/pins.yaml: runner, deployment target 17.0, the language modes and every K-6 field', () => {
    expect(pins.runner).toBe('macos-26');
    expect(pins.deploymentTarget).toBe('17.0');
    expect(pins.compile.tokens).toEqual({ module: 'DPHarnessTokens', swiftVersion: '6' });
    expect(pins.compile.probe).toEqual({ module: 'DPHarnessProbe', swiftVersion: '6' });
    expect(pins.compile.components).toEqual({ module: 'DesignerPunk', swiftVersion: '5' });
    expect(Object.keys(pins.toolchain)).toEqual([...TOOLCHAIN_FIELDS]);
    expect(pins.toolchain['xcode.version']).toBe('26.6');
    expect(pins.toolchain['xcode.build']).toBe('17F113');
    expect(pins.toolchain['xcode.app']).toBe('/Applications/Xcode_26.6.app');
  });

  it('states that its pins are harness pins and not minimums, and the iOS target equals Core Goals\' minimum', () => {
    const doc = yaml.load(PINS_TEXT) as { ios: { statement: string; deploymentTarget: string } };
    expect(doc.ios.statement).toMatch(/harness pins, not platform minimums/);
    const coreGoals = fs.readFileSync(path.join(REPO, '.kiro', 'steering', 'core-goals.md'), 'utf8');
    expect(coreGoals).toMatch(/iOS: 17\.0\+/);
    expect(doc.ios.deploymentTarget).toBe('17.0');
  });

  it('refuses a pin section with a missing field, naming it', () => {
    const doc = yaml.load(PINS_TEXT) as { ios: { toolchain: Record<string, string> } };
    delete doc.ios.toolchain['sdk.build'];
    expect(() => parseIosPins(yaml.dump(doc))).toThrow(/ios\.toolchain\.sdk\.build is missing/);
  });

  it('the target triple is arch-apple-ios<deployment target>-simulator', () => {
    expect(targetTriple(pins)).toBe('arm64-apple-ios17.0-simulator');
  });
});

describe('lane: the invocations (Task 3 criteria 1 and 4)', () => {
  const pins = parsePins();
  const base = { pins, sdkPath: '/sdk/iPhoneSimulator.sdk', outDir: '/out/T', files: ['/g/A.ios.swift', '/g/B.ios.swift'] };

  it('Stage T: -emit-module -c -wmo -parse-as-library -module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm', () => {
    const line = shellLine(['swiftc', ...swiftcArgs({ ...base, stage: 'T' })]);
    expect(line).toContain(
      '-emit-module -emit-module-path /out/T/DPHarnessTokens.swiftmodule -c -wmo -parse-as-library -module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm',
    );
    expect(line).toContain('-sdk /sdk/iPhoneSimulator.sdk -target arm64-apple-ios17.0-simulator');
    expect(line.endsWith('-o /out/T/DPHarnessTokens.o /g/A.ios.swift /g/B.ios.swift')).toBe(true);
  });

  it('Stage P: plain import of Stage T\'s folder (-I), Swift 6, no -emit-module', () => {
    const args = swiftcArgs({ ...base, stage: 'P', outDir: '/out/P', moduleDir: '/out/T', files: ['/out/probe/Probe.swift'] });
    const line = args.join(' ');
    expect(line).toContain('-module-name DPHarnessProbe -swift-version 6');
    expect(line).toContain('-I /out/T');
    expect(args).not.toContain('-emit-module');
    expect(() => swiftcArgs({ ...base, stage: 'P' })).toThrow(/moduleDir/);
  });

  it('Stage C and the T5 baseline: module DesignerPunk, Swift 5, the same flags as each other', () => {
    const c = swiftcArgs({ ...base, stage: 'C', outDir: '/out/C' });
    const t5 = swiftcArgs({ ...base, stage: 'T5', outDir: '/out/T5' });
    for (const a of [c, t5]) {
      expect(a.join(' ')).toContain('-c -wmo -parse-as-library -module-name DesignerPunk -swift-version 5 -diagnostic-style llvm');
      expect(a).not.toContain('-emit-module');
    }
    expect(c.filter((x) => x.startsWith('-')).join(' ').replace('/out/C', '')).toBe(t5.filter((x) => x.startsWith('-')).join(' ').replace('/out/T5', ''));
  });

  it('shellLine quotes only the words that need it', () => {
    expect(shellLine(['a', 'b c', "d'e"])).toBe(`a 'b c' 'd'\\''e'`);
  });
});


describe('lane: file order, the root token files and duplicate names (Task 3, Stage C and the floor)', () => {
  const tarball = [
    'dist/ComponentTokens.ios.swift',
    'dist/DesignTokens.ios.swift',
    'src/tokens/platforms/ios/MotionTokens.swift',
    'src/components/core/Zed/platforms/ios/Zed.ios.swift',
    'src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
    'src/components/core/Alpha/platforms/ios/AlphaTests.swift',
    'src/components/core/Alpha/platforms/ios/__tests__/Helper.swift',
    'src/components/core/Beta/platforms/ios/Beta.ios.swift',
    'src/components/core/Beta/platforms/android/Beta.kt',
  ];
  const generated = ['product/ProductTokens.ios.swift', 'DesignTokens.ios.swift', 'ComponentTokens.ios.swift'];
  const sel = selectFiles(tarball, generated);

  it('the files left out are the .swift entries of ROOT_TOKEN_FILES, by name, and the test asserts that equality', () => {
    expect([...ROOT_TOKEN_SWIFT_FILES].sort()).toEqual(ROOT_TOKEN_FILES.filter((f) => f.endsWith('.swift')).sort());
    expect(ROOT_TOKEN_SWIFT_FILES.length).toBeGreaterThan(0);
    expect(sel.dropped.map((d) => d.path).sort()).toEqual(['dist/ComponentTokens.ios.swift', 'dist/DesignTokens.ios.swift']);
    const all = selectFiles([...ROOT_TOKEN_FILES, 'src/x/X.swift'], []);
    expect(all.pkg).toEqual(['src/x/X.swift']);
  });

  it('leaves out every test and every non-Swift file', () => {
    expect(sel.pkg.some((p) => p.includes('Tests.swift') || p.includes('__tests__'))).toBe(false);
    expect(sel.pkg.some((p) => p.endsWith('.kt'))).toBe(false);
  });

  it('sorts each tier by path (code-point order), package first when compiled, with the floor the lengths', () => {
    for (const tier of [sel.pkg, sel.gen]) expect([...tier].sort(codePointCompare)).toEqual(tier);
    expect(sel.pkg).toEqual([
      'src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
      'src/components/core/Beta/platforms/ios/Beta.ios.swift',
      'src/components/core/Zed/platforms/ios/Zed.ios.swift',
      'src/tokens/platforms/ios/MotionTokens.swift',
    ]);
    expect(sel.gen).toEqual(['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']);
    expect(sel.duplicates).toEqual([]);
  });

  it('a native file name two files share is reported with every path, never silently dropped', () => {
    const dup = selectFiles([...tarball, 'src/components/core/Beta/platforms/ios/Alpha.ios.swift'], generated);
    expect(dup.duplicates).toEqual([
      { name: 'Alpha.ios.swift', paths: ['pkg:src/components/core/Alpha/platforms/ios/Alpha.ios.swift', 'pkg:src/components/core/Beta/platforms/ios/Alpha.ios.swift'] },
    ]);
    expect(dup.pkg).toContain('src/components/core/Beta/platforms/ios/Alpha.ios.swift');
    const cross = selectFiles(['src/x/DesignTokens.ios.swift'], ['DesignTokens.ios.swift']);
    expect(cross.duplicates).toEqual([{ name: 'DesignTokens.ios.swift', paths: ['pkg:src/x/DesignTokens.ios.swift', 'gen:DesignTokens.ios.swift'] }]);
  });
});

describe('lane: the per-run instance check (design § 3: fails closed)', () => {
  const themes: ThemeEntry[] = [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }];
  const holder = (names: string[], extra: string[] = []): string =>
    [
      'import SwiftUI',
      `public protocol ${BINDING.swift.themeProtocol}: Sendable {}`,
      swiftHolderOpenLine('Fake'),
      ...names.map((n) => `    public static let ${n}: any ${BINDING.swift.themeProtocol} = Fake${n[0].toUpperCase()}${n.slice(1)}Theme()`),
      ...extra,
      '}',
      '',
    ].join('\n');
  const expected = instanceNames(themes, 'ios');

  it('passes and says how many members equal the module\'s when the holder declares exactly the module\'s instances in order', () => {
    const r = checkThemeInstances([holder(expected)], 'Fake', themes);
    expect(r.ok).toBe(true);
    expect(r.detail).toMatch(/^4 members equal the shared module's instances/);
  });

  it('fails on an extra member, naming it', () => {
    const r = checkThemeInstances([holder([...expected, 'darkDark'])], 'Fake', themes);
    expect(r.ok).toBe(false);
    expect(r.detail).toContain('extra darkDark');
  });

  it('fails on a missing member, naming it', () => {
    const r = checkThemeInstances([holder(expected.filter((n) => n !== 'wcagDark'))], 'Fake', themes);
    expect(r.ok).toBe(false);
    expect(r.detail).toContain('missing wcagDark');
  });

  it('fails on the right members in another order', () => {
    const r = checkThemeInstances([holder([...expected].reverse())], 'Fake', themes);
    expect(r.ok).toBe(false);
    expect(r.detail).toMatch(/different order/);
  });

  it('fails closed on a declared holder from which no member parses (a wrong indent, a name list)', () => {
    const wrongIndent = ['public protocol DesignerPunkTheme: Sendable {}', swiftHolderOpenLine('Fake'), '  public static let baseLight: any DesignerPunkTheme = X()', '}'].join('\n');
    const nameList = ['public protocol DesignerPunkTheme: Sendable {}', swiftHolderOpenLine('Fake'), '    public static let baseLight, baseDark: any DesignerPunkTheme', '}'].join('\n');
    for (const text of [wrongIndent, nameList, holder([])]) {
      const r = checkThemeInstances([text], 'Fake', themes);
      expect(r.ok).toBe(false);
      expect(r.detail).toMatch(/holder found, no members parsed/);
    }
  });

  it('fails when DesignerPunkTheme is declared and no holder is found', () => {
    const r = checkThemeInstances(['public protocol DesignerPunkTheme: Sendable {}\n'], 'Fake', themes);
    expect(r.ok).toBe(false);
    expect(r.detail).toMatch(/no FakeThemes holder was found/);
  });

  it('prints "not checked" and does not fail while the generated Swift declares neither', () => {
    expect(checkThemeInstances(['public struct DesignTokens {}\n'], 'Fake', themes)).toEqual({ ok: true, detail: 'not checked' });
  });

  it('fails on a holder declared twice', () => {
    expect(checkThemeInstances([holder(expected), holder(expected)], 'Fake', themes).ok).toBe(false);
  });

  it('uses the module\'s open line and the member form Task 11 pins (four spaces, public static let, any DesignerPunkTheme)', () => {
    expect(swiftHolderOpenLine('Fake')).toBe('public enum FakeThemes {');
    // the module's line carries the four-space indent since 0e9e1fabe, so it is the pinned form as it stands
    expect(swiftHolderMemberLine('baseLight') + ' X()').toBe('    public static let baseLight: any DesignerPunkTheme = X()');
    expect(checkThemeInstances([['public protocol DesignerPunkTheme: Sendable {}', swiftHolderOpenLine('Fake'), swiftHolderMemberLine('baseLight') + ' X()', '}'].join('\n')], 'Fake', [])).toMatchObject({ ok: false, detail: expect.stringContaining('missing baseDark, wcagLight, wcagDark') });
  });

  it('a config with a custom theme expects its instances too', () => {
    const c: ThemeEntry[] = [...themes, { name: 'high-contrast', mode: 'both' }, { name: 'brand', mode: 'light' }];
    const r = checkThemeInstances([holder(instanceNames(c, 'ios'))], 'Fake', c);
    expect(r.ok).toBe(true);
    expect(r.detail).toMatch(/^7 members/);
  });
});


describe('lane: the toolchain read and match (criterion 7)', () => {
  const texts = {
    xcodebuild: 'Xcode 26.6\nBuild version 17F113\n',
    developerDir: '/Applications/Xcode_26.6.app/Contents/Developer\n',
    sdkVersion: '26.5\n',
    sdkBuild: '23F77\n',
    swift: 'swift-driver version: 1.127.1 Apple Swift version 6.3.1 (swiftlang-6.3.1.4.2 clang-2100.0.1)\nTarget: arm64-apple-macosx26.0\n',
  };
  const observed = parseToolchain(texts);

  it('reads Xcode version, build and app, the SDK version and build, and the Swift driver, version and build', () => {
    expect(observed).toEqual({
      'xcode.version': '26.6',
      'xcode.build': '17F113',
      'xcode.app': '/Applications/Xcode_26.6.app',
      'sdk.version': '26.5',
      'sdk.build': '23F77',
      'swift.driver': '1.127.1',
      'swift.version': '6.3.1',
      'swift.build': 'swiftlang-6.3.1.4.2',
    });
  });

  it('reads the real toolchain output formats of Xcode 27.2 (recorded 2026-11-06)', () => {
    const real = parseToolchain({
      xcodebuild: 'Xcode 27.2\nBuild version 27B52\n',
      developerDir: '/Applications/Xcode.app/Contents/Developer\n',
      sdkVersion: '27.2\n',
      sdkBuild: '24B8118\n',
      swift: 'swift-driver version: 1.168.6 Apple Swift version 6.4.2 (swiftlang-6.4.2.1.9 clang-2100.4.1.1)\nTarget: arm64-apple-macosx26.0\n',
    });
    expect(real['swift.version']).toBe('6.4.2');
    expect(real['swift.build']).toBe('swiftlang-6.4.2.1.9');
    expect(real['swift.driver']).toBe('1.168.6');
  });

  it('throws naming the output it cannot read', () => {
    expect(() => parseToolchain({ ...texts, xcodebuild: 'nope' })).toThrow(/Xcode version/);
    expect(() => parseToolchain({ ...texts, developerDir: '/x/y' })).toThrow(/Contents\/Developer/);
  });

  it('matches when every field equals its pin, and fails on any difference, either direction', () => {
    expect(toolchainMismatches(observed, observed)).toEqual([]);
    expect(toolchainMismatches({ ...observed, 'xcode.build': '17F999' }, observed)).toEqual(['xcode.build: observed "17F999", pinned "17F113"']);
    const lacking = { ...observed };
    delete (lacking as Record<string, string>)['swift.build'];
    expect(toolchainMismatches(lacking, observed)).toHaveLength(1);
    expect(toolchainMismatches({ ...observed, extra: 'x' }, observed)).toEqual(['extra: observed "x", not pinned']);
  });

  it('a pin still holding the UNMEASURED placeholder matches no observed value, so the match fails closed', () => {
    const p = parsePins();
    const placeholders = Object.entries(p.toolchain).filter(([, v]) => v.startsWith('UNMEASURED'));
    // The committed file may or may not still hold placeholders (they are replaced by the first macos-26 read);
    // whatever it holds, each one must show as a mismatch against any real reading.
    const mismatched = toolchainMismatches(observed, p.toolchain).map((m) => m.split(':')[0]);
    for (const [field] of placeholders) expect(mismatched).toContain(field);
    expect(toolchainMismatches(observed, { ...observed, 'sdk.build': 'UNMEASURED: set from the first macos-26 read' })).toEqual([
      'sdk.build: observed "23F77", pinned "UNMEASURED: set from the first macos-26 read"',
    ]);
  });
});

describe('lane: the self-test verdicts (criterion 6, K-4)', () => {
  const roots = { gen: '/st', pkg: '/q', probe: '/w' };
  it('passes on exactly one "missing return" error', () => {
    const r = parseSwift({ compile: 'ios.T', log: "/st/missing-return.swift:9:1: error: missing return in global function expected to return 'Int'\n", exitCode: 1, roots });
    expect(judgeMissingReturn(r).ok).toBe(true);
  });
  it('fails when the compiler accepted the file (it typechecked and did not compile)', () => {
    const r = parseSwift({ compile: 'ios.T', log: '', exitCode: 0, roots });
    const v = judgeMissingReturn(r);
    expect(v.ok).toBe(false);
    expect(v.detail).toMatch(/typechecked and did not compile/);
  });
  it('fails on a different error, or a second one', () => {
    const other = parseSwift({ compile: 'ios.T', log: "/st/missing-return.swift:2:1: error: expected declaration\n", exitCode: 1, roots });
    expect(judgeMissingReturn(other).ok).toBe(false);
    const two = parseSwift({
      compile: 'ios.T',
      log: "/st/missing-return.swift:9:1: error: missing return in global function expected to return 'Int'\n/st/missing-return.swift:3:1: error: expected declaration\n",
      exitCode: 1,
      roots,
    });
    expect(judgeMissingReturn(two).ok).toBe(false);
  });
  it('the fixture is a function that falls off its end, which a typecheck accepts', () => {
    const src = fs.readFileSync(path.join(REPO, 'harness', 'ios', 'selftest', 'missing-return.swift'), 'utf8');
    expect(src).toMatch(/-> Int \{/);
    expect(src).not.toMatch(/^\s*return .*\n\}\s*$/m);
  });
});

// ─── the whole lane against a fake swiftc ───────────────────────────────────────────────────────

interface Fake {
  runner: Runner;
  calls: string[][];
}

type Scenario = {
  /** Does the real Stage T succeed (writing a module)? */
  tokensBuild: boolean;
  /** Does the missing-return fixture give its error? */
  honestCompiler: boolean;
  /** The Swift version string the fake reports. */
  swiftVersion?: string;
};

function fakeRunner(scenario: Scenario, app: string, consumerRoot: string): Fake {
  const calls: string[][] = [];
  const ok = (stdout: string): CommandResult => ({ status: 0, stdout, stderr: '' });
  const runner: Runner = (command, args) => {
    calls.push([command, ...args]);
    if (command === 'xcodebuild') return ok('Xcode 26.6\nBuild version 17F113\n');
    if (command === 'xcode-select') return ok(`${app}/Contents/Developer\n`);
    if (command !== 'xcrun') throw new Error(`unexpected command ${command}`);
    if (args.includes('--show-sdk-version')) return ok('26.5\n');
    if (args.includes('--show-sdk-build-version')) return ok('23F77\n');
    if (args.includes('--show-sdk-path')) return ok('/sdk/iPhoneSimulator.sdk\n');
    if (args[0] !== 'swiftc') throw new Error(`unexpected xcrun ${args.join(' ')}`);
    if (args[1] === '--version') {
      // As the real tool prints it: the `swift-driver version:` line on stderr, the rest on stdout.
      return {
        status: 0,
        stderr: 'swift-driver version: 1.127.1 ',
        stdout: `Apple Swift version ${scenario.swiftVersion ?? '6.3.1'} (swiftlang-6.3.1.4.2 clang-2100.0.1)\nTarget: arm64-apple-macosx26.0\n`,
      };
    }
    // a compile
    const flag = (name: string): string | undefined => {
      const i = args.indexOf(name);
      return i >= 0 ? args[i + 1] : undefined;
    };
    const moduleName = flag('-module-name');
    const firstSource = args.indexOf('-o') + 2;
    const files = args.slice(firstSource);
    const modulePath = flag('-emit-module-path');
    const writeModule = (): void => {
      if (modulePath) {
        fs.mkdirSync(path.dirname(modulePath), { recursive: true });
        fs.writeFileSync(modulePath, 'fake module');
      }
    };
    const fail = (lines: string[]): CommandResult => ({ status: 1, stdout: '', stderr: lines.join('\n') + '\n' });
    if (files.some((f) => f.endsWith('missing-return.swift'))) {
      return scenario.honestCompiler ? fail([`${files[0]}:9:1: error: missing return in global function expected to return 'Int'`]) : ok('');
    }
    if (files.some((f) => f.endsWith('PlantedTokens.swift'))) {
      writeModule();
      return ok('');
    }
    if (moduleName === 'DPHarnessProbe' && files[0].includes(`${path.sep}selftest${path.sep}`)) {
      return fail([`${files[0]}:6:20: error: 'plantedInternal' is inaccessible due to 'internal' protection level`]);
    }
    if (moduleName === 'DPHarnessTokens') {
      if (scenario.tokensBuild) {
        writeModule();
        return ok('');
      }
      return fail([`${files[0]}:133:87: error: consecutive declarations on a line must be separated by ';'`]);
    }
    if (moduleName === 'DPHarnessProbe') return ok('');
    if (moduleName === 'DesignerPunk') {
      const pkgFile = files.find((f) => f.includes('node_modules/@3fn/core/'));
      // Stage C reports a package error and a cross-tier generated error; the T5 baseline (generated files alone) reports only the first generated file's error.
      if (files.some((f) => f.includes('node_modules/@3fn/core/'))) {
        return fail([`${pkgFile}:10:3: error: cannot find 'theme' in scope`, `${consumerRoot}/dist/tokens/DesignTokens.ios.swift:5:1: error: invalid redeclaration of 'x'`]);
      }
      return ok('');
    }
    throw new Error(`unplanned compile of module ${moduleName}`);
  };
  return { runner, calls };
}

interface Rig {
  tmp: string;
  consumer: string;
  out: string;
  pinsPath: string;
  app: string;
  pins: IosPins;
}

function rig(
  opts: { appExists?: boolean; pinSwift?: string; themes?: Array<{ name: string; mode: string }>; duplicate?: boolean; designTokensText?: string; noProducts?: boolean } = {},
): Rig {
  const tmp = fs.mkdtempSync(path.join(fs.realpathSync(os.tmpdir()), 'lane-test-'));
  const app = path.join(tmp, 'Xcode_26.6.app');
  if (opts.appExists !== false) fs.mkdirSync(path.join(app, 'Contents', 'Developer'), { recursive: true });

  const doc = yaml.load(PINS_TEXT) as { ios: { toolchain: Record<string, string> } };
  Object.assign(doc.ios.toolchain, {
    'xcode.app': app,
    'sdk.build': '23F77',
    'swift.driver': '1.127.1',
    'swift.version': opts.pinSwift ?? '6.3.1',
    'swift.build': 'swiftlang-6.3.1.4.2',
  });
  const pinsPath = path.join(tmp, 'pins.yaml');
  fs.writeFileSync(pinsPath, yaml.dump(doc));

  const consumer = path.join(tmp, 'consumer');
  const write = (rel: string, text = ''): void => {
    const p = path.join(consumer, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, text);
  };
  const tarball = [
    'dist/ComponentTokens.ios.swift',
    'dist/DesignTokens.ios.swift',
    'src/blend/ThemeAwareBlendUtilities.ios.swift',
    'src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
    'src/components/core/Alpha/platforms/ios/AlphaTests.swift',
    'src/tokens/platforms/ios/MotionTokens.swift',
    'src/components/core/Alpha/platforms/android/Alpha.kt',
    ...(opts.duplicate ? ['src/components/core/Beta/platforms/ios/Alpha.ios.swift'] : []),
  ];
  for (const t of tarball) write(`node_modules/@3fn/core/${t}`, '// x\n');
  write('harness-tarball-files.txt', tarball.join('\n') + '\n');
  for (const g of ['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']) write(`dist/tokens/${g}`, g === 'DesignTokens.ios.swift' && opts.designTokensText !== undefined ? opts.designTokensText : '// g\n');
  if (!opts.noProducts) {
    for (const f of fs.readdirSync(PRODUCT_FIXTURE).filter((x) => x.endsWith('.yaml'))) write(`product/tokens/${f}`, fs.readFileSync(path.join(PRODUCT_FIXTURE, f), 'utf8'));
    write('product/tokens/sub/ignored.yaml', 'tokens:\n  neverRead:\n    value: 1\n');
  }
  for (const f of ['primitives', 'semantics', 'components']) {
    write(`token-index/${f}.yaml`, fs.readFileSync(path.join(THEMES_FIXTURE, `${f}.yaml`), 'utf8'));
  }
  write(
    'harness-consumer.json',
    JSON.stringify({
      schema: 1,
      name: 'Fake',
      abbreviation: 'HX',
      packageRoot: 'node_modules/@3fn/core',
      package: { name: '@3fn/core', version: '0.0.0', tarball: 't.tgz', tarballSha256: '0', fileList: 'harness-tarball-files.txt' },
      tokenIndex: 'token-index',
      productTokens: 'product/tokens',
      platformOutputs: { web: 'dist/tokens', ios: 'dist/tokens', android: 'dist/tokens' },
      generated: { ios: ['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift'], android: [] },
      themes: opts.themes ?? [{ name: 'dark', mode: 'dark' }],
    }),
  );
  return { tmp, consumer, out: path.join(tmp, 'out'), pinsPath, app, pins: parseIosPins(fs.readFileSync(pinsPath, 'utf8')) };
}

function lane(r: Rig, context: (typeof IOS_CONTEXTS)[number], scenario: Scenario) {
  const fake = fakeRunner(scenario, r.app, fs.realpathSync(r.consumer));
  const lines: string[] = [];
  const outcome = runLane({ context, consumer: r.consumer, out: r.out, pinsPath: r.pinsPath, run: fake.runner, log: (l) => lines.push(l) });
  return { fake, lines, outcome, text: lines.join('\n') };
}

const compiles = (calls: string[][]): string[][] => calls.filter((c) => c[0] === 'xcrun' && c[1] === 'swiftc' && c[2] !== '--version');
const moduleOf = (c: string[]): string => c[c.indexOf('-module-name') + 1];


const readRun = (r: Rig): { swift: Array<Record<string, unknown>>; files: Record<string, { compiled: number; floor: number }>; toolchain: Record<string, string>; roots: Record<string, string>; checks: Array<{ name: string; ok: boolean; detail: string }> } =>
  JSON.parse(fs.readFileSync(path.join(r.out, 'run.json'), 'utf8'));

describe('lane: harness-ios-tokens against a fake swiftc', () => {
  it('while Stage T writes no module: prints "probe: blocked (token module not built)", marks ios.P blocked, still prints and records every count line', () => {
    const r = rig();
    const { lines: out, outcome, fake } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    expect(out).toContain('probe: blocked (token module not built)');
    const run = readRun(r);
    expect(run.swift).toEqual([
      { compile: 'ios.T', log: 'logs/T.txt', exitCode: 1 },
      { compile: 'ios.P', blocked: true },
    ]);
    expect(run.files).toEqual({ gen: { compiled: 3, floor: 3 } });
    expect(run.roots.gen).toBe(path.join(fs.realpathSync(r.consumer), 'dist', 'tokens'));
    expect(run.roots.probe).toBe(path.join(fs.realpathSync(r.out), 'probe'));
    expect(Object.keys(run.toolchain)).toEqual([...TOOLCHAIN_FIELDS]);
    for (const l of [
      'probe: read 9 of 9 index names',
      'probe: instances read 12 of 12',
      'probe: product read 5 of 5',
      'probe: provider read 3 of 3',
      'probe: key read 1 of 1',
    ]) expect(out).toContain(l);
    // each count line and the two other gating results are in the run file's checks, all ok, the blocked ones marked
    expect(run.checks.map((c) => c.name)).toEqual([
      'probe: index names',
      'probe: instances',
      'probe: product',
      'probe: provider',
      'probe: key',
      'harness consumer config',
      'theme instances',
    ]);
    expect(run.checks.every((c) => c.ok)).toBe(true);
    expect(run.checks[0].detail).toBe('read 9 of 9 (blocked)');
    expect(run.checks[6]).toEqual({ name: 'theme instances', ok: true, detail: 'not checked' });
    expect(out).toContain('theme instances: not checked');
    expect(fs.readFileSync(path.join(r.out, 'logs', 'T.txt'), 'utf8')).toContain('consecutive declarations');
    // no compile of the REAL probe ran: only the self-test's planted probe did
    const realP = compiles(fake.calls).filter((c) => moduleOf(c) === 'DPHarnessProbe' && !c.some((a) => a.includes(`${path.sep}selftest${path.sep}`)));
    expect(realP).toHaveLength(0);
    expect(fs.existsSync(path.join(r.out, 'probe', 'Probe.swift'))).toBe(true);
  });

  it('runs each stage\'s self-test first, compiles the generated files in sorted order, then the probe with Stage T\'s folder on -I', () => {
    const r = rig();
    const { fake, text } = lane(r, 'harness-ios-tokens', { tokensBuild: true, honestCompiler: true });
    const order = compiles(fake.calls).map((c) => `${moduleOf(c)}:${path.basename(c[c.length - 1])}`);
    expect(order[0]).toBe('DPHarnessTokens:missing-return.swift');
    const realT = compiles(fake.calls).find((c) => moduleOf(c) === 'DPHarnessTokens' && c.some((a) => a.endsWith('ProductTokens.ios.swift')))!;
    const gen = realT.filter((a) => a.endsWith('.swift')).map((a) => a.slice(a.indexOf('dist/tokens/') + 'dist/tokens/'.length));
    expect(gen).toEqual(['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']);
    expect(text).toContain('Stage T (generated files as a module) invocation: xcrun swiftc -emit-module');
    expect(text).toContain('-module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm');
    expect(text).toContain('Stage T files (3), in the order given to the compiler:');
    expect(text).toContain('floor gen 3; compiled gen 3');
    const realP = compiles(fake.calls).filter((c) => moduleOf(c) === 'DPHarnessProbe' && !c.some((a) => a.includes(`${path.sep}selftest${path.sep}`)));
    expect(realP).toHaveLength(1);
    expect(realP[0].join(' ')).toContain(`-I ${path.join(fs.realpathSync(r.out), 'T')}`);
    expect(text).toContain('probe: read 9 of 9 index names');
    expect(text).not.toContain('probe: blocked');
    expect(readRun(r).checks[0].detail).toBe('read 9 of 9');
  });

  it('DEVELOPER_DIR names the pinned Xcode on every command', () => {
    const r = rig();
    const seen: string[] = [];
    const fake = fakeRunner({ tokensBuild: false, honestCompiler: true }, r.app, fs.realpathSync(r.consumer));
    const spy: Runner = (c, a, env, cwd) => {
      seen.push(String(env.DEVELOPER_DIR));
      return fake.runner(c, a, env, cwd);
    };
    runLane({ context: 'harness-ios-tokens', consumer: r.consumer, out: r.out, pinsPath: r.pinsPath, run: spy, log: () => undefined });
    expect(new Set(seen)).toEqual(new Set([path.join(r.app, 'Contents', 'Developer')]));
  });

  it('runs no `node` process and sets no NODE_PATH: the consumer\'s config is never loaded', () => {
    const r = rig();
    const { fake } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(fake.calls.some((c) => c[0] === 'node')).toBe(false);
    expect(fs.readFileSync(path.join(REPO, 'harness', 'ios', 'lane.ts'), 'utf8')).not.toMatch(/NODE_PATH|loadProbeConfig/);
  });

  it('records a failing instance check in the run file and still exits 0: the comparator fails the context, not the lane', () => {
    const holder = [
      'public protocol DesignerPunkTheme: Sendable {}',
      'public enum FakeThemes {',
      '    public static let baseLight: any DesignerPunkTheme = FakeBaseLightTheme()',
      '    public static let baseDark: any DesignerPunkTheme = FakeBaseDarkTheme()',
      '}',
      '',
    ].join('\n');
    const r = rig({ designTokensText: holder });
    const { outcome, lines: out } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    const check = readRun(r).checks.find((c) => c.name === 'theme instances')!;
    expect(check.ok).toBe(false);
    expect(check.detail).toContain('missing wcagLight, wcagDark');
    expect(out.some((l) => l.startsWith('theme instances: FakeThemes members differ'))).toBe(true);
  });

  it('records a passing instance check when the generated holder is exactly the module\'s four instances', () => {
    const names = ['baseLight', 'baseDark', 'wcagLight', 'wcagDark'];
    const holder = [
      'public protocol DesignerPunkTheme: Sendable {}',
      'public enum FakeThemes {',
      ...names.map((n) => `    public static let ${n}: any DesignerPunkTheme = Fake${n[0].toUpperCase()}${n.slice(1)}Theme()`),
      '}',
      '',
    ].join('\n');
    const r = rig({ designTokensText: holder });
    lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    const check = readRun(r).checks.find((c) => c.name === 'theme instances')!;
    expect(check.ok).toBe(true);
    expect(check.detail).toMatch(/^4 members equal/);
  });

  it('turns a product key that is not a Swift identifier into a failing check naming it, and writes no read for it', () => {
    const r = rig({ noProducts: true });
    fs.mkdirSync(path.join(r.consumer, 'product', 'tokens'), { recursive: true });
    fs.writeFileSync(path.join(r.consumer, 'product', 'tokens', 'badkeys.yaml'), 'tokens:\n  primary-color:\n    value: 1\n  fine:\n    value: 2\n');
    const { outcome } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    const run = readRun(r);
    expect(run.checks.find((c) => c.name === 'probe: product')).toEqual({ name: 'probe: product', ok: false, detail: 'read 1 of 2 (blocked)' });
    expect(run.checks.find((c) => c.name === 'probe: product key')!.detail).toContain('badkeys.primary-color'.replace('badkeys', 'badkeys'));
    expect(fs.readFileSync(path.join(r.out, 'probe', 'Probe.swift'), 'utf8')).not.toContain('primary-color');
  });

  it('reads no product tokens when the manifest has no productTokens, and a missing folder reads as none', () => {
    const r = rig({ noProducts: true });
    lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(readRun(r).checks.find((c) => c.name === 'probe: product')).toEqual({ name: 'probe: product', ok: true, detail: 'read 0 of 0 (blocked)' });
  });

  it('checks the harness consumer\'s own config against the theme-instance rule\'s refusals', () => {
    const r = rig({ themes: [{ name: 'base', mode: 'both' }] });
    const { outcome, text } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    const check = readRun(r).checks.find((c) => c.name === 'harness consumer config')!;
    expect(check.ok).toBe(false);
    expect(check.detail).toContain('refusal (b)');
    expect(text).toContain('FAIL check: harness consumer config, refusal (b)');
  });
});

describe('lane: harness-ios-components against a fake swiftc', () => {
  it('compiles package files then generated files as DesignerPunk, then the generated files alone (T5), and records both floors; its checks array is empty', () => {
    const r = rig();
    const { fake, text, outcome } = lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    const realC = compiles(fake.calls).filter((c) => moduleOf(c) === 'DesignerPunk' && c.some((a) => a.includes('node_modules/@3fn/core/')));
    expect(realC).toHaveLength(1);
    const fileArgs = realC[0].slice(realC[0].indexOf('-o') + 2);
    const rel = fileArgs.map((f) => (f.includes('node_modules/@3fn/core/') ? `pkg:${f.split('node_modules/@3fn/core/')[1]}` : `gen:${f.split('dist/tokens/')[1]}`));
    expect(rel).toEqual([
      'pkg:src/blend/ThemeAwareBlendUtilities.ios.swift',
      'pkg:src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
      'pkg:src/tokens/platforms/ios/MotionTokens.swift',
      'gen:ComponentTokens.ios.swift',
      'gen:DesignTokens.ios.swift',
      'gen:product/ProductTokens.ios.swift',
    ]);
    const run = readRun(r);
    expect(run.swift.map((s) => s.compile)).toEqual(['ios.C', 'ios.T5']);
    expect(run.swift.map((s) => s.exitCode)).toEqual([1, 0]);
    expect(run.files).toEqual({ gen: { compiled: 3, floor: 3 }, pkg: { compiled: 3, floor: 3 } });
    expect(run.checks).toEqual([]);
    expect(text).toContain('left out of the package set: dist/ComponentTokens.ios.swift');
    expect(text).toContain('left out of the package set: dist/DesignTokens.ios.swift');
    expect(text).toContain('floor gen 3, pkg 3; compiled gen 3, pkg 3');
  });

  it('a file the tarball lists but the package lacks lowers "compiled" below the floor, which the comparator fails', () => {
    const r = rig();
    fs.rmSync(path.join(r.consumer, 'node_modules/@3fn/core/src/tokens/platforms/ios/MotionTokens.swift'));
    lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    expect(readRun(r).files.pkg).toEqual({ compiled: 2, floor: 3 });
  });

  it('fails as setup, naming every path, when two files of the set share a native file name', () => {
    const r = rig({ duplicate: true });
    const { outcome, text, fake } = lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(1);
    expect(text).toMatch(/FAIL setup: native file name used twice: Alpha\.ios\.swift \(pkg:src\/components\/core\/Alpha\/platforms\/ios\/Alpha\.ios\.swift and pkg:src\/components\/core\/Beta\/platforms\/ios\/Alpha\.ios\.swift\)/);
    expect(compiles(fake.calls)).toHaveLength(0);
    expect(fs.existsSync(path.join(r.out, 'run.json'))).toBe(false);
  });
});

describe('lane: the themes come from harness-consumer.json, not from loading the consumer\'s config', () => {
  it('reads name and themes from the manifest, in config order, as the module\'s ThemeEntry', () => {
    expect(probeConfigFromManifest({ name: 'Acme', themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }] })).toEqual({
      name: 'Acme',
      themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }],
    });
  });

  it('a manifest with no themes key reads as none', () => {
    expect(probeConfigFromManifest({ name: 'Acme' })).toEqual({ name: 'Acme', themes: [] });
  });

  it('a theme without a string name and mode is a setup fault', () => {
    expect(() => probeConfigFromManifest({ name: 'Acme', themes: [{ name: 'x' } as unknown as { name: string; mode: string }] })).toThrow(/themes\[0\]/);
  });

  it('the probe reads the instances the manifest\'s themes give: a custom theme of both modes adds two', () => {
    const r = rig({ themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }, { name: 'high-contrast', mode: 'both' }] });
    const { lines: out } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    // 3 theme colours x 6 instances = 18
    expect(out).toContain('probe: instances read 18 of 18');
    expect(out).toContain('probe: provider read 4 of 4');
    expect(fs.readFileSync(path.join(r.out, 'probe', 'Probe.swift'), 'utf8')).toContain('_ = FakeThemes.highContrastDark.colorCanvas');
  });
});

describe('lane: what stops it before the comparator, and what no longer does', () => {
  it('a toolchain field that differs from the pin does NOT stop the lane: it records what it read, still compiles, and exits 0', () => {
    const r = rig({ pinSwift: '6.2.0' });
    const { outcome, text, fake } = lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    expect(text).toContain('swift.version: observed "6.3.1", pinned "6.2.0"');
    expect(text).toContain('the comparator fails the context as "toolchain"');
    expect(compiles(fake.calls).length).toBeGreaterThan(0);
    expect(readRun(r).toolchain['swift.version']).toBe('6.3.1');
  });

  it('the comparator fails that run as `toolchain` (the comparator reads the pins at the head)', () => {
    const doc = yaml.load(PINS_TEXT) as { ios: { toolchain: Record<string, string> } };
    const parsed = parseComparatorPins(yaml.dump({ consumer: { name: 'x' }, ios: doc.ios, android: { runner: 'ubuntu-24.04', toolchain: { 'java.version': '17' } } }));
    expect(parsed.errors).toEqual([]);
    expect(Object.keys(parsed.toolchain.ios)).toEqual([...TOOLCHAIN_FIELDS]);
  });

  it('fails as "toolchain missing" when the pinned app folder is absent, with no run file', () => {
    const r = rig({ appExists: false });
    const { outcome, text, fake } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(1);
    expect(text).toMatch(/FAIL toolchain missing: .* does not exist on this runner/);
    expect(fake.calls).toHaveLength(0);
  });

  it('fails as "self-test" when the compiler accepts the missing-return fixture, with no run file', () => {
    const r = rig();
    const { outcome, text, fake } = lane(r, 'harness-ios-tokens', { tokensBuild: true, honestCompiler: false });
    expect(outcome.exit).toBe(1);
    expect(text).toMatch(/FAIL self-test: Stage T: missing-return fixture: expected exactly one error, got 0/);
    expect(compiles(fake.calls).every((c) => c[c.length - 1].endsWith('missing-return.swift'))).toBe(true);
    expect(fs.existsSync(path.join(r.out, 'run.json'))).toBe(false);
  });

  it('the same self-test stops the component context under its own flags', () => {
    const r = rig();
    const { outcome, text } = lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: false });
    expect(outcome.exit).toBe(1);
    expect(text).toMatch(/FAIL self-test: Stage C:/);
  });
});

