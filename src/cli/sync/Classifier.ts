/**
 * File-grain classification — package baseline vs consumer current vs manifest.
 *
 * Spec 123 Task 5.4 (design.md § "C7" Classification). Reused from Spec 111's
 * three-way comparison; changed in WHAT is managed:
 *  - only paths under a MANAGED copy root (a root holding ≥1 manifest entry with
 *    `origin: 'copy'`) are classified;
 *  - `deleted-by-you` (NEW): a manifest entry exists and the project lacks the
 *    file → reported, never re-added (`--restore <path>` re-adds);
 *  - `removed` is scoped to entries under currently managed roots (D-B6) —
 *    de-managed entries are PRUNED before classification, never `removed`;
 *  - `untracked-new` (NEW) lives in the shared type; at file grain in U1 it has
 *    no producer (a copy root the consumer never received is simply not managed —
 *    U2's gate 4b retires these copies), so it is produced by key grain
 *    (`KeyGrain.ts`) for a generated surface that was never recorded.
 *
 * @see Spec 111 — Requirement 2; Spec 123 design.md § "C7"
 */

import type { ScannedFile } from './FileScanner';
import type { IgnoreFilter } from './IgnoreFilter';
import type { ManifestEntry } from './Manifest';
import { COPY_ROOTS, isUnder } from './Manifest';

export type FileClassification =
  | 'new'
  | 'updated-safe'
  | 'conflict'
  | 'unchanged'
  | 'removed'
  | 'deleted-by-you'
  | 'untracked-new';

export interface ClassifiedFile {
  relativePath: string;
  classification: FileClassification;
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
  deletedByYou: ClassifiedFile[];
  /** Unrecorded project files byte-identical to the package's — adopted into the manifest on apply. */
  adoptable: ClassifiedFile[];
  /** Manifest entries whose package file AND project file are both gone — dropped on apply. */
  dropEntries: string[];
}

/** The copy roots this manifest actually manages (≥1 `origin: 'copy'` file entry under the root). */
export function managedCopyRoots(entries: Record<string, ManifestEntry>): string[] {
  return COPY_ROOTS.filter((root) =>
    Object.entries(entries).some(([key, e]) => e.origin === 'copy' && e.grain === 'file' && isUnder(key, root)),
  );
}

export function classifyFiles(
  packageFiles: ScannedFile[],
  projectFiles: ScannedFile[],
  entries: Record<string, ManifestEntry>,
  ignore: IgnoreFilter,
  managedRoots: string[],
): ClassificationResult {
  const result: ClassificationResult = {
    new: [],
    updatedSafe: [],
    conflicts: [],
    unchanged: [],
    removed: [],
    deletedByYou: [],
    adoptable: [],
    dropEntries: [],
  };
  const underManaged = (p: string) => managedRoots.some((r) => isUnder(p, r));
  const projectMap = new Map(projectFiles.map((f) => [f.relativePath, f]));
  const packageMap = new Map(packageFiles.map((f) => [f.relativePath, f]));

  // 1. Every recorded copy entry under a managed root.
  for (const [rel, entry] of Object.entries(entries)) {
    if (entry.grain !== 'file' || entry.origin !== 'copy' || !underManaged(rel)) continue;
    if (ignore.isIgnored(rel)) continue;
    const pkg = packageMap.get(rel);
    const proj = projectMap.get(rel);
    if (pkg && proj) {
      if (pkg.hash === proj.hash) {
        result.unchanged.push({ relativePath: rel, classification: 'unchanged', packageHash: pkg.hash, projectHash: proj.hash, manifestHash: entry.hash });
      } else if (proj.hash === entry.hash) {
        result.updatedSafe.push({ relativePath: rel, classification: 'updated-safe', packageHash: pkg.hash, projectHash: proj.hash, manifestHash: entry.hash, reason: 'unchanged by you — package updated' });
      } else {
        result.conflicts.push({ relativePath: rel, classification: 'conflict', packageHash: pkg.hash, projectHash: proj.hash, manifestHash: entry.hash, reason: 'locally modified' });
      }
    } else if (pkg && !proj) {
      result.deletedByYou.push({ relativePath: rel, classification: 'deleted-by-you', packageHash: pkg.hash, manifestHash: entry.hash });
    } else if (!pkg && proj) {
      result.removed.push({ relativePath: rel, classification: 'removed', packageHash: '', projectHash: proj.hash, manifestHash: entry.hash, reason: 'removed from package' });
    } else {
      result.dropEntries.push(rel);
    }
  }

  // 2. Package files under a managed root with no manifest entry.
  for (const pkg of packageFiles) {
    const rel = pkg.relativePath;
    if (!underManaged(rel) || entries[rel] || ignore.isIgnored(rel)) continue;
    const proj = projectMap.get(rel);
    if (!proj) {
      result.new.push({ relativePath: rel, classification: 'new', packageHash: pkg.hash });
    } else if (proj.hash === pkg.hash) {
      result.adoptable.push({ relativePath: rel, classification: 'unchanged', packageHash: pkg.hash, projectHash: proj.hash });
    } else {
      result.conflicts.push({ relativePath: rel, classification: 'conflict', packageHash: pkg.hash, projectHash: proj.hash, reason: 'no sync history (first encounter)' });
    }
  }

  return result;
}
