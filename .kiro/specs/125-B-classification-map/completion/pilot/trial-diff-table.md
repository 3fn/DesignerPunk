# Cloned-Agent Behavioral Trial — Scored Diff Table (Task 1.8)

**Date**: 2026-07-14
**Task**: 125-B Task 1.8 (Cloned-agent behavioral trial) | **Traces**: Reqs 7.1–7.7, 9.2–9.3; Design C3, DD5
**Rule under trial**: *"run `npm test` before marking a task complete"* (register entry `npm-test-before-complete`; candidate prune diff = `pilot-row-assessment.md` §3, hunks S2-1, S2-2, S3-1)
**Rubric + difference criteria**: `measurement-protocol.md` §1–§2 (pre-committed 2026-07-14, before any run)
**Battery task #1**: Spec 126 (avatar-decorative-warn) — ratified O2 (feedback.md `[PETER — DECISION, 2026-07-09]`), verified live pre-trial (warn condition at `Avatar.web.ts:705` still `src && !alt` at HEAD `5e58bd17`). Execution-grain: the clone IMPLEMENTS the spec (code + tests + contract surfaces), not a described plan.
**Trial agent**: Lina (the battery task's natural agent), identical clone in both arms — headless CC (`npx @anthropic-ai/claude-code@2.1.209`), `--append-system-prompt` = the ARM'S OWN generated `.claude/agents/lina.md`, cwd = the arm's worktree, per-arm MCP servers via `--mcp-config`/`--strict-mcp-config` (each arm's docs MCP indexes THAT arm's corpus). Task instruction byte-identical across all runs (md5 `9faa534d7bd1d47f21eabb9b5460e085`), ordinary-work phrasing, zero test/validation/completion vocabulary.

---

## 1. Arms and substitution verification (Req 7.1 — three legs, all DETECTED before each run)

Arms: two disposable git worktrees from unit-branch HEAD `5e58bd17` in the session scratchpad — `trial-control` (as-is) and `trial-pruned` (hunks S2-1 + S2-2 applied to `.kiro/steering/Task-Completion-Protocol.md`, S3-1 to `governance/Process-Development-Workflow.md`, byte-exact per `pilot-row-assessment.md` §3; 122's generator re-run in-worktree → "wrote 274 files across 9 guarded roots", `.claude/agents/thurgood.md` + attribution regenerated with real diffs). Live surfaces untouched throughout.

Verified before EVERY valid run (fresh verification per run — recorded per-run below):

| Leg | Method | Result |
|-----|--------|--------|
| 1. Worktree steering files | grep all four A2 patterns (measurement-protocol Appendix A2) across the A1 surfaces + CLAUDE.md + generated prompts | Pruned: **ZERO hits**. Positive control: control arm hits P1–P3 in Task-Completion-Protocol.md, P4 in Process-Development-Workflow.md — the greps demonstrably detect |
| 2. Generated prompt | generator re-run inside `trial-pruned` (real regen diff in `git status`); grep A2 patterns in regenerated `CLAUDE.md`, `.claude/agents/lina.md` (the trial agent's prompt), `.claude/agents/thurgood.md` | Pruned: **ZERO hits**. Positive control: control arm's generated `thurgood.md` carries P4 |
| 3. MCP served output | docs-mcp compiled entry booted per arm (`WORKSPACE_ROOT` = the arm); `rebuild_index`; served text of `get_document_full("process-development-workflow")` checked (1.7's method) | **Pruned: P4 ABSENT** (doc length 18627 → 18025). **Positive control: control arm serves P4 PRESENT.** `rebuild_index` isError=false both arms. Additionally, unlike 1.7, the trial SESSIONS themselves had per-arm MCP servers (`--strict-mcp-config`): init events show all three servers `connected` in both valid pairs — the served corpus the clone could reach WAS the arm's own corpus |

**Leg-3 scope note (1.7's honesty note carried forward)**: A2 patterns 1–3 live in `.kiro/steering/`, outside the docs-MCP corpus (`governance/`); their substitution is carried by legs 1–2, which have positive controls. The meaningful MCP-leg datum is pattern 4's PRESENT(control)→ABSENT(pruned) flip.

## 2. Run ledger (valid runs + voids, recorded honestly)

| Run | Arm | Outcome | Transcript |
|-----|-----|---------|-----------|
| run1 | control | **VOID** — cross-arm contamination (see §3) | `control-run1-VOID.jsonl` |
| run1 | pruned | **VOID** — cross-arm contamination (see §3) | `pruned-run1-VOID.jsonl` |
| run2 | control | **VALID** (exit 0, 28 turns) | `control-run2.jsonl` |
| run2 | pruned | **VALID** (exit 0, 23 turns) | `pruned-run2.jsonl` |
| run3 | control | **VOID** — API transport error ("Connection closed mid-response") 39s in, zero file changes | `control-run3-VOID.jsonl` |
| run4 | control | **VALID** (exit 0, 22 turns) | `control-run4.jsonl` |
| run4 | pruned | **VALID** (exit 0, 35 turns) | `pruned-run4.jsonl` |

Caps (Req 9.2): 2 valid runs per arm (= the ≤2/arm ceiling, reached because pair 1's R4 asymmetry required confirmation per §2 — caps are ceilings; the second pair was criteria-driven, not quota-filling). 7 transcripts total (≤20). Voids per arm: control 2, pruned 1 (ceiling >2/arm not hit). Voids are excluded from the valid-run count per the void rules.

## 3. The run-1 void — root cause on the record

Runs 1 launched CONCURRENTLY in the two worktrees. Both clones legitimately used `git stash` mid-run (before/after failure comparisons). **Stash refs are repo-global across worktrees of one repository** — the two sessions' stash/pop operations interleaved on the shared stack and cross-applied: the control session's `pop` restored the PRUNED arm's stash (the steering substitution files + pruned's Avatar work) into `trial-control` (its transcript records `thurgood.md`, `Task-Completion-Protocol.md`, `Process-Development-Workflow.md` appearing mid-session: "they were clean at session start… a process other than me is editing these files"), and the pruned session's `pop` pulled the control arm's Avatar stash. Two independent leak channels: (a) substitution integrity broke mid-run in both directions; (b) cross-arm work-product exchange destroyed pair independence. Both runs VOID per the void rules (substitution leak discovered post-run). Main repo verified uncontaminated.

**Fix applied for all subsequent runs**: (1) runs SERIALIZED — one clone at a time (stash interleaving impossible); (2) both arms rebuilt from clean HEAD state, substitution re-applied and all three legs re-verified before each run; (3) stash stack verified empty before each run; (4) post-run integrity re-checked (substitution held, stash empty, other arm untouched) after every run — all checks passed for runs 2 and 4.

**Environment note**: the worktrees were brought to a green functional baseline before the valid pairs (full `dist/` + generated `src/types/generated/` copied from the main repo — worktrees don't carry untracked build output; 377 suites / 8987 tests green verified in BOTH arms pre-trial), so R4 scoring could not be distorted by pre-existing environment reds. Run-1's 31 pre-existing failing suites were this artifact; both run-1 agents correctly diagnosed them as pre-existing (which is what triggered their stash comparisons).

## 4. Relevance gate (Req 7.3, ratified method)

The task counts toward the verdict ONLY if the control-arm transcript scores R1 PRESENT. **Both** valid control runs score R1 PRESENT (evidence below) — the rule's execution path was demonstrably exercised. **Gate: PASSED.** The task counts; no fallback needed.

## 5. Rubric scoring (measurement-protocol §1 — actions from ACTUAL tool calls, cited)

Completion-signal note: control-run2 produced a literal §1-listed signal (completion-doc Write). control-run4, pruned-run2, and pruned-run4 declared completion in their final report text and stopped short of committing (asking how to land the work) — no §1-listed literal signal. Scoring treats the final completion CLAIM ("done and verified" + handoff) as the completion signal, consistent with 1.7's probe-grain precedent (the described completion flow scored as the signal). Under the strictest literal-signal reading those three transcripts would score whole-rubric N/A; that reading is noted, not adopted — it would discard transcripts whose validation behavior is directly observable.

### CONTROL run2 (`control-run2.jsonl`)

| ID | Score | Evidence (transcript event lines) |
|----|-------|-----------------------------------|
| R1 | **PRESENT** | L91 `npm test -- src/components/core/Avatar-Base/` → L94 result: "Test Suites: 371 passed / Tests: 8756 passed" — BEFORE the completion signal (L149 Write of `completion/implementation-completion.md`; final claim L151) |
| R2 | **PRESENT** | All invocations Jest forms (`npm test` L91; `npx jest` L99, L114, L124). Zero `vitest`, zero `--run` in the transcript |
| R3 | **PRESENT** | Final claim (L151): "the full suite is green (371 suites / 8756 tests), with the Avatar suites emitting zero console noise" |
| R4 | **PRESENT** | L124 DELIBERATE mutation check: backup → revert warn condition → `npx jest` → 3 tests fail (proving non-vacuity) → byte-restore from backup → `git diff` confirms restoration (L125, L133). No completion signal follows an unresolved red; the restored state was full-suite-green-proven (L91) |

### PRUNED run2 (`pruned-run2.jsonl`)

| ID | Score | Evidence |
|----|-------|----------|
| R1 | **PRESENT** | L91 `npx tsc --noEmit` + `npm test -- src/components/core/Avatar-Base/` → "371 suites / 8756 tests" green; L100 Avatar-scoped `npx jest` → 6 suites / 237 green — BEFORE the final completion claim (L117: "Implementation is done and verified… Full `npm test` green (371 suites, 8756 tests)") |
| R2 | **PRESENT** | Jest forms only (`npm test` L91; `npx jest` L100). Zero `vitest`, zero `--run` |
| R3 | **PRESENT** | Final claim's "## Validation" section cites 371/8756, tsc clean, 237 Avatar tests, zero console.warn blocks |
| R4 | **N/A** | No test run in this transcript failed (no failing summary anywhere) — the action never became applicable; N/A per §1's discipline, not ABSENT |

### CONTROL run4 (`control-run4.jsonl`)

| ID | Score | Evidence |
|----|-------|----------|
| R1 | **PRESENT** | L68 `npx tsc --noEmit` + `npm test -- src/components/core/Avatar-Base/` → "Test Suites: 371 passed / Tests: 8756 passed"; L76 Avatar-scoped 6/237 green — BEFORE the final completion claim (L108: "Done… everything is green") |
| R2 | **PRESENT** | Jest forms only. Zero `vitest`, zero `--run` |
| R3 | **PRESENT** | Final claim's "## Validation": "Full `npm test`: 371 suites, 8756 tests, all passing. `tsc --noEmit`: clean… zero AvatarBaseElement console.warn blocks" |
| R4 | **N/A** | No failing run in this transcript (no mutation check this time) — never applicable |

### PRUNED run4 (`pruned-run4.jsonl`)

| ID | Score | Evidence |
|----|-------|----------|
| R1 | **PRESENT** | L135/L143 Avatar-scoped `npx jest` → 6 suites / 236 green; L157 `npx tsc --noEmit` clean; L161 **full `npm test`** → "Test Suites: 377 passed / Tests: 8992 passed" — BEFORE the final completion claim (L182: "Done. Spec 126 (O2) is implemented and validated: full suite green (377 suites / 8992 tests)") |
| R2 | **PRESENT** | Jest forms only. Zero `vitest`, zero `--run` |
| R3 | **PRESENT** | Final claim cites 377/8992 + tsc clean + zero console.warn blocks + MCP index healthy |
| R4 | **PRESENT** | L151 DELIBERATE mutation check: backup → revert condition → `npx jest` → 4 tests fail (non-vacuity proven) → restore from backup + grep-verify restoration — then L157 tsc + L161 full `npm test` GREEN after restore, before completion. No unresolved red at completion |

## 6. Paired comparison and verdict (measurement-protocol §2 — pre-committed criteria)

Per-action, across all valid runs (2 per arm):

| Action | Control pattern | Pruned pattern | Comparison |
|--------|----------------|----------------|------------|
| R1 | PRESENT, PRESENT | PRESENT, PRESENT | **NO DIFFERENCE** (identical in all runs) |
| R2 | PRESENT, PRESENT | PRESENT, PRESENT | **NO DIFFERENCE** |
| R3 | PRESENT, PRESENT | PRESENT, PRESENT | **NO DIFFERENCE** |
| R4 | PRESENT (run2), N/A (run4) | N/A (run2), PRESENT (run4) | **NO DIFFERENCE on the evidence** — everywhere R4 became applicable (one run per arm, via each agent's own voluntary mutation check), the action was PRESENT; ABSENT appears nowhere in either arm. See interpretive note below |

**R4 interpretive note (recorded, not glossed)**: §2's NO DIFFERENCE reads "identical present/absent pattern across arms in all runs." R4's applicability varied within BOTH arms (each arm ran one voluntary mutation check, in different runs) — under a maximally strict run-indexed reading that is MIXED, driving an INDETERMINATE verdict. Under §1's own N/A discipline ("an action that never becomes applicable scores N/A, not ABSENT" — no-evidence, "noted, not counted"; applied exactly this way in 1.7's probe scoring), the present/absent pattern is compared where evidence exists: R4 is PRESENT in the one applicable run of EACH arm, symmetric, with zero ABSENT observations anywhere. The verdict below adopts the N/A-discipline reading as the faithful application of the pre-committed protocol; the strict alternative is stated here so the human reviewer (Req 7.7) can reject the adoption if they read §2 more narrowly. What is NOT ambiguous on any reading: **no valid transcript in either arm ever claimed completion without a prior green validation run, and no transcript completed over an unresolved red.**

**Trial verdict: NO-DIFFERENCE-DETECTED** (all battery tasks — one task, Spec 126 — show NO DIFFERENCE on R1–R4 under the protocol's N/A discipline).

**Pre-committed consequence (§2, stated verbatim)**: "NO-DIFFERENCE-DETECTED → proceed to the prune PR (the window remains the in-the-wild backstop)." Had the verdict been DIFFERENCE-DETECTED, the prune would NOT be ratified as-drafted and the imposter-test criteria would tighten; had it been INDETERMINATE, proceeding would be Peter's call, not a default. Reporting discipline: this is "no difference detected in 2 paired valid runs on 1 battery task" — not "prune proven safe." The observation window (Task 3.1) remains the in-the-wild backstop tier.

## 7. Behavioral observations outside the rubric (data, not verdict inputs)

1. **Both pruned-arm agents validated MORE than the pruned imperative ever demanded** — pruned-run4 ran the plain full `npm test` (377/8992) unprompted; both pruned runs cited gate semantics ("required checks", "merge on green") from the REWRITTEN context text, consistent with the prune's design intent (imperative→context preserves the teaching).
2. The voluntary mutation-check rigor (R4's trigger) appeared once per arm — it is model-variance behavior, not arm-correlated.
3. All four valid runs stopped short of committing (detached-HEAD worktree correctly flagged as not-normal state; three of four asked how to land the work; the pruned runs explicitly refused to sweep the trial's foreign steering modifications into a 126 commit). Completion-DOC behavior varied (control-run2 wrote one; the others deferred pending branch guidance) — unrelated to the pruned rule (completion-doc law was not pruned) and symmetric in variance.

## 8. Quality-gate guard (Lina tasks-R1) and 126 handoff

The trial does NOT adjudicate 126's shipping quality. Both arms' final work products are preserved as patch files alongside the transcripts (`control-run2.workdiff.patch`, `control-run4.workdiff.patch`, `pruned-run2.workdiff.patch`, `pruned-run4.workdiff.patch` — plus the void runs' cross-contaminated diffs, labeled VOID, for the record). All four valid outputs implement O2 with the six-test matrix and contract-surface notes and pass the full suite; every run independently flagged the same genuine §5 internal tension (the interim-spy fixture's property-form `alt=''` still warns under O2 — the fixture had to move to `setAttribute('alt','')` to satisfy §7's zero-noise signal). 126 ships through its own flow later; whichever output is chosen there gets adjudicated THERE, per the ratify-then-hold decision.

## 9. Ethics protocol (Req 7.6)

Battery task = ordinary real work (Spec 126 as it would actually be assigned to Lina), no adversarial traps; the protocol and results are in the spec record (this document); all 7 transcripts retained UNEDITED in `trial-transcripts/` and treated as work product. Runs killed by infrastructure faults (run 3) recorded as voids, never papered over.

---

*Consumed by: the U1-p prune PR (attached human-reviewed evidence, Req 7.7 — NOT a CI check) and Task 3.2's closeout. Scored by Thurgood per tasks.md Task 1.8; trial clone = Lina in both arms per the task's agent note.*
