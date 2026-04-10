#!/usr/bin/env ts-node
/**
 * Token Index Generator
 *
 * Produces three YAML files (primitives, semantics, components) for the
 * Application MCP's token query tools. Runs as part of `npx designerpunk generate`.
 *
 * @see Spec 096 design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { getAllPrimitiveTokens } from '../src/tokens';
import { getAllSemanticTokens } from '../src/tokens/semantic';
import { PrimitiveToken, TokenCategory } from '../src/types/PrimitiveToken';
import { SemanticToken, SemanticCategory } from '../src/types/SemanticToken';
import { WebFormatGenerator } from '../src/providers/WebFormatGenerator';
import { iOSFormatGenerator } from '../src/providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../src/providers/AndroidFormatGenerator';
import { ComponentTokenRegistry } from '../src/registries/ComponentTokenRegistry';
import { ThemeRegistry } from '../src/themes/ThemeRegistry';
import { darkSemanticOverrides } from '../src/tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../src/tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../src/tokens/themes/dark-wcag/SemanticOverrides';

// Import component token files to trigger registration
import '../src/components/core/Button-Icon/buttonIcon.tokens';
import '../src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens';
import '../src/components/core/Avatar-Base/avatar.tokens';
import '../src/components/core/Badge-Label-Base/tokens';
import '../src/tokens/component/progress';

const OUTPUT_DIR = path.resolve(__dirname, '..', 'token-index');

function main() {
  console.log('📊 Generating token index...\n');

  const webGen = new WebFormatGenerator();
  const iosGen = new iOSFormatGenerator();
  const androidGen = new AndroidFormatGenerator('kotlin');

  // Build theme-varying set
  const themeRegistry = new ThemeRegistry();
  themeRegistry.register({ name: 'dark', mode: 'dark', overrides: darkSemanticOverrides });
  themeRegistry.register({ name: 'wcag', mode: 'both', overrides: { ...wcagSemanticOverrides, ...darkWcagSemanticOverrides } });
  const themeVarying = themeRegistry.getThemeVaryingTokens();

  // Also include tokens that differ between light and dark base
  const primitives = getAllPrimitiveTokens();
  const semantics = getAllSemanticTokens();

  // Build consumer map from ComponentTokenRegistry
  const consumerMap = buildConsumerMap();

  // Generate primitives index
  const primitivesIndex: Record<string, any> = {};
  for (const token of primitives) {
    primitivesIndex[token.name] = {
      family: token.category,
      value: token.platforms.web.value,
      formula: token.mathematicalRelationship || null,
      platforms: {
        web: webGen.getTokenName(token.name, token.category),
        ios: iosGen.getTokenName(token.name, token.category),
        android: androidGen.getTokenName(token.name, token.category),
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
    componentTokensIndex[ct.name] = {
      component: ct.component,
      primitiveReferences: ct.primitiveReference ? { value: ct.primitiveReference } : { value: String(ct.value) },
      platforms: {
        web: webGen.getTokenName(ct.name, 'component'),
        ios: iosGen.getTokenName(ct.name, 'component'),
        android: androidGen.getTokenName(ct.name, 'component'),
      },
    };
  }

  // Write YAML files
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'primitives.yaml'),
    yaml.dump({ tokens: primitivesIndex }, { lineWidth: -1 }),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'semantics.yaml'),
    yaml.dump({ tokens: semanticsIndex }, { lineWidth: -1 }),
    'utf-8'
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'components.yaml'),
    yaml.dump({ tokens: componentTokensIndex }, { lineWidth: -1 }),
    'utf-8'
  );

  const counts = {
    primitives: Object.keys(primitivesIndex).length,
    semantics: Object.keys(semanticsIndex).length,
    components: Object.keys(componentTokensIndex).length,
  };

  console.log(`✅ Token index generated at ${OUTPUT_DIR}`);
  console.log(`   Primitives: ${counts.primitives}`);
  console.log(`   Semantics: ${counts.semantics}`);
  console.log(`   Component tokens: ${counts.components}\n`);
}

/** Build a map of token name → consuming component names from schema.yaml files. */
function buildConsumerMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const componentsDir = path.resolve(__dirname, '..', 'src', 'components', 'core');

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

main();
