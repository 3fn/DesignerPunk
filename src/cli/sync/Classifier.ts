/**
 * File- and region-grain classification — package side vs consumer current vs
 * manifest.
 *
 * Spec 123 Task 5.4 (design.md § "C7" Classification), re-scoped at Task 16.5.
 * Reused from Spec 111's three-way comparison; changed in WHAT is managed:
 *  - only entries of ONE origin under the MANAGED roots are classified. Since
 *    Task 16.5 `sync` passes `origin: 'generated'` and the agent-layer roots the
 *    package emits for the manifest's `attachedTargets` (C7: "the package side of
 *    the generated surfaces is freshly generated, by `emitConsumer`"). The
 *    release-1 copy roots are no longer managed: a `copy` entry is a LEGACY COPY,
 *    reported by `Migration.ts`, and is never classified here — not even when a
 *    generated file lands on the same path (`.kiro/agents/<a>.json` on Kiro),
 *    which is skipped, never a `conflict`;
 *  - `deleted-by-you`: a manifest entry exists and the project lacks the file →
 *    reported, never re-added (`--restore <path>` re-adds);
 *  - `untracked-new`: no manifest entry AND no project file, for a target with
 *    nothing recorded yet (the first-sync case) → reported, NEVER APPLIED on a
 *    generated surface ("Re-adding requires `attach`, which records it");
 *  - `removed` is scoped to entries under currently managed roots (D-B6) —
 *    de-managed entries are PRUNED before classification, never `removed`.
 *
 * The default `origin` stays `'copy'`, so a caller passing no options gets the
 * U1 behavior unchanged.
 *
 * @see Spec 111 — Requirement 2; Spec 123 design.md § "C7"
 */

import type { ScannedFile } from './FileScanner';
import type { IgnoreFilter } from './IgnoreFilter';
import type { ManifestEntry, ManifestOrigin } from './Manifest';
import { COPY_ROOTS, isUnder } from './Manifest';
import { extractRegion, normalizeRegionContent } from './RegionGrain';
import type { RegionMarkers } from './RegionGrain';
import { hashBuffer } from './FileScanner';

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
  /** No manifest entry and no project file, for a surface with nothing recorded yet — REPORTED, NEVER APPLIED (C7). */
  untrackedNew: ClassifiedFile[];
  /** Unrecorded project files byte-identical to the package's — adopted into the manifest on apply. */
  adoptable: ClassifiedFile[];
  /** Manifest entries whose package file AND project file are both gone — dropped on apply. */
  dropEntries: string[];
}

export function emptyClassification(): ClassificationResult {
  return { new: [], updatedSafe: [], conflicts: [], unchanged: [], removed: [], deletedByYou: [], untrackedNew: [], adoptable: [], dropEntries: [] };
}

export interface ClassifyOptions {
  /** The entry origin this pass manages (default `'copy'` — the U1 behavior). */
  origin?: ManifestOrigin;
  /**
   * A package path with no entry and no project file is `untracked-new` (never
   * applied) when this returns true, else `new`. Default: never untracked.
   */
  untracked?: (relativePath: string) => boolean;
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
  options: ClassifyOptions = {},
): ClassificationResult {
  const origin = options.origin ?? 'copy';
  const result = emptyClassification();
  const underManaged = (p: string) => managedRoots.some((r) => isUnder(p, r));
  const projectMap = new Map(projectFiles.map((f) => [f.relativePath, f]));
  const packageMap = new Map(packageFiles.map((f) => [f.relativePath, f]));

  // 1. Every recorded entry of this origin under a managed root.
  for (const [rel, entry] of Object.entries(entries)) {
    if (entry.grain !== 'file' || entry.origin !== origin || !underManaged(rel)) continue;
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

  // 2. Package files under a managed root with no manifest entry. A path holding an
  //    entry of ANOTHER origin (a legacy copy on a generated path) is skipped too.
  for (const pkg of packageFiles) {
    const rel = pkg.relativePath;
    if (!underManaged(rel) || entries[rel] || ignore.isIgnored(rel)) continue;
    const proj = projectMap.get(rel);
    if (!proj) {
      if (options.untracked?.(rel)) result.untrackedNew.push({ relativePath: rel, classification: 'untracked-new', packageHash: pkg.hash });
      else result.new.push({ relativePath: rel, classification: 'new', packageHash: pkg.hash });
    } else if (proj.hash === pkg.hash) {
      result.adoptable.push({ relativePath: rel, classification: 'unchanged', packageHash: pkg.hash, projectHash: proj.hash });
    } else {
      result.conflicts.push({ relativePath: rel, classification: 'conflict', packageHash: pkg.hash, projectHash: proj.hash, reason: 'no sync history (first encounter)' });
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Region grain (Task 16.5; C7 rows `CLAUDE.md` / `.gitignore` — "marker region")
// ---------------------------------------------------------------------------

/** The manifest id of a file's managed region (`attach` records it). */
export function regionEntryId(file: string): string {
  return `${file}#managed`;
}

export type RegionClassification =
  | { kind: 'unchanged' | 'updated-safe' | 'conflict' | 'new' | 'untracked-new' | 'deleted-by-you' | 'adoptable' }
  | { kind: 'markers-missing' };

/**
 * Classify one managed region. `projectText` is the file's current text
 * (`undefined` when the file is absent); `packageContents` is the region the
 * package emits; `entry` is the manifest's record of it. Region hashes are over
 * `normalizeRegionContent` (the form `attach` records).
 *
 *  - recorded, file absent → `deleted-by-you`;
 *  - recorded, markers gone → `markers-missing` (the catalog string; no write);
 *  - recorded, region == package → `unchanged`; == recorded → `updated-safe`; else
 *    `conflict` (the catalog's "edited inside" row);
 *  - unrecorded, region present → `adoptable` when equal to the package's, else
 *    `conflict`;
 *  - unrecorded, no region → `untracked-new` (or `new` when the target already has
 *    recorded surfaces: `untracked` is false).
 */
export function classifyRegion(
  projectText: string | undefined,
  markers: RegionMarkers,
  packageContents: string,
  entry: ManifestEntry | undefined,
  untracked: boolean,
): RegionClassification {
  const pkg = normalizeRegionContent(packageContents);
  const extracted = projectText === undefined ? undefined : extractRegion(projectText, markers);
  if (entry) {
    if (projectText === undefined) return { kind: 'deleted-by-you' };
    if (!extracted || !extracted.found) return { kind: 'markers-missing' };
    const proj = normalizeRegionContent(extracted.region);
    if (proj === pkg) return { kind: 'unchanged' };
    return { kind: hashBuffer(proj) === entry.hash ? 'updated-safe' : 'conflict' };
  }
  if (extracted && extracted.found) {
    return { kind: normalizeRegionContent(extracted.region) === pkg ? 'adoptable' : 'conflict' };
  }
  return { kind: untracked ? 'untracked-new' : 'new' };
}
