/**
 * `operative-set-freshness` — the sweep inside `122-diff-guard` (Spec 123 Task 13.6; design C16,
 * C17 L2-D1, C22; Req 11.6.5d).
 *
 * WHAT IT GUARDS (its {@link surfaceGlobs} — the coverage map's rows for these list
 * `122-diff-guard`):
 *   canonical/operative-sets/**        the committed operative-set records (C16);
 *   canonical/profiles/consumer/**     the consumer profile: confirmation notes, dispositions
 *                                      files, overlays (C17, C19).
 *
 * WHAT IT RUNS, per file kind (one call set per module, so each check has one definition):
 *
 *   operative-set record (`canonical/operative-sets/*.yaml`)
 *     - source exists; the record declares ≥ 1 unit;
 *     - checkOperativeSet (operative-sets.ts, 13.3): confirmer = C1; items unique, known kind,
 *       no edge whitespace, VERBATIM substring of the unit;
 *     - checkRecordKeys (derive.ts, 13.5): every unit key names a current unit (ORPHANED KEY);
 *     - FRESHNESS: each unit's `canonicalHash` equals the current unit's hash — the owner
 *       re-confirms after any canonical edit (the bite: edit a unit without re-confirming → red);
 *     - the `confirmation:` note: the fragment names the unit; the note exists and is committed;
 *       exactly one `## ` block whose heading (one pair of backticks removed) EQUALS the anchor
 *       (literal, never slugged — a slug drops the `:` of a `:preamble` anchor); its
 *       `confirmer:` / `canonicalHash:` / `items:` lines equal the record's (ids in record order;
 *       `items: none` for an empty set); a `date: YYYY-MM-DD` line.
 *   dispositions file (`canonical/profiles/consumer/**\/*.dispositions.yaml`)
 *     - validateDispositions (dispositions.ts, 13.1 — incl. the rejected term and BARE signature);
 *     - checkDispositionKeys (derive.ts, 13.5): ORPHANED KEY + MISSING ROW;
 *     - checkDispositionSigners (signatures.ts, 13.3): WRONG SIGNER;
 *     - checkSignatureFreshness (signatures.ts, 13.2): STALE signature — see the rendered-hash
 *       limit below.
 *   overlay (`canonical/profiles/consumer/**\/*.overlay.md`, paired with the same-stem
 *   `.dispositions.yaml`, whose `source:` it re-grounds)
 *     - parseOverlay (overlay.ts, 13.2 — format); checkOverlayKeys (13.5): ORPHANED KEY;
 *     - checkOverlayPins (overlay.ts, 13.2): STALE overlay.
 *
 * THE RENDERED HASH (Task 15.1): a signature's VALVE 1 pins BOTH the canonical and the RENDERED
 * hash. By default the sweep reads the rendered hash from the COMMITTED consumer rendering,
 * through its attribution sidecars (`readConsumerSpans` / `renderedHashOf`, derive.ts): the
 * lines every target's artifacts attribute to the row's source. The guard's tree compare, which
 * runs after this sweep, is what makes the committed rendering equal a fresh one. With NO
 * consumer rendering under `canonical/_consumer-output/` a signature is REFUSED as
 * `signature-unverifiable`, never half-checked (13.6's fail-closed rule, now its own check id).
 *
 * EVIDENCE AND THE PROFILE GLOB (Task 15.1; Task 13's carry "the profile-dir glob claims more
 * than the sweep reads"): every signature's `evidence:` note is resolved — under the profile
 * dir, committed, exactly one `## ` block whose heading (one pair of backticks removed) equals
 * the row's span-source fragment (`#<anchor>`, `#frontmatter:<path>` or `#<member id>`), with
 * a `signer:` line equal to the signature's. And every file under the profile dir must be
 * reached by something the sweep checks — a record's confirmation note, a dispositions file, an
 * overlay, or a signature's evidence note. Anything else is `profile-unreferenced`, so the
 * `canonical/profiles/consumer/**` row under `122-diff-guard` claims no more than is read.
 *
 * ABSORBS the Task 11 precursor test (`src/__tests__/operative-set-records.test.ts`, deleted in
 * the same change): every assertion it made has a home here or in the module named above; the
 * map is in `operative-sets.ts`'s header and task-13-6-completion.md.
 *
 * THE TWO LISTS (ballot 2026-10-01-signing-act-chain § 2 clause 3, erratum ratified 2026-10-21 —
 * record `.kiro/issues/archive/2026-10-17-first-signatures-not-on-stale-list.md`; fixtures FU1–FU32
 * specified by Stacy). A signing act is in bound only for a row on one of them, and the sweep
 * prints both, ALWAYS (a zero list prints `…: 0 row(s)`), after its head line and finding lines,
 * which are unchanged — one sweep, one paste:
 *   stale: N row(s)            signed dispositions rows whose pin is stale (`stale-signature`, any
 *                              disposition) and record units whose `canonicalHash` is stale
 *                              (confirmations). Overlay pins are authoring: a finding line only.
 *   unsigned-routed: M row(s)  rows carrying NO signature (a refusal is a signature) whose key names
 *                              a current unit / entry / member, and that are ROUTED: disposition
 *                              `no-consumer-counterpart` or `superseded-by` (any section), or a
 *                              body `re-pointed` unit C18 ROUTES ({@link classifyCharter}: the
 *                              canonical unit, the overlay's re-grounded text, the record's items).
 *                              This is the signed population of `consumer-profile.real.test.ts`.
 * Entries: `  <rowId> — <signature|confirmation|disposition>`, a ROUTES row reading
 * `re-pointed: below-half`, `re-pointed: repo-specific-removal` or both joined by `+`; the row id
 * is verify-signing-chain's `rowIdOf`. Order: file (byte order), section (body, frontmatter,
 * members), key in file order. The lists are INFORMATION: they never add a finding, so they never
 * change PASS/FAIL, the diff-guard exit or `--ci`'s `sweepOk` (an unsigned routed row already fails
 * the Jest lane's "every routed row is signed" test). An undecidable list prints
 * `unsigned-routed: UNDECIDABLE — <why>` IN PLACE of its count line (never `0 row(s)`), the verdict
 * unchanged. {@link routedPopulation} reads through a file reader, so
 * `verify-signing-chain --ci` computes the same list at a first signature's first-parent tree
 * (link 1).
 *
 * WHAT THIS DOES NOT ESTABLISH: authorship (one git identity — C16's seat-authentication limit);
 * completeness of an item's text (a prefix truncation passes — the confirmer's); that a removal
 * citation applies (clause (iii)); anything about the rendered consumer output.
 *
 * Traces to: Req 11.5, 11.6.5d; design C16, C17, C19, C22, DD25.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import {
  checkDispositionKeys,
  checkOverlayKeys,
  checkRecordKeys,
  keyUniverse,
  keyUniverseOf,
  readConsumerSpans,
  renderedHashOf,
  rowSpanSource,
  type KeyUniverse,
  type RenderedSpans,
} from '../derive';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, partition } from '../partition';
import { SHARED_CATALOG, validateDispositions, type DispositionRow } from './dispositions';
import { hashEntry, hashText } from './hash';
import { checkOperativeSet, type OperativeSetRecord } from './operative-sets';
import { checkOverlayPins, OverlayFormatError, parseOverlay } from './overlay';
import { c1Seat } from './c1';
import { checkDispositionSigners, checkSignatureFreshness, ownerOf } from './signatures';
import { classifyCharter, type OperativeItem } from './triviality';

export const SWEEP_NAME = 'operative-set-freshness';
export const RECORDS_DIR = 'canonical/operative-sets';
export const PROFILE_DIR = 'canonical/profiles/consumer';

/** The surfaces this sweep reads and guards — imported by coverage-map.ts (S-D1: one symbol). */
export function surfaceGlobs(): string[] {
  return [`${RECORDS_DIR}/**`, `${PROFILE_DIR}/**`];
}

export interface FreshnessFinding {
  check: string;
  file: string;
  key?: string;
  message: string;
}

export interface FreshnessReport {
  findings: FreshnessFinding[];
  /** What was checked — printed on every run so a silent zero is visible. */
  counts: { records: number; units: number; notes: number; dispositions: number; overlays: number };
  /** The stale list (signing ballot § 2 clause 3) — the stale findings, as rows. */
  stale?: StaleRow[];
  /** The unsigned-routed list (signing ballot § 2 clause 3) — information, never a finding. */
  unsignedRouted?: RoutedRow[];
  /** Why the unsigned-routed list could not be decided, where it could not. */
  routedErrors?: RoutedError[];
}

export type RowSection = 'body' | 'frontmatter' | 'members';
const SECTION_ORDER: readonly (RowSection | 'unit')[] = ['unit', 'body', 'frontmatter', 'members'];

/** A row on the stale list: a stale signature, or a stale record unit (a confirmation). */
export interface StaleRow {
  file: string;
  section: RowSection | 'unit';
  key: string;
  kind: 'signature' | 'confirmation';
}

/** A row of the signed population (Task 15.5): C18 ROUTES, or a whole-unit removal. */
export interface RoutedRow {
  /** The dispositions file. */
  file: string;
  section: RowSection;
  key: string;
  /** The row's disposition. */
  disposition: 'no-consumer-counterpart' | 'superseded-by' | 're-pointed';
  /** For a C18-routed body row: why it routes. */
  routedBy?: string[];
  /** c1Seat(owner(row)); undefined when the owner does not resolve. */
  signer?: string;
  signed: boolean;
}

/** What made (part of) the list undecidable; `file` is the dispositions file it concerns, or the shared input. */
export interface RoutedError {
  file: string;
  message: string;
}

/** The row id a signing act is reported under — verify-signing-chain's `rowIdOf`, one grammar for both lists. */
export const listRowId = (r: { file: string; section: RowSection | 'unit'; key: string }): string =>
  r.section === 'frontmatter' ? `${r.file}#frontmatter:${r.key}` : r.key.startsWith('#') ? `${r.file}${r.key}` : `${r.file}#${r.key}`;

/** The label an unsigned-routed entry carries. */
export const routedLabel = (r: Pick<RoutedRow, 'disposition' | 'routedBy'>): string =>
  r.routedBy && r.routedBy.length > 0 ? `${r.disposition}: ${r.routedBy.join('+')}` : r.disposition;

/** File (byte order), then section, then the order rows were found in (file order). */
function listOrder<T extends { file: string; section: RowSection | 'unit' }>(rows: T[]): T[] {
  return rows
    .map((r, i) => ({ r, i }))
    .sort((a, b) =>
      a.r.file < b.r.file ? -1 : a.r.file > b.r.file ? 1 : SECTION_ORDER.indexOf(a.r.section) - SECTION_ORDER.indexOf(b.r.section) || a.i - b.i
    )
    .map((x) => x.r);
}

export interface FreshnessOptions {
  /** Repo-relative paths git tracks (the note-is-committed check). Default: `git ls-files`. */
  tracked?: ReadonlySet<string>;
  /**
   * The CURRENT rendered hash of a signed row. Default (Task 15.1): read from the committed
   * consumer rendering's attribution sidecars; `undefined` (no rendering) → `signature-unverifiable`.
   */
  renderedHash?: (dispositionsFile: string, section: string, key: string) => string | undefined;
}

/** The fail-closed refusal: a signed row whose rendered hash cannot be read (Task 15.1 id). */
export const unverifiableSignatureMessage = (key: string, file: string): string =>
  `signature on ${key} in ${file}: its renderedHash cannot be verified — no consumer rendering exists under canonical/_consumer-output/ to read it from; refusing rather than half-checking`;

/** A profile file nothing the sweep checks reaches (Task 15.1). */
export const unreferencedProfileFileMessage = (file: string): string =>
  `profile file ${file} is reached by no operative-set record, dispositions file, overlay or signature evidence — the sweep cannot check it; reference it or remove it`;

/** The fragment a row's `evidence:` must name — its span source's fragment (10.S forms). */
export const evidenceFragment = (section: string, key: string): string =>
  section === 'frontmatter' ? `#frontmatter:${key}` : section === 'members' ? `#${key}` : key;

export const staleRecordMessage = (file: string, anchor: string, pinned: string, now: string): string =>
  `operative set ${file} ${anchor}: canonicalHash ${pinned} is stale — the canonical unit is now ${now}; the C1 confirmer re-confirms the unit's set (C16)`;

const listFiles = (repoRoot: string, rel: string): string[] => {
  const abs = path.join(repoRoot, rel);
  if (!fs.existsSync(abs)) return [];
  const out: string[] = [];
  const walk = (dir: string): void => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) out.push(path.relative(repoRoot, p).split(path.sep).join('/'));
    }
  };
  walk(abs);
  return out;
};

/** `git ls-files` under the profile dir, relative to `repoRoot`; undefined if git cannot answer. */
export function gitTracked(repoRoot: string): Set<string> | undefined {
  try {
    const out = execFileSync('git', ['ls-files', '-z', '--', PROFILE_DIR, RECORDS_DIR], { cwd: repoRoot, encoding: 'utf8' });
    return new Set(out.split('\0').filter(Boolean));
  } catch {
    return undefined;
  }
}

/** The `## ` blocks of a note whose heading (one pair of enclosing backticks removed) equals `anchor`. */
function noteBlocksFor(note: string, anchor: string): string[] {
  return note
    .split(/^(?=## )/m)
    .filter((b) => b.startsWith('## '))
    .filter((b) => b.split('\n')[0].replace(/^## /, '').trim().replace(/^`(.*)`$/, '$1') === anchor);
}
const field = (block: string, key: string): string | undefined => new RegExp(`^${key}: (.*)$`, 'm').exec(block)?.[1]?.trim();

interface SourceView {
  universe: KeyUniverse;
  units: Map<string, string>;
  entries: Map<string, unknown>;
  members: Map<string, unknown>;
}

/** A row as the census mode reports it: every dispositions row, with routedPopulation's verdict. */
export interface CensusRow {
  file: string;
  section: RowSection;
  key: string;
  /** The routed row, when routedPopulation routes it. */
  routed?: RoutedRow;
  signed: boolean;
}

/** A row carries a signature (a refusal is one). The one predicate for `RoutedRow.signed` and the census. */
export const isSignedRow = (row: unknown): boolean =>
  typeof row === 'object' && row !== null && !Array.isArray(row) && (row as { signature?: unknown }).signature !== undefined && (row as { signature?: unknown }).signature !== null;

/**
 * The census mode's output (ballot 2026-10-19-instrument-census-at-draft; register
 * `signing-act-consistency`, field `census`): one line per dispositions row,
 * `<rowId>\t<routed: <label> | not-routed>\t<signed|unsigned>\t<signer | ->`, sorted, then the
 * count line. Every value is routedPopulation's own; nothing is decided here.
 */
export function routedCensus(read: (rel: string) => string | undefined, files: readonly string[]): string[] {
  const pop = routedPopulation(read, files);
  const lines = pop.all
    .map((r) => `${listRowId(r)}\t${r.routed ? `routed: ${routedLabel(r.routed)}` : 'not-routed'}\t${r.signed ? 'signed' : 'unsigned'}\t${r.routed?.signer ?? '-'}`)
    .sort();
  const routed = pop.all.filter((r) => r.routed).length;
  const unsigned = pop.all.filter((r) => r.routed && !r.signed).length;
  return [...lines, `${lines.length} rows; ${routed} routed; ${unsigned} unsigned-routed; errors ${pop.errors.length}`];
}

/**
 * The signed population over a tree read through `read` (repo-relative path → text, `undefined`
 * when absent); `files` lists the tree's paths under the profile and records dirs. Records pair
 * with dispositions files by `source`. Pure; never throws — what cannot be decided goes to
 * `errors`, naming the dispositions file it concerns. Rows come back in list order.
 */
export function routedPopulation(
  read: (rel: string) => string | undefined,
  files: readonly string[]
): { rows: RoutedRow[]; errors: RoutedError[]; all: CensusRow[] } {
  const rows: RoutedRow[] = [];
  /** Every row of every dispositions file that parses, with this function's verdict — the census mode's input. */
  const all: CensusRow[] = [];
  /** One line per error, so a list line or a --ci finding never spans lines (a YAML error carries a snippet). */
  const firstLine = (e: unknown): string => String((e as Error)?.message ?? e).split('\n')[0].trim();
  const errors: RoutedError[] = [];
  const isMap = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
  const yaml = (rel: string, errorFile = rel): Record<string, unknown> | undefined => {
    const text = read(rel);
    if (text === undefined) return undefined;
    try {
      const d = loadYaml(text);
      return isMap(d) ? d : undefined;
    } catch (e) {
      errors.push({ file: errorFile, message: `${rel}: YAML failed to parse — ${firstLine(e)}` });
      return undefined;
    }
  };

  const records = new Map<string, Record<string, unknown>>();
  const recordOwners: Record<string, string> = {};
  for (const f of files.filter((x) => x.startsWith(`${RECORDS_DIR}/`) && x.endsWith('.yaml')).sort()) {
    const r = yaml(f);
    if (!r || typeof r.source !== 'string') continue;
    if (!records.has(r.source)) records.set(r.source, r);
    if (typeof r.owner === 'string' && !(r.source in recordOwners)) recordOwners[r.source] = r.owner;
  }
  const sharedOwners: Record<string, string> = {};
  const shared = yaml(SHARED_CATALOG);
  for (const m of isMap(shared) && Array.isArray(shared.members) ? shared.members : []) {
    if (isMap(m) && typeof m.id === 'string' && typeof m.owner === 'string') sharedOwners[m.id] = m.owner;
  }

  for (const file of files.filter((x) => x.startsWith(`${PROFILE_DIR}/`) && x.endsWith('.dispositions.yaml')).sort()) {
    const doc = yaml(file);
    if (!doc) continue; // absent or unparsable (recorded) — the sweep's own findings name it
    const section = (name: RowSection): Record<string, unknown> => (isMap(doc[name]) ? (doc[name] as Record<string, unknown>) : {});
    /** The rows of a file whose list is undecidable: each one, not routed. */
    const undecided = (): void => {
      for (const name of ['body', 'frontmatter', 'members'] as const) for (const [key, row] of Object.entries(section(name))) all.push({ file, section: name, key, signed: isSignedRow(row) });
    };
    const source = typeof doc.source === 'string' ? doc.source : undefined;
    const sourceText = source === undefined ? undefined : read(source);
    if (source === undefined || sourceText === undefined) {
      errors.push({ file, message: `${file}: source ${String(doc.source)} does not exist — which rows name a current unit is undecidable` });
      undecided();
      continue;
    }
    let universe: KeyUniverse;
    try {
      universe = keyUniverseOf(source, sourceText);
    } catch (e) {
      errors.push({ file, message: `${file}: the key universe of ${source} cannot be read — ${firstLine(e)}` });
      undecided();
      continue;
    }
    const current: Record<RowSection, (k: string) => boolean> = {
      body: (k) => universe.units.includes(k),
      frontmatter: (k) => universe.entryNodes.has(k),
      members: (k) => universe.members.includes(k),
    };

    // C18 over the body: which re-pointed units ROUTE.
    const routes = new Map<string, string[]>();
    const record = records.get(source);
    const body = section('body');
    if (record && source !== SHARED_CATALOG) {
      try {
        const units = new Map(partition(splitFrontmatter(sourceText, source).body).units.map((u) => [u.anchor, u.text] as [string, string]));
        const overlayFile = file.replace(/\.dispositions\.yaml$/, '.overlay.md');
        const overlayText = read(overlayFile);
        const overlay = overlayText === undefined ? undefined : parseOverlay(overlayText, overlayFile);
        const rendered = new Map<string, string>();
        for (const [a, t] of units) {
          const row = body[a];
          const disposition = isMap(row) ? row.disposition : undefined;
          if (disposition === 'retained') rendered.set(a, t);
          if (disposition === 're-pointed' && overlay?.units[a] !== undefined) rendered.set(a, overlay.units[a].text);
        }
        const recUnits = isMap(record.units) ? record.units : {};
        const items = new Map(Object.entries(recUnits).map(([a, u]) => [a, (isMap(u) && Array.isArray(u.items) ? u.items : []) as OperativeItem[]]));
        const rowMap = new Map(Object.entries(body).filter(([, r]) => isMap(r)) as [string, DispositionRow][]);
        for (const x of classifyCharter({ canonicalUnits: units, renderedUnits: rendered, items, rows: rowMap })) {
          if (x.entered && x.verdict === 'ROUTES') routes.set(x.anchor, [...x.routedBy]);
        }
      } catch (e) {
        errors.push({ file, message: `${file}: C18 cannot classify ${source} — ${firstLine(e)}` });
      }
    }

    for (const name of ['body', 'frontmatter', 'members'] as const) {
      for (const [key, row] of Object.entries(section(name))) {
        const census: CensusRow = { file, section: name, key, signed: isSignedRow(row) };
        all.push(census);
        if (!isMap(row) || !current[name](key)) continue; // an orphan is on no list (the sweep refuses it)
        const d = row.disposition;
        const routedBy = name === 'body' && d === 're-pointed' ? routes.get(key) : undefined;
        if (d !== 'no-consumer-counterpart' && d !== 'superseded-by' && routedBy === undefined) continue;
        const owner = ownerOf(source, name === 'members' ? key : undefined, { sharedOwners, recordOwners });
        const routed: RoutedRow = {
          file,
          section: name,
          key,
          disposition: d as RoutedRow['disposition'],
          ...(routedBy ? { routedBy } : {}),
          signer: owner === undefined ? undefined : c1Seat(owner),
          signed: census.signed,
        };
        census.routed = routed;
        rows.push(routed);
      }
    }
  }
  return { rows: listOrder(rows), errors, all };
}

/** The unsigned-routed list over a working tree — the rows the sweep emits. */
export function unsignedRoutedAt(repoRoot: string, files: readonly string[]): { rows: RoutedRow[]; errors: RoutedError[] } {
  const read = (rel: string): string | undefined => {
    const abs = path.join(repoRoot, rel);
    return fs.existsSync(abs) && fs.statSync(abs).isFile() ? fs.readFileSync(abs, 'utf8') : undefined;
  };
  const pop = routedPopulation(read, files);
  return { rows: pop.rows.filter((r) => !r.signed), errors: pop.errors };
}

/** Run the sweep over `repoRoot`. Pure over the filesystem; no generation, no MCP. */
export function runFreshnessSweep(repoRoot: string, opts: FreshnessOptions = {}): FreshnessReport {
  const findings: FreshnessFinding[] = [];
  const counts = { records: 0, units: 0, notes: 0, dispositions: 0, overlays: 0 };
  const push = (check: string, file: string, message: string, key?: string): void => {
    findings.push({ check, file, key, message });
  };
  const tracked = opts.tracked ?? gitTracked(repoRoot);
  /** The stale list (signing ballot § 2 clause 3): the stale findings, as rows. */
  const stale: StaleRow[] = [];
  /** Profile files something below reaches (the unreferenced-file check at the end). */
  const referenced = new Set<string>();
  let spans: RenderedSpans | undefined | null = null; // null = not read yet
  const consumerSpans = (): RenderedSpans | undefined => {
    if (spans === null) spans = readConsumerSpans(repoRoot);
    return spans;
  };

  const views = new Map<string, SourceView | undefined>();
  const view = (source: string): SourceView | undefined => {
    if (views.has(source)) return views.get(source);
    let v: SourceView | undefined;
    if (fs.existsSync(path.join(repoRoot, source))) {
      const text = fs.readFileSync(path.join(repoRoot, source), 'utf8');
      if (source === SHARED_CATALOG) {
        const doc = loadYaml(text) as { members?: { id?: string }[] };
        const members = new Map((doc?.members ?? []).filter((m) => typeof m?.id === 'string').map((m) => [m.id as string, m as unknown]));
        v = { universe: keyUniverse(repoRoot, source), units: new Map(), entries: new Map(), members };
      } else {
        const { frontmatter, body } = splitFrontmatter(text, source);
        v = {
          universe: keyUniverse(repoRoot, source),
          units: new Map(partition(body).units.map((u) => [u.anchor, u.text])),
          entries: new Map(entryTree(frontmatter ?? {}).units.map((l) => [l.path, l.value])),
          members: new Map(),
        };
      }
    }
    views.set(source, v);
    return v;
  };

  // --- operative-set records ---------------------------------------------------------------
  const notes = new Map<string, string>();
  for (const file of listFiles(repoRoot, RECORDS_DIR).filter((f) => f.endsWith('.yaml'))) {
    counts.records += 1;
    let record: OperativeSetRecord;
    try {
      record = loadYaml(fs.readFileSync(path.join(repoRoot, file), 'utf8')) as OperativeSetRecord;
    } catch (e) {
      push('operative-set-format', file, `operative set ${file}: YAML failed to parse — ${(e as Error).message}`);
      continue;
    }
    const units = Object.entries(record?.units ?? {});
    // Every note a record names is REACHED, even when the record fails below — so a broken record
    // reports its own defect, not a cascade of "unreferenced" notes.
    for (const [, u] of units) {
      const c = typeof u?.confirmation === 'string' ? u.confirmation : '';
      const n = c.includes('#') ? c.slice(0, c.indexOf('#')) : c;
      if (n) referenced.add(n);
    }
    if (units.length === 0) push('operative-set-format', file, `operative set ${file} declares no units`);
    const v = typeof record?.source === 'string' ? view(record.source) : undefined;
    if (!v) {
      push('operative-set-format', file, `operative set ${file}: source ${String(record?.source)} does not exist`);
      continue;
    }
    for (const f of checkOperativeSet(record, file, v.units)) push(f.check, file, f.message, f.anchor);
    for (const f of checkRecordKeys(record, file, v.universe)) push(f.check, file, f.message, f.key);

    for (const [anchor, unit] of units) {
      counts.units += 1;
      const text = v.units.get(anchor);
      if (text === undefined) continue; // the orphaned-key refusal above
      const now = hashText(text);
      if (unit.canonicalHash !== now) {
        push(SWEEP_NAME, file, staleRecordMessage(file, anchor, String(unit.canonicalHash), now), anchor);
        stale.push({ file, section: 'unit', key: anchor, kind: 'confirmation' });
      }

      // The confirmation note.
      const conf = typeof unit.confirmation === 'string' ? unit.confirmation : '';
      const at = conf.indexOf('#');
      const notePath = at < 0 ? conf : conf.slice(0, at);
      const fragment = at < 0 ? '' : conf.slice(at);
      if (notePath) referenced.add(notePath);
      const bad = (msg: string): void => push('confirmation', file, `operative set ${file} ${anchor}: ${msg}`, anchor);
      if (fragment !== anchor) {
        bad(`confirmation fragment "${fragment}" does not name the unit`);
        continue;
      }
      if (!notes.has(notePath)) {
        if (!notePath || !fs.existsSync(path.join(repoRoot, notePath))) {
          bad(`confirmation note ${notePath || '(none)'} does not exist`);
          continue;
        }
        notes.set(notePath, fs.readFileSync(path.join(repoRoot, notePath), 'utf8'));
        counts.notes += 1;
        if (tracked === undefined) bad(`cannot establish that ${notePath} is committed (git ls-files failed)`);
        else if (!tracked.has(notePath)) bad(`confirmation note ${notePath} is not committed`);
      }
      const blocks = noteBlocksFor(notes.get(notePath) as string, anchor);
      if (blocks.length !== 1) {
        bad(`confirmation resolves to ${blocks.length} note blocks in ${notePath} (want 1)`);
        continue;
      }
      const block = blocks[0];
      const ids = (unit.items ?? []).map((i) => i.id);
      const itemsLine = field(block, 'items');
      const noteIds = itemsLine === 'none' ? [] : (itemsLine ?? '').split(',').map((s) => s.trim()).filter(Boolean);
      if (field(block, 'confirmer') !== record.confirmer) bad(`note confirmer ${String(field(block, 'confirmer'))} ≠ record confirmer ${record.confirmer}`);
      if (field(block, 'canonicalHash') !== unit.canonicalHash) bad(`note canonicalHash ≠ record canonicalHash`);
      if (JSON.stringify(noteIds) !== JSON.stringify(ids)) bad(`note items (${noteIds.length}) ≠ record items (${ids.length})`);
      if (!/^date: \d{4}-\d{2}-\d{2}$/m.test(block)) bad('note carries no date: YYYY-MM-DD line');
    }
  }

  // --- dispositions files and their overlays -----------------------------------------------
  const profileFiles = listFiles(repoRoot, PROFILE_DIR);
  const recordOwners: Record<string, string> = {};
  for (const file of listFiles(repoRoot, RECORDS_DIR).filter((f) => f.endsWith('.yaml'))) {
    try {
      const r = loadYaml(fs.readFileSync(path.join(repoRoot, file), 'utf8')) as OperativeSetRecord;
      if (typeof r?.source === 'string' && typeof r?.owner === 'string') recordOwners[r.source] = r.owner;
    } catch {
      /* reported above */
    }
  }
  const sharedOwners: Record<string, string> = {};
  const shared = view(SHARED_CATALOG);
  for (const [id, m] of shared?.members ?? []) {
    const owner = (m as { owner?: unknown })?.owner;
    if (typeof owner === 'string') sharedOwners[id] = owner;
  }

  /** A signature's `evidence:` note (Task 15.1): under the profile dir, committed, one block, same signer. */
  const evidenceNotes = new Map<string, string>();
  const checkEvidence = (file: string, section: string, key: string, sig: { signer?: unknown; evidence?: unknown }): void => {
    if (typeof sig.evidence !== 'string' || sig.evidence.length === 0) return; // format's finding (signatures.ts)
    const bad = (msg: string): void => push('signature-evidence', file, `signature on ${key} in ${file}: ${msg}`, key);
    const at = sig.evidence.indexOf('#');
    const notePath = at < 0 ? sig.evidence : sig.evidence.slice(0, at);
    const fragment = at < 0 ? '' : sig.evidence.slice(at);
    const want = evidenceFragment(section, key);
    if (notePath) referenced.add(notePath);
    if (fragment !== want) return bad(`evidence fragment "${fragment}" does not name the row (want "${want}")`);
    if (!notePath.startsWith(`${PROFILE_DIR}/`)) return bad(`evidence note ${notePath} is not under ${PROFILE_DIR}/ — the sweep guards only that dir`);
    if (!evidenceNotes.has(notePath)) {
      if (!fs.existsSync(path.join(repoRoot, notePath))) return bad(`evidence note ${notePath} does not exist`);
      evidenceNotes.set(notePath, fs.readFileSync(path.join(repoRoot, notePath), 'utf8'));
      if (tracked === undefined) bad(`cannot establish that ${notePath} is committed (git ls-files failed)`);
      else if (!tracked.has(notePath)) bad(`evidence note ${notePath} is not committed`);
    }
    const blocks = noteBlocksFor(evidenceNotes.get(notePath) as string, fragment);
    if (blocks.length !== 1) return bad(`evidence resolves to ${blocks.length} note blocks in ${notePath} (want 1)`);
    if (field(blocks[0], 'signer') !== sig.signer) bad(`evidence note signer ${String(field(blocks[0], 'signer'))} ≠ signature signer ${String(sig.signer)}`);
  };

  for (const file of profileFiles.filter((f) => f.endsWith('.dispositions.yaml'))) {
    counts.dispositions += 1;
    referenced.add(file);
    let doc: Record<string, unknown>;
    try {
      doc = loadYaml(fs.readFileSync(path.join(repoRoot, file), 'utf8')) as Record<string, unknown>;
    } catch (e) {
      push('file-shape', file, `${file}: YAML failed to parse — ${(e as Error).message}`);
      continue;
    }
    const source = typeof doc?.source === 'string' ? doc.source : undefined;
    const v = source ? view(source) : undefined;
    const tree = v && source !== SHARED_CATALOG ? entryTree(splitFrontmatter(fs.readFileSync(path.join(repoRoot, source as string), 'utf8'), source).frontmatter ?? {}) : undefined;
    for (const f of validateDispositions(doc, file, { entries: tree })) push(f.check, file, f.message, f.row);
    if (!v) {
      push('file-shape', file, `${file}: source ${String(doc?.source)} does not exist`);
      continue;
    }
    for (const f of checkDispositionKeys(doc, file, v.universe)) push(f.check, file, f.message, f.key);
    for (const f of checkDispositionSigners(doc as unknown as Parameters<typeof checkDispositionSigners>[0], { sharedOwners, recordOwners })) push(f.check, file, f.message, f.anchor);

    const sections: [string, Map<string, unknown>, (value: unknown) => string][] = [
      ['body', v.units, (t) => hashText(t as string)],
      ['frontmatter', v.entries, hashEntry],
      ['members', v.members, hashEntry],
    ];
    for (const [section, current, hash] of sections) {
      for (const [key, row] of Object.entries((doc[section] ?? {}) as Record<string, { signature?: { canonicalHash?: string; renderedHash?: string; signer?: unknown; evidence?: unknown } }>)) {
        const sig = row?.signature;
        if (!sig || typeof sig !== 'object' || !current.has(key)) continue; // absent / orphan: reported elsewhere
        checkEvidence(file, section, key, sig);
        const rendered = opts.renderedHash
          ? opts.renderedHash(file, section, key)
          : (() => {
              const s = consumerSpans();
              return s === undefined ? undefined : renderedHashOf(s, rowSpanSource(source as string, section, key));
            })();
        if (rendered === undefined) {
          push('signature-unverifiable', file, unverifiableSignatureMessage(key, file), key);
          continue;
        }
        const f = checkSignatureFreshness(sig as { canonicalHash: string; renderedHash: string }, key, { canonicalHash: hash(current.get(key)), renderedHash: rendered });
        for (const x of f) push(x.check, file, x.message, key);
        if (f.some((x) => x.check === 'stale-signature')) stale.push({ file, section: section as RowSection, key, kind: 'signature' });
      }
    }
  }

  for (const file of profileFiles.filter((f) => f.endsWith('.overlay.md'))) {
    counts.overlays += 1;
    referenced.add(file);
    const sibling = file.replace(/\.overlay\.md$/, '.dispositions.yaml');
    if (!profileFiles.includes(sibling)) {
      push('overlay-format', file, `overlay ${file} has no dispositions file ${sibling} — its source is unknown`);
      continue;
    }
    let source: string | undefined;
    try {
      const d = loadYaml(fs.readFileSync(path.join(repoRoot, sibling), 'utf8')) as { source?: unknown };
      source = typeof d?.source === 'string' ? d.source : undefined;
    } catch {
      /* reported with the dispositions file */
    }
    const v = source ? view(source) : undefined;
    if (!v) continue; // the dispositions file's own finding names the missing source
    let parsed;
    try {
      parsed = parseOverlay(fs.readFileSync(path.join(repoRoot, file), 'utf8'), file);
    } catch (e) {
      if (e instanceof OverlayFormatError) for (const f of e.findings) push(f.check, file, f.message, f.key);
      else throw e;
      continue;
    }
    // The shared catalog's overlay keys its `## @entry` blocks by MEMBER id (Task 15.3): its
    // universe is the members, and its pins are `hashEntry` of each member.
    const universe = source === SHARED_CATALOG ? { ...v.universe, entryNodes: new Set(v.universe.members) } : v.universe;
    const entries = source === SHARED_CATALOG ? v.members : v.entries;
    for (const f of checkOverlayKeys(parsed, file, universe)) push(f.check, file, f.message, f.key);
    for (const f of checkOverlayPins(parsed, { units: v.units, entries })) push(f.check, file, f.message, f.key);
  }

  // --- the profile glob claims only what the sweep reads (Task 15.1) -----------------------
  for (const file of profileFiles) {
    if (!referenced.has(file)) push('profile-unreferenced', file, unreferencedProfileFileMessage(file));
  }

  // --- the unsigned-routed list (signing ballot § 2 clause 3) — information, never a finding --
  const routed = unsignedRoutedAt(repoRoot, [...listFiles(repoRoot, RECORDS_DIR), ...profileFiles]);
  return { findings, counts, stale: listOrder(stale), unsignedRouted: routed.rows, routedErrors: routed.errors };
}

/** The report lines the diff-guard CLI prints. */
export function formatFreshness(report: FreshnessReport): string[] {
  const c = report.counts;
  const head = `${SWEEP_NAME}: ${report.findings.length === 0 ? 'PASS' : 'FAIL'} — ${c.records} record(s), ${c.units} unit(s), ${c.notes} note(s), ${c.dispositions} dispositions file(s), ${c.overlays} overlay(s)`;
  const lines = [head, ...report.findings.map((f) => `  [${f.check}] ${f.message}`)];
  // The two lists (signing ballot § 2 clause 3) — always printed, so an empty list is visible.
  const stale = report.stale ?? [];
  lines.push(`stale: ${stale.length} row(s)`, ...stale.map((r) => `  ${listRowId(r)} — ${r.kind}`));
  const unsigned = report.unsignedRouted ?? [];
  const errors = report.routedErrors ?? [];
  // An undecidable list never prints a count: `0 row(s)` would read as an empty list in a paste.
  // Its UNDECIDABLE line(s) stand in place of the count; the rows that were decided still follow.
  if (errors.length === 0) lines.push(`${UNSIGNED_ROUTED_HEAD}: ${unsigned.length} row(s)`);
  else for (const e of errors) lines.push(`${UNSIGNED_ROUTED_HEAD}: UNDECIDABLE — ${e.message}`);
  lines.push(...unsigned.map((r) => `  ${listRowId(r)} — ${routedLabel(r)}`));
  return lines;
}

/** The label of the unsigned-routed list. */
export const UNSIGNED_ROUTED_HEAD = 'unsigned-routed';
