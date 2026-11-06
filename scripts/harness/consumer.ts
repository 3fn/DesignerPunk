#!/usr/bin/env tsx
/**
 * consumer.ts — the packed-install consumer driver for the native compile harness
 * (Spec 129 Task 1; requirements.md Req 1.8, 2.1, 2.2, 2.3; design.md Architecture and § 3 "Wiring").
 *
 * What it does, in order, each as a named step so a failure says where:
 *
 *   prepare    read `harness/pins.yaml` § `consumer`; check the output folder is outside the repository
 *   pack       `npm pack` in the repository into a scratch folder (or `--tarball <file>` to use one)
 *   install    `npm install <tarball>` into the consumer root (`--out`)
 *   init       `designerpunk init --name <name> --abbreviation <abbreviation>` (the abbreviation is NOT `DP`)
 *   configure  copy the product-token fixture in, point the consumer's config at it
 *   generate   `designerpunk generate`
 *   package    read the consumer's resolved config, list what was generated, keep only the packed package
 *              under `node_modules/`, write `harness-consumer.json` and `harness-tarball-files.txt`
 *
 * It reads nothing from the repository's own `dist/`: the only command run in the repository is `npm pack`,
 * and every later command runs inside the consumer root against the installed package (Req 2.1). The
 * consumer root is created OUTSIDE the repository and is written as ONE directory a CI job can upload.
 *
 * The consumer root, as the four compile lanes find it (Kenya's and Data's lanes read this layout):
 *
 *   <root>/designerpunk.config.ts      the consumer's config, as `init` wrote it plus `productTokens`
 *   <root>/token-index/                what the consumer's own `generate` wrote (the probe's input)
 *   <root>/<platform output>/...       generated files; the folder comes from `harness-consumer.json`
 *   <root>/node_modules/@3fn/core/     the packed package, in place (`pkg:` paths are relative to it)
 *   <root>/harness-consumer.json       the manifest (below)
 *   <root>/harness-tarball-files.txt   the packed tarball's file list, sorted, relative to the package root
 *
 * Nothing else is kept under `node_modules/` (the package's own dependencies are not a lane input and
 * would make the upload large). `--keep-node-modules` skips that pruning.
 *
 * Each platform's output folder is READ from the consumer's config as the CLI resolves it: `platforms.<platform>.output`
 * when the resolved config carries it (Spec 129 Task 15 adds it), else `output`. A lane never hard-codes it, and a
 * `gen:` key's path is relative to that folder (tasks.md § "The `gen:` path rule").
 *
 * Exit status: 0 on success; 1 when a step fails, after printing `harness-consumer: step "<step>" failed: ...`;
 * 2 on a usage error.
 *
 * Network: the driver downloads nothing itself. `npm install` resolves the package's dependencies, so a local
 * run passes `--offline` (or `--prefer-offline` when the npm cache holds them); CI installs online.
 *
 * Usage:
 *   npx tsx scripts/harness/consumer.ts --out <dir> [--pins <file>] [--tarball <file>] [--pack-ignore-scripts]
 *                                       [--offline | --prefer-offline] [--keep-node-modules]
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawnSync } from 'child_process';
import * as yaml from 'js-yaml';

// ─── Types ───────────────────────────────────────────────────────────────────────────────────────

export type Step = 'prepare' | 'pack' | 'install' | 'init' | 'configure' | 'generate' | 'package';

/** A step failure: names the step, so the exit message and a CI log say where the run stopped. */
export class HarnessStepError extends Error {
  constructor(public readonly step: Step, detail: string) {
    super(`step "${step}" failed: ${detail}`);
    this.name = 'HarnessStepError';
  }
}

export interface RunResult {
  /** The exit status; `null` when the process did not start or was killed. */
  status: number | null;
  stdout: string;
  stderr: string;
  /** Set when the process could not be started (for example `ENOENT`). */
  error?: Error;
}

export interface RunOptions {
  cwd: string;
  env?: NodeJS.ProcessEnv;
}

/** Runs one command. The default is `spawnSync`; the tests inject a fake so no process starts. */
export type Runner = (command: string, args: string[], options: RunOptions) => RunResult;

/** `harness/pins.yaml` § `consumer`, validated. */
export interface ConsumerPins {
  name: string;
  abbreviation: string;
  /** Repository-relative POSIX path of the product-token fixture folder. */
  productTokensFixture: string;
  /** Consumer-root-relative POSIX path the fixture is copied to, and the config's `productTokens`. */
  productTokens: string;
}

export const PLATFORMS = ['web', 'ios', 'android'] as const;
export type Platform = (typeof PLATFORMS)[number];

/** `harness-consumer.json`, the file the lanes read to find everything else. All paths are POSIX, relative to the consumer root. */
export interface ConsumerManifest {
  schema: 1;
  name: string;
  abbreviation: string;
  /** The packed package, in place. A `pkg:` key's path is relative to this folder. */
  packageRoot: string;
  package: { name: string; version: string; tarball: string; tarballSha256: string; fileList: string };
  /** The consumer's own `token-index/`, which `generate` wrote. */
  tokenIndex: string;
  /** The folder the product-token fixture was copied to. */
  productTokens: string;
  /** Each platform's output folder, from the consumer's config. A `gen:` key's path is relative to it. */
  platformOutputs: Record<Platform, string>;
  /** Generated native files per platform: paths relative to that platform's output folder, sorted. */
  generated: { ios: string[]; android: string[] };
}

export interface DriverOptions {
  /** The repository root (where `npm pack` runs and `harness/pins.yaml` lives). */
  repoRoot: string;
  /** The consumer root to create. Must not exist, or be empty; must be outside `repoRoot`. */
  out: string;
  pinsPath: string;
  /** A tarball to install instead of running `npm pack`. */
  tarball?: string;
  /** Pass `--ignore-scripts` to `npm pack` (skips `prepack`'s build: for a tree that is already built). */
  packIgnoreScripts: boolean;
  offline: boolean;
  preferOffline: boolean;
  keepNodeModules: boolean;
  run: Runner;
  log: (line: string) => void;
}

// ─── Small helpers ───────────────────────────────────────────────────────────────────────────────

const PACKAGE_DIR = 'node_modules/@3fn/core';
const MANIFEST_FILE = 'harness-consumer.json';
const TARBALL_LIST_FILE = 'harness-tarball-files.txt';

function toPosix(p: string): string {
  return p.split(path.sep).join('/');
}

/** The last `n` non-empty lines of a command's combined output, for a failure message. */
function tail(r: RunResult, n = 30): string {
  const lines = `${r.stdout}\n${r.stderr}`.split('\n').map((l) => l.trimEnd()).filter((l) => l.length > 0);
  return lines.slice(-n).join('\n');
}

function describeFailure(command: string, args: string[], r: RunResult): string {
  const head = r.error
    ? `could not run \`${[command, ...args].join(' ')}\`: ${r.error.message}`
    : `\`${[command, ...args].join(' ')}\` exited ${r.status}`;
  const out = tail(r);
  return out ? `${head}\n${out}` : head;
}

/** Runs a command; a non-zero exit (or a process that did not start) becomes a `HarnessStepError` for `step`. */
function runStep(step: Step, run: Runner, command: string, args: string[], options: RunOptions, log: (l: string) => void): RunResult {
  log(`[${step}] ${[command, ...args].join(' ')}   (cwd ${options.cwd})`);
  const r = run(command, args, options);
  if (r.error || r.status !== 0) throw new HarnessStepError(step, describeFailure(command, args, r));
  return r;
}

export const defaultRunner: Runner = (command, args, options) => {
  const r = spawnSync(command, args, {
    cwd: options.cwd,
    env: options.env,
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '', error: r.error };
};

/** The environment for every command: the caller's, without a module search path that could point back into the repository. */
function commandEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.NODE_PATH;
  return env;
}

/** The nearest existing ancestor of `p`, resolved through symlinks, so a not-yet-created folder can be compared. */
function realpathOfNearestAncestor(p: string): string {
  let current = path.resolve(p);
  const tailParts: string[] = [];
  while (!fs.existsSync(current)) {
    tailParts.unshift(path.basename(current));
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return path.join(fs.realpathSync(current), ...tailParts);
}

export function isInside(parent: string, child: string): boolean {
  const rel = path.relative(realpathOfNearestAncestor(parent), realpathOfNearestAncestor(child));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

// ─── prepare ─────────────────────────────────────────────────────────────────────────────────────

/** Reads and validates `harness/pins.yaml` § `consumer`. The abbreviation SHALL NOT be `DP` (Req 2.2). */
export function readConsumerPins(pinsPath: string): ConsumerPins {
  if (!fs.existsSync(pinsPath)) throw new HarnessStepError('prepare', `pin file not found: ${pinsPath}`);
  let doc: unknown;
  try {
    doc = yaml.load(fs.readFileSync(pinsPath, 'utf8'));
  } catch (err) {
    throw new HarnessStepError('prepare', `${pinsPath} is not valid YAML: ${(err as Error).message}`);
  }
  const section = (doc as { consumer?: Record<string, unknown> } | null | undefined)?.consumer;
  if (!section || typeof section !== 'object') {
    throw new HarnessStepError('prepare', `${pinsPath} has no \`consumer\` section`);
  }
  const str = (key: string): string => {
    const v = section[key];
    if (typeof v !== 'string' || v.trim() === '') {
      throw new HarnessStepError('prepare', `${pinsPath} § consumer: \`${key}\` must be a non-empty string`);
    }
    return v.trim();
  };
  const name = str('name');
  const abbreviation = str('abbreviation');
  const productTokensFixture = str('productTokensFixture');
  const productTokens = str('productTokens');
  if (abbreviation.toUpperCase() === 'DP') {
    throw new HarnessStepError('prepare', `${pinsPath} § consumer: \`abbreviation\` is "${abbreviation}"; it must not be DP, or a hard-coded DP in generated output would not show (Req 2.2)`);
  }
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(abbreviation)) {
    throw new HarnessStepError('prepare', `${pinsPath} § consumer: \`abbreviation\` "${abbreviation}" must be letters and digits, starting with a letter`);
  }
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(name)) {
    throw new HarnessStepError('prepare', `${pinsPath} § consumer: \`name\` "${name}" must be letters and digits, starting with a letter`);
  }
  for (const [key, value] of [['productTokensFixture', productTokensFixture], ['productTokens', productTokens]] as const) {
    if (path.isAbsolute(value) || value.split('/').includes('..')) {
      throw new HarnessStepError('prepare', `${pinsPath} § consumer: \`${key}\` "${value}" must be a relative path with no \`..\``);
    }
  }
  return { name, abbreviation, productTokensFixture, productTokens };
}

function prepareOut(repoRoot: string, out: string): void {
  if (isInside(repoRoot, out)) {
    throw new HarnessStepError('prepare', `--out ${out} is inside the repository (${repoRoot}); the consumer root must be created outside it`);
  }
  if (fs.existsSync(out)) {
    if (!fs.statSync(out).isDirectory() || fs.readdirSync(out).length > 0) {
      throw new HarnessStepError('prepare', `--out ${out} exists and is not an empty folder`);
    }
  } else {
    fs.mkdirSync(out, { recursive: true });
  }
}

// ─── configure ───────────────────────────────────────────────────────────────────────────────────

/**
 * Adds `productTokens: './<path>'` to the config `init` wrote, on the line after its `output:` line.
 * Fails (rather than guessing) when that anchor is absent or the config already has a `productTokens:` key.
 */
export function addProductTokens(configSource: string, productTokensPath: string): string {
  if (/^\s*productTokens\s*:/m.test(configSource)) {
    throw new HarnessStepError('configure', 'the config `init` wrote already sets `productTokens`; the driver will not overwrite it');
  }
  const anchor = /^(\s*)output\s*:[^\n]*\n/m.exec(configSource);
  if (!anchor) {
    throw new HarnessStepError('configure', 'the config `init` wrote has no `output:` line to put `productTokens` after');
  }
  const insert = `${anchor[1]}productTokens: './${productTokensPath}',\n`;
  return configSource.slice(0, anchor.index + anchor[0].length) + insert + configSource.slice(anchor.index + anchor[0].length);
}

function copyDir(from: string, to: string): number {
  fs.mkdirSync(to, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) count += copyDir(src, dest);
    else if (entry.isFile()) {
      fs.copyFileSync(src, dest);
      count += 1;
    }
  }
  return count;
}

// ─── package ─────────────────────────────────────────────────────────────────────────────────────

/** The part of the consumer's resolved config (`loadConfig`'s `ResolvedConfig`) that locates output. */
export interface ResolvedConfigLike {
  outputDir: string;
  configDir?: string;
  /** Present once Task 15 adds per-platform output: `platforms.<platform>.output`, resolved to an absolute path. */
  platforms?: Partial<Record<Platform, { output?: string }>>;
}

/** Each platform's output folder, relative to the consumer root: `platforms.<platform>.output`, else `output`. */
export function platformOutputFolders(config: ResolvedConfigLike, consumerRoot: string): Record<Platform, string> {
  const rel = (abs: string): string => toPosix(path.relative(fs.realpathSync(consumerRoot), fs.existsSync(abs) ? fs.realpathSync(abs) : path.resolve(abs)));
  const result = {} as Record<Platform, string>;
  for (const platform of PLATFORMS) {
    const own = config.platforms?.[platform]?.output;
    result[platform] = rel(own ? own : config.outputDir);
  }
  return result;
}

/** Every file under `dir` with the extension, as POSIX paths relative to `dir`, sorted. */
export function listFiles(dir: string, extension: string): string[] {
  const out: string[] = [];
  const walk = (current: string, rel: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const next = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(path.join(current, entry.name), next);
      else if (entry.isFile() && entry.name.endsWith(extension)) out.push(next);
    }
  };
  if (fs.existsSync(dir)) walk(dir, '');
  return out.sort();
}

/** Removes everything under `node_modules/` except `@3fn/core`. */
export function pruneNodeModules(consumerRoot: string): void {
  const nm = path.join(consumerRoot, 'node_modules');
  for (const entry of fs.readdirSync(nm)) {
    if (entry === '@3fn') continue;
    fs.rmSync(path.join(nm, entry), { recursive: true, force: true });
  }
  const scope = path.join(nm, '@3fn');
  for (const entry of fs.readdirSync(scope)) {
    if (entry !== 'core') fs.rmSync(path.join(scope, entry), { recursive: true, force: true });
  }
}

const READ_CONFIG_SCRIPT =
  "const { loadConfig } = require(process.argv[1]);" +
  "loadConfig(process.cwd()).then((c) => { process.stdout.write(JSON.stringify(c)); })" +
  ".catch((e) => { console.error((e && e.stack) || String(e)); process.exit(1); });";

function sha256(file: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

// ─── The driver ──────────────────────────────────────────────────────────────────────────────────

/** Runs every step. Throws `HarnessStepError` naming the step that failed; returns the manifest it wrote. */
export function runDriver(options: DriverOptions): ConsumerManifest {
  const { repoRoot, out, run, log } = options;
  const env = commandEnv();
  const pins = readConsumerPins(options.pinsPath);
  const fixtureSource = path.join(repoRoot, pins.productTokensFixture);
  if (!fs.existsSync(fixtureSource) || !fs.statSync(fixtureSource).isDirectory()) {
    throw new HarnessStepError('prepare', `product-token fixture folder not found: ${fixtureSource}`);
  }
  prepareOut(repoRoot, out);

  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-harness-consumer-'));
  try {
    // --- pack: the one command that runs in the repository ---------------------------------------
    let tarball: string;
    if (options.tarball) {
      tarball = path.resolve(options.tarball);
      if (!fs.existsSync(tarball)) throw new HarnessStepError('pack', `--tarball ${tarball} does not exist`);
      log(`[pack] using the given tarball ${tarball}`);
    } else {
      const packArgs = ['pack', '--pack-destination', scratch, ...(options.packIgnoreScripts ? ['--ignore-scripts'] : [])];
      runStep('pack', run, 'npm', packArgs, { cwd: repoRoot, env }, log);
      const tgzs = fs.existsSync(scratch) ? fs.readdirSync(scratch).filter((f) => f.endsWith('.tgz')) : [];
      if (tgzs.length !== 1) throw new HarnessStepError('pack', `expected exactly one .tgz in ${scratch} after \`npm pack\`, found ${tgzs.length}`);
      tarball = path.join(scratch, tgzs[0]);
    }
    const listing = runStep('pack', run, 'tar', ['-tzf', tarball], { cwd: scratch, env }, log);
    const tarballFiles = listing.stdout
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0 && !l.endsWith('/'))
      .map((l) => l.replace(/^package\//, ''))
      .sort();
    if (tarballFiles.length === 0) throw new HarnessStepError('pack', `${tarball} lists no files`);

    // --- install: into the consumer root ---------------------------------------------------------
    fs.writeFileSync(path.join(out, 'package.json'), `${JSON.stringify({ name: 'dp-harness-consumer', version: '0.0.0', private: true }, null, 2)}\n`);
    const installArgs = ['install', tarball, '--no-audit', '--no-fund', ...(options.offline ? ['--offline'] : []), ...(options.preferOffline ? ['--prefer-offline'] : [])];
    runStep('install', run, 'npm', installArgs, { cwd: out, env }, log);
    const packageRoot = path.join(out, PACKAGE_DIR);
    const bin = path.join(packageRoot, 'bin', 'designerpunk.js');
    if (!fs.existsSync(bin)) throw new HarnessStepError('install', `the installed package has no ${PACKAGE_DIR}/bin/designerpunk.js`);
    const pkgJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8')) as { name: string; version: string };

    // --- init ------------------------------------------------------------------------------------
    runStep('init', run, process.execPath, [bin, 'init', '--name', pins.name, '--abbreviation', pins.abbreviation], { cwd: out, env }, log);

    // --- configure: the product-token fixture ----------------------------------------------------
    const configPath = path.join(out, 'designerpunk.config.ts');
    if (!fs.existsSync(configPath)) throw new HarnessStepError('configure', '`init` wrote no designerpunk.config.ts');
    const copied = copyDir(fixtureSource, path.join(out, pins.productTokens));
    if (copied === 0) throw new HarnessStepError('configure', `the fixture folder ${fixtureSource} holds no files`);
    fs.writeFileSync(configPath, addProductTokens(fs.readFileSync(configPath, 'utf8'), pins.productTokens));
    log(`[configure] copied ${copied} fixture file(s) to ${pins.productTokens}/ and set productTokens in designerpunk.config.ts`);

    // --- generate --------------------------------------------------------------------------------
    runStep('generate', run, process.execPath, [bin, 'generate'], { cwd: out, env }, log);

    // --- package: read where output went, record it, prune ---------------------------------------
    const configRead = runStep(
      'package', run, process.execPath,
      ['-e', READ_CONFIG_SCRIPT, path.join(packageRoot, 'dist', 'config', 'ConfigLoader.js')],
      { cwd: out, env }, log,
    );
    let resolved: ResolvedConfigLike;
    try {
      resolved = JSON.parse(configRead.stdout) as ResolvedConfigLike;
    } catch {
      throw new HarnessStepError('package', `the consumer's config could not be read back as JSON:\n${tail(configRead)}`);
    }
    if (typeof resolved.outputDir !== 'string') throw new HarnessStepError('package', 'the consumer\'s resolved config has no outputDir');
    const platformOutputs = platformOutputFolders(resolved, out);
    const generated = {
      ios: listFiles(path.join(out, platformOutputs.ios), '.swift'),
      android: listFiles(path.join(out, platformOutputs.android), '.kt'),
    };
    // `generate` succeeding is not enough: a product-token fixture that was never read would leave the harness green on nothing.
    for (const [platform, file] of [['ios', 'ProductTokens.ios.swift'], ['android', 'ProductTokens.android.kt']] as const) {
      if (!generated[platform].some((f) => f === file || f.endsWith(`/${file}`))) {
        throw new HarnessStepError('package', `\`generate\` wrote no ${file} under ${platformOutputs[platform]}/; the product-token fixture was not read`);
      }
    }
    for (const platform of ['ios', 'android'] as const) {
      if (generated[platform].length === 0) throw new HarnessStepError('package', `\`generate\` wrote no ${platform === 'ios' ? '.swift' : '.kt'} file under ${platformOutputs[platform]}/`);
    }
    const tokenIndex = path.join(out, 'token-index');
    if (!fs.existsSync(path.join(tokenIndex, 'semantics.yaml'))) throw new HarnessStepError('package', '`generate` wrote no token-index/semantics.yaml');

    fs.writeFileSync(path.join(out, TARBALL_LIST_FILE), `${tarballFiles.join('\n')}\n`);
    if (!options.keepNodeModules) pruneNodeModules(out);

    const manifest: ConsumerManifest = {
      schema: 1,
      name: pins.name,
      abbreviation: pins.abbreviation,
      packageRoot: PACKAGE_DIR,
      package: { name: pkgJson.name, version: pkgJson.version, tarball: path.basename(tarball), tarballSha256: sha256(tarball), fileList: TARBALL_LIST_FILE },
      tokenIndex: 'token-index',
      productTokens: pins.productTokens,
      platformOutputs,
      generated,
    };
    fs.writeFileSync(path.join(out, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`);
    log(`[package] wrote ${MANIFEST_FILE}: ${generated.ios.length} Swift and ${generated.android.length} Kotlin generated file(s); tarball ${tarballFiles.length} file(s)`);
    return manifest;
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
}

// ─── CLI ─────────────────────────────────────────────────────────────────────────────────────────

const REPO_ROOT = path.resolve(__dirname, '..', '..');

export interface CliArgs {
  out?: string;
  pins: string;
  tarball?: string;
  packIgnoreScripts: boolean;
  offline: boolean;
  preferOffline: boolean;
  keepNodeModules: boolean;
}

export function parseArgs(argv: string[], repoRoot: string = REPO_ROOT): CliArgs {
  const args: CliArgs = {
    pins: path.join(repoRoot, 'harness', 'pins.yaml'),
    packIgnoreScripts: false,
    offline: false,
    preferOffline: false,
    keepNodeModules: false,
  };
  const value = (i: number, flag: string): string => {
    const v = argv[i];
    if (!v || v.startsWith('--')) throw new Error(`${flag} needs a value`);
    return v;
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = path.resolve(value(++i, a));
    else if (a === '--pins') args.pins = path.resolve(value(++i, a));
    else if (a === '--tarball') args.tarball = path.resolve(value(++i, a));
    else if (a === '--pack-ignore-scripts') args.packIgnoreScripts = true;
    else if (a === '--offline') args.offline = true;
    else if (a === '--prefer-offline') args.preferOffline = true;
    else if (a === '--keep-node-modules') args.keepNodeModules = true;
    else throw new Error(`unknown argument: ${a}`);
  }
  if (!args.out) throw new Error('--out <dir> is required');
  if (args.offline && args.preferOffline) throw new Error('--offline and --prefer-offline are exclusive');
  return args;
}

/** The CLI body. Returns the process exit status; prints, never exits itself. */
export function main(argv: string[], run: Runner = defaultRunner, repoRoot: string = REPO_ROOT): number {
  let args: CliArgs;
  try {
    args = parseArgs(argv, repoRoot);
  } catch (err) {
    console.error(`harness-consumer: ${(err as Error).message}`);
    console.error('usage: tsx scripts/harness/consumer.ts --out <dir> [--pins <file>] [--tarball <file>] [--pack-ignore-scripts] [--offline | --prefer-offline] [--keep-node-modules]');
    return 2;
  }
  try {
    const manifest = runDriver({
      repoRoot,
      out: args.out as string,
      pinsPath: args.pins,
      tarball: args.tarball,
      packIgnoreScripts: args.packIgnoreScripts,
      offline: args.offline,
      preferOffline: args.preferOffline,
      keepNodeModules: args.keepNodeModules,
      run,
      log: (line) => console.log(`harness-consumer: ${line}`),
    });
    console.log(`harness-consumer: ok — consumer root ${args.out} (${manifest.package.name}@${manifest.package.version}, abbreviation ${manifest.abbreviation})`);
    return 0;
  } catch (err) {
    if (err instanceof HarnessStepError) {
      console.error(`harness-consumer: ${err.message}`);
      return 1;
    }
    console.error(`harness-consumer: unexpected error: ${(err as Error).stack ?? String(err)}`);
    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
