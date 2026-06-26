# Design Outline: Component-Token Return Contract

**Date**: 2026-06-25
**Spec**: 124 — Component-Token Return Contract
**Status**: Design outline (North Star rationale) — pre-requirements. Ready to formalize into requirements/design/tasks.
**Leads**: Lina (component-token architecture — the `defineComponentTokens` return contract + the collection convention; owns the authored surface); Ada (the `loadComponentTokens` harvest + the scoped-seam confirmation); Thurgood (test-isolation guards + spec formalization); Peter (ratifies the shipped contract change).
**Origin**: Surfaced by Spec 118 Task 9.5.3 (`.kiro/specs/118-module-resolution-coherence/findings/component-token-return-contract-spec-seed.md` + `9.5.3-component-registry-dual-instance-blocker.md`). **This spec is a hard prerequisite for 118's 9.5.3** (and thus 118's final Risk-#2 closure).

---

## North Star

**Component tokens should be collected the way every other consumer-`.ts` seam already is: by consuming the loaded module's return value — not by a shared mutable singleton mutated as a side effect across module boundaries.**

This is the last seam in DesignerPunk's runtime-TS-resolution model that still relies on a shared-singleton side effect. Spec 118 converted config-loading and token-source-loading to *scoped, return-value* seams; component-token loading was left on the old pattern (`defineComponentTokens()` registers into a global `ComponentTokenRegistry`; `loadComponentTokens()` reads it back). 118's ratified target model states the principle explicitly: *"seams consume return values, no shared mutable singleton across the tsx boundary."* Spec 124 finishes that model for component tokens.

## The problem this solves (why now)

When 118 retires the bin's global tsx register (Task 9.5.3), component tokens silently break. The scoped seam (`scopedTsRequire`) loads a consumer's `<component>.tokens.ts` inside tsx's own module registry, which loads a **second copy** of `@3fn/core/build` → a **second `ComponentTokenRegistry`**. `defineComponentTokens`'s side effect registers into the duplicate; `loadComponentTokens` reads the canonical (empty) instance → **0 component tokens, no error**.

Critically, this is not a theoretical edge case: Spec 118's ratified **C′ decision** is that *consumers author their own components*. The shared-singleton-across-the-boundary pattern fails **silently** for exactly the consumer-authored-component case 118 built — and a guard that tests the package's own components would pass as a false positive. A clean, stable architecture cannot rest on that.

## The decision (rationale recorded, do not re-litigate)

**Option 1 — convert the component-token seam to a return-value seam.** Rejected alternatives:
- **Option 2 (share the parent module cache / prime `@3fn/core/build` so there's one registry instance):** rejected. It relies on *undocumented* tsx cache-delegation behavior; the prime only seeds the one barrel the test traverses, so a component reaching the registry by any other specifier (a consumer-authored component, a deep import, a future re-export) silently desyncs to 0. Fails silent; guard is a false positive; entrenches the shared-singleton the target model rejects.
- **Option 3 (process-global registry handle):** rejected — reintroduces process-global state, against the spec's no-global-residue value.

Option 1 is the only one where a green consumer guard means *actually robust* (no cross-boundary singleton to desync), and it is target-model-aligned.

## The decisive technical constraint (Lina + Ada both verified — drives the whole design)

**`defineComponentTokens`'s current RETURN is lossy.** It returns `ComponentTokenValues<T> = { [K in keyof T]: number }` (just values, e.g. `{ 'box.sm': 24 }`), but *registers* the rich `RegisteredComponentToken[]` — `{ name, component, family, value, primitiveReference, reasoning }` — which the entire downstream pipeline consumes. So "just harvest the existing exports" is **impossible**: the metadata exists only inside the registry. Therefore Option 1 *requires* changing what `defineComponentTokens` returns so the rich metadata is recoverable from a loaded module's exports.

## Approach (sketch — design concretizes)

1. **`defineComponentTokens` returns the rich, collectable result** — backward-compatibly. The current flat value-map (`X['box.sm']` → number) that authors rely on must keep working, so the new return is an *additive superset* (e.g. the value map plus a recoverable, **tagged/branded** `RegisteredComponentToken[]`), not a replacement.
2. **`loadComponentTokens` harvests from the loaded modules' exports** instead of reading a possibly-duplicate registry singleton: scoped-`require` each component `.ts`, iterate its exports, identify the tagged `defineComponentTokens` results, collect the rich tokens, and **register them into the canonical (parent-cache) registry itself** — so the side effect never crosses the tsx boundary and all downstream consumers are untouched.
3. **The scoped seam (`scopedTsRequire`) does not change** — it already returns the module's exports. This is confirmed; the work is the contract + the harvest.

## Scope & boundaries

**In scope:**
- The `defineComponentTokens` return-contract change (`src/build/tokens/defineComponentTokens.ts`) + the **collection convention** (how a `defineComponentTokens` result is reliably identified among a module's arbitrary, co-mingled exports — a tag/brand, since the value-map shape is structurally indistinguishable from a hand-rolled `{large: 12}` map).
- The `loadComponentTokens` harvest + canonical registration (`src/cli/loadComponentTokens.ts`).
- A standing **N>0 component-token consumer-guard assertion** (the init'd consumer's `generate` produces non-empty `components.yaml` / contains `inputradio.box.sm`), so the path is guarded for any component the scan reaches.

**Optional / decide in-design (the latent class Option 1 *can* also fix):** the shared-mutable-singleton's independent hazards — cross-test pollution / order-dependence (`ComponentTokenRegistry.clear()`), and the `setDefaultAllowOverwrite` global-mode dance. Return-value collection removes this whole class. Decide whether to fully retire the singleton's mutable-global aspects in this spec or fast-follow.

**Out of scope:** the scoped seam primitive (unchanged); 118's bin retirement (124 unblocks it, 118 re-applies + re-certifies); module-resolution concerns generally.

## Key design considerations / open questions (for the design phase)

1. **The collection convention.** The export surface is **heterogeneous**: of 14 component-token files, only 6 register via `defineComponentTokens`; 8 are plain CSS-var/literal maps (a *different* mechanism). How does the harvest cleanly identify `defineComponentTokens` results without false positives? (Lina's call — a tag/brand vs a registration-record return vs a naming convention.) And: do the 8 map-style files need any change, or are they orthogonal (they don't feed the registry today)?
2. **Backward compatibility of the return.** Authors destructure the flat value-map today (`RadioSizingTokens['box.sm']`). The new shape must keep that ergonomic. Superset object? A value-map with a non-enumerable tagged sidecar? Type-checked so a breaking change fails loud.
3. **Avoiding double-registration.** If `defineComponentTokens` still registers as a side effect *and* `loadComponentTokens` harvests-and-registers, ensure the canonical registry isn't double-populated or conflict-flagged. (Likely: harvest-and-register becomes the source of truth; the in-module side effect either stops or lands harmlessly in the discarded duplicate.)
4. **Singleton retirement depth.** Fully eliminate the mutable global (return-value all the way through) vs. keep the registry as a populated-by-harvest store the existing read-consumers use. The latter is the smaller, safer step; the former is the cleaner end-state. Weigh per the "coherent intermediate on a mapped path" standard.

## Consumers that must keep working (the rich registry stays populated)

`designerpunk.ts:145` (→ `generateTokenIndex` `componentTokens`), `TokenFileGenerator.ts:249` (per-platform component output — needs `family`/`value`/`primitiveReference`), `ValidationCoordinator.ts:764,724` (validation — needs `primitiveReference`), `generateTokenIndex.ts:30`. Plus the build script's `loadComponentTokens` path. Whatever 124 changes, these read the rich `RegisteredComponentToken[]` and must be unaffected.

## Verification

- **Consumer guard (the arbiter, packed install):** the init'd consumer's `generate` produces **N>0 component tokens** (`components.yaml` non-empty / contains `inputradio.box.sm`). For Spec 124, certify via the *current* register-keep bin; the registerless re-certification is 118's 9.5.3.
- **Full `npm test` + `tsc` + `npm run build` + `git diff token-index/` empty** — the repo's own generate must reproduce the committed token-index (the rich-shape registration must be value-identical to today's).
- A unit test that a `defineComponentTokens` result is correctly harvested into the canonical registry across a scoped-`require` boundary (the dual-instance scenario, asserted directly).

## Resume linkage (118)

When 124 lands: 118 re-applies the (already-solved) registerless bin + the `files` build-tracking-glob broadening, re-runs the consumer guard (now N>0 via the return-value seam), and closes Risk #2. Then 118's 9.3 (3c) / 9.4 (lint) / Task 11 (governance).

---

*Design outline — captures the North Star, the decided approach (Option 1), the decisive constraint (lossy return → a contract change), scope, and the open questions for design. Lina owns the contract + collection convention; Ada the harvest; Thurgood the guards + formalization. Ready for requirements.*
