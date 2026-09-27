/**
 * `npx designerpunk init` — the birth event (Spec 123, design.md C1).
 *
 * Under Model B, `init` runs ONCE per design system, ever. It copies the
 * consumer's token tier (their language, wholesale) and scaffolds the
 * consumer-owned component directory, config, test tooling, and both
 * harnesses' MCP configs. It REFUSES in a born, partial, or package-mode
 * repo (`--re-scaffold` overrides, listing every file it would re-add first).
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C1. The birth event"
 * @see .kiro/specs/123-consumer-distribution/design.md § "C4. Rewrite-at-copy"
 * @see .kiro/specs/123-consumer-distribution/design.md § "C27. `init` UX"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import * as readline from 'readline';
import { rewriteByResolution, UnmappedSpecifierError } from './shared/transforms';
import { resolvePackageRoot } from './shared/resolvePackageRoot';
import { readContractHash } from './sync/NameContract';
import { findDesignSystemRoot } from './shared/bornRepo';
import {
  initBornRepoMessage,
  packageModeIndexAbsentMessage,
  partialCaseMessage,
  restartLineSequencedMessage,
  cloneHatchMessage,
  personalNoteNamingMessage,
  jestConfigCollisionMessage,
} from './shared/errorCatalog';
import { scaffoldKiroMcpConfig } from './shared/mcpConfig/kiro';
import { scaffoldClaudeCodeMcpConfig } from './shared/mcpConfig/cc';
import { serializeManifest } from './sync/Manifest';
import type { DesignerPunkManifest } from './sync/Manifest';

interface InitOptions {
  name?: string;
  abbreviation?: string;
  skipComponents?: boolean;
  skipAgents?: boolean;
  reScaffold?: boolean;
  yes?: boolean;
}

/** Manifest entry origin (design.md's Manifest data model — C7). */
type ManifestOrigin = 'copy' | 'generated' | 'emitted-key';

interface ManifestEntry {
  hash: string;
  grain: 'file' | 'key';
  origin: ManifestOrigin;
}

/**
 * Accumulates manifest entries across every step, written LAST (design.md C1's
 * manifest row: "so no generated file lacks an entry"). Req 5.8: `src/tokens/**`
 * NEVER gets an entry — no baseline applies to the consumer's own language.
 */
export class ManifestBuilder {
  private entries: Record<string, ManifestEntry> = {};

  recordFile(relPath: string, absPath: string, origin: ManifestOrigin): void {
    if (relPath.split(path.sep).join('/').startsWith('src/tokens/')) {
      // Req 5.8 — no entry for the consumer's own copied token tier, ever.
      return;
    }
    const content = fs.readFileSync(absPath, 'utf-8');
    this.entries[relPath.split(path.sep).join('/')] = {
      hash: hashContent(content),
      grain: 'file',
      origin,
    };
  }

  recordKey(relPath: string, key: string, content: unknown): void {
    const keyPath = `${relPath.split(path.sep).join('/')}#${key}`;
    this.entries[keyPath] = {
      hash: hashContent(JSON.stringify(content)),
      grain: 'key',
      origin: 'emitted-key',
    };
  }

  build(installedVersion: string, contractHash = ''): Record<string, unknown> {
    return {
      version: '1',
      posture: 'born',
      installedVersion,
      // The installed package's type-contract hash (dist/name-contract.json
      // `typeContract.hash`, Spec 123 Task 6 / DD11) — '' only when the package
      // ships no contract, never a faked value.
      contractHash,
      attachedTargets: ['cc', 'kiro'],
      entries: this.entries,
    };
  }
}

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export async function runInit(argv: string[]): Promise<void> {
  const opts = parseInitArgs(argv);
  const dest = process.cwd();
  const pkgRoot = resolvePackageRoot(__dirname);
  const dsRoot = findDesignSystemRoot(dest);

  // --- Step 0: birth check (design.md C1 row 0; Req 15A.3) ---------------
  if (!opts.reScaffold) {
    if (dsRoot.state === 'born') {
      console.error(`❌ ${initBornRepoMessage(dsRoot.root ?? dest)}`);
      process.exit(1);
      return;
    }
    if (dsRoot.state === 'package-mode') {
      console.error(`❌ ${packageModeIndexAbsentMessage()}`);
      process.exit(1);
      return;
    }
    if (dsRoot.state === 'partial' && dsRoot.partialCase) {
      console.error(`❌ ${partialCaseMessage(dsRoot.root ?? dest, dsRoot.partialCase, dsRoot.attemptedTokenSource)}`);
      process.exit(1);
      return;
    }
    // unborn (or a consume-posture manifest, which C2 ignores) — proceed.
  } else {
    // --re-scaffold: list every file that would be RE-ADDED before writing
    // (Req 15A.3's flag: "resurrection is never silent even when chosen").
    const wouldReadd = previewReScaffold(pkgRoot, dest);
    if (wouldReadd.length > 0) {
      console.log(`--re-scaffold: the following files will be RE-ADDED (they do not exist in this repo today):`);
      for (const relPath of wouldReadd) {
        console.log(`  - ${relPath}`);
      }
      const confirmed = await confirmReScaffold(opts.yes ?? false);
      if (!confirmed) {
        console.log('Aborted — nothing was written.');
        return;
      }
    }
  }

  if (!opts.name) {
    opts.name = await prompt('Product name: ');
  }
  if (!opts.abbreviation) {
    opts.abbreviation = await prompt('Abbreviation: ');
  }

  if (!opts.name || !opts.abbreviation) {
    console.error('❌ Name and abbreviation are required.');
    process.exit(1);
    return;
  }

  const manifest = new ManifestBuilder();

  // No .npmrc scaffold: @3fn resolves from public npm (the primary registry,
  // ruled 2026-09-20). A scoped registry mapping here would silently pin every
  // consumer to GitHub Packages — see .kiro/issues/archive/2026-09-20-init-npmrc-registry-pin.md

  // --- Step 2: designerpunk.config.ts (KEPT; couplings re-pointed per 1.2) ---
  const configPath = path.join(dest, 'designerpunk.config.ts');
  const configCreated = createFileIfNotExists(
    configPath,
    generateConfig(opts.name, opts.abbreviation),
    'designerpunk.config.ts (dark + wcag themes registered)',
  );
  if (configCreated) manifest.recordFile('designerpunk.config.ts', configPath, 'generated');

  // --- Step 3: src/types — REMOVED (19A.3). Resolves via @3fn/core/types (C4). ---
  // (no copyDir call — see rewriteByResolution's mapping table, Task 2.1)

  // --- Step 3b: src/tokens (full tree) — KEPT + TRANSFORM (rewriteByResolution) ---
  // The boundary is the WHOLE copied tier (src/tokens) for BOTH 3b and 3c (C4;
  // Ada R2 pre-implementation fix) — never each copy step's own root.
  const tierRoot = path.join(pkgRoot, 'src', 'tokens');
  const tokensResult = copyDir(
    tierRoot,
    path.join(dest, 'src/tokens'),
    { exclude: ['__tests__', 'component'], transform: (content, srcAbsPath) => rewriteByResolution(content, srcAbsPath, tierRoot).content },
  );
  reportCopy('token source', tokensResult);

  // --- Step 3c: src/tokens/component — KEPT + TRANSFORM (same tier boundary) ---
  const componentTokensResult = copyDir(
    path.join(pkgRoot, 'src/tokens/component'),
    path.join(dest, 'src/tokens/component'),
    { exclude: ['__tests__'], transform: (content, srcAbsPath) => rewriteByResolution(content, srcAbsPath, tierRoot).content },
  );
  reportCopy('component tokens (token source)', componentTokensResult);

  // --- Step 4: src/components/core — REMOVED (Req 2's union replaces it) ---
  if (opts.skipComponents) {
    console.log('  note: --skip-components is a deprecated no-op — src/components/core is no longer copied (Requirement 2\'s component union replaces it).');
  }

  // --- Step 4′: consumer components dir — ADDED (Req 19A.6: created, empty) ---
  const consumerComponentsDir = path.join(dest, 'src/components');
  const consumerComponentsReadme = path.join(consumerComponentsDir, 'README.md');
  if (!fs.existsSync(consumerComponentsDir)) {
    fs.mkdirSync(consumerComponentsDir, { recursive: true });
  }
  const readmeCreated = createFileIfNotExists(
    consumerComponentsReadme,
    CONSUMER_COMPONENTS_README,
    'src/components/README.md',
  );
  if (readmeCreated) manifest.recordFile('src/components/README.md', consumerComponentsReadme, 'generated');

  // --- Step 5: product/overview.yaml — UNCHANGED in U1 (Task 22 replaces it) ---
  const overviewPath = path.join(dest, 'product/overview.yaml');
  const overviewCreated = createFileIfNotExists(
    overviewPath,
    generateOverview(opts.name),
    'product/overview.yaml',
  );
  if (overviewCreated) manifest.recordFile('product/overview.yaml', overviewPath, 'generated');

  // --- Step 6: agent templates — UNCHANGED in U1 (moves to Task 16's C20 generation) ---
  if (!opts.skipAgents) {
    const agentsDestRoot = path.join(dest, '.kiro/agents');
    const agentsResult = copyDir(
      path.join(pkgRoot, '.kiro/agents'),
      agentsDestRoot,
    );
    reportCopy('agent templates', agentsResult);
    recordCopiedTree(manifest, agentsDestRoot, dest);
  }

  // --- Step 7: steering docs — UNCHANGED in U1 (identity docs, Spec 119-A) ---
  const steeringDestRoot = path.join(dest, '.kiro/steering');
  const steeringResult = copyDir(
    path.join(pkgRoot, '.kiro/steering'),
    steeringDestRoot,
  );
  reportCopy('steering docs', steeringResult);
  recordCopiedTree(manifest, steeringDestRoot, dest);

  // --- Step 7b: governance docs — UNCHANGED in U1 (gate 4b removes this in a later task) ---
  const governanceDestRoot = path.join(dest, 'governance');
  const governanceResult = copyDir(
    path.join(pkgRoot, 'governance'),
    governanceDestRoot,
  );
  reportCopy('governance docs', governanceResult);
  recordCopiedTree(manifest, governanceDestRoot, dest);

  // --- Step 8: MCP config — BOTH targets emitted in U1 (C8; --target arrives Task 16) ---
  // Task 4: the template is read ONCE here (structural connection info — command/
  // args/env — for all three servers, incl. designerpunk-product); each target's
  // emitter (src/cli/shared/mcpConfig/{kiro,cc}.ts) generates its own approval
  // list from dist/mcp/tool-manifest.json's readOnlyHint annotations.
  const mcpTemplate = readMcpTemplate(path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template'));
  if (mcpTemplate) {
    scaffoldKiroMcpConfig(
      mcpTemplate,
      path.join(dest, '.kiro/settings/mcp.json'),
      manifest,
      dest,
      pkgRoot,
    );
    scaffoldClaudeCodeMcpConfig(
      mcpTemplate,
      dest,
      manifest,
      pkgRoot,
    );
  }

  // --- Step 9: test configuration — KEPT, purpose stated (C27 A13) ---
  const jestConfigPath = path.join(dest, 'jest.config.js');
  const jestConfigCreated = createFileIfNotExists(
    jestConfigPath,
    `module.exports = {\n  ...require('@3fn/core/jest-preset'),\n  roots: ['<rootDir>/src'],\n};\n`,
    'jest.config.js',
    jestConfigCollisionMessage(),
  );
  if (jestConfigCreated) manifest.recordFile('jest.config.js', jestConfigPath, 'generated');

  // No `paths` overrides: subpath types resolve through the package exports map
  // to compiled dist d.ts (Spec 118). Re-pinning them to raw src/ undoes the
  // package's own resolution contract — see
  // .kiro/issues/archive/2026-09-20-init-tsconfig-src-repin.md
  const tsconfigTestPath = path.join(dest, 'tsconfig.test.json');
  const tsconfigTestCreated = createFileIfNotExists(
    tsconfigTestPath,
    JSON.stringify({
      compilerOptions: {
        target: 'ES2020',
        // Spec 123 Task 2.5: `node16` resolves `@3fn/core/*` subpaths through
        // the package's `exports` map (`bundler` would too, but requires
        // `module` >= es2015/preserve — TS5095 — which would make ts-jest's
        // runtime transform (jest-preset.ts reads THIS tsconfig) emit ESM
        // `import`/`export`, which Jest's default CommonJS module system
        // cannot execute). `node16`, unlike plain `commonjs`, understands
        // `exports` maps while still emitting CommonJS for a package with no
        // `"type": "module"` (verified: a `.ts` file compiles to `"use
        // strict"; Object.defineProperty(exports, ...)`).
        module: 'node16',
        moduleResolution: 'node16',
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        downlevelIteration: true,
        types: ['jest', 'node'],
      },
      include: ['src/**/*'],
    }, null, 2) + '\n',
    'tsconfig.test.json',
  );
  if (tsconfigTestCreated) manifest.recordFile('tsconfig.test.json', tsconfigTestPath, 'generated');

  // --- Step 10: .designerpunkignore — UNCHANGED in U1 (comment updated at Task 16) ---
  const ignorePath = path.join(dest, '.designerpunkignore');
  const ignoreCreated = createFileIfNotExists(
    ignorePath,
    `# DesignerPunk Sync Ignore
# Files listed here are never touched by \`npx designerpunk sync\`.
# Uses .gitignore syntax: globs, exact paths, # comments.

# Example: keep a custom agent prompt
# .kiro/agents/custom-agent.md
`,
    '.designerpunkignore',
  );
  if (ignoreCreated) manifest.recordFile('.designerpunkignore', ignorePath, 'generated');

  // --- Manifest — written LAST (design.md C1's manifest row) ---------------
  const installedVersion = readPackageVersion(pkgRoot);
  const manifestPath = path.join(dest, 'designerpunk.manifest.json');
  // Serialized by sync's manifest writer (stable order, one entry per line — C7), so the first sync does not rewrite it.
  fs.writeFileSync(manifestPath, serializeManifest(manifest.build(installedVersion, readContractHash(pkgRoot)) as unknown as DesignerPunkManifest), 'utf-8');
  console.log('✓ Created designerpunk.manifest.json');

  // --- Next steps (C27 erratum; Req 15.8, 15.9, 19.6) ----------------------
  printNextSteps(opts.name);
}

/** The U1 terminal output — every line true of what U1's `init` actually did, with the sequenced restart row printed LAST (C27 erratum, Le-T5). */
function printNextSteps(name: string): void {
  console.log(`
Your product "${name}" is ready.

Next steps:
  1. npm install
  2. npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom
  3. npx designerpunk generate

To customize your visual language:
  • Edit src/tokens/ to change base values and design intent
  • Run \`npx designerpunk generate\` after changes

Note: Token values have mathematical relationships (modular scale,
baseline grid). The validator will warn if changes break these
relationships during generation.

💡 After future upgrades, run \`npx designerpunk sync\` to apply updates.

${cloneHatchMessage()}

${personalNoteNamingMessage()}

${restartLineSequencedMessage()}
`);
}

function parseInitArgs(argv: string[]): InitOptions {
  const opts: InitOptions = {};
  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--name':
        opts.name = argv[++i];
        break;
      case '--abbreviation':
        opts.abbreviation = argv[++i];
        break;
      case '--skip-components':
        opts.skipComponents = true;
        break;
      case '--skip-agents':
        opts.skipAgents = true;
        break;
      case '--re-scaffold':
        opts.reScaffold = true;
        break;
      case '--yes':
        opts.yes = true;
        break;
    }
  }
  return opts;
}

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Ask for confirmation before a `--re-scaffold` write. On a TTY, prompts
 * interactively. Off a TTY, requires `--yes` (Req 15A.3's flag semantics).
 */
async function confirmReScaffold(yesFlag: boolean): Promise<boolean> {
  if (!process.stdin.isTTY) {
    return yesFlag;
  }
  const answer = await prompt('Proceed and re-add the files listed above? [y/N] ');
  return /^y(es)?$/i.test(answer);
}

/** Every managed root `init` copies from, for the `--re-scaffold` preview (agents/steering/governance + the token tree). */
function copiedRoots(pkgRoot: string): Array<{ src: string; dest: string; exclude?: string[] }> {
  return [
    { src: path.join(pkgRoot, 'src/tokens'), dest: 'src/tokens', exclude: ['__tests__'] },
    { src: path.join(pkgRoot, '.kiro/agents'), dest: '.kiro/agents' },
    { src: path.join(pkgRoot, '.kiro/steering'), dest: '.kiro/steering' },
    { src: path.join(pkgRoot, 'governance'), dest: 'governance' },
  ];
}

/** List every file `init --re-scaffold` would (re-)add — i.e. every source file currently missing at its destination. Never mutates the filesystem. */
function previewReScaffold(pkgRoot: string, dest: string): string[] {
  const missing: string[] = [];
  for (const root of copiedRoots(pkgRoot)) {
    if (!fs.existsSync(root.src)) continue;
    walkMissing(root.src, path.join(dest, root.dest), root.exclude ?? [], missing, dest);
  }
  const scaffoldFiles = [
    'designerpunk.config.ts',
    'product/overview.yaml',
    'jest.config.js',
    'tsconfig.test.json',
    '.designerpunkignore',
    'src/components/README.md',
  ];
  for (const relPath of scaffoldFiles) {
    if (!fs.existsSync(path.join(dest, relPath))) {
      missing.push(relPath);
    }
  }
  return missing;
}

function walkMissing(src: string, dest: string, exclude: string[], out: string[], destRoot: string): void {
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (exclude.includes(entry.name)) continue;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      walkMissing(srcPath, destPath, exclude, out, destRoot);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        out.push(path.relative(destRoot, destPath));
      }
    }
  }
}

/** Record every file under a copied directory tree into the manifest with `origin: 'copy'`. */
function recordCopiedTree(manifest: ManifestBuilder, destRoot: string, repoRoot: string): void {
  if (!fs.existsSync(destRoot)) return;
  for (const entry of fs.readdirSync(destRoot, { withFileTypes: true })) {
    const full = path.join(destRoot, entry.name);
    if (entry.isDirectory()) {
      recordCopiedTree(manifest, full, repoRoot);
    } else if (entry.isFile()) {
      manifest.recordFile(path.relative(repoRoot, full), full, 'copy');
    }
  }
}

function readPackageVersion(pkgRoot: string): string {
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf-8'));
    return typeof pkgJson.version === 'string' ? pkgJson.version : 'unknown';
  } catch {
    return 'unknown';
  }
}

const CONSUMER_COMPONENTS_README = `# Your Components

This directory is yours. Components you add here appear ALONGSIDE
DesignerPunk's ecosystem components — never instead of them. A component
you add with the same name as one of DesignerPunk's wins on that name
(your fork), and everything else keeps coming from the package.

DesignerPunk's own components are consumed by name via \`npm update\` —
they are not copied here. See the install doc's "Your first component"
section for the merge model.
`;

function createFileIfNotExists(filePath: string, content: string, label: string, collisionMessage?: string): boolean {
  if (fs.existsSync(filePath)) {
    console.log(collisionMessage ? `  ${collisionMessage}` : `  skipped: ${label} (already exists)`);
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Created ${label}`);
  return true;
}

interface CopyOptions {
  exclude?: string[];
  /** Optional transform applied to file content (only .ts files) before writing. Receives the SOURCE file's absolute path (Task 2.1: rewriteByResolution resolves specifiers against it). May throw UnmappedSpecifierError. */
  transform?: (content: string, srcAbsPath: string) => string;
}

/**
 * Result of a copyDir operation.
 *
 * NOTE: The summary output format emitted by `reportCopy()` below is part of
 * Gap 3's public behavior — asserted by the integration test at
 * `src/cli/__tests__/init.test.ts`. Intentional format changes can update
 * the assertion alongside the code; the contract catches unintended drift,
 * not wording freezes.
 */
interface CopyResult {
  added: number;
  skipped: number;
  skippedFiles: string[]; // Tracked up to 10; used for per-file output when count is small
  warnings: string[];
}

const SKIPPED_FILE_LIST_THRESHOLD = 10;

/**
 * Recursively copy `src` → `dest` in merge mode.
 *
 * Semantics:
 * - If a destination file already exists, it is NEVER overwritten (consumer edits
 *   are preserved).
 * - Files whose basename matches `opts.exclude` are skipped entirely.
 * - Missing destination directories are created as needed.
 * - Returns counts of added and skipped files for caller-side summary.
 *
 * An `UnmappedSpecifierError` thrown by `opts.transform` propagates OUT of this
 * function — the copy fails loudly (design.md C4) rather than writing a
 * silently-broken file.
 *
 * This replaces the previous directory-level skip behavior (Spec 102 Gap 3):
 * a pre-existing destination directory no longer blocks the copy; individual
 * file collisions are handled instead.
 */
function copyDir(src: string, dest: string, opts?: CopyOptions): CopyResult {
  const result: CopyResult = { added: 0, skipped: 0, skippedFiles: [], warnings: [] };

  if (!fs.existsSync(src)) {
    result.warnings.push(`source not found: ${src}`);
    return result;
  }

  copyDirRecursive(src, dest, opts, result);
  return result;
}

function copyDirRecursive(
  src: string,
  dest: string,
  opts: CopyOptions | undefined,
  result: CopyResult,
): void {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const basename = entry.name;
    if (opts?.exclude?.includes(basename)) continue;

    const srcPath = path.join(src, basename);
    const destPath = path.join(dest, basename);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath, opts, result);
    } else if (entry.isFile()) {
      if (fs.existsSync(destPath)) {
        result.skipped++;
        if (result.skippedFiles.length < SKIPPED_FILE_LIST_THRESHOLD) {
          result.skippedFiles.push(path.relative(process.cwd(), destPath));
        }
      } else {
        if (opts?.transform && basename.endsWith('.ts')) {
          const content = fs.readFileSync(srcPath, 'utf-8');
          fs.writeFileSync(destPath, opts.transform(content, srcPath), 'utf-8');
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
        result.added++;
      }
    }
  }
}

/**
 * Emit the summary output for a copyDir operation.
 * See CopyResult's NOTE about integration-test contract on output format.
 */
function reportCopy(label: string, result: CopyResult): void {
  for (const warning of result.warnings) {
    console.log(`  warning: ${warning}`);
  }

  if (result.added === 0 && result.skipped === 0) return;

  const parts: string[] = [];
  if (result.added > 0) {
    parts.push(`${result.added} new file${result.added === 1 ? '' : 's'}`);
  }
  if (result.skipped > 0) {
    parts.push(
      `${result.skipped} existing file${result.skipped === 1 ? '' : 's'} preserved`,
    );
  }
  console.log(`✓ ${label}: ${parts.join(', ')}`);

  // Per-file list only when skipped count is small — avoids log flood on large merges
  if (result.skipped > 0 && result.skipped <= SKIPPED_FILE_LIST_THRESHOLD) {
    for (const file of result.skippedFiles) {
      console.log(`    preserved: ${file}`);
    }
  }
}

function readMcpTemplate(templatePath: string): { mcpServers: Record<string, any> } | null {
  if (!fs.existsSync(templatePath)) {
    console.log(`  warning: MCP config template not found at ${templatePath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  } catch {
    console.log(`  warning: MCP config template at ${templatePath} is not valid JSON`);
    return null;
  }
}

function generateConfig(name: string, abbreviation: string): string {
  return `import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: '${name}',
  abbreviation: '${abbreviation}',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components', './src/tokens/component'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  output: './dist/tokens',
});
`;
}

function generateOverview(name: string): string {
  return `# ${name} — Product Overview

## Product Context
name: ${name}
description: "[CUSTOMIZE] Describe your product"
domain: "[CUSTOMIZE] Your product domain"

## Principles
- "[CUSTOMIZE] Add your design principles"

## Platform Status
web: not-started
ios: not-started
android: not-started
`;
}

// Re-exported for tests and for future callers that need the same refusal
// classification `runInit` uses at step 0.
export { UnmappedSpecifierError };
