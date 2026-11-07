#!/usr/bin/env tsx
/**
 * probe-kotlin — the Android compile harness's probe generator (Spec 129 Task 4, subtasks 4.2 and 4.3;
 * design.md § 2 ("`:probe`"), § 3 ("The probe's count lines and the run file's `checks`"), § 4 ("The
 * shared harness module"); requirements.md Req 2.7 as Peter amended D1 on 2026-11-05). Owner: Data.
 *
 * It writes the Kotlin source of the `:probe` Gradle module from two inputs and nothing else:
 *   - the consumer's own `token-index/` (what the same `generate` run wrote), and
 *   - the consumer's config as the manifest `harness-consumer.json` carries it: the product `name` and
 *     the registered `themes`; plus the product-token files its `productTokens` folder holds.
 * It names no token, no theme and no product-token member itself. Every rule about WHICH theme instances,
 * family cases, provider reads and product members exist comes from `scripts/harness/native-rules.ts`
 * (Thurgood's independent copy, written from design § 4): this file keeps no local copy of any of them. So
 * when item (i) emits theme types, or a product-token file gains a member, the probe reads it with no
 * change to this file or to `harness/android/**`.
 *
 * What it reads, through which root (token-index/README.md § "Platform names"; design § 4, O-5):
 *   - a `theme.<prop>` name (a `category: color` semantic) is read through `LocalDPTheme.current.<prop>`
 *     (the name's one index read) and through every `<Name>Themes.<Instance>.<prop>` (the instances group).
 *   - a `components.yaml` name (`ProgressTokens.connectorThickness`) is a top-level type: read as written.
 *   - every other primitive and semantic name is relative to `DesignTokens`. A list (a semantic motion
 *     token) is one read per element. A `null` is no read.
 *   - each product-token member `native-rules.ts` names for Android (the product group).
 *   - the family and the provider from outside `:tokens` (the provider group): the default call, and per
 *     family entry one read `<Name>ThemeFamily.<Entry>` and one call `<Name>Theme(family = …) { }`.
 *
 * Every read is inside a `@Composable` function. `LocalDPTheme.current`, the provider and the product-token
 * theme getters can only be read there. The probe belongs in a module of its own, apart from `:tokens`, so
 * that a member the generator left `internal` is NOT readable (Kotlin lets a module read its own `internal`
 * members; another module cannot). That is the planted-member case of Req 2.7.
 *
 * The count lines (design § 3). Each read is written under a marker comment, and the generator returns how
 * many reads each group should hold (`m`, computed from the INPUTS: the index, the shared module, the
 * product source). The `:probe` module counts the markers in the sources it was given (`n`) and prints one
 * line per group; the lane writes each as a `checks` entry in the run file, and the comparator fails the
 * context when `n ≠ m`. The Gradle task prints and never throws. The counts say what the probe was GIVEN to
 * read; whether each read compiles is the compiler's verdict, which the comparator reads as `probe:` keys.
 *
 *   probe: read <n> of <m> index names      // @index      each distinct name the index gives, a theme. name once
 *   probe: instances read <n> of <m>        // @instance   theme names x the module's instances
 *   probe: product read <n> of <m>          // @product    the module's product reads
 *   probe: provider read <n> of <m>         // @provider   the module's provider reads
 *
 * Android has no `key` group (iOS's `\.dpTheme` read): `LocalDPTheme.current` is the theme name's index read.
 *
 * `checkThemeInstances` is the per-run instance check (Peter's ruling 4, third safeguard): the members of
 * the `<Name>Themes` holder the generated Kotlin declares, against the instances `native-rules.ts` gives.
 * It fails closed. The holder's declaration form is the module's (`kotlinHolderOpenLine`,
 * `kotlinHolderMemberLine`), pinned in Task 11.
 *
 * Purity: `generateProbe`, `checkThemeInstances` and the helpers they use read no file and no environment,
 * and start no process. The readers (`readProbeIndex`, `readProductFiles`) and the command line do the
 * file reads.
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
import {
  BINDING,
  familyTypeName,
  holderName,
  instanceNames,
  kotlinHolderMemberLine,
  kotlinHolderOpenLine,
  kotlinProviderFunction,
  productCategories,
  productReads,
  providerReads,
  type IndexNameLookup,
  type ThemeEntry,
} from './native-rules';

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

/** The consumer's config, reduced to what the probe reads. The manifest satisfies it. */
export interface ProbeConfig {
  /** The product name: `<Name>Themes`, `<Name>ThemeFamily`, `<Name>Theme` (design § 4: the config's `name`, not the abbreviation). */
  name: string;
  /** The registered themes, as the manifest gives them (`name` and `mode`). */
  themes: readonly ThemeEntry[];
}

/** One product-token file as read: its path relative to the `productTokens` folder, and its parsed YAML. */
export interface ProductFile {
  path: string;
  doc: unknown;
}

export interface ProbeInput {
  index: ProbeIndex;
  config: ProbeConfig;
  productFiles: readonly ProductFile[];
  /**
   * Whether to read the family and the provider. Default true. The planted-member self-test turns it off:
   * its fixture declares neither, and its job is to give exactly one entry.
   */
  provider?: boolean;
}

export interface GroupCount {
  /** What the group should hold, computed from the inputs. */
  m: number;
  /** The markers found in the emitted sources. */
  n: number;
}

export interface ProbeGroups {
  index: GroupCount;
  instances: GroupCount;
  product: GroupCount;
  provider: GroupCount;
}

export interface ProbeOutput {
  /** Kotlin source files, by file name, for the `:probe` module. Empty groups write no file. */
  files: Readonly<Record<string, string>>;
  groups: ProbeGroups;
  /** Every `probe(...)` or provider read emitted: the sum of the four groups' `n`. */
  totalReads: number;
  /** The holder members read, in order (empty when the index names no `theme.` colour). */
  instances: readonly string[];
  /** The `probe-expected.txt` text the `:probe` module's count task reads. */
  expectedText: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────────────────────────

/** The probe module's own package: outside the reserved ones, so design § 9's scan does not flag it. */
export const PROBE_PACKAGE = 'dpharness.probe';
/** Reads per generated `@Composable` function: a composable with hundreds of calls grows past what is sensible to compile. */
export const CHUNK_SIZE = 50;
export const EXPECTED_FILE = 'probe-expected.txt';

/** The marker comment of each group, and the key of its `m` in `probe-expected.txt`. */
export const MARKERS = {
  index: { marker: '// @index ', key: 'index-names' },
  instances: { marker: '// @instance ', key: 'instances' },
  product: { marker: '// @product ', key: 'product' },
  provider: { marker: '// @provider ', key: 'provider' },
} as const;

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

type Source = 'primitives' | 'semantics' | 'components';

/** One name the index gives for Android, with the root it is read through. */
interface IndexName {
  name: string;
  /** The expression to read. Null for a theme name: its reads are built apart. */
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

/** The token index's Android name for a token key (a product token's `ref`), over the three index files. */
export function indexLookup(index: ProbeIndex): IndexNameLookup {
  return (ref) => {
    for (const source of ['primitives', 'semantics', 'components'] as const) {
      const entry = index[source][ref];
      if (entry === undefined) continue;
      const android = entry.platforms?.android;
      return android === null ? undefined : android;
    }
    return undefined;
  };
}

// ─── Emission ────────────────────────────────────────────────────────────────────────────────────

interface Read {
  /** The whole statement, without the trailing marker comment. */
  code: string;
  marker: string;
}

const FILE_NOTE = [
  '// Generated by scripts/harness/probe-kotlin.ts from the consumer\'s token index and config. Do not edit.',
  '// Every read is inside a @Composable function: LocalDPTheme.current, the provider and the product-token theme getters',
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

const probeCall = (expression: string): string => `probe(${expression})`;

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
    for (const read of group) lines.push(`    ${read.code} // ${read.marker}`);
    lines.push('}');
  });
  return `${lines.join('\n')}\n`;
}

/** The number of lines in `files` that carry a marker, found by scanning the emitted text. */
function countMarkers(files: Readonly<Record<string, string>>, marker: string): number {
  let n = 0;
  for (const text of Object.values(files)) for (const line of text.split('\n')) if (line.includes(marker)) n += 1;
  return n;
}

/** Writes the `:probe` sources from the index and the config. Pure. */
export function generateProbe(input: ProbeInput): ProbeOutput {
  const { index, config, productFiles } = input;
  assertIdentifier(config.name, 'the config name');
  const names = collectIndexNames(index);
  const members = instanceNames(config.themes, 'android');
  for (const member of members) assertIdentifier(member, 'a theme instance name');
  const holder = holderName(config.name);
  const local = BINDING.kotlin.local;
  const themeNames = names.filter((n) => n.themeProp !== null);

  const tokenReads: Read[] = [];
  const localReads: Read[] = [];
  const instanceReads: Read[] = [];
  for (const n of names) {
    if (n.themeProp === null) {
      tokenReads.push({ code: probeCall(n.expression as string), marker: `@index ${n.name}` });
    } else {
      localReads.push({ code: probeCall(`${local}.current.${n.themeProp}`), marker: `@index ${n.name}` });
      for (const member of members) {
        instanceReads.push({ code: probeCall(`${holder}.${member}.${n.themeProp}`), marker: `@instance ${member} ${n.name}` });
      }
    }
  }

  const productRead = productReads(productCategories([...productFiles]), 'android', indexLookup(index));
  const productStatements: Read[] = productRead.map((r) => {
    assertIdentifier(r.key, `the product token name in ${JSON.stringify(r.category)}`);
    return { code: probeCall(r.name), marker: `@product ${r.name}` };
  });

  const providerStatements: Read[] = [];
  const wantProvider = input.provider !== false;
  const family = familyTypeName(config.name);
  const provider = kotlinProviderFunction(config.name);
  if (wantProvider) {
    for (const r of providerReads(config.themes, 'android')) {
      if (r.kind === 'default') providerStatements.push({ code: `${provider} { }`, marker: '@provider default' });
      else {
        const entry = r.familyCase as string;
        assertIdentifier(entry, 'a family entry');
        if (r.kind === 'family-read') providerStatements.push({ code: probeCall(`${family}.${entry}`), marker: `@provider read ${entry}` });
        else providerStatements.push({ code: `${provider}(family = ${family}.${entry}) { }`, marker: `@provider call ${entry}` });
      }
    }
  }

  const files: Record<string, string> = {};
  const designImports = [`${BINDING.kotlin.themePackage}.*`];
  if (tokenReads.length > 0) files['ProbeTokens.kt'] = emitFile('ProbeTokens', designImports, tokenReads);
  if (localReads.length > 0) files['ProbeThemeLocal.kt'] = emitFile('ProbeThemeLocal', designImports, localReads);
  if (instanceReads.length > 0) files['ProbeThemeInstances.kt'] = emitFile('ProbeThemeInstances', designImports, instanceReads);
  if (productStatements.length > 0) files['ProbeProduct.kt'] = emitFile('ProbeProduct', [`${BINDING.kotlin.productPackage}.*`], productStatements);
  if (providerStatements.length > 0) files['ProbeFamily.kt'] = emitFile('ProbeFamily', designImports, providerStatements);

  const groups: ProbeGroups = {
    index: { m: names.length, n: countMarkers(files, MARKERS.index.marker) },
    instances: { m: themeNames.length * members.length, n: countMarkers(files, MARKERS.instances.marker) },
    product: { m: productRead.length, n: countMarkers(files, MARKERS.product.marker) },
    provider: { m: wantProvider ? providerReads(config.themes, 'android').length : 0, n: countMarkers(files, MARKERS.provider.marker) },
  };
  const totalReads = groups.index.n + groups.instances.n + groups.product.n + groups.provider.n;
  const expectedText =
    `${MARKERS.index.key}=${groups.index.m}\n${MARKERS.instances.key}=${groups.instances.m}\n` +
    `${MARKERS.product.key}=${groups.product.m}\n${MARKERS.provider.key}=${groups.provider.m}\n` +
    `files=${Object.keys(files).sort().join(',')}\n`;
  return { files, groups, totalReads, instances: localReads.length > 0 ? members : [], expectedText };
}

// ─── The per-run instance check ──────────────────────────────────────────────────────────────────

export interface InstanceCheck {
  ok: boolean;
  /** Why: names the members that differ, or the fail-closed reason, or `not checked`. */
  detail: string;
  /** The line the lane prints, beginning `theme instances:`. */
  line: string;
}

const CLASS_DECLARATION = new RegExp(`^\\s*(?:data\\s+)?class\\s+${BINDING.kotlin.themeClass}\\b`, 'm');

/**
 * The per-run instance check (Peter's "4 combine", its third safeguard). `generated` is the generated Kotlin,
 * all files joined. It compares the members of the `<Name>Themes` holder the code declares with the instances
 * `native-rules.ts` gives for the config, in order, and fails closed:
 *   - the holder is declared and no member can be parsed from it -> not ok;
 *   - `DesignerPunkTheme` is declared and no holder can be found -> not ok;
 *   - neither is declared (every run before U6) -> ok, `not checked`.
 * The holder form is the module's (`kotlinHolderOpenLine`, `kotlinHolderMemberLine`): the open line, then one
 * member per line, and the holder ends at the first line that is only `}`.
 */
export function checkThemeInstances(generated: string, config: ProbeConfig): InstanceCheck {
  const make = (ok: boolean, detail: string): InstanceCheck => ({ ok, detail, line: `theme instances: ${detail}` });
  const lines = generated.split(/\r?\n/);
  const open = kotlinHolderOpenLine(config.name);
  const at = lines.findIndex((l) => l.trimEnd() === open);
  if (at < 0) {
    return CLASS_DECLARATION.test(generated)
      ? make(false, `${BINDING.kotlin.themeClass} is declared and no ${holderName(config.name)} holder was found`)
      : make(true, 'not checked');
  }
  const sample = kotlinHolderMemberLine('\u0000');
  const split = sample.indexOf('\u0000');
  const prefix = sample.slice(0, split);
  const suffix = sample.slice(split + 1);
  const got: string[] = [];
  for (let i = at + 1; i < lines.length && lines[i].trimEnd() !== '}'; i++) {
    const line = lines[i].trimEnd();
    if (line.startsWith(prefix) && line.endsWith(suffix)) {
      const member = line.slice(prefix.length, line.length - suffix.length);
      if (IDENT.test(member)) got.push(member);
    }
  }
  if (got.length === 0) return make(false, `holder found, no members parsed (${holderName(config.name)})`);
  const expected = instanceNames(config.themes, 'android');
  const missing = expected.filter((e) => !got.includes(e));
  const seen = new Set<string>();
  const extra = got.filter((g) => {
    const bad = !expected.includes(g) || seen.has(g);
    seen.add(g);
    return bad;
  });
  const problems: string[] = [];
  if (missing.length > 0) problems.push(`missing ${missing.join(', ')}`);
  if (extra.length > 0) problems.push(`extra ${extra.join(', ')}`);
  if (problems.length === 0 && got.join(',') !== expected.join(',')) problems.push(`order differs: got ${got.join(', ')}; the shared module gives ${expected.join(', ')}`);
  return problems.length > 0 ? make(false, problems.join('; ')) : make(true, `${got.length} of ${expected.length} as the shared module gives (${got.join(', ')})`);
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
 * Reads the product-token files of a folder: every `*.yaml` directly in it, parsed, with its relative path.
 * `native-rules.ts` decides which files are read, in what order, and what a malformed one means. A missing
 * folder gives none. A file that does not parse gives `doc: undefined`, as the generator skips it.
 */
export function readProductFiles(dir: string): ProductFile[] {
  if (!fs.existsSync(dir)) return [];
  const files: ProductFile[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.yaml')) continue;
    let doc: unknown;
    try {
      doc = yaml.load(fs.readFileSync(path.join(dir, entry.name), 'utf8'));
    } catch {
      doc = undefined;
    }
    files.push({ path: entry.name, doc });
  }
  return files.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

/** Reduces the consumer's manifest (`harness-consumer.json`) to what the probe reads. An absent `themes` reads as none. */
export function probeConfigFromManifest(manifest: unknown): ProbeConfig {
  const m = manifest as { name?: unknown; themes?: unknown };
  if (typeof m?.name !== 'string') throw new Error('probe-kotlin: the manifest has no `name`');
  const themes = Array.isArray(m.themes) ? m.themes : [];
  return {
    name: m.name,
    themes: themes.map((t: { name?: unknown; mode?: unknown }) => {
      if (typeof t?.name !== 'string') throw new Error('probe-kotlin: a manifest theme has no `name`');
      return { name: t.name, mode: typeof t.mode === 'string' ? t.mode : undefined };
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
      productFiles: readProductFiles(path.join(consumer, manifest.productTokens)),
    });
    const written = writeProbe(out, output);
    const g = output.groups;
    log(`probe-kotlin: wrote ${written.length} file(s) under ${path.join(out, 'src')}: index ${g.index.m}, instances ${g.instances.m}, product ${g.product.m}, provider ${g.provider.m}`);
    return 0;
  } catch (error) {
    log(`probe-kotlin: ${(error as Error).message}`);
    return 1;
  }
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
