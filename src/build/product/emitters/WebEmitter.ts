/**
 * WebEmitter — emits CSS custom properties from ResolvedCategory[].
 *
 * @see .kiro/specs/109-product-tokens-validation-generation/design.md § "Web (CSS) Emitter"
 */

import { convertToNamingConvention } from '../../../naming/PlatformNamingRules';
import type { ResolvedCategory, ResolvedToken, GeneratorConfig } from '../ProductTokenGenerator';

export function emitCSS(categories: ResolvedCategory[], _config: GeneratorConfig): string {
  const lines: string[] = [];
  lines.push(`/* Product tokens — generated ${new Date().toISOString()} */`);
  lines.push(`/* Do not edit manually. Source: product/tokens/*.yaml */`);
  lines.push('');
  lines.push(':root {');

  for (const category of categories) {
    const webTokens = category.tokens.filter(t => t.platforms.includes('web'));
    if (webTokens.length === 0) continue;

    lines.push(`  /* Product tokens: ${category.name} */`);
    for (const token of webTokens) {
      const cssName = `--product-${kebabCase(category.name)}-${camelToKebab(token.name)}`;
      const value = formatValue(token);
      const comment = token.description ? ` /* ${token.description} */` : '';
      if (token.ref && !token.resolvedPlatformPath) {
        lines.push(`  /* ⚠️ UNRESOLVED */ ${cssName}: initial;${comment}`);
      } else {
        lines.push(`  ${cssName}: ${value};${comment}`);
      }
    }
    lines.push('');
  }

  lines.push('}');
  return lines.join('\n');
}

function formatValue(token: ResolvedToken): string {
  if (token.ref && token.resolvedPlatformPath) {
    return `var(${token.resolvedPlatformPath.web})`;
  }
  return formatCSSValue(token.value, token.unitType);
}

function formatCSSValue(value: number | string | null, unitType: string | null): string {
  if (value == null) return 'initial';
  switch (unitType) {
    case 'logical': return `${value}px`;
    case 'duration': return `${value}ms`;
    case 'rem': return `${value}rem`;
    case 'em': return `${value}em`;
    case 'ch': return `${value}ch`;
    case 'percent': return `${value}%`;
    case 'color':
    case 'ratio':
    case 'count':
    default: return `${value}`;
  }
}

function camelToKebab(name: string): string {
  return convertToNamingConvention(name, 'kebab-case');
}

function kebabCase(name: string): string {
  // Category names are already lowercase with hyphens
  return name;
}
