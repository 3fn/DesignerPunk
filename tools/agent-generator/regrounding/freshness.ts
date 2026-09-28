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
 * THE RENDERED-HASH LIMIT, fail-closed: a signature's VALVE 1 pins BOTH the canonical and the
 * RENDERED hash. The consumer rendering does not exist in this repo until Task 15, so the CLI
 * supplies no rendered hashes; a signature met without one is REFUSED ("cannot verify"), never
 * half-checked. Task 15 passes `renderedHash` (the renderer's per-unit hash) in.
 *
 * ABSORBS the Task 11 precursor test (`src/__tests__/operative-set-records.test.ts`, deleted in
 * the same change): every assertion it made has a home here or in the module named above; the
 * map is in `operative-sets.ts`'s header and task-13-6-completion.md.
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
import { checkDispositionKeys, checkOverlayKeys, checkRecordKeys, keyUniverse, type KeyUniverse } from '../derive';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, partition } from '../partition';
import { SHARED_CATALOG, validateDispositions } from './dispositions';
import { hashEntry, hashText } from './hash';
import { checkOperativeSet, type OperativeSetRecord } from './operative-sets';
import { checkOverlayPins, OverlayFormatError, parseOverlay } from './overlay';
import { checkDispositionSigners, checkSignatureFreshness } from './signatures';

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
}

export interface FreshnessOptions {
  /** Repo-relative paths git tracks (the note-is-committed check). Default: `git ls-files`. */
  tracked?: ReadonlySet<string>;
  /** The CURRENT rendered hash of a signed row (Task 15's renderer). Absent → signatures refuse. */
  renderedHash?: (dispositionsFile: string, section: string, key: string) => string | undefined;
}

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

/** Run the sweep over `repoRoot`. Pure over the filesystem; no generation, no MCP. */
export function runFreshnessSweep(repoRoot: string, opts: FreshnessOptions = {}): FreshnessReport {
  const findings: FreshnessFinding[] = [];
  const counts = { records: 0, units: 0, notes: 0, dispositions: 0, overlays: 0 };
  const push = (check: string, file: string, message: string, key?: string): void => {
    findings.push({ check, file, key, message });
  };
  const tracked = opts.tracked ?? gitTracked(repoRoot);

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
      if (unit.canonicalHash !== now) push(SWEEP_NAME, file, staleRecordMessage(file, anchor, String(unit.canonicalHash), now), anchor);

      // The confirmation note.
      const conf = typeof unit.confirmation === 'string' ? unit.confirmation : '';
      const at = conf.indexOf('#');
      const notePath = at < 0 ? conf : conf.slice(0, at);
      const fragment = at < 0 ? '' : conf.slice(at);
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

  for (const file of profileFiles.filter((f) => f.endsWith('.dispositions.yaml'))) {
    counts.dispositions += 1;
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
      for (const [key, row] of Object.entries((doc[section] ?? {}) as Record<string, { signature?: { canonicalHash?: string; renderedHash?: string } }>)) {
        const sig = row?.signature;
        if (!sig || typeof sig !== 'object' || !current.has(key)) continue; // absent / orphan: reported elsewhere
        const rendered = opts.renderedHash?.(file, section, key);
        if (rendered === undefined) {
          push('stale-signature', file, `signature on ${key} in ${file}: its renderedHash cannot be verified — no consumer rendering is available to the sweep; refusing rather than half-checking (Task 15 supplies the renderer)`, key);
          continue;
        }
        const f = checkSignatureFreshness(sig as { canonicalHash: string; renderedHash: string }, key, { canonicalHash: hash(current.get(key)), renderedHash: rendered });
        for (const x of f) push(x.check, file, x.message, key);
      }
    }
  }

  for (const file of profileFiles.filter((f) => f.endsWith('.overlay.md'))) {
    counts.overlays += 1;
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
    for (const f of checkOverlayKeys(parsed, file, v.universe)) push(f.check, file, f.message, f.key);
    for (const f of checkOverlayPins(parsed, { units: v.units, entries: v.entries })) push(f.check, file, f.message, f.key);
  }

  return { findings, counts };
}

/** The report lines the diff-guard CLI prints. */
export function formatFreshness(report: FreshnessReport): string[] {
  const c = report.counts;
  const head = `${SWEEP_NAME}: ${report.findings.length === 0 ? 'PASS' : 'FAIL'} — ${c.records} record(s), ${c.units} unit(s), ${c.notes} note(s), ${c.dispositions} dispositions file(s), ${c.overlays} overlay(s)`;
  return [head, ...report.findings.map((f) => `  [${f.check}] ${f.message}`)];
}
