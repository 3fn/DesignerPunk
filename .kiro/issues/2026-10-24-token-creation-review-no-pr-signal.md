# "Creating any token requires human review": in practice the review is Peter's merge, and nothing marks a PR as adding or removing tokens

**Date**: 2026-10-24
**Owner**: Ada (token-creation governance; the candidate instrument diffs `token-index/`, which my pipeline generates)
**Found by**: Ada, Spec 131 R1/R2 reads (`.kiro/specs/131-governance-simplification/feedback/design-outline.md` § "[ADA R1]" (b) item 5; § "[ADA R2]" proposal 1). Spec 131's outline already names it: `.kiro/specs/131-governance-simplification/design-outline.md` § 3 row 18b ("Unmeasured in practice: it is Peter's merge, and nothing marks a token-adding PR"). Re-read at `e4e61eea2`.
**Class**: P2 obligation (guard) · defect *(set 2026-10-24, Ada, rule 12. The claim is "Creating ANY token … requires human review" (`governance/Token-Governance.md` L184; `.kiro/steering/core-goals.md` L59). The only guard is a Peter merge of a diff in which a new token is one hunk among many, with no line that says a token was added or removed. A guard weaker than its claim. Not P0: no text says the review has a marker. The surviving argument for P3: Peter reads every merge, and no unreviewed token is known.)*
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken in (as row 18b's instrument) or left out with a reason. *(Set 2026-10-24, Ada, rule 9. Spec 131 has no `requirements.md` (`ls` → `design-outline.md`, `evidence`, `feedback`, `synthesis-2026-10-23.md`), and its outline names this item, so its first requirements commit is the intake read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" owes: an event under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2, question 2. Counter-argument: Spec 131 is paused until Spec 129 progresses, so a P2 (guard) waits with no date; `release:next:phase-1` would give it one. What survives: the instrument is a 131 design question (pack-diff or PR line), and a release deadline would escalate it to Peter before the spec that decides its shape has run.)*

---

## What exists — VERIFIED

- The rule: Token-Governance § "Token Creation Governance", "Universal Rule: Human Review Required" (L184), and the creation checkpoint format (L188–212).
- The practice: a token is created by editing `src/tokens/**` (or a `*.tokens.ts` file) and regenerating `token-index/`; the PR is merged by Peter. No PR template, check or tooling line names tokens added or removed: `grep -rln 'token-index' .github/ .kiro/hooks/complete-task.sh` → no match: nothing in CI or the completion tool mentions `token-index` (UNVERIFIED beyond that grep).
- test01 F-4 is a removal nobody saw: 35 → 10 component tokens, silently (`[ADA R2]` proposal 1). Cited as evidence only; F-4 itself is not filed here (Peter: the test01 CLI findings route after 16.1.0 ships).

## Fix shape (one line; not done here)

A generated tokens-added / tokens-removed list, diffed from `token-index/` (last tag → candidate, or base → head), in the pack-diff or the PR body (my R2 proposal 1). Removal stays Peter's read.

## Readers (trust, but verify)

- **Peter**: the merge is the review today; whether the list is what he would read.
- **Thurgood**: Spec 131's author; where the line lives (pack-diff or PR body).
- **Stacy**: a claims pass could count it.

**No fix is authorized by this record.**

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: the header lines against README rules 1, 9, 10 and 12, and ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2 and § 4 step 6. Claim citations: Token-Governance L184 and core-goals L59 → quoted right. Ran the intake grep (Process-Spec-Planning § "Before Formalizing") → this file matches 131's `<dir>`, and it matches 129's too.
- Finding: form only, not the merits. form: ok. Owner present. Class is `P2 obligation (guard) · defect`, with one sub-tag. Trigger is one backticked `path:` token on 131's `requirements.md`, a lawful intake event. Filer is self (no rule-10 naming owed). Note for the owner: 129's intake will also list this record and owes it a disposition line, likely `leave`.

— Thurgood, 2026-10-24

## Review (2026-10-24, Stacy) — trust, but verify
- Checked: `sed -n 180,212p governance/Token-Governance.md` → the claim "Creating ANY token … requires human review" is at L184, as cited. The "Creation Checkpoint Format" (L188–212) is an in-session message from an agent ("Awaiting your decision before proceeding"), not a PR artifact, so where it is followed it leaves no committed trace. `grep -rln token-index .github/ .kiro/hooks/complete-task.sh` → no match, which reproduces. I widened the grep: `scripts/release-publish.ts` L337 runs `verify:token-index-clean`, and `scripts/pack-assert.ts` ships `token-index/`. Both check that the index is regenerated and committed. Neither lists the tokens added or removed, so the record's "nothing marks a PR" holds.
- Finding: **agree** with the Class `P2 obligation (guard) · defect`. The claim is human review, and the only guard is a merge of an unmarked diff, which is a guard weaker than its claim. **P0 read: n/a.** No served text claims a marker or a recorded review, so no reader is told something false. I also find the P3 counter-argument weaker than it looks: "no unreviewed token is known" is exactly what an unmarked guard cannot know, and test01 F-4 (35 → 10) is a removal that went unseen. The path trigger on Spec 131's `requirements.md` is acceptable as an event. Since Spec 131 is paused, the record has no date, but at its first lapse a P2 `(guard)` goes to Peter (rule 11), so it cannot drift silently. On the claims-pass side: a pass can count token-key changes per PR from git (`git diff <base>..<m> -- token-index/*.yaml`) with no new instrument. That is an audit read after merge, never the guard. The guard's shape stays Ada's and Spec 131's.

*Signed: Stacy, 2026-10-24.*
