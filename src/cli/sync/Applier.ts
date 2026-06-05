/**
 * Apply files from package to project, with tier-appropriate behavior.
 *
 * @see Spec 111 — Requirement 4, Requirement 7
 */

import * as fs from 'fs';
import * as path from 'path';
import type { ClassifiedFile } from './Classifier';
import type { SyncManifest } from './Manifest';
import { rewriteBuildImports } from '../shared/transforms';

export interface ApplyResult {
  applied: string[];
  skipped: string[];
  errors: string[];
}

/**
 * Apply a single file from package to project.
 * Applies rewriteBuildImports transform for source-tier .ts files.
 */
export function applyFile(
  file: ClassifiedFile,
  packageRoot: string,
  projectRoot: string,
  manifest: SyncManifest,
  options?: { force?: boolean },
): boolean {
  const srcPath = path.join(packageRoot, file.relativePath);
  const destPath = path.join(projectRoot, file.relativePath);

  try {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });

    const isSourceTs = file.tier === 'source' && file.relativePath.endsWith('.ts');

    if (isSourceTs) {
      const content = fs.readFileSync(srcPath, 'utf-8');
      fs.writeFileSync(destPath, rewriteBuildImports(content), 'utf-8');
    } else {
      fs.copyFileSync(srcPath, destPath);
    }

    // Update manifest
    manifest.files[file.relativePath] = {
      hash: file.packageHash,
      managed: file.tier === 'governance',
    };

    if (options?.force && file.classification === 'conflict') {
      console.log(`  ⚠️ overwritten (was locally modified): ${file.relativePath}`);
    }

    return true;
  } catch (err) {
    console.error(`  ❌ Failed to apply ${file.relativePath}: ${(err as Error).message}`);
    return false;
  }
}

/**
 * Apply governance-tier files (auto-apply without prompting).
 */
export function applyGovernance(
  files: ClassifiedFile[],
  packageRoot: string,
  projectRoot: string,
  manifest: SyncManifest,
): ApplyResult {
  const governance = files.filter(f => f.tier === 'governance');
  const result: ApplyResult = { applied: [], skipped: [], errors: [] };

  for (const file of governance) {
    if (applyFile(file, packageRoot, projectRoot, manifest)) {
      result.applied.push(file.relativePath);
    } else {
      result.errors.push(file.relativePath);
    }
  }

  return result;
}

/**
 * Apply source-tier files (after confirmation).
 */
export function applySource(
  files: ClassifiedFile[],
  packageRoot: string,
  projectRoot: string,
  manifest: SyncManifest,
): ApplyResult {
  const source = files.filter(f => f.tier === 'source');
  const result: ApplyResult = { applied: [], skipped: [], errors: [] };

  for (const file of source) {
    if (applyFile(file, packageRoot, projectRoot, manifest)) {
      result.applied.push(file.relativePath);
    } else {
      result.errors.push(file.relativePath);
    }
  }

  return result;
}

/**
 * Apply force mode — all files without prompting.
 */
export function applyForce(
  files: ClassifiedFile[],
  packageRoot: string,
  projectRoot: string,
  manifest: SyncManifest,
): ApplyResult {
  const result: ApplyResult = { applied: [], skipped: [], errors: [] };

  for (const file of files) {
    if (applyFile(file, packageRoot, projectRoot, manifest, { force: true })) {
      result.applied.push(file.relativePath);
    } else {
      result.errors.push(file.relativePath);
    }
  }

  return result;
}
