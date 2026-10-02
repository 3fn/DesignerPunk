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
 * which is what "a design system here" means for this command. Flagged for
 * confirmation rather than silently assumed.
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C20. The consumer emission lane"
 * @see .kiro/specs/123-consumer-distribution/design.md § "C7. `sync` … Manifest"
 */

import * as fs from 'fs';
import * as path from 'path';
import { resolvePackageRoot } from './shared/resolvePackageRoot';
import { findDesignSystemRoot } from './shared/bornRepo';
import {
  attachUnbornRepoMessage,
  partialCaseMessage,
  restartLineSequencedMessage,
  restartLineNowMessage,
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
import { regionMarkers, spliceRegion, CLAUDE_MD_COMMENT, GITIGNORE_COMMENT } from './sync/RegionGrain';
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

/** Resolve the target to act on: the requested `--target`, else the profile's declared default (DD9). Throws, naming the declared set, on an undeclared target. */
function resolveTarget(requested: string | undefined, profile: ConsumerProfileLike): string {
  const target = requested ?? profile.defaultTarget;
  if (!profile.targets.includes(target)) {
    throw new Error(
      `attach: target "${target}" is not declared by the installed package (declared: ${profile.targets.join(', ')})`
    );
  }
  return target;
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
  constructor(private readonly manifest: DesignerPunkManifest) {}

  recordFile(relPath: string, absPath: string, origin: ManifestOrigin): void {
    const content = fs.readFileSync(absPath, 'utf-8');
    this.manifest.entries[toManifestPath(relPath)] = { hash: hashContent(content), grain: 'file', origin };
  }

  recordKey(relPath: string, key: string, value: unknown): void {
    const keyPath = `${toManifestPath(relPath)}#${key}`;
    this.manifest.entries[keyPath] = { hash: hashContent(JSON.stringify(value)), grain: 'key', origin: 'emitted-key' };
  }
}

function recordEntry(manifest: DesignerPunkManifest, key: string, entry: ManifestEntry): void {
  manifest.entries[toManifestPath(key)] = entry;
}

// ---------------------------------------------------------------------------
// Emitted-file application — file grain (19.8's collision rule) and region
// grain (the managed-region splice, `RegionGrain.ts`, Task 16.4).
// ---------------------------------------------------------------------------

type ApplyOutcome = 'written' | 'unchanged' | 'collision';

/** Apply one `emitConsumer`-returned file-grain output. Never overwrites a path the manifest does not already attribute to DesignerPunk (Req 19.8: report the collision, never silently skip or overwrite). */
function applyFileGrain(repoRoot: string, file: ConsumerEmittedFileLike, manifest: DesignerPunkManifest): ApplyOutcome {
  const abs = path.join(repoRoot, file.path);
  const manifestKey = toManifestPath(file.path);
  const alreadyOurs = Object.prototype.hasOwnProperty.call(manifest.entries, manifestKey);

  if (fs.existsSync(abs) && !alreadyOurs) {
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

/** Apply one `emitConsumer`-returned region-grain output (today: `CLAUDE.md`'s always-layer region — C19/C20). Creates the file WITH markers on first attach; splices the existing region on a re-run, leaving outside bytes untouched; reports (never writes) on a missing/unmatched marker pair. */
function applyRegionGrain(repoRoot: string, file: ConsumerEmittedFileLike, manifest: DesignerPunkManifest): ApplyOutcome {
  const abs = path.join(repoRoot, file.path);
  const markers = regionMarkers(file.path.endsWith('.md') ? CLAUDE_MD_COMMENT : GITIGNORE_COMMENT);
  const manifestKey = `${toManifestPath(file.path)}#managed`;

  if (!fs.existsSync(abs)) {
    const body = file.content.replace(/\n+$/, '');
    const text = body.length > 0 ? `${markers.begin}\n${body}\n${markers.end}\n` : `${markers.begin}\n${markers.end}\n`;
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, text, 'utf-8');
    recordEntry(manifest, manifestKey, { hash: hashContent(file.content), grain: 'region', origin: 'generated' });
    return 'written';
  }

  const existing = fs.readFileSync(abs, 'utf-8');
  const result = spliceRegion(existing, markers, file.content, file.path);
  if (!result.ok) {
    console.log(`  ⚠️  ${result.message}`);
    return 'collision';
  }
  recordEntry(manifest, manifestKey, { hash: hashContent(file.content), grain: 'region', origin: 'generated' });
  if (result.text === existing) return 'unchanged';

  fs.writeFileSync(abs, result.text, 'utf-8');
  return 'written';
}

function applyEmittedFile(repoRoot: string, file: ConsumerEmittedFileLike, manifest: DesignerPunkManifest): ApplyOutcome {
  return file.grain === 'region' ? applyRegionGrain(repoRoot, file, manifest) : applyFileGrain(repoRoot, file, manifest);
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

/** `--reference`'s scope (C20): the docs and application servers only — never `designerpunk-product`, and no agents. */
function referenceOnlyTemplate(template: McpConfigTemplate): McpConfigTemplate {
  const allow = new Set(['designerpunk-docs', 'designerpunk-application']);
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

/** Full emission (born / package-mode): the agent layer + the full three-server MCP wiring, for one target. */
async function attachBorn(pkgRoot: string, repoRoot: string, requestedTarget: string | undefined): Promise<void> {
  const entry = loadConsumerEntry(pkgRoot);
  const profile = entry.loadPackagedConsumerProfile(pkgRoot);
  const target = resolveTarget(requestedTarget, profile);

  const result = await entry.emitConsumer({ packageRoot: pkgRoot, consumerRoot: repoRoot, target, mode: 'attach' });
  for (const warning of result.warnings) {
    console.log(`  ⚠️  ${warning}`);
  }

  const manifest = loadOrCreateManifest(repoRoot, pkgRoot, 'born');

  let written = 0;
  let unchanged = 0;
  let collided = 0;
  for (const file of result.files) {
    const outcome = applyEmittedFile(repoRoot, file, manifest);
    if (outcome === 'written') written++;
    else if (outcome === 'unchanged') unchanged++;
    else collided++;
  }

  const mcpTemplate = readMcpTemplate(path.join(pkgRoot, 'src/cli/templates/mcp-config.json.template'));
  if (mcpTemplate) {
    scaffoldMcpConfig(target, mcpTemplate, repoRoot, pkgRoot, new AttachManifestRecorder(manifest));
  }

  if (!manifest.attachedTargets.includes(target as HarnessTarget)) {
    manifest.attachedTargets = [...manifest.attachedTargets, target as HarnessTarget];
  }

  saveManifest(repoRoot, manifest);

  const parts = [`${written} file${written === 1 ? '' : 's'} written`];
  if (unchanged > 0) parts.push(`${unchanged} unchanged`);
  if (collided > 0) parts.push(`${collided} skipped (see warnings above)`);
  console.log(`✓ Attached ${target} — ${parts.join(', ')}`);
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

  const dsRoot = findDesignSystemRoot(dest);

  if (dsRoot.state === 'unborn') {
    console.error(`❌ ${attachUnbornRepoMessage()}`);
    process.exit(1);
    return;
  }
  if (dsRoot.state === 'partial' && dsRoot.partialCase) {
    console.error(`❌ ${partialCaseMessage(dsRoot.root ?? dest, dsRoot.partialCase, dsRoot.attemptedTokenSource)}`);
    process.exit(1);
    return;
  }

  // born or package-mode (see this file's header note on the package-mode adaptation).
  await attachBorn(pkgRoot, dsRoot.root ?? dest, opts.target);
}

// Re-exported for tests.
export { parseAttachArgs, resolveTarget, applyEmittedFile, AttachManifestRecorder, referenceOnlyTemplate };
