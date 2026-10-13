/**
 * The `.gitignore` managed block — its content, computed ONCE, and shared by `init` and `sync`
 * (Spec 123 Task 20.2; design.md C24 and its PR-9 erratum; tasks.md Task 20, the amendment "The
 * round-trip has a target-free region source").
 *
 * The block is TARGET-FREE: unlike the agent layer and the `CLAUDE.md` region, it depends on no
 * attached harness, so `emitConsumer`'s per-target output (which `sync/index.ts`'s
 * `classifyGenerated` reads) never carries it. Its one input is the consumer's config:
 * `loadConfig(...).outputDir`.
 *
 * Content (design.md C24 § "Commit policy"):
 *  - ignores EXACTLY `token-index/` and `.designerpunk/` (the right-hand column of the commit
 *    policy);
 *  - carries, COMMENTED and with its reason, the consumer's CONFIGURED platform-output path,
 *    never a placeholder (Leonardo R2 (d)).
 *
 * Pure where it can be; the two functions that touch the world (`computeGitignoreRegion`
 * reads the config, `designerpunkDirIgnoreState` runs `git`) are named for it.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { loadConfig } from '../../config/ConfigLoader';
import type { ConfigModuleLoader } from '../../config/ConfigLoader';
import {
  GITIGNORE_COMMENT,
  appendRegion,
  extractRegion,
  normalizeRegionContent,
  regionMarkers,
  spliceRegion,
  wrapRegion,
} from '../sync/RegionGrain';
import type { ManifestEntry } from '../sync/Manifest';
import { managedRegionMarkersMissingMessage } from './errorCatalog';

/** The file the block lives in, and the manifest id of its region entry (`<file>#managed`, as `Classifier.regionEntryId`). */
export const GITIGNORE_FILE = '.gitignore';
export const GITIGNORE_REGION_ID = `${GITIGNORE_FILE}#managed`;

/** The begin/end marker pair — the `.gitignore` line-comment form of the one managed region. */
export const GITIGNORE_MARKERS = regionMarkers(GITIGNORE_COMMENT);

/** The two paths the block ignores — exactly these (design C24; the commit policy's right-hand column). */
export const GITIGNORE_IGNORED_PATHS: readonly string[] = Object.freeze(['token-index/', '.designerpunk/']);

/** The reason line above the commented platform-output path — design.md C24, verbatim. */
export const GITIGNORE_PLATFORM_OUTPUT_REASON =
  "# uncomment if your build/deploy runs 'npx designerpunk generate' — then platform output need not be committed";

/**
 * The block's content for a given platform-output directory, given REPO-ROOT-RELATIVE with `/`
 * separators (`undefined` = the directory cannot be named as an ignore line — see
 * {@link outputDirForRegion}). Pure.
 */
export function gitignoreRegionContent(outputDirRel: string | undefined): string {
  const lines: string[] = [...GITIGNORE_IGNORED_PATHS];
  if (outputDirRel !== undefined) {
    lines.push(GITIGNORE_PLATFORM_OUTPUT_REASON, `# ${outputDirRel}/`);
  }
  return lines.join('\n');
}

/**
 * The configured output directory as a `.gitignore` path: repo-root-relative, `/` separators, no
 * leading `./`, no trailing slash. `undefined` when the directory is the repo root (an ignore line
 * for it would ignore everything) or lies outside the repo (it cannot be ignored from here): the
 * commented line is then left out, never guessed.
 */
export function outputDirForRegion(projectRoot: string, outputDirAbs: string): string | undefined {
  const rel = path.relative(projectRoot, outputDirAbs).split(path.sep).join('/');
  if (rel === '' || rel === '.' || rel.startsWith('..') || path.isAbsolute(rel)) return undefined;
  return rel.replace(/\/+$/, '');
}

export type GitignoreRegionResult = { ok: true; content: string } | { ok: false; reason: string };

/**
 * Compute the block's content from the consumer's config. A config that fails to load yields
 * `{ ok: false, reason }` — the caller reports and writes NO block; it never guesses
 * `./dist/tokens` (tasks.md Task 20, R2 Lina A-2).
 */
export async function computeGitignoreRegion(projectRoot: string, configLoader?: ConfigModuleLoader): Promise<GitignoreRegionResult> {
  try {
    const config = configLoader ? await loadConfig(projectRoot, configLoader) : await loadConfig(projectRoot);
    return { ok: true, content: gitignoreRegionContent(outputDirForRegion(projectRoot, config.outputDir)) };
  } catch (err) {
    return { ok: false, reason: err instanceof Error ? err.message : String(err) };
  }
}

/** The manifest entry for the block: `grain: 'region'`, the hash over the normalized content (what `sync` compares). */
export function gitignoreRegionEntry(content: string): ManifestEntry {
  return {
    hash: crypto.createHash('sha256').update(normalizeRegionContent(content)).digest('hex'),
    grain: 'region',
    origin: 'generated',
  };
}

export type GitignoreApplyOutcome = 'written' | 'unchanged' | 'collision';

/**
 * Write the block into `<projectRoot>/.gitignore` and record its entry in `entries`.
 * Mirrors `attach.ts`'s region apply, for the one target-free region:
 *  - no `.gitignore` → created holding only the region;
 *  - the file exists, the manifest records no block and the file has no markers → the region is
 *    appended after the consumer's own bytes, which stay in place;
 *  - the markers are present → the region is spliced, outside bytes untouched;
 *  - the manifest records the block but the markers are gone → the catalog's "markers missing"
 *    string is returned and NOTHING is written (never re-appended over her choice).
 */
export function applyGitignoreRegion(
  projectRoot: string,
  content: string,
  entries: Record<string, ManifestEntry>,
): { outcome: GitignoreApplyOutcome; message?: string } {
  const abs = path.join(projectRoot, GITIGNORE_FILE);
  const entry = gitignoreRegionEntry(content);

  if (!fs.existsSync(abs)) {
    fs.writeFileSync(abs, wrapRegion(GITIGNORE_MARKERS, content), 'utf-8');
    entries[GITIGNORE_REGION_ID] = entry;
    return { outcome: 'written' };
  }

  const existing = fs.readFileSync(abs, 'utf-8');
  const recorded = Object.prototype.hasOwnProperty.call(entries, GITIGNORE_REGION_ID);
  if (!recorded && !extractRegion(existing, GITIGNORE_MARKERS).found) {
    fs.writeFileSync(abs, appendRegion(existing, GITIGNORE_MARKERS, content), 'utf-8');
    entries[GITIGNORE_REGION_ID] = entry;
    return { outcome: 'written' };
  }
  const spliced = spliceRegion(existing, GITIGNORE_MARKERS, content, GITIGNORE_FILE);
  if (!spliced.ok) return { outcome: 'collision', message: spliced.message };
  entries[GITIGNORE_REGION_ID] = entry;
  if (spliced.text === existing) return { outcome: 'unchanged' };
  fs.writeFileSync(abs, spliced.text, 'utf-8');
  return { outcome: 'written' };
}

/** Whether the `.gitignore` already holds the block's markers (a block in place, recorded or not). */
export function hasGitignoreBlock(projectRoot: string): boolean {
  const abs = path.join(projectRoot, GITIGNORE_FILE);
  if (!fs.existsSync(abs)) return false;
  return extractRegion(fs.readFileSync(abs, 'utf-8'), GITIGNORE_MARKERS).found;
}

/** The catalog's "markers missing" string for the block (re-exported so `sync` and `init` share one call site). */
export function gitignoreMarkersMissingMessage(): string {
  return managedRegionMarkersMissingMessage(GITIGNORE_FILE);
}

export type DirIgnoreState = 'ignored' | 'not-ignored' | 'unknown';

/**
 * Whether git already ignores `.designerpunk/`, DETECTED BY EFFECT (`git check-ignore -q`), not by
 * whether a block is present: a repo that ignores it in its own lines is `ignored` (tasks.md Task
 * 20, PR-9). Exit 0 → `ignored`; exit **1** → `not-ignored` (the only state that offers); anything
 * else — exit 128 (not a git repository, or an error), `git` not on PATH, a spawn failure — →
 * `unknown`: no offer, no report, nothing written (R3, Lina RC2-3).
 */
export function designerpunkDirIgnoreState(projectRoot: string): DirIgnoreState {
  const r = spawnSync('git', ['check-ignore', '-q', '.designerpunk/'], { cwd: projectRoot, stdio: 'ignore' });
  if (r.error || r.status === null) return 'unknown';
  if (r.status === 0) return 'ignored';
  if (r.status === 1) return 'not-ignored';
  return 'unknown';
}
