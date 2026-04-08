#!/usr/bin/env node
/**
 * DesignerPunk Pipeline CLI
 *
 * Entry point for `npx designerpunk generate`.
 * Loads `designerpunk.config.ts` from the working directory,
 * registers themes, and runs the token generation pipeline.
 *
 * TypeScript execution: Uses native `import()` in Phase 1 (ts-node in dev).
 * Block B (WS2 packaging) wires `tsx` as the bootstrap loader for product repos.
 *
 * @see Spec 094 design.md § "Pipeline CLI"
 */

import { loadConfig } from '../config/ConfigLoader';
import { generateTokenFiles } from '../generators/generateTokenFiles';

async function main() {
  const command = process.argv[2];

  if (!command || command === 'generate') {
    await runGenerate();
  } else if (command === '--help' || command === '-h') {
    printHelp();
  } else {
    console.error(`Unknown command: ${command}`);
    printHelp();
    process.exit(1);
  }
}

async function runGenerate() {
  try {
    const config = await loadConfig(process.cwd());

    console.log(`📦 ${config.name} (${config.abbreviation})`);
    console.log(`   Source: ${config.tokenSourceRoot}`);
    console.log(`   Output: ${config.outputDir}`);
    if (config.themes.length > 0) {
      console.log(`   Themes: ${config.themes.map(t => `${t.name} (${t.mode})`).join(', ')}`);
    }
    console.log('');

    generateTokenFiles(config.outputDir, config);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk generate    Generate token files from designerpunk.config.ts
  npx designerpunk --help      Show this help

Configuration:
  Place a designerpunk.config.ts in your project root.
  See the DesignerPunk repo's designerpunk.config.ts for an example.
`);
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
