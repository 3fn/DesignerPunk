/**
 * @jest-environment jsdom
 *
 * Spec 118 Task 5.1b — Browser Boot/Smoke Guard
 *
 * Paired boot/smoke guard for the esbuild-bundled browser bundle. The browser bundle
 * is EXEMPT from the runtime-resolution contract (bundling resolves imports at build
 * time), but the exemption is NOT silent — the bundle must execute without a
 * module-resolution error and register its custom elements.
 *
 * Mechanism: loads the ESM bundle content via fs.readFileSync and evaluates it in the
 * jsdom window context (window.eval). This is necessary because:
 *
 *   (1) jsdom provides `customElements` — required because the bundle calls
 *       `customElements.define()` at module top-level; bare Node throws
 *       "HTMLElement is not defined" (verified 2026-06-25).
 *
 *   (2) The ESM bundle (designerpunk.esm.js) has native ES module `export` syntax at
 *       the end (`export { ButtonCTA, ... }`). A dynamic `import()` in jest's CJS mode
 *       does not work cleanly for untransformed native ESM files in dist/ — it would
 *       need jest's experimental VM modules mode, a larger configuration footprint than
 *       this guard warrants. Window.eval() is the jsdom-idiomatic execution path for
 *       script content in a DOM context.
 *
 *   (3) The bundle's `export {}` block (at the end, after all `customElements.define()`
 *       calls) is stripped before eval since ES module export syntax is not valid in
 *       a non-module script context. The stripping is safe: all observable side effects
 *       (element registration) happen before the export block.
 *
 * What this guard catches:
 *   - Any module-resolution error baked into the bundle at build time (these surface
 *     as thrown errors when the bundle code executes).
 *   - Any missing dependency that esbuild failed to bundle.
 *   - Failure of `customElements.define()` calls (e.g., duplicate registration).
 *
 * Confirmed sentinel: `customElements.get('button-cta')` is defined after the bundle
 * executes. The bundle calls `customElements.define('button-cta', ButtonCTA)` at
 * module top-level (ButtonCTA.web.ts:691, verified 2026-06-25).
 *
 * Build dependency: this guard reads the BUILT bundle from dist/browser/. It MUST run
 * after `npm run build:browser`. In CI, the consumer-guard.yml builds before this step.
 * Locally, if dist/browser/ is absent, the test skips with a clear message.
 *
 * @see Spec 118 Task 5.1b
 * @see Spec 118 design.md § MCP/Browser Principled Exception
 * @see Resolved Decision 2 (bundled subsystems exempt; this guard is the paired proof)
 * @see .github/workflows/consumer-guard.yml — where this guard runs in CI
 * @see src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts:691 — customElements.define
 */

import * as fs from 'fs';
import * as path from 'path';

const PKG_ROOT = path.resolve(__dirname, '..');
const BROWSER_BUNDLE = path.join(PKG_ROOT, 'dist', 'browser', 'designerpunk.esm.js');

describe('Spec 118 Task 5.1b — browser bundle boot/smoke guard (Resolved Decision 2: bundled subsystems exempt + paired guard)', () => {
  // Skip guard: if the bundle doesn't exist, skip rather than fail with a misleading
  // error. In CI, consumer-guard.yml runs `npm run build:browser` before this test.
  const bundleExists = fs.existsSync(BROWSER_BUNDLE);

  it(
    'designerpunk.esm.js executes in jsdom and registers custom elements (e.g. button-cta)',
    () => {
      if (!bundleExists) {
        // Skip cleanly when the bundle hasn't been built. In CI this block is unreachable
        // because the workflow builds first. Locally, this prevents a false "module not
        // found" failure for a developer who hasn't run `npm run build:browser`.
        console.warn(
          '[Spec 118 Task 5.1b] SKIP: dist/browser/designerpunk.esm.js not found. ' +
          'Run `npm run build:browser` first, then re-run this guard.',
        );
        return; // exit test without failure (not a test failure — a pre-condition miss)
      }

      // Read the ESM bundle content.
      let bundleCode = fs.readFileSync(BROWSER_BUNDLE, 'utf-8');

      // Strip the trailing `export { ... }` block. The ESM bundle ends with:
      //   export {
      //     ButtonCTA,
      //     ...
      //   };
      //   //# sourceMappingURL=...
      //
      // ES module export syntax is not valid in a non-module eval context. All
      // observable side effects (customElements.define calls) occur BEFORE this block.
      // The strip is safe: we only remove the export declarations, not any logic.
      //
      // We find the LAST occurrence of `\nexport {` — the bundle has exactly one export
      // block at the end (verified: grep shows export { at line 18595 of 18664).
      const exportBlockIdx = bundleCode.lastIndexOf('\nexport {');
      if (exportBlockIdx !== -1) {
        bundleCode = bundleCode.slice(0, exportBlockIdx);
      }

      // Evaluate the bundle in the jsdom window context.
      //
      // jsdom provides:
      //   - window.customElements (CustomElementRegistry)
      //   - window.HTMLElement, window.HTMLButtonElement, etc.
      //   - window.CSSStyleSheet, window.document, etc.
      //
      // The bundle calls customElements.define() at module top-level as a side effect
      // of being imported in a browser. window.eval() executes the code with these
      // globals available — the closest to "load this bundle in a browser page."
      //
      // If the bundle has a resolution error (a missing dependency that esbuild failed
      // to bundle), it will throw here and the test fails.
      expect(() => {
        window.eval(bundleCode);
      }).not.toThrow();

      // Assert that the bundle registered its custom elements.
      // `customElements.get('button-cta')` returns the registered class, or undefined
      // if not registered. Defined = the bundle executed its define() calls cleanly.
      //
      // We use `button-cta` as the sentinel element (ButtonCTA.web.ts:691 verified).
      // The bundle defines 35 custom elements (verified 2026-06-25: grep count on built
      // bundle); any resolution error would prevent ALL of them from registering.
      const buttonCTAClass = customElements.get('button-cta');
      expect(buttonCTAClass).toBeDefined();
      expect(typeof buttonCTAClass).toBe('function');
    },
    30_000,
  );
});
