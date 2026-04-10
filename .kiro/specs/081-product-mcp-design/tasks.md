# Implementation Plan: Product MCP Design

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Status**: Implementation Planning
**Dependencies**: Spec 094 (complete), Spec 095 (complete), Spec 096 (independent)

---

## Implementation Sequence

Three workstreams:

1. **WS3**: MCP path configuration — explicit paths for all three servers (Ada + Lina)
2. **WS5**: Product MCP server — build, index, query tools, CLI command (Cross-agent)
3. **Agent updates**: Reframe prompts, update Integration Guide (Thurgood)

WS3 can start immediately. WS5 depends on WS3 (Product MCP needs the path configuration pattern). Agent updates happen after WS5 ships.

---

## Task List

- [ ] 1. MCP Path Configuration (WS3)

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada (Application MCP) + Lina (indexer wiring)

  - Application MCP: accept explicit env vars for all data sources — `COMPONENTS_DIR`, `TOKEN_INDEX_DIR` (conditional on Spec 096), `GUIDANCE_DIR`, `PATTERNS_DIR`, `TEMPLATES_DIR`, `REGISTRY_PATH`
  - Remove hardcoded `../../..` path derivation in `ComponentIndexer` — use explicit paths passed from CLI
  - Docs MCP: `MCP_STEERING_DIR` already works — no changes needed
  - Product MCP: `PRODUCT_DIR` env var (implemented in Task 2)
  - Update CLI `mcp:app` to pass all resolved paths as env vars
  - Backward compatible: when env vars aren't set, derive from package root (same as today)
  - Tests: Application MCP starts with explicit paths, starts with default paths, all indexers use provided paths
  - _Requirements: R8 AC 1-6_

---

- [ ] 2. Product MCP Server (WS5)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Cross-agent (Ada for server scaffold, Lina for indexer patterns)

  **Success Criteria:**
  - `npx designerpunk mcp:product` starts the server
  - Product overview, experience map, domain objects, and templates queryable
  - Screen specs support platform branching with `shared` + platform keys
  - One-off component schemas served inline with screen specs
  - Health check and rebuild index tools work
  - Empty product directory starts without error

  **Primary Artifacts:**
  - `product-mcp-server/` — new MCP server
  - CLI `mcp:product` command

  **Completion Documentation:**
  - Detailed: `.kiro/specs/081-product-mcp-design/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/081-product-mcp-design/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Product MCP Server"`
  - Verify on GitHub

  - [ ] 2.1 Server scaffold and CLI command
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Create `product-mcp-server/src/` directory structure (mirroring Application MCP pattern)
    - Create `ProductMCPServer` class with MCP protocol setup
    - Add `mcp:product` subcommand to CLI — resolves product data directory from `PRODUCT_DIR` env var, config, or `./product/` default
    - Print connection details on startup
    - Start with empty data when no product directory exists (warning, not error)
    - _Requirements: R1 AC 1-3_

  - [x] 2.2 Product data indexer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Index `overview.yaml` → product context and config
    - Index `principles/` → design direction and cross-platform strategy (markdown, searchable)
    - Index `experience-map/` → verticals, flows, feature pages. Support single-file and multi-file specs. Assemble multi-file into one entry.
    - Index `templates/` → product layout and content patterns
    - Index `domain-objects/` → product entities with bidirectional screen cross-references
    - Index `components/` → one-off component schemas and contracts (Stemma subset)
    - Parse platform branching (`shared` + `ios`/`android`/`web` keys) within any facet
    - Parse status per platform including blocked reason strings
    - Parse spec status (Leo's addition: `spec: complete` alongside platform statuses)
    - Handle malformed YAML: skip bad files, log error with path, continue indexing
    - _Requirements: R3 AC 1-6, R4 AC 1-2, R5 AC 1-2, R6 AC 1-4, R7 AC 1-4_

  - [ ] 2.3 Query tools
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - `get_product_overview` — returns product context, config, principles
    - `list_experience_map` — returns all entries with type, name, spec status, per-platform status
    - `get_screen_spec` — returns full spec for a screen. Optional platform filter (returns `shared` + requested platform). Systems Components returned as name references. One-off components returned with schema + contracts inline.
    - `get_domain_object` — returns object definition + list of screens that reference it
    - `list_product_templates` — returns all templates with name and description
    - `get_product_health` — returns index status, data counts (screens, domain objects, templates, one-off components), last index time, warnings
    - `rebuild_product_index` — re-indexes all product data, returns new health status
    - Test: unknown one-off component referenced in UI tree → return spec with warning noting unresolved reference (Stacy's addition)
    - _Requirements: R1 AC 4-6, R2 AC 1-3, R3 AC 1-6, R4 AC 1-2, R5 AC 1-2_

  - [x] 2.4 Bundle and package integration
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Bundle Product MCP server with esbuild (same pattern as Application MCP and Docs MCP bundles in `dist/mcp/`)
    - Add `dist/mcp/product-mcp.js` to package `files` field
    - Update CLI `mcp:product` to spawn the bundled server
    - Verify `npm pack` includes the Product MCP bundle
    - _Requirements: R1 AC 1-2_

  - [ ] 2.5 Integration test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create test product data directory with: overview, principles, one vertical, one flow, one feature page, one domain object, one template, one one-off component
    - Include platform branching in at least one screen spec
    - Include blocked status with reason on at least one platform
    - Include multi-file spec for at least one screen
    - Start Product MCP, run all query tools, verify responses match expected data
    - Verify health check returns correct counts
    - Verify rebuild index works
    - Verify empty product directory starts cleanly
    - _Requirements: R1-R7 (integration validation)_

---

- [ ] 3. Agent Reframing and Integration Guide

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  - Update Ada, Lina, Thurgood prompts: "governs all [tokens/components/tests] in the repo — ecosystem and product-created"
  - Add governance gradient principle to all agent prompts: "governance weight scales with blast radius... when in doubt, consult the specialist"
  - Update Integration Guide with:
    - `npx designerpunk mcp:product` startup documentation
    - Product data directory structure with examples
    - Screen spec authoring guide (single-file, multi-file, platform branching)
    - One-off component metadata requirements (Stemma subset)
    - Governance gradient table (ecosystem / product-extending / product-internal) with examples per artifact type
    - Promotion path documentation (product artifact → ecosystem artifact)
  - Update product agent template prompts to reference Product MCP queries
  - _Requirements: R9 AC 1-5, R10 AC 1-5_

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Agent Reframing and Integration Guide"`
  - Verify on GitHub
