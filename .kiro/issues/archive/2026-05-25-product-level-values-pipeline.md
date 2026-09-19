# @3fn/core Feedback: Product-Level Values Pipeline

**Date**: 2026-05-25
**Source**: Spec 002 (Portfolio Token Compliance) + Spec 003 planning
**Priority**: High — blocks product implementation architecture
**Category**: Pipeline feature request

---

## The Gap

The MCP Relationship Model (§ "Product MCP") references "brand tokens" and "product-specific extensions to DesignerPunk's semantic token layer" with naming marked as "(TBD)." The Product MCP was designed to serve these values. However, no implementation exists for:

1. Defining product-level values in a structured format
2. Generating platform-native output (CSS custom properties, Swift constants, Kotlin objects)
3. Making product values queryable via the Product MCP
4. Governing product values separately from system tokens

The portfolio audit (Spec 002) surfaced this gap concretely: 9+ product-level layout values need to exist somewhere with cross-platform visibility, agent discoverability, and clear separation from Rosetta tokens.

---

## What We Discovered

Products generate values that:
- Are product-specific (not reusable across products without deliberate promotion)
- May reference system tokens (e.g., content indent = space300)
- May be hard values with no token equivalent (e.g., max-width = 1336px)
- Need cross-platform output (CSS, Swift, Kotlin)
- Need agent discoverability (Product MCP queryable)
- Need governance lighter than Rosetta tokens but heavier than "a random CSS file"

### Categories Identified

| Category | Examples | References System Tokens? |
|----------|---------|--------------------------|
| Layout constraints | Content max-width, prose measure, modal width | Sometimes (indent = space300) |
| Motion characteristics | FLIP animation curve, flicker duration | Sometimes (duration = duration350) |
| Content constraints | Line limits, character limits, aspect ratios | Rarely |
| Visualization constants | Chart colors, node sizes, canvas font sizes | Sometimes (colors near primitives) |
| Adaptive thresholds | Width breakpoints for layout shifts | Sometimes (breakpoint tokens) |

### What This Is NOT

- NOT color overrides (those stay in the theming system — `SemanticOverrides.ts`)
- NOT component tokens (those are Stemma's domain)
- NOT mathematical scale values (those are Rosetta primitives)

---

## Platform Needs (Consulted Kenya + Data)

### Web (Sparky)
- CSS custom properties on `:root`
- `--product-{category}-{name}` naming convention
- Loaded between system tokens and layout styles
- Can reference system tokens via `var()`

### iOS (Kenya)
- Swift caseless enums: `ProductLayout.contentMaxWidth`
- Can reference system tokens: `ProductLayout.contentInset = DesignTokens.space300`
- Separate namespace from `DesignTokens` to prevent confusion
- Generated from same source as web

### Android (Data)
- Kotlin objects: `ProductLayout.contentMaxWidth`
- Dp-typed vals, can reference `DesignTokens.*`
- Separate package/namespace from system tokens
- Generated from same source as web/iOS

---

## Proposed Architecture

### Source Definition

Extend `designerpunk.config.ts` with a `productValues` section:

```typescript
export default defineConfig({
  product: { name: 'DP-Portfolio', abbreviation: 'DPP' },
  themes: [...],
  productValues: {
    layout: {
      contentMaxWidth: { value: 1336, unit: 'px', description: 'Maximum content column width' },
      contentIndent: { ref: 'space300', description: 'Left indent for section content' },
      proseMeasureMax: { value: '48ch', platform: 'web', description: 'Maximum line length for body text' },
    },
    motion: {
      flipDuration: { ref: 'duration350', description: 'Card-to-modal expansion' },
      flickerDuration: { value: 800, unit: 'ms', description: 'Neon easter egg animation' },
    },
    // Extensible to more categories as products need them
  }
});
```

### Generation Output

The existing `npx designerpunk generate` command would produce:

**Web** (`dist/tokens/ProductValues.web.css`):
```css
:root {
  --product-layout-content-max-width: 1336px;
  --product-layout-content-indent: var(--space-300);
  --product-layout-prose-measure-max: 48ch;
  --product-motion-flip-duration: var(--duration-350);
  --product-motion-flicker-duration: 800ms;
}
```

**iOS** (`dist/tokens/ProductValues.ios.swift`):
```swift
enum ProductLayout {
    static let contentMaxWidth: CGFloat = 1336
    static let contentIndent: CGFloat = DesignTokens.space300
}
enum ProductMotion {
    static let flipDuration: TimeInterval = DesignTokens.duration350
    static let flickerDuration: TimeInterval = 0.8
}
```

**Android** (`dist/tokens/ProductValues.android.kt`):
```kotlin
object ProductLayout {
    val contentMaxWidth = 1336.dp
    val contentIndent = DesignTokens.Space300
}
object ProductMotion {
    val flipDuration = DesignTokens.Duration350
    val flickerDuration = 800L // ms
}
```

### Product MCP Integration

The Product MCP should serve product values as queryable data:
```
get_product_values({ category: "layout" })
→ Returns all layout product values with descriptions and token references
```

This fulfills the "(TBD)" in the MCP Relationship Model's product primitive/brand token naming.

---

## Key Design Decisions for @3fn/core Team

1. **Source format**: Should product values live in `designerpunk.config.ts` (co-located with other product config) or a separate `product-values.ts` file?
2. **Reference syntax**: How does a product value reference a system token? `{ ref: 'space300' }` vs `{ value: tokens.space300 }` vs string interpolation?
3. **Platform filtering**: Some values are web-only (e.g., `48ch`). How is platform applicability declared?
4. **Validation**: Should the pipeline validate that referenced tokens exist? (Probably yes — catches drift.)
5. **Naming convention enforcement**: Should the pipeline enforce `--product-{category}-{name}` naming, or is it advisory?
6. **Promotion workflow**: When a product value is promoted to a system token, what's the migration path? (Ideally: change from `productValues` to a semantic token definition, regenerate, and the CSS variable name changes from `--product-*` to `--semantic-*`.)

---

## Interim Solution (Before Pipeline Support)

Until @3fn/core implements this:
- Web: Hand-authored `src/styles/product-tokens.css` with structured comments
- iOS/Android: Not active yet — defer until platforms come online
- Agent discoverability: Steering doc section + structured CSS comments
- Governance: Product team owns; naming convention enforced by review

---

## Relationship to Existing Architecture

| Existing Concept | How Product Values Relate |
|-----------------|--------------------------|
| `designerpunk.config.ts` | Natural extension — product values are product configuration |
| `SemanticOverrides.ts` | Different concern — overrides change token VALUES; product values are NEW names |
| Component tokens | Different scope — component tokens are system-level; product values are product-level |
| Product MCP "brand tokens (TBD)" | THIS IS the implementation of that concept |
| Rosetta pipeline | Product values use a lighter pipeline (no math validation, no cross-product reuse requirement) |

---

## References

- MCP Relationship Model § "Product MCP" — brand tokens (TBD)
- Spec 002 Coverage Assessment § "Finding 6"
- Lesson Learned: `product/lessons-learned/2026-05-25-product-level-token-governance-gap.md`
- Ada consultation (2026-05-25): Rosetta boundary definition
- Kenya consultation (2026-05-25): iOS format needs
- Data consultation (2026-05-25): Android format needs
- Sparky consultation (2026-05-25): Web implementation needs
- Thurgood consultation (2026-05-25): Governance infrastructure
