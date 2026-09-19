/**
 * verdict.test.ts — the parity predicate + emissions + the loud-failure
 * CATALOG-CONFORMANCE cases (Spec 127, design C5 + § Error Handling; Stacy
 * A-9's disambiguation: the loud-string cases live INSIDE this suite).
 *
 * Every expected message below is transcribed from the design's Error-Handling
 * table LITERALLY — the test is the independent copy; the implementation must
 * be string-equal to it (U2 success criterion).
 */

import { parseTasksMd } from '../tasks-md';
import { parseCompletionDoc, CompletionDoc } from '../completion-doc';
import {
  evaluateParent,
  evaluateSpec,
  evaluateAmendment,
  resolveMode,
  parseRatificationRecord,
  uncoveredClasses,
  DOC_NOT_FOUND_EMISSION,
  RATIFICATION_BALLOT_PATH,
} from '../verdict';

const HEADER = '**Criteria mode**: per-parent\n\n';

function tasksWith(criteria: string[], extra = ''): string {
  return (
    HEADER +
    '- [x] 2. Build the thing\n\n' +
    '  **Success Criteria:**\n' +
    criteria.map((c) => `  - ${c}`).join('\n') +
    '\n' +
    extra
  );
}

function docWith(rows: [string, string, string][], opts: { forcedNegative?: boolean; av?: string } = {}): CompletionDoc {
  const text =
    '| Criterion (verbatim) | Status | Evidence |\n|---|---|---|\n' +
    rows.map(([c, s, e]) => `| ${c} | ${s} | ${e} |`).join('\n') +
    '\n\n' +
    (opts.forcedNegative === false ? '' : 'Unmet or partially met criteria: None\n') +
    (opts.av ?? '');
  return parseCompletionDoc(text, 'test-doc.md');
}

const parent = (text: string) => parseTasksMd(text).parents[0];

describe('the (c′) predicate — multiset semantics (Req 2.5.2)', () => {
  test('exact reproduction passes', () => {
    const p = parent(tasksWith(['criterion A', 'criterion B']));
    const doc = docWith([
      ['criterion A', '✅', 'a/b.test.ts'],
      ['criterion B', '⚠️', '.kiro/issues/x.md'],
    ]);
    expect(evaluateParent(p, doc).findings).toEqual([]);
  });

  test('reordering is NOT a mutation class', () => {
    const p = parent(tasksWith(['criterion A', 'criterion B']));
    const doc = docWith([
      ['criterion B', '✅', 'a/b.test.ts'],
      ['criterion A', '✅', 'a/c.test.ts'],
    ]);
    expect(evaluateParent(p, doc).findings).toEqual([]);
  });

  test('duplicate bullets cannot collapse into one row', () => {
    const p = parent(tasksWith(['run it twice', 'run it twice']));
    const doc = docWith([['run it twice', '✅', 'a/b.test.ts']]);
    const verdicts = evaluateParent(p, doc).findings.map((f) => f.verdict);
    expect(verdicts).toContain('SET_MISMATCH');
  });

  test('drop, invent, and reword all collapse to SET_MISMATCH with the diff reported', () => {
    const p = parent(tasksWith(['all platforms verified', 'suite green']));
    const doc = docWith([
      ['web platform verified', '✅', 'a/b.test.ts'], // reword/relax
      ['suite green', '✅', 'a/b.test.ts'],
      ['an invented flattering row', '✅', 'a/b.test.ts'], // invent
    ]);
    const f = evaluateParent(p, doc).findings.find((x) => x.verdict === 'SET_MISMATCH');
    expect(f).toBeDefined();
    expect(f!.message).toContain('missing from doc');
    expect(f!.message).toContain('not in tasks.md');
  });

  test('normalization absorbs <br>, escaped pipes, and NBSP between bullet and cell', () => {
    const p = parent(tasksWith(['pipes | and spaces align']));
    const doc = docWith([['pipes \\| and spaces<br>align', '✅', 'a/b.test.ts']]);
    expect(evaluateParent(p, doc).findings).toEqual([]);
  });
});

describe('evidence and forced-negative duties (Reqs 1.3, 1.4)', () => {
  test('a ✅ with a prose-only Evidence cell is non-compliant on its face', () => {
    const p = parent(tasksWith(['criterion A']));
    const doc = docWith([['criterion A', '✅', 'implemented it carefully']]);
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain(
      'EVIDENCE_NONCOMPLIANT'
    );
  });

  test('a missing forced-negative line is red', () => {
    const p = parent(tasksWith(['criterion A']));
    const doc = docWith([['criterion A', '✅', 'a/b.test.ts']], { forcedNegative: false });
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain(
      'FORCED_NEGATIVE_MISSING'
    );
  });
});

describe('Additional verification — the same predicate, never shape-only (B-3)', () => {
  const AV_TASKS = tasksWith(
    ['criterion A'],
    '\n  **Primary Artifacts:**\n  - scripts/out.ts\n\n  **Merge gate:**\n  - `npm test` green on the branch\n'
  );

  test('a compliant AV section passes', () => {
    const p = parent(AV_TASKS);
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\n| Condition (verbatim) | Status | Evidence |\n|---|---|---|\n| `npm test` green on the branch | ✅ | `npm test` → green |\n\nPrimary Artifacts: all shipped as declared\n',
      }
    );
    expect(evaluateParent(p, doc).findings).toEqual([]);
  });

  test('a REWORDED gate condition is AV_SET_MISMATCH', () => {
    const p = parent(AV_TASKS);
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\n| Condition (verbatim) | Status | Evidence |\n|---|---|---|\n| tests pass | ✅ | `npm test` → green |\n\nPrimary Artifacts: all shipped as declared\n',
      }
    );
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain('AV_SET_MISMATCH');
  });

  test('AV section owed but absent is red', () => {
    const p = parent(AV_TASKS);
    const doc = docWith([['criterion A', '✅', 'a/b.test.ts']]);
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain(
      'AV_MISSING_OR_MALFORMED'
    );
  });

  test('artifact forced-negative line owed when artifacts declared', () => {
    const p = parent(AV_TASKS);
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\n| Condition (verbatim) | Status | Evidence |\n|---|---|---|\n| `npm test` green on the branch | ✅ | `npm test` → green |\n',
      }
    );
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain(
      'AV_MISSING_OR_MALFORMED'
    );
  });

  test('an em-dash annotation row is excluded from the claimed gate multiset (the live Task-1 shape)', () => {
    const noGateTasks = tasksWith(['criterion A'], '\n  **Primary Artifacts:**\n  - scripts/out.ts\n');
    const p = parent(noGateTasks);
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\n| Condition (verbatim) | Status | Evidence |\n|---|---|---|\n| *(none — no merge gate declared)* | — | parent declares none |\n\nPrimary Artifacts: all shipped as declared\n',
      }
    );
    expect(evaluateParent(p, doc).findings).toEqual([]);
  });

  test('deferral declarations emit informationally (B-9: exclusion semantics belong to promised-artifact-exists)', () => {
    const p = parent(tasksWith(['criterion A'], '\n  **Primary Artifacts:**\n  - docs/guide.md\n'));
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\nPrimary Artifacts: all shipped except the deferred guide\n\nArtifact deferred: docs/guide.md → U3\n',
      }
    );
    const r = evaluateParent(p, doc);
    expect(r.findings).toEqual([]);
    expect(r.emissions.map((e) => e.kind)).toContain('av-deferral-declared');
  });
});

describe('declared-none and the exemption (Reqs 1.6, 1.7, 2.2.4)', () => {
  test('declared-none waives the criteria table ONLY — AV still evaluated, waiver emitted', () => {
    const text =
      HEADER +
      '- [x] 2. Coordinate\n  **Success Criteria:** none — coordination-only\n\n  **Primary Artifacts:**\n  - docs/notes.md\n';
    const p = parent(text);
    const doc = parseCompletionDoc('# Doc\n\nNo table here.\n', 'd.md');
    const r = evaluateParent(p, doc);
    expect(r.emissions.map((e) => e.kind)).toContain('declared-none-table-waiver');
    expect(r.findings.map((f) => f.verdict)).toContain('AV_MISSING_OR_MALFORMED');
  });

  test('a declared-none parent CLAIMING criteria rows is SET_MISMATCH (invent against an empty set)', () => {
    const text = HEADER + '- [x] 2. Coordinate\n  **Success Criteria:** none — coordination-only\n';
    const p = parent(text);
    const doc = docWith([['a flattering invented row', '✅', 'a/b.test.ts']]);
    expect(evaluateParent(p, doc).findings.map((f) => f.verdict)).toContain('SET_MISMATCH');
  });

  test('a valid exemption waives the table (emission), AV still owed', () => {
    const p = parent(tasksWith(['criterion A'], '\n  **Primary Artifacts:**\n  - scripts/out.ts\n'));
    const doc = parseCompletionDoc(
      'Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)\n',
      'd.md'
    );
    const r = evaluateParent(p, doc);
    expect(r.emissions.map((e) => e.kind)).toContain('exemption-honored');
    expect(r.findings.map((f) => f.verdict)).toContain('AV_MISSING_OR_MALFORMED');
    expect(r.findings.map((f) => f.verdict)).not.toContain('SET_MISMATCH');
  });
});

describe('population and modes (Req 6.2; DD2)', () => {
  test('resolveMode: declaration governs; undeclared post-ratification is non-compliant; else legacy', () => {
    expect(resolveMode('per-parent', undefined, '2026-09-19')).toBe('per-parent');
    expect(resolveMode('spec-level', '2026-09-25', '2026-09-19')).toBe('spec-level');
    expect(resolveMode(undefined, '2026-09-25', '2026-09-19')).toBe('non-compliant-no-declaration');
    expect(resolveMode(undefined, '2026-08-01', '2026-09-19')).toBe('legacy');
    // day granularity cannot order same-day events → legacy (DD2's residual)
    expect(resolveMode(undefined, '2026-09-19', '2026-09-19')).toBe('legacy');
  });

  test('spec-level and legacy specs produce no parent evaluations', () => {
    const tasks = parseTasksMd(HEADER + '- [x] 1. T\n  **Success Criteria:**\n  - c\n', 's');
    for (const mode of ['spec-level', 'legacy'] as const) {
      const r = evaluateSpec(tasks, mode, () => undefined);
      expect(r.parents).toEqual([]);
      expect(r.findings).toEqual([]);
    }
  });

  test('the association manifest names every associated block (Req 2.4.2)', () => {
    const tasks = parseTasksMd(
      HEADER + '- [ ] 1. A\n  **Success Criteria:**\n  - c1\n\n- [ ] 2. B\n  **Success Criteria:**\n  - c2\n',
      's'
    );
    const r = evaluateSpec(tasks, 'per-parent', () => undefined);
    expect(r.associations).toEqual(['parent 1 ← block at line 4', 'parent 2 ← block at line 8']);
  });

  test('an unticked parent is not evaluated', () => {
    const tasks = parseTasksMd(HEADER + '- [ ] 1. T\n  **Success Criteria:**\n  - c\n', 's');
    const r = evaluateSpec(tasks, 'per-parent', () => undefined);
    expect(r.parents).toEqual([]);
  });
});

describe('CATALOG CONFORMANCE — every loud string equals its design-table row', () => {
  test('declared per-parent, block not found', () => {
    const tasks = parseTasksMd(HEADER + '- [x] 2. No block here\n', 's');
    const r = evaluateSpec(tasks, 'per-parent', () => docWith([['x', '✅', 'a/b.ts']]));
    expect(r.parents[0].findings.map((f) => f.message)).toContain(
      'declared per-parent, block not found for parent 2'
    );
  });

  test("'none' co-occurs with criteria", () => {
    const tasks = parseTasksMd(
      HEADER + '- [x] 2. T\n  **Success Criteria:** none — why\n  - but a criterion\n',
      's'
    );
    expect(tasks.malformations.map((m) => m.message)).toContain(
      "malformed criteria block: 'none' co-occurs with criteria (parent 2)"
    );
  });

  test('two criteria blocks associate to one parent', () => {
    const tasks = parseTasksMd(
      HEADER + '- [x] 2. T\n  **Success Criteria:**\n  - a\n  **Success Criteria:**\n  - b\n',
      's'
    );
    expect(tasks.malformations.map((m) => m.message)).toContain(
      'malformed association: two criteria blocks associate to parent 2 (lines 4, 6)'
    );
  });

  test('criteria block precedes every checkbox', () => {
    const tasks = parseTasksMd('**Success Criteria:**\n- floating\n', 's');
    expect(tasks.malformations.map((m) => m.message)).toContain(
      'malformed association: criteria block at line 1 precedes every checkbox'
    );
  });

  test('free-prose exemption near-miss (literal embedded — Lina R1/A-6)', () => {
    const p = parent(tasksWith(['criterion A']));
    const doc = parseCompletionDoc('Criteria fidelity: exempt, in flight (2026-09-19)\n', 'd.md');
    expect(evaluateParent(p, doc).findings.map((f) => f.message)).toContain(
      "non-compliant exemption: not the fixed string 'Criteria fidelity: exempt — spec in flight at ratification (<date>)' (parent 2)"
    );
  });

  test('free-prose deferral near-miss', () => {
    const p = parent(tasksWith(['criterion A'], '\n  **Primary Artifacts:**\n  - docs/guide.md\n'));
    const doc = docWith(
      [['criterion A', '✅', 'a/b.test.ts']],
      {
        av:
          '\n### Additional verification\n\nPrimary Artifacts: all shipped as declared\n\nArtifact deferred until U3: docs/guide.md\n',
      }
    );
    expect(evaluateParent(p, doc).findings.map((f) => f.message)).toContain(
      "malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'"
    );
  });

  test('post-ratification file without a declaration', () => {
    const tasks = parseTasksMd('- [x] 1. T\n', 's');
    const r = evaluateSpec(tasks, 'non-compliant-no-declaration', () => undefined);
    expect(r.findings.map((f) => f.message)).toContain(
      'non-compliant tasks.md: authored post-ratification without a criteria-mode declaration'
    );
  });

  test('material amendment without declaration (canonical-form diff attached)', () => {
    const base = '- [ ] 1. T\n  **Success Criteria:**\n  - all platforms verified\n';
    const head = '- [ ] 1. T\n  **Success Criteria:**\n  - web platform verified\n';
    const f = evaluateAmendment(base, head);
    expect(f?.verdict).toBe('MATERIAL_AMENDMENT_WITHOUT_DECLARATION');
    expect(f?.message.split('\n')[0]).toBe(
      'material amendment without criteria-mode declaration (canonical-form diff attached)'
    );
    expect(f?.message).toContain('base:');
    expect(f?.message).toContain('head:');
  });

  test('amendment duty: declaration added in the same change is the opt-in path (no red)', () => {
    const base = '- [ ] 1. T\n  **Success Criteria:**\n  - all platforms verified\n';
    const head =
      '**Criteria mode**: per-parent\n\n- [ ] 1. T\n  **Success Criteria:**\n  - web platform verified\n';
    expect(evaluateAmendment(base, head)).toBeUndefined();
  });

  test('ticked parent, no completion doc — the named EMISSION, not red', () => {
    const p = parent(tasksWith(['criterion A']));
    const r = evaluateParent(p, undefined);
    expect(r.findings).toEqual([]);
    expect(r.emissions[0].kind).toBe('completion-doc-not-found');
    expect(DOC_NOT_FOUND_EMISSION).toBe(
      "completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)"
    );
    expect(r.emissions[0].detail).toContain(DOC_NOT_FOUND_EMISSION);
  });

  test('ratification record unresolvable — LOUD RED, never green (B-2)', () => {
    const missing = parseRatificationRecord(undefined, RATIFICATION_BALLOT_PATH);
    expect(missing).toEqual({
      verdict: 'RATIFICATION_RECORD_UNRESOLVABLE',
      message: `cannot resolve ratification record at ${RATIFICATION_BALLOT_PATH}`,
    });
    const noLine = parseRatificationRecord('# Ballot\n\nStatus: RATIFIED\n', 'p.md');
    expect(noLine).toMatchObject({ verdict: 'RATIFICATION_RECORD_UNRESOLVABLE' });
    const ambiguous = parseRatificationRecord(
      'Ratified-machine: 2026-09-19\nRatified-machine: 2026-09-20\n',
      'p.md'
    );
    expect(ambiguous).toMatchObject({ verdict: 'RATIFICATION_RECORD_UNRESOLVABLE' });
    const valid = parseRatificationRecord(
      'preamble\n\nRatified-machine: 2026-09-19\n\nbody\n',
      'p.md'
    );
    expect(valid).toEqual({ date: '2026-09-19' });
    // the machine line must stand ALONE on its line — a table cell or prose
    // carrying the words cannot match the anchored regex
    const embedded = parseRatificationRecord(
      '| `Ratified-machine: 2026-09-19` | cell |\n',
      'p.md'
    );
    expect(embedded).toMatchObject({ verdict: 'RATIFICATION_RECORD_UNRESOLVABLE' });
  });
});

describe('the fixture coverage floor (C7/B-8)', () => {
  test('uncoveredClasses returns exactly the classes with zero fixtures', () => {
    expect(uncoveredClasses(['drop', 'reword'], ['drop'])).toEqual(['reword']);
    expect(uncoveredClasses(['drop'], ['drop', 'drop'])).toEqual([]);
  });
});
