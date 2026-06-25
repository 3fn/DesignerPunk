# Increment-2 Evidence Table (R4 AC3, AC8) — the assembled green/red record

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 7.4 (Increment 2)
**Agent**: Ada (parity semantics) + Thurgood (table assembly)
**Status**: ASSEMBLED — this is the fully-assembled table Task 8 reads (Ada SF-4: Task 8 cannot start until 7.4 is complete and the table is assembled, incl. the typecheck-coverage row).
**Hard constraint honored (R4 AC1):** investigation-only. No swap, no exports reconciliation, no migration. **This table informs but does NOT pre-decide the Task-8 direction.**

---

## How this table was produced

The parity harness (`src/tools/integrity/ParityOrchestrator.ts`, run via `npm run test:parity`) generates two fresh token trees by running the **same** generator (`scripts/generate-platform-tokens.ts`) under two runtime mechanisms — **ts-node** (root A) and **tsx** (root B) — into scratch cwds (no config → DEFAULTS), then compares each `INVENTORY` artifact **semantically** by reusing Spec 117's `Normalizer.normalize` + `SemanticComparator.compare` directly (a thin new orchestrator; no second engine; `GenerationIntegrityCheckImpl` deliberately bypassed). Volatile fields are normalized by `PARITY_NORMALIZATION_RULES` (117 defaults + the 118 defensive additions). Independently re-run and verified in the main loop.

---

## The green/red parity table (actual `npm run test:parity` output — exit 0)

| Surface / artifact | ts-node | tsx | semantic-parity | notes |
|--------------------|---------|-----|-----------------|-------|
| `token-index/primitives.yaml` | present | present | **green** | byte-identical (pure compare; no normalization needed) |
| `token-index/semantics.yaml` | present | present | **green** | byte-identical |
| `token-index/components.yaml` | present | present | **green** | byte-identical |
| `dist/DesignTokens.web.css` | present | present | **green** | raw differs (volatile `Generated:` header only); equal after normalization |
| `dist/DesignTokens.ios.swift` | present | present | **green** | raw differs (volatile `///` header only); equal after normalization |
| `dist/DesignTokens.android.kt` | present | present | **green** | raw differs (volatile header only); equal after normalization |
| `dist/DesignTokens.dtcg.json` | present | present | **green** | raw differs (volatile `generatedAt` only); equal after normalization |
| `dist/DesignTokens.figma.json` | present | present | **green** | byte-identical (carries no timestamp field) |
| `dist/ComponentTokens.web.css` | present | present | **green** | raw differs (volatile header only); equal after normalization |
| `dist/ComponentTokens.ios.swift` | present | present | **green** | raw differs (volatile header only); equal after normalization |
| `dist/ComponentTokens.android.kt` | present | present | **green** | raw differs (volatile header only); equal after normalization |
| `dist/product/ProductTokens.*` (×3) | absent | absent | **green** | optional; absent on both under DEFAULTS (not a divergence) |
| **typecheck coverage** (R6 AC3 input) | **full** | **none** | — | ts-node full-typechecks the scripts it runs; tsx never typechecks. Feeds the Increment-3a mitigation. See row note below. |
| **divergence hypothesis** (R4 AC7) | — | — | **refuted → clean exit** | the named generation gaps are mechanism-independent; routed out of 118 (see [divergence-hypothesis.md](divergence-hypothesis.md)) |

**Result: ALL GREEN** — every non-optional generated artifact is semantically identical between the two runtime mechanisms. **The single observed class of raw divergence is volatile timestamps**, fully neutralized by 117's existing normalization rules.

---

## Reading the two non-artifact rows

### Typecheck-coverage row (feeds R6 AC3 / Increment-3a mitigation — NOT acted on here)

The two mechanisms are **not** symmetric on one axis that does not show up in generated output: **typechecking**.
- **ts-node** (run without `transpileOnly`) full-typechecks the scripts it executes.
- **tsx** never typechecks (transpile-only by design).
- `tsc` covers `src/**` (`tsconfig.json` `include: ["src/**/*"]`) but **excludes `scripts/**`** — so ts-node is presently the **only** thing typechecking the `scripts/**` generators. Three ts-node scripts sit on the `npm run build` path (`generate:types`, `generate:platform-tokens`, `build:validate`); two of those run `scripts/**`.

**Consequence (recorded for Increment 3a, not executed in Inc 2):** a ts-node → tsx swap would silently drop typechecking of `scripts/**` unless a `scripts/`-covering typecheck step is added first. This is the R6 AC3 typecheck-gate-loss mitigation. It is **confirmed here, acted in 3a** (the resolved confirm-in-7 / act-in-3a split). Source: [entry-point-inventory.md](entry-point-inventory.md).

### Divergence-hypothesis row (R4 AC7 disposition)

**Refuted → clean exit.** Both named generation gaps (`token-index-generation-gaps`, `blendutilities-not-generated`) manifest **identically** under ts-node and tsx, so resolution divergence is not a plausible contributor. The work is routed out of Spec 118 (the blend gap → the holistic blend review; the token-index gap → already resolved by Spec 117; the one resolution-genuine slice → fixed by 118 Increment 1). Full reasoning and routing table: [divergence-hypothesis.md](divergence-hypothesis.md).

---

## The four inventories (R4 AC2/AC5/AC6) — completed, linked

The evidence the direction decision rests on is not only the parity table; it is the parity table **plus** the four inventories:

| Inventory | Requirement | Finding | Headline |
|-----------|-------------|---------|----------|
| Entry-point | R4 AC2 | [entry-point-inventory.md](entry-point-inventory.md) | The tsx (bin) / **ts-node (13 scripts — not 11)** split; 3 MCP + browser bundle exempt; tests via ts-jest. The split is the Increment-3a unification target. |
| Export-condition | R4 AC5 | [export-condition-inventory.md](export-condition-inventory.md) | import-only/require-only asymmetry; **`./config` now has BOTH import+require** (changed by Inc-1 Task 3 — design table stale); the raw-`.ts` trio `./blend`/`./build`/`./types` carry **all three conditions incl. `types`** → 3b must reconcile `types` too. |
| ESM-cost incl. jest-preset blast radius | R4 AC6 | [esm-cost-inventory.md](esm-cost-inventory.md) | The shipped require-only `@3fn/core/jest-preset` is the highest-leverage ESM cost; its `moduleNameMapper` couples it to 3b (not a one-line flip); **SF-5 two-copies-in-lockstep** (preset + `init` `tsconfig.test.json` `paths` + `init` `jest.config.js`). |
| Parking-form determination (OQ-3) | R4 AC6b | [esm-cost-inventory.md](esm-cost-inventory.md) §4 | **Parking form EXISTS** — `jest-preset.cjs` + require-condition retarget survives a `"type":"module"` flip (preset is require-only; `.cjs` is CJS-unambiguous). → the escape-hatch **defer branch is available**. Final boot confirmation deferred to the Group-10 close-state guard. |

---

## What the evidence says — and what it deliberately does NOT say

**Says (settled by this increment):**
- The two runtime mechanisms produce **semantically identical** token artifacts → **the runtime-resolution mechanism is not a source of generation divergence.** Whichever direction Task 8 commits, this removes "the loader changes the output" as a risk.
- The divergence hypothesis is **refuted**; the generation gaps are decoupled from module-resolution coherence and routed.
- The exports surface's incoherences are **inventoried** (the raw-`.ts` trio incl. `types`; the import-only `.`; the require-only jest-preset).
- An ESM escape-hatch is **viable** at the preset (parking form exists), so a native-ESM commitment is not blocked by an unavoidable in-spec preset migration.

**Does NOT say (by design — R4 AC8):**
- It does **not** pick CJS vs ESM. Parity being all-green means the *mechanism* doesn't corrupt output; it is **not** an argument for either direction. The direction rests on the inventories (jest-preset blast radius, the raw-`.ts` exports, the typecheck-coverage asymmetry) weighed by Peter in Task 8.
- It does **not** lift any deferred gate. No swap/reconcile/migrate occurred.

---

## Harness reproducibility + verification

- **Re-run:** `npm run test:parity` (standalone node runner; NOT jest — compares file outputs, and two full generations are slow). Exit 0 = all non-optional green.
- **Unit tests:** `npx jest src/tools/integrity/__tests__/ParityNormalizationRules.test.ts src/tools/integrity/__tests__/ParityOrchestrator.test.ts` — 17 passing (each added normalization rule has a positive + sentinel test).
- **Main-loop verification (independent of the subagents):** parity table reproduced ALL GREEN; 17 unit tests pass; full `npm test` and `tsc` clean; no `dist/`/`token-index/` mutation; no scratch-dir leakage. See [task-7-completion.md](../completion/task-7-completion.md).
