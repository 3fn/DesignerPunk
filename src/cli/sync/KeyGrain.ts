/**
 * Key-grain JSON management — Spec 123 Task 5.3 (design.md § "C7" managed-set
 * rows `.mcp.json`, `.kiro/settings/mcp.json`, `.claude/settings.json`; the
 * namespace rule; tasks.md § "Open inputs" 5.3 — reading = PARSED VALUES).
 *
 * THREE SHAPES:
 *  - `mcpServers.<key>` in `.kiro/settings/mcp.json` (Kiro) and `.mcp.json` (CC);
 *  - the `permissions.allow` ARRAY-ENTRY grain in `.claude/settings.json` (CC) —
 *    an entry's identity IS its string, so the entry is both key and value.
 *
 * The reading, as decided:
 *  - consumer entries survive by PARSED VALUE — we never read or write a key the
 *    manifest did not record as emitted (a key under our prefix that we never
 *    emitted is HERS: reported once, never managed or removed);
 *  - when our keys are unchanged, the file is NOT WRITTEN (zero bytes change);
 *  - when our keys change, the file is re-serialized with insertion order
 *    preserved and 2-space indentation — whitespace may normalize on that write
 *    only.
 *
 * The PACKAGE side is the emitters' own output (`shared/mcpConfig/{kiro,cc}.ts`
 * run against a scratch directory for the manifest's `attachedTargets`), so the
 * value `sync` compares against is exactly what `init` writes — no second copy
 * of the emission shape to drift.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import type { HarnessTarget, ManifestEntry } from './Manifest';
import { scaffoldKiroMcpConfig } from '../shared/mcpConfig/kiro';
import type { McpConfigTemplate } from '../shared/mcpConfig/kiro';
import { scaffoldClaudeCodeMcpConfig } from '../shared/mcpConfig/cc';

export type KeyShape = 'mcpServers' | 'permissionsAllow';

export interface KeySurface {
  /** Project-relative, forward-slash. */
  file: string;
  target: HarnessTarget;
  shape: KeyShape;
}

/** The three key-grain surfaces (C7 / C8). */
export const KEY_SURFACES: KeySurface[] = [
  { file: '.kiro/settings/mcp.json', target: 'kiro', shape: 'mcpServers' },
  { file: '.mcp.json', target: 'cc', shape: 'mcpServers' },
  { file: '.claude/settings.json', target: 'cc', shape: 'permissionsAllow' },
];

/** The self-label for keys (the namespace rule: prefix for keys and files). */
export const SERVER_KEY_PREFIX = 'designerpunk-';
export const ALLOW_ENTRY_PREFIX = 'mcp__designerpunk-';

/**
 * The key-entry hash. MUST equal `init.ts`'s `ManifestBuilder.recordKey`
 * (`sha256(JSON.stringify(value))`) — asserted by the init→sync no-op test.
 */
export function hashKeyValue(value: unknown): string {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

export function keyEntryId(file: string, key: string): string {
  return `${file}#${key}`;
}

function isOurPrefix(shape: KeyShape, key: string): boolean {
  return shape === 'mcpServers' ? key.startsWith(SERVER_KEY_PREFIX) : key.startsWith(ALLOW_ENTRY_PREFIX);
}

// ---------------------------------------------------------------------------
// Reading the project side
// ---------------------------------------------------------------------------

export type ProjectKeyRead =
  | { kind: 'absent' }
  | { kind: 'invalid'; error: string }
  | { kind: 'ok'; keys: Map<string, unknown> };

/** Read every key of a surface's shape (consumer keys included — classification filters). */
export function readProjectKeys(projectRoot: string, surface: KeySurface): ProjectKeyRead {
  const abs = path.join(projectRoot, surface.file);
  if (!fs.existsSync(abs)) return { kind: 'absent' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  } catch (err) {
    return { kind: 'invalid', error: (err as Error).message };
  }
  const keys = new Map<string, unknown>();
  if (surface.shape === 'mcpServers') {
    const servers = (parsed as { mcpServers?: unknown })?.mcpServers;
    if (servers && typeof servers === 'object' && !Array.isArray(servers)) {
      for (const [k, v] of Object.entries(servers as Record<string, unknown>)) keys.set(k, v);
    }
  } else {
    const allow = (parsed as { permissions?: { allow?: unknown } })?.permissions?.allow;
    if (Array.isArray(allow)) {
      for (const entry of allow) if (typeof entry === 'string') keys.set(entry, entry);
    }
  }
  return { kind: 'ok', keys };
}

// ---------------------------------------------------------------------------
// The package side
// ---------------------------------------------------------------------------

export type PackageKeys = Map<string /* file */, Map<string /* key */, unknown>>;

export type PackageKeyCompute =
  | { kind: 'ok'; keys: PackageKeys }
  | { kind: 'unavailable'; reason: string };

/**
 * Generate the package side for `attachedTargets` by running the emitters
 * against a scratch directory and capturing every key they record.
 *
 * Refuses (returns `unavailable`) when the package's template or tool manifest
 * is missing: the emitters fail SOFT there (empty approval lists), and a
 * soft-failed package side would read as "the package now approves nothing"
 * and propose stripping the consumer's approvals.
 */
export function computePackageKeys(pkgRoot: string, attachedTargets: HarnessTarget[]): PackageKeyCompute {
  const templatePath = path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template');
  const toolManifestPath = path.join(pkgRoot, 'dist/mcp/tool-manifest.json');
  if (!fs.existsSync(templatePath)) {
    return { kind: 'unavailable', reason: `the package's MCP config template is missing (${templatePath})` };
  }
  if (!fs.existsSync(toolManifestPath)) {
    return { kind: 'unavailable', reason: `the package's tool manifest is missing (${toolManifestPath})` };
  }
  let template: McpConfigTemplate;
  try {
    template = JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  } catch {
    return { kind: 'unavailable', reason: `the package's MCP config template is not valid JSON (${templatePath})` };
  }

  const keys: PackageKeys = new Map();
  for (const s of KEY_SURFACES) if (attachedTargets.includes(s.target)) keys.set(s.file, new Map());
  if (keys.size === 0) return { kind: 'ok', keys };

  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-sync-keys-'));
  const recorder = {
    recordKey(relPath: string, key: string, value: unknown): void {
      const file = relPath.split(path.sep).join('/');
      keys.get(file)?.set(key, value);
    },
    recordFile(): void {
      /* file-grain records are not key-grain package values */
    },
  };
  const originalLog = console.log;
  console.log = () => {};
  try {
    if (attachedTargets.includes('kiro')) {
      scaffoldKiroMcpConfig(template, path.join(scratch, '.kiro/settings/mcp.json'), recorder, scratch, pkgRoot);
    }
    if (attachedTargets.includes('cc')) {
      scaffoldClaudeCodeMcpConfig(template, scratch, recorder, pkgRoot);
    }
  } finally {
    console.log = originalLog;
    fs.rmSync(scratch, { recursive: true, force: true });
  }
  return { kind: 'ok', keys };
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

export type KeyClassification =
  | 'new'
  | 'updated-safe'
  | 'conflict'
  | 'unchanged'
  | 'removed'
  | 'deleted-by-you'
  | 'untracked-new';

export interface ClassifiedKey {
  surface: KeySurface;
  key: string;
  classification: KeyClassification;
  /** The package value (absent for `removed`). */
  packageValue?: unknown;
}

export interface SurfaceKeyResult {
  surface: KeySurface;
  classified: ClassifiedKey[];
  /** Keys under our prefix the manifest never recorded — HERS (namespace rule). */
  yoursUnderPrefix: string[];
  /** Manifest entry ids whose package key AND project key are both gone (dropped silently). */
  dropEntries: string[];
  /** Set when the project file exists but is not valid JSON — nothing is classified. */
  invalid?: string;
}

/**
 * Classify one surface. Only keys the package emits or the manifest recorded
 * are ever classified; every other key in the file is the consumer's.
 */
export function classifySurfaceKeys(
  surface: KeySurface,
  packageKeys: Map<string, unknown>,
  project: ProjectKeyRead,
  manifestEntries: Record<string, ManifestEntry>,
): SurfaceKeyResult {
  const result: SurfaceKeyResult = { surface, classified: [], yoursUnderPrefix: [], dropEntries: [] };
  if (project.kind === 'invalid') {
    result.invalid = project.error;
    return result;
  }
  const projectKeys = project.kind === 'ok' ? project.keys : new Map<string, unknown>();

  const prefix = `${surface.file}#`;
  const recorded = new Map<string, ManifestEntry>();
  for (const [id, entry] of Object.entries(manifestEntries)) {
    if (entry.grain === 'key' && id.startsWith(prefix)) recorded.set(id.slice(prefix.length), entry);
  }
  const surfaceAttached = recorded.size > 0;

  for (const [key, pkgValue] of packageKeys) {
    const entry = recorded.get(key);
    const pkgHash = hashKeyValue(pkgValue);
    const inProject = projectKeys.has(key);
    const push = (classification: KeyClassification) =>
      result.classified.push({ surface, key, classification, packageValue: pkgValue });

    if (entry) {
      if (!inProject) {
        push('deleted-by-you');
        continue;
      }
      const projHash = hashKeyValue(projectKeys.get(key));
      if (projHash === pkgHash) push('unchanged');
      else if (projHash === entry.hash) push('updated-safe');
      else push('conflict');
    } else if (inProject) {
      // Present, under our name, never recorded as emitted → hers.
      result.yoursUnderPrefix.push(key);
    } else {
      push(surfaceAttached ? 'new' : 'untracked-new');
    }
  }

  // Recorded keys the package no longer emits.
  for (const [key] of recorded) {
    if (packageKeys.has(key)) continue;
    if (projectKeys.has(key)) {
      result.classified.push({ surface, key, classification: 'removed' });
    } else {
      result.dropEntries.push(keyEntryId(surface.file, key));
    }
  }

  // Keys under our prefix that we neither emit nor recorded → hers.
  for (const key of projectKeys.keys()) {
    if (packageKeys.has(key) || recorded.has(key)) continue;
    if (isOurPrefix(surface.shape, key)) result.yoursUnderPrefix.push(key);
  }
  return result;
}

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

/**
 * Set `edits` (our keys only) into the surface file. Returns true iff the file
 * was written. No write when every edit is already present with an equal parsed
 * value. Insertion order is preserved (an existing key keeps its position; a new
 * key is appended); 2-space indentation.
 */
export function writeSurfaceKeys(
  projectRoot: string,
  surface: KeySurface,
  edits: Array<{ key: string; value: unknown }>,
): boolean {
  if (edits.length === 0) return false;
  const abs = path.join(projectRoot, surface.file);
  let doc: Record<string, unknown> = {};
  if (fs.existsSync(abs)) {
    doc = JSON.parse(fs.readFileSync(abs, 'utf-8'));
  }
  let changed = false;
  if (surface.shape === 'mcpServers') {
    if (!doc.mcpServers || typeof doc.mcpServers !== 'object' || Array.isArray(doc.mcpServers)) {
      doc.mcpServers = {};
      changed = true;
    }
    const servers = doc.mcpServers as Record<string, unknown>;
    for (const { key, value } of edits) {
      if (key in servers && hashKeyValue(servers[key]) === hashKeyValue(value)) continue;
      servers[key] = value;
      changed = true;
    }
  } else {
    if (!doc.permissions || typeof doc.permissions !== 'object' || Array.isArray(doc.permissions)) {
      doc.permissions = {};
      changed = true;
    }
    const perms = doc.permissions as Record<string, unknown>;
    if (!Array.isArray(perms.allow)) {
      perms.allow = [];
      changed = true;
    }
    const allow = perms.allow as unknown[];
    for (const { key } of edits) {
      if (allow.includes(key)) continue;
      allow.push(key);
      changed = true;
    }
  }
  if (!changed) return false;
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, JSON.stringify(doc, null, 2) + '\n', 'utf-8');
  return true;
}
