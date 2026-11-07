/**
 * Shared test helper: the four resolved contexts (base light and dark, wcag light and dark) of
 * DesignerPunk's real token definitions, built as `generateTokenFiles` builds them
 * (Spec 129 Task 11: the theme tests run on real definitions, not `rgba(…)` fixtures).
 */
import { getAllSemanticTokens } from '../../../tokens/semantic';
import { PrimitiveTokenRegistry } from '../../../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../../../registries/SemanticTokenRegistry';
import { SemanticOverrideResolver } from '../../../resolvers/SemanticOverrideResolver';
import { resolveSemanticTokenValue } from '../../../resolvers/SemanticValueResolver';
import { darkSemanticOverrides } from '../../../tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../../../tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../../../tokens/themes/dark-wcag/SemanticOverrides';
import type { SemanticToken } from '../../../types/SemanticToken';
import type { GenerationOptions } from '../../TokenFileGenerator';

type Resolved = Omit<SemanticToken, 'primitiveTokens'>;

let cached: Pick<GenerationOptions, 'semanticTokens' | 'darkSemanticTokens' | 'wcagSemanticTokens' | 'darkWcagSemanticTokens'> | undefined;

export function realThemeContexts() {
  if (cached) return cached;
  const semantics = getAllSemanticTokens();
  const primitives = new PrimitiveTokenRegistry();
  const registry = new SemanticTokenRegistry(primitives);
  for (const t of semantics) registry.register(t);
  const resolver = new SemanticOverrideResolver(registry, darkSemanticOverrides);
  const sets = resolver.resolveAllContexts(semantics, {
    'light-wcag': wcagSemanticOverrides,
    'dark-base': darkSemanticOverrides,
    'dark-wcag': { ...darkSemanticOverrides, ...wcagSemanticOverrides, ...darkWcagSemanticOverrides },
  } as import('../../../tokens/themes/types').ContextOverrideSet);
  const r = (key: string, mode: 'light' | 'dark', theme: 'base' | 'wcag'): Resolved[] =>
    sets[key as keyof typeof sets].map(t => resolveSemanticTokenValue(t, mode, theme));
  cached = {
    semanticTokens: r('light-base', 'light', 'base'),
    darkSemanticTokens: r('dark-base', 'dark', 'base'),
    wcagSemanticTokens: r('light-wcag', 'light', 'wcag'),
    darkWcagSemanticTokens: r('dark-wcag', 'dark', 'wcag'),
  };
  return cached;
}
