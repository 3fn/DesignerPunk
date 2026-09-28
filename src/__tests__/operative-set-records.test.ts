/**
 * TEMPORARY TEST — Spec 123 Task 11.4 precursor. Delete when 123 Task 13.6 lands.
 *
 * Retirement criterion (tasks.md, Task 13, freshness criterion (v), amendment 2026-09-27,
 * ruled by Peter): the `operative-set-freshness` sweep inside `122-diff-guard`, with 13.3's
 * confirmer and verbatim checks, absorbs every assertion below and the same change DELETES this
 * file — `git ls-tree` on the U2b PR head returns empty. Until then this is the mechanical check
 * Task 11's criteria name ("by the confirmer check, not inspection"; the verbatim-substring
 * check; "each `confirmation:` path resolves to a committed note").
 *
 * Semantics: Stacy's record-and-note check script
 * (`.kiro/specs/123-consumer-distribution/completion/task-11-2-stacy-completion.md`), so 13.6
 * inherits one definition. One deliberate difference, recorded in task-11-4-completion.md: a
 * note block matches its `confirmation:` fragment when the block's heading text (one pair of
 * enclosing backticks removed) EQUALS the full unit anchor, not when its slug equals the
 * fragment — `slugify` drops the `:` of a `#<parent>:preamble` anchor, so the slug rule could
 * never resolve a preamble unit's note.
 *
 * For every `canonical/operative-sets/*.yaml` record (design C16, Req 11.6.5d):
 *   - `confirmer:` = the C1 function of (owner, profile author = thurgood): owner, unless owner
 *     is the profile author → the counterpart seat (stacy); both roles on one agent → peter;
 *   - every unit key resolves to a unit of `partition(splitFrontmatter(<source>).body)`
 *     (Task 10's splitter);
 *   - `canonicalHash` = "sha256:" + hex SHA-256 over that unit's exact UTF-8 bytes (fresh);
 *   - item ids are unique per unit; `kind` ∈ {obligation, step, member, route, command};
 *   - every item `text` is a verbatim substring of its unit, with no edge whitespace;
 *   - each `confirmation:` path is a git-tracked file with exactly one `## ` block for the unit,
 *     whose `confirmer:`, `canonicalHash:` and `items:` lines equal the record's (ids in record
 *     order; `items: none` for an empty set) and which carries a `date: YYYY-MM-DD` line.
 *
 * Limits (Task 11's own scope line): these checks establish the declared seat and the verbatim
 * text. They do NOT establish authorship (one git identity) or completeness (a truncated item
 * `text` still passes — the confirmer's responsibility).
 *
 * The splitter is loaded with a runtime `require` (the Spec107 integration-test precedent):
 * the root tsconfig's `rootDir` is `src`, so a static import of `tools/` fails `tsc` (TS6059),
 * while Jest's ts-jest transform loads it fine.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { load as loadYaml } from 'js-yaml';

interface Unit {
  anchor: string;
  text: string;
}
interface Partitioned {
  units: readonly Unit[];
}

const REPO_ROOT = path.resolve(__dirname, '..', '..');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { splitFrontmatter } = require(path.join(REPO_ROOT, 'tools/agent-generator/frontmatter')) as {
  splitFrontmatter: (file: string, sourcePath?: string) => { body: string };
};
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { partition } = require(path.join(REPO_ROOT, 'tools/agent-generator/partition')) as {
  partition: (body: string) => Partitioned;
};

const RECORDS_DIR = 'canonical/operative-sets';
const PROFILE_AUTHOR = 'thurgood';
const COUNTERPART_SEAT = 'stacy';
const KINDS = ['obligation', 'step', 'member', 'route', 'command'];

/** C1 (design C16/C17): owner, unless owner == profile author → counterpart; both collapse → peter. */
export function c1Confirmer(owner: string, profileAuthor = PROFILE_AUTHOR, counterpart = COUNTERPART_SEAT): string {
  if (owner !== profileAuthor) return owner;
  return counterpart === profileAuthor ? 'peter' : counterpart;
}

const sha256 = (text: string): string => 'sha256:' + crypto.createHash('sha256').update(text, 'utf8').digest('hex');

interface RecordItem {
  id: string;
  kind: string;
  label?: string;
  text: string;
}
interface RecordUnit {
  canonicalHash: string;
  items: RecordItem[];
  confirmation: string;
}
interface OperativeSetRecord {
  source: string;
  owner: string;
  confirmer: string;
  units: Record<string, RecordUnit>;
}

const recordFiles = fs.existsSync(path.join(REPO_ROOT, RECORDS_DIR))
  ? fs
      .readdirSync(path.join(REPO_ROOT, RECORDS_DIR))
      .filter((f) => f.endsWith('.yaml'))
      .sort()
      .map((f) => `${RECORDS_DIR}/${f}`)
  : [];

const readRecord = (rel: string): OperativeSetRecord =>
  loadYaml(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')) as OperativeSetRecord;

const trackedByGit = (rel: string): boolean =>
  execFileSync('git', ['ls-files', '--', rel], { cwd: REPO_ROOT, encoding: 'utf8' }).trim() === rel;

/** The `## ` blocks of a note whose heading (enclosing backticks removed) equals `anchor`. */
function noteBlocksFor(note: string, anchor: string): string[] {
  return note
    .split(/^(?=## )/m)
    .filter((b) => b.startsWith('## '))
    .filter((b) => b.split('\n')[0].replace(/^## /, '').trim().replace(/^`(.*)`$/, '$1') === anchor);
}

const field = (block: string, key: string): string | undefined =>
  new RegExp(`^${key}: (.*)$`, 'm').exec(block)?.[1]?.trim();

describe('Spec 123 Task 11 operative-set records (temporary precursor — retires at 13.6)', () => {
  it('finds records to check (non-vacuity)', () => {
    expect(recordFiles.length).toBeGreaterThan(0);
    for (const rel of recordFiles) {
      expect(Object.keys(readRecord(rel).units ?? {}).length).toBeGreaterThan(0);
    }
  });

  it('computes the C1 function (owner / profile-author carve-out / collapse)', () => {
    expect(c1Confirmer('lina')).toBe('lina');
    expect(c1Confirmer('stacy')).toBe('stacy');
    expect(c1Confirmer('thurgood')).toBe('stacy');
    expect(c1Confirmer('stacy', 'stacy', 'stacy')).toBe('peter');
  });

  describe.each(recordFiles)('%s', (rel) => {
    const record = readRecord(rel);
    const units = Object.entries(record.units ?? {});

    let tree: Partitioned | undefined;
    const unitFor = (anchor: string): Unit | undefined => {
      if (!tree) {
        const file = fs.readFileSync(path.join(REPO_ROOT, record.source), 'utf8');
        tree = partition(splitFrontmatter(file, record.source).body);
      }
      return tree.units.find((u) => u.anchor === anchor);
    };

    it('declares the confirmer the C1 function requires', () => {
      expect(`confirmer ${record.confirmer}`).toBe(`confirmer ${c1Confirmer(record.owner)}`);
    });

    it('names a source file that exists', () => {
      expect(fs.existsSync(path.join(REPO_ROOT, record.source))).toBe(true);
    });

    it('keys every unit by a current partition anchor, with a fresh canonicalHash', () => {
      const failures: string[] = [];
      for (const [anchor, u] of units) {
        const unit = unitFor(anchor);
        if (!unit) failures.push(`anchor does not resolve: ${anchor}`);
        else if (sha256(unit.text) !== u.canonicalHash) failures.push(`stale canonicalHash: ${anchor}`);
      }
      expect(failures).toEqual([]);
    });

    it('carries unique ids, known kinds, and item text verbatim from its unit', () => {
      const failures: string[] = [];
      for (const [anchor, u] of units) {
        const unit = unitFor(anchor);
        const ids = (u.items ?? []).map((i) => i.id);
        if (new Set(ids).size !== ids.length) failures.push(`duplicate item id: ${anchor}`);
        for (const item of u.items ?? []) {
          if (!KINDS.includes(item.kind)) failures.push(`unknown kind "${item.kind}": ${anchor} ${item.id}`);
          if (typeof item.text !== 'string' || item.text !== item.text.trim()) {
            failures.push(`item text has edge whitespace or is not a string: ${anchor} ${item.id}`);
          } else if (unit && !unit.text.includes(item.text)) {
            failures.push(`item text not verbatim: ${anchor} ${item.id}`);
          }
        }
      }
      expect(failures).toEqual([]);
    });

    it('resolves every confirmation: to a committed note whose key lines match the record', () => {
      const failures: string[] = [];
      const notes = new Map<string, string>();
      const missing = new Set<string>();
      for (const [anchor, u] of units) {
        const hashAt = (u.confirmation ?? '').indexOf('#');
        const notePath = hashAt < 0 ? u.confirmation : u.confirmation.slice(0, hashAt);
        const fragment = hashAt < 0 ? '' : u.confirmation.slice(hashAt);
        if (fragment !== anchor) {
          failures.push(`confirmation fragment "${fragment}" does not name its unit: ${anchor}`);
          continue;
        }
        if (missing.has(notePath)) continue;
        if (!notes.has(notePath)) {
          if (!fs.existsSync(path.join(REPO_ROOT, notePath))) {
            failures.push(`confirmation note missing: ${notePath}`);
            missing.add(notePath);
            continue;
          }
          if (!trackedByGit(notePath)) failures.push(`confirmation note not committed: ${notePath}`);
          notes.set(notePath, fs.readFileSync(path.join(REPO_ROOT, notePath), 'utf8'));
        }
        const blocks = noteBlocksFor(notes.get(notePath) as string, anchor);
        if (blocks.length !== 1) {
          failures.push(`confirmation resolves to ${blocks.length} note blocks (want 1): ${u.confirmation}`);
          continue;
        }
        const block = blocks[0];
        const ids = (u.items ?? []).map((i) => i.id);
        const noteItems = field(block, 'items');
        const noteIds =
          noteItems === 'none' ? [] : (noteItems ?? '').split(',').map((s) => s.trim()).filter(Boolean);
        if (field(block, 'confirmer') !== record.confirmer) failures.push(`note confirmer: ${anchor}`);
        if (field(block, 'canonicalHash') !== u.canonicalHash) failures.push(`note hash: ${anchor}`);
        if (JSON.stringify(noteIds) !== JSON.stringify(ids)) {
          failures.push(`note items != record items: ${anchor} (${noteIds.length} vs ${ids.length})`);
        }
        if (!/^date: \d{4}-\d{2}-\d{2}$/m.test(block)) failures.push(`note date: ${anchor}`);
      }
      expect(failures).toEqual([]);
    });
  });
});
