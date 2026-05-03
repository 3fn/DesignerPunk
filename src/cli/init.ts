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
    '@designerpunk:registry=https://npm.pkg.github.com\n',
    '.npmrc',
  );

  // 2. designerpunk.config.ts
  createFileIfNotExists(
    path.join(dest, 'designerpunk.config.ts'),
    generateConfig(opts.name, opts.abbreviation),
    'designerpunk.config.ts (dark + wcag themes registered)',
  );

  // 3. Token source
  const tokensCopied = copyDir(
    path.join(pkgRoot, 'src/tokens'),
    path.join(dest, 'src/tokens'),
    { exclude: ['__tests__'] },
  );
  if (tokensCopied) console.log('✓ Copied token source');

  // 4. Components
  if (!opts.skipComponents) {
    const compCopied = copyDir(
      path.join(pkgRoot, 'src/components/core'),
      path.join(dest, 'src/components/core'),
      { exclude: ['__tests__'] },
    );
    if (compCopied) console.log('✓ Copied starter components');
  }

  // 5. product/overview.yaml
  createFileIfNotExists(
    path.join(dest, 'product/overview.yaml'),
    generateOverview(opts.name),
    'product/overview.yaml',
  );

  // 6. Agent templates
  if (!opts.skipAgents) {
    const agentsCopied = copyDir(
      path.join(pkgRoot, '.kiro/agents'),
      path.join(dest, '.kiro/agents'),
    );
    if (agentsCopied) console.log('✓ Copied agent templates');
  }

  // 7. Steering docs
  const steeringCopied = copyDir(
    path.join(pkgRoot, '.kiro/steering'),
    path.join(dest, '.kiro/steering'),
  );
  if (steeringCopied) console.log('✓ Copied steering docs');

  // 8. Next steps
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
}

function copyDir(src: string, dest: string, opts?: CopyOptions): boolean {
  if (!fs.existsSync(src)) {
    console.error(`  warning: source not found: ${src}`);
    return false;
  }
  if (fs.existsSync(dest)) {
    console.log(`  skipped: ${path.relative(process.cwd(), dest)} (already exists)`);
    return false;
  }
  fs.cpSync(src, dest, {
    recursive: true,
    filter: (source) => {
      if (!opts?.exclude) return true;
      const basename = path.basename(source);
      return !opts.exclude.includes(basename);
    },
  });
  return true;
}

function generateConfig(name: string, abbreviation: string): string {
  return `import { defineConfig } from '@designerpunk/core/config';
import { darkOverrides } from './src/tokens/themes/dark/SemanticOverrides';
import { wcagOverrides } from './src/tokens/themes/wcag/SemanticOverrides';

export default defineConfig({
  name: '${name}',
  abbreviation: '${abbreviation}',
  tokenSourceRoot: './src/tokens',
  componentTokens: ['./src/components'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagOverrides },
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
