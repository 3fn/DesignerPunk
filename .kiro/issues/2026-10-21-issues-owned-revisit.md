# Owed act: the first walk after Start Up Tasks item 9 lands reports on the session-start read, and re-opens it on one false FIRED or one blocked start

**Date**: 2026-10-21
**Owner**: Thurgood (the walk's author, and the author of `scripts/issues-owned.sh`). **Filed by**: Thurgood, under README rule 10, in the application PR of the ruling that creates the obligation.
**Trigger**: `manual` — the event that owes the close is Peter's dated reading of the revisit clause's test, appended to this record: either a `FIRED` line is false only when its event did not happen (then this record closes with the counts below), or a line that misleads also counts (then item 9 goes to him as a ballot item for re-ruling, and this record closes when that ballot is ruled). *(Re-ruled 2026-11-27 by Thurgood, owner, README rules 1, 9 and 11, in the walk's own commit, as the old Trigger asked: the walk reported (§ "Walk report (2026-11-27)"), but the close turns on a reading that is Peter's and that the 2026-10-25 pointer below put to him without an answer. Prior text at `3a3bd072b`: "`path:.kiro/docs/civitas-health-checks/*.md` — the first health-check record committed after this record, that is, the first walk after application. That walk's commit closes this record or re-rules it.".)*
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

**Pointer (2026-10-25, Thurgood, owner, rule 9)**: two records closed by their own fixing PR under rule 5 were printed `FIRED@<sha>` at every session start because the script does not read Outcome lines (`261982b63` #438, `722ea5bb0` #442). The event happened in both, so on this record's literal test (item 2 above) they are not false FIRED lines; whether the clause's spirit counts a misleading line is Peter's to say. The walk counts them under the reading he gives, citing `2026-10-25-issues-owned-fired-ignores-outcome-lines.md`.

## Walk report (2026-11-27)

The first health-check walk after item 9 landed, `.kiro/docs/civitas-health-checks/2026-11-27.md`, read the run log at `.git/issues-owned.log` in the main checkout, copied after its line of 2026-11-27T14:07:30Z. Window: from this record's merge (`b42874bd0`, 2026-10-22T01:20:46Z) to the walk.

1. **Run count: 288 runs**, on 15 of the 37 days. 10 of the 288 are this walk's own reads (2026-11-27T13:52:52Z to 13:53:18Z, one per seat and one `Peter`, and Thurgood at 14:07:30Z), so **278 runs came from sessions and orchestrators**. By seat, over all 288: Thurgood 96, Lina 49, Ada 45, Stacy 30, Kenya 19, Data 18, Leonardo 12, Sparky 7, and 12 invocation errors. **Unavailable runs: 12, all invocation errors, none a fetch failure or timeout**: 5 with no seat given, 2 `--help`, 5 `Peter` (unknown seat). The log cannot tell a session-start run from an ad hoc run.
2. **False-`FIRED` count, on this record's literal test (item 2: did the event happen?): 0.** The 276 runs that read printed 266 `FIRED` lines: 149 distinct pairs of ref and record, over 41 records. The walk re-derived each pair independently from git at the logged ref: the record's first Trigger line, its last Trigger change, then `git log --first-parent <tc>..<ref>` over the glob, a first-parent `(#<N>)` subject, or the tag. **All 149 fired.**
3. **Misleading lines** (the 2026-10-25 pointer's question, still unanswered): **78 of the 266 `FIRED` lines, on 11 records, were printed for a record that already carried its close** (a `## Outcome` or `**Outcome` line, or a closed Status) at the logged ref. Each was a record closed and not yet archived. Six of the 11 were still at the root at this walk, and the walk archives them (rule 5). This is the defect `.kiro/issues/2026-10-25-issues-owned-fired-ignores-outcome-lines.md` records, routed to Spec 131.
4. **Startup complaints: no blocked session start found; one confusion recorded.** Spec 131's ledger entry L-8 (`.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md`) records that the read listed records under a seat named only as consulted on the Owner line (Data). It was fixed by #686 and five header sweeps (#688 to #692) on 2026-11-05/06. The walk searched committed records and merged PR titles for complaints. It did not read session transcripts or chat.
5. **Limits**: the log is one machine's; runs on another machine, or with `ISSUES_OWNED_LOG` overridden (the test suite does), are not in it.

**What the rule gives.** On the literal test, the counts are 0 false lines and 0 blocked starts, so this record would close by rule 5. On the misleading-line reading, 78 lines would re-open item 9. The reading is Peter's (pointer of 2026-10-25), so the walk re-rules this record to his answer rather than choosing.

*Signed: Thurgood, 2026-11-27.*
