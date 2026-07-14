# Ballot Measure: Prune the npm-test imperative restatements (U1-p, classification-map pilot row)

**Date**: 2026-07-14
**Author**: Thurgood (Civitas steward) / Spec 125-B Task 2 (U1-p, "The Prune PR")
**Status**: **RATIFIED (Peter, 2026-07-14)** — ratified in-session upon presentation of the full evidence chain
(register row → probe → trial verdict + pre-committed consequence → re-verification), recorded and committed to the
U1-p PR branch BEFORE merge per the ballots README record-first protocol. The PR remains a governance-law change
(steering + governance docs), Peter-merged under the standing carve-out (Task-Completion-Protocol § "The Merge
Rule"); the merge applies the measure this record ratifies.
**Purpose**: Apply the ratified candidate prune diff (Task 1.4) that removes the "run `npm test` before marking a
task complete" rule's imperative *what*-restatements from steering/governance prose — now that the 125-A required
checks mechanically own that *what* — while leaving every teaching clause (lane selection, Jest-not-Vitest command
forms) untouched. Discharges Reqs 2.3–2.5 (Design C2).

---

## The Problem (why this rule is a prune candidate)

The classification-map pilot (125-B U1) picked the `npm-test-before-complete` register row as its single pilot rule:
*"run the full validation suite before marking a task complete."* Since 2026-07-10, the 125-A required-check set
(root functional lane + both sub-package suite lanes + full typecheck + `build:validate`) **mechanically** gates
every unit's merge — a red suite cannot merge. That check makes several *prose imperatives* in the always-loaded and
governance-echoed docs **imposters**: they restate, as an instruction an agent must remember to obey, a *what* a CI
gate now enforces regardless of whether the agent remembers. Per the classification methodology's two-blade test
(teach vs. restate-gate's-what; churn fit), Task 1.4 enumerated all four surfaces that carry this rule, scored each
clause, and produced a candidate prune diff touching two of them — never the education layer that explains lane
selection or Jest command forms, which no gate owns and which remains valuable regardless of the gate's existence.

**This is a deliberate, small, single-rule pilot** — not a bulk sweep. Its purpose is to calibrate the
teacher/imposter methodology itself (Req 8's observation window measures whether removing these imperatives degrades
agent behavior in the wild) before the same method is applied at scale (U1b, gated on the pilot's closeout verdict).

## Surfaces Enumerated + Assessed (Task 1.4 — full detail: `pilot-row-assessment.md`)

| # | Surface | Verdict |
|---|---------|---------|
| S1 | `.kiro/steering/start-up-tasks.md` | **ZERO prune clauses.** Its npm-test-adjacent content is entirely lane-selection + Jest-command-form *education* — no standalone "validate before completing" imperative exists here to begin with. (The task's originating "three surfaces" success-criterion phrasing predates this finding; reconciled — see completion doc.) |
| S2 | `.kiro/steering/Task-Completion-Protocol.md` | 3 imposter clauses (`:44`, `:45`'s ordering half, `:146`), 2 keeps (`:37` subtask instruction — no gate exists at subtask grain; `:149` descriptive tier summary — not an imperative) |
| S3 | `governance/Process-Development-Workflow.md` | 1 imposter clause (step 2's imperative frame + a duplicate copy of S1's lane-selection education, which is de-duplicated to a pointer, not deleted-as-teaching) |
| S4 | `.claude/agents/thurgood.md` (generated) | No separate edit — the only generated prompt embedding this ambient (1 of 16); regenerated from S3 by the 122 generator, verified below |

**Explicitly preserved throughout (C2/LINA clause-separation discipline):** the Jest-not-Vitest functional education
(command forms, wrong-command warnings, lane-selection decision tree — S1 §4–§5) is a **separately-classified rule**,
KEEP, provably untouched by this diff.

## The Edits (exact before → after, applied verbatim from `pilot-row-assessment.md` §3)

### `.kiro/steering/Task-Completion-Protocol.md`

**Hunk S2-1** (PARENT TASKS Implementation/Architecture, steps 1–2):
```diff
- 1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
- 2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes — the status change commits with the work and takes effect at merge
+ 1. [ ] Local validation: the unit PR's required checks run the full suite at the gate — validating locally first catches failures before they block the merge (test-command selection: Start Up Tasks)
+ 2. [ ] Mark parent task complete (use the `taskStatus` tool) — the status change commits with the work and takes effect at merge; a failing suite blocks that merge at the gate
```

**Hunk S2-2** (§ "Key Rules"):
```diff
- - **Implementation / Architecture tasks**: validation MUST pass before marking complete.
+ - **Implementation / Architecture tasks**: the unit's required checks enforce a green suite at merge — local validation before completion catches failures early.
```

### `governance/Process-Development-Workflow.md`

**Hunk S3-1** (§ "Task Completion Workflow" step 2 — replaces the imperative frame + the four duplicated lane
bullets + the lane-semantics blockquote with a single pointer to S1's canonical education, per the "REPLACE WITH
POINTER, not delete-as-teaching" call in the assessment):
```diff
- 2. **[MANUAL]** **Validate Implementation**: 
-    - For regular tasks: Run `npm test` (functional lanes only, timing-assertion-free; ~1 min warm)
-    - For parent tasks (default): Run `npm test` (comprehensive functional validation, ~1 min warm)
-    - For parent tasks modifying release tool: Run `npm run test:all` (~1 min — includes performance suites; the cost delta over `npm test` is seconds)
-    - For performance tasks: Run `npm run test:performance` AND `npm run test:performance:isolated` (seconds each; perf coverage is split across the two lanes — or run `npm run test:all`). Performance assertions are wall-clock-sensitive: run on an otherwise-idle machine
-    
-    > Lane semantics reworked 2026-07-03 (commit `29bba7de`; see Spec 125 design-outline addendum): default lanes are timing-assertion-free; performance coverage is split across `test:performance` + `test:performance:isolated`.
+ 2. **[MANUAL]** **Local validation**: the unit PR's required checks run the full functional suite at the gate; validating locally first catches failures before they block the merge. Test-command and lane selection (incl. the performance lanes and the 2026-07-03 lane-semantics note): Start Up Tasks §4–§5.
```

### `.kiro/steering/start-up-tasks.md`

**No hunks.** Zero imposter clauses found (see S1 verdict above); this is the record of that finding, not an
omission.

### `.claude/agents/thurgood.md`

**Regenerated, not hand-edited.** Running `npx tsx tools/agent-generator/generate.ts` after the S3-1 edit
propagated the identical rewrite into `thurgood.md`'s embedded copy of the Process-Development-Workflow ambient
(the only one of 16 generated prompts embedding this doc). No other generated prompt changed.

**Framing note (why rewrite, not delete):** every pruned imperative is rewritten to context/why rather than deleted
bare — the education layer keeps teaching *why* the gate exists and what local validation buys, while the
*instruction* the gate now mechanically owns comes out. This is exactly what the probe and trial (below) test: if a
pruned-arm agent's described/executed workflow stops validating locally, the imperative was load-bearing teaching
(and the classification tightens); if behavior holds, the imperative was a nag.

## Evidence Chain (Reqs 6–7 — attached, not re-litigated here)

1. **Register row**: `governance/classification-map.md § "npm-test-before-complete"` — boundary call (operational),
   verification (barrier, owner Thurgood, `check_state: armed`, citing the 125-A required-check set), and the
   education disposition recording the pilot-row split.
2. **Pre-merge A/B probe** (Task 1.7 — `completion/pilot/probe-evidence.md`): one real-recent-PR scenario
   (described-workflow grain), two arms (unpruned/pruned), three-leg substitution verification (worktree steering
   files, regenerated prompt, MCP-served output — all with positive controls). **Verdict: NO GROSS LOSS DETECTED**
   — R1–R3 identical PRESENT/PRESENT across arms; R4 structurally N/A at describe-grain in both arms.
3. **Cloned-agent behavioral trial** (Task 1.8 — `completion/pilot/trial-diff-table.md`): Spec 126
   (avatar-decorative-warn) as the battery task, executed (not described) by cloned Lina agents in both arms, paired
   ≤2 valid runs/arm after a documented run-1 void (cross-worktree stash interleaving, root-caused and fixed by
   serializing runs). Relevance gate PASSED (control R1 PRESENT both runs). **Verdict: NO-DIFFERENCE-DETECTED** on
   R1–R4 under the protocol's pre-committed N/A discipline — no valid transcript in either arm ever claimed
   completion without a prior green validation run, and none completed over an unresolved red. Pre-committed
   consequence (stated in the protocol before any run): *"NO-DIFFERENCE-DETECTED → proceed to the prune PR (the
   window remains the in-the-wild backstop)."*
4. **This session's independent re-verification** (U1-p application, on the live surfaces — not the disposable
   probe/trial worktrees): all four A2 patterns (`Run full validation (\`npm test\`)`; `validation MUST pass before
   marking complete`; `AFTER** validation passes`; `**Validate Implementation**`) → **ZERO hits** across
   `Task-Completion-Protocol.md`, `Process-Development-Workflow.md`, `start-up-tasks.md`, the regenerated
   `thurgood.md`, and the regenerated `CLAUDE.md`. Jest-not-Vitest education independently confirmed **intact**
   (start-up-tasks.md §4, untouched). Full `npm test` (377 suites / 8987 tests, green), `npx tsc --noEmit
   --skipLibCheck` (clean), `sweep-1-refs.ts` (PASS — 0 fail/0 info), and `diff-guard.ts` (`full-run-green`, expected
   `input-closure-changed` state) all re-run against the applied edits.

**What this evidence chain does NOT claim**: the probe and trial are early tiers, explicitly reported as "no
difference detected in bounded samples," not "prune proven safe." The **observation window** (Task 3.1, N=20
ordinary merged PRs, opens at this ballot's application/merge) is the in-the-wild backstop that actually adjudicates
whether removing these imperatives changes real agent behavior over time. The closeout (Task 3.2) records that
verdict and is itself a separate ballot gating U1b.

## Scope

- **In scope**: the three prose sites enumerated above (2 hand-edited steering/governance docs + 1 regenerated
  agent prompt), and this ballot's own record.
- **Out of scope**: the register row's `verification`/`check_state` (unchanged — the barrier was already `armed`
  2026-07-10, independent of this prune); any other rule in the classification map (this is a single-rule pilot,
  not a bulk sweep); U1b (full-corpus application) — explicitly gated on the pilot's closeout verdict, not this
  ballot.

## The Counter-Argument (recorded, not hidden)

**Against pruning at all, on the strength of two paired trial runs**: the trial's own R4 interpretive note is
explicit that a maximally strict run-indexed reading of the pre-committed criteria would call the result MIXED, not
NO-DIFFERENCE — the adopted N/A-discipline reading is a *faithful application* of the pre-committed protocol, not
the only defensible one. Two valid runs per arm on one battery task is a small sample; within-arm model variance is
real (the voluntary mutation-check behavior that drove R4 appeared once per arm, attributed to model variance, not
arm). A more conservative posture would hold the prune until the observation window's N=20 in-the-wild sample closes,
rather than applying it now and using the window as a backstop.

**Why proceed anyway**: the protocol pre-committed its consequence *before* any run — "NO-DIFFERENCE-DETECTED →
proceed to the prune PR" — precisely so that after-the-fact discomfort with a clean result doesn't retroactively
raise the bar. Both the probe and the trial cleared their pre-committed bars on every applicable criterion, with
transparent, non-hidden caveats about sample size and the N/A-discipline judgment call. The window (Task 3.1) exists
*because* the trial is deliberately not being treated as sufficient on its own — it is the designed backstop for
exactly the "small sample" objection above, not a redundant afterthought. Reverting is cheap (a single `git revert`
of this unit's squash-merge commit) if the window later surfaces a problem the trial missed — the asymmetry favors
proceeding-with-a-backstop over waiting.

## Revert Path

If the observation window (Task 3.1) or ordinary work surfaces regression attributable to this prune:
1. `git revert` the U1-p unit's squash-merge commit on `main` — restores all three edited surfaces (S2, S3) to their
   pre-prune text in one action; re-running the 122 generator regenerates `thurgood.md` back to its pre-prune form
   automatically (it is a derived output, not a separately hand-maintained one).
2. The register row's `education.disposition` and `history` are updated to record the revert, its trigger evidence,
   and the tightened imposter-test criteria (per the trial protocol's own stated consequence for a DIFFERENCE-DETECTED
   finding, applied retroactively via the window instead of the trial).
3. **The window itself is the detection mechanism** — Req 8's observed-PR sample (first-push failure rate,
   re-accretion scans, staleness events) is specifically designed to catch the failure mode a revert would respond
   to. No separate monitoring is proposed; the window IS the monitoring.

## Reviewers

Per the Spec-Feedback-Protocol and this spec's own review roster (125-B design/tasks rounds): **Ada** and **Lina**
were the standing 125-B reviewers; this ballot's content is Civitas-governance-law only (no token or component
content), so per the ballots README convention it is presented directly to **Peter** for ratification, consistent
with the two prior ballots in this directory. Stacy's process-quality lens was already exercised on the pilot's
overall design (design.md C2/C3 feedback rounds) rather than re-requested per-ballot.

## Application (record-first)

1. Peter ratifies → this ballot's `Status` is updated to `RATIFIED (Peter, <date>)` and **committed** on the U1-p
   branch before the PR merges (ballots README protocol; any applying agent verifies only the committed `RATIFIED`
   record, no other authority judgment).
2. The prune is **already staged** on branch `task/125-B-u1-p`: the three hunks applied, the 122 generator re-run
   (`thurgood.md` + its attribution sidecar regenerated), `Last Reviewed` bumped on both hand-edited docs, and all
   verification re-run (A2 zero-hits, Jest education intact, `npm test`, `tsc`, sweep-1, diff-guard). **The ratified
   merge of the U1-p PR is the application** — no separate apply step follows ratification.
3. Post-merge: trigger docs-MCP `rebuild_index` (`governance/Process-Development-Workflow.md` is MCP-served; must
   serve the pruned text). **The observation window (Task 3.1) opens at this merge** — Req 8's N=20-PR sample begins
   counting from here.
4. `governance/classification-map.md § "npm-test-before-complete"` gets a dated history line recording "prune
   applied via this ballot" (already staged on the branch, see the completion doc).

---

**Status: `DRAFT` — awaiting Peter's ratification.** This ballot is presented alongside the U1-p PR; per the
record-first protocol, ratification (Status update + commit) precedes merge, and the merge itself is the
application step.
