/**
 * Scoped runtime-TypeScript require — the SINGLE mechanism for loading consumer
 * `.ts` at generate-time (Spec 118 Task 9.5, "Class B" of the ratified target model:
 * `findings/runtime-ts-resolution-target-model.md`).
 *
 * **Approach A** (Spec 118 Task 1 selection): `tsx/cjs/api` namespaced `register` +
 * scoped synchronous `require`. `register()` mutates `module._resolveFilename` /
 * `module._extensions` process-globally; the namespace scopes requests; `unregister()`
 * (in `finally`) restores global state — load-bearing for the no-ambient-residue
 * criterion. Do NOT drop the `finally`. (Task 1 finding: `findings/loader-selection.md`.)
 *
 * This is the shared primitive behind the three per-site scoped seams that replace the
 * bin's single global `tsx/cjs/api` register: config (`ConfigLoader`), token source
 * (`resolveTokens`), and component tokens (`loadComponentTokens`). Each site exposes an
 * injectable loader parameter defaulting to {@link scopedTsRequire}, mirroring
 * `ConfigLoader`'s `loadModule` seam.
 *
 * Constraint: this loader **cannot run inside a jest process** — tsx's scoped require
 * appends a `?namespace=` tag to the resolved module id that jest's module resolver
 * rejects (`ENOENT`). In-process jest callers must inject a jest-compatible loader (a
 * plain `require` that rides jest's own module registry / ts-jest transform) via each
 * site's loader parameter. Production (real-node) execution uses this default
 * unconditionally — there is deliberately NO test-environment detection in this path
 * (Task 2 rejected an env-fork: it ships a conditional copy of the bug).
 */

/**
 * Loads a `.ts` (or `.js`) module at runtime and returns its module namespace object.
 * The injectable runtime-TS resolution seam shared by `resolveTokens`,
 * `loadComponentTokens`, and (optionally) `ConfigLoader`.
 *
 * @param modulePath - Absolute path or resolvable id of the module to load.
 * @param fromFile - The file the request resolves relative to (the call-site anchor for
 *   tsx's scoped require — transitive relative imports inside the loaded module resolve
 *   against the module's own location, this anchors the entry request).
 */
export type TsModuleLoader = (modulePath: string, fromFile: string) => unknown;

/**
 * Default runtime-TS loader — Approach A (scoped `tsx/cjs/api` register).
 *
 * Synchronous: tsx's `ScopedRequire` is synchronous, so consumers that call exported
 * functions on the result (e.g. `getAllPrimitiveTokens()`) or rely on require's
 * side-effects (component-token registration) work without awaiting.
 */
export const scopedTsRequire: TsModuleLoader = (modulePath: string, fromFile: string): unknown => {
  const { register } = require('tsx/cjs/api') as {
    register: (opts: { namespace: string }) => {
      require: (id: string, fromFile: string) => unknown;
      unregister: () => void;
    };
  };
  const ns = `dp-ts-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const unregister = register({ namespace: ns });
  try {
    // ScopedRequire is synchronous.
    return unregister.require(modulePath, fromFile);
  } finally {
    // Mandatory: restores the global resolver hook (no ambient/global residue).
    unregister.unregister();
  }
};
