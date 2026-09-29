/**
 * spans.source-origin.test.ts — Spec 123 Task 10.5: the 10.S UNIT TWIN (Req 10.8a; design
 * § "Testing Strategy", `spans.source-origin.test.ts`).
 *
 * The twin tests the SHARED FUNCTION ONLY: given section S transformed by profile P, the
 * emitted span's `source` equals S's canonical anchor (10.S — `source` is provenance, `op`
 * names the transformation). Its bite (source a re-grounded unit to the profile) turns this
 * red for every target at once, which is exactly why it CANNOT prove per-target routing: the
 * arbiter that every adapter span routes through `emitSpans` is Task 14's two-sided per-target
 * bites (S-T-A7), not this file.
 */

import { AttributionAccumulator, checkAttributionTotality } from '../attribution';
import { emitSpans, SpanEmissionError, countLines, type SpanSource } from '../spans';

const FILE = 'canonical/agents/twin.md';
const BODY = [
  '# Twin',
  '',
  '## Kept',
  '',
  'Kept verbatim.',
  '',
  '## Regrounded',
  '',
  'Steward-only operative text.',
  '',
  '## Dropped',
  '',
  'Text with no consumer counterpart.',
  '',
].join('\n');

const SOURCE: SpanSource = {
  file: FILE,
  body: BODY,
  frontmatter: {
    agent: 'twin',
    writeScope: ['a/**', 'b/**'],
    ambient: { governanceAsLaw: [{ id: 'doc-x', owner: 'lina', assert: [{ claim: 'c', section: 'Sec', mustContain: ['m'] }] }] },
    commands: [{ name: 'suite', cmd: 'npm test', runContext: 'this-repo' }],
  },
};

const CONSUMER_ROWS = {
  body: {
    '#kept': { disposition: 'retained' as const },
    '#regrounded': { disposition: 're-pointed' as const, destination: '#regrounded' },
    '#dropped': { disposition: 'no-consumer-counterpart' as const },
  },
};
const OVERLAY = { units: { '#regrounded': '## Regrounded\n\nConsumer-grounded text.\n\n' } };

describe('10.S unit twin — a re-grounded unit is sourced to its CANONICAL ORIGIN', () => {
  it('re-pointed → op render, source = the canonical anchor of S (never the profile)', () => {
    const acc = new AttributionAccumulator();
    emitSpans(acc, SOURCE, 'consumer', CONSUMER_ROWS, OVERLAY, 'body');
    const spans = acc.build('out.md').spans;
    const regrounded = spans.find((s) => s.op === 'render');
    expect(regrounded?.source).toBe(`${FILE}#regrounded`);
    expect(spans.every((s) => s.source.startsWith(`${FILE}#`))).toBe(true);
  });

  it('retained → passthrough; omitted → no text and no span', () => {
    const acc = new AttributionAccumulator();
    const out = emitSpans(acc, SOURCE, 'consumer', CONSUMER_ROWS, OVERLAY, 'body');
    const spans = acc.build('out.md').spans;
    expect(spans.map((s) => [s.op, s.source])).toEqual([
      ['passthrough', `${FILE}#kept`],
      ['render', `${FILE}#regrounded`],
    ]);
    expect(out.text).toContain('Kept verbatim.');
    expect(out.text).toContain('Consumer-grounded text.');
    expect(out.text).not.toContain('Steward-only operative text.');
    expect(out.text).not.toContain('Text with no consumer counterpart.');
    expect(checkAttributionTotality(acc.build('out.md'), countLines(out.text)).valid).toBe(true);
  });

  it('steward → one passthrough span per unit; the text is the body, byte-identical; spans tile', () => {
    const acc = new AttributionAccumulator();
    const out = emitSpans(acc, SOURCE, 'steward', undefined, undefined, 'body');
    expect(out.text).toBe(BODY);
    const m = acc.build('out.md');
    expect(m.spans.map((s) => s.source)).toEqual([`${FILE}#kept`, `${FILE}#regrounded`, `${FILE}#dropped`]);
    expect(m.spans.every((s) => s.op === 'passthrough')).toBe(true);
    expect(checkAttributionTotality(m, countLines(out.text)).valid).toBe(true);
  });

  it('the body always ends with a newline (the pre-123 inline sites\' contract)', () => {
    const acc = new AttributionAccumulator();
    const out = emitSpans(acc, { ...SOURCE, body: 'no newline' }, 'steward', undefined, undefined, 'body');
    expect(out.text).toBe('no newline\n');
  });
});

describe('emitSpans — profile and row discipline', () => {
  it('the steward profile refuses dispositions/overlay; the consumer profile requires dispositions', () => {
    expect(() => emitSpans(new AttributionAccumulator(), SOURCE, 'steward', CONSUMER_ROWS, undefined, 'body')).toThrow(SpanEmissionError);
    expect(() => emitSpans(new AttributionAccumulator(), SOURCE, 'consumer', undefined, undefined, 'body')).toThrow(SpanEmissionError);
  });

  it('a unit with no row is never implied retained', () => {
    const rows = { body: { '#kept': { disposition: 'retained' as const } } };
    expect(() => emitSpans(new AttributionAccumulator(), SOURCE, 'consumer', rows, OVERLAY, 'body')).toThrow(/no disposition row/);
  });

  it('a re-pointed unit with no overlay text refuses', () => {
    expect(() => emitSpans(new AttributionAccumulator(), SOURCE, 'consumer', CONSUMER_ROWS, {}, 'body')).toThrow(/no overlay text/);
  });
});

describe('emitSpans — frontmatter entries, shared members and glue', () => {
  it('an entry is sourced to `<file>#frontmatter:<path>`; a list member is keyed by the entry tree', () => {
    const acc = new AttributionAccumulator();
    emitSpans(acc, SOURCE, 'steward', undefined, undefined, [
      { kind: 'entry', path: 'commands', text: '## Commands\n\n' },
      { kind: 'member', list: 'commands', index: 0, text: '- suite\n' },
      { kind: 'shared', id: 'find-docs', text: '- find docs\n' },
      { kind: 'glue', glue: 'workflow-rules', text: 'rules\n' },
    ]);
    expect(acc.build('x').spans.map((s) => [s.op, s.source])).toEqual([
      ['render', `${FILE}#frontmatter:commands`],
      ['render', `${FILE}#frontmatter:commands[suite]`],
      ['render', 'canonical/shared/shared-catalog.yaml#find-docs'],
      ['render', 'WORKFLOW_RULES'],
    ]);
  });

  it('an ambient embed is resolve + mode embed', () => {
    const acc = new AttributionAccumulator();
    emitSpans(acc, SOURCE, 'steward', undefined, undefined, [{ kind: 'entry', path: 'ambient[doc-x]', text: '### doc-x\n\nbody\n' }]);
    expect(acc.build('x').spans[0]).toEqual({ lines: [1, 3], op: 'resolve', mode: 'embed', source: `${FILE}#frontmatter:ambient[doc-x]` });
  });

  it('a path that names no entry refuses (an adapter cannot cite a nonexistent entry)', () => {
    expect(() =>
      emitSpans(new AttributionAccumulator(), SOURCE, 'steward', undefined, undefined, [{ kind: 'entry', path: 'writeScope[z/**]', text: 'x\n' }])
    ).toThrow(/no frontmatter entry/);
    expect(() =>
      emitSpans(new AttributionAccumulator(), SOURCE, 'steward', undefined, undefined, [{ kind: 'member', list: 'commands', index: 5, text: 'x\n' }])
    ).toThrow(/no member at index 5/);
  });

  it('a piece that does not end in a newline refuses (spans are whole lines)', () => {
    expect(() =>
      emitSpans(new AttributionAccumulator(), SOURCE, 'steward', undefined, undefined, [{ kind: 'glue', glue: 'generated-banner', text: 'no newline' }])
    ).toThrow(/does not end with a newline/);
  });

  it('consumer (Task 15.3): the adapter renders derive()’s frontmatter — a disposed leaf still present refuses; a re-pointed leaf is the adapter’s rendering of its substituted value, sourced through entryOrigin to its canonical origin', () => {
    const rows = { body: {}, frontmatter: { 'writeScope[a/**]': { disposition: 'no-consumer-counterpart' as const }, 'writeScope[b/**]': { disposition: 're-pointed' as const } } };
    expect(() =>
      emitSpans(new AttributionAccumulator(), SOURCE, 'consumer', rows, undefined, [{ kind: 'member', list: 'writeScope', index: 0, text: 'a\n' }])
    ).toThrow(
      "emitSpans: frontmatter entry writeScope[a/**] in canonical/agents/twin.md is disposed no-consumer-counterpart but was rendered — the consumer profile renders derive()'s frontmatter and catalog, never the canonical ones."
    );
    // The derived frontmatter carries b/**'s substituted value at its position; entryOrigin maps it back.
    const derived = { ...SOURCE, frontmatter: { ...SOURCE.frontmatter, writeScope: ['consumer/b/**'] }, entryOrigin: { 'writeScope[consumer/b/**]': 'writeScope[b/**]' } };
    const acc2 = new AttributionAccumulator();
    const out2 = emitSpans(acc2, derived, 'consumer', rows, undefined, [{ kind: 'member', list: 'writeScope', index: 0, text: '- `consumer/b/**`\n' }]);
    expect(out2.text).toBe('- `consumer/b/**`\n');
    expect(acc2.build('x').spans).toEqual([{ lines: [1, 1], op: 'render', source: 'canonical/agents/twin.md#frontmatter:writeScope[b/**]' }]);
  });

});
