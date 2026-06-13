/**
 * SwiftEmitter — emits Swift constants from ResolvedCategory[].
 *
 * @see .kiro/specs/109-product-tokens-validation-generation/design.md § "Swift Emitter"
 */

import type { ResolvedCategory, ResolvedToken, GeneratorConfig } from '../ProductTokenGenerator';

export function emitSwift(categories: ResolvedCategory[], config: GeneratorConfig): string {
  const lines: string[] = [];
  const themeName = `${config.configName}Theme`;

  const iosTokens = categories.map(c => ({
    ...c,
    tokens: c.tokens.filter(t => t.platforms.includes('ios')),
  })).filter(c => c.tokens.length > 0);

  const hasStatic = iosTokens.some(c => c.tokens.some(t => !t.themeVarying));
  const hasThemeVarying = iosTokens.some(c => c.tokens.some(t => t.themeVarying));

  // Imports
  if (hasStatic) lines.push('import UIKit');
  if (hasThemeVarying) lines.push('import SwiftUI');
  lines.push('');
  lines.push(`// Product tokens — generated ${new Date().toISOString()}`);
  lines.push('// Do not edit manually. Source: product/tokens/*.yaml');
  lines.push('');

  // Static tokens (enums)
  for (const category of iosTokens) {
    const staticTokens = category.tokens.filter(t => !t.themeVarying);
    if (staticTokens.length === 0) continue;

    const enumName = `Product${toPascalCase(category.name)}`;
    lines.push(`public enum ${enumName} {`);
    for (const token of staticTokens) {
      const { type, value } = formatSwiftValue(token);
      lines.push(`    public static let ${token.name}: ${type} = ${value}`);
    }
    lines.push('}');
    lines.push('');
  }

  // Theme-varying tokens (protocol extension)
  const themeTokens = iosTokens.flatMap(c =>
    c.tokens.filter(t => t.themeVarying).map(t => ({ ...t, category: c.name }))
  );

  if (themeTokens.length > 0) {
    lines.push(`// Theme-varying product tokens — access via @Environment(\\.${config.configAbbreviation.toLowerCase()}Theme)`);
    lines.push(`public extension ${themeName} {`);
    for (const token of themeTokens) {
      const propName = `product${toPascalCase(token.category)}${capitalize(token.name)}`;
      const systemProp = token.resolvedPlatformPath?.ios?.replace('theme.', '') || 'unknown';
      lines.push(`    var ${propName}: Color { self.${systemProp} }`);
    }
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

function formatSwiftValue(token: ResolvedToken): { type: string; value: string } {
  if (token.ref && token.resolvedPlatformPath) {
    const path = token.resolvedPlatformPath.ios;
    const type = inferSwiftType(token);
    return { type, value: `DesignTokens.${path}` };
  }
  // Hard value
  switch (token.unitType) {
    case 'logical': return { type: 'CGFloat', value: `${token.value}` };
    case 'duration': return { type: 'TimeInterval', value: `${Number(token.value) / 1000}` };
    case 'count': return { type: 'Int', value: `${token.value}` };
    case 'ratio': return { type: 'CGFloat', value: `${token.value}` };
    case 'percent': return { type: 'CGFloat', value: `${Number(token.value) / 100}` };
    case 'color': return { type: 'UIColor', value: `UIColor(hex: "${token.value}")` };
    default: return { type: 'CGFloat', value: `${token.value}` };
  }
}

function inferSwiftType(token: ResolvedToken): string {
  const path = token.resolvedPlatformPath?.ios || '';
  if (path.startsWith('Duration.') || path.includes('duration')) return 'TimeInterval';
  if (path.includes('color') || path.includes('Color')) return 'CGFloat'; // static ref to color primitive
  return 'CGFloat';
}

function toPascalCase(name: string): string {
  return name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
