# Issue: 123 Task 18's `**Instruments**:` line is malformed and under-counts (MIDPOINT MP-3)

**Date**: 2026-11-09
**Owner**: Lina
**Filed by**: Thurgood, under README rule 10, from the composed-loop read of 123's MIDPOINT pass (MP-3, routed to Lina). Rule 9 applies to every later edit.
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event that owes the close is the merge of the owner's fixing PR: a dated erratum line on the doc, never a rewrite of the line, since completion docs are ledgers. The owner names that PR here when it opens.

---

- **The line**: `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md` L7 at `main`: `**Instruments**: 23 listed — exists 14 · built-here 9 · missing 0 · misfit 1 — …/task-18-instruments.md`.
- **The defects** (MIDPOINT MP-3):
  - the guide's regex fails, because `misfit 1` sits in the `unlisted` slot;
  - the block's rows give `24 listed — exists 15 · built-here 9 · missing 0 · unlisted 1`, since row W1 is `exists` and was left out of both N and E.
- **The misfit itself was self-reported** under `## Found later`. Only the header arithmetic is wrong.
- **Owed**: a dated erratum line beneath L7 giving the corrected counts in the guide's form (Completion Documentation Guide § "Errata to a completion doc").
