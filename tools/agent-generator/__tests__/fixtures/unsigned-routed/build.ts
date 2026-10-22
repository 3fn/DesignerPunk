/**
 * T-UR / T-CI — the fixture tree for the unsigned-routed list (signing ballot 2026-10-01 § 2
 * clause 3, erratum ratified 2026-10-21; fixtures FU1–FU32 specified by Stacy, built by Thurgood).
 *
 * A sweep-consistent consumer profile for ONE fixture agent (owner `kenya`, C1 signer `kenya`),
 * written from code so every hash is real: the charter (`canonical/agents/kenya.md`), its
 * operative-set record and confirmation note, the dispositions file, the overlay, and — when a row
 * is signed — the signature sheet. The rows default to Stacy's table (r1…r19); a test overrides
 * rows, so the clean baseline is "every unit and entry `retained`, nothing signed".
 *
 * The rendered hash a signature pins comes from {@link RENDERED} (the sweep's `renderedHash`
 * option, as the freshness tests use it), so no consumer rendering is needed.
 *
 * Read by: `freshness.unsigned-routed.test.ts` (T-UR, the sweep) and
 * `verify-signing-chain.first-signature.test.ts` (T-CI, the same tree committed into a throwaway
 * git repository).
 */

import * as fs from 'fs';
import * as path from 'path';
import { hashEntry, hashText } from '../../../regrounding/hash';

export const CHARTER = 'canonical/agents/kenya.md';
export const RECORD = 'canonical/operative-sets/kenya.yaml';
export const NOTE = 'canonical/profiles/consumer/confirmations/kenya.md';
export const DISP = 'canonical/profiles/consumer/kenya.dispositions.yaml';
export const OVERLAY = 'canonical/profiles/consumer/kenya.overlay.md';
export const SHEET = 'canonical/profiles/consumer/signatures/kenya.md';

/** A unit of the fixture charter: its item sentences, plus non-item lines (removable text). */
interface UnitDef {
  title: string;
  items: string[];
  extra?: string[];
}
const word = (a: string): string => a.slice(1, 2).toUpperCase() + a.slice(2);
const items = (a: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${word(a)} rule ${i + 1} applies here.`);

/** The charter's body units, in order (r1–r19's anchors). */
export const UNITS: Record<string, UnitDef> = {
  '#alpha': { title: 'Alpha', items: items('#alpha', 4) },
  '#beta': { title: 'Beta', items: items('#beta', 4), extra: ['Beta local note for this repository only.'] },
  '#gamma': { title: 'Gamma', items: items('#gamma', 4) },
  '#delta': { title: 'Delta', items: [], extra: ['Delta has no operative item.'] },
  '#epsilon': { title: 'Epsilon', items: items('#epsilon', 1) },
  '#zeta': { title: 'Zeta', items: items('#zeta', 1) },
  '#eta': { title: 'Eta', items: items('#eta', 1) },
  '#theta': { title: 'Theta', items: items('#theta', 4) },
  '#iota': { title: 'Iota', items: items('#iota', 1) },
  '#kappa': { title: 'Kappa', items: items('#kappa', 1) },
  '#lambda': { title: 'Lambda', items: items('#lambda', 1) },
  '#mu': { title: 'Mu', items: items('#mu', 1) },
  '#nu': { title: 'Nu', items: items('#nu', 1) },
};

/** The charter's frontmatter (entry leaves: agent, model, writeScope[a], writeScope[b], tools[x]). */
export const FRONTMATTER = { agent: 'kenya', model: 'opus', writeScope: ['a', 'b'], tools: ['x'] };
export const ENTRY_VALUES: Record<string, unknown> = { agent: 'kenya', model: 'opus', 'writeScope[a]': 'a', 'writeScope[b]': 'b', 'tools[x]': 'x' };

const unitText = (anchor: string, def: UnitDef, keep?: number, drop?: boolean): string => {
  const lines = [...def.items.slice(0, keep ?? def.items.length), ...(drop ? [] : def.extra ?? [])];
  const head = anchor === '#alpha' ? '\n# Kenya — iOS Platform Engineer (fixture)\n\n' : '';
  return `${head}## ${def.title}\n\n${lines.join('\n')}\n\n`;
};

export const charterText = (): string =>
  `---\nagent: kenya\nmodel: opus\nwriteScope:\n  - a\n  - b\ntools:\n  - x\n---\n${Object.entries(UNITS)
    .map(([a, d]) => unitText(a, d))
    .join('')}`;

/** The exact canonical text of a unit (what partition() returns for it). */
export const canonicalUnit = (anchor: string): string => unitText(anchor, UNITS[anchor]);

/** The current canonical hash of a row: hashText of a body unit, hashEntry of an entry. */
export const currentHash = (section: 'body' | 'frontmatter', key: string): string =>
  section === 'body'
    ? UNITS[key]
      ? hashText(canonicalUnit(key))
      : hashText(`no current unit: ${key}`) // an orphan key or a shared member: no charter unit to hash
    : hashEntry(ENTRY_VALUES[key]);

/** The rendered hash every fixture signature pins (the sweep's `renderedHash` option). */
export const RENDERED = (_file: string, section: string, key: string): string => hashText(`rendered:${section}:${key}`);

export type SigState = 'fresh' | 'stale' | 'refuse';
export interface RowState {
  disposition: 'retained' | 're-pointed' | 'superseded-by' | 'no-consumer-counterpart';
  /** re-pointed body: how many items the overlay keeps (default all). */
  keep?: number;
  /** re-pointed body: drop the unit's non-item lines with this removal cite. */
  removal?: string;
  sig?: SigState;
}

/** Stacy's table (r1…r19). Keys: body anchors, or `fm:<entry path>`. `null` = no row (r18). */
export const STACY_TABLE: Record<string, RowState | null> = {
  '#alpha': { disposition: 're-pointed', keep: 1 }, // r1 ROUTES below-half
  '#beta': { disposition: 're-pointed', removal: 'subtraction-2' }, // r2 ROUTES repo-specific-removal
  '#gamma': { disposition: 're-pointed', keep: 3 }, // r3 CLEARS
  '#delta': { disposition: 're-pointed', removal: 'subtraction-5' }, // r4 INAPPLICABLE (no items)
  '#epsilon': { disposition: 'retained' }, // r5
  '#zeta': { disposition: 'no-consumer-counterpart' }, // r6
  '#eta': { disposition: 'superseded-by' }, // r7
  'fm:writeScope[a]': { disposition: 'no-consumer-counterpart' }, // r8
  'fm:writeScope[b]': { disposition: 'superseded-by' }, // r9
  'fm:tools[x]': { disposition: 're-pointed' }, // r10
  'fm:model': { disposition: 'retained' }, // r11
  '#theta': { disposition: 're-pointed', keep: 1, sig: 'fresh' }, // r13 ROUTES, signed
  '#iota': { disposition: 'no-consumer-counterpart', sig: 'stale' }, // r14
  '#kappa': { disposition: 'retained', sig: 'stale' }, // r15
  '#lambda': { disposition: 'no-consumer-counterpart', sig: 'refuse' }, // r16
  '#mu': null, // r18 missing row
};

export interface TreeSpec {
  /** Row overrides; a key absent here is `retained`, unsigned. `null` = no row. */
  rows?: Record<string, RowState | null>;
  /** r17: an `#gone` no-consumer-counterpart row naming no current unit. */
  orphan?: boolean;
  /** r19: the record unit `#nu` pinned to a stale canonicalHash. */
  staleRecord?: boolean;
}

/** The spec that reproduces Stacy's whole table (r1–r19). */
export const FULL_TABLE: TreeSpec = { rows: STACY_TABLE, orphan: true, staleRecord: true };

const STALE_PIN = hashText('stale pin — an older canonical text');

const sectionOf = (k: string): ['body' | 'frontmatter', string] => (k.startsWith('fm:') ? ['frontmatter', k.slice(3)] : ['body', k]);
/** The evidence fragment / sheet heading of a row (freshness.ts `evidenceFragment`). */
export const fragmentOf = (section: 'body' | 'frontmatter', key: string): string => (section === 'frontmatter' ? `#frontmatter:${key}` : key);

/** A fresh signature (and its sheet block) for a row, by C1 seat `signer`. */
export function signatureFor(section: 'body' | 'frontmatter', key: string, state: SigState, signer = 'kenya'): Record<string, unknown> {
  const sig: Record<string, unknown> = {
    signer,
    canonicalHash: state === 'stale' ? STALE_PIN : currentHash(section, key),
    renderedHash: RENDERED(DISP, section, key),
  };
  if (state === 'refuse') sig.refuse = 'should-re-point';
  else sig.assent = { surviving: [] };
  sig.evidence = `${SHEET}${fragmentOf(section, key)}`;
  return sig;
}
export const sheetBlock = (section: 'body' | 'frontmatter', key: string, sig: Record<string, unknown>): string =>
  `## \`${fragmentOf(section, key)}\`\n\nsigner: ${String(sig.signer)}\ncanonicalHash: ${String(sig.canonicalHash)}\nrenderedHash: ${String(sig.renderedHash)}\ndate: 2026-10-21\n\n**Ruling: ${sig.refuse ? 'REFUSE — should-re-point' : 'ASSENT'}.**\n\n`;
export const SHEET_PREAMBLE = '# Signatures — `kenya` (fixture)\n\n**Signer**: Kenya (C1, owner seat).\n\n';

/** One dispositions row line (flow style, one row per line — the U2b format `editRow` reads). */
function rowJson(section: 'body' | 'frontmatter', key: string, s: RowState): Record<string, unknown> {
  const row: Record<string, unknown> = { disposition: s.disposition };
  if (s.disposition === 're-pointed') {
    row.destination = section === 'body' ? key : `frontmatter:${key}`;
    if (s.removal) row.removals = [{ text: (UNITS[key]?.extra ?? [''])[0], cites: s.removal }];
  }
  if (s.disposition === 'superseded-by') {
    row.destination = section === 'body' ? '#epsilon' : 'frontmatter:model';
    row.cites = 'subtraction-4';
  }
  if (s.disposition === 'no-consumer-counterpart') row.cites = 'subtraction-3';
  if (s.sig) row.signature = signatureFor(section, key, s.sig);
  return row;
}

/** The files of a tree (repo-relative path → text). */
export function treeFiles(spec: TreeSpec = {}): Record<string, string> {
  const rows = spec.rows ?? {};
  const state = (k: string): RowState | null => (k in rows ? rows[k] : { disposition: 'retained' });
  const files: Record<string, string> = {};
  files[CHARTER] = charterText();

  // Record + confirmation note: every unit (C18 refuses an entered unit with no committed set).
  const rec: string[] = [`# Fixture operative-set record (C16) — Kenya confirms.`, `source: ${CHARTER}`, `owner: kenya`, `confirmer: kenya`, `units:`];
  const note: string[] = ['# Operative-set confirmation — `kenya` (fixture)', ''];
  for (const [a, d] of Object.entries(UNITS)) {
    const pin = spec.staleRecord && a === '#nu' ? STALE_PIN : hashText(canonicalUnit(a));
    const ids = d.items.map((_, i) => `${a.slice(1)}-${i + 1}`);
    rec.push(`  ${JSON.stringify(a)}:`, `    canonicalHash: ${pin}`);
    if (ids.length === 0) rec.push('    items: []');
    else {
      rec.push('    items:');
      d.items.forEach((t, i) => rec.push(`      - id: ${ids[i]}`, '        kind: obligation', `        label: ${JSON.stringify(`${d.title} ${i + 1}`)}`, `        text: ${JSON.stringify(t)}`));
    }
    rec.push(`    confirmation: ${NOTE}${a}`);
    note.push(`## \`${a}\``, '', 'confirmer: kenya', `canonicalHash: ${pin}`, `items: ${ids.length ? ids.join(', ') : 'none'}`, 'date: 2026-10-21', '');
  }
  files[RECORD] = `${rec.join('\n')}\n`;
  files[NOTE] = `${note.join('\n')}\n`;

  // Dispositions, overlay, sheet.
  const disp: string[] = ['# T-UR fixture dispositions file — Kenya (signer kenya under C1).', `source: ${CHARTER}`, 'body:'];
  const overlay: string[] = [];
  let sheet = '';
  const emit = (section: 'body' | 'frontmatter', key: string, s: RowState): void => {
    const row = rowJson(section, key, s);
    disp.push(`  ${JSON.stringify(key)}: ${JSON.stringify(row)}`);
    if (row.signature) sheet += sheetBlock(section, key, row.signature as Record<string, unknown>);
    if (s.disposition === 're-pointed') {
      if (section === 'body') overlay.push(`## @unit ${key} @ ${hashText(canonicalUnit(key))}`, unitText(key, UNITS[key], s.keep, s.removal !== undefined).replace(/\n$/, ''));
      else overlay.push(`## @entry ${key} @ ${hashEntry(ENTRY_VALUES[key])}`, `${String(ENTRY_VALUES[key])} (re-grounded)`, '');
    }
  };
  for (const a of Object.keys(UNITS)) {
    const s = state(a);
    if (s) emit('body', a, s);
  }
  if (spec.orphan) disp.push(`  "#gone": ${JSON.stringify({ disposition: 'no-consumer-counterpart', cites: 'subtraction-3' })}`); // r17
  disp.push('frontmatter:');
  for (const k of Object.keys(ENTRY_VALUES)) {
    const s = state(`fm:${k}`);
    if (s) emit('frontmatter', k, s);
  }
  files[DISP] = `${disp.join('\n')}\n`;
  if (overlay.length > 0) files[OVERLAY] = `${overlay.join('\n')}\n`;
  if (sheet) files[SHEET] = SHEET_PREAMBLE + sheet;
  return files;
}

export function writeTree(root: string, spec: TreeSpec = {}): void {
  for (const [rel, text] of Object.entries(treeFiles(spec))) {
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), text);
  }
}

/** Every file under `root`, repo-relative (the sweep's `tracked` option). */
export function allFiles(root: string): Set<string> {
  const out = new Set<string>();
  const walk = (d: string): void => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else out.add(path.relative(root, p).split(path.sep).join('/'));
    }
  };
  walk(root);
  return out;
}

/** The row id both lists print (`rowIdOf`). */
export const idOf = (k: string): string => {
  const [section, key] = sectionOf(k);
  return section === 'frontmatter' ? `${DISP}#frontmatter:${key}` : `${DISP}${key}`;
};
export { sectionOf };
