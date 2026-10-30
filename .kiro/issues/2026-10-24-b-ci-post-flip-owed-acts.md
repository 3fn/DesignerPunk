# B-CI's acts owed at the parity flip were not made: rule 5's re-evaluation, the dispatch set, and the register-row decision

**Date**: 2026-10-24
**Status**: ACTIVE — the three acts are carried as LAW items in a DRAFT ballot (below). The descriptive text that called them current was corrected on 2026-10-24 (§ 3).
**Owner**: Thurgood (author of ballot B-CI and its § 4 guide text; owner of `.kiro/hooks/complete-task.sh` and of the `completion-criteria-parity` instrument)
**Trigger**: `release:next:phase-1` — the release walk reads this record: each item ruled by Peter, or carried by a dated re-rule. *Start condition (prose)*: the DRAFT ballot `.kiro/docs/ballots/2026-10-24-ballot-audit-fix-now-law.md` (branch `chore/ballot-audit-fix-now-law-draft`) is reviewed and put to Peter. When its PR exists, the owner re-tokens this line to `merge:#<N>` of the PR that applies it.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-24, Thurgood, rule 12. `(guard)`, not `(record)`: since 2026-10-03 a `branch-head dispatch` line with no `; not green:` tail asserts, under rule 4, that every required context was green at `<S>` — but `completion-criteria-parity`, the 19th, is never dispatched, so no dispatch line can show it. The line claims more than any run measured. A P2 `(guard)` escalates at its first lapse, rule 11.)*
**Source**:
- Ballot `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` (RATIFIED, Peter, 2026-09-27): rule 5 ("Rule 5 is re-evaluated at that flip, before it lands"); § 9 step 5 ("Decide whether a `governance/classification-map.md` row is owed … This is decided at ratification").
- The dispatch exclusion: `.kiro/issues/archive/2026-09-27-unit-branch-ci-feedback.md` (the `completion-criteria-parity.yml` bullet), decided while the check was "not required".
- The flip: register row `completion-criteria-parity`, history 2026-10-03 ("FLIP, RECORDED"); `tools/agent-generator/verify-gate-registration.sh` `EXPECTED_COUNT=19`; `.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-03-parity-flip.md` (no rule-5 or provenance read in it).
- The finding: Spec 131 ballot audit `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md` § 4 items 3 and 6, with Stacy's cross-check ("its event has passed and the rule was not applied … Owed register row: confirmed missing").
**Consulted**: none needed — filing only

---

## 1. The three owed acts

| # | Act | Where it was owed | State |
|---|---|---|---|
| 1 | Re-evaluate CDG § "CI provenance" rule 5 (its premise "no required check reads those paths" stopped holding at the flip) | B-CI rule 5, "at that flip, before it lands" | Not done at 2026-10-03. LAW: carried as ballot item 1 |
| 2 | Decide whether `completion-criteria-parity.yml` joins the dispatch set (`REQUIRED_WORKFLOWS` in `complete-task.sh`) — and, either way, what a dispatch line asserts about the 19th context (rule 4) | The archived B-CI issue's exclusion, decided while the check was not required; `complete-task.sh`'s own C9 note ("If that script's workflow set ever changes, this array moves with it in the SAME recorded change") | The workflow set changed at the flip (six → seven files producing 19 contexts) and the array did not move. LAW (a required gate's trigger, enforcement code): ballot item 2 |
| 3 | Decide whether a `ci-provenance-line` register row is owed | B-CI § 9 step 5, "decided at ratification"; the BR roll entry: "not ruled at ratification and is carried open" | Never decided. Adding a row is LAW: ballot item 3, a fork for Peter |

## 2. Open for Peter

Item 3 is a question to Peter, never answered: does B-CI owe a `ci-provenance-line` register row? The steward's read at ratification was **yes**, at `check_state: proposed`. That read is carried into the ballot as a fork. Nothing is added to the register here.

## 3. Corrections made with this record (2026-10-24, branch `fix/ballot-audit-fix-now-corrections`)

- `governance/completion-documentation-guide.md` rule 5's premise sentence: "today's 18 contexts" → the 2026-09-27 count, the 2026-10-03 flip, and "the re-evaluation … was not made", pointing here. Rule 5's operative text is unchanged.
- `.kiro/hooks/complete-task.sh` comments and messages: "18 required contexts" → "18 of 19, from six of seven files", naming the excluded seventh and pointing here; "check_state: proposed — arming is Q2's" → armed, with the local mode's advisory status as decided at the 2026-10-02 sitting. The count-assert (six) and every behaviour are unchanged.

## Closing

Closes when Peter has ruled all three items (ratified, modified or rejected) and any ratified edit has been applied, by rule 5's dated outcome line in the applying PR.

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
