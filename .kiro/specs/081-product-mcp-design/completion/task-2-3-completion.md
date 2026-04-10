# Task 2.3 Completion: Query Tools

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Task**: 2.3 - Query tools
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Implemented the query tool logic for the Product MCP server, building on Lina's indexer (Task 2.2).

### Platform Filtering (`get_screen_spec`)

When a `platform` parameter is provided (e.g., `"ios"`), the response merges `shared` content with the requested platform's content for each facet:
- Array facets (state-model, data-sources): concatenates shared + platform arrays
- Object facets (accessibility): merges shared + platform objects
- When no platform data exists for a facet: returns shared only
- When no platform filter: returns the full spec with all platform branches

### One-off Component Enrichment

When a screen spec's UI tree references a one-off component (defined in `product/components/`), the response includes the component's schema and contracts inline as `_oneOffSchema`. Systems Components (from the Application MCP) are left as name references — no cross-MCP enrichment.

### Unresolved Reference Warnings

When a UI tree references a lowercase-hyphenated component name that isn't found in the one-off component index, a warning is added to `_warnings`. This catches typos and missing component definitions without failing the query. Systems Components (PascalCase-Hyphenated like `Button-CTA`) are not flagged — they're resolved by the agent from the Application MCP.

### Tool Summary

| Tool | Status | Notes |
|------|--------|-------|
| `get_product_overview` | ✅ Working | Returns overview + principles |
| `list_experience_map` | ✅ Working | Returns all entries with type, name, status |
| `get_screen_spec` | ✅ Enhanced | Platform filter + one-off enrichment + warnings |
| `get_domain_object` | ✅ Working | Returns object + bidirectional screen refs |
| `list_product_templates` | ✅ Working | Returns all templates |
| `get_product_health` | ✅ Working | Returns counts including one-off components |
| `rebuild_product_index` | ✅ Working | Re-indexes and returns health |

---

## Validation

- Full test suite: 319 suites, 8204 tests, all passing
- Integration testing deferred to Task 2.5 (with test product data)

---

## Artifacts Modified

1. `product-mcp-server/src/index.ts` — added `resolveScreenSpec`, `filterPlatform`, `enrichOneOffs`; wired into `get_screen_spec` handler

---

## Requirements Traced

- R1 AC 4: Product MCP serves overview, experience map, domain objects, templates ✅
- R3 AC 2: `get_screen_spec` returns full spec with platform branching ✅
- R3 AC 3: Platform filter returns shared + requested platform ✅
- R3 AC 5: One-off components returned with schema + contracts inline ✅
- R4 AC 1: `get_domain_object` returns definition + screen cross-references ✅
