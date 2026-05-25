# Design Outline: Product Tokens — Reference Validation & Platform Generation

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Status**: Design Outline
**Author**: Thurgood (with Peter)
**Depends on**: Spec 108 (Product Tokens — Source Format & MCP Discoverability) ✅ Complete

---

## Problem Statement

Spec 108 established the source format for product tokens and made them queryable via the Product MCP. However, product tokens are not yet **consumable** in platform code. Product agents can query `get_product_tokens` to discover values, but platform agents cannot import generated constants into their implementations.

This spec delivers the generation pipeline that transforms `product/tokens/*.yaml` into platform-native output (CSS custom properties, Swift constants, Kotlin objects), plus proactive reference validation as a CLI command.

---

## Design Philosophy

Product token generation follows the same principle as Rosetta's pipeline: one source of truth (YAML), platform-appropriate output. The generation is deliberately simpler than system token generation — no mathematical validation, no formula evaluation, no cross-product reuse checks. Product tokens are lighter by design.

---

## What's Settled (From Spec 108)

### Source Format
- YAML files in `product/tokens/{category}.yaml`
- Token entries: `value` (with `unitType` + `rationale`) or `ref` (canonical token name)
- `platforms` field filters per-token applicability
- Category filenames: lowercase ASCII + hyphens
- Token names: camelCase, acronyms as words

### Unit Type → Platform Output Mapping

| unitType | Web (CSS) | iOS (Swift) | Android (Kotlin) |
|----------|-----------|-------------|------------------|
| `logical` | `{value}px` | `CGFloat = {value}` | `{value}.dp` |
| `duration` | `{value}ms` | `TimeInterval = {value/1000}` | `{value} // ms` (Int) |
| `ch` | `{value}ch` | N/A | N/A |
| `ratio` | `{value}` | `CGFloat = {value}` | `{value}f` |
| `count` | `{value}` | `Int = {value}` | `{value}` |
| `percent` | `{value}%` | `CGFloat = {value/100}` | `{value/100}f` |
| `color` | `{value}` | `Color(hex: "{value}")` | `Color(0xFF{hex})` |

### Naming Convention (Extracted from Existing Pipeline)

The existing `WebBuilder.toCSSVariableName()` rule:
```
camelCase → kebab-case (insert hyphen before uppercase)
dots → hyphens
letter-number boundary → hyphen
lowercase all
```

Applied to product tokens with `--product-{category}-` prefix:
- `contentMaxWidth` in `layout.yaml` → `--product-layout-content-max-width`
- `flipDuration` in `motion.yaml` → `--product-motion-flip-duration`
- `chartAccentBlue` in `visualization.yaml` → `--product-visualization-chart-accent-blue`

Swift/Kotlin use PascalCase namespace + camelCase member:
- `contentMaxWidth` in `layout.yaml` → `ProductLayout.contentMaxWidth`
- `flipDuration` in `motion.yaml` → `ProductMotion.flipDuration`
- Category `layout-grid` → `ProductLayoutGrid`

### Reference Resolution
- Refs resolve against `token-index/` — the index already provides platform-specific constant names in its `platforms` field, so the generator reads them directly (no name conversion logic needed for refs)
- Name mapping (via `PlatformNamingRules.ts`) is only needed for the product token's OWN output name, not for resolving system token references
- In generated output, refs emit platform references to the system token's generated constant:
  - CSS: `ref: space300` → `var(--space-300)`
  - Swift: `ref: space300` → `DesignTokens.space300`
  - Swift (duration): `ref: duration350` → `DesignTokens.Duration.duration350`
  - Kotlin: `ref: space300` → `DesignTokens.space_300`
  - Kotlin (duration): `ref: duration350` → `DesignTokens.Duration.Duration350`

---

## Resolved Questions

### Q1: Canonical → Platform Name Mapping (Resolved)

A shared utility already exists: `src/naming/PlatformNamingRules.ts` exports `getPlatformTokenName()` and `convertToNamingConvention()`. The product token generator uses this for the token's OWN output name (e.g., `contentMaxWidth` → `--product-layout-content-max-width`).

For ref resolution, the generator reads platform names directly from the token-index `platforms` field — no conversion logic needed. This distinction is critical:
- **Own name**: Uses `PlatformNamingRules` with `product-{category}-` prefix
- **Ref target name**: Reads from `token-index/*.yaml → platforms.{web|ios|android}`

### Q2: Generation Pipeline Architecture (Resolved)

**Decision**: Option C — standalone lightweight generator at `src/build/product/ProductTokenGenerator.ts`.

**Rationale**: Product tokens are simpler than system tokens (no formulas, no mathematical validation, no cross-platform consistency checks). A standalone `ProductTokenGenerator` class that reads YAML and emits platform files is ~200 lines per platform. It doesn't need the `BuildOrchestrator`, `TokenSelector`, or `UnitConverter` infrastructure — those solve problems product tokens don't have.

**Location**: `src/build/product/` — mirrors `src/build/tokens/ComponentTokenGenerator.ts` pattern. NOT in `product-mcp-server/` (that's a runtime MCP server, not a build-time artifact).

The generator is invoked by the CLI (`npx designerpunk generate`) after system token generation completes.

### Q3: Ref Resolution at Generation Time (Resolved)

**Decision**: Option A — read `token-index/`.

**Rationale**: Generation runs after `npm run build` which regenerates the token index. The index is guaranteed fresh at generation time. Using the same resolution path as the Product MCP (read `token-index/`) keeps behavior consistent — if the MCP resolves a ref, generation will too.

### Q4: Promotion Workflow Tooling (Resolved)

**Decision**: Manual process with documentation. Out of scope for this spec.

When a product token is promoted:
1. Author creates the new system token (Ada reviews)
2. Author updates the product token YAML: change `value` to `ref` pointing at the new system token
3. Regenerate — output automatically changes from hard value to system token reference
4. Consumers update their imports (CSS variable name changes from `--product-*` to system token name)

Step 4 is a breaking change for consumers. Documentation in the governance doc covers this.

---

## Architecture

```
product/tokens/*.yaml          token-index/*.yaml
        │                              │
        ▼                              ▼
┌──────────────────────────────────────────────┐
│         ProductTokenGenerator                 │
│  - reads YAML source                         │
│  - validates refs against token-index        │
│  - emits platform files                      │
└──────────────────────────────────────────────┘
        │
        ├── dist/product/ProductTokens.web.css
        ├── dist/product/ProductTokens.ios.swift
        └── dist/product/ProductTokens.android.kt
```

---

## Proposed Solution

### 1. Reference Validation CLI

```bash
npx designerpunk validate --product-tokens
```

- Reads all `product/tokens/*.yaml` files
- Checks every `ref` value against `token-index/` (all three files)
- Reports broken refs with actionable messages
- Exit code 0 = all valid, exit code 1 = broken refs found
- Can be integrated into CI/pre-commit

**Output format:**
```
✅ layout.yaml: 4 tokens, all refs valid
❌ motion.yaml: 3 tokens, 1 broken ref
   → flickerCurve references 'easeInOutCustom' which is not in token-index
   
1 broken reference found. Run `npx designerpunk generate` to refresh token-index.
```

### 2. Platform Code Generation

**Web output** (`dist/product/ProductTokens.web.css`):
```css
:root {
  /* Product tokens: layout */
  --product-layout-content-max-width: 1336px; /* Maximum content column width */
  --product-layout-content-indent: var(--space-300); /* Left indent for section content */
  --product-layout-prose-measure-max: 48ch; /* Maximum line length for body text */

  /* Product tokens: motion */
  --product-motion-flip-duration: var(--duration-350); /* Card-to-modal expansion timing */
  --product-motion-flicker-duration: 800ms; /* Neon easter egg animation cycle */
}
```

**iOS output** (`dist/product/ProductTokens.ios.swift`):
```swift
import UIKit

// Product tokens — generated from product/tokens/*.yaml
// Do not edit manually.

public enum ProductLayout {
    public static let contentMaxWidth: CGFloat = 1336
    public static let contentIndent: CGFloat = DesignTokens.space300
}

public enum ProductMotion {
    public static let flipDuration: TimeInterval = DesignTokens.Duration.duration350
    public static let flickerDuration: TimeInterval = 0.8
}
```

**Android output** (`dist/product/ProductTokens.android.kt`):
```kotlin
package com.designerpunk.product.tokens

// Product tokens — generated from product/tokens/*.yaml
// Do not edit manually.

object ProductLayout {
    val contentMaxWidth = 1336.dp
    val contentIndent = DesignTokens.space_300
}

object ProductMotion {
    val flipDuration = DesignTokens.Duration.Duration350
    val flickerDuration = 800 // ms
}
```

### 3. Pipeline Integration

**Config extension:**
```typescript
export default defineConfig({
  name: 'DesignerPunk',
  abbreviation: 'DP',
  themes: [],
  componentTokens: ['./src/components/core'],
  output: './dist',
  productTokens: './product/tokens',  // NEW — path to product token YAML directory
});
```

**Generation flow:**
1. `npx designerpunk generate` runs
2. System tokens generated (existing behavior)
3. Token index generated (existing behavior)
4. IF `productTokens` path configured AND directory exists:
   - Validate all refs against freshly-generated token-index
   - If broken refs: warn but continue (don't block system token output)
   - Generate `ProductTokens.web.css`, `ProductTokens.ios.swift`, `ProductTokens.android.kt`
5. Report summary

**Broken refs behavior**: Warn, don't block. System token generation should never be blocked by product token issues. Product token files are generated with warning comments for unresolved refs:
```css
  /* ⚠️ UNRESOLVED: --product-motion-flicker-curve references 'easeInOutCustom' (not in token-index) */
  --product-motion-flicker-curve: /* unresolved */;
```

---

## Resolved Open Questions

### Q5: Description comments in generated output (Resolved)

**Decision**: Include `description` as inline comments in CSS output. Omit from Swift/Kotlin (noise in autocomplete).

**Rationale**: Sparky confirmed CSS comments are zero-cost (gzipped away) and help debugging in DevTools. Kenya/Data didn't request them for native platforms.

### Q6: Output file location (Resolved)

**Decision**: `dist/product/ProductTokens.{platform}.{ext}` (subdirectory).

**Rationale**: Mirrors source structure (`product/tokens/` → `dist/product/`), aligns with Product MCP ownership boundary, keeps `dist/` root clean for system-level artifacts. Sparky confirmed this works for her import workflow.

### Q7: Auto-detect vs explicit config (Resolved)

**Decision**: Option B — require explicit `productTokens` path in config.

**Rationale**: Leonardo strongly prefers explicit. Auto-detect is dangerous in product repos where experimental YAML might sit in `product/tokens/` from a spike. Aligns with how `componentTokens` already works.

### Platform Filtering Clarification

Tokens with platform-limited `unitType` (e.g., `ch`) that specify `platforms: [web]` are excluded entirely from iOS/Android output. Spec 108's validation already prevents `unitType: ch` with `platforms: [ios]` — so generated output will never contain platform-incompatible values. No placeholder comments, no "web concept" annotations in native output.

---

## Scope

**In scope:**
- `ProductTokenGenerator` class (reads YAML, resolves refs, emits platform files)
- `npx designerpunk validate --product-tokens` CLI command
- `designerpunk.config.ts` `productTokens` field extension
- Integration with `npx designerpunk generate` command
- Platform output files (CSS, Swift, Kotlin) in `dist/product/`
- Canonical → platform name mapping (using `PlatformNamingRules.ts`)
- `promotionCandidate` filter parameter added to `get_product_tokens` (Spec 108 Product MCP enhancement for governance queryability)

**Out of scope:**
- Source format changes (Spec 108)
- Promotion workflow automation (future)
- Watch mode / incremental generation (future)
- Product token authoring tooling (future)
- Cross-vertical comparison tooling (future — noted as dependency for Stacy's Lessons Synthesis workflow)
- Parity validation mode (future — `validate --parity` for cross-platform output consistency)

---

## Dependencies

| Dependency | What we need | Status |
|------------|-------------|--------|
| Spec 108 | Stable YAML format, working Product MCP indexer | ✅ Complete |
| Existing generation pipeline | `WebBuilder.toCSSVariableName()`, `iOSBuilder.toSwiftConstantName()` patterns | ✅ Available |
| `designerpunk.config.ts` | `defineConfig` interface extension pattern | ✅ Available (Spec 094/103/104) |
| Token index format | `token-index/*.yaml` structure | ✅ Available |
| CLI infrastructure | `src/cli/designerpunk.ts` command registration | ✅ Available |

---

## Success Criteria

1. `npx designerpunk validate --product-tokens` reports broken refs with actionable messages
2. `npx designerpunk generate` produces `dist/product/ProductTokens.web.css`, `dist/product/ProductTokens.ios.swift`, `dist/product/ProductTokens.android.kt`
3. Generated CSS uses `var()` references for `ref` tokens (not resolved values)
4. Generated Swift/Kotlin uses `DesignTokens.*` references for `ref` tokens (platform names read from token-index)
5. Platform filtering works — `ch` tokens don't appear in iOS/Android output
6. `productTokens` config field documented in `defineConfig` interface
7. Broken refs warn but don't block system token generation
8. `get_product_tokens` supports `promotionCandidate` filter for governance queryability
