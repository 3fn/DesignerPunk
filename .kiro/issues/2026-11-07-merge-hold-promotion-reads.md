# Issue: the hand reads owed before `merge-hold` is promoted to required

**Date**: 2026-11-07
**Filed by**: Thurgood, under README rule 10, for Stacy (ballot `2026-11-07-merge-hold-and-law-ratified-checks` item 5 step 4, Stacy R1 A2 and A3).
**Owner**: Stacy
**Class**: P2 obligation (guard) · owed-act
**Trigger**: `path:.github/workflows/merge-hold.yml` — the event that owes the close is the merge of the promotion PR for `merge-hold`, which edits that file's required-context status in the register and the gate script. It closes at promotion, or at Peter's decision not to promote.
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
