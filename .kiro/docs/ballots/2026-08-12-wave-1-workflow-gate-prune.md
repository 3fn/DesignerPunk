# Ballot Measure: Wave 1 prune — workflow-gate imperative restatements (U1b, rules C1/C2/C3)

**Date**: 2026-08-12
**Author**: Thurgood (Civitas steward) / Spec 125-B Task 5.2 (U1b Wave 1, 5.W step (c))
**Status**: **DRAFT — awaiting Peter's ratification.** Per the ballots README record-first protocol, ratification (Status update + commit) precedes the wave PR's merge; the merge is the application.
**Purpose**: Apply Wave 1's ratified candidate prune diff — seven hunks removing or rewriting the imperative restatements of three workflow-gate rules whose *what* the platform has mechanically owned since 125-A — while retaining every consequence-education clause verbatim. Executes tasks.md 5.W(c) under the campaign law settled at PR #112 and the at-scale parameters ratified in the U1 closeout verdict ballot (2026-08-02).

---

## The Rules (ratified register rows — Peter, record-first, commits `3c729da2` + this branch)

| Rule | Register row | Gate (mechanical since) | Wave action |
|------|--------------|------------------------|-------------|
| C1 never-commit/push-to-`main`; work lands via PR | `governance/classification-map.md § "commit-to-main-via-pr-only"` | Branch protection on `main`, admins included (125-A, 2026-07-05; admin-rejection proven) | 4 deletions + 1 rewrite (TCP) + 1 tail deletion (PDW) |
| C2 squash-merge-only | § `"squash-merge-only"` | Repo merge-method config: squash-only (125-A, 2026-07-05) | 1 lead rewrite (TCP:80) — **TRIAL-EXEMPT by Peter's recorded ruling** (unscoreable by construction in a control arm; rides on probe evidence + window backstop; per-case, never-prune-untested stands for trial-coverable rules) |
| C3 typecheck/build green at merge | § `"typecheck-build-green-at-merge"` | `lane-typecheck` + `lane-build-validate` required checks (armed 2026-07-10) | **ROWS-ONLY — zero imposters found; no prose changes.** The row documents the clean state so future waves do not re-litigate |

Sizing rationale (Req 10.4, from the 5.2 fill slots, corrected at (a)): 3 rules, one shared workflow territory; a single PR-flow-traversing battery task covers C1 fully and C3 informationally; C2 was never trial-coverable (the exemption ruling, surfaced by the Stacy consult, resolved this explicitly rather than softening the rubric).

## The Edits (7 hunks, 2 files — applied verbatim from `wave-1-candidate-diff.patch` as re-derived post-#118)

Full clause-grain scoring with per-surface KEEP counts: `completion/u1b/wave-1-assessment.md` §2. Summary:

- **W1-1** TCP:40 — DELETE sentence-final "Never commit to `main`." (the retained prose already routes commits to a branch twice: TCP:40's own branch instruction + TCP:73).
- **W1-2/3** TCP:51/:61 — DELETE the "; never push to `main`" half-clause ×2; **"Never merge your own PR" halves retained verbatim** (NOT gate-owned until U3 — the deliberate control group).
- **W1-4** TCP:124 — DELETE "and NEVER push to `main`" half-clause; merge-half retained.
- **W1-5** TCP:151 — REWRITE imperative to descriptive: "Never merge your own PR. Pushes to `main` are rejected by branch protection (admins included)."
- **W1-6** TCP:80 — REWRITE lead only: "The repository is configured **squash-merge-only** (method drift closed by configuration, not convention)." — ONLY-ness stated once, descriptively; all post-dash education retained (context re-derived after #118 edited the same line; delta context-only, assessment §3 note).
- **W1-9** PDW:249 — DELETE the "— never `main`" tail; the retained instruction already names the branch as the push target.

**Explicitly preserved throughout**: "Direct pushes to `main` are rejected by branch protection, admins included" (education about the gate); all branch/PR-flow how-to prose; every "Peter merges on green" / "Never merge your own PR" clause (U3 territory, untouched); all squash consequence-education (atomic history, title = commit subject). **Generated surfaces**: the 122 generator was re-run after the edits — **zero output delta** (no generated prompt embeds the cut content; `canonical/generated.lock` does not track PDW), the assessment's stated expectation confirmed, not an anomaly.

**Late-found adjacent hit, explicitly deferred (not silence)**: `governance/Test-Development-Standards.md:1472` is adjudicated in **Wave 2** with its surface, recorded on the `npm-test-before-complete` row's history at (a).

## Evidence Chain (attached, not re-litigated)

1. **Register rows** ratified record-first (Peter, 2026-08-02/12) including the C2 trial-exemption ruling made at row ratification after plain-language review of the alternatives.
2. **Pre-merge A/B probe** (`completion/u1b/wave-1-probe-evidence.md`): pilot scenario (proven C1-territory-eliciting), two arms, three-leg substitution verified with positive controls — this wave's docs-MCP leg LIVE (served PDW P5 flip). **Verdict: NO GROSS LOSS DETECTED** — R1'-C1 PRESENT/PRESENT; the pruned arm spontaneously cited the retained education in its rewritten descriptive form.
3. **Cloned-agent behavioral trial** (`completion/u1b/wave-1-trial-diff-table.md`): execution-grain, the pre-committed #98-replay fallback (fallback grounds recorded), fully isolated clones with local bare origins (the pilot's stash-leak channel closed by construction), serialized, integrity verified at start AND end of every run, **zero voids**. Relevance gate PASSED (control R1'-C1 PRESENT: `git switch -c` → commit → push → PR-open attempt, all before the completion signal). **Verdict: NO-DIFFERENCE-DETECTED** on every rubric action (1 valid pair). Pre-committed consequence, stated before any run: *"NO-DIFFERENCE-DETECTED → proceed to the prune PR (the window remains the in-the-wild backstop)."*
4. **This session's application-time re-verification on the live surfaces**: all five Wave-A2 patterns → ZERO hits across TCP, PDW, core-goals, BUILD-SYSTEM-SETUP, `CLAUDE.md`, and every generated `.claude/agents/*.md`; retained education verified present (the descriptive rewrites + the kept clauses); "Section Citation Guard" checker PASS (173 citations resolve); 122 `diff-guard` full-run-green; sweep-1 PASS; full `npm test` + `tsc` green (results recorded in the wave PR body).

**What this chain does NOT claim**: probe and trial are bounded early tiers ("no difference detected in 1 paired valid run on 1 battery task"), not "prune proven safe." The **wave-1 window** (N=10 observed PRs, opens at this ballot's application merge) is the in-the-wild backstop; the shared campaign-W1 window measures first-push failure against baseline B.

## The Counter-Argument (recorded, not hidden)

**Against pruning on this sample**: ONE valid pair — half the pilot trial's already-small sample. R4'-C1 (correction-on-violation) never became applicable in either arm, so the trial supplies **zero evidence** about correction behavior. Both trial agents explicitly discovered the trial staging (traced the staging revert to the assessment's own §4) — a stronger form of the standing prune-awareness caveat: a Hawthorne effect (performing the flow *because* observed) cannot be excluded, only noted as symmetric. A more conservative posture would run the second permitted pair, or hold the prune for the window.

**Why proceed anyway**: the consequence was pre-committed before any run precisely so a clean result is not retroactively re-litigated; the caps discipline (ceilings, not quotas; pair 2 is criteria-driven) says stop when no criterion demands confirmation — and none does: the pattern was identical on every rubric action, with rich, cited, execution-grain evidence on the load-bearing rule. The Hawthorne caveat cuts BOTH directions equally (both arms were aware; the comparison is differential). The window exists *because* the trial is deliberately not treated as sufficient — and the revert is a single squash-commit revert if the window surfaces what the trial missed. The asymmetry favors proceed-with-backstop.

## Revert Path (5.W(c) requirement)

1. `git revert` the wave-1 unit's squash-merge commit on `main` — restores both edited surfaces in one action; re-running the 122 generator is a no-op by construction (zero embed) but is run anyway per the generated-surface sequence; docs-MCP `rebuild_index` re-serves the restored PDW.
2. The three register rows' `education.disposition`/`history` updated to record the revert, its trigger evidence, and tightened imposter-test criteria per the protocol's DIFFERENCE-DETECTED consequence applied via the window.
3. **The wave window is the detection mechanism** — W1 first-push failures against baseline, W2 re-accretion grep over the frozen Wave-A1 surfaces / Wave-A2 patterns, per observation pass. No separate monitoring; the window IS the monitoring.

## Window Mechanics at This Merge (for the record)

- Wave-1 dataset (`completion/u1b/wave-1-dataset.md`) is created at this PR's merge (wave-open): prune-merge SHA/time header; frozen Wave-A1 (5 surfaces) + Wave-A2 (5 patterns) from assessment §5; observed-PR table to N=10.
- The shared campaign-W1 window opens with wave 1 (first wave); the wave-open pass re-checks baseline staleness per protocol §4 (qualifying PRs merged since B's computation → mechanical recomputation, both values recorded).
- **Required-check set note**: "Section Citation Guard / section-citations" was armed required 2026-08-12 BEFORE this merge (measurement-free, no window open — recorded on its register row). The campaign's frozen check set is therefore 19 contexts at wave-1 open; recorded in the campaign dataset header at the open pass.
- Campaign-endogenous events (this merge, wave ballots, roster PRs) do NOT segment the shared window; exogenous events only (Peter's ruling, 2026-08-02).

## Reviewers

Consistent with the pilot prune ballot: content is Civitas-governance-law only; Stacy's process-owner consult was exercised at (a) (recorded in the assessment, zero declined) and her R1'-C2 catch became the exemption ruling; presented directly to **Peter** for ratification. The PR stays Peter-merged under the standing governance carve-out regardless of any future merge delegation.

## Application (record-first)

1. Peter ratifies → Status updated to `RATIFIED (Peter, <date>)` and committed on `task/125-B-5-2-wave-1` before the PR merges.
2. The prune is **already staged** on the branch: 7 hunks applied; generator re-run (zero delta, expected); `Last Reviewed` bumped on both edited docs; register rows updated (dispositions + dated history lines); full verification re-run.
3. **The ratified merge of the wave-1 PR is the application** — no separate apply step.
4. Post-merge: docs-MCP `rebuild_index` (PDW is MCP-served; must serve the pruned text); wave-1 dataset + campaign dataset opened per § "Window Mechanics"; the wave-1 window (N=10) begins counting.
