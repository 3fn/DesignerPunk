/**
 * @category evergreen
 * @purpose Spec 129 Task 13.3 (U8): d2-check.ts keeps the invocation contract of
 *   `.kiro/issues/2026-11-07-d2-check-step-grant.md` and fails on each way D2 can be wrong.
 *
 * Owner: Ada. The falsification cases are append-only (Peter's F-4 ruling, floor 1): a case is never
 * removed or weakened. Each runs the script by the record's command line from the repository root,
 * against a consumer root copied into a temporary directory. The committed fixture
 * (`fixtures/d2-check/good/`) is partial because `node_modules/` is ignored: it holds the index, the
 * manifest and the generated output, and this test writes the shipped definition files beside them.
 */
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { HARVESTABLE_COMPONENT_TOKEN_FILES } from '../../pack-assert';

const REPO = path.resolve(__dirname, '..', '..', '..');
const SCRIPT = 'scripts/harness/d2-check.ts';
const GOOD = path.join(__dirname, 'fixtures', 'd2-check', 'good');
const TSX = path.join(REPO, 'node_modules', '.bin', 'tsx');

interface Result { status: number | null; stdout: string; stderr: string; lines: string[] }

function runCheck(args: string[]): Result {
  const r = spawnSync(TSX, [SCRIPT, ...args], { cwd: REPO, encoding: 'utf-8', timeout: 60_000 });
  return { status: r.status, stdout: r.stdout, stderr: r.stderr, lines: r.stdout.split('\n').filter(l => l !== '') };
}

const tmpRoots: string[] = [];
afterAll(() => { for (const d of tmpRoots) fs.rmSync(d, { recursive: true, force: true }); });

const index = (root: string) => path.join(root, 'token-index', 'components.yaml');
const swift = (root: string) => path.join(root, 'out', 'tokens', 'ComponentTokens.ios.swift');
const kotlin = (root: string) => path.join(root, 'out', 'tokens', 'ComponentTokens.android.kt');
const edit = (file: string, fn: (text: string) => string): void => {
  const before = fs.readFileSync(file, 'utf-8');
  const after = fn(before);
  if (after === before) throw new Error(`the edit changed nothing in ${file}`);
  fs.writeFileSync(file, after);
};
/** Delete the lines that mention `needle` (and the comment line above a declaration). */
const dropLine = (needle: string) => (text: string): string =>
  text.split('\n').filter(l => !l.includes(needle)).join('\n');

/** A consumer root: the good fixture, with the six shipped definition files written where the package installs them. */
function consumer(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'd2-check-'));
  tmpRoots.push(root);
  fs.cpSync(GOOD, root, { recursive: true });
  for (const rel of HARVESTABLE_COMPONENT_TOKEN_FILES) {
    const dest = path.join(root, 'node_modules', '@3fn', 'core', rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(REPO, rel), dest);
  }
  return root;
}

const verdict = (r: Result, name: string): string | undefined => r.lines.find(l => l.startsWith(`d2-check ${name}: `));
const VERDICT_ORDER = ['completeness', 'ios', 'android'];

function expectThreeVerdictLines(r: Result): void {
  expect(r.lines).toHaveLength(3);
  r.lines.forEach((l, i) => expect(l.startsWith(`d2-check ${VERDICT_ORDER[i]}: `)).toBe(true));
}

describe('d2-check.ts — the invocation contract', () => {
  test('exit 0 with three PASS lines and nothing else on stdout; every PASS prints a count above 0', () => {
    const r = runCheck(['--consumer', consumer()]);
    expect(r.status).toBe(0);
    expectThreeVerdictLines(r);
    for (const l of r.lines) expect(l).toMatch(/^d2-check (completeness|ios|android): PASS count=[1-9]\d* /);
    expect(r.stdout.endsWith('\n')).toBe(true);
  });

  test('exit 1 with a FAIL completeness line: a token dropped from both the index and the output', () => {
    const root = consumer();
    edit(index(root), t => t.replace(/^ {2}avatar\.size\.md:[\s\S]*?(?=^ {2}\S)/m, ''));
    edit(swift(root), dropLine('static let sizeMd: CGFloat'));
    edit(kotlin(root), dropLine('val sizeMd ='));
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expectThreeVerdictLines(r);
    expect(verdict(r, 'completeness')).toMatch(/^d2-check completeness: FAIL count=\d+ missing=1 \[avatar\.size\.md\]/);
    // The two still match each other: only the comparison with the definition files fails.
    expect(verdict(r, 'ios')).toMatch(/: PASS /);
    expect(verdict(r, 'android')).toMatch(/: PASS /);
  });

  test.each([
    ['ios', swift, 'public static let sizeXs: CGFloat', 'AvatarTokens.sizeXs'],
    ['android', kotlin, 'val sizeXs =', 'AvatarTokens.sizeXs'],
  ] as const)('exit 1 with a FAIL %s line for a missing key, the other two verdict lines still printed', (platform, file, needle, name) => {
    const root = consumer();
    edit(file(root), dropLine(needle));
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expectThreeVerdictLines(r);
    expect(verdict(r, platform)).toContain(`FAIL`);
    expect(verdict(r, platform)).toContain(`missing=1 [${name}]`);
    for (const other of VERDICT_ORDER.filter(n => n !== platform)) expect(verdict(r, other)).toMatch(/: PASS /);
  });

  test.each([
    ['ios', swift, (t: string) => t.replace('public enum AvatarTokens {', 'public enum AvatarTokens {\n    public static let bogus: CGFloat = 1'), 'AvatarTokens.bogus'],
    ['android', kotlin, (t: string) => t.replace('object AvatarTokens {', 'object AvatarTokens {\n    val bogus = 1'), 'AvatarTokens.bogus'],
  ] as const)('exit 1 with a FAIL %s line for an extra key, the other two verdict lines still printed', (platform, file, fn, name) => {
    const root = consumer();
    edit(file(root), fn);
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expectThreeVerdictLines(r);
    expect(verdict(r, platform)).toContain(`extra=1 [${name}]`);
    for (const other of VERDICT_ORDER.filter(n => n !== platform)) expect(verdict(r, other)).toMatch(/: PASS /);
  });

  test.each([
    ['a consumer root that does not exist', () => ['--consumer', path.join(os.tmpdir(), 'd2-check-no-such-root')], /does not exist/],
    ['an unknown argument', () => ['--consumer', consumer(), '--platform', 'ios'], /unknown argument --platform/],
    ['no --consumer', () => [], /--consumer <root> is required/],
  ] as const)('exit 2 with the setup line and no verdict line for %s', (_name, args, why) => {
    const r = runCheck([...args()]);
    expect(r.status).toBe(2);
    expect(r.lines).toHaveLength(1);
    expect(r.lines[0]).toMatch(/^d2-check: FAIL setup \(.+\)$/);
    expect(r.lines[0]).toMatch(why);
  });

  test('exit 2 with the setup line for an uncaught error inside the check; the detail goes to stderr', () => {
    const root = consumer();
    fs.writeFileSync(path.join(root, 'harness-consumer.json'), '{ not json');
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(2);
    expect(r.lines).toHaveLength(1);
    expect(r.lines[0]).toMatch(/^d2-check: FAIL setup \(.+\)$/);
    expect(r.stderr).toContain('d2-check:');
  });
});

describe('d2-check.ts — falsification cases from Peter\'s F-4 ruling (append-only)', () => {
  /** Rename `ProgressTokens.nodeSizeSm` to a Swift keyword member in the index, on iOS. */
  const keywordInIndex = (root: string): void =>
    edit(index(root), t => t.replace(/(progress\.node\.size\.sm:[\s\S]*?ios: )ProgressTokens\.nodeSizeSm/, '$1ProgressTokens.default'));

  test('Swift: a backtick-escaped name in the output matches the index name', () => {
    const root = consumer();
    keywordInIndex(root);
    edit(swift(root), t => t.replace('public static let nodeSizeSm:', 'public static let `default`:'));
    const r = runCheck(['--consumer', root]);
    expect(verdict(r, 'ios')).toMatch(/: PASS /);
    expect(r.status).toBe(0);
  });

  test('Swift: a backtick-escaped name missing from the output fails', () => {
    const root = consumer();
    keywordInIndex(root);
    edit(swift(root), dropLine('static let nodeSizeSm:'));
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expect(verdict(r, 'ios')).toContain('missing=1 [ProgressTokens.default]');
  });

  test('Swift: a backtick-escaped extra name in the output fails', () => {
    const root = consumer();
    edit(swift(root), t => t.replace('public enum ProgressTokens {', 'public enum ProgressTokens {\n    public static let `class`: CGFloat = 1'));
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expect(verdict(r, 'ios')).toContain('extra=1 [ProgressTokens.class]');
  });

  test('a token missing on iOS fails; an extra one on Android fails', () => {
    const a = consumer();
    edit(swift(a), dropLine('static let sizeMd: CGFloat'));
    expect(runCheck(['--consumer', a]).status).toBe(1);
    const b = consumer();
    edit(kotlin(b), t => t.replace('object ProgressTokens {', 'object ProgressTokens {\n    val extraOne = 1'));
    const r = runCheck(['--consumer', b]);
    expect(r.status).toBe(1);
    expect(verdict(r, 'android')).toContain('extra=1');
  });

  test('a token dropped from both the index and the definition files fails: the output still carries it', () => {
    const root = consumer();
    edit(index(root), t => t.replace(/^ {2}avatar\.size\.md:[\s\S]*?(?=^ {2}\S)/m, ''));
    const def = path.join(root, 'node_modules', '@3fn', 'core', 'src', 'components', 'core', 'Avatar-Base', 'avatar.tokens.ts');
    edit(def, t => t.replace("    'size.md': {", "    'sizeXmd': {"));
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expect(verdict(r, 'ios')).toMatch(/FAIL .*extra=1 \[AvatarTokens\.sizeMd\]/);
    expect(verdict(r, 'android')).toMatch(/FAIL .*extra=1 \[AvatarTokens\.sizeMd\]/);
  });

  test('an empty consumer, index absent: the setup line, exit 2, no verdict line', () => {
    const root = consumer();
    fs.rmSync(path.join(root, 'token-index'), { recursive: true });
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(2);
    expect(r.lines).toEqual([expect.stringMatching(/^d2-check: FAIL setup \(.*components\.yaml.*\)$/)]);
  });

  test('an empty consumer, index present with no entries: count=0 on a platform line is a FAIL, exit 1', () => {
    const root = consumer();
    fs.writeFileSync(index(root), 'tokens: {}\n');
    const r = runCheck(['--consumer', root]);
    expect(r.status).toBe(1);
    expectThreeVerdictLines(r);
    expect(verdict(r, 'ios')).toMatch(/^d2-check ios: FAIL count=0 /);
    expect(verdict(r, 'android')).toMatch(/^d2-check android: FAIL count=0 /);
  });

  test('the rename pair: a rename in both the index and the output passes; a rename in the output only fails', () => {
    const both = consumer();
    edit(index(both), t => t.replace(/ProgressTokens\.nodeSizeSm\b/g, 'ProgressTokens.nodeDotSm'));
    edit(swift(both), t => t.replace('static let nodeSizeSm:', 'static let nodeDotSm:'));
    edit(kotlin(both), t => t.replace('val nodeSizeSm =', 'val nodeDotSm ='));
    const rBoth = runCheck(['--consumer', both]);
    expect(rBoth.status).toBe(0);

    const outputOnly = consumer();
    edit(swift(outputOnly), t => t.replace('static let nodeSizeSm:', 'static let nodeDotSm:'));
    const rOut = runCheck(['--consumer', outputOnly]);
    expect(rOut.status).toBe(1);
    expect(verdict(rOut, 'ios')).toContain('missing=1 [ProgressTokens.nodeSizeSm]');
    expect(verdict(rOut, 'ios')).toContain('extra=1 [ProgressTokens.nodeDotSm]');
  });

  test('the walk finds exactly the files the package ships: the root and one basename match, and no list', () => {
    const root = consumer();
    const found: string[] = [];
    const walk = (dir: string): void => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (/^([^.]+\.)?tokens\.ts$/.test(e.name)) found.push(path.relative(path.join(root, 'node_modules', '@3fn', 'core'), full).split(path.sep).join('/'));
      }
    };
    walk(path.join(root, 'node_modules', '@3fn', 'core', 'src', 'components', 'core'));
    expect(found.sort()).toEqual([...HARVESTABLE_COMPONENT_TOKEN_FILES].sort());
  });
});

describe('d2-check.ts — the design rule, as a grep (Peter\'s F-4 ruling)', () => {
  const ROOT_LITERAL = 'node_modules/@3fn/core/src/components/core/';
  const DEFINITION_FILE_NAMES = [
    'avatar.tokens', 'buttonIcon.tokens', 'checkbox-sizing.tokens', 'radio-sizing.tokens',
    'Button-VerticalList-Item.tokens', 'Badge-Label-Base/tokens', 'Badge-Count-Notification',
  ];

  /** What breaks the rule in `source`. The grep reaches imports and literals only. */
  function breaches(source: string): string[] {
    const out: string[] = [];
    if (/(?:from\s+|require\(\s*|import\(\s*)['"][^'"]*(?:src\/generators|src\/build|@3fn\/core)/.test(source)) out.push('imports a generator, build or package module');
    if (/src\/generators|src\/build/.test(source)) out.push('a path under src/generators or src/build');
    const pkgPaths = source.split('node_modules/@3fn/core').length - 1;
    const rootLiterals = source.split(ROOT_LITERAL).length - 1;
    if (pkgPaths !== rootLiterals || rootLiterals > 1) out.push('a path under node_modules/@3fn/core other than the one walk-root literal');
    for (const n of DEFINITION_FILE_NAMES) if (source.includes(n)) out.push(`a definition file's name as a literal: ${n}`);
    return out;
  }

  test('the script has none of them', () => {
    expect(breaches(fs.readFileSync(path.join(REPO, SCRIPT), 'utf-8'))).toEqual([]);
    expect(fs.readFileSync(path.join(REPO, SCRIPT), 'utf-8').split(ROOT_LITERAL).length - 1).toBe(1);
  });

  test.each([
    ["import { x } from '../../src/generators/TokenFileGenerator';", 'imports'],
    ["const m = require('../../src/build/tokens');", 'imports'],
    ["import { defineComponentTokens } from '@3fn/core/build';", 'imports'],
    ["const p = 'src/generators/native/FontFamilyStack.ts';", 'a path under src/generators'],
    ["const p = 'node_modules/@3fn/core/dist/x.js';", 'a path under node_modules/@3fn/core'],
    [`const a = '${ROOT_LITERAL}'; const b = '${ROOT_LITERAL}';`, 'a path under node_modules/@3fn/core'],
    ["const list = ['Avatar-Base/avatar.tokens.ts'];", "a definition file's name"],
  ])('the grep fails on %s', (source, why) => {
    expect(breaches(source).join('\n')).toContain(why);
  });
});
