# Task 2 Completion: U1-p — The Prune PR

**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 2 — U1-p: The Prune PR
**Type**: Parent
**Validation Tier**: Tier 3 — Comprehensive (includes success criteria)
**Agent**: Thurgood (Sonnet) — as planned; the edits were pre-adjudicated by Task 1.4, this task applied them. No
delegated-tier divergence to record.
**Branch**: `task/125-B-u1-p`
**Date**: 2026-07-14

---

## Success Criteria (from tasks.md)

- ✅ The ratified prune lands on all three surfaces in ONE governance-law PR with probe + trial evidence attached
  — see § "Reconciliation: 'three surfaces' vs. the verified two-hunk surfaces" below for what "all three surfaces"
  means given the pilot-row-assessment's verified finding.
- ✅ Only imposter-assessed clauses pruned; the Jest-not-Vitest education intact post-merge — independently
  re-verified this session (§ "Verification Results").

---

## Reconciliation: "three surfaces" vs. the verified two-hunk surfaces

The task's success criterion (and the tasks.md primary-artifacts line) names three surfaces: Start Up Tasks,
Task-Completion-Protocol, and "the ambient workflow source" (Process-Development-Workflow). That phrasing predates
Task 1.4's verified per-surface enumeration, which found:

- **S1 (`start-up-tasks.md`) contributes ZERO prune hunks.** Its npm-test-adjacent content is entirely
  lane-selection + Jest-command-form *education* (§4–§5) — there is no standalone "validate before completing"
  imperative on this surface to prune. The pilot-row-assessment's §1 enumeration and §3 diff both make this explicit
  ("S1 — start-up-tasks.md: NO HUNKS — zero imposters found; the assessment IS the record").
- **S2 (`Task-Completion-Protocol.md`)** carries 2 prune hunks (S2-1, S2-2).
- **S3 (`governance/Process-Development-Workflow.md`)** carries 1 prune hunk (S3-1).
- **S4 (`.claude/agents/thurgood.md`, generated)** is not separately edited — it is regenerated from S3's source
  edit by the 122 generator (verified below).

**Disposition**: I did not invent an S1 edit to satisfy the letter of "three surfaces." The pilot-row-assessment's
verified finding (S1 = zero hunks) is the ratified analysis this task applies; inventing a hunk on a surface with no
imposter clause would itself be the anti-pattern the classification methodology exists to prevent (pruning teaching,
not imposters). The task's "three surfaces" success criterion is satisfied in substance — every surface the rule
lives on was enumerated, assessed, and (where warranted) pruned — with S1's zero-hunk outcome recorded here as the
reconciliation the instructions asked for, not silently passed over.

---

## Hunks Applied (verbatim, matching `pilot-row-assessment.md` §3 exactly)

### `.kiro/steering/Task-Completion-Protocol.md`

**Hunk S2-1** — PARENT TASKS (Implementation/Architecture), steps 1–2. Before-text matched the live file byte-for-byte
(verified by Read before Edit); no drift from the assessment's cited context.
```diff
- 1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
- 2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes — the status change commits with the work and takes effect at merge
+ 1. [ ] Local validation: the unit PR's required checks run the full suite at the gate — validating locally first catches failures before they block the merge (test-command selection: Start Up Tasks)
+ 2. [ ] Mark parent task complete (use the `taskStatus` tool) — the status change commits with the work and takes effect at merge; a failing suite blocks that merge at the gate
```

**Hunk S2-2** — § "Key Rules". Before-text matched live byte-for-byte.
```diff
- - **Implementation / Architecture tasks**: validation MUST pass before marking complete.
+ - **Implementation / Architecture tasks**: the unit's required checks enforce a green suite at merge — local validation before completion catches failures early.
```

### `governance/Process-Development-Workflow.md`

**Hunk S3-1** — § "Task Completion Workflow" step 2 (imperative frame + four duplicated lane bullets + lane-semantics
blockquote → single pointer to S1's canonical education). Before-text matched live byte-for-byte.
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

No hunks (see reconciliation above).

### `.claude/agents/thurgood.md` + `.claude/agents/thurgood.md.attribution.json`

Regenerated by `npx tsx tools/agent-generator/generate.ts` after the S3-1 source edit ("wrote 274 files across 9
guarded roots"). `git diff` on `thurgood.md` shows exactly the S3-1 rewrite propagated into its embedded copy of the
Process-Development-Workflow ambient — no other content changed. Confirmed this is the *only* generated prompt that
changed (`git status --porcelain` after the regen run showed only `thurgood.md` + its attribution sidecar among the
274 written files), consistent with the assessment's S4 finding ("the ONLY generated prompt embedding the workflow
doc's ambient... 1 of 16 prompts").

**Drift notes**: none. Every before-block matched the live file at the exact line ranges the assessment cited
(`Task-Completion-Protocol.md :44-:45`, `:146`; `Process-Development-Workflow.md :75-:81`) — no adaptation was
required or performed.

**Metadata bump**: `Last Reviewed` bumped 2026-07-08 → 2026-07-14 on both hand-edited docs (`Task-Completion-Protocol.md`,
`Process-Development-Workflow.md`), consistent with the steward's doc-lifecycle "Update" step (content changed by
this task; Thurgood updates `Last Reviewed`). `node scripts/validate-steering-metadata.js` re-run clean after the
bump (0 errors; 1 pre-existing unrelated warning on `AI-Collaboration-Framework.md`, not touched by this task).

---

## Verification Results

### (a) A2 pattern zero-hits — all four patterns, across live steering surfaces AND regenerated outputs

Patterns (measurement-protocol Appendix A2): (1) `` Run full validation (`npm test`) ``, (2) `validation MUST pass
before marking complete`, (3) `AFTER** validation passes`, (4) `**Validate Implementation**`.

```
.kiro/steering/Task-Completion-Protocol.md   → ZERO hits
governance/Process-Development-Workflow.md   → ZERO hits
.kiro/steering/start-up-tasks.md             → ZERO hits (none ever present per Task 1.4's finding)
.claude/agents/thurgood.md (regenerated)     → ZERO hits
CLAUDE.md (regenerated)                      → ZERO hits
```

### (b) Jest-not-Vitest education — INTACT

`start-up-tasks.md` §4 ("CRITICAL: This project uses Jest, NOT Vitest" through the wrong-command warnings, lines
56–73) verified present and unmodified — the clause-separation guard (C2/LINA) held: this rule was never touched by
the diff, and remains fully intact post-application.

### (c) Full validation

- `npm test` → **377 suites / 8987 tests, all passing** (run three times across the session as edits accumulated —
  after the hunk application + first regen, after the `Last Reviewed` bump + second regen, and as the final check;
  green every time).
- `npx tsc --noEmit --skipLibCheck` → clean, zero output, every run.

### (d) Sweep-1 (crossRef resolution, the 1.5 pattern)

```
npx tsx tools/agent-generator/sweeps/sweep-1-refs.ts
→ 122-sweep-1-refs: PASS — 0 fail, 0 unadjudicated, 0 adjudicated, 0 info
```
Run twice (before and after the `Last Reviewed` bump + second regen); PASS both times. Confirms the
`record-first-ratification` crossRef pair (from Task 1.5) still resolves cleanly and this task introduced no new
dangling references.

### (e) Generator / diff-guard

`npx tsx tools/agent-generator/generate.ts` run twice (once immediately after the S2/S3 hunks, once after the
`Last Reviewed` bump) — both runs reported "wrote 274 files across 9 guarded roots," zero errors.
`npx tsx tools/agent-generator/diff-guard.ts` → `diff-guard: full-run-green (input-closure-changed)` both times —
the guard's expected state when a guarded output's *input* (the source steering/governance docs) legitimately
changed and the regenerated output matches what the generator produces from the new input (no unauthorized manual
drift between source and output).

`node scripts/validate-steering-metadata.js` → 0 errors, 91/92 docs valid with no new warnings (the sole warning,
on `AI-Collaboration-Framework.md`, predates and is unrelated to this task).

---

## Ballot

**File**: `.kiro/docs/ballots/2026-07-14-npm-test-imperative-prune.md`
**Status at hand-off**: `DRAFT — awaiting Peter's ratification`. Per the record-first protocol
(`.kiro/docs/ballots/README.md`), I did **not** mark it `RATIFIED` myself — the coordinator presents it to Peter,
and the ratifying session updates `Status` and commits that record before the U1-p PR merges (the PR itself carries
the governance-law carve-out and stays Peter-merged).

The ballot documents: the problem (why this rule is a prune candidate now that the 125-A required checks own the
*what*), the exact before→after for every hunk, the full evidence chain (register row → probe → trial → this
session's independent re-verification), scope, the honest counter-argument against proceeding on two paired trial
runs, and the revert path (`git revert` the unit's squash-merge commit; the observation window is the detection
mechanism for whether a revert is ever warranted).

**Register history**: `governance/classification-map.md § "npm-test-before-complete"` gained a new dated history
line ("prune applied via U1-p ballot... awaiting Peter's ratification and the U1-p merge") and the
`education.disposition` field was updated from "candidate prune PRODUCED... NOT applied" to "prune APPLIED... pending
ratification" — a minimal, accuracy-preserving edit (the field's schema purpose is "what the education layer
keeps/authors/prunes for this rule," which was now stale if left unedited). `check_state` was left unchanged
(`armed`) — the verification barrier's state does not change with this prune, only the education-layer prose does.

---

## Window-Opens-at-Merge Note

The Task 3.1 observation window (N=20 ordinary merged PRs, first-push failure rate, re-accretion scans, staleness
tallying) **has not opened yet** — it opens at the U1-p unit's merge, per tasks.md's Post-Completion instruction and
the ballot's own Application § step 3. Nothing in this task starts that window early; the branch/PR state is
pre-merge staging only.

---

## What Was NOT Done Here (out of scope for Task 2)

- No commit, no `complete-task.sh` invocation, no PR opened — per explicit task instructions, the coordinator
  handles git and PR opening once the ballot is ready to present to Peter.
- The ballot was **not** marked RATIFIED — that is Peter's act, recorded by whichever session receives his
  ratification.
- Task 3 (window execution + closeout) is untouched — this task's scope ends at staging the prune + its evidence +
  the ballot for presentation.

---

*Completed by Thurgood, 2026-07-14, on branch `task/125-B-u1-p`.*
