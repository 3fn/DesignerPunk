# Release Notes — v11.10.0

**Date**: 2026-06-09
**Type**: Minor Release
**Specs**: 106 (Consumer Contract Testing & MCP Operational Reliability)
**Previous**: v11.9.0

---

## Summary

MCP operational reliability and consumer safety release. All three MCP servers now self-manage data freshness via a 30-second threshold staleness gate — no manual health checks or rebuild calls needed during normal operation. Application and Product MCPs lifted to Docs MCP's health standard (three-state reporting, expanded file watchers, consumer path fixes). Consumer contract tests prevent broken exports and init workflows from reaching consumers.

## ⚠️ Internal Change: MCP Health Status

`status: "empty"` is now `status: "failed"` across all MCP health endpoints. This is an internal MCP tool response change — agent prompts are updated automatically via `npx designerpunk sync`.

**Upgrade sequence:**
1. `npm install @3fn/core@11.10.0`
2. `npx designerpunk sync` (updates agent prompts with new status values)
3. Restart MCP servers

## Changes

### MCP Health Management (Spec 106)

- **Threshold staleness gate**: All three servers auto-detect stale data every 30 seconds and rebuild before responding. Agents always receive fresh data without manual intervention.
- **Three-state health**: Application and Product MCPs now report `healthy` / `degraded` / `failed` (previously only `healthy` / `empty`). `degraded` includes stale file paths for diagnostics.
- **Product MCP file watcher**: New — watches `product/` directory recursively for YAML/MD changes, triggers automatic reindex.
- **Application MCP expanded watcher**: Now covers patterns, templates, guidance, and token-index directories (previously only components).
- **Consumer path fixes**: Product MCP CLI now passes `COMPONENT_DIR` and `TOKEN_INDEX_DIR` env vars. Application MCP CLI passes `DESIGN_LANGUAGE_PATH`. Fixes gap detection and design philosophy indexing in consumer repos.
- **autoApprove**: `rebuild_index` and `rebuild_product_index` added to autoApprove list — agents can self-recover without human approval.
- **Consumer-context awareness**: Staleness checks and file watchers skip when data is in `/node_modules/` (immutable installed package).

### Consumer Contract Tests (Spec 106)

- **Export contract test**: Verifies all `package.json` exports resolve, `require()` succeeds, expected symbols present, TypeScript types resolve. Runs in `npm test` on every commit.
- **Consumer integration test**: Full `npm pack` → temp dir → install → init → sync → configure → generate → validate → MCP smoke test flow. Run via `npm run test:consumer` pre-publish.
- **MCP smoke queries**: Integration test spawns each server, sends JSON-RPC health + data query, verifies non-empty responses (Application: catalogSize > 0, Docs: documentation map non-empty, Product: health indexed).

### Agent Governance (Spec 106)

- **Write-side rebuild protocol**: All agent prompts updated with instructions to call `rebuild_index` / `rebuild_product_index` after modifying MCP-relevant content.
- **Health states documented**: All agents informed that `empty` no longer exists, replaced by `failed`.
- **Thurgood**: MCP monitoring updated — self-managing via threshold gate, manual intervention only for persistent failures.

### Other

- **`.kiro/skills/android/SKILL.md`**: Added skill group descriptor (resolves Kiro IDE warning).
- **MCP-Relationship-Model.md**: New "Health Management Model" section documenting threshold gate, write-side protocol, layered recovery.
- **Integration Guide**: Consumer MCP section notes automatic data freshness.
- **component-mcp-query-guide.md**: Data freshness note — no manual rebuild needed.

## Test Suite

- Application MCP: 232/232 passing (21 suites)
- Product MCP: 151/151 passing (10 suites)
- Export contracts: 71 tests for all export paths
- Consumer integration: full workflow verified
- StalenessGate: 16 unit tests per server (48 total)

## Breaking Change Note

The `empty` → `failed` status rename affects agents and code checking MCP health status values. The change ships with updated agent prompts (governance tier — auto-applied by `sync`). Consumers who `sync` after upgrade will have correct prompts immediately. The health status is also less frequently checked manually now — the threshold gate makes health self-managing.
