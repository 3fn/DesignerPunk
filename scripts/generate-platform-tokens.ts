#!/usr/bin/env tsx
/**
 * Generate Platform-Specific Token Files
 * 
 * This script generates DesignTokens files for web, iOS, and Android platforms,
 * as well as ComponentTokens files for component-specific tokens registered
 * via the Rosetta System's ComponentTokenRegistry.
 * 
 * Output files:
 * - dist/DesignTokens.web.css (primitive + semantic tokens)
 * - dist/DesignTokens.ios.swift
 * - dist/DesignTokens.android.kt
 * - dist/ComponentTokens.web.css (component tokens from registry)
 * - dist/ComponentTokens.ios.swift
 * - dist/ComponentTokens.android.kt
 */

import { TokenFileGenerator } from '../src/generators/TokenFileGenerator';
import { DTCGFormatGenerator } from '../src/generators/DTCGFormatGenerator';
import * as fs from 'fs';
import * as path from 'path';

// Component tokens are loaded via loadComponentTokens(config) inside main() — source-presence
// discovery (Spec 117 Task 4 / R4), NOT a hardcoded import subset. The previous hardcoded
// side-effect imports registered only a partial set (27 of 33), silently dropping the
// convention-dir/componentTokenDirs tokens that R4's discovery finds (e.g. inputcheckbox/
// inputradio sizing). Using the same loader as the documented CLI keeps the build's
// component tier in lockstep with the CLI and the committed token-index.

async function main() {
  console.log('🚀 Generating platform-specific token files...\n');

  const generator = new TokenFileGenerator();
  const outputDir = path.join(process.cwd(), 'dist');

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // Generate all platform files using the unified orchestration (Spec 080 Phase 2)
    // This handles 4-context resolution, override validation, and WCAG override keys
    const { generateTokenFiles } = await import('../src/generators/generateTokenFiles');
    const { resolveTokens } = await import('../src/cli/resolveTokens');
    const { loadConfig } = await import('../src/config/ConfigLoader');
    // ⚠️ DO NOT REMOVE the injected loader argument `(p) => import(p)` below. ⚠️
    // Spec 118 (Increment 3a, tsx-standardized): this script runs under tsx, where an
    // ambient `.ts` loader is ALREADY present (invoked as `tsx <this file>`; the bin/CLI
    // also register tsx). Injecting the ambient loader makes loadConfig use THIS process's
    // existing hook instead of engaging Approach A's own global tsx register/unregister
    // cycle — that cycle tears down the ambient `.ts` hook and breaks subsequent
    // `import('.ts')` in this same process (the Increment-1 prebuild regression).
    // The seam is loader-AGNOSTIC: it protected ts-node's ambient hook before, and protects
    // tsx's ambient hook now, identically. A future edit that drops the argument (letting
    // loadConfig self-register) WILL reintroduce the Inc-1 ambient-loader teardown regression.
    // See findings/increment-1-ambient-loader-regression.md.
    const config = await loadConfig(process.cwd(), (p) => import(p));
    // ⚠️ DO NOT REMOVE the injected `ambientTsRequire` loader passed to
    // loadComponentTokens / resolveTokens below. ⚠️
    // Spec 118 Task 9.5: resolveTokens + loadComponentTokens now carry their OWN scoped
    // tsx seam (Approach A: namespaced register → require → unregister) as the production
    // default — so a real-node consumer generate no longer depends on the bin's global
    // register. But THIS script runs under tsx (`tsx <this file>`), where an ambient `.ts`
    // loader is ALREADY present. Letting these sites self-engage Approach A here would
    // register/UNREGISTER tsx mid-build, tearing down the ambient hook and breaking the
    // subsequent `import('.ts')` calls in this same process (the Inc-1 ambient-loader
    // teardown regression — identical to the loadConfig seam above, which injects the
    // ambient loader for the same reason). So inject the ambient require: it resolves
    // `.ts` via the process's existing tsx hook WITHOUT a register/unregister cycle.
    // A future edit that drops these arguments WILL reintroduce the Inc-1 regression.
    // See findings/increment-1-ambient-loader-regression.md and the bin header.
    const ambientTsRequire = (id: string) => require(id);
    // Populate ComponentTokenRegistry via source-presence discovery (Spec 117 Task 4 / R4),
    // the same loader the documented CLI uses — so the build's component tier matches the CLI
    // (all 33, not the hardcoded 27). Runs under the ambient tsx loader (the injected seam
    // keeps import('.ts')/require('.ts') resolving here).
    const { loadComponentTokens } = await import('../src/cli/loadComponentTokens');
    loadComponentTokens(config, ambientTsRequire);
    const tokenInput = resolveTokens(config, ambientTsRequire);
    // Capture the single shared mode-resolved truth (Spec 117 Task 3) so the token-index
    // below is fed from the SAME source as the platform files — no divergent second path.
    const modeResolved = generateTokenFiles(tokenInput, config);

    // Generate component tokens (from ComponentTokenRegistry)
    console.log('📊 Component Token Generation Results:\n');
    const componentResults = generator.generateComponentTokens({
      outputDir,
      version: '1.0.0',
      includeComments: true
    });

    // Write component token files to disk
    for (const result of componentResults) {
      if (result.valid) {
        fs.writeFileSync(result.filePath, result.content, 'utf-8');
      }
    }

    // Report component token results
    for (const result of componentResults) {
      const status = result.valid ? '✅' : '❌';
      console.log(`${status} ${result.platform.toUpperCase()} Component Tokens`);
      console.log(`   File: ${result.filePath}`);
      console.log(`   Tokens: ${result.tokenCount} component tokens`);
      
      if (result.errors && result.errors.length > 0) {
        console.log(`   ❌ Errors: ${result.errors.length}`);
        result.errors.forEach((e: string) => console.log(`      - ${e}`));
      }
      
      console.log('');
    }

    const allComponentValid = componentResults.every((r: any) => r.valid);
    
    // --- DTCG Format Generation ---
    // Parallel export for external tool integration (Figma, Style Dictionary, Tokens Studio)
    // Errors are logged but don't fail the build — DTCG is additive, not critical path
    try {
      console.log('📊 DTCG Token Format Generation:\n');
      const dtcgGenerator = new DTCGFormatGenerator();
      const dtcgOutputPath = path.join(outputDir, 'DesignTokens.dtcg.json');
      dtcgGenerator.writeToFile(dtcgOutputPath);
      console.log('');
    } catch (dtcgError) {
      console.error('⚠️  DTCG generation failed (non-blocking):', dtcgError instanceof Error ? dtcgError.message : dtcgError);
      console.log('   Platform token generation was not affected.\n');
    }

    // --- Token Index Generation (Spec 096; Spec 117 Task 3) ---
    // Generated INLINE from the same `modeResolved` that produced the platform files
    // above — one shared source, so the token-index cannot drift from dist (the index's
    // base-scoped theme-varying set + per-primitive OKLCH ride on `modeResolved`). This
    // replaces the retired standalone scripts/generate-token-index.ts, which computed a
    // divergent registry-wide theme-varying set (the stale "10" Spec 117 Task 3 fixed).
    // Blocking by design: a failed/stale index must fail the build, not be swallowed.
    console.log('📊 Token Index Generation:\n');
    const { generateTokenIndex } = await import('../src/generators/generateTokenIndex');
    const { ComponentTokenRegistry } = await import('../src/registries/ComponentTokenRegistry');
    // Class C′ (Spec 118 Task 9.5.2): resolve the component-schema scan root from the
    // active config (default `<configDir>/src/components/core`) and pass it in, mirroring
    // the CLI's runGenerate path — so the package's own build feeds the generator its own
    // resolved root rather than the generator computing it from __dirname.
    const componentSchemaDir = path.resolve(config.configDir, 'src/components/core');
    generateTokenIndex(path.resolve(process.cwd(), 'token-index'), {
      primitiveTokens: tokenInput.primitiveTokens,
      semanticTokens: tokenInput.semanticTokens,
      componentTokens: ComponentTokenRegistry.getAll(),
      modeResolved,
      componentSchemaDir,
    });

    if (allComponentValid) {
      console.log('✨ All platform files generated successfully!');
      process.exit(0);
    } else {
      console.error('❌ Some platform files failed to generate');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating platform files:', error);
    process.exit(1);
  }
}

main();
