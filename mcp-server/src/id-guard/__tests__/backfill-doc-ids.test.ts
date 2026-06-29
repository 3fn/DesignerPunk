/**
 * `backfillDocIds` codemod — unit tests (Spec 119-A Task 4.3).
 *
 * Covers: writes derived id frontmatter-only (body untouched), idempotency
 * (second run skips), HALT on derived collision (never writes), idSource:'none'
 * exception surfacing (never writes id: ''), and the insertIdIntoFrontmatter
 * placement / body-preservation invariant.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  backfillDocIds,
  insertIdIntoFrontmatter,
  BackfillCollisionError,
} from '../backfill-doc-ids';
import { extractFrontmatterInfo } from '../../indexer/frontmatter-parser';

const TMP = path.join(__dirname, 'fixtures-backfill');

function withName(name: string, body = 'body line\nsecond line\n'): string {
  return `---\nname: ${name}\ndescription: fixture\n---\n\n# ${name}\n\n${body}`;
}
function noId(): string {
  return `---\ndescription: orphan\n---\n\nno heading body\n`;
}

function scaffold(files: Record<string, string>): string {
  const root = path.join(TMP, `proj-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const steering = path.join(root, '.kiro', 'steering');
  fs.mkdirSync(steering, { recursive: true });
  for (const [basename, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(steering, basename), content);
  }
  return root;
}

afterAll(() => {
  if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true, force: true });
});

describe('insertIdIntoFrontmatter — frontmatter-only, body preserved', () => {
  it('inserts id: right after the opening --- fence, body byte-identical', () => {
    const original = withName('Token Governance', 'paragraph one\n\nparagraph two\n');
    const next = insertIdIntoFrontmatter(original, 'token-governance');
    expect(next).toContain('---\nid: token-governance\n');
    // The body (everything from the H1 down) must be unchanged.
    const bodyOriginal = original.slice(original.indexOf('# Token Governance'));
    const bodyNext = next.slice(next.indexOf('# Token Governance'));
    expect(bodyNext).toBe(bodyOriginal);
    // And the new file must parse to the written id as frontmatter.
    expect(extractFrontmatterInfo(next).id).toBe('token-governance');
    expect(extractFrontmatterInfo(next).idSource).toBe('frontmatter');
  });
});

describe('backfillDocIds — write / skip / idempotency', () => {
  it('writes derived ids, frontmatter-only, then a second run skips all (idempotent)', () => {
    const root = scaffold({
      'Token-Governance.md': withName('Token Governance'),
      'Core Goals.md': withName('Core Goals'),
    });

    const first = backfillDocIds(['governance', '.kiro/steering'], root);
    expect(first.written).toHaveLength(2);
    expect(first.skipped).toHaveLength(0);
    expect(first.changed).toBe(true);

    // The literal ids are now on disk.
    const tg = fs.readFileSync(path.join(root, '.kiro/steering/Token-Governance.md'), 'utf-8');
    expect(extractFrontmatterInfo(tg).id).toBe('token-governance');
    expect(extractFrontmatterInfo(tg).idSource).toBe('frontmatter');

    // Second run: all skipped, nothing changes.
    const second = backfillDocIds(['governance', '.kiro/steering'], root);
    expect(second.written).toHaveLength(0);
    expect(second.skipped).toHaveLength(2);
    expect(second.changed).toBe(false);
  });

  it('dryRun plans writes without touching disk', () => {
    const root = scaffold({ 'A.md': withName('Alpha Doc') });
    const before = fs.readFileSync(path.join(root, '.kiro/steering/A.md'), 'utf-8');
    const plan = backfillDocIds(['governance', '.kiro/steering'], root, { dryRun: true });
    expect(plan.written).toHaveLength(1);
    const after = fs.readFileSync(path.join(root, '.kiro/steering/A.md'), 'utf-8');
    expect(after).toBe(before); // untouched
  });
});

describe('backfillDocIds — collision HALT (never writes)', () => {
  it('throws BackfillCollisionError on a derived collision and writes nothing', () => {
    const root = scaffold({
      'one.md': withName('Token Governance'),
      'two.md': withName('Token  Governance'), // same slug
    });
    const before1 = fs.readFileSync(path.join(root, '.kiro/steering/one.md'), 'utf-8');
    const before2 = fs.readFileSync(path.join(root, '.kiro/steering/two.md'), 'utf-8');

    expect(() => backfillDocIds(['governance', '.kiro/steering'], root)).toThrow(
      BackfillCollisionError,
    );

    // Nothing written — both files byte-identical.
    expect(fs.readFileSync(path.join(root, '.kiro/steering/one.md'), 'utf-8')).toBe(before1);
    expect(fs.readFileSync(path.join(root, '.kiro/steering/two.md'), 'utf-8')).toBe(before2);
  });
});

describe('backfillDocIds — idSource:none exceptions', () => {
  it("surfaces idSource:'none' docs as exceptions and never writes id: ''", () => {
    const root = scaffold({
      'good.md': withName('Good Doc'),
      'orphan.md': noId(),
    });
    const r = backfillDocIds(['governance', '.kiro/steering'], root);
    expect(r.exceptions.some((p) => p.endsWith('orphan.md'))).toBe(true);
    expect(r.written.some((w) => w.relPath.endsWith('orphan.md'))).toBe(false);
    // The orphan file must be unchanged (no id: '' written).
    const orphan = fs.readFileSync(path.join(root, '.kiro/steering/orphan.md'), 'utf-8');
    expect(orphan).not.toContain('id:');
  });
});
