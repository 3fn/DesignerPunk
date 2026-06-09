# Implementation Plan: Consumer Contract Testing & MCP Operational Reliability

**Date**: 2026-06-09
**Spec**: 106 - Consumer Contract Testing & MCP Operational Reliability
**Status**: Implementation Planning
**Dependencies**: None (Specs 111, 114 complete)

---

## Implementation Plan

Implementation follows a two-phase approach: Phase A (MCP Health Parity) establishes reliable health management across all three servers. Phase B (Consumer Contract Tests) writes tests that verify both the MCP fixes and the full consumer experience. Documentation and governance updates close out the spec.

---

## Task List

- [x] 1. Shared Staleness Gate Module

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `StalenessGate` class works across all three servers with configurable data dirs and extensions
  - Threshold timing correct (30s between checks)
  - File mtime scanning detects edits to nested files
  - Immutable context detection skips checks for package data
  - Rebuild callback fires when stale, with stderr logging

  **Primary Artifacts:**
  - Shared `StalenessGate` module (location TBD by implementer — shared between 3 server codebases)
  - Unit tests for the gate

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-1-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Shared Staleness Gate Module"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Implement StalenessGate class
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    - Design and implement `StalenessGate` with configurable `dataDirs`, `fileExtensions`, `thresholdMs`, `isImmutable`, `onRebuild`
    - Implement in one server codebase (application-mcp-server recommended), then copy to mcp-server/ and product-mcp-server/ (cross-server imports not possible due to tsconfig boundaries)
    - Implement `checkAndRebuildIfNeeded()`: check elapsed time, scan file mtimes if threshold exceeded, trigger rebuild if stale
    - Implement `markIndexed()`: update `lastIndexTime` after successful rebuild
    - Implement `getStaleFiles()`: return list of files newer than `lastIndexTime`
    - Implement `isImmutableContext()` detection (path contains `/node_modules/`)
    - Add stderr logging: "⚠️ Index stale — rebuilding..." when rebuild triggered
    - Write comprehensive unit tests (timing, scanning, rebuild trigger, immutable skip, exempt tools)
    - _Requirements: R1 AC1-6, R5 AC3_

---

- [x] 2. MCP Health Parity — Application MCP

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Application MCP reports three-state health (healthy/degraded/failed)
  - Staleness gate integrated into tool handler
  - File watchers cover all data sources (components + patterns + templates + guidance + token-index)
  - `rebuild_index` in autoApprove list
  - `designLanguagePath` passed by CLI

  **Primary Artifacts:**
  - `application-mcp-server/src/indexer/ComponentIndexer.ts` (modified — health)
  - `application-mcp-server/src/watcher/FileWatcher.ts` (modified — expanded scope)
  - `application-mcp-server/src/index.ts` (modified — gate integration)
  - `.kiro/settings/mcp.json` (modified — autoApprove)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-2-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: MCP Health Parity — Application MCP"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Add three-state health and staleness detection to Application MCP
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Modify `ComponentIndexer.getHealth()` to compute `degraded` status using mtime comparison
    - Add `getStaleFiles()` method scanning all data source directories
    - Return `staleFiles` array in health response when degraded
    - Change `empty` status to `failed` for consistency
    - Write tests for health state transitions
    - _Requirements: R2 AC1, R2 AC3-4_

  - [x] 2.2 Integrate StalenessGate into Application MCP tool handler
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Instantiate `StalenessGate` with Application MCP's data directories and extensions
    - Add gate check to `handleTool()` for all data-returning tools
    - Exempt health and rebuild tools from the gate
    - Set `isImmutable` based on consumer-context detection
    - Write integration tests (modify file, verify gate triggers rebuild on next tool call after 30s)
    - _Requirements: R1 AC1-6_

  - [x] 2.3 Expand Application MCP file watcher
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add watchers for `patternsDir`, `templatesDir`, `guidanceDir`, `tokenIndexDir`
    - Each watcher triggers reindex of its respective data source
    - Handle missing directories gracefully (skip, no error)
    - Write tests for watcher expansion
    - _Requirements: R4 AC1-3_

  - [x] 2.4 Add autoApprove and designLanguagePath CLI fix
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `rebuild_index` to autoApprove in `.kiro/settings/mcp.json`
    - Add `DESIGN_LANGUAGE_PATH` env var to `runMcpApp()` in CLI
    - _Requirements: R5 AC2, R6 AC1_

---

- [x] 3. MCP Health Parity — Product MCP

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Product MCP reports three-state health (healthy/degraded/failed)
  - Staleness gate integrated into tool handler
  - File watcher detects product YAML/MD changes and triggers reindex
  - `rebuild_product_index` in autoApprove list
  - CLI passes COMPONENT_DIR and TOKEN_INDEX_DIR

  **Primary Artifacts:**
  - `product-mcp-server/src/watcher/FileWatcher.ts` (new)
  - `product-mcp-server/src/index.ts` (modified — gate + watcher + health)
  - `src/cli/designerpunk.ts` (modified — env vars)
  - `.kiro/settings/mcp.json` (modified — autoApprove)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-3-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: MCP Health Parity — Product MCP"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Add three-state health, staleness detection, and file watcher to Product MCP
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add staleness detection (mtime scan of product directory)
    - Modify health to report `degraded` when stale, `failed` when empty
    - Implement `ProductFileWatcher` (recursive, `.yaml`/`.md`, 200ms debounce)
    - Wire watcher to trigger full reindex on change
    - Write tests for health states and watcher
    - _Requirements: R2 AC2-5, R3 AC1-4_

  - [x] 3.2 Integrate StalenessGate into Product MCP tool handler
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Instantiate `StalenessGate` with product directory config
    - Add gate check to `handleTool()` for data-returning tools
    - Product MCP is always in mutable context (never skip gate — watches consumer's files)
    - Write integration tests
    - _Requirements: R1 AC1-6_

  - [x] 3.3 Fix Product MCP CLI path resolution and autoApprove
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `COMPONENT_DIR` and `TOKEN_INDEX_DIR` env vars to `runMcpProduct()` in CLI
    - Add `rebuild_product_index` to autoApprove in `.kiro/settings/mcp.json`
    - _Requirements: R5 AC1, R6 AC2_

---

- [x] 4. Docs MCP — Staleness Gate Integration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Docs MCP uses the shared StalenessGate module (replacing ad-hoc health checks)
  - Threshold gate fires on data-returning tool calls
  - Existing three-state health and file watcher continue working
  - Consumer-context detection skips gate for immutable package data

  **Primary Artifacts:**
  - `mcp-server/src/index.ts` (modified — gate integration)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-4-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Docs MCP — Staleness Gate Integration"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Integrate StalenessGate into Docs MCP
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Instantiate `StalenessGate` with Docs MCP config (steering dir, `.md` extensions)
    - Add gate check to tool handler (exempt health/rebuild tools)
    - Set `isImmutable` based on consumer-context detection
    - Verify existing health checks and file watcher continue working alongside the gate
    - Write tests
    - _Requirements: R1 AC1-6, R5 AC3_

---

- [ ] 5. Consumer Contract Tests

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Export contract test catches broken exports in `npm test`
  - Consumer integration test simulates full product repo experience
  - MCP smoke queries verify real data returned (not just healthy status)
  - All 10 documented failure classes would be caught by the test suite

  **Primary Artifacts:**
  - `src/__tests__/export-contracts.test.ts`
  - `tests/consumer-integration.test.ts`
  - `package.json` scripts update (`test:consumer`)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-5-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Consumer Contract Tests"`
  - Verify: Check GitHub for committed changes

  - [ ] 5.1 Implement export contract test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/__tests__/export-contracts.test.ts`
    - Iterate all `package.json` exports entries
    - Verify each: resolves, require() succeeds, expected named exports present
    - Add TypeScript type resolution check per subpath (`ts.resolveModuleName` or `tsc --noEmit` on fixture)
    - Create and maintain `expected-exports.json` manifest of symbols per subpath
    - Define expected exports per subpath (`.`, `./types`, `./build`, `./blend`, `./testing`, `./config`)
    - _Requirements: R7 AC1-4_

  - [ ] 5.2 Implement consumer integration test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `tests/consumer-integration.test.ts`
    - Implement full flow: npm pack → temp dir → install → init → sync → configure tokenSource → edit primitive → generate → validate → verify output files exist with non-zero content
    - Add MCP smoke test: spawn each server via stdio, wait for stderr ready signal, send JSON-RPC initialize + tool call, verify non-empty response, kill
    - Smoke queries: `get_component_catalog` (Application — verify catalogSize > 0), `get_documentation_map` (Docs — verify non-empty), `get_product_health` (Product — verify indexed)
    - Add `test:consumer` script to package.json
    - _Requirements: R8 AC1-4_

---

- [ ] 6. Documentation & Agent Governance Updates

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Write-side protocol documented in all relevant agent prompts
  - MCP-Relationship-Model.md reflects new health management model
  - Integration Guide updated for consumers
  - Thurgood prompt updated (MCP self-managing)

  **Primary Artifacts:**
  - `.kiro/agents/leonardo-prompt.md` (modified)
  - `.kiro/agents/lina-prompt.md` (modified)
  - `.kiro/agents/ada-prompt.md` (modified)
  - `.kiro/agents/sparky-prompt.md` (modified)
  - `.kiro/agents/kenya-prompt.md` (modified)
  - `.kiro/agents/data-prompt.md` (modified)
  - `.kiro/agents/thurgood-prompt.md` (modified)
  - `.kiro/steering/MCP-Relationship-Model.md` (modified)
  - `.kiro/steering/component-mcp-query-guide.md` (modified)
  - `.kiro/steering/DesignerPunk-Integration-Guide.md` (modified)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/106-consumer-contract-testing/completion/task-6-completion.md`
  - Summary: `docs/specs/106-consumer-contract-testing/task-6-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 6 Complete: Documentation & Agent Governance Updates"`
  - Verify: Check GitHub for committed changes

  - [ ] 6.1 Add write-side rebuild protocol to agent prompts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add protocol section to Leonardo, Lina, Ada, Sparky, Kenya, Data prompts:
      - After modifying steering docs → call Docs MCP `rebuild_index`
      - After modifying component schemas/contracts/meta → call Application MCP `rebuild_index`
      - After modifying product YAML/screens → call Product MCP `rebuild_product_index`
      - After `npx designerpunk generate` → call Application MCP `rebuild_index` (token-index updated)
    - Update Thurgood prompt: MCP health is self-managing via threshold gate; manual monitoring reduced to exception handling
    - _Requirements: R9 AC1-3_

  - [ ] 6.2 Update steering documentation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Update `MCP-Relationship-Model.md`: add Health Management Model section (threshold gate, write-side protocol, layered recovery, cost model)
    - Update `component-mcp-query-guide.md`: remove manual rebuild guidance, note auto-staleness handling
    - Update `DesignerPunk-Integration-Guide.md`: consumer MCP section notes automatic staleness recovery, no manual health checks needed
    - _Requirements: R10 AC1-3_
