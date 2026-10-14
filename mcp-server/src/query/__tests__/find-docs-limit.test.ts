/**
 * find_docs concept mode honours `limit` and `cursor` (defect record
 * .kiro/issues/2026-10-13-find-docs-concept-mode-ignores-limit.md; Peter ruled option (a),
 * 2026-10-14: the documented default of 20 applies, with `nextCursor` paging, as in list mode).
 *
 * REAL corpus, TOOL-BOUNDARY path (`handleFindDocs` → `QueryEngine.findDocs`), as the running
 * MCP server takes it. The load-bearing property: the bound is applied AFTER ranking and tier
 * assignment, so a bounded page is exactly a slice of the unbounded ranked result — same order,
 * same tiers, same evidence.
 */

import * as path from 'path';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';
import { QueryEngine, findDocsConcept, FIND_DOCS_DEFAULT_LIMIT, FindDocsEntry } from '../QueryEngine';
import { handleFindDocs } from '../../tools/find-docs';
import { DocumentMetadata } from '../../models';

const STEERING_DIR = path.resolve(__dirname, '../../../../governance');

/**
 * The frozen 119-A oracle (pure data, no imports). An untyped `require`, not an `import`:
 * this sub-package's tsc build compiles `__tests__`, and the fixture sits outside its rootDir.
 */
const { DISCOVERY_ORACLE } = require('../../../../scripts/__fixtures__/discovery-oracle') as {
  DISCOVERY_ORACLE: Array<{ concept: string }>;
};

/** The Settings ledger's row S3 query (archive/2026-10-12-leonardo-settings-call-ledger.md). */
const S3_CONCEPT =
  'product data directory overview.yaml experience-map pages domain-objects format';

describe('find_docs concept mode — limit and cursor', () => {
  let queryEngine: QueryEngine;
  let allDocs: DocumentMetadata[];

  const concept = (params: { concept: string; limit?: number; cursor?: string }) =>
    handleFindDocs(queryEngine, params).findDocs;
  const unbounded = (q: string): FindDocsEntry[] => findDocsConcept(allDocs, q).data;

  beforeAll(async () => {
    const indexer = new DocumentIndexer();
    await indexer.indexDirectory(STEERING_DIR);
    queryEngine = new QueryEngine(indexer);
    allDocs = indexer.getAllDocuments();
  }, 30_000);

  it('precondition: the S3 query has more matches than the default page', () => {
    expect(unbounded(S3_CONCEPT).length).toBeGreaterThan(FIND_DOCS_DEFAULT_LIMIT);
  });

  it('limit: 3 returns exactly 3, with nextCursor', () => {
    const r = concept({ concept: S3_CONCEPT, limit: 3 });
    expect(r.data).toHaveLength(3);
    expect(r.nextCursor).toBe('3');
  });

  it("the ledger's S3 call (limit: 6) returns 6", () => {
    expect(concept({ concept: S3_CONCEPT, limit: 6 }).data).toHaveLength(6);
  });

  it('a call without limit returns the documented default (20) plus nextCursor', () => {
    const r = concept({ concept: S3_CONCEPT });
    expect(r.data).toHaveLength(FIND_DOCS_DEFAULT_LIMIT);
    expect(r.nextCursor).toBe(String(FIND_DOCS_DEFAULT_LIMIT));
  });

  it('limit is capped at 5× the default (100)', () => {
    const all = unbounded(S3_CONCEPT);
    const r = concept({ concept: S3_CONCEPT, limit: 500 });
    expect(r.data).toHaveLength(Math.min(all.length, FIND_DOCS_DEFAULT_LIMIT * 5));
  });

  it('paging with nextCursor walks the whole ranked result with no overlap and no gap', () => {
    const all = unbounded(S3_CONCEPT);
    const walked: FindDocsEntry[] = [];
    let cursor: string | undefined;
    let pages = 0;
    do {
      const r = concept({ concept: S3_CONCEPT, limit: 7, cursor });
      walked.push(...r.data);
      cursor = r.nextCursor;
      pages += 1;
    } while (cursor !== undefined && pages < 100);
    expect(walked).toEqual(all);
    expect(new Set(walked.map((e) => e.path)).size).toBe(walked.length);
  });

  it('the last page carries no nextCursor', () => {
    const all = unbounded(S3_CONCEPT);
    const r = concept({ concept: S3_CONCEPT, limit: 7, cursor: String(all.length - 1) });
    expect(r.data).toHaveLength(1);
    expect(r.nextCursor).toBeUndefined();
  });

  it('for every oracle concept and k ∈ {1, 3, 20}: the bounded page equals the unbounded top-k (order, tier, evidence)', () => {
    expect(DISCOVERY_ORACLE.length).toBe(83);
    for (const { concept: q } of DISCOVERY_ORACLE) {
      const all = unbounded(q);
      for (const k of [1, 3, 20]) {
        expect(concept({ concept: q, limit: k }).data).toEqual(all.slice(0, k));
      }
    }
  });

  it('a no-match query still returns the pinned empty contract', () => {
    expect(concept({ concept: 'the and of', limit: 3 })).toEqual({
      data: [],
      error: null,
      matchConfidence: 'none',
    });
  });
});
