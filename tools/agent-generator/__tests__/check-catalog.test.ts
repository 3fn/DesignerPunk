/**
 * check-catalog.test.ts — Spec 123 Task 13: the nine re-grounding refusals, COUNT ASSERTED.
 *
 * Task 13's criterion names nine checks, each with a named test, a recorded bite and its exact
 * string, and "Count asserted." This asserts the registry holds exactly those nine, with the
 * exact strings of design.md § "Error Handling — the loud-failure catalog", and the 13.1 split.
 * Each check's named test and bite are its subtask's evidence, not this file's.
 */

import { fillTemplate, NINE_CHECKS, nineCheck, REJECTED_TERM_MESSAGE } from '../regrounding/check-catalog';

describe('the nine re-grounding checks (Task 13)', () => {
  it('registers exactly nine checks — count asserted', () => {
    expect(NINE_CHECKS).toHaveLength(9);
    expect(NINE_CHECKS.map((c) => c.id)).toEqual([
      'orphaned-key',
      'missing-row',
      'wrong-confirmer',
      'wrong-signer',
      'stale-signature',
      'bare-signature',
      'stale-overlay',
      'item-text-not-verbatim',
      'repo-bound-in-entirety',
    ]);
  });

  it('carries the design catalog strings verbatim', () => {
    const t = Object.fromEntries(NINE_CHECKS.map((c) => [c.id, c.template]));
    expect(t['orphaned-key']).toBe('disposition/overlay key <k> names nothing in <file> — the unit was renamed or removed; re-key or delete the row');
    expect(t['missing-row']).toBe("<unit|entry> in <file> has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)");
    expect(t['wrong-confirmer']).toBe('operative set for <file> declares confirmer <x>; the C1 rule requires <y>');
    expect(t['wrong-signer']).toBe('signature on <anchor> is by <x>; the C1 rule requires <y> (owner <o>, profile author <p>)');
    expect(t['stale-signature']).toBe('signature on <anchor> is stale — its canonical or rendered content changed since signing; re-sign or refuse');
    expect(t['bare-signature']).toBe('signature on <anchor> carries no itemized assent — list the surviving item ids or refuse');
    expect(t['stale-overlay']).toBe(
      'overlay for <anchor|entry> re-grounds canonical text sha256:<pinned>, but the current canonical is sha256:<now> — re-author the overlay; refusing to derive'
    );
    expect(t['item-text-not-verbatim']).toBe(
      'operative item <id> in <file>: text is not a verbatim substring of canonical unit <anchor> — re-confirm with the complete canonical text'
    );
    expect(t['repo-bound-in-entirety']).toBe(REJECTED_TERM_MESSAGE);
  });

  it('records the 13.1 split: 13.5 (Lina) orphan + missing row; the other seven Thurgood', () => {
    const split = Object.fromEntries(NINE_CHECKS.map((c) => [c.id, `${c.subtask} ${c.owner}`]));
    expect(split).toEqual({
      'orphaned-key': '13.5 lina',
      'missing-row': '13.5 lina',
      'wrong-confirmer': '13.3 thurgood',
      'wrong-signer': '13.3 thurgood',
      'stale-signature': '13.2 thurgood',
      'bare-signature': '13.2 thurgood',
      'stale-overlay': '13.2 thurgood',
      'item-text-not-verbatim': '13.3 thurgood',
      'repo-bound-in-entirety': '13.1 thurgood',
    });
  });

  it('fills templates strictly', () => {
    expect(fillTemplate(nineCheck('wrong-confirmer').template, { file: 'f.yaml', x: 'lina', y: 'stacy' })).toBe(
      'operative set for f.yaml declares confirmer lina; the C1 rule requires stacy'
    );
    expect(fillTemplate(nineCheck('missing-row').template, { 'unit|entry': '#a', file: 'f.md' })).toBe(
      "#a in f.md has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)"
    );
    expect(() => fillTemplate(nineCheck('wrong-confirmer').template, { file: 'f', x: 'a' })).toThrow('<y> has no value');
    expect(() => fillTemplate(nineCheck('bare-signature').template, { anchor: '#a', extra: 'z' })).toThrow('unused template vars: extra');
  });
});
