/**
 * probe-swift suite (Spec 129 Task 3.2, 3.3). Owner: Kenya.
 *
 * Two subjects, one file, because the iOS lane's logic lives under `harness/ios/` where this config does not
 * select tests (`scripts/jest.config.js` has `rootDir: scripts/`), and the lane's helpers have to run in
 * `lane-functional-root`:
 *
 *   1. the probe generator (`scripts/harness/probe-swift.ts`): reads from the index and the config, the read
 *      count n equals the index's m, one theme read per `theme.` colour per registered theme instance, one read
 *      through `\.dpTheme`, nothing hard-coded to item (i);
 *   2. the lane (`harness/ios/lane.ts`): the invocations, the file order and floor, the toolchain match, the
 *      self-tests' verdicts, and the whole flow of both contexts against a FAKE `swiftc` (no Xcode needed).
 *
 * What this suite does NOT show, and only a macOS run under the pinned Xcode can: that the real `swiftc` gives
 * the diagnostics the fake gives. The self-test fixtures exist for exactly that, and run on the runner.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { codePointCompare } from '../compare';
import {
  countProbeReads,
  expectedReadCount,
  formatReadCount,
  generateProbe,
  indexIosNames,
  loadIndex,
  themeInstances,
  themeMemberNames,
  type ProbeConfig,
  type TokenIndex,
} from '../probe-swift';
import {
  IOS_CONTEXTS,
  TOOLCHAIN_FIELDS,
  judgeMissingReturn,
  judgePlanted,
  parseIosPins,
  parseToolchain,
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

const REPO = path.resolve(__dirname, '..', '..', '..');
const FIXTURES = path.join(__dirname, 'fixtures', 'swift');
const THEMES_FIXTURE = path.join(FIXTURES, 'index-themes');
const PLANTED = path.join(REPO, 'harness', 'ios', 'selftest', 'planted', 'token-index');
const PINS_TEXT = fs.readFileSync(path.join(REPO, 'harness', 'pins.yaml'), 'utf8');

const config = (): ProbeConfig => JSON.parse(fs.readFileSync(path.join(THEMES_FIXTURE, 'config.json'), 'utf8')) as ProbeConfig;
const MODULE = 'DPHarnessTokens';

// ─── 1. The probe generator ──────────────────────────────────────────────────────────────────────

describe('probe-swift: the reads come from the index and the config', () => {
  const index = loadIndex(THEMES_FIXTURE);
  const probe = generateProbe(index, config(), { tokenModule: MODULE });
  const reads = probe.source.split('\n').filter((l) => /^ {4}_ = /.test(l));

  it('reads each name under its root: DesignTokens for primitives and semantics, top-level for components', () => {
    expect(reads).toContain('    _ = DesignTokens.space100');
    expect(reads).toContain('    _ = DesignTokens.Duration.duration150');
    expect(reads).toContain('    _ = DesignTokens.typographyBodyMd');
    expect(reads).toContain('    _ = ProgressTokens.connectorThickness');
  });

  it('reads a list-valued name once per element', () => {
    expect(reads).toContain('    _ = DesignTokens.MotionFloatLabel.duration');
    expect(reads).toContain('    _ = DesignTokens.MotionFloatLabel.easing');
  });

  it('makes no read for a name the index gives as null', () => {
    expect(probe.source).not.toContain('elevation200');
  });

  it('reads one theme read per theme-named colour per registered theme instance', () => {
    // 3 `theme.` colours x 4 instances (baseLight, baseDark, darkDark, wcagLight) = 12
    expect(themeInstances(config())).toEqual(['baseLight', 'baseDark', 'darkDark', 'wcagLight']);
    const themeReads = reads.filter((l) => l.includes('FixtureThemes.'));
    expect(themeReads).toHaveLength(12);
    for (const member of ['colorActionPrimary', 'colorFeedbackErrorText', 'colorCanvas']) {
      for (const instance of ['baseLight', 'baseDark', 'darkDark', 'wcagLight']) {
        expect(themeReads).toContain(`    _ = FixtureThemes.${instance}.${member}`);
      }
    }
    // a `theme.` name is never read as a DesignTokens member
    expect(probe.source).not.toMatch(/DesignTokens\.theme\./);
    expect(probe.source).not.toMatch(/DesignTokens\.colorActionPrimary/);
  });

  it('reads one value through the environment key the components read, \\.dpTheme', () => {
    expect(reads.filter((l) => l.includes('EnvironmentValues().dpTheme'))).toEqual(['    _ = EnvironmentValues().dpTheme']);
  });

  it('holds one static of the theme type, which is a declaration and not a counted read', () => {
    expect(probe.source).toContain('static let theme: any DesignerPunkTheme = FixtureThemes.baseLight');
    expect(probe.source).toMatch(/^private enum ProbeStatics \{/m);
    expect(countProbeReads(probe.source)).toBe(reads.length);
  });

  it('imports the token module by plain import, never @testable', () => {
    expect(probe.source).toContain(`import ${MODULE}`);
    expect(probe.source).not.toMatch(/^\s*@testable\s+import/m);
  });

  it('counts n from its own text and m from the index and the config, and they are equal', () => {
    // plain: space100, Duration.duration150, MotionFloatLabel x2, typographyBodyMd, ProgressTokens = 6; theme 3 x 4 = 12; key 1
    expect(probe.expected).toBe(6 + 12 + 1);
    expect(probe.read).toBe(probe.expected);
    expect(probe.counts).toEqual({ primitives: 2, semantics: 3, components: 1, themeColours: 3, themeInstances: 4, key: 1 });
    expect(formatReadCount(probe)).toBe(
      'probe: read 19 of 19 index names (primitives 2, semantics 3, components 1, theme 3\u00d74, key 1)',
    );
  });

  it('needs no change to emit more: a new theme-named colour and a new registered theme add reads', () => {
    const bigger: TokenIndex = JSON.parse(JSON.stringify(index));
    bigger.semantics['color.brand.accent'] = { platforms: { ios: 'theme.colorBrandAccent' } };
    const more: ProbeConfig = { ...config(), themes: [...config().themes, { name: 'night', mode: 'both' }] };
    const out = generateProbe(bigger, more, { tokenModule: MODULE });
    // 4 colours x 6 instances (baseLight, baseDark, darkDark, wcagLight, nightLight, nightDark) = 24
    expect(out.source.split('\n').filter((l) => l.includes('FixtureThemes.') && l.startsWith('    _ = '))).toHaveLength(24);
    expect(out.read).toBe(out.expected);
  });

  it('makes neither a key read nor a static when the index names no theme colour', () => {
    const plain: TokenIndex = { primitives: index.primitives, semantics: {}, components: index.components };
    const out = generateProbe(plain, config(), { tokenModule: MODULE });
    expect(out.source).not.toContain('dpTheme');
    expect(out.source).not.toContain('ProbeStatics');
    expect(out.counts.key).toBe(0);
    expect(out.read).toBe(out.expected);
  });

  it('is the same function for a theme-less config: only the two base instances remain', () => {
    const out = generateProbe(index, { name: 'Fixture', themes: [] }, { tokenModule: MODULE });
    expect(out.instances).toEqual(['baseLight', 'baseDark']);
    expect(out.read).toBe(out.expected);
    expect(out.read).toBe(6 + 3 * 2 + 1);
  });
});

describe('probe-swift: n differs from m when the generator drops or doubles a name', () => {
  const index = loadIndex(THEMES_FIXTURE);
  const probe = generateProbe(index, config(), { tokenModule: MODULE });

  it('a dropped read lowers n below m', () => {
    const dropped = probe.source.replace('    _ = DesignTokens.space100\n', '');
    expect(countProbeReads(dropped)).toBe(probe.expected - 1);
    expect(countProbeReads(dropped)).not.toBe(probe.expected);
  });

  it('a doubled read raises n above m', () => {
    const doubled = probe.source.replace('    _ = DesignTokens.space100\n', '    _ = DesignTokens.space100\n    _ = DesignTokens.space100\n');
    expect(countProbeReads(doubled)).toBe(probe.expected + 1);
  });

  it('a name that is not a Swift member path throws, naming the token', () => {
    const bad: TokenIndex = { primitives: { 'space.100': { platforms: { ios: 'space 100' } } }, semantics: {}, components: {} };
    expect(() => generateProbe(bad, config(), { tokenModule: MODULE })).toThrow(/primitives\.yaml token "space\.100"/);
  });

  it('two registered themes that would collide on an instance name throw', () => {
    expect(() =>
      themeInstances({ name: 'X', themes: [{ name: 'a', mode: 'light' }, { name: 'a', mode: 'both' }] }),
    ).toThrow(/aLight/);
  });
});

describe('probe-swift: the planted fixture (Task 3 criterion 2: "2 of 2")', () => {
  const index = loadIndex(PLANTED);
  const probe = generateProbe(index, { name: 'Planted', themes: [] }, { tokenModule: MODULE });

  it('the planted index gives a read count of 2 of 2', () => {
    expect(probe.read).toBe(2);
    expect(probe.expected).toBe(2);
    expect(formatReadCount(probe)).toBe('probe: read 2 of 2 index names (primitives 2, semantics 0, components 0, theme 0\u00d70, key 0)');
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
    const short = { ...probe, read: 1 };
    expect(judgePlanted(one, short).ok).toBe(false);
  });
});

describe('probe-swift: against the repository\'s committed token index', () => {
  const index = loadIndex(path.join(REPO, 'token-index'));
  const cfg: ProbeConfig = {
    name: 'HarnessConsumer',
    themes: [
      { name: 'dark', mode: 'dark' },
      { name: 'wcag', mode: 'light' },
    ],
  };
  const probe = generateProbe(index, cfg, { tokenModule: MODULE });

  it('reads every iOS name the index gives, with n equal to m', () => {
    expect(probe.read).toBe(probe.expected);
    const names = indexIosNames(index);
    expect(names.length).toBeGreaterThan(300);
    const plain = names.filter((n) => !n.name.startsWith('theme.'));
    expect(probe.counts.primitives + probe.counts.semantics + probe.counts.components).toBe(plain.length);
    expect(probe.counts.themeColours).toBe(names.length - plain.length);
    expect(probe.counts.themeColours).toBe(themeMemberNames(names).length);
    expect(probe.counts.themeColours).toBeGreaterThan(0);
    expect(expectedReadCount(index, cfg)).toBe(probe.expected);
  });

  it('every plain name appears exactly once as a read line', () => {
    const lines = new Set(probe.source.split('\n'));
    for (const n of indexIosNames(index).filter((x) => !x.name.startsWith('theme.'))) {
      const root = n.file === 'components' ? '' : 'DesignTokens.';
      expect(lines.has(`    _ = ${root}${n.name}`)).toBe(true);
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

describe('lane: file order, the dropped files and the floor (criterion 4 and 9)', () => {
  const tarball = [
    'dist/ComponentTokens.ios.swift',
    'dist/DesignTokens.ios.swift',
    'src/tokens/platforms/ios/MotionTokens.swift',
    'src/components/core/Zed/platforms/ios/Zed.ios.swift',
    'src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
    'src/components/core/Alpha/platforms/ios/AlphaTests.swift',
    'src/components/core/Alpha/platforms/ios/__tests__/Helper.swift',
    'src/components/core/Beta/platforms/ios/Alpha.ios.swift',
    'src/components/core/Beta/platforms/ios/Beta.ios.swift',
    'src/components/core/Beta/platforms/android/Beta.kt',
  ];
  const sel = selectFiles(tarball, ['product/ProductTokens.ios.swift', 'DesignTokens.ios.swift', 'ComponentTokens.ios.swift']);

  it('leaves out the package\'s own dist/ComponentTokens.* and every test', () => {
    expect(sel.pkg.some((p) => p.includes('ComponentTokens'))).toBe(false);
    expect(sel.pkg.some((p) => p.includes('Tests.swift') || p.includes('__tests__'))).toBe(false);
    expect(sel.pkg.some((p) => p.endsWith('.kt'))).toBe(false);
  });

  it('keeps one copy of each native file name: a generated name wins, then the first packaged path', () => {
    expect(sel.pkg).toEqual([
      'src/components/core/Alpha/platforms/ios/Alpha.ios.swift',
      'src/components/core/Beta/platforms/ios/Beta.ios.swift',
      'src/components/core/Zed/platforms/ios/Zed.ios.swift',
      'src/tokens/platforms/ios/MotionTokens.swift',
    ]);
    const reasons = Object.fromEntries(sel.dropped.map((d) => [d.path, d.reason]));
    expect(reasons['dist/DesignTokens.ios.swift']).toMatch(/generated file has the name DesignTokens\.ios\.swift/);
    expect(reasons['src/components/core/Beta/platforms/ios/Alpha.ios.swift']).toMatch(/earlier packaged file/);
    expect(reasons['dist/ComponentTokens.ios.swift']).toMatch(/ComponentTokens/);
  });

  it('sorts each tier by path (code-point order), with the floor the lengths', () => {
    for (const tier of [sel.pkg, sel.gen]) {
      expect([...tier].sort(codePointCompare)).toEqual(tier);
    }
    expect(sel.gen).toEqual(['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']);
    expect(sel.gen).toHaveLength(3);
    expect(sel.pkg).toHaveLength(4);
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
    if (command === 'node') return ok(JSON.stringify({ name: 'Fake', themes: [{ name: 'dark', mode: 'dark' }] }));
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

function rig(opts: { appExists?: boolean; pinSwift?: string } = {}): Rig {
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
  ];
  for (const t of tarball) write(`node_modules/@3fn/core/${t}`, '// x\n');
  write('node_modules/@3fn/core/dist/config/ConfigLoader.js', '// stub\n');
  write('harness-tarball-files.txt', tarball.join('\n') + '\n');
  for (const g of ['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']) write(`dist/tokens/${g}`, '// g\n');
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

describe('lane: harness-ios-tokens against a fake swiftc', () => {
  it('while Stage T writes no module: prints "probe: blocked (token module not built)", marks ios.P blocked, writes the run file', () => {
    const r = rig();
    const { lines, outcome, fake } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(0);
    expect(lines).toContain('probe: blocked (token module not built)');
    const run = JSON.parse(fs.readFileSync(path.join(r.out, 'run.json'), 'utf8'));
    expect(run.swift).toEqual([
      { compile: 'ios.T', log: 'logs/T.txt', exitCode: 1 },
      { compile: 'ios.P', blocked: true },
    ]);
    expect(run.files).toEqual({ gen: { compiled: 3, floor: 3 } });
    expect(run.roots.gen).toBe(path.join(fs.realpathSync(r.consumer), 'dist', 'tokens'));
    expect(run.roots.probe).toBe(path.join(fs.realpathSync(r.out), 'probe'));
    expect(Object.keys(run.toolchain)).toEqual([...TOOLCHAIN_FIELDS]);
    expect(fs.readFileSync(path.join(r.out, 'logs', 'T.txt'), 'utf8')).toContain('consecutive declarations');
    // no Stage P compile of the REAL probe ran: only the self-test's planted probe did
    const realP = compiles(fake.calls).filter((c) => moduleOf(c) === 'DPHarnessProbe' && !c.some((a) => a.includes(`${path.sep}selftest${path.sep}`)));
    expect(realP).toHaveLength(0);
    // the probe was still generated, and its read count is reported
    expect(lines.some((l) => /^harness-ios: the probe was generated but not compiled: probe: read 16 of 16 index names/.test(l))).toBe(true);
    expect(fs.existsSync(path.join(r.out, 'probe', 'Probe.swift'))).toBe(true);
  });

  it('runs each stage\'s self-test first, then compiles the generated files in sorted order and prints the invocation and count', () => {
    const r = rig();
    const { fake, text } = lane(r, 'harness-ios-tokens', { tokensBuild: true, honestCompiler: true });
    const order = compiles(fake.calls).map((c) => `${moduleOf(c)}:${path.basename(c[c.length - 1])}`);
    expect(order[0]).toBe('DPHarnessTokens:missing-return.swift');
    expect(order.indexOf('DPHarnessTokens:missing-return.swift')).toBeLessThan(order.indexOf('DPHarnessTokens:ProductTokens.ios.swift'));
    const realT = compiles(fake.calls).find((c) => moduleOf(c) === 'DPHarnessTokens' && c.some((a) => a.endsWith('ProductTokens.ios.swift')))!;
    const gen = realT.filter((a) => a.endsWith('.swift')).map((a) => a.slice(a.indexOf('dist/tokens/') + 'dist/tokens/'.length));
    expect(gen).toEqual(['ComponentTokens.ios.swift', 'DesignTokens.ios.swift', 'product/ProductTokens.ios.swift']);
    expect(text).toContain('Stage T (generated files as a module) invocation: xcrun swiftc -emit-module');
    expect(text).toContain('-module-name DPHarnessTokens -swift-version 6 -diagnostic-style llvm');
    expect(text).toContain('Stage T files (3), in the order given to the compiler:');
    expect(text).toContain('floor gen 3; compiled gen 3');
    // the real probe compiled this time, with Stage T's folder on -I
    const realP = compiles(fake.calls).filter((c) => moduleOf(c) === 'DPHarnessProbe' && !c.some((a) => a.includes(`${path.sep}selftest${path.sep}`)));
    expect(realP).toHaveLength(1);
    expect(realP[0].join(' ')).toContain(`-I ${path.join(fs.realpathSync(r.out), 'T')}`);
    expect(text).toMatch(/probe: read 16 of 16 index names/);
    expect(text).not.toContain('probe: blocked');
  });

  it('DEVELOPER_DIR names the pinned Xcode', () => {
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
});

describe('lane: harness-ios-components against a fake swiftc', () => {
  it('compiles package files then generated files as DesignerPunk, then the generated files alone (T5), and records both floors', () => {
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
    const t5 = compiles(fake.calls).filter((c) => moduleOf(c) === 'DesignerPunk' && !c.some((a) => a.includes('node_modules/@3fn/core/')) && c.some((a) => a.endsWith('ProductTokens.ios.swift')));
    expect(t5).toHaveLength(1);
    const run = JSON.parse(fs.readFileSync(path.join(r.out, 'run.json'), 'utf8'));
    expect(run.swift.map((s: { compile: string }) => s.compile)).toEqual(['ios.C', 'ios.T5']);
    expect(run.swift.map((s: { exitCode: number }) => s.exitCode)).toEqual([1, 0]);
    expect(run.files).toEqual({ gen: { compiled: 3, floor: 3 }, pkg: { compiled: 3, floor: 3 } });
    expect(text).toContain('left out of the package set: dist/ComponentTokens.ios.swift');
    expect(text).toContain('left out of the package set: dist/DesignTokens.ios.swift (a generated file has the name DesignTokens.ios.swift)');
    expect(text).toContain('floor gen 3, pkg 3; compiled gen 3, pkg 3');
  });

  it('a file the tarball lists but the package lacks lowers "compiled" below the floor, which the comparator fails', () => {
    const r = rig();
    fs.rmSync(path.join(r.consumer, 'node_modules/@3fn/core/src/tokens/platforms/ios/MotionTokens.swift'));
    lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    const run = JSON.parse(fs.readFileSync(path.join(r.out, 'run.json'), 'utf8'));
    expect(run.files.pkg).toEqual({ compiled: 2, floor: 3 });
  });
});

describe('lane: what stops it before the comparator', () => {
  it('fails on a toolchain field that differs from the pin, compiling nothing', () => {
    const r = rig({ pinSwift: '6.2.0' });
    const { outcome, text, fake } = lane(r, 'harness-ios-components', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(1);
    expect(text).toContain('FAIL toolchain:');
    expect(text).toContain('swift.version: observed "6.3.1", pinned "6.2.0"');
    expect(compiles(fake.calls)).toHaveLength(0);
    expect(fs.existsSync(path.join(r.out, 'run.json'))).toBe(false);
  });

  it('fails as "toolchain missing" when the pinned app folder is absent', () => {
    const r = rig({ appExists: false });
    const { outcome, text, fake } = lane(r, 'harness-ios-tokens', { tokensBuild: false, honestCompiler: true });
    expect(outcome.exit).toBe(1);
    expect(text).toMatch(/FAIL toolchain missing: .* does not exist on this runner/);
    expect(fake.calls).toHaveLength(0);
  });

  it('fails as "self-test" when the compiler accepts the missing-return fixture', () => {
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
