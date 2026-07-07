# Ballot Measure: Merge on the Coherent Unit (right-sizing the merge granularity)

**Date**: 2026-07-07
**Author**: Thurgood (Civitas steward)
**Origin**: Peter's proposal (2026-07-07) — "commit on parent completion, merge on spec completion" — reshaped in analysis to **merge on coherent-unit completion**, which subsumes his proposal as the small-spec special case.
**Type**: Governance-law amendment (general workflow law; applies to every spec's completion flow).
**Amends**: The RATIFIED 125-A PR-gated workflow law. Source of the amended text: `.kiro/specs/125-A-pr-gate-mechanical-arming/task-1-workflow-ballot.md` (RATIFIED Peter, 2026-07-05), as applied into `.kiro/steering/Task-Completion-Protocol.md` § "The Sequence by Task Scope", § "Completion State in the PR Flow", § "The Merge Rule", and the branch/PR conventions.
**Status**: **DRAFT — pending review (Stacy, required) then Peter's ratification via the record-first protocol (`.kiro/docs/ballots/README.md`).** No law edit is applied until the committed Status reads `RATIFIED`.
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
| 7 | `governance/Process-Development-Workflow.md` Git Practices — Commits bullet (line ~311) | "one `main` commit per task" framing |

### Live law surfaces — generic (say "at task completion, open the PR"; NOT parent-bound; NO edit needed)

`core-goals.md:41`, `governance/Process-Development-Workflow.md:85/116/175`, `governance/Process-Spec-Planning.md:469/571/2489`, `governance/completion-documentation-guide.md:354`, `governance/Component-Development-Standards.md:1124`. These read "complete tasks via the PR flow" / "open the task PR" generically — they do not assert *per-parter* granularity and remain correct after this amendment (the completion tooling stays the PR-opening mechanism; only *when* it opens changes, which the tooling itself decides context-aware). **Left unedited by design**; the Item-6 sweep confirms none newly contradict the unit rule.

**Count**: 7 law edits (all but one in the always-loaded Task-Completion-Protocol; one governance echo). Far smaller than 125-A's 15 because 125-A already centralized the flow law into Task-Completion-Protocol — this amendment edits that one home plus a single governance echo.

---

## Considered Alternative (counter-argument — recorded, not hidden)

**Keep per-parent-PR; solve 122's fragmentation by making 122's substrate a single parent task with sub-parents.** Rejected: it distorts the task tree to fit the merge rule (the substrate genuinely IS eight parents' worth of work — collapsing them into one loses the sequencing and validation-tier structure), and it does not generalize (the next large spec re-fights the same shape). The merge unit should flex to the work, not the work to the merge unit.

**The honest counter-argument AGAINST this ballot** (the one Peter should weigh): *"coherent unit" is fuzzier than "parent task" or "whole spec" — both of those are mechanically unambiguous, and a fuzzy merge-granularity rule invites drift ("is this a unit?") at exactly the gate 125 exists to make mechanical.* **Mitigation (the load-bearing design choice):** the unit is **NOT judged at merge time.** The spec's own `tasks.md` **declares** its merge units as an explicit grouping (for 122: substrate / each cutover / OB-7 / closeout). By the time an agent reaches completion, "what is this unit" is a lookup, not a judgment. The rule is fuzzy only in the abstract; in practice every spec names its units up front, reviewed in the tasks feedback round like any other decomposition decision. A small spec declares one unit (the whole spec) and the fuzziness vanishes entirely. **Residual risk accepted:** a spec author could declare a unit too large to review; that is caught in the tasks feedback round (the same place task decomposition is already reviewed), not at the gate.

---

## The Rule (the normative content this ballot encodes)

**R1 — The merge unit is the coherent unit.** A pull request carries a **coherent unit**: the smallest chunk of a spec's work that is BOTH (a) coherent on its own — it delivers a self-contained, meaningful increment — AND (b) reviewable as a single diff. The merge of a unit's PR is the completion event for every task in that unit.

**R2 — Small spec: the unit is the whole spec.** When a spec's entire body of work is one reviewable chunk, the spec declares a single merge unit and ships one PR (Peter's original proposal — the common case for small specs). This is the default; a spec is presumed a single unit unless its tasks.md declares otherwise.

**R3 — Large spec: units are DECLARED by the spec's own tasks.md grouping.** When a spec is too large to review as one diff, its tasks.md **declares** its internal coherent units as an explicit task grouping (e.g., 122: the substrate group / each per-agent cutover / OB-7 / closeout). The tasks doc **names** the units; it is not an ad-hoc judgment made at merge time. Declaring the units is a decomposition decision, reviewed in the tasks feedback round.

**R4 — Within a unit's branch.** One branch per unit. On that branch:
- **Subtasks** commit and push the branch — no PR (unchanged from 125-A).
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

---

## Item 2 — `.kiro/steering/Task-Completion-Protocol.md` § "Completion State in the PR Flow"

**2a. Insert the unit definition** — immediately after the `Branch → PR → required checks → merge.` line and before numbered point 1, add:
```markdown
**The merge unit is the coherent unit.** A PR carries a **coherent unit** — the smallest chunk of a spec's work that is coherent on its own AND reviewable as a single diff. For a small spec the unit is the whole spec (one PR). For a large spec the units are **declared in that spec's own tasks.md** as a task grouping (e.g., a substrate group / each per-agent cutover / a closeout) — named up front, never judged at merge time. One branch per unit; the unit's completion opens the PR; Peter merges the unit.
```

**2b. Hook-ergonomics note (subtask-mechanics block).** Before:
```markdown
   **Hook ergonomics**: one completion command, context-aware — invoked for a subtask it commits and pushes the branch (no PR); invoked for parent completion it commits, pushes, and opens the PR (`./.kiro/hooks/complete-task.sh`).
```
After:
```markdown
   **Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask it commits and pushes the branch (no PR); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR.
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
- **One branch per unit**: subtasks commit+push the branch; parent completions commit their docs on the branch; the unit's completion opens the PR; Peter merges (squash).
- **Dependent units branch from `main` after the prior unit's PR merges** — the unit is the dependency grain (stacking only on Peter's explicit direction, `Stacked-on: #<PR>`).
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
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc + a branch commit; parents get full validation + completion doc + summary doc, committed on the branch.
- **The merge unit is the coherent unit** — the smallest chunk that is coherent-on-its-own AND reviewable as a single diff, DECLARED in the spec's tasks.md (a small spec = one unit = one PR; a large spec declares internal units). The unit's completion opens the PR; a parent inside a multi-parent unit is done-on-branch, accepted at the unit's merge.
- **A task is accepted at the MERGE of its unit.** Agents open PRs at unit completion; Peter merges on green. Never merge your own PR; never push to `main` (branch protection rejects it, admins included).
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

---

## Item 6 — Residual sweep (application ends mechanically)

After applying Items 1–5, run over `.kiro/steering/**` and `governance/**` (worktrees, `.git`, `node_modules`, specs/records excluded):
```
at parent.task.*completion.*opens?.*PR
parent completion.*opens.*PR
one (main )?commit per task
per.?parent.*PR
```
**Pass condition**: zero hits asserting per-parent-task PR/merge granularity in `.kiro/steering/**` and `governance/**` (MIGRATE scope). Generic "open the task PR" instructions are NOT hits (they delegate timing to the tooling). Records (`.kiro/specs/**`, `.kiro/docs/ballots/**` — including the 125-A ballot this amends, quoted as before-text by design) are left untouched.

---

## Item 7 — Application mechanics (record-first)

1. **No edit before the record**: this ballot's Status is updated to `RATIFIED (Peter, <date>)` and **committed** before any law edit (ballots README protocol). Any applying agent verifies the committed RATIFIED status — nothing else — before applying.
2. Apply Items 1–5 exactly as written; a before-text mismatch stops on that block and is reported, never adapted silently (ballots README edit discipline). Run the Item 6 sweep; record its output in the applying task's completion doc.
3. Post-edit: bump `Last Reviewed` on `Task-Completion-Protocol.md` and `Process-Development-Workflow.md`; `scripts/validate-steering-metadata.js` passes; docs MCP `rebuild_index` runs and reports healthy (Task-Completion-Protocol is always-loaded; both docs are MCP-served).
4. **Companion, non-law application** (does not require ratification of THIS ballot, but is the reason it exists now): 122's `tasks.md` is regrouped to the declared-unit structure in the same landing — see the accompanying 122 tasks revision (its own tasks feedback round ratifies the decomposition; this ballot ratifies the general law it relies on).

---

## Item 8 — Review path

- **Author**: Thurgood (Civitas steward), 2026-07-07.
- **Stacy** (required, process-quality): this amendment changes **every spec's completion flow** — the merge granularity is a process-structure decision squarely in her domain. Requested to verify: (a) the enumeration is complete (re-grep; the 125-A lesson is that hand lists undercount); (b) the before-texts match verbatim; (c) the single-parent-unit collapse genuinely reproduces 125-A behavior with no regression; (d) the "declared in tasks.md, not judged at merge" mitigation actually closes the fuzziness counter-argument.
- **Peter ratifies** via the record-first protocol (`.kiro/docs/ballots/README.md`): approve / modify / reject. On ratification, the receiving session commits the `RATIFIED` status FIRST, then application proceeds per Item 7.
- **Not requested**: Ada/Lina (no token or component content); the platform/product agents (the flow applies to them but Stacy proxies the process-quality read, as in 125-A). Peter may widen the roster.

---

*Drafted by Thurgood, 2026-07-07. Amends the RATIFIED 125-A workflow law (right-sizes the merge granularity only; all other 125-A guarantees preserved). Law docs remain untouched until the committed Status reads RATIFIED.*
