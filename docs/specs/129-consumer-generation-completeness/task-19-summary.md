# Task 19 Summary: Environment faults are `harness-infra`, and only a resolved build saves the cache

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 19 (Spec 129, U3a)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

The Android harness lane now resolves its dependencies in one step before any compile. A registry fault there (a 403, 429, 5xx or network error from Maven Central, Google Maven, the Gradle plugin portal or `services.gradle.org`) is written as `harness-infra` with its host, status and step, and no verdict is written. Any other resolve failure is an ordinary check failure. The Gradle cache is saved only when the resolve step succeeded, so a run that never resolved its dependencies saves nothing. `stability.ts` lists infra runs, skips them for the 10-run streak, never counts one as a cold run, and prints a finding for two in a row at one head.

## Why It Matters

Run 42379456009 (#711) failed on registry 403s, and the cache step then saved a cache from a run that never resolved. Every harness verdict now says which side it is on: our code (`harness-verdict`) or the environment (`harness-infra`).

## Key Changes

- `harness/android/lane.ts`, its resolve task and fixtures (Data).
- The workflow's save condition and annotation step, and `native-harness-workflow.test.ts` with its in-lane guard entry.
- `stability.ts` with seven new cases, and the re-run `evidence/harness-stability.md` showing #711 as a condition 2 break.

## Impact

- ✅ U4 can open its PR with the infra class in place. No infra case has occurred in CI yet; the rule is shown by tests.
- ⚠️ The PR's own runs at head H are added in the follow-up commit.
