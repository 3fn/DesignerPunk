/**
 * Generate Token Files Script
 * 
 * Generates platform-specific token constant files and writes them to the output directory.
 * Run this script to create DesignTokens.web.css, DesignTokens.ios.swift, and DesignTokens.android.kt
 */

import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';
import { TokenFileGenerator, type ThemeOverrideSet } from './TokenFileGenerator';
import { SemanticTokenValidator } from '../validators/SemanticTokenValidator';
import { PrimitiveTokenRegistry } from '../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../registries/SemanticTokenRegistry';
import { SemanticOverrideResolver } from '../resolvers/SemanticOverrideResolver';
import { resolveSemanticTokenValue } from '../resolvers/SemanticValueResolver';
import { ThemeRegistry } from '../themes/ThemeRegistry';
import { resolveThemeMaps, isThemePair } from '../themes/resolveThemeMaps';
import { findThemeRefusals, themeRefusalMessage } from '../themes/themeRefusals';
import { getCoreVersion } from './coreVersion';
import { registeredThemeDiffersNotice } from '../cli/shared/errorCatalog';
import type { TokenSet } from './TokenSet';
import { packageTokenSet } from '../config/TokenSetLoader';
import { getOklchMetadata } from './oklch/OklchTokenIndexMetadata';
import {
  findUnemittedColorReferences,
  unemittedColorReferenceMessage,
} from '../validators/ColorReferenceEmissionValidator';
import type { ModeResolvedTokens } from './ModeResolvedTokens';
import type { ResolvedConfig } from '../config/ConfigLoader';
import type { ConfigTheme } from '../config/defineConfig';
import { platformOutputDir } from '../config/platforms';
import type { SemanticOverrideMap } from '../tokens/themes/types';
import type { TokenInput } from '../cli/resolveTokens';
import type { SemanticToken } from '../types/SemanticToken';

/**
 * Thrown when `generateTokenFiles` stops because the token source failed its own validation
 * (semantic references; a semantic colour reference naming a primitive the platform files do
 * not define; or the built-in override maps naming tokens the source lacks).
 *
 * The details are logged before the throw; the message carries the first one so a caller
 * that prints only the message still names the cause. Nothing has been written when this
 * is thrown, and callers must not build the token index: there is no result to build it from.
 * (.kiro/issues/2026-10-03-generate-reports-success-after-validation-abort.md — the abort
 * paths used to RETURN an empty result, which callers read as success.)
 */
export class TokenGenerationAbortedError extends Error {
  constructor(public readonly stage: 'semantic-references' | 'unemitted-color-references' | 'override-maps' | 'context-override-maps' | 'theme-config',
              public readonly errors: string[]) {
    const first = errors[0] ?? '(no detail)';
    const more = errors.length > 1 ? ` (+${errors.length - 1} more, listed above)` : '';
    const what = stage === 'semantic-references'
      ? 'semantic token validation failed'
      : stage === 'unemitted-color-references'
        ? 'a semantic colour references a primitive the output does not define'
        : stage === 'override-maps'
          ? 'semantic override validation failed'
          : stage === 'theme-config'
            ? 'a registered theme cannot be emitted'
            : 'context override validation failed';
    super(`Token generation aborted: ${what}: ${first}${more}`);
    this.name = 'TokenGenerationAbortedError';
  }
}

/**
 * The two maps a registered theme contributes: the light scheme's and the dark scheme's. A theme of one mode
 * covers one scheme and leaves the other empty; the `{ light, dark }` form gives both (design § 4).
 */
function themeHalves(theme: ConfigTheme): { light: SemanticOverrideMap; dark: SemanticOverrideMap } {
  const overrides = theme.overrides as unknown;
  if (isThemePair(overrides)) return { light: overrides.light ?? {}, dark: overrides.dark ?? {} };
  if (!overrides || typeof overrides !== 'object') {
    throw new Error(`generate: theme '${theme.name}' is registered in designerpunk.config.ts, but its override map is missing.`);
  }
  const map = overrides as SemanticOverrideMap;
  if (theme.mode === 'light') return { light: map, dark: {} };
  if (theme.mode === 'dark') return { light: {}, dark: map };
  return { light: map, dark: map };
}

/**
 * Prints, once per change of a registered built-in map, how many of its values differ from DesignerPunk's
 * (design § 10: "A registered map whose values differ from the package's prints, on its first run after U9,
 * how many values now differ"). A marker in the output directory holds what was last reported, so the count
 * is not repeated on every run.
 */
function printRegisteredThemeCounts(
  differences: ReadonlyArray<{ role: string; theme: string; mode: string; differing: number | null; digest: string }>,
  outputDir: string,
  version: string,
): () => void {
  const markerFile = path.join(outputDir, '.theme-notice.json');
  let seen: Record<string, string> = {};
  try { seen = JSON.parse(fs.readFileSync(markerFile, 'utf-8')); } catch { /* none yet */ }
  const next: Record<string, string> = { ...seen };
  let changed = false;
  for (const d of differences) {
    if (!d.differing) continue;
    const digest = createHash('sha256').update(`${d.digest}:${version}`).digest('hex').slice(0, 12);
    if (seen[d.role] === digest) continue;
    console.warn(`ℹ️  ${registeredThemeDiffersNotice(d.theme, d.mode, d.differing, version)}`);
    next[d.role] = digest;
    changed = true;
  }
  // Written once generation has validated, so an aborted run leaves no trace.
  return () => {
    if (!changed) return;
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(markerFile, JSON.stringify(next, null, 2) + '\n');
  };
}

/**
 * Main generation function.
 *
 * Performs the single shared mode resolution (Spec 117 Task 3) and returns it as
 * {@link ModeResolvedTokens} so the token index consumes the SAME resolved truth dist
 * writes — eliminating the prior three-way drift between dist, the index's primitive
 * values, and a separate theme-varying computation.
 *
 * @param tokens - Resolved token arrays (primitive and semantic) from the configured source.
 * @param config - Resolved config from ConfigLoader.
 * @returns The mode-resolved truth (resolved light/dark sets, base-scoped theme-varying
 *   set, per-primitive OKLCH).
 * @throws {TokenGenerationAbortedError} When the token source fails validation. Nothing is
 *   written (not even the output directory), so the caller must not write the index either.
 */
export function generateTokenFiles(
  tokens: TokenInput,
  config: ResolvedConfig,
  options: {
    /** Component tokens kept out of the web ComponentTokens file (DesignerPunk's harvested ones). */
    excludeComponentTokenFromWeb?: (token: import('../registries/ComponentTokenRegistry').RegisteredComponentToken) => boolean;
  } = {},
): ModeResolvedTokens {
  const effectiveOutputDir = config.outputDir;
  // `platforms:` (Spec 129 Req 12): a platform the config names is written at its own folder, every other one at `output`.
  // The generators below build their file paths under `effectiveOutputDir`; each result is moved to its platform's folder
  // by its file name before it is written. DTCG and Figma are web-side files and follow `web`.
  const dirFor = (platform: 'web' | 'ios' | 'android'): string => platformOutputDir(config, platform);
  const placed = <T extends { platform: 'web' | 'ios' | 'android'; filePath: string }>(r: T): T => {
    r.filePath = path.join(dirFor(r.platform), path.basename(r.filePath));
    return r;
  };
  // The one token set every generator below reads (Spec 129 U9, design § 10): the consumer's copy.
  const tokenSet: TokenSet = tokens.tokenSet ?? packageTokenSet();
  const { composedColorMap } = tokenSet.mod('color/index');
  console.log('🚀 Starting token file generation...\n');

  // Validate semantic token references before generation
  console.log('🔍 Validating semantic token references...\n');
  
  const primitiveRegistry = new PrimitiveTokenRegistry();
  const semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);
  const validator = new SemanticTokenValidator(primitiveRegistry, semanticRegistry);
  
  const primitiveTokens = tokens.primitiveTokens;
  const semanticTokens = tokens.semanticTokens;

  // Register semantic tokens so override resolver can validate against them
  for (const token of semanticTokens) {
    semanticRegistry.register(token);
  }
  
  // Colour references first: the check below validates against the token source, but colour
  // primitives are emitted from the installed package's palette, so a colour the source adds
  // passes it and is never written out (.kiro/issues/2026-10-25-generate-passes-semantic-
  // references-to-unemitted-primitives.md). Checked again after theme resolution, below.
  const emittedColorNames = TokenFileGenerator.emittedColorPrimitiveNames(tokenSet);
  const checkColorReferences = (contexts: Array<Array<Omit<SemanticToken, 'primitiveTokens'>>>): void => {
    const findings = findUnemittedColorReferences(contexts, primitiveTokens, emittedColorNames);
    if (findings.length === 0) return;
    const messages = findings.map(unemittedColorReferenceMessage);
    console.error('❌ Semantic colour reference check failed:\n');
    messages.forEach(m => console.error(`   ${m}`));
    console.error('');
    throw new TokenGenerationAbortedError('unemitted-color-references', messages);
  };
  checkColorReferences([semanticTokens.map(t => resolveSemanticTokenValue(t, 'light', 'base', tokenSet))]);

  const validationResult = validator.validateSemanticReferences(semanticTokens, primitiveTokens);
  
  if (validationResult.level === 'Error') {
    console.error('❌ Semantic token validation failed:\n');
    console.error(`   ${validationResult.message}`);
    console.error(`   ${validationResult.rationale}\n`);
    
    if (validationResult.suggestions) {
      console.error('💡 Suggestions:');
      validationResult.suggestions.forEach(suggestion => {
        console.error(`   - ${suggestion}`);
      });
      console.error('');
    }
    
    // `rationale` joins the per-token reasons with '; ' (SemanticTokenValidator).
    throw new TokenGenerationAbortedError('semantic-references', validationResult.rationale.split('; '));
  }
  
  if (validationResult.level === 'Warning') {
    console.warn('⚠️  Semantic token validation passed with warnings:\n');
    console.warn(`   ${validationResult.message}`);
    console.warn(`   ${validationResult.rationale}\n`);
  } else {
    console.log('✅ Semantic token validation passed\n');
  }

  // Initialize generator
  const generator = new TokenFileGenerator(tokenSet);

  // Mode + theme resolution via ThemeRegistry (Spec 094)
  const themeRegistry = new ThemeRegistry();
  themeRegistry.setSemanticValidator((name) => semanticRegistry.has(name));

  // Register existing themes with pre-composed override maps matching legacy behavior.
  // 'wcag' mode 'both': light-wcag uses wcag overrides, dark-wcag uses merged dark+wcag+dark-wcag.
  // To produce identical output, we register two themes:
  //   - 'dark' (mode 'dark'): dark overrides only → produces dark-base context
  //   - 'wcag' (mode 'both'): light gets wcag overrides, dark gets merged overrides
  // The base light context has no overrides (handled by resolveForRegistry's baseline).

  // For the WCAG theme, we need different overrides per mode.
  // The registry stores one override map per theme. To match legacy behavior where
  // dark-wcag = dark + wcag + dark-wcag merged, we register the WCAG theme with
  // the light-wcag overrides and handle the dark-wcag composition in the resolver.
  // BUT — for migration safety, we use the legacy resolveAllContexts path and
  // convert its output to ResolvedThemeSet format. This guarantees identical output.

  // The override maps `generate` applies: registration decides where each built-in map comes from
  // (design § 10). The config's themes build the registry; nothing here is a static import.
  const configThemes: ConfigTheme[] = config.themes ?? [];
  // The theme-instance rule's refusals (design § 4, item 5): a registered theme that cannot become an instance
  // and a family case on both native platforms fails `generate` here, naming the config entry.
  const refusals = findThemeRefusals(configThemes);
  if (refusals.length > 0) {
    const message = themeRefusalMessage(refusals);
    console.error(`❌ ${message}\n`);
    throw new TokenGenerationAbortedError('theme-config', refusals.map(r => r.message));
  }
  const themeMaps = resolveThemeMaps(configThemes, tokenSet, {
    local: config.tokenSourceMode === 'local',
    tokenSourceRoot: config.tokenSourceRoot,
    coreVersion: getCoreVersion(),
  });
  themeMaps.warnings.forEach(w => console.warn(`⚠️  ${w}`));
  const commitThemeNotice = printRegisteredThemeCounts(themeMaps.differences, config.outputDir, getCoreVersion());
  const darkSemanticOverrides = themeMaps.dark;
  const wcagSemanticOverrides = themeMaps.wcagLight;
  const darkWcagSemanticOverrides = themeMaps.wcagDark;

  const overrideResolver = new SemanticOverrideResolver(semanticRegistry, darkSemanticOverrides);
  const overrideValidation = overrideResolver.validate();
  if (!overrideValidation.valid) {
    console.error('❌ Semantic override validation failed:\n');
    overrideValidation.errors.forEach(err => console.error(`   ${err}`));
    console.error('');
    throw new TokenGenerationAbortedError('override-maps', overrideValidation.errors);
  }

  // The registry holds the two built-in themes as resolved above, and every other theme the config registers.
  themeRegistry.register({
    name: 'dark',
    mode: 'dark',
    overrides: darkSemanticOverrides,
  });
  themeRegistry.register({
    name: 'wcag',
    mode: 'both',
    overrides: { ...wcagSemanticOverrides, ...darkWcagSemanticOverrides },
  });
  const customThemes = configThemes.filter(t => t.name !== 'dark' && t.name !== 'wcag');
  const customMaps = customThemes.map(t => themeHalves(t));
  try {
    customThemes.forEach((t, i) => {
      themeRegistry.register({ name: t.name, mode: t.mode, overrides: { ...customMaps[i].light, ...customMaps[i].dark } });
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Theme registration failed: ${message}\n`);
    throw new TokenGenerationAbortedError('override-maps', [message]);
  }

  // Use legacy resolution path to guarantee identical output during migration.
  // The registry is populated for getThemeVaryingTokens() and future consumers,
  // but generation still uses the proven ContextOverrideSet path.
  const contextOverrides = {
    'light-wcag': wcagSemanticOverrides,
    'dark-base': darkSemanticOverrides,
    'dark-wcag': { ...darkSemanticOverrides, ...wcagSemanticOverrides, ...darkWcagSemanticOverrides },
  } as import('../tokens/themes/types').ContextOverrideSet;

  const contextValidation = overrideResolver.validateAll(contextOverrides);
  if (!contextValidation.valid) {
    console.error('❌ Context override validation failed:\n');
    contextValidation.errors.forEach(err => console.error(`   ${err}`));
    console.error('');
    throw new TokenGenerationAbortedError('context-override-maps', contextValidation.errors);
  }
  console.log('✅ Semantic override validation passed\n');

  const contextSets = overrideResolver.resolveAllContexts(semanticTokens, contextOverrides);

  // Level 1: Resolve primitive references to concrete rgba values per context
  const resolvedLight = contextSets['light-base'].map(t => resolveSemanticTokenValue(t, 'light', 'base', tokenSet));
  const resolvedDark = contextSets['dark-base'].map(t => resolveSemanticTokenValue(t, 'dark', 'base', tokenSet));
  const resolvedLightWcag = contextSets['light-wcag'].map(t => resolveSemanticTokenValue(t, 'light', 'wcag', tokenSet));
  const resolvedDarkWcag = contextSets['dark-wcag'].map(t => resolveSemanticTokenValue(t, 'dark', 'wcag', tokenSet));

  // Each other registered theme, resolved the same way. A theme of one mode covers one scheme; the other half is
  // the base (design § 4, "The single-mode rule"), so its uncovered half reads baseLight or baseDark.
  const themeOverrideSets: ThemeOverrideSet[] = customThemes.map((t, i) => {
    const { light, dark } = customMaps[i];
    const covered = t.overrides && isThemePair(t.overrides) ? 'both' : t.mode;
    const sets = overrideResolver.resolveAllContexts(semanticTokens, {
      'light-wcag': light,
      'dark-wcag': { ...darkSemanticOverrides, ...dark },
    });
    return {
      name: t.name,
      mode: t.mode,
      lightTokens: covered === 'dark' ? resolvedLight : sets['light-wcag'].map(x => resolveSemanticTokenValue(x, 'light', 'base', tokenSet)),
      darkTokens: covered === 'light' ? resolvedDark : sets['dark-wcag'].map(x => resolveSemanticTokenValue(x, 'dark', 'base', tokenSet)),
      overrideKeys: new Set([...Object.keys(light), ...Object.keys(dark)]),
    };
  });

  // Every context the platform files carry, after the theme overrides (which can re-point a token).
  checkColorReferences([resolvedLight, resolvedDark, resolvedLightWcag, resolvedDarkWcag,
    ...themeOverrideSets.flatMap(t => [t.lightTokens, t.darkTokens])]);

  // Generate all platform files (passing resolved tokens for all 4 contexts)
  const wcagOverrideKeys = new Set([
    ...Object.keys(wcagSemanticOverrides),
    ...Object.keys(darkWcagSemanticOverrides),
  ]);

  // Compute theme-varying tokens for the NON-WEB platform generators: registry overrides
  // (unions ALL registered themes — dark AND wcag) ∪ base light/dark differences. This
  // registry-wide Set (10 under the shipped config) is what the non-web generators consume.
  const themeVaryingTokens = themeRegistry.getThemeVaryingTokens();
  const darkMap = new Map(resolvedDark.map(t => [t.name, t]));
  for (const lt of resolvedLight) {
    if (lt.category !== 'color') continue;
    const dt = darkMap.get(lt.name);
    if (!dt) continue;
    const lv = lt.primitiveReferences?.value ?? '';
    const dv = dt.primitiveReferences?.value ?? '';
    if (lv !== dv) themeVaryingTokens.add(lt.name);
  }

  // BASE-SCOPED theme-varying set for the INDEX (Spec 117 §4.1) — seeded EMPTY, populated
  // ONLY from the base light-vs-dark resolved value diff. This is the SAME predicate the
  // web base `:root` block uses to decide `light-dark()` emission, so the index's
  // `themeVarying` flag binds to dist's base CSS by construction. It excludes WCAG-only
  // override keys (which differ across the wcag THEME, not across base light/dark MODE) and
  // is therefore DISTINCT from the registry-wide `themeVaryingTokens` above. Do NOT merge
  // these two sets — that re-introduces the R5 over-marking (committed's stale 10).
  const baseThemeVaryingTokens = new Set<string>();
  for (const lt of resolvedLight) {
    if (lt.category !== 'color') continue;
    const dt = darkMap.get(lt.name);
    if (!dt) continue;
    const lv = lt.primitiveReferences?.value ?? '';
    const dv = dt.primitiveReferences?.value ?? '';
    if (lv !== dv) baseThemeVaryingTokens.add(lt.name);
  }

  // Per-primitive mode-resolved OKLCH for the index's R3 value readout. For OKLCH color
  // primitives light === dark (the OKLCH model has no primitive-tier mode variance), so
  // both halves carry the same metadata; the nested shape preserves the MCP value contract.
  const primitiveOklch = new Map<string, import('./ModeResolvedTokens').PrimitiveOklchModes>();
  for (const token of primitiveTokens) {
    if (token.category !== 'color') continue;
    const composed = composedColorMap.get(token.name);
    if (!composed) continue;
    const metadata = getOklchMetadata(composed);
    primitiveOklch.set(token.name, { light: metadata, dark: metadata });
  }

  // Validation passed — only now touch the filesystem (an abort above leaves no trace).
  if (!fs.existsSync(effectiveOutputDir)) {
    fs.mkdirSync(effectiveOutputDir, { recursive: true });
    console.log(`📁 Created output directory: ${effectiveOutputDir}\n`);
  }
  for (const platform of ['web', 'ios', 'android'] as const) fs.mkdirSync(dirFor(platform), { recursive: true });
  commitThemeNotice();

  const results = generator.generateAll({
    outputDir: effectiveOutputDir,
    includeComments: true,
    groupByCategory: true,
    primitiveTokens,
    semanticTokens: resolvedLight,
    darkSemanticTokens: resolvedDark,
    wcagSemanticTokens: resolvedLightWcag,
    darkWcagSemanticTokens: resolvedDarkWcag,
    wcagOverrideKeys,
    themeOverrides: themeOverrideSets,
    themeVaryingTokens,
    productName: config.name,
    abbreviation: config.abbreviation
  });

  // Write files to disk
  console.log('📝 Writing token files...\n');
  
  for (const result of results.map(placed)) {
    const filePath = path.join(result.filePath);
    
    try {
      fs.writeFileSync(filePath, result.content, 'utf-8');
      
      if (result.valid) {
        console.log(`✅ ${result.platform.toUpperCase()}: ${path.basename(filePath)}`);
        console.log(`   Tokens: ${result.tokenCount}`);
        console.log(`   Path: ${filePath}\n`);
      } else {
        console.log(`❌ ${result.platform.toUpperCase()}: ${path.basename(filePath)} - VALIDATION FAILED`);
        console.log(`   Errors: ${result.errors?.join(', ')}\n`);
      }
    } catch (error) {
      console.error(`❌ Failed to write ${result.platform} file:`, error);
    }
  }

  // Validate cross-platform consistency
  console.log('🔍 Validating cross-platform consistency...\n');
  const validation = generator.validateCrossPlatformConsistency(results);

  if (validation.consistent) {
    console.log('✅ All platforms are mathematically consistent!\n');
  } else {
    console.log('⚠️  Cross-platform consistency issues detected:\n');
    validation.issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
    console.log('');
  }

  // Summary
  console.log('📊 Generation Summary:');
  console.log(`   Total platforms: ${results.length}`);
  console.log(`   Successful: ${results.filter(r => r.valid).length}`);
  console.log(`   Failed: ${results.filter(r => !r.valid).length}`);
  console.log(`   Total tokens per platform: ${results[0]?.tokenCount || 0}`);

  // --- Component Token Generation ---
  const componentResults = generator.generateComponentTokens({
    outputDir: effectiveOutputDir,
    includeComments: true,
    ...(options.excludeComponentTokenFromWeb ? { excludeFromWeb: options.excludeComponentTokenFromWeb } : {}),
  });

  for (const result of componentResults.map(placed)) {
    if (result.valid) {
      fs.writeFileSync(result.filePath, result.content, 'utf-8');
    }
  }

  const componentTokenCount = componentResults[0]?.tokenCount || 0;
  if (componentTokenCount > 0) {
    console.log(`   Component tokens: ${componentTokenCount} (${componentResults.filter(r => r.valid).length} platforms)`);
  }

  // --- DTCG Format Generation ---
  try {
    const { DTCGFormatGenerator } = require('./DTCGFormatGenerator');
    const dtcgGenerator = new DTCGFormatGenerator({}, tokenSet, darkSemanticOverrides);
    const dtcgOutputPath = path.join(dirFor('web'), 'DesignTokens.dtcg.json');
    dtcgGenerator.writeToFile(dtcgOutputPath);
    console.log(`   DTCG: DesignTokens.dtcg.json`);
  } catch (dtcgError) {
    console.error('   ⚠️  DTCG generation failed (non-blocking):', dtcgError instanceof Error ? dtcgError.message : dtcgError);
  }

  // --- Figma Format Generation (depends on DTCG) ---
  try {
    const dtcgPath = path.join(dirFor('web'), 'DesignTokens.dtcg.json');
    if (fs.existsSync(dtcgPath)) {
      const { FigmaTransformer } = require('./transformers/FigmaTransformer');
      const dtcgContent = JSON.parse(fs.readFileSync(dtcgPath, 'utf-8'));
      const transformer = new FigmaTransformer();
      if (transformer.canTransform(dtcgContent)) {
        const result = transformer.transform(dtcgContent);
        const figmaOutputPath = path.join(dirFor('web'), 'DesignTokens.figma.json');
        fs.writeFileSync(figmaOutputPath, result.content, 'utf-8');
        console.log(`   Figma: DesignTokens.figma.json`);
      }
    }
  } catch (figmaError) {
    console.error('   ⚠️  Figma generation failed (non-blocking):', figmaError instanceof Error ? figmaError.message : figmaError);
  }

  console.log('\n✨ Token file generation complete!');

  // Return the single shared mode-resolved truth for the index. Note `themeVaryingTokens`
  // here is the BASE-SCOPED set (distinct from the registry-wide `themeVaryingTokens` local
  // passed to the non-web generators above) — see ModeResolvedTokens doc-comment.
  return {
    resolvedLight,
    resolvedDark,
    themeVaryingTokens: baseThemeVaryingTokens,
    // The registry-wide set the native generators were given above, for the index's iOS and
    // Android columns only (their `theme.` names). Not merged into the base set.
    // Every colour semantic is a native theme member (design § 4, Q13).
    nativeThemeVaryingTokens: new Set(resolvedLight.filter(t => t.category === 'color').map(t => t.name)),
    primitiveOklch,
  };
}
