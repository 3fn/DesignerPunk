# Task 13 Summary: Triviality floor, dispositions, overlays, signatures, freshness, and ballot B-U2

**Date**: 2026-09-28
**Purpose**: Concise summary of Task 13 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Step 5 of U2b built the re-grounding contract's mechanical half. It also ratified the governance ballot that carries its counting duties.

- **Triviality floor** (`tools/agent-generator/regrounding/triviality.ts`, Lina):
  - the occurrence assignment, with its witness;
  - the entry set, and per-unit scope;
  - a verdict type with no TRIVIAL value (the floor never condemns);
  - the hard floor.

  It runs over the G1 renderings, copied as fixtures with pinned provenance. The AX-1 bite reproduces: `includes` gives 15/30 CLEARS, the assignment 14/30 ROUTES.
- **The schemas and checks** (`regrounding/`, Thurgood; `derive.ts` key checks, Lina):
  - dispositions: explicit rows, per-member frontmatter, no re-pointed embeds, the rejected term;
  - overlays, with hash pins;
  - signatures: C1 signer, stale, bare;
  - operative-set confirmer and verbatim checks.

  **All nine refusals** have a named test, a recorded bite and the design's exact string, and the count is asserted.
- **`operative-set-freshness` inside `122-diff-guard`** (Lina): it runs on every guard run, with a STANDING stale-fixture test. The coverage-map rows for the two canonical surfaces now list the guard. The eight time-boxed U2a adjudications expired, and the Task 11 precursor test was absorbed and deleted.
- **Ballot B-U2** was ratified by Peter on 2026-09-28, after four Stacy review rounds and two post-ratification reads.
  - Stacy's claims-pass counting block gains **re-grounding dispositions**:
    - a state metric, baselined at the first render;
    - event metrics, counted from history, which skip the first render;
    - a Peter-sampled spot-check of Stacy-signed assents;
    - a gap line for a not-yet-built signal.
  - It was applied at 13.8, with five F-1 errata.
  - The L686 rule edit follows at 17.3.

## Why It Matters

These instruments decide mechanically whether a consumer rendering keeps a charter's operative content, and they refuse on staleness, orphans and missing rows. That is the ground G2 (pass four, Task 18) tests. The ballot gives Stacy's seat the counts that detect rubber-stamp assent from the second population onward.

## Key Changes

- **New**:
  - `tools/agent-generator/regrounding/`: `triviality`, `dispositions`, `check-catalog`, `hash`, `c1`, `overlay`, `signatures`, `operative-sets` and `freshness`;
  - `tools/agent-generator/derive.ts` (key checks);
  - `__fixtures__/g1-renderings/` and `__fixtures__/stale-unit/`;
  - the ballot `.kiro/docs/ballots/2026-09-28-123-b-u2.md`;
  - two issues.
- **Updated**:
  - `diff-guard.ts` (the sweep, and a `--root` option), `coverage-map.ts`;
  - `canonical/agents/stacy.md` (the counting block) and its two renderings;
  - `canonical/adjudications.yaml`, `canonical/operative-sets/component-family-navigation.yaml`;
  - the F-1 errata in `tasks.md`, `design.md` and `requirements.md`, and the design Data Models erratum.
- **Deleted**: `src/__tests__/operative-set-records.test.ts`.

## Impact

- `npm test`: 384 suites / 9268 tests green.
- `test:agent-generator`: 42 suites / 692 tests green.
- Parity 16/16.
- Three rows are ⚠️ with named follow-ups: two `refs/pull` citations owed at Task 18.3, and the counting-block unit's first confirmation at 15.4.
- Carried: register rows for the re-grounding rules (a later ballot), the Task 17 parity test and workflow pointer, and the Task 15 wiring items.
