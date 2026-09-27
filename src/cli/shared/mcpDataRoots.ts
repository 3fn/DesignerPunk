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
import type { DesignSystemRoot, PartialCase } from './bornRepo';

// Re-exported so MCP server entry points need exactly ONE shared require.
export { resolvePackageRoot } from './resolvePackageRoot';

/** Which resolution source won for a data root. */
export type DataRootSource = 'env' | 'cwd' | 'package' | 'package-consume';

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
 * @deprecated Spec 123 Task 1.2 — superseded by the birth-aware resolvers below
 * (`resolveComponentRoots`, `resolveTokenIndexRoot`, `resolveProductRoot`), which
 * consult a `DesignSystemRoot` (from `bornRepo.findDesignSystemRoot`) instead of a
 * bare cwd-existence check. This function does not know about `born` /
 * `package-mode` / `partial` — a cwd-relative `token-index/` in an UNRELATED
 * directory (e.g. a stray leftover) would win over the correct package fallback.
 * KEPT, UNCHANGED, so the three servers' `require.main` bootstrap blocks keep
 * compiling and behaving exactly as before until Tasks 1.4–1.6 (indexer multi-root
 * consumption, `generate`'s tier-aware writes, and the servers' bootstrap rewiring)
 * land together. Do not add new callers.
 *
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

/** True when `p` does not exist, or exists as an empty directory. */
function isAbsentOrEmptyDir(p: string): boolean {
  try {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      return fs.readdirSync(p).length === 0;
    }
    return false;
  } catch {
    return true;
  }
}

// ---------------------------------------------------------------------------
// Birth-aware resolvers (Spec 123 Task 1.2 — design.md § "C3. The root-policy
// table as code"). These consult a `DesignSystemRoot` (from
// `bornRepo.findDesignSystemRoot`) rather than a bare cwd-existence check, so
// resolution is correct across born / package-mode / partial / unborn.
//
// NOTE (application-time sequencing — flagged for the orchestrator/Task 1
// primary, not resolved unilaterally here): these resolvers are NEW, pure,
// fully unit-tested functions. They are NOT YET wired into the three servers'
// `require.main` bootstrap blocks — that wiring requires `ComponentIndexer` to
// accept a component-root ARRAY (the union at pass 1, Task 1.4 — Lina) and
// `generate`'s tier-aware `token-index/meta.json` write (Task 1.5). Wiring the
// servers' bootstrap to these resolvers before 1.4/1.5 land would either (a)
// silently drop union semantics by picking `roots[0]`, or (b) require a shape
// change to `DataPaths.componentsDir` outside this subtask's scope. Left as an
// explicit fork for Task 1.4/1.5/1.6 to resolve, not absorbed here.
// ---------------------------------------------------------------------------

/** The result of resolving the component-root UNION (C3: consumer ∪ package). */
export interface ComponentRootsResult {
  /** `[consumerRoot?, packageRoot]` — the union, consumer-first for precedence. */
  roots: string[];
  /** Parallel to `roots`: which source produced each entry. */
  sources: DataRootSource[];
}

/**
 * Resolve the component-root UNION (C3 "Resolver" § `resolveComponentRoots`).
 * `consumerRoot` = the env value if set, else `bornRoot/src/components` when
 * `dsRoot.state === 'born'`; absent otherwise (package-mode, partial, unborn,
 * with no explicit env). **The env value names the consumer root, never the
 * only root** — `packageRoot` is always present in `roots` too, so the union
 * (and the fork-precedence-on-declared-name rule, Task 1.4) still applies.
 */
export function resolveComponentRoots(opts: {
  /** The env-var value, if set (e.g. process.env.COMPONENTS_DIR / COMPONENT_DIR). */
  envValue?: string;
  /** The caller's birth-detection result (`bornRepo.findDesignSystemRoot`). */
  dsRoot: DesignSystemRoot;
  /** Absolute package root (from `resolvePackageRoot`). */
  packageRoot: string;
}): ComponentRootsResult {
  const roots: string[] = [];
  const sources: DataRootSource[] = [];

  if (opts.envValue) {
    roots.push(path.resolve(opts.envValue));
    sources.push('env');
  } else if (opts.dsRoot.state === 'born' && opts.dsRoot.root) {
    roots.push(path.join(opts.dsRoot.root, 'src', 'components'));
    sources.push('cwd');
  }

  roots.push(path.resolve(opts.packageRoot, 'src', 'components', 'core'));
  sources.push('package');

  return { roots, sources };
}

/** The result of resolving the token-index root (C3 "Resolver" § `resolveTokenIndexRoot`). */
export type TokenIndexResolution =
  | {
      ok: true;
      path: string;
      source: DataRootSource;
      /** Set for package-mode and unborn — never for `born`. */
      tokenOrigin?: 'designerpunk-package-mode' | 'designerpunk-reference';
    }
  | { ok: false; reason: 'empty-env-value' }
  | { ok: false; reason: 'run-generate' }
  | { ok: false; reason: 'partial'; partialCase?: PartialCase };

/**
 * Resolve the token-index root (C3):
 * - explicit env value absent-or-empty on disk → error, in ANY posture;
 * - `born` → `bornRoot/token-index`, erroring ("run generate") if absent/empty;
 * - `package-mode` → `root/token-index`, labelled `designerpunk-package-mode`,
 *   erroring ("run generate") if absent/empty — safe here because a config exists;
 * - `partial` → its own error, naming the sub-case — NEVER "run generate";
 * - `unborn` → the package index, `source: 'package-consume'`, labelled
 *   `tokenOrigin: 'designerpunk-reference'`.
 *
 * Message-string assembly (the catalog rows) is a Task 1.6 concern — this
 * resolver returns structured reasons only.
 */
export function resolveTokenIndexRoot(opts: {
  /** The env-var value, if set (e.g. process.env.TOKEN_INDEX_DIR). */
  envValue?: string;
  /** The caller's birth-detection result (`bornRepo.findDesignSystemRoot`). */
  dsRoot: DesignSystemRoot;
  /** Absolute package root (from `resolvePackageRoot`). */
  packageRoot: string;
}): TokenIndexResolution {
  if (opts.envValue !== undefined) {
    if (opts.envValue === '') {
      return { ok: false, reason: 'empty-env-value' };
    }
    const resolved = path.resolve(opts.envValue);
    if (isAbsentOrEmptyDir(resolved)) {
      return { ok: false, reason: 'empty-env-value' };
    }
    return { ok: true, path: resolved, source: 'env' };
  }

  switch (opts.dsRoot.state) {
    case 'born': {
      const indexPath = path.join(opts.dsRoot.root as string, 'token-index');
      if (isAbsentOrEmptyDir(indexPath)) return { ok: false, reason: 'run-generate' };
      return { ok: true, path: indexPath, source: 'cwd' };
    }
    case 'package-mode': {
      const indexPath = path.join(opts.dsRoot.root as string, 'token-index');
      if (isAbsentOrEmptyDir(indexPath)) return { ok: false, reason: 'run-generate' };
      return { ok: true, path: indexPath, source: 'cwd', tokenOrigin: 'designerpunk-package-mode' };
    }
    case 'partial':
      return { ok: false, reason: 'partial', partialCase: opts.dsRoot.partialCase };
    case 'unborn':
    default:
      return {
        ok: true,
        path: path.resolve(opts.packageRoot, 'token-index'),
        source: 'package-consume',
        tokenOrigin: 'designerpunk-reference',
      };
  }
}

/**
 * Resolve the product root (C3): env, else `bornRoot/product` (born,
 * package-mode OR partial — any state with a resolved `root`), else
 * `cwd/product` (unborn — unchanged from the pre-123 behavior).
 */
export function resolveProductRoot(opts: {
  /** The env-var value, if set (e.g. process.env.PRODUCT_DIR). */
  envValue?: string;
  /** The caller's birth-detection result (`bornRepo.findDesignSystemRoot`). */
  dsRoot: DesignSystemRoot;
  /** The invoking process's cwd (the unborn fallback base). */
  cwd: string;
}): ResolvedDataRoot {
  if (opts.envValue) {
    return { path: path.resolve(opts.envValue), source: 'env' };
  }
  if (opts.dsRoot.state !== 'unborn' && opts.dsRoot.root) {
    return { path: path.join(opts.dsRoot.root, 'product'), source: 'cwd' };
  }
  return { path: path.resolve(opts.cwd, 'product'), source: 'cwd' };
}
