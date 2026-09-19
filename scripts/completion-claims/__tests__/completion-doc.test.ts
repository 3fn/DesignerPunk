/**
 * completion-doc.test.ts — the completion-doc parser (Spec 127, design C3;
 * Reqs 1.1–1.5): table parsing, deferral form incl. `->`, exemption
 * near-misses, doc location by the glob family, evidence-kind heuristic.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  parseCompletionDoc,
  locateCompletionDocs,
  classifyEvidence,
} from '../completion-doc';

const DOC = `# Task 2 Completion

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| first criterion | ✅ | scripts/completion-claims/normalize.ts |
| second criterion with \\| escaped pipe | ⚠️ | normalize.test.ts |
| third criterion | ❌ | \`npm test\` → 0 failures in the six suites |

Unmet or partially met criteria: second criterion — follow-up at .kiro/issues/x.md

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| \`npm test\` green on the branch | ✅ | \`npm test\` → green |
| annotation-only row | — | not a claim |

Primary Artifacts: all shipped as declared

Artifact deferred: docs/guide.md → U3 (the documentation unit)
Artifact deferred: dist/out.css -> U2
`;

describe('criteria table parsing', () => {
  const doc = parseCompletionDoc(DOC, 'x.md');

  test('parses three-column rows with statuses', () => {
    expect(doc.rows).toHaveLength(3);
    expect(doc.rows.map((r) => r.status)).toEqual(['✅', '⚠️', '❌']);
  });

  test('preserves escaped pipes for the normalization to unescape', () => {
    expect(doc.rows[1].criterion).toContain('\\|');
  });

  test('finds the forced-negative line by exact prefix', () => {
    expect(doc.forcedNegative).toMatch(/^Unmet or partially met criteria:/);
  });

  test('AV section: gate rows split from the criteria table', () => {
    expect(doc.av?.present).toBe(true);
    expect(doc.av?.gateRows).toHaveLength(2);
  });

  test('an em-dash Status row claims no verdict (annotation row, non-claiming)', () => {
    const annotation = doc.av!.gateRows[1];
    expect(annotation.status).toBe('—');
    expect(annotation.claiming).toBe(false);
    expect(doc.av!.gateRows[0].claiming).toBe(true);
  });

  test('finds the Primary Artifacts forced-negative line', () => {
    expect(doc.av?.artifactLine).toBe('Primary Artifacts: all shipped as declared');
  });

  test('parses fixed-form deferrals with → and -> (DD6)', () => {
    expect(doc.av?.deferrals).toEqual([
      { path: 'docs/guide.md', unit: 'U3 (the documentation unit)' },
      { path: 'dist/out.css', unit: 'U2' },
    ]);
    expect(doc.av?.malformedDeferrals).toEqual([]);
  });
});

describe('deferral and exemption near-misses (fixed forms only)', () => {
  test('a free-prose deferral attempt is MALFORMED, never honored', () => {
    const doc = parseCompletionDoc(
      `| Criterion (verbatim) | Status | Evidence |\n|---|---|---|\n| c | ✅ | a/b.ts |\n\n### Additional verification\n\nArtifact deferred to U3: docs/guide.md (will land there)\n`,
      'x.md'
    );
    expect(doc.av?.deferrals).toEqual([]);
    expect(doc.av?.malformedDeferrals).toHaveLength(1);
  });

  test('prose merely MENTIONING deferral is not an attempted declaration', () => {
    const doc = parseCompletionDoc(
      `### Additional verification\n\nPrimary Artifacts: all shipped as declared — no artifacts were deferred\n`,
      'x.md'
    );
    expect(doc.av?.malformedDeferrals).toEqual([]);
  });

  test('the verbatim exemption string is valid', () => {
    const doc = parseCompletionDoc(
      'Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)\n',
      'x.md'
    );
    expect(doc.exemption).toBe('valid');
  });

  test('a near-miss exemption is malformed', () => {
    const doc = parseCompletionDoc(
      'Criteria fidelity: exempted because the spec was in flight (2026-09-19)\n',
      'x.md'
    );
    expect(doc.exemption).toBe('malformed');
  });

  test('no exemption text at all parses as undefined', () => {
    expect(parseCompletionDoc('# Doc\n', 'x.md').exemption).toBeUndefined();
  });
});

describe('doc location — the corpus-verified glob family (B-4)', () => {
  let dir: string;
  beforeAll(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-completion-'));
    fs.mkdirSync(path.join(dir, 'completion'));
    for (const f of [
      'task-2-completion.md',
      'task-2-parent-completion.md',
      'task-2-thurgood-completion.md',
      'task-2a-completion.md',
      'task-2-3-completion.md', // SUBTASK — must not match parent 2
      'task-23-completion.md', // different parent — must not match parent 2
      'task-3-completion.md',
    ]) {
      fs.writeFileSync(path.join(dir, 'completion', f), '# stub\n');
    }
  });
  afterAll(() => fs.rmSync(dir, { recursive: true, force: true }));

  test('matches the dominant, parent-suffixed, agent-suffixed, and letter-suffixed forms', () => {
    const found = locateCompletionDocs(dir, '2').map((f) => path.basename(f));
    expect(found).toEqual([
      'task-2-completion.md',
      'task-2-parent-completion.md',
      'task-2-thurgood-completion.md',
      'task-2a-completion.md',
    ]);
  });

  test('a numeric suffix is a subtask doc, never a parent match', () => {
    const found = locateCompletionDocs(dir, '2').map((f) => path.basename(f));
    expect(found).not.toContain('task-2-3-completion.md');
    expect(found).not.toContain('task-23-completion.md');
  });

  test('empty for a parent with no docs, and for a spec with no completion dir', () => {
    expect(locateCompletionDocs(dir, '9')).toEqual([]);
    expect(locateCompletionDocs(path.join(dir, 'nowhere'), '1')).toEqual([]);
  });
});

describe('evidence-kind classification — the stated heuristic (C3, Lina R1)', () => {
  test('path: slash path, or bare repo filename with line anchor', () => {
    expect(classifyEvidence('scripts/completion-claims/verdict.ts')).toBe('path');
    expect(classifyEvidence('See `Process-Spec-Planning.md:2134` for the triple')).toBe('path');
    expect(classifyEvidence('tasks.md:13–19 diffed against the canonical form')).toBe('path');
  });

  test('test: suite path, __tests__ path, or npm-test-family command', () => {
    expect(classifyEvidence('normalize.test.ts')).toBe('test');
    expect(classifyEvidence('src/__tests__/foo.test.ts')).toBe('test');
    expect(classifyEvidence('`npm test` → all suites green')).toBe('test');
  });

  test('command: shell invocation with a result clause', () => {
    expect(classifyEvidence('`grep -c pattern file` → 2')).toBe('command');
    expect(classifyEvidence('npx tsx scripts/foo.ts exits 0')).toBe('command');
  });

  test('decision-record: ballot path, PR + date, review citation, feedback stamp', () => {
    expect(classifyEvidence('.kiro/docs/ballots/2026-09-19-x.md § 7')).toBe('decision-record');
    expect(classifyEvidence('Approved in PR #123 review comment (2026-09-15)')).toBe('decision-record');
    expect(classifyEvidence('Independently confirmed at review: "all elements present"')).toBe('decision-record');
    expect(classifyEvidence('feedback/design.md § [THURGOOD R1]')).toBe('decision-record');
  });

  test('empty-or-prose: empty cells and activity prose', () => {
    expect(classifyEvidence('')).toBe('empty-or-prose');
    expect(classifyEvidence('   ')).toBe('empty-or-prose');
    expect(classifyEvidence('Implemented the module and made sure it works')).toBe('empty-or-prose');
    expect(classifyEvidence('Created complete directory structure')).toBe('empty-or-prose');
  });
});
