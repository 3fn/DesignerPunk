#!/usr/bin/env node
/**
 * Stacy's coverage map + manifest generator (C12) — Spec 122 Task 8.2.
 *
 * design.md § "C12 — Stacy's provisioning: coverage map + audit commands": for every
 * generated surface (every emitted artifact + every canonical file), which checks guard it —
 * generated ROWS, DERIVED check globs (S-D1). A surface matching no check's globs is a
 * BLANK ROW (`checks: []`) — visible, never silently unlisted.
 *
 * **S-D1 — derive, never hand-declare.** Each check module exports a `surfaceGlobs()` that
 * its OWN reader code derives from (a shared constant, or the actual guarded-set function in
 * generate.ts's case). This module IMPORTS those same symbols — the manifest cannot drift
 * from what each check really reads, because there is exactly one symbol, two consumers. A
 * hand-declared glob written independently here could drift (over-broad → false green,
 * under-broad → false blank); deriving from the check's real computation makes the coverage
 * map's join trustworthy on both sides.
 *
 * Emits two files (wired into `generateAll` in generate.ts, guarded by C6 like every other
 * generated surface — a stale map FAILS the diff-guard):
 *   - `canonical/coverage-manifest.yaml` — check context → surface globs (the derived input).
 *   - `canonical/coverage-map.yaml` — surface → checks[] (the joined output; REPLACES the
 *     Task-1 placeholder stub).
 *
 * The CLI additionally asserts Stacy's audit bar (Req 22 AC4(b)): every blank row either
 * fails the run OR is covered by a recorded adjudication in `canonical/adjudications.yaml`
 * (`sweep: audit:coverage-map`, `key: <surface path>`) — reusing the sweeps' `common.ts`
 * adjudication machinery (C8's pattern, applied to this one additional check context).
 *
 * The CLI also runs a LANES section (Ballot B-CI § 5, PR-2; issue
 * `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` item (d)): required-check steps vs
 * local lane roots, in both directions, adjudicable under `sweep: audit:coverage-map:lanes`.
 * It is computed live at audit time and is NOT written into either generated map — see the
 * "Lanes section" block below for the derivation and why.
 *
 * Traces to: Req 22 (roles, provisioning, coverage map), Req 19 AC3, design C12, C13 item 6.
 */

import * as fs from 'fs';
import * as path from 'path';
import { dump as dumpYaml, load as loadYaml } from 'js-yaml';
import { minimatch } from 'minimatch';
import { execFileSync } from 'child_process';
import { guardedRoots } from './generate';
import { listFilesUnder, isScaffolding } from './diff-guard';
import { parseAdjudications, type RecordedAdjudication } from './sweeps/common';

import { surfaceGlobs as canonicalVsTruthSurfaceGlobs } from './canonical-vs-truth';
import { surfaceGlobs as sweep1SurfaceGlobs } from './sweeps/sweep-1-refs';
import { surfaceGlobs as sweep2SurfaceGlobs } from './sweeps/sweep-2-skills';
import { surfaceGlobs as sweep3SurfaceGlobs } from './sweeps/sweep-3-dupes';
import { surfaceGlobs as sweep4SurfaceGlobs } from './sweeps/sweep-4-ambient';
import { surfaceGlobs as sweep5SurfaceGlobs } from './sweeps/sweep-5-corrected';
import { surfaceGlobs as sweep6SurfaceGlobs } from './sweeps/sweep-6-declarations';
import { surfaceGlobs as sweep7SurfaceGlobs } from './sweeps/sweep-7-dispositions';
import { surfaceGlobs as sweep8SurfaceGlobs } from './sweeps/sweep-8-demotion';
import { surfaceGlobs as operativeSetFreshnessSurfaceGlobs } from './regrounding/freshness';

// ============================================================================
// The check-context name constants (the coverage map's fixed column set)
// ============================================================================

export const CHECK_CONTEXTS = [
  '122-diff-guard',
  '122-canonical-vs-truth',
  '122-sweep-1-refs',
  '122-sweep-2-skills',
  '122-sweep-3-dupes',
  '122-sweep-4-ambient',
  '122-sweep-5-corrected-state',
  '122-sweep-6-declarations',
  '122-sweep-7-dispositions',
  '122-sweep-8-demotion',
] as const;

export type CheckContext = (typeof CHECK_CONTEXTS)[number];

// ============================================================================
// The manifest: check context → surface globs, derived from each check's own symbol (S-D1)
// ============================================================================

export type CoverageManifest = Record<CheckContext, string[]>;

/**
 * The `122-diff-guard` check's surface globs (C12, S-D1): derived directly from
 * {@link guardedRoots} — the EXACT function C6's guard compares bidirectionally. A guarded
 * root that names a FILE (e.g. `canonical/coverage-map.yaml`) globs to itself (a directory
 * `/**` suffix would never match the file path); a directory root globs to `<root>/**`.
 * `listFilesUnder` (diff-guard.ts) applies the identical file-vs-dir distinction when
 * enumerating each root, so this stays consistent with what the guard actually compares.
 * Not a co-located constant: `guardedRoots()` already IS the shared symbol, imported here
 * and by diff-guard.ts itself.
 *
 * PLUS the `operative-set-freshness` sweep's surfaces (Spec 123 Task 13.6): the guard runs that
 * sweep on every run (diff-guard.ts `runGuard`), so the files it reads — the operative-set
 * records and the consumer profile — are guarded by this context. Imported from the sweep's own
 * `surfaceGlobs()` (S-D1: one symbol, two consumers), never re-declared here.
 */
export function diffGuardSurfaceGlobs(repoRoot?: string): string[] {
  return [
    ...guardedRoots(repoRoot).map((root) => (path.extname(root) ? root : `${root}/**`)),
    ...operativeSetFreshnessSurfaceGlobs(),
  ];
}

/**
 * Build the manifest by importing every check's `surfaceGlobs()` (or `guardedRoots()`-derived
 * equivalent for `122-diff-guard`). No glob here is hand-declared independently of the check
 * it describes — see the module header.
 */
export function buildCoverageManifest(repoRoot?: string): CoverageManifest {
  return {
    '122-diff-guard': diffGuardSurfaceGlobs(repoRoot),
    '122-canonical-vs-truth': canonicalVsTruthSurfaceGlobs(),
    '122-sweep-1-refs': sweep1SurfaceGlobs(),
    '122-sweep-2-skills': sweep2SurfaceGlobs(),
    '122-sweep-3-dupes': sweep3SurfaceGlobs(),
    '122-sweep-4-ambient': sweep4SurfaceGlobs(),
    '122-sweep-5-corrected-state': sweep5SurfaceGlobs(),
    '122-sweep-6-declarations': sweep6SurfaceGlobs(),
    '122-sweep-7-dispositions': sweep7SurfaceGlobs(),
    '122-sweep-8-demotion': sweep8SurfaceGlobs(),
  };
}

// ============================================================================
// Surface enumeration: every file under guardedRoots() + every file under canonical/
// ============================================================================

/**
 * Enumerate every generated/canonical surface: every file under {@link guardedRoots} PLUS
 * every file under `canonical/` (deduped, sorted, `.gitkeep` scaffolding excluded — same
 * exclusion diff-guard applies to the guarded surface).
 */
export function enumerateSurfaces(repoRoot: string): string[] {
  const fromGuardedRoots = guardedRoots(repoRoot).flatMap((root) => listFilesUnder(repoRoot, root));
  const fromCanonical = listFilesUnder(repoRoot, 'canonical');
  const all = new Set([...fromGuardedRoots, ...fromCanonical].filter((f) => !isScaffolding(f)));
  return [...all].sort();
}

// ============================================================================
// Glob matching (the same `**`/`*` translation canonical-vs-truth.ts's repoGlobResolver
// uses, reimplemented here as a pure path-matcher — no filesystem walk needed since surfaces
// are already enumerated).
// ============================================================================

/** Translate a `**`/`*` glob to an anchored RegExp over forward-slash relative paths. */
export function globToRegExp(glob: string): RegExp {
  let out = '';
  for (let i = 0; i < glob.length; i += 1) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        out += '.*';
        i += 1;
        if (glob[i + 1] === '/') i += 1; // consume the slash after `**/`.
      } else {
        out += '[^/]*';
      }
    } else if ('\\^$+?.()|[]{}'.includes(c)) {
      out += `\\${c}`;
    } else {
      out += c;
    }
  }
  return new RegExp(`^${out}$`);
}

/** True iff `surface` matches `glob` (both forward-slash repo-relative paths). */
export function matchesGlob(surface: string, glob: string): boolean {
  return globToRegExp(glob).test(surface);
}

// ============================================================================
// The coverage map: surface → checks[] (a surface matching no check's globs → checks: [])
// ============================================================================

export interface CoverageRow {
  surface: string;
  checks: string[];
}

/**
 * Join every enumerated surface against every check's manifest globs. A surface matching
 * NO check's globs gets `checks: []` — the VISIBLE blank row (never silently unlisted).
 */
export function buildCoverageMap(surfaces: readonly string[], manifest: CoverageManifest): CoverageRow[] {
  const contexts = Object.keys(manifest) as CheckContext[];
  return surfaces.map((surface) => {
    const checks = contexts.filter((ctx) => manifest[ctx].some((glob) => matchesGlob(surface, glob)));
    return { surface, checks };
  });
}

// ============================================================================
// Serialization (deterministic — sorted rows, generated-file header comment)
// ============================================================================

const MANIFEST_HEADER = `# coverage-manifest.yaml — GENERATED. Do not hand-edit (Spec 122 C12 / Task 8.2).
#
# Check context -> the surface globs that check's OWN reader code derives from (S-D1). Each
# glob here is imported from the check module's exported \`surfaceGlobs()\` (or the
# guardedRoots()-derived equivalent for 122-diff-guard) — never hand-declared independently,
# so this manifest cannot drift from what each check actually reads.
#
# Regenerate: npx tsx tools/agent-generator/coverage-map.ts (also runs as part of
# \`npx tsx tools/agent-generator/generate.ts\`). Guarded by the C6 diff-guard.
`;

const MAP_HEADER = `# coverage-map.yaml — GENERATED. Do not hand-edit (Req 22 AC4(b); C12 / Task 8.2).
#
# Every generated/canonical surface -> the check context(s) that guard it, joined from
# coverage-manifest.yaml's derived globs. A row with \`checks: []\` is a BLANK ROW: a surface
# with no guarding check — VISIBLE by construction, never silently unlisted. Stacy's audit
# (\`npm run audit:coverage-map\`) asserts zero blank rows, or a recorded adjudication per
# blank in canonical/adjudications.yaml (sweep: audit:coverage-map, key: <surface path>).
# The same command's LANES section (required-check steps vs local lane roots; sweep:
# audit:coverage-map:lanes) is computed live at audit time and is not recorded in this file.
#
# Regenerate: npx tsx tools/agent-generator/coverage-map.ts (also runs as part of
# \`npx tsx tools/agent-generator/generate.ts\`). Guarded by the C6 diff-guard.
`;

export function serializeCoverageManifest(manifest: CoverageManifest): string {
  const ordered: Record<string, string[]> = {};
  for (const ctx of CHECK_CONTEXTS) ordered[ctx] = [...manifest[ctx]].sort();
  return MANIFEST_HEADER + dumpYaml(ordered, { sortKeys: true, lineWidth: -1 });
}

export function serializeCoverageMap(rows: readonly CoverageRow[]): string {
  const sortedRows = [...rows]
    .map((r) => ({ surface: r.surface, checks: [...r.checks].sort() }))
    .sort((a, b) => (a.surface < b.surface ? -1 : a.surface > b.surface ? 1 : 0));
  return MAP_HEADER + dumpYaml(sortedRows, { sortKeys: false, lineWidth: -1 });
}

// ============================================================================
// Blank-row / adjudication assertion (Stacy's audit bar, Req 22 AC4(b))
// ============================================================================

export const AUDIT_SWEEP_CONTEXT = 'audit:coverage-map';

export interface AuditResult {
  totalSurfaces: number;
  guardedSurfaces: number;
  blankSurfaces: number;
  adjudicatedBlanks: string[];
  unadjudicatedBlanks: string[];
  pass: boolean;
}

/** Assert every blank row is either absent (0 blanks) or covered by a recorded adjudication. */
export function auditCoverageMap(
  rows: readonly CoverageRow[],
  adjudications: readonly RecordedAdjudication[]
): AuditResult {
  const blanks = rows.filter((r) => r.checks.length === 0);
  const adjudicatedKeys = new Set(
    adjudications.filter((a) => a.sweep === AUDIT_SWEEP_CONTEXT).map((a) => a.key)
  );
  const adjudicatedBlanks = blanks.filter((b) => adjudicatedKeys.has(b.surface)).map((b) => b.surface);
  const unadjudicatedBlanks = blanks.filter((b) => !adjudicatedKeys.has(b.surface)).map((b) => b.surface);
  return {
    totalSurfaces: rows.length,
    guardedSurfaces: rows.length - blanks.length,
    blankSurfaces: blanks.length,
    adjudicatedBlanks: adjudicatedBlanks.sort(),
    unadjudicatedBlanks: unadjudicatedBlanks.sort(),
    pass: unadjudicatedBlanks.length === 0,
  };
}

// ============================================================================
// Lanes section — required-check steps vs local lane roots (Ballot B-CI § 5, PR-2;
// .kiro/issues/2026-09-27-unit-branch-ci-feedback.md item (d))
// ============================================================================
//
// Two directions, both computed LIVE at audit time and never persisted into the generated
// maps above (their C6 no-op lock does not hash .github/workflows/** or the root jest configs,
// so a persisted lanes table could go stale behind a no-op early exit):
//
//   (i)  required-only — a script a REQUIRED job runs executes test files that NO local lane
//        selects (a local lane = a tracked jest config, evaluated on its own roots/testMatch).
//   (ii) local-only    — a local lane selects test files that NO required step executes; a
//        local jest config that NO required step invokes at all; a non-jest `test`/`test:*`
//        package script that NO required step runs.
//
// "Required" is derived, never declared here: the expected context set is parsed from
// tools/agent-generator/verify-gate-registration.sh's EXPECTED_CONTEXTS (the count-asserted
// branch-protection list), each workflow job's context name is derived from its `name:`
// (the non-dispatch branch of the unit-branch rename expression; matrix contexts expanded),
// and a job is required iff one of its contexts is expected — plus every job those jobs
// `needs:` (a failing upstream job fails the gate too).
//
// Rows are visible, never silently unlisted: each row is ADJUDICATE and fails the audit
// unless canonical/adjudications.yaml records a ruling under `sweep: audit:coverage-map:lanes`
// with the row's key. A lanes-sweep adjudication whose key matches no current row is printed as
// a `[stale adjudication]` line on every run (non-failing), so a fixed row's ruling cannot
// linger silently; one keyed to an ERROR row is printed in the same block as an
// `[inert adjudication — keyed to an ERROR row]` line (it cannot cover the row, and would
// otherwise silently resume covering once the error is repaired). Derivation errors (an expected context no job produces, an unknown npm
// script, an unloadable jest config) are ERROR rows — never adjudicable; the derivation must
// be repaired.

export const LANES_SWEEP_CONTEXT = 'audit:coverage-map:lanes';

/** A package's npm scripts, keyed by repo-relative package dir ('.' = root). */
export type PackageScriptsMap = Record<string, Record<string, string>>;

/** The subset of a jest config this derivation reads. */
export interface JestConfigShape {
  rootDir?: string;
  roots?: string[];
  testMatch?: string[];
  testRegex?: string | string[];
  testPathIgnorePatterns?: string[];
  projects?: unknown;
}

export interface LaneInputs {
  /** Absolute repo root (jest matches globs/regexes against ABSOLUTE paths). */
  repoRoot: string;
  /** The required context set (verify-gate-registration.sh EXPECTED_CONTEXTS). */
  expectedContexts: readonly string[];
  /** Every workflow file, repo-relative path → YAML text. Required-ness is decided per job. */
  workflows: Record<string, string>;
  /** npm scripts per package dir. */
  packages: PackageScriptsMap;
  /** Every tracked jest config, repo-relative path → loaded config (undefined = unloadable). */
  jestConfigs: Record<string, JestConfigShape | undefined>;
  /** Every tracked file, repo-relative, forward-slash. */
  files: readonly string[];
}

export type LaneRowKind = 'required-only' | 'local-only' | 'error';

export interface LaneRow {
  kind: LaneRowKind;
  /** Adjudication key (unique within the lanes sweep). */
  key: string;
  /** One-line description of what was observed. */
  detail: string;
  /** Supporting evidence lines (files grouped by directory, contexts, …). */
  evidence: string[];
}

export interface LaneInventoryEntry {
  /** `npm run <script>` form, or the inline command text. */
  command: string;
  /** Required context names whose jobs run it. */
  contexts: string[];
  kind: 'non-test-script' | 'inline' | 'jest-listing' | 'unresolved';
}

export interface LaneAnalysis {
  requiredContexts: number;
  requiredJobs: number;
  workflowsWithRequiredJobs: string[];
  localConfigs: string[];
  /** Required test-running steps compared with no gap (did-it-really-run evidence). */
  requiredCompared: string[];
  /** Local jest configs compared with no gap. */
  localCompared: string[];
  rows: LaneRow[];
  inventory: LaneInventoryEntry[];
}

// ---------------------------------------------------------------------------
// Inputs: the expected context set
// ---------------------------------------------------------------------------

/** Parse `EXPECTED_CONTEXTS=( "a" "b" … )` out of verify-gate-registration.sh. */
export function parseExpectedContexts(shText: string): string[] {
  const lines = shText.split('\n');
  const start = lines.findIndex((l) => /^\s*EXPECTED_CONTEXTS=\(\s*$/.test(l));
  if (start === -1) return [];
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\s*\)\s*$/.test(line)) break;
    const m = /^\s*"([^"]+)"/.exec(line);
    if (m) out.push(m[1]);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Shell tokenization (quote-aware; enough for workflow `run:` blocks and npm script bodies)
// ---------------------------------------------------------------------------

type ShellToken = { op: string } | { word: string };

export function tokenizeShell(text: string): ShellToken[] {
  const out: ShellToken[] = [];
  let word = '';
  let inWord = false;
  const flush = () => {
    if (inWord) out.push({ word });
    word = '';
    inWord = false;
  };
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (c === "'") {
      const end = text.indexOf("'", i + 1);
      const stop = end === -1 ? text.length : end;
      word += text.slice(i + 1, stop);
      inWord = true;
      i = stop;
    } else if (c === '"') {
      let j = i + 1;
      while (j < text.length && text[j] !== '"') {
        if (text[j] === '\\' && j + 1 < text.length) j += 1;
        word += text[j];
        j += 1;
      }
      inWord = true;
      i = j;
    } else if (c === '\n') {
      flush();
      out.push({ op: '\n' });
    } else if (/\s/.test(c)) {
      flush();
    } else if (c === '&' && text[i + 1] === '&') {
      flush();
      out.push({ op: '&&' });
      i += 1;
    } else if (c === '|') {
      flush();
      out.push({ op: text[i + 1] === '|' ? '||' : '|' });
      if (text[i + 1] === '|') i += 1;
    } else if (c === ';' || c === '(' || c === ')') {
      flush();
      out.push({ op: c });
    } else if (c === '#' && !inWord) {
      const end = text.indexOf('\n', i);
      i = (end === -1 ? text.length : end) - 1;
    } else {
      word += c;
      inWord = true;
    }
  }
  flush();
  return out;
}

/** A simple command: its words (redirections dropped) and the cwd it runs in. */
interface SimpleCommand {
  words: string[];
  cwd: string;
}

function joinDir(cwd: string, rel: string): string {
  const joined = path.posix.normalize(path.posix.join(cwd, rel));
  return joined === '' ? '.' : joined;
}

/** Split tokens into simple commands, tracking `cd X` and `( … )` subshell cwd scoping. */
export function splitSimpleCommands(text: string, cwd: string): SimpleCommand[] {
  const tokens = tokenizeShell(text);
  const cmds: SimpleCommand[] = [];
  const cwdStack: string[] = [];
  let current = cwd;
  let words: string[] = [];
  const end = () => {
    // Drop redirections (`> f`, `2>&1`, `< f`).
    const cleaned: string[] = [];
    for (let i = 0; i < words.length; i += 1) {
      const w = words[i];
      if (/^\d*>&\d+$/.test(w)) continue;
      if (/^\d*[<>]{1,2}$/.test(w)) {
        i += 1;
        continue;
      }
      if (/^\d*[<>]{1,2}\S/.test(w)) continue;
      cleaned.push(w);
    }
    // Strip leading env assignments (`FOO=bar cmd`).
    while (cleaned.length > 1 && /^[A-Za-z_][A-Za-z0-9_]*=/.test(cleaned[0])) cleaned.shift();
    if (cleaned.length > 0) {
      if (cleaned[0] === 'cd' && cleaned.length >= 2) current = joinDir(current, cleaned[1]);
      else cmds.push({ words: cleaned, cwd: current });
    }
    words = [];
  };
  for (const t of tokens) {
    if ('word' in t) {
      words.push(t.word);
      continue;
    }
    end();
    if (t.op === '(') cwdStack.push(current);
    else if (t.op === ')') current = cwdStack.pop() ?? current;
    else if (t.op === '\n' && cwdStack.length === 0) current = cwd;
  }
  end();
  return cmds;
}

// ---------------------------------------------------------------------------
// Command classification + npm script expansion
// ---------------------------------------------------------------------------

/** Shell glue that neither runs tests nor is a check in its own right. */
const SHELL_GLUE = new Set([
  'echo', 'printf', 'grep', 'head', 'tail', 'tee', 'wc', 'tr', 'cat', 'set', '[', 'test',
  'true', 'false', 'exit', 'sort', 'uniq', 'sed', 'awk', 'cut', 'diff', 'mkdir', 'rm', 'cp',
  'mv', 'ls', 'export', 'git',
]);

/** Jest flags that take a value (space- or `=`-separated). */
const JEST_VALUE_FLAGS = new Set([
  'config', 'c', 'roots', 'testMatch', 'testPathPatterns', 'testPathPattern',
  'testPathIgnorePatterns', 'testTimeout', 'maxWorkers', 'w', 'selectProjects', 'reporters',
  'coverageDirectory', 'testNamePattern', 't', 'env', 'shard', 'outputFile', 'rootDir',
  'testRegex', 'setupFilesAfterEnv', 'collectCoverageFrom', 'seed',
]);

export interface JestRun {
  /** Package dir the run executes in (repo-relative). */
  cwd: string;
  /** Resolved config path (repo-relative), or undefined when none is found (jest defaults). */
  configPath?: string;
  cliRoots?: string[];
  cliTestMatch?: string[];
  cliIgnore?: string[];
  pathPatterns: string[];
  listOnly: boolean;
}

/** Parse the words after `jest` into a {@link JestRun}. */
export function parseJestArgs(args: readonly string[], cwd: string, files: ReadonlySet<string>): JestRun {
  const run: JestRun = { cwd, pathPatterns: [], listOnly: false };
  let configArg: string | undefined;
  const push = (key: 'cliRoots' | 'cliTestMatch' | 'cliIgnore', v: string) => {
    (run[key] ??= []).push(v);
  };
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a.startsWith('-')) {
      const m = /^--?([^=]+)(?:=(.*))?$/.exec(a);
      const flag = m ? m[1] : a;
      let value = m?.[2];
      if (value === undefined && JEST_VALUE_FLAGS.has(flag) && i + 1 < args.length) {
        value = args[i + 1];
        i += 1;
      }
      if (flag === 'listTests') run.listOnly = true;
      else if ((flag === 'config' || flag === 'c') && value !== undefined) configArg = value;
      else if (flag === 'roots' && value !== undefined) push('cliRoots', value);
      else if (flag === 'testMatch' && value !== undefined) push('cliTestMatch', value);
      else if (flag === 'testPathIgnorePatterns' && value !== undefined) push('cliIgnore', value);
      else if ((flag === 'testPathPatterns' || flag === 'testPathPattern') && value !== undefined)
        run.pathPatterns.push(value);
    } else {
      run.pathPatterns.push(a);
    }
  }
  if (configArg !== undefined) {
    run.configPath = joinDir(cwd, configArg);
  } else {
    for (const ext of ['js', 'ts', 'mjs', 'cjs', 'json']) {
      const candidate = joinDir(cwd, `jest.config.${ext}`);
      if (files.has(candidate)) {
        run.configPath = candidate;
        break;
      }
    }
  }
  return run;
}

/** One leaf a required step reaches, attributed to the top-level thing the workflow named. */
export interface RequiredLeaf {
  /** `npm run <script>` (sub-package: `npm run <script> [mcp-server]`) or the inline text. */
  origin: string;
  originKind: 'script' | 'inline';
  jest?: JestRun;
  /** A non-jest, non-glue command (tsc, tsx, node, eslint, esbuild, …). */
  other?: string;
  /** Derivation error (unknown script, missing package). */
  error?: string;
}

function scriptOrigin(pkg: string, script: string): string {
  return pkg === '.' ? `npm run ${script}` : `npm run ${script} [${pkg}]`;
}

/**
 * Parse an `npm …` invocation. Returns the package + script, `install`, or undefined for
 * npm subcommands this derivation does not model.
 */
function parseNpm(
  words: readonly string[],
  cwd: string
): { kind: 'script'; pkg: string; script: string; extra: string[] } | { kind: 'install' } | undefined {
  let pkg = cwd;
  let sub: string | undefined;
  let script: string | undefined;
  const extra: string[] = [];
  for (let i = 1; i < words.length; i += 1) {
    const w = words[i];
    if (w === '--') {
      extra.push(...words.slice(i + 1));
      break;
    }
    if (w === '--prefix' || w === '-C') {
      pkg = joinDir(cwd, words[i + 1] ?? '.');
      i += 1;
      continue;
    }
    if (w.startsWith('--prefix=')) {
      pkg = joinDir(cwd, w.slice('--prefix='.length));
      continue;
    }
    if (w.startsWith('-')) continue;
    if (sub === undefined) {
      sub = w;
      if (['test', 't', 'tst'].includes(w)) script = 'test';
      continue;
    }
    if ((sub === 'run' || sub === 'run-script') && script === undefined) {
      script = w;
      continue;
    }
    // A bare arg after `npm test` / `npm run x` without `--` is passed through by npm.
    if (script !== undefined) extra.push(w);
  }
  if (sub === 'ci' || sub === 'install' || sub === 'i') return { kind: 'install' };
  if (script !== undefined) return { kind: 'script', pkg, script, extra };
  return undefined;
}

/** Expand one simple command into leaves (recursing through npm scripts + pre/post hooks). */
export function expandCommand(
  cmd: SimpleCommand,
  packages: PackageScriptsMap,
  files: ReadonlySet<string>,
  origin: { text: string; kind: 'script' | 'inline' } | undefined,
  seen: Set<string> = new Set()
): RequiredLeaf[] {
  let words = cmd.words;
  if (words[0] === 'npx' || words[0] === 'exec') {
    words = words.slice(1).filter((w, i) => !(i === 0 && (w === '--yes' || w === '-y')));
  }
  if (words.length === 0) return [];
  const head = words[0];

  if (head === 'npm') {
    const parsed = parseNpm(words, cmd.cwd);
    if (parsed === undefined) {
      return [{ origin: origin?.text ?? cmd.words.join(' '), originKind: origin?.kind ?? 'inline', other: cmd.words.join(' ') }];
    }
    if (parsed.kind === 'install') return [];
    const { pkg, script, extra } = parsed;
    const top = origin ?? { text: scriptOrigin(pkg, script), kind: 'script' as const };
    const scripts = packages[pkg];
    if (!scripts) {
      return [{ origin: top.text, originKind: top.kind, error: `no package.json scripts for package dir '${pkg}'` }];
    }
    const body = scripts[script];
    if (body === undefined) {
      return [{ origin: top.text, originKind: top.kind, error: `npm script '${script}' does not exist in ${pkg === '.' ? 'package.json' : `${pkg}/package.json`}` }];
    }
    const seenKey = `${pkg}#${script}`;
    if (seen.has(seenKey)) return [];
    const nextSeen = new Set(seen).add(seenKey);
    const leaves: RequiredLeaf[] = [];
    for (const hook of [`pre${script}`, script, `post${script}`]) {
      const hookBody = hook === script ? body : scripts[hook];
      if (hookBody === undefined) continue;
      const bodyCmds = splitSimpleCommands(hookBody, pkg);
      // Extra args (`npm run x -- args`) append to the script's LAST simple command.
      if (hook === script && extra.length > 0 && bodyCmds.length > 0) {
        bodyCmds[bodyCmds.length - 1].words.push(...extra);
      }
      for (const bc of bodyCmds) leaves.push(...expandCommand(bc, packages, files, top, nextSeen));
    }
    return leaves;
  }

  const top = origin ?? { text: `${cmd.words.join(' ')}${cmd.cwd === '.' ? '' : ` [${cmd.cwd}]`}`, kind: 'inline' as const };
  if (head === 'jest') {
    return [{ origin: top.text, originKind: top.kind, jest: parseJestArgs(words.slice(1), cmd.cwd, files) }];
  }
  if (SHELL_GLUE.has(head) || /^[A-Za-z_][A-Za-z0-9_]*=/.test(head)) return [];
  return [{ origin: top.text, originKind: top.kind, other: cmd.words.join(' ') }];
}

// ---------------------------------------------------------------------------
// Workflow → required jobs → required leaves
// ---------------------------------------------------------------------------

interface WorkflowJobDoc {
  name?: string;
  needs?: string | string[];
  strategy?: { matrix?: Record<string, unknown> };
  defaults?: { run?: { 'working-directory'?: string } };
  steps?: Array<{ name?: string; run?: string; 'working-directory'?: string }>;
}

interface WorkflowDoc {
  defaults?: { run?: { 'working-directory'?: string } };
  jobs?: Record<string, WorkflowJobDoc>;
}

/** Expand a job's matrix into variable sets (include-only or simple cartesian axes). */
function matrixVariants(matrix: Record<string, unknown> | undefined): Array<Record<string, unknown>> {
  if (!matrix) return [{}];
  const axes = Object.entries(matrix).filter(([k, v]) => k !== 'include' && k !== 'exclude' && Array.isArray(v));
  let variants: Array<Record<string, unknown>> = [{}];
  for (const [k, values] of axes) {
    variants = variants.flatMap((v) => (values as unknown[]).map((val) => ({ ...v, [k]: val })));
  }
  const include = Array.isArray(matrix.include) ? (matrix.include as Array<Record<string, unknown>>) : [];
  if (axes.length === 0) return include.length > 0 ? include : [{}];
  return [...variants, ...include];
}

/** Derive a job's (non-dispatch) context name for one matrix variant. */
export function deriveJobContext(jobId: string, name: string | undefined, vars: Record<string, unknown>): string | undefined {
  if (name === undefined) return jobId;
  const expr = /^\s*\$\{\{(.*)\}\}\s*$/.exec(name);
  if (!expr) return name.replace(/\$\{\{\s*matrix\.(\w+)\s*\}\}/g, (_, k) => String(vars[k] ?? ''));
  // The B-CI unit-branch rename: `cond && '<X> (unit-branch)' || '<X>'` → the fallback is the
  // context a pull_request run reports under (the one branch protection requires).
  const fallback = /\|\|\s*(?:'([^']*)'|matrix\.(\w+))\s*$/.exec(expr[1]);
  if (!fallback) {
    const bare = /^\s*matrix\.(\w+)\s*$/.exec(expr[1]);
    return bare ? String(vars[bare[1]] ?? '') : undefined;
  }
  return fallback[1] !== undefined ? fallback[1] : String(vars[fallback[2]] ?? '');
}

interface RequiredStepLeaf extends RequiredLeaf {
  context: string;
  workflow: string;
  job: string;
  step: string;
}

interface RequiredJobsResult {
  leaves: RequiredStepLeaf[];
  jobCount: number;
  workflows: string[];
  unresolvedContexts: string[];
}

export function collectRequiredLeaves(inputs: LaneInputs): RequiredJobsResult {
  const expected = new Set(inputs.expectedContexts);
  const produced = new Set<string>();
  const files = new Set(inputs.files);
  const leaves: RequiredStepLeaf[] = [];
  const workflowsWithRequired = new Set<string>();
  let jobCount = 0;

  for (const [wfPath, text] of Object.entries(inputs.workflows).sort(([a], [b]) => (a < b ? -1 : 1))) {
    const doc = (loadYaml(text) ?? {}) as WorkflowDoc;
    const jobs = doc.jobs ?? {};
    // job id → the required contexts it (or a dependent) carries.
    type Variant = { vars: Record<string, unknown>; context: string };
    const variantsByJob = new Map<string, Variant[]>();
    const requiredJobs = new Map<string, Variant[]>();
    for (const [jobId, job] of Object.entries(jobs)) {
      const variants: Variant[] = [];
      for (const vars of matrixVariants(job.strategy?.matrix)) {
        const ctx = deriveJobContext(jobId, job.name, vars);
        if (ctx !== undefined) variants.push({ vars, context: ctx });
      }
      variantsByJob.set(jobId, variants);
      const req = variants.filter((v) => expected.has(v.context));
      if (req.length > 0) requiredJobs.set(jobId, req);
    }
    // `needs:` closure — upstream jobs of a required job run under its gate.
    const queue = [...requiredJobs.keys()];
    while (queue.length > 0) {
      const id = queue.shift() as string;
      const needs = jobs[id]?.needs;
      for (const up of Array.isArray(needs) ? needs : needs ? [needs] : []) {
        if (requiredJobs.has(up) || !jobs[up]) continue;
        const ownCtx = variantsByJob.get(up)?.[0]?.context ?? up;
        requiredJobs.set(up, [{ vars: {}, context: `${ownCtx} (needs of a required job)` }]);
        queue.push(up);
      }
    }
    for (const [jobId, variants] of requiredJobs) {
      const job = jobs[jobId];
      jobCount += variants.length;
      workflowsWithRequired.add(wfPath);
      for (const v of variants) {
        produced.add(v.context);
        const jobCwd = joinDir('.', job.defaults?.run?.['working-directory'] ?? doc.defaults?.run?.['working-directory'] ?? '.');
        for (const step of job.steps ?? []) {
          if (typeof step.run !== 'string') continue;
          const text = step.run.replace(/\$\{\{\s*matrix\.(\w+)\s*\}\}/g, (_, k) => String(v.vars[k] ?? ''));
          const stepCwd = step['working-directory'] ? joinDir('.', step['working-directory']) : jobCwd;
          const stepName = step.name ?? '(unnamed step)';
          if (/\$\{\{/.test(text)) {
            leaves.push({ origin: text.trim(), originKind: 'inline', other: 'unresolved ${{ }} expression', context: v.context, workflow: wfPath, job: jobId, step: stepName });
            continue;
          }
          for (const cmd of splitSimpleCommands(text, stepCwd)) {
            for (const leaf of expandCommand(cmd, inputs.packages, files, undefined)) {
              leaves.push({ ...leaf, context: v.context, workflow: wfPath, job: jobId, step: stepName });
            }
          }
        }
      }
    }
  }
  const unresolvedContexts = inputs.expectedContexts.filter((c) => !produced.has(c));
  return { leaves, jobCount, workflows: [...workflowsWithRequired].sort(), unresolvedContexts };
}

// ---------------------------------------------------------------------------
// Static jest selection (roots ∩ testMatch/testRegex − ignore ∩ path patterns)
// ---------------------------------------------------------------------------

const DEFAULT_TEST_MATCH = ['**/__tests__/**/*.?([mc])[jt]s?(x)', '**/?(*.)+(spec|test).?([mc])[jt]s?(x)'];
const DEFAULT_IGNORE = ['/node_modules/'];

export interface EffectiveJestSelection {
  rootDirAbs: string;
  rootsAbs: string[];
  testMatch?: string[];
  testRegex?: string[];
  ignore: string[];
  pathPatterns: string[];
}

function subRootDir(value: string, rootDirAbs: string): string {
  return value.split('<rootDir>').join(rootDirAbs);
}

/** Normalize a config (+ optional CLI overrides) into the matching inputs jest itself uses. */
export function effectiveSelection(
  repoRoot: string,
  configPath: string | undefined,
  cwd: string,
  config: JestConfigShape,
  run?: Pick<JestRun, 'cliRoots' | 'cliTestMatch' | 'cliIgnore' | 'pathPatterns'>
): EffectiveJestSelection {
  const configDir = configPath ? path.posix.dirname(configPath) : cwd;
  const rootDirRel = joinDir(configDir, config.rootDir ?? '.');
  const rootDirAbs = rootDirRel === '.' ? repoRoot : `${repoRoot}/${rootDirRel}`;
  const roots = run?.cliRoots ?? config.roots ?? ['<rootDir>'];
  const rootsAbs = roots.map((r) => {
    const s = subRootDir(r, rootDirAbs);
    return s.startsWith('/') ? path.posix.normalize(s) : path.posix.normalize(`${rootDirAbs}/${s}`);
  });
  const testRegex = config.testRegex === undefined ? undefined : ([] as string[]).concat(config.testRegex);
  const testMatch = run?.cliTestMatch ?? (testRegex ? undefined : config.testMatch ?? DEFAULT_TEST_MATCH);
  const ignore = (run?.cliIgnore ?? config.testPathIgnorePatterns ?? DEFAULT_IGNORE).map((p) => subRootDir(p, rootDirAbs));
  return { rootDirAbs, rootsAbs, testMatch, testRegex: run?.cliTestMatch ? undefined : testRegex, ignore, pathPatterns: run?.pathPatterns ?? [] };
}

/** The repo-relative files a selection picks out of `files` (jest semantics, statically). */
export function selectTestFiles(repoRoot: string, selection: EffectiveJestSelection, files: readonly string[]): string[] {
  const ignore = selection.ignore.map((p) => new RegExp(p));
  const patterns = selection.pathPatterns.map((p) => new RegExp(p));
  const regexes = (selection.testRegex ?? []).map((p) => new RegExp(p));
  const out: string[] = [];
  for (const rel of files) {
    if (!/\.[mc]?[jt]sx?$/.test(rel)) continue;
    const abs = `${repoRoot}/${rel}`;
    if (!selection.rootsAbs.some((r) => abs.startsWith(`${r}/`))) continue;
    const matched = selection.testMatch
      ? selection.testMatch.some((g) => minimatch(abs, g, { dot: true }))
      : regexes.some((re) => re.test(abs));
    if (!matched) continue;
    if (ignore.some((re) => re.test(abs))) continue;
    if (patterns.length > 0 && !patterns.some((re) => re.test(abs))) continue;
    out.push(rel);
  }
  return out;
}

/** Group files by parent directory → `dir/ (n): a, b, …` evidence lines. */
function groupByDir(files: readonly string[]): Map<string, string[]> {
  const byDir = new Map<string, string[]>();
  for (const f of [...files].sort()) {
    const dir = `${path.posix.dirname(f)}/`;
    (byDir.get(dir) ?? byDir.set(dir, []).get(dir)!).push(path.posix.basename(f));
  }
  return byDir;
}

function dirEvidence(files: readonly string[]): string[] {
  return [...groupByDir(files)].map(([dir, names]) => `${dir} (${names.length}): ${names.join(', ')}`);
}

// ---------------------------------------------------------------------------
// The analysis
// ---------------------------------------------------------------------------

export function analyzeLanes(inputs: LaneInputs): LaneAnalysis {
  const rows: LaneRow[] = [];
  const req = collectRequiredLeaves(inputs);

  for (const ctx of req.unresolvedContexts) {
    rows.push({
      kind: 'error',
      key: `unresolved-context:${ctx}`,
      detail: `required context "${ctx}" (EXPECTED_CONTEXTS) is produced by no job in any workflow — derivation or protection-list drift`,
      evidence: [],
    });
  }

  // Local lanes: every tracked jest config, on its own roots/testMatch.
  const localConfigs = Object.keys(inputs.jestConfigs).sort();
  const localSelection = new Map<string, string[]>();
  for (const cfgPath of localConfigs) {
    const cfg = inputs.jestConfigs[cfgPath];
    if (cfg === undefined || cfg.projects !== undefined) {
      rows.push({
        kind: 'error',
        key: `unloadable-config:${cfgPath}`,
        detail: cfg === undefined ? 'jest config could not be loaded (only CommonJS .js/.cjs/.json configs are evaluated)' : 'jest config uses `projects` — not modeled by this derivation',
        evidence: [],
      });
      continue;
    }
    localSelection.set(cfgPath, selectTestFiles(inputs.repoRoot, effectiveSelection(inputs.repoRoot, cfgPath, path.posix.dirname(cfgPath), cfg), inputs.files));
  }
  const reachedLocally = new Set([...localSelection.values()].flat());

  // Required executions.
  const exercised = new Set<string>();
  const invokedConfigs = new Set<string>();
  const requiredOnly = new Map<string, { contexts: Set<string>; files: Set<string>; originKind: 'script' | 'inline' }>();
  const inventory = new Map<string, LaneInventoryEntry>();
  const addInventory = (command: string, kind: LaneInventoryEntry['kind'], context: string) => {
    const k = `${kind}\u0000${command}`;
    const entry = inventory.get(k) ?? inventory.set(k, { command, contexts: [], kind }).get(k)!;
    if (!entry.contexts.includes(context)) entry.contexts.push(context);
  };
  const testingOrigins = new Set<string>();
  const errorsSeen = new Set<string>();

  for (const leaf of req.leaves) {
    if (leaf.error) {
      const key = `unresolved-step:${leaf.origin}`;
      if (!errorsSeen.has(key)) {
        errorsSeen.add(key);
        rows.push({ kind: 'error', key, detail: leaf.error, evidence: [`${leaf.context} — ${leaf.workflow} › ${leaf.job} › ${leaf.step}`] });
      }
      continue;
    }
    if (leaf.jest) {
      if (leaf.jest.listOnly) {
        addInventory(leaf.origin, 'jest-listing', leaf.context);
        continue;
      }
      const cfg = leaf.jest.configPath ? inputs.jestConfigs[leaf.jest.configPath] : {};
      if (leaf.jest.configPath && cfg === undefined) {
        const key = `unloadable-config:${leaf.jest.configPath}`;
        if (!rows.some((r) => r.key === key)) {
          rows.push({ kind: 'error', key, detail: `required step runs jest with a config that is not a tracked, loadable jest config`, evidence: [`${leaf.context} — ${leaf.origin}`] });
        }
        continue;
      }
      if (leaf.jest.configPath) invokedConfigs.add(leaf.jest.configPath);
      testingOrigins.add(leaf.origin);
      const sel = selectTestFiles(inputs.repoRoot, effectiveSelection(inputs.repoRoot, leaf.jest.configPath, leaf.jest.cwd, cfg ?? {}, leaf.jest), inputs.files);
      for (const f of sel) exercised.add(f);
      const unreached = sel.filter((f) => !reachedLocally.has(f));
      if (unreached.length > 0) {
        const entry = requiredOnly.get(leaf.origin) ?? requiredOnly.set(leaf.origin, { contexts: new Set(), files: new Set(), originKind: leaf.originKind }).get(leaf.origin)!;
        entry.contexts.add(leaf.context);
        for (const f of unreached) entry.files.add(f);
      }
      continue;
    }
    if (leaf.other !== undefined) {
      addInventory(leaf.origin, leaf.other === 'unresolved ${{ }} expression' ? 'unresolved' : leaf.originKind === 'script' ? 'non-test-script' : 'inline', leaf.context);
    }
  }
  // A script that runs jest somewhere is a test lane, not inventory — drop it from inventory.
  for (const [k, entry] of inventory) {
    if (entry.kind === 'non-test-script' && testingOrigins.has(entry.command)) inventory.delete(k);
  }

  // (i) required-only rows.
  for (const [origin, entry] of [...requiredOnly].sort(([a], [b]) => (a < b ? -1 : 1))) {
    const files = [...entry.files].sort();
    rows.push({
      kind: 'required-only',
      key: `${entry.originKind === 'script' ? 'required-script' : 'required-inline'}:${origin.replace(/^npm run (\S+) \[([^\]]+)\]$/, '$2/$1').replace(/^npm run /, '')}`,
      detail: `${files.length} test file(s) this required step runs are selected by no local jest config [${[...entry.contexts].sort().join(', ')}]`,
      evidence: dirEvidence(files),
    });
  }

  // (ii) local-only rows.
  const localCompared: string[] = [];
  for (const cfgPath of localConfigs) {
    const sel = localSelection.get(cfgPath);
    if (sel === undefined) continue;
    const unexercised = sel.filter((f) => !exercised.has(f));
    if (invokedConfigs.has(cfgPath) && unexercised.length === 0) {
      localCompared.push(`${cfgPath} (${sel.length})`);
      continue;
    }
    if (!invokedConfigs.has(cfgPath)) {
      rows.push({
        kind: 'local-only',
        key: `local-config:${cfgPath}`,
        detail: `no required step invokes this jest config; ${unexercised.length} of ${sel.length} selected test file(s) are run by no required step`,
        evidence: dirEvidence(unexercised),
      });
      continue;
    }
    for (const [dir, names] of groupByDir(unexercised)) {
      rows.push({
        kind: 'local-only',
        key: `local-config:${cfgPath}@${dir}`,
        detail: `${names.length} test file(s) this config selects are run by no required step`,
        evidence: [`${dir}: ${names.join(', ')}`],
      });
    }
  }

  // (ii) non-jest local test scripts no required step runs.
  const requiredOrigins = new Set(req.leaves.map((l) => l.origin));
  const files = new Set(inputs.files);
  for (const [pkg, scripts] of Object.entries(inputs.packages).sort(([a], [b]) => (a < b ? -1 : 1))) {
    for (const script of Object.keys(scripts).sort()) {
      if (!/^test(:|$)/.test(script)) continue;
      const leaves = expandCommand({ words: ['npm', 'run', script], cwd: pkg }, inputs.packages, files, undefined);
      if (leaves.some((l) => l.jest)) continue; // covered by the config analysis above
      const origin = scriptOrigin(pkg, script);
      if (requiredOrigins.has(origin)) continue;
      rows.push({
        kind: 'local-only',
        key: `local-script:${pkg === '.' ? '' : `${pkg}/`}${script}`,
        detail: `non-jest local test script run by no required step`,
        evidence: [`${script}: ${scripts[script]}`],
      });
    }
  }

  return {
    requiredContexts: inputs.expectedContexts.length,
    requiredJobs: req.jobCount,
    workflowsWithRequiredJobs: req.workflows,
    localConfigs,
    requiredCompared: [...testingOrigins].filter((o) => !requiredOnly.has(o)).sort(),
    localCompared,
    rows,
    inventory: [...inventory.values()]
      .map((e) => ({ ...e, contexts: [...e.contexts].sort() }))
      .sort((a, b) => (a.kind === b.kind ? (a.command < b.command ? -1 : 1) : a.kind < b.kind ? -1 : 1)),
  };
}

// ---------------------------------------------------------------------------
// The audit (adjudication join) + formatting
// ---------------------------------------------------------------------------

export interface LaneAuditResult {
  analysis: LaneAnalysis;
  adjudicated: LaneRow[];
  unadjudicated: LaneRow[];
  errors: LaneRow[];
  /**
   * Recorded `audit:coverage-map:lanes` adjudications whose key matches NO current row (Stacy's
   * output-shape consult, item 4 AMEND). Listed on every run, never failing — so a fixed row's
   * ruling cannot linger silently, and a row's expiry is checkable.
   */
  stale: RecordedAdjudication[];
  /**
   * Recorded `audit:coverage-map:lanes` adjudications keyed to an ERROR row (Stacy's Low request).
   * They cannot cover that row (derivation errors are never adjudicable), and once the ERROR is
   * repaired the old ruling would silently resume covering whatever row reuses the key — so they
   * are listed with the stale block on every run, never failing.
   */
  inert: RecordedAdjudication[];
  pass: boolean;
}

export function auditLanes(analysis: LaneAnalysis, adjudications: readonly RecordedAdjudication[]): LaneAuditResult {
  const keys = new Set(adjudications.filter((a) => a.sweep === LANES_SWEEP_CONTEXT).map((a) => a.key));
  const errors = analysis.rows.filter((r) => r.kind === 'error');
  const adjudicable = analysis.rows.filter((r) => r.kind !== 'error');
  const adjudicated = adjudicable.filter((r) => keys.has(r.key));
  const unadjudicated = adjudicable.filter((r) => !keys.has(r.key));
  const rowKeys = new Set(analysis.rows.map((r) => r.key));
  const errorKeys = new Set(errors.map((r) => r.key));
  const byKey = (x: RecordedAdjudication, y: RecordedAdjudication) => (x.key < y.key ? -1 : x.key > y.key ? 1 : 0);
  const lanesAdjudications = adjudications.filter((adj) => adj.sweep === LANES_SWEEP_CONTEXT);
  const stale = lanesAdjudications.filter((adj) => !rowKeys.has(adj.key)).sort(byKey);
  const inert = lanesAdjudications.filter((adj) => errorKeys.has(adj.key)).sort(byKey);
  return { analysis, adjudicated, unadjudicated, errors, stale, inert, pass: errors.length === 0 && unadjudicated.length === 0 };
}

export function formatLaneAudit(audit: LaneAuditResult): string[] {
  const a = audit.analysis;
  const out: string[] = [];
  const adjKeys = new Set(audit.adjudicated.map((r) => r.key));
  const tag = (r: LaneRow) => (r.kind === 'error' ? '[ERROR]' : adjKeys.has(r.key) ? '[adjudicated]' : '[FAIL]');
  const printRows = (rows: LaneRow[]) => {
    if (rows.length === 0) out.push('      (none)');
    for (const r of rows) {
      out.push(`      ${tag(r)} ${r.key}`);
      out.push(`             ${r.detail}`);
      for (const e of r.evidence) out.push(`               ${e}`);
    }
  };
  out.push('');
  out.push(`  lanes (required-check steps vs local lane roots; sweep: ${LANES_SWEEP_CONTEXT}): ${audit.pass ? 'PASS' : 'FAIL'}`);
  out.push(`    required contexts : ${a.requiredContexts} (verify-gate-registration.sh EXPECTED_CONTEXTS) -> ${a.requiredJobs} job run(s) in ${a.workflowsWithRequiredJobs.length} workflow(s)`);
  out.push(`    local lanes       : ${a.localConfigs.length} jest config(s): ${a.localConfigs.join(', ')}`);
  const errs = a.rows.filter((r) => r.kind === 'error');
  if (errs.length > 0) {
    out.push(`    derivation errors (never adjudicable — repair the derivation or the drift):`);
    printRows(errs);
  }
  out.push(`    (i)  required-only — a required step runs tests that no local lane selects:`);
  out.push(`      compared, no gap: ${a.requiredCompared.length > 0 ? a.requiredCompared.join(', ') : '(none)'}`);
  printRows(a.rows.filter((r) => r.kind === 'required-only'));
  out.push(`    (ii) local-only    — a local lane selects tests (or a test script runs) that no required step runs:`);
  out.push(`      compared, no gap: ${a.localCompared.length > 0 ? a.localCompared.join(', ') : '(none)'}`);
  printRows(a.rows.filter((r) => r.kind === 'local-only'));
  out.push(`    inventory (visible, not failing — required steps with no lane comparison):`);
  if (a.inventory.length === 0) out.push('      (none)');
  for (const e of a.inventory) out.push(`      [${e.kind}] ${e.command}  <- ${e.contexts.join(', ')}`);
  out.push(`    stale adjudications (visible, not failing — an ${LANES_SWEEP_CONTEXT} ruling whose key matches no current row, or is keyed to an ERROR row):`);
  if (audit.stale.length === 0 && audit.inert.length === 0) out.push('      (none)');
  for (const adj of audit.stale) out.push(`      [stale adjudication] ${adj.key}  (owner: ${adj.owner}; record: ${adj.record})`);
  for (const adj of audit.inert) {
    out.push(`      [inert adjudication — keyed to an ERROR row] ${adj.key}  (owner: ${adj.owner}; record: ${adj.record})`);
  }
  if (audit.unadjudicated.length > 0 || audit.errors.length > 0) {
    out.push(`    UNADJUDICATED LANE ROWS (${audit.unadjudicated.length})${audit.errors.length > 0 ? ` + DERIVATION ERRORS (${audit.errors.length})` : ''}:`);
    for (const r of [...audit.errors, ...audit.unadjudicated]) out.push(`      ${tag(r)} ${r.key}`);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Lane inputs from the real repo (IO — the CLI's only lanes-side filesystem/git reads)
// ---------------------------------------------------------------------------

/** Tracked jest config files: `jest.config.*` and `jest.<lane>.config.*`. */
export const JEST_CONFIG_PATTERN = /(^|\/)jest(\.[\w-]+)?\.config\.(js|cjs|mjs|ts|json)$/;

export function readLaneInputs(repoRoot: string): LaneInputs {
  const files = execFileSync('git', ['ls-files'], { cwd: repoRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    .split('\n')
    .filter((f) => f.length > 0);
  const read = (rel: string) => fs.readFileSync(path.join(repoRoot, rel), 'utf8');

  const expectedContexts = parseExpectedContexts(read('tools/agent-generator/verify-gate-registration.sh'));

  const workflows: Record<string, string> = {};
  for (const f of files.filter((f) => /^\.github\/workflows\/[^/]+\.ya?ml$/.test(f))) workflows[f] = read(f);

  const packages: PackageScriptsMap = {};
  for (const f of files.filter((f) => f === 'package.json' || /^[^/]+(\/[^/]+)*\/package\.json$/.test(f))) {
    if (f.includes('node_modules/') || f.includes('__fixtures__/')) continue;
    const dir = f === 'package.json' ? '.' : path.posix.dirname(f);
    try {
      packages[dir] = (JSON.parse(read(f)) as { scripts?: Record<string, string> }).scripts ?? {};
    } catch {
      /* an unparseable package.json surfaces as an unresolved-step error if a required step uses it */
    }
  }

  const jestConfigs: Record<string, JestConfigShape | undefined> = {};
  for (const f of files.filter((f) => JEST_CONFIG_PATTERN.test(f) && !f.includes('__fixtures__/'))) {
    try {
      jestConfigs[f] = /\.(js|cjs|json)$/.test(f) ? (require(path.join(repoRoot, f)) as JestConfigShape) : undefined;
    } catch {
      jestConfigs[f] = undefined;
    }
  }

  return { repoRoot, expectedContexts, workflows, packages, jestConfigs, files };
}

// ============================================================================
// CLI — regenerate both files + run the audit (require.main only)
// ============================================================================

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..', '..');

  const manifest = buildCoverageManifest(repoRoot);
  const surfaces = enumerateSurfaces(repoRoot);
  const rows = buildCoverageMap(surfaces, manifest);

  fs.writeFileSync(path.join(repoRoot, 'canonical', 'coverage-manifest.yaml'), serializeCoverageManifest(manifest));
  fs.writeFileSync(path.join(repoRoot, 'canonical', 'coverage-map.yaml'), serializeCoverageMap(rows));

  const adjudicationsText = (() => {
    try {
      return fs.readFileSync(path.join(repoRoot, 'canonical', 'adjudications.yaml'), 'utf8');
    } catch {
      return undefined;
    }
  })();
  const adjudications = parseAdjudications(adjudicationsText);

  const audit = auditCoverageMap(rows, adjudications);
  const lanes = auditLanes(analyzeLanes(readLaneInputs(repoRoot)), adjudications);
  const pass = audit.pass && lanes.pass;

  console.log(
    `audit:coverage-map: ${pass ? 'PASS' : 'FAIL'} (surfaces ${audit.pass ? 'PASS' : 'FAIL'} · lanes ${lanes.pass ? 'PASS' : 'FAIL'})`
  );
  console.log(`  total surfaces      : ${audit.totalSurfaces}`);
  console.log(`  guarded             : ${audit.guardedSurfaces}`);
  console.log(`  blank               : ${audit.blankSurfaces}`);
  console.log(`  adjudicated-blank   : ${audit.adjudicatedBlanks.length}`);
  for (const key of audit.adjudicatedBlanks) console.log(`    [adjudicated] ${key}`);
  if (audit.unadjudicatedBlanks.length > 0) {
    console.log(`  UNADJUDICATED BLANK ROWS (${audit.unadjudicatedBlanks.length}):`);
    for (const key of audit.unadjudicatedBlanks) console.log(`    [FAIL] ${key}`);
  }
  for (const line of formatLaneAudit(lanes)) console.log(line);

  process.exit(pass ? 0 : 1);
}
