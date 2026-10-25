/**
 * DesignerPunk's own component tokens in a consumer's token index (shape (c),
 * `.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`; Peter's ruling of
 * 2026-10-25).
 *
 * The package does not ship its component-token source files (`files` ships only the component
 * YAML), so a consumer's `generate` cannot harvest them. It ships its own token index instead,
 * whose `components.yaml` entries carry each token's references, platform names and the
 * component that defines it (`definedBy`). This module reads that index for `generate`, which
 * merges the entries of every package component the consumer has not replaced
 * ({@link mergePackageComponentTokens}, applied by `src/generators/generateTokenIndex.ts`), each tagged with the
 * package version it came from. And it tells `sync` when the consumer's index is behind the
 * installed package — the second source of truth this shape accepts, made detectable.
 *
 * Not imported by `./mcpDataRoots` and not in the `build:mcp-shared` bundle: it needs `js-yaml`.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { resolveComponentSources } from './componentSources';
import type { ComponentSource } from './componentSources';

/**
 * The installed package's shipped component-token index, as `generate` reads it in a
 * consumer repo ({@link readPackageComponentTokenIndex}).
 */
export interface PackageComponentTokenIndex {
  /** The package's name and version, from its own `package.json`. */
  name: string;
  version: string;
  /** The package's component root, `<package>/src/components/core` — one root of the universe. */
  componentsRoot: string;
  /** The shipped `components.yaml` `tokens:` map, in its file order. */
  tokens: Record<string, Record<string, unknown>>;
}

/**
 * The tag a merged entry carries: where it came from. Only merged entries carry it, so an
 * entry without it was generated from this repo's own token source.
 */
export interface PackageEntrySource {
  package: string;
  version: string;
}

/**
 * Which of the package's shipped component-token entries a consumer's index takes (shape (c)).
 *
 * An entry is merged when the package component that DEFINES it (`definedBy`, written by the
 * package's own build) is a winner of this universe — `resolveComponentSources`' same-name
 * precedence, so a consumer component that declares the same name replaces the package's and
 * its tokens are not merged — and the consumer's own token source has no token of that name
 * (yours wins on the same key). An entry with no `definedBy` (the token-source tier, e.g. the
 * Progress tokens `init` copies) is never merged: that tier is the consumer's.
 *
 * Returned in the shipped file's order. Pure: no file is read.
 * @internal Exported for testing.
 */
export function mergePackageComponentTokens(
  pkg: PackageComponentTokenIndex,
  universe: { roots: string[]; winners: ComponentSource[] },
  ownTokenNames: ReadonlySet<string>,
): Array<{ name: string; entry: Record<string, unknown>; definedBy: string }> {
  const packageRank = universe.roots.indexOf(path.resolve(pkg.componentsRoot));
  if (packageRank < 0) return [];
  const packageWinners = new Set(universe.winners.filter(w => w.rank === packageRank).map(w => w.declaredName));
  const out: Array<{ name: string; entry: Record<string, unknown>; definedBy: string }> = [];
  for (const [name, entry] of Object.entries(pkg.tokens)) {
    // An entry with no platform names is not one the package's build writes: skipped, not guessed at.
    if (!entry || typeof entry !== 'object' || !entry.platforms || typeof entry.platforms !== 'object') continue;
    if (ownTokenNames.has(name)) continue;
    const definedBy = typeof entry.definedBy === 'string' ? entry.definedBy : undefined;
    if (!definedBy || !packageWinners.has(definedBy)) continue;
    out.push({ name, entry, definedBy });
  }
  return out;
}

/** Where the package's own index sits, relative to the package root. */
export const PACKAGE_COMPONENT_TOKEN_INDEX_REL = 'token-index/components.yaml';

/** Read a `components.yaml` `tokens:` map; throws on an unreadable or malformed file. */
function readTokensMap(file: string): Record<string, Record<string, unknown>> {
  const doc = yaml.load(fs.readFileSync(file, 'utf-8')) as { tokens?: unknown } | null;
  const tokens = doc?.tokens;
  if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) {
    throw new Error('it has no tokens map');
  }
  return tokens as Record<string, Record<string, unknown>>;
}

/**
 * The installed package's shipped component-token index, for `generate`'s merge. `null` with
 * a reason when it cannot be read (a damaged install): `generate` then says so and indexes only
 * the repo's own component tokens.
 */
export function readPackageComponentTokenIndex(
  packageRoot: string,
): { index: PackageComponentTokenIndex; reason?: undefined } | { index: null; reason: string } {
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf-8')) as { name?: unknown; version?: unknown };
    if (typeof pkgJson.name !== 'string' || typeof pkgJson.version !== 'string') {
      return { index: null, reason: 'its package.json has no name or version' };
    }
    return {
      index: {
        name: pkgJson.name,
        version: pkgJson.version,
        componentsRoot: path.resolve(packageRoot, 'src', 'components', 'core'),
        tokens: readTokensMap(path.join(packageRoot, PACKAGE_COMPONENT_TOKEN_INDEX_REL)),
      },
    };
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    if (e && e.code === 'ENOENT' && typeof e.path === 'string') {
      return { index: null, reason: `${path.relative(packageRoot, e.path).split(path.sep).join('/')} is not there` };
    }
    return { index: null, reason: err instanceof Error ? err.message.split('\n', 1)[0] : String(err) };
  }
}

/** What `sync` found in the consumer's index against the installed package. */
export type IndexedPackageTokensAssessment =
  /** No `token-index/components.yaml`: `generate` has not run here, so there is nothing to judge. */
  | { state: 'no-index' }
  /** The index or the package's own index could not be read. */
  | { state: 'cannot-check'; reason: string }
  /** Every entry the installed package would merge is there, tagged with the installed version. */
  | { state: 'current' }
  /**
   * Behind the installed package. `indexedVersions`: the other versions the merged entries are
   * tagged with (empty when none is tagged, an index written before 16.1.0). `missing`: entries
   * the installed package would merge that the index does not hold; `example` is one of them,
   * or one stale-tagged entry.
   */
  | { state: 'stale'; packageName: string; installedVersion: string; indexedVersions: string[]; missing: number; example: string };

/**
 * Is the consumer's token index behind the installed package's component tokens? It is when a
 * merged entry carries another version's tag, or when an entry the installed package would
 * merge (by the same rule `generate` applies, over the same universe) is absent. Both mean a
 * package upgrade without a new `generate`; the remedy is the same one-command rebuild.
 */
export function assessIndexedPackageComponentTokens(opts: {
  /** The consumer's `token-index/` directory. */
  tokenIndexDir: string;
  /** The installed package's root. */
  packageRoot: string;
  /** The component root set (`resolveComponentRoots(...).roots`), consumer first. */
  componentRoots: string[];
}): IndexedPackageTokensAssessment {
  const indexFile = path.join(opts.tokenIndexDir, 'components.yaml');
  if (!fs.existsSync(indexFile)) return { state: 'no-index' };
  let indexed: Record<string, Record<string, unknown>>;
  try {
    indexed = readTokensMap(indexFile);
  } catch (err) {
    return { state: 'cannot-check', reason: `${indexFile}: ${err instanceof Error ? err.message.split('\n', 1)[0] : String(err)}` };
  }
  const shipped = readPackageComponentTokenIndex(opts.packageRoot);
  if (!shipped.index) return { state: 'cannot-check', reason: `the installed package's ${PACKAGE_COMPONENT_TOKEN_INDEX_REL}: ${shipped.reason}` };
  const installedVersion = shipped.index.version;

  const tagOf = (entry: Record<string, unknown>): { package?: unknown; version?: unknown } | null => {
    const source = entry?.source;
    return source && typeof source === 'object' ? (source as { package?: unknown; version?: unknown }) : null;
  };
  const own = new Set(Object.keys(indexed).filter(name => !tagOf(indexed[name])));
  const staleTagged = Object.keys(indexed).filter(name => {
    const tag = tagOf(indexed[name]);
    return tag !== null && tag.version !== installedVersion;
  });
  const indexedVersions = Array.from(new Set(staleTagged.map(name => String(tagOf(indexed[name])!.version)))).sort();

  const expected = mergePackageComponentTokens(shipped.index, resolveComponentSources(opts.componentRoots), own);
  const missing = expected.filter(m => {
    const entry = indexed[m.name];
    return !entry || tagOf(entry)?.version !== installedVersion;
  }).filter(m => !staleTagged.includes(m.name));

  if (staleTagged.length === 0 && missing.length === 0) return { state: 'current' };
  return {
    state: 'stale',
    packageName: shipped.index.name,
    installedVersion,
    indexedVersions,
    missing: missing.length,
    example: staleTagged[0] ?? missing[0].name,
  };
}
