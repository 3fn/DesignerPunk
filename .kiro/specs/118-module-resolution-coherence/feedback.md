# Spec Feedback: Module-Resolution Coherence

**Spec**: 118-module-resolution-coherence
**Created**: 2026-06-13

---

## Design Outline Feedback

### Context for Reviewers

Reviewers: **Ada** (Rosetta — runtime loader, pipeline, exports), **Lina** (Stemma — components, test-infra, static guard). Thurgood is spec author/formalizer.

Settled decisions — do NOT re-litigate (challenge only if you have new evidence):
- **Single spec, all phases** (Peter's call) — the work is one cohesive problem delivered in increments, not multiple specs. → design-outline.md § "Framing"
- **Vision unbound / delivery risk-aware** — holistic end-state defined up front; execution incremental and guard-gated. Incremental ≠ patchwork. → § "Framing", § "Cohesive Incremental Delivery"
- **ESM is a decision the spec MAKES on Increment-2 evidence**, not fenced out and not left as a permanent fork. → § "The Module-Direction Decision"
- **Diagnosis + State B empirically confirmed and previously Ada-validated**; the one-liner relocates the failure (117 decision-record item 3 is false). → § "Diagnosis"
- **Components insulated** (Lina's prior finding, now in the outline); they need a static guard, not migration. → § "Scope of the Whole"
- Spec number 118 retained; renamed to Module-Resolution Coherence (config loading = Increment 1).

Under review: the design-outline as written (`.kiro/specs/118-module-resolution-coherence/design-outline.md`).

**Peter's specific ask: overall feedback, AND any monolithic concerns — good or bad.** Is the single-spec-all-phases / holistic structure creating monolith *risk* (scope creep, long-lived open spec, big-bang temptation, coupling that should be decoupled), or is the monolithic *cohesion* a strength (single source of truth, one contract, no fragmentation)? Name it explicitly.

#### [ADA R1]
- Diagnosis / mechanism / experiment matrix / loader-locus / anchor-fact all accurate from the token-pipeline domain. → design-outline.md § "Diagnosis"
- **Parity gate is UNUSABLE as written:** DTCG / token-index outputs carry generation timestamps + key ordering, so a raw byte-diff (ts-node vs tsx) will NEVER go green — the hard gate becomes either a false-blocker or a rubber-stamp. The harness MUST normalize/exclude timestamps + ordering. → § "Cohesive Incremental Delivery" (Increment 2)
- **Monolith verdict:** cohesion is CORRECT, not a risk — fragmenting into per-surface specs recreates the April→June→117 patch-by-patch disease. Affirm the single-spec call. → § "Framing"
- **Located monolith RISK (two vectors):** (a) Increment 3 "consolidation" as one big move is the OKLCH failure shape → split into 3a runtime / 3b exports / 3c module-direction, each CI-green-gated before the next; (b) the ESM decision can swallow the spec → add an explicit escape hatch that ESM-migration-if-too-costly spins into its own future spec so 118 can close. → § "Cohesive Incremental Delivery", § "The Module-Direction Decision"
- **Increment 1 is genuinely independent + forward-compatible** (tsImport/jiti work in both CJS and ESM, so loader choice doesn't prejudge the direction); 117 is NOT held hostage. BUT scope 117's restored trust narrowly to the config-load path — Inc 1 does NOT certify the raw-.ts exports path (unverified until Inc 3). → § "Relationship to Spec 117", § "Scope of the Whole"
- **Inc-2 gate is necessary but NOT sufficient:** it guards the SWAP, not the SCOPE — OKLCH derailed by expansion, not blind swapping. Add a scope gate / per-surface sequencing (the 3a/3b/3c split). → § "Cohesive Incremental Delivery"
- Keep the resolution-divergence hypothesis (Open Q4) falsifiable + bounded — if disproven, generation-gap work exits 118 cleanly. → § "Open Questions / Decision Points"
- Give typecheck-loss a NAMED mitigation (confirm tsc gates before `generate:types`), not just a flag. → § "Risks to Inventory"

#### [LINA R1]
- **Accurate from my domain.** Component-insulation framing correct ("insulated... esbuild + ts-jest... no migration... static lint guard"). The three brief-flagged items (ESM cost, dynamic-import smoke, browser-bundle build) are all already present. Nothing missing on basics. → § "Scope of the Whole"
- **PUSHBACK — static lint guard is NOT direction-independent; polarity is coupled.** "Ban explicit extensions" is CJS-only. Under ESM the rule INVERTS (explicit `.js` required). Lint *tooling* can be built early; lint *policy* must wait for the direction decision. → § "Cohesive Incremental Delivery"
- **Q3 ANSWER — partial independence.** dynamic-import smoke test (direction-agnostic, lands now) + browser-bundle build (direction-agnostic, lands now) CAN go off critical path; static lint rule polarity CANNOT. 2 of 3 independent, 1 coupled. Outline shouldn't treat "the guard set" as one late deliverable. → § "Open Questions / Decision Points"
- **Q2 ANSWER — cohesion is a real strength for the contract + Inc 1–2 + decision; monolith RISK is real but localized to Inc 3+/ESM in the component test suite.** Cohesion: components under one resolution contract is right for Stemma (True Native already has 3 platform branches; don't add module drift). Risk: ESM branch could drag 369 test suites into a big-bang inside a spec whose Inc 1 was a config-loader one-liner — the OKLCH derailment vector. → § "Framing"
- **RECOMMENDATION — add explicit fork escape-hatch at the direction decision point.** Keep single-spec cohesion for contract + Inc 1–2 + decision; explicitly PERMIT the ESM consolidation execution (Inc 3+) to spin into its own spec so the component-test migration can't keep 118 open indefinitely. → § "The Module-Direction Decision"
- **NEW EVIDENCE — ESM component-test cost is CONSUMER-FACING, not just internal.** `@3fn/core/jest-preset` is shipped to product consumers (Integration Guide); flipping it to ESM jest propagates to every consuming product's test setup. Inc 2's ESM-cost inventory must include the shipped jest-preset blast radius. Raises the ESM-commitment bar. → § "Risks to Inventory"
- **Lint rule precision concern.** Banning ALL raw relative dynamic import() is over-broad (legit lazy-load; esbuild resolves at build time, never hits runtime ESM resolver). Scope to extensionless/raw-.ts relative dynamic imports; frame dynamic-import portion as defense-in-depth, not an active component failure mode. → § "Scope of the Whole"
- **Minor — "insulated" is web-platform-only.** iOS (Swift) / Android (Kotlin) components don't traverse Node resolution at all — categorically out, not merely insulated. Guards are web-source-only. → § "Scope of the Whole"
- **Confirm dynamic-import smoke test is preventive.** Components register Custom Elements eagerly; likely no component uses runtime dynamic import() today. If so, the test guards a future regression — keep it, but name it preventive; confirm in Inc 2 inventory. → § "Cohesive Incremental Delivery"

---

*Author note (Thurgood): Ada and Lina independently converged on the monolith verdict — cohesion is a strength; the risk is localized to the ESM/Increment-3 consolidation branch — and independently recommended the SAME mitigation: an explicit fork escape-hatch letting ESM execution spin into its own spec. Plus two must-fix gate findings (parity normalization; scope gate / per-surface 3a-3b-3c sequencing) and Lina's new consumer-facing jest-preset evidence. To be incorporated at formalization (fresh session).*

#### [THURGOOD R2] — Incorporation

All R1 items incorporated into design-outline.md (Peter approved the fork escape-hatch):
- ADA R1 (escape-hatch) + LINA R1 (escape-hatch) → § "The Module-Direction Decision" now carries the explicit fork escape-hatch (ESM consolidation execution may spin to its own spec; direction stays decided in 118). Also reflected in § "Framing" monolith verdict and North Star point 4.
- ADA R1 (parity unusable) → Increment 2 changed from "byte-diff" to **normalized semantic-equality** comparison (timestamps + ordering excluded); also in § "Risks to Inventory".
- ADA R1 (scope gate / split) → Increment 3 split into **3a runtime / 3b exports / 3c module-direction**, each CI-green-gated; two gate types (evidence + scope) named in § "Cohesive Incremental Delivery".
- ADA R1 (Inc 1 independent + 117 scoping) → Increment 1 marked forward-compatible (loader doesn't prejudge direction); § "Relationship to 117" scopes restored trust to the config-load path (exports certify in 3b).
- ADA R1 (typecheck-loss mitigation) → § "Risks" now names the mitigation (confirm tsc gates `generate:types` before swapping its loader).
- ADA R1 (hypothesis falsifiable) → Open Q4 + Increment 2 note it exits cleanly if disproven.
- LINA R1 (guard polarity) → guards split: dynamic-import smoke test (preventive) + browser-bundle land early; static-lint *policy* waits for direction. → Increment governance step.
- LINA R1 (lint over-broad) → § "Scope" scopes the lint to extensionless/raw-.ts relative imports; dynamic-import framed as defense-in-depth.
- LINA R1 (web-only insulation) → § "Scope" distinguishes iOS/Android categorically-out from web-insulated; guard is web-source-only.
- LINA R1 (consumer-facing jest-preset) → Increment 2 ESM-cost inventory + § "Risks" include the shipped jest-preset blast radius.

Outline status updated to "R1 feedback incorporated." Ready for fresh-session formalization (requirements → R2 review → design → tasks).

---

## Requirements Draft Feedback (R2 Review)

Reviewers: **Ada** (Rosetta — runtime loader, pipeline, exports), **Lina** (Stemma — components, test-infra, static guard). Under review: `requirements.md` as drafted (R2). Thurgood incorporates.

#### [ADA R2]
- **MUST-FIX — M1 (parity volatile-field set incomplete).** R4 AC 4's "timestamps + key ordering" is a closed list that under-normalizes. Make it an **open, evidence-driven set**, normalizing/excluding at minimum: timestamps; embedded version / `rosettaVersion` fields (`DTCGFormatGenerator.ts:226-236`); in-file `Generated:` header comments (`TokenFileGenerator.ts:301,376,455`); build-timing / `duration` fields; key ordering — enumerated from actual generator output during harness construction, not assumed closed. Note the **token-index YAML output itself is clean** (`generateTokenIndex.ts:173-187`). → R4 AC 4 (E3).
- **SHOULD-FIX — S1 (name the jiti fallback).** IF `tsImport` fails the CJS-context test, jiti is the named fallback; budget it as a NEW dependency (**verified NOT currently installed**). Naming it acknowledges materiality given the forward-compat HARD requirement + empirically-uncertain primary loader; does not pick the library. → R2 AC 3 (E2).
- **SHOULD-FIX — S2 (typecheck loss is on `scripts/**`, outside tsconfig).** `tsc` covers the generated output (`src/types/generated/TokenTypes.ts`, in `src/`) but `tsconfig.json` `include: ["src/**/*"]` **excludes `scripts/**`**; ts-node (no `transpileOnly`) is the ONLY thing typechecking those scripts today. ts-node→tsx silently drops `scripts/**` typechecking unless a `scripts/`-covering step is added. → R6 AC 3 (E9).
- **SHOULD-FIX — S3 (consumer tsconfig paths from init.ts).** `init` generates consumer-side tsconfig `paths` (`src/cli/init.ts:140-144`, mapping `@3fn/core/*` → `./node_modules/@3fn/core/src/*.ts`); reconciling the exports map without updating what `init` writes desyncs consumers. → R7 AC 4 (E11).
- **SHOULD-FIX — S5 (ts-node safety-net removal).** Retiring ts-node removes the only *second* TS runtime (no fallback executor remains) → strengthens the case for a tight tsx pin + pin-bump review gate. → R6 AC 4 (E10).
- **CONFIRMATIONS:** diagnosis / experiment matrix / loader-locus carried correctly; parity **normalized-semantic-equality** survived; scope-gate 3a/3b/3c survived; Increment 1 independent + 117 trust scoped to the config-load path; divergence hypothesis falsifiable. **`loadConfig` caller inventory verified complete + correct** — `src/cli/designerpunk.ts:106,185`; `src/cli/validate.ts:28`; `src/cli/validateProductTokens.ts:15`; `scripts/generate-platform-tokens.ts:50-51`; re-export `src/config/index.ts:6`; `ReleasePipeline.ts:125` = name-collision (reads `release-config.json` via `JSON.parse`), NOT a caller; `generateTokenFiles` consumes the *resolved* config object, NOT a caller.
- **OPEN → RESOLVED:** ESM-variant runtime mechanism (R6 AC 5) waits for Increment-2 evidence (leave under-specified — correct); divergence hypothesis → correlation-not-causation, plausible-contributor exit (OQ-2, E6); escape-hatch "prohibitive" threshold → judgment-based.

#### [LINA R2]
- **MUST-FIX — MF-1 (jest-preset blast radius understated).** The preset's raw-`.ts` `moduleNameMapper` (`src/testing/jest-preset.ts:50-58`, rewriting `@3fn/core/*` → raw `.ts` source) **couples the preset to the R7 exports reconciliation** — it is not just a CJS/ESM format flip. The ESM-cost inventory must name those raw-`.ts` mapping entries and must not treat the preset as a one-line `testEnvironment` flip. → R4 AC 6 (E5).
- **SHOULD-FIX — SF-1 (export-condition asymmetry).** Inventory all export conditions including the `import`-only / `require`-only asymmetry: `.` and `./components` are import-only (no `require`); `./jest-preset` is require-only; `./testing` is both. A `require` of `@3fn/core` resolving nothing today is itself a coherence question → carried into R7. → R4 AC 5 (E4).
- **SHOULD-FIX — SF-2 (browser-bundle guard single-owner).** The bundled-subsystem boot/smoke guard (MCP + browser) should have a single owner = **Requirement 12**; R10 references it so the guard isn't double-built or gapped. → R10 AC 2b + R12 AC 2 (E13).
- **SHOULD-FIX — SF-3 (build-time validation dynamic imports out of lint scope).** Build-time validation dynamic imports (`MathematicalConsistencyValidator.ts:330-331`, static-string literals, not web source) resolve via the runtime mechanism (Increment 3a's lane), NOT the web static-bundle path → out of the web-source lint's scope. → R10 AC 4 (E15).
- **CONFIRMATIONS:** lint polarity direction-coupled (tooling-early / policy-after) carried; lint not over-broad. **Dynamic-import smoke test is preventive — code-verified ZERO dynamic `import()` in web component source.** Web-only insulation / iOS-Android categorically-out stated correctly; consumer-facing jest-preset cost carried; monolith risk localized + escape-hatch contains it; MCP/browser bundling-resolves-at-build-time exemption verified (esbuild `bundle: true`).
- **OPEN → RESOLVED:** MCP ts-node dev configs → documented exception per Resolved Decision 2 (E14); jest-preset intermediate state → close-state coherence gate (Peter, E7/E8).

#### [THURGOOD R3] — Incorporation

All R2 MUST-FIX and SHOULD-FIX items were incorporated into `requirements.md` (edits E1–E16). Peter approved all dispositions. The central addition is the **escape-hatch close-state coherence gate** (Peter's "defer the work, never the coherence" ruling): the escape-hatch defers ESM execution — **including the preset migration** — ONLY onto a **consumer-surface-guard-certified coherent intermediate**, with the `"type":"module"` flip **sequenced into the deferred 3c** so no shipped artifact is stranded (R5 AC 5/AC 6, R3 AC 4, R8 AC 3/AC 4). IF no coherent CJS parking form exists for the preset (R4 AC 6), the preset migrates in-spec. Requirements status → **R2 incorporated; ready for design.**

---

## Design Draft Feedback (Design Review)

Reviewers: **Ada** (Rosetta — runtime loader, parity-harness mechanics, exports), **Lina** (Stemma — component static guard, jest-preset/test-infra, browser/MCP guard). Under review: `design.md` as drafted (R3). Thurgood incorporates.

#### [ADA R3-DESIGN]
- **MUST-FIX — MF-1 (parity seam wrong).** `GenerationIntegrityCheckImpl` is **hardwired to committed-vs-fresh** — its constructor takes exactly ONE `FreshGenerator` and reads the committed side itself via `readCommitted()`/`fs.readFileSync` (`GenerationIntegrityCheck.ts:37-47,67-69,105-115`); it **cannot ingest two fresh trees**. The harness must reuse **`Normalizer.normalize()` + `SemanticComparator.compare()` directly** (both standalone/public, `Normalizer.ts:44`, `SemanticComparator.ts:19-29`; `compare` is symmetric) via a **NEW thin parity orchestrator that bypasses `GenerationIntegrityCheckImpl`**, reading two fresh roots directly. `FreshGenerator`/`DiskFreshGenerator` is reusable as a per-tree reader but is NOT the two-tree seam. → § Increment 2 reuse + Decision 2 (E2).
- **MUST-FIX — MF-2 (approach A still mutates global state).** `register({namespace})` does NOT avoid global mutation — it sets `module._resolveFilename` + patches `module._extensions` process-globally (verified `node_modules/tsx/dist/register-D46fvsV_.cjs`); the namespace buys request-level isolation, not absence of global mutation. A satisfies R2 AC1 via global mutation + namespace scoping + a **mandatory `unregister()`** (`NamespacedUnregister`). If A is accepted, calling `unregister()` is part of acceptance, not optional. → § Increment 1 candidate table row A (E3).
- **MUST-FIX — MF-3 (volatile table missing `extensions.themes`).** `extensions.themes = registeredThemes` (`DTCGFormatGenerator.ts:240-242`) is embedded when themes are configured; it is an **array**, and `SemanticComparator` compares arrays **positionally** (`SemanticComparator.ts:46-52`) → registered-theme ordering/presence differing between parity runs is a real **false-diff vector**. ENUMERATE during construction + flag array-ordering as a candidate normalization (latent in 117 too, in-scope to name here). → § Increment 2 normalization table (E4).
- **SHOULD-FIX — SF-1 (reframe OQ-1).** `parentURL` construction is NOT the risk — `tsImport`'s second arg is explicitly a `parentURL` string (verified `node_modules/tsx/dist/esm/api/index.mjs`), `__filename` exists in CJS, so `pathToFileURL(__filename).href` satisfies it; `tsImport` self-scopes (`register({namespace: Date.now()})` per call, no persistent hook). The genuine residual risk is the **CJS-host/ESM-loader boundary** (dynamic `import()` inside an ESM-loader hook from a CJS host; the config's transitive relative raw-`.ts` requires). → OQ-1 + candidate table row B (E5).
- **SHOULD-FIX — SF-2 (A is synchronous).** A's scoped `require` is synchronous (`ScopedRequire`); `await <A>` is harmless and `.default || loaded` works on the sync return — stated so no one "fixes" the apparent missing await. → § Increment 1 (E6).
- **SHOULD-FIX — SF-4 (`types` condition).** `./types`, `./build`, `./blend` each carry **three** conditions — `import`, `require`, AND **`types`** — all → raw `.ts`. 3b must reconcile `types` too (else consumer typechecking desyncs). → § Increment 2 export-condition table + 3b (E7).
- **SHOULD-FIX — SF-5 (one mapping, two copies).** The `init`-written `tsconfig.test.json` `paths` (`init.ts:139-145`) and the preset's `moduleNameMapper` (`jest-preset.ts:53-59`) encode the **identical** 5-entry mapping in two places; 3b must update **both in lockstep** so they don't drift. → § 3b reconciliation (E8).
- **CONFIRMATIONS:** Decisions 2/3/4 affirmed against code; volatile seed (minus MF-3) affirmed; 5 callers verified at exact sites; jiti NOT installed; tsx API confirmed (`tsImport` esm-only).
- **OQs → resolved:** bin-hook sequencing → deferred to 3a, guard-certified (Resolution 2); A-vs-B → no-residue criterion, B-preferred (Resolution 3).

#### [LINA R3-DESIGN]
- **MUST-FIX — MF-A (consumer guard must be subprocess, NOT in-process).** The R3 guard MUST run through the **CLI/bin subprocess path** (pack→install→`npx designerpunk generate`, like `consumer-integration.test.ts`), NOT an in-process `loadConfig()` under ts-jest. In-process under ts-jest, `await import(configPath)` is intercepted by jest's module registry and **never hits Node's strict-ESM resolver** — proven by `ConfigLoader.test.ts` (configs as `module.exports` in `.ts`, comment "avoids needing ts-node in test") **passing today despite the broken production path**. An in-process guard would go **green against the very bug it guards** (false negative). THE most important correction. → § Increment 1 consumer guard + Validation R3 (E9).
- **SHOULD-FIX — SF-A (positive sentinel, not "not DEFAULTS").** "Assert resolved config is not the DEFAULTS fallback" is insufficient — DEFAULTS only triggers on the *no-file* branch (`ConfigLoader.ts:56`), not on a transitive resolution break. The guard must **positive-assert a sentinel value only the transitive `./my-overrides` import produces**, so a partial-but-non-default load can't pass. → § Increment 1 consumer guard (E10a).
- **SHOULD-FIX — SF-B (real CJS/ESM fixtures via subprocess).** A `module.exports`-in-`.ts` fixture is **neither faithful CJS nor ESM** (a jest-transform artifact). The ESM fixture must use real `export default` + ESM-syntax transitive imports; the CJS fixture real `require()`; both loaded via subprocess. → § Increment 1 consumer guard (E10b).
- **OQ-3 ASSESSMENT (leans YES):** a coherent CJS parking form **EXISTS** — provided the close-state ships an explicit `.cjs` form (not the current `.js`-in-typeless-package). The shipped `dist/testing/jest-preset.js` compiles to pure CJS (`"use strict"`, `__esModule` defineProperty, `module.exports`); an ESM `"type":"module"` flip strands a `module.exports` `.js`, but renaming to `jest-preset.cjs` + retargeting the `./jest-preset` `require` condition survives the flip (`.cjs` is unambiguously CJS), and the preset is require-only (no `import` condition). **Caveat:** parks the *format*; full coherence still needs 3b (the `moduleNameMapper` raw-`.ts` targets are R7, not a `"type"`-flip strand). Net: defer branch available; contingency (c) likely doesn't fire; final confirm Inc-2 + an actual `.cjs`-under-`"type":"module"` boot through the R3 AC4 close-state guard. → OQ-3 + 3c close-state gate (c) (E11).
- **CONFIRMATIONS:** exports asymmetry exact; jest-preset R7 coupling carried; init-paths desync real; dynamic-import preventive (zero verified); static-lint scope correct; MCP/browser single-owner right; typecheck-gate-loss precise (`scripts/**` outside tsconfig).

#### [THURGOOD R4] — Incorporation
All design-review MUST/SHOULD-FIX incorporated (edits E1–E16); Peter approved all dispositions and the four corrected resolutions. Central corrections:
1. **Consumer guard runs subprocess/bin (non-skippable required CI)** — an in-process guard would be false-green against the very bug it guards (proven by `ConfigLoader.test.ts` passing despite the broken production path); positive sentinel assertion + real CJS/ESM fixtures.
2. **Parity harness uses a NEW thin orchestrator reusing 117's `Normalizer`+`SemanticComparator` directly**, not `GenerationIntegrityCheckImpl` (which is hardwired committed-vs-fresh and cannot take two fresh trees).
3. **Loader selection adds "no ambient/global residue" as a first-class accept-criterion; B preferred when it passes** — encoding the coherence value into the choice ("get it right over get it right now") rather than letting familiarity decide; A wins only if B fails the CJS-boundary test (OQ-1), carrying its `unregister()` lifecycle.
4. **Bin-hook removal deferred to 3a as a guard-certified coherent intermediate**; the `.cjs` preset rename is **confirmed-in-Inc-2 / executed-in-3c** under the committed direction (principled refusal to pre-commit).

Design status → **design review incorporated; ready for tasks.**

---

## Tasks Draft Feedback (Task Review)

Reviewers: **Ada** (Rosetta — loader/parity/exports mechanics), **Lina** (Stemma — consumer guard, MCP/browser guard, lint tooling). Under review: `tasks.md` as drafted. Thurgood incorporates.

#### [ADA R-TASKS]
- **MUST-FIX — MF-1 (diagnosis/matrix harness does NOT exist to extend).** Task 1 + 1.1 imply a thin extension of a standing diagnosis harness — there is none. The diagnosis was *performed* (documented in requirements § Diagnosis) but **no matrix harness was committed**; only `tests/consumer-integration.test.ts` exists as a reusable subprocess scaffold (verified by grep). Standing up the resolution-matrix harness is **net-new construction**. → Task 1 + 1.1.
- **SHOULD-FIX — SF-1 (name the artifact-list driver; per-artifact not per-tree).** `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)` are **per-artifact, not per-tree**; the orchestrator must iterate an artifact list (path + `ArtifactKind`), reading each path from root A and root B. Name `INVENTORY: ArtifactRef[]` (`src/tools/integrity/inventory.ts:22`) as the reusable artifact-list driver. Reword "diffs `normalize(treeA)` against `normalize(treeB)`" so `normalize` doesn't read as taking a tree. → Task 7.1.
- **SHOULD-FIX — SF-2 (`src/generators/` prefix; `extensions.themes` conditionally present).** Volatile-field source files are `src/generators/DTCGFormatGenerator.ts` / `TokenFileGenerator.ts` (NOT `src/build/generators/`). `extensions.themes` is **conditionally present** (emitted behind a `registeredThemes.length > 0` guard, `DTCGFormatGenerator.ts:241-242`), so **both presence AND array-ordering** are false-diff vectors. → Task 7.2.
- **SHOULD-FIX — SF-3 (jest-preset citation).** The `moduleNameMapper` block is at `src/testing/jest-preset.ts:53-59`, not `:50-58`. → Task 7.3 (and Task 7 Success Criteria).
- **SHOULD-FIX — SF-4 (Task 8 reads the assembled table).** Task 8 cannot start until Task 7.4 is complete and the evidence table is fully assembled (including the typecheck-coverage row) — it reads the assembled table, not partial inventories. → Task 8.
- **CONFIRMATIONS:** Task 2 swap executable + correct (caller inventory + non-callers verified); Task 1 procedure correctly no-assume (B-preferred / A-unregister / C-fallback intact); 7.1 bypass of `GenerationIntegrityCheckImpl` correct (hardwired committed-vs-fresh verified); 7.4 divergence correlation-not-causation correct; **typecheck-coverage placement correct — confirm-in-Task-7 / act-in-3a, NO promotion needed (resolves Thurgood flag #2)**; Task 8 gate framing correct; Group 9 traces sufficient for pass-2. No blocking Peter OQs (hold "ready" until MF-1 wording fixed).

#### [LINA R-TASKS]
- **MUST-FIX — MF-1 (Task 3.2 "non-skippable CI" has no host).** No test-running CI exists — only `.github/workflows/package-name-drift.yml`; no `npm test`/`test:consumer`/jest in any workflow; no husky (verified). "Non-skippable required CI" currently has nowhere to run. → Task 3.2 (118 must own standing up the minimal lane).
- **MUST-FIX — MF-2 (Task 4.2 lint scaffold has no framework).** NO ESLint/Biome/oxlint/lint framework, config, script, or dep exists in the repo (verified). The "lint-rule scaffold" is a genuine framework add, not a config tweak. → Task 4.2.
- **SHOULD-FIX — SF-1 (4.1/4.2 mechanisms).** 4.1 = jest source-scan test (presence assertion, no framework, rides existing jest infra); 4.2 = scoped ESLint tooling (minimal config on web source). → Task 4.1 / 4.2.
- **SHOULD-FIX — SF-2 (Task 3.1 extends `consumer-integration.test.ts`).** 3.1 extends the existing `describe`/`beforeAll` in `tests/consumer-integration.test.ts:25-40` (pack→install→`npx designerpunk init`→`npx designerpunk generate`), adding the fixtures + sentinel as new `it` blocks — reusing the proven scaffold, NOT a from-scratch build. → Task 3.1.
- **SHOULD-FIX — SF-3 (split Task 5.1).** The MCP and browser bundles boot differently; lumping them risks a false signal. Split into 5.1a (MCP subprocess spawn waiting for the `running on stdio` stderr sentinel, the `waitForReady`-on-stderr pattern at `consumer-integration.test.ts:121-132`, verified `application-mcp-server/src/index.ts:362-388`) + 5.1b (jest-jsdom `import()` of `dist/browser/designerpunk.esm.js` asserting a defined custom element; NOT bare `node` — `customElements` undefined there). → Task 5.1.
- **SHOULD-FIX — SF-4 (build-before-guard).** Both 5.1 guards depend on `build:mcp` / `build:browser` having run; CI must sequence build-before-guard, or the guard greens trivially on a missing/stale `dist/`. → Task 5.
- **CONFIRMATIONS:** Task 3.1 substance executable (subprocess-only/MF-A, two faithful fixtures, positive sentinel all survived); Task 4.1 executable (preventive, zero-seed verified); Task 5.2 correctly scoped (ballot, ts-node documented exception per Decision 2); Group 10 notes sufficient + OQ-3 parking-form lean carried accurately (`.cjs`/require-only survives the flip; parks format only, full coherence needs 3b).
- **OQs → RESOLVED:** CI lane → 118 owns the minimal lane (Peter); lint mechanism → scoped ESLint for 4.2 + jest-scan for 4.1 (Peter, after confirming no linting exists).

#### [THURGOOD R5] — Incorporation
All task-review MUST/SHOULD-FIX incorporated (E1–E11); Peter approved all dispositions + the two decisions (verified in main loop: no test CI and no lint framework exist). Central fixes:
1. The loader-selection matrix harness is **net-new** — no diagnosis harness was committed; it may reuse only the `consumer-integration.test.ts` subprocess scaffold + the requirements § Diagnosis reproduction as a starting point.
2. **118 owns standing up the minimal consumer-guard CI lane** — a guard with no CI host violates R1 AC5's "cannot silently erode" (it becomes a local test someone must remember to run). Task 3.2 creates a minimal `consumer-guard.yml` running `test:consumer` as a required PR check on `main`; Tasks 4/5 guards attach to it. Minimal lane this spec needs, NOT a CI overhaul.
3. **Scoped ESLint** for the static-lint rule (Task 4.2) — a minimal config on web source, polarity deferred to Group 9; a genuine new dev dependency since no linting exists. 4.1 stays a jest source-scan. NOT repo-wide adoption.
4. Task 5.1 split into **5.1a (MCP subprocess-stderr-sentinel)** + **5.1b (browser jest-jsdom)**, both build-before-guard.
Thurgood flag #2 resolved (typecheck placement correct — confirm-in-Task-7 / act-in-3a, no promotion). Tasks status → **task review incorporated**; the formalization (requirements → design → tasks) is complete and execution-ready for the Increment-1 critical path.
