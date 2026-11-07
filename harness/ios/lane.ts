#!/usr/bin/env tsx
/**
 * lane.ts — the iOS lanes of the native compile harness (Spec 129 Task 3; design.md § 1, K-1 to K-7;
 * requirements.md Req 2.4, 2.6, 2.7, 2.8, 2.9, 3.4, 3.11, 6.2). Owner: Kenya.
 *
 * One run is one CI context on one macOS runner:
 *
 *   harness-ios-tokens       Stage T, then Stage P
 *   harness-ios-components   Stage C, then the T5 baseline
 *
 * Stages (all through `xcrun swiftc`, every flag read from `harness/pins.yaml` § `ios` § `compile`):
 *   T   the generated iOS files as module `DPHarnessTokens`, `-swift-version 6`, with `-emit-module`
 *   P   the probe generated from the consumer's `token-index/` and config, as module `DPHarnessProbe`
 *       with plain `import DPHarnessTokens` (`-I` Stage T's folder); blocked until Stage T wrote a module
 *   C   every non-test packaged `.swift` plus the generated files as module `DesignerPunk`, `-swift-version 5`
 *   T5  the generated files alone, with Stage C's flags, for the comparator's cross-tier rule (design § 3 rule 5)
 *
 * In this order, each context:
 *   1. sets DEVELOPER_DIR from the pin (`xcode.app`) and reads the toolchain (K-6). A pinned app folder that is
 *      missing stops the lane (`toolchain missing`). Any other field that differs from the pin does not: the lane
 *      records what it read in the run file, still compiles, and the comparator fails the context as `toolchain`;
 *   2. runs each stage's self-test (K-4) and FAILS if the compiler does not behave as the self-test expects;
 *   3. computes its floor per tier from the tarball's file list and the generated files (Req 3.4), compiles,
 *      and prints the exact invocation, the file list and the count it gave the compiler (Req 2.6). A native
 *      file name two files of the set share stops the lane (`setup`), naming every path;
 *   4. writes `<out>/run.json` and `<out>/logs/*.txt` for `scripts/harness/compare.ts`, which decides the verdict.
 *      `harness-ios-tokens` also writes the run file's `checks`: one per probe count line and the per-run
 *      instance check, and the comparator fails the context for each that is not ok (design § 3).
 *
 * What the lane does NOT do: decide a verdict. Compile errors and failed checks are data. The lane exits 1 only
 * where the comparator would have nothing to read (no run file, so no `harness-verdict` annotation): a pinned
 * Xcode folder that is missing, a failed self-test, a setup fault, a duplicate native file name.
 *
 * Usage (from the repository root):
 *   npx tsx harness/ios/lane.ts <harness-ios-tokens|harness-ios-components> --consumer <root> --out <dir> [--pins <file>]
 *   npx tsx harness/ios/lane.ts --read-toolchain [--pins <file>]       print the running toolchain as pin lines
 *
 * `--consumer` is the consumer root `scripts/harness/consumer.ts` wrote (`harness-consumer.json` inside).
 * `--pins` defaults to `harness/pins.yaml`; a local run on a different Xcode passes a copy with its own values,
 * and then checks the lane's shape only (diagnostics differ between toolchains, K-7).
 *
 * Exit status: 0 when the run file was written; 1 otherwise; 2 on a usage error.
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import * as yaml from 'js-yaml';
import { codePointCompare, type CompileResult, type RunCheck, type RunFile, type SwiftCompileId } from '../../scripts/harness/compare';
import { BINDING, checkHarnessConsumerConfig, instanceNames, swiftHolderOpenLine, type ThemeEntry } from '../../scripts/harness/native-rules';
import { parseSwift } from '../../scripts/harness/parse-swift';
import { ROOT_TOKEN_FILES } from '../../scripts/pack-assert';
import {
  formatCountLine,
  generateProbe,
  groupOf,
  loadIndex,
  loadProductCategories,
  type ProbeConfig,
  type ProbeOutput,
} from '../../scripts/harness/probe-swift';

const HERE = __dirname;
const REPO = path.resolve(HERE, '..', '..');

// ─── The pins this lane reads ────────────────────────────────────────────────────────────────────

export const IOS_CONTEXTS = ['harness-ios-tokens', 'harness-ios-components'] as const;
export type IosContext = (typeof IOS_CONTEXTS)[number];

/** The toolchain fields K-6 reads, in the order they are printed. The pin file names exactly these. */
export const TOOLCHAIN_FIELDS = [
  'xcode.version',
  'xcode.build',
  'xcode.app',
  'sdk.version',
  'sdk.build',
  'swift.driver',
  'swift.version',
  'swift.build',
] as const;

export interface StagePins {
  module: string;
  swiftVersion: string;
}

/** `harness/pins.yaml` § `ios`, the part the lane reads. */
export interface IosPins {
  runner: string;
  deploymentTarget: string;
  toolchain: Record<string, string>;
  compile: {
    sdkName: string;
    arch: string;
    objectEmission: string;
    wholeModule: string;
    libraryParsing: string;
    diagnosticStyle: string;
    tokens: StagePins;
    probe: StagePins;
    components: StagePins;
  };
}

const isMapping = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Reads and validates the `ios` section. Throws naming the field that is missing or not a string. */
export function parseIosPins(text: string): IosPins {
  const doc = yaml.load(text);
  if (!isMapping(doc) || !isMapping(doc.ios)) throw new Error('pins: no `ios` section');
  const ios = doc.ios;
  const str = (obj: Record<string, unknown>, key: string, where: string): string => {
    const v = obj[key];
    if (typeof v !== 'string' || v === '') throw new Error(`pins: ${where}.${key} is missing or not a quoted string`);
    return v;
  };
  if (!isMapping(ios.toolchain)) throw new Error('pins: ios.toolchain is missing');
  const toolchain: Record<string, string> = {};
  for (const [k, v] of Object.entries(ios.toolchain)) {
    if (typeof v !== 'string') throw new Error(`pins: ios.toolchain.${k} is not a quoted string`);
    toolchain[k] = v;
  }
  for (const f of TOOLCHAIN_FIELDS) {
    if (!(f in toolchain)) throw new Error(`pins: ios.toolchain.${f} is missing`);
  }
  if (!isMapping(ios.compile)) throw new Error('pins: ios.compile is missing');
  const c = ios.compile;
  const stage = (key: string): StagePins => {
    const s = c[key];
    if (!isMapping(s)) throw new Error(`pins: ios.compile.${key} is missing`);
    return { module: str(s, 'module', `ios.compile.${key}`), swiftVersion: str(s, 'swiftVersion', `ios.compile.${key}`) };
  };
  return {
    runner: str(ios, 'runner', 'ios'),
    deploymentTarget: str(ios, 'deploymentTarget', 'ios'),
    toolchain,
    compile: {
      sdkName: str(c, 'sdkName', 'ios.compile'),
      arch: str(c, 'arch', 'ios.compile'),
      objectEmission: str(c, 'objectEmission', 'ios.compile'),
      wholeModule: str(c, 'wholeModule', 'ios.compile'),
      libraryParsing: str(c, 'libraryParsing', 'ios.compile'),
      diagnosticStyle: str(c, 'diagnosticStyle', 'ios.compile'),
      tokens: stage('tokens'),
      probe: stage('probe'),
      components: stage('components'),
    },
  };
}

// ─── The invocations ─────────────────────────────────────────────────────────────────────────────

export type Stage = 'T' | 'P' | 'C' | 'T5';

export const STAGE_COMPILE_ID: Readonly<Record<Stage, SwiftCompileId>> = { T: 'ios.T', P: 'ios.P', C: 'ios.C', T5: 'ios.T5' };

/** `arm64-apple-ios17.0-simulator`. */
export function targetTriple(pins: IosPins): string {
  return `${pins.compile.arch}-apple-ios${pins.deploymentTarget}-simulator`;
}

export interface InvocationInput {
  stage: Stage;
  pins: IosPins;
  sdkPath: string;
  /** The folder the stage writes into (its object file, and Stage T's module). */
  outDir: string;
  /** Absolute source paths, already in the pinned order. */
  files: readonly string[];
  /** Stage P only: the folder holding Stage T's `.swiftmodule` (`-I`). */
  moduleDir?: string;
}

/** The module Stage T writes: `<outDir>/<module>.swiftmodule`. */
export function tokenModulePath(pins: IosPins, outDir: string): string {
  return path.join(outDir, `${pins.compile.tokens.module}.swiftmodule`);
}

/**
 * The `swiftc` arguments (without the leading `swiftc`) for one stage. The order for Stage T is the one
 * the Task 3 criterion names: `-emit-module … -c -wmo -parse-as-library -module-name DPHarnessTokens
 * -swift-version 6 -diagnostic-style llvm`, then the SDK and target, the output, and the files.
 */
export function swiftcArgs(i: InvocationInput): string[] {
  const { pins, stage } = i;
  const c = pins.compile;
  const stagePins = stage === 'T' ? c.tokens : stage === 'P' ? c.probe : c.components;
  const args: string[] = [];
  if (stage === 'T') args.push('-emit-module', '-emit-module-path', tokenModulePath(pins, i.outDir));
  args.push(c.objectEmission, c.wholeModule, c.libraryParsing);
  args.push('-module-name', stagePins.module, '-swift-version', stagePins.swiftVersion);
  args.push('-diagnostic-style', c.diagnosticStyle);
  args.push('-sdk', i.sdkPath, '-target', targetTriple(pins));
  if (stage === 'P') {
    if (!i.moduleDir) throw new Error('lane: Stage P needs moduleDir');
    args.push('-I', i.moduleDir);
  }
  args.push('-o', path.join(i.outDir, `${stagePins.module}.o`));
  args.push(...i.files);
  return args;
}

/** A command line to print: single-quoted only where a word needs it. */
export function shellLine(argv: readonly string[]): string {
  return argv.map((w) => (/^[A-Za-z0-9_@%+=:,./-]+$/.test(w) ? w : `'${w.replace(/'/g, `'\\''`)}'`)).join(' ');
}

// ─── The file selection and the floor ────────────────────────────────────────────────────────────

export interface FileSelection {
  /** Generated files, relative to the platform output folder, sorted by path. */
  gen: string[];
  /** Packaged files, relative to the package root, sorted by path. */
  pkg: string[];
  /** Files taken out of the packaged set, with the reason. */
  dropped: Array<{ path: string; reason: string }>;
  /** Native file names two files of the set share, with every path that has the name (`pkg:<path>`, `gen:<path>`). Never empty-named. */
  duplicates: Array<{ name: string; paths: string[] }>;
}

const baseName = (p: string): string => p.slice(p.lastIndexOf('/') + 1);

/** `*Tests.swift`, or anything under a `__tests__` or `Tests` folder. */
export function isTestSwift(p: string): boolean {
  return /Tests\.swift$/.test(p) || /(^|\/)(__tests__|Tests)\//.test(p);
}

/** The package's root token files the harness leaves out (Req 2.4): the `.swift` entries of `scripts/pack-assert.ts`'s `ROOT_TOKEN_FILES`. */
export const ROOT_TOKEN_SWIFT_FILES: readonly string[] = ROOT_TOKEN_FILES.filter((f) => f.endsWith('.swift'));

/**
 * The files each tier gives the compiler (Req 2.4; K-1; O-15).
 *   - package: every `.swift` in the tarball's file list that is not a test, leaving out the package's root token files
 *     (`ROOT_TOKEN_SWIFT_FILES`: the consumer's own `ComponentTokens` and `DesignTokens` replace them), by name;
 *   - each tier sorted by path (code-point order), package first when passed to the compiler;
 *   - a native file name that two files of the set share is reported in `duplicates`, never dropped: the lane fails
 *     naming every path (tasks.md Task 3; the Android lane does the same).
 * The same function gives the floor (its lengths, from the lists) and the files to compile (those that exist on disk).
 */
export function selectFiles(tarballList: readonly string[], generated: readonly string[]): FileSelection {
  const gen = [...generated].filter((p) => p.endsWith('.swift')).sort(codePointCompare);
  const dropped: Array<{ path: string; reason: string }> = [];
  const pkg: string[] = [];
  for (const p of [...tarballList].filter((x) => x.endsWith('.swift')).sort(codePointCompare)) {
    if (isTestSwift(p)) continue;
    if (ROOT_TOKEN_SWIFT_FILES.includes(p)) {
      dropped.push({ path: p, reason: 'a package root token file is left out (Req 2.4)' });
      continue;
    }
    pkg.push(p);
  }
  const byName = new Map<string, string[]>();
  for (const [tier, list] of [['pkg', pkg], ['gen', gen]] as const) {
    for (const p of list) {
      const key = baseName(p);
      const entry = byName.get(key) ?? [];
      entry.push(`${tier}:${p}`);
      byName.set(key, entry);
    }
  }
  const duplicates = [...byName.entries()].filter(([, paths]) => paths.length > 1).map(([name, paths]) => ({ name, paths }));
  return { gen, pkg, dropped, duplicates };
}

// ─── The toolchain (K-6) ─────────────────────────────────────────────────────────────────────────

export interface ToolchainTexts {
  /** `xcodebuild -version` */
  xcodebuild: string;
  /** `xcode-select -p` */
  developerDir: string;
  /** `xcrun --sdk iphonesimulator --show-sdk-version` */
  sdkVersion: string;
  /** `xcrun --sdk iphonesimulator --show-sdk-build-version` */
  sdkBuild: string;
  /** `xcrun swiftc --version` */
  swift: string;
}

/** The fields K-6 names, parsed from the five command outputs. Throws naming the output it cannot read. */
export function parseToolchain(t: ToolchainTexts): Record<string, string> {
  const must = (re: RegExp, text: string, what: string): string => {
    const m = re.exec(text);
    if (!m) throw new Error(`toolchain: cannot read ${what} from ${JSON.stringify(text.slice(0, 200))}`);
    return m[1];
  };
  const developer = t.developerDir.trim();
  const suffix = '/Contents/Developer';
  if (!developer.endsWith(suffix)) throw new Error(`toolchain: the developer dir ${JSON.stringify(developer)} does not end in ${suffix}`);
  return {
    'xcode.version': must(/^Xcode (\S+)/m, t.xcodebuild, 'the Xcode version'),
    'xcode.build': must(/^Build version (\S+)/m, t.xcodebuild, 'the Xcode build'),
    'xcode.app': developer.slice(0, -suffix.length),
    'sdk.version': t.sdkVersion.trim(),
    'sdk.build': t.sdkBuild.trim(),
    'swift.driver': must(/swift-driver version: (\S+)/, t.swift, 'the swift-driver version'),
    'swift.version': must(/Apple Swift version (\S+)/, t.swift, 'the Swift version'),
    'swift.build': must(/\((swiftlang-\S+)/, t.swift, 'the swiftlang build'),
  };
}

/**
 * Every field that differs between what was read and what is pinned, in both directions (Req 3.11).
 * Empty when they match. The comparator repeats this check on the run file; the lane makes it first so
 * that a wrong toolchain compiles nothing.
 */
export function toolchainMismatches(observed: Readonly<Record<string, string>>, pinned: Readonly<Record<string, string>>): string[] {
  const out: string[] = [];
  for (const f of Object.keys(pinned)) {
    if (!(f in observed)) out.push(`${f}: pinned ${JSON.stringify(pinned[f])}, the lane read no value`);
    else if (observed[f] !== pinned[f]) out.push(`${f}: observed ${JSON.stringify(observed[f])}, pinned ${JSON.stringify(pinned[f])}`);
  }
  for (const f of Object.keys(observed)) {
    if (!(f in pinned)) out.push(`${f}: observed ${JSON.stringify(observed[f])}, not pinned`);
  }
  return out;
}

/** The observed fields as lines to paste into `harness/pins.yaml` § `ios` § `toolchain`. */
export function toolchainPinLines(observed: Readonly<Record<string, string>>): string[] {
  return TOOLCHAIN_FIELDS.filter((f) => f in observed).map((f) => `    ${f}: ${JSON.stringify(observed[f])}`);
}

// ─── The self-tests (K-4): what each expects of the compiler ─────────────────────────────────────

export interface SelfTestVerdict {
  ok: boolean;
  detail: string;
}

/** Case 1: the compile-only fixture must give exactly one error, and it must be `missing return`. */
export function judgeMissingReturn(result: CompileResult): SelfTestVerdict {
  const keys = [...result.diagnostics.entries()];
  const total = keys.reduce((n, [, c]) => n + c, 0);
  if (result.unrooted.length > 0) return { ok: false, detail: `an error diagnostic could not be placed under a root: ${result.unrooted[0]}` };
  if (total !== 1) return { ok: false, detail: `expected exactly one error, got ${total}${keys.length ? ` (${keys.map(([k]) => k).join('; ')})` : ' (the compiler accepted the file: it typechecked and did not compile)'}` };
  const key = keys[0][0];
  if (!/ \| missing return/.test(key)) return { ok: false, detail: `expected a "missing return" error, got ${key}` };
  return { ok: true, detail: key };
}

/** Case 2: the planted `internal` member must give exactly one inaccessible entry, and the index-names count must be 2 of 2. */
export function judgePlanted(result: CompileResult, probe: ProbeOutput): SelfTestVerdict {
  const idx = groupOf(probe, 'index names');
  if (idx.n !== 2 || idx.m !== 2) return { ok: false, detail: `expected a read count of 2 of 2, got ${idx.n} of ${idx.m}` };
  const other = probe.groups.filter((g) => g.name !== 'index names' && (g.n !== 0 || g.m !== 0));
  if (other.length > 0) return { ok: false, detail: `the planted probe has reads beyond its two index names: ${other.map(formatCountLine).join('; ')}` };
  const keys = [...result.diagnostics.entries()];
  const total = keys.reduce((n, [, c]) => n + c, 0);
  if (result.unrooted.length > 0) return { ok: false, detail: `an error diagnostic could not be placed under a root: ${result.unrooted[0]}` };
  if (total !== 1 || keys.length !== 1) return { ok: false, detail: `expected exactly one error, got ${total}${keys.length ? ` (${keys.map(([k]) => k).join('; ')})` : ''}` };
  const key = keys[0][0];
  if (!/^probe:Probe\.swift \| .*'plantedInternal' is inaccessible due to 'internal' protection level/.test(key)) {
    return { ok: false, detail: `expected the inaccessible-member error for plantedInternal, got ${key}` };
  }
  return { ok: true, detail: `${key} (read count ${idx.n} of ${idx.m})` };
}

// ─── The per-run instance check (design § 3, "The per-run instance check fails closed") ─────────

export interface InstanceCheck {
  ok: boolean;
  /** What follows `theme instances: ` on the printed line, and the run file check's detail. */
  detail: string;
}

/** The one line of the holder: exactly four spaces, then `public static let <name>: any DesignerPunkTheme =` (pinned in Task 11). */
const HOLDER_MEMBER = new RegExp(`^    public static let ([A-Za-z_][A-Za-z0-9_]*): any ${BINDING.swift.themeProtocol} =`);
const THEME_PROTOCOL_LINE = new RegExp(`^public protocol ${BINDING.swift.themeProtocol}\\b`);

/**
 * The members of the `<Name>Themes` holder in the generated Swift (every generated file's text), compared with the
 * instances `native-rules.ts` gives for the consumer's themes.
 *   - holder found: its members are the lines between the open line (`public enum <Name>Themes {`, column 0) and the
 *     first `}` at column 0 that match the pinned member form. Fails when none parse ("holder found, no members
 *     parsed": fail closed), when a name is missing or extra, or when the order differs.
 *   - no holder, but `DesignerPunkTheme` is declared: fails.
 *   - neither declared (every run before U6): `not checked`, ok.
 */
export function checkThemeInstances(texts: readonly string[], productName: string, themes: readonly ThemeEntry[]): InstanceCheck {
  const open = swiftHolderOpenLine(productName);
  const holder = `${productName}Themes`;
  const expected = instanceNames(themes, 'ios');
  let holders = 0;
  let members: string[] = [];
  let declaresTheme = false;
  for (const text of texts) {
    const lines = text.split('\n');
    if (lines.some((l) => THEME_PROTOCOL_LINE.test(l))) declaresTheme = true;
    lines.forEach((line, i) => {
      if (line !== open) return;
      holders += 1;
      members = [];
      for (let j = i + 1; j < lines.length && lines[j] !== '}'; j++) {
        const m = HOLDER_MEMBER.exec(lines[j]);
        if (m) members.push(m[1]);
      }
    });
  }
  if (holders > 1) return { ok: false, detail: `${holder} is declared ${holders} times` };
  if (holders === 0) {
    return declaresTheme
      ? { ok: false, detail: `${BINDING.swift.themeProtocol} is declared and no ${holder} holder was found` }
      : { ok: true, detail: 'not checked' };
  }
  if (members.length === 0) return { ok: false, detail: `holder found, no members parsed: ${holder} is declared and no line of it has the form "    public static let <instance>: any ${BINDING.swift.themeProtocol} ="` };
  const missing = expected.filter((n) => !members.includes(n));
  const extra = members.filter((n) => !expected.includes(n));
  if (missing.length > 0 || extra.length > 0) {
    return { ok: false, detail: `${holder} members differ from the shared module's instances${missing.length ? `; missing ${missing.join(', ')}` : ''}${extra.length ? `; extra ${extra.join(', ')}` : ''}` };
  }
  if (members.join(',') !== expected.join(',')) return { ok: false, detail: `${holder} has the shared module's ${expected.length} instances in a different order (declared ${members.join(', ')}; expected ${expected.join(', ')})` };
  return { ok: true, detail: `${members.length} members equal the shared module's instances (${members.join(', ')})` };
}

// ─── The effects ─────────────────────────────────────────────────────────────────────────────────

export interface CommandResult {
  status: number | null;
  stdout: string;
  stderr: string;
  error?: Error;
}

export type Runner = (command: string, args: readonly string[], env: NodeJS.ProcessEnv, cwd?: string) => CommandResult;

export const realRunner: Runner = (command, args, env, cwd) => {
  const r = spawnSync(command, [...args], { env, cwd, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '', error: r.error };
};

class LaneError extends Error {
  constructor(public readonly cls: string, detail: string) {
    super(detail);
    this.name = 'LaneError';
  }
}

function must(r: CommandResult, what: string): string {
  if (r.error) throw new LaneError('setup', `${what}: ${r.error.message}`);
  if (r.status !== 0) throw new LaneError('setup', `${what} exited ${r.status}: ${(r.stderr || r.stdout).trim().slice(0, 300)}`);
  return r.stdout;
}

/** The environment a stage runs in: DEVELOPER_DIR selects the pinned Xcode (K-6). */
export function laneEnv(pins: IosPins, base: NodeJS.ProcessEnv = process.env): NodeJS.ProcessEnv {
  return { ...base, DEVELOPER_DIR: path.join(pins.toolchain['xcode.app'], 'Contents', 'Developer') };
}

/** `swiftc --version`: the `swift-driver version:` line goes to stderr and the rest to stdout, so both are read. */
function swiftVersionText(run: Runner, env: NodeJS.ProcessEnv): string {
  const r = run('xcrun', ['swiftc', '--version'], env);
  must(r, 'swiftc --version');
  return r.stderr + r.stdout;
}

/** Reads the running toolchain under `env`. */
export function readToolchain(run: Runner, env: NodeJS.ProcessEnv): Record<string, string> {
  const xcrun = (args: string[], what: string): string => must(run('xcrun', args, env), what);
  return parseToolchain({
    xcodebuild: must(run('xcodebuild', ['-version'], env), 'xcodebuild -version'),
    developerDir: must(run('xcode-select', ['-p'], env), 'xcode-select -p'),
    sdkVersion: xcrun(['--sdk', 'iphonesimulator', '--show-sdk-version'], 'xcrun --show-sdk-version'),
    sdkBuild: xcrun(['--sdk', 'iphonesimulator', '--show-sdk-build-version'], 'xcrun --show-sdk-build-version'),
    swift: swiftVersionText(run, env),
  });
}

/** What a consumer root holds that the lane reads (the part of `harness-consumer.json` it needs). */
export interface Manifest {
  name: string;
  abbreviation: string;
  packageRoot: string;
  package: { fileList: string };
  tokenIndex: string;
  /** The folder the product-token fixture was copied to, relative to the consumer root: the config's `productTokens`. */
  productTokens?: string;
  platformOutputs: { ios: string };
  generated: { ios: string[] };
  /** The registered themes (`name`, `mode`), in config order. Absent in a manifest written before Task 1 added it: none. */
  themes?: Array<{ name: string; mode: string }>;
}

function readManifest(root: string): Manifest {
  const p = path.join(root, 'harness-consumer.json');
  let m: Manifest;
  try {
    m = JSON.parse(fs.readFileSync(p, 'utf8')) as Manifest;
  } catch (e) {
    throw new LaneError('setup', `cannot read ${p}: ${(e as Error).message}`);
  }
  for (const k of ['packageRoot', 'tokenIndex'] as const) {
    if (typeof m[k] !== 'string') throw new LaneError('setup', `${p} has no ${k}`);
  }
  if (!m.package || typeof m.package.fileList !== 'string' || !m.platformOutputs || typeof m.platformOutputs.ios !== 'string' || !m.generated || !Array.isArray(m.generated.ios)) {
    throw new LaneError('setup', `${p} is not a harness-consumer manifest (needs package.fileList, platformOutputs.ios and generated.ios)`);
  }
  return m;
}

/**
 * What the probe reads of the consumer's config: its `name` and the registered themes, both from the manifest
 * `scripts/harness/consumer.ts` wrote (`name`, and `themes` in config order). The lane never loads the consumer's
 * config itself, so it reads the consumer as an adopter's install would. A manifest with no `themes` key reads as
 * none; a theme without a string `name` and `mode` is a setup fault. The manifest carries no registration form, so
 * the `{ light, dark }` pair is invisible here until Task 14 adds one (it is not a ThemeEntry `pair` from this reader).
 * A name or mode the rules refuse is reported by `checkHarnessConsumerConfig`, as a failing check.
 */
export function probeConfigFromManifest(manifest: Pick<Manifest, 'name' | 'themes'>): ProbeConfig {
  const themes = (manifest.themes ?? []).map((t, i): ThemeEntry => {
    if (!t || typeof t.name !== 'string' || typeof t.mode !== 'string') {
      throw new LaneError('setup', `harness-consumer.json themes[${i}] needs a string name and mode`);
    }
    return { name: t.name, mode: t.mode };
  });
  return { name: manifest.name, themes };
}

// ─── One stage ───────────────────────────────────────────────────────────────────────────────────

interface StageRun {
  stage: Stage;
  logRel: string;
  exitCode: number;
  result: CompileResult;
}

interface Ctx {
  pins: IosPins;
  env: NodeJS.ProcessEnv;
  run: Runner;
  sdkPath: string;
  out: string;
  log: (line: string) => void;
}

function rootsOf(gen: string, pkg: string, probe: string): RunFile['roots'] {
  return { gen, pkg, probe };
}

/** Runs one `swiftc` stage: prints the invocation and the file list, writes the log, parses it. */
function runStage(
  ctx: Ctx,
  stage: Stage,
  files: readonly string[],
  outDir: string,
  roots: RunFile['roots'],
  opts: { moduleDir?: string; label: string; display: (abs: string) => string; logName?: string },
): StageRun {
  fs.mkdirSync(outDir, { recursive: true });
  const args = swiftcArgs({ stage, pins: ctx.pins, sdkPath: ctx.sdkPath, outDir, files, moduleDir: opts.moduleDir });
  ctx.log(`harness-ios: Stage ${stage} (${opts.label}) invocation: ${shellLine(['xcrun', 'swiftc', ...args])}`);
  ctx.log(`harness-ios: Stage ${stage} files (${files.length}), in the order given to the compiler:`);
  for (const f of files) ctx.log(`  ${opts.display(f)}`);
  const r = ctx.run('xcrun', ['swiftc', ...args], ctx.env);
  if (r.error) throw new LaneError('setup', `could not start swiftc for Stage ${stage}: ${r.error.message}`);
  const exitCode = r.status === null ? 70 : r.status;
  const logRel = `logs/${opts.logName ?? stage}.txt`;
  fs.mkdirSync(path.join(ctx.out, 'logs'), { recursive: true });
  fs.writeFileSync(path.join(ctx.out, logRel), r.stdout + r.stderr);
  const result = parseSwift({ compile: STAGE_COMPILE_ID[stage], log: r.stdout + r.stderr, exitCode, roots });
  const errors = [...result.diagnostics.values()].reduce((n, c) => n + c, 0);
  ctx.log(`harness-ios: Stage ${stage} exit ${exitCode}; ${errors} error diagnostic(s) in ${result.diagnostics.size} key(s)${result.unrooted.length ? `; ${result.unrooted.length} unrooted` : ''}`);
  return { stage, logRel, exitCode, result };
}

const SELFTEST = path.join(HERE, 'selftest');

function selfFail(stage: string, detail: string): never {
  throw new LaneError('self-test', `Stage ${stage}: ${detail}`);
}

/** K-4 case 1, under the stage's own flags. */
function selfTestMissingReturn(ctx: Ctx, stage: Stage): void {
  const dir = path.join(ctx.out, 'selftest', `${stage}-missing-return`);
  fs.mkdirSync(dir, { recursive: true });
  const roots = rootsOf(SELFTEST, path.join(dir, 'pkg'), path.join(dir, 'probe'));
  const r = runStage(ctx, stage, [path.join(SELFTEST, 'missing-return.swift')], dir, roots, {
    label: 'self-test: missing return',
    display: (f) => path.relative(REPO, f),
    logName: `selftest-${stage}-missing-return`,
  });
  const v = judgeMissingReturn(r.result);
  if (!v.ok) selfFail(stage, `missing-return fixture: ${v.detail}`);
  ctx.log(`harness-ios: Stage ${stage} self-test (missing return) ok: ${v.detail}`);
}

/** K-4 case 2: the planted `internal` member, through a real Stage T module and a real generated probe. */
function selfTestPlanted(ctx: Ctx): void {
  const base = path.join(ctx.out, 'selftest', 'P-planted');
  const tokensDir = path.join(base, 'T');
  const probeDir = path.join(base, 'probe');
  fs.mkdirSync(probeDir, { recursive: true });
  const planted = path.join(SELFTEST, 'planted');
  const roots = rootsOf(planted, path.join(base, 'pkg'), probeDir);

  const t = runStage(ctx, 'T', [path.join(planted, 'PlantedTokens.swift')], tokensDir, roots, {
    label: 'self-test: planted token module',
    display: (f) => path.relative(REPO, f),
    logName: 'selftest-P-planted-T',
  });
  if (t.exitCode !== 0 || !fs.existsSync(tokenModulePath(ctx.pins, tokensDir))) {
    selfFail('P', `the planted token module did not build (exit ${t.exitCode}); its errors: ${[...t.result.diagnostics.keys()].join('; ') || 'none parsed'}`);
  }

  const probe = generateProbe(loadIndex(path.join(planted, 'token-index')), { name: 'Planted', themes: [] }, { tokenModule: ctx.pins.compile.tokens.module, provider: false });
  fs.writeFileSync(path.join(probeDir, 'Probe.swift'), probe.source);
  const p = runStage(ctx, 'P', [path.join(probeDir, 'Probe.swift')], path.join(base, 'P'), roots, {
    moduleDir: tokensDir,
    label: 'self-test: planted probe',
    display: (f) => path.relative(base, f),
    logName: 'selftest-P-planted',
  });
  const v = judgePlanted(p.result, probe);
  if (!v.ok) selfFail('P', `planted-member fixture: ${v.detail}`);
  ctx.log(`harness-ios: Stage P self-test (planted internal member) ok: ${v.detail}`);
}

// ─── One context ─────────────────────────────────────────────────────────────────────────────────

export interface LaneOptions {
  context: IosContext;
  consumer: string;
  out: string;
  pinsPath: string;
  run?: Runner;
  log?: (line: string) => void;
}

export interface LaneOutcome {
  /** The process exit status the CLI returns. */
  exit: number;
  runFile?: string;
}

function resetDir(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

export function runLane(o: LaneOptions): LaneOutcome {
  const log = o.log ?? ((l: string) => console.log(l));
  const run = o.run ?? realRunner;
  let runFilePath: string | undefined;
  try {
    const pins = parseIosPins(fs.readFileSync(o.pinsPath, 'utf8'));
    const env = laneEnv(pins);
    const developerDir = env.DEVELOPER_DIR as string;
    log(`harness-ios: context ${o.context}; runner label pinned ${pins.runner}; DEVELOPER_DIR=${developerDir}`);

    // 1. The toolchain (K-6). A pinned app folder that is absent stops the lane (`toolchain missing`: nothing can be set up).
    //    Any other difference from the pin does NOT stop it: the lane records what it read in the run file, still runs its
    //    compiles, and the comparator fails the context as class `toolchain` (design § 3, Req 3.11), so the run carries a
    //    `harness-verdict` annotation like any other FAIL.
    if (!fs.existsSync(developerDir)) throw new LaneError('toolchain missing', `${pins.toolchain['xcode.app']} does not exist on this runner (pinned by ios.toolchain.xcode.app)`);
    const observed = readToolchain(run, env);
    for (const f of TOOLCHAIN_FIELDS) log(`harness-ios: toolchain ${f} = ${JSON.stringify(observed[f])}`);
    const mismatches = toolchainMismatches(observed, pins.toolchain);
    if (mismatches.length > 0) {
      log(`harness-ios: ${mismatches.length} toolchain field(s) differ from ${path.relative(process.cwd(), o.pinsPath) || o.pinsPath} § ios; the comparator fails the context as "toolchain":\n  ${mismatches.join('\n  ')}`);
    } else {
      log('harness-ios: toolchain matches the pin');
    }
    const sdkPath = must(run('xcrun', ['--sdk', pins.compile.sdkName, '--show-sdk-path'], env), 'xcrun --show-sdk-path').trim();

    // 2. The consumer root, and the paths the compiler is given (all realpath'd, so the roots match the diagnostics).
    const root = fs.realpathSync(o.consumer);
    const manifest = readManifest(root);
    const genRoot = fs.realpathSync(path.join(root, manifest.platformOutputs.ios));
    const pkgRoot = fs.realpathSync(path.join(root, manifest.packageRoot));
    const tarballList = fs
      .readFileSync(path.join(root, manifest.package.fileList), 'utf8')
      .split('\n')
      .filter((l) => l !== '');
    const sel = selectFiles(tarballList, manifest.generated.ios);
    for (const d of sel.dropped) log(`harness-ios: left out of the package set: ${d.path} (${d.reason})`);
    if (sel.duplicates.length > 0) {
      throw new LaneError('setup', `native file name used twice: ${sel.duplicates.map((d) => `${d.name} (${d.paths.join(' and ')})`).join('; ')}`);
    }
    const genFiles = sel.gen.map((p) => path.join(genRoot, p)).filter((p) => fs.existsSync(p));
    const pkgFiles = sel.pkg.map((p) => path.join(pkgRoot, p)).filter((p) => fs.existsSync(p));

    resetDir(o.out);
    const out = fs.realpathSync(o.out);
    const probeDir = path.join(out, 'probe');
    const ctx: Ctx = { pins, env, run, sdkPath, out, log };
    const roots = rootsOf(genRoot, pkgRoot, probeDir);
    const shown = (abs: string): string =>
      abs.startsWith(pkgRoot + '/') ? `pkg:${abs.slice(pkgRoot.length + 1)}` : abs.startsWith(genRoot + '/') ? `gen:${abs.slice(genRoot.length + 1)}` : abs.startsWith(probeDir + '/') ? `probe:${abs.slice(probeDir.length + 1)}` : abs;
    const floorGen = sel.gen.length;
    const floorPkg = sel.pkg.length;
    if (o.context === 'harness-ios-tokens') log(`harness-ios: floor gen ${floorGen}; compiled gen ${genFiles.length} (tarball list ${tarballList.length} entries, generated ${manifest.generated.ios.length})`);
    else log(`harness-ios: floor gen ${floorGen}, pkg ${floorPkg}; compiled gen ${genFiles.length}, pkg ${pkgFiles.length} (tarball list ${tarballList.length} entries, generated ${manifest.generated.ios.length})`);

    const swift: NonNullable<RunFile['swift']> = [];
    const checks: RunCheck[] = [];
    const addStage = (s: StageRun): void => {
      swift.push({ compile: STAGE_COMPILE_ID[s.stage], log: s.logRel, exitCode: s.exitCode });
    };
    let files: RunFile['files'];

    if (o.context === 'harness-ios-tokens') {
      // Stage T
      selfTestMissingReturn(ctx, 'T');
      const tDir = path.join(out, 'T');
      const t = runStage(ctx, 'T', genFiles, tDir, roots, { label: 'generated files as a module', display: shown });
      addStage(t);
      files = { gen: { compiled: genFiles.length, floor: floorGen } };

      // Stage P. The probe is generated either way, so its count lines are printed and checked even while it is blocked.
      selfTestPlanted(ctx);
      const index = loadIndex(path.join(root, manifest.tokenIndex));
      const config = probeConfigFromManifest(manifest);
      const products = manifest.productTokens ? loadProductCategories(path.join(root, manifest.productTokens)) : [];
      const probe = generateProbe(index, config, { tokenModule: pins.compile.tokens.module, products });
      fs.mkdirSync(probeDir, { recursive: true });
      fs.writeFileSync(path.join(probeDir, 'Probe.swift'), probe.source);
      const moduleBuilt = t.exitCode === 0 && fs.existsSync(tokenModulePath(pins, tDir));
      if (!moduleBuilt) {
        log('probe: blocked (token module not built)');
        log('harness-ios: the probe was generated but not compiled; its count lines follow');
        swift.push({ compile: 'ios.P', blocked: true });
      } else {
        const p = runStage(ctx, 'P', [path.join(probeDir, 'Probe.swift')], path.join(out, 'P'), roots, { moduleDir: tDir, label: 'the probe', display: shown });
        addStage(p);
      }
      // The count lines: one compared line per group (design § 3). A group is a check; n ≠ m fails the context through the comparator.
      for (const g of probe.groups) {
        const line = formatCountLine(g);
        log(line);
        checks.push({ name: `probe: ${g.name}`, ok: g.n === g.m, detail: `read ${g.n} of ${g.m}${moduleBuilt ? '' : ' (blocked)'}` });
      }
      for (const r of probe.invalidProduct) {
        checks.push({ name: 'probe: product key', ok: false, detail: `${r.category}.${r.key} cannot be written as a Swift expression; no read was made` });
        log(`probe: product key ${r.category}.${r.key} is not a Swift identifier; no read was made`);
      }

      // The harness consumer's own config against the theme-instance rule's refusals (a check on our fixture).
      const refusals = checkHarnessConsumerConfig(config.themes);
      checks.push({ name: 'harness consumer config', ok: refusals.length === 0, detail: refusals.length === 0 ? 'no refusal' : refusals.join('; ') });
      for (const r of refusals) log(`FAIL check: ${r}`);

      // The per-run instance check: the generated holder's members against the shared module's instances.
      const texts = genFiles.map((f) => fs.readFileSync(f, 'utf8'));
      const inst = checkThemeInstances(texts, config.name, config.themes);
      log(`theme instances: ${inst.detail}`);
      checks.push({ name: 'theme instances', ok: inst.ok, detail: inst.detail });
    } else {
      // Stage C, then the T5 baseline
      selfTestMissingReturn(ctx, 'C');
      const c = runStage(ctx, 'C', [...pkgFiles, ...genFiles], path.join(out, 'C'), roots, { label: 'package files, then generated files, as module DesignerPunk', display: shown });
      addStage(c);
      const t5 = runStage(ctx, 'T5', genFiles, path.join(out, 'T5'), roots, { label: 'generated files alone, with Stage C\'s flags', display: shown });
      addStage(t5);
      files = { gen: { compiled: genFiles.length, floor: floorGen }, pkg: { compiled: pkgFiles.length, floor: floorPkg } };
    }

    const runFile: RunFile = { roots, swift, files, toolchain: observed, checks };
    runFilePath = path.join(out, 'run.json');
    fs.writeFileSync(runFilePath, JSON.stringify(runFile, null, 2) + '\n');
    log(`harness-ios: wrote ${runFilePath}`);
    log(`harness-ios: ${o.context} lane done; give ${runFilePath} to scripts/harness/compare.ts --context ${o.context}`);
  } catch (e) {
    if (e instanceof LaneError) {
      log(`FAIL ${e.cls}: ${e.message}`);
      return { exit: 1 };
    }
    throw e;
  }
  return { exit: 0, runFile: runFilePath };
}

// ─── The command line ────────────────────────────────────────────────────────────────────────────

const USAGE =
  'usage: lane.ts <harness-ios-tokens|harness-ios-components> --consumer <root> --out <dir> [--pins <file>]\n' +
  '       lane.ts --read-toolchain [--pins <file>]';

export function main(argv: readonly string[], log: (l: string) => void = (l) => console.log(l)): number {
    const opts: Record<string, string> = {};
  let context: string | undefined;
  let readOnly = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--read-toolchain') readOnly = true;
    else if (['--consumer', '--out', '--pins'].includes(a) && i + 1 < argv.length) opts[a.slice(2)] = argv[++i];
    else if (!a.startsWith('--') && context === undefined) context = a;
    else {
      log(`lane: unknown or incomplete argument "${a}"\n${USAGE}`);
      return 2;
    }
  }
  const pinsPath = path.resolve(opts.pins ?? path.join(REPO, 'harness', 'pins.yaml'));
  if (readOnly) {
    // No comparison and no consumer: print what the running toolchain says, as pin lines. Selects the pinned
    // Xcode when its folder exists, else reads whatever DEVELOPER_DIR / xcode-select gives.
    let env: NodeJS.ProcessEnv = process.env;
    try {
      const pins = parseIosPins(fs.readFileSync(pinsPath, 'utf8'));
      if (fs.existsSync(path.join(pins.toolchain['xcode.app'], 'Contents', 'Developer'))) env = laneEnv(pins);
    } catch {
      /* no usable pin file: read the default toolchain */
    }
    try {
      const observed = readToolchain(realRunner, env);
      log('# The running toolchain, as lines for harness/pins.yaml § ios § toolchain:');
      for (const l of toolchainPinLines(observed)) log(l);
      return 0;
    } catch (e) {
      log(`FAIL setup: ${(e as Error).message}`);
      return 1;
    }
  }
  if (!IOS_CONTEXTS.includes(context as IosContext) || !opts.consumer || !opts.out) {
    log(USAGE);
    return 2;
  }
  try {
    return runLane({ context: context as IosContext, consumer: path.resolve(opts.consumer), out: path.resolve(opts.out), pinsPath, log }).exit;
  } catch (e) {
    log(`FAIL setup: ${(e as Error).stack ?? String(e)}`);
    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
