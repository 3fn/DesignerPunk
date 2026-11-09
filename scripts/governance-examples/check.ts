#!/usr/bin/env node
/*
THE GOVERNANCE-EXAMPLES GUARD. Ballot .kiro/docs/ballots/2026-10-26-governance-examples-guard.md
(RATIFIED, Peter, 2026-10-26; #495), as amended by ballot
.kiro/docs/ballots/2026-11-08-governance-examples-guard-attribute-predicate.md (RATIFIED, Peter,
2026-11-09, F-1 (a); #836). Owner: Thurgood (the instrument). Predicates: the token-name half is
Ada's (version 1); the file-shape half, the import surface and the attribute and value half are
Lina's (version 1 each).

The served governance docs teach by example. This guard reads the examples' token names, the
files their blocks declare, the shape of a declared token file, their @3fn/core import lines, and
the tags, attributes, enumerated values and css custom-property declarations of their web
examples, and fails a string that does not resolve, unless the pending list (pending.json) names it.

Run it: `npx tsx scripts/governance-examples/check.ts` prints the report line and exits 1 on a
failure (an unlisted hit, a stale pending entry, an unknown marker value); `--census` prints one
sorted line per doc (<doc>\t<candidates>:<failing>:<opted out>, the attribute half's reads
counted in all three, F-1 (a)) and the selected count;
`--hits` lists every failing string. The import surface needs `npm run build` first. The test
(__tests__/governance-examples.test.ts) is the registered guard: `npm run test:scripts`, in the
required lane-functional-root job.

The texts below are the ballot's § 8 blocks (§ 8.11 by pointer, from the amendment), byte-exact, each between its two "====" lines. The
test compares each with the ballot. Where this code and a text differ, the text governs and the
code is the defect.

==== § 8.1 The token-name predicate, version 1 (Ada's text, byte-exact)
TOKEN-NAME PREDICATE, VERSION 1 (Ada's text, byte-exact)

SCOPE. Every governance/*.md except governance/classification-map.md, and the eight
.kiro/steering/*.md files that package.json files[] names.

REGIONS. Code spans and fenced code blocks as CommonMark defines them. A candidate is read
only from:
  (a) an inline code span: the whole span;
  (b) a fenced block whose info string's first word, lowercased, is in PROGRAM_LANGS: only
      the contents of '...', "..." and `...` string literals, line by line;
  (c) any other fenced block (untagged, yaml, json, text, markdown, and the rest): the whole
      line.
  PROGRAM_LANGS = ts typescript tsx js javascript jsx mjs swift kotlin kt java css scss

THE NAME SET, read from the committed token-index/{primitives,semantics,components}.yaml:
  KEYS     every key under `tokens:`;
  CHANNELS every value of a `channels:` map (the OKLCH hue, lightness and chroma names).
Derived from KEYS at run time, never hand-kept:
  FAMILIES the first segments of the dotted keys;
  STEMS    the leading lowercase word of each undotted key that ends in three or four digits.
Hand-kept, changed only by a version bump:
  RETIRED_FAMILIES = spacing
  It names a family the index does not have and docs were measured using. The test asserts it
  shares no member with FAMILIES.

CANDIDATE. Each match of this JavaScript pattern, with FAMILY the alternation of FAMILIES and
RETIRED_FAMILIES and STEM the alternation of STEMS, longest first:
  (?<![A-Za-z0-9_$./\-])((?:FAMILY)(?:\.[A-Za-z0-9]+)+|(?:STEM)(?:[A-Z][a-z]*)*[0-9]{3,4})(\*?)(?![A-Za-z0-9_(\-])
Group 1 is the candidate. Group 2 marks a glob.

RESOLUTION. The first rule that holds decides. Exact and case-sensitive; no case-folding, no
notation normalization, no allowlist of names.
  0 retired    its first segment is in RETIRED_FAMILIES: it fails (or rule 6 applies);
  1 glob       group 2 is "*", and some key in KEYS starts with the candidate;
               a glob that rule 1 does not resolve fails;
  2 key        the candidate is in KEYS;
  3 channel    the candidate is in CHANNELS;
  4 namespace  the candidate followed by "." is a prefix of some key in KEYS (space.inset);
  5 dtcg-path  the candidate is <f>.<rest>, with <f> in FAMILIES and <rest> in KEYS
               (color.green500, the DTCG alias form);
  6 file-name  the candidate ends in .ts .tsx .js .jsx .mjs .cjs .md .yaml .yml .json .swift
               .kt .css .html .sh. It is counted as a file name, not as a token;
  otherwise it fails.

REPORT. "<N> candidates; <R> resolve (<k> key, <c> channel, <n> namespace, <d> dtcg-path,
<g> glob); <f> file names; <M> opted out; <P> pending". It never says the docs are correct.

A version bump is any change to SCOPE, REGIONS, PROGRAM_LANGS, RETIRED_FAMILIES, the
pattern, a resolution rule or the derivation of FAMILIES or STEMS. Ada decides it, with a
re-measured count.
==== end § 8.1

==== § 8.2 The under-inclusion limit (Ada's A-2, byte-exact)
UNDER-INCLUSION LIMIT (declared here, in the predicate's own text).

This predicate is lexical. A pass is evidence that the strings it selects are names the
committed index carries. It is not evidence that a doc names the right token for its use.
A run with zero failures is evidence about this predicate, not about the docs. It does not read:
  - prose outside code spans and fences, or indented code blocks (known at version 1:
    a-vision-of-the-future.md L213 and L418, Token-Semantic-Structure.md L691, "color.primary"
    in plain text);
  - names whose first segment is not in FAMILIES or RETIRED_FAMILIES (bodyMd, colour.primary),
    undotted names without three or four trailing digits (fontFamilyPrimary), names on a
    stem the palette lacks (blue500), and component tokens in display case
    (ButtonIcon.inset.medium);
  - platform identifiers (DesignTokens.radius.input, theme.colorPrimary, --color-primary).
    A dot or a hyphen comes before them, so they are not candidates, and a wrong platform name
    passes (known at version 1: platform-implementation-guidelines.md L145, L156, L310, L321;
    Token-Resolution-Patterns.md L218);
  - unquoted identifiers in a program block;
  - governance/classification-map.md, whose rows quote names as they were found;
  - any doc outside SCOPE, including component READMEs.
It also resolves more than keys. A namespace (color.feedback.select), a DTCG path whose tail
is a key, and a glob prefix all pass. So a namespace taught as if it were a token passes, and
so does a DTCG alias with a stale value (known at version 1: MCP-Integration-Guide.md L237,
"{color.green400}" for color.feedback.success.text, which the index maps to green500).
==== end § 8.2

==== § 8.3 The whole-module sentences (Stacy R1 item 2, byte-exact)
A pass is evidence that every string and path the guard selected, in the docs it scans, resolved against the committed index, the tracked files and the built types. A pass with P pending entries is not a clean corpus: the P strings fail and are not read as passing. A string under an <!-- example: ... --> marker is not read, and the marker is the author's assertion. Surfaces that ship but are not scanned include docs/consumer, family-guidance, experience-patterns, layout-templates, design-language, src/cli/templates and the shipped agent prompts. Presence is not correctness: a real key that is the wrong token passes, and a doc that says what a file is for is read by no part of this guard.
==== end § 8.3

==== § 8.4 The file-shape rule (Lina's text, byte-exact)
- **L-1: add a declared-kind shape check.** When a block's declared path has a basename that the loader's `isTokenFileName` accepts, the block must contain at least one exported binding whose initializer is a call to `defineComponentTokens(...)`. The check keys on the declared **basename** and runs whether or not the path resolves. So a consumer-located `// src/components/MyCard/MyCard.tokens.ts` holding a plain map fails too, which is the case that matters for consumers.
- **L-2: the check reads syntax and does not compile or run the block.** Use `ts.createSourceFile`, with no program and no `dist/`. Teaching blocks are partial on purpose. The CDG's own good example at L203 uses `spacingTokens` without importing it and puts `// 'inset.large' → space150` in place of entries. A compiled or executed predicate would fail the correct example. That makes the syntax check a static copy of a runtime signal (the brand is non-enumerable and the return type `ComponentTokenValues<T>` does not carry it), so the copy has to be pinned. **A twin-agreement test** runs the syntax predicate and the loader's `getTokenContract` harvest over the seven real token files and one plain-map fixture, and asserts they agree on every file. Req 8.2 ("no second detection mechanism") binds the loader. This copy sits outside the loader and is held to it by the test.
**L-3: the resolution rule for declared paths (the rule § 2.2 leaves to me).** A declared path resolves if it exists from the repo root, or if it is a suffix of exactly one tracked path (`git ls-files`). A suffix that matches no path fails. A suffix that matches several paths also fails: it does not tell the reader which file. This replaces "under `src/components/core/` or the repo root".
- **(c), the rule.** Take every fenced block tagged `ts`, `typescript`, `tsx`, `js`, `javascript`, or not tagged. Extract only the import and `export … from` declarations whose specifier begins with `@3fn/core`. Type-check those lines alone against the built types, resolved through the `exports` map. The options are stated, because `init` writes no consumer `tsconfig` (only `tsconfig.test.json`), so the draft's default does not exist: `moduleResolution: "bundler"`, `module: "esnext"`, `strict: true`, `skipLibCheck: true`, `noEmit: true`, `types: []`. **A specifier that the `exports` map does not list is a failure, not a reason to skip the block.** The draft's wording, "imports from `@3fn/core` (or a subpath its `exports` map lists)", could be read as a filter that drops exactly the defects below.
  - `<!-- example: generic -->` skips the block entirely.
  - `<!-- example: consumer -->` skips **only** path resolution. The import-surface check (item 2) and the shape check (L-1) still run.
  - Key: doc, half, the failing string or declared path, and its occurrence index in the doc. The line number is informational only.
==== end § 8.4

==== § 8.5 Marker scope and edit kind (the drafter's text, § 2.3)
A marker on the line directly before a fence covers that one fence. A marker placed directly after an inline code span covers that one span. The values are generic and consumer; any other value fails. A hunk that only adds or removes a marker on a governance path is EXECUTION (ballot 2026-10-26-governance-examples-guard § 2.3), and the PR body carries one line per marker, marker: <doc> <string> — <reason>; a marker added where a pending entry stood is named as a conversion.
==== end § 8.5

==== § 8.11 The attribute and value predicate, version 1 (Lina's text, byte-exact)
Carried in scripts/governance-examples/attribute-predicate.md, byte-exact, not here. The text
contains a glob whose "*" and "/" would end this comment. Site-1b erratum to ballot
2026-11-08-governance-examples-guard-attribute-predicate, ratified by Peter 2026-11-09, (b).
The test compares that file with the ballot's block byte for byte.
==== end § 8.11

Readings the code makes where a text is silent (each is the owner's to confirm or correct):
  - "exists from the repo root" (L-3) is read as: a tracked file, or a directory holding one
    (`git ls-files`), so a run does not depend on untracked or built files.
  - "a fenced block whose first line is a comment naming a path" is read as: the first content
    line is a //, #, /*, <!-- or -- comment whose whole body is one token ending in an extension.
  - M counts opt-out sites (markers); K counts the strings under them that would fail if read.
  - An occurrence index counts a doc's failing hits of the same string in the same half, from 0.
  - A marker-shaped comment with a value outside the closed set fails wherever it appears outside
    a fence or a code span. A valid marker that is neither directly before a fence nor directly
    after a code span covers nothing, and is not a failure.
  Readings for § 8.11 (the attribute half):
  - A-1/A-6: one tolerant tokenizer reads the html, untagged, tsx and jsx blocks. Only opening
    and self-closing tags are read; closing tags and <!-- --> comments are not. Tag and attribute
    names are compared as written, case-sensitive. A JSX `{...}` value is an expression, not a
    literal value, so A-4 does not check it.
  - A-2: the define call is `<x>.customElements.define('<tag>', <Class>)` or
    `customElements.define(...)`. Its class's `observedAttributes` is a static getter whose body
    is one `return`, or a static property. Either must be an array literal of string literals,
    or it is not read (A-6).
  - A-4: "the element's schema" is the one tracked `*.schema.yaml` in the component directory
    above `platforms/web/`, read for its `properties:` map. A union counts only when every member
    is quoted.
  - A-5: "contains `var(--name`" is applied as a substring test, as written. A longer name that
    begins with the declared one fires too (Token-Family-Shadow L380 and L388 at adoption).
  - A-7: the failing string is the tag (tag), the attribute name (attribute), the value (value),
    or the declared custom property (css-self-reference).
  - Opted out: under `generic`, each read the half would make counts in the doc's opted-out
    number, and each that would fail counts in K. Under `consumer`, so does each unregistered
    tag. M still counts marker sites.
  - The pending header's `entries: <N>` and per-kind counts are the baselines of both adoptions:
    the first adoption's four, and the attribute half's four from its own adoption.
*/

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as ts from 'typescript';

// ============================================================================
// Versions and closed lists (each named in the texts above; a change is a version bump)
// ============================================================================

/** Ada's token-name predicate, version 1 (§ 8.1). */
export const PREDICATE_VERSION = 1;
/** Lina's file-shape rule (L-1, L-2, L-3) and the import surface (F-2 (c)), version 1 (§ 8.4). */
export const FILE_SHAPE_RULE_VERSION = 1;
/** Lina's attribute and value predicate (A-1 to A-7), version 1 (§ 8.11). */
export const ATTRIBUTE_PREDICATE_VERSION = 1;

/** The one doc both halves exclude (P-2, Peter: yes). Stated once, here. */
export const EXCLUDED_DOCS: readonly string[] = ['governance/classification-map.md'];

export const PROGRAM_LANGS: readonly string[] = [
  'ts', 'typescript', 'tsx', 'js', 'javascript', 'jsx', 'mjs', 'swift', 'kotlin', 'kt', 'java', 'css', 'scss',
];

/** Hand-kept, changed only by a version bump (§ 8.1). The test asserts it shares no member with FAMILIES. */
export const RETIRED_FAMILIES: readonly string[] = ['spacing'];

/** Rule 6's extensions, in Ada's order. */
export const FILE_NAME_EXTENSIONS: readonly string[] = [
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.md', '.yaml', '.yml', '.json', '.swift', '.kt', '.css', '.html', '.sh',
];

/** The import surface's fence tags; '' is an untagged fence (§ 8.4, "(c), the rule"). */
export const IMPORT_FENCE_TAGS: readonly string[] = ['ts', 'typescript', 'tsx', 'js', 'javascript', ''];

/** The import surface's compiler options, as Lina's rule states them (§ 8.4). */
export const IMPORT_COMPILER_OPTIONS: ts.CompilerOptions = {
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  module: ts.ModuleKind.ESNext,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
  types: [],
};

/** The marker values, a closed set of two (§ 8.5). */
export const MARKER_VALUES = ['generic', 'consumer'] as const;
export type MarkerValue = (typeof MARKER_VALUES)[number];

/** The halves a pending entry may name (§ 8.6's header, with the attribute half's four kinds, § 8.11 A-7). */
export const HALVES = ['token-name', 'declared-path', 'shape', 'import', 'tag', 'attribute', 'value', 'css-self-reference'] as const;
export type Half = (typeof HALVES)[number];

/** Thrown when an input cannot be read. The guard never passes empty (Lina R-d, Ada R-4, Stacy C-e). */
export class GuardInputError extends Error {
  constructor(message: string) {
    super(`governance-examples: ${message}`);
    this.name = 'GuardInputError';
  }
}

// ============================================================================
// Inputs: scope, tracked files, the name set, the exports map, the built types
// ============================================================================

/** SCOPE (§ 8.1): every governance/*.md except EXCLUDED_DOCS, and the .kiro/steering/*.md files files[] names. */
export function scopeDocs(repoRoot: string): string[] {
  const govDir = path.join(repoRoot, 'governance');
  if (!fs.existsSync(govDir)) throw new GuardInputError(`no governance/ directory under ${repoRoot}`);
  const pkg = readPackageJson(repoRoot);
  const files: unknown = pkg.files;
  if (!Array.isArray(files)) throw new GuardInputError('package.json has no files[] list');
  const governance = fs
    .readdirSync(govDir)
    .filter((f) => f.endsWith('.md') && fs.statSync(path.join(govDir, f)).isFile())
    .map((f) => `governance/${f}`)
    .filter((d) => !EXCLUDED_DOCS.includes(d))
    .sort();
  const steering = (files as unknown[])
    .filter((f): f is string => typeof f === 'string' && /^\.kiro\/steering\/[^/*]+\.md$/.test(f))
    .sort();
  for (const s of steering) {
    if (!fs.existsSync(path.join(repoRoot, s))) throw new GuardInputError(`files[] names ${s}, which does not exist`);
  }
  return [...governance, ...steering];
}

function readPackageJson(repoRoot: string): Record<string, unknown> {
  const p = path.join(repoRoot, 'package.json');
  if (!fs.existsSync(p)) throw new GuardInputError(`no package.json under ${repoRoot}`);
  return JSON.parse(fs.readFileSync(p, 'utf8')) as Record<string, unknown>;
}

/** The tracked files (`git ls-files`), the oracle for declared paths (L-3). */
export function trackedFiles(repoRoot: string): string[] {
  let out: string;
  try {
    out = execFileSync('git', ['ls-files', '-z'], { cwd: repoRoot, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  } catch (err) {
    throw new GuardInputError(`git ls-files failed under ${repoRoot}: ${(err as Error).message}`);
  }
  const files = out.split('\0').filter((f) => f.length > 0);
  if (files.length === 0) throw new GuardInputError(`git ls-files returned no files under ${repoRoot}`);
  return files;
}

export interface NameSet {
  keys: Set<string>;
  channels: Set<string>;
  /** Derived from KEYS at run time: the first segments of the dotted keys. */
  families: string[];
  /** Derived from KEYS at run time: the leading lowercase word of each undotted key ending in 3–4 digits. */
  stems: string[];
}

export const TOKEN_INDEX_FILES: readonly string[] = ['primitives.yaml', 'semantics.yaml', 'components.yaml'];

/** THE NAME SET (§ 8.1), read from the committed token-index/ each run. Throws if any file is missing or empty. */
export function loadNameSet(indexDir: string): NameSet {
  const keys = new Set<string>();
  const channels = new Set<string>();
  for (const f of TOKEN_INDEX_FILES) {
    const p = path.join(indexDir, f);
    if (!fs.existsSync(p)) throw new GuardInputError(`token-index file missing: ${p}`);
    const doc = yaml.load(fs.readFileSync(p, 'utf8')) as { tokens?: Record<string, unknown> } | null;
    if (!doc || typeof doc !== 'object' || !doc.tokens || typeof doc.tokens !== 'object') {
      throw new GuardInputError(`token-index file has no tokens: map: ${p}`);
    }
    for (const [k, v] of Object.entries(doc.tokens)) {
      keys.add(k);
      collectChannels(v, channels);
    }
  }
  if (keys.size === 0) throw new GuardInputError(`token-index under ${indexDir} holds no keys`);
  return { keys, channels, families: deriveFamilies(keys), stems: deriveStems(keys) };
}

function collectChannels(node: unknown, out: Set<string>): void {
  if (Array.isArray(node)) {
    for (const n of node) collectChannels(n, out);
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
    if (k === 'channels' && v && typeof v === 'object' && !Array.isArray(v)) {
      for (const cv of Object.values(v as Record<string, unknown>)) if (typeof cv === 'string') out.add(cv);
    } else {
      collectChannels(v, out);
    }
  }
}

export function deriveFamilies(keys: Iterable<string>): string[] {
  const s = new Set<string>();
  for (const k of keys) if (k.includes('.')) s.add(k.split('.')[0]);
  return [...s].sort();
}

export function deriveStems(keys: Iterable<string>): string[] {
  const s = new Set<string>();
  for (const k of keys) {
    if (k.includes('.') || !/[0-9]{3,4}$/.test(k)) continue;
    const m = /^[a-z]+/.exec(k);
    if (m) s.add(m[0]);
  }
  return [...s].sort();
}

/** The package's `exports` map. Throws if absent. */
export function loadExportsMap(repoRoot: string): Record<string, unknown> {
  const pkg = readPackageJson(repoRoot);
  const ex = pkg.exports;
  if (!ex || typeof ex !== 'object' || Array.isArray(ex)) throw new GuardInputError('package.json has no exports map');
  return ex as Record<string, unknown>;
}

/** The built types the import surface checks against: every `types` target the exports map names must exist. */
export function assertBuiltTypes(repoRoot: string, exportsMap: Record<string, unknown>): void {
  if (!fs.existsSync(path.join(repoRoot, 'dist'))) {
    throw new GuardInputError(`no dist/ under ${repoRoot}; run \`npm run build\` before the import surface`);
  }
  let typed = 0;
  for (const [sub, target] of Object.entries(exportsMap)) {
    if (!target || typeof target !== 'object') continue;
    const t = (target as Record<string, unknown>).types;
    if (typeof t !== 'string') continue;
    typed++;
    if (!fs.existsSync(path.join(repoRoot, t))) {
      throw new GuardInputError(`exports["${sub}"].types names ${t}, which is not built; run \`npm run build\``);
    }
  }
  if (typed === 0) throw new GuardInputError('the exports map names no types target');
}

// ============================================================================
// The token-name predicate (§ 8.1)
// ============================================================================

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function longestFirst(xs: Iterable<string>): string[] {
  return [...new Set(xs)].sort((a, b) => b.length - a.length || (a < b ? -1 : a > b ? 1 : 0));
}

/** CANDIDATE (§ 8.1): Ada's pattern, with FAMILY and STEM substituted, longest first. */
export function candidatePattern(ns: NameSet): RegExp {
  const family = longestFirst([...ns.families, ...RETIRED_FAMILIES]).map(escapeRe).join('|');
  const stem = longestFirst(ns.stems).map(escapeRe).join('|');
  const src =
    '(?<![A-Za-z0-9_$./\\-])((?:' + family + ')(?:\\.[A-Za-z0-9]+)+|(?:' + stem + ')(?:[A-Z][a-z]*)*[0-9]{3,4})(\\*?)(?![A-Za-z0-9_(\\-])';
  return new RegExp(src, 'g');
}

export type Resolution = 'key' | 'channel' | 'namespace' | 'dtcg-path' | 'glob' | 'file-name' | 'fail';

function isFileName(c: string): boolean {
  return FILE_NAME_EXTENSIONS.some((e) => c.endsWith(e));
}

/** RESOLUTION (§ 8.1): the first rule that holds decides. Exact and case-sensitive. */
export function resolveCandidate(candidate: string, glob: boolean, ns: NameSet): Resolution {
  const first = candidate.split('.')[0];
  // 0 retired (or rule 6 applies)
  if (RETIRED_FAMILIES.includes(first)) return isFileName(candidate) ? 'file-name' : 'fail';
  // 1 glob
  if (glob) {
    for (const k of ns.keys) if (k.startsWith(candidate)) return 'glob';
    return 'fail';
  }
  // 2 key
  if (ns.keys.has(candidate)) return 'key';
  // 3 channel
  if (ns.channels.has(candidate)) return 'channel';
  // 4 namespace
  const prefix = candidate + '.';
  for (const k of ns.keys) if (k.startsWith(prefix)) return 'namespace';
  // 5 dtcg-path
  const dot = candidate.indexOf('.');
  if (dot > 0) {
    const f = candidate.slice(0, dot);
    const rest = candidate.slice(dot + 1);
    if (ns.families.includes(f) && ns.keys.has(rest)) return 'dtcg-path';
  }
  // 6 file-name
  if (isFileName(candidate)) return 'file-name';
  return 'fail';
}

export interface Candidate {
  string: string;
  glob: boolean;
  line: number;
}

/** Every candidate in one region's text (group 1, with group 2 marking a glob). */
export function candidatesIn(text: string, line: number, pattern: RegExp): Candidate[] {
  const out: Candidate[] = [];
  pattern.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    out.push({ string: m[1], glob: m[2] === '*', line });
    if (m[0].length === 0) pattern.lastIndex++;
  }
  return out;
}

/** REGIONS (b): the contents of '...', "..." and `...` string literals, line by line. */
export function stringLiterals(line: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < line.length) {
    const q = line[i];
    if (q === "'" || q === '"' || q === '`') {
      let j = i + 1;
      let buf = '';
      let closed = false;
      while (j < line.length) {
        if (line[j] === '\\' && j + 1 < line.length) {
          buf += line[j] + line[j + 1];
          j += 2;
          continue;
        }
        if (line[j] === q) {
          closed = true;
          break;
        }
        buf += line[j];
        j++;
      }
      if (closed) {
        out.push(buf);
        i = j + 1;
        continue;
      }
      i++;
      continue;
    }
    i++;
  }
  return out;
}

// ============================================================================
// The Markdown reading: fences and inline code spans as CommonMark defines them
// ============================================================================

export interface FenceLine {
  n: number;
  text: string;
}
export interface Fence {
  /** 1-based line of the opening fence. */
  open: number;
  info: string;
  /** The info string's first word, lowercased ('' for an untagged fence). */
  lang: string;
  lines: FenceLine[];
  marker?: MarkerValue;
}
export interface Span {
  line: number;
  text: string;
  marker?: MarkerValue;
}
export interface BadMarker {
  line: number;
  value: string;
}
export interface ParsedDoc {
  fences: Fence[];
  spans: Span[];
  badMarkers: BadMarker[];
}

const MARKER_RE = /<!--\s*example:\s*([^\s>]*)\s*-->/g;
const FENCE_MARKER_LINE_RE = /^\s*<!--\s*example:\s*([^\s>]*)\s*-->\s*$/;
const AFTER_SPAN_MARKER_RE = /^[ \t]*<!--\s*example:\s*([^\s>]*)\s*-->/;
const LIST_ITEM_RE = /^\s*(?:[-*+]|\d{1,9}[.)])(?:\s|$)/;

function indentWidth(line: string): number {
  let w = 0;
  for (const ch of line) {
    if (ch === ' ') w++;
    else if (ch === '\t') w += 4 - (w % 4);
    else break;
  }
  return w;
}

function isMarkerValue(v: string): v is MarkerValue {
  return (MARKER_VALUES as readonly string[]).includes(v);
}

/**
 * Fences, inline code spans and markers. Fences pair as CommonMark defines them: a closing fence
 * is the same character, at least as long, with no info string, so a ```typescript line inside a
 * ```markdown fence is content (Token-Family-Layering L366 at adoption). Indented code blocks
 * (outside a list) are not read.
 */
export function parseMarkdown(text: string): ParsedDoc {
  const lines = text.split('\n');
  const fences: Fence[] = [];
  const spans: Span[] = [];
  const badMarkers: BadMarker[] = [];
  let fence: { ch: string; len: number; f: Fence } | null = null;
  let inList = false;
  let prevBlank = true;
  let prevIndentedCode = false;
  let para: FenceLine[] = [];

  const flush = (): void => {
    if (para.length > 0) readInline(para, spans, badMarkers);
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const n = i + 1;
    const line = lines[i];
    if (fence) {
      const close = /^\s*(`{3,}|~{3,})\s*$/.exec(line);
      if (close && close[1][0] === fence.ch && close[1].length >= fence.len) {
        fence = null;
        prevBlank = false;
        prevIndentedCode = false;
        continue;
      }
      fence.f.lines.push({ n, text: line });
      continue;
    }
    const blank = line.trim() === '';
    if (blank) {
      flush();
      prevBlank = true;
      prevIndentedCode = false;
      continue;
    }
    const indent = indentWidth(line);
    if (LIST_ITEM_RE.test(line)) inList = true;
    else if (indent === 0 && prevBlank) inList = false;
    const open = /^(\s*)(`{3,}|~{3,})(.*)$/.exec(line);
    if (open && (indent <= 3 || inList) && !(open[2][0] === '`' && open[3].includes('`'))) {
      flush();
      const info = open[3].trim();
      const f: Fence = { open: n, info, lang: (info.split(/\s+/)[0] || '').toLowerCase(), lines: [] };
      const prev = i > 0 ? FENCE_MARKER_LINE_RE.exec(lines[i - 1]) : null;
      if (prev && isMarkerValue(prev[1])) f.marker = prev[1];
      fences.push(f);
      fence = { ch: open[2][0], len: open[2].length, f };
      prevBlank = false;
      prevIndentedCode = false;
      continue;
    }
    if (indent >= 4 && !inList && (prevBlank || prevIndentedCode)) {
      flush();
      prevIndentedCode = true;
      prevBlank = false;
      continue;
    }
    // A new block starts a new inline run (paragraph): headings, list items, quotes, table rows, HTML.
    if (/^\s{0,3}(#{1,6}\s|>|\||<)/.test(line) || LIST_ITEM_RE.test(line)) flush();
    para.push({ n, text: line });
    prevBlank = false;
    prevIndentedCode = false;
  }
  flush();
  // An unclosed fence runs to the end of the document (CommonMark); it is already recorded.
  return { fences, spans, badMarkers };
}

/** Inline code spans in one paragraph, with the markers that follow them; and every marker's value. */
function readInline(para: FenceLine[], spans: Span[], badMarkers: BadMarker[]): void {
  const joined = para.map((l) => l.text).join('\n');
  const lineAt = (offset: number): number => {
    let acc = 0;
    for (const l of para) {
      if (offset <= acc + l.text.length) return l.n;
      acc += l.text.length + 1;
    }
    return para[para.length - 1].n;
  };
  let outside = '';
  let outsideMap: number[] = [];
  let i = 0;
  while (i < joined.length) {
    const ch = joined[i];
    if (ch === '\\' && i + 1 < joined.length) {
      outside += joined[i] + joined[i + 1];
      outsideMap.push(i, i + 1);
      i += 2;
      continue;
    }
    if (ch === '`') {
      let j = i;
      while (j < joined.length && joined[j] === '`') j++;
      const runLen = j - i;
      // Find the next backtick run of exactly runLen.
      let k = j;
      let close = -1;
      while (k < joined.length) {
        if (joined[k] === '`') {
          let e = k;
          while (e < joined.length && joined[e] === '`') e++;
          if (e - k === runLen) {
            close = k;
            break;
          }
          k = e;
          continue;
        }
        k++;
      }
      if (close < 0) {
        // Literal backticks.
        for (let x = i; x < j; x++) {
          outside += joined[x];
          outsideMap.push(x);
        }
        i = j;
        continue;
      }
      let content = joined.slice(j, close).replace(/\n/g, ' ');
      if (content.length >= 2 && content.startsWith(' ') && content.endsWith(' ') && content.trim() !== '') {
        content = content.slice(1, -1);
      }
      const after = joined.slice(close + runLen);
      const mk = AFTER_SPAN_MARKER_RE.exec(after);
      const span: Span = { line: lineAt(i), text: content };
      if (mk && isMarkerValue(mk[1])) span.marker = mk[1];
      spans.push(span);
      i = close + runLen;
      continue;
    }
    outside += ch;
    outsideMap.push(i);
    i++;
  }
  MARKER_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = MARKER_RE.exec(outside)) !== null) {
    if (!isMarkerValue(m[1])) badMarkers.push({ line: lineAt(outsideMap[m.index] ?? 0), value: m[1] });
  }
}

// ============================================================================
// The file-shape half (§ 8.4): declared paths (L-3), token-file shape (L-1, L-2)
// ============================================================================

/** The path a fenced block's first line declares in a comment, or undefined. */
export function declaredPath(f: Fence): string | undefined {
  const first = f.lines[0];
  if (!first) return undefined;
  const m = /^\s*(?:\/\/|#|\/\*|<!--|--)[ \t]*(.*?)[ \t]*(?:\*\/|-->)?[ \t]*$/.exec(first.text);
  if (!m) return undefined;
  const body = m[1];
  if (!/^[^\s]+\.[A-Za-z][A-Za-z0-9]*$/.test(body)) return undefined;
  return body;
}

/** L-3: resolves if it exists from the repo root (a tracked file or directory), or is a suffix of exactly one tracked path. */
export function resolveDeclaredPath(p: string, tracked: readonly string[]): boolean {
  let q = p.replace(/^\.\//, '');
  const ellipsis = /^(?:…|\.\.\.)\//.test(q);
  q = q.replace(/^(?:…|\.\.\.)\//, '');
  if (!ellipsis) {
    if (tracked.includes(q)) return true;
    const dir = q.endsWith('/') ? q : q + '/';
    if (tracked.some((t) => t.startsWith(dir))) return true;
  }
  const suffix = '/' + q;
  let hits = 0;
  for (const t of tracked) if (t === q || t.endsWith(suffix)) hits++;
  return hits === 1;
}

/** The loader's naming rule (`src/cli/loadComponentTokens.ts` `isTokenFileName`), copied and pinned by the twin test. */
export function isTokenFileName(name: string): boolean {
  return name === 'tokens.ts' || name.endsWith('.tokens.ts');
}

function unwrap(e: ts.Expression): ts.Expression {
  let x = e;
  for (;;) {
    if (ts.isParenthesizedExpression(x) || ts.isAsExpression(x) || ts.isSatisfiesExpression(x) || ts.isNonNullExpression(x)) {
      x = x.expression;
      continue;
    }
    if (ts.isTypeAssertionExpression(x)) {
      x = x.expression;
      continue;
    }
    return x;
  }
}

function isDefineCall(e: ts.Expression | undefined): boolean {
  if (!e) return false;
  const x = unwrap(e);
  if (!ts.isCallExpression(x)) return false;
  const callee = x.expression;
  if (ts.isIdentifier(callee)) return callee.text === 'defineComponentTokens';
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text === 'defineComponentTokens';
  return false;
}

/**
 * L-1 by syntax only (L-2): the source holds at least one exported binding whose initializer is a
 * call to `defineComponentTokens(...)`. `ts.createSourceFile`, no program, no `dist/`.
 */
export function hasExportedDefineCall(source: string, fileName = 'block.ts'): boolean {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const initialisedByCall = new Set<string>();
  const exportedNames = new Set<string>();
  let found = false;
  for (const st of sf.statements) {
    if (ts.isVariableStatement(st)) {
      const exported = (ts.getModifiers(st) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      for (const d of st.declarationList.declarations) {
        if (!ts.isIdentifier(d.name)) continue;
        if (isDefineCall(d.initializer)) {
          if (exported) found = true;
          initialisedByCall.add(d.name.text);
        }
      }
    } else if (ts.isExportAssignment(st) && isDefineCall(st.expression)) {
      found = true;
    } else if (ts.isExportDeclaration(st) && !st.moduleSpecifier && st.exportClause && ts.isNamedExports(st.exportClause)) {
      for (const el of st.exportClause.elements) exportedNames.add((el.propertyName ?? el.name).text);
    }
  }
  if (found) return true;
  for (const nm of exportedNames) if (initialisedByCall.has(nm)) return true;
  return false;
}

// ============================================================================
// The import surface (§ 8.4, F-2 (c))
// ============================================================================

export interface ImportLine {
  specifier: string;
  text: string;
  line: number;
}

/**
 * The import and `export … from` declarations whose specifier begins with `@3fn/core`. Read by the
 * TypeScript parser, and kept only when the declaration begins its own line, so prose and trees that
 * quote an import line are not extracted (Stacy, F-2).
 */
export function extractImportLines(f: Fence): ImportLine[] {
  if (!IMPORT_FENCE_TAGS.includes(f.lang)) return [];
  const src = f.lines.map((l) => l.text).join('\n');
  const sf = ts.createSourceFile('block.tsx', src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const out: ImportLine[] = [];
  const lineStarts = sf.getLineStarts();
  for (const st of sf.statements) {
    let spec: ts.Expression | undefined;
    if (ts.isImportDeclaration(st)) spec = st.moduleSpecifier;
    else if (ts.isExportDeclaration(st)) spec = st.moduleSpecifier;
    if (!spec || !ts.isStringLiteral(spec) || !spec.text.startsWith('@3fn/core')) continue;
    const start = st.getStart(sf);
    const { line } = sf.getLineAndCharacterOfPosition(start);
    const lineText = src.slice(lineStarts[line], start);
    if (lineText.trim() !== '') continue;
    out.push({ specifier: spec.text, text: st.getText(sf), line: f.lines[line].n });
  }
  return out;
}

/**
 * Type-check the extracted lines alone against the built types, resolved through the `exports`
 * map: each block's lines are one file, in a temp project whose `node_modules/@3fn/core` links to
 * the repo. Returns, per input, whether the line type-checks.
 */
export function typeCheckImports(
  repoRoot: string,
  blocks: { key: string; lines: ImportLine[] }[],
  exportsMap: Record<string, unknown>,
): Map<string, boolean[]> {
  const result = new Map<string, boolean[]>();
  if (blocks.length === 0) return result;
  assertBuiltTypes(repoRoot, exportsMap);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'governance-examples-'));
  try {
    const scope = path.join(tmp, 'node_modules', '@3fn');
    fs.mkdirSync(scope, { recursive: true });
    fs.symlinkSync(path.resolve(repoRoot), path.join(scope, 'core'), 'dir');
    const files: string[] = [];
    const offsets = new Map<string, number[]>();
    blocks.forEach((b, bi) => {
      const file = path.join(tmp, `block${bi}.ts`);
      let text = '';
      const starts: number[] = [];
      for (const l of b.lines) {
        starts.push(text.length);
        text += l.text + '\n';
      }
      text += 'export {};\n';
      fs.writeFileSync(file, text);
      files.push(file);
      offsets.set(file, starts);
    });
    const program = ts.createProgram(files, IMPORT_COMPILER_OPTIONS);
    blocks.forEach((b, bi) => {
      const file = files[bi];
      const sf = program.getSourceFile(file);
      const ok = b.lines.map(() => true);
      const diags = sf ? [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)] : [];
      const starts = offsets.get(file) ?? [];
      for (const d of diags) {
        const pos = d.start ?? 0;
        let idx = 0;
        for (let s = 0; s < starts.length; s++) if (pos >= starts[s]) idx = s;
        ok[idx] = false;
      }
      result.set(b.key, ok);
    });
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  return result;
}

// ============================================================================
// The attribute and value half (§ 8.11, Lina's predicate v1: A-1 to A-7)
// ============================================================================

/** A-1: the fence tags whose HTML is read ('' is an untagged fence), and those whose JSX is read. */
export const HTML_FENCE_TAGS: readonly string[] = ['html', ''];
export const JSX_FENCE_TAGS: readonly string[] = ['tsx', 'jsx'];
/** A-5: the fence tag whose declarations are read. */
export const CSS_FENCE_TAGS: readonly string[] = ['css'];
/** A-3 (c): the global HTML attributes, plus any aria-*, data-* or on[a-z]+ (GLOBAL_ATTRIBUTE_RE). */
export const GLOBAL_ATTRIBUTES: readonly string[] = [
  'id', 'class', 'style', 'slot', 'part', 'hidden', 'title', 'lang', 'dir', 'tabindex', 'role', 'inert',
];
export const GLOBAL_ATTRIBUTE_RE = /^(?:aria-.+|data-.+|on[a-z]+)$/;
/** A-2: the element sources. */
export const WEB_SOURCE_RE = /^src\/components\/(?:.+\/)?platforms\/web\/[^/]+\.web\.ts$/;
/** A-3 (b): the attribute-reading calls whose string-literal argument counts. */
export const ATTRIBUTE_READ_CALLS: readonly string[] = ['getAttribute', 'hasAttribute', 'toggleAttribute'];

export interface SchemaProp {
  /** A-4: the enumerated values, or undefined when the prop is not value-checked. */
  values?: string[];
}

export interface ElementInfo {
  tag: string;
  file: string;
  /** A-3 (a): the `observedAttributes` array literal, or undefined when it is not read (A-6). */
  observed?: string[];
  /** A-3 (b): string-literal arguments of getAttribute, hasAttribute and toggleAttribute in the file. */
  reads: Set<string>;
  /** A-4: the schema's props, keyed by the name lowercased. Empty when the element has no schema. */
  props: Map<string, SchemaProp>;
}

function unwrapArray(e: ts.Expression): ts.Expression {
  return unwrap(e);
}

/** The string list of an array literal of string literals, or undefined (a spread, a constant, a computed element). */
function stringArrayLiteral(e: ts.Expression | undefined): string[] | undefined {
  if (!e) return undefined;
  const x = unwrapArray(e);
  if (!ts.isArrayLiteralExpression(x)) return undefined;
  const out: string[] = [];
  for (const el of x.elements) {
    if (ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el)) out.push(el.text);
    else return undefined;
  }
  return out;
}

/** A class's `observedAttributes`: a static getter's single returned expression, or a static property's initializer. */
function observedOf(cls: ts.ClassLikeDeclaration): string[] | undefined {
  for (const m of cls.members) {
    const isStatic = (ts.getModifiers(m as ts.HasModifiers) ?? []).some((k) => k.kind === ts.SyntaxKind.StaticKeyword);
    if (!isStatic || !m.name || !ts.isIdentifier(m.name) || m.name.text !== 'observedAttributes') continue;
    if (ts.isGetAccessorDeclaration(m)) {
      const body = m.body?.statements ?? ts.factory.createNodeArray<ts.Statement>();
      const ret = body.filter(ts.isReturnStatement);
      if (body.length !== 1 || ret.length !== 1) return undefined;
      return stringArrayLiteral(ret[0].expression);
    }
    if (ts.isPropertyDeclaration(m)) return stringArrayLiteral(m.initializer);
    return undefined;
  }
  return undefined;
}

/**
 * One element source, read by syntax only (A-6): `ts.createSourceFile`, no program, no `dist/`.
 * Returns each `customElements.define('<tag>', <Class>)` call's tag, with the class's
 * `observedAttributes` (undefined when not an array literal) and the file's attribute reads.
 */
export function readElementSource(source: string, file: string): Omit<ElementInfo, 'props'>[] {
  const sf = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const classes = new Map<string, ts.ClassLikeDeclaration>();
  const defines: { tag: string; cls?: string }[] = [];
  const reads = new Set<string>();
  const visit = (n: ts.Node): void => {
    if (ts.isClassDeclaration(n) && n.name) classes.set(n.name.text, n);
    if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression)) {
      const name = n.expression.name.text;
      const obj = n.expression.expression;
      const arg = n.arguments[0];
      if (name === 'define' && /(?:^|\.)customElements$/.test(obj.getText(sf)) && arg && ts.isStringLiteral(arg)) {
        const second = n.arguments[1];
        defines.push({ tag: arg.text, cls: second && ts.isIdentifier(second) ? second.text : undefined });
      }
      if (ATTRIBUTE_READ_CALLS.includes(name) && arg && (ts.isStringLiteral(arg) || ts.isNoSubstitutionTemplateLiteral(arg))) {
        reads.add(arg.text);
      }
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return defines.map((d) => {
    const cls = d.cls ? classes.get(d.cls) : undefined;
    return { tag: d.tag, file, observed: cls ? observedOf(cls) : undefined, reads };
  });
}

/** A-4: a prop's enumerated values: a type that is a union of quoted string literals, or `validation.enum`. */
export function enumeratedValues(prop: unknown): string[] | undefined {
  if (!prop || typeof prop !== 'object') return undefined;
  const p = prop as { type?: unknown; validation?: { enum?: unknown } };
  const en = p.validation && typeof p.validation === 'object' ? p.validation.enum : undefined;
  if (Array.isArray(en) && en.length > 0 && en.every((v) => typeof v === 'string')) return en as string[];
  if (typeof p.type === 'string' && /^\s*'[^']*'(?:\s*\|\s*'[^']*')*\s*$/.test(p.type)) {
    return [...p.type.matchAll(/'([^']*)'/g)].map((m) => m[1]);
  }
  return undefined;
}

/** The schema beside an element source: the one tracked `*.schema.yaml` in the component directory above `platforms/web/`. */
function schemaProps(repoRoot: string, file: string, tracked: readonly string[]): Map<string, SchemaProp> {
  const props = new Map<string, SchemaProp>();
  const dir = file.replace(/\/platforms\/web\/[^/]+$/, '');
  const schemas = tracked.filter((t) => t.startsWith(dir + '/') && /^[^/]+\.schema\.yaml$/.test(t.slice(dir.length + 1)));
  if (schemas.length !== 1) return props;
  const doc = yaml.load(fs.readFileSync(path.join(repoRoot, schemas[0]), 'utf8')) as { properties?: Record<string, unknown> } | null;
  const ps = doc && typeof doc === 'object' && doc.properties && typeof doc.properties === 'object' ? doc.properties : {};
  for (const [name, p] of Object.entries(ps)) props.set(name.toLowerCase(), { values: enumeratedValues(p) });
  return props;
}

/** A-2: the registered tags, each with its A-3 and A-4 inputs. Throws if no element source registers a tag. */
export function loadElements(repoRoot: string, tracked: readonly string[]): Map<string, ElementInfo> {
  const out = new Map<string, ElementInfo>();
  const sources = tracked.filter((t) => WEB_SOURCE_RE.test(t)).sort();
  if (sources.length === 0) throw new GuardInputError('no src/components/**/platforms/web/*.web.ts source is tracked');
  for (const file of sources) {
    const full = path.join(repoRoot, file);
    if (!fs.existsSync(full)) throw new GuardInputError(`element source missing: ${file}`);
    const props = schemaProps(repoRoot, file, tracked);
    for (const e of readElementSource(fs.readFileSync(full, 'utf8'), file)) out.set(e.tag, { ...e, props });
  }
  if (out.size === 0) throw new GuardInputError('no element source registers a tag with customElements.define');
  return out;
}

export interface TagRead {
  tag: string;
  line: number;
  attrs: { name: string; value?: string; expression: boolean; line: number }[];
}

const TAG_OPEN_RE = /<([A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]*)+)(?=[\s/>]|$)/g;

/**
 * A-6's tolerant tokenizer: every opening or self-closing tag whose name holds a hyphen, with its
 * attributes. No DOM. Comments are skipped; closing tags are not read. A `{...}` value is an
 * expression (JSX), never a literal value.
 */
export function readTags(lines: FenceLine[]): TagRead[] {
  const text = lines.map((l) => l.text).join('\n');
  const starts: number[] = [];
  let acc = 0;
  for (const l of lines) {
    starts.push(acc);
    acc += l.text.length + 1;
  }
  const lineAt = (off: number): number => {
    let idx = 0;
    for (let s = 0; s < starts.length; s++) if (off >= starts[s]) idx = s;
    return lines[idx]?.n ?? 0;
  };
  const comments: [number, number][] = [];
  for (const m of text.matchAll(/<!--[\s\S]*?(?:-->|$)/g)) comments.push([m.index ?? 0, (m.index ?? 0) + m[0].length]);
  const inComment = (off: number): boolean => comments.some(([a, b]) => off >= a && off < b);
  const out: TagRead[] = [];
  TAG_OPEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = TAG_OPEN_RE.exec(text)) !== null) {
    if (inComment(m.index)) continue;
    const t: TagRead = { tag: m[1], line: lineAt(m.index), attrs: [] };
    let i = m.index + m[0].length;
    for (;;) {
      while (i < text.length && /\s/.test(text[i])) i++;
      if (i >= text.length || text[i] === '>' || text[i] === '<') break;
      if (text[i] === '/' && text[i + 1] === '>') break;
      if (text[i] === '/') {
        i++;
        continue;
      }
      if (text[i] === '{') {
        // A JSX spread or comment: skip the balanced braces.
        let depth = 0;
        for (; i < text.length; i++) {
          if (text[i] === '{') depth++;
          else if (text[i] === '}' && --depth === 0) {
            i++;
            break;
          }
        }
        continue;
      }
      const nm = /^[^\s"'>/={}<]+/.exec(text.slice(i));
      if (!nm) {
        i++;
        continue;
      }
      const at = i;
      i += nm[0].length;
      let j = i;
      while (j < text.length && /[ \t]/.test(text[j])) j++;
      let value: string | undefined;
      let expression = false;
      if (text[j] === '=') {
        j++;
        while (j < text.length && /[ \t]/.test(text[j])) j++;
        const q = text[j];
        if (q === '"' || q === "'") {
          const end = text.indexOf(q, j + 1);
          value = end < 0 ? text.slice(j + 1) : text.slice(j + 1, end);
          i = end < 0 ? text.length : end + 1;
        } else if (q === '{') {
          expression = true;
          let depth = 0;
          let k = j;
          for (; k < text.length; k++) {
            if (text[k] === '{') depth++;
            else if (text[k] === '}' && --depth === 0) {
              k++;
              break;
            }
          }
          value = text.slice(j, k);
          i = k;
        } else {
          const uq = /^[^\s>]+/.exec(text.slice(j));
          value = uq ? uq[0] : '';
          i = j + value.length;
        }
      }
      t.attrs.push({ name: nm[0], value, expression, line: lineAt(at) });
    }
    out.push(t);
  }
  return out;
}

/** A-3: whether an attribute passes, and by which clause. */
export function attributeClause(name: string, el: ElementInfo): 'a' | 'b' | 'c' | undefined {
  if ((el.observed ?? []).includes(name)) return 'a';
  if (el.reads.has(name)) return 'b';
  if (GLOBAL_ATTRIBUTES.includes(name) || GLOBAL_ATTRIBUTE_RE.test(name)) return 'c';
  return undefined;
}

/** A-4: the enumerated values an attribute's value must be one of, or undefined when it is not value-checked. */
export function valueCheck(attr: { name: string; value?: string; expression: boolean }, el: ElementInfo): string[] | undefined {
  if (attr.value === undefined || attr.expression) return undefined;
  if (attr.value.includes('${') || attr.value.includes('{{')) return undefined;
  const prop = el.props.get(attr.name.replace(/-/g, '').toLowerCase());
  return prop?.values;
}

export interface CssDecl {
  property: string;
  value: string;
  line: number;
}

/** A-5's reading: every custom-property declaration (`--name: value`) in a css block. */
export function cssDeclarations(lines: FenceLine[]): CssDecl[] {
  const out: CssDecl[] = [];
  for (const l of lines) {
    for (const m of l.text.matchAll(/(?<![A-Za-z0-9_-])(--[A-Za-z0-9_-]+)\s*:\s*([^;{}]*)/g)) {
      out.push({ property: m[1], value: m[2], line: l.n });
    }
  }
  return out;
}

/**
 * A-5, as the text reads: the value contains `var(--name` for the declared name. The text is a
 * substring test, so a longer name that begins with the declared one (`var(--name-x)`) fires too.
 */
export function isSelfReference(d: CssDecl): boolean {
  return d.value.includes('var(' + d.property);
}

// ============================================================================
// One run
// ============================================================================

export interface Hit {
  doc: string;
  half: Half;
  string: string;
  occurrence: number;
  line: number;
}

export interface DocCounts {
  candidates: number;
  failing: number;
  optedOut: number;
}

export interface RunResult {
  docs: number;
  candidates: number;
  resolved: Record<Exclude<Resolution, 'fail' | 'file-name'>, number>;
  fileNames: number;
  declaredPaths: number;
  declaredPathsResolve: number;
  shapes: number;
  shapesPass: number;
  importLines: number;
  importLinesPass: number;
  /** A-2: hyphenated tags read, and those registered. */
  tags: number;
  tagsRegistered: number;
  /** A-3: attributes read on registered tags, and those that pass. */
  attributes: number;
  attributesPass: number;
  /** A-4: enumerated values checked, and those that pass. */
  values: number;
  valuesPass: number;
  /** A-5: custom-property declarations read, and the self-references among them. */
  cssDeclarations: number;
  cssSelfReferences: number;
  /** A-6: registered elements whose `observedAttributes` is not read, and all registered elements. */
  elementsNotRead: number;
  elements: number;
  optedOut: number;
  optedOutGeneric: number;
  optedOutConsumer: number;
  wouldFail: number;
  /** Every failing string the guard read, content-keyed (L-6). */
  hits: Hit[];
  /** A marker value outside the closed set: always a failure, never pendable. */
  badMarkers: { doc: string; line: number; value: string }[];
  perDoc: Map<string, DocCounts>;
}

export interface GuardInputs {
  repoRoot: string;
  docs: string[];
  tracked: string[];
  nameSet: NameSet;
  exportsMap: Record<string, unknown>;
  /** A-2: the registered tags (§ 8.11). */
  elements: Map<string, ElementInfo>;
}

/** Read every input from the repo; throws if any cannot be read. */
export function readInputs(repoRoot: string): GuardInputs {
  const exportsMap = loadExportsMap(repoRoot);
  assertBuiltTypes(repoRoot, exportsMap);
  const tracked = trackedFiles(repoRoot);
  return {
    repoRoot,
    docs: scopeDocs(repoRoot),
    tracked,
    nameSet: loadNameSet(path.join(repoRoot, 'token-index')),
    exportsMap,
    elements: loadElements(repoRoot, tracked),
  };
}

export function runGuard(inputs: GuardInputs): RunResult {
  const { repoRoot, docs, tracked, nameSet, exportsMap, elements } = inputs;
  if (docs.length === 0) throw new GuardInputError('the scope holds no docs');
  const pattern = candidatePattern(nameSet);
  const r: RunResult = {
    docs: docs.length,
    candidates: 0,
    resolved: { key: 0, channel: 0, namespace: 0, 'dtcg-path': 0, glob: 0 },
    fileNames: 0,
    declaredPaths: 0,
    declaredPathsResolve: 0,
    shapes: 0,
    shapesPass: 0,
    importLines: 0,
    importLinesPass: 0,
    tags: 0,
    tagsRegistered: 0,
    attributes: 0,
    attributesPass: 0,
    values: 0,
    valuesPass: 0,
    cssDeclarations: 0,
    cssSelfReferences: 0,
    elementsNotRead: [...elements.values()].filter((e) => e.observed === undefined).length,
    elements: elements.size,
    optedOut: 0,
    optedOutGeneric: 0,
    optedOutConsumer: 0,
    wouldFail: 0,
    hits: [],
    badMarkers: [],
    perDoc: new Map(),
  };
  const raw: Omit<Hit, 'occurrence'>[] = [];
  const importBlocks: { key: string; doc: string; lines: ImportLine[]; generic: boolean }[] = [];

  for (const doc of docs) {
    const full = path.join(repoRoot, doc);
    if (!fs.existsSync(full)) throw new GuardInputError(`scoped doc missing: ${doc}`);
    const parsed = parseMarkdown(fs.readFileSync(full, 'utf8'));
    const dc: DocCounts = { candidates: 0, failing: 0, optedOut: 0 };
    r.perDoc.set(doc, dc);
    for (const b of parsed.badMarkers) r.badMarkers.push({ doc, line: b.line, value: b.value });

    const tokenRegion = (text: string, line: number, generic: boolean): void => {
      for (const c of candidatesIn(text, line, pattern)) {
        const res = resolveCandidate(c.string, c.glob, nameSet);
        if (generic) {
          if (res === 'fail') r.wouldFail++;
          continue;
        }
        r.candidates++;
        dc.candidates++;
        if (res === 'fail') {
          raw.push({ doc, half: 'token-name', string: c.string, line: c.line });
          dc.failing++;
        } else if (res === 'file-name') r.fileNames++;
        else r.resolved[res]++;
      }
    };

    for (const s of parsed.spans) {
      const generic = s.marker === 'generic';
      if (s.marker) {
        r.optedOut++;
        dc.optedOut++;
        if (s.marker === 'generic') r.optedOutGeneric++;
        else r.optedOutConsumer++;
      }
      tokenRegion(s.text, s.line, generic);
    }

    parsed.fences.forEach((f, fi) => {
      const generic = f.marker === 'generic';
      const consumer = f.marker === 'consumer';
      if (f.marker) {
        r.optedOut++;
        dc.optedOut++;
        if (generic) r.optedOutGeneric++;
        else r.optedOutConsumer++;
      }
      // Token-name half: region (b) or (c).
      const program = PROGRAM_LANGS.includes(f.lang);
      for (const l of f.lines) {
        if (program) for (const lit of stringLiterals(l.text)) tokenRegion(lit, l.n, generic);
        else tokenRegion(l.text, l.n, generic);
      }
      // Declared path (L-3) and shape (L-1).
      const declared = declaredPath(f);
      if (declared !== undefined) {
        const resolves = resolveDeclaredPath(declared, tracked);
        if (generic || consumer) {
          if (!resolves) r.wouldFail++;
        } else {
          r.declaredPaths++;
          dc.candidates++;
          if (resolves) r.declaredPathsResolve++;
          else {
            raw.push({ doc, half: 'declared-path', string: declared, line: f.open });
            dc.failing++;
          }
        }
        if (isTokenFileName(path.posix.basename(declared))) {
          const pass = hasExportedDefineCall(f.lines.map((l) => l.text).join('\n'));
          if (generic) {
            if (!pass) r.wouldFail++;
          } else {
            r.shapes++;
            dc.candidates++;
            if (pass) r.shapesPass++;
            else {
              raw.push({ doc, half: 'shape', string: declared, line: f.open });
              dc.failing++;
            }
          }
        }
      }
      // Import surface.
      const lines = extractImportLines(f);
      if (lines.length > 0) importBlocks.push({ key: `${doc}#${fi}`, doc, lines, generic });
      // The attribute and value half (§ 8.11). Under generic every read is opted out (A-7);
      // under consumer only A-2's reads of unregistered tags are (A-2).
      const optOut = (failing: boolean): void => {
        dc.optedOut++;
        if (failing) r.wouldFail++;
      };
      const hit = (half: Half, string: string, line: number): void => {
        raw.push({ doc, half, string, line });
        dc.failing++;
      };
      if (HTML_FENCE_TAGS.includes(f.lang) || JSX_FENCE_TAGS.includes(f.lang)) {
        for (const t of readTags(f.lines)) {
          const el = elements.get(t.tag);
          if (generic) {
            optOut(!el);
            if (el) {
              for (const a of t.attrs) {
                const clause = attributeClause(a.name, el);
                optOut(!clause);
                const vals = clause === 'a' || clause === 'b' ? valueCheck(a, el) : undefined;
                if (vals) optOut(!vals.includes(a.value as string));
              }
            }
            continue;
          }
          if (!el) {
            if (consumer) optOut(true);
            else {
              r.tags++;
              dc.candidates++;
              hit('tag', t.tag, t.line);
            }
            continue;
          }
          r.tags++;
          r.tagsRegistered++;
          dc.candidates++;
          for (const a of t.attrs) {
            r.attributes++;
            dc.candidates++;
            const clause = attributeClause(a.name, el);
            if (!clause) {
              hit('attribute', a.name, a.line);
              continue;
            }
            r.attributesPass++;
            const vals = clause === 'a' || clause === 'b' ? valueCheck(a, el) : undefined;
            if (!vals) continue;
            r.values++;
            dc.candidates++;
            if (vals.includes(a.value as string)) r.valuesPass++;
            else hit('value', a.value as string, a.line);
          }
        }
      }
      if (CSS_FENCE_TAGS.includes(f.lang)) {
        for (const d of cssDeclarations(f.lines)) {
          const self = isSelfReference(d);
          if (generic) {
            optOut(self);
            continue;
          }
          r.cssDeclarations++;
          dc.candidates++;
          if (self) {
            r.cssSelfReferences++;
            hit('css-self-reference', d.property, d.line);
          }
        }
      }
    });
  }

  const checked = typeCheckImports(
    repoRoot,
    importBlocks.map((b) => ({ key: b.key, lines: b.lines })),
    exportsMap,
  );
  for (const b of importBlocks) {
    const ok = checked.get(b.key) ?? [];
    const dc = r.perDoc.get(b.doc)!;
    b.lines.forEach((l, i) => {
      if (b.generic) {
        if (!ok[i]) r.wouldFail++;
        return;
      }
      r.importLines++;
      dc.candidates++;
      if (ok[i]) r.importLinesPass++;
      else {
        raw.push({ doc: b.doc, half: 'import', string: l.specifier, line: l.line });
        dc.failing++;
      }
    });
  }

  if (r.candidates === 0) throw new GuardInputError('zero candidates: an empty scope or a broken pattern never reads as green');

  // Content keys (L-6): doc, half, string, occurrence index among this doc's failing hits of that string.
  const seen = new Map<string, number>();
  const ordered = raw.sort((a, b) => (a.doc < b.doc ? -1 : a.doc > b.doc ? 1 : a.line - b.line));
  for (const h of ordered) {
    const k = `${h.doc}\0${h.half}\0${h.string}`;
    const occ = seen.get(k) ?? 0;
    seen.set(k, occ + 1);
    r.hits.push({ ...h, occurrence: occ });
  }
  return r;
}

// ============================================================================
// The pending list (§ 2.4) and its baseline header (§ 8.6)
// ============================================================================

export interface PendingEntry {
  doc: string;
  half: Half;
  string: string;
  occurrence: number;
  /** Informational only (L-6). */
  line?: number;
  home: string;
}

export interface PendingFile {
  header: string;
  entries: PendingEntry[];
}

export interface Baseline {
  sha: string;
  date: string;
  /** The attribute half's adoption (§ 8.11). */
  attributeSha: string;
  attributeDate: string;
  entries: number;
  perHalf: Record<Half, number>;
}

export const HEADER_RE =
  /^adopted: ([0-9a-f]{7,40}) (\d{4}-\d{2}-\d{2}); attribute half adopted: ([0-9a-f]{7,40}) (\d{4}-\d{2}-\d{2}); entries: (\d+) \(token-name (\d+), declared-path (\d+), shape (\d+), import (\d+), tag (\d+), attribute (\d+), value (\d+), css-self-reference (\d+)\)$/;

export function parseHeader(header: string): Baseline {
  const m = HEADER_RE.exec(header);
  if (!m) throw new GuardInputError(`pending.json header is not the baseline form: ${JSON.stringify(header)}`);
  return {
    sha: m[1],
    date: m[2],
    attributeSha: m[3],
    attributeDate: m[4],
    entries: Number(m[5]),
    perHalf: {
      'token-name': Number(m[6]),
      'declared-path': Number(m[7]),
      shape: Number(m[8]),
      import: Number(m[9]),
      tag: Number(m[10]),
      attribute: Number(m[11]),
      value: Number(m[12]),
      'css-self-reference': Number(m[13]),
    },
  };
}

export function formatHeader(b: Baseline): string {
  const c = b.perHalf;
  return (
    `adopted: ${b.sha} ${b.date}; attribute half adopted: ${b.attributeSha} ${b.attributeDate}; entries: ${b.entries} ` +
    `(token-name ${c['token-name']}, declared-path ${c['declared-path']}, shape ${c.shape}, import ${c.import}, ` +
    `tag ${c.tag}, attribute ${c.attribute}, value ${c.value}, css-self-reference ${c['css-self-reference']})`
  );
}

export const PENDING_PATH = 'scripts/governance-examples/pending.json';

export function loadPending(file: string): PendingFile {
  if (!fs.existsSync(file)) throw new GuardInputError(`pending list missing: ${file}`);
  const p = JSON.parse(fs.readFileSync(file, 'utf8')) as PendingFile;
  if (typeof p.header !== 'string' || !Array.isArray(p.entries)) throw new GuardInputError(`pending list malformed: ${file}`);
  parseHeader(p.header);
  for (const e of p.entries) {
    if (!(HALVES as readonly string[]).includes(e.half)) throw new GuardInputError(`pending entry has an unknown half: ${JSON.stringify(e)}`);
  }
  return p;
}

export function entryKey(e: { doc: string; half: string; string: string; occurrence: number }): string {
  return `${e.doc}\0${e.half}\0${e.string}\0${e.occurrence}`;
}

export interface Verdict {
  /** A failing string not on the pending list. */
  unlisted: Hit[];
  /** A pending entry that no longer fails: the fixing PR removes it. */
  stale: PendingEntry[];
  /** A pending entry listed twice. */
  duplicate: PendingEntry[];
  badMarkers: RunResult['badMarkers'];
  pass: boolean;
}

export function judge(result: RunResult, pending: PendingFile): Verdict {
  const listed = new Map<string, PendingEntry>();
  const duplicate: PendingEntry[] = [];
  for (const e of pending.entries) {
    const k = entryKey(e);
    if (listed.has(k)) duplicate.push(e);
    else listed.set(k, e);
  }
  const hitKeys = new Set(result.hits.map(entryKey));
  const unlisted = result.hits.filter((h) => !listed.has(entryKey(h)));
  const stale = [...listed.values()].filter((e) => !hitKeys.has(entryKey(e)));
  const pass = unlisted.length === 0 && stale.length === 0 && duplicate.length === 0 && result.badMarkers.length === 0;
  return { unlisted, stale, duplicate, badMarkers: result.badMarkers, pass };
}

// ============================================================================
// The report (§ 8.6) and the census (§ 2.6)
// ============================================================================

export function formatReport(r: RunResult, pendingCount: number): string {
  const R = r.resolved.key + r.resolved.channel + r.resolved.namespace + r.resolved['dtcg-path'] + r.resolved.glob;
  return (
    `${r.candidates} candidates; ${R} resolve (${r.resolved.key} key, ${r.resolved.channel} channel, ` +
    `${r.resolved.namespace} namespace, ${r.resolved['dtcg-path']} dtcg-path, ${r.resolved.glob} glob); ` +
    `${r.fileNames} file names; ${r.declaredPaths} declared paths (${r.declaredPathsResolve} resolve); ` +
    `${r.shapes} token-file shapes (${r.shapesPass} pass); ${r.importLines} import lines (${r.importLinesPass} type-check); ` +
    `${r.tags} tags (${r.tagsRegistered} registered); ${r.attributes} attributes (${r.attributesPass} pass); ` +
    `${r.values} enumerated values (${r.valuesPass} pass); ${r.cssSelfReferences} css self-references; ` +
    `not read: ${r.elementsNotRead} of ${r.elements}; ` +
    `${r.optedOut} opted out (${r.optedOutGeneric} generic, ${r.optedOutConsumer} consumer; ${r.wouldFail} would fail if read); ` +
    `${pendingCount} pending`
  );
}

export function formatCensus(r: RunResult): string[] {
  const lines = [...r.perDoc.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([doc, c]) => `${doc}\t${c.candidates}:${c.failing}:${c.optedOut}`);
  const selected = r.candidates + r.declaredPaths + r.shapes + r.importLines;
  lines.push(
    `selected: ${selected} (${r.candidates} token-name candidates, ${r.declaredPaths} declared paths, ${r.shapes} token-file shapes, ${r.importLines} import lines) over ${r.docs} docs; predicate v${PREDICATE_VERSION}, file-shape rule v${FILE_SHAPE_RULE_VERSION}, attribute predicate v${ATTRIBUTE_PREDICATE_VERSION}`,
  );
  return lines;
}

function hitLine(h: { doc: string; half: string; string: string; occurrence: number; line?: number }): string {
  return `${h.doc}:${h.line ?? '?'}\t${h.half}\t${h.string}\t#${h.occurrence}`;
}

// ============================================================================
// CLI: `npx tsx scripts/governance-examples/check.ts [--census | --hits]`
// ============================================================================

if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const args = process.argv.slice(2);
  try {
    const inputs = readInputs(repoRoot);
    const result = runGuard(inputs);
    if (args.includes('--census')) {
      for (const l of formatCensus(result)) console.log(l);
      process.exit(0);
    }
    if (args.includes('--hits')) {
      for (const h of result.hits) console.log(hitLine(h));
      process.exit(0);
    }
    const pending = loadPending(path.join(repoRoot, PENDING_PATH));
    const v = judge(result, pending);
    console.log(formatReport(result, pending.entries.length));
    for (const h of v.unlisted) console.log(`FAIL (not pending)\t${hitLine(h)}`);
    for (const e of v.stale) console.log(`FAIL (stale pending entry: remove it)\t${hitLine(e)}`);
    for (const e of v.duplicate) console.log(`FAIL (duplicate pending entry)\t${hitLine(e)}`);
    for (const b of v.badMarkers) console.log(`FAIL (unknown marker value "${b.value}")\t${b.doc}:${b.line}`);
    process.exit(v.pass ? 0 : 1);
  } catch (err) {
    console.error((err as Error).message);
    process.exit(2);
  }
}
