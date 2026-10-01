/**
 * `verify-signing-chain` — the instrument of ballot `2026-10-01-signing-act-chain` (§§ 3–4),
 * register row `signing-act-consistency`. Owner: Thurgood. Its verdicts are Stacy's to read and
 * record; it decides nothing. Label, everywhere it prints: **consistency, not identity.**
 *
 * TWO MODES
 *
 *   --ci        links 1–3, inside the required context `122-diff-guard` (§ 4.1). Order:
 *                 (1) the full `operative-set-freshness` sweep, FIRST, on every PR, independent of
 *                     the walk's floor (F11) — when `regrounding/freshness.ts` is on the tree;
 *                 (2) history: refuses a shallow or unreadable history, loudly (F10);
 *                 (3) the walk over every commit in `base..head`:
 *                       link 1 — decided PER SIGNING COMMIT: the act moves the row's pinned
 *                                `canonicalHash`/`renderedHash` (F5 fails, F14 passes);
 *                       link 2 — every hunk, and every commit carrying one, stays inside the
 *                                signer's objects (F4, F12); a seat that signs in range does not
 *                                edit its own charter in another commit of the range (F12′); a
 *                                merge result on a signing path equals one parent's blob (F7, F13);
 *                       link 3 — `signer` = `c1Seat(row)` = the commit's single `Agent:` trailer
 *                                (F1, F2, F3, F8);
 *                 (4) the floor, AFTER the sweep: no in-scope commit touches
 *                     `canonical/profiles/**` → `signing-chain: no signing paths in range — 0 rows
 *                     (pass)`; otherwise the rows checked are printed and zero FAILS.
 *               The C6 no-op lock is never read (the C6 carve-out, ballot § 6.3).
 *
 *   --audit     links 4–7, local, post-acceptance, never blocking (§§ 4.2–4.4). `--pr N` reads
 *               `refs/pull/N/head`; `--branch <b>` reads a unit branch. Walks EVERY act (never a
 *               sample) against the harness store (`--store`, default
 *               `~/.claude/projects/<project>/`). One verdict per act from the closed set
 *               `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly`, link-numbered,
 *               never rolled up. Exit 0 unless the command itself cannot run.
 *
 * WHAT A SIGNING ACT IS, as this instrument reads it (ballot § 2 clause 1):
 *   - a change to a dispositions row's `signature` sub-object
 *     (`canonical/profiles/**\/*.dispositions.yaml`);
 *   - a change to a `## ` section of a signature sheet (`…/signatures/*.md`, keyed to its row through
 *     the row's `evidence:` pointer) or of a confirmation sheet (`…/confirmations/*.md`, keyed to an
 *     operative-set unit through the record's `confirmation:` pointer);
 *   - a change to an operative-set record unit's `canonicalHash` (`canonical/operative-sets/*.yaml`)
 *     — the C16 re-confirmation (READING NOTE for Stacy: the ballot names a "confirmation
 *     sub-object" inside SIGNATURE_FIELDS; on U2b's tree no dispositions row carries one, and the
 *     confirmer's act moves the record unit's `canonicalHash`, so that field is read as the
 *     confirmer's object; every other record field is authoring).
 *   A sheet's preamble (text before its first `## `) counts as the seat's object only when every
 *   section of the new sheet names the trailer's seat (a new sheet is created by its signer).
 *
 * THE RULE DOES NOT REACH BACK (§ 2 clause 8): `--ci` excludes commits whose committer date is
 * before R's (`R_SHA`, the merge of #243) and prints how many it excluded; `--audit` walks them
 * and labels each verdict `pre-ratification observation` (§ 6.4).
 *
 * MODULE LOADING: the C1 function (`c1.ts`), `ownerOf` (`signatures.ts`), the sweep
 * (`freshness.ts`) and `rowSpanSource` (`../derive.ts`) exist only on Spec 123 U2b's unit branch
 * until it merges. They are loaded by feature detection ({@link loadRegrounding}); on a tree
 * without them and without signing surfaces, `--ci` prints that there is nothing to sweep and
 * walks nothing; on a tree WITH signing surfaces but without them, it fails loud.
 *
 * Traces to: ballot 2026-10-01-signing-act-chain §§ 2–4, 6.3; issue
 * `.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md`.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter, splitFrontmatterText } from '../frontmatter';
import { partition } from '../partition';

// ============================================================================
// Constants
// ============================================================================

export const LABEL = 'consistency, not identity';
export const BALLOT = '.kiro/docs/ballots/2026-10-01-signing-act-chain.md';
/** R — Peter's merge of #243 on `main` (ballot § "Status": the rule's effective point). */
export const R_SHA = '2da748642e7f27ce09a8c414009d85083a4e18fa';
export const NO_SIGNING_PATHS_LINE = 'signing-chain: no signing paths in range — 0 rows (pass)';
export const PROFILES_DIR = 'canonical/profiles';
export const RECORDS_DIR = 'canonical/operative-sets';
export const CONSUMER_OUTPUT_DIR = 'canonical/_consumer-output';
export const SHARED_CATALOG_DEFAULT = 'canonical/shared/shared-catalog.yaml';
/** Spec 123 Task 11's precursor of the sweep (on `main` until U2b's Task 13.6 deletes it). */
export const PRECURSOR_TEST = 'src/__tests__/operative-set-records.test.ts';
const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';

export const isDispositionsPath = (p: string): boolean => p.startsWith(`${PROFILES_DIR}/`) && p.endsWith('.dispositions.yaml');
export const isSignatureSheetPath = (p: string): boolean => p.startsWith(`${PROFILES_DIR}/`) && /(^|\/)signatures\/[^/]+\.md$/.test(p);
export const isConfirmationSheetPath = (p: string): boolean => p.startsWith(`${PROFILES_DIR}/`) && /(^|\/)confirmations\/[^/]+\.md$/.test(p);
export const isRecordPath = (p: string): boolean => p.startsWith(`${RECORDS_DIR}/`) && p.endsWith('.yaml');
export const isSigningPath = (p: string): boolean =>
  isDispositionsPath(p) || isSignatureSheetPath(p) || isConfirmationSheetPath(p) || isRecordPath(p);

// ============================================================================
// git
// ============================================================================

/** A history the walk cannot read — shallow, unresolvable, or a failing git call. Always loud. */
export class HistoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HistoryError';
  }
}

const MAX_BUFFER = 512 * 1024 * 1024;

export function git(repo: string, args: string[], input?: string): string {
  return execFileSync('git', args, { cwd: repo, encoding: 'utf8', maxBuffer: MAX_BUFFER, input, stdio: ['pipe', 'pipe', 'pipe'] });
}

function gitTry(repo: string, args: string[]): string | undefined {
  try {
    return git(repo, args);
  } catch {
    return undefined;
  }
}

/** The text of `file` at `commit`, or undefined when it does not exist there. */
export function blobText(repo: string, commit: string, file: string): string | undefined {
  return gitTry(repo, ['cat-file', '-p', `${commit}:${file}`]);
}

/** The blob id of `file` at `commit`, or undefined when absent. */
function blobId(repo: string, commit: string, file: string): string | undefined {
  return gitTry(repo, ['rev-parse', '--verify', '--quiet', `${commit}:${file}`])?.trim() || undefined;
}

function resolveCommit(repo: string, ref: string): string | undefined {
  return gitTry(repo, ['rev-parse', '--verify', '--quiet', `${ref}^{commit}`])?.trim() || undefined;
}

function listWorkingFiles(repo: string, rel: string): string[] {
  const out: string[] = [];
  const walk = (d: string): void => {
    if (!fs.existsSync(path.join(repo, d))) return;
    for (const e of fs.readdirSync(path.join(repo, d), { withFileTypes: true })) {
      const p = `${d}/${e.name}`;
      if (e.isDirectory()) walk(p);
      else if (e.isFile()) out.push(p);
    }
  };
  walk(rel);
  return out;
}

function lsTree(repo: string, commit: string, dir: string): string[] {
  const out = gitTry(repo, ['ls-tree', '-r', '-z', '--name-only', commit, '--', dir]);
  return out ? out.split('\0').filter(Boolean) : [];
}

// ============================================================================
// The regrounding modules (feature-detected — U2b's unit branch until it merges)
// ============================================================================

export interface OwnerContext {
  sharedOwners?: Readonly<Record<string, string>>;
  recordOwners?: Readonly<Record<string, string>>;
}

export interface SweepResult {
  pass: boolean;
  lines: string[];
}

/** What the walk needs from the regrounding modules. Tests may inject it. */
export interface Regrounding {
  c1Seat(owner: string): string;
  ownerOf(source: string, memberId: string | undefined, ctx: OwnerContext): string | undefined;
  rowSpanSource(docSource: string, section: string, key: string): string;
  sharedCatalog: string;
  /** The `operative-set-freshness` sweep over a working tree, when `freshness.ts` exists. */
  sweep?: (repoRoot: string) => SweepResult;
}

const hasModule = (dir: string, rel: string): boolean => ['.ts', '.js'].some((ext) => fs.existsSync(path.join(dir, rel + ext)));

/**
 * Load the regrounding modules beside this file. `undefined` when `c1` or `signatures` is absent
 * (a tree without the consumer profile). A module that exists but fails to load THROWS — absence
 * is the only quiet case.
 */
export function loadRegrounding(dir: string = __dirname): Regrounding | undefined {
  if (!hasModule(dir, 'c1') || !hasModule(dir, 'signatures')) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const c1 = require(path.join(dir, 'c1')) as { c1Seat(owner: string): string };
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sig = require(path.join(dir, 'signatures')) as {
    ownerOf(source: string, memberId: string | undefined, ctx: OwnerContext): string | undefined;
    SHARED_CATALOG_SOURCE?: string;
  };
  const derive = hasModule(dir, '../derive')
    ? // eslint-disable-next-line @typescript-eslint/no-var-requires
      (require(path.join(dir, '../derive')) as { rowSpanSource?: (s: string, sec: string, k: string) => string })
    : undefined;
  const sharedCatalog = sig.SHARED_CATALOG_SOURCE ?? SHARED_CATALOG_DEFAULT;
  const rg: Regrounding = {
    c1Seat: (owner) => c1.c1Seat(owner),
    ownerOf: (source, memberId, ctx) => sig.ownerOf(source, memberId, ctx),
    rowSpanSource: derive?.rowSpanSource ?? mirrorRowSpanSource(sharedCatalog),
    sharedCatalog,
  };
  if (hasModule(dir, 'freshness')) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fresh = require(path.join(dir, 'freshness')) as {
      runFreshnessSweep(root: string): { findings: unknown[] };
      formatFreshness(r: { findings: unknown[] }): string[];
    };
    rg.sweep = (root) => {
      const report = fresh.runFreshnessSweep(root);
      return { pass: report.findings.length === 0, lines: fresh.formatFreshness(report) };
    };
  }
  return rg;
}

/** derive.ts's `rowSpanSource` forms (10.S), used only when derive.ts is absent. */
export const mirrorRowSpanSource =
  (sharedCatalog: string) =>
  (docSource: string, section: string, key: string): string =>
    section === 'frontmatter' ? `${docSource}#frontmatter:${key}` : section === 'members' ? `${sharedCatalog}#${key}` : `${docSource}${key}`;

// ============================================================================
// Parsing helpers
// ============================================================================

type Section = 'body' | 'frontmatter' | 'members';
const SECTIONS: readonly Section[] = ['body', 'frontmatter', 'members'];

const isMap = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

function stable(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`;
  if (isMap(v)) return `{${Object.keys(v).sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(',')}}`;
  return JSON.stringify(v ?? null);
}
const same = (a: unknown, b: unknown): boolean => stable(a) === stable(b);

function parseYamlMap(text: string | undefined): { doc: Record<string, unknown>; error?: string } {
  if (text === undefined) return { doc: {} };
  try {
    const d = loadYaml(text);
    return { doc: isMap(d) ? d : {} };
  } catch (e) {
    return { doc: {}, error: (e as Error).message.split('\n')[0] };
  }
}

const commentLines = (text: string | undefined): string =>
  (text ?? '')
    .split('\n')
    .filter((l) => /^\s*#/.test(l))
    .sort()
    .join('\n');

/** A sheet split into its preamble and its `## ` sections (heading: one pair of backticks removed). */
export function splitSheet(text: string | undefined): { preamble: string; sections: Map<string, string> } {
  const sections = new Map<string, string>();
  if (text === undefined) return { preamble: '', sections };
  const chunks = text.split(/^(?=## )/m);
  let preamble = '';
  for (const chunk of chunks) {
    if (!chunk.startsWith('## ')) {
      preamble += chunk;
      continue;
    }
    const heading = chunk.split('\n')[0].replace(/^## /, '').trim().replace(/^`(.*)`$/, '$1');
    let k = heading;
    for (let n = 2; sections.has(k); n += 1) k = `${heading} (${n})`;
    sections.set(k, chunk);
  }
  return { preamble, sections };
}

export const sheetField = (block: string | undefined, key: string): string | undefined =>
  block === undefined ? undefined : new RegExp(`^${key}: (.*)$`, 'm').exec(block)?.[1]?.trim();

/** The row id an act is reported under (`<dispositions file>#<row>`, or `<record>#<unit>`). */
export function rowIdOf(file: string, section: Section | 'unit', key: string): string {
  if (section === 'frontmatter') return `${file}#frontmatter:${key}`;
  if (key.startsWith('#')) return `${file}${key}`;
  return `${file}#${key}`;
}

/** The fragment a signature's `evidence:` names for a row (freshness.ts `evidenceFragment`). */
const evidenceFragment = (section: Section, key: string): string =>
  section === 'frontmatter' ? `#frontmatter:${key}` : section === 'members' ? `#${key}` : key;

// ============================================================================
// Per-commit analysis
// ============================================================================

export interface CommitInfo {
  sha: string;
  parents: string[];
  subject: string;
  committerTime: number;
  trailers: string[];
}

export interface SigningAct {
  rowId: string;
  kind: 'signature' | 'confirmation';
  file: string;
  section: Section | 'unit';
  key: string;
  /** The canonical source the row re-grounds. */
  source?: string;
  /** c1Seat(owner(row)) — undefined when the owner does not resolve. */
  seat?: string;
  /** Every `signer`/`confirmer` this commit writes for the row (signature field, sheet lines). */
  signerFields: string[];
  /** Did the commit touch the row's PINNED hash (signature sub-object / record unit hash)? */
  pinnedTouched: boolean;
  pinnedMoved: boolean;
  /** For sheet-only changes: the section is new/removed or its hash lines moved. */
  sectionMoved: boolean;
  via: string[];
}

export const actMoved = (a: SigningAct): boolean => (a.pinnedTouched ? a.pinnedMoved : a.sectionMoved);

export interface CommitAnalysis extends CommitInfo {
  merge: boolean;
  paths: string[];
  touchesProfiles: boolean;
  acts: Map<string, SigningAct>;
  /** Changes outside every signing object (authoring, other paths, parse failures). */
  outside: string[];
  /** Sheet preambles changed: [sheet, the seats its new sections name]. */
  preambles: { sheet: string; seats: string[] }[];
  /** For merges: signing paths whose result equals no parent's blob. */
  mergeDiffs: string[];
}

interface EvidenceTarget {
  file: string;
  section: Section;
  key: string;
  source?: string;
}
interface ConfirmationTarget {
  file: string;
  unit: string;
  owner?: string;
  source?: string;
}

/** Per-commit tree indices (owners, evidence pointers, confirmation pointers) — built lazily. */
class TreeIndex {
  private evidenceMap?: Map<string, EvidenceTarget>;
  private confirmMap?: Map<string, ConfirmationTarget>;
  private ctx?: OwnerContext;
  constructor(
    private readonly repo: string,
    readonly sha: string,
    private readonly sharedCatalog: string
  ) {}

  ownerCtx(): OwnerContext {
    if (this.ctx) return this.ctx;
    const recordOwners: Record<string, string> = {};
    for (const f of lsTree(this.repo, this.sha, RECORDS_DIR).filter(isRecordPath)) {
      const r = parseYamlMap(blobText(this.repo, this.sha, f)).doc;
      if (typeof r.source === 'string' && typeof r.owner === 'string') recordOwners[r.source] = r.owner;
    }
    const sharedOwners: Record<string, string> = {};
    const shared = parseYamlMap(blobText(this.repo, this.sha, this.sharedCatalog)).doc;
    for (const m of Array.isArray(shared.members) ? shared.members : []) {
      if (isMap(m) && typeof m.id === 'string' && typeof m.owner === 'string') sharedOwners[m.id] = m.owner;
    }
    this.ctx = { recordOwners, sharedOwners };
    return this.ctx;
  }

  evidence(): Map<string, EvidenceTarget> {
    if (this.evidenceMap) return this.evidenceMap;
    const m = new Map<string, EvidenceTarget>();
    for (const f of lsTree(this.repo, this.sha, PROFILES_DIR).filter(isDispositionsPath)) {
      const doc = parseYamlMap(blobText(this.repo, this.sha, f)).doc;
      const source = typeof doc.source === 'string' ? doc.source : undefined;
      for (const section of SECTIONS) {
        const rows = isMap(doc[section]) ? (doc[section] as Record<string, unknown>) : {};
        for (const [key, row] of Object.entries(rows)) {
          const sig = isMap(row) ? row.signature : undefined;
          if (isMap(sig) && typeof sig.evidence === 'string') m.set(sig.evidence, { file: f, section, key, source });
        }
      }
    }
    this.evidenceMap = m;
    return m;
  }

  confirmations(): Map<string, ConfirmationTarget> {
    if (this.confirmMap) return this.confirmMap;
    const m = new Map<string, ConfirmationTarget>();
    for (const f of lsTree(this.repo, this.sha, RECORDS_DIR).filter(isRecordPath)) {
      const r = parseYamlMap(blobText(this.repo, this.sha, f)).doc;
      const owner = typeof r.owner === 'string' ? r.owner : undefined;
      const source = typeof r.source === 'string' ? r.source : undefined;
      for (const [unit, u] of Object.entries(isMap(r.units) ? r.units : {})) {
        if (isMap(u) && typeof u.confirmation === 'string') m.set(u.confirmation, { file: f, unit, owner, source });
      }
    }
    this.confirmMap = m;
    return m;
  }
}

/** Read every commit of `base..head`, parents before children. */
export function readRange(repo: string, base: string, head: string): CommitInfo[] {
  const SEP = '\x1e';
  const END = '\x1d';
  let out: string;
  try {
    out = git(repo, [
      'log',
      '--topo-order',
      '--reverse',
      `--format=%H${SEP}%P${SEP}%s${SEP}%ct${SEP}%(trailers:key=Agent,valueonly,separator=%x1f)${END}`,
      `${base}..${head}`,
    ]);
  } catch (e) {
    throw new HistoryError(`cannot read ${base}..${head}: ${(e as Error).message.split('\n')[0]}`);
  }
  return out
    .split(END)
    .map((r) => r.replace(/^\n/, ''))
    .filter((r) => r.trim().length > 0)
    .map((r) => {
      const [sha, parents, subject, ct, trailers] = r.split(SEP);
      return {
        sha,
        parents: parents.trim() ? parents.trim().split(' ') : [],
        subject,
        committerTime: Number(ct),
        trailers: (trailers ?? '')
          .replace(/\n+$/, '')
          .split('\x1f')
          .map((t) => t.trim())
          .filter(Boolean),
      };
    });
}

function changedPaths(repo: string, from: string, to: string): string[] {
  return git(repo, ['diff-tree', '-r', '-z', '--no-renames', '--name-only', from, to]).split('\0').filter(Boolean);
}

/**
 * Classify one commit's changes into signing acts, out-of-object changes and (for merges)
 * merge results. Pure over git objects.
 */
export function analyzeCommit(repo: string, info: CommitInfo, rg: Regrounding | undefined): CommitAnalysis {
  const sharedCatalog = rg?.sharedCatalog ?? SHARED_CATALOG_DEFAULT;
  const an: CommitAnalysis = {
    ...info,
    merge: info.parents.length > 1,
    paths: [],
    touchesProfiles: false,
    acts: new Map(),
    outside: [],
    preambles: [],
    mergeDiffs: [],
  };

  if (an.merge) {
    const all = new Set<string>();
    for (const p of info.parents) for (const f of changedPaths(repo, p, info.sha)) all.add(f);
    an.paths = [...all].sort();
    an.touchesProfiles = an.paths.some((p) => p.startsWith(`${PROFILES_DIR}/`));
    for (const f of an.paths.filter(isSigningPath)) {
      const result = blobId(repo, info.sha, f);
      if (!info.parents.some((p) => blobId(repo, p, f) === result)) an.mergeDiffs.push(f);
    }
    return an;
  }

  const parent = info.parents[0] ?? EMPTY_TREE;
  an.paths = changedPaths(repo, parent, info.sha);
  an.touchesProfiles = an.paths.some((p) => p.startsWith(`${PROFILES_DIR}/`));
  const now = new TreeIndex(repo, info.sha, sharedCatalog);
  const before = info.parents[0] ? new TreeIndex(repo, info.parents[0], sharedCatalog) : undefined;
  const oldText = (f: string): string | undefined => (info.parents[0] ? blobText(repo, info.parents[0], f) : undefined);
  const newText = (f: string): string | undefined => blobText(repo, info.sha, f);

  const seatOf = (source: string | undefined, section: Section | 'unit', key: string, owner?: string): string | undefined => {
    if (!rg) return undefined;
    const o = owner ?? (source ? rg.ownerOf(source, section === 'members' ? key : undefined, now.ownerCtx()) : undefined);
    return o === undefined ? undefined : rg.c1Seat(o);
  };
  const act = (kind: SigningAct['kind'], file: string, section: Section | 'unit', key: string, source: string | undefined, owner?: string): SigningAct => {
    const id = rowIdOf(file, section, key);
    let a = an.acts.get(id);
    if (!a) {
      a = {
        rowId: id,
        kind,
        file,
        section,
        key,
        source,
        seat: seatOf(source, section, key, owner),
        signerFields: [],
        pinnedTouched: false,
        pinnedMoved: false,
        sectionMoved: false,
        via: [],
      };
      an.acts.set(id, a);
    }
    return a;
  };

  for (const f of an.paths) {
    if (isDispositionsPath(f)) {
      const o = oldText(f);
      const n = newText(f);
      const po = parseYamlMap(o);
      const pn = parseYamlMap(n);
      if (po.error || pn.error) {
        an.outside.push(`${f}: YAML does not parse (${pn.error ?? po.error}) — cannot confine the change to signature objects`);
        continue;
      }
      const source = typeof pn.doc.source === 'string' ? pn.doc.source : typeof po.doc.source === 'string' ? po.doc.source : undefined;
      for (const k of new Set([...Object.keys(po.doc), ...Object.keys(pn.doc)])) {
        if ((SECTIONS as readonly string[]).includes(k)) continue;
        if (!same(po.doc[k], pn.doc[k])) an.outside.push(`${f}: top-level '${k}' changed (authoring)`);
      }
      if (commentLines(o) !== commentLines(n)) an.outside.push(`${f}: comment lines changed (authoring)`);
      for (const section of SECTIONS) {
        const ro = isMap(po.doc[section]) ? (po.doc[section] as Record<string, unknown>) : {};
        const rn = isMap(pn.doc[section]) ? (pn.doc[section] as Record<string, unknown>) : {};
        for (const key of new Set([...Object.keys(ro), ...Object.keys(rn)])) {
          const a0 = isMap(ro[key]) ? (ro[key] as Record<string, unknown>) : undefined;
          const a1 = isMap(rn[key]) ? (rn[key] as Record<string, unknown>) : undefined;
          const { signature: s0, ...rest0 } = a0 ?? {};
          const { signature: s1, ...rest1 } = a1 ?? {};
          if (!same(a0 === undefined ? undefined : rest0, a1 === undefined ? undefined : rest1)) {
            const fields = [...new Set([...Object.keys(rest0), ...Object.keys(rest1)])].filter((x) => !same(rest0[x], rest1[x]));
            an.outside.push(`${rowIdOf(f, section, key)}: non-signature field(s) changed — ${fields.join(', ') || 'row added/removed'} (authoring)`);
          }
          if (same(s0, s1)) continue;
          const a = act('signature', f, section, key, source);
          a.via.push('signature');
          a.pinnedTouched = true;
          const m0 = isMap(s0) ? s0 : undefined;
          const m1 = isMap(s1) ? s1 : undefined;
          a.pinnedMoved = !m0 || !m1 || m0.canonicalHash !== m1.canonicalHash || m0.renderedHash !== m1.renderedHash;
          const signer = (m1 ?? m0)?.signer;
          if (typeof signer === 'string') a.signerFields.push(signer);
        }
      }
    } else if (isSignatureSheetPath(f) || isConfirmationSheetPath(f)) {
      const conf = isConfirmationSheetPath(f);
      const so = splitSheet(oldText(f));
      const sn = splitSheet(newText(f));
      const signerKey = conf ? 'confirmer' : 'signer';
      if (so.preamble !== sn.preamble) {
        an.preambles.push({ sheet: f, seats: [...sn.sections.values()].map((b) => sheetField(b, signerKey) ?? '(none)') });
      }
      for (const heading of new Set([...so.sections.keys(), ...sn.sections.keys()])) {
        const b0 = so.sections.get(heading);
        const b1 = sn.sections.get(heading);
        if (b0 === b1) continue;
        const pointer = `${f}#${heading.replace(/^#/, '')}`;
        const lookup = (idx: TreeIndex | undefined) => (idx ? (conf ? idx.confirmations() : idx.evidence()).get(pointer) : undefined);
        // `#frontmatter:x` / `#identity` / `#member-id` — the pointer is `<sheet>#<fragment>`.
        const target = lookup(now) ?? lookup(before);
        if (!target) {
          an.outside.push(`${f} § "${heading}": the section names no ${conf ? 'operative-set unit (no record confirmation: points here)' : 'dispositions row (no signature evidence: points here)'}`);
          continue;
        }
        const a = conf
          ? act('confirmation', target.file, 'unit', (target as ConfirmationTarget).unit, target.source, (target as ConfirmationTarget).owner)
          : act('signature', target.file, (target as EvidenceTarget).section, (target as EvidenceTarget).key, target.source);
        a.via.push(`sheet:${f}`);
        const moved =
          b0 === undefined ||
          b1 === undefined ||
          sheetField(b0, 'canonicalHash') !== sheetField(b1, 'canonicalHash') ||
          sheetField(b0, 'renderedHash') !== sheetField(b1, 'renderedHash');
        a.sectionMoved = a.sectionMoved || moved;
        const s = sheetField(b1 ?? b0, signerKey);
        if (s !== undefined) a.signerFields.push(s);
      }
    } else if (isRecordPath(f)) {
      const o = oldText(f);
      const n = newText(f);
      const po = parseYamlMap(o);
      const pn = parseYamlMap(n);
      if (po.error || pn.error) {
        an.outside.push(`${f}: YAML does not parse (${pn.error ?? po.error})`);
        continue;
      }
      for (const k of new Set([...Object.keys(po.doc), ...Object.keys(pn.doc)])) {
        if (k === 'units') continue;
        if (!same(po.doc[k], pn.doc[k])) an.outside.push(`${f}: '${k}' changed (authoring)`);
      }
      if (commentLines(o) !== commentLines(n)) an.outside.push(`${f}: comment lines changed (authoring)`);
      const uo = isMap(po.doc.units) ? po.doc.units : {};
      const un = isMap(pn.doc.units) ? pn.doc.units : {};
      const owner = typeof pn.doc.owner === 'string' ? pn.doc.owner : typeof po.doc.owner === 'string' ? po.doc.owner : undefined;
      const source = typeof pn.doc.source === 'string' ? pn.doc.source : undefined;
      for (const unit of new Set([...Object.keys(uo), ...Object.keys(un)])) {
        const u0 = isMap(uo[unit]) ? (uo[unit] as Record<string, unknown>) : undefined;
        const u1 = isMap(un[unit]) ? (un[unit] as Record<string, unknown>) : undefined;
        const { canonicalHash: h0, ...r0 } = u0 ?? {};
        const { canonicalHash: h1, ...r1 } = u1 ?? {};
        if (!same(u0 === undefined ? undefined : r0, u1 === undefined ? undefined : r1)) {
          const fields = [...new Set([...Object.keys(r0), ...Object.keys(r1)])].filter((x) => !same(r0[x], r1[x]));
          an.outside.push(`${rowIdOf(f, 'unit', unit)}: ${fields.join(', ') || 'unit added/removed'} changed (authoring — only the unit's canonicalHash is the confirmer's object)`);
        }
        if (h0 === h1) continue;
        const a = act('confirmation', f, 'unit', unit, source, owner);
        a.via.push('record');
        a.pinnedTouched = true;
        a.pinnedMoved = true;
      }
    } else {
      an.outside.push(`${f}: not a signing path`);
    }
  }
  return an;
}

// ============================================================================
// Links 1–3 over a range — `--ci`
// ============================================================================

export interface LinkFinding {
  link: 1 | 2 | 3;
  sha: string;
  row?: string;
  message: string;
}

export interface WalkResult {
  findings: LinkFinding[];
  rowsChecked: number;
  signingCommits: number;
  commits: number;
  excluded: number;
  touchesProfiles: boolean;
  analyses: CommitAnalysis[];
}

/** The charter paths a seat may not edit in a range where it signs (F12′). */
export const ownCharterPaths = (seat: string): string[] => [`canonical/agents/${seat}.md`, `.claude/agents/${seat}.md`];

/** Links 1–3 over `base..head`. Throws {@link HistoryError} on an unreadable history. */
export function walkRange(repo: string, base: string, head: string, rg: Regrounding | undefined, since?: string): WalkResult {
  if (gitTry(repo, ['rev-parse', '--is-shallow-repository'])?.trim() === 'true') {
    throw new HistoryError('the checkout is shallow — the walk needs full history (actions/checkout fetch-depth: 0); refusing to walk a partial range');
  }
  const b = resolveCommit(repo, base);
  const h = resolveCommit(repo, head);
  if (!b) throw new HistoryError(`base ${base} does not resolve to a commit in this history`);
  if (!h) throw new HistoryError(`head ${head} does not resolve to a commit in this history`);
  let sinceTime: number | undefined;
  if (since !== undefined) {
    const r = resolveCommit(repo, since);
    if (!r) throw new HistoryError(`R (${since}) does not resolve — cannot apply "does not reach back" (ballot § 2 clause 8)`);
    sinceTime = Number(git(repo, ['log', '-1', '--format=%ct', r]).trim());
  }

  const infos = readRange(repo, b, h);
  const inScope = infos.filter((c) => sinceTime === undefined || c.committerTime >= sinceTime);
  const findings: LinkFinding[] = [];
  const analyses = inScope.map((c) => analyzeCommit(repo, c, rg));
  let rowsChecked = 0;
  let signingCommits = 0;
  const signerSeats = new Set<string>();

  for (const an of analyses) {
    if (an.merge) {
      for (const f of an.mergeDiffs) {
        findings.push({ link: 2, sha: an.sha, message: `merge result on ${f} equals neither parent's blob — a merge writes signature content no seat's commit carried (F7/F13)` });
      }
      continue;
    }
    if (an.acts.size === 0) continue;
    signingCommits += 1;
    const push = (link: LinkFinding['link'], message: string, row?: string): void => {
      findings.push({ link, sha: an.sha, row, message });
    };
    const trailer = an.trailers.length === 1 ? an.trailers[0].toLowerCase() : undefined;
    if (an.trailers.length === 0) push(3, 'signing commit carries no Agent: trailer');
    if (an.trailers.length > 1) push(3, `signing commit carries ${an.trailers.length} Agent: trailers (${an.trailers.join(', ')}) — exactly one names the signer`);
    if (trailer) signerSeats.add(trailer);

    for (const a of an.acts.values()) {
      rowsChecked += 1;
      if (a.seat === undefined) {
        push(3, rg ? `cannot resolve the owner of ${a.source ?? '(unknown source)'} — the C1 seat is undecidable` : 'the C1 function (regrounding/c1.ts) is not on this tree — the signer cannot be decided', a.rowId);
      } else {
        for (const s of a.signerFields) {
          if (s.toLowerCase() !== a.seat) push(3, `${a.kind === 'confirmation' ? 'confirmer' : 'signer'} ${s} ≠ c1Seat ${a.seat}`, a.rowId);
        }
        if (trailer && trailer !== a.seat) {
          push(3, `Agent: trailer ${trailer} ≠ c1Seat ${a.seat}`, a.rowId);
          push(2, `the commit (Agent: ${trailer}) edits ${a.rowId}, an object of seat ${a.seat}`, a.rowId);
        }
      }
      if (!actMoved(a)) {
        push(1, a.pinnedTouched ? 're-sign leaves canonicalHash and renderedHash unchanged — the row is not on the stale list (F5)' : 'sheet section changed with no hash moved and no pinned hash moved in this commit — not on the stale list', a.rowId);
      }
    }
    for (const o of an.outside) push(2, `signing commit edits outside the signer's objects: ${o}`);
    for (const p of an.preambles) {
      if (!trailer || p.seats.length === 0 || p.seats.some((s) => s.toLowerCase() !== trailer)) {
        push(2, `sheet preamble of ${p.sheet} changed, and the sheet is not wholly the trailer's seat's (sections name: ${p.seats.join(', ') || 'none'})`);
      }
    }
  }

  // F12′ — a seat that signs in range does not edit its own charter in any commit of the range.
  for (const an of analyses) {
    if (an.merge || an.acts.size > 0 || an.trailers.length !== 1) continue;
    const t = an.trailers[0].toLowerCase();
    if (!signerSeats.has(t)) continue;
    const own = an.paths.filter((p) => ownCharterPaths(t).includes(p));
    if (own.length > 0) {
      findings.push({ link: 2, sha: an.sha, message: `seat ${t} signs in this range and this commit (Agent: ${t}) edits its own charter (${own.join(', ')}) — a charter self-edit split from the signing commit (F12′)` });
    }
  }

  return {
    findings,
    rowsChecked,
    signingCommits,
    commits: infos.length,
    excluded: infos.length - inScope.length,
    touchesProfiles: analyses.some((a) => a.touchesProfiles),
    analyses,
  };
}

export interface CiOptions {
  repo: string;
  base: string;
  head: string;
  rg?: Regrounding;
  /** R; `undefined` = no exclusion (fixtures). */
  since?: string;
  /** The sweep; default `rg.sweep`. `null` = none on this tree. */
  sweep?: ((repoRoot: string) => SweepResult) | null;
}

export interface CiResult {
  ok: boolean;
  lines: string[];
  rowsChecked: number;
  findings: LinkFinding[];
  sweepOk: boolean;
  historyError?: string;
}

/** `--ci`: the sweep first, then links 1–3, then the floor. Never reads the C6 lock. */
export function runCi(opts: CiOptions): CiResult {
  const lines: string[] = [`verify-signing-chain --ci — ${LABEL} (ballot 2026-10-01-signing-act-chain § 4.1)`];
  // (1) The sweep — first, on every run, independent of the floor (F11).
  const sweep = opts.sweep === undefined ? opts.rg?.sweep : opts.sweep ?? undefined;
  let sweepOk = true;
  if (sweep) {
    try {
      const r = sweep(opts.repo);
      sweepOk = r.pass;
      lines.push(...r.lines);
    } catch (e) {
      sweepOk = false;
      lines.push(`operative-set-freshness: FAIL — the sweep threw: ${(e as Error).message}`);
    }
  } else {
    const files = [PROFILES_DIR, RECORDS_DIR].flatMap((d) => listWorkingFiles(opts.repo, d));
    const signed = files.filter((f) => isDispositionsPath(f) || isSignatureSheetPath(f));
    const records = files.filter((f) => isRecordPath(f) || isConfirmationSheetPath(f));
    const precursor = fs.existsSync(path.join(opts.repo, PRECURSOR_TEST));
    if (signed.length > 0) {
      sweepOk = false;
      lines.push(`operative-set-freshness: FAIL — ${signed.length} dispositions/signature file(s) exist on this tree but regrounding/freshness.ts does not; refusing to pass an unswept profile`);
    } else if (records.length > 0 && !precursor) {
      sweepOk = false;
      lines.push(`operative-set-freshness: FAIL — ${records.length} operative-set record/confirmation file(s) exist, and neither regrounding/freshness.ts nor ${PRECURSOR_TEST} is on this tree to check them`);
    } else if (records.length > 0) {
      lines.push(
        `operative-set-freshness: not on this tree (pre-U2b) — its Task 11 precursor ${PRECURSOR_TEST} guards the ${records.length} operative-set record/confirmation file(s) here, in the functional lane; no dispositions or signature files exist to sweep`
      );
    } else {
      lines.push('operative-set-freshness: nothing to sweep — regrounding/freshness.ts is not on this tree and no profile or operative-set files exist');
    }
  }

  // (2)–(4) History, the walk, the floor.
  let walk: WalkResult;
  try {
    walk = walkRange(opts.repo, opts.base, opts.head, opts.rg, opts.since);
  } catch (e) {
    const msg = (e as Error).message;
    lines.push(`signing-chain: FAIL (history) — ${msg}`);
    return { ok: false, lines, rowsChecked: 0, findings: [], sweepOk, historyError: msg };
  }
  lines.push(
    `signing-chain: range ${opts.base.slice(0, 8)}..${opts.head.slice(0, 8)} — ${walk.commits} commit(s)` +
      (opts.since !== undefined ? `; ${walk.excluded} committed before R ${opts.since.slice(0, 8)} excluded (ballot § 2 clause 8 — the rule does not reach back)` : '')
  );
  for (const f of walk.findings) lines.push(`  FAIL link ${f.link} ${f.sha.slice(0, 8)}${f.row ? ` ${f.row}` : ''}: ${f.message}`);

  let floorOk = true;
  if (walk.rowsChecked === 0 && !walk.touchesProfiles) {
    lines.push(NO_SIGNING_PATHS_LINE);
  } else {
    lines.push(`signing-chain: ${walk.rowsChecked} row(s) checked across ${walk.signingCommits} signing commit(s)`);
    if (walk.rowsChecked === 0) {
      floorOk = false;
      lines.push('signing-chain: FAIL (floor) — the range touches canonical/profiles/** and the walk checked zero rows');
    }
  }
  const ok = sweepOk && floorOk && walk.findings.length === 0;
  lines.push(`signing-chain: ${ok ? 'PASS' : 'FAIL'} — ${LABEL}`);
  return { ok, lines, rowsChecked: walk.rowsChecked, findings: walk.findings, sweepOk };
}

// ============================================================================
// Links 4–7 — `--audit`
// ============================================================================

export type Verdict = 'anchored' | 'unanchored' | 'record absent' | 'FAIL' | 'anomaly';

export interface ActVerdict {
  sha: string;
  subject: string;
  row: string;
  seat: string;
  verdict: Verdict;
  link?: 4 | 5 | 6 | 7;
  detail: string;
  transcript?: string;
  spawnDepth?: number;
  model?: string;
  preRatification: boolean;
  /** § 5.4: a FAIL, an anomaly, or spawnDepth ≠ 1 sends the seat's acts in the PR into J. */
  widen: boolean;
}

interface Candidate {
  file: string;
  isMain: boolean;
  toolUseId: string;
  prefix: string;
  subject: string;
  proven: boolean;
}

/** All transcripts under a store: main sessions (`<store>/*.jsonl`) and subagents. */
export function listTranscripts(store: string): { file: string; isMain: boolean }[] {
  const out: { file: string; isMain: boolean }[] = [];
  if (!fs.existsSync(store)) return out;
  for (const e of fs.readdirSync(store, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const p = path.join(store, e.name);
    if (e.isFile() && e.name.endsWith('.jsonl')) out.push({ file: p, isMain: true });
    if (e.isDirectory()) {
      const sub = path.join(p, 'subagents');
      if (!fs.existsSync(sub)) continue;
      for (const s of fs.readdirSync(sub).sort()) if (/^agent-.*\.jsonl$/.test(s)) out.push({ file: path.join(sub, s), isMain: false });
    }
  }
  return out;
}

/**
 * `git <sub>` at a COMMAND position (line start, after `;` `&&` `||` `|` `(` `do` `then`, optional
 * `VAR=x` prefixes and `-C <dir>`) — so `grep 'git commit' notes.md` or a brief quoting a SHA is
 * never read as a commit call (§ 4.3: "a grep … is never a candidate").
 */
const gitInvocation = (sub: string): RegExp =>
  new RegExp(`(?:^|[\\n;&|(]|&&|\\|\\||\\bdo\\b|\\bthen\\b)\\s*(?:[A-Za-z_][A-Za-z0-9_]*=\\S*\\s+)*git(?:\\s+-[Cc]\\s+(?:"[^"]*"|'[^']*'|\\S+))*\\s+${sub}\\b`, 'm');
const GIT_COMMIT_RE = gitInvocation('commit');
const GIT_LOG_RE = gitInvocation('log');
const BRACKET_RE = /^\[(.+) ([0-9a-f]{7,40})\] (.*)$/;
const HEX_LINE_RE = /^([0-9a-f]{7,40}) (.*)$/;

/**
 * Success evidence form (b): a `git log` joined to the `git commit` by `&&` on the commit's line,
 * or the call runs under `set -e`. (Form (a), the commit's own `[<branch> <sha>]` line, needs no
 * command reading.)
 */
export function logFormProven(command: string): boolean {
  const andJoined = command.split('\n').some((l) => {
    const c = l.search(GIT_COMMIT_RE);
    if (c < 0) return false;
    const rest = l.slice(c);
    const amp = rest.indexOf('&&');
    return amp >= 0 && GIT_LOG_RE.test(rest.slice(amp));
  });
  const commitAt = command.search(GIT_COMMIT_RE);
  const setE = /(^|[\n;&|]\s*)set\s+(-[a-zA-Z]*e[a-zA-Z]*|-o\s+errexit)\b/m.exec(command);
  return andJoined || (setE !== null && setE.index < commitAt);
}

export const resultText = (content: unknown): string =>
  typeof content === 'string'
    ? content
    : Array.isArray(content)
      ? content.map((b) => (isMap(b) && typeof b.text === 'string' ? b.text : '')).join('\n')
      : '';

/** The candidate lines of one `git commit` tool call's result (§ 4.3's lookup rule). */
export function candidateLines(command: string, output: string): { prefix: string; subject: string; proven: boolean }[] {
  const out: { prefix: string; subject: string; proven: boolean }[] = [];
  const lines = output.split('\n').map((l) => l.replace(/\r$/, ''));
  for (const l of lines) {
    const m = BRACKET_RE.exec(l);
    if (m) out.push({ prefix: m[2], subject: m[3], proven: true });
  }
  if (GIT_LOG_RE.test(command)) {
    const proven = logFormProven(command);
    const loop = /(^|[\s;])(for|while)\s/.test(command) && /\blog\b[^\n]*(-1\b|-n\s*1\b|--max-count=1\b)/.test(command);
    const hex = lines.filter((l) => HEX_LINE_RE.test(l));
    for (const l of loop ? hex : hex.slice(0, 1)) {
      const m = HEX_LINE_RE.exec(l) as RegExpExecArray;
      out.push({ prefix: m[1], subject: m[2], proven });
    }
  }
  return out;
}

/** Index every candidate in the store (one pass over the transcripts). */
export function indexCandidates(store: string): Candidate[] {
  const out: Candidate[] = [];
  for (const t of listTranscripts(store)) {
    const text = fs.readFileSync(t.file, 'utf8');
    const commands = new Map<string, string>();
    const lines = text.split('\n');
    for (const line of lines) {
      if (!line.includes('"tool_use"') || !line.includes('commit')) continue;
      let d: unknown;
      try {
        d = JSON.parse(line);
      } catch {
        continue;
      }
      const content = isMap(d) && isMap(d.message) ? d.message.content : undefined;
      for (const b of Array.isArray(content) ? content : []) {
        if (!isMap(b) || b.type !== 'tool_use' || typeof b.id !== 'string') continue;
        const cmd = isMap(b.input) && typeof b.input.command === 'string' ? b.input.command : undefined;
        if (cmd && GIT_COMMIT_RE.test(cmd)) commands.set(b.id, cmd);
      }
    }
    if (commands.size === 0) continue;
    for (const line of lines) {
      if (!line.includes('"tool_result"')) continue;
      const ids = [...line.matchAll(/"tool_use_id":"([^"]+)"/g)].map((m) => m[1]).filter((id) => commands.has(id));
      if (ids.length === 0) continue;
      let d: unknown;
      try {
        d = JSON.parse(line);
      } catch {
        continue;
      }
      const content = isMap(d) && isMap(d.message) ? d.message.content : undefined;
      for (const b of Array.isArray(content) ? content : []) {
        if (!isMap(b) || b.type !== 'tool_result' || typeof b.tool_use_id !== 'string' || !commands.has(b.tool_use_id)) continue;
        const per = candidateLines(commands.get(b.tool_use_id) as string, resultText(b.content));
        // One candidate per tool call and commit: the [branch sha] line and the log line of one
        // call are the same candidate.
        const byKey = new Map<string, Candidate>();
        for (const c of per) {
          const k = `${c.prefix}\0${c.subject}`;
          const prev = byKey.get(k);
          byKey.set(k, { file: t.file, isMain: t.isMain, toolUseId: b.tool_use_id, prefix: c.prefix, subject: c.subject, proven: (prev?.proven ?? false) || c.proven });
        }
        out.push(...byKey.values());
      }
    }
  }
  return out;
}

interface TranscriptInfo {
  file: string;
  meta?: { agentType?: string; toolUseId?: string; spawnDepth?: number; model?: string };
  snapshot?: string;
  first?: { gitBranch?: string; timestamp?: string; sessionId?: string };
  results: string[];
}

export function readTranscript(file: string): TranscriptInfo {
  const info: TranscriptInfo = { file, results: [] };
  const metaPath = file.replace(/\.jsonl$/, '.meta.json');
  if (fs.existsSync(metaPath)) {
    try {
      info.meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch {
      info.meta = undefined;
    }
  }
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    let d: unknown;
    try {
      d = JSON.parse(line);
    } catch {
      continue;
    }
    if (!isMap(d)) continue;
    if (!info.first) info.first = { gitBranch: d.gitBranch as string, timestamp: d.timestamp as string, sessionId: d.sessionId as string };
    if (d.type === 'attachment' && isMap(d.attachment) && d.attachment.type === 'prompt_snapshot' && info.snapshot === undefined) {
      const sp = d.attachment.systemPrompt;
      if (Array.isArray(sp) && typeof sp[0] === 'string') info.snapshot = sp[0];
    }
    const content = isMap(d.message) ? d.message.content : undefined;
    for (const b of Array.isArray(content) ? content : []) {
      if (isMap(b) && b.type === 'tool_result') info.results.push(resultText(b.content));
    }
  }
  return info;
}

/** The parent's `tool_use` for a spawn id: the session file, then its subagents (nested spawns). */
function spawnTypeOf(store: string, sessionId: string | undefined, toolUseId: string): string | undefined {
  const files: string[] = [];
  if (sessionId) {
    files.push(path.join(store, `${sessionId}.jsonl`));
    const sub = path.join(store, sessionId, 'subagents');
    if (fs.existsSync(sub)) for (const s of fs.readdirSync(sub)) if (s.endsWith('.jsonl')) files.push(path.join(sub, s));
  }
  for (const f of files) {
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
      if (!line.includes(toolUseId) || !line.includes('"tool_use"')) continue;
      let d: unknown;
      try {
        d = JSON.parse(line);
      } catch {
        continue;
      }
      const content = isMap(d) && isMap(d.message) ? d.message.content : undefined;
      for (const b of Array.isArray(content) ? content : []) {
        if (isMap(b) && b.type === 'tool_use' && b.id === toolUseId && isMap(b.input)) {
          return typeof b.input.subagent_type === 'string' ? b.input.subagent_type : '(no subagent_type)';
        }
      }
    }
  }
  return undefined;
}

/** The charter body (below its frontmatter) of `.claude/agents/<seat>.md` at `commit`. */
export function charterBody(repo: string, commit: string, seat: string): string | undefined {
  const t = blobText(repo, commit, `.claude/agents/${seat}.md`);
  if (t === undefined) return undefined;
  return splitFrontmatterText(t)?.body ?? t;
}

/**
 * The prompt_snapshot comparison. MEASURED (2026-10-01, Ada's snapshot vs `.claude/agents/ada.md`
 * at U2b's head): the harness drops the file's trailing newlines, so both sides are compared with
 * trailing newlines removed — nothing else is normalized.
 */
export const snapshotMatches = (snapshot: string, body: string): boolean => snapshot.replace(/\n+$/, '') === body.replace(/\n+$/, '');

/**
 * The line a seat must have read (link 7): the first non-blank, non-heading line of at least 12
 * characters in the text (trimmed); else the first non-blank line; `undefined` for empty text
 * (a row that renders nothing — link 7 is vacuous and reported so).
 */
export function evidenceLine(text: string): string | undefined {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  return lines.find((l) => !l.startsWith('#') && l.length >= 12) ?? lines[0];
}

/** Rendered pieces by span source at a commit, read through the attribution sidecars. */
function renderingAt(repo: string, commit: string): Map<string, string[]> | undefined {
  const sidecars = lsTree(repo, commit, CONSUMER_OUTPUT_DIR).filter((f) => f.endsWith('.attribution.json'));
  if (sidecars.length === 0) return undefined;
  const out = new Map<string, string[]>();
  for (const sc of sidecars.sort()) {
    const artifact = sc.slice(0, -'.attribution.json'.length);
    let manifest: { spans?: { lines: [number, number]; source: string }[] };
    try {
      manifest = JSON.parse(blobText(repo, commit, sc) ?? '{}');
    } catch {
      continue;
    }
    const lines = (blobText(repo, commit, artifact) ?? '').split('\n');
    for (const span of manifest.spans ?? []) {
      const [a, b] = span.lines;
      const pieces = out.get(span.source) ?? [];
      pieces.push(lines.slice(a - 1, b).join('\n'));
      out.set(span.source, pieces);
    }
  }
  return out;
}

export interface AuditOptions {
  repo: string;
  base: string;
  head: string;
  store: string;
  rg: Regrounding;
  /** Commits (sha prefixes) declared Kiro-run: no harness record exists → `unanchored`. */
  kiro?: string[];
  /** R — acts committed before it carry `pre-ratification observation`. */
  since?: string;
}

/** `--audit`: one verdict per act, links 4–7. Never throws on a verdict; throws on unreadable history. */
export function runAudit(opts: AuditOptions): ActVerdict[] {
  const { repo, rg } = opts;
  const b = resolveCommit(repo, opts.base);
  const h = resolveCommit(repo, opts.head);
  if (!b || !h) throw new HistoryError(`cannot resolve ${!b ? opts.base : opts.head}`);
  const sinceTime = opts.since && resolveCommit(repo, opts.since) ? Number(git(repo, ['log', '-1', '--format=%ct', opts.since]).trim()) : undefined;
  const analyses = readRange(repo, b, h)
    .map((c) => analyzeCommit(repo, c, rg))
    .filter((a) => !a.merge && a.acts.size > 0);
  const candidates = indexCandidates(opts.store);
  const transcripts = new Map<string, TranscriptInfo>();
  const transcript = (f: string): TranscriptInfo => {
    if (!transcripts.has(f)) transcripts.set(f, readTranscript(f));
    return transcripts.get(f) as TranscriptInfo;
  };
  const renderings = new Map<string, Map<string, string[]> | undefined>();
  const rendering = (c: string): Map<string, string[]> | undefined => {
    if (!renderings.has(c)) renderings.set(c, renderingAt(repo, c));
    return renderings.get(c);
  };

  // Link 4 for every commit first (link 6's fallback needs each transcript's earliest commit).
  type Lookup = { verdict?: Verdict; link?: 4; detail: string; cand?: Candidate };
  const lookups = new Map<string, Lookup>();
  const earliestByTranscript = new Map<string, CommitAnalysis>();
  for (const an of analyses) {
    const hits = candidates.filter((c) => an.sha.startsWith(c.prefix) && c.subject === an.subject);
    let l: Lookup;
    if (hits.length === 0) {
      l = (opts.kiro ?? []).some((k) => an.sha.startsWith(k))
        ? { verdict: 'unanchored', detail: 'declared Kiro-run — no harness record exists' }
        : { verdict: 'record absent', link: 4, detail: 'no transcript shows this commit being created' };
    } else if (hits.every((c) => c.isMain)) {
      l = { verdict: 'FAIL', link: 4, detail: `created in the main (orchestrator) session ${path.basename(hits[0].file)} — a primary created a seat-trailered commit` };
    } else if (hits.length > 1) {
      l = { verdict: 'anomaly', link: 4, detail: `${hits.length} candidates (${hits.map((c) => path.basename(c.file)).join(', ')})` };
    } else if (!hits[0].proven) {
      l = { verdict: 'anomaly', link: 4, detail: `the one candidate (${path.basename(hits[0].file)}) cannot show the commit succeeded — form outside the closed success-evidence set`, cand: hits[0] };
    } else {
      l = { detail: '', cand: hits[0] };
      const prev = earliestByTranscript.get(hits[0].file);
      if (!prev || an.committerTime < prev.committerTime) earliestByTranscript.set(hits[0].file, an);
    }
    lookups.set(an.sha, l);
  }

  const out: ActVerdict[] = [];
  for (const an of analyses) {
    const l = lookups.get(an.sha) as Lookup;
    const pre = sinceTime !== undefined && an.committerTime < sinceTime;
    const trailer = an.trailers.length === 1 ? an.trailers[0].toLowerCase() : undefined;
    for (const a of an.acts.values()) {
      const seat = a.seat ?? trailer ?? '(unknown)';
      const v: ActVerdict = { sha: an.sha, subject: an.subject, row: a.rowId, seat, verdict: 'anchored', detail: '', preRatification: pre, widen: false };
      const done = (verdict: Verdict, link: ActVerdict['link'], detail: string): void => {
        v.verdict = verdict;
        v.link = link;
        v.detail = detail;
      };
      if (l.verdict) {
        done(l.verdict, l.link, l.detail);
      } else {
        const cand = l.cand as Candidate;
        const t = transcript(cand.file);
        v.transcript = path.relative(opts.store, cand.file);
        v.spawnDepth = t.meta?.spawnDepth;
        v.model = t.meta?.model;
        // Link 5.
        const parentType = t.meta?.toolUseId ? spawnTypeOf(opts.store, t.first?.sessionId ?? path.basename(path.dirname(path.dirname(cand.file))), t.meta.toolUseId) : undefined;
        if (!t.meta) done('record absent', 5, 'the transcript has no meta record');
        else if (t.meta.agentType !== seat) done('FAIL', 5, `meta agentType ${String(t.meta.agentType)} ≠ signer ${seat}`);
        else if (parentType === undefined) done('record absent', 5, `the parent tool_use ${String(t.meta.toolUseId)} is not in the store`);
        else if (parentType !== seat) done('FAIL', 5, `parent tool_use subagent_type ${parentType} ≠ signer ${seat}`);
        else {
          // Link 6.
          let at: string | undefined;
          const br = t.first?.gitBranch;
          const ts = t.first?.timestamp;
          if (br && ts) {
            for (const ref of [`refs/heads/${br}`, `refs/remotes/origin/${br}`]) {
              at = gitTry(repo, ['rev-list', '-1', `--before=${ts}`, ref])?.trim() || undefined;
              if (at) break;
            }
          }
          if (!at) at = earliestByTranscript.get(cand.file)?.parents[0];
          const body = at ? charterBody(repo, at, seat) : undefined;
          if (t.snapshot === undefined) done('record absent', 6, 'the transcript has no prompt_snapshot');
          else if (body === undefined) done('record absent', 6, `the charter .claude/agents/${seat}.md does not resolve (branch ${br ?? '?'} at ${ts ?? '?'}, nor the parent of the seat's earliest commit)`);
          else if (!snapshotMatches(t.snapshot, body)) done('FAIL', 6, `prompt_snapshot ≠ .claude/agents/${seat}.md at ${at?.slice(0, 8)}`);
          else {
            // Link 7.
            let text: string | undefined;
            let absent: string | undefined;
            if (a.kind === 'signature') {
              const r = rendering(an.sha);
              if (!r) absent = `no consumer rendering under ${CONSUMER_OUTPUT_DIR}/ at ${an.sha.slice(0, 8)}`;
              else text = (r.get(rg.rowSpanSource(a.source ?? '', a.section, a.key)) ?? []).join('\n');
            } else {
              const src = a.source ? blobText(repo, an.sha, a.source) : undefined;
              const unit = src !== undefined ? partition(splitFrontmatter(src, a.source).body).units.find((u) => u.anchor === a.key) : undefined;
              if (!unit) absent = `the canonical unit ${a.key} of ${a.source ?? '?'} does not resolve at ${an.sha.slice(0, 8)}`;
              else text = unit.text;
            }
            if (absent) done('record absent', 7, absent);
            else {
              const line = evidenceLine(text ?? '');
              if (line === undefined) done('anchored', undefined, 'link 7 vacuous: the row renders nothing');
              else if (!t.results.some((r) => r.includes(line))) done('FAIL', 7, `no tool result contains the row's rendered line "${line.slice(0, 80)}"`);
              else done('anchored', undefined, `transcript ${v.transcript}`);
            }
          }
        }
      }
      v.widen = v.verdict === 'FAIL' || v.verdict === 'anomaly' || (v.spawnDepth !== undefined && v.spawnDepth !== 1);
      out.push(v);
    }
  }
  return out;
}

export function formatAudit(acts: ActVerdict[], header: string): string[] {
  const lines = [`verify-signing-chain --audit — ${LABEL} — ${header}`];
  for (const a of acts) {
    const label = a.link ? `${a.verdict} ${a.link}` : a.verdict;
    lines.push(
      `${label} — ${a.row} — ${a.seat} — ${a.sha.slice(0, 8)}${a.detail ? ` — ${a.detail}` : ''}` +
        `${a.spawnDepth !== undefined ? ` — spawnDepth ${a.spawnDepth}, model ${a.model ?? '?'}` : ''}` +
        `${a.widen ? ' — widening (§ 5.4)' : ''}${a.preRatification ? ' — pre-ratification observation' : ''}`
    );
  }
  const counts: Record<Verdict, number> = { anchored: 0, unanchored: 0, 'record absent': 0, FAIL: 0, anomaly: 0 };
  for (const a of acts) counts[a.verdict] += 1;
  lines.push(
    `counts (beside the per-act lines, never in place of them; no total is green): ${acts.length} act(s) — ` +
      (Object.keys(counts) as Verdict[]).map((k) => `${k} ${counts[k]}`).join(' · ')
  );
  return lines;
}

// ============================================================================
// CLI
// ============================================================================

/** The harness store for a repo: `~/.claude/projects/<slug of the main checkout's path>`. */
export function defaultStore(repo: string): string {
  const common = gitTry(repo, ['rev-parse', '--path-format=absolute', '--git-common-dir'])?.trim();
  const root = common ? path.dirname(common) : repo;
  return path.join(os.homedir(), '.claude', 'projects', root.replace(/[^A-Za-z0-9]/g, '-'));
}

function arg(argv: string[], name: string): string | undefined {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}

function defaultBase(repo: string, head: string): string {
  for (const ref of ['origin/main', 'main']) {
    const r = resolveCommit(repo, ref);
    if (r) {
      const mb = gitTry(repo, ['merge-base', r, head])?.trim();
      if (mb) return mb;
    }
  }
  throw new HistoryError('no base: pass --base, set BASE_SHA, or fetch main');
}

export function main(argv: string[]): number {
  const repo = gitTry(process.cwd(), ['rev-parse', '--show-toplevel'])?.trim() ?? process.cwd();
  const rgLoaded = loadRegrounding();
  if (argv.includes('--ci')) {
    try {
      const head = arg(argv, '--head') ?? (process.env.HEAD_SHA || undefined) ?? 'HEAD';
      const base = arg(argv, '--base') ?? (process.env.BASE_SHA || undefined) ?? defaultBase(repo, head);
      const sinceArg = arg(argv, '--since');
      const since = sinceArg === 'none' ? undefined : sinceArg ?? R_SHA;
      const r = runCi({ repo, base, head, rg: rgLoaded, since });
      for (const l of r.lines) console.log(l);
      return r.ok ? 0 : 1;
    } catch (e) {
      console.log(`signing-chain: FAIL (history) — ${(e as Error).message}`);
      return 1;
    }
  }
  if (argv.includes('--audit')) {
    if (!rgLoaded) {
      console.error('verify-signing-chain --audit: regrounding/c1.ts and signatures.ts are not on this tree — nothing to audit against');
      return 2;
    }
    const pr = arg(argv, '--pr');
    const branch = arg(argv, '--branch');
    let head: string;
    let header: string;
    if (pr) {
      gitTry(repo, ['fetch', '--quiet', 'origin', `refs/pull/${pr}/head`]);
      const h = resolveCommit(repo, 'FETCH_HEAD');
      if (!h) {
        console.error(`verify-signing-chain --audit: cannot fetch refs/pull/${pr}/head`);
        return 2;
      }
      head = h;
      header = `PR #${pr} (refs/pull/${pr}/head = ${h.slice(0, 8)})`;
    } else if (branch) {
      head = branch;
      header = `branch ${branch}`;
    } else {
      console.error('verify-signing-chain --audit: pass --pr <N> or --branch <b>');
      return 2;
    }
    const baseRef = arg(argv, '--base');
    const base = baseRef ? (gitTry(repo, ['merge-base', baseRef, head])?.trim() ?? baseRef) : defaultBase(repo, head);
    const store = arg(argv, '--store') ?? defaultStore(repo);
    const kiro = arg(argv, '--kiro')?.split(',').filter(Boolean);
    const acts = runAudit({ repo, base, head, store, rg: rgLoaded, kiro, since: R_SHA });
    if (argv.includes('--json')) {
      console.log(JSON.stringify({ label: LABEL, header, acts }, null, 2));
    } else {
      for (const l of formatAudit(acts, `${header}; store ${store}`)) console.log(l);
      console.log('--- machine-readable ---');
      console.log(JSON.stringify({ label: LABEL, header, acts }));
    }
    return 0;
  }
  console.error('usage: verify-signing-chain --ci [--base <sha>] [--head <sha>] [--since <sha>|none]\n       verify-signing-chain --audit (--pr <N> | --branch <b>) [--base <ref>] [--store <dir>] [--kiro <sha,…>] [--json]');
  return 2;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
