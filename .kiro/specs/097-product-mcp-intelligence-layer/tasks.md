# Implementation Plan: Product MCP Intelligence Layer

**Date**: 2026-04-23
**Spec**: 097 - Product MCP Intelligence Layer
**Status**: Implementation Planning
**Dependencies**: Spec 081 (Product MCP — ✅ Complete), Spec 096 (Token Data Index — ✅ Complete)

---

## Implementation Plan

Extract the current single-file Product MCP server into modules, build reverse indexes and gap detection during indexing, add 5 new query tools, enrich 2 existing tools, extend test fixtures, and document the UI tree convention in the Integration Guide.

Sequenced in three phases: foundation (module extraction + test infrastructure), intelligence (reverse indexes + new tools), and documentation (Integration Guide + reassessment).

---

## Task List

- [x] 1. Module Extraction & Test Infrastructure

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Current single-file server extracted into modular architecture (indexer/, query/, models.ts)
  - All existing 7 tools continue to work identically after extraction
  - Test infrastructure established for product-mcp-server with unit test capability
  - Test fixtures extended with tokens: blocks, tags, frontmatter, gap detection data

  **Primary Artifacts:**
  - `product-mcp-server/src/models.ts`
  - `product-mcp-server/src/indexer/ProductIndexer.ts`
  - `product-mcp-server/src/indexer/PrinciplesParser.ts`
  - `product-mcp-server/src/__tests__/`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/097-product-mcp-intelligence-layer/completion/task-1-completion.md`
  - Summary: `docs/specs/097-product-mcp-intelligence-layer/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Module Extraction & Test Infrastructure"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Create models.ts with shared types
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Create `product-mcp-server/src/models.ts`
    - Define `ScreenRef`, `DomainScreenRef`, `ReverseIndexes`, `ComponentGap`, `Principle`, `EnrichedMapEntry`, `ScreenFilter`, `HealthStatus` interfaces
    - _Requirements: 1, 2, 6, 8, 9_

  - [x] 1.2 Extract ProductIndexer from index.ts
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Lina
    - Extract `indexProductData()` and all indexing helpers into `product-mcp-server/src/indexer/ProductIndexer.ts`
    - Move data stores (screenSpecs, domainObjects, templates, oneOffComponents, experienceMap, overview) into ProductIndexer
    - Add `walkUiTree()` private method (placeholder — populates nothing yet, just traverses)
    - Expose getters for all data stores
    - Thin `index.ts` to server shell: creates ProductIndexer, registers tool handlers, dispatches
    - `resolveScreenSpec`, `filterPlatform`, and `enrichOneOffs` stay in `index.ts` (query-time response building, not indexing)
    - Verify all 7 existing tools work identically after extraction (run `ProductMCPIntegration.test.ts` before and after)
    - _Requirements: 2_

  - [x] 1.3 Create PrinciplesParser
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/PrinciplesParser.ts`
    - Parse YAML frontmatter from markdown files (split `---` delimited frontmatter from body)
    - Extract `name`, `keywords[]`, `content` per principle
    - Handle missing frontmatter: empty keywords, log warning
    - Integrate into ProductIndexer (replace current raw markdown loading)
    - _Requirements: 8_

  - [x] 1.4 Set up test infrastructure and extend fixtures
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Add jest config for `product-mcp-server/` (or confirm root jest config covers it)
    - Create static YAML test fixtures in `product-mcp-server/src/__tests__/fixtures/` for unit tests:
      - Screen specs with `tokens:` blocks (real token names: `color.structure.surface`, `color.action.primary`, `space.inset.normal`)
      - Screen spec with `tags: [civic, legislation]`
      - Screen spec with `template: card-grid`
      - Principle with YAML frontmatter (`keywords: [civic, dark-theme, engagement]`)
      - Domain objects (Bill, Representative)
      - Screen with `nonexistent-widget` component reference (gap detection)
      - Mock `component-meta.yaml` directory with Button-CTA, Container-Card-Base, Nav-Header-App, Container-Base, Chip-Filter entries
    - Extend root `createTestProductData()` in `src/__tests__/ProductMCPIntegration.test.ts` with same new fields (tokens: blocks, tags, frontmatter, gap detection component) for integration smoke test
    - _Requirements: 1, 2, 3, 8, 9_

- [ ] 2. Reverse Indexes, Gap Detection & New Tools

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Three reverse indexes (component→screens, token→screens, domainObject→screens) built during indexing
  - Gap detection validates component references against component-meta.yaml catalog
  - `find_screens` returns correct results for all 6 filter params
  - `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates` all functional
  - `list_experience_map` enriched with referencedComponents, blockedReasons, and supports all 6 filters
  - `get_screen_spec` includes `_componentGaps` on responses
  - Platform filtering produces platform-aware warnings

  **Primary Artifacts:**
  - `product-mcp-server/src/indexer/ReverseIndexBuilder.ts`
  - `product-mcp-server/src/indexer/GapDetector.ts`
  - `product-mcp-server/src/query/ScreenQuery.ts`
  - `product-mcp-server/src/query/ExperienceMapQuery.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/097-product-mcp-intelligence-layer/completion/task-2-completion.md`
  - Summary: `docs/specs/097-product-mcp-intelligence-layer/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Reverse Indexes, Gap Detection & New Tools"`
  - Verify: Check GitHub for committed changes

  - [ ] 2.1 Implement ReverseIndexBuilder
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/ReverseIndexBuilder.ts`
    - Implement `addComponent(screen, component, path)`, `addToken(screen, token, path)`, `addDomainObject(screen, domainObject)`
    - Implement `getIndexes()` returning `ReverseIndexes`
    - Implement `clear()` for rebuild
    - Write unit tests: verify index population, duplicate handling, clear behavior
    - _Requirements: 2_

  - [ ] 2.2 Implement GapDetector
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/indexer/GapDetector.ts`
    - Constructor takes `componentDir` and `oneOffNames: Set<string>`
    - `loadCatalog()` reads `component-meta.yaml` files, builds `Set<string>` of names
    - `check(componentName)` returns `'ok' | 'not-found'` via exact string match
    - Handle missing `COMPONENT_DIR`: log warning, empty catalog (all components pass)
    - Write unit tests with mock component-meta directory
    - _Requirements: 9_

  - [ ] 2.3 Wire walkUiTree with ReverseIndexBuilder and GapDetector
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Update `ProductIndexer.walkUiTree()` to call `reverseIndexBuilder.addComponent()` and `reverseIndexBuilder.addToken()` per node
    - Call `gapDetector.check()` per component node, store gaps per screen
    - Handle platform branching: traverse `shared` always, traverse platform branches when they contain node arrays
    - After tree walk, call `reverseIndexBuilder.addDomainObject()` using existing `extractDomainRefs` text-search
    - Build enriched experience map entries with `referencedComponents`, `referencedDomainObjects`, `blockedReasons`
    - Build template→screen cross-references from `template:` field
    - Write integration-level tests: given fixture screen spec → after `ProductIndexer.index()` → verify reverse indexes contain expected component/token/domain object entries AND gaps detected for `nonexistent-widget`
    - _Requirements: 2, 3, 6, 7, 9_

  - [ ] 2.4 Implement ScreenQuery (find_screens)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/query/ScreenQuery.ts`
    - Implement conjunctive filtering: start with all screens, narrow with each filter
    - `usesComponent`/`usesToken`/`usesDomainObject`: reverse index lookup → screen name set → intersect
    - `status` + `platform`: check `entry.status[platform]`; without platform, check any platform
    - `context`: case-insensitive substring match against `type`, `name`, `tags[]`
    - No params → return all screens
    - No matches → return empty array
    - Write unit tests with mock enriched map entries and reverse indexes
    - _Requirements: 1_

  - [ ] 2.5 Implement ExperienceMapQuery (enriched list_experience_map)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `product-mcp-server/src/query/ExperienceMapQuery.ts`
    - Reuse `ScreenFilter` interface — expose all 6 filter params
    - Return `EnrichedMapEntry[]` with `referencedComponents`, `referencedDomainObjects`, `blockedReasons`
    - Write unit tests
    - _Requirements: 6_

  - [ ] 2.6 Register new tools and wire handlers in index.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add tool definitions for `find_screens`, `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates`
    - Update `list_experience_map` tool definition with new optional params
    - Wire `handleTool` cases to query modules and ProductIndexer getters
    - `get_screen_state_model`: extract `state-model` or `stateModel` section from screen spec, return as-is
    - `get_screen_spec`: attach `_componentGaps` from GapDetector results
    - `get_product_health`: add gap counts and reverse index sizes to health response
    - Update `COMPONENT_DIR` env var handling (default: `src/components/core`)
    - _Requirements: 1, 4, 5, 6, 7, 8, 9, 10_

  - [ ] 2.7 Fix platform filtering order
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Update `resolveScreenSpec`: filter platform content first, then enrich one-offs, then generate warnings
    - Make one-off detection heuristic platform-aware: only warn about missing one-offs in shared or requested platform branch
    - Write test: web agent doesn't see iOS-only one-off warnings
    - _Requirements: 10_

- [ ] 3. Documentation & Reassessment

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Integration Guide documents all new tools with parameter descriptions and examples
  - UI tree convention included in Integration Guide as draft section
  - `tokens:` block convention and `_componentGaps` field documented
  - Reassessment with Leo on UI tree convention completed

  **Primary Artifacts:**
  - `.kiro/steering/DesignerPunk-Integration-Guide.md` (updated sections)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/097-product-mcp-intelligence-layer/completion/task-3-completion.md`
  - Summary: `docs/specs/097-product-mcp-intelligence-layer/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Documentation & Reassessment"`
  - Verify: Check GitHub for committed changes

  - [ ] 3.1 Update Integration Guide with new Product MCP tools
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Document `find_screens` with all 6 params, example queries, return format
    - Document `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates`
    - Document enriched `list_experience_map` with filter params
    - Document `_componentGaps` field on screen spec responses
    - Document `COMPONENT_DIR` env var
    - _Requirements: 11_

  - [ ] 3.2 Add UI tree convention to Integration Guide
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Incorporate Leo's UI tree convention (`feedback/ui-tree-convention.md`) into Integration Guide as draft section
    - Document node structure (component, props, tokens, children, repeat)
    - Document platform branching rules
    - Document token reference format (dot-notation, stored as-is)
    - Document what the indexer does and ignores per node
    - Include worked example
    - Mark as draft — to be revised after 3-5 real screen specs
    - _Requirements: 11_

  - [ ] 3.3 Reassess UI tree convention with Leonardo
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood + Leonardo
    - Review the implemented indexer behavior against the UI tree convention
    - Identify any gaps between convention and implementation
    - Capture any UI tree patterns Leo needed during real spec authoring that the convention doesn't cover
    - Assess whether the convention needs formalization (schema) or remains sufficient as documented convention
    - Document findings and any recommended changes
    - **Timing note**: Most valuable after Leo has authored at least one real screen spec. Can be deferred until after Phase 2 produces real specs if scheduling allows. Running against test fixtures is still useful but less so.
    - _Requirements: 11_
