/**
 * Legacy-Path Forwarding Manifest — frozen-artifact loader (Spec 119-A, Task 3.2).
 *
 * Seeds the FROZEN legacy-path manifest (generated against the pre-rename /
 * pre-relocation tree) into a `DocumentIndexer` via `loadLegacyPathManifest`.
 *
 * ARTIFACT FORMAT — TS const, NOT a runtime JSON read (Task 3, build-survival fix):
 * the manifest lives in `legacy-path-manifest.ts` as `FROZEN_LEGACY_MANIFEST`. The
 * docs MCP runs from COMPILED output (tsc `dist/` and the esbuild bundle); a
 * `fs.readFileSync(__dirname/…json)` would be ABSENT from both (neither toolchain
 * copies/inlines a runtime-read JSON), silently disabling the legacy fallback in
 * the deployed server. Importing the const makes it compile + inline natively.
 *
 * RE-SEED OBLIGATION (Task 3.2): `indexDirectory` (and therefore `rebuildIndex`
 * and the StalenessGate rebuild) CLEARS `legacyPathIndex`. So this seed MUST run
 * AFTER each full (re-)index. `DocumentIndexer.indexDirectory` calls
 * `seedLegacyPathsFromFrozenManifest` at its tail to honor that obligation in a
 * single place that every index-build path funnels through.
 */

import { LegacyPathManifest } from '../models';
import { FROZEN_LEGACY_MANIFEST } from './legacy-path-manifest';

/** Return the frozen manifest const (the deployed default seed source). */
export function loadFrozenManifest(): LegacyPathManifest {
  return FROZEN_LEGACY_MANIFEST;
}

/**
 * Seed a thing-with-`loadLegacyPathManifest` from the frozen manifest. Defaults to
 * the checked-in `FROZEN_LEGACY_MANIFEST`; tests inject a fixture manifest OBJECT
 * via `manifestOverride`. Passing `null` explicitly disables seeding (no-op) to
 * exercise the degraded "no legacy fallback" path — the resolver then resolves
 * everything by id / indexed-key, which is the correct degraded behavior.
 *
 * Typed structurally (not against the concrete DocumentIndexer) to avoid an
 * import cycle: indexer/DocumentIndexer.ts → legacy-path → models, while this
 * is consumed BY the indexer.
 */
export function seedLegacyPathsFromFrozenManifest(
  target: { loadLegacyPathManifest(manifest: LegacyPathManifest): void },
  manifestOverride: LegacyPathManifest | null | undefined = FROZEN_LEGACY_MANIFEST,
): boolean {
  const manifest = manifestOverride === undefined ? FROZEN_LEGACY_MANIFEST : manifestOverride;
  if (!manifest) return false;
  target.loadLegacyPathManifest(manifest);
  return true;
}
