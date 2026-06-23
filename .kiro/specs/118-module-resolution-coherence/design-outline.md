# Design Outline: Module-Resolution Coherence

**Date**: 2026-06-13
**Spec**: 118 — Module-Resolution Coherence *(supersedes the narrower "Config-Loader Resolution" framing; config loading is the first increment, not the whole)*
**Status**: Design Outline (thinking document). Diagnosis + scope EMPIRICALLY CONFIRMED and Ada/Lina-validated. **R1 feedback incorporated** (see `feedback.md`). **Not yet formalized** — requirements/design/tasks follow in a fresh session.
**Leads**: Thurgood (diagnosis, formalization, verification, governance contract); Ada (runtime loader + pipeline mechanics, Rosetta); Lina (component static guard + test-infra alignment, Stemma).
**Source**: `.kiro/issues/2026-06-13-module-resolution-strategy.md` (this spec is the dedicated spec that issue defers to).
**Relationship**: Increment 1 unblocks **Spec 117's documented-CLI trust gate** (117 stays provisional until it lands; 117's decision-record requires correction — see § Relationship to Spec 117).

---

## Framing: Vision Unbound, Execution Risk-Aware

This is design-system work, so it must be made **whole**, not patched. The recurring `.ts`-extension churn (April → June → 117 Finding 2) is the *symptom* of a system that resolves modules **incoherently across its surfaces**. The resolution is not another carefully-bounded patch — it is a single coherent module-resolution contract for the entire system.

Two levels, deliberately distinct:
- **Vision (this outline's North Star): unbound and whole.** What does great look like with no scope fences?
- **Delivery: cohesive, incremental, risk-aware.** Each increment moves toward the whole and never strands the system in a *more* incoherent state. Incremental ≠ patchwork. (OKLCH is the precedent: a holistic goal still derails without coherent, risk-aware delivery.)

**Monolith verdict (Ada + Lina, independently converged):** single-spec **cohesion is a strength** — fragmenting into per-surface specs recreates the April→June→117 disease. The monolith **risk is real but localized to the ESM consolidation branch** (Increment 3c), and is contained by the **fork escape-hatch** (§ The Module-Direction Decision) and per-surface gating (§ Cohesive Incremental Delivery).

---

## North Star — Blue-Sky End State (the Whole)

**One module-resolution contract governs the entire system — every runtime entry point, every package export, every TS execution path, consumer and internal alike — with no deferred corners and no permanent open forks.** Concretely:

1. **One runtime TS-execution mechanism**, not two. (Today: tsx for `bin`, ts-node for scripts — itself patchwork.)
2. **One config-load primitive** that carries its own TS-aware resolution and assumes no ambient loader registered elsewhere.
3. **Uniform package exports** — no mixed raw-`.ts` / `dist`. Every export resolves coherently at runtime.
4. **A committed module-system direction** (CJS-consistency or native ESM) — *decided on evidence*, not left dangling. A half-decided module system is, by definition, patchwork. The one fixed fact — consumers author `.ts` configs loaded at runtime, so a TS-aware runtime loader is **permanent** — is a property the committed direction accommodates, not a reason to avoid committing.
5. **Enforcement so the contract cannot silently erode**: runtime boot/smoke guards at every entry point + a static lint guard for statically-bundled web source.
6. **Governance**: the contract codified in steering as the system's law, with the module-direction decision (and, if any execution is deferred, its triggers and inventoried cost) documented — not folk knowledge.

Everything resolves *into* this contract. Note (Increment 1 caveat): the committed direction's *execution* may be staged (see escape-hatch); what is non-negotiable is that the direction is decided and the system never rests in an incoherent intermediate.

---

## The Disease: Patchwork (current incoherence)

| Surface | Current state | Coherence violation |
|---------|---------------|---------------------|
| Config load | `ConfigLoader.ts:59` raw `await import()`, assumes an ambient loader | Fragile primitive; customer-facing failure |
| Runtime TS | `tsx` (bin) **and** `ts-node` (scripts) | Two mechanisms, two resolution behaviors |
| Package exports | `./config`→`dist`; `./blend`/`./build`/`./types`→raw `.ts` | Same package resolves itself inconsistently |
| Entry points | bin (tsx/cjs), scripts (ts-node), MCP (esbuild bundles), tests (ts-jest) | Each handles TS differently |
| Authoring | CJS + extensionless, pervasive but **unenforced** | ESM leaks creep in ad hoc |
| Regression safety | No boot/smoke guard | Failures ship silently (the April→June→117 cycle) |
| Module direction | CJS vs ESM **undecided** | Perpetual ambiguity |

---

## Diagnosis — EMPIRICALLY CONFIRMED (harness reproducing `bin` machinery; Ada-validated)

**Mechanism (three-condition conjunction):** `await import()` of a `.ts` config + no `"type":"module"` (Node detects ESM syntax → **reparses the config as an ES module**, `MODULE_TYPELESS_PACKAGE_JSON` warning) + only the CJS hook registered → the config's transitive relative TS imports hit Node's **strict-ESM resolver** (explicit extensions required, directory imports forbidden). `tsx/cjs` hooks `require()`, not this native-ESM child resolution.

**Experiment matrix (`tsx/cjs` only = current bin):**

| Config | Result |
|--------|--------|
| Bare (no imports) | ✅ LOAD_OK |
| Compiled `.js` import only | ✅ LOAD_OK |
| Source dir import `./src/config` | ❌ `Directory import not supported` |
| Source + proposed one-liner `./src/config/index.ts` | ❌ moved one hop → `./defineConfig` |
| **Faithful consumer (compiled + relative raw-TS `./my-overrides`)** | ❌ `Cannot find module '.../my-overrides'` |

With `tsx/esm` also registered (option D): source ✅ and faithful consumer ✅ — but via a *global ambient hook* (perpetuates the coupling).

---

## Scope of the Whole (Ada/Lina validated)

- **Module-load locus:** `ConfigLoader.ts:59` is the sole dynamic `import()` of a user config. Every config-load path funnels through `loadConfig` (CLI generate/validate + token/product/staleness internals; `generateTokenFiles`; `scripts/generate-platform-tokens`). *(Correction: `ReleasePipeline.ts` `loadConfig` is a name-collision reading a JSON — not a caller.)*
- **Exports incoherence:** `./blend`/`./build`/`./types` ship raw `.ts` — a likely **second instance** of the same disease for any runtime consumer outside the bundle. Part of the whole (resolved in Increment 3b), not a satellite.
- **Components:** **categorically out on iOS/Android** (Swift/Kotlin never traverse Node resolution) and **insulated on web** (web source traverses only esbuild + ts-jest, both tolerate CJS+extensionless). No component migration. They need a **web-source-only static lint guard**, scoped to *extensionless / raw-`.ts` relative* imports (banning *all* raw dynamic `import()` is over-broad — legit lazy-loads resolve at build time; the dynamic-import portion is defense-in-depth, not an active failure mode).
- **ts-node scripts:** dev-only, but part of the coherence whole (one runtime mechanism).
- **MCP servers:** esbuild-bundled, do not load consumer configs, but carry their own ts-node dev configs — a decision point (reconcile or accept as a documented exception).
- **Anchor fact:** runtime TS-config loading is permanent regardless of module direction.

---

## The Module-Direction Decision (made coherently, with an escape-hatch)

The CJS-vs-ESM choice is a decision the spec **makes** on Increment-2 evidence — not a permanent fork. Both are legitimate coherent end-states; the runtime TS-config loader persists either way.

| Direction | What | Trade-off |
|-----------|------|-----------|
| **CJS-consistency + single tsx runtime** | Commit to CJS+extensionless authoring; one runtime loader (tsx, prod); reconcile exports | Lower churn; permanently depends on tsx-at-runtime; swims against the ESM tide |
| **Native ESM migration** | `"type":"module"`, explicit `.js`, nodenext; keep TS-aware config loader | Ecosystem-aligned; package already ESM; removes third-party-loader from repo's own code; **high churn concentrated in the component test suite, and consumer-facing** — the shipped `@3fn/core/jest-preset` flip propagates to every consuming product's test setup |

**Fork escape-hatch (Peter-approved; Ada+Lina convergent):** the *contract*, the *decision*, and the *non-ESM consolidation path* complete within 118. **If ESM is chosen and Increment-2 cost is prohibitive, its consolidation EXECUTION (Increment 3c, ESM variant) may spin into a dedicated follow-on spec** — so 118 closes on a coherent intermediate state rather than being held open indefinitely by a test-suite migration. What 118 never does is leave the *direction* undecided.

---

## Cohesive Incremental Delivery (toward the whole; risk-aware)

Each increment is independently coherent and shippable, paired with its guard, and never leaves the system more incoherent. Sequence serves the whole — it does not bound it. **Two gate types apply:** an *evidence gate* (no swap before proof) and a *scope gate* (per-surface sequencing — OKLCH derailed by expansion, not blind swapping).

1. **Increment 1 — Config-load primitive (keystone, ships independently).** Replace the raw `await import()` with a TS-aware loader inside `loadConfig` (lean: tsx programmatic `tsImport`; confirm CJS-context ergonomics empirically; fallback jiti). Removes the ambient-loader coupling. **Forward-compatible:** tsImport/jiti work in *both* CJS and ESM contexts, so the loader choice does **not** prejudge the direction decision. Validate by swapping the loader *inside* `loadConfig` and re-running the matrix (incl. ESM-authored vs CJS-authored config) — not by adding bin hooks. Includes a consumer-config boot/smoke guard. **Completion checkpoint unblocks 117** (trust scoped narrowly to the config-load path — see § Relationship to 117).
2. **Increment 2 — Evidence (investigation-first, NO swaps).** Inventory every runtime TS entry point + a **parity harness using normalized semantic-equality comparison** (ts-node vs tsx) — **timestamps and key ordering MUST be normalized/excluded** (a raw byte-diff never goes green against DTCG/token-index output; same semantic-equality discipline 117's integrity engine adopted). Inventory runtime consumers of the raw-`.ts` exports; inventory ESM-migration cost **including the shipped `jest-preset` consumer blast radius**. Produces the green/red table informing the direction decision. *(Tests — falsifiably and boundedly — Ada's hypothesis that `token-index-generation-gaps` / `blendutilities-not-generated` correlate with resolution divergence; if disproven, generation-gap work exits 118's scope cleanly.)*
3. **Direction decision point** — evidence-informed commitment (CJS or ESM), with the escape-hatch above.
4. **Increment 3 — Consolidation toward the committed target, SPLIT and per-surface gated** (each CI-green before the next; not one big move — that's the OKLCH failure shape):
   - **3a — Runtime:** unify on one runtime mechanism (if CJS: standardize tsx, retire ts-node, pin tsx tighter).
   - **3b — Exports:** reconcile `./blend`/`./build`/`./types` to coherent resolution (closes the second-instance hazard; this is where 117's exports path finally certifies).
   - **3c — Module-direction execution:** apply the committed direction. *ESM variant is the escape-hatch candidate* (may spin to its own spec).
5. **Increment — Governance + guards.** Codify the resolution contract in steering (the system's law); document the direction decision + any deferred-execution triggers/cost. **Guards are NOT one late deliverable:** the **dynamic-import smoke test (preventive)** and **browser-bundle-in-guard-set** are direction-agnostic and land early; the **static lint rule's *policy/polarity* is direction-coupled** (CJS bans extensions; ESM *requires* `.js`) — build the lint *tooling* early, set the *policy* after the direction decision.

---

## Open Questions / Decision Points

1. The module-direction commitment (informed by Increment 2 evidence, incl. jest-preset blast radius).
2. MCP-server ts-node: reconcile into the single runtime, or documented exception?
3. tsx `tsImport` ergonomics in `loadConfig`'s CommonJS context (`__dirname`, no `import.meta`) — confirm empirically in-spec.
4. Read `token-index-generation-gaps` and `blendutilities-not-generated` to confirm overlap with 117 and the resolution-divergence hypothesis (currently known only by name + Ada's hypothesis); keep the hypothesis falsifiable so it exits cleanly if disproven.
5. Exports raw-`.ts` hazard: confirm live consumer exposure (Increment 2); resolved in 3b regardless.

## Resolved Decisions (Peter, 2026-06-13)

1. **Generation issues** (`token-index-generation-gaps`, `blendutilities-not-generated`): Peter *suspects* resolution-related but is not certain; **Ada owns confirmation** via the Increment-2 parity harness. Hypothesis stays falsifiable — exits 118 cleanly if disproven.
2. **MCP-server ts-node: documented PRINCIPLED exception.** Principle: *bundled subsystems are exempt from the runtime-resolution contract because bundling resolves imports at build time; the contract governs non-bundled runtime TS.* Same principle exempts the browser bundle. **Pair with a boot/smoke guard on the MCP + browser bundles** so the exemption is not a silent corner — exception as coherent boundary, not carve-out.
3. **Module-direction disposition (not a commitment): forward / system-oriented.** Translation: design every increment **ESM-compatible** (keep the door open; don't entrench CJS-only patterns); **commit on Increment-2 evidence**, not now. If ESM cost (esp. the consumer-facing `jest-preset` blast radius) proves steep, deferral must be **deliberate and documented**, not reactive.
4. **Spec 117 handling: do NOT correct 117 now.** Instead, a 118 task/subtask **acceptance criterion** writes a **guidance note into 117's spec directory** *once 118 execution makes 117's path certain* — the note supersedes 117 decision-record item 3 and advises re-running 117's **own** Task 5.3 trust gate. (Replaces the earlier "correct decision-record soon" lean — 117 is parked, the regression risk is dormant, and one authoritative note beats a correct-now-revise-later.)
5. **Sequencing: 118 is first — drop everything.** Kickoff likely a few weeks out (monthly token budget); formalization starts fresh with full runway. All decisions captured here for the gap.

---

## Downstream Specs Gated on This Decision (122, 123)

Two specs are **direction-gated on 118**: they cannot formalize until 118 reaches its module-direction decision point (the runtime resolution / bundle-vs-tsx commitment), because their path-context and runtime assumptions depend on it.

- **Spec 122 — Agent Generator** (single canonical source → per-tool agent configs): `.kiro/specs/122-agent-generator/design-outline.md` (stub).
- **Spec 123 — Consumer Distribution** (`init --target`, dual path-context, MCP package-relative wiring, `sync` repair): `.kiro/specs/123-consumer-distribution/design-outline.md` (stub). The consumer dry-run's live bugs **F-C1/F-C2/F-C6 feed this spec's** evidence of consumer-side resolution incoherence.

Both were split out of Spec 121 (`.kiro/specs/121-claude-code-portability/`). 118's direction decision is their unblock condition.

## Relationship to Spec 117

**State B (empirically confirmed):** the proposed one-liner does **not** unblock the documented CLI — it relocates the failure one hop down the barrel chain. **117's `findings/decision-record.md` item 3 is empirically false** and must be corrected so the next reader doesn't trust the one-liner and regress. Increment 1 is 117's genuine prerequisite — but **117's restored trust is scoped narrowly to the config-load path**; the raw-`.ts` exports path stays unverified until Increment 3b. **117's readiness is a *natural consequence*, not a target:** Increment 1 only makes 117's gate *executable*; 117 lifts its own provisional status by re-running its **own** trust gate (Task 5.3), not by 118 asserting it. And Increment 1's scope is defined by config-loader *correctness*, never by what minimally expedites 117 — so the plan is not bent toward the unblock.

## Risks to Inventory (Ada/Lina)

- **Parity comparison must be normalized** (timestamps + ordering excluded) or the hard gate is a false-blocker / rubber-stamp.
- **Scope expansion** (not just blind swaps) is the OKLCH derail vector — enforced by the 3a/3b/3c per-surface gating.
- Self-reference exports (`@3fn/core/{blend,config,build}`) resolution under tsx — *require AND import*.
- `paths` vs exports-map — which resolves aliases at runtime today (tsx/esbuild don't honor tsconfig `paths` by default).
- **Typecheck-gate loss — named mitigation required:** ts-node full-typechecks scripts today; tsx never typechecks. Confirm `tsc` gates everything `generate:types` feeds *before* swapping that generator's loader (don't rely on the implicit ts-node typecheck).
- **Concentration risk** — tsx becomes the single runtime TS executor; **pin it tighter** than `^4.21.0`.
- **ESM cost is consumer-facing** — the shipped `@3fn/core/jest-preset` flip propagates to consuming products; inventory now so the direction decision is informed.

## Process Guard (Civitas)

The deepest pathology is process: this root cause was diagnosed three times and "resolved" twice via workarounds that silently regressed. The code guards (boot/smoke + static lint) must be paired with a governance rule — **an issue cannot close as "Resolved" via workaround-only.** And **118 becomes the single source of truth** for module resolution; the issue points here; 117's decision-record is corrected.

---

*Thinking document. North Star settled (make the system whole); diagnosis + scope empirically confirmed and Ada/Lina-validated; R1 feedback incorporated (fork escape-hatch, parity normalization, 3a/3b/3c scope gating, guard-polarity split, web-only insulation, consumer-facing jest-preset cost, typecheck mitigation, 117 trust scoping). The module-direction commitment and candidate loader selection are made **on Increment 2 evidence, in-spec, not assumed**. Formalization (requirements → Ada/Lina feedback → design → tasks) follows in a fresh session with adequate runway.*
