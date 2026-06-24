# Inbound from Spec 121 (MCP Delivery-Layer Hardening) — for Spec 122

**Date**: 2026-06-23
**Status**: Spec 121 shipped. This note records concrete obligations 121 places on the agent generator.

122 follows 118 (not 121), but 121 left two **hard obligations** the generator must honor, plus interim state it must reconcile.

## 1. Propagate the summary-first rule from `WORKFLOW_RULES`
121 Task 6 **encoded** the summary-first workflow rule (Req 5.3/5.5) as a typed, importable constant: `WORKFLOW_RULES` in `mcp-server/src/rules/workflow-rules.ts` (re-exported from the package entry). Each rule carries a stable `id` (`summary-first`), `severity: 'hard'`, `appliesToTools`, a prompt-ready `statement`, and `rationale`.

**The generator must `import { WORKFLOW_RULES }`, filter by `appliesToTools`, and render each rule into every generated agent prompt** — from this single source of truth, so the rule is enforced uniformly rather than each agent re-stating it (which is how it drifts). 121 encodes; 122 propagates.

## 2. The generator's source-of-truth must emit `find_docs`, NOT `get_documentation_map`
121 Task 4 removed the `get_documentation_map` tool and superseded it with `find_docs`. 121's reference sweep (Task 3.4) manually retargeted the **live** `.claude/agents/{ada,lina,data,thurgood}.md` tool grants to `find_docs` — but those `.claude/agents/*.md` files are **disposable ports the 122 generator regenerates.**

**Risk:** if the generator's templates / source still reference `get_documentation_map`, regenerating the agent ports will *regress* them back to a removed tool. Update the generation source so regenerated agent grants reference `find_docs`. (The canonical prompt sources — `.kiro/agents/thurgood-prompt.md`, `product-template/agents/thurgood-prompt.md` — were swept in 121; verify the generator reads the swept versions.)

## 3. Context the generator can use
- The full discovery surface is documented in `MCP-Relationship-Model.md` + `MCP-Integration-Guide.md` (updated in 121 Task 7) — useful as the generator's reference for what tools/contracts to grant agents.
- The three-layer confidence model (`discovery-confidence-rubric.md`) governs what a generated agent should do with a `partial` — cross-reference 119 Decision 4a.
