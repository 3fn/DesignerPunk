/**
 * Theme-Varying Token Computation
 *
 * Computes the set of semantic token names that vary across themes/modes.
 * Used by the CLI to pass pre-computed theme-varying data to generateTokenIndex.
 *
 * @see Spec 114 design.md § "computeThemeVaryingTokens"
 */

import type { PrimitiveToken, ColorTokenValue } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Compute the full set of theme-varying token names.
 *
 * Sources:
 * 1. Explicit override keys from config's registered themes
 * 2. Color semantic tokens whose referenced primitive has different light/dark base values
 */
export function computeThemeVaryingTokens(
  config: ResolvedConfig,
  semanticTokens: SemanticToken[],
  primitiveTokens: PrimitiveToken[]
): Set<string> {
  const varying = new Set<string>();

  // Step 1: Collect explicit override keys from all registered themes
  for (const theme of config.themes) {
    for (const tokenName of Object.keys(theme.overrides)) {
      varying.add(tokenName);
    }
  }

  // Step 2: Check color semantic tokens for primitive light/dark differences
  const primitiveMap = new Map(primitiveTokens.map(p => [p.name, p]));

  for (const token of semanticTokens) {
    if (varying.has(token.name)) continue;
    if (token.category !== 'color') continue;
    if (token.modeInvariant) continue;

    const refName = token.primitiveReferences?.value ?? token.primitiveReferences?.default;
    if (typeof refName !== 'string' || refName.startsWith('rgba(')) continue;

    const primitive = primitiveMap.get(refName);
    if (!primitive) continue;

    const colorValue = primitive.platforms.web.value;
    if (typeof colorValue !== 'object' || !('light' in colorValue)) continue;

    const cv = colorValue as ColorTokenValue;
    if (cv.light.base !== cv.dark.base) {
      varying.add(token.name);
    }
  }

  return varying;
}
