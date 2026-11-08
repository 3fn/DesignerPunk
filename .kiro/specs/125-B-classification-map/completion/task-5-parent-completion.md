# Task 5 Parent Completion: U1b — Map at Scale

**Date**: 2026-11-08 (written at the U3 re-home; the campaign itself closed at #168, 2026-09-18)
**Spec**: 125-B-classification-map
**Type**: Parent (campaign phase; its units are 5.1–5.6, each merged as its own PR)
**Unit**: this tick rides the 125-B tasks amendment PR (step 3 of the U3 re-home, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md` item 4). No campaign work is in this PR.
**Delegated-tier**: plan held — Task 5 carries no parent-level `**Agent**:` stamp; each unit's planned → actual is recorded in its own completion doc (`task-5-1-completion.md` … `task-5-6-completion.md`); this parent doc is written by Thurgood (Opus)
**CI-provenance**: local
**Instruments**: none — success criteria declared none
**Validation**: Tier 2 — inspection of the six merged units and their records (below); no code changed by this tick

---

## Why the parent is ticked now

Every unit of Task 5 merged by 2026-09-18, and Peter's campaign verdict was **COMPLETE** (`.kiro/docs/ballots/2026-09-18-u1b-campaign-closeout-verdict.md` D1). The parent checkbox was never ticked: 5.6's closeout PR ticked 5.6 and left the parent for 125-B's own close, and Task 6 (U3) held the spec open. With U3 re-homed to its charter, the parent is ticked here so 125-B can close.

## Success criteria

Task 5 had no criteria block. This amendment declares `**Success Criteria:** none — <reason>` in `tasks.md`: the campaign's acceptance is its closeout verdict ballot (D1) and each unit carried its own parent-grade docs (the campaign law's "Documentation grade" clause). The criteria table is waived; the declaration is dated in `tasks.md` so no reader takes it for original.

## The units, as merged

| Unit | PR / squash | Record | Outcome |
|---|---|---|---|
| 5.1 Campaign roster + measurement arming | #113, `5ea404e58` | `completion/task-5-1-completion.md`; `completion/u1b/campaign-plan.md`, `campaign-measurement-protocol.md` | 11 candidate rules rostered; campaign baseline B = 2/20 computed before the first prune; measurement law recorded in the register's Methodology Notes |
| 5.2 Wave 1, workflow-gate | #124, `cbf9929c9` (prune); passes #125, #131, #135, #149 | `completion/task-5-2-completion.md`; `u1b/wave-1-*` | Prune of C1–C3 imposters; W2 MET, W3 zero, one INDETERMINATE row held (#148 outage) |
| 5.3 Wave 2, component/test-governance | #133, `1301c2de1` (prune); pass #149 | `completion/task-5-3-completion.md`; `u1b/wave-2-*` | C4 prune; W2 MET (weaker evidence, stated), W3 zero |
| 5.4 Wave 3, artifact-integrity | #160, `d0f709f9f` | `completion/task-5-4-completion.md` (retrospective, cured at wave 4) | Rows-only on C7–C9; W2/W3 N/A by construction |
| 5.5 Wave 4, register maintenance | #167, `13b0d474e` | `completion/task-5-5-completion.md`; `u1b/wave-4-*` | Rows-only; `no-disabled-states` row; C11 state confirmations, incl. the `record-first-ratification` barrier scope held at `proposed` |
| 5.6 Campaign closeout | #168, `4024fdbef` | `completion/task-5-6-completion.md`; `u1b/campaign-closeout.md`; ballot `2026-09-18-u1b-campaign-closeout-verdict.md` | Shared W1 MET (f = 0 over 36 observations vs B = 2/20); campaign COMPLETE (D1); autonomy dial re-deferred (D2) |

The `5.W` template line in `tasks.md` stays `- [ ]`: it is the wave template the units instantiated, not a task. It is indented, so it is not a parent (`scripts/owed-set.sh` counts `^- \[.\]` only).

## Additional verification

- The six units' squash commits are on `main`'s first-parent history: `git log --first-parent --format='%h %s' origin/main -- .kiro/specs/125-B-classification-map/completion/task-5-*-completion.md` lists #113, #149, #167, #168, and the wave PRs #124, #133, #160 appear in `git log --first-parent --grep '125-B'`.
- The closeout ballot reads RATIFIED: `.kiro/docs/ballots/2026-09-18-u1b-campaign-closeout-verdict.md`, first `**Status**:` line.

## What Task 5 hands on

- The register's methodology notes and the rows the campaign added stay in `governance/classification-map.md`.
- The `record-first-ratification` gated-surfaces scope stays `proposed`; its deliverer is now the charter `.kiro/issues/2026-11-08-125b-u3-governance-layer.md` (ballot `.kiro/docs/ballots/2026-11-08-125b-u3-rehome.md`, applied in this PR).
- The autonomy dial's re-deferral trigger (D2) is unchanged.
