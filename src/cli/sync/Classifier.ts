/**
 * Classify files by comparing package, project, and manifest state.
 *
 * @see Spec 111 — Requirement 2
 */

import type { ScannedFile } from './FileScanner';
import type { SyncManifest } from './Manifest';
import type { IgnoreFilter } from './IgnoreFilter';

export type FileClassification = 'new' | 'updated-safe' | 'conflict' | 'unchanged' | 'removed';

export interface ClassifiedFile {
  relativePath: string;
  classification: FileClassification;
  tier: 'governance' | 'source';
  packageHash: string;
  projectHash?: string;
  manifestHash?: string;
  reason?: string;
}

export interface ClassificationResult {
  new: ClassifiedFile[];
  updatedSafe: ClassifiedFile[];
  conflicts: ClassifiedFile[];
  unchanged: ClassifiedFile[];
  removed: ClassifiedFile[];
}

export function classifyFiles(
  packageFiles: ScannedFile[],
  projectFiles: ScannedFile[],
  manifest: SyncManifest | null,
  ignore: IgnoreFilter,
): ClassificationResult {
  const result: ClassificationResult = {
    new: [],
    updatedSafe: [],
    conflicts: [],
    unchanged: [],
    removed: [],
  };

  // Index project files by relative path for O(1) lookup
  const projectMap = new Map<string, ScannedFile>();
  for (const f of projectFiles) {
    projectMap.set(f.relativePath, f);
  }

  const manifestFiles = manifest?.files ?? {};

  // Iterate package files only (package-direction guarantee)
  for (const pkgFile of packageFiles) {
    if (ignore.isIgnored(pkgFile.relativePath)) continue;

    const projFile = projectMap.get(pkgFile.relativePath);
    const manifestEntry = manifestFiles[pkgFile.relativePath];

    if (!projFile) {
      // R2 AC1: In package but not in project → New
      result.new.push({
        relativePath: pkgFile.relativePath,
        classification: 'new',
        tier: pkgFile.tier,
        packageHash: pkgFile.hash,
      });
    } else if (pkgFile.hash === projFile.hash) {
      // R2 AC4: Package hash equals project hash → Unchanged
      result.unchanged.push({
        relativePath: pkgFile.relativePath,
        classification: 'unchanged',
        tier: pkgFile.tier,
        packageHash: pkgFile.hash,
        projectHash: projFile.hash,
        manifestHash: manifestEntry?.hash,
      });
    } else if (!manifestEntry) {
      // R2 AC5: No manifest entry + hashes differ → Conflict (first encounter)
      result.conflicts.push({
        relativePath: pkgFile.relativePath,
        classification: 'conflict',
        tier: pkgFile.tier,
        packageHash: pkgFile.hash,
        projectHash: projFile.hash,
        reason: 'no sync history (first encounter)',
      });
    } else if (manifestEntry.hash === projFile.hash) {
      // R2 AC2: Manifest matches project (consumer hasn't edited) + package differs → Updated-safe
      result.updatedSafe.push({
        relativePath: pkgFile.relativePath,
        classification: 'updated-safe',
        tier: pkgFile.tier,
        packageHash: pkgFile.hash,
        projectHash: projFile.hash,
        manifestHash: manifestEntry.hash,
        reason: 'unchanged by you — package updated',
      });
    } else {
      // R2 AC3: Manifest differs from project (consumer edited) + package differs → Conflict
      result.conflicts.push({
        relativePath: pkgFile.relativePath,
        classification: 'conflict',
        tier: pkgFile.tier,
        packageHash: pkgFile.hash,
        projectHash: projFile.hash,
        manifestHash: manifestEntry.hash,
        reason: 'locally modified',
      });
    }
  }

  // R2 AC6: Files in manifest but not in package → Removed
  for (const manifestPath of Object.keys(manifestFiles)) {
    if (ignore.isIgnored(manifestPath)) continue;
    const inPackage = packageFiles.some(f => f.relativePath === manifestPath);
    if (!inPackage) {
      result.removed.push({
        relativePath: manifestPath,
        classification: 'removed',
        tier: manifestFiles[manifestPath].managed ? 'governance' : 'source',
        packageHash: '',
        manifestHash: manifestFiles[manifestPath].hash,
        reason: 'removed from package',
      });
    }
  }

  return result;
}
