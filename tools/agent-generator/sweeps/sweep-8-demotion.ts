#!/usr/bin/env node
/**
 * Sweep 8 — demotion-diff (C8 row 8) — Spec 122 Task 7.2.
 *
 * design.md § C8: `removals = baseline ∖ fresh ambient-manifest`. The baseline is C10.1
 * step 2's committed pre-cutover capture (`canonical/baselines/<agent>.ambient-baseline.json`);
 * post-cutover, the base branch's committed manifest. **The namespace includes ARTIFACT-PATH
 * members, not doc-ids only (D-A1 held firm)**: trims key on file-path artifacts
 * (`dist/android/*.kt`) while removals historically keyed on doc-id membership — a
 * doc-id-only baseline would assert a platform seat's most important cue (its artifact
 * demotion) but never verify it. Both membership kinds participate in the set-difference.
 *
 * For every removal: a cue with `replaces: <removed ref/artifact>` MUST exist in the
 * generated output (canonical `routes.cues[].replaces` ∪ ground-truth trims'
 * `cue.replaces`) → else FAIL (Req 12 AC1: every removal tells you where the content lives
 * now).
 *
 * Additionally (K-D1): a `trims` entry with `fires: unconditional` emits its negative cue
 * WHETHER OR NOT the artifact is in the removal set — covering ORPHANED artifacts
 * (untracked, written by no script, neither a baseline removal nor a current output) as a
 * standing negative decoupled from the demotion-diff. The sweep verifies the emitted output
 * text carries each such negative.
 *
 * The computed delta is emitted as `demotion-delta.json` (repo-relative, per agent) — the
 * run-artifact the cutover report pins.
 *
 * Prove-it-bites (Req 19 AC2): remove a doc from a fixture agent's ambient without a
 * `replaces` cue — see __tests__/sweep-8-demotion.test.ts.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { AmbientManifest } from '../compose';
import type { CanonicalAgentDoc, GroundTruthManifestTrim } from '../schema';
import { parseCanonicalAgentSource } from '../source';
import { canonicalStringify, type JsonValue } from '../canonical-json';
import { readAmbientManifests } from './sweep-4-ambient';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  listCanonicalAgentFiles,
  exitWithReport,
} from './common';

export const SWEEP_8 = '122-sweep-8-demotion';

/**
 * A committed pre-cutover ambient baseline (C10.1 step 2). `members` spans BOTH namespace
 * kinds (doc ids AND artifact paths — D-A1).
 */
export interface AmbientBaseline {
  agent: string;
  members: string[];
}

/** One agent's demotion-diff computation surface. */
export interface AgentDemotionInputs {
  agent: string;
  baseline: AmbientBaseline;
  /** Fresh ambient-manifest member ids (doc ids + artifact-path members). */
  freshMemberIds: string[];
  /** Every `replaces:` value carried by the generated output's cues (routes.cues + trims). */
  replacesKeys: string[];
  /** Ground-truth trims (K-D1 unconditional-negative verification). */
  trims: GroundTruthManifestTrim[];
  /** The emitted output text the negatives must appear in ('' when nothing emitted yet). */
  emittedText: string;
}

export interface Sweep8Inputs {
  agents: AgentDemotionInputs[];
}

export interface DemotionDelta {
  agent: string;
  removals: string[];
}

export function runSweep8(inputs: Sweep8Inputs): { report: SweepReport; deltas: DemotionDelta[] } {
  const findings: SweepFinding[] = [];
  const deltas: DemotionDelta[] = [];

  if (inputs.agents.length === 0) {
    findings.push({
      verdict: 'INFO',
      path: 'scope',
      observed: 'recorded vacuous PASS: 0 committed ambient baselines (pre-cutover)',
      expected: 'baselines are captured at C10.1 step 2, per cutover',
      owner: 'thurgood',
    });
  }

  for (const a of inputs.agents) {
    const fresh = new Set(a.freshMemberIds);
    const replaces = new Set(a.replacesKeys);
    const removals = a.baseline.members.filter((m) => !fresh.has(m)).sort();
    deltas.push({ agent: a.agent, removals });

    for (const removed of removals) {
      if (!replaces.has(removed)) {
        findings.push({
          verdict: 'FAIL',
          agent: a.agent,
          path: removed,
          observed: `baseline member "${removed}" was removed with NO \`replaces: ${removed}\` cue in the generated output`,
          expected: 'every removal carries a replacement cue (Req 12 AC1 — a removal tells you where the content lives now)',
          owner: a.agent,
        });
      }
    }

    // K-D1: unconditional trims emit their negative regardless of removal-set membership.
    a.trims.forEach((trim, ti) => {
      if (trim.fires !== 'unconditional') return;
      if (!a.emittedText.includes(trim.cue.negative)) {
        findings.push({
          verdict: 'FAIL',
          agent: a.agent,
          path: `groundTruthManifest.trims[${ti}] (${trim.artifact})`,
          observed: `unconditional trim's negative cue is ABSENT from the emitted output (orphaned-artifact coverage, K-D1)`,
          expected: `emitted output contains the negative: "${trim.cue.negative}"`,
          owner: a.agent,
        });
      }
    });
  }

  return { report: assembleReport(SWEEP_8, findings), deltas };
}

/** Serialize the deltas deterministically (the committed `demotion-delta.json` artifact). */
export function serializeDemotionDeltas(deltas: DemotionDelta[]): string {
  return canonicalStringify(deltas as unknown as JsonValue);
}

// ============================================================================
// CLI wiring
// ============================================================================

/** Read `canonical/baselines/*.ambient-baseline.json` ([] when none committed). */
export function readBaselines(repoRoot: string): AmbientBaseline[] {
  const dir = path.join(repoRoot, 'canonical', 'baselines');
  let files: string[];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith('.ambient-baseline.json'));
  } catch {
    return [];
  }
  return files.sort().map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')) as AmbientBaseline);
}

/** Collect the `replaces:` keys a canonical doc's cues + trims carry. */
export function collectReplacesKeys(doc: CanonicalAgentDoc): string[] {
  const keys: string[] = [];
  for (const cue of doc.frontmatter.routes?.cues ?? []) {
    if (cue.replaces) keys.push(cue.replaces);
  }
  for (const trim of doc.frontmatter.ambient?.groundTruthManifest?.trims ?? []) {
    if (trim.cue.replaces) keys.push(trim.cue.replaces);
  }
  return keys;
}

function main(): void {
  const repoRoot = repoRootFromHere();
  const baselines = readBaselines(repoRoot);
  const manifests = readAmbientManifests(repoRoot);
  const docsByAgent = new Map<string, CanonicalAgentDoc>();
  for (const f of listCanonicalAgentFiles(repoRoot)) {
    const doc = parseCanonicalAgentSource(readFileIfExists(f) ?? '', f);
    docsByAgent.set(doc.frontmatter.agent, doc);
  }

  const agents: AgentDemotionInputs[] = baselines.map((baseline) => {
    const agent = baseline.agent;
    const doc = docsByAgent.get(agent);
    const agentManifests = manifests.filter((m) => m.agent === agent);
    const freshMemberIds = [...new Set(agentManifests.flatMap((m: AmbientManifest) => m.members.map((x) => x.id)))];
    const emittedText = readFileIfExists(path.join(repoRoot, '.claude', 'agents', `${agent}.md`)) ?? '';
    return {
      agent,
      baseline,
      freshMemberIds,
      replacesKeys: doc ? collectReplacesKeys(doc) : [],
      trims: doc?.frontmatter.ambient?.groundTruthManifest?.trims ?? [],
      emittedText,
    };
  });

  const { report, deltas } = runSweep8({ agents });
  if (agents.length > 0) {
    const outPath = path.join(repoRoot, 'canonical', 'manifests', 'demotion-delta.json');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, serializeDemotionDeltas(deltas));
    console.log(`demotion-delta.json written (${deltas.length} agent(s))`);
  }
  exitWithReport(report);
}

if (require.main === module) {
  main();
}
