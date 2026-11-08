/**
 * The theme-source resolver (Spec 129 U9, design § 10 "The built-in theme bridge, keyed on registration").
 *
 * Decides, for each of DesignerPunk's three built-in override maps (`dark`, `wcag` light and `wcag` dark),
 * where the map `generate` applies comes from:
 *
 * - **registered** in the config (`dark` by name; `wcag` by name, its plain map the light half and its
 *   `{ light, dark }` form both halves): the adopter's own map, whatever file it came from. A registered
 *   entry whose map is missing fails, naming the file the copy would hold.
 * - **not registered**, local mode: the installed package's built-in map, read at run time through the token set
 *   (never by a static import), with a warning naming the config line that would make it the adopter's own.
 *   This is the bridge, until the next major release.
 * - **package mode** (no `tokenSource`): the package's built-in map, no warning.
 *
 * Registration, not file presence, decides: an unregistered copy on disk does not change output.
 */

import { createHash } from 'crypto';
import type { ConfigTheme, ThemeOverridePair } from '../config/defineConfig';
import type { SemanticOverrideMap } from '../tokens/themes/types';
import type { BuiltinThemeDir, TokenSet } from '../generators/TokenSet';
import {
  BUILTIN_THEME_REGISTRATION_LINES,
  registeredThemeMapMissingMessage,
  unregisteredBuiltinThemeWarning,
} from '../cli/shared/errorCatalog';

/** The three built-in maps, by role. */
export type BuiltinThemeRole = 'dark' | 'wcagLight' | 'wcagDark';

const ROLES: ReadonlyArray<{ role: BuiltinThemeRole; dir: BuiltinThemeDir; theme: string; mode: string }> = [
  { role: 'dark', dir: 'dark', theme: 'dark', mode: 'dark' },
  { role: 'wcagLight', dir: 'wcag', theme: 'wcag', mode: 'light' },
  { role: 'wcagDark', dir: 'dark-wcag', theme: 'wcag', mode: 'dark' },
];

/** Where a role's map came from. */
export type ThemeMapOrigin = 'registered' | 'bridge' | 'package';

export interface ResolvedBuiltinMap {
  role: BuiltinThemeRole;
  map: SemanticOverrideMap;
  origin: ThemeMapOrigin;
}

export interface ResolvedThemeMaps {
  dark: SemanticOverrideMap;
  wcagLight: SemanticOverrideMap;
  wcagDark: SemanticOverrideMap;
  origins: Record<BuiltinThemeRole, ThemeMapOrigin>;
  /** The bridge warning for each unregistered map (local mode), in role order. Empty in package mode. */
  warnings: string[];
  /** For each registered map, how many of its values differ from the package's built-in (`null` when the package's copy cannot be read). */
  differences: Array<{ role: BuiltinThemeRole; theme: string; mode: string; differing: number | null; digest: string }>;
}

export interface ResolveThemeMapsOptions {
  /** True when the config names a `tokenSource` (local mode); false in package mode. */
  local: boolean;
  /** The token source root, for naming the file a missing registered map would live in. */
  tokenSourceRoot: string;
  /** The installed `@3fn/core` version, for the warning. */
  coreVersion: string;
}

export function isThemePair(overrides: unknown): overrides is ThemeOverridePair {
  if (!overrides || typeof overrides !== 'object') return false;
  const keys = Object.keys(overrides);
  return keys.length > 0 && keys.every((k) => k === 'light' || k === 'dark') && keys.includes('light') && keys.includes('dark');
}

function isMap(value: unknown): value is SemanticOverrideMap {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/** How many entries of `registered` differ from `builtin`: a key on one side only, or a different definition. */
export function countDifferingOverrides(registered: SemanticOverrideMap, builtin: SemanticOverrideMap): number {
  const keys = new Set([...Object.keys(registered), ...Object.keys(builtin)]);
  let differing = 0;
  for (const key of keys) {
    if (JSON.stringify(registered[key] ?? null) !== JSON.stringify(builtin[key] ?? null)) differing++;
  }
  return differing;
}

/** The registered map for `role`, or `undefined` when the config does not register it. Throws when it is registered and missing. */
function registeredMap(themes: ReadonlyArray<ConfigTheme>, role: BuiltinThemeRole, dir: BuiltinThemeDir, tokenSourceRoot: string): SemanticOverrideMap | undefined {
  const name = role === 'dark' ? 'dark' : 'wcag';
  const entry = themes.find((t) => t.name === name);
  if (!entry) return undefined;
  const expectedFile = `${tokenSourceRoot}/themes/${dir}/SemanticOverrides.ts`;
  const overrides = entry.overrides as unknown;
  if (isThemePair(overrides)) {
    const half = role === 'wcagDark' ? overrides.dark : role === 'wcagLight' ? overrides.light : overrides.dark;
    if (!isMap(half)) throw new Error(registeredThemeMapMissingMessage(name, role === 'wcagDark' ? 'dark' : 'light', expectedFile));
    return half;
  }
  // The plain form is one map: for `dark` the dark map, for `wcag` the light half; the wcag dark half is then not registered.
  if (role === 'wcagDark') return undefined;
  if (!isMap(overrides)) throw new Error(registeredThemeMapMissingMessage(name, role === 'dark' ? 'dark' : 'light', expectedFile));
  return overrides;
}

export function resolveThemeMaps(
  themes: ReadonlyArray<ConfigTheme>,
  tokenSet: TokenSet,
  options: ResolveThemeMapsOptions,
): ResolvedThemeMaps {
  const resolved = {} as Record<BuiltinThemeRole, SemanticOverrideMap>;
  const origins = {} as Record<BuiltinThemeRole, ThemeMapOrigin>;
  const warnings: string[] = [];
  const differences: ResolvedThemeMaps['differences'] = [];

  for (const { role, dir, theme, mode } of ROLES) {
    const registered = registeredMap(themes, role, dir, options.tokenSourceRoot);
    if (registered) {
      resolved[role] = registered;
      origins[role] = 'registered';
      let differing: number | null;
      try {
        differing = countDifferingOverrides(registered, tokenSet.builtinTheme(dir));
      } catch {
        differing = null; // the package's own copy is not there to compare with
      }
      differences.push({ role, theme, mode, differing, digest: createHash('sha256').update(JSON.stringify(registered)).digest('hex').slice(0, 12) });
      continue;
    }
    resolved[role] = tokenSet.builtinTheme(dir);
    if (options.local) {
      origins[role] = 'bridge';
      warnings.push(unregisteredBuiltinThemeWarning(theme, mode, options.coreVersion, BUILTIN_THEME_REGISTRATION_LINES[role]));
    } else {
      origins[role] = 'package';
    }
  }

  return { ...resolved, origins, warnings, differences };
}
