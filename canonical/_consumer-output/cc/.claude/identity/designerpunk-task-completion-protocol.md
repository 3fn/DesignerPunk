
# Task Completion Protocol

**Date**: 2026-06-29
**Last Reviewed**: 2026-09-29
**Purpose**: The end-of-task operational sequence (completion docs, tiers, parent vs. subtask, stop-and-wait, PR flow) — operational law, always loaded
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

> **Operational law (always-loaded).** This is the authoritative end-of-task sequence. The pre-task checklist (date check, governance health, Jest command selection, authorization-to-START rules) lives in the always-loaded **Start Up Tasks**. This doc owns the **end** of a task; Start Up Tasks owns the **start**.

---

## CRITICAL: Do Not Mark a Task Complete Before Its Required Steps

**DO NOT mark a task complete before completing the required steps for that task type.** Task types are defined in `tasks.md` — check the `**Type**:` field (Setup / Implementation / Architecture / Documentation).

---

### For SUBTASKS
1. [ ] Run targeted tests relevant to the change (not the full suite)
2. [ ] Create a completion doc: `specs/[spec]/completion/task-N-M-completion.md` — three light elements: what changed · targeted tests + result · application-time adaptations (`none` written, never implied). A ticked subtask without its doc is a finding.
3. [ ] Mark the subtask complete in `tasks.md`
4. [ ] **Commit and push the unit branch at judgment-based checkpoints** — delicate or potentially-breaking work, backup-worthy accumulation, or a session/handoff boundary — not mechanically per subtask. No PR opens until the unit completes; subtasks never open PRs.
5. [ ] **STOP** and wait for user authorization

### For PARENT TASKS (Implementation or Architecture type)
1. [ ] Local validation: run your repo's full functional suite before completion — the unit's required checks run it again at the merge
2. [ ] Mark the parent task complete in `tasks.md` — the status change travels with the work and takes effect at merge
3. [ ] Create the completion doc: `specs/[spec]/completion/task-N-completion.md` (on the task branch) — reproduce every success-criterion row verbatim with its Status and Evidence
4. [ ] Create the concise summary doc: `specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Complete the parent on its unit branch: if this parent IS its own merge unit, open the PR; if it is one of several in a declared multi-parent unit, commit its docs on the branch — the PR opens when the unit completes. Completion docs declare where their test results were measured (locally, or which CI run).
6. [ ] **STOP** — report the PR URL or the on-branch completion. **The task is accepted when your human lead merges the unit's PR.** Never merge your own PR.

### For PARENT TASKS (Setup or Documentation type)
1. [ ] Verify the artifacts are created or updated as specified
2. [ ] Mark the parent task complete in `tasks.md`
3. [ ] Create the completion doc: `specs/[spec]/completion/task-N-completion.md` (on the task branch) — reproduce every success-criterion row verbatim with its Status and Evidence
4. [ ] Create the concise summary doc: `specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Complete the parent on its unit branch: open the PR if this parent is its own merge unit; otherwise commit its docs on the branch. Completion docs declare where their test results were measured (locally, or which CI run).
6. [ ] **STOP** — report the PR URL or the on-branch completion. **The task is accepted when your human lead merges the unit's PR.** Never merge your own PR.

## Completion State in the PR Flow

Branch → PR → required checks → merge.

**The merge unit is the coherent unit.** A PR carries a **coherent unit** — the smallest chunk of a spec's work that is coherent on its own AND reviewable as a single diff. For a small spec the unit is the whole spec (one PR). For a large spec the units are **declared in that spec's own tasks.md** — named up front, never judged at merge time. One branch per unit; the unit's completion opens the PR; your human lead merges the unit.

1. Work happens on a **task branch**, never on `main`.
2. Subtask commits are optional and judgment-based; when made, commit AND push the branch (the push is the off-machine backup). No PR opens until unit completion.
3. **Dependent units branch from `main` after the prior unit's PR merges.** Stacking only on your human lead's explicit direction: branch from the prior unit's branch, declare `Stacked-on: #<PR>` in the PR body, and merge stacked PRs in base-first order.
4. At unit completion, commit, push, **open a PR**, and report the PR URL.
5. Required checks run on the PR; a failing check blocks the merge.
6. **Your human lead merges on green.**

**A task is complete at MERGE, not at PR-open.** The PR is the submission; the merge is the acceptance.

1. Finish the work and run tier-appropriate validation locally.
2. Write the completion documentation (and the summary doc, for parents) **on the task branch** — it traverses the gate with the work it documents.
3. Mark the task complete **on the branch**; until the unit merges, that status is an assertion awaiting acceptance.
4. Open the PR, **report the PR URL, and STOP.** Opening a PR is submission for authorization, not completion.
5. **The merge is the authorization act.** It accepts the whole unit — every task in it and its completion claims.
6. **Stop-and-wait composes unchanged**: authorization to START the next task remains a separate, explicit grant (Start Up Tasks #3).
7. **A change request is authorization to resume, not a completion**: fix, push, re-report the PR URL, and STOP again.
8. If required checks fail, the task is not complete: fix on the same branch. If the PR is green but unmergeable (the branch conflicts with an advanced `main`), update the branch from `main` on the same branch. Every push re-runs the checks.
9. **A checks-only merge is NOT ratification** of a governance change: governance changes ratify through your team's own decision record.

### Coherent Units (the merge granularity)

- **What a unit is**: the smallest chunk of a spec that is coherent on its own AND reviewable as a single diff. The merge of a unit's PR is the completion event for every task the unit contains.
- **Small spec → one unit → one PR** (the default and common case).
- **Large spec → units DECLARED in tasks.md**, named up front and reviewed in the tasks round — never judged at merge time.
- **One branch per unit**; the unit's completion opens the PR; your human lead merges.
- **Dependent units branch from `main` after the prior unit's PR merges** — the unit is the dependency grain.
- **On merge, the unit's branch is deleted.**

### Branch Cleanup

- **On merge — the remote branch is deleted** (a repository setting your human lead enables, or by hand).
- **On merge — the local branch is deleted** on returning to `main` (`git branch -d <branch>`).
- **Stale or unmerged branches** (abandoned or superseded units) are pruned in your team's periodic health check, so one long-lived branch never quietly accumulates unrelated work.

### Branch and PR Conventions

- **The `<spec>` token**: the spec ID — the leading identifier of the spec directory name.
- **Branch names**: `task/<spec>-<task-number>-<short-slug>` for spec tasks; `fix/<slug>` or `chore/<slug>` for non-spec work.
- **PR title** = the commit-message standard, spec-suffixed: `Task <N> Complete: <Description> (<spec>)`. If PRs squash-merge, the title becomes the commit subject.
- **PR body** carries `Spec:`, `Task:`, `Agent:` (the authoring agent, or your human lead for human-direct work), the path(s) to the completion doc(s) on the branch, and a one-line validation note.
- **Unit-grain naming (multi-parent units)**: branch `task/<spec>-<unit-slug>`; PR title `<Unit description> (<spec>)`; the PR body adds a `Unit:` field.

### The Merge Rule

- **Agents open PRs; your human lead merges on green.** Agents NEVER merge their own PRs.
- Any delegation of merge-on-green must be a recorded rule (a committed record with its date and scope) — never a verbal grant. Authority is a record.
- PRs touching your team's governance docs or agent charters stay human-merged — a standing carve-out that survives any delegation of merge-on-green.

### Emergency Procedure

When the gate must be bypassed (a broken gate, an urgent fix the checks themselves block): your human lead lifts the protection, performs the change, restores the protection immediately, and records the use — date, reason, what was pushed, how long protection was off, and the follow-up PR if the change needs regularizing. No agent requests the lift as a convenience path.

## Tier Selection (which docs, how much detail)

- **Subtasks**: a single completion doc (`task-N-M-completion.md`). No summary doc.
- **Parent tasks**: BOTH a detailed completion doc (`specs/[spec]/completion/`) AND a concise summary doc (`specs/[spec]/task-N-summary.md`).

---

## Key Rules

- **Implementation / Architecture tasks**: the unit's required checks enforce a green suite at merge — local validation before completion catches failures early.
- **All parent tasks**: create BOTH the completion doc AND the summary doc, on the task branch.
- **All tasks**: STOP after completion — never auto-proceed to the next task. Authorization to START the next task is governed by Start Up Tasks; the merge that completes this task is not that authorization.
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + an **optional, judgment-based** branch commit-and-push; parents get full validation + completion doc + summary doc, committed on the branch.
- **The merge unit is the coherent unit**, DECLARED in the spec's tasks.md. The unit's completion opens the PR; a parent inside a multi-parent unit is done-on-branch, accepted at the unit's merge.
- **A task is accepted at the MERGE of its unit.** Agents open PRs at unit completion; your human lead merges on green. Never merge your own PR.
- **On merge, the unit's branch is cleaned up.**
- **A checks-only merge is NOT ratification**: governance changes ratify through your team's own decision record.
