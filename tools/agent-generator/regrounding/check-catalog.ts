/**
 * The nine re-grounding refusals — Spec 123 Task 13 (registry landed at 13.1).
 *
 * Task 13's criterion: "Nine checks, each with a named test, a recorded bite and its exact
 * string … Count asserted." This file is the ONE place the nine exact strings live, so every
 * implementing subtask (13.1–13.5) builds its message from here and the count is asserted over
 * one list (`__tests__/check-catalog.test.ts`).
 *
 * The templates are design.md § "Error Handling — the loud-failure catalog (exact strings)",
 * copied verbatim (placeholders in `<…>`). The rejected term's string is Req 11.2.2's quoted
 * text, prefixed by the term exactly as design-outline.md § "The vocabulary defect" states it
 * (the requirement's quotation begins at "not a disposition."; the catalog row says
 * "(unchanged)").
 *
 * `subtask` / `owner` record the 13.1 split (task-13-1-completion.md § "The nine-check split").
 * `test` is filled in by the subtask that lands the check's named test.
 *
 * WHAT THIS DOES NOT ESTABLISH: that any check is implemented or bites. The registry fixes the
 * strings and the count; each check's named test and recorded bite are its subtask's evidence.
 *
 * Traces to: Req 11.2.2, 11.5, 11.6.5d; design C16, C17, C22, § "Error Handling".
 */

export type NineCheckId =
  | 'orphaned-key'
  | 'missing-row'
  | 'wrong-confirmer'
  | 'wrong-signer'
  | 'stale-signature'
  | 'bare-signature'
  | 'stale-overlay'
  | 'item-text-not-verbatim'
  | 'repo-bound-in-entirety';

export interface NineCheck {
  id: NineCheckId;
  /** The Task 13 subtask that lands the check, its named test and its bite. */
  subtask: '13.1' | '13.2' | '13.3' | '13.5';
  owner: 'thurgood' | 'lina';
  /** The exact string, placeholders in `<…>`. */
  template: string;
  /** The named test (`<file> › <test name>`), once landed. */
  test?: string;
}

export const REJECTED_TERM_MESSAGE =
  '`repo-bound-in-entirety` is not a disposition. Under R5, a repo-bound section is the paradigm case for re-pointing. Choose `re-pointed`, `superseded-by`, or `no-consumer-counterpart`.';

export const NINE_CHECKS: readonly NineCheck[] = Object.freeze([
  {
    id: 'orphaned-key',
    subtask: '13.5',
    owner: 'lina',
    template:
      'disposition/overlay key <k> names nothing in <file> — the unit was renamed or removed; re-key or delete the row',
  },
  {
    id: 'missing-row',
    subtask: '13.5',
    owner: 'lina',
    template:
      "<unit|entry> in <file> has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)",
  },
  {
    id: 'wrong-confirmer',
    subtask: '13.3',
    owner: 'thurgood',
    template: 'operative set for <file> declares confirmer <x>; the C1 rule requires <y>',
    test: 'operative-set.checks.test.ts › wrong confirmer (nine-check) refuses a confirmer that is not the C1 seat, with the exact string',
  },
  {
    id: 'wrong-signer',
    subtask: '13.3',
    owner: 'thurgood',
    template: 'signature on <anchor> is by <x>; the C1 rule requires <y> (owner <o>, profile author <p>)',
    test: 'signatures.test.ts › wrong signer (nine-check) refuses a signer that is not the C1 seat, with the exact string',
  },
  {
    id: 'stale-signature',
    subtask: '13.2',
    owner: 'thurgood',
    template:
      'signature on <anchor> is stale — its canonical or rendered content changed since signing; re-sign or refuse',
    test: 'signatures.test.ts › stale signature (nine-check) refuses when either hash drifted since signing, with the exact string',
  },
  {
    id: 'bare-signature',
    subtask: '13.2',
    owner: 'thurgood',
    template: 'signature on <anchor> carries no itemized assent — list the surviving item ids or refuse',
    test: 'signatures.test.ts › bare signature (nine-check) refuses a signature with neither itemized assent nor refuse, with the exact string',
  },
  {
    id: 'stale-overlay',
    subtask: '13.2',
    owner: 'thurgood',
    template:
      'overlay for <anchor|entry> re-grounds canonical text sha256:<pinned>, but the current canonical is sha256:<now> — re-author the overlay; refusing to derive',
    test: 'overlay.test.ts › stale overlay (nine-check) refuses a pin that differs from the current canonical, with the exact string',
  },
  {
    id: 'item-text-not-verbatim',
    subtask: '13.3',
    owner: 'thurgood',
    template:
      'operative item <id> in <file>: text is not a verbatim substring of canonical unit <anchor> — re-confirm with the complete canonical text',
    test: 'operative-set.checks.test.ts › item text not verbatim (nine-check) refuses a paraphrased item, with the exact string',
  },
  {
    id: 'repo-bound-in-entirety',
    subtask: '13.1',
    owner: 'thurgood',
    template: REJECTED_TERM_MESSAGE,
    test: 'dispositions.schema.test.ts › repo-bound-in-entirety is a named rejected term, not an unknown one',
  },
] satisfies NineCheck[]);

/** The registry entry for `id` (throws on an unregistered id — a programming error). */
export function nineCheck(id: NineCheckId): NineCheck {
  const check = NINE_CHECKS.find((c) => c.id === id);
  if (!check) throw new Error(`check-catalog: no registered check "${id}"`);
  return check;
}

/**
 * Fill a template's `<name>` placeholders from `vars`. Every placeholder must be supplied, and
 * every supplied var must be used — a mismatch is a programming error, never a content one.
 */
export function fillTemplate(template: string, vars: Readonly<Record<string, string>>): string {
  const used = new Set<string>();
  const out = template.replace(/<([^<>]+)>/g, (_m, name: string) => {
    if (!(name in vars)) throw new Error(`check-catalog: template placeholder <${name}> has no value`);
    used.add(name);
    return vars[name];
  });
  const unused = Object.keys(vars).filter((k) => !used.has(k));
  if (unused.length > 0) throw new Error(`check-catalog: unused template vars: ${unused.join(', ')}`);
  return out;
}
