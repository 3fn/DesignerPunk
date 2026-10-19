/**
 * P-1 — audience banners reach a reference-mode agent on the summary-first path.
 *
 * Finding: `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4c P-1 (evidence
 * `.kiro/specs/123-consumer-distribution/validation/probe-rerun.md`): `get_document_summary`
 * carried metadata + outline only, so the banner in a doc's preamble never reached an agent that
 * fetched by summary. Ruled vehicle (release-4 rulings item 14): the banner in the summary payload.
 *
 * Before the fix the summary has no `audienceBanner`, so the corpus and fixture assertions fail.
 *
 * Second half (Peter, 2026-10-18 — the P-1 fork ruled "Yes"): a direct `get_section` carries the same
 * `audienceBanner` on its `section` payload — bannered docs only, every id form, never on a miss.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { BANNER_LABEL, extractAudienceBanner } from '../audience-banner';
import { DocumentIndexer } from '../DocumentIndexer';
import { QueryEngine } from '../../query/QueryEngine';
import { formatMcpResponse, handleGetSection, isGetSectionError } from '../../tools/get-section';

const REPO = path.resolve(__dirname, '../../../..');
const GOVERNANCE = path.join(REPO, 'governance');

const BANNER =
  "> **Audience framing**: this describes **DesignerPunk's own process**, not yours. " +
  '**Worked example**: the hooks. **Transferable**: the lessons.';

function doc(id: string, preamble: string): string {
  return [
    '---',
    `id: ${id}`,
    'inclusion: manual',
    '---',
    '',
    `# ${id}`,
    '',
    preamble,
    '',
    '**Date**: 2026-01-01',
    '**Purpose**: fixture',
    '**Organization**: process-standard',
    '**Scope**: cross-project',
    '**Layer**: 2',
    '**Relevant Tasks**: all-tasks',
    '',
    '## Overview',
    '',
    `${BANNER_LABEL} prose below the first heading is about banners, not a banner.`,
    '',
  ].join('\n');
}

describe('extractAudienceBanner', () => {
  it('returns the preamble banner with the blockquote marker stripped', () => {
    expect(extractAudienceBanner(doc('a', BANNER))).toBe(BANNER.replace(/^> /, ''));
  });

  it('joins a banner wrapped over consecutive > lines', () => {
    const wrapped = "> **Audience framing**: this describes **DesignerPunk's own process**,\n> not yours.";
    expect(extractAudienceBanner(doc('b', wrapped))).toBe(
      "**Audience framing**: this describes **DesignerPunk's own process**, not yours.",
    );
  });

  it('ignores a label that appears only below the first ## heading', () => {
    expect(extractAudienceBanner(doc('c', 'No banner here.'))).toBeUndefined();
  });

  it('twin guard: the label is byte-identical to the convention home (scripts/audience-banner/predicate.ts)', () => {
    const home = fs.readFileSync(path.join(REPO, 'scripts/audience-banner/predicate.ts'), 'utf8');
    expect(home).toContain(`export const BANNER_LABEL = '${BANNER_LABEL}';`);
  });
});

describe('get_document_summary carries the banner (P-1)', () => {
  let dir: string;
  let ix: DocumentIndexer;

  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'p1-banner-'));
    fs.writeFileSync(path.join(dir, 'Bannered.md'), doc('bannered', BANNER));
    fs.writeFileSync(path.join(dir, 'Plain.md'), doc('plain', 'No banner here.'));
    ix = new DocumentIndexer(path.join(dir, 'logs'));
    await ix.indexDirectory(dir);
  });

  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('a bannered doc: the summary payload carries audienceBanner', () => {
    expect(ix.getDocumentSummary('bannered').audienceBanner).toBe(BANNER.replace(/^> /, ''));
  });

  it('an unbannered doc: the summary payload has no audienceBanner key (shape unchanged)', () => {
    expect('audienceBanner' in ix.getDocumentSummary('plain')).toBe(false);
  });

  it('served corpus: the probe-rerun re-check doc (process-hook-operations) carries its banner', async () => {
    const live = new DocumentIndexer(path.join(dir, 'logs'));
    await live.indexDirectory(GOVERNANCE);
    const banner = live.getDocumentSummary('process-hook-operations').audienceBanner;
    expect(banner).toBeDefined();
    expect(banner!.startsWith('**Audience framing**:')).toBe(true);
  });
});


/** A bannered doc with an H3, an H4 and a fenced template carrying its own headings. */
function deepDoc(id: string, preamble: string): string {
  return [
    '---',
    `id: ${id}`,
    'inclusion: manual',
    '---',
    '',
    `# ${id}`,
    '',
    preamble,
    '',
    '**Date**: 2026-01-01',
    '**Purpose**: fixture',
    '**Organization**: process-standard',
    '**Scope**: cross-project',
    '**Layer**: 2',
    '**Relevant Tasks**: all-tasks',
    '',
    '## Contracts', //                      s0
    '',
    '### State Contracts', //               s1
    '',
    '#### Error State Contract', //         s1.1
    'Error body.',
    '',
    '## Templates', //                      s2
    '',
    '```markdown',
    '## Artifacts Created', //              s3 (fenced)
    'Template body.',
    '```',
    '',
    '## Next', //                           s4
    'Done.',
    '',
  ].join('\n');
}

describe('get_section carries the banner (P-1, ruled 2026-10-18)', () => {
  let dir: string;
  let ix: DocumentIndexer;
  let qe: QueryEngine;
  const BANNERED = BANNER.replace(/^> /, '');

  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'p1-section-banner-'));
    fs.writeFileSync(path.join(dir, 'Bannered.md'), deepDoc('bannered', BANNER));
    fs.writeFileSync(path.join(dir, 'Plain.md'), deepDoc('plain', 'No banner here.'));
    ix = new DocumentIndexer(path.join(dir, 'logs'));
    await ix.indexDirectory(dir);
    qe = new QueryEngine(ix);
  });

  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('a bannered doc: an H2 section carries the summary\'s exact banner', () => {
    const sec = ix.getSectionAddressed('bannered', { heading: 'Contracts' });
    expect(sec.audienceBanner).toBe(BANNERED);
    expect(sec.audienceBanner).toBe(ix.getDocumentSummary('bannered').audienceBanner);
  });

  it('an unbannered doc: the section has no audienceBanner key (payload unchanged)', () => {
    const sec = ix.getSectionAddressed('plain', { heading: 'Contracts' });
    expect('audienceBanner' in sec).toBe(false);
  });

  it('the banner is the only addition: same section fields, same tokenCount, both docs', () => {
    const withB = ix.getSectionAddressed('bannered', { heading: 'Contracts' });
    const without = ix.getSectionAddressed('plain', { heading: 'Contracts' });
    const { audienceBanner: _b, path: _p1, ...restB } = withB;
    const { path: _p2, ...restP } = without;
    expect(restB).toEqual(restP);
  });

  it('an H4 section (s1.1 id form) on a bannered doc carries it', () => {
    expect(ix.getSectionAddressed('bannered', { heading: 'Error State Contract' }).audienceBanner).toBe(BANNERED);
    expect(ix.getSectionAddressed('bannered', { sectionId: 's1.1' }).audienceBanner).toBe(BANNERED);
  });

  it('a fenced-template heading (fallback resolution) on a bannered doc carries it', () => {
    const sec = ix.getSectionAddressed('bannered', { heading: 'Artifacts Created' });
    expect(sec.content).toContain('Template body.');
    expect(sec.audienceBanner).toBe(BANNERED);
    expect(ix.getSectionAddressed('bannered', { sectionId: 's3' }).audienceBanner).toBe(BANNERED);
  });

  it('through the tool: the MCP payload\'s section carries it, bannered only', () => {
    const on = JSON.parse(formatMcpResponse(handleGetSection(qe, { path: 'bannered', heading: 'Next' })).content[0].text);
    expect(on.section.audienceBanner).toBe(BANNERED);
    const off = JSON.parse(formatMcpResponse(handleGetSection(qe, { path: 'plain', heading: 'Next' })).content[0].text);
    expect('audienceBanner' in off.section).toBe(false);
  });

  it('SectionNotFound and ambiguous responses do not carry it (no section yet)', () => {
    const miss = handleGetSection(qe, { path: 'bannered', heading: 'No Such Heading' });
    expect(isGetSectionError(miss)).toBe(true);
    expect(formatMcpResponse(miss).content[0].text).not.toContain('audienceBanner');
  });

  it('served corpus: process-hook-operations sections equal the summary banner', async () => {
    const live = new DocumentIndexer(path.join(dir, 'logs'));
    await live.indexDirectory(GOVERNANCE);
    const summary = live.getDocumentSummary('process-hook-operations').audienceBanner;
    expect(summary).toBeDefined();
    expect(live.getSectionAddressed('process-hook-operations', { heading: 'Overview' }).audienceBanner).toBe(summary);
  });
});
