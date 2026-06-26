# Task 4 Certification — Guards, Negative Case, Isolation Audit & Dual-Instance Proof

**Date**: 2026-06-26
**Spec**: 124 — Component-Token Return Contract
**Task**: 4 — certification (closes the delivery gate)
**Agent**: Thurgood
**Status**: **GO — delivery gate CLOSED.** All three conditions met. Not committed (Peter reviews).

---

## Guards added

| Guard | File | Asserts |
|-------|------|---------|
| **Negative guard (R4)** | `src/cli/__tests__/loadComponentTokens.test.ts` (`negative guard` describe) | An unbranded module — incl. a value-map structurally identical to a flat token map (`{ large: 12 }`), a string const, and a getter — harvests to **zero**; registry stays empty. Branded-only inclusion is the sole criterion. |
| **Class-invariant guard (R8 AC2)** | `src/cli/__tests__/loadComponentTokens.test.ts` (`class-invariant guard` describe) | Calling `defineComponentTokens` in isolation (brand WRITE path) brands the result (rich tokens recoverable) but leaves the canonical `ComponentTokenRegistry` **empty** — proves P4 (sole writer). REDS loudly if a self-registration side effect is reintroduced. |
| **Constructed dual-instance brand-survival (R2/R7, with teeth)** | `src/build/tokens/__tests__/brand-dual-instance.test.ts` (new file) | Two genuinely separate module copies via `jest.isolateModules`; a result branded by copy A is recovered BY VALUE by copy B's `getTokenContract`; companion proof-of-teeth shows a per-copy `Symbol()` brand would NOT survive across copies; idempotent dual-path re-brand tolerated. Lightweight, same-process, exits clean under `--detectOpenHandles`. |

Non-enumerability + idempotency guards already added in Task 3 (`defineComponentTokens.test.ts`) — audited present and passing.

## Proof of teeth (the crux)

Temporarily swapped the brand write/read to a per-copy module-level `Symbol()` (the broken Option C). The dual-instance test **RED**: "recognized BY VALUE by copy B" failed, "proof of teeth" failed, "idempotent re-branding" failed (only the structural "distinct instances" test passed). Reverted byte-identical to the verified Task-3 state; test green again. The lane genuinely distinguishes the correct string-key brand from a broken `Symbol()`.

## Packed-install arbiter (authoritative dual-instance lane)

`tests/consumer-integration.test.ts`, full suite via `test:consumer` (run with `--forceExit` to neutralize the pre-existing MCP-smoke orphan hang — a tracked Spec 118 leak, NOT introduced by 124): **9 passed, 1 skipped (pre-existing `validate` skip), 0 failed.** The `generate produces output files` test (now carrying the 124 R7 assertion) passed: the packed-install consumer's `token-index/components.yaml` exists, is non-empty (N>0), and **contains `inputradio.box.sm`**. This is the end-to-end brand-survival proof across a real second copy of `@3fn/core/build`, on the current register-keep bin (R7 AC3). The registerless re-cert is 118's 9.5.3 — NOT 124.

## Isolation audit

See `findings/isolation-audit.md`. `ComponentTokenRegistry` was the **only** mutable-accumulate-read-back singleton on the consumer-boundary path. Verified-benign peers: `unitConverter` (stateless), `transformerRegistry` (populate-at-init / read-in-same-copy), color `Map`s (immutable).

## Delivery gate — each condition

1. **Brand survival on a real dual-instance lane** — **MET.** Level 124 achieves: (a) packed-install arbiter end-to-end (N>0, `inputradio.box.sm`) on the register-keep bin; (b) a constructed two-copy `isolateModules` test with proof-of-teeth. Deferred to 118's 9.5.3: the **registerless** bin re-cert (118 resume step 2 becomes a true re-run, not the first real test).
2. **Full `npm test` + `tsc` + `npm run build` green** — **MET.** `tsc --noEmit` exit 0; `npm test` **375 suites / 8979 tests / 0 failed** (+1 suite, +6 tests vs Task 3); `npm run build` exit 0 (only pre-existing package.json export-condition-ordering warnings).
3. **`git diff token-index/` empty** — **MET.** `generate` → "Component tokens: 33"; `git diff` + `git status --porcelain` on `token-index/` both empty (value AND order).

## Double-registration issue assessment

`.kiro/issues/bug-component-token-double-registration.md` is **plausibly closed by 124** (confirm in Task 5; do not edit the issue here). The bug was double-registration (package side-effect import + local `loadComponentTokens` scan both calling `defineComponentTokens` → conflict throw). 124 makes the harvest the **sole writer** and removes the side effect entirely, so no second registration path exists by construction. Caveat: the issue's specific root-cause line — the side-effect `import '../tokens/component/progress'` in `generateTokenIndex.ts` — should be confirmed gone/harmless as part of the close (the rich-shape read path now sources from the harvest-populated registry); flagged for Task 5 verification.

## Go / No-Go

**GO.** The delivery gate is closed. Task 6 (the 118 handback) is unblocked pending Peter's authorization and his review of the uncommitted diff.
