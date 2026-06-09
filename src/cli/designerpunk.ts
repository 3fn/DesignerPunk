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
import * as fs from 'fs';
import { spawn } from 'child_process';
import { loadConfig } from '../config/ConfigLoader';
import { generateTokenFiles } from '../generators/generateTokenFiles';
import { generateTokenIndex } from '../generators/generateTokenIndex';
import { resolveTokens } from './resolveTokens';
import { loadComponentTokens } from './loadComponentTokens';
import { runValidate } from './validate';
import { runInit } from './init';
import { runValidateProductTokens } from './validateProductTokens';
import { generateProductTokens } from './generateProductTokens';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import { computeThemeVaryingTokens } from './themeVarying';
import { isProductTokenStale, getProductTokenOutputPaths } from './staleness';
import { runSync } from './sync';

async function main() {
  const command = process.argv[2];
  const flags = process.argv.slice(3);

  switch (command) {
    case undefined:
    case 'generate':
      if (flags.includes('--product-only')) {
        await runProductOnly(flags.includes('--force'));
      } else {
        await runGenerate(flags.includes('--force'));
      }
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
    case 'sync':
      await runSyncCommand();
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

/** @internal Exported for testing */
export async function runGenerate(force = false) {
  const config = await loadConfig(process.cwd());
  const tokens = resolveTokens(config);

  // Load component tokens from local source when tokenSource is set
  if (config.tokenSourceMode === 'local') {
    const componentTokens = loadComponentTokens(config);
    if (componentTokens.length === 0) {
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

  let systemFailed = false;
  let productFailed = false;

  // --- System Pipeline ---
  try {
    generateTokenFiles(tokens, config);

    const themeVaryingTokens = computeThemeVaryingTokens(config, tokens.semanticTokens, tokens.primitiveTokens);

    generateTokenIndex(path.resolve(process.cwd(), 'token-index'), {
      primitiveTokens: tokens.primitiveTokens,
      semanticTokens: tokens.semanticTokens,
      componentTokens: ComponentTokenRegistry.getAll(),
      themeVaryingTokens,
    });
    console.log('✅ System tokens generated');
  } catch (err) {
    systemFailed = true;
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ System token generation failed: ${message}`);
  }

  // --- Product Pipeline (independent) ---
  if (config.productTokens) {
    try {
      if (!isProductTokenStale(config, force)) {
        const outputPaths = getProductTokenOutputPaths(config);
        const oldest = Math.min(...outputPaths.map(p => fs.statSync(p).mtimeMs));
        console.log(`⏭ Product tokens up-to-date (source unchanged since ${new Date(oldest).toLocaleString()})`);
      } else {
        if (force) console.log('🔄 Product tokens regenerated (--force)');
        generateProductTokens(config);
        console.log('✅ Product tokens generated');
      }
    } catch (err) {
      productFailed = true;
      const message = err instanceof Error ? err.message : String(err);
      console.error(`❌ Product token generation failed: ${message}`);
    }
  }

  // --- Status Summary ---
  if (systemFailed || productFailed) {
    console.log('');
    if (systemFailed && !productFailed) {
      console.log('💡 Tip: Use --product-only to skip system token generation');
    }
    process.exit(1);
  }
}

/** @internal Exported for testing */
export async function runProductOnly(force = false) {
  const config = await loadConfig(process.cwd());

  if (!config.productTokens) {
    console.error('❌ No productTokens configured. Nothing to generate.');
    process.exit(1);
    return;
  }

  const tokenIndexDir = path.resolve(process.cwd(), 'token-index');
  if (!fs.existsSync(tokenIndexDir)) {
    console.error('❌ token-index/ not found. Run `npx designerpunk generate` (full) first to create it.');
    process.exit(1);
    return;
  }

  if (!isProductTokenStale(config, force)) {
    const outputPaths = getProductTokenOutputPaths(config);
    const oldest = Math.min(...outputPaths.map(p => fs.statSync(p).mtimeMs));
    console.log(`⏭ Product tokens up-to-date (source unchanged since ${new Date(oldest).toLocaleString()})`);
    return;
  }

  try {
    if (force) console.log('🔄 Product tokens regenerated (--force)');
    generateProductTokens(config);
    console.log('✅ Product tokens generated');
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`❌ Product token generation failed: ${message}`);
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
  const designLanguagePath = path.join(pkgRoot, 'design-philosophy.yaml');

  console.error('DesignerPunk Application MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${componentsDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  const envVars: Record<string, string> = {
    COMPONENTS_DIR: componentsDir,
    PATTERNS_DIR: patternsDir,
    TEMPLATES_DIR: templatesDir,
    GUIDANCE_DIR: guidanceDir,
    REGISTRY_PATH: registryPath,
    TOKEN_INDEX_DIR: tokenIndexDir,
  };
  if (fs.existsSync(designLanguagePath)) {
    envVars.DESIGN_LANGUAGE_PATH = designLanguagePath;
  }

  spawnServer(serverBundle, envVars, true);
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
  const componentDir = path.join(pkgRoot, 'src/components/core');
  const tokenIndexDir = path.join(pkgRoot, 'token-index');

  console.error('DesignerPunk Product MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${productDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  spawnServer(serverBundle, {
    PRODUCT_DIR: productDir,
    COMPONENT_DIR: componentDir,
    TOKEN_INDEX_DIR: tokenIndexDir,
  }, true);
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

async function runSyncCommand() {
  const flags = process.argv.slice(3);
  await runSync({
    dryRun: flags.includes('--dry-run'),
    force: flags.includes('--force'),
    projectRoot: process.cwd(),
  });
}

function printHelp() {
  console.log(`
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk init            Bootstrap a new product repo
  npx designerpunk sync            Detect and apply package updates
  npx designerpunk sync --dry-run  Preview what sync would do (no changes)
  npx designerpunk sync --force    Apply all updates without prompting
  npx designerpunk generate        Generate token files from designerpunk.config.ts
  npx designerpunk generate --force              Regenerate all (skip staleness check)
  npx designerpunk generate --product-only       Skip system tokens, regenerate product only
  npx designerpunk generate --product-only --force  Force product regeneration
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

Generate options:
  --force                          Skip staleness detection, always regenerate
  --product-only                   Skip system token pipeline, use existing token-index

Configuration:
  Place a designerpunk.config.ts in your project root.
  See the DesignerPunk repo's designerpunk.config.ts for an example.

MCP servers resolve data paths from the installed package automatically.
No configuration needed for default usage.
`);
}

/* istanbul ignore next -- CLI entry point */
if (require.main === module) {
  main().catch((err) => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  });
}
