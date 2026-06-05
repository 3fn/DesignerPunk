/**
 * Resolve the installed @3fn/core package location and version.
 *
 * Uses require.resolve to support monorepos, pnpm symlinks, and hoisted deps.
 * Falls back to direct node_modules path if resolve fails.
 *
 * @see Spec 111 — Requirement 1, AC1 and AC3
 */

import * as path from 'path';
import * as fs from 'fs';

export interface ResolvedPackage {
  root: string;    // Absolute path to @3fn/core package root
  version: string; // Package version from package.json
}

export function resolvePackage(projectRoot: string): ResolvedPackage {
  let pkgJsonPath: string | undefined;

  // Primary: require.resolve with paths scoped to projectRoot
  try {
    pkgJsonPath = require.resolve('@3fn/core/package.json', { paths: [projectRoot] });
  } catch {
    // Fallback: direct node_modules path
    const fallback = path.join(projectRoot, 'node_modules', '@3fn', 'core', 'package.json');
    if (fs.existsSync(fallback)) {
      pkgJsonPath = fallback;
    }
  }

  if (!pkgJsonPath) {
    throw new Error('❌ @3fn/core not installed. Run `npm install` first.');
  }

  const root = path.dirname(pkgJsonPath);
  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));

  return { root, version: pkg.version };
}
