/**
 * derive.ts — the KEY CHECKS (Spec 123 Task 13.5; design C17 L2-D1, C22, DD25).
 *
 * Task 13's Primary Artifacts name this file for its key checks; `derive()` itself (C22 — one
 * function over body and frontmatter, refusing on a stale overlay and an orphaned key, two ruled
 * call sites) lands here at Task 15.2 and calls these. Until then this file carries ONLY the two
 * refusals of Task 13's nine that 13.5 owns (exact strings in `regrounding/check-catalog.ts`):
 *
 *   ORPHANED KEY — a disposition, overlay or operative-set key that names no current unit or
 *     entry of its canonical source. Label-slug anchors and identity keys are CONTENT-DERIVED,
 *     so a canonical RENAME orphans the old key; the hash pin cannot see a rename (it pins
 *     content, not the anchor) — only this refusal does (C22).
 *   MISSING ROW — a canonical unit, frontmatter entry or shared member with no disposition row.
 *     Absence is NEVER read as `retained` (DD25): if it were, a renamed unit that was
 *     `no-consumer-counterpart` would silently ship steward text.
 *
 * WHAT A KEY MUST NAME, per section of a dispositions file (Task 13.1's shape):
 *   body:         a partition() anchor of the source body (C13);
 *   frontmatter:  a node of the source's entryTree() (C13). A key naming a list or map node
 *                 EXISTS — that it must be a LEAF is 13.1's container-key refusal, not this one;
 *   members:      a shared-catalog member `id` (source = the shared catalog).
 * Overlay keys: `@unit` → body anchor, `@entry` → entry-tree node. Operative-set record keys →
 * body anchor.
 *
 * WHAT MUST HAVE A ROW (the missing-row population):
 *   charter dispositions (no `counterpart:`)  → every body unit + every entry-tree LEAF;
 *   always-set dispositions (`counterpart:`)  → every body unit only — the shipped identity doc's
 *                                                frontmatter is DROPPED, never carried (C19);
 *   the shared-catalog file                   → every member id.
 * Operative-set records are NOT row files: a record need not cover every unit (it records the
 * units whose sets were confirmed), so only orphans apply to them. Overlays likewise: only
 * re-pointed units carry an overlay entry.
 *
 * WHAT THIS DOES NOT ESTABLISH: that a row's term or fields are valid (13.1's schema); that a
 * pin is fresh (13.2's stale-overlay check); that a destination derives (Task 14).
 *
 * Traces to: Req 11.2, 11.3.6; design C13, C17 (L2-D1), C19, C22, DD25.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from './frontmatter';
import { entryTree, partition } from './partition';
import { CONSUMER_OUTPUT_ROOT } from './consumer-profile';
import { fillTemplate, nineCheck } from './regrounding/check-catalog';
import { SHARED_CATALOG } from './regrounding/dispositions';
import { hashEntry } from './regrounding/hash';

export type KeyCheckId = 'orphaned-key' | 'missing-row';

export interface KeyFinding {
  check: KeyCheckId;
  /** The file holding (or lacking) the key: a dispositions file, an overlay, or a record. */
  file: string;
  /** `<section> <key>` — body / frontmatter / members / overlay-unit / overlay-entry / record. */
  key: string;
  message: string;
}

/** The current keys a canonical source offers. */
export interface KeyUniverse {
  /** The canonical source path the keys index into (named in the messages). */
  source: string;
  /** partition() anchors of the body, in order. */
  units: readonly string[];
  /** Every entryTree() node id (containers included) — what a frontmatter key may name. */
  entryNodes: ReadonlySet<string>;
  /** entryTree() LEAF paths, in order — the frontmatter rows that must exist. */
  entryLeaves: readonly string[];
  /** Shared-catalog member ids (only for the shared catalog). */
  members: readonly string[];
}

export const orphanedKeyMessage = (k: string, file: string): string => fillTemplate(nineCheck('orphaned-key').template, { k, file });
export const missingRowMessage = (unitOrEntry: string, file: string): string =>
  fillTemplate(nineCheck('missing-row').template, { 'unit|entry': unitOrEntry, file });

/** Read a canonical source's key universe from disk. */
export function keyUniverse(repoRoot: string, source: string): KeyUniverse {
  const text = fs.readFileSync(path.join(repoRoot, source), 'utf8');
  if (source === SHARED_CATALOG) {
    const doc = loadYaml(text) as { members?: { id?: unknown }[] };
    const members = (doc?.members ?? []).map((m) => m?.id).filter((id): id is string => typeof id === 'string');
    return { source, units: [], entryNodes: new Set(), entryLeaves: [], members };
  }
  const { frontmatter, body } = splitFrontmatter(text, source);
  const tree = entryTree(frontmatter ?? {});
  return {
    source,
    units: partition(body).units.map((u) => u.anchor),
    entryNodes: new Set([...tree.nodes.keys()].filter((id) => id !== tree.root)),
    entryLeaves: tree.units.map((l) => l.path),
    members: [],
  };
}

type Rows = Readonly<Record<string, unknown>> | undefined;

export interface RowFile {
  source?: unknown;
  counterpart?: unknown;
  body?: Rows;
  frontmatter?: Rows;
  members?: Rows;
}

/**
 * ORPHANED KEY + MISSING ROW over one dispositions file (`file` = its path), against the key
 * universe of its `source:`. Findings are in section order; orphans before missing rows.
 */
export function checkDispositionKeys(doc: RowFile, file: string, universe: KeyUniverse): KeyFinding[] {
  const findings: KeyFinding[] = [];
  const units = new Set(universe.units);
  const members = new Set(universe.members);
  const orphan = (section: string, key: string): void => {
    findings.push({ check: 'orphaned-key', file, key: `${section} ${key}`, message: orphanedKeyMessage(key, universe.source) });
  };
  const missing = (section: string, key: string): void => {
    findings.push({ check: 'missing-row', file, key: `${section} ${key}`, message: missingRowMessage(key, universe.source) });
  };

  const body = Object.keys(doc.body ?? {});
  const frontmatter = Object.keys(doc.frontmatter ?? {});
  const memberKeys = Object.keys(doc.members ?? {});
  for (const key of body) if (!units.has(key)) orphan('body', key);
  for (const key of frontmatter) if (!universe.entryNodes.has(key)) orphan('frontmatter', key);
  for (const key of memberKeys) if (!members.has(key)) orphan('members', key);

  if (universe.source === SHARED_CATALOG) {
    const have = new Set(memberKeys);
    for (const id of universe.members) if (!have.has(id)) missing('members', id);
    return findings;
  }
  const haveBody = new Set(body);
  for (const anchor of universe.units) if (!haveBody.has(anchor)) missing('body', anchor);
  if (doc.counterpart === undefined) {
    const haveEntries = new Set(frontmatter);
    for (const leaf of universe.entryLeaves) if (!haveEntries.has(leaf)) missing('frontmatter', leaf);
  }
  return findings;
}

/** ORPHANED KEY over an overlay's keys (`@unit` → body anchor, `@entry` → entry-tree node). */
export function checkOverlayKeys(
  overlay: { units: Readonly<Record<string, unknown>>; entries: Readonly<Record<string, unknown>> },
  file: string,
  universe: KeyUniverse
): KeyFinding[] {
  const units = new Set(universe.units);
  return [
    ...Object.keys(overlay.units)
      .filter((k) => !units.has(k))
      .map((k): KeyFinding => ({ check: 'orphaned-key', file, key: `overlay-unit ${k}`, message: orphanedKeyMessage(k, universe.source) })),
    ...Object.keys(overlay.entries)
      .filter((k) => !universe.entryNodes.has(k))
      .map((k): KeyFinding => ({ check: 'orphaned-key', file, key: `overlay-entry ${k}`, message: orphanedKeyMessage(k, universe.source) })),
  ];
}

/** ORPHANED KEY over an operative-set record's unit keys (each must be a body anchor). */
export function checkRecordKeys(record: { units?: Readonly<Record<string, unknown>> }, file: string, universe: KeyUniverse): KeyFinding[] {
  const units = new Set(universe.units);
  return Object.keys(record.units ?? {})
    .filter((k) => !units.has(k))
    .map((k): KeyFinding => ({ check: 'orphaned-key', file, key: `record ${k}`, message: orphanedKeyMessage(k, universe.source) }));
}

// ============================================================================
// The committed consumer rendering, read back through its attribution (Task 15.1)
// ============================================================================
//
// A ROUTED row's signature pins VALVE 1's two hashes: the canonical unit or entry, and its
// RENDERING as of signing (C17; Req 11.5.6). The rendering of a row is exactly what the
// attribution sidecars say derives from it: every span, in every committed consumer artifact,
// whose `source` names the row (10.S — `source` is the canonical origin whatever the `op`).
// Reading it back through the sidecars, rather than re-rendering, keeps the sweep a pure
// filesystem read (it runs before generation inside `122-diff-guard`); the guard's own
// bidirectional compare is what makes the committed rendering equal a fresh one.
//
// SCOPE: `renderedHashOf` hashes the pieces of EVERY declared target's rendering together, each
// with its artifact path, so a change to any target's rendering of the row (or a move of the
// artifact) stales the signature. A row that renders nothing (`no-consumer-counterpart`) hashes
// the empty piece list — defined, and stale the moment it starts rendering. Undefined is
// reserved for "no consumer rendering exists at all", which the sweep refuses as
// `signature-unverifiable` rather than half-checking.

/** The lines one attribution span assigns to its source, in one committed consumer artifact. */
export interface RenderedPiece {
  /** Repo-relative path of the rendered artifact (its sidecar minus `.attribution.json`). */
  artifact: string;
  /** The span's lines, each with its newline. */
  text: string;
}

/** Span source → its rendered pieces, in artifact-path order then line order. */
export type RenderedSpans = ReadonlyMap<string, readonly RenderedPiece[]>;

const SIDECAR = '.attribution.json';

/**
 * Read every attribution sidecar under `canonical/_consumer-output/` and index the rendered
 * lines by span source. `undefined` when no sidecar exists — no consumer rendering to read.
 */
export function readConsumerSpans(repoRoot: string, root: string = CONSUMER_OUTPUT_ROOT): RenderedSpans | undefined {
  const base = path.join(repoRoot, root);
  if (!fs.existsSync(base)) return undefined;
  const sidecars: string[] = [];
  const walk = (dir: string): void => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile() && e.name.endsWith(SIDECAR)) sidecars.push(path.relative(repoRoot, p).split(path.sep).join('/'));
    }
  };
  walk(base);
  if (sidecars.length === 0) return undefined;

  const out = new Map<string, RenderedPiece[]>();
  for (const sidecar of sidecars) {
    const artifact = sidecar.slice(0, -SIDECAR.length);
    const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, sidecar), 'utf8')) as { spans?: { lines: [number, number]; source: string }[] };
    const abs = path.join(repoRoot, artifact);
    if (!fs.existsSync(abs)) throw new Error(`readConsumerSpans: sidecar ${sidecar} has no artifact ${artifact}`);
    const lines = fs.readFileSync(abs, 'utf8').split('\n');
    for (const span of manifest.spans ?? []) {
      const [a, b] = span.lines;
      const text = `${lines.slice(a - 1, b).join('\n')}\n`;
      const pieces = out.get(span.source) ?? [];
      pieces.push({ artifact, text });
      out.set(span.source, pieces);
    }
  }
  return out;
}

/**
 * The span source that names a dispositions row (10.S's forms): a body unit
 * `<source>#<anchor>`; a frontmatter entry `<source>#frontmatter:<path>`; a shared member
 * `canonical/shared/shared-catalog.yaml#<id>`.
 */
export function rowSpanSource(docSource: string, section: 'body' | 'frontmatter' | 'members' | string, key: string): string {
  if (section === 'frontmatter') return `${docSource}#frontmatter:${key}`;
  if (section === 'members') return `${SHARED_CATALOG}#${key}`;
  return `${docSource}${key}`;
}

/** VALVE 1's rendered hash for one span source: every target's pieces, with their artifact paths. */
export function renderedHashOf(spans: RenderedSpans, source: string): string {
  return hashEntry((spans.get(source) ?? []).map((p) => [p.artifact, p.text]));
}
