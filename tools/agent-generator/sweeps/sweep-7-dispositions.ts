#!/usr/bin/env node
/**
 * Sweep 7 — config-field disposition (C8 row 7) — Spec 122 Task 7.2.
 *
 * design.md § C8, Req 11 AC2: enumerate EVERY key path in EVERY `.kiro/agents/*.json`
 * (source hand configs + emitted configs alike — this sweep runs on the full config
 * population from day one); each key path must be covered by `field-dispositions.yaml`
 * with disposition ∈ {carry, transform, drop-with-reason, handled-elsewhere}; an unknown
 * key → FAIL (a field with no declared disposition is a silent-drop candidate).
 *
 * Coverage algorithm (matches the table's mixed granularity — it lists both top-level
 * fields like `keyboardShortcut` and dotted subpaths like `toolsSettings.write.allowedPaths`):
 * a config node at dotted path P is COVERED when P is a table row; otherwise, if some table
 * row has P as a proper prefix, recurse into P's children (the table speaks at a finer
 * grain); otherwise P is UNKNOWN → FAIL. Arrays are leaves (the table's grain never enters
 * array elements).
 *
 * Prove-it-bites (Req 19 AC2): add a fake config key — see
 * __tests__/sweep-7-dispositions.test.ts.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseFieldDispositions, type FieldDispositionTable } from '../adapters/index';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  exitWithReport,
} from './common';

export const SWEEP_7 = '122-sweep-7-dispositions';

export interface AgentConfig {
  agent: string;
  config: Record<string, unknown>;
}

export interface Sweep7Inputs {
  configs: AgentConfig[];
  dispositions: FieldDispositionTable;
}

/** Enumerate a config's UNCOVERED dotted key paths against the disposition table. */
export function uncoveredKeyPaths(
  config: Record<string, unknown>,
  table: FieldDispositionTable
): string[] {
  const covered = new Set(table.configFields.map((row) => row.field));
  const hasFinerRows = (prefix: string): boolean =>
    table.configFields.some((row) => row.field.startsWith(`${prefix}.`));

  const uncovered: string[] = [];
  const walk = (node: unknown, prefix: string): void => {
    if (node === null || typeof node !== 'object' || Array.isArray(node)) return; // leaves
    for (const key of Object.keys(node)) {
      const p = prefix ? `${prefix}.${key}` : key;
      if (covered.has(p)) continue;
      if (hasFinerRows(p)) {
        walk((node as Record<string, unknown>)[key], p);
        continue;
      }
      uncovered.push(p);
    }
  };
  walk(config, '');
  return uncovered;
}

export function runSweep7(inputs: Sweep7Inputs): SweepReport {
  const findings: SweepFinding[] = [];

  for (const { agent, config } of inputs.configs) {
    for (const keyPath of uncoveredKeyPaths(config, inputs.dispositions)) {
      findings.push({
        verdict: 'FAIL',
        agent,
        path: keyPath,
        observed: `config key path "${keyPath}" has NO row in field-dispositions.yaml`,
        expected: 'every key path ∈ the disposition table (carry | transform | drop-with-reason | handled-elsewhere) — never a silent drop (Req 11 AC2)',
        owner: 'thurgood',
      });
    }
  }

  if (inputs.configs.length === 0) {
    findings.push({
      verdict: 'INFO',
      path: 'scope',
      observed: 'recorded vacuous PASS: 0 configs found',
      expected: 'the sweep enumerates every .kiro/agents/*.json',
      owner: 'thurgood',
    });
  }

  return assembleReport(SWEEP_7, findings);
}

// ============================================================================
// CLI wiring
// ============================================================================

export function readAllAgentConfigs(repoRoot: string): AgentConfig[] {
  const dir = path.join(repoRoot, '.kiro', 'agents');
  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }
  return files.sort().map((f) => ({
    agent: f.replace(/\.json$/, ''),
    config: JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as Record<string, unknown>,
  }));
}

function main(): void {
  const repoRoot = repoRootFromHere();
  const tableText = readFileIfExists(path.join(repoRoot, 'canonical', 'shared', 'field-dispositions.yaml'));
  if (!tableText) {
    console.error('[sweep-7] canonical/shared/field-dispositions.yaml not found — cannot assert');
    process.exit(1);
  }
  const report = runSweep7({
    configs: readAllAgentConfigs(repoRoot),
    dispositions: parseFieldDispositions(tableText),
  });
  exitWithReport(report);
}

if (require.main === module) {
  main();
}
