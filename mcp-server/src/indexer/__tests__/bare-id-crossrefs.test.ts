/**
 * Bare-id cross-reference enumeration — unit tests (Spec 119-B OB-1, R9,
 * design Component 6).
 *
 * Covers: the parser's bare-id candidate grammar (positives + false-positive
 * guards), `.md` extraction unchanged (no tag on path refs), the indexer's
 * post-index validation pass (hits kept tag-stripped, misses dropped with
 * record), the migrated-doc enumeration case (token-governance-pattern
 * fixture), the reindexFile ACCEPTED EDGE (new-doc ref dropped until full
 * rebuild), the D5 addressing contract on listCrossReferences, and the
 * index-health aggregate warning + stable validated count.
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractCrossReferences, BARE_ID_GRAMMAR } from '../cross-ref-parser';
import { DocumentIndexer } from '../DocumentIndexer';

const TEST_FIXTURES_DIR = path.join(__dirname, 'fixtures');

function docWithId(id: string, h1: string, body: string): string {
  return `---
name: ${h1}
id: ${id}
description: fixture doc
---

# ${h1}

**Date**: 2026-08-02
**Purpose**: OB-1 fixture
**Organization**: test-org
**Scope**: test
**Layer**: 2
**Relevant Tasks**: testing
**Last Reviewed**: 2026-08-02

## Body

${body}
`;
}

// ---------------------------------------------------------------------------
// Parser: grammar + guards (7.2)
// ---------------------------------------------------------------------------

describe('cross-ref parser — bare-id candidate extraction (Spec 119-B OB-1)', () => {
  it('grammar positives: extracts bare-id candidates with the internal tag', () => {
    const content = '## S\n\nsee [Token Governance](token-governance) and [x](a1) and [y](x-y-z2).';
    const refs = extractCrossReferences(content, 'test.md');
    expect(refs).toHaveLength(3);
    expect(refs.map(r => r.target)).toEqual(['token-governance', 'a1', 'x-y-z2']);
    for (const r of refs) expect(r.kind).toBe('id-candidate');
  });

  it('false-positive guards: anchors, URLs, paths, dotted names, uppercase, underscores, code-ish targets are NOT candidates', () => {
    const content = [
      '## S',
      '[anchor](#section)',
      '[url](https://example.com/page)',
      '[url2](mailto:x@y.z)',
      '[relpath](./sub/thing)',
      '[abspath](/root/thing)',
      '[dotted](file.txt)',
      '[upper](Not-An-Id)',
      '[underscore](not_an_id)',
      '[hyphen-start](-bad)',
      '[empty]()',
    ].join('\n');
    const refs = extractCrossReferences(content, 'test.md');
    expect(refs).toHaveLength(0);
  });

  it('.md extraction is unchanged: path refs carry NO kind tag and keep their exact shape', () => {
    const content = '## Section One\n\nsee [Guide](./guide.md) and [Other](docs/other.md#anchor).';
    const refs = extractCrossReferences(content, 'test.md');
    expect(refs).toEqual([
      { target: './guide.md', context: 'Guide', section: 'Section One', lineNumber: 3 },
      { target: 'docs/other.md#anchor', context: 'Other', section: 'Section One', lineNumber: 3 },
    ]);
  });

  it('mixed line: .md ref and bare-id candidate extracted side by side', () => {
    const content = '## S\n\n[A](a.md) then [B](token-governance) then [C](#x).';
    const refs = extractCrossReferences(content, 'test.md');
    expect(refs.map(r => [r.target, r.kind ?? 'path'])).toEqual([
      ['a.md', 'path'],
      ['token-governance', 'id-candidate'],
    ]);
  });

  it('grammar constant rejects / . : # by construction', () => {
    for (const bad of ['a/b', 'a.b', 'a:b', 'a#b', 'A', '-a', '']) {
      expect(BARE_ID_GRAMMAR.test(bad) && !/[/.:#]/.test(bad)).toBe(false);
    }
  });
});

// ---------------------------------------------------------------------------
// Indexer: validation pass + surfacing + D5 (7.3 / 7.4)
// ---------------------------------------------------------------------------

describe('DocumentIndexer — bare-id validation on the post-index hook (Spec 119-B OB-1)', () => {
  let indexer: DocumentIndexer;
  let testDir: string;

  beforeEach(() => {
    indexer = new DocumentIndexer();
    testDir = path.join(TEST_FIXTURES_DIR, `bareid-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(testDir, { recursive: true });
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
  });

  it('validates candidates against idIndex: hits kept (tag stripped), misses dropped with record', async () => {
    fs.writeFileSync(
      path.join(testDir, 'doc-a.md'),
      docWithId('doc-a', 'Doc A', 'see [B](doc-b), [bogus](no-such-id), and [file](other.md).')
    );
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'plain body.'));
    await indexer.indexDirectory(testDir);

    const refs = indexer.listCrossReferences('doc-a');
    expect(refs.map(r => r.target).sort()).toEqual(['doc-b', 'other.md']);
    // The candidate tag never escapes the indexer (public shape unchanged)
    for (const r of refs) expect('kind' in r).toBe(false);

    const dropped = indexer.getDroppedIdCandidates();
    expect(dropped).toHaveLength(1);
    expect(dropped[0].target).toBe('no-such-id');
    expect(dropped[0].sourceKey).toContain('doc-a.md');
    expect(dropped[0].lineNumber).toBeGreaterThan(0);
  });

  it('migrated-doc enumeration: a token-governance-pattern doc has its bare-id refs enumerated', async () => {
    // Mirrors the real post-U3 pattern: prose linking sibling docs by bare id
    const body = [
      'Token selection: see [Token Quick Reference](token-quick-reference) for patterns,',
      '[Rosetta System Architecture](rosetta-system-architecture) for the pipeline,',
      'and the [DTCG guide](dtcg-integration-guide) for exports.',
    ].join('\n');
    fs.writeFileSync(path.join(testDir, 'token-governance.md'), docWithId('token-governance', 'Token Governance', body));
    fs.writeFileSync(path.join(testDir, 'tqr.md'), docWithId('token-quick-reference', 'Token Quick Reference', 'x'));
    fs.writeFileSync(path.join(testDir, 'rsa.md'), docWithId('rosetta-system-architecture', 'Rosetta System Architecture', 'x'));
    fs.writeFileSync(path.join(testDir, 'dtcg.md'), docWithId('dtcg-integration-guide', 'DTCG Integration Guide', 'x'));
    await indexer.indexDirectory(testDir);

    const refs = indexer.listCrossReferences('token-governance');
    expect(refs.map(r => r.target).sort()).toEqual([
      'dtcg-integration-guide',
      'rosetta-system-architecture',
      'token-quick-reference',
    ]);
    expect(indexer.getDroppedIdCandidates()).toHaveLength(0);
    // Context + section + line survive for bare-id refs (same fields as .md refs)
    expect(refs[0].section).toBe('Body');
    expect(refs[0].context.length).toBeGreaterThan(0);
  });

  it('ACCEPTED EDGE (pinned): reindexFile drops a ref to a NEW doc not yet in the standing idIndex; the next full rebuild restores it', async () => {
    const aPath = path.join(testDir, 'doc-a.md');
    fs.writeFileSync(aPath, docWithId('doc-a', 'Doc A', 'no links yet.'));
    await indexer.indexDirectory(testDir);

    // NEW doc B lands on disk; doc A is edited to reference it; ONLY A is reindexed.
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'new doc.'));
    fs.writeFileSync(aPath, docWithId('doc-a', 'Doc A', 'now see [B](doc-b).'));
    await indexer.reindexFile(aPath);

    // B is not in the standing idIndex (it was never indexed) → ref dropped
    expect(indexer.listCrossReferences('doc-a').map(r => r.target)).toEqual([]);
    expect(indexer.getDroppedIdCandidates().map(d => d.target)).toEqual(['doc-b']);

    // Full rebuild: idIndex complete → the ref validates
    await indexer.indexDirectory(testDir);
    expect(indexer.listCrossReferences('doc-a').map(r => r.target)).toEqual(['doc-b']);
    expect(indexer.getDroppedIdCandidates()).toHaveLength(0);
  });

  it('reindexFile validates inline when the target IS in the standing idIndex', async () => {
    const aPath = path.join(testDir, 'doc-a.md');
    fs.writeFileSync(aPath, docWithId('doc-a', 'Doc A', 'no links yet.'));
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'x'));
    await indexer.indexDirectory(testDir);

    fs.writeFileSync(aPath, docWithId('doc-a', 'Doc A', 'now see [B](doc-b).'));
    await indexer.reindexFile(aPath);
    expect(indexer.listCrossReferences('doc-a').map(r => r.target)).toEqual(['doc-b']);
  });

  it('D5: listCrossReferences resolves via id, indexed key, and ./-prefixed key through the shared resolver chain', async () => {
    const aPath = path.join(testDir, 'doc-a.md');
    fs.writeFileSync(aPath, docWithId('doc-a', 'Doc A', 'see [B](doc-b) and [G](./guide.md).'));
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'x'));
    await indexer.indexDirectory(testDir);

    const byId = indexer.listCrossReferences('doc-a');
    const byKey = indexer.listCrossReferences(aPath);
    const byDotSlash = indexer.listCrossReferences(`./${aPath}`);
    expect(byKey).toEqual(byId);
    expect(byDotSlash).toEqual(byId);
    expect(byId.map(r => r.target).sort()).toEqual(['./guide.md', 'doc-b']);
  });

  it('D5 miss: an unresolvable ref throws DocumentNotResolved (same contract as the other document tools)', async () => {
    fs.writeFileSync(path.join(testDir, 'doc-a.md'), docWithId('doc-a', 'Doc A', 'x'));
    await indexer.indexDirectory(testDir);
    expect(() => indexer.listCrossReferences('nope-never')).toThrow(/Document not found/);
  });

  it('getDocumentSummary serves the same validated set (dropped candidates never appear)', async () => {
    fs.writeFileSync(
      path.join(testDir, 'doc-a.md'),
      docWithId('doc-a', 'Doc A', 'see [B](doc-b) and [bogus](no-such-id).')
    );
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'x'));
    await indexer.indexDirectory(testDir);

    const summary = indexer.getDocumentSummary('doc-a');
    expect(summary.crossReferences.map(r => r.target)).toEqual(['doc-b']);
  });

  it('index-health: totalCrossReferences is the validated count and drops emit ONE aggregate warning', async () => {
    fs.writeFileSync(
      path.join(testDir, 'doc-a.md'),
      docWithId('doc-a', 'Doc A', 'see [B](doc-b), [bogus](no-such-id), and [file](guide.md).')
    );
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'x'));
    await indexer.indexDirectory(testDir);

    const health = indexer.getIndexHealth();
    // validated = doc-b (bare-id hit) + guide.md (path ref) = 2; bogus dropped
    expect(health.metrics.totalCrossReferences).toBe(2);
    const warning = health.warnings.filter(w => w.includes('unresolved bare-id'));
    expect(warning).toHaveLength(1);
    expect(warning[0]).toBe('1 unresolved bare-id link targets — run scan-cross-references.sh for the list');
  });

  it('index-health: zero drops emits NO bare-id warning', async () => {
    fs.writeFileSync(path.join(testDir, 'doc-a.md'), docWithId('doc-a', 'Doc A', 'see [B](doc-b).'));
    fs.writeFileSync(path.join(testDir, 'doc-b.md'), docWithId('doc-b', 'Doc B', 'x'));
    await indexer.indexDirectory(testDir);

    const health = indexer.getIndexHealth();
    expect(health.warnings.filter(w => w.includes('unresolved bare-id'))).toHaveLength(0);
  });
});
