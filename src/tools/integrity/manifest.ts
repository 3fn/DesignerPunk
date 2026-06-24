/**
 * Intentional-divergence manifest (Design Decision D2).
 *
 * Encodes the human-ratified set of divergences that are intentional and
 * acceptable, so R2 AC3 ("every divergence classifiable and intentional")
 * is *repeatable* rather than re-judged each run. Every entry carries
 * `approvedBy` + `date` under ballot governance.
 *
 * Task 1.1 shipped an EMPTY seed: until the baseline audit (Task 1.2) and the
 * checkpoint ran, nothing was yet ratified as intentional — an empty manifest
 * means "no divergence is pre-approved," which was the correct starting posture.
 *
 * TASK 5.1 — RATIFIED END-STATE: the manifest stays EMPTY. This is not a
 * not-yet-populated placeholder; it is the confirmed correct final state.
 * Tasks 3 and 4 corrected the committed baselines to match a fresh generate
 * (Task 3: token-index OKLCH + base-scoped theme-varying; Task 4: components.yaml
 * 27→33, the 6 silently-dropped tokens recovered). With the baselines corrected,
 * the full-inventory committed-vs-fresh re-diff comes back ALL-EQUAL (0
 * divergences across all 14 artifacts — confirmed empirically in Task 5.3),
 * so there is NO intentional divergence to ratify.
 *
 * Two candidate "exceptions" were deliberately kept OUT of this manifest:
 *   - The shadow color family carrying rgba(): not a divergence at all (committed
 *     == fresh == dist; the index faithfully reproduces dist). Scoped out in the
 *     P3 invariant (see Invariants.ts), not allowlisted here. Tracked as a
 *     token-foundation follow-on:
 *     .kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md.
 *   - The 6 recovered component tokens: the committed baseline was CORRECTED to
 *     include them (Task 4), so committed == fresh — not an allowlisted exception.
 *
 * An empty-but-ratified manifest is the right outcome: a correct generation
 * pipeline has nothing to forgive. If a genuine intentional divergence is ever
 * introduced, add an entry here with `approvedBy` + `date` + `reason` under
 * ballot governance.
 */

import { minimatch } from 'minimatch';
import { Divergence, IntentionalDivergenceManifest } from './types';

/** Empty seed manifest — no divergence is pre-approved until ratified (Task 5.1). */
export const EMPTY_MANIFEST: IntentionalDivergenceManifest = {
  version: '1.0.0',
  entries: [],
};

/**
 * True when a divergence is allowlisted by a ratified manifest entry.
 * Matches `${artifactPath}#${locator}` against each entry's glob matcher.
 */
export function matchesManifest(
  divergence: Divergence,
  manifest: IntentionalDivergenceManifest,
): boolean {
  const key = `${divergence.artifactPath}#${divergence.locator}`;
  return manifest.entries.some((entry) => minimatch(key, entry.matcher));
}
