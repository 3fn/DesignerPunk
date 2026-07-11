#!/usr/bin/env node
/**
 * Sweep 3 — resources double-load (C8 row 3) — Spec 122 Task 7.1.
 *
 * design.md § C8: per emitted Kiro config, normalize every `resources` URI to its underlying
 * doc path (strip the `file://` / `skill://` scheme + any leading `./`) and FAIL on any
 * duplicate — the same doc injected twice (typically once per scheme) double-loads it into
 * every session of that agent. This is a property of EVERY emission (standing post-cutover).
 *
 * Standing-gate scope: EMITTED configs — the cutover-ledger agents' `.kiro/agents/*.json`.
 * Pre-cutover the ledger is empty and the sweep records a vacuous PASS. The hand-maintained
 * configs are not yet emitted artifacts; they enter scope per-agent at cutover.
 *
 * Prove-it-bites (Req 19 AC2): the design's FREE POSITIVES are live hand configs —
 * `leonardo.json` (`file://` line 27 + `skill://` line 43, governance/Product-Token-Governance.md)
 * and `kenya.json` (`file://` line 30 + `skill://` line 42, same doc). Run the CLI with
 * `--all-configs` to sweep every `.kiro/agents/*.json` regardless of ledger membership — the
 * bite-recording mode (and a cutover-prep diagnostic), not the standing gate scope.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  exitWithReport,
} from './common';

export const SWEEP_3 = '122-sweep-3-dupes';

// ============================================================================
// Normalization
// ============================================================================

/** Normalize a Kiro resource URI to its underlying doc path (scheme + `./` stripped). */
export function normalizeResourceUri(uri: string): { scheme: string; docPath: string } {
  const m = uri.match(/^([a-z]+):\/\/(.*)$/);
  const scheme = m ? m[1] : '<none>';
  let docPath = m ? m[2] : uri;
  while (docPath.startsWith('./')) docPath = docPath.slice(2);
  return { scheme, docPath };
}

// ============================================================================
// Inputs + the sweep
// ============================================================================

/**
 * A live `resources[]` entry: a URI string, or a rich knowledgeBase OBJECT (observed in
 * ada.json/lina.json — `{type: "knowledgeBase", source: "file://./src/tokens", ...}`; the
 * Task 5 open item riding to Ada's cutover). An object entry injects its `source` URI, so
 * it participates in double-load detection via that URI.
 */
export type KiroResourceEntry = string | { source?: string; name?: string; [key: string]: unknown };

export interface KiroConfigResources {
  agent: string;
  /** The config's `resources` array (missing → []). */
  resources: KiroResourceEntry[];
}

/** The URI a resources entry loads: the string itself, or an object entry's `source`. */
export function resourceEntryUri(entry: KiroResourceEntry): string | undefined {
  if (typeof entry === 'string') return entry;
  return typeof entry.source === 'string' ? entry.source : undefined;
}

export interface Sweep3Inputs {
  configs: KiroConfigResources[];
}

export function runSweep3(inputs: Sweep3Inputs): SweepReport {
  const findings: SweepFinding[] = [];

  if (inputs.configs.length === 0) {
    findings.push({
      verdict: 'INFO',
      path: 'scope',
      observed: 'recorded vacuous PASS: 0 emitted Kiro configs in scope (pre-cutover ledger is empty)',
      expected: 'emitted configs enter scope per-agent at cutover',
      owner: 'thurgood',
    });
  }

  for (const config of inputs.configs) {
    const seen = new Map<string, Array<{ scheme: string; index: number }>>();
    config.resources.forEach((entry, i) => {
      const uri = resourceEntryUri(entry);
      if (uri === undefined) return; // an object entry with no source URI loads nothing normalizable
      const { scheme, docPath } = normalizeResourceUri(uri);
      (seen.get(docPath) ?? seen.set(docPath, []).get(docPath)!).push({ scheme, index: i });
    });
    for (const [docPath, occurrences] of seen) {
      if (occurrences.length > 1) {
        findings.push({
          verdict: 'FAIL',
          agent: config.agent,
          path: docPath,
          observed: `loaded ${occurrences.length}× (${occurrences
            .map((o) => `resources[${o.index}] via ${o.scheme}://`)
            .join(' + ')})`,
          expected: 'every doc appears at most once across file:// + skill:// resources',
          owner: config.agent,
        });
      }
    }
  }

  return assembleReport(SWEEP_3, findings);
}

// ============================================================================
// CLI wiring
// ============================================================================

/**
 * The Kiro agent-configs directory, repo-relative — exported so the coverage-map
 * generator's {@link surfaceGlobs} shares the SAME constant {@link readConfigResources}
 * reads (S-D1).
 */
export const KIRO_AGENTS_ROOT = '.kiro/agents';

/** Read one `.kiro/agents/<agent>.json`'s resources (absent config/resources → []). */
export function readConfigResources(repoRoot: string, agent: string): KiroConfigResources {
  const text = readFileIfExists(path.join(repoRoot, KIRO_AGENTS_ROOT, `${agent}.json`));
  if (!text) return { agent, resources: [] };
  const parsed = JSON.parse(text) as { resources?: KiroResourceEntry[] };
  return { agent, resources: parsed.resources ?? [] };
}

/** The `122-sweep-3-dupes` check's surface globs (C12, S-D1). */
export function surfaceGlobs(): string[] {
  return [`${KIRO_AGENTS_ROOT}/*.json`];
}

function main(): void {
  const repoRoot = repoRootFromHere();
  const allConfigs = process.argv.includes('--all-configs');

  let agents: string[];
  if (allConfigs) {
    // Bite-recording / diagnostic mode: every hand config, regardless of ledger membership.
    try {
      agents = fs
        .readdirSync(path.join(repoRoot, KIRO_AGENTS_ROOT))
        .filter((f) => f.endsWith('.json') && !f.endsWith('.attribution.json'))
        .map((f) => f.replace(/\.json$/, ''))
        .sort();
    } catch {
      agents = [];
    }
  } else {
    const { parseCutoverLedger } = require('../generate') as typeof import('../generate');
    try {
      agents = parseCutoverLedger(
        readFileIfExists(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml')) ?? ''
      );
    } catch {
      agents = [];
    }
  }

  const report = runSweep3({ configs: agents.map((a) => readConfigResources(repoRoot, a)) });
  exitWithReport(report);
}

if (require.main === module) {
  main();
}
