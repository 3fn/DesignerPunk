/**
 * probe-swift — the compile harness's Swift probe generator (Spec 129 Task 3.2;
 * design.md § 1 K-3, Req 2.7, Req 4.2, design § 4 "The probe's theme list and name roots (O-5)").
 * Owner: Kenya.
 *
 * What it does: turns the consumer's `token-index/` and its registered themes into one Swift source
 * file, `Probe.swift`, that READS every name the index gives iOS, from outside the token module, by
 * plain `import` (never `@testable`). Stage P of `harness/ios/lane.ts` compiles it against the module
 * Stage T wrote. A member the index names but the generated file does not declare `public` then
 * produces a compile error (`inaccessible due to 'internal' protection level`): that is how the
 * probe sees row 9, and why it never reads "every public member" (D1 as Peter amended it).
 *
 * The source of every read is the index and the consumer's config, nothing else. No emitted file is
 * read, so a member the generator forgot cannot also be forgotten here (Stacy R1). Nothing in the
 * lane changes when item (i) emits a theme: the theme reads are derived, not listed.
 *
 * Name roots (token-index/README.md § "Platform names"; design § 4, O-5):
 *   - a `theme.<name>` name is a colour read through a theme instance:
 *         `_ = <Name>Themes.<instance>.<name>`                  (one per instance)
 *   - any other primitive or semantic name is a `DesignTokens` member: `_ = DesignTokens.<name>`
 *   - a `components.yaml` name is a top-level type's member:         `_ = <name>`
 *   - a name given as a list (a composite) is read once per element, under the same rule.
 *
 * Besides the index names the probe makes ONE further read, through the environment key the
 * components read (`\.dpTheme`, fixed by Q12 (a)), and holds ONE `static` of the theme type, as an
 * adopter does, so a theme type that is not `Sendable` fails under Swift 6 (K-1). Both appear only
 * when the index names at least one `theme.` colour; the static line is a declaration, not a read.
 *
 * The counts. `m` (`expectedReadCount`) is computed from the index and the config by its own code
 * path. `n` (`countProbeReads`) is counted from the text of the source the generator produced. They
 * differ when the generator drops or doubles a name, and the lane fails the context when `n ≠ m`.
 *
 * Purity: this module reads files only in `loadIndex`, the one function the lane and the tests call
 * on a folder. `generateProbe` and the count functions take values and return values.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

// ─── Types ───────────────────────────────────────────────────────────────────────────────────────

export type IndexFile = 'primitives' | 'semantics' | 'components';

/** One token entry of a `token-index/*.yaml` file, the part the probe reads. */
export interface IndexEntry {
  platforms?: { ios?: string | string[] | null };
}

export type TokenIndex = Record<IndexFile, Record<string, IndexEntry>>;

/** How the probe reads one name. */
export type ReadKind = 'primitive' | 'semantic' | 'component';

export interface IndexName {
  file: IndexFile;
  /** The index key (`color.action.primary`). */
  token: string;
  /** The name exactly as the index gives it for iOS (`spaceInset200`, `Duration.duration150`, `theme.colorActionPrimary`). */
  name: string;
}

/** The consumer's registered theme, as the resolved config carries it (the overrides are not needed). */
export interface ConfigTheme {
  name: string;
  mode: 'light' | 'dark' | 'both';
}

/** The part of the consumer's resolved config the probe reads. */
export interface ProbeConfig {
  /** The config's `name`: the stem of `<Name>Themes` (design § 4: "`<Name>` is the config's `name`, not the abbreviation"). */
  name: string;
  themes: ConfigTheme[];
}

export interface ProbeOptions {
  /** The token module the probe imports. The lane passes `ios.compile.tokens.module` from the pins. */
  tokenModule: string;
}

/** What the probe was asked to read, by group. */
export interface ProbeCounts {
  primitives: number;
  semantics: number;
  components: number;
  /** The `theme.`-named colour semantics. */
  themeColours: number;
  /** The registered theme instances each of those is read through. */
  themeInstances: number;
  /** 1 when the `\.dpTheme` read is made, else 0. */
  key: number;
}

export interface ProbeOutput {
  /** The text of `Probe.swift`. */
  source: string;
  /** `n`: reads counted from `source`. */
  read: number;
  /** `m`: reads the index and the config require. */
  expected: number;
  counts: ProbeCounts;
  /** The theme instance member names, in the order they are read. */
  instances: string[];
}

// ─── Reading the index ───────────────────────────────────────────────────────────────────────────

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

// ─── The theme instances ─────────────────────────────────────────────────────────────────────────

/**
 * The member names of `<Name>Themes` the probe reads each theme colour through.
 *
 * THE RULE THIS FILE DERIVES, in one place, because Spec 129's text states the instance set only by
 * example (Req 4.1: "base light and dark, WCAG light and dark"; design § 4: `baseLight, baseDark,
 * wcagLight, wcagDark …`, "one member per registered theme and mode"):
 *   - `baseLight` and `baseDark` always;
 *   - for each registered theme `t` (config order): mode `both` gives `<t>Light` and `<t>Dark`;
 *     mode `light` gives `<t>Light`; mode `dark` gives `<t>Dark`.
 * Under `init`'s scaffolded config (a theme `dark` in mode dark, a theme `wcag` in mode light) that is
 * `baseLight, baseDark, darkDark, wcagLight` — NOT the four the design's example lists. Item (i)'s
 * emitter (Task 11, Ada) states its rule; when it differs, this function is the one place that changes.
 * A read of an instance the emitter does not declare is a loud compile error, by design: a probe that
 * silently skipped an instance would hide the gap D1 exists to catch.
 */
export function themeInstances(config: ProbeConfig): string[] {
  const out = ['baseLight', 'baseDark'];
  for (const t of config.themes) {
    if (t.mode === 'both') out.push(`${t.name}Light`, `${t.name}Dark`);
    else if (t.mode === 'light') out.push(`${t.name}Light`);
    else if (t.mode === 'dark') out.push(`${t.name}Dark`);
    else throw new Error(`probe-swift: theme "${t.name}" has mode ${JSON.stringify(t.mode)}; expected light, dark or both`);
  }
  const seen = new Set<string>();
  for (const i of out) {
    if (seen.has(i)) throw new Error(`probe-swift: two theme instances would both be named "${i}"`);
    seen.add(i);
  }
  return out;
}

/** The holder type's name: `<Name>Themes`, `<Name>` being the config's `name` exactly as written (design § 4; the Spec 094 emitter does not recase it either). */
export function themeHolder(config: ProbeConfig): string {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(config.name)) {
    throw new Error(`probe-swift: config name ${JSON.stringify(config.name)} is not a Swift identifier`);
  }
  return `${config.name}Themes`;
}

// ─── Generating the probe ────────────────────────────────────────────────────────────────────────

/** The one read through the environment key the components read (Q12 (a): `\.dpTheme`, fixed). */
const KEY_READ = '_ = EnvironmentValues().dpTheme';

/** A read line: exactly four spaces, `_ = `, then a Swift expression. Nothing else in the file starts so. */
const READ_LINE = /^ {4}_ = \S/;

/** `n`: the reads in a probe's text. */
export function countProbeReads(source: string): number {
  return source.split('\n').filter((line) => READ_LINE.test(line)).length;
}

/**
 * `m`: the reads the index and the config require, counted without the generator's own line list.
 * Index names (each `theme.` name once per instance), plus the key read when any `theme.` name exists.
 */
export function expectedReadCount(index: TokenIndex, config: ProbeConfig): number {
  let plain = 0;
  let theme = 0;
  for (const file of INDEX_FILES) {
    for (const entry of Object.values(index[file])) {
      const ios = entry?.platforms?.ios;
      if (ios === null || ios === undefined) continue;
      for (const name of Array.isArray(ios) ? ios : [ios]) {
        if (typeof name === 'string' && name.startsWith(THEME_PREFIX)) theme += 1;
        else plain += 1;
      }
    }
  }
  const instances = theme > 0 ? themeInstances(config).length : 0;
  return plain + theme * instances + (theme > 0 ? 1 : 0);
}

export function generateProbe(index: TokenIndex, config: ProbeConfig, options: ProbeOptions): ProbeOutput {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(options.tokenModule)) {
    throw new Error(`probe-swift: token module ${JSON.stringify(options.tokenModule)} is not a Swift identifier`);
  }
  const names = indexIosNames(index);
  const themeMembers = themeMemberNames(names);
  const instances = themeMembers.length > 0 ? themeInstances(config) : [];
  const holder = themeMembers.length > 0 ? themeHolder(config) : '';

  const reads: string[] = [];
  const counts: ProbeCounts = { primitives: 0, semantics: 0, components: 0, themeColours: themeMembers.length, themeInstances: instances.length, key: 0 };
  const section = (title: string, lines: string[]): string[] => (lines.length === 0 ? [] : [`    // ${title}`, ...lines, '']);

  const plainLines = (file: IndexFile, root: string): string[] =>
    names
      .filter((n) => n.file === file && !n.name.startsWith(THEME_PREFIX))
      .map((n) => `    _ = ${root}${n.name}`);

  const primitives = plainLines('primitives', 'DesignTokens.');
  const semantics = plainLines('semantics', 'DesignTokens.');
  const components = plainLines('components', '');
  counts.primitives = primitives.length;
  counts.semantics = semantics.length;
  counts.components = components.length;

  const themeLines: string[] = [];
  for (const member of themeMembers) {
    for (const instance of instances) themeLines.push(`    _ = ${holder}.${instance}.${member}`);
  }
  const keyLines = themeMembers.length > 0 ? [`    ${KEY_READ}`] : [];
  counts.key = keyLines.length;

  reads.push(...primitives, ...semantics, ...components, ...themeLines, ...keyLines);

  const lines: string[] = [
    '// Generated by scripts/harness/probe-swift.ts from the consumer\'s token-index/ and its config. Do not edit.',
    '// Plain import, never @testable: this reads the module the way an adopter\'s app does.',
    'import SwiftUI',
    `import ${options.tokenModule}`,
    '',
  ];
  if (themeMembers.length > 0) {
    lines.push(
      '// One static of the theme type, as an adopter holds one: it fails under Swift 6 unless the type is Sendable. A declaration, not a read.',
      'private enum ProbeStatics {',
      `    static let theme: any DesignerPunkTheme = ${holder}.${instances[0]}`,
      '}',
      '',
    );
  }
  lines.push(
    'func probeReads() {',
    ...section('primitives', primitives),
    ...section('semantics', semantics),
    ...section('components', components),
    ...section(`theme: ${themeMembers.length} colour(s) x ${instances.length} instance(s)`, themeLines),
    ...section('the environment key the components read', keyLines),
  );
  // The last section leaves a trailing blank line inside the function body; drop it.
  while (lines[lines.length - 1] === '') lines.pop();
  lines.push('}', '');

  const source = lines.join('\n');
  return {
    source,
    read: countProbeReads(source),
    expected: expectedReadCount(index, config),
    counts,
    instances,
  };
}

/**
 * The line Stage P prints (K-3): `probe: read <n> of <m> index names (primitives a, semantics b, components c, theme d×k, key e)`.
 * `m` counts the key read, which is not an index name; the breakdown says so.
 */
export function formatReadCount(out: ProbeOutput): string {
  const c = out.counts;
  return (
    `probe: read ${out.read} of ${out.expected} index names ` +
    `(primitives ${c.primitives}, semantics ${c.semantics}, components ${c.components}, ` +
    `theme ${c.themeColours}×${c.themeInstances}, key ${c.key})`
  );
}
