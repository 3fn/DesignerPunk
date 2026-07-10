/**
 * The generation entry point — Spec 122 Task 6.1 (consumed by the diff-guard, C6).
 *
 * Assembles the AdapterContext from the canonical shared files and produces the FULL
 * emitted-file set for the current guarded surface:
 *   - `canonical/registry/tool-registry.json` (C5 — live MCP introspection, DD10)
 *   - both per-target skill trees (`.claude/skills/**`, `.kiro/skills/**`) via the adapters
 *   - per-agent artifacts for every agent in `canonical/cutover-ledger.yaml` (empty until
 *     the first cutover, U2) + their ambient manifests and attribution sidecars
 *
 * The diff-guard (C6) calls {@link generateAll} against a TEMP root and diffs the result
 * against the working tree; cutover regeneration calls it against the repo root. Same code
 * path both ways — the guard can never diverge from what generation actually does (the
 * S-D1 derive-don't-redeclare principle applied to the generator itself).
 *
 * Traces to: Req 17 AC1/AC2 (regenerate everything; every generated surface guarded),
 * design C6 step 1, DD10.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { parseSkillsMap } from './skills';
import { parseAlwaysSet } from './compose';
import {
  parseFieldDispositions,
  parseSharedCatalog,
  type AdapterContext,
  type EmittedFile,
  type TargetAdapter,
} from './adapters/index';
import { CcAdapter } from './adapters/cc';
import { KiroAdapter } from './adapters/kiro';
import { getWorkflowRules } from './workflow-rules-guard';
import { generateRegistry, serializeRegistry, REGISTRY_OUTPUT_PATH } from './registry';
import { serializeAttribution, type AttributionManifest } from './attribution';
import { canonicalStringify, type JsonValue } from './canonical-json';

/** One file the generator wants on disk: content + optional attribution sidecar. */
export interface GeneratedOutput {
  /** Repo-relative path. */
  path: string;
  content: string;
  attribution?: AttributionManifest;
}

/** Parse `canonical/cutover-ledger.yaml` → the agent names the generator is SSOT for. */
export function parseCutoverLedger(yamlText: string): string[] {
  const parsed = loadYaml(yamlText) as { agents?: Array<string | { agent: string }> } | null;
  return (parsed?.agents ?? []).map((a) => (typeof a === 'string' ? a : a.agent));
}

/** Assemble the AdapterContext from the committed canonical shared files. */
export function assembleContext(repoRoot: string): AdapterContext {
  const shared = (name: string) => fs.readFileSync(path.join(repoRoot, 'canonical', 'shared', name), 'utf8');
  return {
    workflowRules: getWorkflowRules(),
    skillsMap: parseSkillsMap(shared('skills-map.yaml')),
    alwaysSet: parseAlwaysSet(shared('always-set.yaml')),
    dispositions: parseFieldDispositions(shared('field-dispositions.yaml')),
    sharedCatalog: parseSharedCatalog(shared('shared-catalog.yaml')),
    repoRoot,
    // embeds / steeringIdToPath / docIdToPath join when the first cutover puts an agent in
    // the ledger (the corpus session supplies them); the substrate surface needs none.
  };
}

/**
 * Produce the complete generated-output set for the current guarded surface, WITHOUT
 * writing anything (pure aside from reading canonical inputs + the registry's live MCP
 * introspection). The caller decides where the outputs land (temp tree vs repo tree).
 */
export async function generateAll(repoRoot: string): Promise<GeneratedOutput[]> {
  const ctx = assembleContext(repoRoot);
  const adapters: TargetAdapter[] = [new CcAdapter(ctx.dispositions), new KiroAdapter(ctx.dispositions)];
  const outputs: GeneratedOutput[] = [];

  // 1. The registry (C5) — live introspection, loud on boot failure (never cached).
  const registry = await generateRegistry(repoRoot);
  outputs.push({ path: REGISTRY_OUTPUT_PATH, content: serializeRegistry(registry) });

  // 2. Skill trees, both targets, via the adapters (Req 8 AC3).
  for (const adapter of adapters) {
    for (const file of adapter.emitSkills(ctx.skillsMap, ctx)) {
      outputs.push(emittedToOutput(file));
    }
  }

  // 3. Per-agent artifacts for every ledger agent (none until the first cutover, U2).
  const ledger = parseCutoverLedger(
    fs.readFileSync(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml'), 'utf8')
  );
  if (ledger.length > 0) {
    // The agent lane needs the corpus session (embeds, id→path maps) wired into ctx —
    // built at the first cutover (Task 9). Fail loud rather than emit partial agents.
    throw new Error(
      `generateAll: cutover ledger names ${ledger.length} agent(s) but the agent-generation ` +
        `lane (corpus session, embeds, id→path maps) is not wired yet — wire it before ` +
        `cutting an agent over.`
    );
  }

  // Deterministic output ordering (P1).
  return outputs.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

function emittedToOutput(file: EmittedFile): GeneratedOutput {
  return { path: file.path, content: file.content, attribution: file.attribution };
}

/**
 * Materialize outputs under a root directory (temp tree for the guard; repo root for real
 * regeneration). Attribution sidecars land next to their artifacts as
 * `<path>.attribution.json` — EXCEPT for byte-copied skill files, whose sidecars are
 * suppressed on the REAL tree (they'd double every skill file on disk for single-span
 * passthrough manifests; the P2 property for copies is asserted by the guard comparing
 * canonical bytes directly, and sweep 2's round-trip). Prose artifacts (agents, CLAUDE.md)
 * always get sidecars.
 */
export function writeOutputs(root: string, outputs: readonly GeneratedOutput[], opts?: { skillSidecars?: boolean }): string[] {
  const written: string[] = [];
  for (const out of outputs) {
    const target = path.join(root, out.path);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out.content);
    written.push(out.path);
    const isSkillCopy = out.path.startsWith('.claude/skills/') || out.path.startsWith('.kiro/skills/');
    if (out.attribution && (!isSkillCopy || opts?.skillSidecars)) {
      const sidecarPath = `${out.path}.attribution.json`;
      fs.writeFileSync(path.join(root, sidecarPath), serializeAttribution(out.attribution));
      written.push(sidecarPath);
    }
  }
  return written.sort();
}

/** The guarded surface ROOTS the diff-guard compares bidirectionally (dir-level). */
export function guardedRoots(): string[] {
  return ['canonical/registry', '.claude/skills', '.kiro/skills', 'canonical/manifests', 'canonical/_fixture-output'];
}

/** Serialize any JSON-ish guard report deterministically. */
export function stringifyReport(value: JsonValue): string {
  return canonicalStringify(value);
}

// CLI: regenerate the real tree in place (used by cutovers + to refresh generated.lock).
if (require.main === module) {
  const repoRoot = path.resolve(__dirname, '..', '..');
  generateAll(repoRoot)
    .then((outputs) => {
      const written = writeOutputs(repoRoot, outputs);
      console.log(`generate: wrote ${written.length} files across ${guardedRoots().length} guarded roots`);
    })
    .catch((error) => {
      console.error('generate: FAILED —', error.message);
      process.exit(1);
    });
}
