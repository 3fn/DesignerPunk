/**
 * Render (class-c) and pass-through (class-b) operations — Spec 122 Task 2.2.
 *
 * design.md § "The three content operations":
 *   (b) pass-through — formative / reflexive-principle / role-specific prose from the
 *       canonical body, BYTE-IDENTICAL (Req 1 AC2: no synthesis, summary, or rewrite).
 *   (c) render — deterministic template glue from structured frontmatter fields: rendered
 *       WORKFLOW_RULES, write-scope notes from `allowedPaths`, run-context annotations,
 *       cue sentences assembled from cue fields. Class (c) can ONLY restate what a canonical
 *       field already carries — templates hold field slots + fixed connective grammar, no
 *       free-text substance of their own (P4).
 *
 * Every function here is pure and deterministic (identical inputs → identical output —
 * sorted collections, no timestamps): the C6 precondition (P1).
 *
 * Traces to: Req 1 AC2/AC3, Req 4 AC1/AC2 (WORKFLOW_RULES filter + render), Req 11 AC3
 * (field-driven write-scope note), Req 12 AC3 (run-context annotation).
 */

import type { WorkflowRule } from './workflow-rules-guard';
import type { GroundTruthDirective } from './compose';
import type { AgentRoute, DocRoute, RunContext, ToolCueRoute } from './schema';

// ============================================================================
// (b) Pass-through
// ============================================================================

/**
 * Pass-through (class-b): the canonical body travels verbatim. This is the identity
 * function BY CONTRACT — its existence documents that pass-through prose is never
 * synthesized, summarized, or rewritten (Req 1 AC2). Callers route body prose through here
 * so the attribution manifest can mark the span `op: passthrough` (C3.3).
 */
export function renderPassThrough(body: string): string {
  return body;
}

// ============================================================================
// (c) WORKFLOW_RULES render (Req 4)
// ============================================================================

/**
 * Filter WORKFLOW_RULES to those whose `appliesToTools` intersect the agent's available
 * tool names, then render each rule's normative `statement` verbatim as a bullet, sorted by
 * rule `id` for determinism. A rule stated once in WORKFLOW_RULES thus propagates to every
 * prompt whose agent has a governed tool, and a `statement`/`appliesToTools` change at source
 * re-renders everywhere with no per-agent edit (Req 4 AC2). Returns '' when none apply.
 */
export function renderWorkflowRules(
  rules: readonly WorkflowRule[],
  availableToolNames: readonly string[]
): string {
  const available = new Set(availableToolNames);
  const applicable = rules
    .filter((rule) => rule.appliesToTools.some((tool) => available.has(tool)))
    .slice()
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

  return applicable.map((rule) => `- ${rule.statement}`).join('\n');
}

// ============================================================================
// (c) Write-scope note (Req 11 AC3) — FIELD-DRIVEN
// ============================================================================

/**
 * Render the write-scope behavioral note from the source `allowedPaths`. FIELD-DRIVEN by
 * construction: different `allowedPaths` yield a different note (Req 11 AC3); a hand-copied
 * paragraph would fail that requirement. Paths render in authored order (stable in canonical
 * source). CC-specific enforcement phrasing (PreToolUse hook / worktree, facet 7) is layered
 * by the CC adapter (C4); this base note is the shared, field-driven substance.
 */
export function renderWriteScopeNote(allowedPaths: readonly string[]): string {
  if (allowedPaths.length === 0) {
    return 'Write scope (behavioral): no write paths are declared for this agent — treat the tree as read-only.';
  }
  const rendered = allowedPaths.map((p) => `\`${p}\``).join(', ');
  return `Write scope (behavioral): you may create or modify files only under ${rendered}. Treat paths outside this set as read-only.`;
}

// ============================================================================
// (c) Run-context annotation (Req 12 AC3) — mechanical, enum-driven
// ============================================================================

/**
 * The mechanical run-context annotation for a command, derived from its `runContext` enum
 * value. `this-repo` yields no annotation (empty string); the two non-this-repo values yield
 * a fixed tag so annotation presence is mechanically checkable (Req 12 AC3 / C7 class (d)) —
 * NEVER hand-copied prose. Command-specific detail (e.g. "the android/ dir") lives in the
 * command's authored `cue`/`gap`, rendered alongside this tag by the command renderer.
 */
export function renderRunContextAnnotation(runContext: RunContext): string {
  switch (runContext) {
    case 'this-repo':
      return '';
    case 'consumer-repo':
      return 'run from the consumer product repo, not this repo';
    case 'per-product':
      return 'authored per product';
  }
}

// ============================================================================
// (c) Cue sentences (Req 10 AC4) — assembled from cue fields
// ============================================================================

/**
 * Render a triggered tool-cue route as a WHEN/THEN sentence assembled purely from its fields
 * (`when`, `tool`, `mcp`). No substance beyond the fields (P4).
 */
export function renderToolCue(cue: ToolCueRoute): string {
  return `WHEN ${cue.when} THEN use ${cue.tool} (${cue.mcp} MCP)`;
}

/**
 * Render a doc route as a WHEN/consult sentence from its fields. The physical path is never
 * emitted — the route addresses by `id` (+ interim heading), resolved per target at emit time.
 */
export function renderDocRoute(route: DocRoute): string {
  // Section-less = the (b)-grade doc-id-only form (119-B R6 AC3 amendment):
  // routes to the doc with the summary-first hard rule doing section discovery.
  if (route.section === undefined) {
    return `WHEN ${route.when} THEN consult ${route.doc} (summary-first)`;
  }
  return `WHEN ${route.when} THEN consult ${route.doc} § "${route.section}"`;
}

/**
 * Render the ground-truth faithfulness cue from a manifest directive (Req 10 AC3 —
 * verdicts honored as DATA). Branches on the directive's `faithfulnessVerbs` FIELD (the
 * field that encodes the catalog-is-manifest behavior), never on a re-read of the verdict
 * string; verbs are namespaced per target by the caller-supplied `toolName` (CC
 * `mcp__<server>__<tool>`, Kiro native). Returns undefined when the directive carries no
 * faithfulness verbs (none-standing / collapses-into-catalog / empty render nothing here;
 * the `trims` leg of none-trim-stale-snapshots renders via {@link renderGroundTruthTrims}).
 */
export function renderGroundTruthFaithfulness(
  directive: GroundTruthDirective,
  toolName: (tool: string) => string
): string | undefined {
  if (!directive.faithfulnessVerbs || directive.faithfulnessVerbs.length === 0) {
    return undefined;
  }
  const verbs = directive.faithfulnessVerbs.map((v) => `\`${toolName(v)}\``).join(' and ');
  return (
    'Your ground-truth manifest IS the live catalog — served fresh by MCP, never a ' +
    'standing snapshot. Faithfulness checks are assembly-grain, not catalog enumeration: ' +
    `verify with ${verbs}.`
  );
}

/**
 * Render the ground-truth TRIM negatives from a manifest directive (Req 10 AC2/AC3 —
 * the `none-trim-stale-snapshots` verdict). Branches on the directive's `trims` FIELD
 * (never a re-read of the verdict string). Each trim's `cue.negative` is emitted VERBATIM
 * — sweep 8's K-D1 leg asserts that exact string appears in the emitted CC text, so this
 * render is the mechanism that satisfies the unconditional-negative coverage check. The
 * positive replacement tool is namespaced per target by the caller-supplied `toolName`
 * (CC `mcp__<server>__<tool>`, Kiro native), which fail-louds if the tool is not granted
 * by the agent's subset (same invariant cueToolRef enforces for routed cues). Returns
 * undefined when the directive carries no trims (every other verdict).
 */
export function renderGroundTruthTrims(
  directive: GroundTruthDirective,
  toolName: (tool: string) => string
): string | undefined {
  if (!directive.trims || directive.trims.length === 0) {
    return undefined;
  }
  const lines = directive.trims.map((trim) => {
    // trim.cue.negative is emitted verbatim (sweep-8 K-D1 substring check).
    return `- ${trim.cue.negative} — use \`${toolName(trim.cue.tool)}\` (${trim.cue.mcp} MCP)`;
  });
  return (
    'Your token ground truth is served LIVE by MCP — never a build snapshot. Do NOT read ' +
    'these stale/generated artifacts; query the live tool instead:\n' +
    lines.join('\n')
  );
}

/**
 * Render an inter-agent route (LE-D1: routes migrated from body prose into structured
 * `routes.agents` — and RENDERED back into each target's Routing section, so a body line
 * like "hand-off triggers live in your routing section" is TRUE on both targets; Stacy's
 * U2 row-3 finding). A `not-yet-ported` disposition renders honestly: the target seat is
 * not generated yet, so the hand-off goes through Peter rather than a direct swap.
 */
export function renderAgentRoute(route: AgentRoute): string {
  const suffix =
    route.disposition === 'not-yet-ported'
      ? ' (seat not generated yet — recommend Peter bring them in)'
      : '';
  return `WHEN ${route.when} THEN hand off to ${route.target}${suffix}`;
}
