# Issue: no agent charter lists `.kiro/issues/**` in its write scope, yet owners author and close issue files — and two grant-rule advisories from Stacy's #257 ARMING read

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Thurgood (the issues-dir convention's owner, `.kiro/issues/README.md`; the grant rule's ballot author). **Decision**: Peter, by ballot where a charter or the README changes (`.kiro/docs/ballots/README.md`).
**Trigger**: `release:next:phase-1` — the ruling on the A-1/A-2 DRAFT ballot (`.kiro/docs/ballots/2026-10-20-grant-ci-deletions-and-activating-merge-read.md`) and its application close this record, no later than the next release's S. Re-ruled 2026-10-20, Thurgood (owner), on Peter's fix-now (§ "Outcome (2026-10-20)"); rule 11 [a]: a lapse returns without fix-now.
**Superseded trigger (re-ruled 2026-10-20; verbatim)**: `manual` — Thurgood's next ballot sitting, with the A-1 and A-2 drafts in front of Peter. The gap half is executed: ballot `2026-10-17-standing-write-scope-six-roots`, ratified #393 (`b1112d2e1`) and applied at `096e11f99`. A-1 and A-2 remain. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: **the next ballot-drafting pass, or the monthly health-check walk, whichever comes first.** Both are events, never a date. The walk is named because this issue is exactly the kind of root item the active-charter walk reads for fired-without-record.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-20, Thurgood, rule 12. A-2 is a missing detector: an issue-row grant's activating merge is read by nobody. A-1 is a CI-path clause that no in-place replacement can meet.)*
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

**Walk 2026-10-17 — the trigger fired (the monthly walk came before any ballot-drafting pass).** No ballot draft exists. The gap has widened beyond `.kiro/issues/**`: code roots with a de facto owner and no charter write scope include `tools/agent-generator/**` (surfaced again at #389), `mcp-server/src/**` (see `2026-10-02-docs-mcp-logs-dir-cwd-relative.md`), `scripts/**`, `src/cli/**` (Lina's CLI surface) and `.kiro/hooks/**`. **Class option: ONE ballot** that makes the charters' stated write scope match the ownership practised (option 1 or 2 below, decided per root), not one ballot per path. Owner: Thurgood drafts; Peter rules. New trigger: Thurgood's next ballot sitting, and in any case before the next PR that needs a grant only because of this gap.

## Lapse (2026-10-20)

Firing commit: `3b84122c9` (#413, ballot sitting 2 ratified, 2026-10-19), the first ballot sitting after rule 11's application (`c470a248f`). It passed without the A-1/A-2 drafts. The 2026-10-18 sitting (#407, `71bbd1085`) came before `c470a248f` and is not counted. **Lapse count: 1.** Rule 11: the first lapse of a P2 `(guard)` record goes to Peter with spec, drop or fix-now. It is in the walk's Peter batch (ledger, PETER item 7). — Thurgood

## Outcome (2026-10-20) — fix-now, split by kind

**Peter, 2026-10-20** (chat, relayed by the orchestrator), on the walk's PETER item 7 (ledger `archive/TRIAGE-2026-10-20.md`): *"fix it now"*.

Both advisories are LAW, so neither ships by fix-now as an edit:
- A-1 changes what Stacy's ARMING row requires (`canonical/agents/stacy.md`, operationalizing ballot `2026-09-27-ci-regime-standing-scope` § 3).
- A-2 adds a requirement to README rule 8 and a read to the steward's LIVENESS item. There is no grant template to edit; "at both merges" is in grant records by practice only (since `archive/2026-10-12-discovery-study-stage1-docs-charter.md`).

**What shipped now**:
- **DRAFT (record-first)**: both items as one micro-ballot, `.kiro/docs/ballots/2026-10-20-grant-ci-deletions-and-activating-merge-read.md`. Stacy is the required reviewer. Forks F-1 (the deletions-clause form) and F-2 (LIVENESS or RELEASE) are Peter's.
- **EXECUTION**: none to governance text. Records only: this outcome and the Trigger re-rule above. A-2's query ran once at `076e947da` as the draft's evidence (147 output lines, a superset; about ten records name a `.github/**` path in a `**Grant paths**:` list, by a heuristic filter). Whether each activating merge got its ARMING read is Stacy's to read (Q5), not the steward's.

The record stays at the root until the ballot is ruled and applied, then closes by rule 5. — Thurgood

- **2026-10-20 (Thurgood), R2**: the DRAFT ballot folds all eight of Stacy's R1 amendments, her two corrections and her #243 evidence (A-2's second instance, Low, no remedy owed). It also finds that the draft's `-S` query missed #332. Both forks are still Peter's, and both recommendations, now joint, are F-1 (b) and F-2 (i). Nothing is applied.

## Outcome (2026-10-21) — ruled and applied; closed

- **Ruled**: Peter, 2026-10-20, in chat: "Let's proceed with revised option 2 as recommended." — F-1 (b), F-2 (i) (ballot § 7, record-first at `85c2e79db`).
- **Applied** on branch `chore/sitting-3-peter-gated-and-grant-reads`, in the PR that carries this outcome: site 1, Stacy's ARMING row (A-1) and LIVENESS row (A-2), her ratified text byte for byte, re-confirmed and re-signed in her own seat commits; site 2, README rule 8; site 3, Thurgood's LIVENESS item 4 and its query; site 4, ballot 2026-09-27 § 3's dated line; site 5, the register history line. The ballot's § 8 ledger carries the commit SHAs.
- **Closed** by rule 5 at this PR's merge, which is an ancestor of the next release's S, so the `release:next:phase-1` token is met on time. Archived in the same PR. — Thurgood
