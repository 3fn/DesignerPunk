///
/// DesignerPunk Design System - Component Tokens
/// Generated: 2026-04-04T00:41:33.710Z
/// Version: 1.0.0
/// Platform: iOS (Swift Constants)
///
/// Component-specific tokens that reference primitive tokens.
/// Use these for component-level styling consistency.
///

import UIKit

/// Avatar Component Tokens
public enum AvatarTokens {
    /// Extra small avatar (24px = 3× base) for inline mentions and compact UI contexts where minimal visual footprint is needed
    public static let sizeXs: CGFloat = SpacingTokens.size300
    /// Small avatar (32px = 4× base) for list items and secondary UI contexts with moderate visual presence
    public static let sizeSm: CGFloat = SpacingTokens.size400
    /// Medium avatar (40px = 5× base) as the default size, providing balanced visual weight for most UI contexts
    public static let sizeMd: CGFloat = SpacingTokens.size500
    /// Large avatar (48px = 6× base) for profile headers and primary UI contexts requiring prominent visual presence
    public static let sizeLg: CGFloat = SpacingTokens.size600
    /// Extra large avatar (80px = 10× base) for profile pages and hero sections where avatar is a focal point
    public static let sizeXl: CGFloat = SpacingTokens.size1000
    /// Extra extra large avatar (128px = 16× base) for hero profiles and full-page profile views requiring maximum visual impact
    public static let sizeXxl: CGFloat = SpacingTokens.size1600
    /// Icon size for xs avatar (12px = 1.5× base) maintains 50% ratio (12/24). No existing icon token at this size, so component token fills the gap.
    public static let iconSizeXs: CGFloat = 12
    /// Icon size for xxl avatar (64px = 8× base) maintains 50% ratio (64/128). No existing icon token at this size, so component token fills the gap.
    public static let iconSizeXxl: CGFloat = 64
}

/// BadgeLabelBase Component Tokens
public enum BadgeLabelBaseTokens {
    /// Maximum width for truncated badges; allows ~12-15 characters before ellipsis while maintaining compact badge appearance. Value follows spacing family pattern (8 × 15 = 120px) but exceeds standard spacing scale, requiring component-level definition.
    public static let maxWidth: CGFloat = 120
}

/// ButtonIcon Component Tokens
public enum ButtonIconTokens {
    /// Large button variant requires 12px padding (1.5× base) for comfortable touch target and visual balance with larger icon sizes
    public static let insetLarge: CGFloat = SpacingTokens.space150
    /// Medium button variant uses 10px padding (1.25× base strategic flexibility token) for compact appearance while maintaining adequate touch area
    public static let insetMedium: CGFloat = SpacingTokens.space125
    /// Small button variant uses 8px padding (1× base) for minimal footprint in dense UI layouts while meeting minimum touch target requirements
    public static let insetSmall: CGFloat = SpacingTokens.space100
    /// Large button size (48px = 6× base) provides generous touch target exceeding tapAreaRecommended, calculated as icon (24px) + padding (12px × 2)
    public static let sizeLarge: CGFloat = SpacingTokens.size600
    /// Medium button size (40px = 5× base) provides standard touch target, calculated as icon (18px) + padding (10px × 2) rounded to grid
    public static let sizeMedium: CGFloat = SpacingTokens.size500
    /// Small button size (32px = 4× base) provides compact visual footprint, calculated as icon (13px) + padding (8px × 2) rounded to grid
    public static let sizeSmall: CGFloat = SpacingTokens.size400
}

/// Progress Component Tokens
public enum ProgressTokens {
    /// Small node base size (12px). Inactive dots in compact mobile contexts.
    public static let nodeSizeSm: CGFloat = SpacingTokens.size150
    /// Medium node base size (16px). Default inactive dot size.
    public static let nodeSizeMd: CGFloat = SpacingTokens.size200
    /// Large node base size (20px). Inactive dots in desktop contexts.
    public static let nodeSizeLg: CGFloat = SpacingTokens.size250
    /// Current node emphasis for sm (16px). +4px over base 12px for non-color visual differentiation.
    public static let nodeSizeSmCurrent: CGFloat = SpacingTokens.size200
    /// Current node emphasis for md (20px). +4px over base 16px for non-color visual differentiation.
    public static let nodeSizeMdCurrent: CGFloat = SpacingTokens.size250
    /// Current node emphasis for lg (24px). +4px over base 20px for non-color visual differentiation.
    public static let nodeSizeLgCurrent: CGFloat = SpacingTokens.size300
    /// Small gap between nodes (6px = 0.75× base). Tight spacing for compact pagination dots in mobile contexts.
    public static let nodeGapSm: CGFloat = SpacingTokens.space075
    /// Medium gap between nodes (8px = 1× base). Default spacing for stepper nodes, providing clear separation without excessive whitespace.
    public static let nodeGapMd: CGFloat = SpacingTokens.space100
    /// Large gap between nodes (12px = 1.5× base). Generous spacing for detailed steppers with labels in desktop contexts.
    public static let nodeGapLg: CGFloat = SpacingTokens.space150
    /// Connector line thickness (1px). References borderDefault primitive for consistent border treatment across the design system.
    public static let connectorThickness: CGFloat = SpacingTokens.borderWidth100
}

/// VerticalListItem Component Tokens
public enum VerticalListItemTokens {
    /// Block padding at rest state (1px border). 11px padding + 1px border = 12px per side, achieving 48px total with 24px content. Uses TokenWithValue pattern as no primitive token exists for 11px.
    public static let paddingBlockRest: CGFloat = 11
    /// Block padding when selected (2px border). 10px padding + 2px border = 12px per side, maintaining 48px total with 24px content. References space125 strategic flexibility token.
    public static let paddingBlockSelected: CGFloat = SpacingTokens.space125
}
