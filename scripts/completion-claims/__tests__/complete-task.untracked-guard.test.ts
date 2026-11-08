/**
 * Exercises `.kiro/hooks/complete-task.sh` end to end (issue
 * `.kiro/issues/2026-11-06-complete-task-stages-untracked-paths-outside-parent.md`, criterion): the
 * tool is SPAWNED against throwaway git repositories (a bare origin and a clone), with a stub `gh`
 * first on PATH. Nothing reads or writes the real repository, and nothing leaves the machine.
 *
 * Modules exercised: `.kiro/hooks/complete-task.sh` and `scripts/completion-claims/untracked-guard.ts`.
 *
 * What is pinned:
 *   - the L-9 instance: an untracked log under `.claude/scratch-backup/` beside a parent's docs is
 *     refused, before anything is staged, committed or pushed (the refusal text is asserted);
 *   - a parent whose NEW Primary Artifacts are untracked (a bullet naming three paths, the case the
 *     parity parser's first-path-only extraction loses) is committed without `--add`;
 *   - `--add` requires a reason, admits exactly the named path, and writes the trailer;
 *   - subtask and unit-member messages that carry no `Complete:` find their parent (`Task 12.2:`);
 *   - non-spec work (`fix/` branch) is strict;
 *   - an archive move made with plain `mv` pairs with its tracked deletion.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const REAL_ROOT = path.resolve(__dirname, '../../..');
const TOOL = path.join(REAL_ROOT, '.kiro/hooks/complete-task.sh');
const GUARD = path.join(REAL_ROOT, 'scripts/completion-claims/untracked-guard.ts');

function findTsx(): string {
  let dir = REAL_ROOT;
  for (let i = 0; i < 6; i++) {
    const c = path.join(dir, 'node_modules/.bin/tsx');
    if (fs.existsSync(c)) return c;
    dir = path.dirname(dir);
  }
  throw new Error('tsx not found');
}
const TSX = findTsx();

const GIT_ENV = {
  GIT_CONFIG_GLOBAL: '/dev/null',
  GIT_CONFIG_SYSTEM: '/dev/null',
  GIT_AUTHOR_NAME: 't',
  GIT_AUTHOR_EMAIL: 't@example.com',
  GIT_COMMITTER_NAME: 't',
  GIT_COMMITTER_EMAIL: 't@example.com',
};

function git(cwd: string, ...args: string[]): string {
  const r = spawnSync('git', args, { cwd, env: { ...process.env, ...GIT_ENV }, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${r.stderr}`);
  return r.stdout.trim();
}

const TASKS_MD = `# Tasks

- [ ] 1. First parent
  **Success Criteria:** none — fixture
  **Primary Artifacts:**
  - \`src/feature.ts\`, \`src/feature.test.ts\` and \`docs/feature.md\` (a bullet that names three paths)
  - \`pkg/generated/**\`
- [ ] 2. Second parent
  **Success Criteria:** none — fixture
  **Primary Artifacts:**
  - \`src/other.ts\`
`;

interface Fx {
  work: string;
  origin: string;
  bin: string;
}

const made: string[] = [];

function makeFx(branch = 'task/900-1-demo'): Fx {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ct-guard-'));
  made.push(root);
  const origin = path.join(root, 'origin.git');
  const work = path.join(root, 'work');
  const bin = path.join(root, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(
    path.join(bin, 'gh'),
    `#!/bin/bash
case "$1 $2" in
  "auth status") exit 0 ;;
  "pr list") exit 0 ;;
  "pr create") printf '%s\\0' "$@" > "$(dirname "$0")/pr-create.args"; echo "https://example.invalid/pull/7"; exit 0 ;;
esac
if [[ "$1" == api ]]; then
  case "$*" in *check-runs*) echo 3 ;; *) echo true ;; esac
  exit 0
fi
exit 0
`,
    { mode: 0o755 },
  );
  git(root, 'init', '--bare', '-b', 'main', origin);
  git(root, 'clone', origin, work);
  git(work, 'switch', '-c', 'main');
  fs.mkdirSync(path.join(work, '.kiro/hooks'), { recursive: true });
  fs.copyFileSync(TOOL, path.join(work, '.kiro/hooks/complete-task.sh'));
  fs.mkdirSync(path.join(work, '.kiro/specs/900-demo/completion'), { recursive: true });
  fs.writeFileSync(path.join(work, '.kiro/specs/900-demo/tasks.md'), TASKS_MD);
  fs.mkdirSync(path.join(work, '.kiro/issues'), { recursive: true });
  fs.writeFileSync(path.join(work, '.kiro/issues/2026-01-01-old.md'), '# old\n');
  fs.writeFileSync(path.join(work, '.gitignore'), 'ignored/\n');
  git(work, 'add', '-A');
  git(work, 'commit', '-m', 'seed');
  git(work, 'push', '-u', 'origin', 'main');
  git(work, 'switch', '-c', branch);
  return { work, origin, bin };
}

function write(fx: Fx, rel: string, body = 'x\n'): void {
  const p = path.join(fx.work, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, body);
}

function runTool(fx: Fx, ...args: string[]) {
  const r = spawnSync('bash', [path.join(fx.work, '.kiro/hooks/complete-task.sh'), ...args], {
    cwd: fx.work,
    env: {
      ...process.env,
      ...GIT_ENV,
      PATH: `${fx.bin}:${process.env.PATH}`,
      GH_TOKEN: 'stub-token',
      CT_GUARD_TSX: TSX,
      CT_GUARD_SCRIPT: GUARD,
    },
    encoding: 'utf8',
    timeout: 90_000,
  });
  return { status: r.status, out: `${r.stdout}\n${r.stderr}` };
}

const headSubject = (fx: Fx) => git(fx.work, 'log', '-1', '--format=%s');
const headFiles = (fx: Fx) => git(fx.work, 'show', '--name-only', '--format=', 'HEAD').split('\n').filter(Boolean).sort();
const commitCount = (fx: Fx) => Number(git(fx.work, 'rev-list', '--count', 'main..HEAD'));

afterAll(() => {
  for (const d of made) fs.rmSync(d, { recursive: true, force: true });
});

describe('complete-task.sh untracked-paths guard', () => {
  it('refuses the L-9 instance: an untracked scratch log beside the parent\'s docs', () => {
    const fx = makeFx();
    write(fx, '.kiro/specs/900-demo/completion/task-1-completion.md');
    write(fx, '.claude/scratch-backup/q5-data-work/run-1.log', '/Users/someone/home/path\n');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: first subtask (900)');
    expect(r.status).not.toBe(0);
    expect(r.out).toContain('refusing to stage 1 untracked path(s) outside the allowed set. Nothing was staged, committed, or pushed.');
    expect(r.out).toContain('- .claude/scratch-backup/q5-data-work/run-1.log');
    expect(r.out).toContain('parent 1 of 900-demo');
    expect(commitCount(fx)).toBe(0);
    expect(git(fx.work, 'diff', '--cached', '--name-only')).toBe('');
  });

  it('refuses in parent mode too, before any commit or PR', () => {
    const fx = makeFx();
    write(fx, '.kiro/specs/900-demo/completion/task-1-completion.md');
    write(fx, '.claude/scratch-backup/run.log');
    const r = runTool(fx, 'Task 1 Complete: Demo (900)');
    expect(r.status).not.toBe(0);
    expect(r.out).toContain('- .claude/scratch-backup/run.log');
    expect(commitCount(fx)).toBe(0);
  });

  it('commits a parent\'s own untracked Primary Artifacts without --add, including every path of a multi-path bullet', () => {
    const fx = makeFx();
    write(fx, 'src/feature.ts');
    write(fx, 'src/feature.test.ts'); // second path of the bullet: the parity parser keeps only the first
    write(fx, 'docs/feature.md'); // third path
    write(fx, 'pkg/generated/a/b.ts'); // glob
    write(fx, '.kiro/specs/900-demo/completion/task-1-completion.md');
    write(fx, '.kiro/specs/900-demo/completion/task-1-1-completion.md');
    write(fx, '.kiro/specs/900-demo/completion/task-1-instruments.md');
    write(fx, 'docs/specs/900-demo/task-1-summary.md');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: add the feature (900)');
    expect(r.status).toBe(0);
    expect(headSubject(fx)).toBe('Task 1.1: add the feature (900)');
    expect(headFiles(fx)).toEqual(
      [
        '.kiro/specs/900-demo/completion/task-1-1-completion.md',
        '.kiro/specs/900-demo/completion/task-1-completion.md',
        '.kiro/specs/900-demo/completion/task-1-instruments.md',
        'docs/feature.md',
        'docs/specs/900-demo/task-1-summary.md',
        'pkg/generated/a/b.ts',
        'src/feature.test.ts',
        'src/feature.ts',
      ].sort(),
    );
    expect(git(fx.work, 'log', '-1', '--format=%B')).not.toContain('Added-outside-list');
  });

  it('finds the parent of a unit-member message with no "Complete:" and of a "Task N instruments block" message', () => {
    const fx = makeFx();
    write(fx, '.kiro/specs/900-demo/completion/task-2-instruments.md');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 2 instruments block (900)');
    expect(r.status).toBe(0);
  });

  it('refuses a path that belongs to a DIFFERENT parent (parent 2\'s file under parent 1)', () => {
    const fx = makeFx();
    write(fx, 'src/other.ts');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: wrong parent (900)');
    expect(r.status).not.toBe(0);
    expect(r.out).toContain('- src/other.ts');
  });

  it('--add admits exactly the named path, requires a reason, and writes the trailer', () => {
    const fx = makeFx();
    write(fx, 'extra/one.txt');
    write(fx, 'extra/two.txt');

    const noReason = runTool(fx, '--subtask', '--no-ci', '--add', 'extra/one.txt', 'Task 1.1: x (900)');
    expect(noReason.status).not.toBe(0);
    expect(noReason.out).toContain('has no --reason');
    expect(commitCount(fx)).toBe(0);

    const onlyOne = runTool(fx, '--subtask', '--no-ci', '--add', 'extra/one.txt', '--reason', 'fixture for the demo', 'Task 1.1: x (900)');
    expect(onlyOne.status).not.toBe(0); // extra/two.txt is still outside
    expect(onlyOne.out).toContain('- extra/two.txt');
    expect(onlyOne.out).not.toContain('- extra/one.txt');
    expect(commitCount(fx)).toBe(0);

    const both = runTool(
      fx, '--subtask', '--no-ci',
      '--add', 'extra/one.txt', '--reason', 'fixture for the demo',
      '--add', 'extra/two.txt', '--reason', 'second fixture',
      'Task 1.1: x (900)',
    );
    expect(both.status).toBe(0);
    expect(both.out).toContain('--add extra/one.txt (outside allowed set): fixture for the demo');
    const body = git(fx.work, 'log', '-1', '--format=%B');
    expect(body).toContain('Added-outside-list: extra/one.txt — fixture for the demo');
    expect(body).toContain('Added-outside-list: extra/two.txt — second fixture');
    // the trailers are the message's final paragraph
    const paragraphs = body.trim().split('\n\n');
    expect(paragraphs[paragraphs.length - 1]).toMatch(/^Agent: .*\nAdded-outside-list: /);
  });

  it('parent mode carries every Added-outside-list trailer of the branch into the PR body', () => {
    const fx = makeFx();
    write(fx, 'extra/one.txt');
    const first = runTool(fx, '--subtask', '--no-ci', '--add', 'extra/one.txt', '--reason', 'first checkpoint', 'Task 1.1: x (900)');
    expect(first.status).toBe(0);
    write(fx, 'src/feature.ts');
    const r = runTool(fx, 'Task 1 Complete: Demo (900)');
    expect(r.status).toBe(0);
    const args = fs.readFileSync(path.join(fx.bin, 'pr-create.args'), 'utf8').split('\0');
    const body = args[args.indexOf('--body') + 1];
    expect(body).toContain('**Added outside list**: extra/one.txt — first checkpoint');
  });

  it('parent mode with no --add says so in the PR body', () => {
    const fx = makeFx();
    write(fx, 'src/feature.ts');
    const r = runTool(fx, 'Task 1 Complete: Demo (900)');
    expect(r.status).toBe(0);
    const args = fs.readFileSync(path.join(fx.bin, 'pr-create.args'), 'utf8').split('\0');
    expect(args[args.indexOf('--body') + 1]).toContain('**Added outside list**: none');
  });

  it('refuses an --add that names a path which is not a new untracked path', () => {
    const fx = makeFx();
    write(fx, 'src/feature.ts');
    const r = runTool(fx, '--subtask', '--no-ci', '--add', 'extra/typo.txt', '--reason', 'oops', 'Task 1.1: x (900)');
    expect(r.status).not.toBe(0);
    expect(r.out).toContain('not new untracked paths: extra/typo.txt');
    expect(commitCount(fx)).toBe(0);
  });

  it('non-spec mode (fix/ branch) is strict: every new path needs --add with a reason', () => {
    const fx = makeFx('fix/some-bug');
    write(fx, 'tools/helper.ts');
    const refused = runTool(fx, '--subtask', '--no-ci', 'fix: handle the thing');
    expect(refused.status).not.toBe(0);
    expect(refused.out).toContain('no spec found for this branch or message');
    expect(refused.out).toContain('- tools/helper.ts');
    expect(commitCount(fx)).toBe(0);

    const ok = runTool(fx, '--subtask', '--no-ci', '--add', 'tools/helper.ts', '--reason', 'the new helper', 'fix: handle the thing');
    expect(ok.status).toBe(0);
    expect(headFiles(fx)).toEqual(['tools/helper.ts']);
  });

  it('non-spec mode with only tracked edits is not refused', () => {
    const fx = makeFx('chore/tidy');
    write(fx, '.kiro/issues/2026-01-01-old.md', '# old, edited\n');
    const r = runTool(fx, '--subtask', '--no-ci', 'chore: tidy');
    expect(r.status).toBe(0);
  });

  it('a spec branch whose parent cannot be found refuses and names --task; --task N resolves it', () => {
    const fx = makeFx('task/900-demo-unit');
    write(fx, 'src/feature.ts');
    const refused = runTool(fx, '--subtask', '--no-ci', 'wip checkpoint');
    expect(refused.status).not.toBe(0);
    expect(refused.out).toContain('pass --task <N>');
    expect(commitCount(fx)).toBe(0);
    const ok = runTool(fx, '--subtask', '--no-ci', '--task', '1.1', '--spec-dir', '900-demo', 'wip checkpoint');
    expect(ok.status).toBe(0);
  });

  it('an archive move made with plain mv pairs with its tracked deletion; an unpaired archive file is refused', () => {
    const fx = makeFx();
    fs.mkdirSync(path.join(fx.work, '.kiro/issues/archive'), { recursive: true });
    fs.renameSync(path.join(fx.work, '.kiro/issues/2026-01-01-old.md'), path.join(fx.work, '.kiro/issues/archive/2026-01-01-old.md'));
    const paired = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: close the record (900)');
    expect(paired.status).toBe(0);

    write(fx, '.kiro/issues/archive/2026-02-02-never-existed.md');
    const unpaired = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: again (900)');
    expect(unpaired.status).not.toBe(0);
    expect(unpaired.out).toContain('- .kiro/issues/archive/2026-02-02-never-existed.md');
  });

  it('gitignored paths are never counted', () => {
    const fx = makeFx();
    write(fx, 'ignored/scratch.log');
    write(fx, 'src/feature.ts');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: x (900)');
    expect(r.status).toBe(0);
    expect(headFiles(fx)).toEqual(['src/feature.ts']);
  });
});

describe('complete-task.sh commit trailers', () => {
  const CO = 'Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>';
  const finalParagraph = (fx: Fx) => git(fx.work, 'log', '-1', '--format=%B').split(/\n\n/).pop()!.trim();
  const trailersParsed = (fx: Fx) => git(fx.work, 'log', '-1', '--format=%(trailers:only,unfold)').split('\n').filter(Boolean);

  const cases: Array<[string, string[], string]> = [
    ['subtask', ['--subtask', '--no-ci'], 'Task 1.1: add (900)'],
    ['unit-member', ['--unit-member', '--no-ci'], 'Task 1 Complete: Demo (900)'],
    ['parent', ['--no-ci'], 'Task 1 Complete: Demo (900)'],
  ];
  it.each(cases)('%s mode: --agent and --trailer land in the final paragraph, git-parsable', (_m, flags, msg) => {
    const fx = makeFx();
    write(fx, 'src/feature.ts');
    write(fx, '.kiro/specs/900-demo/completion/task-1-completion.md');
    const r = runTool(fx, ...flags, '--agent', 'Ada', '--trailer', CO, msg);
    expect(r.status).toBe(0);
    expect(finalParagraph(fx)).toBe(`Agent: Ada\n${CO}`);
    expect(trailersParsed(fx)).toEqual(['Agent: Ada', CO]);
  });

  it('with no --agent the commit carries "Agent: Peter" (DP_AGENT or Peter): no refusal, no missing trailer', () => {
    const fx = makeFx();
    write(fx, 'src/feature.ts');
    const r = runTool(fx, '--subtask', '--no-ci', 'Task 1.1: add (900)');
    expect(r.status).toBe(0);
    expect(finalParagraph(fx)).toBe('Agent: Peter');
  });

  it('--add trailers share the final paragraph with Agent', () => {
    const fx = makeFx();
    write(fx, 'extra/note.md');
    const r = runTool(fx, '--subtask', '--no-ci', '--agent', 'Ada', '--add', 'extra/note.md', '--reason', 'why', 'Task 1.1: add (900)');
    expect(r.status).toBe(0);
    expect(trailersParsed(fx)).toEqual(['Agent: Ada', 'Added-outside-list: extra/note.md — why']);
  });
});
