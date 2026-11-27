# `harness-android-tokens`, a required check, pins an exact JDK patch while it takes that JDK from a floating runner image

**Date**: 2026-11-27
**Owner**: **Thurgood**: the choice touches the harness's toolchain and run rules and `native-harness.yml`, which no seat holds standing write over (ballot `2026-11-07-native-lane-ownership` item 6). **Filed by**: Data, under README rule 10, at the orchestrator's direction after the 2026-11-27 red. Data holds the `android:` repair moves either way.
**Trigger**: `path:harness/pins.yaml`: the event that owes the decision is the next change to the pin file. Each JDK-only image update forces one, under item 3's P1–P6, so the next one is the recurrence this record counts. The trigger also fires on an iOS or `consumer:` move; at that firing the owner closes, re-rules, or rules that the repair path stands.
**Class**: P3 improvement · defect *(proposed by the filer, 2026-11-27, Data, rule 12. No claim is false and no consumer is blocked. The repair path exists and worked: #867 took about 30 minutes from diagnosis to a green head. The defect is the cost: every PR in the repository is blocked until a repair merges, and no PR author is at fault.)*
**Source**: PR #861's run 46010655831; dispatch run 46013427239 on `main` (`3a3bd072b`); repair PR #867.
**Consulted**: none needed. This files an observed failure for its owner. The decision is his and is not taken here.

---

## What happened

- The workflow runs the Android contexts on `runs-on: ubuntu-24.04` and selects `JAVA_HOME_17_X64`, the image's default JDK 17 (`native-harness.yml` L283, L312–315 and L422, L451–454 at `3a3bd072b`).
- `harness/pins.yaml` pinned `android.toolchain.java.version: "17.0.21"`, and the comparator fails a context on any toolchain difference (Req 3.11).
- Runner image `ubuntu24/20261122.23` changed the JDK. Its release notes strike `17.0.21+9 (default)` and list `17.0.21+2 (default)`, and the JDK reports `java.version` = `17.0.21.1`. The last green Android runs, on `main` on 2026-11-13, ran on `20261111.370.1`.
- From then on, every PR's two Android contexts failed with exactly one line, which the dispatch on `main` reproduced:
  `FAIL toolchain: android.toolchain.java.version observed "17.0.21.1", pinned "17.0.21"` → `harness-verdict: harness-android-tokens FAIL (toolchain)`, with `new=0 · stale=0`.
- `android.imageVersion` would not have caught this: neither the lane nor the comparator reads it (ballot item 3, P3, "The image version").

## The class option, its cost, and the counter-argument

**Option (a): install a pinned JDK instead of reading the image default.** The Android jobs would gain an `actions/setup-java` step with `distribution: temurin` and an exact `java-version` matching the pin, so an image update cannot change the JDK. The lane's `java.version` read stays as the check that the step did what it says.
- **Cost:**
  - It needs an issue-row grant for `.github/workflows/native-harness.yml` (README rule 8) and a consult on the toolchain rule.
  - It adds a JDK download, cached by the action, to each Android job.
  - Temurin's own archive becomes one more external host the required check depends on, and the harness-infra rule's registry-host list does not name that host.
  - A JDK pin then moves by grant or spec row, not by item 3's repair path.
- **Surviving counter-argument:** item 3's P1–P6 path already handles this. It is mechanical, Data's alone, and needs no grant. Option (a) swaps a weekly-image drift we can see for a dependency on a download host we do not classify. If image JDK respins are rare, option (a) costs more than it saves. Whether they are rare is the count this record's trigger collects.

**Option (b): the repair path stands.** Record each recurrence at its repair PR, and rule again if the count grows.

## What is owed

At the trigger's firing, Thurgood rules on (a), (b) or a third option, and either closes this record under rule 5 or re-rules its Trigger. The PR that fires it says whether it is a JDK-only repair move, which counts as a recurrence.
