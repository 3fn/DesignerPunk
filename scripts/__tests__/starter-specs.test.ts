/**
 * @category evergreen
 * @purpose Spec 123 Task 21: the starter specs `init` scaffolds into a
 * consumer's `specs/` (Req 16, 17; design C25, DD15). The package source is
 * `src/cli/templates/starter-specs/**`.
 *
 * What this file asserts:
 *   - exactly two starter specs ship (Req 16.1, 16.2);
 *   - the CI-needs spec: every need carries a tier (P3), a bite recipe (P2)
 *     and a two-sided price line (P4); "committed platform output matches
 *     `generate`" is a minimal-core need (C25); the recorded need count equals
 *     the parsed needs (Task 21 criterion 1);
 *   - the re-grounding spec: its tasks include the report of what did not
 *     transfer (criterion 2), a spec-formalization task (Req 24.1, beat 1), the
 *     claims check by a different seat (Req 24.1b, beat 2), and the closed
 *     disposition vocabulary (Req 11.2);
 *   - vocabulary (Req 15B.5, criterion 5): a lifecycle verb described in a
 *     starter spec is described in `vocabulary.ts`'s words, and `attach` never
 *     appears without its object;
 *   - harness-agnostic (P5): a spec that names one harness's path names the
 *     other's too;
 *   - no repo-specifics (Req 11.3 (i), as a deny-list). Scope: the deny-list is
 *     evidence about the enumeration, not about the text.
 *
 * Task 21.3 (Lina) scaffolds these files from `init`; this file does not test
 * the scaffolding.
 */

import * as fs from 'fs';
import * as path from 'path';
import { LIFECYCLE_VERBS, attachUsage } from '../../src/cli/shared/vocabulary';

const ROOT = path.resolve(__dirname, '..', '..', 'src', 'cli', 'templates', 'starter-specs');
const read = (rel: string): string => fs.readFileSync(path.join(ROOT, rel), 'utf8');

const SPEC_DIRS = ['ci-needs', 'regrounding'];
const FILES = ['ci-needs/needs.md', 'ci-needs/tasks.md', 'regrounding/tasks.md'];

const TIERS = ['minimal core', 'optional hardening'] as const;
const MANDATED_NEED = 'Committed platform output matches `generate`'; // design C25

// ---------------------------------------------------------------------------
// Parsers (pure)
// ---------------------------------------------------------------------------

export interface Need {
  id: string;
  title: string;
  fields: Record<string, string>;
}

/** Needs: `### N<k>. <title>` blocks under `## Needs`, each with `- **Field**: value` bullets. */
export function parseNeeds(text: string): Need[] {
  const lines = text.split('\n');
  const start = lines.indexOf('## Needs');
  if (start < 0) throw new Error('needs.md: no "## Needs" section');
  const needs: Need[] = [];
  let cur: Need | null = null;
  for (const l of lines.slice(start + 1)) {
    if (/^## /.test(l)) break;
    const h = /^### (N\d+)\. (.+)$/.exec(l);
    if (h) {
      cur = { id: h[1], title: h[2].trim(), fields: {} };
      needs.push(cur);
      continue;
    }
    const f = /^- \*\*([^*]+)\*\*: (.*)$/.exec(l);
    if (f && cur) cur.fields[f[1]] = f[2];
  }
  return needs;
}

/** The `## Need count` paragraph: its leading integer, and its per-tier counts. */
export function recordedCount(text: string): { total: number; core: number; optional: number } {
  const lines = text.split('\n');
  const i = lines.indexOf('## Need count');
  if (i < 0) throw new Error('needs.md: no "## Need count" section');
  const para = lines.slice(i + 1).find((l) => l.trim() !== '') ?? '';
  const m = /^(\d+): (\w+) minimal core .* and (\w+) optional hardening/.exec(para);
  if (!m) throw new Error(`needs.md: unreadable need count: ${para}`);
  const words: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6 };
  const n = (w: string) => (/^\d+$/.test(w) ? Number(w) : words[w]);
  return { total: Number(m[1]), core: n(m[2]), optional: n(m[3]) };
}

/** A need's problems against P2/P3/P4 (empty when it carries all three). */
export function needProblems(n: Need): string[] {
  const p: string[] = [];
  if (!TIERS.includes(n.fields['Tier'] as (typeof TIERS)[number])) p.push(`${n.id}: tier`);
  const bite = n.fields['Bite recipe'] ?? '';
  if (!/goes red/.test(bite) || !/[Rr]evert|[Dd]elete/.test(bite)) p.push(`${n.id}: bite recipe`);
  const price = n.fields['Price'] ?? '';
  if (!/\bskip it\b/.test(price) || !/\badopt it\b/.test(price)) p.push(`${n.id}: two-sided price`);
  if (!n.fields['Check']) p.push(`${n.id}: check`);
  if (!n.fields['Why']) p.push(`${n.id}: why`);
  return p;
}

/** Checkbox tasks (`- [ ] <n>. …`), each with its continuation lines. */
export function tasks(text: string): string[] {
  const out: string[] = [];
  let cur: string[] | null = null;
  for (const l of text.split('\n')) {
    if (/^- \[[ x]\] \d+\. /.test(l)) {
      cur = [l];
      out.push('');
      continue;
    }
    if (/^#{1,6} /.test(l)) cur = null;
    if (cur) cur.push(l);
    if (cur) out[out.length - 1] = cur.join('\n');
  }
  return out;
}

/** Lifecycle-verb descriptions written in the form `` `<verb>`: <text> `` or `` `<verb>` — <text> ``, whose text is not vocabulary.ts's. */
export function vocabularyDrift(text: string): string[] {
  const out: string[] = [];
  for (const l of text.split('\n')) {
    const m = /`(init|generate|sync|validate|attach)`(?::| —) (.+)$/.exec(l);
    if (!m) continue;
    const entry = LIFECYCLE_VERBS.find((e) => e.verb === m[1])!;
    if (!m[2].startsWith(entry.description)) out.push(l);
  }
  return out;
}

/** `attach` named without its object anywhere in the file. */
export function attachWithoutObject(text: string): boolean {
  return /\battach\b/.test(text) && !text.includes(attachUsage());
}

const HARNESS_PATHS = ['.claude/', '.kiro/'];
const DENY = ['.kiro/specs', '.kiro/docs', 'canonical/', 'ballot', 'Peter', 'RELEASE-FLOW', 'complete-task.sh', 'governance/'];

// ---------------------------------------------------------------------------

describe('the starter-spec set (Req 16.1, 16.2)', () => {
  it('exactly two starter specs ship', () => {
    const dirs = fs.readdirSync(ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
    expect(dirs).toEqual(SPEC_DIRS);
  });

  it.each(FILES)('%s exists', (f) => {
    expect(fs.existsSync(path.join(ROOT, f))).toBe(true);
  });
});

describe('the CI-needs spec (criterion 1, C6; Req 17.1–17.4; design C25)', () => {
  const needsText = read('ci-needs/needs.md');
  const needs = parseNeeds(needsText);

  it('declares at least one need', () => {
    expect(needs.length).toBeGreaterThan(0);
  });

  it('every need carries a tier, a bite recipe and a two-sided price line (and a check and a why)', () => {
    expect(needs.flatMap(needProblems)).toEqual([]);
  });

  it('"committed platform output matches `generate`" is a minimal-core need (C25)', () => {
    const n = needs.find((x) => x.title === MANDATED_NEED);
    expect(n).toBeDefined();
    expect(n!.fields['Tier']).toBe('minimal core');
  });

  it('the recorded need count equals the parsed needs, by tier', () => {
    const rec = recordedCount(needsText);
    expect(rec.total).toBe(needs.length);
    expect(rec.core).toBe(needs.filter((n) => n.fields['Tier'] === 'minimal core').length);
    expect(rec.optional).toBe(needs.filter((n) => n.fields['Tier'] === 'optional hardening').length);
  });

  it('the tasks arm every adopted need: a task requires the bite recipe to go red in CI', () => {
    const ts = tasks(read('ci-needs/tasks.md'));
    expect(ts.some((t) => /bite recipe/.test(t) && /goes red/.test(t) && /in your CI/.test(t))).toBe(true);
  });

  it('bite: the need checker flags a need missing any one of the three', () => {
    const ok: Need = { id: 'N9', title: 't', fields: { Tier: 'minimal core', Why: 'w', Check: 'c', 'Bite recipe': 'x. The check goes red. Revert.', Price: 'skip it, a; adopt it, b' } };
    expect(needProblems(ok)).toEqual([]);
    expect(needProblems({ ...ok, fields: { ...ok.fields, Tier: 'core' } })).toEqual(['N9: tier']);
    expect(needProblems({ ...ok, fields: { ...ok.fields, 'Bite recipe': 'x.' } })).toEqual(['N9: bite recipe']);
    expect(needProblems({ ...ok, fields: { ...ok.fields, Price: 'skip it, a' } })).toEqual(['N9: two-sided price']);
  });
});

describe('the re-grounding spec (criterion 2; Req 16.1, 24.1, 24.1b, 11.2)', () => {
  const text = read('regrounding/tasks.md');
  const ts = tasks(text);

  it('its tasks include the report of what did not transfer', () => {
    expect(ts.some((t) => /did not transfer/.test(t) && /specs\/regrounding\/report\.md/.test(t))).toBe(true);
  });

  it('it assigns spec-formalization work (Req 24.1, beat 1)', () => {
    expect(ts.some((t) => /Formalize one real spec/.test(t) && /specs\/<name>\//.test(t))).toBe(true);
  });

  it('the claims check is Stacy’s, after the formalization, with the closed negative form (Req 24.1b, beat 2)', () => {
    const t = ts.find((x) => /Stacy/.test(x) && /claims/.test(x));
    expect(t).toBeDefined();
    expect(t).toMatch(/not Thurgood/);
    expect(t).toMatch(/not exercised — no spec was produced/);
  });

  it('dispositions are the closed vocabulary, and the rejected term is absent (Req 11.2)', () => {
    for (const d of ['re-pointed', 'superseded-by', 'no-consumer-counterpart']) expect(text).toContain(`**${d}**`);
    expect(text).not.toMatch(/repo-bound-in-entirety/);
  });
});

describe.each(FILES)('%s — vocabulary, harness-agnostic, no repo-specifics', (f) => {
  const text = read(f);

  it('describes a lifecycle verb only in vocabulary.ts’s words (Req 15B.5)', () => {
    expect(vocabularyDrift(text)).toEqual([]);
  });

  it('never names `attach` without its object', () => {
    expect(attachWithoutObject(text)).toBe(false);
  });

  it('names both harnesses’ paths, or neither (P5)', () => {
    const named = HARNESS_PATHS.filter((h) => text.includes(h));
    expect([0, HARNESS_PATHS.length]).toContain(named.length);
  });

  it('carries no repo-specifics from the deny-list (Req 11.3 (i))', () => {
    expect(DENY.filter((d) => text.includes(d))).toEqual([]);
  });
});

describe('vocabulary checker bites', () => {
  it('flags a drifted description and a bare attach', () => {
    expect(vocabularyDrift('- `sync`: writes your files.')).toHaveLength(1);
    expect(vocabularyDrift('- `sync`: reports package updates against the installed package — reports, never writes silently.')).toEqual([]);
    expect(attachWithoutObject('run attach')).toBe(true);
    expect(attachWithoutObject(`run ${attachUsage()}`)).toBe(false);
  });
});
