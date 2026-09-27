# Issue: the re-keyed brand-survival packed test may not exercise a genuine two-copy module boundary for `progress.*`

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Ada (Spec 124's dual-instance guarantee is her design; `loadComponentTokens.ts` Source 1 / `scopedTsRequire` are her territory)
**Trigger**: next Spec 124/dual-instance-adjacent touch, or before this finding is relied on as settled.
**Source**: Spec 123 U1 Task 9 (Thurgood), found while executing the brand-survival bite (a) manual verification requirements.md Req 3.2 names.

## The gap

`tests/consumer-integration.test.ts`'s `generate produces output files` test was re-keyed (Req 3.2, this task) from asserting `inputradio.box.sm` (a token that lived under the now-removed `src/components/core` copy) to asserting `progress.node.size.sm` (a token in `src/tokens/component/progress.ts`, copied as part of the consumer's OWN token tier under Model B, harvested by `loadComponentTokens`'s **Source 1**: `{tokenSourceRoot}/component/*.ts`).

`src/build/tokens/__tests__/brand-dual-instance.test.ts` states outright: *"The authoritative end-to-end dual-instance proof rides the packed-install arbiter (`tests/consumer-integration.test.ts`)."* That is the property the re-keyed assertion is supposed to keep proving.

**What I found, manually verifying the bite requirements.md names** ("(a) swap `defineComponentTokens`'s brand for a plain `Symbol()` → the assertion goes RED"):

1. Temporarily changed `TOKEN_CONTRACT_BRAND` (`src/build/tokens/defineComponentTokens.ts`) from the frozen string to `Symbol('@3fn/dp:tokenContract-BITE')` (plus the one cast-site fix `tsc` needed).
2. Rebuilt (`tsc --skipLibCheck`), packed, installed into a throwaway consumer, ran `init` + `generate`.
3. **`progress.node.size.sm` still harvested successfully** (`Component tokens: 10`) — the bite did NOT reproduce red.
4. Added a one-line diagnostic (`console.error` at `defineComponentTokens.ts`'s module top level, printing a random per-load id) and re-ran the same pack/install/generate cycle: **the diagnostic line printed EXACTLY ONCE** for the whole `generate` run.

That means, empirically, on this branch today: loading `progress.ts` via Source 1 does **not** create a second, distinct instance of `@3fn/core/build`/`defineComponentTokens.ts` — the harvest and the brand-write happen against the SAME module instance, so the brand mechanism trivially "works" regardless of whether the key is a string or a Symbol. The bite requirements.md names for clause (a) has no teeth against `progress.*` in its current form.

**Not established, and not investigated further here** (out of Task 9's scope and time): WHY. Candidates, none confirmed:
- `@3fn/core/build`'s compiled `.js` (unlike a raw `.ts` file) may not go through tsx's scoped/namespaced resolution at all, so it resolves via Node's ordinary `require.cache` regardless of which site requires it — in which case the SAME would already be true for whatever the ORIGINAL `Input-Radio-Base` case exercised, and the "authoritative proof" may have stopped proving what it claims well before this task.
- Something specific to Source 1's loading order (vs. Source 2's, historically used by `src/components/core/<Name>/*.tokens.ts` files) changes which copy is already cached by the time the component file loads.

**Disposition for Task 9**: clause (b) of Req 3.2 (provenance — delete the consumer-tree source file, the token disappears) WAS verified and automated (`tests/consumer-integration.test.ts` › `C6: brand-survival — consumer-tree provenance`) — that property holds regardless of the instance question. Clause (a)'s bite is reported here, unresolved, rather than claimed.

## Scope

A resolution needs someone who can trace `scopedTsRequire`'s actual behavior for a compiled `.js` require (vs. `.ts`) and/or reconstruct whether the pre-123 `Input-Radio-Base` case ever genuinely crossed the boundary at packed-install time. Not a Task 9 fix — `defineComponentTokens.ts` / `scopedTsRequire.ts` are outside its Primary Artifacts.

## Filed by

Thurgood (Spec 123 U1 Task 9), 2026-09-27.
