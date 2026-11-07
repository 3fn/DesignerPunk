# Task 5 Summary: Workflow wiring, baselines and the fault run

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 5 (Spec 129, Unit 1)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`.github/workflows/native-harness.yml` now runs the native compile harness. `harness-generate` builds a scratch consumer from a packed install once and uploads it. Four contexts (`harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens`, `harness-android-components`) each download it, compile with their lane, and run the comparator. The four expected-failure lists are committed from the first full run, each entry tagged to a root record whose fix removes it. A forced-failure dispatch shows all four contexts failing, not skipping, when `harness-generate` fails. `scripts/harness/stability.ts` computes the stability record, and `scripts/harness/native-rules.ts` is the one independent copy of the theme and product-token rules that both probes import.

## Why It Matters

Every native "compiles" in Spec 129 is accepted by these four contexts. A green context means the failures match the list, not that the code compiles: the lists hold 19, 115, 25 and 213 entries today. The workflow is non-required while it measures, and the stability record shows when a context has earned promotion.

## Key Changes

- The workflow, its dispatch input `force_generate_failure`, the `harness-verdict` notice (written on PASS and FAIL alike) and the Android `cache` notice.
- The four baseline lists, and the tags that route each entry to a record (including Lina's component-repair record).
- `stability.ts` with 26 tests over recorded and API-shaped fixtures.
- `native-rules.ts` with 114 tests, and the run file's `checks` with the comparator's `check` class.

## Impact

- ✅ Tasks 6 and 7 (U2) can register the falsification suites as named in-lane guards.
- ⚠️ The PR's own runs at head H, the harness-candidate record's outcome line (Kenya and Data) and Stacy's reading of the row-11 and row-15 coverage remain; they are listed in the completion doc.
