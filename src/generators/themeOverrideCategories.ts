/**
 * The colour-only rule for theme override maps (P1 record 2026-11-08-non-colour-theme-override-accepted-not-applied;
 * Peter, 2026-11-08T15:12:38Z: `generate` refuses a non-colour key in any theme override map).
 *
 * `categoryOf` returns a semantic token's category, or `undefined` for a name that is not a semantic token (that is the
 * orphan-key check's, not this one's). Every offending key in every registered theme's maps is returned: `dark`, `wcag`
 * or a custom theme; the plain map or either half of the `{ light, dark }` form.
 */

import type { ConfigTheme } from '../config/defineConfig';
import { isThemePair } from '../themes/resolveThemeMaps';
import { nonColourOverrideKeyMessage } from '../cli/shared/errorCatalog';

export interface NonColourOverrideKey {
  /** The index of the config entry. */
  entry: number;
  message: string;
}

export function findNonColourOverrideKeys(
  themes: ReadonlyArray<ConfigTheme>,
  categoryOf: (key: string) => string | undefined,
): NonColourOverrideKey[] {
  const out: NonColourOverrideKey[] = [];
  themes.forEach((t, i) => {
    const overrides = t?.overrides as unknown;
    if (!overrides || typeof overrides !== 'object') return;
    const maps: Array<[string, Record<string, unknown>]> = isThemePair(overrides)
      ? [['overrides.light', overrides.light ?? {}], ['overrides.dark', overrides.dark ?? {}]]
      : [['overrides', overrides as Record<string, unknown>]];
    const where = `designerpunk.config.ts themes[${i}] (name: ${JSON.stringify(t.name)})`;
    for (const [mapName, map] of maps) {
      for (const key of Object.keys(map ?? {})) {
        const category = categoryOf(key);
        if (category !== undefined && category !== 'color') {
          out.push({ entry: i, message: nonColourOverrideKeyMessage(where, `\`${mapName}\``, key) });
        }
      }
    }
  });
  return out;
}

/** The failure `generate` prints: every offending key, then what to do. */
export function nonColourOverrideMessage(found: ReadonlyArray<NonColourOverrideKey>): string {
  return (
    'generate: designerpunk.config.ts has a theme override map that holds a token that is not a colour:\n' +
    found.map((f) => `  ${f.message}`).join('\n') +
    '\nRemove the key and run generate again. Nothing was written.'
  );
}
