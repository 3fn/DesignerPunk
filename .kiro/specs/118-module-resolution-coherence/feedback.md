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
