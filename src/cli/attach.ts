/**
 * `npx designerpunk attach` — attach a harness (agents + MCP config + approvals)
 * for one target (Spec 123 Task 16.2; design.md § "C20. The consumer emission
 * lane — shipped inputs only"; C1's "(new) agent layer" row; C7's manifest).
 *
 * Unlike `init` (the once-ever birth event), `attach` is SAFE TO RE-RUN: it
 * regenerates a target's agent layer and MCP wiring, and running it again on an
 * already-attached target changes nothing it would not have written identically
 * (19.8's collision rule governs what is "ours" to regenerate versus a path the
 * consumer occupies with her own content).
 *
 * **Modes** (C20):
 * - **born repo, no `--reference`** → full emission: the agent layer (charters,
 *   identity member files, skill trees, the CLAUDE.md always-layer region) for
 *   the selected target, plus that target's MCP config + approvals (all three
 *   servers — the same shape `init` emits).
 * - **`--reference`** (works regardless of birth state) → the CONSUME posture's
 *   mechanical wiring: MCP config + approvals for ONLY the docs and application
 *   servers (never `designerpunk-product`, and no agents, no birth). Writes a
 *   `posture: 'consume'` manifest, which `findDesignSystemRoot` (C2) IGNORES as
 *   a birth signal — a second `--reference` run re-runs clean, and a later
 *   `init` still births (design.md C6: "attach --reference stays CONSUME").
 * - **unborn, no `--reference`** → refuse, naming both paths (the catalog row).
 * - **partial** → the partial-case message (shared with `init`/`generate`).
 *
 * **`attach` never appears without its object** (C20, DD4) — see
 * `./shared/vocabulary.ts`'s `attachUsage()`, used at this file's dispatch
 * point (`designerpunk.ts`'s help text) and already present verbatim in
 * `initBornRepoMessage`'s catalog string.
 *
 * APPLICATION-TIME ADAPTATION (recorded in the Task 16.2 completion doc):
 * design.md's C20 "Modes" list names only `born` / `--reference` / `unborn` /
 * `partial`. `package-mode` (C2's own posture — a config without `tokenSource`)
 * is unaddressed there. This module treats `package-mode` the same as `born`
 * for `attach`'s purposes: attach is about the agent harness, not the token
 * tier, and a `package-mode` repo already has a real `designerpunk.config.ts`,
 * which is what "a design system here" means for this command. CONFIRMED by
 * the PRIMARY at Task 16.5 (DD23 made `package-mode` a posture, not a partial;
 * C20's Modes list predates that split).
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C20. The consumer emission lane"
 * @see .kiro/specs/123-consumer-distribution/design.md § "C7. `sync` … Manifest"
 */

import * as fs from 'fs';
import * as path from 'path';
import { resolvePackageRoot } from './shared/resolvePackageRoot';
import { findDesignSystemRoot } from './shared/bornRepo';
import { ensurePersonalNote, printPersonalNoteRows, PERSONAL_NOTE_TEMPLATE_REL } from './shared/personalNote';
import {
  attachUnbornRepoMessage,
  partialCaseMessage,
  restartLineSequencedMessage,
  restartLineNowMessage,
  consumerDegradationMessage,
} from './shared/errorCatalog';
import { scaffoldKiroMcpConfig } from './shared/mcpConfig/kiro';
import { scaffoldClaudeCodeMcpConfig } from './shared/mcpConfig/cc';
import type { McpConfigManifestRecorder, McpConfigTemplate, McpServerTemplateEntry } from './shared/mcpConfig/kiro';
import {
  loadManifest,
  saveManifest,
  toManifestPath,
  MANIFEST_SCHEMA_VERSION,
} from './sync/Manifest';
import type { DesignerPunkManifest, ManifestEntry, ManifestOrigin, HarnessTarget } from './sync/Manifest';
import { readContractHash } from './sync/NameContract';
import {
  regionMarkers,
  spliceRegion,
  extractRegion,
  appendRegion,
  wrapRegion,
  normalizeRegionContent,
  CLAUDE_MD_COMMENT,
  GITIGNORE_COMMENT,
} from './sync/RegionGrain';
import * as crypto from 'crypto';

interface AttachOptions {
  target?: string;
  reference?: boolean;
}

function parseAttachArgs(argv: string[]): AttachOptions {
  const opts: AttachOptions = {};
  for (const arg of argv) {
    if (arg === '--reference') {
      opts.reference = true;
    } else if (arg.startsWith('--target=')) {
      opts.target = arg.slice('--target='.length);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// The shipped consumer-entry bundle — never a `tools/` import (tsc's `rootDir`
// is `src`, and `canonical/`/`tools/` do not ship; see design.md's C9 amendment,
// 2026-09-30, Lina Q-f).
// ---------------------------------------------------------------------------

interface ConsumerEmittedFileLike {
  path: string;
  content: string;
  grain: 'file' | 'region';
}

interface EmitConsumerResultLike {
  target: string;
  mode: string;
  files: ConsumerEmittedFileLike[];
  keys: string[];
  warnings: string[];
}

interface ConsumerProfileLike {
  targets: readonly string[];
  defaultTarget: string;
}

interface ConsumerEntryModule {
  loadPackagedConsumerProfile(packageRoot: string): ConsumerProfileLike;
  emitConsumer(opts: {
    packageRoot: string;
    consumerRoot: string;
    target: string;
    mode: 'birth' | 'attach' | 'reference' | 'sync';
  }): Promise<EmitConsumerResultLike>;
}

/** Load the compiled generator bundle an installed package ships (C20, C9). */
function loadConsumerEntry(pkgRoot: string): ConsumerEntryModule {
  const bundlePath = path.join(pkgRoot, 'dist/generator/consumer-entry.js');
  if (!fs.existsSync(bundlePath)) {
    throw new Error(
      `attach: the installed package has no dist/generator/consumer-entry.js — it was packed without its ` +
        `prepack build. Run 'npm run build' in the package, or reinstall it.`
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(bundlePath) as ConsumerEntryModule;
}

/** Resolve the target to act on: the requested `--target`, else the profile's declared default (DD9). Throws, naming the declared set, on an undeclared target. `verb` names the calling command in the message (`attach` by default; `init` passes its own). */
function resolveTarget(requested: string | undefined, profile: ConsumerProfileLike, verb = 'attach'): string {
  const target = requested ?? profile.defaultTarget;
  if (!profile.targets.includes(target)) {
    throw new Error(
      `${verb}: target "${target}" is not declared by the installed package (declared: ${profile.targets.join(', ')})`
    );
  }
  return target;
}

/**
 * Load the shipped consumer-entry bundle and resolve the target against the PACKAGED consumer
 * profile (`loadConsumerProfile`'s packaged form — C12's single declared list; never a literal
 * target list). `init` calls this up front so an undeclared `--target` or an unbuilt package
 * fails before it writes anything; `emitAgentLayer` calls it again (the require is cached).
 */
function resolveAgentTarget(
  pkgRoot: string,
  requested: string | undefined,
  verb = 'attach'
): { entry: ConsumerEntryModule; target: string; profile: ConsumerProfileLike } {
  const entry = loadConsumerEntry(pkgRoot);
  const profile = entry.loadPackagedConsumerProfile(pkgRoot);
  return { entry, target: resolveTarget(requested, profile, verb), profile };
}

// ---------------------------------------------------------------------------
// Manifest helpers
// ---------------------------------------------------------------------------

function hashContent(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function readPackageVersion(pkgRoot: string): string {
  try {
    const pkgJson = JSON.parse(fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf-8'));
    return typeof pkgJson.version === 'string' ? pkgJson.version : 'unknown';
  } catch {
    return 'unknown';
  }
}

/** A brand-new manifest, for a repo `attach` meets with none yet (design.md C7's fields). */
function freshManifest(pkgRoot: string, posture: 'born' | 'consume'): DesignerPunkManifest {
  return {
    version: MANIFEST_SCHEMA_VERSION,
    posture,
    installedVersion: readPackageVersion(pkgRoot),
    contractHash: readContractHash(pkgRoot),
    attachedTargets: [],
    entries: {},
  };
}

/** Loads the manifest if present and readable, else a fresh one of `posture`. Refuses loudly on a corrupt manifest — never silently rebuilt (mirrors `sync`'s own rule; `Manifest.ts`'s header). */
function loadOrCreateManifest(repoRoot: string, pkgRoot: string, posture: 'born' | 'consume'): DesignerPunkManifest {
  const load = loadManifest(repoRoot);
  if (load.kind === 'ok') return load.manifest;
  if (load.kind === 'corrupt') {
    throw new Error(
      `attach: designerpunk.manifest.json at ${repoRoot} is not readable (${load.error}) — restore it from ` +
        `version control before running attach.`
    );
  }
  return freshManifest(pkgRoot, posture);
}

/** `McpConfigManifestRecorder` over a `DesignerPunkManifest`'s `entries` (mirrors `init.ts`'s `ManifestBuilder`, scoped to recording — `attach` updates an EXISTING manifest rather than building a fresh one). */
class AttachManifestRecorder implements McpConfigManifestRecorder {
  constructor(private readonly manifest: Pick<DesignerPunkManifest, 'entries'>) {}

  recordFile(relPath: string, absPath: string, origin: ManifestOrigin): void {
    const content = fs.readFileSync(absPath, 'utf-8');
    this.manifest.entries[toManifestPath(relPath)] = { hash: hashContent(content), grain: 'file', origin };
  }

  recordKey(relPath: string, key: string, value: unknown): void {
    const keyPath = `${toManifestPath(relPath)}#${key}`;
    this.manifest.entries[keyPath] = { hash: hashContent(JSON.stringify(value)), grain: 'key', origin: 'emitted-key' };
  }
}

function recordEntry(manifest: Pick<DesignerPunkManifest, 'entries'>, key: string, entry: ManifestEntry): void {
  manifest.entries[toManifestPath(key)] = entry;
}

// ---------------------------------------------------------------------------
// Emitted-file application — file grain (19.8's collision rule) and region
// grain (the managed-region splice, `RegionGrain.ts`, Task 16.4).
// ---------------------------------------------------------------------------

type ApplyOutcome = 'written' | 'unchanged' | 'collision';

/** Apply one `emitConsumer`-returned file-grain output. Never overwrites a path the manifest does not already attribute to DesignerPunk (Req 19.8: report the collision, never silently skip or overwrite). */
function applyFileGrain(
  repoRoot: string,
  file: ConsumerEmittedFileLike,
  manifest: Pick<DesignerPunkManifest, 'entries'>,
  adoptIdentical = false
): ApplyOutcome {
  const abs = path.join(repoRoot, file.path);
  const manifestKey = toManifestPath(file.path);
  const recorded = Object.prototype.hasOwnProperty.call(manifest.entries, manifestKey) ? manifest.entries[manifestKey] : undefined;
  // Task 16.5: a release-1 COPY on a generated path (Kiro's `.kiro/agents/<a>.json`) is ours to replace only
  // while its bytes still equal the copy recorded — an edited copy is hers (19.8: reported, never overwritten).
  const alreadyOurs =
    recorded !== undefined &&
    (recorded.origin !== 'copy' || (fs.existsSync(abs) && hashContent(fs.readFileSync(abs, 'utf-8')) === recorded.hash));
  // `adoptIdentical` (init's `--re-scaffold` over a born repo's own generated files): a path that already holds
  // EXACTLY the bytes about to be written is claimed, not reported — nothing is overwritten either way.
  const identical = adoptIdentical && fs.existsSync(abs) && fs.readFileSync(abs, 'utf-8') === file.content;

  if (fs.existsSync(abs) && !alreadyOurs && !identical) {
    console.log(
      `  ⚠️  skipped: ${file.path} already exists and was not generated by DesignerPunk — not overwriting ` +
        `(Req 19.8). Move it aside and re-run attach to let DesignerPunk generate it.`
    );
    return 'collision';
  }

  const prior = fs.existsSync(abs) ? fs.readFileSync(abs, 'utf-8') : undefined;
  recordEntry(manifest, file.path, { hash: hashContent(file.content), grain: 'file', origin: 'generated' });
  if (prior === file.content) return 'unchanged';

  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, file.content, 'utf-8');
  return 'written';
}

/**
 * Apply one `emitConsumer`-returned region-grain output (today: `CLAUDE.md`'s always-layer region — C19/C20).
 * - the file is absent → created holding only the region (markers included);
 * - the file exists with the marker pair → the region is spliced, outside bytes untouched;
 * - the file exists WITHOUT markers and the manifest records NO region for it (the first attach into a
 *   consumer's own `CLAUDE.md`) → the region is appended after her bytes, which stay in place (Task 16.5
 *   correction: 16.2 reported this as "markers missing", so a consumer with an existing `CLAUDE.md` never
 *   got the always-layer);
 * - the file exists without markers but the manifest DOES record the region → the catalog's
 *   "markers missing" string; nothing is written (she removed them — never re-appended over her choice).
 * The region entry's hash is over `normalizeRegionContent` (the form `sync` compares).
 */
function applyRegionGrain(repoRoot: string, file: ConsumerEmittedFileLike, manifest: Pick<DesignerPunkManifest, 'entries'>): ApplyOutcome {
  const abs = path.join(repoRoot, file.path);
  const markers = regionMarkers(file.path.endsWith('.md') ? CLAUDE_MD_COMMENT : GITIGNORE_COMMENT);
  const manifestKey = `${toManifestPath(file.path)}#managed`;
  const entry: ManifestEntry = { hash: hashContent(normalizeRegionContent(file.content)), grain: 'region', origin: 'generated' };

  if (!fs.existsSync(abs)) {
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, wrapRegion(markers, file.content), 'utf-8');
    recordEntry(manifest, manifestKey, entry);
    return 'written';
  }

  const existing = fs.readFileSync(abs, 'utf-8');
  const recorded = Object.prototype.hasOwnProperty.call(manifest.entries, manifestKey);
  if (!recorded && !extractRegion(existing, markers).found) {
    fs.writeFileSync(abs, appendRegion(existing, markers, file.content), 'utf-8');
    recordEntry(manifest, manifestKey, entry);
    return 'written';
  }
  const result = spliceRegion(existing, markers, file.content, file.path);
  if (!result.ok) {
    console.log(`  ⚠️  ${result.message}`);
    return 'collision';
  }
  recordEntry(manifest, manifestKey, entry);
  if (result.text === existing) return 'unchanged';

  fs.writeFileSync(abs, result.text, 'utf-8');
  return 'written';
}

function applyEmittedFile(
  repoRoot: string,
  file: ConsumerEmittedFileLike,
  manifest: Pick<DesignerPunkManifest, 'entries'>,
  adoptIdentical = false
): ApplyOutcome {
  return file.grain === 'region' ? applyRegionGrain(repoRoot, file, manifest) : applyFileGrain(repoRoot, file, manifest, adoptIdentical);
}

// ---------------------------------------------------------------------------
// MCP template
// ---------------------------------------------------------------------------

function readMcpTemplate(templatePath: string): McpConfigTemplate | null {
  if (!fs.existsSync(templatePath)) {
    console.log(`  warning: MCP config template not found at ${templatePath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(templatePath, 'utf-8'));
  } catch {
    console.log(`  warning: MCP config template at ${templatePath} is not valid JSON`);
    return null;
  }
}

/** `--reference`'s servers (C20): the docs and application servers only — never `designerpunk-product`. `sync` reads it too (a consume-posture manifest's package-side keys). */
export const REFERENCE_SERVERS: readonly string[] = Object.freeze(['designerpunk-docs', 'designerpunk-application']);

/** `--reference`'s scope (C20): the docs and application servers only — never `designerpunk-product`, and no agents. */
function referenceOnlyTemplate(template: McpConfigTemplate): McpConfigTemplate {
  const allow = new Set(REFERENCE_SERVERS);
  const mcpServers: Record<string, McpServerTemplateEntry> = {};
  for (const [key, value] of Object.entries(template.mcpServers)) {
    if (allow.has(key)) mcpServers[key] = value;
  }
  return { mcpServers };
}

function scaffoldMcpConfig(
  target: string,
  template: McpConfigTemplate,
  repoRoot: string,
  pkgRoot: string,
  recorder: McpConfigManifestRecorder
): void {
  if (target === 'kiro') {
    scaffoldKiroMcpConfig(template, path.join(repoRoot, '.kiro/settings/mcp.json'), recorder, repoRoot, pkgRoot);
  } else {
    scaffoldClaudeCodeMcpConfig(template, repoRoot, recorder, pkgRoot);
  }
}

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------

/** What `emitAgentLayer` did — the emitted file list `init` and `attach` both report (design.md C1: "It returns its emitted file list"). */
export interface AgentLayerOutcome {
  target: string;
  /** Repo-relative paths the lane wrote or found already identical (each now has a manifest entry), in emission order. Empty when the agent files were skipped. */
  files: string[];
  written: number;
  unchanged: number;
  /** Paths the consumer already occupies with content DesignerPunk did not generate (Req 19.8) — reported, never overwritten, never recorded. */
  collided: number;
  warnings: string[];
}

/**
 * THE agent-layer code path — `attach`'s full emission, and the row `init` calls for the selected
 * target (design.md C1's "(new) agent layer" row: "`attach` code path for the selected target …
 * returns its emitted file list"). One implementation, two callers: the agent layer (charters,
 * identity member files, skill trees, the `CLAUDE.md` region) through `emitConsumer`, then that
 * target's MCP config + approvals (all three servers), every file and key recorded into
 * `manifest` (`origin: 'generated'` / `'emitted-key'`), and `target` added to
 * `manifest.attachedTargets`.
 *
 * `skipAgentFiles` (`init --skip-agents`) omits the agent files AND the `attachedTargets` entry —
 * the target is MCP-wired but not "attached" (the same line `attach --reference` draws), so
 * generated-surface `sync` never expects agent files that were deliberately not emitted.
 */
export async function emitAgentLayer(opts: {
  pkgRoot: string;
  repoRoot: string;
  requestedTarget: string | undefined;
  mode: 'birth' | 'attach';
  manifest: Pick<DesignerPunkManifest, 'entries' | 'attachedTargets'>;
  verb?: string;
  skipAgentFiles?: boolean;
  /** `init` sets this: a pre-existing path holding exactly the emitted bytes is adopted into the manifest rather than reported as a collision. */
  adoptIdentical?: boolean;
}): Promise<AgentLayerOutcome> {
  const { pkgRoot, repoRoot, manifest } = opts;
  const { entry, target } = resolveAgentTarget(pkgRoot, opts.requestedTarget, opts.verb);

  const outcome: AgentLayerOutcome = { target, files: [], written: 0, unchanged: 0, collided: 0, warnings: [] };

  if (!opts.skipAgentFiles) {
    const result = await entry.emitConsumer({ packageRoot: pkgRoot, consumerRoot: repoRoot, target, mode: opts.mode });
    outcome.warnings = result.warnings;
    for (const warning of result.warnings) {
      console.log(`  ⚠️  ${warning}`);
    }
    for (const file of result.files) {
      const applied = applyEmittedFile(repoRoot, file, manifest, opts.adoptIdentical ?? false);
      if (applied === 'written') outcome.written++;
      else if (applied === 'unchanged') outcome.unchanged++;
      else outcome.collided++;
      if (applied !== 'collision') outcome.files.push(file.path);
    }
  }

  const mcpTemplate = readMcpTemplate(path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template'));
  if (mcpTemplate) {
    scaffoldMcpConfig(target, mcpTemplate, repoRoot, pkgRoot, new AttachManifestRecorder(manifest));
  }

  if (!opts.skipAgentFiles && !manifest.attachedTargets.includes(target as HarnessTarget)) {
    manifest.attachedTargets = [...manifest.attachedTargets, target as HarnessTarget];
  }

  return outcome;
}

/** The repo-relative paths an agent-layer emission for `target` would create that do not exist in `repoRoot` today — `init --re-scaffold`'s "RE-ADDED" preview (Req 15A.3). Reads the package only; writes nothing. */
export async function previewAgentLayerMissing(pkgRoot: string, repoRoot: string, requestedTarget: string | undefined): Promise<string[]> {
  const { entry, target } = resolveAgentTarget(pkgRoot, requestedTarget, 'init');
  const result = await entry.emitConsumer({ packageRoot: pkgRoot, consumerRoot: repoRoot, target, mode: 'birth' });
  return result.files.map((f) => f.path).filter((p) => !fs.existsSync(path.join(repoRoot, p)));
}

/** Full emission (born / package-mode): the agent layer + the full three-server MCP wiring, for one target. */
async function attachBorn(pkgRoot: string, repoRoot: string, requestedTarget: string | undefined): Promise<void> {
  const manifest = loadOrCreateManifest(repoRoot, pkgRoot, 'born');
  const { target, written, unchanged, collided } = await emitAgentLayer({
    pkgRoot,
    repoRoot,
    requestedTarget,
    mode: 'attach',
    manifest,
  });

  saveManifest(repoRoot, manifest);

  const parts = [`${written} file${written === 1 ? '' : 's'} written`];
  if (unchanged > 0) parts.push(`${unchanged} unchanged`);
  if (collided > 0) parts.push(`${collided} skipped (see warnings above)`);
  console.log(`✓ Attached ${target} — ${parts.join(', ')}`);

  // The personal note (C26; Task 22.1): created from the template when absent, in a born repo only — never
  // in package mode. Its rows come before the sequenced restart row, which stays the LAST next step.
  const note = ensurePersonalNote({ root: repoRoot, pkgRoot, dsState: findDesignSystemRoot(repoRoot).state });
  if (note === 'template-missing') {
    console.log(`  warning: ${consumerDegradationMessage('personal-note template', PERSONAL_NOTE_TEMPLATE_REL, 'the personal note was not created')}`);
  } else {
    printPersonalNoteRows(note, repoRoot, 'created');
  }
  console.log('');
  console.log(restartLineSequencedMessage());
}

/** `--reference`: MCP config + approvals for docs + application only, a `posture: 'consume'` manifest, no agents, no birth (C20, DD22). */
async function attachReference(pkgRoot: string, repoRoot: string, requestedTarget: string | undefined): Promise<void> {
  const entry = loadConsumerEntry(pkgRoot);
  const profile = entry.loadPackagedConsumerProfile(pkgRoot);
  const target = resolveTarget(requestedTarget, profile);

  const manifest = loadOrCreateManifest(repoRoot, pkgRoot, 'consume');

  const mcpTemplate = readMcpTemplate(path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template'));
  if (mcpTemplate) {
    scaffoldMcpConfig(target, referenceOnlyTemplate(mcpTemplate), repoRoot, pkgRoot, new AttachManifestRecorder(manifest));
  }

  saveManifest(repoRoot, manifest);

  console.log(`✓ Reference-wired ${target} — MCP config + approvals (docs + application servers), no agents`);
  console.log('');
  console.log(restartLineNowMessage());
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * The refusal `attach` (no `--reference`) gives in `repoRoot`, or `null` when it would run (born or
 * package-mode). One rule for `attach` itself and for `sync --migrate-legacy`'s attach step (Task 16.5),
 * so `sync` never offers an attach that `attach` would refuse.
 */
export function attachRefusal(repoRoot: string): { message: string; root: string } | { message: null; root: string } {
  const dsRoot = findDesignSystemRoot(repoRoot);
  if (dsRoot.state === 'unborn') return { message: attachUnbornRepoMessage(), root: repoRoot };
  if (dsRoot.state === 'partial' && dsRoot.partialCase) {
    return { message: partialCaseMessage(dsRoot.root ?? repoRoot, dsRoot.partialCase, dsRoot.attemptedTokenSource), root: repoRoot };
  }
  return { message: null, root: dsRoot.root ?? repoRoot };
}

export async function runAttach(argv: string[]): Promise<void> {
  const opts = parseAttachArgs(argv);
  const dest = process.cwd();
  const pkgRoot = resolvePackageRoot(__dirname);

  // `--reference` works regardless of birth state (C20: "unborn, or an existing
  // consume-posture repo"; the C6 "attach --reference stays CONSUME" case runs
  // it a second time over an already-wired repo too — 16.6's test).
  if (opts.reference) {
    await attachReference(pkgRoot, dest, opts.target);
    return;
  }

  const refusal = attachRefusal(dest);
  if (refusal.message !== null) {
    console.error(`❌ ${refusal.message}`);
    process.exit(1);
    return;
  }

  // born or package-mode (see this file's header note on the package-mode adaptation).
  await attachBorn(pkgRoot, refusal.root, opts.target);
}

// Re-exported for tests.
export { parseAttachArgs, resolveTarget, resolveAgentTarget, applyEmittedFile, AttachManifestRecorder, referenceOnlyTemplate };
