# Implementation Plan: Product Tokens — Source Format & MCP Discoverability

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Status**: Implementation Planning
**Dependencies**: None

---

## Implementation Plan

Implementation follows a bottom-up approach: resolver first (foundation), then indexer (parsing + validation), then server integration (tool + health), then documentation (governance + steering updates).

---

## Task List

- [x] 1. Token Reference Resolver

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - TokenRefResolver loads all three token-index files correctly
  - Primitive refs resolve to value + unitType (full depth)
  - Semantic refs resolve through chain to primitive value (full depth for single-key, partial for multi-key)
  - Component refs resolve through primitiveReferences (full for primitive names, partial for literals)
  - Missing refs return null gracefully
  - Missing token-index directory handled without crash
  
  **Primary Artifacts:**
  - `product-mcp-server/src/indexer/TokenRefResolver.ts`
  - `product-mcp-server/src/indexer/__tests__/TokenRefResolver.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/108-product-tokens-source-format/completion/task-1-completion.md`
  - Summary: `docs/specs/108-product-tokens-source-format/task-1-summary.md`

  - [x] 1.1 Implement TokenRefResolver class
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina + Ada (cross-domain: Lina owns Product MCP implementation, Ada owns token-index structure knowledge)
    - Create `product-mcp-server/src/indexer/TokenRefResolver.ts`
    - Implement `load()` to read primitives.yaml, semantics.yaml, components.yaml into maps
    - Implement `resolve(name)` with the four-path resolution strategy (primitive direct, semantic chain, component chain, component literal)
    - Implement `extractPrimaryRef()` heuristic (single-key → use it, multi-key → null)
    - Implement `inferUnitType()` with the full family mapping table
    - Handle missing token-index directory gracefully (no crash, resolver returns null for all)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 1.2 Write TokenRefResolver tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/__tests__/TokenRefResolver.test.ts`
    - Test primitive resolution (value + family → unitType)
    - Test semantic single-key resolution (chase to primitive)
    - Test semantic multi-key resolution (partial depth)
    - Test component resolution via primitive name (chase)
    - Test component resolution via literal value (partial depth)
    - Test missing ref returns null
    - Test missing token-index directory returns null for all
    - Test resolver reload (call load() again, picks up changes)
    - Create minimal test fixtures for token-index files
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [x] 2. Product Token Indexer

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - YAML files in `product/tokens/` are parsed and validated per all Req 1 ACs
  - Per-token error isolation works (one bad token doesn't invalidate siblings)
  - Validation errors and warnings are correctly categorized
  - Tokens with errors excluded from queries; tokens with warnings included
  - Health reporting provides accurate counts and messages
  
  **Primary Artifacts:**
  - `product-mcp-server/src/indexer/ProductTokenIndexer.ts`
  - `product-mcp-server/src/indexer/__tests__/ProductTokenIndexer.test.ts`
  - `product-mcp-server/src/models.ts` (updated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/108-product-tokens-source-format/completion/task-2-completion.md`
  - Summary: `docs/specs/108-product-tokens-source-format/task-2-summary.md`

  - [x] 2.1 Add interfaces to models.ts
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Add `ProductTokenEntry`, `ProductTokenCategory`, `ProductTokenHealth` interfaces to `product-mcp-server/src/models.ts`
    - _Requirements: 4.8, 5.1_

  - [x] 2.2 Implement ProductTokenIndexer class
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/ProductTokenIndexer.ts`
    - Implement `index(tokensDir)`: scan for *.yaml, validate filenames, parse entries, validate per-token, resolve refs
    - Implement category-level validation (filename chars, category field match)
    - Implement token-level validation (value XOR ref, unitType, rationale, camelCase, platform-limited unitType, color governance)
    - Implement per-token error isolation (valid siblings remain indexed)
    - Implement `query(filters)` with category/name/platform filtering (conjunctive)
    - Implement `getHealth()` returning ProductTokenHealth
    - Wire TokenRefResolver (instantiate in constructor, reload on index)
    - _Requirements: 1.1–1.11, 2.1–2.7, 4.2–4.7_

  - [x] 2.3 Write ProductTokenIndexer tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/__tests__/ProductTokenIndexer.test.ts`
    - Create test fixtures: `layout.yaml` (valid), `motion.yaml` (valid), `invalid.yaml` (various errors)
    - Test: valid tokens parsed correctly with all fields
    - Test: value token requires unitType, description, rationale
    - Test: ref token requires only description
    - Test: both value and ref → error
    - Test: neither value nor ref → error
    - Test: invalid filename → error (uppercase, digits, spaces)
    - Test: category field mismatch → error
    - Test: platform-limited unitType with incompatible platforms → error
    - Test: invalid camelCase → error with helpful message
    - Test: per-token isolation (valid sibling survives)
    - Test: query filtering (category, name, platform, conjunctive)
    - Test: empty results return empty categories array
    - Test: health reporting counts and messages
    - Test: re-index clears stale data
    - _Requirements: 1.1–1.11, 2.1–2.7, 4.2–4.10, 5.1–5.4_

- [x] 3. Server Integration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `get_product_tokens` tool registered and functional with all filter parameters
  - Response shape matches canonical definition (all fields present)
  - Health reporting includes productTokens section
  - Integration test passes end-to-end (YAML → index → query → response)
  
  **Primary Artifacts:**
  - `product-mcp-server/src/index.ts` (updated)
  - `product-mcp-server/src/indexer/ProductIndexer.ts` (updated)
  - `product-mcp-server/src/__tests__/Spec108-ProductTokens.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/108-product-tokens-source-format/completion/task-3-completion.md`
  - Summary: `docs/specs/108-product-tokens-source-format/task-3-summary.md`

  - [x] 3.1 Integrate ProductTokenIndexer into ProductIndexer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `productTokenIndexer` field to ProductIndexer
    - Add `indexTokens()` call in `index()` method (after other content)
    - Add `getProductTokens(filters)` getter
    - Add `getProductTokenHealth()` getter
    - Pass `tokenIndexDir` through for resolver initialization
    - _Requirements: 2.1, 2.6, 2.7_

  - [x] 3.2 Register get_product_tokens tool and wire handlers
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `get_product_tokens` to tools array in `product-mcp-server/src/index.ts`
    - Add handler case in `handleTool()` delegating to `this.indexer.getProductTokens(params)`
    - Add productTokens to `get_product_health` response
    - _Requirements: 4.1, 4.9, 5.1–5.4_

  - [x] 3.3 Write integration test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/__tests__/Spec108-ProductTokens.test.ts`
    - Test end-to-end: fixture YAML → ProductIndexer.index() → get_product_tokens query → validate response shape
    - Test all filter combinations
    - Test health reporting with valid and invalid tokens
    - Test response includes resolvedValue, resolvedUnitType, resolutionDepth for ref tokens
    - Test warnings array populated for unresolved refs
    - _Requirements: 3.1–3.7, 4.1–4.10, 5.1–5.4_

- [ ] 4. Governance Documentation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Product Token Governance steering doc exists with all Req 7 ACs covered
  - MCP Relationship Model updated with product token terminology and philosophy
  - Product agent configs reference the governance doc
  - Documentation is clear, actionable, and includes worked examples
  
  **Primary Artifacts:**
  - `.kiro/steering/Product-Token-Governance.md`
  - `.kiro/steering/MCP-Relationship-Model.md` (updated)
  - `.kiro/agents/leonardo.json` (updated)
  - `.kiro/agents/sparky.json` (updated)
  - `.kiro/agents/kenya.json` (updated)
  - `.kiro/agents/data.json` (updated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/108-product-tokens-source-format/completion/task-4-completion.md`
  - Summary: `docs/specs/108-product-tokens-source-format/task-4-summary.md`

  - [ ] 4.1 Create Product Token Governance steering doc
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Create `.kiro/steering/Product-Token-Governance.md` with proper metadata
    - Include: design philosophy, scope model, litmus test, authoring workflow
    - Include: naming conventions (camelCase, acronyms as words, category naming)
    - Include: color governance (two-gate justification with worked examples)
    - Include: promotion signal definition (multiple verticals, same need)
    - Include: 2-3 example rationales at expected quality bar
    - Include: what NOT to tokenize guidance
    - Include: single-value principle with usage field guidance
    - _Requirements: 7.1–7.10_

  - [ ] 4.2 Update MCP Relationship Model
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Replace "brand tokens (TBD)" with "product tokens" in Content Types section
    - Add Product MCP design philosophy paragraph
    - Clarify "cross-product" means cross-vertical in Promotion Path
    - Add scope model: product token (one vertical) → system token (all verticals), component tokens orthogonal
    - _Requirements: 6.1–6.4_

  - [ ] 4.3 Update product agent configurations
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Add Product-Token-Governance.md reference to `.kiro/agents/leonardo.json`
    - Add Product-Token-Governance.md reference to `.kiro/agents/sparky.json`
    - Add Product-Token-Governance.md reference to `.kiro/agents/kenya.json`
    - Add Product-Token-Governance.md reference to `.kiro/agents/data.json`
    - _Requirements: 7.11_
