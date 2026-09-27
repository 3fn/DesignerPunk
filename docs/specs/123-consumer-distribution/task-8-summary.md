# Task 8 Summary: The harvest-zero lint

**Date**: 2026-09-27
**Purpose**: Concise summary of Task 8 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Added the harvest-zero lint to `src/cli/loadComponentTokens.ts`: `npx designerpunk generate` now warns when a scanned `tokens.ts` / `*.tokens.ts` file exports no `defineComponentTokens`-branded value. This targets the confusion 124's authoring-convention seed named — the filename is worn by two mechanisms (value-registration files and plain semantic-reference maps) — and gives a consumer who names a reference map `tokens.ts` a signal at the moment of confusion, without them needing to read the package's source.

The lint reuses the existing `getTokenContract` brand check the harvest already runs; no second detection mechanism was introduced. It counts branded exports per file, and — the correction Lina's R2 review made to the requirement — the count is taken *before* the loader's cross-module, first-seen-wins name dedupe. A fully branded, legitimate file whose token names happen to have already been harvested from an earlier-scanned module still counts non-zero and does not warn; only a file that exports nothing branded at all does.

The lint's launch gate was the prerequisite: Lina's `*.refs.ts` rename (issue #200) had to land first, so the lint's first-ever run against our own source produces zero false positives. That ancestry was confirmed, and `npx designerpunk generate` was run with the lint code present but not yet committed, producing zero harvest-zero warnings — proving the property before the commit that locks the lint in.

## Why It Matters

Without the gate, merging the lint before the rename would have produced warnings against DesignerPunk's own shipped files — teaching consumers the warning is noise before it ever fired on a real mistake. With the gate honored, the lint's first appearance in a consumer's `generate` output is guaranteed informative: it only fires on files a consumer authored themselves.

## Key Changes

- `src/cli/loadComponentTokens.ts`: per-file branded-export tally (`brandedCountByFile`), the `tokens.ts` / `*.tokens.ts` naming filter (`isTokenFileName`), and the warning emission + `harvestZeroWarning(file)` message.
- `src/cli/__tests__/loadComponentTokens.test.ts`: fixture tests for the unbranded-fires-once and branded-fires-never cases; the pre-existing discovery test updated to locally silence the (now legitimate) warning its unbranded fixtures trigger.
- No design.md catalog row exists for the warning's exact string — flagged for a Thurgood erratum to add one, following `design-outline.md` § 4.5's proposed wording in the interim.
