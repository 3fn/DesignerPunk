/**
 * Generate Token Files Script
 * 
 * Generates platform-specific token constant files and writes them to the output directory.
 * Run this script to create DesignTokens.web.css, DesignTokens.ios.swift, and DesignTokens.android.kt
 */

import * as fs from 'fs';
import * as path from 'path';
import { TokenFileGenerator } from './TokenFileGenerator';
import { SemanticTokenValidator } from '../validators/SemanticTokenValidator';
import { PrimitiveTokenRegistry } from '../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../registries/SemanticTokenRegistry';
import { SemanticOverrideResolver } from '../resolvers/SemanticOverrideResolver';
import { resolveSemanticTokenValue } from '../resolvers/SemanticValueResolver';
import { ThemeRegistry } from '../themes/ThemeRegistry';
import { darkSemanticOverrides } from '../tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../tokens/themes/dark-wcag/SemanticOverrides';
import { getAllPrimitiveTokens } from '../tokens';
import { getAllSemanticTokens } from '../tokens/semantic';

/**
 * Main generation function
 */
export function generateTokenFiles(outputDir: string = 'output'): void {
  console.log('🚀 Starting token file generation...\n');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${outputDir}\n`);
  }

  // Validate semantic token references before generation
  console.log('🔍 Validating semantic token references...\n');
  
  const primitiveRegistry = new PrimitiveTokenRegistry();
  const semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);
  const validator = new SemanticTokenValidator(primitiveRegistry, semanticRegistry);
  
  const primitiveTokens = getAllPrimitiveTokens();
  const semanticTokens = getAllSemanticTokens();

  // Register semantic tokens so override resolver can validate against them
  for (const token of semanticTokens) {
    semanticRegistry.register(token);
  }
  
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
    
    console.error('⚠️  Token generation aborted due to validation errors.\n');
    return;
  }
  
  if (validationResult.level === 'Warning') {
    console.warn('⚠️  Semantic token validation passed with warnings:\n');
    console.warn(`   ${validationResult.message}`);
    console.warn(`   ${validationResult.rationale}\n`);
  } else {
    console.log('✅ Semantic token validation passed\n');
  }

  // Initialize generator
  const generator = new TokenFileGenerator();

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

  const overrideResolver = new SemanticOverrideResolver(semanticRegistry, darkSemanticOverrides);
  const overrideValidation = overrideResolver.validate();
  if (!overrideValidation.valid) {
    console.error('❌ Semantic override validation failed:\n');
    overrideValidation.errors.forEach(err => console.error(`   ${err}`));
    console.error('\n⚠️  Token generation aborted due to override validation errors.\n');
    return;
  }

  // Register themes in the registry for downstream consumers (getThemeVaryingTokens, etc.)
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
    console.error('\n⚠️  Token generation aborted due to override validation errors.\n');
    return;
  }
  console.log('✅ Semantic override validation passed\n');

  const contextSets = overrideResolver.resolveAllContexts(semanticTokens, contextOverrides);

  // Level 1: Resolve primitive references to concrete rgba values per context
  const resolvedLight = contextSets['light-base'].map(t => resolveSemanticTokenValue(t, 'light', 'base'));
  const resolvedDark = contextSets['dark-base'].map(t => resolveSemanticTokenValue(t, 'dark', 'base'));
  const resolvedLightWcag = contextSets['light-wcag'].map(t => resolveSemanticTokenValue(t, 'light', 'wcag'));
  const resolvedDarkWcag = contextSets['dark-wcag'].map(t => resolveSemanticTokenValue(t, 'dark', 'wcag'));

  // Generate all platform files (passing resolved tokens for all 4 contexts)
  const wcagOverrideKeys = new Set([
    ...Object.keys(wcagSemanticOverrides),
    ...Object.keys(darkWcagSemanticOverrides),
  ]);

  const results = generator.generateAll({
    outputDir,
    version: '1.0.0',
    includeComments: true,
    groupByCategory: true,
    semanticTokens: resolvedLight,
    darkSemanticTokens: resolvedDark,
    wcagSemanticTokens: resolvedLightWcag,
    darkWcagSemanticTokens: resolvedDarkWcag,
    wcagOverrideKeys
  });

  // Write files to disk
  console.log('📝 Writing token files...\n');
  
  for (const result of results) {
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
  console.log('\n✨ Token file generation complete!');
}

// Run if executed directly
if (require.main === module) {
  const outputDir = process.argv[2] || 'output';
  generateTokenFiles(outputDir);
}
