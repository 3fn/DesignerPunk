/**
 * Resolved theme set — output of the resolver for a single theme context.
 *
 * @see design.md § "SemanticOverrideResolver (Modified)"
 */

import type { SemanticToken } from '../types/SemanticToken';
import type { ThemeRegistration } from './ThemeRegistry';

/** A resolved set of tokens for one theme context (e.g., 'dark-wcag'). */
export interface ResolvedThemeSet {
  /** The theme registration this was resolved from (null for base contexts). */
  theme: ThemeRegistration | null;
  /** Context key matching the legacy format (e.g., 'light-base', 'dark-wcag'). */
  contextKey: string;
  /** Mode this context was resolved for. */
  mode: 'light' | 'dark';
  /** Theme identifier for this context (e.g., 'base', 'wcag'). */
  themeId: string;
  /** Resolved semantic tokens for this context. */
  tokens: Array<Omit<SemanticToken, 'primitiveTokens'>>;
}
