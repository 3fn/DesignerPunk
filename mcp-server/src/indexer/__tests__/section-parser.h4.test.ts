/**
 * P-4 — `####` sections are fetchable, and SectionNotFound suggestions can reach them.
 *
 * Finding: `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4c P-4 (home:
 * `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`): the parser indexed `##`/`###` only, so
 * get_section("No Disabled States — Standardized Exclusion") on Component-Templates returned
 * SectionNotFound, and the suggestions listed H2 only — INSTALL's "retry using the `suggestions`
 * field" could not work (probe-rerun.md, session A).
 *
 * Contract held: H2/H3 ids do not move (H4s are `s{c}.{k}`, outside the `s{index}` count), and
 * every lookup that resolved before resolves the same way (an H4 is reached only where the lookup
 * was SectionNotFound).
 *
 * Before the fix: the H4-resolution, sectionId, ambiguity, suggestion and corpus cases fail.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { parseHeadingTree, resolveSection } from '../section-parser';
import { DocumentIndexer } from '../DocumentIndexer';

const DOC = [
  '# Guide',
  '',
  '## Contracts', //                 s0
  '',
  '### State Contracts', //          s1
  '',
  '#### Error State Contract', //    s1.1
  'Error body.',
  '',
  '#### Example', //                 s1.2
  'State example.',
  '',
  '### Interaction Contracts', //    s2
  '',
  '#### Example', //                 s2.1
  'Interaction example.',
  '',
  '#### Interaction Contracts', //   s2.2 (same text as its H3 container)
  'Shadowed.',
  '',
  '```markdown',
  '#### Fenced Template H4',
  '```',
  '',
  '## Next', //                      s3
  'Done.',
].join('\n');

function section(opts: { heading?: string; parent?: string; sectionId?: string }) {
  const r = resolveSection(DOC, 'guide.md', opts);
  if (r.kind !== 'section') throw new Error(`expected a section, got ${r.kind}`);
  return r.section;
}

describe('P-4: get_section fetches a #### section', () => {
  it('by heading: content runs to the next heading of the same or higher level', () => {
    const s = section({ heading: 'Error State Contract' });
    expect(s.content).toBe(['#### Error State Contract', 'Error body.', ''].join('\n'));
    expect(s.parentHeadings).toEqual(['State Contracts']);
    expect(s.sectionId).toBe('s1.1');
    expect(s.siblingHeadings).toEqual(['Example']);
  });

  it('by its sectionId', () => {
    expect(section({ sectionId: 's2.1' }).content).toContain('Interaction example.');
  });

  it('a repeated H4 is ambiguous, and parent disambiguates it', () => {
    const r = resolveSection(DOC, 'guide.md', { heading: 'Example' });
    expect(r.kind).toBe('ambiguous');
    if (r.kind === 'ambiguous') {
      expect(r.candidates.map((c) => [c.sectionId, c.parent])).toEqual([
        ['s1.2', 'State Contracts'],
        ['s2.1', 'Interaction Contracts'],
      ]);
    }
    expect(section({ heading: 'Example', parent: 'Interaction Contracts' }).sectionId).toBe('s2.1');
  });
});

describe('P-4 contract: no H2/H3 id moves, no prior lookup changes', () => {
  it('H2/H3 keep the s{index} sequence; H4s sit outside it; a fenced #### is not a node', () => {
    const ids = parseHeadingTree(DOC).map((n) => [n.heading, (n as { sectionId?: string }).sectionId ?? `s${n.index}`]);
    expect(ids.filter(([h]) => ['Contracts', 'State Contracts', 'Interaction Contracts', 'Next'].includes(h))
      .slice(0, 4)).toEqual([
      ['Contracts', 's0'],
      ['State Contracts', 's1'],
      ['Interaction Contracts', 's2'],
      ['Interaction Contracts', 's2.2'],
    ]);
    expect(ids.map(([h]) => h)).not.toContain('Fenced Template H4');
    expect(section({ sectionId: 's3' }).heading).toBe('Next');
  });

  it('an H3 still wins over an H4 of the same text, with its pre-fix content', () => {
    const s = section({ heading: 'Interaction Contracts' });
    expect(s.sectionId).toBe('s2');
    expect(s.content).toContain('Shadowed.');
  });
});

describe('P-4: SectionNotFound suggestions reach an H4', () => {
  let dir: string;
  let ix: DocumentIndexer;

  beforeAll(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'p4-h4-'));
    const fm = ['---', 'id: guide', 'inclusion: manual', '---', ''].join('\n');
    fs.writeFileSync(path.join(dir, 'Guide.md'), fm + DOC + '\n');
    ix = new DocumentIndexer(path.join(dir, 'logs'));
    await ix.indexDirectory(dir);
  });

  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  function suggestionsFor(heading: string): string[] {
    try {
      ix.getSectionAddressed('guide', { heading });
    } catch (e) {
      return (e as { availableHeadings: string[] }).availableHeadings;
    }
    throw new Error('expected SectionNotFound');
  }

  it('a near miss lists the H2s first (unchanged), then the matching deep headings', () => {
    // 'Error Contract' shares 'error' and 'contract' with the H4 (whole words, no stemming).
    expect(suggestionsFor('Error Contract')).toEqual(['Contracts', 'Next', 'Error State Contract']);
    expect(suggestionsFor('Interaction Example')).toEqual(['Contracts', 'Next', 'Example', 'Interaction Contracts']);
  });

  it('a request that resembles no deep heading gets exactly the H2 list (pre-fix payload)', () => {
    expect(suggestionsFor('Zebra')).toEqual(['Contracts', 'Next']);
  });
});

describe('P-4 on the served corpus (the probe-rerun case)', () => {
  it('Component-Templates "No Disabled States — Standardized Exclusion" resolves', async () => {
    const ix = new DocumentIndexer(fs.mkdtempSync(path.join(os.tmpdir(), 'p4-corpus-')));
    const governance = path.resolve(__dirname, '../../../../governance');
    await ix.indexDirectory(governance);
    const s = ix.getSectionAddressed(path.join(governance, 'Component-Templates.md'), { heading: 'No Disabled States — Standardized Exclusion' });
    expect(s.content.startsWith('#### No Disabled States — Standardized Exclusion')).toBe(true);
  });
});
