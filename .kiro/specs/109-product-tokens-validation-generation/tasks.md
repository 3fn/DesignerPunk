# Implementation Plan: Product Tokens — Reference Validation & Platform Generation

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Status**: Implementation Planning
**Dependencies**: Spec 108 (complete)

---

## Implementation Plan

Implementation follows a dependency-driven sequence: token-index extension first (foundation for all generation), then the generator core, then platform emitters, then CLI/pipeline integration, then Product MCP enhancements.

---

## Task List

- [ ] 1. Token-Index Format Extension

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Token-index stores full qualified platform paths for nested primitives (Duration, Easing, Scale)
  - Token-index stores component namespace paths (e.g., `ButtonIconTokens.insetLarge`)
  - Theme-varying semantic tokens retain `theme.` prefix (already exists, verified unchanged)
  - Application MCP TokenIndexer continues to function (transparent change)
  - Product MCP TokenRefResolver continues to function (transparent change)
  - All existing tests pass
  
  **Primary Artifacts:**
  - `scripts/generate-token-index.ts` (updated)
  - `token-index/primitives.yaml` (regenerated)
  - `token-index/components.yaml` (regenerated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/109-product-tokens-validation-generation/completion/task-1-completion.md`
  - Summary: `docs/specs/109-product-tokens-validation-generation/task-1-summary.md`

  - [ ] 1.1 Implement qualified path generation for nested primitives
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `scripts/generate-token-index.ts` to emit `Duration.duration150` (iOS), `Duration.Duration150` (Android) for duration/easing/scale families
    - Derive nested family list from `TokenFileGenerator.DEDICATED_PRIMITIVE_CATEGORIES` or equivalent constant
    - CSS paths remain flat (unchanged)
    - Regenerate token-index and verify format
    - _Requirements: 7.1, 7.2, 7.6_

  - [ ] 1.2 Implement qualified path generation for component tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `scripts/generate-token-index.ts` to emit `ButtonIconTokens.insetLarge` (iOS), `ButtonIconTokens.inset_large` (Android) for component tokens
    - Derive component enum/object name from component name (same logic as `TokenFileGenerator.generateComponentTokens()`)
    - CSS paths remain flat (unchanged)
    - Regenerate token-index and verify format
    - _Requirements: 7.5, 7.6_

  - [ ] 1.3 Verify existing consumers are unaffected
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Lina
    - Run full test suite — all 332 suites must pass
    - Verify Application MCP TokenIndexer loads updated index without error
    - Verify Product MCP TokenRefResolver resolves refs correctly with new format
    - _Requirements: 7.3, 7.4_

- [ ] 2. Product Token Generator Core

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `ProductTokenGenerator` reads YAML, resolves refs via `TokenIndexReader`, produces `ResolvedCategory[]`
  - `TokenIndexReader` loads all three index files and returns platform paths + themeVarying status
  - Broken refs collected with source file context
  - Platform filtering applied correctly
  
  **Primary Artifacts:**
  - `src/build/product/ProductTokenGenerator.ts`
  - `src/build/product/TokenIndexReader.ts`
  - `src/build/product/__tests__/ProductTokenGenerator.test.ts`
  - `src/build/product/__tests__/TokenIndexReader.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/109-product-tokens-validation-generation/completion/task-2-completion.md`
  - Summary: `docs/specs/109-product-tokens-validation-generation/task-2-summary.md`

  - [ ] 2.1 Implement TokenIndexReader
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/build/product/TokenIndexReader.ts`
    - Load primitives.yaml, semantics.yaml, components.yaml into a single map
    - Return `IndexEntry` with `platforms`, `themeVarying`, `family`/`category`/`component`
    - Handle missing token-index directory gracefully
    - Write unit tests
    - _Requirements: 7.1, 7.5, 8.1, 8.2_

  - [ ] 2.2 Implement ProductTokenGenerator
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/build/product/ProductTokenGenerator.ts`
    - Parse YAML files from configured directory
    - Resolve refs via TokenIndexReader (get platform paths + themeVarying)
    - Collect broken refs with token name, ref value, source file
    - Apply platform filtering per token
    - Expose `generate()` and `validate()` methods
    - Write unit tests with fixture YAML
    - _Requirements: 1.2, 1.3, 2.2, 2.3, 3.2, 3.3, 4.2, 4.3, 5.5, 5.6_

- [ ] 3. Platform Emitters

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - CSS output matches canonical format (`:root`, `var()` refs, descriptions as comments, unresolved fallback)
  - Swift output matches canonical format (enums for static, protocol extension for theme-varying, correct types)
  - Kotlin output matches canonical format (objects, composable getters for theme-varying, correct imports)
  - Platform filtering excludes tokens correctly
  - Theme-varying tokens emit correct patterns per platform
  
  **Primary Artifacts:**
  - `src/build/product/emitters/WebEmitter.ts`
  - `src/build/product/emitters/SwiftEmitter.ts`
  - `src/build/product/emitters/KotlinEmitter.ts`
  - Tests for each emitter
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/109-product-tokens-validation-generation/completion/task-3-completion.md`
  - Summary: `docs/specs/109-product-tokens-validation-generation/task-3-summary.md`

  - [ ] 3.1 Implement WebEmitter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/build/product/emitters/WebEmitter.ts`
    - Emit `:root` block with `--product-{category}-{kebab-name}` custom properties
    - Use `PlatformNamingRules` for own-name conversion
    - Ref tokens: `var({platforms.web})` from index
    - Hard values: format by unitType (px, ms, ch, %, unitless, raw color)
    - Unresolved refs: `/* ⚠️ UNRESOLVED */ --name: initial;`
    - Include description as inline comment, category headers, file header
    - Write unit tests
    - _Requirements: 2.1–2.11_

  - [ ] 3.2 Implement SwiftEmitter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina + Kenya (cross-domain: Lina implements, Kenya validates Swift idioms)
    - Create `src/build/product/emitters/SwiftEmitter.ts`
    - Static tokens: `public enum Product{Category} { public static let ... }`
    - Static colors: `UIColor` type (matching system tokens)
    - Theme-varying tokens: `public extension {ThemeName} { var product{Category}{Name}: Color { self.{systemProp} } }`
    - Conditional imports (UIKit when static colors, SwiftUI when theme-varying)
    - Duration ms→s conversion, percent 0-100→0-1 conversion
    - File header with timestamp
    - Write unit tests
    - _Requirements: 3.1–3.10, 8.4, 8.6, 8.7, 8.9, 8.10_

  - [ ] 3.3 Implement KotlinEmitter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina + Data (cross-domain: Lina implements, Data validates Kotlin idioms)
    - Create `src/build/product/emitters/KotlinEmitter.ts`
    - Static tokens: `object Product{Category} { val name = value }`
    - Theme-varying tokens: `val name: Color @Composable @ReadOnlyComposable get() = Local{Abbr}Theme.current.{prop}`
    - Conditional imports based on token types present
    - Include composition scope note in file header when theme-varying tokens exist
    - Percent 0-100→0-1 conversion
    - File header with timestamp
    - Write unit tests
    - _Requirements: 4.1–4.10, 8.5, 8.8, 8.9_

- [ ] 4. CLI & Pipeline Integration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `npx designerpunk validate --product-tokens` works with correct exit codes
  - `npx designerpunk generate` produces product token output when configured
  - `designerpunk.config.ts` accepts `productTokens` field
  - Token-index is regenerated before product token generation (freshness guarantee)
  - Broken refs warn but don't block system token output
  - Integration test passes end-to-end
  
  **Primary Artifacts:**
  - `src/cli/validateProductTokens.ts`
  - `src/cli/designerpunk.ts` (updated)
  - `src/config/defineConfig.ts` (updated)
  - `src/__tests__/integration/Spec109-ProductTokenGeneration.test.ts`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/109-product-tokens-validation-generation/completion/task-4-completion.md`
  - Summary: `docs/specs/109-product-tokens-validation-generation/task-4-summary.md`

  - [ ] 4.1 Extend defineConfig with productTokens field
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Add `productTokens?: string` to `DesignerPunkConfig` interface
    - Add JSDoc documentation
    - _Requirements: 5.1_

  - [ ] 4.2 Implement validate --product-tokens CLI command
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/cli/validateProductTokens.ts`
    - Route `--product-tokens` flag in `src/cli/designerpunk.ts` validate case
    - Report per-file results, exit codes, actionable hints
    - Handle edge cases: no config, missing path, empty files, parse errors
    - Write unit tests
    - _Requirements: 1.1–1.10_

  - [ ] 4.3 Integrate generation into npx designerpunk generate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina + Ada (cross-domain: Lina wires integration, Ada ensures index freshness flow)
    - Add token-index regeneration step before product token generation
    - Invoke ProductTokenGenerator when `productTokens` configured
    - Handle missing/nonexistent path gracefully
    - Report summary (token count, category count, broken refs)
    - Broken refs warn, don't block system output
    - Write integration test
    - _Requirements: 5.2–5.8, 9.1–9.3_

- [ ] 5. Product MCP Enhancements

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `get_product_tokens` accepts `promotionCandidate` filter
  - Response includes `themeVarying` field for resolved refs
  - Existing tests continue to pass
  
  **Primary Artifacts:**
  - `product-mcp-server/src/indexer/ProductTokenIndexer.ts` (updated)
  - `product-mcp-server/src/index.ts` (updated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/109-product-tokens-validation-generation/completion/task-5-completion.md`
  - Summary: `docs/specs/109-product-tokens-validation-generation/task-5-summary.md`

  - [ ] 5.1 Add promotionCandidate filter to get_product_tokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `promotionCandidate` parameter to tool schema in `index.ts`
    - Add filter logic in `ProductTokenIndexer.query()`
    - Absent field treated as false
    - Write test
    - _Requirements: 6.1–6.3_

  - [ ] 5.2 Add themeVarying field to resolved ref response
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Read `themeVarying` from token-index entry during ref resolution in `ProductTokenIndexer`
    - Include `themeVarying: boolean` in `ProductTokenEntry` response
    - Default to `false` when field not present in index or ref unresolved
    - Write test
    - _Requirements: 8.2_
