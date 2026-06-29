/**
 * Legacy-path re-seed integration (Spec 119-A Task 3.2).
 *
 * Proves the re-seed obligation: a legacy ref resolves via `legacy-fallback`
 * BOTH after the initial indexDirectory AND after a rebuildIndex (which clears
 * legacyPathIndex). If the re-seed were wired once-at-startup only, the post-
 * rebuild assertion would fail — that is exactly the silent regression Task 2
 * flagged for this task.
 *
 * Exercises two legacy keys per the task brief: a space-bearing original (the
 * Req-3 rename form) AND a normal prompt ref.
 */

import * as fs from 'fs';
import * as path from 'path';
import { DocumentIndexer } from '../../indexer/DocumentIndexer';
import { LegacyPathManifest } from '../../models';

const TMP = path.join(__dirname, 'fixtures-reseed');

function doc(name: string): string {
  return `---
name: ${name}
description: fixture
---

# ${name}

**Date**: 2026-06-29
**Purpose**: re-seed fixture
**Organization**: test
**Scope**: test
**Layer**: 2
**Relevant Tasks**: testing
**Last Reviewed**: 2026-06-29

## Body

content.
`;
}

describe('legacy-path re-seed survives rebuild (Spec 119-A Task 3.2)', () => {
  let indexer: DocumentIndexer;
  let steeringDir: string;
  let manifestPath: string;

  // The space-bearing original (Req-3 rename form) and a normal prompt ref.
  const SPACEY_LEGACY = '.kiro/steering/Cross-Platform vs Platform-Specific Decision Framework.md';
  const NORMAL_LEGACY = '.kiro/steering/Token-Governance.md';

  beforeEach(async () => {
    const root = path.join(TMP, `r-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    steeringDir = path.join(root, 'governance');
    fs.mkdirSync(steeringDir, { recursive: true });

    // Post-relocation tree: docs live under governance/, kebab-named. Their ids
    // are derived from `name:`, so the legacy `.kiro/steering/…` strings forward
    // to these via the manifest.
    fs.writeFileSync(
      path.join(steeringDir, 'cross-platform-vs-platform-specific-decision-framework.md'),
      doc('Cross-Platform vs Platform-Specific Decision Framework'),
    );
    fs.writeFileSync(path.join(steeringDir, 'token-governance.md'), doc('Token Governance'));

    const manifest: LegacyPathManifest = {
      generatedAt: 'FIXED',
      transitionOnly: true,
      entries: [
        { legacyPath: SPACEY_LEGACY, id: 'cross-platform-vs-platform-specific-decision-framework' },
        { legacyPath: NORMAL_LEGACY, id: 'token-governance' },
      ],
    };
    manifestPath = path.join(root, 'frozen-manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest), 'utf-8');

    indexer = new DocumentIndexer();
    indexer.setLegacyManifestPath(manifestPath);
    await indexer.indexDirectory(steeringDir);
  });

  afterAll(() => {
    if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true, force: true });
  });

  it('resolves BOTH legacy refs via legacy-fallback after the initial index', () => {
    const spacey = indexer.resolveRef(SPACEY_LEGACY);
    expect(spacey.strategy).toBe('legacy-fallback');
    expect(spacey.id).toBe('cross-platform-vs-platform-specific-decision-framework');

    const normal = indexer.resolveRef(NORMAL_LEGACY);
    expect(normal.strategy).toBe('legacy-fallback');
    expect(normal.id).toBe('token-governance');
  });

  it('STILL resolves BOTH via legacy-fallback after rebuildIndex (re-seed fires)', async () => {
    const health = await indexer.rebuildIndex();
    expect(health.status).not.toBe('failed');

    const spacey = indexer.resolveRef(SPACEY_LEGACY);
    expect(spacey.strategy).toBe('legacy-fallback');
    expect(spacey.id).toBe('cross-platform-vs-platform-specific-decision-framework');

    const normal = indexer.resolveRef(NORMAL_LEGACY);
    expect(normal.strategy).toBe('legacy-fallback');
    expect(normal.id).toBe('token-governance');
  });

  it('a legacy ref also resolves through getDocumentFull (the tool chokepoint) post-rebuild', async () => {
    await indexer.rebuildIndex();
    const full = indexer.getDocumentFull(NORMAL_LEGACY);
    expect(full.content).toContain('Token Governance');
  });
});
