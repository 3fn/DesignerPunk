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
 * Behavior is intentionally IDENTICAL to the two copies it replaces: resolve
 * `<fromDir>/../..`, return it iff it contains `package.json`, else fall back to cwd.
 * Callers MUST pass their own `__dirname` so the two-levels-up offset is computed
 * from the calling file's location (both prior copies lived at `src/cli/*.ts`, two
 * levels below the root; this util lives at `src/cli/shared/`, so it cannot use its
 * own `__dirname`).
 *
 * @param fromDir - The calling module's `__dirname` (REQUIRED — see note above).
 * @returns Absolute path to the package root, or `process.cwd()` if the self-check fails.
 */
import * as path from 'path';
import * as fs from 'fs';

export function resolvePackageRoot(fromDir: string): string {
  // The CLI entry files live at src/cli/*.ts (or dist/cli/*.js under a packed
  // install). The package root is two levels up from src/cli/.
  const fromCli = path.resolve(fromDir, '../..');
  if (fs.existsSync(path.join(fromCli, 'package.json'))) {
    return fromCli;
  }
  return process.cwd();
}
