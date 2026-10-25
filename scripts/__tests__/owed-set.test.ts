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
 *   - a same-day-earlier merge (00:00:05 on the adoption day) is not dropped (once the midnight pin,
 *     now the date filter that replaced `git log --since`);
 *   - a class (b) single-PR spec appears, including one merged by a real merge commit;
 *   - a ticked-only tasks.md stays a candidate (the `open` rule reads `- [ ]` at column 0 only);
 *   - the row-sum identity: rows = n + c + o + s + t, and a/b/c split the candidates;
 *   - a non-repository and a missing adoption date exit 0 with the one `unavailable` line;
 *   - a spec closed before adoption and touched after by a feedback edit prints touch-only;
 *   - the anchor is the CLOSING COMMIT of tasks.md, not the last touch (.kiro/issues/2026-10-25-owed-
 *     set-anchor-proxy-false-positives.md, fork (A), Peter 2026-10-25): Stacy's 19 cases in the
 *     three describe blocks after the first group, F-122 … F-offset, with Thurgood's reason strings;
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
    write(repo, 'specs/closed-elsewhere/tasks.md', TICKED);
    sha.early = commit(repo, '2026-03-01 12:00:00', 'the early specs');
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
    sha.midpoint1 = commit(repo, '2026-03-11 11:00:00', 'Midpoint only unit 1 (#3)');
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
    sha.tickedOnly1 = commit(repo, '2026-03-13 11:00:00', 'Ticked only unit 1 (#8)');
    write(repo, 'specs/ticked-only/completion/task-2-completion.md', '# Task 2\n');
    sha.tickedOnly = commit(repo, '2026-03-14 11:00:00', 'Ticked only unit 2 (#9)');

    write(repo, 'specs/old-closed-pre/feedback.md', '# Feedback\n\nA later note.\n');
    sha.feedback = commit(repo, '2026-03-15 09:00:00', 'A feedback edit on a spec closed before adoption (#10)');

    // 122's shape (2026-10-22): a spec closed before adoption whose only later touch is another PR
    // adding a file under its completion/. Once the proxy's known limit (it printed candidate); the
    // closing-commit anchor prints touch-only.
    write(repo, 'specs/closed-elsewhere/completion/ruling-from-another-spec.md', '# Ruling\n');
    sha.elsewhere = commit(repo, '2026-03-15 09:30:00', 'Another spec adds a ruling doc under it (#12)');

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
        `unit class c; anchor ${sha.midpoint1} 2026-03-11 (closing commit: last unticked parent ticked)`,
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
        `closing commit ${sha.early} 2026-03-01 predates adoption (last unticked parent ticked); last touch ${sha.feedback} 2026-03-15 A feedback edit on a spec closed before adoption (#10)`,
      ]);
    });

    it('candidate (a): merge units declared in tasks.md', () => {
      expect(rowFor(r, 'units-a')).toEqual(['candidate', 'units-a', `unit class a; anchor ${sha.unitsA} 2026-03-13 (closing commit: last unticked parent ticked)`]);
    });

    it('the adoption day from 00:00: a merge at 00:00:05 on the adoption day is not dropped, and is class (b)', () => {
      expect(rowFor(r, 'early-bird')).toEqual([
        'candidate',
        'early-bird',
        `unit class b; anchor ${sha.earlyBird} 2026-03-10 (closing commit: last unticked parent ticked)`,
      ]);
    });

    it('class (b) from a real merge commit: the merge is the one first-parent commit', () => {
      expect(rowFor(r, 'merged-side')).toEqual(['candidate', 'merged-side', `unit class b; anchor ${sha.merge} 2026-03-16 (closing commit: last unticked parent ticked)`]);
    });

    it('a ticked-only tasks.md stays a candidate, anchored on the unit that ticked it, not the later completion doc', () => {
      expect(rowFor(r, 'ticked-only')).toEqual([
        'candidate',
        'ticked-only',
        `unit class c; anchor ${sha.tickedOnly1} 2026-03-13 (closing commit: last unticked parent ticked)`,
      ]);
    });

    it('the retired known limit, inverted (F-122\'s shape): another spec adding a file under completion/ leaves a pre-adoption-closed spec touch-only', () => {
      expect(rowFor(r, 'closed-elsewhere')).toEqual([
        'touch-only',
        'closed-elsewhere',
        `closing commit ${sha.early} 2026-03-01 predates adoption (last unticked parent ticked); last touch ${sha.elsewhere} 2026-03-15 Another spec adds a ruling doc under it (#12)`,
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
        'touch-only',
      ]);
    });

    it('the count line, and the row-sum identity', () => {
      expect(r.count).toBe(
        `owed-set: 5 candidates; excluded: 1 closed, 1 open, 1 stub, 2 touch-only; classes a/b/c = 1/2/2; 2 specs without activity since 2026-03-10; adoption 2026-03-10 from docs/adopt.md; ref ${sha.head}`,
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
      expect(r.rows).toHaveLength(10);
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
        `candidate\t127-x\tunit class b; anchor ${s} 2026-09-19 (closing commit: last unticked parent ticked)`,
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

// --- Line R (16.1.0 walk): the definition, not the proxy. Cases specified by Stacy, 2026-10-25
// (scripts/__tests__/__fixtures__/owed-set/owed-set-fixtures-stacy.md); reason strings are Thurgood's. ---

const UNT = '# Tasks\n\n- [ ] 1. First parent\n- [ ] 2. Second parent\n';
const T2 = '# Tasks\n\n- [x] 1. First parent\n- [x] 2. Second parent\n';
const UNITS = '## Declared Merge Units\n\n- U1: Tasks 1-2\n\n';
const at2 = (when: string, offset: string): NodeJS.ProcessEnv => ({ GIT_AUTHOR_DATE: `${when} ${offset}`, GIT_COMMITTER_DATE: `${when} ${offset}` });

describe('scripts/owed-set.sh: the definition, not the proxy (Line R; Stacy\'s falsification cases)', () => {
  let base: string;
  let repo: string;
  const sha: Record<string, string> = {};
  let r: Run;

  beforeAll(() => {
    base = fs.mkdtempSync(path.join(os.tmpdir(), 'owed-set-def-'));
    repo = path.join(base, 'consumer');
    init(repo);

    // --- before adoption (the adoption day is 2026-03-10, from docs/adopt.md) ---
    write(repo, 'docs/adopt.md', '# Adoption\n\nAdopted: 2026-03-10\n');
    write(repo, 'specs/f122/tasks.md', `# Tasks\n\n${UNITS}- [x] 1. Everything\n`);          // F-122: closed before adoption
    write(repo, 'specs/f023/tasks.md', T2);                                                    // F-023: closed before adoption
    write(repo, 'specs/f023/design.md', '# Design\n');
    write(repo, 'specs/f023/completion/task-2-parent-completion.md', '# Task 2\n');
    write(repo, 'specs/f-tasks-edit/tasks.md', T2);
    write(repo, 'specs/f-reopen/tasks.md', T2);
    write(repo, 'specs/f-late-doc/tasks.md', T2);
    write(repo, 'specs/f-nocheck/tasks.md', '# Tasks\n\nProse only, no checkboxes.\n');
    write(repo, 'specs/f-dormant/tasks.md', T2);
    sha.p1 = commit(repo, '2026-03-01 12:00:00', 'the early specs, closed before adoption');
    write(repo, 'specs/f-ticked/tasks.md', UNT);
    write(repo, 'specs/f-pass/tasks.md', UNT);
    write(repo, 'specs/f-partial/tasks.md', UNT);
    write(repo, 'specs/f-partial-done/tasks.md', UNT);
    write(repo, 'specs/f-boundary/tasks.md', UNT);
    write(repo, 'specs/f-noff/tasks.md', UNT);
    write(repo, 'specs/f-units/tasks.md', `# Tasks\n\n${UNITS}- [ ] 1. First parent\n- [ ] 2. Second parent\n`);
    write(repo, 'specs/f-inprogress/tasks.md', '# Tasks\n\n- [ ] 1. First parent\n- [x] 2. Second parent\n');
    write(repo, 'specs/f-reopen-open/tasks.md', T2);
    write(repo, 'specs/f-eve/tasks.md', UNT);
    commit(repo, '2026-03-02 12:00:00', 'the specs still open before adoption');
    write(repo, 'specs/f-eve/tasks.md', T2);
    sha.eve = commit(repo, '2026-03-09 23:59:59', 'f-eve: its last parent ticked one second before the adoption day');

    // --- after adoption ---
    write(repo, 'specs/f-boundary/tasks.md', T2);
    sha.boundary = commit(repo, '2026-03-10 00:00:05', 'f-boundary: last parent ticked five seconds into the adoption day (#1)');

    write(repo, 'specs/f122/completion/ruling-from-another-spec.md', '# A ruling another spec\'s PR filed here\n');
    sha.f122 = commit(repo, '2026-03-11 10:00:00', 'Another spec files a ruling under f122/completion (#2)');          // F-122

    write(repo, 'specs/f023/design.md', '# Design\n\nSuperseded by a later spec.\n');
    write(repo, 'specs/f023/completion/task-2-parent-completion.md', '# Task 2\n\nCorrected.\n');
    sha.f023 = commit(repo, '2026-03-12 10:00:00', 'A supersession note and a completion-doc correction on f023 (#3)');   // F-023

    write(repo, 'specs/f-tasks-edit/tasks.md', `${T2}\nNote: wording clarified.\n`);
    sha.tasksEdit = commit(repo, '2026-03-12 11:00:00', 'f-tasks-edit: a prose edit to tasks.md, no checkbox moved (#4)');

    write(repo, 'specs/f-eve/feedback.md', '# Feedback\n');
    sha.eveFeedback = commit(repo, '2026-03-12 12:00:00', 'f-eve: a feedback note (#5)');

    write(repo, 'specs/f-reopen/tasks.md', `${T2}- [ ] 3. A new parent\n`);
    write(repo, 'specs/f-reopen-open/tasks.md', `${T2}- [ ] 3. A new parent\n`);
    sha.reopen = commit(repo, '2026-03-12 13:00:00', 'Two closed specs gain a new unticked parent (#6)');

    write(repo, 'specs/f-inprogress/tasks.md', '# Tasks\n\n- [-] 1. First parent\n- [x] 2. Second parent\n');
    write(repo, 'specs/f-nocheck/feedback.md', '# Feedback\n');
    sha.inprogress = commit(repo, '2026-03-12 14:00:00', 'f-inprogress: parent 1 marked in progress; f-nocheck: feedback (#7)');

    write(repo, 'specs/f-late-doc/completion/task-3-completion.md', '# Task 3\n');
    sha.lateDoc = commit(repo, '2026-03-13 10:00:00', 'f-late-doc: a parent completion doc added after a pre-adoption closure (#8)');

    write(repo, 'specs/f-ticked/tasks.md', T2);
    sha.ticked = commit(repo, '2026-03-14 10:00:00', 'f-ticked: both parents ticked (#9)');
    write(repo, 'specs/f-pass/tasks.md', T2);
    write(repo, 'specs/f-pass/completion/claims-pass.md', '# Claims pass\n');
    commit(repo, '2026-03-14 11:00:00', 'f-pass: both parents ticked, claims pass filed (#10)');
    write(repo, 'specs/f-partial/tasks.md', '# Tasks\n\n- [x] 1. First parent\n- [ ] 2. Second parent\n');
    write(repo, 'specs/f-partial/completion/task-1-completion.md', '# Task 1\n');
    commit(repo, '2026-03-14 12:00:00', 'f-partial: a non-final unit merges, parent 1 ticked (#11)');
    write(repo, 'specs/f-partial-done/tasks.md', '# Tasks\n\n- [x] 1. First parent\n- [ ] 2. Second parent\n');
    sha.partialDone1 = commit(repo, '2026-03-14 13:00:00', 'f-partial-done: parent 1 ticked (#12)');
    write(repo, 'specs/f-reopen/tasks.md', `${T2}- [x] 3. A new parent\n`);
    sha.reopenDone = commit(repo, '2026-03-14 14:00:00', 'f-reopen: the new parent ticked (#13)');
    write(repo, 'specs/f-units/tasks.md', `# Tasks\n\n${UNITS}- [x] 1. First parent\n- [x] 2. Second parent\n`);
    sha.units = commit(repo, '2026-03-14 15:00:00', 'f-units: both parents ticked (#14)');

    write(repo, 'specs/f-ticked/design.md', '# Design\n\nA post-closure note.\n');
    commit(repo, '2026-03-15 10:00:00', 'f-ticked: a post-closure design note (#15)');
    write(repo, 'specs/f-partial-done/tasks.md', T2);
    sha.partialDone2 = commit(repo, '2026-03-16 10:00:00', 'f-partial-done: the final parent ticked (#16)');
    write(repo, 'specs/f-partial-done/feedback.md', '# Feedback\n');
    commit(repo, '2026-03-17 10:00:00', 'f-partial-done: feedback after closure (#17)');

    // F-no-ff: a long-lived side branch ticks the spec on 2026-03-02 and merges by a true merge commit
    // on 2026-03-18. The merge is the one first-parent commit; the tick dates inside the branch do not count.
    git(repo, ['checkout', '-q', '-b', 'side']);
    write(repo, 'specs/f-noff/tasks.md', '# Tasks\n\n- [x] 1. First parent\n- [ ] 2. Second parent\n');
    commit(repo, '2026-03-02 13:00:00', 'side: parent 1');
    write(repo, 'specs/f-noff/tasks.md', T2);
    commit(repo, '2026-03-02 14:00:00', 'side: parent 2');
    git(repo, ['checkout', '-q', 'main']);
    git(repo, ['merge', '-q', '--no-ff', '-m', 'Merge f-noff (#18)', 'side'], at('2026-03-18 10:00:00'));
    sha.noff = git(repo, ['rev-parse', '--short', 'HEAD']);
    r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
  });

  afterAll(() => fs.rmSync(base, { recursive: true, force: true }));

  const touch = (s: string, closing: string, closingDate: string, last: string, lastDate: string, subject: string): string[] => [
    'touch-only', s, `closing commit ${closing} ${closingDate} predates adoption (last unticked parent ticked); last touch ${last} ${lastDate} ${subject}`,
  ];

  it('exits 0, three TSV fields per row, nothing on stderr', () => {
    expect(r.status).toBe(0);
    expect(r.stderr).toBe('');
    for (const row of r.rows) expect(row).toHaveLength(3);
  });

  it('F-122: a pre-adoption-closed spec whose only later touch is a ruling doc filed under its completion/ prints touch-only', () => {
    expect(rowFor(r, 'f122')).toEqual(touch('f122', sha.p1, '2026-03-01', sha.f122, '2026-03-11', 'Another spec files a ruling under f122/completion (#2)'));
  });

  it('F-023: a pre-adoption-closed spec whose design.md and completion doc are edited later prints touch-only', () => {
    expect(rowFor(r, 'f023')).toEqual(touch('f023', sha.p1, '2026-03-01', sha.f023, '2026-03-12', 'A supersession note and a completion-doc correction on f023 (#3)'));
  });

  it('F-tasks-edit: a post-adoption edit to tasks.md that moves no checkbox is not a closing (the retired rule called it a candidate)', () => {
    expect(rowFor(r, 'f-tasks-edit')).toEqual(touch('f-tasks-edit', sha.p1, '2026-03-01', sha.tasksEdit, '2026-03-12', 'f-tasks-edit: a prose edit to tasks.md, no checkbox moved (#4)'));
  });

  it('F-ticked: the post-adoption merge that ticked the last parent is the anchor, and a later post-closure touch does not move it', () => {
    expect(rowFor(r, 'f-ticked')).toEqual(['candidate', 'f-ticked', `unit class c; anchor ${sha.ticked} 2026-03-14 (closing commit: last unticked parent ticked)`]);
  });

  it('F-ticked-with-pass: the same merge, with completion/claims-pass.md present, is closed', () => {
    expect(rowFor(r, 'f-pass')).toEqual(['closed', 'f-pass', 'completion/claims-pass.md present']);
  });

  it('F-partial: a post-adoption merge that ticks a non-final parent leaves the spec open, never a candidate', () => {
    expect(rowFor(r, 'f-partial')).toEqual(['open', 'f-partial', '1 of 2 parents unticked in tasks.md (a checkbox is an assertion, not a merge fact)']);
  });

  it('F-partial-done: the anchor is the tick of the LAST parent, not the first tick and not the last touch', () => {
    expect(rowFor(r, 'f-partial-done')).toEqual(['candidate', 'f-partial-done', `unit class c; anchor ${sha.partialDone2} 2026-03-16 (closing commit: last unticked parent ticked)`]);
  });

  it('F-boundary: the closing at 00:00:05 on the adoption day is a candidate; one second before the day is touch-only', () => {
    expect(rowFor(r, 'f-boundary')).toEqual(['candidate', 'f-boundary', `unit class b; anchor ${sha.boundary} 2026-03-10 (closing commit: last unticked parent ticked)`]);
    expect(rowFor(r, 'f-eve')).toEqual(touch('f-eve', sha.eve, '2026-03-09', sha.eveFeedback, '2026-03-12', 'f-eve: a feedback note (#5)'));
  });

  it('F-no-ff: a true merge commit is the closing; the tick dates inside the side branch do not count', () => {
    expect(rowFor(r, 'f-noff')).toEqual(['candidate', 'f-noff', `unit class b; anchor ${sha.noff} 2026-03-18 (closing commit: last unticked parent ticked)`]);
  });

  it('F-reopen: a closed spec that gains an unticked parent is open; once that parent is ticked it is a candidate anchored there', () => {
    expect(rowFor(r, 'f-reopen-open')).toEqual(['open', 'f-reopen-open', '1 of 3 parents unticked in tasks.md (a checkbox is an assertion, not a merge fact)']);
    expect(rowFor(r, 'f-reopen')).toEqual(['candidate', 'f-reopen', `unit class c; anchor ${sha.reopenDone} 2026-03-14 (closing commit: last unticked parent ticked)`]);
  });

  it('F-units: a class (a) spec anchors on the closing too', () => {
    expect(rowFor(r, 'f-units')).toEqual(['candidate', 'f-units', `unit class a; anchor ${sha.units} 2026-03-14 (closing commit: last unticked parent ticked)`]);
  });

  it('F-undecidable: an in-progress parent, or no checkbox at all, falls back to the retired path rule, labeled (never a wrong exclusion)', () => {
    expect(rowFor(r, 'f-inprogress')).toEqual([
      'candidate',
      'f-inprogress',
      `unit class b; anchor ${sha.inprogress} 2026-03-12 (last first-parent touch; closure undecidable: a parent in tasks.md is marked neither [ ] nor [x])`,
    ]);
    expect(rowFor(r, 'f-nocheck')).toEqual([
      'touch-only',
      'f-nocheck',
      `no post-adoption change to tasks.md or completion/ (closure undecidable: no checkbox parents in tasks.md); last touch ${sha.inprogress} 2026-03-12 f-inprogress: parent 1 marked in progress; f-nocheck: feedback (#7)`,
    ]);
  });

  it('F-late-doc (the belt, Q2 answered in): a completion/task-* file ADDED after a pre-adoption closure keeps the spec a candidate', () => {
    expect(rowFor(r, 'f-late-doc')).toEqual([
      'candidate',
      'f-late-doc',
      `unit class b; anchor ${sha.lateDoc} 2026-03-13 (a completion/task-* file added after the pre-adoption closing commit ${sha.p1} 2026-03-01)`,
    ]);
  });

  it('prints candidates first, then closed, open, stub, touch-only; specs in name order within each class', () => {
    expect(r.rows.map((row) => `${row[0]} ${row[1]}`)).toEqual([
      'candidate f-boundary', 'candidate f-inprogress', 'candidate f-late-doc', 'candidate f-noff',
      'candidate f-partial-done', 'candidate f-reopen', 'candidate f-ticked', 'candidate f-units',
      'closed f-pass',
      'open f-partial', 'open f-reopen-open',
      'touch-only f-eve', 'touch-only f-nocheck', 'touch-only f-tasks-edit', 'touch-only f023', 'touch-only f122',
    ]);
  });

  it('the count line, and the row-sum identity', () => {
    expect(r.count).toBe(
      `owed-set: 8 candidates; excluded: 1 closed, 2 open, 0 stub, 5 touch-only; classes a/b/c = 1/4/3; 1 specs without activity since 2026-03-10; adoption 2026-03-10 from docs/adopt.md; ref ${sha.noff}`,
    );
    const [n, c, o, s, t, xa, xb, xc] = COUNT.exec(r.count)!.slice(1, 9).map(Number);
    expect(r.rows).toHaveLength(n + c + o + s + t);
    expect(xa + xb + xc).toBe(n);
  });
});

describe('scripts/owed-set.sh: the first-parent line is not trusted to be date-ordered (F-backdated)', () => {
  let base: string;
  let repo: string;
  const sha: Record<string, string> = {};

  beforeAll(() => {
    base = fs.mkdtempSync(path.join(os.tmpdir(), 'owed-set-bd-'));
    repo = path.join(base, 'consumer');
    init(repo);
    write(repo, 'docs/adopt.md', 'Adopted: 2026-03-10\n');
    write(repo, 'specs/a/tasks.md', UNT);
    write(repo, 'specs/c/tasks.md', UNT);
    commit(repo, '2026-03-02 12:00:00', 'two specs open before adoption');
    write(repo, 'specs/a/tasks.md', T2);
    sha.a = commit(repo, '2026-03-12 10:00:00', 'a: the last parent ticked (#1)');
    // one first-parent commit carrying an old committer date (a rebase that kept an old date, a clock error)
    write(repo, 'docs/note.md', '# A note\n');
    commit(repo, '2026-03-01 09:00:00', 'a commit with a back-dated committer date');
    write(repo, 'specs/b/tasks.md', T2);
    sha.b = commit(repo, '2026-03-13 10:00:00', 'b: a single-PR spec (#2)');
    // the closing commit itself back-dated: the predicate says "dated on or after", so it is outside the set
    write(repo, 'specs/c/tasks.md', T2);
    commit(repo, '2026-03-01 10:00:00', 'c: closed by a commit carrying a pre-adoption committer date (#3)');
  });

  afterAll(() => fs.rmSync(base, { recursive: true, force: true }));

  it('F-backdated: a spec closed below a back-dated first-parent commit is still listed (the retired --since walk dropped it)', () => {
    const r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
    expect(r.status).toBe(0);
    expect(r.rows).toEqual([
      ['candidate', 'a', `unit class b; anchor ${sha.a} 2026-03-12 (closing commit: last unticked parent ticked)`],
      ['candidate', 'b', `unit class b; anchor ${sha.b} 2026-03-13 (closing commit: last unticked parent ticked)`],
    ]);
  });

  it('known limit, pinned: a closing commit that itself carries a pre-adoption committer date prints no row and counts under "specs without activity"', () => {
    const r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
    expect(rowFor(r, 'c')).toBeUndefined();
    expect(r.count).toMatch(/^owed-set: 2 candidates; excluded: 0 closed, 0 open, 0 stub, 0 touch-only; classes a\/b\/c = 0\/2\/0; 1 specs without activity since 2026-03-10; /);
  });
});

describe('scripts/owed-set.sh: "dated on or after" is the recorded day OR the UTC day (F-offset; Q1 answered union)', () => {
  it('a commit recorded 2026-03-09 23:30 -0500 (04:30 UTC on the 10th) is post-adoption by its UTC day; one recorded 2026-03-10 00:30 +1000 (14:30 UTC on the 9th) is post-adoption by its recorded day', () => {
    const base = fs.mkdtempSync(path.join(os.tmpdir(), 'owed-set-clock-'));
    try {
      const repo = path.join(base, 'consumer');
      init(repo);
      write(repo, 'docs/adopt.md', 'Adopted: 2026-03-10\n');
      write(repo, 'specs/west/tasks.md', UNT);
      write(repo, 'specs/east/tasks.md', UNT);
      commit(repo, '2026-03-02 12:00:00', 'two open specs');
      write(repo, 'specs/west/tasks.md', T2);
      git(repo, ['add', '-A']);
      const west = (git(repo, ['commit', '-q', '--no-verify', '-m', 'west: closed late on the 9th, west of UTC'], at2('2026-03-09 23:30:00', '-0500')), git(repo, ['rev-parse', '--short', 'HEAD']));
      write(repo, 'specs/west/feedback.md', '# Feedback\n');
      commit(repo, '2026-03-12 10:00:00', 'west: a later note');
      write(repo, 'specs/east/tasks.md', T2);
      git(repo, ['add', '-A']);
      git(repo, ['commit', '-q', '--no-verify', '-m', 'east: closed early on the 10th, east of UTC'], at2('2026-03-10 00:30:00', '+1000'));
      const east = git(repo, ['rev-parse', '--short', 'HEAD']);
      const r = run(repo, ['--specs-dir', 'specs', '--adoption', 'docs/adopt.md']);
      expect(rowFor(r, 'east')).toEqual(['candidate', 'east', `unit class b; anchor ${east} 2026-03-10 (closing commit: last unticked parent ticked)`]);
      expect(rowFor(r, 'west')).toEqual(['candidate', 'west', `unit class c; anchor ${west} 2026-03-09 (UTC 2026-03-10) (closing commit: last unticked parent ticked)`]);
    } finally {
      fs.rmSync(base, { recursive: true, force: true });
    }
  });
});
