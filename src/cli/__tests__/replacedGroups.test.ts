/**
 * @purpose Spec 129 Req 5.11: the missing-key report. When a consumer's group replaces DesignerPunk's and a
 * shipped component reads a key their group lacks, `sync` names the key and the component.
 * Exercises src/cli/sync/ReplacedGroups.ts (pure; no file is read).
 */
import * as path from 'path';
import { findReplacedGroupGaps, replacedGroupGapLines } from '../sync/ReplacedGroups';
import type { PackageComponentTokenIndex } from '../shared/packageComponentTokens';
import type { ComponentSource } from '../shared/componentSources';

const root = path.resolve('/pkg/src/components/core');
const entry = (component: string, definedBy: string) => ({ component, definedBy, platforms: { ios: { name: 'x' } } });
const pkg: PackageComponentTokenIndex = {
  name: '@3fn/core',
  version: '16.2.0',
  componentsRoot: root,
  tokens: {
    'avatar.size.md': entry('Avatar', 'Avatar-Base'),
    'avatar.size.lg': entry('Avatar', 'Avatar-Base'),
    'avatar.icon.size.xs': entry('Avatar', 'Avatar-Base'),
    'badge.label.maxWidth': entry('BadgeLabelBase', 'Badge-Label-Base'),
    'nodefinedby.x': { component: 'Avatar', platforms: { ios: { name: 'x' } } },
  },
};
const winners = (names: string[]): ComponentSource[] => names.map(declaredName => ({ declaredName, rank: 0 } as unknown as ComponentSource));
const universe = (names: string[]) => ({ roots: [root], winners: winners(names) });

describe('findReplacedGroupGaps (Req 5.11)', () => {
  test('names each key their group lacks, with the component that reads it', () => {
    const gaps = findReplacedGroupGaps(pkg, universe(['Avatar-Base', 'Badge-Label-Base']), new Set(['avatar.size.md']), new Set(['Avatar']));
    expect(gaps).toEqual([
      { group: 'Avatar', component: 'Avatar-Base', key: 'avatar.icon.size.xs' },
      { group: 'Avatar', component: 'Avatar-Base', key: 'avatar.size.lg' },
    ]);
    const [line] = replacedGroupGapLines(gaps);
    expect(line).toContain('your Avatar group replaces DesignerPunk\'s');
    expect(line).toContain('Avatar-Base reads 2 keys it lacks (avatar.icon.size.xs, avatar.size.lg)');
  });

  test('a group they do not declare, a key they define, and a component they replaced are not reported', () => {
    expect(findReplacedGroupGaps(pkg, universe(['Avatar-Base']), new Set(), new Set())).toEqual([]);
    expect(findReplacedGroupGaps(pkg, universe(['Avatar-Base']), new Set(['avatar.size.md', 'avatar.size.lg', 'avatar.icon.size.xs']), new Set(['Avatar']))).toEqual([]);
    expect(findReplacedGroupGaps(pkg, universe([]), new Set(), new Set(['Avatar']))).toEqual([]);
  });

  test('a package whose components root is not in the universe reports nothing', () => {
    expect(findReplacedGroupGaps(pkg, { roots: [], winners: [] }, new Set(), new Set(['Avatar']))).toEqual([]);
  });
});
