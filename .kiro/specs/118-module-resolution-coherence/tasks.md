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

- [x] 4. Early Direction-Agnostic Guards (land early, NOT gated on the decision) — **DONE: preventive dynamic-import smoke test (bites, verified) + scoped ESLint tooling (v10, inert rule, polarity → Group 9). Full sweep green. See `completion/task-4-completion.md`.**

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

  - [x] 4.1 Dynamic-import smoke test (preventive — jest source-scan)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - A **jest source-scan test** (presence assertion) asserting zero extensionless/raw-`.ts` runtime dynamic `import()` in web component source; name it preventive. No framework needed — rides existing jest infra and the Task-3.2 CI lane. Name its home in the web-component test tree.
    - _Requirements: 10.2_

  - [x] 4.2 Static-lint tooling scaffold (scoped ESLint add; polarity deferred to Group 9)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - Select + install ESLint scoped to just the module-resolution rule on web source (a minimal config — this is a **genuine framework add**, a new dev dependency to budget, since no linting exists today). Build the lint-rule scaffold + CI wiring (on the Task-3.2 lane) scoped to web source only; leave the polarity/policy unset pending the Task-8 decision; document that the polarity is gate-deferred (Group 9). **Scope discipline:** a minimal ESLint config scoped to the module-resolution rule on web source — NOT a repo-wide ESLint adoption (linting the whole existing codebase is a separate concern 118 does not own).
    - _Requirements: 10.1, 10.3, 10.4_

- [x] 5. MCP/Browser Principled Exception + Paired Boot/Smoke Guard (R12 — single owner) — **DONE: MCP subprocess + browser jsdom boot/smoke guards (both bite-tested), exemption-boundary doc staged for Task 11. Full sweep green. See `completion/task-5-completion.md`.**

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

  - [x] 5.1a MCP boot/smoke guard (subprocess spawn + stderr sentinel)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - Subprocess-spawn each bundled MCP server (`dist/mcp/*.js`, auto-start under `require.main === module`); wait for the `running on stdio` stderr sentinel (the `waitForReady`-on-stderr pattern in `consumer-integration.test.ts:121-132`); fail if the process exits/throws before the sentinel. Reaching `running on stdio` = booted far enough to catch a resolution error (verified `application-mcp-server/src/index.ts:362-388`). Depends on `build:mcp` having run.
    - _Requirements: 12.1_

  - [x] 5.1b Browser boot/smoke guard (jest-jsdom import)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina
    - A jest-jsdom test that `import()`s `dist/browser/designerpunk.esm.js` and asserts a custom element is defined (e.g. `customElements.get('button-cta')`), since the bundle calls `customElements.define` at module top-level and needs a DOM (jsdom IS installed). Do NOT `node dist/browser/...esm.js` in bare Node (`customElements` undefined → false signal). Depends on `build:browser` having run.
    - _Requirements: 12.2_

  - [x] 5.2 Document the exemption boundary + ts-node dev-config exception
    **Type**: Documentation · **Validation**: Tier 2 · **Agent**: Thurgood
    - Draft the coherent-boundary documentation (exempt subsystems + rationale + ts-node dev-config principled exception); stage it for the Task-11 ballot measure and cross-reference.
    - _Requirements: 12.3, 12.4_

- [x] 6. Spec 117 Closeout (R11 — rides Increment-1 completion) — **DONE: `117/findings/118-closeout-note.md` written (supersedes items 3 & 7; advises 117 to re-run its own Task 5.3; config-load-path-only trust). See `completion/task-6-completion.md`.**

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

  - [x] 6.1 Write the 117 guidance note (gated on Increment-1 completion)
    **Type**: Documentation · **Validation**: Tier 2 · **Agent**: Thurgood
    - Author the note (supersedes item 3; advises 117 Task 5.3 re-run; scopes trust to config-load path only); cross-reference from 117's decision-record. Do NOT correct 117 in-place; do NOT lift 117's status on its behalf.
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 7. Increment 2 — Evidence Harness, Inventories, Divergence Test (investigation-only — NO swaps) — **DONE: parity harness (`ParityOrchestrator` + `npm run test:parity`, reuses 117's engine, two-roots seam, no `FreshGenerator`) → ALL-GREEN semantic parity across 11 artifacts (only divergence class = volatile timestamps); volatile-field set extended with 118 defensive rules + 17 unit tests; four inventories (`./config` now import+require, 13 ts-node scripts not 11, OQ-3 parking form EXISTS); divergence hypothesis REFUTED → clean exit (gaps routed out). Build/tsc/test all green; no production code touched. See `completion/task-7-completion.md` + `findings/evidence-table.md`.**

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

  - [x] 7.1 Build the parity orchestrator (reuse 117 engine; new two-fresh-tree seam)
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada + Thurgood
    - Thin orchestrator over the **per-artifact** `Normalizer.normalize(raw, kind)` + `SemanticComparator.compare(artifact, A, B)` (NOT per-tree): iterate an artifact list (path + `ArtifactKind`), read each path from root A and root B, compare per-artifact. Borrow `INVENTORY: ArtifactRef[]` (`src/tools/integrity/inventory.ts:22`) as the reusable artifact-list driver. Read two fresh roots directly (NOT `GenerationIntegrityCheckImpl`); confirm whether two roots suffice without `FreshGenerator`.
    - _Requirements: 4.1, 4.3_

  - [x] 7.2 Enumerate + unit-test the volatile-field normalization set (OQ-2)
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada
    - Generate via both mechanisms; diff per-artifact; add each non-semantic divergence (rosettaVersion, embedded version, `extensions.themes` **conditional-presence + array-ordering**, duration, …) as a unit-tested rule; iterate until only semantic divergences remain. Volatile-field sources are under `src/generators/` (`DTCGFormatGenerator.ts` / `TokenFileGenerator.ts`).
    - _Requirements: 4.4_

  - [x] 7.3 Entry-point, export-condition, and ESM-cost (jest-preset + parking-form) inventories
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada
    - Produce the three inventories; name the preset `moduleNameMapper` raw-`.ts` coupling (`src/testing/jest-preset.ts:53-59`) to Group 8; determine the OQ-3 parking form (final confirmation deferred to a `.cjs`-under-`"type":"module"` boot through the Group-10 close-state guard).
    - _Requirements: 4.2, 4.5, 4.6_

  - [x] 7.4 Divergence-hypothesis test (falsifiable, clean-exit) + assemble the evidence table
    **Type**: Investigation · **Validation**: Tier 3 · **Agent**: Ada + Thurgood
    - Establish correlation-not-causation; disposition plausible/refuted with a clean-exit routing finding if refuted; assemble the green/red table (incl. typecheck-coverage + hypothesis rows).
    - _Requirements: 4.7, 4.8_

- [x] 8. Module-Direction Decision Point (R5 — the gate that unblocks the deferred Increment-3 Groups 9/10 AND Specs 122/123) — **DONE: committed CJS-consistency, executes in-spec, escape-hatch NOT elected (Group 10 does not fire). Evidence-decisive (jest-preset blast radius + current-CJS-surface + Task-1 ESM-loader failure all favor CJS; pro-ESM axes neutralize — consumers keep ESM-authoring via the dual loader). 122/123 verified to carry no latent ESM hard-requirement. ESM-modernization path sized + roadmapped for the future. Peter's commitment 2026-06-25; Ada interpreted; recorded. See `findings/direction-decision.md`.**

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

  - [x] 8.1 Commit one direction on the Increment-2 evidence; record rationale + escape-hatch disposition
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
  - **Rider (scheduled 2026-06-25):** include the small RSA-doc "orchestrator" disambiguation as a second ballot item — Rosetta-System-Architecture.md Stage-4 (`generateTokenFiles`, pipeline orchestration) vs Stage-5 (`TokenFileGenerator`, platform-generation orchestration); **disambiguate by layer, do NOT unify** (they are caller/callee). See `.kiro/issues/2026-06-24-rsa-orchestrator-terminology-overload.md`.
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
> The detailed task numbers are assigned in the second tasks pass. **Group 9** decomposes into Increment 3a → 3b → 3c (scope-gated) plus the static-lint polarity task; **Group 10** decomposes the close-state coherence gate execution (ESM-escape-hatch branch, sequenced inside/alongside 3c). Task 11 (Governance) is already authored above and sits after them.
>
> **✅ SECOND TASKS PASS DONE (2026-06-25), CJS branch (Task 8 committed CJS-consistency).** Group 9 is decomposed below as **Task 9** (Increment 3 — Direction Execution) with subtasks **9.1 (3a runtime unification — full ts-node removal), 9.2 (3b exports reconciliation — exports→`dist`, test mappers stay `src`), 9.3 (3c CJS finalization + close-state certification), 9.4 (lint polarity — ban extensions)**. Governance stays **Task 11** (50+ cross-references make renumbering a net-negative; the increments are subtasks under Task 9 — matching the original Group-9-as-one-task structure). **Group 10 → N/A** (escape-hatch not elected). Ada+Lina technical review incorporated (the load-bearing correction: published exports→`dist` but jest test mappers stay on `src`; ship the `dist/build` + `dist/types` targets via `files`; full ts-node removal per Peter).

- [ ] 9. Increment 3 — Direction Execution (CJS branch): runtime unification → exports reconciliation → CJS finalization + lint polarity (R6, R7, R8, R10 AC3)

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada (runtime/exports/direction mechanics); Lina (jest-preset + test-config + lint + consumer-surface guard); Thurgood (typecheck-gate + CI scope-gate + 117-certification verification)

  **Gate condition (satisfied):** Task 8 committed **CJS-consistency, executed in-spec, escape-hatch NOT elected** (`findings/direction-decision.md`). This is the CJS branch of design § "Direction-Gated Increments" — Group 10 (close-state coherence gate) does **NOT** fire (see its N/A resolution below). **Scope gate:** 9.1 (3a) CI-green → 9.2 (3b) CI-green → 9.3 (3c); 9.4 (lint polarity) pairs with the 3c surface. **Decomposition source:** the second tasks pass, Ada+Lina technical review incorporated (`findings/increment-3-tasks-draft.md` + review corrections; ts-node retirement scope = **full removal**, Peter 2026-06-25).

  **Success Criteria (parent):** one runtime TS mechanism (tsx) governs all non-bundled runtime TS; the raw-`.ts` exports trio resolves to shipped compiled `dist` for consumers while tests still resolve against `src`; CJS + extensionless authoring is finalized with no `"type":"module"` flip and the jest-preset untouched; the close-state is certified by a consumer guard exercising the reconciled exports (not asserted); the lint bans explicit extensions on web source. Spec 118 closes on an **executed** coherent end-state. 117's raw-`.ts` exports path certifies at 9.2.
  **Primary Artifacts:** `package.json` (scripts→tsx, ts-node devDep removed, tsx pin tightened, `exports` trio→`dist`, `files` extended); `bin/designerpunk.js`; `src/cli/designerpunk.ts` (ts-node fallback pruned); the `scripts/**` typecheck step; the test-mapper copies (kept on `src`); the consumer-guard reconciled-trio assertion; the ESLint polarity.
  **Completion Documentation:** Detailed `.../completion/task-9-completion.md`; Summary `docs/specs/.../task-9-summary.md`.

  - [~] 9.1 Increment 3a — Runtime unification: full ts-node removal → tsx (typecheck-gate FIRST) (R6) — **CORE DONE (2026-06-25); the bin-register retirement is CARVED OUT to 9.5 (audit-gated).** R6's one-mechanism requirement is satisfied (tsx-only); the global bin register persists as a documented coherent interim. See `completion/task-9.1-completion.md`.
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada (mechanics); Thurgood (typecheck-gate + CI scope-gate)
    - ✅ **DONE — typecheck-gate-loss mitigation (R6 AC3), BEFORE the swap:** `tsconfig.scripts.json` (extends base; inherits excludes) + `typecheck:scripts` script, wired green into the CI lane. Covers the 2 `scripts/**` build-path generators (`build:validate` was already under `src/**`).
    - ✅ **DONE — full ts-node removal (Peter 2026-06-25):** all **13** `package.json` ts-node invocations + the 2 live dev-shebang scripts → **tsx** (the other 2 shebang scripts were dead code, **deleted**); ProductMCPIntegration test spawn flipped tsx; the shipped-CLI ts-node fallback (`resolveTsRunner`) **pruned**; the parity harness **retired fully** (served its Inc-2 purpose); ts-node `devDependency` **removed**. **Standing grep-guard (SCOPED — corrected):** `grep -rn "ts-node" src/ scripts/ bin/ package.json` returns only historical-doc references. **NOTE:** this guard intentionally does NOT cover the MCP dev sub-packages (`application-mcp-server`, `mcp-server`), which **retain their own ts-node by design — the R12 AC4 documented exception** (Decision 2). "ts-node retired" means the root/governed surface, not the exempt bundled-MCP dev configs.
    - ✅ **DONE — KEEP the injected loader seam** (`scripts/generate-platform-tokens.ts:52`); comment hardened to a DO-NOT-REMOVE guard.
    - ✅ **DONE — concentration risk (R6 AC4):** tsx pinned **`~4.21.0`** (patch-only); pin-bump gate via `.github/CODEOWNERS` on the dependency manifests. _Open (Peter): the CODEOWNERS handle/team + enabling branch-protection code-owner review (same repo-settings action as the Consumer-Guard required check)._
    - ⏸️ **CARVED OUT → 9.5 — the bin's global `register()` retirement.** Attempting it (bundling the CLI per issue 2026-06-10) **broke `npx designerpunk generate`** — empirically proven. Discovery: the global register is **load-bearing for loading the CONSUMER's raw `.ts` at generate-time** (`resolveTokens` → `<consumer>/src/tokens`; `loadComponentTokens` → component `.ts`), not just the CLI's own source; plus `__dirname` package-mode path shifts under bundling silently zero component tokens (Spec 117 R4 regression). The design and the 2026-06-10 issue both under-modeled this. **Deferred to 9.5 (audit-first).** The interim (register kept) is consumer-guard-green.
    - _Requirements: 6.1, 6.2, 6.3, 6.4 (6.4 pin done; the bin-register half of 6.1 → 9.5)_

  - [x] 9.2 Increment 3b — Exports reconciliation: published exports → `dist` (ship them); test mappers STAY on `src` (R7) — **DONE (2026-06-25).** `./blend`/`./build`/`./types` retargeted (import+require+types) from raw `src/*.ts` → compiled `dist`, mirroring the `./config` precedent; `files` extended to ship the full transitive closure (52 files; caught + fixed a latent mis-ship — `dist/blend` required an unshipped `BlendTokens`, masked by the raw-`src` arrangement). Test mappers confirmed STAY on `src` (all 4 copies; suite green). `.` left **intended-asymmetric** (root = browser entry; Node consumers use the typed subpaths — documented, feeds Task 11). **Certified by the packed-install consumer guard:** require+import of the trio → `dist`; `generate` works (consumer component-`.ts` → `@3fn/core/build` resolves) = **the 9.5.3 unblock**. Verified: tsc clean, `npm test` 374/8975, build exit 0, token-index clean. **117 R7 AC3 prerequisite now certifies** (flag for 117 cross-ref; does NOT lift 117's status).
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada (exports/resolution); Lina (jest-preset + test-config); Thurgood (CI gate + 117 cross-ref)
    - **Published `exports` → compiled `dist`:** retarget `./blend`, `./build`, `./types` — all three conditions (`import` + `require` + **`types`**) — to compiled `dist` targets, following the **`./config` precedent** (already reconciled in Inc-1 Task 3 — do NOT re-do).
    - **Ship the `dist` targets (Review CR-3):** `dist/build/tokens/**` and `dist/types/**` compile but are **NOT in `package.json` `files`** today → extend `files` so they ship (`dist/blend/**` already ships). Continue shipping the `src` files the test mapper resolves. **Certify from a PACKED tarball:** the consumer guard `require`s + `import`s `@3fn/core/build` and `@3fn/core/types` from a packed install (not just source) — else `ERR_MODULE_NOT_FOUND` ships.
    - **Test mappers STAY on `src` raw `.ts` — do NOT retarget to `dist` (Review, load-bearing):** tests resolve against source via ts-jest, and `modulePathIgnorePatterns: ['<rootDir>/dist/']` (`jest-preset.ts:50-52`, `jest.config.js:52-54`) blocks dist resolution. The published-exports target and the test-resolution target are intentionally decoupled. Name **all** mapper copies and keep them `src` + internally consistent: preset `moduleNameMapper` (`jest-preset.ts:55-59`), **repo `jest.config.js` (`:62-69`)**, **repo `tsconfig.json` `paths` (`:25-31`)**, `init`-written `tsconfig.test.json` `paths` (`init.ts:139-145`); the `init`-written `jest.config.js` (`init.ts:119-123`) is a consumption-form (spreads the preset), not a mapping copy. (Review: the inventory's "two copies" undercounted — corrected in `esm-cost-inventory.md`.)
    - Confirm self-reference `@3fn/core/*` subpaths resolve under first-party **tsx** via the **exports map**, NOT tsconfig `paths` (tsx/esbuild don't honor `paths` by default — R7 AC4). _Open (Ada): compiled-`dist` target form + self-ref resolution path._
    - **Decide + record the `.` import-only disposition:** `require('@3fn/core')` resolves nothing (`.` import-only → browser bundle). Reconcile to also resolve under `require`, OR document as intended-asymmetric. _Open (Ada) — genuinely open; record the rationale (feeds Task 11)._
    - **117 certification (R7 AC3):** on 9.2 green, the raw-`.ts` exports path is verified — flag for the 117 cross-reference (does NOT lift 117's status per R11 AC4). Cleanup the stale `./config` "import-only" comment in `tests/consumer-integration.test.ts:10-11` (Task 3 added its `require`).
    - **CI-green before 9.3 begins** (scope gate, R7 AC2).
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [ ] 9.3 Increment 3c — Finalize CJS + extensionless authoring; certify the close-state (R8)
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada (execution); Lina (consumer-surface guard); Thurgood (verification)
    - Finalize CJS + extensionless authoring across the residual non-bundled surface (the leftover of what 9.1+9.2 did not already converge — nameable only after they land). **No `"type":"module"` flip; the jest-preset is untouched (no `.cjs` rename — that was the ESM branch).** Begins only after 9.1 AND 9.2 are CI-green.
    - **Certify the close-state — green, not asserted (R8 AC4):** the existing Task-3 consumer guard only exercises transitive relative `./my-overrides` — it does **NOT** import the reconciled trio. **Add a consumer-side assertion** that imports `@3fn/core/{blend,build,types}` under both `import` and `require` from a faithful consumer (the packed-tarball path from 9.2), asserting they resolve to the shipped `dist` artifact. Without this, "certified" overstates the green.
    - Spec 118 closes on an executed coherent end-state.
    - _Requirements: 8.1, 8.2, 8.4_

  - [ ] 9.4 Static-lint polarity — CJS BANS explicit extensions (web source only) (R10 AC3/AC4)
    **Type**: Guard · **Validation**: Tier 2 · **Agent**: Lina (lint polarity); Thurgood (CI wiring)
    - Set the Task-4.2 ESLint scaffold's polarity to **ban explicit extensions** on extensionless/raw-`.ts` relative imports — drop in the pre-written CJS selectors (`eslint.config.js:107-115`); this is a policy set, not a tooling rebuild.
    - **Prove it bites (Review):** the scaffold's rule was left inert/unverified — add a real positive/negative lint-bite check (a relative `import './y.ts'` in web source fails lint; `'./y'` passes). Not a formality.
    - **Scope (R10 AC4) — web source only, with the boundary made explicit:** iOS-Swift/Android-Kotlin categorically out; the `MathematicalConsistencyValidator.ts:330-331` build-time dynamic imports are double-excluded (already outside `src/components/**`, and extensionless so compliant anyway). **Coverage boundary (Review):** the lint covers only the `src/components/` slice of the 3c surface; extensionless authoring 3c finalizes outside `src/components/` is guarded by the 3a tsx runtime + the Task-4.1 dynamic-import jest guard, NOT by this lint — state this so "9.4 lints the 3c surface" is not read as total. Does NOT broaden to repo-wide ESLint. Runs non-skippably on the Task-3.2 lane.
    - _Requirements: 10.3, 10.4_

  - [~] 9.5 Consumer-Runtime-TS-Resolution: audit (DONE) → true bin-register retirement (R1, R6) — **AUDIT DONE + TARGET MODEL RATIFIED (Peter, 2026-06-25).** See `findings/consumer-runtime-ts-resolution-audit.md` (the systematic audit: exactly 3 consumer-`.ts` sites — config scoped, `resolveTokens`+`loadComponentTokens` bare-require; 6 `__dirname` runtime sites, B1/B2 break under compile) + `findings/runtime-ts-resolution-target-model.md` (the ratified ideal + mapped path). Implementation = 9.5.1→9.5.2→9.5.3 below, each consumer-guard-certified.
    **Type**: Investigation (DONE) → Implementation · **Validation**: Tier 3 · **Agent**: Ada (loader/resolution + token-loading) ; Lina (schema-discovery convention in 9.5.2) ; Thurgood (records) ; Peter (ratified)
    - **Ratified ideal (target-model doc):** package OWN code → compiled-shipped `dist`; consumer `.ts` → 3 scoped per-site tsx seams (Approach-A); `__dirname` → single `resolvePackageRoot()`; the generated catalog reflects the **consumer's** design system incl. their components (the B2/C′ decision); MCP-dev ts-node = permanent R12 AC4 exception. ESM is the mapped future. **Each step a consumer-guard-certified whole — the arbiter is the packed-install guard, NEVER an in-repo load (the task-3 false-green lesson).**

    - [x] 9.5.1 Scope `resolveTokens` + `loadComponentTokens` to per-site tsx (retire their global-register dependency) — **DONE (2026-06-25).** Shared `src/config/scopedTsRequire.ts` primitive (ONE mechanism — `ConfigLoader` unified onto it too); both sites get injectable `(config, loadModule=scopedTsRequire)` seams anchored at `__filename`; 5 in-process jest callers inject the shared `tsModuleLoader.ts` helper (no test-detection in production); build script injects the ambient loader (Inc-1 pattern). **Plain-`node` proof: sites 2/3 resolve consumer `.ts` with the global register NOT active, no residue.** Verified (main-loop): tsc clean, `npm test` 374/8972, build exit 0, token-index clean; **consumer guard PASS (the arbiter — ESM+CJS faithful-config subprocess fixtures green).**
      - Gave the two bare-`require` consumer-`.ts` sites their own **scoped** `tsx/cjs/api` register/`unregister` seam — the proven Inc-1 Approach-A pattern. Sites 2/3 no longer depend on the bin's global register (retired in 9.5.3). **Consumer-guard (packed install subprocess) was the arbiter**, not an in-repo load.
      - _Requirements: 6.1, 1_

    - [x] 9.5.2 `__dirname` → single `resolvePackageRoot()`; make the consumer-map consumer-aware (Class C′) — **DONE (2026-06-25).** Resolution + C′ wiring + the array-group reader fix (Peter approved; Lina-reviewed) — the catalog now reflects the consumer's design system AND carries 329 real token→component relationships (was 0/193, the `consumers` field was dead). Lina's exhaustive review: zero inversion discrepancies, ship-as-is. Pre-existing schema-name drift surfaced (some relationships still dropped because schemas declare non-canonical token names) → tracked at `.kiro/issues/2026-06-25-component-schema-token-name-drift.md` (Lina+Ada; does NOT block — the 329 shipped are correct). Commits `e23fe4c2` (resolution) + `0b9ee827` (reader fix). Lina's convention ratified (default-only, `<configDir>/src/components/core`, matching the MCP). Shared `src/cli/shared/resolvePackageRoot.ts` (B1/B3/B4 dedup'd); `componentSchemaDir` plumbed through `TokenIndexInput` from `runGenerate` (generator stays pure); `files` extended to ship `dist/cli/shared` (the consumer guard caught it unshipped — packed-install arbiter). **C′ certified:** new consumer-guard fixture — a packed consumer's `PricingCard.schema.yaml` appears in their generated index. Verified: tsc clean, `npm test` 374/8973, build exit 0, `git diff token-index/` empty (resolution is behavior-preserving). **Open:** the `buildConsumerMap` array-group reader bug (0/193 semantic tokens have consumers — the map is DEAD for the real schema format); fix adds 329 relationships → regenerate + review (Lina's eyes on the relationships).
      **Type**: Implementation · **Validation**: Tier 3 · **Agent**: Ada (resolution) ; Lina (schema-discovery convention)
      - Route B1 (`ConfigLoader.ts:126`) + B2 (`generateTokenIndex.ts:119`) through one self-checking `resolvePackageRoot()` (the robust B3 pattern, `designerpunk.ts:80`) so the package root survives compile-to-`dist`. **AND (ratified C′):** build the component→token relationship map (`buildConsumerMap`) from the **consumer's** component schemas (resolved from the active config/source), not `__dirname` — so a consumer's added/edited components (e.g. `PricingCard.schema.yaml`) appear in their token-index + MCP. **Open convention to settle here (with Lina):** where `generate` discovers the consumer's component schemas (alongside `componentTokenDirs` / the copied `src/components/core` / a config field) — component-authoring-model question, lightly 123-coupled; decide deliberately, don't assume.
      - _Requirements: 1, 6.1; (C′ closes the half-awareness incoherence: tokens were consumer-aware, the relationship-map was package-only)_

    - [!] 9.5.3 Retire the bin's global register; bin requires compiled `dist/cli` (couples to 3b) — **BLOCKED (2026-06-25) on an architecture decision.** The bin/compiled-CLI mechanism works + the `files`-broadening (build-tracking globs) was solved, but the consumer guard (arbiter) caught the real blocker: **a dual-instance `ComponentTokenRegistry` split** — without the global register, the scoped seam loads the consumer's component `.ts` inside tsx's own module registry, which loads a SECOND copy of `@3fn/core/build` → a second registry → `defineComponentTokens`'s side effect lands in the duplicate → `loadComponentTokens` reads the canonical (empty) one → **0 component tokens.** (Config + token-source seams are unaffected — they consume return values; component tokens are the only shared-singleton-side-effect seam.) Reverted to the working register-keep interim. **Fix is an architecture decision (Lina component-registry + Ada seam):** (1) consume return values not a cross-boundary singleton [Ada's rec; target-model-aligned]; (2) share the parent cache for compiled `@3fn/core/*` `.js`; (3) global registry handle. See `findings/9.5.3-component-registry-dual-instance-blocker.md`.
      **Type**: Implementation · **Validation**: Tier 3 · **Agent**: Ada ; Thurgood (CI/consumer-guard)
      - Now safe (9.5.1 scoped the consumer loads off the global register; 9.5.2 made the package root relocation-safe): retire `bin/designerpunk.js`'s global `register()`; bin `require('../dist/cli/designerpunk.js')` (compiled). **Couples to 9.2/3b** (same compile-and-ship move — sequence together; trace 3b's task graph for ordering first). **Consumer-guard certified** end-to-end (the arbiter that caught the prior three surprises) — the compiled CLI builds but has NOT been run end-to-end through a consumer generate; certify, don't assume.
      - _Requirements: 6.1, 1, 7 (3b coupling)_

    - **[BOUNDARY — Spec 123]** consumer source distribution form (copied raw `.ts` vs shipped-package vs compiled) is 123's call; 9.5.1's scoped seams hold under any 123 outcome keeping raw-`.ts` authoring. Flag, don't pre-empt.

- [ ] 10. ~~Close-State Coherence Gate Execution~~ — **N/A: superseded by the CJS commitment (Task 8; escape-hatch NOT elected)**

  The close-state coherence gate was the **ESM-escape-hatch branch only** (R5 AC5/AC6, R3 AC4, R8 AC3/AC4) — it fires only if native ESM is committed AND the escape-hatch is elected. Task 8 committed **CJS-consistency, executed in-spec**; neither holds. CJS incurs no `"type":"module"` flip and no jest-preset migration, so there is **no deferred close-state to certify** — Increment 3c (Task 9.3) closes in-spec. The shipped-preset close-state guard (R3 AC4), the `"type":"module"`-flip sequencing, and the `.cjs` parking-form rename do **not** execute. The OQ-3 parking-form determination is retained in `findings/esm-cost-inventory.md` as **banked ESM-modernization prep** (see `docs/roadmap/m0a-deferred-items.md`), not in-spec work. **This task does not decompose.**

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
