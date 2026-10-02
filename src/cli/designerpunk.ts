#!/usr/bin/env node
/**
 * DesignerPunk Pipeline CLI
 *
 * Entry point for `npx designerpunk generate`, `mcp:app`, and `mcp:docs`.
 *
 * TypeScript execution: `tsx` is the sole runtime TS loader (Spec 118 Increment 3a
 * retired ts-node). The bin entry (bin/designerpunk.js) registers tsx before requiring
 * this module; spawned TS server entry points are run via the tsx runner (resolveTsRunner).
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
import { runAttach } from './attach';
import { runValidateProductTokens } from './validateProductTokens';
import { generateProductTokens } from './generateProductTokens';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import { isProductTokenStale, getProductTokenOutputPaths } from './staleness';
import { runSync, parseSyncArgs } from './sync';
import { resolvePackageRoot } from './shared/resolvePackageRoot';
import { findDesignSystemRoot } from './shared/bornRepo';
import {
  partialCaseMessage,
  componentTokenFamilyMismatchMessage,
  componentTokenFileLoadFailedMessage,
} from './shared/errorCatalog';
import { attachUsage } from './shared/vocabulary';

/** @internal Exported for testing — dispatch reachability (Spec 123 Task 16.2, instrument row 4.6). */
export async function main() {
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
    case 'attach':
      await runAttach(process.argv.slice(3));
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

/**
 * Resolve the component-schema scan root the token-index's consumer map reads
 * (Class C′, Spec 118 Task 9.5.2; Spec 123 U1 fix-up, 2026-09-26 —
 * `.kiro/issues/2026-09-26-product-server-component-root.md`'s sibling defect).
 *
 * Design intent, confirmed against requirements.md Req 3.5 (the tasks-round text):
 * "The Class C′ fixture SHALL be re-premised: it builds on the `src/components/core`
 * copy, which Requirement 19A removes ... It SHALL be re-authored to build the
 * consumer's component tree FROM NOTHING" — i.e. in a BORN repo, the consumer's own
 * (Model B) component tree is `<bornRoot>/src/components`, never `.../core` (Req
 * 19A.2 removes the `core` copy; Req 19A.6 creates `src/components/` directly,
 * empty). The consumer map SHALL therefore reflect THAT tree, not a path `init`
 * no longer writes to.
 *
 * Every other state (package-mode — including the steward repo's own dev-mode
 * classification — partial, unborn) is UNCHANGED: `<configDir>/src/components/core`,
 * exactly as before this fix. `generate` already refuses outright on `partial`
 * before this function is ever called (see the caller), so only 'born' and
 * 'package-mode'/'unborn' are live branches here in practice.
 *
 * Legacy `core/` level (born only): a pre-123 consumer who has not yet run
 * `sync --migrate-components` may still have real components nested at
 * `src/components/core/<Name>/` (the pre-123 copy layout). Mirrors
 * `ComponentIndexer.collectComponentSources`'s own precedence (Task 1.4): a
 * `core/` directory that is NOT itself a component dir but CONTAINS component
 * dirs is a legacy level, used only when the flat (post-123) root holds none.
 */
export function resolveComponentSchemaDir(
  dsRoot: Pick<import('./shared/bornRepo').DesignSystemRoot, 'state' | 'root'>,
  configDir: string,
): string {
  if (dsRoot.state !== 'born' || !dsRoot.root) {
    return path.resolve(configDir, 'src/components/core');
  }

  const isComponentDir = (dir: string): boolean => {
    try {
      const files = fs.readdirSync(dir);
      return files.some((f) => f.endsWith('.schema.yaml')) || files.includes('contracts.yaml');
    } catch {
      return false;
    }
  };
  const hasComponentDirs = (dir: string): boolean => {
    try {
      return fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .some((d) => isComponentDir(path.join(dir, d.name)));
    } catch {
      return false;
    }
  };

  const flatRoot = path.resolve(dsRoot.root, 'src/components');
  if (hasComponentDirs(flatRoot)) return flatRoot;

  const legacyRoot = path.join(flatRoot, 'core');
  if (!isComponentDir(legacyRoot) && hasComponentDirs(legacyRoot)) return legacyRoot;

  // Neither holds components yet (a freshly-born repo, README-only) — the flat
  // (post-123) convention is the correct root regardless; buildConsumerMap
  // returns an empty map for it, which is correct (no consumers to report).
  return flatRoot;
}

/**
 * The catalogued line for a component-token load failure. A
 * `ComponentTokenFileLoadError` (recognised by `name`, so it survives a mocked module)
 * names its file; the family-mismatch guard's message selects that row. Anything else
 * the harvest throws (e.g. a duplicate-name conflict) keeps the pipeline's existing
 * "System token generation failed" form — still one line, no stack.
 */
function componentTokenLoadFailureMessage(err: unknown, root: string): string {
  const e = err as { name?: unknown; file?: unknown; reason?: unknown; message?: unknown } | null;
  if (e && e.name === 'ComponentTokenFileLoadError' && typeof e.file === 'string' && typeof e.reason === 'string') {
    // Repo-relative with `/` separators — the catalog row keys its remedies on the path prefix.
    const rel = (path.relative(root, e.file) || e.file).split(path.sep).join('/');
    return /^Token family mismatch/.test(e.reason)
      ? componentTokenFamilyMismatchMessage(rel, e.reason)
      : componentTokenFileLoadFailedMessage(rel, e.reason);
  }
  return `System token generation failed: ${err instanceof Error ? err.message : String(err)}`;
}

/** @internal Exported for testing */
export async function runGenerate(force = false) {
  // Spec 123 Task 1.5 (C2 consumer #4): BOTH the read side (the config) and the
  // write side (token-index/ and platform output) anchor to the discovered ROOT —
  // never a bare process.cwd() — so `generate` behaves correctly from a
  // subdirectory of a born/package-mode repo, and REFUSES in a partial one rather
  // than guessing (all four partial sub-cases carry their own catalog string).
  const dsRoot = findDesignSystemRoot(process.cwd());
  if (dsRoot.state === 'partial' && dsRoot.partialCase) {
    console.error(`❌ ${partialCaseMessage(dsRoot.root ?? process.cwd(), dsRoot.partialCase, dsRoot.attemptedTokenSource)}`);
    process.exit(1);
    return;
  }
  const generateRoot = dsRoot.root ?? process.cwd();

  const config = await loadConfig(generateRoot);
  const tokens = resolveTokens(config);

  // Load component tokens from source presence (the convention dir
  // {tokenSourceRoot}/component/ and configured componentTokenDirs), regardless of
  // tokenSourceMode. Spec 117 R4: the prior `tokenSourceMode === 'local'` gate was the
  // wrong axis — componentTokenDirs resolve to real source files in BOTH modes, so
  // package-mode `generate` silently zeroed component tokens. Loading + the "none found"
  // warning are now driven by source presence, fired in all modes.
  // A component-token module that throws while it loads (e.g. defineComponentTokens's
  // family-mismatch guard on a pre-123 copied file) stops generate with a catalogued
  // message naming the file — never the CLI's "Unexpected error" stack trace
  // (.kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md).
  let componentTokens: ReturnType<typeof loadComponentTokens>;
  try {
    componentTokens = loadComponentTokens(config);
  } catch (err) {
    console.error(`❌ ${componentTokenLoadFailureMessage(err, generateRoot)}`);
    process.exit(1);
    return;
  }
  if (componentTokens.length === 0) {
    console.warn(
      `⚠️  No component token files found.\n` +
      `   Searched: ${path.relative(process.cwd(), config.tokenSourceRoot)}/component/\n` +
      `   And: ${config.componentTokenDirs.map(d => path.relative(process.cwd(), d)).join(', ') || '(none configured)'}\n` +
      `   Component token output will be empty.\n` +
      `   Run \`npx designerpunk init\` to copy component tokens locally.\n`
    );
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
    // Single shared mode resolution (Spec 117 Task 3): generateTokenFiles writes dist AND
    // returns the resolved truth; the index consumes the SAME object — no re-derivation.
    const modeResolved = generateTokenFiles(tokens, config);

    // Class C′ (Spec 118 Task 9.5.2, ratified default-only; U1 fix-up 2026-09-26 —
    // `.kiro/issues/2026-09-26-product-server-component-root.md`): resolve the
    // component-schema scan root from the consumer's config so the token-index's
    // consumer map reflects the consumer's design system — the same source the
    // application MCP reads. In a BORN repo that is `<bornRoot>/src/components`
    // (Req 19A.2/19A.6 — `init` no longer writes a `core/` copy); every other
    // state keeps `<configDir>/src/components/core` (the steward repo's own
    // package-mode classification is UNCHANGED). See `resolveComponentSchemaDir`
    // above. Resolved HERE (config + dsRoot in scope), passed into the generator,
    // which stays a pure function of its inputs.
    const componentSchemaDir = resolveComponentSchemaDir(dsRoot, config.configDir);

    // WRITE side anchored at generateRoot, never a bare process.cwd() (Spec 123 C2/Task 1.5).
    generateTokenIndex(path.resolve(generateRoot, 'token-index'), {
      primitiveTokens: tokens.primitiveTokens,
      semanticTokens: tokens.semanticTokens,
      componentTokens: ComponentTokenRegistry.getAll(),
      modeResolved,
      componentSchemaDir,
      // DD24: the live tier this index's data came from — written into
      // token-index/meta.json so the theme readers can follow it later,
      // wherever this index ends up being served from.
      tierDir: config.tokenSourceRoot,
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
  const pkgRoot = resolvePackageRoot(__dirname);
  const serverBundle = path.join(pkgRoot, 'dist/mcp/application-mcp.js');
  // CONSUMER-OWNED roots (COMPONENTS_DIR, TOKEN_INDEX_DIR) get NO runner default
  // (Spec 123 Task 1.3, design.md § "C3. The root-policy table as code" — the
  // Runner table's "Runner default: none" row). The server's own bootstrap now
  // resolves these itself via `findDesignSystemRoot` + the birth-aware resolvers
  // (`resolveComponentRoots` / `resolveTokenIndexRoot`), which know about
  // born/package-mode/partial/unborn — a hardcoded pkgRoot value here would
  // silently shadow that resolution (and any user-set env) forever.
  const patternsDir = path.join(pkgRoot, 'experience-patterns');
  const templatesDir = path.join(pkgRoot, 'layout-templates');
  const guidanceDir = path.join(pkgRoot, 'family-guidance');
  const registryPath = path.join(pkgRoot, 'family-registry.yaml');
  const designLanguagePath = path.join(pkgRoot, 'design-philosophy.yaml');

  console.error('DesignerPunk Application MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  // PACKAGE-OWNED roots keep their pkgRoot default (Runner table: "Runner
  // default: pkgRoot"). `spawnServer` still lets a user-set env value win.
  const envVars: Record<string, string> = {
    PATTERNS_DIR: patternsDir,
    TEMPLATES_DIR: templatesDir,
    GUIDANCE_DIR: guidanceDir,
    REGISTRY_PATH: registryPath,
  };
  if (fs.existsSync(designLanguagePath)) {
    envVars.DESIGN_LANGUAGE_PATH = designLanguagePath;
  }

  spawnServer(serverBundle, envVars, true);
}

async function runMcpDocs() {
  const pkgRoot = resolvePackageRoot(__dirname);
  const serverBundle = path.join(pkgRoot, 'dist/mcp/docs-mcp.js');
  const steeringDir = path.join(pkgRoot, 'governance');

  console.error('DesignerPunk Docs MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Data: ${steeringDir}`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  spawnServer(serverBundle, { MCP_STEERING_DIR: steeringDir }, true);
}

async function runMcpProduct() {
  const pkgRoot = resolvePackageRoot(__dirname);
  const serverBundle = path.join(pkgRoot, 'dist/mcp/product-mcp.js');

  console.error('DesignerPunk Product MCP');
  console.error(`  Protocol: stdio`);
  console.error(`  Server: ${serverBundle}`);
  console.error('  Starting...\n');

  // PRODUCT_DIR, COMPONENT_DIR and TOKEN_INDEX_DIR are all CONSUMER-OWNED roots
  // (Spec 123 Task 1.3): the runner sets NO default for any of them. The
  // server's own bootstrap resolves them via `findDesignSystemRoot` +
  // `resolveProductRoot` / `resolveComponentRoots` / `resolveTokenIndexRoot`.
  spawnServer(serverBundle, {}, true);
}

/**
 * Spawn a server as a child process. Uses node for bundled JS, tsx for TypeScript.
 *
 * Spec 123 Task 1.3 (C2 D-B3 / C3):
 * - **User-set data-root env wins**: `process.env` is spread AFTER `envVars`, so
 *   any data-root value the invoking shell/harness already set (e.g. a user's own
 *   `COMPONENTS_DIR`) is never shadowed by this runner's own defaults.
 * - **No `cwd` option is passed** — load-bearing: the spawned server's
 *   `process.cwd()` is whatever the launching harness set, and `findDesignSystemRoot`
 *   (C2) requires that inherited cwd to walk from the right place.
 *
 * @internal Exported for testing.
 */
export function spawnServer(entryPoint: string, envVars: Record<string, string>, bundled: boolean = false) {
  const runner = bundled ? 'node' : resolveTsRunner();

  const child = spawn(runner, [entryPoint], {
    env: { ...envVars, ...process.env },
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

/**
 * Resolve the runtime TypeScript runner for spawning TS server entry points.
 *
 * Spec 118 Increment 3a: tsx is the SOLE runtime TS mechanism — ts-node is fully
 * retired. The former ts-node fallback branch is pruned. tsx is a hard dependency
 * (package.json `dependencies`), so this should always resolve; the fail-loud error
 * is kept as a defensive guard in case the dependency tree is somehow broken.
 */
function resolveTsRunner(): string {
  try {
    require.resolve('tsx');
    return 'tsx';
  } catch {
    console.error('❌ tsx not found. Reinstall dependencies (tsx is a required dependency): npm install');
    process.exit(1);
  }
}

/** Run a figma CLI command by spawning the compiled JS file with remaining args. */
async function runFigmaCommand(script: 'figma-push' | 'figma-extract') {
  const pkgRoot = resolvePackageRoot(__dirname);
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
  await runSync({ ...parseSyncArgs(process.argv.slice(3)), projectRoot: process.cwd() });
}

/** @internal Exported for testing — the "attach never appears without its object" check (vocabulary.ts, Task 16.2). */
export function printHelp() {
  console.log(`
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk init            Bootstrap a new product repo
  npx designerpunk attach --target=<cc|kiro>              ${attachUsage()}
  npx designerpunk attach --target=<cc|kiro> --reference  MCP config + approvals only (no agents) — read DesignerPunk without becoming it
  npx designerpunk sync            Detect and apply package updates
  npx designerpunk sync --dry-run  Preview what sync would do (no changes)
  npx designerpunk sync --apply   Apply updates without the confirmation prompt (off a terminal)
  npx designerpunk sync --migrate-legacy  Remove an earlier init's copied agents/steering/governance, then ${attachUsage()} in the same run
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
  --target=<cc|kiro>               Harness to set up (agents + MCP config); default: the package's declared default
  --skip-agents                    Don't generate the agent layer

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

/** @internal Entry point for bin/designerpunk.js */
export const __main = () => {
  main().catch((err) => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  });
};

/* istanbul ignore next -- direct node execution (rare; bin/ is primary path) */
if (require.main === module) {
  __main();
}
