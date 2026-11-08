/**
 * Component Token Loader
 *
 * Discovers component token files from local source and harvests the rich
 * `RegisteredComponentToken[]` carried back on each `defineComponentTokens` result's
 * non-enumerable brand. This loader is the SOLE writer to the canonical
 * `ComponentTokenRegistry` (Spec 124): `defineComponentTokens` no longer self-registers,
 * so the cross-boundary shared-singleton desync is eliminated.
 *
 * Discovery sources (order is load-bearing — see below):
 * 1. {tokenSourceRoot}/component/ — scan for *.ts files (dedicated directory)
 * 2. componentTokenDirs from config — scan for *.tokens.ts / tokens.ts files (broader dirs)
 *
 * Ordering (Spec 124, R6 / Task-2 ordering spike): the committed `components.yaml`
 * ordering is directory-SCAN order, NOT a sort. The harvest therefore preserves
 * Source-1-then-Source-2 traversal, each directory in `readdirSync` order, and within each
 * module the `Object.values(mod)` × per-branded-array (authored) order. NO sort is
 * introduced — a sort would reorder to alphabetical and break the R6 `git diff` gate.
 *
 * @see Spec 104 design.md § "Component Token Loader"
 * @see .kiro/specs/124-component-token-return-contract/design.md (the branded-return harvest)
 * @see .kiro/specs/124-component-token-return-contract/findings/r6-ordering-spike.md
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';
import { scopedTsRequire, type TsModuleLoader } from '../config/scopedTsRequire';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';
import { getTokenContract } from '../build/tokens';
import type { ComponentSource } from './shared/componentSources';

/**
 * The file each harvested token came from. Keyed by the token OBJECT the registry stores (the
 * registry keeps the harvested object itself), so it needs no "last run" state: a token from
 * any earlier harvest still answers. Read through {@link componentTokenSourceFile}.
 */
const sourceFileByToken = new WeakMap<RegisteredComponentToken, string>();

/**
 * The token-source file a component token was harvested from, or `undefined` for a token this
 * loader did not harvest. `generate` passes it to the token index, which writes the defining
 * component (`definedBy`) for a file in a component directory — what lets a consumer's
 * `generate` tell which package component an entry of the package's shipped index belongs to
 * (`.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`, shape (c)).
 */
export function componentTokenSourceFile(token: RegisteredComponentToken): string | undefined {
  return sourceFileByToken.get(token);
}

/** Tokens the third source harvested from the installed package's definition files. */
const packageTokens = new WeakSet<RegisteredComponentToken>();

/**
 * True for a token the harvest took from DesignerPunk's shipped definition files (the third
 * source), false for one from the consumer's own two. `generate` keeps these out of the web
 * `ComponentTokens` file, which binds late to the package's own `component-tokens.css`
 * (design § 9: web is not harvested in 129), and tags them in the token index.
 */
export function isPackageComponentToken(token: RegisteredComponentToken): boolean {
  return packageTokens.has(token);
}

/**
 * The third source: DesignerPunk's component directories in the installed package, as the
 * component union resolved them (`resolveComponentSources`). Built by the caller, so this
 * module stays a function of its inputs. Spec 129 U8, design § 9.
 */
export interface PackageComponentTokenSource {
  /** The package's name and version, for the report. */
  name: string;
  version: string;
  /** Package component directories that won the union: their definition files are harvested. */
  winners: ComponentSource[];
  /** Package component directories a consumer component replaced, each with the one that did. */
  losers: Array<{ source: ComponentSource; by: ComponentSource }>;
}

export interface LoadComponentTokensOptions {
  /** The installed package's component directories. Absent in DesignerPunk's own repo. */
  packageSource?: PackageComponentTokenSource;
  /** Where the precedence reports go. Defaults to `console.log`. */
  report?: (line: string) => void;
}

/**
 * Two of the consumer's own files declare one component-token group. The harvest cannot say
 * which is meant, so `generate` stops and names both (design § 9; Req 5.3).
 */
export class ComponentTokenGroupDeclaredTwiceError extends Error {
  readonly group: string;
  readonly files: [string, string];
  constructor(group: string, first: string, second: string) {
    super(
      `component token group ${group} is declared by two of your files: ${first} and ${second}. ` +
      `Keep one declaration of the group and delete or rename the other.`
    );
    this.name = 'ComponentTokenGroupDeclaredTwiceError';
    this.group = group;
    this.files = [first, second];
  }
}

/** The precedence reports of design § 9, as printed. Exported so a test pins the wording. */
export function yoursReplaceMessage(group: string, copiedAtInit: boolean): string {
  return `component tokens: ${group} — yours replace DesignerPunk's${copiedAtInit ? ' (copied at init)' : ''}`;
}
export function notEmittedMessage(group: string, component: string): string {
  return `component tokens: ${group} — not emitted (DesignerPunk's ${component} is replaced by yours)`;
}

/**
 * Discover component token files and harvest branded results into the canonical
 * `ComponentTokenRegistry` as the sole writer. Returns all harvested tokens for
 * downstream consumers.
 *
 * The harvest inspects each loaded module's exports (`Object.values(mod)`) and collects
 * the rich tokens from any export carrying the {@link getTokenContract} brand — by
 * direct / `hasOwnProperty` access, never by enumerating a candidate's keys (Spec 124,
 * R3). Unbranded exports (plain value-maps, getters, string consts, type aliases,
 * re-export aliases) harvest to zero. Re-export aliases are deduped first-seen-wins.
 *
 * @param config - Resolved pipeline configuration.
 * @param loadModule - Injectable runtime-TS resolution seam (Spec 118 Task 9.5). Defaults
 *   to {@link scopedTsRequire} (Approach A scoped `tsx/cjs/api`) — the per-site scope that
 *   makes this consumer-`.ts` load independent of the bin's global register. In-process
 *   jest callers inject a jest-compatible loader; the build script injects the ambient tsx
 *   loader (a plain `require`). See {@link scopedTsRequire} for why.
 */
export function loadComponentTokens(
  config: ResolvedConfig,
  loadModule: TsModuleLoader = scopedTsRequire,
  options: LoadComponentTokensOptions = {},
): RegisteredComponentToken[] {
  // Harvested rich tokens in traversal order (Source-1-then-Source-2; per-module export
  // order; per-branded-array authored order). Deduped by token `name` across modules.
  const harvested: RegisteredComponentToken[] = [];
  const seenNames = new Set<string>();

  // Harvest-zero lint instrumentation (Spec 123 C11, Req 8). `brandedCountByFile` records
  // a per-file branded-export count — incremented independent of `seenNames`'s cross-module
  // dedupe, so a fully branded file whose token names were already harvested from an
  // earlier-scanned module still counts non-zero (Req 8.1, Lina R2's false-positive fix:
  // "harvests zero net tokens" is NOT the trigger; "exports no branded value" is).
  // `scannedTokenFiles` records every file matching the `tokens.ts` / `*.tokens.ts` naming
  // convention the lint targets, from either discovery source.
  const brandedCountByFile = new Map<string, number>();
  const scannedTokenFiles = new Set<string>();
  // Group -> the one consumer file that declares it (Req 5.3: two files declaring one group fail).
  const consumerGroupFiles = new Map<string, string>();

  // Source 1: Auto-discover from {tokenSourceRoot}/component/
  const componentSubdir = path.join(config.tokenSourceRoot, 'component');
  if (fs.existsSync(componentSubdir)) {
    const files = fs.readdirSync(componentSubdir)
      .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
    for (const file of files) {
      const fullPath = path.join(componentSubdir, file);
      if (isTokenFileName(file)) scannedTokenFiles.add(fullPath);
      const mod = loadTokenModule(loadModule, fullPath);
      harvestModule(mod, harvested, seenNames, fullPath, brandedCountByFile, consumerGroupFiles);
    }
  }

  // Source 2: Explicit componentTokens directories (*.tokens.ts / tokens.ts pattern)
  for (const dir of config.componentTokenDirs) {
    if (!fs.existsSync(dir)) continue;
    scanForTokenFiles(dir, loadModule, harvested, seenNames, scannedTokenFiles, brandedCountByFile, consumerGroupFiles);
  }

  // Source 3: DesignerPunk's own definition files from the installed package, taken only from
  // component directories that won the union, and per group: a group any consumer file declares
  // is the consumer's alone (design § 9).
  const fromPackage: RegisteredComponentToken[] = [];
  if (options.packageSource) {
    fromPackage.push(...harvestPackageSource(
      options.packageSource, loadModule, consumerGroupFiles, scannedTokenFiles, brandedCountByFile,
      options.report ?? ((line: string) => console.log(line)),
    ));
  }

  // Sole writer to the canonical registry (Spec 124, R5 AC2), in traversal order so that
  // ComponentTokenRegistry.getAll() (Map-insertion order) feeds generateTokenIndex in the
  // committed `components.yaml` sequence (R6).
  for (const token of harvested) {
    ComponentTokenRegistry.register(token);
  }
  for (const token of fromPackage) {
    packageTokens.add(token);
    ComponentTokenRegistry.register(token);
  }

  // The harvest-zero lint (Spec 123 C11, Req 8): a `tokens.ts` / `*.tokens.ts` file that
  // exported no `defineComponentTokens`-branded value very likely wears the wrong
  // filename — a plain semantic-reference map, not a value-registration file (124's
  // authoring-convention seed, Lina's Q8 call). Reuses the SAME brand signal the harvest
  // above already computed (Req 8.2 — no second detection mechanism). A warning, never an
  // error: `generate` still runs (Req 8.1; Task 5's migration report promises this).
  for (const file of scannedTokenFiles) {
    if ((brandedCountByFile.get(file) ?? 0) === 0) {
      console.warn(harvestZeroWarning(file));
    }
  }

  return ComponentTokenRegistry.getAll();
}

/**
 * A component-token module threw while it loaded — most often `defineComponentTokens`'s
 * own guard (e.g. the family-mismatch guard, #127) rejecting a call at module scope.
 * Carries the FILE, which the guard's message does not name (it names the component), so
 * `generate` can report the file in a catalogued message instead of escaping to the CLI's
 * "Unexpected error" stack trace (`.kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md`).
 * `name` is set explicitly so callers may recognise it without `instanceof`.
 */
export class ComponentTokenFileLoadError extends Error {
  readonly file: string;
  readonly reason: string;
  constructor(file: string, reason: string) {
    super(`component-token file ${file} failed to load: ${reason}`);
    this.name = 'ComponentTokenFileLoadError';
    this.file = file;
    this.reason = reason;
  }
}

/** Load one component-token module; a throw during load is rethrown as {@link ComponentTokenFileLoadError} naming the file. */
function loadTokenModule(loadModule: TsModuleLoader, fullPath: string): unknown {
  try {
    return loadModule(fullPath, __filename);
  } catch (err) {
    throw new ComponentTokenFileLoadError(fullPath, err instanceof Error ? err.message : String(err));
  }
}

/**
 * True for a filename matching the `tokens.ts` / `*.tokens.ts` naming convention the
 * harvest-zero lint (C11, Req 8) targets — the convention 124's authoring-convention seed
 * names as worn by two mechanisms (value-registration files and plain semantic-reference
 * maps).
 */
function isTokenFileName(name: string): boolean {
  return name === 'tokens.ts' || name.endsWith('.tokens.ts');
}

/**
 * The harvest-zero lint's warning message (Spec 123 C11, Req 8).
 *
 * NOTE: design.md's C11 entry is "Unchanged" and carries no exact-string catalog row for
 * this warning (unlike most 123 catalog strings elsewhere in the spec). This wording
 * follows design-outline.md § 4.5's proposed phrasing as closely as an implementation
 * string can: *"this scanned file harvested zero component tokens; if you meant to
 * register values, call `defineComponentTokens`"* (Lina, R1). Flagged for a Thurgood
 * erratum to add the row to design.md's catalog rather than leaving this the sole source
 * of truth for the string.
 */
export function harvestZeroWarning(file: string): string {
  return `⚠️  ${file}: this scanned file harvested zero component tokens; if you meant to register values, call \`defineComponentTokens\`.`;
}

/**
 * Harvest branded `defineComponentTokens` results from a single loaded module's exports.
 *
 * Iterates `Object.values(mod)` (declaration/export order) and, for each export carrying
 * the brand (read via {@link getTokenContract} — direct/`hasOwnProperty`, never key
 * enumeration), appends its rich tokens in authored array order. Dedupe is two-layer:
 * a re-exported alias points at the same object (skipped by `seenObjects` within the
 * module), and a token `name` already harvested from any module is skipped (first-seen
 * wins) so a re-export alias never moves or duplicates an entry.
 */
function harvestModule(
  mod: unknown,
  harvested: RegisteredComponentToken[],
  seenNames: Set<string>,
  file: string,
  brandedCountByFile: Map<string, number>,
  groupFiles?: Map<string, string>,
): void {
  if (mod == null || typeof mod !== 'object') return;

  const seenObjects = new Set<unknown>();
  for (const exported of Object.values(mod as Record<string, unknown>)) {
    if (exported == null || typeof exported !== 'object') continue;
    // Same branded object reachable by two export names (re-export alias): collect once.
    if (seenObjects.has(exported)) continue;

    const tokens = getTokenContract(exported);
    if (!tokens) continue;
    seenObjects.add(exported);

    // Harvest-zero lint instrumentation (Req 8.2): recorded here, per distinct branded
    // object, BEFORE the cross-module name dedupe below — so this file's branded status
    // never depends on whether another module already harvested the same token names.
    brandedCountByFile.set(file, (brandedCountByFile.get(file) ?? 0) + 1);

    for (const token of tokens) {
      if (groupFiles) {
        const declaredIn = groupFiles.get(token.component);
        if (declaredIn === undefined) groupFiles.set(token.component, file);
        else if (path.resolve(declaredIn) !== path.resolve(file)) {
          throw new ComponentTokenGroupDeclaredTwiceError(token.component, declaredIn, file);
        }
      }
      // First-seen-wins across modules (a genuine duplicate name is caught by the
      // registry's conflict throw at write time).
      if (seenNames.has(token.name)) continue;
      seenNames.add(token.name);
      sourceFileByToken.set(token, file);
      harvested.push(token);
    }
  }
}

/**
 * Recursively scan a directory for *.tokens.ts / tokens.ts files, load each through the
 * injected runtime-TS resolution seam, and harvest branded results in scan order.
 */
function scanForTokenFiles(
  dir: string,
  loadModule: TsModuleLoader,
  harvested: RegisteredComponentToken[],
  seenNames: Set<string>,
  scannedTokenFiles: Set<string>,
  brandedCountByFile: Map<string, number>,
  groupFiles?: Map<string, string>,
): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
      scanForTokenFiles(fullPath, loadModule, harvested, seenNames, scannedTokenFiles, brandedCountByFile, groupFiles);
    } else if (entry.isFile() && (entry.name.endsWith('.tokens.ts') || entry.name === 'tokens.ts') && !entry.name.endsWith('.test.ts')) {
      scannedTokenFiles.add(fullPath);
      const mod = loadTokenModule(loadModule, fullPath);
      harvestModule(mod, harvested, seenNames, fullPath, brandedCountByFile, groupFiles);
    }
  }
}

/**
 * The third source (design § 9). Reads each package component directory's token files; keeps
 * the groups no consumer file declares and that sit in a directory that won the union; and
 * prints one line for each group that is not kept.
 */
function harvestPackageSource(
  source: PackageComponentTokenSource,
  loadModule: TsModuleLoader,
  consumerGroupFiles: ReadonlyMap<string, string>,
  scannedTokenFiles: Set<string>,
  brandedCountByFile: Map<string, number>,
  report: (line: string) => void,
): RegisteredComponentToken[] {
  const kept: RegisteredComponentToken[] = [];
  const keptNames = new Set<string>();
  // Group -> the package file that declares it, for the "copied at init" comparison.
  const packageFileOfGroup = new Map<string, string>();

  const scan = (dir: string, winner: boolean): RegisteredComponentToken[] => {
    const found: RegisteredComponentToken[] = [];
    // A loser's files are read to learn its groups; the harvest-zero lint belongs to the
    // winners, whose tokens are emitted.
    scanForTokenFiles(
      dir, loadModule, found, new Set<string>(),
      winner ? scannedTokenFiles : new Set<string>(),
      winner ? brandedCountByFile : new Map<string, number>(),
      new Map<string, string>(),
    );
    for (const t of found) {
      const f = sourceFileByToken.get(t);
      if (f && !packageFileOfGroup.has(t.component)) packageFileOfGroup.set(t.component, f);
    }
    return found;
  };

  const sameBytes = (a: string, b: string): boolean => {
    try { return fs.readFileSync(a).equals(fs.readFileSync(b)); } catch { return false; }
  };
  const replaced = new Set<string>();
  const noteReplaced = (group: string): void => {
    if (replaced.has(group)) return;
    replaced.add(group);
    const theirs = consumerGroupFiles.get(group)!;
    const ours = packageFileOfGroup.get(group);
    report(yoursReplaceMessage(group, ours !== undefined && sameBytes(theirs, ours)));
  };

  for (const w of source.winners) {
    for (const t of scan(w.dirPath, true)) {
      if (consumerGroupFiles.has(t.component)) { noteReplaced(t.component); continue; }
      if (keptNames.has(t.name)) continue;
      keptNames.add(t.name);
      kept.push(t);
    }
  }
  const notEmitted = new Set<string>();
  for (const l of source.losers) {
    for (const t of scan(l.source.dirPath, false)) {
      if (consumerGroupFiles.has(t.component)) { noteReplaced(t.component); continue; }
      if (notEmitted.has(t.component)) continue;
      notEmitted.add(t.component);
      report(notEmittedMessage(t.component, l.source.declaredName));
    }
  }
  return kept;
}
