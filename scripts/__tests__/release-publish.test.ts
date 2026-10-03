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
  Deps,
  GH_REGISTRY,
  ghPublishArgs,
  parseArgs,
  parseLsRemote,
  PUBLIC_REGISTRY,
  publicPublishArgs,
  Refusal,
  ReleaseArgs,
  renderCommand,
  runRelease,
  RunResult,
  sha1OfFile,
  shellQuote,
} from '../release-publish';
import { Finding } from '../pack-assert';

// ─── parseArgs ───────────────────────────────────────────────────────────────────────────────────

describe('parseArgs', () => {
  it('parses a dry run at a SHA', () => {
    expect(parseArgs(['--dry-run', '1d75c5e5'])).toEqual({ mode: 'dry-run', sha: '1d75c5e5', source: undefined, keep: false });
  });

  it('parses a publish at a version, with or without a leading v, and its options', () => {
    expect(parseArgs(['15.0.1'])).toEqual({ mode: 'publish', version: '15.0.1', expectSha: undefined, source: undefined, keep: false });
    expect(parseArgs(['v15.1.0-rc.1', '--expect-sha', '9e1a3106', '--source', '/tmp/repo', '--keep'])).toEqual({
      mode: 'publish',
      version: '15.1.0-rc.1',
      expectSha: '9e1a3106',
      source: '/tmp/repo',
      keep: true,
    });
  });

  it.each([
    [[], /usage/],
    [['--dry-run'], /needs a value/],
    [['--dry-run', 'main'], /commit SHA/],
    [['--dry-run', '1d75c5e5', '15.0.1'], /not both/],
    [['--dry-run', '1d75c5e5', '--expect-sha', '1d75c5e5'], /applies to a publish/],
    [['fifteen'], /not a version/],
    [['15.0.1', '--expect-sha', 'xyz'], /commit SHA/],
    [['15.0.1', '16.0.0'], /unexpected argument/],
    [['15.0.1', '--ignore-scripts'], /unknown option/],
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
}

function fake(o: FakeOptions = {}): Fake {
  const calls: Call[] = [];
  const logs: string[] = [];
  const written: Record<string, string> = {};
  const removed: string[] = [];
  let statusCalls = 0;
  const ok = (stdout = ''): RunResult => ({ status: 0, stdout });
  const deps: Deps = {
    run(cmd, args, cwd) {
      calls.push({ cmd, args, cwd });
      const line = `${cmd} ${args.join(' ')}`;
      if (o.fail && line.includes(o.fail)) return { status: 1, stdout: '' };
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
    assertTarball: () => ({ findings: o.findings ?? [{ ok: true, label: 'all good' }], fileCount: 1638 }),
    log: (l) => {
      logs.push(l);
    },
    now: () => '2026-10-03T12:00:00.000Z',
  };
  return { deps, calls, logs, written, removed };
}

const line = (c: Call): string => `${c.cmd} ${c.args.join(' ')}`;
const publishCalls = (f: Fake): Call[] => f.calls.filter((c) => c.cmd === 'npm' && c.args[0] === 'publish');
const DRY: ReleaseArgs = { mode: 'dry-run', sha: '9e1a3106', keep: false };
const PUB: ReleaseArgs = { mode: 'publish', version: '15.0.1', keep: false };

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
    expect(idx(`npm pack --pack-destination ${OUT}`)).toBeGreaterThan(idx('npm run check:drift'));
    // The token index is regenerated by the build inside pack's prepack, so it is verified AFTER the pack.
    expect(idx('npm run verify:token-index-clean')).toBeGreaterThan(idx('npm pack'));
    // No --ignore-scripts anywhere: the pack must run prepack.
    expect(seq.some((l) => l.includes('--ignore-scripts'))).toBe(false);
    // npm runs inside the clone, never in the operator's checkout.
    for (const c of f.calls.filter((c) => c.cmd === 'npm')) expect(c.cwd).toBe(CLONE);
    expect(seq.some((l) => l.startsWith('npm whoami'))).toBe(false); // a dry run needs no publish auth

    expect(publishCalls(f)).toEqual([]);
    expect(r.record).toMatchObject({ mode: 'dry-run', version: '15.0.1', commit: S, tarball: TARBALL, sha1: '65d2ec0b140192bc0f0adc17b9ac6526332a6594', fileCount: 1638, publishedTo: [] });
    expect(JSON.parse(f.written[`${OUT}/release-publish-record.json`])).toEqual(r.record);
    expect(f.logs.join('\n')).toMatch(/DRY RUN — nothing was published/);
    expect(r.publicCommand).toBe(`npm publish ${TARBALL} --registry=${PUBLIC_REGISTRY} --@3fn:registry=${PUBLIC_REGISTRY} --access public`);
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
    expect(seq).toContain(`git fetch -q --depth 1 ${ORIGIN} refs/tags/v15.0.1`);

    const pubs = publishCalls(f);
    expect(pubs).toHaveLength(1);
    expect(pubs[0].args).toEqual(['publish', TARBALL, `--registry=${GH_REGISTRY}`, `--@3fn:registry=${GH_REGISTRY}`]);
    expect(pubs[0].cwd).toBe(PROJECT); // npm config (auth) comes from the operator checkout; never read by the script
    // The publish comes after every check.
    expect(seq.indexOf(line(pubs[0]))).toBeGreaterThan(seq.findIndex((l) => l.includes('verify:token-index-clean')));

    expect(r.record.publishedTo).toEqual([GH_REGISTRY]);
    const log = f.logs.join('\n');
    expect(log).toContain(`shasum ${TARBALL}    # must print 65d2ec0b140192bc0f0adc17b9ac6526332a6594`);
    expect(log).toContain(r.publicCommand);
  });

  it('accepts a matching --expect-sha', () => {
    const f = fake();
    expect(() => runRelease({ ...PUB, expectSha: S.slice(0, 8) }, f.deps, PROJECT)).not.toThrow();
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
  const cases: Array<[string, ReleaseArgs, FakeOptions, RegExp]> = [
    ['the tag does not exist', PUB, { tagCommit: null }, /tag v15\.0\.1 does not exist/],
    ['the tag does not resolve to --expect-sha', { ...PUB, expectSha: 'deadbeef' }, {}, /not the expected deadbeef/],
    ['the tagged commit is not on origin/main', PUB, { onMain: false }, /is not on this checkout's origin\/main/],
    ['this checkout has no GitHub Packages auth (checked before any install or build)', PUB, { fail: 'npm whoami' }, /no GitHub Packages auth/],
    ['the clone is not at the requested commit', PUB, { cloneHead: 'f'.repeat(40) }, /the clone is at f+, not the requested/],
    ['package.json at the tag disagrees with the version', PUB, { pkgVersion: '15.0.0' }, /says version 15\.0\.0: the tag and the version disagree/],
    ['the clone is dirty after checkout', PUB, { dirtyAfter: 'checkout' }, /not clean after checkout/],
    ['the clone is dirty after npm ci', PUB, { dirtyAfter: 'ci' }, /not clean after npm ci/],
    ['npm ci fails', PUB, { fail: 'npm ci' }, /npm ci failed/],
    ['check:drift fails', PUB, { fail: 'check:drift' }, /check:drift failed/],
    ['npm pack fails', PUB, { fail: 'npm pack' }, /npm pack \(scripts on\) failed/],
    ['the pack produced no tarball, or several', PUB, { tarballs: [] }, /exactly one tarball/],
    ['the token index is stale', PUB, { fail: 'verify:token-index-clean' }, /verify:token-index-clean failed/],
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
    const f = fake({ fail: 'npm whoami' });
    expect(() => runRelease(PUB, f.deps, PROJECT)).toThrow(Refusal);
    expect(f.calls.map(line).some((l) => l.startsWith('npm ci'))).toBe(false);
  });

  it('a failing GitHub Packages publish is reported as such and writes no record', () => {
    const f = fake({ fail: 'npm publish' });
    expect(() => runRelease(PUB, f.deps, PROJECT)).toThrow(/npm publish to GitHub Packages failed/);
    expect(Object.keys(f.written)).toEqual([]);
  });

  it('a dry run with a stale token index refuses too (5.1 stops the release before any tag exists)', () => {
    const f = fake({ fail: 'verify:token-index-clean' });
    expect(() => runRelease(DRY, f.deps, PROJECT)).toThrow(/verify:token-index-clean failed/);
  });
});
