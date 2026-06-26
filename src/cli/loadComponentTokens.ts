/**
 * Component Token Loader
 *
 * Discovers component token files from local source and harvests the rich
 * `RegisteredComponentToken[]` carried back on each `defineComponentTokens` result's
 * non-enumerable brand. This loader is the SOLE writer to the canonical
 * `ComponentTokenRegistry` (Spec 124): `defineComponentTokens` no longer self-registers,
 * so the cross-boundary shared-singleton desync is eliminated.
 *
 * Discovery sources (order is load-bearing — see below):
 * 1. {tokenSourceRoot}/component/ — scan for *.ts files (dedicated directory)
 * 2. componentTokenDirs from config — scan for *.tokens.ts / tokens.ts files (broader dirs)
 *
 * Ordering (Spec 124, R6 / Task-2 ordering spike): the committed `components.yaml`
 * ordering is directory-SCAN order, NOT a sort. The harvest therefore preserves
 * Source-1-then-Source-2 traversal, each directory in `readdirSync` order, and within each
 * module the `Object.values(mod)` × per-branded-array (authored) order. NO sort is
 * introduced — a sort would reorder to alphabetical and break the R6 `git diff` gate.
 *
 * @see Spec 104 design.md § "Component Token Loader"
 * @see .kiro/specs/124-component-token-return-contract/design.md (the branded-return harvest)
 * @see .kiro/specs/124-component-token-return-contract/findings/r6-ordering-spike.md
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ResolvedConfig } from '../config/ConfigLoader';
import { scopedTsRequire, type TsModuleLoader } from '../config/scopedTsRequire';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';
import { getTokenContract } from '../build/tokens';

/**
 * Discover component token files and harvest branded results into the canonical
 * `ComponentTokenRegistry` as the sole writer. Returns all harvested tokens for
 * downstream consumers.
 *
 * The harvest inspects each loaded module's exports (`Object.values(mod)`) and collects
 * the rich tokens from any export carrying the {@link getTokenContract} brand — by
 * direct / `hasOwnProperty` access, never by enumerating a candidate's keys (Spec 124,
 * R3). Unbranded exports (plain value-maps, getters, string consts, type aliases,
 * re-export aliases) harvest to zero. Re-export aliases are deduped first-seen-wins.
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
  // Harvested rich tokens in traversal order (Source-1-then-Source-2; per-module export
  // order; per-branded-array authored order). Deduped by token `name` across modules.
  const harvested: RegisteredComponentToken[] = [];
  const seenNames = new Set<string>();

  // Source 1: Auto-discover from {tokenSourceRoot}/component/
  const componentSubdir = path.join(config.tokenSourceRoot, 'component');
  if (fs.existsSync(componentSubdir)) {
    const files = fs.readdirSync(componentSubdir)
      .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'));
    for (const file of files) {
      const mod = loadModule(path.join(componentSubdir, file), __filename);
      harvestModule(mod, harvested, seenNames);
    }
  }

  // Source 2: Explicit componentTokens directories (*.tokens.ts / tokens.ts pattern)
  for (const dir of config.componentTokenDirs) {
    if (!fs.existsSync(dir)) continue;
    scanForTokenFiles(dir, loadModule, harvested, seenNames);
  }

  // Sole writer to the canonical registry (Spec 124, R5 AC2), in traversal order so that
  // ComponentTokenRegistry.getAll() (Map-insertion order) feeds generateTokenIndex in the
  // committed `components.yaml` sequence (R6).
  for (const token of harvested) {
    ComponentTokenRegistry.register(token);
  }

  return ComponentTokenRegistry.getAll();
}

/**
 * Harvest branded `defineComponentTokens` results from a single loaded module's exports.
 *
 * Iterates `Object.values(mod)` (declaration/export order) and, for each export carrying
 * the brand (read via {@link getTokenContract} — direct/`hasOwnProperty`, never key
 * enumeration), appends its rich tokens in authored array order. Dedupe is two-layer:
 * a re-exported alias points at the same object (skipped by `seenObjects` within the
 * module), and a token `name` already harvested from any module is skipped (first-seen
 * wins) so a re-export alias never moves or duplicates an entry.
 */
function harvestModule(
  mod: unknown,
  harvested: RegisteredComponentToken[],
  seenNames: Set<string>,
): void {
  if (mod == null || typeof mod !== 'object') return;

  const seenObjects = new Set<unknown>();
  for (const exported of Object.values(mod as Record<string, unknown>)) {
    if (exported == null || typeof exported !== 'object') continue;
    // Same branded object reachable by two export names (re-export alias): collect once.
    if (seenObjects.has(exported)) continue;

    const tokens = getTokenContract(exported);
    if (!tokens) continue;
    seenObjects.add(exported);

    for (const token of tokens) {
      // First-seen-wins across modules (a genuine duplicate name is caught by the
      // registry's conflict throw at write time).
      if (seenNames.has(token.name)) continue;
      seenNames.add(token.name);
      harvested.push(token);
    }
  }
}

/**
 * Recursively scan a directory for *.tokens.ts / tokens.ts files, load each through the
 * injected runtime-TS resolution seam, and harvest branded results in scan order.
 */
function scanForTokenFiles(
  dir: string,
  loadModule: TsModuleLoader,
  harvested: RegisteredComponentToken[],
  seenNames: Set<string>,
): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== '__tests__' && entry.name !== 'node_modules') {
      scanForTokenFiles(fullPath, loadModule, harvested, seenNames);
    } else if (entry.isFile() && (entry.name.endsWith('.tokens.ts') || entry.name === 'tokens.ts') && !entry.name.endsWith('.test.ts')) {
      const mod = loadModule(fullPath, __filename);
      harvestModule(mod, harvested, seenNames);
    }
  }
}
