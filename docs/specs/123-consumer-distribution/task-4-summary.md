# Task 4 Summary: Per-harness MCP configuration, tool manifest, and product MCP wiring

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 4 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Every registered tool across all three MCP servers (docs 8, application 21, product 14 — 43 total) now carries an explicit `annotations.readOnlyHint`, authored beside its registration rather than inferred or hand-listed (design C8). A new `scripts/build-tool-manifest.ts` statically imports each server's exported `tools` registration array — no server is ever started — and writes `dist/mcp/tool-manifest.json`, wired into `npm run build:mcp`. `src/cli/shared/mcpConfig/{kiro,cc}.ts` replace `init.ts`'s inline MCP-config emitters: each target's approval list (Kiro `autoApprove`, Claude Code `permissions.allow`) is now GENERATED from the manifest's `readOnlyHint: true` set, fixing the exact defect Req 5.3/5.4 name — the pre-123 static template's docs approvals omitted `find_docs` (the discovery entry point every routing rule begins with) and its application approvals approved the never-registered `validate_component` while omitting 15 of 21 real tools.

The scaffold template gained a third `designerpunk-product` server entry (connection info + a generated approval list, same mechanism as the other two); `init.ts`'s call site did a minimal swap to the new modules; `init.test.ts`'s two-server equality assertion became a deliberate three-server assertion (Req 7.2), with new set-equality coverage proving the approvals are computed live, not copied.

## Why It Matters

A hand-maintained approval list silently drifts from what a server actually registers — exactly what happened pre-123 (a missing discovery tool, an approved tool that doesn't exist). Deriving approvals from a build-time manifest of live, reviewed `readOnlyHint` annotations makes that drift structurally impossible: adding, removing, or reclassifying a tool changes the generated approval list automatically, with no template to remember to update. Both live-manifest bites recorded in this task prove that property directly rather than by inspection.

## Key Changes

- `annotations: { readOnlyHint: … }` added to all 43 registered tool definitions across `mcp-server/src/tools/*.ts`, `application-mcp-server/src/index.ts`, `product-mcp-server/src/index.ts`. Each server's registration array (`tools`) is now exported — the docs server's was refactored out of an inline literal for the first time.
- `scripts/build-tool-manifest.ts` (new) + `scripts/__tests__/tool-manifest.test.ts` (new, 11 tests).
- `src/cli/shared/mcpConfig/kiro.ts`, `cc.ts` (new) — the extracted, manifest-driven emitters.
- `src/cli/templates/mcp-config.json.template`: stale `autoApprove` arrays removed; `designerpunk-product` entry added (`PRODUCT_DIR`, `COMPONENT_DIR`, `TOKEN_INDEX_DIR` — matching Req 19A.5a's root-policy table's "Scaffolded config value" column exactly).
- `src/cli/init.ts`: minimal call-site swap to the new emitter modules.
- `src/cli/__tests__/init.test.ts`: the MCP-config describe block rewritten for three servers and manifest-derived set equality.
- `package.json`: `build:tool-manifest` script, chained into `build:mcp`.

## Impact

- `dist/mcp/tool-manifest.json` now ships in the real npm tarball (confirmed via `npm pack --dry-run`), landing in the `files[]` pattern Task 3 committed ahead of this task's build.
- A consumer's scaffolded MCP configs on BOTH harnesses now auto-approve exactly the tools each server marks read-only — no more, no less — for the first time since the pre-123 template was written.
- Two items carried forward, out of this task's scope: a pre-existing unregistered `get_health_status` tool file in the docs server (never wired into its actual tool list, not introduced by this task); and `product-mcp-server`'s stale `DEFAULT_COMPONENT_DIR` fallback constant (this task's explicit `COMPONENT_DIR` scaffold value bypasses it for new consumers, but the source-file default itself is untouched, per Task 2's original routing).
