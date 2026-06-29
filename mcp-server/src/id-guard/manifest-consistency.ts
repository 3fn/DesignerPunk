/**
 * Backfill ↔ frozen-manifest consistency cross-check (Spec 119-A, Task 4.3 CRITICAL guard).
 *
 * Task 3 froze `legacyPath → id` mappings using the DERIVED id (slug of `name:`,
 * H1 fallback) BEFORE any literal `id:` existed on disk. Task 4.3 writes that
 * derived id as a literal `id:`. Every backfilled literal `id:` MUST exactly
 * equal the id the frozen manifest recorded for that doc — otherwise a legacy
 * prompt ref resolves to a stale/missing id and silently 404s during the
 * transition window.
 *
 * This cross-check asserts, for every doc that appears in the frozen manifest,
 * that the literal `id:` now on disk equals the manifest's `id` for that doc's
 * legacy path. Any mismatch is a HARD FAILURE reported for human adjudication.
 */

import * as fs from 'fs';
import * as path from 'path';
import { extractFrontmatterInfo } from '../indexer/frontmatter-parser';

export interface ManifestEntry {
  legacyPath: string;
  id: string;
}

export interface ConsistencyMismatch {
  legacyPath: string;
  manifestId: string;
  /** The literal `id:` on disk now (undefined if the doc has no derivable id / is missing). */
  onDiskId?: string;
  reason: 'id-differs' | 'file-missing' | 'no-on-disk-id';
}

export interface ConsistencyResult {
  ok: boolean;
  checked: number;
  mismatches: ConsistencyMismatch[];
}

/**
 * Cross-check the on-disk literal ids against the frozen manifest.
 *
 * @param manifestEntries  the frozen manifest's entries
 * @param projectRoot      repo root — legacyPath keys are resolved from here
 */
export function crossCheckManifestConsistency(
  manifestEntries: ManifestEntry[],
  projectRoot: string,
): ConsistencyResult {
  const mismatches: ConsistencyMismatch[] = [];

  for (const { legacyPath, id: manifestId } of manifestEntries) {
    const abs = path.join(projectRoot, legacyPath);
    if (!fs.existsSync(abs)) {
      mismatches.push({ legacyPath, manifestId, reason: 'file-missing' });
      continue;
    }
    const fm = extractFrontmatterInfo(fs.readFileSync(abs, 'utf-8'));
    if (!fm.id) {
      mismatches.push({ legacyPath, manifestId, reason: 'no-on-disk-id' });
      continue;
    }
    if (fm.id !== manifestId) {
      mismatches.push({
        legacyPath,
        manifestId,
        onDiskId: fm.id,
        reason: 'id-differs',
      });
    }
  }

  return {
    ok: mismatches.length === 0,
    checked: manifestEntries.length,
    mismatches,
  };
}
