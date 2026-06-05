/**
 * Scan managed directories and compute SHA-256 content hashes.
 *
 * @see Spec 111 — Requirement 1, AC2/AC4/AC5
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export interface ManagedDir {
  path: string;
  tier: 'governance' | 'source';
  excludeDirs?: string[];
}

export const MANAGED_DIRS: ManagedDir[] = [
  { path: '.kiro/steering', tier: 'governance' },
  { path: '.kiro/agents', tier: 'governance' },
  { path: '.kiro/skills', tier: 'governance' },
  { path: 'src/tokens', tier: 'source', excludeDirs: ['__tests__'] },
  { path: 'src/types', tier: 'source', excludeDirs: ['__tests__', 'generated'] },
  { path: 'src/components/core', tier: 'source', excludeDirs: ['__tests__'] },
];

export interface ScannedFile {
  relativePath: string;
  absolutePath: string;
  hash: string;
  tier: 'governance' | 'source';
}

export function scanFiles(root: string, dirs: ManagedDir[]): ScannedFile[] {
  const results: ScannedFile[] = [];
  for (const dir of dirs) {
    const absDir = path.join(root, dir.path);
    if (!fs.existsSync(absDir)) continue;
    scanRecursive(absDir, root, dir.tier, dir.excludeDirs || [], results);
  }
  return results;
}

function scanRecursive(
  dir: string,
  root: string,
  tier: 'governance' | 'source',
  excludeDirs: string[],
  results: ScannedFile[],
): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (excludeDirs.includes(entry.name)) continue;
      scanRecursive(path.join(dir, entry.name), root, tier, excludeDirs, results);
    } else if (entry.isFile()) {
      const absolutePath = path.join(dir, entry.name);
      const relativePath = path.relative(root, absolutePath);
      const content = fs.readFileSync(absolutePath);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      results.push({ relativePath, absolutePath, hash, tier });
    }
  }
}
