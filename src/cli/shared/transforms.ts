/**
 * Shared content transforms used by both `init` and `sync` commands.
 */

/**
 * Rewrite build system imports to use @3fn/core/build package subpath.
 * Converts: import { defineComponentTokens } from '../../build/tokens'
 * To:       import { defineComponentTokens } from '@3fn/core/build'
 *
 * Handles any depth of relative path (../build/tokens, ../../build/tokens, etc.)
 * and specific file imports (../../build/tokens/defineComponentTokens).
 */
export function rewriteBuildImports(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g,
    `from '@3fn/core/build'`,
  );
}
