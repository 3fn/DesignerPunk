# Issue: the materiality extractor truncates criteria bodies at in-block prose (D3)

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Thurgood (the `completion-criteria-parity` instrument, Spec 127)
**Trigger**: **the Q2 sitting OR the next touch of `scripts/completion-claims/materiality.ts`, whichever comes first**
**Source**: the extraction audit behind the parser fix PR `fix/parity-parser-blank-line-extraction` (found at Spec 123 U1 Task 5). Peter ruled 2026-09-26: D1 and D2 are fixed in that PR; D3 is filed here.

## The defect

`collectBulletBody` in `scripts/completion-claims/materiality.ts` computes the promise surface for the "materially amended" test (Req 2.3). It stops a criteria-label body at the same shapes the strict parser used to stop at:

- a blank line followed by a non-bullet line;
- an indented bold-leading line (a sub-label).

Every bullet after the stop point is missing from the surface. **The parser fix does not touch this module.** C4 is deliberately independent of C2's strict grammar (design C4; Req 2.3.1).

## Why this is the costly direction (Req 2.3.4)

Req 2.3.4 states that "a false-material costs one declaration line; a false-immaterial reopens B4's side door."

A truncated surface can only cause false-**im**material results. If a PR rewords, relaxes or deletes a criterion that sits after the stop point in a legacy file, the canonical-form comparison sees no change. So the amendment gets no criteria-mode declaration, and the file stays legacy. The generous pattern set exists to prevent exactly this.

**Current reach**:
- The amendment duty only fires once the check is armed (Req 2.3.5).
- Until then, the claims pass owns materiality as judgment.
- So nothing is mis-decided today. The defect bites at arming.

## Census (heuristic, recorded not asserted — the corpus moves)

This census corrects the "8 blocks in 6 legacy files" figure from the first audit report. That report came from a census whose filter hid stops at label-shaped lines, so it missed 010 and counted 123's two unfiltered blocks as legacy. The corrected census reads every criteria-label block, runs the extractor's stop rule, and lists every block where bullets resume after the stop point and before a structural boundary. Each stop line was then classified by hand.

- **Blocks scanned**: 904 criteria-label blocks across `.kiro/specs/*/tasks.md` (155 files, `main` at `95bdcc39`).
- **Truncations within criteria, legacy (the materiality population)**: **7 blocks in 7 files**.

| File:label line | Stops at | Bullets lost |
|---|---|---|
| `001-token-data-quality-fix/tasks.md:399` | `Spec is complete when:` (intro prose) | 6 (the whole body) |
| `002-test-infrastructure-fixes/tasks.md:305` | `Spec is complete when:` | 7 (whole body) |
| `003-release-analysis-test-cleanup/tasks.md:186` | `Spec is complete when:` | 5 (whole body) |
| `web-format-cleanup/tasks.md:388` | `Spec is complete when:` | 6 (whole body) |
| `010-container-component/tasks.md:591` | `**Functional Requirements**:` (sub-label) | 5, plus the later sub-groups |
| `011-release-system-test-fixes/tasks.md:476` | `**Critical Success** (Required):` (sub-label) | 13 |
| `012-release-system-test-fixes/tasks.md:207` | `**Critical Success** (Required):` (sub-label) | 12 |

- **The same shape in the declared population**: Spec 123 parents 5, 13 and 26 (`tasks.md` L373, L570, L872). The amendment duty binds only legacy files, and the strict parser now fails these blocks loudly (D1). So they are listed here for completeness only.
- **Classified as correct stops (not defects)**: 87 blocks stop at a separate label that starts a new block:
  - `**Artifacts Created:**` ×47;
  - `**Completion Documentation:**` ×31;
  - `**Post-Completion:**` ×2;
  - one each of `**Estimated Effort**`, `**Artifacts to Review/Correct:**`, `**Implementation Constraint**` (033), `**Critical**` (068, a scope note) and `**Known structural elements:**` (117).

  Telling a sub-label inside a criteria body apart from a new block is judgment. That is why this census is heuristic.

## Fix shape (proposed; owner decides at trigger)

C4 must stay generous and must not import C2's strictness. Candidate: continue a criteria body across non-bullet lines until the next promise-block label, checkbox, heading or thematic break, taking in intervening prose and sub-labels. Over-inclusion is the safe direction for this extractor (Req 2.3.4).

Anything that changes the extracted surface is a change to the ballot's closed, enumerated pattern set (Req 2.3.4 "closed, enumerated verbatim in the law ballot"). That makes it a **recorded amendment**, not a code fix alone:
- re-run `--verify-extraction`;
- record the new digest against the ballot's per-class counts.

**Test**: fixtures for each stop shape above (intro prose, bold sub-label). A reworded criterion after the stop point must read material. Bite: the current `collectBulletBody` must go red on them.
