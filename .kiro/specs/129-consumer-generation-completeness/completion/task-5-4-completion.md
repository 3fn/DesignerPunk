# Task 5.4 Completion: The shared harness module and its test; the run file's `checks` and the comparator's `check` class

**Date**: 2026-11-07
**Task**: 5.4 (Spec 129, Unit 1, parent 5)
**Agent**: Thurgood (Sonnet); consulted: Ada (every rule), Kenya (the Swift rules), Data (the Kotlin rules)

## What changed

- `scripts/harness/native-rules.ts` holds, as pure functions written from design § 4's text (it was written without reading `src/generators/**`, `probe-swift.ts` or `probe-kotlin.ts`): the theme-instance rule, the family cases and the Selection table with the single-mode rule, item 5's refusals as a check on the harness consumer's config, the product-token names and access rule, the fixed binding names and the product files' `gen:` keys. `36829b639` is the first version; `4252ccc64` takes the review additions; `0e9e1fabe` indents the Swift holder member line; `16edd916f` follows tasks amendment 4's design text.
- `scripts/harness/__tests__/native-rules.test.ts` asserts literals (114 tests).
- `compare.ts` reads the run file's `checks`, fails class `check` for each `ok: false` and for a missing array, naming it in the verdict line; `compare.test.ts` shows each red once; `harness/README.md` states the field.

## The reviews

- **Ada's consult** (read-only, at `36829b639`): no mismatch with design § 4. Six design gaps. Gaps 1 to 3 (the Swift reserved-word list, the `mode` of a `{ light, dark }` entry, refusal (e)'s comparison) needed design text and went into tasks amendment 4 (#704); gaps 4 to 6 were harness-only and are applied (categories sorted by file name; a list-valued `tokens` throws; a null `platforms` reads as absent and any other non-list throws; gap 6 unchanged: a native index name that is a list is never a theme member).
- **Kenya's review** (Swift rules): ok, with two additions applied (`swiftFamilyType`, `swiftProviderFunction`; `isSwiftIdentifier` and `valid:false` on a product read whose key is not a Swift identifier). She verified the reserved-word list on Swift 6.4.2 and that `allCases` fails as a case name.
- **Data's review** (Kotlin rules): fixes applied (`familyTypeName`, `providerName`, `providerReads`, `kotlinHolderOpenLine`, `kotlinHolderMemberLine`).

## Targeted tests run

- `npx jest -c scripts/jest.config.js scripts/harness/__tests__/native-rules` → 114 passed; `…/compare` → 107 passed.
- `npx jest -c scripts/jest.config.js scripts/harness` → 8 suites, 566 passed.
- `git grep -nE "(from|require\(|import\()[[:space:]]*['\"][^'\"]*scripts/harness" -- src/` → no line.

## Application-time adaptations

1. **Two design gaps were answered by Ada after the first draft**, so the module's first version used the plainest reading and carried `DESIGN-GAP` markers; the amendment-4 text replaced them (`16edd916f`).
2. **Commit `0e9e1fabe`** (the Swift holder member line indented four spaces) was made on the unit branch by another hand to match Task 11's pin; this doc did not author it.
3. **The Swift holder's member line stops at `=`**: the part after `=` is the generator's and Task 11's.
