/**
 * Shared package-root resolution (Spec 118 Task 9.5.2, Class C).
 *
 * Single source of truth for "where is the DesignerPunk package root" — the robust
 * self-checking pattern that previously existed as two copy-paste copies in
 * `designerpunk.ts` (B3, `:80`) and `init.ts` (B4, `:219`). Both resolved two levels
 * up from the CLI file's `__dirname` (`src/cli/` → package root, or `dist/cli/` →
 * package root under a packed install), self-checked for a `package.json`, and fell
 * back to `process.cwd()`. This util unifies them so there is ONE mechanism, no
 * copy-paste, and the package root is relocation-safe — a prerequisite for the target
 * model's compile-to-`dist` step (`findings/runtime-ts-resolution-target-model.md`
 * § Class C / step 4).
 *
 * Resolution behavior is intentionally IDENTICAL to the two copies it replaced:
 * resolve `<fromDir>/../..`, return it iff it contains `package.json`, else fall
 * back to cwd — now with a stderr warning when the fallback triggers (silent
 * fallback is the F-C2-class failure mode; see `mcpDataRoots.ts`). Callers MUST
 * pass their own `__dirname` so the two-levels-up offset is computed from the
 * calling file's location.
 *
 * LEVELS-UP ASSUMPTION — every caller's module sits exactly TWO levels below the
 * package root. Current callers (Spec 121 F-C2 patch added the MCP entry points):
 *   - `src/cli/designerpunk.ts`, `src/cli/init.ts`      → `src/cli/`  (dev/ts-node)
 *   - `dist/cli/designerpunk.js`, `dist/cli/init.js`    → `dist/cli/` (packed install)
 *   - `src/config/ConfigLoader.ts` / `dist/config/`     → two levels down likewise
 *   - esbuild MCP bundles `dist/mcp/*.js` (docs/application/product servers pass
 *     the bundle's `__dirname`)                          → `dist/mcp/`
 *   - sub-package tsc artifacts `mcp-server/dist/index.js`,
 *     `application-mcp-server/dist/index.js` (each sub-package dir sits at the
 *     repo root, so `<sub>/dist` is also two levels down); their ts-node/src forms
 *     (`mcp-server/src/index.ts` etc.) are two levels down as well.
 * If a future caller does NOT sit two levels below the package root, do not fork
 * this logic — generalize THIS function (e.g. to an upward walk) instead.
 *
 * This util lives at `src/cli/shared/`, so it cannot use its own `__dirname`.
 *
 * @param fromDir - The calling module's `__dirname` (REQUIRED — see note above).
 * @returns Absolute path to the package root, or `process.cwd()` if the self-check fails.
 */
import * as path from 'path';
import * as fs from 'fs';

export function resolvePackageRoot(fromDir: string): string {
  // The calling entry files live two levels below the package root (see the
  // LEVELS-UP ASSUMPTION in the header).
  const fromCli = path.resolve(fromDir, '../..');
  if (fs.existsSync(path.join(fromCli, 'package.json'))) {
    return fromCli;
  }
  // Self-check failed — warn on stderr (NEVER stdout: for MCP servers stdout is
  // the JSON-RPC channel). A silent cwd fallback here is exactly the class of
  // failure the F-C2 patch exists to kill.
  console.error(
    `[resolvePackageRoot] WARNING: no package.json two levels above ${fromDir} — ` +
      `falling back to cwd (${process.cwd()}). Package-relative data may not resolve.`,
  );
  return process.cwd();
}
