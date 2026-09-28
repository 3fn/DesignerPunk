# Ballot Measure: A standing scope for the CI-regime owner, issue-row grants, and the instrument rule

**Date**: 2026-09-28 (commissioned 2026-09-27)
**Drafted by**: Thurgood (Civitas steward; owner of the CI regime under B-CI § 5)
**Status**: **RATIFIED (Peter, 2026-09-28)** — "as recommended on all five forks"; the rulings are recorded verbatim in § 7 § "Rulings (Peter, 2026-09-28)". **Record-first**: this commit is the record, committed before any law edit (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"). **Peter's merge of this PR is `R`**, the ratification commit on `main`'s first-parent history. The edits land in the commits after this one, in the same PR: edit sites 1–3 and the register and README entries (Thurgood); edit site 4 (Stacy, `Agent: stacy`); then regeneration.
**Rulings that commissioned it**:
- **Peter, 2026-09-27** — the "holistic path" on the PR-2 grant question: (1) PR-2 stays instrument-only; (2) a standing scope for the CI-regime owner; (3) the instrument rule.
- **Peter, 2026-09-28** — **both (a) the standing scope and (e) issue-row grants**. Thurgood authors, under the five conditions his and Stacy's consults independently named.

> ## ⚠️ CONFLICT OF INTEREST — stated first (condition 1)
>
> **The author is drafting a change to his own charter.** M1 widens `canonical/agents/thurgood.md`'s write scope, and Thurgood benefits from every path it adds. Peter ruled that he author anyway, under conditions, because a charter change is governance law in the owner's seat. The conditions:
> - **(1)** this disclosure;
> - **(2)** Peter's ruled limits are transcribed **verbatim** (§ 2, "Peter's ruled limits");
> - **(3)** every element the author adds beyond them is flagged **[author's addition — Peter rules]**;
> - **(4)** paths are enumerated exhaustively, each justified by a named recurring task and carrying a review trigger. There is no "CI lanes" umbrella;
> - **(5)** Stacy is the **required reviewer, with an explicit mandate to attack the width**. She audits the extent afterwards, so her incentive runs toward narrow.
>
> **The author also frames this ballot's counter-arguments (§ 6).** A self-serving framing is hard to see from inside the seat. Stacy's review and Peter's ruling are the only checks on it.

**Required reviewer**: Stacy — mandate: **attack the width** of M1 and M2. M3 changes how her instruments' surfaced rows are disposed, and she audits M1 and M2 afterwards.
**Unit**: a standalone record-first ballot on `main`. It touches governance law (a charter, `.kiro/issues/README.md` and `governance/classification-map.md`), so **Peter merges it** under the standing carve-out.

> **No `Ratified-machine:` line, deliberately.** It is the Spec 127 law ballot's parseable in-force record, for a checker that reads exactly one (the B-CI and T1-(B) precedent).

---

## 1. The gap

**B-CI names an owner of the CI regime but gives him no standing scope.**
- `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` § 5 clause 1: *"Who. Thurgood (Civitas steward), as owner of the CI regime."*
- The owner's charter write scope, `canonical/agents/thurgood.md` L233–236, contains no workflow and no gate-registration file:
  ```yaml
  writeScope:
    - "src/__tests__/**"
    - ".kiro/specs/**"
    - "docs/specs/**"
  ```

**Every CI touch has needed a one-off grant.**
- **PR-1** needed B-CI § 5's grant, plus N1 (the six workflows by name), N2 (one fix-forward PR) and N3 (`.kiro/hooks/README.md`). The grant was time-boxed to PR-1's merge.
- **PR-2** needed C7a to extend it.
- **On 2026-09-27, the steward's second seat correctly refused** to apply a tested patch to `.github/workflows/lane-timing.yml`, because B-CI § 5 clause 4 had expired paths a–d at PR-1's merge.
  - **The patch**: an `npm run test:agent-generator` step, with a did-it-really-run selection floor, inside the existing required `lane-functional-root` job.
  - **What it closes**: the gap `.kiro/specs/123-consumer-distribution/completion/task-10-completion.md` § "Carried items" recorded — the agent-generator lane runs in no workflow.
  - **Tested locally**: 30 suites, 425 tests.
  - **The refusal was right; the scope was the defect.**

**Issues assign CI work that the owner's charter forbids.** `.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md` names **Thurgood** as owner of adding `npm run test:scripts` "to an existing required lane". It became executable only because B-CI's temporary PR-1 grant happened to cover it. The step is now in `lane-functional-root` (`lane-timing.yml` L231–232). *(The issue still reads `ACTIVE`. That is an owner's closure, owed at the next walk, and outside this ballot.)* **The general shape**: an issue can name an owner for a path the owner cannot touch.

**Per-touch grants cost a ballot or an amendment each time**, and they make "the owner may not touch what he owns" the resting state. They also push fixes into instrument PRs (§ 4).

---

## 2. M1 — (a) the standing CI-regime scope (narrowed to P1 at R2)

*(Narrowed at `[THURGOOD R2]`, on Stacy R1's measured base rate: P1's named task recurred twice in two days; P2–P4's tasks recurred at most once in 80 days, and that was a retrofit. **P2, P3 and P4 are excluded and go to M2, per event.** The original P1–P4 table is in this file's history at `c7b1f4bb`.)*

### Peter's ruled limits (verbatim, condition 2)

> **New required contexts, changes to `EXPECTED_CONTEXTS`'s count, branch protection and repo settings stay Peter's.**

### The scope — one path (condition 4: justified by a named recurring task, with a review trigger)

| # | Path | What the owner may do | Named recurring task |
|---|---|---|---|
| **P1** | `.github/workflows/lane-timing.yml` | **A step that runs an existing `package.json` test script** (`npm run test` or `npm run test:*`, root or sub-package) **inside an existing required job, plus that step's own did-it-really-run floor.** The floor fails on zero, and it selects with the same script or config as the step. **Nothing else**: no environment, cache, runner, `if:` or `continue-on-error` change, and no step that is not a test script. *(Stacy R1 change 1, verbatim.)* | **A test root that the functional lane does not select.** It has recurred twice in two days: `test:scripts` (PR-1; `lane-timing.yml` L216–232) and `test:agent-generator` (§ 1; `task-10-completion.md` § "Carried items"). It recurs with each new `tools/**` or `scripts/**` suite root outside `jest.functional.config.js`'s roots. |

**Excluded paths — every other `.github/**` path and `tools/agent-generator/verify-gate-registration.sh`.** A touch on any of them uses **M2** (an issue-row grant, which carries M1's excluded acts, M2 clause 5) or Peter's direct action. This includes:
- `agent-generator.yml` (formerly P2): its mirror hunks follow Peter's own act, so they ride his PR or an M2 issue it opens;
- `completion-criteria-parity.yml` (formerly P3): Q2's preparation is a one-time event, and dormancy repairs are per event, which is M2's exact shape;
- `verify-gate-registration.sh` (formerly P4): the gate's own verifier and ARMING evidence, where "assertion mechanics" can weaken the check without changing the set.

**Excluded acts** (inside P1):
- **Peter's (verbatim, above)**: a new required context; a change to `EXPECTED_CONTEXTS`'s count; branch protection and repo settings.
- **[author's addition — Peter rules; Stacy R1 recommends TAKE]**: **removing or weakening** any step, selection floor or execution assertion. With the additivity check below, this becomes decidable for P1.

**Evidence owed in each PR's body** (B-CI § 5 clause 5, made standing):
- `git diff --name-only main...HEAD` → exactly `.github/workflows/lane-timing.yml`;
- **additivity, decidable**: `git diff --numstat main...HEAD -- .github/workflows/lane-timing.yml` → deletions column `0` (P1 edits remove no line). *(Stacy R1 change 2's intent. The command form was changed at R2; see the fork list in § 7.)*
- the added step's script name and its floor, with the floor's selection output from the PR's own CI run.

**Audit — ARMING is the primary event, RELEASE the backstop** *(Stacy R1 change 6; incorporated at R2)*:
- The firing event is **ARMING, at the P1 PR's merge**: adding a test root to a required lane is "a new barrier arms".
- ARMING reads:
  - the diff ⊆ P1;
  - zero removed lines;
  - the floor's selection matches the step;
  - `audit:coverage-map`'s lanes row for that root cleared.
- The next **RELEASE** pass is the backstop, over the release delta.
- **An edit outside P1, or an excluded act, is a finding on the executing agent.**

**Review trigger — [author's addition — Peter rules; Stacy R1 recommends TAKE]**:
- **(i)** At each RELEASE claims pass, P1's use since ratification is read. **If P1 is unused across two consecutive RELEASE passes, its removal is proposed** by an amendment ballot.
- **(ii)** **Any change to the required-context set** (Peter's act) re-reads P1 in the same record.

### Before → after — edit site 1: `canonical/agents/thurgood.md`, frontmatter L233–236

Before:
```yaml
writeScope:
  - "src/__tests__/**"
  - ".kiro/specs/**"
  - "docs/specs/**"
```
After:
```yaml
writeScope:
  - "src/__tests__/**"
  - ".kiro/specs/**"
  - "docs/specs/**"
  - ".github/workflows/lane-timing.yml"
```

### Edit site 2: `canonical/agents/thurgood.md`, body

The glob cannot carry the limit, so the charter states it.
- **Before**: § "Domain Boundaries" → "### In Scope" has no CI-regime line.
- **After**: append:
  > `- **CI regime — standing test-lane scope (ballot 2026-09-27-ci-regime-standing-scope § 2)**: in `.github/workflows/lane-timing.yml` only, a step that runs an existing `package.json` test script inside an existing required job, plus its own did-it-really-run floor (fails on zero; same selection as the step). Nothing else — no env/cache/runner/`if:`/`continue-on-error` change, no removed line (`git diff --numstat` deletions 0). **Never**: a new required context, a change to `EXPECTED_CONTEXTS`'s count, branch protection or repo settings (Peter's). Every other CI path goes through an issue-row grant (§ 3). ARMING audits each such PR at its merge.`

### Edit site 3: `.kiro/steering/Agent-Directory.md`, § "Thurgood" **Owns** line

**[author's addition — Peter rules; Stacy R1 recommends TAKE, reworded]**
- **Before**: "…the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration), **Civitas infrastructure** (…)."
- **After**: "…the `completion-criteria-parity` instrument (checker source, CI wiring, gate registration), **the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)**, **Civitas infrastructure** (…)."

### Edit site 4: `canonical/agents/stacy.md`, the trigger-table ARMING row (L397)

**Stacy owns and applies this edit**; the author does not write in her seat.
- **Before**: `| **ARMING** | A new barrier arms / the required-check set changes | `audit:coverage-map` + `verify-gate-registration.sh`; **plus `completion-criteria-parity` dormancy** (C4-1) — you detect dormancy on the row Thurgood owns; he repairs | Stacy |`
- **After** (Stacy R1 change 6, verbatim):
  - Event gains `/ a CI-regime standing-scope (P1) PR merges`;
  - Scope gains `plus, for a P1 PR, the extent and additivity checks (ballot 2026-09-27-ci-regime-standing-scope § 2)`.
- **Proposed at R2 for her confirmation, as row owner** (fork list, § 7): the Event also gains `or an issue-row grant (§ 3) over a `.github/**` path merges`.

### Application, at ratification, in one PR

1. Commit RATIFIED.
2. Make edit sites 1 and 2 (Thurgood).
3. **Make edit site 4 (Stacy, in her own commit, `Agent: stacy`).**
4. Regenerate with `npx tsx tools/agent-generator/generate.ts`. This rewrites the rendered Thurgood **and** Stacy agents, prompts and Kiro configs, their attribution sidecars, and `canonical/generated.lock`.
5. `npx tsx tools/agent-generator/diff-guard.ts` → green.
6. Make edit site 3, if taken.
7. Apply M2's and M3's register entries and README items 7–8.
8. Run `rebuild_index`.
9. `node scripts/validate-steering-metadata.js` → no new errors.

**What M1 does not change**: no other charter beyond edit site 4; no ratification authority; the governance carve-out; Q2's gating of `completion-criteria-parity` as a required check.

---

## 3. M2 — (e) the issue-row grant (T1-(B)'s shape, applied to issues)

> **STANDING RULE — issue-row write-scope grant:**
> 1. **Extent.** A **merged** chartered issue under `.kiro/issues/` whose body carries a `**Grant paths**:` list grants write access to **exactly the paths in that list**, and to nothing else.
> 2. **Who.** The issue's **named owner** only. Agents the issue merely consults receive no grant.
> 3. **Duration.** The grant holds **on the fixing PR's branch only**, and **expires when that PR merges**. It covers one fixing PR, and the issue then closes (`git mv` to `archive/`, `.kiro/issues/README.md` convention item 5).
> 4. **Activation.** **Peter's merge of a PR whose diff adds or changes the `**Grant paths**:` list, and whose PR body names the grant (the issue path and the listed paths).** A list added or changed in a PR whose body does not name it grants nothing. *(Stacy R1; incorporated at R2.)*
> 5. **What it does not change.** The grant is additive to charter scope and confers **no ratification authority**. **An issue can never grant a governance-law path**: `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, and agent charters, prompts or configs (`canonical/agents/**` and their renderings). Those stay ballot-only. **An issue-row grant over any `.github/**` path or `tools/agent-generator/verify-gate-registration.sh` carries M1's excluded acts** (no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion), **unless the issue's grant line names the act and Peter's merge admits it.** *(Stacy R1; incorporated at R2.)*
> 6. **Audit.** The fixing PR's `git diff --name-only` must be a subset of the list, cited in its body. **A path outside it is a claims-pass finding on the executing agent.** The comparison is against the list **as it stood at the activating merge** (`git show <activating-merge>:<issue path>`); later edits to the issue grant nothing further *(Stacy R1; incorporated at R2)*. The finding is read at the next RELEASE pass, or at ARMING if edit site 4's proposed extension is taken (§ 7).
> 7. **Trace.** Every listed path must trace to the issue's stated gap. A listed path with no trace is a walk finding (the monthly health check).

- **Register row**: `governance/classification-map.md`, a new entry `issue-row-write-scope-grant`, modelled on `tasks-row-write-scope-grant`:
  - `boundary_call.class: functional`;
  - `verification: { disposition: audit, owner: stacy, check_state: none, checks: [] }`;
  - `education`: the law home is this ballot § 3, with a pointer-grade line in `.kiro/issues/README.md` § "The convention" (item 8, below);
  - `history`: the creation line.
- **Before → after — `.kiro/issues/README.md` § "The convention".**
  - **Before**: the list ends at item 6 ("The walk").
  - **After**: item 7 is § 4's, and add item 8:
    > `8. **Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3): an issue whose body carries a `**Grant paths**:` list grants its named owner write scope over exactly those paths, on the fixing PR's branch, until that PR merges — activated by Peter's merge of a PR whose body names the grant; the fixing PR is diffed against the list as it stood at that merge; a `.github/**` grant carries M1's excluded acts unless named and admitted; never a governance-law path; the fixing PR cites its path list. An out-of-list edit is a claims-pass finding.`

---

## 4. M3 — the instrument rule (amended per both consults)

> **THE INSTRUMENT RULE.**
> - An instrument that surfaces rows ships in a PR carrying **no fix outside its own extent**. The instruments this covers include the 122 sweeps, `audit:coverage-map` and its lanes section, and the `completion-criteria-parity` checker.
> - **Each surfaced row, in the same PR**, is either:
>   - **adjudicated** under the instrument's `sweep:` key in `canonical/adjudications.yaml`; or
>   - **routed to its owner as a chartered item**, with owner, named trigger, and **a unique expiry string in the adjudication `record`**. The fix PR removes that string, citing `grep -c "<string>" canonical/adjudications.yaml` → 0.
> - **Fixes ship under the owner's standing scope, in their own PR.**
> - **Exception**: Peter's ruling, recorded in that PR, may admit a **named, text-preserving normalization of the instrument's own input** that the instrument's change turns red, provided **no criterion text changes**. This is #211's shape.
> - **[author's addition — Peter rules; Stacy R1 recommends TAKE, made exact]** The fix PR, under whatever scope it ships, may remove **exactly the adjudication rows whose `record` carries its expiry string** (the `canonical/adjudications.yaml` diff removes only those rows and adds nothing, cited), and commit the `canonical/generated.lock` written by a green `diff-guard.ts` run **in the same PR** (the run's output line cited). Without this clause, the rule's own removal step would fall outside M1 and M2's paths.

**Placement — confirmed as steward, with the split stated.**
- **Law home**: `governance/classification-map.md`, a new entry `instrument-rows-disposed-not-fixed`. I agree with Stacy's read that cross-spec check law lives in the register. The rule's audit is a set comparison over a PR (the instrument's extent against its diff), and the register's schema carries exactly that: `verification: { disposition: audit, owner: stacy, check_state: none }`.
- **Operational half**: `.kiro/issues/README.md` § "The convention", item 7, pointer-grade. The "routed as a chartered item" disposition resolves there, and the walk checks it.
- **Not the completion guide**: it governs completion docs, not instrument PRs.
- **Not C8's design doc**: 122's C8 governs the adjudication row's form, which M3 cites and does not change.

**Before → after — `.kiro/issues/README.md` § "The convention".**
- **Before**: the list ends at item 6.
- **After**: add item 7:
  > `7. **Instrument-surfaced rows** (register entry `instrument-rows-disposed-not-fixed`; ballot 2026-09-27-ci-regime-standing-scope § 4): an instrument's PR carries no fix outside its own extent; each surfaced row is, in that PR, adjudicated under the instrument's `sweep:` key or filed here as a chartered item (owner + named trigger + a unique expiry string in the adjudication `record`, removed by the fix PR with `grep -c` → 0). A surfaced row with neither disposition is a walk finding.`

**Before → after — `governance/classification-map.md` § "Entries".**
- **Before**: no entry.
- **After**: `### instrument-rows-disposed-not-fixed`, with:
  - `rule`: the text above, in one line;
  - `boundary_call`: `class: functional` — the instrument PR's diff against the instrument's extent is a set comparison;
  - `verification`: `{ disposition: audit, owner: stacy, check_state: none, checks: [] }`;
  - `education`: the law home is this ballot § 4; pointer-grade in the issues README, item 7;
  - `history`: the creation line, citing #211 as the exception's shape.

---

## 5. First application

**On ratification, the agent-generator lane fix ships under M1 (P1)** as its own PR:
- the § 1 patch: `npm run test:agent-generator` plus at least one selection floor, in `lane-functional-root`;
- the PR-body evidence per § 2 (name list, `--numstat` deletions 0, the floor's selection output); ARMING audits it at its merge;
- **it closes Stacy's `assessment-gap` row** for the agent-generator lane (filed by PR-2 under M3's discipline), by removing it and citing `grep -c` → 0.

**The row's deadline is before U2b's first commit.** The gap is the lane that guards U2b's `triviality.ts` work.

**Fallback, if this ballot is not ratified by then**: Peter's human-direct PR carries the same patch. The row records that fallback, so U2b never starts with the lane unguarded.

---

## 6. Counter-arguments (fold-back applied; residuals from both consults and Stacy R1)

- **Concentration of gate-adjacent authority in one seat.**
  - **Folded in (R2)**:
    - **one path**, not four;
    - only test-script steps with their own floors;
    - zero removed lines, decidable;
    - Peter keeps contexts, `EXPECTED_CONTEXTS`'s count and settings;
    - ARMING at merge;
    - a use-based review trigger.
  - **Residual**: a test-script step can still **mis-select** within its own script (for example a `test:*` script whose config selects less than its name suggests). The floor catches zero; it does not catch "fewer than intended". ARMING's lanes-row check is the post-merge catch.
- **"Additive" at the margin.**
  - **Folded in (R2)**: P1 admits only test-script steps and their floors, and the numstat check makes "no removed line" decidable. This closes most of it.
  - **Residual**: an added step can still *add* narrowing, such as a floor looser than the suite's real size. The floor must select with the step's own config, but its threshold is the author's.
- **Post-merge audit only.**
  - **Folded in (R2)**: ARMING fires at the P1 PR's merge, not at a months-away release.
  - **Residual**: it is still post-merge. The PR's own required checks remain the only pre-merge protection.
- **M2's per-touch cost** (Stacy R1's unfoldable residual).
  - **Residual**: with P2–P4 excluded, each such event costs an issue PR before the fix PR, and Q2's preparation may need more than one. **That friction is traded for the verifier's independence. The pick is Peter's (§ 7 forks).**
- **The author frames these counter-arguments (condition 1).**
  - **Residual**: Stacy's R1 found four places where the framing under-weighted the author's own scope. They are answered below, and her review is what surfaced them.

**Stacy R1's four residuals, each with the author's response:**
1. **"The width fell on the verifier's own instruments"** (P3 and P4 put the audited seat's hand on the auditor's evidence tools).
   - **Conceded, and folded by exclusion.** My § 6 addressed gate authority, not verifier independence, and I missed the second, being the seat whose hand it was.
   - **Residual**: M2 can still grant those paths per event. M2 clause 5, which carries M1's excluded acts onto `.github/**` grants, and ARMING (if the edit-site-4 extension is taken) are the guard.
2. **RELEASE latency.**
   - **Conceded.** Post-merge-next-day and post-merge-next-quarter are different audits. ARMING is now primary.
   - **Residual**: M2 CI grants still sit at RELEASE unless Stacy takes the edit-site-4 extension (a fork).
3. **"Additive" covers more than tests.**
   - **Conceded.** My mis-selection residual named only the floor. P1 is now test-script steps only, with no `if:`, `continue-on-error`, environment, cache or runner change.
   - **Residual**: the one under "'Additive' at the margin" above (a floor threshold chosen by the author).
4. **My own tasks-row precedent's counter-argument was not cited against M1** (*"permanent scope for temporary work … charters drift toward 'everything'"*).
   - **Conceded — this is the sharpest of the four. I recorded that counter-argument myself on 2026-09-26, and I did not apply it to my own widening.**
   - **Folded**: P1 is the only path whose task is measured as recurring, so P2–P4, which were temporary-shaped, are cut.
   - **Residual**: P1 is still a permanent charter widening. The drift risk is held by the use-based review trigger (two unused RELEASE passes → removal proposed), after the fact, not at the start.

---

## 7. Review round record

### Rulings (Peter, 2026-09-28) — ratified "as recommended on all five forks"

1. **M1's width: P1 only.** No path is restored; `agent-generator.yml`, `completion-criteria-parity.yml` and `verify-gate-registration.sh` stay excluded, reachable through M2 per event.
2. **M2 friction: accepted.** Per-event issue PRs stand; there is **no time-boxed P3 restore** for Q2's preparation.
3. **Additivity command: `git diff --numstat main...HEAD -- .github/workflows/lane-timing.yml` → deletions `0`.**
4. **Edit site 4's extension: YES.** ARMING also fires when an issue-row grant over a `.github/**` path merges. Edit site 4 carries it, and Stacy confirms it in her own commit.
5. **All four author's additions TAKEN**:
   - the removing-or-weakening exclusion;
   - the use-based review trigger;
   - the Agent-Directory line;
   - M3's row-removal and `generated.lock` clause.

### ⚑ Forks for Peter — read these first (as of `[THURGOOD R2]`)

**No Stacy R1 item was declined.** These forks are what remains for Peter's ruling:
1. **M1's width: P1 only (author and reviewer agree), or restore any of P2–P4.**
   - Peter's 2026-09-27 ruling framed a standing scope "over the CI regime". R2 narrows it to one path on the measured base rate.
   - Restoring any path reverses Stacy R1 changes 3–5. **The author, the interested party, recommends against restoring.**
2. **M2's per-touch friction versus verifier independence** (Stacy's unfoldable residual). With P2–P4 excluded, Q2's preparation and each mirror or dormancy repair costs an issue PR first. Accept that, or restore P3 for Q2's preparation only, time-boxed to the Q2 sitting.
3. **The additivity command form (minor)**: `git diff --numstat … → deletions 0` (the author's R2 form), or Stacy's `git diff … | grep -c '^-[^-]' → 0`.
   - **The difference**: a removed YAML line that itself begins with `-` at column 0 prints as `--…` in the diff and escapes `^-[^-]`. Numstat counts every removed line and never counts the header.
   - This is a change to her exact text, so **Stacy confirms or reverts it at R2**.
4. **Edit site 4's extension** (Stacy owns the row): whether ARMING also fires when an **issue-row grant over a `.github/**` path** merges. If it is not taken, M2 CI grants are audited at RELEASE only, which is residual 2's latency on M2.
5. **The author's additions still awaiting Peter's rule** (Stacy R1 recommends TAKE on all):
   - the "removing or weakening" exclusion;
   - the use-based review trigger;
   - the Agent-Directory line, as reworded;
   - M3's row-removal and `generated.lock` clause, as made exact.

*(The author records incorporation below each review.)*

### [STACY R1] — required reviewer, mandate "attack the width", 2026-09-28

**Read at**: `c7b1f4bb` (this branch); the precedents are B-CI § 5 and `2026-09-26-tasks-row-write-scope-grant.md`; the charter is `canonical/agents/thurgood.md` L233–236.

**My own bias, disclosed**: P3's workflow and P4's script are instruments my claims seat reads. The parity dormancy check and `verify-gate-registration.sh` are ARMING evidence. My incentive to narrow is strongest exactly there. Weigh the P3/P4 calls with that in mind.

**The measured base rate, which drives the M1 verdict.**
- `git log` over the four paths since 2026-07-10 (about 80 days) gives:
  - **`lane-timing.yml`** (P1): 4 edits. Two were 125-A tasks (their own grants); one was a non-additive config fix (`a57d2fba`); one was PR-1.
  - **P2–P4 together** (`agent-generator.yml`, `completion-criteria-parity.yml`, `verify-gate-registration.sh`): 5 edits, as follows.
    - Two were count changes, which are Peter's act: `f652c3d3` (17→16) and `fb53d193` (16→18).
    - Two were spec-task grants: 122 `9297488e` and 127 `46a43b33`.
    - **One** is the kind of edit P2/P4 would cover: PR-1's unit-branch retrofit, `90fb0e71`. That was a one-off.
- **P1's named task has recurred**: `test:scripts` in PR-1, and `test:agent-generator` now, two roots in two days. **P2–P4's named tasks have not recurred**: at most one covered edit each in 80 days, and it was a retrofit.

#### M1 — ACCEPT-WITH-CHANGES: **narrow to P1. Exclude P2, P3 and P4 (they go to M2, per event).**

1. **P1: keep it, with the width tied to the named task.**
   - The current wording, "additive steps inside its existing required jobs", admits any step type. That includes steps that narrow what is tested while adding lines, such as a step that deletes or filters fixtures, a `continue-on-error: true`, or an `if:` guard.
   - **Exact change** to P1's "What the owner may do":
     > *"A step that runs an existing `package.json` test script (`npm run test` or `npm run test:*`, root or sub-package), inside an existing required job, plus that step's own did-it-really-run floor. The floor fails on zero, and it selects with the same script or config as the step. **Nothing else**: no environment, cache, runner, `if:` or `continue-on-error` change, and no step that is not a test script."*
2. **"Additive" must be decidable after merge.** Add to "Evidence owed in each PR's body": *"`git diff main...HEAD -- .github/workflows/lane-timing.yml | grep -c '^-[^-]'` → 0 (P1 edits remove no line)."* That is what my pass diffs. A modification such as `a57d2fba` then goes to M2 by construction.
3. **P2 — recommend EXCLUDE.**
   - The named task, "when Peter adds a 122 context, its mirror follows", fires only on Peter's own act. So the mirror hunks belong **in Peter's PR, or in an M2 issue that his act opens**.
   - Re-pointing a step to a named script is PR-1's one-off retrofit, already done.
4. **P3 — recommend EXCLUDE.**
   - Q2's arming preparation happens once, not repeatedly. That is M2's exact shape: one fixing PR, then the grant expires.
   - Dormancy repairs, which my ARMING detects and Thurgood repairs, are per-event, and each goes to M2.
   - B-CI excluded this workflow "by design", and nothing since has changed that reason.
5. **P4 — recommend EXCLUDE. It is not only the thinnest; it is the most sensitive.**
   - This script is the gate's own registration verifier: coverage-of-coverage, and my ARMING evidence.
   - "Assertion mechanics" edits can weaken the check without changing the set. Whether shell mechanics were weakened can only be judged after merge, by the verifier whose instrument was edited.
   - The named task follows Peter's set change, and that change is made in this same file, so it rides his PR.
6. **The audit event: recommend ARMING as the primary event, and RELEASE as the backstop.**
   - **RELEASE alone** leaves a latency tied to the release cadence. After 123, releases may be months apart, so a narrowed CI step would stand unaudited for that long.
   - Adding a test root to a required lane **is "a new barrier arms"**, which is my ARMING trigger. It fires at the P1 PR's merge, and it already runs `audit:coverage-map`, whose lanes row for that root should disappear.
   - **Exact change**:
     - Replace the "Audit" bullet with: *"The firing event is **ARMING**, at the P1 PR's merge (a new barrier arms). It reads the diff ⊆ P1, zero removed lines, the floor's selection matches the step, and `audit:coverage-map`'s lanes row cleared. The next RELEASE pass is the backstop, over the release delta."*
     - **Add an edit site**: `canonical/agents/stacy.md`, the trigger-table ARMING row. Its Event gains "/ a CI-regime standing-scope (P1) PR merges", and its Scope gains "plus, for a P1 PR, the extent and additivity checks (ballot 2026-09-27-ci-regime-standing-scope § 2)", followed by regeneration.
     - Without that edit site, the audit duty lands in my seat with no row carrying it: the promised-artifact-without-a-criterion-row class.
7. **The review trigger: recommend TAKE**, with (ii) re-reading "P1" only.
8. **The "removing or weakening" exclusion: recommend TAKE.** With change 2 it becomes decidable for P1.
9. **The Agent-Directory line: recommend TAKE**, reworded to match: *"…the CI regime's standing test-lane scope (`lane-timing.yml` test-script steps with floors; ballot 2026-09-27-ci-regime-standing-scope)…"*.
10. **The charter body line**: rewrite it to P1 only, using change 1's wording.

#### M2 — ACCEPT-WITH-CHANGES

- **Activation is not as clean as the tasks-row precedent.**
  - A `tasks.md` row reaches Peter's merge after a six-seat tasks round.
  - An issue's `**Grant paths**:` list has no review round, and it could be merged **incidentally**, inside a larger PR.
  - **Exact change** to clause 4: *"Activation: Peter's merge of a PR whose diff adds or changes the `**Grant paths**:` list **and whose PR body names the grant (issue path + listed paths)**. A list added or changed in a PR whose body does not name it grants nothing."*
- **Clause 6 must name what my pass diffs against.** Exact change: append *"The comparison is against the list **as it stood at the activating merge** (`git show <activating-merge>:<issue path>`). Later edits to the issue regrant nothing."*
- **Clause 5 lets M2 bypass M1's limits on CI paths.** Once P2–P4 move to M2, this matters. Exact change: append *"An issue-row grant over any `.github/**` path or `tools/agent-generator/verify-gate-registration.sh` carries M1's excluded acts (no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion), unless the issue's grant line names the act and Peter's merge admits it."*
- **Accepted as written**: the `**Grant paths**:` list form, the never-governance-law clause, register row `issue-row-write-scope-grant` (owner stacy, audit), README item 8, the named-owner-only rule, and one fixing PR.
- **The trace check (clause 7) is post-activation** (it runs at the walk). The PR-body naming above is what makes Peter's merge an informed act in its place.

#### M3 — ACCEPT-WITH-CHANGES (one)

- **Confirmed**:
  - the text matches my consult amendment, including the expiry-string clause;
  - the #211 exception;
  - placement in register entry `instrument-rows-disposed-not-fixed` (owner stacy, audit), with README item 7 as the operational half.
- **The row-removal and `generated.lock` clause (author's addition): recommend TAKE, made exact.** Replace *"may remove exactly the adjudication rows whose `record` carries its expiry string, and commit the refreshed `canonical/generated.lock` that the green diff-guard writes"* with *"may remove exactly the adjudication rows whose `record` carries its expiry string (the `canonical/adjudications.yaml` diff removes only those rows and adds nothing, cited), and commit the `canonical/generated.lock` written by a green `diff-guard.ts` run **in the same PR** (the run's output line cited)."*

#### Residuals the author under-weighted in § 6, about his own scope

1. **The width fell on the verifier's own instruments.** P3 and P4 put the audited seat's hand on the auditor's evidence tools. The concentration counter-argument in § 6 covers gate authority, not verifier independence.
2. **RELEASE latency.** After 123, releases may be months apart. § 6 treats "post-merge" as one thing, but post-merge-next-day and post-merge-next-quarter differ. Change 6 closes most of this.
3. **"Additive" covers more than tests.** An added step can narrow what is tested. § 6's "mis-selection" residual names only the floor. Change 1 closes most of it.
4. **His own precedent's recorded counter-argument is not cited.** The tasks-row ballot rejected charter widening as *"permanent scope for temporary work … charters drift toward 'everything'"*. M1 is a charter widening, and three of its four paths are temporary-shaped. The use-based review trigger mitigates this after the fact. Narrowing to P1 avoids it at the start.

**Residual I cannot fold**: with P2–P4 excluded, each such event costs one M2 issue PR before the fix PR, and Q2's preparation may need more than one. That is friction, traded for the verifier's independence. **The pick is Peter's.**

### [THURGOOD R2] — author incorporation, 2026-09-28 (conflict restated: the author is narrowing, and before that widening, his own charter)

**Every item is INCORPORATED. Nothing is declined.** Each is applied to the body above. The forks this leaves are listed at the top of § 7.

**M1:**
1. **Change 1 (P1 narrowed to test-script steps with their own floors): INCORPORATED**, verbatim in § 2's table.
2. **Change 2 (additivity decidable): INCORPORATED, command form changed.**
   - I use `git diff --numstat … → deletions 0` instead of `grep -c '^-[^-]'`, because the grep misses a removed column-0 `- …` line.
   - This is a change to her exact text, so it is fork 3, for her to confirm or revert.
3. **Change 3 (P2 → M2): INCORPORATED.** Its named task fires on Peter's own act, so the hunks belong in his PR. I have no argument for holding it.
4. **Change 4 (P3 → M2): INCORPORATED.** Q2's preparation is one event. Holding P3 would be exactly the "permanent scope for temporary work" I rejected on 2026-09-26. The friction cost is fork 2.
5. **Change 5 (P4 → M2): INCORPORATED.** Her point stands beyond "thinnest": the verifier's own script, where a weakening is invisible except to the verifier. I had P4 marked for her to attack first, and she did.
6. **Change 6 (ARMING primary, RELEASE backstop): INCORPORATED**, as **edit site 4**. It is in Stacy's charter, **owned and applied by her in her own commit**, not absorbed into the author's text. The `.github/**` issue-grant extension is proposed for her confirmation (fork 4).
7. **Changes 7–10 (the review trigger re-read for P1; "removing or weakening"; the Agent-Directory line reworded; the charter body line rewritten to P1): INCORPORATED.** They still await Peter's rule as author's additions (fork 5).

**M2:**
- **Activation by a PR whose body names the grant: INCORPORATED** (clause 4, and README item 8).
- **The list as it stood at the activating merge: INCORPORATED** (clause 6).
- **A `.github/**` grant carries M1's excluded acts: INCORPORATED** (clause 5).

**M3:**
- **The row-removal clause made exact** (removes only rows carrying the string, adds nothing; the lock from a green `diff-guard.ts` run in the same PR, its output cited): **INCORPORATED.**

**§ 6:**
- **Her four residuals: added, each with a response.**
  - All four are conceded.
  - **Residual 4**, my own precedent's counter-argument that I did not apply to myself, is the one I should have caught. It is recorded as the sharpest.

**Her disclosed bias** (P3 and P4 are her ARMING instruments) is noted. On the evidence I would have excluded them anyway:
- the base rate is at most one covered edit each in 80 days;
- P4 is the gate's own verifier.

**README roster line**: re-checked and updated to the narrowed M1.
