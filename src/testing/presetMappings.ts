/**
 * The `@3fn/core/*` subpath mappings the Jest preset applies (`jest-preset.ts`).
 *
 * Each target is DERIVED from the package's own `exports` map (its `require` condition), which is
 * the same file Node resolves for that subpath. It is never written here as a path. Before
 * 2026-10-13 the preset pinned four of these to `src/**\/index.ts` files the package does not
 * ship. In an installed package, a consumer test importing `@3fn/core/testing` (or a token file
 * `init` rewrote to import `@3fn/core/types`) then failed with "Could not locate module"
 * (.kiro/issues/2026-10-03-jest-preset-maps-unshipped-source.md). Reading `exports` keeps the
 * preset on the package's one resolution contract (Spec 118), so the two cannot drift apart.
 *
 * A separate module, not inside `jest-preset.ts`: the preset's `module.exports` must be a plain
 * Jest config object, so it cannot also carry named exports.
 */

import * as path from 'path';

/** The subpaths the preset maps. Each must have a `require` target in `package.json` `exports`. */
export const MAPPED_SUBPATHS = ['blend', 'build', 'types', 'testing', 'config'] as const;

type ExportEntry = string | { require?: unknown; default?: unknown; [condition: string]: unknown };

/** The file `exports["./<subpath>"]` serves to `require`, relative to the package root. */
export function exportTarget(exportsMap: Record<string, ExportEntry | undefined>, subpath: string): string {
  const entry = exportsMap[`./${subpath}`];
  const target = typeof entry === 'string' ? entry : entry?.require ?? entry?.default;
  if (typeof target !== 'string') {
    throw new Error(
      `@3fn/core/jest-preset: package.json "exports" has no require target for "./${subpath}", ` +
        `so the preset cannot map @3fn/core/${subpath}. This is a packaging defect in @3fn/core.`
    );
  }
  return target;
}

/** `moduleNameMapper` entries for {@link MAPPED_SUBPATHS}, resolved against the package root `root`. */
export function subpathMappings(root: string): Record<string, string> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(path.join(root, 'package.json')) as { exports?: Record<string, ExportEntry | undefined> };
  const out: Record<string, string> = {};
  for (const subpath of MAPPED_SUBPATHS) {
    out[`^@3fn/core/${subpath}$`] = path.join(root, exportTarget(pkg.exports ?? {}, subpath));
  }
  return out;
}
