/**
 * edit-kind-pointers.test.ts — the eleven falsification fixtures of ballot
 * .kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md § 5
 * (Stacy R1 S2, nine; Ada R1 A3 and R2, two). Each fixture is a committed case with its
 * expected token, named by number. The gh/git reads go through a fake Adapter: no test
 * calls gh, and none reads a credential.
 *
 * Exercises: scripts/completion-claims/edit-kind-pointers.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  Adapter,
  AddedLine,
  evaluate,
  formatReport,
  judge,
  main,
  parseAddedLines,
  parseEditKindLines,
  run,
} from '../edit-kind-pointers';

/** #541's L400 line of canonical/agents/stacy.md, as it stood at 52f874275. */
const L400_AT_541 = "| **RELEASE** | **Two phases, one record**: phase 1 on the release squash S, before the tag; phase 2 at the merge of the step-6 release-record PR | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source**. **Non-negotiable.** Paired with the release-step condition: the checklist runs the owed-set query and pastes its output, and carries Q2 guard (i)'s arming line. Phase 1 also carries the `release-falsity-floor` read (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7). What phase 1 reads, and at which SHA, is RELEASE-FLOW step 6's Phase 1 bullet, not restated here *(amended 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, site 12; prior text at `08b9c7a8e`)*. Your record's lines: per floor-class row, one line — the walk-record line (record path, `main at:` SHA); for a row carried or read as not false at its reader, the citation of Peter's dated answer (quoted words, dated before the walk PR's `mergedAt`), a row without one being a finding routed to Peter; and your re-check of the surface at S (`git show S:<path>`: fixed, disclosed where its reader meets it, or still false under the cited waiver), or `not re-verified — <why>` (this read's own negative, outside the criterion-row vocabulary). A read, never a gate. Phase 1 also carries the governance-examples read (the counting block; ballot 2026-10-26-governance-examples-guard § 2.4). Phase 2 reads the committed step-6 record — the rail result and the two-registry record (each registry's time[<v>], file count and sha1, equal to the publish script's recorded sha1) — against the published bytes; until it does, the record reads publish-rail liveness: owed. Drafted against the open record PR, it ends with the merge-confirmation line. | Stacy |";
/** governance/Token-Governance.md L177 at 85b60226e: the moved-text pointer with no date of its own. */
const TG_L177 = "Component tokens must either reference an existing primitive token OR conform to how that primitive token family's values are defined. Never introduce arbitrary values at the component level that don't align with the underlying token family's value system. *(Moved verbatim from Core Goals § \"Development Practices\" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*";

const added = (...texts: string[]): AddedLine[] => texts.map((text, i) => ({ line: i + 1, text }));
const verdictOf = (body: string, path: string, lines: AddedLine[]) =>
  evaluate(body, new Map([[path, lines]])).results.map((r) => r.verdict);

describe('edit-kind-pointers — the § 5 falsification fixtures', () => {
  test('fixture 1: EXECUTION on a bound path with no pointer → listed', () => {
    const body = '**Edit kind**: governance/Token-Governance.md — EXECUTION (ballot x § 3 site 2)';
    expect(verdictOf(body, 'governance/Token-Governance.md', added('a plain added line'))).toEqual(['listed']);
  });

  test('fixture 2: register CORRECTION adding a history line → ok; editing rule: with no history line → pointer-missing', () => {
    const body = '**Edit kind**: governance/classification-map.md — CORRECTION (.kiro/issues/r.md; truth: x)';
    const history = '  - { date: 2026-10-28, change: "CORRECTION (…)", by: thurgood }';
    expect(verdictOf(body, 'governance/classification-map.md', added(history))).toEqual(['ok']);
    expect(verdictOf(body, 'governance/classification-map.md', added('rule: "a reworded rule"'))).toEqual(['pointer-missing']);
  });

  test('fixture 3: a bound-path LAW with no pointer → pointer-missing', () => {
    const body = '**Edit kind**: .kiro/steering/core-goals.md — LAW (.kiro/docs/ballots/b.md)';
    expect(verdictOf(body, '.kiro/steering/core-goals.md', added('- **New rule**: text, no pointer'))).toEqual([
      'pointer-missing',
    ]);
  });

  test("fixture 4: an exempt-path line with a pointer (#541's L400 line) → pointer-on-exempt; an exempt-path CORRECTION without one → ok", () => {
    const law = '**Edit kind**: canonical/agents/stacy.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)';
    expect(verdictOf(law, 'canonical/agents/stacy.md', added(L400_AT_541))).toEqual(['pointer-on-exempt']);
    const corr = '**Edit kind**: canonical/shared/shared-catalog.yaml — CORRECTION (.kiro/issues/r.md; truth: x)';
    expect(verdictOf(corr, 'canonical/shared/shared-catalog.yaml', added('a corrected line, no pointer'))).toEqual(['ok']);
  });

  test('fixture 5: a pointer outside L<a>–<b> → pointer-missing; inside it → ok; en dash and hyphen', () => {
    const lines: AddedLine[] = [
      { line: 10, text: 'changed text *(amended 2026-10-29 by ballot b, item 1; prior text at `abc`)*' },
      { line: 40, text: 'other changed text' },
    ];
    for (const dash of ['–', '-']) {
      const outside = `**Edit kind**: governance/a.md L30${dash}45 — LAW (ballot b)`;
      const inside = `**Edit kind**: governance/a.md L5${dash}12 — LAW (ballot b)`;
      expect(verdictOf(outside, 'governance/a.md', lines)).toEqual(['pointer-missing']);
      expect(verdictOf(inside, 'governance/a.md', lines)).toEqual(['ok']);
    }
  });

  test('fixture 6: a bound file that already carries pointers elsewhere, edited without adding one → pointer-missing', () => {
    const diff = [
      'diff --git a/governance/a.md b/governance/a.md',
      '--- a/governance/a.md',
      '+++ b/governance/a.md',
      '@@ -3,3 +3,3 @@',
      ' kept context *(Amended 2026-10-01 by ballot old, item 2; prior text at `111`)*',
      '-an old line *(amended 2026-10-02 by ballot old2, item 1; prior text at `222`)*',
      '+the new line, no pointer',
      ' more context',
    ].join('\n');
    const lines = parseAddedLines(diff);
    expect(lines).toEqual([{ line: 4, text: 'the new line, no pointer' }]);
    expect(verdictOf('**Edit kind**: governance/a.md — LAW (ballot b)', 'governance/a.md', lines)).toEqual(['pointer-missing']);
  });

  test('fixture 7: an added line quoting a pointer inside backticks → ok (the check is lexical)', () => {
    const body = '**Edit kind**: governance/a.md — LAW (ballot b)';
    const quoted = 'The form is `*(amended 2026-10-29 by ballot <ballot> <item>; prior text at <SHA>)*`.';
    expect(verdictOf(body, 'governance/a.md', added(quoted))).toEqual(['ok']);
  });

  test('fixture 8: no credentials → exactly one unavailable line, exit 0, no count line, no secret text', () => {
    const SECRET = 'ghp_exampleSecretTokenValue';
    const failing: Adapter = {
      prView() {
        throw new Error(`HTTP 401: Bad credentials (token ${SECRET})`);
      },
      range() {
        throw new Error('unreached');
      },
      diff() {
        throw new Error('unreached');
      },
    };
    let out = '';
    const code = main(['--pr', '541'], failing, (s) => {
      out += s;
    });
    expect(code).toBe(0);
    const lines = out.trimEnd().split('\n');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatch(/^edit-kind-pointers: unavailable \(.+\) — continue$/);
    expect(out).not.toContain(SECRET);
    expect(out).not.toMatch(/declared —/);
  });

  test('fixture 9: two lines for one file (parts of different kinds) → each judged on its own range', () => {
    const body = [
      '**Edit kind**: governance/a.md L1–5 — EXECUTION (ballot b § 3 site 1)',
      '**Edit kind**: governance/a.md L20–25 — LAW (ballot b)',
    ].join('\n');
    const lines: AddedLine[] = [
      { line: 2, text: 'executed text, no pointer' },
      { line: 21, text: 'new law *(added 2026-10-29 by ballot b, item 2)*' },
    ];
    expect(verdictOf(body, 'governance/a.md', lines)).toEqual(['listed', 'ok']);
    const noPointer: AddedLine[] = [
      { line: 2, text: 'executed text *(added 2026-10-29 by ballot b, item 1)*' },
      { line: 21, text: 'new law, no pointer' },
    ];
    expect(verdictOf(body, 'governance/a.md', noPointer)).toEqual(['listed', 'pointer-missing']);
  });

  test("fixture 10: Token Governance L177's moved-text form → pointer-missing; with a date (moved 2026-10-25 …) → ok", () => {
    const body = '**Edit kind**: governance/Token-Governance.md — LAW (ballot b)';
    expect(TG_L177).toContain('*(Moved verbatim from');
    expect(verdictOf(body, 'governance/Token-Governance.md', added(TG_L177))).toEqual(['pointer-missing']);
    const dated = TG_L177.replace('*(Moved verbatim from', '*(moved 2026-10-25 from');
    expect(verdictOf(body, 'governance/Token-Governance.md', added(dated))).toEqual(['ok']);
  });

  test('fixture 11: a pointer naming a dated ballot with no date of its own → pointer-missing', () => {
    const body = '**Edit kind**: governance/a.md — LAW (ballot b)';
    const line = 'text *(amended by ballot 2026-10-26-release-flow-batch-16-1, site 3; prior text at `08b9c7a8e`)*';
    expect(verdictOf(body, 'governance/a.md', added(line))).toEqual(['pointer-missing']);
  });
});

describe('edit-kind-pointers — grammar, unlisted paths and the report', () => {
  test('a declared path the rule does not reach → unlisted-path', () => {
    expect(judge({ path: '.kiro/docs/ballots/README.md', kind: 'LAW' }, added('x'))).toBe('unlisted-path');
  });

  test('backticked paths and list-item lines parse; an unparseable line is counted, never judged', () => {
    const body = [
      '- `**Edit kind**: governance/a.md — CORRECTION (.kiro/issues/r.md; truth: x)`',
      '**Edit kind**: `canonical/agents/ada.md` — LAW (ballot b)',
      '**Edit kind**: something malformed',
    ].join('\n');
    const p = parseEditKindLines(body);
    expect(p.declarations.map((d) => [d.path, d.kind])).toEqual([
      ['governance/a.md', 'CORRECTION'],
      ['canonical/agents/ada.md', 'LAW'],
    ]);
    expect(p.unparsed).toHaveLength(1);
  });

  test('run() over a fake adapter prints one line per declaration, then the counts', () => {
    const fake: Adapter = {
      prView: () => ({
        body: '**Edit kind**: governance/a.md — LAW (ballot b)\n**Edit kind**: governance/b.md — EXECUTION (ballot b § 2)',
        baseRefOid: 'base',
        headRefOid: 'head',
        mergeCommit: { oid: 'merge' },
      }),
      range: () => ({ from: 'merge^1', to: 'merge' }),
      diff: (_f, _t, p) =>
        p === 'governance/a.md' ? '@@ -1,0 +1,1 @@\n+law *(amended 2026-10-29 by ballot b, item 1; prior text at `x`)*' : '',
    };
    expect(run(1, fake)).toEqual([
      'governance/a.md\tLAW\tok',
      'governance/b.md\tEXECUTION\tlisted',
      'edit-kind-pointers: 2 declared — ok 1, pointer-missing 0, pointer-on-exempt 0, listed 1, unlisted-path 0; none 0; unparsed 0',
    ]);
    expect(formatReport({ results: [], unparsed: [], none: 0 })).toEqual([
      'edit-kind-pointers: 0 declared — ok 0, pointer-missing 0, pointer-on-exempt 0, listed 0, unlisted-path 0; none 0; unparsed 0',
    ]);
  });

  test('a bad --pr argument is one unavailable line, exit 0', () => {
    let out = '';
    expect(main(['--pr', 'abc'], undefined, (s) => (out += s))).toBe(0);
    expect(out).toBe('edit-kind-pointers: unavailable (usage: --pr <n>) — continue\n');
  });
});

/**
 * The real forms in use on main (orchestrator smoke, 2026-10-29): the declaration lines from
 * the #541, #546 and #547 PR bodies, verbatim but for abridged authorities, over #541's real
 * diffs at 52f874275 (edit-kind-pointers-real/).
 */
describe('edit-kind-pointers — the real declaration forms (#541, #546, #547)', () => {
  const REAL = path.join(__dirname, 'edit-kind-pointers-real');
  const diffOf = (name: string) => fs.readFileSync(path.join(REAL, name), 'utf8');
  const PR541 = [
    '**Edit kind**: .kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md — EXECUTION (…)',
    '**Edit kind**: .kiro/hooks/RELEASE-FLOW.md L32–L36, L42–L45, L114–L115, L157, L205–L206 — LAW (…)',
    '**Edit kind**: .kiro/hooks/RELEASE-FLOW.md L207 — CORRECTION (… § 11 [STACY site-12 read, 2026-10-29]; truth: …)',
    '**Edit kind**: governance/release-management-system.md L40 — LAW (same ballot, site 7)',
    '**Edit kind**: governance/classification-map.md L891, L900, L1223, L1227 — EXECUTION (same ballot, E2 and E4)',
    '**Edit kind**: canonical/agents/stacy.md L400, L432, L463–L465 — LAW (same ballot, sites 11–13)',
  ].join('\n');
  const adapter541: Adapter = {
    prView: () => ({ body: PR541, baseRefOid: 'b', headRefOid: 'h', mergeCommit: { oid: '52f874275' } }),
    range: () => ({ from: '52f874275^1', to: '52f874275' }),
    diff: (_f, _t, p) =>
      ({
        'canonical/agents/stacy.md': diffOf('541-stacy.md.diff'),
        '.kiro/hooks/RELEASE-FLOW.md': diffOf('541-RELEASE-FLOW.md.diff'),
        'governance/release-management-system.md': diffOf('541-release-management-system.md.diff'),
        'governance/classification-map.md': diffOf('541-classification-map.md.diff'),
      })[p] ?? '',
  };

  test('a comma-separated list of ranges and single lines parses to one declaration each', () => {
    const p = parseEditKindLines(PR541);
    expect(p.unparsed).toEqual([]);
    expect(p.declarations.filter((d) => d.path === '.kiro/hooks/RELEASE-FLOW.md').map((d) => [d.kind, d.range])).toEqual([
      ['LAW', { a: 32, b: 36 }],
      ['LAW', { a: 42, b: 45 }],
      ['LAW', { a: 114, b: 115 }],
      ['LAW', { a: 157, b: 157 }],
      ['LAW', { a: 205, b: 206 }],
      ['CORRECTION', { a: 207, b: 207 }],
    ]);
  });

  test("#541 over its real diff: stacy.md's three LAW ranges → pointer-on-exempt ×3; every bound range judged; unparsed 0", () => {
    expect(run(541, adapter541)).toEqual([
      '.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md\tEXECUTION\tlisted',
      '.kiro/hooks/RELEASE-FLOW.md L32–36\tLAW\tok',
      '.kiro/hooks/RELEASE-FLOW.md L42–45\tLAW\tok',
      '.kiro/hooks/RELEASE-FLOW.md L114–115\tLAW\tok',
      '.kiro/hooks/RELEASE-FLOW.md L157\tLAW\tok',
      '.kiro/hooks/RELEASE-FLOW.md L205–206\tLAW\tok',
      '.kiro/hooks/RELEASE-FLOW.md L207\tCORRECTION\tok',
      'governance/release-management-system.md L40\tLAW\tok',
      'governance/classification-map.md L891\tEXECUTION\tlisted',
      'governance/classification-map.md L900\tEXECUTION\tlisted',
      'governance/classification-map.md L1223\tEXECUTION\tlisted',
      'governance/classification-map.md L1227\tEXECUTION\tlisted',
      'canonical/agents/stacy.md L400\tLAW\tpointer-on-exempt',
      'canonical/agents/stacy.md L432\tLAW\tpointer-on-exempt',
      'canonical/agents/stacy.md L463–465\tLAW\tpointer-on-exempt',
      'edit-kind-pointers: 15 declared — ok 7, pointer-missing 0, pointer-on-exempt 3, listed 5, unlisted-path 0; none 0; unparsed 0',
    ]);
  });

  test('a single line with a parenthetical tag (#546 `L329 (prose)`) parses and is judged on that line', () => {
    const body = [
      '**Edit kind**: governance/DesignerPunk-Integration-Guide.md L697 — CORRECTION (…; truth: governance/Token-Governance.md § "Token Creation Governance" L171',
      '**Edit kind**: canonical/agents/leonardo.md L329 (prose) — CORRECTION (…)',
      '**Edit kind**: canonical/agents/ada.md L28 (frontmatter) — LAW (…)',
    ].join('\n');
    const p = parseEditKindLines(body);
    expect(p.unparsed).toEqual([]);
    expect(p.declarations.map((d) => [d.path, d.range, d.kind])).toEqual([
      ['governance/DesignerPunk-Integration-Guide.md', { a: 697, b: 697 }, 'CORRECTION'],
      ['canonical/agents/leonardo.md', { a: 329, b: 329 }, 'CORRECTION'],
      ['canonical/agents/ada.md', { a: 28, b: 28 }, 'LAW'],
    ]);
    const lines = new Map<string, AddedLine[]>([
      ['governance/DesignerPunk-Integration-Guide.md', [{ line: 697, text: 'x *(Corrected 2026-10-29: y; record `r`; prior text at `s`.)*' }]],
      ['canonical/agents/leonardo.md', [{ line: 329, text: 'the corrected clause, no pointer' }]],
    ]);
    expect(evaluate(body, lines).results.map((r) => r.verdict)).toEqual(['ok', 'ok', 'ok']);
  });

  test('`none owed` and `none` are recognised none lines: counted, never declared, never unparsed (#547)', () => {
    const body = [
      '**Edit kind**: none owed on this PR — no governance path is touched',
      '- **Edit kind**: none',
    ].join('\n');
    const ev = evaluate(body, new Map());
    expect(ev.results).toEqual([]);
    expect(ev.unparsed).toEqual([]);
    expect(ev.none).toBe(2);
    expect(formatReport(ev)).toEqual([
      'edit-kind-pointers: 0 declared — ok 0, pointer-missing 0, pointer-on-exempt 0, listed 0, unlisted-path 0; none 2; unparsed 0',
    ]);
  });
});
