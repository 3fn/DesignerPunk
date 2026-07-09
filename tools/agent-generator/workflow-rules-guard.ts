/**
 * WORKFLOW_RULES wiring + anti-duplication guard (C2.4) — Spec 122 Task 1.3.
 *
 * design.md § "C2 — Shared substrate files", C2.4:
 * > **`WORKFLOW_RULES`** — imported (`import { WORKFLOW_RULES }` from the mcp-server
 * > package entry re-export, per 121 Task 6), filtered by `appliesToTools` per target,
 * > rendered as class-(c) content into every prompt. No canonical file duplicates a rule
 * > statement; the validate stage greps canonical bodies for encoded-rule `id` phrases and
 * > fails on hand-restated variants (Req 4 AC3).
 *
 * This file establishes the IMPORT + the validate-stage GUARD only. It does NOT render
 * WORKFLOW_RULES into prompts — that rendering is class-(c) content, done by the pipeline's
 * render step (C3/Task 2), not here.
 *
 * IMPORT PATH — verified against the real repo, not assumed:
 * -----------------------------------------------------------
 * `mcp-server/src/index.ts` re-exports `WORKFLOW_RULES` (Spec 121 Task 6, see the comment
 * at that re-export: "Spec 121 Req 5.5: re-export the machine-consumable workflow-rule
 * artifact so the agent generator (Spec 122) can import and propagate it"). The package is
 * `@designerpunk/mcp-documentation-server` (mcp-server/package.json `name`), but this repo
 * has NO npm workspaces and NO `node_modules/@designerpunk` symlink — `require.resolve`
 * for the bare specifier fails from this package. The mcp-server IS invoked elsewhere only
 * as a spawned child process by absolute path (see `.mcp.json`), never as a library import.
 * So the resolvable import here is a RELATIVE path to the compiled package entry:
 *   `../../mcp-server/dist/index` (compiled) — mirrors `../../mcp-server/src/index` at the
 *   TypeScript-source level for editors/ts-node, resolved the same way schema.ts's sibling
 *   files resolve within this package.
 *
 * KNOWN HAZARD (flagged, not fixed here — out of this task's write scope):
 * `mcp-server/src/index.ts` calls `main().catch(...)` at MODULE TOP LEVEL with no
 * `require.main === module` guard, so importing the package entry (`dist/index.js` or
 * `src/index.ts`) as a library — not spawning it as a process — starts the MCP server
 * (indexes the corpus, starts a file watcher, binds stdio) as a side effect. Verified by
 * direct `require()` in this task. To avoid that side effect while still importing from
 * the real package-entry re-export surface (not bypassing it via the internal
 * `rules/workflow-rules` module, which would defeat the point of the Task 6 re-export),
 * this module imports `WORKFLOW_RULES`'s TYPE eagerly (a type-only import erases at compile
 * time, so it does not trigger the runtime side effect) and the VALUE lazily via a
 * `getWorkflowRules()` accessor that `require()`s the entry only when actually called. The
 * pipeline's real render step (Task 2/C3) — which runs as part of `generate`, a context
 * where starting the MCP server as a side effect is likely tolerable or even already
 * running — can call `getWorkflowRules()` directly. This guard function, which only needs
 * rule `id` STRINGS (not the live array) to scan canonical bodies, uses the hard-coded
 * `KNOWN_WORKFLOW_RULE_IDS` list below instead of invoking the accessor, so the guard never
 * pays the side-effect cost. `KNOWN_WORKFLOW_RULE_IDS` is verified against the live import
 * in this package's test file (see `__tests__/workflow-rules-guard.test.ts`), so drift
 * between the hard-coded list and the real `WORKFLOW_RULES` array fails the test suite
 * rather than silently going stale.
 *
 * This side-effect hazard is a real gap in `mcp-server/src/index.ts`, out of scope for this
 * task (write scope is `canonical/shared/**` + `tools/agent-generator/**` only). Flagged in
 * the Task 1.3 completion report for Ada/Thurgood follow-up (adding a
 * `require.main === module` guard to `mcp-server/src/index.ts` is the standard fix).
 *
 * TYPE IMPORT PATH NOTE: the type import below targets `mcp-server/dist/index` (the
 * COMPILED package entry, a build artifact), not `mcp-server/src/...`. Importing any file
 * under `mcp-server/src/` fails this package's `tsconfig.json` `rootDir: "."` check (TS6059
 * — verified: `mcp-server/src/rules/workflow-rules.ts` is not under this package's rootDir).
 * `mcp-server/dist/index.d.ts` is `.gitignore`d build output, present because `npm run
 * build:mcp` (or the mcp-server package's own `build`) has already run in this checkout —
 * a real, if slightly indirect, dependency: this package's typecheck now implicitly depends
 * on `mcp-server/dist` being built first. Flagged for Task 2 (the pipeline engine, which
 * will need mcp-server's dist for real MCP-session use anyway) rather than solved with a
 * project-reference/rootDir change here, which is out of this task's narrow scope.
 */

import type { WorkflowRule } from '../../mcp-server/dist/index';

export type { WorkflowRule };

/**
 * Lazily imports the real package-entry re-export (per 121 Task 6) and returns the live
 * `WORKFLOW_RULES` array. NOT called by the guard below (see file header) — this is the
 * accessor the pipeline's render step (C3/Task 2) uses when it actually needs to render
 * rule content into prompts.
 */
export function getWorkflowRules(): readonly WorkflowRule[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const entry = require('../../mcp-server/dist/index') as { WORKFLOW_RULES: readonly WorkflowRule[] };
  return entry.WORKFLOW_RULES;
}

/**
 * The known WORKFLOW_RULES `id`s, kept in sync with the real array by
 * `__tests__/workflow-rules-guard.test.ts` (which imports the live constant and asserts
 * this list matches it exactly). Used by the guard below so scanning canonical bodies for
 * hand-restated rule variants never has to pay the `getWorkflowRules()` side-effect cost.
 */
export const KNOWN_WORKFLOW_RULE_IDS: readonly string[] = ['summary-first'];

/**
 * Per-rule phrase fragments that would indicate a canonical body HAND-RESTATES the rule's
 * substance instead of relying on the generated class-(c) render. Deliberately narrow and
 * literal (substring match, case-insensitive) rather than a broad topic-word match, so the
 * guard does not false-positive on prose that merely mentions the same MCP tools for
 * unrelated reasons. One entry per id in KNOWN_WORKFLOW_RULE_IDS; kept in sync by the same
 * test that checks the id list.
 */
const RULE_RESTATEMENT_PHRASES: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'summary-first': ['summary-first', 'summary first (hard rule)', 'call get_document_summary (or equivalent) before get_section'],
});

export interface WorkflowRuleDuplicationError {
  ruleId: string;
  matchedPhrase: string;
  /** 1-based line number within the scanned body. */
  line: number;
  /** The offending line's text, for error reporting. */
  lineText: string;
}

/**
 * The validate-stage anti-duplication guard (Req 4 AC3): scans a canonical agent BODY
 * (pass-through prose — schema.ts's `body`-form content classes) for encoded-rule `id`
 * phrases / known restatement fragments. Returns one error per hit; an empty array means
 * the body does not hand-restate any known WORKFLOW_RULES rule.
 *
 * This intentionally does NOT scan frontmatter (frontmatter is structured data the pipeline
 * renders FROM, not hand-authored prose that could restate a rule) and does NOT require
 * `mcp-server`'s package entry to be built/importable at guard-run time (it uses the static
 * `RULE_RESTATEMENT_PHRASES` table, not a live query against WORKFLOW_RULES) — so the guard
 * is runnable even before Task 2's render step exists.
 */
export function guardNoWorkflowRuleDuplication(body: string): WorkflowRuleDuplicationError[] {
  const errors: WorkflowRuleDuplicationError[] = [];
  const lines = body.split('\n');
  const lowerLines = lines.map((l) => l.toLowerCase());

  for (const ruleId of KNOWN_WORKFLOW_RULE_IDS) {
    const phrases = RULE_RESTATEMENT_PHRASES[ruleId] ?? [];
    for (const phrase of phrases) {
      const needle = phrase.toLowerCase();
      lowerLines.forEach((lowerLine, index) => {
        if (lowerLine.includes(needle)) {
          errors.push({
            ruleId,
            matchedPhrase: phrase,
            line: index + 1,
            lineText: lines[index],
          });
        }
      });
    }
  }

  return errors;
}

/**
 * Scans every canonical agent body under `canonical/agents/*.md` (or an injected list of
 * `{ sourcePath, body }` pairs, for testability) and returns the union of duplication
 * errors across all agents. Intended as the validate-stage entry point (Req 4 AC3) — wired
 * into the pipeline's `validate()` alongside schema.ts's five rules when C3 lands (Task 2);
 * runnable standalone today via `npm run test:agent-generator` (unit coverage) or by
 * calling this function directly from a script.
 */
export function guardCanonicalAgentBodies(
  docs: readonly { sourcePath: string; body: string }[]
): { sourcePath: string; errors: WorkflowRuleDuplicationError[] }[] {
  return docs
    .map((doc) => ({ sourcePath: doc.sourcePath, errors: guardNoWorkflowRuleDuplication(doc.body) }))
    .filter((result) => result.errors.length > 0);
}
