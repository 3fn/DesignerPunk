# Task 6 Summary: Relocate Non-Identity Docs to `governance/` (Atomic with Companion Re-Point)

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Moved the **80** relocated-role steering docs from `.kiro/steering/` to a new project-root `governance/` directory (79 via `git mv` with history preserved; 1, `Component-Schema-Format.md`, staged as a tracked rename after resolving a pre-existing case-mismatch between git's lowercase-tracked name and the on-disk capital name). The **9** docs that stay (8 identity + the removed-role meta-guide, deleted later in Task 10) remain in `.kiro/steering/`. Relocated-doc content is byte-unchanged: 76 of 80 are `R100` (byte-identical), and the only 4 with edits (`R099`) carry ONLY their intended single-line change (3 reverse-link depth fixes + 1 Integration-Guide MCP-config repoint). Atomically (subtask 6.2) re-pointed all **22** family-guidance `companion:` values (9 top-level + 13 nested) + the README template + the 3 reverse-coupling `../../family-guidance/` links (depth shortened to `../`) to the `governance/` form. Recorded the rollback + idempotency contract (6.3).

## Why It Matters

Relocation is the spec's highest-risk op: it physically removes the original paths, so it depends on the resolver + frozen legacy-path manifest being live first. Landing the move + companion re-point as one atomic unit prevents a transient window where a relocated Component-Family doc with a lagged companion would fire `FamilyGuidanceIndexer` warnings. Byte-unchanged content keeps the move a pure relocation (identity is the immutable `id`; only location changes), and the legacy-path fallback means references resolve in both rolled-forward and rolled-back states — no orphan window.

## Verified Outcome

- ✅ **80 moved / 9 residual**: `.kiro/steering/` = 9 (`00-steering-documentation-directional-priorities`, `AI-Collaboration-Principles`, `Agent-Directory`, `Civitas-System-Overview`, `DesignerPunk-Systems-Overview`, `Spec-Feedback-Protocol`, `core-goals`, `personal-note`, `start-up-tasks`); `governance/` = 80.
- ✅ **Content byte-unchanged**: 76 `R100` + 4 `R099` whose diffs (verified blob-vs-blob) contain ONLY the intended single-line edits.
- ✅ **Companion re-point**: all 22 → `governance/`, README template + 3 reverse-links corrected; **0 `.kiro/steering` companions remain**; all 9 top-level companions resolve to existing `governance/` files → **0 new family-guidance warnings** (the Req 8 AC6 axis stays at its zero baseline).
- ✅ **Reachability** (direct `DocumentIndexer` against `governance/`): relocated docs resolve by `id`; `governance/…` indexed-keys resolve directly; legacy `.kiro/steering/…` paths (incl. old space-bearing names) resolve via `legacy-fallback` to the correct `governance/` keys + ids.
- ✅ Full suites green (consolidated in the Task 7 summary): root 377/8990, mcp-server 35/582, all `tsc` + `typecheck:scripts` clean.

## Honest Notes

- **Live MCP server is stale** — needs a **restart** (not just `rebuild_index`) to observe `governance/` through the MCP tools; reachability was proven directly via `DocumentIndexer`, as prior tasks did. The Task 11 gate does the authoritative end-to-end check.
- **Frozen legacy-path manifest is not copied into `dist/`** (pre-existing packaging detail; `tsc` doesn't copy `.json`) — the compiled server's legacy index is empty until that JSON is packaged. Flagged for the Task 11 gate / build owner; does not affect id / indexed-key resolution.
- **The 13 nested companions are gate-blind** — re-pointed for correctness, but a green family-guidance axis attests only to the 9 top-level.
- **`Component-Schema-Format.md` casing**: the tracked name was lowercase, the on-disk name capital; I normalized to the canonical capital form on the move (matches its `Component-*` siblings + the doc-inventory). Content identical to HEAD.
