# Ballot Measure B-CI: unit branches get CI feedback, and gate-green claims cite CI

**Date**: 2026-09-27
**Drafted by**: Thurgood (Civitas steward)
**Status**: **DRAFT** — Stacy reviews next (required reviewer), then Peter rules. **Nothing in § 2 or § 4 is applied by this PR.** Record-first: on ratification, this line becomes `RATIFIED (Peter, <date>)` and that change is committed **before** any edit in § 2 or § 4 applies (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Origin**: the unit-branch CI-feedback issue spec, `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` (merged in #216), items (c) and (e), plus the implementation grant. Peter backed the package and ruled its forks F-A and F-B on 2026-09-27.
**Unit**: branch `chore/123-u2-rulings-and-b-ci`. It touches governance law, so Peter merges it (standing carve-out).
**Reviewers**: Stacy (required — § 4 changes what her claims passes read). Stacy has said she will not draft the rule's wording (anti-rot: she audits against standards she does not author), so every word of § 4 is the steward's.

> **No `Ratified-machine:` line, deliberately.** That line is the Spec 127 law ballot's own mechanism, parsed by `completion-criteria-parity` for *that* law's in-force date. A second parseable record would confuse a checker that reads exactly one (the precedent of the orchestrator-role and write-scope-grant ballots).

---

## 1. The problem

- **No required check runs on a unit branch before its PR opens.** TCP says so in two places ("No PR opens and no required checks fire until unit completion"), and every required workflow triggers only on `pull_request` (some also on `push` to `main`).
  - Spec 123 U1 ran nine parents over ~2 days with no CI signal until its PR opened (#215). Every "validation green" in that window rested on local runs.
- **The PR-open event can be dropped.** PR #194 opened while mergeability was `UNKNOWN`; zero workflows ran (same class as #148). *Source: the orchestrator's session memory, not a committed record.*
- **Nothing ties a "validation green" sentence in a completion doc to a run anyone can open.** A claims pass has to take it on trust or re-run it.

The full evidence, the required-check inventory (18 contexts across 6 workflows) and the tooling design are in the issue spec. This ballot carries only what is **law**: the TCP amendment (M1), the completion-doc standard (M2), and the grant that lets the steward implement the tooling (M3).

---

## 2. M1 — the Task-Completion-Protocol amendment (exact before → after)

File: `.kiro/steering/Task-Completion-Protocol.md`, an identity doc. **No regeneration is needed**: the generated `CLAUDE.md` `@`-includes this file, and no canonical agent prompt embeds these sentences (grep at drafting).

### 2.1 Fork M1-a / M1-b — does a subtask checkpoint dispatch CI? (Peter picks at ratification)

- **M1-b — the primary text below, as briefed by the coordinator**: required workflows are dispatched at each **non-final parent completion AND each subtask checkpoint** that `complete-task.sh` fires. A checkpoint the agent knows is red may pass `--no-ci`.
  - *For*: it closes most of the gap between parents, which is the residual the parent-only design leaves open.
- **M1-a — the alternative text**: dispatch at **non-final parent completions only**; subtask checkpoints dispatch nothing. This is the design merged in the issue spec (a3, "Subtask mode is unchanged").
  - *For*: a subtask checkpoint is often a restore point taken before breaking work. Dispatching there spends CI minutes on states expected to be red, and teaches agents to scroll past red dispatch results — the habit that would drain M2 of its force.
- **Steward's lean: M1-b with `--no-ci`**. The opt-out absorbs most of M1-a's objection. *What survives it*: `--no-ci` runs on the honour system and nothing records its use, so a habitual opt-out quietly returns M1-a's gap.

Sites S1, S4 and S6 differ between the forks; S2, S3 and S5 are the same in both.

### 2.2 Edit sites

**S1 — § "The Sequence by Task Scope" → "For SUBTASKS", item 4, the closing sentences.**
- **Before**: `No PR opens and no required checks fire until unit completion. Subtasks do NOT open PRs.`
- **After (M1-b)**: `` No PR opens until unit completion, and subtasks do NOT open PRs. When you make the checkpoint with the completion tooling (`complete-task.sh --subtask`), it also **dispatches the required workflows against the unit branch** and prints the run URLs (`--no-ci` skips the dispatch for a checkpoint you know is red). Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR. ``
- **After (M1-a)**: `No PR opens until unit completion, and subtasks do NOT open PRs. A subtask checkpoint dispatches no CI; the required workflows are dispatched against the unit branch at non-final parent completions (§ "Completion State in the PR Flow", point 2, Hook ergonomics).`

**S2 — § "For PARENT TASKS (Implementation or Architecture type)", step 5, the multi-parent bullet.**
- **Before**: `   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent).`
- **After**: `   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch, pushes, and **dispatches the required workflows against the unit branch**, printing the run URLs — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent). A completion doc that states the gate is green cites CI runs (Completion Documentation Guide § "Gate-green claims cite CI").`

**S3 — § "For PARENT TASKS (Setup or Documentation type)", step 5, the multi-parent bullet.**
- **Before**: `   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**; the PR opens at UNIT completion.`
- **After**: `   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch, pushes, and **dispatches the required workflows against the unit branch**, printing the run URLs — **no PR yet**; the PR opens at UNIT completion.`

**S4 — § "Completion State in the PR Flow", point 2 ("Subtask mechanics"), the closing sentence.**
- **Before**: `No PR opens and no required checks fire until unit completion; subtasks do NOT open PRs.`
- **After (M1-b)**: `` No PR opens until unit completion; subtasks do NOT open PRs. **Required workflows are dispatched against the unit branch** at each subtask checkpoint and each non-final parent completion that the completion tooling fires (a subtask checkpoint may pass `--no-ci`). Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR. ``
- **After (M1-a)**: `No PR opens until unit completion; subtasks do NOT open PRs. **Required workflows are dispatched against the unit branch** at each non-final parent completion that the completion tooling fires. Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR.`

**S5 — point 2, the "AMENDED FROM THE OLD FLOW" paragraph, justification (d).** This is a dated historical rationale, so it is annotated, not rewritten.
- **Before**: `(d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the change-request/failed-check resume path (points 7–8 below).`
- **After**: `(d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the change-request/failed-check resume path (points 7–8 below). *(Annotated by ballot B-CI, <ratification date>: the unit-branch dispatches add CI runs, so the cost is no longer zero; they are feedback, not the gate, and still trigger no pull_request workflows.)*`

**S6 — point 2, "Hook ergonomics".**
- **Before**: `` **Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch (no PR); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR. ``
- **After (M1-b)**: `` **Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch and dispatches the required workflows against it, printing the run URLs (no PR; `--no-ci` skips the dispatch); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch, pushes, and dispatches the required workflows (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR, then **fails loudly — non-zero exit, with the remedy printed — if CI started zero runs on the PR** (the #148/#194 dropped-event class). ``
- **After (M1-a)**: the same as M1-b, except that the subtask clause stays as in **Before** (`…it commits and pushes the branch (no PR);`).

**Stragglers — tooling docs, not law.** `.kiro/hooks/README.md:36` and `.kiro/hooks/complete-task.sh:31, :104` carry the same sentence. They change with the implementation (M3), not by this ballot. **The application ends with a sweep**: `grep -rn "no required checks fire" .kiro/steering governance .kiro/hooks` → 0 lines, output cited. The list above is not trusted on its own; every count in this directory's first ballot was wrong at least once.

---

## 3. What M1 does not change

- **The gate.** Required checks still run on the unit PR, still block merge, and the required-context set stays at 18. Dispatched runs use **distinct context names** (issue spec a2), so they can never satisfy or shadow a required context.
- **Merge authority, the unit grain, stop-and-wait, and the Merge Rule** — all unchanged.
- **Plain-git subtask commits**, which TCP still permits, dispatch nothing. Only the completion tooling dispatches.

---

## 4. M2 — the completion-doc CI-citation standard

File: `governance/completion-documentation-guide.md`. **Where it lands**: a new subsection inside § "Parent Success-Criteria Fidelity", **immediately after** § "Additional verification — required if applicable, never optional" and **before** § "The in-flight exemption — one fixed string, no sunset". It binds any completion doc, not parents only, because it is keyed on the claim rather than on the doc's tier. It is placed there because that section is where Evidence is defined.

**Text to insert, verbatim:**

```markdown
### Gate-green claims cite CI (ballot B-CI)

A completion doc — parent or subtask — that states **the gate is green** ("validation green", "CI green", "full suite green", "required checks pass", or any equivalent) SHALL cite the CI runs that show it:

1. **One SHA.** The cited runs are all at one named commit `S`.
2. **Every required check.** Every required status context — the set `tools/agent-generator/verify-gate-registration.sh` asserts — is green at `S`, or its **unit-branch dispatch counterpart** (the same check, reported under its non-required dispatch name) is. If any context is red or missing, the doc SHALL NOT state the gate is green: it states which contexts ran and their results, verbatim.
3. **The runs, openable.** Each run's URL is listed. A gating parent whose PR is open may cite the PR's checks at `S` instead.
4. **"At the doc's SHA", made decidable.** A doc cannot cite a run on its own commit, because the run follows the commit. The claim therefore binds to `S`, and it is compliant **if and only if `git diff --name-only S..<the commit carrying the doc>` lists nothing but completion docs, summary docs and `tasks.md`, with the `tasks.md` change limited to checkbox marks.** The citation may be added in a docs-only commit after the runs finish.
5. **Local runs stay local.** A local run remains citable as Evidence, labelled `local`, with its command, result and SHA — never as evidence that the gate is green.

A cited run is Evidence of the third kind (a command and its result): the command is the required workflow run, and the result is its URL and conclusion.

**How a claims pass records a missing or non-compliant citation is Stacy's call.** Her stated practice: such a claim is recorded **`not re-verified`**. This paragraph reports that practice; the verdict vocabulary is hers, and so is any change to it.

**In force** from B-CI's ratification date, for completion docs authored after it. **No backfill**: a spec in flight at ratification is bound from its next doc onward. For Spec 123 that is **U2a onward; U1's docs are not re-audited against this rule.** The fixed-string in-flight exemption below does not apply to this subsection.

**Honest reach**: the rule makes a gate-green claim checkable from the doc alone; it does not check itself. Nothing mechanical verifies the citation today (a `completion-criteria-parity` presence check is a later candidate, after one spec has used the rule), and the claims pass that audits it runs after merge. **It detects a false green; it does not prevent one.** Prevention stays where it always was: the unit PR's required checks.
```

**Notification duty** (charter boundary bound 2 — a notification, not a permission): on ratification, the steward sends Stacy the before→after (the before is the absence of this subsection) and the effective date, as an explicit message.

---

## 5. M3 — the implementation write-scope grant (Peter may accept or narrow)

As proposed by the orchestrator. It replaces the issue spec's § "Grant", which named the orchestrator, once ratified; until then that section stands.

> **B-CI IMPLEMENTATION GRANT:**
> 1. **Who.** Thurgood (Civitas steward), as owner of the CI regime.
> 2. **Extent.** Write access to exactly:
>    - (a) `.github/workflows/**`;
>    - (b) `.kiro/hooks/complete-task.sh`;
>    - (c) `package.json` — **the `scripts` block only**. This is checkable: the diff of every other key is empty.
> 3. **For.** PR-1's items: (a) the dispatch triggers, their distinct dispatch context names, and `complete-task.sh`'s dispatch; (b) the named npm scripts that the workflows call; the fold-in of `npm run test:scripts` into an existing required lane; and F-A's zero-runs detector.
> 4. **Duration.** From ratification until PR-1 merges.
> 5. **What it does not change.** The grant is additive to the steward's charter scope and confers **no ratification authority**. Branch-protection and required-context settings remain Peter's actions; none is proposed. § 2 and § 4 are applied as this ballot's exact text — application of a RATIFIED measure, which any agent may perform — not authored under this grant.
> 6. **Audit.** An edit outside the extent is a claims-pass finding on the executing agent (the T1-(B) clause-6 pattern).

**Narrowing and extension options — Peter strikes or keeps each at ratification:**
- **N1 — narrow (a) to the six required workflows by name**: `consumer-guard.yml`, `tool-boot-smoke.yml`, `section-citations.yml`, `agent-generator.yml`, `package-name-drift.yml`, `lane-timing.yml`. `completion-criteria-parity.yml` stays untouched by design (issue spec).
  - *Steward's lean: take N1.* A grant should be as exact as T1-(B)'s, and `**` reaches a workflow the package says must not change.
- **N2 — one fix-forward extension**: if the post-merge verification in § 6 fails, one fix-forward PR on the same paths, expiring at its merge or at U2a's first work commit, whichever comes first.
  - *Lean: keep.* Without it, a failed live verification waits on a fresh grant, and U2a waits with it.
- **N3 — add `.kiro/hooks/README.md`**, the straggler at line 36.
  - *Lean: add.* Without it, the hook doc contradicts the amended law until someone else edits it.

**Not in the grant, deliberately**: the `.kiro/issues/` records (the verification entry and the `test:scripts` issue's fold-in note) stay with the orchestrator, whose records they are.

---

## 6. Known limit and the verification plan

**The limit**: GitHub triggers `workflow_dispatch` only for a workflow whose file, carrying the trigger, is on the **default branch**. So **the dispatch path cannot be exercised live on PR-1's own branch**. (The merged issue spec said it could; its erratum of 2026-09-27 corrects that.)

**Before PR-1 merges** (evidence in PR-1):
1. PR-1's own `pull_request` runs report **all 18 required contexts under their required names**. This shows the rename expression's non-dispatch branch leaves the gate intact. `verify-gate-registration.sh` stays green.
2. A workflow lint over the six changed files (`actionlint` where available; otherwise a YAML parse plus a review of each `name:` expression), with its output cited.
3. `complete-task.sh`'s dispatch path is exercised with a **stubbed `gh`** (a dry-run flag that prints the six `gh workflow run` commands and the detector's poll). The detector's zero-runs branch is exercised the same way, including its non-zero exit.

**Immediately after PR-1 merges — before U2a's first work commit**:
4. Cut a throwaway branch (`chore/ci-dispatch-probe`) from `main`, push one empty commit, and fire the dispatch through `complete-task.sh`'s real path. **Six runs start; every context reports under its `(unit-branch)` name; all are green.** The URLs are recorded.
5. `verify-gate-registration.sh` is still green (18), and the probe branch's runs appear nowhere in any PR's required checks.
6. **The detector's live zero-runs branch cannot be forced**, because a dropped event cannot be produced on demand. Its live evidence is limited to the positive case: on the next real PR, it sees runs and exits 0. This limit is stated here, not discovered later.
7. **The record**: a dated verification entry in `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md`, committed either as a small standalone PR or as **the first commit on `task/123-u2a-g1`, before any U2a work commit**. Then delete the probe branch.
   - **If step 4 or 5 fails**: fix forward under N2. **U2a does not start work until the record reads pass.**

---

## 7. Residuals — not closed by this ballot

- **Branch head ≠ merge ref.** Dispatched runs test the unit branch's head; the gate tests `refs/pull/<n>/merge`. A unit that is green on dispatch can still go red at the gate if `main` moved.
  - **Per Peter's F-B ruling (2026-09-27)**, the option-2 ballot (an early draft PR, so every push runs against the merge ref) is drafted **only if this bites**.
  - **Trigger**: a unit PR whose required checks fail at the merge ref when the unit-branch dispatch runs at the same head SHA were green, and the failure is attributable to `main` having moved.
- **The gaps between dispatches.**
  - Under M1-b: work between tooling-made checkpoints, plus any checkpoint made with `--no-ci` or with plain git.
  - Under M1-a: whole parent-lengths.
  - The final parent's gap is closed by the PR itself.
- **Dispatched runs block nothing.** A red dispatch is feedback that depends on someone reading it. **M2 is what gives it consequence**, and M2 is enforced after merge (§ 8).
- **The #194 class is detected, not prevented.** The detector notices a dropped event; it cannot stop one.

---

## 8. Counter-argument (fold-back applied)

**The strongest objection**: *this changes law and tooling to buy earlier feedback, but it changes nothing that blocks a merge. Its one piece with consequence — M2 — is enforced only by post-acceptance claims passes. So in the exact failure it targets (an agent claiming green without CI), the unit still merges, and detection arrives a pass later.*

**What working it changed**:
- M2 was made **decidable from the doc alone** — rule 4's docs-only-diff test — so the claims pass needs no author interview and no re-run to find a false green. Detection becomes cheap and unambiguous.
- M2's "Honest reach" paragraph now **states** that it detects rather than prevents, so no reader can take a compliant doc as proof the gate ran.
- Distinct dispatch context names (§ 3) were written in, so the feedback runs cannot weaken the gate that *does* prevent.

**What survives, stated plainly**:
- **Prevention is unchanged and stays with the unit PR's required checks.** B-CI adds signal and accountability, not a gate. Making the citation a merge-blocker would take a `completion-criteria-parity` check that is armed as required — a Q2 decision this ballot does not reach.
- **Maintenance surface.** The six-workflow array in `complete-task.sh`, the rename expression in six files, and the detector's time window form a new multi-homed copy set (S-6) that can drift from `verify-gate-registration.sh`'s list.
- **Some of the benefit was already bought by the U2 split**, which shortened every no-CI window. The package's value scales with multi-parent units: U2b (six parents), U3 (four), U5 (four).

**The fork this surfaces, and does not pick**: M1-a vs M1-b (§ 2.1). The pick is Peter's.

---

## 9. Application (on ratification — not in this PR)

1. Flip this ballot's `Status` to `RATIFIED (Peter, <date>)` and commit it first, recording which of M1-a/M1-b and N1/N2/N3 were taken. Add the `README.md` § "Ballots on record" entry in the same commit.
2. Apply § 4 (M2) before or with § 2 (M1), so that S2's citation of § "Gate-green claims cite CI" resolves when it lands.
3. Run the straggler sweep (§ 2.2). Run `check:section-citations` and `rebuild_index` — the guide is a served doc. Run the metadata validation.
4. Send Stacy the § 4 notification.
5. Decide whether a `governance/classification-map.md` row is owed. The steward's read: **yes**, a row for `gate-green-ci-citation` at `check_state: proposed` (the parity presence check is a candidate, not armed). This is decided at ratification.

## 10. Cross-references

- The issue spec: `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md`.
- The Spec 123 U2 split, and the rulings on F1/F3/F7: `.kiro/specs/123-consumer-distribution/tasks.md` (amendment and rulings, 2026-09-27).
- `governance/completion-documentation-guide.md` § "Parent Success-Criteria Fidelity".
- TCP § "The Sequence by Task Scope" and § "Completion State in the PR Flow".
- `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` — the grant pattern M3 mirrors.
- `.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md` — its trigger ("the next CI-workflow touch") fires with PR-1.
