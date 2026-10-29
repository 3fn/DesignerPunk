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
  publishPathPasses,
  Refusal,
  ReleaseArgs,
  renderCommand,
  runRelease,
  RunResult,
  sameFloorClosure,
  sha1OfFile,
  shellQuote,
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
const DRY: ReleaseArgs = { mode: 'dry-run', sha: '9e1a3106', keep: false };
const PUB: ReleaseArgs = { mode: 'publish', version: '15.0.1', expectSha: S, keep: false };

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
    const log = f.logs.join('\n');
    expect(log).toContain(`shasum ${TARBALL}    # must print 65d2ec0b140192bc0f0adc17b9ac6526332a6594`);
    expect(log).toContain(r.publicCommand);
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
  const cases: Array<[string, ReleaseArgs, FakeOptions, RegExp]> = [
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
