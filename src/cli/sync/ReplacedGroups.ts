/**
 * The missing-key report (Spec 129 Req 5.11): a consumer's component-token group replaces
 * DesignerPunk's whole group (design § 9: `generate` emits a package group only when no consumer
 * source declares it), so a shipped component that reads a key the consumer's group lacks reads
 * nothing on iOS and Android. REPORT ONLY: nothing here writes.
 */
import * as path from 'path';
import type { ComponentSource } from '../shared/componentSources';
import type { PackageComponentTokenIndex } from '../shared/packageComponentTokens';

export interface ReplacedGroupGap {
  /** The group (the entry's `component`) the consumer declares. */
  group: string;
  /** The shipped component that defines and reads the key. */
  component: string;
  /** The token name their group lacks. */
  key: string;
}

/**
 * Entries of the installed package's index that belong to a group a consumer source declares,
 * whose key the consumer's own source does not define, and whose defining component is a winner of the
 * package's rank (a consumer component of the same name replaces ours, and then reads its own tokens).
 * Pure: no file is read. Sorted by group, then key.
 */
export function findReplacedGroupGaps(
  pkg: PackageComponentTokenIndex,
  universe: { roots: string[]; winners: ComponentSource[] },
  ownTokenNames: ReadonlySet<string>,
  ownGroups: ReadonlySet<string>,
): ReplacedGroupGap[] {
  const packageRank = universe.roots.indexOf(path.resolve(pkg.componentsRoot));
  if (packageRank < 0) return [];
  const packageWinners = new Set(universe.winners.filter(w => w.rank === packageRank).map(w => w.declaredName));
  const out: ReplacedGroupGap[] = [];
  for (const [key, entry] of Object.entries(pkg.tokens)) {
    if (!entry || typeof entry !== 'object' || !entry.platforms || typeof entry.platforms !== 'object') continue;
    if (typeof entry.component !== 'string' || !ownGroups.has(entry.component)) continue;
    if (ownTokenNames.has(key)) continue;
    const definedBy = typeof entry.definedBy === 'string' ? entry.definedBy : undefined;
    if (!definedBy || !packageWinners.has(definedBy)) continue;
    out.push({ group: entry.component, component: definedBy, key });
  }
  return out.sort((a, b) => a.group.localeCompare(b.group) || a.key.localeCompare(b.key));
}

export function replacedGroupGapMessage(group: string, component: string, keys: readonly string[]): string {
  const shown = keys.slice(0, 5).join(', ') + (keys.length > 5 ? `, and ${keys.length - 5} more` : '');
  return (
    `component tokens: your ${group} group replaces DesignerPunk's, and ${component} reads ${keys.length === 1 ? 'a key' : `${keys.length} keys`} it lacks (${shown}). ` +
    `${component} has no value for ${keys.length === 1 ? 'it' : 'them'} in your generated iOS and Android output. ` +
    `Add ${keys.length === 1 ? 'the key' : 'the keys'} to your ${group} group, or remove your group to take ours.`
  );
}

export function replacedGroupGapLines(gaps: readonly ReplacedGroupGap[]): string[] {
  const byPair = new Map<string, { group: string; component: string; keys: string[] }>();
  for (const g of gaps) {
    const k = `${g.group}\u0000${g.component}`;
    if (!byPair.has(k)) byPair.set(k, { group: g.group, component: g.component, keys: [] });
    byPair.get(k)!.keys.push(g.key);
  }
  return Array.from(byPair.values()).map(p => replacedGroupGapMessage(p.group, p.component, p.keys));
}
