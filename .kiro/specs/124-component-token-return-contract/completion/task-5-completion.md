# Task 5 Completion: Spec-Level Synthesis — Component-Token Return Contract

**Date**: 2026-06-26
**Task**: 5 — completion documentation (spec-level synthesis + deferred-item logging)
**Type**: Documentation
**Status**: **DONE.** Spec 124 is functionally complete (Tasks 1–4). Task 6 (118 handback) is held for Peter.
**Validation Tier**: Tier 1 — Minimal
**Agent**: Thurgood (Lina/Ada contributed domain sections in Tasks 3/4)
**Branch**: `spec-118-module-resolution-coherence`

---

## What Spec 124 shipped

**The last side-effect seam became a return-value seam.** The component-token registry was the only consumer-`.ts` seam still relying on a shared-singleton **side effect** across the tsx boundary — which silently zeroed component tokens when the scoped require split the registry into two instances (the Spec 118 dual-instance blocker that paused 118 at 9.5.3).

- **Contract / brand** (`src/build/tokens/defineComponentTokens.ts`): `defineComponentTokens` brands its backward-compatible flat value-map with a **non-enumerable, string-keyed sidecar** (`TOKEN_CONTRACT_BRAND = '@3fn/dp:tokenContract'`, one exported frozen-string source) carrying the rich `RegisteredComponentToken[]` — **Option A** (survives module duplication **by value**, not object identity). The side-effect `registerBatch` call is removed. A typed `getTokenContract` accessor reads via `hasOwnProperty` (never key enumeration); both are barrel-exported.
- **Harvest / sole writer** (`src/cli/loadComponentTokens.ts`): captures the loaded-module return at both scan sites, harvests branded results from `Object.values(mod)`, dedupes re-export aliases first-seen-wins, and is the **sole writer** to the canonical `ComponentTokenRegistry`.
- **`allowOverwrite` retired** (`src/registries/ComponentTokenRegistry.ts`): `setDefaultAllowOverwrite`, the `defaultAllowOverwrite` field, and the Component-registry `allowOverwrite` option removed (shared `RegistrationOptions` and the primitive/semantic registries untouched). The genuine duplicate-name conflict throw and `clear()` are kept. The cross-test-pollution class retires *with* the change.

This is the spine fix (the ratified target-model end-state: seams consume return values, no shared mutable singleton across the boundary), not a leaf patch. The brand is a string key (not `Symbol.for`) deliberately — no process-global introduced; portable across realms/loaders.

## The verified outcome

- `npx designerpunk generate`: **0 → 33 component tokens** (0 was the 118 dual-instance split — the defect 124 fixes).
- `git diff token-index/` + `git status --porcelain token-index/`: **empty** (R6 — value AND order identical to the committed reference).
- Full `npm test`: **375 suites / 8979 tests / 0 failed**.
- `tsc --noEmit`: clean (exit 0). `npm run build`: success (only pre-existing package.json export-condition-ordering warnings).
- **All verified twice in the main loop** (implementer + independent main-loop re-run); nothing skipped or gated.

## The migration surface — 7 files, recorded honestly

The pre-ratification review estimated **4**, corrected to **5** (Ada caught `ComponentTokenRegistry.test.ts`'s `allowOverwrite: true` case). Implementation then surfaced **two more** via the full suite, for **7 total**:

- `ProgressTokenCompliance.test.ts` — same direct-registry-read pattern as Badge-Label; missed by an incomplete static sweep.
- `ProgressTokenTranslation.test.ts` — an **indirect** dependency (imports progress for the side effect so the translation pipeline has tokens); structurally invisible to a `.has`/`.getByComponent` grep.

The **full suite was the reliable detector**, exactly as Design Decision D5 (atomic increment, green at every boundary) intended. The surface is now empirically complete: zero bare side-effect imports of token files remain in tests, and the suite is green. The honest takeaway: static estimation under-counted twice; the green-at-every-boundary suite is what made that safe.

## The 4 brand caveats (all hold)

- **(a) Frozen contract string** — one exported `TOKEN_CONTRACT_BRAND` source, no duplicated literals.
- **(b) Non-enumerability asserted** — brand invisible to spread / `Object.keys` / `JSON.stringify` (compile-time brand-absence assertion + runtime non-enumerability test).
- **(c) Idempotent re-branding tolerated** — re-branding the same object is safe (guarded `defineProperty`, `configurable: true`).
- **(d) Harvest checks by direct/`hasOwnProperty` access** — never key enumeration, so the non-enumerable brand is always found and unrelated keys are never mistaken for it.

## The R6 ordering decision

The committed `components.yaml` order is **directory-scan order, NOT a sort** (Source 1 `progress.ts`, then Source 2 `src/components/core` in `readdirSync` order, brand-filtered, authored intra-file order). DECISION: **preserve scan order, no sort** — a sort would reorder to alphabetical and break the R6 `git diff` gate. This **overturned the pre-spike lean toward sorting**. The honest counter-argument (a sorted canonical order would decouple the gate from `readdirSync`'s platform behavior) is logged as a deferred portability follow-up, not adopted here. See `findings/r6-ordering-spike.md`.

## The isolation-audit result

`ComponentTokenRegistry` was the **only** mutable-accumulate-read-back singleton on the consumer-boundary path. Verified-benign peers: `unitConverter` (stateless), `transformerRegistry` (populate-at-init / read-in-same-copy), color `Map`s (immutable). The class invariant (R8 AC1) holds after 124; the 124-local class-invariant guard reds if the side effect returns. See `findings/isolation-audit.md`.

## Certification recap (Task 4)

Delivery gate CLOSED. Constructed dual-instance brand-survival test proven to have **teeth** (a temporary plain-`Symbol()` variant went RED 3/4; reverted byte-clean). Negative guard (unbranded → zero) and class-invariant guard added. Packed-install arbiter green (consumer `components.yaml` N>0, contains `inputradio.box.sm`); run with `--forceExit` for the **pre-existing** 118 MCP-teardown leak (not introduced by 124). The **registerless-bin** dual-instance re-cert is deferred to 118's 9.5.3.

## Out-of-scope items logged (with rationale)

- **C′ authoring-convention seed → Spec 123.** A collection/authoring-convention follow-up coupled to 123; not needed for the contract change and out of 124's scope.
- **Broader class-invariant lint → 118's 9.4 / Task 11 (R8 AC3).** 124 ships the spec-local class-invariant guard; codifying it as a repo-wide lint (brand-exception + invariant documentation) belongs to 118's resume work.
- **Pre-existing housekeeping seeded as issues (this task):** (1) `package.json` `"types"`-after-`"import"`/`"require"` export-condition ordering (unreachable for TS consumers; `package.json` untouched by 124; likely belongs with 118 export work); (2) token-index ordering ties to `readdirSync`/filesystem order (a canonical sorted order would be portable but needs a deliberate re-baseline; 124 deliberately preserves scan order to keep R6 a no-op).
- **Docs MCP currency:** `docs/token-system-overview.md` "Automatic registration" bullet corrected to the 124 contract; Docs MCP index rebuilt. Steering-doc staleness (e.g. `Rosetta-System-Architecture.md:449` "Automatic registration via defineComponentTokens()") flagged for Peter/governance — NOT edited (governance-gated).
- **Double-registration issue:** `.kiro/issues/bug-component-token-double-registration.md` — confirmed root cause resolved and **closed** (see that file's Resolution section; the cited side-effect `import '../tokens/component/progress'` in `generateTokenIndex.ts` is gone, and `loadComponentTokens.ts:81` is the sole `ComponentTokenRegistry` writer).

## The gated 118 handback (Task 6) status

**Unblocked, awaiting Peter's authorization.** The Task-4 delivery gate is green, which is the precondition for the 118 handback. Per the HOLD, nothing has been written into Spec 118 or its `session-handoff-2026-06-25.md`. Task 6 is checked **only** after Peter authorizes — it remains unchecked. `tasks.md`: Task 5 checked; Task 6 NOT checked.

## Artifacts

Completion docs: `completion/task-{1,2,3,4,5}-completion.md`; summaries `docs/specs/124-component-token-return-contract/task-{1,2,3,4,5}-summary.md`. Findings: `findings/r6-ordering-spike.md`, `findings/task-4-certification.md`, `findings/isolation-audit.md`. Source/tests per Task 3 + Task 4 artifacts. **Not committed** (Peter review pending). _Requirements: 8.3._
