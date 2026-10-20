# Issue: committed `token-index/semantics.yaml` is stale against `generate` (since #202)

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Ada
**Trigger**: next Ada session after the Spec 123 U1 unit PR merges. Sooner if it blocks anyone.
**Source**: observed repeatedly during Spec 123 U1 (Tasks 3, 4 and the Task 1 fix-up) and in Lina's fresh-main worktree (#209).

## The defect

Running `npm run build` (whose prebuild runs `generate:*`) on a clean `main` rewrites `token-index/semantics.yaml`, which now lists Container-Base as a consumer of three colour tokens. It also touches `docs/tokens.css` (timestamp only) and leaves an untracked `token-index/meta.json`.

Most likely cause: #202 corrected Container-Base's schema colour list (to `color.structure.*`), but the committed token index was never regenerated. Every agent that builds has to revert these files before committing.

## Scope

1. Regenerate and commit `token-index/**`. Confirm the Container-Base consumer entries match #202's schema.
2. Decide whether `token-index/meta.json` (new in Spec 123 Task 1.5, which records `tierDir`) belongs in the committed index or in `.gitignore` for this repo. Spec 123 design C3 / DD24 is the authority. If the decision should wait for U1 to merge, coordinate with the U1 branch.
3. Consider a CI check that `generate` over a clean checkout leaves `token-index/**` unchanged, so the drift can't recur silently.

## Filed by

Steward (main-loop), 2026-09-26.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 24, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: The owner decides. The drift was absorbed at the 15.0.0 release PR (#271, `9e1a3106a`; the 15.0.0 grant's `token-index/**` line names this file). Fix items 2–3 (root cause; a clean-checkout CI check) are not evidenced, so the record may close or stay open. Proposed `manual` · `P3 improvement · defect`.
