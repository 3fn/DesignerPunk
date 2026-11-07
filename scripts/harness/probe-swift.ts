/**
 * probe-swift — the compile harness's Swift probe generator (Spec 129 Task 3.2 and 3.4;
 * design.md § 1 K-3, § 3 "The probe's count lines and the run file's `checks`", Req 2.7, Req 4.2,
 * design § 4 "The theme-instance rule" and "Product-token names and access"). Owner: Kenya.
 *
 * What it does: turns the consumer's `token-index/`, its registered themes and its product-token
 * source into one Swift source file, `Probe.swift`, that READS every name those give iOS, from
 * outside the token module, by plain `import` (never `@testable`). Stage P of `harness/ios/lane.ts`
 * compiles it against the module Stage T wrote. A member the index names but the generated file does
 * not declare `public` then produces a compile error (`inaccessible due to 'internal' protection
 * level`): that is how the probe sees row 9, and why it never reads "every public member" (D1 as
 * Peter amended it).
 *
 * THE RULES ARE NOT HERE. The theme-instance rule, the family's cases, the provider's name and the
 * product-token names and access rule are `scripts/harness/native-rules.ts`'s (Thurgood's, an
 * independent copy written from design § 4); this file imports them and keeps no copy (tasks.md
 * Task 3, 3.4). What stays here is what is the probe's own: how the index's names are rooted
 * (token-index/README.md § "Platform names": `DesignTokens.` for primitives and semantics, top-level
 * for components, a `theme.` name read through a theme instance), and the text of each read.
 *
 * The reads, in groups. Each group has its own compared count, printed as one line (design § 3):
 *   index names  `_ = DesignTokens.<name>`, `_ = <component name>`; a `theme.` name is counted once
 *                however many instances read it
 *   instances    `_ = <Name>Themes.<instance>.<member>`, one per `theme.` colour per instance
 *   product      `_ = Product<Cat>.<key>` (static) or `_ = EnvironmentValues().dpTheme.product<Cat><Key>`
 *                (a theme member: once, not once per instance, because it is a protocol-extension
 *                property that is the same on every instance)
 *   provider     `_ = EmptyView().<name>Theme()` and one `_ = EmptyView().<name>Theme(.<case>)` per
 *                case of the family: the only reads that see whether the provider and the family are
 *                `public` from outside the module
 *   key          `_ = EnvironmentValues().dpTheme`, the key the components read
 *
 * `m` of each group is computed from the inputs by its own code path; `n` is counted from the text of
 * the source the generator produced. They differ when the generator drops or doubles a read, and the
 * lane writes each group into the run file's `checks`, so the comparator fails the context.
 *
 * Purity: this module reads files only in `loadIndex` and `loadProductFiles`, the two functions the
 * lane and the tests call on a folder. `generateProbe` and the count functions take values and return
 * values.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
  BINDING,
  holderName,
  instanceNames,
  productCategories,
  productReads,
  providerReads,
  swiftProviderFunction,
  type IndexNameLookup,
  type NativePlatform,
  type ProductCategory,
  type ProductRead,
  type ThemeEntry,
} from './native-rules';

// ─── Types ───────────────────────────────────────────────────────────────────────────────────────

export type IndexFile = 'primitives' | 'semantics' | 'components';

/** One token entry of a `token-index/*.yaml` file, the part the probe reads. */
export interface IndexEntry {
  platforms?: { ios?: string | string[] | null };
}

export type TokenIndex = Record<IndexFile, Record<string, IndexEntry>>;

export interface IndexName {
  file: IndexFile;
  /** The index key (`color.action.primary`). */
  token: string;
  /** The name exactly as the index gives it for iOS (`spaceInset200`, `Duration.duration150`, `theme.colorActionPrimary`). */
  name: string;
}

/** The part of the consumer's config the probe reads: its `name` and the registered themes, from `harness-consumer.json`. */
export interface ProbeConfig {
  /** The config's `name`: the stem of `<Name>Themes` and of the provider. */
  name: string;
  themes: ThemeEntry[];
}

export interface ProbeOptions {
  /** The token module the probe imports. The lane passes `ios.compile.tokens.module` from the pins. */
  tokenModule: string;
  /** The consumer's product tokens, read from its `productTokens` folder (`loadProductFiles` then `productCategories`). Default: none. */
  products?: readonly ProductCategory[];
  /** Whether to read the provider and the family. Default true; the planted self-test token module has neither. */
  provider?: boolean;
}

export type GroupName = 'index names' | 'instances' | 'product' | 'provider' | 'key';

export interface ProbeGroup {
  name: GroupName;
  /** Reads counted from the generated source. */
  n: number;
  /** Reads the inputs require. */
  m: number;
}

export interface ProbeOutput {
  /** The text of `Probe.swift`. */
  source: string;
  /** One entry per group, in the order the count lines print. */
  groups: ProbeGroup[];
  /** The theme-instance member names the probe reads each `theme.` colour through, from the shared module. */
  instances: string[];
  /** The product reads the module gives, valid or not. */
  product: ProductRead[];
  /** Product reads whose key or category is not a Swift identifier: no text is written for them. */
  invalidProduct: ProductRead[];
}

// ─── Reading the index and the product source ────────────────────────────────────────────────────

const INDEX_FILES: readonly IndexFile[] = ['primitives', 'semantics', 'components'];

/** Reads `<dir>/primitives.yaml`, `semantics.yaml` and `components.yaml`. A missing or malformed file throws, naming it. */
export function loadIndex(dir: string): TokenIndex {
  const out = {} as TokenIndex;
  for (const file of INDEX_FILES) {
    const p = path.join(dir, `${file}.yaml`);
    let text: string;
    try {
      text = fs.readFileSync(p, 'utf8');
    } catch (e) {
      throw new Error(`probe-swift: cannot read ${p}: ${(e as Error).message}`);
    }
    const doc = yaml.load(text) as { tokens?: unknown } | null;
    const tokens = doc && typeof doc === 'object' ? doc.tokens : undefined;
    if (tokens === null || typeof tokens !== 'object' || Array.isArray(tokens)) {
      throw new Error(`probe-swift: ${p} has no \`tokens:\` mapping`);
    }
    out[file] = tokens as Record<string, IndexEntry>;
  }
  return out;
}

/**
 * The files `generate` reads from a `productTokens` folder, parsed: every `*.yaml` file directly in it
 * (a subfolder's files are not read), sorted by name. A file that does not parse comes back with
 * `doc: undefined`, which `productCategories` skips, as `generate` does. A missing folder reads as no files.
 */
export function loadProductFiles(dir: string): Array<{ path: string; doc: unknown }> {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const out: Array<{ path: string; doc: unknown }> = [];
  for (const e of entries.filter((x) => x.isFile()).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    if (!e.name.endsWith('.yaml')) continue;
    let doc: unknown;
    try {
      doc = yaml.load(fs.readFileSync(path.join(dir, e.name), 'utf8'));
    } catch {
      doc = undefined;
    }
    out.push({ path: e.name, doc });
  }
  return out;
}

/** The product categories of a `productTokens` folder, through the shared module's reading rules. */
export function loadProductCategories(dir: string): ProductCategory[] {
  return productCategories(loadProductFiles(dir));
}

/** A Swift member path: identifiers joined by `.`. The index's iOS names are all of this form. */
const SWIFT_PATH = /^[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z_][A-Za-z0-9_]*)*$/;

/**
 * Every iOS name the index gives, in a fixed order: primitives, semantics, components; within a file in
 * the index's own order; a list in its own order. A `null` or absent iOS name has no read. A name that
 * is not a Swift member path throws, naming the token: a probe line built from it could not compile,
 * and the failure would then look like a generator defect.
 */
export function indexIosNames(index: TokenIndex): IndexName[] {
  const names: IndexName[] = [];
  for (const file of INDEX_FILES) {
    for (const [token, entry] of Object.entries(index[file])) {
      const ios = entry?.platforms?.ios;
      if (ios === null || ios === undefined) continue;
      const list = Array.isArray(ios) ? ios : [ios];
      for (const name of list) {
        if (typeof name !== 'string' || !SWIFT_PATH.test(name)) {
          throw new Error(`probe-swift: ${file}.yaml token "${token}" has an iOS name that is not a Swift member path: ${JSON.stringify(name)}`);
        }
        names.push({ file, token, name });
      }
    }
  }
  return names;
}

const THEME_PREFIX = 'theme.';

/** The `theme.`-named names, without the prefix: the member the theme instance carries. */
export function themeMemberNames(names: readonly IndexName[]): string[] {
  return names.filter((n) => n.name.startsWith(THEME_PREFIX)).map((n) => n.name.slice(THEME_PREFIX.length));
}

/**
 * The index's iOS name for a token a product `ref` names (semantics first, then primitives): a string, a
 * list, or undefined when the index cannot resolve it. This is the module's `IndexNameLookup`.
 */
export function indexLookup(index: TokenIndex): IndexNameLookup {
  return (ref: string, platform: NativePlatform) => {
    for (const file of ['semantics', 'primitives'] as const) {
      const platforms = index[file][ref]?.platforms as Record<string, string | string[] | null | undefined> | undefined;
      const name = platforms?.[platform];
      if (name !== null && name !== undefined) return name;
    }
    return undefined;
  };
}

// ─── Counting reads in a probe's text ────────────────────────────────────────────────────────────

/** A read line: exactly four spaces, `_ = `, then a Swift expression. Nothing else in the file starts so. */
const READ_LINE = /^ {4}_ = \S/;
/** A group marker line, written before each section: `    // [instances] …`. */
const GROUP_MARKER = /^ {4}\/\/ \[(index names|instances|product|provider|key)\]/;

/** `n`: the reads in a probe's text, all groups. */
export function countProbeReads(source: string): number {
  return source.split('\n').filter((line) => READ_LINE.test(line)).length;
}

/** The read expressions in a probe's text, by group (the text after `_ = `). */
export function readsByGroup(source: string): Record<GroupName, string[]> {
  const out: Record<GroupName, string[]> = { 'index names': [], instances: [], product: [], provider: [], key: [] };
  let current: GroupName | null = null;
  for (const line of source.split('\n')) {
    const m = GROUP_MARKER.exec(line);
    if (m) {
      current = m[1] as GroupName;
      continue;
    }
    if (current !== null && READ_LINE.test(line)) out[current].push(line.slice('    _ = '.length));
  }
  return out;
}

// ─── Generating the probe ────────────────────────────────────────────────────────────────────────

const DT = 'DesignTokens.';

export function generateProbe(index: TokenIndex, config: ProbeConfig, options: ProbeOptions): ProbeOutput {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(options.tokenModule)) {
    throw new Error(`probe-swift: token module ${JSON.stringify(options.tokenModule)} is not a Swift identifier`);
  }
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(config.name)) {
    throw new Error(`probe-swift: config name ${JSON.stringify(config.name)} is not a Swift identifier`);
  }
  const names = indexIosNames(index);
  const themeMembers = themeMemberNames(names);
  const distinctThemeMembers = [...new Set(themeMembers)];
  const haveThemes = distinctThemeMembers.length > 0;
  const instances = haveThemes ? instanceNames(config.themes, 'ios') : [];
  const holder = holderName(config.name);
  const env = BINDING.swift.environmentMember;

  const plain = (file: IndexFile, root: string): string[] =>
    names.filter((n) => n.file === file && !n.name.startsWith(THEME_PREFIX)).map((n) => `    _ = ${root}${n.name}`);
  const primitives = plain('primitives', DT);
  const semantics = plain('semantics', DT);
  const components = plain('components', '');

  const themeLines: string[] = [];
  for (const member of distinctThemeMembers) for (const instance of instances) themeLines.push(`    _ = ${holder}.${instance}.${member}`);

  const keyLines = haveThemes ? [`    _ = EnvironmentValues().${env}`] : [];

  const productAll = options.products ? productReads(options.products, 'ios', indexLookup(index)) : [];
  const productValid = productAll.filter((r) => r.valid);
  const invalidProduct = productAll.filter((r) => !r.valid);
  const productLines = productValid.map((r) => (r.access.kind === 'theme' ? `    _ = EnvironmentValues().${env}.${r.name}` : `    _ = ${r.name}`));

  const provider = options.provider !== false;
  const providerFn = swiftProviderFunction(config.name);
  const providerList = provider ? providerReads(config.themes, 'ios') : [];
  const providerLines = providerList.map((r) => (r.kind === 'default' ? `    _ = EmptyView().${providerFn}()` : `    _ = EmptyView().${providerFn}(.${r.familyCase})`));

  const section = (group: GroupName, title: string, lines: string[]): string[] =>
    lines.length === 0 ? [] : [`    // [${group}] ${title}`, ...lines, ''];

  const out: string[] = [
    '// Generated by scripts/harness/probe-swift.ts from the consumer\'s token-index/, its themes and its product tokens. Do not edit.',
    '// Plain import, never the testable form: this reads the module the way an adopter\'s app does.',
    'import SwiftUI',
    `import ${options.tokenModule}`,
    '',
  ];
  if (haveThemes) {
    out.push(
      '// One static of the theme type, as an adopter holds one: it fails under Swift 6 unless the type is Sendable. A declaration, not a read.',
      'private enum ProbeStatics {',
      `    static let theme: any ${BINDING.swift.themeProtocol} = ${holder}.${instances[0]}`,
      '}',
      '',
    );
  }
  out.push(
    'func probeReads() {',
    ...section('index names', 'primitives', primitives),
    ...section('index names', 'semantics', semantics),
    ...section('index names', 'components', components),
    ...section('instances', `${distinctThemeMembers.length} colour(s) x ${instances.length} instance(s)`, themeLines),
    ...section('product', 'the consumer\'s product tokens', productLines),
    ...section('provider', 'the provider and the family, from outside the module', providerLines),
    ...section('key', 'the environment key the components read', keyLines),
  );
  while (out[out.length - 1] === '') out.pop();
  out.push('}', '');
  const source = out.join('\n');

  // n: counted from the text just produced. m: counted from the inputs, not from the lists above.
  const by = readsByGroup(source);
  const indexNamesRead = new Set<string>();
  for (const expr of by['index names']) indexNamesRead.add(expr.startsWith(DT) ? expr.slice(DT.length) : expr);
  for (const expr of by.instances) indexNamesRead.add(`${THEME_PREFIX}${expr.slice(expr.lastIndexOf('.') + 1)}`);
  const indexNamesRequired = new Set(names.map((n) => n.name));

  const groups: ProbeGroup[] = [
    { name: 'index names', n: indexNamesRead.size, m: indexNamesRequired.size },
    { name: 'instances', n: by.instances.length, m: distinctThemeMembers.length * (haveThemes ? instanceNames(config.themes, 'ios').length : 0) },
    { name: 'product', n: by.product.length, m: productAll.length },
    { name: 'provider', n: by.provider.length, m: provider ? providerReads(config.themes, 'ios').length : 0 },
    { name: 'key', n: by.key.length, m: haveThemes ? 1 : 0 },
  ];
  return { source, groups, instances, product: productAll, invalidProduct };
}

/**
 * The line Stage P prints for one group (design § 3). The first is the Req 2.7 line, the index's count:
 * `probe: read <n> of <m> index names`; the others read `probe: <group> read <n> of <m>`.
 */
export function formatCountLine(g: ProbeGroup): string {
  return g.name === 'index names' ? `probe: read ${g.n} of ${g.m} index names` : `probe: ${g.name} read ${g.n} of ${g.m}`;
}

/** Every group's line, in order. */
export function formatCountLines(out: ProbeOutput): string[] {
  return out.groups.map(formatCountLine);
}

/** The group with that name. */
export function groupOf(out: ProbeOutput, name: GroupName): ProbeGroup {
  const g = out.groups.find((x) => x.name === name);
  if (!g) throw new Error(`probe-swift: no group ${name}`);
  return g;
}
