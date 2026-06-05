/**
 * Parse .designerpunkignore with .gitignore-style semantics.
 *
 * @see Spec 111 — Requirement 8, AC1/AC2
 */

import * as fs from 'fs';
import * as path from 'path';
import { minimatch } from 'minimatch';

export interface IgnoreFilter {
  isIgnored(relativePath: string): boolean;
}

const IGNORE_FILE = '.designerpunkignore';

export function loadIgnoreFilter(projectRoot: string): IgnoreFilter {
  const filePath = path.join(projectRoot, IGNORE_FILE);
  if (!fs.existsSync(filePath)) {
    return { isIgnored: () => false };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const patterns = content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#'));

  return {
    isIgnored(relativePath: string): boolean {
      return patterns.some(pattern => {
        // Anchored patterns (starting with /) match from root
        if (pattern.startsWith('/')) {
          return minimatch(relativePath, pattern.slice(1), { dot: true });
        }
        // Unanchored: match against full path or basename
        return (
          minimatch(relativePath, pattern, { dot: true }) ||
          minimatch(relativePath, `**/${pattern}`, { dot: true })
        );
      });
    },
  };
}
