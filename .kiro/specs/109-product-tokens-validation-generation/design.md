# Design Document: Product Tokens — Reference Validation & Platform Generation

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Status**: Design Phase
**Dependencies**: Spec 108 (complete)

---

## Overview

This design implements the product token generation pipeline: a standalone generator that reads product token YAML, resolves refs against the token-index, and emits platform-native output (CSS, Swift, Kotlin). It also delivers a validation CLI command, token-index format extension for qualified paths, theme-varying ref handling, and a `promotionCandidate` filter for governance.

---

## Architecture

```
designerpunk.config.ts
        │ (productTokens path)
        ▼
┌─────────────────────────────────────────────────────────────┐
│  npx designerpunk generate                                   │
│                                                              │
│  1. System tokens (existing)                                 │
│  2. Token-index regeneration (Req 9)                         │
│  3. ProductTokenGenerator                                    │
│     ├── reads product/tokens/*.yaml                          │
│     ├── reads token-index/ (qualified paths + themeVarying)  │
│     ├── validates refs                                       │
│     └── emits:                                               │
│         ├── dist/product/ProductTokens.web.css               │
│         ├── dist/product/ProductTokens.ios.swift             │
│         └── dist/product/ProductTokens.android.kt            │
└─────────────────────────────────────────────────────────────┘
```

---

## Components and Interfaces

### ProductTokenGenerator

Location: `src/build/product/ProductTokenGenerator.ts`

```typescript
interface GeneratorConfig {
  productTokensDir: string;
  tokenIndexDir: string;
  outputDir: string;       // e.g., 'dist/product'
  configName: string;      // e.g., 'DesignerPunk' → protocol name
  configAbbreviation: string; // e.g., 'DP' → LocalDPTheme
}

interface GenerationResult {
  tokenCount: number;
  categoryCount: number;
  brokenRefs: { token: string; ref: string; file: string }[];
  filesWritten: string[];
}

class ProductTokenGenerator {
  constructor(config: GeneratorConfig);

  /** Full generation: parse → resolve → validate → emit all platforms */
  generate(): GenerationResult;

  /** Validation only (for CLI validate command) */
  validate(): ValidationResult;
}
```

### TokenIndexReader

Location: `src/build/product/TokenIndexReader.ts`

Lightweight reader for the token-index. Simpler than the Product MCP's `TokenRefResolver` — focused on what the generator needs: platform path + themeVarying status.

```typescript
interface IndexEntry {
  platforms: { web: string; ios: string; android: string };
  themeVarying: boolean;
  family?: string;    // primitives
  category?: string;  // semantics
  component?: string; // components
}

class TokenIndexReader {
  private entries: Map<string, IndexEntry>;

  constructor(tokenIndexDir: string);
  load(): void;
  lookup(canonicalName: string): IndexEntry | null;
}
```

### Platform Emitters

Location: `src/build/product/emitters/`

Each emitter is a pure function: takes parsed tokens + resolved refs → returns file content string.

```typescript
// src/build/product/emitters/WebEmitter.ts
function emitCSS(categories: ResolvedCategory[], config: GeneratorConfig): string;

// src/build/product/emitters/SwiftEmitter.ts
function emitSwift(categories: ResolvedCategory[], config: GeneratorConfig): string;

// src/build/product/emitters/KotlinEmitter.ts
function emitKotlin(categories: ResolvedCategory[], config: GeneratorConfig): string;
```

### Shared Types

```typescript
interface ResolvedToken {
  name: string;
  value: number | string | null;
  unitType: string | null;
  ref: string | null;
  resolvedPlatformPath: { web: string; ios: string; android: string } | null;
  themeVarying: boolean;
  description: string;
  platforms: string[];
}

interface ResolvedCategory {
  name: string;
  description: string;
  tokens: ResolvedToken[];
}
```

---

## Token-Index Format Extension (Req 7)

### Changes to `scripts/generate-token-index.ts`

The index generator currently calls platform-specific `getTokenName()` which returns flat names. The extension adds namespace qualification:

```typescript
// Current: ios: 'duration150'
// New:     ios: 'Duration.duration150'

function getQualifiedPlatformPath(token, tier: 'primitive' | 'semantic' | 'component'): PlatformPaths {
  const basePaths = getBasePlatformNames(token); // existing logic

  if (tier === 'component') {
    // Component tokens: {ComponentName}Tokens.{propertyName}
    const componentName = token.component; // e.g., 'Button-Icon'
    const enumName = toComponentEnumName(componentName); // e.g., 'ButtonIconTokens'
    return {
      web: basePaths.web, // CSS is flat (--buttonicon-inset-large)
      ios: `${enumName}.${basePaths.ios}`,
      android: `${enumName}.${basePaths.android}`,
    };
  }

  if (tier === 'semantic' && token.themeVarying) {
    // Theme-varying: theme.{propertyName}
    return {
      web: basePaths.web, // CSS unchanged
      ios: `theme.${basePaths.ios}`,
      android: `theme.${basePaths.android}`,
    };
  }

  if (tier === 'primitive' && isNestedFamily(token.family)) {
    // Duration, Easing, Scale → nested namespace
    const namespace = getNamespaceForFamily(token.family); // 'Duration', 'Easing', 'Scale'
    return {
      web: basePaths.web, // CSS is flat
      ios: `${namespace}.${basePaths.ios}`,
      android: `${namespace}.${basePaths.android}`,
    };
  }

  // Default: flat (spacing, color, opacity, etc.)
  return basePaths;
}

function isNestedFamily(family: string): boolean {
  // Derived from TokenFileGenerator.DEDICATED_PRIMITIVE_CATEGORIES to prevent drift
  return ['duration', 'easing', 'scale'].includes(family);
}
```

---

## Platform Generation Logic

### Web (CSS) Emitter

```typescript
function emitCSS(categories: ResolvedCategory[], config: GeneratorConfig): string {
  const lines: string[] = [];
  lines.push(`/* Product tokens — generated ${new Date().toISOString()} */`);
  lines.push(`/* Do not edit manually. Source: product/tokens/*.yaml */`);
  lines.push('');
  lines.push(':root {');

  for (const category of categories) {
    const webTokens = category.tokens.filter(t => t.platforms.includes('web'));
    if (webTokens.length === 0) continue;

    lines.push(`  /* Product tokens: ${category.name} */`);
    for (const token of webTokens) {
      const cssName = `--product-${kebabCase(category.name)}-${camelToKebab(token.name)}`;
      const value = token.ref
        ? (token.resolvedPlatformPath ? `var(${token.resolvedPlatformPath.web})` : 'initial')
        : formatCSSValue(token.value, token.unitType);
      const comment = token.description ? ` /* ${token.description} */` : '';
      const warning = (token.ref && !token.resolvedPlatformPath) ? '/* ⚠️ UNRESOLVED */ ' : '';
      lines.push(`  ${warning}${cssName}: ${value};${comment}`);
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}
```

### Swift Emitter

```typescript
function emitSwift(categories: ResolvedCategory[], config: GeneratorConfig): string {
  const lines: string[] = [];
  const themeName = `${config.configName}Theme`; // e.g., 'DesignerPunkTheme'

  const hasStaticColors = /* check if any non-theme-varying color tokens exist */;
  const hasThemeVarying = /* check if any theme-varying tokens exist */;

  // Conditional imports
  if (hasStaticColors) lines.push(`import UIKit`); // UIColor for static color tokens
  if (hasThemeVarying) lines.push(`import SwiftUI`); // Color for theme-varying protocol extension
  if (!hasStaticColors && !hasThemeVarying) lines.push(`import UIKit`); // CGFloat needs Foundation/UIKit
  lines.push('');
  lines.push(`// Product tokens — generated ${new Date().toISOString()}`);
  lines.push(`// Do not edit manually. Source: product/tokens/*.yaml`);
  lines.push('');

  // Static tokens (non-theme-varying)
  for (const category of categories) {
    const iosTokens = category.tokens.filter(t => t.platforms.includes('ios') && !t.themeVarying);
    if (iosTokens.length === 0) continue;

    const enumName = `Product${toPascalCase(category.name)}`;
    lines.push(`public enum ${enumName} {`);
    for (const token of iosTokens) {
      // Static colors use UIColor (matching system token output)
      const { type, value } = formatSwiftValue(token); // color → UIColor
      lines.push(`    public static let ${token.name}: ${type} = ${value}`);
    }
    lines.push('}');
    lines.push('');
  }

  // Theme-varying tokens (protocol extension — returns SwiftUI Color)
  const themeTokens = categories.flatMap(c =>
    c.tokens.filter(t => t.platforms.includes('ios') && t.themeVarying)
      .map(t => ({ ...t, category: c.name }))
  );

  if (themeTokens.length > 0) {
    lines.push(`// Theme-varying product tokens — access via @Environment(\\.dpTheme)`);
    lines.push(`public extension ${themeName} {`);
    for (const token of themeTokens) {
      const propName = `product${toPascalCase(token.category)}${capitalize(token.name)}`;
      const systemProp = token.resolvedPlatformPath?.ios?.replace('theme.', '') || 'unknown';
      lines.push(`    /// ${token.description}`);
      lines.push(`    var ${propName}: Color { self.${systemProp} }`);
    }
    lines.push('}');
  }

  return lines.join('\n');
}
```

**Key decisions:**
- Static color tokens use `UIColor` (consistency with system token output)
- Theme-varying tokens return SwiftUI `Color` (protocol extension on theme protocol)
- `import UIKit` only when static colors or CGFloat tokens exist; `import SwiftUI` only when theme-varying tokens exist
- Protocol extension targets the protocol itself (`DesignerPunkTheme`), not a concrete struct — ensures autocomplete works for `any DesignerPunkTheme`
- `self.` prefix on computed property body per Req 8 AC10

### Kotlin Emitter

```typescript
function emitKotlin(categories: ResolvedCategory[], config: GeneratorConfig): string {
  const lines: string[] = [];
  const localTheme = `Local${config.configAbbreviation}Theme`;

  lines.push(`package com.designerpunk.product.tokens`);
  lines.push('');
  // Conditional imports based on token types present
  lines.push(`import com.designerpunk.tokens.DesignTokens`);
  if (hasLogicalTokens) lines.push(`import androidx.compose.ui.unit.dp`);
  if (hasColorTokens) lines.push(`import androidx.compose.ui.graphics.Color`);
  if (hasThemeVarying) {
    lines.push(`import androidx.compose.runtime.Composable`);
    lines.push(`import androidx.compose.runtime.ReadOnlyComposable`);
    lines.push(`import com.designerpunk.tokens.${localTheme}`);
  }
  lines.push('');
  lines.push(`// Product tokens — generated ${new Date().toISOString()}`);
  lines.push(`// Do not edit manually. Source: product/tokens/*.yaml`);
  if (hasThemeVarying) {
    lines.push(`// Note: Theme-varying tokens use @Composable getters — must be read inside composition scope.`);
  }
  lines.push('');

  for (const category of categories) {
    const androidTokens = category.tokens.filter(t => t.platforms.includes('android'));
    if (androidTokens.length === 0) continue;

    const objectName = `Product${toPascalCase(category.name)}`;
    lines.push(`object ${objectName} {`);
    for (const token of androidTokens) {
      if (token.themeVarying) {
        const prop = token.resolvedPlatformPath?.android?.replace('theme.', '') || 'unknown';
        lines.push(`    val ${token.name}: Color`);
        lines.push(`        @Composable @ReadOnlyComposable get() = ${localTheme}.current.${prop}`);
      } else {
        const value = formatKotlinValue(token);
        lines.push(`    val ${token.name} = ${value}`);
      }
    }
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}
```

**Key decisions:**
- Theme-varying tokens use `@Composable @ReadOnlyComposable get()` — must be read inside composition scope
- Generated file includes a comment noting this constraint for developer awareness
- Static tokens use plain `val` (no `const val` — `.dp` and `Color()` are runtime values)

---

## CLI Integration

### Validate Command

Location: `src/cli/validateProductTokens.ts` (new file, separate from system validation)

```typescript
export async function runValidateProductTokens(config: DesignerPunkConfig): Promise<void> {
  if (!config.productTokens) {
    console.log('No productTokens path configured');
    process.exit(0);
  }

  const generator = new ProductTokenGenerator({
    productTokensDir: config.productTokens,
    tokenIndexDir: 'token-index',
    outputDir: 'dist/product',
    configName: config.name || 'DesignerPunk',
    configAbbreviation: config.abbreviation || 'DP',
  });

  const result = generator.validate();
  // Report per-file results, exit 0 or 1
}
```

Routing in `src/cli/designerpunk.ts`:
```typescript
case 'validate':
  if (args.includes('--product-tokens')) {
    await runValidateProductTokens(config);
  } else {
    await runValidate(); // existing system validation
  }
  break;
```

### Generate Integration

In the existing generate flow (after system tokens + token-index):

```typescript
// After system token generation and token-index generation:
if (config.productTokens && fs.existsSync(config.productTokens)) {
  const generator = new ProductTokenGenerator({ ... });
  const result = generator.generate();
  reportProductTokenSummary(result);
}
```

---

## Config Extension

```typescript
// In src/config/defineConfig.ts
export interface DesignerPunkConfig {
  // ... existing fields ...
  /** Path to product token YAML directory. When set, product tokens are generated alongside system tokens. */
  productTokens?: string;
}
```

---

## Product MCP Enhancements (Req 6 + Req 8 AC2)

### promotionCandidate Filter

In `ProductTokenIndexer.query()`:

```typescript
if (filters.promotionCandidate !== undefined) {
  tokens = tokens.filter(t => t.promotionCandidate === filters.promotionCandidate);
}
```

Tool registration update — add parameter:
```typescript
promotionCandidate: { type: 'boolean', description: 'Filter to tokens flagged as promotion candidates' }
```

### themeVarying Field in Response

In `ProductTokenIndexer`, when resolving refs, read `themeVarying` from the token-index entry and include it in the response:

```typescript
interface ProductTokenEntry {
  // ... existing fields ...
  themeVarying: boolean; // true if ref points to a theme-varying system token
}
```

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| `productTokens` not in config | Skip silently (generate), report and exit 0 (validate) |
| `productTokens` path doesn't exist | Warn and skip (generate), report and exit 0 (validate) |
| YAML parse error | Report error, continue other files, exclude from output |
| Broken ref during generation | Warn, emit `initial`/comment in output, include in summary |
| Broken ref during validation | Report, exit 1 |
| Token-index missing | Warn, all refs unresolved, generate with `initial` values |
| Theme-varying ref on web | No special handling (CSS cascade handles it) |
| Theme-varying ref on iOS/Android | Emit theme-aware pattern (protocol extension / composable getter) |

---

## Testing Strategy

### Unit Tests

- `ProductTokenGenerator.test.ts` — end-to-end generation from fixture YAML
- `TokenIndexReader.test.ts` — loading, lookup, qualified paths, missing entries
- `WebEmitter.test.ts` — CSS output format, ref resolution, unresolved fallback, platform filtering
- `SwiftEmitter.test.ts` — enum structure, type mappings, theme-varying protocol extension, duration conversion
- `KotlinEmitter.test.ts` — object structure, type mappings, composable getters, imports
- `validateProductTokens.test.ts` — CLI output, exit codes, edge cases

### Integration Tests

- `Spec109-ProductTokenGeneration.test.ts` — full pipeline: config → generate → validate output files
- Token-index format extension: verify existing consumers (Application MCP, Product MCP) still work

### Fixtures

- `product/tokens/layout.yaml` — static refs + hard values
- `product/tokens/motion.yaml` — duration refs (nested namespace)
- `product/tokens/visualization.yaml` — color hard values + theme-varying refs
- `product/tokens/broken.yaml` — unresolved refs for error path testing

---

## Design Decisions

### Decision 1: Separate emitter functions vs class hierarchy

**Decision**: Pure functions per platform, not a class hierarchy.

**Rationale**: Each emitter is ~50-80 lines with no shared state. A class hierarchy (AbstractEmitter → WebEmitter, SwiftEmitter, KotlinEmitter) adds indirection without benefit. Pure functions are easier to test and reason about.

### Decision 2: TokenIndexReader separate from Product MCP's TokenRefResolver

**Decision**: New `TokenIndexReader` in `src/build/product/`, not importing from `product-mcp-server/`.

**Rationale**: Build-time code should not depend on runtime MCP server code. The reader is simpler (just needs platform paths + themeVarying), while the resolver does full value resolution. Different needs, different implementations, shared data source (token-index files).

### Decision 3: Token-index format extension is additive

**Decision**: Extend existing `platforms` field values, don't restructure the index.

**Rationale**: Changing `ios: duration150` to `ios: Duration.duration150` is a value change, not a schema change. Existing consumers that read the field as a string continue to work — they just get a longer string. The Application MCP's TokenIndexer spreads entries without parsing platform values, so it's transparent.

---

## File Manifest

| File | Purpose |
|------|---------|
| `src/build/product/ProductTokenGenerator.ts` | Main generator class |
| `src/build/product/TokenIndexReader.ts` | Lightweight token-index reader |
| `src/build/product/emitters/WebEmitter.ts` | CSS output |
| `src/build/product/emitters/SwiftEmitter.ts` | Swift output |
| `src/build/product/emitters/KotlinEmitter.ts` | Kotlin output |
| `src/build/product/__tests__/ProductTokenGenerator.test.ts` | Generator tests |
| `src/build/product/__tests__/TokenIndexReader.test.ts` | Reader tests |
| `src/build/product/__tests__/WebEmitter.test.ts` | CSS emitter tests |
| `src/build/product/__tests__/SwiftEmitter.test.ts` | Swift emitter tests |
| `src/build/product/__tests__/KotlinEmitter.test.ts` | Kotlin emitter tests |
| `src/cli/validateProductTokens.ts` | Validate CLI command |
| `src/cli/__tests__/validateProductTokens.test.ts` | Validate CLI tests |
| `src/__tests__/integration/Spec109-ProductTokenGeneration.test.ts` | Integration test |
| `src/config/defineConfig.ts` | Updated — add `productTokens` field |
| `src/cli/designerpunk.ts` | Updated — route validate flag |
| `scripts/generate-token-index.ts` | Updated — qualified platform paths |
| `product-mcp-server/src/indexer/ProductTokenIndexer.ts` | Updated — promotionCandidate filter + themeVarying field |
| `product-mcp-server/src/index.ts` | Updated — promotionCandidate parameter on tool |
