/**
 * parse-swift — the compile harness's `swiftc` diagnostic parser (Spec 129 Task 2.2;
 * design.md § 1 K-2, O-17). Owner: Kenya. The interface is Thurgood's (`compare.ts`,
 * `harness/README.md` §§ "Keys" and "The parser interface"); this module builds against it.
 *
 * What it does: reads one `swiftc` stage's captured output and exit status, and returns the
 * stage's error diagnostics as `<root>:<path> | <message>` keys with counts.
 *
 * Rules (K-2):
 *   - Only lines matching `^<path>:<line>:<col>: error: ` are keys. Warnings, notes, source
 *     excerpts, caret lines and the `- error:` line of `-diagnostic-style swift` are not.
 *     An `error:` line with no `path:line:col` (`<unknown>:0: error: …`, a bare `error: …`)
 *     is not a key and not `unrooted`.
 *   - The message is the text after `error: ` verbatim, except each tab becomes one space and
 *     trailing whitespace is removed.
 *   - The key's path is the diagnostic's path made relative to the longest root it lies under.
 *     No line or column is kept.
 *   - A diagnostic repeated at the same path, line, column and message within one log is
 *     counted once (a diagnostic printed twice, location and caret). Two diagnostics that
 *     share a key but sit at different lines or columns count twice.
 *
 * What it never does: read a file, an environment variable, the network or a PR, start a
 * process, or decide a verdict. It never throws on log content; it throws only when its own
 * input is malformed (a root that is not absolute, an unknown compile id, a log that is not
 * a string, an exit status that is not an integer).
 *
 * `unrooted` holds, as printed, the line of each error diagnostic that cannot become a key:
 * a path that is not absolute, a path under no root, a path that holds ` | ` or a tab or has
 * an empty, `.` or `..` segment, and (a case the interface does not name) a message that is
 * empty or begins with whitespace, which `parseKey` would reject.
 */

import {
  ROOT_NAMES,
  formatKey,
  type CompileResult,
  type ParseSwift,
  type RootName,
  type Roots,
  type SwiftCompileId,
  type SwiftParseInput,
} from './compare';

const SWIFT_COMPILE_IDS: readonly SwiftCompileId[] = ['ios.T', 'ios.P', 'ios.C', 'ios.T5'];

/** `<path>:<line>:<col>: error: <message>`, the path being the shortest text that fits. */
const ERROR_LINE = /^(.+?):(\d+):(\d+): error: (.*)$/;

interface NormalisedRoot {
  name: RootName;
  /** Absolute POSIX path with no trailing `/`. */
  dir: string;
}

function normaliseRoots(roots: Roots): NormalisedRoot[] {
  if (roots === null || typeof roots !== 'object') {
    throw new Error('parseSwift: roots must be an object with gen, pkg and probe');
  }
  const out: NormalisedRoot[] = [];
  for (const name of ROOT_NAMES) {
    const raw = roots[name];
    if (typeof raw !== 'string' || !raw.startsWith('/')) {
      throw new Error(`parseSwift: root "${name}" must be an absolute path, got ${JSON.stringify(raw)}`);
    }
    const dir = raw.replace(/\/+$/, '');
    if (dir === '') {
      throw new Error(`parseSwift: root "${name}" must not be the filesystem root`);
    }
    out.push({ name, dir });
  }
  return out;
}

/**
 * The longest root the path lies under (a root R holds P when P begins with R then `/`).
 * On equal roots the first in `gen`, `pkg`, `probe` order wins, which makes the result
 * deterministic; the lane does not pass equal roots.
 */
function placeUnderRoot(path: string, roots: readonly NormalisedRoot[]): { root: RootName; rel: string } | null {
  let best: NormalisedRoot | null = null;
  for (const r of roots) {
    if (path.startsWith(r.dir + '/') && (best === null || r.dir.length > best.dir.length)) best = r;
  }
  return best === null ? null : { root: best.name, rel: path.slice(best.dir.length + 1) };
}

function validRelativePath(rel: string): boolean {
  if (rel.length === 0 || /[\t\r\n]/.test(rel) || rel.includes(' | ')) return false;
  return !rel.split('/').some((seg) => seg === '' || seg === '.' || seg === '..');
}

/** Tabs become one space each, trailing whitespace goes (K-2). */
function normaliseMessage(raw: string): string {
  return raw.replace(/\t/g, ' ').replace(/\s+$/, '');
}

export const parseSwift: ParseSwift = (input: SwiftParseInput): CompileResult => {
  if (input === null || typeof input !== 'object') {
    throw new Error('parseSwift: input must be an object');
  }
  const { compile, log, exitCode } = input;
  if (!SWIFT_COMPILE_IDS.includes(compile)) {
    throw new Error(`parseSwift: unknown compile id ${JSON.stringify(compile)}`);
  }
  if (typeof log !== 'string') {
    throw new Error('parseSwift: log must be a string');
  }
  if (!Number.isInteger(exitCode)) {
    throw new Error(`parseSwift: exitCode must be an integer, got ${JSON.stringify(exitCode)}`);
  }
  const roots = normaliseRoots(input.roots);

  const diagnostics = new Map<string, number>();
  const unrooted: string[] = [];
  const seen = new Set<string>();

  for (const line of log.split(/\r?\n/)) {
    const m = ERROR_LINE.exec(line);
    if (m === null) continue;

    // The same diagnostic printed again (same path, line, column, message) is one diagnostic.
    const identity = normaliseMessage(line);
    if (seen.has(identity)) continue;
    seen.add(identity);

    const path = m[1];
    const message = normaliseMessage(m[4]);

    const placed = path.startsWith('/') ? placeUnderRoot(path, roots) : null;
    if (
      placed === null ||
      !validRelativePath(placed.rel) ||
      message.length === 0 ||
      message !== message.trimStart()
    ) {
      unrooted.push(line);
      continue;
    }

    const key = formatKey(placed.root, placed.rel, message);
    diagnostics.set(key, (diagnostics.get(key) ?? 0) + 1);
  }

  return {
    compile,
    outcome: exitCode === 0 ? 'succeeded' : 'failed',
    diagnostics,
    unrooted,
  };
};
