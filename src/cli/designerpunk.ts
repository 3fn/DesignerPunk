#!/usr/bin/env node
/**
 * DesignerPunk Pipeline CLI
 *
 * Entry point for `npx designerpunk generate`, `mcp:app`, and `mcp:docs`.
 *
 * TypeScript execution: Uses native `import()` in Phase 1 (ts-node in dev).
 * Block B (WS2 packaging) wires `tsx` as the bootstrap loader for product repos.
 *
 * @see Spec 094 design.md § "Pipeline CLI"
 * @see Spec 095 design.md § "CLI MCP Commands"
 */

import * as path from 'path';
import { spawn } from 'child_process';
import { loadConfig } from '../config/ConfigLoader';
import { generateTokenFiles } from '../generators/generateTokenFiles';

async function main() {
  const command = process.argv[2];

  switch (command) {
    case undefined:
    case 'generate':
      await runGenerate();
      break;
    case 'mcp:app':
      await runMcpApp();
      break;
    case 'mcp:docs':
      await runMcpDocs();
      break;
    case '--help':
    case '-h':
      printHelp();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      printHelp();
      process.exit(1);
  }
}

/** Resolve the DesignerPunk package root — relative to this CLI file, or cwd fallback. */
function resolvePackageRoot(): string {
  // The CLI lives at src/cli/designerpunk.ts (or bin/designerpunk.js).
  // The package root is two levels up from src/cli/.
  const fromCli = path.resolve(__dirname, '../..');
  if (require('fs').existsSync(path.join(fromCli, 'package.json'))) {
    return fromCli;
  }
  return process.cwd();
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

async function runMcpApp() {
  const pkgRoot = resolvePackageRoot();
  const serverBundle = path.join(pkgRoot, 'dist/mcp/application-mcp.js');
  const componentsDir = path.join(pkgRoot, 'src/components/core');
  const patternsDir = path.join(pkgRoot, 'experience-patterns');
  const templatesDir = path.join(pkgRoot, 'layout-templates');
  const guidanceDir = path.join(pkgRoot, 'family-guidance');
  const registryPath = path.join(pkgRoot, 'family-registry.yaml');

  console.log('DesignerPunk Application MCP');
  console.log(`  Protocol: stdio`);
  console.log(`  Data: ${componentsDir}`);
  console.log(`  Server: ${serverBundle}`);
  console.log('  Starting...\n');

  spawnServer(serverBundle, {
    COMPONENTS_DIR: componentsDir,
    PATTERNS_DIR: patternsDir,
    TEMPLATES_DIR: templatesDir,
    GUIDANCE_DIR: guidanceDir,
    REGISTRY_PATH: registryPath,
  }, true);
}

async function runMcpDocs() {
  const pkgRoot = resolvePackageRoot();
  const serverBundle = path.join(pkgRoot, 'dist/mcp/docs-mcp.js');
  const steeringDir = path.join(pkgRoot, '.kiro/steering');

  console.log('DesignerPunk Docs MCP');
  console.log(`  Protocol: stdio`);
  console.log(`  Data: ${steeringDir}`);
  console.log(`  Server: ${serverBundle}`);
  console.log('  Starting...\n');

  spawnServer(serverBundle, { MCP_STEERING_DIR: steeringDir }, true);
}

/** Spawn a server as a child process. Uses node for bundled JS, tsx/ts-node for TypeScript. */
function spawnServer(entryPoint: string, envVars: Record<string, string>, bundled: boolean = false) {
  const runner = bundled ? 'node' : resolveTsRunner();

  const child = spawn(runner, [entryPoint], {
    env: { ...process.env, ...envVars },
    stdio: 'inherit',
  });

  child.on('error', (err) => {
    console.error(`❌ Failed to start server: ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

/** Find tsx or ts-node for running TypeScript server entry points. */
function resolveTsRunner(): string {
  try {
    require.resolve('tsx');
    return 'tsx';
  } catch {
    try {
      require.resolve('ts-node');
      return 'ts-node';
    } catch {
      console.error('❌ Neither tsx nor ts-node found. Install tsx: npm install tsx');
      process.exit(1);
    }
  }
}

function printHelp() {
  console.log(`
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk generate    Generate token files from designerpunk.config.ts
  npx designerpunk mcp:app     Start Application MCP server
  npx designerpunk mcp:docs    Start Docs MCP server
  npx designerpunk --help      Show this help

Configuration:
  Place a designerpunk.config.ts in your project root.
  See the DesignerPunk repo's designerpunk.config.ts for an example.

MCP servers resolve data paths from the installed package automatically.
No configuration needed for default usage.
`);
}

main().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
