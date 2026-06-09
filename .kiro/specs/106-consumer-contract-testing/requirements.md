# Requirements Document: Consumer Contract Testing & MCP Operational Reliability

**Date**: 2026-06-09
**Spec**: 106 - Consumer Contract Testing & MCP Operational Reliability
**Status**: Requirements Phase
**Dependencies**: None (Specs 111, 114 complete)

---

## Introduction

Between v11.0.0 and v11.5.2, 10 reactive patches shipped for issues that worked internally but broke in product repos. Separately, all three MCP servers suffer from silent staleness — serving outdated data without reporting or recovering. This spec addresses both problems: consumer contract testing prevents pre-publish breakage, and MCP health parity ensures runtime reliability with automatic staleness recovery.

---

## Requirements

### Requirement 1: Threshold Staleness Gate

**User Story**: As an agent querying an MCP server, I want stale data automatically detected and rebuilt before I receive it, so that I don't make decisions based on outdated information.

#### Acceptance Criteria

1. WHEN a data-returning MCP tool is called AND >30 seconds have elapsed since the last staleness check THEN the server SHALL scan tracked file mtimes and compare against `lastIndexTime`
2. WHEN the staleness check detects files newer than `lastIndexTime` THEN the server SHALL rebuild the index before responding to the tool call
3. WHEN a rebuild is triggered by the staleness gate THEN the server SHALL log to stderr: "⚠️ Index stale — rebuilding..."
4. WHEN a tool call occurs within 30 seconds of the last staleness check THEN no additional check SHALL be performed (zero overhead)
5. WHEN `get_index_health`, `get_component_health`, `get_product_health`, `rebuild_index`, or `rebuild_product_index` is called THEN the staleness gate SHALL NOT fire (these tools are exempt)
6. The staleness check SHALL scan individual file mtimes (not directory mtimes) to correctly detect edits to existing files within subdirectories

---

### Requirement 2: Three-State Health Reporting

**User Story**: As an agent or human checking MCP health, I want the status to distinguish "serving stale data" from "healthy" and "completely broken," so that I understand the severity of any issue.

#### Acceptance Criteria

1. WHEN Application MCP has indexed content AND any tracked file has mtime newer than `lastIndexTime` THEN health status SHALL be `degraded` (not `healthy`)
2. WHEN Product MCP has indexed content AND any tracked file has mtime newer than `lastIndexTime` THEN health status SHALL be `degraded` (not `healthy`)
3. WHEN health status is `degraded` THEN the response SHALL include a `staleFiles` array listing the paths of files newer than the index
4. WHEN health status is `healthy` THEN all tracked files SHALL have mtimes older than or equal to `lastIndexTime`
5. WHEN no content has been indexed (empty state) THEN health status SHALL be `failed` (not `empty`). Note: this is a semantic change from previous behavior — agents previously checking for `empty` must update to check for `failed`
6. The release notes SHALL document the `empty` → `failed` change as a breaking change with required upgrade sequence (install → sync → restart MCPs)
7. Agent prompts updated in Task 6.1 SHALL include the current health states (`healthy` | `degraded` | `failed`) with a note that `empty` no longer exists

---

### Requirement 3: Product MCP File Watcher

**User Story**: As a product developer editing screen specs and product tokens, I want the Product MCP to automatically detect my changes, so that queries reflect my latest edits without manual intervention.

#### Acceptance Criteria

1. WHEN a `.yaml` or `.md` file in the product directory is created, modified, or deleted THEN the Product MCP SHALL trigger a full reindex within 200ms (debounce period)
2. WHEN the file watcher detects a change THEN it SHALL log the event to stderr
3. WHEN the Product MCP is started AND the product directory exists THEN the file watcher SHALL begin watching recursively
4. WHEN the file watcher encounters an error THEN it SHALL log the error and continue operating (no crash)

---

### Requirement 4: Application MCP Expanded Watching

**User Story**: As an agent working with experience patterns, layout templates, or family guidance, I want the Application MCP to detect changes to these data sources, so that queries return current data.

#### Acceptance Criteria

1. WHEN a file in any of the following directories is created, modified, or deleted THEN the Application MCP SHALL trigger reindex for that data source: `experience-patterns/`, `layout-templates/`, `family-guidance/`, `token-index/`
2. WHEN the Application MCP starts THEN it SHALL establish file watchers on all data source directories (not just components)
3. WHEN a watched directory does not exist THEN the watcher SHALL skip it without error

---

### Requirement 5: Consumer Path Resolution Fixes

**User Story**: As a product developer running MCP servers via `npx designerpunk mcp:product`, I want the server to correctly resolve component and token-index paths, so that gap detection and token queries work in my project.

#### Acceptance Criteria

1. WHEN `npx designerpunk mcp:product` is run THEN the CLI SHALL pass `COMPONENT_DIR` and `TOKEN_INDEX_DIR` environment variables pointing to the installed package's paths
2. WHEN `npx designerpunk mcp:app` is run THEN the CLI SHALL pass `DESIGN_LANGUAGE_PATH` environment variable if a design philosophy file exists
3. WHEN an MCP server's data path contains `/node_modules/` THEN the server SHALL skip staleness checks and file watching (content is immutable in consumer context)

---

### Requirement 6: Agent Self-Recovery (autoApprove)

**User Story**: As an agent detecting degraded MCP health, I want to trigger a rebuild without waiting for human approval, so that I can self-recover and continue working.

#### Acceptance Criteria

1. `rebuild_index` (Application MCP) SHALL be in the `autoApprove` list in `.kiro/settings/mcp.json`
2. `rebuild_product_index` (Product MCP) SHALL be in the `autoApprove` list in `.kiro/settings/mcp.json`
3. WHEN an agent calls a rebuild tool THEN it SHALL execute without requiring human confirmation

---

### Requirement 7: Export Contract Tests

**User Story**: As a package maintainer, I want every `package.json` export verified on every commit, so that broken export paths never reach consumers.

#### Acceptance Criteria

1. WHEN `npm test` is run THEN an export contract test SHALL verify all `package.json` exports entries
2. For each export entry, the test SHALL verify: the path resolves to a file that exists, the file can be `require()`'d without error, expected named exports are present, and TypeScript type resolution succeeds (`ts.resolveModuleName` or equivalent)
3. WHEN an export path is broken OR types fail to resolve THEN the test SHALL fail with a message identifying the broken subpath
4. The test SHALL maintain an `expected-exports.json` manifest of expected symbols per subpath, so that removed exports are detected as failures

---

### Requirement 8: Consumer Integration Test

**User Story**: As a package maintainer, I want a pre-publish test that simulates the full consumer experience, so that I never ship a package that breaks in product repos.

#### Acceptance Criteria

1. WHEN `npm run test:consumer` is run THEN it SHALL: pack the package, create a temp directory, install the tarball, run `npx designerpunk init`, run `npx designerpunk sync`, configure `tokenSource`, edit a primitive token, run `npx designerpunk generate`, verify output files exist with non-zero content reflecting the edit
2. WHEN the integration test runs THEN it SHALL also start each MCP server (waiting for stderr ready signal), verify the health endpoint returns non-`failed` status, execute one smoke query per server verifying non-empty data (Application: `catalogSize > 0`, Docs: document map non-empty, Product: health indexed), and kill the servers
3. WHEN the integration test runs THEN it SHALL verify `npx designerpunk validate` passes
4. WHEN any step fails THEN the test SHALL fail with a message identifying which consumer workflow step broke

---

### Requirement 9: Write-Side Rebuild Protocol

**User Story**: As a system architect, I want agents to proactively rebuild MCP indexes after modifying relevant content, so that data is fresh immediately rather than waiting for the threshold gate.

#### Acceptance Criteria

1. Agent system prompts for Leonardo, Lina, Ada, Sparky, Kenya, and Data SHALL include the write-side rebuild protocol (call rebuild after modifying MCP-relevant content)
2. The protocol SHALL specify which MCP tool to call based on what was modified (steering docs → Docs MCP rebuild, schemas/contracts → Application MCP rebuild, product YAML → Product MCP rebuild)
3. Thurgood's system prompt SHALL be updated to reflect that MCP health is self-managing (threshold gate), reducing manual monitoring to exception handling

---

### Requirement 10: Documentation Updates

**User Story**: As a developer or agent, I want documentation to reflect the new health management model, so that I understand how MCP freshness works.

#### Acceptance Criteria

1. `MCP-Relationship-Model.md` SHALL document the threshold staleness gate, write-side protocol, and layered recovery model
2. `component-mcp-query-guide.md` SHALL be updated to reflect auto-staleness handling (remove manual rebuild guidance)
3. `DesignerPunk-Integration-Guide.md` consumer MCP section SHALL note automatic staleness recovery
