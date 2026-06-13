/**
 * KotlinEmitter — emits Kotlin objects from ResolvedCategory[].
 *
 * @see .kiro/specs/109-product-tokens-validation-generation/design.md § "Kotlin Emitter"
 */

import type { ResolvedCategory, ResolvedToken, GeneratorConfig } from '../ProductTokenGenerator';

export function emitKotlin(categories: ResolvedCategory[], config: GeneratorConfig): string {
  const lines: string[] = [];
  const localTheme = `Local${config.configAbbreviation}Theme`;

  const androidTokens = categories.map(c => ({
    ...c,
    tokens: c.tokens.filter(t => t.platforms.includes('android')),
  })).filter(c => c.tokens.length > 0);

  const hasLogical = androidTokens.some(c => c.tokens.some(t => !t.themeVarying && t.unitType === 'logical'));
  const hasColor = androidTokens.some(c => c.tokens.some(t => !t.themeVarying && t.unitType === 'color'));
  const hasThemeVarying = androidTokens.some(c => c.tokens.some(t => t.themeVarying));
  const hasRefs = androidTokens.some(c => c.tokens.some(t => t.ref && !t.themeVarying));

  lines.push('package com.designerpunk.product.tokens');
  lines.push('');

  // Conditional imports
  if (hasRefs || hasLogical) lines.push('import com.designerpunk.tokens.DesignTokens');
  if (hasLogical) lines.push('import androidx.compose.ui.unit.dp');
  if (hasColor || hasThemeVarying) lines.push('import androidx.compose.ui.graphics.Color');
  if (hasThemeVarying) {
    lines.push('import androidx.compose.runtime.Composable');
    lines.push('import androidx.compose.runtime.ReadOnlyComposable');
    lines.push(`import com.designerpunk.tokens.${localTheme}`);
  }
  lines.push('');
  lines.push(`// Product tokens — generated ${new Date().toISOString()}`);
  lines.push('// Do not edit manually. Source: product/tokens/*.yaml');
  if (hasThemeVarying) {
    lines.push('// Note: Theme-varying tokens use @Composable getters — must be read inside composition scope.');
  }
  lines.push('');

  for (const category of androidTokens) {
    if (category.tokens.length === 0) continue;

    const objectName = `Product${toPascalCase(category.name)}`;
    lines.push(`object ${objectName} {`);
    for (const token of category.tokens) {
      if (token.themeVarying) {
        const prop = token.resolvedPlatformPath?.android?.replace('theme.', '') || 'unknown';
        lines.push(`    val ${token.name}: Color`);
        lines.push(`        @Composable @ReadOnlyComposable get() = ${localTheme}.current.${prop}`);
      } else {
        const value = formatKotlinValue(token);
        lines.push(`    ${value}`);
      }
    }
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

function formatKotlinValue(token: ResolvedToken): string {
  if (token.ref && token.resolvedPlatformPath) {
    return `val ${token.name} = DesignTokens.${token.resolvedPlatformPath.android}`;
  }
  // Hard value
  switch (token.unitType) {
    case 'logical': return `val ${token.name} = ${token.value}.dp`;
    case 'duration': return `val ${token.name}: Int = ${token.value} // ms`;
    case 'count': return `val ${token.name} = ${token.value}`;
    case 'ratio': return `val ${token.name} = ${token.value}f`;
    case 'percent': return `val ${token.name} = ${Number(token.value) / 100}f`;
    case 'color': return `val ${token.name} = Color(0xFF${String(token.value).replace('#', '')})`;
    default: return `val ${token.name} = ${token.value}`;
  }
}

function toPascalCase(name: string): string {
  return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}
