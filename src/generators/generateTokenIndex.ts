/**
 * Token Index Generator
 *
 * Produces three YAML files (primitives, semantics, components) for the
 * Application MCP's token query tools.
 *
 * @see Spec 096 design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { getAllPrimitiveTokens } from '../tokens';
import { getAllSemanticTokens } from '../tokens/semantic';
import { TokenCategory } from '../types/PrimitiveToken';
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import { WebFormatGenerator } from '../providers/WebFormatGenerator';
import { iOSFormatGenerator } from '../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../providers/AndroidFormatGenerator';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import { ThemeRegistry } from '../themes/ThemeRegistry';
import { darkSemanticOverrides } from '../tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../tokens/themes/dark-wcag/SemanticOverrides';

/** Optional resolved tokens — when provided, these are used instead of package barrel imports. */
export interface TokenIndexInput {
  primitiveTokens?: PrimitiveToken[];
  semanticTokens?: SemanticToken[];
}

/** Build a map of token name → consuming component names from schema.yaml files. */
function buildConsumerMap(componentsDir: string): Map<string, string[]> {
  const map = new Map<string, string[]>();

  if (!fs.existsSync(componentsDir)) return map;

  for (const dir of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue;
    const schemaFiles = fs.readdirSync(path.join(componentsDir, dir.name))
      .filter(f => f.endsWith('.schema.yaml'));

    for (const schemaFile of schemaFiles) {
      try {
        const content = fs.readFileSync(path.join(componentsDir, dir.name, schemaFile), 'utf-8');
        const schema = yaml.load(content) as any;
        if (!schema?.tokens) continue;

        const componentName = schema.name || dir.name;
        for (const tokenRef of Object.values(schema.tokens) as any[]) {
          const tokenName = typeof tokenRef === 'string' ? tokenRef : tokenRef?.reference || tokenRef?.name;
          if (tokenName) {
            const consumers = map.get(tokenName) || [];
            if (!consumers.includes(componentName)) consumers.push(componentName);
            map.set(tokenName, consumers);
          }
        }
      } catch {
        // Skip unparseable schemas
      }
    }
  }

  return map;
}

/**
 * Generate the token index YAML files.
 *
 * @param tokenIndexDir - Absolute or relative (to cwd) path for output. Defaults to 'token-index'.
 */
export function generateTokenIndex(tokenIndexDir: string = 'token-index', input?: TokenIndexInput): void {
  const outputDir = path.isAbsolute(tokenIndexDir)
    ? tokenIndexDir
    : path.resolve(process.cwd(), tokenIndexDir);

  console.log('📊 Generating token index...\n');

  const webGen = new WebFormatGenerator();
  const iosGen = new iOSFormatGenerator();
  const androidGen = new AndroidFormatGenerator('kotlin');

  // Build theme-varying set
  const themeRegistry = new ThemeRegistry();
  themeRegistry.register({ name: 'dark', mode: 'dark', overrides: darkSemanticOverrides });
  themeRegistry.register({ name: 'wcag', mode: 'both', overrides: { ...wcagSemanticOverrides, ...darkWcagSemanticOverrides } });
  const themeVarying = themeRegistry.getThemeVaryingTokens();

  const primitives = input?.primitiveTokens || getAllPrimitiveTokens();
  const semantics = input?.semanticTokens || getAllSemanticTokens();

  // Build consumer map from ComponentTokenRegistry
  const componentsDir = path.resolve(__dirname, '..', 'components', 'core');
  const consumerMap = buildConsumerMap(componentsDir);

  // Families that generate inside nested namespaces (enum/object) on iOS/Android.
  const NESTED_PRIMITIVE_FAMILIES = new Set([
    TokenCategory.DURATION, TokenCategory.EASING, TokenCategory.SCALE,
  ]);

  // Generate primitives index
  const primitivesIndex: Record<string, any> = {};
  for (const token of primitives) {
    const isNested = NESTED_PRIMITIVE_FAMILIES.has(token.category as TokenCategory);
    let iosPath = iosGen.getTokenName(token.name, token.category);
    let androidPath = androidGen.getTokenName(token.name, token.category);

    if (isNested) {
      const namespace = token.category.charAt(0).toUpperCase() + token.category.slice(1);
      iosPath = `${namespace}.${iosPath}`;
      const androidProp = token.name
        .split(/[.\-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      androidPath = `${namespace}.${androidProp}`;
    }

    primitivesIndex[token.name] = {
      family: token.category,
      value: token.platforms.web.value,
      formula: token.mathematicalRelationship || null,
      platforms: {
        web: webGen.getTokenName(token.name, token.category),
        ios: iosPath,
        android: androidPath,
      },
    };
  }

  // Generate semantics index
  const semanticsIndex: Record<string, any> = {};
  for (const token of semantics) {
    const isThemeVarying = themeVarying.has(token.name);
    const iosName = iosGen.getTokenName(token.name, token.category);
    const androidName = androidGen.getTokenName(token.name, token.category);

    semanticsIndex[token.name] = {
      category: token.category,
      primitiveReferences: token.primitiveReferences || null,
      themeVarying: isThemeVarying,
      platforms: {
        web: webGen.getTokenName(token.name, token.category),
        ios: isThemeVarying ? `theme.${iosName}` : iosName,
        android: isThemeVarying ? `theme.${androidName}` : androidName,
      },
      consumers: consumerMap.get(token.name) || [],
    };
  }

  // Generate component tokens index
  const componentTokensIndex: Record<string, any> = {};
  const allComponentTokens = ComponentTokenRegistry.getAll();
  for (const ct of allComponentTokens) {
    const enumName = `${ct.component}Tokens`;
    const parts = ct.name.split('.');
    const propertyName = parts.slice(1).map((part, i) =>
      i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    ).join('');

    componentTokensIndex[ct.name] = {
      component: ct.component,
      primitiveReferences: ct.primitiveReference ? { value: ct.primitiveReference } : { value: String(ct.value) },
      platforms: {
        web: webGen.getTokenName(ct.name, 'component'),
        ios: `${enumName}.${propertyName}`,
        android: `${enumName}.${propertyName}`,
      },
    };
  }

  // Write YAML files
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(outputDir, 'primitives.yaml'),
    yaml.dump({ tokens: primitivesIndex }, { lineWidth: -1 }),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(outputDir, 'semantics.yaml'),
    yaml.dump({ tokens: semanticsIndex }, { lineWidth: -1 }),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(outputDir, 'components.yaml'),
    yaml.dump({ tokens: componentTokensIndex }, { lineWidth: -1 }),
    'utf-8'
  );

  const counts = {
    primitives: Object.keys(primitivesIndex).length,
    semantics: Object.keys(semanticsIndex).length,
    components: Object.keys(componentTokensIndex).length,
  };

  console.log(`✅ Token index generated at ${outputDir}`);
  console.log(`   Primitives: ${counts.primitives}`);
  console.log(`   Semantics: ${counts.semantics}`);
  console.log(`   Component tokens: ${counts.components}\n`);
}
