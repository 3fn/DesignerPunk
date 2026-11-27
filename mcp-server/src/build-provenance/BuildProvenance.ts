/**
 * Build provenance — does the running `dist` match the source beside it?
 *
 * `tsc` writes `dist/`; nothing told a running server, or an agent asking it,
 * that `dist/` had fallen behind `src/`. Both in-repo MCP servers served
 * 2026-10-17 builds for six weeks while `get_index_health` said `healthy`
 * (Civitas health check 2026-11-27, finding H-1). `healthy` measured the index
 * against the docs, never the build against the source.
 *
 * The build writes `dist/build-info.json` (see `write-build-info.ts`) with a
 * hash of the source set. At every health read, the server hashes the source
 * set again and compares. Equal is `fresh`; different is `stale`, reported as
 * a warning beginning `build older than source`, which makes the status
 * `degraded`.
 *
 * The decision uses no git and no mtimes: it hashes file contents, so it gives
 * the same answer with uncommitted source, with no `.git`, and after a checkout
 * that touches mtimes without changing content.
 *
 * It applies only to a source checkout: a directory whose `package.json` is this
 * sub-package's and that has a `src/` tree. The esbuild bundle a consumer runs
 * (`dist/mcp/docs-mcp.js`) has neither beside it, so it reports `not-applicable`
 * — visibly, under `health.build`, never by omission.
 *
 * Contract: .kiro/issues/2026-11-27-mcp-build-provenance-contract.md
 *
 * This module is the docs server's own copy. The application server implements
 * the same contract in its own package; no code crosses the sub-package
 * boundary (.kiro/issues/2026-10-13-mcp-shared-code-class-charter.md § 4 rule 1).
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { BuildInfo, BuildProvenanceReport, IndexHealth } from '../models';

/** The file the build writes into `dist/`. */
export const BUILD_INFO_FILENAME = 'build-info.json';

/** The record schema this module reads and writes. */
export const BUILD_INFO_SCHEMA = 1;

/** This sub-package's `package.json` name; the applicability gate reads it. */
export const PACKAGE_NAME = '@designerpunk/mcp-documentation-server';

/** Fixed warning prefix for `stale`. Machine readers match on this prefix. */
export const STALE_WARNING_PREFIX = 'build older than source';

/** Fixed warning prefix for `unrecorded`. */
export const UNRECORDED_WARNING_PREFIX = 'build provenance unrecorded';

/** File extensions in the hashed source set. */
const SOURCE_EXTENSIONS = new Set(['.ts', '.tsx', '.json']);

/** Files outside `src/` that change what `tsc` emits. */
const EXTRA_SOURCE_FILES = ['tsconfig.json'];

/**
 * The hashed source set, as POSIX paths relative to the package directory,
 * sorted: `tsconfig.json` (when present) plus every file under `src/` with a
 * `.ts`, `.tsx` or `.json` extension, except files under a `__tests__`
 * directory and files ending `.test.ts`. Tests never run in the served process,
 * so a test-only change does not make a build stale.
 */
export function listSourceFiles(packageDir: string): string[] {
  const out: string[] = [];
  for (const rel of EXTRA_SOURCE_FILES) {
    if (isFile(path.join(packageDir, rel))) out.push(rel);
  }
  const srcDir = path.join(packageDir, 'src');
  const walk = (dir: string, relDir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (entry.name === '__tests__') continue;
        walk(abs, rel);
      } else if (entry.isFile()) {
        if (entry.name.endsWith('.test.ts')) continue;
        if (!SOURCE_EXTENSIONS.has(path.extname(entry.name))) continue;
        out.push(rel);
      }
    }
  };
  if (isDirectory(srcDir)) walk(srcDir, 'src');
  return out.sort();
}

/**
 * `sha256:<hex>` over the source set: for each file in `listSourceFiles` order,
 * the line `<relative path>\0<sha256 hex of its bytes>\n`.
 */
export function computeSourceHash(packageDir: string): { sourceHash: string; sourceFiles: number } {
  const files = listSourceFiles(packageDir);
  const outer = crypto.createHash('sha256');
  for (const rel of files) {
    const inner = crypto.createHash('sha256').update(fs.readFileSync(path.join(packageDir, rel))).digest('hex');
    outer.update(`${rel}\0${inner}\n`);
  }
  return { sourceHash: `sha256:${outer.digest('hex')}`, sourceFiles: files.length };
}

export interface CheckBuildProvenanceOptions {
  /** The directory the running build was loaded from (`__dirname` of the entry module). */
  distDir: string;
  /** The entry module's file (`__filename`). A `.ts` entry means ts-node: no build exists. */
  entryFile?: string;
}

/**
 * Decide the build-provenance state. Never throws: an unexpected error is
 * reported as `unrecorded`, with the error in the reason.
 */
export function checkBuildProvenance(options: CheckBuildProvenanceOptions): BuildProvenanceReport {
  const distDir = path.resolve(options.distDir);
  try {
    if (options.entryFile && /\.tsx?$/.test(options.entryFile)) {
      return { state: 'not-applicable', reason: 'running from TypeScript source; there is no build to compare', distDir };
    }

    const packageDir = path.dirname(distDir);
    const manifestName = readPackageName(path.join(packageDir, 'package.json'));
    if (manifestName !== PACKAGE_NAME) {
      return {
        state: 'not-applicable',
        reason: `no ${PACKAGE_NAME} package.json beside the build (a packaged bundle or a consumer install)`,
        distDir,
      };
    }
    if (!isDirectory(path.join(packageDir, 'src'))) {
      return { state: 'not-applicable', reason: 'no src/ tree beside the build', distDir };
    }

    const current = computeSourceHash(packageDir);
    const infoPath = path.join(distDir, BUILD_INFO_FILENAME);
    if (!isFile(infoPath)) {
      return {
        state: 'unrecorded',
        reason: `${BUILD_INFO_FILENAME} is missing from ${distDir}; the build predates the provenance contract or did not run its build-info step`,
        distDir,
        current,
      };
    }

    let info: BuildInfo;
    try {
      info = JSON.parse(fs.readFileSync(infoPath, 'utf-8')) as BuildInfo;
    } catch (error) {
      return { state: 'unrecorded', reason: `${BUILD_INFO_FILENAME} is not valid JSON: ${errorText(error)}`, distDir, current };
    }
    const shapeProblem = describeShapeProblem(info);
    if (shapeProblem) {
      return { state: 'unrecorded', reason: `${BUILD_INFO_FILENAME} ${shapeProblem}`, distDir, current };
    }

    const recorded = {
      sourceHash: info.sourceHash,
      sourceFiles: info.sourceFiles,
      sourceCommit: info.sourceCommit,
      sourceDirty: info.sourceDirty,
      builtAt: info.builtAt,
    };
    if (info.sourceHash === current.sourceHash) {
      return { state: 'fresh', reason: 'the build was made from the source now beside it', distDir, recorded, current };
    }
    return {
      state: 'stale',
      reason: 'the source has changed since the build was made',
      distDir,
      recorded,
      current,
    };
  } catch (error) {
    return { state: 'unrecorded', reason: `provenance check failed: ${errorText(error)}`, distDir };
  }
}

/**
 * The warning a report adds to an IndexHealth, or null when it adds none.
 * `stale` and `unrecorded` warn (and so degrade); `fresh` and `not-applicable` do not.
 */
export function provenanceWarning(report: BuildProvenanceReport): string | null {
  const pkg = path.basename(path.dirname(report.distDir));
  const remedy = `run \`npm run build\` in ${pkg}/, then restart the server`;
  if (report.state === 'stale') {
    const r = report.recorded!;
    const built = `built ${r.builtAt} from commit ${r.sourceCommit ? r.sourceCommit.slice(0, 9) : 'unknown'}${r.sourceDirty ? ' with uncommitted source' : ''}`;
    return `${STALE_WARNING_PREFIX}: ${built}; ${report.reason} — ${remedy}`;
  }
  if (report.state === 'unrecorded') {
    return `${UNRECORDED_WARNING_PREFIX}: ${report.reason} — ${remedy}`;
  }
  return null;
}

/**
 * Attach a report to a health result: set `health.build`, append the warning
 * (if any), and move a `healthy` status to `degraded`. A `failed` status stays
 * `failed`. Mutates and returns `health`.
 */
export function applyBuildProvenance(health: IndexHealth, report: BuildProvenanceReport): IndexHealth {
  health.build = report;
  const warning = provenanceWarning(report);
  if (warning) {
    health.warnings.push(warning);
    if (health.status === 'healthy') health.status = 'degraded';
  }
  return health;
}

function describeShapeProblem(info: unknown): string | null {
  if (!info || typeof info !== 'object') return 'is not an object';
  const i = info as Partial<BuildInfo>;
  if (i.schema !== BUILD_INFO_SCHEMA) return `has schema ${String(i.schema)}, expected ${BUILD_INFO_SCHEMA}`;
  if (i.server !== PACKAGE_NAME) return `names server ${String(i.server)}, expected ${PACKAGE_NAME}`;
  if (typeof i.sourceHash !== 'string' || !i.sourceHash.startsWith('sha256:')) return 'has no sha256 sourceHash';
  if (typeof i.builtAt !== 'string') return 'has no builtAt';
  return null;
}

function readPackageName(manifestPath: string): string | null {
  if (!isFile(manifestPath)) return null;
  try {
    const parsed = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) as { name?: unknown };
    return typeof parsed.name === 'string' ? parsed.name : null;
  } catch {
    return null;
  }
}

function isFile(p: string): boolean {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

function isDirectory(p: string): boolean {
  try {
    return fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
