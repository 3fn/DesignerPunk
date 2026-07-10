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
 * rule. The `-prompt.md` companion is prose-bearing — a multi-span manifest built with
 * `AttributionAccumulator`, mirroring `cc.ts`'s body construction minus the two CC-only
 * sections (per-agent ambient inline embeds, knowledge fallback — see `emitAgent` below).
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
  renderPassThrough,
  renderWorkflowRules,
  renderWriteScopeNote,
  renderRunContextAnnotation,
  renderToolCue,
  renderDocRoute,
} from '../render';
import { AttributionAccumulator } from '../attribution';
import { canonicalStringify, type JsonValue } from '../canonical-json';
import type {
  TargetAdapter,
  AdapterContext,
  EmittedFile,
  FieldDispositionTable,
  SharedCatalogMember,
} from './index';

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
function renderWriteScopeImpl(paths: readonly string[]): string {
  return renderWriteScopeNote(paths);
}

// ============================================================================
// Command rendering (mirrors cc.ts — same fields, native tool names)
// ============================================================================

function renderCommandEntry(entry: CommandEntry): string {
  const annotation = renderRunContextAnnotation(entry.runContext);
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

    const resources: string[] = [...resourceEntries, ...skillResources];

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

    const content = canonicalStringify(config as JsonValue);
    const totalLines = countLines(content);
    const attribution = {
      artifact: path,
      spans: [{ lines: [1, Math.max(totalLines, 1)] as [number, number], op: 'render' as const, source: 'C1:frontmatter+ambient-manifest' }],
    };

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

    // -- (a) Pass-through body verbatim --------------------------------------
    const passthrough = renderPassThrough(agent.doc.body);
    const passthroughBlock = ensureTrailingNewline(passthrough);
    acc.add('passthrough', countLines(passthroughBlock), `canonical/agents/${fm.agent}.md#body`);
    bodyParts.push(passthroughBlock);

    // NOTE: no "## Ambient (per-agent)" inline-embed section here (unlike cc.ts). Kiro
    // delivers ambient membership (shared AND per-agent lane) via the config's `resources`
    // array built in emitConfig — the reference mechanism EXISTS on this target, so per the
    // design's Rosetta-framing the reference form is used and nothing is inlined into the
    // prompt body (design C11: "an adapter KNOWS its harness's native delivery model").

    // -- (b) Workflow rules ---------------------------------------------------
    const flatTools = allFlatTools(subset);
    const workflowRulesText = renderWorkflowRules(ctx.workflowRules, flatTools);
    if (workflowRulesText.length > 0) {
      const block = `## Workflow rules\n\n${workflowRulesText}\n\n`;
      acc.add('render', countLines(block), 'WORKFLOW_RULES');
      bodyParts.push(block);
    }

    // -- (c) Routing (native, non-namespaced tool names in cues) ---------------
    const docRoutes = (fm.routes?.docs ?? []) as DocRoute[];
    const cueRoutes = (fm.routes?.cues ?? []) as ToolCueRoute[];
    if (docRoutes.length > 0 || cueRoutes.length > 0) {
      const lines: string[] = ['## Routing', ''];
      for (const route of docRoutes) {
        lines.push(`- ${renderDocRoute(route)}`);
      }
      for (const cue of cueRoutes) {
        const native = toolRefImpl(subset, cue.tool);
        lines.push(`- ${renderToolCue({ ...cue, tool: native })}`);
      }
      lines.push('');
      const block = `${lines.join('\n')}\n`;
      acc.add('render', countLines(block), 'routes');
      bodyParts.push(block);
    }

    // -- (d) Commands + shared catalog (native find_docs cue) -------------------
    const commandEntries = fm.commands ?? [];
    const sharedMembers = ctx.sharedCatalog
      .slice()
      .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
    if (commandEntries.length > 0 || sharedMembers.length > 0) {
      const lines: string[] = ['## Commands', ''];
      for (const entry of commandEntries) {
        lines.push(renderCommandEntry(entry));
      }
      for (const member of sharedMembers) {
        lines.push(renderSharedCatalogMember(member, subset));
      }
      lines.push('');
      const block = `${lines.join('\n')}\n`;
      acc.add('render', countLines(block), 'commands+shared-catalog');
      bodyParts.push(block);
    }

    // -- (e) Knowledge fallback: NOT emitted for Kiro --------------------------
    // Kiro has the native /knowledge surface (allowedTools: ["knowledge", ...] +
    // per-agent `knowledgeBases` config declarations — carried in emitConfig via the
    // `handled-elsewhere` disposition, field-dispositions.yaml's placement rationale for
    // `resources`/`knowledgeBases` container fields) — no grep/Glob fallback note is needed
    // or rendered here, unlike cc.ts's "## Knowledge fallback" section (CC has no native
    // knowledge-base surface, so it renders a textual fallback instead).

    // -- (f) Write scope (base note only — Kiro has a declarative field) --------
    const writeScope = fm.writeScope;
    if (writeScope && writeScope.length > 0) {
      const block = `## Write scope\n\n${renderWriteScopeImpl(writeScope)}\n\n`;
      acc.add('render', countLines(block), 'writeScope');
      bodyParts.push(block);
    }

    const content = bodyParts.join('');
    const attribution = acc.build(path);

    return { path, content, attribution };
  }

  emitSkills(map: SkillsMap, ctx: AdapterContext): EmittedFile[] {
    return emitSkillTreeFiles(map, ctx, 'kiro');
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

function ensureTrailingNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`;
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

  for (const row of rows) {
    const srcDir = path.resolve(ctx.repoRoot, row.canonical);
    const destDir = path.resolve(ctx.repoRoot, row.targets[targetKey]);
    const relFiles = listFilesRecursive(srcDir).sort();
    for (const rel of relFiles) {
      const srcPath = path.join(srcDir, rel);
      const destPath = path.join(destDir, rel);
      const content = fs.readFileSync(srcPath, 'utf8');
      const destRelPath = path.relative(ctx.repoRoot, destPath);
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
