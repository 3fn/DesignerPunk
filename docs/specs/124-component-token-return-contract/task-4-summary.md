# Task 4 Summary: Guards, Negative Case, Isolation Audit & Dual-Instance Certification

**Date**: 2026-06-26
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 124-component-token-return-contract

## What Was Done

Closed the delivery gate. Added the negative guard (unbranded module harvests to zero), the class-invariant guard (isolated `defineComponentTokens` leaves the registry empty — proves sole writer), and a constructed dual-instance brand-survival test via `jest.isolateModules`. Ran the packed-install arbiter and the isolation audit. All three delivery-gate conditions met.

## Why It Matters

Same-process green can't prove cross-boundary brand survival — it passes for both the correct value-survivable string-key brand AND a broken per-copy `Symbol()`. Task 4 supplies the falsifiable proof: the dual-instance test was shown to have **teeth** (a temporary plain-`Symbol()` variant went RED on 3/4 cases; reverted byte-clean), and the packed-install arbiter proves end-to-end survival across a real second copy of `@3fn/core/build`.

## Key Results

- **Proof of teeth**: temporary `Symbol()` brand → 3/4 RED; reverted byte-identical → green. The lane distinguishes correct brand from broken.
- **Packed-install arbiter**: 9 passed / 1 pre-existing skip / 0 failed; consumer `components.yaml` N>0 and contains `inputradio.box.sm`. Run with `--forceExit` for the **pre-existing** 118 MCP-teardown leak (not introduced by 124).
- **Isolation audit**: `ComponentTokenRegistry` was the only mutable-accumulate-read-back singleton on the consumer-boundary path; `unitConverter`/`transformerRegistry`/color `Map`s verified benign.

## Impact

- ✅ Delivery gate CLOSED: dual-instance proof green; `npm test` **375 suites / 8979 tests / 0 failed**; `tsc` clean; `build` ok; `git diff token-index/` empty (value AND order).
- ↪ Deferred to 118's 9.5.3: the registerless-bin dual-instance re-cert (124 proves the register-keep bin; 118 becomes a re-run).
- ↪ Task 6 (118 handback) unblocked, pending Peter's authorization.
- ↪ Double-registration issue plausibly closed (confirm in Task 5).
