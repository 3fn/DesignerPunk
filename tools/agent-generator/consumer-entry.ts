/**
 * The consumer emission lane (Spec 123 Task 16.1; design C20, C22, C19, C8; Reqs 13, 14.1–14.3).
 *
 * TWO HALVES, ONE FILE, TWO RUNTIMES:
 *
 *   1. CONSUMER SIDE — {@link emitConsumer}. It is bundled by `build:generator` (esbuild) into
 *      `dist/generator/consumer-entry.js` and runs under plain `node` in a consumer's install.
 *      It reads ONLY design C20's shipped inputs, `packageRoot`-relative:
 *        - `dist/consumer-canonical/agents/<a>.md`: the derived charters (prepack's derive());
 *        - `dist/consumer-canonical/shared/{always-set,field-dispositions,shared-catalog,skills-map}.yaml`;
 *        - `dist/consumer-canonical/skills/**`: the filtered skill trees;
 *        - `.kiro/steering/<id>.md` with `dist/consumer-canonical/always-set/<id>.{dispositions.yaml,overlay.md}`:
 *          the identity docs, derived at EMIT time (C22's second call site);
 *        - `dist/mcp/tool-manifest.json`: the tool registry, through `registry.fromManifest`,
 *          never by live introspection;
 *        - `governance/**`: the ambient embeds, through a FILE-BACKED corpus that calls the docs
 *          MCP's own pure section and id functions. No server is started.
 *      It writes nothing. It RETURNS the files, paths relative to `consumerRoot`, and the caller
 *      (`init`, `attach`, `sync`) writes them and records them in the manifest (C7, C20). No
 *      attribution sidecar is emitted (C20).
 *
 *   2. STEWARD SIDE — {@link buildConsumerCanonical}, the PREPACK `derive()` (C22's first call
 *      site; Q5: "what ships SHALL be derived"). `npm run build:consumer-canonical` runs it under
 *      tsx in this repo. It writes `dist/consumer-canonical/`. It loads `generate.ts` through a
 *      COMPUTED require that esbuild cannot follow, so the consumer bundle never carries the
 *      steward pipeline: the docs MCP session, live registry introspection, the coverage map,
 *      the sweeps, and a `require.main` CLI block that would run inside a bundle.
 *
 * RENDERING THE DERIVED CHARTER. The steward's guarded rendering (`generateConsumerRendering`)
 * renders the derived frontmatter with the CANONICAL body and the real disposition rows. This
 * lane has neither: it has only what shipped, the derived text, whose body is already
 * `emitSpans`' consumer output. So it renders the derived charter under the consumer profile
 * with SURVIVOR ROWS: every unit, leaf and catalog member present in the derived input is
 * `retained`. That holds by construction, because derive() pruned everything else. The rows
 * are not a judgment; they restate what survived. The parity test
 * (`consumer-entry.parity.test.ts`) is the arbiter that this lane emits exactly what the
 * signers signed, the guarded rendering.
 *
 * DEGRADATION (Req 13; C20: "warn and exit 0"). The steward profile throws on a missing corpus
 * member, because the corpus is ours. This lane DEGRADES, because the install is the consumer's
 * and mutable (a diet defect, a partial install). The cases:
 *   - a missing identity doc → no member file and no always-layer line for it, plus a warning;
 *   - an unresolvable governance doc or section → that ambient embed or route is dropped from
 *     the agent, plus a warning;
 *   - a granted tool the shipped manifest does not declare → that grant, and any cue routed to
 *     it, is dropped, plus a warning.
 * Each warning is `consumerDegradationMessage` (the catalog). A package that is internally
 * inconsistent in a way that is not a missing member still throws loudly, for example a stale
 * overlay pin or an invalid derived charter.
 *
 * Traces to: Reqs 13, 14.1–14.3, 15A.1; design C20, C22, C19, C8.
 */

import * as fs from 'fs';
import * as path from 'path';
import { dump as dumpYaml } from 'js-yaml';
import { parseSkillsMap, skillKey } from './skills';
import { parseAlwaysSet, type AlwaysSetMember } from './compose';
import { parseCanonicalAgentSource } from './source';
import { resolveAgent, validate as validateAgentDoc, type RefResolution } from './pipeline';
import { CorpusResolver, type CorpusClient, type CorpusToolResult } from './resolve';
import type { CanonicalAgentDoc } from './schema';
import {
  adaptersFor,
  identityMemberName,
  MCP_TO_SERVER,
  parseFieldDispositions,
  parseSharedCatalog,
  type AdapterContext,
  type IdentityMemberInput,
  type SharedCatalogMember,
} from './adapters/index';
import { CONSUMER_PROFILE_PATH, loadConsumerProfile, type ConsumerProfile } from './consumer-profile';
import { derive, deriveSharedCatalog, type RowFile } from './derive';
import { splitFrontmatter, type YamlDoc } from './frontmatter';
import { entryTree, partition } from './partition';
import { loadDispositions } from './regrounding/dispositions';
import { parseOverlay, toSpanOverlay, type ParsedOverlay } from './regrounding/overlay';
import type { Dispositions } from './spans';
import { declaredToolNames, fromManifest, type ManifestRegistry, type ToolManifestLike } from './registry-manifest';
import { WORKFLOW_RULES } from '../../mcp-server/src/rules/workflow-rules';
import { resolveSection } from '../../mcp-server/src/indexer/section-parser';
import { extractFrontmatterInfo } from '../../mcp-server/src/indexer/frontmatter-parser';
import { consumerDegradationMessage } from '../../src/cli/shared/errorCatalog';

// ============================================================================
// Shipped layout (C20) — package-root-relative
// ============================================================================

/** Where prepack writes the derived canonical inside the package (C20, C22). */
export const CONSUMER_CANONICAL_DIR = 'dist/consumer-canonical';
/** The byte copy of `canonical/consumer-profile.yaml` that ships (C12's one list, read through one loader). */
export const PACKAGED_PROFILE_PATH = `${CONSUMER_CANONICAL_DIR}/consumer-profile.yaml`;
/** The shipped tool manifest (`scripts/build-tool-manifest.ts`; C8). */
export const TOOL_MANIFEST_PATH = 'dist/mcp/tool-manifest.json';
/** The roots an identity doc id resolves under, in the package (as `buildDocIdToPath` resolves them in the repo). */
export const DOC_ID_ROOTS: readonly string[] = Object.freeze(['.kiro/steering', 'governance']);
/** The corpus root the ambient embeds resolve against (C20: "ambient embed content | packageRoot/governance"). */
export const CORPUS_ROOT = 'governance';

// Restated from `generate.ts` (Task 15), which this bundle may not import (see the header). Each is
// pinned EQUAL to its generate.ts original by `consumer-entry.paths.test.ts`.
/** The always-set members that ship as templates, not identity member files (C19). */
export const TEMPLATE_MEMBERS: readonly string[] = Object.freeze(['personal-note']);
/** A template member's path in the consumer's repo (C19; Req 18). */
export const TEMPLATE_MEMBER_PATH = '.designerpunk/personal-note.local.md';
/** Where the package's files live in the consumer's repo — Kiro `resources` paths (C20). */
export const CONSUMER_PACKAGE_ROOT = 'node_modules/@3fn/core';

/** The CC identity member directory (C19 table). */
const CC_IDENTITY_DIR = '.claude/identity';

// ============================================================================
// The packaged profile (C12 — one list, one loader)
// ============================================================================

/** Load the consumer profile an installed package ships — what `init` and `attach` read (C12, DD9). */
export function loadPackagedConsumerProfile(packageRoot: string): ConsumerProfile {
  return loadConsumerProfile(packageRoot, PACKAGED_PROFILE_PATH);
}

// ============================================================================
// The file-backed corpus — ambient embeds with no server (C20; Req 15A.1)
// ============================================================================

/**
 * A {@link CorpusClient} over a governance directory on disk. It answers the two queries
 * resolution and embedding make, `get_document_summary` (does the id resolve?) and
 * `get_section` (the section's markdown), using the docs MCP's OWN pure functions:
 * `extractFrontmatterInfo` for the id index and `resolveSection` for section boundaries. The
 * embedded bytes are therefore the bytes the steward rendering embedded through the running
 * server. Not-found sets `isError`. An ambiguous heading returns without `isError`, as the
 * server does (resolve.ts NOT-FOUND SEMANTICS).
 */
export class FileCorpusClient implements CorpusClient {
  private docs?: Map<string, { key: string; content: string }>;

  constructor(private readonly corpusRoot: string) {}

  private index(): Map<string, { key: string; content: string }> {
    if (this.docs) return this.docs;
    const docs = new Map<string, { key: string; content: string }>();
    const walk = (dir: string): void => {
      let entries: fs.Dirent[];
      try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
      } catch {
        return; // an absent corpus resolves nothing — each ref degrades (Req 13)
      }
      for (const entry of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
        const abs = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(abs);
        else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(abs, 'utf8');
          const id = extractFrontmatterInfo(content).id ?? '';
          if (id !== '') docs.set(id, { key: path.relative(path.dirname(this.corpusRoot), abs).split(path.sep).join('/'), content });
        }
      }
    };
    walk(this.corpusRoot);
    this.docs = docs;
    return docs;
  }

  async getDocumentSummary(id: string): Promise<CorpusToolResult> {
    const doc = this.index().get(id);
    return doc ? { isError: false, text: JSON.stringify({ path: doc.key }) } : { isError: true, text: JSON.stringify({ error: 'FileNotFound', path: id }) };
  }

  async getSection(id: string, heading: string): Promise<CorpusToolResult> {
    const doc = this.index().get(id);
    if (!doc) return { isError: true, text: JSON.stringify({ error: 'FileNotFound', path: id }) };
    const lookup = resolveSection(doc.content, doc.key, { heading });
    if (lookup.kind === 'section') return { isError: false, text: JSON.stringify({ section: lookup.section }) };
    if (lookup.kind === 'ambiguous') return { isError: false, text: JSON.stringify({ ambiguous: { path: id, heading, candidates: lookup.candidates } }) };
    return { isError: true, text: JSON.stringify({ error: 'SectionNotFound', path: id, heading }) };
  }

  async listToolNames(): Promise<string[]> {
    return []; // tools come from the shipped manifest (fromManifest), never from a corpus session
  }

  async close(): Promise<void> {
    // nothing to close — no session was opened
  }
}

/** The section markdown from a `get_section` response (restated from `generate.ts`'s `extractSectionContent`). */
function sectionContent(responseText: string): string {
  try {
    const parsed = JSON.parse(responseText) as { section?: { content?: unknown } };
    if (typeof parsed.section?.content === 'string') return parsed.section.content;
  } catch {
    // not a JSON envelope — plain text
  }
  return responseText;
}

/** The per-section embeds of a charter (restated from `generate.ts`'s `buildEmbedSections`; the parity test pins it). */
async function embedSectionsFor(doc: CanonicalAgentDoc, corpus: CorpusClient): Promise<Record<string, { section: string; text: string }[]>> {
  const embeds: Record<string, { section: string; text: string }[]> = {};
  for (const entry of doc.frontmatter.ambient?.governanceAsLaw ?? []) {
    const parts: { section: string; text: string }[] = [];
    const seen = new Set<string>();
    for (const claim of entry.assert) {
      if (seen.has(claim.section)) continue;
      seen.add(claim.section);
      const got = await corpus.getSection(entry.id, claim.section);
      if (got.isError) {
        // Unreachable after the degradation pass (the same section resolved there); loud if not.
        throw new Error(`emitConsumer: section "${claim.section}" of "${entry.id}" did not resolve after resolution passed (agent "${doc.frontmatter.agent}")`);
      }
      parts.push({ section: claim.section, text: sectionContent(got.text).trim() });
    }
    embeds[entry.id] = parts;
  }
  return embeds;
}

// ============================================================================
// emitConsumer (C20)
// ============================================================================

/** C20's modes. `reference` is CONSUME posture: MCP config and approvals only, no agents. */
export type EmitMode = 'birth' | 'attach' | 'reference' | 'sync';

export interface EmitConsumerOptions {
  /** The installed package's root (`node_modules/@3fn/core` in a consumer's repo). Every input resolves under it. */
  packageRoot: string;
  /** The consumer's repo root. Every output path is relative to it. Never read. */
  consumerRoot: string;
  /** One of the packaged profile's declared targets. */
  target: string;
  mode: EmitMode;
}

/** One emitted file: its consumer-root-relative POSIX path, its bytes, and its grain (C7). */
export interface ConsumerEmittedFile {
  path: string;
  content: string;
  /** `region`: the contents of the DesignerPunk-managed marker region of `path`, for the region splicer (C7, 16.4). */
  grain: 'file' | 'region';
}

export interface EmitConsumerResult {
  target: string;
  mode: EmitMode;
  /** Sorted by path. No attribution sidecars (C20). */
  files: ConsumerEmittedFile[];
  /**
   * The MCP config and approval keys. Always empty here: the per-harness key emitters stay in
   * `src/cli/shared/mcpConfig/{cc,kiro}.ts` (C8), which `init` and `attach` call beside this
   * lane. See the 16.1 completion doc.
   */
  keys: string[];
  /** Req 13's degradation warnings, in emission order. */
  warnings: string[];
}

/** Survivor rows (see the header): every unit, leaf and member in the derived input is `retained`. */
function survivorRows(doc: CanonicalAgentDoc, catalog: readonly SharedCatalogMember[]): Dispositions {
  const retained = { disposition: 'retained' as const };
  return {
    body: Object.fromEntries(partition(doc.body).units.map((u) => [u.anchor, retained])),
    frontmatter: Object.fromEntries(entryTree(doc.frontmatter as unknown as YamlDoc).units.map((l) => [l.path, retained])),
    members: Object.fromEntries(catalog.map((m) => [m.id, retained])),
  };
}

/** Doc id → package-relative path under {@link DOC_ID_ROOTS} (the lowercased-basename id `buildDocIdToPath` uses). */
function docIdToPathUnder(root: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const relDir of DOC_ID_ROOTS) {
    let files: string[];
    try {
      files = fs.readdirSync(path.join(root, relDir)).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files.sort()) {
      const id = f.replace(/\.md$/, '').toLowerCase();
      if (map[id] !== undefined) throw new Error(`emitConsumer: doc id collision "${id}" (${map[id]} vs ${relDir}/${f}) in the installed package`);
      map[id] = `${relDir}/${f}`;
    }
  }
  return map;
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

/**
 * Req 13 for TOOLS: drop every granted tool the shipped manifest does not declare, and every cue
 * routed to it, with a warning each.
 */
function dropUndeclaredTools(doc: CanonicalAgentDoc, registry: ManifestRegistry, warn: (m: string) => void): CanonicalAgentDoc {
  const subset = doc.frontmatter.toolSubset;
  if (!subset) return doc;
  const next = clone(doc);
  const nextSubset = next.frontmatter.toolSubset as Record<string, string[] | undefined>;
  const dropped: { server: string; tool: string }[] = [];
  for (const [server, tools] of Object.entries(subset as Record<string, string[] | undefined>)) {
    if (!tools) continue;
    const declared = declaredToolNames(registry, server);
    const kept = tools.filter((t) => declared.has(t));
    tools.filter((t) => !declared.has(t)).forEach((tool) => dropped.push({ server, tool }));
    nextSubset[server] = kept;
  }
  if (dropped.length === 0) return doc;
  const isDropped = (server: string, tool: string): boolean => dropped.some((d) => d.server === server && d.tool === tool);
  if (next.frontmatter.routes?.cues) {
    next.frontmatter.routes.cues = next.frontmatter.routes.cues.filter((c) => !isDropped(MCP_TO_SERVER[c.mcp as keyof typeof MCP_TO_SERVER], c.tool));
  }
  for (const d of dropped) {
    warn(consumerDegradationMessage(`tool '${d.tool}' (${d.server})`, TOOL_MANIFEST_PATH, `${doc.frontmatter.agent}'s grant of it, and any cue routed to it, was dropped`));
  }
  return next;
}

/**
 * Req 13 for the CORPUS: drop each unresolved route, and each ambient entry with an unresolved
 * claim, with a warning each.
 */
function dropUnresolved(doc: CanonicalAgentDoc, unresolved: readonly RefResolution[], warn: (m: string) => void): CanonicalAgentDoc {
  const next = clone(doc);
  const routeIdx = new Set<number>();
  const entryIdx = new Set<number>();
  for (const u of unresolved) {
    const m = u.path.match(/^(routes\.docs|ambient\.governanceAsLaw)\[(\d+)\]/);
    if (!m) throw new Error(`emitConsumer: unresolved ref at an unexpected path "${u.path}" (agent "${doc.frontmatter.agent}")`);
    (m[1] === 'routes.docs' ? routeIdx : entryIdx).add(Number(m[2]));
    const what = u.section !== undefined ? `section '${u.section}' of governance doc '${u.id}'` : `governance doc '${u.id}'`;
    const consequence = u.kind === 'doc-route' ? `${doc.frontmatter.agent}'s route to it was dropped` : `${doc.frontmatter.agent}'s ambient embed of '${u.id}' was dropped`;
    warn(consumerDegradationMessage(what, `${CORPUS_ROOT}/`, consequence));
  }
  if (next.frontmatter.routes?.docs) next.frontmatter.routes.docs = next.frontmatter.routes.docs.filter((_, i) => !routeIdx.has(i));
  if (next.frontmatter.ambient?.governanceAsLaw) {
    next.frontmatter.ambient.governanceAsLaw = next.frontmatter.ambient.governanceAsLaw.filter((_, i) => !entryIdx.has(i));
  }
  return next;
}

/**
 * C20 — emit the agent layer for one target from the installed package's shipped inputs only.
 * Pure aside from reading `packageRoot`. It never reads `consumerRoot`, writes nothing, and
 * starts no process.
 */
export async function emitConsumer(opts: EmitConsumerOptions): Promise<EmitConsumerResult> {
  const packageRoot = path.resolve(opts.packageRoot);
  const profile = loadPackagedConsumerProfile(packageRoot);
  if (!profile.targets.includes(opts.target)) {
    throw new Error(`emitConsumer: target "${opts.target}" is not declared by the installed package (declared: ${profile.targets.join(', ')})`);
  }
  const warnings: string[] = [];
  const warn = (m: string): void => {
    warnings.push(m);
  };
  // CONSUME posture (C20): MCP config + approvals only — no agents, no birth. Nothing here.
  if (opts.mode === 'reference') return { target: opts.target, mode: opts.mode, files: [], keys: [], warnings };

  const canon = path.join(packageRoot, CONSUMER_CANONICAL_DIR);
  if (!fs.existsSync(path.join(canon, 'agents'))) {
    throw new Error(`emitConsumer: the installed package has no derived canonical at ${CONSUMER_CANONICAL_DIR}/ — it was packed without its prepack build`);
  }
  const read = (rel: string): string => fs.readFileSync(path.join(canon, rel), 'utf8');
  const alwaysSet = parseAlwaysSet(read('shared/always-set.yaml'));
  const fieldDispositions = parseFieldDispositions(read('shared/field-dispositions.yaml'));
  const skillsMap = parseSkillsMap(read('shared/skills-map.yaml'));
  const sharedCatalog = parseSharedCatalog(read('shared/shared-catalog.yaml'));
  const registry = fromManifest(JSON.parse(fs.readFileSync(path.join(packageRoot, TOOL_MANIFEST_PATH), 'utf8')) as ToolManifestLike, TOOL_MANIFEST_PATH);
  const [adapter] = adaptersFor([opts.target], fieldDispositions);
  const alwaysSetIds = alwaysSet.map((m) => m.id);

  // -- Identity members (C19, C22's emit-time call site), degrading on a missing doc ----------
  const idToPath = docIdToPathUnder(packageRoot);
  const members: IdentityMemberInput[] = [];
  const delivered: AlwaysSetMember[] = [];
  for (const member of alwaysSet) {
    if (TEMPLATE_MEMBERS.includes(member.id)) {
      delivered.push(member); // the consumer's own file (C19) — referenced, never emitted here
      continue;
    }
    const source = idToPath[member.id];
    const rowsRel = `always-set/${member.id}.dispositions.yaml`;
    if (source === undefined || !fs.existsSync(path.join(canon, rowsRel))) {
      const where = source === undefined ? `${DOC_ID_ROOTS[0]}/` : `${CONSUMER_CANONICAL_DIR}/${rowsRel}`;
      warn(consumerDegradationMessage(`identity doc '${member.id}'`, where, 'its identity member file and its always-layer entry were not emitted'));
      continue;
    }
    const rowsFile = `${CONSUMER_CANONICAL_DIR}/${rowsRel}`;
    const rows = loadDispositions(read(rowsRel), rowsFile) as unknown as Dispositions & RowFile;
    const overlayRel = `always-set/${member.id}.overlay.md`;
    const overlay: ParsedOverlay | undefined = fs.existsSync(path.join(canon, overlayRel)) ? parseOverlay(read(overlayRel), `${CONSUMER_CANONICAL_DIR}/${overlayRel}`) : undefined;
    const { body } = splitFrontmatter(fs.readFileSync(path.join(packageRoot, source), 'utf8'), source);
    // C22's emit-time call site: derive() is the refusal gate (stale pin, orphaned key, missing row).
    derive({ source, frontmatter: {}, body, dispositions: rows, overlay, dispositionsFile: rowsFile });
    members.push({ id: member.id, source, body, dispositions: { body: rows.body }, ...(overlay ? { overlay: toSpanOverlay(overlay) } : {}) });
    delivered.push(member);
  }

  // Kiro `resources` paths (C19, C20) — the consumer form of `generate.ts`'s `consumerDocIdToPath`.
  const docIdToPath: Record<string, string> = {};
  for (const [id, rel] of Object.entries(idToPath)) {
    docIdToPath[id] = alwaysSetIds.includes(id) ? `.kiro/steering/${identityMemberName(id)}.md` : `${CONSUMER_PACKAGE_ROOT}/${rel}`;
  }
  for (const id of TEMPLATE_MEMBERS) docIdToPath[id] = TEMPLATE_MEMBER_PATH;
  // CC always-layer region lines (C19): each delivered member's file in the consumer's repo.
  const regionPaths: Record<string, string> = Object.fromEntries(
    delivered.map((m) => [m.id, TEMPLATE_MEMBERS.includes(m.id) ? TEMPLATE_MEMBER_PATH : `${CC_IDENTITY_DIR}/${identityMemberName(m.id)}.md`])
  );

  const baseCtx: AdapterContext = {
    workflowRules: WORKFLOW_RULES,
    skillsMap,
    alwaysSet: delivered,
    dispositions: fieldDispositions,
    sharedCatalog,
    repoRoot: canon, // emitSkills' SOURCE root; its destinations are root-free (Task 16.1 split)
    docIdToPath,
    steeringIdToPath: regionPaths,
    profile: 'consumer',
  };

  const emitted: ConsumerEmittedFile[] = [];
  const push = (p: string, content: string, grain: 'file' | 'region' = 'file'): void => {
    emitted.push({ path: p.split(path.sep).join('/'), content, grain });
  };

  // -- Agents (C20 row 1): the derived charters, survivor rows, degradation ------------------
  const corpus = new FileCorpusClient(path.join(packageRoot, CORPUS_ROOT));
  const resolver = new CorpusResolver(corpus);
  const agentFiles = fs.readdirSync(path.join(canon, 'agents')).filter((f) => f.endsWith('.md')).sort();
  for (const file of agentFiles) {
    const rel = `${CONSUMER_CANONICAL_DIR}/agents/${file}`;
    let doc = parseCanonicalAgentSource(read(`agents/${file}`), rel);
    const check = validateAgentDoc(doc, alwaysSetIds);
    if (!check.valid) {
      const lines = [...check.schemaErrors.map((e) => `  - [rule ${e.rule}] ${e.message}`), ...check.duplicationErrors.map((e) => `  - [workflow-rules duplication] line ${e.line}: "${e.matchedPhrase}"`)];
      throw new Error(`emitConsumer: the shipped charter ${rel} fails validate():\n${lines.join('\n')}`);
    }
    doc = dropUndeclaredTools(doc, registry, warn);
    const rctx = { corpus: resolver, alwaysSet: delivered, workflowRules: WORKFLOW_RULES };
    let resolved = await resolveAgent(doc, rctx);
    if (resolved.unresolved.length > 0) {
      doc = dropUnresolved(doc, resolved.unresolved, warn);
      resolved = await resolveAgent(doc, rctx);
      if (resolved.unresolved.length > 0) throw new Error(`emitConsumer: "${doc.frontmatter.agent}" still has unresolved refs after degradation`);
    }
    const embedSections = await embedSectionsFor(doc, corpus);
    const embeds = Object.fromEntries(Object.entries(embedSections).map(([id, parts]) => [id, parts.map((p) => p.text).join('\n\n')]));
    const agentId = doc.frontmatter.agent;
    const ctx: AdapterContext = {
      ...baseCtx,
      embeds,
      embedSections,
      consumer: { dispositions: { [agentId]: survivorRows(doc, sharedCatalog) }, overlays: {}, entryOrigins: { [agentId]: {} } },
    };
    for (const f of adapter.emitAgent(resolved, ctx)) push(f.path, f.content);
  }

  // -- Identity members (C19), skill trees, the always-layer region ---------------------------
  for (const f of adapter.emitIdentityMembers(members, baseCtx)) push(f.path, f.content);
  for (const f of adapter.emitSkills(skillsMap, baseCtx)) push(f.path, f.content);
  for (const f of adapter.emitAlwaysLayer(delivered, baseCtx)) push(f.path, f.content, 'region');

  emitted.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return { target: opts.target, mode: opts.mode, files: emitted, keys: [], warnings };
}

// ============================================================================
// buildConsumerCanonical — the PREPACK derive() (C22 call site 1; steward side only)
// ============================================================================

/**
 * Load `generate.ts` on the steward side. The specifier is COMPUTED on purpose: esbuild bundles
 * a literal `require('./generate')`, and that module carries the steward pipeline (see the
 * header), so the consumer bundle must not contain it. Under tsx in this repo it resolves; in
 * the bundle it is never called.
 */
function stewardGeneration(): typeof import('./generate') {
  const specifier = path.join(__dirname, 'generate');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(specifier) as typeof import('./generate');
}

/**
 * Write `dist/consumer-canonical/` from this repo's canonical and consumer profile (Q5: what
 * ships SHALL be derived; Req 14.8). Every refusal of derive() stops the build, so a stale
 * overlay never ships.
 *
 *   agents/<a>.md          derive() per ledger agent; each passes the steward validate()
 *   shared/shared-catalog  deriveSharedCatalog()
 *   shared/{always-set,field-dispositions}.yaml   byte copies
 *   shared/skills-map.yaml the rows some derived charter's `skills:` names. The filter is by
 *                          rule, never by hand; it drops the pipeline's own `_fixture-skill`.
 *   skills/**              those rows' trees, byte copies
 *   always-set/<id>.*      each identity doc's rows and overlay, byte copies (derived at emit time
 *                          — C22's second call site; derive()d here too, so a refusal stops the
 *                          build rather than the consumer)
 *   consumer-profile.yaml  the byte copy C12's one loader reads in an install
 *
 * Returns the written paths, relative to `outDir`, sorted.
 */
export function buildConsumerCanonical(repoRoot: string, outDir: string = path.join(repoRoot, CONSUMER_CANONICAL_DIR)): string[] {
  const gen = stewardGeneration();
  const readRepo = (rel: string): string => fs.readFileSync(path.join(repoRoot, rel), 'utf8');
  const written: string[] = [];
  const write = (rel: string, content: string | Buffer): void => {
    const abs = path.join(outDir, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
    written.push(rel);
  };
  const copy = (fromRel: string, toRel: string): void => write(toRel, fs.readFileSync(path.join(repoRoot, fromRel)));

  const ledger = gen.parseCutoverLedger(readRepo('canonical/cutover-ledger.yaml'));
  const alwaysSet = parseAlwaysSet(readRepo('canonical/shared/always-set.yaml'));
  const alwaysSetIds = alwaysSet.map((m) => m.id);
  const identityIds = alwaysSetIds.filter((id) => !gen.TEMPLATE_MEMBERS.includes(id));
  const inputs = gen.loadConsumerInputs(repoRoot, ledger, identityIds);
  if (!inputs.authored) throw new Error('buildConsumerCanonical: the consumer profile is not authored — there is nothing to derive, and nothing ships un-derived');
  if (inputs.missing.length > 0) throw new Error(gen.partialConsumerPopulationMessage(inputs.missing));

  // Derive everything first (C22): a refusal stops the build before anything is written.
  const shared = inputs.shared as { dispositions: RowFile; overlay?: ParsedOverlay };
  const catalog = deriveSharedCatalog(readRepo('canonical/shared/shared-catalog.yaml'), shared.dispositions, gen.SHARED_DISPOSITIONS_PATH, shared.overlay);
  const agents: { id: string; text: string; skills: string[] }[] = [];
  for (const agentId of ledger) {
    const sourceRel = `canonical/agents/${agentId}.md`;
    const doc = parseCanonicalAgentSource(readRepo(sourceRel), path.join(repoRoot, sourceRel));
    const derived = derive({
      source: sourceRel,
      frontmatter: doc.frontmatter as unknown as YamlDoc,
      body: doc.body,
      dispositions: inputs.dispositions[agentId],
      overlay: inputs.overlays[agentId],
      dispositionsFile: gen.agentDispositionsPath(agentId),
    });
    const derivedFm = derived.frontmatter as unknown as CanonicalAgentDoc['frontmatter'];
    const check = validateAgentDoc({ frontmatter: derivedFm, body: derived.body, sourcePath: `${CONSUMER_CANONICAL_DIR}/agents/${agentId}.md` }, alwaysSetIds);
    if (!check.valid) {
      const lines = [...check.schemaErrors.map((e) => `  - [rule ${e.rule}] ${e.message}`), ...check.duplicationErrors.map((e) => `  - [workflow-rules duplication] line ${e.line}: "${e.matchedPhrase}"`)];
      throw new Error(`buildConsumerCanonical: the derived charter for "${agentId}" fails the steward validate():\n${lines.join('\n')}`);
    }
    agents.push({ id: agentId, text: derived.text, skills: (derivedFm.skills ?? []) as string[] });
  }
  for (const doc of gen.loadIdentityDocs(repoRoot, alwaysSetIds)) {
    const profile = inputs.identity[doc.id];
    derive({ source: doc.source, frontmatter: {}, body: doc.body, dispositions: profile.dispositions, overlay: profile.overlay, dispositionsFile: gen.identityDispositionsPath(doc.id) });
  }

  // Then write.
  fs.rmSync(outDir, { recursive: true, force: true });
  for (const a of agents) write(`agents/${a.id}.md`, a.text);
  write('shared/shared-catalog.yaml', catalog);
  copy('canonical/shared/always-set.yaml', 'shared/always-set.yaml');
  copy('canonical/shared/field-dispositions.yaml', 'shared/field-dispositions.yaml');
  const referenced = new Set(agents.flatMap((a) => a.skills));
  const skillsMap = parseSkillsMap(readRepo('canonical/shared/skills-map.yaml'));
  const kept = skillsMap.rows.filter((row) => referenced.has(skillKey(row)));
  write(
    'shared/skills-map.yaml',
    '# GENERATED by the prepack derive (Spec 123 Task 16.1) from canonical/shared/skills-map.yaml:\n' +
      '# the rows some shipped charter names in `skills:`; every other row is filtered out by rule.\n' +
      dumpYaml({ rows: kept }, { lineWidth: -1, noRefs: true })
  );
  for (const row of kept) {
    for (const rel of listFiles(path.join(repoRoot, row.canonical))) copy(path.posix.join(row.canonical, rel), path.posix.join(row.canonical, rel));
  }
  for (const id of identityIds) {
    copy(gen.identityDispositionsPath(id), `always-set/${id}.dispositions.yaml`);
    if (fs.existsSync(path.join(repoRoot, gen.identityOverlayPath(id)))) copy(gen.identityOverlayPath(id), `always-set/${id}.overlay.md`);
  }
  copy(CONSUMER_PROFILE_PATH, 'consumer-profile.yaml');
  return written.sort();
}

/** Every file under `dir`, relative POSIX paths, sorted. */
function listFiles(dir: string, base = ''): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(path.join(dir, base), { withFileTypes: true })) {
    const rel = base === '' ? entry.name : `${base}/${entry.name}`;
    if (entry.isDirectory()) out.push(...listFiles(dir, rel));
    else if (entry.isFile()) out.push(rel);
  }
  return out.sort();
}

// ============================================================================
// CLI
// ============================================================================

/**
 * `node dist/generator/consumer-entry.js --target <t> [--mode <m>] [--package-root <p>] [--consumer-root <c>]`
 * prints the files it would emit and its warnings, then exits 0, degraded or not (Req 13). It
 * writes nothing: `init`, `attach` and `sync` own writing and the manifest. Steward side:
 * `tsx tools/agent-generator/consumer-entry.ts prepack [--out <dir>]` runs the prepack derive.
 *
 * The CLI guard compares `process.argv[1]` with this file, never `require.main === module`.
 * `build:generator` defines `require.main` away so that no bundled module's CLI block can run
 * inside the bundle (instruments note N5).
 */
export async function runCli(argv: readonly string[], defaultPackageRoot: string): Promise<number> {
  const flag = (name: string): string | undefined => {
    const i = argv.indexOf(name);
    return i === -1 ? undefined : argv[i + 1];
  };
  if (argv[0] === 'prepack') {
    const repoRoot = path.resolve(__dirname, '..', '..');
    const out = flag('--out');
    const written = buildConsumerCanonical(repoRoot, out ? path.resolve(out) : undefined);
    console.log(`consumer-entry prepack: wrote ${written.length} files to ${out ?? CONSUMER_CANONICAL_DIR}/`);
    return 0;
  }
  const target = flag('--target');
  if (!target) {
    console.error('consumer-entry: --target <name> is required');
    return 2;
  }
  const result = await emitConsumer({
    packageRoot: path.resolve(flag('--package-root') ?? defaultPackageRoot),
    consumerRoot: path.resolve(flag('--consumer-root') ?? process.cwd()),
    target,
    mode: (flag('--mode') ?? 'attach') as EmitMode,
  });
  for (const w of result.warnings) console.error(w);
  for (const f of result.files) console.log(`${f.grain === 'region' ? 'region' : 'file  '} ${f.path}`);
  return 0;
}

if (typeof process.argv[1] === 'string' && path.resolve(process.argv[1]) === __filename) {
  runCli(process.argv.slice(2), path.resolve(__dirname, '..', '..'))
    .then((code) => process.exit(code))
    .catch((error: Error) => {
      console.error(`consumer-entry: FAILED — ${error.message}`);
      process.exit(1);
    });
}
