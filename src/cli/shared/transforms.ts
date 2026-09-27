/**
 * Shared content transforms used by both `init` and `sync` commands.
 */

import * as path from 'path';

/**
 * Rewrite build system imports to use @3fn/core/build package subpath.
 * Converts: import { defineComponentTokens } from '../../build/tokens'
 * To:       import { defineComponentTokens } from '@3fn/core/build'
 *
 * Handles any depth of relative path (../build/tokens, ../../build/tokens, etc.)
 * and specific file imports (../../build/tokens/defineComponentTokens).
 *
 * @deprecated Spec 123 Task 2 — superseded by `rewriteByResolution` for `init`'s
 * token-tree copy steps (3b/3c), which resolves specifiers against the file's own
 * location instead of matching a fixed string pattern (design.md C4; the string
 * form over-matched `themes/*\/SemanticOverrides.ts`'s intra-tree `'../types'`
 * import, which is D-B4's finding). KEPT, UNCHANGED, because `sync/Applier.ts`
 * still calls it (Task 5's domain — C4 states "sync's Applier source branch is
 * DELETED", not yet done) and `tests/consumer-integration.test.ts` still
 * references it (Task 9's domain). Do not add new callers.
 */
export function rewriteBuildImports(content: string): string {
  return content.replace(
    /from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g,
    `from '@3fn/core/build'`,
  );
}

// ---------------------------------------------------------------------------
// rewriteByResolution — Spec 123 Task 2.1 (design.md § "C4. Rewrite-at-copy —
// BY RESOLUTION, not by string")
// ---------------------------------------------------------------------------

/** One row of the out-of-tier mapping table (design.md C4). */
export interface RewriteMappingRow {
  /** Human-readable label for the row — used in coverage counts and error messages. */
  label: string;
  /** True iff the resolved (extension-stripped, forward-slash-normalized) absolute path matches this row. */
  matches: (normalizedResolvedPath: string) => boolean;
  /** The rewritten specifier. */
  target: string;
}

/**
 * The four-row mapping table, exactly as measured (Ada R1: `types` ×37,
 * `build/tokens` ×1, `registries` ×1, `color/OklchConverter` ×2 — see the Task
 * 2.1 completion doc for the reconciliation against a live re-measurement).
 */
export const REWRITE_MAPPING_TABLE: RewriteMappingRow[] = [
  {
    label: 'src/types/**',
    matches: (p) => /\/src\/types(\/|$)/.test(p),
    target: '@3fn/core/types',
  },
  {
    label: 'src/build/tokens/**',
    matches: (p) => /\/src\/build\/tokens(\/|$)/.test(p),
    target: '@3fn/core/build',
  },
  {
    label: 'src/registries/ComponentTokenRegistry',
    matches: (p) => /\/src\/registries\/ComponentTokenRegistry$/.test(p),
    target: '@3fn/core/build',
  },
  {
    label: 'src/color/OklchConverter',
    matches: (p) => /\/src\/color\/OklchConverter$/.test(p),
    target: '@3fn/core/types',
  },
];

/** One relative-specifier form this transform recognizes: `import ... from '<spec>'`, `import type ... from '<spec>'`, `export ... from '<spec>'`, `require('<spec>')`, `import('<spec>')`. */
const RELATIVE_SPECIFIER_RE = /\b(from\s+|require\(\s*|import\(\s*)(['"`])(\.[^'"`]+)\2/g;

/** Strip a trailing `.ts`/`.tsx`/`.js` extension and a trailing `/index` for stable matching against the mapping table. */
function normalizeForMatch(absPath: string): string {
  let normalized = absPath.split(path.sep).join('/');
  normalized = normalized.replace(/\.(ts|tsx|js)$/, '');
  normalized = normalized.replace(/\/index$/, '');
  return normalized;
}

/** True iff `resolvedAbs` is inside (or equal to) `tierRoot` — an intra-tree specifier, never touched (C4). */
function isInsideTier(resolvedAbs: string, tierRoot: string): boolean {
  const rel = path.relative(tierRoot, resolvedAbs);
  return !rel.startsWith('..') && !path.isAbsolute(rel);
}

/**
 * Thrown when a specifier resolves OUTSIDE the token tier with no row in the
 * mapping table — an under-rewrite the copy fails loudly on (design.md C4:
 * "An out-of-root specifier with no mapping row fails the copy loudly").
 */
export class UnmappedSpecifierError extends Error {
  constructor(public readonly specifier: string, public readonly fileAbsPath: string) {
    super(
      `${fileAbsPath}: relative specifier '${specifier}' resolves outside the token tier ` +
      `with no mapping row in REWRITE_MAPPING_TABLE — refusing to copy silently-broken imports.`
    );
    this.name = 'UnmappedSpecifierError';
  }
}

/** One specifier this call actually rewrote — feeds the mapping-table coverage assertion (Task 2.1). */
export interface RewriteRecord {
  specifier: string;
  target: string;
  label: string;
}

export interface RewriteByResolutionResult {
  content: string;
  rewrites: RewriteRecord[];
}

/**
 * Rewrite `content` (the source of a file about to be copied to a consumer repo)
 * by RESOLUTION, not by string match (design.md C4; Ada D-B4/D-A6).
 *
 * Every relative specifier (`import`, `import type`, `export … from`, `require`,
 * dynamic `import()`) is resolved against `fileAbsPath`'s own location.
 * - If the resolved path is INSIDE `tierRoot` (the whole copied token tier,
 *   `src/tokens` — the SAME boundary for both step 3b and step 3c, never each
 *   step's own copy root), the specifier is left untouched.
 * - If it resolves OUTSIDE `tierRoot`, it is rewritten via `REWRITE_MAPPING_TABLE`.
 *   A specifier with no matching row throws {@link UnmappedSpecifierError} —
 *   this is what catches UNDER-rewrite; the `tsc --noEmit` arbiter (Task 2.5)
 *   catches OVER-rewrite.
 *
 * @param content Source file text.
 * @param fileAbsPath Absolute path of the file being copied (its OWN location —
 *   the anchor relative specifiers resolve against).
 * @param tierRoot Absolute path of the copied token tier's root (`src/tokens`).
 */
export function rewriteByResolution(
  content: string,
  fileAbsPath: string,
  tierRoot: string,
): RewriteByResolutionResult {
  const fileDir = path.dirname(fileAbsPath);
  const rewrites: RewriteRecord[] = [];

  const newContent = content.replace(RELATIVE_SPECIFIER_RE, (full, prefix, quote, specifier) => {
    const resolvedAbs = path.resolve(fileDir, specifier);

    if (isInsideTier(resolvedAbs, tierRoot)) {
      return full;
    }

    const normalized = normalizeForMatch(resolvedAbs);
    const row = REWRITE_MAPPING_TABLE.find((r) => r.matches(normalized));
    if (!row) {
      throw new UnmappedSpecifierError(specifier, fileAbsPath);
    }

    rewrites.push({ specifier, target: row.target, label: row.label });
    return `${prefix}${quote}${row.target}${quote}`;
  });

  return { content: newContent, rewrites };
}
