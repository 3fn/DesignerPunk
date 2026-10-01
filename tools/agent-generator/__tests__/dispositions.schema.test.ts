/**
 * dispositions.schema.test.ts — Spec 123 Task 13.1: the dispositions schema (design C17;
 * Req 11.2; DD19, DD25, DD26).
 *
 * The four properties 13.1 owns — explicit rows, per-member frontmatter, no re-pointed embeds,
 * the rejected term — each have a describe block here. The rejected term is one of Task 13's
 * nine checks; its named test is "repo-bound-in-entirety is a named rejected term, not an
 * unknown one" and its bite is recorded in task-13-1-completion.md.
 *
 * Not tested here (other subtasks): missing rows and orphaned keys (13.5); the signature checks
 * themselves (signatures.test.ts, 13.2/13.3); destination derivation (Task 14).
 */

import { REJECTED_TERM_MESSAGE } from '../regrounding/check-catalog';
import {
  DISPOSITION_TERMS,
  DispositionsError,
  loadDispositions,
  parseDispositions,
  REJECTED_TERM,
  validateDispositions,
  type DispositionFinding,
} from '../regrounding/dispositions';
import { entryTree } from '../partition';

const FILE = 'canonical/profiles/consumer/twin.dispositions.yaml';
const checks = (fs: DispositionFinding[]) => fs.map((f) => f.check);
const validate = (doc: unknown, entries?: ReturnType<typeof entryTree>) => validateDispositions(doc, FILE, { entries });
const body = (rows: Record<string, unknown>) => ({ source: 'canonical/agents/twin.md', body: rows });
const fm = (rows: Record<string, unknown>) => ({ source: 'canonical/agents/twin.md', frontmatter: rows });

describe('the closed vocabulary (Req 11.2.1)', () => {
  it('is exactly retained, re-pointed, superseded-by, no-consumer-counterpart', () => {
    expect([...DISPOSITION_TERMS]).toEqual(['retained', 're-pointed', 'superseded-by', 'no-consumer-counterpart']);
  });

  it('does not contain the rejected term (Req 11.2.2)', () => {
    expect(DISPOSITION_TERMS as readonly string[]).not.toContain(REJECTED_TERM);
  });

  it('refuses a term outside the vocabulary with the unknown-term error', () => {
    const findings = validate(body({ '#a': { disposition: 'gone' } }));
    expect(checks(findings)).toEqual(['unknown-term']);
    expect(findings[0].message).toBe(
      "disposition 'gone' on #a in canonical/profiles/consumer/twin.dispositions.yaml is not in the vocabulary — use retained, re-pointed, superseded-by, no-consumer-counterpart"
    );
  });
});

describe('the rejected term (Req 11.2.2) — one of Task 13\'s nine checks', () => {
  it('repo-bound-in-entirety is a named rejected term, not an unknown one', () => {
    const findings = validate(body({ '#the-owed-set-pipeline': { disposition: 'repo-bound-in-entirety' } }));
    expect(findings).toEqual([
      {
        check: 'repo-bound-in-entirety',
        file: FILE,
        row: 'body #the-owed-set-pipeline',
        message: REJECTED_TERM_MESSAGE,
      },
    ]);
    // The exact string: Req 11.2.2's quotation, prefixed by the term (design-outline § "The
    // vocabulary defect").
    expect(findings[0].message).toBe(
      '`repo-bound-in-entirety` is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`.'
    );
    expect(findings[0].message).toContain(
      'not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`.'
    );
  });

  it('is refused in frontmatter and shared-member rows too', () => {
    expect(checks(validate(fm({ 'commands[x]': { disposition: REJECTED_TERM } })))).toEqual(['repo-bound-in-entirety']);
    expect(
      checks(validate({ source: 'canonical/shared/shared-catalog.yaml', members: { m: { disposition: REJECTED_TERM } } }))
    ).toEqual(['repo-bound-in-entirety']);
  });

  it('makes loadDispositions throw with the exact string', () => {
    const yaml = 'source: canonical/agents/twin.md\nbody:\n  "#a": { disposition: repo-bound-in-entirety }\n';
    expect(() => loadDispositions(yaml, FILE)).toThrow(DispositionsError);
    expect(() => loadDispositions(yaml, FILE)).toThrow(`${FILE} [body #a]: ${REJECTED_TERM_MESSAGE}`);
  });
});

describe('explicit rows (DD25) — retained is written, never implied', () => {
  it('accepts an explicit retained row', () => {
    expect(validate(body({ '#identity': { disposition: 'retained' } }))).toEqual([]);
  });

  it('refuses a row that names no term (null, empty, or no disposition field)', () => {
    const findings = validate(body({ '#a': null, '#b': {}, '#c': { destination: '#c' } }));
    expect(checks(findings)).toEqual(['no-term', 'no-term', 'no-term']);
    expect(findings[0].message).toBe(
      "row #a in canonical/profiles/consumer/twin.dispositions.yaml names no disposition — every row writes its term explicitly ('retained' if it ships as-is)"
    );
  });
});

describe('per-member frontmatter (DD26) — only leaves are keyed', () => {
  const entries = entryTree({
    writeScope: ['src/__tests__/**', '.kiro/specs/**'],
    commands: [{ name: 'run-tests', cmd: 'npm test' }],
    ambient: { governanceAsLaw: [{ id: 'doc-x', owner: 'lina', assert: [{ claim: 'c', section: 'Sec', mustContain: ['m'] }] }] },
  });

  it('accepts member keys', () => {
    const findings = validate(
      fm({
        'writeScope[src/__tests__/**]': { disposition: 're-pointed', destination: 'frontmatter:writeScope[src/__tests__/**]' },
        'writeScope[.kiro/specs/**]': { disposition: 'no-consumer-counterpart', cites: 'subtraction-4' },
        'commands[run-tests]': { disposition: 'retained' },
        'ambient[doc-x#sec]': { disposition: 'retained' },
      }),
      entries
    );
    expect(findings).toEqual([]);
  });

  it('refuses a key naming a list or a map — its members are the rows', () => {
    const findings = validate(
      fm({ writeScope: { disposition: 'no-consumer-counterpart' }, 'ambient[doc-x]': { disposition: 'retained' } }),
      entries
    );
    expect(checks(findings)).toEqual(['container-key', 'container-key']);
    expect(findings[0].message).toBe(
      'frontmatter key writeScope in canonical/profiles/consumer/twin.dispositions.yaml names a list — list- and map-valued fields are keyed per member (e.g. writeScope[<glob>]); only scalar leaves are atomic'
    );
    expect(findings[1].message).toContain('names a map');
  });

  it('leaves a key naming nothing to the orphaned-key refusal (13.5)', () => {
    expect(validate(fm({ 'writeScope[gone/**]': { disposition: 'retained' } }), entries)).toEqual([]);
  });
});

describe('no re-pointed embeds (DD19)', () => {
  it('refuses re-pointed on an ambient embed', () => {
    const findings = validate(fm({ 'ambient[doc-x#sec]': { disposition: 're-pointed', destination: '#x' } }));
    expect(checks(findings)).toEqual(['re-pointed-embed']);
    expect(findings[0].message).toBe(
      "ambient embed ambient[doc-x#sec] in canonical/profiles/consumer/twin.dispositions.yaml cannot be re-pointed — re-grounding an embedded governance section edits its owner's doc; use retained, superseded-by, no-consumer-counterpart (DD19)"
    );
  });

  it('accepts retained, superseded-by and no-consumer-counterpart on an embed', () => {
    const findings = validate(
      fm({
        'ambient[a#s]': { disposition: 'retained' },
        'ambient[b#s]': { disposition: 'superseded-by', destination: '#where' },
        'ambient[c#s]': { disposition: 'no-consumer-counterpart', cites: 'subtraction-3' },
      })
    );
    expect(findings).toEqual([]);
  });

  it('allows re-pointed on a non-embed frontmatter entry and on body units', () => {
    expect(validate(fm({ 'commands[x]': { disposition: 're-pointed', destination: 'frontmatter:commands[x]' } }))).toEqual([]);
    expect(validate(body({ '#a': { disposition: 're-pointed', destination: '#a' } }))).toEqual([]);
  });
});

describe('row fields by term', () => {
  it('requires a destination on re-pointed and superseded-by', () => {
    const findings = validate(body({ '#a': { disposition: 're-pointed' }, '#b': { disposition: 'superseded-by' } }));
    expect(checks(findings)).toEqual(['missing-destination', 'missing-destination']);
  });

  it('refuses fields that do not apply to the term', () => {
    const findings = validate(
      body({
        '#a': { disposition: 'retained', destination: '#a' },
        '#b': { disposition: 'no-consumer-counterpart', removals: [{ text: 't', cites: 'subtraction-1' }] },
        '#c': { disposition: 're-pointed', destination: '#c', cites: 'subtraction-1' },
      })
    );
    expect(checks(findings)).toEqual(['field-not-applicable', 'field-not-applicable', 'field-not-applicable']);
    expect(findings[0].message).toBe("row #a in canonical/profiles/consumer/twin.dispositions.yaml: 'destination' does not apply to a retained row");
  });

  it('checks cites and removals', () => {
    const findings = validate(
      body({
        '#a': { disposition: 'no-consumer-counterpart', cites: 'subtraction-6' },
        '#b': { disposition: 're-pointed', destination: '#b', removals: [{ text: 'x', cites: 'subtraction-1' }, { text: '' }, { text: 'y', cites: 'nope', why: 1 }] },
        '#c': { disposition: 're-pointed', destination: '#c', removals: 'all of it' },
      })
    );
    expect(checks(findings)).toEqual(['bad-cite', 'bad-removal', 'bad-removal', 'bad-cite', 'bad-removal']);
  });

  it('refuses an unknown row field', () => {
    expect(checks(validate(body({ '#a': { disposition: 'retained', dispostion: 'x' } })))).toEqual(['unknown-field']);
  });

  it('format-checks a signature through signatures.ts, surfacing the bare check (13.2)', () => {
    const H = `sha256:${'0'.repeat(64)}`;
    const sig = { signer: 'stacy', canonicalHash: H, renderedHash: H, evidence: 'n.md#a' };
    expect(validate(body({ '#a': { disposition: 're-pointed', destination: '#a', signature: { ...sig, assent: { surviving: [] } } } }))).toEqual([]);
    expect(checks(validate(body({ '#a': { disposition: 're-pointed', destination: '#a', signature: sig } })))).toEqual(['bare-signature']);
    expect(checks(validate(body({ '#a': { disposition: 're-pointed', destination: '#a', signature: { anything: true } } })))).toContain('signature-format');
  });
});

describe('file shape', () => {
  it('refuses a non-mapping, a missing source and unknown top-level keys', () => {
    expect(checks(validate(['x']))).toEqual(['file-shape']);
    expect(checks(validate({ body: {} }))).toEqual(['file-shape']);
    expect(checks(validate({ source: 's', rows: {} }))).toEqual(['file-shape']);
  });

  it('keys the shared catalog by member id only', () => {
    expect(validate({ source: 'canonical/shared/shared-catalog.yaml', members: { m: { disposition: 'retained' } } })).toEqual([]);
    expect(checks(validate({ source: 'canonical/agents/twin.md', members: { m: { disposition: 'retained' } } }))).toEqual(['file-shape']);
    expect(checks(validate({ source: 'canonical/shared/shared-catalog.yaml', body: {} }))).toEqual(['file-shape']);
  });

  it("parses design C17's own example (source: added; its elided hashes filled) without a finding", () => {
    const yaml = [
      'source: canonical/agents/stacy.md',
      'body:',
      '  "#the-owed-set-pipeline":',
      '    disposition: re-pointed',
      '    destination: "#the-owed-set-pipeline"',
      '    removals: [ { text: "…/.kiro/docs/ballots/2026-09-19-…", cites: subtraction-1 } ]',
      '    signature:',
      '      signer: stacy',
      `      canonicalHash: sha256:${'a'.repeat(64)}`,
      `      renderedHash: sha256:${'b'.repeat(64)}`,
      '      assent: { surviving: [owed-set-1, owed-set-2, owed-set-4] }',
      '      evidence: canonical/profiles/consumer/signatures/stacy.md#the-owed-set-pipeline',
      'frontmatter:',
      '  "commands[complete-task-tooling]": { disposition: no-consumer-counterpart, cites: subtraction-1 }',
      '  "writeScope[src/__tests__/**]":    { disposition: re-pointed, destination: "frontmatter:writeScope[src/__tests__/**]" }',
      '  "writeScope[.kiro/specs/**]":      { disposition: no-consumer-counterpart, cites: subtraction-4 }',
      '  "ambient[process-development-workflow#task-completion-workflow]": { disposition: retained }',
      '',
    ].join('\n');
    expect(validateDispositions(parseDispositions(yaml), FILE)).toEqual([]);
    expect(loadDispositions(yaml, FILE).body?.['#the-owed-set-pipeline']?.disposition).toBe('re-pointed');
  });
});
