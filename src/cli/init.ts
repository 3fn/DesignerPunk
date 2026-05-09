/**
 * `npx designerpunk init` — Bootstrap a self-contained product repo.
 *
 * Copies tokens, components, themes, agents, and steering docs from the
 * DesignerPunk source into the current directory. Creates a designerpunk.config.ts
 * with theme registration. Products evolve independently after init.
 *
 * @see .kiro/specs/097-product-mcp-intelligence-layer/cli-init-design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

interface InitOptions {
  name?: string;
  abbreviation?: string;
  skipComponents?: boolean;
  skipAgents?: boolean;
}

export async function runInit(argv: string[]): Promise<void> {
  const opts = parseInitArgs(argv);

  if (!opts.name) {
    opts.name = await prompt('Product name: ');
  }
  if (!opts.abbreviation) {
    opts.abbreviation = await prompt('Abbreviation: ');
  }

  if (!opts.name || !opts.abbreviation) {
    console.error('❌ Name and abbreviation are required.');
    process.exit(1);
  }

  const pkgRoot = resolvePackageRoot();
  const dest = process.cwd();

  // 1. .npmrc
  createFileIfNotExists(
    path.join(dest, '.npmrc'),
    '@3fn:registry=https://npm.pkg.github.com\n',
    '.npmrc',
  );

  // 2. designerpunk.config.ts
  createFileIfNotExists(
    path.join(dest, 'designerpunk.config.ts'),
    generateConfig(opts.name, opts.abbreviation),
    'designerpunk.config.ts (dark + wcag themes registered)',
  );

  // 3. Token source (rewrite relative type imports to package imports)
  const tokensResult = copyDir(
    path.join(pkgRoot, 'src/tokens'),
    path.join(dest, 'src/tokens'),
    { exclude: ['__tests__'], transform: rewriteTypeImports },
  );
  reportCopy('token source', tokensResult);

  // 4. Components
  if (!opts.skipComponents) {
    const compResult = copyDir(
      path.join(pkgRoot, 'src/components/core'),
      path.join(dest, 'src/components/core'),
      { exclude: ['__tests__'] },
    );
    reportCopy('starter components', compResult);
  }

  // 5. product/overview.yaml
  createFileIfNotExists(
    path.join(dest, 'product/overview.yaml'),
    generateOverview(opts.name),
    'product/overview.yaml',
  );

  // 6. Agent templates
  if (!opts.skipAgents) {
    const agentsResult = copyDir(
      path.join(pkgRoot, '.kiro/agents'),
      path.join(dest, '.kiro/agents'),
    );
    reportCopy('agent templates', agentsResult);
  }

  // 7. Steering docs
  const steeringResult = copyDir(
    path.join(pkgRoot, '.kiro/steering'),
    path.join(dest, '.kiro/steering'),
  );
  reportCopy('steering docs', steeringResult);

  // 8. .kiro/settings/mcp.json — scaffold MCP config from canonical template
  scaffoldMcpConfig(
    path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template'),
    path.join(dest, '.kiro/settings/mcp.json'),
  );

  // 9. Next steps
  console.log(`
Your product "${opts.name}" is ready.

Next steps:
  1. Set GITHUB_TOKEN env var (read:packages scope)
  2. npm install                    # Install dependencies
  3. npx designerpunk generate      # Generate platform tokens
  4. npx designerpunk mcp:app       # Start component queries

To customize your visual language:
  • Edit src/tokens/ to change base values and design intent
  • Run \`npx designerpunk generate\` after changes

Note: Token values have mathematical relationships (modular scale,
baseline grid). The validator will warn if changes break these
relationships during generation.
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

function resolvePackageRoot(): string {
  const fromCli = path.resolve(__dirname, '../..');
  if (fs.existsSync(path.join(fromCli, 'package.json'))) {
    return fromCli;
  }
  return process.cwd();
}

function createFileIfNotExists(filePath: string, content: string, label: string): void {
  if (fs.existsSync(filePath)) {
    console.log(`  skipped: ${label} (already exists)`);
    return;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✓ Created ${label}`);
}

interface CopyOptions {
  exclude?: string[];
  /** Optional transform applied to file content (only .ts files) before writing. */
  transform?: (content: string) => string;
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
          fs.writeFileSync(destPath, opts.transform(content), 'utf-8');
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

/**
 * Scaffold `.kiro/settings/mcp.json` from the canonical template (Spec 102 Gap 5).
 *
 * Three behaviors depending on destination state:
 *
 * 1. **Destination doesn't exist** → create from template verbatim. Consumers
 *    get DesignerPunk's two MCP entries (`designerpunk-docs`, `designerpunk-application`)
 *    with full autoApprove arrays and direct-node invocation paths.
 *
 * 2. **Destination exists, neither DesignerPunk entry present** → merge: add
 *    the two DesignerPunk entries to the existing `mcpServers` object, preserving
 *    any other consumer-configured MCPs.
 *
 * 3. **Destination exists, one or both DesignerPunk entries already present** →
 *    skip the conflicting entries with a prominent warning. Don't overwrite —
 *    consumer customizations are sacred. Any NOT-yet-present DesignerPunk entry
 *    is still added (partial merge).
 *
 * NOTE: The output format emitted here is part of Gap 5's public behavior —
 * asserted by the integration test at `src/cli/__tests__/init.test.ts`.
 */
function scaffoldMcpConfig(templatePath: string, destPath: string): void {
  if (!fs.existsSync(templatePath)) {
    console.log(`  warning: MCP config template not found at ${templatePath}`);
    return;
  }

  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  let template: { mcpServers: Record<string, unknown> };
  try {
    template = JSON.parse(templateContent);
  } catch {
    console.log(`  warning: MCP config template at ${templatePath} is not valid JSON`);
    return;
  }

  // Case 1: destination doesn't exist — create from template verbatim
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, templateContent, 'utf-8');
    const keys = Object.keys(template.mcpServers).join(' + ');
    console.log(`✓ Created .kiro/settings/mcp.json (${keys})`);
    return;
  }

  // Cases 2 + 3: destination exists — merge carefully
  let existingRaw: string;
  let existing: { mcpServers?: Record<string, unknown>; [key: string]: unknown };
  try {
    existingRaw = fs.readFileSync(destPath, 'utf-8');
    existing = JSON.parse(existingRaw);
  } catch {
    console.log(
      `  warning: .kiro/settings/mcp.json exists but is not valid JSON; leaving unchanged`,
    );
    return;
  }

  if (!existing.mcpServers || typeof existing.mcpServers !== 'object') {
    existing.mcpServers = {};
  }

  const added: string[] = [];
  const skipped: string[] = [];

  for (const [key, value] of Object.entries(template.mcpServers)) {
    if (key in (existing.mcpServers as Record<string, unknown>)) {
      skipped.push(key);
    } else {
      (existing.mcpServers as Record<string, unknown>)[key] = value;
      added.push(key);
    }
  }

  if (added.length > 0) {
    fs.writeFileSync(destPath, JSON.stringify(existing, null, 2) + '\n', 'utf-8');
    console.log(`✓ .kiro/settings/mcp.json: added ${added.join(' + ')}`);
  } else if (skipped.length === Object.keys(template.mcpServers).length) {
    console.log(
      `  skipped: .kiro/settings/mcp.json (all DesignerPunk entries already present)`,
    );
  }

  for (const key of skipped) {
    console.log(
      `  ⚠️  .kiro/settings/mcp.json already has '${key}' entry; left unchanged. If outdated, delete the entry and re-run init, or update manually.`,
    );
  }
}

/**
 * Rewrite relative type imports to use the @3fn/core/types package subpath.
 * Converts: import { X } from '../types/PrimitiveToken'
 * To:       import { X } from '@3fn/core/types'
 *
 * Also handles deeper relative paths (../../types/...) and type-only imports.
 */
function rewriteTypeImports(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/(?:\.\.\/)*types\/[^'"]*['"]/g,
    `from '@3fn/core/types'`
  );
}

function generateConfig(name: string, abbreviation: string): string {
  return `import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: '${name}',
  abbreviation: '${abbreviation}',
  componentTokens: ['./src/components'],
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
