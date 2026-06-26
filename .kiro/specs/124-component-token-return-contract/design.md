# Design Document: Component-Token Return Contract

**Date**: 2026-06-26
**Spec**: 124 - Component-Token Return Contract
**Status**: Design Phase
**Leads**: Lina (return contract + collection convention); Ada (harvest seam + scoped-seam confirmation); Thurgood (guards / negative / dual-instance + isolation audit + formalization); Peter (ratifies).
**Dependencies**:
- **Spec 118** — PAUSED at 9.5.3, blocked on the dual-instance split 124 solves. 124 is a hard prerequisite; the handback is gated (R9 / final task). 124 does NOT modify 118.
- **Spec 117** — Complete. Established the committed 33-token baseline and the documented-CLI reproducibility gate 124's R6 builds on.
- **Spec 123** — coupled to the deferred C′ authoring-convention seed (out of scope).

---

## Overview

This design converts the component-token collection seam from a **shared-mutable-singleton side effect** to a **return-value harvest**, finishing the runtime-TS-resolution target model 118 established for config and token-source loading. It rests on one settled, code-verified constraint: `defineComponentTokens`'s return is **lossy** (values only) while the pipeline consumes the rich `RegisteredComponentToken[]` that today lives only inside the registry. Therefore Option 1 is not "harvest the existing exports" — it *requires* changing the return so the rich metadata rides back on a recoverable, **branded** result.

Three things make this design non-trivial and are specified in full below: (1) the **brand contract** — why a non-enumerable string-keyed property (Option A, locked) is the only mechanism that survives the module-duplication boundary by value while staying invisible to authors, with its four normative caveats; (2) the **harvest mechanics** — branded-only inclusion among a heterogeneous export surface; (3) the **dual-instance certification approach** — brand survival is *only* falsifiable on a real dual-instance lane, so the authoritative assertion rides the packed-install arbiter while same-process unit tests cover identification and the negative case.

**Domain boundary for this document:** Lina owns the `defineComponentTokens` return contract and the collection convention (the authored surface). Ada owns the `loadComponentTokens` harvest + canonical registration and the scoped-seam confirmation. Thurgood owns the guards (negative case, class-invariant guard), the dual-instance certification, the isolation audit, and the formalization. Peter ratifies the shipped contract change.

---

## Architecture

### Before → After (the seam conversion)

```
BEFORE (side-effect singleton — fails silently across the scoped boundary)
─────────────────────────────────────────────────────────────────────────
  <component>.tokens.ts                       loadComponentTokens (parent)
    defineComponentTokens(cfg)                  scopedTsRequire(file)  ──┐
      └─ registerBatch(...)  ──▶ ComponentTokenRegistry  (DUPLICATE) ◀──┘ side effect
                                                ComponentTokenRegistry.getAll()
                                                       │ (CANONICAL, empty)
                                                       ▼  0 tokens, no error

AFTER (return-value harvest — sole writer in the parent)
─────────────────────────────────────────────────────────────────────────
  <component>.tokens.ts                       loadComponentTokens (parent)
    const v = defineComponentTokens(cfg)        const mod = scopedTsRequire(file)
      └─ brand v with rich tokens                for each export:
         (NO registerBatch)                        if hasOwnProperty(BRAND): collect
    export const X = v                           registerBatch into CANONICAL  ◀── sole writer
                                                ComponentTokenRegistry.getAll()
                                                       ▼  N tokens (rich shape unchanged)
```

The scoped seam (`scopedTsRequire`) does **not** change — it already returns the module's exports. The work is the contract (Lina) + the harvest (Ada). The brand crosses the boundary by value, not by object identity, so the duplicate-copy problem that sinks the side effect (and a plain `Symbol()`) does not recur.

### Why the brand crosses the boundary but the singleton does not

The scoped require loads a second copy of `@3fn/core/build`. Anything that compares by **shared object identity** across that boundary desyncs: the `ComponentTokenRegistry` singleton (today), and equally a module-level `const BRAND = Symbol(...)` (the duplicate copy brands with *its* symbol; the parent checks *its* symbol → mismatch → silent 0). The two mechanisms that survive compare by a **value-equal string**: `Symbol.for('…')` (process-global registry) and a non-enumerable **string-keyed** property. Option A (the string key) is locked — see Design Decision D2.

---

## Components and Interfaces

### 1. The brand contract (Lina — `defineComponentTokens.ts`)

`defineComponentTokens` brands its return value with the rich tokens and **stops registering**:

```typescript
/** Frozen compatibility contract — see caveat (a). Do not change without a coordinated deprecation. */
const TOKEN_CONTRACT_BRAND = '@3fn/dp:tokenContract';

export function defineComponentTokens<T extends Record<string, TokenDefinition>>(
  config: ComponentTokenConfig<T>,
): ComponentTokenValues<T> {
  // ...validation + build `values` (flat value-map) and `registered` (RegisteredComponentToken[])
  //    exactly as today — value extraction unchanged...

  // Brand the value-map with the rich tokens, non-enumerably (caveat b),
  // idempotently (caveat c). NO ComponentTokenRegistry.registerBatch (R5 AC1).
  if (!Object.prototype.hasOwnProperty.call(values, TOKEN_CONTRACT_BRAND)) {
    Object.defineProperty(values, TOKEN_CONTRACT_BRAND, {
      value: registered,        // RegisteredComponentToken[]
      enumerable: false,        // load-bearing (caveat b)
      configurable: true,       // tolerate re-application (caveat c)
      writable: false,
    });
  }
  return values as ComponentTokenValues<T>;
}
```

**The four normative caveats (Ada — all are design requirements, not notes):**

- **(a) The brand string is a frozen compatibility contract.** A parent must recognize results from older/newer `@3fn/core/build` copies, so `'@3fn/dp:tokenContract'` cannot change without a coordinated deprecation. (R2 AC3)
- **(b) Non-enumerability is load-bearing.** `{...result}`, `Object.keys`, `Object.entries`, `JSON.stringify` must be unchanged by branding — asserted by test. (R1 AC2 / R2 AC4)
- **(c) Idempotent double-application.** Branding must tolerate re-application (the `hasOwnProperty` guard + `configurable: true`), and the harvest must tolerate the dual-path double-load. (R2 AC5)
- **(d) The harvest checks the brand by direct / `hasOwnProperty` access, never by enumerating the candidate's keys.** (R3 AC1)

**Return type (R1 AC3):** the *public, enumerable* type stays `ComponentTokenValues<T>` so authored/consumer destructuring type-checks unchanged and a breaking change to that surface fails loud. The brand is a non-enumerable runtime property; the recoverable rich type is exposed to the harvest via a typed accessor (a `getTokenContract(result): RegisteredComponentToken[] | undefined` helper), not by widening the public return type.

### 2. The harvest (Ada — `loadComponentTokens.ts`)

`loadComponentTokens` becomes the sole canonical-registry writer. It scans the same files as today, but instead of relying on the load side effect it **inspects the returned module exports** and collects branded results:

```typescript
export function loadComponentTokens(
  config: ResolvedConfig,
  loadModule: TsModuleLoader = scopedTsRequire,
): RegisteredComponentToken[] {
  // NO setDefaultAllowOverwrite — retired (R5 AC3).
  const harvested: RegisteredComponentToken[] = [];

  for (const file of discoverTokenFiles(config)) {       // Source-1 + Source-2, unchanged discovery
    const mod = loadModule(file, __filename);            // returns module namespace (exports)
    for (const exported of Object.values(mod as Record<string, unknown>)) {
      const tokens = getTokenContract(exported);          // direct/hasOwnProperty brand access (R3 AC1)
      if (tokens) harvested.push(...tokens);              // branded-only (R4); dedupe re-export aliases (R3 AC4)
    }
  }

  // Sole writer to the canonical registry (R5 AC2). Deterministic order per the R6 spike outcome.
  ComponentTokenRegistry.registerBatch(/* canonical */, dedupeAndOrder(harvested));
  return ComponentTokenRegistry.getAll();
}
```

**Harvest details:**
- **Branded-only inclusion (R4):** an export is collected iff `getTokenContract` returns tokens. Plain maps/getters/string-consts/type-aliases/re-export-aliases are ignored without error. The 7 plain files harvest to zero — pinned by the negative guard.
- **Re-export-alias dedupe (R3 AC4):** the same branded object reachable by two export names is collected once (dedupe by object reference within a module, then by token `name` across modules).
- **`Object.values(mod)` does not enumerate the brand on a candidate** — it enumerates the *module's* exports (each of which is a candidate object); the brand on each candidate is non-enumerable and accessed directly. (R3 AC1/AC3)

### 3. `ComponentTokenRegistry` retirement of the mutable-global aspect (Ada)

- Remove `setDefaultAllowOverwrite` and the `allowOverwrite` registration option (`ComponentTokenRegistrationOptions.allowOverwrite`) — no double-registration path remains once the harvest is the sole writer (R5 AC3). The conflict-throw in `register()` stays as a genuine duplicate-name guard (two components defining the same token name is still an error).
- The registry remains a harvest-populated store; `getAll()` / `getByComponent` / `getByFamily` and the rich-shape read consumers are unchanged (R5 AC5).
- `clear()` stays (test reset utility), but cross-test pollution from the *load side effect* is gone because loading no longer mutates the registry as a side effect.

### 4. The class-invariant guard (Thurgood — 124-local)

A 124-local guard that fails loud if the side effect is reintroduced (R8 AC2). Concretely: a test asserting that loading a branded `.tokens.ts` *module in isolation* (without invoking the harvest) leaves the canonical `ComponentTokenRegistry` **empty** — i.e. `defineComponentTokens` no longer self-registers. If someone re-adds `registerBatch` to `defineComponentTokens`, this test reds. The broader lint codification is flagged for 118's 9.4 / Task 11, not built here (R8 AC3).

---

## Data Models

```typescript
/** The rich token shape carried back on the brand (unchanged from today's registry shape). */
interface RegisteredComponentToken {
  name: string; component: string; family: string; value: number;
  primitiveReference?: string; reasoning: string;
}

/** Typed accessor — the only sanctioned way to read the brand (caveat d).
 *  References the single exported `TOKEN_CONTRACT_BRAND` (caveat a — one frozen
 *  string source); both `defineComponentTokens` (brand write) and the harvest
 *  (brand read) import it from here. The literal MUST NOT be duplicated. */
function getTokenContract(candidate: unknown): RegisteredComponentToken[] | undefined {
  if (candidate == null || typeof candidate !== 'object') return undefined;
  if (!Object.prototype.hasOwnProperty.call(candidate, TOKEN_CONTRACT_BRAND)) return undefined;
  return (candidate as Record<string, unknown>)[TOKEN_CONTRACT_BRAND] as RegisteredComponentToken[];
}
```

`TOKEN_CONTRACT_BRAND` and `getTokenContract` are defined and **exported** alongside `defineComponentTokens` (`src/build/tokens/defineComponentTokens.ts`, barrel-exported) so the harvest in the parent copy reads, by value-equal string key, a brand written by the duplicate copy — the single-source frozen string (caveat a) is what makes Option A correct across the boundary.

The public return type remains `ComponentTokenValues<T> = { [K in keyof T]: number }`. The brand is intentionally absent from that type so authors cannot accidentally depend on it and so destructuring/spread stay type-stable (R1 AC3).

---

## Correctness Properties

| ID | Property | Source |
|----|----------|--------|
| **P1** | *Backward-compatible enumerable surface* — the enumerable own properties of the return equal today's flat value-map, value-for-value; brand never appears under spread/keys/JSON. | R1 AC1/AC2 |
| **P2** | *Brand survives by value* — a result branded in one module copy is recognized in another by string-key access; identification does not rely on shared object identity. | R2 AC1/AC2 |
| **P3** | *Branded-only inclusion* — the harvest collects a result iff it carries the brand; unbranded maps harvest to zero. | R3 AC3 / R4 AC1 |
| **P4** | *Sole writer* — after the change, the only writer to the canonical `ComponentTokenRegistry` on the load path is the harvest; `defineComponentTokens` does not self-register. | R5 AC1/AC2 / R8 AC1 |
| **P5** | *Rich-shape consumers unaffected* — `getAll()`-reading consumers produce output value-identical to today. | R5 AC5 / R6 AC1 |
| **P6** | *Reproducibility (value AND order)* — fresh `generate` reproduces committed `token-index/` with `git diff` empty, ordering included. | R6 AC2/AC3 |
| **P7** | *Dual-instance certification* — brand survival is proven on a real dual-instance lane (packed-install arbiter), where a broken `Symbol()` would fail though it passes same-process. | R7 AC1/AC2 |
| **P8** | *Class invariant* — no mutable-accumulate-read-back state crosses the scoped boundary; reintroducing the side effect fails the 124-local guard. | R8 AC1/AC2 |

---

## Dual-Instance Certification Approach

Brand survival is the load-bearing property and it is **only falsifiable on a real dual-instance lane.** A same-process unit test loads one module copy, so both the correct string-keyed brand AND a broken plain `Symbol()` resolve against the same copy and pass — the test cannot distinguish correct from broken. Therefore:

- **Authoritative brand-survival assertion** rides the **packed-install arbiter** `tests/consumer-integration.test.ts` (packed install → real second copy of `@3fn/core/build`), asserting the init'd consumer's `generate` produces N>0 tokens containing `inputradio.box.sm` (R7). A broken brand reds here.
- **Same-process unit tests** cover what they *can* falsify same-process: brand **identification** (a branded result is collected — R3) and the **negative case** (an unbranded module harvests to zero — R4). These do not, and are not claimed to, prove cross-boundary survival.
- **For Spec 124**, certification runs via the **current register-keep bin** (R7 AC3) — the registerless re-certification is 118's 9.5.3. This makes 118's resume step 2 a *true re-run* rather than the first real test of the seam.
- If 124 ships a dedicated dual-instance harness instead of (or alongside) the arbiter, it must exit clean under `--detectOpenHandles` (R7 AC4).

---

## Testing Strategy

### Test-migration surface (5 files; lands in the atomic increment)

This is the verified set of existing tests that the contract/harvest change touches. All five migrate **in the same increment** as the implementation, so the suite is green at every commit boundary.

1. **`src/components/core/Badge-Label-Base/__tests__/tokens.test.ts` (the `Registry Registration` block, ~lines 46-73)** (Lina) — its 4 assertions (`has`/`get`/`getByComponent`/`getByFamily`) are populated by the import **side effect**. **False-red** when the side effect drops. **Re-point** to the branded return (`getTokenContract(BadgeLabelBaseTokens)`); leave the co-mingled PLAIN/getter tests untouched.
2. **`src/build/tokens/__tests__/defineComponentTokens.test.ts`** (Lina) — ~4 describe blocks (`Registry Registration`, `Token Name Generation`, `Multiple Component Registration`, `Family Indexing`) assert the **side effect as the contract**. **Rewrite the premise** to the new return shape; re-pin the name-lowercasing behavior to the harvested array's `name` field; drop the now-pointless `beforeEach clear()`; keep the pure value-extraction/input-validation tests.
3. **`src/tools/integrity/__tests__/consumer-package-mode.test.ts` (fixtures ~lines 71-118)** (Ada/Thurgood) — fixtures call `ComponentTokenRegistry.register(...)` directly as a `defineComponentTokens` stand-in. **False-green risk** under branded-only harvest (a direct `register` is not a branded export, so it would harvest to zero). **Rewrite** the fixtures to author via `defineComponentTokens` **and export the result** (the harvest iterates `Object.values(mod)` — an unexported const harvests to zero).
4. **`src/cli/__tests__/loadComponentTokens.test.ts:122-209`** (Ada/Thurgood) — tests `allowOverwrite` / reset behavior being deleted. **Delete** these tests.
5. **`src/registries/__tests__/ComponentTokenRegistry.test.ts:~143`** (Thurgood) — the "should allow overwrite when explicitly enabled" case (`register(token2, { allowOverwrite: true })`) breaks when the option is removed (Task 3.3). **Delete/rewrite.** _(Added post-review — Ada caught this; the original "4-file" set was not exhaustive. `registerBatch`-using tests in this file and `TokenFileGenerator.test.ts` are unaffected — `registerBatch` is retained.)_

### New tests (124)

- **Brand identification (same-process unit, Lina/Ada):** a branded result is harvested into the canonical registry.
- **Negative guard (same-process unit, Thurgood, R4):** an unbranded `tokens.ts` harvests to **zero**.
- **Non-enumerability assertion (Lina, R1 AC2 / R2 AC4):** `{...result}` / `Object.keys` / `JSON.stringify` unchanged by branding.
- **Idempotent re-branding (Lina, R2 AC5):** double-application does not throw.
- **Class-invariant guard (Thurgood, R8 AC2):** loading a branded module in isolation leaves the canonical registry empty.
- **Dual-instance arbiter (Thurgood, R7):** packed-install `tests/consumer-integration.test.ts` → N>0, contains `inputradio.box.sm`.
- **Reproducibility (Thurgood/Ada, R6):** fresh `generate` → `git diff token-index/` empty (value AND order).

### Pre-implementation spike (gates the implementation increment)

**Token-index insertion-order spike (Ada, R6 AC3).** `ComponentTokenRegistry.getAll()` returns `Array.from(this.tokens.values())` — Map **insertion** order. `generateTokenIndex.ts:207-225` builds `componentTokensIndex` by iterating `input.componentTokens` in array order with **no sort**, and `yaml.dump` emits keys in insertion order — so `components.yaml` ordering is driven by harvest registration order. The harvest's traversal order (directory scan × per-module export order) may differ from today's import-side-effect order, tripping the `git diff` gate on *ordering* despite identical data. (Verified during formalization: `TokenFileGenerator`'s dist `ComponentTokens.*` output sorts components by key at lines 318/394/473 — those are NOT at risk; `components.yaml` is the only exposed surface.) **Spike outcome decides where to impose deterministic order** (sort the harvest result before `registerBatch`, vs. sort in `generateTokenIndex`), chosen to reproduce the committed `components.yaml` ordering. Resolve before the implementation increment.

---

## Design Decisions

### Decision 1: Option 1 (return-value seam), not parent-cache priming or a process-global handle

**Options:** (1) convert to a return-value seam; (2) prime `@3fn/core/build` so there is one registry instance; (3) a process-global registry handle.
**Decision:** (1) — locked (inherited from 118; do not re-litigate).
**Rationale:** Option 2 relies on undocumented tsx cache-delegation and only seeds the one barrel the test traverses — a consumer-authored component reaching the registry by any other specifier silently desyncs to 0 (fails the C′ case; a green guard is a false positive). Option 3 reintroduces process-global state, against the no-global-residue value. Option 1 is the only one where a green consumer guard means *actually robust*, and it is target-model-aligned.
**Counter-argument:** Option 2 is the smallest diff and "works today." **Response:** it entrenches the exact shared-singleton the target model rejects and fails silently for the case 118 built for — smallest-diff that re-breaks silently is the short-term-fix trap.

### Decision 2: Brand = non-enumerable string-keyed property (Option A), not `Symbol.for`, not `Symbol()`

**Options:** (A) `Object.defineProperty(values, '@3fn/dp:tokenContract', { enumerable:false })`; (B) `Symbol.for('@3fn/dp:tokenContract')`; (C) a plain module-level `Symbol()`.
**Decision:** (A) — RATIFIED (Peter, 2026-06-26).
**Rationale:** (C) is a module singleton — it desyncs across the scoped boundary exactly like `ComponentTokenRegistry`, relocating the silent failure to the brand. Both (A) and (B) compare by value-equal string and survive. (B) is a **process-global** under a North Star that minimizes globals (Option 3 was rejected partly on no-global-residue grounds) and breaks under a true realm boundary (worker/vm/out-of-process loader) where a value-equal string key still matches. (A) survives the module-duplication boundary by value equality — no symbol registry, loader/ESM/worker/realm-agnostic — and stays invisible to destructure/spread.
**Trade-offs:** ✅ realm-portable, no global, invisible to authors; ❌ a string key is theoretically collidable (mitigated by the namespaced `@3fn/dp:` prefix and the frozen-contract caveat).
**Counter-argument:** `Symbol.for` is the idiomatic "branded value across realms" pattern. **Response:** idiomatic for *same-realm* cross-module; it is itself a process-global and realm-fragile in exactly the loader topologies this seam must survive. The string key is the stricter, more portable contract.

### Decision 3: Harvest-as-sole-writer; retire `allowOverwrite`

**Options:** (a) keep the side effect AND harvest (double-write, dedup downstream); (b) harvest is the sole writer, drop the side effect.
**Decision:** (b).
**Rationale:** verified safe — zero side-effect-only imports of `.tokens` files; the REGISTER files' exports are imported by nothing else in-repo (platform impls compute box size from `iconSize + inset`). So dropping the side effect breaks no static importer, eliminates double-registration in every path, and lets `setDefaultAllowOverwrite` / `allowOverwrite` retire — removing the cross-test-pollution / order-dependence class in the same change.
**Trade-offs:** ✅ one writer, no mode dance, clean end-state; ❌ any test relying on import-side-effect population must migrate (the 5-file surface — known and scoped).
**Counter-argument:** keeping the side effect is lower-risk for in-process jest. **Response:** the side effect is the exact thing that desyncs across the boundary; keeping it preserves the bug for the consumer case. The migration surface is verified and small.

### Decision 4: Branded-only inclusion

**Options:** (a) collect any export that *looks* like a token map (structural); (b) collect only branded results.
**Decision:** (b).
**Rationale:** the export surface is heterogeneous (8 register, 7 plain maps/getters/consts/aliases co-mingled) and a flat value-map is structurally indistinguishable from a hand-rolled `{ large: 12 }` — structural detection is unworkable and unsafe. Branded-only matches the production seam and forces the `consumer-package-mode` fixtures onto `defineComponentTokens` (more correct).
**Trade-offs:** ✅ unambiguous, safe, matches production; ❌ an author who writes a plain `tokens.ts` expecting registration gets silent zero (the C′ discoverability gap — out of scope, seeded for 123).
**Counter-argument:** structural detection needs no contract change to authoring. **Response:** it cannot distinguish a token map from any other numeric map — it would either over-collect or require fragile heuristics; the brand is the only reliable signal.

### Decision 5: Atomic increment (contract + harvest + test-migration land together)

**Options:** (a) land contract, then harvest, then migrate tests across commits; (b) one atomic increment, suite green at every boundary.
**Decision:** (b).
**Rationale:** any piece alone reds the suite — drop the side effect without the harvest and the registry is empty; add the harvest without dropping the side effect and (once `allowOverwrite` is gone) the duplicate registration conflict-throws. The test migration is part of the same contract change. Green-at-every-boundary requires they land together.
**Trade-offs:** ✅ no red intermediate state, single reviewable contract change; ❌ a larger single increment.
**Counter-argument:** smaller commits are easier to review/bisect. **Response:** the pieces are not independently shippable; artificially splitting them ships a knowingly-red tree, which is worse for bisect than one coherent increment.

---

## Open Items / Out of Scope

- **R6 ordering spike** — resolved pre-implementation (Testing Strategy → Pre-implementation spike). Outcome decides where deterministic order is imposed.
- **C′ authoring-convention incoherence** — OUT of scope; seeded `findings/component-token-authoring-convention-seed.md` (Lina; coupled to 123). 124 fixes correctness (branded-only harvest); it does not fix authoring-model discoverability.
- **Broader class-invariant lint** — flagged for 118's 9.4 / Task 11; 124 ships only the 124-local guard (R8 AC2/AC3).
- **118 handback** — a single gated step after the delivery gate (R9); 124 writes nothing into 118.
