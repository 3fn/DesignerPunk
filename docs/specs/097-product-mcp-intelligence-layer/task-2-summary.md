# Task 2 Summary: Reverse Indexes, Gap Detection & New Tools

**Date**: 2026-04-23
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 097-product-mcp-intelligence-layer

## What Was Done

Built the intelligence layer for the Product MCP: three reverse indexes (component→screens, token→screens, domainObject→screens), gap detection against the component catalog, 5 new query tools, enriched experience map, and platform-aware filtering. Fixed a latent bug in one-off enrichment for branched UI trees.

## Why It Matters

Agents can now perform impact analysis ("which screens use Button-CTA?"), discover screens by any dimension (component, token, status, context), query state models without full specs, find principles by keyword, and get immediate visibility into component gaps. This transforms the Product MCP from exact-name-only queries to intelligence infrastructure.

## Key Changes

- `product-mcp-server/src/indexer/ReverseIndexBuilder.ts` — component/token/domain object reverse indexes
- `product-mcp-server/src/indexer/GapDetector.ts` — validates UI tree component refs against catalog
- `product-mcp-server/src/query/ScreenQuery.ts` — `find_screens` with 6 conjunctive filter params
- `product-mcp-server/src/query/ExperienceMapQuery.ts` — enriched `list_experience_map` with filtering
- `product-mcp-server/src/indexer/ProductIndexer.ts` — walkUiTree wiring, enriched map, template cross-refs
- `product-mcp-server/src/index.ts` — 5 new tools, 2 updated tools, COMPONENT_DIR env var, v0.2.0
- 6 new test files, 73 new tests (85 total across 7 suites)

## Impact

- 12 tools total (7 existing + 5 new: find_screens, get_product_component, get_screen_state_model, find_principles, find_templates)
- `list_experience_map` now returns enriched entries with referencedComponents, blockedReasons, and supports filtering
- `get_screen_spec` now includes `_componentGaps` for unmatched components
- `get_product_health` now includes reverse index sizes, gap counts, and catalog size
- Platform filtering is now platform-aware — web agents don't see iOS-only warnings
