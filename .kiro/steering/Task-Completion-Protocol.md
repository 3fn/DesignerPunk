---
id: task-completion-protocol
inclusion: always
name: Task-Completion-Protocol
description: Operational law for ending a task — when to write completion docs, which tier, the parent-vs-subtask sequence, and the stop-and-wait-for-authorization rule. Load when completing any task or subtask.
---

# Task Completion Protocol

**Date**: 2026-06-29
**Last Reviewed**: 2026-07-14
**Purpose**: The end-of-task operational sequence (completion docs, tiers, parent vs. subtask, stop-and-wait, PR flow) — operational law, always loaded
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

> **Operational law (always-loaded).** This is the authoritative end-of-task sequence. The pre-task checklist (date check, governance health, Jest command selection, authorization-to-START rules) lives in the always-loaded **Start Up Tasks**. This doc owns the **end** of a task; Start Up Tasks owns the **start**.

---

## CRITICAL: Do Not Mark a Task Complete Before Its Required Steps

**DO NOT mark a task complete before completing the required steps for that task type.** Task types are defined in `tasks.md` — check the `**Type**:` field (Setup / Implementation / Architecture / Documentation).

**📖 Query the Completion Documentation Guide via MCP for detailed guidance:**
```
get_section({ path: "completion-documentation-guide", heading: "Two-Document Workflow" })
get_section({ path: "completion-documentation-guide", heading: "Documentation Tiers" })
```

---

## The Sequence by Task Scope

### For SUBTASKS
1. [ ] Run targeted tests relevant to the change (not the full suite)
2. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-M-completion.md`
3. [ ] Mark subtask complete (use the `taskStatus` tool)
4. [ ] **Commit is optional and judgment-based — not mechanical per subtask.** When you commit, **commit AND push the unit branch** (`task/<spec>-<unit-slug>` or `task/<spec>-<N>-<slug>`, created at the first subtask — `git switch -c` or the completion tooling's equivalent); the two stay coupled because the push is the off-machine backup guarantee (a local-only commit is not backed up). Commit-and-push at a **checkpoint** (delicate or potentially-breaking work — a restore point worth having), when **backup-worthy work has accumulated** (a unit branch is longer-lived than a single task, so more unpushed work sits at risk between merges — push before the pile grows), or at a **session/handoff boundary**. Do NOT commit mechanically after every trivial subtask — the unit squash-merges anyway, so subtask granularity is cosmetic to `main`'s history. No PR opens and no required checks fire until unit completion. Subtasks do NOT open PRs. Never commit to `main`.
5. [ ] **STOP** and wait for user authorization

### For PARENT TASKS (Implementation or Architecture type)
1. [ ] Local validation: the unit PR's required checks run the full suite at the gate — validating locally first catches failures before they block the merge (test-command selection: Start Up Tasks)
2. [ ] Mark parent task complete (use the `taskStatus` tool) — the status change commits with the work and takes effect at merge; a failing suite blocks that merge at the gate
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch)
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."`.
   - **If this parent IS its own merge unit** (a standalone task, or a small single-unit spec): the tooling opens the PR and reports the URL.
   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent).
6. [ ] **STOP** — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. **The task is accepted when Peter merges the UNIT's PR** (merge on green = the authorization act). Never merge your own PR; never push to `main`.

### For PARENT TASKS (Setup or Documentation type)
1. [ ] Verify artifacts created/updated as specified
2. [ ] Mark parent task complete (use the `taskStatus` tool)
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md` (on the task branch)
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md` (on the task branch)
5. [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."`.
   - **If this parent IS its own merge unit**: the tooling opens the PR and reports the URL.
   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**; the PR opens at UNIT completion.
6. [ ] **STOP** — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. **The task is accepted when Peter merges the UNIT's PR** (merge on green = the authorization act). Never merge your own PR; never push to `main`.

---

## Completion State in the PR Flow

*Law source: the ratified workflow-law ballot (Spec 125-A Task 1 — `.kiro/specs/125-A-pr-gate-mechanical-arming/task-1-workflow-ballot.md`, RATIFIED Peter, 2026-07-05).*

Branch → PR → required checks → merge.

**The merge unit is the coherent unit.** A PR carries a **coherent unit** — the smallest chunk of a spec's work that is coherent on its own AND reviewable as a single diff. For a small spec the unit is the whole spec (one PR). For a large spec the units are **declared in that spec's own tasks.md** as a task grouping (e.g., a substrate group / each per-agent cutover / a closeout) — named up front, never judged at merge time. One branch per unit; the unit's completion opens the PR; Peter merges the unit.

1. Work happens on a **task branch**, never on `main`. The branch is created at the task's first subtask (or at task start): plain `git switch -c task/<spec>-<N>-<slug>`, or the completion tooling's equivalent.
2. **Subtask mechanics** (one rule — commit method, push semantics, branch creation, PR timing): subtask commits are **optional and judgment-based, not mechanical per subtask** — and when made, they **commit AND push the branch** with plain git (the two stay coupled; the push is the off-machine backup). Commit-and-push at a **checkpoint** (delicate or potentially-breaking work), when **backup-worthy work has accumulated** (a unit branch is longer-lived than a single task — push before the unpushed pile grows), or at a **session/handoff boundary** — not after every trivial subtask, since the unit squash-merges anyway and subtask granularity is cosmetic to `main`. No PR opens and no required checks fire until unit completion; subtasks do NOT open PRs.
   **AMENDED FROM THE OLD FLOW — a deliberate process change (Peter, 2026-07-05), not a carry-over.** Under the outgoing law, subtasks had NO commit/push step at all: the commit+push hook fired at PARENT completion only, so subtask work stayed local until the parent finished. Subtask commits-and-pushes are NEW behavior, justified forward-looking: (a) branches remove the old reason not to push — nothing lands on `main`; (b) a pushed branch is off-machine backup of in-progress work; (c) optional visibility for Peter on GitHub; (d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the change-request/failed-check resume path (points 7–8 below).
   **Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch (no PR); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR.
3. **Dependent tasks branch from `main` after the prior task's PR merges.** Starting a dependent task before the prior merge is not sanctioned by default — this composes with stop-and-wait (Peter's go for the next task typically follows his merge of the prior one), so the wait costs nothing in practice. Exception, only on Peter's explicit direction: branch from the prior task branch and declare `Stacked-on: #<PR>` in the PR body; stacked PRs merge in base-first order.
4. At **unit** completion (a standalone task, a small single-unit spec, or the final/gating parent of a declared multi-parent unit), the tooling commits, pushes the branch, **opens a PR**, and reports the PR URL. A parent completing *inside* a multi-parent unit commits its completion+summary docs on the branch and does NOT open a PR — its acceptance is the unit's merge.
5. Required checks run on the PR. A failing check blocks merge at the platform.
6. **Peter merges on green** (see The Merge Rule below). **Squash-merge is the ONLY merge method** — the repository is configured to allow squash-merge only (method drift closed by configuration, not convention). The PR collapses to one commit on `main`, preserving the atomic-commit-per-task history the release tool scans; the PR title becomes the commit subject.
7. Direct pushes to `main` are rejected by branch protection, **admins included**.

**A task is complete at MERGE, not at PR-open.** The PR is the submission; the merge is the acceptance.

1. The agent finishes the work and runs tier-appropriate validation locally.
2. Completion documentation (and the summary doc, for parent tasks) is written **on the task branch** — it traverses the gate with the work it documents.
3. The agent marks the task complete (`taskStatus` tool / tasks.md checkbox) **on the branch** — the status change is part of the work product and lands with it. For a parent *inside* a multi-parent unit this happens at parent completion (docs + status on the branch, no PR); for the unit's final parent it happens before the PR opens. Until the UNIT merges, every such status is an assertion awaiting acceptance, not a fact about `main`.
4. The agent opens the PR, **reports the PR URL, and STOPS.** Opening a PR is submission for authorization, not completion.
5. **Peter's merge is the authorization act.** It accepts the whole UNIT — every task in it AND their completion claims — into `main` in one platform-verified action. A parent task inside a multi-parent unit is **done-on-branch** at its own completion and **accepted at the unit's merge**; the unit merge is the single acceptance event.
6. **Stop-and-wait composes unchanged**: authorization to START the next task remains a separate, explicit grant (Start Up Tasks #3). A merge accepts the finished task; it does not, by itself, instruct the agent to begin the next one. Direction for what follows typically arrives with or after the merge; absent it, the agent remains stopped.
7. **A change request is authorization to resume, not a completion.** If Peter reviews the PR and requests changes instead of merging, the change request authorizes the agent to resume on that branch: fix, push, re-report the PR URL, and STOP again.
8. If required checks fail, the task is not complete and not mergeable: fix on the same branch. If the PR is green but unmergeable (the branch conflicts with an advanced `main`), update the branch from `main` on the same branch. Every push re-runs the checks.
9. **A checks-only merge is NOT ratification.** For governance-law changes, the record-first ballot protocol (`.kiro/docs/ballots/README.md`) remains the ratification mechanism throughout 125-A — the gate verifies mechanics, not authority. PR-approval-as-ratification arrives with 125-B's CODEOWNERS layer.

### Coherent Units (the merge granularity)

- **What a unit is**: the smallest chunk of a spec that is coherent on its own AND reviewable as a single diff. The merge of a unit's PR is the completion event for every task the unit contains.
- **Small spec → one unit → one PR** (the default and common case; equals the 125-A single-parent behavior).
- **Large spec → units DECLARED in tasks.md**: the spec's tasks.md names its units as a task grouping (substrate / each cutover / closeout, etc.). Units are named up front and reviewed in the tasks feedback round — never judged at merge time.
- **One branch per unit**: subtasks commit+push the branch at judgment-based checkpoints (not mechanically per subtask); parent completions commit their docs on the branch; the unit's completion opens the PR; Peter merges (squash).
- **Dependent units branch from `main` after the prior unit's PR merges** — the unit is the dependency grain (stacking only on Peter's explicit direction, `Stacked-on: #<PR>`).
- **On merge, the unit's branch is deleted** (remote auto-deleted by repo setting; local deleted on return to `main`); stale/unmerged branches are swept in the monthly Civitas health check — see § "Branch Cleanup".

### Branch Cleanup

125-A left branch lifecycle-end unspecified. Longer-lived unit branches make that gap costly, so cleanup is a first-class rule:

- **On merge — remote branch auto-deleted.** GitHub's **"Automatically delete head branches"** repo setting is enabled, so every squash-merge removes the merged unit's remote branch. This is a **repo Settings toggle Peter enables** (Settings → General), a config action like branch protection and squash-only — not something an agent commits.
- **On merge — local branch deleted.** On returning to `main` after a merge, the completion tooling / agent deletes the merged local unit branch (`git branch -d <branch>`).
- **Stale/unmerged branches** (abandoned or superseded units) are pruned as part of the **monthly Civitas health check** (Thurgood's cadence). This prevents the failure mode where one long-lived branch quietly accumulates unrelated later work into a tangled divergence from `main`.
- **Tooling follow-up (optional)**: `complete-task.sh` may auto-prune the local unit branch once it detects the merge — a convenience, not a hard requirement; the manual `git branch -d` step is not blocked on it.

### Branch and PR Conventions

- **The `<spec>` token, defined once**: everywhere in this law, `<spec>` is the **spec ID** — the leading identifier segment of the spec directory name (`125-A` from `125-A-pr-gate-mechanical-arming`; `052` from `052-badge-count-base`). Branch names and PR titles use the spec ID; the PR body's `Spec:` field carries the full directory name.
- **Branch names**: `task/<spec>-<task-number>-<short-slug>` for spec tasks (e.g., `task/125-A-2-commit-task-rework`, `task/052-4-web-implementation`); `fix/<slug>` or `chore/<slug>` for non-spec work.
- **PR title** = the commit-message standard, spec-suffixed: `Task <N> Complete: <Description> (<spec>)` (e.g., `Task 2 Complete: Rework task tooling for PR flow (125-A)`). Because squash-merge makes the title the commit subject, title discipline IS commit-message discipline.
- **PR body** MUST carry: `Spec:` (spec directory name), `Task:` (task number + name), `Agent:` (authoring agent, or `Peter` for human-direct work), path(s) to the completion doc(s) on the branch, and a one-line validation note (which tier/commands ran locally).
- **Unit-grain naming (multi-parent units)**: a unit spanning multiple parents uses a unit slug — branch `task/<spec>-<unit-slug>` (e.g., `task/122-substrate`, `task/122-cutover-ada`); PR title `<Unit description> (<spec>)`. A single-parent unit keeps the unchanged `task/<spec>-<N>-<slug>` branch and `Task <N> Complete: <Description> (<spec>)` title.
- **PR body** additionally carries a `Unit:` field (the declared merge unit, or the task for single-parent units) alongside the existing `Spec:` / `Task:` / `Agent:` / completion-doc-path / validation-note fields.

### The Merge Rule

- **Agents open PRs; Peter merges on green** during bake-in (Spec 125-A Task 5's gate). Agents NEVER merge their own PRs and NEVER push to `main`.
- Any later **delegation of merge-on-green must be a recorded rule** (ballot or committed record with date and scope) — never a verbal grant. The relayed-authority lesson: authority is a record.
- **Standing carve-out, surviving any delegation**: PRs touching governance law (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) stay Peter-merged — the closest ratification proxy until 125-B's CODEOWNERS layer.

### Emergency Procedure

When the gate must be bypassed (broken gate, urgent fix the checks themselves block): **Peter temporarily lifts branch protection in Settings → Branches, performs the change, re-enables protection immediately, and logs the use in 125-A's findings ledger** with entry type `EMERGENCY-BYPASS`: date, reason, what was pushed, protection-off duration, and the follow-up PR if the change needs regularizing. No agent may request the lift as a convenience path; repeated use of the emergency path for non-emergencies is itself a findings-ledger entry.

**In-repo rollback is not exempt**: rollback procedures illustrated in the release-tool consumer docs end in `git push origin main` — valid for consumer repos, rejected in this repo. An in-repo rollback traverses a PR or this emergency path.

---

## Tier Selection (which docs, how much detail)

- **Subtasks**: a single completion doc (`task-N-M-completion.md`). No summary doc.
- **Parent tasks**: BOTH a detailed completion doc (`.kiro/specs/[spec]/completion/`) AND a concise summary doc (`docs/specs/[spec]/`).
- The Completion Documentation Guide (queried by `id` above) is the canonical source for the two-document workflow and documentation tiers — pull it when you need depth.

---

## Key Rules

- **Implementation / Architecture tasks**: the unit's required checks enforce a green suite at merge — local validation before completion catches failures early.
- **All parent tasks**: create BOTH the completion doc AND the summary doc, on the task branch.
- **All tasks**: STOP after completion — never auto-proceed to the next task. Authorization to START the next task is governed by Start Up Tasks; the merge that completes this task is not that authorization.
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + an **optional, judgment-based** branch commit-and-push (at a checkpoint, on backup-worthy accumulation, or at a session/handoff boundary — not mechanically per subtask); parents get full validation + completion doc + summary doc, committed on the branch.
- **The merge unit is the coherent unit** — the smallest chunk that is coherent-on-its-own AND reviewable as a single diff, DECLARED in the spec's tasks.md (a small spec = one unit = one PR; a large spec declares internal units). The unit's completion opens the PR; a parent inside a multi-parent unit is done-on-branch, accepted at the unit's merge.
- **A task is accepted at the MERGE of its unit.** Agents open PRs at unit completion; Peter merges on green. Never merge your own PR; never push to `main` (branch protection rejects it, admins included).
- **On merge, the unit's branch is cleaned up** — remote auto-deleted by repo setting; local deleted on return to `main`; stale/unmerged branches swept in the monthly Civitas health check.
- **A checks-only merge is NOT ratification**: governance-law changes still ratify via the record-first ballot protocol (`.kiro/docs/ballots/README.md`).
- **Delegated-tier capture (exception-based)**: if the agent/model that actually did the work **diverged** from the task's planned `**Agent**: <agent> (<Model>)` — a different tier, or additional agents pulled in — record the delta and a one-line reason in the completion doc. A plan that held needs no note. This is a cheap data-point, **not** a justification to defend (overriding a stale or rote stamp is the *correct* move) — it feeds model-tier recalibration and process audits. Agent-evolution (routing/scope estimate was off) and model-evolution (cognitive-demand estimate was off) are distinct signals — note which. See `process-orchestration-model-selection`.
