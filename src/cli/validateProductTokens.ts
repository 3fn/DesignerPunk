/**
 * Validate Product Tokens Command
 *
 * Checks all product token refs against the token-index.
 * Reports broken refs with actionable messages.
 *
 * @see Spec 109 design.md § "CLI Integration"
 */

import * as path from 'path';
import { loadConfig } from '../config/ConfigLoader';
import { ProductTokenGenerator } from '../build/product/ProductTokenGenerator';

export async function runValidateProductTokens(): Promise<void> {
  const config = await loadConfig(process.cwd());

  if (!config.productTokens) {
    console.log('No productTokens path configured');
    process.exit(0);
  }

  const tokensDir = path.resolve(process.cwd(), config.productTokens);
  const tokenIndexDir = path.resolve(process.cwd(), 'token-index');

  console.log(`🔍 Validating product tokens: ${path.relative(process.cwd(), tokensDir)}\n`);

  const generator = new ProductTokenGenerator({
    productTokensDir: tokensDir,
    tokenIndexDir,
    outputDir: '',
    configName: config.name || 'DesignerPunk',
    configAbbreviation: config.abbreviation || 'DP',
  });

  const result = generator.validate();

  // Report per-file results
  for (const cat of result.categories) {
    const icon = cat.valid ? '✅' : '❌';
    console.log(`${icon} ${cat.file}: ${cat.tokenCount} tokens${cat.valid ? ', all refs valid' : ''}`);
    const fileRefs = result.brokenRefs.filter(r => r.file === cat.file);
    for (const ref of fileRefs) {
      console.log(`   → ${ref.token} references '${ref.ref}' which is not in token-index`);
    }
  }

  console.log('');
  if (result.brokenRefs.length === 0) {
    console.log('✨ All product token references valid');
    process.exit(0);
  } else {
    console.log(`${result.brokenRefs.length} broken reference${result.brokenRefs.length > 1 ? 's' : ''} found. Run \`npx designerpunk generate\` to refresh token-index.`);
    process.exit(1);
  }
}
