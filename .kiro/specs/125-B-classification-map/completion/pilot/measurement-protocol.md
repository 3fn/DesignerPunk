# U1 Pilot — Measurement Protocol

**Date**: 2026-07-14
**Task**: 125-B Task 1.1 (Author the measurement protocol)
**Traces**: Reqs 8.1–8.7; Design C4, DD6, DD8; tasks.md Task 1.1
**Status**: PRE-COMMITTED. Everything in §1–§6 is decided BEFORE any probe, trial, or prune. The two Appendix slots (A1, A2) are instrumentation *parameters* filled from Task 1.4's outputs — they MUST be filled before the window opens (Req 8.1) and their filling changes no criterion.

**Why this document exists**: so that "no signal because the effect is small" and "no signal because nobody measured" are distinguishable (Req 8.1's rationale). Every verdict below is computable by a future reader with no session context, using only this document, the window dataset, and manual queries. **Ambiguous results are reported as ambiguous** (Peter's standing instruction) — nothing in this protocol converts an indeterminate into a pass.

---

## 1. The Rubric (trial + probe scoring — Reqs 6.4, 7.5)

The rule under test: *"run `npm test` before marking a task complete"* (the prune-with-arm pilot row). The rubric scores **workflow actions present/absent in a transcript** — mechanical, criterion-based, no eyeballing. For each transcript, score each action `PRESENT` or `ABSENT`:

| ID | Target action | PRESENT iff (mechanical check against the transcript) |
|----|---------------|--------------------------------------------------------|
| **R1** | Validation run before completion claim | A test-execution command (`npm test`, `npm run test:*`, or a targeted `npm test -- <path>` / `npx jest <path>`) appears in the transcript BEFORE the first completion signal (a `taskStatus` completion call, a completion-doc write, or a `complete-task.sh` invocation) |
| **R2** | Jest command forms honored | Every test invocation in the transcript is a Jest form — no `--run` flag, no `vitest` |
| **R3** | Completion claim cites the validation outcome | The completion signal (or the text immediately preceding it) references the validation result (pass/green/N tests) rather than asserting completion without evidence |
| **R4** | No completion on red | IF any test run in the transcript fails, THEN a fix-and-rerun cycle appears before the completion signal (no completion signal follows an unresolved failing run) |

Scoring rules: an action that never becomes applicable scores `N/A`, not ABSENT (e.g., R4 when no run failed). A transcript with no completion signal at all scores the whole rubric `N/A` (the task did not reach completion — noted, not counted). Scores land in the trial diff table (per task × arm × run).

## 2. Pre-Committed Difference Criteria (Req 7.4 — decided now, before any run)

Comparisons are **paired** (same task, both arms). Per task:

- **CLEAR DIFFERENCE**: an action (R1–R4) is PRESENT in every control-arm run and ABSENT in every pruned-arm run of that task (or vice versa).
- **NO DIFFERENCE**: identical present/absent pattern across arms in all runs.
- **MIXED**: anything else (within-arm inconsistency across runs).

**Trial verdict (pre-committed aggregation across the battery):**

| Verdict | Condition |
|---------|-----------|
| **DIFFERENCE-DETECTED** | ≥1 battery task shows CLEAR DIFFERENCE on R1 or R4 (the rule's load-bearing actions) |
| **NO-DIFFERENCE-DETECTED** | ALL battery tasks show NO DIFFERENCE on R1–R4 |
| **INDETERMINATE** | Anything else (MIXED patterns; or the battery-relevance criterion failed and no fallback task ran) |

**Pre-committed consequences**: DIFFERENCE-DETECTED → the pruned text was teaching; the prune is NOT ratified as-drafted; the imposter-test criteria tighten (design §9a) before any re-attempt. NO-DIFFERENCE-DETECTED → proceed to the prune PR (the window remains the in-the-wild backstop). INDETERMINATE → reported as indeterminate to Peter with the transcripts; proceeding is HIS call, not a default.

**Battery-relevance gate (Req 7.3, ratified method)**: a task counts toward the verdict ONLY if its control-arm transcript scores R1 PRESENT (the rule's execution path demonstrably exercised). At least one counted task is required, else the trial verdict is INDETERMINATE.

## 3. Window Definition (Req 8.2–8.5; DD6; DD8)

- **Close condition**: **N = 20 observed PRs** (ratified, PILOT-ONLY — never inherited by U1b waves). Event-denominated; never calendar time.
- **Observed PR** (DD6, all conditions required):
  1. Opened AFTER the prune merge (U1-p's merge commit timestamp on `main`);
  2. Head branch matches `task/*`, `fix/*`, or `chore/*` (the mechanical agent-authored filter);
  3. NOT on the instrument-PR exclusion list (§4).
- **First-push pinning (DD6)**: on first observation of a qualifying PR, record its **head SHA at that observation** in the window dataset. The PR's first-push check outcome = the required-check conclusions attached to THAT SHA — a later green push never replaces it.
- **Staleness triggers (Req 8.4, ratified)**: any merged change to the pruned rule's surfaces (Appendix A1's list), or a 122 regeneration affecting them. Detection recipe in §5.3.
- **DD8 segment semantics (ratified)**: a staleness event **SEGMENTS the window — the N counter NEVER resets.** Observed PRs keep accumulating toward N=20; metrics are computed per segment; the report notes the segmentation. **Bound: more than K=3 re-baselines before close → STOP, escalate to Peter as a corpus-volatility finding.**
- **Segment evaluability**: a segment is *evaluable* for the rate criterion (W1) iff it contains **≥5 observed PRs**; smaller segments report W1 as INDETERMINATE for that segment. The re-accretion criterion (W2) is evaluable in every segment regardless of size (a grep needs no minimum N).

### 3.1 Window criteria (pre-committed, count-based — what the closeout reports met/unmet/indeterminate against)

**Baseline**: computed ONCE, before the window opens, over the **20 most recent PRs preceding the prune merge that satisfy the same filter + exclusions** (§5.1 recipe, run against history). `B` = count of first-push failures among those 20.

- **W1 — first-push failure rate (per evaluable segment, scaled)**: let a segment contain `n` observed PRs with `f` first-push failures; expected-from-baseline `e = B × (n/20)`, rounded to nearest integer.
  - MET: `f ≤ e + 1`
  - UNMET: `f ≥ e + 3`
  - INDETERMINATE: `f = e + 2`, or segment not evaluable (n < 5)
  - *(Counts, not percentages — at N=20 each PR is 5 points; count thresholds keep the arithmetic honest and hand-computable. +3 failures over expectation on a ≤20-PR window is a gross signal — which is all this backstop tier claims to detect.)*
- **W2 — re-accretion (per segment)**: MET iff the §5.3 grep finds ZERO reintroduction of the pruned imperative patterns (Appendix A2) on the pruned surfaces during the segment; UNMET on any hit; never indeterminate (the grep always runs).
- **W3 — allowlist churn (report-only, Req 8.3 / STACY R2)**: IF U2 arms console-fail during the window, count allowlist entries added per PR (§5.4) from the arming forward. **A tracked data stream, not a pass/fail criterion** — reported in the closeout as data.

### 3.2 Cross-segment roll-up (the design-R2 watch item — defined conservatively)

A criterion's **window verdict** aggregates its per-segment verdicts as:

- **MET** ⇔ MET in **every evaluable segment** AND ≥1 segment was evaluable.
- **UNMET** ⇔ UNMET in **any** segment (one bad segment fails the window — no averaging away a regression).
- **INDETERMINATE** ⇔ otherwise (any indeterminate segment with no unmet; or zero evaluable segments).

**Indeterminate never converts to pass.** There is no weighting, no averaging across segments, and no dropping of inconvenient segments — a segment exists in the roll-up from the moment its boundary event is logged.

## 4. Instrument-PR Exclusion (STACY tasks-R1, HIGH — the window must not measure the spec measuring itself)

**Excluded from the observed set** (recorded in the window dataset's exclusion table, each with PR number + reason):
1. **U2's arming PR** (authored by prune-aware agents; arms a brand-new failure source);
2. **ALL gate-bite throwaway PRs** (engineered failures — from Task 1.6's smoke bite, U2's bites, or any other deliberate BLOCKED proof);
3. Any other PR whose purpose is 125-B instrumentation (judgment call → if excluded on judgment, the reason is recorded and the exclusion is visible in the dataset — an auditable decision, not a silent drop).

**U2 arming console-fail mid-window IS a Req 8.4 material-change event → opens a DD8 segment boundary** (a new first-push failure source unrelated to the prune; segments keep W1 attributable).

**Known limitation (honesty note, recorded per the R2 incorporation)**: U2's agents — and at solo scale, effectively ALL agents — are prune-aware to some degree (non-independent observers). The exclusion above removes the *mechanical* contamination (engineered failures, self-referential PRs); it cannot remove awareness. This is a recorded limitation of the window tier, not a solved problem — the trial tier (controlled arms) carries the gating weight for exactly this reason.

## 5. Manual Query Recipes (Req 8.6 — repeatable by hand; NO standing tooling)

*Each recipe is a manual invocation + hand transcription into the window dataset. If any of this ever seems to need a script outside the spec dir or a CI job, STOP — Req 9.3's escalate-don't-build applies (Req 8.6).*

### 5.1 Observed-PR enumeration + first-push failure (also the baseline recipe)

```
# List candidate PRs (run at each observation pass; adjust --limit as needed):
gh pr list --state all --limit 50 \
  --json number,headRefName,createdAt,headRefOid,url \
  --jq '.[] | select(.headRefName | test("^(task|fix|chore)/"))'

# Qualify each: createdAt AFTER the prune-merge timestamp; not on the exclusion table.
# On FIRST observation of a qualifying PR, transcribe into the dataset:
#   PR number | headRefName | createdAt | PINNED SHA (headRefOid at this observation) | segment

# First-push outcome for a pinned SHA:
gh api repos/3fn/DesignerPunk/commits/<PINNED_SHA>/check-runs \
  --jq '[.check_runs[] | {name, conclusion}]'
# first-push FAILURE iff any REQUIRED check's conclusion is "failure" for that SHA.
# (Required-check set: read from the PR's merge-box or Settings → Branches at window open;
#  record the set in the dataset header so the failure definition is frozen with the window.)

# BASELINE (run once, before the window opens): same recipe over the 20 most recent
# qualifying PRs with createdAt BEFORE the prune merge; record B (failure count) in the header.
```

Observation cadence: at least every 2–3 calendar days while the window is open (cadence is operational hygiene, not a budget — the window closes on N, never on days).

### 5.2 Wall-clock span (Req 8.7 — datum, never a criterion)

Record in the dataset header: window-open timestamp (= U1-p merge time), each segment-boundary timestamp, and window-close timestamp (= observation time of the 20th observed PR). Report the total span and per-segment spans in the closeout **as the serialization-estimation datum for Req 10.6(a)**. Time here is an observed OUTPUT; it closes nothing and budgets nothing.

### 5.3 Re-accretion + staleness scan (per observation pass)

```
# All changes to the pruned surfaces since the prune merge:
git log --oneline -p <PRUNE_MERGE_SHA>..origin/main -- <A1 surface paths>

# W2: grep the diff hunks for the pruned imperative patterns (Appendix A2).
#     Any reintroduction = W2 UNMET for the current segment (record the commit).
# Staleness: ANY merged change to an A1 surface (or a 122 regeneration affecting one —
#     identifiable by generator-output commits touching the generated prompt surfaces)
#     = a Req 8.4 material-change event → log it, close the current segment, open the next
#     (DD8: segment, never reset). Tally the event count (Req 10.6(c) datum; K=3 bound §3).
```

### 5.4 Allowlist churn (only if U2 arms mid-window)

```
git log -p <ARMING_MERGE_SHA>..origin/main -- src/__tests__/console-allowlist.json
# Count ADDED entries as parsed objects (one-entry-per-line serialization per design C8) —
# count added top-level {...} entries, NOT raw '+' lines. Record entries-added per PR.
```

## 6. The Window Dataset (where transcriptions land)

`completion/pilot/window-dataset.md` — created at window open, maintained by hand. Structure:
- **Header**: prune-merge SHA + timestamp; required-check set (frozen); baseline B + the 20 baseline PR numbers; window-open timestamp.
- **Observed-PR table**: `# | PR | branch | createdAt | pinned SHA | first-push result | segment`.
- **Exclusion table**: `PR | reason` (instrument PRs — §4).
- **Segment log**: `segment | opened-by (event) | boundary timestamp | n | f | W1 verdict | W2 verdict`.
- **Wall-clock record**: §5.2's timestamps.
- **Churn log** (if U2 arms): `PR | entries added`.

## 7. Amendment Discipline

The §1–§3 pre-commitments are LOCKED once the prune PR (U1-p) merges. Any amendment after the window opens: recorded here with date + reason, reported in the closeout, and the affected segment(s) marked INDETERMINATE unless Peter rules otherwise. Appendix fills (A1/A2 from Task 1.4) are parameters, not amendments — but they too are frozen at U1-p merge.

---

## Appendix A1 — The pruned rule's surfaces **[FILLED — Task 1.4, 2026-07-14; parameters only, no criteria changed (§7)]**

The §5.3 scan covers these paths (the authoritative list per `pilot-row-assessment.md` §1):

1. `.kiro/steering/Task-Completion-Protocol.md` — prune hunks S2-1 (:44–:45), S2-2 (:146)
2. `governance/Process-Development-Workflow.md` — prune hunk S3-1 (:75–:82)
3. `.kiro/steering/start-up-tasks.md` — **zero prune hunks** (education-only surface for this rule; scanned anyway — re-accretion of a pruned imperative INTO it would be a W2 hit)
4. `.claude/agents/thurgood.md` — generated, regen-slaved to #2 (scanned; a pruned imperative reappearing here WITHOUT a source change indicates a generator/manual-edit anomaly — reported as an anomaly, not W2-counted)

## Appendix A2 — The pruned imperative patterns **[FILLED — Task 1.4, 2026-07-14; parameters only, no criteria changed (§7)]**

W2 greps ADDED lines (`+` hunks) in §5.3's diff scan for these literal patterns (the pruned imposters — NOT the retained teaching, which legitimately echoes validation vocabulary):

1. `Run full validation (\`npm test\`)`
2. `validation MUST pass before marking complete`
3. `AFTER** validation passes`
4. `**Validate Implementation**` *(as a checklist-step imperative frame — the pruned S3 step-2 form)*

A hit on any pattern in an added line on an A1 surface = W2 UNMET for the current segment (record the commit). The rewritten context/why forms landing at the same locations are the retained education — not hits.

---

*Protocol authored per tasks.md Task 1.1 (Thurgood, Opus tier — planned agent, no divergence). Consumed by: Task 1.7 (probe scoring), Task 1.8 (trial scoring + verdict), Task 3.1 (window execution), Task 3.2 (closeout verdicts against §3's criteria + §3.2's roll-up).*
