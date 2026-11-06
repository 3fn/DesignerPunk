# Issue: `complete-task.sh` stages every untracked, unignored path, so a completion commit can carry files no parent lists

**Date**: 2026-11-06
**Owner**: Thurgood (the tool is in his standing write scope). Consulted at build: Stacy, Lina.
**Class**: P2 obligation (guard) · defect
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md` — Spec 129's U1 merge, the event Peter set ("Filed now, built after U1"). At that event the owner closes this record, if the fix has merged, or re-rules it to `path:.kiro/hooks/complete-task.sh` with a dated reason. The re-ruled token fires on the fixing PR, which owes the close. Because U1's diff carries `task-5-completion.md`, U1's PR carries this record's owed act, under `tasks.md`'s Convention "A unit carries the records its diff fires".
**Source**: Peter's Decision 4, verbatim "4 (b)" (his full answer: "1 A, 2 yes, 3 stand, 4 (b), 5 no rewrite; let's also proceed with the class option"), `date -u` at receipt 2026-11-06T14:04:52Z (orchestrator relay; **UNVERIFIED** beyond the relay). Option (b), as he read it: `complete-task.sh` refuses untracked paths outside the parent's listed paths; filed now, built after U1. The instance is entry L-9 of `.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md`.

---

## The defect

`.kiro/hooks/complete-task.sh` L655–657 (at `4732654d6`): when the tree is dirty, or any untracked file is not ignored, the tool runs `git add -A` and commits everything. Nothing compares what it stages with what the task is allowed to write.

**The instance** (2026-11-06):
- Commit `c043e4534` ("Task 1 Complete: The packed-install consumer driver (129)", on `task/129-compile-harness`) carried four untracked logs from `.claude/scratch-backup/q5-data-work/` (2,329 lines) and nothing else.
- It was pushed, and the tool dispatched six workflows against it.
- `f0a0c97d8` removed the files 41 s later.
- The repository is public. Every line of the logs carries the local home path in dash-mangled form, and `c043e4534` stays reachable by its SHA.
- Peter ruled no history rewrite (Decision 5).

---

## The fix (option (b), to be settled at build with Stacy and Lina)

1. **In parent, unit-member and subtask modes, before staging**: list the untracked, unignored paths (`git ls-files --others --exclude-standard`). Refuse, non-zero and before any git change, if any of them lies outside the allowed set. Print each such path and the remedy.
2. **The allowed set**, read from the spec's `tasks.md` (the parity checker's parser, `scripts/completion-claims/tasks-md.ts`, already parses parents):
   - the parent's `**Primary Artifacts:**`, globs included;
   - its `**Completion Documentation:**` paths;
   - `completion/task-<N>-instruments.md`;
   - the subtask docs `completion/task-<N>-<M>-completion.md`;
   - in subtask mode, the subtask's own doc path.
3. **The escape**: `--add <path>` (repeatable) names an untracked path outside the set. The tool prints it in its output, and the author answers for it like any out-of-list edit (a claims-pass finding unless a grant covers it).
4. **Where no parent can be found** (a `fix/` or `chore/` branch, or a message without `Task <N>`): refuse every untracked path that is not passed with `--add`. Whether this is too strict for non-spec work is an open question for the build consult.
5. **Not in scope**: tracked files the branch modifies are staged as today. An out-of-list edit to a tracked file is already a claims-pass finding (`tasks-row-write-scope-grant`).
6. **Tests** (a new suite; the tool has none today):
   - the instance as a falsification case: an untracked file under `.claude/` beside a parent's docs → refusal, with the exact message recorded;
   - a parent whose new Primary Artifacts are untracked → no refusal;
   - `--add` admits exactly the named path;
   - non-spec mode.

**Surviving counter-argument**: Primary Artifacts are written as globs and per-section lists (`harness/pins.yaml` "(the `ios` section)"), so the parser carries risk. An escape flag can also become rote. If the build consult finds the parser unreliable, a narrower fallback is to refuse any untracked path that matches no Primary Artifacts glob of any parent in the spec. That fallback would be a design change, raised with Peter before it is built.

---

## Criterion (decidable without consulting the author)

The fixing PR adds a suite for the tool (it has none today: no `*.test.*` file exercises `.kiro/hooks/complete-task.sh`'s staging), with a case that reproduces the instance and shows the refusal, and a case that shows a parent's own untracked Primary Artifacts committed without `--add`. Both are red once and then green, with the red strings in the PR body. `.kiro/hooks/complete-task.sh` no longer reaches `git add -A` with an untracked path outside the allowed set.
