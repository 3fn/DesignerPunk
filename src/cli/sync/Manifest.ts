/**
 * The DesignerPunk manifest — `designerpunk.manifest.json` at the repo root.
 *
 * Spec 123 Task 5.2 (design.md § "C7 … Manifest" + its tasks-round erratum;
 * DD21). Replaces Spec 111's `.kiro/sync-manifest.json` (now the LEGACY
 * manifest: read once, relocated, and left with a one-line pointer).
 *
 * - **Path**: the repo root, beside the config (DD21 — a tool-dotdir gitignore
 *   cannot silently remove the teammate's baseline).
 * - **Format**: stable key order and ONE ENTRY PER LINE (merge-friendly).
 *   `serializeManifest(parseManifest(text)) === text` for every file this module
 *   writes — the re-serialize-equals-file property.
 * - **Fields**: `{ version, posture, installedVersion, contractHash,
 *   attachedTargets, entries }`; each entry `{ hash, grain, origin }` keyed by
 *   `<path>` | `<path>#<region>` | `<path>#<key>`.
 * - **Pruning**: entries under de-managed paths are dropped with one report line
 *   per pruned group — never classified `removed` (D-B6).
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C7"
 */

import * as fs from 'fs';
import * as path from 'path';

export const MANIFEST_FILE = 'designerpunk.manifest.json';
export const LEGACY_MANIFEST_PATH = '.kiro/sync-manifest.json';

/** Manifest entry origin (design.md C7 erratum — Ada D-T-B2). */
export type ManifestOrigin = 'copy' | 'generated' | 'emitted-key';
export type EntryGrain = 'file' | 'region' | 'key';
export type Posture = 'born' | 'consume';
export type HarnessTarget = 'cc' | 'kiro';

export interface ManifestEntry {
  hash: string;
  grain: EntryGrain;
  origin: ManifestOrigin;
}

export interface DesignerPunkManifest {
  version: string;
  posture: Posture;
  installedVersion: string;
  contractHash: string;
  attachedTargets: HarnessTarget[];
  entries: Record<string, ManifestEntry>;
}

/** Spec 111's manifest shape (`.kiro/sync-manifest.json`). Read-only here. */
export interface LegacyManifest {
  version: string;
  syncedAt?: string;
  files: Record<string, { hash: string; managed: boolean }>;
}

/** The manifest-format schema marker written into `version` (distinct from `installedVersion`). */
export const MANIFEST_SCHEMA_VERSION = '1';

/**
 * Paths `sync` no longer manages under Model B (C7 managed-set table, rows
 * REMOVED): the consumer's token language, the types it imports, and the
 * pre-123 component copies (now the migration surface, judged against shipped
 * content — never against a manifest baseline).
 */
export const DEMANAGED_ROOTS = ['src/tokens', 'src/types', 'src/components/core'] as const;

/**
 * The release-1 (and pre-123) copy roots `sync` RECOGNIZES — the roots under
 * which an earlier `init` (release 1, U1) or Spec 111 `sync` recorded package
 * copies as `origin: 'copy'` entries. Since Task 16.5 they are NO LONGER
 * MANAGED (C7's managed-set row "`.kiro/steering`, `governance`, `.kiro/agents`,
 * `.kiro/skills` (package copies) — REMOVED", gate 4b): the package stops
 * shipping them, and `sync` never classifies, updates or re-adds a copy. A
 * `copy` entry under one of these roots is a LEGACY COPY (C7 Migration item 4):
 * reported, and offered `--migrate-legacy` only together with `attach`
 * (`Migration.ts` § "Legacy copies"). `.kiro/skills` is here for legacy
 * (Spec 111) manifests only — release-1 `init` never copied it.
 *
 * The name and membership are pinned by Spec 119-A's relocation-integrity gate
 * (leg A7, relabelled "the release-1 copy roots `sync` recognizes"): keep the
 * literal on one line.
 */
export const COPY_ROOTS = ['.kiro/agents', '.kiro/steering', 'governance', '.kiro/skills'] as const;

const TOP_LEVEL_ORDER: Array<keyof DesignerPunkManifest> = [
  'version',
  'posture',
  'installedVersion',
  'contractHash',
  'attachedTargets',
  'entries',
];
const ENTRY_FIELD_ORDER: Array<keyof ManifestEntry> = ['hash', 'grain', 'origin'];

export function getManifestPath(projectRoot: string): string {
  return path.join(projectRoot, MANIFEST_FILE);
}

export function getLegacyManifestPath(projectRoot: string): string {
  return path.join(projectRoot, LEGACY_MANIFEST_PATH);
}

/** Normalize a path to the manifest's forward-slash form. */
export function toManifestPath(relPath: string): string {
  return relPath.split(path.sep).join('/');
}

/** True iff `relPath` equals `root` or sits under it (forward-slash compare). */
export function isUnder(relPath: string, root: string): boolean {
  const p = toManifestPath(relPath);
  return p === root || p.startsWith(`${root}/`);
}

/** The file path an entry key names (`<path>`, `<path>#<region>`, `<path>#<key>` → `<path>`). */
export function entryFilePath(entryKey: string): string {
  const hashIdx = entryKey.indexOf('#');
  return hashIdx === -1 ? entryKey : entryKey.slice(0, hashIdx);
}

/**
 * Parse manifest text. Throws on invalid JSON or a missing required field —
 * a corrupt manifest is reported, never silently treated as "first sync"
 * (Spec 111 did the latter; under Model B that would re-baseline edits away).
 */
export function parseManifest(text: string): DesignerPunkManifest {
  const raw = JSON.parse(text) as Partial<DesignerPunkManifest>;
  if (!raw || typeof raw !== 'object' || typeof raw.entries !== 'object' || raw.entries === null) {
    throw new Error(`${MANIFEST_FILE} is not a DesignerPunk manifest (no "entries" object)`);
  }
  return {
    version: typeof raw.version === 'string' ? raw.version : MANIFEST_SCHEMA_VERSION,
    posture: raw.posture === 'consume' ? 'consume' : 'born',
    installedVersion: typeof raw.installedVersion === 'string' ? raw.installedVersion : '',
    contractHash: typeof raw.contractHash === 'string' ? raw.contractHash : '',
    attachedTargets: Array.isArray(raw.attachedTargets)
      ? (raw.attachedTargets.filter((t) => t === 'cc' || t === 'kiro') as HarnessTarget[])
      : [],
    entries: raw.entries as Record<string, ManifestEntry>,
  };
}

/**
 * Serialize with a stable top-level key order, entries sorted by key
 * (code-unit order — locale-independent), and ONE ENTRY PER LINE.
 */
export function serializeManifest(manifest: DesignerPunkManifest): string {
  const lines: string[] = ['{'];
  const topKeys = TOP_LEVEL_ORDER;
  topKeys.forEach((key, i) => {
    const comma = i < topKeys.length - 1 ? ',' : '';
    if (key === 'entries') {
      const entryKeys = Object.keys(manifest.entries).sort(codeUnitCompare);
      if (entryKeys.length === 0) {
        lines.push(`  "entries": {}${comma}`);
        return;
      }
      lines.push('  "entries": {');
      entryKeys.forEach((ek, j) => {
        const entry = manifest.entries[ek];
        const ordered: Record<string, unknown> = {};
        for (const f of ENTRY_FIELD_ORDER) ordered[f] = entry[f];
        const entryComma = j < entryKeys.length - 1 ? ',' : '';
        lines.push(`    ${JSON.stringify(ek)}: ${JSON.stringify(ordered)}${entryComma}`);
      });
      lines.push(`  }${comma}`);
      return;
    }
    lines.push(`  ${JSON.stringify(key)}: ${JSON.stringify(manifest[key])}${comma}`);
  });
  lines.push('}');
  return lines.join('\n') + '\n';
}

function codeUnitCompare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export type ManifestLoad =
  | { kind: 'absent' }
  | { kind: 'ok'; manifest: DesignerPunkManifest; text: string }
  | { kind: 'corrupt'; error: string };

export function loadManifest(projectRoot: string): ManifestLoad {
  const filePath = getManifestPath(projectRoot);
  if (!fs.existsSync(filePath)) return { kind: 'absent' };
  const text = fs.readFileSync(filePath, 'utf-8');
  try {
    return { kind: 'ok', manifest: parseManifest(text), text };
  } catch (err) {
    return { kind: 'corrupt', error: (err as Error).message };
  }
}

export function loadLegacyManifest(projectRoot: string): LegacyManifest | null {
  const filePath = getLegacyManifestPath(projectRoot);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (!raw || typeof raw !== 'object' || typeof raw.files !== 'object' || raw.files === null) return null;
    return raw as LegacyManifest;
  } catch {
    return null;
  }
}

/** Write the manifest. Returns true iff bytes changed (no write when identical). */
export function saveManifest(projectRoot: string, manifest: DesignerPunkManifest): boolean {
  const filePath = getManifestPath(projectRoot);
  const text = serializeManifest(manifest);
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf-8') === text) return false;
  fs.writeFileSync(filePath, text, 'utf-8');
  return true;
}

// ---------------------------------------------------------------------------
// Pruning (D-B6)
// ---------------------------------------------------------------------------

export interface PrunedGroup {
  /** The de-managed root the entries sat under (e.g. `src/tokens`). */
  root: string;
  count: number;
}

/**
 * Drop entries under DEMANAGED_ROOTS from `entries` (in place). Returns one
 * group per root with a nonzero count, in DEMANAGED_ROOTS order.
 */
export function pruneDemanaged(entries: Record<string, ManifestEntry>): PrunedGroup[] {
  const counts = new Map<string, number>();
  for (const key of Object.keys(entries)) {
    const file = entryFilePath(key);
    const root = DEMANAGED_ROOTS.find((r) => isUnder(file, r));
    if (root) {
      delete entries[key];
      counts.set(root, (counts.get(root) ?? 0) + 1);
    }
  }
  return DEMANAGED_ROOTS.filter((r) => counts.has(r)).map((r) => ({ root: r, count: counts.get(r)! }));
}

/**
 * Design catalog row "managed manifest pruned (D-B6)":
 * `no longer managing <N> files under <paths> — under the current contract they are yours (not removed from disk)`
 */
export function prunedMessage(count: number, paths: string): string {
  return `no longer managing ${count} files under ${paths} — under the current contract they are yours (not removed from disk)`;
}

/**
 * The clause appended to the `src/types` pruning line (Ada D-T-A5: a pre-123
 * consumer's copied `src/tokens` still imports `../types` relatively, so the
 * de-managed `src/types` must not read as "safe to delete"). Authored at Task
 * 5.5 (Ada); text carried unchanged from Lina's draft — it already said the
 * right thing.
 */
export const SRC_TYPES_PRUNE_CLAUSE =
  ' — keep them: your token tier still imports them through relative ../types paths, so deleting src/types breaks generate';

/** One report line per pruned group; the `src/types` line carries the D-T-A5 clause. */
export function pruneReportLines(groups: PrunedGroup[]): string[] {
  return groups.map((g) => {
    const base = prunedMessage(g.count, g.root);
    return g.root === 'src/types' ? `${base}${SRC_TYPES_PRUNE_CLAUSE}` : base;
  });
}

// ---------------------------------------------------------------------------
// Legacy (Spec 111) manifest → current format (C7 Migration step 1)
// ---------------------------------------------------------------------------

export interface LegacyConversion {
  manifest: DesignerPunkManifest;
  pruned: PrunedGroup[];
}

/**
 * Convert a Spec 111 manifest. Copy-root entries become `{ grain: 'file',
 * origin: 'copy' }` (their hash is the Spec 111 baseline — correct for these
 * untransformed files); entries under DEMANAGED_ROOTS are pruned with a report.
 * `attachedTargets` is EMPTY: no pre-123 install was attached, so no generated
 * surface is managed until `attach` records one (U2).
 *
 * The legacy `version` is the LAST SYNC — never the copy version and never the
 * installed version (C7 step 2) — so it is not carried into the new manifest.
 */
export function convertLegacyManifest(legacy: LegacyManifest, installedVersion: string): LegacyConversion {
  const entries: Record<string, ManifestEntry> = {};
  for (const [rel, e] of Object.entries(legacy.files)) {
    entries[toManifestPath(rel)] = { hash: e.hash, grain: 'file', origin: 'copy' };
  }
  const pruned = pruneDemanaged(entries);
  // Anything left outside the copy roots is not a surface sync manages; drop it
  // into its own pruned group rather than carrying an unowned entry forward.
  const stray = new Map<string, number>();
  for (const key of Object.keys(entries)) {
    if (!COPY_ROOTS.some((r) => isUnder(key, r))) {
      const root = key.split('/')[0];
      stray.set(root, (stray.get(root) ?? 0) + 1);
      delete entries[key];
    }
  }
  for (const [root, count] of stray) pruned.push({ root, count });
  return {
    manifest: {
      version: MANIFEST_SCHEMA_VERSION,
      posture: 'born',
      installedVersion,
      contractHash: '',
      attachedTargets: [],
      entries,
    },
    pruned,
  };
}

/**
 * The one-line pointer left in the legacy file for one release (C7 step 1).
 * JSON has no comment syntax, so the pointer is a leading `"//"` member; the
 * rest of the legacy content is preserved byte-for-byte in meaning.
 */
export const LEGACY_POINTER_TEXT =
  `moved to ${MANIFEST_FILE} at the repo root by 'npx designerpunk sync' — this file is no longer read and can be deleted after the next release`;

/** Returns true iff the pointer was written (false when already present or unreadable). */
export function writeLegacyPointer(projectRoot: string): boolean {
  const filePath = getLegacyManifestPath(projectRoot);
  if (!fs.existsSync(filePath)) return false;
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return false;
  }
  if (raw['//'] === LEGACY_POINTER_TEXT) return false;
  const withPointer: Record<string, unknown> = { '//': LEGACY_POINTER_TEXT };
  for (const [k, v] of Object.entries(raw)) if (k !== '//') withPointer[k] = v;
  fs.writeFileSync(filePath, JSON.stringify(withPointer, null, 2) + '\n', 'utf-8');
  return true;
}

/** True iff the legacy file already carries the relocation pointer. */
export function legacyHasPointer(projectRoot: string): boolean {
  const filePath = getLegacyManifestPath(projectRoot);
  if (!fs.existsSync(filePath)) return false;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))['//'] === LEGACY_POINTER_TEXT;
  } catch {
    return false;
  }
}
