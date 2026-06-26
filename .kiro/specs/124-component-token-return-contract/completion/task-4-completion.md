# Task 4 Completion: Guards, Negative Case, Isolation Audit & Dual-Instance Certification — Delivery Gate CLOSED

**Date**: 2026-06-26
**Task**: 4 — certification (closes the delivery gate)
**Type**: Architecture
**Status**: **GO — delivery gate CLOSED.** All three conditions met. Not yet committed (Peter reviews the diff).
**Validation Tier**: Tier 3 — Comprehensive
**Agent**: Thurgood (Ada consulted on reproducibility)
**Branch**: `spec-118-module-resolution-coherence`

---

## What was certified

Task 3 shipped the contract + harvest green same-process, but same-process green is necessary, not sufficient: it passes for both the correct value-survivable string-key brand AND a broken per-copy `Symbol()`. Task 4 supplies the falsifiable proof and the guards that keep the seam from regressing.

## Guards added

| Guard | File | Asserts |
|-------|------|---------|
| **Negative guard (R4)** | `src/cli/__tests__/loadComponentTokens.test.ts` (`negative guard` describe) | An unbranded module — including a value-map structurally identical to a flat token map (`{ large: 12 }`), a string const, and a getter — harvests to **zero**; registry stays empty. Branded-only inclusion is the sole criterion. |
| **Class-invariant guard (R8 AC2)** | `src/cli/__tests__/loadComponentTokens.test.ts` (`class-invariant guard` describe) | Calling `defineComponentTokens` in isolation (the brand-WRITE path) brands the result (rich tokens recoverable) but leaves the canonical `ComponentTokenRegistry` **empty** — proves P4 (sole writer). REDS loudly if a self-registration side effect is reintroduced. |
| **Constructed dual-instance brand-survival (R2/R7, with teeth)** | `src/build/tokens/__tests__/brand-dual-instance.test.ts` (new file) | Two genuinely separate module copies via `jest.isolateModules`; a result branded by copy A is recovered **by value** by copy B's `getTokenContract`; companion proof-of-teeth shows a per-copy `Symbol()` brand would NOT survive across copies; idempotent dual-path re-brand tolerated. Lightweight, same-process, exits clean under `--detectOpenHandles`. |

Non-enumerability + idempotency guards already added in Task 3 (`defineComponentTokens.test.ts`) — audited present and passing.

## Proof of teeth (the crux)

The constructed dual-instance test was temporarily swapped to a per-copy module-level `Symbol()` brand (the broken Option C). The test went **RED on 3 of 4 cases**: "recognized by value by copy B" failed, "proof of teeth" failed, "idempotent re-branding" failed; only the structural "distinct instances" case passed. Reverted **byte-identical** to the verified Task-3 state; the test went green again. The lane genuinely distinguishes the correct string-key brand from a broken `Symbol()` — it has teeth.

## Packed-install arbiter (authoritative dual-instance lane)

`tests/consumer-integration.test.ts`, run via `test:consumer` with **`--forceExit`** to neutralize the **pre-existing** MCP-smoke orphan hang (a tracked Spec 118 teardown leak, **NOT introduced by 124**): **9 passed, 1 skipped (pre-existing `validate` skip), 0 failed.** The `generate produces output files` test (now carrying the 124 R7 assertion) passed: the packed-install consumer's `token-index/components.yaml` exists, is non-empty (N>0), and **contains `inputradio.box.sm`**. This is the end-to-end brand-survival proof across a real second copy of `@3fn/core/build`, on the current register-keep bin (R7 AC3).

**Deferred to 118's 9.5.3 (NOT 124):** the **registerless-bin** dual-instance re-cert. 124 proves survival on the register-keep bin; 118 resume step 2 becomes a true re-run of an already-passing assertion, not the first real test.

## Isolation audit

`ComponentTokenRegistry` was the **only** mutable-accumulate-read-back singleton on the consumer-boundary load path. Verified-benign peers: `unitConverter` (stateless), `transformerRegistry` (populate-at-init / read-in-same-copy — each copy self-populates identically), color `Map`s (immutable lookup tables). The class invariant (R8 AC1) — "no mutable-accumulate-then-read-back state crosses the scoped-require boundary" — holds after 124. The broader lint codification is flagged for 118's 9.4 / Task 11 (R8 AC3), NOT built here. See `findings/isolation-audit.md`.

## Delivery gate — each condition

1. **Brand survival on a real dual-instance lane** — **MET.** (a) packed-install arbiter end-to-end (N>0, `inputradio.box.sm`) on the register-keep bin; (b) a constructed two-copy `isolateModules` test with proof-of-teeth.
2. **Full `npm test` + `tsc` + `npm run build` green** — **MET.** `tsc --noEmit` exit 0; `npm test` **375 suites / 8979 tests / 0 failed** (+1 suite, +6 tests vs Task 3); `npm run build` exit 0 (only pre-existing package.json export-condition-ordering warnings).
3. **`git diff token-index/` empty** — **MET.** `generate` → "Component tokens: 33"; `git diff` + `git status --porcelain` on `token-index/` both empty (value AND order).

## Double-registration issue assessment (handed to Task 5)

`.kiro/issues/bug-component-token-double-registration.md` is **plausibly closed by 124** — the harvest is the sole writer and the side effect is removed, so no second registration path exists by construction. Caveat flagged for Task-5 confirmation: verify the issue's specific cited root cause — the side-effect `import '../tokens/component/progress'` in `generateTokenIndex.ts` — is gone/harmless.

## Go / No-Go

**GO.** The delivery gate is closed. Task 6 (the 118 handback) is unblocked pending Peter's authorization and his review of the uncommitted diff.

## Artifacts

`tests/consumer-integration.test.ts` (arbiter R7 assertion); `src/build/tokens/__tests__/brand-dual-instance.test.ts` (new); `src/cli/__tests__/loadComponentTokens.test.ts` (negative + class-invariant guards); `findings/task-4-certification.md`, `findings/isolation-audit.md`. **Not committed** (Peter review pending). _Requirements: 2.4, 2.5, 3.1, 4.1, 4.2, 4.3, 6.1, 6.2, 6.4, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2._
