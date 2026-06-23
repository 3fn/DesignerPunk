/**
 * Intentional-divergence manifest (Design Decision D2).
 *
 * Encodes the human-ratified set of divergences that are intentional and
 * acceptable, so R2 AC3 ("every divergence classifiable and intentional")
 * is *repeatable* rather than re-judged each run. Every entry carries
 * `approvedBy` + `date` under ballot governance.
 *
 * Task 1.1 ships an EMPTY seed: until the baseline audit (Task 1.2) and the
 * checkpoint run, nothing is yet ratified as intentional — an empty manifest
 * means "no divergence is pre-approved," which is the correct starting posture.
 * The concrete entries are finalized during R2 harness completion (Task 5.1).
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
