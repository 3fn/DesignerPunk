# Implementation Plan: Component-Token Return Contract

**Date**: 2026-06-26
**Spec**: 124 - Component-Token Return Contract
**Status**: Implementation Phase — **ratified by Peter 2026-06-26**; Task 1 done; Task 2 (ordering spike) in progress.
**Leads**: Lina (return contract + collection convention + component/contract tests); Ada (harvest seam + `allowOverwrite` retirement + R6 ordering spike); Thurgood (guards / negative / dual-instance + isolation audit); Peter (ratifies).
**Dependencies**:
- **Spec 118** — PAUSED at 9.5.3, blocked on the dual-instance split 124 solves. The 118 handback is the FINAL gated step (Task 6), executed ONLY after the delivery gate is green. 124 writes nothing into 118 before then.
- **Spec 117** — Complete (committed 33-token baseline; documented-CLI reproducibility gate).
- **Spec 123** — coupled to the deferred C′ authoring-convention seed (out of scope).

---

## Implementation Plan

The contract change, the harvest, and the test migration are **one atomic increment** (Task 3) — the suite is green at every commit boundary because no piece is independently shippable (Design Decision D5). Task 2 (the token-index ordering spike) **gates** Task 3 and must complete first. Task 4 is certification (including the real dual-instance arbiter). Task 5 is completion docs. Task 6 (the 118 handback) is gated on the delivery gate and is held until then.

**Agent ownership:** Lina — the `defineComponentTokens` return contract, the brand, and the component/contract test migration (files 1 & 2). Ada — the `loadComponentTokens` harvest, the `ComponentTokenRegistry` `allowOverwrite` retirement, the R6 ordering spike, and the fixture migration (file 3). Thurgood — the negative guard, the class-invariant guard, the dual-instance certification, the isolation audit, and the `allowOverwrite`-test deletion (file 4). Peter — ratifies the shipped contract change and authorizes the 118 handback.

**Delivery gate (all three required before Task 6 / any 118 update):**
1. Brand survival proven on a **real dual-instance lane** (packed-install arbiter) — not a same-process test. (Task 4)
2. Full `npm test` + `tsc` + `npm run build` green. (Task 3 / Task 4)
3. `git diff token-index/` empty — value- AND order-identical to committed. (Task 4)

---

## Task List

- [x] 1. Spec ratification & baseline snapshot

  **Type**: Setup
  **Validation**: Tier 1 - Minimal
  **Agent**: Peter (ratifies); Thurgood records

  **Success Criteria:**
  - Requirements/design ratified (locked decisions encoded; no architectural fork left open).
  - Pre-change baseline captured: committed `token-index/components.yaml` token set + ordering recorded; full `npm test` + `tsc` green snapshot (the green-before state R6 reproduces against).

  - [x] 1.1 Ratify requirements + design; capture the pre-change green snapshot
    **Type**: Setup · **Validation**: Tier 1 · **Agent**: Peter (decision); Thurgood records
    - Ratified by Peter 2026-06-26 after two-lead pre-ratification review (Lina + Ada CONDITIONAL GO; 3 mechanical block items resolved in spec text). Pre-change baseline (committed `components.yaml` order + green snapshot) captured in the Task 2 spike run (`findings/r6-ordering-spike.md`).
    - _Requirements: 1.1, 5.1, 6.1_

- [x] 2. Token-index ordering spike (GATES Task 3) — **DONE 2026-06-26**

  **OUTCOME (`findings/r6-ordering-spike.md`):** committed `components.yaml` order is **directory-scan order, NOT a sort** (Source 1 `progress.ts` first, then Source 2 `src/components/core` scan, each `readdirSync` order, brand-filtered, authored intra-file order preserved). **DECISION: preserve scan order — do NOT sort** (a name/component sort would reorder to alphabetical and break the R6 `git diff` gate). This overturned the pre-spike lean toward sorting. Baseline: `tsc` + `build` green, but `generate` currently emits "Component tokens: 0" (the known 118 dual-instance split — the defect 124 fixes), so R6's clean-diff becomes a meaningful passing gate only after Task 3 restores single-writer behavior. _Latent follow-up (NOT 124): scan-order ties the committed file to `readdirSync`/filesystem order — a canonical sorted order would be more portable but requires a deliberate re-baseline; seed separately if pursued._

  **Type**: Architecture
  **Validation**: Tier 2 - Standard
  **Agent**: Ada

  **Success Criteria:**
  - Determined whether `generateTokenIndex` / `TokenFileGenerator` impose a deterministic order on `components.yaml`. (Verified during formalization: `generateTokenIndex.ts:207-225` iterates `componentTokens` in array order with NO sort and `yaml.dump` emits insertion order; `getAll()` is Map-insertion order; dist `ComponentTokens.*` DO sort by component key at `TokenFileGenerator.ts:318/394/473` and are not at risk.)
  - Decided where the harvest-side deterministic order is imposed (sort the harvested array before `registerBatch`, vs. sort in `generateTokenIndex`) so the regenerated `components.yaml` reproduces the committed ordering.
  - Spike outcome recorded as a short finding; the chosen approach feeds Task 3.

  **Primary Artifacts:** `findings/r6-ordering-spike.md`; reference to `src/generators/generateTokenIndex.ts`, `src/registries/ComponentTokenRegistry.ts`.

  - [x] 2.1 Trace insertion order and decide the deterministic-order point
    **Type**: Architecture · **Validation**: Tier 2 · **Agent**: Ada
    - _Requirements: 6.3_

- [x] 3. Contract + harvest + test-migration — ATOMIC INCREMENT (suite green at every boundary) — **DONE 2026-06-26**

  **RESULT:** implemented per design. Full `npm test` green (8973 tests / 374 suites, 0 fail); `tsc --noEmit` clean; `npm run build` ok; `generate` → **33 component tokens** (was 0 under the 118 split); `git diff token-index/` **empty** (R6 — value+order identical). Main-loop verified: no 118 touched, brand core correct (guarded `defineProperty`, `enumerable:false`/`configurable:true`, no registry write; `getTokenContract` via `hasOwnProperty`; single `TOKEN_CONTRACT_BRAND` source), both extra migrations legitimate. **Migration surface was 7 files, not 5** — the full suite surfaced two more false-reds coupled to the retired side effect: `src/tokens/__tests__/ProgressTokenCompliance.test.ts` (re-pointed to `getTokenContract`) and `ProgressTokenTranslation.test.ts` (reproduces the production harvest in `beforeAll`). Same false-red class as the named 5; record as "7 files migrated" in Task 5 completion docs. Not committed (Peter reviews the diff). Dual-instance brand survival (R7) is NOT yet proven — that rides Task 4 (real packed-install arbiter).

  **Type**: Architecture
  **Validation**: Tier 3 - Comprehensive

  **Success Criteria:**
  - `defineComponentTokens` returns the backward-compatible flat value-map branded (Option A, non-enumerable string key) with the rich `RegisteredComponentToken[]`; it no longer calls `registerBatch`.
  - The four brand caveats hold: frozen contract string; non-enumerability asserted; idempotent re-branding tolerated; harvest checks by direct/`hasOwnProperty` access.
  - `loadComponentTokens` harvests branded results from loaded-module exports, is the sole canonical-registry writer, dedupes re-export aliases, and imposes the Task-2 deterministic order.
  - `setDefaultAllowOverwrite` and the `allowOverwrite` option are removed from `ComponentTokenRegistry`.
  - All 5 test-migration files updated/deleted in this increment; full `npm test` + `tsc` green at the increment boundary.

  **Primary Artifacts:** `src/build/tokens/defineComponentTokens.ts`, `src/cli/loadComponentTokens.ts`, `src/registries/ComponentTokenRegistry.ts`; the 5 migrated test files.
  **Completion Documentation:** Detailed `.../completion/task-3-completion.md`; Summary `docs/specs/.../task-3-summary.md`.

  - [x] 3.1 Brand the return + stop the side effect (`defineComponentTokens`)
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Lina
    - Define and **export** a single `TOKEN_CONTRACT_BRAND = '@3fn/dp:tokenContract'` (one frozen-string source, caveat a — no duplicated literals); brand via `Object.defineProperty(values, TOKEN_CONTRACT_BRAND, { value: registered, enumerable: false, configurable: true })`, idempotent guard; remove `registerBatch`; keep the public type as `ComponentTokenValues<T>` + add the typed, barrel-exported `getTokenContract` accessor (references `TOKEN_CONTRACT_BRAND`).
    - Update the `defineComponentTokens` JSDoc + `@example` — remove the "registers with the global registry" step (currently lines ~130-135) and document the branded-return contract and the `getTokenContract` recovery path, so shipped docs don't describe the retired side effect.
    - Add a compile-time type assertion (e.g. `expectType`/`tsd`) that the public return stays assignable to `ComponentTokenValues<T>` and the brand key is absent from it — makes R1 AC3 "fail loud" real, not aspirational.
    - _Requirements: 1.1, 1.3, 1.4, 2.1, 2.3, 2.5, 5.1, 8.1_

  - [x] 3.2 Harvest branded results + become sole writer (`loadComponentTokens`)
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada
    - Iterate module exports, collect via `getTokenContract` (direct/`hasOwnProperty`, never key enumeration); **preserve Source-1-then-Source-2 directory-scan + authored-array order — NO sort** (Task-2 decision: a sort breaks the R6 diff); dedupe re-export aliases first-seen-wins; capture the return at BOTH scan sites (`loadComponentTokens.ts:55` and `:84`); register into the canonical registry as sole writer. Watch: multi-`defineComponentTokens` files — confirm `Object.values(mod)` enumerates branded exports in declaration order (R6 diff catches any shift).
    - _Requirements: 2.2, 3.1, 3.2, 3.3, 3.4, 5.2, 6.3_

  - [x] 3.3 Retire `allowOverwrite` (`ComponentTokenRegistry`)
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada
    - Remove `setDefaultAllowOverwrite` and `ComponentTokenRegistrationOptions.allowOverwrite` (scope to the *Component* registry option only — do NOT touch the shared `RegistrationOptions` or the primitive/semantic registries); keep the genuine duplicate-name conflict throw and `clear()`; strip stale `allowOverwrite` docstrings in `loadComponentTokens.ts`/`tsModuleLoader.ts`.
    - _Requirements: 5.3, 5.4_

  - [x] 3.4 Migrate the 5 test files (in-increment)
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Lina (files 1 & 2); Ada (file 3); Thurgood (files 4 & 5)
    - File 1 `Badge-Label-Base/__tests__/tokens.test.ts` — the `Registry Registration` block (lines ~46-73; 4 assertions: `has`/`get`/`getByComponent`/`getByFamily`) is false-red → re-point to the branded return via `getTokenContract(BadgeLabelBaseTokens)`; leave the co-mingled PLAIN/getter tests (Token Values/References/Conformance) untouched (Lina). File 2 `defineComponentTokens.test.ts` — rewrite the ~4 side-effect-as-contract describe blocks (`Registry Registration`, `Token Name Generation`, `Multiple Component Registration`, `Family Indexing`) to assert the branded return; **re-pin the name-lowercasing behavior** to the `name` field in the harvested array (don't delete it as "registry coupling"); drop the now-pointless `beforeEach clear()`; keep the pure value-extraction/input-validation tests (Lina). File 3 `consumer-package-mode.test.ts` (fixtures ~lines 71-118) — rewrite fixtures from direct `register` to `defineComponentTokens`, and ensure the fixture **exports** the result (the harvest iterates `Object.values(mod)` — an unexported const harvests to zero) (Ada). File 4 `loadComponentTokens.test.ts:122-209` — delete the `allowOverwrite`/reset tests (Thurgood). **File 5 `src/registries/__tests__/ComponentTokenRegistry.test.ts:~143`** — the "should allow overwrite when explicitly enabled" case (`register(token2, { allowOverwrite: true })`) breaks when the option is removed in 3.3 → delete/rewrite (Thurgood). _(Added post-review: Ada caught this fifth file; the "4-file surface" was not exhaustive.)_
    - _Requirements: 5.4, 1.2, 2.4, 4.2_

- [x] 4. Guards, negative case, isolation audit & dual-instance certification

  **Type**: Architecture
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Thurgood (Ada consulted on reproducibility)

  **Success Criteria:**
  - Same-process unit tests: brand identification passes; the negative guard (unbranded module → zero) passes; non-enumerability and idempotent-re-branding assertions pass.
  - The 124-local class-invariant guard passes (loading a branded module in isolation leaves the canonical registry empty) and reds if the side effect is reintroduced.
  - Isolation audit: confirmed `ComponentTokenRegistry` was the only mutable-accumulate-read-back singleton on the consumer-boundary path (record the verified-benign peers).
  - **Dual-instance certification:** the packed-install arbiter `tests/consumer-integration.test.ts` produces N>0 component tokens containing `inputradio.box.sm`, via the current register-keep bin. (If a dedicated harness is shipped instead, it exits clean under `--detectOpenHandles`.)
  - **Delivery gate verified:** dual-instance proof green; full `npm test` + `tsc` + `npm run build` green; `git diff token-index/` empty (value AND order).

  **Primary Artifacts:** `tests/consumer-integration.test.ts` (arbiter assertion); the 124 new tests (negative guard, class-invariant guard, non-enumerability, idempotency); `findings/isolation-audit.md`.
  **Completion Documentation:** Detailed `.../completion/task-4-completion.md`; Summary `docs/specs/.../task-4-summary.md`.

  - [x] 4.1 Same-process guards: identification, negative, non-enumerability, idempotency
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood
    - _Requirements: 2.4, 2.5, 3.1, 4.1, 4.2, 4.3, 8.2_

  - [x] 4.2 Class-invariant guard + isolation audit
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood
    - 124-local fail-loud guard if the side effect returns; document the verified-benign peers (`unitConverter`/`transformerRegistry`/color `Map`s).
    - _Requirements: 8.1, 8.2_

  - [x] 4.3 Dual-instance certification via the packed-install arbiter + delivery-gate verification
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood + Ada
    - Arbiter N>0 + `inputradio.box.sm`; reproducibility re-diff (value AND order); full suite + tsc + build green; `--detectOpenHandles` clean if a harness is added.
    - _Requirements: 6.1, 6.2, 6.4, 7.1, 7.2, 7.3, 7.4_

- [x] 5. Completion documentation — **DONE 2026-06-26**

  **RESULT (Thurgood):** Backfilled completion docs for Tasks 1, 2, 4 + the spec-level Task 5 synthesis (each = detailed `completion/task-N-completion.md` + concise `docs/specs/.../task-N-summary.md`); Task 3's pair already existed. Recorded the 7-file migration surface honestly (5 predicted + 2 surfaced by the full suite), the 4 brand caveats, the R6 preserve-scan-order decision (which overturned the pre-spike sort lean), and the isolation-audit result. Logged out-of-scope items (C′ → 123; broader class-invariant lint → 118 9.4/Task 11) and seeded two pre-existing housekeeping issues. Fixed the Docs MCP "Automatic registration" staleness in `docs/token-system-overview.md` and rebuilt the index; flagged steering-doc staleness (`Rosetta-System-Architecture.md:449`) for governance (NOT edited). Verified-and-closed the double-registration issue. **Task 6 (118 handback) held for Peter — NOT checked.** Nothing committed.

  **Type**: Documentation
  **Validation**: Tier 1 - Minimal
  **Agent**: Thurgood (Lina/Ada contribute domain sections)

  **Success Criteria:**
  - Detailed + summary completion docs for the contract change, the harvest, the brand contract (+ 4 caveats), and the certification result.
  - The R6 ordering-spike outcome and the isolation-audit result recorded.
  - Out-of-scope items logged with rationale (C′ authoring-convention seed → 123; broader class-invariant lint → 118 9.4/Task 11).

  **Completion Documentation:** `.../completion/task-5-completion.md`; `docs/specs/.../task-5-summary.md`.

  - [x] 5.1 Author completion docs + log deferred items
    **Type**: Documentation · **Validation**: Tier 1 · **Agent**: Thurgood
    - _Requirements: 8.3_

- [x] 6. 118 handback — DONE 2026-06-26 (delivery gate green; Peter authorized)

  **Type**: Documentation
  **Validation**: Tier 1 - Minimal
  **Agent**: Peter (authorizes); Thurgood communicates

  **✅ EXECUTED 2026-06-26 (Peter authorized).** The hold held — nothing was written into 118 until the Task-4 delivery gate was green. Delivered `findings/124-handback-2026-06-26.md` into 118 (the four impacts + updated resume plan), added an UPDATE banner to its `session-handoff-2026-06-25.md`, and marked `9.5.3-component-registry-dual-instance-blocker.md` RESOLVED-by-124. _(Original hold, now satisfied: do NOT edit/stage 118 until the gate is green — 118 gets ONE verified update at delivery.)_

  **Success Criteria (only after the delivery gate is green):**
  - Communicate the four impacts to 118: (1) 9.5.3 step-2 reframe — state which dual-instance proof 124 achieved; (2) class-invariant lint → 9.4, brand-exception + invariant documentation → Task 11; (3) the C′ authoring-convention seed follow-up (coupled to 123); (4) the `--detectOpenHandles` clean-exit constraint if 124 shipped a harness.
  - Confirm the 118 resume order (124 → 9.5.3 → 9.3 → 9.4 → Task 11) and Risk-#2 dependency are unchanged.

  - [x] 6.1 Deliver the gated 118 handback
    **Type**: Documentation · **Validation**: Tier 1 · **Agent**: Peter (authorizes); Thurgood communicates
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

---

## Sequencing & Gates

1. **Task 1** — ratify + baseline snapshot.
2. **Task 2 (ordering spike) GATES Task 3** — the deterministic-order decision must be made before the harvest is written, or the R6 diff gate is unprotected.
3. **Task 3 = the atomic increment** — contract + harvest + `allowOverwrite` retirement + 5-file test migration land together; suite green at every commit boundary (Design Decision D5).
4. **Task 4 = certification** — same-process guards + the real dual-instance arbiter + delivery-gate verification. **Brand survival is only falsifiable here** (same-process passes for both correct brand and a broken `Symbol()`).
5. **Task 5** — completion docs + deferred-item logging.
6. **Task 6 = 118 handback — HELD** until the Task-4 delivery gate is green; nothing is written into 118 before then.

## Validation-Tier Note

Tier 3: the atomic increment (Task 3), the guards + dual-instance certification (Task 4) — comprehensive, contract-level, cross-boundary correctness. Tier 2: the ordering spike (Task 2), `allowOverwrite` retirement (3.3), the test migration (3.4). Tier 1: ratification/baseline (Task 1), completion docs (Task 5), the 118 handback (Task 6).
