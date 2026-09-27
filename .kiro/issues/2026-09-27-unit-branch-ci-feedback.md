# Issue spec: unit branches get no CI feedback until the unit PR opens — the unit-branch CI-feedback package

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Thurgood (design; the standard in (c); the ballot). **Implementation**: the orchestrator, under the scoped grant in § "Grant". **Peter merges** (governance carve-out: the PR touches `.kiro/steering/**`, `governance/**` and `.kiro/docs/ballots/**`).
**Trigger**: **before any Spec 123 U2 execution starts** — concretely, PR-1 (below) merges before the first commit on `task/123-u2a-g1`. PR-2 may follow, and merges before the first commit on `task/123-u2b-profile` at the latest.
**Source**: Peter's ruling, 2026-09-27: he backs the CI-prevention plan and split Spec 123's U2 at the G1 gate (`.kiro/specs/123-consumer-distribution/tasks.md` § "Declared Merge Units", amendment 2026-09-27). The package combines the steward's consult and Stacy's consult, as relayed by the orchestrator.

---

## The gap

1. **No required check runs on a unit branch before its PR opens.**
   - The law says so: `.kiro/steering/Task-Completion-Protocol.md` (TCP) states "No PR opens and no required checks fire until unit completion" (§ "The Sequence by Task Scope", subtask item 4; § "Completion State in the PR Flow", point 2).
   - The workflows enforce it: every required workflow triggers on `pull_request` (some also on `push` to `main`), so pushes to `task/**` branches run nothing.
   - **Evidence**: Spec 123 U1 ran nine parents over ~2 days with no CI signal until its PR opened (#215, merged as `d566b30f`). Every parent's "validation green" claim in that window rested on local runs alone.
2. **The PR-open event can be dropped.** PR #194 was opened while GitHub was still computing mergeability (`UNKNOWN`); the `pull_request` event was dropped and **zero workflows ran**. Polling mergeability un-wedged it, and an empty commit re-triggers the checks. It is the same class as #148. *Source: the orchestrator's session memory, not a committed repo record — cited as such.*
3. **Some required lane commands exist only in YAML**, so "run what CI runs" cannot be done by name locally (inventory below). `tests/mcp-boot-smoke.test.ts` is the named example.

## Required-check inventory (as read on `main` at `d566b30f`)

18 required contexts across 6 workflows (`tools/agent-generator/verify-gate-registration.sh`, `EXPECTED_COUNT=18`):

- **`consumer-guard.yml`** → `Consumer Guard`
  - Triggers: PR, push to `main`; **no `workflow_dispatch`**.
  - Inline commands: `npx jest --testPathPatterns='DynamicImportGuard' …`; `npx jest --roots='<rootDir>/tests' --testMatch='**/mcp-boot-smoke.test.ts' …`; the same form for `browser-boot-smoke.test.ts`.
- **`tool-boot-smoke.yml`** → `125B-tool-boot-smoke`
  - Triggers: PR, push to `main`; **no `workflow_dispatch`**.
  - Inline commands: the sub-package builds; `npx jest --roots='<rootDir>/tests' --testMatch='**/tool-boot-smoke.test.ts' …`.
- **`section-citations.yml`** → `Section Citation Guard`
  - Triggers: PR, push to `main`; **no `workflow_dispatch`**.
  - Inline commands: none (`npm run check:section-citations`).
- **`agent-generator.yml`** → nine `122-*` contexts (matrix `name: ${{ matrix.context }}`)
  - Triggers: PR; **no `workflow_dispatch`**.
  - Inline commands: `npx tsx tools/agent-generator/sweeps/noop-probe.ts`, plus nine matrix `cmd:` values (`npx tsx tools/agent-generator/diff-guard.ts`, …).
- **`package-name-drift.yml`** → `Check package name drift`
  - Triggers: PR, push to `main`, **`workflow_dispatch` (present — line 18, since `5c72c03a`, Spec 101 Task 1.8)**. *(Erratum 2026-09-27, Stacy R1 E1: this line first said "no `workflow_dispatch`" — wrong; the steward's grep read only six lines past `on:`.)* Today a dispatch of it reports under its **required** name; a2's rename covers it.
  - Inline command: `node scripts/check-package-name-drift.js`. The script `check:drift` already exists and is not used.
- **`lane-timing.yml`** → `lane-typecheck`, `lane-build-validate`, `lane-functional-root`, `lane-mcp-server-suite`, `lane-application-mcp-server-suite`
  - Triggers: PR, **`workflow_dispatch` (present)**.
  - Inline commands: `npx tsc --noEmit`, plus the selection-floor guard shells.
- **`completion-criteria-parity.yml`** — **not required** (the required flip is Q2's, guarded). It **stays on `pull_request` (+ push to `main`) only**, with no dispatch, per the steward's consult: its verdict is about a completion doc against its `tasks.md`, which is meaningful at the unit PR, and dispatching it would invite reading an advisory green as a gate.

~~**Correction to the relayed package**: it named four workflows lacking dispatch. There are **five** — `package-name-drift.yml` (a required context) also lacks it. The package covers all five.~~ *(Erratum 2026-09-27, Stacy R1 E1: the relayed package was right — **four** required workflows lack `workflow_dispatch`: consumer-guard, tool-boot-smoke, section-citations and agent-generator. `package-name-drift.yml` already has it. The "correction" is withdrawn. a2's rename still applies to all six required workflows, so the law text is unaffected.)*

---

## The package

### (a) Dispatch the required workflows against the unit branch

- **a1.** Add `workflow_dispatch:` to the **four** required workflows that lack it: consumer-guard, tool-boot-smoke, section-citations and agent-generator. *(Erratum 2026-09-27, Stacy R1 E1: this said five and included package-name-drift, which already has it.)*
- **a2. Dispatched runs report under context names distinct from the required contexts** (steward addition). For example, a job's `name:` becomes `${{ github.event_name == 'workflow_dispatch' && format('{0} (unit-branch)', '<required name>') || '<required name>' }}`; the matrix form is the same over `matrix.context`. **This applies to `lane-timing.yml` too**, which already has dispatch and today would report under the required names.
  - **Why**: required contexts match by name on a commit. A dispatched run tests the **branch head**, not the PR's **merge ref**, and must never be able to stand in for the gate. Whether a dispatch-event check run with a required name satisfies or shadows the PR's run is **unverified in this repo**; renaming makes the question moot.
  - **Verify in the implementing PR** by one real dispatch per workflow, citing the reported context names. *(Erratum 2026-09-27: `workflow_dispatch` can only be triggered once the workflow file carrying it is on the default branch, so this verification cannot run on the PR-1 branch. It runs immediately after PR-1 merges, before U2a's first work commit; the plan is ballot B-CI § 6.)*
  - **Also verify** that `noop-probe.ts` behaves identically under dispatch. On the steward's read it computes in-tree hashes and uses no PR base, but that is a read, not a run.
- **a3. `complete-task.sh` unit-member mode** (a parent completing inside a multi-parent unit), after its push, runs `gh workflow run <wf> --ref <unit-branch>` **for every required workflow** (the six files above). It then resolves each run's URL (`gh run list --workflow <wf> --branch <unit-branch> --event workflow_dispatch --limit 1`) and **prints the URLs**.
  - It is non-blocking: the script does not wait for results. The agent reads them before the next parent's completion claim — see (c).
  - The workflow list lives in **one** array in the script, **count-asserted** (six) against the workflows that produce `verify-gate-registration.sh`'s 18 contexts. It is a multi-homed copy set (standards package S-6); the two lists move together.
  - The help text and header comments at `complete-task.sh:31` and `:104` change with (e).
- **a4. Parent mode (the mode that opens the PR) — FORK F-A for Peter.**
  - **Relayed package**: parent mode dispatches as well.
  - **Steward refinement (recommended)**: in parent mode, the PR's own `pull_request` event runs the gate, so dispatching as well duplicates every run. What parent mode lacks is **detection of the #194 class**. It gains a **zero-runs detector**: after `gh pr create` (or re-reporting an existing PR), poll the PR head's check runs for up to a bounded window (~3 min). On zero, print a loud warning with the remedy — poll mergeability (`gh pr view --json mergeable`), then `git commit --allow-empty -m "ci: re-trigger" && git push`.
  - It **prints the remedy and does not auto-push**, since an automatic commit on the branch is an action the agent should see.
  - *Counter, surviving*: the detector cannot distinguish a slow queue from a dropped event inside its window, so a false alarm is possible on a busy runner.
  - **F-A RULED (Peter, 2026-09-27): the zero-runs detector, not a second dispatch.** It **fails loudly**: on zero runs after the window, the script prints the PR URL, the #148/#194 diagnosis and the remedy, then **exits non-zero**, so the completion step visibly did not finish. It still never auto-pushes.
- **Subtask mode is unchanged** (no dispatch by default). An opt-in `--ci` flag is **optional**, not proposed: subtask commits are judgment-based checkpoints, and a mid-parent state is expected to be red. *(2026-09-27: the coordinator's brief for ballot B-CI has dispatch firing at subtask checkpoints too. B-CI drafts that as its primary text, with a `--no-ci` opt-out for knowingly-red checkpoints, and carries this line's parent-only design as the alternative text. **Peter picks at ratification** (B-CI § 3, fork M1-a/M1-b); until then this line stands.)* *(Erratum 2026-09-27, Stacy R1 E2: the fork is at B-CI **§ 2.1**, not § 3.)* ***(Ruling 2026-09-27: Peter picked M1-b. Subtask checkpoints made with the completion tooling dispatch the required workflows, with a `--no-ci` opt-out, and TCP point 2 sends checkpoints through the tooling rather than plain git (Stacy R1 C6). Once B-CI ratifies, this line is superseded; until then it stands as the merged record.)***

### (b) Every required lane's test command becomes a named npm script, and the workflows call it

Proposed names (the implementing PR may adjust them; each must be one name, called by the workflow):

| Today (inline) | Script |
|---|---|
| `npx jest --testPathPatterns='DynamicImportGuard' --no-coverage --runInBand` | `test:guard:dynamic-import` |
| `npx jest --roots='<rootDir>/tests' --testMatch='**/mcp-boot-smoke.test.ts' …` | `test:smoke:mcp-boot` |
| `npx jest --roots='<rootDir>/tests' --testMatch='**/browser-boot-smoke.test.ts' …` | `test:smoke:browser-boot` |
| `npx jest --roots='<rootDir>/tests' --testMatch='**/tool-boot-smoke.test.ts' …` | `test:smoke:tool-boot` |
| `node scripts/check-package-name-drift.js` | the existing `check:drift` |
| `npx tsc --noEmit` (lane-typecheck) | `typecheck` |
| the nine `122-*` matrix commands + the noop probe | `check:122:<context-suffix>` ×9 + `check:122:noop-probe` |

- **Scope line**: the did-it-really-run guards (selection floors, execution assertions) may stay inline. They guard the CI run itself and have no local meaning.
- **Recommended, not required**: an aggregate `ci:local` that runs every required lane's scripts, with prerequisites, in lane order. Then "local validation" and "the gate" name the same commands.
- **Adjacent issue whose trigger this fires**: `.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md` triggers "at the next CI-workflow touch" — **PR-1 is that touch**. The recommendation is to fold `npm run test:scripts` in as a step of an existing required lane: that is no registration change and no settings action. If it is not folded in, record the deferral in that issue in the same PR.

### (c) The completion-doc standard: a "validation green" claim cites CI

*(2026-09-27: the draft below is **superseded by ballot B-CI § 4**, rebuilt after Stacy R1 C1–C5 into a declared `**CI-provenance**:` line — local / branch-head dispatch / PR gate — with a mechanical trigger, a two-command docs-only rule, a `main`-pinned in-force anchor, and a pointer to her charter in place of any restatement of her vocabulary. The draft stays below as the record; the ballot carries the text.)*

Authored by the steward (what a completion doc must *contain* — the Q5 cut). It lands in `governance/completion-documentation-guide.md` by record-first amendment (ballot B-CI, M2). **Draft text; the ballot carries the final wording:**

- **Scope**: any completion-doc statement that **the gate is green** — "validation green", "CI green", "full suite green", "required checks pass", or equivalent — **SHALL cite CI runs**.
  - Local runs remain citable, **labelled `local`**, with command, result and SHA. A local run is never evidence for a gate-green statement.
- **Content**: the cited runs are at one named SHA `S`, and **every required context** (the `verify-gate-registration.sh` set — 18 at drafting) is green at `S`. Each run URL is listed; for a gating parent, the PR's checks page at `S` suffices.
- **"The doc's SHA", defined decidably**: a doc cannot cite a run on its own commit, because the run follows the commit. So the claim binds to the last code state `S`.
  - **Compliant iff `git diff --name-only S..<the doc's commit>` lists only completion docs, summary docs and the `tasks.md` checkbox lines.**
  - This is decidable without consulting the author (boundary bound 1).
- **Partial states**: if any required context is red or missing at `S`, the doc SHALL NOT state the gate is green. It states which contexts ran and their results, verbatim.
- **Effective date**: parent completion docs authored after ratification. **Not retroactive**: Spec 123 U1's docs are untouched. It is its own non-retroactivity clause, not the 127 in-flight exemption string.
- **What the standard does not say**: how a claims pass records a missing citation.
  - Stacy's consult states that her passes record it as **`not re-verified`**. That is **her** verdict vocabulary, recorded here as her stated practice, **not legislated by this standard** (Q5: she may say a criterion is unverifiable; the steward does not write her verdicts).
- **Notification duty** (boundary bound 2): on ratification, the steward sends Stacy the before→after text and the effective date — a notification, not a permission request.
- **Mechanical enforcement**: none in this package. A `completion-criteria-parity` check for the citation's presence is a later candidate, after one spec has used the standard. The instrument is advisory and Q2-gated in any case.

### (d) `audit:coverage-map` compares required-check steps against local lane roots

- **What it adds** (after (b), when the steps are named scripts): a section listing
  - (i) every script a required job runs that no local lane reaches;
  - (ii) every local test root/config (`jest.functional.config.js`, `scripts/jest.config.js`, `tools/agent-generator/jest.config.js`, the sub-package suites) that **no required step exercises**.
- **Rows** are visible, never silently unlisted, like the existing blank-row rule, and adjudicable in `canonical/adjudications.yaml` under their own `sweep:` key.
- **The first known hit is `scripts/**`** (the `test:scripts` issue above). The check would have found it mechanically.
- **Stacy is consulted on the output shape**: `audit:coverage-map` is her audit command (122 C12). **Depends on (b).**
- **Collision rule**: this edits `tools/agent-generator/coverage-map.ts`. It merges **before U2b's first commit or after U2b merges, never while U2b is open**, because U2b's 13.6 runs the same command for its rows-list-the-guard evidence.

### (e) The TCP amendment (record-first)

Ballot B-CI, M1. **Before → after, draft:**

- **TCP § "The Sequence by Task Scope", subtask item 4, and § "Completion State in the PR Flow", point 2**:
  - **Before**: "No PR opens and no required checks fire until unit completion."
  - **After**: "No PR opens until unit completion. A parent completing inside a multi-parent unit **dispatches the required workflows against the unit branch** (`complete-task.sh` unit-member mode) and reports the run URLs. Those runs are **feedback, not the gate**: they report under non-required context names and test the branch head, not the merge ref. The gate runs on the unit PR."
- **TCP point 2, "Hook ergonomics"**: the unit-member clause gains "…commits the completion docs on the branch, pushes, and dispatches the required workflows (no PR)".
- **Stragglers, swept by grep for `required checks fire`** at drafting: `.kiro/hooks/README.md:36` and `.kiro/hooks/complete-task.sh:31, :104` (tooling docs, edited with a3), plus TCP's two sites. **The application ends with the same grep → 0**, not trust in this list.
- ~~**Regeneration**: TCP is an identity doc reaching Claude Code agents through the generated `CLAUDE.md`. Regenerate per the Spec 122 pipeline; 122 diff-guard green.~~ *(Erratum 2026-09-27, Stacy R1 E3: **no regeneration is needed.** The generated `CLAUDE.md` `@`-includes TCP rather than embedding it, and no canonical agent prompt carries the amended sentences (grep at drafting, confirmed by Stacy). This matches ballot B-CI § 2.)*

---

## Vehicles, grant and sequencing

**Ballot B-CI** — `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` (filename as drafted, 2026-09-27; DRAFT), plus its `README.md` entry:
- Two measures: **M1** (e) and **M2** (c). Authored by the steward; **Stacy is the required reviewer** (M2 changes what her passes read).
- **Record-first**: ratified-in-record as **PR-1's first commit**, before any law edit applies (the 127 U1 / B-U1 precedent). The ballot states whether a `governance/classification-map.md` row is owed.
- **A checks-only merge is not ratification.**

**Grant** (Peter's ruling, 2026-09-27: the orchestrator implements; this file is the record of its extent). **Extent — exactly these paths**, until PR-2 merges:
- `.github/workflows/{consumer-guard,tool-boot-smoke,section-citations,agent-generator,package-name-drift,lane-timing}.yml`;
- `.kiro/hooks/complete-task.sh` and `.kiro/hooks/README.md`;
- `package.json` (the `scripts` block only);
- `tools/agent-generator/coverage-map.ts` and its tests, plus `canonical/coverage-map.yaml` / `canonical/coverage-manifest.yaml` as regenerated (PR-2);
- `.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md` (fold-in or deferral record);
- `.kiro/steering/Task-Completion-Protocol.md` and `governance/completion-documentation-guide.md` — **only the ratified ballot's exact before→after edits** (application, not authorship);
- the regenerated `CLAUDE.md` / agent outputs.

*(2026-09-27: the orchestrator proposes moving this implementation grant to **Thurgood**, as CI-regime owner, through ballot B-CI § 5 (`.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md`, DRAFT). If B-CI ratifies, its § 5 supersedes the list above; until then the list above stands as written.)* ***(Ruling 2026-09-27: Peter took N1 + N2 + N3 + C7a. B-CI § 5 now covers PR-2's item (d) as well — `coverage-map.ts`, its test and the regenerated maps — so the supersession strands nothing (Stacy R1 C7a). It is still pending ratification.)***

The grant confers no ratification authority. **Branch-protection and required-context settings are Peter's actions** and none is proposed: a2 keeps the required set at 18.

**PR-1 — must merge before U2a's first commit** (Peter-merged, governance carve-out):
1. B-CI ratified-in-record (first commit).
2. (a) a1–a3, and a4 as ruled (F-A: the zero-runs detector).
3. (b) — it touches the same workflow files as (a), so one edit pass and one reviewable diff. Named scripts also make a dispatched failure reproducible locally.
4. (e) applied, so the law never contradicts the tooling at U2a's first unit-member completion.
5. (c) applied, so U2a's parent docs are the first written under it.
6. The `test:scripts` fold-in, or its recorded deferral.

**PR-1 validation**:
- one dispatch per workflow, run URLs cited, context names observed distinct — **after PR-1 merges, not on its branch** (erratum 2026-09-27; see a2 and B-CI § 6);
- `verify-gate-registration.sh` green (the count stays 18);
- the straggler grep returns 0;
- 122 diff-guard green (no regeneration is involved — erratum E3 above).

**PR-2 — may follow; merges before U2b's first commit at the latest**: (d), with Stacy's output-shape consult.

**Also before U2a's first commit, and not part of this package**: the Spec 123 amendment PR that declares U2a/U2b (`chore/123-u2-split-and-ci-prevention-spec`, which also files this issue).

---

**Known straggler, outside every grant**: `tools/agent-generator/verify-gate-registration.sh`'s header says the PAT "cannot dispatch workflows — 403". That is stale since the Actions:write grant of 2026-07-10 (`inbound-to-125-B-from-125-A.md` §5). The steward fixes it at the next touch of that file (Stacy R1, minor).

## Residuals — not closed by this package

- **Branch head ≠ merge ref.** Dispatched runs test the unit branch's head; the gate tests `refs/pull/<n>/merge`. A unit that is green on dispatch can go red at the gate if `main` moved.
  - **Only option 2 closes this**: open a **draft PR at the unit's first push**, so `pull_request` runs every push against the merge ref.
  - Option 2 needs **its own ballot**: TCP's "no PR opens until unit completion" and the PR-open-is-submission semantics both change (a draft would have to be defined as not-a-submission). It is not in B-CI.
  - **FORK F-B for Peter**: take (a) now (the recommendation — no change to PR semantics), or go straight to option 2's ballot instead. *Counter, surviving*: option 2 is the stronger fix, and (a) is partly scaffolding that option 2 would retire.
  - **F-B RULED (Peter, 2026-09-27): take the dispatch package now.** The option-2 (early draft PR) ballot is drafted **only if the merge-ref residual actually bites**. **Its trigger**: a unit PR whose required checks fail at the merge ref, when the unit-branch dispatch runs at the same head SHA were green, and the failure is attributable to `main` having moved. The claims passes and the steward's health-check walk watch for it.
- **The gaps between parents.** Dispatch fires at parent completions, so work between completions (subtask checkpoints) gets no CI unless the optional `--ci` flag exists and is used.
  - The final parent's gap is closed by the PR itself.
  - U2a has three parents, so its interior gaps are two parent-lengths.
- **Dispatched runs block nothing.** A red dispatch is feedback that depends on the agent reading it. **(c) is what gives it teeth**: a gate-green claim needs cited green runs.
- **The #194 class is reduced, not eliminated.** The detector (a4) notices a dropped event; it does not prevent one.
- **Cost**: CI minutes grow by roughly (parents − 1) × 6 workflow runs per multi-parent unit. Measure at U2a's merge (runs dispatched vs. runs read) before assuming it is worth it for U3–U5.
- **Overlap with the split**: the U2 split alone shortens the no-CI window, and U2a is three parents. The package's value scales with multi-parent units — U2b (six), U3 (four), U5 (four). *This is the surviving counter-argument to the whole package: part of its benefit is already bought by the split.*

## Closing

When PR-1 and PR-2 have merged, and the U2a claims read confirms the dispatch URLs were cited: record the outcome in this file (dated) and `git mv` it to `archive/`, per `.kiro/issues/README.md` rule 5.

## Filed by

Thurgood (Civitas steward), 2026-09-27, at Peter's direction, relayed by the orchestrator. It rides the Spec 123 U2-split amendment PR.
