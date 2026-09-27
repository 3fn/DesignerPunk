/**
 * `npx designerpunk sync` — reconcile what DesignerPunk manages in a consumer
 * repo with the installed package, and report (never write) everything else.
 *
 * Spec 123 Task 5 (design.md § "C7"; Reqs 5.1, 5.2, 5.5–5.8). Re-scoped from
 * Spec 111 under Model B:
 *  - **Ours never flows into theirs.** The token tier (`src/tokens`), `src/types`
 *    and the pre-123 component copies are NOT managed: never scanned for
 *    reconciliation, never written (Req 5.8). Their old manifest entries are
 *    PRUNED with a one-line report per group.
 *  - **What is managed is what the manifest recorded** — U1: the package-copy
 *    roots (`origin: 'copy'`, file grain) and the MCP keys (`grain: 'key'`).
 *  - **No class applies without the report first.** Off a terminal, nothing is
 *    written without `--apply`; on a terminal, one batch confirmation. A
 *    `conflict` applies only with `--overwrite <path>`, a `deleted-by-you` only
 *    with `--restore <path>`.
 *
 * Order: resolve → steward guard → manifest (load | relocate legacy) → prune →
 * classify (files, keys) → migration → repairs → REPORT → decide → apply → save.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { resolvePackage } from './PackageResolver';
import { scanFiles } from './FileScanner';
import {
  loadManifest,
  loadLegacyManifest,
  saveManifest,
  convertLegacyManifest,
  pruneDemanaged,
  pruneReportLines,
  writeLegacyPointer,
  legacyHasPointer,
  MANIFEST_FILE,
  LEGACY_MANIFEST_PATH,
  MANIFEST_SCHEMA_VERSION,
} from './Manifest';
import type { DesignerPunkManifest, PrunedGroup } from './Manifest';
import { loadIgnoreFilter } from './IgnoreFilter';
import { classifyFiles, managedCopyRoots } from './Classifier';
import type { ClassificationResult } from './Classifier';
import {
  KEY_SURFACES,
  computePackageKeys,
  readProjectKeys,
  classifySurfaceKeys,
} from './KeyGrain';
import type { SurfaceKeyResult } from './KeyGrain';
import {
  buildReport,
  displayReport,
  STEWARD_REPO_MESSAGE,
  OFF_TTY_REPORT_ONLY_MESSAGE,
  RETIRED_FORCE_MESSAGE,
  corruptManifestMessage,
  packageKeysUnavailableMessage,
} from './Reporter';
import { applyCopyFile, adoptCopyFile, applyKeys } from './Applier';
import { reportAndMaybeFixStaleSteeringDir } from './SteeringDirCheck';
import {
  migrationTrigger,
  hasLegacyCopies,
  assessComponentCopies,
  resolveUpperBound,
  migrationReportLines,
  relocateComponents,
  npmRailFetcher,
  repairOffers,
  repairRegistryPin,
  repairTsconfigPins,
  LEGACY_AGENTS_RETAINED_MESSAGE,
} from './Migration';
import type { MigrationAssessment, PackageFetcher, RelocationResult } from './Migration';
import {
  loadNameContract,
  readPresentNames,
  checkNameContract,
  contractMissingMessage,
  configUnreadableMessage,
} from './NameContract';
import type { NameContractResult } from './NameContract';
import { loadConfig } from '../../config/ConfigLoader';
import type { ConfigModuleLoader } from '../../config/ConfigLoader';

export interface SyncOptions {
  projectRoot: string;
  /** Report only; never write (any TTY state). */
  dryRun?: boolean;
  /** Apply updates without the terminal confirmation (the off-TTY path). */
  apply?: boolean;
  /** `deleted-by-you` paths (or `<file>#<key>` ids) to re-add. */
  restore?: string[];
  /** `conflict` paths (or `<file>#<key>` ids) to overwrite. */
  overwrite?: string[];
  /** The retired `--force` / `--accept-all` flags were passed (reported, not honored). */
  retiredForce?: boolean;
  /** Test seam — defaults to `process.stdin.isTTY`. */
  isTTY?: boolean;
  /** Test seam — the terminal batch confirmation. */
  confirm?: (question: string) => Promise<boolean>;
  /** `--migrate-components`: relocate forks to src/components/<Name>/, remove unmodified copies. */
  migrateComponents?: boolean;
  /** Test seam — the migration's package fetcher (default: the consumer's own npm rail). */
  fetcher?: PackageFetcher;
  /** `--repair-npmrc`: remove the `@3fn` → GitHub Packages mapping line (Req 5.1). */
  repairNpmrc?: boolean;
  /** `--repair-tsconfig`: remove tsconfig.test.json's raw-src re-pins (Req 5.2). */
  repairTsconfig?: boolean;
  /** Test seam — the config-module loader for the name contract's output directory (Task 6). */
  configLoader?: ConfigModuleLoader;
}

export interface SyncOutcome {
  /** Why the run ended early, if it did. */
  stopped?: 'steward' | 'corrupt-manifest' | 'dry-run' | 'off-tty' | 'declined';
  applied: string[];
  manifestWritten: boolean;
  report: string[];
  /** The migration assessment, when the pre-123 surface triggered it. */
  migration?: MigrationAssessment;
  relocation?: RelocationResult;
  /** Ordered events (fetches, repair offers) — the ordering instrument (C7 step 6). */
  trace: string[];
  /** The name-contract check (Req 5A) — report only, never a write. */
  nameContract?: NameContractResult | { status: 'cannot-check'; lines: string[] };
}

/** Parse `sync`'s CLI flags (everything after `sync`). */
export function parseSyncArgs(argv: string[]): Omit<SyncOptions, 'projectRoot'> {
  const opts: Omit<SyncOptions, 'projectRoot'> = { restore: [], overwrite: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--apply') opts.apply = true;
    else if (a === '--force' || a === '--accept-all') opts.retiredForce = true;
    else if (a === '--restore' && argv[i + 1]) opts.restore!.push(argv[++i]);
    else if (a.startsWith('--restore=')) opts.restore!.push(a.slice('--restore='.length));
    else if (a === '--overwrite' && argv[i + 1]) opts.overwrite!.push(argv[++i]);
    else if (a.startsWith('--overwrite=')) opts.overwrite!.push(a.slice('--overwrite='.length));
    else if (a === '--migrate-components') opts.migrateComponents = true;
    else if (a === '--repair-npmrc') opts.repairNpmrc = true;
    else if (a === '--repair-tsconfig') opts.repairTsconfig = true;
  }
  return opts;
}

function realpathOr(p: string): string {
  try {
    return fs.realpathSync(p);
  } catch {
    return path.resolve(p);
  }
}

async function terminalConfirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise<string>((resolve) => rl.question(`${question} [y/N]: `, resolve));
  rl.close();
  return answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes';
}

export async function runSync(options: SyncOptions): Promise<SyncOutcome> {
  const { projectRoot } = options;
  const outcome: SyncOutcome = { applied: [], manifestWritten: false, report: [], trace: [] };
  const isTTY = options.isTTY ?? Boolean(process.stdin.isTTY);

  // 1. Resolve the installed package.
  const pkg = resolvePackage(projectRoot);

  // 1b. Steward exemption (design C2; found-not-fixed item 5): the package's own
  //     tree is not a consumer. Nothing is read or written — including this
  //     repo's own stale `.kiro/sync-manifest.json`, which sync does not own here.
  if (realpathOr(pkg.root) === realpathOr(projectRoot)) {
    console.log(STEWARD_REPO_MESSAGE);
    return { ...outcome, stopped: 'steward', report: [STEWARD_REPO_MESSAGE] };
  }
  console.log(`📦 @3fn/core v${pkg.version}\n`);
  if (options.retiredForce) console.log(`${RETIRED_FORCE_MESSAGE}\n`);

  // 2. Manifest — the root manifest, else the legacy one (relocated on apply).
  const manifestLines: string[] = [];
  const loaded = loadManifest(projectRoot);
  if (loaded.kind === 'corrupt') {
    const msg = corruptManifestMessage(loaded.error);
    console.log(msg);
    return { ...outcome, stopped: 'corrupt-manifest', report: [msg] };
  }
  let manifest: DesignerPunkManifest;
  let pruned: PrunedGroup[] = [];
  let relocateLegacy = false;
  let persistManifest: boolean;
  if (loaded.kind === 'ok') {
    manifest = loaded.manifest;
    persistManifest = true;
  } else {
    const legacy = loadLegacyManifest(projectRoot);
    if (legacy) {
      const conv = convertLegacyManifest(legacy, pkg.version);
      manifest = conv.manifest;
      pruned = conv.pruned;
      relocateLegacy = true;
      persistManifest = true;
      manifestLines.push(
        `found the pre-123 manifest ${LEGACY_MANIFEST_PATH} (last synced at ${legacy.version}) — it moves to ${MANIFEST_FILE} at the repo root when changes apply`,
      );
    } else {
      manifest = {
        version: MANIFEST_SCHEMA_VERSION,
        posture: 'born',
        installedVersion: pkg.version,
        contractHash: '',
        attachedTargets: [],
        entries: {},
      };
      persistManifest = false;
      manifestLines.push(`no ${MANIFEST_FILE} and no ${LEGACY_MANIFEST_PATH} — nothing here was recorded as DesignerPunk's, so nothing is managed`);
    }
  }
  const entries = manifest.entries;
  pruned = [...pruned, ...pruneDemanaged(entries)];
  manifestLines.push(...pruneReportLines(pruned));

  // 3. File grain — the copy roots this manifest manages.
  const ignore = loadIgnoreFilter(projectRoot);
  const roots = managedCopyRoots(entries);
  const files: ClassificationResult = classifyFiles(
    scanFiles(pkg.root, roots),
    scanFiles(projectRoot, roots),
    entries,
    ignore,
    roots,
  );

  // 4. Key grain — the package side for the manifest's attachedTargets.
  const keyResults: SurfaceKeyResult[] = [];
  const sections: Array<{ title: string; lines: string[] }> = [];
  if (manifest.attachedTargets.length > 0) {
    const pkgKeys = computePackageKeys(pkg.root, manifest.attachedTargets);
    if (pkgKeys.kind === 'unavailable') {
      sections.push({ title: '⚠️  MCP configuration:', lines: [packageKeysUnavailableMessage(pkgKeys.reason)] });
    } else {
      for (const surface of KEY_SURFACES) {
        const pkgSurfaceKeys = pkgKeys.keys.get(surface.file);
        if (!pkgSurfaceKeys) continue;
        keyResults.push(classifySurfaceKeys(surface, pkgSurfaceKeys, readProjectKeys(projectRoot, surface), entries));
      }
    }
  }

  // 5. Migration — pre-123 component copies (C7 steps 2–5), judged against shipped content.
  const trigger = migrationTrigger(projectRoot, relocateLegacy);
  if (trigger) {
    const lines: string[] = [];
    if (hasLegacyCopies(projectRoot)) {
      const fetcher = options.fetcher ?? npmRailFetcher(projectRoot);
      try {
        const upperBound = resolveUpperBound(projectRoot, loaded.kind === 'ok' ? manifest.installedVersion : null);
        outcome.migration = assessComponentCopies(projectRoot, { fetcher, upperBound, trigger });
      } finally {
        fetcher.dispose?.();
      }
      for (const v of outcome.migration.fetchLog) outcome.trace.push(`fetch:${v}`);
      lines.push(...migrationReportLines(outcome.migration));
    }
    if (roots.some((r) => r !== '.kiro/skills') || ['.kiro/agents', '.kiro/steering', 'governance'].some((d) => fs.existsSync(path.join(projectRoot, d)))) {
      lines.push(LEGACY_AGENTS_RETAINED_MESSAGE);
    }
    sections.push({ title: '🧬 Migrating from a pre-123 install:', lines });
  }

  // 6. Repairs (C7 step 6) — OFFERED only now, after the migration fetch ran
  //    through the consumer's rail (the npmrc repair removes that rail).
  const offers = repairOffers(projectRoot, hasLegacyCopies(projectRoot));
  for (const o of offers) outcome.trace.push(`repair-offered:${o.kind}`);
  if (offers.length > 0) sections.push({ title: '🔧 Repairs offered:', lines: offers.flatMap((o) => o.lines) });

  // 6b. The name contract (Req 5A; Task 6) — REPORT ONLY: the consumer's token
  //     tier is never written (5.8). Reads the package's compiled contract and her
  //     generated web CSS; no output → `cannot check`, never clean.
  outcome.nameContract = await nameContractSection(projectRoot, pkg.root, options.configLoader);
  sections.push({ title: '🔤 Name contract (your tokens vs. the names our components reference):', lines: outcome.nameContract.lines });

  // 7. REPORT — always, before anything applies.
  const report = buildReport({ dryRun: Boolean(options.dryRun), manifestLines, files, keys: keyResults, sections });
  displayReport(report);
  outcome.report = report;
  await reportAndMaybeFixStaleSteeringDir(projectRoot, { dryRun: Boolean(options.dryRun) || !isTTY });

  // 8. Decide.
  if (options.dryRun) return { ...outcome, stopped: 'dry-run' };
  // Explicit per-repair flags are their own authorization (after the report).
  if (options.repairNpmrc && offers.some((o) => o.kind === 'npmrc') && repairRegistryPin(projectRoot)) {
    outcome.trace.push('repair-applied:npmrc');
    outcome.applied.push('.npmrc');
    console.log('  ✓ .npmrc: removed the @3fn → GitHub Packages mapping line');
  }
  if (options.repairTsconfig && offers.some((o) => o.kind === 'tsconfig') && repairTsconfigPins(projectRoot)) {
    outcome.trace.push('repair-applied:tsconfig');
    outcome.applied.push('tsconfig.test.json');
    console.log('  ✓ tsconfig.test.json: removed the raw-src @3fn/core paths entries');
  }
  if (options.migrateComponents && outcome.migration) {
    // The explicit flag IS the per-run authorization (nothing is removed without it).
    outcome.relocation = relocateComponents(projectRoot, outcome.migration);
    const r = outcome.relocation;
    console.log(
      `\n  ✓ --migrate-components: removed ${r.removed.length} unmodified cop${r.removed.length === 1 ? 'y' : 'ies'}, ` +
        `relocated ${r.relocated.length} to ${'src/components/<Name>/'}` +
        (r.skipped.length ? `; not moved (src/components/<Name>/ exists): ${r.skipped.join(', ')}` : '') +
        (r.leftInPlace.length ? `; left in place (cannot tell): ${r.leftInPlace.join(', ')}` : ''),
    );
  }
  const restore = new Set(options.restore ?? []);
  const overwrite = new Set(options.overwrite ?? []);
  const keyOf = (s: SurfaceKeyResult, key: string) => `${s.surface.file}#${key}`;

  const fileBatch = [...files.new, ...files.updatedSafe].map((f) => f.relativePath);
  const fileRestore = files.deletedByYou.filter((f) => restore.has(f.relativePath)).map((f) => f.relativePath);
  const fileOverwrite = files.conflicts.filter((f) => overwrite.has(f.relativePath)).map((f) => f.relativePath);
  const keyWork = keyResults.map((s) => ({
    s,
    items: s.classified.filter(
      (c) =>
        c.classification === 'new' ||
        c.classification === 'updated-safe' ||
        (c.classification === 'deleted-by-you' && restore.has(keyOf(s, c.key))) ||
        (c.classification === 'conflict' && overwrite.has(keyOf(s, c.key))),
    ),
  }));
  const keyCount = keyWork.reduce((n, w) => n + w.items.length, 0);
  const manifestChanges =
    relocateLegacy ||
    pruned.length > 0 ||
    files.adoptable.length > 0 ||
    files.dropEntries.length > 0 ||
    keyResults.some((s) => s.dropEntries.length > 0) ||
    (persistManifest && manifest.installedVersion !== pkg.version);
  const workCount = fileBatch.length + fileRestore.length + fileOverwrite.length + keyCount;
  if (workCount === 0 && !manifestChanges) return outcome;

  if (!options.apply) {
    if (!isTTY) {
      console.log(`\n${OFF_TTY_REPORT_ONLY_MESSAGE}`);
      return { ...outcome, stopped: 'off-tty' };
    }
    const confirm = options.confirm ?? terminalConfirm;
    const ok = await confirm(
      `\nApply ${workCount} change${workCount === 1 ? '' : 's'}${manifestChanges ? ' and update the manifest' : ''}?`,
    );
    if (!ok) {
      console.log('  ⏭ Nothing applied.');
      return { ...outcome, stopped: 'declined' };
    }
  }

  // 9. Apply.
  for (const rel of [...fileBatch, ...fileRestore, ...fileOverwrite]) {
    if (applyCopyFile(pkg.root, projectRoot, rel, entries)) outcome.applied.push(rel);
  }
  for (const f of files.adoptable) adoptCopyFile(projectRoot, f.relativePath, entries);
  for (const rel of files.dropEntries) delete entries[rel];
  for (const { s, items } of keyWork) {
    for (const id of s.dropEntries) delete entries[id];
    if (items.length === 0) continue;
    applyKeys(projectRoot, s.surface, items.map((c) => ({ key: c.key, value: c.packageValue })), entries);
    for (const c of items) outcome.applied.push(keyOf(s, c.key));
  }

  // 10. Save — the root manifest; relocation leaves the legacy file a pointer.
  if (persistManifest) {
    manifest.installedVersion = pkg.version;
    outcome.manifestWritten = saveManifest(projectRoot, manifest);
    if (relocateLegacy && !legacyHasPointer(projectRoot)) writeLegacyPointer(projectRoot);
  }
  if (outcome.applied.length > 0) console.log(`\n  ✓ ${outcome.applied.length} change${outcome.applied.length === 1 ? '' : 's'} applied`);
  console.log(outcome.manifestWritten ? `✅ Sync complete. ${MANIFEST_FILE} updated.` : '✅ Sync complete.');
  return outcome;
}

const displayPath = (projectRoot: string, abs: string, dir = false): string => {
  const rel = path.relative(projectRoot, abs).split(path.sep).join('/');
  const shown = rel === '' ? '.' : rel.startsWith('..') ? abs : rel;
  return dir && !shown.endsWith('/') ? `${shown}/` : shown;
};

async function nameContractSection(
  projectRoot: string,
  pkgRoot: string,
  configLoader?: ConfigModuleLoader,
): Promise<NameContractResult | { status: 'cannot-check'; lines: string[] }> {
  const contract = loadNameContract(pkgRoot);
  if (!contract) return { status: 'cannot-check', lines: [contractMissingMessage(pkgRoot)] };
  let outputDir: string;
  let tokenRoot: string;
  try {
    const config = configLoader ? await loadConfig(projectRoot, configLoader) : await loadConfig(projectRoot);
    outputDir = config.outputDir;
    tokenRoot = config.tokenSourceMode === 'local' ? config.tokenSourceRoot : path.join(projectRoot, 'src', 'tokens');
  } catch (err) {
    return { status: 'cannot-check', lines: [configUnreadableMessage(err instanceof Error ? err.message : String(err))] };
  }
  return checkNameContract(contract, readPresentNames(outputDir), {
    outputDirDisplay: displayPath(projectRoot, outputDir),
    semanticTierPath: displayPath(projectRoot, path.join(tokenRoot, 'semantic'), true),
    primitiveTierPath: displayPath(projectRoot, tokenRoot, true),
  });
}
