#!/usr/bin/env ts-node
/**
 * Token Index Generator (standalone script)
 *
 * Thin wrapper around src/generators/generateTokenIndex.ts.
 * Outputs to `token-index/` at the repo root.
 *
 * This IS the package — barrel imports are correct here.
 *
 * @see Spec 096 design.md
 * @see Spec 114 — explicit data flow
 */

import * as path from 'path';
import { generateTokenIndex } from '../src/generators/generateTokenIndex';
import { getAllPrimitiveTokens } from '../src/tokens';
import { getAllSemanticTokens } from '../src/tokens/semantic';
import { ComponentTokenRegistry } from '../src/registries/ComponentTokenRegistry';
import { ThemeRegistry } from '../src/themes/ThemeRegistry';
import { darkSemanticOverrides } from '../src/tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../src/tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../src/tokens/themes/dark-wcag/SemanticOverrides';

// Register component tokens (side-effect imports populate ComponentTokenRegistry)
import '../src/components/core/Button-Icon/buttonIcon.tokens';
import '../src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens';
import '../src/components/core/Avatar-Base/avatar.tokens';
import '../src/components/core/Badge-Label-Base/tokens';
import '../src/tokens/component/progress';

// Compute theme-varying tokens
const themeRegistry = new ThemeRegistry();
themeRegistry.register({ name: 'dark', mode: 'dark', overrides: darkSemanticOverrides });
themeRegistry.register({ name: 'wcag', mode: 'both', overrides: { ...wcagSemanticOverrides, ...darkWcagSemanticOverrides } });
const themeVaryingTokens = themeRegistry.getThemeVaryingTokens();

const OUTPUT_DIR = path.resolve(__dirname, '..', 'token-index');

generateTokenIndex(OUTPUT_DIR, {
  primitiveTokens: getAllPrimitiveTokens(),
  semanticTokens: getAllSemanticTokens(),
  componentTokens: ComponentTokenRegistry.getAll(),
  themeVaryingTokens,
});
