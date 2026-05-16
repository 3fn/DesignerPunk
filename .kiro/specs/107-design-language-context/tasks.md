# Implementation Plan: Design Language Context for AI-Driven Interface Creation

**Date**: 2026-05-16
**Spec**: 107 - Design Language Context
**Status**: Implementation Planning
**Dependencies**: None (subsumes Spec 100)

---

## Implementation Plan

Work is organized into three tracks executed sequentially. Track 2 (token revisions) is first because it's independent and trivial. Track 1 (philosophy + skill) is second because it produces the content the MCPs will serve. Track 3 (MCP evolution) is third because it depends on Track 1's authored content.

---

## Task List

- [x] 1. Font Family Token Updates (Track 2)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - fontFamilyBody references Figtree with appropriate fallbacks
  - fontFamilyMono references Commit Mono with appropriate fallbacks
  - All tests pass with updated assertions
  - Generated platform output reflects new font families
  
  **Primary Artifacts:**
  - `src/tokens/FontFamilyTokens.ts`
  - `src/tokens/__tests__/FontFamilyTokens.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-1-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-1-summary.md`

  - [x] 1.1 Update font family token values
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Change `fontFamilyBody` platform values from Inter to Figtree
    - Change `fontFamilyMono` platform values from SF Mono to Commit Mono
    - Verify fontFamilyDisplay (Rajdhani) is unchanged
    - Update test assertions in FontFamilyTokens.test.ts
    - Run `npm test` to verify all tests pass
    - Regenerate platform output to confirm new values propagate
    - _Requirements: 7.1, 7.2, 7.6, 7.7_

  - [x] 1.2 Update integration guide and release notes
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add Figtree and Commit Mono CDN links to integration guide
    - Document the font change in release notes (visual change for consumers using defaults)
    - Note that consumers with tokenSource config are unaffected
    - _Requirements: 7.3, 7.5_

---

- [x] 2. Design Philosophy Authoring (Track 1)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - design-philosophy.yaml authored with all required sections (philosophy, rules, guidance, colorStrategy)
  - Content reviewed and approved by Peter
  - File validates against expected schema (all required fields present)
  - Content uses token names where referencing values
  
  **Primary Artifacts:**
  - `design-language/design-philosophy.yaml`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-2-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-2-summary.md`

  - [x] 2.1 Create design-language directory and initial philosophy file
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Create `design-language/` directory at repo root
    - Create `design-philosophy.yaml` with schema structure (empty/placeholder values)
    - Verify directory is accessible and file parses as valid YAML
    - _Requirements: 5.6, 8.5_

  - [x] 2.2 Author design philosophy content
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood + Peter (collaborative authoring)
    - Author `philosophy` section (northStar, description, characteristics) starting from sample-DESIGN.md
    - Author `rules` section (5-10 named rules with constraint + rationale)
    - Author `guidance` section (do's and don'ts, categorized)
    - Author `colorStrategy` section (4 tiers with definition, whenToUse, whenNotToUse, example)
    - Ensure all token references use token names, not raw values
    - Peter reviews and approves final content
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6_

---

- [x] 3. Application MCP Design Language Tools (Track 3)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - DesignPhilosophyIndexer loads and parses design-philosophy.yaml
  - Four new tools (get_design_philosophy, get_design_rules, get_design_guidance, get_color_strategy) return correct data
  - Health check reports warnings for malformed/missing philosophy data
  - Index rebuild picks up philosophy changes without code changes
  
  **Primary Artifacts:**
  - `application-mcp-server/src/indexer/DesignPhilosophyIndexer.ts`
  - `application-mcp-server/src/index.ts` (tool registrations)
  - `application-mcp-server/src/__tests__/DesignPhilosophyIndexer.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-3-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-3-summary.md`

  - [x] 3.1 Implement DesignPhilosophyIndexer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create test fixture `design-philosophy.yaml` in `application-mcp-server/src/indexer/__tests__/fixtures/` with representative data
    - Create `DesignPhilosophyIndexer.ts` with async index(filePath) method
    - Implement getPhilosophy(), getRules(), getGuidance(category?), getColorStrategy() methods
    - Implement getWarnings() for malformed data reporting
    - Add `designLanguagePath` to DataPaths interface and wire through ApplicationMCPServer constructor
    - Write unit tests for parsing, field extraction, malformed data, category filtering (using fixture)
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [x] 3.2 Register new MCP tools
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Register `get_design_philosophy` tool in Application MCP index.ts
    - Register `get_design_rules` tool
    - Register `get_design_guidance` tool (with optional category filter param)
    - Register `get_color_strategy` tool (with optional tier filter param)
    - Wire tools to DesignPhilosophyIndexer methods
    - Integrate indexer into rebuild_index flow
    - Add philosophy health to get_component_health response
    - Write integration tests verifying tool responses
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.7_

---

- [ ] 4. Product MCP Brand Context Extension (Track 3)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - get_product_overview returns register and brand fields when configured
  - get_brand_context returns full brand identity or structured "not configured" response
  - Existing Product MCP functionality unaffected
  
  **Primary Artifacts:**
  - `product-mcp-server/src/models.ts` (extended interfaces)
  - `product-mcp-server/src/index.ts` (new tool registration)
  - `product-mcp-server/src/__tests__/BrandContext.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-4-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-4-summary.md`

  - [x] 4.1 Extend Product MCP data model and indexer
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add BrandContext and extended ProductOverview interfaces to models.ts
    - Update ProductIndexer.indexOverview() to parse new brand fields from overview.yaml
    - Register `get_brand_context` tool in index.ts
    - Return structured "not configured" response when brand fields absent
    - Write unit tests for configured, unconfigured, and partial states
    - Verify existing Product MCP tools remain unaffected
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 4.2 Update test fixtures with brand context
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add register and brand fields to test fixture overview.yaml
    - Create additional fixture for "unconfigured" state (no brand fields)
    - Verify existing tests still pass with extended fixture
    - _Requirements: 6.3, 6.4_

---

- [ ] 5. Leonardo Skill Enhancement (Track 1)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Leonardo's prompt includes design creation skill references
  - Adapted reference files (brand-dp.md, product-dp.md, extract-dp.md) created
  - Skill loading sequence documented and functional
  - Gate system defined with novelty tiers
  - Conflict resolution hierarchy explicit in prompt
  
  **Primary Artifacts:**
  - `.kiro/agents/leonardo-prompt.md` (updated)
  - `.kiro/skills/impeccable/reference/brand-dp.md`
  - `.kiro/skills/impeccable/reference/product-dp.md`
  - `.kiro/skills/impeccable/reference/extract-dp.md`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-5-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-5-summary.md`

  - [x] 5.1 Copy and organize Impeccable skill references
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Copy kept references (7 domain + procedural) to `.kiro/skills/impeccable/reference/`
    - Exclude teach.md and document.md (replaced by MCP workflow)
    - Verify all kept files are present and readable
    - _Requirements: 4.1_

  - [x] 5.2 Adapt brand and product register references
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Leonardo
    - Create `brand-dp.md` adapted from brand.md (DesignerPunk brand values, Figtree/CommitMono/Rajdhani fonts, electric palette, punk ethos)
    - Create `product-dp.md` adapted from product.md (DesignerPunk product register, semantic spacing references, component selection via MCP)
    - Create `extract-dp.md` adapted from extract.md (respects token governance, no autonomous token creation)
    - Verify adapted references don't conflict with DesignerPunk's token system
    - _Requirements: 4.2, 4.3, 4.4, 4.5_

  - [x] 5.3 Update Leonardo's prompt
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add design creation skill section to leonardo-prompt.md
    - Document skill loading sequence (10-step MCP query flow)
    - Document gate system with novelty tiers (Full/Abbreviated/None + register bump)
    - Document conflict resolution hierarchy (Priority 1-5)
    - Document graceful degradation (proceed with token-only guidance when philosophy unavailable)
    - Document lessons-learned capture for philosophy ambiguity
    - Add anti-slop awareness (category-reflex checks)
    - Reference adapted skill files and domain references
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9_

  - [x] 5.4 Adapt SKILL.md setup for MCP consumption
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Create adapted SKILL.md that replaces load-context.mjs with MCP query sequence
    - Preserve command routing, register identification, and reference loading logic
    - Document which Impeccable shared design laws are overridden by DesignerPunk (with conflict notes)
    - Preserve all 23 commands (minus teach/document which are excluded)
    - _Requirements: 4.1, 4.7, 4.8_

---

- [ ] 6. Validation and Integration (Track 3)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - End-to-end flow works: Leonardo queries MCP → loads skill → produces screen spec with aesthetic intentionality
  - All tests pass (`npm test`)
  - Application MCP health check includes philosophy status
  - No regressions in existing MCP functionality
  
  **Primary Artifacts:**
  - Integration test files
  - Updated Application MCP health response
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/107-design-language-context/completion/task-6-completion.md`
  - Summary: `docs/specs/107-design-language-context/task-6-summary.md`

  - [ ] 6.1 Integration testing
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Test: Application MCP serves design philosophy after rebuild_index
    - Test: Product MCP serves brand context from extended overview.yaml
    - Test: Category filtering works for get_design_guidance
    - Test: Tier filtering works for get_color_strategy
    - Test: "Not authored" / "not configured" responses are structured correctly
    - Test: Font family change generates correct platform output
    - Test: Consumer with tokenSource gets their own fonts (isolation)
    - _Requirements: 5.1-5.7, 6.1-6.4, 7.1-7.3_

  - [ ] 6.2 Update Agent Directory and documentation
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Update Agent Directory to reflect Leonardo's expanded capabilities
    - Note Spec 100 deprecation (subsumed by 107)
    - Update any cross-references to Spec 100 in steering docs
    - _Requirements: 3.1_

---

## Sequencing Summary

```
Task 1 (Font tokens) ──────────────────────────────── Independent, do first
Task 2 (Author philosophy) ─────┐
Task 3 (Application MCP tools) ─┼── Parallel (Task 3 uses fixtures, not Task 2 output)
Task 4 (Product MCP extension) ─┘
Task 5.1-5.2 (Copy + adapt refs) ── Can start after Task 1 (no MCP dependency)
Task 5.3-5.4 (Prompt + SKILL.md) ── Depends on Task 3 (needs MCP tools to reference)
Task 6 (Integration) ──────────── Depends on 2, 3, 4, 5 (validates everything with real data)
```
