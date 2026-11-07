# Task 1 Summary: The packed-install consumer driver

**Date**: 2026-11-06
**Purpose**: Concise summary of parent Task 1 (Spec 129, Unit 1)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`scripts/harness/consumer.ts` now packs the package, installs the tarball into a consumer root outside the repository, runs the installed CLI's `init` and `generate` against an abbreviation that is not `DP`, adds a product-token fixture, and leaves one uploadable directory with a manifest the compile lanes read. `scripts/pack-assert.ts` gained a rule that every packed file under `platforms/android/res/` is a valid Android resource, with a red case for the README that broke the Android resource merge.

## Why It Matters

Every native "compiles" in Spec 129 rests on compiling what a real consumer's `generate` writes from a packed install. This is the input the four compile lanes read, and the pack rule stops a stray file in a resource folder from reaching an adopter's Android build.

## Key Changes

- `scripts/harness/consumer.ts` and 42 tests: named steps, a failing `pack`, `install`, `init` or `generate` exits non-zero naming the step; nothing runs in the repository but `npm pack`.
- `harness/pins.yaml` (the `consumer` section: name, abbreviation `HX`, fixture path) and `harness/fixtures/product-tokens/harness.yaml` (one ref to `color.action.primary`, a WCAG-only colour, and one to `typography.bodyMd`, a composite).
- `harness-consumer.json` and `harness-tarball-files.txt` at the consumer root name the package root, token index, product-token folder, each platform's output folder and the generated native files, so a lane hard-codes none of them.
- `pack-assert` section 11 and 11 new cases.

## Impact

- ✅ Task 5 can run the driver in `harness-generate` and upload its output as one artifact.
- ✅ The fixture reproduces the non-compiling product-token output the harness is meant to list.
- ⚠️ Criterion 5's "passes at this unit's head" waits on Lina's README move (`fix/129-u1-preconditions-lina`); the rule is red on that one file until it merges.

---

*For detailed implementation notes, see [task-1-completion.md](../../../.kiro/specs/129-consumer-generation-completeness/completion/task-1-completion.md)*
