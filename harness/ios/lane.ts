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
 *   1. sets DEVELOPER_DIR from the pin (`xcode.app`), reads the toolchain (K-6) and FAILS on any field
 *      that differs from the pin, or on a pinned app folder that is missing (`toolchain missing`);
 *   2. runs each stage's self-test (K-4) and FAILS if the compiler does not behave as the self-test expects;
 *   3. computes its floor per tier from the tarball's file list and the generated files (Req 3.4), compiles,
 *      and prints the exact invocation, the file list and the count it gave the compiler (Req 2.6);
 *   4. writes `<out>/run.json` and `<out>/logs/*.txt` for `scripts/harness/compare.ts`, which decides the verdict.
 *
 * What the lane does NOT do: decide a verdict. Compile errors are data, not lane failures; the lane exits 1
 * only for what the comparator cannot see: a toolchain mismatch, a failed self-test, a setup fault, and a
 * probe whose read count differs from the index's (`n ≠ m`; the run file is still written).
 *
 * Usage (from the repository root):
 *   npx tsx harness/ios/lane.ts <harness-ios-tokens|harness-ios-components> --consumer <root> --out <dir> [--pins <file>]
 *   npx tsx harness/ios/lane.ts --read-toolchain [--pins <file>]       print the running toolchain as pin lines
 *
 * `--consumer` is the consumer root `scripts/harness/consumer.ts` wrote (`harness-consumer.json` inside).
 * `--pins` defaults to `harness/pins.yaml`; a local run on a different Xcode passes a copy with its own values,
 * and then checks the lane's shape only (diagnostics differ between toolchains, K-7).
 *
 * Exit status: 0 when the run file was written and the probe count (if any) matched; 1 otherwise; 2 on a usage error.
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import * as yaml from 'js-yaml';
import { codePointCompare, type CompileResult, type RunFile, type SwiftCompileId } from '../../scripts/harness/compare';
import { parseSwift } from '../../scripts/harness/parse-swift';
import { formatReadCount, generateProbe, loadIndex, type ProbeConfig, type ProbeOutput } from '../../scripts/harness/probe-swift';

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
}

const baseName = (p: string): string => p.slice(p.lastIndexOf('/') + 1);

/** `*Tests.swift`, or anything under a `__tests__` or `Tests` folder. */
export function isTestSwift(p: string): boolean {
  return /Tests\.swift$/.test(p) || /(^|\/)(__tests__|Tests)\//.test(p);
}

/**
 * The files each tier gives the compiler (Req 2.4; K-1; O-15).
 *   - package: every `.swift` in the tarball's file list that is not a test, leaving out `dist/ComponentTokens.*`
 *     (the consumer's own `ComponentTokens` replaces it);
 *   - "one copy of each native file name": a packaged file whose name a generated file also has is dropped
 *     (the generated one is the consumer's; the package's own `dist/DesignTokens.ios.swift` is the case), and so is a
 *     later packaged file that repeats an earlier one's name;
 *   - each tier sorted by path (code-point order), package first when passed to the compiler.
 * The same function gives the floor (its lengths, from the lists) and the files to compile (those that exist on disk).
 */
export function selectFiles(tarballList: readonly string[], generated: readonly string[]): FileSelection {
  const gen = [...generated].filter((p) => p.endsWith('.swift')).sort(codePointCompare);
  const genNames = new Set(gen.map(baseName));
  const dropped: Array<{ path: string; reason: string }> = [];
  const seen = new Set<string>();
  const pkg: string[] = [];
  for (const p of [...tarballList].filter((x) => x.endsWith('.swift')).sort(codePointCompare)) {
    if (isTestSwift(p)) continue;
    if (/^dist\/ComponentTokens\./.test(p)) {
      dropped.push({ path: p, reason: 'the package\'s own ComponentTokens is left out (Req 2.4)' });
      continue;
    }
    const name = baseName(p);
    if (genNames.has(name)) {
      dropped.push({ path: p, reason: `a generated file has the name ${name}` });
      continue;
    }
    if (seen.has(name)) {
      dropped.push({ path: p, reason: `an earlier packaged file has the name ${name}` });
      continue;
    }
    seen.add(name);
    pkg.push(p);
  }
  return { gen, pkg, dropped };
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

/** Case 2: the planted `internal` member must give exactly one inaccessible entry, and the read count must be n of n. */
export function judgePlanted(result: CompileResult, probe: ProbeOutput): SelfTestVerdict {
  if (probe.read !== probe.expected || probe.read !== 2) return { ok: false, detail: `expected a read count of 2 of 2, got ${probe.read} of ${probe.expected}` };
  const keys = [...result.diagnostics.entries()];
  const total = keys.reduce((n, [, c]) => n + c, 0);
  if (result.unrooted.length > 0) return { ok: false, detail: `an error diagnostic could not be placed under a root: ${result.unrooted[0]}` };
  if (total !== 1 || keys.length !== 1) return { ok: false, detail: `expected exactly one error, got ${total}${keys.length ? ` (${keys.map(([k]) => k).join('; ')})` : ''}` };
  const key = keys[0][0];
  if (!/^probe:Probe\.swift \| .*'plantedInternal' is inaccessible due to 'internal' protection level/.test(key)) {
    return { ok: false, detail: `expected the inaccessible-member error for plantedInternal, got ${key}` };
  }
  return { ok: true, detail: `${key} (read count ${probe.read} of ${probe.expected})` };
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
interface Manifest {
  name: string;
  abbreviation: string;
  packageRoot: string;
  package: { fileList: string };
  tokenIndex: string;
  platformOutputs: { ios: string };
  generated: { ios: string[] };
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
 * The consumer's registered themes and `name`, read from its resolved config by the INSTALLED package's own
 * loader, the way `consumer.ts` reads the platform outputs. Nothing is hard-coded.
 */
export function loadProbeConfig(run: Runner, consumerRoot: string, packageRoot: string, env: NodeJS.ProcessEnv): ProbeConfig {
  const loader = path.join(packageRoot, 'dist', 'config', 'ConfigLoader.js');
  const script =
    'const { loadConfig } = require(process.argv[1]);' +
    'loadConfig(process.cwd()).then((c) => { process.stdout.write(JSON.stringify({ name: c.name, themes: (c.themes || []).map((t) => ({ name: t.name, mode: t.mode })) })); })' +
    '.catch((e) => { console.error((e && e.stack) || String(e)); process.exit(1); });';
  // `consumer.ts` prunes the consumer's `node_modules` to the packed package alone, so the package's own dependencies
  // (`tsx`, `js-yaml`) are not beside it any more. The repository's `node_modules` is on the runner (the lane itself
  // runs under its `tsx`), and `NODE_PATH` lets the INSTALLED loader find them there. The loader and the config read
  // are still the consumer's own.
  const r = run('node', ['-e', script, loader], { ...env, NODE_PATH: path.join(REPO, 'node_modules') }, consumerRoot);
  if (r.error || r.status !== 0) {
    throw new LaneError('setup', `cannot read the consumer's config through ${loader}: ${r.error ? r.error.message : (r.stderr || '').trim().slice(0, 300)}`);
  }
  return JSON.parse(r.stdout) as ProbeConfig;
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

  const probe = generateProbe(loadIndex(path.join(planted, 'token-index')), { name: 'Planted', themes: [] }, { tokenModule: ctx.pins.compile.tokens.module });
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
  let failure: string | null = null;
  let runFilePath: string | undefined;
  try {
    const pins = parseIosPins(fs.readFileSync(o.pinsPath, 'utf8'));
    const env = laneEnv(pins);
    const developerDir = env.DEVELOPER_DIR as string;
    log(`harness-ios: context ${o.context}; runner label pinned ${pins.runner}; DEVELOPER_DIR=${developerDir}`);

    // 1. The toolchain (K-6). A missing app folder is `toolchain missing`; any other difference is a mismatch.
    if (!fs.existsSync(developerDir)) throw new LaneError('toolchain missing', `${pins.toolchain['xcode.app']} does not exist on this runner (pinned by ios.toolchain.xcode.app)`);
    const observed = readToolchain(run, env);
    for (const f of TOOLCHAIN_FIELDS) log(`harness-ios: toolchain ${f} = ${JSON.stringify(observed[f])}`);
    const mismatches = toolchainMismatches(observed, pins.toolchain);
    if (mismatches.length > 0) {
      throw new LaneError('toolchain', `${mismatches.length} field(s) differ from ${path.relative(process.cwd(), o.pinsPath) || o.pinsPath} § ios:\n  ${mismatches.join('\n  ')}`);
    }
    log('harness-ios: toolchain matches the pin');
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
    const genFiles = sel.gen.map((p) => path.join(genRoot, p)).filter((p) => fs.existsSync(p));
    const pkgFiles = sel.pkg.map((p) => path.join(pkgRoot, p)).filter((p) => fs.existsSync(p));
    for (const d of sel.dropped) log(`harness-ios: left out of the package set: ${d.path} (${d.reason})`);

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

      // Stage P: the probe is generated either way, so its read count is checked even while it is blocked.
      selfTestPlanted(ctx);
      const index = loadIndex(path.join(root, manifest.tokenIndex));
      const config = loadProbeConfig(run, root, pkgRoot, env);
      const probe = generateProbe(index, config, { tokenModule: pins.compile.tokens.module });
      fs.mkdirSync(probeDir, { recursive: true });
      fs.writeFileSync(path.join(probeDir, 'Probe.swift'), probe.source);
      const moduleBuilt = t.exitCode === 0 && fs.existsSync(tokenModulePath(pins, tDir));
      if (!moduleBuilt) {
        log('probe: blocked (token module not built)');
        log(`harness-ios: the probe was generated but not compiled: ${formatReadCount(probe)}`);
        swift.push({ compile: 'ios.P', blocked: true });
      } else {
        const p = runStage(ctx, 'P', [path.join(probeDir, 'Probe.swift')], path.join(out, 'P'), roots, { moduleDir: tDir, label: 'the probe', display: shown });
        addStage(p);
        log(formatReadCount(probe));
      }
      if (probe.read !== probe.expected) {
        failure = `FAIL probe: ${formatReadCount(probe)}: the probe does not read every name the index gives`;
      }
    } else {
      // Stage C, then the T5 baseline
      selfTestMissingReturn(ctx, 'C');
      const c = runStage(ctx, 'C', [...pkgFiles, ...genFiles], path.join(out, 'C'), roots, { label: 'package files, then generated files, as module DesignerPunk', display: shown });
      addStage(c);
      const t5 = runStage(ctx, 'T5', genFiles, path.join(out, 'T5'), roots, { label: 'generated files alone, with Stage C\'s flags', display: shown });
      addStage(t5);
      files = { gen: { compiled: genFiles.length, floor: floorGen }, pkg: { compiled: pkgFiles.length, floor: floorPkg } };
    }

    const runFile: RunFile = { roots, swift, files, toolchain: observed };
    runFilePath = path.join(out, 'run.json');
    fs.writeFileSync(runFilePath, JSON.stringify(runFile, null, 2) + '\n');
    log(`harness-ios: wrote ${runFilePath}`);
    if (failure) log(failure);
    else log(`harness-ios: ${o.context} lane done; give ${runFilePath} to scripts/harness/compare.ts --context ${o.context}`);
  } catch (e) {
    if (e instanceof LaneError) {
      log(`FAIL ${e.cls}: ${e.message}`);
      return { exit: 1 };
    }
    throw e;
  }
  return { exit: failure ? 1 : 0, runFile: runFilePath };
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
