/**
 * Sync manifest — tracks what was last synced for edit detection.
 *
 * @see Spec 111 — Requirement 3
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ScannedFile } from './FileScanner';

export interface ManifestEntry {
  hash: string;
  managed: boolean; // true = governance tier
}

export interface SyncManifest {
  version: string;
  syncedAt: string;
  files: Record<string, ManifestEntry>;
}

const MANIFEST_PATH = '.kiro/sync-manifest.json';

export function getManifestPath(projectRoot: string): string {
  return path.join(projectRoot, MANIFEST_PATH);
}

export function loadManifest(projectRoot: string): SyncManifest | null {
  const filePath = getManifestPath(projectRoot);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null; // Corrupt JSON treated as first-time
  }
}

export function saveManifest(projectRoot: string, manifest: SyncManifest): void {
  const filePath = getManifestPath(projectRoot);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
}

/**
 * Bootstrap a manifest from current project state.
 * Records each project file's current hash as baseline — no conflicts on first sync.
 */
export function bootstrapManifest(
  projectFiles: ScannedFile[],
  version: string,
): SyncManifest {
  const files: Record<string, ManifestEntry> = {};
  for (const file of projectFiles) {
    files[file.relativePath] = {
      hash: file.hash,
      managed: file.tier === 'governance',
    };
  }
  return {
    version,
    syncedAt: new Date().toISOString(),
    files,
  };
}
