# Requirements Document: Product MCP Intelligence Layer

**Date**: 2026-04-23
**Spec**: 097 - Product MCP Intelligence Layer
**Status**: Requirements Phase
**Dependencies**: Spec 081 (Product MCP — ✅ Complete), Spec 096 (Token Data Index — ✅ Complete)

---

## Introduction

The Product MCP (Spec 081) serves product architecture as queryable structured data. It supports exact-name queries for screen specs, domain objects, and templates. This spec upgrades it to intelligence infrastructure — discovery, impact analysis, reverse lookups, state model extraction, gap detection, and enriched queries.

The core architectural constraint is the cross-MCP boundary: the Product MCP references Application MCP entities by name, never by runtime server call. Gap detection reads `component-meta.yaml` files from disk at index time.

---

## Requirements

### Requirement 1: Screen Discovery

**User Story**: As a product agent (Leonardo), I want to find screens by component usage, token usage, domain object usage, status, or context, so that I can perform impact analysis when components or tokens change.

#### Acceptance Criteria

1. WHEN `find_screens` is called with `usesComponent` THEN the system SHALL return all screens whose UI tree references that component name.
2. WHEN `find_screens` is called with `usesToken` THEN the system SHALL return all screens whose UI tree `tokens:` blocks reference that token name.
3. WHEN `find_screens` is called with `usesDomainObject` THEN the system SHALL return all screens that reference that domain object.
4. WHEN `find_screens` is called with `status` and `platform` THEN the system SHALL return screens matching that status on that platform.
5. WHEN `find_screens` is called with `context` THEN the system SHALL return screens whose `type`, `name`, or `tags` array contains a match for the context string.
6. WHEN `find_screens` is called with multiple filter params THEN the system SHALL return screens matching ALL filters (conjunctive).
7. WHEN `find_screens` is called with no params THEN the system SHALL return all screens.
8. WHEN no screens match the filters THEN the system SHALL return an empty array, not an error.

### Requirement 2: Reverse Index Construction

**User Story**: As the Product MCP indexer, I want to build reverse indexes at index time, so that discovery queries execute without traversing every screen spec per request.

#### Acceptance Criteria

1. WHEN the indexer processes a screen spec THEN the system SHALL traverse the UI tree and record every component name in a component→screens reverse index.
2. WHEN the indexer processes a screen spec THEN the system SHALL extract every token name from `tokens:` blocks in the UI tree and record them in a token→screens reverse index.
3. WHEN the indexer processes a screen spec THEN the system SHALL record every domain object reference in a domainObject→screens reverse index.
4. WHEN `rebuild_product_index` is called THEN the system SHALL rebuild all reverse indexes from scratch.
5. WHEN a component appears in multiple screens THEN the reverse index entry for that component SHALL list all screens.

### Requirement 3: Token Extraction from UI Trees

**User Story**: As a product agent, I want token references in screen specs to be extractable and queryable, so that I can assess impact when tokens change.

#### Acceptance Criteria

1. WHEN a UI tree node contains a `tokens:` block THEN the indexer SHALL extract all token names from that block.
2. WHEN token names use dot-notation (e.g., `color.surface.primary`) THEN the indexer SHALL store them as-is without transformation.
3. WHEN a UI tree node has no `tokens:` block THEN the indexer SHALL not extract token references from `props:` or other fields.
4. WHEN a UI tree has nested children THEN the indexer SHALL recursively extract tokens from all levels.

### Requirement 4: One-off Component Direct Query

**User Story**: As a platform agent (Kenya, Data, Sparky), I want to query a product-specific component directly by name, so that I can understand its schema and contracts without fetching a full screen spec.

#### Acceptance Criteria

1. WHEN `get_product_component` is called with a valid one-off component name THEN the system SHALL return the component's schema, contracts, and composition details.
2. WHEN `get_product_component` is called with a name that doesn't match any one-off component THEN the system SHALL return an error indicating the component was not found.
3. The `get_product_component` response SHALL NOT require fetching or parsing a screen spec.

### Requirement 5: State Model Extraction

**User Story**: As a platform agent, I want to query just the state model of a screen (data sources, states, actions, transitions), so that I can understand what drives the screen without parsing the full spec.

#### Acceptance Criteria

1. WHEN `get_screen_state_model` is called with a valid screen name THEN the system SHALL return the `state-model` (or `stateModel`) section from that screen's spec as-is, without restructuring.
2. WHEN `get_screen_state_model` is called with a screen that has no `state-model` section THEN the system SHALL return an empty object, not an error.
3. WHEN `get_screen_state_model` is called with an invalid screen name THEN the system SHALL return an error indicating the screen was not found.
4. The response SHALL NOT include the UI tree, accessibility notes, UX direction, or analytics.

### Requirement 6: Experience Map Enrichment

**User Story**: As a product agent, I want the experience map to include component references, domain object references, and blocked reasons, so that I can triage and analyze impact without querying every screen individually.

#### Acceptance Criteria

1. WHEN `list_experience_map` is called THEN each entry SHALL include `referencedComponents` (component names from UI tree), `referencedDomainObjects` (domain object names), and `blockedReasons` (per-platform blocked reasons if status is blocked).
2. WHEN `list_experience_map` is called with `status` THEN the system SHALL return only screens matching that status.
3. WHEN `list_experience_map` is called with `platform` THEN the system SHALL return only screens with entries for that platform.
4. WHEN `list_experience_map` is called with `usesComponent` THEN the system SHALL return only screens whose UI tree references that component.
5. WHEN `list_experience_map` is called with `usesDomainObject` THEN the system SHALL return only screens referencing that domain object.
6. WHEN `list_experience_map` is called with `usesToken` THEN the system SHALL return only screens whose UI tree `tokens:` blocks reference that token.

### Requirement 7: Template Cross-References

**User Story**: As a product agent, I want to find templates by category or by which screen uses them, so that I can understand template usage patterns across the product.

#### Acceptance Criteria

1. WHEN a screen spec includes a `template:` field THEN the indexer SHALL record the screen→template relationship.
2. WHEN `find_templates` is called with `usedBy` THEN the system SHALL return templates referenced by that screen.
3. WHEN `find_templates` is called with `category` THEN the system SHALL return templates matching that category.
4. WHEN a template is queried THEN the response SHALL include a `usedBy` array listing all screens that reference it.

### Requirement 8: Principles as Structured Data

**User Story**: As a product agent, I want to find design principles by keyword, so that I can apply relevant principles when designing or reviewing screens.

#### Acceptance Criteria

1. WHEN a principle file has YAML frontmatter with `keywords` THEN the indexer SHALL parse and index those keywords.
2. WHEN `find_principles` is called with a keyword THEN the system SHALL return all principles whose `keywords` array includes that keyword.
3. WHEN `find_principles` matches a principle THEN the response SHALL include the principle's `name`, `keywords`, and full markdown `content`.
4. WHEN a principle file has no YAML frontmatter THEN the indexer SHALL index it with an empty keywords array and log a warning.

### Requirement 9: Spec-to-Catalog Gap Detection

**User Story**: As a product agent, I want to know immediately when a screen spec references a component that doesn't exist or is scaffold-status, so that I can address gaps before implementation begins.

#### Acceptance Criteria

1. WHEN the indexer starts THEN the system SHALL read all `component-meta.yaml` files from the configurable component source directory (`COMPONENT_DIR` env var, defaulting to `src/components/core`) to build a catalog of known component names.
2. WHEN a UI tree references a component name that is not in the catalog AND not in the Product MCP's one-off components THEN the system SHALL flag it as `not-found`.
3. WHEN `get_screen_spec` is called THEN the response SHALL include a `_componentGaps` array listing all flagged components with their issue type and UI tree path.
4. WHEN `get_product_health` is called THEN the response SHALL include aggregate gap counts across all screens.
5. The system SHALL use exact string matching for component name validation — no fuzzy matching.
6. The system SHALL NOT make runtime calls to the Application MCP server. All catalog data SHALL be read from disk at index time.

### Requirement 10: Platform Filtering Fix

**User Story**: As a platform agent, I want platform filtering to produce platform-aware warnings, so that I don't see warnings about components or references that are irrelevant to my platform.

#### Acceptance Criteria

1. WHEN a screen spec is resolved with a platform filter THEN the system SHALL filter platform content first, then enrich one-off components, then generate warnings.
2. WHEN a one-off component is referenced only in a platform branch that doesn't match the requested platform THEN the system SHALL NOT warn about it.
3. WHEN a one-off component is referenced in the `shared` branch or the requested platform branch and is missing THEN the system SHALL warn about it.

### Requirement 11: Documentation

**User Story**: As a product agent, I want the Integration Guide to document all new Product MCP tools, so that I can discover and use them correctly.

#### Acceptance Criteria

1. The Integration Guide SHALL document all new tools (`find_screens`, `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates`) with parameter descriptions and example queries.
2. The Integration Guide SHALL document the `tokens:` block convention for screen spec UI trees.
3. The Integration Guide SHALL document the YAML frontmatter convention for principle files.
4. The Integration Guide SHALL document the `_componentGaps` field on screen spec responses.
