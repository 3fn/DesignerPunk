/**
 * Token Resolver
 *
 * Resolves tokens from the configured source (local or package).
 * Verifies barrel contract before loading.
 *
 * @see Spec 103 design.md § "Token Resolver"
 */

import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { ResolvedConfig } from '../config/ConfigLoader';

/** Token data resolved from the configured source. */
export interface TokenInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
}

/**
 * Resolve tokens from the configured source.
 * Verifies barrel contract, then loads token arrays.
 */
export function resolveTokens(config: ResolvedConfig): TokenInput {
  const sourcePath = config.tokenSourceRoot;

  verifyBarrelContract(sourcePath);

  // require() works cleanly with CJS (project uses module: commonjs)
  const tokenBarrel = require(sourcePath);
  const semanticBarrel = require(`${sourcePath}/semantic`);

  return {
    primitiveTokens: tokenBarrel.getAllPrimitiveTokens(),
    semanticTokens: semanticBarrel.getAllSemanticTokens(),
  };
}

/**
 * Verify the token source directory exports the required barrel functions.
 * Throws with actionable error messages on failure.
 */
export function verifyBarrelContract(sourcePath: string): void {
  let tokenBarrel: any;
  try {
    tokenBarrel = require(sourcePath);
  } catch (err: any) {
    const msg = err?.message || String(err);
    // Distinguish "file not found" from "file found but has unresolved imports"
    if (msg.includes('Cannot find module') && msg.includes(sourcePath)) {
      throw new Error(
        `Token source not found at: ${sourcePath}\n` +
        `Expected a barrel file (index.ts) exporting getAllPrimitiveTokens().`
      );
    }
    throw new Error(
      `Token source at ${sourcePath} failed to load.\n\n` +
      `  Import resolution error:\n` +
      `    ${msg}\n\n` +
      `  Your local token source has unresolved dependencies.\n` +
      `  Token files should import types from the package:\n` +
      `    import { PrimitiveToken } from '@3fn/core/types';\n\n` +
      `  If you cannot resolve the imports, remove \`tokenSource\` from config\n` +
      `  to use package tokens instead.`
    );
  }

  if (typeof tokenBarrel.getAllPrimitiveTokens !== 'function') {
    throw new Error(
      `Token source at ${sourcePath} does not export getAllPrimitiveTokens().\n` +
      `Expected: export function getAllPrimitiveTokens(): PrimitiveToken[]`
    );
  }

  let semanticBarrel: any;
  try {
    semanticBarrel = require(`${sourcePath}/semantic`);
  } catch (err: any) {
    const msg = err?.message || String(err);
    if (msg.includes('Cannot find module') && msg.includes(`${sourcePath}/semantic`)) {
      throw new Error(
        `Semantic token source not found at: ${sourcePath}/semantic\n` +
        `Expected a semantic/ subdirectory with barrel file exporting getAllSemanticTokens().`
      );
    }
    throw new Error(
      `Semantic token source at ${sourcePath}/semantic failed to load.\n\n` +
      `  Import resolution error:\n` +
      `    ${msg}\n\n` +
      `  Your local token source has unresolved dependencies.\n` +
      `  Token files should import types from the package:\n` +
      `    import { SemanticToken } from '@3fn/core/types';\n\n` +
      `  If you cannot resolve the imports, remove \`tokenSource\` from config\n` +
      `  to use package tokens instead.`
    );
  }

  if (typeof semanticBarrel.getAllSemanticTokens !== 'function') {
    throw new Error(
      `Semantic token source at ${sourcePath}/semantic does not export getAllSemanticTokens().\n` +
      `Expected: export function getAllSemanticTokens(): SemanticToken[]`
    );
  }
}
