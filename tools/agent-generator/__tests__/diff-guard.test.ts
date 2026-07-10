/**
 * @category evergreen
 * @purpose Verify the diff-guard's pure mechanics against temp-dir fixtures: input-closure
 *          hash sensitivity (incl. the S-D3 resolve-by-id roots being IN the closure),
 *          output-hash add/drop sensitivity (S-D5), bidirectional tree compare
 *          (changed/missing/extra), and lock roundtrip. The full-run path with live MCP
 *          introspection is exercised by Task 6.2's recorded prove-it-bites runs, not jest.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  INPUT_CLOSURE_ROOTS,
  compareTrees,
  computeInputClosureHash,
  hashFileSet,
  listFilesUnder,
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
