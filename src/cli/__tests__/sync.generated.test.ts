/**
 * @category evergreen
 * @purpose Spec 123 Task 16.5 — generated-surface `sync` (design.md § "C7": the managed-set rows ADDED;
 * "the package side of the generated surfaces is freshly generated, by `emitConsumer`, for the manifest's
 * attachedTargets"; Classification; Apply behavior). Instrument rows 8.1–8.4 and 7.1/7.4 (the region wired).
 *
 * Over the REAL package (this repo, built: `dist/generator/consumer-entry.js`, `dist/consumer-canonical/`),
 * installed into a scratch consumer as `node_modules/@3fn/core` (a symlink — `PackageResolver` resolves it
 * exactly as in an install), and a born repo whose agent layer `attach` recorded. Cases, by grain:
 *  - FILE: attachedTargets only; a deleted generated file → `deleted-by-you` (never re-added; `--restore`
 *    re-adds); updated-safe applies on `--apply`; an edited one is a conflict; a never-recorded target's
 *    files → `untracked-new`, never applied.
 *  - REGION: `CLAUDE.md`'s region — updated-safe spliced with outside bytes unchanged; edited inside → the
 *    catalog row, applied only with `--apply`; markers gone → the catalog row, no write.
 *  - KEY: a deleted key → `deleted-by-you`; keys reconciled for a target MCP-wired without its agent layer
 *    (`--skip-agents`, `--reference`), and a consume manifest's package side is the reference scope.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import { runAttach } from '../attach';
import { MANIFEST_FILE, parseManifest, serializeManifest } from '../sync/Manifest';
import { deletedByYouMessage, untrackedNewMessage } from '../sync/Reporter';
import { regionMarkers, CLAUDE_MD_COMMENT, extractRegion, normalizeRegionContent } from '../sync/RegionGrain';
import { managedRegionEditedInsideMessage, managedRegionMarkersMissingMessage } from '../shared/errorCatalog';
import { REPO_ROOT, createScratch, writeFile, readText, captureConsole, dirHash, sha } from './syncTestKit';

const MARKERS = regionMarkers(CLAUDE_MD_COMMENT);
const ADA = '.claude/agents/ada.md';

/** A born consumer repo with the real package installed under node_modules (symlink). */
function bornRepo(scratch: string): void {
  writeFile(scratch, 'src/tokens/index.ts', '\nexport function getAllPrimitiveTokens() { return []; }\n');
  writeFile(scratch, 'src/tokens/semantic/index.ts', '\nexport function getAllSemanticTokens() { return []; }\n');
  writeFile(scratch, 'designerpunk.config.ts', `export default { name: 'T', abbreviation: 'T', tokenSource: './src/tokens' };\n`);
  fs.mkdirSync(path.join(scratch, '.git'));
  fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
  fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
}

async function attachIn(scratch: string, args: string[]): Promise<void> {
  const cwd = process.cwd();
  const exit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
  process.chdir(scratch);
  try {
    await runAttach(args);
  } finally {
    process.chdir(cwd);
    exit.mockRestore();
  }
}

function manifestOf(scratch: string) {
  return parseManifest(readText(scratch, MANIFEST_FILE));
}

function writeManifest(scratch: string, m: ReturnType<typeof manifestOf>): void {
  writeFile(scratch, MANIFEST_FILE, serializeManifest(m));
}

describe('sync — generated surfaces (Task 16.5)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(async () => {
    scratch = createScratch('dp-sync-generated-');
    bornRepo(scratch);
    con = captureConsole();
    await attachIn(scratch, ['--target=cc']);
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('a freshly attached repo: every generated surface is unchanged, and only attachedTargets are generated', async () => {
    const before = dirHash(scratch);
    const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
    const g = out.generated!;
    const unchanged = g.files.unchanged.map((f) => f.relativePath);
    expect(unchanged).toContain(ADA);
    expect(unchanged).toContain('CLAUDE.md#managed');
    expect(unchanged.some((p) => p.startsWith('.claude/identity/designerpunk-'))).toBe(true);
    for (const cls of ['new', 'updatedSafe', 'conflicts', 'removed', 'deletedByYou', 'untrackedNew', 'adoptable'] as const) {
      expect(g.files[cls]).toEqual([]);
    }
    // attachedTargets = ['cc'] → nothing of Kiro's lane is generated or classified.
    expect([...g.contents.keys()].filter((p) => p.startsWith('.kiro/'))).toEqual([]);
    expect(out.applied).toEqual([]);
    expect(dirHash(scratch)).toEqual(before);
  });

  describe('file grain', () => {
    test('a deleted generated file → deleted-by-you: reported, never re-added (even with --apply); --restore re-adds the package bytes', async () => {
      const pkgBytes = readText(scratch, ADA);
      fs.rmSync(path.join(scratch, ADA));

      const first = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(first.generated!.files.deletedByYou.map((f) => f.relativePath)).toEqual([ADA]);
      expect(con.output()).toContain(deletedByYouMessage(ADA));
      expect(first.applied).not.toContain(ADA);
      expect(fs.existsSync(path.join(scratch, ADA))).toBe(false);
      expect(manifestOf(scratch).entries[ADA]).toBeDefined(); // the record stays — that is how it stays "deleted by you"

      const second = await runSync({ projectRoot: scratch, apply: true, isTTY: false, restore: [ADA] });
      expect(second.applied).toEqual([ADA]);
      expect(readText(scratch, ADA)).toBe(pkgBytes);
    });

    test('updated-safe (unchanged by her, package moved) applies on --apply; an edited file is a conflict, never overwritten without --overwrite', async () => {
      const pkgBytes = readText(scratch, ADA);
      const m = manifestOf(scratch);
      // Simulate a package update: her file and the recorded baseline are the OLD bytes.
      writeFile(scratch, ADA, 'old ada\n');
      m.entries[ADA] = { ...m.entries[ADA], hash: sha('old ada\n') };
      // And an edit of hers to another generated file.
      const LINA = '.claude/agents/lina.md';
      writeFile(scratch, LINA, 'her own lina\n');
      writeManifest(scratch, m);

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(out.generated!.files.updatedSafe.map((f) => f.relativePath)).toEqual([ADA]);
      expect(out.generated!.files.conflicts.map((f) => f.relativePath)).toEqual([LINA]);
      expect(out.applied).toEqual([ADA]);
      expect(readText(scratch, ADA)).toBe(pkgBytes);
      expect(readText(scratch, LINA)).toBe('her own lina\n');
      expect(manifestOf(scratch).entries[ADA]).toEqual({ hash: sha(pkgBytes), grain: 'file', origin: 'generated' });
    });

    test('a target in attachedTargets with nothing recorded → untracked-new: reported with its attach command, NEVER applied', async () => {
      const m = manifestOf(scratch);
      m.attachedTargets = ['cc', 'kiro'];
      writeManifest(scratch, m);

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      const untracked = out.generated!.untrackedNew;
      expect(untracked.length).toBeGreaterThan(0);
      expect(untracked.every((u) => u.target === 'kiro')).toBe(true);
      expect(untracked.map((u) => u.path)).toContain('.kiro/agents/ada.json');
      expect(con.output()).toContain(untrackedNewMessage('.kiro/agents/ada.json', 'kiro'));
      expect(fs.existsSync(path.join(scratch, '.kiro/agents'))).toBe(false);
      expect(out.applied.filter((p) => p.startsWith('.kiro/'))).toEqual([]);
    });
  });

  describe('region grain (CLAUDE.md)', () => {
    const OUTSIDE_BEFORE = '# My project\n\nNotes I keep above.\n\n';
    const OUTSIDE_AFTER = '\n## Mine below\n';

    /** Rebuild CLAUDE.md with her bytes around a region holding `inner`; record `recorded` as the baseline. */
    function regionFixture(inner: string, recorded: string): string {
      const text = `${OUTSIDE_BEFORE}${MARKERS.begin}\n${inner}\n${MARKERS.end}\n${OUTSIDE_AFTER}`;
      writeFile(scratch, 'CLAUDE.md', text);
      const m = manifestOf(scratch);
      m.entries['CLAUDE.md#managed'] = { hash: sha(normalizeRegionContent(recorded)), grain: 'region', origin: 'generated' };
      writeManifest(scratch, m);
      return text;
    }

    test('updated-safe: the region is spliced on --apply; every byte outside the markers is unchanged', async () => {
      const packageRegion = extractRegion(readText(scratch, 'CLAUDE.md'), MARKERS);
      expect(packageRegion.found).toBe(true);
      regionFixture('@stale-line', '@stale-line');

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(out.generated!.files.updatedSafe.map((f) => f.relativePath)).toEqual(['CLAUDE.md#managed']);
      expect(out.applied).toEqual(['CLAUDE.md#managed']);
      const after = readText(scratch, 'CLAUDE.md');
      const r = extractRegion(after, MARKERS);
      if (!r.found || !packageRegion.found) throw new Error('region lost');
      expect(r.before).toBe(`${OUTSIDE_BEFORE}${MARKERS.begin}\n`);
      expect(r.after).toBe(`${MARKERS.end}\n${OUTSIDE_AFTER}`);
      expect(normalizeRegionContent(r.region)).toBe(normalizeRegionContent(packageRegion.region));
    });

    test('edited inside: the catalog row; the terminal confirmation alone never applies it; --apply does', async () => {
      const edited = regionFixture('@her-edit-inside', '@what-we-wrote');

      const declined = await runSync({ projectRoot: scratch, isTTY: true, confirm: async () => true });
      expect(con.output()).toContain(managedRegionEditedInsideMessage('CLAUDE.md'));
      expect(declined.generated!.files.conflicts.map((f) => f.relativePath)).toEqual(['CLAUDE.md#managed']);
      expect(readText(scratch, 'CLAUDE.md')).toBe(edited);

      const applied = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(applied.applied).toEqual(['CLAUDE.md#managed']);
      expect(readText(scratch, 'CLAUDE.md').startsWith(`${OUTSIDE_BEFORE}${MARKERS.begin}\n`)).toBe(true);
      expect(readText(scratch, 'CLAUDE.md')).not.toContain('@her-edit-inside');
    });

    test('markers removed from a recorded region: the catalog row, and NO write — even with --apply', async () => {
      writeFile(scratch, 'CLAUDE.md', '# My project — I removed the markers\n');
      const before = readText(scratch, 'CLAUDE.md');

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(out.generated!.markersMissing).toEqual(['CLAUDE.md']);
      expect(con.output()).toContain(managedRegionMarkersMissingMessage('CLAUDE.md'));
      expect(out.applied).not.toContain('CLAUDE.md#managed');
      expect(readText(scratch, 'CLAUDE.md')).toBe(before);
    });
  });

  describe('key grain', () => {
    test('a deleted DesignerPunk server key → deleted-by-you, never re-added without --restore', async () => {
      const mcp = JSON.parse(readText(scratch, '.mcp.json'));
      delete mcp.mcpServers['designerpunk-docs'];
      writeFile(scratch, '.mcp.json', JSON.stringify(mcp, null, 2) + '\n');

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(con.output()).toContain(deletedByYouMessage('.mcp.json#designerpunk-docs'));
      expect(JSON.parse(readText(scratch, '.mcp.json')).mcpServers['designerpunk-docs']).toBeUndefined();
      expect(out.applied).not.toContain('.mcp.json#designerpunk-docs');
    });
  });
});

describe('sync — key reconciliation without an attached agent layer (Task 16.5)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-keys-only-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('attach --reference (attachedTargets []): its recorded keys are reconciled against the REFERENCE scope — never the product server', async () => {
    fs.mkdirSync(path.join(scratch, '.git'));
    fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
    fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
    await attachIn(scratch, ['--target=cc', '--reference']);
    const m = manifestOf(scratch);
    expect(m.posture).toBe('consume');
    expect(m.attachedTargets).toEqual([]);
    const before = dirHash(scratch);

    const clean = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
    expect(clean.applied).toEqual([]);
    expect(dirHash(scratch)).toEqual(before);
    expect(con.output()).not.toMatch(/designerpunk-product/);
    expect(clean.generated).toBeUndefined(); // no agent layer attached → no generated surface

    // Drift: she deletes the docs server; sync reports it (DD22: the manifest exists to repair approval drift).
    const mcp = JSON.parse(readText(scratch, '.mcp.json'));
    delete mcp.mcpServers['designerpunk-docs'];
    writeFile(scratch, '.mcp.json', JSON.stringify(mcp, null, 2) + '\n');
    await runSync({ projectRoot: scratch, dryRun: true });
    expect(con.output()).toContain(deletedByYouMessage('.mcp.json#designerpunk-docs'));
  });
});
