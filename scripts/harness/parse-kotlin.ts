/**
 * parse-kotlin — the compile harness's Kotlin diagnostic parser (Spec 129 Task 2, subtask 2.3;
 * design.md § 2, "Capture and key"; harness/README.md § "The parser interface" and § "Keys").
 * Owner: Data. The interface (`ParseKotlin`, `KotlinParseInput`, `KotlinParseResult`) and the key
 * grammar (`parseKey`) belong to `compare.ts` (Thurgood); this module builds against them.
 *
 * What it reads: the console output of the ONE Gradle invocation of an Android context
 * (`gradle --console=plain --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin
 * :dp:compileDebugKotlin`, design § 2), and Gradle's exit status. It returns the three compiles'
 * results, in the order `android.tokens`, `android.probe`, `android.dp`.
 *
 * Contract (design § 3, "One comparator, two parsers"):
 *   - Pure. It reads no file, no environment variable, no network and no pull request, and starts
 *     no process; it imports only the types and the key grammar of `./compare`.
 *   - It never throws on log content. It throws only on malformed input (a root that is not an
 *     absolute path, a log that is not a string, an exit status that is not an integer).
 *   - It never decides a verdict. `compare.ts` does.
 *
 * What the log looks like (recorded under Gradle 9.8.2, Kotlin 2.4.21; the fixtures are cuts of it):
 *
 *     > Task :tokens:compileDebugKotlin                          <- header, printed before the output
 *     e: file:///abs/path/File.kt:15:30 Unresolved reference 'X'.  <- one diagnostic, one or more lines
 *     e: file:///abs/path/File.kt:3:8 Redeclaration:
 *     object ProgressTokens : Any                                <- continuation line
 *     <blank line>
 *     > Task :tokens:compileDebugKotlin FAILED                   <- the task's outcome line
 *     BUILD FAILED in 6s
 *
 * Rules, in one place:
 *   1. A diagnostic starts at a line beginning `e: `. It runs to the next `e: ` or `w: ` line or the
 *      next Gradle line (`> `, `FAILURE`, `* `, `BUILD`, `[Incubating]`). `w: ` lines are never keyed.
 *   2. Attribution is by the task header the diagnostic was printed under, never by its path
 *      (`:tokens` and `:dp` report the same generated paths). The header in force is the latest
 *      `> Task <path>` line with no outcome suffix; a Gradle line of any other kind, or a task line
 *      with an outcome suffix (`FAILED`, `UP-TO-DATE`, …), ends it. A diagnostic printed under no
 *      header in force, or under a task that is not one of the three compiles, is `unattributed`.
 *      A diagnostic is only ever read under the header directly above it. When a build interleaves
 *      two tasks' output, Gradle's plain console is expected to repeat a task's header in front of
 *      each of its chunks (reasoning from Gradle's grouped output, not seen in a recorded log; the
 *      synthetic-interleaved fixture assumes it). If it did not, a chunk would be read under the
 *      wrong header: the lane stops that by running the build without parallel execution.
 *   3. The key is `<root>:<path> | <message>`: the `file://` URI is percent-decoded to a path, placed
 *      under the longest root that holds it, and given without its root. The message is the text after
 *      `<line>:<col> `, with continuation lines joined by ` ⏎ ` (a blank line is dropped), and each run
 *      of whitespace collapsed to one space. No line or column is in the key.
 *   4. A diagnostic that cannot make a valid key goes to the owning compile's `unrooted`, as printed:
 *      no `file://<path>:<line>:<col>` location at all (a general `e: ` line), a path that is not
 *      absolute or is under no root, a path with ` | `, a tab or a `.` or `..` segment, an undecodable
 *      percent sequence, or an empty message. Never dropped.
 *   5. A compile's outcome follows its `> Task <path>` lines: `failed` when one ends ` FAILED`; else
 *      `succeeded` when one has no suffix, `UP-TO-DATE` or `FROM-CACHE`; else `not-run`.
 *   6. `logComplete` is true when a line is Gradle's closing `BUILD SUCCESSFUL` or `BUILD FAILED`.
 */

import {
  KOTLIN_COMPILE_TASKS,
  parseKey,
  type CompileResult,
  type KotlinCompileId,
  type KotlinParseInput,
  type KotlinParseResult,
  type RootName,
} from './compare';

/** The three compiles, in the order the result lists them. */
const COMPILE_ORDER: readonly KotlinCompileId[] = ['android.tokens', 'android.probe', 'android.dp'];

/** Gradle task path (`:tokens:compileDebugKotlin`) → compile id. */
const COMPILE_BY_TASK: ReadonlyMap<string, KotlinCompileId> = new Map(
  (Object.keys(KOTLIN_COMPILE_TASKS) as KotlinCompileId[]).map((id) => [KOTLIN_COMPILE_TASKS[id], id]),
);

/** The separator between a diagnostic's lines in its message: space, U+23CE, space. */
const LINE_JOIN = ' ⏎ ';

/** The order roots are tried in; the longest holding prefix wins, the first of equals. */
const ROOT_ORDER: readonly RootName[] = ['gen', 'pkg', 'probe'];

const TASK_HEADER = /^> Task (\S+)(?: (\S+))?\s*$/;
const BUILD_CLOSING = /^BUILD (?:SUCCESSFUL|FAILED)\b/;
const DIAGNOSTIC_LOCATION = /^e: file:\/\/(.*?):(\d+):(\d+)(?: (.*))?$/;

/** A Gradle line (README § "Keys"): ends a diagnostic and ends the task header in force. */
function isGradleLine(line: string): boolean {
  return (
    line.startsWith('> ') ||
    /^FAILURE\b/.test(line) ||
    line.startsWith('* ') ||
    /^BUILD\b/.test(line) ||
    line.startsWith('[Incubating]')
  );
}

/** A line that ends a diagnostic's continuation lines. */
function endsDiagnostic(line: string): boolean {
  return line.startsWith('e: ') || line.startsWith('w: ') || isGradleLine(line);
}

function collapse(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/** `/a/b/` → `/a/b/`; `/a/b` → `/a/b/`; `/` → `/`. */
function rootPrefix(root: string): string {
  return root.endsWith('/') ? root : `${root}/`;
}

interface Accumulator {
  failed: boolean;
  succeeded: boolean;
  diagnostics: Map<string, number>;
  unrooted: string[];
}

function assertAbsoluteRoot(name: string, value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/')) {
    throw new TypeError(`parseKotlin: roots.${name} must be an absolute path, got ${JSON.stringify(value)}`);
  }
  return value;
}

/**
 * Parses one Gradle invocation's console output into the three compiles' results.
 * See the module header for the rules.
 */
export function parseKotlin(input: KotlinParseInput): KotlinParseResult {
  if (input === null || typeof input !== 'object') {
    throw new TypeError('parseKotlin: input must be an object');
  }
  const { log, exitCode, roots } = input;
  if (typeof log !== 'string') {
    throw new TypeError('parseKotlin: log must be a string');
  }
  if (!Number.isInteger(exitCode)) {
    throw new TypeError(`parseKotlin: exitCode must be an integer, got ${JSON.stringify(exitCode)}`);
  }
  if (roots === null || typeof roots !== 'object') {
    throw new TypeError('parseKotlin: roots must be an object');
  }
  const prefixes = ROOT_ORDER.map((name) => ({
    name,
    prefix: rootPrefix(assertAbsoluteRoot(name, roots[name])),
  }));

  const acc = new Map<KotlinCompileId, Accumulator>(
    COMPILE_ORDER.map((id) => [id, { failed: false, succeeded: false, diagnostics: new Map(), unrooted: [] }]),
  );
  const unattributed: string[] = [];
  let logComplete = false;

  /** The compile whose task header is in force, or null when none is. */
  let current: KotlinCompileId | null = null;

  const lines = log.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    const header = TASK_HEADER.exec(line);
    if (header !== null) {
      const id = COMPILE_BY_TASK.get(header[1]) ?? null;
      const suffix = header[2];
      if (id !== null) {
        const slot = acc.get(id)!;
        if (suffix === 'FAILED') slot.failed = true;
        else if (suffix === undefined || suffix === 'UP-TO-DATE' || suffix === 'FROM-CACHE') slot.succeeded = true;
      }
      // Only a header with no outcome suffix opens output; a suffixed line reports a task's end.
      current = suffix === undefined ? id : null;
      i += 1;
      continue;
    }

    if (isGradleLine(line)) {
      if (BUILD_CLOSING.test(line)) logComplete = true;
      current = null;
      i += 1;
      continue;
    }

    if (!line.startsWith('e: ')) {
      // Output, a warning (`w: ` is never keyed) or a blank line outside any diagnostic.
      i += 1;
      continue;
    }

    // A diagnostic: this line and its continuation lines.
    let end = i + 1;
    while (end < lines.length && !endsDiagnostic(lines[end])) end += 1;
    const continuation = lines.slice(i + 1, end);
    i = end;

    if (current === null) {
      unattributed.push(line);
      continue;
    }
    const slot = acc.get(current)!;

    const location = DIAGNOSTIC_LOCATION.exec(line);
    if (location === null) {
      slot.unrooted.push(line);
      continue;
    }

    let absolutePath: string;
    try {
      absolutePath = decodeURIComponent(location[1]);
    } catch {
      slot.unrooted.push(line);
      continue;
    }

    let root: RootName | null = null;
    let relative = '';
    let longest = 0;
    for (const { name, prefix } of prefixes) {
      if (absolutePath.startsWith(prefix) && prefix.length > longest && absolutePath.length > prefix.length) {
        root = name;
        relative = absolutePath.slice(prefix.length);
        longest = prefix.length;
      }
    }

    const message = [location[4] ?? '', ...continuation]
      .map(collapse)
      .filter((part) => part.length > 0)
      .join(LINE_JOIN);

    // A key is valid only when it splits back into the same path and message: a path holding
    // " | " would split earlier than where it was joined, so it is unrooted, not re-keyed.
    const key = root === null ? '' : `${root}:${relative} | ${message}`;
    const parsed = root === null ? null : parseKey(key);
    if (parsed === null || parsed.path !== relative || parsed.message !== message) {
      slot.unrooted.push(line);
      continue;
    }
    slot.diagnostics.set(key, (slot.diagnostics.get(key) ?? 0) + 1);
  }

  const compiles: CompileResult[] = COMPILE_ORDER.map((compile) => {
    const slot = acc.get(compile)!;
    return {
      compile,
      outcome: slot.failed ? 'failed' : slot.succeeded ? 'succeeded' : 'not-run',
      diagnostics: slot.diagnostics,
      unrooted: slot.unrooted,
    };
  });

  return { compiles, unattributed, logComplete, exitCode };
}
