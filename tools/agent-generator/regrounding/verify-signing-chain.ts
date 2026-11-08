/**
 * `verify-signing-chain` — the instrument of ballot `2026-10-01-signing-act-chain` (§§ 3–4),
 * register row `signing-act-consistency`. Owner: Thurgood. Its verdicts are Stacy's to read and
 * record; it decides nothing. Label, everywhere it prints: **consistency, not identity.**
 *
 * TWO MODES, AND TWO READ-ONLY ONES (`--census-routed`, below; `--print <record file>#<anchor>`,
 * {@link printUnit}: the whole canonical unit and its hash — and, for a dispositions row, its
 * whole consumer rendering and `renderedHash` — in one output, for the seat's read)
 *
 *   --ci        links 1–3, inside the required context `122-diff-guard` (§ 4.1). Order:
 *                 (1) the full `operative-set-freshness` sweep, FIRST, on every PR, independent of
 *                     the walk's floor (F11) — when `regrounding/freshness.ts` is on the tree;
 *                 (2) history: refuses a shallow or unreadable history, loudly (F10);
 *                 (3) the walk over every commit in `base..head`:
 *                       link 1 — decided PER SIGNING COMMIT: the act moves the row's pinned
 *                                `canonicalHash`/`renderedHash` (F5 fails, F14 passes); a FIRST
 *                                signature (the row's dispositions `signature` absent at the
 *                                commit's first parent, present at the commit) instead needs the
 *                                row on the UNSIGNED-ROUTED LIST of the commit's first-parent tree
 *                                — never the head's or the range base's (§ 2 clause 3, erratum
 *                                ratified 2026-10-21; `freshness.ts` `routedPopulation`; fixtures
 *                                FU10–FU26b, Stacy). An undecidable list fails it: a missing link is
 *                                never green. Every other act is judged exactly as before;
 *                       link 2 — every hunk, and every commit carrying one, stays inside the
 *                                signer's objects (F4, F12); a seat that signs in range does not
 *                                edit its own charter in another commit of the range (F12′); for a
 *                                merge, a SIGNING OBJECT — a row's `signature`, a sheet `## `
 *                                section or preamble, a record unit's `canonicalHash` — fails when
 *                                its result equals no parent's version of it (F7, F13 fail; F13c
 *                                passes — ruling 5, Stacy R1 on PR #245);
 *                       link 3 — `signer` = `c1Seat(row)` = the commit's single `Agent:` trailer
 *                                (F1, F2, F3, F8);
 *                 (4) the floor, AFTER the sweep: no in-scope commit touches
 *                     `canonical/profiles/**` → `signing-chain: no signing paths in range — 0 rows
 *                     (pass)`; otherwise the rows checked are printed and zero FAILS. A merge
 *                     touches `canonical/profiles/**` only where its result equals no parent's
 *                     version (per signing object on signing paths, per blob elsewhere) — so a PR
 *                     that merges its base after the base changed profiles does not (F15; ruling
 *                     6, Stacy R1 on PR #245). A non-merge commit touches by path, as before.
 *               The C6 no-op lock is never read (the C6 carve-out, ballot § 6.3).
 *
 *   --audit     links 4–7, local, post-acceptance, never blocking (§§ 4.2–4.4). `--pr N` reads
 *               `refs/pull/N/head`; `--branch <b>` reads a unit branch. Walks EVERY act (never a
 *               sample) against the harness stores: every `--store <dir>` given (repeatable, in
 *               order), else the default set — the main checkout's store
 *               `~/.claude/projects/<slug>/` and every sibling `<slug>--claude-worktrees-*` (a
 *               session started in a `.claude/worktrees/<name>` worktree writes there, not to the
 *               main store; `.kiro/issues/2026-10-26-signing-chain-audit-reads-one-session-store.md`).
 *               A store whose cwd lies outside the repo root (a scratchpad worktree session) is
 *               not derivable from the repo path and is read only when passed by `--store`.
 *               One verdict per act from the closed set
 *               `anchored` · `unanchored` · `record absent` · `FAIL` · `anomaly`, link-numbered,
 *               never rolled up. Exit 0 unless the command itself cannot run.
 *               `--signer <seat>` keeps only the acts whose signer — the `seat` field every line
 *               already prints: `c1Seat(owner)`, else the single `Agent:` trailer, else
 *               `(unknown)` — is <seat>; `--exclude-signer <seat>` keeps every other act,
 *               `(unknown)` included. It selects from the finished verdict list, so a kept act's
 *               verdict never changes. Mutually exclusive, never repeated, never `--flag=value`;
 *               any argument `--audit` does not know (a misspelt flag, a flag and value pasted as
 *               one token, a stray bare token) exits 2 — never an unfiltered run;
 *               seat names case-insensitive and exact; a seat neither on the roster (the charters
 *               under `canonical/agents/`, their C1 seats, `peter`) nor seen in the range exits 2.
 *               A filtered run adds one line under the header,
 *               `filter --<flag> <seat>: <n> of <m> act(s) selected; <m-n> withheld`, and its counts
 *               line and JSON `acts` cover the selected acts only (JSON adds
 *               `filter: {mode, seat, selected, withheld}`). The delegate runs
 *               `--audit --signer stacy` (signing ballot § 5.3), Stacy `--audit --exclude-signer
 *               stacy` (§ 5.1) — sitting-2 ballot S5. Unfiltered output is unchanged; `--ci`
 *               ignores both flags.
 *
 * STORE LAYOUT (what `--audit` assumes about the harness store; ballot
 * 2026-10-23-link4-candidate-first-sha-after-commit § 4). A harness change is diagnosable from
 * here, and the store-shape canary (`anomaly 4: store layout unrecognized`) has this block as its
 * referent:
 *   - the slug rule: `~/.claude/projects/<git-common-dir parent, [^A-Za-z0-9] → '-'>`
 *     (`defaultStore`);
 *   - main sessions: `<store>/<session>.jsonl`;
 *   - subagents: `<store>/<session>/subagents/agent-<id>.jsonl`, with `agent-<id>.meta.json`
 *     (`agentType`, `model`, `spawnDepth`, `toolUseId`). `agent-<id>.prefix.json` is also present
 *     and is not read;
 *   - block fields: `message.content[]` with `tool_use {id, input.command}`, `tool_result
 *     {tool_use_id, content}`, and the `attachment` `prompt_snapshot` (`systemPrompt[0]`);
 *   - observed: Claude Code 2.1.299 on 2026-10-23 (the `version` field of #445's seat transcripts).
 *     The facts were first verified 2026-09-30, version not recorded;
 *   - `is_error` is never law: it is not read for success evidence, which stays the closed set.
 *   THE CANARY reads each store on its own (§ 2b, "the store"). A store is unrecognized when
 *   subagent transcripts exist in it and either no `tool_use` running a `git commit` pairs with a
 *   `tool_result` anywhere in it, or none of them has its `.meta.json`.
 *   Every act not declared Kiro-run and without a candidate in a recognized store then reads
 *   `anomaly 4: store layout unrecognized`, sends no act into J, and the run prints one
 *   `**Open for Peter**:` line per unrecognized store (signing-act ballot § 5.4). A store with no
 *   transcripts, or main-session transcripts only, reads as before.
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
  /**
   * The unsigned-routed list of a tree read through `read` (`files` = its paths under the profile
   * and records dirs) — `freshness.ts` `routedPopulation`, when it exists (§ 2 clause 3).
   */
  unsignedRouted?: (read: (rel: string) => string | undefined, files: readonly string[]) => UnsignedRoutedList;
  /** The census mode's lines (`freshness.ts` `routedCensus`), when it exists. */
  census?: (read: (rel: string) => string | undefined, files: readonly string[]) => string[];
}

/** The unsigned-routed list as link 1 reads it: row ids, and what made it undecidable (per file). */
export interface UnsignedRoutedList {
  rows: { file: string; section: Section; key: string }[];
  errors: { file: string; message: string }[];
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
    const pop = (fresh as { routedPopulation?: (read: (rel: string) => string | undefined, files: readonly string[]) => { rows: (UnsignedRoutedList['rows'][number] & { signed: boolean })[]; errors: UnsignedRoutedList['errors'] } }).routedPopulation;
    const census = (fresh as { routedCensus?: (read: (rel: string) => string | undefined, files: readonly string[]) => string[] }).routedCensus;
    if (census) rg.census = census;
    if (pop) {
      rg.unsignedRouted = (read, files) => {
        const p = pop(read, files);
        return { rows: p.rows.filter((r) => !r.signed), errors: p.errors };
      };
    }
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

/**
 * Trailing blank lines are not content: a sheet section (or preamble) that differs only in them is
 * the same object (Stacy R1 on PR #245 — a blank line moved by a summary appended below the last
 * section otherwise reads as an act on that section).
 */
const trimTrailingBlank = (t: string): string => t.replace(/\s+$/, '');

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
    sections.set(k, trimTrailingBlank(chunk));
  }
  return { preamble: trimTrailingBlank(preamble), sections };
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
  /** A FIRST signature: the dispositions `signature` is absent at the first parent and present here (§ 2 clause 3). */
  first?: boolean;
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
  /**
   * Sheet `## ` sections that key to no row or unit. Reported whether or not the commit carries an
   * act: a summary filed under its own `## ` in a sheet fails `--ci` (Stacy R1 on PR #245, (d)).
   */
  orphans: string[];
  /** Sheet preambles changed: [sheet, the seats its new sections name]. */
  preambles: { sheet: string; seats: string[] }[];
  /** For merges: `<signing path> <object>` for each signing object whose result equals no parent's version. */
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

/** The failure text for the one-paragraph-too-early class (the 2026-10-18 re-cut): the line exists, git does not read it. */
export const AGENT_ABOVE_FINAL_PARAGRAPH =
  'signing commit carries no parsable Agent: trailer — an "Agent:" line exists above the final paragraph; git reads trailers only from the last paragraph: put "Agent: <seat>" and "Co-Authored-By:" together in ONE final paragraph';

/** True when the commit body has an `Agent: <value>` line in any paragraph but the last (git reads trailers only from the last). */
export function agentLineAboveFinalParagraph(repo: string, sha: string): boolean {
  const body = git(repo, ['log', '-1', '--format=%B', sha]).replace(/\s+$/, '');
  const paragraphs = body.split(/\n[ \t]*\n/);
  return paragraphs.slice(0, -1).some((p) => /^Agent:\s*\S+/m.test(p));
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

/** The signing objects of a signing path at a commit, each serialized; `undefined` when it does not parse. */
export function signingObjects(repo: string, commit: string, f: string): Map<string, string> | undefined {
  const m = new Map<string, string>();
  const text = blobText(repo, commit, f);
  if (text === undefined) return m;
  if (isSignatureSheetPath(f) || isConfirmationSheetPath(f)) {
    const s = splitSheet(text);
    m.set('preamble', s.preamble);
    for (const [h, b] of s.sections) m.set(`§ "${h}"`, b);
    return m;
  }
  const p = parseYamlMap(text);
  if (p.error) return undefined;
  if (isDispositionsPath(f)) {
    for (const section of SECTIONS) {
      for (const [key, row] of Object.entries(isMap(p.doc[section]) ? (p.doc[section] as Record<string, unknown>) : {})) {
        if (isMap(row) && row.signature !== undefined) m.set(`row ${section}:${key} signature`, stable(row.signature));
      }
    }
  } else if (isRecordPath(f)) {
    for (const [unit, u] of Object.entries(isMap(p.doc.units) ? p.doc.units : {})) {
      if (isMap(u) && u.canonicalHash !== undefined) m.set(`unit ${unit} canonicalHash`, stable(u.canonicalHash));
    }
  }
  return m;
}

/** A merge's result on `f` equals no parent's blob. */
function mergeNovelBlob(repo: string, info: CommitInfo, f: string): boolean {
  const result = blobId(repo, info.sha, f);
  return !info.parents.some((p) => blobId(repo, p, f) === result);
}

/** The signing objects of `f` whose merge result equals no parent's version (ruling 5). */
export function mergeNovelObjects(repo: string, info: CommitInfo, f: string): string[] {
  const result = signingObjects(repo, info.sha, f);
  const parents = info.parents.map((p) => signingObjects(repo, p, f));
  if (result === undefined || parents.some((x) => x === undefined)) {
    return mergeNovelBlob(repo, info, f) ? ['(does not parse — compared by blob)'] : [];
  }
  const ps = parents as Map<string, string>[];
  const keys = new Set([...result.keys(), ...ps.flatMap((x) => [...x.keys()])]);
  return [...keys].filter((k) => !ps.some((x) => x.get(k) === result.get(k))).sort();
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
    orphans: [],
    preambles: [],
    mergeDiffs: [],
  };

  if (an.merge) {
    const all = new Set<string>();
    for (const p of info.parents) for (const f of changedPaths(repo, p, info.sha)) all.add(f);
    an.paths = [...all].sort();
    // Rulings 5 and 6 (Stacy R1 on PR #245): a merge is read per SIGNING OBJECT on signing paths
    // and per blob elsewhere. An object whose result equals some parent's version was carried by
    // that parent — the merge wrote nothing there. Only an object whose result equals NO parent's
    // version is the merge's own: on a signing path that fails link 2 (F7, F13; F13c — two seats'
    // clean re-signs of different rows of one file — passes), and on `canonical/profiles/**` it is
    // what "the merge touches profiles" means for the floor (F15 — a PR merging its base after the
    // base changed profiles — passes).
    for (const f of an.paths) {
      const inProfiles = f.startsWith(`${PROFILES_DIR}/`);
      if (!isSigningPath(f) && !inProfiles) continue;
      const novel = isSigningPath(f) ? mergeNovelObjects(repo, info, f) : mergeNovelBlob(repo, info, f) ? ['(blob)'] : [];
      if (novel.length === 0) continue;
      if (inProfiles) an.touchesProfiles = true;
      if (isSigningPath(f)) for (const o of novel) an.mergeDiffs.push(`${f} ${o}`);
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
          if (!m0 && m1) a.first = true;
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
          // Removing a section that keys to nothing is cleanup, not an act and not a finding.
          if (b1 === undefined) continue;
          an.orphans.push(`${f} § "${heading}": the section names no ${conf ? 'operative-set unit (no record confirmation: points here)' : 'dispositions row (no signature evidence: points here)'}`);
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
        // A unit ADDED (or removed) with its record is the drafter's authoring (the profile author
        // drafts records, C16); the confirmer's act is moving an existing unit's canonicalHash.
        if (h0 === h1 || u0 === undefined || u1 === undefined) continue;
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
  /** The unsigned-routed list of a first parent's tree (§ 2 clause 3), computed once per parent. */
  const listedAt = new Map<string, { ids: Set<string>; undecidable: Map<string, string> } | undefined>();
  const unsignedAt = (parent: string | undefined): { ids: Set<string>; undecidable: Map<string, string> } | undefined => {
    if (!rg?.unsignedRouted) return undefined;
    const key = parent ?? EMPTY_TREE;
    if (!listedAt.has(key)) {
      const files = parent ? [...lsTree(repo, parent, PROFILES_DIR), ...lsTree(repo, parent, RECORDS_DIR)] : [];
      const list = rg.unsignedRouted((rel) => (parent ? blobText(repo, parent, rel) : undefined), files);
      const undecidable = new Map<string, string>();
      for (const e of list.errors) if (!undecidable.has(e.file)) undecidable.set(e.file, e.message);
      listedAt.set(key, { ids: new Set(list.rows.map((r) => rowIdOf(r.file, r.section, r.key))), undecidable });
    }
    return listedAt.get(key);
  };

  for (const an of analyses) {
    if (an.merge) {
      for (const f of an.mergeDiffs) {
        findings.push({ link: 2, sha: an.sha, message: `merge result on ${f} equals no parent's version — a merge writes signature content no seat's commit carried (F7/F13)` });
      }
      continue;
    }
    for (const o of an.orphans) findings.push({ link: 2, sha: an.sha, message: `a sheet carries a section that is no signing object: ${o}` });
    if (an.acts.size === 0) continue;
    signingCommits += 1;
    const push = (link: LinkFinding['link'], message: string, row?: string): void => {
      findings.push({ link, sha: an.sha, row, message });
    };
    const trailer = an.trailers.length === 1 ? an.trailers[0].toLowerCase() : undefined;
    if (an.trailers.length === 0) {
      push(3, agentLineAboveFinalParagraph(repo, an.sha) ? AGENT_ABOVE_FINAL_PARAGRAPH : 'signing commit carries no Agent: trailer');
    }
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
      if (a.first) {
        const parent = an.parents[0];
        const at = parent ? parent.slice(0, 8) : '(none — root commit)';
        const listed = unsignedAt(parent);
        // An error naming this row's file, or a shared input (not a dispositions file), leaves the row undecidable.
        const why = listed ? [...listed.undecidable].find(([f]) => f === a.file || !isDispositionsPath(f))?.[1] : undefined;
        if (!listed) {
          push(1, `first signature: the unsigned-routed list cannot be computed on this tree (regrounding/freshness.ts routedPopulation is absent) — a missing link is never green`, a.rowId);
        } else if (why !== undefined) {
          push(1, `first signature: the unsigned-routed list at the commit's first parent ${at} is undecidable — ${why}; a missing link is never green`, a.rowId);
        } else if (!listed.ids.has(a.rowId)) {
          push(1, `first signature on a row on neither the stale list nor the unsigned-routed list at the commit's first parent ${at} (ballot § 2 clause 3)`, a.rowId);
        }
      } else if (!actMoved(a)) {
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
  /** § 5.4: a FAIL, an anomaly, or spawnDepth ≠ 1 sends the seat's acts in the PR into J. The store-shape canary does not (§ 5.4, as amended). */
  widen: boolean;
  /** The verdict is the store-shape canary: evidence about the instrument, not a seat (ballot 2026-10-23 § 2b, § 2d). */
  canary?: boolean;
  /** The stores this run found unrecognized (ballot 2026-10-23 § 2b, per store); set on every act when any. */
  unrecognizedStores?: string[];
}

interface Candidate {
  file: string;
  /** The store the transcript was read from. */
  store: string;
  isMain: boolean;
  toolUseId: string;
  prefix: string;
  /** The subjects this candidate shows: the result's, and the input's (ballot 2026-10-23 § 2a). */
  subjects: string[];
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

const GIT_COMMIT_G = new RegExp(GIT_COMMIT_RE.source, 'gm');
const AT_GIT_LOG = /^\s*(?:[A-Za-z_][A-Za-z0-9_]*=\S*\s+)*git(?:\s+-[Cc]\s+(?:"[^"]*"|'[^']*'|\S+))*\s+log\b/;

/**
 * The shell control operators after `from`, read outside quotes (`\`-newline is whitespace; a bare
 * newline reads `;`), each with the text that follows it. Stops at the first operator `stop`
 * rejects — so a heredoc body after a newline is never read.
 */
function operatorsFrom(command: string, from: number, stop: (op: string, rest: string) => boolean): void {
  let q: '"' | "'" | undefined;
  for (let i = from; i < command.length; i += 1) {
    const c = command[i];
    if (q) {
      if (c === q) q = undefined;
      else if (c === '\\' && q === '"') i += 1;
      continue;
    }
    if (c === "'" || c === '"') {
      q = c;
      continue;
    }
    if (c === '\\') {
      i += 1;
      continue;
    }
    // `2>&1`, `>&2`, `&>f` are redirections, not the `&` operator.
    if (c === '&' && command[i + 1] !== '&' && (command[i - 1] === '>' || command[i - 1] === '<' || command[i + 1] === '>')) continue;
    const two = command.slice(i, i + 2);
    const op = two === '&&' || two === '||' ? two : c === '|' || c === ';' || c === '&' ? c : c === '\n' ? ';' : undefined;
    if (op === undefined) continue;
    if (stop(op, command.slice(i + op.length))) return;
    i += op.length - 1;
  }
}

/**
 * Success evidence form (b) for ONE `git commit` invocation ending at `end` (ruling 11, Stacy R1
 * on PR #245):
 *   - `&&`: a `git log` is reached from the commit ONLY through `&&` — every operator between them
 *     is `&&`. A pipe (`git commit … | tee f && git log`) or a `;` anywhere on the way
 *     (`git commit … && git push; git log`) is outside the set → `anomaly` (H2c).
 *   - `set -e` (or `-o errexit`) set before it counts only for a STANDALONE commit: not piped (no
 *     `|` before or after it), not a condition or negated (the command-position match already
 *     excludes `if`/`while`/`until`/`!`), not a non-final element of an `&&`/`||` list.
 */
function invocationProven(command: string, start: number, end: number, setEAt: number | undefined): boolean {
  let viaAnd = false;
  operatorsFrom(command, end, (op, rest) => {
    if (op !== '&&') return true;
    if (AT_GIT_LOG.test(rest)) {
      viaAnd = true;
      return true;
    }
    return false;
  });
  if (viaAnd) return true;
  if (setEAt === undefined || setEAt > start) return false;
  // The command-position match starts AT its separator: `| git commit` is piped in, `|| git commit` is not.
  const pipedIn = /^\|(?!\|)/.test(command.slice(start, end));
  let next: string | undefined;
  operatorsFrom(command, end, (op) => {
    next = op;
    return true;
  });
  return !pipedIn && next !== '|' && next !== '&&' && next !== '||';
}

/**
 * Success evidence form (b) for a tool call: EVERY `git commit` invocation in it reaches a
 * `git log` only through `&&`, or stands alone under `set -e` (form (a), the commit's own
 * `[<branch> <sha>]` line, needs no command reading).
 */
export function logFormProven(command: string): boolean {
  const setE = /(^|[\n;&|]\s*)set\s+(-[a-zA-Z]*e[a-zA-Z]*|-o\s+errexit)\b/m.exec(command);
  const setEAt = setE ? setE.index : undefined;
  const hits = [...command.matchAll(GIT_COMMIT_G)];
  if (hits.length === 0) return false;
  return hits.every((m) => invocationProven(command, m.index as number, (m.index as number) + m[0].length, setEAt));
}

export const resultText = (content: unknown): string =>
  typeof content === 'string'
    ? content
    : Array.isArray(content)
      ? content.map((b) => (isMap(b) && typeof b.text === 'string' ? b.text : '')).join('\n')
      : '';

/** A word of a shell command at `i` (quotes and `\\`-escapes removed; adjacent quoted parts concatenate), with where it ends. */
function shellWord(command: string, i: number): { word: string; end: number } {
  let word = '';
  let q: '"' | "'" | undefined;
  let j = i;
  for (; j < command.length; j += 1) {
    const c = command[j];
    if (q) {
      if (c === q) q = undefined;
      else if (c === '\\' && q === '"' && j + 1 < command.length) {
        j += 1;
        word += command[j];
      } else word += c;
      continue;
    }
    if (c === "'" || c === '"') {
      q = c;
      continue;
    }
    if (c === '\\' && j + 1 < command.length) {
      j += 1;
      word += command[j];
      continue;
    }
    if (/\s/.test(c) || c === ';' || c === '&' || c === '|' || c === '<' || c === '>') break;
    word += c;
  }
  return { word, end: j };
}

/**
 * The subject the call's INPUT shows (ballot 2026-10-23-link4-candidate-first-sha-after-commit
 * § 2a): the call's first `git commit` invocation's first `-m` value, or the first line of its
 * `-F -` heredoc. Nothing else in the command is read. Undefined when neither is present.
 */
export function inputSubjectOf(command: string): string | undefined {
  const m = GIT_COMMIT_RE.exec(command);
  if (!m) return undefined;
  let i = m.index + m[0].length;
  const lineEnd = ((): number => {
    let q: '"' | "'" | undefined;
    for (let k = i; k < command.length; k += 1) {
      const c = command[k];
      if (q) {
        if (c === q) q = undefined;
        else if (c === '\\' && q === '"') k += 1;
        continue;
      }
      if (c === "'" || c === '"') q = c;
      else if (c === '\\') k += 1;
      else if (c === '\n' || c === ';' || (c === '&' && command[k + 1] === '&') || (c === '|')) return k;
    }
    return command.length;
  })();
  // The heredoc marker may sit after an `&&`, on the same line; the line is the commit's text up to the newline.
  const nl = command.indexOf('\n', i);
  const firstLine = nl === -1 ? command.slice(i) : command.slice(i, nl);
  let fromStdin = false;
  while (i < lineEnd) {
    while (i < lineEnd && /\s/.test(command[i])) i += 1;
    if (i >= lineEnd) break;
    const w = shellWord(command, i);
    if (w.end === i) {
      i += 1;
      continue;
    }
    i = w.end;
    if (w.word === '-m' || w.word === '--message' || /^-[a-zA-Z]+m$/.test(w.word)) {
      while (i < lineEnd && /\s/.test(command[i])) i += 1;
      const v = shellWord(command, i);
      return v.word.split('\n')[0];
    }
    if (w.word.startsWith('--message=')) return w.word.slice('--message='.length).split('\n')[0];
    if (/^-m./.test(w.word) && !w.word.startsWith('--')) return w.word.slice(2).split('\n')[0];
    if (w.word === '-F' || w.word === '--file') {
      while (i < lineEnd && /\s/.test(command[i])) i += 1;
      if (shellWord(command, i).word === '-') fromStdin = true;
    } else if (w.word === '--file=-' || w.word === '-F-') fromStdin = true;
  }
  if (fromStdin && nl !== -1 && /<<-?\s*['"]?[A-Za-z_]/.test(firstLine)) {
    const rest = command.slice(nl + 1);
    return rest.split('\n')[0].replace(/\r$/, '');
  }
  return undefined;
}

/** A SHA token: 7–40 lowercase hex characters bounded by whitespace or the line's ends. */
const SHA_TOKEN_RE = /(^|\s)([0-9a-f]{7,40})(?=\s|$)/;

/**
 * The candidates of one `git commit` tool call (signing-act ballot § 4.3, as amended by ballot
 * 2026-10-23-link4-candidate-first-sha-after-commit § 2a): (i) every `[<branch> <sha>] <subject>`
 * line the commit printed; (ii) where the call runs a `git commit` and then a `git log`, the FIRST
 * SHA token printed in the result, in any line shape — one per pass where the call loops.
 * `subject` is what the result shows (the rest of the SHA's line, else the next non-empty line);
 * `inputSubject` is what the input shows ({@link inputSubjectOf}; never read in a call that loops).
 */
export function candidateLines(command: string, output: string): { prefix: string; subject: string; inputSubject?: string; proven: boolean }[] {
  const out: { prefix: string; subject: string; inputSubject?: string; proven: boolean }[] = [];
  const lines = output.split('\n').map((l) => l.replace(/\r$/, ''));
  for (const l of lines) {
    const m = BRACKET_RE.exec(l);
    if (m) out.push({ prefix: m[2], subject: m[3], proven: true });
  }
  // `git commit` anywhere in the call (a function body included), then a `git log` after it.
  const firstCommit = /\bgit(?:\s+-[Cc]\s+(?:"[^"]*"|'[^']*'|\S+))*\s+commit\b/.exec(command);
  const logAfterCommit = firstCommit !== null && [...command.matchAll(/\bgit(?:\s+-[Cc]\s+(?:"[^"]*"|'[^']*'|\S+))*\s+log\b/g)].some((x) => (x.index as number) > (firstCommit.index as number));
  if (logAfterCommit) {
    const proven = logFormProven(command);
    // A call that loops — `for`/`while`/`until`, or a shell function it calls repeatedly — prints
    // one `git log -1` line per pass; each is that pass's candidate ("one per pass").
    const repeats = /(^|[\s;])(for|while|until)\s/.test(command) || /\b[A-Za-z_][\w-]*\s*\(\)\s*\{/.test(command) || /\bfunction\s+[A-Za-z_]/.test(command);
    const loop = repeats && /\blog\b[^\n]*(-1\b|-n\s*1\b|--max-count=1\b)/.test(command);
    const resultSubject = (idx: number, rest: string): string => {
      if (rest.trim()) return rest.trim();
      for (let k = idx + 1; k < lines.length; k += 1) if (lines[k].trim()) return lines[k].trim();
      return '';
    };
    if (loop) {
      lines.forEach((l, idx) => {
        const m = /^([0-9a-f]{7,40})(?=\s|$)(.*)$/.exec(l);
        if (m) out.push({ prefix: m[1], subject: resultSubject(idx, m[2]), proven });
      });
    } else {
      for (let idx = 0; idx < lines.length; idx += 1) {
        const m = SHA_TOKEN_RE.exec(lines[idx]);
        if (!m) continue;
        const rest = lines[idx].slice((m.index as number) + m[0].length);
        out.push({ prefix: m[2], subject: resultSubject(idx, rest), inputSubject: inputSubjectOf(command), proven });
        break;
      }
    }
  }
  return out;
}

/**
 * What `--audit` saw of the store(s), counted while indexing: the referent of the store-shape
 * canary (ballot 2026-10-23 § 2b; the module header's STORE LAYOUT block).
 */
export interface StoreShape {
  /** Transcripts of any kind. */
  transcripts: number;
  /** Subagent transcripts, and how many of them have their `.meta.json`. */
  subagents: number;
  metas: number;
  /** `git commit` tool_use blocks that pair with a `tool_result`. */
  paired: number;
}

export const CANARY_DETAIL = 'store layout unrecognized';

/** A store argument as the de-duplicated list it names (order kept; `path.resolve` equality). */
export function storeList(store: string | string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of Array.isArray(store) ? store : [store]) {
    const r = path.resolve(s);
    if (!seen.has(r)) {
      seen.add(r);
      out.push(s);
    }
  }
  return out;
}

/**
 * Index every candidate in the store(s) (one pass over the transcripts). A candidate found twice
 * with the same tool call id, prefix and subject (one record copied into two stores) is one
 * candidate — tool call ids are unique per call, so two distinct calls are never merged.
 */
export function indexCandidates(store: string | string[], shapes?: Map<string, StoreShape>): Candidate[] {
  const out: Candidate[] = [];
  const seenCall = new Set<string>();
  for (const st of storeList(store)) {
    const shape: StoreShape | undefined = shapes ? { transcripts: 0, subagents: 0, metas: 0, paired: 0 } : undefined;
    const found = indexStore(st, shape);
    if (shapes && shape) shapes.set(st, shape);
    for (const c of found) {
      const k = `${c.toolUseId}\0${c.prefix}\0${c.subjects.join('\0')}`;
      if (seenCall.has(k)) continue;
      seenCall.add(k);
      out.push(c);
    }
  }
  return out;
}

function indexStore(store: string, shape?: StoreShape): Candidate[] {
  const out: Candidate[] = [];
  for (const t of listTranscripts(store)) {
    if (shape) {
      shape.transcripts += 1;
      if (!t.isMain) {
        shape.subagents += 1;
        if (fs.existsSync(t.file.replace(/\.jsonl$/, '.meta.json'))) shape.metas += 1;
      }
    }
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
        if (shape) shape.paired += 1;
        const per = candidateLines(commands.get(b.tool_use_id) as string, resultText(b.content));
        // One candidate per tool call and commit: the [branch sha] line and the log line of one
        // call are the same candidate. They print the SHA at different lengths (9 and 40
        // characters), so the lines are the same commit when one prefix is a PREFIX of the other
        // (both are then prefixes of one full SHA) and they show a subject in common — never when
        // the prefixes name different commits. Lines of different tool calls are never merged
        // (signing-act ballot § 4.3, "one per pass"; the ruling `2026-11-08-peter-ruling-link4-dedupe`).
        const merged: Candidate[] = [];
        for (const c of per) {
          const subjects = [c.subject, c.inputSubject].filter((s): s is string => !!s);
          if (subjects.length === 0) continue;
          const same = merged.find((m) => (m.prefix.startsWith(c.prefix) || c.prefix.startsWith(m.prefix)) && m.subjects.some((s) => subjects.includes(s)));
          if (same) {
            if (c.prefix.length > same.prefix.length) same.prefix = c.prefix;
            for (const s of subjects) if (!same.subjects.includes(s)) same.subjects.push(s);
            same.proven = same.proven || c.proven;
          } else {
            merged.push({ file: t.file, store, isMain: t.isMain, toolUseId: b.tool_use_id, prefix: c.prefix, subjects, proven: c.proven });
          }
        }
        out.push(...merged);
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

/**
 * The parent's `tool_use` for a spawn id: the session file, then its subagents (nested spawns) —
 * in the transcript's own store first, then the other stores in order.
 */
function spawnTypeOf(stores: string[], sessionId: string | undefined, toolUseId: string): string | undefined {
  const files: string[] = [];
  if (sessionId) {
    for (const store of stores) {
      files.push(path.join(store, `${sessionId}.jsonl`));
      const sub = path.join(store, sessionId, 'subagents');
      if (fs.existsSync(sub)) for (const s of fs.readdirSync(sub)) if (s.endsWith('.jsonl')) files.push(path.join(sub, s));
    }
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
 * (a row that renders nothing — `record absent` 7, never `anchored`: ruling 9).
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
  /** One store, or several (read in order; `--store` repeated, or {@link defaultStores}). */
  store: string | string[];
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
  const stores = storeList(opts.store);
  const shapes = new Map<string, StoreShape>();
  const candidates = indexCandidates(stores, shapes);
  // The canary (ballot 2026-10-23 § 2b), read PER STORE ("transcripts exist under the store …"): a
  // store holds subagent transcripts but none shows a paired `git commit` call, or none has its
  // `.meta.json`. A store with no transcripts, or main-session transcripts only, reads as before
  // (§ 2b's last sentence) — a harness format change, read as the instrument's
  // fact and never as a population of missing records. A newer store that changed format is not
  // masked by an older one that did not.
  const unrecognized = [...shapes.entries()].filter(([, s]) => s.subagents > 0 && (s.paired === 0 || s.metas === 0)).map(([st]) => st);
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
  type Lookup = { verdict?: Verdict; link?: 4; detail: string; cand?: Candidate; canary?: boolean };
  const lookups = new Map<string, Lookup>();
  const earliestByTranscript = new Map<string, CommitAnalysis>();
  for (const an of analyses) {
    // A candidate from an unrecognized store is not evidence either way: it is left out.
    const hits = candidates.filter((c) => !unrecognized.includes(c.store) && an.sha.startsWith(c.prefix) && c.subjects.includes(an.subject));
    const kiroRun = (opts.kiro ?? []).some((k) => an.sha.startsWith(k));
    let l: Lookup;
    if (unrecognized.length > 0 && hits.length === 0 && !kiroRun) {
      l = { verdict: 'anomaly', link: 4, detail: CANARY_DETAIL, canary: true };
    } else if (hits.length === 0) {
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
        // One store: relative to it, as before. Several: prefixed with the store's directory name,
        // so the line says which store anchored it.
        v.transcript = stores.length === 1 ? path.relative(cand.store, cand.file) : path.join(path.basename(cand.store), path.relative(cand.store, cand.file));
        v.spawnDepth = t.meta?.spawnDepth;
        v.model = t.meta?.model;
        // Link 5.
        const parentType = t.meta?.toolUseId ? spawnTypeOf([cand.store, ...stores.filter((x) => x !== cand.store)], t.first?.sessionId ?? path.basename(path.dirname(path.dirname(cand.file))), t.meta.toolUseId) : undefined;
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
              // --first-parent (ruling 8): a commit merged in from elsewhere never picks the charter.
              at = gitTry(repo, ['rev-list', '-1', '--first-parent', `--before=${ts}`, ref])?.trim() || undefined;
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
              // Ruling 9: a row that renders nothing has no line a seat could have read — never `anchored`.
              if (line === undefined) done('record absent', 7, 'the row renders nothing — there is no rendered line to find');
              else if (!t.results.some((r) => r.includes(line))) done('FAIL', 7, `no tool result contains the row's rendered line "${line.slice(0, 80)}"`);
              else done('anchored', undefined, `transcript ${v.transcript}`);
            }
          }
        }
      }
      if (l.canary) v.canary = true;
      if (unrecognized.length > 0) v.unrecognizedStores = unrecognized;
      v.widen = (!l.canary && (v.verdict === 'FAIL' || v.verdict === 'anomaly')) || (v.spawnDepth !== undefined && v.spawnDepth !== 1);
      out.push(v);
    }
  }
  return out;
}

/**
 * The signer filter of `--audit` (sitting-2 ballot S5). It keys on the `seat` field every per-act
 * line prints (`c1Seat(owner)`, else the single `Agent:` trailer, else `(unknown)`) and on nothing
 * else — not the trailer, the row's owner or the transcript's meta. It selects from the FINISHED
 * verdict list, after every pass of {@link runAudit}, so it never changes a kept act's verdict.
 * `seat` is lowercased; the comparison is case-insensitive.
 */
export interface SignerFilter {
  mode: 'signer' | 'exclude-signer';
  seat: string;
}

export const matchesSigner = (a: ActVerdict, seat: string): boolean => a.seat.toLowerCase() === seat.toLowerCase();

/** The acts a filter keeps; `--signer` and `--exclude-signer` over one list partition it, order kept. */
export function filterActs(acts: ActVerdict[], filter: SignerFilter): ActVerdict[] {
  return acts.filter((a) => (filter.mode === 'signer') === matchesSigner(a, filter.seat));
}

/** The one line a filtered run adds, directly under the header (form: Stacy's fixture specification § 3). */
export const filterLine = (f: SignerFilter, selected: number, total: number): string =>
  `filter --${f.mode} ${f.seat}: ${selected} of ${total} act(s) selected; ${total - selected} withheld`;

const FILTER_FLAGS = ['--signer', '--exclude-signer'] as const;

/**
 * Parse `--signer <seat>` / `--exclude-signer <seat>`. No filter when neither is passed. An
 * `error` — never a silent unfiltered run — when both are passed, either is repeated, the value
 * is missing, empty or flag-shaped, or the `--flag=value` spelling is used.
 */
export function parseSignerFilter(argv: string[]): { filter?: SignerFilter; error?: string } {
  const eq = argv.find((t) => FILTER_FLAGS.some((f) => t.startsWith(`${f}=`)));
  if (eq) return { error: `'${eq}': write the seat as a separate argument (${eq.split('=')[0]} <seat>)` };
  const present = FILTER_FLAGS.filter((f) => argv.includes(f));
  if (present.length > 1) return { error: '--signer and --exclude-signer are mutually exclusive' };
  if (present.length === 0) return {};
  const name = present[0];
  if (argv.filter((t) => t === name).length > 1) return { error: `${name} given more than once` };
  const v = arg(argv, name);
  if (v === undefined || v === '' || v.startsWith('--')) return { error: `${name} needs a seat name (got ${v === undefined ? 'nothing' : `'${v}'`})` };
  return { filter: { mode: name === '--signer' ? 'signer' : 'exclude-signer', seat: v.toLowerCase() } };
}

/** `--audit`'s arguments: those that take a value, and the bare switches. */
export const AUDIT_VALUE_FLAGS = ['--pr', '--branch', '--base', '--store', '--kiro', '--signer', '--exclude-signer'] as const;
export const AUDIT_SWITCHES = ['--audit', '--json'] as const;

/**
 * The first argument `--audit` does not know — an unknown `--` token (a misspelling such as
 * `--signr`, or a flag and its value pasted as one token, `"--signer stacy"`), or a bare token
 * where no value is expected — else `undefined`. An unknown argument exits 2, never runs
 * unfiltered (Stacy's F13: "never fall through to an unfiltered run"). `--ci` is not read here.
 */
export function unknownAuditArg(argv: string[]): string | undefined {
  for (let i = 0; i < argv.length; i += 1) {
    const t = argv[i];
    if ((AUDIT_SWITCHES as readonly string[]).includes(t)) continue;
    if ((AUDIT_VALUE_FLAGS as readonly string[]).includes(t)) {
      i += 1;
      continue;
    }
    return t;
  }
  return undefined;
}

export const AUDIT_KNOWN = '--audit, --pr <N>, --branch <b>, --base <ref>, --store <dir>, --kiro <sha,…>, --signer <seat>, --exclude-signer <seat>, --json';

/**
 * The seats a filter may name: every charter stem under `canonical/agents/` at `head` (never a
 * `_`-prefixed fixture), every seat C1 maps one to (Thurgood's rows → stacy), the escalation
 * seat `peter`, and every seat seen in the range's acts. Exact match only — never a prefix.
 */
export function knownSeats(repo: string, head: string, rg: Regrounding, acts: ActVerdict[]): { roster: string[]; seen: string[] } {
  const stems = lsTree(repo, head, 'canonical/agents')
    .map((p) => /^canonical\/agents\/([^/_][^/]*)\.md$/.exec(p)?.[1])
    .filter((x): x is string => !!x)
    .map((x) => x.toLowerCase());
  const roster = [...new Set([...stems, ...stems.map((x) => rg.c1Seat(x)), ESCALATION_SEAT])].sort();
  const seen = [...new Set(acts.map((a) => a.seat.toLowerCase()))].sort();
  return { roster, seen };
}

/** C1's escalation seat (`c1.ts` ESCALATION_SEAT) — on the filter roster though it signs nothing today. */
export const ESCALATION_SEAT = 'peter';

/**
 * The human-readable audit. With a `filter`, `acts` is the FULL verdict list: one `filter` line
 * follows the header, and the per-act lines and the counts line cover the selected acts only —
 * withheld acts appear as a bare number, never a line, a verdict or a count. Without one, the
 * output is exactly the pre-filter output.
 */
export function formatAudit(acts: ActVerdict[], header: string, filter?: SignerFilter): string[] {
  const lines = [`verify-signing-chain --audit — ${LABEL} — ${header}`];
  if (filter) {
    const kept = filterActs(acts, filter);
    lines.push(filterLine(filter, kept.length, acts.length));
    acts = kept;
  }
  for (const a of acts) {
    const label = a.link ? `${a.verdict} ${a.link}` : a.verdict;
    lines.push(
      `${label} — ${a.row} — ${a.seat} — ${a.sha.slice(0, 8)}${a.detail ? ` — ${a.detail}` : ''}` +
        `${a.spawnDepth !== undefined ? ` — spawnDepth ${a.spawnDepth}, model ${a.model ?? '?'}` : ''}` +
        `${a.widen ? ' — widening (§ 5.4)' : ''}${a.preRatification ? ' — pre-ratification observation' : ''}`
    );
  }
  // Ballot 2026-10-23 § 2d: the canary reaches Peter as one line per unrecognized store per run, never one per act.
  const bad = [...new Set(acts.flatMap((a) => a.unrecognizedStores ?? []))];
  for (const st of bad) {
    const n = acts.filter((a) => a.canary).length;
    lines.push(`**Open for Peter**: the store layout of ${st} was not recognized — ${n} act(s) in this run read \`anomaly 4: ${CANARY_DETAIL}\`; this is evidence about the instrument, not about a seat, and sends no act into J (signing-act ballot § 5.4). See the module header's STORE LAYOUT block.`);
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
export function defaultStore(repo: string, home: string = os.homedir()): string {
  const common = gitTry(repo, ['rev-parse', '--path-format=absolute', '--git-common-dir'])?.trim();
  const root = common ? path.dirname(common) : repo;
  return path.join(home, '.claude', 'projects', root.replace(/[^A-Za-z0-9]/g, '-'));
}

/** The slug a session started in `<root>/.claude/worktrees/<name>` writes under: `<slug>--claude-worktrees-<name>`. */
export const WORKTREE_STORE_INFIX = '--claude-worktrees-';

/**
 * The default store set: the main checkout's store, then every sibling directory named
 * `<slug>--claude-worktrees-*` (sorted) — the stores whose names derive from the repo path. A
 * sibling is matched by that exact prefix, never by `<slug>-`, so another checkout whose path
 * extends this one's (`…-v2-copy`) is never read.
 */
export function defaultStores(repo: string, home: string = os.homedir()): string[] {
  const main = defaultStore(repo, home);
  const dir = path.dirname(main);
  const prefix = `${path.basename(main)}${WORKTREE_STORE_INFIX}`;
  const siblings = fs.existsSync(dir)
    ? fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory() && e.name.startsWith(prefix))
        .map((e) => e.name)
        .sort()
        .map((n) => path.join(dir, n))
    : [];
  return [main, ...siblings];
}

/** The header's store clause: `store <dir>` for one (unchanged), `stores (<n>): <a>, <b>, …` for several. */
export const storeClause = (stores: string[]): string => (stores.length === 1 ? `store ${stores[0]}` : `stores (${stores.length}): ${stores.join(', ')}`);

function arg(argv: string[], name: string): string | undefined {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
}

/** Every value of a repeatable flag, in order. */
function args(argv: string[], name: string): string[] {
  const out: string[] = [];
  argv.forEach((t, i) => {
    if (t === name && i + 1 < argv.length) out.push(argv[i + 1]);
  });
  return out;
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

// ============================================================================
// `--print <record file>#<fragment>` — the read a signing act rests on
// ============================================================================

/**
 * `--print` (item 1 of `.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md`; Peter's
 * ruling of 2026-11-08, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md`).
 * Given a record file and a fragment, it prints, in ONE output, the whole canonical unit and then its
 * hash; for a dispositions row it also prints the row's whole consumer rendering and then its
 * `renderedHash`. Every value is computed the way the freshness sweep computes it
 * (`freshness.ts` `runFreshnessSweep`), over the working tree:
 *   - an operative-set record (`canonical/operative-sets/<f>.yaml#<anchor>`): the body unit
 *     `#<anchor>` of the record's `source` (`partition(splitFrontmatter(src).body).units`) and
 *     `hashText` of it — what a CONFIRMER reads, and what link 7 reads for a confirmation;
 *   - a dispositions row (`canonical/profiles/**\/<f>.dispositions.yaml#<anchor>`, `#frontmatter:<path>`,
 *     or `#<member id>` in the shared file): the canonical unit, entry or member and its
 *     `canonicalHash` (`hashText`, or `hashEntry` over the entry's value / the member), then every
 *     rendered piece of the row's span source under `canonical/_consumer-output/` and
 *     `renderedHashOf` over them — what a SIGNER reads, and what link 7 reads for a signature.
 * For an entry or a member the printed canonical text is `canonicalStringify(value)`: the exact
 * bytes `hashEntry` hashes. Each text sits between a `<<<<< begin` and a `>>>>> end` line; the bytes
 * between them are the text, ending in one newline.
 * It never prints a pinned or recorded hash, and never a line range: the seat compares its printed
 * value with the sweep's afterwards (seat-brief template steps 1–2). Printing is not reading
 * (Stacy's caveat): the mode is necessary, not sufficient. It decides nothing and is never part of
 * `--ci` or `--audit`. Exit 0 on a print, 2 when the target does not resolve.
 */
export class PrintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PrintError';
  }
}

export interface PrintedUnit {
  /** The record file, repo-relative. */
  record: string;
  /** The fragment as given (without `#`). */
  fragment: string;
  source: string;
  section: Section;
  /** The record's or the row's key (`#identity`, `commands[x]`, a member id). */
  key: string;
  canonical: { text: string; hash: string };
  /** Dispositions rows only. */
  rendering?: { spanSource: string; pieces: { artifact: string; text: string }[]; hash: string };
  /** `HEAD` of the repo when printed. */
  at: string;
  /** Paths read that differ from `HEAD` (working-tree changes), if any. */
  dirty: string[];
  lines: string[];
}

export const PRINT_BEGIN = (what: string): string => `<<<<< begin ${what}`;
export const PRINT_END = (what: string): string => `>>>>> end ${what}`;

/** The modules the print reads, loaded beside this file (failing loud when one is absent). */
function printModules(dir: string = __dirname): {
  partition: typeof partition;
  entryTree: (fm: Record<string, unknown>) => { units: { path: string; value: unknown }[] };
  hashText: (t: string) => string;
  hashEntry: (v: unknown) => string;
  canonicalStringify: (v: unknown) => string;
  readConsumerSpans: (root: string) => ReadonlyMap<string, readonly { artifact: string; text: string }[]> | undefined;
  renderedHashOf: (spans: ReadonlyMap<string, readonly { artifact: string; text: string }[]>, source: string) => string;
  rowSpanSource: (docSource: string, section: string, key: string) => string;
  sharedCatalog: string;
} {
  for (const m of ['hash', '../derive', '../canonical-json', 'dispositions']) {
    if (!hasModule(dir, m)) throw new PrintError(`regrounding/${m} is not on this tree — nothing to print against`);
  }
  /* eslint-disable @typescript-eslint/no-var-requires */
  const hash = require(path.join(dir, 'hash'));
  const derive = require(path.join(dir, '../derive'));
  const cj = require(path.join(dir, '../canonical-json'));
  const disp = require(path.join(dir, 'dispositions'));
  const part = require(path.join(dir, '../partition'));
  /* eslint-enable @typescript-eslint/no-var-requires */
  return {
    partition,
    entryTree: part.entryTree,
    hashText: hash.hashText,
    hashEntry: hash.hashEntry,
    canonicalStringify: cj.canonicalStringify,
    readConsumerSpans: derive.readConsumerSpans,
    renderedHashOf: derive.renderedHashOf,
    rowSpanSource: derive.rowSpanSource,
    sharedCatalog: disp.SHARED_CATALOG,
  };
}

/** Split `<record file>#<fragment>`; the record path is taken relative to the repo root. */
export function parsePrintTarget(repo: string, target: string, cwd: string = repo): { record: string; fragment: string } {
  const at = target.indexOf('#');
  if (at <= 0 || at === target.length - 1) throw new PrintError(`'${target}' is not <record file>#<anchor>`);
  const real = (d: string): string => (fs.existsSync(d) ? fs.realpathSync(d) : d);
  const abs = path.resolve(real(cwd), target.slice(0, at));
  const record = path.relative(real(repo), abs).split(path.sep).join('/');
  if (record.startsWith('..')) throw new PrintError(`${target.slice(0, at)} is outside the repo`);
  return { record, fragment: target.slice(at + 1) };
}

/** The print for one target (see {@link PrintError}'s block). Throws {@link PrintError} when it does not resolve. */
export function printUnit(repo: string, target: string, cwd: string = repo): PrintedUnit {
  const m = printModules();
  const { record, fragment } = parsePrintTarget(repo, target, cwd);
  const readFile = (rel: string): string | undefined => (fs.existsSync(path.join(repo, rel)) ? fs.readFileSync(path.join(repo, rel), 'utf8') : undefined);
  const recordText = readFile(record);
  if (recordText === undefined) throw new PrintError(`${record} does not exist`);
  const isRecord = isRecordPath(record);
  if (!isRecord && !isDispositionsPath(record)) throw new PrintError(`${record} is neither an operative-set record (${RECORDS_DIR}/*.yaml) nor a dispositions file (${PROFILES_DIR}/**/*.dispositions.yaml)`);
  const { doc, error } = parseYamlMap(recordText);
  if (error) throw new PrintError(`${record}: YAML failed to parse — ${error}`);
  const source = doc.source;
  if (typeof source !== 'string') throw new PrintError(`${record} names no source`);
  const sourceText = readFile(source);
  if (sourceText === undefined) throw new PrintError(`${record}: source ${source} does not exist`);

  // The section and key, as the sweep keys the record's units and the dispositions' rows.
  let section: Section = 'body';
  let key = `#${fragment}`;
  if (!isRecord && fragment.startsWith('frontmatter:')) {
    section = 'frontmatter';
    key = fragment.slice('frontmatter:'.length);
  } else if (!isRecord && source === m.sharedCatalog) {
    section = 'members';
    key = fragment;
  }
  const rows = isRecord ? doc.units : doc[section];
  if (!isMap(rows) || !(key in rows)) {
    throw new PrintError(`${record} has no ${isRecord ? 'unit' : `${section} row`} ${JSON.stringify(key)}`);
  }

  // The canonical side — the sweep's `view(source)`.
  let text: string | undefined;
  let hash: string;
  if (section === 'body') {
    text = m.partition(splitFrontmatter(sourceText, source).body).units.find((u) => u.anchor === key)?.text;
    if (text === undefined) throw new PrintError(`the canonical unit ${key} of ${source} does not resolve`);
    hash = m.hashText(text);
  } else {
    let value: unknown;
    let found = false;
    if (section === 'members') {
      const members = (loadYaml(sourceText) as { members?: { id?: unknown }[] } | undefined)?.members ?? [];
      const hit = members.find((x) => x?.id === key);
      found = hit !== undefined;
      value = hit;
    } else {
      const hit = m.entryTree((splitFrontmatter(sourceText, source).frontmatter ?? {}) as Record<string, unknown>).units.find((u) => u.path === key);
      found = hit !== undefined;
      value = hit?.value;
    }
    if (!found) throw new PrintError(`the canonical ${section === 'members' ? 'member' : 'entry'} ${key} of ${source} does not resolve`);
    text = m.canonicalStringify(value);
    hash = m.hashEntry(value);
  }

  const out: PrintedUnit = { record, fragment, source, section, key, canonical: { text, hash }, at: '', dirty: [], lines: [] };
  const read = [record, source];
  if (!isRecord) {
    const spans = m.readConsumerSpans(repo);
    if (spans === undefined) throw new PrintError(`no consumer rendering under ${CONSUMER_OUTPUT_DIR}/ — run the consumer generation first`);
    const spanSource = m.rowSpanSource(source, section, key);
    const pieces = (spans.get(spanSource) ?? []).map((p) => ({ artifact: p.artifact, text: p.text }));
    out.rendering = { spanSource, pieces, hash: m.renderedHashOf(spans, spanSource) };
    read.push(CONSUMER_OUTPUT_DIR);
  }
  out.at = gitTry(repo, ['rev-parse', 'HEAD'])?.trim() ?? '(no HEAD)';
  out.dirty = (gitTry(repo, ['status', '--porcelain', '--', ...read]) ?? '')
    .split('\n')
    .filter(Boolean)
    .map((l) => l.slice(3));

  const what = section === 'body' ? 'canonical unit' : section === 'members' ? 'canonical member' : 'canonical entry';
  const L = out.lines;
  L.push(`verify-signing-chain --print — ${LABEL} — ${record}#${fragment}`);
  L.push(`read at ${out.at} (working tree)${out.dirty.length ? `; uncommitted changes in: ${out.dirty.join(', ')}` : '; clean'}`);
  L.push(`${what}: ${source} ${section === 'body' ? key : section === 'members' ? `member ${key}` : `frontmatter:${key}`}${section === 'body' ? '' : ' (printed as canonicalStringify(value), the bytes hashEntry hashes)'}`);
  L.push(PRINT_BEGIN(what), text.replace(/\n$/, ''), PRINT_END(what));
  L.push(`canonicalHash: ${hash}`);
  if (out.rendering) {
    const r = out.rendering;
    L.push(`rendering: ${r.pieces.length} piece(s) for span source ${r.spanSource}`);
    if (r.pieces.length === 0) L.push('(the row renders nothing — no rendered piece)');
    for (const p of r.pieces) L.push(PRINT_BEGIN(`rendering ${p.artifact}`), p.text.replace(/\n$/, ''), PRINT_END(`rendering ${p.artifact}`));
    L.push(`renderedHash: ${r.hash}`);
  }
  return out;
}

/** `--print <record file>#<fragment>`: one output, the unit then its hash. */
export function printMode(repo: string, argv: string[], cwd: string = repo): number {
  const target = arg(argv, '--print');
  if (target === undefined || target.startsWith('--')) {
    console.error('verify-signing-chain --print: pass <record file>#<anchor> (an operative-set record or a dispositions file)');
    return 2;
  }
  try {
    console.log(printUnit(repo, target, cwd).lines.join('\n'));
    return 0;
  } catch (e) {
    if (!(e instanceof PrintError)) throw e;
    console.error(`verify-signing-chain --print: ${e.message}`);
    return 2;
  }
}

/**
 * `--census-routed [--at <sha>]` — the census mode (ballot 2026-10-19-instrument-census-at-draft;
 * register `signing-act-consistency`, field `census`). Prints `freshness.ts` `routedCensus` over the
 * profile tree: the working tree's tracked files, or the tree of `<sha>` with `--at`. Adds no logic;
 * exit 0, or 2 when the mode or the commit is missing. Never part of `--ci`.
 */
export function censusRouted(repo: string, argv: string[], rg: Regrounding | undefined): number {
  if (!rg?.census) {
    console.error('verify-signing-chain --census-routed: regrounding/freshness.ts routedCensus is not on this tree');
    return 2;
  }
  const at = arg(argv, '--at');
  let files: string[];
  let read: (rel: string) => string | undefined;
  if (at !== undefined) {
    const c = resolveCommit(repo, at);
    if (!c) {
      console.error(`verify-signing-chain --census-routed: --at ${at} does not resolve to a commit in this history`);
      return 2;
    }
    files = [...lsTree(repo, c, PROFILES_DIR), ...lsTree(repo, c, RECORDS_DIR)];
    read = (rel) => blobText(repo, c, rel);
  } else {
    files = git(repo, ['ls-files', '--', PROFILES_DIR, RECORDS_DIR]).split('\n').filter(Boolean);
    read = (rel) => (fs.existsSync(path.join(repo, rel)) ? fs.readFileSync(path.join(repo, rel), 'utf8') : undefined);
  }
  for (const l of rg.census(read, files)) console.log(l);
  return 0;
}

/** `home` is where the default store set is looked up (`~`; a test passes a fixture home). */
export function main(argv: string[], cwd: string = process.cwd(), home: string = os.homedir()): number {
  const repo = gitTry(cwd, ['rev-parse', '--show-toplevel'])?.trim() ?? cwd;
  const rgLoaded = loadRegrounding();
  if (argv.includes('--census-routed')) return censusRouted(repo, argv, rgLoaded);
  if (argv.includes('--print')) return printMode(repo, argv, cwd);
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
    const sf = parseSignerFilter(argv);
    if (sf.error) {
      console.error(`verify-signing-chain --audit: ${sf.error}`);
      return 2;
    }
    const unknown = unknownAuditArg(argv);
    if (unknown !== undefined) {
      console.error(`verify-signing-chain --audit: unknown argument '${unknown}' for --audit — known: ${AUDIT_KNOWN}`);
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
    const given = args(argv, '--store');
    const store = storeList(given.length > 0 ? given : defaultStores(repo, home));
    const kiro = arg(argv, '--kiro')?.split(',').filter(Boolean);
    const acts = runAudit({ repo, base, head, store, rg: rgLoaded, kiro, since: R_SHA });
    const filter = sf.filter;
    if (filter) {
      const { roster, seen } = knownSeats(repo, resolveCommit(repo, head) ?? head, rgLoaded, acts);
      if (!roster.includes(filter.seat) && !seen.includes(filter.seat)) {
        console.error(
          `verify-signing-chain --audit: unknown seat '${filter.seat}' for --${filter.mode} — seats seen in range: ${seen.join(', ') || '(none)'}; roster: ${roster.join(', ')}`
        );
        return 2;
      }
    }
    // Unfiltered: the object and the lines are exactly as before the filter existed.
    let payload: Record<string, unknown> = { label: LABEL, header, acts };
    if (filter) {
      const kept = filterActs(acts, filter);
      payload = { label: LABEL, header, filter: { mode: filter.mode, seat: filter.seat, selected: kept.length, withheld: acts.length - kept.length }, acts: kept };
    }
    if (argv.includes('--json')) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      for (const l of formatAudit(acts, `${header}; ${storeClause(store)}`, filter)) console.log(l);
      console.log('--- machine-readable ---');
      console.log(JSON.stringify(payload));
    }
    return 0;
  }
  console.error('usage: verify-signing-chain --ci [--base <sha>] [--head <sha>] [--since <sha>|none]\n       verify-signing-chain --census-routed [--at <sha>]\n       verify-signing-chain --print <record file>#<anchor>\n       verify-signing-chain --audit (--pr <N> | --branch <b>) [--base <ref>] [--store <dir>]… [--kiro <sha,…>] [--signer <seat> | --exclude-signer <seat>] [--json]');
  return 2;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}
