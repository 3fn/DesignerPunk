# Design Outline: Consumer Contract Testing & MCP Operational Reliability

**Spec**: 106 - Consumer Contract Testing & MCP Operational Reliability
**Date**: 2026-05-12
**Updated**: 2026-06-09
**Status**: Design Outline (Expanded)
**Agent**: Ada (implementation) + Thurgood (formalization, MCP audit)

---

## Problem Statement

### Problem 1: Consumer Experience Not Validated (Original)

Between v11.0.0 and v11.5.2, 10 reactive patches shipped to fix issues that all share a common trait: they worked in the core repo but broke in product repos. The core's 331 test suites validate internal correctness but don't validate the consumer experience.

### Problem 2: MCP Operational Reliability (Expanded — from audit)

An audit of all three MCP servers (June 9, 2026) revealed systemic health management gaps:

- **Application MCP**: No staleness detection. Reports "healthy" even when serving data that's hours stale. File watcher only covers components — patterns, templates, guidance, and token-index changes are invisible.
- **Product MCP**: No file watcher at all. No staleness detection. Binary healthy/empty status. Most mutable data source (product YAML) with least monitoring.
- **Consumer path issues**: Product MCP CLI doesn't pass `COMPONENT_DIR` or `TOKEN_INDEX_DIR`. File watchers are useless in consumer context (watching immutable package directories).
- **Recovery gaps**: Application and Product MCP rebuilds not in `autoApprove` — agents can't self-recover without human intervention.

**Root cause**: The Docs MCP was built with comprehensive health management (Spec 021). Application and Product MCPs were built later without lifting to the same standard. The gap widened as features were added.

---

## Proposed Solution

Two layers address both problems:

### Layer 1: MCP Health Parity

Bring Application and Product MCPs up to the Docs MCP's health management standard:
- Staleness detection (mtime comparison on health check)
- Three-state health (healthy/degraded/failed)
- Expanded file watching (Application: all data sources, Product: add watcher)
- Consumer path resolution fixes
- `autoApprove` for rebuild tools (agents can self-recover)

### Layer 2: Consumer Contract Tests

Two test layers that catch breakage before publish:
- **Export contract tests** (fast, every commit): Verify all `package.json` exports resolve and export expected symbols
- **Consumer integration test** (comprehensive, pre-publish): Simulate full product repo experience including MCP startup

---

## Scope

### In Scope

**MCP Health Parity:**
- Add staleness detection to Application MCP (mtime comparison, same as Docs MCP)
- Add staleness detection to Product MCP (mtime comparison)
- Add first-call staleness gate to ALL three MCPs (lightweight stat check on first tool call per session, rebuild if stale)
- Document write-side rebuild protocol for agents (governance — when you edit MCP-relevant content, trigger rebuild)
- Add file watcher to Product MCP (product YAML directory)
- Expand Application MCP file watcher to cover patterns, templates, guidance, token-index
- Add `degraded` state to Application and Product MCPs (warnings ≠ healthy)
- Fix Product MCP CLI to pass `COMPONENT_DIR` and `TOKEN_INDEX_DIR` env vars
- Fix Application MCP CLI to pass `designLanguagePath` env var
- Add `rebuild_index` and `rebuild_product_index` to `autoApprove` list
- Consumer-context awareness: skip first-call staleness check when data is in immutable package dirs (Docs/Application in consumer context)

**Consumer Contract Tests:**
- Export contract test file (runs with `npm test`)
- Consumer integration test (runs with `npm run test:consumer`)
- MCP startup smoke test + smoke query within integration test

**Documentation & Agent Updates:**
- Update `MCP-Relationship-Model.md` with health management model (threshold gate, layered recovery)
- Update `component-mcp-query-guide.md` to reflect auto-staleness handling
- Update `DesignerPunk-Integration-Guide.md` consumer MCP section
- Add write-side rebuild protocol to agent prompts: Leonardo, Lina, Ada, Sparky, Kenya, Data
- Update Thurgood prompt: MCP health is self-managing, reduce manual monitoring

### Out of Scope
- MCP query correctness validation (testing that queries return *correct* results — different problem)
- Persistent index caching (in-memory-only is acceptable for now)
- Proactive alerting/heartbeat (health-on-demand is sufficient)
- CI pipeline configuration
- Content hashing (mtime is sufficient for v1)

---

## Health Management Model

### The Problem Today

Health is only evaluated *on demand* — agents must explicitly call `get_index_health` to discover staleness. Between the moment data changes and the moment someone checks, MCPs silently serve stale data.

### The Solution: Threshold Staleness Gate + Write-Side Protocol

Three mechanisms work together to eliminate silent staleness:

**Threshold Staleness Gate** (automatic, in MCP server code):
- On any data-returning tool call, the server checks: "has it been >30 seconds since my last staleness check?"
- If yes → scan file mtimes across tracked data sources, compare newest against `lastIndexTime`
- If stale → rebuild before responding (200-500ms, with stderr log: "⚠️ Index stale — rebuilding...")
- If fresh → serve immediately
- Subsequent calls within 30s skip the check entirely
- Health and rebuild tools are exempt (health must report truthfully, rebuild already rebuilds)
- **Implementation note**: Scans individual *file* mtimes, not directory mtimes (directory mtime only reflects direct child additions/removals, not edits to nested files)

**Write-Side Rebuild Protocol** (agent convention, governance-enforced):
- When an agent modifies content that feeds an MCP, the agent triggers `rebuild_index` / `rebuild_product_index` immediately after the write
- This makes data fresh *immediately* rather than waiting up to 30 seconds for the threshold gate
- Documented in agent system prompts and steering docs
- Not mechanically enforced — it's a best-practice protocol, not a hard requirement

**File Watcher** (automatic, backup mechanism):
- Runs inside the MCP server process, detects filesystem events, triggers incremental reindex
- Primary mechanism for Product MCP (watching consumer's mutable `product/` directory)
- Backup mechanism for Docs/Application MCPs (catches edits between threshold checks)
- Known to be unreliable (`fs.watch()` misses events) — the threshold gate is the safety net

### Layered Recovery

| Mechanism | Automatic? | Latency | Catches |
|-----------|:---:|---------|---------|
| Write-side protocol | ⚠️ Convention | Immediate | Agent-made changes |
| File watcher | ✅ Automatic | <100ms (debounce) | Most filesystem changes |
| 30s threshold gate | ✅ Automatic | Up to 30s | Everything the above two miss |

**Worst case**: A human directly edits a file, the file watcher misses the event, and no agent triggers rebuild. The threshold gate catches it within 30 seconds on the next tool call. No manual intervention needed.

### Implementation Per Server

| Server | Staleness Check Scope | File Watcher Scope | Consumer Context |
|--------|----------------------|-------------------|-----------------|
| **Docs MCP** | All `.md` files in steering dir | All `.md` files (recursive) | Skip check + watcher (immutable package) |
| **Application MCP** | Components, patterns, templates, guidance, token-index dirs | All tracked file types (expanded) | Skip check + watcher (immutable package) |
| **Product MCP** | All `.yaml`/`.md` files in product dir | Product dir (recursive) | ✅ Active — consumer's mutable data |

**Consumer-context detection**: If the data path contains `/node_modules/`, the content is immutable (installed package). Skip staleness checks and file watchers for Docs/Application MCPs in this context. Product MCP always runs in consumer context (watching the consumer's own `product/` directory).

### Cost Model

| Operation | Cost | When |
|-----------|------|------|
| Threshold check (scan ~137 file mtimes) | 1.5-7ms | Every 30s at most |
| Rebuild if stale | 200-500ms | Only when actually stale |
| Write-side rebuild | 200-500ms | At point of content change |
| Calls within 30s window | 0ms overhead | Majority of calls |

---

## Architecture

### MCP Health Parity — Target State

| Capability | Docs MCP (baseline) | Application MCP (after) | Product MCP (after) |
|-----------|:---:|:---:|:---:|
| Staleness detection | ✅ mtime | ✅ mtime | ✅ mtime |
| File watcher | ✅ All .md files | ✅ All data sources | ✅ Product YAML |
| Health states | healthy/degraded/failed | healthy/degraded/failed | healthy/degraded/failed |
| Auto-recovery (autoApprove) | ✅ | ✅ | ✅ |
| Consumer-aware | ⚠️ Watcher useless | ⚠️ Watcher useless | ✅ Watches consumer's product/ |

**Key insight for Product MCP**: Unlike Docs and Application MCPs (which serve package-internal data), the Product MCP serves *consumer-owned* data (`product/` directory). Its file watcher is actually *useful* in consumer context — it's watching mutable files the consumer edits. This is the one server where a watcher adds real value.

### Consumer Contract Tests — Architecture

```
npm test (every commit, ~2s added)
  └── src/__tests__/export-contracts.test.ts
        ├── For each exports entry in package.json:
        │   ├── require() resolves without error
        │   └── Expected named exports are present
        └── Subpath coverage: ., ./types, ./build, ./blend, ./testing, ./config

npm run test:consumer (pre-publish, ~90s)
  └── tests/consumer-integration.test.ts
        ├── npm pack → tarball
        ├── Create temp directory
        ├── npm install tarball
        ├── npx designerpunk init
        ├── Set tokenSource in config
        ├── Edit a primitive token value
        ├── npx designerpunk generate → verify output reflects edit
        ├── npx designerpunk validate → passes
        ├── Start MCP servers (mcp:app, mcp:docs, mcp:product)
        │   ├── Verify each starts without error
        │   ├── Verify health endpoint returns healthy/degraded (not failed)
        │   └── Kill servers
        └── Exit 0 if all passed
```

---

## Key Design Decisions

### Decision 1: Export contract test location

**Decision**: `src/__tests__/export-contracts.test.ts` — runs with `npm test`.
**Rationale**: 2s is negligible. Catches broken exports on every commit.

### Decision 2: Integration test packaging

**Decision**: `npm pack` → install tarball in temp directory.
**Rationale**: Tests exactly what consumers get. Catches `files` field issues.

### Decision 3: Staleness detection approach

**Decision**: File mtime comparison (same as Docs MCP), checked on health endpoint calls.
**Rationale**: Proven pattern in Docs MCP. Simple, effective for hand-authored files. No new dependencies needed.

### Decision 4: Product MCP file watcher scope

**Decision**: Watch the `productDir` recursively for `.yaml` and `.md` changes.
**Rationale**: Product MCP is the only server where consumer files are mutable. The watcher adds real value here (unlike Docs/Application where package files are immutable in consumer context).

### Decision 5: `autoApprove` for rebuild tools

**Decision**: Add `rebuild_index` (Application) and `rebuild_product_index` (Product) to `.kiro/settings/mcp.json` autoApprove list.
**Rationale**: When agents detect degraded health, they should be able to self-recover without waiting for human approval. The rebuild is non-destructive (reads from filesystem, rebuilds in-memory state).

### Decision 6: MCP smoke test in integration test

**Decision**: Integration test spawns each MCP server, calls health endpoint via stdio, verifies non-error response, kills server.
**Rationale**: Catches path resolution issues, missing env vars, and startup crashes. Doesn't validate query correctness (out of scope) but validates "server starts and thinks it's healthy."

---

## Dependencies

- Spec 114 (complete) — pipeline data flow restructured, staleness detection already in generate CLI
- Spec 111 (complete) — sync command available for consumer migration
- No blocking dependencies

---

## Success Criteria

1. `npm test` catches broken exports within the standard test suite
2. `npm run test:consumer` catches the 10 failure classes documented in the problem statement
3. Application and Product MCPs report `degraded` when serving stale data
4. Product MCP file watcher triggers re-index when product YAML files change
5. Agents can call rebuild tools without human approval (autoApprove)
6. Product MCP works correctly in consumer repos (COMPONENT_DIR/TOKEN_INDEX_DIR resolved)
7. Integration test verifies MCP servers start successfully and return real data in consumer context
8. First-call staleness gate rebuilds automatically on first query when data has changed (no manual health check needed)
9. Write-side rebuild protocol documented and enforceable via agent governance

---

## Stakeholder Review

- **Ada** — Primary implementer. Owns package, pipeline, MCP servers, and test infrastructure.
- **Sparky** — Consumer perspective. Can validate integration test matches real product repo experience.
- **Thurgood** — Formalization, audit source, governance boundaries.

---

## Open Questions

1. Should staleness detection in Application/Product MCPs be **per-data-source** (patterns stale, components fresh) or **binary** (any staleness = degraded)? Docs MCP uses binary. Per-source is more informative but more complex.

2. Should the MCP smoke test in the integration test use the MCP protocol (JSON-RPC over stdio) or a simpler health check mechanism (HTTP endpoint, file-based ready signal)?

3. Should the integration test verify MCP *query* correctness (e.g., ask for a specific component, verify it returns data) or just startup health? Full query testing is more comprehensive but makes the test brittle to content changes.
