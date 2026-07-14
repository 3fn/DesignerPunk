# Pilot Row — Per-Surface Assessment + Candidate Prune Diff

**Date**: 2026-07-14
**Task**: 125-B Task 1.4 | **Traces**: Reqs 2.1–2.3; Design C2
**Rule**: *"Run the full validation suite before marking a task complete"* (the npm-test rule — the prune-with-arm pilot row)
**Register entry**: `governance/classification-map.md § "npm-test-before-complete"`
**Status of the diff**: CANDIDATE — consumed by Tasks 1.7 (probe) and 1.8 (trial), ratified and applied ONLY in Task 2 (U1-p, ballot-gated, Peter-merged). **The live surfaces are untouched by this task.**
**Verification**: every quoted clause verified against the live file this session (2026-07-14, `task/125-B-u1-s`); line refs current as of this commit range.

---

## 1. Surface Enumeration (verified by search, not by list)

| # | Surface | The rule's presence (verified lines) |
|---|---------|--------------------------------------|
| S1 | `.kiro/steering/start-up-tasks.md` | §4 Jest command education (:55–:76, incl. the :69 lane-semantics addendum and :72 wrong-commands); §5 Test Command Selection Guidelines (:79–:105, decision tree). **No standalone "validate before completing" imperative exists in S1** — its presence is lane-selection + command-form education within a validation context. |
| S2 | `.kiro/steering/Task-Completion-Protocol.md` | :37 (subtask step: targeted tests); :44 (parent Impl/Arch step 1: "Run full validation (`npm test`)"); :45 (step 2: "**AFTER** validation passes"); :146 (Key Rules: "validation MUST pass before marking complete"); :149 (parent-vs-subtask summary). The Setup/Documentation parent sequence carries NO npm-test step (verified — its step 1 is artifact verification). |
| S3 | `governance/Process-Development-Workflow.md` | :74–:82 — "Recommended Process" step 2 "**Validate Implementation**" with four lane bullets + the lane-semantics blockquote (a near-duplicate of S1 §4/§5 content). |
| S4 | `.claude/agents/thurgood.md` (generated) | The ONLY generated prompt embedding the workflow doc's ambient (verified: 1 of 16 prompts) — **regen-slaved to S3**; pruning S3 + regeneration prunes S4. Not separately edited (rule-grain via source). |

## 2. Per-Surface, Per-Clause Assessments (Req 2.2 — verdicts RECORDED)

### S1 — start-up-tasks.md — **ZERO prune clauses**

| Clause | Blade 1 (teach vs. restate-gate's-what) | Blade 2 (churn fit) | Sub-rules | Call |
|--------|------------------------------------------|---------------------|-----------|------|
| §4 Jest-not-Vitest block (:55–:76) | **SEPARATE RULE** (Lina's clause-separation guard, logged as its own classification): functional education — correct command forms, wrong-command warnings. Teaches; no gate owns command-form correctness | Stable; command list **durable-by-role** (illustrative-use sub-rule: `npm test`, `test:all` etc. named as teaching instances) | illustrative-use: PASS (names are the lesson's instances) | **KEEP — separately classified, untouched by this rule's prune** |
| §4 :69 lane-semantics addendum | Historical/tactical note in a durable home — a **blade-2 churn observation for a FUTURE row** (it is 125's own churn-example specimen) | Mismatch noted | clause-grain: it is a distinct clause from the education around it | **KEEP for this prune** (out of this rule's grain; recorded as a candidate for a future wave — rule-grain discipline forbids taking it here) |
| §5 Test Command Selection + decision tree (:79–:105) | TEACHES which lane for which scope — selection judgment no gate owns (the gate runs the full suite; lane choice is local-efficiency teaching) | Stable guidance; commands durable-by-role | illustrative-use: PASS | **KEEP — this is the lane-selection education's single canonical home** |
| §7 pointer to Task-Completion-Protocol | Pointer/routing | Fits | — | **KEEP** |

### S2 — Task-Completion-Protocol.md — **three prune-candidate clauses, two keeps**

| Clause | Blade 1 | Blade 2 | Sub-rules | Call |
|--------|---------|---------|-----------|------|
| :37 subtask "Run targeted tests relevant to the change (not the full suite)" | Imperative — but **NO gate exists at subtask grain** (required checks fire at PR only). Nothing owns this mechanically; the instruction is operative, not duplicative | Fits | — | **KEEP** (not an imposter — no gate to impersonate) |
| :44 parent step 1 "Run full validation (`npm test`) — see Start Up Tasks for test-command selection" | **IMPOSTER (candidate)**: imperative restatement of the what the 125-A required checks now own (a red suite blocks the unit's merge). The pointer half is routing (keep-by-rewrite) | The imperative is gate-era-stale in a durable home | clause-grain: imperative + pointer are separable | **PRUNE→REWRITE** (imperative→context; pointer retained) |
| :45 parent step 2 "...**AFTER** validation passes — the status change commits with the work and takes effect at merge" | The "**AFTER** validation passes" ordering = gate-owned what (**candidate**); "the status change commits with the work and takes effect at merge" = semantics TEACHING | Teaching half fits | **clause-grain cut mid-sentence** (the design's named case) | **PRUNE the ordering imperative, KEEP the semantics teaching** |
| :146 Key Rules "Implementation / Architecture tasks: validation MUST pass before marking complete." | **IMPOSTER (candidate)**: pure imperative restatement of the gate-owned what | Stale-with-gate in durable law | — | **PRUNE→REWRITE** (context form) |
| :149 "parents get full validation + completion doc + summary doc..." | DESCRIPTIVE summary of the tier system (teaches parent-vs-subtask distinction), not an imperative | Fits | — | **KEEP** (imposters-only discipline — description is not instruction) |

### S3 — Process-Development-Workflow.md — **one prune-candidate clause (the step-2 frame + duplicated education)**

| Clause | Blade 1 | Blade 2 | Sub-rules | Call |
|--------|---------|---------|-----------|------|
| :75 step 2 "**Validate Implementation**:" imperative frame | **IMPOSTER (candidate)**: workflow-checklist restatement of the gate-owned what | Stale-with-gate | clause-grain: frame vs. embedded detail | **PRUNE→REWRITE** (imperative→context) |
| :76–:80 the four lane bullets | Lane-selection TEACHING — but a **DUPLICATE of S1 §5's canonical copy** (two durable homes for the same evolving guidance = drift risk; blade 2's concern is the duplication, not the teaching) | Second-home churn risk | — | **REPLACE WITH POINTER to S1 §5** (education preserved by reference at its single home — not deleted-as-teaching) |
| :82 lane-semantics blockquote | Duplicate of S1's :69 addendum | Same second-home risk | — | **REMOVE with the bullets** (its canonical copy stays at S1 :69) |
| Steps 1, 3–7 + the rest of the doc | Workflow/documentation teaching (completion docs, taskStatus, PR flow) | Fits | — | **KEEP** (out of this rule's grain) |

### S4 — generated thurgood prompt: **no separate edit** — regenerated from S3 post-prune (rule-grain satisfied through the source; the prune PR must run the generator).

**Clause-separation log (C2/LINA, explicit)**: the **npm-test imperative** (S2 :44/:45/:146; S3 :75) and the **Jest-not-Vitest functional education** (S1 §4; echoed in S3's bullets only as lane names) are SEPARATELY-CLASSIFIED throughout this table — the first is this rule's prune candidate; the second is a distinct rule, classified KEEP, and the candidate diff below provably does not touch S1 §4.

## 3. The Candidate Prune Diff (rule-grain: all surfaces in one action; imposters only)

### S2 — `.kiro/steering/Task-Completion-Protocol.md`

**Hunk S2-1 (:44–:45)** — BEFORE:
```
1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes — the status change commits with the work and takes effect at merge
```
AFTER:
```
1. [ ] Local validation: the unit PR's required checks run the full suite at the gate — validating locally first catches failures before they block the merge (test-command selection: Start Up Tasks)
2. [ ] Mark parent task complete (use the `taskStatus` tool) — the status change commits with the work and takes effect at merge; a failing suite blocks that merge at the gate
```

**Hunk S2-2 (:146)** — BEFORE:
```
- **Implementation / Architecture tasks**: validation MUST pass before marking complete.
```
AFTER:
```
- **Implementation / Architecture tasks**: the unit's required checks enforce a green suite at merge — local validation before completion catches failures early.
```

### S3 — `governance/Process-Development-Workflow.md`

**Hunk S3-1 (:75–:82)** — BEFORE: step 2's "**Validate Implementation**:" + the four lane bullets + the lane-semantics blockquote (quoted in §1/S3 above, verified :74–:82).
AFTER:
```
2. **[MANUAL]** **Local validation**: the unit PR's required checks run the full functional suite at the gate; validating locally first catches failures before they block the merge. Test-command and lane selection (incl. the performance lanes and the 2026-07-03 lane-semantics note): Start Up Tasks §4–§5.
```

### S1 — `.kiro/steering/start-up-tasks.md`: **NO HUNKS** (zero imposters found; the assessment IS the record).
### S4 — regenerate from S3 (the prune PR runs 122's generator; S4's diff is generated, not authored).

**Prune-PR checklist (for Task 2)**: apply S2-1, S2-2, S3-1; run the generator (S4 regen); attach probe + trial evidence; ballot-gated; Peter merges.

## 4. Framings Note (why the diff is shaped this way)

Every pruned imperative is REWRITTEN to context/why rather than deleted bare — the education layer keeps teaching (why the gate exists, what local validation buys) while the *instruction* the gate now owns comes out. This is the frozen rule applied ("prune imposters, not teachers"), and it is exactly what the trial adjudicates: if the pruned-arm agent stops validating locally, the imperative was teaching (Peter's frame) and the criteria tighten; if behavior holds, it was a nag (map frame). The diff takes no position the evidence won't check.
