# Requirements Document: Portable Token Pipeline & Theme Registry

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Status**: Requirements Phase
**Dependencies**: None (this is the critical path — other blocks depend on this)

---

## Introduction

The token generation pipeline and theme infrastructure are hardcoded to the DesignerPunk repo structure. Product repos installing `@designerpunk/core` cannot run the pipeline, create custom themes, or generate themed token outputs. This spec makes the pipeline portable and the theme system extensible across all three platforms (web, iOS, Android), enabling the core promise of the ecosystem vision: "install DesignerPunk, configure it for your brand."

Workstreams, sequenced: WS4 (theme registry + all platform generators) → WS1 (portable pipeline) → R8 (component consumption migration, parallelizable with WS1).

---

## Requirements

### Requirement 1: Theme Registry

**User Story**: As a product developer, I want to register custom themes so that the pipeline generates themed token outputs for my product's visual identity.

#### Acceptance Criteria

1. WHEN a theme is registered with a name, mode, and override map THEN the registry SHALL accept and store the registration
2. WHEN multiple themes are registered THEN the registry SHALL iterate over all registered themes during resolution
3. WHEN a theme with a duplicate name is registered THEN the registry SHALL reject the registration with a clear error
4. WHEN a theme is registered with overrides referencing a semantic token that does not exist in the registry THEN the registration SHALL fail with a clear error identifying the invalid reference
5. WHEN no custom themes are registered THEN the pipeline SHALL generate output for the base themes only (light-base, light-wcag, dark-base, dark-wcag) — identical to current behavior
6. WHEN existing base themes (base, wcag, dark, dark-wcag) are migrated to the registry THEN the generated output for all platforms SHALL be byte-for-byte identical to the pre-migration output

---

### Requirement 2: Semantic Override Resolution via Registry

**User Story**: As the token pipeline, I want to resolve semantic overrides from the registry instead of hardcoded imports so that any registered theme's overrides are included in the generated output.

#### Acceptance Criteria

1. WHEN the `SemanticOverrideResolver` resolves tokens THEN it SHALL query the theme registry for all registered themes instead of iterating hardcoded `ThemeContext` values
2. WHEN a theme is registered with mode `'dark'` THEN the resolver SHALL generate a dark-only context for that theme (no `light-dark()` wrapping on web, single theme instance on iOS/Android)
3. WHEN a theme is registered with mode `'both'` THEN the resolver SHALL generate both light and dark contexts (using `light-dark()` on web, two theme instances on iOS/Android)
4. WHEN the resolver processes registered themes THEN it SHALL validate override references against the semantic token registry before generation
5. WHEN the pipeline determines theme-varying vs static tokens THEN it SHALL collect the union of all overridden token names across all registered themes — tokens in that set are theme-varying, everything else stays static

**Note**: `mode: 'light'` (light-only theme) has no current use case. Support is deferrable — implement only if trivial alongside `'dark'` and `'both'`.

---

### Requirement 3: Cross-Platform Themed Output

**User Story**: As a platform developer consuming DesignerPunk tokens, I want themed token outputs in my platform's native idiom so that runtime theme switching works naturally with platform conventions.

#### Acceptance Criteria — Web (CSS)

1. WHEN the CSS generator produces output THEN the base theme tokens SHALL be scoped to `:root` with no attribute required
2. WHEN a registered theme named "wcag" exists THEN its tokens SHALL be scoped to `:root[data-theme="wcag"]`
3. WHEN a registered theme with mode "dark" exists THEN its tokens SHALL be scoped to `:root[data-theme="{name}"]` with `color-scheme: dark` and no `light-dark()` wrapping
4. WHEN a `data-theme` attribute is set on an HTML element THEN all descendant components SHALL inherit the themed CSS custom property values (including through Shadow DOM boundaries)
5. WHEN no `data-theme` attribute is present THEN the base theme SHALL apply (zero-config default)

#### Acceptance Criteria — iOS (Swift)

6. WHEN the Swift generator produces output THEN it SHALL generate a protocol defining all theme-varying token properties
7. WHEN a theme is registered THEN the generator SHALL produce a concrete struct conforming to the protocol with that theme's values
8. WHEN a theme has mode `'both'` THEN the generator SHALL produce two structs (light + dark)
9. WHEN a theme has mode `'dark'` THEN the generator SHALL produce one struct (dark only)
10. WHEN the Swift generator produces output THEN it SHALL generate an `EnvironmentKey` with the base light theme as the default value
11. WHEN non-theme-varying tokens (spacing, sizing, radius, typography, motion) are generated THEN they SHALL remain as static constants in the existing `DesignTokens` struct

#### Acceptance Criteria — Android (Kotlin)

12. WHEN the Kotlin generator produces output THEN it SHALL generate a data class holding all theme-varying token properties
13. WHEN a theme is registered THEN the generator SHALL produce a named instance of the data class with that theme's values
14. WHEN a theme has mode `'both'` THEN the generator SHALL produce two instances (light + dark)
15. WHEN a theme has mode `'dark'` THEN the generator SHALL produce one instance (dark only)
16. WHEN the Kotlin generator produces output THEN it SHALL generate a `CompositionLocal` with the base light theme as the default value
17. WHEN non-theme-varying tokens are generated THEN they SHALL remain as static constants in the existing `DesignTokens` object

---

### Requirement 4: TypeScript Configuration

**User Story**: As a product developer, I want to configure the pipeline via a TypeScript config file so that I can explicitly import and register my themes and component tokens in one place.

#### Acceptance Criteria

1. WHEN a `designerpunk.config.ts` file exists in the working directory THEN the pipeline SHALL load and execute it to obtain configuration
2. WHEN no config file exists THEN the pipeline SHALL use default configuration matching the current DesignerPunk repo structure
3. WHEN the config registers themes via `defineConfig({ themes: [...] })` THEN each theme SHALL be registered in the theme registry before generation begins
4. WHEN the config specifies an `output` directory THEN the pipeline SHALL write generated files to that directory
5. WHEN the config specifies `componentTokens` directories THEN the pipeline SHALL discover component token files matching `*.tokens.ts` within those directories
6. The `defineConfig` function SHALL be exported from `@designerpunk/core/config` so product repos can import it
7. WHEN the config specifies a `name` field THEN the pipeline SHALL use it to generate platform-native type names (e.g., `{name}Theme` for the theme protocol/data class)
8. WHEN the config specifies an `abbreviation` field THEN the pipeline SHALL use it for abbreviated identifiers (e.g., `{abbreviation}ThemeKey` for environment keys)
9. WHEN no `name` or `abbreviation` is provided THEN the pipeline SHALL use `DesignerPunk` and `DP` as defaults

---

### Requirement 5: Portable Path Resolution

**User Story**: As a product developer who installed `@designerpunk/core`, I want to run the pipeline from my project root so that I can generate token outputs without cloning the DesignerPunk repo.

#### Acceptance Criteria

1. WHEN the pipeline runs from a product repo THEN it SHALL resolve token source files from the installed package's actual location (using package resolution, not assuming `node_modules` path structure)
2. WHEN the pipeline runs from the DesignerPunk repo with default config THEN it SHALL resolve token source files from the repo root — identical to current behavior
3. WHEN the config specifies theme override files in the product repo THEN the pipeline SHALL resolve those paths relative to the config file location
4. WHEN the pipeline generates platform outputs (CSS, Swift, Kotlin, DTCG) THEN all outputs SHALL be written to the configured output directory
5. WHEN a product repo runs `npx designerpunk generate` THEN the pipeline SHALL execute using the config from the working directory

---

### Requirement 6: Backward Compatibility

**User Story**: As a DesignerPunk contributor, I want existing scripts and tests to continue working after the refactoring so that the system we're packaging isn't broken by the packaging work.

#### Acceptance Criteria

1. WHEN `npm run generate:platform-tokens` is run in the DesignerPunk repo THEN it SHALL produce identical output to the pre-refactoring version
2. WHEN `npm run prebuild` is run in the DesignerPunk repo THEN it SHALL complete successfully with no behavior change
3. WHEN `npm test` is run in the DesignerPunk repo THEN all existing test suites SHALL pass with no regressions
4. WHEN the generated `dist/DesignTokens.web.css` is compared to a pre-refactoring snapshot THEN it SHALL be byte-for-byte identical for the existing four theme contexts
5. WHEN component behavioral contract tests are run after the migration THEN all tests SHALL pass — confirming components render correctly with the refactored token system

---

### Requirement 7: Integration Guide Contribution

**User Story**: As a product developer reading the Integration Guide, I want clear documentation of pipeline setup and theme configuration so that I can integrate DesignerPunk without guessing.

#### Acceptance Criteria

1. WHEN this spec is complete THEN the Integration Guide draft (`docs/roadmap/integration-guide-draft.md`) SHALL be updated with actual pipeline configuration steps, theme creation workflow, and any prerequisites discovered during implementation
2. WHEN a TypeScript execution strategy is required for product repos THEN the guide SHALL document whether it's a package dependency or a product prerequisite
3. WHEN the `designerpunk.config.ts` pattern is finalized THEN the guide SHALL include a complete, copy-paste-ready example including `name`, `abbreviation`, and theme registration

---

### Requirement 8: Component Consumption Migration

**User Story**: As a platform component developer, I want DesignerPunk components to consume theme-varying tokens from the platform-native theme propagation mechanism so that components render correctly when a custom theme is applied.

#### Acceptance Criteria

1. WHEN an iOS component references a theme-varying color token THEN it SHALL read from `@Environment(\.{abbreviation}Theme)` instead of a static `DesignTokens` property
2. WHEN an Android component references a theme-varying color token THEN it SHALL read from the `CompositionLocal` theme provider instead of a static `DesignTokens` property
3. WHEN a theme is provided via `@Environment` on an ancestor SwiftUI view THEN all descendant DesignerPunk components SHALL render using that theme's token values
4. WHEN a theme is provided via `CompositionLocalProvider` on an ancestor composable THEN all descendant DesignerPunk composables SHALL render using that theme's token values
5. WHEN a component references a non-theme-varying token (spacing, sizing, radius, typography) THEN it SHALL continue using static `DesignTokens` references — no migration needed for static tokens
6. WHEN all iOS and Android components are migrated THEN the old static color token properties SHALL be removed from the generated output to prevent dual-pattern consumption

**Note**: This does not block M0a (web-only). It must be complete before M0b activates iOS and Android. Parallelizable with WS1.

---

## Documentation Requirements

This spec is primarily infrastructure refactoring. Documentation requirements:

1. The Integration Guide contribution (Requirement 7) serves as the developer-facing documentation
2. The `defineConfig` API SHALL include JSDoc comments explaining each configuration option
3. The `data-theme` attribute comment (future configurability note) SHALL be included in the config example
4. The generated Swift protocol and Kotlin data class SHALL include doc comments explaining the theme propagation pattern

**Waiver**: No component README or token family documentation required — this spec modifies infrastructure, not the component or token public API.

---

## Deferred Items

Items explicitly deferred from this spec's scope, with rationale and likely activation trigger.

| Item | Rationale | Activation Trigger | Source |
|------|-----------|-------------------|--------|
| `mode: 'light'` (light-only theme) | No current use case. Implement only if trivial alongside `'dark'` and `'both'`. | A product needs a light-only theme | Ada R1 on R2 AC 3 |
| `data-theme` attribute configurability | Adding a prefix later is non-breaking. No collision scenario exists today. | A product has a competing `data-theme` system | Peter decision, design outline § "Resolved Questions" |
| Tree-shaking / individual component exports | Full bundle for M0a. Multi-platform packaging in M0b changes the structure. | M0b scoping | North Star decision log |
| Token namespace collision prevention | Isolated repos mean no collision risk in Phase 1. | Product MCP aggregates across products, or tokens shared between products | Ada R2 (pre-launch feedback) |
| ThemeAwareBlendUtilities consolidation (iOS) | Existing `ThemeModeKey` can coexist with new theme environment during migration. | Post-R8 cleanup or M0b iOS work | Kenya R1 |
| Full Product MCP features (wish list) | Foundation only in Phase 1. Features grow from real usage. | M0b demands screen↔component lookup, state models, gap detection | Leo R2, Spec 081 discovery |
| Token coverage analysis against M0a screens | Gaps surface naturally during Phase 2 screen development. | Phase 2 start | Peter decision |
