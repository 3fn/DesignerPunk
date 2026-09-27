/**
 * Component-copy migration — pre-123 consumers (Spec 123 Task 5.5; design.md
 * § "C7" Migration steps 2–5; Lina L2-D2, Le-D1).
 *
 * Pre-123 `init` copied `src/components/core/**` into the consumer (with
 * `rewriteBuildImports` applied to `.ts` files from Spec 104 on). Under Model B
 * components are consumed BY NAME from the package, so every copy now SHADOWS
 * the package's version. This module judges each copy:
 *
 *  - **Against SHIPPED content, never the first-sync baseline** (Le-D1(1)). The
 *    content is fetched THE WAY THE CONSUMER INSTALLED: her own npm resolution
 *    (`.npmrc` scope mapping), npm cache first (`--prefer-offline`), run in her
 *    project directory — so pre-13 versions that exist only on GitHub Packages
 *    stay fetchable. This runs BEFORE the registry-pin repair is offered.
 *  - **Any version in the range** — earliest available through the installed
 *    one. A legacy manifest's `version` is the LAST SYNC (it can lag the installed
 *    version — dp-portfolio: 12.0.3 vs 12.0.5), so it is never the bound.
 *  - **The transform, byte-exact, loaded from each fetched tarball itself**, and
 *    applied to `.ts` files only; non-`.ts` files hash raw; `__tests__` excluded.
 *  - **Per file**: a component is `unmodified` iff every file is; a file deleted
 *    from a copy makes the component a fork.
 *  - **Version unknown, fetch failed, or transform unknown → `cannot-tell`.**
 *    Never "unmodified".
 *
 * Nothing is removed without `--migrate-components` (relocate forks to
 * `src/components/<Name>/`, remove unmodified copies; `cannot-tell` stays).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { hashBuffer } from './FileScanner';

export const LEGACY_COMPONENT_ROOT = 'src/components/core';
export const CONSUMER_COMPONENT_ROOT = 'src/components';

export type MigrationVerdict = 'unmodified' | 'modified' | 'cannot-tell';

// ---------------------------------------------------------------------------
// Fetching — the consumer's rail, cache first
// ---------------------------------------------------------------------------

export interface PackageFetcher {
  /** Every published version visible through her resolution; null when it cannot be listed (offline, auth). */
  listVersions(): string[] | null;
  /** The unpacked package root for `version`, or null when the fetch fails. */
  fetch(version: string): string | null;
  /** Remove any scratch state. */
  dispose?(): void;
}

const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';

/**
 * The production fetcher: `npm view` / `npm pack --prefer-offline`, run with
 * `cwd = projectRoot` so HER `.npmrc` (scope → registry mapping, auth) applies.
 */
export function npmRailFetcher(projectRoot: string): PackageFetcher {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-sync-migration-'));
  const run = (args: string[]) =>
    execFileSync(NPM, args, { cwd: projectRoot, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 180_000 });
  return {
    listVersions() {
      try {
        const out = JSON.parse(run(['view', '@3fn/core', 'versions', '--json', '--prefer-offline']));
        return Array.isArray(out) ? out.map(String) : typeof out === 'string' ? [out] : null;
      } catch {
        return null;
      }
    },
    fetch(version) {
      try {
        const dest = path.join(scratch, version);
        fs.mkdirSync(dest, { recursive: true });
        const packed = JSON.parse(run(['pack', `@3fn/core@${version}`, '--prefer-offline', '--pack-destination', dest, '--json']));
        const filename = Array.isArray(packed) ? packed[0]?.filename : undefined;
        if (!filename) return null;
        execFileSync('tar', ['-xzf', path.join(dest, path.basename(filename)), '-C', dest], { stdio: 'ignore', timeout: 180_000 });
        const root = path.join(dest, 'package');
        return fs.existsSync(root) ? root : null;
      } catch {
        return null;
      }
    },
    dispose() {
      fs.rmSync(scratch, { recursive: true, force: true });
    },
  };
}

// ---------------------------------------------------------------------------
// The transform, loaded from the tarball itself
// ---------------------------------------------------------------------------

export type TransformLoad =
  | { kind: 'fn'; fn: (content: string) => string; source: string }
  | { kind: 'identity'; source: string }
  | { kind: 'unknown'; reason: string };

/**
 * Load the copy transform THIS version's `init` applied, from its own files:
 *  1. `dist/cli/shared/transforms.js` (13.0.0+ ship compiled CLI modules);
 *  2. `src/cli/shared/transforms.ts` (11.9.0–12.x ran the CLI from `src/` via
 *     tsx and did not ship `dist/cli/shared/`) — loaded through tsx;
 *  3. no module, and the version's `init` never mentions `rewriteBuildImports`
 *     → the IDENTITY (before Spec 104);
 *  4. otherwise (11.3.0–11.8.x: the transform is private to `init.ts`) → unknown.
 */
export function loadTransform(pkgRoot: string): TransformLoad {
  const js = path.join(pkgRoot, 'dist/cli/shared/transforms.js');
  const ts = path.join(pkgRoot, 'src/cli/shared/transforms.ts');
  const pick = (mod: unknown, source: string): TransformLoad => {
    const fn = (mod as { rewriteBuildImports?: unknown })?.rewriteBuildImports;
    return typeof fn === 'function'
      ? { kind: 'fn', fn: fn as (c: string) => string, source }
      : { kind: 'unknown', reason: `${source} does not export rewriteBuildImports` };
  };
  try {
    if (fs.existsSync(js)) return pick(require(js), 'dist/cli/shared/transforms.js');
    if (fs.existsSync(ts)) return pick(requireTs(ts), 'src/cli/shared/transforms.ts');
  } catch (err) {
    return { kind: 'unknown', reason: `the version's transform module failed to load (${(err as Error).message})` };
  }
  for (const initRel of ['dist/cli/init.js', 'src/cli/init.ts']) {
    const initPath = path.join(pkgRoot, initRel);
    if (!fs.existsSync(initPath)) continue;
    return fs.readFileSync(initPath, 'utf-8').includes('rewriteBuildImports')
      ? { kind: 'unknown', reason: `${initRel} applies rewriteBuildImports but does not export it` }
      : { kind: 'identity', source: `${initRel} (before Spec 104 — no copy transform)` };
  }
  return { kind: 'unknown', reason: 'the version ships neither a transform module nor its init' };
}

function requireTs(file: string): unknown {
  // Under ts-jest (tests) plain require compiles .ts; at runtime the CLI is plain
  // Node, so tsx's scoped require does it (tsx is a runtime dependency).
  if (process.env.JEST_WORKER_ID !== undefined) return require(file);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const tsx = require('tsx/cjs/api') as { require: (id: string, from: string) => unknown };
  return tsx.require(file, __filename);
}

// ---------------------------------------------------------------------------
// Versions
// ---------------------------------------------------------------------------

function parseVersion(v: string): number[] | null {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(v.trim());
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

export function compareVersions(a: string, b: string): number {
  const pa = parseVersion(a) ?? [0, 0, 0];
  const pb = parseVersion(b) ?? [0, 0, 0];
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

export interface UpperBound {
  version: string | null;
  source: 'manifest' | 'lockfile' | 'unknown';
}

/**
 * The installed version bounding the range: the manifest's `installedVersion`,
 * else `package-lock.json`, else unknown (→ every verdict `cannot-tell`).
 */
export function resolveUpperBound(projectRoot: string, manifestInstalledVersion: string | null): UpperBound {
  if (manifestInstalledVersion && parseVersion(manifestInstalledVersion)) {
    return { version: manifestInstalledVersion, source: 'manifest' };
  }
  const lockPath = path.join(projectRoot, 'package-lock.json');
  if (fs.existsSync(lockPath)) {
    try {
      const lock = JSON.parse(fs.readFileSync(lockPath, 'utf-8'));
      const v = lock?.packages?.['node_modules/@3fn/core']?.version ?? lock?.dependencies?.['@3fn/core']?.version;
      if (typeof v === 'string' && parseVersion(v)) return { version: v, source: 'lockfile' };
    } catch {
      /* unreadable lockfile → unknown */
    }
  }
  return { version: null, source: 'unknown' };
}

// ---------------------------------------------------------------------------
// Assessment
// ---------------------------------------------------------------------------

export interface FileVerdict {
  /** Relative to the component directory. */
  file: string;
  verdict: MigrationVerdict;
  /** The version whose shipped content it matched, if any. */
  matchedVersion?: string;
}

export interface ComponentVerdict {
  name: string;
  /** `copy`: a DesignerPunk component; `yours`: no fetched version ships it. */
  kind: 'copy' | 'yours';
  verdict: MigrationVerdict;
  files: FileVerdict[];
  /** Files every matched version ships that the copy lacks (a deletion makes a fork). */
  deletedFiles: string[];
}

export interface MigrationAssessment {
  trigger: 'legacy-manifest' | 'legacy-copies';
  upperBound: UpperBound;
  /** Versions in the range, newest first. */
  range: string[];
  fetched: string[];
  failed: string[];
  /** Version → why its transform is unknown. */
  unknownTransform: Record<string, string>;
  /** The order fetch attempts happened in — the ordering instrument for the pin repair. */
  fetchLog: string[];
  components: ComponentVerdict[];
  /** Consumer-side token files found in the copied tree (Lina A5; token-side report strings). */
  oldNameReferenceMaps: string[];
  brandedTokenFiles: string[];
}

/** The migration trigger (C7): a legacy manifest, or legacy copies on disk. */
export function migrationTrigger(projectRoot: string, legacyManifest: boolean): MigrationAssessment['trigger'] | null {
  if (legacyManifest) return 'legacy-manifest';
  return hasLegacyCopies(projectRoot) ? 'legacy-copies' : null;
}

export function hasLegacyCopies(projectRoot: string): boolean {
  const core = path.join(projectRoot, LEGACY_COMPONENT_ROOT);
  return fs.existsSync(core) && fs.readdirSync(core, { withFileTypes: true }).some((e) => e.isDirectory());
}

function listFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (e.name === '__tests__') continue;
      out.push(...listFiles(path.join(dir, e.name), base));
    } else if (e.isFile()) {
      out.push(path.relative(base, path.join(dir, e.name)).split(path.sep).join('/'));
    }
  }
  return out.sort();
}

interface VersionSide {
  version: string;
  root: string;
  transform: TransformLoad;
}

export function assessComponentCopies(
  projectRoot: string,
  opts: { fetcher: PackageFetcher; upperBound: UpperBound; trigger: MigrationAssessment['trigger'] },
): MigrationAssessment {
  const coreDir = path.join(projectRoot, LEGACY_COMPONENT_ROOT);
  const names = fs
    .readdirSync(coreDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  const consumer = new Map<string, Map<string, string>>(); // name → file → hash
  for (const name of names) {
    const m = new Map<string, string>();
    for (const f of listFiles(path.join(coreDir, name))) m.set(f, hashBuffer(fs.readFileSync(path.join(coreDir, name, f))));
    consumer.set(name, m);
  }

  const assessment: MigrationAssessment = {
    trigger: opts.trigger,
    upperBound: opts.upperBound,
    range: [],
    fetched: [],
    failed: [],
    unknownTransform: {},
    fetchLog: [],
    components: [],
    oldNameReferenceMaps: [],
    brandedTokenFiles: [],
  };

  // The range: earliest available → the installed version, newest first.
  let listed: string[] | null = null;
  if (opts.upperBound.version) listed = opts.fetcher.listVersions();
  const rangeKnown = listed !== null && opts.upperBound.version !== null;
  if (rangeKnown) {
    assessment.range = listed!
      .filter((v) => parseVersion(v) && compareVersions(v, opts.upperBound.version!) <= 0)
      .sort((a, b) => compareVersions(b, a));
  }

  // Per-file state.
  const matched = new Map<string, Map<string, string>>(); // name → file → version
  const poisoned = new Map<string, Set<string>>(); // name → files an unknown transform left undecidable
  const presentIn = new Map<string, string[]>(); // name → versions shipping the component
  const versionFileSets = new Map<string, Map<string, Set<string>>>(); // version → name → files
  for (const name of names) {
    matched.set(name, new Map());
    poisoned.set(name, new Set());
    presentIn.set(name, []);
  }
  const allMatched = () =>
    names.every((n) => consumer.get(n)!.size > 0 && [...consumer.get(n)!.keys()].every((f) => matched.get(n)!.has(f)));

  for (const version of assessment.range) {
    if (allMatched()) break;
    assessment.fetchLog.push(version);
    const root = opts.fetcher.fetch(version);
    if (!root) {
      assessment.failed.push(version);
      continue;
    }
    assessment.fetched.push(version);
    const side: VersionSide = { version, root, transform: loadTransform(root) };
    if (side.transform.kind === 'unknown') assessment.unknownTransform[version] = side.transform.reason;
    const perName = new Map<string, Set<string>>();
    versionFileSets.set(version, perName);
    for (const name of names) {
      const pkgCompDir = path.join(root, LEGACY_COMPONENT_ROOT, name);
      if (!fs.existsSync(pkgCompDir)) continue;
      presentIn.get(name)!.push(version);
      const pkgFiles = new Set(listFiles(pkgCompDir));
      perName.set(name, pkgFiles);
      for (const [file, hash] of consumer.get(name)!) {
        if (matched.get(name)!.has(file) || !pkgFiles.has(file)) continue;
        const raw = fs.readFileSync(path.join(pkgCompDir, file));
        let candidate: string | null;
        if (!file.endsWith('.ts') || side.transform.kind === 'identity') candidate = hashBuffer(raw);
        else if (side.transform.kind === 'fn') candidate = hashBuffer(side.transform.fn(raw.toString('utf-8')));
        else candidate = null;
        if (candidate === null) poisoned.get(name)!.add(file);
        else if (candidate === hash) matched.get(name)!.set(file, version);
      }
    }
  }

  const undecidableRange = !rangeKnown || assessment.failed.length > 0;
  for (const name of names) {
    const files: FileVerdict[] = [];
    for (const file of consumer.get(name)!.keys()) {
      const v = matched.get(name)!.get(file);
      if (v) files.push({ file, verdict: 'unmodified', matchedVersion: v });
      else if (undecidableRange || poisoned.get(name)!.has(file)) files.push({ file, verdict: 'cannot-tell' });
      else files.push({ file, verdict: 'modified' });
    }
    const shippedBy = presentIn.get(name)!;
    const kind: ComponentVerdict['kind'] = shippedBy.length === 0 && !undecidableRange ? 'yours' : 'copy';
    // A deletion: a file shipped by EVERY version that matched part of this copy, absent on disk.
    const matchedVersions = [...new Set(matched.get(name)!.values())];
    const deletedFiles: string[] = [];
    if (matchedVersions.length > 0) {
      const sets = matchedVersions.map((v) => versionFileSets.get(v)!.get(name)!);
      for (const f of sets[0]) if (sets.every((s) => s.has(f)) && !consumer.get(name)!.has(f)) deletedFiles.push(f);
    }
    let verdict: MigrationVerdict;
    if (kind === 'yours') verdict = 'modified';
    else if (files.some((f) => f.verdict === 'modified') || deletedFiles.length > 0) verdict = 'modified';
    else if (files.length === 0 || files.some((f) => f.verdict === 'cannot-tell')) verdict = 'cannot-tell';
    else verdict = 'unmodified';
    assessment.components.push({ name, kind, verdict, files, deletedFiles: deletedFiles.sort() });
  }
  scanTokenFiles(projectRoot, assessment);
  return assessment;
}

/**
 * Comments blanked out (same approach as `scripts/floor-closure.ts`'s
 * `stripComments`): block comments, then `//` line comments not preceded by `:`
 * (so `https://` inside a string survives). Not a tokenizer.
 */
export function stripComments(content: string): string {
  const noBlock = content.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  return noBlock.replace(/([^:]|^)\/\/.*$/gm, (m, prefix: string) => prefix + ' '.repeat(m.length - prefix.length));
}

/**
 * Lina A5: find the token files `generate`'s recursive scan will reach under
 * `core/`. A TEXT approximation of Task 8's runtime brand count (the migration
 * never executes the consumer's copied `.ts`): a file counts as branded iff
 * `defineComponentTokens` appears OUTSIDE comments. Known residual: an aliased
 * import (`import { defineComponentTokens as dct }`) still reads as branded,
 * because the identifier appears in code.
 *
 * `brandedTokenFiles` is scoped to COPIES — a consumer-authored ("yours")
 * component's branded file was always hers, so "now register as YOUR component
 * tokens" is no news for it. `oldNameReferenceMaps` keeps every component: the
 * lint fires on hers too.
 */
function scanTokenFiles(projectRoot: string, a: MigrationAssessment): void {
  for (const c of a.components) {
    for (const f of listFiles(path.join(projectRoot, LEGACY_COMPONENT_ROOT, c.name))) {
      const base = path.posix.basename(f);
      if (base !== 'tokens.ts' && !base.endsWith('.tokens.ts')) continue;
      const rel = `${LEGACY_COMPONENT_ROOT}/${c.name}/${f}`;
      const code = stripComments(fs.readFileSync(path.join(projectRoot, rel), 'utf-8'));
      if (!code.includes('defineComponentTokens')) a.oldNameReferenceMaps.push(rel);
      else if (c.kind === 'copy') a.brandedTokenFiles.push(rel);
    }
  }
}

// ---------------------------------------------------------------------------
// Report strings
// ---------------------------------------------------------------------------

/** Design catalog row "migration — modified copies (Le-D1(3))". */
export function modifiedCopiesMessage(n: number, names: string[]): string {
  return `these ${n} modified copies now override the package's ${names.join(', ')} and will not receive updates. Keep them as your forks, or move them with 'sync --migrate-components' (relocates modified copies to src/components/<Name>/).`;
}

/** Design catalog row "migration — cannot tell". */
export function cannotTellMessage(p: string, v: string): string {
  return `cannot tell whether ${p} was modified — the package content for version ${v} could not be retrieved. Review before removing.`;
}

/**
 * Follows the catalog `cannot tell` lines (Peter's 2026-09-26 ruling on the
 * migration fork, condition 1: the cannot-tell outcome must be ACTIONABLE —
 * both manual paths, and the legacy warning's persistence). The catalog row
 * itself stays string-equal; this line is additional.
 */
export function cannotTellRemedyMessage(names: string[]): string {
  const them = names.length === 1 ? 'it' : 'them';
  return `sync cannot judge ${names.join(', ')}, so 'sync --migrate-components' leaves ${them} in src/components/core/. Decide each by hand: if you edited it, move it to src/components/<Name>/ (it becomes your fork); if you didn't, delete it and you'll get the package's version. Until then, the old core/ level keeps logging its legacy warning each time the component index loads.`;
}

/** C7 step 3: unmodified copies shadow updates (the design's quoted phrase, verbatim inside). */
export function unmodifiedCopiesMessage(n: number, names: string[]): string {
  return `these ${n} unmodified copies (${names.join(', ')}) shadow package updates — remove them to receive updates (\`sync --migrate-components\`)`;
}

/** Not in the catalog: a component under core/ that no fetched version ships. Authored at Task 5.5. */
export function yoursUnderCoreMessage(n: number, names: string[]): string {
  return `these ${n} components under src/components/core/ are not DesignerPunk's (${names.join(', ')}) — they are yours; 'sync --migrate-components' moves them to src/components/<Name>/ with the forks.`;
}

/**
 * T-L1, string-equal: U1 RETAINS the copied agents, steering and governance —
 * the report states it and offers no removal (their migration is offered only
 * alongside `attach`, next release).
 */
export const LEGACY_AGENTS_RETAINED_MESSAGE =
  'your copied DesignerPunk agents, steering and governance files (.kiro/agents, .kiro/steering, governance) are retained until the next release — nothing to do for them now.';

/**
 * Lina A5 / C7 step 5. Authored at Task 5.5 (Ada). Each takes the file list
 * the assessment found (names are always printed with the line).
 *
 * `oldNameReferenceMaps` is deliberately ownership-agnostic: `scanTokenFiles`
 * classifies by filename + content alone, so this list mixes DesignerPunk's
 * own old-name files (the 7 renamed to `*.refs.ts` in #200 — a pre-123 copy
 * predates that rename and still carries the old name) with a consumer's own
 * semantic-reference map that happens to be named `tokens.ts` — the exact
 * collision Req 8's user story names. The string must not claim authorship it
 * cannot verify per-file.
 */
export const TOKEN_SIDE_SLOTS = {
  /** C7 5 (i): old-name `tokens.ts` reference maps in the copied tree → C11's lint on first generate. */
  oldNameReferenceMaps: (files: string[]) =>
    `${files.length} copied reference map${files.length === 1 ? '' : 's'} named like token files (${files.join(', ')}) will trip the component-token lint on your first 'npx designerpunk generate' — a tokens.ts or *.tokens.ts file that doesn't call defineComponentTokens registers no tokens, whether it's one of ours or one you named yourself. It's a warning, not an error, so generate still runs. Rename the file${files.length === 1 ? '' : 's'} off the tokens.ts pattern (e.g., <Name>.refs.ts) to stop it, or leave as is.`,
  /** C7 5 (ii): branded copied `*.tokens.ts` now harvest as the consumer's component tokens. */
  brandedTokenFiles: (files: string[]) =>
    `${files.length} copied component token file${files.length === 1 ? '' : 's'} (${files.join(', ')}) now register as YOUR component tokens when you run generate — they're yours while the copies stay, and DesignerPunk's release won't overwrite them. Keep the copy and they stay registered; remove it (see above) and they go with it.`,
};

export function migrationReportLines(a: MigrationAssessment): string[] {
  const lines: string[] = [];
  const bound = a.upperBound.version
    ? `${a.upperBound.version} (from the ${a.upperBound.source})`
    : 'unknown (no manifest installedVersion and no package-lock.json)';
  lines.push(
    `pre-123 component copies under ${LEGACY_COMPONENT_ROOT}/ judged against the content each version shipped, through your npm registry settings; installed version: ${bound}`,
  );
  const of = (v: MigrationVerdict, k: ComponentVerdict['kind'] = 'copy') => a.components.filter((c) => c.verdict === v && c.kind === k);
  const unmodified = of('unmodified');
  const forks = of('modified');
  const yours = a.components.filter((c) => c.kind === 'yours');
  const unknown = of('cannot-tell');
  if (unmodified.length > 0) lines.push(unmodifiedCopiesMessage(unmodified.length, unmodified.map((c) => c.name)));
  if (forks.length > 0) lines.push(modifiedCopiesMessage(forks.length, forks.map((c) => c.name)));
  if (yours.length > 0) lines.push(yoursUnderCoreMessage(yours.length, yours.map((c) => c.name)));
  const unknownVersions = Object.keys(a.unknownTransform);
  const v =
    a.failed.length > 0 ? a.failed.join(', ') : unknownVersions.length > 0 ? unknownVersions.join(', ') : a.upperBound.version ?? 'unknown';
  for (const c of unknown) {
    const undecided = c.files.filter((f) => f.verdict === 'cannot-tell');
    if (undecided.length === c.files.length) lines.push(cannotTellMessage(`${LEGACY_COMPONENT_ROOT}/${c.name}/`, v));
    else for (const f of undecided) lines.push(cannotTellMessage(`${LEGACY_COMPONENT_ROOT}/${c.name}/${f.file}`, v));
  }
  if (unknown.length > 0) lines.push(cannotTellRemedyMessage(unknown.map((c) => c.name)));
  if (a.oldNameReferenceMaps.length > 0) lines.push(TOKEN_SIDE_SLOTS.oldNameReferenceMaps(a.oldNameReferenceMaps));
  if (a.brandedTokenFiles.length > 0) lines.push(TOKEN_SIDE_SLOTS.brandedTokenFiles(a.brandedTokenFiles));
  return lines;
}

// ---------------------------------------------------------------------------
// --migrate-components
// ---------------------------------------------------------------------------

export interface RelocationResult {
  removed: string[];
  relocated: string[];
  /** Forks not moved because `src/components/<Name>/` already exists. */
  skipped: string[];
  /** `cannot-tell` components left in place. */
  leftInPlace: string[];
}

export function relocateComponents(projectRoot: string, a: MigrationAssessment): RelocationResult {
  const r: RelocationResult = { removed: [], relocated: [], skipped: [], leftInPlace: [] };
  const coreDir = path.join(projectRoot, LEGACY_COMPONENT_ROOT);
  for (const c of a.components) {
    const from = path.join(coreDir, c.name);
    if (c.verdict === 'cannot-tell') {
      r.leftInPlace.push(c.name);
    } else if (c.verdict === 'unmodified') {
      fs.rmSync(from, { recursive: true, force: true });
      r.removed.push(c.name);
    } else {
      const to = path.join(projectRoot, CONSUMER_COMPONENT_ROOT, c.name);
      if (fs.existsSync(to)) {
        r.skipped.push(c.name);
        continue;
      }
      fs.renameSync(from, to);
      r.relocated.push(c.name);
    }
  }
  if (fs.existsSync(coreDir) && fs.readdirSync(coreDir).length === 0) fs.rmdirSync(coreDir);
  return r;
}

// ---------------------------------------------------------------------------
// Repairs (C7 step 6; Reqs 5.1, 5.2) — OFFERED only after the migration fetch
// ---------------------------------------------------------------------------

/** The exact line the pre-2026-09-20 `init` scaffolded (issue archive/2026-09-20-init-npmrc-registry-pin). */
const REGISTRY_PIN_RE = /^\s*@3fn:registry\s*=\s*https:\/\/npm\.pkg\.github\.com\/?\s*$/;

export interface RepairOffer {
  kind: 'npmrc' | 'tsconfig';
  /** The named explanation + the command (Req 5.1: never silently, never as fine print). */
  lines: string[];
}

/** Req 5.1: detect the `@3fn` → GitHub Packages scope mapping in the consumer's `.npmrc`. Reads only that line's shape; never prints other lines. */
export function detectRegistryPin(projectRoot: string): boolean {
  const p = path.join(projectRoot, '.npmrc');
  if (!fs.existsSync(p)) return false;
  return fs.readFileSync(p, 'utf-8').split(/\r?\n/).some((l) => REGISTRY_PIN_RE.test(l));
}

/** Req 5.2: the scaffolded `tsconfig.test.json` `paths` keys that re-pin `@3fn/core` subpaths to raw `src/`. */
export function detectTsconfigPins(projectRoot: string): { keys: string[]; unparseable: boolean } {
  const p = path.join(projectRoot, 'tsconfig.test.json');
  if (!fs.existsSync(p)) return { keys: [], unparseable: false };
  const text = fs.readFileSync(p, 'utf-8');
  let doc: { compilerOptions?: { paths?: Record<string, unknown> } };
  try {
    doc = JSON.parse(text);
  } catch {
    return { keys: [], unparseable: text.includes('@3fn/core/src/') };
  }
  const paths = doc.compilerOptions?.paths ?? {};
  const keys = Object.entries(paths)
    .filter(([k, v]) => k.startsWith('@3fn/core') && JSON.stringify(v).includes('@3fn/core/src/'))
    .map(([k]) => k);
  return { keys, unparseable: false };
}

export const REGISTRY_PIN_MESSAGE =
  ".npmrc maps @3fn to GitHub Packages (@3fn:registry=https://npm.pkg.github.com). An older 'init' wrote that line; DesignerPunk now publishes to the public npm registry, and the mapping makes every install of @3fn/core need a GitHub token and can leave you on versions npm no longer serves. To remove just that line (your other settings, including any auth lines, stay): npx designerpunk sync --repair-npmrc";

export const REGISTRY_PIN_ORDER_CAUTION =
  "Do this after 'sync --migrate-components': once the mapping is gone, versions before 13.0.0 can no longer be fetched to judge your component copies.";

export function tsconfigPinMessage(keys: string[]): string {
  return `tsconfig.test.json re-pins ${keys.join(', ')} to raw TypeScript in node_modules/@3fn/core/src — an older 'init' wrote that. The package resolves those subpaths to its compiled types, and several of the pinned source files no longer ship. To remove just those paths entries: npx designerpunk sync --repair-tsconfig`;
}

export const TSCONFIG_UNPARSEABLE_MESSAGE =
  "tsconfig.test.json points @3fn/core subpaths at node_modules/@3fn/core/src, but it is not plain JSON (comments?), so sync will not rewrite it. Remove the compilerOptions.paths entries for @3fn/core/* by hand.";

/**
 * Build the offers. Called AFTER the migration assessment (the fetch runs
 * through the pin the npmrc repair removes — L2-D2). `copiesPending` adds the
 * ordering caution while pre-123 copies are still on disk.
 */
export function repairOffers(projectRoot: string, copiesPending: boolean): RepairOffer[] {
  const offers: RepairOffer[] = [];
  if (detectRegistryPin(projectRoot)) {
    offers.push({ kind: 'npmrc', lines: copiesPending ? [REGISTRY_PIN_MESSAGE, REGISTRY_PIN_ORDER_CAUTION] : [REGISTRY_PIN_MESSAGE] });
  }
  const ts = detectTsconfigPins(projectRoot);
  if (ts.keys.length > 0) offers.push({ kind: 'tsconfig', lines: [tsconfigPinMessage(ts.keys)] });
  else if (ts.unparseable) offers.push({ kind: 'tsconfig', lines: [TSCONFIG_UNPARSEABLE_MESSAGE] });
  return offers;
}

/** Remove only the pin line(s). Returns true iff the file changed. */
export function repairRegistryPin(projectRoot: string): boolean {
  const p = path.join(projectRoot, '.npmrc');
  if (!fs.existsSync(p)) return false;
  const text = fs.readFileSync(p, 'utf-8');
  const kept = text.split(/(\r?\n)/);
  const out: string[] = [];
  let changed = false;
  for (let i = 0; i < kept.length; i += 2) {
    const line = kept[i];
    const eol = kept[i + 1] ?? '';
    if (REGISTRY_PIN_RE.test(line)) {
      changed = true;
      continue;
    }
    out.push(line + eol);
  }
  if (changed) fs.writeFileSync(p, out.join(''), 'utf-8');
  return changed;
}

/** Remove only the re-pinning `paths` entries (and `paths` itself if emptied); `baseUrl` is kept. */
export function repairTsconfigPins(projectRoot: string): boolean {
  const { keys } = detectTsconfigPins(projectRoot);
  if (keys.length === 0) return false;
  const p = path.join(projectRoot, 'tsconfig.test.json');
  const doc = JSON.parse(fs.readFileSync(p, 'utf-8'));
  for (const k of keys) delete doc.compilerOptions.paths[k];
  if (Object.keys(doc.compilerOptions.paths).length === 0) delete doc.compilerOptions.paths;
  fs.writeFileSync(p, JSON.stringify(doc, null, 2) + '\n', 'utf-8');
  return true;
}
