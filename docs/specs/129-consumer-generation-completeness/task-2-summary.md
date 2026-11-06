# Task 2 Summary: The comparator and its falsification test

**Date**: 2026-11-06
**Purpose**: Concise summary of parent Task 2 (Spec 129, Unit 1)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`scripts/harness/compare.ts` decides each harness context's verdict. It compares the compile errors a lane observed against that context's committed list, checks the pins, the protected set and the record tags at the head and at the merge base, and prints one verdict and one summary line. Two diagnostic parsers turn compiler output into the keys it compares: `parse-swift.ts` (Kenya) for `swiftc` and `parse-kotlin.ts` (Data) for Gradle's Kotlin compiler. `harness/README.md` states the file formats, and `harness/protected-set.txt` lists the 20 records a list entry may not quietly move away from.

## Why It Matters

Every native "compiles" in Spec 129 is accepted by this comparator. The falsification suite makes each verdict rule fail once on purpose, so a green harness context means the observed failures match the list. It does not mean that the comparator never fails.

## Key Changes

- `scripts/harness/compare.ts` and `compare.test.ts` (96 tests): two-sided list checks, the file floor, additions under exceptions (a), (b) and (c), tags, retags and the protected set, toolchain match, `pre-compile` / `parser` / `base unreadable`, no merge base, and cross-tier keys.
- `scripts/harness/parse-swift.ts` with 35 tests and 10 fixtures recorded under Xcode 27.2.
- `scripts/harness/parse-kotlin.ts` with 85 tests and 5 fixture logs (3 recorded in the 2026-11-04 K2 round, rewritten and labelled; 2 synthetic) plus 2 expected-key files from an independent pass.
- The comparator loads the parsers through type-checked loaders. A static import would form a load-time cycle with them.

## Impact

- ✅ Tasks 3 and 4's lanes have a fixed parser interface and key form to feed, and Task 5 has the comparator its jobs call.
- ⚠️ Criterion 16's second half (the U1 PR's `lane-functional-root` run selecting the three suites) waits for U1's PR, which opens at Task 5.
- ⚠️ Kenya still owes one Swift fixture cut from U1's first CI log under Xcode 26.6, before U1 merges.

---

*For detailed implementation notes, see [task-2-completion.md](../../../.kiro/specs/129-consumer-generation-completeness/completion/task-2-completion.md)*
