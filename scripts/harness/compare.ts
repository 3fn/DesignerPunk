/**
 * compare — the compile harness's comparator (Spec 129 Task 2; design.md § 3). Owner: Thurgood.
 *
 * The module has four parts, in this order:
 *   1. the interface between the comparator and the two diagnostic parsers (fixed at 2.1;
 *      `parse-swift.ts` is Kenya's, 2.2, and `parse-kotlin.ts` is Data's, 2.3), and the key
 *      grammar in executable form (`parseKey`);
 *   2. the file-format readers: lists, pins, protected set, tags, records (2.4);
 *   3. `evaluate`, the verdict rules over already-read inputs: a pure function (2.4);
 *   4. `compareRepo`, which reads the head, the merge base and the issues root from git, and
 *      `main`, the command line the lanes call (2.4).
 *
 * The prose form of everything here, with the file formats and the command line, is
 * `harness/README.md`. Where the two differ, that is a defect; report it to the owner.
 *
 * The comparator reads git and the files of the repository it is pointed at, and nothing
 * else: no PR body, no credential, no network (Req 3.9).
 *
 * Contract every parser keeps (design § 3, "One comparator, two parsers"):
 *   - A parser is a pure function of its input. It reads no file, no environment variable,
 *     no network and no PR, and starts no process (Req 3.9; Task 2's credential grep).
 *   - It never throws on any log content: an empty log, a truncated log and a log with no
 *     diagnostic are all ordinary inputs. It throws only when its own input is malformed
 *     (a root that is not absolute, an unknown compile id).
 *   - It never parses for a verdict. It reports what the log and the exit status say;
 *     the comparator decides.
 *   - Every key it returns satisfies `parseKey`.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/** The three key roots (design § 1 K-2; tasks.md § "The `gen:` path rule"). */
export type RootName = 'gen' | 'pkg' | 'probe';

export const ROOT_NAMES: readonly RootName[] = ['gen', 'pkg', 'probe'];

/**
 * The absolute folders a diagnostic's path is made relative to. Each is an absolute POSIX
 * path; a trailing `/` is allowed and ignored. The lane that runs the compile computes them
 * and passes them in, in the same form as the paths it gave the compiler (if it gave the
 * compiler `realpath`'d files, it passes `realpath`'d roots).
 *
 * A diagnostic path P is under root R when P begins with R followed by `/`. When P is under
 * more than one root, the longest R wins: with a consumer `output` of `.`, `gen` is the
 * consumer root and `pkg` (inside `node_modules`) is longer, so a package file keys as `pkg:`.
 */
export interface Roots {
  /**
   * The platform's generated output folder: `platforms.<platform>.output` from the consumer's
   * config, else `output`, resolved as the CLI resolves it (relative to the config file's
   * folder). Never a hard-coded path (tasks.md § "The `gen:` path rule").
   */
  gen: string;
  /** The installed package's root: `<consumer root>/node_modules/@3fn/core`. */
  pkg: string;
  /** The folder holding the generated probe source (iOS `Probe.swift`; Android `:probe`'s sources). */
  probe: string;
}

/**
 * One id per compile a context can run. iOS: the four `swiftc` stages of design § 1 K-1
 * (T, P, C and the Swift 5 baseline T5). Android: the three `compileDebugKotlin` tasks of
 * design § 2's one Gradle invocation (`:tokens`, `:probe`, `:dp`).
 */
export type SwiftCompileId = 'ios.T' | 'ios.P' | 'ios.C' | 'ios.T5';
export type KotlinCompileId = 'android.tokens' | 'android.probe' | 'android.dp';
export type CompileId = SwiftCompileId | KotlinCompileId;

/** The Gradle task each Kotlin compile id stands for. */
export const KOTLIN_COMPILE_TASKS: Readonly<Record<KotlinCompileId, string>> = {
  'android.tokens': ':tokens:compileDebugKotlin',
  'android.probe': ':probe:compileDebugKotlin',
  'android.dp': ':dp:compileDebugKotlin',
};

/**
 * What the build tool says happened to one compile.
 *   - `succeeded`: it ran and reported success (Swift: exit status 0).
 *   - `failed`: it ran and reported failure (Swift: any non-zero exit status, a signal included).
 *   - `not-run`: the run holds no outcome for it.
 */
export type CompileOutcome = 'succeeded' | 'failed' | 'not-run';

/** One compile's parsed result. */
export interface CompileResult {
  compile: CompileId;
  outcome: CompileOutcome;
  /**
   * Error diagnostics located under a root, as key → count, count ≥ 1. The count is the
   * number of diagnostics in this compile with that key. Warnings and notes are never here.
   */
  diagnostics: ReadonlyMap<string, number>;
  /**
   * Error diagnostics that carry a file path that is not absolute or is under no root: the
   * diagnostic's first line, as printed. A path that cannot be made a valid key (it holds
   * ` | `, a tab, or a `.` or `..` segment) goes here too. Never dropped: the comparator fails
   * the context as `parser` when any is present, because a key it cannot place could hide a
   * failure.
   */
  unrooted: readonly string[];
}

// ---------------------------------------------------------------------------------------------
// The Swift parser (scripts/harness/parse-swift.ts, Kenya, 2.2)
// ---------------------------------------------------------------------------------------------

/** One `swiftc` stage's output. The lane calls the parser once per stage it ran. */
export interface SwiftParseInput {
  compile: SwiftCompileId;
  /** The stage's captured stdout and stderr, as one string. */
  log: string;
  /** `swiftc`'s exit status for the stage. */
  exitCode: number;
  roots: Roots;
}

/**
 * `parse-swift.ts` exports `parseSwift` with exactly this type (as `export const parseSwift:
 * ParseSwift = …` or as an `export function` with the same signature).
 *
 * `outcome` is `succeeded` for exit status 0 and `failed` otherwise; the Swift parser never
 * returns `not-run` (a stage the lane did not run, such as a blocked Stage P, is never passed
 * to it). Only `^<path>:<line>:<col>: error: ` lines are keys (design § 1 K-2); an `error:`
 * line with no `path:line:col` is not a key and not `unrooted` either.
 */
export type ParseSwift = (input: SwiftParseInput) => CompileResult;

// ---------------------------------------------------------------------------------------------
// The Kotlin parser (scripts/harness/parse-kotlin.ts, Data, 2.3)
// ---------------------------------------------------------------------------------------------

/** The one Gradle invocation's output (design § 2: one invocation per context, `--continue`). */
export interface KotlinParseInput {
  /** The invocation's captured console output (`--console=plain`), as one string. */
  log: string;
  /** Gradle's exit status. */
  exitCode: number;
  /** `:tokens` and `:dp` compile the same generated files, so they share `gen`. */
  roots: Roots;
}

export interface KotlinParseResult {
  /**
   * Exactly three results, in the order `android.tokens`, `android.probe`, `android.dp`.
   * Each task's `outcome` comes from its `> Task <task>` lines: `failed` when a line for it
   * ends ` FAILED`; else `succeeded` when a line for it carries no suffix, `UP-TO-DATE` or
   * `FROM-CACHE`; else `not-run` (no line, or `SKIPPED` or `NO-SOURCE`).
   */
  compiles: readonly CompileResult[];
  /**
   * `e:` diagnostics the parser cannot attribute to exactly one of the three compile tasks:
   * the diagnostic's first line, as printed. `:tokens` and `:dp` report the same generated
   * paths, so attribution is by the task the diagnostic was printed under, never by path.
   * Never dropped: the comparator fails every context of the run as `parser` when any is
   * present.
   */
  unattributed: readonly string[];
  /**
   * True when the log carries Gradle's closing `BUILD SUCCESSFUL` or `BUILD FAILED` line.
   * A log without one was cut off, so a task with no ` FAILED` line may not have finished;
   * the comparator fails every context of the run as `pre-compile` when this is false.
   */
  logComplete: boolean;
  /** Gradle's exit status, as passed in. */
  exitCode: number;
}

/**
 * `parse-kotlin.ts` exports `parseKotlin` with exactly this type (as `export const parseKotlin:
 * ParseKotlin = …` or as an `export function` with the same signature).
 */
export type ParseKotlin = (input: KotlinParseInput) => KotlinParseResult;

// ---------------------------------------------------------------------------------------------
// The key grammar, executable (harness/README.md § "Keys")
// ---------------------------------------------------------------------------------------------

export interface ParsedKey {
  root: RootName;
  /** POSIX, relative to the root: no leading `/`, no empty, `.` or `..` segment. */
  path: string;
  /** Non-empty, with no leading or trailing whitespace. */
  message: string;
}

const KEY_SEPARATOR = ' | ';

/**
 * Splits a key `<root>:<path> | <message>` into its parts, or returns null when it is not a
 * well-formed key. The split is at the first ` | ` after `<root>:`, so a path never holds
 * ` | ` and a message may. No part may hold a tab, CR or LF.
 */
export function parseKey(key: string): ParsedKey | null {
  if (/[\t\r\n]/.test(key)) return null;
  const colon = key.indexOf(':');
  if (colon < 0) return null;
  const root = key.slice(0, colon);
  if (!(ROOT_NAMES as readonly string[]).includes(root)) return null;
  const rest = key.slice(colon + 1);
  const sep = rest.indexOf(KEY_SEPARATOR);
  if (sep < 0) return null;
  const path = rest.slice(0, sep);
  const message = rest.slice(sep + KEY_SEPARATOR.length);
  if (path.length === 0 || path.startsWith('/')) return null;
  if (path.split('/').some((seg) => seg === '' || seg === '.' || seg === '..')) return null;
  if (message.length === 0 || message !== message.trim()) return null;
  return { root: root as RootName, path, message };
}

/** Builds a key from its parts; throws when the result would not satisfy `parseKey`. */
export function formatKey(root: RootName, path: string, message: string): string {
  const key = `${root}:${path}${KEY_SEPARATOR}${message}`;
  const parsed = parseKey(key);
  if (parsed === null || parsed.path !== path || parsed.message !== message) {
    throw new Error(`formatKey: not a well-formed key: ${JSON.stringify(key)}`);
  }
  return key;
}

// =============================================================================================
// Part 2: the file formats (harness/README.md § "The expected-failure lists", § "The pin
// file", § "The protected set"), the contexts, tags and records
// =============================================================================================

export const CONTEXTS = [
  'harness-ios-tokens',
  'harness-ios-components',
  'harness-android-tokens',
  'harness-android-components',
] as const;
export type ContextName = (typeof CONTEXTS)[number];
export type Platform = 'ios' | 'android';
/** The two file tiers a floor is counted for (Req 3.4): generated files and package files. */
export type Tier = 'gen' | 'pkg';

export interface ContextSpec {
  platform: Platform;
  kind: 'tokens' | 'components';
  /** Token contexts: the compile of the generated files, and the probe compile that reads them. */
  tokenCompile?: CompileId;
  probeCompile?: CompileId;
  /** Component contexts: the combined compile, and the baseline compile of the generated files alone (Req 2.6). */
  componentCompile?: CompileId;
  baselineCompile?: CompileId;
  /** The tiers whose file count is checked against the floor. */
  tiers: readonly Tier[];
}

export const CONTEXT_SPECS: Readonly<Record<ContextName, ContextSpec>> = {
  'harness-ios-tokens': { platform: 'ios', kind: 'tokens', tokenCompile: 'ios.T', probeCompile: 'ios.P', tiers: ['gen'] },
  'harness-ios-components': { platform: 'ios', kind: 'components', componentCompile: 'ios.C', baselineCompile: 'ios.T5', tiers: ['gen', 'pkg'] },
  'harness-android-tokens': { platform: 'android', kind: 'tokens', tokenCompile: 'android.tokens', probeCompile: 'android.probe', tiers: ['gen'] },
  'harness-android-components': { platform: 'android', kind: 'components', componentCompile: 'android.dp', baselineCompile: 'android.tokens', tiers: ['gen', 'pkg'] },
};

export const PINS_PATH = 'harness/pins.yaml';
export const PROTECTED_SET_PATH = 'harness/protected-set.txt';
export const ISSUES_DIR = '.kiro/issues';
export const listPath = (context: ContextName): string => `harness/expected/${context}.tsv`;

/** Code-point order: for UTF-8 text, the order of `LC_ALL=C sort`. */
export function codePointCompare(a: string, b: string): number {
  return Buffer.compare(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
}

const RECORD_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*\.md$/;
const ITEM_LABEL = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const OWNER_NAME = /^[A-Z][A-Za-z]*$/;

export interface Tag {
  record: string;
  label: string | null;
  /** The tag as written in the list. */
  text: string;
}

export function parseTag(text: string): Tag | null {
  const hash = text.indexOf('#');
  const record = hash < 0 ? text : text.slice(0, hash);
  const label = hash < 0 ? null : text.slice(hash + 1);
  if (!RECORD_NAME.test(record)) return null;
  if (label !== null && !ITEM_LABEL.test(label)) return null;
  return { record, label, text };
}

export interface Retagged {
  date: string;
  owner: string;
  fromRecord: string;
}

export function parseRetagged(field: string): Retagged | null {
  const m = /^retagged=(\d{4})-(\d{2})-(\d{2}),([^,]*),([^,]*)$/.exec(field);
  if (!m) return null;
  const [, y, mo, d, owner, fromRecord] = m;
  const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
  if (date.getUTCFullYear() !== Number(y) || date.getUTCMonth() !== Number(mo) - 1 || date.getUTCDate() !== Number(d)) return null;
  if (!OWNER_NAME.test(owner) || !RECORD_NAME.test(fromRecord)) return null;
  return { date: `${y}-${mo}-${d}`, owner, fromRecord };
}

export interface ListEntry {
  key: string;
  count: number;
  tag: Tag;
  retagged: Retagged | null;
  /** 1-based line number in the file. */
  line: number;
}

export interface ParsedList {
  entries: ListEntry[];
  /** Each `line <n>: <why>`, or a whole-file reason. Empty when the file is well formed. */
  errors: string[];
}

/** Splits a text file into lines, recording the LF, CR and final-newline rules as errors. */
function splitLines(text: string, errors: string[]): string[] {
  if (text.length === 0) return [];
  if (text.includes('\r')) errors.push('a CR character: line endings must be LF');
  if (!text.endsWith('\n')) errors.push('no newline after the last line');
  const lines = text.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}

export function parseList(text: string): ParsedList {
  const errors: string[] = [];
  const entries: ListEntry[] = [];
  const lines = splitLines(text, errors);
  let seenEntry = false;
  lines.forEach((ln, i) => {
    const n = i + 1;
    if (ln === '') {
      errors.push(`line ${n}: a blank line`);
      return;
    }
    if (ln.startsWith('#')) {
      if (seenEntry) errors.push(`line ${n}: a comment below the first entry`);
      return;
    }
    seenEntry = true;
    const f = ln.split('\t');
    if (f.length < 3 || f.length > 4) {
      errors.push(`line ${n}: ${f.length} tab-separated fields; an entry has 3 or 4`);
      return;
    }
    const [key, countText, tagText, retaggedText] = f;
    if (parseKey(key) === null) {
      errors.push(`line ${n}: not a well-formed key: ${key}`);
      return;
    }
    if (!/^[1-9][0-9]*$/.test(countText)) {
      errors.push(`line ${n}: the count "${countText}" is not an integer of 1 or more`);
      return;
    }
    const tag = parseTag(tagText);
    if (tag === null) {
      errors.push(`line ${n}: the tag "${tagText}" is not <record>.md or <record>.md#<item label>`);
      return;
    }
    let retagged: Retagged | null = null;
    if (retaggedText !== undefined) {
      retagged = parseRetagged(retaggedText);
      if (retagged === null) {
        errors.push(`line ${n}: the fourth field "${retaggedText}" is not retagged=<YYYY-MM-DD>,<owner>,<from-record>`);
        return;
      }
    }
    entries.push({ key, count: Number(countText), tag, retagged, line: n });
  });
  for (let i = 1; i < entries.length; i++) {
    const a = entries[i - 1];
    const b = entries[i];
    const k = codePointCompare(a.key, b.key);
    const t = codePointCompare(a.tag.text, b.tag.text);
    if (k > 0 || (k === 0 && t > 0)) errors.push(`line ${b.line}: out of order (entries sort by key, then tag, by code point)`);
    else if (k === 0 && t === 0) errors.push(`line ${b.line}: the same key and tag as line ${a.line}`);
  }
  return { entries, errors };
}

/** The summed count per key (a key split across tags is summed, Req 3.2). */
export function sumByKey(entries: readonly ListEntry[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const e of entries) m.set(e.key, (m.get(e.key) ?? 0) + e.count);
  return m;
}

export interface ParsedProtectedSet {
  names: string[];
  errors: string[];
}

export function parseProtectedSet(text: string): ParsedProtectedSet {
  const errors: string[] = [];
  const names: string[] = [];
  splitLines(text, errors).forEach((ln, i) => {
    const n = i + 1;
    if (!RECORD_NAME.test(ln)) {
      errors.push(`line ${n}: "${ln}" is not a record file name`);
      return;
    }
    if (names.length > 0) {
      const c = codePointCompare(names[names.length - 1], ln);
      if (c > 0) errors.push(`line ${n}: out of order (code point)`);
      if (c === 0) errors.push(`line ${n}: a duplicate name`);
    }
    names.push(ln);
  });
  return { names, errors };
}

export interface ParsedPins {
  /** The parsed document, in a canonical form (sorted keys), for exception (a). Null when it did not parse. */
  canonical: string | null;
  toolchain: Record<Platform, Record<string, string>>;
  errors: string[];
}

const isMapping = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v) && !(v instanceof Date);

function canonicalJson(v: unknown): string {
  if (v instanceof Date) return JSON.stringify(v.toISOString());
  if (Array.isArray(v)) return `[${v.map(canonicalJson).join(',')}]`;
  if (isMapping(v)) {
    const keys = Object.keys(v).sort(codePointCompare);
    return `{${keys.map((k) => `${JSON.stringify(k)}:${canonicalJson(v[k])}`).join(',')}}`;
  }
  return JSON.stringify(v) ?? 'null';
}

export function parsePins(text: string): ParsedPins {
  const errors: string[] = [];
  const toolchain: Record<Platform, Record<string, string>> = { ios: {}, android: {} };
  let doc: unknown;
  try {
    doc = yaml.load(text);
  } catch (e) {
    errors.push(`does not parse as YAML: ${String((e as Error).message).split('\n')[0]}`);
    return { canonical: null, toolchain, errors };
  }
  const canonical = canonicalJson(doc);
  if (!isMapping(doc)) {
    errors.push('the document is not a mapping');
    return { canonical, toolchain, errors };
  }
  for (const k of Object.keys(doc)) {
    if (k !== 'consumer' && k !== 'ios' && k !== 'android') errors.push(`top-level key "${k}" is not consumer, ios or android`);
  }
  for (const section of ['consumer', 'ios', 'android'] as const) {
    if (!isMapping(doc[section])) errors.push(`section "${section}" is missing or not a mapping`);
  }
  for (const platform of ['ios', 'android'] as const) {
    const section = doc[platform];
    if (!isMapping(section)) continue;
    const tc = section.toolchain;
    if (!isMapping(tc) || Object.keys(tc).length === 0) {
      errors.push(`"${platform}.toolchain" is missing, empty or not a mapping`);
      continue;
    }
    for (const [field, value] of Object.entries(tc)) {
      if (typeof value !== 'string') errors.push(`"${platform}.toolchain.${field}" is not a quoted string`);
      else toolchain[platform][field] = value;
    }
  }
  return { canonical, toolchain, errors };
}

/** The first `**Trigger**: ` line's backticked token, per `.kiro/issues/README.md` rule 1. */
export function triggerOf(text: string): { line: string | null; token: string | null } {
  const line = text.split('\n').find((l) => l.startsWith('**Trigger**: ')) ?? null;
  if (line === null) return { line: null, token: null };
  const m = /^\*\*Trigger\*\*: `([^`]*)`/.exec(line);
  return { line, token: m ? m[1] : null };
}

export type TokenKind = 'manual' | 'path' | 'merge' | 'tag' | 'release' | 'untokened';

/** Mirrors `scripts/issues-owned.sh`'s token reading, so the two agree on what fires. */
export function tokenKind(token: string): TokenKind {
  if (token === 'manual') return 'manual';
  if (token.startsWith('path:') && token.length > 'path:'.length) {
    const globs = token.slice('path:'.length);
    if (`,${globs},`.includes(',,') || globs.includes(', ') || globs.includes(' ,')) return 'untokened';
    return 'path';
  }
  if (/^merge:#[0-9]+$/.test(token)) return 'merge';
  if (/^tag:.+$/.test(token)) return 'tag';
  if (/^release:.+:phase-1$/.test(token)) return 'release';
  return 'untokened';
}

/**
 * Whether an item label occurs in a record as a whole token: the character before it is not one
 * of `[A-Za-z0-9._-]`, and the character after it is not one of `[A-Za-z0-9_-]` and is not a `.`
 * followed by a letter or digit. So a label ending a sentence ("item A5.") is found, and "A5"
 * is not found inside "A5.1" or "A5-x".
 */
export function labelFound(text: string, label: string): boolean {
  const esc = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^A-Za-z0-9._-])${esc}(?![A-Za-z0-9_-])(?!\\.[A-Za-z0-9])`, 'm').test(text);
}

/** A record as the head holds it. */
export interface RecordInfo {
  where: 'root' | 'archive' | 'missing';
  text: string | null;
  /** The Trigger token; null when the record has no `**Trigger**:` line with a backticked token. */
  token: string | null;
  /** `FIRED@<sha or tag>` when the Trigger has fired (README rule 11's lapse); else null. */
  fired: string | null;
}

// =============================================================================================
// Part 3: the verdict rules over already-read inputs (Req 3.3–3.8, 3.11; design § 3 rules 1–5)
// =============================================================================================

/** What the lanes hand the comparator for one context, after the parsers ran. */
export interface ContextResults {
  /** Every compile result of the run. A compile the context reads that is absent counts as `not-run`. */
  compiles: readonly CompileResult[];
  /** Android only: from `KotlinParseResult`. */
  unattributed?: readonly string[];
  logComplete?: boolean;
  /** Per tier: the files the lane gave the compiler, and the floor it computed at run time (Req 3.4). */
  files: Partial<Record<Tier, { compiled: number; floor: number }>>;
  /** The toolchain the lane read, as field → value (Req 3.11). */
  toolchain: Readonly<Record<string, string>>;
  /**
   * The run file's `checks` (design § 3, "The probe's count lines and the run file's `checks`"):
   * the lane's gating results, one per count line and per-run check. Each `ok: false` fails the
   * context as class `check`, named in the verdict line. Absent (the run file had no `checks`
   * array) also fails it as class `check`; an empty array does not.
   */
  checks?: readonly RunCheck[];
}

/** One gating result a lane wrote into its run file (`harness/README.md` § "The comparator's command line"). */
export interface RunCheck {
  name: string;
  ok: boolean;
  detail: string;
}

/** The head, as read. A null text is a file absent at the head. */
export interface HeadState {
  lists: Readonly<Record<ContextName, string | null>>;
  pins: string | null;
  protectedSet: string | null;
  record: (name: string) => RecordInfo;
  /** Set when the history the tag rules read is not all present (a shallow clone). */
  historyError: string | null;
}

/** The merge base, as read. A null text is a file absent at a readable base. */
export type BaseState =
  | { kind: 'none' }
  | { kind: 'unreadable'; reason: string }
  | {
      kind: 'readable';
      sha: string;
      lists: Readonly<Record<ContextName, string | null>>;
      pins: string | null;
      protectedSet: string | null;
      /** `git diff --name-only --no-renames <base> <head>`. */
      changedPaths: readonly string[];
      /** A record's text at the base (root, else archive), or null. */
      recordText: (name: string) => string | null;
    };

export interface EvalInput {
  context: ContextName;
  results: ContextResults;
  head: HeadState;
  base: BaseState;
}

export type FailureClass =
  | 'input'
  | 'format'
  | 'toolchain'
  | 'pre-compile'
  | 'parser'
  | 'baseline missing'
  | 'floor'
  | 'new'
  | 'count-above'
  | 'count-below'
  | 'stale'
  | 'base unreadable'
  | 'history unreadable'
  | 'addition'
  | 'tag'
  | 'retag'
  | 'protected-set'
  | 'check';

export interface Failure {
  cls: FailureClass;
  detail: string;
  /** Class `check` only: the check's name, or `no checks array`; the verdict line lists it. */
  name?: string;
}

export interface Report {
  context: ContextName;
  pass: boolean;
  failures: Failure[];
  /** Printed lines that are not failures: `added (a):`, `added (b):`, `unmasked:`, `retagged:`, `probe:`. */
  notes: string[];
  /** The Req 3.8 summary line. */
  summary: string;
  /** The verdict line, printed last. */
  verdict: string;
  /** The keys this context observed, after the tier selection (for `--emit-observed`). */
  observed: Map<string, number>;
  counts: {
    expected: number;
    observed: number;
    newFailures: number;
    stale: number;
    countChanged: number;
    additions: { a: number; b: number; c: number };
    retags: number;
    remaining: number;
    crossTier: number;
  };
}

/** The name a missing `checks` array fails under (the verdict line lists it). */
export const NO_CHECKS_NAME = 'no checks array';

const notRun = (compile: CompileId): CompileResult => ({ compile, outcome: 'not-run', diagnostics: new Map(), unrooted: [] });

const total = (m: ReadonlyMap<string, number>): number => {
  let n = 0;
  for (const v of m.values()) n += v;
  return n;
};

export function formatFailure(f: Failure): string {
  return `FAIL ${f.cls}: ${f.detail}`;
}

export function evaluate(input: EvalInput): Report {
  const { context, results, head, base } = input;
  const spec = CONTEXT_SPECS[context];
  const failures: Failure[] = [];
  const notes: string[] = [];
  const fail = (cls: FailureClass, detail: string): void => {
    failures.push({ cls, detail });
  };

  // --- the compiles (design § 3 rule 1; rule 5's baseline) ---
  const byId = new Map<CompileId, CompileResult>();
  for (const r of results.compiles) {
    if (byId.has(r.compile)) fail('input', `two results for ${r.compile}`);
    byId.set(r.compile, r);
  }
  const get = (id: CompileId): CompileResult => byId.get(id) ?? notRun(id);

  if (spec.platform === 'android') {
    if (results.logComplete === undefined) fail('input', 'an Android context needs logComplete from parseKotlin');
    else if (!results.logComplete) fail('pre-compile', 'the Gradle log has no closing BUILD SUCCESSFUL or BUILD FAILED line');
    for (const line of results.unattributed ?? []) fail('parser', `a diagnostic not attributed to exactly one compile task: ${line}`);
  }

  const checkRan = (r: CompileResult): void => {
    for (const line of r.unrooted) fail('parser', `${r.compile}: a diagnostic under no root: ${line}`);
    const parsed = total(r.diagnostics) + r.unrooted.length;
    if (r.outcome === 'failed' && parsed === 0) fail('pre-compile', `${r.compile} exited non-zero with no parsed error`);
    if (r.outcome === 'succeeded' && parsed > 0) fail('parser', `${r.compile} exited zero with ${parsed} parsed error(s)`);
  };

  const observed = new Map<string, number>();
  const add = (k: string, n: number): void => {
    observed.set(k, (observed.get(k) ?? 0) + n);
  };
  let probeBlocked = false;
  let crossTier = 0;

  if (spec.kind === 'tokens') {
    const t = get(spec.tokenCompile as CompileId);
    const p = get(spec.probeCompile as CompileId);
    if (t.outcome === 'not-run') fail('pre-compile', `${t.compile} has no outcome in this run`);
    else checkRan(t);
    if (p.outcome === 'not-run') {
      if (t.outcome === 'failed') {
        probeBlocked = true;
        notes.push(`probe: blocked (${t.compile} failed); its count is not compared`);
      } else if (t.outcome === 'succeeded') {
        fail('pre-compile', `${p.compile} has no outcome in this run, and ${t.compile} did not fail`);
      } else {
        // The token compile has no outcome either; that failure is already recorded.
        probeBlocked = true;
      }
    } else checkRan(p);
    for (const r of [t, p]) for (const [k, n] of r.diagnostics) add(k, n);
  } else {
    const c = get(spec.componentCompile as CompileId);
    const b = get(spec.baselineCompile as CompileId);
    if (c.outcome === 'not-run') fail('pre-compile', `${c.compile} has no outcome in this run`);
    else checkRan(c);
    if (b.outcome === 'not-run') fail('baseline missing', `${b.compile} has no result in this run, so cross-tier keys cannot be decided`);
    else checkRan(b);
    for (const [k, n] of c.diagnostics) {
      const pk = parseKey(k);
      if (pk !== null && pk.root === 'gen') {
        // Cross-tier, per key (design § 3 rule 5): a gen: key the combined compile reports and the
        // baseline does not report at all is kept, at its full count; a gen: key the baseline also
        // reports belongs to the token context and is dropped, whatever the two counts.
        if (b.outcome !== 'not-run' && !b.diagnostics.has(k)) {
          add(k, n);
          crossTier++;
        }
      } else {
        add(k, n);
      }
    }
  }

  // --- the lane's own gating results: the run file's checks (design § 3) ---
  if (results.checks === undefined) {
    failures.push({ cls: 'check', name: NO_CHECKS_NAME, detail: 'the run file has no checks array' });
  } else {
    for (const c of results.checks) {
      if (!c.ok) failures.push({ cls: 'check', name: c.name, detail: c.detail === '' ? c.name : `${c.name}: ${c.detail}` });
    }
  }

  // --- the toolchain match (Req 3.11) and the pin file at the head ---
  let headPins: ParsedPins | null = null;
  if (head.pins === null) fail('format', `${PINS_PATH} is missing at the head`);
  else {
    headPins = parsePins(head.pins);
    for (const e of headPins.errors) fail('format', `${PINS_PATH}: ${e}`);
    if (headPins.errors.length === 0) {
      const pinned = headPins.toolchain[spec.platform];
      const seen = results.toolchain;
      for (const field of Object.keys(pinned).sort(codePointCompare)) {
        if (!(field in seen)) fail('toolchain', `${spec.platform}.toolchain.${field} is pinned "${pinned[field]}" and the lane reported no value`);
        else if (seen[field] !== pinned[field]) fail('toolchain', `${spec.platform}.toolchain.${field} observed "${seen[field]}", pinned "${pinned[field]}"`);
      }
      for (const field of Object.keys(seen).sort(codePointCompare)) {
        if (!(field in pinned)) fail('toolchain', `the lane reported ${field} "${seen[field]}", which ${PINS_PATH} does not pin`);
      }
    }
  }

  // --- the floor (Req 3.4) ---
  for (const tier of spec.tiers) {
    const f = results.files[tier];
    if (f === undefined) fail('input', `no file count for the ${tier} tier`);
    else if (f.compiled === 0) fail('floor', `${tier}: 0 files reached the compiler`);
    else if (f.floor <= 0) fail('floor', `${tier}: the floor computed at run time is ${f.floor}`);
    else if (f.compiled < f.floor) fail('floor', `${tier}: ${f.compiled} files reached the compiler, below the floor of ${f.floor}`);
  }

  // --- the list at the head; the two-sided comparison (Req 3.3) ---
  const lp = listPath(context);
  let headList: ParsedList | null = null;
  const headListText = head.lists[context];
  if (headListText === null) fail('format', `${lp} is missing at the head`);
  else {
    headList = parseList(headListText);
    for (const e of headList.errors) fail('format', `${lp}: ${e}`);
  }
  const expected = headList ? sumByKey(headList.entries) : new Map<string, number>();
  let newFailures = 0;
  let stale = 0;
  let countChanged = 0;
  if (headList && headList.errors.length === 0) {
    for (const k of [...observed.keys()].sort(codePointCompare)) {
      const o = observed.get(k) as number;
      const e = expected.get(k);
      if (e === undefined) {
        newFailures++;
        fail('new', `${k} (observed ${o}; not on the list)`);
      } else if (o > e) {
        countChanged++;
        fail('count-above', `${k} (observed ${o}, listed ${e})`);
      } else if (o < e) {
        countChanged++;
        fail('count-below', `${k} (observed ${o}, listed ${e})`);
      }
    }
    for (const k of [...expected.keys()].sort(codePointCompare)) {
      if (observed.has(k)) continue;
      if (probeBlocked && parseKey(k)?.root === 'probe') continue;
      stale++;
      fail('stale', `${k} (listed ${expected.get(k)}; not observed)`);
    }
  }

  // --- tags resolve and can fire (Req 3.6; requirements.md Conventions, "Can fire") ---
  if (headList) {
    const done = new Set<string>();
    for (const e of headList.entries) {
      if (done.has(e.tag.text)) continue;
      done.add(e.tag.text);
      const why = tagFault(e.tag, head.record);
      if (why !== null) fail('tag', `${e.tag.text} ${why} (first on ${e.key})`);
    }
  }
  if (head.historyError !== null) fail('history unreadable', head.historyError);

  // --- the protected set at the head ---
  let headSet: ParsedProtectedSet | null = null;
  if (head.protectedSet === null) fail('format', `${PROTECTED_SET_PATH} is missing at the head`);
  else {
    headSet = parseProtectedSet(head.protectedSet);
    for (const e of headSet.errors) fail('format', `${PROTECTED_SET_PATH}: ${e}`);
  }

  // --- against the merge base: additions (Req 3.5), retags and the protected set (Req 3.7) ---
  const additions = { a: 0, b: 0, c: 0 };
  let retags = 0;
  if (base.kind === 'unreadable') fail('base unreadable', base.reason);
  if (base.kind === 'readable' && headList) {
    const baseRead = readBase(base, context);
    for (const r of baseRead.unreadable) fail('base unreadable', r);
    if (baseRead.unreadable.length === 0) {
      const baseList = baseRead.list;
      if (baseList === null) {
        // Exception (b): the list is absent at a readable base (the baseline run).
        for (const e of headList.entries) {
          additions.b++;
          notes.push(`added (b): ${e.key}\t${e.count}\t${e.tag.text}`);
        }
      } else {
        const baseSum = sumByKey(baseList.entries);
        // Exception (a): the parsed pin file differs, or is absent at the base (an absent pin file
        // is read as every pin changing).
        const pinsChanged = baseRead.pinsCanonical === null || (headPins !== null && headPins.canonical !== baseRead.pinsCanonical);
        const lowered = platformLowered(base, head, spec.platform);
        for (const k of [...expected.keys()].sort(codePointCompare)) {
          const delta = (expected.get(k) as number) - (baseSum.get(k) ?? 0);
          if (delta <= 0) continue;
          const tags = headList.entries.filter((e) => e.key === k).map((e) => e.tag.text).join(',');
          const pk = parseKey(k);
          const editsFile = pk !== null && pk.root === 'pkg' && base.changedPaths.includes(pk.path);
          if (pinsChanged) {
            additions.a++;
            notes.push(`added (a): ${k} +${delta} ${tags}`);
          } else if (lowered !== null || editsFile) {
            additions.c++;
            const why = editsFile ? `the diff edits ${(pk as ParsedKey).path}` : `the diff lowers ${lowered}`;
            notes.push(`unmasked: ${k} +${delta} ${tags} (${why})`);
          } else {
            fail('addition', `${k} (+${delta} over the merge base; none of exceptions (a), (b) or (c) holds)`);
          }
        }
        retags = checkRetags(baseList, headList, baseRead.protectedNames, headSet?.names ?? [], head, base, notes, fail);
      }
      // A record removed from the protected set while still at the issues root (Req 3.7).
      if (headSet && headSet.errors.length === 0) {
        const now = new Set(headSet.names);
        for (const name of baseRead.protectedNames) {
          if (!now.has(name) && head.record(name).where === 'root') {
            fail('protected-set', `${name} removed from ${PROTECTED_SET_PATH} while still at the issues root`);
          }
        }
      }
    }
  }

  const failed = failures.length > 0;
  const remaining = headList ? headList.entries.length : 0;
  const files = spec.tiers
    .map((t) => {
      const f = results.files[t];
      return f ? `${t} ${f.compiled}/${f.floor}` : `${t} ?`;
    })
    .join(', ');
  const parts = [
    `harness-summary: ${context}`,
    `expected=${total(expected)}`,
    `observed=${total(observed)}`,
    `new=${newFailures}`,
    `stale=${stale}`,
    `count-changed=${countChanged}`,
    `additions=(a) ${additions.a}, (b) ${additions.b}, (c) ${additions.c}`,
    `retags=${retags}`,
    `files=${files} (compiled/floor)`,
    `remaining=${remaining} entries`,
  ];
  if (spec.kind === 'components') parts.push(`cross-tier=${crossTier}`);
  let summary = parts.join(' · ');
  if (base.kind === 'none') summary += ' · additions not checked: no merge base (nor retags or protected-set removals)';
  if (remaining > 0) summary += ' · a pass means the failures match the list, not that it compiles';
  const classes = [...new Set(failures.map((f) => f.cls))].map((cls) => {
    if (cls !== 'check') return cls;
    const names = [...new Set(failures.filter((f) => f.cls === 'check').map((f) => f.name as string))];
    return `check: ${names.join('; ')}`;
  });
  const verdict = `harness-verdict: ${context} ${failed ? `FAIL (${classes.join(', ')})` : 'PASS'}`;
  return {
    context,
    pass: !failed,
    failures,
    notes,
    summary,
    verdict,
    observed,
    counts: { expected: total(expected), observed: total(observed), newFailures, stale, countChanged, additions, retags, remaining, crossTier },
  };
}

/** Why a tag cannot carry an entry, or null when it can (Req 3.6 and the "can fire" Conventions). */
function tagFault(tag: Tag, record: (name: string) => RecordInfo): string | null {
  if (tag.record === 'README.md') return 'names the issues README, which is not a record';
  const r = record(tag.record);
  if (r.where === 'archive') return 'names a record under archive/';
  if (r.where === 'missing') return 'names no record at the issues root';
  if (r.token === null) return 'names a record with no **Trigger**: token';
  const kind = tokenKind(r.token);
  if (kind === 'manual') return 'names a record whose Trigger token is manual';
  if (kind === 'untokened') return `names a record whose Trigger token \`${r.token}\` is not one README rule 1 names`;
  if (r.fired !== null) return `names a record whose Trigger has fired (${r.fired}) and that is still open`;
  if (tag.label !== null && !labelFound(r.text ?? '', tag.label)) return `names an item label "${tag.label}" the record does not contain`;
  return null;
}

interface BaseRead {
  list: ParsedList | null;
  pinsCanonical: string | null;
  protectedNames: string[];
  unreadable: string[];
}

function readBase(base: Extract<BaseState, { kind: 'readable' }>, context: ContextName): BaseRead {
  const unreadable: string[] = [];
  let list: ParsedList | null = null;
  const text = base.lists[context];
  if (text !== null) {
    list = parseList(text);
    if (list.errors.length > 0) unreadable.push(`${listPath(context)} at the merge base is not well formed: ${list.errors[0]}`);
  }
  let pinsCanonical: string | null = null;
  if (base.pins !== null) {
    const p = parsePins(base.pins);
    if (p.canonical === null) unreadable.push(`${PINS_PATH} at the merge base does not parse: ${p.errors[0]}`);
    pinsCanonical = p.canonical;
  }
  let protectedNames: string[] = [];
  if (base.protectedSet !== null) {
    const s = parseProtectedSet(base.protectedSet);
    if (s.errors.length > 0) unreadable.push(`${PROTECTED_SET_PATH} at the merge base is not well formed: ${s.errors[0]}`);
    protectedNames = s.names;
  }
  return { list, pinsCanonical, protectedNames, unreadable };
}

/**
 * Exception (c)'s first arm: whether the diff lowers the summed count of some key, the key
 * removed included, on any list of the same platform. Returns the first such `<list> <key>`, or
 * null. A list that does not parse on either side counts as empty there.
 */
function platformLowered(base: Extract<BaseState, { kind: 'readable' }>, head: HeadState, platform: Platform): string | null {
  for (const ctx of CONTEXTS) {
    if (CONTEXT_SPECS[ctx].platform !== platform) continue;
    const b = base.lists[ctx];
    const h = head.lists[ctx];
    const bSum = b === null ? new Map<string, number>() : sumByKey(parseList(b).entries);
    const hSum = h === null ? new Map<string, number>() : sumByKey(parseList(h).entries);
    for (const k of [...bSum.keys()].sort(codePointCompare)) {
      if ((hSum.get(k) ?? 0) < (bSum.get(k) as number)) return `${listPath(ctx)} ${k}`;
    }
  }
  return null;
}

const countLinesNaming = (text: string | null, key: string): number =>
  text === null ? 0 : text.split('\n').filter((l) => l.includes(key)).length;

/**
 * Retags (Req 3.7), per key present at both base and head. For each tag, compare its count at
 * the base and at the head. A tag whose count falls is a source; a tag whose count rises is a
 * destination. When a key has both, each (source, destination) pair is one retag, printed
 * `retagged: <key> <from> → <to>`. A count moved between two labels of one record is printed and
 * counted but is not "away from" that record.
 *
 * Away from a protected record (in the set at the base or at the head), each destination entry
 * must carry `retagged=…,<from-record>`, and the diff must add a line naming the key to the
 * from-record (more lines containing the key at the head than at the base; the record read at
 * the root, else under archive/).
 */
function checkRetags(
  baseList: ParsedList,
  headList: ParsedList,
  baseProtected: readonly string[],
  headProtected: readonly string[],
  head: HeadState,
  base: Extract<BaseState, { kind: 'readable' }>,
  notes: string[],
  fail: (cls: FailureClass, detail: string) => void,
): number {
  const protectedSet = new Set([...baseProtected, ...headProtected]);
  const byKey = (l: ParsedList): Map<string, Map<string, ListEntry>> => {
    const m = new Map<string, Map<string, ListEntry>>();
    for (const e of l.entries) {
      if (!m.has(e.key)) m.set(e.key, new Map());
      (m.get(e.key) as Map<string, ListEntry>).set(e.tag.text, e);
    }
    return m;
  };
  const b = byKey(baseList);
  const h = byKey(headList);
  let retags = 0;
  for (const key of [...h.keys()].sort(codePointCompare)) {
    const bt = b.get(key);
    if (bt === undefined) continue;
    const ht = h.get(key) as Map<string, ListEntry>;
    const tags = [...new Set([...bt.keys(), ...ht.keys()])].sort(codePointCompare);
    const from = tags.filter((t) => (ht.get(t)?.count ?? 0) < (bt.get(t)?.count ?? 0));
    const to = tags.filter((t) => (ht.get(t)?.count ?? 0) > (bt.get(t)?.count ?? 0));
    if (from.length === 0 || to.length === 0) continue;
    const checked = new Set<string>();
    for (const f of from) {
      for (const t of to) {
        retags++;
        notes.push(`retagged: ${key} ${f} → ${t}`);
        const fromRecord = (parseTag(f) as Tag).record;
        const toRecord = (parseTag(t) as Tag).record;
        if (!protectedSet.has(fromRecord) || fromRecord === toRecord) continue;
        const dest = ht.get(t) as ListEntry;
        if (dest.retagged === null || dest.retagged.fromRecord !== fromRecord) {
          fail('retag', `${key} moved from protected ${fromRecord} to ${t} without retagged=<date>,<owner>,${fromRecord} on the entry`);
        }
        if (!checked.has(fromRecord)) {
          checked.add(fromRecord);
          const headText = head.record(fromRecord).text;
          if (countLinesNaming(headText, key) <= countLinesNaming(base.recordText(fromRecord), key)) {
            fail('retag', `${key} moved from protected ${fromRecord} and this diff appends no line naming the key to ${fromRecord}`);
          }
        }
      }
    }
  }
  return retags;
}

// =============================================================================================
// Part 4: reading git, and the command line (harness/README.md § "The comparator's command line")
// =============================================================================================

export interface RepoOptions {
  /** The repository to read: a checkout of the commit under test. */
  repo: string;
  /** The commit under test; default `HEAD`. */
  head?: string;
  /** The merge base, or null for a run with no merge base (a dispatched run). */
  base: string | null;
  context: ContextName;
  results: ContextResults;
}

class GitReader {
  constructor(private readonly repo: string) {}

  run(args: string[]): string {
    return execFileSync('git', ['-c', 'core.quotepath=off', ...args], {
      cwd: this.repo,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      maxBuffer: 256 * 1024 * 1024,
    });
  }

  tryRun(args: string[]): string | null {
    try {
      return this.run(args);
    } catch {
      return null;
    }
  }

  commit(rev: string): string | null {
    const out = this.tryRun(['rev-parse', '-q', '--verify', `${rev}^{commit}`]);
    return out === null ? null : out.trim();
  }

  /** The file's text at `rev`, null when the path is absent there; throws when it cannot be read. */
  fileAt(rev: string, path: string): string | null {
    const listed = this.run(['ls-tree', '--name-only', rev, '--', path]).trim();
    if (listed !== path) return null;
    return this.run(['show', `${rev}:${path}`]);
  }
}

/**
 * Reads the head, the merge base and the issues root from git, then evaluates. The head is read
 * from the commit, never the working tree, so a run reads exactly what was committed.
 */
export function compareRepo(o: RepoOptions): Report {
  const git = new GitReader(o.repo);
  const headRev = o.head ?? 'HEAD';
  const headSha = git.commit(headRev);
  if (headSha === null) throw new Error(`the head ${headRev} is not a commit in ${o.repo}`);

  const shallow = (git.tryRun(['rev-parse', '--is-shallow-repository']) ?? '').trim() === 'true';
  const historyError = shallow
    ? 'the clone is shallow, so the Trigger history the tag rules read is incomplete; check out with full history (fetch-depth: 0)'
    : null;

  const readLists = (rev: string): Record<ContextName, string | null> => {
    const out = {} as Record<ContextName, string | null>;
    for (const c of CONTEXTS) out[c] = git.fileAt(rev, listPath(c));
    return out;
  };

  let base: BaseState = { kind: 'none' };
  let baseSha: string | null = null;
  if (o.base !== null) {
    baseSha = git.commit(o.base);
    if (baseSha === null) base = { kind: 'unreadable', reason: `the merge base ${o.base} is not a commit in this clone` };
    else {
      const b = baseSha;
      try {
        base = {
          kind: 'readable',
          sha: b,
          lists: readLists(b),
          pins: git.fileAt(b, PINS_PATH),
          protectedSet: git.fileAt(b, PROTECTED_SET_PATH),
          changedPaths: git.run(['diff', '--name-only', '--no-renames', b, headSha]).split('\n').filter((l) => l.length > 0),
          recordText: (name: string) =>
            git.fileAt(b, `${ISSUES_DIR}/${name}`) ?? git.fileAt(b, `${ISSUES_DIR}/archive/${name}`),
        };
      } catch (e) {
        base = { kind: 'unreadable', reason: `cannot read the merge base ${o.base}: ${String((e as Error).message).split('\n')[0]}` };
      }
    }
  }

  // The tag rules' history: the merge base's first-parent line (main, the ground issues-owned.sh
  // reads), or the head's when there is no merge base.
  const ground = baseSha ?? headSha;
  const cache = new Map<string, RecordInfo>();
  const record = (name: string): RecordInfo => {
    const hit = cache.get(name);
    if (hit) return hit;
    let info: RecordInfo;
    const rootText = git.fileAt(headSha, `${ISSUES_DIR}/${name}`);
    if (rootText !== null) {
      const { line, token } = triggerOf(rootText);
      const baseRoot = base.kind === 'readable' ? git.fileAt(base.sha, `${ISSUES_DIR}/${name}`) : null;
      // Ruled in this diff: the record is new at the head, or its Trigger line changed. A
      // re-rule stops a lapse (README rule 11), so such a record has not fired.
      const ruledInDiff = base.kind === 'readable' && (baseRoot === null || triggerOf(baseRoot).line !== line);
      const fired = token === null || ruledInDiff ? null : firedState(git, ground, `${ISSUES_DIR}/${name}`, token);
      info = { where: 'root', text: rootText, token, fired };
    } else {
      const archived = git.fileAt(headSha, `${ISSUES_DIR}/archive/${name}`);
      info = archived !== null ? { where: 'archive', text: archived, token: null, fired: null } : { where: 'missing', text: null, token: null, fired: null };
    }
    cache.set(name, info);
    return info;
  };

  const head: HeadState = {
    lists: readLists(headSha),
    pins: git.fileAt(headSha, PINS_PATH),
    protectedSet: git.fileAt(headSha, PROTECTED_SET_PATH),
    record,
    historyError,
  };
  return evaluate({ context: o.context, results: o.results, head, base });
}

/**
 * Whether a record's Trigger has fired, by the rules `scripts/issues-owned.sh` applies, over the
 * local history of `ground` (never a fetch): `FIRED@<sha>` or `FIRED@<tag>`, else null.
 */
export function firedState(git: GitReader, ground: string, file: string, token: string): string | null {
  const kind = tokenKind(token);
  if (kind === 'path') {
    const specs = token
      .slice('path:'.length)
      .split(',')
      .map((g) => `:(glob)${g}`);
    const tc = (git.tryRun(['log', '-1', '--format=%H', '-G^\\*\\*Trigger\\*\\*: ', ground, '--', file]) ?? '').trim();
    const range = tc ? `${tc}..${ground}` : ground;
    const fc = (git.tryRun(['log', '--first-parent', '--reverse', '--format=%h', range, '--', ...specs]) ?? '').split('\n')[0].trim();
    return fc ? `FIRED@${fc}` : null;
  }
  if (kind === 'merge') {
    const num = token.slice('merge:#'.length);
    const log = git.tryRun(['log', '--first-parent', '--format=%h %s', ground]) ?? '';
    const hit = log.split('\n').find((l) => l.endsWith(`(#${num})`));
    return hit ? `FIRED@${hit.split(' ')[0]}` : null;
  }
  if (kind === 'tag') {
    const tag = token.slice('tag:'.length);
    return git.tryRun(['rev-parse', '-q', '--verify', `refs/tags/${tag}`]) !== null ? `FIRED@${tag}` : null;
  }
  return null;
}

/** The run file a lane writes for one context (harness/README.md § "The comparator's command line"). */
export interface RunFile {
  roots: Roots;
  /** iOS: one entry per stage. `blocked: true` marks Stage P not run. */
  swift?: Array<{ compile: SwiftCompileId; log?: string; exitCode?: number; blocked?: boolean }>;
  /** Android: the one Gradle invocation. */
  gradle?: { log: string; exitCode: number };
  files: Partial<Record<Tier, { compiled: number; floor: number }>>;
  toolchain: Record<string, string>;
  /** The lane's gating results; a run file without this array fails the context as class `check`. */
  checks?: RunCheck[];
}

export interface MainDeps {
  parseSwift?: ParseSwift;
  parseKotlin?: ParseKotlin;
  out?: (line: string) => void;
}

// The parsers are required when a run file is read, not imported at load. Both parser modules
// import values from this one, and `parse-kotlin.ts` reads `KOTLIN_COMPILE_TASKS` at load, so a
// static import here is a load-time cycle: with `compare.ts` loaded first, `parse-kotlin.ts`
// sees this module's exports still empty and throws `TypeError: Cannot convert undefined or
// null to object` (tried at Task 2's integration). The `typeof import(…)` annotations keep tsc
// checking each parser's export against `ParseSwift` and `ParseKotlin`, which is what a static
// import would have bought.
function loadSwiftParser(): ParseSwift {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const m: typeof import('./parse-swift') = require('./parse-swift');
  const parse: ParseSwift = m.parseSwift;
  return parse;
}

function loadKotlinParser(): ParseKotlin {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const m: typeof import('./parse-kotlin') = require('./parse-kotlin');
  const parse: ParseKotlin = m.parseKotlin;
  return parse;
}

/**
 * The run file's `checks`: undefined when the field is absent or not an array (the context then
 * fails as class `check`); throws on an entry that is not `{ name: string, ok: boolean, detail: string }`.
 */
function readChecks(raw: unknown): RunCheck[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  return raw.map((c, i): RunCheck => {
    if (typeof c !== 'object' || c === null || typeof c.name !== 'string' || c.name === '' || typeof c.ok !== 'boolean' || typeof c.detail !== 'string') {
      throw new Error(`checks[${i}] needs a non-empty string name, a boolean ok and a string detail`);
    }
    return { name: c.name, ok: c.ok, detail: c.detail };
  });
}

/** Reads a run file and its logs, and runs the parsers. Throws on a malformed run file. */
export function readRunFile(runPath: string, context: ContextName, deps: MainDeps): ContextResults {
  const dir = path.dirname(runPath);
  const run = JSON.parse(fs.readFileSync(runPath, 'utf8')) as RunFile;
  const logText = (p: string): string => fs.readFileSync(path.resolve(dir, p), 'utf8');
  if (!run || typeof run !== 'object' || !run.roots || !run.files || !run.toolchain) {
    throw new Error('the run file needs roots, files and toolchain');
  }
  const checks = readChecks(run.checks);
  const platform = CONTEXT_SPECS[context].platform;
  if (platform === 'ios') {
    if (!Array.isArray(run.swift)) throw new Error('an iOS run file needs a swift array');
    const parse = deps.parseSwift ?? loadSwiftParser();
    const compiles = run.swift.map((s): CompileResult => {
      if (s.blocked) return notRun(s.compile);
      if (typeof s.log !== 'string' || typeof s.exitCode !== 'number') throw new Error(`${s.compile}: a stage needs log and exitCode, or blocked: true`);
      return parse({ compile: s.compile, log: logText(s.log), exitCode: s.exitCode, roots: run.roots });
    });
    return { compiles, files: run.files, toolchain: run.toolchain, checks };
  }
  if (!run.gradle || typeof run.gradle.log !== 'string' || typeof run.gradle.exitCode !== 'number') {
    throw new Error('an Android run file needs gradle.log and gradle.exitCode');
  }
  const parse = deps.parseKotlin ?? loadKotlinParser();
  const k = parse({ log: logText(run.gradle.log), exitCode: run.gradle.exitCode, roots: run.roots });
  return { compiles: k.compiles, unattributed: k.unattributed, logComplete: k.logComplete, files: run.files, toolchain: run.toolchain, checks };
}

const USAGE =
  'usage: compare.ts --context <harness-…> --run <run.json> (--base <rev> | --no-base) [--repo <dir>] [--head <rev>] [--emit-observed <file>]';

/** The command line. Returns the exit status: 0 for PASS, 1 for FAIL (an input error included). */
export function main(argv: readonly string[], deps: MainDeps = {}): number {
  const out = deps.out ?? ((l: string) => console.log(l));
  const opts: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--no-base') opts['no-base'] = true;
    else if (['--context', '--run', '--base', '--repo', '--head', '--emit-observed'].includes(a) && i + 1 < argv.length) opts[a.slice(2)] = argv[++i];
    else {
      out(`FAIL input: unknown or incomplete argument "${a}"; ${USAGE}`);
      return 1;
    }
  }
  const context = opts.context as ContextName;
  if (!(CONTEXTS as readonly string[]).includes(String(context))) {
    out(`FAIL input: --context must be one of ${CONTEXTS.join(', ')}; ${USAGE}`);
    return 1;
  }
  if (typeof opts.run !== 'string' || (typeof opts.base === 'string') === (opts['no-base'] === true)) {
    out(`FAIL input: give --run, and exactly one of --base and --no-base; ${USAGE}`);
    out(`harness-verdict: ${context} FAIL (input)`);
    return 1;
  }
  let report: Report;
  try {
    const results = readRunFile(path.resolve(opts.run), context, deps);
    report = compareRepo({
      repo: path.resolve(typeof opts.repo === 'string' ? opts.repo : process.cwd()),
      head: typeof opts.head === 'string' ? opts.head : undefined,
      base: typeof opts.base === 'string' ? opts.base : null,
      context,
      results,
    });
  } catch (e) {
    out(`FAIL input: ${String((e as Error).message).split('\n')[0]}`);
    out(`harness-verdict: ${context} FAIL (input)`);
    return 1;
  }
  for (const f of report.failures) out(formatFailure(f));
  for (const n of report.notes) out(n);
  out(report.summary);
  out(report.verdict);
  if (typeof opts['emit-observed'] === 'string') {
    const lines = [...report.observed.entries()]
      .sort((x, y) => codePointCompare(x[0], y[0]))
      .map(([k, n]) => `${k}\t${n}\n`)
      .join('');
    fs.writeFileSync(opts['emit-observed'], lines);
  }
  return report.pass ? 0 : 1;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
