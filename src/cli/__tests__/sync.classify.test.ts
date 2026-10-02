/**
 * @category evergreen
 * @purpose Spec 123 Task 5.4 — classification: `deleted-by-you`, `untracked-new`,
 * and `removed` ONLY under managed entries (design.md § "C7" Classification;
 * Testing Strategy row "sync classes": first sync with a deleted generated file;
 * attach then delete; de-managed manifest entries → `untracked-new` not applied;
 * `deleted-by-you`; pruned, not `removed`).
 *
 * Three cases, each bitten (reds recorded in task-5-4-completion.md). The count
 * of cases is asserted so the suite cannot pass by losing one.
 *
 * Task 16.5: the file-grain vehicle of cases 1 and 3 moved from a release-1 COPY
 * under `.kiro/steering` (no longer managed — C7, gate 4b; such an entry is now a
 * legacy copy) to a GENERATED agent file, whose package side comes through
 * `sync`'s agent-layer seam. The properties asserted are unchanged.
 */

import * as fs from 'fs';
import { runSync } from '../sync';
import { deletedByYouMessage, untrackedNewMessage } from '../sync/Reporter';
import { prunedMessage, serializeManifest, LEGACY_MANIFEST_PATH } from '../sync/Manifest';
import type { DesignerPunkManifest } from '../sync/Manifest';
import { createScratch, setupPackage, writeFile, readText, captureConsole, sha, birthKeys, stubAgentLayer } from './syncTestKit';

const CASES = ['deleted-by-you', 'untracked-new', 'removed-only-under-managed'] as const;

describe('sync — classification (Task 5.4)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-classify-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('three named cases', () => {
    expect(CASES).toHaveLength(3);
  });

  test(`case 1/3 — ${CASES[0]}: a recorded generated file the consumer deleted is reported and never re-added; --restore re-adds it`, async () => {
    const IDENTITY = '.kiro/steering/designerpunk-identity.md';
    const OTHER = '.kiro/steering/designerpunk-other.md';
    const doc = '# Identity doc v2\n';
    setupPackage(scratch);
    const agentLayer = stubAgentLayer({ kiro: [{ path: IDENTITY, content: doc }, { path: OTHER, content: 'other\n' }] });
    const manifest: DesignerPunkManifest = {
      version: '1', posture: 'born', installedVersion: '15.0.0', contractHash: '', attachedTargets: ['kiro'],
      entries: {
        [IDENTITY]: { hash: sha('# Identity doc v1\n'), grain: 'file', origin: 'generated' },
        [OTHER]: { hash: sha('other\n'), grain: 'file', origin: 'generated' },
      },
    };
    writeFile(scratch, 'designerpunk.manifest.json', serializeManifest(manifest));
    writeFile(scratch, OTHER, 'other\n');
    // IDENTITY: recorded, emitted by the package, deleted by her.

    const first = await runSync({ projectRoot: scratch, apply: true, isTTY: false, agentLayer });
    expect(con.output()).toContain(deletedByYouMessage(IDENTITY));
    expect(first.applied).not.toContain(IDENTITY);
    expect(fs.existsSync(`${scratch}/${IDENTITY}`)).toBe(false);

    const second = await runSync({ projectRoot: scratch, apply: true, isTTY: false, agentLayer, restore: [IDENTITY] });
    expect(second.applied).toEqual([IDENTITY]);
    expect(readText(scratch, IDENTITY)).toBe(doc);
  });

  test(`case 2/3 — ${CASES[1]}: first sync with a never-recorded generated surface → reported, NOT applied`, async () => {
    const pkgDir = setupPackage(scratch);
    birthKeys(scratch, pkgDir);
    // She never had `.mcp.json`: no entries recorded for it, and no file.
    const m = JSON.parse(readText(scratch, 'designerpunk.manifest.json')) as DesignerPunkManifest;
    for (const k of Object.keys(m.entries)) if (k.startsWith('.mcp.json#')) delete m.entries[k];
    writeFile(scratch, 'designerpunk.manifest.json', serializeManifest(m));
    fs.rmSync(`${scratch}/.mcp.json`);

    const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

    const expectedKeys = ['designerpunk-docs', 'designerpunk-application', 'designerpunk-product'];
    for (const k of expectedKeys) expect(con.output()).toContain(untrackedNewMessage(`.mcp.json#${k}`, 'cc'));
    expect(out.applied.filter((a) => a.startsWith('.mcp.json#'))).toHaveLength(0);
    expect(fs.existsSync(`${scratch}/.mcp.json`)).toBe(false);
  });

  test(`case 3/3 — ${CASES[2]}: de-managed entries are PRUNED (never "Removed from package"); removed still fires under a managed root`, async () => {
    setupPackage(scratch);
    const agentLayer = stubAgentLayer({ cc: [{ path: '.claude/agents/kept.md', content: 'kept\n' }] });
    // A pre-123-shaped manifest (current format): token-language + types + component entries (de-managed),
    // plus two generated agent entries — one the package no longer emits (a genuine `removed`).
    const manifest: DesignerPunkManifest = {
      version: '1', posture: 'born', installedVersion: '15.0.0', contractHash: '', attachedTargets: ['cc'],
      entries: {
        'src/tokens/semantic/ColorTokens.ts': { hash: 'a', grain: 'file', origin: 'copy' },
        'src/tokens/SpacingTokens.ts': { hash: 'b', grain: 'file', origin: 'copy' },
        'src/types/PrimitiveToken.ts': { hash: 'c', grain: 'file', origin: 'copy' },
        'src/components/core/Icon-Base/index.ts': { hash: 'd', grain: 'file', origin: 'copy' },
        '.claude/agents/kept.md': { hash: sha('kept\n'), grain: 'file', origin: 'generated' },
        '.claude/agents/dropped.md': { hash: sha('dropped\n'), grain: 'file', origin: 'generated' },
      },
    };
    writeFile(scratch, 'designerpunk.manifest.json', serializeManifest(manifest));
    writeFile(scratch, '.claude/agents/kept.md', 'kept\n');
    writeFile(scratch, '.claude/agents/dropped.md', 'dropped\n');
    writeFile(scratch, 'src/tokens/SpacingTokens.ts', 'export const mine = 1;\n');

    await runSync({ projectRoot: scratch, dryRun: true, agentLayer });
    const out = con.output();
    const removedBlock = out.split('Removed from package')[1]?.split('\n\n')[0] ?? '';

    // `removed` first (its bite is the unscoped class), then the pruning report (its bite is no pruning).
    expect(removedBlock).toContain('.claude/agents/dropped.md');
    expect(removedBlock).not.toMatch(/src\/(tokens|types|components)/);
    expect(out).toContain(prunedMessage(2, 'src/tokens'));
    expect(out).toContain(prunedMessage(1, 'src/types'));
    expect(out).toContain(prunedMessage(1, 'src/components/core'));
  });

  test('the legacy-manifest relocation still prunes de-managed entries (the Spec 111 path of case 3)', async () => {
    setupPackage(scratch);
    writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({
      version: '12.0.3',
      syncedAt: '2026-06-11T02:46:38.045Z',
      files: {
        'src/tokens/semantic/ColorTokens.ts': { hash: 'a', managed: false },
        'src/tokens/SpacingTokens.ts': { hash: 'b', managed: false },
        'src/types/PrimitiveToken.ts': { hash: 'c', managed: false },
      },
    }));
    await runSync({ projectRoot: scratch, dryRun: true });
    expect(con.output()).toContain(prunedMessage(2, 'src/tokens'));
    expect(con.output()).toContain(prunedMessage(1, 'src/types'));
    expect(con.output()).not.toContain('Removed from package');
  });
});
