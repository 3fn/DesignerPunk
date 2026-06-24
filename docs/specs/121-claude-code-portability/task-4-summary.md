# Task 4 Summary: Application-MCP Tool-Boundary Contract Test

**Date**: 2026-06-23
**Purpose**: Concise summary of Spec 121 Task 4 completion
**Organization**: spec-summary
**Scope**: 121-claude-code-portability

## What Was Done

Built the end-to-end contract test that makes 121's additive guarantee enforceable instead of aspirational (the "H1 gap"):
- A `callTool`-level harness drives `get_token_details` and `find_components` through the real `handleTool` response-assembly boundary (not the QueryEngine/indexer underneath).
- Exact-key-set assertions on both tools so any field add/remove/rename fails loud; the resolved-value triple, theme-varying bundle, "no `value` on semantics", and `ApplicationSummary` shape are all pinned.
- Calibration fixtures assert the Task-5 confidence tiers at the boundary for both tools — including the now-satisfiable RTL recall floor (`strong` via the docs aliases).
- Tightened two vacuous `get_section` assertions that silently passed on error.

## Why It Matters

Req 3 existed because no test imported `application-mcp-server/src/index.ts`, so the emitted shapes of the two tools — the contracts Tasks 1, 2, and 5 depend on — were never enforced end-to-end. Now a breaking change to either tool's shape fails the suite loudly, the additive guarantee is verifiable, and the discovery confidence tiers (down to the adversarial false-confidence guards and the RTL semantic-synonym floor) are asserted at the tool boundary. Building the harness also surfaced and fixed a latent bug: `index.ts` was auto-starting the production server on import.

## Key Changes

- `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts` (+71 tests) + additive `createTestableServer`/`callTool` export + `require.main` guard in `index.ts`.
- `mcp-server/src/query/__tests__/find-docs-calibration.test.ts` (+25 tests) driving `find_docs` through `handleFindDocs`.
- Two tightened `get_section` integration assertions.

## Impact

- ✅ Additive guarantee enforced (exact key-set; breaking = loud)
- ✅ Token triple / theme-varying bundle / no-`value`-on-semantics / `ApplicationSummary` / empty contract all pinned
- ✅ Tier calibration fixtures for both tools at the boundary; RTL floor satisfied (`strong`)
- ✅ tsc clean; 320 (app) + 496 (docs) tests pass
- ✅ Latent production-auto-start-on-import bug fixed
- Note: `null` resolutionDepth is unreachable via `callTool` (covered at unit level); "spec planning" ranks the target doc #2 within `strong` (Layer-3, not pinned)

---

*For detailed implementation notes, see [task-4-parent-completion.md](../../../.kiro/specs/121-claude-code-portability/completion/task-4-parent-completion.md)*
