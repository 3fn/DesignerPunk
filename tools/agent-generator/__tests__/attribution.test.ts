/**
 * @category evergreen
 * @purpose Verify the attribution totality checker (P2) — positive tiling, gap, overlap, and
 *          bad-op cases (the four the design names) plus end-boundary and empty-artifact
 *          handling — and the AttributionAccumulator that builds total-by-construction spans.
 */

import {
  AttributionAccumulator,
  buildAttribution,
  checkAttributionTotality,
  serializeAttribution,
  type AttributionSpan,
} from '../attribution';

const span = (start: number, end: number, op: AttributionSpan['op'], source = 's'): AttributionSpan => ({
  lines: [start, end],
  op,
  source,
});

describe('checkAttributionTotality (P2)', () => {
  it('accepts spans that tile 1..N with no gap or overlap and valid ops', () => {
    const manifest = buildAttribution('a.md', [
      span(1, 14, 'render'),
      span(15, 88, 'passthrough'),
      span(89, 102, 'resolve'),
    ]);
    expect(checkAttributionTotality(manifest, 102)).toEqual({ valid: true, errors: [] });
  });

  it('flags a GAP between spans', () => {
    const manifest = buildAttribution('a.md', [span(1, 10, 'render'), span(15, 20, 'passthrough')]);
    const result = checkAttributionTotality(manifest, 20);
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/GAP at lines 11\.\.14/);
  });

  it('flags OVERLAPPING spans', () => {
    const manifest = buildAttribution('a.md', [span(1, 12, 'render'), span(10, 20, 'passthrough')]);
    const result = checkAttributionTotality(manifest, 20);
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/OVERLAPPING/);
  });

  it('flags a bad op', () => {
    const manifest = buildAttribution('a.md', [
      { lines: [1, 20], op: 'invent' as unknown as AttributionSpan['op'], source: 's' },
    ]);
    const result = checkAttributionTotality(manifest, 20);
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/must be one of resolve\|render\|passthrough/);
  });

  it('flags an unattributed tail (last span ends before totalLines)', () => {
    const result = checkAttributionTotality(buildAttribution('a.md', [span(1, 10, 'render')]), 20);
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/GAP at lines 11\.\.20/);
  });

  it('flags attribution past the artifact end', () => {
    const result = checkAttributionTotality(buildAttribution('a.md', [span(1, 30, 'render')]), 20);
    expect(result.valid).toBe(false);
    expect(result.errors.join(' ')).toMatch(/past the artifact end/);
  });

  it('treats an empty artifact as total iff it has no spans', () => {
    expect(checkAttributionTotality(buildAttribution('a.md', []), 0).valid).toBe(true);
    expect(checkAttributionTotality(buildAttribution('a.md', [span(1, 1, 'render')]), 0).valid).toBe(false);
  });
});

describe('AttributionAccumulator — total-by-construction', () => {
  it('assigns contiguous spans in emission order and tracks the line count', () => {
    const acc = new AttributionAccumulator();
    acc.add('render', 14, 'frontmatter');
    acc.add('passthrough', 74, 'body');
    acc.add('resolve', 14, 'id:x', 'embed');
    expect(acc.lineCount).toBe(102);
    const manifest = acc.build('a.md');
    expect(checkAttributionTotality(manifest, acc.lineCount)).toEqual({ valid: true, errors: [] });
    // the embed mode is carried onto the resolve span only
    const embedSpan = manifest.spans.find((s) => s.op === 'resolve');
    expect(embedSpan?.mode).toBe('embed');
    expect(manifest.spans.find((s) => s.op === 'render')?.mode).toBeUndefined();
  });

  it('ignores zero-length blocks', () => {
    const acc = new AttributionAccumulator();
    acc.add('render', 0, 'empty');
    acc.add('passthrough', 5, 'body');
    expect(acc.lineCount).toBe(5);
    expect(acc.build('a.md').spans).toHaveLength(1);
  });
});

describe('serializeAttribution — deterministic', () => {
  it('produces canonical JSON with a trailing newline', () => {
    const out = serializeAttribution(buildAttribution('a.md', [span(1, 2, 'render', 'frontmatter')]));
    expect(out.endsWith('\n')).toBe(true);
    expect(out).toContain('"artifact": "a.md"');
  });
});
