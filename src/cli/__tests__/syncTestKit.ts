/**
 * Shared fixture kit for the Spec 123 Task 5 `sync` suites (not a test file).
 *
 * Builds a scratch consumer repo with a fake installed `@3fn/core` under
 * `node_modules/` (resolved by `PackageResolver` exactly as in a real install),
 * the package's real MCP config template, and a controllable tool manifest.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { computePackageKeys, hashKeyValue, keyEntryId, KEY_SURFACES } from '../sync/KeyGrain';
import { serializeManifest } from '../sync/Manifest';
import type { DesignerPunkManifest, ManifestEntry } from '../sync/Manifest';

export const REPO_ROOT = path.resolve(__dirname, '../../..');

export function createScratch(prefix = 'dp-sync-'): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), prefix)));
}

export function sha(content: string | Buffer): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export type ToolSet = Record<string, Array<{ name: string; readOnlyHint: boolean }>>;

export const BASE_TOOLS: ToolSet = {
  'designerpunk-docs': [
    { name: 'find_docs', readOnlyHint: true },
    { name: 'get_section', readOnlyHint: true },
    { name: 'rebuild_index', readOnlyHint: false },
  ],
  'designerpunk-application': [
    { name: 'get_component_full', readOnlyHint: true },
    { name: 'rebuild_index', readOnlyHint: false },
  ],
  'designerpunk-product': [{ name: 'get_screen', readOnlyHint: true }],
};

/** Install a fake `@3fn/core` into `<scratch>/node_modules/@3fn/core`. Returns the package root. */
export function setupPackage(
  scratch: string,
  opts: { version?: string; tools?: ToolSet | null; files?: Record<string, string>; template?: boolean } = {},
): string {
  const pkgDir = path.join(scratch, 'node_modules', '@3fn', 'core');
  fs.mkdirSync(pkgDir, { recursive: true });
  fs.writeFileSync(path.join(pkgDir, 'package.json'), JSON.stringify({ name: '@3fn/core', version: opts.version ?? '15.0.0' }));
  if (opts.template !== false) {
    writeFile(pkgDir, 'src/cli/templates/mcp-config.json.template',
      fs.readFileSync(path.join(REPO_ROOT, 'src/cli/templates/mcp-config.json.template'), 'utf-8'));
  }
  if (opts.tools !== null) setTools(pkgDir, opts.tools ?? BASE_TOOLS);
  for (const [rel, content] of Object.entries(opts.files ?? {})) writeFile(pkgDir, rel, content);
  return pkgDir;
}

export function setTools(pkgDir: string, tools: ToolSet): void {
  writeFile(pkgDir, 'dist/mcp/tool-manifest.json', JSON.stringify({ generatedAt: 'fixture', servers: tools }, null, 2));
}

export function writeFile(root: string, rel: string, content: string | Buffer): void {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

export function readText(root: string, rel: string): string {
  return fs.readFileSync(path.join(root, rel), 'utf-8');
}

export function readJson<T = any>(root: string, rel: string): T {
  return JSON.parse(readText(root, rel));
}

/** Hash of every file (path + bytes) under `rel` — "directory hash unchanged" instrument. Excludes node_modules. */
export function dirHash(root: string, rel = '.'): { hash: string; files: number } {
  const h = crypto.createHash('sha256');
  let files = 0;
  const walk = (dir: string) => {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      if (e.name === 'node_modules') continue;
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) walk(abs);
      else if (e.isFile()) {
        files++;
        h.update(path.relative(root, abs));
        h.update('\0');
        h.update(fs.readFileSync(abs));
        h.update('\0');
      }
    }
  };
  walk(path.join(root, rel));
  return { hash: h.digest('hex'), files };
}

/**
 * Write a born repo's key-grain state as `init` would: the three surfaces with
 * DesignerPunk's keys (plus any consumer extras) and a manifest recording ours.
 */
export function birthKeys(
  scratch: string,
  pkgDir: string,
  extras: { kiroServers?: Record<string, unknown>; ccServers?: Record<string, unknown>; allow?: string[] } = {},
  extraEntries: Record<string, ManifestEntry> = {},
): DesignerPunkManifest {
  const computed = computePackageKeys(pkgDir, ['cc', 'kiro']);
  if (computed.kind !== 'ok') throw new Error(computed.reason);
  const entries: Record<string, ManifestEntry> = { ...extraEntries };
  for (const surface of KEY_SURFACES) {
    const keys = computed.keys.get(surface.file)!;
    for (const [k, v] of keys) entries[keyEntryId(surface.file, k)] = { hash: hashKeyValue(v), grain: 'key', origin: 'emitted-key' };
  }
  const kiro = Object.fromEntries(computed.keys.get('.kiro/settings/mcp.json')!);
  const cc = Object.fromEntries(computed.keys.get('.mcp.json')!);
  const allow = [...computed.keys.get('.claude/settings.json')!.keys()];
  writeFile(scratch, '.kiro/settings/mcp.json', JSON.stringify({ mcpServers: { ...(extras.kiroServers ?? {}), ...kiro } }, null, 2) + '\n');
  writeFile(scratch, '.mcp.json', JSON.stringify({ mcpServers: { ...(extras.ccServers ?? {}), ...cc } }, null, 2) + '\n');
  writeFile(scratch, '.claude/settings.json', JSON.stringify({ permissions: { allow: [...(extras.allow ?? []), ...allow] } }, null, 2) + '\n');
  const manifest: DesignerPunkManifest = {
    version: '1',
    posture: 'born',
    installedVersion: '15.0.0',
    contractHash: '',
    attachedTargets: ['cc', 'kiro'],
    entries,
  };
  writeFile(scratch, 'designerpunk.manifest.json', serializeManifest(manifest));
  return manifest;
}

/** Silence console for a suite; returns a getter for everything logged. */
export function captureConsole(): { output: () => string; restore: () => void } {
  const log = jest.spyOn(console, 'log').mockImplementation(() => {});
  const err = jest.spyOn(console, 'error').mockImplementation(() => {});
  return {
    output: () => [...log.mock.calls, ...err.mock.calls].map((c) => c.join(' ')).join('\n'),
    restore: () => {
      log.mockRestore();
      err.mockRestore();
    },
  };
}

/**
 * A stub of `sync`'s agent-layer seam (Task 16.5): the package side of the generated surfaces, per target,
 * without the real `emitConsumer` bundle. Declares `cc` and `kiro`.
 */
export function stubAgentLayer(
  byTarget: Record<string, Array<{ path: string; content: string; grain?: 'file' | 'region' }>>,
): import('../sync').AgentLayerSource {
  return {
    declaredTargets: () => ['cc', 'kiro'],
    emit: async (target: string) => ({
      files: (byTarget[target] ?? []).map((f) => ({ path: f.path, content: f.content, grain: f.grain ?? 'file' })),
      warnings: [],
    }),
  };
}
