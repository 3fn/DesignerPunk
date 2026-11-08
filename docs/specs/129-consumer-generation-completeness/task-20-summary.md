# Task 20 Summary: A default-name compile in `harness-android-tokens`

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 20 (Spec 129, U7a)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`harness-android-tokens` gains one step that regenerates the consumer's tokens with no `name` in its config and compiles them with a probe that reads the provider. `harness/android/lane.ts --default-name` copies the consumer outside the workspace, removes the one top-level `name`, runs the copy's `generate`, and compiles `:tokens` and a `:probe` holding only `ProbeFamily.kt`, offline, in one Gradle call. A pure verdict function turns the log into one `default-name:` line; the workflow step annotates it. `HarnessConsumer` stays beside it.

## Why It Matters

The default name `DesignerPunk` is the name most consumers get, and until now only a local run (MP-4) showed that `DesignerPunkTheme { }` compiles under it. Now CI shows it on every run.

## Key Changes

- `harness/android/lane.ts` (`--default-name`, `defaultNameVerdict`) and 27 new cases in `probe-kotlin.test.ts` (Data).
- The workflow step and 7 new workflow-test cases (Thurgood, under the issue-row grant); 25 lines added, 0 deleted.
- Standing effect: from U7a, `:tokens` holds a floor of 0 `e:` lines under the default name.
