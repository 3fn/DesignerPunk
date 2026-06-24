# Design Document: Module-Resolution Coherence

**Date**: 2026-06-24
**Spec**: 118 - Module-Resolution Coherence
**Status**: Design draft — Ada/Lina design review incorporated (2026-06-24)
**Leads**: Thurgood (diagnosis, formalization, verification, governance contract); Ada (runtime loader + pipeline mechanics, Rosetta); Lina (component static guard + test-infra alignment, Stemma)
**Sources**: `.kiro/specs/118-module-resolution-coherence/requirements.md` (settled, R2-incorporated); `.kiro/specs/118-module-resolution-coherence/design-outline.md` (North Star rationale)

---

## Overview

This design realizes the **module-resolution contract** (Requirement 1): one contract governing every runtime entry point, package export, and TS execution path, consumer and internal alike. The contract is the target architecture; the increments are its staged, gate-controlled realization.

The document's structure is deliberately **asymmetric in depth, and the asymmetry is the design**. Two things are true at once:

1. Some pieces are buildable now and ship first. They are specified **in full**: Increment 1 (the config-load loader + the consumer-config boot/smoke guard), the Increment 2 evidence harness, the early direction-agnostic guards, the Spec 117 closeout, and the MCP/browser principled exception.
2. Some pieces are **gated on a decision this spec has not yet made** — the CJS-vs-ESM module-direction commitment (Requirement 4/5), which is made on Increment-2 evidence, in-spec, not assumed. Those pieces (Increment 3a/3b/3c, the static-lint polarity, the close-state coherence gate) are specified as **branch sketches**: the CJS branch and the ESM branch laid side by side, neither resolved.

Designing the gated pieces as if the answer were known would reintroduce the **assume-the-answer failure this spec exists to end** (the April→June→117 cycle was three diagnoses "resolved" twice by assuming a fix). The branch-sketch depth is therefore not under-specification — it is the maximum depth the unmade decision permits, and going further would be a defect.

This design also carries three **genuine empirical open questions** as design-time investigations *with decision procedures*, not resolved by fiat (see § Open Empirical Questions): (OQ-1) whether the loader resolves correctly across the CJS-host/ESM-loader boundary in `loadConfig` (including the config's transitive relative raw-`.ts` requires); (OQ-2) the complete volatile-field set for parity normalization; (OQ-3) whether a coherent CJS "parking form" for the jest-preset exists.

### Domain boundary for this document

Thurgood owns the document structure, the evidence-harness and guard *infrastructure* design, the governance/closeout mechanisms, and the spec-standards conformance. **Ada** owns the runtime loader mechanics, the parity-harness Rosetta semantics, the exports reconciliation, and whole-spec correctness review. **Lina** owns the component static-lint guard, the jest-preset/test-infra alignment, and the browser/MCP boot-smoke guard. Where this document touches Rosetta or Stemma internals, it states **the contract the design asserts**, not the implementation — the implementing agent supplies mechanics during their tasks.

### What is full-depth vs branch-sketched (and why)

| Piece | Requirement | Depth | Why |
|-------|-------------|-------|-----|
| Inc 1 loader replacement | R2 | **Full** | Direction-agnostic by hard requirement (R2 AC4); ships first |
| Inc 1 consumer-config boot/smoke guard | R3 AC1–3 | **Full** | Direction-agnostic; lands in Inc 1 |
| Inc 2 evidence harness (parity + inventories) | R4 | **Full** | Investigation-only; produces the evidence the decision rests on |
| Dynamic-import smoke test; browser-bundle guard | R10 AC2, R12 | **Full** | Direction-agnostic; land early |
| Spec 117 closeout note | R11 | **Full** | Mechanism is decision-independent |
| MCP/browser principled exception | R12 | **Full** | Boundary + paired guard are decision-independent |
| Static-lint **tooling** | R10 AC3 | **Full (tooling)** | Tooling is not direction-coupled |
| Inc 3a runtime / 3b exports / 3c direction | R6 / R7 / R8 | **Branch-sketched** | Polarity/mechanism gated on R4 decision |
| Static-lint **policy/polarity** | R10 AC3 | **Branch-sketched** | Polarity inverts CJS↔ESM |
| Close-state coherence gate | R5 AC6, R3 AC4, R8 | **Branch-sketched** | Only fires on the ESM-escape-hatch branch |

---

## Architecture

### The target contract (Requirement 1)

```
                    ONE MODULE-RESOLUTION CONTRACT
   ┌───────────────────────────────────────────────────────────────┐
   │  governs NON-BUNDLED runtime TS                                 │
   │                                                                 │
   │   • one config-load primitive (carries own TS resolution) R2    │
   │   • one runtime TS-execution mechanism (no tsx/ts-node split)R6 │
   │   • coherent package exports (no mixed raw-.ts / dist)      R7  │
   │   • one committed module direction (CJS | ESM), on evidence R4  │
   │   • enforcement: boot/smoke guards + web static lint     R3/R10 │
   │   • codified in steering as law                            R9   │
   └───────────────────────────────────────────────────────────────┘
                              ▲           exempt (bundling resolves
                              │            imports at build time) R12
              ┌───────────────┴───────────────┐
              │  BUNDLED SUBSYSTEMS (exempt)   │  ← paired boot/smoke guard
              │  3 esbuild MCP servers         │     so the exemption is a
              │  browser bundle                │     boundary, not a carve-out
              └────────────────────────────────┘
```

### Increment delivery map (two gate types)

Two gates apply throughout (Requirement 1 / outline § Cohesive Incremental Delivery):
- **Evidence gate** — no swap before proof (the Increment-2 green/red table gates every subsequent increment). Guards the *swap*.
- **Scope gate** — per-surface 3a→3b→3c sequencing, each CI-green before the next. Guards the *scope* (OKLCH derailed by expansion, not blind swapping).

```
 Inc 1 (ships first)        Inc 2 (investigation only)      DECISION        Inc 3 (scope-gated, per-surface)
 ┌──────────────────┐       ┌────────────────────────┐    ┌─────────┐      ┌────────────────────────────────┐
 │ loader replace   │       │ entry-point inventory  │    │ R4/R5:  │      │ 3a runtime  → 3b exports →     │
 │ (R2)             │ ────▶ │ parity harness (R4)    │──▶ │ commit  │ ──▶  │ 3c direction-execution         │
 │ consumer guard   │       │ exports/ESM-cost inv.  │    │ ONE     │      │ (each CI-green before next)    │
 │ (R3 AC1–3)       │       │ divergence hypothesis  │    │ direction│     │  ESM variant = escape-hatch    │
 │ 117 closeout(R11)│       │ → green/red table      │    └─────────┘      │  candidate (R5 AC5/R8 AC3)     │
 └──────────────────┘       └────────────────────────┘                    └────────────────────────────────┘
   direction-AGNOSTIC          direction-AGNOSTIC          evidence-       DIRECTION-GATED (branch-sketched)
   guards land early (R10/R12) ───────────────────────────  informed
```

Increment 1 is independently shippable and CI-green-gated on its own (R2 AC6). The early direction-agnostic guards (R10 AC2, R12) are not gated on the decision and land alongside Inc 1/Inc 2.

---

## Increment 1 Design (full) — Config-Load Primitive (R2) + Consumer-Config Guard (R3 AC1–3)

### Current state (grounded)

`src/config/ConfigLoader.ts` exports `async function loadConfig(cwd = process.cwd()): Promise<ResolvedConfig>`. The relevant facts, read from the whole file:

- The loader is a **plain async function with a default `cwd` parameter** — no dependency-injection seam today; the swap target is the single statement at line 59.
- The TS-load locus is exactly one line: `const loaded = await import(configPath)` (`ConfigLoader.ts:59`), inside a `try/catch` that re-wraps any failure as `Failed to load ${configPath}: ${message}` and throws (fail-loud already; the design preserves this).
- `userConfig = loaded.default || loaded` — the loader tolerates both default and namespace exports. Any replacement must preserve this unwrapping.
- The function runs in a **CommonJS execution context**: it uses `__dirname` at line 78 (`path.resolve(__dirname, '../tokens')`) and never uses `import.meta`. This is the constraint the new loader must operate within (R2 AC3).
- Existing behavior: if no `designerpunk.config.ts` exists, `loadConfig` returns DEFAULTS-derived config without ever calling the loader. The swap touches only the file-exists branch.

**Caller contract to preserve (R2 AC8, verified inventory):**

| Caller | Site | Consumes |
|--------|------|----------|
| `src/cli/designerpunk.ts` | `:106`, `:185` (generate, validate paths) | resolved config |
| `src/cli/validate.ts` | `:28` | resolved config |
| `src/cli/validateProductTokens.ts` | `:15` | resolved config |
| `scripts/generate-platform-tokens.ts` | `:50-51` (via `await import('../src/config/ConfigLoader')`) | resolved config |
| re-export | `src/config/index.ts:6` | — |

Non-callers (verified, do **not** change): `generateTokenFiles` consumes the *resolved config object*, not `loadConfig`; `ReleasePipeline.ts:125`'s private `loadConfig` is a name-collision reading `release-config.json` via `JSON.parse`. The swap is **inside `loadConfig`**, so all callers are preserved by construction — this is exactly why R2 AC5 mandates swapping inside `loadConfig`, not adding `bin` hooks.

### Candidate loader approaches (decision procedure, not a pre-pick)

The requirements deliberately do not pick the library (R2 AC3). The tsx API surface was read from `node_modules/tsx/dist/{cjs,esm}/api/*` and is as follows:

- `tsx/cjs/api` exports **`register`** and **`require`** (`tsxRequire`). It hooks Node's `require()`. It does **not** export `tsImport`.
- `tsx/esm/api` exports **`register`** and **`tsImport(specifier, options)`** where `options` carries `parentURL`. `tsImport` is **ESM-API-only**.
- `jiti` is **NOT installed** (verified — absent from `package.json` deps and `node_modules`). If selected, it is a **new dependency add** that must be budgeted (R2 AC3).

| # | Approach | How it loads the config | CJS-context fit (the open question) | Cost |
|---|----------|-------------------------|-------------------------------------|------|
| A | `tsx/cjs/api` `register()` + scoped `require(configPath)` | Register the CJS hook, then `require` the `.ts` config and its transitive relative `.ts` imports through tsx's `require` extension | **Native CJS API** — designed for `require`/`__dirname` context. Highest a-priori fit. **Correction (Ada MF-2):** `register({namespace})` does **NOT** avoid global mutation — it still sets `module._resolveFilename` and patches `module._extensions` **process-globally** (verified `node_modules/tsx/dist/register-D46fvsV_.cjs`). The namespace buys **request-level isolation** (the global hook no-ops for any request whose namespace query-param doesn't match), NOT absence of global mutation. A therefore **satisfies R2 AC1** (carries its own resolution) but **implements it via global mutation + namespace scoping + a mandatory `unregister()`** (the returned `NamespacedUnregister`) to restore `module._resolveFilename`. **If A is the accepted approach, calling the returned `unregister()` after the load is part of its acceptance — not optional.** A is also **synchronous** (`ScopedRequire`) — see decision-procedure note. | No new dep (tsx already present) |
| B | `tsImport` via dynamic `import('tsx/esm/api')` from CJS | `const { tsImport } = await import('tsx/esm/api'); await tsImport(configPath, { parentURL: pathToFileURL(__filename).href })` | **Reframed (Ada SF-1) — parentURL construction is NOT the risk.** `tsImport`'s second arg is explicitly a `parentURL` string (verified `node_modules/tsx/dist/esm/api/index.mjs`), and `__filename` exists in CJS, so `pathToFileURL(__filename).href` satisfies it cleanly. `tsImport` also **self-scopes** — it internally calls `register({namespace: Date.now()})` per invocation and leaves **no persistent global hook** (a point in B's favor, and a no-residue advantage — see Decision 4). The genuine residual risk (OQ-1) is the **CJS-host/ESM-loader boundary**: whether dynamic `import()` inside an ESM-loader-registered hook resolves correctly when the host module is CJS, and whether the config's **transitive relative raw-`.ts` requires** get the resolution they need. | No new dep |
| C | `jiti` — `createJiti(__filename)(configPath)` | jiti's own resolver loads the `.ts` config + transitive `.ts` | jiti is built for exactly this CJS-host-loads-TS use; works in both CJS and ESM hosts. The **named fallback** if A/B fail the CJS-context + forward-compat tests. | **New dependency** (must be added + budgeted) |

**Decision procedure (resolved empirically in Increment 1, recorded as a finding):**

1. Stand up the resolution matrix as an executable harness (it already exists as the diagnosis harness reproducing `bin` machinery — see Diagnosis in requirements). The matrix rows that must go green: **source-directory import** and **faithful-consumer** (compiled import + relative raw-`.ts` `./my-overrides`) — both currently fail with `Cannot find module` / `Directory import not supported`.
2. Exercise approaches against the matrix, each swapped *inside* `loadConfig`, re-running the matrix **for both an ESM-authored and a CJS-authored config** (R2 AC4 — forward-compatibility is a HARD requirement; this is the test that prevents prejudging the R4 direction). Order-of-trying is operationally minor; the **accept-criteria below are the substance** (Resolution 3 / E14).
3. **Accept-criteria.** An approach is acceptable only if it: (a) turns the failing matrix rows green, (b) passes for both CJS- and ESM-authored configs, (c) operates correctly within `loadConfig`'s CJS context (`__dirname`, no `import.meta`) — the OQ-1 CJS-host/ESM-loader boundary, (d) preserves the `loaded.default || loaded` unwrap + the existing fail-loud `try/catch` (contract-preserving), and **(e) leaves no ambient/global residue after the call** (first-class criterion — Resolution 3). Criterion (e) encodes this spec's coherence value into the *selection* rather than relegating it to a finding.
4. **Selection consequence (Resolution 3 / E14):** when **both A and B pass**, **PREFER B**. `tsImport` self-scopes and auto-tears-down, leaving no global residue (satisfies (e) cleanly), and it is **zero-new-dependency** (`tsImport` ships in the tsx already present) — so "familiarity" was never a real tiebreaker. **A wins only if B fails the CJS-boundary test (OQ-1).** If A wins, its `unregister()` lifecycle (E3 — A mutates `module._resolveFilename` globally and restores it via the returned `NamespacedUnregister`) and its coexistence with the bin's bare hook (Resolution 2) MUST be certified by the subprocess guard. **Note A's scoped `require` is synchronous** (`ScopedRequire`), so `await <A>` is harmless (awaiting a non-promise) and `.default || loaded` works on the sync return — do not "fix" the apparent missing await (Ada SF-2).
5. If the accepted approach is **C (jiti)**, record the dependency add as a task output and note it in the governance codification (R9). Naming jiti as fallback does not pick it — it acknowledges that the forward-compat HARD requirement combined with the loaders' empirical uncertainty makes the fallback's existence material.

### The swap (contract-preserving)

The replacement substitutes only the body of the `try` block at `ConfigLoader.ts:57-65`. Pseudocode shape (Ada owns final mechanics):

```
if (fs.existsSync(configPath)) {
  try {
    const loaded = await <chosen-loader>(configPath, /* CJS-context anchor: __dirname/__filename */);
    userConfig = loaded.default || loaded;          // preserved unwrap
    configDir  = path.dirname(configPath);          // preserved
  } catch (err) {                                    // preserved fail-loud
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to load ${configPath}: ${message}`);
  }
}
```

**Fail-loud behavior (consistent with the existing loader):** the chosen loader must surface a TS-resolution failure as a thrown error inside the existing `try/catch`, never resolve to a partial/empty config. R2 AC1's "carries its own resolution, assumes no ambient loader" is satisfied because the loader (A's scoped register, B's `tsImport`, or C's jiti instance) registers/resolves *within the call*, not via a process-global hook registered elsewhere (the `bin`'s `tsx/cjs/api.register()` is no longer **relied upon** by the config path).

**Scope of Increment 1 — bin-hook persists, by design (Resolution 2 / E13).** Increment 1 changes ONLY the config lane. The `bin`'s bare `register()` (`bin/designerpunk.js:16`) **persists for its separate, still-needed job** — executing the CLI's own source — **until Increment 3a unifies runtime mechanisms**. This is a **coherent intermediate, not a half-fix:** Inc 1 removes the config lane's *dependency* on the ambient hook (R2 AC1 satisfied); the bin hook continues a distinct legitimate purpose. Forcing its removal into Inc 1 would be the scope-creep this spec warns against — it would bend Inc 1 toward runtime unification and couple Inc 1's shippability to the CLI boot path. **The interim coexistence is CERTIFIED, not assumed:** the subprocess guard (below) exercises the bin path (`npx designerpunk generate`), so the coexistence is guarded. If approach A is chosen, namespace scoping isolates the config-lane requests from the bin's bare hook, and the `unregister()` per the decision procedure restores global state after each config load. This is the recorded resolution to Ada's bin-hook-sequencing open question.

### Consumer-config boot/smoke guard (R3 AC1–3)

A **standing, preventive** guard (not a one-time check) that loads a faithful consumer config and fails loudly if resolution breaks.

- **Execution context — subprocess/bin, NOT in-process (Lina MF-A — THE most important correction).** The R3 guard MUST run through the **CLI/bin subprocess path** (pack → install → `npx designerpunk generate`, like `tests/consumer-integration.test.ts`), **NOT** an in-process `loadConfig()` call under ts-jest. **Reason:** in-process under ts-jest, `await import(configPath)` is intercepted by jest's module registry and **never hits Node's strict-ESM resolver** — proven by `ConfigLoader.test.ts` (configs written as `module.exports` in `.ts` files, with the comment "avoids needing ts-node in test") **passing today despite the production path being broken**. An in-process guard would go **green against the very bug it guards** (false negative). The guard therefore lives in the `consumer-integration.test.ts` family but is exercised via the subprocess/bin path, not via an in-process `loadConfig`.
- **Non-skippable required CI (Resolution 1 / E12).** This guard is the completion of "accept the subprocess cost": it MUST be **non-skippable required CI**, not an optional slow test. A guard slow enough to be quietly skipped erodes exactly like the workarounds this spec exists to end — tie this to the Civitas process-guard (R9).
- **Both directions, faithful fixtures (R3 AC3; Lina SF-B).** The guard provides **two fixtures** — one ESM-authored config, one CJS-authored config — so it does not silently assume a direction (mirrors R2 AC4). The two fixtures only mean something **through the subprocess/bin path**: a `module.exports`-in-`.ts` fixture is **neither faithful CJS nor ESM** (it is a jest-transform artifact). The **ESM fixture MUST use real `export default` + ESM-syntax transitive imports**; the **CJS fixture MUST use real `require()`**; both loaded via subprocess. Each fixture's `designerpunk.config.ts` imports a relative raw-`.ts` override (`./my-overrides`).
- **Fail-loud — positive sentinel assertion, NOT "not DEFAULTS" (Lina SF-A).** Asserting "resolved config is not the DEFAULTS fallback" is **insufficient**: DEFAULTS only triggers on the *no-file* branch (`ConfigLoader.ts:56`), not on a transitive resolution break. The guard MUST **positive-assert a sentinel value that ONLY the transitive `./my-overrides` import produces** (e.g. a sentinel token/theme), so a partial-but-non-default load cannot pass.
- **Scope boundary:** this is the Increment-1 config-load guard. The **shipped-preset close-state guard (R3 AC4)** is a *different* guard, exercised at the escape-hatch close, NOT Increment-1 scope — designed in the branch-sketch section below.

---

## Increment 2 Design (full) — Evidence (R4)

Increment 2 is **investigation only** (R4 AC1): no swap, no exports reconciliation, no migration. It produces inventories and a green/red evidence table that **informs but does not pre-decide** the R4 direction decision (R4 AC8).

### Reuse of Spec 117's normalization engine (verified — NOT a rebuild)

This is the central architectural decision of Increment 2, and it rests on code I read directly. Spec 117's integrity tool lives at `src/tools/integrity/`:

- `Normalizer.ts` — a **data-driven `NormalizationRule[]` engine** with a standalone public `normalize()` (`Normalizer.ts:44`). Its own header states the rule set is "intentionally small here; the complete set is finalized during R2 harness completion" — i.e. it was *built to be extended*. Rules are `{ appliesTo: ArtifactKind[]|'all', apply(value, kind) }`.
- `SemanticComparator.ts` — recursive key-order-independent deep-diff for structured artifacts, positional line-diff for text, with a standalone public `compare()` (`SemanticComparator.ts:19-29`). Emits `Divergence[]`.
- `GenerationIntegrityCheck.ts` (`GenerationIntegrityCheckImpl`) — orchestrates normalize → compare, but is **hardwired to committed-vs-fresh**: its constructor takes exactly **ONE** `FreshGenerator` and reads the committed side itself via `readCommitted()` / `fs.readFileSync` (`GenerationIntegrityCheck.ts:37-47,67-69,105-115`). **It cannot ingest two fresh trees** — so it is NOT the seam for parity.
- `FreshGenerator` interface + `DiskFreshGenerator.ts` — reads fresh artifacts from a directory produced by a prior `generate` run, carrying `generatedVia`/`provisional` flags.

**Why this is genuinely reusable for the parity harness — and where the seam actually is (Ada MF-1).** 117 compares *committed* vs *fresh* for one mechanism. The parity harness (R4 AC3) compares **two fresh generates** — ts-node-produced vs tsx-produced — for *semantic* equality. The reusable core is **`Normalizer.normalize()` + `SemanticComparator.compare()` directly** — both standalone and public, and `compare` is **symmetric** (the `committedValue`/`freshValue` field names become cosmetic labels in a parity context, but the comparison is correct). The parity harness reuses these via a **NEW thin parity orchestrator that bypasses `GenerationIntegrityCheckImpl`** (which cannot take two fresh trees). The orchestrator reads tree A and tree B — each a fresh `generate` (ts-node vs tsx) written to a scratch dir — and diffs `normalize(treeA)` against `normalize(treeB)`. It **may read the two roots directly**; `FreshGenerator`/`DiskFreshGenerator` remains reusable as a per-tree *reader*, but is **NOT** the two-tree seam.

> **Coherence note (this is itself a 118 concern):** introducing a *second* normalization engine for the parity harness would be its own incoherence — exactly the disease this spec treats. The design therefore **mandates reuse** of 117's `Normalizer`/`SemanticComparator` and forbids a parallel one. (Note: the NEW parity orchestrator is not a second engine — it is thin glue over the reused `normalize`+`compare`.)

> **Honest limit on the reusability claim:** I verified `normalize()` and `compare()` are standalone/public and `compare` is symmetric. I did **not** execute a ts-node-vs-tsx generation to prove the two trees normalize to equality in practice — that proof IS the Increment-2 deliverable. The real open question for the orchestrator is **"does it need the `FreshGenerator` abstraction at all, or just two roots?"** — likely just two roots (the orchestrator reads both fresh trees directly). Flagged for Ada's review.

### Volatile-field normalization set (R4 AC4 — open, evidence-driven)

R4 AC4 requires normalizing/excluding **all generation-volatile fields**, enumerated from actual output, **not a closed list**. I read the generators to establish the *minimum* set and what 117's Normalizer already covers vs what must be added:

| Volatile field | Source (verified) | 117 `Normalizer` today | Action for parity harness |
|----------------|-------------------|------------------------|----------------------------|
| ISO timestamps (values) | everywhere | **Covered** — `ISO_DATETIME` strip + `VOLATILE_KEYS` (`generatedAt`, `timestamp`) | reuse |
| `generatedAt` (DTCG `$extensions`) | `DTCGFormatGenerator.ts:236` | **Covered** (VOLATILE_KEYS + ISO value) | reuse |
| `rosettaVersion` | `DTCGFormatGenerator.ts:226-236` (read from `package.json` at runtime) | **NOT covered** — not in `VOLATILE_KEYS`; only differs if the package version changes between runs, but a parity run with a bumped version would false-diff | **ADD** key to volatile set |
| `version: '1.0.0'` (DTCG embedded) | `DTCGFormatGenerator.ts:235` | NOT covered (constant today, but embedded-version class) | **EVALUATE** — likely add for class-completeness |
| `extensions.themes = registeredThemes` (array) | `DTCGFormatGenerator.ts:240-242` — embedded when themes are configured | NOT covered; `SemanticComparator` compares arrays **positionally** (`SemanticComparator.ts:46-52`) | **ENUMERATE** during construction + **flag array-ordering of theme metadata as a candidate normalization** (Ada MF-3). Registered-theme ordering/presence differing between the two parity runs is a real **false-diff vector**. Also latent in 117, but in-scope to name here since 118 extends the rule set. |
| `Generated:` header comments | `TokenFileGenerator.ts:307,382,461` (` * Generated: ${timestamp}` / `/// Generated:`) | **Covered incidentally** — `normalizeText` drops lines matching `ISO_DATETIME`, and these lines carry an ISO timestamp | reuse (confirm the `///` Swift form also matches) |
| build-timing / `duration` fields | generation result objects | not in token-index/DTCG output files themselves | **ENUMERATE** from actual output during construction |
| key ordering | structured artifacts | **Covered** — `SemanticComparator` is key-order independent | reuse |
| token-index YAML | `generateTokenIndex.ts:173-187` | **clean** — `yaml.dump({tokens}, {lineWidth:-1})`, no header/timestamp | no normalization needed (confirmed) |

The complete set is **enumerated from actual generator output during harness construction** (R4 AC4) — the table above is the *seed*, not the closed list (this is OQ-2). A raw byte-diff is rejected (it would never go green — DTCG/token-index carry timestamps + ordering — making the gate a false-blocker or rubber-stamp). This is the same semantic-equality discipline 117 adopted (117 Design Decision 1).

### Entry-point inventory (R4 AC2)

Inventory **every runtime TS entry point** (all verified present in `package.json`):

| Entry point | Mechanism | Notes |
|-------------|-----------|-------|
| `bin/designerpunk.js` | `tsx/cjs/api` register + `require('../src/cli/designerpunk.ts')` | the prod CLI path |
| scripts: `generate:types`, `generate:platform-tokens`, `extract:meta`, `build:validate`, `release:*`, `audit:*`, `figma:*`, `generate:theme-skeleton` | `ts-node` (11 scripts verified) | the tsx/ts-node split |
| 3 MCP servers (application, docs, product) | esbuild `--bundle --format=cjs` (`build:mcp`) | **exempt** (R12) |
| browser bundle | esbuild (`scripts/build-browser-bundles.js`) | **exempt** (R12) |
| tests | ts-jest (jest-preset) | — |

### Exports / export-condition inventory (R4 AC5)

Inventory **runtime consumers of the raw-`.ts` exports** AND **all export conditions** (verified from `package.json` `exports`):

| Subpath | `import` | `require` | `types` | resolves to | Coherence question |
|---------|----------|-----------|---------|-------------|---------------------|
| `.` | ✓ | — | — | `dist/browser/designerpunk.esm.js` | **import-only** — `require('@3fn/core')` resolves nothing |
| `./components` | ✓ | — | — | `dist/browser/designerpunk.esm.js` | **import-only** |
| `./config` | ✓ | — | — | `dist/config/index.js` | import-only; `dist` (not raw `.ts`) |
| `./blend` | ✓ | ✓ | ✓ | `src/blend/index.ts` | **raw `.ts`** (second-instance hazard); **all three conditions → raw `.ts`** |
| `./build` | ✓ | ✓ | ✓ | `src/build/tokens/index.ts` | **raw `.ts`**; **all three conditions → raw `.ts`** |
| `./types` | ✓ | ✓ | ✓ | `src/types/index.ts` | **raw `.ts`**; **all three conditions → raw `.ts`** (e.g. `"types": "./src/types/index.ts"`) |
| `./jest-preset` | — | ✓ | — | `dist/testing/jest-preset.js` | **require-only** (CJS, shipped) |
| `./testing` | ✓ | ✓ | — | `dist/testing/index.js` | both |

The `import`-only / `require`-only asymmetry (R4 AC5, Lina SF-1) is inventoried, not only the three raw-`.ts` subpaths. A `require` of `@3fn/core` resolving nothing today is itself a coherence question carried into R7. **`types` condition (Ada SF-4):** `./blend`, `./build`, `./types` each carry **three** conditions — `import`, `require`, AND **`types`** — all pointing at raw `.ts`. The R7 reconciliation (3b) must therefore reconcile **`types` too**: reconciling import/require to `dist` while leaving `types` at raw `.ts` would **desync consumer typechecking**.

### ESM-cost inventory incl. jest-preset blast radius (R4 AC6)

The ESM-migration cost inventory must include the **shipped `@3fn/core/jest-preset` consumer blast radius**. Verified facts:

- `./jest-preset` exports `dist/testing/jest-preset.js` as **`require`-only/CJS**, shipped to product consumers (Spec 105). An ESM flip propagates to every consuming product's test setup.
- The preset's `moduleNameMapper` (`src/testing/jest-preset.ts:50-58`) rewrites `@3fn/core/{blend,build,types,testing,config}` → **raw `.ts` source** under `pkgRoot`. This **couples the preset to the R7 exports reconciliation** (Lina MF-1) — it is NOT a one-line `testEnvironment` flip. The ESM-cost inventory names these raw-`.ts` mapping entries explicitly.
- **Parking-form determination (R4 AC6b → OQ-3):** the inventory must determine whether a coherent CJS "parking form" for the preset exists (e.g. an explicit `.cjs` / `require`-only form with no premature `"type":"module"` flip that would strand it). This fact decides defer-vs-migrate under the escape-hatch (R5 AC5/AC6). Carried as OQ-3.

### Divergence-hypothesis test (R4 AC7 — falsifiable, bounded)

Test the hypothesis that `token-index-generation-gaps` / `blendutilities-not-generated` correlate with resolution divergence. The harness establishes **correlation, not causation**:
- "**Confirmed**" SHALL mean "resolution divergence is a *plausible contributor* → escalate to root-cause," NOT "proven cause."
- "**Disproven**" → the generation-gap work **exits Spec 118's scope cleanly** (it is not absorbed). Clean exit means a documented finding routing it out, not silent carry.
- Ada owns confirmation via the parity harness (Resolved Decision 1).

### Green/red evidence table (R4 AC8)

The Increment-2 deliverable is a table of the form below. It informs but does not pre-decide R4:

```
| Surface / question        | ts-node | tsx | semantic-parity | notes                       |
|---------------------------|---------|-----|-----------------|-----------------------------|
| token-index/*.yaml        |  green  |green|   green/red     | clean output, pure compare  |
| DTCG.json (normalized)    |  green  |green|   green/red     | rosettaVersion/ts normalized|
| DesignTokens.* (text)     |  green  |green|   green/red     | Generated: header normalized|
| ComponentTokens.*         |   ...   | ... |   green/red     |                             |
| typecheck coverage        |  full   |none |   —             | feeds R6 AC3 mitigation     |
| divergence hypothesis     |   —     | —   | plausible/refuted| R4 AC7 disposition         |
```

---

## Early Direction-Agnostic Guards (full)

### Dynamic-import smoke test (R10 AC2a — preventive)

A **preventive** guard (named as such — not a fix for an active failure mode). **Verified fact (Lina-confirmed and re-confirmed here):** `grep` of `src/components` for dynamic `import(` excluding tests/type-imports returns **zero** — no web component source uses runtime dynamic `import()` today. The smoke test therefore guards a *future* regression: it asserts no web component source introduces an extensionless/raw-`.ts` runtime dynamic `import()`. Lands early, direction-agnostic.

### Browser-bundle guard (owned by R12)

The browser-bundle boot/smoke guard is **owned by Requirement 12** (the bundled-subsystem guard family) so it is built **once** (Lina SF-2). R10 references it so the direction-agnostic guard set is complete-by-reference and the guard is neither double-built nor gapped. Designed in the MCP/browser section below.

### Static-lint tooling (early) — polarity DEFERRED

The static-lint **tooling** (the lint rule scaffold + its CI wiring) MAY be built early — it is not direction-coupled. Its **policy/polarity is branch-sketched** below (R10 AC3), because the polarity inverts CJS↔ESM and is gated on the R4 decision. Building the tooling now without setting polarity is explicitly the right move (outline / Lina R1).

---

## Spec 117 Closeout (full) — R11

The mechanism (Resolved Decision 4): once **Increment 1 execution makes Spec 117's config-load path certain**, a Spec 118 task — **as an acceptance criterion** — writes a **guidance note into Spec 117's spec directory** (`.kiro/specs/117-token-index-generation-integrity/`).

**What the note says:**
1. It **supersedes 117 `findings/decision-record.md` item 3** — the empirically-false claim that the one-line directory-import fix unblocks the documented CLI. (Verified false: the one-liner relocates the failure one hop down the barrel chain — `./src/config/index.ts` → `./defineConfig`.) The note states the *actual* fix is the Increment-1 loader replacement, not the one-liner.
2. It **advises re-running 117's own Task 5.3 trust gate** — Increment 1 only makes that gate *executable*; it does not lift 117's provisional status (R11 AC4).
3. It **scopes restored trust narrowly to the config-load path ONLY** (R11 AC3). The raw-`.ts` exports path stays unverified until Increment 3b (R7).

**What the note does NOT do:** it does not assert 117's readiness on 117's behalf (R11 AC4), and 117 is **not corrected in-place now** (R11 AC5 — one authoritative note beats a correct-now-revise-later edit). 117's `findings/decision-record.md` items 3 & 7 are already marked superseded-pending-118; this note is the trigger that activates 117's own re-gate.

**Where it is written:** a new note file in 117's spec directory (e.g. `findings/118-closeout-note.md`), cross-referenced from 117's decision-record. The note's existence + content is the R11 acceptance criterion; 117's status lift is 117's own action.

---

## MCP/Browser Principled Exception (full) — R12

### The exemption boundary (R12 AC1, AC3)

The runtime-resolution contract governs **non-bundled runtime TS**. **Bundled subsystems are exempt**, on the principle that **bundling resolves imports at build time** (verified: `build:mcp` runs esbuild `--bundle`; `scripts/build-browser-bundles.js` bundles the browser entry). The exempt set:
- the three esbuild-bundled MCP servers (application, docs, product),
- the browser bundle.

This is documented as a **coherent boundary** (which subsystems are exempt and why), cross-referenced from the R9 governance codification — not an undocumented carve-out (R12 AC3).

### Paired boot/smoke guard (R12 AC2 — single owner)

The exemption is **paired with a boot/smoke guard** on the MCP bundles and the browser bundle so the exempt subsystems still **fail loudly** if they break (R12 AC2). **Requirement 12 OWNS this guard** — it is built once here; R10 AC2b references it (Lina SF-2). Design:
- **MCP guard:** boot each bundled MCP server (`dist/mcp/*.js`) far enough to confirm it initializes its tool/resource surface without a module-resolution error; fail the CI step if any throws on boot.
- **Browser guard:** load `dist/browser/designerpunk.esm.js` and confirm it registers its custom elements without a resolution error (components register eagerly — see the dynamic-import smoke note).

### MCP-server ts-node dev configs (R12 AC4 — documented exception, NOT "reconcile")

The MCP servers carry their **own ts-node dev configs**. These are a **documented principled exception per Resolved Decision 2** — they do not load consumer configs but carry their own dev TS execution, and they are **bundled at ship time**. The word "reconcile" is deliberately **not** used (it would reintroduce a question Decision 2 already closed). They are documented and paired with the boot/smoke guard per AC2.

---

## Direction-Gated Increments (structural / branch-sketched)

> Everything in this section is **gated on the Requirement 4/5 module-direction decision**, which is made on Increment-2 evidence, in-spec. The CJS branch and the ESM branch are sketched **side by side**; neither is resolved. Resolving either here would be the assume-the-answer defect this spec exists to end.

### Increment 3a — Runtime Mechanism Unification (R6)

**Both branches:** unify on **one** runtime TS-execution mechanism for non-bundled runtime TS, eliminating the tsx (bin) / ts-node (11 scripts) split. CI-green before 3b (scope gate, R6 AC2). **This is where the `bin`'s bare `register()` (`bin/designerpunk.js:16`) is removed (Resolution 2 / E13):** Increment 1 deliberately left it in place because it serves a separate, still-needed job (executing the CLI's own source); 3a's runtime unification is the increment that actually retires it. Until then the Inc-1/bin coexistence is guard-certified by the subprocess consumer guard (which exercises `npx designerpunk generate`).

**Typecheck-gate-loss mitigation (R6 AC3 — named, mandatory, both branches).** This is sharper than "the fed output" and applies regardless of direction:
- ts-node (run without `transpileOnly`) **full-typechecks the scripts it runs today**; tsx never typechecks.
- `tsc` covers the generated *output* (`src/types/generated/TokenTypes.ts`, which lives in `src/`) but **NOT the generator scripts**: `tsconfig.json` `include: ["src/**/*"]` **excludes `scripts/**`** (verified). ts-node is presently the **only** thing typechecking those scripts.
- Therefore swapping ts-node→tsx **silently drops typechecking of `scripts/**`** unless a `scripts/`-covering typecheck step is added. The mitigation SHALL confirm `tsc` (or a dedicated step) covers **both** the fed artifacts **and** the `scripts/**` generators — *before* swapping the loader that `generate:types` (and the `prebuild` chain) relies on.

| Branch | 3a mechanism | Concentration/pin design |
|--------|--------------|--------------------------|
| **CJS-consistency** (R6 AC4) | standardize on **`tsx`**, retire `ts-node` | **Pin tsx tighter than `^4.21.0`** (current pin verified). Retiring ts-node removes the only *second* TS runtime — **no fallback executor remains** (Ada S5) — strengthening the case for a tight pin **+ a pin-bump review gate**. |
| **Native ESM** (R6 AC5) | the mechanism the ESM end-state requires — **deliberately under-specified**, determined by the committed direction, consistent with the persistent TS-config loader (anchor fact). | finalized in design *after* the R4 decision. |

### Increment 3b — Package Exports Reconciliation (R7)

**Both branches:** reconcile `./blend` (`src/blend/index.ts`), `./build` (`src/build/tokens/index.ts`), `./types` (`src/types/index.ts`) — all verified raw-`.ts` — to coherent runtime resolution, closing the second-instance hazard. CI-green before 3c (scope gate, R7 AC2). **This is where Spec 117's exports path finally certifies** (R7 AC3) — until 3b lands, the raw-`.ts` exports path stays unverified (117 trust is config-load-path-only).

**Reconciliation design (both branches must account for):**
- **Self-reference exports** `@3fn/core/{blend,build,config}` resolving under the unified runtime mechanism, **both `require` and `import`** paths (the import-only/require-only asymmetry from the R4 inventory) — **and the `types` condition** on `./blend`/`./build`/`./types` (Ada SF-4): reconciling import/require to `dist` while leaving `types` at raw `.ts` would desync consumer typechecking, so 3b must reconcile `types` too.
- **`paths` vs exports-map:** confirm how aliases resolve at runtime today — **tsx/esbuild do not honor tsconfig `paths` by default** (confirm in design/evidence).
- **Consumer-side mapping is encoded in TWO places — update in lockstep (Ada SF-5).** The same mapping (`@3fn/core/{blend,build,types,testing,config}` → `./node_modules/@3fn/core/src/*.ts`, 5 entries) is written **twice**: (1) the `init`-written `tsconfig.test.json` `paths` (`init.ts:139-145`), and (2) the preset's `moduleNameMapper` (`jest-preset.ts:53-59`, same 5 entries). These are **two copies of one mapping**. Reconciling the exports map **without updating both** would desync consumers' generated config — and letting the two copies drift is its own hazard. The reconciliation MUST update **both in lockstep** (plus the `jest.config.js` `init` writes, which pulls `@3fn/core/jest-preset`).

The branches differ only in the *target* resolution form (CJS extensionless vs ESM explicit-`.js`); the surfaces to reconcile are identical.

### Increment 3c — Module-Direction Execution (R8) + Close-State Coherence Gate (R5 AC5/AC6)

**Both branches:** apply the committed direction across the relevant surfaces. CI-green-gated; begins only after 3a + 3b green (scope gate, R8 AC2). At no point may 3c leave the system *more* incoherent than before — **certified by the consumer-surface coherence guard being green**, not merely asserted (R8 AC4).

```
                       R4 DECISION (on Inc-2 evidence)
                        /                          \
              CJS-consistency                   Native ESM
                   |                                 |
        3c = finalize CJS+extensionless     cost prohibitive? (judgment, Peter)
        authoring; no "type":"module";          /              \
        executes in-spec, no escape-hatch     NO                YES → ESCAPE-HATCH
                                              |                  |
                                     execute ESM in-spec   defer 3c EXECUTION
                                     (incl. preset migrate) to follow-on spec
                                                            (direction STILL decided in 118)
                                                                  |
                                                       CLOSE-STATE COHERENCE GATE
```

**Static-lint polarity (R10 AC3 — branch-sketched):** the lint *tooling* is built early; the **policy inverts by branch**:
- **CJS branch:** lint **bans** explicit extensions on extensionless/raw-`.ts` relative imports.
- **ESM branch:** lint **REQUIRES** explicit `.js`.
- **Scope (both, R10 AC4):** web source ONLY. iOS-Swift/Android-Kotlin are categorically out (never traverse Node resolution). Build-time validation dynamic imports (`MathematicalConsistencyValidator.ts:330-331` — verified: `await import('../../tokens')`, static-string literals, not web source) resolve via the **runtime mechanism (3a's lane)**, NOT the web static-bundle path → **out of the web-source lint's scope** (Lina SF-3). The dynamic-import portion is **defense-in-depth**, not an active failure mode.

**Close-state coherence gate (the ESM-escape-hatch branch only — R5 AC5/AC6, R3 AC4, R8 AC3/AC4).** The escape-hatch defers *execution*, never the *decision*, and only onto a **guard-certified** coherent intermediate:
- **(a) Sequencing:** the `"type":"module"` flip and anything that would strand a deferred artifact SHALL be **sequenced into the deferred 3c** — never landed before the artifacts they would strand are coherent. The naive "the preset simply stays CJS" is **NOT automatically coherent**: if ESM execution flips `"type":"module"`, a `module.exports` `.js` preset becomes a CJS file inside an ESM-typed package — the same disease in reverse, shipped to consumers. **The `.cjs` preset rename is sequenced HERE (Resolution 4 / E15):** the parking form is **confirmed in Inc-2** (so the escape-hatch decision is evidence-based) but **executed only under the committed direction in 3c** — doing the rename now would act on an assumed ESM commitment before R4 owns the decision (the assume-the-answer failure). This is principled refusal to pre-commit, not deferral-for-convenience.
- **(b) Guard-gated availability:** the escape-hatch is available **only when the shipped-consumer-surface boot/smoke guard (R3 AC4) certifies the close-state is coherent + non-regressing**. This guard — exercising the `@3fn/core/jest-preset` close-state — is the same guard discipline as the Increment-1 consumer-config guard, applied to the shipped preset at the direction-execution boundary. (Timing: this guard is *exercised at the escape-hatch close* — NOT Increment-1 scope.)
- **(c) Parking-form contingency (→ OQ-3):** IF no coherent CJS parking form for the preset exists (per R4 AC6 / OQ-3) THEN the **preset migrates in-spec** — because then there is no coherent close-state without it. **Lina's assessment (recorded):** a coherent CJS parking form **EXISTS** — provided the close-state ships an explicit `.cjs` form (not the current `.js`-in-typeless-package). Evidence: the shipped `dist/testing/jest-preset.js` compiles to pure CJS (`"use strict"`, `__esModule` defineProperty, `module.exports`); an ESM `"type":"module"` flip would strand a `module.exports` `.js`, but **renaming to `jest-preset.cjs` + retargeting the `./jest-preset` `require` condition survives the flip** (`.cjs` is unambiguously CJS regardless of package `"type"`), and the preset is `require`-only so there is no `import` condition to satisfy. **Caveat:** the parking form parks the preset *format* coherently; full coherence still needs 3b (the `moduleNameMapper` raw-`.ts` targets are an R7 concern, not a `"type"`-flip strand). **Net: the defer branch is available; this contingency (c) likely does NOT fire; final confirmation is the Inc-2 ESM-cost inventory + an actual `.cjs`-under-`"type":"module"` boot through the R3 AC4 close-state guard.** Contingency (c) is **retained as a guard** regardless.

**Principle: defer the work, never the coherence.**

### Shipped-consumer-surface close-state guard (R3 AC4) — design

Distinct from the Increment-1 config-load guard. It is a member of the consumer-guard family, exercising the **shipped `@3fn/core/jest-preset` close-state**: a faithful-consumer fixture using the shipped preset (via the `jest.config.js` `init` writes) runs its test setup and **fails loudly** if the preset does not resolve coherently for the consumer. It certifies the escape-hatch close-state per (b) above. Lina owns the test-infra mechanics.

---

## Design Decisions

### Decision 1: Asymmetric depth — full for buildable-now, branch-sketched for direction-gated

**Options:** (a) design every increment to full depth now; (b) design only Increment 1 now, defer the rest; (c) full depth for direction-agnostic pieces, branch-sketches for direction-gated pieces.
**Decision:** (c).
**Rationale:** the CJS-vs-ESM decision is deliberately unmade (R4/R5, made on Inc-2 evidence). Designing 3a/3b/3c/lint-polarity as if the answer were known would smuggle in an assumed answer — the exact failure (assume-the-fix) that produced the April→June→117 cycle. Branch-sketching is the maximum depth the unmade decision permits.
**Trade-offs:** ✅ honest to the conditionality; the gated sections are real design, not stubs (surfaces, mitigations, sequencing all specified). ❌ readers wanting a single resolved end-state won't find one here — by design.
**Counter-argument:** "deciding now would let us design everything fully and move faster." **Response:** speed bought by assuming the answer is exactly how this root cause shipped three times. The Inc-2 evidence gate is cheap relative to a wrong direction committed across exports + the consumer-facing preset.

### Decision 2: Reuse Spec 117's normalization engine for the parity harness; forbid a second engine

**Options:** (a) build a fresh normalization/comparison engine for parity; (b) reuse 117's `Normalizer.normalize()` + `SemanticComparator.compare()` directly via a thin parity orchestrator.
**Decision:** (b).
**Rationale:** I read 117's engine — `Normalizer.normalize()` (`Normalizer.ts:44`) and `SemanticComparator.compare()` (`SemanticComparator.ts:19-29`) are standalone/public, the rule set was explicitly built to be extended, and `compare` is symmetric (so two fresh trees compare correctly even though the field names read `committedValue`/`freshValue`). A *second* normalization engine would itself be an incoherence — the disease this spec treats.
**Seam correction (Ada MF-1):** `GenerationIntegrityCheckImpl` is **NOT** the parity seam — it is **hardwired to committed-vs-fresh** (constructor takes exactly ONE `FreshGenerator` and reads the committed side itself via `readCommitted()`/`fs.readFileSync`, `GenerationIntegrityCheck.ts:37-47,67-69,105-115`), so it cannot ingest two fresh trees. The parity harness instead reuses `normalize`+`compare` **directly**, through a **NEW thin parity orchestrator that bypasses `GenerationIntegrityCheckImpl`**, reading the two fresh roots (ts-node vs tsx scratch dirs) directly. `FreshGenerator`/`DiskFreshGenerator` remains reusable as a per-tree *reader* but is not the two-tree seam. The orchestrator is thin glue, not a second engine — Decision 2's core stands.
**Trade-offs:** ✅ one semantic-equality discipline across the codebase; less surface to maintain. ❌ the parity harness inherits 117's normalization assumptions; the volatile-field set must be extended (rosettaVersion, embedded version, `extensions.themes` array-ordering) — a real but bounded task.
**Counter-argument:** "parity is a different problem (two fresh trees, not committed-vs-fresh) — a purpose-built engine would be cleaner." **Response:** the *difference* lives in the orchestration seam, not the normalize+compare core, which is identical and directly reusable. Cleaner-but-duplicated normalization is the trap. **Honest caveat:** I verified `normalize`/`compare` are standalone and `compare` is symmetric, not an executed two-mechanism parity run — that proof is the Inc-2 deliverable. The orchestrator likely needs only **two roots**, not the `FreshGenerator` abstraction.

### Decision 3: Swap inside `loadConfig`, never via bin hooks; preserve the caller contract by construction

**Options:** (a) register a TS loader at the `bin` entry; (b) replace the `await import()` inside `loadConfig`.
**Decision:** (b) (also mandated by R2 AC5).
**Rationale:** the locus is a single statement (`ConfigLoader.ts:59`) that every config-load path funnels through; swapping there preserves all five verified callers by construction and removes the ambient-loader coupling (R2 AC1). Bin hooks perpetuate the ambient-loader disease and don't cover the `scripts/generate-platform-tokens.ts` path that imports `loadConfig` directly.
**Trade-offs:** ✅ minimal blast radius; ambient coupling removed. ❌ the loader must carry its own resolution within a CJS context — the open empirical question (OQ-1).
**Counter-argument:** "registering tsx/esm at bin is one line and known to work (option D in the diagnosis)." **Response:** option D works *via a global ambient hook* — it perpetuates the exact coupling R2 AC1 exists to remove, and leaves the script-direct caller uncovered.

### Decision 4: Loader selection — "no ambient/global residue" is a first-class accept-criterion; B preferred when it passes; jiti the budgeted fallback

**Options:** (a) commit to tsx `tsImport` in requirements/design; (b) keep A first by familiarity and record B's no-residue advantage as a finding; (c) present A/B/C with an empirical decision procedure whose accept-criteria include "leaves no ambient/global residue," and **prefer B when both A and B pass**.
**Decision:** (c) (Resolution 3 / E14 — this **corrects** the prior (b) framing, which let familiarity decide and relegated the spec's coherence value to documentation).
**Rationale:** the decision procedure's accept-criteria SHALL include **"leaves no ambient/global residue after the call"** as a first-class criterion alongside (a) matrix rows green, (b) both CJS- and ESM-authored configs, (c) CJS-context correctness (OQ-1), (d) contract-preserving. Consequence: when **both A and B pass, PREFER B** — `tsImport` self-scopes (`register({namespace: Date.now()})` per call) and auto-tears-down, leaving no global residue, and it is **zero-new-dependency** (`tsImport` ships in the tsx already present), so "familiar" was never a real tiebreaker. **A wins only if B fails the CJS-boundary test (OQ-1)** — and A then carries its `unregister()` lifecycle (it mutates `module._resolveFilename` globally; the namespace only scopes requests) plus the bin-coexistence, both certified by the subprocess guard. This encodes the spec's coherence value into the *selection*, instead of letting familiarity decide and documenting our regret. **jiti** (verified NOT installed) remains the named, budgeted fallback if both A and B fail — naming it acknowledges materiality without picking it.
**Trade-offs:** ✅ the coherence value is in the choice, not a footnote; the criterion is testable. ❌ leaves the loader unpicked until Inc-1 execution — correct, but a reader wanting a name won't get one yet. (Order-of-trying is operationally minor; the *criteria* are the substance.)
**Counter-argument:** "just keep A first — it's the native CJS API and familiar." **Response:** familiarity is not an accept-criterion; A still mutates global state and needs a mandatory `unregister()`, whereas B leaves no residue at equal dependency cost. Letting familiarity decide is exactly how the coherence value gets documented-as-regret instead of chosen.

### Decision 5: The escape-hatch defers execution onto a guard-certified close-state, never an assumed one

**Options:** (a) escape-hatch lets ESM execution defer onto "the preset stays CJS" assumed-coherent; (b) defer only onto a consumer-surface-guard-certified coherent close-state, with the `"type":"module"` flip sequenced into the deferred work.
**Decision:** (b) (Peter's "defer the work, never the coherence" ruling).
**Rationale:** "the preset simply stays CJS" is not automatically coherent — an ESM `"type":"module"` flip strands a `module.exports` `.js` preset as a CJS file in an ESM-typed package: the same disease in reverse, shipped to consumers. The only safe deferral is onto a state a guard certifies.
**Trade-offs:** ✅ the spec can close without holding open on a test-suite migration, AND without shipping incoherence. ❌ if no CJS parking form exists (OQ-3), the preset migrates in-spec — the escape-hatch may not actually relieve the costliest piece.
**Counter-argument:** "the guard is ceremony; staying CJS is obviously fine." **Response:** "obviously fine" assumed-coherence is precisely the failure mode; the guard converts an assumption into a certification, cheaply.

### Decision 6: Single owner for the bundled-subsystem (MCP + browser) guard — Requirement 12

**Options:** (a) R10 builds the browser guard, R12 builds the MCP guard; (b) R12 owns both; R10 references.
**Decision:** (b) (Lina SF-2).
**Rationale:** the browser bundle and MCP servers are exempt on the *same* principle (bundling resolves at build time); their boot/smoke guard is one guard family. Splitting ownership risks double-building or gapping it.
**Trade-offs:** ✅ built once, complete-by-reference. ❌ R10's guard set is complete only by cross-reference, not self-contained — acceptable and explicit.

---

## Validation Strategy

Tiers per requirement (from requirements.md), with how each is demonstrated:

| Requirement | Tier | Demonstrated by |
|-------------|------|-----------------|
| R1 contract | Tier 3 | conjunction of R2–R11 passing |
| R2 loader | Tier 3 | the failing resolution matrix (source-dir + faithful-consumer rows) goes green for BOTH CJS- and ESM-authored configs, swapped inside `loadConfig`; all 5 callers still function |
| R3 consumer guard | Tier 2 | **non-skippable required CI** guard runs the **subprocess/bin path** (pack→install→`npx designerpunk generate`), loading ESM- and CJS-authored faithful consumer configs (real `export default` / real `require()`, transitive raw-`.ts` `./my-overrides`), **positive-asserting a sentinel value only the transitive override produces** (not merely "not DEFAULTS"); fails loud on resolution break. An in-process `loadConfig` under ts-jest is explicitly forbidden (jest intercepts `import`, masking the resolver → false-green). (AC4 close-state guard exercised at escape-hatch) |
| R4 evidence | Tier 3 | green/red table produced; volatile-field set enumerated from real output; export-condition + ESM-cost inventories complete; divergence hypothesis dispositioned (plausible/refuted) |
| R5 decision | Tier 3 | exactly one direction committed on the evidence, documented (R9); escape-hatch (if taken) gated on the close-state guard |
| R6 3a runtime | Tier 2 | one mechanism; CI-green before 3b; typecheck mitigation confirms `tsc`/dedicated step covers `scripts/**` + fed artifacts |
| R7 3b exports | Tier 2 | raw-`.ts` subpaths reconciled (require+import); `init`'s consumer `paths` updated in lockstep; CI-green before 3c; 117 exports path certifies |
| R8 3c direction | Tier 2 | committed direction applied; close-state guard green; never more incoherent (certified, not asserted) |
| R9 governance | Tier 2 | contract codified in steering via **ballot measure**; direction + deferred-cost documented; MCP docs index rebuilt |
| R10 guards | Tier 2 | dynamic-import smoke (preventive) + browser guard (via R12) land early; lint tooling early, polarity set post-decision; web-source-only scope |
| R11 117 closeout | Tier 2 | guidance note written into 117's dir as an acceptance criterion; supersedes decision-record item 3; advises 117 Task 5.3 re-run |
| R12 MCP/browser | Tier 2 | exemption documented as a boundary; paired boot/smoke guard on MCP + browser bundles; ts-node dev configs documented exception |

**Guard tests follow Test-Development-Standards** (preventive/standing, repeatable). The parity harness reuses 117's tested `Normalizer`/`SemanticComparator`; new normalization rules are individually unit-tested (a changed `rosettaVersion` is ignored; a changed token value is not) — the same discipline as 117's normalization unit tests.

---

## Open Empirical Questions

These are carried as design-time investigations **with decision procedures**, not resolved by fiat. Each names the increment that resolves it.

### OQ-1 — Does `tsImport` resolve correctly across the CJS-host/ESM-loader boundary in `loadConfig`?

- **Reframed (Ada SF-1) — `parentURL` construction is NOT the risk.** `tsImport`'s second arg is explicitly a `parentURL` string (verified `node_modules/tsx/dist/esm/api/index.mjs`), and `__filename` exists in CJS, so `pathToFileURL(__filename).href` satisfies it cleanly. `tsImport` also **self-scopes** (internally `register({namespace: Date.now()})` per call, leaving no persistent global hook). The **genuine residual risk** is the **CJS-host/ESM-loader boundary**: whether dynamic `import()` inside an ESM-loader-registered hook resolves correctly when the host module (`loadConfig`) is **CJS**, and whether the config's **transitive relative raw-`.ts` requires** get the resolution they need. Tasks MUST test THAT, not parentURL construction.
- **Decision procedure:** the accept-criteria procedure in § Increment 1. Accept an approach that turns the matrix green for both CJS- and ESM-authored configs in `loadConfig`'s CJS context **and leaves no ambient/global residue**; prefer B when it passes. If B fails the CJS-boundary test, A wins (with its `unregister()` lifecycle); if both fail, C (jiti) with a budgeted new dependency.
- **Resolved in:** Increment 1.
- **✅ RESOLVED (Task 1, 2026-06-24 — see `findings/loader-selection.md`):** the CJS-host/ESM-loader boundary risk was **real**. `tsImport` from `loadConfig`'s CJS host **failed** all four matrix rows (both authoring directions) with the same bug-class errors as baseline — it did NOT resolve the config's transitive relative raw-`.ts` imports, and it left global residue (drops its teardown handle). The "prefer B / self-scopes / no residue" expectation did NOT hold from CJS. **Approach A** (`tsx/cjs/api` `register({namespace})` + scoped synchronous `require` + mandatory `unregister()`) turned all four rows green and satisfied all five accept-criteria. jiti not needed. The spec's "A wins only if B fails the CJS-boundary test" branch is the path taken.

### OQ-2 — The complete volatile-field set for parity normalization

- **Why open:** R4 AC4 mandates an *open, evidence-driven* set enumerated from actual output, not a closed list. The seed set (timestamps, `generatedAt`, `rosettaVersion`, embedded `version`, `Generated:` headers, `duration`, key ordering) is verified from the generators, but completeness is provable only against real two-mechanism output.
- **Decision procedure:** during harness construction, generate via both mechanisms, diff the normalized trees, and add any *non-semantic* divergence to the rule set; re-run until only semantic divergences remain. Each added rule gets a unit test (neutralizes the intended field and nothing else).
- **Resolved in:** Increment 2 (harness construction).

### OQ-3 — Does a coherent CJS "parking form" for the jest-preset exist?

- **Why open:** decides defer-vs-migrate under the escape-hatch (R5 AC5/AC6). The preset is `require`-only/CJS and its `moduleNameMapper` maps to raw `.ts` — coupling it to R7.
- **Lina's assessment (recorded — leans YES):** a coherent CJS parking form **EXISTS**. The shipped `dist/testing/jest-preset.js` compiles to pure CJS (`"use strict"`, `__esModule` defineProperty, `module.exports`); an ESM `"type":"module"` flip would strand a `module.exports` `.js`, but **renaming to `jest-preset.cjs` + retargeting the `./jest-preset` `require` condition survives the flip** (`.cjs` is unambiguously CJS regardless of package `"type"`), and the preset is `require`-only so there's no `import` condition to satisfy. **Caveat:** this parks the preset *format* coherently; full coherence still needs 3b (the `moduleNameMapper` raw-`.ts` targets are an R7 concern, not a `"type"`-flip strand). Net: the defer branch is available and contingency (c) likely does NOT fire.
- **Decision procedure:** in the Inc-2 ESM-cost inventory, confirm whether the explicit `.cjs` / `require`-only preset form survives an ESM `"type":"module"` flip without being stranded — **final confirmation is an actual `.cjs`-under-`"type":"module"` boot through the R3 AC4 close-state guard**. IF yes → defer is available (gated on the close-state guard). IF no → the preset migrates in-spec. Contingency (c) is retained as a guard regardless.
- **Resolved in:** Increment 2 (informs R5 decision; the `.cjs` rename is **confirmed in Inc-2 but executed only under the committed direction in 3c** — Resolution 4 / E15).

---

## Requirements Traceability

| Design section | Requirement(s) |
|----------------|----------------|
| Increment 1 — loader replacement, candidate table, decision procedure, swap, fail-loud | R2 (AC1–8) |
| Increment 1 — consumer-config boot/smoke guard | R3 AC1–3 |
| Increment 2 — 117-engine reuse, parity harness | R4 AC1, AC3 |
| Increment 2 — volatile-field normalization set | R4 AC4 (OQ-2) |
| Increment 2 — entry-point inventory | R4 AC2 |
| Increment 2 — exports/export-condition inventory | R4 AC5 |
| Increment 2 — ESM-cost incl. jest-preset blast radius + parking form | R4 AC6 (OQ-3) |
| Increment 2 — divergence-hypothesis test | R4 AC7 |
| Increment 2 — green/red evidence table | R4 AC8 |
| Dynamic-import smoke test | R10 AC2a |
| Browser-bundle guard (by reference) | R10 AC2b → R12 AC2 |
| Static-lint tooling early / polarity deferred | R10 AC3 |
| Spec 117 closeout note | R11 (AC1–5) |
| MCP/browser exemption + paired guard + ts-node dev exception | R12 (AC1–4) |
| 3a runtime branch sketch + typecheck mitigation + pin | R6 (AC1–5) |
| 3b exports branch sketch + consumer `paths` reconciliation | R7 (AC1–4) |
| 3c direction execution + escape-hatch + lint polarity | R8 (AC1–4) |
| Close-state coherence gate + shipped-preset close-state guard | R5 AC5/AC6, R3 AC4 |
| Module-direction decision point | R5 AC1–4 |
| Governance codification (ballot measure) | R9 (AC1–5) |
| Validation Strategy | all (tiers per requirement) |
| Design Decisions 1–6 | cross-cutting (conditionality, engine reuse, swap locus, loader pick, escape-hatch, guard ownership) |

---

*Design draft — Ada/Lina design review incorporated (2026-06-24). Full-depth for the buildable-now, ships-first pieces (Increment 1 loader + consumer guard, the Increment-2 evidence harness, the early direction-agnostic guards, the 117 closeout, the MCP/browser exception); structural/branch-sketched for the direction-gated pieces (3a/3b/3c, static-lint polarity, close-state coherence gate) because the CJS-vs-ESM decision is made on Increment-2 evidence, in-spec, not assumed. Three empirical open questions (OQ-1 CJS-host/ESM-loader boundary; OQ-2 volatile-field set; OQ-3 preset parking form) carry decision procedures, not fiat answers. Ada (loader/parity/exports mechanics) and Lina (component lint, jest-preset/test-infra, browser/MCP guard) design review incorporated; ready for tasks.*
