# Issue: no agent charter lists `.kiro/issues/**` in its write scope, yet owners author and close issue files — and two grant-rule advisories from Stacy's #257 ARMING read

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Thurgood (the issues-dir convention's owner, `.kiro/issues/README.md`; the grant rule's ballot author). **Decision**: Peter, by ballot where a charter or the README changes (`.kiro/docs/ballots/README.md`).
**Trigger**: **the next ballot-drafting pass, or the monthly health-check walk, whichever comes first.** Both are events, never a date. The walk is named because this issue is exactly the kind of root item the active-charter walk reads for fired-without-record.
**Source**: Spec 123 U2b's execution (2026-10-01 to 2026-10-02), where this surfaced three times in one unit; Stacy's ARMING read of #256, `.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-02-pr256-workflow-comment-grant.md` (landed as #257, `79cb787c`), § "Standards implications" items 1 and 2 (A-1, A-2).

---

## The gap (read)

- **No charter lists `.kiro/issues/**` as a write path.** Read from `origin/main`'s generated charters:
  - Thurgood (`.claude/agents/thurgood.md` L897–899): `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`, `.github/workflows/lane-timing.yml`.
  - Lina (L421): `src/components/**`, `.kiro/specs/**`, `docs/specs/**`, `application-mcp-server/**`, `governance/component-meta-authoring-guide.md`.
  - Ada (L436): `src/tokens/**`, `src/validators/**`, `src/generators/**`, `.kiro/specs/**`, `docs/specs/**`.
  - Stacy (L826): `.kiro/specs/**`, `docs/specs/**`.
  - Leonardo, Sparky, Kenya and Data: the path appears nowhere in their charters.
- **Practice runs against that.** Owners author and close issue files on a `chore/` branch, and Peter's merge of the PR is the authorization (precedents this unit: #247, #250, #253, #258, and the closing and filing PRs of 2026-10-02, authored by Thurgood, Lina, Ada and Stacy). Nothing is violated mechanically, because write scope here is behavioral and the merge is the gate. But the written rule and the practice disagree, and the disagreement has a cost: the lock-refresh grant (`archive/2026-10-01-task-18-lock-refresh.md`) assumed its owner could append a trigger log to the file, which he could not, and a witness could not record her go in it either. The log had to move to a spec path (amendment A6, #258).

## The class item

Either:
1. **Charters gain scope over their own issue files** (a path pattern would have to name "files whose `**Owner**:` is me", which a glob cannot express, so this probably means `.kiro/issues/**` for the system seats, and a decision on the product seats); or
2. **The README records the practice as the rule**: issue files are authored on `chore/` branches by their owner, and Peter's merge is the authorization. No charter change.

**My lean, labelled as mine**: option 2 as the smaller change, because it records what already works and keeps every write inside a Peter-merged PR. **What survives against it**: it leaves the charters' stated scope false in practice (an agent reading its own charter concludes it may not write there), and a record that depends on a convention rather than a rule is the shape that rots. Option 1 fixes that but widens four charters at once and needs a ballot per charter surface. This is a fork between defensible options; the pick is Peter's.

## Stacy's two advisories from the #257 ARMING record (folded in)

- **A-1 — an unsatisfiable CI-path clause.** The rule "`--numstat` deletions `0` on CI paths unless the grant names the act" (ballot `2026-09-27-ci-regime-standing-scope`) cannot be met by any in-place replacement. #256 passed only because its grant's "The fix" section said "Replace". Her suggested more decidable form: "deletions `0`, or every deleted line is a comment line the grant names". One instance so far, and the clause failed toward the grant, not against it. Ballot-author's work (mine), to Peter.
- **A-2 — no detector for the activating merge of an issue-row grant.** The population is greppable: `git log --first-parent -S'**Grant paths**:' --name-only -- .kiro/issues`. Her cheap fix: the grant-issue template's ARMING paragraph says "at both merges" (the activating PR and the fixing PR), and the RELEASE or LIVENESS step runs that query; she does not recommend a script for one instance. Her F-1 counter-argument adds that the next grant's activating PR should carry the ARMING line in its own body, so the read is prompted by the PR.

## Not in scope here

Any charter edit, README edit or ballot text. This issue is the tracked flag; the drafting is the trigger event's act.

## Filed by

Thurgood, 2026-10-02, in the U2b closeout bookkeeping PR.
