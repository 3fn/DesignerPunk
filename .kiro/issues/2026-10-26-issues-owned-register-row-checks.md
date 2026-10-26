# `scripts/issues-owned.sh` is in no register row's `checks`, so a ballot that changes rule 1 or rule 11 firing has no census reach to it

**Date**: 2026-10-26
**Owner**: Thurgood (owner of `scripts/issues-owned.sh` and of the `issues-obligation-lapse` register row's instrument). **Filed by**: Thurgood, under README rule 10, in the PR of ballot `.kiro/docs/ballots/2026-10-26-issues-multi-path-trigger-token.md` (§ 7 item 1). The obligation was stated, unfiled, in ballot `.kiro/docs/ballots/2026-10-25-rule-11-post-walk-filings-and-spec-answers.md` § 7 item 3 (merged at #492, `42397e5eb`): "add the script to the `issues-obligation-lapse` row's `checks`, which brings it under the census rule. That is a register change of mine, owed in a later round, not in this ballot's cap." An obligation stated only in a ballot note and citing no record is a rule-10 finding on #492; this record files it.
**Trigger**: `release:next:phase-1` — the PR that adds the script (with a census mode, or `census: none — <why>`) to the row's `checks` merges before the next release's RELEASE phase 1; at that walk this record is closed by a dated outcome line naming the PR, or carried (rule 1: a P2 that would ride a later change takes this token).
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Thurgood, owner, rule 12. The script implements rule 1 and rule 11 firing semantics, and the census rule cannot see it: a ballot that changes those semantics is checked against the script only if its drafter thinks to. Two ballots in two days did it by hand (2026-10-25 rule 11, and 2026-10-26 multi-path, the latter by a committed-vs-proposed run over every seat). The census rule is the guard here, and it is weaker than its claim for this instrument: `(guard)`.)*

---

## What is owed

1. In `governance/classification-map.md` row `issues-obligation-lapse`: `checks` names the script's test (`scripts/__tests__/issues-owned.test.ts`), and the row gains a `census:` field: a census mode that runs the script's decision per root record at one SHA and prints `<record>\t<state>` sorted, or `census: none — <why>` written by the owner (ballots README § "Conventions", "Exempt" ground 2). Whether `check_state` moves from `proposed` is the row's own rule and is stated in that PR.
2. That edit is to a governance path. Its kind is the PR's to name: EXECUTION if a ratified clause names it, otherwise LAW by ballot (adding a check to a row changes what a later ballot must carry). The two ballots above name it in standards notes only, which is not a clause; so the default is a short ballot, unless Peter rules otherwise.

## Interim practice (until this closes)

A ballot that changes rule 1 or rule 11 firing semantics runs the committed and the proposed script for every seat at one `origin/main` SHA and reports both output digests, labelled heuristic. The 2026-10-26 multi-path ballot's Census block is the form.

*Signed: Thurgood, 2026-10-26.*
