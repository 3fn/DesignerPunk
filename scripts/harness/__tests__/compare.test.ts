/**
 * The comparator's falsification suite (Spec 129 Task 2.5; Req 3.10; design § 3; tasks.md Task 2's
 * criteria). Owner: Thurgood. Stacy reads these cases at review.
 *
 * Every case starts from one passing world, a throwaway git repository with a merge-base commit
 * and a head commit, and changes one thing. A red case asserts the comparator's whole failure
 * list, so each case is red for exactly the reason it names and no other. A green case asserts
 * PASS and the line it prints. Nothing reads the real repository.
 *
 * The suite builds `CompileResult`s directly, so it does not depend on the two parsers (Kenya's
 * and Data's suites cover those); the command-line case injects stub parsers.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  CompileResult,
  ContextName,
  ContextResults,
  KotlinParseInput,
  KotlinParseResult,
  Report,
  SwiftParseInput,
  compareRepo,
  formatFailure,
  formatKey,
  main,
  parseKey,
  parseList,
  parsePins,
} from '../compare';

const GIT_ENV: NodeJS.ProcessEnv = {
  ...process.env,
  TZ: 'UTC',
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 'Fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'Fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
  GIT_TERMINAL_PROMPT: '0',
};

const git = (cwd: string, args: string[]): string =>
  execFileSync('git', args, { cwd, env: GIT_ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

// ------------------------------------------------------------------------------------------
// The world
// ------------------------------------------------------------------------------------------

const OPEN = '2026-01-01-open-record.md';
const PROTECTED = '2026-01-02-protected-record.md';
const MANUAL = '2026-01-03-manual-record.md';
const CLOSED = '2026-01-04-closed-record.md';
const OTHER = '2026-01-06-other-record.md';

const record = (trigger: string, body = ''): string =>
  `# A fixture record\n\n**Owner**: Lina\n**Trigger**: ${trigger} — fixture prose\n\nThe record names item-a and item-b.\n${body}`;

const K1 = "gen:DesignTokens.ios.swift | cannot find 'X' in scope";
const K2 = "gen:DesignTokens.ios.swift | cannot find 'Y' in scope";
const PKG = 'pkg:src/components/core/Avatar/platforms/ios/Avatar.ios.swift';
const KP = `${PKG} | value of type 'Theme' has no member 'surface'`;
/** The repository file a pkg: key maps to (design § 3, "Paths for Req 3.5 (c)"). */
const PKG_FILE = PKG.slice('pkg:'.length);

const PINS = `consumer:
  abbreviation: XY   # not DP
ios:
  runner: macos-26
  toolchain:
    xcode.version: "26.6"
    swift.version: "6.2"
android:
  runner: ubuntu-24.04
  toolchain:
    java.version: "17.0.21"
`;

type Files = Record<string, string | null>;

const LIST = (c: ContextName): string => `harness/expected/${c}.tsv`;

const baseFiles = (): Files => ({
  'harness/pins.yaml': PINS,
  'harness/protected-set.txt': `${PROTECTED}\n`,
  [LIST('harness-ios-tokens')]: `# fixture list\n${K1}\t2\t${OPEN}\n`,
  [LIST('harness-ios-components')]: '',
  [LIST('harness-android-tokens')]: '',
  [LIST('harness-android-components')]: '',
  [`.kiro/issues/${OPEN}`]: record('`path:never/**`'),
  [`.kiro/issues/${PROTECTED}`]: record('`path:never-too/**`'),
  [`.kiro/issues/${MANUAL}`]: record('`manual`'),
  [`.kiro/issues/${OTHER}`]: record('`release:next:phase-1`'),
  [`.kiro/issues/archive/${CLOSED}`]: record('`path:never/**`'),
  '.kiro/issues/README.md': '# Issues\n',
  [PKG_FILE]: '// the package file\n',
});

const writeFiles = (dir: string, files: Files): void => {
  for (const [rel, text] of Object.entries(files)) {
    const abs = path.join(dir, rel);
    if (text === null) {
      if (fs.existsSync(abs)) fs.rmSync(abs);
    } else {
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, text);
    }
  }
};

const commitAll = (dir: string, subject: string): string => {
  git(dir, ['add', '-A']);
  git(dir, ['commit', '-q', '--no-verify', '--allow-empty', '-m', subject]);
  return git(dir, ['rev-parse', 'HEAD']);
};

const dirs: string[] = [];
afterAll(() => {
  for (const d of dirs) fs.rmSync(d, { recursive: true, force: true });
});

interface Scenario {
  /** Changes to the base world before the base commit. */
  base?: Files;
  /** Extra commits after the first, before the base (e.g. a commit that fires a Trigger). */
  history?: Files[];
  /** Changes at the head. */
  head?: Files;
}

interface Repo {
  dir: string;
  base: string;
  head: string;
}

const buildRepo = (s: Scenario = {}): Repo => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-compare-'));
  dirs.push(dir);
  git(dir, ['init', '-q', '-b', 'main']);
  writeFiles(dir, { ...baseFiles(), ...(s.base ?? {}) });
  commitAll(dir, 'the world');
  for (const h of s.history ?? []) {
    writeFiles(dir, h);
    commitAll(dir, 'history');
  }
  const base = git(dir, ['rev-parse', 'HEAD']);
  writeFiles(dir, s.head ?? {});
  const head = commitAll(dir, 'the head');
  return { dir, base, head };
};

const result = (compile: CompileResult['compile'], outcome: CompileResult['outcome'], diags: Record<string, number> = {}, unrooted: string[] = []): CompileResult => ({
  compile,
  outcome,
  diagnostics: new Map(Object.entries(diags)),
  unrooted,
});

const IOS_TOOLCHAIN = { 'xcode.version': '26.6', 'swift.version': '6.2' };

/** The passing ios-tokens results: Stage T fails with the listed key twice; Stage P is blocked. */
const iosTokens = (diags: Record<string, number> = { [K1]: 2 }, extra: Partial<ContextResults> = {}): ContextResults => ({
  compiles: [result('ios.T', 'failed', diags)],
  files: { gen: { compiled: 3, floor: 3 } },
  toolchain: IOS_TOOLCHAIN,
  ...extra,
});

const run = (repo: Repo, results: ContextResults, context: ContextName = 'harness-ios-tokens', base: string | null = repo.base): Report =>
  compareRepo({ repo: repo.dir, base, context, results: { checks: [], ...results } });

const red = (r: Report): string[] => r.failures.map(formatFailure);

/** An addition at the head: K2 on the list, observed. */
const ADD_K2 = { [LIST('harness-ios-tokens')]: `# fixture list\n${K1}\t2\t${OPEN}\n${K2}\t1\t${OPEN}\n` };
const OBSERVE_K2 = { [K1]: 2, [K2]: 1 };

// ------------------------------------------------------------------------------------------
// The passing world
// ------------------------------------------------------------------------------------------

describe('the passing world', () => {
  it('passes, with the summary line of Req 3.8', () => {
    const r = run(buildRepo(), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens PASS');
    expect(r.notes).toEqual(['probe: blocked (ios.T failed); its count is not compared']);
    expect(r.summary).toBe(
      'harness-summary: harness-ios-tokens · expected=2 · observed=2 · new=0 · stale=0 · count-changed=0 · ' +
        'additions=(a) 0, (b) 0, (c) 0 · retags=0 · files=gen 3/3 (compiled/floor) · remaining=1 entries · ' +
        'a pass means the failures match the list, not that it compiles',
    );
  });
});

// ------------------------------------------------------------------------------------------
// C3: two-sided (Req 3.3)
// ------------------------------------------------------------------------------------------

describe('two-sided (Req 3.3)', () => {
  it('fails on an observed key not on the list', () => {
    expect(red(run(buildRepo(), iosTokens(OBSERVE_K2)))).toEqual([`FAIL new: ${K2} (observed 1; not on the list)`]);
  });
  it('fails on an observed count above its pin', () => {
    expect(red(run(buildRepo(), iosTokens({ [K1]: 3 })))).toEqual([`FAIL count-above: ${K1} (observed 3, listed 2)`]);
  });
  it('fails on an observed count below its pin', () => {
    expect(red(run(buildRepo(), iosTokens({ [K1]: 1 })))).toEqual([`FAIL count-below: ${K1} (observed 1, listed 2)`]);
  });
  it('fails on a listed key that does not occur', () => {
    const r = run(buildRepo(), iosTokens({}, { compiles: [result('ios.T', 'succeeded'), result('ios.P', 'succeeded')] }));
    expect(red(r)).toEqual([`FAIL stale: ${K1} (listed 2; not observed)`]);
  });
  it('sums a key split across two tags', () => {
    const split = { [LIST('harness-ios-tokens')]: `${K1}\t1\t${OPEN}\n${K1}\t1\t${OTHER}\n` };
    const r = run(buildRepo({ base: split }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.counts.expected).toBe(2);
  });
});

// ------------------------------------------------------------------------------------------
// C4: the floor, and an addition under no exception (Req 3.4, 3.5)
// ------------------------------------------------------------------------------------------

describe('the floor (Req 3.4)', () => {
  it('fails when fewer files reach the compiler than the floor', () => {
    expect(red(run(buildRepo(), iosTokens(undefined, { files: { gen: { compiled: 2, floor: 3 } } })))).toEqual([
      'FAIL floor: gen: 2 files reached the compiler, below the floor of 3',
    ]);
  });
  it('fails when zero files reach the compiler, whatever the floor', () => {
    expect(red(run(buildRepo(), iosTokens(undefined, { files: { gen: { compiled: 0, floor: 0 } } })))).toEqual([
      'FAIL floor: gen: 0 files reached the compiler',
    ]);
  });
  it('fails when the floor computed at run time is zero', () => {
    expect(red(run(buildRepo(), iosTokens(undefined, { files: { gen: { compiled: 3, floor: 0 } } })))).toEqual([
      'FAIL floor: gen: the floor computed at run time is 0',
    ]);
  });
  it('fails a component context missing a tier count', () => {
    const r = run(
      buildRepo(),
      { compiles: [result('ios.C', 'succeeded'), result('ios.T5', 'succeeded')], files: { gen: { compiled: 3, floor: 3 } }, toolchain: IOS_TOOLCHAIN },
      'harness-ios-components',
    );
    expect(red(r)).toEqual(['FAIL input: no file count for the pkg tier']);
  });
});

describe('additions against a readable merge base (Req 3.5)', () => {
  it('fails on an addition under none of exceptions (a), (b) or (c)', () => {
    expect(red(run(buildRepo({ head: ADD_K2 }), iosTokens(OBSERVE_K2)))).toEqual([
      `FAIL addition: ${K2} (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`,
    ]);
  });
  it('fails on a raised count under no exception', () => {
    const raise = { [LIST('harness-ios-tokens')]: `${K1}\t3\t${OPEN}\n` };
    expect(red(run(buildRepo({ head: raise }), iosTokens({ [K1]: 3 })))).toEqual([
      `FAIL addition: ${K1} (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`,
    ]);
  });
});

// ------------------------------------------------------------------------------------------
// C5: exception (a) compares parsed pin values
// ------------------------------------------------------------------------------------------

describe('exception (a): a changed pinned value (Req 3.5 (a))', () => {
  const ADDITION_RED = `FAIL addition: ${K2} (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`;
  it('a comment-only pin edit admits no addition', () => {
    const head = { ...ADD_K2, 'harness/pins.yaml': PINS.replace('# not DP', '# not DP, and a new comment') + '# trailing comment\n' };
    expect(red(run(buildRepo({ head }), iosTokens(OBSERVE_K2)))).toEqual([ADDITION_RED]);
  });
  it('a whitespace-only pin edit admits no addition', () => {
    const head = { ...ADD_K2, 'harness/pins.yaml': PINS.replace('abbreviation: XY', 'abbreviation:     XY') + '\n\n' };
    expect(red(run(buildRepo({ head }), iosTokens(OBSERVE_K2)))).toEqual([ADDITION_RED]);
  });
  it('a changed pinned value admits the addition, printed', () => {
    const pins = PINS.replace('xcode.version: "26.6"', 'xcode.version: "26.7"');
    const r = run(buildRepo({ head: { ...ADD_K2, 'harness/pins.yaml': pins } }), iosTokens(OBSERVE_K2, { toolchain: { ...IOS_TOOLCHAIN, 'xcode.version': '26.7' } }));
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`added (a): ${K2} +1 ${OPEN}`);
    expect(r.counts.additions).toEqual({ a: 1, b: 0, c: 0 });
  });
  it('a pin file absent at a readable base counts as changed (an adaptation: the reading of "a pinned value changes")', () => {
    const r = run(buildRepo({ base: { 'harness/pins.yaml': null }, head: { ...ADD_K2, 'harness/pins.yaml': PINS } }), iosTokens(OBSERVE_K2));
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`added (a): ${K2} +1 ${OPEN}`);
  });
  it('compares a value change in a section the context does not read (Req 3.5 (a) is not scoped by platform)', () => {
    const pins = PINS.replace('java.version: "17.0.21"', 'java.version: "17.0.22"');
    const r = run(buildRepo({ head: { ...ADD_K2, 'harness/pins.yaml': pins } }), iosTokens(OBSERVE_K2));
    expect(red(r)).toEqual([]);
    expect(r.counts.additions.a).toBe(1);
  });
  it('parsePins: a comment or whitespace edit leaves the parsed document unchanged', () => {
    expect(parsePins(PINS).canonical).toBe(parsePins(`${PINS}# a comment\n\n`).canonical);
    expect(parsePins(PINS).canonical).not.toBe(parsePins(PINS.replace('"6.2"', '"6.3"')).canonical);
  });
});

describe('exception (b): the list absent at a readable base', () => {
  it("admits every entry on U1's own PR, where the list, pins and protected set are all absent at the base", () => {
    const base: Files = { 'harness/pins.yaml': null, 'harness/protected-set.txt': null, [LIST('harness-ios-tokens')]: null };
    const head: Files = { 'harness/pins.yaml': PINS, 'harness/protected-set.txt': `${PROTECTED}\n`, [LIST('harness-ios-tokens')]: `${K1}\t2\t${OPEN}\n` };
    const r = run(buildRepo({ base, head }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`added (b): ${K1}\t2\t${OPEN}`);
    expect(r.counts.additions).toEqual({ a: 0, b: 1, c: 0 });
  });
});

describe('exception (c): uncovered by a fix', () => {
  it('admits an addition when the same diff lowers an entry on a list of the same platform, printed unmasked:', () => {
    const base = { [LIST('harness-ios-components')]: `${KP}\t2\t${OPEN}\n` };
    const head = { ...ADD_K2, [LIST('harness-ios-components')]: `${KP}\t1\t${OPEN}\n` };
    const r = run(buildRepo({ base, head }), iosTokens(OBSERVE_K2));
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`unmasked: ${K2} +1 ${OPEN} (the diff lowers harness/expected/harness-ios-components.tsv ${KP})`);
  });
  it('admits a pkg: addition when the same diff edits the file it is located in', () => {
    const base = { [LIST('harness-ios-components')]: '' };
    const head = { [LIST('harness-ios-components')]: `${KP}\t1\t${OPEN}\n`, [PKG_FILE]: '// the package file, edited\n' };
    const results: ContextResults = {
      compiles: [result('ios.C', 'failed', { [KP]: 1 }), result('ios.T5', 'succeeded')],
      files: { gen: { compiled: 3, floor: 3 }, pkg: { compiled: 40, floor: 40 } },
      toolchain: IOS_TOOLCHAIN,
    };
    const r = run(buildRepo({ base, head }), results, 'harness-ios-components');
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`unmasked: ${KP} +1 ${OPEN} (the diff edits ${PKG_FILE})`);
  });
  it('does not cross platforms: a removal from an Android list admits no iOS addition', () => {
    const AK = 'gen:DesignTokens.android.kt | Unresolved reference \'Oklch\'';
    const base = { [LIST('harness-android-tokens')]: `${AK}\t99\t${OPEN}\n` };
    const head = { ...ADD_K2, [LIST('harness-android-tokens')]: '' };
    expect(red(run(buildRepo({ base, head }), iosTokens(OBSERVE_K2)))).toEqual([
      `FAIL addition: ${K2} (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`,
    ]);
  });
});

// ------------------------------------------------------------------------------------------
// C6: tags resolve and can fire (Req 3.6; requirements.md Conventions "Can fire")
// ------------------------------------------------------------------------------------------

describe('tags (Req 3.6)', () => {
  const tagged = (tag: string): Files => ({ [LIST('harness-ios-tokens')]: `${K1}\t2\t${tag}\n` });
  const tagRed = (tag: string, base: Files = {}, history: Files[] = []): string[] =>
    red(run(buildRepo({ base: { ...tagged(tag), ...base }, history }), iosTokens()));

  it('fails on a tag naming a record under archive/', () => {
    expect(tagRed(CLOSED)).toEqual([`FAIL tag: ${CLOSED} names a record under archive/ (first on ${K1})`]);
  });
  it('fails on a tag naming a missing record', () => {
    const name = '2026-01-09-no-such-record.md';
    expect(tagRed(name)).toEqual([`FAIL tag: ${name} names no record at the issues root (first on ${K1})`]);
  });
  it('fails on a tag naming a record whose Trigger token is manual', () => {
    expect(tagRed(MANUAL)).toEqual([`FAIL tag: ${MANUAL} names a record whose Trigger token is manual (first on ${K1})`]);
  });
  it('fails on a tag naming the issues README', () => {
    expect(tagRed('README.md')).toEqual([`FAIL tag: README.md names the issues README, which is not a record (first on ${K1})`]);
  });
  it('fails on a record whose Trigger token README rule 1 does not name', () => {
    const name = '2026-01-07-untokened-record.md';
    expect(tagRed(name, { [`.kiro/issues/${name}`]: record('`when-it-feels-right`') })).toEqual([
      `FAIL tag: ${name} names a record whose Trigger token \`when-it-feels-right\` is not one README rule 1 names (first on ${K1})`,
    ]);
  });
  it('fails on a record with no Trigger line', () => {
    const name = '2026-01-07-no-trigger.md';
    expect(tagRed(name, { [`.kiro/issues/${name}`]: '# A record with no trigger\n' })).toEqual([
      `FAIL tag: ${name} names a record with no **Trigger**: token (first on ${K1})`,
    ]);
  });
  it('fails on a record whose path: Trigger fired and that is still open (issues-owned.sh FIRED@)', () => {
    const name = '2026-01-05-fired-record.md';
    const repo = buildRepo({ base: { ...tagged(name), [`.kiro/issues/${name}`]: record('`path:src/fires/**`') }, history: [{ 'src/fires/a.txt': 'fired\n' }] });
    const sha = git(repo.dir, ['log', '-1', '--format=%h', repo.base]);
    expect(red(run(repo, iosTokens()))).toEqual([
      `FAIL tag: ${name} names a record whose Trigger has fired (FIRED@${sha}) and that is still open (first on ${K1})`,
    ]);
  });
  it('fails on a record whose merge:#<N> Trigger fired', () => {
    const name = '2026-01-05-merge-record.md';
    const dir = buildRepo({ base: { ...tagged(name), [`.kiro/issues/${name}`]: record('`merge:#42`') } }).dir;
    // A first-parent subject ending (#42) on the base's line, as a squash merge writes.
    const r2 = (() => {
      git(dir, ['reset', '-q', '--hard', 'HEAD~1']);
      git(dir, ['commit', '-q', '--allow-empty', '-m', 'Some unit (#42)']);
      const base = git(dir, ['rev-parse', 'HEAD']);
      return { dir, base, head: commitAll(dir, 'the head') };
    })();
    const sha = git(dir, ['log', '-1', '--format=%h', r2.base]);
    expect(red(run(r2, iosTokens()))).toEqual([
      `FAIL tag: ${name} names a record whose Trigger has fired (FIRED@${sha}) and that is still open (first on ${K1})`,
    ]);
  });
  it('does not count a fire when the head re-rules the Trigger (a re-rule stops the lapse)', () => {
    const name = '2026-01-05-fired-record.md';
    const repo = buildRepo({
      base: { ...tagged(name), [`.kiro/issues/${name}`]: record('`path:src/fires/**`') },
      history: [{ 'src/fires/a.txt': 'fired\n' }],
      head: { [`.kiro/issues/${name}`]: record('`path:src/fires-later/**`') },
    });
    expect(red(run(repo, iosTokens()))).toEqual([]);
  });
  it('fails on an item label the record does not contain, and passes one it does', () => {
    expect(tagRed(`${OPEN}#item-c`)).toEqual([`FAIL tag: ${OPEN}#item-c names an item label "item-c" the record does not contain (first on ${K1})`]);
    expect(tagRed(`${OPEN}#item-a`)).toEqual([]);
    // A label is found only as a whole token: "item" is inside "item-a", not beside it.
    expect(tagRed(`${OPEN}#item`)).toEqual([`FAIL tag: ${OPEN}#item names an item label "item" the record does not contain (first on ${K1})`]);
  });
  it('finds a label that ends a sentence, and not one inside a longer label', () => {
    // The fixture record's text ends "item-a and item-b."
    expect(tagRed(`${OPEN}#item-b`)).toEqual([]);
    const name = '2026-01-08-labelled-record.md';
    const base = { [`.kiro/issues/${name}`]: record('`path:never/**`', 'Items: A5.1 and A6-x.\n') };
    expect(tagRed(`${name}#A5`, base)).toEqual([`FAIL tag: ${name}#A5 names an item label "A5" the record does not contain (first on ${K1})`]);
    expect(tagRed(`${name}#A6`, base)).toEqual([`FAIL tag: ${name}#A6 names an item label "A6" the record does not contain (first on ${K1})`]);
    expect(tagRed(`${name}#A5.1`, base)).toEqual([]);
  });
  it('accepts a release: Trigger', () => {
    expect(tagRed(OTHER)).toEqual([]);
  });
});

// ------------------------------------------------------------------------------------------
// C7: retags and the protected set (Req 3.7)
// ------------------------------------------------------------------------------------------

describe('retags and the protected set (Req 3.7)', () => {
  const onProtected = { [LIST('harness-ios-tokens')]: `${K1}\t2\t${PROTECTED}\n` };
  const retaggedTo = (fourth = ''): Files => ({ [LIST('harness-ios-tokens')]: `${K1}\t2\t${OPEN}${fourth}\n` });
  const FIELD = `\tretagged=2026-01-10,Lina,${PROTECTED}`;
  const APPEND = { [`.kiro/issues/${PROTECTED}`]: record('`path:never-too/**`', `- 2026-01-10: ${K1} moved to ${OPEN}\n`) };
  const NO_FIELD = `FAIL retag: ${K1} moved from protected ${PROTECTED} to ${OPEN} without retagged=<date>,<owner>,${PROTECTED} on the entry`;
  const NO_APPEND = `FAIL retag: ${K1} moved from protected ${PROTECTED} and this diff appends no line naming the key to ${PROTECTED}`;

  it('fails a retag away from a protected record with neither the retagged= field nor an appended line', () => {
    const r = run(buildRepo({ base: onProtected, head: retaggedTo() }), iosTokens());
    expect(red(r)).toEqual([NO_FIELD, NO_APPEND]);
  });
  it('fails with the field but no appended line', () => {
    expect(red(run(buildRepo({ base: onProtected, head: retaggedTo(FIELD) }), iosTokens()))).toEqual([NO_APPEND]);
  });
  it('fails with the appended line but no field', () => {
    expect(red(run(buildRepo({ base: onProtected, head: { ...retaggedTo(), ...APPEND } }), iosTokens()))).toEqual([NO_FIELD]);
  });
  it('passes with both, and prints the retag', () => {
    const r = run(buildRepo({ base: onProtected, head: { ...retaggedTo(FIELD), ...APPEND } }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`retagged: ${K1} ${PROTECTED} → ${OPEN}`);
    expect(r.counts.retags).toBe(1);
  });
  it('prints and counts a retag between unprotected records', () => {
    const r = run(buildRepo({ head: { [LIST('harness-ios-tokens')]: `${K1}\t2\t${OTHER}\n` } }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`retagged: ${K1} ${OPEN} → ${OTHER}`);
  });
  it('reads a split as a retag of the count that moved (base A:2 → head A:1, B:1)', () => {
    const r = run(buildRepo({ head: { [LIST('harness-ios-tokens')]: `${K1}\t1\t${OPEN}\n${K1}\t1\t${OTHER}\n` } }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`retagged: ${K1} ${OPEN} → ${OTHER}`);
    expect(r.counts.retags).toBe(1);
  });
  it('a move between two labels of one protected record is printed but is not away from it', () => {
    const base = { [LIST('harness-ios-tokens')]: `${K1}\t2\t${PROTECTED}#item-a\n` };
    const r = run(buildRepo({ base, head: { [LIST('harness-ios-tokens')]: `${K1}\t2\t${PROTECTED}#item-b\n` } }), iosTokens());
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain(`retagged: ${K1} ${PROTECTED}#item-a → ${PROTECTED}#item-b`);
  });
  it('fails when a record is removed from the protected set while still at the issues root', () => {
    expect(red(run(buildRepo({ head: { 'harness/protected-set.txt': '' } }), iosTokens()))).toEqual([
      `FAIL protected-set: ${PROTECTED} removed from harness/protected-set.txt while still at the issues root`,
    ]);
  });
  it('allows removing a name whose record has been archived', () => {
    const head = { 'harness/protected-set.txt': '', [`.kiro/issues/${PROTECTED}`]: null, [`.kiro/issues/archive/${PROTECTED}`]: record('`path:never-too/**`') };
    expect(red(run(buildRepo({ head }), iosTokens()))).toEqual([]);
  });
});

// ------------------------------------------------------------------------------------------
// C8: toolchain, exit status against the parsed set, the merge base
// ------------------------------------------------------------------------------------------

describe('the toolchain match (Req 3.11)', () => {
  it('fails on a toolchain version that differs from the pin', () => {
    expect(red(run(buildRepo(), iosTokens(undefined, { toolchain: { ...IOS_TOOLCHAIN, 'xcode.version': '26.5' } })))).toEqual([
      'FAIL toolchain: ios.toolchain.xcode.version observed "26.5", pinned "26.6"',
    ]);
  });
  it('fails on a pinned field the lane did not report, and on a reported field not pinned', () => {
    expect(red(run(buildRepo(), iosTokens(undefined, { toolchain: { 'xcode.version': '26.6', 'sdk.build': '23A1' } })))).toEqual([
      'FAIL toolchain: ios.toolchain.swift.version is pinned "6.2" and the lane reported no value',
      'FAIL toolchain: the lane reported sdk.build "23A1", which harness/pins.yaml does not pin',
    ]);
  });
  it('fails on an unquoted toolchain value', () => {
    const head = { 'harness/pins.yaml': PINS.replace('"6.2"', '6.2') };
    expect(red(run(buildRepo({ head }), iosTokens()))).toEqual(['FAIL format: harness/pins.yaml: "ios.toolchain.swift.version" is not a quoted string']);
  });
});

describe('exit status against the parsed set (design § 3 rule 1)', () => {
  it('fails as pre-compile when a compile exits non-zero with no parsed error, on an empty list', () => {
    const head = { [LIST('harness-ios-tokens')]: '' };
    expect(red(run(buildRepo({ head }), iosTokens({})))).toEqual(['FAIL pre-compile: ios.T exited non-zero with no parsed error']);
  });
  it('fails as parser when a compile exits zero with parsed errors', () => {
    const r = run(buildRepo(), iosTokens(undefined, { compiles: [result('ios.T', 'succeeded', { [K1]: 2 }), result('ios.P', 'succeeded')] }));
    expect(red(r)).toEqual(['FAIL parser: ios.T exited zero with 2 parsed error(s)']);
  });
  it('fails as parser on a diagnostic under no root', () => {
    const r = run(buildRepo(), iosTokens(undefined, { compiles: [result('ios.T', 'failed', { [K1]: 2 }, ['/elsewhere/X.swift:1:1: error: boom'])] }));
    expect(red(r)).toEqual(['FAIL parser: ios.T: a diagnostic under no root: /elsewhere/X.swift:1:1: error: boom']);
  });
  it('fails as pre-compile when the probe did not run although the token compile did not fail', () => {
    const head = { [LIST('harness-ios-tokens')]: '' };
    const r = run(buildRepo({ head }), iosTokens({}, { compiles: [result('ios.T', 'succeeded')] }));
    expect(red(r)).toEqual(['FAIL pre-compile: ios.P has no outcome in this run, and ios.T did not fail']);
  });
  it('fails as pre-compile when the token compile has no outcome', () => {
    const head = { [LIST('harness-ios-tokens')]: '' };
    expect(red(run(buildRepo({ head }), iosTokens({}, { compiles: [] })))).toEqual(['FAIL pre-compile: ios.T has no outcome in this run']);
  });
});

describe('the merge base (design § 3 rules 2 and 3)', () => {
  it('fails as base unreadable when the merge base is not in the clone', () => {
    const repo = buildRepo();
    const missing = '0123456789abcdef0123456789abcdef01234567';
    expect(red(run(repo, iosTokens(), 'harness-ios-tokens', missing))).toEqual([
      `FAIL base unreadable: the merge base ${missing} is not a commit in this clone`,
    ]);
  });
  it('fails as base unreadable when the list at the base is not well formed', () => {
    const base = { [LIST('harness-ios-tokens')]: `${K1}\t0\t${OPEN}\n` };
    const head = { [LIST('harness-ios-tokens')]: `${K1}\t2\t${OPEN}\n` };
    expect(red(run(buildRepo({ base, head }), iosTokens()))).toEqual([
      'FAIL base unreadable: harness/expected/harness-ios-tokens.tsv at the merge base is not well formed: line 1: the count "0" is not an integer of 1 or more',
    ]);
  });
  it('fails as history unreadable in a shallow clone', () => {
    // Three commits (the world, one more, the head); a depth-2 clone holds the base and the head.
    const repo = buildRepo({ history: [{ 'notes.txt': 'one more commit\n' }] });
    const shallow = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-compare-shallow-'));
    dirs.push(shallow);
    git(shallow, ['clone', '-q', '--depth', '2', `file://${repo.dir}`, '.']);
    const r = compareRepo({ repo: shallow, base: repo.base, context: 'harness-ios-tokens', results: { checks: [], ...iosTokens() } });
    expect(red(r)).toEqual([
      'FAIL history unreadable: the clone is shallow, so the Trigger history the tag rules read is incomplete; check out with full history (fetch-depth: 0)',
    ]);
  });
});

// ------------------------------------------------------------------------------------------
// C9: no merge base
// ------------------------------------------------------------------------------------------

describe('a run with no merge base (design § 3 rule 3)', () => {
  it('checks everything except additions, and says so on the summary line', () => {
    const r = run(buildRepo({ head: ADD_K2 }), iosTokens(OBSERVE_K2), 'harness-ios-tokens', null);
    expect(red(r)).toEqual([]);
    expect(r.summary).toContain('additions not checked: no merge base');
  });
  it('still fails a two-sided mismatch', () => {
    const r = run(buildRepo(), iosTokens({ [K1]: 3 }), 'harness-ios-tokens', null);
    expect(red(r)).toEqual([`FAIL count-above: ${K1} (observed 3, listed 2)`]);
    expect(r.summary).toContain('additions not checked: no merge base');
  });
});

// ------------------------------------------------------------------------------------------
// C10: cross-tier keys in a component context (design § 3 rule 5; Req 2.6)
// ------------------------------------------------------------------------------------------

describe('cross-tier keys (Req 2.6)', () => {
  const GEN = "gen:DesignTokens.ios.swift | invalid redeclaration of 'Theme'";
  const comp = (c: Record<string, number>, t5: CompileResult): ContextResults => ({
    compiles: [result('ios.C', 'failed', c), t5],
    files: { gen: { compiled: 3, floor: 3 }, pkg: { compiled: 40, floor: 40 } },
    toolchain: IOS_TOOLCHAIN,
  });
  const listed = (body: string): Scenario => ({ base: { [LIST('harness-ios-components')]: body } });

  it('keeps and counts a gen: key the component compile reports and the baseline does not', () => {
    const r = run(buildRepo(listed(`${GEN}\t1\t${OPEN}\n${KP}\t2\t${OPEN}\n`)), comp({ [GEN]: 1, [KP]: 2, [K1]: 2 }, result('ios.T5', 'failed', { [K1]: 2 })), 'harness-ios-components');
    expect(red(r)).toEqual([]);
    expect(r.counts.crossTier).toBe(1);
    expect(r.summary).toContain('cross-tier=1');
    // K1, which the baseline also reports, belongs to the token context and is dropped here.
    expect(r.observed.has(K1)).toBe(false);
  });
  it('drops the gen: key, per key, when the baseline reports it at any count', () => {
    const r = run(buildRepo(listed(`${KP}\t2\t${OPEN}\n`)), comp({ [GEN]: 3, [KP]: 2 }, result('ios.T5', 'failed', { [GEN]: 1 })), 'harness-ios-components');
    expect(red(r)).toEqual([]);
    expect(r.counts.crossTier).toBe(0);
  });
  it('fails when the baseline result is missing', () => {
    const r = run(buildRepo(listed(`${KP}\t2\t${OPEN}\n`)), comp({ [KP]: 2 }, result('ios.T5', 'not-run')), 'harness-ios-components');
    expect(red(r)).toEqual(['FAIL baseline missing: ios.T5 has no result in this run, so cross-tier keys cannot be decided']);
  });
  it('fails the Android component context when :tokens has no task outcome', () => {
    const AP = 'pkg:src/components/core/Avatar/platforms/android/Avatar.android.kt | Unresolved reference \'x\'';
    const r = run(
      buildRepo({ base: { [LIST('harness-android-components')]: `${AP}\t1\t${OPEN}\n` } }),
      {
        compiles: [result('android.tokens', 'not-run'), result('android.probe', 'not-run'), result('android.dp', 'failed', { [AP]: 1 })],
        unattributed: [],
        logComplete: true,
        files: { gen: { compiled: 3, floor: 3 }, pkg: { compiled: 43, floor: 43 } },
        toolchain: { 'java.version': '17.0.21' },
      },
      'harness-android-components',
    );
    expect(red(r)).toEqual(['FAIL baseline missing: android.tokens has no result in this run, so cross-tier keys cannot be decided']);
  });
});

// ------------------------------------------------------------------------------------------
// The Kotlin run-level fields, the list format, the key grammar
// ------------------------------------------------------------------------------------------

describe('the Kotlin run-level fields', () => {
  const AK = "gen:DesignTokens.android.kt | Unresolved reference 'Oklch'";
  const android = (extra: Partial<ContextResults>): ContextResults => ({
    compiles: [result('android.tokens', 'failed', { [AK]: 99 }), result('android.probe', 'not-run'), result('android.dp', 'failed', { [AK]: 99 })],
    unattributed: [],
    logComplete: true,
    files: { gen: { compiled: 3, floor: 3 } },
    toolchain: { 'java.version': '17.0.21' },
    ...extra,
  });
  const repo = (): Repo => buildRepo({ base: { [LIST('harness-android-tokens')]: `${AK}\t99\t${OPEN}\n` } });
  it('passes with :probe blocked behind a failing :tokens', () => {
    const r = run(repo(), android({}), 'harness-android-tokens');
    expect(red(r)).toEqual([]);
    expect(r.notes).toContain('probe: blocked (android.tokens failed); its count is not compared');
  });
  it('fails as parser on an unattributed diagnostic', () => {
    expect(red(run(repo(), android({ unattributed: ['e: file:///x/DesignTokens.android.kt:1:1 boom'] }), 'harness-android-tokens'))).toEqual([
      'FAIL parser: a diagnostic not attributed to exactly one compile task: e: file:///x/DesignTokens.android.kt:1:1 boom',
    ]);
  });
  it('fails as pre-compile on a log with no closing BUILD line', () => {
    expect(red(run(repo(), android({ logComplete: false }), 'harness-android-tokens'))).toEqual([
      'FAIL pre-compile: the Gradle log has no closing BUILD SUCCESSFUL or BUILD FAILED line',
    ]);
  });
});

describe('the list format (harness/README.md)', () => {
  it('reads a well-formed list', () => {
    const l = parseList(`# c\n${K1}\t2\t${OPEN}\n${K1}\t1\t${OTHER}\n${K2}\t1\t${OPEN}#item-a\tretagged=2026-02-28,Ada,${PROTECTED}\n`);
    expect(l.errors).toEqual([]);
    expect(l.entries.map((e) => [e.key, e.count, e.tag.text, e.retagged?.owner ?? null])).toEqual([
      [K1, 2, OPEN, null],
      [K1, 1, OTHER, null],
      [K2, 1, `${OPEN}#item-a`, 'Ada'],
    ]);
  });
  it.each([
    ['out of order', `${K2}\t1\t${OPEN}\n${K1}\t1\t${OPEN}\n`, 'line 2: out of order (entries sort by key, then tag, by code point)'],
    ['tags out of order', `${K1}\t1\t${OTHER}\n${K1}\t1\t${OPEN}\n`, 'line 2: out of order (entries sort by key, then tag, by code point)'],
    ['a duplicate key and tag', `${K1}\t1\t${OPEN}\n${K1}\t1\t${OPEN}\n`, 'line 2: the same key and tag as line 1'],
    ['a comment below an entry', `${K1}\t1\t${OPEN}\n# late\n`, 'line 2: a comment below the first entry'],
    ['a blank line', `# c\n\n${K1}\t1\t${OPEN}\n`, 'line 2: a blank line'],
    ['no final newline', `${K1}\t1\t${OPEN}`, 'no newline after the last line'],
    ['a zero count', `${K1}\t0\t${OPEN}\n`, 'line 1: the count "0" is not an integer of 1 or more'],
    ['a leading-zero count', `${K1}\t02\t${OPEN}\n`, 'line 1: the count "02" is not an integer of 1 or more'],
    ['a tag with a folder', `${K1}\t1\tarchive/${OPEN}\n`, `line 1: the tag "archive/${OPEN}" is not <record>.md or <record>.md#<item label>`],
    ['an impossible retag date', `${K1}\t1\t${OPEN}\tretagged=2026-02-30,Ada,${PROTECTED}\n`, `line 1: the fourth field "retagged=2026-02-30,Ada,${PROTECTED}" is not retagged=<YYYY-MM-DD>,<owner>,<from-record>`],
    ['two fields', `${K1}\t1\n`, 'line 1: 2 tab-separated fields; an entry has 3 or 4'],
  ])('rejects %s', (_name, text, error) => {
    expect(parseList(text).errors).toContain(error);
  });
  it('fails the context on a malformed list at the head', () => {
    const head = { [LIST('harness-ios-tokens')]: `${K1}\t2\t${OPEN}` };
    expect(red(run(buildRepo({ head }), iosTokens()))).toEqual(['FAIL format: harness/expected/harness-ios-tokens.tsv: no newline after the last line']);
  });
  it('accepts an empty list (D1\'s acceptance state)', () => {
    expect(parseList('')).toEqual({ entries: [], errors: [] });
  });
});

describe('the key grammar (parseKey, formatKey)', () => {
  it.each([
    [K1, true],
    [`${KP}`, true],
    ['probe:Probe.swift | a | b', true],
    ['pkg:a b/c.kt | None of the following candidates is applicable: ⏎ fun a(): Unit', true],
    ['other:x.swift | m', false],
    ['gen:/abs.swift | m', false],
    ['gen:a/../b.swift | m', false],
    ['gen:./b.swift | m', false],
    ['gen:a//b.swift | m', false],
    ['gen:a.swift |  m', false],
    ['gen:a.swift | m ', false],
    ['gen:a.swift | ', false],
    ['gen:a.swift', false],
    ['gen:a.swift | m\tx', false],
  ])('%s → %s', (key, ok) => {
    expect(parseKey(key) !== null).toBe(ok);
  });
  it('splits at the first " | " after the root, so a message may hold one', () => {
    expect(parseKey('probe:Probe.swift | a | b')).toEqual({ root: 'probe', path: 'Probe.swift', message: 'a | b' });
  });
  it('formatKey refuses a path holding " | "', () => {
    expect(() => formatKey('gen', 'a | b.swift', 'm')).toThrow('formatKey: not a well-formed key');
  });
});

// ------------------------------------------------------------------------------------------
// The command line, with stub parsers
// ------------------------------------------------------------------------------------------

describe('the command line', () => {
  const ROOTS = { gen: '/c/dist/tokens', pkg: '/c/node_modules/@3fn/core', probe: '/c/probe' };
  const stubSwift = (input: SwiftParseInput): CompileResult =>
    result(input.compile, input.exitCode === 0 ? 'succeeded' : 'failed', input.log.includes('cannot find') ? { [K1]: 2 } : {});
  const stubKotlin = (_input: KotlinParseInput): KotlinParseResult => {
    throw new Error('not used');
  };

  const writeRun = (dir: string, run: object): string => {
    fs.writeFileSync(path.join(dir, 'T.log'), "…: error: cannot find 'X' in scope\n");
    const p = path.join(dir, 'run.json');
    fs.writeFileSync(p, JSON.stringify(run));
    return p;
  };
  const RUN = { roots: ROOTS, swift: [{ compile: 'ios.T', log: 'T.log', exitCode: 1 }, { compile: 'ios.P', blocked: true }], files: { gen: { compiled: 3, floor: 3 } }, toolchain: IOS_TOOLCHAIN, checks: [] };

  it('prints the failures, notes, summary and verdict, and exits 0 on PASS', () => {
    const repo = buildRepo();
    const work = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-compare-run-'));
    dirs.push(work);
    const lines: string[] = [];
    const observedFile = path.join(work, 'observed.tsv');
    const status = main(['--context', 'harness-ios-tokens', '--run', writeRun(work, RUN), '--base', repo.base, '--repo', repo.dir, '--emit-observed', observedFile], {
      parseSwift: stubSwift,
      parseKotlin: stubKotlin,
      out: (l) => lines.push(l),
    });
    expect(status).toBe(0);
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens PASS');
    expect(lines[lines.length - 2]).toMatch(/^harness-summary: harness-ios-tokens · expected=2 · observed=2 /);
    expect(fs.readFileSync(observedFile, 'utf8')).toBe(`${K1}\t2\n`);
  });
  it('exits 1 on FAIL', () => {
    const repo = buildRepo();
    const work = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-compare-run-'));
    dirs.push(work);
    const lines: string[] = [];
    const status = main(['--context', 'harness-ios-tokens', '--run', writeRun(work, { ...RUN, toolchain: { ...IOS_TOOLCHAIN, 'swift.version': '6.3' } }), '--no-base', '--repo', repo.dir], {
      parseSwift: stubSwift,
      out: (l) => lines.push(l),
    });
    expect(status).toBe(1);
    expect(lines).toContain('FAIL toolchain: ios.toolchain.swift.version observed "6.3", pinned "6.2"');
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens FAIL (toolchain)');
  });
  it('fails on a missing --base/--no-base choice', () => {
    const lines: string[] = [];
    expect(main(['--context', 'harness-ios-tokens', '--run', 'x.json'], { out: (l) => lines.push(l) })).toBe(1);
    expect(lines[0]).toMatch(/^FAIL input: give --run, and exactly one of --base and --no-base/);
  });
});

// ------------------------------------------------------------------------------------------
// The run file's `checks` and the `check` class (design § 3, "The probe's count lines and the
// run file's `checks`"; tasks.md Task 5.4)
// ------------------------------------------------------------------------------------------

describe('the run file\'s checks (class check)', () => {
  const withChecks = (checks: ContextResults['checks'], extra: Partial<ContextResults> = {}): ContextResults => ({ ...iosTokens(undefined, extra), checks });

  it('fails the context for an ok:false check, naming it in the failure and the verdict line', () => {
    const r = run(buildRepo(), withChecks([{ name: 'probe: read', ok: false, detail: '3 of 4 index names' }]));
    expect(red(r)).toEqual(['FAIL check: probe: read: 3 of 4 index names']);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens FAIL (check: probe: read)');
    expect(r.pass).toBe(false);
  });
  it('fails once per ok:false check and lists each name once in the verdict line', () => {
    const r = run(
      buildRepo(),
      withChecks([
        { name: 'probe: read', ok: false, detail: '3 of 4' },
        { name: 'probe: product read', ok: true, detail: '2 of 2' },
        { name: 'theme instances', ok: false, detail: 'extra member darkDark' },
      ]),
    );
    expect(red(r)).toEqual(['FAIL check: probe: read: 3 of 4', 'FAIL check: theme instances: extra member darkDark']);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens FAIL (check: probe: read; theme instances)');
  });
  it('keeps the check class beside another class in the verdict line', () => {
    const r = run(buildRepo(), withChecks([{ name: 'theme instances', ok: false, detail: 'x' }], { toolchain: { ...IOS_TOOLCHAIN, 'swift.version': '6.3' } }));
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens FAIL (check: theme instances, toolchain)');
  });
  it('fails a run file with no checks array', () => {
    const r = run(buildRepo(), withChecks(undefined));
    expect(red(r)).toEqual(['FAIL check: the run file has no checks array']);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens FAIL (check: no checks array)');
  });
  it('passes when every check is ok:true, a blocked check and a not checked one included', () => {
    const r = run(
      buildRepo(),
      withChecks([
        { name: 'probe: read', ok: true, detail: '2 of 2' },
        { name: 'probe: product read', ok: true, detail: 'blocked' },
        { name: 'theme instances', ok: true, detail: 'not checked' },
      ]),
    );
    expect(red(r)).toEqual([]);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens PASS');
  });
  it('passes an empty checks array (an Android token context while :tokens fails)', () => {
    const r = run(buildRepo(), withChecks([]));
    expect(red(r)).toEqual([]);
    expect(r.verdict).toBe('harness-verdict: harness-ios-tokens PASS');
  });
});

describe('the command line and the run file\'s checks', () => {
  const ROOTS = { gen: '/c/dist/tokens', pkg: '/c/node_modules/@3fn/core', probe: '/c/probe' };
  const stubSwift = (input: SwiftParseInput): CompileResult =>
    result(input.compile, input.exitCode === 0 ? 'succeeded' : 'failed', input.log.includes('cannot find') ? { [K1]: 2 } : {});
  const base = { roots: ROOTS, swift: [{ compile: 'ios.T', log: 'T.log', exitCode: 1 }, { compile: 'ios.P', blocked: true }], files: { gen: { compiled: 3, floor: 3 } }, toolchain: IOS_TOOLCHAIN };
  const exec = (runObj: object): { status: number; lines: string[] } => {
    const repo = buildRepo();
    const work = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-compare-checks-'));
    dirs.push(work);
    fs.writeFileSync(path.join(work, 'T.log'), "…: error: cannot find 'X' in scope\n");
    const p = path.join(work, 'run.json');
    fs.writeFileSync(p, JSON.stringify(runObj));
    const lines: string[] = [];
    const status = main(['--context', 'harness-ios-tokens', '--run', p, '--base', repo.base, '--repo', repo.dir], { parseSwift: stubSwift, out: (l) => lines.push(l) });
    return { status, lines };
  };

  it('fails a run file with no checks array', () => {
    const { status, lines } = exec(base);
    expect(status).toBe(1);
    expect(lines).toContain('FAIL check: the run file has no checks array');
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens FAIL (check: no checks array)');
  });
  it('fails a run file whose checks is not an array', () => {
    const { status, lines } = exec({ ...base, checks: { name: 'x' } });
    expect(status).toBe(1);
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens FAIL (check: no checks array)');
  });
  it('fails an ok:false check read from the run file', () => {
    const { status, lines } = exec({ ...base, checks: [{ name: 'probe: read', ok: false, detail: '1 of 2' }] });
    expect(status).toBe(1);
    expect(lines).toContain('FAIL check: probe: read: 1 of 2');
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens FAIL (check: probe: read)');
  });
  it('passes an empty checks array', () => {
    const { status, lines } = exec({ ...base, checks: [] });
    expect(status).toBe(0);
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens PASS');
  });
  it('treats a malformed check entry as an input error', () => {
    const { status, lines } = exec({ ...base, checks: [{ name: 'x', ok: 'yes', detail: '' }] });
    expect(status).toBe(1);
    expect(lines).toContain('FAIL input: checks[0] needs a non-empty string name, a boolean ok and a string detail');
    expect(lines[lines.length - 1]).toBe('harness-verdict: harness-ios-tokens FAIL (input)');
  });
});
