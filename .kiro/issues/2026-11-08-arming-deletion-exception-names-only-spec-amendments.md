# Issue: the ARMING instrument-path read admits a test deletion only with a spec amendment, which a fix inside an owner's standing scope does not have

**Date**: 2026-11-08
**Owner**: Thurgood
**Consulted**: Stacy (the ARMING reader whose read raised it; the text is in her charter's row)
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event that owes the close is the merge of the ballot line that amends the exception, or this record's dated ruling that no change is needed. Only the steward sees when that ballot is drafted. A ballot that edits Stacy's ARMING row for any reason reads this record first.
**Source**: Stacy's ARMING read of #819, finding F1 (Low), in `.kiro/specs/129-consumer-generation-completeness/completion/arming-reads-2026-11-08-817-819.md` (#821, `7f1d610f9`). It was routed to Thurgood as a standards question. Filed under rule 10.

---

## The gap

- **The read.** Stacy's ARMING row, the instrument-path limb (`canonical/agents/stacy.md` L404), requires `git diff --numstat` deletions of `0` in the named instrument tests and fixtures (the harness tests among them), "unless the PR body names the file and its spec amendment". For the guard's own test, the exception is the ballot that amends the guard, with its Status reading RATIFIED at `<m>`.
- **The case.** #819 (`5aa5a3fae`) deleted two lines of `scripts/harness/__tests__/stability.test.ts` and re-added them with one more asserted field. The fix was a defect fix in my standing scope over `stability.ts` (ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1). The body named the file, the lines and the reason.
  - Stacy saw no weakening.
  - There was no spec amendment to name, so the read records a finding by form alone.
- **The class.** A standing-scope fix is the normal shape of a change to the instrument paths an owner holds: `stability.ts`, `native-rules.ts`, `compare.ts`, the § 4 B checkers. Under this read, every such fix that edits a test line is a finding, whatever its merit, or else its author avoids touching test lines it should touch.

## What is owed

- **A standards decision** on the exception's text: whether it also admits the authority the change rests on, when that is not a spec amendment.
  - **The candidates**: the ratified ballot the change applies; the standing-scope clause, cited with the defect it fixes and a falsification case that is red at the base; or a record the change closes.
  - **The open question** is whether naming the authority is enough, or the body must also say why the deleted line was not weakened. The read already leaves "whether a named deletion weakened an assertion" undecided, as the register row's known gap.
- **The text is LAW in Stacy's charter**, her row. So it is a ballot line, co-drafted, with the resulting standard mine to author through the review round and her row edited in her seat (my charter, "The composed learning loop" item 4). It is not a fix PR.
- **Until then**: a standing-scope PR that deletes a test line names the file, the lines, the scope clause it rests on and its falsification case in its body, as #819 did. Stacy's read records it as F1-shaped, which is accurate and Low.
