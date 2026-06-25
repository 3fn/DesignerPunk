/**
 * Component Token Loader
 *
 * Discovers and loads component token files from local source when tokenSource is set.
 * Triggers defineComponentTokens() side effects, populating ComponentTokenRegistry.
 *
 * Discovery sources:
 * 1. {tokenSourceRoot}/component/ — scan for *.ts files (dedicated directory)
 * 2. componentTokenDirs from config — scan for *.tokens.ts files (broader directories)
 *
 * @see Spec 104 design.md § "Component Token Loader"
 * @see Spec 114 — returns RegisteredComponentToken[] with allowOverwrite support
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';
import { scopedTsRequire, type TsModuleLoader } from '../config/scopedTsRequire';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';

/**
 * Discover and load component token files from configured source.
 * Returns all registered component tokens for downstream consumers.
 *
 * `allowOverwrite` travels with the loader (it is the loader's own concern, NOT a
 * mode concern — Spec 117 R4): enabled while loading regardless of tokenSourceMode.
 * Harmless if there is a single registration path; benign last-wins if a dual-path
 * (e.g. local copy + package `src` both required) re-registers the same token. R4's
 * components.yaml semantic-reproduction check is the safety net against a wrong overwrite.
 *
 * @param config - Resolved pipeline configuration.
 * @param loadModule - Injectable runtime-TS resolution seam (Spec 118 Task 9.5). Defaults
 *   to {@link scopedTsRequire} (Approach A scoped `tsx/cjs/api`) — the per-site scope that
 *   makes this consumer-`.ts` load independent of the bin's global register. In-process
 *   jest callers inject a jest-compatible loader; the build script injects the ambient tsx
 *   loader (a plain `require`). See {@link scopedTsRequire} for why.
 */
export function loadComponentTokens(
  config: ResolvedConfig,
  loadModule: TsModuleLoader = scopedTsRequire,
): RegisteredComponentToken[] {
  // Enable allowOverwrite with the loader (mode-independent) to tolerate
  // double-registration. Reset to default in the finally block.
  ComponentTokenRegistry.setDefaultAllowOverwrite(true);

  try {
    // Source 1: Auto-discover from {tokenSourceRoot}/component/
    const componentSubdir = path.join(config.tokenSourceRoot, 'component');
    if (fs.existsSync(componentSubdir)) {
      const files = fs.readdirSync(componentSubdir)
        .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
      for (const file of files) {
        // Scoped runtime-TS require (side-effect: defineComponentTokens registration).
        loadModule(path.join(componentSubdir, file), __filename);
      }
    }

    // Source 2: Explicit componentTokens directories (*.tokens.ts pattern)
    for (const dir of config.componentTokenDirs) {
      if (!fs.existsSync(dir)) continue;
      scanForTokenFiles(dir, loadModule);
    }
  } finally {
    // Reset to default behavior (mode-independent — mirrors the enable above).
    ComponentTokenRegistry.setDefaultAllowOverwrite(false);
  }

  return ComponentTokenRegistry.getAll();
}

/**
 * Recursively scan a directory for *.tokens.ts files and load each (side-effect:
 * component-token registration) through the injected runtime-TS resolution seam.
 */
function scanForTokenFiles(dir: string, loadModule: TsModuleLoader): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
      scanForTokenFiles(fullPath, loadModule);
    } else if (entry.isFile() && (entry.name.endsWith('.tokens.ts') || entry.name === 'tokens.ts') && !entry.name.endsWith('.test.ts')) {
      loadModule(fullPath, __filename);
    }
  }
}
