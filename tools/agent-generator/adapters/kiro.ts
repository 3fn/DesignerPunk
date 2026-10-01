/**
 * The Kiro target adapter (C4) — Spec 122 Task 5.3.
 *
 * Built SECOND, deliberately (Req 24 AC2/AC3): this file implements the SAME `TargetAdapter`
 * interface (`adapters/index.ts`) the CC adapter (`adapters/cc.ts`) implements, with NO change
 * to the pipeline engine (pipeline.ts, resolve.ts, render.ts, compose.ts, attribution.ts,
 * schema.ts, canonical-json.ts) or to `adapters/index.ts` beyond one additive field
 * (`AdapterContext.docIdToPath`, added alongside this file). Its landing this way — a pure
 * consumer of the existing engine surface — IS the extensibility-contract verification: adding
 * a target is "implement the interface + a skills-map column + field-dispositions rows," never
 * a rearchitecture (design.md § C4).
 *
 * design C4's Kiro paragraph, matched here: `resources` built from the ambient manifest
 * (id→path at emit time via `ctx.docIdToPath`); `file://` vs `skill://` chosen per the
 * member's `delivery` hint (`AmbientManifestMember.delivery`, compose.ts); server-level MCP
 * grants retained in Kiro's own grammar (`allowedTools: ["@designerpunk-docs", …]`) with the
 * canonical `toolSubset` remaining the checkable object (Req 18 AC2(c)) — this adapter does
 * NOT invent a finer per-tool grant grammar than Kiro's own configs use; `kiro:` frontmatter
 * fields carried straight through into their native config homes.
 *
 * Grammar matched EXACTLY against the two REAL committed configs (`.kiro/agents/ada.json`,
 * `.kiro/agents/data.json`): `name`, `description`, `prompt: "file://./<agent>-prompt.md"`,
 * `includeMcpJson: true`, `tools: ["*"]`, `allowedTools` (`"read"`, `"knowledge"`,
 * `"@<server>"` per subset server), `toolsSettings.write.allowedPaths`, `resources` (mixed
 * `file://`/`skill://` strings + `knowledgeBase` objects — the knowledgeBase object shape is
 * NOT reproduced here; see `emitAgent`'s note), `hooks.agentSpawn`, `keyboardShortcut`,
 * `welcomeMessage`.
 *
 * ATTRIBUTION: the `.json` config is machine-rendered — a single `render` span over the whole
 * file (every byte derives from structured canonical fields), per `adapters/index.ts`'s header
 * rule. The `-prompt.md` companion is prose-bearing — a multi-span manifest, mirroring `cc.ts`'s
 * body construction minus the two CC-only sections (per-agent ambient inline embeds, knowledge
 * fallback — see `emitAgent` below). Both files' spans are constructed by `emitSpans`
 * (spans.ts, Spec 123 C14); this adapter supplies only the rendered text.
 *
 * Traces to: Req 11, Req 15, Req 24 AC1/AC3; design C4.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedAgent } from '../pipeline';
import type { AlwaysSetMember } from '../compose';
import type { ToolSubset, CommandEntry, DocRoute, ToolCueRoute } from '../schema';
import { isNamedGapCommandEntry } from '../schema';
import type { SkillsMapRow, SkillsMap } from '../skills';
import { kiroSkillRef } from '../skills';
import {
  renderWorkflowRules,
  renderWriteScopeNote,
  renderRunContextAnnotation,
  renderToolCue,
  renderDocRoute,
  renderAgentRoute,
  renderGroundTruthFaithfulness,
  renderGroundTruthTrims,
} from '../render';
import { AttributionAccumulator } from '../attribution';
import { emitSpans, type SpanPiece, type SpanPlan, type SpanSource } from '../spans';
import type { YamlDoc } from '../frontmatter';
import { canonicalStringify, type JsonValue } from '../canonical-json';
import type {
  TargetAdapter,
  AdapterContext,
  EmittedFile,
  FieldDispositionTable,
  SharedCatalogMember,
  IdentityMemberInput,
} from './index';
import { identityMemberName, identityMembersStewardMessage, renderIdentityMember, spanInputsFor } from './index';
import { CONSUMER_GENERATED_BANNER } from './cc';

// ============================================================================
// toolRef — NATIVE (non-namespaced) Kiro tool-reference syntax
// ============================================================================

/**
 * Which registry-server keys of ToolSubset are searched, and in what order (deterministic —
 * matches CcAdapter's same fixed order, not registry iteration order).
 */
const TOOL_SUBSET_SERVERS: readonly (keyof ToolSubset)[] = [
  'designerpunk-docs',
  'designerpunk-application',
  'designerpunk-product',
];

/** Kiro's server-level grant name for a subset server, e.g. `@designerpunk-docs`. */
function serverGrant(server: keyof ToolSubset): string {
  return `@${server}`;
}

/**
 * Kiro uses NATIVE (non-namespaced) tool names — no `mcp__<server>__` prefix. Verifies `tool`
 * appears in SOME subset server (throwing loud if not, matching CcAdapter's fail-loud
 * behavior) and returns the bare name unchanged.
 */
function toolRefImpl(subset: ToolSubset, tool: string): string {
  for (const server of TOOL_SUBSET_SERVERS) {
    const tools = subset[server];
    if (tools?.includes(tool)) {
      return tool;
    }
  }
  const declared = TOOL_SUBSET_SERVERS.flatMap((s) => (subset[s] ?? []).map((t) => `${s}:${t}`)).sort();
  throw new Error(
    `KiroAdapter.toolRef: tool "${tool}" is not declared by any server in the agent's toolSubset ` +
      `(declared: ${declared.join(', ') || '<none>'}).`
  );
}

/** Every server-level grant string for a subset, deterministic order (declared server order, not sorted — matches real configs' authored order). */
function allServerGrants(subset: ToolSubset): string[] {
  const grants: string[] = [];
  for (const server of TOOL_SUBSET_SERVERS) {
    if ((subset[server] ?? []).length > 0) {
      grants.push(serverGrant(server));
    }
  }
  return grants;
}

/** The flat (non-namespaced) tool names in a subset — what WORKFLOW_RULES.appliesToTools names. */
function allFlatTools(subset: ToolSubset): string[] {
  const refs: string[] = [];
  for (const server of TOOL_SUBSET_SERVERS) {
    for (const tool of subset[server] ?? []) {
      refs.push(tool);
    }
  }
  return refs;
}

// ============================================================================
// renderWriteScope — BASE field-driven note only (Kiro has a declarative field)
// ============================================================================

/**
 * Kiro HAS a declarative per-agent write-path field (`toolsSettings.write.allowedPaths`,
 * carried through in `emitAgent`'s config) — unlike CC (facet 7), there is no enforcement-
 * options sentence to layer on. The base field-driven note (render.ts) is the whole story.
 */
/**
 * The consumer profile's per-member write-scope rendering (Task 15.0): an intro line, one bullet
 * per glob (each its own `writeScope[<glob>]` span), then the closing text. The steward profile
 * keeps the one-sentence container rendering above, byte-identical.
 */
const WRITE_SCOPE_MEMBERS_INTRO =
  'Write scope (behavioral): you may create or modify files only under these paths — treat paths outside this set as read-only:';
const WRITE_SCOPE_MEMBERS_OUTRO = '\n';

function renderWriteScopeImpl(paths: readonly string[]): string {
  return renderWriteScopeNote(paths);
}

// ============================================================================
// Command rendering (mirrors cc.ts — same fields, native tool names)
// ============================================================================

function renderCommandEntry(entry: CommandEntry, profile: 'steward' | 'consumer' = 'steward'): string {
  const annotation = renderRunContextAnnotation(entry.runContext, profile);
  const suffix = annotation ? ` (${annotation})` : '';
  if (isNamedGapCommandEntry(entry)) {
    const cue = entry.cue ? ` — ${entry.cue}` : '';
    return `- ${entry.gap}${cue}${suffix}`;
  }
  const cue = entry.cue ? entry.cue : entry.name;
  return `- ${cue}: \`${entry.cmd}\`${suffix}`;
}

function renderSharedCatalogMember(member: SharedCatalogMember, subset: ToolSubset): string {
  switch (member.kind) {
    case 'command': {
      const annotation = member.cue ?? member.id;
      return `- ${annotation}: \`${member.cmd ?? ''}\``;
    }
    case 'tool-cue': {
      const toolName = member.tool ? toolRefImpl(subset, member.tool) : member.tool ?? '';
      return `- ${member.cue ?? member.id} (${toolName})`;
    }
    case 'governance-rule': {
      return `- ${member.statement ?? member.id}`;
    }
  }
}

// ============================================================================
// resources[] — id -> file:// or skill:// entry (design C4: "id→path at emit time")
// ============================================================================

/** Resolve one ambient-manifest member to its `resources[]` URI string. Throws loud on a missing docIdToPath id. */
function resourceUriFor(memberId: string, delivery: 'file' | 'skill', ctx: AdapterContext): string {
  const target = ctx.docIdToPath?.[memberId];
  if (target === undefined) {
    throw new Error(
      `KiroAdapter.emitAgent: no docIdToPath entry for ambient-manifest member "${memberId}" ` +
        `— cannot resolve its resources:// path.`
    );
  }
  const scheme = delivery === 'file' ? 'file' : 'skill';
  return `${scheme}://${target}`;
}

// ============================================================================
// The KiroAdapter
// ============================================================================

export class KiroAdapter implements TargetAdapter {
  readonly target = 'kiro' as const;

  constructor(private readonly _dispositions: FieldDispositionTable) {}

  get dispositions(): FieldDispositionTable {
    return this._dispositions;
  }

  toolRef(subset: ToolSubset, tool: string): string {
    return toolRefImpl(subset, tool);
  }

  skillRef(row: SkillsMapRow): string {
    return kiroSkillRef(row);
  }

  renderWriteScope(paths: readonly string[]): string {
    return renderWriteScopeImpl(paths);
  }

  emitAgent(agent: ResolvedAgent, ctx: AdapterContext): EmittedFile[] {
    const fm = agent.doc.frontmatter;
    const subset = fm.toolSubset ?? {};

    return [this.emitConfig(agent, ctx), this.emitPrompt(agent, ctx, subset)];
  }

  // -- .kiro/agents/<agent>.json ---------------------------------------------
  // Single render-span attribution (machine JSON) — every byte derives from structured
  // canonical fields, per adapters/index.ts's ATTRIBUTION RULE.
  private emitConfig(agent: ResolvedAgent, ctx: AdapterContext): EmittedFile {
    const fm = agent.doc.frontmatter;
    const subset = fm.toolSubset ?? {};
    const path = `.kiro/agents/${fm.agent}.json`;

    // -- resources: -----------------------------------------------------------
    // Built from the Kiro ambient manifest, sorted by id (deterministic — the manifest is
    // already sorted by id per compose.ts, preserved here rather than re-sorted independently).
    const manifest = agent.ambientManifests.kiro;
    const resourceEntries: string[] = manifest.members.map((m) => resourceUriFor(m.id, m.delivery, ctx));

    // Each canonical `skills:` row key resolved via skillRef, sorted for determinism.
    const skillKeys = [...(fm.skills ?? [])].sort();
    const skillResources: string[] = skillKeys.map((key) => {
      const row = resolveSkillKey(ctx.skillsMap, key);
      return this.skillRef(row);
    });

    // Rich knowledgeBase objects (Req 15 AC2 — the hand-wired ada.json shape, preserved by
    // regeneration; Task 5 open item landed at Ada's cutover): a declaration carrying
    // `source` emits the full Kiro-native object into resources, after the doc + skill
    // entries (matching the live hand-config ordering).
    const kbResources: JsonValue[] = (fm.knowledgeBases ?? [])
      .filter((kb) => typeof kb.source === 'string')
      .map((kb) => {
        const obj: Record<string, JsonValue> = {
          type: 'knowledgeBase',
          source: kb.source as string,
          name: kb.name,
        };
        if (kb.description !== undefined) obj.description = kb.description;
        if (kb.indexType !== undefined) obj.indexType = kb.indexType;
        if (kb.autoUpdate !== undefined) obj.autoUpdate = kb.autoUpdate;
        return obj;
      });

    const resources: JsonValue[] = [...resourceEntries, ...skillResources, ...kbResources];

    // -- config object (canonical, key-sorted by the serializer) --------------
    const config: Record<string, JsonValue> = {
      name: fm.agent,
      description: fm.description,
      prompt: `file://./${fm.agent}-prompt.md`,
      includeMcpJson: true,
      tools: ['*'],
      allowedTools: ['read', 'knowledge', ...allServerGrants(subset)],
      resources,
    };

    if (fm.writeScope && fm.writeScope.length > 0) {
      config.toolsSettings = {
        write: { allowedPaths: [...fm.writeScope] },
      };
    }

    const kiroFields = fm.kiro;
    if (kiroFields?.agentSpawn && kiroFields.agentSpawn.length > 0) {
      config.hooks = {
        agentSpawn: kiroFields.agentSpawn.map((c) => ({ command: c.command, timeout_ms: c.timeout_ms })),
      };
    }
    if (kiroFields?.keyboardShortcut) {
      config.keyboardShortcut = kiroFields.keyboardShortcut;
    }
    if (kiroFields?.welcomeMessage) {
      config.welcomeMessage = kiroFields.welcomeMessage;
    }

    // Machine JSON: one `render` span over the whole file, still constructed by `emitSpans`
    // (C14) — a per-entry attribution INSIDE the JSON is not attempted (carried to Task 14/15).
    // It stays steward-shaped under EVERY profile (Task 15.0 scope; consumer JSON semantics are C20's).
    const acc = new AttributionAccumulator();
    const content = emitSpans(acc, spanSource(agent), 'steward', undefined, undefined, [
      { kind: 'glue', glue: 'kiro-config', text: canonicalStringify(config as JsonValue) },
    ]).text;
    const attribution = acc.build(path);

    return { path, content, attribution };
  }

  // -- .kiro/agents/<agent>-prompt.md ----------------------------------------
  // Multi-span attribution, mirroring cc.ts's body construction — minus the two CC-only
  // sections (per-agent ambient inline embeds; knowledge fallback), since Kiro delivers both
  // via native config surfaces (resources / knowledgeBases), not prompt-body prose.
  private emitPrompt(agent: ResolvedAgent, ctx: AdapterContext, subset: ToolSubset): EmittedFile {
    const fm = agent.doc.frontmatter;
    const path = `.kiro/agents/${fm.agent}-prompt.md`;
    const acc = new AttributionAccumulator();
    const bodyParts: string[] = [];

    // EVERY span below is constructed by `emitSpans` (C14, Spec 123 Task 10.4): this adapter
    // supplies only the per-target RENDERING of each piece — never a span, never a source.
    // The profile and this agent's consumer inputs come from `AdapterContext` (Task 15.0);
    // absent, the profile is `'steward'` and the rendering is byte-identical to pre-15.0.
    const span = spanInputsFor(ctx, fm.agent);
    const src: SpanSource = { ...spanSource(agent), entryOrigin: span.entryOrigin };
    const emit = (plan: SpanPlan): string => emitSpans(acc, src, span.profile, span.dispositions, span.overlay, plan).text;

    // -- O-3 banner (settle ballot 2026-09-17 §9, option (a)) ----------------
    // Kiro prompts carry no frontmatter, so "immediately after the frontmatter"
    // degenerates to the first bytes of the file.
    // Under the consumer profile, the banner that is true in a consumer's repo (Spec 123 Task
    // 16.1) — the same line the CC adapter renders. Same glue, same single line.
    const generatedBanner =
      span.profile === 'consumer'
        ? CONSUMER_GENERATED_BANNER
        : `<!-- GENERATED FILE — do not hand-edit. Source: canonical/agents/${fm.agent}.md; ` +
          'edit there and regenerate (Spec 122 pipeline). Hand-edits are overwritten and ' +
          'caught by 122-diff-guard. -->\n\n';
    bodyParts.push(emit([{ kind: 'glue', glue: 'generated-banner', text: generatedBanner }]));

    // -- (a) Pass-through body — one span per partition unit (C13/C14) --------
    bodyParts.push(emit('body'));

    // NOTE: no "## Ambient (per-agent)" inline-embed section here (unlike cc.ts). Kiro
    // delivers ambient membership (shared AND per-agent lane) via the config's `resources`
    // array built in emitConfig — the reference mechanism EXISTS on this target, so per the
    // design's Rosetta-framing the reference form is used and nothing is inlined into the
    // prompt body (design C11: "an adapter KNOWS its harness's native delivery model").

    // -- (a2) Ground truth (manifest verdict honored as DATA — Req 10 AC2/AC3) ------
    // The ground-truth directive has NO native Kiro config surface (unlike ambient
    // membership → resources), so it renders into the prompt body on this target too.
    // Two mutually-exclusive legs (faithfulnessVerbs XOR trims); native (non-namespaced)
    // tool names via toolRef (fail-loud when a tool is not granted by the subset).
    const kiroManifest = agent.ambientManifests.kiro;
    if (kiroManifest.groundTruth) {
      const toolName = (t: string): string => toolRefImpl(subset, t);
      const groundTruthBody =
        renderGroundTruthFaithfulness(kiroManifest.groundTruth, toolName) ??
        renderGroundTruthTrims(kiroManifest.groundTruth, toolName);
      if (groundTruthBody !== undefined) {
        bodyParts.push(
          emit([{ kind: 'entry', path: 'ambient.groundTruthManifest', text: `## Ground truth\n\n${groundTruthBody}\n\n` }])
        );
      }
    }

    // -- (b) Workflow rules ---------------------------------------------------
    const flatTools = allFlatTools(subset);
    const workflowRulesText = renderWorkflowRules(ctx.workflowRules, flatTools);
    if (workflowRulesText.length > 0) {
      bodyParts.push(emit([{ kind: 'glue', glue: 'workflow-rules', text: `## Workflow rules\n\n${workflowRulesText}\n\n` }]));
    }

    // -- (c) Routing — one entry span per route (native, non-namespaced cue tools) ---
    const docRoutes = (fm.routes?.docs ?? []) as DocRoute[];
    const cueRoutes = (fm.routes?.cues ?? []) as ToolCueRoute[];
    const agentRoutes = fm.routes?.agents ?? [];
    if (docRoutes.length > 0 || cueRoutes.length > 0 || agentRoutes.length > 0) {
      bodyParts.push(
        emit([
          { kind: 'entry', path: 'routes', text: '## Routing\n\n' },
          ...docRoutes.map((route, i): SpanPiece => ({ kind: 'member', list: 'routes.docs', index: i, text: `- ${renderDocRoute(route)}\n` })),
          // Inter-agent routes rendered per LE-D1 (Stacy's U2 row-3 finding: the structured
          // routes must also be DELIVERED, or body pointers at "your routing section" dangle).
          ...agentRoutes.map((route, i): SpanPiece => ({ kind: 'member', list: 'routes.agents', index: i, text: `- ${renderAgentRoute(route)}\n` })),
          ...cueRoutes.map((cue, i): SpanPiece => {
            const native = toolRefImpl(subset, cue.tool);
            return { kind: 'member', list: 'routes.cues', index: i, text: `- ${renderToolCue({ ...cue, tool: native })}\n` };
          }),
          { kind: 'entry', path: 'routes', text: '\n' },
        ])
      );
    }

    // -- (d) Commands + shared catalog (native find_docs cue) — one span per entry ---
    const commandEntries = fm.commands ?? [];
    const sharedMembers = ctx.sharedCatalog
      .slice()
      .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    if (commandEntries.length > 0 || sharedMembers.length > 0) {
      const glue = (text: string): SpanPiece =>
        fm.commands !== undefined ? { kind: 'entry', path: 'commands', text } : { kind: 'glue', glue: 'shared-catalog-section', text };
      bodyParts.push(
        emit([
          glue('## Commands\n\n'),
          ...commandEntries.map((entry, i): SpanPiece => ({ kind: 'member', list: 'commands', index: i, text: `${renderCommandEntry(entry, span.profile)}\n` })),
          ...sharedMembers.map((member): SpanPiece => ({ kind: 'shared', id: member.id, text: `${renderSharedCatalogMember(member, subset)}\n` })),
          glue('\n'),
        ])
      );
    }

    // -- (e) Knowledge fallback: NOT emitted for Kiro --------------------------
    // Kiro has the native /knowledge surface (allowedTools: ["knowledge", ...] +
    // per-agent `knowledgeBases` config declarations — carried in emitConfig via the
    // `handled-elsewhere` disposition, field-dispositions.yaml's placement rationale for
    // `resources`/`knowledgeBases` container fields) — no grep/Glob fallback note is needed
    // or rendered here, unlike cc.ts's "## Knowledge fallback" section (CC has no native
    // knowledge-base surface, so it renders a textual fallback instead).

    // -- (f) Write scope (base note only — Kiro has a declarative field) --------
    // ONE rendered sentence names every glob, so its span is the `writeScope` container, not
    // a member (a line cannot carry per-member spans) — recorded for Task 14's E-fm.
    const writeScope = fm.writeScope;
    if (writeScope && writeScope.length > 0) {
      if (span.profile === 'steward') {
        bodyParts.push(emit([{ kind: 'entry', path: 'writeScope', text: `## Write scope\n\n${renderWriteScopeImpl(writeScope)}\n\n` }]));
      } else {
        // Consumer profile (Task 15.0; DD26): ONE SPAN PER GLOB, so each `writeScope[<glob>]` takes
        // its own disposition row — retained, re-pointed (its `## @entry` overlay text), or dropped.
        bodyParts.push(
          emit([
            { kind: 'entry', path: 'writeScope', text: `## Write scope\n\n${WRITE_SCOPE_MEMBERS_INTRO}\n\n` },
            ...writeScope.map((glob, i): SpanPiece => ({ kind: 'member', list: 'writeScope', index: i, text: `- \`${glob}\`\n` })),
            { kind: 'entry', path: 'writeScope', text: WRITE_SCOPE_MEMBERS_OUTRO },
          ])
        );
      }
    }

    const content = bodyParts.join('');
    const attribution = acc.build(path);

    return { path, content, attribution };
  }

  emitSkills(map: SkillsMap, ctx: AdapterContext): EmittedFile[] {
    return emitSkillTreeFiles(map, ctx, 'kiro');
  }

  /**
   * C19 (Task 15.3): each derived identity member as `.kiro/steering/designerpunk-<id>.md`, with a
   * FRESH minimal frontmatter written here — exactly `id` + `inclusion: always` — never the shipped
   * doc's own (dropped). Each agent config's `resources` points at these files (the consumer
   * `docIdToPath` the generator supplies).
   */
  emitIdentityMembers(members: readonly IdentityMemberInput[], ctx: AdapterContext): EmittedFile[] {
    if ((ctx.profile ?? 'steward') !== 'consumer') throw new Error(identityMembersStewardMessage('KiroAdapter'));
    return members.map((m) =>
      renderIdentityMember(m, `.kiro/steering/${identityMemberName(m.id)}.md`, {
        glue: 'identity-frontmatter',
        text: `---\nid: ${identityMemberName(m.id)}\ninclusion: always\n---\n\n`,
      })
    );
  }

  emitAlwaysLayer(_set: readonly AlwaysSetMember[], _ctx: AdapterContext): EmittedFile[] {
    // Kiro's native always-mechanism is `inclusion: always` declared ON THE DOCS THEMSELVES
    // (the steering docs' own frontmatter) PLUS each agent's config `resources` array (built
    // in emitAgent/emitConfig from the ambient manifest's shared-lane members) — there is no
    // separate always-layer FILE analogous to CC's generated CLAUDE.md (C11 lane 1). The
    // steering docs' `inclusion: always` frontmatter and each agent's resources are canonical
    // INPUTS this adapter reads/reproduces, not generated OUTPUTS this function produces — so
    // there is nothing for emitAlwaysLayer to emit on this target. Returning [] is the correct
    // and complete Kiro always-layer delivery, not a placeholder.
    return [];
  }
}

// ============================================================================
// Local helpers
// ============================================================================

/** The span source for an agent's canonical file — the provenance prefix `emitSpans` cites. */
function spanSource(agent: ResolvedAgent): SpanSource {
  const fm = agent.doc.frontmatter;
  return { file: `canonical/agents/${fm.agent}.md`, body: agent.doc.body, frontmatter: fm as unknown as YamlDoc };
}

/** Local re-implementation of skills.ts's resolveSkillRow error contract (importing keeps a single source of truth). */
function resolveSkillKey(map: SkillsMap, key: string): SkillsMapRow {
  const row = map.rows.find((r) => skillRowKey(r) === key);
  if (!row) {
    const known = map.rows.map(skillRowKey).sort().join(', ');
    throw new Error(`KiroAdapter.emitAgent: no skills-map row for key "${key}" (known keys: ${known || '<none>'})`);
  }
  return row;
}

function skillRowKey(row: SkillsMapRow): string {
  return row.canonical.split('/').pop() ?? row.canonical;
}

function countLines(text: string): number {
  if (text.length === 0) return 0;
  const withoutTrailingNewline = text.endsWith('\n') ? text.slice(0, -1) : text;
  if (withoutTrailingNewline.length === 0) return 1;
  return withoutTrailingNewline.split('\n').length;
}

/**
 * Byte-identical skill-tree copies for a target, single passthrough span per file, sorted —
 * shared shape with CcAdapter.emitSkills (mirrors cc.ts's local listFilesRecursive/copy
 * logic rather than importing it, since it is a private cc.ts implementation detail, not an
 * exported engine function; this duplication is adapter-local, not a pipeline-engine change).
 */
function emitSkillTreeFiles(map: SkillsMap, ctx: AdapterContext, targetKey: 'cc' | 'kiro'): EmittedFile[] {
  const files: EmittedFile[] = [];
  const rows = [...map.rows].sort((a, b) => (a.canonical < b.canonical ? -1 : a.canonical > b.canonical ? 1 : 0));

  // THE ROOT SPLIT (Spec 123 Task 16.1; design C20) — as in CcAdapter.emitSkills: the source
  // resolves against `ctx.repoRoot` (the steward repo, or the package's derived canonical); the
  // destination is the row's target joined with the file's relative path, never resolved against
  // a root, so it is relative to wherever the caller writes.
  for (const row of rows) {
    const srcDir = path.resolve(ctx.repoRoot, row.canonical);
    const relFiles = listFilesRecursive(srcDir).sort();
    for (const rel of relFiles) {
      const srcPath = path.join(srcDir, rel);
      const content = fs.readFileSync(srcPath, 'utf8');
      const destRelPath = path.posix.join(row.targets[targetKey].split(path.sep).join('/'), rel.split(path.sep).join('/'));
      const attribution = {
        artifact: destRelPath,
        spans: [
          {
            lines: [1, Math.max(countLines(content), 1)] as [number, number],
            op: 'passthrough' as const,
            source: path.relative(ctx.repoRoot, srcPath),
          },
        ],
      };
      files.push({ path: destRelPath, content, attribution });
    }
  }

  return files;
}

function listFilesRecursive(dir: string, base = ''): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(path.join(dir, base), { withFileTypes: true })) {
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(dir, rel));
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
  return out;
}
