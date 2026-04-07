# Design Document: Portable Token Pipeline & Theme Registry

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Status**: Design Phase
**Dependencies**: None (critical path)

---

## Overview

This spec transforms the token pipeline from a monolithic, repo-bound system into a portable, extensible ecosystem package. Two architectural changes: (1) replace the hardcoded theme system with a registry pattern, and (2) abstract all path assumptions so the pipeline runs from any project.

The changes touch four layers: theme registration, semantic override resolution, platform-specific generation (web/iOS/Android), and pipeline configuration. The sequencing is WS4 (registry + generators) → WS1 (portable pipeline) → R8 (component consumption migration).

---

## Architecture

### Current Flow

```
SemanticOverrides.ts (3 hardcoded files)
        ↓
generateTokenFiles.ts (hardcoded imports, manual ContextOverrideSet assembly)
        ↓
SemanticOverrideResolver (hardcoded 4 ThemeContext values)
        ↓
TokenFileGenerator → Platform Builders (CSS, Swift, Kotlin)
        ↓
dist/ (flat constants, no theme structure on iOS/Android)
```

### Target Flow

```
designerpunk.config.ts (explicit theme imports + registration)
        ↓
ThemeRegistry (dynamic, accepts any number of themes)
        ↓
SemanticOverrideResolver (iterates registered themes)
        ↓
TokenFileGenerator → Platform Builders (theme-aware output per platform)
        ↓
Configured output dir (CSS with data-theme scoping, Swift protocol + structs, Kotlin data class + instances)
```

---

## Components and Interfaces

### ThemeRegistry

New module. Central collection of registered themes.

```typescript
// src/themes/ThemeRegistry.ts

interface ThemeRegistration {
  name: string;                    // e.g., 'marketing', 'wcag'
  mode: 'dark' | 'light' | 'both';
  overrides: SemanticOverrideMap;
}

class ThemeRegistry {
  private themes: Map<string, ThemeRegistration> = new Map();

  register(theme: ThemeRegistration): void;  // throws on duplicate name or invalid override refs
  getAll(): ThemeRegistration[];
  get(name: string): ThemeRegistration | undefined;
  getThemeVaryingTokens(): Set<string>;      // union of all overridden token names
}
```

**Key behavior**: `getThemeVaryingTokens()` collects the union of all overridden token names across all registered themes. This set determines which tokens go into the theme-aware output (protocol/data class) vs staying as static constants.

### defineConfig

New module. Exported from `@designerpunk/core/config`.

```typescript
// src/config/defineConfig.ts

interface DesignerPunkConfig {
  name?: string;              // Product name → generated type names. Default: 'DesignerPunk'
  abbreviation?: string;      // Short form → environment keys. Default: 'DP'
  themes?: ThemeRegistration[];
  componentTokens?: string[]; // Directories to scan for *.tokens.ts
  output?: string;            // Output directory. Default: 'dist'
}

function defineConfig(config: DesignerPunkConfig): DesignerPunkConfig;
```

### ConfigLoader

New module. Loads `designerpunk.config.ts` from the working directory, falls back to defaults.

```typescript
// src/config/ConfigLoader.ts

class ConfigLoader {
  async load(cwd: string): Promise<ResolvedConfig>;
}

interface ResolvedConfig {
  name: string;
  abbreviation: string;
  themes: ThemeRegistration[];
  tokenSourceRoot: string;       // Resolved absolute path to token sources
  componentTokenDirs: string[];  // Resolved absolute paths
  outputDir: string;             // Resolved absolute path
}
```

**Path resolution strategy**: When running from a product repo, `tokenSourceRoot` resolves to the installed package location via `require.resolve('@designerpunk/core/package.json')`. When running from the DesignerPunk repo (no config or default config), it resolves to the repo root. Config-relative paths (themes, component tokens, output) resolve relative to the config file's directory.

### SemanticOverrideResolver (Modified)

The existing `resolveAllContexts` method currently takes a hardcoded `ContextOverrideSet` and iterates four `ThemeContext` values. It changes to accept the `ThemeRegistry` and iterate registered themes.

```typescript
// New structured return type (replaces string-keyed Map)
interface ResolvedThemeSet {
  theme: ThemeRegistration;
  resolvedTokens: SemanticToken[];
}

// Modified method
resolveForRegistry(
  tokens: SemanticToken[],
  registry: ThemeRegistry
): ResolvedThemeSet[];
```

Generators iterate the array and use `theme.name` and `theme.mode` to determine output structure. No string key parsing, no naming convention to maintain.

The existing `resolveAllContexts` method stays for backward compatibility — it's called internally with the base themes when no custom themes are registered.

**`GenerationOptions` interface change**: The current interface has four explicit token array properties (`semanticTokens`, `darkSemanticTokens`, `wcagSemanticTokens`, `darkWcagSemanticTokens`) plus `wcagOverrideKeys`. These change to accept `ResolvedThemeSet[]` instead. This ripples through `generatePlatformTokens`, `generateSemanticSection`, `maybeGenerateWcagBlock`, and anything that destructures the four named arrays. The WCAG block's special positioning logic (`wcagAfterFooter` config flag) must be generalized so every registered theme's override block gets correct positioning per platform.

### generateTokenFiles (Modified)

Currently hardcodes three override imports and manually assembles `ContextOverrideSet`. Changes to:

1. Load config via `ConfigLoader`
2. Register base themes + config themes in `ThemeRegistry`
3. Pass registry to resolver
4. Pass `ResolvedThemeSet[]` + config (name, abbreviation) to generators

### Platform Generators (Modified)

**Shared vs split**: The current `generatePlatformTokens` method handles all three platforms via a `platform` parameter. The theme-aware output structures are too different to share a single code path (CSS adds scoped blocks, Swift produces protocol + structs, Kotlin produces data class + instances). The method splits:

- `generatePlatformTokens` — **kept** for the static token portion (primitives + non-theme-varying semantics). Identical structure across platforms, just different syntax.
- `generateWebThemeBlocks` — **new**, produces `data-theme` scoped CSS rule sets
- `generateSwiftThemeTypes` — **new**, produces protocol + structs + EnvironmentKey
- `generateKotlinThemeTypes` — **new**, produces data class + instances + CompositionLocal

#### CSS Generator (TokenFileGenerator)

Currently produces one CSS file with four context blocks. Changes to produce one CSS file with:
- `:root { ... }` — base light theme (default, no attribute)
- `:root[data-theme="wcag"] { ... }` — per registered theme
- Theme-specific `color-scheme` declarations for dark-only themes

No structural change to the generator — it's adding output blocks per registered theme, same pattern as existing context blocks.

#### Swift Generator

Currently produces flat `struct DesignTokens` with `static let` constants. Changes to produce:

```swift
// Static tokens (unchanged)
struct DesignTokens {
  static let space100: CGFloat = 8
  // ... all non-theme-varying tokens
}

// Theme protocol (new)
protocol {Name}Theme {
  var colorActionPrimary: Color { get }
  // ... all theme-varying tokens
}

// Theme instances (new, one per registered theme)
struct {Name}BaseLight: {Name}Theme { ... }
struct {Name}BaseDark: {Name}Theme { ... }
struct {Name}Marketing: {Name}Theme { ... }

// Environment key (new)
struct {Abbreviation}ThemeKey: EnvironmentKey {
  static let defaultValue: any {Name}Theme = {Name}BaseLight()
}
```

Where `{Name}` and `{Abbreviation}` come from the config.

#### Kotlin Generator

Currently produces flat `object DesignTokens` with `const val` declarations. Changes to produce:

```kotlin
// Static tokens (unchanged)
object DesignTokens {
  const val space100: Float = 8f
  // ... all non-theme-varying tokens
}

// Theme data class (new)
data class {Name}Theme(
  val colorActionPrimary: Color,
  // ... all theme-varying tokens
)

// Theme instances (new)
object {Name}Themes {
  val BaseLight = {Name}Theme(...)
  val BaseDark = {Name}Theme(...)
  val Marketing = {Name}Theme(...)
}

// CompositionLocal (new)
val Local{Abbreviation}Theme = compositionLocalOf { {Name}Themes.BaseLight }
```

#### DTCG and Figma Generators

The pipeline currently generates `DesignTokens.dtcg.json` and `DesignTokens.figma.json`. These outputs must include themed values when custom themes are registered, or they'll produce incomplete output.

**DTCG**: Each registered theme's overrides are included using the DTCG `$extensions` mechanism for theme metadata. Theme-varying tokens include per-theme values.

**Figma**: Variable modes map to themes. Each registered theme becomes an additional mode in the Figma output.

**Scope**: Include in WS4 alongside the CSS/Swift/Kotlin generator changes. The DTCG and Figma generators follow the same pattern — iterate `ResolvedThemeSet[]` and produce themed output. Deferring them would leave the build producing incomplete artifacts.

---

## Data Models

### Theme Registration

```typescript
interface ThemeRegistration {
  name: string;
  mode: 'dark' | 'light' | 'both';
  overrides: SemanticOverrideMap;  // Existing type, unchanged
}
```

### Resolved Config

```typescript
interface ResolvedConfig {
  name: string;
  abbreviation: string;
  themes: ThemeRegistration[];
  tokenSourceRoot: string;
  componentTokenDirs: string[];
  outputDir: string;
}
```

### Theme-Varying Token Set

Not a persisted data model — computed at build time by `ThemeRegistry.getThemeVaryingTokens()`. The set of token names that appear in any registered theme's overrides. Used by all three platform generators to split output into static vs theme-aware sections.

---

## Correctness Properties

1. **Registry migration produces identical output.** After migrating existing themes to the registry, all platform outputs (CSS, Swift, Kotlin, DTCG, Figma) are byte-for-byte identical to pre-migration output. Verified by snapshot comparison.

2. **Theme-varying determination is deterministic.** The same set of registered themes always produces the same theme-varying token set. No ordering dependency, no race conditions.

3. **Config absence equals current behavior.** Running the pipeline with no `designerpunk.config.ts` produces identical output to the current hardcoded pipeline. The default config is the current repo structure.

4. **Path resolution is platform-agnostic.** The pipeline resolves paths using Node.js `path` module and `require.resolve`, not string concatenation with `/` or `\`.

5. **Theme scoping is subtree-isolated.** On web, a `data-theme` attribute on an element only affects that element's descendants. On iOS/Android, environment/CompositionLocal providers scope to their subtree. No global side effects.

6. **Web components are unaffected by the registry migration.** Web components consume CSS custom properties. The registry migration changes how those properties are generated but not their names, values, or scoping. No web component code changes are needed for WS4 or WS1. R8 applies only to iOS and Android.

---

## Known Limitations

1. **Theme-varying determination is direct, not transitive.** The pipeline identifies theme-varying tokens by checking which tokens are explicitly overridden in registered themes. It does not trace reference chains. Shadow tokens that reference theme-varying color primitives will use base values on iOS/Android because the shadow token itself isn't in the override set. On web this is a non-issue (CSS custom properties resolve at render time). No current theme overrides shadow colors. If a future theme needs themed shadows, either add the shadow tokens to the override set explicitly, or implement transitive resolution.

2. **R8 migration is not pure find-and-replace.** iOS components use local `enum` types with `static let` properties, and Android components use `private object` with `val` properties. Static properties can't access `@Environment`/`CompositionLocal`. The migration requires three steps per component: (1) add theme environment property, (2) move color token references from static enum/object to view/composable body, (3) clean up empty enums/objects. Watch for components that pass color tokens as constructor parameters to child components — the parameter type may need to change.

---

## Error Handling

| Error | When | Response |
|-------|------|----------|
| Duplicate theme name | `ThemeRegistry.register()` | Throw with message: "Theme '{name}' is already registered" |
| Invalid semantic token reference | `ThemeRegistry.register()` | Throw with message: "Theme '{name}' references unknown semantic token '{tokenName}'" |
| Invalid primitive reference in override | `SemanticOverrideResolver` validation | Throw with message: "Theme '{name}' override for '{tokenName}' references unknown primitive '{primitiveName}'" |
| Config file not found | `ConfigLoader.load()` | Use default config (not an error) |
| Config file has syntax error | `ConfigLoader.load()` | Throw with file path and TypeScript error |
| Output directory not writable | Generation | Throw with path and OS error |
| Package not found (product repo) | `require.resolve('@designerpunk/core/...')` | Throw with message: "@designerpunk/core not found — run npm install" |

---

## Testing Strategy

### WS4: Theme Registry + Generators

**Registry unit tests:**
- Register, iterate, get, duplicate rejection, invalid override rejection
- `getThemeVaryingTokens()` returns correct union across multiple themes

**Resolver tests:**
- Existing four-context resolution produces identical output through registry
- New theme registration produces correct additional context

**CSS snapshot test:**
- Capture `dist/DesignTokens.web.css` before refactoring
- Assert byte-for-byte identical after registry migration
- Same for Swift and Kotlin outputs

**Swift generator tests:**
- Protocol generated with correct theme-varying properties
- Struct per theme with correct values
- EnvironmentKey with correct default
- Static tokens unchanged

**Kotlin generator tests:**
- Data class generated with correct theme-varying properties
- Instance per theme with correct values
- CompositionLocal with correct default
- Static tokens unchanged

### WS1: Portable Pipeline

**Config loading tests:**
- Default config when no file exists
- Custom config loaded and resolved
- Path resolution from product repo context (simulated)

**Integration test:**
- Create a temp directory simulating a product repo
- Place a `designerpunk.config.ts` with a test theme
- Run the pipeline
- Assert themed output generated correctly

### R8: Component Consumption Migration

**Per-component verification:**
- iOS: component reads from `@Environment` instead of static `DesignTokens`
- Android: component reads from `CompositionLocal` instead of static `DesignTokens`
- Static token references (spacing, sizing) unchanged

**Post-migration regression:**
- All existing component behavioral contract tests pass
- All existing component unit tests pass

---

## Design Decisions

### Decision 1: TypeScript Config over YAML

**Options Considered**: YAML config, package.json key, TypeScript config
**Decision**: TypeScript (`designerpunk.config.ts`)
**Rationale**: Same language as pipeline and theme overrides. Explicit imports eliminate directory walking. Pattern established by Vite, Jest. Theme registration is engineering-led work (North Star source layer).
**Trade-offs**: Higher barrier than YAML for non-engineers. Requires TypeScript execution in product repos (`ts-node` or equivalent).

### Decision 2: Explicit Registration over Auto-Discovery

**Options Considered**: Directory walking with naming conventions, explicit import in config
**Decision**: Explicit registration via config imports
**Rationale**: No implicit coupling. Config file IS the registry. Predictable, auditable. Auto-discovery creates "what does a theme look like on disk" ambiguity.
**Trade-offs**: More manual setup per theme. Less "magical" onboarding experience.

### Decision 3: `data-theme` Only, No `data-mode`

**Options Considered**: Separate `data-theme` + `data-mode` attributes, single `data-theme`
**Decision**: Single `data-theme` attribute. Mode handled by `light-dark()` CSS function.
**Rationale**: Matches existing system exactly. `light-dark()` already handles mode switching. Adding `data-mode` would introduce a parallel mechanism with no benefit. (Lina R1 caught this — Ada R2 withdrew the `data-mode` recommendation.)
**Trade-offs**: If a future theme needs mode control beyond `light-dark()`, we'd add `data-mode` then.

### Decision 4: Product Name in Generated Types

**Options Considered**: `Dp` prefix, `DesignerPunk` prefix, product name from config
**Decision**: Product name + abbreviation from config (`{Name}Theme`, `{Abbreviation}ThemeKey`)
**Rationale**: Generated code feels product-native, not dependency-branded. Solves `Dp`/density-pixel collision on Android. Good infrastructure disappears into the product.
**Trade-offs**: Requires `name`/`abbreviation` in config. Default (`DesignerPunk`/`DP`) works for the core repo.

### Decision 5: Migrate First, Extend Second

**Options Considered**: Refactor and add new features simultaneously, sequential migration then extension
**Decision**: Sequential — migrate existing themes to registry with identical output, then add new capabilities
**Rationale**: Byte-for-byte identical output after migration is the strongest regression guarantee. Mixing refactoring with new features makes failures ambiguous (is it the refactoring or the new feature?).
**Trade-offs**: Two passes over the same code. Slightly slower, significantly safer.

---

## Integration Points

### Downstream (this spec provides to)

| Consumer | What | Interface |
|----------|------|-----------|
| Block B (WS2) | `@designerpunk/core/config` export, pipeline files in package | Package `exports` and `files` |
| Block C (WS3) | Pipeline output location | `ResolvedConfig.outputDir` |
| Block C (WS7) | Token source structure | Same sources the pipeline walks |
| Phase 2 | Theme creation workflow | `designerpunk.config.ts` + `SemanticOverrides.ts` |

### Upstream (this spec depends on)

None — this is the critical path.
