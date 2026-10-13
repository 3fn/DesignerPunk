/**
 * @category evergreen
 * @purpose Spec 123 Task 23 (Req 20; design C28): the audience-banner presence guard.
 * Asserts `predicate-match ⇒ banner-present` over `governance/*.md` and reports
 * `N match; N carry`. The claim is scoped to the predicate — predicate coverage, never
 * "the corpus is bannered" (Req 20.3).
 *
 * PENDING MECHANISM (23.1 → 23.2): until 23.2 lands the banners, the real corpus is red by
 * construction (every matched doc lacks one). Task 19's form: one `test.failing` entry per doc on
 * a named list (`PENDING_UNTIL_23_2`), each flipped to a plain test as its banner lands, so the
 * suite stays green on the branch and a banner that lands without its flip turns red ("expected
 * to fail but passed"). The guard test `every matched doc not on the pending list carries a
 * banner` is the live presence check; an unlisted missing banner is red at once.
 *
 * The synthetic bite (a temp corpus: a matching doc without a banner is red, with one is
 * green) runs from 23.1 and is independent of the real corpus. Non-vacuity lives here, not in a
 * CI step: the matched set must be non-empty and must equal what `grep -lE` returns.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  BANNER_LABEL,
  BANNER_SUBJECTS,
  KNOWN_UNDER_INCLUSIONS,
  PREDICATE_ERE,
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
  renderBanner,
} from '../predicate';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');

/**
 * Matched docs whose banner has not landed yet. 23.2 removes each entry in the same commit as
 * its banner (and flips the doc's entry below from `test.failing` to a plain test). Empty by 23.2's close.
 */
const PENDING_UNTIL_23_2: readonly string[] = [
  'governance/AI-Collaboration-Framework.md',
  'governance/Component-Development-Guide.md',
  'governance/Component-Development-Standards.md',
  'governance/Component-Meta-Data-Shapes-Governance.md',
  'governance/Contract-System-Reference.md',
  'governance/MCP-Evolution-Roadmap.md',
  'governance/MCP-Relationship-Model.md',
  'governance/Process-Development-Workflow.md',
  'governance/Process-File-Organization.md',
  'governance/Process-Hook-Operations.md',
  'governance/Process-Orchestration-Model-Selection.md',
  'governance/Process-Spec-Planning.md',
  'governance/Process-Task-Type-Definitions.md',
  'governance/Test-Behavioral-Contract-Validation.md',
  'governance/classification-map.md',
  'governance/completion-documentation-guide.md',
  'governance/component-meta-authoring-guide.md',
  'governance/release-management-system.md',
];

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
    expect(PREDICATE_VERSION).toBe(1);
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

  it('reproduces `grep -lE` over governance/*.md exactly, and is non-vacuous', () => {
    const docs = listGovernanceDocs(REPO_ROOT);
    expect(docs.length).toBeGreaterThan(0);
    let out = '';
    try {
      out = execFileSync('grep', ['-lE', PREDICATE_ERE, ...docs], { cwd: REPO_ROOT, encoding: 'utf8' });
    } catch (e) {
      // grep exits 1 on "no file matched"; anything else is a real failure
      if ((e as { status?: number }).status !== 1) throw e;
    }
    const grepSet = out.split('\n').filter(Boolean).sort();
    const mine = matchedDocs(REPO_ROOT);
    expect(mine).toEqual(grepSet);
    expect(mine.length).toBeGreaterThan(0);
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
    expect(report[0]).toMatch(/^audience-banner guard — predicate v1 coverage over governance\/\*\.md \(\d+ scanned\): \d+ match; \d+ carry$/);
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
