/**
 * @category evergreen
 * @purpose Verify the diff-guard's pure mechanics against temp-dir fixtures: input-closure
 *          hash sensitivity (incl. the S-D3 resolve-by-id roots being IN the closure),
 *          output-hash add/drop sensitivity (S-D5), bidirectional tree compare
 *          (changed/missing/extra), and lock roundtrip. The full-run path with live MCP
 *          introspection is exercised by Task 6.2's recorded prove-it-bites runs, not jest.
 */

import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  INPUT_CLOSURE_ROOTS,
  compareTrees,
  computeInputClosureHash,
  hashFileSet,
  isGitWorkTreeRoot,
  listFilesUnder,
  listInputClosure,
  listInputClosureByWalk,
  listInputClosureFromGit,
  readLock,
  writeLock,
  LOCK_PATH,
} from '../diff-guard';

function tempRepo(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dp-guard-test-'));
}
function put(root: string, rel: string, content: string): void {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
}

describe('the input closure includes the S-D3 resolve-by-id roots', () => {
  it('governance/** and .kiro/steering/** are closure roots', () => {
    expect(INPUT_CLOSURE_ROOTS).toContain('governance');
    expect(INPUT_CLOSURE_ROOTS).toContain('.kiro/steering');
  });

  it('an edit under governance/ ALONE changes the input-closure hash (the S-D3 property)', () => {
    const repo = tempRepo();
    put(repo, 'canonical/shared/x.yaml', 'a: 1\n');
    put(repo, 'governance/some-doc.md', 'original section text\n');
    const before = computeInputClosureHash(repo);
    put(repo, 'governance/some-doc.md', 'EDITED section text\n');
    const after = computeInputClosureHash(repo);
    expect(after).not.toBe(before);
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('the lock file itself is excluded from its own closure', () => {
    const repo = tempRepo();
    put(repo, 'canonical/shared/x.yaml', 'a: 1\n');
    const before = computeInputClosureHash(repo);
    put(repo, LOCK_PATH, '{"inputClosure":"x","outputs":"y"}\n');
    const after = computeInputClosureHash(repo);
    expect(after).toBe(before);
    fs.rmSync(repo, { recursive: true, force: true });
  });
});

describe('hashFileSet — the S-D5 output-hash shape', () => {
  it('changes when a file changes, when one is added, and when one is dropped', () => {
    const repo = tempRepo();
    put(repo, 'out/a.txt', 'A');
    put(repo, 'out/b.txt', 'B');
    const base = hashFileSet(repo, listFilesUnder(repo, 'out'));

    put(repo, 'out/a.txt', 'A-EDITED');
    const changed = hashFileSet(repo, listFilesUnder(repo, 'out'));
    expect(changed).not.toBe(base);

    put(repo, 'out/a.txt', 'A');
    put(repo, 'out/c.txt', 'C');
    const added = hashFileSet(repo, listFilesUnder(repo, 'out'));
    expect(added).not.toBe(base);

    fs.rmSync(path.join(repo, 'out/c.txt'));
    fs.rmSync(path.join(repo, 'out/b.txt'));
    const dropped = hashFileSet(repo, listFilesUnder(repo, 'out'));
    expect(dropped).not.toBe(base);
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('is order-independent (sorted pairs)', () => {
    const repo = tempRepo();
    put(repo, 'out/a.txt', 'A');
    put(repo, 'out/b.txt', 'B');
    const h1 = hashFileSet(repo, ['out/a.txt', 'out/b.txt']);
    const h2 = hashFileSet(repo, ['out/b.txt', 'out/a.txt']);
    expect(h1).toBe(h2);
    fs.rmSync(repo, { recursive: true, force: true });
  });
});

describe('compareTrees — bidirectional (changed / missing / extra)', () => {
  it('reports a hand-edit as changed, a dropped output as missing, a stale file as extra', () => {
    const fresh = tempRepo();
    const tree = tempRepo();
    // fresh (regenerated) tree
    put(fresh, 'g/one.txt', 'ONE');
    put(fresh, 'g/two.txt', 'TWO');
    // working tree: one hand-edited, two absent, plus a stale extra
    put(tree, 'g/one.txt', 'ONE-HAND-EDITED');
    put(tree, 'g/stale.txt', 'LEFTOVER');

    const delta = compareTrees(fresh, tree, ['g']);
    expect(delta.changed).toEqual(['g/one.txt']);
    expect(delta.missing).toEqual(['g/two.txt']);
    expect(delta.extra).toEqual(['g/stale.txt']);
    fs.rmSync(fresh, { recursive: true, force: true });
    fs.rmSync(tree, { recursive: true, force: true });
  });

  it('reports clean when both sides agree byte-for-byte', () => {
    const fresh = tempRepo();
    const tree = tempRepo();
    put(fresh, 'g/one.txt', 'SAME');
    put(tree, 'g/one.txt', 'SAME');
    const delta = compareTrees(fresh, tree, ['g']);
    expect(delta).toEqual({ changed: [], missing: [], extra: [] });
    fs.rmSync(fresh, { recursive: true, force: true });
    fs.rmSync(tree, { recursive: true, force: true });
  });
});

describe('lock roundtrip', () => {
  it('writes and reads back; an unparseable lock reads as undefined (stale → full run)', () => {
    const repo = tempRepo();
    fs.mkdirSync(path.join(repo, 'canonical'), { recursive: true });
    writeLock(repo, { inputClosure: 'aaa', outputs: 'bbb' });
    expect(readLock(repo)).toEqual({ inputClosure: 'aaa', outputs: 'bbb' });
    fs.writeFileSync(path.join(repo, LOCK_PATH), 'not json');
    expect(readLock(repo)).toBeUndefined();
    fs.rmSync(repo, { recursive: true, force: true });
  });
});

// ----------------------------------------------------------------------------
// F1 — the input closure is listed from git (checkout-independent); walk fallback outside git
// (2026-10-01 generated-lock-input-closure-differs-by-checkout)
// ----------------------------------------------------------------------------

function git(repo: string, ...args: string[]): string {
  const r = spawnSync('git', args, { cwd: repo, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`git ${args.join(' ')} failed: ${r.stderr}`);
  return r.stdout;
}

/** A committed fixture repo with a `.gitignore` (logs/) — the shape of the real defect. */
function gitRepo(): string {
  const repo = fs.realpathSync(tempRepo());
  git(repo, 'init', '-q');
  git(repo, 'config', 'user.email', 't@example.com');
  git(repo, 'config', 'user.name', 'T');
  git(repo, 'config', 'commit.gpgsign', 'false');
  put(repo, '.gitignore', 'logs/\n');
  put(repo, 'canonical/shared/x.yaml', 'a: 1\n');
  put(repo, 'governance/doc.md', 'doc\n');
  put(repo, 'tools/agent-generator/gen.ts', 'export {};\n');
  put(repo, 'package.json', '{}\n');
  git(repo, 'add', '-A');
  git(repo, 'commit', '-q', '-m', 'fixture');
  return repo;
}

describe('F1 — closure listed from git (checkout-independent)', () => {
  it('(1) a gitignored file planted under a closure root does NOT move the hash', () => {
    const repo = gitRepo();
    expect(isGitWorkTreeRoot(repo)).toBe(true);
    const before = computeInputClosureHash(repo);
    put(repo, 'tools/agent-generator/mcp-server/logs/index-state.log', 'stray\n');
    put(repo, 'governance/logs/x.log', 'stray\n');
    expect(fs.existsSync(path.join(repo, 'tools/agent-generator/mcp-server/logs/index-state.log'))).toBe(true);
    expect(computeInputClosureHash(repo)).toBe(before);
    // ...while the filesystem walk WOULD have moved (the defect F1 removes):
    expect(listInputClosureByWalk(repo)).toContain('tools/agent-generator/mcp-server/logs/index-state.log');
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('(2) an untracked, not-ignored file under a root DOES move the hash', () => {
    const repo = gitRepo();
    const before = computeInputClosureHash(repo);
    put(repo, 'canonical/shared/new-input.yaml', 'b: 2\n');
    expect(listInputClosure(repo)).toContain('canonical/shared/new-input.yaml');
    expect(computeInputClosureHash(repo)).not.toBe(before);
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('(3a) on a clean tree the git-listed closure EQUALS the walk (fixture), hash included', () => {
    const repo = gitRepo();
    expect(listInputClosureFromGit(repo)).toEqual(listInputClosureByWalk(repo));
    expect(computeInputClosureHash(repo)).toBe(
      hashFileSet(repo, listInputClosureByWalk(repo)),
    );
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('(3b) in THIS repo the git-listed closure equals the walk, except paths git ignores (and no git-only paths)', () => {
    const repoRoot = path.resolve(__dirname, '..', '..', '..');
    if (!isGitWorkTreeRoot(repoRoot)) return; // exported / non-git copy: nothing to compare
    const viaGit = new Set(listInputClosureFromGit(repoRoot));
    const viaWalk = listInputClosureByWalk(repoRoot);
    const walkOnly = viaWalk.filter((rel) => !viaGit.has(rel));
    const gitOnly = [...viaGit].filter((rel) => !viaWalk.includes(rel));
    expect(gitOnly).toEqual([]);
    // Every file the walk sees but git does not must be gitignored. On a clean checkout (CI) this
    // is the empty set (walkOnly === []): the git list EQUALS the walk, so committed locks stay valid.
    // A gitignored file the generator STARTS reading would be dropped silently by F1 — if one appears
    // under a root in CI, this assertion names it (the check-ignore below is the allow-list).
    if (walkOnly.length > 0) {
      const ignored = spawnSync('git', ['check-ignore', '-z', '--stdin'], {
        cwd: repoRoot,
        input: walkOnly.join('\0'),
        encoding: 'utf8',
      })
        .stdout.split('\0')
        .filter(Boolean)
        .sort();
      expect(ignored).toEqual([...walkOnly].sort());
    }
    if (process.env.CI) expect(walkOnly).toEqual([]);
  });

  it('(4) the non-git fallback: a plain temp dir (and a subdir of a repo) uses the walk', () => {
    const plain = tempRepo();
    put(plain, 'canonical/shared/x.yaml', 'a: 1\n');
    put(plain, 'governance/logs/x.log', 'counts here: no git, no ignore rules\n');
    expect(isGitWorkTreeRoot(plain)).toBe(false);
    expect(listInputClosure(plain)).toEqual(listInputClosureByWalk(plain));
    expect(listInputClosure(plain)).toContain('governance/logs/x.log');

    // the `--root` stale-unit fixture shape: a subdirectory INSIDE a repo is not a work-tree root
    const repo = gitRepo();
    put(repo, 'sub/canonical/shared/y.yaml', 'y\n');
    expect(isGitWorkTreeRoot(path.join(repo, 'sub'))).toBe(false);
    expect(listInputClosure(path.join(repo, 'sub'))).toEqual(['canonical/shared/y.yaml']);
    fs.rmSync(plain, { recursive: true, force: true });
    fs.rmSync(repo, { recursive: true, force: true });
  });

  it('(5) a tracked file deleted on disk is dropped, not a crash; a tracked symlink is skipped like the walk', () => {
    const repo = gitRepo();
    put(repo, 'canonical/shared/gone.yaml', 'g\n');
    fs.symlinkSync('x.yaml', path.join(repo, 'canonical/shared/link.yaml'));
    git(repo, 'add', '-A');
    git(repo, 'commit', '-q', '-m', 'more');
    fs.rmSync(path.join(repo, 'canonical/shared/gone.yaml'));
    let list: string[] = [];
    expect(() => {
      list = listInputClosure(repo);
    }).not.toThrow();
    expect(list).not.toContain('canonical/shared/gone.yaml');
    expect(list).not.toContain('canonical/shared/link.yaml');
    expect(list).toEqual(listInputClosureByWalk(repo));
    expect(() => computeInputClosureHash(repo)).not.toThrow();
    fs.rmSync(repo, { recursive: true, force: true });
  });
});
