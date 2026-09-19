/**
 * tasks-md.test.ts — the tasks.md parser (Spec 127, design C2; Reqs 2.1, 2.2,
 * 2.4): all three parent forms, the 054a falsifier, declared-none,
 * malformations, promise blocks, units-block precedence.
 */

import { parseTasksMd, parentId } from '../tasks-md';

const HEADER = '# Plan\n\n**Criteria mode**: per-parent\n\n';

describe('mode declaration (Req 2.1)', () => {
  test('reads per-parent from the header block', () => {
    expect(parseTasksMd(HEADER + '- [ ] 1. A task\n').declaredMode).toBe('per-parent');
  });
  test('reads spec-level', () => {
    expect(
      parseTasksMd('**Criteria mode**: spec-level\n\n- [ ] 1. A task\n').declaredMode
    ).toBe('spec-level');
  });
  test('absent declaration parses as undefined (mode resolution needs dates)', () => {
    expect(parseTasksMd('# Plan\n\n- [ ] 1. A task\n').declaredMode).toBeUndefined();
  });
  test('a declaration AFTER the first checkbox is not a header declaration', () => {
    expect(
      parseTasksMd('- [ ] 1. A task\n\n**Criteria mode**: per-parent\n').declaredMode
    ).toBeUndefined();
  });
});

describe('parent-line forms (Req 2.4.1 — recognition classifies, nothing more)', () => {
  test('plain-numbered', () => {
    const f = parseTasksMd(HEADER + '- [x] 1. Build the thing\n');
    expect(f.parents).toHaveLength(1);
    expect(f.parents[0]).toMatchObject({ form: 'plain', number: '1', ticked: true });
  });
  test('bold-numbered', () => {
    const f = parseTasksMd(HEADER + '- [ ] **2. Build the other thing**\n');
    expect(f.parents[0]).toMatchObject({ form: 'bold', number: '2', ticked: false });
  });
  test('Task N: … (Parent) label form', () => {
    const f = parseTasksMd(HEADER + '- [x] Task 3: Wire the pipeline (Parent)\n');
    expect(f.parents[0]).toMatchObject({ form: 'task-label', number: '3' });
  });
  test('letter-suffixed numbers (task 2a)', () => {
    const f = parseTasksMd(HEADER + '- [ ] 2a. Amendment task\n');
    expect(f.parents[0]).toMatchObject({ form: 'plain', number: '2a' });
  });
  test('the 054a falsifier: an unnumbered top-level checkbox associates like any other', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] Ship it without a number\n' +
        '  **Success Criteria:**\n' +
        '  - it ships\n'
    );
    expect(f.parents).toHaveLength(1);
    expect(f.parents[0].form).toBe('other');
    expect(f.parents[0].criteria).toEqual(['it ships']);
  });
  test('an indented checkbox is a subtask, never a parent', () => {
    const f = parseTasksMd(HEADER + '- [ ] 1. Parent\n  - [ ] 1.1 Subtask\n');
    expect(f.parents).toHaveLength(1);
  });
});

describe('criteria blocks (Req 2.2)', () => {
  test('frozen label + flat bullets, continuation lines folded', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Build\n\n' +
        '  **Success Criteria:**\n' +
        '  - first criterion\n' +
        '  - second criterion that wraps\n' +
        '    onto a second line\n'
    );
    expect(f.parents[0].criteria).toEqual([
      'first criterion',
      'second criterion that wraps onto a second line',
    ]);
    expect(f.parents[0].criteriaBlockLine).toBe(7);
  });

  test('declared-none with mandatory reason (Req 2.2.4)', () => {
    const f = parseTasksMd(
      HEADER + '- [x] 1. Coordinate\n  **Success Criteria:** none — coordination-only task\n'
    );
    expect(f.parents[0].criteria).toEqual({ none: true, reason: 'coordination-only task' });
  });

  test("none + bullets is a loud malformation (Req 2.2.3) with the catalog string", () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Coordinate\n' +
        '  **Success Criteria:** none — no reason to have these\n' +
        '  - but here is a criterion anyway\n'
    );
    expect(f.malformations.map((m) => m.message)).toContain(
      "malformed criteria block: 'none' co-occurs with criteria (parent 1)"
    );
  });

  test('two criteria blocks on one parent is a loud malformation with lines named', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Build\n' +
        '  **Success Criteria:**\n' +
        '  - a criterion\n' +
        '  **Success Criteria:**\n' +
        '  - another block\n'
    );
    expect(f.malformations.map((m) => m.message)).toContain(
      'malformed association: two criteria blocks associate to parent 1 (lines 6, 8)'
    );
  });

  test('a criteria block before any checkbox is a loud malformation', () => {
    const f = parseTasksMd('**Success Criteria:**\n- floating criterion\n');
    expect(f.malformations.map((m) => m.message)).toContain(
      'malformed association: criteria block at line 1 precedes every checkbox'
    );
  });

  test('a block after a SUBTASK associates to the subtask — the parent keeps nothing (BLOCKING-1 shape)', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Parent\n' +
        '  - [x] 1.1 Subtask\n' +
        '  **Success Criteria:**\n' +
        '  - criterion that belongs to nobody at parent grain\n'
    );
    expect(f.parents[0].criteria).toEqual([]);
    expect(f.parents[0].criteriaBlockLine).toBeUndefined();
  });
});

describe('promise blocks (Req 1.5 closed vocabulary)', () => {
  test('Primary Artifacts paths extract from anywhere in the bullet (Ada R1 sentence form)', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Build\n' +
        '  **Success Criteria:**\n' +
        '  - done\n\n' +
        '  **Primary Artifacts:**\n' +
        '  - scripts/completion-claims/normalize.ts\n' +
        '  - Generated CSS output validated at `dist/css/tokens.css` (spot-checked)\n' +
        '  - package.json (modified)\n' +
        '  - a promise with no path in it at all\n'
    );
    const arts = f.parents[0].primaryArtifacts;
    expect(arts[0].path).toBe('scripts/completion-claims/normalize.ts');
    expect(arts[1].path).toBe('dist/css/tokens.css');
    expect(arts[2].path).toBe('package.json');
    expect(arts[3].notAPath).toBe(true);
  });

  test('Merge gate bullets collect as conditions', () => {
    const f = parseTasksMd(
      HEADER +
        '- [x] 1. Build\n' +
        '  **Success Criteria:**\n' +
        '  - done\n\n' +
        '  **Merge gate:**\n' +
        '  - `npm test` green on the branch\n' +
        '  - diff-guard reports clean\n'
    );
    expect(f.parents[0].mergeGate).toEqual([
      '`npm test` green on the branch',
      'diff-guard reports clean',
    ]);
  });
});

describe('units-block recognition — strict precedence order (C2.5, B-7)', () => {
  test('canonical heading wins', () => {
    const f = parseTasksMd('## Declared Merge Units (reviewed at the tasks round)\n\n| U |\n');
    expect(f.unitsBlock?.form).toBe('canonical-heading');
  });
  test("122's bold-prose form recognized at arm 2", () => {
    const f = parseTasksMd('**Merge units (the merge-on-coherent-unit structure).** Eleven units.\n');
    expect(f.unitsBlock?.form).toBe('bold-prose');
  });
  test('arm 3 only fires when neither higher arm matched — the 122 false-match guard', () => {
    const withBoth =
      '**Merge units (structure).** Eleven units.\n\n' +
      '## Group 2 — Per-agent cutovers (each cutover = one merge unit = one PR)\n';
    expect(parseTasksMd(withBoth).unitsBlock?.form).toBe('bold-prose');
    const onlyHeading = '## Group 2 — Per-agent cutovers (each cutover = one merge unit = one PR)\n';
    expect(parseTasksMd(onlyHeading).unitsBlock?.form).toBe('merge-unit-heading');
  });
});

describe('parentId', () => {
  test('numbered parents use the written number; unnumbered fall back to the line', () => {
    const f = parseTasksMd(HEADER + '- [ ] 7. Numbered\n- [ ] Unnumbered top-level\n');
    expect(parentId(f.parents[0])).toBe('7');
    expect(parentId(f.parents[1])).toBe(`at line ${f.parents[1].line}`);
  });
});
