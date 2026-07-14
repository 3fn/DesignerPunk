# Task 1 Parent Completion: U1-s — Pilot Substrate

**Date**: 2026-07-14
**Spec**: 125-B-classification-map
**Unit**: U1-s (first of the three "U1 Pilot" phase units)
**Validation**: Tier 3 — full `npm test` (377 suites / 8,987 tests, green) + full `tsc --noEmit --skipLibCheck` (clean)
**Coordination**: Claude Opus 4.8 (main loop) orchestrating; per-subtask agents/tiers below

---

## Success criteria — all met

| Criterion | Evidence |
|---|---|
| Register exists with compliant header, schema, pilot entries | `governance/classification-map.md` — scaffold (1.2) + three entries: `record-first-ratification` (1.3), `npm-test-before-complete` (1.4), `tool-boot-smoke` (1.6) |
| Measurement protocol authored + instrumented BEFORE any prune | `completion/pilot/measurement-protocol.md` (1.1) — committed `7bcc367d`, five commits before the trial ran; A1/A2 parameterized by 1.4 |
| Probe + trial evidence exists, citable by the U1-p PR | `completion/pilot/probe-evidence.md` (1.7, NO GROSS LOSS DETECTED); `completion/pilot/trial-diff-table.md` + `trial-transcripts/` (1.8, NO-DIFFERENCE-DETECTED) |
| Tool-boot smoke wired with calibration guard intact | `tests/tool-boot-smoke.test.ts` + `.github/workflows/tool-boot-smoke.yml` (1.6) — 49/49 local; returns-data exclusion normative in code comments; **flipping to REQUIRED is Peter's branch-protection action at merge** |
| crossRef re-point complete, sweep-1-verified | 1.5 — interim retired, two-ended reference complete, sweep-1 PASS locally (verified twice); in-PR CI provides platform confirmation |

## Subtask ledger

| Subtask | Agent (planned → actual) | Outcome |
|---|---|---|
| 1.1 Measurement protocol | Thurgood/Opus → as planned | Pre-committed rubric, criteria, decontaminated window, roll-up definition |
| 1.2 Register scaffold | Thurgood/Sonnet → as planned | Scaffold + schema docs; coordinator fixed the fence-inertness claim (resolver is not fence-aware — indent applied, doc corrected) |
| 1.3 Exp 2 authority row | Thurgood/Opus → as planned | First entry; 4 surface groups verified (16 generated prompts); zero imposters; 122-coordination discharged no-edit; `procedural` check_state question parked for closeout |
| 1.4 Pilot row + candidate diff | Thurgood/Opus → as planned | 11 clauses, recorded blade verdicts, clause separation held (Jest-not-Vitest untouched); S1 contributes zero hunks (enumeration corrected the plan); candidate NOT applied |
| 1.5 crossRef re-point | Thurgood/Sonnet → as planned | Interim retired; sweep-1 green (agent + coordinator independently) |
| 1.6 Tool-boot smoke | Thurgood/Sonnet → as planned | Side-effect confirmation NO HIT (43 tools, reasoned adjudication of the gitignored boot-log write); 49/49 incl. empty-index Product MCP passing; write-scope note recorded |
| 1.7 A/B probe | Thurgood/Sonnet → ran on session tier (delta recorded in its completion doc; work was rubric-mechanical as planned) | Blocked once on CLI auth — agent refused to fabricate, held the checkbox; resumed post-login; NO GROSS LOSS DETECTED |
| 1.8 Behavioral trial | Thurgood/Sonnet orchestrating; clones = Lina (both arms) → as planned | NO-DIFFERENCE-DETECTED; 4 valid / 3 VOID transcripts recorded honestly; R4 interpretive note flagged for Peter's Req 7.7 review |

## Pilot findings register (for U1-p and the closeout)

1. **Probe (describe-grain)**: NO GROSS LOSS DETECTED — pruned-arm agent still described full validation before landing.
2. **Trial (behavior-grain)**: NO-DIFFERENCE-DETECTED → pre-committed consequence: **proceed to the prune PR (U1-p)**; the window remains the backstop. Explicitly not "prune proven safe" (2 paired valid runs, 1 battery task).
3. **R4 interpretive note** (flagged, not buried): a maximally strict run-indexed reading of §2 would call R4 MIXED→INDETERMINATE; the adopted reading is §1's own N/A discipline (1.7 precedent). **Peter's Req 7.7 human review of the trial evidence is the check on that adoption** — it rides the U1-s PR.
4. **Infrastructure finding (U1b lesson, on the record)**: concurrent clones in same-repo worktrees share the repo-global `git stash` — cross-arm contamination voided pair 1; serialize runs + re-verify legs per run.
5. **126 dividend**: both valid arms produced work diffs, preserved as patches in `trial-transcripts/` for 126's own flow (quality-gate guard honored — the trial never adjudicated 126's shipping bar). The stale 126 outline status header ("awaiting Peter's option choice" — actually ratified 2026-07-09 per its feedback.md) should be refreshed by 126's implementation PR.
6. **Parked for closeout**: the `procedural`/`in-force` check_state enum question (1.3).

## Post-completion obligations (per tasks.md)

- Peter merges the U1-s PR → **flips `125B Tool-Boot Smoke / 125B-tool-boot-smoke` to a required check** (branch protection, Settings → Branches).
- Post-merge: trigger docs-MCP `rebuild_index` (governance/ is MCP-served; the register must be queryable); smoke **gate-bite proof** as a throwaway PR (125-A pattern).
- U1-p (Task 2, the prune PR) may then proceed on the trial's pre-committed consequence — ballot-gated, Peter-merged; the observation window opens at ITS merge.
