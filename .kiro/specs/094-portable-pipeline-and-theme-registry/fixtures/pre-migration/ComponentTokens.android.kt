/**
 * DesignerPunk Design System - Component Tokens
 * Generated: 2026-04-04T00:41:33.710Z
 * Version: 1.0.0
 * Platform: Android (Kotlin Constants)
 *
 * Component-specific tokens that reference primitive tokens.
 * Use these for component-level styling consistency.
 */

package com.designerpunk.tokens

/** Avatar Component Tokens */
object AvatarTokens {
    // Extra small avatar (24px = 3× base) for inline mentions and compact UI contexts where minimal visual footprint is needed
    val sizeXs = SpacingTokens.size300
    // Small avatar (32px = 4× base) for list items and secondary UI contexts with moderate visual presence
    val sizeSm = SpacingTokens.size400
    // Medium avatar (40px = 5× base) as the default size, providing balanced visual weight for most UI contexts
    val sizeMd = SpacingTokens.size500
    // Large avatar (48px = 6× base) for profile headers and primary UI contexts requiring prominent visual presence
    val sizeLg = SpacingTokens.size600
    // Extra large avatar (80px = 10× base) for profile pages and hero sections where avatar is a focal point
    val sizeXl = SpacingTokens.size1000
    // Extra extra large avatar (128px = 16× base) for hero profiles and full-page profile views requiring maximum visual impact
    val sizeXxl = SpacingTokens.size1600
    // Icon size for xs avatar (12px = 1.5× base) maintains 50% ratio (12/24). No existing icon token at this size, so component token fills the gap.
    val iconSizeXs = 12.dp
    // Icon size for xxl avatar (64px = 8× base) maintains 50% ratio (64/128). No existing icon token at this size, so component token fills the gap.
    val iconSizeXxl = 64.dp
}

/** BadgeLabelBase Component Tokens */
object BadgeLabelBaseTokens {
    // Maximum width for truncated badges; allows ~12-15 characters before ellipsis while maintaining compact badge appearance. Value follows spacing family pattern (8 × 15 = 120px) but exceeds standard spacing scale, requiring component-level definition.
    val maxWidth = 120.dp
}

/** ButtonIcon Component Tokens */
object ButtonIconTokens {
    // Large button variant requires 12px padding (1.5× base) for comfortable touch target and visual balance with larger icon sizes
    val insetLarge = SpacingTokens.space150
    // Medium button variant uses 10px padding (1.25× base strategic flexibility token) for compact appearance while maintaining adequate touch area
    val insetMedium = SpacingTokens.space125
    // Small button variant uses 8px padding (1× base) for minimal footprint in dense UI layouts while meeting minimum touch target requirements
    val insetSmall = SpacingTokens.space100
    // Large button size (48px = 6× base) provides generous touch target exceeding tapAreaRecommended, calculated as icon (24px) + padding (12px × 2)
    val sizeLarge = SpacingTokens.size600
    // Medium button size (40px = 5× base) provides standard touch target, calculated as icon (18px) + padding (10px × 2) rounded to grid
    val sizeMedium = SpacingTokens.size500
    // Small button size (32px = 4× base) provides compact visual footprint, calculated as icon (13px) + padding (8px × 2) rounded to grid
    val sizeSmall = SpacingTokens.size400
}

/** Progress Component Tokens */
object ProgressTokens {
    // Small node base size (12px). Inactive dots in compact mobile contexts.
    val nodeSizeSm = SpacingTokens.size150
    // Medium node base size (16px). Default inactive dot size.
    val nodeSizeMd = SpacingTokens.size200
    // Large node base size (20px). Inactive dots in desktop contexts.
    val nodeSizeLg = SpacingTokens.size250
    // Current node emphasis for sm (16px). +4px over base 12px for non-color visual differentiation.
    val nodeSizeSmCurrent = SpacingTokens.size200
    // Current node emphasis for md (20px). +4px over base 16px for non-color visual differentiation.
    val nodeSizeMdCurrent = SpacingTokens.size250
    // Current node emphasis for lg (24px). +4px over base 20px for non-color visual differentiation.
    val nodeSizeLgCurrent = SpacingTokens.size300
    // Small gap between nodes (6px = 0.75× base). Tight spacing for compact pagination dots in mobile contexts.
    val nodeGapSm = SpacingTokens.space075
    // Medium gap between nodes (8px = 1× base). Default spacing for stepper nodes, providing clear separation without excessive whitespace.
    val nodeGapMd = SpacingTokens.space100
    // Large gap between nodes (12px = 1.5× base). Generous spacing for detailed steppers with labels in desktop contexts.
    val nodeGapLg = SpacingTokens.space150
    // Connector line thickness (1px). References borderDefault primitive for consistent border treatment across the design system.
    val connectorThickness = SpacingTokens.borderWidth100
}

/** VerticalListItem Component Tokens */
object VerticalListItemTokens {
    // Block padding at rest state (1px border). 11px padding + 1px border = 12px per side, achieving 48px total with 24px content. Uses TokenWithValue pattern as no primitive token exists for 11px.
    val paddingBlockRest = 11.dp
    // Block padding when selected (2px border). 10px padding + 2px border = 12px per side, maintaining 48px total with 24px content. References space125 strategic flexibility token.
    val paddingBlockSelected = SpacingTokens.space125
}
