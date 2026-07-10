#!/usr/bin/env node
/**
 * Sweep 6 — phantom-route / declaration-diff (C8 row 6) — Spec 122 Task 7.2.
 *
 * design.md § C8: bidirectional set-difference per runtime, DECLARATION-KEYED (the registry
 * comes from `tools/list`; index state never enters — the carve-out is structural):
 *   - cues ∖ declarations = PHANTOM ROUTES (FAIL): a cue naming a tool no running server
 *     declares routes agents to a dead end. Cues = every canonical `routes.cues` entry +
 *     every shared-catalog `tool-cue` member.
 *   - declarations ∖ (all agents' toolSubsets ∪ the deferred-discoverable set) = UN-ROUTED
 *     tools (ADJUDICATE): declared capability no agent is routed to. Owner per Req 7 AC5's
 *     membership-vs-substance seam — no consuming seat exists for an un-routed tool, so the
 *     finding routes to the DECLARING owner (`declaring-owner:<server>`), mirroring C7(c)
 *     leg 2. The declarations-diff leg only means something once agents exist: with an
 *     empty cutover ledger it records a vacuous PASS rather than an ADJUDICATE storm over
 *     43 tools no generated agent could yet route.
 *
 * Prove-it-bites (Req 19 AC2): induce a cue naming a nonexistent tool — see
 * __tests__/sweep-6-declarations.test.ts.
 */

import * as path from 'path';
import type { ToolRegistry } from '../registry';
import { serverTable, introspectServer, assembleRegistry } from '../registry';
import type { CanonicalAgentDoc, ToolSubset } from '../schema';
import { parseCanonicalAgentSource } from '../source';
import { parseSharedCatalog, type SharedCatalogMember } from '../adapters/index';
import { MCP_TO_SERVER } from '../canonical-vs-truth';
import type { McpName } from '../schema';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  type RecordedAdjudication,
  readAdjudications,
  repoRootFromHere,
  readFileIfExists,
  listCanonicalAgentFiles,
  exitWithReport,
} from './common';

export const SWEEP_6 = '122-sweep-6-declarations';

export interface Sweep6Inputs {
  docs: CanonicalAgentDoc[];
  sharedCatalog: readonly SharedCatalogMember[];
  registry: ToolRegistry;
  /**
   * Tools deliberately left to on-demand discovery (Req 7 AC4's "remainder discoverable on
   * demand") — exempt from the un-routed diff. Empty until a cutover declares one.
   */
  deferredDiscoverable?: string[];
  adjudications?: RecordedAdjudication[];
}

export function runSweep6(inputs: Sweep6Inputs): SweepReport {
  const findings: SweepFinding[] = [];

  const declaredByServer = new Map<string, Set<string>>();
  for (const server of inputs.registry.servers) {
    declaredByServer.set(server.name, new Set(server.tools.map((t) => t.name)));
  }

  // --- Leg 1: cues ∖ declarations = phantom routes (FAIL). Always on (cues exist pre-cutover
  // in canonical source + the shared catalog).
  const checkCue = (owner: string, agent: string | undefined, cuePath: string, tool: string, mcp: McpName): void => {
    const serverName = MCP_TO_SERVER[mcp];
    const declared = declaredByServer.get(serverName);
    if (!declared || !declared.has(tool)) {
      findings.push({
        verdict: 'FAIL',
        agent,
        path: cuePath,
        observed: `PHANTOM ROUTE: cue tool "${tool}" is not declared by running server "${serverName}" (declaration-keyed; index never enters)`,
        expected: 'every cue tool ∈ the live tools/list declarations',
        owner,
      });
    }
  };

  for (const doc of inputs.docs) {
    const agent = doc.frontmatter.agent;
    (doc.frontmatter.routes?.cues ?? []).forEach((cue, i) =>
      checkCue(agent, agent, `routes.cues[${i}]`, cue.tool, cue.mcp)
    );
  }
  inputs.sharedCatalog.forEach((member, mi) => {
    if (member.kind === 'tool-cue' && member.tool && member.mcp) {
      checkCue(member.owner ?? 'thurgood', undefined, `sharedCatalog[${mi}]`, member.tool, member.mcp as McpName);
    }
  });

  // --- Leg 2: declarations ∖ (∪ toolSubsets ∪ deferred) = un-routed (ADJUDICATE).
  if (inputs.docs.length === 0) {
    findings.push({
      verdict: 'INFO',
      path: 'declarations-diff',
      observed: 'recorded vacuous PASS: 0 canonical agents — the un-routed diff activates at the first cutover',
      expected: 'declarations ∖ (∪ subsets ∪ deferred) runs per-agent-population',
      owner: 'thurgood',
    });
  } else {
    const routed = new Set<string>(inputs.deferredDiscoverable ?? []);
    for (const doc of inputs.docs) {
      const subset = doc.frontmatter.toolSubset ?? {};
      for (const server of Object.keys(subset) as Array<keyof ToolSubset>) {
        for (const tool of subset[server] ?? []) routed.add(tool);
      }
    }
    for (const server of inputs.registry.servers) {
      for (const tool of server.tools) {
        if (!routed.has(tool.name)) {
          findings.push({
            verdict: 'ADJUDICATE',
            path: `${server.name}/${tool.name}`,
            observed: `declared tool "${tool.name}" is in NO agent's toolSubset and not in the deferred-discoverable set`,
            expected: 'every declared tool is routed, deferred, or adjudicated (Req 7 AC4/AC5)',
            owner: `declaring-owner:${server.name}`,
            adjudicationKey: `un-routed/${server.name}/${tool.name}`,
          });
        }
      }
    }
  }

  return assembleReport(SWEEP_6, findings, inputs.adjudications ?? []);
}

// ============================================================================
// CLI wiring
// ============================================================================

async function main(): Promise<void> {
  const repoRoot = repoRootFromHere();
  const docs = listCanonicalAgentFiles(repoRoot).map((f) =>
    parseCanonicalAgentSource(readFileIfExists(f) ?? '', f)
  );
  const catalogText = readFileIfExists(path.join(repoRoot, 'canonical', 'shared', 'shared-catalog.yaml'));
  const sharedCatalog = catalogText ? parseSharedCatalog(catalogText) : [];

  // Live introspection, loud on boot failure (registry.ts throws) — never a cache.
  const results = [];
  for (const spec of serverTable(repoRoot)) {
    results.push(await introspectServer(spec, repoRoot));
  }
  const registry = assembleRegistry(results);

  const report = runSweep6({
    docs,
    sharedCatalog,
    registry,
    adjudications: readAdjudications(repoRoot),
  });
  exitWithReport(report);
}

if (require.main === module) {
  main().catch((error) => {
    console.error('[sweep-6-declarations] Fatal error:', error);
    process.exit(1);
  });
}
