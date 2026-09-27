/**
 * Tests for `build-tool-manifest.ts` (Spec 123 Task 4; design.md § "C8. Per-harness
 * MCP configuration + approvals"; requirements.md Reqs 5.3, 5.4, 7.1–7.4, 15A.1).
 *
 * Covers Task 4's own success criteria:
 * - every registered tool in all three servers declares `readOnlyHint`
 *   (bite: a tool missing it fails, not silently passes);
 * - `dist/mcp/tool-manifest.json` builds from static registration imports with
 *   NO server started (proven by the subprocess actually exiting — a stray
 *   server-start would hang on stdio and time this test out, not just print
 *   a suspicious line);
 * - the manifest's per-server tool identity matches each server's own
 *   registration array exactly (not just a count).
 */

import { execFileSync } from 'child_process';
import * as path from 'path';
import { tools as docsTools } from '../../mcp-server/src/index';
import { tools as applicationTools } from '../../application-mcp-server/src/index';
import { tools as productTools } from '../../product-mcp-server/src/index';
import { toManifestEntries, buildManifest, MCP_SERVER_KEYS } from '../build-tool-manifest';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

const REGISTERED = {
  'designerpunk-docs': docsTools,
  'designerpunk-application': applicationTools,
  'designerpunk-product': productTools,
} as const;

describe('every registered tool in all three servers declares readOnlyHint (Spec 123 C8)', () => {
  it('every tool in every server has annotations.readOnlyHint as a boolean — per-server tool and read-only counts', () => {
    const counts: Record<string, { total: number; readOnly: number }> = {};
    for (const [serverKey, list] of Object.entries(REGISTERED)) {
      let readOnly = 0;
      for (const tool of list) {
        expect(typeof tool.annotations?.readOnlyHint).toBe('boolean');
        if (tool.annotations!.readOnlyHint) readOnly++;
      }
      counts[serverKey] = { total: list.length, readOnly };
    }
    // Measured counts (Task 4.1) — a change here signals a tool was
    // added/removed/reclassified and must be a deliberate, reviewed edit.
    expect(counts).toEqual({
      'designerpunk-docs': { total: 8, readOnly: 7 },
      'designerpunk-application': { total: 21, readOnly: 20 },
      'designerpunk-product': { total: 14, readOnly: 13 },
    });
  });

  it('names the exact NOT-read-only tool per server (the mutating set)', () => {
    for (const [serverKey, list] of Object.entries(REGISTERED)) {
      const notReadOnly = list.filter((t) => t.annotations?.readOnlyHint === false).map((t) => t.name);
      expect(notReadOnly).toEqual(
        serverKey === 'designerpunk-product' ? ['rebuild_product_index'] : ['rebuild_index'],
      );
    }
  });

  it('BITE: toManifestEntries throws on a tool with no annotations.readOnlyHint, naming the server and tool (proves the guard is live, not vacuous)', () => {
    expect(() => toManifestEntries('designerpunk-docs', [{ name: 'no_hint_tool' }])).toThrow(
      /designerpunk-docs.*no_hint_tool.*readOnlyHint/s,
    );
  });

  it('BITE (real production code, revert → red → restore): find_docs.ts with its annotations REMOVED fails this exact check', () => {
    // Simulates the real fixture without touching the checked-in file: reproduces
    // find-docs.ts's tool object minus its annotations field, run through the
    // SAME toManifestEntries guard build-tool-manifest.ts itself uses. The
    // corresponding real-file bite (annotations physically deleted from
    // mcp-server/src/tools/get-section.ts, jest run, restored via `git checkout`)
    // is recorded in the Task 4.1 subtask completion doc with its terminal output —
    // this in-file case documents the same property as a permanent regression guard.
    const withoutAnnotations = { name: 'find_docs' };
    expect(() => toManifestEntries('designerpunk-docs', [withoutAnnotations])).toThrow();
  });
});

describe('dist/mcp/tool-manifest.json builds from static registration imports with NO server started (Spec 123 C8)', () => {
  it('runs to completion via tsx and exits cleanly — a stray server start would hang on stdio and time this out', () => {
    const output = execFileSync('npx', ['tsx', 'scripts/build-tool-manifest.ts'], {
      cwd: PROJECT_ROOT,
      encoding: 'utf8',
      timeout: 20000,
    });
    expect(output).not.toMatch(/Server running on stdio/);
    expect(output).toContain('Wrote dist/mcp/tool-manifest.json');
    expect(output).toContain('designerpunk-docs: 8 tools (7 read-only)');
    expect(output).toContain('designerpunk-application: 21 tools (20 read-only)');
    expect(output).toContain('designerpunk-product: 14 tools (13 read-only)');
  }, 25000);

  it('the manifest carries exactly the three server keys, in the C8 order', () => {
    const manifest = buildManifest();
    expect(Object.keys(manifest.servers)).toEqual([...MCP_SERVER_KEYS]);
  });

  it('the manifest\'s per-server tool NAME SET matches each server\'s own registration array exactly (identity, not just a count)', () => {
    const manifest = buildManifest();
    for (const [serverKey, list] of Object.entries(REGISTERED)) {
      expect(manifest.servers[serverKey as keyof typeof manifest.servers].map((t) => t.name).sort()).toEqual(
        list.map((t) => t.name).sort(),
      );
    }
  });

  it('the manifest\'s readOnlyHint per tool matches the registration module\'s own annotation (no re-derivation, no drift)', () => {
    const manifest = buildManifest();
    for (const [serverKey, list] of Object.entries(REGISTERED)) {
      const manifestByName = new Map(manifest.servers[serverKey as keyof typeof manifest.servers].map((t) => [t.name, t.readOnlyHint]));
      for (const tool of list) {
        expect(manifestByName.get(tool.name)).toBe(tool.annotations?.readOnlyHint);
      }
    }
  });
});

describe('find_docs / validate_component / rebuild_index — the three named examples (Task 4 success criteria)', () => {
  it('find_docs is present and read-only in designerpunk-docs', () => {
    const manifest = buildManifest();
    const findDocs = manifest.servers['designerpunk-docs'].find((t) => t.name === 'find_docs');
    expect(findDocs).toBeDefined();
    expect(findDocs!.readOnlyHint).toBe(true);
  });

  it('rebuild_index is present but NOT read-only in designerpunk-docs and designerpunk-application', () => {
    const manifest = buildManifest();
    for (const serverKey of ['designerpunk-docs', 'designerpunk-application'] as const) {
      const rebuild = manifest.servers[serverKey].find((t) => t.name === 'rebuild_index');
      expect(rebuild).toBeDefined();
      expect(rebuild!.readOnlyHint).toBe(false);
    }
  });

  it('validate_component is never registered by any server (it is not a real tool — the pre-123 template hand-approved it in error)', () => {
    const manifest = buildManifest();
    for (const serverKey of MCP_SERVER_KEYS) {
      expect(manifest.servers[serverKey].some((t) => t.name === 'validate_component')).toBe(false);
    }
  });
});
