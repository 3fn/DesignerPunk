# Issue: Spec 123 design § Error Handling has no catalog text for the consumer-degradation warning, while Req 13.5 requires a test that asserts that text — a dated design erratum is owed

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Thurgood (spec standards; the erratum's author — `.kiro/specs/**` is in his write scope, and the design document is his artifact). **Consulted**: Lina (the string's author at Task 16.1; confirms the row's text and its placeholder names before the erratum is committed). **Decision**: none needed from Peter unless Lina contests the wording; this is a design-catches-up-to-code erratum on the established form, not a requirement change.
**Trigger**: **before U2b's unit PR opens** (Spec 123, `task/123-u2b-profile`). Why this event and not a later one:
- The unit PR is where the claims passes and the reviewers first read design and code together. An erratum landing after it means the unit merges with the design row still reading `(unchanged; warning, exit 0)` against a string the code and a test pin, which is the exact "design says X, code says Y, and the test asserts Y" shape Spec 123's earlier errata (the name-contract rows, the harvest-zero warning) were written to remove.
- The erratum is a `.kiro/specs/**` edit, so it does not touch any signed identity unit and costs no re-sign; there is no reason to defer it.
- The alternative event, Task 18's parent completion reading the design row, is later than the unit PR's open and would put an acknowledged gap into the reviewed diff. It is rejected for that reason; if the PR is to open earlier than the erratum can land, the PR body names the gap instead (a recorded exception, not silence).
**Source**:
- **Task 16.1** (Lina): `.kiro/specs/123-consumer-distribution/completion/task-16-1-completion.md` L69, item 8 — the string "**authored here** (instruments note N1, because the design row reads `(unchanged; warning, exit 0)` with no text)". On U2b's unit branch.
- **Instruments note N1**: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md` L85 — "Req 13's warning has no catalog text… Adding a design-catalog row for it is an erratum for the orchestrator to route. It is not an instrument gap: the instrument (10.1/10.2) is built here." Instruments rows 10.2 (L75) and 10.3 (L76) cite it. On U2b's unit branch.
- **Peter's direction** (2026-10-01): carried items that live only in completion docs are captured as tracked issues by their owners.

---

## The gap

**Design** (`.kiro/specs/123-consumer-distribution/design.md`, in `main` at `dff78bcd`):

- **L918**, § Error Handling catalog: `| consumer degradation | *(unchanged; warning, exit 0)* |`. The `(unchanged)` convention in this table (L909 `rejected disposition term`, L916 `partition invariant`, L917 `derivation, no span`) means "the string already exists in code and this spec does not change it". For consumer degradation that is **not true**: the consumer-profile degradation is new in this spec (Req 13), and no string existed to be unchanged.
- **L671**: "Degradation in the consumer profile = warn and exit 0 (13)." and **L955**, the test-plan row: `13 | consumer-entry.degradation.test.ts | delete a resolvable member | warning, exit 0`. Neither carries text.

**Requirements** (`.kiro/specs/123-consumer-distribution/requirements.md`): **13.5** (L541) requires "a test asserting the **warning TEXT and `exit 0`**, plus its bite". A test cannot assert text the design never pins.

**Code** (on U2b's unit branch; `git show origin/task/123-u2b-profile:src/cli/shared/errorCatalog.ts | grep -n -A12 consumerDegradationMessage`, L160–165):

```ts
export function consumerDegradationMessage(member: string, where: string, consequence: string): string {
  return (
    `warning: ${member} is missing from the installed @3fn/core (${where}) — ${consequence}. ` +
    `Generation continued without it; reinstall the package (npm install) to restore it.`
  );
}
```

The test (`consumer-entry.degradation.test.ts`, 7 tests, PASS per `task-16-1-completion.md` L93) asserts it string-equal. So code and test agree; only the design is silent.

## The erratum owed

Add the row to the design's § Error Handling catalog (replacing the `(unchanged…)` cell at L918, in the form used by the dated rows at L893–895 — an in-row `*(Erratum <date>: …)*` note naming the source commit and that the code was authored before the row), verbatim from the code:

| consumer degradation *(Erratum <date>: new row — Task 16.1's string, taken verbatim from `src/cli/shared/errorCatalog.ts` `consumerDegradationMessage`; the design row previously read `(unchanged; warning, exit 0)` although no catalog text existed. Warning, exit 0; the placeholders are the member's name, where it was looked for, and what the consumer loses)* | `warning: <member> is missing from the installed @3fn/core (<where>) — <consequence>. Generation continued without it; reinstall the package (npm install) to restore it.` |

To be settled with Lina before commit (not decided here):
- **The placeholder names** `<member>`, `<where>`, `<consequence>` are the function's parameter names; whether the design should name them so, or describe them ("a doc-id", "the package root", …), is a wording choice.
- **The remedy clause** ("reinstall the package (npm install) to restore it"). Counter-argument: Req 13's degradation also fires on cases the package cannot repair by reinstall (a doc-id deliberately unresolved at package root, the doc-id-resolution derivation at `requirements.md` L552, where the miss is a design property, not a damaged install). If the clause is wrong for those cases, the fix is a code change owned by Lina and a re-measure of the test's string-equal assertion; the erratum then records the corrected text, not the one in the code today. Lina decides; this issue does not.
- **The erratum date** is the commit date, not today's.

The Req 13.5 bite (delete a resolvable member from a packed install, observe the warning and the charter-minus-member, revert) is already recorded in `task-16-1-completion.md` L93; the erratum cites it and does not restate it.

## Not in scope here

Any edit to `src/cli/shared/errorCatalog.ts` or the degradation test (Lina's, Task 16.1's), to `requirements.md` (Req 13.5 already requires the text; nothing to amend), or to the instruments block (a recorded `built here` row, never overwritten). This issue is the tracked flag; the erratum is Thurgood's to write once Lina has confirmed the text, and it lands on the unit branch before the PR opens.
