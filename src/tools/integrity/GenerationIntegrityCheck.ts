/**
 * GenerationIntegrityCheck — the core engine (R2; Design "shared machinery").
 *
 * Compares committed artifacts (read from disk) against a fresh generate
 * (supplied by a pluggable FreshGenerator) using semantic equality, and
 * reports divergences for classification. This is the *same* comparison the
 * audit runs first (Phase 1) and the verification runs repeatably (Phase 3) —
 * the fix's guard and the audit are one artifact.
 *
 * Task 1.1 builds this engine with the FreshGenerator injected. The real
 * generator (running `generate` to a scratch tree) lands in Task 1.2; the
 * `provisional` / `generatedVia` flags flow through from whichever generator
 * is supplied, so the documented-CLI trust gate (P7) is honoured, not faked.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  ArtifactDiff,
  ArtifactRef,
  Divergence,
  FreshGenerator,
  GenerationIntegrityCheck,
  IntegrityResult,
  IntentionalDivergenceManifest,
} from './types';
import { Normalizer } from './Normalizer';
import { SemanticComparator } from './SemanticComparator';
import { matchesManifest } from './manifest';

export class GenerationIntegrityCheckImpl implements GenerationIntegrityCheck {
  private readonly fresh: FreshGenerator;
  private readonly committedRoot: string;
  private readonly normalizer: Normalizer;
  private readonly comparator: SemanticComparator;

  constructor(
    fresh: FreshGenerator,
    committedRoot: string = process.cwd(),
    normalizer: Normalizer = new Normalizer(),
    comparator: SemanticComparator = new SemanticComparator(),
  ) {
    this.fresh = fresh;
    this.committedRoot = committedRoot;
    this.normalizer = normalizer;
    this.comparator = comparator;
  }

  run(opts: {
    inventory: ArtifactRef[];
    manifest: IntentionalDivergenceManifest;
  }): IntegrityResult {
    const diffs = opts.inventory.map((artifact) => this.diffArtifact(artifact));
    const allEqual = diffs.every((diff) =>
      diff.status === 'equal' ||
      (diff.divergences.length > 0 &&
        diff.divergences.every((d) => matchesManifest(d, opts.manifest))),
    );
    return {
      diffs,
      allEqual,
      provisional: this.fresh.provisional,
      generatedVia: this.fresh.generatedVia,
    };
  }

  private diffArtifact(artifact: ArtifactRef): ArtifactDiff {
    const committedRaw = this.readCommitted(artifact.path);
    const freshRaw = this.fresh.read(artifact.path);

    // Both absent: a non-divergence only for optional artifacts (e.g. unconfigured product tokens).
    if (committedRaw === null && freshRaw === null) {
      if (artifact.optional) return { artifact, status: 'equal', divergences: [] };
      return {
        artifact,
        status: 'missing-committed',
        divergences: [presenceDivergence(artifact, null, null)],
      };
    }
    if (committedRaw === null) {
      return {
        artifact,
        status: 'missing-committed',
        divergences: [presenceDivergence(artifact, null, freshRaw)],
      };
    }
    if (freshRaw === null) {
      return {
        artifact,
        status: 'missing-fresh',
        divergences: [presenceDivergence(artifact, committedRaw, null)],
      };
    }

    const committed = this.normalizer.normalize(committedRaw, artifact.kind);
    const fresh = this.normalizer.normalize(freshRaw, artifact.kind);
    const divergences = this.comparator.compare(artifact, committed, fresh);
    return {
      artifact,
      status: divergences.length === 0 ? 'equal' : 'diverged',
      divergences,
    };
  }

  private readCommitted(relPath: string): string | null {
    const full = path.resolve(this.committedRoot, relPath);
    try {
      return fs.readFileSync(full, 'utf-8');
    } catch (err) {
      // A missing file is a legitimate divergence (missing-committed). Any other
      // I/O error is a real problem and must fail loudly, not masquerade as drift.
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
  }
}

/** A file-presence divergence (file-not-found on one or both sides). */
function presenceDivergence(
  artifact: ArtifactRef,
  committed: string | null,
  fresh: string | null,
): Divergence {
  return {
    id: `${artifact.path}#(file-presence)`,
    artifactPath: artifact.path,
    locator: '(file-presence)',
    committedValue: committed === null ? undefined : '<present>',
    freshValue: fresh === null ? undefined : '<present>',
    dimension: artifact.path.includes('components.yaml') ? 'component-presence' : 'other',
  };
}
