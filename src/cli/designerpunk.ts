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
import { generateTokenIndex, type TokenIndexResult } from '../generators/generateTokenIndex';
import { resolveTokens } from './resolveTokens';
import { loadComponentTokens, componentTokenSourceFile } from './loadComponentTokens';
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
import { resolveComponentRoots } from './shared/mcpDataRoots';
import { readPackageComponentTokenIndex, PACKAGE_COMPONENT_TOKEN_INDEX_REL } from './shared/packageComponentTokens';
import { ensurePersonalNote, printPersonalNoteRows, PERSONAL_NOTE_TEMPLATE_REL } from './shared/personalNote';
import {
  partialCaseMessage,
  componentTokenFamilyMismatchMessage,
  componentTokenFileLoadFailedMessage,
  consumerDegradationMessage,
  generateThemesLine,
  INSTALL_GUIDE_PATH,
  unresolvedSchemaTokensMessage,
  type UnresolvedSchemaTokenLine,
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
 * The component ROOT SET the token-index's consumer map reads (R1-7,
 * `.kiro/issues/2026-10-15-123-u5-instrument-findings.md`; ruling 2026-10-23 § 4).
 *
 * It is `resolveComponentRoots`, the resolver the Application MCP uses: the consumer's own
 * root (`<bornRoot>/src/components`) when born, then the package's `src/components/core`,
 * consumer first. The generator resolves the union through `resolveComponentSources`
 * (`./shared/componentSources`), the MCP's pass-1 rule: the legacy pre-123 `core/` level
 * under the consumer root, and a consumer component replacing a package component that
 * declares the same name. So `get_token_consumers` and `get_component_full` count the same
 * components. Before this, `generate` read only the consumer's own schemas (the retired
 * `resolveComponentSchemaDir`), and in a born repo DesignerPunk's own components were never
 * consumers.
 *
 * Package-mode and unborn get the package root alone, as the MCP does. In the steward repo
 * (package-mode at the package's own root) that is `<repo>/src/components/core`, as before.
 *
 * No env value: `COMPONENTS_DIR` is set for the MCP server process (the mcp-config
 * template sets it to `./src/components`, the born default), not for a shell running
 * `generate`. A repo whose MCP config points `COMPONENTS_DIR` elsewhere gets a consumer map
 * from `<bornRoot>/src/components`, not from that directory.
 */
export function resolveGenerateComponentRoots(
  dsRoot: import('./shared/bornRepo').DesignSystemRoot,
  packageRoot: string,
): string[] {
  return resolveComponentRoots({ dsRoot, packageRoot }).roots;
}

/**
 * What `generate` says about the schema token declarations it could not count (ruling
 * 2026-10-23 § 3c): a WARNING naming each one and whose schema it is in — never a failure;
 * the same check fails as a test in DesignerPunk's own repo.
 *
 * The one-line NOTE this used to print for DesignerPunk's own component tokens ("not in your
 * token index") is retired with shape (c): `generate` now merges those tokens from the
 * package's shipped index, so a DesignerPunk schema naming one resolves. One that still does
 * not (its defining component is one you replaced, and your copy does not define it) is
 * warned like any other name.
 *
 * @internal Exported for testing.
 */
export function schemaTokenReport(
  result: Pick<TokenIndexResult, 'componentRoots' | 'unresolved' | 'unreadable'>,
  packageRoot: string,
  generateRoot: string,
): { warning: string | null } {
  const packageComponentsRoot = path.resolve(packageRoot, 'src', 'components', 'core');
  const packageRank = result.componentRoots.indexOf(packageComponentsRoot);
  const ownerOf = (rank: number): 'yours' | 'designerpunk' => (rank === packageRank ? 'designerpunk' : 'yours');
  const rel = (p: string) => (path.relative(generateRoot, p) || p).split(path.sep).join('/');

  const lines: UnresolvedSchemaTokenLine[] = result.unresolved.map(r => ({
    owner: ownerOf(r.rank),
    component: r.component,
    file: rel(r.schemaPath),
    group: r.group,
    token: r.token,
  }));
  const unreadable = result.unreadable.map(u => ({ owner: ownerOf(u.rank), file: rel(u.schemaPath), reason: u.reason }));

  return {
    warning: lines.length > 0 || unreadable.length > 0 ? unresolvedSchemaTokensMessage(lines, unreadable) : null,
  };
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
    console.log(`   ${generateThemesLine(config.themes)}`);
  }
  console.log('');

  // The personal note (C26; Task 22.1, mechanism B): created from the template when absent — the joiner's
  // fresh clone has none — and only in a BORN repo (never the steward checkout or package mode). A creation
  // row, then PR-13's unignored-directory row; or, for an existing unfilled note, the warning — never both.
  const note = ensurePersonalNote({ root: generateRoot, pkgRoot: resolvePackageRoot(__dirname), dsState: dsRoot.state });
  if (note === 'template-missing') {
    console.warn(`⚠️  ${consumerDegradationMessage('personal-note template', PERSONAL_NOTE_TEMPLATE_REL, 'the personal note was not created')}`);
  } else {
    printPersonalNoteRows(note, generateRoot, 'created');
  }
  if (note === 'created' || note === 'unfilled') console.log('');

  let systemFailed = false;
  let productFailed = false;

  // --- System Pipeline ---
  try {
    // Single shared mode resolution (Spec 117 Task 3): generateTokenFiles writes dist AND
    // returns the resolved truth; the index consumes the SAME object — no re-derivation.
    const modeResolved = generateTokenFiles(tokens, config);

    // The component root set the consumer map reads: the consumer's components, then
    // DesignerPunk's, through the Application MCP's own resolver (R1-7; see
    // `resolveGenerateComponentRoots` above). Resolved HERE, passed into the generator,
    // which stays a pure function of its inputs.
    const packageRoot = resolvePackageRoot(__dirname);
    const componentSchemaDir = resolveGenerateComponentRoots(dsRoot, packageRoot);

    // Shape (c) (`.kiro/issues/2026-10-23-born-repo-index-lacks-package-component-tokens.md`):
    // in a consumer repo, DesignerPunk's own component tokens come into the index from the
    // installed package's shipped index, for every package component you have not replaced.
    // Never in DesignerPunk's own repo, whose index IS that shipped index.
    let packageComponentTokens: ReturnType<typeof readPackageComponentTokenIndex>['index'] = null;
    if (path.resolve(packageRoot) !== path.resolve(generateRoot)) {
      const shipped = readPackageComponentTokenIndex(packageRoot);
      packageComponentTokens = shipped.index;
      if (!shipped.index) {
        console.warn(`⚠️  ${consumerDegradationMessage(
          "DesignerPunk's token index",
          PACKAGE_COMPONENT_TOKEN_INDEX_REL,
          `${shipped.reason}; DesignerPunk's own component tokens (for example avatar.size.md) are not in your token index, so get_token_details does not find them`,
        )}\n`);
      }
    }
    const registered = ComponentTokenRegistry.getAll();

    // WRITE side anchored at generateRoot, never a bare process.cwd() (Spec 123 C2/Task 1.5).
    const indexResult = generateTokenIndex(path.resolve(generateRoot, 'token-index'), {
      primitiveTokens: tokens.primitiveTokens,
      semanticTokens: tokens.semanticTokens,
      componentTokens: registered,
      modeResolved,
      componentSchemaDir,
      componentTokenFiles: new Map(registered.map(t => [t.name, componentTokenSourceFile(t)])),
      ...(packageComponentTokens ? { packageComponentTokens } : {}),
      // DD24: the live tier this index's data came from — written into
      // token-index/meta.json so the theme readers can follow it later,
      // wherever this index ends up being served from.
      tierDir: config.tokenSourceRoot,
    });
    // Schema token names the index could not count: a warning, never a failure (§ 3c).
    if (indexResult) {
      const report = schemaTokenReport(indexResult, packageRoot, generateRoot);
      if (report.warning) console.warn(`⚠️  ${report.warning}\n`);
    }
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
    // The tip names `--product-only`, which only does something when product tokens are
    // configured (`runProductOnly` errors out otherwise) — so it is offered only then.
    if (systemFailed && !productFailed && config.productTokens) {
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
  --name <name>                    Product name (asked for in a terminal; required where no terminal is attached)
  --abbreviation <abbr>            Short form (asked for in a terminal; required where no terminal is attached)
  --target=<cc|kiro>               Harness to set up (agents + MCP config); default: the package's declared default
  --skip-agents                    Don't generate the agent layer
  --re-scaffold                    Re-add DesignerPunk's files in a repo that already has a design system (lists them first)
  --yes                            Confirm --re-scaffold without a prompt (required where no terminal is attached)

Generate options:
  --force                          Skip staleness detection, always regenerate
  --product-only                   Skip system token pipeline, use existing token-index

Configuration:
  Place a designerpunk.config.ts in your project root.
  See the DesignerPunk repo's designerpunk.config.ts for an example.

Install guide: ${INSTALL_GUIDE_PATH}

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
