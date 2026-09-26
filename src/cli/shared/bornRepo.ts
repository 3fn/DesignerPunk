/**
 * Birth detection — the root-policy table's classification primitive (Spec 123 Task 1).
 *
 * `findDesignSystemRoot` answers ONE question for every DesignerPunk-aware caller
 * (init's refusal, the MCP resolvers, the component indexer, `generate`,
 * `figma-push`/`figma-extract`): "starting from this directory, is there a
 * DesignerPunk root above (or at) it, and what shape is it?"
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C2. Birth detection"
 * @see .kiro/specs/123-consumer-distribution/design.md § "C3. The root-policy table as code"
 *
 * DELIBERATE DESIGN CHOICE — textual, never executed (C2): the tier barrel check
 * (`index.ts` / `semantic/index.ts` exporting `getAllPrimitiveTokens` /
 * `getAllSemanticTokens`) and the config's `tokenSource` key are both read as TEXT,
 * never loaded/executed. This function sits on the indexer's watch-triggered reindex
 * path (Task 1.4), which can fire on every file change — executing arbitrary consumer
 * TypeScript that often (a JWT `src/tokens/`, a broken tier) is not even a DesignerPunk
 * tier, on every such trigger, is both slow and unsafe. `ConfigLoader` itself still
 * LOADS the config for real generation (`resolveTokens`); this function mirrors only
 * ConfigLoader's BRANCHING LOGIC (`ConfigLoader.ts:123-126`) via a textual read of the
 * `tokenSource` key. This is an application-time interpretation of "resolution follows
 * ConfigLoader exactly" — flagged in the Task 1.1 completion doc, since the design text
 * does not explicitly restate "textual" for the tokenSource key the way it does for the
 * tier barrel (only the tier check is textual in the letter of C2); the same residual
 * DD3 already accepts for the tier check ("a deliberately mimicking repo... accepted;
 * mimicry is not a stranger's accident") applies here too.
 */
import * as path from 'path';
import * as fs from 'fs';
import { resolvePackageRoot } from './resolvePackageRoot';

/** The four birth states a directory walk can resolve to. */
export type BirthState = 'born' | 'package-mode' | 'partial' | 'unborn';

/** Named sub-cases of `partial` (C2). */
export type PartialCase = 'config-no-tier' | 'unused-local-tier' | 'tier-no-config' | 'manifest-only';

/** The result of walking up from a start directory looking for a DesignerPunk root. */
export interface DesignSystemRoot {
  state: BirthState;
  /** The anchoring directory; `null` iff unborn. */
  root: string | null;
  /** The LIVE tier, resolved exactly as ConfigLoader resolves it (Ada D2-B1); `null` iff no tier is live. */
  tierDir: string | null;
  partialCase?: PartialCase;
  signals: { config: boolean; tier: boolean; manifest: boolean; legacyManifest: boolean };
}

const CONFIG_FILE = 'designerpunk.config.ts';
const MANIFEST_FILE = 'designerpunk.manifest.json';
const LEGACY_MANIFEST_RELPATH = path.join('.kiro', 'sync-manifest.json');
const TOKEN_SOURCE_RELPATH = path.join('src', 'tokens');
const GIT_MARKER = '.git';

/**
 * True iff `dir` (or any of its path segments) is inside a `node_modules` tree.
 * This is what keeps `node_modules/@3fn/core/` — itself born-shaped — from ever
 * being classified as a root (C2 "Steward exemption" note; C6
 * "installed package dir is never born").
 */
function hasNodeModulesSegment(dir: string): boolean {
  return dir.split(path.sep).includes('node_modules');
}

/** True iff `.git` exists at `dir`, as either a directory (normal repo) or a file (worktree/submodule). */
function isGitBoundary(dir: string): boolean {
  return fs.existsSync(path.join(dir, GIT_MARKER));
}

/**
 * Textually check whether `source` exports `exportName` in one of the three
 * accepted forms (Ada R2 advisory, C2):
 *   1. `export function NAME(...)`
 *   2. `export const|let NAME = ...`
 *   3. `export { ..., NAME, ... } from '...'` (re-export barrel)
 */
function exportsTextually(source: string, exportName: string): boolean {
  const escaped = exportName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const functionForm = new RegExp(`export\\s+(?:async\\s+)?function\\s*\\*?\\s*${escaped}\\b`);
  const constLetForm = new RegExp(`export\\s+(?:const|let)\\s+${escaped}\\b`);
  const reExportForm = new RegExp(`export\\s*\\{[^}]*\\b${escaped}\\b[^}]*\\}\\s*from\\s*['"\`]`);
  return functionForm.test(source) || constLetForm.test(source) || reExportForm.test(source);
}

function readFileTextSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

/**
 * True iff `dir` is a DesignerPunk-shaped tier: `index.ts` textually exports
 * `getAllPrimitiveTokens`, AND `semantic/index.ts` textually exports
 * `getAllSemanticTokens` (C2). Read without loading — see this module's header.
 */
export function isDesignerPunkTier(dir: string): boolean {
  const indexText = readFileTextSafe(path.join(dir, 'index.ts'));
  if (indexText === null || !exportsTextually(indexText, 'getAllPrimitiveTokens')) return false;

  const semanticIndexText = readFileTextSafe(path.join(dir, 'semantic', 'index.ts'));
  if (semanticIndexText === null || !exportsTextually(semanticIndexText, 'getAllSemanticTokens')) return false;

  return true;
}

/**
 * Textually read the `tokenSource` key out of a `designerpunk.config.ts` file
 * (see this module's header for why this is textual, not loaded). Matches
 * `tokenSource: '<value>'` (single/double/backtick quotes), skipping lines that
 * are commented out with a leading `//`.
 */
function readConfigTokenSource(configPath: string): string | null {
  const text = readFileTextSafe(configPath);
  if (text === null) return null;

  const uncommented = text
    .split('\n')
    .filter((line) => !/^\s*\/\//.test(line))
    .join('\n');

  const match = uncommented.match(/\btokenSource\s*:\s*['"`]([^'"`]+)['"`]/);
  return match ? match[1] : null;
}

/** Read `posture` out of a manifest JSON file. Returns `null` if unreadable/absent. */
function readManifestPosture(manifestPath: string): string | null {
  const text = readFileTextSafe(manifestPath);
  if (text === null) return null;
  try {
    const parsed = JSON.parse(text) as { posture?: unknown };
    return typeof parsed.posture === 'string' ? parsed.posture : null;
  } catch {
    // Malformed JSON still counts as "the file exists" for the manifest signal —
    // we simply can't read a posture out of it, so it is treated as non-'consume'.
    return null;
  }
}

interface DirectoryEvaluation {
  /** True iff ANY birth signal fired at this directory — the walk stops here if so. */
  anySignal: boolean;
  state: BirthState;
  partialCase?: PartialCase;
  tierDir: string | null;
  signals: { config: boolean; tier: boolean; manifest: boolean; legacyManifest: boolean };
}

/**
 * Evaluate ONE directory's birth signals and classify it. Does not ascend —
 * the walk (`findDesignSystemRoot`) calls this once per level.
 */
function evaluateDirectory(dir: string, packageRoot: string): DirectoryEvaluation {
  const configPath = path.join(dir, CONFIG_FILE);
  const hasConfig = fs.existsSync(configPath);

  const tokenSourceValue = hasConfig ? readConfigTokenSource(configPath) : null;
  const hasTokenSource = tokenSourceValue !== null;

  const localTierDir = path.join(dir, TOKEN_SOURCE_RELPATH);
  const localBarrelIsTier = isDesignerPunkTier(localTierDir);

  const tokenSourceRoot = hasTokenSource ? path.resolve(dir, tokenSourceValue as string) : null;
  const tierPresentAtTokenSource = tokenSourceRoot !== null && isDesignerPunkTier(tokenSourceRoot);

  const packageOwnedTierDir = path.resolve(packageRoot, TOKEN_SOURCE_RELPATH);

  const manifestPath = path.join(dir, MANIFEST_FILE);
  const manifestExists = fs.existsSync(manifestPath);
  const manifestPosture = manifestExists ? readManifestPosture(manifestPath) : null;
  // A consume-posture manifest is IGNORED by this signal — it exists so `sync` can
  // repair the reference install's approval drift; it never counts as a birth (C2).
  const manifestSignal = manifestExists && manifestPosture !== 'consume';

  const legacyManifestSignal = fs.existsSync(path.join(dir, LEGACY_MANIFEST_RELPATH));

  const isSteward = path.resolve(dir) === path.resolve(packageRoot);

  let state: BirthState;
  let partialCase: PartialCase | undefined;
  let tierDir: string | null = null;

  if (hasConfig && hasTokenSource) {
    if (tierPresentAtTokenSource) {
      state = 'born';
      tierDir = tokenSourceRoot;
    } else {
      state = 'partial';
      partialCase = 'config-no-tier';
    }
  } else if (hasConfig) {
    // config without tokenSource.
    if (localBarrelIsTier && !isSteward) {
      // A config without tokenSource PLUS a local DesignerPunk barrel: `generate`
      // would use DesignerPunk's package tokens while the local barrel sits unused.
      state = 'partial';
      partialCase = 'unused-local-tier';
    } else {
      // Package-mode — ConfigLoader's supported no-tokenSource shape. The steward
      // exemption lands here too: at the package's own root, "the package's tree"
      // IS the local tier, so the local barrel never disqualifies package-mode.
      state = 'package-mode';
      tierDir = packageOwnedTierDir;
    }
  } else if (localBarrelIsTier) {
    state = 'partial';
    partialCase = 'tier-no-config';
  } else if (manifestSignal) {
    state = 'partial';
    partialCase = 'manifest-only';
  } else {
    state = 'unborn';
  }

  const anySignal = hasConfig || localBarrelIsTier || manifestSignal;
  const tierSignal = localBarrelIsTier || tierPresentAtTokenSource;

  return {
    anySignal,
    state,
    partialCase,
    tierDir,
    signals: {
      config: hasConfig,
      tier: tierSignal,
      manifest: manifestSignal,
      legacyManifest: legacyManifestSignal,
    },
  };
}

const UNBORN_RESULT: DesignSystemRoot = {
  state: 'unborn',
  root: null,
  tierDir: null,
  signals: { config: false, tier: false, manifest: false, legacyManifest: false },
};

/**
 * Walk up from `startDir` looking for a DesignerPunk root (C2/C3).
 *
 * Every caller passes `process.cwd()` of the invoking process — never `__dirname`,
 * never a package root. Spawned MCP servers inherit it: `spawnServer` passes no
 * `cwd` option (see `designerpunk.ts`), so `process.cwd()` there is whatever the
 * launching harness set, and that absence is load-bearing.
 *
 * At EACH level: signals are tested FIRST, then the walk checks for a stop. This
 * means the repo root, where `.git` and the config live together, IS tested before
 * the walk would otherwise stop. Any directory with a `node_modules` path segment
 * is skipped as a candidate (never classified), which is what keeps
 * `node_modules/@3fn/core/` — itself born-shaped — from ever being the root.
 *
 * @param startDir - The directory to start the walk from (see note above).
 */
export function findDesignSystemRoot(startDir: string): DesignSystemRoot {
  // resolvePackageRoot's LEVELS-UP ASSUMPTION is "two levels below the package
  // root" (e.g. `src/cli/`). This module lives one level deeper, at
  // `src/cli/shared/` — so we hand it `path.dirname(__dirname)` (`src/cli/`) as
  // the anchor, reusing the same self-checking traversal without forking it.
  const packageRoot = resolvePackageRoot(path.dirname(__dirname));
  let dir = path.resolve(startDir);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!hasNodeModulesSegment(dir)) {
      const evaluation = evaluateDirectory(dir, packageRoot);
      if (evaluation.anySignal) {
        return {
          state: evaluation.state,
          root: dir,
          tierDir: evaluation.tierDir,
          partialCase: evaluation.partialCase,
          signals: evaluation.signals,
        };
      }
    }

    // Test-then-stop: the stop check runs AFTER testing this level's signals.
    if (isGitBoundary(dir)) {
      break;
    }

    const parent = path.dirname(dir);
    if (parent === dir) {
      // Filesystem root reached with no `.git` ever found.
      break;
    }
    dir = parent;
  }

  return UNBORN_RESULT;
}
