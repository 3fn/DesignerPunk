# The Android lane's resolve-failure detail keeps three lines of Gradle's message, and drops the line that names the searched repositories

**Date**: 2026-11-27
**Owner**: **Data** (`harness/android/lane.ts`, ballot `2026-11-07-native-lane-ownership` item 1). **Filed by**: Data, under README rule 10.
**Trigger**: `manual`: the event that owes the close is this record's own fixing PR. That PR changes `resolveDetail` and adds a falsification case that fails at its merge base, and the PR body names the case (item 1's defect-fix rule).
**Class**: P3 improvement · defect *(proposed by the filer, 2026-11-27, Data, rule 12. No verdict depends on the detail text, and the full log is in the run's `resolve.txt` artifact for 7 days. The detail is what the comparator prints and what a reader sees first, and on 2026-11-27 it pointed the diagnosis the wrong way.)*
**Source**: run 46010655831 attempt 1, job `harness-android-components`. The full Gradle message is quoted in `.kiro/issues/2026-11-27-harness-android-transient-resolve-classified-ordinary.md`.
**Consulted**: none needed. This is a defect in Data's own lane, filed by its owner. The fix is not started.

---

## The defect

`resolveDetail` (`harness/android/lane.ts` L480–484 at `3a3bd072b`) takes the lines after `* What went wrong:` and drops the empty ones. It then keeps `body.slice(0, 3)` and cuts the result at 300 characters. On Gradle's plugin-not-found message, the three lines it keeps are the headline, `Gradle Core Plugins` and `Included Builds`. It drops `Plugin Repositories (could not resolve plugin artifact …)` and the repositories searched. The printed detail therefore reads as if no plugin repository was consulted, when Gradle searched all three (Google, MavenRepo, Gradle Central Plugin Repository).

## What the fix must do

- Keep the detail's first line.
- Also keep any `Plugin Repositories` line and any `Searched in the following repositories:` list, within a bound stated in the code.
- Change no classification: `classifyResolveFailure`'s return kind is unchanged for every existing fixture.
- The falsification case is a fixture of this message (`scripts/harness/__tests__/fixtures/kotlin/resolve/`). It asserts that the detail names the repositories, and it fails at the fix's merge base.
