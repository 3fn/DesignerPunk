---
id: rosetta-system-architecture
inclusion: manual
name: Rosetta-System-Architecture
aliases: modular scale mathematical foundation, modular scale ratio mathematical foundations, baseline grid mathematical token foundation
description: Rosetta token pipeline architecture — subsystem entry points, token flow from definition to platform output, component token integration, and debugging token generation. Load when understanding token pipeline flow, finding subsystem entry points, or debugging generation issues.
---

# Rosetta System Architecture

**Date**: 2026-01-25
**Purpose**: High-level architecture guide for the Rosetta System token generation pipeline
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: token-development, component-development, pipeline-integration
**Last Reviewed**: 2026-06-26

---

## Overview

This document provides a high-level architectural overview of the Rosetta System token generation pipeline. It serves as an entry point for AI agents and developers who need to understand how tokens flow from definition to platform output.

**Relationship to Other Documents**:
- **rosetta-system-principles.md**: Mathematical foundations, naming conventions, governance (the "what" and "why")
- **This document**: Pipeline architecture, subsystem entry points, integration patterns (the "how")

**When to Use This Document**:
- Understanding how tokens flow through the system
- Finding entry points to specific subsystems (validators, registries, generators)
- Understanding where component tokens fit in the pipeline
- Debugging token generation issues

---

## Token Consumption Rule

**Tokens are pre-unitized. Never add platform units when consuming tokens.**

The token generators apply platform-appropriate units during build:
- **Web**: `rem`, `px` (CSS custom properties)
- **iOS**: `CGFloat` (points, implicit)
- **Android**: `Dp` (density-independent pixels)

| Platform | ✅ Correct | ❌ Wrong |
|----------|-----------|----------|
| Android | `DesignTokens.space_200` | `DesignTokens.space_200.dp` |
| Android | `ButtonIconTokens.insetSmall` | `ButtonIconTokens.insetSmall.dp` |
| iOS | `DesignTokens.space200` | `DesignTokens.space200.pt` |
| Web | `var(--space-200)` | `var(--space-200)px` |

This applies to **all token types**: primitive, semantic, and component tokens.

**Why?** The unitless architecture enables:
- Single source of truth for values
- Platform generators handle unit conversion
- Prevents double-unit bugs (e.g., `16.dp.dp`)
- Consistent consumption pattern across all platforms

---

## OKLCH Color Pipeline

Color tokens use **OKLCH** (perceptually uniform color space) with a channel-primitive composition model. Colors are authored as independent hue, lightness, and chroma channels, composed into primitives, and generated to platform-native formats.

### OKLCH Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         OKLCH COLOR PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   CHANNEL PRIMITIVES (Source of Truth)                                       │
│   └── src/tokens/color/channels/                                            │
│       ├── hues.ts: one hue per family (e.g., pinkHue = 10.0)               │
│       ├── lightness/: 5 steps per family (e.g., pinkLightness300 = 0.65)   │
│       └── chroma/: 5 steps per family (e.g., pinkChroma300 = 0.242)       │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   COMPOSITION (Static, at module load)                                       │
│   └── src/tokens/color/primitives/                                          │
│       └── pink300 = oklch(pinkLightness300, pinkChroma300, pinkHue)        │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   SEMANTIC INHERITANCE                                                       │
│   └── src/tokens/semantic/ColorTokens.ts                                    │
│       └── References primitives: 'color.action.primary': 'cyan300'         │
│       └── Theme overrides: OKLCH values with preserved hue                  │
│       └── Mode resolution: light/dark/wcag contexts (Spec 080)             │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   PLATFORM GENERATION                                                        │
│   └── src/generators/*FormatGenerator.ts                                    │
│       ├── Web: oklch(L C H) + channel custom properties                     │
│       ├── iOS: Color(.displayP3, red:, green:, blue:, opacity:)            │
│       ├── Android: Color(r, g, b, a, ColorSpaces.DisplayP3)                │
│       │   (iOS and Android: channels computed at generation, no library)   │
│       ├── DTCG/Figma: OKLCH → sRGB hex conversion                          │
│       └── Token-index: mode-aware OKLCH (light + dark resolved values + channels) │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
*(corrected 2026-11-01: the channel names are the ones the token index carries (`pinkLightness300`, `pinkChroma300`; the source composes them from `pinkLightness[300]` and `pinkChroma[300]`); `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`; prior text at `ca6e36f0e`)*

### Platform Output Formats

Each platform generator transforms OKLCH channel values to native color formats:

| Platform | Source | Output Format | Example |
|----------|--------|---------------|---------|
| **Web** | `oklch(0.6 0.286 310)` | CSS `oklch()` + channel vars | `--purple-300: oklch(0.6 0.286 310);` |
| **iOS** | `oklch(0.6 0.286 310)` | `Color(.displayP3, …)`, channels computed at generation | `Color(.displayP3, red: 0.6464, green: 0.1914, blue: 0.9476, opacity: 1)` |
| **Android** | `oklch(0.6 0.286 310)` | `Color(r, g, b, a, ColorSpaces.DisplayP3)`, channels computed at generation | `Color(0.6464f, 0.1914f, 0.9476f, 1f, ColorSpaces.DisplayP3)` |
| **DTCG/Figma** | `oklch(0.6 0.286 310)` | sRGB hex (converted) | `#b322fb` |
| **Token-index** | `oklch(...)` mode-resolved | mode-aware OKLCH + channels per entry | `{ light, dark, hue, lightness, chroma }` |

*The shadow family (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) is defined in OKLCH like the other families, to the same colours as its earlier `rgba` values (Spec 129 Task 8.2). It has no channel tokens: its token-index entries carry the OKLCH value but no `channels`, and the channel structure belongs to the colour-track spec (Spec 133). Every other color family carries OKLCH channels.*

### Conversion Rules

**Web (CSS)**:
- OKLCH values output as native CSS `oklch()` function
- Format: `oklch(L C H)` where L is 0.0-1.0, C is chroma, H is hue degrees
- Alpha variant: `oklch(L C H / A)` where A is 0.0-1.0

**iOS (Swift)**:
- OKLCH values are converted at generation to Display P3 channels (to 4 decimal places); the generated file needs no colour library, and imports SwiftUI
- Format: `Color(.displayP3, red: R, green: G, blue: B, opacity: A)`; `opacity` is always written (1 when opaque)

**Android (Kotlin)**:
- OKLCH values are converted at generation to Display P3 channels (to 4 decimal places); the generated file needs no colour library
- Format: `Color(R, G, B, A, ColorSpaces.DisplayP3)`; `A` is always written

**Gamut mapping (both native platforms)**:
- A colour outside Display P3 is mapped into it by CSS Color Level 4 § 13.2 (binary search on chroma at constant lightness and hue, accepted within ΔE_OK 0.02), so every channel is in 0–1. Compose's `Color` constructor throws at run time for a channel outside 0–1
- A colour inside Display P3 converts back to its OKLCH source with ΔE₀₀ ≤ 0.1, channels to 4 decimal places. Both are asserted in `src/generators/__tests__/NativeDisplayP3Colors.test.ts`, the second against a committed fixture whose header names its source
- `clampToGamut` in `src/color/OklchConverter.ts` takes the target gamut (`'srgb'` by default, or `'display-p3'`) and measures with ΔE_OK

### Baked-In Alpha Values

Some semantic tokens have baked-in alpha values for specific use cases:

```typescript
// Example: Subtle border with 48% opacity
'color.structure.border.subtle': 'oklch(0.78 0.02 280 / 0.48)'
```

**Platform Output**:
- **Web**: `--color-structure-border-subtle: oklch(0.78 0.02 280 / 0.48);`
- **iOS**: `Color(.displayP3, red: 0.7088, green: 0.7145, blue: 0.7652, opacity: 0.48)`
- **Android**: `Color(0.7088f, 0.7145f, 0.7652f, 0.48f, ColorSpaces.DisplayP3)`

### Entry Points

- Primitive color definitions: `src/tokens/ColorTokens.ts`
- Semantic color tokens: `src/tokens/semantic/ColorSemanticTokens.ts`
- Web generator: `src/providers/WebFormatGenerator.ts`
- iOS generator: `src/providers/iOSFormatGenerator.ts`
- Android generator: `src/providers/AndroidFormatGenerator.ts`

---

## Token Pipeline Architecture

The Rosetta System processes tokens through a six-stage pipeline:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TOKEN PIPELINE FLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│   │  DEFINITION  │───▶│  VALIDATION  │───▶│   REGISTRY   │                  │
│   │              │    │              │    │              │                  │
│   │ Token files  │    │ Mathematical │    │ Global store │                  │
│   │ define raw   │    │ relationships│    │ for queries  │                  │
│   │ values       │    │ verified     │    │ and lookups  │                  │
│   └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                  │                           │
│                                                  ▼                           │
│                                           ┌──────────────┐                  │
│                                           │     MODE     │                  │
│                                           │  RESOLUTION  │                  │
│                                           │              │                  │
│                                           │ Two-level    │                  │
│                                           │ light/dark   │                  │
│                                           │ resolver     │                  │
│                                           └──────────────┘                  │
│                                                  │                           │
│                                                  ▼                           │
│                       ┌──────────────┐    ┌──────────────┐                  │
│                       │   PLATFORM   │◀───│  GENERATION  │                  │
│                       │    OUTPUT    │    │              │                  │
│                       │              │    │ Transform to │                  │
│                       │ CSS, Swift,  │    │ platform     │                  │
│                       │ Kotlin files │    │ formats      │                  │
│                       └──────────────┘    └──────────────┘                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Stage 1: Definition

Tokens are defined in TypeScript files with mathematical relationships and metadata.

**Token Layers**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          TOKEN DEFINITION LAYERS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Layer 1: PRIMITIVE TOKENS                                                  │
│   ├── Mathematical foundation (base values × multipliers)                   │
│   ├── Location: src/tokens/*.ts                                             │
│   └── Examples: spacing, color, typography, radius                          │
│                                                                              │
│   Layer 2: SEMANTIC TOKENS                                                   │
│   ├── Purpose-driven compositions referencing primitives                    │
│   ├── Location: src/tokens/semantic/*.ts                                    │
│   └── Examples: space.inset.*, color.action.primary, typography.bodyMd      │
│                                                                              │
│   Layer 3: COMPONENT TOKENS                                                  │
│   ├── Component-specific values referencing primitives                      │
│   ├── Location: src/components/core/<Component>/*.tokens.ts                 │
│   └── Examples: buttonicon.inset.*, avatar.size.*                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```
*(corrected 2026-11-01: the semantic and component examples are keys the token index holds, and component token files sit at `src/components/core/<Component>/*.tokens.ts`; `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`; prior text at `ca6e36f0e`)*

**Entry Points**:
- Primitive tokens: `src/tokens/` directory
- Semantic tokens: `src/tokens/semantic/` directory
- Component tokens: `src/components/*/tokens.ts` files

### Stage 2: Validation

Tokens are validated against mathematical principles and naming conventions.

**Validation Architecture**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         VALIDATION SUBSYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ValidationCoordinator (Orchestrator)                                       │
│   ├── Coordinates all validation activities                                 │
│   ├── Caches validation results for performance                             │
│   └── Location: src/integration/ValidationCoordinator.ts                    │
│                                                                              │
│   ThreeTierValidator (Pass/Warning/Error)                                    │
│   ├── Validates mathematical relationships                                  │
│   ├── Enforces tolerance thresholds (≤5% pass, 5-25% warning, >25% error)  │
│   └── Location: src/validators/ThreeTierValidator.ts                        │
│                                                                              │
│   MathematicalRelationshipParser                                             │
│   ├── Parses and validates mathematical formulas                            │
│   └── Location: src/validators/MathematicalRelationshipParser.ts            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Entry Points**:
- Validation orchestration: `src/integration/ValidationCoordinator.ts`
- Three-tier validation: `src/validators/ThreeTierValidator.ts`
- Mathematical parsing: `src/validators/MathematicalRelationshipParser.ts`

### Stage 3: Registry

Validated tokens are stored in global registries for querying and lookup.

**Registry Architecture**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REGISTRY SUBSYSTEM                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   IRegistry<T> (Interface)                                                   │
│   ├── Standard interface for all registries                                 │
│   ├── Methods: register(), get(), getAll(), has(), clear()                  │
│   └── Location: src/registries/IRegistry.ts                                 │
│                                                                              │
│   PrimitiveTokenRegistry                                                     │
│   ├── Stores primitive tokens                                               │
│   ├── Supports getByFamily() for family-based queries                       │
│   └── Location: src/registries/PrimitiveTokenRegistry.ts                    │
│                                                                              │
│   SemanticTokenRegistry                                                      │
│   ├── Stores semantic tokens                                                │
│   ├── Tracks primitive references                                           │
│   └── Location: src/registries/SemanticTokenRegistry.ts                     │
│                                                                              │
│   ComponentTokenRegistry                                                     │
│   ├── Stores component tokens                                               │
│   ├── Supports getByComponent() and getByFamily() queries                   │
│   └── Location: src/registries/ComponentTokenRegistry.ts                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Entry Points**:
- Registry interface: `src/registries/IRegistry.ts`
- Primitive registry: `src/registries/PrimitiveTokenRegistry.ts`
- Semantic registry: `src/registries/SemanticTokenRegistry.ts`
- Component registry: `src/registries/ComponentTokenRegistry.ts`

### Stage 4: Mode Resolution (Spec 080)

Semantic color tokens are resolved into light and dark mode sets before generation. This is a two-level process that sits between Registry and Generation — generators receive fully-resolved token sets and have no self-fetch capability.

**Two-Level Resolution:**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MODE RESOLUTION SUBSYSTEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Level 1: Primitive Value Resolution (no mode variance)                     │
│   ├── Primitives are single OKLCH triples — NO mode dimension (Spec 112)    │
│   ├── No dark override → token falls back to the base (light) reference,    │
│   │   resolving to the SAME value in both modes                             │
│   ├── The common case — see npm run audit:mode-parity for the live split    │
│   └── Resolved by: SemanticValueResolver                                    │
│                                                                              │
│   Level 2: Semantic Overrides                                                │
│   ├── Dark theme file swaps the primitive *name* (role remapping)           │
│   ├── Example: active icon cyan500 (light) → cyan100 (dark)                │
│   ├── Handles the exception case (tokens needing different primitives)      │
│   └── Resolved by: SemanticOverrideResolver                                │
│                                                                              │
│   Pipeline orchestration (generateTokenFiles.ts)                             │
│   ├── Level 2 first: produces light + dark token name sets                  │
│   ├── Level 1 second: resolves each set's names to OKLCH values            │
│   ├── Passes both resolved sets to generators                               │
│   └── Generators receive GenerationOptions with required semanticTokens     │
│       and darkSemanticTokens                                                │
│                                                                              │
│   Fallback Behavior                                                          │
│   ├── Absent dark override → token uses base (light) primitive reference    │
│   │   — the ONLY fallback that fires; primitives have no mode values to     │
│   │   fall back from (legacy ColorTokens.ts is deprecated, Spec 115)        │
│   ├── Fallback is graceful degradation, not build failure                   │
│   └── Mode parity audit reports fallback usage: npm run audit:mode-parity   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Entry Points:**
- Override resolver: `src/resolvers/SemanticOverrideResolver.ts`
- Value resolver: `src/resolvers/SemanticValueResolver.ts`
- Dark theme file: `src/tokens/themes/dark/SemanticOverrides.ts`
- Override types: `src/tokens/themes/types.ts`
- Mode parity audit: `src/validators/ModeParity.ts`
- Theme file generator: `src/tools/ThemeFileGenerator.ts`

`generateTokenFiles` returns `ModeResolvedTokens` — the shared resolved-value source consumed by both the platform generators and the token-index generator (see Stage 5).

### Stage 5: Generation

Mode-resolved tokens are transformed into platform-specific formats. Generators receive pre-resolved light and dark token sets and produce mode-aware output when values differ between modes.

**Generation Architecture**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         GENERATION SUBSYSTEM                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   TokenFileGenerator (Platform-generation orchestration)                     │
│   ├── Coordinates all generation activities                                 │
│   ├── Receives pre-resolved light + dark semantic token sets                │
│   └── Location: src/generators/TokenFileGenerator.ts                        │
│                                                                              │
│   Platform Format Generators                                                 │
│   ├── WebFormatGenerator: CSS custom properties (OKLCH format)              │
│   │   └── Mode-aware: light-dark(lightVal, darkVal) when values differ     │
│   ├── iOSFormatGenerator: Swift constants (Color(.displayP3, …))            │
│   │   └── Mode-aware: UIColor { traitCollection } when values differ       │
│   ├── AndroidFormatGenerator: Kotlin constants (Color(…, DisplayP3))        │
│   │   └── Mode-aware: name_light + name_dark when values differ            │
│   └── Location: src/providers/*FormatGenerator.ts                           │
│                                                                              │
│   Color Format Conversion                                                    │
│   ├── formatOklchValue(): Format OKLCH channels to platform string          │
│   ├── oklchToNativeChannels(): OKLCH → Display P3 channels (gamut-mapped)   │
│   ├── formatSwiftDisplayP3() / formatKotlinDisplayP3(): native constructors │
│   └── formatColorValue(): Handle mode-aware color objects                   │
│                                                                              │
│   Token-Index Generator                                                      │
│   └── Location: src/generators/generateTokenIndex.ts                         │
│                                                                              │
│   Utility Generators                                                         │
│   ├── BlendUtilityGenerator: Blend functions per platform                   │
│   └── Location: src/generators/BlendUtilityGenerator.ts                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Entry Points**:
- Platform-generation orchestration: `src/generators/TokenFileGenerator.ts`
- Web generation: `src/providers/WebFormatGenerator.ts`
- iOS generation: `src/providers/iOSFormatGenerator.ts`
- Android generation: `src/providers/AndroidFormatGenerator.ts`
- Token-index generation: `src/generators/generateTokenIndex.ts` — receives the same `ModeResolvedTokens` as the platform generators; data source for the Application MCP

`BlendUtilityGenerator` is present but dormant — not exercised by `generate`. See `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`.

### Stage 6: Platform Output

Generated files are written to the `dist/` directory for consumption.

**Output Structure**:
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PLATFORM OUTPUT                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   dist/                                                                      │
│   ├── DesignTokens.web.css      (CSS custom properties)                     │
│   ├── DesignTokens.ios.swift    (Swift constants)                           │
│   ├── DesignTokens.android.kt   (Kotlin constants)                          │
│   ├── ComponentTokens.web.css   (Component token CSS)                       │
│   ├── ComponentTokens.ios.swift (Component token Swift)                     │
│   └── ComponentTokens.android.kt(Component token Kotlin)                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Note — BlendUtilities**: `dist/BlendUtilities.*` are not produced by `generate`. The `BlendUtilityGenerator` code path exists but is dormant. Disposition (activate vs. remove) is tracked holistically in `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`.

**Entry Points**:
- Output directory: `dist/`
- Build scripts: `scripts/` directory

---

## Component Token Integration

Component tokens represent a third layer in the token hierarchy, sitting between semantic tokens and platform implementations.

### Component Token Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     COMPONENT TOKEN PIPELINE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Component Token Definition                                                 │
│   └── src/components/[ComponentName]/tokens.ts                              │
│       └── defineComponentTokens({ component, family, tokens })              │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   Component Token Registry                                                   │
│   └── Populated by loadComponentTokens() harvest (sole writer)              │
│       └── Supports getByComponent(), getByFamily() queries                  │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   Validation                                                                 │
│   └── ValidationCoordinator.validateComponentToken()                        │
│       ├── Reasoning requirement (non-empty string)                          │
│       ├── Primitive reference validation                                    │
│       └── Family-conformant value validation                                │
│                                                                              │
│                              │                                               │
│                              ▼                                               │
│                                                                              │
│   Platform Generation                                                        │
│   └── TokenFileGenerator.generateComponentTokens()                          │
│       ├── Web: --component-token-name: var(--primitive-reference)           │
│       ├── iOS: ComponentTokens.tokenName = PrimitiveTokens.reference        │
│       └── Android: ComponentTokens.tokenName = PrimitiveTokens.reference    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Component Token Authoring

Component tokens are defined using the `defineComponentTokens()` helper:

<!-- example: consumer -->
```typescript
// src/components/core/[ComponentName]/tokens.ts
import { defineComponentTokens } from '../../../build/tokens';
import { spacingTokens } from '../../../tokens/SpacingTokens';

export const ComponentNameTokens = defineComponentTokens({
  component: 'ComponentName',
  family: 'spacing',
  tokens: {
    'inset.large': {
      reference: spacingTokens.space150,
      reasoning: 'Explanation of why this token exists',
    },
    // ... more tokens
  },
});
```

**Key Characteristics**:
- Explicit component and family association
- Required reasoning for each token
- References to primitive tokens (preferred) or family-conformant values
- Returns a branded value-map (no self-registration); loadComponentTokens() harvests the brand and is the sole writer to ComponentTokenRegistry (Spec 124)

**Entry Points**:
- Helper function: `src/build/tokens/defineComponentTokens.ts`
- Component token registry: `src/registries/ComponentTokenRegistry.ts`
- Loader (debugging): `src/cli/loadComponentTokens.ts` — sources discovered by presence (convention dir `{tokenSourceRoot}/component/` and/or `config.componentTokenDirs`), not `tokenSourceMode`; warns if none found

**Loading behavior**: Component token sources are discovered by *presence*, not by `tokenSourceMode`. If the convention dir `{tokenSourceRoot}/component/` exists, or `config.componentTokenDirs` is set, those sources load in both package and local mode. If no sources are found, the loader emits a "No component token files found" warning and `ComponentTokens.*` output is empty.

**Token Creation Governance**: Creating component tokens requires human approval. See [Token Governance Guide](token-governance) for decision matrix and review requirements.

### Cross-Boundary Invariant & the Brand Contract (Spec 124)

**Class invariant:** *No mutable-accumulate-then-read-back state crosses the scoped (`scopedTsRequire`) boundary.* A singleton is dangerous across that boundary only if it is **written in one module copy and read back from another**; `scopedTsRequire` loads a second copy of `@3fn/core/build`, so any object compared by shared identity across it desyncs. `ComponentTokenRegistry` was the only such singleton (audit: `unitConverter` stateless, `transformerRegistry` populate-at-init/read-in-same-copy, color maps immutable — all benign when duplicated). It is now pinned by a source-scan guard (`src/build/tokens/__tests__/ClassInvariantGuard.test.ts`) that reds on any `*Registry.{register|registerBatch|add|set|push}(` write reintroduced to the authoring surface.

**The brand contract (Option A):** component tokens cross the boundary **by value**. `defineComponentTokens()` brands its backward-compatible return value with a **non-enumerable string key** (`'@3fn/dp:tokenContract'`, recovered via `getTokenContract`); `loadComponentTokens()` harvests the branded exports and is the **sole writer** to the registry. Four load-bearing caveats: **(1)** the brand **key** is a constant namespaced **string** (`'@3fn/dp:tokenContract'`), value-equal across copies — so it survives the boundary where object identity would not (the brand *value* is the `RegisteredComponentToken[]`, written non-writable); **(2)** the key's **non-enumerability is load-bearing** (it must not leak into the flat value-map's enumeration / serialization); **(3)** brand re-application is **idempotent** (`hasOwnProperty`-guarded, `configurable`); **(4)** brand access is via **`hasOwnProperty`** (not prototype-chain lookup). `allowOverwrite` is retired.

---

## Subsystem Entry Points Summary

| Subsystem | Primary Entry Point | Purpose |
|-----------|---------------------|---------|
| **Definition** | `src/tokens/` | Token source files |
| **Validation** | `src/integration/ValidationCoordinator.ts` | Validation orchestration |
| **Registry** | `src/registries/` | Token storage and queries |
| **Theme Registry** | `src/themes/ThemeRegistry.ts` | Theme registration, validation, theme-varying token computation |
| **Configuration** | `src/config/defineConfig.ts` | Pipeline config API (`@3fn/core/config`) |
| **Config Loader** | `src/config/ConfigLoader.ts` | Loads `designerpunk.config.ts`, resolves paths |
| **Generation** | `src/generators/TokenFileGenerator.ts` | Platform output generation |
| **Platform Generators** | `src/providers/*FormatGenerator.ts` | Platform-specific formatting |
| **Theme Generators** | `generateThemeOverrideBlocks` → `generateWebThemeBlock`, `generateSwiftThemeTypes`, `generateKotlinThemeTypes` | Platform-specific output for registered themes — called by `generate` for each registered theme that is not `dark` or `wcag`: the web `:root[data-theme="<name>"]` block through `generateWebThemeBlock`, the native instances through the theme emitter. The built-in WCAG overrides are emitted through `generateWcagOverrideBlock` |
| **Output** | Configured output dir (default: `dist/`) | Generated platform files |
| **Component Tokens** | `src/build/tokens/defineComponentTokens.ts` | Component token authoring |
| **Color Tokens** | `src/tokens/ColorTokens.ts` | OKLCH channel-primitive definitions |
| **Pipeline CLI** | `npx designerpunk generate` | Run pipeline from any project |

**Note for product repos**: These paths reference `@3fn/core` package source. In product repos consuming the package, pipeline subsystems are accessed via the CLI (`npx designerpunk generate`) and the `defineConfig()` API — not by importing these files directly. To inspect pipeline internals: `node_modules/@3fn/core/src/`.

---

## Portable Pipeline (Spec 094)

The token pipeline is portable — it runs from any project that installs `@3fn/core`. Products configure the pipeline via `designerpunk.config.ts`:

```typescript
import { defineConfig } from '@3fn/core/config';
import { myOverrides } from './themes/my-theme/SemanticOverrides';

export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  themes: [{ name: 'my-theme', mode: 'dark', overrides: myOverrides }],
  componentTokens: ['./components'],
  output: './dist/tokens'
});
```

**Path resolution**: Token sources resolve from the installed package. Theme overrides and component tokens resolve relative to the config file. Output directory is configurable. When no config exists, defaults match the DesignerPunk repo structure (backward compatible).

**Theme registration**: Themes are explicitly imported and registered in the config — no directory walking, no auto-discovery. The config is the registry, and `generate` applies each registered theme. `dark` and `wcag` replace DesignerPunk's built-in override maps, read from the consumer's copy; a built-in map the config does not register is still applied from the installed package, with a warning on every run, until the next major release. Any other theme is written as `:root[data-theme="<name>"]` on web and as a theme instance on iOS and Android.

See: `Token-Governance.md` § "Theme Registry (Spec 094)" for governance rules.

---

## Module-Resolution Contract (Spec 118)

DesignerPunk resolves TypeScript at runtime under a single coherent contract. The contract is organized by **class of code**:

| Class | Code | Resolution rule |
|-------|------|-----------------|
| **A — package OWN code** (CLI, generators, exports) | shipped in the package | **Compiled-and-shipped (`dist/`), run as compiled JS.** No runtime-TS loader. The bin invokes `require('../dist/cli/designerpunk.js')` under plain `node`. |
| **B — the CONSUMER's `.ts`** (config, tokens, components, overrides) | lives in the consumer's repo | **A per-site SCOPED runtime-TS loader** (the Increment-1 Approach-A seam): register tsx scoped → load → unregister. No process-global register. Three seams: config, `resolveTokens`, `loadComponentTokens`. |
| **C — `__dirname` / package-root assumptions** | package internals | **A single `resolvePackageRoot()` source of truth** (resolve up, self-check for `package.json`, fall back to cwd). All package-root derivations route through it; no bare `__dirname` for package-root. |
| **C′ — the generated catalog** | token-index + the MCP it feeds | **Reflects the CONSUMER's design system** — components/schemas they add or edit, resolved from the active config/source, not `__dirname`. |
| **D — the MCP-dev ts-node configs** | MCP servers' dev workflow | **A permanent documented exception** (see "MCP/Browser Exemption Boundary"). Bundled at ship time; no runtime-TS resolution. |

**The one runtime-TS mechanism (non-bundled surface): `tsx`.** ts-node is retired from the governed surface. Component tokens cross the scoped boundary **by return value (branded harvest), not by a shared-singleton side effect.** Authoring is **extensionless CJS** (no explicit `.js`/`.ts` on relative specifiers); no `"type":"module"`.

**Spec 118 is the single source of truth for module resolution.** Downstream questions route here; see `.kiro/specs/118-module-resolution-coherence/`.

### Committed Direction & the ESM path

**Direction (Spec 118 Task 8): CJS-consistency, executed in-spec. The escape-hatch was NOT elected** — Increment 3 (3a→3b→3c) executed fully; no `"type":"module"` flip; the `@3fn/core/jest-preset` was never touched. Rationale: the charter goal is to make the system *whole, not modern* — CJS-consistency is the lowest-incoherence end-state (it consolidates an already-CJS surface that works, with zero preset blast-radius), whereas native ESM, even in its best case, would close on a *deferred* execution. Evidence: `findings/direction-decision.md`.

**No deferred cost is owed by this spec** (execution is complete). The future ESM-modernization path is a **deliberate, externally-triggered** migration — not pending work. Its triggers and inventoried cost are recorded on the roadmap: see `docs/roadmap/m0a-deferred-items.md` § "Full ESM modernization". CJS-consistency deliberately banks ~60–70% of the **structural** prep for that move — explicitly **excluding the two high-variance drivers (the loader-host re-investigation and the jest→ESM migration across the full suite), which that percentage does not cover** and which are where an ESM migration's real cost and risk live.

---

## MCP/Browser Exemption Boundary

The module-resolution contract governs **non-bundled runtime TS**. Four subsystems are **exempt because bundling resolves their imports at build time** — there is no runtime-TS resolution to govern:

| Subsystem | Bundle | Build |
|-----------|--------|-------|
| Application / Docs / Product MCP servers | `dist/mcp/*.js` | `npm run build:mcp` (esbuild, CJS) |
| Browser bundle | `dist/browser/designerpunk.esm.js` (+UMD/min) | `npm run build:browser` (esbuild) |

The exemption is **not silent**: each exempt subsystem has a **paired boot/smoke guard** (`tests/mcp-boot-smoke.test.ts`, `tests/browser-boot-smoke.test.ts`) wired into the consumer-guard CI lane — a broken bundle fails the lane.

**Two MCP servers (application, docs) carry their own ts-node *dev* configs — a permanent documented exception** (Resolved Decision 2); product-mcp-server has none. They serve the servers' development workflow only, never load consumer configs, never touch `loadConfig`. At ship time all three servers run as bundles. This is NOT a reconciliation target and NOT a gap in the contract.

---

## Related Documentation

### Rosetta System
- [Rosetta System Principles](rosetta-system-principles) - Mathematical foundations, naming conventions, governance
- [Token Quick Reference](token-quick-reference) - Token documentation routing

### Architecture
- [Token System Overview](../docs/token-system-overview.md) - Master document mapping token files
- [Registry-Validator Pattern](../docs/architecture/registry-validator-pattern.md) - Validation patterns

### DTCG Integration
- [DTCG Integration Guide](dtcg-integration-guide) - Integrating DesignerPunk tokens with external design tools via DTCG format
- [Figma Workflow Guide](figma-workflow-guide) - Bidirectional Figma integration: token push and design extraction
- [Transformer Development Guide](transformer-development-guide) - Building custom token transformers for tool-specific formats
- [MCP Integration Guide](mcp-integration-guide) - Programmatic token loading, parsing, and querying

### Component Development
- [Component Development Guide](component-development-guide) - Token selection and component patterns
- [Stemma System Principles](stemma-system-principles) - Component hierarchy and relationships
- [Contract System Reference](contract-system-reference) - Behavioral contracts that component tokens satisfy

---

## MCP Query Examples

```
# Get this document
get_document_full({ path: "rosetta-system-architecture" })

# Get specific sections
get_section({ path: "rosetta-system-architecture", heading: "Token Pipeline Architecture" })
get_section({ path: "rosetta-system-architecture", heading: "OKLCH Color Pipeline" })
get_section({ path: "rosetta-system-architecture", heading: "Component Token Integration" })
get_section({ path: "rosetta-system-architecture", heading: "Subsystem Entry Points Summary" })

# For token creation governance and guides
get_section({ path: "token-governance", heading: "Token Creation Guides" })
```

---

*This document provides architectural overview and entry points. For mathematical foundations and governance, see rosetta-system-principles.md.*
