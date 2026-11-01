/**
 * Pre-123 MCP-config entries that `sync` leaves in place, reported and (under a flag) repaired.
 *
 * The record: `.kiro/issues/2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md`
 * (option 3, ruled by its owner 2026-10-25: report always, repair under a flag). The test01
 * upgrade rehearsal (Spec 131 evidence, F-8) found a migrated repo whose `.kiro/settings/mcp.json`
 * still pointed the application MCP at `COMPONENTS_DIR=./src/components/core`, the folder
 * `--migrate-components` had just deleted, while `sync` closed with its all-clear.
 *
 * WHICH ENTRIES. A `designerpunk-*` server entry in one of the shared candidate files
 * (`./mcpConfigCandidates`) that the manifest did NOT record as emitted. `attach` skips an entry
 * whose key is already present, so a pre-123 entry stays in place, unrecorded, and KeyGrain's
 * namespace rule ("we never read or write a key the manifest did not record as emitted") leaves it
 * alone. A RECORDED entry is KeyGrain's: it is classified and updated there, so it is skipped here
 * and nothing is reported twice.
 *
 * WHAT IS STALE, per entry:
 * - `COMPONENTS_DIR` / `COMPONENT_DIR` (the application and product servers' component root) that
 *   names the pre-123 `src/components/core`, or names a directory that does not exist (resolved
 *   against the project root), and differs from the package template's value;
 * - an `autoApprove` list (Kiro and Cursor entries; Claude Code's `.mcp.json` has none) that names
 *   a tool the server does not provide, or lacks a read-only tool the package approves.
 *
 * RECOMMENDATIONS COME FROM THE PACKAGE, never a second copy: the component root from the MCP
 * template (`src/cli/templates/mcp-config.json.template`, as `templateSteeringDir` reads it), and
 * the approvals from `dist/mcp/tool-manifest.json` (the source `readApprovedToolNames` reads). A
 * source that cannot be read gives no recommendation and no repair. With no readable tool
 * manifest the approval half is not checked at all, because staleness cannot be judged without the
 * server's tool list.
 *
 * THE REPAIR (`--repair-mcp-config`) is the consented exception to KeyGrain's rule. It rewrites
 * exactly the keys a finding names (`env.COMPONENTS_DIR`, `env.COMPONENT_DIR`, `autoApprove`) and
 * nothing else in the file. The approval rewrite keeps every tool the consumer approved that the
 * server still provides, drops the ones it does not, and adds the read-only ones missing. AFTER THE
 * REPAIR THE ENTRY STAYS UNRECORDED: the manifest is not touched, so the entry stays the
 * consumer's, and later syncs check it here again but never manage it. To hand an entry to sync's
 * management, delete it and run `npx designerpunk attach --target=<t>`, which writes and records the
 * package's emission.
 */

import * as fs from 'fs';
import * as path from 'path';
import { MCP_CONFIG_CANDIDATES } from './mcpConfigCandidates';
import { MCP_TEMPLATE_REL } from './SteeringDirCheck';

/** The pre-123 component root, which `--migrate-components` empties and removes. */
export const PRE_123_COMPONENTS_DIR = 'src/components/core';

/** The env keys that carry a server's component root (application: `COMPONENTS_DIR`; product: `COMPONENT_DIR`). */
export const COMPONENT_ROOT_ENV_KEYS: readonly string[] = ['COMPONENTS_DIR', 'COMPONENT_DIR'];

/** The tool manifest `init` and `attach` read the approvals from, relative to the package root. */
export const TOOL_MANIFEST_REL = 'dist/mcp/tool-manifest.json';

const SERVER_PREFIX = 'designerpunk-';

export interface ComponentRootFinding {
  kind: 'component-root';
  configPath: string;
  serverKey: string;
  envKey: string;
  currentValue: string;
  /** `pre-123`: names `src/components/core`; `missing`: the directory does not exist. */
  reason: 'pre-123' | 'missing';
  /** The template's value, or `null` when the template cannot be read or has no such key. */
  recommended: string | null;
}

export interface AutoApproveFinding {
  kind: 'auto-approve';
  configPath: string;
  serverKey: string;
  /** Approved names the server does not provide. */
  unknown: string[];
  /** Read-only tools the package approves that the list lacks. */
  missing: string[];
  /** The list after the repair: the consumer's names the server still provides, then the missing ones. */
  recommended: string[];
}

export type McpConfigFinding = ComponentRootFinding | AutoApproveFinding;

interface ToolEntry {
  name: string;
  readOnlyHint: boolean;
}

/** The package template's server entries, or `null` when it cannot be read. */
function readTemplateServers(pkgRoot: string): Record<string, { env?: Record<string, unknown> }> | null {
  try {
    const t = JSON.parse(fs.readFileSync(path.join(pkgRoot, MCP_TEMPLATE_REL), 'utf-8')) as {
      mcpServers?: Record<string, { env?: Record<string, unknown> }>;
    };
    return t.mcpServers && typeof t.mcpServers === 'object' ? t.mcpServers : null;
  } catch {
    return null;
  }
}

/** The tool manifest's per-server tool lists, or `null` when it cannot be read. */
function readToolManifest(pkgRoot: string): Record<string, ToolEntry[]> | null {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(pkgRoot, TOOL_MANIFEST_REL), 'utf-8')) as {
      servers?: Record<string, ToolEntry[]>;
    };
    return m.servers && typeof m.servers === 'object' ? m.servers : null;
  } catch {
    return null;
  }
}

/** True when the value names `src/components/core` as a path (with or without `./` and a trailing slash). */
function namesPre123Root(value: string): boolean {
  const norm = value.replace(/\\/g, '/').replace(/\/+$/, '');
  return norm === PRE_123_COMPONENTS_DIR || norm.endsWith(`/${PRE_123_COMPONENTS_DIR}`);
}

function readServers(abs: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(fs.readFileSync(abs, 'utf-8')) as { mcpServers?: unknown };
    const servers = parsed?.mcpServers;
    return servers && typeof servers === 'object' && !Array.isArray(servers) ? (servers as Record<string, unknown>) : null;
  } catch {
    // A malformed config is reported by KeyGrain (for the files it manages); not this check's to fix.
    return null;
  }
}

/**
 * Every stale pre-123 entry in the candidate files.
 *
 * @param recordedKeyIds manifest entry ids (`<file>#<key>`) of key-grain entries: those entries are
 *   KeyGrain's and are skipped.
 */
export function detectStaleMcpConfig(
  projectRoot: string,
  pkgRoot: string,
  recordedKeyIds: ReadonlySet<string>,
): McpConfigFinding[] {
  const template = readTemplateServers(pkgRoot);
  const tools = readToolManifest(pkgRoot);
  const findings: McpConfigFinding[] = [];

  for (const rel of MCP_CONFIG_CANDIDATES) {
    const abs = path.join(projectRoot, rel);
    if (!fs.existsSync(abs)) continue;
    const servers = readServers(abs);
    if (!servers) continue;

    for (const [serverKey, raw] of Object.entries(servers)) {
      if (!serverKey.startsWith(SERVER_PREFIX)) continue;
      if (recordedKeyIds.has(`${rel}#${serverKey}`)) continue;
      const entry = raw as { env?: Record<string, unknown>; autoApprove?: unknown };

      for (const envKey of COMPONENT_ROOT_ENV_KEYS) {
        const value = entry?.env?.[envKey];
        if (typeof value !== 'string') continue;
        const tv = template?.[serverKey]?.env?.[envKey];
        const recommended = typeof tv === 'string' && tv.length > 0 ? tv : null;
        let reason: ComponentRootFinding['reason'] | null = null;
        if (namesPre123Root(value)) reason = 'pre-123';
        else if (!fs.existsSync(path.resolve(projectRoot, value)) && value !== recommended) reason = 'missing';
        if (reason) findings.push({ kind: 'component-root', configPath: rel, serverKey, envKey, currentValue: value, reason, recommended });
      }

      if (Array.isArray(entry?.autoApprove) && tools && Array.isArray(tools[serverKey])) {
        const provided = new Set(tools[serverKey].map((t) => t.name));
        const approved = (entry.autoApprove as unknown[]).filter((n): n is string => typeof n === 'string');
        const unknown = approved.filter((n) => !provided.has(n));
        const missing = tools[serverKey].filter((t) => t.readOnlyHint === true && !approved.includes(t.name)).map((t) => t.name);
        if (unknown.length > 0 || missing.length > 0) {
          const recommended = [...approved.filter((n) => provided.has(n)), ...missing];
          findings.push({ kind: 'auto-approve', configPath: rel, serverKey, unknown, missing, recommended });
        }
      }
    }
  }
  return findings;
}

/** True when the repair can act on the finding (it has a package-sourced recommendation). */
export function isRepairable(f: McpConfigFinding): boolean {
  return f.kind === 'auto-approve' || f.recommended !== null;
}

/** The report lines (printed after the report, beside the steering warning). Empty when there is nothing to say. */
export function staleMcpConfigLines(findings: McpConfigFinding[]): string[] {
  if (findings.length === 0) return [];
  const lines = [
    `\n⚠ ${findings.length} pre-123 MCP-config setting${findings.length === 1 ? '' : 's'} that sync does not manage ` +
      `${findings.length === 1 ? 'is' : 'are'} out of date (entries an earlier init wrote; attach left them in place):`,
  ];
  for (const f of findings) {
    if (f.kind === 'component-root') {
      const why = f.reason === 'pre-123' ? `the pre-123 ${PRE_123_COMPONENTS_DIR}` : 'a directory that does not exist';
      lines.push(
        `    ${f.configPath} → ${f.serverKey}: ${f.envKey}="${f.currentValue}" names ${why} ` +
          (f.recommended !== null
            ? `(recommended: "${f.recommended}")`
            : `(no recommendation: the installed @3fn/core's ${MCP_TEMPLATE_REL} could not be read)`),
      );
    } else {
      const parts = [
        ...(f.unknown.length ? [`approves ${f.unknown.length} tool${f.unknown.length === 1 ? '' : 's'} the server does not provide (${f.unknown.join(', ')})`] : []),
        ...(f.missing.length ? [`lacks ${f.missing.length} read-only tool${f.missing.length === 1 ? '' : 's'} the package approves (${f.missing.join(', ')})`] : []),
      ];
      lines.push(`    ${f.configPath} → ${f.serverKey}: autoApprove ${parts.join('; ')}`);
    }
  }
  lines.push(
    findings.some(isRepairable)
      ? '    Run `npx designerpunk sync --repair-mcp-config` to rewrite only these settings (every other key stays as it is), or delete the entries and run `npx designerpunk attach --target=<t>`.'
      : '    Correct these settings by hand, or delete the entries and run `npx designerpunk attach --target=<t>`.',
  );
  return lines;
}

export interface McpConfigRepair {
  /** Project-relative files rewritten. */
  files: string[];
  /** `<file>#<server>.<key>` for each setting rewritten. */
  settings: string[];
}

/**
 * Rewrite exactly the settings the repairable findings name. Each file is parsed, edited and
 * written once (2-space JSON, as the steering fix writes); a file with nothing to change is not
 * written. The manifest is not touched (the entries stay unrecorded; see the header).
 */
export function applyMcpConfigRepair(projectRoot: string, findings: McpConfigFinding[]): McpConfigRepair {
  const out: McpConfigRepair = { files: [], settings: [] };
  const byFile = new Map<string, McpConfigFinding[]>();
  for (const f of findings.filter(isRepairable)) byFile.set(f.configPath, [...(byFile.get(f.configPath) ?? []), f]);

  for (const [rel, list] of byFile) {
    const abs = path.join(projectRoot, rel);
    let parsed: { mcpServers?: Record<string, { env?: Record<string, unknown>; autoApprove?: unknown }> };
    try {
      parsed = JSON.parse(fs.readFileSync(abs, 'utf-8'));
    } catch {
      continue;
    }
    let changed = false;
    for (const f of list) {
      const entry = parsed.mcpServers?.[f.serverKey];
      if (!entry) continue;
      if (f.kind === 'component-root') {
        if (!entry.env || entry.env[f.envKey] !== f.currentValue || f.recommended === null) continue;
        entry.env[f.envKey] = f.recommended;
        out.settings.push(`${rel}#${f.serverKey}.env.${f.envKey}`);
        changed = true;
      } else {
        if (!Array.isArray(entry.autoApprove)) continue;
        entry.autoApprove = f.recommended;
        out.settings.push(`${rel}#${f.serverKey}.autoApprove`);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(abs, JSON.stringify(parsed, null, 2) + '\n', 'utf-8');
      out.files.push(rel);
    }
  }
  return out;
}
