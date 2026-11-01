/**
 * @category evergreen
 * @purpose Spec 123 Task 23 (Req 20; design C28): the audience-banner presence guard.
 * Asserts `predicate-match ⇒ banner-present` over `governance/*.md` and reports
 * `N match; N carry`. The claim is scoped to the predicate — predicate coverage, never
 * "the corpus is bannered" (Req 20.3).
 *
 * PENDING MECHANISM (23.1 → 23.2, now empty): until 23.2 landed the banners the real corpus was
 * red by construction (every matched doc lacked one). Task 19's form: one `test.failing` entry per
 * doc on a named list (`PENDING_UNTIL_23_2`), each flipped to a plain test as its banner landed, so
 * the suite stayed green on the branch and a banner that landed without its flip turned red
 * ("expected to fail but passed"). 23.2 flipped all 18; the list is empty and the mechanism stays.
 * The guard test `every matched doc not on the pending list carries a banner` is the live presence
 * check; an unlisted missing banner is red at once.
 *
 * THE DECLARED LIST (Peter's ruling 6 (B), 2026-10-13): `Component-Readiness-Status` and
 * `Component-Quick-Reference` are banded OUTSIDE the predicate. A separate block at the end asserts
 * that the declared two carry a conforming banner. It is the declared list's own check and is NOT
 * predicate coverage: it never enters the `N match; N carry` line.
 *
 * The synthetic bite (a temp corpus: a matching doc without a banner is red, with one is
 * green) runs from 23.1 and is independent of the real corpus. Non-vacuity lives here, not in a
 * CI step: the matched set must be non-empty and must equal what the predicate's printed command
 * returns (v2: the `perl -0777` strip-then-match form; v1 was `grep -lE`).
 *
 * PREDICATE v2 (2026-10-30; ballot 2026-10-30-screen-spec-idiom-per-node, F-1 (α)): dated-pointer
 * spans are taken out before the match. The drift test reads `POINTER_RE` from
 * `scripts/completion-claims/edit-kind-pointers.ts` as TEXT (no import across the two tools) and
 * asserts every span v2 strips begins with a match of it, so the two tools' idea of a pointer
 * cannot part without a red test here.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  BANNER_LABEL,
  BANNER_SUBJECTS,
  KNOWN_UNDER_INCLUSIONS,
  POINTER_SPAN_SOURCE,
  PREDICATE_ERE,
  PREDICATE_PERL_ARGS,
  PREDICATE_STRINGS,
  PREDICATE_VERSION,
  SCAN_SCOPE,
  TRANSFERABLE_MARK,
  WORKED_EXAMPLE_MARK,
  auditBanners,
  formatReport,
  hasBanner,
  listGovernanceDocs,
  matchedDocs,
  matchesPredicate,
  pointerSpans,
  renderBanner,
  stripPointerSpans,
} from '../predicate';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

/**
 * Matched docs whose banner has not landed yet. EMPTY since 23.2: all 18 banners landed and each
 * doc's entry flipped from `test.failing` to a plain test in that change. The mechanism stays so a
 * later pending entry must be declared on this list, not added silently.
 */
const PENDING_UNTIL_23_2: readonly string[] = [];

const SAMPLE_PARTS = {
  subject: 'process',
  workedExample: 'the task branch, the PR flow and the named roles are DesignerPunk\'s.',
  transferable: 'the idea of a merge gate with a recorded ratification step.',
};

function read(rel: string): string {
  return fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8');
}

// ----------------------------------------------------------------------------
// The predicate
// ----------------------------------------------------------------------------

describe('the membership predicate (Ada\'s text, byte-exact)', () => {
  it('is the four strings in Ada\'s order, printed as grep -E prints them', () => {
    expect(PREDICATE_STRINGS).toEqual(['complete-task\\.sh', 'Peter merges', 'RATIFIED', 'ballot']);
    expect(PREDICATE_ERE).toBe('complete-task\\.sh|Peter merges|RATIFIED|ballot');
    expect(SCAN_SCOPE).toBe('governance/*.md');
    expect(PREDICATE_VERSION).toBe(2);
    expect(POINTER_SPAN_SOURCE).toBe('[*]\\((?:added|amended|moved|corrected) \\d{4}-\\d{2}-\\d{2}.*?\\)[*]');
  });

  it.each([
    ['complete-task.sh', 'run ./.kiro/hooks/complete-task.sh now'],
    ['Peter merges', 'then Peter merges on green'],
    ['RATIFIED', 'Status: RATIFIED'],
    ['ballot', 'record the ballot first'],
  ])('matches on %s', (_name, text) => {
    expect(matchesPredicate(text)).toBe(true);
  });

  it('does not match near-misses (the escaped dot, the case of the strings)', () => {
    expect(matchesPredicate('complete-task_sh and complete-taskXsh')).toBe(false);
    expect(matchesPredicate('Ballot, ratified, peter merges')).toBe(false);
    expect(matchesPredicate('')).toBe(false);
  });

  it('reproduces its printed `perl -0777` command over governance/*.md exactly, and is non-vacuous', () => {
    const docs = listGovernanceDocs(REPO_ROOT);
    expect(docs.length).toBeGreaterThan(0);
    const out = execFileSync('perl', [...PREDICATE_PERL_ARGS, ...docs], { cwd: REPO_ROOT, encoding: 'utf8' });
    const perlSet = out.split('\n').filter(Boolean).sort();
    const mine = matchedDocs(REPO_ROOT);
    expect(mine).toEqual(perlSet);
    expect(mine.length).toBeGreaterThan(0);
  });

  it('matches a subset of v1 (`grep -lE` on the four strings): taking spans out only removes matches', () => {
    const docs = listGovernanceDocs(REPO_ROOT);
    let out = '';
    try {
      out = execFileSync('grep', ['-lE', PREDICATE_ERE, ...docs], { cwd: REPO_ROOT, encoding: 'utf8' });
    } catch (e) {
      // grep exits 1 on "no file matched"; anything else is a real failure
      if ((e as { status?: number }).status !== 1) throw e;
    }
    const v1 = new Set(out.split('\n').filter(Boolean));
    expect(matchedDocs(REPO_ROOT).filter((d) => !v1.has(d))).toEqual([]);
  });

  it('prints in its header exactly the command the test runs (header and code cannot part)', () => {
    const source = fs.readFileSync(path.join(__dirname, '..', 'predicate.ts'), 'utf8');
    const printed = source.match(/^ \*     (perl .*)$/m);
    expect(printed).not.toBeNull();
    const built = `perl ${PREDICATE_PERL_ARGS[0]} ${PREDICATE_PERL_ARGS[1]} '${PREDICATE_PERL_ARGS[2]}' ${SCAN_SCOPE}`;
    expect(printed![1]).toBe(built);
  });

  it('does not count a dated-pointer span, in any case of its verb (v2)', () => {
    expect(matchesPredicate('text *(added 2026-10-30 by ballot 2026-10-30-x, site F-C.1)* text')).toBe(false);
    expect(matchesPredicate('*(Amended 2026-10-25 by ballot 2026-10-25-x, item 1; prior text at `1eced6cd5`)*')).toBe(false);
    expect(matchesPredicate('*(moved 2026-10-25 from Core Goals by ballot 2026-10-25-x, item 1; prior home `a.md` L1–2 at `1eced6cd5`.)*')).toBe(false);
    expect(matchesPredicate('*(corrected 2026-10-29: the date; .kiro/issues/x.md; prior text at `abc`)*')).toBe(false);
  });

  it('still counts a ballot citation, which is not a pointer (README L31)', () => {
    expect(matchesPredicate('a rule *(ballot 2026-10-17-standing-write-scope-six-roots)* here')).toBe(true);
    expect(matchesPredicate('*(Ballot 2026-10-18-governance-edit-kinds.)*')).toBe(false); // the case of "ballot" is v1's: a capitalised Ballot never matched
    expect(matchesPredicate('as ratified by ballot 2026-10-18-x')).toBe(true);
  });

  it('a span ends at the first )* on its line, so the body after it still counts', () => {
    expect(matchesPredicate('*(added 2026-10-30 by ballot x, site 1)* then Peter merges it')).toBe(true);
    expect(stripPointerSpans('a *(added 2026-10-30 by ballot x)* b *(ballot y)*')).toBe('a  b *(ballot y)*');
  });

  it('a pointer whose )* is on a later line is not a span, and its words count (one-line spans)', () => {
    expect(pointerSpans('*(added 2026-10-30 by\nballot x, site 1)*')).toEqual([]);
    expect(matchesPredicate('*(added 2026-10-30 by\nballot x, site 1)*')).toBe(true);
  });

  it('the fourth limit, as declared: free text inside a span is not read', () => {
    // a corrected pointer's <what> is free text; authority written there is hidden from v2
    expect(matchesPredicate('*(corrected 2026-10-29: Peter merges this now; .kiro/issues/x.md; prior text at `abc`)*')).toBe(false);
  });

  it('matches none of governance/Token-Family-*.md (Ada A5: 0 of the Token-Family docs)', () => {
    const family = listGovernanceDocs(REPO_ROOT).filter((d) => path.basename(d).startsWith('Token-Family-'));
    expect(family.length).toBeGreaterThan(0);
    expect(family.filter((d) => matchesPredicate(read(d)))).toEqual([]);
  });

  it('scans only regular .md files directly under governance/ (the scope the glob names)', () => {
    const docs = listGovernanceDocs(REPO_ROOT);
    expect(docs.every((d) => /^governance\/[^/]+\.md$/.test(d))).toBe(true);
  });
});

describe('drift: every span v2 strips is a pointer to edit-kind-pointers.ts (POINTER_RE, read as text)', () => {
  const ekp = fs.readFileSync(path.join(REPO_ROOT, 'scripts', 'completion-claims', 'edit-kind-pointers.ts'), 'utf8');
  const literal = ekp.match(/^export const POINTER_RE = \/(.+)\/([a-z]*);$/m);

  it('finds POINTER_RE as a regex literal in edit-kind-pointers.ts', () => {
    expect(literal).not.toBeNull();
  });

  const startsWithPointer = (span: string): boolean => {
    const re = new RegExp(literal![1], literal![2]);
    const m = re.exec(span);
    return m !== null && m.index === 0;
  };

  it('every span in the real corpus begins with a POINTER_RE match, and the corpus has spans', () => {
    const spans = listGovernanceDocs(REPO_ROOT).flatMap((rel) => pointerSpans(read(rel)));
    expect(spans.length).toBeGreaterThan(0);
    expect(spans.filter((s) => !startsWithPointer(s))).toEqual([]);
  });

  it.each([
    ['*(added 2026-10-30 by ballot x, site 1)*'],
    ['*(Amended 2026-10-25 by ballot x, item 1; prior text at `abc`)*'],
    ['*(moved 2026-10-25 from Core Goals by ballot x, item 1; prior home `a.md` L1–2 at `abc`.)*'],
    ['*(Corrected 2026-10-29: what; .kiro/issues/x.md; prior text at `abc`)*'],
  ])('the four verbs, in either case: %s', (text) => {
    const spans = pointerSpans(text);
    expect(spans).toEqual([text]);
    expect(startsWithPointer(spans[0])).toBe(true);
  });
});

describe('the under-inclusion limit is declared in the convention\'s own text (Req 20.3)', () => {
  // comment stars and line wraps collapsed, so a sentence wrapped in the header still matches
  const source = fs
    .readFileSync(path.join(__dirname, '..', 'predicate.ts'), 'utf8')
    .replace(/\n\s*\*\s?/g, ' ')
    .replace(/\s+/g, ' ');

  it('carries the limit sentence, the scoped-claim sentence and the status-quo direction', () => {
    expect(source).toContain('UNDER-INCLUSION LIMIT');
    expect(source).toContain('LEXICAL DENY-LIST');
    expect(source).toContain('NONE of them');
    expect(source).toContain('THE GUARD\'S CLAIM IS SCOPED TO THE PREDICATE');
    expect(source).toContain('a stewardship cadence');
    expect(source).toContain('A FOURTH LIMIT, v2\'s own: text INSIDE a dated-pointer span is not read');
  });

  it('names the known under-inclusions in its header, and each really is unmatched', () => {
    expect([...KNOWN_UNDER_INCLUSIONS]).toEqual([
      'governance/Component-Readiness-Status.md',
      'governance/Component-Quick-Reference.md',
    ]);
    for (const rel of KNOWN_UNDER_INCLUSIONS) {
      expect(source).toContain(path.basename(rel, '.md'));
    }
    // KNOWN_UNDER_INCLUSIONS is in the header by reference; the two names also appear in the source
    expect(source).toContain('Component-Readiness-Status');
    expect(source).toContain('Component-Quick-Reference');
    for (const rel of KNOWN_UNDER_INCLUSIONS) {
      expect(fs.existsSync(path.join(REPO_ROOT, rel))).toBe(true);
      // a name that starts matching is stale: remove it and edit the header
      expect(matchesPredicate(read(rel))).toBe(false);
    }
  });
});

// ----------------------------------------------------------------------------
// The banner template and its recogniser
// ----------------------------------------------------------------------------

describe('the banner template and hasBanner', () => {
  const doc = (preamble: string): string =>
    ['---', 'id: x', '---', '', '# Title', '', preamble, '', '## Overview', '', 'body'].join('\n');

  it('renders a one-line blockquote with the label, the subject, and both parts', () => {
    const banner = renderBanner(SAMPLE_PARTS);
    expect(banner.startsWith(BANNER_LABEL)).toBe(true);
    expect(banner).not.toContain('\n');
    expect(banner).toContain('**DesignerPunk\'s own process**');
    expect(banner).toContain(WORKED_EXAMPLE_MARK);
    expect(banner).toContain(TRANSFERABLE_MARK);
  });

  it.each(BANNER_SUBJECTS)('covers the subject "%s" (Req 20.7: components, not only process)', (subject) => {
    expect(hasBanner(doc(renderBanner({ ...SAMPLE_PARTS, subject })))).toBe(true);
  });

  it('refuses a subject outside the vocabulary and empty parts', () => {
    expect(() => renderBanner({ ...SAMPLE_PARTS, subject: 'tokens' })).toThrow(/subject/);
    expect(() => renderBanner({ ...SAMPLE_PARTS, workedExample: '  ' })).toThrow(/required/);
    expect(() => renderBanner({ ...SAMPLE_PARTS, transferable: '' })).toThrow(/required/);
  });

  it('accepts the same text wrapped over consecutive blockquote lines', () => {
    const wrapped = renderBanner(SAMPLE_PARTS)
      .replace(` ${WORKED_EXAMPLE_MARK}`, `\n> ${WORKED_EXAMPLE_MARK}`)
      .replace(` ${TRANSFERABLE_MARK}`, `\n> ${TRANSFERABLE_MARK}`);
    expect(wrapped.split('\n').length).toBe(3);
    expect(hasBanner(doc(wrapped))).toBe(true);
  });

  it('is false without a banner, and for a label that is not in the preamble (prose ABOUT banners)', () => {
    expect(hasBanner(doc('plain prose'))).toBe(false);
    const lateLabel = ['# Title', '', '## Overview', '', renderBanner(SAMPLE_PARTS)].join('\n');
    expect(hasBanner(lateLabel)).toBe(false);
  });

  it('is false for a banner missing a required part (the present-but-empty cases)', () => {
    const oldStyle =
      '> **Audience framing**: this documents **DesignerPunk\'s own** release process. Consumers read it as a worked example.';
    expect(hasBanner(doc(oldStyle))).toBe(false);
    expect(hasBanner(doc(`${BANNER_LABEL} this describes **DesignerPunk's own process**. ${WORKED_EXAMPLE_MARK} only this.`))).toBe(false);
    expect(
      hasBanner(doc(`${BANNER_LABEL} this describes **DesignerPunk's own process**. ${WORKED_EXAMPLE_MARK} ${TRANSFERABLE_MARK} x`))
    ).toBe(false);
    expect(
      hasBanner(doc(`${BANNER_LABEL} this describes **DesignerPunk's own process**. ${TRANSFERABLE_MARK} t ${WORKED_EXAMPLE_MARK} w`))
    ).toBe(false);
    expect(hasBanner(doc(`${BANNER_LABEL} ${WORKED_EXAMPLE_MARK} w ${TRANSFERABLE_MARK} t`))).toBe(false);
  });
});

// ----------------------------------------------------------------------------
// The synthetic bite: a fixture corpus, independent of the real one
// ----------------------------------------------------------------------------

describe('the guard bites on a synthetic corpus (two-sided)', () => {
  let root: string;
  const put = (name: string, body: string): void => {
    fs.writeFileSync(path.join(root, 'governance', name), body);
  };

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'audience-banner-'));
    fs.mkdirSync(path.join(root, 'governance'));
    put('Matches-NoBanner.md', '# Matches\n\nPeter merges on green.\n\n## Overview\n');
    put('Matches-Bannered.md', `# Matches\n\n${renderBanner(SAMPLE_PARTS)}\n\nA ballot decides.\n\n## Overview\n`);
    put('Unrelated.md', '# Unrelated\n\nNothing repo-internal here.\n');
  });

  afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

  it('RED: a matching doc with no banner is reported missing and the report says so', () => {
    const audit = auditBanners(root);
    expect(audit.scanned).toBe(3);
    expect(audit.matched).toEqual(['governance/Matches-Bannered.md', 'governance/Matches-NoBanner.md']);
    expect(audit.carrying).toEqual(['governance/Matches-Bannered.md']);
    expect(audit.missing).toEqual(['governance/Matches-NoBanner.md']);
    const report = formatReport(audit);
    expect(report[0]).toMatch(/2 match; 1 carry$/);
    expect(report).toContain('  [MISSING] governance/Matches-NoBanner.md');
  });

  it('GREEN: adding the banner clears the finding (and an unmatched doc without one is not a finding)', () => {
    put('Matches-NoBanner.md', `# Matches\n\n${renderBanner(SAMPLE_PARTS)}\n\nPeter merges on green.\n`);
    const audit = auditBanners(root);
    expect(audit.missing).toEqual([]);
    expect(formatReport(audit)[0]).toMatch(/2 match; 2 carry$/);
    expect(audit.matched).not.toContain('governance/Unrelated.md');
  });

  it('a doc whose banner exists but lacks a required part is still missing (presence of the template, not of the label)', () => {
    put('Matches-NoBanner.md', '# Matches\n\n> **Audience framing**: DesignerPunk\'s own process.\n\nPeter merges.\n');
    expect(auditBanners(root).missing).toEqual(['governance/Matches-NoBanner.md']);
  });
});

// ----------------------------------------------------------------------------
// The real corpus
// ----------------------------------------------------------------------------

describe('the real corpus: predicate-match ⇒ banner-present', () => {
  const audit = auditBanners(REPO_ROOT);
  const matched = matchedDocs(REPO_ROOT);

  beforeAll(() => {
    // The scoped line and the per-doc list, once, for the CI log and the completion docs.
    // eslint-disable-next-line no-console
    console.log(formatReport(audit).join('\n'));
  });

  it('reports the scoped line "N match; N carry" and never claims the corpus is bannered', () => {
    const report = formatReport(audit);
    expect(report[0]).toMatch(/^audience-banner guard — predicate v2 coverage over governance\/\*\.md \(\d+ scanned\): \d+ match; \d+ carry$/);
    expect(report.join('\n')).not.toMatch(/corpus is bannered|corpus is covered/i);
    expect(report.length).toBe(1 + audit.matched.length);
    expect(audit.matched.length).toBeGreaterThan(0);
  });

  it('the pending list is sorted, unique, and names only docs the predicate still matches', () => {
    expect([...PENDING_UNTIL_23_2]).toEqual([...new Set(PENDING_UNTIL_23_2)].sort());
    for (const rel of PENDING_UNTIL_23_2) expect(matched).toContain(rel);
  });

  it('every matched doc not on the pending list carries a banner (the live guard)', () => {
    const pending = new Set(PENDING_UNTIL_23_2);
    expect(audit.missing.filter((rel) => !pending.has(rel))).toEqual([]);
  });

  // One entry per matched doc. Pending docs are `test.failing`: red by construction until their
  // banner lands; the entry flips (and leaves the list) in the same commit as the banner.
  for (const rel of matched) {
    const run = PENDING_UNTIL_23_2.includes(rel) ? test.failing : test;
    const label = PENDING_UNTIL_23_2.includes(rel) ? `[pending 23.2: ${rel}]` : rel;
    run(`${label} carries a conforming audience banner`, () => {
      expect(hasBanner(read(rel))).toBe(true);
    });
  }
});

// ----------------------------------------------------------------------------
// The declared list (outside the predicate; NOT predicate coverage)
// ----------------------------------------------------------------------------

describe('the declared list banded outside the predicate (Ruling 6 (B); not predicate coverage)', () => {
  for (const rel of KNOWN_UNDER_INCLUSIONS) {
    it(`${rel} (declared, not matched) carries a conforming audience banner`, () => {
      expect(matchesPredicate(read(rel))).toBe(false);
      expect(hasBanner(read(rel))).toBe(true);
    });
  }
});
