/**
 * parse-swift suite (Spec 129 Task 2.2). Owner: Kenya.
 *
 * The recorded-log fixtures under `fixtures/parse-swift/` are real `swiftc` output, each with
 * a `#harness-fixture toolchain:` header naming what it was recorded under (harness/README.md
 * § "Fixtures"). The inline logs below are labelled synthetic: they pin behaviour that real
 * `swiftc` output does not reach on demand.
 *
 * The suite reads files only to load fixtures; the parser itself reads none.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseKey, type Roots, type SwiftCompileId } from '../compare';
import { parseSwift } from '../parse-swift';

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'parse-swift');
const HEADER = '#harness-fixture ';

interface Fixture {
  name: string;
  headers: Map<string, string>;
  log: string;
  exit: number;
  roots: Roots;
}

function loadFixture(name: string): Fixture {
  const lines = fs.readFileSync(path.join(FIXTURE_DIR, `${name}.txt`), 'utf8').split('\n');
  const headers = new Map<string, string>();
  let i = 0;
  for (; i < lines.length && lines[i].startsWith(HEADER); i++) {
    const rest = lines[i].slice(HEADER.length);
    const colon = rest.indexOf(': ');
    headers.set(rest.slice(0, colon), rest.slice(colon + 2));
  }
  const rootsField = headers.get('roots') ?? '';
  const parts = Object.fromEntries(rootsField.split(' ').map((kv) => kv.split('=') as [string, string]));
  return {
    name,
    headers,
    log: lines.slice(i).join('\n'),
    exit: Number(headers.get('exit')),
    roots: { gen: parts.gen, pkg: parts.pkg, probe: parts.probe },
  };
}

function parseFixture(name: string, compile: SwiftCompileId = 'ios.T') {
  const f = loadFixture(name);
  return parseSwift({ compile, log: f.log, exitCode: f.exit, roots: f.roots });
}

const ROOTS: Roots = {
  gen: '/harness/gen',
  pkg: '/harness/consumer/node_modules/@3fn/core',
  probe: '/harness/probe',
};

function parseInline(log: string, exitCode = 1, roots: Roots = ROOTS, compile: SwiftCompileId = 'ios.T') {
  return parseSwift({ compile, log, exitCode, roots });
}

const entries = (m: ReadonlyMap<string, number>) => [...m.entries()];

const FIXTURE_NAMES = fs
  .readdirSync(FIXTURE_DIR)
  .filter((f) => f.endsWith('.txt'))
  .map((f) => f.slice(0, -'.txt'.length))
  .sort();

describe('parse-swift fixtures', () => {
  it('has fixtures, each with a header naming the toolchain it was recorded under', () => {
    expect(FIXTURE_NAMES.length).toBeGreaterThanOrEqual(8);
    for (const name of FIXTURE_NAMES) {
      const f = loadFixture(name);
      expect(f.headers.get('toolchain')).toMatch(/^Xcode \d+\.\d+ \(\w+\), Apple Swift \d/);
      expect(f.headers.get('source')).toBeTruthy();
      expect(Number.isInteger(f.exit)).toBe(true);
      expect(f.roots.gen).toMatch(/^\//);
    }
  });

  it('records the local fixtures under Xcode 27.2', () => {
    for (const name of FIXTURE_NAMES) {
      expect(loadFixture(name).headers.get('toolchain')).toMatch(/^Xcode 27\.2 /);
    }
  });

  it('every key any fixture yields satisfies parseKey', () => {
    for (const name of FIXTURE_NAMES) {
      for (const key of parseFixture(name).diagnostics.keys()) {
        expect(parseKey(key)).not.toBeNull();
      }
    }
  });
});

describe('parse-swift: one diagnostic, one key', () => {
  it('an llvm-style single diagnostic line yields one key', () => {
    const r = parseFixture('single-error');
    expect(entries(r.diagnostics)).toEqual([["gen:Single.swift | cannot find 'undefinedThing' in scope", 1]]);
    expect(r.unrooted).toEqual([]);
    expect(r.outcome).toBe('failed');
    expect(r.compile).toBe('ios.T');
  });

  it('a diagnostic printed twice (location line and caret box) is counted once', () => {
    const f = loadFixture('swift-style-double-print');
    // the fixture really does print the message twice: the location line, then the box's `- error:` line
    expect(f.log.split("cannot find 'undefinedThing' in scope").length - 1).toBe(2);
    const r = parseFixture('swift-style-double-print');
    expect(entries(r.diagnostics)).toEqual([["gen:Single.swift | cannot find 'undefinedThing' in scope", 1]]);
  });

  it('(synthetic) the same location line repeated verbatim is counted once', () => {
    const line = "/harness/gen/A.swift:2:3: error: cannot find 'x' in scope";
    const r = parseInline([line, '  let y = x', '          ^', line, '  let y = x', '          ^'].join('\n'));
    expect(entries(r.diagnostics)).toEqual([["gen:A.swift | cannot find 'x' in scope", 1]]);
  });

  it('(synthetic) two diagnostics with one key at different lines count twice', () => {
    const r = parseInline(
      ["/harness/gen/A.swift:2:3: error: cannot find 'x' in scope", "/harness/gen/A.swift:9:3: error: cannot find 'x' in scope"].join('\n'),
    );
    expect(entries(r.diagnostics)).toEqual([["gen:A.swift | cannot find 'x' in scope", 2]]);
  });

  it('a missing-return fixture yields one `missing return` key', () => {
    const r = parseFixture('missing-return');
    expect(entries(r.diagnostics)).toEqual([["gen:Missing.swift | missing return in global function expected to return 'Int'", 1]]);
    const keys = [...r.diagnostics.keys()].filter((k) => k.includes('missing return'));
    expect(keys).toHaveLength(1);
    expect(r.diagnostics.get(keys[0])).toBe(1);
  });
});

describe('parse-swift: what a key holds', () => {
  it('keeps quoted identifiers, drops line and column, and counts repeats at different lines', () => {
    const r = parseFixture('multi-quoted');
    expect(entries(r.diagnostics)).toEqual([
      ["gen:Multi.swift | cannot convert value of type 'String' to specified type 'Int'", 1],
      ["gen:Multi.swift | cannot find 'undefinedThing' in scope", 2],
    ]);
    for (const key of r.diagnostics.keys()) {
      const parsed = parseKey(key);
      expect(parsed?.path).toBe('Multi.swift');
      expect(parsed?.path).not.toMatch(/:\d/);
    }
  });

  it('makes each path relative to the root it lies under: gen, pkg and probe', () => {
    const r = parseFixture('mixed-roots');
    expect(entries(r.diagnostics)).toEqual([
      ["pkg:src/components/core/Comp/platforms/ios/Comp.swift | type 'DesignTokens' has no member 'nope'", 1],
      ["gen:Single.swift | cannot find 'undefinedThing' in scope", 1],
      ["probe:Probe.swift | type 'DesignTokens' has no member 'hidden'", 1],
    ]);
    expect(r.unrooted).toEqual([]);
  });

  it('a gen path is relative to the platform output folder, not to a root above it', () => {
    const log = '/work/consumer/dist/tokens/DesignTokens.ios.swift:4:9: error: bad thing';
    const roots: Roots = { gen: '/work/consumer/dist/tokens', pkg: '/work/consumer/node_modules/@3fn/core', probe: '/work/probe' };
    expect([...parseInline(log, 1, roots).diagnostics.keys()]).toEqual(['gen:DesignTokens.ios.swift | bad thing']);
  });

  it('(synthetic) the longest root wins: a package file under a gen root of `.` keys as pkg', () => {
    const roots: Roots = { gen: '/work/consumer', pkg: '/work/consumer/node_modules/@3fn/core', probe: '/work/probe' };
    const log = [
      '/work/consumer/node_modules/@3fn/core/src/x/Button.swift:1:1: error: a',
      '/work/consumer/DesignTokens.ios.swift:1:1: error: b',
    ].join('\n');
    expect([...parseInline(log, 1, roots).diagnostics.keys()]).toEqual(['pkg:src/x/Button.swift | a', 'gen:DesignTokens.ios.swift | b']);
  });

  it('(synthetic) a trailing slash on a root changes nothing', () => {
    const roots: Roots = { gen: '/harness/gen/', pkg: ROOTS.pkg + '/', probe: ROOTS.probe + '/' };
    expect([...parseInline('/harness/gen/A.swift:1:1: error: m', 1, roots).diagnostics.keys()]).toEqual(['gen:A.swift | m']);
  });

  it('(synthetic) a root is not matched by a sibling that shares its prefix', () => {
    const r = parseInline('/harness/gen2/A.swift:1:1: error: m');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(['/harness/gen2/A.swift:1:1: error: m']);
  });

  it('(synthetic) normalises the message: each tab becomes one space, trailing whitespace goes, the rest is verbatim', () => {
    const r = parseInline("/harness/gen/A.swift:1:1: error: a\tb  'q'  | r \t \r\n");
    expect([...r.diagnostics.keys()]).toEqual(["gen:A.swift | a b  'q'  | r"]);
    expect(parseKey([...r.diagnostics.keys()][0])?.message).toBe("a b  'q'  | r");
  });

  it('(synthetic) a message may hold ` | `; the key still splits at the first one', () => {
    const key = [...parseInline('/harness/gen/A.swift:1:1: error: x | y').diagnostics.keys()][0];
    expect(parseKey(key)).toEqual({ root: 'gen', path: 'A.swift', message: 'x | y' });
  });
});

describe('parse-swift: what is not a key', () => {
  it('warnings, notes, excerpts and carets are not keys; a note after an error adds nothing', () => {
    const r = parseFixture('notes-and-warnings');
    expect(entries(r.diagnostics)).toEqual([["gen:Notes.swift | invalid redeclaration of 'f()'", 1]]);
    expect(r.unrooted).toEqual([]);
  });

  it('a warning-only compile that exited 0 has no keys and succeeded', () => {
    const r = parseFixture('warning-only', 'ios.C');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual([]);
    expect(r.outcome).toBe('succeeded');
    expect(r.compile).toBe('ios.C');
  });

  it('an error with no path:line:col is neither a key nor unrooted', () => {
    const r = parseFixture('no-location');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual([]);
    expect(r.outcome).toBe('failed');
    const bare = parseInline('error: unable to load standard library\n<unknown>:0: error: nope\nld: error: x');
    expect(bare.diagnostics.size).toBe(0);
    expect(bare.unrooted).toEqual([]);
  });

  it('(synthetic) a line with text before the path still matches the line pattern; its path is not absolute, so it is unrooted, not dropped', () => {
    const lines = [' /harness/gen/A.swift:1:1: error: indented', 'note: /harness/gen/A.swift:1:1: error: prefixed'];
    const r = parseInline(lines.join('\n'));
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(lines);
  });

  it('(synthetic) a warning and a note with a path are not keys', () => {
    const r = parseInline('/harness/gen/A.swift:1:1: warning: w\n/harness/gen/A.swift:1:1: note: n');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual([]);
  });
});

describe('parse-swift: unrooted is never dropped', () => {
  it('a relative path is unrooted, as printed', () => {
    const r = parseFixture('relative-path');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(["gen/Single.swift:2:31: error: cannot find 'undefinedThing' in scope"]);
  });

  it('a path under no root is unrooted, as printed', () => {
    const r = parseFixture('outside-roots');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(["/elsewhere/other/Other.swift:1:21: error: cannot convert value of type 'String' to specified type 'Int'"]);
  });

  it('(synthetic) a path that cannot make a valid key is unrooted: `..`, `.`, empty segment, ` | `, tab', () => {
    const lines = [
      '/harness/gen/../x/A.swift:1:1: error: dotdot',
      '/harness/gen/./A.swift:1:1: error: dot',
      '/harness/gen//A.swift:1:1: error: empty',
      '/harness/gen/a | b.swift:1:1: error: bar',
      '/harness/gen/a\tb.swift:1:1: error: tab',
    ];
    const r = parseInline(lines.join('\n'));
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(lines);
  });

  it('(synthetic) the root itself, or a path ending at it, is unrooted', () => {
    const r = parseInline('/harness/gen/:1:1: error: m');
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toHaveLength(1);
  });

  it('(synthetic) a message that is empty after trimming, or starts with whitespace, is unrooted', () => {
    const lines = ['/harness/gen/A.swift:1:1: error:  leading', '/harness/gen/B.swift:1:1: error:  \t '];
    const r = parseInline(lines.join('\n'));
    expect(r.diagnostics.size).toBe(0);
    expect(r.unrooted).toEqual(lines);
  });

  it('keeps rooted and unrooted diagnostics apart in one log', () => {
    const r = parseInline("/harness/gen/A.swift:1:1: error: ok\nrel/B.swift:1:1: error: nope");
    expect([...r.diagnostics.keys()]).toEqual(['gen:A.swift | ok']);
    expect(r.unrooted).toEqual(['rel/B.swift:1:1: error: nope']);
  });
});

describe('parse-swift: outcome and robustness', () => {
  it('outcome follows the exit status alone: 0 succeeded, anything else failed, never not-run', () => {
    expect(parseInline('', 0).outcome).toBe('succeeded');
    expect(parseInline('', 1).outcome).toBe('failed');
    expect(parseInline('', 139).outcome).toBe('failed');
    expect(parseInline('', -6).outcome).toBe('failed');
    // exit 0 with an error line: the parser reports both; the comparator decides (rule `parser`)
    const r = parseInline('/harness/gen/A.swift:1:1: error: m', 0);
    expect(r.outcome).toBe('succeeded');
    expect(r.diagnostics.size).toBe(1);
  });

  it('reports the compile id it was given, for each of the four stages', () => {
    for (const compile of ['ios.T', 'ios.P', 'ios.C', 'ios.T5'] as const) {
      expect(parseInline('', 1, ROOTS, compile).compile).toBe(compile);
    }
  });

  it('an empty, truncated or diagnostic-free log is an ordinary result', () => {
    for (const log of ['', '\n', 'probe: blocked (token module not built)\n', '/harness/gen/A.swift:1:1: err', '/harness/gen/A.swift:1:1: error:']) {
      const r = parseInline(log);
      expect(r.diagnostics.size).toBe(0);
      expect(r.unrooted).toEqual([]);
    }
  });

  it('reads CRLF logs', () => {
    const r = parseInline('/harness/gen/A.swift:1:1: error: m\r\n  code\r\n^\r\n');
    expect([...r.diagnostics.keys()]).toEqual(['gen:A.swift | m']);
  });

  it('throws only on malformed input: a relative root, an unknown compile id, a non-string log, a non-integer exit', () => {
    expect(() => parseInline('', 1, { ...ROOTS, gen: 'relative/gen' })).toThrow(/absolute/);
    expect(() => parseInline('', 1, { ...ROOTS, pkg: '' })).toThrow(/absolute/);
    expect(() => parseInline('', 1, { ...ROOTS, probe: '/' })).toThrow();
    expect(() => parseSwift({ compile: 'ios.X' as SwiftCompileId, log: '', exitCode: 1, roots: ROOTS })).toThrow(/compile id/);
    expect(() => parseSwift({ compile: 'android.dp' as SwiftCompileId, log: '', exitCode: 1, roots: ROOTS })).toThrow(/compile id/);
    expect(() => parseSwift({ compile: 'ios.T', log: undefined as unknown as string, exitCode: 1, roots: ROOTS })).toThrow(/string/);
    expect(() => parseSwift({ compile: 'ios.T', log: '', exitCode: Number.NaN, roots: ROOTS })).toThrow(/integer/);
  });

  it('is deterministic and does not mutate its input', () => {
    const input = { compile: 'ios.C' as const, log: "/harness/gen/A.swift:1:1: error: m\n", exitCode: 1, roots: { ...ROOTS } };
    const before = JSON.stringify(input);
    expect(entries(parseSwift(input).diagnostics)).toEqual(entries(parseSwift(input).diagnostics));
    expect(JSON.stringify(input)).toBe(before);
  });
});

describe('parse-swift: purity', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'parse-swift.ts'), 'utf8');

  it('names no credential, PR or workflow-event token', () => {
    for (const token of ['GITHUB_TOKEN', 'GH_TOKEN', 'gh pr', 'pull_request']) {
      expect(source).not.toContain(token);
    }
  });

  it('imports only the interface module and touches no fs, process, env or network', () => {
    const imports = [...source.matchAll(/from\s+'([^']+)'/g)].map((m) => m[1]);
    expect(imports).toEqual(['./compare']);
    expect(source).not.toMatch(/\brequire\(/);
    expect(source).not.toMatch(/\bprocess\./);
    expect(source).not.toMatch(/child_process|\bfetch\(|readFileSync|node:/);
  });
});
