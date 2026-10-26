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
import { WebMotionTokenFormatter } from '../build/platforms/WebMotionTokenFormatter';
import { iOSMotionTokenFormatter } from '../build/platforms/iOSMotionTokenFormatter';
import { AndroidMotionTokenFormatter } from '../build/platforms/AndroidMotionTokenFormatter';
import { TokenFileGenerator, semanticEmissionShape } from './TokenFileGenerator';
import type { ModeResolvedTokens, PrimitiveOklchModes } from './ModeResolvedTokens';
import { resolveComponentSources } from '../cli/shared/componentSources';
import type { ComponentSource } from '../cli/shared/componentSources';
import {
  mergePackageComponentTokens,
  type PackageComponentTokenIndex,
  type PackageEntrySource,
} from '../cli/shared/packageComponentTokens';

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
   * The component ROOT SET whose `<Component>/*.schema.yaml` files seed the
   * token→[components] consumer map, in precedence order: the consumer's root first, the
   * package's `src/components/core` last — what `resolveComponentRoots`
   * (`src/cli/shared/mcpDataRoots.ts`) produces, the set the Application MCP serves. The
   * union is resolved by `resolveComponentSources` (`src/cli/shared/componentSources.ts`):
   * one component per declared name, the consumer's winning (R1-7; ruling 2026-10-23 § 4).
   * A single string is the single-root form. Resolved by the CALLER and passed in, so
   * `generateTokenIndex` stays a pure function of its inputs (Spec 118 Task 9.5.2, Class C′).
   */
  componentSchemaDir: string | string[];
  /**
   * Absolute path to the LIVE token tier this index's data came from (e.g.
   * `config.tokenSourceRoot` — the consumer's own tier when born, or the package's
   * `src/tokens` in package-mode). Written into `token-index/meta.json` as `tierDir`
   * so the application MCP's theme readers can find `themes/dark/SemanticOverrides.ts`
   * relative to the SERVED index, not a guessed project root (Spec 123 Task 1.5, DD24).
   */
  tierDir?: string;
  /**
   * The token-source file each component token was harvested from, keyed by token name
   * (`componentTokenSourceFile` in `src/cli/loadComponentTokens.ts`). A token whose file sits
   * in a component directory of the universe is written with `definedBy`: that directory's
   * declared component name. Absent, or a token with no file here, gets no `definedBy`.
   */
  componentTokenFiles?: ReadonlyMap<string, string | undefined>;
  /**
   * In a consumer repo, the installed package's own shipped `token-index/components.yaml`
   * (shape (c), `.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`).
   * Its entries are merged for every package component this universe does not replace; see
   * {@link mergePackageComponentTokens}. Never passed in DesignerPunk's own repo.
   */
  packageComponentTokens?: PackageComponentTokenIndex;
}

/**
 * The component a token-source file belongs to: the declared name of the deepest component
 * directory of the universe that contains it (winners and shadowed candidates alike, so a
 * steward's or a consumer's own token file is attributed wherever it sits). `undefined` for a
 * file outside every component directory (the token-source tier).
 */
function definingComponent(file: string | undefined, sources: readonly ComponentSource[]): string | undefined {
  if (!file) return undefined;
  const abs = path.resolve(file);
  let best: ComponentSource | undefined;
  for (const s of sources) {
    if (abs.startsWith(s.dirPath + path.sep) && (!best || s.dirPath.length > best.dirPath.length)) best = s;
  }
  return best?.declaredName;
}

/**
 * `tierDir` as written into `meta.json`: relative to the index directory, `/`-separated
 * (`'.'` when they coincide). `undefined` stays `undefined`, so the key is omitted.
 * @internal Exported for testing.
 */
export function relativeTierDir(indexDir: string, tierDir: string | undefined): string | undefined {
  if (tierDir === undefined) return undefined;
  const rel = path.relative(path.resolve(indexDir), path.resolve(tierDir));
  return rel === '' ? '.' : rel.split(path.sep).join('/');
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

// ─────────────────────────────────────────────────────────────────────────────
// Platform names: what the generators emit for a token
// ─────────────────────────────────────────────────────────────────────────────

export type IndexPlatform = 'web' | 'ios' | 'android';
const INDEX_PLATFORMS: readonly IndexPlatform[] = ['web', 'ios', 'android'];

/**
 * A row's name on one platform: one name, the several names a composite is emitted as, or
 * `null` when that platform's output carries no name for the token. iOS and Android names are
 * members of `DesignTokens` (`colorTextDefault`, `Duration.duration150`,
 * `MotionFloatLabel.duration`), or `theme.<name>` for a token the native generators leave out
 * of `DesignTokens` for the theme types (Spec 094; not emitted yet, Spec 129).
 *
 * Every name is checked against the generated files by `tokenIndexPlatformNames.test.ts`
 * (`.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md`).
 */
export type IndexPlatformName = string | string[] | null;

/** Notes for the platforms a row has no name on, as in the DTCG export's `platforms` extension. */
export const PLATFORM_NOTES = {
  /** `elevation.*` is Android-only (`ElevationTokens.ts`; `DTCGFormatGenerator.generateElevationTokens`). */
  elevation: 'Use z-index + shadow tokens instead',
  /** `zIndex.*` is web and iOS only (`ZIndexTokens.ts`; `DTCGFormatGenerator.generateZIndexTokens`). */
  zIndex: 'Use elevation tokens instead',
  /** A colour primitive outside the composed OKLCH palette (`TokenFileGenerator.emittedColorPrimitiveNames`). */
  unemittedColor:
    'Not emitted on any platform: the generators emit colour primitives from the composed OKLCH palette, and this one is not in it',
} as const;

/** One name stays a string; several become a list, the composite (`stem`) first when it is one of them. */
function collapse(names: string[], stem?: string): IndexPlatformName {
  const unique = [...new Set(names)];
  if (unique.length === 0) return null;
  if (unique.length === 1) return unique[0];
  if (stem && unique.includes(stem)) return [stem, ...unique.filter(n => n !== stem)];
  return unique;
}

/** The custom properties a CSS fragment declares, in order. */
function declaredCustomProperties(css: string): string[] {
  return [...css.matchAll(/^\s*(--[A-Za-z0-9_-]+)\s*:/gm)].map(m => m[1]);
}

/** `Type.member` for each member a Swift `struct`/`enum` or a Kotlin `object` fragment declares. */
function declaredNestedMembers(source: string): string[] {
  const out: string[] = [];
  let type: string | undefined;
  for (const line of source.split('\n')) {
    const t = line.match(/^\s*(?:public\s+)?(?:struct|enum|object)\s+(\w+)\s*\{/);
    if (t) { type = t[1]; continue; }
    if (/^\s*\}/.test(line)) { type = undefined; continue; }
    const m = line.match(/^\s*(?:public\s+)?(?:static\s+let|val)\s+(\w+)/);
    if (m && type) out.push(`${type}.${m[1]}`);
  }
  return out;
}

/** The token's `platforms` list, when it declares one (`zIndex.*`, `elevation.*`). */
function declaredPlatforms(token: SemanticToken): readonly string[] | undefined {
  const p = (token as { platforms?: unknown }).platforms;
  return Array.isArray(p) ? p.map(String) : undefined;
}

/** One `tokens:` value in one component schema, read the way the consumer map reads it. */
export interface SchemaTokenRef {
  /** The component the schema declares (`name`, else the directory name) — the consumer's name. */
  component: string;
  /** Absolute path to the schema file. */
  schemaPath: string;
  /** The `tokens:` group the value sits under. */
  group: string;
  /** The declared token name (a non-string value is stringified, so it can be reported). */
  token: string;
  /** Precedence rank of the root the schema came from (0 = the highest; the package root is last). */
  rank: number;
}

/** A schema the reader could not parse — all of its declarations are lost, so it is reported. */
export interface UnreadableSchema {
  schemaPath: string;
  reason: string;
  rank: number;
}

/**
 * Read every `tokens:` value of every schema in the component universe `componentRoots`
 * resolves to (one component per declared name; a consumer's component replaces a package
 * component of the same name — `resolveComponentSources`).
 *
 * The ONE reader of schema token declarations: the consumer map, `generate`'s warning and
 * the guard test (`__tests__/schemaTokenRefs.test.ts`) all read through it, so they cannot
 * disagree about what a schema declares. `tokens:` is a map of group → refs; the canonical
 * (Stemma) form is an ARRAY per group, a scalar group is tolerated, and each ref is a string
 * or an object's `reference`/`name` (Spec 118 Task 9.5.2 fixed the array reader). An empty
 * group (`null`) declares nothing. Any other value is kept, stringified, so the guard sees it.
 */
export function readSchemaTokenRefs(componentRoots: string | string[]): {
  refs: SchemaTokenRef[];
  unreadable: UnreadableSchema[];
  schemaCount: number;
} {
  const refs: SchemaTokenRef[] = [];
  const unreadable: UnreadableSchema[] = [];
  let schemaCount = 0;

  for (const source of resolveComponentSources(componentRoots).winners) {
    const schemaFiles = fs.readdirSync(source.dirPath).filter(f => f.endsWith('.schema.yaml'));
    for (const schemaFile of schemaFiles) {
      const schemaPath = path.join(source.dirPath, schemaFile);
      schemaCount++;
      let schema: any;
      try {
        schema = yaml.load(fs.readFileSync(schemaPath, 'utf-8'));
      } catch (err) {
        unreadable.push({ schemaPath, reason: err instanceof Error ? err.message.split('\n', 1)[0] : String(err), rank: source.rank });
        continue;
      }
      if (!schema?.tokens || typeof schema.tokens !== 'object') continue;

      const component = schema.name || source.dir;
      for (const [group, groupValue] of Object.entries(schema.tokens as Record<string, unknown>)) {
        const values = Array.isArray(groupValue) ? groupValue : [groupValue];
        for (const value of values) {
          if (value === null || value === undefined) continue;
          const named = typeof value === 'string'
            ? value
            : (value as any)?.reference || (value as any)?.name;
          const token = typeof named === 'string' && named ? named : JSON.stringify(value);
          refs.push({ component, schemaPath, group, token, rank: source.rank });
        }
      }
    }
  }

  return { refs, unreadable, schemaCount };
}

/**
 * Resolve declarations against the token index built in the same run: a declaration
 * resolves only as an EXACT, case-sensitive key of the primitive, semantic or component-token
 * index (a component token only under its registry key, `<component lowercased>.<key>`). No
 * case-folding, no notation normalization, no allowlist (ruling 2026-10-23 § 3a). A resolving
 * declaration makes its component a consumer of that token; the rest are returned.
 */
export function resolveSchemaTokenRefs(
  refs: SchemaTokenRef[],
  indexKeys: ReadonlySet<string>,
): { consumerMap: Map<string, string[]>; unresolved: SchemaTokenRef[] } {
  const consumerMap = new Map<string, string[]>();
  const unresolved: SchemaTokenRef[] = [];
  for (const ref of refs) {
    if (!indexKeys.has(ref.token)) {
      unresolved.push(ref);
      continue;
    }
    const consumers = consumerMap.get(ref.token) || [];
    if (!consumers.includes(ref.component)) consumers.push(ref.component);
    consumerMap.set(ref.token, consumers);
  }
  return { consumerMap, unresolved };
}

/** What a run wrote, and the schema declarations it could not count. */
export interface TokenIndexResult {
  counts: { primitives: number; semantics: number; components: number };
  /** The component root set the consumer map read, in precedence order. */
  componentRoots: string[];
  /** Declarations that are not a key of this run's index — no consumer edge was written. */
  unresolved: SchemaTokenRef[];
  /** Schemas that could not be parsed — none of their declarations were read. */
  unreadable: UnreadableSchema[];
}

/**
 * Generate the token index YAML files.
 *
 * @param tokenIndexDir - Absolute or relative (to cwd) path for output. Defaults to 'token-index'.
 * @param input - Required resolved token data from the CLI.
 */
export function generateTokenIndex(tokenIndexDir: string = 'token-index', input: TokenIndexInput): TokenIndexResult {
  const outputDir = path.isAbsolute(tokenIndexDir)
    ? tokenIndexDir
    : path.resolve(process.cwd(), tokenIndexDir);

  console.log('📊 Generating token index...\n');

  const webGen = new WebFormatGenerator();
  const iosGen = new iOSFormatGenerator();
  const androidGen = new AndroidFormatGenerator('kotlin');

  const themeVarying = input.modeResolved.themeVaryingTokens;
  // The iOS and Android columns' `theme.` names come from the set the native generators
  // consume, not from the base-scoped flag (plan item 5 of the record named above).
  const nativeThemeVarying = input.modeResolved.nativeThemeVaryingTokens;
  const emittedColors = TokenFileGenerator.emittedColorPrimitiveNames();
  const motionFormatters = {
    web: new WebMotionTokenFormatter(),
    ios: new iOSMotionTokenFormatter(),
    android: new AndroidMotionTokenFormatter(),
  };
  const primitiveOklch = input.modeResolved.primitiveOklch;
  const primitives = input.primitiveTokens;
  const semantics = input.semanticTokens;

  // Build the consumer map from the component universe the caller resolved (Spec 118
  // Task 9.5.2, Class C′; R1-7): the consumer's components AND DesignerPunk's, the set
  // the Application MCP serves, so a consumer's added or forked component and every
  // package component appear in their generated index. Passed in via
  // `input.componentSchemaDir` — NOT computed from `__dirname` here.
  // The universe a declaration can resolve into: every key this run writes, all three tiers.
  const universe = resolveComponentSources(input.componentSchemaDir);
  const allSources = [...universe.winners, ...universe.shadowed.map(s => s.source)];
  // Shape (c): in a consumer repo, the package's own component-token entries for every
  // package component this universe does not replace. They are index entries only: nothing
  // here emits platform output (the package's component-token stylesheet already defines them).
  const merged = input.packageComponentTokens
    ? mergePackageComponentTokens(input.packageComponentTokens, universe, new Set(input.componentTokens.map(t => t.name)))
    : [];
  const indexKeys = new Set<string>([
    ...primitives.map(t => t.name),
    ...semantics.map(t => t.name),
    ...input.componentTokens.map(t => t.name),
    ...merged.map(m => m.name),
  ]);
  const schemaRefs = readSchemaTokenRefs(input.componentSchemaDir);
  const { consumerMap, unresolved } = resolveSchemaTokenRefs(schemaRefs.refs, indexKeys);

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
      // A colour primitive the generators do not emit has no name on any platform
      // (`.kiro/issues/2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`).
      ...(token.category === TokenCategory.COLOR && !emittedColors.has(token.name)
        ? {
            platforms: { web: null, ios: null, android: null },
            platformNotes: { web: PLATFORM_NOTES.unemittedColor, ios: PLATFORM_NOTES.unemittedColor, android: PLATFORM_NOTES.unemittedColor },
          }
        : {
            platforms: {
              web: webGen.getTokenName(token.name, token.category),
              ios: iosPath,
              android: androidPath,
            },
          }),
      // Consumers on every tier (ruling 2026-10-23 § 3b): a schema that declares a
      // primitive is a consumer of it, exactly as for a semantic token.
      consumers: consumerMap.get(token.name) || [],
    };

    primitivesIndex[token.name] = entry;
  }

  // Generate semantics index
  const semanticsIndex: Record<string, any> = {};
  for (const token of semantics) {
    const isThemeVarying = themeVarying.has(token.name);
    const supported = declaredPlatforms(token);
    const note = token.name.startsWith('elevation.') ? PLATFORM_NOTES.elevation
      : token.name.startsWith('zIndex.') ? PLATFORM_NOTES.zIndex
      : undefined;

    /** The name(s) the generators emit for this token on one platform (TokenFileGenerator's paths). */
    const namesOn = (platform: IndexPlatform): IndexPlatformName => {
      if (supported && !supported.includes(platform)) return null;
      const gen = platform === 'web' ? webGen : platform === 'ios' ? iosGen : androidGen;
      const stem = gen.getTokenName(token.name, token.category);
      // Semantic motion: the dedicated motion section (generateMotionSection) writes it.
      if (token.name.startsWith('motion.')) {
        const fragment: string = motionFormatters[platform].generateSemanticMotionTokens({ [token.name]: token });
        return platform === 'web'
          ? collapse(declaredCustomProperties(fragment))
          : collapse(declaredNestedMembers(fragment));
      }
      // A multi-reference token on web is one custom property per key (and the composite, for shadow).
      if (platform === 'web' && token.primitiveReferences && semanticEmissionShape(token) === 'multi') {
        return collapse(declaredCustomProperties(webGen.formatMultiReferenceToken(token)), stem);
      }
      if (platform !== 'web' && nativeThemeVarying.has(token.name)) return `theme.${stem}`;
      return stem;
    };

    const platforms = Object.fromEntries(INDEX_PLATFORMS.map(p => [p, namesOn(p)])) as Record<IndexPlatform, IndexPlatformName>;
    const nullOn = INDEX_PLATFORMS.filter(p => platforms[p] === null);
    semanticsIndex[token.name] = {
      category: token.category,
      primitiveReferences: token.primitiveReferences || null,
      themeVarying: isThemeVarying,
      platforms,
      ...(nullOn.length > 0 && note ? { platformNotes: Object.fromEntries(nullOn.map(p => [p, note])) } : {}),
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

    const definedBy = definingComponent(input.componentTokenFiles?.get(ct.name), allSources);
    componentTokensIndex[ct.name] = {
      component: ct.component,
      // The component directory whose token file defines it; absent for the token-source tier.
      ...(definedBy ? { definedBy } : {}),
      primitiveReferences: ct.primitiveReference ? { value: ct.primitiveReference } : { value: String(ct.value) },
      platforms: {
        web: webGen.getTokenName(ct.name, 'component'),
        ios: `${enumName}.${propertyName}`,
        android: `${enumName}.${propertyName}`,
      },
      // Keyed by the registry name (`<component lowercased>.<key>`), the only spelling
      // a schema can declare a component token under.
      consumers: consumerMap.get(ct.name) || [],
    };
  }

  // The merged package entries, after the repo's own, each tagged with the package version
  // it came from: a package upgrade without a new `generate` leaves this tag behind, which is
  // how `sync` tells (`assessIndexedPackageComponentTokens`). Consumers are counted over this
  // run's universe, never copied from the package's index.
  for (const { name, entry, definedBy } of merged) {
    const pkg = input.packageComponentTokens!;
    const source: PackageEntrySource = { package: pkg.name, version: pkg.version };
    componentTokensIndex[name] = {
      ...(entry.component !== undefined ? { component: entry.component } : {}),
      definedBy,
      ...(entry.primitiveReferences !== undefined ? { primitiveReferences: entry.primitiveReferences } : {}),
      platforms: entry.platforms,
      consumers: consumerMap.get(name) || [],
      source,
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

  // Spec 123 Task 1.5 (DD24): record the live tier this index's data came from, so
  // the application MCP's theme readers can find `themes/dark/SemanticOverrides.ts`
  // relative to whichever index actually got served, not a guessed project root.
  // Written RELATIVE to the index directory, with `/` separators, so the file is
  // machine-independent: an absolute value shipped the publishing machine's path in
  // the package (`.kiro/issues/2026-10-02-token-index-meta-ships-absolute-path.md`, F2).
  // The package's own index records `../src/tokens`, which resolves inside the
  // installed package because `src/tokens/**` ships. The resolver
  // (`application-mcp-server/src/indexer/resolveThemeTierRoot.ts`) resolves it against
  // the index directory. Key omitted when no tier is passed.
  fs.writeFileSync(
    path.join(outputDir, 'meta.json'),
    JSON.stringify({ tierDir: relativeTierDir(outputDir, input.tierDir) }, null, 2) + '\n',
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
  const fromPackage = merged.length > 0 && input.packageComponentTokens
    ? ` (${merged.length} of them DesignerPunk's, from ${input.packageComponentTokens.name} ${input.packageComponentTokens.version})`
    : '';
  console.log(`   Component tokens: ${counts.components}${fromPackage}\n`);

  return {
    counts,
    componentRoots: universe.roots,
    unresolved,
    unreadable: schemaRefs.unreadable,
  };
}
