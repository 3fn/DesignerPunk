# Peter's ruling, 2026-11-07 14:12Z: environment faults get their own annotation, `harness-infra`

**Recorded by**: Thurgood (formalizer), from the orchestrator's relay. This is a record of a ruling, not law.
**Received**: 2026-11-07T14:12:30Z (`date -u`, at receipt, as the orchestrator relayed it).

## Peter's words, verbatim

> Let's adopt the fix with class option if you think it'll be effective

## The decision brief he read (the orchestrator's, verbatim as relayed)

> - **The cause.** #711 run 42379456009, job 128424053186: Maven Central and the plugin portal returned 403 on a cold-cache resolve, and the cache-save step then saved a cache from a run that never resolved its dependencies.
> - **The fix the seats agreed:**
>   - The Android lane runs a dedicated resolve step first (Data: a `resolveAll`-style task over the three `debugCompileClasspath`s plus plugin resolution). Only success writes `harness-out/resolved.ok`, and the cache saves only when that file exists. (Thurgood and Data.)
>   - When resolution fails with a 403, 429, 5xx or network error from a registry host, the run writes `harness-infra` instead of `harness-verdict`, naming the host and status. Such runs count toward neither Decision 6 condition 2 nor condition 3. A 404, a missing coordinate or a version mismatch stays an ordinary `harness-verdict` FAIL. (Data and Stacy.)
>   - `stability.ts` lists infra runs per context with the infra rate, and two or more in a row at one head are printed as a finding. (Stacy.)
> - **The option ruled out:** re-run once and count only the re-run. It collides with condition 2's attempts-differ break.
> - **What survives against the fix:** the lane classifies its own runs, and a 403 flake can mask a real dependency regression.
> - **The class option:** every harness verdict says which side of the line it is on, our code (`harness-verdict`) or the environment (`harness-infra`, with its evidence). It applies to iOS too.

## The condition in his words, and who judged it

Peter's "if you think it'll be effective" made the adoption conditional on a judgment. **The judgment is the orchestrator's, not Peter's**, made before proceeding and relayed with the ruling:
- it closes the Android hole: a registry fault no longer reads as a code FAIL, and an unresolved cache is no longer saved;
- on iOS it is a design rule plus a compliance check. The iOS lane downloads nothing, and it already writes no verdict before the comparator.

## What it sets (Thurgood's paraphrase)

`tasks.md` § "Decision 6" conditions 2 and 3, and `design.md` § 3, define `harness-infra`. A new standalone unit, U3a (Task 19), builds it before U4's PR opens. The orchestrator's own act, re-running #711's failed job, is recorded where the first stability record after this is read (Decision 6 and Task 19).
