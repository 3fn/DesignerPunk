/**
 * P-1 — audience banners reach a reference-mode agent on the summary-first path.
 *
 * Finding: `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4c P-1 (evidence
 * `.kiro/specs/123-consumer-distribution/validation/probe-rerun.md`): `get_document_summary`
 * carried metadata + outline only, so the banner in a doc's preamble never reached an agent that
 * fetched by summary. Ruled vehicle (release-4 rulings item 14): the banner in the summary payload.
 *
 * Before the fix the summary has no `audienceBanner`, so the corpus and fixture assertions fail.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { BANNER_LABEL, extractAudienceBanner } from '../audience-banner';
import { DocumentIndexer } from '../DocumentIndexer';

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
