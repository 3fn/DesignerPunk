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

1. **The collection convention.** The export surface is **heterogeneous** (verified 2026-06-25 — see Verified findings below): of **15** scan-reachable files, **8** register via `defineComponentTokens`; **7** are plain maps/getters/string-consts (a *different* mechanism). The heterogeneity is worse than a clean maps-vs-helper split — PLAIN files co-mingle multiple token objects, getter functions, bare string consts, type aliases, and re-export aliases — so structural detection is unworkable and **a brand is mandatory, not optional**. **DECISION LOCKED (Peter, 2026-06-26 — Option A):** the brand is a **non-enumerable, namespaced STRING-keyed property** (`Object.defineProperty(values, '@3fn/dp:tokenContract', { value: registered, enumerable: false })`) — survives the scoped-require boundary by value-equality, no process-global. `Symbol.for` was the runner-up (also survives, but adds a process-global-registry dependence under a no-globals North Star, and breaks under a true realm boundary — worker/vm/out-of-process loader — where string-key matching still holds). A plain `Symbol()` is excluded — it desyncs across the boundary exactly like the registry singleton, silently re-breaking the harvest. The 7 map-style files don't feed the registry today and need no change (orthogonal).
2. **Backward compatibility of the return.** Authors destructure the flat value-map today (`RadioSizingTokens['box.sm']`). The new shape must keep that ergonomic — the non-enumerable string-keyed sidecar (Option A, locked) on the value map satisfies both the brand and the ergonomics in one move (invisible to destructure/spread/`Object.keys`/JSON). Type-checked so a breaking change fails loud. *Lower in-repo blast radius than feared:* the REGISTER files' exports are imported by nothing else in-repo (radio computes box size from `iconSize + inset`); the constraint exists chiefly to protect consumer-authored destructuring.
3. **Avoiding double-registration — RESOLVED.** Make the harvest the **sole** registry writer and **drop `defineComponentTokens`'s side-effect registration entirely.** Verified safe: there are zero side-effect-only imports of `.tokens` files and no in-repo consumer of the registration besides `loadComponentTokens`'s scan. This eliminates double-registration in every path (production scoped, in-process jest single-instance, build-script plain-require). One thing to confirm in design: tests that import a `.tokens.ts` and expect the registry pre-populated by the side effect.
4. **Singleton retirement depth — folds into #3.** Dropping the side effect lets `setDefaultAllowOverwrite` (and likely `allowOverwrite` itself) retire, removing the cross-test-pollution / order-dependence class in the same change. The registry remains as a harvest-populated store the existing rich-shape read-consumers use — the smaller, safer step *and* the clean end-state for the mutable-global aspect, in one move.

## Consumers that must keep working (the rich registry stays populated)

`designerpunk.ts:145` (→ `generateTokenIndex` `componentTokens`), `TokenFileGenerator.ts:249` (per-platform component output — needs `family`/`value`/`primitiveReference`), `ValidationCoordinator.ts:764,724` (validation — needs `primitiveReference`), `generateTokenIndex.ts:30`. Plus the build script's `loadComponentTokens` path. Whatever 124 changes, these read the rich `RegisteredComponentToken[]` and must be unaffected.

## Verified findings & design refinements (2026-06-26, main-loop sanity check + pressure test)

Empirical pass over the actual code (Claude, main loop; grounded the cited file:line refs, then pressure-tested the approach). Three results that change or sharpen the design:

1. **Inventory corrected: 15 / 8 / 7, not 14 / 6 / 8.** By the loader's own scan patterns (`*.tokens.ts`, `tokens.ts`, `component/*.ts`): 15 scan-reachable files, **8 REGISTER** (avatar, Badge-Count, Badge-Label, Button-Icon, Button-VerticalList-Item, checkbox-sizing, radio-sizing, `tokens/component/progress`), **7 PLAIN**. (Package-self set; the actual generate set is config-driven via `componentTokenDirs`/`tokenSourceRoot` — but this is the right set for the `git diff token-index/` reproducibility gate.)

2. **⚠️ A plain `Symbol()` brand silently re-breaks the harvest — the brand must survive the boundary by value, not by object identity.** A module-level `const BRAND = Symbol(...)` in `defineComponentTokens.ts` is itself a module singleton — it desyncs across the scoped-require boundary exactly like `ComponentTokenRegistry` does. `defineComponentTokens` runs in the *duplicate* `@3fn/core/build` and brands with the duplicate copy's symbol; `loadComponentTokens` harvests in the *parent* and checks the canonical copy's symbol → mismatch → silent 0 tokens. **Same failure, relocated to the brand.** Two mechanisms survive (both compare by a value-equal string, not a shared object): `Symbol.for('…')` (process-global registry) and a non-enumerable string-keyed property. **DECISION (2026-06-26): Option A, the string key** — see the locked decision in open-question §1 (no process-global; realm-portable). Design must carry a test asserting brand identity holds across a *real* dual-instance boundary (a same-process unit test passes for both the correct brand AND a broken `Symbol()`, so it must ride the real dual-instance lane — see Thurgood's guard note).

3. **Harvest-as-sole-writer is verified safe and collapses #3 + #4.** Zero side-effect-only imports of `.tokens` files exist; `RadioSizingTokens` and peers are imported by nothing else in-repo (platform impls compute box size from `iconSize + inset`). So `defineComponentTokens` can stop calling `registerBatch` with no static-importer breakage → harvest becomes the sole canonical-registry writer → no double-registration in any path → `setDefaultAllowOverwrite`/`allowOverwrite` retire. Confirm in design: tests relying on import-side-effect registry population.

**Consumers verified (rich-shape reads, citations hold):** `ValidationCoordinator.ts:764` (`getAll`), `designerpunk.ts:145` (`getAll`), `TokenFileGenerator.ts:249` (`getAll`), `generateTokenIndex.ts:30` (`RegisteredComponentToken[]` param fed from `getAll`). `designerpunk.ts:105` calls `loadComponentTokens(config)` with no injected loader → default `scopedTsRequire` → the dual-instance path is the **live production path**.

---

## Three-lead review + health refinements (2026-06-26, Lina + Ada + Thurgood; Peter health check)

Lina (contract), Ada (harvest seam), and Thurgood (guards/formalization) each reviewed the outline against the code; main loop verified the load-bearing claims. All three returned **GO to formalize — no architectural fork left open.** The refinements below are incorporated; three are "getting-it-right vs right-now" health calls Peter flagged.

**Verified by all three (incorporated above):** `Symbol.for` reasoning is correct and the dual-instance vector is live (REGISTER files import via the `build/tokens` barrel — the duplicated specifier); harvest-as-sole-writer is safe and retires `allowOverwrite`; the consumer arbiter is `tests/consumer-integration.test.ts` (packed install) — distinct from the in-process `consumer-package-mode.test.ts`.

**Test-migration surface (verified, 4 files — was understated as "confirm in design"):**
- `src/components/core/Badge-Label-Base/__tests__/tokens.test.ts:46-69` — asserts registry populated by import side-effect → **false-red** when side-effect drops; re-point to the branded return. (Lina)
- `src/build/tokens/__tests__/defineComponentTokens.test.ts` — 17 registry refs assert the side-effect *as the contract* → rewrite premise to the new return shape. (Lina)
- `src/tools/integrity/__tests__/consumer-package-mode.test.ts:80,116` — fixtures call `ComponentTokenRegistry.register(...)` directly as a `defineComponentTokens` stand-in → **false-green risk** under branded-only harvest; rewrite to author via `defineComponentTokens`. (Ada/Thurgood)
- `src/cli/__tests__/loadComponentTokens.test.ts:122-209` — tests `allowOverwrite`/reset behavior being deleted → delete. (Ada/Thurgood)

**Decided refinements (incorporated):**
- **Harvest inclusion contract = branded-only** (Ada + Thurgood). Cleaner, matches the production seam; forces the `consumer-package-mode` fixtures onto `defineComponentTokens` (more correct anyway).
- **Negative guard** (all three): an unbranded `tokens.ts` MUST harvest to zero — pins "brand is the *sole* inclusion criterion." Safe same-process.
- **Atomic increment** (Thurgood): contract + harvest + test-migration land together; any alone reds the suite (or conflict-throws once `allowOverwrite` is gone).
- **Token-index ordering spike** (Ada): `getAll()` returns Map-insertion order; harvest order may differ from today's side-effect order and trip the `git diff token-index/` gate on *ordering* despite identical data. Resolve before tasks (check whether `TokenFileGenerator`/`generateTokenIndex` sort).

**Health calls (Peter, "getting it right" not "right now"):**
1. **Brand mechanism — RATIFIED (Peter, 2026-06-26): Option A, the non-enumerable namespaced string-keyed property.** `Symbol.for` was reopened and rejected as the default: it is a *process-global* under a North Star that minimizes globals (Option 3 was rejected partly on no-global-residue grounds), and it breaks under a true realm boundary (worker/vm/out-of-process loader) where a value-equal string key still matches. Option A (`Object.defineProperty(values, '@3fn/dp:tokenContract', { value: registered, enumerable: false })`) survives the module-duplication boundary by value equality — no symbol registry, loader/ESM/worker/realm-agnostic — and stays invisible to destructure/spread. Joint recommendation of main loop + Ada (Ada's seam analysis added the realm-portability argument). **Four caveats are normative in the design (Ada):** (a) the brand string is a **frozen compatibility contract** — a parent must recognize results from older/newer `@3fn/core/build` copies, so it cannot change without a coordinated deprecation; (b) **non-enumerability is load-bearing** — assert via test that `{...result}`/`Object.keys`/`JSON.stringify` are unchanged by branding; (c) **idempotent double-application** — branding must tolerate re-application (guard with `hasOwnProperty` or `configurable: true`) and the harvest must tolerate the dual-path double-load; (d) **the harvest checks the brand by direct/`hasOwnProperty` access, never by enumerating the candidate's keys.**
2. **The class invariant, not just the instance.** `ComponentTokenRegistry` is the only **mutable-accumulate-then-read-back** singleton on the consumer-boundary path (verified: `unitConverter`/`transformerRegistry`/color `Map`s are stateless or immutable → benign when duplicated). The principled invariant is **"no mutable-accumulate-read-back state crosses the scoped boundary."** 124 SHALL state this invariant + ship a 124-local guard that fails loud if the side-effect is reintroduced; the broader lint codification is *flagged* for 118's 9.4/Task 11 (not actioned here — see hold-back below).
3. **C′ authoring incoherence — tracked, not actioned.** Two token mechanisms (`defineComponentTokens` value-registration vs. semantic-ref maps) share the `tokens.ts` filename the loader scans. The brand makes the harvest correct regardless, but the *authoring model* stays fractured (a real C′ support question). Out of scope for 124; seeded as `findings/component-token-authoring-convention-seed.md` (Lina owner; coupled to Spec 123).

**Certification consequence (drives the hold-back below):** brand-survival is *only* falsifiable on a real dual-instance lane — a same-process unit test passes for both the correct brand and a broken `Symbol()`. 124 therefore self-certifies on a real dual-instance harness or the packed-install arbiter; that pulls the dual-instance risk into 124 (where it belongs) and is what makes 118's resume step 2 a true re-run rather than the first real test.

## Pending handback to 118 — HOLD until 124 is verified-delivered (2026-06-26, Peter's directive)

**Do NOT edit or notify Spec 118 (incl. `session-handoff-2026-06-25.md`) until the delivery gate below is green.** 118 receives a single verified update at delivery, not speculative progress. Captured here so the impacts don't evaporate:

**Delivery gate (all three required before any 118 update):**
1. Brand-survival proven on a **real dual-instance lane** (124 harness or packed-install arbiter) — not a same-process test.
2. Full `npm test` + `tsc` + `npm run build` green.
3. `git diff token-index/` empty (value- *and* order-identical to committed).

**What to hand back to 118 once the gate is green (the four impacts):**
1. **Step 2 reframe:** 9.5.3's "re-run the consumer guard (now N>0)" is a *true acceptance gate* unless 124 self-certified the dual-instance path. State which 124 achieved, so 118 sizes step-2 risk correctly.
2. **Scope into 9.4 / Task 11:** the class-invariant lint ("no mutable-accumulate-read-back state across the scoped boundary") → 9.4 (lint polarity); documenting the brand exception + the invariant → Task 11 (codify the contract).
3. **New follow-up:** the C′ authoring-convention seed (above), coupled to Spec 123.
4. **New constraint:** if 124 ships a dual-instance harness, it must exit clean under `--detectOpenHandles` so it doesn't add a second "Jest did not exit" alongside the tracked MCP-orphan leak.

**Unchanged:** the 118 resume order (124 → 9.5.3 → 9.3 → 9.4 → Task 11) and Risk #2's dependency on 124 landing first.

## Verification

- **Consumer guard (the arbiter, packed install):** the init'd consumer's `generate` produces **N>0 component tokens** (`components.yaml` non-empty / contains `inputradio.box.sm`). For Spec 124, certify via the *current* register-keep bin; the registerless re-certification is 118's 9.5.3.
- **Full `npm test` + `tsc` + `npm run build` + `git diff token-index/` empty** — the repo's own generate must reproduce the committed token-index (the rich-shape registration must be value-identical to today's).
- A unit test that a `defineComponentTokens` result is correctly harvested into the canonical registry across a scoped-`require` boundary (the dual-instance scenario, asserted directly).

## Resume linkage (118)

When 124 lands: 118 re-applies the (already-solved) registerless bin + the `files` build-tracking-glob broadening, re-runs the consumer guard (now N>0 via the return-value seam), and closes Risk #2. Then 118's 9.3 (3c) / 9.4 (lint) / Task 11 (governance).

**⚠️ HOLD (Peter, 2026-06-26):** do not edit or notify 118 until 124 clears the delivery gate — see "Pending handback to 118" above. 118 gets one verified update at delivery, not speculative progress.

---

*Design outline — captures the North Star, the decided approach (Option 1), the decisive constraint (lossy return → a contract change), scope, and the open questions for design. Lina owns the contract + collection convention; Ada the harvest; Thurgood the guards + formalization. Ready for requirements.*
