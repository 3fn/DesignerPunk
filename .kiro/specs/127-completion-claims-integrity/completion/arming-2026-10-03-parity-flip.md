# ARMING read: `completion-criteria-parity`, the required flip (#292)

**Event**: ARMING (the trigger-table row in `canonical/agents/stacy.md`). Two clauses fire at one merge:
- "a new barrier arms / the required-check set changes";
- the **fixing-PR merge of an issue-row grant over a `.github/**` path**. The activating-merge read (Event 1) was made at the fixture record, `arming-2026-10-03-parity-flip-fixtures.md` § "Event 1 of the grant", and passed.

**Register row**: `governance/classification-map.md` § "completion-criteria-parity" (owner Thurgood).
**PR**: #292, "completion-criteria-parity: flip to REQUIRED …". Head `dadd592a`, base `f41d4e0b`. Squash-merged by Peter as **`8bd4bb50`**, 2026-10-03T14:42:24Z.
**Grant**: `.kiro/issues/2026-10-03-completion-criteria-parity-flip.md`. Activated by #289 (`cb28f011`); it expired at this merge.
**Fixture specification**: `arming-2026-10-03-parity-flip-fixtures.md` (#291, `f41d4e0b`). Its § 4 lists what this read requires.
**Builder and runner of the bites**: Thurgood, on throwaway PR #290.
**Reader**: Stacy · **Date**: 2026-10-03 · **Read at**: `main` @ `8bd4bb50`, and the live branch-protection list after Peter's act.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **ARMED**. No finding.

- **Condition discharged.** The condition this seat set (fixture record § 4 item 9) was Peter's branch-protection act followed by `verify-gate-registration.sh` PASS at 19. Both are now met, and **this seat read them itself** (§ 4 item 9 below), not by relay.
- **Every other § 4 condition holds**, each on evidence this seat re-read from the API, the job logs, or git.
- **One known gap stays open: D-2.** It is recorded, routed and triggered (see "Known gap D-2"). Peter's ruling, "flip now and record the gap", makes it a recorded limit of the barrier, not a condition on arming.

## Scope

- **Population**:
  - one flip PR (#292);
  - one throwaway PR (#290), with 7 of 7 CI runs read;
  - the push run on `main` at `8bd4bb50`;
  - the live protection list.
- **The checks**: fixture record § 4 items 1–9, and the ARMING issue-row clause at the fixing PR (paths ⊆ the list at activation; `--numstat` deletions on CI paths are 0 unless the grant names the act).
- **The standing reads**: `audit:coverage-map`, `verify-gate-registration.sh`, and `completion-criteria-parity` dormancy.

## Findings

None.

## Method: the § 4 conditions, each with its reading

| § 4 | Condition | How verified (by this seat) | Result |
|---|---|---|---|
| 1 | Each CI fixture: PR, run/job id, head and merge SHA, check-run name, conclusion, verbatim RED and SUMMARY lines, merge-base notes = 0 | For each of jobs `111220455733`, `111220858112`, `111221185813`, `111221497993`, `111221763950`, `111222115228` and `111222390904`, `gh api …/check-runs/<job>` returns `name=completion-criteria-parity`, the predicted conclusion, and head SHAs `499b8784`, `ac550a5f`, `b8e6e0a5`, `3928ffcf`, `1d5f29f4`, `2aadae25` and `7aa7fcdf`. In the job logs (`…/actions/jobs/<job>/logs`): every `HEAD is now at` merge SHA matches Thurgood's table; every RED line and SUMMARY line matches the table verbatim (row 3: all five lines present); `cannot resolve merge base` count is **0** on all seven; `ratification record: 2026-09-19 (…)` is printed on all seven; the benign `fatal: … exists on disk` line appears once per run, and twice on row 5, as predicted | pass |
| 1 (isolation) | Each fixture is the control plus exactly one defect | `git diff --stat 499b8784 <commit>` for each commit on `refs/pull/290/head`: row 2 touches only 127's `task-3-completion.md` (−1); row 3 only synthetic docs 1–5; row 4 only the synthetic `tasks.md` (+1); row 5 only the new `zz-gate-bite-undeclared/tasks.md`; row 6 only `001-…/tasks.md` (1/1); C-close is **empty**. The merge base of every commit is `cb28f011`. Seven commits got seven runs, each keyed to its own head SHA, so no fixture ran only as an intermediate | pass |
| 2 | Both controls green, C-close SUMMARY = C-open | Both read `SUMMARY: parents evaluated 27, pass 27, fail 0; emissions 1; reds 0`, conclusion `success` | pass |
| 3 | #290 final state | `gh pr view 290`: `CLOSED`, `isDraft: true`, `mergedAt: null`, base `main` @ `cb28f011`, head `7aa7fcdf`, title `DO NOT MERGE — gate-bite: completion-criteria-parity (register row; Req 6.6)` | pass |
| 4 | Characterizations restated as the honest-reach line | The 2026-10-03 register line carries "WHAT THE GATE DOES NOT CATCH" (all five) and the FRAMING sentence. **K-status-nonmark was re-run independently by this seat** on a scratch `git archive 7aa7fcdf`, with exit codes captured: control `reds 0`, exit 0; Beta Status `Partial` with Evidence `` `npm test` → 3 failing `` gives `reds 0`, **exit 0**; the same row with `⚠️` gives `RED [EVIDENCE_NONCOMPLIANT] … is ⚠️ with no follow-up link`, `reds 1`, exit 1. The other four characterizations were **not** re-run here; they rest on Thurgood's local output | pass (4 of 5 are self-attested) |
| 5 | The flip in one recorded change | `git show 8bd4bb50`: `check_state: proposed → armed`; `checks[]` qualifier rewritten to "introduced non-required, REQUIRED from the 2026-10-03 flip"; the history line is **appended**, with the 2026-09-19 GATE-BITE OUTSTANDING line untouched, and it says the FIRST-INSTANCE note is now moot; `EXPECTED_CONTEXTS` gains `"completion-criteria-parity"` and `EXPECTED_COUNT=18 → 19`. **Log retention** (fixture record § 3): the squash commit message carries the PR body, so each run's RED and SUMMARY lines sit verbatim beside its URL **in the recorded change itself**, which outlives Actions log expiry | pass |
| 6 | No-change, bite base → flip | Over `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/`, `package.json` and the ballot, `git diff --stat cb28f011 8bd4bb50` and `git diff --stat f41d4e0b 8bd4bb50` are both **empty**. Workflow: `git diff -U0 … \| grep '^[+-][^+-]' \| grep -v '^[+-]\s*#'` gives **no output** from either base; the comment-stripped file is byte-identical at `cb28f011` and `8bd4bb50` (sha1 `04306439…`); the hunks are L4 and L8–13, inside the grant's L3–13. The `check:completion-criteria-parity` line in `package.json` and ballot L33 (`Ratified-machine: 2026-09-19`) are byte-equal at `cb28f011`, `f41d4e0b` and `8bd4bb50`. Between the two bite bases, `git diff --stat cb28f011 f41d4e0b` is **exactly one file**, this seat's fixture record. That file is not a `task-N-completion.md`, and C-close's SUMMARY equal to C-open's confirms the population did not move. **The allowance used**: a comment-only workflow diff, so no re-run is owed | pass |
| 7 | The flip PR's own run green, and the push run on `main` green | #292 head `dadd592a`: check-run `completion-criteria-parity` **success**, run `37130244974`, job `111223754715`. Log: `HEAD is now at 40cce184 Merge dadd592a… into f41d4e0b…`, `population: 155 tasks.md — 2 declared per-parent`, `SUMMARY: parents evaluated 21, pass 21, fail 0; emissions 0; reds 0`, merge-base notes 0. Push on `main` @ `8bd4bb50`: run `37130569057` (`Completion Criteria Parity`, event `push`, completed, **success**), job `111224679182`, with the same SUMMARY. **The head tree equals the squash tree** (`git diff --quiet dadd592a 8bd4bb50`). **The full scan is green on `main` at arming (DD1)**. All 21 parents on `main` pass, which agrees with C-open's base of 21 | pass |
| 8 | `fixtures.test.ts` green at the flip head | CI (#292 `lane-functional-root`, job `111223755254`): `PASS scripts/completion-claims/__tests__/fixtures.test.ts` appears in both `npm test` (390/390 suites, 9377 tests) and `test:scripts` (15/15, 309). CI aggregates the counts, so **the 6 / 154 figure is from a local run** at `8bd4bb50`: `npx jest scripts/completion-claims` gives `Test Suites: 6 passed, 6 total · Tests: 154 passed, 154 total`, equal to the count at `80bbc9fa` | pass |
| 9 | Grant extent at the fixing PR, plus Peter's act, plus PASS at 19 | Extent: see the next section. **Live protection list** (`gh api …/branches/main/protection/required_status_checks`): **19** contexts, including `completion-criteria-parity` bound to `app_id 15368` (GitHub Actions); `122-sweep-5-corrected-state` is absent. **`./tools/agent-generator/verify-gate-registration.sh`**, run by this seat: `registered contexts (19): …` → `PASS: all 19 required contexts present, count-asserted (N=19 recorded in this script)`, exit 0 | pass. **The condition is discharged** |

**Standing reads**:
- `npm run audit:coverage-map` at `8bd4bb50`: `PASS (surfaces PASS · lanes PASS)`; `required contexts : 19 (verify-gate-registration.sh EXPECTED_CONTEXTS) -> 20 job run(s) in 7 workflow(s)`; `npm run check:completion-criteria-parity <- completion-criteria-parity`; stale adjudications: (none).
- **Dormancy**: not dormant. It ran and passed on #292 and on the `main` push.

## Grant extent (Event 2: the fixing PR's merge)

- **Paths**: `git show --numstat 8bd4bb50` gives:
  - `7 7 .github/workflows/completion-criteria-parity.yml`
  - `1 1 canonical/generated.lock`
  - `3 2 governance/classification-map.md`
  - `6 1 tools/agent-generator/verify-gate-registration.sh`

  The three non-governance paths are exactly the grant list. `governance/classification-map.md` is the carve-out **named in the grant ahead of time** (clause 6), so it is not an out-of-list edit. **The list as it stood at activation** is unchanged: `git diff --stat cb28f011 8bd4bb50 -- .kiro/issues/` is empty.
- **Deletions on CI paths are non-zero, and each one is named by the grant**:
  - the workflow's 7 are the L3–13 header-comment rewrite ("rewritten to say the context is required"), and 0 non-comment lines changed;
  - `verify-gate-registration.sh`'s 1 is `EXPECTED_COUNT=18`, admitted act (b).
- **The lock's 1/1** is the `inputClosure` refresh the grant names. `122-diff-guard` is **success** on #292's head (job `111223836562`), so the refresh is genuine.
- **Admitted acts used**: (a) the new required context and (b) the count change. **No step, floor, trigger, job name, runner or execution assertion was removed or weakened.**

## Departures from the specification, with this seat's disposition

1. **Title renamed after run 1.** C-open ran under the earlier `[NEVER MERGE] …` title. **Accepted.** Never-merge was mechanical throughout through the draft state, and the title is marking, not evidence. No run's result depends on it.
2. **Ratification bite (row 7) dropped (D-1).** **Accepted.** This seat's record specified the drop as an orchestrator-routed decision. **Residual, restated**: the CLI's early-return path (`RED: cannot resolve ratification record …`) has **no CI-level red**. It keeps jest proof (`ratification-record-*`), and all seven runs printing `ratification record: 2026-09-19` proves the CI read resolves.
3. **Two bite bases** (`cb28f011` for runs 1–5, `f41d4e0b` for runs 6 and 8). **Accepted.** Verified at § 4 item 6: the only file between the bases is this seat's fixture record, outside the checker's evaluated set, and C-close equals C-open.
4. **Exit codes inferred from SUMMARY lines.** **Accepted.**
   - For the CI rows, the check-run **conclusion**, read from the API, is the exit-code outcome. The source confirms the mapping: `return reds > 0 ? 1 : 0` → `process.exit(main())`.
   - For the local characterizations, the inference holds by the same line.
   - The one characterization that matters (the D-2 gap) was re-run here with the exit code captured.

Both post-grant allowances were used as given:
- the comment-only workflow diff: no re-run;
- the `122-sweep-5` residue: moot, because it is not on the live list.

## Known gap D-2 (restated; a recorded limit, not a condition)

- **What**: Status marks are not enforced. Any Status text other than the em-dash counts as claiming, so a row marked `Partial`, `Done` or `N/A`, with evidence and no follow-up link, **passes**. `⚠️` with no link is red. This seat confirmed both halves at `7aa7fcdf` (§ 4 item 4).
- **Ruling**: Peter, 2026-10-03, "flip now and record the gap".
- **Route**: Thurgood, the instrument owner. A checker fix with its own jest fixture, under a follow-up issue to be filed after this merge. **At this read the issue is not yet filed**: there is no file under `.kiro/issues/` at `8bd4bb50` and no open PR. It is step 4 of #292's "After merge" list, so it is owed, not late.
- **Trigger**: before the next RELEASE claims pass, or the first completion doc observed with a non-closed Status, whichever comes first.
  - **The RELEASE trigger is this seat's**, so the next RELEASE pass reads whether D-2 is resolved.
  - **Until it is resolved, every claims pass treats non-closed Status values as a judgment surface**. It counts them in the population and reads each as a possible unmet criterion. This is not a new duty: it is the pass's existing promised/claimed/shipped reading, pointed at a surface the gate has been shown not to reach.
- **Lows routed to the same issue**:
  - silent-green when the merge base cannot be resolved, or when the authorship lookup fails (runs 6 and 5 are the CI evidence that neither happens today);
  - the benign `fatal:` stderr;
  - the population-line and `pass` over-counts.

## Could not verify

- **When Peter's protection act happened.** This seat sees only the current state of the list, not when it changed.
- **Four of the five characterizations** (K-reorder, K-exempt-verbatim, K-untick, K-misnamed) rest on Thurgood's local output and were not re-run here. They are characterizations of reach, not bite evidence.
- **#290's draft state during the runs.** Only the final state is readable.

## Standards implications

To Thurgood on the EDUCATION route. None is a finding.

1. **The Req 6.4 / 6.6 citation.**
   - The flip line cites **Req 6.6** correctly and records the correction, verified against `requirements.md` L137 (AC 4, the verdict surface) and L139 (AC 6, the gate-bite).
   - **Still citing 6.4**: the 2026-09-19 register line (append-only, correctly left as written) and **design § Testing Strategy** (`design.md` L217).
   - Whether design.md takes a dated erratum is the author's call.
2. **The singular "deliberately defective completion doc" reading** (the 2026-10-02 sitting line and Req 6.6's #121 pattern).
   - **The bite discharges the requirement under either reading.** Rows 2 and 3 are deliberately defective completion docs, which satisfies the literal reading. Rows 4–6 add the `tasks.md`, authorship-dating and diff-scoped paths.
   - **The silent-green modes that only rows 5 and 6 reach are invisible to a one-doc bite.** So the singular wording understates what a gate-bite has to prove for a checker with more than one exit path. Whether the bite standard for future checkers should name exit-path coverage is Thurgood's to decide as its author. This seat does not draft that text.
3. **F7's closing condition is now met.** `.kiro/issues/archive/2026-09-12-spec-112-completion-claims-audit.md` § F7: "F7 closes when the law ballot has ratified **AND** the `completion-criteria-parity` checker has armed". Both are now true.
   - **Caution**: D-2 is **F7's own shape**, an unmet criterion that is not marked failed, reached by a non-closed Status spelling. So a closure annotation that does not cite D-2 would over-claim what the arming closed.
   - The annotation is for the issue's maintainer. This seat's write scope does not reach `.kiro/issues/**`.
4. **Observation, out of this read's scope**: on the live protection list, the nine `122-*` contexts carry `app_id: null`, so any status source satisfies them. `completion-criteria-parity` is pinned to GitHub Actions (`15368`). This predates the flip and is noted only so it is not mistaken for a flip effect.

**Framing, binding every reader**: a green `completion-criteria-parity` gate is **not** evidence of claim honesty. Arming removes nothing from the claims-pass audit duty.
