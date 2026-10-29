/**
 * Tests for `release-publish.ts` (ballot 2026-10-03-hermetic-publish-path § 3.2; the dist-contamination issue,
 * 2026-10-03). The run is driven through injected dependencies: every git/npm call is recorded, never executed,
 * so these tests assert the ORDER of the steps, that a dry run never publishes, that a publish publishes the one
 * tarball it checked, and that each refusal stops before anything is published.
 *
 * The real end-to-end run (`--dry-run <S>` against this repo) is recorded in the issue file, not here: it clones,
 * installs and builds (minutes, network), which a unit lane should not do.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  AbsenceVerdict,
  BuildArgs,
  CENSUS_DECISIONS,
  CENSUS_HEADING,
  censusCorpus,
  Deps,
  extractPastedRecord,
  npmjsAbsenceVerdict,
  npmjsCurlArgs,
  NPMJS_PACKUMENT_URL,
  GH_REGISTRY,
  ghPublishArgs,
  parseArgs,
  parseLsRemote,
  PUBLIC_REGISTRY,
  publicPublishArgs,
  PublishFailed,
  publishPathPasses,
  recordModeVerdict,
  Refusal,
  renderCommand,
  runCensus,
  runNpmjs,
  runRelease,
  RunResult,
  sameFloorClosure,
  sha1OfFile,
  shellQuote,
  tagToCommitVerdict,
  tagVerdict,
} from '../release-publish';
import { Finding, PUBLISH_PATH_FLOOR } from '../pack-assert';

// ─── parseArgs ───────────────────────────────────────────────────────────────────────────────────

describe('parseArgs', () => {
  it('parses a dry run at a SHA', () => {
    expect(parseArgs(['--dry-run', '1d75c5e5'])).toEqual({ mode: 'dry-run', sha: '1d75c5e5', source: undefined, keep: false });
  });

  it('parses a publish at a version, with or without a leading v, and its options', () => {
    const full = '9e1a3106a18c4a1554a3705e3559ae5797028a24';
    expect(parseArgs(['15.0.1', '--expect-sha', full])).toEqual({ mode: 'publish', version: '15.0.1', expectSha: full, source: undefined, keep: false });
    expect(parseArgs(['v15.1.0-rc.1', '--expect-sha', full, '--source', '/tmp/repo', '--keep'])).toEqual({
      mode: 'publish',
      version: '15.1.0-rc.1',
      expectSha: full,
      source: '/tmp/repo',
      keep: true,
    });
  });

  // Row 4 (publish-path instrument rows, 2026-10-14): tag-to-S identity is a script check. Before, `<version>` alone
  // published on ancestry plus a version match, and a 7-character prefix passed a `startsWith` compare.
  it('refuses a publish without --expect-sha (the dry run keeps naming its commit with --dry-run alone)', () => {
    expect(() => parseArgs(['15.0.1'])).toThrow(Refusal);
    expect(() => parseArgs(['15.0.1'])).toThrow(/a publish needs --expect-sha <S>, the full 40-character SHA/);
    expect(() => parseArgs(['15.0.1', '--keep'])).toThrow(/needs --expect-sha/);
    expect(parseArgs(['--dry-run', '1d75c5e5']).mode).toBe('dry-run');
  });

  it('refuses an abbreviated --expect-sha, even a valid prefix of S (the old startsWith compare accepted it)', () => {
    for (const short of ['9e1a310', '9e1a3106', '9e1a3106a18c4a1554a3705e3559ae5797028a2']) {
      expect(() => parseArgs(['15.0.1', '--expect-sha', short])).toThrow(/full 40-character commit SHA \(no prefix\)/);
    }
    expect(() => parseArgs(['15.0.1', '--expect-sha', '9E1A3106A18C4A1554A3705E3559AE5797028A24'])).toThrow(/full 40-character/);
  });

  it('parses the 5.4 mode: --npmjs and the record path, nothing else', () => {
    expect(parseArgs(['--npmjs', '/var/folders/x/T/dp-release-a/out/release-publish-record.json'])).toEqual({
      mode: 'npmjs',
      recordPath: '/var/folders/x/T/dp-release-a/out/release-publish-record.json',
    });
  });

  it('parses the census mode, with an optional --source for the tags', () => {
    expect(parseArgs(['--census'])).toEqual({ mode: 'census', source: undefined });
    expect(parseArgs(['--census', '--source', '/repo'])).toEqual({ mode: 'census', source: '/repo' });
  });

  it.each([
    [[], /usage/],
    [['--dry-run'], /needs a value/],
    [['--dry-run', 'main'], /commit SHA/],
    [['--dry-run', '1d75c5e5', '15.0.1'], /not both/],
    [['--dry-run', '1d75c5e5', '--expect-sha', '1d75c5e5'], /applies to a publish/],
    [['fifteen'], /not a version/],
    [['15.0.1', '--expect-sha', 'xyz'], /commit SHA/],
    [['15.0.1', '--expect-sha'], /needs a value/],
    [['15.0.1', '16.0.0'], /unexpected argument/],
    [['15.0.1', '--ignore-scripts'], /unknown option/],
    [['--census', '15.0.1'], /--census takes only --source/],
    [['--census', '--dry-run', '1d75c5e5'], /--census takes only --source/],
    [['--census', '--keep'], /--census takes only --source/],
    [['--npmjs'], /needs a value/],
    [['--npmjs', '/r.json', '15.0.1'], /--npmjs takes only the record path/],
    [['--npmjs', '/r.json', '--expect-sha', '9e1a3106a18c4a1554a3705e3559ae5797028a24'], /--npmjs takes only the record path/],
    [['--npmjs', '/r.json', '--source', '/mirror'], /--npmjs takes only the record path/],
    [['--npmjs', '/r.json', '--census'], /--npmjs takes only the record path/],
  ])('refuses %j', (argv, message) => {
    expect(() => parseArgs(argv as string[])).toThrow(Refusal);
    expect(() => parseArgs(argv as string[])).toThrow(message as RegExp);
  });
});

// ─── pure helpers ────────────────────────────────────────────────────────────────────────────────

describe('parseLsRemote', () => {
  it('takes the peeled commit of an annotated tag (the 15.0.0 shape)', () => {
    const out = 'b05719f6717b4e8e2dce23dfd260223f2812a782\trefs/tags/v15.0.0\n9e1a3106a18c4a1554a3705e3559ae5797028a24\trefs/tags/v15.0.0^{}\n';
    expect(parseLsRemote(out, 'v15.0.0')).toBe('9e1a3106a18c4a1554a3705e3559ae5797028a24');
  });

  it('takes the direct commit of a lightweight tag', () => {
    expect(parseLsRemote('abc1234\trefs/tags/v1.0.0\n', 'v1.0.0')).toBe('abc1234');
  });

  it('returns undefined when the tag is absent, and never matches a longer tag name', () => {
    expect(parseLsRemote('', 'v1.0.0')).toBeUndefined();
    expect(parseLsRemote('abc1234\trefs/tags/v1.0.0-rc.1\n', 'v1.0.0')).toBeUndefined();
  });
});

describe('tagVerdict — the tag-to-commit decision (5.3 with --expect-sha)', () => {
  const ls = 'b05719f6717b4e8e2dce23dfd260223f2812a782\trefs/tags/v15.0.0\n9e1a3106a18c4a1554a3705e3559ae5797028a24\trefs/tags/v15.0.0^{}\n';
  it('passes when the tag names exactly the expected commit', () => {
    expect(tagVerdict(ls, 'v15.0.0', '9e1a3106a18c4a1554a3705e3559ae5797028a24')).toEqual({ ok: true });
  });
  it('refuses another commit, a prefix, the tag object, and an absent tag', () => {
    expect(tagVerdict(ls, 'v15.0.0', 'f'.repeat(40))).toEqual({ ok: false, found: '9e1a3106a18c4a1554a3705e3559ae5797028a24' });
    expect(tagVerdict(ls, 'v15.0.0', '9e1a3106').ok).toBe(false);
    expect(tagVerdict(ls, 'v15.0.0', 'b05719f6717b4e8e2dce23dfd260223f2812a782').ok).toBe(false);
    expect(tagVerdict('', 'v15.0.0', '9e1a3106a18c4a1554a3705e3559ae5797028a24')).toEqual({ ok: false, found: undefined });
  });
});

describe('command rendering', () => {
  it('renders the GitHub Packages publish of the tarball', () => {
    expect(ghPublishArgs('/t/3fn-core-15.0.1.tgz')).toEqual(['publish', '/t/3fn-core-15.0.1.tgz', `--registry=${GH_REGISTRY}`, `--@3fn:registry=${GH_REGISTRY}`]);
  });

  it('renders the EXACT public-npm command on the same tarball', () => {
    expect(renderCommand('npm', publicPublishArgs('/var/folders/x/T/dp-release-a/out/3fn-core-15.0.1.tgz'))).toBe(
      `npm publish /var/folders/x/T/dp-release-a/out/3fn-core-15.0.1.tgz --registry=${PUBLIC_REGISTRY} --@3fn:registry=${PUBLIC_REGISTRY} --access public`
    );
  });

  it('quotes a path that needs it', () => {
    expect(shellQuote('/a b/c.tgz')).toBe("'/a b/c.tgz'");
    expect(shellQuote("/it's.tgz")).toBe(`'/it'\\''s.tgz'`);
    expect(shellQuote('/plain/path.tgz')).toBe('/plain/path.tgz');
  });
});

describe('sha1OfFile', () => {
  it('records the sha1 of the tarball bytes (the value step 6b compares both registries against)', () => {
    const f = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'release-publish-sha-')), 'x.tgz');
    fs.writeFileSync(f, 'abc');
    expect(sha1OfFile(f)).toBe('a9993e364706816aba3e25717850c26c9cd0d89d');
    fs.rmSync(path.dirname(f), { recursive: true, force: true });
  });
});

describe('sameFloorClosure — the regenerated closure is compared parsed, generatedAt aside', () => {
  const closure = (generatedAt: string, files: string[]): string =>
    `${JSON.stringify({ generatedAt, note: 'n', closure2: { files, totalFiles: files.length } }, null, 2)}\n`;

  it('treats a regeneration that differs only in its wall-clock stamp as current (a byte compare would refuse every publish)', () => {
    expect(sameFloorClosure(closure('2026-09-26T23:23:20.952Z', ['src/a.ts']), closure('2026-10-15T09:00:00.000Z', ['src/a.ts']))).toBe(true);
  });

  it('ignores key order and formatting', () => {
    expect(sameFloorClosure('{"b":1,"a":{"y":2,"x":[1,2]}}', '{ "a": { "x": [1, 2], "y": 2 }, "b": 1, "generatedAt": "z" }')).toBe(true);
  });

  it('BITES on a stale closure: a file joined or left it', () => {
    expect(sameFloorClosure(closure('t1', ['src/a.ts']), closure('t1', ['src/a.ts', 'src/b.ts']))).toBe(false);
    expect(sameFloorClosure(closure('t1', ['src/a.ts', 'src/b.ts']), closure('t2', ['src/b.ts', 'src/a.ts']))).toBe(false);
  });
});

describe('publishPathPasses — counts passing section-10 findings by label', () => {
  it('counts only passing `publish path:` findings', () => {
    expect(
      publishPathPasses([
        { ok: true, label: 'publish path: a' },
        { ok: false, label: 'publish path: b' },
        { ok: true, label: 'closure-2 ADD present: x' },
        { ok: true, label: 'publish path: c' },
      ])
    ).toBe(2);
  });
});

// ─── runRelease, with every side effect faked ────────────────────────────────────────────────────

const PROJECT = '/repo';
const WORK = '/tmp/dp-release-x';
const CLONE = `${WORK}/clone`;
const OUT = `${WORK}/out`;
const S = '9e1a3106a18c4a1554a3705e3559ae5797028a24';
const TAG_OBJ = 'b05719f6717b4e8e2dce23dfd260223f2812a782';
const TARBALL = `${OUT}/3fn-core-15.0.1.tgz`;
const ORIGIN = 'https://github.com/3fn/DesignerPunk.git';

interface Call {
  cmd: string;
  args: string[];
  cwd: string;
}

interface Fake {
  deps: Deps;
  calls: Call[];
  logs: string[];
  written: Record<string, string>;
  removed: string[];
}

interface FakeOptions {
  pkgVersion?: string;
  tagCommit?: string | null;
  cloneHead?: string;
  onMain?: boolean;
  dirtyAfter?: 'checkout' | 'ci';
  fail?: string; // a substring of "cmd args" whose call exits 1
  findings?: Finding[];
  tarballs?: string[];
  staleClosure?: boolean; // the regenerated floor-closure.json differs from the committed one
}

/** A full, green pack-assert run: section 10 at exactly its floor, plus an earlier section's finding. */
const GREEN_FINDINGS: Finding[] = [
  { ok: true, label: 'closure-2 ADD present: src/build/tokens/ComponentToken.ts' },
  ...Array.from({ length: PUBLISH_PATH_FLOOR }, (_, i) => ({ ok: true, label: `publish path: check ${i + 1}` })),
];
const CLOSURE_COMMITTED = `${JSON.stringify({ generatedAt: '2026-09-26T23:23:20.952Z', closure2: { files: ['src/a.ts'] } }, null, 2)}\n`;
const CLOSURE_REGENERATED = `${JSON.stringify({ generatedAt: '2026-10-15T09:00:00.000Z', closure2: { files: ['src/a.ts'] } }, null, 2)}\n`;
const CLOSURE_STALE = `${JSON.stringify({ generatedAt: '2026-10-15T09:00:00.000Z', closure2: { files: ['src/a.ts', 'src/b.ts'] } }, null, 2)}\n`;

function fake(o: FakeOptions = {}): Fake {
  const calls: Call[] = [];
  const logs: string[] = [];
  const written: Record<string, string> = {};
  const removed: string[] = [];
  let statusCalls = 0;
  let closureRegenerated = false;
  const ok = (stdout = ''): RunResult => ({ status: 0, stdout });
  const deps: Deps = {
    run(cmd, args, cwd) {
      calls.push({ cmd, args, cwd });
      const line = `${cmd} ${args.join(' ')}`;
      if (o.fail && line.includes(o.fail)) return { status: 1, stdout: '' };
      if (cmd === 'npx' && args.includes('scripts/floor-closure.ts')) closureRegenerated = true;
      if (cmd === 'git') {
        if (args[0] === 'remote') return ok(`${ORIGIN}\n`);
        if (args[0] === 'ls-remote') {
          if (o.tagCommit === null) return ok('');
          return ok(`${TAG_OBJ}\trefs/tags/v15.0.1\n${o.tagCommit ?? S}\trefs/tags/v15.0.1^{}\n`);
        }
        if (args[0] === 'merge-base') return { status: o.onMain === false ? 1 : 0, stdout: '' };
        if (args[0] === 'rev-parse' && args[1] === '--verify') return ok(`${S}\n`);
        if (args[0] === 'rev-parse') return ok(`${o.cloneHead ?? o.tagCommit ?? S}\n`);
        if (args[0] === 'status') {
          statusCalls++;
          const dirty = (o.dirtyAfter === 'checkout' && statusCalls === 1) || (o.dirtyAfter === 'ci' && statusCalls === 2);
          return ok(dirty ? ' M src/tokens/x.ts\n' : '');
        }
        return ok();
      }
      return ok();
    },
    mkdtemp: () => WORK,
    mkdir: () => undefined,
    readFile: (f) => {
      if (f === `${CLONE}/package.json`) return JSON.stringify({ name: '@3fn/core', version: o.pkgVersion ?? '15.0.1' });
      if (f === `${CLONE}/floor-closure.json`) {
        if (!closureRegenerated) return CLOSURE_COMMITTED;
        return o.staleClosure ? CLOSURE_STALE : CLOSURE_REGENERATED;
      }
      throw new Error(`unexpected read: ${f}`);
    },
    writeFile: (f, t) => {
      written[f] = t;
    },
    listDir: () => o.tarballs ?? ['3fn-core-15.0.1.tgz'],
    fileSize: () => 6372471,
    sha1: () => '65d2ec0b140192bc0f0adc17b9ac6526332a6594',
    rm: (d) => {
      removed.push(d);
    },
    assertTarball: () => ({ findings: o.findings ?? GREEN_FINDINGS, fileCount: 1638 }),
    log: (l) => {
      logs.push(l);
    },
    now: () => '2026-10-03T12:00:00.000Z',
  };
  return { deps, calls, logs, written, removed };
}

const line = (c: Call): string => `${c.cmd} ${c.args.join(' ')}`;
const publishCalls = (f: Fake): Call[] => f.calls.filter((c) => c.cmd === 'npm' && c.args[0] === 'publish');
const DRY: BuildArgs = { mode: 'dry-run', sha: '9e1a3106', keep: false };
const PUB: BuildArgs = { mode: 'publish', version: '15.0.1', expectSha: S, keep: false };

// Silence pack-assert's report printing (reportFindings writes to the console).
let logSpy: jest.SpyInstance;
let errSpy: jest.SpyInstance;
beforeEach(() => {
  logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  errSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
  logSpy.mockRestore();
  errSpy.mockRestore();
});

describe('runRelease — dry run (RELEASE-FLOW 5.1)', () => {
  it('clones at S, installs, checks, packs WITH scripts, verifies the index, asserts — and publishes nothing', () => {
    const f = fake();
    const r = runRelease(DRY, f.deps, PROJECT);
    const seq = f.calls.map(line);
    const idx = (s: string): number => seq.findIndex((l) => l.includes(s));

    expect(seq).toContain(`git fetch -q --depth 1 ${ORIGIN} ${S}`);
    expect(idx('npm ci')).toBeGreaterThan(idx('git checkout -q --detach FETCH_HEAD'));
    expect(idx('npm run check:drift')).toBeGreaterThan(idx('npm ci'));
    // The closure is regenerated in the clone after install and before the pack, then restored to the commit's bytes.
    expect(idx('npx tsx scripts/floor-closure.ts')).toBeGreaterThan(idx('npm ci'));
    expect(idx('git checkout -q -- floor-closure.json')).toBeGreaterThan(idx('npx tsx scripts/floor-closure.ts'));
    expect(idx(`npm pack --pack-destination ${OUT}`)).toBeGreaterThan(idx('git checkout -q -- floor-closure.json'));
    expect(f.calls.find((c) => c.cmd === 'npx')?.cwd).toBe(CLONE);
    expect(idx(`npm pack --pack-destination ${OUT}`)).toBeGreaterThan(idx('npm run check:drift'));
    // The token index is regenerated by the build inside pack's prepack, so it is verified AFTER the pack.
    expect(idx('npm run verify:token-index-clean')).toBeGreaterThan(idx('npm pack'));
    // No --ignore-scripts anywhere: the pack must run prepack.
    expect(seq.some((l) => l.includes('--ignore-scripts'))).toBe(false);
    // npm runs inside the clone, never in the operator's checkout.
    for (const c of f.calls.filter((c) => c.cmd === 'npm')) expect(c.cwd).toBe(CLONE);
    expect(seq.some((l) => l.startsWith('npm whoami'))).toBe(false); // a dry run needs no publish auth (either registry)

    expect(publishCalls(f)).toEqual([]);
    expect(r.record).toMatchObject({ mode: 'dry-run', version: '15.0.1', commit: S, tarball: TARBALL, sha1: '65d2ec0b140192bc0f0adc17b9ac6526332a6594', fileCount: 1638, publishedTo: [] });
    expect(JSON.parse(f.written[`${OUT}/release-publish-record.json`])).toEqual(r.record);
    expect(f.logs.join('\n')).toMatch(/DRY RUN — nothing was published/);
    // E7a (batch ballot 2026-10-26-release-flow-batch-16-1): a dry run hands over no runnable publish line.
    expect(f.logs.some((l) => l.trim().startsWith('npm publish'))).toBe(false);
    // E7b: a dry run returns no 5.4 command either (its record would be refused by --npmjs anyway).
    expect(r.npmjsCommand).toBeUndefined();
    // The clone is removed; the tarball and record are kept.
    expect(f.removed).toEqual([CLONE]);
  });

  it('keeps the clone with --keep', () => {
    const f = fake();
    runRelease({ ...DRY, keep: true }, f.deps, PROJECT);
    expect(f.removed).toEqual([]);
  });

  it('warns, but does not refuse, when S is not on origin/main', () => {
    const f = fake({ onMain: false });
    runRelease(DRY, f.deps, PROJECT);
    expect(f.logs.join('\n')).toMatch(/WARNING: .* is not on this checkout's origin\/main/);
  });

  it('refuses a SHA this checkout cannot resolve', () => {
    const f = fake({ fail: 'rev-parse --verify' });
    expect(() => runRelease(DRY, f.deps, PROJECT)).toThrow(/not a commit in this checkout/);
  });
});

describe('runRelease — publish (RELEASE-FLOW 5.3)', () => {
  it('publishes THE checked tarball to GitHub Packages from the operator checkout, records it, and prints the public command', () => {
    const f = fake();
    const r = runRelease(PUB, f.deps, PROJECT);
    const seq = f.calls.map(line);

    expect(seq).toContain(`git ls-remote ${ORIGIN} refs/tags/v15.0.1 refs/tags/v15.0.1^{}`);
    expect(seq).toContain(`git merge-base --is-ancestor ${S} origin/main`);
    // The auth preflight runs in the operator checkout, before the clone is even fetched.
    expect(seq.indexOf(`npm whoami --registry=${GH_REGISTRY}`)).toBeLessThan(seq.findIndex((l) => l.startsWith('git fetch')));
    // RS-31: so does the public-npm check, with the registry named twice (RELEASE-FLOW A1), from the same cwd.
    const npmjsWhoami = `npm whoami --registry=${PUBLIC_REGISTRY} --@3fn:registry=${PUBLIC_REGISTRY}`;
    expect(seq.indexOf(npmjsWhoami)).toBeGreaterThanOrEqual(0);
    expect(seq.indexOf(npmjsWhoami)).toBeLessThan(seq.findIndex((l) => l.startsWith('git fetch')));
    expect(f.calls.find((c) => line(c) === npmjsWhoami)?.cwd).toBe(PROJECT);
    expect(seq).toContain(`git fetch -q --depth 1 ${ORIGIN} refs/tags/v15.0.1`);

    const pubs = publishCalls(f);
    expect(pubs).toHaveLength(1);
    expect(pubs[0].args).toEqual(['publish', TARBALL, `--registry=${GH_REGISTRY}`, `--@3fn:registry=${GH_REGISTRY}`]);
    expect(pubs[0].cwd).toBe(PROJECT); // npm config (auth) comes from the operator checkout; never read by the script
    // The publish comes after every check.
    expect(seq.indexOf(line(pubs[0]))).toBeGreaterThan(seq.findIndex((l) => l.includes('verify:token-index-clean')));

    expect(r.record.publishedTo).toEqual([GH_REGISTRY]);
    // E7b (F-49 (ii-b)): 5.3 prints the one 5.4 command, the --npmjs mode on its record, and no raw publish line.
    const npmjsLine = `npx tsx scripts/release-publish.ts --npmjs ${OUT}/release-publish-record.json`;
    expect(r.npmjsCommand).toBe(npmjsLine);
    expect(f.logs).toContain(`  ${npmjsLine}`);
    expect(f.logs.some((l) => l.trim().startsWith('npm publish'))).toBe(false);
    expect(f.logs.some((l) => l.trim().startsWith('shasum'))).toBe(false);
  });

  it('accepts an --expect-sha equal to the tagged commit', () => {
    const f = fake();
    expect(() => runRelease({ ...PUB, expectSha: S }, f.deps, PROJECT)).not.toThrow();
  });

  it('refuses a prefix of the tagged commit even if one reaches runRelease (identity, never startsWith)', () => {
    const f = fake();
    expect(() => runRelease({ ...PUB, expectSha: S.slice(0, 8) }, f.deps, PROJECT)).toThrow(/not the expected 9e1a3106/);
    expect(publishCalls(f)).toEqual([]);
  });

  it('honours --source for both the tag lookup and the clone', () => {
    const f = fake();
    runRelease({ ...PUB, source: '/local/mirror' }, f.deps, PROJECT);
    const seq = f.calls.map(line);
    expect(seq.some((l) => l.startsWith('git remote'))).toBe(false);
    expect(seq).toContain('git ls-remote /local/mirror refs/tags/v15.0.1 refs/tags/v15.0.1^{}');
    expect(seq).toContain('git fetch -q --depth 1 /local/mirror refs/tags/v15.0.1');
  });
});

describe('runRelease — refusals: each stops before anything is published', () => {
  const cases: Array<[string, BuildArgs, FakeOptions, RegExp]> = [
    ['the tag does not exist', PUB, { tagCommit: null }, /tag v15\.0\.1 does not exist/],
    ['the tag does not resolve to --expect-sha', { ...PUB, expectSha: 'deadbeef'.repeat(5) }, {}, /not the expected (deadbeef){5}/],
    ['the tagged commit is not on origin/main', PUB, { onMain: false }, /is not on this checkout's origin\/main/],
    ['this checkout has no GitHub Packages auth (checked before any install or build)', PUB, { fail: `npm whoami --registry=${GH_REGISTRY}` }, /no GitHub Packages auth/],
    ['this checkout has no public-npm auth (RS-31: checked before any install or build)', PUB, { fail: `npm whoami --registry=${PUBLIC_REGISTRY}` }, /no public-npm auth/],
    ['the clone is not at the requested commit', PUB, { cloneHead: 'f'.repeat(40) }, /the clone is at f+, not the requested/],
    ['package.json at the tag disagrees with the version', PUB, { pkgVersion: '15.0.0' }, /says version 15\.0\.0: the tag and the version disagree/],
    ['the clone is dirty after checkout', PUB, { dirtyAfter: 'checkout' }, /not clean after checkout/],
    ['the clone is dirty after npm ci', PUB, { dirtyAfter: 'ci' }, /not clean after npm ci/],
    ['npm ci fails', PUB, { fail: 'npm ci' }, /npm ci failed/],
    ['check:drift fails', PUB, { fail: 'check:drift' }, /check:drift failed/],
    ['npm pack fails', PUB, { fail: 'npm pack' }, /npm pack \(scripts on\) failed/],
    ['the pack produced no tarball, or several', PUB, { tarballs: [] }, /exactly one tarball/],
    ['the token index is stale', PUB, { fail: 'verify:token-index-clean' }, /verify:token-index-clean failed/],
    ['floor-closure.json is stale at the commit (row 3)', PUB, { staleClosure: true }, /floor-closure\.json is stale/],
    ['the floor-closure regeneration fails', PUB, { fail: 'scripts/floor-closure.ts' }, /npx tsx scripts\/floor-closure\.ts failed/],
    [
      // Row 1 (ballot residual (i)): a pack-assert that dropped section 10 has no failed finding to refuse on.
      'pack-assert ran without section 10 (row 1: the script floor)',
      PUB,
      { findings: GREEN_FINDINGS.filter((f) => !f.label.startsWith('publish path:')) },
      new RegExp(`0 passing \`publish path:\` finding\\(s\\), below the section-10 floor of ${PUBLISH_PATH_FLOOR}`),
    ],
    [
      'pack-assert ran section 10 short by one check (row 1)',
      PUB,
      { findings: GREEN_FINDINGS.slice(0, -1) },
      new RegExp(`${PUBLISH_PATH_FLOOR - 1} passing .* below the section-10 floor`),
    ],
    [
      'pack-assert finds a leftover on the tarball',
      PUB,
      { findings: [{ ok: true, label: 'x' }, { ok: false, label: 'publish path: no leftover dist/ files' }] },
      /pack-assert: 1 finding/,
    ],
    ['the GitHub Packages fetch fails', PUB, { fail: 'git fetch' }, /git fetch refs\/tags\/v15\.0\.1 failed/],
  ];

  it.each(cases)('%s', (_name, args, opts, message) => {
    const f = fake(opts);
    expect(() => runRelease(args, f.deps, PROJECT)).toThrow(Refusal);
    const f2 = fake(opts);
    expect(() => runRelease(args, f2.deps, PROJECT)).toThrow(message);
    expect(publishCalls(f)).toEqual([]);
    // Nothing is cleaned up after a refusal: the work dir stays for inspection.
    expect(f.removed).toEqual([]);
  });

  it('a missing GitHub Packages auth refuses before npm ci runs', () => {
    const f = fake({ fail: `npm whoami --registry=${GH_REGISTRY}` });
    expect(() => runRelease(PUB, f.deps, PROJECT)).toThrow(Refusal);
    expect(f.calls.map(line).some((l) => l.startsWith('npm ci'))).toBe(false);
  });

  it('RS-31: a missing public-npm auth refuses before any clone or build, names the registry, the exit code and the login remedy, and states the 5.4 residual', () => {
    const f = fake({ fail: `npm whoami --registry=${PUBLIC_REGISTRY}` });
    let message = '';
    try {
      runRelease(PUB, f.deps, PROJECT);
    } catch (e) {
      expect(e).toBeInstanceOf(Refusal);
      message = (e as Error).message;
    }
    expect(message).toContain(PUBLIC_REGISTRY);
    expect(message).toContain('exit 1');
    expect(message).toContain(`npm login --auth-type=web --registry=${PUBLIC_REGISTRY}`);
    expect(message).toContain('web 2FA');
    expect(message).toMatch(/shrinks the window.*does not close it/);
    const seq = f.calls.map(line);
    expect(seq.some((l) => l.startsWith('git init') || l.startsWith('git fetch') || l.startsWith('npm ci'))).toBe(false);
    expect(publishCalls(f)).toEqual([]);
  });

  it('a failing GitHub Packages publish is reported as such and writes no record', () => {
    const f = fake({ fail: 'npm publish' });
    expect(() => runRelease(PUB, f.deps, PROJECT)).toThrow(/npm publish to GitHub Packages failed/);
    expect(Object.keys(f.written)).toEqual([]);
  });

  it('a stale closure refuses before the pack, and the regenerated file stays in the kept clone to diff', () => {
    const f = fake({ staleClosure: true });
    expect(() => runRelease(DRY, f.deps, PROJECT)).toThrow(/floor-closure\.json is stale/);
    const seq = f.calls.map(line);
    expect(seq.some((l) => l.startsWith('npm pack'))).toBe(false);
    expect(seq).not.toContain('git checkout -q -- floor-closure.json');
  });

  it('a dry run below the section-10 floor refuses too (5.1 catches it before any tag exists)', () => {
    const f = fake({ findings: [{ ok: true, label: 'closure-2 ADD present: x' }] });
    expect(() => runRelease(DRY, f.deps, PROJECT)).toThrow(/below the section-10 floor/);
  });

  it('a dry run with a stale token index refuses too (5.1 stops the release before any tag exists)', () => {
    const f = fake({ fail: 'verify:token-index-clean' });
    expect(() => runRelease(DRY, f.deps, PROJECT)).toThrow(/verify:token-index-clean failed/);
  });
});

// ─── the census mode (hermetic-publish-path, commit-held scope) ───────────────────────────────────

describe('census mode — corpus reading', () => {
  const RECORD = '{\n  "mode": "publish",\n  "version": "15.1.0",\n  "commit": "e49359e49dc338078669a90aa5b37aa2436b60a4"\n}';
  const step6 = (record: string): string => `# Release\n\n## Comparands (6b)\n\n${CENSUS_HEADING}\n${record}\n\n\n### 5.1 dry run\n{\n  "x": 1\n}\n`;

  it('extracts the pasted record verbatim, from its { line to the first } line after it', () => {
    expect(extractPastedRecord(step6(RECORD))).toBe(RECORD);
  });

  it('selects no input from a file without the heading (15.0.0 predates the script)', () => {
    expect(extractPastedRecord('# Release 15.0.0\n{\n}\n')).toBeUndefined();
  });

  it('reads docs/releases/*/publish-verification.txt in sorted order and skips directories without one', () => {
    const files: Record<string, string> = {
      '/r/docs/releases/16.0.0/publish-verification.txt': step6(RECORD),
      '/r/docs/releases/15.1.0/publish-verification.txt': step6(RECORD),
      '/r/docs/releases/15.0.0/publish-verification.txt': '# no record\n',
    };
    const corpus = censusCorpus('/r', {
      listDir: () => ['RELEASE-NOTES-9.0.0.md', '16.0.0', '15.0.0', '15.1.0'],
      readFile: (f) => {
        if (!(f in files)) throw new Error('ENOENT');
        return files[f];
      },
    });
    expect(corpus.map((c) => c.input)).toEqual(['docs/releases/15.1.0/publish-verification.txt', 'docs/releases/16.0.0/publish-verification.txt']);
  });
});

describe('census mode — runCensus calls the decision functions once per input and adds no logic', () => {
  const commitA = 'e49359e49dc338078669a90aa5b37aa2436b60a4';
  const commitB = '13adf005a65d74ccf240a5c8a8b865962e5b67c1';
  const rec = (version: string, commit: string, mode = 'publish'): string =>
    `{\n  "mode": "${mode}",\n  "version": "${version}",\n  "commit": "${commit}",\n  "tarball": "/t/3fn-core-${version}.tgz",\n  "sha1": "${'c'.repeat(40)}",\n  "publishedTo": [\n    "${GH_REGISTRY}"\n  ]\n}`;
  const censusDeps = (records: Record<string, string>, tags: Record<string, string>): { deps: Deps; calls: Call[] } => {
    const calls: Call[] = [];
    const base = fake().deps;
    const deps: Deps = {
      ...base,
      listDir: () => Object.keys(records),
      readFile: (f) => {
        const v = Object.keys(records).find((k) => f === `/r/docs/releases/${k}/publish-verification.txt`);
        if (!v) throw new Error('ENOENT');
        return `${CENSUS_HEADING}\n${records[v]}\n`;
      },
      run(cmd, args, cwd) {
        calls.push({ cmd, args, cwd });
        const tag = args[2].replace('refs/tags/', '');
        return { status: 0, stdout: tags[tag] ? `${'a'.repeat(40)}\trefs/tags/${tag}\n${tags[tag]}\trefs/tags/${tag}^{}\n` : '' };
      },
    };
    return { deps, calls };
  };

  it('prints one sorted line per input and the selected count, reading tags from the source by git ls-remote', () => {
    const { deps, calls } = censusDeps({ '16.0.0': rec('16.0.0', commitB), '15.1.0': rec('15.1.0', commitA) }, { 'v15.1.0': commitA, 'v16.0.0': commitB });
    const out = runCensus(deps, '/r', '/r');
    const names = CENSUS_DECISIONS.map((d) => d.name);
    expect(out).toHaveLength(3);
    expect(out[0].startsWith('docs/releases/15.1.0/publish-verification.txt\t')).toBe(true);
    expect(out[1].startsWith('docs/releases/16.0.0/publish-verification.txt\t')).toBe(true);
    for (const l of out.slice(0, 2)) expect(l.split('\t')[1]).toBe(names.map((n) => `${n}=pass`).join(';'));
    expect(out[2]).toMatch(/^selected: 2 pasted 5\.3 records/);
    expect(calls.every((c) => c.cmd === 'git' && c.args[0] === 'ls-remote' && c.args[1] === '/r')).toBe(true);
  });

  it('shows a refusing input as a refusal, not a pass (a moved tag, an absent tag)', () => {
    const { deps } = censusDeps({ '15.1.0': rec('15.1.0', commitA), '16.0.0': rec('16.0.0', commitB) }, { 'v15.1.0': commitB });
    const out = runCensus(deps, '/r', '/r');
    expect(out[0]).toContain(`tag-5.3=refuse(names ${commitB})`);
    expect(out[1]).toContain('tag-5.3=refuse(absent)');
  });

  it('refuses when git ls-remote fails (the census never guesses a tag)', () => {
    const { deps } = censusDeps({ '15.1.0': rec('15.1.0', commitA) }, {});
    const failing: Deps = { ...deps, run: () => ({ status: 128, stdout: '' }) };
    expect(() => runCensus(failing, '/r', '/r')).toThrow(/git ls-remote \/r failed \(exit 128\)/);
  });
});

// ─── 5.4: the --npmjs mode (E7b, F-49 (ii-b)) ────────────────────────────────────────────────────

const V = '16.2.0';
const C = '38f4ece47c425cc83cac6739cae7a1806bfb0818';
const OTHER = '13adf005a65d74ccf240a5c8a8b865962e5b67c1';
const RECORD_PATH = '/var/folders/x/T/dp-release-a/out/release-publish-record.json';
const NPM_TARBALL = '/var/folders/x/T/dp-release-a/out/3fn-core-16.2.0.tgz';
const SHA1 = 'cc42f4f9897677ee53b3f75d18ef52535a346c6a';

const record54 = (over: Record<string, unknown> = {}): string =>
  `${JSON.stringify(
    {
      mode: 'publish',
      version: V,
      commit: C,
      source: ORIGIN,
      tarball: NPM_TARBALL,
      sha1: SHA1,
      fileCount: 1700,
      bytes: 6500000,
      checks: { passed: 110, total: 110 },
      publishedTo: [GH_REGISTRY],
      createdAt: '2026-11-01T12:00:00.000Z',
      ...over,
    },
    null,
    2
  )}\n`;

/** A packument that holds 16.1.0, and optionally the version under test in `versions`, `time` or both. */
const packument = (has: { versions?: boolean; time?: boolean } = {}): string =>
  JSON.stringify({
    name: '@3fn/core',
    versions: { '16.1.0': { version: '16.1.0' }, ...(has.versions ? { [V]: { version: V } } : {}) },
    time: { created: '2026-04-08T19:00:04Z', '16.1.0': '2026-10-26T17:34:46.376Z', ...(has.time ? { [V]: '2026-11-01T12:05:00.000Z' } : {}) },
  });

interface NpmjsCall extends Call {
  inherit: boolean;
}

interface NpmjsFakeOptions {
  recordText?: string | null; // null: the record cannot be read
  sha1?: string | null; // null: the tarball cannot be read
  tagCommit?: string | null; // null: the tag is absent
  lsRemoteStatus?: number;
  curl?: RunResult; // the packument GET's result (stdout ends with '\n<http_code>')
  publishStatus?: number;
}

function npmjsFake(o: NpmjsFakeOptions = {}): { deps: Deps; calls: NpmjsCall[]; logs: string[] } {
  const calls: NpmjsCall[] = [];
  const logs: string[] = [];
  const base = fake().deps;
  const deps: Deps = {
    ...base,
    readFile: (f) => {
      if (f !== RECORD_PATH || o.recordText === null) throw new Error(`ENOENT: ${f}`);
      return o.recordText ?? record54();
    },
    sha1: (f) => {
      if (f !== NPM_TARBALL || o.sha1 === null) throw new Error(`ENOENT: ${f}`);
      return o.sha1 ?? SHA1;
    },
    log: (l) => {
      logs.push(l);
    },
    run(cmd, args, cwd, inherit) {
      calls.push({ cmd, args, cwd, inherit: inherit === true });
      if (cmd === 'git' && args[0] === 'remote') return { status: 0, stdout: `${ORIGIN}\n` };
      if (cmd === 'git' && args[0] === 'ls-remote') {
        if (o.lsRemoteStatus) return { status: o.lsRemoteStatus, stdout: '' };
        if (o.tagCommit === null) return { status: 0, stdout: '' };
        return { status: 0, stdout: `145254cd7831ef802178ca53c48026a185da34d8\trefs/tags/v${V}\n${o.tagCommit ?? C}\trefs/tags/v${V}^{}\n` };
      }
      if (cmd === 'curl') return o.curl ?? { status: 0, stdout: `${packument()}\n200` };
      if (cmd === 'npm' && args[0] === 'publish') return { status: o.publishStatus ?? 0, stdout: '' };
      throw new Error(`unexpected call: ${cmd} ${args.join(' ')}`);
    },
  };
  return { deps, calls, logs };
}

const npmPublishes = (calls: NpmjsCall[]): NpmjsCall[] => calls.filter((c) => c.cmd === 'npm' && c.args[0] === 'publish');

describe('runNpmjs — the happy path (RELEASE-FLOW 5.4)', () => {
  it('checks the record, the sha1, the tag and npmjs, then publishes THAT tarball once, with inherited stdio, from the operator checkout', () => {
    const f = npmjsFake();
    const record = runNpmjs(RECORD_PATH, f.deps, PROJECT);
    expect(record).toMatchObject({ mode: 'publish', version: V, commit: C, tarball: NPM_TARBALL, sha1: SHA1 });

    const seq = f.calls.map(line);
    expect(seq).toEqual([
      'git remote get-url origin',
      `git ls-remote ${ORIGIN} refs/tags/v${V} refs/tags/v${V}^{}`,
      `curl ${npmjsCurlArgs().join(' ')}`,
      `npm publish ${NPM_TARBALL} --registry=${PUBLIC_REGISTRY} --@3fn:registry=${PUBLIC_REGISTRY} --access public`,
    ]);
    const pubs = npmPublishes(f.calls);
    expect(pubs).toHaveLength(1);
    expect(pubs[0].args).toEqual(publicPublishArgs(NPM_TARBALL));
    expect(pubs[0].inherit).toBe(true); // web 2FA reaches the operator's terminal
    expect(pubs[0].cwd).toBe(PROJECT); // the operator's npm config authenticates; the script reads none
    // Only the publish streams to the terminal; every read is captured.
    expect(f.calls.filter((c) => c.inherit)).toEqual(pubs);
    expect(seq.some((l) => l.includes('--ignore-scripts'))).toBe(false);
    // The closing note: npm's + line is not evidence, and step 6 reads the packument.
    const log = f.logs.join('\n');
    expect(log).toContain(`npm's "+ @3fn/core@${V}" line is not evidence that the registry recorded the version`);
    expect(log).toContain('RELEASE-FLOW step 6 reads the packument');
  });

  it("reads the packument with the rail's curl form: -q first (no curl config), a 15 s timeout, the HTTP code appended", () => {
    expect(npmjsCurlArgs()).toEqual(['-q', '-sS', '--max-time', '15', '-w', '\n%{http_code}', 'https://registry.npmjs.org/@3fn%2fcore']);
    expect(NPMJS_PACKUMENT_URL).toBe('https://registry.npmjs.org/@3fn%2fcore');
  });
});

describe('runNpmjs — the four refusals: each fails closed and publishes nothing', () => {
  const cases: Array<[string, NpmjsFakeOptions, RegExp]> = [
    // 1. The record is 5.3's.
    ['refusal 1: a dry-run record (5.1 or a pre-S run)', { recordText: record54({ mode: 'dry-run', publishedTo: [] }) }, /is not 5\.3's record: its mode is "dry-run", not "publish"/],
    ['refusal 1: a publish-mode record without GitHub Packages in publishedTo', { recordText: record54({ publishedTo: [] }) }, /its publishedTo does not hold https:\/\/npm\.pkg\.github\.com/],
    ['refusal 1: a record that is not JSON', { recordText: 'tarball: /x.tgz\n' }, /the record is not JSON/],
    ['refusal 1: a record with no commit', { recordText: record54({ commit: undefined }) }, /its commit is not a full 40-character SHA/],
    ['refusal 1: a record that cannot be read', { recordText: null }, /cannot read the record/],
    // 2. The file's sha1 equals the record's.
    ['refusal 2: a sha1 mismatch (a file swapped at the path)', { sha1: 'e3d868940000000000000000000000000000000a' }, /has sha1 e3d86894.*not the record's cc42f4f9/],
    ['refusal 2: the tarball cannot be read', { sha1: null }, /cannot read the tarball the record names/],
    // 3. The tag names the record's commit.
    ['refusal 3: the tag names another commit', { tagCommit: OTHER }, new RegExp(`tag v${V.replace(/\./g, '\\.')} at .* names ${OTHER}, not the record's commit ${C}`)],
    ['refusal 3: the tag is absent', { tagCommit: null }, /tag v16\.2\.0 does not exist at/],
    ['refusal 3: git ls-remote fails (no network)', { lsRemoteStatus: 128 }, /git ls-remote .* failed \(exit 128\)/],
    // 4. npmjs's packument reads without the version.
    ['refusal 4: the packument holds the version (versions and time)', { curl: { status: 0, stdout: `${packument({ versions: true, time: true })}\n200` } }, /npmjs already holds 16\.2\.0/],
    ['refusal 4: the packument holds time["<v>"] only', { curl: { status: 0, stdout: `${packument({ time: true })}\n200` } }, /npmjs already holds 16\.2\.0/],
    ['refusal 4: the packument holds versions["<v>"] only', { curl: { status: 0, stdout: `${packument({ versions: true })}\n200` } }, /npmjs already holds 16\.2\.0/],
    ['refusal 4: a network error', { curl: { status: 6, stdout: '' } }, /could not establish that 16\.2\.0 is absent from npmjs \(curl exited 6: a network error or a timeout\)/],
    ['refusal 4: a timeout', { curl: { status: 28, stdout: '' } }, /curl exited 28: a network error or a timeout/],
    ['refusal 4: a non-200 status (404)', { curl: { status: 0, stdout: '{"error":"Not found"}\n404' } }, /could not establish .* \(HTTP 404 from https:\/\/registry\.npmjs\.org\/@3fn%2fcore\)/],
    ['refusal 4: a non-200 status (503)', { curl: { status: 0, stdout: '<html>busy</html>\n503' } }, /\(HTTP 503 from/],
    ['refusal 4: a body that does not parse', { curl: { status: 0, stdout: '{"versions": {\n200' } }, /the body does not parse as JSON/],
    ['refusal 4: a body that parses but is not a packument', { curl: { status: 0, stdout: '{}\n200' } }, /the body is not a packument/],
  ];

  it.each(cases)('%s', (_name, opts, message) => {
    const f = npmjsFake(opts);
    expect(() => runNpmjs(RECORD_PATH, f.deps, PROJECT)).toThrow(Refusal);
    const f2 = npmjsFake(opts);
    expect(() => runNpmjs(RECORD_PATH, f2.deps, PROJECT)).toThrow(message);
    expect(npmPublishes(f.calls)).toEqual([]);
  });

  it('stops at the first refusal: a dry-run record reads no tarball, no tag and no registry', () => {
    const f = npmjsFake({ recordText: record54({ mode: 'dry-run', publishedTo: [] }) });
    expect(() => runNpmjs(RECORD_PATH, f.deps, PROJECT)).toThrow(Refusal);
    expect(f.calls).toEqual([]);
  });

  it('a sha1 mismatch refuses before any network read', () => {
    const f = npmjsFake({ sha1: '0'.repeat(40) });
    expect(() => runNpmjs(RECORD_PATH, f.deps, PROJECT)).toThrow(/not the record's/);
    expect(f.calls).toEqual([]);
  });

  it('a failed npm publish is reported as PublishFailed, never as "nothing was published", and sends the operator to the packument and this mode', () => {
    const f = npmjsFake({ publishStatus: 1 });
    let err: unknown;
    try {
      runNpmjs(RECORD_PATH, f.deps, PROJECT);
    } catch (e) {
      err = e;
    }
    expect(err).toBeInstanceOf(PublishFailed);
    expect(err).not.toBeInstanceOf(Refusal);
    const message = (err as Error).message;
    expect(message).toMatch(/exited 1\. Whether npmjs accepted it is not known from here/);
    expect(message).toContain('time["16.2.0"]');
    expect(message).toMatch(/never a raw npm publish/);
    expect(message).not.toMatch(/nothing was published/i);
    expect(npmPublishes(f.calls)).toHaveLength(1);
  });
});

describe('the --npmjs decision functions', () => {
  it('recordModeVerdict passes 5.3\'s record shape and refuses a dry-run record', () => {
    expect(recordModeVerdict(record54()).ok).toBe(true);
    expect(recordModeVerdict(record54({ mode: 'dry-run', publishedTo: [] })).ok).toBe(false);
    expect(recordModeVerdict('null').ok).toBe(false);
    expect(recordModeVerdict('[]').ok).toBe(false);
    expect(recordModeVerdict(record54({ sha1: 'abc' })).ok).toBe(false);
    expect(recordModeVerdict(record54({ tarball: '' })).ok).toBe(false);
    expect(recordModeVerdict(record54({ version: 'sixteen' })).ok).toBe(false);
  });

  it('tagToCommitVerdict is 5.3\'s tagVerdict called with the record', () => {
    const ls = `145254cd7831ef802178ca53c48026a185da34d8\trefs/tags/v${V}\n${C}\trefs/tags/v${V}^{}\n`;
    expect(tagToCommitVerdict({ version: V, commit: C }, ls)).toEqual(tagVerdict(ls, `v${V}`, C));
    expect(tagToCommitVerdict({ version: V, commit: OTHER }, ls)).toEqual({ ok: false, found: C });
  });

  it('npmjsAbsenceVerdict passes only a readable packument without the version', () => {
    const pass: AbsenceVerdict = { ok: true };
    expect(npmjsAbsenceVerdict({ status: 0, stdout: `${packument()}\n200` }, V)).toEqual(pass);
    expect(npmjsAbsenceVerdict({ status: 0, stdout: `${packument()}\n200` }, '16.1.0').ok).toBe(false);
    expect(npmjsAbsenceVerdict({ status: 0, stdout: '' }, V).ok).toBe(false); // no status line at all
  });
});

describe('census mode — 5.4\'s commit-held decisions are called; its live-state ones are not', () => {
  it('lists record-mode and tag-to-commit beside 5.3\'s tag check, and neither the sha1 read nor the npmjs read', () => {
    expect(CENSUS_DECISIONS.map((d) => d.name)).toEqual(['tag-5.3', 'record-mode', 'tag-to-commit']);
  });

  it('a pasted dry-run record would show record-mode=refuse', () => {
    const ctx = { recordText: record54({ mode: 'dry-run', publishedTo: [] }), lsRemote: () => `${C}\trefs/tags/v${V}\n` };
    const recordMode = CENSUS_DECISIONS.find((d) => d.name === 'record-mode')!;
    expect(recordMode.decide(ctx)).toMatch(/^refuse\(its mode is "dry-run"/);
    expect(CENSUS_DECISIONS.find((d) => d.name === 'tag-to-commit')!.decide(ctx)).toBe('pass');
  });
});
