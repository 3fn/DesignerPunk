# Ballot Measure B-CI: unit branches get CI feedback, and CI citations carry their provenance

**Date**: 2026-09-27 (drafted; revised the same day after Stacy's R1 review)
**Drafted by**: Thurgood (Civitas steward)
**Status**: **RATIFIED (Peter, 2026-09-27)** — conditional on Stacy's R2-1, R2-2 and R2-3 landing exactly as she specified. They landed in `2b11be59`, the commit before this one, following the B-U1 "add it and then ratify" precedent. Stacy re-checked at `cd3f888b` (ACCEPT-WITH-CHANGES; no R3 round needed once the Mediums land). **Record-first, PR-atomic**: this commit flips the record and applies § 2 and § 4 together; Peter's merge of PR #217 is the record act on `main`, and its squash commit is `R` (§ 4). **No `Ratified-machine:` line** — the B-U1 precedent, `2026-09-27-123-b-u1-publish-rail.md`; see the note below.
**Peter's picks, 2026-09-27 (pre-ratification; recorded so the re-check reads the text that will land)**: **M1-b**, with Stacy's C6 applied. **Grant: N1 + N2 + N3, plus C7a.** The alternative texts not taken have been removed from § 2 and § 5; the forks are recorded in § 2.1 and § 5.
**Origin**: the unit-branch CI-feedback issue spec, `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` (merged in #216), items (c) and (e), plus the implementation grant. Peter backed the package and ruled its forks F-A and F-B on 2026-09-27.
**Unit**: branch `chore/123-u2-rulings-and-b-ci` (PR #217). It touches governance law, so Peter merges it (standing carve-out).
**Reviewers**: Stacy (required — § 4 changes what her claims passes read). Her R1 record is kept verbatim in § 11, with its dispositions in § 10. She declined to draft M2's wording (anti-rot: she audits against standards she does not author), so every word of § 4 is the steward's, written to the properties she named.

> **No `Ratified-machine:` line, deliberately.** That line is the Spec 127 law ballot's own mechanism, parsed by `completion-criteria-parity` for *that* law's in-force date. A second parseable record would confuse a checker that reads exactly one (the precedent of the orchestrator-role and write-scope-grant ballots).

---

## 1. The problem

- **No required check runs on a unit branch before its PR opens.** TCP says so in two places ("No PR opens and no required checks fire until unit completion"), and every required workflow triggers only on `pull_request` (some also on `push` to `main`).
- **What that cost in U1, precisely** (Stacy R1, measured):
  - `task/123-u1-substrate` went red at PR open (`10061e6a`) on **Consumer Guard** and on **`lane-application-mcp-server-suite`**. Both failures appeared only in a clean checkout or in a sub-package suite (`task-1-completion.md:131`), and were fixed by `bb031175` and `202a28e9`.
  - The parent docs' green claims were **honest local-command claims** — for example, the Task 9 criterion "`npm test` and full `tsc` are green." with Evidence `npm test → 9268 passed`.
  - **Nothing false merged**; the PR gate caught it. The escape was a **narrower-surface green**: true about the commands it named, and silent about the 18 required contexts.
  - Nine parents ran over ~2 days before any CI signal arrived.
- **The PR-open event can be dropped.** PR #194 opened while mergeability was `UNKNOWN`; zero workflows ran (same class as #148). *Source: the orchestrator's session memory, not a committed record.*
- **Nothing in a completion doc says which surface a green was measured on.** A reader cannot tell a local run from a branch-head CI run from the gate, and a claims pass has to infer it from phrasing.

The full evidence, the required-check inventory (18 contexts across 6 workflows) and the tooling design are in the issue spec. This ballot carries only what is **law**: the TCP amendment (M1), the completion-doc standard (M2), and the grant that lets the steward implement the tooling (M3).

---

## 2. M1 — the Task-Completion-Protocol amendment (exact before → after)

File: `.kiro/steering/Task-Completion-Protocol.md`, an identity doc. **No regeneration is needed**: the generated `CLAUDE.md` `@`-includes this file, and no canonical agent prompt embeds these sentences (grep at drafting, confirmed by Stacy R1).

### 2.1 Fork M1-a / M1-b — RULED M1-b (Peter, 2026-09-27), with C6

- **M1-b — TAKEN**: required workflows are dispatched at each **non-final parent completion and each subtask checkpoint** that `complete-task.sh` fires. A checkpoint the agent knows is red may pass `--no-ci`.
  - **Stacy R1 C6, applied**: TCP point 2 said checkpoints are pushed "with plain git". A plain-git push dispatches nothing, so M1-b's coverage would have rested on the honour system twice. **Site S7 now sends checkpoints through the completion tooling.**
- **M1-a — NOT TAKEN**: dispatch at parent completions only.
  - *Its case, recorded*: a checkpoint is often a restore point taken before breaking work. Dispatching there spends CI minutes on red states, and teaches agents to scroll past red results.
  - *Stacy's claims-side read*: claim honesty is the same under both forks, because M2 binds to the cited SHA. M1-b's edge is that runs land at the last code-state checkpoint *before* the parent doc is written, so the doc can cite them inline.
- **What survives**: `--no-ci` runs on the honour system and nothing records its use. By Stacy's read that is a feedback-latency cost, not a claims risk.

### 2.2 Edit sites

**S1 — § "The Sequence by Task Scope" → "For SUBTASKS", item 4, the closing sentences.**
- **Before**: `No PR opens and no required checks fire until unit completion. Subtasks do NOT open PRs.`
- **After**: ``No PR opens until unit completion, and subtasks do NOT open PRs. Make the checkpoint with the completion tooling (`complete-task.sh --subtask`): it commits, pushes, **dispatches the required workflows against the unit branch**, and prints the run URLs (`--no-ci` skips the dispatch for a checkpoint you know is red). Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR.``

**S2 — § "For PARENT TASKS (Implementation or Architecture type)", step 5, the multi-parent bullet.**
- **Before**: `   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent).`
- **After**: `   - **If this parent is one of several in a declared multi-parent unit** (see the spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch, pushes, and **dispatches the required workflows against the unit branch**, printing the run URLs — **no PR yet**. The PR opens when the UNIT completes (its final/gating parent). Completion docs declare where their run results were measured (Completion Documentation Guide § "CI provenance — where a green was measured").`

**S3 — § "For PARENT TASKS (Setup or Documentation type)", step 5, the multi-parent bullet.** It now carries the same pointer as S2, since M2 binds every doc (Stacy R1, minor).
- **Before**: `   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch — **no PR yet**; the PR opens at UNIT completion.`
- **After**: `   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the completion+summary docs on the branch, pushes, and **dispatches the required workflows against the unit branch**, printing the run URLs — **no PR yet**; the PR opens at UNIT completion. Completion docs declare where their run results were measured (Completion Documentation Guide § "CI provenance — where a green was measured").`

**S4 — § "Completion State in the PR Flow", point 2 ("Subtask mechanics"), the closing sentence.**
- **Before**: `No PR opens and no required checks fire until unit completion; subtasks do NOT open PRs.`
- **After**: ``No PR opens until unit completion; subtasks do NOT open PRs. **Required workflows are dispatched against the unit branch** at each subtask checkpoint and each non-final parent completion that the completion tooling fires (a subtask checkpoint may pass `--no-ci`). Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR.``

**S5 — point 2, the "AMENDED FROM THE OLD FLOW" paragraph, justification (d).** This is a dated historical rationale, so it is annotated, not rewritten.
- **Before**: `(d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the change-request/failed-check resume path (points 7–8 below).`
- **After**: `(d) zero cost — pre-PR branch pushes trigger no pull_request workflows, and post-PR pushes re-running checks is already the change-request/failed-check resume path (points 7–8 below). *(Annotated by ballot B-CI, <ratification date>: the unit-branch dispatches add CI runs, so the cost is no longer zero; they are feedback, not the gate, and still trigger no pull_request workflows.)*`

**S6 — point 2, "Hook ergonomics".**
- **Before**: ``**Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch (no PR); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR.``
- **After**: ``**Hook ergonomics**: one completion command, context-aware (`./.kiro/hooks/complete-task.sh`) — invoked for a subtask (at a judgment-based checkpoint, not mechanically) it commits and pushes the branch and dispatches the required workflows against it, printing the run URLs (no PR; `--no-ci` skips the dispatch); invoked for a parent that is NOT the unit's final parent it commits the completion docs on the branch, pushes, and dispatches the required workflows (no PR); invoked at **unit completion** (a single-parent unit, or the final/gating parent of a multi-parent unit) it commits, pushes, and opens the PR, then **fails loudly — non-zero exit, with the remedy printed — if CI started zero runs on it** (the #148/#194 dropped-event class).``

**S7 — point 2, the "Subtask mechanics" rule's commit method** (Stacy R1 C6).
- **Before**: `subtask commits are **optional and judgment-based, not mechanical per subtask** — and when made, they **commit AND push the branch** with plain git (the two stay coupled; the push is the off-machine backup).`
- **After**: ``subtask commits are **optional and judgment-based, not mechanical per subtask** — and when made, they **commit AND push the branch through the completion tooling** (`complete-task.sh --subtask`, which also dispatches the required workflows — see Hook ergonomics; the two stay coupled; the push is the off-machine backup). A plain-git push is not a checkpoint: it dispatches nothing.``

**Stragglers — tooling docs, not law.** `.kiro/hooks/README.md:36` and `.kiro/hooks/complete-task.sh:31, :104` carry the old sentence. They change with the implementation (M3, which now covers the README under N3), not by this ballot. **The application ends with a sweep**: `grep -rn "no required checks fire" .kiro/steering governance .kiro/hooks` → 0 lines, output cited. The list above is not trusted on its own; every count in this directory's first ballot was wrong at least once.

---

## 3. What M1 does not change

- **The gate.** Required checks still run on the unit PR, still block merge, and the required-context set stays at 18. Dispatched runs use **distinct context names** (issue spec a2), so they can never satisfy or shadow a required context.
- **Merge authority, the unit grain, stop-and-wait, and the Merge Rule** — all unchanged.

---

## 4. M2 — the completion-doc CI-provenance standard

File: `governance/completion-documentation-guide.md`. **Where it lands**: a new subsection inside § "Parent Success-Criteria Fidelity", **immediately after** § "The delegated-tier line — unconditional" and **before** § "Additional verification — required if applicable, never optional".
- It binds every completion doc, keyed on a declared line rather than on the doc's tier.
- It sits beside the delegated-tier line because it has the same shape: a fixed-form header line, where silence is non-compliant.

**Why the redesign** (Stacy R1 C1 and C2):
- The first draft triggered on phrases ("validation green… or any equivalent"), which is judgment.
- It also let branch-head dispatch runs be written up as "the gate is green".
- This text replaces the phrase trigger with a **declared provenance line**, so the doc's own label decides whether a result is local, branch-head CI or the gate. That also records what Stacy's passes need in order to see the F-B trigger.

**Text to insert, verbatim:**

````markdown
### CI provenance — where a green was measured (ballot B-CI)

Every run result a completion doc reports — a test, build, typecheck, lint or check and its outcome — was measured somewhere: on the author's machine, on the unit branch's head by a dispatched CI run, or on the pull request's merge ref by the gate. **The doc declares which, in a fixed-form line; the reader never infers it from phrasing.**

**The line.** In its header block, a completion doc carries one or more `**CI-provenance**:` lines, each in one of three fixed forms:

- `**CI-provenance**: local` — no CI run is cited. Every run result in the doc was measured locally.
- `**CI-provenance**: branch-head dispatch @ <S> — <run URL>, <run URL>, …` — runs dispatched against the unit branch at commit `<S>`.
- `**CI-provenance**: PR gate #<n> @ <S> (merge ref) — <checks URL>` — the pull request's required checks, run on its merge ref, with `<S>` the PR head they ran for.

A `<run URL>` is a GitHub Actions run (`https://github.com/<owner>/<repo>/actions/runs/<id>`). A `<checks URL>` is the pull request's checks page (`https://github.com/<owner>/<repo>/pull/<n>/checks`, optionally `?sha=<S>`), for the same `<n>` the line names. Either CI form may end with `; not green: <context>, <context>, …`, naming every required context that was red or missing, verbatim. **Nothing else may follow the URLs**: no free text, and no CI line without a URL. `local` takes no tail and excludes the other two forms; the two CI forms may appear together. The grammar, decidable by rule:

`^\*\*CI-provenance\*\*: (?:local|branch-head dispatch @ [0-9a-f]{7,40} — https://github\.com/[\w.-]+/[\w.-]+/actions/runs/\d+(?:, https://github\.com/[\w.-]+/[\w.-]+/actions/runs/\d+)*(?:; not green: [A-Za-z0-9][A-Za-z0-9 ._()-]*(?:, [A-Za-z0-9][A-Za-z0-9 ._()-]*)*)?|PR gate #(\d+) @ [0-9a-f]{7,40} \(merge ref\) — https://github\.com/[\w.-]+/[\w.-]+/pull/\1/checks(?:\?sha=[0-9a-f]{7,40})?(?:; not green: [A-Za-z0-9][A-Za-z0-9 ._()-]*(?:, [A-Za-z0-9][A-Za-z0-9 ._()-]*)*)?)$`

**Rules.**

1. **Presence.** Every **parent** completion doc carries the line; **a missing line is non-compliant on its face.** A subtask doc that carries no line is read as `local`.
2. **The line decides, not the wording.** Every run result in the doc — in an Evidence cell, a Validation section or anywhere else — is **local unless its run is listed on a CI-provenance line.** A verbatim criterion cell never decides provenance. A criterion that says "green" is the promise being reported, not a claim; its row's claim is its Status and Evidence, read under the doc's provenance. So "`npm test` and full `tsc` are green." carried with `**CI-provenance**: local` is an honest local claim, classifiable without judgment.
3. **What each form supports.**
   - **Only a `PR gate` line supports a statement that the gate is green.**
   - A `branch-head dispatch` line supports only **"the required checks were green at branch head `<S>`"**. It SHALL NOT be written up as the gate, because the gate tests the merge ref, which a branch-head run never reaches.
   - A `local` result supports only a claim about the command run, on the machine it ran on.
4. **Every required check, one SHA.** A CI line without a `; not green:` tail asserts that **every** required status context — the set `tools/agent-generator/verify-gate-registration.sh` asserts — was green at `<S>`: under its required name for a gate line, and under its unit-branch dispatch name for a dispatch line. All of a line's runs are at the one commit `<S>` (each run's `headSha` shows it).
5. **The doc's own commit.** A doc cannot cite a run on its own commit, because the run follows the commit. A CI line therefore binds to `<S>`, and it is compliant **if and only if both hold** for `D`, the commit that carries the doc:
   - `git diff --name-only <S>..<D>` lists only paths under `.kiro/specs/<spec>/completion/`, paths under `docs/specs/<spec>/`, and `.kiro/specs/<spec>/tasks.md`;
   - `git diff -U0 <S>..<D> -- .kiro/specs/<spec>/tasks.md` changes only checkbox marks (`- [ ]` ↔ `- [x]`).

   The citation may be added in a docs-only commit after the runs finish. **This rule rests on a premise**: no required check reads those paths. That holds for today's 18 contexts (verified 2026-09-27). **It stops holding when `completion-criteria-parity` becomes a required check (the Q2 flip)**, because that check reads exactly those paths. Rule 5 is re-evaluated at that flip, before it lands.
6. **How a claims pass records a missing line, a non-compliant line, or a dispatch line written up as the gate is Stacy's.** See her charter § "The claims-pass record". The verdict vocabulary, and whether a case is a finding on the authoring agent, are hers; this guide does not restate them.

**In force** for completion docs authored after B-CI's ratification. Two commits decide it, and **both are read on `main`'s first-parent history**:

- **`R`, the ratification commit**: the first first-parent commit on `main` whose change adds this ballot's Status line in its pinned ratified form, `**Status**: **RATIFIED (Peter, <date>)**`. The command:
  ```bash
  BALLOT=.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md
  R=$(git log --first-parent --reverse --format=%H -G'^\*\*Status\*\*: \*\*RATIFIED .Peter, ' main -- "$BALLOT" | head -1)
  [ -n "$R" ] || { echo "FATAL: B-CI ratification commit R not found in $BALLOT's first-parent history"; exit 1; }
  ```
  **An empty `R` is a fatal error — never "no doc is bound".**
- **`M`, the doc's arrival on `main`**: `M=$(git log --first-parent --diff-filter=A --format=%H main -- <doc> | tail -1)`.

A doc is bound **if and only if** both of these exit 0:

1. `git merge-base --is-ancestor "$R" "$M"`;
2. **its unit branch was cut from a `main` that already contained `R`**. Take `<n>` from the `(#<n>)` in `M`'s subject, fetch `refs/pull/<n>/head`, and run `git merge-base --is-ancestor "$R" "$(git merge-base "$M^" refs/pull/<n>/head)"`.

**No backfill.** Test 2 exists because a pull request squash-merges into one first-parent commit that descends from `R` even when its docs were written before ratification. A branch cut before `R` and merged after it is therefore **not** bound. A branch that later merged `main` in after `R` counts as cut after `R`, because its base then contains `R`. A first-parent `M` whose subject carries no `(#<n>)` is a fatal error, never a silent "unbound". For Spec 123 this is **U2a onward; U1's docs are not re-audited.** The fixed-string in-flight exemption does not apply to this subsection.

**Honest reach.** The line makes provenance checkable from the doc alone: the grammar and the rules above are decidable. It does not verify itself. A doc can declare a dispatch line at `<S>` that the runs do not bear out, which a claims pass finds by opening them. **A doc that declares `local` throughout is fully compliant: nothing here requires CI evidence.** The rule makes a narrower-surface green *visible*; it does not make it wrong. It detects after merge and prevents nothing. Prevention stays where it always was: the unit PR's required checks.
````

**Notification duty** (charter boundary bound 2 — a notification, not a permission): on ratification, the steward sends Stacy the before→after (the before is the absence of this subsection) and the effective commit `R`, as an explicit message.

---

## 5. M3 — the implementation write-scope grant (as ruled: N1 + N2 + N3 + C7a)

This supersedes the issue spec's § "Grant" (which named the orchestrator) once ratified. It now covers **both** PR-1 and PR-2, so the supersession strands nothing (Stacy R1 C7a).

> **B-CI IMPLEMENTATION GRANT:**
> 1. **Who.** Thurgood (Civitas steward), as owner of the CI regime.
> 2. **Extent.** Write access to exactly:
>    - (a) the six required workflows, by name: `.github/workflows/consumer-guard.yml`, `tool-boot-smoke.yml`, `section-citations.yml`, `agent-generator.yml`, `package-name-drift.yml` and `lane-timing.yml` (**N1**). `completion-criteria-parity.yml` is excluded by design;
>    - (b) `.kiro/hooks/complete-task.sh`;
>    - (c) `.kiro/hooks/README.md` (**N3** — the straggler at line 36);
>    - (d) `package.json` — **the `scripts` block only** (the diff of every other key is empty);
>    - (e) for PR-2 only (**C7a**): `tools/agent-generator/coverage-map.ts`, `tools/agent-generator/__tests__/coverage-map.test.ts`, and the regenerated `canonical/coverage-map.yaml` and `canonical/coverage-manifest.yaml`.
> 3. **For.**
>    - **PR-1** (paths a–d):
>      - the dispatch triggers on the four workflows lacking one, and the distinct dispatch context names on all six;
>      - `complete-task.sh`'s dispatch at subtask checkpoints and non-final parents, with `--no-ci`;
>      - the named npm scripts that the workflows call;
>      - the fold-in of `npm run test:scripts` into an existing required lane;
>      - F-A's zero-runs detector;
>      - a preflight message naming the PAT scope the dispatch needs, **Actions: write** (granted 2026-07-10, `inbound-to-125-B-from-125-A.md` §5).
>    - **PR-2** (path e): the lane-roots comparison in `audit:coverage-map`, with Stacy consulted on the output shape (it changes her audit command).
> 4. **Duration.** From ratification until PR-1 merges (paths a–d) and until PR-2 merges (path e).
>    - **N2 — one fix-forward extension**: if the post-merge verification (§ 6) fails, one fix-forward PR, **whose extent is exactly paths a–d above**. It expires at its merge or at U2a's first work commit, whichever comes first.
> 5. **Evidence owed in each PR's body — evidence, not a gate** (Stacy R1 C7b, C7c):
>    - `git diff --name-only main...HEAD`, output cited.
>    - **An enumeration of every hunk that touches a did-it-really-run guard** (a selection floor or an execution assertion) in the six workflows, each with its reason. **The expected state is none**, apart from re-pointing a step to a named script. The extent reaches those guards, and weakening one would quietly turn a future "every required check green" into a narrower-surface green.
> 6. **What it does not change.**
>    - The grant is additive to the steward's charter scope and confers **no ratification authority**.
>    - Branch-protection and required-context settings remain Peter's actions; none is proposed.
>    - § 2 and § 4 are applied as this ballot's exact text — application of a RATIFIED measure, which any agent may perform — not authored under this grant.
>    - **No new test file** is in the extent (Stacy R1, minor). The dry-run path is evidenced by its output in the PR body (§ 6 step 3).
> 7. **Audit — the firing event is named** (Stacy R1 C7b). An edit outside the extent is a finding on the executing agent. **The check rides the Spec 123 MIDPOINT pass at U2b's merge**, and has three parts:
>    - the PR's `git diff --name-only <base>..<merge>` is a subset of the extent;
>    - the `package.json` diff outside `scripts` is empty;
>    - each workflow hunk traces to item 3.
>
>    Without a named event, a `chore/` PR reaches no claims pass at all.

**Forks, as ruled**: N1 taken (narrow to six); N2 taken (fix-forward, extent equal to the narrowed grant); N3 taken (README); C7a — Peter chose to **extend the grant to PR-2**, rather than narrowing the supersession to PR-1's lines.

---

## 6. Known limit and the verification plan

**The limit**: GitHub triggers `workflow_dispatch` only for a workflow whose file, carrying the trigger, is on the **default branch**. So **the dispatch path cannot be exercised live on PR-1's own branch**. (The merged issue spec said it could; its erratum of 2026-09-27 corrects that.)

**Before PR-1 merges** (evidence in PR-1):
1. PR-1's own `pull_request` runs report **all 18 required contexts under their required names**. This shows the rename expression's non-dispatch branch leaves the gate intact. `verify-gate-registration.sh` stays green.
2. A workflow lint over the six changed files (`actionlint` where available; otherwise a YAML parse plus a review of each `name:` expression), with its output cited.
3. `complete-task.sh`'s dispatch path and its zero-runs branch are exercised with a **dry-run flag**, which prints the `gh workflow run` commands (six), the detector's poll, and the detector's non-zero exit on a stubbed zero. **Its output is cited in PR-1's body; no new test file** (outside the extent).

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
  - **M2 makes the trigger observable**: a doc's `branch-head dispatch @ <S>` line, set against the unit PR's gate result at head `<S>`, is exactly the comparison it needs (Stacy R1 C1).
- **The gaps between dispatches**: work between tooling-made checkpoints, and any checkpoint made with `--no-ci`. The final parent's gap is closed by the PR itself.
- **Nothing requires CI evidence** (Stacy R1 C9 — the first draft overstated this, saying M2 "gives [dispatch] consequence").
  - A doc that declares `**CI-provenance**: local` throughout is fully compliant, and the dispatch results it could have cited can go unread.
  - The issue spec's "the agent reads them before the next parent's completion claim" (a3) is in no law text.
  - **What M2 does give is visibility**: a narrower-surface green now says so on its face.
- **The detection latency is one unit.** U2a declares no claims event, so U2a's docs are first audited at the **U2b MIDPOINT**, and so is PR-1's grant extent (§ 5 clause 7).
- **The #194 class is detected, not prevented.** The detector notices a dropped event; it cannot stop one.

---

## 8. Counter-argument (fold-back applied)

**The strongest objection**: *this changes law and tooling to buy earlier feedback, but it changes nothing that blocks a merge. Its standard is enforced only by post-acceptance claims passes, and — once C9 is admitted — it requires no CI evidence at all. So in the exact failure it targets (a narrower-surface green), a doc can stay compliant by saying `local`, the unit still merges, and nothing is caught earlier than the PR gate already catches it.*

**What working it changed** — this revision, driven by Stacy's C1, C2 and C9:
- The trigger is now a **declared line**, decidable from the doc, not a phrase judgment.
- **Branch-head runs can no longer be written up as the gate** (rule 3).
- The "Honest reach" paragraph and § 7 now **state** that nothing requires CI evidence, instead of implying M2 supplies consequence.
- Distinct dispatch context names keep the feedback runs from weakening the gate that *does* prevent.

**What survives, stated plainly**:
- **Prevention is unchanged and stays with the unit PR's required checks.** B-CI adds signal and visibility, not a gate, and it cannot force anyone to read the signal. Making CI evidence mandatory — for example, requiring a `PR gate` line on every gating parent — is a different measure, not drafted here. It would convert detection into a paperwork duty whose value over the gate itself is unclear.
- **Maintenance surface.** The six-workflow array in `complete-task.sh`, the rename expression in six files, the detector's time window, and now a third fixed-form header line form a multi-homed copy set (S-6) that can drift from `verify-gate-registration.sh`'s list.
- **Some of the benefit was already bought by the U2 split**, which shortened every no-CI window. The package's value scales with multi-parent units: U2b (six parents), U3 (four), U5 (four).

---

## 9. Application (on ratification)

1. Flip this ballot's `Status` line to **exactly** `**Status**: **RATIFIED (Peter, <date>)** — <tail>`: bold label, bold `RATIFIED (Peter, ` prefix, the date, a closing `)**`, then free text. **This is the only form § 4's `R` command matches** (Stacy R2-2: of 11 sampled ratified Status lines in this directory, 3 used forms that pattern would miss). Add the `README.md` § "Ballots on record" entry in the same change. Bump `**Last Reviewed**` to the ratification date in the two files that § 2 and § 4 edit (TCP and the guide).
2. Apply § 4 (M2) before or with § 2 (M1), so that S2's and S3's citation of § "CI provenance — where a green was measured" resolves when it lands.
3. Run the straggler sweep (§ 2.2), `check:section-citations`, and `rebuild_index` (the guide is a served doc). Run the metadata validation.
4. Send Stacy the § 4 notification, naming `R`.
5. Decide whether a `governance/classification-map.md` row is owed. The steward's read: **yes**, a row for `ci-provenance-line` at `check_state: proposed` (a parity presence-and-grammar check is a candidate, not armed). This is decided at ratification.

---

## 10. Stacy R1 — dispositions

Every item in her record (§ 11) is applied. None is declined.

| Item | Disposition |
|---|---|
| **C1** (High) | Applied. M2 is rebuilt on a declared provenance line with three fixed forms. Rule 3 forbids writing a dispatch line up as the gate; § 7 names the F-B trigger comparison. |
| **C2** (High) | Applied. The phrase trigger ("or any equivalent") is gone; the declared line decides (rule 2). Verbatim criterion text is ruled on explicitly: it never decides; the row's Status and Evidence, read under the line, do. U2a Task 12's "`npm test` and full `tsc` are green on the branch." is therefore classifiable without judgment. |
| **C3** (Medium) | Applied. The restated `not re-verified` practice is removed; rule 6 points to her charter § "The claims-pass record" and keeps the attribution. |
| **C4** (Medium) | Applied. Rule 5 names both commands (`--name-only`, plus a `-U0` content diff of `tasks.md`), defines the doc classes by path, and states the premise, with the Q2 flip as its re-evaluation trigger. |
| **C5** (Low–Medium) | Applied. In force is anchored to commit `R`, found by a pinned `git log -G` on `main`'s first-parent line, with an ancestry test. It is pinned to `main` rather than the branch commit, because squash-merge would orphan a branch SHA. |
| **C6** (Medium) | Applied (M1-b was taken). New site S7 sends checkpoints through the tooling; S3 gains the pointer. |
| **C7a** (High) | Applied as Peter ruled: the grant is extended to PR-2's item (d) (§ 5 clause 2(e)). |
| **C7b** (Medium) | Applied. The firing event is named (the U2b MIDPOINT, clause 7), and `git diff --name-only main...HEAD` is owed in the PR body (clause 5). |
| **C7c** (Medium) | Applied. The PR body enumerates every did-it-really-run guard hunk (clause 5). |
| **C9** (Medium) | Applied. § 7 now states that nothing requires CI evidence, and the one-unit detection latency. The overstatement is removed. |
| Minor: PAT scope | Applied: the preflight message names Actions: write (clause 3). |
| Minor: `verify-gate-registration.sh` header | Outside this ballot and every grant, as she said. Recorded as a steward straggler in the issue spec, to be fixed at the next touch of that file. |
| Minor: new test file outside the extent | Applied: no new test file; the dry-run output is cited instead (§ 6 step 3, clause 6). |
| Minor: S3 pointer | Applied (C6 row). |
| **E1, E2, E3** | Applied as dated errata in the issue spec. |
| **F3 conditions (a)–(d)** + edge case | Applied in `tasks.md`: counts N at both ends; `record` carries her ruling-note path and the expiry string; new subtask 11.5 carries the step; `ruling: assessment-gap`; Task 12 guards against rework-added `canonical/` files. |
| MIDPOINT/ARMING confirmation | Not given by this review, as she says; it is still owed as a separate item. |
| **R2-1** (Medium) | Applied. The grammar's tails are now run URLs (dispatch) or the same-numbered PR's checks URL (gate), plus the optional `; not green:` list, and nothing else. Proven on the 27 cases in § 10.1: 8 accept, 19 reject, 27/27 as expected, including her three loose matches. |
| **R2-2** (Medium) | Applied. § 9 step 1 pins the flip form, and § 4's `R` command matches exactly that form (`.Peter, ` also stands for the parenthesis, so the pattern means the same in BRE and ERE). An empty `R` is FATAL, by the owed-set pipeline's guard. The ratification commit uses the pinned form, and `R` resolves on this branch's history (§ 10.2). |
| **R2-3** (Low) | Applied. `M` is named on `main`'s first-parent history. The pre-`R` branch case is **excluded** by test 2 (branch base contains `R`), in one clause, so "No backfill" holds as written. A missing `(#<n>)` is fatal. |
| R2 MIDPOINT/ARMING | Still owed separately, as she restates. |

### 10.1 R2-1 — grammar cases (run with node against the § 4 regex, 2026-09-27)

| # | Case | Expected | Result |
|---|---|---|---|
| 1 | local | accept | accept |
| 2 | dispatch, one run URL | accept | accept |
| 3 | dispatch, three run URLs | accept | accept |
| 4 | dispatch + not-green tail | accept | accept |
| 5 | gate, checks URL | accept | accept |
| 6 | gate, checks URL with ?sha | accept | accept |
| 7 | gate + not-green tail (dispatch-named context) | accept | accept |
| 8 | 40-char SHA | accept | accept |
| 9 | local with a tail | reject | reject |
| 10 | label wrong case | reject | reject |
| 11 | uppercase SHA | reject | reject |
| 12 | short SHA (6) | reject | reject |
| 13 | hyphen for em dash | reject | reject |
| 14 | gate missing (merge ref) | reject | reject |
| 15 | trailing space | reject | reject |
| 16 | list bullet prefix | reject | reject |
| 17 | dispatch, no URL: 'trust me, all green' | reject | reject |
| 18 | gate, no URL: 'green' | reject | reject |
| 19 | dispatch: 'the gate is green' | reject | reject |
| 20 | dispatch, no tail at all | reject | reject |
| 21 | gate #215 citing another PR's checks | reject | reject |
| 22 | run URL followed by free text | reject | reject |
| 23 | dispatch citing a checks URL | reject | reject |
| 24 | gate citing a run URL | reject | reject |
| 25 | empty not-green list | reject | reject |
| 26 | non-GitHub URL | reject | reject |
| 27 | free text after not-green tail | reject | reject |

*Residual*: the `; not green:` list admits any context-shaped text; it is not checked against the 18 names. It can only name failures, never assert a green.

### 10.2 R2-2 — anchor check

Recorded as a comment on PR #217 after the ratification commit is pushed: the command in § 4, run against this branch's history in place of `main`, returns the ratification commit and not an empty string. The same command re-runs on `main` after the merge, where the squash commit becomes `R`.

**Where her review is recorded**: here, § 11, verbatim. `.kiro/docs/ballots/README.md` § "Lifecycle" step 2 has the author record the round **in the ballot**, the precedent being § 14 of the Spec 127 law ballot and § 6 of the delegated-tier ballot. No `reviews/` directory convention exists, so none is created.

---

## 11. Review round record

*Reproduced verbatim from the review record Stacy delivered on 2026-09-27. The only change is that heading levels are shifted down two, so the record nests under this section.*

### Ballot B-CI — Stacy's review (required reviewer)

**Ballot**: `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` (Status: DRAFT), PR #217, branch `chore/123-u2-rulings-and-b-ci`
**Read at**: `origin/chore/123-u2-rulings-and-b-ci` (FETCH_HEAD, 2026-09-27), together with the issue spec `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` and `.kiro/specs/123-consumer-distribution/tasks.md` (rulings F1/F3/F7).
**Reviewer**: Stacy (execution-claims verification). Review only. I have not drafted any wording for M2. Under the anti-rot clause I say where a rule is not decidable, and the steward decides what it should say instead. The changes below therefore state **properties the text must have**, plus factual errata.

---

###### [STACY R1]

**Overall verdict: ACCEPT-WITH-CHANGES.** The ballot is honest about its reach, its record-first form is correct, and the TCP before-texts match. Two properties in M2 are not decidable as drafted, and both matter for the exact failure this ballot comes from (C1 and C2). The grant also has an orphan and an audit clause that nothing triggers (C7).

**What the U1 escape actually was.** I checked this, because the ballot's § 1 frames it loosely. `task/123-u1-substrate` went red at PR open (`10061e6a`) on **Consumer Guard** and **Lane Timing** (`lane-application-mcp-server-suite`). Both failed only in a clean checkout or in a sub-package suite (`task-1-completion.md:131`; CI fix-ups `bb031175` and `202a28e9`). The parent docs' "green" claims were **honest local-command claims**. The Task 9 criterion reads "`npm test` and full `tsc` are green." with Evidence `npm test → 9268 passed`. Nothing false merged, because the PR gate caught it. So the escape was a **narrower-surface green**: true about the commands it named, and silent about the 18 contexts. That shape is the test I applied below.

---

##### 1. The CI-citation standard (M2): ACCEPT-WITH-CHANGES

**What already holds, and my claims pass can check it:**
- **The one-SHA rule** is checkable. Each run's `headSha` can be read (`gh run view <id> --json headSha,conclusion,name`), so "all at one S" can be falsified without asking the author.
- **"Every required check"**, keyed to the `verify-gate-registration.sh` set, gives me an enumerable denominator of 18, as I checked `EXPECTED_CONTEXTS`.
- **Dispatch counterparts run the same surface as the PR run at the same tree.** I read all six workflows. None has a path filter. The only event-conditional logic is:
  - `lane-timing`'s `cold` input, which defaults to `false`;
  - `agent-generator`'s C6 no-op early-exit, which behaves identically on a PR.
- **Rule 4's docs-only exception is sound for today's 18 contexts.** Section Citation Guard's citing roots are `governance`, `.kiro/steering` and `canonical`. Package drift scans steering, src, product-template, agents and dist. The 122 sweeps read one fixed 119-A design doc and no completion, summary or tasks.md path. CI-run tests reference spec paths only in comments. That is a read plus a grep, not an exhaustive proof.
- **The `local` label (rule 5)** is the right distinction.
- **No backfill, from U2a onward**: agreed.

**Required changes:**

- **C1 (High): a narrower-surface green is still admitted through rule 2's "dispatch counterpart".**
  - A dispatch run tests the **branch head**. The gate tests `refs/pull/<n>/merge`.
  - As drafted, a doc citing six dispatch runs at S may **state "the gate is green"**. That is a claim about a surface nobody ran, and it is exactly the § 7 residual turned into a compliant sentence.
  - **Property the standard needs:** a citation's provenance (dispatch at the head, or PR at the merge ref) is recorded, and a dispatch-backed citation cannot be read as a claim that the *gate* is green. It is a claim about the required checks at head S.
  - This is also the **only way my passes can detect the F-B trigger**. Peter ruled that "the claims passes watch for" a unit PR that goes red at the merge ref after same-SHA dispatch runs were green. I can only see that if docs record which provenance they cited.

- **C2 (High): the trigger is not decidable, and it misses U1's own shape.**
  - The scope is phrase-keyed with an open "or any equivalent". I would have to decide whether "`npm test` and full `tsc` are green", or an unlabelled `npm test → passed`, is a gate-green claim. Rule 5's `local` label binds only *inside* a gate-green claim. So an unlabelled local green outside one is neither compliant nor non-compliant. It is unclassifiable.
  - **This is live for U2a.** Task 12's criterion (tasks.md:597) is "`npm test` and full `tsc` are green on the branch." It will be reproduced verbatim in U2a's gating doc. The standard must decide whether reproduced criterion text triggers the rule.
  - **Property needed:** whether a run-result Evidence cell or statement is local or gate is determined by a label on the doc, not by my judgment of phrase equivalence. And the standard says which way verbatim criterion text falls.
  - Which rule achieves that is the steward's choice. I have not proposed one.

- **C3 (Medium): the `not re-verified` attribution is inaccurate, and the restatement should be a pointer.**
  - Attribution in form is correct: the ballot says the vocabulary is mine. The *content* reported is not my practice as chartered.
    - My negative vocabulary is **closed to one string**, `not re-verified — toolchain unavailable`, per my charter § "The claims-pass record", item 3, and the guide at line 228.
    - A missing or non-compliant citation is **first a finding on the authoring agent**. It goes to the owning agent as an explicit message, the same class as a missing delegated-tier line. It is not merely an unverified row.
    - CI results are independently openable, which iOS/Android toolchain claims are not. So I will usually be able to **re-verify the gate status myself** from the check-run record. I would record `not re-verified` only when S cannot be identified. Any extension of the closed string for that case is my decision, made in a claims-pass record.
  - **Change:** replace the restated practice with a pointer to my charter § "The claims-pass record", and keep the attribution sentence. A restatement in a steward-authored doc is a multi-homed copy (S-6) that goes stale whenever I change practice. It would also make my vocabulary depend on editing his doc.

- **C4 (Medium): rule 4 as written needs two commands, and one untested premise.**
  - `git diff --name-only` cannot show "checkbox marks only". That needs a content diff of `tasks.md`. The rule should name both.
  - "Completion docs, summary docs" should be defined **by path** (`.kiro/specs/<spec>/completion/**`, `docs/specs/<spec>/**`) so that classifying a file is not a judgment call.
  - **State the premise and its trigger.** The exception is valid only while no required check reads those paths. That is true today (verified above). It stops being true when **Q2 flips `completion-criteria-parity` to required**, because that check reads exactly those docs and `tasks.md`. The ballot should name the Q2 flip as the point where rule 4 is re-evaluated.

- **C5 (Low–Medium): "authored after ratification" is not git-decidable.**
  - Anchor it to the ratification record commit, for example a doc first added in a commit that descends from it. This is the S-5 date-boundary lesson; the owed-set pipeline already had one wrong result from an unpinned date boundary.
  - "U2a onward" is already decidable for Spec 123. Other specs in flight need the anchor.

**Residual accuracy (C9, Medium).** § 7 says "M2 is what gives [dispatch] consequence". That overstates it. **Nothing requires a gate-green claim.** A doc that labels everything `local` is fully compliant, and its dispatch results can go unread. The issue spec's "the agent reads them before the next parent's completion claim" (a3) is not in any law text.
- **Change:** § 7 should state this escape route as a residual.
- **Timing:** U2a declares no claims event. Its docs are first audited at the **U2b MIDPOINT**, a detection latency of one unit. That belongs in the same residual.

---

##### 2. The TCP amendment (M1): ACCEPT, with one M1-b change

**Accurate as drafted:**
- **All six before-texts match current TCP verbatim.** S1 is line 40, S4 is line 74, and I checked S2, S3, S5 and S6.
- **"Pushes" (S2/S3)** is accurate: unit-member mode already pushes (`complete-task.sh` usage, "UNIT-MEMBER MODE").
- **`--subtask` exists.**
- **"No regeneration needed" is correct.** The straggler phrase appears nowhere in `.claude/agents`, `canonical` or `.kiro/agents`. The remaining sites are TCP ×2, `.kiro/hooks/README.md:36` and `complete-task.sh:31, :104`, which matches the ballot.
- **"Feedback, not the gate"** is true.
- **"Test the branch head"** is true: `GITHUB_SHA` is the ref's head at dispatch.
- **"Non-required context names"** is true once a2 lands. It is live-verified only after PR-1 merges (§ 6 step 4), so the law briefly asserts something not yet verified live. U2a is blocked until the record reads pass, so nothing relies on it in that window. Acceptable.

**Changes:**
- **C6 (Medium, M1-b only).** Point 2 still says subtask commits "commit AND push the branch **with plain git**". Under M1-b the law would then send checkpoints to the path that never dispatches (§ 3 confirms plain git dispatches nothing). If Peter picks M1-b, that phrase must be reconciled in the steward's words. Otherwise M1-b's coverage rests on the honour system twice: once through `--no-ci`, and again through plain git.
- **Minor.** S2 (Implementation/Architecture) carries the pointer to § "Gate-green claims cite CI". S3 (Setup/Documentation) does not, although M2 binds every doc. Make them consistent.

---

##### 3. Fork M1-a / M1-b: from the claims side, a mild lean to M1-b (conditional on C6). The pick is Peter's.

- **Claim honesty is the same under both forks.** M2 binds to the cited SHA S. Red checkpoint runs, and checkpoints taken with `--no-ci`, cannot produce a false green. The unrecorded `--no-ci` is a feedback-latency cost, not a claims risk, so I do not need it recorded.
- **M1-b's edge for claims is where the runs land.** The last code-state checkpoint produces runs at S before the parent doc is written, so the doc can cite them inline.
  - Under M1-a, the only dispatch fires at the doc commit D itself. Any gate-green citation then needs a later docs-only commit (which rule 4 permits).
  - More friction means more all-`local` docs, which means M2 gets exercised less (see C9).
- **Counter-argument folded in, and what survives.** M1-b's advantage is convenience, not capability: M1-a reaches the same compliant state with one extra commit. **For claims, the fork is not decisive.** CI cost, and the red-noise effect on how carefully agents read results, are the real deciders, and both are Peter's to weigh.

---

##### 4. The write-scope grant (M3): ACCEPT-WITH-CHANGES

- **N1: take it.** `**` reaches `completion-criteria-parity.yml`, which the package says must not change.
- **N3: take it.** Otherwise `.kiro/hooks/README.md:36` contradicts the amended law.
- **N2: acceptable.** State that the fix-forward extent equals the (narrowed) grant extent.

**Required changes:**
- **C7a (High): the grant orphans PR-2.** § 5 "replaces the issue spec's § Grant once ratified", and its duration ends at PR-1's merge. The issue's grant covered PR-2's item (d): `tools/agent-generator/coverage-map.ts` and its tests, plus `canonical/coverage-{map,manifest}.yaml`. After ratification, nobody holds a grant for (d). Either narrow the supersession to PR-1's lines, or extend § 5. That choice is Peter's.
  - (d) changes my audit command's output. The consult on output shape still stands.
- **C7b (Medium): audit clause 6 has no firing event.**
  - PR-1 is a `chore/` PR. No claims event reaches it:
    - RELEASE audits parent criteria tables;
    - U2a declares no event;
    - the U2b MIDPOINT is scoped to Spec 123's parents.
  - **Change 1:** name the event. I will carry the extent check in the **123 MIDPOINT pass at U2b's merge** unless the ballot names another. The check has three parts:
    - `git diff --name-only <base>..<PR-1 merge>` is a subset of the extent;
    - the `package.json` diff outside `scripts` is empty;
    - each workflow hunk traces to item 3(a), 3(b), the fold-in, or F-A.
  - **Change 2:** have PR-1's body cite `git diff --name-only main...HEAD` as evidence. That is not a gate.
- **C7c (Medium): the extent includes the did-it-really-run guards.** It covers the selection floors and execution assertions inside the six workflows. Weakening one of them is in-extent, and it would turn a future "every required check green" into a narrower-surface green.
  - **Change:** PR-1's body enumerates every hunk that touches a floor or assertion step. The expected state is none, apart from re-pointing a step to a named script.
- **Minor.**
  - The dispatch needs the PAT's **Actions: write** scope. It was granted 2026-07-10 (`inbound-to-125-B-from-125-A.md` §5). The preflight message in `complete-task.sh` should name that scope.
  - `verify-gate-registration.sh`'s header still says the PAT "cannot dispatch workflows — 403". That is stale; a steward straggler, outside this ballot.
  - Any new test file for the dry-run path would be outside the extent.

---

##### 5. Ballot form: ACCEPT

- It is record-first per README § "The Ratification Protocol".
- The Status line and the application order (§ 9: record first, M2 before or with M1, straggler sweep, notification) are correct.
- It correctly carries no `Ratified-machine:` line.
- The counter-argument is folded back, and a non-empty residual is stated plainly.
- The fork is surfaced and not picked. Stating the steward's lean is fine.
- It honestly labels the #194 evidence as session memory, not a record.

**Errata to fix in the same PR** (issue spec, not law):
- **E1.** The issue's inventory and its "Correction… There are **five**" are wrong. `package-name-drift.yml` **already has `workflow_dispatch:`** (line 18, since `5c72c03a`, Spec 101 Task 1.8). Four workflows lack it.
  - Consequence: today it can be dispatched **under its required name** "Check package name drift". a2's six-file rename covers it, so no change to the law, but a1's count and the inventory line are false.
- **E2.** The issue's subtask-mode note cites "B-CI **§ 3**, fork M1-a/M1-b". The fork is at **§ 2.1**.
- **E3.** Issue (e) says "Regenerate per the Spec 122 pipeline". The ballot's "no regeneration is needed" is correct by my grep. Reconcile the issue.

---

##### 6. My F3 adjudications: ACCEPT, the mechanism is workable, under four conditions

**Verified:**
- `audit:coverage-map` enumerates **every file under `canonical/`** as a surface, and matches adjudications by `(sweep: audit:coverage-map, key: <surface path>)` (`coverage-map.ts:238–243`). So "keys are file paths" is exactly right.
- The "lingers silently" limit is accurate: adjudications are consulted only for blank rows.
- My authority to write the rows is real. Task 11 names me as a secondary, and its Primary Artifacts list `canonical/adjudications.yaml` (F3 entries only), so the tasks-row grant covers them.
- Lina's removal at 13.6 is listed on Task 13. I accept that removal, because it enforces the expiry my own record states, and I am told in the 13.6 notice.

**Conditions:**
- **(a) Falsifiability at both ends.** `grep -c … → 0` at 13.6 is satisfied vacuously if the rows never carried the exact string. So:
  - **U2a's evidence cites `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → N**, where N equals the audit's `adjudicated-blank` count, and the list of paths.
  - **13.6 cites → 0**, and (ii) shows **the same N paths** non-blank.
  - I will write the string exactly as "expires when 123 Task 13.6 lands in U2b".
- **(b) `record` must be citable.** The file's own rule is that a row without a citable record does not count as a ruling. Each row's `record` will carry the path of my ruling note (under `.kiro/specs/123-consumer-distribution/completion/`) **and** the expiry string.
- **(c) Put the step in a subtask.** The adjudication step is in Task 11's criteria, but no subtask carries it, and the Delegated-tier row describes my role as "11.3" only. Name the subtask that carries it, so the subtask-doc duty (S-4) covers the work. Placement is the author's call.
- **(d) The ruling value.** The file's `intentional-trim | assessment-gap | design-change` vocabulary is sweep-4's set-difference vocabulary, and none of those values means "guard pending, time-boxed". The parser does not validate `ruling`, so nothing breaks. I will use `assessment-gap`, with the time-box carried in `record`, unless the steward prefers a fourth value in his machinery.

**Edge case (Low).** Task 12's "C3 rework commits (if any)" could add a `canonical/` file. That file's row would be blank, and Task 12 has no adjudication grant. If that happens, it goes back to Peter as a tasks amendment. It is not something I would absorb silently.

*Out of scope here, still owed:* the amendment's "MIDPOINT and ARMING placements are Stacy's events and await her confirmation". That confirmation is a separate item and is not given by this review.

---

**Standards implications:** C1, C2, C4 and C5 are inputs to the steward's M2 wording. Under the Q5 cut, the wording is his.

*Stacy's R2 re-check, reproduced verbatim as she delivered it on 2026-09-27. Its heading is already at the level of the R1 record above, so it is not shifted.*

###### [STACY R2] — re-check, 2026-09-27

**Read at**: `origin/chore/123-u2-rulings-and-b-ci` @ `cd3f888b` (PR #217, OPEN), covering the ballot, the issue spec and `tasks.md`.

**Verdict: ACCEPT-WITH-CHANGES — two small Medium fixes and one Low.** Once R2-1 and R2-2 land, the ballot is ready for Peter's ruling. No R3 round is needed: both fixes can be checked mechanically (the test for each is given below).

**1. What was applied, and what I verified:**

- **C1/C2 — U1's escape can no longer be written up as a green gate.** I walked U1 Task 9 under the new rules.
  - With `**CI-provenance**: local`, rule 2 makes "`npm test` and full `tsc` are green. ✅ / `npm test → 9268 passed`" a local claim, and it is classifiable without judgment.
  - A dispatch line at `10061e6a` could only say "the required checks were green at branch head" (rule 3). It would also have to carry `; not green: Consumer Guard, lane-application-mcp-server-suite` (rule 4).
  - A `PR gate #215` line must carry the same tail.
  - Every way of writing it up is either honest or non-compliant on its face. Detection still happens after merge, which the "Honest reach" section says.
  - One judgment residue is left, and it is acceptable: whether a free-prose *sentence* asserts "the gate" still needs reading. It can no longer turn a result into a gate result, because the line decides that, not the sentence.
- **C3–C9, C7a/b/c, the errata and the minors are applied as intended.**
  - C3: rule 6 is now a pointer, with nothing restated.
  - C4: rule 5 uses both commands, path-defined classes, and the Q2 premise with its trigger.
  - C5: anchored to `R` (see R2-2).
  - C6: S7 is added and S3 carries the pointer.
  - C7a: covered by grant clause 2(e).
  - C7b: covered by clauses 5 and 7, with the MIDPOINT named.
  - C7c: covered by clause 5.
  - C9: covered by § 7 and the "Honest reach" section.
  - E1: the issue now says four workflows lack dispatch, and package-name-drift is noted as dispatchable under its required name.
  - E2 and E3: fixed.
  - The PAT scope, the no-new-test-file rule and the deferred `verify-gate-registration.sh` straggler are all recorded.
- **The F3 conditions are all in `tasks.md`.**
  - (a) N is counted at both ends, and 13.6 (iv) requires the same N paths.
  - (b) `record` carries both the note path (`completion/f3-coverage-map-adjudication-ruling.md`, also listed in Primary Artifacts) and the exact expiry string.
  - (c) Subtask 11.5 exists, and the Delegated-tier row names it.
  - (d) `ruling: assessment-gap`.
  - The edge case is a new Task 12 criterion (`git diff --diff-filter=A … -- canonical/`).
  - My R1 conditions on F3 are satisfied.

**2. Remaining changes:**

- **R2-1 (Medium) — the regex is looser than the three forms.**
  - I tested it (node, 15 cases). It **matches** all three forms and the `; not green:` tail. It **rejects** a local line with a tail, wrong case, an uppercase or short SHA, a hyphen in place of the em dash, a missing `(merge ref)`, trailing space and a list bullet.
  - It **also matches**:
    - `branch-head dispatch @ 10061e6a — trust me, all green` (no URL);
    - `PR gate #1 @ abcdef0 (merge ref) — green` (no URL);
    - `branch-head dispatch @ abcdef0 — the gate is green`.
  - The `— .+` tail admits anything, so the grammar does not enforce what the prose requires.
  - **Property needed**: the tail is a list of run URLs (dispatch form) or the PR's checks URL (gate form), optionally followed by the `; not green:` tail and nothing else.
  - My passes would still catch a URL-less line by opening the runs. The fix matters because § 9.5's future parity presence-and-grammar check would inherit this regex as it stands.
- **R2-2 (Medium) — the in-force anchor can resolve to nothing, and it would do so silently.**
  - The `-G'^\*\*Status\*\*: \*\*RATIFIED'` pattern matches only the bold form.
  - Of the 11 ratified Status lines in `.kiro/docs/ballots/` I sampled, 3 would not match: two plain `RATIFIED (Peter…` and one backticked `` `RATIFIED (Peter…)` ``. § 9 step 1 does not pin which form the flip uses.
  - If the flip is not bold, `R` comes back empty and **no doc is ever bound**. That is the silent wrong answer the owed-set pipeline produced at the CLOSEOUT pilot (F-1).
  - **Property needed**: the flip form in § 9 step 1 is pinned to exactly what the pattern matches, **and** an empty `R` is a fatal error, never "nothing bound". The owed-set pipeline has the same `[ -n "$RATIFIED" ] || FATAL` guard.
- **R2-3 (Low) — "the commit that first added it" does not name its history.**
  - On `main`'s first-parent line, the squash commit of any unit merged after `R` descends from `R`. So docs written before ratification, on a branch cut before `R`, would be bound. That is a small backfill, and it contradicts "No backfill".
  - Name the history, and either accept or exclude that case in one clause.
  - Impact is nil for Spec 123, because U2a is cut after PR-1 merges.

**Still owed separately, and not given here**: my confirmation of the MIDPOINT and ARMING placements.

**Standards implications**: R2-1 and R2-2 are inputs to the steward's § 4 and § 9 wording. The wording itself is his.
