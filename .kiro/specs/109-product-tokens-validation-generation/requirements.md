# Requirements Document: Product Tokens — Reference Validation & Platform Generation

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Status**: Requirements Phase
**Dependencies**: Spec 108 (complete)

---

## Introduction

Product tokens have a structured YAML source format and are queryable via the Product MCP (Spec 108). This spec delivers the generation pipeline that transforms that source into platform-native output (CSS, Swift, Kotlin) and provides proactive reference validation as a CLI command.

The generation is deliberately simpler than system token generation — no mathematical validation, no formula evaluation. Product tokens are lighter by design. The generator reads YAML, resolves refs against the token-index, and emits platform-appropriate constants.

---

## Requirements

### Requirement 1: Reference Validation CLI Command

**User Story**: As a product agent or CI pipeline, I want to validate that all product token references point to existing system tokens, so that broken refs are caught before they reach generated output.

#### Acceptance Criteria

1. The CLI SHALL expose a `validate --product-tokens` command
2. WHEN invoked THEN it SHALL read all `product/tokens/*.yaml` files from the path specified in `designerpunk.config.ts`
3. WHEN a `ref` value is not found in any token-index file (primitives, semantics, components) THEN it SHALL report the broken ref with token name, ref value, and source file
4. WHEN all refs are valid THEN it SHALL exit with code 0 and report success per category file
5. WHEN one or more refs are broken THEN it SHALL exit with code 1 and report all broken refs
6. The output SHALL include an actionable hint: "Run `npx designerpunk generate` to refresh token-index"
7. WHEN `productTokens` is not configured in `designerpunk.config.ts` THEN it SHALL report "No productTokens path configured" and exit 0
8. WHEN a YAML file has a parse error THEN it SHALL report the parse error separately from ref validation and continue checking other files
9. WHEN a YAML file contains zero tokens THEN it SHALL report "0 tokens" for that file (not skip silently)
10. WHEN invoked without `--product-tokens` flag THEN the existing system token validation SHALL run unchanged (backward compatible)

### Requirement 2: Platform Code Generation — Web (CSS)

**User Story**: As a web platform agent, I want product tokens generated as CSS custom properties, so that I can consume them via `var()` in stylesheets.

#### Acceptance Criteria

1. The generator SHALL produce `dist/product/ProductTokens.web.css`
2. All product tokens with `platforms` including `web` SHALL appear in the output
3. Tokens with `platforms` NOT including `web` SHALL be excluded from the output
4. Hard-value tokens SHALL emit the value with platform-appropriate unit based on `unitType` (e.g., `logical` → `px`, `duration` → `ms`, `ch` → `ch`, `color` → raw value as authored, `ratio`/`count` → unitless, `percent` → `%`)
5. Ref tokens SHALL emit `var({platform-web-name})` where the platform name is read from the token-index `platforms.web` field (includes `--` prefix)
6. Token names SHALL use `--product-{category}-{kebab-name}` convention, derived via `PlatformNamingRules`
7. Tokens SHALL be grouped by category with a comment header per category
8. Each token SHALL include its `description` as an inline comment
9. All tokens SHALL be declared within a `:root` block (no `color-scheme` declaration — inherits from system token stylesheet)
10. WHEN a ref cannot be resolved THEN the output SHALL emit a commented-out declaration with a warning: `/* ⚠️ UNRESOLVED */ --product-{name}: initial;`
11. The file SHALL include a generated-file header comment with timestamp and "do not edit" warning

### Requirement 3: Platform Code Generation — iOS (Swift)

**User Story**: As an iOS platform agent, I want product tokens generated as Swift constants, so that I can reference them in SwiftUI implementations.

#### Acceptance Criteria

1. The generator SHALL produce `dist/product/ProductTokens.ios.swift`
2. All product tokens with `platforms` including `ios` SHALL appear in the output
3. Tokens with `platforms` NOT including `ios` SHALL be excluded
4. The file SHALL import `UIKit` (matching system token output for type consistency)
5. Each category SHALL be a `public enum` with PascalCase name (hyphens removed and capitalized: `layout-grid` → `ProductLayoutGrid`)
6. Hard-value tokens SHALL emit `public static let {name}: {SwiftType} = {value}` with type based on `unitType` (`logical` → `CGFloat`, `duration` → `TimeInterval`, `count` → `Int`, `ratio` → `CGFloat`, `percent` → `CGFloat` as 0-1, `color` → `UIColor` using the same initializer pattern as system tokens)
7. Ref tokens SHALL emit `public static let {name}: {SwiftType} = DesignTokens.{platform-ios-name}` where the platform name is the full qualified path read from the token-index `platforms.ios` field (may include namespace nesting, e.g., `Duration.duration350`)
8. Duration values in milliseconds SHALL be converted to seconds (÷ 1000) for `TimeInterval`
9. Percent values (0-100) SHALL be converted to 0-1 range for `CGFloat`
10. The file SHALL include a generated-file header comment with timestamp and "do not edit" warning

### Requirement 4: Platform Code Generation — Android (Kotlin)

**User Story**: As an Android platform agent, I want product tokens generated as Kotlin constants, so that I can reference them in Jetpack Compose implementations.

#### Acceptance Criteria

1. The generator SHALL produce `dist/product/ProductTokens.android.kt`
2. All product tokens with `platforms` including `android` SHALL appear in the output
3. Tokens with `platforms` NOT including `android` SHALL be excluded
4. The file SHALL use package `com.designerpunk.product.tokens`
5. Each category SHALL be a Kotlin `object` with PascalCase name (same rule as Swift)
6. Hard-value tokens SHALL emit `val {name} = {value}{suffix}` with suffix based on `unitType` (`logical` → `.dp`, `duration` → plain Int with `// ms` comment, `count` → plain Int, `ratio` → `f`, `percent` → `f` as 0-1, `color` → `Color(0xFF{hex})` matching system token pattern)
7. Ref tokens SHALL emit `val {name} = DesignTokens.{platform-android-name}` where the platform name is the full qualified path read from the token-index `platforms.android` field (may include namespace nesting, e.g., `Duration.Duration350`)
8. Percent values (0-100) SHALL be converted to 0-1 range
9. The file SHALL include required imports based on token types present: `import com.designerpunk.tokens.DesignTokens`, `import androidx.compose.ui.unit.dp` (when logical tokens exist), `import androidx.compose.ui.graphics.Color` (when color tokens exist), `import androidx.compose.runtime.Composable` + `import androidx.compose.runtime.ReadOnlyComposable` + `import com.designerpunk.tokens.Local{Abbreviation}Theme` (when theme-varying refs exist)
10. The file SHALL include a generated-file header comment with timestamp and "do not edit" warning

### Requirement 5: Pipeline Integration

**User Story**: As a product developer, I want product token generation integrated into the existing `npx designerpunk generate` command, so that product tokens are generated alongside system tokens in a single build step.

#### Acceptance Criteria

1. `designerpunk.config.ts` SHALL accept a `productTokens` field (string path to the product tokens YAML directory)
2. WHEN `productTokens` is configured AND the directory exists THEN `npx designerpunk generate` SHALL generate product token output after system token generation
3. WHEN `productTokens` is not configured THEN generation SHALL skip product tokens silently (no error)
4. WHEN `productTokens` path does not exist THEN generation SHALL warn and skip (not fail)
5. Generation SHALL validate all refs against the freshly-generated token-index before emitting
6. WHEN broken refs are found during generation THEN the system SHALL warn but NOT block system token output
7. WHEN broken refs are found THEN the generated file SHALL include a warning comment for each unresolved ref
8. Generation SHALL report a summary: token count, category count, broken ref count per platform file

### Requirement 6: Promotion Candidate Queryability

**User Story**: As a governance agent conducting Lessons Synthesis Reviews, I want to query product tokens filtered by `promotionCandidate`, so that I can identify tokens flagged for potential system promotion.

#### Acceptance Criteria

1. The `get_product_tokens` tool SHALL accept a `promotionCandidate` boolean filter parameter
2. WHEN `promotionCandidate: true` is passed THEN it SHALL return only tokens where `promotionCandidate` is true in the source YAML
3. WHEN `promotionCandidate` filter is combined with other filters THEN they SHALL be applied conjunctively

### Requirement 7: Token-Index Format Extension

**User Story**: As the product token generator, I want the token-index to store full qualified platform paths for all tokens, so that ref resolution doesn't require consumer-side namespace guessing.

#### Acceptance Criteria

1. The token-index generation pipeline SHALL store full qualified platform paths in the `platforms` field (e.g., `ios: Duration.duration150` not `ios: duration150` for tokens nested in sub-namespaces)
2. Tokens in flat namespaces SHALL be unaffected (e.g., `ios: space300` remains unchanged)
3. The Application MCP's `TokenIndexer` SHALL continue to function correctly with the updated format
4. The Product MCP's `TokenRefResolver` SHALL continue to function correctly with the updated format
5. For component tokens, the `platforms` field SHALL store the fully qualified access path including the component namespace (e.g., `ios: ButtonIconTokens.insetLarge`, `android: ButtonIconTokens.inset_large`)
6. The index generator SHALL determine qualified paths using the same namespace structure as platform generators: (a) primitive and semantic tokens use the flat property name (under `DesignTokens`), (b) component tokens use `{Component}Tokens.{propertyName}`, (c) theme-varying semantic tokens use the `theme.{propertyName}` prefix
7. WHEN a product token refs a component token THEN the generated iOS/Android output SHALL use the component namespace (e.g., `ButtonIconTokens.insetLarge`), NOT `DesignTokens.*`

### Requirement 8: Theme-Varying Reference Handling

**User Story**: As a platform agent consuming generated product tokens, I want refs to theme-varying system tokens to emit the correct theme-aware access pattern, so that generated code compiles and responds to theme changes.

#### Acceptance Criteria

1. WHEN a product token refs a system token with `themeVarying: true` in the token-index THEN the generator SHALL emit a theme-aware access pattern instead of a static constant
2. The Product MCP's `get_product_tokens` response SHALL include a `themeVarying: boolean` field on resolved refs, indicating whether the referenced system token varies by theme
3. WHEN a product token refs a theme-varying token THEN the CSS output SHALL emit `var({platform-web-name})` (unchanged — CSS custom properties handle theming via cascade)
4. WHEN a product token refs a theme-varying token THEN the Swift output SHALL emit a computed property as an extension on the system theme protocol (e.g., `public extension DesignerPunkTheme { var product{Name}: Color { {systemPropertyName} } }`) — using the existing `@Environment(\.dpTheme)` infrastructure, no new EnvironmentKey or protocol required
5. WHEN a product token refs a theme-varying token THEN the Kotlin output SHALL emit a `@Composable @ReadOnlyComposable get()` property (e.g., `val {name}: Color @Composable @ReadOnlyComposable get() = Local{Abbreviation}Theme.current.{androidPropertyName}`)
6. Theme-varying product tokens in Swift SHALL be grouped in a separate section of the generated file (protocol extension) distinct from static tokens (enum constants)
7. Theme-varying product token properties on the theme protocol SHALL use a `product` prefix followed by category and token name (e.g., `productLayoutDangerZoneBackground`) to cluster in autocomplete and prevent namespace pollution with system theme properties
7. Theme-varying product tokens in Kotlin SHALL use `@Composable` getter syntax within the same category object as static tokens
8. The generated file SHALL include required imports for theme-varying patterns (`import SwiftUI` for iOS; `import androidx.compose.runtime.Composable`, `import androidx.compose.runtime.ReadOnlyComposable`, and `import com.designerpunk.tokens.Local{Abbreviation}Theme` for Android)
9. The theme protocol name SHALL be derived from the config `name` field (e.g., `DesignerPunk` → `DesignerPunkTheme`). The EnvironmentKey and composition local name SHALL be derived from `abbreviation` (e.g., `DP` → `.dpTheme`, `LocalDPTheme`). The product generator extends the existing protocol — it does not create new theme infrastructure.
10. Swift theme-varying computed properties SHALL return `self.{resolvedSystemPropertyName}` where the system property name is the existing property on the theme protocol that the ref resolves to

### Requirement 9: Generation Pipeline Index Freshness

**User Story**: As a product developer, I want `npx designerpunk generate` to ensure the token-index is fresh before generating product tokens, so that one command produces complete, correct output.

#### Acceptance Criteria

1. WHEN `npx designerpunk generate` is invoked with `productTokens` configured THEN it SHALL regenerate the token-index before product token generation
2. The generation flow SHALL be: system tokens → token-index → product tokens (sequential, guaranteed fresh)
3. The validate command hint SHALL accurately reflect how to refresh the index
