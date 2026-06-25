/**
 * Token Index Generator
 *
 * Produces three YAML files (primitives, semantics, components) for the
 * Application MCP's token query tools.
 *
 * @see Spec 096 design.md
 * @see Spec 114 — data flow restructure (barrel imports removed)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { TokenCategory } from '../types/PrimitiveToken';
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';
import { WebFormatGenerator } from '../providers/WebFormatGenerator';
import { iOSFormatGenerator } from '../providers/iOSFormatGenerator';
import { AndroidFormatGenerator } from '../providers/AndroidFormatGenerator';
import type { ModeResolvedTokens, PrimitiveOklchModes } from './ModeResolvedTokens';

/**
 * Required input for token-index generation.
 * All data must be explicitly provided — no barrel import fallbacks.
 */
export interface TokenIndexInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
  componentTokens: RegisteredComponentToken[];
  /**
   * The single shared mode-resolved truth from `generateTokenFiles` (Spec 117 Task 3).
   * Carries the base-scoped theme-varying set AND per-primitive mode-resolved OKLCH, so the
   * index emits the SAME values dist wrote rather than re-deriving (and drifting).
   */
  modeResolved: ModeResolvedTokens;
  /**
   * Absolute path to the consumer's component-schema scan root — the directory whose
   * `<Component>/*.schema.yaml` files seed the token→[components] consumer map
   * (Spec 118 Task 9.5.2, Class C′; ratified default-only). This is resolved by the
   * CALLER from the active config (default `<configDir>/src/components/core`) and passed
   * in, so `generateTokenIndex` stays a pure function of its inputs — it no longer
   * computes the scan root from `__dirname` (which hard-bound the scan to the PACKAGE's
   * components, ignoring the schemas a consumer adds/edits in their own repo and the
   * same source the application MCP already reads via `COMPONENTS_DIR`).
   */
  componentSchemaDir: string;
}

/** Build the mode-nested OKLCH value + sibling channel metadata for a color primitive. */
function buildOklchEntry(modes: PrimitiveOklchModes): {
  value: { light: { base: string; wcag: string }; dark: { base: string; wcag: string } };
  oklch: Record<'light' | 'dark', { l: number; c: number; h: number; channels: { hue: string; lightness: string; chroma: string } }>;
} {
  // Match dist's exact OKLCH string format (WebFormatGenerator.formatOklchColor):
  // `oklch(${l} ${c} ${h})`. No primitive-tier WCAG mechanism exists, so wcag === base.
  const fmt = (m: PrimitiveOklchModes['light']) => `oklch(${m.oklch.l} ${m.oklch.c} ${m.oklch.h})`;
  const lightStr = fmt(modes.light);
  const darkStr = fmt(modes.dark);
  return {
    value: {
      light: { base: lightStr, wcag: lightStr },
      dark: { base: darkStr, wcag: darkStr },
    },
    oklch: {
      light: { l: modes.light.oklch.l, c: modes.light.oklch.c, h: modes.light.oklch.h, channels: modes.light.channels },
      dark: { l: modes.dark.oklch.l, c: modes.dark.oklch.c, h: modes.dark.oklch.h, channels: modes.dark.channels },
    },
  };
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
        // `tokens:` is a map of group-name → token refs. The canonical (Stemma) form
        // is an ARRAY of refs per group (e.g. `inherited: [color.action.primary, ...]`);
        // earlier scalar/object forms are tolerated for back-compat. Flatten both.
        // (Spec 118 Task 9.5.2: prior reader treated each group value as a single ref,
        // so array groups were silently skipped — the consumers map was dead, 0/193.)
        for (const groupValue of Object.values(schema.tokens) as any[]) {
          const refs = Array.isArray(groupValue) ? groupValue : [groupValue];
          for (const tokenRef of refs) {
            const tokenName = typeof tokenRef === 'string' ? tokenRef : tokenRef?.reference || tokenRef?.name;
            if (tokenName) {
              const consumers = map.get(tokenName) || [];
              if (!consumers.includes(componentName)) consumers.push(componentName);
              map.set(tokenName, consumers);
            }
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
 * @param input - Required resolved token data from the CLI.
 */
export function generateTokenIndex(tokenIndexDir: string = 'token-index', input: TokenIndexInput): void {
  const outputDir = path.isAbsolute(tokenIndexDir)
    ? tokenIndexDir
    : path.resolve(process.cwd(), tokenIndexDir);

  console.log('📊 Generating token index...\n');

  const webGen = new WebFormatGenerator();
  const iosGen = new iOSFormatGenerator();
  const androidGen = new AndroidFormatGenerator('kotlin');

  const themeVarying = input.modeResolved.themeVaryingTokens;
  const primitiveOklch = input.modeResolved.primitiveOklch;
  const primitives = input.primitiveTokens;
  const semantics = input.semanticTokens;

  // Build consumer map from the consumer's component schemas (Spec 118 Task 9.5.2,
  // Class C′). The scan root is resolved by the caller from the active config and
  // passed in via `input.componentSchemaDir` — NOT computed from `__dirname` here.
  // This aligns the relationship map with the consumer's design system (the same
  // source the application MCP reads via COMPONENTS_DIR), so a consumer's added/edited
  // component appears in their generated index.
  const consumerMap = buildConsumerMap(input.componentSchemaDir);

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

    // R3: color primitives emit mode-resolved OKLCH (value + channels) from the shared
    // source — never the collapsed rgba snapshot. Non-color primitives keep web.value.
    const oklchModes = primitiveOklch.get(token.name);
    const entry: Record<string, any> = {
      family: token.category,
      ...(oklchModes
        ? buildOklchEntry(oklchModes)
        : { value: token.platforms.web.value }),
      formula: token.mathematicalRelationship || null,
      platforms: {
        web: webGen.getTokenName(token.name, token.category),
        ios: iosPath,
        android: androidPath,
      },
    };

    primitivesIndex[token.name] = entry;
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
  const allComponentTokens = input.componentTokens;
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
