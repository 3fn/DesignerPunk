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
import { CorpusResolver, createStdioDocsClient, type CorpusClient } from './resolve';
import type { CanonicalAgentDoc } from './schema';
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
  const embeds: Record<string, string> = {};
  for (const entry of doc.frontmatter.ambient?.governanceAsLaw ?? []) {
    const parts: string[] = [];
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
      parts.push(extractSectionContent(section.text).trim());
    }
    embeds[entry.id] = parts.join('\n\n');
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
  adapters: TargetAdapter[]
): Promise<GeneratedOutput[]> {
  const sourceAbs = path.join(repoRoot, FIXTURE_SOURCE);
  if (!fs.existsSync(sourceAbs)) return [];

  const doc = parseCanonicalAgentSource(fs.readFileSync(sourceAbs, 'utf8'), sourceAbs);
  const corpus = createStdioDocsClient();
  try {
    const { resolved, emitCtx } = await resolveForEmission(repoRoot, ctx, doc, corpus);
    const outputs: GeneratedOutput[] = [];
    for (const adapter of adapters) {
      for (const file of adapter.emitAgent(resolved, emitCtx)) {
        outputs.push({
          path: `${FIXTURE_OUTPUT_ROOT}/${adapter.target}/${file.path}`,
          content: file.content,
          attribution: file.attribution,
        });
      }
      outputs.push({
        path: `${FIXTURE_OUTPUT_ROOT}/${adapter.target}/ambient-manifest.json`,
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
    embeds: await buildEmbeds(doc, corpus),
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
