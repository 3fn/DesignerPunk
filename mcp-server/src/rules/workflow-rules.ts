/**
 * Workflow Rules — machine-consumable rule artifact (Spec 121, Req 5.3 / 5.5).
 *
 * WHY THIS FILE EXISTS
 * --------------------
 * Req 5.3 makes "summary-first" a HARD workflow rule (not agent diligence):
 * before retrieving a multi-section logical unit via `get_section`, an agent
 * must first call `get_document_summary` (or equivalent) so sibling sections
 * comprising one logical unit are discoverable rather than silently omitted
 * (Finding 1 — the under-retrieval that reproduced during this spec's own
 * formalization).
 *
 * Req 5.5 requires that rule to be expressed in a form the **agent generator
 * (Spec 122)** can PROPAGATE into generated agent prompts UNIFORMLY — so the
 * rule is enforced once, centrally, rather than each agent re-stating it ad hoc
 * (which is exactly how it drifts).
 *
 * ENCODING CHOICE (and why it is propagatable)
 * --------------------------------------------
 * This is a **structured, typed, exported constant** — NOT prose buried in a
 * tool description or a steering doc. Spec 122's generator (which already reads
 * canonical sources to emit Markdown + YAML-frontmatter agent configs) can
 * `import { WORKFLOW_RULES }` from this package, filter by `appliesToTools` /
 * `audience`, and render each rule into every generated prompt from ONE source
 * of truth. Properties:
 *   - Single source of truth: edit here → every regenerated prompt updates.
 *   - Machine-consumable: a typed array, not free text to scrape.
 *   - Self-describing: each rule carries id, severity, the tools it governs,
 *     a normative `statement` (prompt-ready), and a `rationale` (the finding).
 *   - Stable id (`summary-first`) so 122 / CI can reference it without parsing.
 *
 * This spec (121) ENCODES the rule. Spec 122 PROPAGATES it. 121 only needs the
 * encoding to exist and be importable; it does not build the generator.
 *
 * Alternatives considered/rejected:
 *   - Prose in the `get_section` tool description only: not uniformly
 *     propagatable (122 would have to scrape a description string), and a tool
 *     description is consumed by the MODEL at call time, not by the generator at
 *     build time. (We ALSO put a one-line cue in the tool description for the
 *     in-context reminder, but that is not the propagation surface.)
 *   - A standalone Markdown rule file: human-readable but the generator would
 *     have to parse Markdown to extract structured fields; a typed constant is
 *     unambiguous and type-checked.
 *   - A steering doc: governed by the ballot-measure model and not importable as
 *     code; wrong surface for a generator to consume mechanically.
 */

/** Severity of a workflow rule. `hard` = mandatory (Req 5.3 "hard workflow rule"). */
export type WorkflowRuleSeverity = 'hard' | 'recommended';

/** Who the rule is rendered for when a prompt is generated. */
export type WorkflowRuleAudience = 'all-agents';

export interface WorkflowRule {
  /** Stable identifier (referenced by Spec 122 / CI; never derived from prose). */
  id: string;
  /** Mandatory vs advisory. */
  severity: WorkflowRuleSeverity;
  /** MCP tools this rule governs (lets 122 attach it only to relevant prompts). */
  appliesToTools: string[];
  /** Audience for prompt rendering. */
  audience: WorkflowRuleAudience;
  /** Normative, prompt-ready statement (rendered verbatim into generated prompts). */
  statement: string;
  /** Why the rule exists — the finding it guards against. */
  rationale: string;
  /** Spec requirement IDs this rule encodes. */
  requirements: string[];
}

/**
 * The canonical workflow-rule set. Spec 122 imports this and renders each rule
 * into generated agent prompts.
 */
export const WORKFLOW_RULES: readonly WorkflowRule[] = [
  {
    id: 'summary-first',
    severity: 'hard',
    appliesToTools: ['get_section', 'get_document_summary'],
    audience: 'all-agents',
    statement:
      'Summary-first (hard rule): when retrieving a multi-section logical unit, ' +
      'call get_document_summary (or equivalent) BEFORE get_section, so sibling ' +
      'sections that comprise one logical unit are discoverable rather than ' +
      'silently omitted. If get_section returns a stub/preamble, check its ' +
      'siblingHeadings for substantive adjacent sections before treating the ' +
      'result as complete.',
    rationale:
      'Finding 1 (highest-severity behavioral risk; reproduced during Spec 121 ' +
      "formalization): get_section returned a preamble + empty template stub " +
      'while the substantive content lived under a SIBLING heading. A naive ' +
      'single-query agent under-retrieves with no signal that more exists.',
    requirements: ['5.3', '5.4', '5.5'],
  },
] as const;

/** Look up a workflow rule by its stable id. */
export function getWorkflowRule(id: string): WorkflowRule | undefined {
  return WORKFLOW_RULES.find((r) => r.id === id);
}

/** All workflow rules that govern a given tool (Spec 122 propagation helper). */
export function workflowRulesForTool(tool: string): WorkflowRule[] {
  return WORKFLOW_RULES.filter((r) => r.appliesToTools.includes(tool));
}
