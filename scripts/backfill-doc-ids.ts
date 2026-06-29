#!/usr/bin/env tsx
/**
 * backfill-doc-ids.ts — 89-doc `id` backfill codemod CLI (Spec 119-A Task 4.3).
 *
 * Thin `tsx` CLI wrapper over the testable core
 * `mcp-server/src/id-guard/backfill-doc-ids.ts`. Writes the literal `id:` (the
 * derived slug) into the frontmatter of docs that lack one — FRONTMATTER ONLY,
 * body untouched. HALTS on any derived collision before writing. Idempotent: a
 * second run finds `id:` present and skips.
 *
 *   npx tsx scripts/backfill-doc-ids.ts             # apply
 *   npx tsx scripts/backfill-doc-ids.ts --dry-run   # plan only, no writes
 *
 * After applying, the script runs the CRITICAL consistency cross-check against
 * the frozen legacy-path manifest (Task 3): every backfilled literal id MUST
 * equal the id the manifest recorded for that doc's legacy path. A mismatch is a
 * hard failure (non-zero exit) for human adjudication.
 */

import * as path from 'path';
import {
  backfillDocIds,
  BackfillCollisionError,
} from '../mcp-server/src/id-guard/backfill-doc-ids';
import { STEERING_ROOTS } from '../mcp-server/src/id-guard/check-id-uniqueness';
import {
  crossCheckManifestConsistency,
  ManifestEntry,
} from '../mcp-server/src/id-guard/manifest-consistency';
import { FROZEN_LEGACY_MANIFEST } from '../mcp-server/src/legacy-path/legacy-path-manifest';

const PROJECT_ROOT = path.resolve(__dirname, '..');

function main(): void {
  const dryRun = process.argv.includes('--dry-run');

  console.log('=== 89-doc id Backfill Codemod (Spec 119-A) ===');
  console.log(`  Mode: ${dryRun ? 'DRY-RUN (no writes)' : 'APPLY'}`);
  console.log(`  Roots: ${STEERING_ROOTS.join(', ')} (governance/ empty pre-relocation)`);

  let result;
  try {
    result = backfillDocIds([...STEERING_ROOTS], PROJECT_ROOT, { dryRun });
  } catch (err) {
    if (err instanceof BackfillCollisionError) {
      console.error('\n  HALTED — derived id collision in planned writes. Nothing written.');
      console.error(err.message);
      process.exit(1);
    }
    throw err;
  }

  console.log(`\n  Total docs scanned: ${result.totalDocs}`);
  console.log(`  Written (id: backfilled): ${result.written.length}`);
  console.log(`  Skipped (already had id:): ${result.skipped.length}`);
  console.log(`  Exceptions (idSource:'none' — NOT written, never id: ''): ${result.exceptions.length}`);
  if (result.exceptions.length > 0) {
    for (const e of result.exceptions) console.log(`    - ${e}`);
  }
  if (result.written.length > 0) {
    console.log('\n  Wrote id: into:');
    for (const w of result.written) {
      console.log(`    - ${w.relPath}  →  id: ${w.id}  [${w.idSource}]`);
    }
  }

  // --- CRITICAL consistency cross-check against the frozen manifest ----------
  // The manifest is now the compiled TS const FROZEN_LEGACY_MANIFEST (build-survival
  // fix), imported directly — no runtime JSON read / existence check needed.
  {
    const entries: ManifestEntry[] = FROZEN_LEGACY_MANIFEST.entries ?? [];
    // In dry-run the literal ids aren't on disk yet, so the cross-check would
    // report no-on-disk-id for derived docs; only meaningful post-apply.
    if (dryRun) {
      console.log('\n  (consistency cross-check skipped in dry-run — ids not yet on disk)');
    } else {
      const consistency = crossCheckManifestConsistency(entries, PROJECT_ROOT);
      console.log(`\n  === Frozen-manifest consistency cross-check ===`);
      console.log(`  Manifest entries checked: ${consistency.checked}`);
      if (consistency.ok) {
        console.log('  RESULT: PASS — every manifest id matches the on-disk literal id.');
      } else {
        console.error(`  RESULT: FAIL — ${consistency.mismatches.length} mismatch(es) (HARD FAILURE):`);
        for (const m of consistency.mismatches) {
          console.error(
            `    - ${m.legacyPath}: manifest="${m.manifestId}" onDisk="${m.onDiskId ?? '(none)'}" [${m.reason}]`,
          );
        }
        process.exit(1);
      }
    }
  }

  process.exit(0);
}

main();
