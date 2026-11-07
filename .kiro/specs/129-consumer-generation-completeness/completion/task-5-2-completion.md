# Task 5.2 Completion: The first full run; baseline lists with tags; the protected set filled

**Date**: 2026-11-07
**Task**: 5.2 (Spec 129, Unit 1, parent 5)
**Agent**: Thurgood (Sonnet)

## What changed

- **The first full run** is `native-harness.yml` run 42324880305 at `cc2e71a51` (a dispatch, not the forced-failure run). All four contexts carried `harness-verdict`; every `FAIL` line was class `format` (the lists were missing); none was `pre-compile`.
- **The four lists** (`harness/expected/harness-*.tsv`) are committed from it under exception (b): `da3246b60` (tokens: 19 iOS and 25 Android entries) and `18cd819c0` (components: 115 iOS and 213 Android). Tags follow the owning rows' records; the component entries no existing record names are tagged to Lina's record `2026-11-07-native-component-repair-from-first-harness-run.md` (#706, `de0636a36`), with the routing table in that record.
- **The protected set** `harness/protected-set.txt` already held the 20 names from Task 1; unchanged.
- **Kenya's Xcode 26.6 `parse-swift` fixture** was cut from the run's iOS log by Kenya (`dbd6ddc77`).

## Targeted tests run

- Replaying the run's four run files through `compare.ts --no-base` against the committed lists → `harness-verdict … PASS` for all four (summary lines in the parent doc's criterion 22 row once the PR runs exist).
- `grep -c '^probe:' harness/expected/*.tsv` → `0` for each of the four files.
- Dispatch 42331622121 at `b00621317` and 42333520571 at `44e2f7f54`: four PASS, both Android contexts `cache: hit`.

## Application-time adaptations

1. **The component lists waited for a record.** 54 iOS and 185 Android entries matched no root record; I did not tag them to a nearest record. Lina filed the component-repair record (#706) after Peter's ruling "a; blend entries fine" (2026-11-07T02:04:38Z), and the lists were committed after it. Instruments row F8 holds the MISSING text and its resolution.
2. **Eight iOS diagnostics** (`Animation`, `AnimationContext`, `CustomAnimation`, `VectorArithmetic`, `scaled`) are tagged to row 4's record on that record's own sentence; Ada may retag them.
3. **The tags were assigned by message pattern**, not entry by entry; the patterns are described in `task-5-instruments.md` rows F7 to F9 and in Lina's routing table.
