/**
 * derive.ts — the KEY CHECKS (Spec 123 Task 13.5; design C17 L2-D1, C22, DD25).
 *
 * Task 13's Primary Artifacts name this file for its key checks; `derive()` itself (C22 — one
 * function over body and frontmatter, refusing on a stale overlay and an orphaned key, two ruled
 * call sites) landed here at Task 15.2 (§ "derive()" below) and calls these. The two refusals of
 * Task 13's nine that 13.5 owns (exact strings in `regrounding/check-catalog.ts`):
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
import { AttributionAccumulator, type AttributionManifest } from './attribution';
import type { YamlDoc } from './frontmatter';
import { checkOverlayPins, toSpanOverlay, type ParsedOverlay } from './regrounding/overlay';
import { emitSpans, GLUE_SOURCES, type Dispositions as SpanDispositions } from './spans';
import { dump as dumpYaml } from 'js-yaml';

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
  return keyUniverseOf(source, fs.readFileSync(path.join(repoRoot, source), 'utf8'));
}

/** The key universe of a canonical source's TEXT (pure — no disk). */
export function keyUniverseOf(source: string, text: string): KeyUniverse {
  if (source === SHARED_CATALOG) {
    const doc = loadYaml(text) as { members?: { id?: unknown }[] };
    const members = (doc?.members ?? []).map((m) => m?.id).filter((id): id is string => typeof id === 'string');
    return { source, units: [], entryNodes: new Set(), entryLeaves: [], members };
  }
  const { frontmatter, body } = splitFrontmatter(text, source);
  return keyUniverseOfParsed(source, frontmatter ?? {}, body);
}

/** The key universe of an already-split canonical document (pure). */
export function keyUniverseOfParsed(source: string, frontmatter: YamlDoc, body: string): KeyUniverse {
  const tree = entryTree(frontmatter);
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
// derive() — the consumer canonical, derived (Task 15.2; design C22, C19; Req 14.8–14.9)
// ============================================================================
//
// `derive(source, overlay, dispositions) → derived`: ONE function over the canonical BODY and
// FRONTMATTER (L-D4 — without the frontmatter half the shipped consumer canonical would carry
// our commands and write scope). What ships SHALL be derived (Q5): a second hand-kept tree is
// drift with no detector.
//
// ORDER (refuse first, emit nothing on refusal):
//   1. split → `partition(body)` + `entryTree(frontmatter)`;
//   2. the key checks — ORPHANED KEY + MISSING ROW over the dispositions (13.5);
//   3. ORPHANED KEY over the overlay's keys (13.5);
//   4. STALE OVERLAY — every pin equals the current hash of its unit or entry (13.2);
//   5. any finding from 2–4 → throw ONE {@link DeriveError} carrying every finding's exact catalog
//      string, before anything is emitted;
//   6. the BODY through `emitSpans(…, 'consumer', dispositions, overlay, 'body')` — the SAME
//      selection the adapters run, never re-implemented, so the derived body is byte-identical to
//      every target's body spans;
//   7. the FRONTMATTER: leaves disposed `no-consumer-counterpart` / `superseded-by` are dropped
//      (and a list or map they empty is dropped with them); `retained` leaves keep their canonical
//      value. An always-set file (`counterpart:`) carries NO frontmatter at all (C19: the shipped
//      identity doc's frontmatter is dropped, never carried).
//
// RE-POINTED FRONTMATTER ENTRIES AND SHARED MEMBERS CARRY YAML VALUES (Task 15.3; the 15.0
// criterion (b) erratum of 2026-09-29 — Q1 of the 15.2 reads, (b)). An `## @entry <path>` overlay
// body is a YAML VALUE, pinned by `hashEntry` of the canonical value; derive() SUBSTITUTES it at
// the leaf's position in the derived frontmatter, so every target renders it with its own per-kind
// renderer and the derived charter is a real charter (Task 16 renders it; Kiro `allowedPaths`,
// `tools` and `resources` and CC `tools:` are built from values). Validation is CLASS-LEVEL,
// never per-field value shapes: the derived charter passes the steward `validate()` (the caller,
// `generate.ts`), and — because that table is rules, not types — derive() adds ONE generic
// congruence refusal (`overlayValueMessage`):
//   - the value parses as YAML;
//   - it has the canonical value's JSON type (string, number, boolean, null, list, map);
//   - a map carries exactly the canonical map's key set;
//   - a MAP-valued member keeps its entry path (its identity field — `name` / `id` / … — equals
//     its key); a string member's identity IS its value, so its path may change, and
//     `entryOrigin` maps the derived path back to the canonical one.
// A re-pointed row with no `## @entry` body refuses too. Ambient embeds are never re-pointed
// (DD19 — the 13.1 schema refuses it; emitSpans throws).
//
// Leaf positions come from the ENTRY TREE ITSELF (a member's index = its position among its list
// node's children; a scalar's path = its map-key chain), so pruning cannot drift from
// `entryTree()`'s identity rules — nothing here re-implements them.

export type DeriveCheckId = 'orphaned-key' | 'missing-row' | 'stale-overlay' | 'overlay-value';

export interface DeriveFinding {
  check: DeriveCheckId;
  file: string;
  key?: string;
  message: string;
}

/** derive() refuses: every finding, with its exact catalog string; nothing was emitted. */
export class DeriveError extends Error {
  constructor(readonly findings: readonly DeriveFinding[]) {
    super(findings.map((f) => f.message).join('\n'));
    this.name = 'DeriveError';
  }
}

/** The one generic refusal for a re-pointed entry's overlay value (Task 15.3). */
export const overlayValueMessage = (key: string, file: string, why: string): string =>
  `derive: re-pointed ${key} in ${file} — its overlay value ${why}; a re-pointed entry's value keeps the canonical value's JSON type, key set and identity (the ## @entry body is a YAML value)`;

const jsonType = (v: unknown): string => (v === null ? 'null' : Array.isArray(v) ? 'list' : typeof v === 'object' ? 'map' : typeof v);

/**
 * Parse one `## @entry` body as a YAML value and check it against the canonical value it replaces.
 * Returns the value, or a reason (the identity half needs the derived tree — {@link derive}).
 */
export function overlayValue(text: string | undefined, canonical: unknown): { value?: unknown; why?: string } {
  if (text === undefined) return { why: 'is missing — no ## @entry body for this re-pointed row' };
  let value: unknown;
  try {
    value = loadYaml(text);
  } catch (e) {
    return { why: `is not YAML (${(e as Error).message.split('\n')[0]})` };
  }
  if (jsonType(value) !== jsonType(canonical)) return { why: `is a ${jsonType(value)}, the canonical value a ${jsonType(canonical)}` };
  if (jsonType(value) === 'map') {
    const a = Object.keys(value as object).sort();
    const b = Object.keys(canonical as object).sort();
    if (JSON.stringify(a) !== JSON.stringify(b)) return { why: `carries keys [${a.join(', ')}], the canonical value [${b.join(', ')}]` };
  }
  return { value };
}

export interface DeriveInput {
  /** The canonical source path (`canonical/agents/<a>.md`) — span provenance and messages. */
  source: string;
  /** The canonical document, split (`splitFrontmatter`). */
  frontmatter: YamlDoc;
  body: string;
  /** The dispositions rows (13.1's shape). `counterpart:` marks an always-set file (C19). */
  dispositions: RowFile & SpanDispositions;
  /** The parsed overlay, WITH its pins (13.2). Absent → nothing is re-grounded. */
  overlay?: ParsedOverlay;
  /** The dispositions file's path, for messages (defaults to `source`). */
  dispositionsFile?: string;
}

export interface Derived {
  /** The derived canonical document: frontmatter (if any) + body. */
  text: string;
  /**
   * Derived entry path → canonical entry path, for every leaf of the derived frontmatter whose path
   * differs (a re-pointed string member's key is its new value). Consumed by `emitSpans` under the
   * consumer profile (`SpanSource.entryOrigin`) so provenance and rows stay canonical.
   */
  entryOrigin: Record<string, string>;
  /** Its attribution: the frontmatter block as C1 glue; the body spans exactly as `emitSpans` emits them. */
  attribution: AttributionManifest;
  /** The derived frontmatter object (undefined for an always-set document). */
  frontmatter?: YamlDoc;
  /** The derived body (the concatenation of the body spans). */
  body: string;
}

/** C22's derive() over one canonical document. Throws {@link DeriveError} on any refusal. */
export function derive(input: DeriveInput): Derived {
  const { source, frontmatter, body, dispositions, overlay } = input;
  const file = input.dispositionsFile ?? source;
  const tree = entryTree(frontmatter);
  const units = new Map(partition(body).units.map((u) => [u.anchor, u.text]));
  const universe = keyUniverseOfParsed(source, frontmatter, body);
  const alwaysSet = dispositions.counterpart !== undefined;

  // 2–4: the refusals.
  const findings: DeriveFinding[] = [];
  for (const f of checkDispositionKeys(dispositions, file, universe)) findings.push({ check: f.check, file: f.file, key: f.key, message: f.message });
  if (overlay) {
    for (const f of checkOverlayKeys(overlay, overlay.file, universe)) findings.push({ check: f.check, file: f.file, key: f.key, message: f.message });
    const entries = new Map(tree.units.map((l) => [l.path, l.value]));
    for (const f of checkOverlayPins(overlay, { units, entries })) findings.push({ check: 'stale-overlay', file: f.file, key: f.key, message: f.message });
  }
  // The re-pointed entries' VALUES (the generic congruence refusal; identity below).
  const values = new Map<string, unknown>();
  if (!alwaysSet) {
    const current = new Map(tree.units.map((l) => [l.path, l.value]));
    for (const [key, row] of Object.entries(dispositions.frontmatter ?? {})) {
      if (row?.disposition !== 're-pointed' || !current.has(key)) continue; // orphan: reported above
      const v = overlayValue(overlay?.entries[key]?.text, current.get(key));
      if (v.why !== undefined) findings.push({ check: 'overlay-value', file, key: `frontmatter ${key}`, message: overlayValueMessage(`frontmatter entry ${key}`, file, v.why) });
      else values.set(key, v.value);
    }
  }
  // 5: refuse before emitting anything.
  if (findings.length > 0) throw new DeriveError(findings);

  // 6: the body, through the one span function.
  const acc = new AttributionAccumulator();
  let text = '';
  let derivedFrontmatter: YamlDoc | undefined;
  const entryOrigin: Record<string, string> = {};
  if (!alwaysSet) {
    // 7: the frontmatter — re-pointed values substituted at their positions, then pruned.
    const drop = (p: string): boolean => {
      const d = dispositions.frontmatter?.[p]?.disposition;
      return d === 'no-consumer-counterpart' || d === 'superseded-by';
    };
    derivedFrontmatter = pruneFrontmatter(substituteFrontmatter(frontmatter, tree, values), tree, drop);
    // The derived leaves are the surviving canonical leaves, in document order (substitution and
    // pruning never reorder): zip them to map each derived path to its canonical origin.
    const surviving = tree.units.filter((l) => !drop(l.path)).map((l) => l.path);
    const derivedLeaves = entryTree(derivedFrontmatter).units.map((l) => l.path);
    if (derivedLeaves.length !== surviving.length) {
      throw new Error(`derive: ${source} — ${derivedLeaves.length} derived leaves for ${surviving.length} surviving canonical leaves (an internal invariant)`);
    }
    const identity: DeriveFinding[] = [];
    derivedLeaves.forEach((d, i) => {
      const c = surviving[i];
      if (d !== c) entryOrigin[d] = c;
      if (d !== c && jsonType(values.get(c)) === 'map') {
        identity.push({ check: 'overlay-value', file, key: `frontmatter ${c}`, message: overlayValueMessage(`frontmatter entry ${c}`, file, `changes the member's identity (its entry path becomes ${d})`) });
      }
    });
    if (identity.length > 0) throw new DeriveError(identity);
    const block = `---\n${dumpYaml(derivedFrontmatter, { lineWidth: -1, noRefs: true })}---\n`;
    acc.add('render', countBlockLines(block), GLUE_SOURCES['frontmatter-fence']);
    text += block;
  }
  const bodyOut = emitSpans(
    acc,
    { file: source, body, frontmatter },
    'consumer',
    { body: dispositions.body, frontmatter: dispositions.frontmatter },
    overlay ? toSpanOverlay(overlay) : undefined,
    'body'
  ).text;
  text += bodyOut;
  return { text, attribution: acc.build(source), frontmatter: derivedFrontmatter, body: bodyOut, entryOrigin };
}

/** derive() over a canonical file's TEXT (splits it first). */
export function deriveText(input: Omit<DeriveInput, 'frontmatter' | 'body'> & { text: string }): Derived {
  const { frontmatter, body } = splitFrontmatter(input.text, input.source);
  return derive({ ...input, frontmatter: frontmatter ?? {}, body });
}

/**
 * derive() over the SHARED CATALOG (`canonical/shared/shared-catalog.yaml`): members disposed
 * `no-consumer-counterpart` / `superseded-by` are dropped; `retained` members are kept as-is; a
 * `re-pointed` member is replaced by its `## @entry <id>` overlay VALUE (the same generic
 * congruence refusal as frontmatter, and a member keeps its `id`). Refuses on an orphaned or
 * missing row, an orphaned or stale overlay pin (pinned by `hashEntry` of the member). Returns
 * the derived catalog's YAML.
 */
export function deriveSharedCatalog(
  text: string,
  dispositions: RowFile,
  file = 'canonical/profiles/consumer/_shared.dispositions.yaml',
  overlay?: ParsedOverlay
): string {
  const universe = keyUniverseOf(SHARED_CATALOG, text);
  const findings: DeriveFinding[] = checkDispositionKeys(dispositions, file, universe).map((f) => ({ check: f.check, file: f.file, key: f.key, message: f.message }));
  const doc = loadYaml(text) as { members?: { id?: string }[] } & Record<string, unknown>;
  const byId = new Map((doc.members ?? []).filter((m) => typeof m?.id === 'string').map((m) => [m.id as string, m as unknown]));
  if (overlay) {
    for (const k of Object.keys(overlay.units)) findings.push({ check: 'orphaned-key', file: overlay.file, key: `overlay-unit ${k}`, message: orphanedKeyMessage(k, SHARED_CATALOG) });
    for (const k of Object.keys(overlay.entries)) {
      if (!byId.has(k)) findings.push({ check: 'orphaned-key', file: overlay.file, key: `overlay-entry ${k}`, message: orphanedKeyMessage(k, SHARED_CATALOG) });
    }
    for (const f of checkOverlayPins({ ...overlay, units: {} }, { entries: byId })) findings.push({ check: 'stale-overlay', file: f.file, key: f.key, message: f.message });
  }
  const rows = (dispositions.members ?? {}) as Record<string, { disposition?: string }>;
  const values = new Map<string, unknown>();
  for (const [id, row] of Object.entries(rows)) {
    if (row?.disposition !== 're-pointed' || !byId.has(id)) continue;
    const v = overlayValue(overlay?.entries[id]?.text, byId.get(id));
    const keeps = v.why === undefined && (v.value as { id?: unknown }).id === id;
    if (v.why !== undefined || !keeps) {
      findings.push({ check: 'overlay-value', file, key: `members ${id}`, message: overlayValueMessage(`shared member ${id}`, file, v.why ?? `changes the member's identity (id ${String((v.value as { id?: unknown }).id)})`) });
    } else values.set(id, v.value);
  }
  if (findings.length > 0) throw new DeriveError(findings);
  const members = (doc.members ?? [])
    .filter((m) => {
      const d = typeof m?.id === 'string' ? rows[m.id]?.disposition : undefined;
      return !(d === 'no-consumer-counterpart' || d === 'superseded-by');
    })
    .map((m) => (typeof m?.id === 'string' && values.has(m.id) ? values.get(m.id) : m));
  return dumpYaml({ ...doc, members }, { lineWidth: -1, noRefs: true });
}

/**
 * A deep copy of `frontmatter` with each re-pointed leaf's VALUE substituted at its position
 * (read from the tree, like {@link pruneFrontmatter}): a list member at its index among its list
 * node's children; any other leaf at its dotted map-key path (`preflight` = `kiro.agentSpawn`).
 * Ambient leaves are never substituted (DD19; refused upstream).
 */
export function substituteFrontmatter(frontmatter: YamlDoc, tree: ReturnType<typeof entryTree>, values: ReadonlyMap<string, unknown>): YamlDoc {
  const out = JSON.parse(JSON.stringify(frontmatter)) as YamlDoc;
  const keysOf = (nodePath: string): string[] => (nodePath === 'preflight' ? ['kiro', 'agentSpawn'] : nodePath.split('.'));
  const at = (keys: string[]): unknown => keys.reduce<unknown>((v, k) => (v && typeof v === 'object' ? (v as Record<string, unknown>)[k] : undefined), out);
  for (const [leafPath, value] of values) {
    if (leafPath.startsWith('ambient[')) throw new Error(`substituteFrontmatter: ${leafPath} is an ambient embed — never re-pointed (DD19)`);
    const node = tree.get(leafPath);
    const parent = node?.parent ? tree.get(node.parent) : undefined;
    const copy = JSON.parse(JSON.stringify(value)) as unknown;
    if (parent?.kind === 'list') {
      const arr = at(keysOf(parent.id));
      if (!Array.isArray(arr)) throw new Error(`substituteFrontmatter: ${parent.id} is not a list in the frontmatter`);
      arr[parent.children.indexOf(leafPath)] = copy;
    } else {
      const keys = keysOf(leafPath);
      const holder = at(keys.slice(0, -1)) as Record<string, unknown> | undefined;
      if (!holder || typeof holder !== 'object') throw new Error(`substituteFrontmatter: no map holds ${leafPath}`);
      holder[keys[keys.length - 1]] = copy;
    }
  }
  return out;
}

/**
 * Remove every entry-tree LEAF for which `drop(path)` holds from a deep copy of `frontmatter`,
 * then remove any list or map left empty by it. Positions are read from the tree:
 *   - a list MEMBER (parent node kind `list`) is the element at its index among the parent's
 *     children, in the array at the parent's path;
 *   - an ambient SECTION leaf (parent `ambient[<docid>]`) is the set of that governance entry's
 *     claims on that section; the entry goes when no claim remains;
 *   - any other leaf is the value at its dotted map-key path.
 * The entry tree renames exactly one path — `kiro.agentSpawn` is the `preflight` list — and that
 * mapping is the only one applied here.
 */
export function pruneFrontmatter(frontmatter: YamlDoc, tree: ReturnType<typeof entryTree>, drop: (path: string) => boolean): YamlDoc {
  const out = JSON.parse(JSON.stringify(frontmatter)) as YamlDoc;
  const keysOf = (nodePath: string): string[] => (nodePath === 'preflight' ? ['kiro', 'agentSpawn'] : nodePath.split('.'));
  const at = (keys: string[]): unknown => keys.reduce<unknown>((v, k) => (v && typeof v === 'object' ? (v as Record<string, unknown>)[k] : undefined), out);

  const listDrops = new Map<string, Set<number>>();
  const ambientDrops = new Map<string, Set<string>>();
  const scalarDrops: string[][] = [];
  for (const leaf of tree.units) {
    if (!drop(leaf.path)) continue;
    const node = tree.get(leaf.path);
    const parent = node?.parent ? tree.get(node.parent) : undefined;
    if (parent?.kind === 'list') {
      const set = listDrops.get(parent.id) ?? new Set<number>();
      set.add(parent.children.indexOf(leaf.path));
      listDrops.set(parent.id, set);
    } else if (parent && /^ambient\[[^\]#]+\]$/.test(parent.id)) {
      const docId = parent.id.slice('ambient['.length, -1);
      const set = ambientDrops.get(docId) ?? new Set<string>();
      set.add(node?.label ?? '');
      ambientDrops.set(docId, set);
    } else {
      scalarDrops.push(keysOf(leaf.path));
    }
  }
  for (const [listPath, indices] of listDrops) {
    const arr = at(keysOf(listPath));
    if (!Array.isArray(arr)) throw new Error(`pruneFrontmatter: ${listPath} is not a list in the frontmatter`);
    for (const i of [...indices].sort((a, b) => b - a)) arr.splice(i, 1);
  }
  const law = at(['ambient', 'governanceAsLaw']);
  if (Array.isArray(law)) {
    for (let i = law.length - 1; i >= 0; i -= 1) {
      const entry = law[i] as { id?: string; assert?: { section?: string }[] };
      const sections = entry.id !== undefined ? ambientDrops.get(entry.id) : undefined;
      if (!sections) continue;
      entry.assert = (entry.assert ?? []).filter((c) => !sections.has(c.section ?? ''));
      if (entry.assert.length === 0) law.splice(i, 1);
    }
  }
  for (const keys of scalarDrops) {
    const parent = at(keys.slice(0, -1)) as Record<string, unknown> | undefined;
    if (parent && typeof parent === 'object') delete parent[keys[keys.length - 1]];
  }
  const prune = (v: unknown): boolean => {
    if (Array.isArray(v)) return v.length === 0;
    if (v && typeof v === 'object') {
      for (const [k, child] of Object.entries(v as Record<string, unknown>)) if (prune(child)) delete (v as Record<string, unknown>)[k];
      return Object.keys(v as Record<string, unknown>).length === 0;
    }
    return false;
  };
  for (const [k, v] of Object.entries(out)) if (prune(v)) delete out[k];
  return out;
}

function countBlockLines(text: string): number {
  const t = text.endsWith('\n') ? text.slice(0, -1) : text;
  return t.length === 0 ? 1 : t.split('\n').length;
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
