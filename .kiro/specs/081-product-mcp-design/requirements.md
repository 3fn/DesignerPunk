# Requirements Document: Product MCP Design

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Status**: Requirements Phase
**Dependencies**: Spec 094 (complete), Spec 095 (complete), Spec 096 (independent)

---

## Introduction

The Product MCP is the third MCP server in the DesignerPunk ecosystem. It serves product architecture — screen specs, user flows, domain objects, product templates, and design direction. It ships with `@designerpunk/core` as ecosystem infrastructure that products configure.

This spec also covers WS3 (MCP path configuration for all three servers) and the agent reframing (system agents serve the repo, not just DesignerPunk).

---

## Requirements

### Requirement 1: Product MCP Server

**User Story**: As a product developer, I want a Product MCP server so that product architecture is queryable structured data, not documents.

#### Acceptance Criteria

1. WHEN `npx designerpunk mcp:product` is run THEN the Product MCP server SHALL start and print connection details
2. WHEN the Product MCP starts THEN it SHALL index product data from the configured product data directory
3. WHEN no product data directory exists THEN the Product MCP SHALL start with empty data (no error)
4. WHEN the Product MCP is queried THEN it SHALL serve product overview, experience map, domain objects, and product templates
5. WHEN `get_product_health` is queried THEN it SHALL return index status, data counts (screens, domain objects, templates), last index time, and any warnings
6. WHEN `rebuild_product_index` is called THEN it SHALL re-index all product data and return the new health status

---

### Requirement 2: Product Overview

**User Story**: As a product architect, I want to query the product's context, configuration, and principles so that all agents understand what we're building and why.

#### Acceptance Criteria

1. WHEN `get_product_overview` is queried THEN it SHALL return product context, configuration (name, platforms, theme, abbreviation), and principles
2. WHEN product principles include design direction THEN it SHALL be returned as indexed, searchable content
3. WHEN product principles include cross-platform strategy THEN it SHALL be returned as indexed, searchable content

---

### Requirement 3: Experience Map

**User Story**: As a product architect, I want to define and query verticals, flows, and feature pages so that the product's screen architecture is structured and navigable.

#### Acceptance Criteria

1. WHEN `list_experience_map` is queried THEN it SHALL return all verticals, flows, and feature pages with their type, name, and per-platform status
2. WHEN `get_screen_spec` is queried with a screen name THEN it SHALL return the full spec: UX direction, UI tree, data sources, analytics, status, state model, accessibility
3. WHEN a screen spec has platform-specific branches THEN `get_screen_spec` SHALL return `shared` content plus the platform-specific content for all platforms (or a requested platform)
4. WHEN a screen spec references Systems Components THEN the Product MCP SHALL return the component name as a reference. The agent resolves component details from the Application MCP.
5. WHEN a screen spec references One-off Components THEN the Product MCP SHALL return their lightweight schema and any contracts inline
6. WHEN a screen's status is queried THEN it SHALL return `not-started`, `in-progress`, `complete`, or `blocked` per platform. WHEN status is `blocked` THEN it SHALL include a reason string.

---

### Requirement 4: Domain Objects

**User Story**: As a product architect, I want to define and query domain objects so that product entities are documented and cross-referenced with screens.

#### Acceptance Criteria

1. WHEN `get_domain_object` is queried with an object name THEN it SHALL return the object definition and a list of screens that reference it
2. WHEN a screen spec references a domain object THEN the cross-reference SHALL be bidirectional — queryable from both the screen and the object

---

### Requirement 5: Product Templates

**User Story**: As a product architect, I want to define and query product-specific layout and content patterns so that recurring arrangements are documented and reusable.

#### Acceptance Criteria

1. WHEN `list_product_templates` is queried THEN it SHALL return all product templates with name and description
2. WHEN a product template is queried by name THEN it SHALL return the full template definition (page layout or content layout pattern)

---

### Requirement 6: One-off Component Metadata

**User Story**: As a platform engineer, I want one-off components to have schemas and contracts so that I know what to build and what accessibility behavior to implement.

#### Acceptance Criteria

1. WHEN a one-off component is defined in the product data THEN it SHALL have a structured schema (subset of Stemma format): props with types and defaults, token references, composed-from list with slot/role mapping (how Systems Components are arranged), and a purpose description. This schema serves as the one-off's queryable metadata in the Product MCP. NOT required: inheritance, composition rules for others to compose it, readiness tracking, family membership, component-meta.yaml, full 10-category contract taxonomy.
2. WHEN a one-off component introduces accessibility-relevant behavior not covered by its composed Systems Components THEN it SHALL have accessibility contracts following the ecosystem contract format
3. WHEN a one-off component references tokens THEN it SHALL use semantic tokens governed by the same token governance as ecosystem components (with governance gradient — lighter enforcement for product-scoped artifacts)
4. WHEN a one-off component is NOT required to have: family membership, full README, readiness tracking, three-platform review, component-meta.yaml, inheritance declarations, or composition rules for other components

---

### Requirement 7: Product Data Directory Structure

**User Story**: As a product developer, I want a clear directory structure for product data so that the Product MCP can discover and index it.

#### Acceptance Criteria

1. WHEN a product data directory is configured THEN it SHALL follow a nested structure mirroring the Product MCP architecture (overview, principles, experience-map, templates, domain-objects, components)
2. WHEN a screen spec is a single YAML file THEN the Product MCP SHALL index it as a complete spec
3. WHEN a screen spec is split across multiple YAML files in a directory THEN the Product MCP SHALL assemble them into one response
4. WHEN platform-specific branches exist in a spec THEN they SHALL use `shared` + platform keys (`ios`, `android`, `web`) within any facet

---

### Requirement 8: MCP Path Configuration (WS3)

**User Story**: As a product developer, I want all three MCP servers to accept explicit data paths so that I can control where each server finds its data.

#### Acceptance Criteria

1. WHEN the Application MCP starts THEN it SHALL accept explicit paths for: components, token index (conditional on Spec 096), family guidance, basic assembly guidance (experience patterns), basic layout templates, family registry
2. WHEN the Application MCP starts without explicit paths THEN it SHALL derive paths from the package root (backward compatible)
3. WHEN the Docs MCP starts THEN it SHALL continue accepting `MCP_STEERING_DIR` (unchanged)
4. WHEN the Product MCP starts THEN it SHALL accept a product data directory path
5. WHEN the CLI starts any MCP server THEN it SHALL resolve paths from the package root and pass them to the server
6. WHEN a product overrides paths via env vars or config THEN the override SHALL take precedence over derived paths

---

### Requirement 9: Agent Reframing

**User Story**: As a product team, I want system agents to serve the entire repo so that there's no confusion about whether a token or component is "ecosystem" or "product."

#### Acceptance Criteria

1. WHEN agent prompts are updated THEN Ada's prompt SHALL state she governs all tokens in the repo — ecosystem and product-created
2. WHEN agent prompts are updated THEN Lina's prompt SHALL state she governs all components in the repo — ecosystem and product-created
3. WHEN agent prompts are updated THEN Thurgood's prompt SHALL state he governs all tests and specs in the repo
4. WHEN agent prompts describe governance THEN they SHALL include the principle: "governance weight scales with blast radius — ecosystem artifacts that affect all products get full review; product-specific artifacts that affect only this product get lighter review. When in doubt, consult the specialist."
5. WHEN the Integration Guide is updated THEN it SHALL include a detailed governance gradient table by artifact type

---

### Requirement 10: Integration Guide Contribution

**User Story**: As a product developer, I want the Integration Guide to document Product MCP setup so that I can configure and use it.

#### Acceptance Criteria

1. WHEN the Integration Guide is updated THEN it SHALL document `npx designerpunk mcp:product` startup
2. WHEN the Integration Guide is updated THEN it SHALL document the product data directory structure with examples
3. WHEN the Integration Guide is updated THEN it SHALL document how to write screen specs (single-file and multi-file, with platform branching)
4. WHEN the Integration Guide is updated THEN it SHALL document one-off component metadata requirements
5. WHEN the Integration Guide is updated THEN it SHALL document the governance gradient for product artifacts

---

## Documentation Requirements

1. Integration Guide contribution (Requirement 10)
2. Product data directory README with schema documentation
3. Example screen spec (single-file and multi-file)
4. Agent prompt updates (Requirement 9)

**Waiver**: No component README or token family documentation changes — this spec modifies MCP infrastructure and agent configuration, not components or tokens.

---

## Deferred Items

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| Dedicated MCP & Documentation Agent (9th agent) | Ships with the Product MCP. Cross-cutting view across all three MCPs. | Product MCP ships |
| Experience pattern review (9 ecosystem patterns) | Review each individually to confirm it's an assembly recipe. | Before Product MCP ships |
| Leo's wish list features (screen↔component lookup, state models, gap detection) | Foundation only in Phase 1. Features grow from real usage. | M0b |
| Product primitives full schema (objects, surfaces, intent signals) | Minimal in Phase 1. Full schema after Phase 2 validates the model. | M0b |
| Cross-MCP reference validation | Validate that screen spec references resolve against Application MCP. | After Product MCP is stable |
