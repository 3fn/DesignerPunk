# Implementation Plan: Portable Token Pipeline & Theme Registry

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Status**: Implementation Planning
**Dependencies**: None (critical path)

---

## Implementation Sequence

Three workstreams, sequenced by dependency:

1. **WS4**: Theme registry + all platform generator restructuring (Ada). Critical path.
2. **WS1**: Portable pipeline — config, path abstraction, CLI (Ada). Builds on WS4.
3. **R8**: Component consumption migration — iOS + Android (Lina). Parallelizable with WS1.

Prereqs (Lina, before Task 1): Fix ESM bundle (4 missing components) + Nav-Header-Base metadata.

---

## Task List

- [x] 0. Prereqs: ESM Bundle Fix + Metadata Correction

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Lina

  - Add Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Progress-Bar-Base to `browser-entry.ts` (Nav-Header-Base registered before App and Page)
  - Fix Nav-Header-Base `component-meta.yaml` — replace incorrect `whenToUse` with internal-only guidance, add `whenNotToUse` redirecting to semantic variants
  - Rebuild ESM bundle, verify all 34 components registered
  - Run Application MCP `rebuild_index`, confirm 34 components indexed with no warnings
  - Run `npm test` — all existing tests pass
  - _Requirements: R6 (backward compatibility)_

---

- [x] 1. Theme Registry & Migration (WS4 — Phase 1: Migrate)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - Theme registry accepts registrations with validation
  - Existing four themes migrated to registry
  - All platform outputs byte-for-byte identical to pre-migration snapshots
  - All existing tests pass

  **Primary Artifacts:**
  - `src/themes/ThemeRegistry.ts`
  - Modified `src/resolvers/SemanticOverrideResolver.ts`
  - Modified `src/generators/generateTokenFiles.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/094-portable-pipeline-and-theme-registry/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Theme Registry & Migration"`
  - Verify on GitHub

  - [x] 1.1 Capture pre-migration snapshots
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Capture `dist/DesignTokens.web.css`, `dist/DesignTokens.ios.swift`, `dist/DesignTokens.android.kt`, `dist/DesignTokens.dtcg.json`, `dist/DesignTokens.figma.json` as test fixtures
    - Capture `dist/ComponentTokens.web.css`, `dist/ComponentTokens.ios.swift`, `dist/ComponentTokens.android.kt`
    - These snapshots are the regression baseline for the entire spec
    - _Requirements: R6 AC 4_

  - [x] 1.2 Implement ThemeRegistry
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/themes/ThemeRegistry.ts` with `register()`, `getAll()`, `get()`, `getThemeVaryingTokens()`
    - Duplicate name rejection with clear error
    - Override reference validation against semantic token registry (fail fast at registration)
    - Unit tests: register, iterate, duplicate rejection, invalid reference rejection, theme-varying token set computation
    - _Requirements: R1 AC 1-4, R2 AC 5_

  - [x] 1.3 Migrate existing themes to registry
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    **Note**: Highest-risk subtask. Commit 1.2 (ThemeRegistry) before starting 1.3 so rollback is clean.
    - Register base, wcag, dark, dark-wcag themes via ThemeRegistry in `generateTokenFiles.ts`
    - Remove hardcoded override imports and manual `ContextOverrideSet` assembly
    - Update `SemanticOverrideResolver` with `resolveForRegistry()` returning `ResolvedThemeSet[]`
    - Update `GenerationOptions` interface from four named arrays to `ResolvedThemeSet[]`
    - Generalize WCAG block positioning logic for any registered theme
    - Assert all platform outputs match pre-migration snapshots (byte-for-byte)
    - _Requirements: R1 AC 5-6, R2 AC 1, R6 AC 1-4_

  - [x] 1.4 Run full regression
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Run `npm test` — all existing test suites pass
    - Run `npm run generate:platform-tokens` — identical output
    - Run component behavioral contract tests — all pass
    - _Requirements: R6 AC 2-3, R6 AC 5_

---

- [x] 2. Platform Generator Restructuring (WS4 — Phase 2: Extend)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - CSS generator produces `data-theme` scoped output for registered themes
  - Swift generator produces protocol + structs + EnvironmentKey
  - Kotlin generator produces data class + instances + CompositionLocal
  - DTCG and Figma generators include themed values
  - Static tokens unchanged across all platforms
  - New theme registration produces correct themed output on all platforms

  **Primary Artifacts:**
  - Modified CSS, Swift, Kotlin, DTCG, Figma generators
  - New `generateWebThemeBlocks`, `generateSwiftThemeTypes`, `generateKotlinThemeTypes` methods

  **Completion Documentation:**
  - Detailed: `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/094-portable-pipeline-and-theme-registry/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Platform Generator Restructuring"`
  - Verify on GitHub

  - [x] 2.1 Split `generatePlatformTokens` for theme-aware output
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    **Note**: Must land first within Task 2. Subtasks 2.2-2.4 can proceed in any order after. 2.5 last (most likely to surface surprises).
    - Keep `generatePlatformTokens` for static token portion (shared across platforms)
    - Create `generateWebThemeBlocks` — `data-theme` scoped CSS rule sets per registered theme
    - Create `generateSwiftThemeTypes` — protocol + structs + EnvironmentKey
    - Create `generateKotlinThemeTypes` — data class + instances + CompositionLocal
    - Use `{Name}` and `{Abbreviation}` from config for generated type names
    - _Requirements: R3 AC 1-17, R4 AC 7-9_

  - [x] 2.2 CSS generator: theme scoping
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - `:root` for base theme (no attribute)
    - `:root[data-theme="{name}"]` per registered theme
    - `color-scheme: dark` for dark-only themes, no `light-dark()` wrapping
    - `light-dark()` for themes with mode `'both'`
    - Verify existing base/wcag/dark output unchanged (snapshot comparison)
    - _Requirements: R3 AC 1-5_

  - [x] 2.3 Swift generator: theme types
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    **Note**: This is new generation code, not a modification — produces an entirely new output structure.
    - Generate `{Name}Theme` protocol with theme-varying properties (use SwiftUI `Color` type, not `UIColor` — eliminates wrapping at consumption site)
    - Generate concrete struct per theme (light + dark for `'both'`, single for `'dark'`)
    - Generate `{Abbreviation}ThemeKey: EnvironmentKey` with base light default
    - Static tokens remain in `DesignTokens` struct
    - Tests: protocol generated, structs correct, EnvironmentKey default correct
    - _Requirements: R3 AC 6-11_

  - [x] 2.4 Kotlin generator: theme types
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    **Note**: This is new generation code, not a modification. Use Compose `Color` directly in data class, not `Int` with `Color.argb()`.
    - Generate `{Name}Theme` data class with theme-varying properties
    - Generate named instances in `{Name}Themes` object
    - Generate `Local{Abbreviation}Theme` CompositionLocal with base light default
    - Static tokens remain in `DesignTokens` object
    - Tests: data class generated, instances correct, CompositionLocal default correct
    - _Requirements: R3 AC 12-17_

  - [x] 2.5 DTCG and Figma generator updates
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    **Note**: Sequence last within Task 2. Figma generator may need splitting after investigation of variable collection model.
    - DTCG: include themed values with `$extensions` metadata per theme
    - Figma: add variable modes per registered theme
    - Verify existing DTCG/Figma output unchanged for base themes (snapshot comparison)
    - _Requirements: R6 AC 1_

---

- [ ] 3. Portable Pipeline (WS1)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Success Criteria:**
  - `designerpunk.config.ts` loaded and executed from product repo context
  - Pipeline resolves token sources from installed package
  - Pipeline generates themed output to configured directory
  - DesignerPunk repo scripts work unchanged with default config
  - `npx designerpunk generate` works from a product repo

  **Primary Artifacts:**
  - `src/config/defineConfig.ts`
  - `src/config/ConfigLoader.ts`
  - CLI entry point for `npx designerpunk generate`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/094-portable-pipeline-and-theme-registry/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Portable Pipeline"`
  - Verify on GitHub

  - [ ] 3.1 Implement `defineConfig` and `ConfigLoader`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/config/defineConfig.ts` — exported from `@designerpunk/core/config`
    - Create `src/config/ConfigLoader.ts` — loads `designerpunk.config.ts` from working directory, falls back to defaults
    - Support `name`, `abbreviation`, `themes`, `componentTokens`, `output` fields
    - Path resolution: config-relative for product paths, `require.resolve` for package paths
    - Tests: default config, custom config, missing config, invalid config
    - _Requirements: R4 AC 1-9, R5 AC 1-3_

  - [ ] 3.2 Abstract hardcoded paths in generators
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - `generateTokenFiles.ts` reads config instead of assuming repo-relative paths
    - `scripts/generate-platform-tokens.ts` reads config for component token discovery (`*.tokens.ts` convention)
    - Output directory configurable
    - Token source root configurable (installed package or repo root)
    - Create `designerpunk.config.ts` in DesignerPunk repo root with default values (serves as both working config and reference example)
    - Verify DesignerPunk repo scripts produce identical output with default config
    - _Requirements: R5 AC 2-4, R6 AC 1-2_

  - [ ] 3.3 Pipeline CLI
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - CLI entry point for `npx designerpunk generate`
    - Reads config from working directory
    - Resolves package location via `require.resolve`
    - **Decision (settled)**: TypeScript execution strategy is `tsx` — lightweight, fast, no `tsconfig.json` required. Bundled as a dependency of `@designerpunk/core` during Block B (WS2 packaging). For Phase 1 implementation, CLI uses native `import()` which works in the DesignerPunk repo via existing `ts-node`. The `tsx` bootstrap is wired when the package's `bin` entry point is built.
    - _Requirements: R5 AC 5_

  - [ ] 3.4 Integration test: product repo simulation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create temp directory simulating a product repo structure
    - Place `designerpunk.config.ts` with a test theme
    - Run pipeline from the simulated product repo
    - Assert themed output generated correctly for all platforms
    - _Requirements: R4 AC 1-4, R5 AC 1-5_

---

- [ ] 4. Component Consumption Migration (R8)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Lina

  **Note**: Parallelizable with Task 3. Does not block M0a (web-only). Must be complete before M0b activates iOS and Android. Actual migration scope is ~26 iOS / ~23 Android components (8-11 per platform have zero color refs — still listed for verification). Migration is not pure find-and-replace: iOS has 2 code patterns (enum static lets + static factory methods), Android has 3 (private object + private fun + file-level val). See feedback doc for details.

  **Success Criteria:**
  - All iOS components read theme-varying colors from `@Environment`
  - All Android components read theme-varying colors from `CompositionLocal`
  - Static token references (spacing, sizing, radius, typography) unchanged
  - Old static color properties removed from generated output
  - All component tests pass

  **Primary Artifacts:**
  - Modified iOS platform files across all component families
  - Modified Android platform files across all component families

  **Completion Documentation:**
  - Detailed: `.kiro/specs/094-portable-pipeline-and-theme-registry/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/094-portable-pipeline-and-theme-registry/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Component Consumption Migration"`
  - Verify on GitHub

  - [ ] 4.1 iOS migration: Navigation family
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    **Step 0**: Fix any broken token references against actual generated `DesignTokens.ios.swift` before migrating (see `.kiro/issues/2026-04-07-ios-token-reference-quality-gap.md`)
    - Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Nav-SegmentedChoice-Base, Nav-TabBar-Base
    - Add `@Environment(\.{abbreviation}Theme) var theme`
    - Move color refs from local token enum to view body
    - Clean up empty enums if applicable
    - _Requirements: R8 AC 1, 3, 5_

  - [ ] 4.2 iOS migration: Button + Container families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    **Note**: Button-VerticalList-Item has 22 color refs across static factory methods (Pattern B) — requires passing theme colors into VisualStateStyles, not a simple enum-to-body move.
    - Button-CTA, Button-Icon, Button-VerticalList-Item, Button-VerticalList-Set, Container-Base, Container-Card-Base
    - Same three-step pattern as 4.1
    - _Requirements: R8 AC 1, 3, 5_

  - [ ] 4.3 iOS migration: Form Input + Chip families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    **Note**: Input-Text-Base has ~30 broken dot-path references — heaviest iOS fix. Badge components have shortened names.
    - Input-Text-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber, Input-Checkbox-Base, Input-Checkbox-Legal, Input-Radio-Base, Input-Radio-Set, Chip-Base, Chip-Filter, Chip-Input
    - Same three-step pattern
    - _Requirements: R8 AC 1, 3, 5_

  - [ ] 4.4 iOS migration: Remaining families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Avatar-Base, Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Icon-Base, Progress-Bar-Base, Progress-Indicator-Node-Base, Progress-Indicator-Connector-Base, Progress-Indicator-Label-Base, Progress-Pagination-Base, Progress-Stepper-Base, Progress-Stepper-Detailed
    - Same three-step pattern
    - _Requirements: R8 AC 1, 3, 5_

  - [ ] 4.5 Android migration: Navigation family
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    **Step 0**: Fix any broken token references against actual generated `DesignTokens.android.kt` before migrating (see `.kiro/issues/2026-04-07-android-token-reference-quality-gap.md`). Three patterns: uninitialized stubs, camelCase vs snake_case, shortened names.
    - Same components as 4.1, Android platform files
    - Add `val theme = Local{Abbreviation}Theme.current`
    - Move color refs from private object to composable body
    - _Requirements: R8 AC 2, 4, 5_

  - [ ] 4.6 Android migration: Button + Container families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Same components as 4.2, Android platform files
    - _Requirements: R8 AC 2, 4, 5_

  - [ ] 4.7 Android migration: Form Input + Chip families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    **Note**: Input-Text-Base has 34 uninitialized stub declarations — heaviest Android fix. Chip components have shortened names.
    - Same components as 4.3, Android platform files
    - _Requirements: R8 AC 2, 4, 5_

  - [ ] 4.8 Android migration: Remaining families
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Same components as 4.4, Android platform files
    - _Requirements: R8 AC 2, 4, 5_

  - [ ] 4.9 Remove old static color properties + full regression
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada (generator change) + Lina (regression)
    - **Ada**: Remove old static color token properties from generated Swift and Kotlin output (prevent dual-pattern consumption)
    - **Lina**: Run all component behavioral contract tests — all pass
    - **Lina**: Run all component unit tests — all pass
    - **Lina**: Run `npm test` — full suite passes
    - Remove any empty local token enums/objects left after migration
    - _Requirements: R8 AC 6, R6 AC 3, 5_

---

- [ ] 5. Integration Guide, Steering Docs & Agent Updates

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  - Update `docs/roadmap/integration-guide-draft.md` with actual pipeline config steps, theme creation workflow, prerequisites
  - Document TypeScript execution strategy decision
  - Include complete `designerpunk.config.ts` example with `name`, `abbreviation`, theme registration
  - Update Docs MCP steering docs to reflect new infrastructure:
    - `Token-Governance.md` — theme registration governance, product theme creation rules
    - `Rosetta-System-Architecture.md` — registry pattern, configurable pipeline, `defineConfig` API
    - `Component-Development-Guide.md` — new iOS/Android consumption pattern (`@Environment`/`CompositionLocal` instead of static `DesignTokens`)
    - `Token-Quick-Reference.md` — theme-varying vs static distinction if relevant to agent token selection
  - Update agent resources: Ada (theme registry), Leo (token data queries), product agents (package consumption)
  - Update `/knowledge` bases for relevant agents
  - CSS scoping integration test: render Shadow DOM components inside `data-theme` container, verify themed values inherited (including nested Nav-Header-App → Nav-Header-Base) — owned by Lina
  - _Requirements: R7 AC 1-3_

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool
  - Commit: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Integration Guide & Agent Updates"`
  - Verify on GitHub
