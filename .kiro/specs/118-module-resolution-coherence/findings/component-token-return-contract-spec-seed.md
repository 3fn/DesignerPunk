# Spec Seed — Component-Token Return Contract (Option 1) — the prerequisite that unblocks 118 Task 9.5.3

**Date**: 2026-06-25
**Status**: SEED for a new spec (number TBD at formalization). Decided by Peter (2026-06-25): the fix for 118's 9.5.3 blocker is **Option 1**, scoped as **its own spec** (component-token architecture, distinct from 118's module-resolution domain). This seed captures the problem + the decided approach + Lina's & Ada's analysis so the new spec doesn't re-derive.
**Owners**: Lina (the `defineComponentTokens` return-contract + component-token-authoring convention — the real work) ; Ada (the `loadComponentTokens` harvest + seam confirmation — small) ; Thurgood (test-isolation guards) ; Peter (ratifies the contract change).
**Hard linkage**: this spec is a **PREREQUISITE for Spec 118 Task 9.5.3** (retiring the bin's global tsx register). 118 is PAUSED at 9.5.3 until this lands. See `findings/9.5.3-component-registry-dual-instance-blocker.md`.

---

## The problem (why this exists)
Retiring 118's global tsx register exposes a **dual-instance `ComponentTokenRegistry` split**: a consumer's `<component>.tokens.ts` calls `defineComponentTokens()` (side effect → registers into `ComponentTokenRegistry`). Loaded registerless via the scoped seam (`scopedTsRequire`), tsx loads its OWN copy of `@3fn/core/build` → a SECOND registry → the side effect lands in the duplicate → `loadComponentTokens` reads the canonical (empty) one → **0 component tokens**. Component tokens are the ONLY consumer-`.ts` seam relying on a **shared-singleton side effect** rather than a return value (config + token-source seams consume return values and are fine).

## The decided fix — Option 1 (convert the last side-effect seam to a return-value seam)
Make the component-token collection NOT depend on a shared mutable singleton across the tsx boundary. Then a green consumer guard means *actually* robust.

### The decisive constraint (Lina + Ada both verified — do NOT skip)
**`defineComponentTokens`'s RETURN is LOSSY.** It returns `ComponentTokenValues<T> = { [K in keyof T]: number }` (just values, e.g. `{ 'box.sm': 24 }` — `defineComponentTokens.ts:113-115, 217`), but REGISTERS the rich `RegisteredComponentToken[]` (`{ name, component, family, value, primitiveReference, reasoning }` — `:193-210, 215`) that the whole pipeline consumes. So "just harvest the existing exports" does NOT work — the metadata only exists inside the registry. **Real Option 1 = change `defineComponentTokens` to RETURN the rich metadata (additively/tagged, backward-compatible superset), then `loadComponentTokens` harvests it from each loaded module's exports and registers into the CANONICAL parent-cache registry itself.** The side effect never crosses the boundary; downstream consumers (which need the rich shape) are untouched.

### Why Option 1, not Option 2 (the priming/parent-cache-share)
Ada's seam analysis: Option 2 is **fragile + silent**. No tsx API expresses "load `.ts` fresh, delegate compiled `.js` to the parent cache"; it's an *undocumented* emergent behavior. The prime only seeds the one barrel the test traverses — a component reaching the registry by a different specifier → duplicate → **silent 0 tokens**, which the guard wouldn't catch. **This is disqualifying given C′** (118's ratified decision that consumers author their OWN components): Option 2 would silently break consumer-authored components, and its green guard is a false positive. Option 1 is target-model-aligned ("seams consume return values, no shared mutable singleton") and guard-green == robust.

## Scope (the real work — Lina's domain)
- **`src/build/tokens/defineComponentTokens.ts`** — change the return so the rich `RegisteredComponentToken[]` is recoverable from the module's exports (return it, or a tagged `{ values, registered }`). **Backward-compatible:** any author destructuring the flat value-map today (`X['box.sm']`) must keep working — return a superset, not a replacement. Settle the **harvest convention**: the export shape is heterogeneous (only 6 of 14 component-token files register via `defineComponentTokens`; 8 are plain CSS-var/literal maps; the value-map return is structurally indistinguishable from a hand-rolled map → a **tag/brand is needed** so `loadComponentTokens` can identify a `defineComponentTokens` result among arbitrary co-mingled exports).
- **`src/cli/loadComponentTokens.ts`** — capture `loadModule(...)`'s return (currently discarded, `:55,:84`), harvest the tagged results, register into the canonical registry; drop the `getAll()`-read-of-a-possibly-duplicate dependence and the `setDefaultAllowOverwrite` global-mode dance (`:45,:66`). Seam primitive (`scopedTsRequire`) is UNCHANGED.
- **Keep these consumers working (read the rich registry):** `designerpunk.ts:145`, `TokenFileGenerator.ts:249,269,518,549,599`, `ValidationCoordinator.ts:724,764`, `generateTokenIndex.ts:30`.
- **Certification:** the consumer guard must assert the init'd consumer's `generate` (eventually through the registerless bin) produces **N>0 component tokens** — `token-index/components.yaml` non-empty / contains `inputradio.box.sm`. (For THIS spec, certify via the current register-keep bin; the registerless re-certification is 118's 9.5.3.)

## Latent issues this spec can ALSO fix (Lina flagged — optional, deliberate)
The shared-mutable-singleton has independent hazards: cross-test pollution / order-dependence (`ComponentTokenRegistry.clear()` `:261`); `setDefaultAllowOverwrite` global mode (`:84-86`). Option 1 (return-value collection) removes the whole class. Thurgood on test-isolation guards. Decide in-spec whether to fully retire the singleton or just stop crossing the boundary.

## After this lands → resume 118 Task 9.5.3
Re-apply the (already-solved) registerless bin + the `files` build-tracking-glob broadening (`dist/**/*.{js,d.ts,json,css,swift,kt}` + exclude `__tests__` + re-include the fixture — see the blocker finding), then re-run the consumer guard (now N>0 component tokens via Option 1) to close Risk #2.
