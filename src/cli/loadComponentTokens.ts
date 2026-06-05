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
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';

/**
 * Discover and load component token files from configured source.
 * Returns all registered component tokens for downstream consumers.
 *
 * When tokenSourceMode is 'local', uses allowOverwrite to prevent
 * double-registration conflicts with package-internal side-effect imports.
 */
export function loadComponentTokens(config: ResolvedConfig): RegisteredComponentToken[] {
  // Enable allowOverwrite in local mode to handle double-registration
  if (config.tokenSourceMode === 'local') {
    ComponentTokenRegistry.setDefaultAllowOverwrite(true);
  }

  try {
    // Source 1: Auto-discover from {tokenSourceRoot}/component/
    const componentSubdir = path.join(config.tokenSourceRoot, 'component');
    if (fs.existsSync(componentSubdir)) {
      const files = fs.readdirSync(componentSubdir)
        .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
      for (const file of files) {
        require(path.join(componentSubdir, file));
      }
    }

    // Source 2: Explicit componentTokens directories (*.tokens.ts pattern)
    for (const dir of config.componentTokenDirs) {
      if (!fs.existsSync(dir)) continue;
      scanForTokenFiles(dir);
    }
  } finally {
    // Reset to default behavior
    if (config.tokenSourceMode === 'local') {
      ComponentTokenRegistry.setDefaultAllowOverwrite(false);
    }
  }

  return ComponentTokenRegistry.getAll();
}

/**
 * Recursively scan a directory for *.tokens.ts files and require each.
 */
function scanForTokenFiles(dir: string): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
      scanForTokenFiles(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.tokens.ts') || entry.name === 'tokens.ts') && !entry.name.endsWith('.test.ts')) {
      require(fullPath);
    }
  }
}
