/**
 * The Claude Code target adapter (C4) — Spec 122 Task 5.2.
 *
 * design C4's transform table implemented row-by-row; design C11's two always-layer lanes
 * implemented as `emitAgent`'s `## Ambient (per-agent)` inline-embed section (lane 2) and
 * `emitAlwaysLayer`'s generated `CLAUDE.md` (lane 1). `cc-agent-model.md` is the CC platform
 * format spec this adapter targets — facet 2 (no per-agent `@`-import channel: per-agent
 * always-content MUST be inlined into the agent body) and facet 7 (no declarative per-agent
 * write-path field: the write-scope note is BEHAVIORAL, naming `PreToolUse` hooks and
 * `isolation: worktree` as the documented enforcement options) are the two load-bearing
 * platform constraints this file encodes.
 *
 * Built FIRST per Req 24 AC2 (CC before Kiro) — the Kiro adapter lands second against this
 * same `TargetAdapter` interface with no pipeline change (the extensibility contract, C4).
 *
 * ATTRIBUTION: every emitted file (agent body, CLAUDE.md) carries a multi-span sidecar built
 * WITH `AttributionAccumulator` as each block is appended — see `adapters/index.ts`'s header
 * for the full rule. Skill-tree copies use a single passthrough span per file.
 *
 * Traces to: Req 1, Req 4, Req 8, Req 9, Req 10, Req 11, Req 12, Req 15, Req 16, Req 24;
 * design C4, C11.
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedAgent } from '../pipeline';
import type { AlwaysSetMember } from '../compose';
import type { ToolSubset, CommandEntry, DocRoute, ToolCueRoute } from '../schema';
import { isNamedGapCommandEntry } from '../schema';
import type { SkillsMapRow, SkillsMap } from '../skills';
import { ccSkillRef } from '../skills';
import {
  renderPassThrough,
  renderWorkflowRules,
  renderWriteScopeNote,
  renderRunContextAnnotation,
  renderToolCue,
  renderDocRoute,
} from '../render';
import { AttributionAccumulator, type AttributionManifest } from '../attribution';
import {
  MCP_TO_SERVER,
  type TargetAdapter,
  type AdapterContext,
  type EmittedFile,
  type FieldDispositionTable,
  type SharedCatalogMember,
} from './index';

// ============================================================================
// toolRef — namespaced CC tool-reference syntax (facet 3)
// ============================================================================

/**
 * Which registry-server keys of ToolSubset are searched, and in what order (deterministic —
 * matches the frontmatter's own declared key set, not registry iteration order).
 */
const TOOL_SUBSET_SERVERS: readonly (keyof ToolSubset)[] = [
  'designerpunk-docs',
  'designerpunk-application',
  'designerpunk-product',
];

/**
 * `mcp__<server>__<tool>` — the CC namespaced tool-reference form (facet 3). Finds the ONE
 * server in `subset` that declares `tool` and returns its namespaced ref. Throws loud
 * (house rule) if `tool` is not declared by any server in the subset — a silently-undefined
 * ref would let a rendered cue/frontmatter tools list point at nothing.
 */
function toolRefImpl(subset: ToolSubset, tool: string): string {
  for (const server of TOOL_SUBSET_SERVERS) {
    const tools = subset[server];
    if (tools?.includes(tool)) {
      return `mcp__${server}__${tool}`;
    }
  }
  const declared = TOOL_SUBSET_SERVERS.flatMap((s) => (subset[s] ?? []).map((t) => `${s}:${t}`)).sort();
  throw new Error(
    `CcAdapter.toolRef: tool "${tool}" is not declared by any server in the agent's toolSubset ` +
      `(declared: ${declared.join(', ') || '<none>'}).`
  );
}

/**
 * Namespaced ref for a CUE — the cue's own `mcp` field picks the server, NEVER a
 * subset-order search: an ambiguous tool name (`rebuild_index` is declared by two servers)
 * would otherwise namespace to whichever server sorts first and MISROUTE the cue (found
 * live by Ada's U2 content confirmation — her application-MCP rebuild cue rendered with the
 * docs server). Throws loud when the cue's server does not grant the tool in this agent's
 * subset — the same invariant C7 class (c) leg 1 checks, enforced at emission too.
 */
function cueToolRef(subset: ToolSubset, cue: ToolCueRoute): string {
  const server = MCP_TO_SERVER[cue.mcp];
  if (!subset[server]?.includes(cue.tool)) {
    throw new Error(
      `CcAdapter.cueToolRef: cue tool "${cue.tool}" is not granted by its own server "${server}" ` +
        `(cue.mcp: ${cue.mcp}) in this agent's toolSubset — fix the subset or the cue's mcp field.`
    );
  }
  return `mcp__${server}__${cue.tool}`;
}

/**
 * The CC core-tool grants every generated agent carries. In CC, a subagent's `tools:` list
 * is the COMPLETE allowlist — emitting only the namespaced MCP tools would silently strip
 * file/shell access (a regression the Ada diff-vs-baseline would flag: all six hand ports
 * grant exactly this set). `Skill` is appended iff the agent declares skills (matches the
 * live ports: data/leonardo carry it, the skill-less seats do not) — derived, not authored.
 */
export const CC_CORE_TOOLS: readonly string[] = ['Read', 'Grep', 'Glob', 'Bash', 'Write', 'Edit'];

/** Every namespaced tool name in a subset, flattened, sorted (P1 determinism). */
function allNamespacedTools(subset: ToolSubset): string[] {
  const refs: string[] = [];
  for (const server of TOOL_SUBSET_SERVERS) {
    for (const tool of subset[server] ?? []) {
      refs.push(`mcp__${server}__${tool}`);
    }
  }
  return refs.sort();
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
// renderWriteScope — facet-7 enforcement sentence layered onto the base note
// ============================================================================

const FACET_7_ENFORCEMENT_SENTENCE =
  'CC has no declarative per-agent write-path field (cc-agent-model.md facet 7: path rules ' +
  'are session-global, not per-agent); the documented enforcement options are a per-agent ' +
  '`PreToolUse` hook rejecting out-of-scope `Edit`/`Write` paths, or `isolation: worktree` — ' +
  'named here as the enforcement mechanism, not emitted as a declarative scope.';

function renderWriteScopeImpl(paths: readonly string[]): string {
  return `${renderWriteScopeNote(paths)} ${FACET_7_ENFORCEMENT_SENTENCE}`;
}

// ============================================================================
// Command rendering (C4 table row: commands + shared catalog)
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
// The CcAdapter
// ============================================================================

export class CcAdapter implements TargetAdapter {
  readonly target = 'cc' as const;

  constructor(private readonly _dispositions: FieldDispositionTable) {}

  get dispositions(): FieldDispositionTable {
    return this._dispositions;
  }

  toolRef(subset: ToolSubset, tool: string): string {
    return toolRefImpl(subset, tool);
  }

  skillRef(row: SkillsMapRow): string {
    return ccSkillRef(row);
  }

  renderWriteScope(paths: readonly string[]): string {
    return renderWriteScopeImpl(paths);
  }

  emitAgent(agent: ResolvedAgent, ctx: AdapterContext): EmittedFile[] {
    const fm = agent.doc.frontmatter;
    const subset = fm.toolSubset ?? {};
    const acc = new AttributionAccumulator();
    const bodyParts: string[] = [];

    // -- Frontmatter --------------------------------------------------------
    // Core tools first (the complete-allowlist rule — see CC_CORE_TOOLS), `Skill` iff the
    // agent declares skills, then the namespaced MCP subset.
    const namespacedTools = allNamespacedTools(subset);
    const coreTools = [...CC_CORE_TOOLS, ...((fm.skills ?? []).length > 0 ? ['Skill'] : [])];
    const frontmatterLines = [
      '---',
      `name: ${fm.agent}`,
      `description: ${fm.description}`,
      'tools:',
      ...coreTools.map((t) => `  - ${t}`),
      ...namespacedTools.map((t) => `  - ${t}`),
      '---',
      '',
    ];
    const frontmatterText = frontmatterLines.join('\n');
    acc.add('render', countLines(frontmatterText), 'C1:frontmatter');
    bodyParts.push(frontmatterText);

    // -- (a) Pass-through body verbatim --------------------------------------
    const passthrough = renderPassThrough(agent.doc.body);
    const passthroughBlock = ensureTrailingNewline(passthrough);
    acc.add('passthrough', countLines(passthroughBlock), `canonical/agents/${fm.agent}.md#body`);
    bodyParts.push(passthroughBlock);

    // -- (b) Ambient (per-agent) — C11 LANE 2, generated inline embeds -------
    const manifest = agent.ambientManifests.cc;
    const perAgentMembers = manifest.members
      .filter((m) => m.lane === 'per-agent')
      .slice()
      .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

    // Section omitted entirely when the agent has zero per-agent members (adjudicated at
    // incorporation, 5.2): an empty header is operating-prompt noise — consistent with the
    // other conditional sections, and with the empty-by-design manifest verdict (Req 10 AC2)
    // where "emit nothing" is the recorded intent.
    if (perAgentMembers.length > 0) {
      const ambientHeader = '## Ambient (per-agent)\n\n';
      acc.add('render', countLines(ambientHeader), 'C11:lane2-header');
      bodyParts.push(ambientHeader);
    }

    for (const member of perAgentMembers) {
      const embed = ctx.embeds?.[member.id];
      if (embed === undefined) {
        throw new Error(
          `CcAdapter.emitAgent: no resolved embed for per-agent ambient member "${member.id}" ` +
            `(agent "${fm.agent}") — ctx.embeds must supply resolved corpus text for every ` +
            `per-agent-lane member; refusing to emit an empty embed silently.`
        );
      }
      const block = `### ${member.id}\n\n${ensureTrailingNewline(embed)}\n`;
      acc.add('resolve', countLines(block), `id:${member.id}`, 'embed');
      bodyParts.push(block);
    }

    // -- (c) Workflow rules ---------------------------------------------------
    const flatTools = allFlatTools(subset);
    const workflowRulesText = renderWorkflowRules(ctx.workflowRules, flatTools);
    if (workflowRulesText.length > 0) {
      const block = `## Workflow rules\n\n${workflowRulesText}\n\n`;
      acc.add('render', countLines(block), 'WORKFLOW_RULES');
      bodyParts.push(block);
    }

    // -- (d) Routing ------------------------------------------------------------
    const docRoutes = (fm.routes?.docs ?? []) as DocRoute[];
    const cueRoutes = (fm.routes?.cues ?? []) as ToolCueRoute[];
    if (docRoutes.length > 0 || cueRoutes.length > 0) {
      const lines: string[] = ['## Routing', ''];
      for (const route of docRoutes) {
        lines.push(`- ${renderDocRoute(route)}`);
      }
      for (const cue of cueRoutes) {
        const namespaced = cueToolRef(subset, cue); // by the cue's OWN mcp — never subset order
        lines.push(`- ${renderToolCue({ ...cue, tool: namespaced })}`);
      }
      lines.push('');
      const block = `${lines.join('\n')}\n`;
      acc.add('render', countLines(block), 'routes');
      bodyParts.push(block);
    }

    // -- (e) Commands -------------------------------------------------------
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
      // The whole commands section renders from fields; shared-catalog members are
      // additionally sourced by id — represent both under one render span (P4: the
      // block is entirely field-driven template glue, no free prose of its own).
      acc.add('render', countLines(block), 'commands+shared-catalog');
      bodyParts.push(block);
    }

    // -- (f) Knowledge fallback -----------------------------------------------
    const knowledgeBases = fm.knowledgeBases ?? [];
    if (knowledgeBases.length > 0) {
      const lines: string[] = ['## Knowledge fallback', ''];
      for (const kb of knowledgeBases) {
        lines.push(`- ${kb.name}: search these paths with Grep/Glob: ${kb.globs.join(', ')}`);
      }
      lines.push('');
      const block = `${lines.join('\n')}\n`;
      acc.add('render', countLines(block), 'knowledgeBases');
      bodyParts.push(block);
    }

    // -- (g) Write scope --------------------------------------------------------
    const writeScope = fm.writeScope;
    if (writeScope && writeScope.length > 0) {
      const block = `## Write scope\n\n${renderWriteScopeImpl(writeScope)}\n\n`;
      acc.add('render', countLines(block), 'writeScope');
      bodyParts.push(block);
    }

    // -- (h) Kiro-only fields per ctx.dispositions -------------------------------
    const agentSpawn = fm.kiro?.agentSpawn;
    if (agentSpawn && agentSpawn.length > 0) {
      const lines: string[] = ['## Pre-flight', '', 'run at session start:', ''];
      for (const cmd of agentSpawn) {
        lines.push(`- \`${cmd.command}\``);
      }
      lines.push('');
      const block = `${lines.join('\n')}\n`;
      acc.add('render', countLines(block), 'kiro.hooks.agentSpawn');
      bodyParts.push(block);
    }
    // keyboardShortcut / welcomeMessage / includeMcpJson: drop — render NOTHING.

    const content = bodyParts.join('');
    const attribution = acc.build(`.claude/agents/${fm.agent}.md`);

    return [
      {
        path: `.claude/agents/${fm.agent}.md`,
        content,
        attribution,
      },
    ];
  }

  emitSkills(map: SkillsMap, ctx: AdapterContext): EmittedFile[] {
    // Deterministic ordering: rows sorted by canonical, files by path (skills.ts already
    // sorts rows by canonical for emitSkillTrees; recompute the per-row/per-file listing
    // here so each file's own attribution sidecar can be built).
    const files: EmittedFile[] = [];
    const rows = [...map.rows].sort((a, b) => (a.canonical < b.canonical ? -1 : a.canonical > b.canonical ? 1 : 0));

    for (const row of rows) {
      const srcDir = path.resolve(ctx.repoRoot, row.canonical);
      const destDir = path.resolve(ctx.repoRoot, row.targets.cc);
      const relFiles = listFilesRecursive(srcDir).sort();
      for (const rel of relFiles) {
        const srcPath = path.join(srcDir, rel);
        const destPath = path.join(destDir, rel);
        const content = fs.readFileSync(srcPath, 'utf8');
        const destRelPath = path.relative(ctx.repoRoot, destPath);
        const attribution: AttributionManifest = {
          artifact: destRelPath,
          spans: [{ lines: [1, Math.max(countLines(content), 1)], op: 'passthrough', source: path.relative(ctx.repoRoot, srcPath) }],
        };
        files.push({ path: destRelPath, content, attribution });
      }
    }

    return files;
  }

  emitAlwaysLayer(set: readonly AlwaysSetMember[], ctx: AdapterContext): EmittedFile[] {
    const acc = new AttributionAccumulator();
    const parts: string[] = [];

    const banner = [
      '<!--',
      '  GENERATED FILE — do not hand-edit.',
      '  This CLAUDE.md is generated by the Spec 122 agent generator (C11 lane 1: the shared',
      '  always-set delivered as live @-import references). Regenerate via the pipeline; a',
      '  hand-edit here will be overwritten and caught by the diff-guard.',
      '-->',
      '',
    ].join('\n') + '\n';
    acc.add('render', countLines(banner), 'C11:lane1-banner');
    parts.push(banner);

    for (const member of set) {
      const target = ctx.steeringIdToPath?.[member.id];
      if (target === undefined) {
        throw new Error(
          `CcAdapter.emitAlwaysLayer: no steeringIdToPath entry for always-set member "${member.id}" ` +
            `— cannot resolve its @-import path.`
        );
      }
      const line = `@${target}\n`;
      acc.add('resolve', countLines(line), `id:${member.id}`);
      parts.push(line);
    }

    const content = parts.join('');
    const attribution = acc.build('CLAUDE.md');

    return [{ path: 'CLAUDE.md', content, attribution }];
  }
}

// ============================================================================
// Local helpers
// ============================================================================

function countLines(text: string): number {
  if (text.length === 0) return 0;
  const withoutTrailingNewline = text.endsWith('\n') ? text.slice(0, -1) : text;
  if (withoutTrailingNewline.length === 0) return 1;
  return withoutTrailingNewline.split('\n').length;
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`;
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
