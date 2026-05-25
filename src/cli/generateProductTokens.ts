/**
 * Product Token Generation — CLI integration
 *
 * Invoked by `npx designerpunk generate` when productTokens is configured.
 * Generates platform files to dist/product/.
 *
 * @see Spec 109 design.md § "Generate Integration"
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateTokenIndex } from '../generators/generateTokenIndex';
import { ProductTokenGenerator } from '../build/product/ProductTokenGenerator';
import { emitCSS } from '../build/product/emitters/WebEmitter';
import { emitSwift } from '../build/product/emitters/SwiftEmitter';
import { emitKotlin } from '../build/product/emitters/KotlinEmitter';
import type { ResolvedConfig } from '../config/ConfigLoader';

export function generateProductTokens(config: ResolvedConfig): void {
  if (!config.productTokens || !fs.existsSync(config.productTokens)) {
    if (config.productTokens) {
      console.warn(`⚠️  Product tokens path not found: ${config.productTokens}`);
    }
    return;
  }

  // Regenerate token-index to ensure freshness (Req 9.1, 9.2)
  const tokenIndexDir = path.resolve(config.configDir, 'token-index');
  generateTokenIndex(tokenIndexDir);
  const outputDir = path.join(config.outputDir, 'product');

  const generator = new ProductTokenGenerator({
    productTokensDir: config.productTokens,
    tokenIndexDir,
    outputDir,
    configName: config.name,
    configAbbreviation: config.abbreviation,
  });

  const result = generator.generate();

  if (result.categoryCount === 0) return;

  // Ensure output directory exists
  fs.mkdirSync(outputDir, { recursive: true });

  // Emit platform files
  const emitterConfig = {
    productTokensDir: config.productTokens!,
    tokenIndexDir,
    outputDir,
    configName: config.name,
    configAbbreviation: config.abbreviation,
  };
  const css = emitCSS(result.categories, emitterConfig);
  const swift = emitSwift(result.categories, emitterConfig);
  const kotlin = emitKotlin(result.categories, emitterConfig);

  fs.writeFileSync(path.join(outputDir, 'ProductTokens.web.css'), css);
  fs.writeFileSync(path.join(outputDir, 'ProductTokens.ios.swift'), swift);
  fs.writeFileSync(path.join(outputDir, 'ProductTokens.android.kt'), kotlin);

  // Report summary
  console.log(`🏷️  Product tokens: ${result.tokenCount} tokens, ${result.categoryCount} categories`);
  if (result.brokenRefs.length > 0) {
    console.warn(`   ⚠️  ${result.brokenRefs.length} broken ref${result.brokenRefs.length > 1 ? 's' : ''} (output contains fallback values)`);
    for (const ref of result.brokenRefs) {
      console.warn(`      → ${ref.token} references '${ref.ref}' (${ref.file})`);
    }
  }
  console.log(`   Output: ${path.relative(process.cwd(), outputDir)}/`);
}
