/**
 * native-rules — the compile harness's independent copy of the native theme and product-token
 * rules (Spec 129 Task 5.4; design.md § 4, "The shared harness module"). Owner: Thurgood.
 *
 * WRITTEN FROM THE DESIGN TEXT, NOT FROM THE GENERATOR OR THE PROBES. Every rule below is
 * taken from the sentences of `.kiro/specs/129-consumer-generation-completeness/design.md` § 4
 * at the anchors named on each section. The author did not read `src/generators/**`,
 * `probe-swift.ts` or `probe-kotlin.ts` while writing it: the module is worth having only as a
 * second statement of the rules, so that Task 11's comparison test
 * (`__tests__/native-rules-emitter.test.ts`) and the per-run instance check can find a drift
 * between this copy and the generator's. Where the design is silent or ambiguous the code says
 * `DESIGN-GAP:` and does the plainest thing; Ada answers each gap, and the answer changes the
 * design text first and this file second.
 *
 * Contract:
 *   - Pure functions. No I/O, no clock, no environment, no `fs`, no YAML parsing: a caller reads
 *     files and passes the parsed documents in.
 *   - The generator never imports this module, and nothing under `src/` imports
 *     `scripts/harness/` (design § 4; Conventions). `probe-swift.ts` and `probe-kotlin.ts`
 *     import it and keep no local copy of any rule here.
 *
 * Anchors (design.md § 4):
 *   - "Q12, theme names: option (a), fixed binding names"      -> BINDING, holderName, ...
 *   - "The theme family (6(b))" and "Selection"                -> familyCases, selectInstance
 *   - "The single-mode rule: a theme of one mode falls back to base" -> selectInstance
 *   - "The theme-instance rule", items 1-4                     -> instances, instanceNames
 *   - "The theme-instance rule", item 5 (a)-(h)                -> checkThemeConfig,
 *                                                                 checkHarnessConsumerConfig
 *   - "Product-token names and access" ("What `generate` reads", "The names",
 *     "The access rule from U6", "The harness's keys for them") -> the product* functions
 *
 * The module encodes the rules from U6 (and, for a registered custom theme, from U9), not the
 * generator's behaviour before them. Where today's generated code differs, that difference is a
 * tagged entry on a token list, not a change here (design § 4, "The shared harness module
 * encodes the rule from U6").
 */

export type NativePlatform = 'ios' | 'android';
export type Scheme = 'light' | 'dark';

// =============================================================================================
// The fixed binding names (design § 4, "Q12" and "The shared harness module")
// =============================================================================================

/** The binding is DesignerPunk's, whatever the consumer's `name` or `abbreviation`. */
export const BINDING = {
  swift: {
    themeProtocol: 'DesignerPunkTheme',
    environmentKeyType: 'DPThemeKey',
    environmentMember: 'dpTheme',
    /** The key path as written in a `.environment(...)` call. */
    keyPath: '\\.dpTheme',
  },
  kotlin: {
    themeClass: 'DesignerPunkTheme',
    local: 'LocalDPTheme',
    themePackage: 'com.designerpunk.tokens',
    productPackage: 'com.designerpunk.product.tokens',
  },
} as const;

/**
 * The product files as `generate` writes them under the platform output folder, and the `gen:`
 * path they are keyed by in the harness consumer, whose platform output folders are the
 * config's `output` ("The harness's keys for them"): `gen:product/ProductTokens.ios.swift`, not
 * `gen:ProductTokens.<ext>`.
 */
export const PRODUCT_FILE: Readonly<Record<NativePlatform, string>> = {
  ios: 'ProductTokens.ios.swift',
  android: 'ProductTokens.android.kt',
};
export const PRODUCT_GEN_PATH: Readonly<Record<NativePlatform, string>> = {
  ios: 'product/ProductTokens.ios.swift',
  android: 'product/ProductTokens.android.kt',
};
/** The key root a diagnostic in the product file carries: `gen:product/ProductTokens.<ext>`. */
export const productGenKeyRoot = (platform: NativePlatform): string => `gen:${PRODUCT_GEN_PATH[platform]}`;

// =============================================================================================
// Themes: words and names (item 4)
// =============================================================================================

/**
 * One registered theme as the harness consumer's manifest gives it. `mode` is the entry's
 * `mode` field. `pair: true` marks the `{ light, dark }` registration form (design § 10), which
 * covers both modes.
 *
 * DESIGN-GAP: does an entry in the `{ light, dark }` form also carry a `mode`, and does
 * refusal (g) read it? The design says the form "adds both" modes (item 3) and that `dark` is
 * refused in it (item 5 (c)); it does not say what `mode` such an entry has. This module reads
 * `mode` only when `pair` is not true.
 */
export interface ThemeEntry {
  name: string;
  mode?: string;
  pair?: boolean;
}

const upperFirst = (s: string): string => (s.length === 0 ? s : s[0].toUpperCase() + s.slice(1));
const lowerFirst = (s: string): string => (s.length === 0 ? s : s[0].toLowerCase() + s.slice(1));

/** The theme name split at every `-` and `_` (item 4). Empty words are kept, so a refusal can see them. */
export function themeWords(name: string): string[] {
  return name.split(/[-_]/);
}

/** Pascal: the first letter of every word upper-cased, every other letter as written (item 4). */
export function pascalName(words: readonly string[]): string {
  return words.map(upperFirst).join('');
}

/** Lower-camel: the first word's first letter lower-cased, each later word's upper-cased (item 4). */
export function lowerCamelName(words: readonly string[]): string {
  return words.map((w, i) => (i === 0 ? lowerFirst(w) : upperFirst(w))).join('');
}

const nameFor = (words: readonly string[], platform: NativePlatform): string =>
  platform === 'ios' ? lowerCamelName(words) : pascalName(words);

const MODE_SUFFIX: Readonly<Record<Scheme, string>> = { light: 'Light', dark: 'Dark' };

/** Which modes an entry covers (item 3): `both` and the `{ light, dark }` form cover both. */
export function coveredModes(t: ThemeEntry): Readonly<Record<Scheme, boolean>> {
  if (t.pair === true) return { light: true, dark: true };
  if (t.mode === 'both') return { light: true, dark: true };
  if (t.mode === 'light') return { light: true, dark: false };
  if (t.mode === 'dark') return { light: false, dark: true };
  return { light: false, dark: false };
}

// =============================================================================================
// The theme-instance rule, items 1-4
// =============================================================================================

export interface ThemeInstance {
  /** The theme's words: `['base']`, `['wcag']`, or the split registered name. */
  words: readonly string[];
  scheme: Scheme;
}

const isReservedExact = (name: string): boolean => name === 'base' || name === 'dark' || name === 'wcag';

/**
 * The registered themes that add instances and family cases of their own: every one except the
 * three reserved names (item 2). `base` is never registered (a refusal, item 5 (b)); `dark` is
 * not a theme; `wcag` adds no instance beyond the four fixed ones. Config order is kept.
 */
export function otherThemes(themes: readonly ThemeEntry[]): ThemeEntry[] {
  return themes.filter((t) => !isReservedExact(t.name));
}

/**
 * The instances the generator emits, in holder order (items 1-4):
 *   - `baseLight`, `baseDark`, `wcagLight`, `wcagDark`, always, whatever the config registers
 *     (item 1; item 2: `dark` and `wcag` add none);
 *   - then each other registered theme in config order, its light instance before its dark, one
 *     per mode it covers (item 3, item 4's "Order").
 *
 * Callers pass a config that `checkThemeConfig` accepts; the result for a refused config is
 * not defined by the design.
 */
export function instances(themes: readonly ThemeEntry[]): ThemeInstance[] {
  const out: ThemeInstance[] = [
    { words: ['base'], scheme: 'light' },
    { words: ['base'], scheme: 'dark' },
    { words: ['wcag'], scheme: 'light' },
    { words: ['wcag'], scheme: 'dark' },
  ];
  for (const t of otherThemes(themes)) {
    const covers = coveredModes(t);
    for (const scheme of ['light', 'dark'] as const) {
      if (covers[scheme]) out.push({ words: themeWords(t.name), scheme });
    }
  }
  return out;
}

/** An instance's name: the words followed by the suffix, always (item 4). Swift lower-camel, Kotlin Pascal. */
export function instanceName(inst: ThemeInstance, platform: NativePlatform): string {
  return `${nameFor(inst.words, platform)}${MODE_SUFFIX[inst.scheme]}`;
}

/** The holder's member names in order (`<Name>Themes`), per platform. */
export function instanceNames(themes: readonly ThemeEntry[], platform: NativePlatform): string[] {
  return instances(themes).map((i) => instanceName(i, platform));
}

/** `<Name>Themes`: the holder, named with the config's `name`, not the abbreviation. */
export const holderName = (productName: string): string => `${productName}Themes`;

/**
 * The backing Swift struct: `<Name>` + the Pascal instance name + `Theme`, for example
 * `<Name>HighContrastLightTheme` (item 4, "Every name derived from an instance").
 */
export function swiftBackingStruct(productName: string, inst: ThemeInstance): string {
  return `${productName}${pascalName(inst.words)}${MODE_SUFFIX[inst.scheme]}Theme`;
}

/**
 * The iOS implicit member: `static var <abbr><Pascal instance name>`, with the abbreviation in
 * lower case, for example `pbBaseDark`, `pbWcagLight`, `pbHighContrastLight` (item 4).
 */
export function swiftImplicitMember(abbreviation: string, inst: ThemeInstance): string {
  return `${abbreviation.toLowerCase()}${pascalName(inst.words)}${MODE_SUFFIX[inst.scheme]}`;
}

// =============================================================================================
// The theme family and the Selection table ("The theme family (6(b))", "Selection")
// =============================================================================================

/**
 * The family's cases, in order: `base`, `wcag`, then one per other registered theme in config
 * order (never `dark`). A case is the theme's words with no mode suffix: Swift lower-camel,
 * Kotlin Pascal. `base` and `wcag` are written `Base` and `Wcag` on Kotlin.
 *
 * Before U9 a config's custom themes reach no native output (item 3), so the family a
 * generated file declares until then has the first two only; this function gives the rule's
 * answer for the config it is handed.
 */
export function familyCases(themes: readonly ThemeEntry[], platform: NativePlatform): string[] {
  const words: string[][] = [['base'], ['wcag'], ...otherThemes(themes).map((t) => themeWords(t.name))];
  return words.map((w) => nameFor(w, platform));
}

/**
 * Swift reserved words, which a family case is declared in backticks for.
 *
 * DESIGN-GAP: design § 4 says "a case that is a Swift reserved word is declared in backticks
 * (`` case `default` ``)" and names `self`, `init` and `allCases` as refused, but does not give
 * the list of reserved words. This is the keyword list of The Swift Programming Language
 * ("Keywords and Punctuation": declaration, statement, and expression and type keywords),
 * without the contextual keywords, which need no backticks. `self`, `Self` and `init` are in it,
 * and are refused by item 5 (h) before a declaration is asked for. Ada confirms or replaces it.
 */
export const SWIFT_RESERVED_WORDS: readonly string[] = [
  'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func', 'import', 'init', 'inout',
  'internal', 'let', 'operator', 'private', 'precedencegroup', 'protocol', 'public', 'rethrows', 'static',
  'struct', 'subscript', 'typealias', 'var',
  'break', 'case', 'catch', 'continue', 'default', 'defer', 'do', 'else', 'fallthrough', 'for', 'guard', 'if',
  'in', 'repeat', 'return', 'throw', 'switch', 'where', 'while',
  'Any', 'as', 'false', 'is', 'nil', 'self', 'Self', 'super', 'throws', 'true', 'try',
];

/** How a Swift family case is declared: in backticks when it is a reserved word (used as `.default`). */
export function swiftCaseDeclaration(caseName: string): string {
  return SWIFT_RESERVED_WORDS.includes(caseName) ? `\`${caseName}\`` : caseName;
}

/**
 * The Selection table. For a family case (spelled for the platform) and a scheme, the instance
 * the provider shows, spelled for the platform; null when the config has no such case.
 *
 *   | base                         | baseLight          | baseDark          |
 *   | wcag                         | wcagLight          | wcagDark          |  (always both: item 1)
 *   | a registered theme of `both` | <t>Light           | <t>Dark           |
 *   | a registered theme of one    | the single-mode rule, below             |
 *
 * The single-mode rule: a theme of one mode falls back to base in the scheme it does not cover.
 * Mode `light`: light -> `<t>Light`, dark -> `baseDark`. Mode `dark`: light -> `baseLight`, dark
 * -> `<t>Dark`. `wcag` is not touched by the rule, whatever mode its config entry declares.
 */
export function selectInstance(
  themes: readonly ThemeEntry[],
  familyCase: string,
  scheme: Scheme,
  platform: NativePlatform,
): string | null {
  const base: ThemeInstance = { words: ['base'], scheme };
  if (familyCase === nameFor(['base'], platform)) return instanceName(base, platform);
  if (familyCase === nameFor(['wcag'], platform)) return instanceName({ words: ['wcag'], scheme }, platform);
  const t = otherThemes(themes).find((x) => nameFor(themeWords(x.name), platform) === familyCase);
  if (t === undefined) return null;
  if (coveredModes(t)[scheme]) return instanceName({ words: themeWords(t.name), scheme }, platform);
  return instanceName(base, platform);
}

// =============================================================================================
// The theme-instance rule, item 5: refusals
// =============================================================================================

export type RefusalRule = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export interface Refusal {
  rule: RefusalRule;
  /** The config entry's index in `themes` (the later entry, for (e) and (f)). */
  entry: number;
  /** Names the entry (and, for (e) and (f), the other entry). */
  message: string;
}

const entryLabel = (i: number, t: ThemeEntry): string => `themes[${i}] "${t.name}"`;

/** Item 5 (a): why a name is not an identifier on both platforms, or null. */
function nameFault(name: string): string | null {
  if (name.length === 0) return 'the name is empty';
  if (/[^A-Za-z0-9_-]/.test(name)) return 'the name contains a character other than an ASCII letter, a digit, "-" or "_"';
  const words = themeWords(name);
  if (words.some((w) => w.length === 0)) return 'the name has an empty word (a leading, trailing or doubled "-" or "_")';
  if (/^[0-9]/.test(words[0])) return 'the first word begins with a digit';
  return null;
}

const squash = (name: string): string => name.toLowerCase().replace(/[-_]/g, '');

/**
 * `generate`'s refusals of a theme config (item 5 (a)-(h)), as the module states them: every
 * refusal that holds, in entry order and, within an entry, in rule order. Refusals that need a
 * well-formed name ((d), (e), (h)) are skipped for an entry that fails (a).
 *
 * DESIGN-GAP: (e) says "two themes give the same Pascal words when letter case is ignored" and
 * lists `high-contrast`, `high_contrast` and `highContrast`. This module compares the
 * lower-cased Pascal concatenation, so `a-b` and `ab` collide too (both give `ab`). The design
 * does not say whether that second kind is meant.
 */
export function checkThemeConfig(themes: readonly ThemeEntry[]): Refusal[] {
  const out: Refusal[] = [];
  const seenName = new Map<string, number>();
  const seenPascal = new Map<string, number>();
  themes.forEach((t, i) => {
    const label = entryLabel(i, t);
    const add = (rule: RefusalRule, message: string): void => {
      out.push({ rule, entry: i, message: `${label}: ${message}` });
    };
    const faultA = nameFault(t.name);
    if (faultA !== null) add('a', faultA);
    if (t.name === 'base') add('b', 'a theme is named "base"; the base theme is never registered');
    if (t.name === 'dark' && (t.pair === true || t.mode !== 'dark')) {
      add('c', '"dark" must be registered with mode "dark" only, and not in the { light, dark } form');
    }
    if (faultA === null && !isReservedExact(t.name) && ['base', 'dark', 'wcag'].includes(squash(t.name))) {
      add('d', `the name matches "${squash(t.name)}" when letter case and separators are ignored, but is not spelled exactly that way`);
    }
    if (faultA === null && !isReservedExact(t.name)) {
      const key = pascalName(themeWords(t.name)).toLowerCase();
      const prior = seenPascal.get(key);
      if (prior !== undefined) {
        add('e', `gives the same Pascal words as ${entryLabel(prior, themes[prior])} when letter case is ignored`);
      } else seenPascal.set(key, i);
    }
    const first = seenName.get(t.name);
    if (first !== undefined) add('f', `the name is already registered at ${entryLabel(first, themes[first])}`);
    else seenName.set(t.name, i);
    if (t.pair !== true && t.mode !== 'light' && t.mode !== 'dark' && t.mode !== 'both') {
      add('g', `the mode ${t.mode === undefined ? '(absent)' : `"${t.mode}"`} is not "light", "dark" or "both"`);
    }
    if (faultA === null && !isReservedExact(t.name)) {
      const swiftCase = lowerCamelName(themeWords(t.name));
      if (swiftCase === 'self' || swiftCase === 'init' || swiftCase === 'allCases') {
        add('h', `the Swift family case would be "${swiftCase}", which is refused`);
      }
    }
  });
  return out;
}

/**
 * The harness consumer's own config against item 5's refusals: a check on our fixture, run by
 * the harness, and not a refusal of a consumer (so Req 10.4 does not apply). Returns one line
 * per refusal; an empty array means the config is fit to drive the probes.
 */
export function checkHarnessConsumerConfig(themes: readonly ThemeEntry[]): string[] {
  return checkThemeConfig(themes).map((r) => `harness consumer config, refusal (${r.rule}): ${r.message}`);
}

// =============================================================================================
// Product tokens ("Product-token names and access")
// =============================================================================================

/** One token as the product YAML gives it: its key, and the fields the rules read. */
export interface ProductTokenInput {
  key: string;
  ref?: string;
  platforms?: readonly string[];
}

export interface ProductCategory {
  /** The file name without `.yaml`. The YAML's own `category:` field is not read. */
  category: string;
  tokens: ProductTokenInput[];
}

/**
 * Whether `generate` reads a file: every `*.yaml` file directly in the `productTokens` folder,
 * no subfolders. `relPath` is POSIX, relative to that folder.
 */
export function productFileIsRead(relPath: string): boolean {
  return !relPath.includes('/') && relPath.endsWith('.yaml') && relPath.length > '.yaml'.length;
}

/** The category: the file name without `.yaml`. */
export function productCategoryOf(fileName: string): string {
  return fileName.slice(0, -'.yaml'.length);
}

/**
 * The category in type names: PascalCase split at `-` only. Each segment's first letter is
 * upper-cased and the rest kept as written: `brand-colors` -> `BrandColors`, `brand_colors` ->
 * `Brand_colors`. (This differs from the theme words, which split at `-` and `_`.)
 */
export function productCategoryPascal(category: string): string {
  return category.split('-').map(upperFirst).join('');
}

/**
 * Reads the categories out of the parsed product files. A file at a subfolder path is not
 * read; a file that did not parse (`doc` null or undefined) or has no `tokens` key contributes
 * no category. Keys are kept as the YAML has them, in file order; categories in the order the
 * caller lists the files.
 *
 * DESIGN-GAP: the design says keys are "in file order" but not in what order categories come
 * when several files are read (a directory listing's order is not stated), and not what a
 * `tokens` key holding a non-mapping (null, a list) contributes. This function keeps the
 * caller's file order and treats a non-mapping `tokens` as no category. The probes count reads
 * and do not depend on the category order.
 */
export function productCategories(
  files: readonly { path: string; doc: unknown }[],
): ProductCategory[] {
  const out: ProductCategory[] = [];
  for (const f of files) {
    if (!productFileIsRead(f.path)) continue;
    const doc = f.doc;
    if (typeof doc !== 'object' || doc === null || Array.isArray(doc)) continue;
    const tokens = (doc as Record<string, unknown>).tokens;
    if (!Object.prototype.hasOwnProperty.call(doc, 'tokens')) continue;
    if (typeof tokens !== 'object' || tokens === null || Array.isArray(tokens)) continue;
    const list: ProductTokenInput[] = [];
    for (const [key, v] of Object.entries(tokens as Record<string, unknown>)) {
      const t = (typeof v === 'object' && v !== null ? v : {}) as Record<string, unknown>;
      const entry: ProductTokenInput = { key };
      if (typeof t.ref === 'string') entry.ref = t.ref;
      if (Array.isArray(t.platforms)) entry.platforms = t.platforms.map(String);
      list.push(entry);
    }
    out.push({ category: productCategoryOf(f.path), tokens: list });
  }
  return out;
}

/**
 * Whether a token is emitted to a platform: an absent `platforms` list means all three; a list
 * keeps the token for the platforms it names; an explicit empty list emits it nowhere.
 *
 * DESIGN-GAP: a `platforms` value that is not a list (a string, a mapping) is not addressed.
 * `productCategories` drops a non-list value, which reads as absent (all platforms).
 */
export function productTokenOnPlatform(token: ProductTokenInput, platform: NativePlatform): boolean {
  if (token.platforms === undefined) return true;
  return token.platforms.includes(platform);
}

/**
 * The index's name for a referenced token on a platform, as the caller reads it from the token
 * index: a string, a list (a composite), or undefined when the index cannot resolve the `ref`.
 */
export type IndexNameLookup = (ref: string, platform: NativePlatform) => string | readonly string[] | undefined;

export type ProductAccess = { kind: 'static' } | { kind: 'theme'; member: string };

/**
 * The access rule from U6: a token is a theme member on a platform exactly when it has a `ref`
 * and the index entry it resolves to has a `theme.` name on that platform; the member is that
 * name with `theme.` removed. Otherwise it is static (`DesignTokens.<name>` for a `ref`, a
 * literal for a value). A `ref` the index cannot resolve is static.
 *
 * DESIGN-GAP: a composite's native index entry may name several definitions (a list). The design
 * says such a token is read as static ("composite and WCAG-only references" are the row 13
 * cause) but does not say what a list holding a `theme.` name means. This function takes only a
 * single string beginning `theme.` as a theme name.
 */
export function productAccess(token: ProductTokenInput, platform: NativePlatform, lookup: IndexNameLookup): ProductAccess {
  if (token.ref === undefined) return { kind: 'static' };
  const name = lookup(token.ref, platform);
  if (typeof name === 'string' && name.startsWith('theme.')) return { kind: 'theme', member: name.slice('theme.'.length) };
  return { kind: 'static' };
}

/** Swift: `Product<Cat>`, the enum a static token is a `public static let` of. */
export const swiftProductEnum = (category: string): string => `Product${productCategoryPascal(category)}`;

/** Swift: a static token is read `Product<Cat>.<key>`. */
export const swiftStaticRead = (category: string, key: string): string => `${swiftProductEnum(category)}.${key}`;

/** Swift: a theme member is `product<Cat><Key>`, the key with only its first letter upper-cased. */
export const swiftThemeMemberName = (category: string, key: string): string =>
  `product${productCategoryPascal(category)}${upperFirst(key)}`;

/** Kotlin: `Product<Cat>`, in `package com.designerpunk.product.tokens`; every token is a member named by its key alone. */
export const kotlinProductObject = (category: string): string => `Product${productCategoryPascal(category)}`;

/** Kotlin: a token is read `Product<Cat>.<key>`, static or theme member alike (a theme member inside `@Composable`). */
export const kotlinProductRead = (category: string, key: string): string => `${kotlinProductObject(category)}.${key}`;

export interface ProductRead {
  category: string;
  key: string;
  access: ProductAccess;
  /**
   * The text the probe reads. Swift static: `Product<Cat>.<key>`. Swift theme member:
   * `product<Cat><Key>` (read once through an `any DesignerPunkTheme` taken from `\.dpTheme`,
   * the same on every instance). Kotlin: `Product<Cat>.<key>`.
   */
  name: string;
  /** Kotlin theme members read inside `@Composable`. Always false on Swift. */
  composable: boolean;
}

/**
 * Every product read a probe makes on a platform: one per token that is emitted to that
 * platform, in category then key order. Its length is the `m` of `probe: product read <n> of
 * <m>`.
 */
export function productReads(categories: readonly ProductCategory[], platform: NativePlatform, lookup: IndexNameLookup): ProductRead[] {
  const out: ProductRead[] = [];
  for (const c of categories) {
    for (const t of c.tokens) {
      if (!productTokenOnPlatform(t, platform)) continue;
      const access = productAccess(t, platform, lookup);
      if (platform === 'ios') {
        out.push({
          category: c.category,
          key: t.key,
          access,
          name: access.kind === 'theme' ? swiftThemeMemberName(c.category, t.key) : swiftStaticRead(c.category, t.key),
          composable: false,
        });
      } else {
        out.push({ category: c.category, key: t.key, access, name: kotlinProductRead(c.category, t.key), composable: access.kind === 'theme' });
      }
    }
  }
  return out;
}
