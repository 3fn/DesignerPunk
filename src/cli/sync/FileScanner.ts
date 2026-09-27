/**
 * Scan directories and compute SHA-256 content hashes.
 *
 * Spec 123 Task 5.4 re-scope: there is no fixed MANAGED_DIRS list any more.
 * What `sync` manages is what the manifest recorded (C7's namespace rule), so
 * callers pass the roots to scan — in U1, the package-copy roots under which the
 * manifest holds `origin: 'copy'` entries. `src/tokens`, `src/types` and
 * `src/components/core` are never scanned for reconciliation (Req 5.8; C7's
 * REMOVED rows). The component-copy MIGRATION reads `src/components/core`
 * separately (`Migration.ts`), judged against shipped content.
 *
 * @see Spec 111 — Requirement 1 (the hashing), Spec 123 design.md § "C7"
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface ScannedFile {
  /** Forward-slash, relative to the scan root. */
  relativePath: string;
  absolutePath: string;
  hash: string;
}

export interface ScanOptions {
  /** Directory NAMES skipped at any depth (e.g. `__tests__`). */
  excludeDirs?: string[];
}

export function hashBuffer(content: Buffer | string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

export function hashFile(absolutePath: string): string {
  return hashBuffer(fs.readFileSync(absolutePath));
}

/** Scan each `relDir` under `root` (missing directories are skipped). */
export function scanFiles(root: string, relDirs: readonly string[], options: ScanOptions = {}): ScannedFile[] {
  const results: ScannedFile[] = [];
  for (const rel of relDirs) {
    const absDir = path.join(root, rel);
    if (!fs.existsSync(absDir) || !fs.statSync(absDir).isDirectory()) continue;
    scanRecursive(absDir, root, options.excludeDirs ?? [], results);
  }
  return results;
}

function scanRecursive(dir: string, root: string, excludeDirs: string[], results: ScannedFile[]): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) continue;
      scanRecursive(absolutePath, root, excludeDirs, results);
    } else if (entry.isFile()) {
      results.push({
        relativePath: path.relative(root, absolutePath).split(path.sep).join('/'),
        absolutePath,
        hash: hashFile(absolutePath),
      });
    }
  }
}
