# Issue: Docs MCP Reports Stale Index After Steering Doc Edits

**Date**: 2026-05-25
**Package Version**: @3fn/core v11.7.2
**Severity**: Low — cosmetic warning, content serves correctly
**Discovered During**: Spec 003 (Portfolio System Readiness), Task 1

---

## Summary

The Docs MCP (`npx designerpunk mcp:docs`) reports `"status": "degraded"` with warning `"Stale index: 1 files modified since last index"` after editing a steering document (`.kiro/steering/Token-Family-Spacing.md`).

The MCP still serves the updated content correctly when queried — the staleness is in the index metadata, not the content delivery.

---

## Observed Behavior

- Edit `.kiro/steering/Token-Family-Spacing.md`
- `get_index_health` → status: "degraded", warning: "Stale index: 1 files modified since last index"
- `get_section({ path: "...", heading: "..." })` → returns updated content correctly
- No automatic reindex occurs

---

## Questions

1. Is there a way to trigger a reindex from the client side? (No `rebuild_index` equivalent exists on the Docs MCP)
2. Does the stale warning auto-resolve on server restart?
3. Should the MCP auto-reindex on file change detection (inotify/fswatch)?

---

## Impact

Minimal. The warning is cosmetic — content is served correctly. The only risk is if the index is used for cross-reference validation or section discovery (headings might not appear in `get_document_summary` if a new heading was added).
