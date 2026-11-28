/**
 * Build-info writer — the build step that records which source `dist/` came from.
 *
 * Run after `tsc`, from the compiled output:
 *
 *   node dist/build-provenance/write-build-info.js
 *
 * It writes `dist/build-info.json` (schema 1). `sourceHash` is the only field
 * the runtime decision reads (`BuildProvenance.ts`); `sourceCommit` and
 * `sourceDirty` are for a human reading the record, are best-effort, and are
 * null when git is unavailable.
 *
 * The esbuild bundle never imports this file, so the bundle carries no
 * `child_process` use from it.
 *
 * Contract: .kiro/issues/2026-11-27-mcp-build-provenance-contract.md
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { BuildInfo } from '../models';
import { BUILD_INFO_FILENAME, BUILD_INFO_SCHEMA, PACKAGE_NAME, computeSourceHash, listSourceFiles } from './BuildProvenance';

/** What git says about the source at build time; null fields when git is unavailable. */
export interface GitFacts {
  sourceCommit: string | null;
  sourceDirty: boolean | null;
}

/** Read the commit and the source set's dirtiness from git, or nulls on any failure. */
export function readGitFacts(packageDir: string): GitFacts {
  const git = (args: string[]): string =>
    execFileSync('git', args, { cwd: packageDir, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  let sourceCommit: string | null = null;
  try {
    sourceCommit = git(['rev-parse', 'HEAD']) || null;
  } catch {
    return { sourceCommit: null, sourceDirty: null };
  }
  let sourceDirty: boolean | null = null;
  try {
    const files = listSourceFiles(packageDir);
    sourceDirty = files.length > 0 && git(['status', '--porcelain', '--', ...files]).length > 0;
  } catch {
    sourceDirty = null;
  }
  return { sourceCommit, sourceDirty };
}

/** Build the record for the package whose `dist/` is `distDir`. */
export function createBuildInfo(distDir: string, gitFacts: GitFacts, now: Date = new Date()): BuildInfo {
  const packageDir = path.dirname(path.resolve(distDir));
  const { sourceHash, sourceFiles } = computeSourceHash(packageDir);
  return {
    schema: BUILD_INFO_SCHEMA,
    server: PACKAGE_NAME,
    sourceHash,
    sourceFiles,
    sourceCommit: gitFacts.sourceCommit,
    sourceDirty: gitFacts.sourceDirty,
    builtAt: now.toISOString(),
  };
}

/** Write `<distDir>/build-info.json`; returns the path and the record. */
export function writeBuildInfo(
  distDir: string,
  gitFacts: GitFacts = readGitFacts(path.dirname(path.resolve(distDir)))
): { file: string; info: BuildInfo } {
  const info = createBuildInfo(distDir, gitFacts);
  const file = path.join(path.resolve(distDir), BUILD_INFO_FILENAME);
  fs.writeFileSync(file, JSON.stringify(info, null, 2) + '\n', 'utf-8');
  return { file, info };
}

if (require.main === module) {
  // Compiled location: <package>/dist/build-provenance/write-build-info.js
  const { file, info } = writeBuildInfo(path.resolve(__dirname, '..'));
  console.log(
    `build-info: ${file} — ${info.sourceFiles} source files, ${info.sourceHash.slice(0, 19)}…, commit ${info.sourceCommit ?? 'unknown'}${info.sourceDirty ? ' (uncommitted source)' : ''}`
  );
}
