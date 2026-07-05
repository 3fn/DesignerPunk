# Inbound: 125-A Phase 0 Live → Spec 122

**Date**: 2026-07-05
**Source**: Spec 125-A Tasks 1–4 (ratified workflow ballot; gate live at merged PR #10)
**Status**: Facts + design constraints for formalization. Supersedes the "gate is future" framing in earlier notes — the gate EXISTS now; 122 formalizes and builds under it.

---

## 1. The gate is LIVE — and 122's checks inherit one hard constraint

`main` is branch-protected (required checks: "Consumer Guard", "Check package name drift"; `enforce_admins:true`, verified by a rejected admin push; squash-only; linear history). Registering a new check = a workflow job producing a named status context + one protection-list entry — the open-set mechanics 122's registrants (diff-guard, canonical-vs-truth, the seven sweeps, tool-boot smoke) plug into.

**The design trap (Req 2.3 of 125-A, now operative law): required checks SHALL NOT be path-filtered.** A path-filtered required context that never triggers sits "Expected" forever and blocks every merge. This forbids the diff-guard's *natural* design — "trigger when generated files change." **122's requirements must specify: the diff-guard (and every 122 check) runs unfiltered on every PR and exits fast/no-op when its subject didn't change.** Without this stated, the obvious implementation bricks the repo.

## 2. Task sizing has a new dimension: the reviewable PR

Under the ratified law, one parent task = one PR = one squash commit = one thing Peter reviews and merges (completion happens AT merge). 122's tasks phase should size parents so each diff is reviewable — per-agent cutovers (already the plan via per-agent-incremental) now have a review-surface justification, and any "regenerate everything" task must be decomposed or explicitly flagged as a large-diff merge for Peter.

## 3. `complete-task.sh` is a new shared capability-catalog member

Every agent's catalog gains the completion command (parent + `--subtask` modes) with its run-context annotation — a member the per-agent-ambient-design (Task 9, pre-dating the tool) doesn't carry. The old commands are tombstones; generated prompts must never reference `commit-task.sh` (sweep-5-class check at cutover). The completion-flow LAW reaches agents via the always-set (Task-Completion-Protocol § "Completion State in the PR Flow") — reference, don't copy.

## 4. Cursor: confirmed maintained runtime (ratified Item 10 MIGRATE)

Peter's ratification migrated (not deprecated) `.cursor/rules/designerpunk-core.mdc` — Cursor is a real, secondary, hand-maintained runtime with a mini always-layer. Strengthens the third-adapter case; its four Feb-2026 rules files (`components/specs/tests/tokens.mdc`, untouched since Feb 19) are ready-made drift specimens for when Cursor becomes a generation target.

## 5. Evidence bank: the enumeration saga

The ballot's surface count was corrected three times (11 → 12 → 15; the script that actually pushed was never on any hand list) and stabilized ONLY under draft-time mechanical re-grep. Strongest support yet for §8's sweeps-not-lists meta-finding — cite it when requirements formalize the sweeps.

## 6. Execution context for 122's own tasks

- Task types: the ratified four-type taxonomy applies (122 has many Documentation-type tasks — canonical-source authoring, port notes; Tier-2 escalation is CONJUNCTIVE: contract semantics AND cross-spec dependency).
- 122's formalization proceeds NOW (during the 125-A bake-in — its artifact PRs are bake-in data); the heavy BUILD starts after Group 2 arms the wholesale suite (full tsc + 8,987 tests as required checks), so the generator is built under the strongest gate the repo has.
- Law changes 122 needs (e.g., retiring the CLAUDE.md stopgap, OB-7) route via record-first ballots (`.kiro/docs/ballots/README.md`); checks-only merges are not ratification.
