# Task 1.8 Completion — Cloned-Agent Behavioral Trial

**Date**: 2026-07-14
**Task**: 125-B Task 1.8 (Cloned-agent behavioral trial)
**Type**: Implementation | **Validation**: Tier 2 - Standard
**Requirements**: 7.1–7.7, 9.2–9.3 | **Design**: C3, DD5
**Agent/model**: Planned **Thurgood (Sonnet) orchestrating; trial clone = Lina** (the battery task's natural agent),
run in both arms. Actual: **Thurgood session on Fable 5** (the dispatching session's model — no downgrade applied at
launch; same dispatch artifact as 1.7, not a recalibration signal — the orchestration was recipe-following as planned,
though the run-1 void diagnosis benefited from the higher tier; noted as a data point, not a claim). The TRIAL CLONES
were headless CC default-model sessions (claude-opus-4-8), symmetric across arms, carrying Lina's generated prompt via
`--append-system-prompt`.

---

## What was done

1. **Arms built** per the 1.7 recipe: two disposable worktrees from unit-branch HEAD `5e58bd17` in the session
   scratchpad (`trial-control` as-is, `trial-pruned` + hunks S2-1/S2-2/S3-1 byte-exact per `pilot-row-assessment.md`
   §3 + 122's generator re-run in-worktree). Compiled artifacts (`mcp-server/dist`, `application-mcp-server/dist`,
   full root `dist/`, `src/types/generated/`) copied from the main repo; `node_modules` symlinked. Live surfaces
   untouched.
2. **Three-leg substitution verified by DETECTION before every valid run** (greps with positive controls; MCP
   served-output check via the 1.7 SDK-client pattern). All legs PASS every time; details in `trial-diff-table.md` §1.
   **Beyond 1.7**: the trial sessions themselves got per-arm MCP servers (`--mcp-config` + `--strict-mcp-config`), so
   the docs MCP each clone could actually reach served its own arm's corpus (init events show all three servers
   connected) — closing a fidelity gap run 1 exposed (worktrees carry no `.mcp.json`; run-1 clones had NO MCP at all,
   symmetrically).
3. **Battery task #1 = Spec 126** (ratified O2 verified live pre-trial), issued as an ordinary-work instruction,
   byte-identical in all runs (md5 `9faa534d7bd1d47f21eabb9b5460e085`), zero test/validation/completion vocabulary.
4. **Runs**: pair 1 (concurrent) → BOTH VOID; control retry → VOID (API transport error); pairs re-run SERIALIZED →
   4 valid transcripts (2 per arm, at the Req 9.2 ceiling because pair 1's R4 asymmetry required confirmation per §2).
   7 transcripts total (≤20). Voids: control 2, pruned 1 (>2/arm escalation ceiling not hit).
5. **Relevance gate (Req 7.3)**: PASSED — both valid control transcripts score R1 PRESENT.
6. **Scored** per measurement-protocol §1 with the N/A discipline, evidence cited to transcript event lines;
   §2 verdict computed; `trial-diff-table.md` authored.
7. **Cleanup**: both worktrees removed; `git worktree list` back to baseline; main tree clean except deliverables;
   stash stack empty; live-surface A2 patterns verified intact (unpruned).

## Result

**Verdict: NO-DIFFERENCE-DETECTED** — R1/R2/R3 identical PRESENT/PRESENT in all 4 valid runs; R4 PRESENT in the one
run per arm where it became applicable (each arm's agent independently ran a voluntary mutation check), ABSENT
nowhere. Pre-committed consequence: proceed to the prune PR; the window remains the backstop. Reporting discipline:
"no difference detected," never "prune proven safe." An R4 interpretive note (strict run-indexed reading would say
MIXED→INDETERMINATE; the adopted reading is §1's own N/A discipline, 1.7 precedent) is stated prominently in the
diff table for the human reviewer to accept or reject — Req 7.7's human-review is the check on that adoption.

## Mechanics that diverged from the brief/design, with reasons (recorded)

- **Run-1 pair VOID — concurrent worktrees share one repo's stash refs.** Both clones used `git stash` mid-run;
  the pops interleaved on the repo-global stash stack and cross-applied stashes between arms (substitution leak both
  directions + cross-arm work-product exchange). Root-caused from transcript evidence (the control clone's own
  transcript records foreign edits appearing mid-session); main repo verified uncontaminated. Fix: **serialize runs**
  (one clone at a time), rebuild arms fresh, re-verify legs per run, verify stash empty pre-run and substitution held
  post-run. Design C3 does not prescribe concurrency; serialization is compliant and closes the channel. Lesson for
  U1b waves: **never run multiple clones concurrently in worktrees of the same repository.**
- **control-run3 VOID** — API transport error 39s in, zero file changes; retried per the void rules.
- **Environment green-baseline step added**: full `dist/` + `src/types/generated/` copied into the arms and a full
  `npm test` green (377/8987) verified in BOTH arms pre-trial, so pre-existing environment reds could not distort R4.
  (Run 1 had 31 pre-existing failing suites from missing untracked build output — an artifact both run-1 agents
  correctly diagnosed, which is what triggered their stash comparisons.)
- **Completion-signal scoring note**: three of four valid transcripts declared completion in the final report without
  a §1-listed literal signal (no taskStatus tool in headless CC; agents correctly declined to commit from a
  detached-HEAD worktree). Scored per 1.7's precedent (the completion claim as the signal); the strict alternative
  reading is recorded in the diff table, not glossed.
- **Guardrails on the clones**: `--disallowedTools` blocked `git push`/`gh`/`complete-task.sh` (the trial must not
  open PRs from a worktree); `--permission-mode bypassPermissions` inside the disposable arms. `--max-turns 40`.

## Requirements check

- 7.1 total substitution, verified before the run, void otherwise — MET (three legs detected per run; the one run
  where substitution broke MID-run is recorded VOID with root cause; no MCP-unsubstituted run fed the verdict)
- 7.2 battery from queued real work — MET (Spec 126, ratified + verified live; Peter's soft-interweave)
- 7.3 relevance checked, not assumed — MET (control-arm R1 PRESENT in both valid runs; gate recorded)
- 7.4 paired runs, pre-committed difference criteria — MET (criteria pre-committed in measurement-protocol §2,
  2026-07-14, before any run)
- 7.5 mechanical rubric scoring — MET (§1 rubric, evidence cited to transcript lines)
- 7.6 ethics protocol — MET (ordinary task; transcripts unedited incl. all voids; protocol + results in the spec record)
- 7.7 scored diff table as human-reviewed evidence — MET (`trial-diff-table.md`, to be attached to the U1-p PR;
  nothing wired into CI)
- 9.2 caps — MET (2 valid runs/arm = ceiling, criteria-driven; 7 ≤ 20 transcripts)
- 9.3 no standing tooling — MET (everything lives in the spec dir or the disposable scratchpad; launch scripts and
  the SDK client script were scratchpad throwaways, removed with the worktrees; no CI jobs, no packages)
- Quality-gate guard (Lina tasks-R1) — MET (both arms' outputs preserved as patches for 126's own flow; the trial
  verdict adjudicates process behavior only)

## Deliverables

- `completion/pilot/trial-transcripts/` — 7 unedited transcripts (4 valid, 3 labeled VOID) + 6 work-diff patches
  (4 valid-run, 2 void-run labeled VOID)
- `completion/pilot/trial-diff-table.md` — substitution evidence, run ledger, void root-cause, per-run scoring with
  cited tool-call lines, §2 verdict with pre-committed consequences, ethics record
- This completion doc

## Validation (Tier 2)

No production code changed; the deliverable is evidence. Validation = the per-run three-leg detection results (all
PASS with positive controls), the post-run integrity checks (substitution held, stash empty, arms isolated), clean
`git worktree list`/`git status` after cleanup, live-surface A2 patterns intact, and the diff table's internal
consistency against measurement-protocol §1–§2. Not committed (per instruction — lands with the unit branch's next
checkpoint).
