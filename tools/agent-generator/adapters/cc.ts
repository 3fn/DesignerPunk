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
 * for the full rule. The AGENT file's spans are all constructed by `emitSpans` (spans.ts, Spec
 * 123 C14): one passthrough span per body partition unit, one render span per frontmatter
 * entry — this adapter supplies only the rendered text. (CLAUDE.md's always-layer spans are
 * C19's, Task 15.) Skill-tree copies use a single passthrough span per file.
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
  renderWorkflowRules,
  renderWriteScopeNote,
  renderRunContextAnnotation,
  renderToolCue,
  renderDocRoute,
  renderAgentRoute,
  renderGroundTruthFaithfulness,
  renderGroundTruthTrims,
} from '../render';
import { AttributionAccumulator, type AttributionManifest } from '../attribution';
import { emitSpans, type SpanPiece, type SpanPlan, type SpanSource } from '../spans';
import type { YamlDoc } from '../frontmatter';
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

/**
 * Every namespaced tool name in a subset, flattened, sorted by ref (P1 determinism) — each
 * carrying its server and its index in that server's subset list — so `emitSpans` keys each rendered grant to its
 * `toolSubset.<server>[<tool>]` entry (the entry tree, not this adapter, names the key).
 */
function namespacedToolEntries(subset: ToolSubset): { server: keyof ToolSubset; index: number; ref: string }[] {
  const entries: { server: keyof ToolSubset; index: number; ref: string }[] = [];
  for (const server of TOOL_SUBSET_SERVERS) {
    (subset[server] ?? []).forEach((tool, index) => entries.push({ server, index, ref: `mcp__${server}__${tool}` }));
  }
  return entries.sort((a, b) => (a.ref < b.ref ? -1 : a.ref > b.ref ? 1 : 0));
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

    // EVERY span below is constructed by `emitSpans` (C14, Spec 123 Task 10.4): this adapter
    // supplies only the per-target RENDERING of each piece — never a span, never a source.
    // (`AdapterContext.profile` lands at Task 15.1; until then this is the steward rendering.)
    const src: SpanSource = {
      file: `canonical/agents/${fm.agent}.md`,
      body: agent.doc.body,
      frontmatter: fm as unknown as YamlDoc,
    };
    const emit = (plan: SpanPlan): string => emitSpans(acc, src, 'steward', undefined, undefined, plan).text;

    // -- Frontmatter --------------------------------------------------------
    // Core tools first (the complete-allowlist rule — see CC_CORE_TOOLS), `Skill` iff the
    // agent declares skills, then the namespaced MCP subset — one entry span per granted tool.
    const coreToolsBlock = ['tools:', ...CC_CORE_TOOLS.map((t) => `  - ${t}`)].join('\n') + '\n';
    bodyParts.push(
      emit([
        { kind: 'glue', glue: 'frontmatter-fence', text: '---\n' },
        { kind: 'entry', path: 'agent', text: `name: ${fm.agent}\n` },
        { kind: 'entry', path: 'description', text: `description: ${fm.description}\n` },
        { kind: 'glue', glue: 'frontmatter-fence', text: coreToolsBlock },
        ...((fm.skills ?? []).length > 0 ? [{ kind: 'entry' as const, path: 'skills', text: '  - Skill\n' }] : []),
        ...namespacedToolEntries(subset).map(
          (t): SpanPiece => ({ kind: 'member', list: `toolSubset.${t.server}`, index: t.index, text: `  - ${t.ref}\n` })
        ),
        { kind: 'glue', glue: 'frontmatter-fence', text: '---\n' },
      ])
    );

    // -- O-3 banner (settle ballot 2026-09-17 §9, option (a)) ----------------
    // One generator-authored body line immediately after the frontmatter, marking the
    // file as generator output. CC agent files must OPEN with frontmatter, so the
    // banner cannot be the first bytes (unlike CLAUDE.md's emitAlwaysLayer banner).
    const generatedBanner =
      `<!-- GENERATED FILE — do not hand-edit. Source: canonical/agents/${fm.agent}.md; ` +
      'edit there and regenerate (Spec 122 pipeline). Hand-edits are overwritten and ' +
      'caught by 122-diff-guard. -->\n\n';
    bodyParts.push(emit([{ kind: 'glue', glue: 'generated-banner', text: generatedBanner }]));

    // -- (a) Pass-through body — one span per partition unit (C13/C14) --------
    bodyParts.push(emit('body'));

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
    const ambientPieces: SpanPiece[] = [];
    if (perAgentMembers.length > 0) {
      ambientPieces.push({ kind: 'glue', glue: 'ambient-lane2-header', text: '## Ambient (per-agent)\n\n' });
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
      ambientPieces.push({ kind: 'entry', path: `ambient[${member.id}]`, text: `### ${member.id}\n\n${ensureTrailingNewline(embed)}\n` });
    }
    bodyParts.push(emit(ambientPieces));

    // -- (b2) Ground truth (manifest verdict honored as DATA — Req 10 AC2/AC3) ------
    // Two mutually-exclusive legs (a directive carries faithfulnessVerbs XOR trims):
    //   catalog-is-manifest → the assembly-grain faithfulness cue;
    //   none-trim-stale-snapshots → the trim negatives (verbatim, for sweep-8 K-D1).
    // Both namespace tools via toolRef (fail-loud when a tool is not granted by the
    // agent's subset — the same invariant cueToolRef enforces for routed cues).
    if (manifest.groundTruth) {
      const toolName = (t: string): string => toolRefImpl(subset, t);
      const groundTruthBody =
        renderGroundTruthFaithfulness(manifest.groundTruth, toolName) ??
        renderGroundTruthTrims(manifest.groundTruth, toolName);
      if (groundTruthBody !== undefined) {
        bodyParts.push(
          emit([{ kind: 'entry', path: 'ambient.groundTruthManifest', text: `## Ground truth\n\n${groundTruthBody}\n\n` }])
        );
      }
    }

    // -- (c) Workflow rules ---------------------------------------------------
    const flatTools = allFlatTools(subset);
    const workflowRulesText = renderWorkflowRules(ctx.workflowRules, flatTools);
    if (workflowRulesText.length > 0) {
      bodyParts.push(emit([{ kind: 'glue', glue: 'workflow-rules', text: `## Workflow rules\n\n${workflowRulesText}\n\n` }]));
    }

    // -- (d) Routing — one entry span per route ------------------------------------
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
            const namespaced = cueToolRef(subset, cue); // by the cue's OWN mcp — never subset order
            return { kind: 'member', list: 'routes.cues', index: i, text: `- ${renderToolCue({ ...cue, tool: namespaced })}\n` };
          }),
          { kind: 'entry', path: 'routes', text: '\n' },
        ])
      );
    }

    // -- (e) Commands — one entry span per command, one per shared-catalog member ---
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
          ...commandEntries.map((entry, i): SpanPiece => ({ kind: 'member', list: 'commands', index: i, text: `${renderCommandEntry(entry)}\n` })),
          ...sharedMembers.map((member): SpanPiece => ({ kind: 'shared', id: member.id, text: `${renderSharedCatalogMember(member, subset)}\n` })),
          glue('\n'),
        ])
      );
    }

    // -- (f) Knowledge fallback — one entry span per knowledge base ------------------
    const knowledgeBases = fm.knowledgeBases ?? [];
    if (knowledgeBases.length > 0) {
      bodyParts.push(
        emit([
          { kind: 'entry', path: 'knowledgeBases', text: '## Knowledge fallback\n\n' },
          ...knowledgeBases.map((kb, i): SpanPiece => ({
            kind: 'member',
            list: 'knowledgeBases',
            index: i,
            text: `- ${kb.name}: search these paths with Grep/Glob: ${kb.globs.join(', ')}\n`,
          })),
          { kind: 'entry', path: 'knowledgeBases', text: '\n' },
        ])
      );
    }

    // -- (g) Write scope ----------------------------------------------------------
    // ONE rendered sentence names every glob, so its span is the `writeScope` container, not
    // a member (a line cannot carry per-member spans) — recorded for Task 14's E-fm.
    const writeScope = fm.writeScope;
    if (writeScope && writeScope.length > 0) {
      bodyParts.push(emit([{ kind: 'entry', path: 'writeScope', text: `## Write scope\n\n${renderWriteScopeImpl(writeScope)}\n\n` }]));
    }

    // -- (h) Kiro-only fields per ctx.dispositions -------------------------------
    const agentSpawn = fm.kiro?.agentSpawn;
    if (agentSpawn && agentSpawn.length > 0) {
      bodyParts.push(
        emit([
          { kind: 'entry', path: 'preflight', text: '## Pre-flight\n\nrun at session start:\n\n' },
          ...agentSpawn.map((cmd, i): SpanPiece => ({ kind: 'member', list: 'preflight', index: i, text: `- \`${cmd.command}\`\n` })),
          { kind: 'entry', path: 'preflight', text: '\n' },
        ])
      );
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
    // Deterministic ordering: rows sorted by canonical, files by path (mirrors skillKey's
    // canonical-sort convention in skills.ts; recompute the per-row/per-file listing here
    // so each file's own attribution sidecar can be built).
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
