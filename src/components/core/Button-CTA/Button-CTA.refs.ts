/**
 * Button-CTA Component Tokens
 * 
 * Component-specific tokens for Button-CTA that don't fit into the general
 * semantic token system. These tokens are specific to button sizing and layout.
 * 
 * Token Naming Pattern: buttonCTA.[property].[variant]
 * 
 * Stemma System Naming: [Family]-[Type] = Button-CTA
 * Component Type: Standalone (no behavioral variants)
 * 
 * Related Requirements:
 * - Requirement 6.1-6.3: Minimum width requirements for button sizes
 * - Design Decision H3: Component-specific tokens with semantic naming
 */

import { sizingTokens } from '../../../tokens/SizingTokens';

/**
 * Minimum Width Tokens
 *
 * These tokens define the minimum width for each button size variant.
 * Values are chosen to ensure buttons have adequate touch targets and
 * visual presence while maintaining compositional architecture principles.
 *
 * Design Rationale (from H3):
 * - Component-specific tokens provide clarity for button sizing
 * - Semantic naming (small/medium/large) balances component needs with system conventions
 * - Compositional architecture maintained through mathematical relationships
 *
 * Token linkage (corrected 2026-09-19 per the token-doc accuracy pass, F8 —
 * see .kiro/issues/2026-09-19-token-source-accuracy-followups.md): these values
 * are NOT independent literals — they equal the `sizing` primitive family's
 * size700/size900/size1000 tokens exactly, and Token-Family-Sizing.md § "Component
 * Consumers" already documented Button-CTA as a consumer of those three tokens.
 * The values below now reference those primitives directly instead of restating
 * their values, per the component-token construction rule (component tokens
 * must reference an existing primitive or conform to its value system, never
 * restate an arbitrary number). This is a linkage fix only — the rendered
 * values (56 / 72 / 80) are unchanged.
 *
 * Values:
 * - Small: 56px (7 × 8px baseline grid, references size700)
 * - Medium: 72px (9 × 8px baseline grid, references size900)
 * - Large: 80px (10 × 8px baseline grid, references size1000)
 */
export const ButtonCTATokens = {
  /**
   * Minimum width for small buttons
   *
   * Usage: Small buttons in compact layouts, secondary actions
   * Value: 56px (7 × 8px baseline grid) — references sizingTokens.size700
   * Platforms: Web, iOS, Android
   */
  minWidth: {
    small: sizingTokens.size700.baseValue,

    /**
     * Minimum width for medium buttons
     *
     * Usage: Standard buttons, primary actions
     * Value: 72px (9 × 8px baseline grid) — references sizingTokens.size900
     * Platforms: Web, iOS, Android
     */
    medium: sizingTokens.size900.baseValue,

    /**
     * Minimum width for large buttons
     *
     * Usage: Prominent buttons, hero actions
     * Value: 80px (10 × 8px baseline grid) — references sizingTokens.size1000
     * Platforms: Web, iOS, Android
     */
    large: sizingTokens.size1000.baseValue,
  },
} as const;

/**
 * Type definitions for Button-CTA tokens
 */
export type ButtonCTAMinWidthVariant = keyof typeof ButtonCTATokens.minWidth;

/**
 * Helper function to get minWidth token value
 * 
 * @param variant - The button size variant (small, medium, large)
 * @returns The minimum width value in pixels
 */
export function getButtonCTAMinWidth(variant: ButtonCTAMinWidthVariant): number {
  return ButtonCTATokens.minWidth[variant];
}
