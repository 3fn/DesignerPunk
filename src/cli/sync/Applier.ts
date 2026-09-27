/**
 * Apply package content into the project — FILE grain (copy surfaces) and KEY
 * grain (the three JSON surfaces).
 *
 * Spec 123 Task 5.4 (design.md § "C7" Apply behavior; C4 "sync's Applier source
 * branch is DELETED"): there is no source tier any more. `sync` never writes the
 * consumer's token tier (Req 5.8), so no content transform exists here — a file
 * is copied byte-for-byte, and the manifest records the hash of exactly the
 * bytes written (Spec 111 recorded the PACKAGE hash after writing TRANSFORMED
 * bytes, which read every such file as "locally modified" on the next sync).
 *
 * Callers decide WHAT applies (report first; batch confirmation or `--apply`;
 * per-path flags for `conflict` and `deleted-by-you`) — this module only writes.
 *
 * @see Spec 111 — Requirement 4; Spec 123 design.md § "C7"
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ManifestEntry } from './Manifest';
import { hashFile } from './FileScanner';
import type { KeySurface } from './KeyGrain';
import { hashKeyValue, keyEntryId, writeSurfaceKeys } from './KeyGrain';

/** Copy one package file into the project and record it (`origin: 'copy'`). */
export function applyCopyFile(
  packageRoot: string,
  projectRoot: string,
  relativePath: string,
  entries: Record<string, ManifestEntry>,
): boolean {
  const srcPath = path.join(packageRoot, relativePath);
  const destPath = path.join(projectRoot, relativePath);
  try {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    entries[relativePath] = { hash: hashFile(destPath), grain: 'file', origin: 'copy' };
    return true;
  } catch (err) {
    console.error(`  ❌ Failed to apply ${relativePath}: ${(err as Error).message}`);
    return false;
  }
}

/** Record an unrecorded, byte-identical copy (no write to the project file). */
export function adoptCopyFile(projectRoot: string, relativePath: string, entries: Record<string, ManifestEntry>): void {
  entries[relativePath] = { hash: hashFile(path.join(projectRoot, relativePath)), grain: 'file', origin: 'copy' };
}

/**
 * Set our keys into one surface and record each (`grain: 'key'`,
 * `origin: 'emitted-key'`). Returns true iff the surface file was written.
 */
export function applyKeys(
  projectRoot: string,
  surface: KeySurface,
  items: Array<{ key: string; value: unknown }>,
  entries: Record<string, ManifestEntry>,
): boolean {
  if (items.length === 0) return false;
  const wrote = writeSurfaceKeys(projectRoot, surface, items);
  for (const { key, value } of items) {
    entries[keyEntryId(surface.file, key)] = { hash: hashKeyValue(value), grain: 'key', origin: 'emitted-key' };
  }
  return wrote;
}
