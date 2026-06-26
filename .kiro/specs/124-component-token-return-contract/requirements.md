# Requirements Document: Component-Token Return Contract

**Date**: 2026-06-26
**Spec**: 124 - Component-Token Return Contract
**Status**: Requirements Phase
**Leads**: Lina (the `defineComponentTokens` return contract + collection convention — owns the authored surface); Ada (the `loadComponentTokens` harvest + scoped-seam confirmation); Thurgood (test-isolation guards + spec formalization); Peter (ratifies the shipped contract change).
**Dependencies**:
- **Spec 118 (module-resolution coherence)** — PAUSED at Task 9.5.3, BLOCKED on the dual-instance `ComponentTokenRegistry` split. **124 is a hard prerequisite for 118's 9.5.3** (and thus 118's Risk-#2 closure). 124 does NOT modify 118; the handback is a single gated step (R8 / final task) executed only after 124 clears its delivery gate. See `inbound-from-118.md` (references, not copies, the relevant 118 findings).
- **Spec 117 (token-index generation integrity)** — Complete. 117 corrected the component-token loading gate and certified the committed token-index reproduces via the documented CLI. 124's R6 reproducibility gate builds on 117's established baseline (33-token set; `inputradio.box.*` / `inputcheckbox.box.*` recovered).
- **Spec 123 (consumer distribution)** — coupled to the deferred C′ authoring-convention seed (`findings/component-token-authoring-convention-seed.md`), which is explicitly OUT of scope here.

---

## Introduction

Component tokens are the last seam in DesignerPunk's runtime-TS-resolution model still collected by a shared mutable singleton mutated as a side effect across a module boundary. `defineComponentTokens()` registers rich token metadata into a global `ComponentTokenRegistry` as an import side effect; `loadComponentTokens()` reads that registry back. Every other consumer-`.ts` seam Spec 118 converted (config loading, token-source loading) consumes the loaded module's **return value** instead — the ratified target-model principle: *"seams consume return values, no shared mutable singleton across the tsx boundary."*

The side-effect pattern fails **silently** under the scoped seam. When 118 retires the bin's global tsx register, `scopedTsRequire` loads a consumer's `<component>.tokens.ts` inside tsx's own module registry, which loads a **second copy** of `@3fn/core/build` → a **second `ComponentTokenRegistry`**. `defineComponentTokens`'s side effect registers into the duplicate; `loadComponentTokens` reads the canonical (empty) instance → **0 component tokens, no error**. This is not theoretical: 118's ratified **C′** decision is that *consumers author their own components*, and that is exactly the case the dual-instance split breaks — while a guard that tests only the package's own components passes as a false positive.

This spec converts the component-token seam to a **return-value seam**: `defineComponentTokens` returns a rich, recoverable result; `loadComponentTokens` harvests branded results from the loaded modules' exports and is the sole writer to the canonical registry. The side effect never crosses the tsx boundary, and every downstream rich-shape consumer is untouched.

### Key Principles

1. **Guiding principle — "Get it right" over "Get it right now."** This spec finishes the target model rather than priming a cache to make the symptom disappear. The brand mechanism, the sole-writer retirement, and the class invariant are all chosen for the clean end-state, not the fastest local patch.
2. **The decisive constraint is settled, not re-derived.** `defineComponentTokens`'s current return is **lossy** — it returns `{ [K]: number }` (values only) but *registers* the rich `RegisteredComponentToken[]` (`name`, `component`, `family`, `value`, `primitiveReference`, `reasoning`) the whole downstream pipeline consumes. "Just harvest the existing exports" is therefore impossible: the metadata exists only inside the registry. Option 1 *requires* changing what `defineComponentTokens` returns.
3. **Brand survival is the load-bearing correctness property, and it is only falsifiable on a real dual-instance lane.** A same-process unit test passes for BOTH the correct brand AND a broken `Symbol()` (both resolve to the same module copy). So the authoritative brand-survival assertion rides a real dual-instance harness or the packed-install arbiter; same-process unit tests cover identification and the negative case.
4. **Atomic increment.** The contract change, the harvest, and the test migration land as one increment — any alone reds the suite (or conflict-throws once `allowOverwrite` is gone).

### Locked Decisions (do not re-open — encoded below)

1. **Option 1** — convert the component-token seam to a return-value seam (NOT Option 2 parent-cache priming, NOT Option 3 process-global handle).
2. **Brand = Option A** — a non-enumerable, namespaced **string-keyed** property: `Object.defineProperty(values, '@3fn/dp:tokenContract', { value: registered, enumerable: false })`. NOT `Symbol.for` (process-global; breaks under a true realm boundary), NOT a plain `Symbol()` (desyncs across the boundary exactly like the registry singleton). Four normative caveats (R2).
3. **Harvest-as-sole-writer** — `defineComponentTokens` STOPS its side-effect registration; `loadComponentTokens` harvests branded results and is the sole writer to the canonical registry. `setDefaultAllowOverwrite` / `allowOverwrite` retire.
4. **Branded-only inclusion** — the harvest collects only branded results; an unbranded map harvests to zero.
5. **Backward-compatible flat value-map return** — the value map (`X['box.sm']` → number) authors destructure today keeps working; the brand is an additive, invisible superset.

---

## Requirements

### Requirement 1: Backward-Compatible Return Value

**User Story**: As a component author who destructures the flat value-map from `defineComponentTokens` today (e.g. `RadioSizingTokens['box.sm']`), I want the return shape to stay ergonomically identical, so that the contract change does not break authored or consumer-authored components.

#### Acceptance Criteria

1. WHEN `defineComponentTokens(config)` is called THEN it SHALL return an object whose enumerable own properties are exactly the flat value-map (`{ [tokenKey]: number }`) it returns today — value-for-value identical.
2. WHEN an author destructures, spreads (`{...result}`), enumerates (`Object.keys` / `Object.entries`), or serializes (`JSON.stringify`) the result THEN the brand SHALL NOT appear and the observed shape SHALL be unchanged from today's behavior.
3. WHEN the return type is consumed in TypeScript THEN the public/enumerable type SHALL remain assignable to today's `ComponentTokenValues<T>`, so a breaking change to the destructured surface fails type-check loudly.
4. The rich `RegisteredComponentToken[]` SHALL be recoverable from the returned object via the brand (R2/R3) — the metadata that previously existed only inside the registry SHALL be carried back on the return value.

### Requirement 2: Brand Survives the Scoped-Require Boundary by Value

**User Story**: As the harvest seam running in the parent module copy, I want to recognize a `defineComponentTokens` result produced by a *different* copy of `@3fn/core/build`, so that brand identification holds across the module-duplication boundary the scoped require creates.

#### Acceptance Criteria

1. WHEN `defineComponentTokens` brands its result THEN it SHALL use `Object.defineProperty(values, '@3fn/dp:tokenContract', { value: registered, enumerable: false })` — a non-enumerable, namespaced, **string-keyed** property whose value is the rich `RegisteredComponentToken[]`.
2. WHEN a result is branded in one module copy and inspected in another (a real dual-instance boundary) THEN the brand SHALL be recognizable by value-equal string-key access — it SHALL NOT depend on shared object identity (which is why a plain `Symbol()` is excluded).
3. The brand string `'@3fn/dp:tokenContract'` SHALL be treated as a **frozen compatibility contract**: a parent must recognize results from older/newer `@3fn/core/build` copies, so the string SHALL NOT change without a coordinated deprecation.
4. WHEN branding is applied THEN **non-enumerability SHALL be load-bearing** and asserted by test (`{...result}` / `Object.keys` / `JSON.stringify` are unchanged by branding — cross-reference R1 AC2).
5. WHEN branding is applied more than once to the same object (idempotent double-application — e.g. a dual-path double-load) THEN it SHALL tolerate re-application without throwing (guard via `hasOwnProperty` or `configurable: true`).

### Requirement 3: Harvest Identifies Branded Results Among Heterogeneous Exports

**User Story**: As the `loadComponentTokens` harvest, I want to identify `defineComponentTokens` results among a module's arbitrary, co-mingled exports, so that I collect the rich tokens reliably from a heterogeneous export surface (verified: of 15 scan-reachable files, 8 register and 7 are plain maps/getters/string-consts/aliases).

#### Acceptance Criteria

1. WHEN `loadComponentTokens` loads a component `.ts` via the injected loader THEN it SHALL iterate the module's exports and identify branded `defineComponentTokens` results by **direct / `hasOwnProperty` access** to the brand string, NEVER by enumerating a candidate's keys.
2. WHEN a branded result is identified THEN the harvest SHALL collect its rich `RegisteredComponentToken[]` from the brand value.
3. WHEN a module exports multiple objects (token maps, getters, string consts, type aliases, re-export aliases co-mingled) THEN only the branded results SHALL be collected and all non-branded exports SHALL be ignored without error.
4. WHEN the same branded result is reachable by more than one export name within a module (re-export alias) THEN the harvest SHALL NOT double-count its tokens.

### Requirement 4: Unbranded Map Harvests to Zero (Negative Guard)

**User Story**: As Thurgood auditing the inclusion contract, I want an unbranded `tokens.ts` to harvest to zero tokens, so that "the brand is the *sole* inclusion criterion" is pinned and a structurally-similar plain map can never be mistaken for a registration.

#### Acceptance Criteria

1. WHEN `loadComponentTokens` loads a module whose exports contain NO branded result (plain `Record` / getter / string-const maps) THEN it SHALL harvest **zero** component tokens from that module.
2. WHEN a plain value-map structurally indistinguishable from a flat token value-map (e.g. `{ large: 12 }`) is exported without the brand THEN it SHALL NOT be collected.
3. This negative case SHALL be asserted by a same-process unit test (it is safe same-process — the negative result does not depend on the dual-instance boundary).

### Requirement 5: Harvest Is the Sole Registry Writer; `allowOverwrite` Retires

**User Story**: As a maintainer, I want the harvest to be the single writer to the canonical `ComponentTokenRegistry` and the side-effect registration removed, so that the cross-boundary singleton desync is eliminated and the mutable-global mode dance (`allowOverwrite`) can retire.

#### Acceptance Criteria

1. WHEN `defineComponentTokens` runs THEN it SHALL NOT call `ComponentTokenRegistry.registerBatch` (or otherwise register as an import side effect) — the side-effect registration SHALL be removed.
2. WHEN `loadComponentTokens` harvests branded results THEN it SHALL register them into the canonical (parent-cache) `ComponentTokenRegistry` itself, as the **sole** writer.
3. WHEN the harvest is the sole writer THEN `ComponentTokenRegistry.setDefaultAllowOverwrite` and the `allowOverwrite` registration option SHALL be retired (removed), since no double-registration path remains.
4. WHEN any code path that previously relied on import-side-effect registry population is exercised THEN it SHALL be migrated to the return-value contract (see the named test-migration surface in design.md); no in-repo consumer SHALL depend on the removed side effect.
5. The rich-shape read consumers (`ValidationCoordinator`, `designerpunk.ts` → `generateTokenIndex`, `TokenFileGenerator`, `generateTokenIndex`) SHALL continue to read the canonical registry's `getAll()` unchanged — the registry remains as a harvest-populated store.

### Requirement 6: Token-Index Reproducibility (Value AND Order Identical)

**User Story**: As a maintainer, I want a fresh `generate` to reproduce the committed token-index value- AND order-identically after the contract/harvest change, so that the rich-shape registration is provably unchanged and the `git diff token-index/` gate stays clean.

#### Acceptance Criteria

1. WHEN `generate` runs against this repository's config after the change THEN the regenerated `token-index/components.yaml` SHALL reproduce the committed component-token set **value-identically** (same tokens, same `name`/`component`/`family`/`value`/`primitiveReference`/`reasoning`).
2. WHEN the regenerated `token-index/` is diffed against the committed state THEN `git diff token-index/` SHALL be **empty** — including key/entry **ordering**, not only values.
3. IF the harvest's registration order differs from today's import-side-effect order in a way that changes `components.yaml` key ordering (the R6 ordering spike — `getAll()` is Map-insertion order, and `generateTokenIndex` emits `components.yaml` keys in `componentTokens` array order with no sort) THEN the change SHALL impose a deterministic order (at the harvest or the generator) that reproduces the committed ordering. The dist `ComponentTokens.*` files sort by component key and are not at risk; `components.yaml` is the gate this AC protects.
4. WHEN `generate` runs THEN full `npm test` + `tsc` + `npm run build` SHALL be green.

### Requirement 7: N>0 Consumer Guard via Packed-Install Arbiter

**User Story**: As Thurgood certifying the seam, I want the init'd consumer's `generate` to produce N>0 component tokens via the packed-install arbiter, so that brand survival is proven on a real dual-instance lane — the only lane where it is falsifiable.

#### Acceptance Criteria

1. WHEN the packed-install arbiter `tests/consumer-integration.test.ts` runs THEN the init'd consumer's `generate` SHALL produce **N>0** component tokens (`components.yaml` non-empty), and the assertion SHALL specifically contain `inputradio.box.sm`.
2. The arbiter SHALL exercise the **real dual-instance path** (packed install — distinct from the in-process `consumer-package-mode.test.ts`), so a broken brand (e.g. a plain `Symbol()`) would fail here even though it passes same-process.
3. For Spec 124, certification SHALL run via the **current register-keep bin** (the registerless re-certification is 118's 9.5.3). Brand survival proven here is the dual-instance proof the delivery gate requires.
4. IF 124 ships a dedicated dual-instance harness (instead of relying on the packed-install arbiter) THEN it SHALL exit clean under `--detectOpenHandles` so it does not add a second "Jest did not exit" alongside the tracked MCP-orphan leak.

### Requirement 8: Class Invariant — No Mutable-Accumulate-Read-Back State Crosses the Scoped Boundary

**User Story**: As the steward of the target model, I want 124 to state and guard the *class* invariant (not just fix this instance), so that reintroducing a cross-boundary mutable-accumulate-read-back side effect fails loud rather than silently re-breaking the harvest.

#### Acceptance Criteria

1. The spec SHALL state the invariant: **no mutable-accumulate-then-read-back state crosses the scoped (`scopedTsRequire`) boundary.** `ComponentTokenRegistry` was the only such singleton on the consumer-boundary path (verified: `unitConverter` / `transformerRegistry` / color `Map`s are stateless or immutable → benign when duplicated).
2. WHEN the side-effect registration is reintroduced into `defineComponentTokens` (or the harvest stops being the sole writer) THEN a **124-local guard SHALL fail loud** rather than allowing a silent regression to ship.
3. The broader lint codification of this invariant SHALL be **flagged for 118's 9.4 / Task 11** and SHALL NOT be actioned in 124 (cross-reference the 118 hold-back; see R9).

### Requirement 9: 118 Handback Is a Single Gated Step (Hold-Back)

**User Story**: As Peter, I want the 118 handback held until 124 is verified-delivered, so that 118 receives one verified update at delivery rather than speculative progress.

#### Acceptance Criteria

1. 124 SHALL NOT edit, reference-as-ready, or stage any update to Spec 118 or its `session-handoff-2026-06-25.md` until the delivery gate is green.
2. The delivery gate SHALL require all three: (a) brand survival proven on a real dual-instance lane (R7); (b) full `npm test` + `tsc` + `npm run build` green (R6 AC4); (c) `git diff token-index/` empty — value- and order-identical (R6 AC2).
3. WHEN the delivery gate is green THEN — and only then — the handback SHALL communicate the four impacts to 118: (1) the 9.5.3 step-2 reframe (state which dual-instance proof 124 achieved); (2) the class-invariant lint → 9.4 and the brand-exception documentation → Task 11; (3) the C′ authoring-convention seed follow-up (coupled to 123); (4) the `--detectOpenHandles` clean-exit constraint if 124 ships a harness.
4. The 118 resume order (124 → 9.5.3 → 9.3 → 9.4 → Task 11) and Risk #2's dependency on 124 landing first SHALL remain unchanged.

---

## Open Items Carried From Design Outline

- **R6 ordering spike** (Requirement 6 AC3) is gated to a **pre-implementation spike** in tasks.md: confirm whether `generateTokenIndex` / `TokenFileGenerator` impose a deterministic order on `components.yaml`, and decide where the harvest-order fix lands. Resolved before the implementation increment.
- **C′ authoring incoherence** (two token mechanisms sharing the `tokens.ts` filename) is **out of scope** — seeded as `findings/component-token-authoring-convention-seed.md` (Lina owner; coupled to Spec 123).
- **Brand mechanism, sole-writer retirement, and Option 1** are locked decisions (above) — not open.
