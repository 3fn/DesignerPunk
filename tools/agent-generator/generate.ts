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
import { parseAlwaysSet, serializeAmbientManifest } from './compose';
import { parseCanonicalAgentSource } from './source';
import { resolveAgent, validate as validateAgentDoc } from './pipeline';
import { CorpusResolver, type CorpusClient } from './resolve';
import { createStdioDocsClient } from './resolve-stdio';
import type { CanonicalAgentDoc } from './schema';
import {
  adaptersFor,
  parseFieldDispositions,
  parseSharedCatalog,
  type AdapterContext,
  type EmittedFile,
  type IdentityMemberInput,
  type TargetAdapter,
} from './adapters/index';
import { CONSUMER_OUTPUT_ROOT, loadConsumerProfile } from './consumer-profile';
import type { Dispositions, Overlay, Profile } from './spans';
import { loadDispositions } from './regrounding/dispositions';
import { parseOverlay, toSpanOverlay, type ParsedOverlay } from './regrounding/overlay';
import { derive, deriveSharedCatalog, type RowFile } from './derive';
import { splitFrontmatter } from './frontmatter';
import type { YamlDoc } from './frontmatter';
import { PROFILE_DIR } from './regrounding/freshness';
import { getWorkflowRules } from './workflow-rules-accessor';
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
  // The target set comes from the single declared list (C12, Task 15.0) through the adapter
  // registry — no adapter is constructed by name here.
  const adapters: TargetAdapter[] = adaptersFor(loadConsumerProfile(repoRoot).targets, ctx.dispositions);
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

  // 2b. The shared CC always-layer (C11 lane 1; OB-7 / Task 17): generate CLAUDE.md from the
  // locked always-set as live `@`-import references (id→path at emit time, so the paths are
  // case-correct and relocation-transparent). The CC adapter emits CLAUDE.md; the Kiro adapter
  // emits nothing here (Kiro delivers its always-layer via each agent's `resources` + the docs'
  // own `inclusion: always`, produced in emitAgent — there is no separate Kiro always-layer file).
  // This SUPERSEDES the interim hand-maintained CLAUDE.md stopgap (Req 16 AC2): one always-layer
  // mechanism per runtime (the generator). `steeringIdToPath` resolves the always-set ids to
  // their on-disk .kiro/steering/ paths (buildDocIdToPath covers both resolve-by-id roots; the
  // CC always-layer only looks up always-set ids, all of which are steering docs).
  const alwaysLayerCtx: AdapterContext = { ...ctx, steeringIdToPath: buildDocIdToPath(repoRoot) };
  for (const adapter of adapters) {
    for (const file of adapter.emitAlwaysLayer(ctx.alwaysSet, alwaysLayerCtx)) {
      outputs.push(emittedToOutput(file));
    }
  }

  // 3. The `_fixture` pseudo-agent lane (C10.3 — Task 8.1): a STANDING pipeline test.
  // Emits through the SAME resolve→emit path a real cutover uses (corpus session, embeds,
  // id→path maps), with outputs REMAPPED under `canonical/_fixture-output/<target>/` so no
  // runtime ever loads them. Inside C6's guarded surface → re-run on every PR (Req 21 AC4).
  outputs.push(...(await generateFixture(repoRoot, ctx, adapters)));

  // 4a. The coverage map + manifest (C12, Stacy's provisioning, Task 8.2). Lazy-required
  // (not a top-level import) to avoid an import cycle: coverage-map.ts imports guardedRoots
  // FROM this module, so this module cannot statically import coverage-map.ts back — the
  // same lazy-require idiom the sweeps already use for the reverse direction (parseCutoverLedger).
  const {
    buildCoverageManifest,
    enumerateSurfaces,
    buildCoverageMap,
    serializeCoverageManifest,
    serializeCoverageMap,
  } = require('./coverage-map') as typeof import('./coverage-map');
  const coverageManifest = buildCoverageManifest(repoRoot);
  const coverageSurfaces = enumerateSurfaces(repoRoot);
  const coverageRows = buildCoverageMap(coverageSurfaces, coverageManifest);
  outputs.push({ path: 'canonical/coverage-manifest.yaml', content: serializeCoverageManifest(coverageManifest) });
  outputs.push({ path: 'canonical/coverage-map.yaml', content: serializeCoverageMap(coverageRows) });

  // 4. The RUNTIME per-agent lane (Task 9 — wired at Ada's cutover, U2): for every
  // cutover-ledger agent, emit the REAL runtime artifacts (.claude/agents/<a>.md,
  // .kiro/agents/<a>.json + <a>-prompt.md) plus per-target ambient manifests
  // (canonical/manifests/<a>.<target>.ambient-manifest.json) through the same
  // validate→resolve→emit path the fixture proved. From the ledger entry forward the
  // generator is SSOT for the agent and these paths are diff-guarded surfaces
  // (guardedRoots(repoRoot) derives them from this same ledger — C6's "derived from the
  // cutover ledger + substrate artifacts").
  const ledger = parseCutoverLedger(
    fs.readFileSync(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml'), 'utf8')
  );
  if (ledger.length > 0) {
    const corpus = createStdioDocsClient();
    // The canonical ledger docs, for the consumer lane (step 5), which derives and resolves its own.
    const ledgerDocs: CanonicalAgentDoc[] = [];
    const consumerOutputs: GeneratedOutput[] = [];
    try {
      for (const agentName of ledger) {
        const srcAbs = path.join(repoRoot, 'canonical', 'agents', `${agentName}.md`);
        if (!fs.existsSync(srcAbs)) {
          throw new Error(
            `generateAll: ledger agent "${agentName}" has no canonical source at ` +
              `canonical/agents/${agentName}.md — a ledger entry without source is a broken cutover.`
          );
        }
        const doc = parseCanonicalAgentSource(fs.readFileSync(srcAbs, 'utf8'), srcAbs);
        const { resolved, emitCtx } = await resolveForEmission(repoRoot, ctx, doc, corpus);
        ledgerDocs.push(doc);
        for (const adapter of adapters) {
          for (const file of adapter.emitAgent(resolved, emitCtx)) {
            outputs.push(emittedToOutput(file));
          }
          outputs.push({
            path: `canonical/manifests/${agentName}.${adapter.target}.ambient-manifest.json`,
            content: serializeAmbientManifest(resolved.ambientManifests[adapter.target]),
          });
        }
      }

      // 5. The CONSUMER rendering (Spec 123 Tasks 15.1–15.3; design C12, C19, C22; Req 9.5):
      // derive() over every ledger agent, the shared catalog and the identity docs, then the SAME
      // adapters over the derived charters, remapped under `canonical/_consumer-output/<target>/`.
      // Inside the corpus session: the derived charters resolve like any other. A guarded root.
      const alwaysSetIds = ctx.alwaysSet.map((m) => m.id);
      consumerOutputs.push(
        ...(await generateConsumerRendering({
          agents: ledgerDocs,
          identity: loadIdentityDocs(repoRoot, alwaysSetIds),
          sharedCatalogText: fs.readFileSync(path.join(repoRoot, 'canonical', 'shared', 'shared-catalog.yaml'), 'utf8'),
          inputs: loadConsumerInputs(repoRoot, ledger, alwaysSetIds.filter((id) => !TEMPLATE_MEMBERS.includes(id))),
          adapters,
          resolve: (d) => resolveForEmission(repoRoot, ctx, d, corpus),
          docIdToPath: consumerDocIdToPath(repoRoot, alwaysSetIds),
          alwaysSetIds,
        }))
      );
    } finally {
      await corpus.close();
    }

    // demotion-delta.json is a GENERATED artifact (it lives under the guarded
    // canonical/manifests root, so the generator must emit it or the guard would flag the
    // sweep-8 CLI's copy as a stale extra). Same pure functions + the SAME fresh-side
    // definition sweep 8 uses: manifest ids ∪ the regenerated Kiro config's normalized
    // resources (preserved knowledgeBase hand-wiring cancels; trimmed artifacts register).
    const { readBaselines, serializeDemotionDeltas, normalizeKiroResourceToMember } =
      require('./sweeps/sweep-8-demotion') as typeof import('./sweeps/sweep-8-demotion');
    const freshIdsByAgent = new Map<string, Set<string>>();
    const add = (agent: string, members: string[]): void => {
      const set = freshIdsByAgent.get(agent) ?? new Set<string>();
      members.forEach((id) => set.add(id));
      freshIdsByAgent.set(agent, set);
    };
    for (const out of outputs) {
      const manifestMatch = out.path.match(/^canonical\/manifests\/(.+)\.(cc|kiro)\.ambient-manifest\.json$/);
      if (manifestMatch) {
        add(manifestMatch[1], (JSON.parse(out.content) as { members: Array<{ id: string }> }).members.map((x) => x.id));
        continue;
      }
      const configMatch = out.path.match(/^\.kiro\/agents\/(.+)\.json$/);
      if (configMatch && ledger.includes(configMatch[1])) {
        const resources = (JSON.parse(out.content) as { resources?: Array<string | { source?: string }> }).resources ?? [];
        add(
          configMatch[1],
          resources.map(normalizeKiroResourceToMember).filter((m): m is string => m !== undefined)
        );
      }
    }
    const deltas = readBaselines(repoRoot)
      .filter((b) => ledger.includes(b.agent))
      .map((b) => ({
        agent: b.agent,
        removals: b.members.filter((mem) => !(freshIdsByAgent.get(b.agent)?.has(mem) ?? false)).sort(),
      }));
    outputs.push({ path: 'canonical/manifests/demotion-delta.json', content: serializeDemotionDeltas(deltas) });

    outputs.push(...consumerOutputs);
  }

  // Deterministic output ordering (P1).
  return outputs.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
}

// ============================================================================
// The fixture lane (C10.3) + the corpus-session wiring a cutover reuses
// ============================================================================

/** The fixture pseudo-agent's canonical source (absent → the lane emits nothing). */
export const FIXTURE_SOURCE = 'canonical/agents/_fixture.md';
/** The fixture's output root — physically outside every runtime agent dir (C10.3). */
export const FIXTURE_OUTPUT_ROOT = 'canonical/_fixture-output';
/**
 * Where a CONSUMER-profile fixture emission is remapped (Task 15.0). Deliberately NOT a guarded
 * root and never written by `generateAll`: consumer fixtures are test-time outputs (Task 14's
 * per-target guard), so they can never overwrite the steward fixture's guarded output.
 */
export const CONSUMER_FIXTURE_OUTPUT_ROOT = 'canonical/_fixture-output-consumer';

/** Consumer-profile inputs for a single fixture emission (Task 15.0; Task 14's guard). */
export interface FixtureEmitOptions {
  /** Default `'steward'` — the guarded, byte-identical fixture lane. */
  profile?: Profile;
  /** The fixture agent's disposition rows (required when `profile` is `'consumer'`). */
  dispositions?: Dispositions & RowFile;
  /**
   * The fixture agent's parsed overlay, WITH its pins (`parseOverlay(...)`) — `derive()` checks the
   * pins and substitutes each `## @entry` VALUE (Task 15.3; the 15.0 (b) erratum).
   */
  overlay?: ParsedOverlay;
}

// ============================================================================
// The consumer rendering (Spec 123 Task 15.1; design C12, C17, C22; Req 9.5)
// ============================================================================

/** One ledger agent, validated and resolved, with its emit context — what both lanes emit from. */
export interface ResolvedForEmission {
  resolved: Awaited<ReturnType<typeof resolveAgent>>;
  emitCtx: AdapterContext;
}

/** An injected resolver: validate + resolve a (derived) doc for emission (the docs MCP in `generateAll`). */
export type ResolveDoc = (doc: CanonicalAgentDoc) => Promise<ResolvedForEmission>;

/** One always-set identity doc as shipped: its canonical path and body (its own frontmatter is dropped — C19). */
export interface IdentityDoc {
  id: string;
  source: string;
  body: string;
}

/**
 * The always-set members that ship as TEMPLATES, not as identity member files (C19; Req 12.3:
 * `personal-note.md` is the only instance). Its counterpart, `templates/personal-note.template.md`,
 * is Task 22's; the consumer's copy lives at `.designerpunk/personal-note.local.md`.
 */
export const TEMPLATE_MEMBERS: readonly string[] = Object.freeze(['personal-note']);
/** Where a template member lives in the consumer's repo (C19; Req 18). */
export const TEMPLATE_MEMBER_PATH = '.designerpunk/personal-note.local.md';
/** Where the package's own files resolve from in the consumer's repo (C20: `packageRoot`-relative). */
export const CONSUMER_PACKAGE_ROOT = 'node_modules/@3fn/core';

/** The consumer profile's inputs as committed under `canonical/profiles/consumer/`. */
export interface ConsumerProfileInputs {
  /** Agent id → its parsed, schema-validated dispositions rows. */
  dispositions: Record<string, Dispositions & RowFile>;
  /** Agent id → its parsed overlay, WITH its pins (absent when the agent re-points nothing). */
  overlays: Record<string, ParsedOverlay>;
  /** The shared catalog's rows (`_shared.dispositions.yaml`) and overlay. */
  shared?: { dispositions: RowFile; overlay?: ParsedOverlay };
  /** Identity doc id → its rows (`counterpart:`) and overlay (`always-set/<id>.*`). */
  identity: Record<string, { dispositions: Dispositions & RowFile; overlay?: ParsedOverlay }>;
  /** Every profile file the population requires that is absent. */
  missing: string[];
  /** Whether ANY profile file exists — the profile is authored. */
  authored: boolean;
}

/** Where the derived consumer canonical lands — once, not per target (design C22, C12). */
export const CONSUMER_CANONICAL_ROOT = `${CONSUMER_OUTPUT_ROOT}/_canonical`;

/** `canonical/profiles/consumer/<agent>.dispositions.yaml`. */
export const agentDispositionsPath = (agent: string): string => `${PROFILE_DIR}/${agent}.dispositions.yaml`;
/** `canonical/profiles/consumer/<agent>.overlay.md` (the same stem — freshness pairs them by it). */
export const agentOverlayPath = (agent: string): string => `${PROFILE_DIR}/${agent}.overlay.md`;
/** The shared catalog's profile files (C17: members once, signed by each member's owner). */
export const SHARED_DISPOSITIONS_PATH = `${PROFILE_DIR}/_shared.dispositions.yaml`;
export const SHARED_OVERLAY_PATH = `${PROFILE_DIR}/_shared.overlay.md`;
/** An always-set member's profile files (C19). */
export const identityDispositionsPath = (id: string): string => `${PROFILE_DIR}/always-set/${id}.dispositions.yaml`;
export const identityOverlayPath = (id: string): string => `${PROFILE_DIR}/always-set/${id}.overlay.md`;

/**
 * Load the committed consumer profile: each agent's dispositions (schema-validated — 13.1) and
 * overlay (13.2), the shared catalog's, and each identity doc's. Key currency and pin freshness
 * are `derive()`'s refusals (C22) and the freshness sweep's, not this loader's.
 */
export function loadConsumerInputs(repoRoot: string, agents: readonly string[], identityIds: readonly string[] = []): ConsumerProfileInputs {
  const inputs: ConsumerProfileInputs = { dispositions: {}, overlays: {}, identity: {}, missing: [], authored: false };
  const readIf = (rel: string): string | undefined => (fs.existsSync(path.join(repoRoot, rel)) ? fs.readFileSync(path.join(repoRoot, rel), 'utf8') : undefined);
  const load = (disp: string, over: string): { dispositions: Dispositions & RowFile; overlay?: ParsedOverlay } | undefined => {
    const text = readIf(disp);
    if (text === undefined) {
      inputs.missing.push(disp);
      return undefined;
    }
    inputs.authored = true;
    const overlayText = readIf(over);
    return {
      dispositions: loadDispositions(text, disp) as unknown as Dispositions & RowFile,
      ...(overlayText !== undefined ? { overlay: parseOverlay(overlayText, over) } : {}),
    };
  };
  for (const agent of agents) {
    const got = load(agentDispositionsPath(agent), agentOverlayPath(agent));
    if (!got) continue;
    inputs.dispositions[agent] = got.dispositions;
    if (got.overlay) inputs.overlays[agent] = got.overlay;
  }
  const shared = load(SHARED_DISPOSITIONS_PATH, SHARED_OVERLAY_PATH);
  if (shared) inputs.shared = shared;
  for (const id of identityIds) {
    const got = load(identityDispositionsPath(id), identityOverlayPath(id));
    if (got) inputs.identity[id] = got;
  }
  return inputs;
}

/** The population refusal: the consumer profile is authored in full, or not at all. */
export const partialConsumerPopulationMessage = (missing: readonly string[]): string =>
  `generateConsumerRendering: the consumer profile is partly authored — missing ${missing.join(', ')}; ` +
  `every ledger agent, the shared catalog and every identity doc carries its dispositions file, or none does yet; ` +
  `refusing to render a partial population (design C12; Req 9.5)`;

/**
 * The CONSUMER `docIdToPath` (Task 15.3; C19, C20): where each doc a Kiro config's `resources`
 * names lives in the CONSUMER's repo — an identity doc at its member file
 * (`.kiro/steering/designerpunk-<id>.md`), a template member at `.designerpunk/…`, and every other
 * doc (governance, non-identity steering) inside the installed package, `packageRoot`-relative.
 */
export function consumerDocIdToPath(repoRoot: string, alwaysSetIds: readonly string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [id, rel] of Object.entries(buildDocIdToPath(repoRoot))) {
    if (TEMPLATE_MEMBERS.includes(id)) out[id] = TEMPLATE_MEMBER_PATH;
    else if (alwaysSetIds.includes(id)) out[id] = `.kiro/steering/designerpunk-${id}.md`;
    else out[id] = `${CONSUMER_PACKAGE_ROOT}/${rel}`;
  }
  return out;
}

/** Everything one consumer render reads — pure given `resolve` (tests inject a stub). */
export interface ConsumerRenderInput {
  /** The canonical ledger agents, in ledger order. */
  agents: readonly CanonicalAgentDoc[];
  /** The shipped identity docs (template members excluded). */
  identity: readonly IdentityDoc[];
  /** `canonical/shared/shared-catalog.yaml`'s text. */
  sharedCatalogText: string;
  inputs: ConsumerProfileInputs;
  adapters: readonly TargetAdapter[];
  resolve: ResolveDoc;
  /** The consumer `docIdToPath` ({@link consumerDocIdToPath}). */
  docIdToPath: Readonly<Record<string, string>>;
  alwaysSetIds: readonly string[];
}

/**
 * THE CONSUMER RENDERING (Tasks 15.1–15.3; design C12, C19, C22; Req 9.5): "target renderings =
 * rendering(derive(x))".
 *
 *   0. POPULATION — nothing authored → nothing emitted (the declared pre-15.4 state); partly
 *      authored → refuse, naming every missing file.
 *   1. DERIVE EVERYTHING FIRST (a refusal stops the whole render, nothing emitted — C22): the
 *      shared catalog; every identity doc (frontmatter dropped — C19); every agent charter
 *      (re-pointed entry VALUES substituted, disposed entries pruned). Each derived charter must
 *      pass the steward `validate()` — class-level validation, no per-field value shapes.
 *      `_canonical/` gets each derived artifact ONCE, not per target.
 *   2. EMIT, per declared target: each agent from its DERIVED frontmatter (resolved like any
 *      charter — so its ambient manifest, embeds, Kiro `resources` / `allowedPaths` and CC
 *      `tools:` are built from surviving values), attributed to the canonical origin through
 *      `entryOrigin`; the derived shared catalog; the consumer `docIdToPath`; then the identity
 *      member files (`emitIdentityMembers`). Paths remap to `canonical/_consumer-output/<target>/`.
 */
export async function generateConsumerRendering(input: ConsumerRenderInput): Promise<GeneratedOutput[]> {
  const { agents, identity, inputs, adapters } = input;
  if (!inputs.authored) return [];
  if (inputs.missing.length > 0) throw new Error(partialConsumerPopulationMessage(inputs.missing));
  const outputs: GeneratedOutput[] = [];

  // 1. Derive everything first.
  const shared = inputs.shared as { dispositions: RowFile; overlay?: ParsedOverlay };
  const derivedCatalog = deriveSharedCatalog(input.sharedCatalogText, shared.dispositions, SHARED_DISPOSITIONS_PATH, shared.overlay);
  outputs.push({ path: `${CONSUMER_CANONICAL_ROOT}/shared/shared-catalog.yaml`, content: derivedCatalog });
  const sharedRows = (shared.dispositions.members ?? {}) as Dispositions['members'];

  const members: IdentityMemberInput[] = [];
  for (const doc of identity) {
    const profile = inputs.identity[doc.id];
    const derived = derive({ source: doc.source, frontmatter: {}, body: doc.body, dispositions: profile.dispositions, overlay: profile.overlay, dispositionsFile: identityDispositionsPath(doc.id) });
    outputs.push({ path: `${CONSUMER_CANONICAL_ROOT}/always-set/${doc.id}.md`, content: derived.text, attribution: derived.attribution });
    members.push({
      id: doc.id,
      source: doc.source,
      body: doc.body,
      dispositions: { body: profile.dispositions.body },
      ...(profile.overlay ? { overlay: toSpanOverlay(profile.overlay) } : {}),
    });
  }

  const derivedAgents: { doc: CanonicalAgentDoc; entryOrigin: Record<string, string> }[] = [];
  for (const doc of agents) {
    const agentId = doc.frontmatter.agent;
    const source = `canonical/agents/${agentId}.md`;
    const derived = derive({
      source,
      frontmatter: doc.frontmatter as unknown as YamlDoc,
      body: doc.body,
      dispositions: inputs.dispositions[agentId],
      overlay: inputs.overlays[agentId],
      dispositionsFile: agentDispositionsPath(agentId),
    });
    const derivedFm = derived.frontmatter as unknown as CanonicalAgentDoc['frontmatter'];
    const check = validateAgentDoc({ frontmatter: derivedFm, body: derived.body, sourcePath: `${CONSUMER_CANONICAL_ROOT}/agents/${agentId}.md` }, input.alwaysSetIds);
    if (!check.valid) {
      const lines = [...check.schemaErrors.map((e) => `  - [rule ${e.rule}] ${e.message}`), ...check.duplicationErrors.map((e) => `  - [workflow-rules duplication] line ${e.line}: "${e.matchedPhrase}"`)];
      throw new Error(`generateConsumerRendering: the derived charter for "${agentId}" fails the steward validate():\n${lines.join('\n')}`);
    }
    outputs.push({ path: `${CONSUMER_CANONICAL_ROOT}/agents/${agentId}.md`, content: derived.text, attribution: derived.attribution });
    // Rendering reads the DERIVED frontmatter with the CANONICAL body (the body rows key canonical anchors).
    derivedAgents.push({ doc: { frontmatter: derivedFm, body: doc.body, sourcePath: doc.sourcePath }, entryOrigin: derived.entryOrigin });
  }

  // 2. Emit.
  const sharedCatalog = parseSharedCatalog(derivedCatalog);
  let identityCtx: AdapterContext | undefined;
  for (const { doc, entryOrigin } of derivedAgents) {
    const agentId = doc.frontmatter.agent;
    const { resolved, emitCtx } = await input.resolve(doc);
    const overlay = inputs.overlays[agentId];
    const consumerCtx: AdapterContext = {
      ...emitCtx,
      profile: 'consumer',
      sharedCatalog,
      docIdToPath: input.docIdToPath,
      consumer: {
        dispositions: { [agentId]: { ...inputs.dispositions[agentId], members: sharedRows } },
        overlays: overlay ? { [agentId]: toSpanOverlay(overlay) } : {},
        entryOrigins: { [agentId]: entryOrigin },
      },
    };
    identityCtx = identityCtx ?? consumerCtx;
    for (const adapter of adapters) {
      for (const file of adapter.emitAgent(resolved, consumerCtx)) {
        outputs.push({
          path: `${CONSUMER_OUTPUT_ROOT}/${adapter.target}/${file.path}`,
          content: file.content,
          attribution: file.attribution, // artifact = the consumer-root-relative path (the fixture precedent)
        });
      }
    }
  }
  if (members.length > 0) {
    const ctx = identityCtx ?? ({ profile: 'consumer' } as AdapterContext);
    for (const adapter of adapters) {
      for (const file of adapter.emitIdentityMembers(members, ctx)) {
        outputs.push({ path: `${CONSUMER_OUTPUT_ROOT}/${adapter.target}/${file.path}`, content: file.content, attribution: file.attribution });
      }
    }
  }
  return outputs;
}

/** The shipped identity docs of the always-set (template members excluded), read from the repo. */
export function loadIdentityDocs(repoRoot: string, alwaysSetIds: readonly string[]): IdentityDoc[] {
  const idToPath = buildDocIdToPath(repoRoot);
  return alwaysSetIds
    .filter((id) => !TEMPLATE_MEMBERS.includes(id))
    .map((id) => {
      const source = idToPath[id];
      if (source === undefined) throw new Error(`loadIdentityDocs: always-set member "${id}" has no doc under .kiro/steering or governance`);
      const { body } = splitFrontmatter(fs.readFileSync(path.join(repoRoot, source), 'utf8'), source);
      return { id, source, body };
    });
}

/**
 * Build the doc-id → repo-relative-path map covering BOTH resolve-by-id roots
 * (`.kiro/steering/**` for the identity docs, `governance/**` for the corpus docs). The id
 * is the lowercased basename minus `.md` — the same derivation the docs MCP uses for its
 * `path` ids (e.g. `governance/Token-Governance.md` → `token-governance`). A collision
 * (two files, one id) throws loud rather than silently shadowing.
 */
export function buildDocIdToPath(repoRoot: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const relDir of ['.kiro/steering', 'governance']) {
    let files: string[];
    try {
      files = fs.readdirSync(path.join(repoRoot, relDir)).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files.sort()) {
      const id = f.replace(/\.md$/, '').toLowerCase();
      const rel = `${relDir}/${f}`;
      if (map[id] !== undefined && map[id] !== rel) {
        throw new Error(`buildDocIdToPath: id collision "${id}" (${map[id]} vs ${rel})`);
      }
      map[id] = rel;
    }
  }
  return map;
}

/**
 * Extract the section MARKDOWN from a docs-MCP `get_section` response. The MCP returns a
 * JSON envelope (`{ section: { content, ... }, metrics }`) as its text content — embedding
 * that envelope raw would put JSON plumbing into an agent's operating prompt (caught live
 * by the fixture's first emission, Task 8.1). Falls back to the raw text when the response
 * is not the envelope shape (fakes in tests; a future MCP that returns plain markdown).
 */
export function extractSectionContent(responseText: string): string {
  try {
    const parsed = JSON.parse(responseText) as { section?: { content?: unknown } };
    if (typeof parsed.section?.content === 'string') return parsed.section.content;
  } catch {
    // not a JSON envelope — treat as plain section text
  }
  return responseText;
}

/**
 * Fetch the per-agent-lane embeds (C11 lane 2) for a canonical doc via the corpus session:
 * for each `ambient.governanceAsLaw` entry, the resolved MARKDOWN of every asserted section
 * (concatenated; the section content carries its own heading) keyed by the entry's doc id.
 * Embeds exactly the content the entry's predicates assert — the sections the seat declared
 * load-bearing — using the same `get_section` surface the resolver checks. A section that
 * fails to resolve throws loud (never a silently-empty embed; mirrors the CC adapter's own
 * missing-embed throw).
 */
export async function buildEmbeds(
  doc: CanonicalAgentDoc,
  corpus: CorpusClient
): Promise<Record<string, string>> {
  const parts = await buildEmbedSections(doc, corpus);
  return Object.fromEntries(Object.entries(parts).map(([id, sections]) => [id, sections.map((p) => p.text).join('\n\n')]));
}

/**
 * The same embeds, kept per asserted SECTION (Task 15.3): `{ section, text }` in claim order, one
 * per distinct section. `buildEmbeds` joins them; the CC adapter's consumer path emits one span
 * per section (`ambient[<docid>#<section-slug>]` — the entry tree's leaf), so an embed container
 * is sourced by surviving member spans, never rendered as one block.
 */
export async function buildEmbedSections(
  doc: CanonicalAgentDoc,
  corpus: CorpusClient
): Promise<Record<string, { section: string; text: string }[]>> {
  const embeds: Record<string, { section: string; text: string }[]> = {};
  for (const entry of doc.frontmatter.ambient?.governanceAsLaw ?? []) {
    const parts: { section: string; text: string }[] = [];
    const seenSections = new Set<string>();
    for (const claim of entry.assert) {
      if (seenSections.has(claim.section)) continue; // two claims on one section: embed once
      seenSections.add(claim.section);
      const section = await corpus.getSection(entry.id, claim.section);
      if (section.isError) {
        throw new Error(
          `buildEmbeds: section "${claim.section}" of "${entry.id}" did not resolve — ` +
            `refusing to emit a partial embed (agent "${doc.frontmatter.agent}").`
        );
      }
      parts.push({ section: claim.section, text: extractSectionContent(section.text).trim() });
    }
    embeds[entry.id] = parts;
  }
  return embeds;
}

/**
 * Generate the fixture pseudo-agent through both adapters (validate → resolve → emit — the
 * exact path a cutover uses), remapping every emitted path under
 * `canonical/_fixture-output/<target>/` and adding each target's ambient manifest. Returns
 * [] when no fixture source exists (pre-Task-8 trees).
 */
export async function generateFixture(
  repoRoot: string,
  ctx: AdapterContext,
  adapters: TargetAdapter[],
  opts: FixtureEmitOptions = {}
): Promise<GeneratedOutput[]> {
  const sourceAbs = path.join(repoRoot, FIXTURE_SOURCE);
  if (!fs.existsSync(sourceAbs)) return [];

  const canonicalDoc = parseCanonicalAgentSource(fs.readFileSync(sourceAbs, 'utf8'), sourceAbs);
  const profile: Profile = opts.profile ?? 'steward';
  const agentId = canonicalDoc.frontmatter.agent;
  // Consumer: the adapters render derive()'s frontmatter (Task 15.3 — "target renderings =
  // rendering(derive(x))"); the fixture lane renders no shared-catalog members (their rows are the
  // real profile's `_shared.dispositions.yaml`, never implied here).
  let doc = canonicalDoc;
  let entryOrigin: Record<string, string> = {};
  if (profile === 'consumer') {
    if (!opts.dispositions) throw new Error('generateFixture: the consumer profile requires dispositions');
    const derived = derive({
      source: FIXTURE_SOURCE,
      frontmatter: canonicalDoc.frontmatter as unknown as YamlDoc,
      body: canonicalDoc.body,
      dispositions: opts.dispositions,
      overlay: opts.overlay,
    });
    doc = { ...canonicalDoc, frontmatter: derived.frontmatter as unknown as CanonicalAgentDoc['frontmatter'] };
    entryOrigin = derived.entryOrigin;
  }
  const corpus = createStdioDocsClient();
  try {
    const { resolved, emitCtx: baseCtx } = await resolveForEmission(repoRoot, ctx, doc, corpus);
    const emitCtx: AdapterContext =
      profile === 'steward'
        ? baseCtx
        : {
            ...baseCtx,
            profile,
            sharedCatalog: [],
            consumer: {
              dispositions: { [agentId]: opts.dispositions as Dispositions },
              overlays: opts.overlay ? { [agentId]: toSpanOverlay(opts.overlay) } : {},
              entryOrigins: { [agentId]: entryOrigin },
            },
          };
    const root = profile === 'steward' ? FIXTURE_OUTPUT_ROOT : CONSUMER_FIXTURE_OUTPUT_ROOT;
    const outputs: GeneratedOutput[] = [];
    for (const adapter of adapters) {
      for (const file of adapter.emitAgent(resolved, emitCtx)) {
        outputs.push({
          path: `${root}/${adapter.target}/${file.path}`,
          content: file.content,
          attribution: file.attribution,
        });
      }
      outputs.push({
        path: `${root}/${adapter.target}/ambient-manifest.json`,
        content: serializeAmbientManifest(resolved.ambientManifests[adapter.target]),
      });
    }
    return outputs;
  } finally {
    await corpus.close();
  }
}

/**
 * The shared validate→resolve→embeds context assembly BOTH agent lanes use (the fixture,
 * remapped; the runtime ledger agents, real paths). Fail-loud throughout: validation
 * errors, unresolved refs, and unresolvable embeds all throw naming the agent — a cutover
 * emission must resolve FULLY (the sweeps adjudicate content questions; emission never
 * ships a partial agent).
 */
export async function resolveForEmission(
  repoRoot: string,
  ctx: AdapterContext,
  doc: CanonicalAgentDoc,
  corpus: CorpusClient
): Promise<{ resolved: Awaited<ReturnType<typeof resolveAgent>>; emitCtx: AdapterContext }> {
  const agent = doc.frontmatter.agent;
  const validation = validateAgentDoc(doc, ctx.alwaysSet.map((m) => m.id));
  if (!validation.valid) {
    const schema = validation.schemaErrors.map((e) => `  - [rule ${e.rule}] ${e.message}`);
    const dup = validation.duplicationErrors.map(
      (e) => `  - [workflow-rules duplication] line ${e.line}: "${e.matchedPhrase}"`
    );
    throw new Error(`resolveForEmission: canonical source for "${agent}" failed validation:\n${[...schema, ...dup].join('\n')}`);
  }

  const resolved = await resolveAgent(doc, {
    corpus: new CorpusResolver(corpus),
    alwaysSet: ctx.alwaysSet,
    workflowRules: ctx.workflowRules,
  });
  if (resolved.unresolved.length > 0) {
    throw new Error(
      `resolveForEmission: ${resolved.unresolved.length} unresolved ref(s) in "${agent}" — ` +
        `emission requires full resolution:\n` +
        resolved.unresolved.map((u) => `  - ${u.path}: ${u.detail}`).join('\n')
    );
  }

  const docIdToPath = buildDocIdToPath(repoRoot);
  const emitCtx: AdapterContext = {
    ...ctx,
    ...(await (async () => {
      const embedSections = await buildEmbedSections(doc, corpus);
      const embeds = Object.fromEntries(Object.entries(embedSections).map(([id, parts]) => [id, parts.map((p) => p.text).join('\n\n')]));
      return { embeds, embedSections };
    })()),
    docIdToPath,
    steeringIdToPath: docIdToPath,
  };
  return { resolved, emitCtx };
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
  // Fail loud on a falsy/empty root: `path.join('', p)` and `path.join(undefined as any, p)`
  // both resolve to a RELATIVE path (or an `undefined/`-prefixed one), silently scattering
  // emitted files instead of erroring. A lock-independent regen with a mis-resolved root left
  // a stray `undefined/regen` dir at the U5 cutover validation — this assertion turns that
  // foot-gun into a clear failure.
  if (typeof root !== 'string' || root.trim().length === 0) {
    throw new Error(
      `writeOutputs: "root" must be a non-empty string (got ${JSON.stringify(root)}) — ` +
        `refusing to materialize outputs under an empty/undefined root.`
    );
  }
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

/**
 * The guarded surface ROOTS the diff-guard compares bidirectionally. STATIC substrate roots
 * plus — when `repoRoot` is supplied — the per-agent runtime artifacts DERIVED from the
 * cutover ledger (C6's "derived from the cutover ledger + substrate artifacts"; Stacy's
 * Task 8.2 routed item 3): from an agent's ledger entry forward, its emitted
 * `.claude/agents/<a>.md` and `.kiro/agents/<a>.{json,-prompt.md}` are guarded files —
 * file-grain roots, NOT whole-dir roots, so the not-yet-cut-over hand agents beside them
 * are never flagged as extras. Argless callers (log lines) get the static set.
 */
export function guardedRoots(repoRoot?: string): string[] {
  const staticRoots = [
    'canonical/registry',
    '.claude/skills',
    '.kiro/skills',
    'canonical/manifests',
    'canonical/_fixture-output',
    // C12 (Task 8.2): the coverage map + manifest are generated outputs like any other —
    // listFilesUnder treats a file-path root as a single-file root, so these two individual
    // files ride the same bidirectional compare (a stale map FAILS the diff-guard).
    'canonical/coverage-map.yaml',
    'canonical/coverage-manifest.yaml',
    // C11 lane 1 (OB-7, Task 17): the generated CLAUDE.md (shared always-set `@`-imports) is a
    // guarded output like any other — a hand-edit is a loud diff-guard failure. Its attribution
    // sidecar rides with it (prose artifact, multi-span manifest).
    'CLAUDE.md',
    'CLAUDE.md.attribution.json',
    // C12 (Spec 123 Task 15.1): the consumer rendering — `_canonical/` (derive(), 15.2) and
    // `<target>/` per declared target (agents; identity members at 15.3), sidecars included.
    // One directory root covers all three of C12's guarded surfaces.
    CONSUMER_OUTPUT_ROOT,
  ];
  if (repoRoot === undefined) return staticRoots;
  let ledger: string[] = [];
  try {
    ledger = parseCutoverLedger(
      fs.readFileSync(path.join(repoRoot, 'canonical', 'cutover-ledger.yaml'), 'utf8')
    );
  } catch {
    ledger = [];
  }
  const agentFiles = ledger.flatMap((a) =>
    [`.claude/agents/${a}.md`, `.kiro/agents/${a}.json`, `.kiro/agents/${a}-prompt.md`].flatMap(
      (f) => [f, `${f}.attribution.json`] // prose artifacts carry sidecars — guarded together
    )
  );
  return [...staticRoots, ...agentFiles];
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
