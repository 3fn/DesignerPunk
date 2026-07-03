/**
 * Shared MCP data-root resolution (Spec 121 F-C2 patch).
 *
 * Single source of truth for how the three MCP servers (docs, application, product)
 * resolve their data roots. Before this module existed, all three servers defaulted
 * their data roots cwd-relative, so a hand-wired consumer (no env vars) booting the
 * bundled servers from `node_modules/@3fn/core` got an EMPTY index (finding F-C2,
 * `.kiro/specs/121-claude-code-portability/consumer-dry-run-findings.md` § A).
 *
 * Resolution order is per-root by DATA OWNERSHIP (Ada's ruling, grounded in the
 * Spec 118 Module-Resolution Contract Class C′):
 *
 * - PACKAGE-OWNED roots (docs `governance/`; application's design-philosophy.yaml,
 *   family-guidance, experience-patterns, layout-templates, family-registry):
 *   env var → package-relative. NO cwd preference — a consumer's coincidental
 *   `governance/` dir is not the DesignerPunk corpus; the env var is the sanctioned
 *   override. (Dev repo unaffected: cwd == package root there.)
 *
 * - CONSUMER-OWNED roots (`token-index/`, `src/components/core`, `product/`):
 *   env var → cwd-relative if it exists AND is non-empty → package-relative
 *   fallback. Class C′ mandates the consumer's own regenerated data wins when
 *   present. The product server's `product/` root gets NO package fallback
 *   (consumer-owned by definition; an empty index there is expected/correct) —
 *   callers omit `packageRoot` for it.
 *
 * All resolved paths are ABSOLUTE — the servers wire them into FileWatcher and
 * StalenessGate, whose `/node_modules/` immutability check only works on absolute
 * paths (mcp-server/src/staleness/StalenessGate.ts).
 *
 * CONSUMPTION CONTRACT (why servers require the DIST artifact of this file):
 * The MCP server sources live in sub-packages (`mcp-server/src`,
 * `application-mcp-server/src`) whose tsc builds have `rootDir: "./src"` — a static
 * TS import of this file would cross that boundary and fail/nest the sub-package
 * dist (Spec 118 Class C risk). Instead the servers load the ROOT-COMPILED artifact
 * via `require('../../dist/cli/shared/mcpDataRoots')` inside their entry-point-only
 * code paths:
 *   - esbuild bundles (`dist/mcp/*.js`): the require is statically resolved and
 *     INLINED at build time (`build:mcp` compiles this file to dist first).
 *   - sub-package tsc artifacts (`mcp-server/dist/index.js`,
 *     `application-mcp-server/dist/index.js`): the require resolves at runtime to
 *     `<repo>/dist/cli/shared/mcpDataRoots.js` (root build output).
 * NEVER copy this logic locally — duplicated-resolution-logic drift is this
 * project's named recurring failure mode.
 */
import * as path from 'path';
import * as fs from 'fs';

// Re-exported so MCP server entry points need exactly ONE shared require.
export { resolvePackageRoot } from './resolvePackageRoot';

/** Which resolution source won for a data root. */
export type DataRootSource = 'env' | 'cwd' | 'package';

/** A resolved data root: absolute path + which source won. */
export interface ResolvedDataRoot {
  /** Absolute path to the data root. */
  path: string;
  /** Which source won: 'env' | 'cwd' | 'package'. */
  source: DataRootSource;
}

/**
 * Resolve a PACKAGE-OWNED data root: env var → package-relative.
 * No cwd preference (see header).
 */
export function resolvePackageOwnedRoot(opts: {
  /** The env-var value, if set (e.g. process.env.MCP_STEERING_DIR). */
  envValue?: string;
  /** Absolute package root (from resolvePackageRoot(__dirname)). */
  packageRoot: string;
  /** Path of this root relative to the package root (e.g. 'governance/'). */
  relPath: string;
}): ResolvedDataRoot {
  if (opts.envValue) {
    return { path: path.resolve(opts.envValue), source: 'env' };
  }
  return { path: path.resolve(opts.packageRoot, opts.relPath), source: 'package' };
}

/**
 * Resolve a CONSUMER-OWNED data root: env var → cwd-relative (if exists AND
 * non-empty) → package-relative fallback (only when `packageRoot` is provided).
 * When `packageRoot` is omitted (product server's `product/` root), the
 * cwd-relative absolute path is returned even if absent — the server's existing
 * "starting with empty data" behavior is the correct outcome there.
 */
export function resolveConsumerOwnedRoot(opts: {
  /** The env-var value, if set (e.g. process.env.TOKEN_INDEX_DIR). */
  envValue?: string;
  /** Path of this root relative to cwd/package root (e.g. 'token-index'). */
  relPath: string;
  /** Absolute package root; OMIT to disable the package fallback. */
  packageRoot?: string;
}): ResolvedDataRoot {
  if (opts.envValue) {
    return { path: path.resolve(opts.envValue), source: 'env' };
  }
  const cwdPath = path.resolve(process.cwd(), opts.relPath);
  if (existsNonEmpty(cwdPath)) {
    return { path: cwdPath, source: 'cwd' };
  }
  if (opts.packageRoot) {
    return { path: path.resolve(opts.packageRoot, opts.relPath), source: 'package' };
  }
  return { path: cwdPath, source: 'cwd' };
}

/**
 * True when the path exists and is non-empty (non-empty directory, or a file
 * with content). An empty consumer dir must NOT shadow the package fallback.
 */
function existsNonEmpty(p: string): boolean {
  try {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      return fs.readdirSync(p).length > 0;
    }
    return stat.size > 0;
  } catch {
    return false;
  }
}
