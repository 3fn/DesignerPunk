/**
 * @category evergreen
 * @purpose Spec 123 Task 5.3 — key-grain JSON, reading = PARSED VALUES
 * (tasks.md § "Open inputs" 5.3), over THREE SHAPES: `mcpServers.<key>` in
 * `.kiro/settings/mcp.json` and `.mcp.json`, and the `permissions.allow`
 * array-entry grain in `.claude/settings.json`.
 *
 * Criteria covered: a consumer's own server key, and a consumer-authored
 * `mcp__designerpunk-*` rule, survive `sync` with parsed value unchanged; when
 * our keys are unchanged the file's bytes are unchanged (no write); editing our
 * key → `conflict`; deleting it → `deleted-by-you`.
 *
 * Scope (R26.8): the array-entry grain's identity IS its string, so "editing" an
 * allow entry is indistinguishable from delete + add — it reads as
 * `deleted-by-you` for ours plus "yours, under DesignerPunk's prefix" for the new
 * string. `conflict` is reachable only on the two `mcpServers` shapes.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import { KEY_SURFACES, hashKeyValue } from '../sync/KeyGrain';
import { yoursUnderPrefixMessage, deletedByYouMessage } from '../sync/Reporter';
import {
  createScratch,
  setupPackage,
  setTools,
  birthKeys,
  readText,
  readJson,
  writeFile,
  captureConsole,
  BASE_TOOLS,
} from './syncTestKit';

const CONSUMER_SERVER = { command: 'node', args: ['./my-own-mcp.js'], env: { MINE: '1' } };
const CONSUMER_ALLOW = ['Bash(npm test)', 'mcp__designerpunk-docs', 'mcp__my-server__thing'];

/** The package gains a read-only tool → Kiro's `autoApprove` and CC's allow list change. */
const UPDATED_TOOLS = {
  ...BASE_TOOLS,
  'designerpunk-docs': [...BASE_TOOLS['designerpunk-docs'], { name: 'get_document_full', readOnlyHint: true }],
};

/** Add an env var to the package template's docs server — changes both mcpServers shapes. */
function bumpTemplateEnv(pkgDir: string): void {
  const rel = 'src/cli/templates/mcp-config.json.template';
  const t = readJson(pkgDir, rel);
  t.mcpServers['designerpunk-docs'].env.DP_FIXTURE_NEW = '1';
  writeFile(pkgDir, rel, JSON.stringify(t, null, 2));
}

describe('sync — key-grain JSON (Task 5.3)', () => {
  let scratch: string;
  let pkgDir: string;
  let con: ReturnType<typeof captureConsole>;

  beforeEach(() => {
    scratch = createScratch('dp-sync-keys-');
    pkgDir = setupPackage(scratch);
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('exactly three key-grain shapes are managed (2 × mcpServers, 1 × permissions.allow)', () => {
    expect(KEY_SURFACES).toHaveLength(3);
    expect(KEY_SURFACES.map((s) => `${s.file}:${s.shape}`)).toEqual([
      '.kiro/settings/mcp.json:mcpServers',
      '.mcp.json:mcpServers',
      '.claude/settings.json:permissionsAllow',
    ]);
  });

  test('consumer entries survive an UPDATING sync with parsed value unchanged (all three shapes)', async () => {
    birthKeys(scratch, pkgDir, {
      kiroServers: { 'my-server': CONSUMER_SERVER },
      ccServers: { 'my-server': CONSUMER_SERVER, 'designerpunk-mine': CONSUMER_SERVER },
      allow: CONSUMER_ALLOW,
    });
    setTools(pkgDir, UPDATED_TOOLS);
    bumpTemplateEnv(pkgDir); // … and a template env change reaches `.mcp.json` (CC entries carry no approvals)
    const before = {
      kiro: readJson(scratch, '.kiro/settings/mcp.json'),
      cc: readJson(scratch, '.mcp.json'),
      allow: readJson(scratch, '.claude/settings.json'),
    };

    const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

    // Our keys DID change on every surface (so every file was written) …
    expect(out.applied).toEqual(
      expect.arrayContaining([
        '.kiro/settings/mcp.json#designerpunk-docs',
        '.mcp.json#designerpunk-docs',
        '.claude/settings.json#mcp__designerpunk-docs__get_document_full',
      ]),
    );
    const kiro = readJson(scratch, '.kiro/settings/mcp.json');
    const cc = readJson(scratch, '.mcp.json');
    const allow = readJson(scratch, '.claude/settings.json');
    expect(kiro.mcpServers['designerpunk-docs'].autoApprove).toContain('get_document_full');
    // … and every consumer entry is parsed-value equal.
    expect(kiro.mcpServers['my-server']).toEqual(before.kiro.mcpServers['my-server']);
    expect(cc.mcpServers['my-server']).toEqual(before.cc.mcpServers['my-server']);
    expect(cc.mcpServers['designerpunk-mine']).toEqual(CONSUMER_SERVER);
    for (const entry of CONSUMER_ALLOW) expect(allow.permissions.allow).toContain(entry);
    expect(allow.permissions.allow.filter((e: string) => CONSUMER_ALLOW.includes(e))).toEqual(CONSUMER_ALLOW);
    expect(allow.permissions.allow).toHaveLength(before.allow.permissions.allow.length + 1);
    // The consumer-authored keys under our prefix are reported as HERS, once each.
    expect(con.output()).toContain(yoursUnderPrefixMessage('designerpunk-mine'));
    expect(con.output()).toContain(yoursUnderPrefixMessage('mcp__designerpunk-docs'));
  });

  test('when our keys change: re-serialized with insertion order preserved and 2-space indentation', async () => {
    birthKeys(scratch, pkgDir, { kiroServers: { 'aaa-first': CONSUMER_SERVER } });
    setTools(pkgDir, UPDATED_TOOLS);
    const orderBefore = Object.keys(readJson(scratch, '.kiro/settings/mcp.json').mcpServers);
    await runSync({ projectRoot: scratch, apply: true, isTTY: false });
    const text = readText(scratch, '.kiro/settings/mcp.json');
    expect(Object.keys(JSON.parse(text).mcpServers)).toEqual(orderBefore);
    expect(text).toBe(JSON.stringify(JSON.parse(text), null, 2) + '\n');
  });

  describe.each(KEY_SURFACES.map((s) => [s.file, s] as const))('%s', (file, surface) => {
    test('our keys unchanged → the file bytes are unchanged (no write), even with hand formatting', async () => {
      birthKeys(scratch, pkgDir, {
        kiroServers: { 'my-server': CONSUMER_SERVER },
        ccServers: { 'my-server': CONSUMER_SERVER },
        allow: CONSUMER_ALLOW,
      });
      // Hand-reformat: 4-space indent, no trailing newline — a re-serialize WOULD change bytes.
      const reformatted = JSON.stringify(readJson(scratch, file), null, 4);
      writeFile(scratch, file, reformatted);
      const mtimeBefore = fs.statSync(path.join(scratch, file)).mtimeMs;

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(readText(scratch, file)).toBe(reformatted);
      expect(fs.statSync(path.join(scratch, file)).mtimeMs).toBe(mtimeBefore);
      expect(out.applied.filter((a) => a.startsWith(`${file}#`))).toHaveLength(0);
    });

    test('deleting our key → deleted-by-you (reported, never re-added)', async () => {
      birthKeys(scratch, pkgDir);
      const doc = readJson(scratch, file);
      let removedKey: string;
      if (surface.shape === 'mcpServers') {
        removedKey = 'designerpunk-docs';
        delete doc.mcpServers[removedKey];
      } else {
        removedKey = doc.permissions.allow[0];
        doc.permissions.allow = doc.permissions.allow.slice(1);
      }
      writeFile(scratch, file, JSON.stringify(doc, null, 2) + '\n');
      const bytes = readText(scratch, file);

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(con.output()).toContain(deletedByYouMessage(`${file}#${removedKey}`));
      expect(readText(scratch, file)).toBe(bytes);
      expect(out.applied).not.toContain(`${file}#${removedKey}`);
    });

    if (surface.shape === 'mcpServers') {
      test('editing our key → conflict (reported, never overwritten)', async () => {
        birthKeys(scratch, pkgDir);
        setTools(pkgDir, UPDATED_TOOLS); // Kiro: the package ALSO changed the key (three-way); CC: only she did
        const doc = readJson(scratch, file);
        doc.mcpServers['designerpunk-docs'].env = { ...(doc.mcpServers['designerpunk-docs'].env ?? {}), MINE: 'edited' };
        writeFile(scratch, file, JSON.stringify(doc, null, 2) + '\n');
        const bytes = readText(scratch, file);

        const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

        expect(con.output()).toContain(`${file}#designerpunk-docs — you edited DesignerPunk's key`);
        expect(out.applied).not.toContain(`${file}#designerpunk-docs`);
        expect(JSON.parse(readText(scratch, file)).mcpServers['designerpunk-docs'].env.MINE).toBe('edited');
        // Only the docs key differs from the package, and it is hers now — so the file is not written at all.
        expect(readText(scratch, file)).toBe(bytes);
      });
    } else {
      test('editing an allow entry reads as deleted-by-you + yours (identity is the string)', async () => {
        birthKeys(scratch, pkgDir);
        const doc = readJson(scratch, file);
        const original = doc.permissions.allow[0];
        doc.permissions.allow[0] = `${original}_edited`;
        writeFile(scratch, file, JSON.stringify(doc, null, 2) + '\n');

        await runSync({ projectRoot: scratch, apply: true, isTTY: false });

        expect(con.output()).toContain(deletedByYouMessage(`${file}#${original}`));
        expect(con.output()).toContain(yoursUnderPrefixMessage(`${original}_edited`));
        expect(readJson(scratch, file).permissions.allow).toContain(`${original}_edited`);
      });
    }
  });

  test('the key hash is sha256(JSON.stringify(value)) — the contract init records against', () => {
    expect(hashKeyValue({ a: 1 })).toBe(require('crypto').createHash('sha256').update('{"a":1}').digest('hex'));
  });
});
