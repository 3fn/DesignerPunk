/**
 * scripts/issues-owned.sh — the owner's session-start read (ballot
 * 2026-10-20-manual-records-routed-readers § 2 E1, RATIFIED Peter 2026-10-20, with condition (i)
 * fail-soft and condition (ii) the revisit trigger; Start Up Tasks item 9).
 *
 * The script is SPAWNED against throwaway git repositories built here: a bare "origin" and a
 * clone of it. Nothing reads the real repository. Every git call runs with the global and system
 * config disabled, so a developer's signing or hook settings cannot change a fixture.
 *
 * What is pinned:
 *   - each state: `manual`, `due:<ver>` (from `release:<ver>:phase-1`), `FIRED@<sha>` for a fired
 *     `path:` and `merge:#<N>`, `FIRED@<tag>` for `tag:`, and silence for each unfired token;
 *   - `path:` is bounded below by the commit that last changed a Trigger line; `merge:` is not;
 *   - attribution: the Owner token anywhere in the first 15 lines, the seat matched only after it
 *     (Stacy's false-hit header); a record with no Owner line is counted, never printed;
 *   - the first Trigger line is the one read (a multi-Trigger record);
 *   - the path: list form (ballot 2026-10-26-issues-multi-path-trigger-token, README rule 1): a
 *     list fires on a touch of any of its globs, at the earliest such commit whatever the glob's
 *     place in the list; it is bounded below by the Trigger line like one glob; a list with an
 *     empty element or a space beside a comma prints untokened;
 *   - the ground is origin/main after a fetch: a stale local main and a unit branch's own
 *     commits neither fire nor hide a record;
 *   - condition (i): an offline origin, a fetch that hangs past the timeout, an unknown seat and a
 *     missing seat each print exactly one `issues-owned: unavailable (<why>) — continue` line and
 *     exit 0;
 *   - condition (ii)'s instrument: each run appends one line to the run log.
 */

import { execFileSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const SCRIPT = path.resolve(__dirname, '..', 'issues-owned.sh');

const GIT_ENV: NodeJS.ProcessEnv = {
  ...process.env,
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_NOSYSTEM: '1',
  GIT_AUTHOR_NAME: 'Fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'Fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
  GIT_TERMINAL_PROMPT: '0',
};

const git = (cwd: string, ...args: string[]): string =>
  execFileSync('git', args, { cwd, env: GIT_ENV, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const write = (root: string, rel: string, text: string): void => {
  fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
  fs.writeFileSync(path.join(root, rel), text);
};

const commit = (cwd: string, subject: string): string => {
  git(cwd, 'add', '-A');
  git(cwd, 'commit', '-q', '--no-verify', '-m', subject);
  return git(cwd, 'rev-parse', '--short', 'HEAD');
};

const record = (owner: string | null, trigger: string, extra = ''): string =>
  [
    '# A record',
    '',
    '**Date**: 2026-10-21',
    ...(owner === null ? [] : [owner]),
    '**Class**: P3 improvement · defect',
    extra,
    `**Trigger**: ${trigger}`,
    '',
    'Body.',
    '',
  ].join('\n');

interface Run {
  status: number | null;
  stdout: string;
  stderr: string;
  lines: string[];
  ms: number;
}

const run = (cwd: string, args: string[], env: NodeJS.ProcessEnv = {}): Run => {
  const t0 = Date.now();
  const r = spawnSync('bash', [SCRIPT, ...args], {
    cwd,
    env: { ...GIT_ENV, ISSUES_OWNED_LOG: '/dev/null', ...env },
    encoding: 'utf8',
    timeout: 60_000,
  });
  return {
    status: r.status,
    stdout: r.stdout,
    stderr: r.stderr,
    lines: r.stdout.split('\n').filter((l) => l !== ''),
    ms: Date.now() - t0,
  };
};

const lineFor = (r: Run, file: string): string | undefined => r.lines.find((l) => l.split('\t')[1] === `.kiro/issues/${file}`);

describe('scripts/issues-owned.sh', () => {
  let base: string;
  let origin: string;
  let seed: string;
  let clone: string;
  const sha: Record<string, string> = {};

  beforeAll(() => {
    base = fs.mkdtempSync(path.join(os.tmpdir(), 'issues-owned-'));
    origin = path.join(base, 'origin.git');
    seed = path.join(base, 'seed');
    clone = path.join(base, 'clone');
    git(base, 'init', '-q', '--bare', '-b', 'main', origin);
    git(base, 'clone', '-q', origin, seed);
    git(seed, 'checkout', '-q', '-b', 'main');

    for (const a of ['ada', 'lina', 'stacy', 'thurgood', '_fixture']) write(seed, `canonical/agents/${a}.md`, `# ${a}\n`);
    write(seed, 'src/before/a.ts', 'export {};\n');
    sha.merged42 = commit(seed, 'An early unit (#42)');
    write(seed, 'src/before/b.ts', 'export {};\n'); // touches path:src/before/* BEFORE its Trigger line exists
    commit(seed, 'chore: before the trigger');

    const T = '**Owner**: Thurgood';
    write(seed, '.kiro/issues/README.md', `# README\n\n${T}\n**Trigger**: \`manual\`\n`);
    write(seed, '.kiro/issues/manual.md', record(T, '`manual` — only the owner sees it'));
    write(seed, '.kiro/issues/release-due.md', record(T, '`release:17.0.0:phase-1` — before release 17'));
    write(seed, '.kiro/issues/release-next.md', record(T, '`release:next:phase-1` — the next release'));
    write(seed, '.kiro/issues/path-fires.md', record(T, '`path:src/fires/*.ts` — the delivering file'));
    write(seed, '.kiro/issues/path-unfired.md', record(T, '`path:src/never/*.ts` — never touched on main'));
    write(seed, '.kiro/issues/path-bounded.md', record(T, '`path:src/before/*.ts` — touched only before this line'));
    write(seed, '.kiro/issues/merge-fired.md', record(T, '`merge:#42` — merged before the record was written'));
    write(seed, '.kiro/issues/merge-unfired.md', record(T, '`merge:#99` — not merged'));
    write(seed, '.kiro/issues/tag-fired.md', record(T, '`tag:v1.2.3` — the tag exists'));
    write(seed, '.kiro/issues/tag-unfired.md', record(T, '`tag:v9.9.9` — no such tag'));
    write(seed, '.kiro/issues/untokened.md', record(T, 'the event, in prose only'));
    write(
      seed,
      '.kiro/issues/multi-trigger.md',
      record(T, '`release:next:phase-1` — the first Trigger line is the one read', '').replace(
        'Body.',
        'Body.\n\n**Trigger**: `path:src/fires/*.ts` — a later Trigger line, never read',
      ),
    );
    write(seed, '.kiro/issues/no-owner.md', record(null, '`manual` — nobody owns this'));
    write(
      seed,
      '.kiro/issues/false-hit.md',
      record(null, '`manual` — Lina\'s record', '**Reported**: 2026-10-20 · confirmed by Stacy · **Owner**: **Lina**'),
    );
    write(
      seed,
      '.kiro/issues/owner-too-late.md',
      ['# Late owner', ...Array.from({ length: 16 }, (_, i) => `line ${i}`), '**Owner**: Thurgood', '**Trigger**: `manual`', ''].join('\n'),
    );
    write(seed, '.kiro/issues/archive/archived.md', record(T, '`manual` — archived, never printed'));
    write(seed, '.kiro/issues/co-owned.md', record('**Owners**: Ada, Lina', '`manual` — two owners'));
    // The path: list form. Stacy's records, so the Thurgood read above is unchanged.
    const S = '**Owner**: Stacy';
    write(seed, '.kiro/issues/list-fires-later-glob.md', record(S, '`path:src/never/*.ts,src/fires/*.ts` — fires on its second glob'));
    write(seed, '.kiro/issues/list-fires-earliest.md', record(S, '`path:src/fires/*.ts,src/early/**` — two globs touched; the earlier commit is printed'));
    write(seed, '.kiro/issues/list-unfired.md', record(S, '`path:src/never/*.ts,src/also-never/*.ts` — no glob touched on main'));
    write(seed, '.kiro/issues/list-bounded.md', record(S, '`path:src/never/*.ts,src/before/*.ts` — one glob touched only before this line'));
    write(seed, '.kiro/issues/list-trailing-comma.md', record(S, '`path:src/fires/*.ts,` — an empty element'));
    write(seed, '.kiro/issues/list-space.md', record(S, '`path:src/never/*.ts, src/fires/*.ts` — a space after the comma'));
    commit(seed, 'records');
    git(seed, 'tag', 'v1.2.3');
    write(seed, 'src/early/deep/e.ts', 'export {};\n');
    sha.early = commit(seed, 'feat: an earlier change under a listed glob');
    git(seed, 'push', '-q', 'origin', 'main', '--tags');

    // The clone is taken now, so its local main is STALE once origin advances below.
    git(base, 'clone', '-q', origin, clone);

    write(seed, 'src/fires/x.ts', 'export {};\n');
    sha.fires = commit(seed, 'feat: the delivering change');
    git(seed, 'push', '-q', 'origin', 'main');

    // A unit branch in the clone touching an unfired glob: never read (the ground is origin/main).
    git(clone, 'checkout', '-q', '-b', 'task/unit');
    write(clone, 'src/never/y.ts', 'export {};\n');
    commit(clone, 'wip on the unit branch');
  });

  afterAll(() => {
    fs.rmSync(base, { recursive: true, force: true });
  });

  describe('a full read for Thurgood from a stale clone on a unit branch', () => {
    let r: Run;
    beforeAll(() => {
      r = run(clone, ['Thurgood']);
    });

    it('exits 0 and writes nothing to stderr', () => {
      expect(r.status).toBe(0);
      expect(r.stderr).toBe('');
    });

    it('prints manual records', () => {
      expect(lineFor(r, 'manual.md')).toMatch(/^manual\t\.kiro\/issues\/manual\.md\t`manual` — only the owner sees it$/);
    });

    it('prints release:<ver>:phase-1 as due:<ver>', () => {
      expect(lineFor(r, 'release-due.md')?.split('\t')[0]).toBe('due:17.0.0');
      expect(lineFor(r, 'release-next.md')?.split('\t')[0]).toBe('due:next');
    });

    it('fires path: from origin/main after the fetch, not from the stale local main', () => {
      expect(git(clone, 'rev-parse', '--short', 'main')).not.toBe(sha.fires);
      expect(lineFor(r, 'path-fires.md')?.split('\t')[0]).toBe(`FIRED@${sha.fires}`);
    });

    it('does not fire path: on a unit branch commit or on a commit before the Trigger line', () => {
      expect(lineFor(r, 'path-unfired.md')).toBeUndefined();
      expect(lineFor(r, 'path-bounded.md')).toBeUndefined();
    });

    it('fires merge:#<N> on a first-parent subject anywhere on origin/main, and not otherwise', () => {
      expect(lineFor(r, 'merge-fired.md')?.split('\t')[0]).toBe(`FIRED@${sha.merged42}`);
      expect(lineFor(r, 'merge-unfired.md')).toBeUndefined();
    });

    it('fires tag: when the tag exists, and not otherwise', () => {
      expect(lineFor(r, 'tag-fired.md')?.split('\t')[0]).toBe('FIRED@v1.2.3');
      expect(lineFor(r, 'tag-unfired.md')).toBeUndefined();
    });

    it('reads only the first Trigger line of a multi-Trigger record', () => {
      expect(lineFor(r, 'multi-trigger.md')?.split('\t')[0]).toBe('due:next');
    });

    it('prints a Trigger line with no token as untokened', () => {
      expect(lineFor(r, 'untokened.md')?.split('\t')[0]).toBe('untokened');
    });

    it('never prints README.md, an archived record, another seat\'s record or a late Owner line', () => {
      for (const f of ['README.md', 'archive/archived.md', 'false-hit.md', 'co-owned.md', 'owner-too-late.md', 'no-owner.md']) {
        expect(lineFor(r, f)).toBeUndefined();
      }
    });

    it('ends with the count line: printed records, the ref and its SHA, and the no-owner count', () => {
      // Printed: manual, release-due, release-next, path-fires, merge-fired, tag-fired, untokened,
      // multi-trigger. No Owner line: no-owner.md, and owner-too-late.md (its Owner is past line 15).
      expect(r.lines.length - 1).toBe(8);
      expect(r.lines[r.lines.length - 1]).toBe(
        `8 record(s) for Thurgood at origin/main ${sha.fires}; 2 root record(s) carry no **Owner**:/**Owners**: line`,
      );
    });
  });

  describe('the path: list form, for Stacy', () => {
    let r: Run;
    beforeAll(() => {
      r = run(clone, ['Stacy']);
    });

    it('fires a list on a touch of any of its globs', () => {
      expect(lineFor(r, 'list-fires-later-glob.md')?.split('\t')[0]).toBe(`FIRED@${sha.fires}`);
    });

    it('prints the earliest commit across the globs, whatever their order in the list', () => {
      expect(lineFor(r, 'list-fires-earliest.md')?.split('\t')[0]).toBe(`FIRED@${sha.early}`);
    });

    it('is quiet when no glob is touched after the Trigger line', () => {
      expect(lineFor(r, 'list-unfired.md')).toBeUndefined();
      expect(lineFor(r, 'list-bounded.md')).toBeUndefined();
    });

    it('prints a malformed list as untokened, never as a silent non-fire', () => {
      expect(lineFor(r, 'list-trailing-comma.md')?.split('\t')[0]).toBe('untokened');
      expect(lineFor(r, 'list-space.md')?.split('\t')[0]).toBe('untokened');
    });

    it('ends with the count line for Stacy', () => {
      expect(r.lines.length - 1).toBe(4);
      expect(r.lines[r.lines.length - 1]).toBe(
        `4 record(s) for Stacy at origin/main ${sha.fires}; 2 root record(s) carry no **Owner**:/**Owners**: line`,
      );
    });
  });

  describe('attribution', () => {
    it('matches the seat only after the Owner token (Stacy\'s false-hit header is Lina\'s)', () => {
      const stacy = run(clone, ['Stacy']);
      expect(lineFor(stacy, 'false-hit.md')).toBeUndefined();
      const lina = run(clone, ['lina']);
      expect(lineFor(lina, 'false-hit.md')?.split('\t')[0]).toBe('manual');
      expect(lineFor(lina, 'co-owned.md')?.split('\t')[0]).toBe('manual');
      expect(lina.lines[lina.lines.length - 1]).toMatch(/^2 record\(s\) for Lina at origin\/main /);
    });
  });

  describe('condition (i): fail-soft, one line, exit 0', () => {
    const UNAVAILABLE = /^issues-owned: unavailable \(.+\) — continue$/;

    it('an unknown seat', () => {
      const r = run(clone, ['Nobody']);
      expect(r.status).toBe(0);
      expect(r.lines).toHaveLength(1);
      expect(r.lines[0]).toMatch(UNAVAILABLE);
      expect(r.lines[0]).toContain("unknown seat 'Nobody'; seats at origin/main: Ada Lina Stacy Thurgood");
    });

    it('no seat given', () => {
      const r = run(clone, []);
      expect(r.status).toBe(0);
      expect(r.lines).toEqual(['issues-owned: unavailable (no seat given; usage: ./scripts/issues-owned.sh <YourName>) — continue']);
    });

    it('offline: the fetch fails, so the stale ref is never read', () => {
      const off = path.join(base, 'offline');
      git(base, 'clone', '-q', origin, off);
      git(off, 'remote', 'set-url', 'origin', path.join(base, 'no-such-remote.git'));
      const r = run(off, ['Thurgood']);
      expect(r.status).toBe(0);
      expect(r.stderr).toBe('');
      expect(r.lines).toEqual(['issues-owned: unavailable (fetch of origin main failed) — continue']);
    });

    it('a fetch that hangs is killed at the timeout', () => {
      const hang = path.join(base, 'hang');
      git(base, 'clone', '-q', origin, hang);
      git(hang, 'config', 'protocol.ext.allow', 'always');
      git(hang, 'remote', 'set-url', 'origin', 'ext::sleep 30');
      const r = run(hang, ['Thurgood'], { ISSUES_OWNED_FETCH_TIMEOUT: '1' });
      expect(r.status).toBe(0);
      expect(r.lines).toEqual(['issues-owned: unavailable (fetch of origin main timed out after 1s) — continue']);
      expect(r.ms).toBeLessThan(15_000);
    });

    it('outside a git repository', () => {
      const bare = fs.mkdtempSync(path.join(os.tmpdir(), 'issues-owned-nogit-'));
      const r = run(bare, ['Thurgood'], { GIT_CEILING_DIRECTORIES: path.dirname(bare) });
      fs.rmSync(bare, { recursive: true, force: true });
      expect(r.status).toBe(0);
      expect(r.lines).toEqual(['issues-owned: unavailable (not inside a git repository) — continue']);
    });
  });

  describe('condition (ii): the run log the revisit walk counts', () => {
    it('appends one line per run, with the FIRED count and paths, and one per unavailable run', () => {
      const log = path.join(base, 'runs.log');
      run(clone, ['Thurgood'], { ISSUES_OWNED_LOG: log });
      run(clone, ['Nobody'], { ISSUES_OWNED_LOG: log });
      const rows = fs.readFileSync(log, 'utf8').trim().split('\n').map((l) => l.split('\t'));
      expect(rows).toHaveLength(2);
      expect(rows[0].slice(1)).toEqual([
        'Thurgood',
        sha.fires,
        '8',
        '3',
        '.kiro/issues/merge-fired.md .kiro/issues/path-fires.md .kiro/issues/tag-fired.md',
      ]);
      expect(rows[1][1]).toBe('Nobody');
      expect(rows[1][2]).toBe('unavailable');
    });
  });
});
