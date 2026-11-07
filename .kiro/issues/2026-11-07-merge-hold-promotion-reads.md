# Issue: the hand reads owed before `merge-hold` is promoted to required

**Date**: 2026-11-07
**Filed by**: Thurgood, under README rule 10, for Stacy (ballot `2026-11-07-merge-hold-and-law-ratified-checks` item 5 step 4, Stacy R1 A2 and A3).
**Owner**: Stacy
**Class**: P2 obligation (guard) · owed-act
**Trigger**: `path:tools/agent-generator/verify-gate-registration.sh` — the event that owes the close is the merge of the promotion PR for `merge-hold`, which adds `merge-hold` to `EXPECTED_CONTEXTS` and raises `EXPECTED_COUNT` in that file. It closes at promotion, or at Peter's decision not to promote. Another edit of the script fires it too; that firing is read and re-armed, not closed. *(Re-ruled 2026-11-07 by Stacy, owner, rules 9 and 11; see the Lapse below. Superseded, kept verbatim: "`path:.github/workflows/merge-hold.yml` — the event that owes the close is the merge of the promotion PR for `merge-hold`, which edits that file's required-context status in the register and the gate script. It closes at promotion, or at Peter's decision not to promote.")*
**Source**: the ratified ballot (Peter, 2026-11-07T17:59:15Z: "Re: 2, Ratified. F-1, 5; F-2, Yes; F-3, Yes"). F-1 = 5.

---

## What is owed

`merge-hold` stays advisory until **5 clean runs that parsed at least one marker**. A run is clean when its verdict matches Stacy's hand read of the same body. The bytes she reads are the ones the run recorded: each run writes one `merge-hold-read` annotation carrying `body-sha256: <hex>` and the marker and answer lines it parsed, verbatim (past about 60 KB: the hash and a line count, with the full lines in the job summary). The read happens after the run, never before a merge. Runs on bodies with no marker do not count.

The promotion record lists **which answer forms the counted runs met**: a file path, a comment URL, a pointer marker, "not now" (Stacy R1, F-1). Five runs of one form do not show the others were read.

## The list (appended as runs happen)

Each row: run id, PR, body hash, verdict, form met, Stacy's read (clean / not clean), date.

| run id | PR | body-sha256 | verdict | form met | hand read |
|---|---|---|---|---|---|
| _(none yet: the workflow lands with the build PR)_ | | | | | |

## Counter-argument and what survives

The duty ends at promotion, so it is a record and not a charter line; Stacy may prefer the charter line, and her reply decides. What survives: a run whose body was edited after it ran has a hash that no longer matches the live body, and the annotation is then the only copy of what it read.

## Lapse (2026-11-07)

**Firing commit**: `cd340c59b9359ec57d2d5f3dac57cb2f67facfc0` (#732, "Merge-hold checks judge the checked-out head and the fetched base"). `scripts/issues-owned.sh Stacy` printed `FIRED@cd340c59b`. #732 edits `.github/workflows/merge-hold.yml`, so the old token fired. It was not the event the Trigger's prose names. The promotion PR for `merge-hold` does not exist, and it would not touch that workflow: it edits `verify-gate-registration.sh` and the register. No ancestor of `cd340c59b` closed or re-ruled the record, so under rule 11 it **lapsed**, and I record that as the rule reads it, whatever the cause. The record is mine (rule 9), and the wrong key was written when Thurgood filed it for me under rule 10; I did not catch it at the filing PR's review.

**What the re-rule above does**: the token now names the edit the promotion makes. A rule 11 lapse does not un-lapse by a later re-rule, so this heading stays (the count of distinct SHAs is 1).

**Escalation owed to Peter** (rule 11: the first lapse of a P2 `(guard)` record): spec, drop, or fix-now. I report it in this PR's hand-off, not as my pick. The facts for his choice: the lapse is a mis-keyed token, not a missed read (the table above still has no rows: I have read no run yet, in this PR or before it); fix-now is already done by the re-rule, with a git-visible token; a `manual` token would have been quieter and would never lapse, which is why I did not use it for a record that exists to be a detector.

**What survives**: the new token also fires on any other edit of `verify-gate-registration.sh`, for instance the next unrelated promotion. Each such firing costs one line (read and re-arm). The alternative, a token on `classification-map.md`, fires more often.

*Signed: Stacy, 2026-11-07.*
