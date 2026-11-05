# Issue: the instruments parser and the declared-row resolver (M4's precondition; A-6 (ii))

**Date**: 2026-09-29
**Status**: ACTIVE
**Owner**: Thurgood (instrument owner, `completion-criteria-parity`; the grant below)
**Trigger**: `path:.kiro/specs/128-react-react-native-platform-admission/tasks.md,.kiro/specs/130-input-switch-base/tasks.md,.kiro/specs/131-governance-simplification/tasks.md,.kiro/specs/132-*/tasks.md,.kiro/specs/133-color-track/tasks.md` — the event that owes the close: the next spec's `tasks.md` is created after Spec 129's. None of these files exists at `d7f87174c`, so each glob fires only when its spec's tasks round opens; the parser PR merges before the first of them, or this record lapses there. A spec opened later that would plan before these is added to the list by the owner when its directory is created. *(Re-ruled 2026-11-05, Thurgood, owner, rules 9 and 11. Reason: Spec 129's tasks round opened at `d7f87174c` (#678, `tasks.md` R1) before the parser was built, which is the event the `manual` line below named. The M4 ballot already sets what follows: M4 binds "from the first tasks round that opens after `P`", and "specs planned before `P` … stay on M1's full execution-time block" (ballot `2026-09-28-parent-instrument-existence-check` § 4a). So 129 is on M1 and writes no `**Instruments:**` block, and no Peter ruling changes. I did not build the parser first: about one session, by Peter's condition ("if the parser PR grows past a day, the resolver is the first thing cut back out"), and holding 129's tasks round for it would delay the spec Peter ranked first for a form 129 cannot use. Authority: README rule 9 (owner) and the ballot's own ordering; the orchestrator's relay of 2026-11-05 confirmed the act is the owner's. This line is committed in its own PR so that it is an ancestor of #678's merge. The superseded line is quoted verbatim at the end of this record.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: **before the next spec's tasks round opens.** M4 binds from the first tasks round after this PR's squash SHA `P`, so this work precedes it.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-20, Thurgood, rule 12. This is M4's precondition: Start Up Tasks § 8 and ballot M4 bind from a squash SHA `P` that does not exist until this instrument merges.)*
**Source**: ballot `.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`, **RATIFIED (Peter, 2026-09-29)**: § 4a (M4), and the A-6 (ii) ruling. This issue replaces the ballot's original edit site 6, the prose-M3 issue; prose-M3 is carried below.
**Grant paths**: `scripts/completion-claims/**` (ballot § 4a; the B-CI M3 precedent), on this PR's branch, until it merges.

## Scope (the parser PR)

1. **`INSTRUMENTS_RE`** in `scripts/completion-claims/tasks-md.ts`: a closed-vocabulary promise-block label, `**Instruments:**`.
2. **An `instruments` collector.** It closes the artifacts collector. The block is never read as a criteria paragraph (D1(d)) and **never lands in `primaryArtifacts`**.
3. **The row grammar**, with loud malformations: a stable, append-only row id and exactly one state from `exists (<path> @ <review-base sha>)` · `built here (<subtask>) — <capability>` · `built earlier (<task.subtask>) — <capability>` · `none — <criterion ref>: <why>`.
4. **A D1(d) fixture**: the block after the criteria block, and after `**Primary Artifacts:**`, parsed with zero criteria malformations.
5. **The primaryArtifacts-exclusion bite**: remove the collector switch, and the rows land in `primaryArtifacts` → red, with the exact string recorded.
6. **The A-6 declared-row resolver**:
   - existence: `git cat-file -e <review-base>:<path>` for `exists` rows;
   - order: `built here` names a subtask of this parent, and `built earlier` names a subtask that precedes this parent in declared plan order;
   - **never fit**;
   - an advisory emission at the tasks round;
   - **gated so it binds nothing before `P`**, so it never fires on Spec 123.

   **Peter's condition: if the PR grows past a day, the resolver is the first thing cut back out.**
7. **Grammar errata**: any grammar change the parser needs lands as a dated erratum to M4 in this same PR, so the law text at `P` matches the parser.
8. **At merge**: record `P` and the specs still on M1's execution-time form in the `parent-instrument-existence` register row's history (`governance/classification-map.md`). The Process-Spec-Planning tasks template gains the `**Instruments:**` block.

## Carried (deferred, not in this PR): M3's prose-parsing pass for pre-M4 specs

A tasks-round pass over criteria-named paths and commands (ballot § 4) remains deferred.
- **Trigger**: the first of (a) ten committed Instruments blocks, or (b) the second `unlisted`-kind entry whose instrument the criterion named at the tasks round and which did not resolve at the review base.
- Owner Thurgood.
- When it lands, Stacy's LENS question 6 retires to reading its emissions.

## Filed by

Thurgood, 2026-09-29, at the ballot's ratification.

## Superseded Trigger line (re-ruled 2026-11-05; verbatim)

> **Trigger**: `manual` — a new spec's `tasks.md` is created, i.e. the next spec's tasks round opens (the event is unchanged). A `path:` glob would fire on any edit to an existing `tasks.md`, so the event stays prose. Unfired at this walk: no `tasks.md` has been added since 2026-09-26. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
