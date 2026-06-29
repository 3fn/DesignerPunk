/**
 * DocumentIndexer resolver — unit tests (Spec 119-A Task 2.3 / 2.4)
 *
 * Covers the net-new addressing plane: resolveRef's four outcomes
 * (id / indexed-key / legacy-fallback / miss), the single shared normalizeRef
 * (strategy 2 + strategy 3), the legacy-path manifest loader, and the
 * index-maintenance invariant (clear on full re-scan; prune on delete branch;
 * repopulate on re-add).
 *
 * These tests drive the resolver through the public path-taking surface
 * (getDocumentFull, which funnels through getDocumentContent → resolveRef) and
 * through the public resolveRef/loadLegacyPathManifest methods directly.
 */

import * as fs from 'fs';
import * as path from 'path';
import { DocumentIndexer } from '../DocumentIndexer';
import { LegacyPathManifest } from '../../models';

const TEST_FIXTURES_DIR = path.join(__dirname, 'fixtures');

/** A doc with an explicit frontmatter `id:` so id-resolution is deterministic. */
function docWithId(id: string, h1: string): string {
  return `---
name: ${h1}
id: ${id}
description: fixture doc
---

# ${h1}

**Date**: 2026-06-29
**Purpose**: Resolver fixture
**Organization**: test-org
**Scope**: test
**Layer**: 2
**Relevant Tasks**: testing
**Last Reviewed**: 2026-06-29

## Body

content for ${id}.
`;
}

describe('DocumentIndexer resolver (Spec 119-A)', () => {
  let indexer: DocumentIndexer;
  let testDir: string;
  let govKey: string; // the indexed (relative-join) key for the governance doc

  beforeEach(async () => {
    indexer = new DocumentIndexer();
    testDir = path.join(TEST_FIXTURES_DIR, `resolver-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    fs.mkdirSync(testDir, { recursive: true });

    fs.writeFileSync(path.join(testDir, 'token-governance.md'), docWithId('token-governance', 'Token Governance'));
    fs.writeFileSync(path.join(testDir, 'rosetta.md'), docWithId('rosetta-system-architecture', 'Rosetta System Architecture'));

    await indexer.indexDirectory(testDir);
    govKey = path.join(testDir, 'token-governance.md'); // same form documentContent is keyed on
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) fs.rmSync(testDir, { recursive: true, force: true });
  });

  // -------------------------------------------------------------------------
  // resolveRef: the four outcomes
  // -------------------------------------------------------------------------

  describe('resolveRef — four outcomes', () => {
    it('strategy 1: resolves by id', () => {
      const r = indexer.resolveRef('token-governance');
      expect(r.strategy).toBe('id');
      expect(r.id).toBe('token-governance');
      expect(r.indexedKey).toBe(govKey);
    });

    it('strategy 2: resolves a known indexed key directly', () => {
      const r = indexer.resolveRef(govKey);
      expect(r.strategy).toBe('indexed-key');
      expect(r.indexedKey).toBe(govKey);
      expect(r.id).toBe('token-governance');
    });

    it('strategy 3: resolves a legacy path via the loaded manifest', () => {
      const manifest: LegacyPathManifest = {
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [
          { legacyPath: '.kiro/steering/Token Governance.md', id: 'token-governance' },
        ],
      };
      indexer.loadLegacyPathManifest(manifest);

      const r = indexer.resolveRef('.kiro/steering/Token Governance.md');
      expect(r.strategy).toBe('legacy-fallback');
      expect(r.indexedKey).toBe(govKey);
      expect(r.id).toBe('token-governance');
    });

    it('strategy 4: throws DocumentNotResolved on a miss, naming ref + tried strategies', () => {
      try {
        indexer.resolveRef('no-such-doc');
        fail('expected resolveRef to throw');
      } catch (e: any) {
        expect(e.errorType).toBe('DocumentNotResolved');
        expect(e.ref).toBe('no-such-doc');
        expect(e.triedStrategies).toEqual(['id', 'indexed-key', 'legacy-fallback']);
        // Preserves the legacy "Document not found" substring for back-compat.
        expect(e.message).toContain('Document not found');
      }
    });

    it('id resolution takes precedence over indexed-key/legacy', () => {
      // Even with a manifest loaded, a bare id hits strategy 1 first.
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: 'token-governance', id: 'rosetta-system-architecture' }],
      });
      const r = indexer.resolveRef('token-governance');
      expect(r.strategy).toBe('id');
      expect(r.indexedKey).toBe(govKey);
    });
  });

  // -------------------------------------------------------------------------
  // normalizeRef edge cases (shared by strategy 2 and strategy 3)
  // -------------------------------------------------------------------------

  describe('normalizeRef edge cases (strategy 2 + strategy 3)', () => {
    it('strategy 2 normalizes a leading ./ before the documentContent probe', () => {
      const r = indexer.resolveRef('./' + govKey);
      expect(r.strategy).toBe('indexed-key');
      expect(r.indexedKey).toBe(govKey);
    });

    it('strategy 2 normalizes a trailing slash', () => {
      const r = indexer.resolveRef(govKey + '/');
      expect(r.strategy).toBe('indexed-key');
      expect(r.indexedKey).toBe(govKey);
    });

    it('strategy 2 normalizes OS backslashes and repeated slashes', () => {
      const weird = govKey.replace(/\//g, '\\').replace(/\\/, '\\\\'); // backslashes + a doubled one
      const r = indexer.resolveRef(weird);
      expect(r.strategy).toBe('indexed-key');
      expect(r.indexedKey).toBe(govKey);
    });

    it('strategy 3 applies the SAME normalization to legacy keys (renamed space-bearing form)', () => {
      // Manifest seeded with the canonical legacy string; the probe arrives with
      // a stray './' + trailing slash and still resolves through the shared helper.
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [
          { legacyPath: '.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md', id: 'token-governance' },
        ],
      });
      const r = indexer.resolveRef('./.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md/');
      expect(r.strategy).toBe('legacy-fallback');
      expect(r.indexedKey).toBe(govKey);
    });
  });

  // -------------------------------------------------------------------------
  // getDocumentContent chokepoint: all tools route through resolveRef
  // -------------------------------------------------------------------------

  describe('getDocumentContent chokepoint (Design Decision 1)', () => {
    it('getDocumentFull resolves by id (not just by indexed key)', () => {
      const full = indexer.getDocumentFull('token-governance');
      expect(full.content).toContain('content for token-governance');
    });

    it('getDocumentFull resolves by legacy path via fallback', () => {
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: '.kiro/steering/Token Governance.md', id: 'token-governance' }],
      });
      const full = indexer.getDocumentFull('.kiro/steering/Token Governance.md');
      expect(full.content).toContain('content for token-governance');
    });

    it('getDocumentFull still throws Document not found on a miss', () => {
      expect(() => indexer.getDocumentFull('nope')).toThrow('Document not found');
    });
  });

  // -------------------------------------------------------------------------
  // loadLegacyPathManifest behavior
  // -------------------------------------------------------------------------

  describe('loadLegacyPathManifest', () => {
    it('skips entries whose target id is not indexed (transition-only, missing target)', () => {
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: '.kiro/steering/Gone.md', id: 'not-indexed-id' }],
      });
      // The unresolvable target is silently skipped → resolving it is a normal miss.
      expect(() => indexer.resolveRef('.kiro/steering/Gone.md')).toThrow('Document not found');
    });

    it('is re-callable / idempotent', () => {
      const manifest: LegacyPathManifest = {
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: '.kiro/steering/Token Governance.md', id: 'token-governance' }],
      };
      indexer.loadLegacyPathManifest(manifest);
      indexer.loadLegacyPathManifest(manifest);
      const r = indexer.resolveRef('.kiro/steering/Token Governance.md');
      expect(r.indexedKey).toBe(govKey);
    });
  });

  // -------------------------------------------------------------------------
  // Index-maintenance invariant
  // -------------------------------------------------------------------------

  describe('index-maintenance invariant', () => {
    it('clears idIndex on a full re-scan (indexDirectory): removed doc no longer resolves by id', async () => {
      // Sanity: resolves before.
      expect(indexer.resolveRef('rosetta-system-architecture').strategy).toBe('id');

      // Delete the file on disk and re-scan the whole directory.
      fs.rmSync(path.join(testDir, 'rosetta.md'));
      await indexer.indexDirectory(testDir);

      expect(() => indexer.resolveRef('rosetta-system-architecture')).toThrow('Document not found');
      // The surviving doc still resolves.
      expect(indexer.resolveRef('token-governance').strategy).toBe('id');
    });

    it('full re-scan clears the legacy index (re-seed obligation)', async () => {
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: '.kiro/steering/Token Governance.md', id: 'token-governance' }],
      });
      expect(indexer.resolveRef('.kiro/steering/Token Governance.md').strategy).toBe('legacy-fallback');

      // A full re-scan clears legacyPathIndex; without a re-seed the legacy ref misses.
      await indexer.indexDirectory(testDir);
      expect(() => indexer.resolveRef('.kiro/steering/Token Governance.md')).toThrow('Document not found');
    });

    it('reindexFile delete branch prunes the reverse idIndex + dangling legacy entry', async () => {
      indexer.loadLegacyPathManifest({
        generatedAt: '2026-06-29',
        transitionOnly: true,
        entries: [{ legacyPath: '.kiro/steering/Rosetta.md', id: 'rosetta-system-architecture' }],
      });
      const rosettaPath = path.join(testDir, 'rosetta.md');
      expect(indexer.resolveRef('rosetta-system-architecture').strategy).toBe('id');
      expect(indexer.resolveRef('.kiro/steering/Rosetta.md').strategy).toBe('legacy-fallback');

      // Delete on disk, then reindex that single file (FileWatcher delete branch).
      fs.rmSync(rosettaPath);
      await indexer.reindexFile(rosettaPath);

      // Both the id entry AND the legacy entry pointing at the vanished key are gone.
      expect(() => indexer.resolveRef('rosetta-system-architecture')).toThrow('Document not found');
      expect(() => indexer.resolveRef('.kiro/steering/Rosetta.md')).toThrow('Document not found');
      // Unrelated doc untouched.
      expect(indexer.resolveRef('token-governance').strategy).toBe('id');
    });

    it('reindexFile re-add branch repopulates the idIndex', async () => {
      const rosettaPath = path.join(testDir, 'rosetta.md');
      fs.rmSync(rosettaPath);
      await indexer.reindexFile(rosettaPath);
      expect(() => indexer.resolveRef('rosetta-system-architecture')).toThrow('Document not found');

      // Recreate + reindex: id resolution comes back.
      fs.writeFileSync(rosettaPath, docWithId('rosetta-system-architecture', 'Rosetta System Architecture'));
      await indexer.reindexFile(rosettaPath);
      expect(indexer.resolveRef('rosetta-system-architecture').strategy).toBe('id');
    });

    it('handles an id-change on re-add without leaving a stale reverse entry', async () => {
      const rosettaPath = path.join(testDir, 'rosetta.md');
      // Rewrite the SAME file with a different id, then reindex (re-add branch).
      fs.writeFileSync(rosettaPath, docWithId('rosetta-renamed', 'Rosetta Renamed'));
      await indexer.reindexFile(rosettaPath);

      // New id resolves; old id is gone (the indexFile overwrite keys by current id,
      // and the prune-on-delete covers the rename-with-delete path).
      expect(indexer.resolveRef('rosetta-renamed').strategy).toBe('id');
      // Old id resolves only if it happens to also still be a live key — it is not.
      expect(() => indexer.resolveRef('rosetta-system-architecture')).toThrow('Document not found');
    });
  });
});
