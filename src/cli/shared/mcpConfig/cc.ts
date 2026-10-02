/**
 * Claude Code's per-harness MCP config emitter (Spec 123 Task 4; design.md
 * § "C8. Per-harness MCP configuration + approvals"; requirements.md Reqs
 * 5.3, 5.4, 7.1–7.4, 15A.1).
 *
 * Extracted from `src/cli/init.ts` (Task 2's `scaffoldClaudeCodeMcpConfig`,
 * which carried a KNOWN INTERIM approval source — the static template's
 * hand-authored `autoApprove` arrays, reformatted to the `mcp__<server>__<tool>`
 * grain; see `task-2-3-completion.md` § "Notes for Task 4"). This module keeps
 * the SAME output shape (`.mcp.json` with no `autoApprove`/`disabled` fields —
 * CC has no per-server auto-approve field; `.claude/settings.json`
 * `permissions.allow`) and the SAME create/merge-carefully behavior; the only
 * thing it changes is the approval SOURCE: `permissions.allow` is now
 * GENERATED from `dist/mcp/tool-manifest.json`'s `readOnlyHint`-annotated tool
 * registrations, never a hand-maintained array.
 */

import * as fs from 'fs';
import * as path from 'path';
import { existingMcpEntryMessage } from '../errorCatalog';
import type { McpConfigManifestRecorder, McpConfigTemplate, McpServerTemplateEntry } from './kiro';
import { readApprovedToolNames } from './kiro';

/**
 * Scaffold Claude Code's `.mcp.json` (server config, no `autoApprove`/`disabled`
 * fields) plus the `.claude/settings.json` `permissions.allow` keys (Spec 123
 * Task 4, C8's approval-source replacement). `template` is already
 * parsed/validated by the caller (`init.ts`'s `readMcpTemplate`).
 */
export function scaffoldClaudeCodeMcpConfig(
  template: McpConfigTemplate,
  dest: string,
  manifest: McpConfigManifestRecorder,
  pkgRoot: string,
): void {
  // --- .mcp.json ---
  const mcpJsonPath = path.join(dest, '.mcp.json');
  const ccServers: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(template.mcpServers)) {
    const { autoApprove, disabled, ...rest } = value as McpServerTemplateEntry;
    void autoApprove; void disabled;
    ccServers[key] = rest;
  }

  if (!fs.existsSync(mcpJsonPath)) {
    fs.writeFileSync(mcpJsonPath, JSON.stringify({ mcpServers: ccServers }, null, 2) + '\n', 'utf-8');
    console.log(`✓ Created .mcp.json (${Object.keys(ccServers).join(' + ')})`);
    for (const key of Object.keys(ccServers)) manifest.recordKey('.mcp.json', key, ccServers[key]);
  } else {
    let existing: { mcpServers?: Record<string, unknown>; [key: string]: unknown };
    try {
      existing = JSON.parse(fs.readFileSync(mcpJsonPath, 'utf-8'));
    } catch {
      console.log(`  warning: .mcp.json exists but is not valid JSON; leaving unchanged`);
      existing = { mcpServers: {} };
    }
    if (!existing.mcpServers || typeof existing.mcpServers !== 'object') existing.mcpServers = {};
    const added: string[] = [];
    const skipped: string[] = [];
    for (const [key, value] of Object.entries(ccServers)) {
      if (key in (existing.mcpServers as Record<string, unknown>)) {
        skipped.push(key);
      } else {
        (existing.mcpServers as Record<string, unknown>)[key] = value;
        added.push(key);
        manifest.recordKey('.mcp.json', key, value);
      }
    }
    if (added.length > 0) {
      fs.writeFileSync(mcpJsonPath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
      console.log(`✓ .mcp.json: added ${added.join(' + ')}`);
    } else if (skipped.length === Object.keys(ccServers).length) {
      console.log(`  skipped: .mcp.json (all DesignerPunk entries already present)`);
    }
    for (const key of skipped) {
      console.log(`  ⚠️  ${existingMcpEntryMessage('.mcp.json', key, 'cc')}`);
    }
  }

  // --- .claude/settings.json (permissions.allow) — GENERATED from the tool
  // manifest's readOnlyHint (Spec 123 Task 4), never the template's autoApprove.
  const settingsPath = path.join(dest, '.claude/settings.json');
  const allowEntries: string[] = [];
  for (const serverKey of Object.keys(template.mcpServers)) {
    for (const tool of readApprovedToolNames(pkgRoot, serverKey)) {
      allowEntries.push(`mcp__${serverKey}__${tool}`);
    }
  }

  if (!fs.existsSync(settingsPath)) {
    fs.mkdirSync(path.dirname(settingsPath), { recursive: true });
    fs.writeFileSync(settingsPath, JSON.stringify({ permissions: { allow: allowEntries } }, null, 2) + '\n', 'utf-8');
    console.log(`✓ Created .claude/settings.json (${allowEntries.length} approved tools)`);
    // Key grain, one entry per allow string (Spec 123 Task 5.3 — C7's `permissions.allow` row).
    for (const entry of allowEntries) manifest.recordKey('.claude/settings.json', entry, entry);
    return;
  }

  let existingSettings: { permissions?: { allow?: string[]; [k: string]: unknown }; [key: string]: unknown };
  try {
    existingSettings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  } catch {
    console.log(`  warning: .claude/settings.json exists but is not valid JSON; leaving unchanged`);
    return;
  }
  if (!existingSettings.permissions || typeof existingSettings.permissions !== 'object') {
    existingSettings.permissions = {};
  }
  const existingAllow = Array.isArray(existingSettings.permissions.allow) ? existingSettings.permissions.allow : [];
  const newEntries = allowEntries.filter((e) => !existingAllow.includes(e));
  if (newEntries.length > 0) {
    existingSettings.permissions.allow = [...existingAllow, ...newEntries];
    fs.writeFileSync(settingsPath, JSON.stringify(existingSettings, null, 2) + '\n', 'utf-8');
    console.log(`✓ .claude/settings.json: added ${newEntries.length} approved tool(s)`);
    // Key grain — only the entries WE added; pre-existing ones are hers (C7 namespace rule).
    for (const entry of newEntries) manifest.recordKey('.claude/settings.json', entry, entry);
  } else {
    console.log(`  skipped: .claude/settings.json (all DesignerPunk approvals already present)`);
  }
}
