# `audit:coverage-map` lanes section: adjudication ruling note

**Instrument**: `tools/agent-generator/coverage-map.ts`, lanes section (Spec 122 C12's audit command), added by B-CI item (d), PR-2 (`8f1d541d`, plus `bc2a9e86` for the stale-adjudication block).
**Sweep key**: `audit:coverage-map:lanes`
**Ruling seat**: Stacy, the audit command's owner (the output-shape consult). One row is routed to Thurgood as the CI-regime owner.
**Date**: 2026-09-28
**Authority**:
- Peter's rulings of 2026-09-27 and 2026-09-28. PR-2 is instrument-only. Every surfaced row is adjudicated or routed to its owner as a chartered item. My amendments were taken: the deadline and expiry string on the routed row, and the stale-adjudication block.
- Vocabulary: `intentional-trim | assessment-gap | design-change` (`canonical/adjudications.yaml` header).

**This note is the citable `record` for all 11 rows.**
- Each `intentional-trim` row rests on an **existing decision record**, cited below. I verified that the record says what the row claims. My ruling is that the row reflects a recorded design; it is not a new design decision in my seat.
- Each row names its **local run recipe**, so the lane stays reproducible by hand.

## What the rows mean

- **Section (i), required-only**: a required job runs test files that no local jest config selects.
- **Section (ii), local-only**: a local config or test script runs tests that no required step runs.
- **Neither kind is a gap by itself.** A gap is a row with no recorded reason for the separation.

## `required-script:test:consumer`

- **Ruling**: intentional-trim.
- **Decision record**: the header of `tests/consumer-integration.test.ts`: "This test is SLOW (~30-60s) and meant for pre-publish verification only … Run via: npm run test:consumer" (Spec 106 R8; Spec 118 Task 3.1's subprocess scenarios attach to the Consumer Guard lane). It runs as a required step in `consumer-guard.yml`.
- **Local recipe**: `npm run prebuild && npm run test:consumer`. This is the same order the CI job uses.

## `required-script:test:smoke:browser-boot`

- **Ruling**: intentional-trim.
- **Decision record**: the header of `tests/browser-boot-smoke.test.ts` (Spec 118 Task 5.1b). It is a boot guard over the **built** browser bundle, so it depends on the build and cannot sit in the functional lane. It runs after `build:browser` in `consumer-guard.yml`.
- **Local recipe**: `npm run build:browser && npm run test:smoke:browser-boot`.

## `required-script:test:smoke:mcp-boot`

- **Ruling**: intentional-trim.
- **Decision record**: the header of `tests/mcp-boot-smoke.test.ts` (Spec 118 Task 5.1a): "this guard reads BUILT bundles from dist/mcp/". It runs after `build:mcp` in `consumer-guard.yml`.
- **Local recipe**: `npm run build:mcp && npm run test:smoke:mcp-boot`.

## `required-script:test:smoke:tool-boot`

- **Ruling**: intentional-trim.
- **Decision record**: the header of `tests/tool-boot-smoke.test.ts` (Spec 125-B Task 1.6): "A CI job asserting every tool DECLARED … is both LISTED … and RESPONDS". It needs all three servers built (`tool-boot-smoke.yml`).
- **Local recipe**: `(cd mcp-server && npm run build) && (cd application-mcp-server && npm run build) && npm run build:mcp && npm run test:smoke:tool-boot`.

## Performance lanes

**Five rows**:
- `local-config:jest.config.js@src/__tests__/integration/`
- `local-config:jest.config.js@src/__tests__/performance/`
- `local-config:jest.config.js@src/integration/__tests__/performance/`
- `local-config:jest.performance.config.js`
- `local-config:mcp-server/jest.config.js@mcp-server/tests/performance/`

**Ruling**: intentional-trim, all five.

**Decision record**: Spec 125's outline, the 2026-07-03 addendum (`29bba7de`), in `.kiro/specs/125-mechanical-enforcement-strategy/design-outline.md`.
- Wall-clock timing assertions were moved **out of** the default lanes, so that "the default lanes are timing-assertion-free and demonstrated deterministic, which is what makes promoting them to *blocking* tolerable — a flaky blocking gate teaches agents (and humans) to override gates."
- The performance lanes are **non-blocking by design**.
- The functional config, `jest.functional.config.js`, excludes `performance/__tests__`, `__tests__/performance` and `PerformanceValidation`. That exclusion is exactly these rows.

**Local recipes**:
- `npm run test:performance` → today it selects **3** files (`OptimizationValidation`, `GenerationPerformance`, `ComponentTokenValidationPerformance`);
- `npm run test:performance:isolated` → **1** file (`PerformanceValidation`);
- `(cd mcp-server && npm run test:performance)` → **1** file (`tests/performance/performance.test.ts`).
- I checked each count with `--listTests` in this worktree on 2026-09-28.

**Residual, not closed by this ruling**:
- The addendum's own finding was that the root performance lane had selected **zero tests for about two months**, "because nothing gates on these lanes".
- **These rulings do not gate them either.** A performance lane can go silently empty again.
- The only visibility now is this section's per-run evidence. Adjudicated rows still print their full file lists, so a lane whose file list empties shows here at the next run.
- That is visibility, not a guard. A floor on the performance lanes would be a separate decision, and is not proposed here.

## `local-script:test:resolution-matrix`

- **Ruling**: intentional-trim.
- **Decision record**: the header of `src/config/__resolution-matrix__/run-matrix.js` (Spec 118 Task 1): "The orchestrator is a reporting harness, not a release gate — the standing CI gate is the Task-3 subprocess consumer guard." That guard runs inside the required `test:consumer` step.
- **Local recipe**: `npm run test:resolution-matrix`.

## `local-config:tools/agent-generator/jest.config.js`

- **Ruling**: **assessment-gap**, `owner: thurgood` (CI-regime owner).
- **The gap**: no required step runs the 30 generator suites. These include:
  - `partition.golden.test.ts` (Task 10's golden bite);
  - `coverage-map.test.ts` (this instrument's own tests);
  - most likely the "standing" and guard tests U2b adds (123 Tasks 13–14).
- While the row stands, those suites are **local-only evidence**: a regression in them does not fail any gate.
- **The fix**: add `npm run test:agent-generator` to `lane-functional-root`, with a selection floor of ≥ 1. The patch exists and was tested (30 suites, 425 tests).
- **The deadline, part of the ruling (Peter, 2026-09-28)**: the fix merges **before 123 U2b's first commit**.
  - **Vehicle**: the ratified CI-regime standing-scope ballot (Thurgood authors; Stacy is required reviewer).
  - **If that ballot has not ratified by the deadline**: Peter lands the tested patch as human-direct work in **its own PR, never in PR-2**, because PR-2 stays instrument-only.
- **Expiry**: this row's `record` carries the unique string "expires when the test:agent-generator lane step lands — due before 123 U2b's first commit".
  - The fix PR removes the row, and cites `grep -c "expires when the test:agent-generator lane step lands" canonical/adjudications.yaml` → 0.
  - It is **1** at this commit.
  - The string appears only in that `record` value, never in a comment. A comment carrying it would inflate the count and make "→ 0" unreachable (the F3 lesson).
- **My reads**:
  - **ARMING**: I count open `assessment-gap` lane rows and check each one's deadline. A row past its deadline is a finding.
  - **U2b MIDPOINT**: any criterion that claims a "standing" or "guarded" test in this suite while this row is still open is recorded as local-only evidence.

## The ERROR-row adjudication call (flagged by Thurgood)

- **The behaviour**: an adjudication keyed to a row that is currently an **ERROR** row (a derivation error, never adjudicable) counts as "matching a current row". So it is **not** listed as stale, even though it can never cover that row.
- **Ruling: acceptable as-is. It is safe, because it cannot produce a false pass.** An ERROR row fails the run whatever the adjudications say (`pass` requires `errors.length === 0`). So an inert adjudication cannot hide anything. The failing ERROR line is itself visible.
- **One small change requested (Low; I route it, and it need not block PR-2)**: list such adjudications in the stale block with their own tag, for example `[inert adjudication — keyed to an ERROR row] <key>`.
  - **Why**: the realistic path is a previously adjudicated row that later becomes an ERROR (a config turns unloadable). Once the ERROR is repaired, the old ruling resumes covering the row silently, without anyone re-reading it.
  - A visible "inert" tag makes the re-read happen when the ERROR is fixed.

## Knock-on for 123 Task 13.6

- **After PR-2, "`npm run audit:coverage-map` passes" means both sections pass**: the first line reads `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`, and the exit code is 0.
- So a new **unadjudicated lane row** appearing during U2b would block 13.6's "passes" evidence, even though 13.6's own subject is the surfaces rows. The same happens if the agent-generator row is still unresolved and new generator suites change its evidence; the row stays adjudicated, but the run shows it.
- The 13.6 author should expect this, and should read the first line's **surfaces** part for 13.6(ii).
- **My U2b reads grep**:
  - the exit code;
  - the prefix `^audit:coverage-map: PASS` (never `PASS$`);
  - the per-surface rows for 13.6(ii);
  - `grep -c "expires when 123 Task 13.6"` for 13.6(iv).
- **The F3 string and this row's string are distinct**, so neither grep counts the other's rows.

## Verification at this commit

- `npm run audit:coverage-map` → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`. The lanes section shows 11 rows `[adjudicated]`, with stale adjudications `(none)`.
- `grep -c "expires when the test:agent-generator lane step lands" canonical/adjudications.yaml` → 1.
- The rows parse; I loaded all 11 `audit:coverage-map:lanes` entries with js-yaml.
