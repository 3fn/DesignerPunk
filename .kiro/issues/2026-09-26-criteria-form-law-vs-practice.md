# Issue: the criteria-block form, law vs practice (nested bullets, D4), and the Q2 evidence caveat

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Thurgood drafts the ballot; Peter rules.
**Trigger**: `manual` — the capped sitting's ballot (sitting item S3) merges; written as `merge:#<N>` once that PR is known. *(Re-ruled 2026-10-18, Thurgood: the Q2 sitting fired and was recorded 2026-10-02 (register row `completion-criteria-parity`, ARMING SITTING; flip 2026-10-03) and D4 was not taken there, though Peter's 2026-09-26 ruling deferred it "to a ballot at the Q2 sitting". Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's routing of 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief; the PR body cites it). The superseded trigger, verbatim:)* **the Q2 sitting** (the arming decision for `completion-criteria-parity`: the 5.Z sitting or release-prep start, whichever comes first).
**Class**: P2 obligation (record) · defect *(set 2026-10-18, Thurgood, rule 12. Ratified Req 2.2.1 says "flat … no nested sub-bullets" and the armed checker accepts a nested bullet as a row; the law's text is wrong against practice and no reader is misled.)*
**Source**: the extraction audit behind PR `fix/parity-parser-blank-line-extraction` (found at Spec 123 U1 Task 5). Peter ruled 2026-09-26: **D4 is deferred to a ballot at the Q2 sitting**, and nested bullets stay accepted as rows until then. The ruling is recorded in `.kiro/specs/127-completion-claims-integrity/design.md`, in the note under C2.

## The question for the ballot

**Req 2.2.1** (ratified) defines the frozen form as a label followed by *"a **flat** bullet list (`- `) — one bullet = one criterion = one table row, no nested sub-bullets"*. PSP § "`tasks.md` Structural Conventions" (L468) teaches the same thing.

In practice, the strict parser has always accepted a nested bullet silently as its own row. Nothing enforces flatness. Before this ballot, the first declared spec written after ratification nests criteria in **11 of its 28 parents** (listed below).

The ballot must choose one of two options:
- **(A) Amend Req 2.2.1 to match practice.** Nested bullets are accepted as rows, each one a criterion, and the completion table reproduces each one verbatim. Parity has worked this way since U2, so this is a recorded amendment of the law with no instrument change. **Counter-argument:** an outer bullet such as *"**Migration** (`sync.migration.test.ts`; each case's red recorded):"* becomes a criterion row of its own. A heading-like row can be ticked ✅ with evidence that proves only its children, so the parent row carries no promise of its own.
- **(B) Require flat lists going forward.** The parser raises a loud malformation on a nested bullet, in the same shape as D1. Every declared spec normalizes its blocks to flat lists. **Counter-argument:** flattening loses grouping, and grouping is legibility that authors reach for on purpose (123 nests per-platform closure rows under their platform, which is Req 2.6.1's own decomposition). The change would also poison 123's 11 parents in the middle of execution unless it lands with a normalization pass or a forward-only date.

A fork remains open under both options: whether the outer "group-heading" bullet is a criterion at all (A), or has to be rewritten as a criterion in its own right (B). This is Peter's call.

## Spec 123's nesting parents (11)

These are parents **3, 5, 6, 7, 10, 12, 13, 18, 19, 26 and 28**, taken from `.kiro/specs/123-consumer-distribution/tasks.md` on `main` at `95bdcc39`. A parent qualifies if any bullet sits at an indent of 4 or more inside its criteria block. Parent 3 alone has 21 nested bullets out of 30.

**LENS observation, for Stacy. It names a gap and does not adjudicate it.** Spec 123's tasks round was the first to run the tasks-round verifiability LENS against the ratified criteria convention. Nothing in `feedback/tasks.md` raises criteria-block *form*: not the nesting against Req 2.2.1's "flat", and not the three stray in-block paragraphs that became D1. The tasks author (Thurgood, `tasks.md` **Author** line) wrote both shapes. This observation records a coverage gap, not a finding against the LENS: whether the LENS's scope includes form conformance is a question for Stacy's charter, and I am not deciding it.

## Q2 evidence caveat (for whoever counts N ≥ 5 at the sitting)

The parity checker's PASS lines are the arming evidence. Before the parser fix, they overstated coverage in two ways: silent criteria truncation (D1), and inline Primary Artifacts that were never seen (D2, so no parent owed Additional verification). The count must follow these rules:

1. **Spec 127's three parents are clean.** Their blocks are flat, with bullet-form Primary Artifacts and no stray lines. Extraction matched the expected rows exactly (15, 8 and 10) before and after the fix, and all three PASS in both runs.
2. **Spec 123's parents count only when evaluated by the fixed parser.** Pre-fix PASS lines for 123 parents do not count. That applies to every PASS recorded on the U1 branch before the branch syncs this fix, because until then no 123 parent owed Additional verification.
3. **Spec 123's parent 5 counts only after re-verification following the `tasks.md` normalization.** Under the fix, parent 5 is a loud MALFORMATION: it is poisoned and gets no verdict. After the normalization it reads SET_MISMATCH, with the 14 rows in the side table missing from the criteria table, until the two tables are merged. Only a PASS after both steps counts.
4. **The fix also surfaced parent 4.** On the U1 branch, `task-4-completion.md`'s Additional-verification line reads `**Primary Artifacts (as declared in tasks.md): … — all shipped as declared.**`, which is not the fixed prefix `Primary Artifacts:`. After the fix, parent 4 goes **RED [AV_MISSING_OR_MALFORMED]**. It counts only after that line is corrected and parent 4 is re-run. This finding goes to Lina (Task 4 PRIMARY, the author of doc 4) as an explicit message, relayed through the coordinator in the fix PR's report.
5. **Standing framing.** A green parity run is not evidence that a claim is honest. That was the error Spec 127 exists to prevent. N counts parents the instrument evaluated, not claims found true.

## Triage (2026-10-18)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Re-verified live**: the checker has been REQUIRED since the 2026-10-03 flip (register row history) and no PR has touched `scripts/completion-claims/**` or the CLI since (`git log --first-parent --since=2026-10-03` is empty), so nested bullets are still read as rows; Req 2.2.1 is unamended. Spec 123 is closed, so its 11 nesting parents are no longer mid-execution, which removes the draft's "poison 123's 11 parents in the middle of execution" cost for option (B) and leaves (B) a forward-only rule. That reading is mine from the closed state, not re-measured against the 123 tasks file.
- **The Q2 evidence caveat above is spent**: arming happened on a count the caveat governed; the caveat is history now and the sitting does not need to re-litigate it.
- **Routed to the capped sitting of 2026-10-18, item S3**: Thurgood drafts, **Peter rules the fork A (amend Req 2.2.1 to match practice) or B (require flat lists going forward)** and the open sub-fork (is the outer "group-heading" bullet a criterion at all). Surfaced, not picked. S3 shares a ballot with S4 and S5 where the sitting groups them: all three amend the `completion-criteria-parity` instrument's law, and the Req 2.2.1 text is the same surface as S5's Req 6.4 erratum.
- **Closes** when the ballot is merged and its recorded amendment (A) or normalization/date (B) lands.
