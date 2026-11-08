/**
 * The third source of the component-token harvest, resolved from the component union
 * (Spec 129 U8, design § 9). Shared by `generate` and by the freshness check, so both read
 * the same package directories.
 */
import * as fs from 'fs';
import * as path from 'path';
import { resolveComponentSources } from './shared/componentSources';
import type { PackageComponentTokenSource } from './loadComponentTokens';

export type PackageComponentSourceResult =
  /** Not a consumer repo (the package root is the design-system root): no third source. */
  | { state: 'own-repo' }
  /** The installed package has no component directory to read. */
  | { state: 'damaged'; reason: string }
  | { state: 'ready'; source: PackageComponentTokenSource };

/**
 * @param componentRoots The component root set the token index reads (`resolveGenerateComponentRoots`).
 * @param packageRoot    The installed package's root.
 * @param generateRoot   The design-system root `generate` runs in.
 */
export function resolvePackageComponentSource(
  componentRoots: string[],
  packageRoot: string,
  generateRoot: string,
): PackageComponentSourceResult {
  if (path.resolve(packageRoot) === path.resolve(generateRoot)) return { state: 'own-repo' };
  const componentsRoot = path.resolve(packageRoot, 'src', 'components', 'core');
  if (!fs.existsSync(componentsRoot)) return { state: 'damaged', reason: 'src/components/core is not there' };
  const universe = resolveComponentSources(componentRoots);
  const packageRank = universe.roots.indexOf(componentsRoot);
  if (packageRank < 0) return { state: 'damaged', reason: 'src/components/core is not in the component root set' };
  let name = '@3fn/core';
  let version = '';
  try {
    const j = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf-8')) as { name?: string; version?: string };
    name = j.name ?? name;
    version = j.version ?? '';
  } catch { /* the version is only for the index tag */ }
  return {
    state: 'ready',
    source: {
      name,
      version,
      winners: universe.winners.filter(w => w.rank === packageRank),
      losers: universe.shadowed.filter(s => s.source.rank === packageRank),
    },
  };
}
