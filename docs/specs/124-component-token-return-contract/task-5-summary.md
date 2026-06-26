# Task 5 Summary: Spec-Level Synthesis — Component-Token Return Contract

**Date**: 2026-06-26
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 124-component-token-return-contract

## What Was Done

Authored the spec-level completion synthesis and logged all deferred/out-of-scope items. Spec 124 converted the last side-effect seam (component-token registration) into a return-value seam: `defineComponentTokens` returns a non-enumerable, value-survivable branded value-map; `loadComponentTokens` harvests it as the **sole** registry writer; `allowOverwrite` is retired.

## Why It Matters

This is the spine fix for the Spec 118 dual-instance blocker: the component-token registry was the only consumer-`.ts` seam relying on a shared-singleton side effect across the tsx boundary, which silently zeroed tokens when the scoped require split the registry into two instances. Harvesting a value-survivable brand removes the cross-boundary singleton entirely — the ratified target-model end-state.

## Verified Outcome

- ✅ `generate` **0 → 33** component tokens; `git diff token-index/` empty (R6, value AND order).
- ✅ Full `npm test` **375 suites / 8979 tests / 0 failed**; `tsc` clean; `build` ok — all verified **twice** in the main loop.
- ✅ 4 brand caveats hold; isolation audit clean; dual-instance proof has teeth.

## Honest Notes

- **Migration surface = 7 files, not the predicted 5** (2 surfaced by the full suite; static estimation under-counted twice).
- **R6: preserve scan order, no sort** — overturned the pre-spike sort lean.
- **Packed-install arbiter needed `--forceExit`** for the pre-existing 118 MCP-teardown leak (not introduced by 124).

## Deferred / Logged

- C′ authoring-convention seed → Spec 123; broader class-invariant lint → 118's 9.4 / Task 11.
- Two pre-existing items seeded as issues (`package.json` `"types"`-condition ordering; token-index filesystem-ordering portability).
- `docs/token-system-overview.md` "Automatic registration" bullet fixed; Docs MCP rebuilt. Steering staleness (`Rosetta-System-Architecture.md:449`) flagged for governance, NOT edited.
- Double-registration issue confirmed resolved and closed.

## 118 Handback (Task 6)

Unblocked (delivery gate green), **awaiting Peter's authorization**. Nothing written into 118. `tasks.md`: Task 5 checked; Task 6 NOT checked.
