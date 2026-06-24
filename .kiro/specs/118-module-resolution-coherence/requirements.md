# Requirements Document: Module-Resolution Coherence

**Date**: 2026-06-24
**Spec**: 118 - Module-Resolution Coherence
**Status**: Requirements draft — whole-spec scope; Ada/Lina R2 incorporated (2026-06-24)
**Leads**: Thurgood (diagnosis, formalization, verification, governance contract); Ada (runtime loader + pipeline mechanics, Rosetta); Lina (component static guard + test-infra alignment, Stemma)
**Source outline**: `.kiro/specs/118-module-resolution-coherence/design-outline.md`
**Dependencies / relationships**:
- Spec 117 (Token-Index Generation Integrity) — Increment 1 is 117's genuine prerequisite; 117's restored trust is scoped narrowly to the config-load path. See Requirement 11 (117 closeout) and § "Relationship to Spec 117" in the outline.
- Specs 122 (Agent Generator) and 123 (Consumer Distribution) — direction-gated on this spec's module-direction decision point. They cannot formalize until Requirement 4 (direction decision) lands.

---

## Introduction

The recurring `.ts`-extension churn (April → June → 117 Finding 2) is the *symptom* of a system that resolves modules **incoherently across its surfaces** — config load, runtime TS execution, package exports, and authoring direction each behave differently, with no enforcement to keep them aligned. The same root cause has been diagnosed three times and "resolved" twice via workarounds that silently regressed.

This spec restores **module-resolution coherence** holistically. Per the project philosophy "Vision Unbound — make the system WHOLE, not patched," it does not point-fix the config-load failure in isolation; it defines a single coherent module-resolution contract for the entire system and delivers toward it in independently-coherent, CI-green-gated increments.

### Scope of This Document

These requirements cover the **WHOLE contract and ALL increments**, not just the first. **Increment 1 (the config-load primitive) is the keystone that ships independently first**, but capturing only Increment 1 would itself be a form of the patchwork this spec exists to end. The North Star rationale (the 6-point end-state contract) lives in the outline's "North Star — Blue-Sky End State"; Requirement 1 here restates that contract as the overarching requirement the increments collectively satisfy.

### Key Principles

1. **Vision unbound / delivery risk-aware.** The holistic end-state is defined up front (Requirement 1); execution is incremental and guard-gated. Incremental ≠ patchwork. (OKLCH is the precedent: a holistic goal still derails without coherent, risk-aware delivery.)
2. **Two gate types.** An **evidence gate** (no swap before proof — Requirement 3) AND a **scope gate** (per-surface 3a→3b→3c sequencing, each CI-green before the next — Requirements 6–8). Both must hold; the Inc-2 evidence gate guards the *swap*, the scope gate guards the *scope* (OKLCH derailed by expansion, not blind swapping).
3. **Direction decided on evidence, in-spec, not assumed.** The CJS-vs-ESM commitment is a decision this spec *makes* on Increment-2 evidence (Requirement 4). It is NOT pre-made. Requirements downstream of the decision are written conditionally or direction-agnostically; no requirement smuggles in an assumed answer. See § "Conditional & Escape-Hatch Notes."
4. **Investigation-first for consolidation.** No runtime mechanism swap, no exports reconciliation, and no module-direction execution occurs before Increment 2 produces the green/red evidence table and the direction is committed.
5. **Behavioral, not implementational.** Requirements state WHAT must be true, not WHICH library. Loader selection (e.g., tsx `tsImport` vs jiti) and the divergence hypothesis are confirmed empirically in design/evidence, not assumed here.

### Empirically-Confirmed Diagnosis (carried from the outline, code-verified)

The config-load failure is a three-condition conjunction: `await import()` of a `.ts` config (`ConfigLoader.ts:59`) + no `"type":"module"` in `package.json` (Node detects ESM syntax → reparses the config as an ES module, `MODULE_TYPELESS_PACKAGE_JSON`) + only the CJS hook registered → the config's transitive relative TS imports hit Node's strict-ESM resolver (explicit extensions required, directory imports forbidden). The experiment matrix's faithful-consumer row (compiled import + relative raw-`.ts` `./my-overrides`) currently fails with `Cannot find module`. These are the rows Increment 1 must turn green.

---

## Requirements

### Requirement 1: The Module-Resolution Contract (North Star End-State)

**User Story**: As the system's maintainer and as a consumer of `@3fn/core`, I want one module-resolution contract governing every runtime entry point, package export, and TS execution path — consumer and internal alike — so that modules resolve coherently everywhere, with no deferred corners and no permanent open forks.

This is the overarching requirement the increments (Requirements 2–11) collectively satisfy. It is stated as the end-state; the increments are its staged, gated realization.

#### Acceptance Criteria

1. The system SHALL have **one runtime TS-execution mechanism**, not two. (Today: tsx for `bin`, ts-node for scripts — itself patchwork. Verified: `bin/designerpunk.js` registers `tsx/cjs/api`; `package.json` scripts `generate:types`, `generate:platform-tokens`, `extract:meta`, `release:*`, `build:validate` invoke `ts-node`.)
2. The system SHALL have **one config-load primitive** that carries its own TS-aware resolution and assumes NO ambient loader is registered elsewhere.
3. Package exports SHALL resolve **coherently at runtime** — no export resolves the same package inconsistently (today `./config`→`dist`, while `./blend`/`./build`/`./types`→raw `.ts`).
4. The system SHALL have a **committed module-system direction** (CJS-consistency or native ESM), decided on evidence, with no permanently-dangling fork. The one fixed fact — consumers author `.ts` configs loaded at runtime, so a TS-aware runtime loader is **permanent** — SHALL be accommodated by whichever direction is committed.
5. The contract SHALL be enforced so it cannot silently erode: runtime boot/smoke guards at every non-exempt entry point, plus a static lint guard for statically-bundled web source.
6. The contract SHALL be codified in steering as the system's law, with the module-direction decision (and, if any execution is deferred, its triggers and inventoried cost) documented — not folk knowledge.
7. The contract SHALL NOT rest in an incoherent intermediate state at any increment boundary; the committed direction's *execution* MAY be staged (see Requirement 8 and the escape-hatch), but the direction itself SHALL be decided within this spec.

**Validation Tier**: Tier 3 (Comprehensive) — this is the spec's defining contract; satisfaction is demonstrated by the conjunction of Requirements 2–11 passing.

---

### Requirement 2: Increment 1 — Config-Load Primitive (Keystone, Ships Independently)

**User Story**: As a consumer authoring a `designerpunk.config.ts` that imports its own relative `.ts` overrides, I want `loadConfig` to resolve my config and its transitive relative raw-`.ts` imports without relying on any ambient loader, so that the documented theme-override workflow works.

#### Acceptance Criteria

1. WHEN `loadConfig` loads a consumer config THEN it SHALL use a TS-aware loader that **carries its own resolution** and SHALL NOT assume any ambient TS loader is registered elsewhere (replacing the raw `await import(configPath)` at `ConfigLoader.ts:59`).
2. WHEN the loaded config transitively imports relative raw-`.ts` modules (the faithful-consumer matrix row: compiled import + relative `./my-overrides`) THEN those imports SHALL resolve successfully — the currently-failing Diagnosis-matrix rows (source-directory import, faithful-consumer import) SHALL go green.
3. The new loader SHALL operate correctly in `loadConfig`'s **CommonJS execution context** (`__dirname`, no `import.meta` — verified at `ConfigLoader.ts:78`). The chosen loader's CJS-context ergonomics SHALL be **confirmed empirically in design/tasks**, not assumed (note: `tsImport` is exported from `tsx/esm/api`, not `tsx/cjs/api` — its behavior inside this CJS context is an open empirical question, not a settled fact). IF `tsImport` fails the CJS-context test THEN **jiti is the named fallback**, and SHALL be budgeted as a **NEW dependency** (verified NOT currently installed) — naming the fallback acknowledges that the forward-compatibility HARD requirement (AC 4) combined with the empirically-uncertain primary loader makes the fallback's existence material; it does NOT pick the library in requirements.
4. **Forward-compatibility is a HARD requirement.** The loader SHALL resolve the consumer config whether it is authored CJS **or** ESM, so that Increment 1 does NOT prejudge the Requirement 4 direction decision. Validation SHALL include both an ESM-authored and a CJS-authored config.
5. Increment 1 SHALL be validated by swapping the loader **inside `loadConfig`** and re-running the resolution matrix — NOT by adding hooks to the `bin` entry point.
6. Increment 1 SHALL be independently shippable and CI-green-gated on its own, without depending on any later increment.
7. Increment 1's scope SHALL be defined by **config-loader correctness**, never by "what minimally expedites Spec 117." (The 117 unblock is a natural consequence — see Requirement 11 — not a scope driver.)
8. All known direct callers of `loadConfig` SHALL continue to function after the swap. (Verified caller inventory: `src/cli/designerpunk.ts` (generate, validate paths), `src/cli/validate.ts`, `src/cli/validateProductTokens.ts`, `scripts/generate-platform-tokens.ts`, re-exported via `src/config/index.ts`. `generateTokenFiles` consumes the *resolved* config object and is not itself a `loadConfig` caller. `ReleasePipeline.ts`'s private `loadConfig` is a name-collision that reads `release-config.json` via `JSON.parse` and is NOT a caller.)

**Validation Tier**: Tier 3 (Comprehensive) — customer-facing primitive; the failing matrix is the empirical acceptance evidence.

---

### Requirement 3: Increment 1 — Consumer-Config Boot/Smoke Guard

**User Story**: As a maintainer, I want a boot/smoke guard that exercises the consumer-config load path, so that this root cause cannot regress silently a fourth time (the April→June→117 cycle).

#### Acceptance Criteria

1. WHEN the guard runs in CI THEN it SHALL load a faithful consumer config (compiled import + relative raw-`.ts` import) through `loadConfig` and SHALL fail if resolution breaks.
2. The guard SHALL be **preventive and standing** — runnable repeatably, not a one-time check.
3. The guard SHALL cover both an ESM-authored and a CJS-authored consumer config (consistent with Requirement 2 AC 4), so the guard does not silently assume a direction.
4. **Shipped-consumer-surface close-state guard.** Beyond the Increment-1 config-load guard (AC 1–3), a **shipped-consumer-surface boot/smoke guard** — exercising the `@3fn/core/jest-preset` close-state — SHALL exist as part of this consumer-facing guard family: preventive, certifying that the shipped surface resolves coherently for a faithful consumer. The **escape-hatch (Requirement 5 AC 6, Requirement 8) is conditioned on this guard being green at the intermediate state.** This is the same guard discipline as the Increment-1 consumer-config guard, applied to the shipped preset at the direction-execution boundary. (Timing distinction: the Increment-1 config-load guard lands *in Increment 1*; this shipped-preset close-state guard is *exercised at the escape-hatch close* — it is NOT Increment-1 scope.)

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 4: Increment 2 — Evidence (Investigation-First, NO Swaps)

**User Story**: As the maintainer making the module-direction commitment, I want a complete inventory and a normalized parity harness across the runtime TS surfaces before any swap, so that the direction decision rests on evidence rather than assumption, and so that no swap precedes proof (the evidence gate).

#### Acceptance Criteria

1. Increment 2 SHALL perform **investigation only** — it SHALL NOT swap any runtime mechanism, reconcile any export, or migrate any module direction. No fix SHALL be applied during Increment 2.
2. The investigation SHALL inventory **every runtime TS entry point**: `bin` (tsx/cjs), scripts (ts-node), the three MCP servers (esbuild-bundled: application, docs, product), the browser bundle (esbuild/`build-browser-bundles.js`), and tests (ts-jest). (Verified present in `package.json`.)
3. The investigation SHALL build a **parity harness** comparing the two runtime mechanisms (ts-node vs tsx) on representative generation output.
4. The parity comparison SHALL use **normalized semantic-equality** — it SHALL normalize or exclude **all generation-volatile fields**, an **open, evidence-driven set — not a closed list**. At minimum this SHALL include: timestamps; embedded version / `rosettaVersion` fields (`DTCGFormatGenerator.ts:226-236`); in-file `Generated:` header comments in the platform token files (`TokenFileGenerator.ts:301,376,455`); build-timing / `duration` fields; and key ordering. The complete set SHALL be **enumerated from actual generator output during harness construction, NOT assumed closed.** (Note: the token-index YAML output itself is already clean — `generateTokenIndex.ts:173-187` — and does not contribute volatile fields.) A raw byte-diff SHALL NOT be the criterion (DTCG/token-index outputs carry generation timestamps + ordering; a byte-diff would never go green, making the gate a false-blocker or a rubber-stamp). This is the same semantic-equality discipline Spec 117's integrity verification adopted.
5. The investigation SHALL inventory **runtime consumers of the raw-`.ts` exports** (`./blend`, `./build`, `./types` — verified to resolve to raw `.ts` in the `package.json` exports map) to confirm or refute live consumer exposure (the "second instance" hazard, resolved in Requirement 7 regardless). The inventory SHALL cover **all export conditions, including the `import`-only / `require`-only asymmetry** (verified: `.` and `./components` resolve `import`-only with no `require` condition; `./jest-preset` resolves `require`-only; `./testing` resolves both) — not only the three raw-`.ts` subpaths. A `require` of `@3fn/core` resolving nothing today is itself a coherence question, carried into Requirement 7.
6. The investigation SHALL inventory **ESM-migration cost**, explicitly **including the shipped `@3fn/core/jest-preset` consumer blast radius**. (Verified: `./jest-preset` exports `dist/testing/jest-preset.js` as `require`-only/CJS, shipped to product consumers per Spec 105 — an ESM flip propagates to every consuming product's test setup.) Additionally: (a) the shipped preset's `moduleNameMapper` rewrites `@3fn/core/*` to **raw `.ts` source** (`src/testing/jest-preset.ts:50-58`), so the preset is **coupled to the Requirement 7 exports reconciliation** — the ESM-cost inventory SHALL name these raw-`.ts` mapping entries and SHALL NOT treat the preset as a one-line `testEnvironment` flip; (b) the inventory SHALL **determine whether a coherent CJS "parking form" for the preset exists** (e.g. an explicit `.cjs` / `require`-only form, with no premature `"type":"module"` flip that would strand it) — because that fact decides defer-vs-migrate under the escape-hatch (see Requirement 5 AC 5/AC 6).
7. The investigation SHALL test the **resolution-divergence hypothesis** that `token-index-generation-gaps` / `blendutilities-not-generated` correlate with resolution divergence. The hypothesis SHALL be **falsifiable and bounded**: IF disproven, the generation-gap work SHALL exit Spec 118's scope cleanly (it is not absorbed). The harness establishes **correlation, not causation**: "confirmed" SHALL mean "resolution divergence is a *plausible contributor* → escalate to root-cause," NOT "proven cause"; "disproven" → clean exit as already stated.
8. Increment 2 SHALL produce a **green/red evidence table** that informs — but does not pre-decide — the Requirement 4 direction decision.

> **Ownership note:** Ada owns confirmation of the resolution-divergence hypothesis via the Increment-2 parity harness (Resolved Decision 1).

**Validation Tier**: Tier 3 (Comprehensive) — the evidence gate; its output gates every subsequent increment.

---

### Requirement 5: Module-Direction Decision Point (Evidence-Informed Commitment)

**User Story**: As the maintainer, I want the spec to commit to ONE module-system direction (CJS-consistency or native ESM) on the Increment-2 evidence, so that the system has no permanently-dangling fork while never being forced into a premature or unfunded migration.

#### Acceptance Criteria

1. WHEN the Increment-2 evidence table is complete THEN the spec SHALL **commit to exactly one direction** (CJS-consistency or native ESM). The direction SHALL NOT be left undecided.
2. The commitment SHALL be made **on the evidence** (including the jest-preset blast radius), not pre-assumed; this requirements document SHALL NOT presuppose either answer.
3. Whichever direction is committed, the end-state SHALL satisfy the Requirement 1 contract, and the **runtime TS-config loader SHALL persist** (the anchor fact: consumers author `.ts` configs loaded at runtime, regardless of direction).
4. The committed direction and its rationale SHALL be documented (see Requirement 9).
5. **Fork escape-hatch.** IF native ESM is committed AND the Increment-2 cost (especially the consumer-facing jest-preset blast radius) is prohibitive THEN the **ESM consolidation EXECUTION (Increment 3c, ESM variant) — INCLUDING the preset migration — MAY spin into a dedicated follow-on spec** — but the *direction* SHALL still be decided within Spec 118, and Spec 118 SHALL close on a coherent intermediate state rather than be held open indefinitely by a test-suite migration. The escape-hatch defers *execution*, never the *decision* — and defers it ONLY onto a close-state that is **verifiably coherent and non-regressing for consumers.** The naive "the preset simply stays CJS" is NOT automatically coherent: if ESM execution flips `"type":"module"`, a `module.exports` `.js` preset becomes a CJS file inside an ESM-typed package — the same disease in reverse, shipped to consumers.
6. **Close-state coherence gate.** (a) The `"type":"module"` flip and anything that would strand a deferred artifact SHALL be **sequenced into the deferred Increment 3c** — never landed before the artifacts they would strand are coherent (scope-gate discipline applied to the consumer surface). (b) The escape-hatch is **available only when a consumer-surface boot/smoke guard certifies the close-state is coherent + non-regressing** (the guard added in Requirement 3 AC 4). (c) IF no coherent CJS parking form for the preset exists (per Requirement 4 AC 6) THEN the **preset migrates in-spec** — because then there is no coherent close-state without it. Principle: **defer the work, never the coherence.**

**Validation Tier**: Tier 3 (Comprehensive) — this is the decision that unblocks Specs 122/123.

---

### Requirement 6: Increment 3a — Runtime Mechanism Unification (Scope-Gated)

**User Story**: As a maintainer, I want one runtime TS-execution mechanism across all non-bundled runtime TS, so that the system stops resolving the same code two different ways.

#### Acceptance Criteria

1. WHEN Increment 3a runs THEN the system SHALL unify on **one runtime TS-execution mechanism** for non-bundled runtime TS, eliminating the tsx/ts-node split.
2. Increment 3a SHALL be **CI-green before** Increment 3b begins (scope gate — per-surface sequencing; not one big move).
3. **Typecheck-gate-loss mitigation (named, mandatory).** ts-node full-typechecks the scripts it runs today; tsx never typechecks. BEFORE swapping the loader that `generate:types` (and the `prebuild` chain it feeds) relies on, the spec SHALL confirm that `tsc` independently gates everything `generate:types` feeds — it SHALL NOT rely on the implicit ts-node typecheck being silently removed. **Mitigation location is sharper than "the fed output":** `tsc` covers the generated *output* (`src/types/generated/TokenTypes.ts`, which lives in `src/`) but **NOT the generator scripts** — `tsconfig.json` `include: ["src/**/*"]` **excludes `scripts/**`**, and ts-node (run without `transpileOnly`) is presently the ONLY thing typechecking those scripts. Swapping ts-node→tsx therefore **silently drops typechecking of `scripts/**`** unless a `scripts/`-covering typecheck step is added. The mitigation SHALL confirm that `tsc` (or a dedicated step) covers **both** the fed artifacts **and** the `scripts/**` generators that ts-node typechecks today.
4. **[CONDITIONAL on Requirement 4 — CJS direction]** IF CJS-consistency is committed THEN Increment 3a SHALL standardize on `tsx`, retire `ts-node`, and **pin tsx tighter than `^4.21.0`** to mitigate concentration risk (tsx becoming the single runtime TS executor; current pin verified at `package.json` `"tsx": "^4.21.0"`). Retiring ts-node also removes the only *second* TS runtime — no fallback executor remains — which further strengthens the case for a tight tsx pin and a pin-bump review gate.
5. **[CONDITIONAL on Requirement 4 — ESM direction]** IF native ESM is committed THEN the runtime mechanism SHALL be the one the ESM end-state requires; the specific mechanism SHALL be determined by the committed direction, consistent with the persistent TS-config loader (AC for the unifying mechanism are direction-conditional and finalized in design once the decision is made).

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 7: Increment 3b — Package Exports Reconciliation (Scope-Gated)

**User Story**: As a runtime consumer of `@3fn/core` exports outside the bundle, I want every export to resolve coherently at runtime, so that the package stops resolving itself inconsistently.

#### Acceptance Criteria

1. WHEN Increment 3b runs THEN `./blend`, `./build`, and `./types` SHALL be reconciled to coherent runtime resolution (verified today to point at raw `.ts`: `./blend`→`src/blend/index.ts`, `./build`→`src/build/tokens/index.ts`, `./types`→`src/types/index.ts`), closing the second-instance hazard.
2. Increment 3b SHALL be **CI-green before** Increment 3c begins (scope gate).
3. Increment 3b is **where Spec 117's exports path finally certifies**. Until Increment 3b lands, the raw-`.ts` exports path SHALL remain unverified (117's restored trust is scoped to the config-load path only — see Requirement 11).
4. The reconciliation SHALL account for self-reference exports (`@3fn/core/{blend,build,config}`) resolving under the unified runtime mechanism (both `require` and `import` resolution paths), and SHALL confirm how aliases resolve at runtime today (tsconfig `paths` vs the exports map — tsx/esbuild do not honor tsconfig `paths` by default; this SHALL be confirmed in design/evidence). The reconciliation SHALL also account for the **consumer-side tsconfig `paths`** that `init` generates (`src/cli/init.ts:140-144`, mapping `@3fn/core/*` into `./node_modules/@3fn/core/src/*.ts`) — reconciling the exports map without updating what `init` writes would desync consumers' generated config.

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 8: Increment 3c — Module-Direction Execution (Scope-Gated, Escape-Hatch Candidate)

**User Story**: As a maintainer, I want the committed module direction applied across the system, so that the authoring direction is coherent and enforced rather than undecided.

#### Acceptance Criteria

1. WHEN Increment 3c runs THEN the **committed direction (from Requirement 4)** SHALL be applied across the relevant surfaces.
2. Increment 3c SHALL be **CI-green-gated** and SHALL begin only after Increments 3a and 3b are green (scope gate).
3. **[CONDITIONAL — ESM direction = escape-hatch candidate]** IF native ESM is committed AND its execution cost is prohibitive THEN Increment 3c's execution MAY be deferred into a dedicated follow-on spec (per Requirement 5 AC 5), with the deferral's triggers and inventoried cost documented (Requirement 9). Deferral of 3c execution is permitted **only onto a close-state passing the consumer-surface coherence guard (Requirement 5 AC 6 / Requirement 3 AC 4)**, with the `"type":"module"` flip and any other stranding change **sequenced into the deferred work** so that no shipped artifact (e.g. the jest-preset) is stranded. In that case Spec 118 SHALL close on a coherent intermediate state.
4. At no point SHALL Increment 3c (executed or deferred) leave the system in a *more* incoherent state than before it began — and this SHALL be **certified by the consumer-surface coherence guard (Requirement 5 AC 6 / Requirement 3 AC 4) being green** at the close-state, not merely asserted.

**Validation Tier**: Tier 2 (Standard) — direction-conditional; precise criteria finalize after Requirement 4.

---

### Requirement 9: Governance — Contract Codified in Steering

**User Story**: As a future maintainer or agent, I want the module-resolution contract codified as the system's law and the direction decision documented, so that resolution behavior is discoverable and not re-derived or re-regressed.

#### Acceptance Criteria

1. WHEN the contract is settled THEN it SHALL be codified in steering documentation as the system's module-resolution law, **via the ballot-measure process** (proposed for Peter's approval; agents do not edit steering directly).
2. The **committed module-direction decision** and its rationale SHALL be documented.
3. IF any execution is deferred (the escape-hatch) THEN its **triggers and inventoried cost** SHALL be documented — not left as folk knowledge.
4. **Process guard (Civitas).** Governance SHALL codify that an issue cannot close as "Resolved" via workaround-only, and that **Spec 118 is the single source of truth for module resolution** (the issue points here; downstream readers are routed here).
5. WHEN steering docs are modified THEN the docs MCP index SHALL be rebuilt so served guidance is current.

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 10: Guards — Direction-Coupling Split

**User Story**: As a maintainer, I want the enforcement guards split by their coupling to the direction decision, so that the direction-agnostic guards land early (defense before the contract erodes) while the direction-coupled lint policy waits for the committed direction rather than enforcing a wrong polarity.

#### Acceptance Criteria

1. The guards SHALL NOT be treated as a single late deliverable; they SHALL be split by direction-coupling.
2. **Direction-AGNOSTIC, land EARLY:**
   a. A **dynamic-import smoke test** SHALL be added as a **preventive** guard. (Components register Custom Elements eagerly; likely no component uses runtime dynamic `import()` today — to be confirmed in the Increment-2 inventory — so this guards a future regression. It SHALL be named preventive, not a fix for an active failure mode.)
   b. The **browser bundle** SHALL be included in the guard set (boot/smoke), direction-agnostically. The bundled-subsystem boot/smoke guard (MCP + browser) is **owned by Requirement 12** (see Requirement 12 AC 2); R10 references it here so the direction-agnostic guard set is complete-by-reference and the guard is neither double-built nor gapped.
3. **Direction-COUPLED, policy set AFTER the decision:** The static-lint **tooling** MAY be built early, but its **policy/polarity** SHALL be set only after the Requirement 4 direction decision — because the polarity inverts: CJS bans explicit extensions; ESM REQUIRES explicit `.js`.
4. **Lint scope.** The static-lint rule SHALL be scoped to **extensionless / raw-`.ts` relative imports on WEB SOURCE ONLY**. iOS-Swift and Android-Kotlin components are **categorically out** (they never traverse Node resolution). Banning *all* raw relative dynamic `import()` is over-broad (legit lazy-loads resolve at build time via esbuild) — the dynamic-import portion is **defense-in-depth**, not an active component failure mode. (Build-time validation dynamic imports — `MathematicalConsistencyValidator.ts:330-331`, static-string literals, not web source — resolve via the runtime mechanism, Increment 3a's lane, NOT the web static-bundle path, so they are out of the web-source lint's scope.)

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 11: Spec 117 Closeout (Decision 4 Mechanism)

**User Story**: As the next reader of Spec 117, I want an authoritative guidance note written into 117's spec directory once Increment 1 makes 117's path certain, so that I do not trust the empirically-false one-liner (117 decision-record item 3) and regress.

#### Acceptance Criteria

1. WHEN Increment 1 execution makes Spec 117's config-load path certain THEN a Spec 118 task SHALL, as an **acceptance criterion**, write a **guidance note into Spec 117's spec directory**.
2. The guidance note SHALL **supersede 117 decision-record item 3** (the empirically-false claim that the one-line directory-import fix unblocks the documented CLI — it relocates the failure one hop down the barrel chain) and SHALL advise re-running **117's own Task 5.3 trust gate**.
3. Spec 117's restored trust SHALL be scoped narrowly to the **config-load path ONLY**. The raw-`.ts` exports path SHALL remain unverified until Increment 3b (Requirement 7).
4. Spec 118 SHALL NOT assert 117's readiness on 117's behalf; 117 SHALL lift its own provisional status by re-running its own trust gate (Increment 1 only makes that gate *executable*).
5. Spec 117 SHALL NOT be corrected in-place now; the closeout rides this Increment-1 acceptance criterion (per Resolved Decision 4 — one authoritative note beats a correct-now-revise-later edit).

**Validation Tier**: Tier 2 (Standard).

---

### Requirement 12: MCP/Browser Principled Exception (Decision 2)

**User Story**: As a maintainer, I want bundled subsystems documented as a principled exception to the runtime-resolution contract — paired with their own boot/smoke guard — so that the exemption is a coherent boundary rather than a silent carve-out.

#### Acceptance Criteria

1. The runtime-resolution contract SHALL govern **non-bundled runtime TS**. **Bundled subsystems** — the three esbuild-bundled MCP servers and the browser bundle — SHALL be **exempt**, on the principle that *bundling resolves imports at build time*.
2. The exemption SHALL NOT be a silent corner: it SHALL be **paired with a boot/smoke guard** on the MCP bundles and the browser bundle, so the exempt subsystems still fail loudly if they break. **Requirement 12 OWNS this MCP + browser boot/smoke guard** (Requirement 10 AC 2b references it as the single owner so the bundled-subsystem guard is built once, here).
3. The exception SHALL be **documented as a coherent boundary** (which subsystems are exempt and why), not an undocumented carve-out (cross-referenced from Requirement 9 governance).
4. The MCP servers' own ts-node dev configs SHALL be carried as a **documented principled exception per Resolved Decision 2** (the outline already settled MCP-server ts-node dev configs as a documented exception; they do not load consumer configs but carry their own dev TS execution), paired with the boot/smoke guard per AC 2. ("Reconcile" is NOT required here — that wording would reintroduce a question Resolved Decision 2 already closed.)

**Validation Tier**: Tier 2 (Standard).

---

## Conditional & Escape-Hatch Notes

**What is CONDITIONAL on the Requirement 4 direction decision** (written direction-agnostically until then):
- Requirement 6 AC 4/5 — runtime mechanism specifics (CJS → standardize tsx + retire ts-node + tighter pin; ESM → the ESM-required mechanism).
- Requirement 8 — module-direction execution polarity and surfaces.
- Requirement 10 AC 3 — static-lint **policy/polarity** (CJS bans extensions; ESM requires `.js`). The lint *tooling* is NOT conditional and may be built early.

**What the escape-hatch DEFERS (execution only, never the decision):**
- Requirement 5 AC 5 + Requirement 8 AC 3 — IF ESM is committed AND cost is prohibitive, the ESM **consolidation execution (3c), including the preset migration,** may spin into a dedicated follow-on spec. The **direction is always decided in Spec 118**, and Spec 118 always closes on a coherent intermediate state.
- **Close-state coherence gate (Requirement 5 AC 6 / Requirement 3 AC 4 / Requirement 8 AC 3–4).** The escape-hatch defers execution onto a *guard-certified* coherent intermediate, **not an assumed one**: the consumer-surface boot/smoke guard SHALL be green at the close-state, the `"type":"module"` flip SHALL be sequenced into the deferred 3c so nothing is stranded, and IF no coherent CJS parking form exists for the jest-preset (Requirement 4 AC 6) the preset migrates in-spec. Principle: **defer the work, never the coherence.**

**What is direction-AGNOSTIC and lands EARLY (not gated on the decision):**
- Requirement 2 (config-load primitive — forward-compatible by hard requirement) and Requirement 3 (consumer-config boot/smoke guard).
- Requirement 10 AC 2 — dynamic-import smoke test (preventive) + browser-bundle guard.
- Requirement 12 — the MCP/browser exception boundary + its paired guard.

---

## Traceability

| Requirement | Derives from (outline § / matrix row / decision / R1 feedback) |
|-------------|----------------------------------------------------------------|
| R1 — Contract / North Star | § "North Star — Blue-Sky End State" (6 points); § "Framing" (vision unbound, whole-not-patched). |
| R2 — Inc 1 config-load primitive | § "Cohesive Incremental Delivery" Inc 1; § "Diagnosis" experiment matrix (faithful-consumer + source-dir rows); § "Scope of the Whole" (module-load locus, `ConfigLoader.ts:59`); ADA R1 (Inc 1 independent + forward-compatible); Open Q3 (tsImport CJS ergonomics — confirm in-spec). |
| R3 — Inc 1 boot/smoke guard | § "Cohesive Incremental Delivery" Inc 1 ("consumer-config boot/smoke guard"); North Star point 5. **[LINA R2]** AC 4 (shipped-consumer-surface jest-preset close-state guard — conditions the escape-hatch; Peter's close-state coherence gate). |
| R4 — Inc 2 evidence | § "Cohesive Incremental Delivery" Inc 2; ADA R1 (parity gate UNUSABLE → normalized semantic-equality; Inc-2 gate guards swap not scope); ADA R1 + Open Q4 / Resolved Decision 1 (divergence hypothesis falsifiable + bounded); LINA R1 (ESM cost consumer-facing → jest-preset blast radius); § "Risks to Inventory." **[ADA R2]** AC 4 M1 (volatile-field set is open/evidence-driven — rosettaVersion, Generated: headers, duration; token-index YAML clean); AC 7 OQ-2 (correlation-not-causation, plausible-contributor exit). **[LINA R2]** AC 5 SF-1 (export-condition import-only/require-only asymmetry); AC 6 MF-1 (preset raw-`.ts` moduleNameMapper couples it to R7; parking-form determination). |
| R5 — Direction decision | § "The Module-Direction Decision" (incl. fork escape-hatch); North Star point 4; Resolved Decision 3 (commit on Inc-2 evidence, ESM-compatible disposition); ADA R1 + LINA R1 (escape-hatch convergence); § "Downstream Specs Gated (122/123)." **[LINA R2 + Peter]** AC 5/AC 6 close-state coherence gate (escape-hatch defers preset migration onto a guard-certified coherent close-state; "defer the work, never the coherence"). |
| R6 — Inc 3a runtime | § "Cohesive Incremental Delivery" Inc 3a; ADA R1 (scope gate / per-surface split); § "Risks to Inventory" (typecheck-gate loss named mitigation; concentration risk / pin tsx tighter). **[ADA R2]** AC 3 S2 (typecheck loss is on `scripts/**`, excluded by tsconfig `include`); AC 4 S5 (ts-node retirement removes the only second TS runtime → tight pin + bump gate). |
| R7 — Inc 3b exports | § "Cohesive Incremental Delivery" Inc 3b; § "Scope of the Whole" (exports incoherence / second instance); Disease table (package exports row); § "Risks" (self-reference exports; paths-vs-exports); § "Relationship to 117" (exports path certifies in 3b). **[ADA R2]** AC 4 S3 (consumer-side tsconfig `paths` written by `init.ts:140-144` must be reconciled alongside the exports map). |
| R8 — Inc 3c direction execution | § "Cohesive Incremental Delivery" Inc 3c; § "The Module-Direction Decision" (ESM variant = escape-hatch candidate); ADA R1 + LINA R1 (escape-hatch). **[LINA R2 + Peter]** AC 3/AC 4 mirror the close-state coherence gate (deferral only onto a guard-green close-state; `"type"` flip sequenced so nothing stranded). |
| R9 — Governance | North Star point 6; § "Process Guard (Civitas)"; § "Cohesive Incremental Delivery" governance step; Spec 117 R7 ballot-measure precedent. |
| R10 — Guards (direction-coupling split) | § "Cohesive Incremental Delivery" governance step (guard split); LINA R1 (lint polarity coupled; 2-of-3 guards independent; lint over-broad → extensionless/raw-`.ts`; web-only insulation; dynamic-import preventive); Disease table (regression-safety row). **[LINA R2]** AC 2b SF-2 (bundled-subsystem guard single-owner = R12, by reference); AC 4 SF-3 (build-time validation dynamic imports out of web-source lint scope — runtime lane). |
| R11 — 117 closeout | Resolved Decision 4 (guidance-note mechanism); § "Relationship to Spec 117"; 117 `findings/decision-record.md` items 3 & 7 (superseded-pending-118). |
| R12 — MCP/browser exception | Resolved Decision 2 (principled exception + paired boot/smoke guard); § "Scope of the Whole" (MCP servers); Open Q2. **[LINA R2]** AC 2 SF-2 (R12 OWNS the MCP + browser boot/smoke guard). **[ADA R2 alignment]** AC 4 (MCP ts-node dev configs = documented exception per Decision 2, not "reconcile"). |

---

## R2 Review Dispositions

The items opened for R2 review resolved as follows (Peter approved all dispositions):

- **R5 / escape-hatch "prohibitive" threshold** → **judgment-based** (Peter). No quantitative floor is named; the threshold rests on the Increment-2 evidence + a human decision, consistent with the outline. Kept as-is.
- **R6 ESM-variant runtime mechanism (R6 AC 5)** → **wait for Increment-2 evidence** (Ada). Deliberately left under-specified pending the direction decision; this is correct — the ESM end-state's mechanism is not determinable now. Kept under-specified.
- **R4 AC 7 divergence-hypothesis phrasing** → **correlation-not-causation, plausible-contributor exit** (Ada OQ-2, applied in E6). "Confirmed" means resolution divergence is a plausible contributor → escalate to root-cause; "disproven" → clean exit.
- **R4/R5 jest-preset intermediate state** → **close-state coherence gate** (Peter, applied in E7/E8). The escape-hatch defers preset migration onto a consumer-surface-guard-certified coherent close-state; "defer the work, never the coherence."
- **R12 MCP ts-node dev configs** → **documented principled exception per Resolved Decision 2** (applied in E14). "Reconcile" wording retired as it reintroduced a closed question.
