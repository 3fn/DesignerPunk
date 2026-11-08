/**
 * The theme-instance rule's refusals (Spec 129 U9, design § 4, item 5 (a)-(h), "Where the refusals land").
 *
 * `generate` refuses a config, naming the entry, when a registered theme could not become an instance and a
 * family case on both native platforms. Each refusal was measured first under Req 10.4, against the configs
 * the work can read (`.kiro/specs/129-consumer-generation-completeness/completion/task-14-completion.md`
 * § "The refusals, measured"); every one ships as a `generate` failure, because no supported config trips it.
 * An independent copy of the same rules lives in `scripts/harness/native-rules.ts` (Thurgood's), which checks
 * the harness's own consumer config; the two are compared by `native-rules-emitter.test.ts`.
 */

import type { ConfigTheme } from '../config/defineConfig';
import { isThemePair } from './resolveThemeMaps';

export type ThemeRefusalRule = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface ThemeRefusal {
  rule: ThemeRefusalRule;
  /** The index of the config entry the refusal names. */
  entry: number;
  message: string;
}

const upperFirst = (s: string): string => (s.length === 0 ? s : s[0].toUpperCase() + s.slice(1));
const lowerFirst = (s: string): string => (s.length === 0 ? s : s[0].toLowerCase() + s.slice(1));
const words = (name: string): string[] => name.split(/[-_]/);
const pascal = (name: string): string => words(name).map(upperFirst).join('');
const squash = (name: string): string => name.toLowerCase().replace(/[-_]/g, '');
const RESERVED = new Set(['base', 'dark', 'wcag']);

/** Item 5 (a): why `name` is not an identifier on both platforms, or `null`. */
function nameFault(name: unknown): string | null {
  if (typeof name !== 'string' || name.length === 0) return 'the theme name is empty';
  if (/[^A-Za-z0-9_-]/.test(name)) return 'the theme name has a character other than an ASCII letter, a digit, "-" or "_"';
  if (words(name).some((w) => w.length === 0)) return 'the theme name has an empty word (a leading, trailing or doubled "-" or "_")';
  if (/^[0-9]/.test(words(name)[0])) return 'the theme name\'s first word begins with a digit';
  return null;
}

const label = (index: number, theme: ConfigTheme): string =>
  `designerpunk.config.ts themes[${index}] (name: ${JSON.stringify(theme?.name)})`;

/** Every refusal that holds, in entry order and, within an entry, in rule order. Rules (d), (e) and (h) need a well-formed name. */
export function findThemeRefusals(themes: ReadonlyArray<ConfigTheme>): ThemeRefusal[] {
  const out: ThemeRefusal[] = [];
  const seenName = new Map<string, number>();
  const seenPascal = new Map<string, number>();
  themes.forEach((t, i) => {
    const add = (rule: ThemeRefusalRule, message: string): void => {
      out.push({ rule, entry: i, message: `${label(i, t)}: ${message}` });
    };
    const pair = isThemePair(t.overrides);
    const faultA = nameFault(t.name);
    if (faultA !== null) add('a', faultA);
    if (t.name === 'base') add('b', 'a theme is named "base"; the base theme is never registered');
    if (t.name === 'dark' && (pair || t.mode !== 'dark')) {
      add('c', '"dark" must be registered with mode "dark" only, and not in the { light, dark } form');
    }
    if (faultA === null && !RESERVED.has(t.name) && RESERVED.has(squash(t.name))) {
      add('d', `the name matches "${squash(t.name)}" when letter case and separators are ignored, but is not spelled exactly that way`);
    }
    if (faultA === null && !RESERVED.has(t.name)) {
      const key = pascal(t.name).toLowerCase();
      const prior = seenPascal.get(key);
      if (prior !== undefined) {
        add('e', `its name gives the same Pascal name as ${label(prior, themes[prior])} when letter case is ignored`);
      } else {
        seenPascal.set(key, i);
      }
    }
    const first = seenName.get(t.name);
    if (first !== undefined) add('f', `the name is already registered at ${label(first, themes[first])}`);
    else seenName.set(t.name, i);
    if (t.mode !== 'light' && t.mode !== 'dark' && t.mode !== 'both') {
      add('g', `the mode ${t.mode === undefined ? '(absent)' : JSON.stringify(t.mode)} is not "light", "dark" or "both"`);
    } else if (pair && t.mode !== 'both') {
      add('g', `the { light, dark } form gives two maps, and the mode ${JSON.stringify(t.mode)} says one; use mode "both"`);
    }
    if (faultA === null && !RESERVED.has(t.name)) {
      const swiftCase = lowerFirst(pascal(t.name));
      if (swiftCase === 'self' || swiftCase === 'init' || swiftCase === 'allCases') {
        add('h', `the Swift family case would be "${swiftCase}", which a use of the family then reads as something else`);
      }
    }
  });
  return out;
}

/** The failure `generate` prints when any refusal holds: every refusal, then what to do. */
export function themeRefusalMessage(refusals: ReadonlyArray<ThemeRefusal>): string {
  return (
    `generate: designerpunk.config.ts registers ${refusals.length === 1 ? 'a theme' : 'themes'} that cannot be emitted:\n` +
    refusals.map((r) => `  (${r.rule}) ${r.message}`).join('\n') +
    '\nFix the entry (or remove it) and run generate again. Nothing was written.'
  );
}
