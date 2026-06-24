# Implementation Plan: Module-Resolution Coherence

**Date**: 2026-06-24
**Spec**: 118 - Module-Resolution Coherence
**Status**: Tasks draft — Ada/Lina task review incorporated (2026-06-24); Increment 1 + 2 + early-guards + 117 closeout + governance decomposed; direction-gated groups deferred pending R4 decision
**Leads**: Thurgood (diagnosis, formalization, verification, governance contract); Ada (runtime loader + pipeline mechanics, Rosetta); Lina (component static guard + test-infra alignment, Stemma)
**Sources**: `.kiro/specs/118-module-resolution-coherence/requirements.md` (settled, R2-incorporated); `.kiro/specs/118-module-resolution-coherence/design.md` (settled, design-review incorporated)
**Dependencies / relationships**:
- Spec 117 (Token-Index Generation Integrity) — Increment 1 is 117's genuine prerequisite; the 117 closeout (Task 6) rides Increment 1 completion. 117's restored trust is config-load-path-only until Increment 3b.
- Specs 122 (Agent Generator) and 123 (Consumer Distribution) — direction-gated on the Task 8 direction decision; they cannot formalize until R4/R5 lands.

---

## Implementation Plan

**Asymmetric by design, like the design document.** Increment 1 (loader → swap → consumer guard), Increment 2 (the parity orchestrator + four inventories + divergence test), the early direction-agnostic guards, the Spec 117 closeout, and the MCP/browser exception are **fully decomposed** below — they are buildable now and direction-agnostic (or decision-independent). The direction-gated work (Increments 3a/3b/3c, the static-lint polarity, the close-state coherence gate execution) is represented as **GATE-MARKED, deferred-decomposition task groups**: each carries its gate condition and a one-line scope, but its detailed task breakdown is **explicitly deferred to a second tasks pass after the Increment-2 evidence + the Requirement 4/5 direction decision**. Decomposing the gated groups now would require assuming the CJS-vs-ESM answer — the exact assume-the-answer failure this spec exists to end. (This mirrors Spec 117's informed-placeholder precedent, where Tasks 3.1/4.1 were left for Ada to concretize from the audit.)

**Two gates govern sequencing** (design § Architecture):
- **Evidence gate** — no swap before proof (Increment-2 green/red table gates every subsequent increment). Guards the *swap*.
- **Scope gate** — per-surface 3a → 3b → 3c sequencing, each CI-green before the next. Guards the *scope*.

**The Increment-1 critical path is the immediate work and the 117 unblock:** Task 1 (empirical loader selection) → Task 2 (contract-preserving swap inside `loadConfig`) → Task 3 (consumer-config subprocess guard) → Task 6 (117 closeout, rides Increment-1 completion). Tasks 1–3 do **not** assume a loader (A/B/C resolved by Task 1's decision procedure). Tasks 7–10 do **not** assume a direction (resolved by Task 8's decision gate).

**Agent ownership:** Thurgood — document structure, evidence-harness/guard *infrastructure*, governance/closeout mechanisms, spec-standards conformance, verification. Ada — runtime loader mechanics, parity-harness Rosetta semantics, exports reconciliation, whole-spec correctness review. Lina — component static-lint guard, jest-preset/test-infra alignment, browser/MCP boot-smoke guard. Peter — direction decision, ballot-measure approvals.

---

## Task List — Fully Decomposed (Increment 1, Increment 2, early guards, 117 closeout, MCP/browser exception)

- [x] 1. Empirical Loader Selection (Increment 1 — decision procedure, not a pre-pick) — **DONE: Approach A selected; B (tsImport-from-CJS) failed all rows. See `findings/loader-selection.md`.**

  **Type**: Investigation
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (loader mechanics); Thurgood (matrix-harness infra + finding record)

  **Decision procedure (NO assumed outcome — runs the design's § Increment 1 procedure):**
  - Stand up the resolution-matrix harness (**net-new**; may reuse the `tests/consumer-integration.test.ts` subprocess scaffold and the diagnosis reproduction described in requirements § Diagnosis as the starting point — do NOT assume a standing harness to extend). The diagnosis was *performed* and is documented in requirements § Diagnosis, but **no matrix harness was committed** (only `tests/consumer-integration.test.ts` exists as a reusable subprocess scaffold). The rows that MUST go green: **source-directory import** and **faithful-consumer** (compiled import + relative raw-`.ts` `./my-overrides`) — both currently fail with `Cannot find module` / `Directory import not supported`.
  - Exercise approaches A (`tsx/cjs/api` register + scoped `require`), B (`tsImport` via `import('tsx/esm/api')`), C (jiti — NOT installed, a budgeted new-dependency add) against the matrix, **each swapped inside `loadConfig`**, re-running the matrix for **both an ESM-authored and a CJS-authored config** (R2 AC4 — forward-compatibility is a HARD requirement; this is the test that prevents prejudging R4).

  **Accept-criteria (an approach is acceptable only if ALL hold):** (a) turns the failing matrix rows green; (b) passes for both CJS- and ESM-authored configs; (c) operates correctly within `loadConfig`'s CJS context (`__dirname`, no `import.meta` — the OQ-1 CJS-host/ESM-loader boundary, including the config's transitive relative raw-`.ts` requires); (d) preserves the `loaded.default || loaded` unwrap + the existing fail-loud `try/catch`; (e) **leaves no ambient/global residue after the call** (first-class criterion).

  **Selection consequence (do NOT pre-decide):**
  - When **both A and B pass → PREFER B** (`tsImport` self-scopes via `register({namespace: Date.now()})` per call, auto-tears-down → satisfies (e); zero new dependency).
  - **A wins only if B fails the CJS-boundary test (OQ-1).** If A wins, its `unregister()` lifecycle (A mutates `module._resolveFilename` globally; namespace only scopes requests) AND its coexistence with the bin's bare hook are certified by the Task 3 subprocess guard — not asserted. Note A's scoped `require` is **synchronous** (`ScopedRequire`); `await` on it is harmless — do not "fix" the apparent missing await.
  - If **both A and B fail → C (jiti)**, recorded as a budgeted new-dependency add and noted for the governance codification (Task 11). Naming jiti as fallback does not pick it.

  **Success Criteria:**
  - The matrix harness runs the source-dir + faithful-consumer rows for both ESM- and CJS-authored configs, swapped inside `loadConfig`.
  - A dated finding records which approach was accepted **and the evidence against accept-criteria (a)–(e)** — including the OQ-1 boundary result. No approach is recorded as accepted without (e) demonstrated.
  - IF C: the new dependency is named, version-pinned, and flagged for Task 11.

  **Primary Artifacts:** the resolution-matrix harness (under `tests/` / `src/__tests__/` infra); `findings/loader-selection.md` (the dated decision record).
  **Completion Documentation:** Detailed `.../completion/task-1-completion.md`; Summary `docs/specs/.../task-1-summary.md`.

  - [x] 1.1 Stand up the resolution-matrix harness (net-new; both directions, in-`loadConfig`)
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Thurgood (infra) + Ada
    - Build the executable matrix exercising the source-dir + faithful-consumer rows through `loadConfig`, with both an ESM-authored (`export default` + ESM transitive imports) and a CJS-authored (`require()`) fixture. **Net-new construction** — may reuse the `tests/consumer-integration.test.ts` subprocess scaffold and the requirements § Diagnosis reproduction as the starting point; do NOT assume a standing diagnosis harness to extend (none was committed).
    - _Requirements: 2.2, 2.4_

  - [x] 1.2 Exercise A/B/C against the matrix and record the accept-criteria evidence
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada
    - Run each approach swapped inside `loadConfig`; capture (a)–(e) per approach, with OQ-1 (CJS-host/ESM-loader boundary + transitive raw-`.ts` requires) explicitly tested. Prefer B when A and B both pass; A wins only on B's CJS-boundary failure; C if both fail (budgeted dep).
    - _Requirements: 2.1, 2.3, 2.4_

- [x] 2. Contract-Preserving Swap Inside `loadConfig` (Increment 1 keystone) — **DONE: Approach A via an injectable loader seam (no `JEST_WORKER_ID` production fork). See `completion/task-2-completion.md`.**

  **Type**: Implementation
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Why here:** this is the keystone primitive that ships first and unblocks Spec 117. The swap substitutes **only** the body of the `try` block at `ConfigLoader.ts:57-65` (the single `await import(configPath)` at line 59), using the loader Task 1 selected. **Swap inside `loadConfig`, never via bin hooks** (R2 AC5, Decision 3) — this preserves all five verified callers by construction and removes the ambient-loader coupling.

  **Contract to preserve (verified caller inventory):** `src/cli/designerpunk.ts:106,185`; `src/cli/validate.ts:28`; `src/cli/validateProductTokens.ts:15`; `scripts/generate-platform-tokens.ts:50-51`; re-export `src/config/index.ts:6`. Non-callers that must NOT change: `generateTokenFiles` (consumes the resolved object), `ReleasePipeline.ts:125`'s private `loadConfig` (name-collision reading `release-config.json`).

  **Coherent-intermediate note (Resolution 2 / E13):** the `bin`'s bare `register()` (`bin/designerpunk.js:16`) **persists** — it serves a separate, still-needed job (executing the CLI's own source) and is retired only by Increment 3a. Forcing its removal into Increment 1 would be scope-creep and would couple Increment 1's shippability to the CLI boot path. The interim coexistence is **certified by the Task 3 subprocess guard**, not assumed.

  **Success Criteria:**
  - The swap replaces only the `try`-block body; preserves `loaded.default || loaded`, `configDir = path.dirname(configPath)`, and the fail-loud `Failed to load ${configPath}: ${message}` re-wrap.
  - The Task 1 matrix rows go green for both CJS- and ESM-authored configs; a TS-resolution failure surfaces as a thrown error (never a partial/empty config).
  - All five verified callers still function; the two non-callers are untouched.
  - IF approach A: the `unregister()` is called after the load (part of A's acceptance, not optional).
  - Increment 1 is independently CI-green-gated; scope is config-loader correctness, NOT "what expedites Spec 117" (R2 AC7).

  **Primary Artifacts:** `src/config/ConfigLoader.ts` (the swapped `try` block); any loader-helper module Ada introduces.
  **Completion Documentation:** Detailed `.../completion/task-2-completion.md`; Summary `docs/specs/.../task-2-summary.md`.

  - [x] 2.1 Apply the contract-preserving swap; re-run the matrix; verify all callers
    **Type**: Implementation · **Validation**: Tier 3 · **Agent**: Ada
    - Substitute the `try`-block body with the Task-1 loader; preserve unwrap + fail-loud; re-run the matrix (both directions); smoke each of the five callers; confirm the two non-callers untouched. IF A: assert `unregister()` lifecycle.
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [x] 3. Consumer-Config Subprocess Boot/Smoke Guard (Increment 1) — **DONE: faithful guard (real bin subprocess) + `consumer-guard.yml` lane; lane green (6 pass, 1 skip). Surfaced + fixed the `./config` exports barrier (Option C) and skipped the pre-existing validator defect (tracked). See `completion/task-3-completion.md`.**

  **Type**: Guard
  **Validation**: Tier 2 - Standard
  **Agent**: Lina (test-infra mechanics); Thurgood (CI-gate wiring + standing-guard discipline)

  **Why subprocess, not in-process (Lina MF-A — the most important correction):** the guard MUST run through the **CLI/bin subprocess path** (pack → install → `npx designerpunk generate`, like `tests/consumer-integration.test.ts`), NOT an in-process `loadConfig()` under ts-jest. In-process, jest intercepts `await import()` and never hits Node's strict-ESM resolver — proven by `ConfigLoader.test.ts` passing today **despite the production path being broken**. An in-process guard would go green against the very bug it guards (false negative).

  **Success Criteria:**
  - Loads a faithful consumer config (compiled import + relative raw-`.ts` `./my-overrides`) through the subprocess/bin path; fails loud if resolution breaks (R3 AC1).
  - **Standing and preventive** — repeatable, **non-skippable required CI** (Resolution 1 / E12 — tie to the Civitas process-guard in Task 11). Not an optional slow test.
  - **Two faithful fixtures (R3 AC3):** an ESM fixture using **real `export default` + ESM-syntax transitive imports**, and a CJS fixture using **real `require()`** — both via subprocess. A `module.exports`-in-`.ts` fixture is explicitly forbidden (jest-transform artifact, neither faithful CJS nor ESM).
  - **Positive sentinel assertion (Lina SF-A):** asserts a sentinel value that **only the transitive `./my-overrides` import produces** (e.g. a sentinel token/theme), NOT merely "resolved config is not DEFAULTS" (DEFAULTS only triggers on the no-file branch, so "not DEFAULTS" would pass a partial transitive-break).
  - Exercises the bin path (`npx designerpunk generate`), thereby **certifying the Increment-1/bin-hook coexistence** (Task 2's coherent intermediate).

  **Scope boundary:** this is the Increment-1 config-load guard ONLY. The **shipped-preset close-state guard (R3 AC4)** is a different guard, exercised at the escape-hatch close — it is gate-deferred to Group 10, NOT Increment-1 scope.

  **Primary Artifacts:** consumer-guard test in the `tests/consumer-integration.test.ts` family (subprocess/bin path); two faithful fixtures (ESM + CJS) with sentinel-bearing `./my-overrides`; **the minimal consumer-guard CI workflow** (e.g. `.github/workflows/consumer-guard.yml` running `test:consumer` as a required PR check on `main`) created by Task 3.2 — the host the guard attaches to as non-skippable/required.
  **Completion Documentation:** Detailed `.../completion/task-3-completion.md`; Summary `docs/specs/.../task-3-summary.md`.

  - [x] 3.1 Build the subprocess consumer guard with two faithful fixtures + sentinel assertion
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - **Extend the existing `describe`/`beforeAll` in `tests/consumer-integration.test.ts:25-40`** (pack→install→`npx designerpunk init`→`npx designerpunk generate`), adding the two faithful fixtures + sentinel assertion as new `it` blocks — reusing the proven subprocess scaffold, NOT a from-scratch build. Author the ESM + CJS faithful fixtures (real `export default` / real `require()`, transitive raw-`.ts` `./my-overrides` carrying a sentinel); run via the pack→install→`npx designerpunk generate` flow; positive-assert the sentinel.
    - _Requirements: 3.1, 3.2, 3.3, 2.4_

  - [x] 3.2 Create the minimal consumer-guard CI lane and wire the guard into it as non-skippable/required
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Thurgood
    - **118 owns standing up the minimal consumer-guard CI lane.** Verified: the repo has NO test-running CI (only `.github/workflows/package-name-drift.yml`; no `npm test`/`test:consumer`/jest in any workflow; no husky), so "non-skippable required CI" currently has no host. Create the minimal CI workflow (e.g. `.github/workflows/consumer-guard.yml` running `test:consumer` as a required PR check on `main`) and wire this guard into it as non-skippable/required (Resolution 1); cross-link to the Task-11 Civitas process-guard so it cannot be quietly skipped.
    - **Rationale:** R1 AC5 requires enforcement that "cannot silently erode" — a guard with no CI host is a local test someone must remember to run, the exact silent-erosion failure this spec fights.
    - **Scope discipline:** this is the *minimal lane this spec's guards need* (Tasks 3/4/5 guards attach to it) — NOT a general CI overhaul.
    - **In-repo documentation (interim — closes the folk-knowledge gap before the Task-11 steering codification):** when the lane is built, add a short note — a header comment in the workflow file and/or a brief `tests/`/`docs/` entry — recording that this is the standing CI home for the spec's guards and that new guards attach here. The lane lands in Increment 1; the steering-level practice codification rides Task 11.
    - **Success criteria:** the workflow file exists and runs `test:consumer` as a required PR check on `main`; the consumer guard runs in it non-skippably; the lane is the host Tasks 4/5 guards also attach to; the in-repo lane note exists.
    - _Requirements: 3.2_

- [ ] 4. Early Direction-Agnostic Guards (land early, NOT gated on the decision)

  **Type**: Guard
  **Validation**: Tier 2 - Standard
  **Agent**: Lina (dynamic-import smoke + lint tooling); Thurgood (CI wiring)

  **Why early:** these guards are direction-agnostic (R10 AC2; Conditional & Escape-Hatch Notes). They land alongside Increment 1/2 to provide defense before the contract erodes. The **browser-bundle guard is NOT here** — it is owned by Task 5 (R12, single owner); R10 references it so the set is complete-by-reference and the guard is neither double-built nor gapped.

  **Success Criteria:**
  - **Dynamic-import smoke test (R10 AC2a — preventive, named as such):** a **jest source-scan test** (a *presence assertion*) asserting no web component source introduces an extensionless/raw-`.ts` runtime dynamic `import()`. No framework needed — it rides existing jest infra (and the CI lane Task 3.2 creates). Verified seed fact: `grep` of `src/components` for dynamic `import(` (excluding tests/type-imports) returns **zero** today — so this guards a *future* regression, not an active failure mode.
  - **Static-lint tooling (R10 AC3 — tooling only, polarity DEFERRED):** the static-lint *policy* is an import-specifier rule — idiomatically an **ESLint rule**. Verified: NO ESLint/Biome/oxlint/lint framework, config, script, or dep exists in the repo, so this is a **genuine framework add** (a new dev dependency to budget). The lint-rule scaffold + CI wiring MAY be built now, folding in selecting + installing ESLint scoped to just this rule on web source (a minimal config); its **policy/polarity is NOT set here** (it inverts CJS↔ESM and is gated on the Task 8 decision — see Group 9). Building the tooling without polarity is the explicitly correct move.
  - **Both guards attach to the consumer-guard CI lane Task 3.2 creates** (no separate CI host).
  - **Lint scope (R10 AC4):** scoped to **web source ONLY**. iOS-Swift / Android-Kotlin are categorically out (never traverse Node resolution). Build-time validation dynamic imports (`MathematicalConsistencyValidator.ts:330-331`, static-string literals) resolve via the runtime mechanism (3a's lane), NOT the web static-bundle path → out of the web-source lint's scope.

  **Primary Artifacts:** dynamic-import smoke test (jest source-scan over web-component source); the static-lint rule scaffold (a minimal ESLint config + the new ESLint dev dependency, scoped to the module-resolution rule on web source) + CI wiring on the Task-3.2 lane (polarity left unset).
  **Completion Documentation:** Detailed `.../completion/task-4-completion.md`; Summary `docs/specs/.../task-4-summary.md`.

  - [ ] 4.1 Dynamic-import smoke test (preventive — jest source-scan)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - A **jest source-scan test** (presence assertion) asserting zero extensionless/raw-`.ts` runtime dynamic `import()` in web component source; name it preventive. No framework needed — rides existing jest infra and the Task-3.2 CI lane. Name its home in the web-component test tree.
    - _Requirements: 10.2_

  - [ ] 4.2 Static-lint tooling scaffold (scoped ESLint add; polarity deferred to Group 9)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - Select + install ESLint scoped to just the module-resolution rule on web source (a minimal config — this is a **genuine framework add**, a new dev dependency to budget, since no linting exists today). Build the lint-rule scaffold + CI wiring (on the Task-3.2 lane) scoped to web source only; leave the polarity/policy unset pending the Task-8 decision; document that the polarity is gate-deferred (Group 9). **Scope discipline:** a minimal ESLint config scoped to the module-resolution rule on web source — NOT a repo-wide ESLint adoption (linting the whole existing codebase is a separate concern 118 does not own).
    - _Requirements: 10.1, 10.3, 10.4_

- [ ] 5. MCP/Browser Principled Exception + Paired Boot/Smoke Guard (R12 — single owner)

  **Type**: Guard
  **Validation**: Tier 2 - Standard
  **Agent**: Lina (boot/smoke mechanics); Thurgood (boundary documentation infra — proposed via ballot in Task 11)

  **Why single owner:** the browser bundle and MCP servers are exempt on the **same** principle (bundling resolves imports at build time); their boot/smoke guard is one guard family, **built once here** (Decision 6). R10 AC2b references it.

  **Success Criteria:**
  - The exemption boundary is documented: which subsystems are exempt (the three esbuild-bundled MCP servers — application, docs, product — and the browser bundle) and **why** (bundling resolves at build time). Documented as a **coherent boundary**, cross-referenced from the Task-11 governance codification, NOT a silent carve-out (R12 AC1, AC3). (The steering wording itself rides the Task-11 ballot measure.)
  - **MCP guard (subprocess spawn):** spawns each bundled MCP server (`dist/mcp/*.js`, which auto-start under `require.main === module`) and **waits for the `running on stdio` stderr sentinel** (the `waitForReady`-on-stderr pattern already in `consumer-integration.test.ts:121-132`), failing if the process exits/throws first. "Boot far enough to catch a resolution error" = reaches `running on stdio` (verified `application-mcp-server/src/index.ts:362-388`). Fails the CI step if any throws on boot.
  - **Browser guard (jest-jsdom):** a **jest-jsdom test that `import()`s `dist/browser/designerpunk.esm.js`** and asserts a custom element is defined (e.g. `customElements.get('button-cta')`), since the bundle calls `customElements.define` at module top-level and needs a DOM (jsdom IS installed) — confirming it registers its custom elements without a resolution error (R12 AC2). This is the guard R10 AC2b references. Do NOT `node dist/browser/...esm.js` in bare Node — `customElements` is undefined there, a false signal, not a resolution error.
  - **Build-before-guard dependency:** both guards **depend on `build:mcp` / `build:browser` having run** — CI must sequence build-before-guard, or the guard greens trivially on a missing/stale `dist/`.
  - The MCP servers' own **ts-node dev configs** are carried as a **documented principled exception per Resolved Decision 2** — NOT "reconciled" (that wording is retired; Decision 2 closed the question). Paired with the boot/smoke guard (R12 AC4).

  **Primary Artifacts:** MCP boot/smoke guard (subprocess spawn over `dist/mcp/*.js`, stderr `running on stdio` sentinel); browser-bundle boot/smoke guard (jest-jsdom `import()` of `dist/browser/designerpunk.esm.js`, asserts a defined custom element); CI build-before-guard sequencing (`build:mcp` / `build:browser` first); the exemption-boundary note (its steering form proposed in Task 11).
  **Completion Documentation:** Detailed `.../completion/task-5-completion.md`; Summary `docs/specs/.../task-5-summary.md`.

  - [ ] 5.1a MCP boot/smoke guard (subprocess spawn + stderr sentinel)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - Subprocess-spawn each bundled MCP server (`dist/mcp/*.js`, auto-start under `require.main === module`); wait for the `running on stdio` stderr sentinel (the `waitForReady`-on-stderr pattern in `consumer-integration.test.ts:121-132`); fail if the process exits/throws before the sentinel. Reaching `running on stdio` = booted far enough to catch a resolution error (verified `application-mcp-server/src/index.ts:362-388`). Depends on `build:mcp` having run.
    - _Requirements: 12.1_

  - [ ] 5.1b Browser boot/smoke guard (jest-jsdom import)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - A jest-jsdom test that `import()`s `dist/browser/designerpunk.esm.js` and asserts a custom element is defined (e.g. `customElements.get('button-cta')`), since the bundle calls `customElements.define` at module top-level and needs a DOM (jsdom IS installed). Do NOT `node dist/browser/...esm.js` in bare Node (`customElements` undefined → false signal). Depends on `build:browser` having run.
    - _Requirements: 12.2_

  - [ ] 5.2 Document the exemption boundary + ts-node dev-config exception
    **Type**: Documentation · **Validation**: Tier 2 · **Agent**: Thurgood
    - Draft the coherent-boundary documentation (exempt subsystems + rationale + ts-node dev-config principled exception); stage it for the Task-11 ballot measure and cross-reference.
    - _Requirements: 12.3, 12.4_

- [ ] 6. Spec 117 Closeout (R11 — rides Increment-1 completion)

  **Type**: Documentation
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood

  **Acceptance criterion (the closeout mechanism, Resolved Decision 4):** **once Increment 1 (Tasks 1–3) makes Spec 117's config-load path certain**, write a **guidance note into Spec 117's spec directory** (`.kiro/specs/117-token-index-generation-integrity/findings/118-closeout-note.md`), cross-referenced from 117's decision-record. This task is gated on Increment-1 completion and is its natural consequence — NOT a 117-expediting scope driver.

  **What the note SHALL say:**
  - It **supersedes 117 `findings/decision-record.md` item 3** (the empirically-false claim that the one-line directory-import fix unblocks the documented CLI — verified false: the one-liner relocates the failure one hop down the barrel chain). The note states the actual fix is the Increment-1 loader replacement.
  - It **advises re-running 117's own Task 5.3 trust gate** — Increment 1 only makes that gate *executable*; it does not lift 117's provisional status (R11 AC4).
  - It **scopes restored trust narrowly to the config-load path ONLY** (R11 AC3). The raw-`.ts` exports path stays unverified until Increment 3b (Group 9).

  **What the note SHALL NOT do:** assert 117's readiness on 117's behalf (R11 AC4); correct 117 in-place now (R11 AC5 — one authoritative note beats a correct-now-revise-later edit).

  **Success Criteria:**
  - The guidance note exists in 117's directory with the three contents above, cross-referenced from 117's decision-record.
  - The note's existence + content is the satisfied acceptance criterion; 117's status lift remains 117's own action (re-running its Task 5.3).

  **Primary Artifacts:** `.kiro/specs/117-token-index-generation-integrity/findings/118-closeout-note.md`; cross-reference entry in 117's decision-record.
  **Completion Documentation:** Detailed `.../completion/task-6-completion.md`; Summary `docs/specs/.../task-6-summary.md`.

  - [ ] 6.1 Write the 117 guidance note (gated on Increment-1 completion)
    **Type**: Documentation · **Validation**: Tier 2 · **Agent**: Thurgood
    - Author the note (supersedes item 3; advises 117 Task 5.3 re-run; scopes trust to config-load path only); cross-reference from 117's decision-record. Do NOT correct 117 in-place; do NOT lift 117's status on its behalf.
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [ ] 7. Increment 2 — Evidence Harness, Inventories, Divergence Test (investigation-only — NO swaps)

  **Type**: Investigation
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (parity semantics, divergence hypothesis, exports/ESM-cost analysis); Thurgood (orchestrator infra + evidence-table assembly)

  **Hard constraint (R4 AC1):** Increment 2 performs **investigation only** — NO runtime-mechanism swap, NO exports reconciliation, NO module-direction migration. No fix is applied during Increment 2. It follows Increment 1 and produces the green/red evidence table that **informs but does not pre-decide** the Task-8 direction decision.

  **Parity orchestrator (Decision 2 + Ada MF-1 seam correction):** reuse Spec 117's `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)` **directly** (both standalone/public; `compare` is symmetric) via a **NEW thin parity orchestrator**. These are **per-artifact, not per-tree** — so the orchestrator iterates an **artifact list** (path + `ArtifactKind`), reading each path from root A (ts-node-produced) and root B (tsx-produced) scratch dirs and comparing per-artifact. It borrows `INVENTORY: ArtifactRef[]` (`src/tools/integrity/inventory.ts:22`) as the **reusable artifact-list driver** (even though it bypasses `GenerationIntegrityCheckImpl`). **Do NOT route through `GenerationIntegrityCheckImpl`** — it is hardwired to committed-vs-fresh (one `FreshGenerator` + `readCommitted()`) and cannot ingest two fresh trees. `DiskFreshGenerator` remains reusable as a per-tree reader, but is NOT the two-tree seam. A second normalization engine is forbidden (it would be its own incoherence). Open: the orchestrator likely needs only **two roots**, not the `FreshGenerator` abstraction — Ada confirms during construction.

  **Volatile-field set (R4 AC4 / OQ-2 — open, evidence-driven, NOT a closed list):** enumerate from actual two-mechanism output. Seed set from the design's verified table: ISO timestamps + `generatedAt` (covered by 117's `Normalizer` — reuse); `rosettaVersion` (`src/generators/DTCGFormatGenerator.ts:226-236` — **ADD**); embedded `version` (**EVALUATE/add for class-completeness**); `extensions.themes` array (`src/generators/DTCGFormatGenerator.ts:240-242` — **ENUMERATE + flag BOTH presence AND array-ordering as false-diff vectors**: it is **conditionally present** (emitted behind a `registeredThemes.length > 0` guard, `DTCGFormatGenerator.ts:241-242`), and `SemanticComparator` compares arrays positionally — so both conditional-presence and ordering are candidate normalizations); `Generated:` header comments (covered incidentally — confirm the `///` Swift form matches); build-timing/`duration` (ENUMERATE from output); key ordering (covered). The volatile-field source files are `src/generators/DTCGFormatGenerator.ts` / `src/generators/TokenFileGenerator.ts` (NOT `src/build/generators/`). token-index YAML is **clean** (`generateTokenIndex.ts:173-187`) — no normalization needed. A raw byte-diff is rejected. Each added rule gets a unit test (neutralizes the intended field and nothing else).

  **Divergence hypothesis (R4 AC7 — falsifiable, bounded, correlation-not-causation):** test whether `token-index-generation-gaps` / `blendutilities-not-generated` correlate with resolution divergence, with a **clean exit**. "Confirmed" = resolution divergence is a *plausible contributor* → escalate to root-cause (NOT proven cause). "Disproven" = the generation-gap work exits Spec 118's scope cleanly via a documented routing finding (not silent carry). Ada owns confirmation (Resolved Decision 1).

  **Success Criteria:**
  - **Entry-point inventory (R4 AC2):** every runtime TS entry point inventoried — `bin` (tsx/cjs), the 11 ts-node scripts, the three esbuild-bundled MCP servers (exempt), the browser bundle (exempt), tests (ts-jest).
  - **Export-condition inventory (R4 AC5):** all export conditions inventoried — including the import-only/require-only asymmetry (`.`/`./components` import-only; `./jest-preset` require-only; `./testing` both) and the three raw-`.ts` subpaths (`./blend`, `./build`, `./types`), each carrying `import` + `require` + **`types`** all → raw `.ts`. A `require('@3fn/core')` resolving nothing is noted as a coherence question carried into Group 9 (Increment 3b).
  - **ESM-cost inventory incl. jest-preset blast radius (R4 AC6):** the shipped `@3fn/core/jest-preset` (require-only/CJS, Spec 105) named; its `moduleNameMapper` raw-`.ts` entries (`src/testing/jest-preset.ts:53-59`) named as coupling it to the Group-8 exports reconciliation (NOT a one-line `testEnvironment` flip); **parking-form determination (OQ-3)** — whether a coherent CJS `.cjs`/require-only form exists that survives a `"type":"module"` flip.
  - **Parity harness + green/red evidence table (R4 AC3, AC8):** produced via the new orchestrator over normalized two-mechanism output; includes a typecheck-coverage row (feeds the Group-7 3a mitigation) and the divergence-hypothesis disposition row.
  - The table **informs but does not pre-decide** the direction; NO swap/reconcile/migrate occurred.

  **Primary Artifacts:** the new parity orchestrator (thin glue over reused `Normalizer`/`SemanticComparator`); extended `NormalizationRule[]` + per-rule unit tests; `findings/entry-point-inventory.md`, `findings/export-condition-inventory.md`, `findings/esm-cost-inventory.md` (incl. parking-form determination), `findings/divergence-hypothesis.md`, `findings/evidence-table.md`.
  **Completion Documentation:** Detailed `.../completion/task-7-completion.md`; Summary `docs/specs/.../task-7-summary.md`.

  - [ ] 7.1 Build the parity orchestrator (reuse 117 engine; new two-fresh-tree seam)
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada + Thurgood
    - Thin orchestrator over the **per-artifact** `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)` (NOT per-tree): iterate an artifact list (path + `ArtifactKind`), read each path from root A and root B, compare per-artifact. Borrow `INVENTORY: ArtifactRef[]` (`src/tools/integrity/inventory.ts:22`) as the reusable artifact-list driver. Read two fresh roots directly (NOT `GenerationIntegrityCheckImpl`); confirm whether two roots suffice without `FreshGenerator`.
    - _Requirements: 4.1, 4.3_

  - [ ] 7.2 Enumerate + unit-test the volatile-field normalization set (OQ-2)
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada
    - Generate via both mechanisms; diff per-artifact; add each non-semantic divergence (rosettaVersion, embedded version, `extensions.themes` **conditional-presence + array-ordering**, duration, …) as a unit-tested rule; iterate until only semantic divergences remain. Volatile-field sources are under `src/generators/` (`DTCGFormatGenerator.ts` / `TokenFileGenerator.ts`).
    - _Requirements: 4.4_

  - [ ] 7.3 Entry-point, export-condition, and ESM-cost (jest-preset + parking-form) inventories
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada
    - Produce the three inventories; name the preset `moduleNameMapper` raw-`.ts` coupling (`src/testing/jest-preset.ts:53-59`) to Group 8; determine the OQ-3 parking form (final confirmation deferred to a `.cjs`-under-`"type":"module"` boot through the Group-10 close-state guard).
    - _Requirements: 4.2, 4.5, 4.6_

  - [ ] 7.4 Divergence-hypothesis test (falsifiable, clean-exit) + assemble the evidence table
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada + Thurgood
    - Establish correlation-not-causation; disposition plausible/refuted with a clean-exit routing finding if refuted; assemble the green/red table (incl. typecheck-coverage + hypothesis rows).
    - _Requirements: 4.7, 4.8_

- [ ] 8. Module-Direction Decision Point (R5 — the gate that unblocks the deferred Increment-3 Groups 9/10 AND Specs 122/123)

  **Type**: Investigation
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Peter (the commitment); Ada (evidence interpretation); Thurgood (records the decision)

  **Reads the ASSEMBLED table (Ada SF-4):** Task 8 cannot start until **Task 7.4 is complete and the evidence table is fully assembled** (including the typecheck-coverage row) — it reads the assembled table, not partial inventories.

  **This is the explicit gate task.** WHEN the Task-7 evidence table is complete THEN the spec SHALL **commit to exactly one direction** — CJS-consistency OR native ESM — **on the evidence** (including the jest-preset blast radius), NOT pre-assumed. The direction SHALL NOT be left undecided. Whichever direction, the end-state satisfies the R1 contract and the **runtime TS-config loader persists** (the anchor fact).

  **Escape-hatch (R5 AC5 — defers EXECUTION, never the DECISION):** IF native ESM is committed AND the Increment-2 cost (especially the jest-preset blast radius) is prohibitive (judgment-based, Peter — no quantitative floor) THEN the ESM consolidation *execution* (3c, including preset migration) MAY spin into a dedicated follow-on spec — but Spec 118 still decides the direction and closes on a guard-certified coherent intermediate (Group 10).

  **Success Criteria:**
  - Exactly one direction is committed and recorded with rationale (feeds the Task-11 governance codification).
  - The decision rests on the Task-7 evidence; this task does NOT assume an answer.
  - The decision **unblocks the second tasks pass** that decomposes Groups 9/10 (Increment 3a/3b/3c + lint polarity + close-state gate), and unblocks Specs 122/123 formalization.

  **Primary Artifacts:** `findings/direction-decision.md` (the committed direction + rationale + escape-hatch disposition).
  **Completion Documentation:** Detailed `.../completion/task-8-completion.md`; Summary `docs/specs/.../task-8-summary.md`.

  - [ ] 8.1 Commit one direction on the Increment-2 evidence; record rationale + escape-hatch disposition
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Peter (decision); Thurgood (records)
    - Read the evidence table; commit CJS-consistency or native ESM; record rationale; if ESM + prohibitive cost, record the escape-hatch election (defer 3c execution to a follow-on spec, onto a Group-10 guard-certified close-state).
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 11. Governance — Codify the Contract in Steering (R9 — ballot measure)

  **Type**: Governance
  **Validation**: Tier 2 - Standard
  **Agent**: Thurgood (drafts proposals; Peter approves — agents do not edit steering directly)

  > **Numbered 11 deliberately** so the gate-deferred Increment-3 groups (Group 9 = 3a/3b/3c + lint polarity, Group 10 = close-state coherence gate) take the intervening numbers when the second tasks pass decomposes them. Governance lands at/near the end but does NOT depend on Groups 9/10 executing — it codifies the contract + the Task-8 direction decision (and any deferred-execution cost) once the direction is committed.

  **Success Criteria:**
  - The module-resolution contract is **proposed for steering codification via the ballot-measure process** (Peter approves; agents do not edit steering directly) — as the system's module-resolution law.
  - The **committed direction (Task 8)** and its rationale are documented; IF any execution is deferred (escape-hatch), its **triggers and inventoried cost** are documented — not folk knowledge.
  - The MCP/browser exemption boundary (Task 5.2) is incorporated as a coherent documented boundary.
  - **Process guard (Civitas):** the codification states an issue cannot close as "Resolved" via workaround-only, and that **Spec 118 is the single source of truth for module resolution** (downstream readers routed here). The non-skippable consumer guard (Task 3.2) is tied to this process guard.
  - WHEN steering docs are modified THEN the **docs MCP index is rebuilt** so served guidance is current.
  - **New shared practices this spec introduced are codified — honestly, at the right altitude:** (a) the **CI-enforced-guards practice** — guards are enforced via required CI and new guards attach to the consumer-guard/test-CI lane (Task 3.2); codified in **Test-Development-Standards.md**, tied to the Civitas process guard. (b) the **ESLint-exists tooling fact** — ESLint now exists in the repo, **scoped to the module-resolution rule on web source** (Task 4.2), recorded in **Technology Stack.md** / **BUILD-SYSTEM-SETUP.md**. The CI/guard-enforcement is a genuine new practice; the lint is **narrow and explicitly NOT a repo-wide adoption** — that remains an undecided future decision tracked in `docs/roadmap/m0a-deferred-items.md`, not asserted as a practice here.

  **Counter-argument to weigh before proposing (Thurgood's obligation):** codifying the contract while Groups 9/10 are still gate-deferred risks steering describing an end-state the system has not fully reached. **Response:** the contract + the committed direction ARE settled at this point (Task 8); the codification should distinguish the *settled contract/direction* from the *deferred execution* (whose triggers/cost it documents per AC3) — so it codifies law without overclaiming completion. Flag this distinction explicitly in the ballot proposal.

  **Primary Artifacts:** ballot-measure proposal(s) for the steering contract + direction decision + deferred-cost + Civitas process guard + the MCP/browser boundary + the two new-practices codifications (CI-enforced-guards → Test-Development-Standards.md; ESLint-exists tooling fact → Technology Stack.md / BUILD-SYSTEM-SETUP.md); post-approval docs-MCP rebuild.
  **Completion Documentation:** Detailed `.../completion/task-11-completion.md`; Summary `docs/specs/.../task-11-summary.md`.

  - [ ] 11.1 Draft the ballot-measure steering proposal (contract + direction + deferred-cost + process guard)
    **Type**: Governance · **Validation**: Tier 2 · **Agent**: Thurgood → Peter
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ] 11.2 On approval, apply the steering change and rebuild the docs MCP index
    **Type**: Governance · **Validation**: Tier 2 · **Agent**: Thurgood (apply as approved) + Peter (approval)
    - _Requirements: 9.5_

---

## Task List — GATE-MARKED, Deferred-Decomposition Groups (direction-gated; decomposed in a second tasks pass)

> **Why these are not decomposed now (the discipline that defines this spec).** The detailed task breakdown for Groups 9 and 10 is **explicitly deferred until after the Increment-2 evidence (Task 7) + the Requirement 4/5 direction decision (Task 8)**. Decomposing them now would require assuming the CJS-vs-ESM answer — the assume-the-answer failure that produced the April→June→117 cycle. This mirrors Spec 117's informed-placeholder precedent (its Tasks 3.1/4.1 were left for Ada to concretize from the audit). **A second tasks pass fills these in post-decision.** Each group below carries only its **gate condition** and a **one-line scope** — no full-depth subtasks, by design.
>
> The detailed task numbers are assigned in the second tasks pass. **Group 9** decomposes into Increment 3a → 3b → 3c (scope-gated, each its own task) plus the static-lint polarity task; **Group 10** decomposes the close-state coherence gate execution (ESM-escape-hatch branch, sequenced inside/alongside 3c). Task 11 (Governance) is already authored above and sits after them.

- [ ] 9. **[GATE-DEFERRED]** Increment 3 — Direction Execution (3a → 3b → 3c, scope-gated per-surface)

  **Gate condition:** unblocked by Task 8 (direction committed). **Scope gate:** 3a CI-green **before** 3b CI-green **before** 3c. Decomposition deferred to the post-decision tasks pass.

  - **[GATE-DEFERRED] Increment 3a — Runtime Mechanism Unification (R6).** One-line scope: unify on one runtime TS-execution mechanism for non-bundled runtime TS (retire the tsx-bin / ts-node-scripts split); this is where the `bin`'s bare `register()` is finally retired. **Pre-committed regardless of direction (decompose in pass 2):** the **typecheck-gate-loss mitigation (R6 AC3)** — confirm `tsc` (or a dedicated step) covers **both** the fed artifacts **and** the `scripts/**` generators (excluded by `tsconfig.json` `include: ["src/**/*"]`; ts-node is presently the only thing typechecking them) **before** swapping the loader `generate:types`/`prebuild` rely on. Direction-conditional (resolved by Task 8): CJS → standardize tsx + retire ts-node + **pin tsx tighter than `^4.21.0`** + pin-bump review gate; ESM → the ESM-required mechanism (under-specified until the decision).
    - _Requirements (for the pass-2 decomposition): 6.1, 6.2, 6.3, 6.4, 6.5_

  - **[GATE-DEFERRED] Increment 3b — Package Exports Reconciliation (R7).** One-line scope: reconcile `./blend`, `./build`, `./types` (all raw-`.ts`, all three conditions `import`/`require`/**`types`**) to coherent runtime resolution; **this is where Spec 117's exports path finally certifies** (until 3b, 117 trust stays config-load-path-only). Pass-2 decomposition must account for: self-reference exports (`require`+`import`); `paths`-vs-exports (tsx/esbuild do not honor tsconfig `paths` by default — confirm); and the **two-copies-in-lockstep** consumer mapping (Ada SF-5) — the `init`-written `tsconfig.test.json` `paths` (`init.ts:139-145`) AND the preset `moduleNameMapper` (`jest-preset.ts:53-59`), same 5 entries, plus the `init`-written `jest.config.js`.
    - _Requirements (for the pass-2 decomposition): 7.1, 7.2, 7.3, 7.4_

  - **[GATE-DEFERRED] Increment 3c — Module-Direction Execution (R8) + Close-State Coherence Gate execution (see Group 10).** One-line scope: apply the committed direction across the relevant surfaces; CI-green-gated, begins only after 3a + 3b green; never leaves the system more incoherent (certified by the consumer-surface coherence guard, not asserted). The **`.cjs` preset rename is sequenced HERE** (confirmed in Inc-2, executed only under the committed direction — Resolution 4 / E15). ESM variant = escape-hatch candidate (execution may defer to a follow-on spec per Task 8).
    - _Requirements (for the pass-2 decomposition): 8.1, 8.2, 8.3, 8.4_

  - **[GATE-DEFERRED] Static-lint policy/polarity (R10 AC3).** One-line scope: set the lint polarity the Task-4 tooling left unset — CJS **bans** explicit extensions; ESM **REQUIRES** explicit `.js`; web source only. Polarity is set in pass 2 because it inverts CJS↔ESM.
    - _Requirements (for the pass-2 decomposition): 10.3_

- [ ] 10. **[GATE-DEFERRED]** Close-State Coherence Gate Execution (R5 AC5/AC6, R3 AC4, R8 AC3/AC4 — ESM-escape-hatch branch only)

  **Gate condition:** fires **only** if Task 8 commits native ESM AND the escape-hatch is elected. Sequenced inside / alongside Increment 3c. Decomposition deferred to the post-decision tasks pass.

  - One-line scope: certify the deferred close-state is coherent + non-regressing for consumers before deferring 3c execution. Pass-2 decomposition must include: **(a)** sequence the `"type":"module"` flip + any stranding change **into** the deferred 3c (never land them before the artifacts they would strand are coherent); **(b)** the **shipped-preset close-state guard (R3 AC4)** — exercising the `@3fn/core/jest-preset` close-state via a faithful-consumer fixture using the `init`-written `jest.config.js`, fail-loud — must be **green** for the escape-hatch to be available (this is the guard timing distinct from the Increment-1 config-load guard; **NOT Increment-1 scope**); **(c)** the parking-form contingency — IF no coherent CJS parking form exists (OQ-3) THEN the preset migrates in-spec; retained as a guard regardless (Lina's recorded assessment leans YES — a `.cjs`/require-only form survives the flip — so (c) likely does NOT fire). **Principle: defer the work, never the coherence.**
    - _Requirements (for the pass-2 decomposition): 5.5, 5.6, 3.4, 8.3, 8.4_

---

## Sequencing & Gates

1. **Increment-1 critical path (immediate work + the 117 unblock):** Task 1 (net-new loader-selection matrix harness) → Task 2 (swap inside `loadConfig`) → Task 3 (subprocess consumer guard; **Task 3.2 creates the minimal consumer-guard CI lane** the spec's guards attach to — no test-running CI exists today) → **Task 6 (117 closeout, rides Increment-1 completion)**. Increment 1 is independently CI-green-gated and ships first.
2. **Early direction-agnostic guards (not gated):** Task 4 (4.1 jest source-scan dynamic-import smoke; 4.2 scoped-ESLint framework add, polarity unset) and Task 5 (MCP/browser exception + paired guard, **5.1 split a/b**: 5.1a MCP subprocess-stderr-sentinel, 5.1b browser jest-jsdom; both depend on `build:mcp`/`build:browser` first) land alongside Increments 1/2, attaching to the Task-3.2 CI lane.
3. **Increment 2 (investigation-only, NO swaps):** Task 7 follows Increment 1 — parity orchestrator + four inventories + divergence test → the green/red evidence table.
4. **Direction decision (the gate):** Task 8 commits one direction on the Task-7 evidence (reads the **fully assembled** table, post-7.4) — this unblocks the deferred Groups 9/10 decomposition AND Specs 122/123.
5. **Governance:** Task 11 codifies the contract + direction (ballot measure) once the direction is committed; rebuilds the docs MCP index.
6. **Gate-deferred (second tasks pass, post-Task-8):** Group 9 (Increment 3a→3b→3c, scope-gated; static-lint polarity) and Group 10 (close-state coherence gate execution, ESM-escape-hatch branch only).

**Two gate types throughout:** the **evidence gate** (Task 7's table gates every subsequent increment — guards the *swap*) and the **scope gate** (3a→3b→3c, each CI-green before the next — guards the *scope*).

## Validation-Tier Note

Tier 3: loader selection (Task 1), the swap (Task 2), the Increment-2 evidence harness + inventories + divergence test (Task 7), the direction decision (Task 8). Tier 2: consumer guard (Task 3), early guards (Task 4), MCP/browser exception (Task 5), 117 closeout (Task 6), governance (Task 11), and (per requirements) the gate-deferred Increment-3 groups. Tier assignments for the gate-deferred groups are direction-conditional and finalize in the second tasks pass.

**Resolved review note (do not re-raise):** Thurgood's earlier flag #2 (typecheck-mitigation placement) is RESOLVED — Ada verified the **confirm-in-Task-7 / act-in-3a** split is correct (Task 7's typecheck-coverage row confirms; Increment 3a's R6 AC3 mitigation acts). No promotion of the mitigation into an earlier increment is needed.

---

*Tasks draft — Ada/Lina task review incorporated (2026-06-24). Increment 1 (Tasks 1–3) + Increment 2 (Task 7) + the direction decision (Task 8) + early direction-agnostic guards (Tasks 4–5) + the 117 closeout (Task 6) + governance (Task 11) are FULLY DECOMPOSED. Task review corrections folded in: the loader-selection matrix harness is **net-new** (no diagnosis harness was committed); **Task 3.2 owns creating the minimal consumer-guard CI lane** (no test-running CI exists today — a guard with no host violates R1 AC5's "cannot silently erode"); **Task 4.2 includes a scoped-ESLint framework add** (no linting exists; minimal config on web source, NOT repo-wide adoption); **Task 5.1 is split** into 5.1a (MCP subprocess-stderr-sentinel) + 5.1b (browser jest-jsdom), both build-before-guard. The direction-gated work (Group 9 = Increment 3a/3b/3c + static-lint polarity; Group 10 = close-state coherence gate execution) is GATE-MARKED with its gate condition + one-line scope, decomposition DEFERRED to a second tasks pass after the Increment-2 evidence + the R4/R5 direction decision — decomposing it now would require assuming the CJS-vs-ESM answer this spec exists to decide on evidence. The Increment-1 critical path (loader → swap → guard) and the 117-closeout dependency (rides Increment-1 completion) are explicit. Thurgood flag #2 (typecheck-mitigation placement) is RESOLVED — Ada verified the confirm-in-Task-7 / act-in-3a split is correct, no promotion needed.*
