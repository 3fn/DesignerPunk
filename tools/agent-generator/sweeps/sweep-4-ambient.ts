#!/usr/bin/env node
/**
 * Sweep 4 — ambient set-difference (C8 row 4) — Spec 122 Task 7.1.
 *
 * design.md § C8: per agent, `designed = Task-9 block ∪ always-set` vs `generated = the
 * emitted ambient-manifest members`. BOTH set-differences are reported; every delta requires
 * a recorded adjudication (`intentional-trim` | `assessment-gap` | `design-change`) — the
 * sweep FAILS on any unadjudicated delta, never auto-resolves (Req 19 AC2).
 *
 * The DESIGNED side implements per-agent-ambient-design.md gap flag #7's resolution rule
 * (commit b7c3c148, adjudicated DATA R1/R2): ambient(agent) = locked always-set ∪ per-agent
 * five-class members; inlined always-set members in a design block are CLASS ANNOTATIONS,
 * never membership selection — generating from the blocks alone would silently drop
 * operational law from up to 6–8 agents. `manifest:`/`catalog:` design rows are directives,
 * not doc members, and are excluded from the id set.
 *
 * The same machinery runs Req 10 AC4's set-inclusion: each consumer's designed
 * Application/Product-MCP cues ⊆ the generated catalog (the cue's tool name must appear in
 * the agent's emitted catalog surface).
 *
 * Prove-it-bites (Req 19 AC2): Data's `start-up-tasks` drop — already adjudicated
 * `b7c3c148`; the bite re-runs the machinery against the PRE-correction designed set (the
 * delta appears, routed ADJUDICATE) and the live post-union run shows no-delta. See
 * __tests__/sweep-4-ambient.test.ts.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AmbientManifest } from '../compose';
import { parseAlwaysSet, alwaysSetIds } from '../compose';
import type { CanonicalAgentDoc, ToolCueRoute } from '../schema';
import { parseCanonicalAgentSource } from '../source';
import {
  type SweepFinding,
  type SweepReport,
  type RecordedAdjudication,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  readAdjudications,
  listCanonicalAgentFiles,
  exitWithReport,
  CC_AGENTS_ROOT,
} from './common';

export const SWEEP_4 = '122-sweep-4-ambient';

// ============================================================================
// Designed-set extraction (the Task-9 block parser)
// ============================================================================

/**
 * Parse per-agent-ambient-design.md into per-agent designed doc-id sets. Mechanical:
 * `### <n>. <Agent> —` opens a block; within it, table rows' FIRST cell contributes its
 * backticked ref, excluding `manifest:`/`catalog:` design rows (directives, not members)
 * and the header/separator rows.
 */
export function parseDesignedBlocks(designDocText: string): Record<string, string[]> {
  const blocks: Record<string, string[]> = {};
  let current: string | undefined;
  for (const line of designDocText.split('\n')) {
    const header = line.match(/^### \d+\.\s+(\w+)\s+—/);
    if (header) {
      current = header[1].toLowerCase();
      blocks[current] = [];
      continue;
    }
    if (line.startsWith('## ')) current = undefined; // left the per-agent designs region
    if (!current || !line.startsWith('|')) continue;
    const firstCell = line.split('|')[1]?.trim() ?? '';
    const ref = firstCell.match(/^`([^`]+)`/)?.[1];
    if (!ref || ref === 'ref') continue;
    if (ref.startsWith('manifest:') || ref.startsWith('catalog:')) continue;
    blocks[current].push(ref);
  }
  return blocks;
}

// ============================================================================
// Inputs
// ============================================================================

export interface Sweep4Inputs {
  /** Per-agent designed refs from the Task-9 blocks (per-agent five-class members). */
  designedBlocks: Record<string, string[]>;
  /** The locked always-set ids (the union's shared leg — gap #7's resolution rule). */
  alwaysSetIds: string[];
  /** Emitted ambient manifests (agent + target self-described). Pre-cutover: []. */
  manifests: AmbientManifest[];
  /** Recorded adjudications (canonical/adjudications.yaml). */
  adjudications?: RecordedAdjudication[];
  /**
   * Req 10 AC4 legs: per LEDGER agent, the canonical cues + the emitted catalog surface
   * text the cue's tool name must appear in. Pre-cutover: [].
   */
  cueInclusion?: Array<{ agent: string; cues: ToolCueRoute[]; catalogText: string }>;
}

// ============================================================================
// The sweep
// ============================================================================

export function runSweep4(inputs: Sweep4Inputs): SweepReport {
  const findings: SweepFinding[] = [];

  if (inputs.manifests.length === 0) {
    findings.push({
      verdict: 'INFO',
      path: 'scope',
      observed: 'recorded vacuous PASS: 0 emitted ambient manifests (pre-cutover)',
      expected: 'manifests enter scope per-agent at cutover',
      owner: 'thurgood',
    });
  }

  for (const manifest of inputs.manifests) {
    const agent = manifest.agent;
    const blockRefs = inputs.designedBlocks[agent];
    if (blockRefs === undefined) {
      findings.push({
        verdict: 'FAIL',
        agent,
        path: `per-agent-ambient-design.md § ${agent}`,
        observed: 'no Task-9 design block found for this emitted agent',
        expected: 'every emitted agent has a designed ambient block (Req 14 AC1)',
        owner: 'thurgood',
      });
      continue;
    }

    const designed = new Set([...blockRefs, ...inputs.alwaysSetIds]);
    const generated = new Set(manifest.members.map((m) => m.id));

    for (const id of [...designed].sort()) {
      if (!generated.has(id)) {
        findings.push({
          verdict: 'ADJUDICATE',
          agent,
          path: `${agent}:${manifest.target} ambient`,
          observed: `designed member "${id}" is ABSENT from the generated ambient manifest`,
          expected: 'designed ∖ generated = ∅, or a recorded adjudication per delta',
          owner: agent,
          adjudicationKey: `${agent}/designed-minus-generated/${id}`,
        });
      }
    }
    for (const id of [...generated].sort()) {
      if (!designed.has(id)) {
        findings.push({
          verdict: 'ADJUDICATE',
          agent,
          path: `${agent}:${manifest.target} ambient`,
          observed: `generated member "${id}" appears in NO design block and is not always-set`,
          expected: 'generated ∖ designed = ∅, or a recorded adjudication per delta',
          owner: agent,
          adjudicationKey: `${agent}/generated-minus-designed/${id}`,
        });
      }
    }
  }

  // Req 10 AC4 set-inclusion: designed App/Product-MCP cues ⊆ generated catalog.
  for (const { agent, cues, catalogText } of inputs.cueInclusion ?? []) {
    cues
      .filter((c) => c.mcp === 'application' || c.mcp === 'product')
      .forEach((cue) => {
        if (!catalogText.includes(cue.tool)) {
          findings.push({
            verdict: 'FAIL',
            agent,
            path: `routes.cues → ${cue.tool}`,
            observed: `designed ${cue.mcp}-MCP cue tool "${cue.tool}" does NOT appear in the generated catalog surface`,
            expected: "each consumer's designed App/Product-MCP cues ⊆ generated catalog (Req 10 AC4)",
            owner: agent,
          });
        }
      });
  }

  return assembleReport(SWEEP_4, findings, inputs.adjudications ?? []);
}

// ============================================================================
// CLI wiring
// ============================================================================

/** The design doc of record for the designed side (Task-9 per-agent blocks). */
export const AMBIENT_DESIGN_DOC =
  '.kiro/specs/119-A-steering-relocation-serving-contract/per-agent-ambient-design.md';

/**
 * The `122-sweep-4-ambient` check's surface globs (C12, S-D1): `canonical/manifests/**`
 * (the emitted ambient manifests this sweep reads via {@link readAmbientManifests}),
 * `canonical/shared/always-set.yaml` (the locked always-set leg), {@link AMBIENT_DESIGN_DOC}
 * (the designed-block source), and `canonical/adjudications.yaml` (the covering-ruling leg).
 */
export function surfaceGlobs(): string[] {
  return [
    `${MANIFESTS_ROOT}/**`,
    'canonical/shared/always-set.yaml',
    AMBIENT_DESIGN_DOC,
    'canonical/adjudications.yaml',
    // The Req 10 AC4 cue-inclusion leg reads emitted CC agent bodies (main() below) — listed
    // so the manifest covers everything this check actually reads (Stacy Task 8.2 review).
    `${CC_AGENTS_ROOT}/**`,
  ];
}

/**
 * The emitted-ambient-manifests root (S-D1 shared constant — Stacy's Task 8.2 routed
 * item 1): consumed by BOTH {@link readAmbientManifests} and {@link surfaceGlobs} (here and
 * in sweep-8, which reads the same tree).
 */
export const MANIFESTS_ROOT = 'canonical/manifests';

/** Scan `canonical/manifests/*.json` and keep everything that parses as an AmbientManifest. */
export function readAmbientManifests(repoRoot: string): AmbientManifest[] {
  const dir = path.join(repoRoot, MANIFESTS_ROOT);
  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }
  const manifests: AmbientManifest[] = [];
  for (const f of files.sort()) {
    try {
      const parsed = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as AmbientManifest;
      if (typeof parsed.agent === 'string' && Array.isArray(parsed.members)) manifests.push(parsed);
    } catch {
      // Non-manifest JSON under manifests/ is another check's business (diff-guard covers it).
    }
  }
  return manifests;
}

function main(): void {
  const repoRoot = repoRootFromHere();
  const designText = readFileIfExists(path.join(repoRoot, AMBIENT_DESIGN_DOC)) ?? '';
  const alwaysText = readFileIfExists(path.join(repoRoot, 'canonical', 'shared', 'always-set.yaml'));

  const manifests = readAmbientManifests(repoRoot);

  // Req 10 AC4 legs for ledger agents with BOTH canonical source and an emitted CC body.
  const cueInclusion: Sweep4Inputs['cueInclusion'] = [];
  const docs: CanonicalAgentDoc[] = listCanonicalAgentFiles(repoRoot).map((f) =>
    parseCanonicalAgentSource(readFileIfExists(f) ?? '', f)
  );
  for (const doc of docs) {
    const agent = doc.frontmatter.agent;
    const cues = doc.frontmatter.routes?.cues ?? [];
    if (cues.length === 0) continue;
    const emitted = readFileIfExists(path.join(repoRoot, CC_AGENTS_ROOT, `${agent}.md`));
    if (emitted !== undefined) cueInclusion.push({ agent, cues, catalogText: emitted });
  }

  const report = runSweep4({
    designedBlocks: parseDesignedBlocks(designText),
    alwaysSetIds: alwaysText ? alwaysSetIds(parseAlwaysSet(alwaysText)) : [],
    manifests,
    adjudications: readAdjudications(repoRoot),
    cueInclusion,
  });
  exitWithReport(report);
}

if (require.main === module) {
  main();
}
