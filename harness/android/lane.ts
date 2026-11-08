#!/usr/bin/env tsx
/**
 * lane.ts — the Android compile lane's runner (Spec 129 Task 4, subtasks 4.1 and 4.3; design.md §§ 2 and 3).
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
 *             `scripts/harness/compare.ts --run`. The token context's `checks` hold each probe count line
 *             (`n` against `m`; from the generated probe source, detail `blocked`, while `:tokens` fails) and
 *             the per-run instance check, on every run. The lane
 *             never stops on a toolchain pin mismatch: it records the versions and the comparator fails the
 *             context as `toolchain`. It stops before Gradle, writing no run file, only on a setup failure
 *             (a duplicate native file name, a bad harness config, a missing toolchain).
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
 * Status: see README.md.
 *
 * Usage:
 *   npx tsx harness/android/lane.ts --consumer <root> --work <dir> [--prepare-only] [--pins <file>]
 *   npx tsx harness/android/lane.ts --selftest --work <dir>       the planted-internal self-test (Req 2.7)
 *   npx tsx harness/android/lane.ts --default-name --consumer <root> --work <dir>
 *                                                                 the default-name compile (Task 20, U7a)
 *
 * Exit status: 0 when the run files were written (a failing Gradle build is a result, not an error here);
 * 1 when a step of this script failed; 2 on a usage error. `--selftest` exits 1 when its expectations fail.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { spawnSync } from 'child_process';
import * as yaml from 'js-yaml';
import {
  checkThemeInstances,
  generateProbe,
  probeConfigFromManifest,
  readProbeIndex,
  readProductFiles,
  writeProbe,
  type ProbeConfig,
  type ProbeGroups,
} from '../../scripts/harness/probe-kotlin';
import { parseKotlin } from '../../scripts/harness/parse-kotlin';
import { checkHarnessConsumerConfig, providerReads } from '../../scripts/harness/native-rules';
import type { RunCheck, RunFile } from '../../scripts/harness/compare';

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

/**
 * Throws, naming both paths, when two files of the set share a base name (a setup failure: the lane stops before
 * Gradle and writes no run file). The package's root token files are left out by `packagedKotlin` before this runs.
 */
export function assertOneCopyPerName(paths: readonly string[]): void {
  const dupes = duplicateBaseNames(paths);
  if (dupes.size === 0) return;
  const [name, list] = [...dupes][0];
  throw new LaneError('prepare', `:dp would compile ${dupes.size} file name(s) twice; first: ${name} at ${list.join(' and ')}`);
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
  /** The probe's input config (the manifest's name and themes), for the per-run instance check. */
  config: ProbeConfig;
  /** The four count groups of the probe source this lane generated: `m` from the inputs, `n` counted from the emitted text. */
  probeGroups: ProbeGroups;
  /** The generated Kotlin, all files joined in path order: what the per-run instance check parses. */
  generatedText: string;
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
  assertOneCopyPerName([...pkgAbsolute, ...genAbsolute]);

  const iconRes = path.join(pkgRoot, ICON_RES);
  if (!fs.existsSync(iconRes) || !fs.statSync(iconRes).isDirectory()) throw new LaneError('prepare', `Icon-Base res/ is not a folder: ${iconRes}`);

  // The probe, generated from the consumer's index and its manifest.
  const laneDir = path.resolve(work, 'lane');
  fs.rmSync(laneDir, { recursive: true, force: true });
  fs.mkdirSync(laneDir, { recursive: true });
  const config = probeConfigFromManifest(manifest);
  // A check on our own fixture config (design § 4, "The shared harness module"), not a refusal of a consumer.
  const configProblems = checkHarnessConsumerConfig(config.themes);
  if (configProblems.length > 0) throw new LaneError('prepare', configProblems.join('; '));
  const probe = generateProbe({
    index: readProbeIndex(path.join(consumer, manifest.tokenIndex)),
    config,
    productFiles: readProductFiles(path.join(consumer, manifest.productTokens)),
  });
  const probeFiles = writeProbe(laneDir, probe);

  const write = (name: string, lines: readonly string[]): void => fs.writeFileSync(path.join(laneDir, name), lines.length > 0 ? `${lines.join('\n')}\n` : '');
  write('tokens.sources', [...genAbsolute]);
  write('probe.sources', [...probeFiles].sort(byCodePoint));
  write('dp.pkg.sources', [...pkgAbsolute]);
  write('dp.gen.sources', [...genAbsolute]);
  write('dp.res', [iconRes]);

  log(`harness-android: invocation: (cd harness/android && HARNESS_LANE_DIR=${laneDir} ./gradlew ${GRADLE_ARGS.join(' ')})`);
  log(`harness-android: gen files given to the compiler: ${genAbsolute.length} (floor ${floors.gen}); pkg files: ${pkgAbsolute.length} (floor ${floors.pkg}); probe files: ${probeFiles.length} (index ${probe.groups.index.m}, instances ${probe.groups.instances.m}, product ${probe.groups.product.m}, provider ${probe.groups.provider.m})`);
  log('harness-android: :dp file order (package files first, then generated files, each sorted by path):');
  for (const f of [...pkgAbsolute, ...genAbsolute]) log(`  ${f}`);

  return {
    laneDir,
    genAbsolute,
    pkgAbsolute,
    floors,
    roots: { gen: genRoot, pkg: pkgRoot, probe: path.join(laneDir, 'src') },
    probeReads: { indexNames: probe.groups.index.m, totalReads: probe.totalReads },
    config,
    probeGroups: probe.groups,
    generatedText: genAbsolute.map((f) => fs.readFileSync(f, 'utf8')).join('\n'),
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

/** The four count lines `:probe` prints, as `checks` names (design § 3, "The probe's count lines and the run file's `checks`"). */
export const COUNT_LINES = [
  { name: 'probe: read index names', pattern: /^probe: read (\d+) of (\d+) index names\b/m },
  { name: 'probe: instances read', pattern: /^probe: instances read (\d+) of (\d+)\s*$/m },
  { name: 'probe: product read', pattern: /^probe: product read (\d+) of (\d+)\s*$/m },
  { name: 'probe: provider read', pattern: /^probe: provider read (\d+) of (\d+)\s*$/m },
] as const;

/**
 * The `harness-android-tokens` run file's `checks`: each count line (`ok` when `n` equals `m`) and the per-run
 * instance check, on every run.
 *   - `:tokens` compiled: the counts are the lines `:probe` printed. A missing line is a failing entry (it fails
 *     closed: a probe that printed no count cannot read as green).
 *   - `:tokens` did not compile: Gradle skipped `:probe`, so no line was printed (the blocked line stands in). The
 *     counts are then taken from the probe source this lane generated (`n` counted from the emitted text, `m` from
 *     the inputs), with detail `blocked`; a mismatch is still `ok: false`. A blocked probe is not a compile, so it
 *     adds no diagnostic (design § 3, "The probe's count lines and the run file's `checks`").
 * The instance check reads the generated files, needs no compile, and so runs regardless.
 */
export function buildChecks(plan: Plan, run: GradleRun): RunCheck[] {
  const parsed = parseKotlin({ log: run.log, exitCode: run.exitCode, roots: plan.roots });
  const blocked = parsed.compiles[0].outcome !== 'succeeded';
  const groupOf: Record<(typeof COUNT_LINES)[number]['name'], keyof ProbeGroups> = {
    'probe: read index names': 'index',
    'probe: instances read': 'instances',
    'probe: product read': 'product',
    'probe: provider read': 'provider',
  };
  const checks: RunCheck[] = [];
  for (const { name, pattern } of COUNT_LINES) {
    if (blocked) {
      const g = plan.probeGroups[groupOf[name]];
      checks.push({ name, ok: g.n === g.m, detail: g.n === g.m ? 'blocked' : `blocked: ${g.n} of ${g.m}` });
      continue;
    }
    const m = pattern.exec(run.log);
    if (m === null) checks.push({ name, ok: false, detail: 'the probe printed no such count line' });
    else checks.push({ name, ok: m[1] === m[2], detail: `${m[1]} of ${m[2]}` });
  }
  const instances = checkThemeInstances(plan.generatedText, plan.config);
  checks.push({ name: 'theme instances', ok: instances.ok, detail: instances.detail });
  return checks;
}

export function buildRunFiles(plan: Plan, run: GradleRun): Record<(typeof CONTEXTS)[number], RunFile> {
  const counts = parseSourceCounts(run.log);
  const toolchain = parseToolchain(run.log);
  // The lane records the versions it ran and never stops on a pin mismatch: the comparator fails the context as `toolchain`.
  const base = { roots: plan.roots, gradle: { log: LOG_FILE, exitCode: run.exitCode }, toolchain };
  return {
    'harness-android-tokens': { ...base, files: { gen: { compiled: counts.tokensGen ?? 0, floor: plan.floors.gen } }, checks: buildChecks(plan, run) },
    'harness-android-components': {
      ...base,
      files: {
        gen: { compiled: counts.dpGen ?? 0, floor: plan.floors.gen },
        pkg: { compiled: counts.dpPkg ?? 0, floor: plan.floors.pkg },
      },
      // The component context reads no probe: its gating results are the compiles'.
      checks: [],
    },
  };
}

/** The line a context prints while the probe cannot run; null when the probe ran or :tokens compiled. */
export function blockedLine(run: GradleRun, roots: Plan['roots']): string | null {
  if (/^probe: read \d+ of \d+/m.test(run.log)) return null;
  const parsed = parseKotlin({ log: run.log, exitCode: run.exitCode, roots });
  return parsed.compiles[0].outcome === 'succeeded' ? null : 'probe: blocked (:tokens not compiled)';
}

// ─── The resolve step (Task 19.1; design § 3, "Verdicts name their side") ──────────────────────────

/**
 * One Gradle call before any compile: the root project's `resolveAll` task resolves the `debugCompileClasspath` of
 * `:tokens`, `:probe` and `:dp` (and the Kotlin compiler's own classpath), and configuring the build resolves its plugins.
 * `RESOLVED_MARKER` is written only when that call succeeds. The cache is saved only when the marker exists, so a
 * registry fault (a 403 from Maven Central, say) cannot save a partial cache under the new key.
 */
export const RESOLVE_ARGS: readonly string[] = ['resolveAll'];
export const RESOLVED_MARKER = 'resolved.ok';
export const INFRA_FILE = 'infra.json';
export const RESOLVE_LOG = 'resolve.txt';

/** Hosts whose faults are the environment's: Maven Central, Google Maven, the Gradle plugin portal, `services.gradle.org`. */
export const REGISTRY_HOSTS: readonly string[] = [
  'repo.maven.apache.org',
  'repo1.maven.org',
  'plugins.gradle.org',
  'services.gradle.org',
  'dl.google.com',
  'maven.google.com',
];

export type ResolveStepName = 'wrapper' | 'plugins' | 'dependencies';
export interface InfraFault {
  host: string;
  /** An HTTP status, or `network` / `unknown-host` for a transport failure. */
  status: number | string;
  step: ResolveStepName;
}
export type ResolveClass = ({ kind: 'infra' } & InfraFault) | { kind: 'ordinary'; detail: string };

const infraStatus = (n: number): boolean => n === 403 || n === 429 || (n >= 500 && n <= 599);
const hostOf = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const UNKNOWN_HOST = /UnknownHostException|Name or service not known|Temporary failure in name resolution|nodename nor servname provided|Unknown host/i;
const NETWORK_FAULT =
  /Connection refused|Connection reset|Connect timed out|connect timed out|Read timed out|Remote host terminated the handshake|Software caused connection abort|Premature end of|Broken pipe|No route to host|Network is unreachable|SSLHandshakeException/;
/** What a missing or mismatched coordinate looks like: a real defect, never the environment's. */
const ORDINARY_SIGNAL = /Could not find\s|No matching (?:variant|configuration|capability)|Cannot find a (?:version|variant)|Received status code (?:400|401|404|410)\b|Server returned HTTP response code: (?:400|401|404|410)\b/;

function resolveDetail(lines: readonly string[]): string {
  const at = lines.findIndex((l) => l.startsWith('* What went wrong:'));
  const body = (at < 0 ? lines : lines.slice(at + 1)).map((l) => l.trim()).filter((l) => l !== '');
  return (body.slice(0, 3).join(' ') || 'the resolve step failed with no message').slice(0, 300);
}

/**
 * Classifies a failed resolve step from Gradle's log. A fault is the environment's (`infra`) when it is a 403, a 429
 * or a 5xx status, or a transport failure (connection refused or reset, timeout, unknown host), from a registry host.
 * Everything else is `ordinary`: a 404, a "Could not find" coordinate, a version mismatch, a status from a host that
 * is not a registry, or a log with no fault in it. Any ordinary signal wins over an infra one, so a real defect cannot
 * hide behind a registry fault in the same log.
 */
export function classifyResolveFailure(log: string): ResolveClass {
  const lines = log.split(/\r?\n/);
  if (lines.some((l) => ORDINARY_SIGNAL.test(l))) return { kind: 'ordinary', detail: resolveDetail(lines) };
  const phase: ResolveStepName = /A problem occurred configuring|buildscript of|Plugin \[id/.test(log) ? 'plugins' : 'dependencies';
  let lastUrl = '';
  let lastUrlAt = -100;
  const faults: Array<{ host: string; status: number | string }> = [];
  lines.forEach((line, i) => {
    const u = /Could not (?:GET|HEAD|PUT|get resource)\s+'(https?:\/\/[^']+)'/.exec(line);
    if (u) {
      lastUrl = u[1];
      lastUrlAt = i;
    }
    const downloading = /^Downloading (https?:\/\/\S+)/.exec(line);
    if (downloading) {
      lastUrl = downloading[1];
      lastUrlAt = i;
    }
    const near = i - lastUrlAt <= 8 ? hostOf(lastUrl) : '';
    const wrapper = /Server returned HTTP response code: (\d{3}) for URL: (https?:\/\/\S+)/.exec(line);
    if (wrapper) faults.push({ host: hostOf(wrapper[2]), status: Number(wrapper[1]) });
    const status = /Received status code (\d{3})/.exec(line);
    if (status) faults.push({ host: near, status: Number(status[1]) });
    if (!wrapper && !status) {
      const unknown = UNKNOWN_HOST.test(line);
      if (unknown || NETWORK_FAULT.test(line)) {
        const named = /(?:UnknownHostException:|Connect to|host)\s+\[?([A-Za-z0-9.-]+\.[A-Za-z]{2,})/.exec(line);
        faults.push({ host: near || (named ? named[1] : ''), status: unknown ? 'unknown-host' : 'network' });
      }
    }
  });
  const infra = faults.find((f) => REGISTRY_HOSTS.includes(f.host) && (typeof f.status === 'string' || infraStatus(f.status)));
  // The wrapper's own download is the fault when the host is services.gradle.org; otherwise the phase that failed.
  if (infra) return { kind: 'infra', host: infra.host, status: infra.status, step: infra.host === 'services.gradle.org' ? 'wrapper' : phase };
  return { kind: 'ordinary', detail: resolveDetail(lines) };
}

export type GradleRunner = (androidDir: string, laneDir: string, args?: readonly string[]) => GradleRun;

/**
 * Runs the resolve step through `gradle`, keeps its log, and writes the result under `work`: `resolved.ok` on
 * success, `infra.json` (`{ host, status, step }`) on an infra fault, neither on an ordinary failure. Stale copies of
 * both are removed first.
 */
export function resolveStep(work: string, run: GradleRun): { kind: 'ok' } | ResolveClass {
  fs.rmSync(path.join(work, RESOLVED_MARKER), { force: true });
  fs.rmSync(path.join(work, INFRA_FILE), { force: true });
  fs.writeFileSync(path.join(work, RESOLVE_LOG), run.log);
  if (run.exitCode === 0) {
    fs.writeFileSync(path.join(work, RESOLVED_MARKER), '');
    return { kind: 'ok' };
  }
  const cls = classifyResolveFailure(run.log);
  if (cls.kind === 'infra') fs.writeFileSync(path.join(work, INFRA_FILE), `${JSON.stringify({ host: cls.host, status: cls.status, step: cls.step }, null, 2)}\n`);
  return cls;
}

/** The run files of an ordinary resolve failure: a failing `resolve` check, no compile, so the comparator fails as `check`. */
export function resolveFailureRunFiles(plan: Plan, run: GradleRun, detail: string): Record<(typeof CONTEXTS)[number], RunFile> {
  const base = { roots: plan.roots, gradle: { log: RESOLVE_LOG, exitCode: run.exitCode }, toolchain: {}, checks: [{ name: 'resolve', ok: false, detail }] };
  return {
    'harness-android-tokens': { ...base, files: { gen: { compiled: 0, floor: plan.floors.gen } } },
    'harness-android-components': { ...base, files: { gen: { compiled: 0, floor: plan.floors.gen }, pkg: { compiled: 0, floor: plan.floors.pkg } } },
  };
}

/**
 * Everything the lane does between `prepare` and the compile. Returns whether to compile, and the exit status when not:
 * an infra fault writes `infra.json`, no run file, and exits 1 (so the job writes no `harness-verdict`); an ordinary
 * failure writes the run files with the failing `resolve` check and no compile, and exits 0 (the comparator then fails).
 */
export function resolveAndReport(
  context: { work: string; plan: Plan; androidDir: string },
  gradle: GradleRunner,
  log: (line: string) => void,
): { proceed: true } | { proceed: false; code: number } {
  const run = gradle(context.androidDir, context.plan.laneDir, RESOLVE_ARGS);
  const result = resolveStep(context.work, run);
  if (result.kind === 'ok') {
    log(`harness-android: resolve step ok; wrote ${RESOLVED_MARKER}`);
    return { proceed: true };
  }
  if (result.kind === 'infra') {
    log(`harness-infra: ${result.host} ${result.status} ${result.step}`);
    return { proceed: false, code: 1 };
  }
  const files = resolveFailureRunFiles(context.plan, run, result.detail);
  for (const c of CONTEXTS) fs.writeFileSync(path.join(context.work, `run-${c}.json`), `${JSON.stringify(files[c], null, 2)}\n`);
  log(`FAIL resolve: ${result.detail}`);
  log(`harness-android: resolve step failed (ordinary); wrote run-<context>.json with a failing resolve check, no compile`);
  return { proceed: false, code: 0 };
}

// ─── The planted-internal self-test (Req 2.7) ────────────────────────────────────────────────────

/**
 * Compiles the planted-internal fixture's `DesignTokens` as `:tokens` and a probe generated from the fixture's index
 * as `:probe`. A member the generator left `internal` must give exactly one `probe:` entry, and the read count 2 of 2.
 */
export function selftest(repoRoot: string, work: string, log: (line: string) => void, infraOut: string = work): boolean {
  const fixture = path.join(repoRoot, PLANTED_FIXTURE);
  const laneDir = path.resolve(work, 'selftest-lane');
  fs.rmSync(laneDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(laneDir, 'empty-res'), { recursive: true });
  const manifest = JSON.parse(fs.readFileSync(path.join(fixture, 'harness-consumer.json'), 'utf8')) as ManifestLike;
  const probe = generateProbe({
    index: readProbeIndex(path.join(fixture, manifest.tokenIndex)),
    config: probeConfigFromManifest(manifest),
    productFiles: [],
    provider: false,
  });
  const probeFiles = writeProbe(laneDir, probe);
  const write = (name: string, lines: readonly string[]): void => fs.writeFileSync(path.join(laneDir, name), lines.length > 0 ? `${lines.join('\n')}\n` : '');
  write('tokens.sources', [path.join(fixture, 'DesignTokens.android.kt')]);
  write('probe.sources', probeFiles);
  write('dp.pkg.sources', []);
  write('dp.gen.sources', []);
  write('dp.res', [path.join(laneDir, 'empty-res')]);

  const androidDir = path.join(repoRoot, 'harness', 'android');
  // The same resolve step as the lane's, first: a registry fault is the environment's, so it writes infra.json (to
  // `infraOut`, the folder the job's annotation step reads) and not a failing self-test.
  const resolveRun = runGradle(androidDir, laneDir, RESOLVE_ARGS);
  fs.writeFileSync(path.join(work, 'selftest-resolve.txt'), resolveRun.log);
  if (resolveRun.exitCode !== 0) {
    const cls = classifyResolveFailure(resolveRun.log);
    if (cls.kind === 'infra') {
      fs.mkdirSync(infraOut, { recursive: true });
      fs.writeFileSync(path.join(infraOut, INFRA_FILE), `${JSON.stringify({ host: cls.host, status: cls.status, step: cls.step }, null, 2)}\n`);
      log(`harness-infra: ${cls.host} ${cls.status} ${cls.step}`);
    }
    log(`selftest: FAIL (the resolve step failed: ${cls.kind === 'infra' ? `${cls.host} ${cls.status}` : cls.detail})`);
    return false;
  }
  const run = runGradle(androidDir, laneDir, SELFTEST_GRADLE_ARGS);
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

// ─── The default-name compile (Task 20, U7a; design § 2 "The default-name step", § 4 "Android provider") ──────────

/**
 * The product name `loadConfig` resolves when the config has no top-level `name`: `DEFAULTS.name` in
 * `src/config/ConfigLoader.ts`. A changed default turns the step red, and the line names both values.
 */
export const DEFAULT_PRODUCT_NAME = 'DesignerPunk';
/** The abbreviation the harness consumer's config keeps (`harness/pins.yaml` § consumer; not ConfigLoader's `DP`). */
export const DEFAULT_ABBREVIATION = 'HX';
export const DEFAULT_NAME_FILE = 'ProbeFamily.kt';

/** `consumer.ts`'s `READ_CONFIG_SCRIPT`: the call that resolves the consumer's config with its installed `loadConfig`. */
const READ_CONFIG_SCRIPT =
  "const { loadConfig } = require(process.argv[1]);" +
  "loadConfig(process.cwd()).then((c) => { process.stdout.write(JSON.stringify(c)); })" +
  ".catch((e) => { console.error((e && e.stack) || String(e)); process.exit(1); });";

/** The part of the resolved config the step reads. */
export interface ResolvedDefaultConfig {
  name: string;
  abbreviation: string;
  themes: { name: string; mode?: string }[];
}

/**
 * The spans of the top-level properties named `key` in the object literal `defineConfig({ ... })`: each is
 * `[start, end)`, from the key to the end of its value (the next comma at the object's own depth, or its closing brace).
 * A small scanner: it skips strings, template literals and comments, and counts `{ [ (` depth.
 */
function topLevelPropertySpans(text: string, key: string): Array<[number, number]> {
  const call = text.indexOf('defineConfig(');
  if (call < 0) return [];
  const open = text.indexOf('{', call);
  if (open < 0) return [];
  const spans: Array<[number, number]> = [];
  let depth = 0;
  let i = open;
  let spanStart = -1;
  let expectKey = false;
  const skipString = (quote: string): void => {
    i += 1;
    while (i < text.length && text[i] !== quote) i += text[i] === '\\' ? 2 : 1;
  };
  while (i < text.length) {
    const c = text[i];
    if (c === '/' && text[i + 1] === '/') { while (i < text.length && text[i] !== '\n') i += 1; continue; }
    if (c === '/' && text[i + 1] === '*') { const e = text.indexOf('*/', i + 2); i = e < 0 ? text.length : e + 2; continue; }
    if (depth === 1 && expectKey) {
      const m = /^(?:'([^']*)'|"([^"]*)"|([A-Za-z_$][\w$]*))\s*(:)?/.exec(text.slice(i));
      if (m && (m[1] ?? m[2] ?? m[3]) === key && m[4] === ':') { spanStart = i; expectKey = false; i += m[0].length; continue; }
      if (/\s/.test(c)) { i += 1; continue; }
      expectKey = false;
    }
    if (c === '"' || c === "'" || c === '`') { skipString(c); i += 1; continue; }
    if (c === '{' || c === '[' || c === '(') {
      depth += 1;
      if (depth === 1) expectKey = true;
    } else if (c === '}' || c === ']' || c === ')') {
      depth -= 1;
      if (depth === 0) { if (spanStart >= 0) spans.push([spanStart, i]); return spans; }
    } else if (c === ',' && depth === 1) {
      if (spanStart >= 0) { spans.push([spanStart, i + 1]); spanStart = -1; }
      expectKey = true;
    }
    i += 1;
  }
  return spans;
}

/** How many top-level `name` properties the config text declares. */
export function topLevelNameCount(configText: string): number {
  return topLevelPropertySpans(configText, 'name').length;
}

/**
 * The config with its one top-level `name` property removed and every other line kept: the theme entries' own `name:`
 * keys and `abbreviation` stay. Throws unless exactly one such property exists. A property alone on its line takes
 * its indentation and line break with it.
 */
export function removeTopLevelName(configText: string): string {
  const spans = topLevelPropertySpans(configText, 'name');
  if (spans.length !== 1) throw new Error(`the config declares ${spans.length} top-level \`name\` properties, expected 1`);
  let [start, end] = spans[0];
  const lineStart = configText.lastIndexOf('\n', start - 1) + 1;
  if (configText.slice(lineStart, start).trim() === '') {
    const lineEnd = configText.indexOf('\n', end);
    if (configText.slice(end, lineEnd < 0 ? configText.length : lineEnd).trim() === '') { start = lineStart; end = lineEnd < 0 ? configText.length : lineEnd + 1; }
  }
  return configText.slice(0, start) + configText.slice(end);
}

/** The identifier a `// @provider` line reads: `DesignerPunkTheme { }` or `probe(DesignerPunkThemeFamily.Base)`. Null when the line has none. */
function providerIdentifier(line: string): string | null {
  const code = line.slice(0, line.indexOf('// @provider ')).trim();
  const m = /^(?:probe\()?([A-Za-z_][A-Za-z0-9_]*)/.exec(code);
  return m ? m[1] : null;
}

export interface DefaultNameInputs {
  /** The Gradle log and its exit status. */
  log: string;
  exitCode: number;
  /** The parser roots for the copy: `gen` is the copy's Android output folder. */
  roots: Plan['roots'];
  /** The files given to `:probe`, as paths. */
  probeSources: readonly string[];
  /** The name the probe was generated with, and the text of the `ProbeFamily.kt` that was compiled. */
  probeName: string;
  probeSource: string;
  /** The count of `.kt` files in the copy's Android output folder. */
  writtenKt: number;
  /** The config `loadConfig` resolved from the copy, and the copy's config text. */
  resolved: ResolvedDefaultConfig;
  configText: string;
}

export interface DefaultNameVerdict {
  pass: boolean;
  /** The one `default-name:` line. */
  line: string;
  failures: string[];
}

/**
 * The default-name step's verdict (Task 20). Pure: every input is a value. The step passes only when all of these hold,
 * and the failures it finds are all listed.
 */
export function defaultNameVerdict(input: DefaultNameInputs): DefaultNameVerdict {
  const failures: string[] = [];
  const parsed = parseKotlin({ log: input.log, exitCode: input.exitCode, roots: input.roots });
  const [tokens, probe, dp] = parsed.compiles;
  const keyed = [tokens, probe, dp].reduce((n, c) => n + [...c.diagnostics.values()].reduce((a, b) => a + b, 0), 0);
  const unrooted = tokens.unrooted.length + probe.unrooted.length + dp.unrooted.length;
  const unattributed = parsed.unattributed.length;
  const warnings = input.log.split(/\r?\n/).filter((l) => l.startsWith('w: ')).length;
  const gen = parseSourceCounts(input.log).tokensGen;

  if (tokens.outcome !== 'succeeded') failures.push(`:tokens:compileDebugKotlin ${tokens.outcome}`);
  if (probe.outcome !== 'succeeded') failures.push(`:probe:compileDebugKotlin ${probe.outcome}`);
  if (input.exitCode !== 0) failures.push(`Gradle exit ${input.exitCode}`);
  const closing = input.log.split(/\r?\n/).filter((l) => /^BUILD (?:SUCCESSFUL|FAILED)\b/.test(l));
  if (closing.length === 0) failures.push('the log has no closing BUILD line');
  else if (!/^BUILD SUCCESSFUL\b/.test(closing[closing.length - 1])) failures.push('the log does not end BUILD SUCCESSFUL');
  if (keyed > 0) failures.push(`${keyed} keyed diagnostic(s)`);
  if (unrooted > 0) failures.push(`${unrooted} unrooted diagnostic(s)`);
  if (unattributed > 0) failures.push(`${unattributed} unattributed diagnostic(s)`);

  if (input.resolved.name !== DEFAULT_PRODUCT_NAME) failures.push(`resolved name ${input.resolved.name}, expected ${DEFAULT_PRODUCT_NAME}`);
  if (input.resolved.abbreviation !== DEFAULT_ABBREVIATION) failures.push(`resolved abbreviation ${input.resolved.abbreviation}, expected ${DEFAULT_ABBREVIATION}`);
  if (topLevelNameCount(input.configText) > 0) failures.push('the config copy still declares a top-level name');

  if (input.probeName !== DEFAULT_PRODUCT_NAME) failures.push(`the probe was given name ${input.probeName}, expected ${DEFAULT_PRODUCT_NAME}`);
  const providerLines = input.probeSource.split(/\r?\n/).filter((l) => l.includes('// @provider '));
  const wrong = providerLines.map(providerIdentifier).filter((id) => id === null || !id.startsWith(`${DEFAULT_PRODUCT_NAME}Theme`));
  if (providerLines.length === 0) failures.push('the compiled ProbeFamily.kt has no provider read');
  if (wrong.length > 0) failures.push(`${wrong.length} provider read(s) do not name ${DEFAULT_PRODUCT_NAME}Theme`);
  if (!providerLines.some((l) => l.includes('family ='))) failures.push('no provider read is a `family =` call');

  if (gen === undefined || gen < 1) failures.push(`:tokens gen=${gen ?? 'absent'}, expected at least 1`);
  else if (gen !== input.writtenKt) failures.push(`:tokens gen=${gen} against ${input.writtenKt} .kt file(s) written`);

  const sources = input.probeSources.map((p) => p.slice(p.lastIndexOf('/') + 1));
  if (sources.length !== 1 || sources[0] !== DEFAULT_NAME_FILE) failures.push(`the probe source list is [${sources.join(', ')}], expected [${DEFAULT_NAME_FILE}]`);

  const read = /^probe: provider read (\d+) of (\d+)\s*$/m.exec(input.log);
  let readText = 'absent';
  if (read === null) failures.push('the log has no `provider read` line');
  else {
    readText = `${read[1]} of ${read[2]}`;
    const expected = providerReads(input.resolved.themes, 'android').length;
    if (read[1] !== read[2]) failures.push(`provider read ${readText}`);
    if (Number(read[2]) !== expected) failures.push(`provider read m=${read[2]}, expected ${expected} from the resolved themes`);
  }

  const pass = failures.length === 0;
  const line =
    `default-name: ${pass ? 'PASS' : 'FAIL'} name=${input.resolved.name} abbreviation=${input.resolved.abbreviation} probe-name=${input.probeName} ` +
    `tokens=${tokens.outcome} probe=${probe.outcome} keyed=${keyed} unrooted=${unrooted} unattributed=${unattributed} warnings=${warnings} ` +
    `gen=${gen ?? 'absent'} provider read ${readText}` +
    (pass ? '' : ` (${failures.join('; ')})`);
  return { pass, line, failures };
}

class DefaultNameSetupError extends Error {
  constructor(public readonly step: string, detail: string) {
    super(`${step}: ${detail}`);
  }
}

export interface DefaultNameOptions {
  repoRoot: string;
  consumer: string;
  work: string;
  /** Where the copy goes; `RUNNER_TEMP`, else `os.tmpdir()`. */
  tempRoot: string;
  log: (line: string) => void;
}

/** Symlinks each entry of the workspace's `node_modules`, except `@3fn`, into the copy's `node_modules`. Returns how many it linked. */
function linkWorkspaceModules(workspaceModules: string, copyModules: string): number {
  fs.mkdirSync(copyModules, { recursive: true });
  let linked = 0;
  for (const entry of fs.readdirSync(workspaceModules)) {
    if (entry === '@3fn') continue;
    const target = path.join(copyModules, entry);
    if (fs.existsSync(target)) continue;
    fs.symlinkSync(fs.realpathSync(path.join(workspaceModules, entry)), target);
    linked += 1;
  }
  return linked;
}

/**
 * Runs the whole option and returns the one `default-name:` line with the exit status. A setup failure returns
 * `default-name: FAIL setup (<step>: <detail>)`. Nothing else it prints begins with `default-name:`.
 */
export function runDefaultName(options: DefaultNameOptions, gradle: (androidDir: string, laneDir: string, args: readonly string[]) => GradleRun = runGradle): { code: number; line: string } {
  const { repoRoot, log } = options;
  const work = path.resolve(options.work);
  const androidDir = path.join(repoRoot, 'harness', 'android');
  let copy: string | undefined;
  try {
    fs.mkdirSync(work, { recursive: true });
    const consumer = fs.realpathSync(options.consumer);
    const manifest = JSON.parse(fs.readFileSync(path.join(consumer, 'harness-consumer.json'), 'utf8')) as ManifestLike;

    // The copy: outside the workspace, so the original consumer is untouched.
    fs.mkdirSync(options.tempRoot, { recursive: true });
    copy = fs.mkdtempSync(path.join(options.tempRoot, 'default-name-'));
    if (path.relative(repoRoot, copy) === '' || !path.relative(repoRoot, copy).startsWith('..')) throw new DefaultNameSetupError('copy', `${copy} is inside the workspace`);
    fs.cpSync(consumer, copy, { recursive: true, verbatimSymlinks: true });
    const linked = linkWorkspaceModules(path.join(repoRoot, 'node_modules'), path.join(copy, 'node_modules'));
    log(`harness-android: default name copy: ${copy}; linked ${linked} workspace node_modules entries (lockfile versions, not the consumer's own install)`);

    // The config: its one top-level `name` removed.
    const configPath = path.join(copy, 'designerpunk.config.ts');
    if (!fs.existsSync(configPath)) throw new DefaultNameSetupError('config', 'the consumer has no designerpunk.config.ts');
    let configText: string;
    try {
      configText = removeTopLevelName(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      throw new DefaultNameSetupError('config', (e as Error).message);
    }
    fs.writeFileSync(configPath, configText);

    // generate and loadConfig, with the copy's installed package.
    const packageRoot = path.join(copy, manifest.packageRoot);
    const bin = path.join(packageRoot, 'bin', 'designerpunk.js');
    const env = { ...process.env };
    delete env.NODE_PATH;
    const resolveConfig = (): ResolvedDefaultConfig & { outputDir: string; platforms?: { android?: { output?: string } } } => {
      const r = spawnSync(process.execPath, ['-e', READ_CONFIG_SCRIPT, path.join(packageRoot, 'dist', 'config', 'ConfigLoader.js')], { cwd: copy, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
      if (r.status !== 0) throw new DefaultNameSetupError('loadConfig', (r.stderr || r.error?.message || `exit ${r.status}`).trim().split('\n').slice(-3).join(' '));
      try {
        return JSON.parse(r.stdout);
      } catch {
        throw new DefaultNameSetupError('loadConfig', 'the resolved config is not JSON');
      }
    };
    const resolvedFull = resolveConfig();
    const resolved: ResolvedDefaultConfig = {
      name: resolvedFull.name,
      abbreviation: resolvedFull.abbreviation,
      themes: Array.isArray(resolvedFull.themes) ? resolvedFull.themes.map((t) => ({ name: t.name, mode: t.mode })) : [],
    };
    fs.writeFileSync(path.join(work, 'resolved-config.json'), `${JSON.stringify(resolvedFull, null, 2)}\n`);
    const outRel = resolvedFull.platforms?.android?.output ?? resolvedFull.outputDir;
    const genRoot = path.resolve(copy, outRel);
    if (path.relative(copy, genRoot).startsWith('..') || genRoot === copy) throw new DefaultNameSetupError('output', `the Android output folder ${genRoot} is not inside the copy`);
    fs.rmSync(genRoot, { recursive: true, force: true });
    fs.mkdirSync(genRoot, { recursive: true });

    const generate = spawnSync(process.execPath, [bin, 'generate'], { cwd: copy, env, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
    fs.writeFileSync(path.join(work, 'generate.txt'), `${generate.stdout ?? ''}${generate.stderr ?? ''}`);
    if (generate.status !== 0) throw new DefaultNameSetupError('generate', ((generate.stderr || generate.stdout || '').trim().split('\n').slice(-2).join(' ')) || `exit ${generate.status}`);
    const genRelative = walkKotlin(genRoot);
    if (genRelative.length === 0) throw new DefaultNameSetupError('generate', `wrote no .kt file under ${genRoot}`);
    const genAbsolute = genRelative.map((r) => path.join(genRoot, r));

    // The probe: ProbeFamily.kt only, for the name loadConfig resolved.
    const laneDir = path.resolve(work, 'lane');
    fs.rmSync(laneDir, { recursive: true, force: true });
    fs.mkdirSync(path.join(laneDir, 'empty-res'), { recursive: true });
    const probeName = resolved.name;
    const probe = generateProbe({ index: { primitives: {}, semantics: {}, components: {} }, config: { name: probeName, themes: resolved.themes }, productFiles: [] });
    const probeFiles = writeProbe(laneDir, probe);
    const familyFile = probeFiles.find((f) => path.basename(f) === DEFAULT_NAME_FILE);
    if (!familyFile) throw new DefaultNameSetupError('probe', `probe-kotlin wrote no ${DEFAULT_NAME_FILE}`);
    const write = (name: string, lines: readonly string[]): void => fs.writeFileSync(path.join(laneDir, name), lines.length > 0 ? `${lines.join('\n')}\n` : '');
    write('tokens.sources', genAbsolute);
    write('probe.sources', [...probeFiles].sort(byCodePoint));
    write('dp.pkg.sources', []);
    write('dp.gen.sources', []);
    write('dp.res', [path.join(laneDir, 'empty-res')]);
    fs.copyFileSync(familyFile, path.join(work, DEFAULT_NAME_FILE));

    // One Gradle invocation, offline: :tokens with the regenerated Kotlin, :probe with ProbeFamily.kt only.
    const args = ['--offline', ...SELFTEST_GRADLE_ARGS];
    log(`harness-android: default name invocation: (cd harness/android && HARNESS_LANE_DIR=${laneDir} ./gradlew ${args.join(' ')})`);
    log(`harness-android: default name file order: :tokens ${genAbsolute.length} generated file(s), then :probe ${probeFiles.map((f) => path.basename(f)).join(', ')}`);
    for (const f of genAbsolute) log(`  ${f}`);
    const run = gradle(androidDir, laneDir, args);
    fs.writeFileSync(path.join(work, LOG_FILE), run.log);

    const verdict = defaultNameVerdict({
      log: run.log,
      exitCode: run.exitCode,
      roots: { gen: genRoot, pkg: path.join(work, 'no-package'), probe: path.join(laneDir, 'src') },
      probeSources: probeFiles,
      probeName,
      probeSource: fs.readFileSync(familyFile, 'utf8'),
      writtenKt: genRelative.length,
      resolved,
      configText: fs.readFileSync(configPath, 'utf8'),
    });
    fs.writeFileSync(path.join(work, 'verdict.txt'), `${verdict.line}\n`);
    return { code: verdict.pass ? 0 : 1, line: verdict.line };
  } catch (error) {
    const detail = error instanceof DefaultNameSetupError ? error.message : `setup: ${(error as Error).message}`;
    const line = `default-name: FAIL setup (${detail.replace(/\s+/g, ' ').slice(0, 400)})`;
    try {
      fs.mkdirSync(work, { recursive: true });
      fs.writeFileSync(path.join(work, 'verdict.txt'), `${line}\n`);
    } catch {
      // the line below is the record
    }
    return { code: 1, line };
  } finally {
    if (copy) fs.rmSync(copy, { recursive: true, force: true });
  }
}

// ─── Command line ────────────────────────────────────────────────────────────────────────────────

export function main(argv: readonly string[], log: (line: string) => void = console.log): number {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const flags = new Set<string>();
  const values = new Map<string, string>();
  // With --default-name every exit prints exactly one `default-name:` line, a usage error included.
  const usage = (message: string): number => {
    log(argv.includes('--default-name') ? `default-name: FAIL setup (usage: ${message})` : `lane: ${message}`);
    return 2;
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--prepare-only' || arg === '--selftest' || arg === '--default-name') flags.add(arg);
    else if (arg === '--consumer' || arg === '--work' || arg === '--pins' || arg === '--infra-out') {
      const value = argv[++i];
      if (value === undefined) return usage(`${arg} needs a value`);
      values.set(arg, value);
    } else return usage(`unknown argument ${arg}`);
  }
  if (flags.has('--default-name')) {
    // Exactly one line beginning `default-name:` on every exit, usage errors included.
    const consumer = values.get('--consumer');
    const workDir = values.get('--work');
    if (!consumer || !workDir) return usage('--default-name --consumer <root> --work <dir>');
    const result = runDefaultName({ repoRoot, consumer, work: workDir, tempRoot: process.env.RUNNER_TEMP || os.tmpdir(), log });
    log(result.line);
    return result.code;
  }
  const work = values.get('--work');
  if (!work) { log('lane: usage: --consumer <root> --work <dir> [--prepare-only] [--pins <file>] | --selftest --work <dir> [--infra-out <dir>]'); return 2; }
  fs.mkdirSync(work, { recursive: true });
  try {
    if (flags.has('--selftest')) return selftest(repoRoot, work, log, values.get('--infra-out') ?? work) ? 0 : 1;
    const consumer = values.get('--consumer');
    if (!consumer) { log('lane: --consumer is required'); return 2; }
    const plan = prepare({ repoRoot, consumer, work, pinsFile: values.get('--pins') ?? path.join(repoRoot, 'harness', 'pins.yaml'), log });
    if (flags.has('--prepare-only')) { log('harness-android: prepared; not run (--prepare-only)'); return 0; }
    const androidDir = path.join(repoRoot, 'harness', 'android');
    const resolved = resolveAndReport({ work, plan, androidDir }, runGradle, log);
    if (!resolved.proceed) return resolved.code;
    const run = runGradle(androidDir, plan.laneDir);
    fs.writeFileSync(path.join(work, LOG_FILE), run.log);
    const blocked = blockedLine(run, plan.roots);
    if (blocked) log(blocked);
    const runFiles = buildRunFiles(plan, run);
    for (const c of runFiles['harness-android-tokens'].checks ?? []) log(`${c.ok ? 'ok  ' : 'FAIL'} ${c.name}: ${c.detail}`);
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
