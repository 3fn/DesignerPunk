# Owed act: the first walk after Start Up Tasks item 9 lands reports on the session-start read, and re-opens it on one false FIRED or one blocked start

**Date**: 2026-10-21
**Owner**: Thurgood (the walk's author, and the author of `scripts/issues-owned.sh`). **Filed by**: Thurgood, under README rule 10, in the application PR of the ruling that creates the obligation.
**Trigger**: `path:.kiro/docs/civitas-health-checks/*.md` — the first health-check record committed after this record, that is, the first walk after application. That walk's commit closes this record or re-rules it.
**Class**: P2 obligation (record) · owed-act
**Authority**: ballot `.kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md` § 9, Peter's ratified condition (ii), 2026-10-20: "the first health-check walk after application reports run count, false-FIRED count and any startup complaint. One false FIRED line or one blocked session start re-opens the item for re-ruling." The same text is item 9's revisit line in Start Up Tasks.

---

## What the walk reports

1. **Run count**: the lines of the run log (`$(git rev-parse --git-common-dir)/issues-owned.log`, one line per run, written by the script) since this PR's merge, by seat, with the count of `unavailable` runs and their reasons.
2. **False-`FIRED` count**: each `FIRED@` line the log records, checked against `origin/main` at the walk: did the record's event actually happen (M2)? A `FIRED` line for an event that did not happen is false. The log names the FIRED paths per run.
3. **Startup complaints**: any session report, PR body, record line or chat note (relayed) that the read blocked, slowed or confused a session start.
4. **Limits of the log**: it is local to one machine's git directory and is never committed. Runs on another machine, or with `ISSUES_OWNED_LOG` overridden, are not in it; the walk says so rather than reading silence as zero.

## The rule the walk applies

- **One false `FIRED` line, or one blocked session start** → item 9 is re-opened for re-ruling: the walk sends it to Peter with the evidence, as a ballot item.
- Otherwise → the walk records the three counts here, dated, and closes this record by rule 5.
