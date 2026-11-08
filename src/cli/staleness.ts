/**
 * Product Token Staleness Detection
 *
 * Decides whether product token output needs regenerating by CONTENT, not by file times
 * (Spec 129 U8, design § 11, Req 5.8): the check renders the product tokens into a temporary
 * directory and compares each file, byte for byte, with the output on disk. File times moved
 * with `git checkout`, a copy or a restore, and said "fresh" for output written before an
 * upgrade (`.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`, R5).
 * A package upgrade shows because the generated header names the package version.
 *
 * @see Spec 114 design.md § "isProductTokenStale"
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';
import { generateProductTokens, productTokenOutputPaths } from './generateProductTokens';
import { sameOutput } from './freshness';

/**
 * Get all product token output file paths for the configured platforms.
 */
export function getProductTokenOutputPaths(config: ResolvedConfig): string[] {
  const paths = productTokenOutputPaths(config);
  return [paths.web, paths.ios, paths.android];
}

/**
 * Check whether product token output is stale against the inputs `generate` would read now.
 *
 * Returns true if:
 * - --force flag is present
 * - there is no product token source
 * - any output file is missing
 * - a fresh render differs from any output file (outside a header timestamp)
 * - the fresh render cannot be made (the real run will then say why)
 */
export function isProductTokenStale(config: ResolvedConfig, force = false): boolean {
  if (force) return true;

  if (!config.productTokens || !fs.existsSync(config.productTokens)) {
    return true;
  }

  const outputPaths = getProductTokenOutputPaths(config);
  for (const outputPath of outputPaths) {
    if (!fs.existsSync(outputPath)) return true;
  }

  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-product-fresh-'));
  try {
    generateProductTokens(config, { renderTo: scratch });
    for (const outputPath of outputPaths) {
      const rendered = path.join(scratch, path.basename(outputPath));
      if (!fs.existsSync(rendered)) return true; // nothing rendered (no categories): not fresh
      if (!sameOutput(fs.readFileSync(rendered, 'utf-8'), fs.readFileSync(outputPath, 'utf-8'))) return true;
    }
    return false;
  } catch {
    return true;
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
}
