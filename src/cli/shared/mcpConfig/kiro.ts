/**
 * Kiro's per-harness MCP config emitter (Spec 123 Task 4; design.md § "C8.
 * Per-harness MCP configuration + approvals"; requirements.md Reqs 5.3, 5.4,
 * 7.1–7.4, 15A.1).
 *
 * Extracted from `src/cli/init.ts` (Task 2's `scaffoldKiroMcpConfig`, which
 * carried a KNOWN INTERIM approval source — the static template's
 * hand-authored `autoApprove` arrays; see `task-2-3-completion.md` § "Notes
 * for Task 4"). This module keeps the SAME output shape and the SAME
 * create/merge-carefully behavior; the only thing it changes is the approval
 * SOURCE: `autoApprove` is now GENERATED from `dist/mcp/tool-manifest.json`'s
 * `readOnlyHint`-annotated tool registrations (C8: "ANNOTATIONS, not a hand
 * list"), never a hand-maintained array.
 */

import * as fs from 'fs';
import * as path from 'path';
import { existingMcpEntryMessage } from '../errorCatalog';

/** Structural — satisfied by `init.ts`'s `ManifestBuilder` without importing it (avoids a circular import). */
export interface McpConfigManifestRecorder {
  recordKey(relPath: string, key: string, value: unknown): void;
  recordFile(relPath: string, absPath: string, origin: 'copy' | 'generated' | 'emitted-key'): void;
}

/** A server entry from `mcp-config.json.template`, connection wiring only (no `autoApprove` — Task 4 computes it). */
export interface McpServerTemplateEntry {
  command: string;
  args: string[];
  env?: Record<string, string>;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface McpConfigTemplate {
  mcpServers: Record<string, McpServerTemplateEntry>;
}

interface ToolManifestEntry {
  name: string;
  readOnlyHint: boolean;
}

interface ToolManifestFile {
  servers?: Record<string, ToolManifestEntry[]>;
}

/**
 * Read `dist/mcp/tool-manifest.json` (built by `scripts/build-tool-manifest.ts`
 * at `npm run build:mcp` — Task 4.2) and return the tool NAMES this server key
 * has `readOnlyHint: true` for. Fails soft with a warning (never throws) —
 * mirrors `readMcpTemplate`'s existing defensive pattern, since a missing or
 * unreadable manifest should degrade to an empty approval list, not crash `init`.
 */
export function readApprovedToolNames(pkgRoot: string, serverKey: string): string[] {
  const manifestPath = path.join(pkgRoot, 'dist/mcp/tool-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.log(`  warning: MCP tool manifest not found at ${manifestPath}; '${serverKey}' will scaffold with NO auto-approved tools. Run 'npm run build' in the package.`);
    return [];
  }
  let manifest: ToolManifestFile;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  } catch {
    console.log(`  warning: MCP tool manifest at ${manifestPath} is not valid JSON; '${serverKey}' will scaffold with NO auto-approved tools.`);
    return [];
  }
  const entries = manifest.servers?.[serverKey] ?? [];
  return entries.filter((tool) => tool.readOnlyHint === true).map((tool) => tool.name);
}

/**
 * Scaffold Kiro's `.kiro/settings/mcp.json` from the parsed template plus a
 * GENERATED per-server `autoApprove` (Spec 102 Gap 5's output shape, Spec 123
 * Task 4's approval source). `template` is already parsed/validated by the
 * caller (`init.ts`'s `readMcpTemplate`) — this module owns approval
 * generation and the merge behavior, not template loading.
 *
 * Three behaviors depending on destination state:
 * 1. **Destination doesn't exist** → create from template + generated approvals.
 * 2. **Destination exists, neither DesignerPunk entry present** → merge.
 * 3. **Destination exists, one or both DesignerPunk entries already present** →
 *    skip the conflicting entries with a prominent warning (partial merge).
 */
export function scaffoldKiroMcpConfig(
  template: McpConfigTemplate,
  destPath: string,
  manifest: McpConfigManifestRecorder,
  repoRoot: string,
  pkgRoot: string,
): void {
  const withApprovals: Record<string, McpServerTemplateEntry> = {};
  for (const [key, value] of Object.entries(template.mcpServers)) {
    withApprovals[key] = { ...value, autoApprove: readApprovedToolNames(pkgRoot, key) };
  }

  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, JSON.stringify({ mcpServers: withApprovals }, null, 2) + '\n', 'utf-8');
    const keys = Object.keys(withApprovals);
    console.log(`✓ Created .kiro/settings/mcp.json (${keys.join(' + ')})`);
    for (const key of keys) manifest.recordKey(path.relative(repoRoot, destPath), key, withApprovals[key]);
    return;
  }

  let existing: { mcpServers?: Record<string, unknown>; [key: string]: unknown };
  try {
    existing = JSON.parse(fs.readFileSync(destPath, 'utf-8'));
  } catch {
    console.log(`  warning: .kiro/settings/mcp.json exists but is not valid JSON; leaving unchanged`);
    return;
  }
  if (!existing.mcpServers || typeof existing.mcpServers !== 'object') {
    existing.mcpServers = {};
  }

  const added: string[] = [];
  const skipped: string[] = [];
  for (const [key, value] of Object.entries(withApprovals)) {
    if (key in (existing.mcpServers as Record<string, unknown>)) {
      skipped.push(key);
    } else {
      (existing.mcpServers as Record<string, unknown>)[key] = value;
      added.push(key);
      manifest.recordKey(path.relative(repoRoot, destPath), key, value);
    }
  }

  if (added.length > 0) {
    fs.writeFileSync(destPath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
    console.log(`✓ .kiro/settings/mcp.json: added ${added.join(' + ')}`);
  } else if (skipped.length === Object.keys(withApprovals).length) {
    console.log(`  skipped: .kiro/settings/mcp.json (all DesignerPunk entries already present)`);
  }
  for (const key of skipped) {
    console.log(`  ⚠️  ${existingMcpEntryMessage('.kiro/settings/mcp.json', key, 'kiro')}`);
  }
}
