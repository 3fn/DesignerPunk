/**
 * `npx designerpunk sync` — Detect and apply package updates.
 *
 * Orchestrates: resolve → manifest → ignore → scan → classify → report → apply → save.
 *
 * @see Spec 111 — Requirements 1-9
 */

import { resolvePackage } from './PackageResolver';
import { scanFiles, MANAGED_DIRS } from './FileScanner';
import { loadManifest, saveManifest, bootstrapManifest } from './Manifest';
import { loadIgnoreFilter } from './IgnoreFilter';
import { classifyFiles } from './Classifier';
import { displayReport } from './Reporter';
import { resolveConflicts, confirmSourceUpdates } from './Prompter';
import { applyGovernance, applySource, applyForce, applyFile } from './Applier';
import type { SyncManifest } from './Manifest';

export interface SyncOptions {
  dryRun: boolean;
  force: boolean;
  projectRoot: string;
}

export async function runSync(options: SyncOptions): Promise<void> {
  const { dryRun, force, projectRoot } = options;

  // Non-TTY guard
  if (!process.stdin.isTTY && !force && !dryRun) {
    console.log('Non-interactive environment detected — running in dry-run mode.\n');
    return runSync({ ...options, dryRun: true });
  }

  // 1. Resolve package
  const pkg = resolvePackage(projectRoot);
  console.log(`📦 @3fn/core v${pkg.version}\n`);

  // 2. Load manifest (or null for first-time)
  let manifest = loadManifest(projectRoot);
  const isFirstSync = !manifest;

  // 3. Load ignore filter
  const ignore = loadIgnoreFilter(projectRoot);

  // 4. Scan package and project files
  const packageFiles = scanFiles(pkg.root, MANAGED_DIRS);
  const projectFiles = scanFiles(projectRoot, MANAGED_DIRS);

  // 5. Bootstrap manifest on first sync
  if (isFirstSync) {
    manifest = bootstrapManifest(projectFiles, pkg.version);
    console.log('📋 First sync — bootstrapping manifest from current project state.\n');
  }

  // 6. Classify
  const classified = classifyFiles(packageFiles, projectFiles, manifest, ignore);

  // 7. Report
  displayReport(classified, { dryRun });

  // 8. Early exit for dry-run
  if (dryRun) return;

  // 9. Apply
  const allUpdatable = [...classified.new, ...classified.updatedSafe];

  if (force) {
    // Force mode: apply everything without prompting
    const allFiles = [...allUpdatable, ...classified.conflicts];
    applyForce(allFiles, pkg.root, projectRoot, manifest!);
  } else {
    // Auto-apply governance tier
    const govResult = applyGovernance(allUpdatable, pkg.root, projectRoot, manifest!);
    if (govResult.applied.length > 0) {
      console.log(`\n  ✓ ${govResult.applied.length} governance file${govResult.applied.length === 1 ? '' : 's'} applied`);
    }

    // Confirm and apply source tier
    const sourceFiles = allUpdatable.filter(f => f.tier === 'source');
    if (sourceFiles.length > 0) {
      const confirmed = await confirmSourceUpdates(sourceFiles);
      if (confirmed) {
        applySource(allUpdatable, pkg.root, projectRoot, manifest!);
        console.log(`  ✓ ${sourceFiles.length} source file${sourceFiles.length === 1 ? '' : 's'} applied`);
      } else {
        console.log('  ⏭ Source updates skipped.');
      }
    }

    // Interactive conflict resolution
    if (classified.conflicts.length > 0) {
      const decisions = await resolveConflicts(
        classified.conflicts,
        pkg.root,
        projectRoot,
      );
      for (const d of decisions) {
        if (d.decision === 'overwrite') {
          applyFile(d.file, pkg.root, projectRoot, manifest!);
        }
      }
    }
  }

  // 10. Save manifest
  manifest!.version = pkg.version;
  manifest!.syncedAt = new Date().toISOString();
  saveManifest(projectRoot, manifest!);
  console.log('\n✅ Sync complete. Manifest updated.');
}
