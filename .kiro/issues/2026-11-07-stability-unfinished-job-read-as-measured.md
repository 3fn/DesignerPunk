# Issue: `stability.ts` skips an unfinished run and reads the rest as measured, giving a false condition-5 pass on iOS and hiding finished Android jobs

**Date**: 2026-11-07
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 11. That amendment writes the rule this defect breaks, so it creates the obligation. **Found by** Kenya: K-F1 in `[KENYA R1]`, and the fix specification in `[KENYA R2]` item 4. Data added the Android half in `[DATA R2]`. Both entries are spliced in ballot `.kiro/docs/ballots/2026-11-07-thurgood-charter-scope-harness-and-merge-hold.md` § 9. Thurgood reproduced it in his cross-read, item 4, in the same section.
**Class**: P2 obligation (guard) · defect
**Trigger**: `path:scripts/harness/stability.ts,.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` — the event that owes the close is the fixing PR. That PR touches `stability.ts` and adds this record's rule 5 outcome line. A stability record committed before the fix, for an offer or for a demotion read at a health check or a release's S, also fires this trigger. Committing such a record while this one is open and not re-ruled is therefore a lapse on the record (rule 11). The trigger does not prevent the commit *(corrected 2026-11-07 in the review fold, `[STACY TASKS R9]` Low-5: the earlier text said such a record is never committed)*.

---

## The defect

`scripts/harness/stability.ts` at `a418cc0aa` decides whether a context's job has finished from the **workflow run's** status, not the job's:
- `runStatus` is set from the run (L217);
- a run whose status is not `completed` is skipped for every context (L311–313).

The conditions it reads then skip over that run, and the job is never listed against any condition.

- **The iOS false pass (Kenya).** Condition 3 on iOS takes the first three counted pull-request runs at the current Xcode pin (L372–373, `atPin.slice(0, 3)`). Skipping an earlier unfinished run moves "the first three" on to later runs. On the macOS queue, the run most likely to be unfinished is the one that has waited longest for a runner, which is also the run most likely to exceed the ceiling.
  - **Reproduction** at `e7f57c20b` (the script is unchanged at `a418cc0aa`): `analyze(normalize(raw))` over `scripts/harness/__tests__/fixtures/stability/ios-queue.json`, context `harness-ios-tokens`.
  - **Baseline**: the cold runs are 801, 802 and 803, and `queuePoor` is `true` (801: 270 s queue plus 340 s).
  - **Mutation**: the test's own `unfinished(raw, 801, 'in_progress')`. Nulling only iOS job 900041 gives the same result.
  - **Result**: `skippedRuns` is `[801]`, the cold runs are 802 to 804, `queuePoor` is `false`, and the record prints "within the ceiling".
  - **Control**: with 804 unfinished, 801 to 803 stay POOR.
- **The hidden Android jobs (Data).** A finished Android job in a run whose iOS job is still queued is skipped with the run. It drops out of:
  - the infra list, the infra rate and the consecutive-infra finding, which are the demotion inputs for `harness-android-tokens`, the promoted context;
  - condition 2, so a finished Android job that breaks the streak is hidden while that run's iOS job waits. *(This bullet is Thurgood's, from the same mechanism.)*
- **A run that lists no job for a context (Stacy, `[STACY TASKS R9]` High-1; Kenya, `[KENYA TASKS R7]` item 1).** `normalize` builds records only from listed jobs. Two kinds of run therefore produce no row in any of the context's tables, and the skipped-runs table stays empty while the false pass stands:
  - a run still inside `harness-generate`, whose context jobs, by two live runs' timestamps, are created only when that job finishes;
  - a whole-run re-run whose new attempt's context jobs are not listed yet, while the earlier attempt, which has a conclusion, is still the newest listed (UNVERIFIED).

  Stacy modelled the first kind over `ios-queue.json`: run 801 `in_progress` with only its `harness-generate` job listed. The result was skipped `[]`, cold runs 802 to 804, and `queuePoor: false`. A run with a null status reads as completed (L217, L311). A completed run that lists no job for a context, for example one cancelled during `harness-generate`, is invisible as well, so a break it should carry is hidden.
- **Condition 2 across an interior gap.** A context's unfinished job that is older than its newest finished pull-request run is skipped over, so the streak counts across a run that may still break it.

**Claims reading** (`[STACY R2]` item 4): #735's claim, "an unfinished run is skipped, not a break", is true of the code. Its committed record shows 0 runs skipped. No committed record carries the false green, so this is not a claims finding.

---

## The rule the fix implements

`tasks.md` § "Decision 6", "A job that has not finished" (tasks amendment 11). The rule:
- It is decided at the run level, from the runs endpoint, for every `pull_request` run and every context.
- An unfinished job is listed and never skipped over. That covers a job not listed yet and a re-run that is pending.
- A completed run that lists no job for a context is a break.
- Only an unfinished `pull_request` job blocks, and a condition that one comes before is **not yet measurable**.
- Android's condition 3 is exempt.
- The demotion inputs read finished jobs only.

Until this record closes, that section's last bullet applies: a record is read for a context only when its skipped-runs table is empty **and** every `pull_request` run that the runs endpoint lists before the record's `Generated` time appears in that context's tables.

---

## Where the fix lands, and why

The fix lands in **Thurgood's standing scope**: ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` § 3 item 1, RATIFIED by Peter at 2026-11-07T22:30:08Z, which reaches `stability.ts`, `stability.test.ts` and `fixtures/stability/**`. It waits until that ballot's application PR (`chore/apply-thurgood-charter-scope`) merges. It is not granted in amendment 11.
- **It is that scope's own case.** Item 1 says a change to what counts as a counted run is a change to the Decision 6 text, never a code edit, and that a fix where the code disagrees with the text is Thurgood's, with a falsification case that is red before the fix. Amendment 11 writes the text. After that the code disagrees with it, so this is a defect fix.
- **A grant here would cost a unit.** A tasks-row grant lives only on a declared unit's branch. This fix would need a fifteenth unit, with its own four-contexts evidence, completion and summary docs, and a place in the chain, for a fix of about a quarter of a session.
- **The wait costs no correctness.** Decision 6's interim bullet keeps every reader off a record that has a skipped run for the context, or that is missing a `pull_request` run the runs endpoint lists. This record's Trigger fires at the next committed stability record, so the fix lands before that record, or the record is re-ruled or lapses on the record.
- **If the application PR stalls** past the next committed stability record, this record lapses at that commit. It is a P2 `(guard)` record, so its first lapse goes to Peter with spec, drop or fix-now (README rule 11). A fix-now answer would then carry its own grant.

**Consults owed by the fixing PR**, each as a `**Consulted**:` line in its body:
- Kenya, on condition 3's iOS rule and condition 5 (item 1, `[KENYA R1]` A-3);
- Data, on how the script reads a context's job (item 1, `[DATA R1]` D-1, the interface, as Data asked in `[DATA R2]`).

---

## Acceptance

These are falsification cases in `scripts/harness/__tests__/stability.test.ts`. Each one is red before the fix and green after it, except the controls, which are green both times.
1. **Kenya's mutation, run-level form**: in `ios-queue.json`, run 801 `in_progress` with its iOS job unfinished. For `harness-ios-tokens`, the rendered condition 3 and condition 5 lines each print "not yet measurable" and name run 801, and neither gives "fewer than three counted runs". `queuePoor` is `null`, neither `true` nor `false`, and the record does not print "within the ceiling" or POOR (`[STACY TASKS R9]` Medium-1; `[KENYA TASKS R7]` item 4).
   - **1b, the job-level form**: the run's status is left unchanged, and only job 900041's `conclusion` is nulled. The result is the same as case 1.
2. **Control**: with 804 unfinished, the cold runs are 801 to 803 and condition 5 is POOR.
3. **Data's half**: in a run whose Android job finished carrying `harness-infra` while its iOS job is queued, the Android context's infra list holds that run and its infra rate counts it.
4. A finished Android job that breaks the streak, in a run whose iOS job is queued, is read as a break by condition 2.
5. An unfinished `pull_request` job of a context, older than that context's newest finished `pull_request` run, leaves condition 2 not yet measurable, names the run, and has `streakMet` false. **Control**: the existing case "an unfinished run after a clean streak leaves the streak where it was" stays green. **Control**: an unfinished dispatched job in the same position blocks nothing and is listed.
6. For an iOS context, the skipped-runs table gives each unfinished job's Xcode pin. A job whose head SHA the clone lacks is printed `unknown`, and it blocks conditions 3 and 5 as if it were at the current pin (Kenya).
7. **No job listed (Stacy High-1)**: run 801 `in_progress` with only `harness-generate` listed. Every context's skipped-runs table lists 801 as `no job listed`, and `harness-ios-tokens` reads as in case 1.
8. **A re-run pending**: a run at `run_attempt` 2, `in_progress`, with only attempt 1's context jobs listed. The context's job reads as unfinished, and attempt 1's verdict is not read.
9. **A completed run that lists no job for a context**: it is a break for condition 2, and the record lists it.
10. **A null run status**: a run whose status is missing reads as unfinished unless its context job is finished as the rule defines it.
11. **The two sources disagree**: a job with a `conclusion` whose check run has none reads as unfinished (Data).

The record's "Rules applied" paragraph states the amended reading. The fixing PR regenerates `evidence/harness-stability.md`.
