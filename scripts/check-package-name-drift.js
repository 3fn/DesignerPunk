#!/usr/bin/env node

/**
 * Package Name Drift Detection
 *
 * Scans authoritative surfaces for scoped package references that don't match
 * the scope declared in package.json. Exits non-zero if drift is detected.
 *
 * Surfaces scanned (per Spec 101 design-outline):
 *   - .kiro/steering/   — steering docs (Civitas-governed)
 *   - src/              — functional source code and component READMEs
 *   - product-template/ — consumer-facing agent prompts
 *   - .kiro/agents/     — local development agent prompts
 *   - dist/             — build artifacts (skipping sourcemaps)
 *
 * Pattern matched: @<scope>/(core|tokens|components)
 * Drift is any match where <scope> differs from package.json's scope.
 *
 * Sourcemaps (*.js.map, *.map) are excluded — sourcemaps embed source content
 * and would false-positive on any legitimate reference in committed sources.
 *
 * Usage:
 *   node scripts/check-package-name-drift.js
 *   npm run check:drift  (if wired into scripts)
 *
 * Exit codes:
 *   0 — no drift (all references match package.json scope)
 *   1 — drift detected (report printed to stdout, details to stderr)
 *   2 — script error (missing package.json, unreadable files, etc.)
 *
 * @see .kiro/specs/101-package-publish-readiness/design-outline.md § "Scope > In scope" item 7
 * @see .kiro/specs/101-package-publish-readiness/tasks.md § "1.7"
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bold: '\x1b[1m',
};

/**
 * Directories to scan for drift. Paths relative to repo root.
 */
const SCAN_DIRS = [
  '.kiro/steering',
  'src',
  'product-template',
  '.kiro/agents',
  'dist',
];

/**
 * File extensions to exclude. Sourcemaps embed source content and would
 * false-positive on any legitimate reference in committed sources.
 */
const EXCLUDED_EXTENSIONS = ['.map'];

/**
 * Package names to scan for. These are the scoped package identifiers
 * that the current architecture publishes (or historically referenced).
 * New subpackages should be added here if they're ever introduced.
 *
 * `core` — current published package
 * `tokens`, `components`, `build` — historical multi-package scaffolding
 *   (Spec 095 consolidated to single-package `core`; these are caught to
 *   prevent new references from creeping back in)
 */
const PACKAGE_NAMES = ['core', 'tokens', 'components', 'build'];

/**
 * Pattern: @<scope>/<pkg-name>[/<subpath>]
 *
 * Matches any scoped reference to one of the known package names, regardless
 * of what the scope is. The script then compares the matched scope against
 * the expected scope from package.json.
 *
 * Capture groups:
 *   1. scope (without @)
 *   2. package name (core | tokens | components)
 */
const SCOPE_PATTERN = new RegExp(
  `@([a-z0-9][a-z0-9-]*)/(${PACKAGE_NAMES.join('|')})(?=[/"'\\s\`,;:)\\]}]|$)`,
  'g',
);

/**
 * Read the expected scope from package.json.
 * Returns the scope without the leading @ (e.g., '3fn' from '@3fn/core').
 */
function getExpectedScope(repoRoot) {
  const pkgPath = path.join(repoRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error(`${colors.red}✗ package.json not found at ${pkgPath}${colors.reset}`);
    process.exit(2);
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  if (!pkg.name) {
    console.error(`${colors.red}✗ package.json has no "name" field${colors.reset}`);
    process.exit(2);
  }

  const match = pkg.name.match(/^@([a-z0-9][a-z0-9-]*)\//);
  if (!match) {
    console.error(
      `${colors.red}✗ package.json "name" (${pkg.name}) is not a scoped package — drift detection requires a scoped name${colors.reset}`,
    );
    process.exit(2);
  }

  return match[1];
}

/**
 * Recursively walk a directory, yielding file paths.
 * Skips directories that don't exist (scan surfaces may be optional).
 */
function* walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(full);
    } else if (entry.isFile()) {
      // Skip excluded extensions (sourcemaps)
      const ext = path.extname(entry.name);
      if (EXCLUDED_EXTENSIONS.includes(ext)) continue;
      // Skip *.js.map explicitly in case .map wasn't caught (defensive)
      if (entry.name.endsWith('.js.map')) continue;

      yield full;
    }
  }
}

/**
 * Scan a file for scoped package references that don't match the expected scope.
 * Returns an array of { file, line, lineText, matchedScope, matchedPackage } drift entries.
 */
function scanFile(filePath, expectedScope, repoRoot) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    // Binary files or permission errors — skip silently
    return [];
  }

  const drift = [];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Reset lastIndex for global regex reuse across lines
    SCOPE_PATTERN.lastIndex = 0;
    let match;
    while ((match = SCOPE_PATTERN.exec(line)) !== null) {
      const [, scope, pkgName] = match;
      if (scope !== expectedScope) {
        drift.push({
          file: path.relative(repoRoot, filePath),
          line: i + 1,
          lineText: line.trim(),
          matchedScope: scope,
          matchedPackage: pkgName,
          fullMatch: match[0],
        });
      }
    }
  }
  return drift;
}

/**
 * Format a single drift entry for console output.
 */
function formatDrift(entry, expectedScope) {
  const snippet =
    entry.lineText.length > 120 ? entry.lineText.slice(0, 117) + '...' : entry.lineText;
  return [
    `  ${colors.red}✗${colors.reset} ${colors.bold}${entry.file}:${entry.line}${colors.reset}`,
    `    ${colors.gray}found:${colors.reset}    ${colors.red}${entry.fullMatch}${colors.reset}`,
    `    ${colors.gray}expected:${colors.reset} ${colors.green}@${expectedScope}/${entry.matchedPackage}${colors.reset}`,
    `    ${colors.gray}context:${colors.reset}  ${snippet}`,
  ].join('\n');
}

function main() {
  const repoRoot = process.cwd();
  const expectedScope = getExpectedScope(repoRoot);

  console.log(
    `${colors.blue}→${colors.reset} Checking package name drift against scope ${colors.bold}@${expectedScope}${colors.reset}`,
  );
  console.log(
    `${colors.gray}  Scanning: ${SCAN_DIRS.join(', ')}${colors.reset}`,
  );
  console.log(
    `${colors.gray}  Packages: ${PACKAGE_NAMES.map((p) => `@*/${p}`).join(', ')}${colors.reset}`,
  );
  console.log(`${colors.gray}  Excluded: *.map (sourcemaps)${colors.reset}`);
  console.log('');

  const allDrift = [];
  let filesScanned = 0;

  for (const dir of SCAN_DIRS) {
    const absDir = path.join(repoRoot, dir);
    for (const file of walkDir(absDir)) {
      filesScanned++;
      const drift = scanFile(file, expectedScope, repoRoot);
      allDrift.push(...drift);
    }
  }

  if (allDrift.length === 0) {
    console.log(
      `${colors.green}✓ No package name drift detected${colors.reset} (${filesScanned} files scanned)`,
    );
    process.exit(0);
  }

  // Group drift by file for readable output
  const byFile = new Map();
  for (const entry of allDrift) {
    if (!byFile.has(entry.file)) byFile.set(entry.file, []);
    byFile.get(entry.file).push(entry);
  }

  console.error(
    `${colors.red}${colors.bold}✗ Package name drift detected${colors.reset} — ${allDrift.length} reference${allDrift.length === 1 ? '' : 's'} in ${byFile.size} file${byFile.size === 1 ? '' : 's'} (${filesScanned} files scanned)`,
  );
  console.error('');

  for (const [file, entries] of byFile) {
    for (const entry of entries) {
      console.error(formatDrift(entry, expectedScope));
      console.error('');
    }
  }

  console.error(
    `${colors.yellow}⚠  Fix by updating references to use ${colors.bold}@${expectedScope}/${colors.reset}${colors.yellow} scope, or update package.json "name" if the scope has intentionally changed.${colors.reset}`,
  );
  process.exit(1);
}

main();
