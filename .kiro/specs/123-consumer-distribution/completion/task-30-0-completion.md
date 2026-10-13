# Task 30.0 Completion: the pre-declared consequence texts (C0′)

**Date**: 2026-10-12
**Agent**: Lina (Opus), PRIMARY Task 30
**Branch**: `task/123-u3g-g2c2`, after Task 30's instruments block (`a2b43b979`). **This subtask's commit is C0′.**

## What changed
- **`completion/g2-cycle-2-consequence-texts.md`** (new), modelled on Task 18's `g2-consequence-texts.md`:
  - **§ 1, target**: `completion/task-30-completion.md` § `## 24.3 acceptance table`, created at 30.2. Task 18's record is not edited. A cycle 3 re-composes the section wholesale from the same texts.
  - **§ 2, selector**: the highest-numbered `re-grounding-g2-cycle-<n>.md`, and the token after `**Verdict**: ` up to the first space. The tokens are closed: `HOLDS` · `DOES-NOT-HOLD` · `NOT-RUNNABLE`. A malformed record means nothing is applied, and the defect returns to Stacy. Findings, reasons, rows and limits are never read.
  - **§ 3, composition**:
    - `HOLDS` → `HEAD` + `ROWS-FIXED` + `HOLDS-ROWS` + `LIMITS` + `FOOT`.
    - `DOES-NOT-HOLD`/`NOT-RUNNABLE` → `HEAD` + `ROWS-FIXED` + `DEMOTION` + `HOLD` + `FOOT`.
  - **§ 4, the texts**:
    - `HOLD` carries PR-5.3 verbatim: "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record."
    - `LIMITS` is fixed text naming L1–L5 under Peter's "accept", with L3 and L5 first and routed to Thurgood. It does not vary with the verdict's own list.
  - **§ 5, the release-3 CHANGELOG statement** (Task 22.4's G2 treatment):
    - `CHANGELOG-HOLDS`;
    - `CHANGELOG-LIFTED`, used only for a release cut under Peter's lift record;
    - no block when there is no release.
- The 30.0 checkbox is ticked.

## Tests
- **A dry-run composition** extracted the nine fenced blocks and composed both outcomes: `HOLDS` gives 26 lines, `DOES-NOT-HOLD` gives 15. The only `## ` line in either composition is the section's own heading, so the section boundary rule holds.
- No code changed.

## Application-time adaptations
1. **The target under `DOES-NOT-HOLD`/`NOT-RUNNABLE` is the same section**, holding the `DEMOTION` and `HOLD` blocks. Task 30's criterion says only "the hold stands, and this PR is not opened". The table records it on the branch in the same form as Task 18. If cycle 3 runs, the section is re-composed from its verdict.
2. **The CHANGELOG statement is declared here, but applied by Task 22.4** (U3) at release 3. Only its G2 treatment is outcome-dependent, so only that is declared. The Kiro knowledge-fallback note this unit ships is verdict-independent and is 22.4's to word.
3. **Freeze discipline**: this file carries the `Agent: lina` trailer, and no later commit edits it (RF5).
