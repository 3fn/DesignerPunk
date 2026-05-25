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
import { resolveTokens } from './resolveTokens';
import { loadComponentTokens } from './loadComponentTokens';
import { runValidate } from './validate';
import { runInit } from './init';
import { runValidateProductTokens } from './validateProductTokens';
import { generateProductTokens } from './generateProductTokens';

async function main() {
  const command = process.argv[2];

  switch (command) {
    case undefined:
    case 'generate':
      await runGenerate();
      break;
    case 'validate':
      await runValidateCommand();
      break;
    case 'init':
      await runInit(process.argv.slice(3));
      break;
    case 'mcp:app':
      await runMcpApp();
      break;
    case 'mcp:docs':
      await runMcpDocs();
      break;
    case 'mcp:product':
      await runMcpProduct();
      break;
    case 'figma:push':
      await runFigmaCommand('figma-push');
      break;
    case 'figma:extract':
      await runFigmaCommand('figma-extract');
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

async function runValidateCommand() {
  try {
    if (process.argv.includes('--product-tokens')) {
      await runValidateProductTokens();
    } else {
      await runValidate();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ ${message}`);
    process.exit(1);
  }
}

async function runGenerate() {
  try {
    const config = await loadConfig(process.cwd());
    const tokens = resolveTokens(config);

    // Load component tokens from local source when tokenSource is set
    if (config.tokenSourceMode === 'local') {
      const componentCount = loadComponentTokens(config);
      if (componentCount === 0) {
        console.warn(
          `⚠️  No component token files found.\n` +
          `   Searched: ${path.relative(process.cwd(), config.tokenSourceRoot)}/component/\n` +
          `   And: ${config.componentTokenDirs.map(d => path.relative(process.cwd(), d)).join(', ') || '(none configured)'}\n` +
          `   Component token output will be empty.\n` +
          `   Run \`npx designerpunk init\` to copy component tokens locally.\n`
        );
      }
    }

    const relativePath = path.relative(process.cwd(), config.tokenSourceRoot);
    console.log(`📦 ${config.name} (${config.abbreviation})`);
    console.log(`   Tokens: ${relativePath}  (${config.tokenSourceMode})`);
    console.log(`   Output: ${path.relative(process.cwd(), config.outputDir)}`);
    if (config.themes.length > 0) {
      console.log(`   Themes: ${config.themes.map(t => `${t.name} (${t.mode})`).join(', ')}`);
    }
    console.log('');

    generateTokenFiles(tokens, config);

    // Product token generation (after system tokens + token-index are fresh)
    if (config.productTokens) {
      generateProductTokens(config);
    }
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
  const tokenIndexDir = path.join(pkgRoot, 'token-index');

  console.error('DesignerPunk Application MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${componentsDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  spawnServer(serverBundle, {
    COMPONENTS_DIR: componentsDir,
    PATTERNS_DIR: patternsDir,
    TEMPLATES_DIR: templatesDir,
    GUIDANCE_DIR: guidanceDir,
    REGISTRY_PATH: registryPath,
    TOKEN_INDEX_DIR: tokenIndexDir,
  }, true);
}

async function runMcpDocs() {
  const pkgRoot = resolvePackageRoot();
  const serverBundle = path.join(pkgRoot, 'dist/mcp/docs-mcp.js');
  const steeringDir = path.join(pkgRoot, '.kiro/steering');

  console.error('DesignerPunk Docs MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${steeringDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  spawnServer(serverBundle, { MCP_STEERING_DIR: steeringDir }, true);
}

async function runMcpProduct() {
  const pkgRoot = resolvePackageRoot();
  const serverBundle = path.join(pkgRoot, 'dist/mcp/product-mcp.js');
  const productDir = process.env.PRODUCT_DIR || path.resolve(process.cwd(), 'product');

  console.error('DesignerPunk Product MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${productDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  spawnServer(serverBundle, { PRODUCT_DIR: productDir }, true);
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

/** Run a figma CLI command by spawning the compiled JS file with remaining args. */
async function runFigmaCommand(script: 'figma-push' | 'figma-extract') {
  const pkgRoot = resolvePackageRoot();
  const scriptPath = path.join(pkgRoot, `dist/cli/${script}.js`);

  if (!require('fs').existsSync(scriptPath)) {
    console.error(`❌ ${script} not found at ${scriptPath}`);
    process.exit(1);
  }

  const args = [scriptPath, ...process.argv.slice(3)];
  const child = spawn('node', args, {
    env: process.env,
    stdio: 'inherit',
  });

  child.on('error', (err) => {
    console.error(`❌ Failed to run ${script}: ${err.message}`);
    process.exit(1);
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

function printHelp() {
  console.log(`
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk init            Bootstrap a new product repo
  npx designerpunk generate        Generate token files from designerpunk.config.ts
  npx designerpunk validate        Validate token definitions against active source
  npx designerpunk validate --product-tokens  Validate product token refs against token-index
  npx designerpunk mcp:app         Start Application MCP server
  npx designerpunk mcp:docs        Start Docs MCP server
  npx designerpunk mcp:product     Start Product MCP server
  npx designerpunk figma:push      Push tokens to Figma (requires Figma Desktop + Console MCP)
  npx designerpunk figma:extract   Extract design specs from Figma
  npx designerpunk --help          Show this help

Init options:
  --name <name>                    Product name (prompted if omitted)
  --abbreviation <abbr>            Short form (prompted if omitted)
  --skip-components                Don't copy starter components
  --skip-agents                    Don't copy agent templates

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
