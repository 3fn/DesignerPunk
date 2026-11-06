/**
 * compare — the compile harness's comparator (Spec 129 Task 2; design.md § 3). Owner: Thurgood.
 *
 * STATE AT SUBTASK 2.1: this module fixes the interface between the comparator and the two
 * diagnostic parsers, so that `parse-swift.ts` (Kenya, 2.2) and `parse-kotlin.ts` (Data, 2.3)
 * can be built against it in parallel. It also holds the key grammar in executable form
 * (`parseKey`). The verdict rules, the list, pin and protected-set readers, the CLI and the
 * summary line arrive in subtask 2.4.
 *
 * The prose form of everything here, with the list, pin and protected-set file formats, is
 * `harness/README.md`. Where the two differ, that is a defect; report it to the owner.
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
