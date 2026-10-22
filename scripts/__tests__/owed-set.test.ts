/**
 * scripts/owed-set.sh — the closeout-owed query (.kiro/issues/2026-10-19-owed-set-query-over-lists-
 * in-progress-specs.md: Peter's "Yes." 2026-10-21; the contract and these falsification cases are
 * Stacy's, § "Script contract" item 7; the code is Thurgood's).
 *
 * The script is SPAWNED against throwaway git repositories built here, with dated commits. Nothing
 * reads the real repository. Every git call runs with the global and system config disabled and
 * TZ=UTC, so a developer's settings or timezone cannot move a fixture across the midnight boundary.
 *
 * What is pinned (Stacy's cases first):
 *   - each class from a throwaway repo: closed, stub, open, touch-only, candidate (a, b, c);
 *   - a same-day-earlier merge (00:00:05 on the adoption day) is not dropped (the midnight pin);
 *   - a class (b) single-PR spec appears, including one merged by a real merge commit;
 *   - a ticked-only tasks.md stays a candidate (the `open` rule reads `- [ ]` at column 0 only);
 *   - the row-sum identity: rows = n + c + o + s + t, and a/b/c split the candidates;
 *   - a non-repository and a missing adoption date exit 0 with the one `unavailable` line;
 *   - a spec closed before adoption and touched after by a feedback edit prints touch-only;
 * and around them: the adoption-date sources and their order (--adoption, --adoption-ballot, the
 * default ballot, the manifest's first commit), the ground is HEAD and not the working tree, a
 * midpoint record does not close, and a run from a subdirectory reads the same rows.
 */

import { execFileSync, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const SCRIPT = path.resolve(__dirname, '..', 'owed-set.sh');

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

const git = (cwd: string, args: string[], env: NodeJS.ProcessEnv = {}): string =>
  execFileSync('git', args, { cwd, env: { ...GIT_ENV, ...env }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const write = (root: string, rel: string, text: string): void => {
  fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
  fs.writeFileSync(path.join(root, rel), text);
};

const at = (when: string): NodeJS.ProcessEnv => ({ GIT_AUTHOR_DATE: `${when} +0000`, GIT_COMMITTER_DATE: `${when} +0000` });

/** Commit everything at `when` (UTC), returning the short SHA. */
const commit = (cwd: string, when: string, subject: string): string => {
  git(cwd, ['add', '-A']);
  git(cwd, ['commit', '-q', '--no-verify', '-m', subject], at(when));
  return git(cwd, ['rev-parse', '--short', 'HEAD']);
};

const init = (dir: string): void => {
  fs.mkdirSync(dir, { recursive: true });
  git(dir, ['init', '-q', '-b', 'main']);
};

const TICKED = '# Tasks\n\n- [x] 1. First parent\n  - [x] 1.1 A subtask\n- [x] 2. Second parent\n';

interface Run {
  status: number | null;
  stdout: string;
  stderr: string;
  lines: string[];
  rows: string[][];
  count: string;
}

const run = (cwd: string, args: string[], env: NodeJS.ProcessEnv = {}): Run => {
  const r = spawnSync('bash', [SCRIPT, ...args], { cwd, env: { ...GIT_ENV, ...env }, encoding: 'utf8', timeout: 60_000 });
  const lines = r.stdout.split('\n').filter((l) => l !== '');
  return {
    status: r.status,
    stdout: r.stdout,
    stderr: r.stderr,
    lines,
    rows: lines.slice(0, -1).map((l) => l.split('\t')),
    count: lines[lines.length - 1] ?? '',
  };
};

const rowFor = (r: Run, spec: string): string[] | undefined => r.rows.find((row) => row[1] === spec);

const COUNT =
  /^owed-set: (\d+) candidates; excluded: (\d+) closed, (\d+) open, (\d+) stub, (\d+) touch-only; classes a\/b\/c = (\d+)\/(\d+)\/(\d+); (\d+) specs without activity since (\S+); adoption (\S+) from (.+); ref ([0-9a-f]+)$/;

const UNAVAILABLE = /^owed-set: unavailable \(.+\) — continue$/;

describe('scripts/owed-set.sh', () => {
  let base: string;
  let repo: string;
  const sha: Record<string, string> = {};

  beforeAll(() => {
    base = fs.mkdtempSync(path.join(os.tmpdir(), 'owed-set-'));
    repo = path.join(base, 'consumer');
    init(repo);

    // --- before adoption (adoption day is 2026-03-10) ---
    write(repo, 'specs/old-closed-pre/tasks.md', TICKED);
    write(repo, 'specs/old-closed-pre/feedback.md', '# Feedback\n');
    write(repo, 'specs/dormant/tasks.md', TICKED);
    commit(repo, '2026-03-01 12:00:00', 'the early specs');
    write(repo, 'designerpunk.manifest.json', '{}\n');
    commit(repo, '2026-03-05 09:00:00', 'init: the manifest');
    write(repo, 'specs/late-eve/tasks.md', TICKED);
    sha.lateEve = commit(repo, '2026-03-09 23:59:59', 'a spec touched one second before the adoption day');

    // --- the adoption day, five seconds after midnight: a single-PR spec (class b) ---
    write(repo, 'specs/early-bird/tasks.md', TICKED);
    sha.earlyBird = commit(repo, '2026-03-10 00:00:05', 'Early bird (#1)');

    // --- after adoption ---
    write(repo, 'specs/closed-one/tasks.md', TICKED);
    write(repo, 'specs/closed-one/completion/claims-pass.md', '# Claims pass\n');
    commit(repo, '2026-03-11 10:00:00', 'Closed one (#2)');

    write(repo, 'specs/midpoint-only/tasks.md', TICKED);
    commit(repo, '2026-03-11 11:00:00', 'Midpoint only unit 1 (#3)');
    write(repo, 'specs/midpoint-only/completion/claims-pass-midpoint.md', '# Midpoint\n');
    sha.midpoint = commit(repo, '2026-03-12 11:00:00', 'Midpoint only unit 2 (#4)');

    write(repo, 'specs/stub-one/design-outline.md', '# Outline\n');
    write(repo, 'specs/stub-one/inbound-from-ada.md', '# Inbound\n');
    commit(repo, '2026-03-12 12:00:00', 'A charter-only spec (#5)');

    write(repo, 'specs/open-one/tasks.md', '# Tasks\n\n- [ ] 1. Not yet\n- [x] 2. Done\n  - [ ] 2.1 an unticked subtask, not a parent\n');
    commit(repo, '2026-03-12 13:00:00', 'Open one (#6)');

    write(repo, 'specs/units-a/tasks.md', `# Tasks\n\n## Declared Merge Units\n\n- U1: Task 1\n\n${TICKED.replace('# Tasks\n\n', '')}`);
    sha.unitsA = commit(repo, '2026-03-13 10:00:00', 'Units A (#7)');

    write(repo, 'specs/ticked-only/tasks.md', TICKED);
    commit(repo, '2026-03-13 11:00:00', 'Ticked only unit 1 (#8)');
    write(repo, 'specs/ticked-only/completion/task-2-completion.md', '# Task 2\n');
    sha.tickedOnly = commit(repo, '2026-03-14 11:00:00', 'Ticked only unit 2 (#9)');

    write(repo, 'specs/old-closed-pre/feedback.md', '# Feedback\n\nA later note.\n');
    sha.feedback = commit(repo, '2026-03-15 09:00:00', 'A feedback edit on a spec closed before adoption (#10)');

    write(repo, 'specs/README.md', '# Specs\n'); // a file directly in the specs dir is not a spec
    commit(repo, '2026-03-15 10:00:00', 'specs README');

    // A real merge commit: the side branch's commit is not first-parent, the merge is.
    git(repo, ['checkout', '-q', '-b', 'side']);
    write(repo, 'specs/merged-side/tasks.md', TICKED);
    commit(repo, '2026-03-16 09:00:00', 'side work');
    git(repo, ['checkout', '-q', 'main']);
    git(repo, ['merge', '-q', '--no-ff', '-m', 'Merge side (#11)', 'side'], at('2026-03-16 10:00:00'));
    sha.merge = git(repo, ['rev-parse', '--short', 'HEAD']);

    write(repo, 'docs/adopt.md', '# Adoption\n\nAdopted: 2026-03-10\n');
    write(repo, 'docs/ballot.md', '# Ballot\n\nRatified-machine: 2026-03-10\n');
    write(repo, 'docs/no-date.md', '# Nothing here\n');
    commit(repo, '2026-03-17 09:00:00', 'docs');
    sha.head = git(repo, ['rev-parse', '--short', 'HEAD']);
  });

  afterAll(() => {
    fs.rmSync(base, { recursive: true, force: true });
  });

  describe('the consumer call: --specs-dir specs --adoption docs/adopt.md', () => {
    let r: Run;
    beforeAll(() => {
      r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
    });

    it('exits 0, writes nothing to stderr, and prints TSV rows of exactly three fields', () => {
      expect(r.status).toBe(0);
      expect(r.stderr).toBe('');
      for (const row of r.rows) expect(row).toHaveLength(3);
    });

    it('closed: claims-pass.md exists', () => {
      expect(rowFor(r, 'closed-one')).toEqual(['closed', 'closed-one', 'completion/claims-pass.md present']);
    });

    it('a midpoint record does not close: the spec stays a candidate', () => {
      expect(rowFor(r, 'midpoint-only')).toEqual([
        'candidate',
        'midpoint-only',
        `unit class c; anchor ${sha.midpoint} 2026-03-12 (last first-parent touch)`,
      ]);
    });

    it('stub: no tasks.md, and the reason names the files', () => {
      expect(rowFor(r, 'stub-one')).toEqual(['stub', 'stub-one', 'no tasks.md; files: design-outline.md, inbound-from-ada.md']);
    });

    it('open: unticked parents at column 0 only, counted N of M, flagged as an assertion', () => {
      expect(rowFor(r, 'open-one')).toEqual([
        'open',
        'open-one',
        '1 of 2 parents unticked in tasks.md (a checkbox is an assertion, not a merge fact)',
      ]);
    });

    it('a spec closed before adoption and touched after by a feedback edit prints touch-only, naming that commit', () => {
      expect(rowFor(r, 'old-closed-pre')).toEqual([
        'touch-only',
        'old-closed-pre',
        `no post-adoption change to tasks.md or completion/; last touch ${sha.feedback} 2026-03-15 A feedback edit on a spec closed before adoption (#10)`,
      ]);
    });

    it('candidate (a): merge units declared in tasks.md', () => {
      expect(rowFor(r, 'units-a')).toEqual(['candidate', 'units-a', `unit class a; anchor ${sha.unitsA} 2026-03-13 (last first-parent touch)`]);
    });

    it('the midnight pin: a merge at 00:00:05 on the adoption day is not dropped, and is class (b)', () => {
      expect(rowFor(r, 'early-bird')).toEqual([
        'candidate',
        'early-bird',
        `unit class b; anchor ${sha.earlyBird} 2026-03-10 (last first-parent touch)`,
      ]);
    });

    it('class (b) from a real merge commit: the merge is the one first-parent commit', () => {
      expect(rowFor(r, 'merged-side')).toEqual(['candidate', 'merged-side', `unit class b; anchor ${sha.merge} 2026-03-16 (last first-parent touch)`]);
    });

    it('a ticked-only tasks.md stays a candidate', () => {
      expect(rowFor(r, 'ticked-only')).toEqual([
        'candidate',
        'ticked-only',
        `unit class c; anchor ${sha.tickedOnly} 2026-03-14 (last first-parent touch)`,
      ]);
    });

    it('a spec touched one second before the adoption day, an untouched spec and a file in the specs dir print no row', () => {
      for (const s of ['late-eve', 'dormant', 'README.md']) expect(rowFor(r, s)).toBeUndefined();
    });

    it('prints candidates first, then closed, open, stub, touch-only', () => {
      expect(r.rows.map((row) => row[0])).toEqual([
        ...Array(5).fill('candidate'),
        'closed',
        'open',
        'stub',
        'touch-only',
      ]);
    });

    it('the count line, and the row-sum identity', () => {
      expect(r.count).toBe(
        `owed-set: 5 candidates; excluded: 1 closed, 1 open, 1 stub, 1 touch-only; classes a/b/c = 1/2/2; 2 specs without activity since 2026-03-10; adoption 2026-03-10 from docs/adopt.md; ref ${sha.head}`,
      );
      const m = COUNT.exec(r.count)!;
      const [n, c, o, s, t, xa, xb, xc] = m.slice(1, 9).map(Number);
      expect(r.rows).toHaveLength(n + c + o + s + t);
      expect(xa + xb + xc).toBe(n);
      const by = (k: string): number => r.rows.filter((row) => row[0] === k).length;
      expect([by('candidate'), by('closed'), by('open'), by('stub'), by('touch-only')]).toEqual([n, c, o, s, t]);
      const cls = (k: string): number => r.rows.filter((row) => row[0] === 'candidate' && row[2].startsWith(`unit class ${k};`)).length;
      expect([cls('a'), cls('b'), cls('c')]).toEqual([xa, xb, xc]);
    });
  });

  describe('the adoption date: sources and their order', () => {
    it('--adoption-ballot reads Ratified-machine:', () => {
      const r = run(repo, ['--specs-dir', 'specs', '--adoption-ballot', 'docs/ballot.md']);
      expect(r.status).toBe(0);
      expect(r.count).toMatch(/; adoption 2026-03-10 from docs\/ballot\.md; ref /);
      expect(r.rows).toHaveLength(9);
    });

    it('--adoption wins over --adoption-ballot', () => {
      write(repo, '../adopt-late.md', 'Adopted: 2026-03-13\n');
      const r = run(repo, ['--specs-dir', 'specs', '--adoption', '../adopt-late.md', '--adoption-ballot', 'docs/ballot.md']);
      expect(r.count).toMatch(/; adoption 2026-03-13 from \.\.\/adopt-late\.md; ref /);
    });

    it('no adoption record: the day designerpunk.manifest.json was first committed', () => {
      const r = run(repo, ['--specs-dir', 'specs']);
      expect(r.status).toBe(0);
      expect(r.count).toMatch(/; adoption 2026-03-05 from designerpunk\.manifest\.json \(first commit\); ref /);
      expect(rowFor(r, 'late-eve')?.[0]).toBe('candidate');
    });

    it('a missing or dateless adoption record falls through to the manifest (the record is optional)', () => {
      for (const f of ['docs/missing.md', 'docs/no-date.md']) {
        const r = run(repo, ['--specs-dir', 'specs', '--adoption', f]);
        expect(r.status).toBe(0);
        expect(r.count).toMatch(/; adoption 2026-03-05 from designerpunk\.manifest\.json \(first commit\); ref /);
      }
    });

    it('this repository\'s defaults: .kiro/specs and the 127 ballot', () => {
      const tier = path.join(base, 'system');
      init(tier);
      write(tier, '.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md', '# Ballot\n\nRatified-machine: 2026-09-19\n');
      write(tier, '.kiro/specs/127-x/tasks.md', TICKED);
      const s = commit(tier, '2026-09-19 08:00:00', 'Spec 127 (#1)');
      const r = run(tier, []);
      expect(r.status).toBe(0);
      expect(r.lines).toEqual([
        `candidate\t127-x\tunit class b; anchor ${s} 2026-09-19 (last first-parent touch)`,
        `owed-set: 1 candidates; excluded: 0 closed, 0 open, 0 stub, 0 touch-only; classes a/b/c = 0/1/0; 0 specs without activity since 2026-09-19; adoption 2026-09-19 from .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md; ref ${s}`,
      ]);
    });
  });

  describe('the ground is HEAD, from anywhere in the repository', () => {
    it('an uncommitted claims-pass.md does not close a spec', () => {
      write(repo, 'specs/early-bird/completion/claims-pass.md', '# not committed\n');
      try {
        const r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
        expect(rowFor(r, 'early-bird')?.[0]).toBe('candidate');
      } finally {
        fs.rmSync(path.join(repo, 'specs/early-bird/completion'), { recursive: true, force: true });
      }
    });

    it('a run from a subdirectory with relative paths reads the same rows', () => {
      const top = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
      const sub = run(path.join(repo, 'docs'), ['--specs-dir', '../specs', '--adoption', 'adopt.md']);
      expect(sub.rows).toEqual(top.rows);
      expect(sub.count).toBe(top.count.replace('from docs/adopt.md', 'from adopt.md'));
    });
  });

  describe('a read, never a gate: one line, exit 0', () => {
    it('outside a git repository', () => {
      const none = fs.mkdtempSync(path.join(os.tmpdir(), 'owed-set-nogit-'));
      fs.mkdirSync(path.join(none, '.kiro/specs'), { recursive: true });
      const r = run(none, [], { GIT_CEILING_DIRECTORIES: path.dirname(none) });
      fs.rmSync(none, { recursive: true, force: true });
      expect(r.status).toBe(0);
      expect(r.stderr).toBe('');
      expect(r.lines).toEqual(['owed-set: unavailable (not inside a git repository) — continue']);
    });

    it('no adoption date resolved: no record, no ballot, no committed manifest', () => {
      const nodate = path.join(base, 'nodate');
      init(nodate);
      write(nodate, 'specs/a/tasks.md', TICKED);
      commit(nodate, '2026-03-11 10:00:00', 'a spec');
      const r = run(nodate, ['--specs-dir', 'specs', '--adoption', 'docs/claims-pass-adoption.md']);
      expect(r.status).toBe(0);
      expect(r.stderr).toBe('');
      expect(r.lines).toEqual([
        'owed-set: unavailable (no adoption date: docs/claims-pass-adoption.md gives no Adopted: date; designerpunk.manifest.json is not committed on the first-parent line) — continue',
      ]);
    });

    it('a missing specs directory, and an unknown argument', () => {
      const a = run(repo, ['--specs-dir', 'nowhere']);
      expect(a.status).toBe(0);
      expect(a.lines).toEqual(['owed-set: unavailable (no specs directory at nowhere) — continue']);
      const b = run(repo, ['--bogus']);
      expect(b.status).toBe(0);
      expect(b.lines).toHaveLength(1);
      expect(b.lines[0]).toMatch(UNAVAILABLE);
    });
  });
});
