# Task 18 Summary: G2 gate parent — pass four

**Date**: 2026-10-02
**Purpose**: Concise summary of Task 18 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 18 ran U2's acceptance gate, G2 (pass four), in two seats. Stacy judged; Lina executed.

- **The consequences were fixed before the request.** Both possible edits to the Req 24.3 acceptance table were committed at C0 `30186762`, ahead of the request, and the file is frozen from then on. The PASSES edit has a text per domain and per domain state; the Fork A demotion covers FAILS and NOT-RUNNABLE. The file also carries the target location, a mechanical selector and a malformed-record rule. Stacy reviewed it twice before it froze.
- **The request was made on a fixed head.** It went in on H = `c1b67b8f`, after the work that had to land first:
  - VALVE-1's per-row spans, with Kenya's and Data's re-signs, entered by a non-squash merge;
  - the generator-residuals fix;
  - the corrected degradation-warning text and its design erratum;
  - the lock refresh.

  The request record (`063236bf`) carries the confirming guard run at H, the signing-chain check at H, the ancestry of C0, and every merge's authority.
- **Stacy recorded the verdict** in `completion/re-grounding-pass-four.md` (`3e0e0994`). It is cited, not restated.
- **The selected consequence was applied byte-equal** to its pre-declared text, as § "24.3 acceptance table" of the parent completion doc. The byte check is empty, and the orchestrator recomposed the blocks independently with the same result. The release-2 CHANGELOG entry is committed and does not presume release order.

## Why It Matters

The gate's outcome now costs an artifact edit that was declared before anyone knew the outcome, applied mechanically, and checkable as a diff. The executing seat could not shape the edit after seeing the verdict.

## Key Changes

- New: `completion/g2-consequence-texts.md` (frozen), `completion/task-18-1-completion.md` (the request), `completion/task-18-completion.md`, and the instruments and subtask docs.
- Changed: `CHANGELOG.md`, which gains the release-2 entry.
- Stacy's: `completion/re-grounding-pass-four.md`.

## Impact

- **Criteria**: all 11 are met, with no unmet row. Criteria 3 and 7's PR-body lines (the recusal statement and the tripwire line) are in the U2b unit PR, #262. The branch-head dispatch at `34d4560e` is six of six green; the gate runs on #262.
- **Instruments**: 23 rows — exists 14, built-here 9, missing 0 — with one `misfit` self-reported (W1: who made the confirming run, and where it is recorded).
- **Carries**: G2-F1, G2-F2 and G2-F3 are routed to Lina by the record and are filed as issues after U2b merges. Any fix is a new falsification cycle (Lina condition 2).
- **Owed after U2b merges**: the docs `rebuild_index`, seven issue archive moves, the new issues, and Stacy's MIDPOINT and ARMING.
- **Still Peter's**: Release 1 is untagged, and its sequencing with Release 2 is undecided.

## Cross-References

- Completion doc: `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md`
- Verdict record: `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`
- Instruments block: `.kiro/specs/123-consumer-distribution/completion/task-18-instruments.md`
