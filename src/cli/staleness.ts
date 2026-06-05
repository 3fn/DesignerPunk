/**
 * Product Token Staleness Detection
 *
 * Compares modification times of product token YAML source files against
 * generated output files to determine if regeneration is needed.
 *
 * @see Spec 114 design.md § "isProductTokenStale"
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';

const PRODUCT_OUTPUT_FILES = [
  'ProductTokens.web.css',
  'ProductTokens.ios.swift',
  'ProductTokens.android.kt',
];

/**
 * Get all product token output file paths for the configured platforms.
 */
export function getProductTokenOutputPaths(config: ResolvedConfig): string[] {
  const outputDir = path.join(config.outputDir, 'product');
  return PRODUCT_OUTPUT_FILES.map(f => path.join(outputDir, f));
}

/**
 * Check whether product token output is stale relative to YAML source.
 *
 * Returns true if:
 * - --force flag is present
 * - Any output file is missing
 * - Any source YAML file is newer than the oldest output file
 */
export function isProductTokenStale(config: ResolvedConfig, force = false): boolean {
  if (force) return true;

  if (!config.productTokens || !fs.existsSync(config.productTokens)) {
    return true;
  }

  const outputPaths = getProductTokenOutputPaths(config);

  // If any output file is missing, always regenerate
  let oldestOutputMtime = Infinity;
  for (const outputPath of outputPaths) {
    if (!fs.existsSync(outputPath)) return true;
    const mtime = fs.statSync(outputPath).mtimeMs;
    if (mtime < oldestOutputMtime) oldestOutputMtime = mtime;
  }

  // Find all YAML source files
  const sourceFiles = findYamlFiles(config.productTokens);
  if (sourceFiles.length === 0) return true;

  // If any source is newer than the oldest output, it's stale
  for (const sourceFile of sourceFiles) {
    const mtime = fs.statSync(sourceFile).mtimeMs;
    if (mtime > oldestOutputMtime) return true;
  }

  return false;
}

/** Recursively find all .yaml files in a directory. */
function findYamlFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findYamlFiles(fullPath));
    } else if (entry.name.endsWith('.yaml') || entry.name.endsWith('.yml')) {
      results.push(fullPath);
    }
  }
  return results;
}
