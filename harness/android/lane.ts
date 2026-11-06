#!/usr/bin/env tsx
/**
 * lane.ts — the Android compile lane's runner (Spec 129 Task 4, subtask 4.1; design.md § 2).
 * Owner: Data. Both Android contexts (`harness-android-tokens`, `harness-android-components`) run this
 * once and compare its two run files; the workflow steps are Task 5's.
 *
 * What it does, in order (each a named step, so a failure says where it stopped):
 *   prepare   read the consumer's manifest (`harness-consumer.json`, from consumer.ts) and `harness/pins.yaml`
 *             § `android`; check `gradle-wrapper.properties` against the pins; compute, per tier, the explicit
 *             source files (sorted, package files first) and the floor; generate the probe (probe-kotlin.ts);
 *             write the lists the Gradle modules read (HARNESS_LANE_DIR); print the invocation and the lists.
 *   run       `./gradlew --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin`
 *             from `harness/android/`, once. `gradle.properties` supplies the plain console and no parallelism.
 *   report    print `probe: blocked (:tokens not compiled)` when :tokens did not compile and the probe did not run;
 *             read the toolchain and the counts Gradle printed; write `run-<context>.json` for each context, for
 *             `scripts/harness/compare.ts --run`.
 *
 * Where the generated Kotlin is: the manifest's `platformOutputs.android`, which consumer.ts read from the
 * consumer's config (`platforms.android.output`, else `output`). Nothing here names a path.
 *
 * Tiers and floors (Req 3.4, computed at run time, never stored):
 *   gen  compiled = the `.kt` files on disk under the generated output folder;
 *        floor    = the `.kt` files `generate` reported in the manifest.
 *   pkg  compiled = the non-test `.kt` files on disk under the installed package, minus the package's root token files (`dist/ComponentTokens.*`, `dist/DesignTokens.*`);
 *        floor    = the same rule over the packed tarball's file list (`harness-tarball-files.txt`).
 *   So a file the install lost, or a generated file that was not written, leaves compiled below the floor.
 *   The compiled counts in the run files are the counts Gradle printed (`harness-sources:`), the number it gave
 *   the compiler, not the number this script listed.
 *
 * Status: written without a Gradle toolchain (Peter has not approved the downloads). `--prepare-only` has been
 * run against a fake consumer; `run` and `--selftest` have never run.
 *
 * Usage:
 *   npx tsx harness/android/lane.ts --consumer <root> --work <dir> [--prepare-only] [--pins <file>]
 *   npx tsx harness/android/lane.ts --selftest --work <dir>       the planted-internal self-test (Req 2.7)
 *
 * Exit status: 0 when the run files were written (a failing Gradle build is a result, not an error here);
 * 1 when a step of this script failed; 2 on a usage error. `--selftest` exits 1 when its expectations fail.
 */

import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import * as yaml from 'js-yaml';
import {
  generateProbe,
  probeConfigFromManifest,
  readProbeIndex,
  readProductTokenCategories,
  writeProbe,
} from '../../scripts/harness/probe-kotlin';
import { parseKotlin } from '../../scripts/harness/parse-kotlin';
import type { RunFile } from '../../scripts/harness/compare';

// ─── Constants ───────────────────────────────────────────────────────────────────────────────────

export const GRADLE_ARGS: readonly string[] = [
  '--continue',
  ':tokens:compileDebugKotlin',
  ':probe:compileDebugKotlin',
  ':dp:compileDebugKotlin',
];
/** The self-test builds only the two modules the planted member involves. */
export const SELFTEST_GRADLE_ARGS: readonly string[] = ['--continue', ':tokens:compileDebugKotlin', ':probe:compileDebugKotlin'];
export const CONTEXTS = ['harness-android-tokens', 'harness-android-components'] as const;
export const LOG_FILE = 'gradle.txt';
const ICON_RES = 'src/components/core/Icon-Base/platforms/android/res';
const PLANTED_FIXTURE = path.join('scripts', 'harness', '__tests__', 'fixtures', 'kotlin', 'planted-internal');

export class LaneError extends Error {
  constructor(public readonly step: 'prepare' | 'run' | 'report', detail: string) {
    super(`step "${step}" failed: ${detail}`);
    this.name = 'LaneError';
  }
}

// ─── Pure helpers (the file set) ─────────────────────────────────────────────────────────────────

/** A `*Test.kt` or `*Tests.kt` file, or one under a test folder. The packed tarball holds none; the filter stays so a future one cannot widen the set. */
export function isTestKotlin(relative: string): boolean {
  const segments = relative.split('/');
  const base = segments[segments.length - 1];
  return /Tests?\.kt$/.test(base) || segments.slice(0, -1).some((s) => s === 'test' || s === 'androidTest' || s === '__tests__');
}

/**
 * The package's own root token files are replaced by the consumer's generated ones. Req 2.4 and the Task 4 criterion name
 * `dist/ComponentTokens.*`; the first real run (2026-11-06) showed the tarball also ships `dist/DesignTokens.android.kt`, which
 * would be a second `DesignTokens.android.kt` beside the generated one, so both root files are left out ("one copy of each
 * native file name"). `ROOT_TOKEN_FILES` in scripts/pack-assert.ts lists them.
 */
export function isExcludedPackageFile(relative: string): boolean {
  return /^dist\/(ComponentTokens|DesignTokens)\./.test(relative);
}

/** The non-test packaged `.kt` files among `paths` (POSIX, relative to the package root), minus the package's root token files (`dist/ComponentTokens.*`, `dist/DesignTokens.*`), sorted by code point. */
export function packagedKotlin(paths: readonly string[]): string[] {
  return paths
    .filter((p) => p.endsWith('.kt') && !isTestKotlin(p) && !isExcludedPackageFile(p))
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

/** Base names that occur more than once: `:dp` takes one copy of each native file name (two files of one name collide as one JVM class). */
export function duplicateBaseNames(paths: readonly string[]): Map<string, string[]> {
  const byName = new Map<string, string[]>();
  for (const p of paths) {
    const base = p.slice(p.lastIndexOf('/') + 1);
    byName.set(base, [...(byName.get(base) ?? []), p]);
  }
  return new Map([...byName].filter(([, list]) => list.length > 1));
}

function walkKotlin(dir: string): string[] {
  const out: string[] = [];
  const walk = (current: string, rel: string): void => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const next = rel ? `${rel}/${entry.name}` : entry.name;
      if (entry.isDirectory()) walk(path.join(current, entry.name), next);
      else if (entry.isFile() && entry.name.endsWith('.kt')) out.push(next);
    }
  };
  walk(dir, '');
  return out.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

// ─── Pure helpers (the pins, the wrapper, the log) ───────────────────────────────────────────────

export interface AndroidPins {
  runner: string;
  toolchain: Record<string, string>;
}

/** The `android` section of `harness/pins.yaml`, checked for the shape this lane relies on. */
export function readAndroidPins(pinsFile: string): AndroidPins {
  const doc = yaml.load(fs.readFileSync(pinsFile, 'utf8')) as { android?: { runner?: unknown; toolchain?: Record<string, unknown> } } | null;
  const section = doc?.android;
  if (!section || typeof section !== 'object') throw new LaneError('prepare', `${pinsFile} has no \`android\` section`);
  if (typeof section.runner !== 'string') throw new LaneError('prepare', `${pinsFile}: android.runner is not a string`);
  const toolchain = section.toolchain;
  if (!toolchain || typeof toolchain !== 'object') throw new LaneError('prepare', `${pinsFile}: android.toolchain is not a mapping`);
  for (const [key, value] of Object.entries(toolchain)) {
    if (typeof value !== 'string') throw new LaneError('prepare', `${pinsFile}: android.toolchain.${key} is not a quoted string`);
  }
  return { runner: section.runner, toolchain: toolchain as Record<string, string> };
}

export function parseWrapperProperties(text: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1).replace(/\\:/g, ':');
  }
  return out;
}

/** What is wrong with `gradle-wrapper.properties` against the pinned Gradle version (criterion: it names that version in `distributionUrl` and sets `distributionSha256Sum`). */
export function wrapperProblems(props: Record<string, string>, pinnedGradle: string): string[] {
  const problems: string[] = [];
  const url = props.distributionUrl;
  if (!url) problems.push('distributionUrl is missing');
  else if (!url.endsWith(`/gradle-${pinnedGradle}-bin.zip`)) problems.push(`distributionUrl ${url} does not end in /gradle-${pinnedGradle}-bin.zip`);
  const sum = props.distributionSha256Sum;
  if (!sum) problems.push('distributionSha256Sum is missing');
  else if (!/^[0-9a-f]{64}$/.test(sum)) problems.push('distributionSha256Sum is not 64 lowercase hex digits');
  return problems;
}

/** `harness-toolchain: <field>=<value>` lines, as printed by the :tokens compile. */
export function parseToolchain(log: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of log.split('\n')) {
    const m = /^harness-toolchain: ([A-Za-z0-9._-]+)=(.*)$/.exec(line);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

export interface SourceCounts {
  tokensGen?: number;
  dpGen?: number;
  dpPkg?: number;
}

/** `harness-sources: :tokens gen=<n>` and `harness-sources: :dp gen=<n> pkg=<n>`: what Gradle gave each compile. */
export function parseSourceCounts(log: string): SourceCounts {
  const out: SourceCounts = {};
  for (const line of log.split('\n')) {
    const t = /^harness-sources: :tokens gen=(\d+)\s*$/.exec(line);
    if (t) out.tokensGen = Number(t[1]);
    const d = /^harness-sources: :dp gen=(\d+) pkg=(\d+)\s*$/.exec(line);
    if (d) {
      out.dpGen = Number(d[1]);
      out.dpPkg = Number(d[2]);
    }
  }
  return out;
}

// ─── prepare ─────────────────────────────────────────────────────────────────────────────────────

interface ManifestLike {
  name: string;
  packageRoot: string;
  package: { fileList: string };
  tokenIndex: string;
  productTokens: string;
  platformOutputs: { android: string };
  generated: { android: string[] };
  themes?: unknown;
}

export interface Plan {
  laneDir: string;
  genAbsolute: string[];
  pkgAbsolute: string[];
  floors: { gen: number; pkg: number };
  roots: { gen: string; pkg: string; probe: string };
  probeReads: { indexNames: number; totalReads: number };
}

const byCodePoint = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0);

export interface PrepareOptions {
  repoRoot: string;
  consumer: string;
  work: string;
  pinsFile: string;
  log: (line: string) => void;
}

export function prepare(options: PrepareOptions): Plan {
  const { repoRoot, work, log } = options;
  const consumer = fs.realpathSync(options.consumer);
  const androidDir = path.join(repoRoot, 'harness', 'android');
  const manifest = JSON.parse(fs.readFileSync(path.join(consumer, 'harness-consumer.json'), 'utf8')) as ManifestLike;

  // The pins and the wrapper (criteria: the wrapper names the pinned Gradle version; the pin file pins the toolchain).
  const pins = readAndroidPins(options.pinsFile);
  const pinnedGradle = pins.toolchain['gradle.version'];
  if (!pinnedGradle) throw new LaneError('prepare', 'android.toolchain has no gradle.version');
  const wrapperFile = path.join(androidDir, 'gradle', 'wrapper', 'gradle-wrapper.properties');
  const problems = wrapperProblems(parseWrapperProperties(fs.readFileSync(wrapperFile, 'utf8')), pinnedGradle);
  if (problems.length > 0) throw new LaneError('prepare', `${wrapperFile}: ${problems.join('; ')}`);

  // Where things are, from the manifest (never a hard-coded path).
  const genRoot = path.join(consumer, manifest.platformOutputs.android);
  const pkgRoot = path.join(consumer, manifest.packageRoot);
  for (const [what, dir] of [['the generated output folder', genRoot], ['the installed package', pkgRoot]] as const) {
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) throw new LaneError('prepare', `${what} is not a folder: ${dir}`);
  }

  // Compiled lists, from disk.
  const genRelative = walkKotlin(genRoot);
  const pkgRelative = packagedKotlin(walkKotlin(pkgRoot));
  // Floors, from what generate and the packed tarball say.
  const tarball = fs.readFileSync(path.join(consumer, manifest.package.fileList), 'utf8').split('\n').filter((l) => l.trim() !== '');
  const floors = { gen: manifest.generated.android.filter((f) => f.endsWith('.kt')).length, pkg: packagedKotlin(tarball).length };
  if (genRelative.length === 0) throw new LaneError('prepare', `no .kt file under ${genRoot}`);
  if (pkgRelative.length === 0) throw new LaneError('prepare', `no packaged .kt file under ${pkgRoot}`);

  const genAbsolute = genRelative.map((r) => path.join(genRoot, r));
  const pkgAbsolute = pkgRelative.map((r) => path.join(pkgRoot, r));

  // One copy of each native file name in :dp's set.
  const dupes = duplicateBaseNames([...pkgAbsolute, ...genAbsolute]);
  if (dupes.size > 0) {
    const [name, list] = [...dupes][0];
    throw new LaneError('prepare', `:dp would compile ${dupes.size} file name(s) twice; first: ${name} at ${list.join(' and ')}`);
  }

  const iconRes = path.join(pkgRoot, ICON_RES);
  if (!fs.existsSync(iconRes) || !fs.statSync(iconRes).isDirectory()) throw new LaneError('prepare', `Icon-Base res/ is not a folder: ${iconRes}`);

  // The probe, generated from the consumer's index and its manifest.
  const laneDir = path.resolve(work, 'lane');
  fs.rmSync(laneDir, { recursive: true, force: true });
  fs.mkdirSync(laneDir, { recursive: true });
  const probe = generateProbe({
    index: readProbeIndex(path.join(consumer, manifest.tokenIndex)),
    config: probeConfigFromManifest(manifest),
    productTokens: readProductTokenCategories(path.join(consumer, manifest.productTokens)),
  });
  const probeFiles = writeProbe(laneDir, probe);

  const write = (name: string, lines: readonly string[]): void => fs.writeFileSync(path.join(laneDir, name), lines.length > 0 ? `${lines.join('\n')}\n` : '');
  write('tokens.sources', [...genAbsolute]);
  write('probe.sources', [...probeFiles].sort(byCodePoint));
  write('dp.pkg.sources', [...pkgAbsolute]);
  write('dp.gen.sources', [...genAbsolute]);
  write('dp.res', [iconRes]);

  log(`harness-android: invocation: (cd harness/android && HARNESS_LANE_DIR=${laneDir} ./gradlew ${GRADLE_ARGS.join(' ')})`);
  log(`harness-android: gen files given to the compiler: ${genAbsolute.length} (floor ${floors.gen}); pkg files: ${pkgAbsolute.length} (floor ${floors.pkg}); probe files: ${probeFiles.length} (${probe.expectedIndexNames} index names, ${probe.totalReads} reads)`);
  log('harness-android: :dp file order (package files first, then generated files, each sorted by path):');
  for (const f of [...pkgAbsolute, ...genAbsolute]) log(`  ${f}`);

  return {
    laneDir,
    genAbsolute,
    pkgAbsolute,
    floors,
    roots: { gen: genRoot, pkg: pkgRoot, probe: path.join(laneDir, 'src') },
    probeReads: { indexNames: probe.expectedIndexNames, totalReads: probe.totalReads },
  };
}

// ─── run and report ──────────────────────────────────────────────────────────────────────────────

export interface GradleRun {
  log: string;
  exitCode: number;
}

export function runGradle(androidDir: string, laneDir: string, args: readonly string[] = GRADLE_ARGS): GradleRun {
  const gradlew = path.join(androidDir, 'gradlew');
  if (!fs.existsSync(gradlew)) {
    throw new LaneError('run', `${gradlew} does not exist: the Gradle wrapper (gradlew, gradlew.bat, gradle/wrapper/gradle-wrapper.jar) is generated with \`gradle wrapper\` and has not been committed yet`);
  }
  const result = spawnSync('/bin/sh', ['-c', `./gradlew ${args.join(' ')} 2>&1`], {
    cwd: androidDir,
    env: { ...process.env, HARNESS_LANE_DIR: laneDir },
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  if (result.error) throw new LaneError('run', `could not start ./gradlew: ${result.error.message}`);
  return { log: result.stdout, exitCode: result.status ?? 1 };
}

export function buildRunFiles(plan: Plan, run: GradleRun): Record<(typeof CONTEXTS)[number], RunFile> {
  const counts = parseSourceCounts(run.log);
  const toolchain = parseToolchain(run.log);
  const base = { roots: plan.roots, gradle: { log: LOG_FILE, exitCode: run.exitCode }, toolchain };
  return {
    'harness-android-tokens': { ...base, files: { gen: { compiled: counts.tokensGen ?? 0, floor: plan.floors.gen } } },
    'harness-android-components': {
      ...base,
      files: {
        gen: { compiled: counts.dpGen ?? 0, floor: plan.floors.gen },
        pkg: { compiled: counts.dpPkg ?? 0, floor: plan.floors.pkg },
      },
    },
  };
}

/** The line a context prints while the probe cannot run; null when the probe ran or :tokens compiled. */
export function blockedLine(run: GradleRun, roots: Plan['roots']): string | null {
  if (/^probe: read \d+ of \d+/m.test(run.log)) return null;
  const parsed = parseKotlin({ log: run.log, exitCode: run.exitCode, roots });
  return parsed.compiles[0].outcome === 'succeeded' ? null : 'probe: blocked (:tokens not compiled)';
}

// ─── The planted-internal self-test (Req 2.7) ────────────────────────────────────────────────────

/**
 * Compiles the planted-internal fixture's `DesignTokens` as `:tokens` and a probe generated from the fixture's index
 * as `:probe`. A member the generator left `internal` must give exactly one `probe:` entry, and the read count 2 of 2.
 */
export function selftest(repoRoot: string, work: string, log: (line: string) => void): boolean {
  const fixture = path.join(repoRoot, PLANTED_FIXTURE);
  const laneDir = path.resolve(work, 'selftest-lane');
  fs.rmSync(laneDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(laneDir, 'empty-res'), { recursive: true });
  const manifest = JSON.parse(fs.readFileSync(path.join(fixture, 'harness-consumer.json'), 'utf8')) as ManifestLike;
  const probe = generateProbe({
    index: readProbeIndex(path.join(fixture, manifest.tokenIndex)),
    config: probeConfigFromManifest(manifest),
    productTokens: [],
  });
  const probeFiles = writeProbe(laneDir, probe);
  const write = (name: string, lines: readonly string[]): void => fs.writeFileSync(path.join(laneDir, name), lines.length > 0 ? `${lines.join('\n')}\n` : '');
  write('tokens.sources', [path.join(fixture, 'DesignTokens.android.kt')]);
  write('probe.sources', probeFiles);
  write('dp.pkg.sources', []);
  write('dp.gen.sources', []);
  write('dp.res', [path.join(laneDir, 'empty-res')]);

  const run = runGradle(path.join(repoRoot, 'harness', 'android'), laneDir, SELFTEST_GRADLE_ARGS);
  fs.writeFileSync(path.join(work, 'selftest-gradle.txt'), run.log);
  const roots = { gen: fixture, pkg: path.join(work, 'no-package'), probe: path.join(laneDir, 'src') };
  const parsed = parseKotlin({ log: run.log, exitCode: run.exitCode, roots });
  const [tokens, probeResult] = parsed.compiles;
  const keys = [...probeResult.diagnostics.keys()];
  const failures: string[] = [];
  if (tokens.outcome !== 'succeeded') failures.push(`:tokens did not compile (${tokens.outcome})`);
  if (!/^probe: read 2 of 2\b/m.test(run.log)) failures.push('the log has no `probe: read 2 of 2` line');
  if (keys.length !== 1) failures.push(`expected exactly one probe entry, got ${keys.length}: ${keys.join(' // ')}`);
  else if (!/^probe:ProbeTokens\.kt \| /.test(keys[0]) || !/space_planted/.test(keys[0]) || !/internal/i.test(keys[0])) {
    failures.push(`the one probe entry is not the planted internal member: ${keys[0]}`);
  }
  if (tokens.diagnostics.size > 0) failures.push(':tokens reported diagnostics');
  log(failures.length === 0 ? `selftest: PASS (one probe entry: ${keys[0]})` : `selftest: FAIL (${failures.join('; ')})`);
  return failures.length === 0;
}

// ─── Command line ────────────────────────────────────────────────────────────────────────────────

export function main(argv: readonly string[], log: (line: string) => void = console.log): number {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const flags = new Set<string>();
  const values = new Map<string, string>();
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--prepare-only' || arg === '--selftest') flags.add(arg);
    else if (arg === '--consumer' || arg === '--work' || arg === '--pins') {
      const value = argv[++i];
      if (value === undefined) { log(`lane: ${arg} needs a value`); return 2; }
      values.set(arg, value);
    } else { log(`lane: unknown argument ${arg}`); return 2; }
  }
  const work = values.get('--work');
  if (!work) { log('lane: usage: --consumer <root> --work <dir> [--prepare-only] [--pins <file>] | --selftest --work <dir>'); return 2; }
  fs.mkdirSync(work, { recursive: true });
  try {
    if (flags.has('--selftest')) return selftest(repoRoot, work, log) ? 0 : 1;
    const consumer = values.get('--consumer');
    if (!consumer) { log('lane: --consumer is required'); return 2; }
    const plan = prepare({ repoRoot, consumer, work, pinsFile: values.get('--pins') ?? path.join(repoRoot, 'harness', 'pins.yaml'), log });
    if (flags.has('--prepare-only')) { log('harness-android: prepared; not run (--prepare-only)'); return 0; }
    const run = runGradle(path.join(repoRoot, 'harness', 'android'), plan.laneDir);
    fs.writeFileSync(path.join(work, LOG_FILE), run.log);
    const blocked = blockedLine(run, plan.roots);
    if (blocked) log(blocked);
    const runFiles = buildRunFiles(plan, run);
    for (const context of CONTEXTS) fs.writeFileSync(path.join(work, `run-${context}.json`), `${JSON.stringify(runFiles[context], null, 2)}\n`);
    log(`harness-android: gradle exit ${run.exitCode}; wrote ${LOG_FILE} and run-<context>.json under ${work}`);
    return 0;
  } catch (error) {
    log(`harness-android: ${(error as Error).message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
