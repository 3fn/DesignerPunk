#!/usr/bin/env tsx
/**
 * probe-kotlin — the Android compile harness's probe generator (Spec 129 Task 4, subtask 4.2;
 * design.md § 2 ("`:probe`"), § 4 ("The probe's theme list and name roots"); requirements.md
 * Req 2.7 as Peter amended D1 on 2026-11-05). Owner: Data.
 *
 * It writes the Kotlin source of the `:probe` Gradle module from two inputs and nothing else:
 *   - the consumer's own `token-index/` (what the same `generate` run wrote), and
 *   - the consumer's config as the manifest `harness-consumer.json` carries it: the product `name`, and the
 *     registered `themes`; plus the product-token files its `productTokens` folder holds (the member names of `ProductTokens.android.kt`).
 * It names no token, no theme and no product-token member itself. So when item (i) emits theme types,
 * or a product-token file gains a member, the probe reads it with no change to this file or to
 * `harness/android/**` (the criterion this file's suite checks).
 *
 * What it reads, and through which root (token-index/README.md § "Platform names"; design § 4, O-5):
 *   - a `theme.<prop>` name (a `category: color` semantic) is read through `LocalDPTheme.current.<prop>`
 *     and through every `<Name>Themes.<Member>.<prop>`. `LocalDPTheme` and `package com.designerpunk.tokens`
 *     are DesignerPunk's fixed binding names (design § 4, Q12), whatever the consumer's abbreviation.
 *   - a `components.yaml` name (`ProgressTokens.connectorThickness`) is a top-level type: read as written.
 *   - every other primitive and semantic name is relative to `DesignTokens` (`DesignTokens.space_100`,
 *     `DesignTokens.Duration.Duration150`). A list (a semantic motion token) is one read per element.
 *     A `null` is no read: that platform's output carries no name for it.
 *   - each `Product<Category>.<member>` of the consumer's product-token files whose `platforms` include
 *     `android` (the category is the file name, as the product-token generator makes it).
 *
 * Every read is inside a `@Composable` function. `LocalDPTheme.current` and the product-token theme
 * getters (`@Composable @ReadOnlyComposable get()`) can only be read there, and a probe that read them
 * from a plain function would itself be a compile error (Data's design inbound § 1.1).
 *
 * The probe belongs in a module of its own, apart from `:tokens`, so that a member the generator left
 * `internal` is NOT readable (Kotlin lets a module read its own `internal` members; another module
 * cannot). That is the planted-member case of Req 2.7.
 *
 * The read count. Each name the index gives is read once under a `// @index <name>` marker, and the
 * generator returns how many names the index gave (`m`). The `:probe` module counts the markers in the
 * sources it was given (`n`) and prints `probe: read <n> of <m>`, failing when they differ: a generator
 * that dropped a name shows as `n < m`. The count says what the probe was GIVEN to read. Whether each
 * read compiles is the compiler's verdict, which the comparator reads as `probe:` keys.
 *
 * Purity: `generateProbe` and the helpers it uses read no file and no environment, and start no process.
 * The readers (`readProbeIndex`, `readProductTokenCategories`) and the command line do the file reads.
 *
 * Status: written without a Gradle toolchain. The emitted Kotlin has never been compiled (Peter has not
 * approved the downloads); Jest checks its shape only.
 *
 * Usage:
 *   npx tsx scripts/harness/probe-kotlin.ts --consumer <root> --out <dir>
 *     <root>/harness-consumer.json (consumer.ts's manifest) gives the index and product-token folders, the
 *     product `name` and the registered `themes`.
 *     Writes <dir>/src/*.kt and <dir>/probe-expected.txt.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// ─── Types ───────────────────────────────────────────────────────────────────────────────────────

/** The part of a `token-index/*.yaml` entry the probe reads. */
export interface ProbeIndexEntry {
  category?: string;
  platforms?: { android?: string | string[] | null };
}

export interface ProbeIndex {
  primitives: Readonly<Record<string, ProbeIndexEntry>>;
  semantics: Readonly<Record<string, ProbeIndexEntry>>;
  components: Readonly<Record<string, ProbeIndexEntry>>;
}

export type ThemeMode = 'light' | 'dark' | 'both';

/** The consumer's config, reduced to what the probe reads. A resolved config satisfies it. */
export interface ProbeConfig {
  /** The product name: `<Name>Themes` (design § 4: the config's `name`, not the abbreviation). */
  name: string;
  /** The registered themes; the built-in base light and dark instances are always read. */
  themes: ReadonlyArray<{ name: string; mode: ThemeMode }>;
}

/** One product-token file: the category is its file name without `.yaml`. */
export interface ProductTokenCategory {
  name: string;
  tokens: ReadonlyArray<{ name: string; platforms?: readonly string[] }>;
}

export interface ProbeInput {
  index: ProbeIndex;
  config: ProbeConfig;
  productTokens: readonly ProductTokenCategory[];
}

export interface ProbeOutput {
  /** Kotlin source files, by file name, for the `:probe` module. Empty groups write no file. */
  files: Readonly<Record<string, string>>;
  /** `m`: the number of distinct names the index gives for Android (a theme name counts once). */
  expectedIndexNames: number;
  /** `n` as emitted: the `// @index` markers in `files`. */
  indexReads: number;
  /** Every `probe(...)` read: index names, theme-instance reads and product-token members. */
  totalReads: number;
  /** The `<Name>Themes` members read, in the order they are read. */
  themeMembers: readonly string[];
  /** The `probe-expected.txt` text the `:probe` module's count task reads. */
  expectedText: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────────────────────────

/** DesignerPunk's fixed Android binding (design § 4, Q12): not derived from the consumer's abbreviation. */
export const TOKENS_PACKAGE = 'com.designerpunk.tokens';
export const PRODUCT_PACKAGE = 'com.designerpunk.product.tokens';
export const LOCAL_THEME = 'LocalDPTheme';
/** The probe module's own package: outside the reserved ones, so design § 9's scan does not flag it. */
export const PROBE_PACKAGE = 'dpharness.probe';
/** Reads per generated `@Composable` function: a composable with hundreds of calls grows past what is sensible to compile. */
export const CHUNK_SIZE = 50;
export const EXPECTED_FILE = 'probe-expected.txt';

const IDENT = /^[A-Za-z_][A-Za-z0-9_]*$/;
const THEME_PREFIX = 'theme.';

// ─── Names ───────────────────────────────────────────────────────────────────────────────────────

function assertIdentifier(value: string, what: string): void {
  if (!IDENT.test(value)) throw new Error(`probe-kotlin: ${what} is not a Kotlin identifier: ${JSON.stringify(value)}`);
}

function assertDotted(name: string, what: string): void {
  if (name.length === 0) throw new Error(`probe-kotlin: ${what} is empty`);
  for (const segment of name.split('.')) assertIdentifier(segment, `${what} segment of ${JSON.stringify(name)}`);
}

/** Capitalises the first letter only, as `generateKotlinThemeTypes` does (`wcag` → `Wcag`). */
function capitalise(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * The `<Name>Themes` members: `BaseLight` and `BaseDark`, then per registered theme `<Theme>Light` and
 * `<Theme>Dark` (mode `both`) or `<Theme>` (mode `light` or `dark`). Mirrors `generateKotlinThemeTypes`
 * (`src/generators/TokenFileGenerator.ts`), which design § 4 keeps ("one member per registered theme and mode").
 *
 * PROVISIONAL, and not settled here: which instances a probe reads is open (Ada's proposal of 2026-11-06 is
 * `baseLight`, `baseDark`, `wcagLight`, `wcagDark` always, `dark` and `wcag` reserved, any other theme adding
 * `<t>Light`/`<t>Dark` per mode; it goes to a consult round and then to Peter). This function is the only
 * place the rule lives, so the outcome changes this function and its test cases, nothing else.
 */
export function themeMemberNames(config: ProbeConfig): string[] {
  const members: string[] = ['BaseLight', 'BaseDark'];
  for (const theme of config.themes) {
    if (theme.mode !== 'light' && theme.mode !== 'dark' && theme.mode !== 'both') {
      throw new Error(`probe-kotlin: theme ${JSON.stringify(theme.name)} has mode ${JSON.stringify(theme.mode)}; expected light, dark or both`);
    }
    assertIdentifier(theme.name, 'a theme name');
    const base = capitalise(theme.name);
    if (theme.mode === 'both') members.push(`${base}Light`, `${base}Dark`);
    else members.push(base);
  }
  return [...new Set(members)];
}

/** `Product` + the category's PascalCase, split at `-`, as `KotlinEmitter.ts` writes the object's name. */
export function productObjectName(category: string): string {
  return `Product${category.split('-').map(capitalise).join('')}`;
}

type Source = 'primitives' | 'semantics' | 'components';

/** One name the index gives for Android, with the root it is read through. */
interface IndexName {
  name: string;
  /** The expression to read, without the `probe(...)`. Null for a theme name: its reads are built apart. */
  expression: string | null;
  themeProp: string | null;
}

/**
 * Every Android name the index gives, once each, sorted by name. Lists give one name per element;
 * `null` gives none. A `theme.` name must be a `category: color` entry (design § 4, O-5).
 */
export function collectIndexNames(index: ProbeIndex): IndexName[] {
  const byName = new Map<string, IndexName>();
  const sources: Source[] = ['primitives', 'semantics', 'components'];
  for (const source of sources) {
    const entries = index[source];
    for (const key of Object.keys(entries).sort()) {
      const android = entries[key]?.platforms?.android;
      if (android === undefined || android === null) continue;
      const names = Array.isArray(android) ? android : [android];
      for (const name of names) {
        if (typeof name !== 'string') {
          throw new Error(`probe-kotlin: ${source} entry ${JSON.stringify(key)} has an Android name that is not a string: ${JSON.stringify(name)}`);
        }
        if (byName.has(name)) continue;
        if (name.startsWith(THEME_PREFIX)) {
          if (source !== 'semantics' || entries[key]?.category !== 'color') {
            throw new Error(`probe-kotlin: ${source} entry ${JSON.stringify(key)} has the theme name ${JSON.stringify(name)} but is not a category: color semantic`);
          }
          const prop = name.slice(THEME_PREFIX.length);
          assertIdentifier(prop, `the theme property of ${JSON.stringify(name)}`);
          byName.set(name, { name, expression: null, themeProp: prop });
        } else {
          assertDotted(name, `${source} entry ${JSON.stringify(key)}'s Android name`);
          // components.yaml names are top-level types; every other name is relative to DesignTokens.
          byName.set(name, { name, expression: source === 'components' ? name : `DesignTokens.${name}`, themeProp: null });
        }
      }
    }
  }
  return [...byName.values()].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
}

// ─── Emission ────────────────────────────────────────────────────────────────────────────────────

interface Read {
  expression: string;
  marker: string;
}

const FILE_NOTE = [
  '// Generated by scripts/harness/probe-kotlin.ts from the consumer\'s token index and config. Do not edit.',
  '// Every read is inside a @Composable function: LocalDPTheme.current and the product-token theme getters',
  '// can only be read from one. The reads are the probe\'s whole job; their compile result is the verdict.',
];

function chunks<T>(items: readonly T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** One generated file: a public entry composable that calls private chunk composables of at most CHUNK_SIZE reads. */
function emitFile(entry: string, imports: readonly string[], reads: readonly Read[]): string {
  const lines: string[] = [...FILE_NOTE, '@file:Suppress("UNUSED_PARAMETER")', '', `package ${PROBE_PACKAGE}`, ''];
  for (const imp of ['androidx.compose.runtime.Composable', ...imports]) lines.push(`import ${imp}`);
  lines.push('');
  lines.push('@Suppress("NOTHING_TO_INLINE")');
  lines.push('private inline fun probe(value: Any?) {}');
  lines.push('');
  const groups = chunks(reads, CHUNK_SIZE);
  lines.push('@Composable');
  lines.push(`fun ${entry}() {`);
  groups.forEach((_, i) => lines.push(`    ${entry}${pad(i)}()`));
  lines.push('}');
  groups.forEach((group, i) => {
    lines.push('');
    lines.push('@Composable');
    lines.push(`private fun ${entry}${pad(i)}() {`);
    for (const read of group) lines.push(`    probe(${read.expression}) // ${read.marker}`);
    lines.push('}');
  });
  return `${lines.join('\n')}\n`;
}

/** Writes the `:probe` sources from the index and the config. Pure. */
export function generateProbe(input: ProbeInput): ProbeOutput {
  const { index, config, productTokens } = input;
  assertIdentifier(config.name, 'the config name');
  const names = collectIndexNames(index);
  const members = themeMemberNames(config);
  const themesObject = `${config.name}Themes`;

  const tokenReads: Read[] = [];
  const localReads: Read[] = [];
  const instanceReads: Read[] = [];
  for (const n of names) {
    if (n.themeProp === null) {
      tokenReads.push({ expression: n.expression as string, marker: `@index ${n.name}` });
    } else {
      localReads.push({ expression: `${LOCAL_THEME}.current.${n.themeProp}`, marker: `@index ${n.name}` });
      for (const member of members) {
        instanceReads.push({ expression: `${themesObject}.${member}.${n.themeProp}`, marker: `@instance ${member} ${n.name}` });
      }
    }
  }

  const productReads: Read[] = [];
  for (const category of [...productTokens].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    const object = productObjectName(category.name);
    assertIdentifier(object, `the product-token object for category ${JSON.stringify(category.name)}`);
    for (const token of [...category.tokens].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      if (token.platforms !== undefined && !token.platforms.includes('android')) continue;
      assertIdentifier(token.name, `the product token name in ${JSON.stringify(category.name)}`);
      productReads.push({ expression: `${object}.${token.name}`, marker: `@product ${object}.${token.name}` });
    }
  }

  const files: Record<string, string> = {};
  const designImports = [`${TOKENS_PACKAGE}.*`];
  if (tokenReads.length > 0) files['ProbeTokens.kt'] = emitFile('ProbeTokens', designImports, tokenReads);
  if (localReads.length > 0) files['ProbeThemeLocal.kt'] = emitFile('ProbeThemeLocal', designImports, localReads);
  if (instanceReads.length > 0) files['ProbeThemeInstances.kt'] = emitFile('ProbeThemeInstances', designImports, instanceReads);
  if (productReads.length > 0) files['ProbeProduct.kt'] = emitFile('ProbeProduct', [`${PRODUCT_PACKAGE}.*`], productReads);

  const indexReads = tokenReads.length + localReads.length;
  const totalReads = indexReads + instanceReads.length + productReads.length;
  const expectedText = `index-names=${names.length}\nreads=${totalReads}\nfiles=${Object.keys(files).sort().join(',')}\n`;
  return {
    files,
    expectedIndexNames: names.length,
    indexReads,
    totalReads,
    themeMembers: localReads.length > 0 ? members : [],
    expectedText,
  };
}

// ─── Readers ─────────────────────────────────────────────────────────────────────────────────────

function readTokens(file: string): Record<string, ProbeIndexEntry> {
  const doc = yaml.load(fs.readFileSync(file, 'utf8')) as { tokens?: Record<string, ProbeIndexEntry> } | null;
  if (!doc || typeof doc !== 'object' || !doc.tokens || typeof doc.tokens !== 'object') {
    throw new Error(`probe-kotlin: ${file} has no \`tokens:\` mapping`);
  }
  return doc.tokens;
}

/** Reads `primitives.yaml`, `semantics.yaml` and `components.yaml` from a consumer's `token-index/`. */
export function readProbeIndex(dir: string): ProbeIndex {
  return {
    primitives: readTokens(path.join(dir, 'primitives.yaml')),
    semantics: readTokens(path.join(dir, 'semantics.yaml')),
    components: readTokens(path.join(dir, 'components.yaml')),
  };
}

/**
 * Reads the product-token files of a folder: one category per `*.yaml`, named by the file (not by the
 * YAML's `category:` field), as `ProductTokenGenerator.parseCategory` does. A missing folder gives none.
 * A token with no `platforms` is on every platform.
 */
export function readProductTokenCategories(dir: string): ProductTokenCategory[] {
  if (!fs.existsSync(dir)) return [];
  const categories: ProductTokenCategory[] = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort()) {
    const doc = yaml.load(fs.readFileSync(path.join(dir, file), 'utf8')) as { tokens?: Record<string, { platforms?: string[] }> } | null;
    if (!doc || !doc.tokens) continue; // the generator skips a file with no `tokens`
    categories.push({
      name: file.replace(/\.yaml$/, ''),
      tokens: Object.entries(doc.tokens).map(([name, entry]) => ({ name, platforms: entry?.platforms })),
    });
  }
  return categories;
}

/**
 * Reduces the consumer's manifest (`harness-consumer.json`, which `consumer.ts` writes with the installed
 * loader's `name` and `themes`; Ada's `38d1d8ac0`) to what the probe reads. The probe reads the registered
 * themes from there, never from the consumer's config. An absent `themes` reads as none.
 */
export function probeConfigFromManifest(manifest: unknown): ProbeConfig {
  const m = manifest as { name?: unknown; themes?: unknown };
  if (typeof m?.name !== 'string') throw new Error('probe-kotlin: the manifest has no `name`');
  const themes = Array.isArray(m.themes) ? m.themes : [];
  return {
    name: m.name,
    themes: themes.map((t: { name?: unknown; mode?: unknown }) => {
      if (typeof t?.name !== 'string') throw new Error('probe-kotlin: a manifest theme has no `name`');
      return { name: t.name, mode: t.mode as ThemeMode };
    }),
  };
}

// ─── Command line ────────────────────────────────────────────────────────────────────────────────

/** Writes `output` under `out`: `src/*.kt` and `probe-expected.txt`. Removes a stale `src/` first. */
export function writeProbe(out: string, output: ProbeOutput): string[] {
  const src = path.join(out, 'src');
  fs.rmSync(src, { recursive: true, force: true });
  fs.mkdirSync(src, { recursive: true });
  const written: string[] = [];
  for (const name of Object.keys(output.files).sort()) {
    const file = path.join(src, name);
    fs.writeFileSync(file, output.files[name]);
    written.push(file);
  }
  fs.writeFileSync(path.join(out, EXPECTED_FILE), output.expectedText);
  return written;
}

interface ConsumerManifestLike {
  name: string;
  themes?: unknown;
  tokenIndex: string;
  productTokens: string;
}

export function main(argv: readonly string[], log: (line: string) => void = console.log): number {
  const args = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    if (!key.startsWith('--') || value === undefined) {
      log(`probe-kotlin: usage: --consumer <root> --out <dir>`);
      return 2;
    }
    args.set(key.slice(2), value);
  }
  const consumer = args.get('consumer');
  const out = args.get('out');
  if (!consumer || !out) {
    log('probe-kotlin: usage: --consumer <root> --out <dir>');
    return 2;
  }
  try {
    const manifest = JSON.parse(fs.readFileSync(path.join(consumer, 'harness-consumer.json'), 'utf8')) as ConsumerManifestLike;
    const output = generateProbe({
      index: readProbeIndex(path.join(consumer, manifest.tokenIndex)),
      config: probeConfigFromManifest(manifest),
      productTokens: readProductTokenCategories(path.join(consumer, manifest.productTokens)),
    });
    const written = writeProbe(out, output);
    log(`probe-kotlin: wrote ${written.length} file(s) under ${path.join(out, 'src')}: ${output.expectedIndexNames} index names, ${output.totalReads} reads (${output.themeMembers.length} theme instance(s))`);
    return 0;
  } catch (error) {
    log(`probe-kotlin: ${(error as Error).message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
