# Inbound from Spec 124 (Component-Token Return Contract) — for Spec 123

**Date**: 2026-06-26
**Status of 124**: COMPLETE & committed (`cb91e60c`, `fadac0a4`, `ea82b206`). Two things here are relevant to 123's eventual formalization; neither changes 123's gate (still 118's direction decision).

---

## 1. The component-token loading mechanism changed — what 123 builds on still works, more robustly

`inbound-from-117.md` (§1) tells 123 it can build on "consumer authors their own component tokens in package mode → they load" (117 R4 re-gated loading on **source presence**, guarded by `consumer-package-mode.test.ts`). **That behavior is preserved and now more robust** — but the mechanism underneath changed in 124:

- `defineComponentTokens` no longer self-registers; it **returns** a backward-compatible flat value-map carrying a non-enumerable, value-survivable **string-key brand** (the rich `RegisteredComponentToken[]`).
- `loadComponentTokens` now **harvests** the branded results from each loaded module's exports and is the **sole writer** to `ComponentTokenRegistry` (the `allowOverwrite` machinery is retired).
- This removes the shared-mutable-singleton-across-the-tsx-boundary that silently zeroed consumer-authored component tokens — i.e. it makes the package-mode consumer behavior survive the **dual-instance module-resolution boundary** that 118's registerless bin exposes. The `consumer-package-mode.test.ts` fixtures were rewritten to author via `defineComponentTokens` (and **export** the result — the harvest iterates module exports) and pass.

**For 123:** keep building on "consumer-authored component tokens load in package mode," but note the contract is now **return-value harvest**, not import-side-effect registration. If 123 documents or scaffolds consumer component-token authoring, the authored API is unchanged (`export const X = defineComponentTokens({...})`); only the loader internals moved.

## 2. The C′ authoring-convention seed is COUPLED TO 123 (settle when 123 formalizes)

124 deliberately left an authoring-model incoherence out of scope and seeded it for 123's domain: **`.kiro/specs/124-component-token-return-contract/findings/component-token-authoring-convention-seed.md`** (owner Lina).

The loader scans `*.tokens.ts` and `tokens.ts`, but **two different token mechanisms wear that filename** — `defineComponentTokens` value-registration files (harvested) and plain semantic-reference map files (not harvested). 124's brand makes the *harvest* correct (unbranded files harvest to zero), but the *authoring model* stays fractured: in a C′ world (consumer authors their own design system, the catalog reflects it — 118-ratified) this is a real support question, *"I wrote a `tokens.ts` — why aren't my component tokens showing up?"*. Possible directions (decide in 123, coupled to "what a consumer's design system is" / how consumer source is distributed): distinct filenames by mechanism (`*.tokens.ts` value-registration vs `*.refs.ts`/`*.map.ts` semantic maps), an authoring lint that warns when a scanned `tokens.ts` harvests zero, or convergence. **Do not assume — decide deliberately during 123 formalization.**

## 3. Context: 124 unblocked 118's 9.5.3

124 was the prerequisite 118 paused for. 118's Task 9.5.3 is now unblocked (see `.kiro/specs/118-module-resolution-coherence/findings/124-handback-2026-06-26.md`). 118's *direction* decision (Task 8 — CJS-consistency) was already made; 123's formalization gate is that direction decision, not 124.
