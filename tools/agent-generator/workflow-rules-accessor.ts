/**
 * WORKFLOW_RULES live accessor — split out of `workflow-rules-guard.ts` (agent-generator
 * residuals, issue `.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md`
 * item 2b).
 *
 * `getWorkflowRules()` holds a literal `require('../../mcp-server/dist/index')`. esbuild
 * resolves every literal `require()` in a reachable file before it tree-shakes unreferenced
 * functions, so while this function lived in `workflow-rules-guard.ts` (which `pipeline.ts`,
 * and therefore the consumer bundle, imports for `guardCanonicalAgentBodies`) a build with
 * `mcp-server/dist` absent failed, and `build:generator` carried `--external` to hold the
 * require back. This module is imported ONLY by `generate.ts` (the steward pipeline), so the
 * `require` is outside `consumer-entry.ts`'s closure and the flag is gone.
 *
 * The VALUE import stays LAZY (`require()` at call time, not module load) so importing this
 * module never needs `mcp-server/dist` until a caller actually asks for the live array. The
 * `WorkflowRule` type is re-exported from `./workflow-rules-guard` (type-only, erased).
 */

import type { WorkflowRule } from './workflow-rules-guard';

/**
 * Lazily imports the real package-entry re-export (per 121 Task 6) and returns the live
 * `WORKFLOW_RULES` array — the accessor the pipeline's render step (C3/Task 2) uses when it
 * actually needs to render rule content into prompts.
 */
export function getWorkflowRules(): readonly WorkflowRule[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const entry = require('../../mcp-server/dist/index') as { WORKFLOW_RULES: readonly WorkflowRule[] };
  return entry.WORKFLOW_RULES;
}
