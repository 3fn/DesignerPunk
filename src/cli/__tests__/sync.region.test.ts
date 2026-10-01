/**
 * @category evergreen
 * @purpose Spec 123 Task 16.4 — region grain: `extractRegion` and `spliceRegion`
 * over a DesignerPunk-managed marker region (design.md § "C7" — `CLAUDE.md` /
 * `.gitignore` "marker region"; tasks.md Task 16's "Region grain" success
 * criterion: "the `CLAUDE.md` region is spliced; outside bytes unchanged;
 * missing markers → string, no write").
 *
 * Both functions are pure (no filesystem access) — see `RegionGrain.ts`'s
 * module docstring for the grain definition (first-pair-wins on nested or
 * duplicate markers; CRLF/LF detected from outside bytes).
 */

import {
  extractRegion,
  spliceRegion,
  regionMarkers,
  CLAUDE_MD_COMMENT,
  GITIGNORE_COMMENT,
  type RegionMarkers,
} from '../sync/RegionGrain';
import { managedRegionMarkersMissingMessage } from '../shared/errorCatalog';

const CLAUDE_MARKERS = regionMarkers(CLAUDE_MD_COMMENT);

describe('RegionGrain — regionMarkers (comment syntax as a parameter)', () => {
  test('CLAUDE.md: HTML-style wrapping comment', () => {
    expect(regionMarkers(CLAUDE_MD_COMMENT)).toEqual<RegionMarkers>({
      begin: '<!-- designerpunk:managed:begin -->',
      end: '<!-- designerpunk:managed:end -->',
    });
  });

  test('.gitignore: line comment, no closer', () => {
    expect(regionMarkers(GITIGNORE_COMMENT)).toEqual<RegionMarkers>({
      begin: '# designerpunk:managed:begin',
      end: '# designerpunk:managed:end',
    });
  });
});

describe('RegionGrain — extractRegion', () => {
  test('finds the region; before + region + after reassembles the original text exactly', () => {
    const text =
      'first line\n' +
      'second line\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      '@.claude/identity/designerpunk-personal-note.md\n' +
      '@.claude/identity/designerpunk-core-goals.md\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'trailing line\n';

    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;

    expect(result.region).toBe('@.claude/identity/designerpunk-personal-note.md\n@.claude/identity/designerpunk-core-goals.md\n');
    expect(result.before + result.region + result.after).toBe(text);
    expect(result.before.endsWith('<!-- designerpunk:managed:begin -->\n')).toBe(true);
    expect(result.after.startsWith('<!-- designerpunk:managed:end -->')).toBe(true);
  });

  test('empty region: begin and end on adjacent lines with a blank line between', () => {
    const text = '<!-- designerpunk:managed:begin -->\n\n<!-- designerpunk:managed:end -->\n';
    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;
    // The blank line's own eol is the region's content — reassembly is exact either way.
    expect(result.region).toBe('\n');
    expect(result.before + result.region + result.after).toBe(text);
  });

  test('missing begin marker → not found', () => {
    const text = 'no markers here at all\n<!-- designerpunk:managed:end -->\n';
    expect(extractRegion(text, CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('missing end marker (begin present, unmatched) → not found', () => {
    const text = '<!-- designerpunk:managed:begin -->\nsome content\nno end marker\n';
    expect(extractRegion(text, CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('missing both markers → not found', () => {
    expect(extractRegion('plain file, nothing managed\n', CLAUDE_MARKERS)).toEqual({ found: false });
  });

  test('nested/duplicate markers: the FIRST begin/end pair is matched; a second pair is left in `after`', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' +
      'first region content\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'between the two pairs\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      'second region content\n' +
      '<!-- designerpunk:managed:end -->\n';

    const result = extractRegion(text, CLAUDE_MARKERS);
    expect(result.found).toBe(true);
    if (!result.found) return;
    expect(result.region).toBe('first region content\n');
    // The second pair is untouched, inside `after`.
    expect(result.after).toContain('<!-- designerpunk:managed:begin -->\nsecond region content\n<!-- designerpunk:managed:end -->\n');
    expect(result.before + result.region + result.after).toBe(text);
  });
});

describe('RegionGrain — spliceRegion', () => {
  test('replaces ONLY the region; outside bytes (prefix through begin, end through EOF) are byte-identical', () => {
    const text =
      'Some consumer prose above.\n\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      '@.claude/identity/designerpunk-old.md\n' +
      '<!-- designerpunk:managed:end -->\n\n' +
      'Some consumer prose below.\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, '@.claude/identity/designerpunk-new-1.md\n@.claude/identity/designerpunk-new-2.md', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const prefixEnd = text.indexOf('<!-- designerpunk:managed:begin -->') + CLAUDE_MARKERS.begin.length;
    const suffixStart = text.indexOf('<!-- designerpunk:managed:end -->');
    const originalPrefix = text.slice(0, prefixEnd);
    const originalSuffix = text.slice(suffixStart);

    expect(result.text.startsWith(originalPrefix)).toBe(true);
    expect(result.text.endsWith(originalSuffix)).toBe(true);
    expect(result.text).toBe(
      'Some consumer prose above.\n\n' +
        '<!-- designerpunk:managed:begin -->\n' +
        '@.claude/identity/designerpunk-new-1.md\n@.claude/identity/designerpunk-new-2.md\n' +
        '<!-- designerpunk:managed:end -->\n\n' +
        'Some consumer prose below.\n',
    );
  });

  test('missing markers → the exact design-catalog string, and the caller never writes', () => {
    const text = 'a file with no managed region\n';
    const result = spliceRegion(text, CLAUDE_MARKERS, '@.claude/identity/designerpunk-x.md', 'CLAUDE.md');

    expect(result.ok).toBe(false);
    if (result.ok) return;

    // Verbatim design.md § "Error Handling" row: "managed region — markers missing".
    expect(result.message).toBe(
      'the DesignerPunk-managed region in CLAUDE.md is missing its markers — not rewriting the file. ' +
        'Restore the markers (see install doc § "Your agent layer") or re-run attach',
    );
    expect(result.message).toBe(managedRegionMarkersMissingMessage('CLAUDE.md'));

    // Demonstrate the never-write contract: a caller following the `ok` discriminant
    // (the only sanctioned way to consume a SpliceResult) never reaches a write on
    // this branch. The writer is a spy standing in for `fs.writeFileSync`.
    const writer = { writeFileSync: jest.fn() };
    if (result.ok) {
      writer.writeFileSync('/tmp/should-not-be-reached', (result as { text: string }).text);
    }
    expect(writer.writeFileSync).not.toHaveBeenCalled();
  });

  test('missing markers never throws (unmatched end-only case too)', () => {
    expect(() => spliceRegion('<!-- designerpunk:managed:end -->\nno begin\n', CLAUDE_MARKERS, 'x', 'CLAUDE.md')).not.toThrow();
    const result = spliceRegion('<!-- designerpunk:managed:end -->\nno begin\n', CLAUDE_MARKERS, 'x', 'CLAUDE.md');
    expect(result.ok).toBe(false);
  });

  test('nested/duplicate markers: splice touches only the FIRST pair; the second pair is preserved verbatim', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' +
      'old first\n' +
      '<!-- designerpunk:managed:end -->\n' +
      'between\n' +
      '<!-- designerpunk:managed:begin -->\n' +
      'old second\n' +
      '<!-- designerpunk:managed:end -->\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, 'new first', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.text).toBe(
      '<!-- designerpunk:managed:begin -->\n' +
        'new first\n' +
        '<!-- designerpunk:managed:end -->\n' +
        'between\n' +
        '<!-- designerpunk:managed:begin -->\n' +
        'old second\n' +
        '<!-- designerpunk:managed:end -->\n',
    );
  });

  test('idempotent on re-splice: splicing the same output with the same contents is a no-op', () => {
    const text =
      '<!-- designerpunk:managed:begin -->\n' + 'old\n' + '<!-- designerpunk:managed:end -->\n' + 'tail\n';

    const first = spliceRegion(text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(first.ok).toBe(true);
    if (!first.ok) return;

    const second = spliceRegion(first.text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(second.ok).toBe(true);
    if (!second.ok) return;

    expect(second.text).toBe(first.text);

    // A third splice is still a fixed point.
    const third = spliceRegion(second.text, CLAUDE_MARKERS, 'stable content', 'CLAUDE.md');
    expect(third.ok).toBe(true);
    if (!third.ok) return;
    expect(third.text).toBe(second.text);
  });

  test('CRLF files stay CRLF: outside bytes keep \\r\\n, and new region content is normalized to \\r\\n', () => {
    const text =
      'above\r\n' +
      '<!-- designerpunk:managed:begin -->\r\n' +
      'old\r\n' +
      '<!-- designerpunk:managed:end -->\r\n' +
      'below\r\n';

    const result = spliceRegion(text, CLAUDE_MARKERS, 'line one\nline two', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.text).toBe(
      'above\r\n' +
        '<!-- designerpunk:managed:begin -->\r\n' +
        'line one\r\nline two\r\n' +
        '<!-- designerpunk:managed:end -->\r\n' +
        'below\r\n',
    );
    // No stray LF-only line endings were introduced.
    expect(result.text.replace(/\r\n/g, '')).not.toContain('\n');
  });

  test('LF files stay LF (the common case, no CRLF anywhere in the file)', () => {
    const text = '<!-- designerpunk:managed:begin -->\nold\n<!-- designerpunk:managed:end -->\n';
    const result = spliceRegion(text, CLAUDE_MARKERS, 'new', 'CLAUDE.md');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe('<!-- designerpunk:managed:begin -->\nnew\n<!-- designerpunk:managed:end -->\n');
    expect(result.text).not.toContain('\r\n');
  });

  test('.gitignore region uses the line-comment marker form end to end', () => {
    const gi = regionMarkers(GITIGNORE_COMMENT);
    const text = 'node_modules/\n# designerpunk:managed:begin\n.designerpunk/old\n# designerpunk:managed:end\ndist/\n';
    const result = spliceRegion(text, gi, '.designerpunk/personal-note.local.md', '.gitignore');
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.text).toBe('node_modules/\n# designerpunk:managed:begin\n.designerpunk/personal-note.local.md\n# designerpunk:managed:end\ndist/\n');
  });
});
