---
id: token-family-shadow
inclusion: manual
name: Token-Family-Shadow
description: Shadow token family — directional depth effects with compositional offset, blur, opacity, and color primitives. Load when working with elevation, depth, card shadows, or spatial hierarchy.
---

# Shadow Token Usage Documentation

**Date**: 2025-10-24
**Last Reviewed**: 2026-07-08
**Purpose**: Shadow token reference and usage guide
**Organization**: token-documentation
**Scope**: cross-project
**Layer**: 3
**Relevant Tasks**: component-development, token-selection

---

## Overview

The Shadow Token System provides mathematically consistent primitives for creating depth effects across web, iOS, and Android platforms. Shadows convey elevation and spatial relationships using directional lighting principles inspired by the sun's arc throughout the day.

The system follows a compositional architecture where semantic shadow tokens compose multiple primitive tokens (offsetX, offsetY, blur, opacity, color) to create complete shadow styles for specific use cases.

---

## Shadow Primitive Tokens

Shadow primitives are the foundational building blocks that semantic shadows compose. Each primitive represents a single shadow property with mathematically consistent values across platforms.

### Shadow Offset Tokens

Shadow offsets determine shadow direction based on light source position (sun arc).

#### Shadow Offset X (Horizontal Direction)

Horizontal offsets represent the sun's position throughout the day:

| Token | Value | Description | Use Case |
|-------|-------|-------------|----------|
| `shadowOffsetX.n300` | -12px | Sunrise - large left offset | Dramatic sunrise lighting |
| `shadowOffsetX.n200` | -8px | Strategic flexibility - medium-large left | Morning variations |
| `shadowOffsetX.n150` | -6px | Morning - medium left offset | Morning lighting |
| `shadowOffsetX.n100` | -4px | Strategic flexibility - small left | Subtle morning shadows |
| `shadowOffsetX.000` | 0px | Noon - no horizontal offset | Standard UI shadows |
| `shadowOffsetX.100` | 4px | Strategic flexibility - small right | Subtle dusk shadows |
| `shadowOffsetX.150` | 6px | Dusk - medium right offset | Dusk lighting |
| `shadowOffsetX.200` | 8px | Strategic flexibility - medium-large right | Dusk variations |
| `shadowOffsetX.300` | 12px | Sunset - large right offset | Dramatic sunset lighting |

**Mathematical Foundation**: Base value = 4px (4px baseline grid alignment)

**Sun Arc Framework**:
- **Negative values**: Sunrise/morning shadows (shadow falls left)
- **Zero value**: Noon shadows (no horizontal offset)
- **Positive values**: Dusk/sunset shadows (shadow falls right)

#### Shadow Offset Y (Vertical Direction)

Vertical offsets scale with depth (all positive - shadows fall downward):

| Token | Value | Description | Use Case |
|-------|-------|-------------|----------|
| `shadowOffsetY.100` | 4px | Depth 100 / Noon - short shadow | Low elevation elements |
| `shadowOffsetY.200` | 8px | Depth 200 - medium shadow | Raised elements (cards, modals) |
| `shadowOffsetY.300` | 12px | Morning/Dusk - medium-long | Directional lighting |
| `shadowOffsetY.400` | 16px | Depth 300 / Sunrise/Sunset - long | Floating elements (FABs) |

**Mathematical Foundation**: Base value = 4px, scales with multipliers (1x, 2x, 3x, 4x)

### Shadow Blur Tokens

Shadow blur primitives are part of the unified Blur Token Family. See [Token-Family-Blur.md](token-family-blur) for the complete blur primitive scale.

Shadow composites reference these blur primitives:

| Shadow Use | Blur Token | Value |
|-----------|------------|-------|
| No shadow | `blur000` | 0 |
| Sharp edges | `blur025` | 4 |
| Standard UI | `blur075` | 12 |
| Raised elements | `blur100` | 16 |
| Subtle/hover | `blur125` | 20 |
| Floating elements | `blur150` | 24 |

### Shadow Opacity Tokens

Shadow opacity determines shadow darkness based on quality and depth.

#### Quality-Based Opacity

| Token | Value | Description | Use Case |
|-------|-------|-------------|----------|
| `shadowOpacityNone` | 0 | No shadow — flat surface | `shadow.none` |
| `shadowOpacityHard` | 0.4 | Darker for sharp shadows | Strong, defined shadows |
| `shadowOpacityModerate` | 0.3 | Balanced opacity | Standard UI shadows |
| `shadowOpacitySoft` | 0.2 | Lighter for diffuse shadows | Subtle, gentle shadows |

#### Depth-Based Opacity

| Token | Value | Description | Use Case |
|-------|-------|-------------|----------|
| `shadowOpacityDepth200` | 0.35 | Slightly darker for raised elements | Modals, elevated cards |
| `shadowOpacityDepth300` | 0.4 | Darkest for floating elements | FABs, tooltips |

**Mathematical Foundation**: Base value = 0.3, scales with multipliers (0.67x, 1x, 1.17x, 1.33x)

### Shadow Color Tokens

Shadow colors are based on art theory: shadows are rarely pure black but tinted by ambient light.

#### Primitive Shadow Colors

| Token | Value (OKLCH) | Description | Art Theory |
|-------|---------------|-------------|------------|
| `shadowBlack100` | `oklch(0 0 0)` | Pure black | Neutral lighting (noon) |
| `shadowBlue100` | `oklch(0.2161 0.0306 269.6)` | Blue-gray tint | Warm light creates cool shadows (sunrise/sunset) |
| `shadowOrange100` | `oklch(0.1956 0.0127 67)` | Warm tint | Cool light creates warm shadows |
| `shadowGray100` | `oklch(0.1912 0.0219 263.8)` | Blue-gray tint | Ambient/overcast lighting |

The four are defined in OKLCH like the other colour families (`src/tokens/color/primitives/shadow.ts`), to the same colours they had as `rgba` (`rgb(0, 0, 0)`, `rgb(20, 25, 40)`, `rgb(25, 20, 15)` and `rgb(15, 20, 30)`): each value's sRGB hex is the hex of the earlier `rgba`, and a Jest test asserts it. Spec 129 Task 8.2 made the change; it created no token and changed no name. They are emitted on web (`--shadow-black-100`), iOS (`shadowBlack100`) and Android (`shadow_black_100`), so the 15 shadow composites that name `shadowBlack100` or `shadowBlue100` resolve on all three.

#### No Semantic Shadow Color Layer

There is **no** `color.shadow.*`<!-- example: generic --> semantic tier. Shadow tokens reference the primitive shadow colors
directly (`shadow.container` → `shadowBlack100`), matching how typography tokens compose primitives
without an intermediate semantic layer. The rationale is recorded in `src/tokens/semantic/ColorTokens.ts`
§ "ARCHITECTURAL DECISION: Shadow Color Semantic Layer Removed".

**Note**: Shadow colors are mode-agnostic (always dark) regardless of light/dark theme. They have no
channel tokens (no hue, lightness or chroma primitives of their own): the shadow family's channel
structure belongs with blend in the colour-track spec (Spec 133), and until then a shadow colour
is one OKLCH value. The legacy `rgba` definitions remain in `src/tokens/ColorTokens.ts`, the source the earlier-value test reads.

---

## Shadow Semantic Tokens

Semantic shadow tokens compose primitives to create complete shadow styles for specific use cases.

**Complete set** (`src/tokens/semantic/ShadowTokens.ts`) — 15 tokens:

| Token | offsetX | offsetY | blur | opacity | color |
|-------|---------|---------|------|---------|-------|
| `shadow.none` | `shadowOffsetX.000` | `shadowOffsetY.000` | `blur000` | `shadowOpacityNone` | `shadowBlack100` |
| `shadow.container` | `shadowOffsetX.000` | `shadowOffsetY.100` | `blur075` | `shadowOpacityModerate` | `shadowBlack100` |
| `shadow.navigation` | `shadowOffsetX.000` | `shadowOffsetY.100` | `blur125` | `shadowOpacitySoft` | `shadowBlack100` |
| `shadow.dropdown` | `shadowOffsetX.000` | `shadowOffsetY.100` | `blur075` | `shadowOpacityModerate` | `shadowBlack100` |
| `shadow.modal` | `shadowOffsetX.000` | `shadowOffsetY.200` | `blur100` | `shadowOpacityDepth200` | `shadowBlack100` |
| `shadow.toast` | `shadowOffsetX.000` | `shadowOffsetY.300` | `blur150` | `shadowOpacityDepth300` | `shadowBlack100` |
| `shadow.tooltip` | `shadowOffsetX.000` | `shadowOffsetY.300` | `blur150` | `shadowOpacityDepth300` | `shadowBlack100` |
| `shadow.fab` | `shadowOffsetX.300` | `shadowOffsetY.400` | `blur025` | `shadowOpacityHard` | `shadowBlue100` |
| `shadow.hover` | `shadowOffsetX.000` | `shadowOffsetY.100` | `blur125` | `shadowOpacitySoft` | `shadowBlack100` |
| `shadow.navigation.indicator` | `shadowOffsetX.000` | `shadowOffsetY.000` | `blur025` | `shadowOpacitySoft` | `shadowBlack100` |
| `shadow.sunrise` | `shadowOffsetX.n300` | `shadowOffsetY.200` | `blur075` | `shadowOpacityModerate` | `shadowBlue100` |
| `shadow.morning` | `shadowOffsetX.n150` | `shadowOffsetY.200` | `blur075` | `shadowOpacityModerate` | `shadowBlack100` |
| `shadow.noon` | `shadowOffsetX.000` | `shadowOffsetY.200` | `blur075` | `shadowOpacityModerate` | `shadowBlack100` |
| `shadow.dusk` | `shadowOffsetX.150` | `shadowOffsetY.200` | `blur075` | `shadowOpacityModerate` | `shadowBlack100` |
| `shadow.sunset` | `shadowOffsetX.300` | `shadowOffsetY.200` | `blur075` | `shadowOpacityModerate` | `shadowBlue100` |

The sections below detail the most frequently used of these.

### Standard UI Shadows

#### shadow.container

Standard container shadow with noon lighting and moderate quality.

**Composition**:
- offsetX: `shadowOffsetX.000` (0px)
- offsetY: `shadowOffsetY.100` (4px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlack100` (black)

**Use Cases**: Cards, panels, containers with subtle elevation

**Visual Effect**: Subtle shadow directly below element, balanced definition

#### shadow.modal

Modal shadow with noon lighting and depth 200.

**Composition**:
- offsetX: `shadowOffsetX.000` (0px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur100` (16px)
- opacity: `shadowOpacityDepth200` (0.35)
- color: `shadowBlack100` (black)

**Use Cases**: Modals, dialogs, overlays with medium elevation

**Visual Effect**: Medium shadow with increased blur and opacity for raised elements

#### shadow.hover

Hover state shadow with noon lighting and soft quality.

**Composition**:
- offsetX: `shadowOffsetX.000` (0px)
- offsetY: `shadowOffsetY.100` (4px)
- blur: `blur125` (20px)
- opacity: `shadowOpacitySoft` (0.2)
- color: `shadowBlack100` (black)

**Use Cases**: Hover states, interactive elements with subtle elevation change

**Visual Effect**: Soft, diffuse shadow for gentle elevation feedback

#### shadow.fab

Floating action button shadow with sunset lighting and hard quality.

**Composition**:
- offsetX: `shadowOffsetX.300` (12px)
- offsetY: `shadowOffsetY.400` (16px)
- blur: `blur025` (4px)
- opacity: `shadowOpacityHard` (0.4)
- color: `shadowBlue100` (blue-gray)

**Use Cases**: Floating action buttons, prominent CTAs with dramatic elevation

**Visual Effect**: Dramatic shadow with directional offset and warm tint

#### shadow.navigation.indicator

Navigation indicator shadow for active segment/tab indicators within navigation controls.

**Composition**:
- offsetX: `shadowOffsetX.000` (0px)
- offsetY: `shadowOffsetY.000` (0px)
- blur: `blur025` (4px)
- opacity: `shadowOpacitySoft` (0.2)
- color: `shadowBlack100` (black)

**Use Cases**: Active segment indicators in SegmentedChoice, sliding tab indicators

**Visual Effect**: Omnidirectional, tight but gentle edge definition — "lifted paper" feel for inset elements

**Android Note**: This token must be consumed via `Modifier.shadow(elevation = 2.dp, shape = ...).clip(shape)`, NOT through `mapShadowToElevation()` or `Surface(elevation = ...)`. The indicator is an inset element — absolute elevation would conflict with parent surfaces. See Spec 049 design outline for full rationale.

### Directional Shadow Variations

Directional shadows demonstrate the sun arc framework with lighting-appropriate colors. These tokens follow the sun's arc throughout the day, providing consistent directional lighting for themed interfaces.

**Note**: `shadow.container` uses the same noon lighting pattern (no horizontal offset, default color) but is named semantically for its use case rather than its lighting. Use `shadow.noon` when you want to explicitly indicate noon lighting in a directional series.

#### shadow.sunrise

Sunrise lighting shadow with left offset and warm color.

**Composition**:
- offsetX: `shadowOffsetX.n300` (-12px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlue100` (blue-gray)

**Use Cases**: Sunrise-themed interfaces, morning dashboards

**Visual Effect**: Shadow falls to the left with warm blue-gray tint

#### shadow.morning

Morning lighting shadow with medium left offset and default color.

**Composition**:
- offsetX: `shadowOffsetX.n150` (-6px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlack100` (black)

**Use Cases**: Morning-themed interfaces, subtle directional lighting

**Visual Effect**: Shadow falls to the left with neutral color

#### shadow.noon

Noon lighting shadow with no horizontal offset and default color.

**Composition**:
- offsetX: `shadowOffsetX.000` (0px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlack100` (black)

**Use Cases**: Noon-themed interfaces, neutral directional lighting, completing the sun arc series

**Visual Effect**: Shadow falls directly below with neutral color (no horizontal offset)

**Relationship to shadow.container**: This token uses the same noon lighting pattern as `shadow.container` (no horizontal offset, default color). The difference is semantic naming: `shadow.noon` explicitly indicates noon lighting in a directional series, while `shadow.container` is named for its use case (standard container shadows). Both are valid choices depending on whether you want to emphasize lighting (noon) or use case (container).

#### shadow.dusk

Dusk lighting shadow with medium right offset and default color.

**Composition**:
- offsetX: `shadowOffsetX.150` (6px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlack100` (black)

**Use Cases**: Dusk-themed interfaces, subtle directional lighting

**Visual Effect**: Shadow falls to the right with neutral color

#### shadow.sunset

Sunset lighting shadow with right offset and warm color.

**Composition**:
- offsetX: `shadowOffsetX.300` (12px)
- offsetY: `shadowOffsetY.200` (8px)
- blur: `blur075` (12px)
- opacity: `shadowOpacityModerate` (0.3)
- color: `shadowBlue100` (blue-gray)

**Use Cases**: Sunset-themed interfaces, evening dashboards

**Visual Effect**: Shadow falls to the right with warm blue-gray tint

---

## Cross-Platform Usage

### Web (CSS)

Shadow tokens translate to CSS `box-shadow` format.

#### Using Semantic Shadows

```css
/* Apply shadow.container to an element */
.card {
  box-shadow: var(--shadow-container);
}

/* Apply shadow.modal to a modal */
.modal {
  box-shadow: var(--shadow-modal);
}

/* Apply shadow.hover on hover state */
.button:hover {
  box-shadow: var(--shadow-hover);
}
```

#### Using Individual Shadow Properties

```css
/* Access individual shadow properties */
.custom-shadow {
  box-shadow: 
    var(--shadow-container-offset-x) 
    var(--shadow-container-offset-y) 
    var(--shadow-container-blur) 
    color-mix(in oklab, var(--shadow-container-color) calc(var(--shadow-container-opacity) * 100%), transparent);
}
```

#### Generated CSS Custom Properties

```css
:root {
  /* shadow.container */
  --shadow-black-100: oklch(0 0 0);
  --shadow-blue-100: oklch(0.2161 0.0306 269.6);

  /* shadow.container */
  --shadow-container-offset-x: var(--shadow-offset-x-000);
  --shadow-container-offset-y: var(--shadow-offset-y-100);
  --shadow-container-blur: var(--blur-075);
  --shadow-container-opacity: var(--shadow-opacity-moderate);
  --shadow-container-color: var(--shadow-black-100);
  --shadow-container: var(--shadow-container-offset-x) var(--shadow-container-offset-y) var(--shadow-container-blur) color-mix(in oklab, var(--shadow-black-100) calc(var(--shadow-container-opacity) * 100%), transparent);

  /* shadow.fab: its colour is shadowBlue100, so the composite reads --shadow-blue-100 */
  --shadow-fab-offset-x: var(--shadow-offset-x-300);
  --shadow-fab-offset-y: var(--shadow-offset-y-400);
  --shadow-fab-blur: var(--blur-025);
  --shadow-fab-opacity: var(--shadow-opacity-hard);
  --shadow-fab-color: var(--shadow-blue-100);
  --shadow-fab: var(--shadow-fab-offset-x) var(--shadow-fab-offset-y) var(--shadow-fab-blur) color-mix(in oklab, var(--shadow-blue-100) calc(var(--shadow-fab-opacity) * 100%), transparent);
}
```

The composite takes its colour from the colour token's custom property, never from a literal: before Spec 129 Task 8.2 it was `rgba(0, 0, 0, …)` for every shadow, so the three blue-tinted shadows (`shadow.fab`, `shadow.sunrise`, `shadow.sunset`) rendered black.

#### Web Platform Notes

- **Full Support**: Web supports all shadow properties (offsetX, offsetY, blur, opacity, color)
- **Spread Property**: Omitted for cross-platform consistency (iOS/Android don't support spread)
- **Performance**: Use CSS custom properties for efficient shadow updates
- **Browser Support**: Modern browsers support `box-shadow` with OKLCH colors (Chrome 111+, Safari 15.4+, Firefox 113+). The composite also uses `color-mix()` (Chrome 111+, Safari 16.2+, Firefox 113+)

### iOS (Swift)

Shadow tokens translate to iOS `CALayer` shadow properties.

#### Using Semantic Shadows

```swift
// Apply shadow.container to a view
view.layer.applyShadow(ShadowTokens.container)

// Apply shadow.modal to a modal view
modalView.layer.applyShadow(ShadowTokens.modal)

// Apply shadow.fab to a floating action button
fabButton.layer.applyShadow(ShadowTokens.fab)
```

#### Using Individual Shadow Properties

```swift
// Access individual shadow properties
view.layer.shadowOffset = ShadowTokens.container.offset
view.layer.shadowRadius = ShadowTokens.container.radius
view.layer.shadowOpacity = ShadowTokens.container.opacity
view.layer.shadowColor = ShadowTokens.container.color.cgColor
```

#### Generated Swift Code

```swift
import UIKit

extension CALayer {
  /// Apply shadow token to layer
  func applyShadow(_ shadow: ShadowToken) {
    self.shadowOffset = shadow.offset
    self.shadowRadius = shadow.radius
    self.shadowOpacity = shadow.opacity
    self.shadowColor = shadow.color.cgColor
  }
}

/// Shadow token structure
struct ShadowToken {
  let offset: CGSize
  let radius: CGFloat
  let opacity: Float
  let color: UIColor
}

/// Shadow tokens
enum ShadowTokens {
  /// Container shadow with no horizontal offset, 4px vertical offset, 12px blur, moderate opacity
  static let container = ShadowToken(
    offset: CGSize(width: 0, height: 4),
    radius: 6,  // blur / 2 for iOS
    opacity: 0.3,
    color: Color(.displayP3, red: 0, green: 0, blue: 0, opacity: 1)
  )
  
  /// Modal shadow with no horizontal offset, 8px vertical offset, 16px blur, slightly darker opacity
  static let modal = ShadowToken(
    offset: CGSize(width: 0, height: 8),
    radius: 8,  // blur / 2 for iOS
    opacity: 0.35,
    color: Color(.displayP3, red: 0, green: 0, blue: 0, opacity: 1)
  )
  
  /// Dramatic shadow with 12px right offset, 16px down offset, 4px blur, darker opacity, warm (blue-gray) tint
  static let fab = ShadowToken(
    offset: CGSize(width: 12, height: 16),
    radius: 2,  // blur / 2 for iOS
    opacity: 0.4,
    color: Color(.displayP3, red: 0.0822, green: 0.0974, blue: 0.1522, opacity: 1)
  )
}
```

The block above is the usage pattern, not the generated file. The generated `DesignTokens.ios.swift` defines `public struct ShadowToken: Sendable` with `offsetX`, `offsetY`, `blur` and `opacity` (`CGFloat`) and `color` (`Color`), and each of the 15 composites as a member of `DesignTokens`: `public static let shadowFab = ShadowToken(offsetX: shadowOffsetX300, offsetY: shadowOffsetY400, blur: blur025, opacity: shadowOpacityHard, color: shadowBlue100)`. Its colour primitives are `Color(.displayP3, red:, green:, blue:, opacity:)` constants with channels computed at generation, so the file needs no colour library.

#### iOS Platform Notes

- **shadowOffset**: CGSize(width: offsetX, height: offsetY)
- **shadowRadius**: blur / 2 (iOS shadowRadius is half the blur value to match visual appearance)
- **shadowOpacity**: Float value (0-1)
- **shadowColor**: UIColor.cgColor
- **Spread Not Supported**: iOS does not support shadow spread property
- **Performance**: Set `shadowPath` for better performance with complex shapes

### Android (Kotlin)

Shadow tokens translate to Android `elevation` values (Material Design).

#### Using Semantic Shadows

```kotlin
// Apply shadow.container to a view
view.elevation = ShadowTokens.container.elevation.value

// Apply shadow.modal to a modal
modalView.elevation = ShadowTokens.modal.elevation.value

// Apply shadow.fab to a FAB (Compose)
FloatingActionButton(
    modifier = Modifier.shadow(ShadowTokens.fab)
) {
    Icon(Icons.Default.Add, contentDescription = "Add")
}
```

#### Using Shadow Extension

```kotlin
// Compose modifier extension
Box(
    modifier = Modifier
        .shadow(ShadowTokens.container)
        .background(Color.White)
) {
    Text("Card Content")
}
```

#### Generated Kotlin Code

```kotlin
package com.designerpunk.tokens

import androidx.compose.ui.unit.dp

/**
 * Shadow token data class
 */
data class ShadowToken(
    val elevation: androidx.compose.ui.unit.Dp,
    val strategy: String,
    val limitations: List<String>
)

/**
 * Shadow tokens
 */
object ShadowTokens {
    /**
     * Container shadow with no horizontal offset, 4px vertical offset, 12px blur, moderate opacity
     * 
     * Approximation Strategy: blur-based
     * Original Properties:
     * - offsetX: 0dp
     * - offsetY: 4dp
     * - blur: 12dp
     * - opacity: 0.3
     * 
     * Limitations:
     * - Shadow spread not supported - omitted for cross-platform consistency
     */
    val container = ShadowToken(
        elevation = 12.dp,
        strategy = "blur-based",
        limitations = listOf(
            "Shadow spread not supported - omitted for cross-platform consistency"
        )
    )
    
    /**
     * Modal shadow with no horizontal offset, 8px vertical offset, 16px blur, slightly darker opacity
     * 
     * Approximation Strategy: blur-based
     * Original Properties:
     * - offsetX: 0dp
     * - offsetY: 8dp
     * - blur: 16dp
     * - opacity: 0.35
     * 
     * Limitations:
     * - Shadow spread not supported - omitted for cross-platform consistency
     */
    val modal = ShadowToken(
        elevation = 16.dp,
        strategy = "blur-based",
        limitations = listOf(
            "Shadow spread not supported - omitted for cross-platform consistency"
        )
    )
    
    /**
     * Dramatic shadow with 12px right offset, 16px down offset, 4px blur, darker opacity, warm (blue-gray) tint
     * 
     * Approximation Strategy: combined
     * Original Properties:
     * - offsetX: 12dp
     * - offsetY: 16dp
     * - blur: 4dp
     * - opacity: 0.4
     * 
     * Limitations:
     * - Directional shadow (offsetX: 12dp) not supported - Android elevation uses fixed light source from top
     * - Custom opacity (0.4) not supported - Android elevation uses system-controlled opacity
     * - Custom shadow color not supported - Android elevation uses system-controlled shadow color
     * - Shadow spread not supported - omitted for cross-platform consistency
     */
    val fab = ShadowToken(
        elevation = 10.dp,
        strategy = "combined",
        limitations = listOf(
            "Directional shadow (offsetX: 12dp) not supported - Android elevation uses fixed light source from top",
            "Custom opacity (0.4) not supported - Android elevation uses system-controlled opacity",
            "Custom shadow color not supported - Android elevation uses system-controlled shadow color",
            "Shadow spread not supported - omitted for cross-platform consistency"
        )
    )
}

/**
 * Extension function to apply shadow token to Modifier
 */
fun androidx.compose.ui.Modifier.shadow(shadow: ShadowToken): androidx.compose.ui.Modifier {
    return this.shadow(elevation = shadow.elevation)
}
```

The block above shows the elevation approximation a component derives from a shadow; it is not the generated file. The generated `DesignTokens.android.kt` defines `data class ShadowToken(val offsetX: Float, val offsetY: Float, val blur: Float, val opacity: Float, val color: Color)` and each of the 15 composites as a member of `DesignTokens` (`val shadow_fab = ShadowToken(offsetX = …, color = shadow_blue_100)`). Its colour primitives are `Color(r, g, b, a, ColorSpaces.DisplayP3)` constants with channels computed at generation, so the file needs no colour library. The type table (Spec 129 row 6) retypes the numeric fields.

#### Android Platform Limitations

Android uses Material Design elevation, which is an approximation of the shadow system:

**Elevation Approximation Strategies**:
1. **Blur-based** (most common): elevation ≈ blur
2. **Offset-based**: elevation ≈ offsetY (for shadows with large offsets)
3. **Combined**: elevation ≈ (blur + offsetY) / 2 (for balanced shadows)

**What's Not Supported**:
- **Directional shadows** (offsetX): Android elevation uses fixed light source from top
- **Custom opacity**: Android elevation uses system-controlled opacity
- **Custom shadow color**: Android elevation uses system-controlled shadow color
- **Shadow spread**: Not supported (omitted for cross-platform consistency)

**When to Use Custom Drawables**:

For precise shadow control beyond elevation approximation, custom drawable generation would be required. This is a future enhancement for cases where:
- Directional shadows are critical to the design
- Custom shadow colors are required
- Precise opacity control is needed

---

## Design Guidelines

### When to Use Each Shadow

#### shadow.container
- **Use for**: Cards, panels, containers with subtle elevation
- **Elevation level**: Low (depth 100)
- **Visual weight**: Subtle, balanced
- **Lighting**: Noon (no directional offset)

#### shadow.modal
- **Use for**: Modals, dialogs, overlays with medium elevation
- **Elevation level**: Medium (depth 200)
- **Visual weight**: Moderate, noticeable
- **Lighting**: Noon (no directional offset)

#### shadow.hover
- **Use for**: Hover states, interactive elements with subtle elevation change
- **Elevation level**: Low (depth 100)
- **Visual weight**: Very subtle, soft
- **Lighting**: Noon (no directional offset)

#### shadow.fab
- **Use for**: Floating action buttons, prominent CTAs with dramatic elevation
- **Elevation level**: High (depth 300)
- **Visual weight**: Strong, dramatic
- **Lighting**: Sunset (directional offset with warm tint)

#### shadow.navigation.indicator
- **Use for**: Active indicators within navigation controls (segmented choice, tab bars)
- **Elevation level**: Minimal (2dp Android, purely visual — no stacking context)
- **Visual weight**: Very subtle, omnidirectional
- **Lighting**: None (no directional offset — element is inside a container, not floating)

#### Directional Shadows (sunrise, morning, noon, dusk, sunset)
- **Use for**: Themed interfaces, time-of-day experiences, completing the sun arc series
- **Elevation level**: Medium (depth 200)
- **Visual weight**: Moderate with directional character
- **Lighting**: Varies by time of day (sunrise → morning → noon → dusk → sunset)

**Note**: For standard UI shadows without directional theming, use `shadow.container` instead of `shadow.noon`. Both use noon lighting, but `shadow.container` is semantically named for its use case.

### Composing Custom Shadows

When semantic shadows don't meet your needs, compose custom shadows from primitives:

```typescript
// Example: Custom shadow for a specific use case
const customShadow = {
  offsetX: 'shadowOffsetX.150',      // Dusk offset
  offsetY: 'shadowOffsetY.200',      // Medium depth
  blur: 'blur125',                   // Soft edges (20)
  opacity: 'shadowOpacityModerate',  // Balanced opacity
  color: 'shadowBlack100'            // Neutral color
};
```

**Guidelines for Custom Shadows**:
1. **Start with semantic shadows**: Use existing semantic shadows when possible
2. **Compose from primitives**: Build custom shadows from primitive tokens
3. **Follow sun arc framework**: Use appropriate offsetX for lighting direction
4. **Match quality and depth**: Combine quality-based and depth-based tokens consistently
5. **Consider cross-platform**: Remember Android limitations when using directional shadows

### Accessibility Considerations

**Contrast and Visibility**:
- Ensure shadows provide sufficient contrast for depth perception
- Test shadows in both light and dark modes
- Consider users with low vision or color blindness

**Motion and Animation**:
- Animate shadow changes smoothly for hover/focus states
- Use appropriate easing functions for natural shadow transitions
- Avoid rapid shadow changes that could trigger motion sensitivity

**Semantic Meaning**:
- Use shadows consistently to convey elevation hierarchy
- Don't rely solely on shadows to convey critical information
- Provide alternative cues (borders, spacing) for users who may not perceive shadows

---

## Mathematical Foundation

### Base-8 System

All shadow tokens follow the base-8 mathematical foundation:

- **Offset base**: 4px (4px baseline grid alignment)
- **Blur base**: 4px (4px baseline grid alignment)
- **Opacity base**: 0.3 (unitless)

### Baseline Grid Alignment

Shadow values preferably align to the 4px baseline grid:

- **Aligned values**: 0, 4, 8, 12, 16, 20, 24 (multiples of 4)
- **Strategic flexibility**: 6 (1.5x multiplier) for natural shadow progression
- **Opacity**: Unitless values don't require grid alignment

### Mathematical Relationships

**Offset Tokens**:
- shadowOffsetX.n300 = base × -3 = 4 × -3 = -12
- shadowOffsetX.000 = base × 0 = 4 × 0 = 0
- shadowOffsetX.300 = base × 3 = 4 × 3 = 12
- shadowOffsetY.100 = base × 1 = 4 × 1 = 4
- shadowOffsetY.400 = base × 4 = 4 × 4 = 16

**Blur Tokens** (unified `blur` family, base 16 — Spec 089 replaced the old `shadowBlur*` family; see `token-family-blur`):
- blur025 = base × 0.25 = 16 × 0.25 = 4
- blur075 = base × 0.75 = 16 × 0.75 = 12
- blur100 = base × 1 = 16 × 1 = 16
- blur125 = base × 1.25 = 16 × 1.25 = 20
- blur150 = base × 1.5 = 16 × 1.5 = 24

**Opacity Tokens**:
- shadowOpacityHard = base × 1.33 = 0.3 × 1.33 ≈ 0.4
- shadowOpacityModerate = base × 1 = 0.3 × 1 = 0.3
- shadowOpacitySoft = base × 0.67 = 0.3 × 0.67 ≈ 0.2
- shadowOpacityDepth200 = base × 1.17 = 0.3 × 1.17 ≈ 0.35
- shadowOpacityDepth300 = base × 1.33 = 0.3 × 1.33 ≈ 0.4

---

## Related Documentation

- [Glow Token Documentation](token-family-glow) - Glow primitive tokens for emphasis effects
- [Token System Overview](../docs/token-system-overview.md) - Complete token system architecture
- [Shadow and Glow Design Document](../.kiro/specs/shadow-glow-token-system/design.md) - Detailed design decisions and rationale
- [Shadow and Glow Requirements](../.kiro/specs/shadow-glow-token-system/requirements.md) - System requirements and acceptance criteria
- [Component Development Guide](component-development-guide) - Token usage in component development
- [Token Resolution Patterns](token-resolution-patterns) - Strategic guidance on token type selection and validation

---

*This documentation provides comprehensive guidance for using shadow tokens across web, iOS, and Android platforms with mathematically consistent values and cross-platform unity.*
