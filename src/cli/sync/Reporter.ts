/**
 * Format grouped sync output for terminal display.
 *
 * @see Spec 111 — Requirement 9
 */

import type { ClassificationResult, ClassifiedFile } from './Classifier';

export interface ReportOptions {
  dryRun: boolean;
}

export function displayReport(classified: ClassificationResult, options: ReportOptions): void {
  const { new: newFiles, updatedSafe, conflicts, removed, unchanged } = classified;

  const governanceUpdates = [...newFiles, ...updatedSafe].filter(f => f.tier === 'governance');
  const sourceUpdates = [...newFiles, ...updatedSafe].filter(f => f.tier === 'source');

  if (options.dryRun) {
    console.log('🔍 Dry-run mode — no changes will be applied.\n');
  }

  // New files
  if (newFiles.length > 0) {
    console.log(`📥 New files (${newFiles.length}):`);
    for (const f of newFiles) {
      console.log(`   ${f.relativePath} [${f.tier}]`);
    }
    console.log('');
  }

  // Updated (auto-applying governance)
  if (governanceUpdates.length > 0) {
    console.log(`🔄 Governance updates — auto-applying (${governanceUpdates.length}):`);
    for (const f of governanceUpdates) {
      console.log(`   ${f.relativePath}`);
    }
    console.log('');
  }

  // Source updates (require confirmation)
  if (sourceUpdates.length > 0) {
    console.log(`📋 Source updates — confirm required (${sourceUpdates.length}):`);
    for (const f of sourceUpdates) {
      const note = f.reason ? ` (${f.reason})` : '';
      console.log(`   ${f.relativePath}${note}`);
    }
    console.log('');
  }

  // Conflicts
  if (conflicts.length > 0) {
    console.log(`⚠️  Conflicts (${conflicts.length}):`);
    for (const f of conflicts) {
      console.log(`   ${f.relativePath} — ${f.reason}`);
    }
    console.log('');
  }

  // Removed
  if (removed.length > 0) {
    console.log(`⚠️  Removed from package:`);
    for (const f of removed) {
      console.log(`   ${f.relativePath}`);
    }
    console.log('');
  }

  // Unchanged summary
  if (unchanged.length > 0) {
    console.log(`✓ ${unchanged.length} file${unchanged.length === 1 ? '' : 's'} unchanged`);
  }

  // Total summary
  if (newFiles.length === 0 && updatedSafe.length === 0 && conflicts.length === 0) {
    console.log('\n✅ Everything is up to date.');
  }
}
