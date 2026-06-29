# Task 8 Summary: Identity Lock + Discovery Safety

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Subtasks 8.1, 8.2, 8.3, 8.5 — **8.4 (aliases seeding) deferred** (blocked on the Task 10.3 floor dry-run for its worklist).

- **8.1 — Identity lock.** Created the new always-loaded operational-law doc `.kiro/steering/Task-Completion-Protocol.md` (`id: task-completion-protocol`, the end-of-task sequence moved out of Start Up Tasks). Refocused `start-up-tasks.md` to the pre-task checklist (date/governance-health/Jest/authorization) + a pointer to the new doc. Demoted `Process-Development-Workflow` + `Process-File-Organization` (in `governance/`) from `inclusion: always` → `manual`. Asserted no doc outside the 9-doc AC1 set is `always` (grep both roots — meta-guide is the only extra, pending Task 10). Recorded the AXA five-class overlay (non-binding) + the Agent-Directory → capability-catalog 119-B/122 forward-reference. Knock-ons: `init.test.ts` steering counts 9→10 (readdir 10→11); new `.kiro/sync-manifest.json` entry for the doc.
- **8.2 — Calibration text.** Added the certainty-calibration behavioral rule to `AI-Collaboration-Principles.md`, phrased in the strong/partial/none shape of Spec 121's `matchConfidence` signal. Text only; formalization + prompt propagation deferred to 119-B.
- **8.3 — 118 pointer.** Added a distinct numbered surface (`## Pointer 1: Module-Resolution Contract (Spec 118)`) to `DesignerPunk-Systems-Overview.md`, referencing RSA § Module-Resolution Contract by id.
- **8.5 — Cross-ref migration.** Migrated 226 active-doc markdown-link cross-refs across 43 docs to **bare doc `id`s** (resolver-strategy-1 consistent), via an auditable codemod. Fixed stale refs in passing (`./Core%20Goals.md` → `core-goals`; 3 doubly-stale Figma traversal refs). Migrated the 11 always-loaded identity-doc MCP-query `path:` examples by hand. 115 out-of-corpus targets surfaced as exceptions (NOT silently physical-pathed). Historical docs untouched.

## Why It Matters

The always-set is now the locked 9-doc identity core (operational law split cleanly: Start Up Tasks owns the *start*, Task Completion Protocol owns the *end*), with the two stray process docs demoted — satisfying Req 6 AC4 ("no doc outside the AC1 set is `always`"). The calibration text + 118 pointer make guidance discoverable during the 119-A→122→119-B window when the always-loaded meta-guide map is gone. Cross-ref migration to bare `id`s re-decouples references from physical location (the spec's core win) — a relocation or rename no longer breaks them.

## Verified Outcome

- ✅ **id-uniqueness guard**: PASS — 90 docs both roots, 0 derived, `task-completion-protocol` unique.
- ✅ **`always` assertion**: exactly the 9 AC1 docs + meta-guide; 0 `always` in `governance/`.
- ✅ **Root `npm test`**: 8989 passed / 1 failed of 8990 — the one failure is a wall-clock NFR timing flake (`ComponentTokenValidation › scale linearly`) that passes 42/42 in isolation; unrelated to these changes.
- ✅ **mcp-server `jest --runInBand`**: 582 passed / 35 suites, 0 failed.
- ✅ **tsc** (root, `typecheck:scripts`, mcp-server): all exit 0.
- ✅ **init.test.ts**: passes with 9→10 / 10→11 count updates.

## Honest Notes / Flags for Peter

- **Bare-id vs `list_cross_references` tension** (8.5): bare `id` resolves through the path-taking tools but is invisible to `list_cross_references` (parser only extracts `.md`-bearing targets). I chose resolver-consistency (what Req 10 AC1 + Req 2 AC7 mandate); flagged in case you'd rather preserve enumeration.
- **176 governance-corpus MCP-query `path:` snippets** still on legacy paths (fallback-covered). I migrated only the always-loaded identity subset (11); flagged the governance 176 for your scope call — fold into 8.5 now, or roll into the 119-B sweep with the 60 prompt refs. Not a relocation-integrity break either way.
- **8.4 deferred** to post-10.3 (its worklist is the 10.3 floor dry-run WEAK/MISS set).
- **Live MCP server still needs a restart** (Task 7 note) to serve `governance/` through the tools; main loop will `rebuild_index` and re-verify.
