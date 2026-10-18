/**
 * C-2 — get_section and fenced markdown templates.
 *
 * Finding: `.kiro/issues/2026-10-15-123-u5-instrument-findings.md` § 4a C-2 (homes:
 * `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md` row 13,
 * `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`): `get_section` returned only the
 * heading and the opening of a fenced template, and the template's own `##` headings were listed
 * as siblings (and became parents of the real headings after them).
 *
 * Contract held: no section id moves (fenced headings keep their place in the `s{index}` count),
 * and a fenced heading stays reachable as a fallback with its pre-fix payload.
 *
 * Before the fix: the "runs through the template", "siblings", "parent" and "real wins" cases fail.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseHeadingTree, resolveSection } from '../section-parser';

const DOC = [
  '# Guide', //                                0
  '',
  '## Templates', //                           2  s0
  '',
  'Copy this:',
  '',
  '```markdown', //                            6
  '# Task N Completion',
  '## Artifacts Created', //                   8  s1 (fenced)
  '- file',
  '### Approach', //                           10 s2 (fenced)
  '```', //                                    11
  '',
  '### After the template', //                 13 s3
  '',
  'Real prose.',
  '',
  '### Approach', //                           17 s4 (real twin of a fenced heading)
  '',
  'The real approach.',
  '',
  '## Next', //                                21 s5
  '',
  'Done.',
].join('\n');

function section(opts: { heading?: string; parent?: string; sectionId?: string }) {
  const r = resolveSection(DOC, 'guide.md', opts);
  if (r.kind !== 'section') throw new Error(`expected a section, got ${r.kind}`);
  return r.section;
}

describe('C-2: a real section runs through the fenced template it contains', () => {
  it('get_section("Templates") returns the whole section, up to the next real ## heading', () => {
    const s = section({ heading: 'Templates' });
    expect(s.content).toContain('## Artifacts Created');
    expect(s.content).toContain('### After the template');
    expect(s.content).toContain('The real approach.');
    expect(s.content).not.toContain('## Next');
  });

  it('the template headings are not listed as siblings', () => {
    expect(section({ heading: 'Templates' }).siblingHeadings).toEqual(['Next']);
    expect(section({ heading: 'After the template' }).siblingHeadings).toEqual(['Approach']);
  });

  it('a template heading is never the parent of a real heading after it', () => {
    expect(section({ heading: 'After the template' }).parentHeadings).toEqual(['Templates']);
  });

  it('a real heading wins over a fenced heading of the same text (was ambiguous)', () => {
    const s = section({ heading: 'Approach' });
    expect(s.sectionId).toBe('s4');
    expect(s.content).toContain('The real approach.');
  });
});

describe('C-2 contract: ids do not move, fenced headings stay reachable unchanged', () => {
  it('every heading line keeps its positional id, fenced ones included', () => {
    expect(parseHeadingTree(DOC).map((n) => [n.heading, `s${n.index}`, Boolean((n as { inFence?: boolean }).inFence)])).toEqual([
      ['Templates', 's0', false],
      ['Artifacts Created', 's1', true],
      ['Approach', 's2', true],
      ['After the template', 's3', false],
      ['Approach', 's4', false],
      ['Next', 's5', false],
    ]);
    expect(section({ sectionId: 's5' }).heading).toBe('Next');
  });

  it('a heading found only inside a fence resolves as before (fallback, pre-fix boundary)', () => {
    const s = section({ heading: 'Artifacts Created' });
    expect(s.sectionId).toBe('s1');
    // Pre-fix boundary: runs to the next heading of the same or higher level, fenced or not.
    expect(s.content.startsWith('## Artifacts Created\n- file')).toBe(true);
    expect(s.content).not.toContain('## Next');
    expect(s.parentHeadings).toEqual([]);
  });

  it("a fenced heading's own sectionId still resolves", () => {
    expect(section({ sectionId: 's2' }).heading).toBe('Approach');
  });
});

describe('C-2 on the served corpus (completion-documentation-guide)', () => {
  const file = path.resolve(__dirname, '../../../../governance/completion-documentation-guide.md');
  const content = fs.readFileSync(file, 'utf8');

  it('"Document Templates" carries both of its templates, not just the first one\'s opening', () => {
    const r = resolveSection(content, file, { heading: 'Document Templates' });
    expect(r.kind).toBe('section');
    if (r.kind !== 'section') return;
    expect(r.section.content).toContain('## Artifacts Created');
    expect(r.section.content).toContain('### Summary Document Template');
    expect(r.section.siblingHeadings).not.toContain('Artifacts Created');
    expect(r.section.siblingHeadings).not.toContain('Found later');
  });
});
