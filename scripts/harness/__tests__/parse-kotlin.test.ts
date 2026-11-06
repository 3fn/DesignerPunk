/**
 * parse-kotlin.test.ts — Spec 129 Task 2, subtask 2.3 (Data). Tests `scripts/harness/parse-kotlin.ts`
 * against the interface in `scripts/harness/compare.ts` (Thurgood) and `harness/README.md`.
 *
 * Fixtures are in `fixtures/parse-kotlin/`. Three are cut from Data's 2026-11-04 K2 logs, with the
 * scratch paths rewritten to the roots in their headers; two are SYNTHETIC (hand-built, labelled so in
 * their headers); the `*.keys.tsv` files are the expected keys, produced by an independent pass over
 * each fixture (a separate Python script, not this parser) and recorded in the completion doc.
 * Small cases are built inline by `log()` and are synthetic too.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseKey } from '../compare';
import type { CompileResult, KotlinParseResult, ParseKotlin, Roots } from '../compare';
import { parseKotlin } from '../parse-kotlin';

// ---------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------

const FIXTURES = path.join(__dirname, 'fixtures', 'parse-kotlin');
const PARSER_SOURCE = path.join(__dirname, '..', 'parse-kotlin.ts');

interface Fixture {
  name: string;
  headers: Map<string, string>;
  log: string;
  exitCode: number;
  roots: Roots;
}

function readFixture(name: string): Fixture {
  const text = fs.readFileSync(path.join(FIXTURES, name), 'utf8');
  const headers = new Map<string, string>();
  const body: string[] = [];
  let inHeader = true;
  for (const line of text.split('\n')) {
    if (inHeader && line.startsWith('#harness-fixture ')) {
      const rest = line.slice('#harness-fixture '.length);
      const colon = rest.indexOf(': ');
      headers.set(rest.slice(0, colon), rest.slice(colon + 2));
    } else {
      inHeader = false;
      body.push(line);
    }
  }
  const rootsField = headers.get('roots') ?? '';
  const parts = Object.fromEntries(rootsField.split(' ').map((kv) => kv.split('=') as [string, string]));
  return {
    name,
    headers,
    log: body.join('\n'),
    exitCode: Number(headers.get('exit')),
    roots: { gen: parts.gen, pkg: parts.pkg, probe: parts.probe },
  };
}

function runFixture(name: string): KotlinParseResult {
  const f = readFixture(name);
  return parseKotlin({ log: f.log, exitCode: f.exitCode, roots: f.roots });
}

/** The expected keys of a fixture: `key<TAB>count` per line. */
function readExpectedKeys(name: string): Map<string, number> {
  const out = new Map<string, number>();
  for (const line of fs.readFileSync(path.join(FIXTURES, name), 'utf8').split('\n')) {
    if (line === '') continue;
    const tab = line.lastIndexOf('\t');
    out.set(line.slice(0, tab), Number(line.slice(tab + 1)));
  }
  return out;
}

const ROOTS: Roots = { gen: '/r/gen', pkg: '/r/pkg', probe: '/r/probe' };

/** Joins lines into a log with a trailing newline. */
function log(...lines: string[]): string {
  return lines.join('\n') + '\n';
}

function run(text: string, roots: Roots = ROOTS, exitCode = 1): KotlinParseResult {
  return parseKotlin({ log: text, exitCode, roots });
}

function compileOf(r: KotlinParseResult, id: 'tokens' | 'probe' | 'dp'): CompileResult {
  const found = r.compiles.find((c) => c.compile === `android.${id}`);
  if (found === undefined) throw new Error(`no result for android.${id}`);
  return found;
}

function obj(m: ReadonlyMap<string, number>): Record<string, number> {
  return Object.fromEntries(m);
}

const TOKENS_TASK = '> Task :tokens:compileDebugKotlin';
const DP_TASK = '> Task :dp:compileDebugKotlin';

// ---------------------------------------------------------------------------------------------
// The interface
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: the interface of compare.ts', () => {
  it('has the type ParseKotlin and returns three results in the order tokens, probe, dp', () => {
    const typed: ParseKotlin = parseKotlin;
    const r = typed({ log: '', exitCode: 0, roots: ROOTS });
    expect(r.compiles.map((c) => c.compile)).toEqual(['android.tokens', 'android.probe', 'android.dp']);
    expect(r.exitCode).toBe(0);
  });

  it('treats an empty log as an ordinary result: three not-run compiles, nothing parsed, log incomplete', () => {
    const r = run('', ROOTS, 0);
    expect(r.compiles.map((c) => c.outcome)).toEqual(['not-run', 'not-run', 'not-run']);
    expect(r.compiles.every((c) => c.diagnostics.size === 0 && c.unrooted.length === 0)).toBe(true);
    expect(r.unattributed).toEqual([]);
    expect(r.logComplete).toBe(false);
  });

  it('never throws on log content', () => {
    const garbage = [
      'e: ',
      'e: file://',
      'e: file:///:1:1 ',
      '\u0000\u0001e: file:///r/gen/a.kt:1:1 x',
      '> Task',
      '> Task :',
      '> Task :tokens:compileDebugKotlin FAILED FAILED',
      'BUILD',
      'e: file:///r/gen/a%ZZ.kt:1:1 x',
      'e: file:///r/gen/a.kt:99999999999999999999:1 x',
      '\r\n\r\ne: file:///r/gen/a.kt:1:1 x\r\n',
    ];
    for (const g of garbage) {
      expect(() => run(g)).not.toThrow();
      expect(() => run(`${TOKENS_TASK}\n${g}\n${DP_TASK}\n${g}`)).not.toThrow();
    }
  });

  it('throws on malformed input only: a root that is not absolute, a log that is not a string, an exit status that is not an integer', () => {
    expect(() => run('', { ...ROOTS, gen: 'dist/tokens' })).toThrow(/roots\.gen/);
    expect(() => run('', { ...ROOTS, pkg: '' })).toThrow(/roots\.pkg/);
    expect(() => run('', { ...ROOTS, probe: undefined as unknown as string })).toThrow(/roots\.probe/);
    expect(() => parseKotlin({ log: undefined as unknown as string, exitCode: 0, roots: ROOTS })).toThrow(/log/);
    expect(() => parseKotlin({ log: '', exitCode: 1.5, roots: ROOTS })).toThrow(/exitCode/);
    expect(() => parseKotlin({ log: '', exitCode: NaN, roots: ROOTS })).toThrow(/exitCode/);
  });

  it('accepts a trailing slash on a root', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:2 Boom.'), { gen: '/r/gen/', pkg: '/r/pkg/', probe: '/r/probe/' });
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | Boom.': 1 });
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: a multi-line diagnostic keeps its continuation lines, joined by ' ⏎ '
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: multi-line diagnostics', () => {
  it('joins the continuation lines with " ⏎ " (the recorded Redeclaration diagnostic)', () => {
    const r = run(
      log(
        TOKENS_TASK,
        'e: file:///r/pkg/android/src/main/kotlin/dp/Ours.kt:9:8 Redeclaration:',
        'object ProgressTokens : Any',
        'e: file:///r/pkg/android/src/main/kotlin/dp/Ours.kt:11:8 Redeclaration:',
        'object ProgressTokens : Any',
      ),
    );
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({
      'pkg:android/src/main/kotlin/dp/Ours.kt | Redeclaration: ⏎ object ProgressTokens : Any': 2,
    });
  });

  it('drops blank lines and collapses each run of whitespace (the recorded "None of the following candidates" shape)', () => {
    const r = run(
      log(
        DP_TASK,
        'e: file:///r/pkg/A.kt:452:43 None of the following candidates is applicable:',
        '',
        'val spaceInset050: Dp:',
        "  Cannot access 'val spaceInset050: Dp':\tit is   private in file.",
        '',
        '> Task :dp:compileDebugKotlin FAILED',
      ),
    );
    expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({
      "pkg:A.kt | None of the following candidates is applicable: ⏎ val spaceInset050: Dp: ⏎ Cannot access 'val spaceInset050: Dp': it is private in file.": 1,
    });
  });

  it('keeps repeated continuation lines as printed (the compiler prints some candidates twice)', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Many:', 'same', 'same'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | Many: ⏎ same ⏎ same': 1 });
  });

  it('uses the first continuation line as the message when the first line has none', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1', 'The message is on the next line.'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | The message is on the next line.': 1 });
  });

  it('reads CRLF line endings the same as LF', () => {
    const lf = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Redeclaration:', 'object X : Any'));
    const crlf = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Redeclaration:', 'object X : Any').replace(/\n/g, '\r\n'));
    expect(obj(compileOf(crlf, 'tokens').diagnostics)).toEqual(obj(compileOf(lf, 'tokens').diagnostics));
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: a `w:` line yields no key; a diagnostic ends at the next e:, w: or Gradle line
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: warnings and where a diagnostic ends', () => {
  it('yields no key for a w: line, and none for its continuation lines', () => {
    const r = run(
      log(
        TOKENS_TASK,
        'w: file:///r/gen/A.kt:3:5 Parameter \'unused\' is never used',
        'a warning continuation line',
        'w: file:///r/gen/A.kt:4:5 Another warning',
      ),
    );
    const c = compileOf(r, 'tokens');
    expect(c.diagnostics.size).toBe(0);
    expect(c.unrooted).toEqual([]);
    expect(r.unattributed).toEqual([]);
  });

  it('ends a diagnostic at a w: line: the warning text is not part of the message', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 First:', 'continued', 'w: file:///r/gen/A.kt:2:2 A warning'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | First: ⏎ continued': 1 });
  });

  it('ends a diagnostic at the next e: line, and counts both', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 First:', 'continued', 'e: file:///r/gen/B.kt:2:2 Second'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({
      'gen:A.kt | First: ⏎ continued': 1,
      'gen:B.kt | Second': 1,
    });
  });

  it.each([
    ['a task line', '> Task :tokens:compileDebugKotlin FAILED'],
    ['a "> " line', '> Run with --stacktrace option to get the stack trace.'],
    ['FAILURE', 'FAILURE: Build failed with an exception.'],
    ['a "* " line', '* What went wrong:'],
    ['BUILD', 'BUILD FAILED in 6s'],
    ['an i: line', "i: file:///r/gen/A.kt:2:2 An info message"],
    ['a v: line', 'v: a verbose message'],
    ['[Incubating]', '[Incubating] Problems report is available at: file:///work/harness/build/reports/problems/problems-report.html'],
  ])('ends a diagnostic at %s', (_label, terminator) => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Msg:', 'continued', '', terminator, 'text after the terminator'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | Msg: ⏎ continued': 1 });
  });

  it('yields no key for an i: or v: line, and none for its continuation lines', () => {
    const r = run(log(TOKENS_TASK, 'i: file:///r/gen/A.kt:3:5 An info message', 'info continuation', 'v: verbose', 'verbose continuation'));
    const c = compileOf(r, 'tokens');
    expect(c.diagnostics.size).toBe(0);
    expect(c.unrooted).toEqual([]);
    expect(r.unattributed).toEqual([]);
  });

  it('does not treat a continuation line that merely starts with a Gradle word as a Gradle line', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Msg:', 'BUILDER is not a Gradle line', 'FAILURES neither', '*not a bullet'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({
      'gen:A.kt | Msg: ⏎ BUILDER is not a Gradle line ⏎ FAILURES neither ⏎ *not a bullet': 1,
    });
  });

  it('ignores text outside any diagnostic, such as Gradle chatter and the failure block', () => {
    const r = run(
      log(
        'To honour the JVM settings for this build a single-use Daemon process will be forked.',
        'Daemon will be stopped at the end of the build',
        TOKENS_TASK,
        'e: file:///r/gen/A.kt:1:1 Boom.',
        '',
        '> Task :tokens:compileDebugKotlin FAILED',
        '',
        'FAILURE: Build failed with an exception.',
        'Execution failed for task \':tokens:compileDebugKotlin\'.',
        'Location: /r/gen/A.kt:1',
        'BUILD FAILED in 6s',
      ),
    );
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | Boom.': 1 });
    expect(r.unattributed).toEqual([]);
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: the key
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: the key', () => {
  it('holds a root-relative POSIX path, no line or column, and the quoted identifiers', () => {
    const r = run(
      log(
        TOKENS_TASK,
        "e: file:///r/gen/DesignTokens.android.kt:70:20 Unresolved reference 'Oklch'.",
        "e: file:///r/gen/DesignTokens.android.kt:71:20 Unresolved reference 'Oklch'.",
        "e: file:///r/gen/sub/Other.kt:3:1 Unresolved reference 'dp'.",
      ),
    );
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({
      "gen:DesignTokens.android.kt | Unresolved reference 'Oklch'.": 2,
      "gen:sub/Other.kt | Unresolved reference 'dp'.": 1,
    });
  });

  it('puts a path under the longest root that holds it, so a gen output of "." leaves package files keyed pkg:', () => {
    const roots: Roots = { gen: '/c', pkg: '/c/node_modules/@3fn/core', probe: '/c/probe' };
    const r = run(
      log(
        DP_TASK,
        'e: file:///c/dist/tokens/DesignTokens.android.kt:1:1 In gen.',
        'e: file:///c/node_modules/@3fn/core/src/blend/B.kt:1:1 In pkg.',
        'e: file:///c/probe/Probe.kt:1:1 In probe.',
      ),
      roots,
    );
    expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({
      'gen:dist/tokens/DesignTokens.android.kt | In gen.': 1,
      'pkg:src/blend/B.kt | In pkg.': 1,
      'probe:Probe.kt | In probe.': 1,
    });
  });

  it('keys a gen path relative to the platform output folder, not to the consumer root', () => {
    const body = ['e: file:///work/consumer/dist/tokens/DesignTokens.android.kt:13:5 Syntax error: Expecting member declaration.'];
    const r = run(log(TOKENS_TASK, ...body), { gen: '/work/consumer/dist/tokens', pkg: '/work/consumer/node_modules/@3fn/core', probe: '/work/probe' });
    expect([...compileOf(r, 'tokens').diagnostics.keys()]).toEqual(['gen:DesignTokens.android.kt | Syntax error: Expecting member declaration.']);
    const moved = run(log(TOKENS_TASK, ...body), { gen: '/work/consumer/android-out', pkg: '/work/consumer/node_modules/@3fn/core', probe: '/work/probe' });
    // A file outside the (moved) output folder is not a gen key: it is unrooted, never silently re-keyed.
    expect(compileOf(moved, 'tokens').diagnostics.size).toBe(0);
    expect(compileOf(moved, 'tokens').unrooted).toEqual([body[0]]);
  });

  it('percent-decodes the file URI to a path (spaces, UTF-8)', () => {
    const roots: Roots = { gen: '/w/My Work/gen', pkg: '/w/pkg', probe: '/w/probe' };
    const r = run(log(TOKENS_TASK, 'e: file:///w/My%20Work/gen/a%20b/Caf%C3%A9.kt:3:4 Msg.'), roots);
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:a b/Café.kt | Msg.': 1 });
  });

  it('keeps a message that holds " | " (the key splits at the first one, so the path may not)', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Expected a | b'));
    const [key] = [...compileOf(r, 'tokens').diagnostics.keys()];
    expect(key).toBe('gen:A.kt | Expected a | b');
    expect(parseKey(key)).toEqual({ root: 'gen', path: 'A.kt', message: 'Expected a | b' });
  });

  it('counts each diagnostic once, so the same key printed twice has count 2', () => {
    const r = run(log(TOKENS_TASK, 'e: file:///r/gen/A.kt:1:1 Same.', 'e: file:///r/gen/A.kt:9:9 Same.'));
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | Same.': 2 });
  });

  it('gives every key it returns a well-formed key (parseKey), on each recorded fixture', () => {
    for (const name of ['tokens-failed.txt', 'dp-failed-cut.txt']) {
      const r = runFixture(name);
      for (const c of r.compiles) {
        for (const [key, count] of c.diagnostics) {
          expect(parseKey(key)).not.toBeNull();
          expect(count).toBeGreaterThanOrEqual(1);
          expect(key).not.toMatch(/\.kt:\d+/);
        }
      }
    }
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: rows that cannot make a key are never dropped
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: an e: line with no location (a driver error)', () => {
  const driverLines = ['e: Compilation failed: no source files', 'e: ', 'e: java.lang.OutOfMemoryError: Java heap space', 'e: file://not-a-location'];

  it.each(driverLines)('is neither a key nor unrooted nor unattributed: %j', (line) => {
    for (const text of [log(TOKENS_TASK, line), log(line), log(TOKENS_TASK, line, 'a continuation line', DP_TASK, line)]) {
      const r = run(text);
      expect(r.compiles.every((c) => c.diagnostics.size === 0 && c.unrooted.length === 0)).toBe(true);
      expect(r.unattributed).toEqual([]);
    }
  });

  it('leaves the keyed errors beside it intact, and ends the diagnostic before it (the cost: it goes unseen)', () => {
    const r = run(
      log(
        TOKENS_TASK,
        'e: file:///r/gen/A.kt:1:1 First:',
        'continued',
        'e: Compilation failed',
        'the driver error\'s own continuation line',
        'e: file:///r/gen/B.kt:2:2 Second',
      ),
    );
    const c = compileOf(r, 'tokens');
    expect(obj(c.diagnostics)).toEqual({ 'gen:A.kt | First: \u23CE continued': 1, 'gen:B.kt | Second': 1 });
    expect(c.unrooted).toEqual([]);
    expect(r.unattributed).toEqual([]);
  });

  it('leaves a failed compile with no diagnostics, which the comparator reads as pre-compile', () => {
    const r = run(log(DP_TASK, 'e: Compilation failed', '> Task :dp:compileDebugKotlin FAILED', 'BUILD FAILED in 1s'));
    expect(compileOf(r, 'dp').outcome).toBe('failed');
    expect(compileOf(r, 'dp').diagnostics.size).toBe(0);
    expect(compileOf(r, 'dp').unrooted).toEqual([]);
  });
});

describe('parseKotlin: unrooted', () => {
  const cases: Array<[string, string]> = [
    ['a relative path', 'e: file://src/Foo.kt:1:2 Boom.'],
    ['a path under no root', 'e: file:///elsewhere/Foo.kt:1:2 Boom.'],
    ['a path that is a root itself', 'e: file:///r/gen:1:2 Boom.'],
    ['a ".." segment', 'e: file:///r/gen/../pkg/Foo.kt:1:2 Boom.'],
    ['a "." segment', 'e: file:///r/gen/./Foo.kt:1:2 Boom.'],
    ['an empty segment', 'e: file:///r/gen//Foo.kt:1:2 Boom.'],
    ['" | " in the path (encoded)', 'e: file:///r/gen/a%20%7C%20b.kt:1:2 Boom.'],
    ['a tab in the path (encoded)', 'e: file:///r/gen/a%09b.kt:1:2 Boom.'],
    ['an undecodable percent sequence', 'e: file:///r/gen/a%ZZ.kt:1:2 Boom.'],
    ['an empty message', 'e: file:///r/gen/Foo.kt:1:2'],
    ['a message of whitespace only', 'e: file:///r/gen/Foo.kt:1:2    '],
  ];

  it.each(cases)('sends %s to the owning compile\'s unrooted, as printed', (_label, line) => {
    const r = run(log(TOKENS_TASK, line, DP_TASK, line));
    for (const id of ['tokens', 'dp'] as const) {
      const c = compileOf(r, id);
      expect(c.diagnostics.size).toBe(0);
      expect(c.unrooted).toEqual([line]);
    }
    expect(r.unattributed).toEqual([]);
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: each task's outcome follows the README's rules
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: outcomes', () => {
  it.each([
    ['no line', 'not-run', []],
    ['no suffix', 'succeeded', ['> Task :dp:compileDebugKotlin']],
    ['UP-TO-DATE', 'succeeded', ['> Task :dp:compileDebugKotlin UP-TO-DATE']],
    ['FROM-CACHE', 'succeeded', ['> Task :dp:compileDebugKotlin FROM-CACHE']],
    ['FAILED', 'failed', ['> Task :dp:compileDebugKotlin FAILED']],
    ['SKIPPED', 'not-run', ['> Task :dp:compileDebugKotlin SKIPPED']],
    ['NO-SOURCE', 'not-run', ['> Task :dp:compileDebugKotlin NO-SOURCE']],
    ['no suffix, then FAILED', 'failed', ['> Task :dp:compileDebugKotlin', '> Task :dp:compileDebugKotlin FAILED']],
    ['FAILED, then a repeated header', 'failed', ['> Task :dp:compileDebugKotlin FAILED', '> Task :dp:compileDebugKotlin']],
    ['NO-SOURCE, then no suffix', 'succeeded', ['> Task :dp:compileDebugKotlin NO-SOURCE', '> Task :dp:compileDebugKotlin']],
    ['a task of the same name in another module', 'not-run', ['> Task :other:compileDebugKotlin']],
    ['a different task of the module', 'not-run', ['> Task :dp:compileDebugJavaWithJavac']],
  ] as Array<[string, string, string[]]>)('gives %s the outcome %s', (_label, outcome, lines) => {
    const r = run(log(...lines, 'BUILD FAILED in 1s'));
    expect(compileOf(r, 'dp').outcome).toBe(outcome);
    expect(compileOf(r, 'tokens').outcome).toBe('not-run');
    expect(compileOf(r, 'probe').outcome).toBe('not-run');
  });

  it('reads each of the three tasks on its own', () => {
    const r = run(
      log(
        '> Task :tokens:compileDebugKotlin UP-TO-DATE',
        '> Task :probe:compileDebugKotlin FAILED',
        '> Task :dp:compileDebugKotlin',
        'BUILD FAILED in 1s',
      ),
    );
    expect(r.compiles.map((c) => c.outcome)).toEqual(['succeeded', 'failed', 'succeeded']);
  });

  it('reports logComplete only when Gradle closes with BUILD SUCCESSFUL or BUILD FAILED', () => {
    expect(run(log(DP_TASK, 'BUILD SUCCESSFUL in 3s')).logComplete).toBe(true);
    expect(run(log(DP_TASK, 'BUILD FAILED in 3s')).logComplete).toBe(true);
    expect(run(log(DP_TASK)).logComplete).toBe(false);
    expect(run(log(DP_TASK, 'e: file:///r/gen/A.kt:1:1 Cut off mid-build.', '> Task :dp:compileDebugKotlin FAILED')).logComplete).toBe(false);
    expect(run(log('BUILDING')).logComplete).toBe(false);
  });

  it('passes the exit status through', () => {
    expect(run('', ROOTS, 0).exitCode).toBe(0);
    expect(run('', ROOTS, 137).exitCode).toBe(137);
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: diagnostics go to the task they were printed under, never by path
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: attribution', () => {
  it('gives a path both tasks report to each task that printed it', () => {
    const line = "e: file:///r/gen/DesignTokens.android.kt:70:20 Unresolved reference 'Oklch'.";
    const r = run(log(TOKENS_TASK, line, line, '', DP_TASK, line, '', '> Task :tokens:compileDebugKotlin FAILED', '> Task :dp:compileDebugKotlin FAILED'));
    const key = "gen:DesignTokens.android.kt | Unresolved reference 'Oklch'.";
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ [key]: 2 });
    expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({ [key]: 1 });
    expect(obj(compileOf(r, 'probe').diagnostics)).toEqual({});
  });

  it('puts a probe-root path under :dp when :dp printed it (the task wins, not the path)', () => {
    const r = run(log(DP_TASK, 'e: file:///r/probe/Probe.kt:3:4 Odd.'));
    expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({ 'probe:Probe.kt | Odd.': 1 });
    expect(compileOf(r, 'probe').diagnostics.size).toBe(0);
  });

  it('reads the Gradle task lines wherever they come, with unrelated tasks in between', () => {
    const r = run(
      log(
        '> Task :tokens:preBuild UP-TO-DATE',
        '> Task :dp:generateDebugResources',
        '',
        TOKENS_TASK,
        'e: file:///r/gen/A.kt:1:1 In tokens.',
        '> Task :dp:processDebugNavigationResources',
        '> Task :dp:parseDebugLocalResources',
        DP_TASK,
        'e: file:///r/pkg/B.kt:1:1 In dp.',
      ),
    );
    expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ 'gen:A.kt | In tokens.': 1 });
    expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({ 'pkg:B.kt | In dp.': 1 });
  });
});

// ---------------------------------------------------------------------------------------------
// The recorded fixtures (Data's 2026-11-04 K2 logs)
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: fixtures recorded under Gradle 9.8.2 / Kotlin 2.4.21', () => {
  it('every fixture log names the toolchain it was recorded under, and has its source, exit and roots', () => {
    const logs = fs.readdirSync(FIXTURES).filter((n) => n.endsWith('.txt'));
    expect(logs.sort()).toEqual([
      'dp-failed-cut.txt',
      'no-task-headers.txt',
      'synthetic-interleaved.txt',
      'synthetic-unattributed.txt',
      'tokens-failed.txt',
    ]);
    for (const name of logs) {
      const f = readFixture(name);
      const toolchain = f.headers.get('toolchain') ?? '';
      expect(toolchain.length).toBeGreaterThan(10);
      expect(toolchain).toMatch(/Gradle 9\.8\.2/);
      expect(toolchain).toMatch(/Kotlin 2\.4\.21/);
      expect(f.headers.get('source') ?? '').not.toBe('');
      expect(Number.isInteger(f.exitCode)).toBe(true);
      expect(f.roots.gen).toMatch(/^\/[^ ]+$/);
      expect(f.roots.pkg).toMatch(/^\/[^ ]+$/);
      expect(f.roots.probe).toMatch(/^\/[^ ]+$/);
      // The scratch paths are rewritten out of every fixture's log (a header may name where it came from).
      expect(f.log).not.toMatch(/\/private\/tmp|claude-501|scratchpad/);
    }
  });

  it('labels the hand-built fixtures SYNTHETIC and the recorded ones not', () => {
    for (const name of ['synthetic-interleaved.txt', 'synthetic-unattributed.txt']) {
      expect(readFixture(name).headers.get('toolchain')).toMatch(/SYNTHETIC/);
    }
    for (const name of ['tokens-failed.txt', 'dp-failed-cut.txt', 'no-task-headers.txt']) {
      expect(readFixture(name).headers.get('toolchain')).not.toMatch(/SYNTHETIC/);
    }
  });

  describe('tokens-failed.txt (run-components.log: :tokens fails, Gradle stops)', () => {
    const r = runFixture('tokens-failed.txt');
    const expected = readExpectedKeys('tokens-failed.keys.tsv');

    it('gives :tokens the failed outcome and the other two not-run', () => {
      expect(r.compiles.map((c) => c.outcome)).toEqual(['failed', 'not-run', 'not-run']);
      expect(r.logComplete).toBe(true);
      expect(r.exitCode).toBe(1);
      expect(r.unattributed).toEqual([]);
      expect(r.compiles.map((c) => c.unrooted.length)).toEqual([0, 0, 0]);
    });

    it('yields the 302 diagnostics of the log as 30 gen: keys, matching the independent pass', () => {
      const tokens = compileOf(r, 'tokens');
      expect(obj(tokens.diagnostics)).toEqual(obj(expected));
      expect([...tokens.diagnostics.values()].reduce((a, b) => a + b, 0)).toBe(302);
      expect(tokens.diagnostics.size).toBe(30);
      expect([...tokens.diagnostics.keys()].every((k) => k.startsWith('gen:'))).toBe(true);
      expect(compileOf(r, 'probe').diagnostics.size).toBe(0);
      expect(compileOf(r, 'dp').diagnostics.size).toBe(0);
    });

    it('keeps the quoted identifiers and drops the generated folder from the path', () => {
      const keys = obj(compileOf(r, 'tokens').diagnostics);
      expect(keys["gen:DesignTokens.android.kt | Unresolved reference 'Oklch'."]).toBe(99);
      expect(keys["gen:DesignTokens.android.kt | Unresolved reference 'dp'."]).toBe(65);
      expect(keys["gen:ComponentTokens.android.kt | Unresolved reference 'SizingTokens'."]).toBe(6);
      expect(keys['gen:DesignTokens.android.kt | Syntax error: Expecting member declaration.']).toBe(7);
    });
  });

  describe('dp-failed-cut.txt (run-android-combined-cold.log, cut: one module compiling both tiers)', () => {
    const r = runFixture('dp-failed-cut.txt');
    const expected = readExpectedKeys('dp-failed-cut.keys.tsv');

    it('gives :dp the failed outcome and the other two not-run', () => {
      expect(r.compiles.map((c) => c.outcome)).toEqual(['not-run', 'not-run', 'failed']);
      expect(r.logComplete).toBe(true);
      expect(r.unattributed).toEqual([]);
      expect(r.compiles.map((c) => c.unrooted.length)).toEqual([0, 0, 0]);
    });

    it('yields the 124 diagnostics as 69 keys (10 gen:, 114 pkg:), matching the independent pass', () => {
      const dp = compileOf(r, 'dp');
      expect(obj(dp.diagnostics)).toEqual(obj(expected));
      const total = (prefix: string) =>
        [...dp.diagnostics].filter(([k]) => k.startsWith(prefix)).reduce((a, [, n]) => a + n, 0);
      expect(total('gen:')).toBe(10);
      expect(total('pkg:')).toBe(114);
      expect(dp.diagnostics.size).toBe(69);
      expect(compileOf(r, 'tokens').diagnostics.size).toBe(0);
    });

    it('holds 13 multi-line diagnostics, joined by " ⏎ ", with package paths relative to the package root', () => {
      const dp = compileOf(r, 'dp');
      const multi = [...dp.diagnostics.keys()].filter((k) => k.includes(' ⏎ '));
      expect(multi.length).toBe(13);
      expect(dp.diagnostics.get(
        "pkg:src/components/core/Container-Base/platforms/android/ContainerBase.android.kt | None of the following candidates is applicable: ⏎ val radius100: Dp: ⏎ Cannot access 'val radius100: Dp': it is private in file. ⏎ val radius100: Dp: ⏎ Cannot access 'val radius100: Dp': it is private in file.",
      )).toBe(1);
      expect(dp.diagnostics.get("pkg:src/components/core/Icon-Base/platforms/android/IconBase.android.kt | Unresolved reference 'R'.")).toBe(17);
      expect(dp.diagnostics.get("gen:ComponentTokens.android.kt | Unresolved reference 'SizingTokens'.")).toBe(6);
      expect(dp.diagnostics.get("pkg:src/blend/ThemeAwareBlendUtilities.android.kt | Unresolved reference 'darkerBlend' on receiver of type 'Color'.")).toBe(3);
    });
  });

  describe('no-task-headers.txt (layout-collide2.log: a log with no "> Task" lines)', () => {
    const f = readFixture('no-task-headers.txt');
    const r = runFixture('no-task-headers.txt');

    it('attributes nothing: no task header, so both Redeclaration diagnostics are unattributed, as printed', () => {
      expect(r.compiles.map((c) => c.outcome)).toEqual(['not-run', 'not-run', 'not-run']);
      expect(r.compiles.every((c) => c.diagnostics.size === 0)).toBe(true);
      expect(r.unattributed).toEqual(f.log.split('\n').filter((l) => l.startsWith('e: ')));
      expect(r.unattributed).toHaveLength(2);
      expect(r.logComplete).toBe(true);
    });

    it('reads the same lines as a two-line Redeclaration key once a header is in force', () => {
      const withHeader = parseKotlin({ log: `${TOKENS_TASK}\n${f.log}`, exitCode: 1, roots: f.roots });
      expect(obj(compileOf(withHeader, 'tokens').diagnostics)).toEqual({
        'pkg:android/src/main/kotlin/dp/Ours.kt | Redeclaration: ⏎ object ProgressTokens : Any': 2,
      });
    });
  });
});

// ---------------------------------------------------------------------------------------------
// Synthetic fixtures: interleaved output, and every way to be unattributed
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: synthetic fixtures', () => {
  describe('synthetic-interleaved.txt (Thurgood\'s risk 6: :tokens and :dp compile at the same time)', () => {
    const r = runFixture('synthetic-interleaved.txt');
    const oklch = "gen:DesignTokens.android.kt | Unresolved reference 'Oklch'.";

    it('attributes each chunk to the task whose header is above it', () => {
      expect(obj(compileOf(r, 'tokens').diagnostics)).toEqual({ [oklch]: 3 });
      expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({
        [oklch]: 2,
        "pkg:src/components/core/Avatar-Base/platforms/android/Avatar.android.kt | Unresolved reference 'AvatarTokens'.": 1,
        "pkg:src/components/core/Container-Base/platforms/android/ContainerBase.android.kt | None of the following candidates is applicable: ⏎ val spaceInset050: Dp: ⏎ Cannot access 'val spaceInset050: Dp': it is private in file.": 1,
      });
      expect(r.unattributed).toEqual([]);
      expect(r.compiles.map((c) => c.unrooted.length)).toEqual([0, 0, 0]);
    });

    it('gives both tasks the failed outcome, :probe not-run, and the log complete', () => {
      expect(r.compiles.map((c) => c.outcome)).toEqual(['failed', 'not-run', 'failed']);
      expect(r.logComplete).toBe(true);
    });

    it('yields no key for the w: line inside a chunk', () => {
      const all = r.compiles.flatMap((c) => [...c.diagnostics.keys()]);
      expect(all.some((k) => k.includes('unused'))).toBe(false);
    });
  });

  describe('synthetic-unattributed.txt (every way an e: line sits under no single compile task)', () => {
    const r = runFixture('synthetic-unattributed.txt');

    it('sends all five stray diagnostics to unattributed, as printed, and none to a compile', () => {
      expect(r.unattributed).toHaveLength(5);
      expect(r.unattributed.map((l) => l.replace(/^.*:(\d+):1 /, '$1 '))).toEqual([
        '1 Printed before any task header.',
        '2 Printed under a task that is not a Kotlin compile.',
        '3 Printed under a module the harness does not run.',
        '4 Printed after a Gradle line, with no header again.',
        '5 Printed after a task line that reports an outcome.',
      ]);
      expect(r.unattributed.every((l) => l.startsWith('e: file://'))).toBe(true);
    });

    it('still attributes the one diagnostic printed under :dp\'s own header', () => {
      expect(obj(compileOf(r, 'dp').diagnostics)).toEqual({
        "pkg:src/components/core/Avatar-Base/platforms/android/Avatar.android.kt | Unresolved reference 'AvatarTokens'.": 1,
      });
      expect(compileOf(r, 'tokens').diagnostics.size).toBe(0);
    });

    it('reads the outcomes from the task lines', () => {
      expect(r.compiles.map((c) => c.outcome)).toEqual(['failed', 'not-run', 'succeeded']);
    });
  });
});

// ---------------------------------------------------------------------------------------------
// Task criterion: the parser is pure
// ---------------------------------------------------------------------------------------------

describe('parseKotlin: purity', () => {
  const source = fs.readFileSync(PARSER_SOURCE, 'utf8');

  it('names none of GITHUB_TOKEN, GH_TOKEN, "gh pr" or pull_request (the credential grep of Task 2)', () => {
    for (const needle of ['GITHUB_TOKEN', 'GH_TOKEN', 'gh pr', 'pull_request']) {
      expect(source).not.toContain(needle);
    }
  });

  it('imports only ./compare, and reads no environment, file, network or process', () => {
    const imports = [...source.matchAll(/from\s+'([^']+)'/g)].map((m) => m[1]);
    expect(imports).toEqual(['./compare']);
    expect(source).not.toMatch(/\brequire\s*\(/);
    expect(source).not.toMatch(/\bprocess\./);
    expect(source).not.toMatch(/\b(fetch|XMLHttpRequest|child_process|execSync|spawn)\b/);
    expect(source).not.toMatch(/\bimport\s*\(/);
  });

  it('is deterministic: the same input twice gives the same result', () => {
    const f = readFixture('dp-failed-cut.txt');
    const a = parseKotlin({ log: f.log, exitCode: f.exitCode, roots: f.roots });
    const b = parseKotlin({ log: f.log, exitCode: f.exitCode, roots: f.roots });
    expect(a).toEqual(b);
  });
});
