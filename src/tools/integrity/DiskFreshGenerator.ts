/**
 * DiskFreshGenerator — a FreshGenerator that reads fresh artifacts from a
 * directory produced by a prior `generate` run (e.g. an isolated git worktree).
 *
 * Separating "run generate" (worktree lifecycle, done by the audit runner) from
 * "read fresh content" (this adapter) keeps each concern testable. Carries the
 * `generatedVia` / `provisional` flags so the documented-CLI trust gate (P7)
 * propagates honestly: a worktree generated via the ts-node workaround is
 * `provisional: true` until Finding 2 is resolved.
 */

import * as fs from 'fs';
import * as path from 'path';
import { FreshGenerator, GeneratedVia } from './types';

export class DiskFreshGenerator implements FreshGenerator {
  readonly generatedVia: GeneratedVia;
  readonly provisional: boolean;
  private readonly root: string;

  constructor(root: string, generatedVia: GeneratedVia, provisional: boolean) {
    this.root = root;
    this.generatedVia = generatedVia;
    this.provisional = provisional;
  }

  read(relPath: string): string | null {
    try {
      return fs.readFileSync(path.resolve(this.root, relPath), 'utf-8');
    } catch (err) {
      // Missing fresh artifact is a legitimate divergence; other I/O errors fail loudly.
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
  }
}
