/**
 * Is the generated token output fresh against the inputs `generate` would read now?
 * (Spec 129 U8, design § 11, Req 5.8; `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`, R5.)
 *
 * By CONTENT: the check runs the same generation into a temporary directory and compares each
 * file it wrote, byte for byte, with the file in the output directory, outside a timestamp in a
 * header. A package upgrade shows because the header names the package version. File times are
 * not read: they move with a checkout or a copy, and said "fresh" for output written before an
 * upgrade.
 *
 * Reads and runs; writes nothing outside the temporary directory.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig, type ConfigModuleLoader } from '../config/ConfigLoader';
import type { TsModuleLoader } from '../config/scopedTsRequire';
import { generateTokenFiles } from '../generators/generateTokenFiles';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import { findDesignSystemRoot } from './shared/bornRepo';
import { resolveComponentRoots } from './shared/mcpDataRoots';
import { resolvePackageRoot } from './shared/resolvePackageRoot';
import { resolveTokens } from './resolveTokens';
import { loadComponentTokens, isPackageComponentToken } from './loadComponentTokens';
import { resolvePackageComponentSource } from './packageComponentSource';

const ISO_TIMESTAMP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?/g;

/** Output text with any ISO timestamp (a header's) taken out. */
export function withoutTimestamps(text: string): string {
  return text.replace(ISO_TIMESTAMP, '<timestamp>');
}

/** Two generated files are the same when they differ at most in a header timestamp. */
export function sameOutput(a: string, b: string): boolean {
  return withoutTimestamps(a) === withoutTimestamps(b);
}

/** Every file under `dir`, as `/`-separated paths relative to it. */
function listFiles(dir: string, rel = ''): string[] {
  const out: string[] = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...listFiles(dir, r));
    else if (e.isFile()) out.push(r);
  }
  return out.sort();
}

export interface OutputComparison {
  compared: number;
  /** Files whose content differs. */
  differing: string[];
  /** Files the fresh generation wrote that the output directory lacks. */
  missing: string[];
}

/** Compare every file in `freshDir` with the same relative file in `actualDir`. */
export function compareOutput(freshDir: string, actualDir: string): OutputComparison {
  const differing: string[] = [];
  const missing: string[] = [];
  const files = listFiles(freshDir);
  for (const f of files) {
    const actual = path.join(actualDir, f);
    if (!fs.existsSync(actual)) { missing.push(f); continue; }
    if (!sameOutput(fs.readFileSync(path.join(freshDir, f), 'utf-8'), fs.readFileSync(actual, 'utf-8'))) differing.push(f);
  }
  return { compared: files.length, differing, missing };
}

export type FreshnessOutcome =
  | { state: 'fresh'; compared: number }
  | { state: 'stale'; compared: number; differing: string[]; missing: string[] }
  /** There is no generated output to be stale (the name contract says "cannot check" for that). */
  | { state: 'no-output' }
  | { state: 'cannot-check'; reason: string };

/** The generated file the check treats as "there is output": the one the name contract reads. */
const OUTPUT_MARKER = 'DesignTokens.web.css';

export interface FreshnessOptions {
  /** The repo root, as `sync` was given it. */
  projectRoot: string;
  configLoader?: ConfigModuleLoader;
  /** The runtime-TS seam for the consumer's token source and component token files. */
  tsLoader?: TsModuleLoader;
}

/**
 * Regenerate the system token output into a temporary directory and compare it with the
 * output directory. Console output of the generation is held back; the process-wide component
 * registry is cleared before and after, because the harvest is its sole writer.
 */
export async function checkGeneratedOutputFresh(opts: FreshnessOptions): Promise<FreshnessOutcome> {
  let scratch: string | undefined;
  const saved = { log: console.log, warn: console.warn, error: console.error };
  try {
    const dsRoot = findDesignSystemRoot(opts.projectRoot);
    const root = dsRoot.root ?? opts.projectRoot;
    const config = opts.configLoader ? await loadConfig(root, opts.configLoader) : await loadConfig(root);
    if (!fs.existsSync(path.join(config.outputDir, OUTPUT_MARKER))) return { state: 'no-output' };

    scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-fresh-'));
    const packageRoot = resolvePackageRoot(__dirname);
    const sourceResult = resolvePackageComponentSource(
      resolveComponentRoots({ dsRoot, packageRoot }).roots, packageRoot, root,
    );
    console.log = console.warn = console.error = () => undefined;
    ComponentTokenRegistry.clear();
    try {
      const tokens = opts.tsLoader ? resolveTokens(config, opts.tsLoader) : resolveTokens(config);
      const packageSource = sourceResult.state === 'ready' ? sourceResult.source : undefined;
      if (opts.tsLoader) loadComponentTokens(config, opts.tsLoader, { packageSource, report: () => undefined });
      else loadComponentTokens(config, undefined, { packageSource, report: () => undefined });
      generateTokenFiles(tokens, { ...config, outputDir: scratch }, { excludeComponentTokenFromWeb: isPackageComponentToken });
    } finally {
      Object.assign(console, saved);
      ComponentTokenRegistry.clear();
    }
    const cmp = compareOutput(scratch, config.outputDir);
    return cmp.differing.length === 0 && cmp.missing.length === 0
      ? { state: 'fresh', compared: cmp.compared }
      : { state: 'stale', compared: cmp.compared, differing: cmp.differing, missing: cmp.missing };
  } catch (err) {
    Object.assign(console, saved);
    return { state: 'cannot-check', reason: err instanceof Error ? err.message.split('\n', 1)[0] : String(err) };
  } finally {
    if (scratch) fs.rmSync(scratch, { recursive: true, force: true });
  }
}
