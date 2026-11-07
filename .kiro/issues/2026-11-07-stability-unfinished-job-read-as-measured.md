# Issue: `stability.ts` skips an unfinished run and reads the rest as measured, giving a false condition-5 pass on iOS and hiding finished Android jobs

**Date**: 2026-11-07
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 11. That amendment writes the rule this defect breaks, so it creates the obligation. **Found by** Kenya: K-F1 in `[KENYA R1]`, and the fix specification in `[KENYA R2]` item 4. Data added the Android half in `[DATA R2]`. Both entries are spliced in ballot `.kiro/docs/ballots/2026-11-07-thurgood-charter-scope-harness-and-merge-hold.md` § 9. Thurgood reproduced it in his cross-read, item 4, in the same section.
**Class**: P2 obligation (guard) · defect
**Trigger**: `path:scripts/harness/stability.ts,.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` — the event that owes the close is the fixing PR. That PR touches `stability.ts` and adds this record's rule 5 outcome line. A stability record committed before the fix, for an offer or for a demotion read at a health check or a release's S, also fires this trigger. So a record computed by the unfixed script is never committed while this record is still open and not re-ruled.

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
- **Condition 2 across an interior gap.** A context's unfinished job that is older than its newest finished pull-request run is skipped over, so the streak counts across a run that may still break it.

**Claims reading** (`[STACY R2]` item 4): #735's claim, "an unfinished run is skipped, not a break", is true of the code. Its committed record shows 0 runs skipped. No committed record carries the false green, so this is not a claims finding.

---

## The rule the fix implements

`tasks.md` § "Decision 6", "A job that has not finished" (tasks amendment 11). The rule is that each context is read from its own job; an unfinished job is listed and never skipped over; a condition that one comes before is **not yet measurable**; Android's condition 3 is exempt; and the demotion inputs read finished jobs only. Until this record closes, that section's last bullet applies: no record is read for a context whose skipped-runs table lists a run.

---

## Where the fix lands, and why

The fix lands in **Thurgood's standing scope**: ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` § 3 item 1, RATIFIED by Peter at 2026-11-07T22:30:08Z, which reaches `stability.ts`, `stability.test.ts` and `fixtures/stability/**`. It waits until that ballot's application PR (`chore/apply-thurgood-charter-scope`) merges. It is not granted in amendment 11.
- **It is that scope's own case.** Item 1 says a change to what counts as a counted run is a change to the Decision 6 text, never a code edit, and that a fix where the code disagrees with the text is Thurgood's, with a falsification case that is red before the fix. Amendment 11 writes the text. After that the code disagrees with it, so this is a defect fix.
- **A grant here would cost a unit.** A tasks-row grant lives only on a declared unit's branch. This fix would need a fifteenth unit, with its own four-contexts evidence, completion and summary docs, and a place in the chain, for a fix of about a quarter of a session.
- **The wait costs no correctness.** Decision 6's interim bullet keeps every reader off a record whose skipped-runs table is non-empty. This record's Trigger fires at the next committed stability record, so the fix lands before that record, or the record is re-ruled or lapses on the record.
- **If the application PR stalls** past the next committed stability record, this record lapses at that commit. It is a P2 `(guard)` record, so its first lapse goes to Peter with spec, drop or fix-now (README rule 11). A fix-now answer would then carry its own grant.

**Consults owed by the fixing PR**, each as a `**Consulted**:` line in its body:
- Kenya, on condition 3's iOS rule and condition 5 (item 1, `[KENYA R1]` A-3);
- Data, on how the script reads a context's job (item 1, `[DATA R1]` D-1, the interface, as Data asked in `[DATA R2]`).

---

## Acceptance

These are falsification cases in `scripts/harness/__tests__/stability.test.ts`. Each one is red before the fix and green after it, except the controls, which are green both times.
1. **Kenya's mutation**: in `ios-queue.json`, with run 801's iOS job unfinished, `harness-ios-tokens` reads conditions 3 and 5 as not yet measurable, naming run 801. Its cold runs are not met, `queuePoor` is not `false`, and the record does not print "within the ceiling".
2. **Control**: with 804 unfinished, the cold runs are 801 to 803 and condition 5 is POOR.
3. **Data's half**: in a run whose Android job finished carrying `harness-infra` while its iOS job is queued, the Android context's infra list holds that run and its infra rate counts it.
4. A finished Android job that breaks the streak, in a run whose iOS job is queued, is read as a break by condition 2.
5. An unfinished job of a context, older than that context's newest finished pull-request run, leaves condition 2 not yet measurable, naming the run, with `streakMet` false. **Control**: the existing case "an unfinished run after a clean streak leaves the streak where it was" stays green.
6. For an iOS context, the skipped-runs table gives each unfinished job's Xcode pin (Kenya).

The record's "Rules applied" paragraph states the amended reading. The fixing PR regenerates `evidence/harness-stability.md`.
