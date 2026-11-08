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
import { ProductTokenGenerator } from '../build/product/ProductTokenGenerator';
import { emitCSS } from '../build/product/emitters/WebEmitter';
import { emitSwift } from '../build/product/emitters/SwiftEmitter';
import { emitKotlin } from '../build/product/emitters/KotlinEmitter';
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Where each product token file is written. The web file stays under `<output>/product`; a native file goes to its
 * platform's folder when `platforms:` names one (Spec 129 Req 12.2), else under `<output>/product` too.
 */
export function productTokenOutputPaths(config: ResolvedConfig): { web: string; ios: string; android: string } {
  const productDir = path.join(config.outputDir, 'product');
  return {
    web: path.join(productDir, 'ProductTokens.web.css'),
    ios: path.join(config.platforms?.ios?.output ?? productDir, 'ProductTokens.ios.swift'),
    android: path.join(config.platforms?.android?.output ?? productDir, 'ProductTokens.android.kt'),
  };
}

export interface GenerateProductTokensOptions {
  /** Write here instead of `<outputDir>/product`, and print nothing: the freshness check renders into a temporary directory. */
  renderTo?: string;
}

export function generateProductTokens(config: ResolvedConfig, options: GenerateProductTokensOptions = {}): void {
  const quiet = options.renderTo !== undefined;
  if (!config.productTokens || !fs.existsSync(config.productTokens)) {
    if (config.productTokens && !quiet) {
      console.warn(`⚠️  Product tokens path not found: ${config.productTokens}`);
    }
    return;
  }

  const tokenIndexDir = path.resolve(config.configDir, 'token-index');
  const outputDir = options.renderTo ?? path.join(config.outputDir, 'product');

  const generator = new ProductTokenGenerator({
    productTokensDir: config.productTokens,
    tokenIndexDir,
    outputDir,
    configName: config.name,
    configAbbreviation: config.abbreviation,
  });

  const result = generator.generate();

  if (result.categoryCount === 0) return;

  // A composite ref is refused, not skipped (Spec 129 Req 5.6; decided in Task 11 under Req 10.4:
  // no supported consumer's product tokens holds one). Nothing is written for the product tokens.
  if (result.compositeRefs.length > 0) {
    throw new Error(result.compositeRefs.map(c => c.message).join('\n'));
  }

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

  // A native file goes to its platform's folder when `platforms:` names one; the render for the freshness check is flat.
  const at = options.renderTo !== undefined
    ? { web: path.join(outputDir, 'ProductTokens.web.css'), ios: path.join(outputDir, 'ProductTokens.ios.swift'), android: path.join(outputDir, 'ProductTokens.android.kt') }
    : productTokenOutputPaths(config);
  for (const [file, content] of [[at.web, css], [at.ios, swift], [at.android, kotlin]] as const) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }

  if (quiet) return;

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
