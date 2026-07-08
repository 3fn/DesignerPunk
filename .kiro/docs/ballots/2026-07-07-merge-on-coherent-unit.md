# Ballot Measure: Merge on the Coherent Unit (right-sizing the merge granularity)

**Date**: 2026-07-07
**Author**: Thurgood (Civitas steward)
**Origin**: Peter's proposal (2026-07-07) — "commit on parent completion, merge on spec completion" — reshaped in analysis to **merge on coherent-unit completion**, which subsumes his proposal as the small-spec special case.
**Type**: Governance-law amendment (general workflow law; applies to every spec's completion flow).
**Amends**: The RATIFIED 125-A PR-gated workflow law. Source of the amended text: `.kiro/specs/125-A-pr-gate-mechanical-arming/task-1-workflow-ballot.md` (RATIFIED Peter, 2026-07-05), as applied into `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope", § "Completion State in the PR Flow", § "The Merge Rule", and the branch/PR conventions.
**Status**: **RATIFIED (Peter, 2026-07-08)** — Stacy's required review incorporated (APPROVE-WITH-AMENDMENTS, `[STACY R1]`; B1/B2/B3/M1/M3/M4/L2 folded), OQ-1 resolved (a) (see § "Review"). Ratified record-first per the README protocol: this record is committed **before** the law edits are applied. Application proceeds per Item 7.
**Refinements folded in (2026-07-07, pre-review, Peter-directed)**: (A) subtask commits become optional/judgment-based (amends R4; Items 1c, 2a-bis, 2b); (B) branch cleanup added as R8 (Item 2f + config action for Peter + monthly-health-check stale sweep). Both fold in *before* Stacy's review so she reviews the complete measure — see Item 8 (e)/(f).
**Stacy R1 incorporated (2026-07-07, `[THURGOOD R2]`)**: verdict APPROVE-WITH-AMENDMENTS (3 Blocking + 3 Medium). Folded: **B1** → new **R3a** (unit-declaration format as law) in § "The Rule"; **B2** → new **Item 1e** (unit-conditional for the completion-guide parent checklist); **B3** → new **Item 5b** (unit-conditional for the two Process-Spec-Planning Post-Completion worked examples); **M1** → apply-time line-anchor caveat in Item 7 + stale "~311"→136 correction; **M3** → residual-risk sentence named in R4's rationale; **M4** → Item 7.5 (interim-then-durable Thurgood-prompt handoff). Count 11 → **13** law edits; Item 6 sweep scope widened. **One open question flagged for Peter** (M3's mandatory session/handoff push — NOT resolved here). See § "Review".
**Placement note**: This measure arises from a standalone Peter directive (not from a spec task), so it lives here in the ballots directory per the ballots README convention (`YYYY-MM-DD-<slug>.md`).

---

## The Problem (why 125-A's granularity needs right-sizing)

125-A established the PR gate and, with it, an **implicit merge granularity**: the law's mechanism opens a PR **at parent-task completion** ("At parent-task (or standalone-task) completion, the tooling ... opens a PR" — Task-Completion-Protocol § Completion State, point 4; mirrored in both PARENT-TASK sequences and the hook-ergonomics line). One parent task → one PR → one merge.

That granularity is wrong at both ends of the spec-size distribution:

- **Per-parent-PR over-fragments large specs.** Spec 122 has 18 parent tasks. Under the current rule that is **18 PRs and 18 merges** for one coherent program of work — most of them (the 8 substrate parents) not independently shippable, since Group 2 cannot start until the substrate closure bundle merges anyway. The reviewer (Peter) pays 18 merge-decisions where the substrate is a single reviewable achievement.
- **Per-spec-PR (Peter's first instinct) under-fragments large specs.** "Merge once, at spec completion" makes 122's substrate + 8 cutovers + OB-7 + closeout **one ~40-file diff** — unreviewable as a single unit, and it reintroduces the long-lived-branch drift that produced the spec-118 tangle (a branch open across many parents diverges from `main`). It would also **kill Peter's own per-cutover diff-against-baseline verification idea** (each agent's generated output compared against its current hand-authored config), which needs one PR per cutover to have a place to live.

**The reconciliation**: the merge unit should be the smallest chunk that is **coherent-on-its-own AND reviewable as a single diff.** For a small spec, that is the whole spec (Peter's proposal, exactly). For a large spec, that is an internal grouping the spec **declares in its own tasks.md** — not an ad-hoc judgment made at merge time.

This is a **refinement of 125-A, not a reversal.** It keeps the gate (branch protection, required checks, admin-inclusive), the squash-only merge method, the reviewable-diff principle, merge-as-completion, the governance-law carve-out, the emergency path, the dependent-work-branches-from-`main`-after-prior-merge rule, and record-first ratification. It changes **one thing**: the size of the chunk that a PR carries.

---

## Draft-Time Enumeration (fresh grep, 2026-07-07)

Per the ballots README edit discipline (hand lists are floors; the grep is the authority) and the 125-A lesson (its enumeration was wrong three times). Patterns run (case-insensitive ERE) over `.kiro/steering/**` and `governance/**`, worktrees excluded:
`opens? (a|the) (task )?PR`, `at parent.task.*completion`, `parent completion opens`, `standalone.task.*completion`, `one PR`, `per.?parent`.

**Finding — the granularity is stated in exactly ONE place, mechanically, and echoed in the step-sequences.** No law doc contains a standalone sentence "every parent task is one PR"; the granularity is *encoded* in the mechanism "parent-task completion opens the PR." That means the amendment surface is small and precise:

### Live law surfaces — the parent→PR mechanism (exact before→after in this ballot)

| # | Surface (line anchor at draft time) | What it encodes |
|---|-------------------------------------|-----------------|
| 1 | `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope" — PARENT TASKS (Implementation/Architecture), step 5 (line ~48) | parent completion → open PR |
| 2 | `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope" — PARENT TASKS (Setup/Documentation), step 5 (line ~56) | parent completion → open PR |
| 3 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — subtask-mechanics hook-ergonomics note (line ~70) | "parent completion ... opens the PR" |
| 4 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — point 4 (line ~72) | "At parent-task (or standalone-task) completion, the tooling ... opens a PR" |
| 5 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — the Item-1d definition block, points 3–5 (lines ~81–83) | "the task is complete at merge" — needs the intra-unit-parent clarification |
| 6 | `.kiro/steering/Task-Completion-Protocol.md` § "Key Rules" (lines ~???) | "parents get ... a PR" |
| 7 | `governance/Process-Development-Workflow.md` Git Practices — Commits bullet (line ~136; draft mis-stated ~311, corrected per Stacy M1) | "one `main` commit per task" framing |

### Live law surfaces — Refinement-A (subtask commit → optional/judgment-based) and Refinement-B (branch cleanup)

Added 2026-07-07 (Peter's two refinements folded in before Stacy's review). Fresh grep for the subtask-commit surface: `subtask.*(commit|push)`, `commit.*push the branch`, `push the branch`; and for the branch-cleanup surface: `delete.*branch`, `stale branch`, `prune`, `automatically delete`, `head branch` — over `.kiro/steering/**` and `governance/**`, worktrees excluded.

| # | Surface (line anchor at draft time) | Refinement | What it encodes / adds |
|---|-------------------------------------|-----------|------------------------|
| 8 | `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope" — SUBTASKS, step 4 (line ~40) | A | mandatory subtask commit+push → **judgment-based** (Item 1c) |
| 9 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — point 2, subtask-mechanics "one rule" sentence (line ~68) | A | mandatory → judgment-based (Item 2a-bis) |
| 10 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — hook-ergonomics note (line ~70) | A | subtask commit is a checkpoint, not mechanical (Item 2b, refined) |
| 11 | `.kiro/steering/Task-Completion-Protocol.md` § "Completion State" — NEW "### Branch Cleanup" subsection (inserted after Coherent Units, before Branch and PR Conventions) | B | branch-delete-on-merge + monthly stale sweep (Item 2f) — **no before-text; pure insertion** |
| 12 | `.kiro/steering/Task-Completion-Protocol.md` § "Key Rules" — the "subtasks get ... a branch commit" bullet (line ~123) | A + B | already in Item 3a (granularity); its after-text now also softens subtask-commit to judgment-based and adds a branch-cleanup bullet |

**Branch-cleanup grep = ZERO existing hits** in `.kiro/steering/**` and `governance/**` — confirming Refinement B is genuinely new (no antecedent to amend, so Item 2f is an insertion, not a before→after).

**Cross-surface note (health-check enumeration lives in an agent prompt, not a steering doc).** R8's "fold the stale-branch sweep into the monthly Civitas health check" touches the health check's *step list*, which lives in **Thurgood's prompt** (Civitas Steward operational mode) and optionally `scripts/governance-check.sh` — NOT in any steering/governance `.md`. The steering docs reference the monthly health check only abstractly (`start-up-tasks.md:22`, `Civitas-System-Overview.md:102-103`), so no steering edit is needed for the sweep; the prompt/script change is a **carve-out application item** (agent prompts are Peter-merged governance surfaces; the 122 agent generator is the durable home for prompt content). Flagged in Item 7 and for Stacy in Item 8. **Left unedited in this ballot's law-surface set by design.**

### Live law surfaces — generic (say "at task completion, open the PR"; NOT parent-bound; NO edit needed)

`core-goals.md:41` (L1-confirmed generic), `governance/Process-Development-Workflow.md:85/116/175`, `governance/Process-Spec-Planning.md:2492` (Path-A generic step 6 — B3-assessed, delegates PR timing to the tooling), `governance/Component-Development-Standards.md:1124` (L1-confirmed generic). These read "complete tasks via the PR flow" / "open the task PR" generically — they do not assert *per-parent* granularity and remain correct after this amendment (the completion tooling stays the PR-opening mechanism; only *when* it opens changes, which the tooling itself decides context-aware). **Left unedited by design**; the Item-6 sweep (scope now includes `completion-documentation-guide.md` and `Process-Spec-Planning.md`) confirms none newly contradict the unit rule.

**Reclassified OUT of "generic" by Stacy R1 (now amended — see Items 1e, 5b):** `governance/completion-documentation-guide.md` "### For Parent Tasks" checklist (was mis-cited `:354`; live ~355–356) is a concrete parent-completion checklist → **Item 1e** (B2). `governance/Process-Spec-Planning.md` "**Post-Completion:**" worked examples (was mis-cited `:469/571`; live 472/574) are parent-bound examples → **Item 5b** (B3). These were draft-time false-negatives in the "generic" set; the exact-verbatim before-texts still matched (M1), only the classification and line anchors were wrong.

**Count**: **13 law edits** in `.kiro/steering/**`/`governance/**` (was 11 pre-Stacy; +2 from B2/B3) — the original 7 (granularity: Items 1a/1b, 2b-orig/2c/2d, 3a, 5a), plus 4 from the two refinements (Items 1c, 2a-bis, 2b-refined, 2f), plus **2 from Stacy R1** (Item 1e — completion-documentation-guide parent checklist, B2; Item 5b — the two Process-Spec-Planning Post-Completion worked examples counted as one governance-echo edit, B3). Most land in the always-loaded Task-Completion-Protocol; the governance echoes are Process-Development-Workflow (Item 5a), Process-Spec-Planning (Item 5b), and completion-documentation-guide (Item 1e). One further surface — the monthly-health-check step list — lives in Thurgood's prompt (carve-out application, not a steering edit; see the cross-surface note above and Item 7.5).

*(Counting note: B3 amends two identical worked-example blocks in one file under one Item (5b); counted as a single law edit for the "13" tally. If Peter prefers per-block counting the tally reads 14 — flagged for transparency, not a substantive difference.)*

---

## Considered Alternative (counter-argument — recorded, not hidden)

**Keep per-parent-PR; solve 122's fragmentation by making 122's substrate a single parent task with sub-parents.** Rejected: it distorts the task tree to fit the merge rule (the substrate genuinely IS eight parents' worth of work — collapsing them into one loses the sequencing and validation-tier structure), and it does not generalize (the next large spec re-fights the same shape). The merge unit should flex to the work, not the work to the merge unit.

**The honest counter-argument AGAINST this ballot** (the one Peter should weigh): *"coherent unit" is fuzzier than "parent task" or "whole spec" — both of those are mechanically unambiguous, and a fuzzy merge-granularity rule invites drift ("is this a unit?") at exactly the gate 125 exists to make mechanical.* **Mitigation (the load-bearing design choice):** the unit is **NOT judged at merge time.** The spec's own `tasks.md` **declares** its merge units as an explicit grouping (for 122: substrate / each cutover / OB-7 / closeout). By the time an agent reaches completion, "what is this unit" is a lookup, not a judgment. The rule is fuzzy only in the abstract; in practice every spec names its units up front, reviewed in the tasks feedback round like any other decomposition decision. A small spec declares one unit (the whole spec) and the fuzziness vanishes entirely. **Residual risk accepted:** a spec author could declare a unit too large to review; that is caught in the tasks feedback round (the same place task decomposition is already reviewed), not at the gate.

---

## The Rule (the normative content this ballot encodes)

**R1 — The merge unit is the coherent unit.** A pull request carries a **coherent unit**: the smallest chunk of a spec's work that is BOTH (a) coherent on its own — it delivers a self-contained, meaningful increment — AND (b) reviewable as a single diff. The merge of a unit's PR is the completion event for every task in that unit.

**R2 — Small spec: the unit is the whole spec.** When a spec's entire body of work is one reviewable chunk, the spec declares a single merge unit and ships one PR (Peter's original proposal — the common case for small specs). This is the default; a spec is presumed a single unit unless its tasks.md declares otherwise.

**R3 — Large spec: units are DECLARED by the spec's own tasks.md grouping.** When a spec is too large to review as one diff, its tasks.md **declares** its internal coherent units as an explicit task grouping (e.g., 122: the substrate group / each per-agent cutover / OB-7 / closeout). The tasks doc **names** the units; it is not an ad-hoc judgment made at merge time. Declaring the units is a decomposition decision, reviewed in the tasks feedback round.

**R3a — Unit-declaration format (the format sub-requirement — makes "which unit is task N?" a field read, never a merge-time judgment).** A spec that declares multiple units under R3 declares them in a fixed, machine-legible format so unit membership is looked up, not adjudicated. Three carriers, all required:
- **Per-parent-task field.** Each parent task in tasks.md carries a `**Unit**: <unit-id>` field beside its existing `**Type**:` line. This is the authoritative membership record for that task.
- **Preamble unit table.** The tasks.md preamble carries a unit table (`unit-id → description → member tasks`) for orientation — the roster the per-task fields index into.
- **Per-PR field.** Each unit's PR body carries a `Unit:` field (already required by R7 / Item 4) naming the declared unit it merges.

A single-unit (small) spec need not declare units explicitly (R2's default presumption stands — the whole spec is the one unit); the format applies once R3 is in force. *This ratifies as law the format 122's already-RATIFIED tasks.md uses — it is not a new invention. It is the format authority RATIFIED `122/tasks.md` cites (its lines 5, 16 reference "R3a"); B1 flagged that the citation had no target until now.*

**R4 — Within a unit's branch.** One branch per unit. On that branch:
- **Subtasks** — commits are **optional and judgment-based**, NOT mechanical-per-subtask. When you do commit, **commit AND push the branch** (the two stay coupled — the push is the off-machine backup guarantee; a local-only commit is not backed up). Commit-and-push at a **checkpoint** (work that is delicate or potentially breaking, so a known-good restore point is worth having before the next step), when **backup-worthy work has accumulated** (a coherent-unit branch is longer-lived than a single task, so more unpushed work sits at risk between merges — push before that pile grows), or at a **session/handoff boundary**. Do NOT open a PR (unchanged from 125-A). *Rationale: mandatory-per-subtask is ceremony when the work is trivial — the unit squash-merges anyway, so subtask granularity is cosmetic to `main`'s history — but the backup habit must survive the longer-lived unit branch, which is exactly why commit and push stay coupled and the trigger includes "backup-worthy accumulation," not only "delicate/breaking." **Named residual risk (Stacy M1):** making commits judgment-based on a MORE-exposed branch (the unit branch is longer-lived than a single task) means an agent under completion bias can under-fire the soft "backup-worthy accumulation" trigger and let unpushed work pile up unbacked — the mirror of the fuzziness counter-argument above, and stated here rather than buried. The coupling (commit AND push together) bounds the blast radius but does not by itself force the trigger to fire; whether to add a HARD backup floor (a mandatory session/handoff-boundary push) is an open question flagged for Peter at ratification — see § "Review", THURGOOD R2, open question OQ-1.*
- **Parent completions** commit on the branch (completion doc + summary doc + `taskStatus` all land on the branch) — **no PR** when the parent is one of several in the unit.
- **The unit's completion opens the PR** — the completion of the unit's final/gating parent runs the PR-opening tooling.
- **Peter merges** (squash) — the merge accepts the whole unit.
When a unit contains exactly one parent (a standalone task, or a small spec whose single parent IS the unit), R4 collapses to the 125-A behavior exactly: that parent's completion opens the PR. **No regression for the small-spec / standalone case.**

**R5 — Completion semantics, clarified.** A task is complete at the **merge of its unit**. A parent task *inside* a multi-parent unit is **done-on-branch** — its completion doc, summary doc, and `taskStatus` land on the branch when the parent finishes — and **accepted at the unit's merge**. The unit merge is the single acceptance event for every task the unit contains. Until that merge, an on-branch parent's completed status is an assertion awaiting acceptance, not a fact about `main` (the 125-A framing, now applied at unit rather than parent granularity).

**R6 — Everything else from 125-A is preserved unchanged:**
- Branch protection on `main`, admin-inclusive; direct pushes rejected.
- Squash-merge is the only merge method (repo-configured).
- Governance-law carve-out: PRs touching `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs stay Peter-merged.
- Emergency-bypass path (Peter lifts protection, logs in the findings ledger); in-repo rollback not exempt.
- **Dependent units branch from `main` after the prior unit's PR merges** (the 125-A dependent-task rule, re-scoped from "task" to "unit" — a unit is the new dependency grain; stacking only on Peter's explicit direction with `Stacked-on: #<PR>`).
- Stop-and-wait composes unchanged: authorization to START the next task/unit is a separate explicit grant; a merge accepts the finished unit, it does not instruct the agent to begin the next.
- A checks-only merge is NOT ratification; governance-law changes ratify via the record-first ballot protocol.
- Release analysis runs post-merge on `main` (the unit merge is now the trigger, still one squash-commit per merged unit on the release line).

**R7 — Branch and PR naming, at unit grain.** Branch: `task/<spec>-<unit-slug>` (e.g., `task/122-substrate`, `task/122-cutover-ada`) — the `<task-number>` slot from 125-A generalizes to a unit slug when a unit spans multiple parents; a single-parent unit keeps `task/<spec>-<N>-<slug>` unchanged. PR title: `<Unit description> (<spec>)` for multi-parent units (e.g., `Substrate: pipeline, adapters, checks, gate (122)`), or the unchanged `Task <N> Complete: <Description> (<spec>)` for single-parent units. PR body carries `Spec:` / `Unit:` (the declared unit, or the task for single-parent units) / `Agent:` / completion-doc path(s) / validation note.

**R8 — Branch cleanup (NEW — no 125-A antecedent).** A unit's branch is deleted once it has served its purpose. 125-A said nothing about branch lifecycle end; longer-lived unit branches make that omission costly (the spec-118 tangle — see the stale-branch bullet's rationale), so this ballot adds cleanup as a first-class rule:
- **On merge — remote branch auto-deleted.** GitHub's repo setting **"Automatically delete head branches"** is enabled so every squash-merge deletes the merged unit's remote branch. This is a **ratification-time config action Peter performs** (Settings → General → "Automatically delete head branches" toggle) — a Settings toggle, not a doc edit, exactly like the branch-protection and squash-only settings 125-A relied on. It cannot be committed by an agent.
- **On merge — local branch deleted.** The completion tooling / agent, on returning to `main` after a merge, deletes the now-merged local unit branch (`git branch -d <branch>`).
- **Stale/unmerged branches pruned periodically.** Branches that never merge (abandoned units, superseded work) are swept as part of the **monthly Civitas health check** (Thurgood's existing cadence). Rationale: this prevents the old failure mode where a long-lived branch (e.g. `spec-118`) quietly accumulated unrelated later work (119/122/123) into one tangled divergence from `main`.
- **Tooling follow-up (optional, not a hard requirement).** `complete-task.sh` may prune the local unit branch automatically once it detects the merge — named here as a follow-up so the manual `git branch -d` step above is not blocked on it.

---

## Item 1 — `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope"

**1a. PARENT TASKS (Implementation or Architecture type).** The sequence stays; step 5 becomes unit-aware. Before:
```markdown
5. [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — commits, pushes the branch, opens the PR, reports the PR URL (release analysis runs post-merge on `main`)
6. [ ] **STOP** — report the PR URL and wait. **The task is complete when Peter merges** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```
After:
```markdown
5. [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."`.
   - **If this parent IS its own merge unit** (a standalone task, or a small single-unit spec): the tooling opens the PR and reports the URL.
   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent).
6. [ ] **STOP** — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. **The task is accepted when Peter merges the UNIT's PR** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```

**1b. PARENT TASKS (Setup or Documentation type).** Identical shape. Before:
```markdown
5. [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — commits, pushes the branch, opens the PR, reports the PR URL (release analysis runs post-merge on `main`)
6. [ ] **STOP** — report the PR URL and wait. **The task is complete when Peter merges** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```
After:
```markdown
5. [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."`.
   - **If this parent IS its own merge unit**: the tooling opens the PR and reports the URL.
   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**; the PR opens at UNIT completion.
6. [ ] **STOP** — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. **The task is accepted when Peter merges the UNIT's PR** (merge on green = the authorization act). Never merge your own PR; never push to `main`.
```

**1c. SUBTASKS — step 4 (Refinement A: subtask commits become optional/judgment-based).** The mandatory "commit and push the branch" per subtask becomes a judgment-based checkpoint. Before:
```markdown
4. [ ] Commit with plain git on the task branch and push the branch (`task/<spec>-<N>-<slug>`, created at the first subtask — `git switch -c` or the completion tooling's equivalent). Pushing gives subtask-level visibility and backup; no PR opens and no required checks fire until parent completion. Subtasks do NOT open PRs. Never commit to `main`.
```
After:
```markdown
4. [ ] **Commit is optional and judgment-based — not mechanical per subtask.** When you commit, **commit AND push the unit branch** (`task/<spec>-<unit-slug>` or `task/<spec>-<N>-<slug>`, created at the first subtask — `git switch -c` or the completion tooling's equivalent); the two stay coupled because the push is the off-machine backup guarantee (a local-only commit is not backed up). Commit-and-push at a **checkpoint** (delicate or potentially-breaking work — a restore point worth having), when **backup-worthy work has accumulated** (a unit branch is longer-lived than a single task, so more unpushed work sits at risk between merges — push before the pile grows), or at a **session/handoff boundary**. Do NOT commit mechanically after every trivial subtask — the unit squash-merges anyway, so subtask granularity is cosmetic to `main`'s history. No PR opens and no required checks fire until unit completion. Subtasks do NOT open PRs. Never commit to `main`.
```

**1e. `governance/completion-documentation-guide.md` § "Workflow Checklist" → "### For Parent Tasks" (Stacy B2 — a concrete parent-completion checklist that encodes PR-at-every-parent; the draft mis-classified it "generic / left unedited").** This checklist ends "Open the task PR ... STOP ... complete when Peter merges" — parent-bound, not generic — so it gets the same unit-conditional as Items 1a/1b. Before (last two checklist items, string-located; live at ~355–356, anchors are draft-time):
```markdown
- [ ] Open the task PR: `./.kiro/hooks/complete-task.sh "Task N Complete: Description (<spec>)"` — completion and summary docs travel on the branch
- [ ] STOP — report the PR URL and wait; the task is complete when Peter merges
```
After:
```markdown
- [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."` — completion and summary docs travel on the branch.
   - **If this parent IS its own merge unit** (a standalone task, or a small single-unit spec): the tooling opens the PR.
   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the docs on the branch — **no PR yet**; the PR opens at UNIT completion.
- [ ] STOP — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. The task is **accepted when the UNIT merges**.
```

---

## Item 2 — `.kiro/steering/Task-Completion-Protocol.md` § "Completion State in the PR Flow"

**2a. Insert the unit definition** — immediately after the `Branch → PR → required checks → merge.` line and before numbered point 1, add:
```markdown
**The merge unit is the coherent unit.** A PR carries a **coherent unit** — the smallest chunk of a spec's work that is coherent on its own AND reviewable as a single diff. For a small spec the unit is the whole spec (one PR). For a large spec the units are **declared in that spec's own tasks.md** as a task grouping (e.g., a substrate group / each per-agent cutover / a closeout) — named up front, never judged at merge time. One branch per unit; the unit's completion opens the PR; Peter merges the unit.
```

**2a-bis. Point 2 subtask-mechanics block (Refinement A: mandatory → judgment-based).** The "one rule" sentence that mandates a commit-and-push per subtask becomes judgment-based. Before:
```markdown
2. **Subtask mechanics** (one rule — commit method, push semantics, branch creation, PR timing): subtasks commit with **plain git on the task branch and push the branch**. No PR opens and no required checks fire until parent completion; subtasks do NOT open PRs.
```
After:
```markdown
2. **Subtask mechanics** (one rule — commit method, push semantics, branch creation, PR timing): subtask commits are **optional and judgment-based, not mechanical per subtask** — and when made, they **commit AND push the branch** with plain git (the two stay coupled; the push is the off-machine backup). Commit-and-push at a **checkpoint** (delicate or potentially-breaking work), when **backup-worthy work has accumulated** (a unit branch is longer-lived than a single task — push before the unpushed pile grows), or at a **session/handoff boundary** — not after every trivial subtask, since the unit squash-merges anyway and subtask granularity is cosmetic to `main`. No PR opens and no required checks fire until unit completion; subtasks do NOT open PRs.
```
*(The paragraph that follows in the doc — "AMENDED FROM THE OLD FLOW ... Subtask commits-and-pushes are NEW behavior ..." — stays as historical rationale for why subtasks may push at all; this ballot only right-sizes the frequency from mandatory to judgment-based, so that paragraph remains accurate and is left unedited.)*

**2b. Hook-ergonomics note (subtask-mechanics block).** Before:
```markdown
   **Hook ergonomics**: one completion command, context-aware — invoked for a subtask it commits and pushes the branch (no PR); invoked for parent completion it commits, pushes, and opens the PR (`./.kiro/hooks/complete-task.sh`).
```
After:
```markdown
   **Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch (no PR); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR.
```

**2c. Point 4 (the parent→PR mechanism — the load-bearing edit).** Before:
```markdown
4. At parent-task (or standalone-task) completion, the tooling commits, pushes the branch, **opens a PR**, and reports the PR URL.
```
After:
```markdown
4. At **unit** completion (a standalone task, a small single-unit spec, or the final/gating parent of a declared multi-parent unit), the tooling commits, pushes the branch, **opens a PR**, and reports the PR URL. A parent completing *inside* a multi-parent unit commits its completion+summary docs on the branch and does NOT open a PR — its acceptance is the unit's merge.
```

**2d. The completion-state definition block (the "A task is complete at MERGE" list), points 3 and 5.** Point 3 before:
```markdown
> 3. The agent marks the task complete (`taskStatus` tool / tasks.md checkbox) **on the branch, before opening the PR** — the status change is part of the work product and lands atomically with it. Until merge, that status is an assertion awaiting acceptance, not a fact about `main`.
```
After:
```markdown
> 3. The agent marks the task complete (`taskStatus` tool / tasks.md checkbox) **on the branch** — the status change is part of the work product and lands with it. For a parent *inside* a multi-parent unit this happens at parent completion (docs + status on the branch, no PR); for the unit's final parent it happens before the PR opens. Until the UNIT merges, every such status is an assertion awaiting acceptance, not a fact about `main`.
```
Point 5 before:
```markdown
> 5. **Peter's merge is the authorization act.** It accepts the work AND its completion claim into `main` in one platform-verified action — merging IS the acknowledgment the old flow's completion report asked for.
```
After:
```markdown
> 5. **Peter's merge is the authorization act.** It accepts the whole UNIT — every task in it AND their completion claims — into `main` in one platform-verified action. A parent task inside a multi-parent unit is **done-on-branch** at its own completion and **accepted at the unit's merge**; the unit merge is the single acceptance event.
```

**2e. Add a "Coherent units" subsection** — after the numbered completion-state list (point 9) and before "### Branch and PR Conventions", insert:
```markdown
### Coherent Units (the merge granularity)

- **What a unit is**: the smallest chunk of a spec that is coherent on its own AND reviewable as a single diff. The merge of a unit's PR is the completion event for every task the unit contains.
- **Small spec → one unit → one PR** (the default and common case; equals the 125-A single-parent behavior).
- **Large spec → units DECLARED in tasks.md**: the spec's tasks.md names its units as a task grouping (substrate / each cutover / closeout, etc.). Units are named up front and reviewed in the tasks feedback round — never judged at merge time.
- **One branch per unit**: subtasks commit+push the branch at judgment-based checkpoints (not mechanically per subtask); parent completions commit their docs on the branch; the unit's completion opens the PR; Peter merges (squash).
- **Dependent units branch from `main` after the prior unit's PR merges** — the unit is the dependency grain (stacking only on Peter's explicit direction, `Stacked-on: #<PR>`).
- **On merge, the unit's branch is deleted** (remote auto-deleted by repo setting; local deleted on return to `main`); stale/unmerged branches are swept in the monthly Civitas health check — see § "Branch Cleanup".
```

**2f. Add a "Branch Cleanup" subsection (Refinement B — NEW; no 125-A antecedent).** Insert immediately after the "### Coherent Units" subsection (2e) and before "### Branch and PR Conventions":
```markdown
### Branch Cleanup

125-A left branch lifecycle-end unspecified. Longer-lived unit branches make that gap costly, so cleanup is a first-class rule:

- **On merge — remote branch auto-deleted.** GitHub's **"Automatically delete head branches"** repo setting is enabled, so every squash-merge removes the merged unit's remote branch. This is a **repo Settings toggle Peter enables** (Settings → General), a config action like branch protection and squash-only — not something an agent commits.
- **On merge — local branch deleted.** On returning to `main` after a merge, the completion tooling / agent deletes the merged local unit branch (`git branch -d <branch>`).
- **Stale/unmerged branches** (abandoned or superseded units) are pruned as part of the **monthly Civitas health check** (Thurgood's cadence). This prevents the failure mode where one long-lived branch quietly accumulates unrelated later work into a tangled divergence from `main`.
- **Tooling follow-up (optional)**: `complete-task.sh` may auto-prune the local unit branch once it detects the merge — a convenience, not a hard requirement; the manual `git branch -d` step is not blocked on it.
```

---

## Item 3 — `.kiro/steering/Task-Completion-Protocol.md` § "Key Rules"

**3a.** Before:
```markdown
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + a branch commit; parents get full validation + completion doc + summary doc + a PR.
- **A task is complete at MERGE.** Agents open PRs; Peter merges on green. Never merge your own PR; never push to `main` (branch protection rejects it, admins included).
```
After:
```markdown
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + an **optional, judgment-based** branch commit-and-push (at a checkpoint, on backup-worthy accumulation, or at a session/handoff boundary — not mechanically per subtask); parents get full validation + completion doc + summary doc, committed on the branch.
- **The merge unit is the coherent unit** — the smallest chunk that is coherent-on-its-own AND reviewable as a single diff, DECLARED in the spec's tasks.md (a small spec = one unit = one PR; a large spec declares internal units). The unit's completion opens the PR; a parent inside a multi-parent unit is done-on-branch, accepted at the unit's merge.
- **A task is accepted at the MERGE of its unit.** Agents open PRs at unit completion; Peter merges on green. Never merge your own PR; never push to `main` (branch protection rejects it, admins included).
- **On merge, the unit's branch is cleaned up** — remote auto-deleted by repo setting; local deleted on return to `main`; stale/unmerged branches swept in the monthly Civitas health check.
```

---

## Item 4 — `.kiro/steering/Task-Completion-Protocol.md` § "Branch and PR Conventions"

**4a. Add unit-grain naming** — append two bullets to the existing convention list (the `<spec>`/branch-name/PR-title/PR-body bullets stay; these extend them):
```markdown
- **Unit-grain naming (multi-parent units)**: a unit spanning multiple parents uses a unit slug — branch `task/<spec>-<unit-slug>` (e.g., `task/122-substrate`, `task/122-cutover-ada`); PR title `<Unit description> (<spec>)`. A single-parent unit keeps the unchanged `task/<spec>-<N>-<slug>` branch and `Task <N> Complete: <Description> (<spec>)` title.
- **PR body** additionally carries a `Unit:` field (the declared merge unit, or the task for single-parent units) alongside the existing `Spec:` / `Task:` / `Agent:` / completion-doc-path / validation-note fields.
```

---

## Item 5 — `governance/Process-Development-Workflow.md` § "Git Practices"

**5a. The Commits bullet** (states the per-task `main`-commit framing). Before:
```markdown
- **Commits**: Atomic commits per subtask on the branch; squash-merge yields one `main` commit per task with the PR title as its subject
```
After:
```markdown
- **Commits**: Atomic commits per subtask on the branch; squash-merge yields one `main` commit per **merge unit** with the PR title as its subject (a unit is the whole spec for small specs, or a tasks.md-declared grouping for large specs — see Task-Completion-Protocol § Coherent Units)
```

*(This is the only governance echo that asserts per-task `main`-commit granularity. The other governance surfaces enumerated above say "open the task PR" generically and stay correct — the completion tooling opens the PR at unit completion, which those generic instructions already delegate to.)*

**5b. `governance/Process-Spec-Planning.md` — the two `**Post-Completion:**` worked-example blocks (Stacy B3).** These are worked task examples whose last line is parent-bound ("Open the task PR ... report the PR URL and STOP; complete at merge"), NOT generic — the draft's enumeration cited off-by-~3 anchors (469/571) and mis-set them "generic." **Decision: amend, not declare-stale.** Rationale (one line, consistency with 1a/1b): the ballot amends *every* parent→PR mechanism it finds normative, and these examples are the copy-paste source an author transcribes into a real tasks.md — leaving them as-is would seed the stale per-parent rule downstream, exactly what 1a/1b exist to prevent. Both blocks are identical in shape; amend each. Before-text is per-example (verbatim, string-located; live at 472 and 574, anchors are draft-time):

Example 1 (Build System Foundation, live ~472):
```markdown
  - Open the task PR: `./.kiro/hooks/complete-task.sh "Task 1 Complete: Build System Foundation (spec)"` — report the PR URL and STOP; complete at merge
```
After:
```markdown
  - Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "Task 1 Complete: Build System Foundation (spec)"`. If this parent IS its own merge unit → the tooling opens the PR; report the URL and STOP. If it is one of several in a declared multi-parent unit → docs commit on the branch (no PR); the PR opens at unit completion. **Accepted when the UNIT merges.**
```

Example 2 (Token Generation System, live ~574):
```markdown
  - Open the task PR: `./.kiro/hooks/complete-task.sh "Task 5 Complete: Token Generation System (spec)"` — report the PR URL and STOP; complete at merge
```
After:
```markdown
  - Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "Task 5 Complete: Token Generation System (spec)"`. If this parent IS its own merge unit → the tooling opens the PR; report the URL and STOP. If it is one of several in a declared multi-parent unit → docs commit on the branch (no PR); the PR opens at unit completion. **Accepted when the UNIT merges.**
```

**Third surface assessed — `Process-Spec-Planning.md:2492` (Stacy B3, "assess it too").** This is step 6 of the generic numbered completion checklist under "Path A" ("**Open the task PR**: Run `./.kiro/hooks/complete-task.sh "Task Name"` — commit on the task branch, push, open the PR, report the URL, STOP"). It is the **generic Path-A mechanic**, not a parent-bound worked example: it delegates *when* the PR opens to the completion tooling (context-aware, per Item 2b's hook ergonomics), the same as the other generic "open the task PR" surfaces. **Left unedited by design** and correctly classified generic — it stays in the not-parent-bound set below. Added to the Item 6 sweep scope so this classification is re-confirmed mechanically at application, not trusted.

---

## Item 6 — Residual sweep (application ends mechanically)

After applying Items 1–5, run over `.kiro/steering/**` and `governance/**` (worktrees, `.git`, `node_modules`, specs/records excluded):
```
at parent.task.*completion.*opens?.*PR
parent completion.*opens.*PR
one (main )?commit per task
per.?parent.*PR
subtasks? commit .*and push the branch      # Refinement A: catch any surviving MANDATORY-per-subtask phrasing
```
**Pass condition (granularity + Refinement A)**: zero hits asserting per-parent-task PR/merge granularity, and zero hits mandating a commit+push on *every* subtask (judgment-based phrasing is the target), in `.kiro/steering/**` and `governance/**` (MIGRATE scope). Generic "open the task PR" instructions are NOT hits (they delegate timing to the tooling). Records (`.kiro/specs/**`, `.kiro/docs/ballots/**` — including the 125-A ballot this amends, quoted as before-text by design) are left untouched.

**Sweep scope now explicitly includes `governance/completion-documentation-guide.md` and `governance/Process-Spec-Planning.md` (Stacy B2/B3/L2).** Both were false-negatives in the draft's "generic / unedited" set and are now amended (Items 1e, 5b); the sweep must re-confirm (a) their amended blocks no longer assert per-parent granularity and (b) no OTHER parent-bound "Open the task PR ... STOP ... complete when Peter merges" phrasing survives in either file — the draft's classification of these two files is no longer trusted, it is mechanically re-verified. `Process-Spec-Planning.md:2492` (Path-A generic step 6) is expected to remain (correctly generic); confirm it reads as tooling-delegated timing, not per-parent assertion.

**Refinement B (branch cleanup) has no residual sweep** — the draft-time grep returned zero existing branch-delete/prune hits, so there is no pre-existing phrasing to reconcile; Item 2f is a pure insertion.

---

## Item 7 — Application mechanics (record-first)

1. **No edit before the record**: this ballot's Status is updated to `RATIFIED (Peter, <date>)` and **committed** before any law edit (ballots README protocol). Any applying agent verifies the committed RATIFIED status — nothing else — before applying.
2. Apply Items 1–5 exactly as written — this now includes the Refinement-A sub-edits (Items 1c, 2a-bis, 2b-refined), the Refinement-B insertion (Item 2f, the "### Branch Cleanup" subsection, plus the added Coherent-Units cleanup bullet), and the Stacy-R1 edits (Item 1e — B2; Item 5b's two blocks — B3). A before-text mismatch stops on that block and is reported, never adapted silently (ballots README edit discipline). Item 2f is a pure insertion (no before-text). Run the Item 6 sweep; record its output in the applying task's completion doc.
   - **Line-anchor caveat (Stacy M1).** ALL line anchors in this ballot are draft-time and have already drifted (verified drift: `completion-documentation-guide.md:354`→live 355; `Process-Spec-Planning.md:469/571`→live 472/574; the enumeration table's Process-Development-Workflow Commits bullet "~311"→live 136). **Locate every before-block by its quoted string, never by its line number**, and abort per the ballots README if the quoted string is absent — do not "find the nearest match."
3. Post-edit: bump `Last Reviewed` on `Task-Completion-Protocol.md` and `Process-Development-Workflow.md`; `scripts/validate-steering-metadata.js` passes; docs MCP `rebuild_index` runs and reports healthy (Task-Completion-Protocol is always-loaded; both docs are MCP-served).
4. **Ratification-time config action Peter performs (Refinement B).** Enable GitHub's **"Automatically delete head branches"** setting (Settings → General) so every squash-merge deletes its own remote branch. This is a repo Settings toggle — like the branch-protection and squash-only settings 125-A relied on — and **cannot be committed by an agent**; it is Peter's to flip at ratification. (Repo-config parity with 125-A's arming actions.)
5. **Carve-out application — monthly-health-check step + tooling (Refinement B, R8).** Folding the stale-branch sweep into the monthly Civitas health check touches **Thurgood's prompt** (Civitas Steward mode) and optionally `scripts/governance-check.sh` — agent-prompt/tooling surfaces, Peter-merged carve-outs, whose durable home is the 122 agent generator. Applied alongside the law edit, not as part of the steering-doc set. The optional `complete-task.sh` local-branch auto-prune (R8) is a **tooling follow-up**, tracked but not gating this ballot's application.
6. **Companion, non-law application** (does not require ratification of THIS ballot, but is the reason it exists now): 122's `tasks.md` is regrouped to the declared-unit structure in the same landing — see the accompanying 122 tasks revision (its own tasks feedback round ratifies the decomposition; this ballot ratifies the general law it relies on).

**Item 7.5 — Interim-then-durable placement of R8's stale-branch sweep (Stacy M4).** R8 makes the monthly stale/unmerged-branch sweep ratified law, but its only enforcement mechanism (the sweep step in the monthly Civitas health check) lives in **Thurgood's prompt** — whose durable home is flagged as the 122 agent generator. Left implicit, that creates a window where R8 is law but unenforced until 122 regenerates the prompt. To close it, application is **interim-then-durable**, tracked explicitly like OB-7:
- **Interim (at THIS ballot's application, mandatory):** the stale-branch sweep step is added to the **CURRENT** Thurgood prompt's monthly-health-check step list **now**, as part of landing this ballot — NOT deferred to 122. This makes R8 enforceable the moment it is law. Because the prompt is a Peter-merged carve-out surface, this edit rides the same carve-out application as the rest of the prompt/tooling changes (Item 7 point 5).
- **Durable (later, at 122):** when the 122 agent generator regenerates Thurgood's prompt from canonical source, the sweep step must be carried into the generated prompt so the interim hand-edit is not lost in regeneration. Tracked as a 122 handoff obligation, the same interim-then-durable pattern OB-7 uses for the always-layer.
- **Verification:** the applying task's completion doc records that the interim prompt edit landed (not just the steering-doc edits), so "R8 ratified but unenforced" cannot pass silently.

---

## Item 8 — Review path

- **Author**: Thurgood (Civitas steward), 2026-07-07.
- **Stacy** (required, process-quality): this amendment changes **every spec's completion flow** — the merge granularity is a process-structure decision squarely in her domain. Requested to verify: (a) the enumeration is complete (re-grep; the 125-A lesson is that hand lists undercount); (b) the before-texts match verbatim; (c) the single-parent-unit collapse genuinely reproduces 125-A behavior with no regression; (d) the "declared in tasks.md, not judged at merge" mitigation actually closes the fuzziness counter-argument.
  - **NEW — two Peter refinements folded in 2026-07-07, please review as part of the whole measure:** **(e) Refinement A** — subtask commits are now **optional/judgment-based** (Items 1c, 2a-bis, 2b, R4): verify the checkpoint/backup-worthy-accumulation/handoff triggers are clear enough to act on, that commit-and-push stay coupled (the backup guarantee), and that dropping mandatory-per-subtask does not weaken the off-machine-backup habit the longer-lived unit branch needs. **(f) Refinement B** — branch cleanup (Item 2f, R8): verify the on-merge remote-auto-delete (Peter's config toggle) + local delete + monthly-health-check stale sweep together close the spec-118-style long-lived-branch tangle, and that placing the stale sweep in Thurgood's monthly cadence (a prompt/tooling carve-out, not a steering edit) is the right home rather than a steering-doc rule.
- **Peter ratifies** via the record-first protocol (`.kiro/docs/ballots/README.md`): approve / modify / reject. On ratification, the receiving session commits the `RATIFIED` status FIRST, then application proceeds per Item 7.
- **Not requested**: Ada/Lina (no token or component content); the platform/product agents (the flow applies to them but Stacy proxies the process-quality read, as in 125-A). Peter may widen the roster.

---

---

## Review

Per the ballots README lifecycle (step 2) and the Spec-Feedback-Protocol stamp format. Review is woven into the Rule/Items above; this section records the round and the incorporation trail.

#### [STACY R1] — Process-quality review. Verdict: **APPROVE-WITH-AMENDMENTS** (3 Blocking + 3 Medium + 2 Low)

- **B1 (Blocking)** — R3 had no format sub-requirement, yet RATIFIED `122/tasks.md` (lines 5, 16) cites "R3a" as its format authority; `R3a` appeared 0× in the ballot. → § "The Rule". *Fix: add R3a specifying the unit-declaration format as law — per-parent `**Unit**:` field beside `**Type**:`, a preamble unit table (id → description → tasks), and a per-PR `Unit:` field, so "which unit is task N?" is a field read, never a merge-time judgment. Ratifies the format 122/tasks.md already uses — not a new invention.*
- **B2 (Blocking)** — `governance/completion-documentation-guide.md` "### For Parent Tasks" checklist (live ~355–357) is a concrete parent-completion checklist ("Open the task PR ... STOP ... complete when Peter merges") that encodes PR-at-every-parent, contradicting R4/R5/Item 2c; the ballot (line ~66) mis-classified it "generic / left unedited." → new amendment Item + Item 6 sweep scope. *Fix: unit-aware conditional mirroring Item 1a/1b; terminal "complete when Peter merges" → "accepted when the UNIT merges." Re-locate before-text by string.*
- **B3 (Blocking)** — `Process-Spec-Planning.md:472` and `:574` are `**Post-Completion:**` worked examples ("Open the task PR ... STOP; complete at merge"), parent-bound not generic; ballot's cited anchors (469/571) off by ~3. Third surface at `:2492` ("6. Open the task PR ...") to assess too. → amend the Post-Completion examples OR declare non-normative with stated reason; add file to Item 6 sweep. *Author's call on amend-vs-declare, justified in one line.*
- **M1 (Medium)** — All amended before-texts match live verbatim (good), but line anchors drifted: `completion-documentation-guide.md:354`→355; `Process-Spec-Planning.md:469/571`→472/574; enumeration table's Process-Development-Workflow Commits bullet "~311"→136. → Item 7 apply-time instruction: locate by quoted string, not line number, abort if string absent; correct stale "~311"→136.
- **M3 (Medium)** — Refinement A removes the forced-backup habit on a branch the ballot argues is MORE exposed. Coupling (commit AND push) preserved (good), but the residual risk (agent under completion bias under-fires the soft "backup-worthy accumulation" trigger) should be NAMED in R4's rationale, not buried. Stacy also offers a stronger option — make the session/handoff-boundary push MANDATORY (a hard backup floor). → **Fold "name the residual risk" unconditionally; do NOT decide the stronger option** — it changes the teeth of the mandate Peter personally set (his Refinement A made commits optional). Flag it as a pending decision for Peter.
- **M4 (Medium)** — R8's stale-branch sweep lives only in Thurgood's prompt, whose durable home is the 122 agent generator — creating a window where R8 is ratified law but unenforced until 122 regenerates the prompt. → Item 7.5: make explicit the sweep step is added to the CURRENT Thurgood prompt at THIS ballot's application (interim), independent of 122, stated as an interim-then-durable handoff like OB-7.
- **L1 (Low)** — `core-goals.md:41` and `Component-Development-Standards.md:1124` correctly classified generic (confirmed). No change.
- **L2 (Low)** — the "Count: 11 law edits" line (line ~68) moves once B2/B3 land; update count + Item 6 sweep scope.

#### [THURGOOD R2] — Incorporation notes

- **B1 folded** → added **R3a** to § "The Rule" (three required carriers: per-parent `**Unit**:` field, preamble unit table, per-PR `Unit:` field). Framed as ratifying-the-format-122-already-uses, and explicitly named as the target 122/tasks.md's "R3a" citation was missing.
- **B2 folded** → new **Item 1e** amends the completion-documentation-guide "### For Parent Tasks" checklist with the Item-1a/1b unit conditional; before-text re-read live and quoted verbatim (last two checklist items). File added to the Item 6 sweep scope; removed from the "generic / unedited" set.
- **B3 folded** → new **Item 5b**. **Deviation from Stacy's either/or, justified:** I chose **amend** (not declare-stale) for both Post-Completion examples. One-line reason: the ballot amends *every* normative parent→PR mechanism (Items 1a/1b), and these worked examples are the copy-paste source an author transcribes into a real tasks.md — declaring them non-normative would seed the stale rule downstream. Both before-texts re-read live (472/574) and quoted verbatim. The **third surface `:2492`** I assessed and classify **generic** (Path-A step 6, delegates PR timing to the tooling) — left unedited, but added to the Item 6 sweep to re-confirm mechanically.
- **M1 folded** → Item 7 point 2 gains the line-anchor caveat (locate by string, abort if absent); enumeration-table row 7 corrected "~311"→136 (I independently re-confirmed the Commits bullet is live at 136 before writing the correction). Note: I did NOT rewrite every anchor inline (they remain draft-time by design per the ballots README); instead the apply-time rule makes anchors advisory and strings authoritative.
- **M3 folded (partial, as directed)** → R4's rationale now NAMES the residual risk (completion-bias under-firing the soft accumulation trigger on a more-exposed branch). I did **NOT** decide the mandatory-session-push — flagged as **open question OQ-1** for Peter (see below). This is the deliberate non-decision Stacy and the task both asked for.
- **M4 folded** → new **Item 7.5** makes the interim prompt edit mandatory at this ballot's application (independent of 122), with a durable-at-122 handoff and a completion-doc verification hook, patterned on OB-7.
- **L1** → confirmed; the two surfaces stay in the "generic / unedited" set (now the only members besides the assessed-generic `:2492` and the Process-Development-Workflow generic lines).
- **L2 folded** → count updated 11 → **13** (B2 = Item 1e; B3 = Item 5b, its two blocks counted as one file-level edit — per-block counting would read 14, flagged for Peter). Item 6 sweep scope widened to name both files.

**Open question for Peter at ratification (OQ-1) — RESOLVED (Peter, 2026-07-08): option (a), keep subtask commits fully judgment-based (no rule change).** Stacy's M3 stronger option was to make the **session/handoff-boundary push mandatory** (a hard backup floor per session). Peter rejected it after analysis, on a mechanical-soundness ground: a mandatory push at a **session/handoff boundary** can only fire if the agent *detects* the boundary — and the boundary that most needs a backup floor (abrupt context loss: window fills, crash, app/network drop) is **undetectable**, so the mandate would harden only the graceful-stop case a thoughtful agent already handles and give nothing for the case that actually strands work. A mandate the agent cannot mechanically keep is weaker than an honest judgment-based rule and erodes the law's credibility. **The real backup guarantee is mechanical, not a mandate** — judgment-independent tooling auto-push (fires on cadence/commit regardless of boundary detection). This is the same mechanical-over-judgment principle the rest of 125-A and the record-first protocol run on. **Disposition:** (1) subtask commits stay fully judgment-based exactly as drafted (R4 / Items 1c, 2a-bis unchanged); (2) R4's named residual risk stays folded; (3) **R8's optional `complete-task.sh` auto-push is elevated from "optional" to a tracked tooling obligation** — the durable mitigation, carried as a follow-up (its natural durable home is the 122 agent-generator tooling / `complete-task.sh` rework). No R4/Item edit is required by this resolution.

**Status: `RATIFIED (Peter, 2026-07-08)`** — ratified record-first per the README protocol (this record committed before any law edit). Application proceeds per Item 7 (OQ-1 requires no rule edit; the auto-push obligation in the disposition above is a tracked tooling follow-up, not part of the steering-law application).

---

*Drafted by Thurgood, 2026-07-07. Stacy's required process-quality review (APPROVE-WITH-AMENDMENTS) incorporated 2026-07-07 (`[THURGOOD R2]`) — B1/B2/B3/M1/M3(partial)/M4/L2 folded. OQ-1 (M3 mandatory session-push) resolved by Peter 2026-07-08: option (a), keep judgment-based; the real mitigation is mechanical tooling auto-push, tracked as a follow-up. **RATIFIED (Peter, 2026-07-08)** record-first. Amends the RATIFIED 125-A workflow law (right-sizes the merge granularity; makes subtask commits judgment-based; adds branch cleanup; adds the R3a unit-declaration format — all other 125-A guarantees preserved).*
