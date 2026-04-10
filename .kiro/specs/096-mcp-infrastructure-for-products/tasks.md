# Implementation Plan: Token Data Index

**Date**: 2026-04-10
**Spec**: 096 - Token Data Index
**Status**: Implementation Planning
**Dependencies**: Spec 094 (complete), Spec 095 (complete)

---

## Implementation Sequence

Three tasks, sequential:

1. **Index generation** — build-time script that produces the three YAML files (Ada)
2. **Application MCP query tools** — load index, serve four query tools (Ada + Lina)
3. **Integration and documentation** — package inclusion, Integration Guide, agent updates (Thurgood)

---

## Task List

- [x] 1. Token Index Generation Script

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada

  - Create `scripts/generate-token-index.ts` (or integrate into existing generation pipeline)
  - Walk primitive token sources (`src/tokens/*.ts`) — extract name, family, value, formula
  - Walk semantic token sources (`src/tokens/semantic/*.ts`) — extract name, category, primitive references
  - Query ThemeRegistry for theme-varying token set — mark semantics overridden in any registered theme
  - Walk component token files (`src/components/core/*/*.tokens.ts`) — extract name, component, references
  - Walk component `schema.yaml` `tokens:` sections — extract consumer relationships
  - Generate platform-specific names using platform naming conventions (CSS, Swift, Kotlin)
  - Write `token-index/primitives.yaml`, `semantics.yaml`, `components.yaml`
  - Integrate into `npx designerpunk generate` — index regenerates alongside platform outputs
  - Tests: verify all primitive families present, semantic theme-varying status correct, consumer relationships match schemas, platform names match generated output conventions
  - _Requirements: R1 AC 1-6_

---

- [ ] 2. Application MCP Token Query Tools

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (tools) + Lina (indexer integration)

  **Success Criteria:**
  - Four token query tools operational
  - Token index loaded at startup
  - Missing index directory handled gracefully
  - All existing MCP tests pass

  **Completion Documentation:**
  - Detailed: `.kiro/specs/096-mcp-infrastructure-for-products/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/096-mcp-infrastructure-for-products/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Token Query Tools"`
  - Verify on GitHub

  - [x] 2.1 Token indexer module
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `application-mcp-server/src/indexer/TokenIndexer.ts`
    - Load three YAML files from configurable `TOKEN_INDEX_DIR` path
    - Parse into searchable maps (by name, family, tier)
    - Handle missing directory gracefully (empty data, warning)
    - Handle malformed YAML (skip bad file, log error, load other tiers)
    - _Requirements: R2 AC 5-6_

  - [ ] 2.2 Query tools
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - `search_tokens` — filter by family, tier, name (all optional, combinable)
    - `get_token_details` — full entry by name (value, family, tier, platforms, formula, theme-varying, consumers)
    - `get_token_family` — all tokens in a family across tiers
    - `get_token_consumers` — components referencing a token with context
    - Register tools in Application MCP server alongside existing component tools
    - Tests: search by family, search by tier, exact name match, details with consumers, family listing, consumer lookup, missing token, missing family, empty index
    - _Requirements: R2 AC 1-4_

  - [x] 2.3 Rebuild and health integration
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Update `get_component_health` to include token index counts (primitives, semantics, component tokens)
    - Update `rebuild_index` to re-load token index alongside component index
    - _Requirements: R2 AC 5_

---

- [ ] 3. Integration, Packaging, and Documentation

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  - Add `token-index/` to package `files` field
  - Update Integration Guide: document four token query tools with parameters and example responses
  - Update Integration Guide: note that token index generates as part of `npx designerpunk generate`
  - Update Application MCP query reference table with token tools
  - Update agent prompts: Ada, Leo, platform agents aware of token query capabilities
  - Update product agent templates with token query references
  - Verify `npm pack` includes `token-index/`
  - _Requirements: R3 AC 1-2, R4 AC 1-2_

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Token Index Integration and Documentation"`
  - Verify on GitHub
