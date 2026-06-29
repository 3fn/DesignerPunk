/**
 * Legacy-Path Forwarding Manifest — frozen-artifact loader (Spec 119-A, Task 3.2).
 *
 * Loads the FROZEN `legacy-path-manifest.json` (generated against the pre-rename /
 * pre-relocation tree, checked in BEFORE Tasks 5/6) and seeds it into a
 * `DocumentIndexer` via `loadLegacyPathManifest`.
 *
 * RE-SEED OBLIGATION (Task 2.3): `indexDirectory` (and therefore `rebuildIndex`
 * and the StalenessGate rebuild) CLEARS `legacyPathIndex`. So this seed MUST run
 * AFTER each full (re-)index. `DocumentIndexer.indexDirectory` calls
 * `seedLegacyPathsFromFrozenManifest` at its tail to honor that obligation in a
 * single place that every index-build path funnels through.
 */

import * as fs from 'fs';
import * as path from 'path';
import { LegacyPathManifest } from '../models';

/** Path to the frozen, checked-in artifact (one-way gate — frozen before Tasks 5/6). */
export const FROZEN_MANIFEST_PATH = path.join(__dirname, 'legacy-path-manifest.json');

/** Read + parse the frozen manifest from disk. Returns null if absent. */
export function loadFrozenManifest(
  manifestPath: string = FROZEN_MANIFEST_PATH,
): LegacyPathManifest | null {
  if (!fs.existsSync(manifestPath)) return null;
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  return JSON.parse(raw) as LegacyPathManifest;
}

/**
 * Seed a thing-with-`loadLegacyPathManifest` from the frozen artifact. No-op when
 * the artifact is absent (pre-Task-3 state, or a deployment without it) — the
 * resolver then simply has no legacy fallback, which is the correct degraded
 * behavior (everything resolves by id / indexed-key).
 *
 * Typed structurally (not against the concrete DocumentIndexer) to avoid an
 * import cycle: indexer/DocumentIndexer.ts → legacy-path → models, while this
 * is consumed BY the indexer.
 */
export function seedLegacyPathsFromFrozenManifest(
  target: { loadLegacyPathManifest(manifest: LegacyPathManifest): void },
  manifestPath: string = FROZEN_MANIFEST_PATH,
): boolean {
  const manifest = loadFrozenManifest(manifestPath);
  if (!manifest) return false;
  target.loadLegacyPathManifest(manifest);
  return true;
}
