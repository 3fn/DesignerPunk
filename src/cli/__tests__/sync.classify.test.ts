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
 */

import * as fs from 'fs';
import { runSync } from '../sync';
import { deletedByYouMessage, untrackedNewMessage } from '../sync/Reporter';
import { prunedMessage, serializeManifest, LEGACY_MANIFEST_PATH } from '../sync/Manifest';
import type { DesignerPunkManifest } from '../sync/Manifest';
import { createScratch, setupPackage, writeFile, readText, captureConsole, sha, birthKeys } from './syncTestKit';

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

  test(`case 1/3 — ${CASES[0]}: a recorded copy the consumer deleted is reported and never re-added; --restore re-adds it`, async () => {
    const doc = '# Identity doc v2\n';
    setupPackage(scratch, { files: { '.kiro/steering/Identity.md': doc, '.kiro/steering/Other.md': 'other\n' } });
    const manifest: DesignerPunkManifest = {
      version: '1', posture: 'born', installedVersion: '15.0.0', contractHash: '', attachedTargets: [],
      entries: {
        '.kiro/steering/Identity.md': { hash: sha('# Identity doc v1\n'), grain: 'file', origin: 'copy' },
        '.kiro/steering/Other.md': { hash: sha('other\n'), grain: 'file', origin: 'copy' },
      },
    };
    writeFile(scratch, 'designerpunk.manifest.json', serializeManifest(manifest));
    writeFile(scratch, '.kiro/steering/Other.md', 'other\n');
    // Identity.md: recorded, present in the package, deleted by her.

    const first = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
    expect(con.output()).toContain(deletedByYouMessage('.kiro/steering/Identity.md'));
    expect(first.applied).not.toContain('.kiro/steering/Identity.md');
    expect(fs.existsSync(`${scratch}/.kiro/steering/Identity.md`)).toBe(false);

    const second = await runSync({ projectRoot: scratch, apply: true, isTTY: false, restore: ['.kiro/steering/Identity.md'] });
    expect(second.applied).toEqual(['.kiro/steering/Identity.md']);
    expect(readText(scratch, '.kiro/steering/Identity.md')).toBe(doc);
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
    setupPackage(scratch, { files: { '.kiro/steering/Kept.md': 'kept\n' } });
    // A pre-123 manifest: token-language + types + component entries (de-managed),
    // plus two steering entries — one the package dropped (a genuine `removed`).
    writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({
      version: '12.0.3',
      syncedAt: '2026-06-11T02:46:38.045Z',
      files: {
        'src/tokens/semantic/ColorTokens.ts': { hash: 'a', managed: false },
        'src/tokens/SpacingTokens.ts': { hash: 'b', managed: false },
        'src/types/PrimitiveToken.ts': { hash: 'c', managed: false },
        'src/components/core/Icon-Base/index.ts': { hash: 'd', managed: false },
        '.kiro/steering/Kept.md': { hash: sha('kept\n'), managed: true },
        '.kiro/steering/Dropped.md': { hash: sha('dropped\n'), managed: true },
      },
    }));
    writeFile(scratch, '.kiro/steering/Kept.md', 'kept\n');
    writeFile(scratch, '.kiro/steering/Dropped.md', 'dropped\n');
    writeFile(scratch, 'src/tokens/SpacingTokens.ts', 'export const mine = 1;\n');

    await runSync({ projectRoot: scratch, dryRun: true });
    const out = con.output();
    const removedBlock = out.split('Removed from package')[1]?.split('\n\n')[0] ?? '';

    // `removed` first (its bite is the unscoped class), then the pruning report (its bite is no pruning).
    expect(removedBlock).toContain('.kiro/steering/Dropped.md');
    expect(removedBlock).not.toMatch(/src\/(tokens|types|components)/);
    expect(out).toContain(prunedMessage(2, 'src/tokens'));
    expect(out).toContain(prunedMessage(1, 'src/types'));
    expect(out).toContain(prunedMessage(1, 'src/components/core'));
  });
});
