# Implementation Plan: Token-Index Generation Integrity

**Date**: 2026-06-13
**Spec**: 117 - Token-Index Generation Integrity
**Status**: Implementation Planning — **post-checkpoint restructure** (Task 1.3 DecisionRecord ratified 2026-06-13)
**Dependencies**:
- Spec 112 / 115 — Complete (this spec completes 112's token-index gap).
- **Finding 2 (CLI tsx/ESM loader)** — **FOLDED IN** as Task 2 (one-line fix; was an external dependency, now in scope per the DecisionRecord — it is the documented-CLI trust gate for Task 5.3).
- Spec 116 — Decoupled.

---

## Implementation Plan

Investigation-first and gated. **Task 1 (the baseline audit) is COMPLETE** and produced a dated `DecisionRecord` (Task 1.3) ratifying: **R3 + R5 merge** (`sharedRootCauseConfirmed: true`), **Finding 2 folded in**, **N1 deferred** (tracked), **N2 folded into R4**. Tasks 2–4 below are the **rewritten** fix tasks (the informed placeholders, now concretized from the audit). Fix *mechanics* in R3/R5/R4 remain Ada's to finalize; this plan states the audit-grounded structure and the contracts the mechanics must satisfy.

**Agent ownership:** Thurgood — audit methodology + verification harness (test infra) + formalization. Ada — Finding-2 one-liner + the merged spine fix (R3/R5) + R4-loader mechanics + Rosetta interpretation. Lina — consulted on R4 loading semantics. Peter — checkpoint + ballot-measure approvals.

---

## Task List

- [x] 1. Investigation & Baseline Audit (gates everything) — ✅ COMPLETE

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive

  **Success Criteria — MET:**
  - ✅ Complete `AuditReport`: every inventory artifact diffed (committed vs. fresh) AND classified (four buckets, (b)→(c) links). → `findings/audit-report.md`
  - ✅ Orphaned-helper scan run (`getOklchMetadata` = test-only import).
  - ✅ Finding 2 characterized; baseline labeled **provisional** (documented CLI couldn't run — now folded in as Task 2).
  - ✅ New findings logged: N1 (deferred → issues registry), N2 (folded into R4).
  - ✅ Post-investigation checkpoint → dated `DecisionRecord` with kept/revised/rescoped per R3–R5 + `sharedRootCauseConfirmed: true`. → `findings/decision-record.md`
  - ✅ No fix applied before this task completed.

  **Audit outcome (drives the restructure below):** F1(R3) + F3b(R5) share a confirmed **code** root cause — both read the post-OKLCH-collapsed `platforms.web.value` while dist reads the correct mode-resolved OKLCH source → **merge** (Task 3). F3a(R4) confirmed; also manifests in `dist/ComponentTokens.*` (N2). Finding 2 = one-line directory-import fix (Task 2).

  **Primary Artifacts:** `src/tools/integrity/GenerationIntegrityCheck.ts`; `findings/{raw-divergences,classification,audit-report,decision-record}.md`.
  **Completion Documentation:** Detailed `.../completion/task-1-completion.md` ✅; Summary `docs/specs/.../task-1-summary.md` ✅.

  - [x] 1.1 Build the `GenerationIntegrityCheck` engine
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 1.2 Run the baseline audit and classify divergences
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada + Thurgood
    - Ran the engine + absolute scan + orphaned-helper scan; classified all divergences; confirmed shared-code root cause (F1↔F3b); logged N1; folded N2 into R4. → `findings/raw-divergences.md`, `findings/classification.md`, `findings/audit-report.md`
    - **Carried forward (not closed in 1.2):** the registry-pre-population / double-registration characterization (Lina consideration iii) was operationalized into 1.2 but **not traced** during the audit — moved into Task 4 scope (Ada resolves at the loader fix).
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [x] 1.3 Post-investigation checkpoint → DecisionRecord
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Peter (decision); Thurgood records
    - Ratified: merge R3+R5; fold in Finding 2; defer N1; fold N2 into R4; R3/R4/R5 kept with scope notes. → `findings/decision-record.md`
    - _Requirements: 1.8, 1.9_

- [ ] 2. CLI Config-Import Fix (Finding 2 — folded in)

  **Type**: Implementation
  **Validation**: Tier 2 - Standard
  **Agent**: Ada (resolved the April sibling `2026-04-08-cli-module-resolution`)

  **Why here:** the documented `generate` CLI cannot run *any* generation until this is fixed (confirmed: fails at config load even bypassing npx). It is the verification prerequisite for Task 5.3 and resolves the audit's `provisional` ceiling. Sequenced first so Tasks 3–4 can be verified via the documented CLI, not the workaround.

  **Success Criteria:**
  - `node bin/designerpunk.js generate` (and `validate`) run without the directory-import error.
  - Config resolves identically to the ts-node workaround (`tokenSourceMode: 'package'`, `themes: []`) — confirming the audit's findings hold under the documented CLI (closes `configLoadEquivalentToWorkaround`).

  **Known structural element (from diagnosis):** `designerpunk.config.ts:16` → `import { defineConfig } from './src/config'` is a directory import tsx ESM rejects; fix to `'./src/config/index.ts'` (the error's own suggestion; same class as the resolved April issue).

  **Scope boundary:** ONLY the config-import resolution needed to run `generate`. The separate `--force`-swallow CLI papercut (`2026-06-10-npx-force-flag-swallowed`) stays OUT — we invoke `node bin/designerpunk.js generate` directly for verification.

  **Completion Documentation:** Detailed `.../completion/task-2-completion.md`; Summary `docs/specs/.../task-2-summary.md`.

  - [ ] 2.1 Fix the directory import; confirm documented CLI runs
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada
    - Correct the `designerpunk.config.ts` directory import.
    - Verify `node bin/designerpunk.js generate` runs end-to-end (in a disposable worktree first to avoid clobbering committed artifacts).
    - Confirm resolved config matches the workaround (tokenSourceMode/themes) — record the equivalence that lifts `provisional`.
    - _Requirements: 2.4, 6.3 (enables the documented-CLI trust gate)_

- [ ] 3. Token-Index OKLCH Color + Theme-Varying — MERGED Spine Fix (R3 + R5)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Merge basis (`sharedRootCauseConfirmed: true`):** the token-index generation path reads the collapsed `platforms.web.value` (single-mode rgba) for BOTH the color value (R3) and the light/dark comparison (R5), while the dist path reads the correct OKLCH **mode-resolved** source. One spine fix — *route the token-index path to the mode-resolved OKLCH source* — with **two readouts** (color value; theme-varying). Frame as "fix the shared upstream source; verify both R3 and R5 from it" — not "do R5 inside R3's mechanics."

  **Success Criteria (both verified from the one fix):**
  - **R3:** every color-primitive entry carries OKLCH (resolved value + `{hue,lightness,chroma}` channels) consistent with `dist/DesignTokens.web.css`; **no `rgba(`** remains.
  - **R5:** theme-varying correctly marks mode-varying colors (e.g., `color.structure.canvas`), reproducing the **dist mode-resolved set** — NOT a naive restore of committed's 10.
  - Re-diff via `GenerationIntegrityCheck` confirms both and isolates the R4 residue.

  **Known structural elements (from the audit — Ada finalizes mechanics):**
  - **Spine — data-flow change, NOT a one-line reroute ([ADA R2], source-verified):** today `runGenerate` passes only the **raw** `tokens` (collapsed `platforms.web.value`) + `themeVaryingTokens` to `generateTokenIndex`; `generateTokenFiles` resolves modes **internally** and the mode-resolved OKLCH light/dark sets are **not shared** with the index generator. The fix must **surface the mode resolution as a shared source** (the index calls the same OKLCH/`ComposedColor`+resolver path, or light/dark sets are resolved once and fed to both generators) — an architecture-of-data-flow change (consistent with Tier 3), not a reroute of one read. `getOklchMetadata` supplies channels but is **single-value (not mode-aware)** — mode-aware values come from the resolver.
  - **Open question to pin in the fix ([ADA R2] / P6 index-vs-dist alignment):** with `themes: []`, dist's dark value (canvas → `oklch(0.42…)`) must originate **Level-1 primitive-intrinsic OKLCH light/dark**, NOT the unregistered dark-theme file. The fix must determine exactly how `generateTokenFiles` obtains mode-resolved color and replicate *that* path for the index, so the index matches dist by the same mechanism — not coincidentally.
  - Touch points: `generateTokenIndex.ts:117` (color emission); `computeThemeVaryingTokens` in `src/cli/themeVarying.ts` (light/dark comparison).
  - **R3 value-shape (Q1/Q2):** lean **mode-aware** (carry light/dark oklch) so the index matches dist AND R5 can derive theme-varying from the same data — Ada's final call.
  - **R5 reconcile the 10-vs-7 gap:** committed marks 10 theme-varying; dist emits 7 `light-dark()`. The correct target is the dist mode-resolved set; reconcile the difference (likely WCAG-varying or non-`light-dark()` emission) rather than reproducing committed's 10.
  - **`rgba(` guard (Ada's parked flag):** the `refName.startsWith('rgba(')` guard in `computeThemeVaryingTokens` is load-bearing iff baked-alpha refs still carry `rgba(...)` post-R3 — must not be naively stripped.

  **Primary Artifacts:** `src/generators/generateTokenIndex.ts`, `src/cli/themeVarying.ts` (+ mode-resolution wiring); regenerated `token-index/{primitives,semantics}.yaml`.
  **Completion Documentation:** Detailed `.../completion/task-3-completion.md`; Summary `docs/specs/.../task-3-summary.md`.

  - [ ] 3.1 _Mechanics authored by Ada from the audit findings (R3 + R5 spine fix)._
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4_

- [ ] 4. Component-Token Loading Gated on Source Presence (R4) + dist ComponentTokens (N2)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (Lina consulted on loading semantics)

  **Success Criteria:**
  - With component-token sources present, `generate` loads/indexes them regardless of `tokenSourceMode`; warning fires in all modes.
  - Regenerated `components.yaml` **AND** `dist/ComponentTokens.{web,ios,android}` both reproduce the committed component-token set (**N2**: dist side currently empty in both committed+fresh — both wrong; the fix must populate both).
  - A package-mode consumer authoring its own component tokens is covered.

  **Known structural elements:**
  - Un-gate the `if (config.tokenSourceMode === 'local')` wrapper in `runGenerate()` (`designerpunk.ts:109`) — it wraps **both** the `loadComponentTokens` call and the warning (one removal fixes both halves).
  - **Two gates, same wrong axis ([LINA R2], source-verified):** un-gate **both** mode-coupled gates — the call-site gate above **and** `setDefaultAllowOverwrite` (`loadComponentTokens.ts:~29`), which is gated on the **identical** `tokenSourceMode === 'local'`. Un-gating the call alone leaves `allowOverwrite=false` in package mode → a double-registration *throw* if any pre-registration exists. Treat `allowOverwrite` as the loader's own concern (it travels with `loadComponentTokens`), not a mode concern.
  - **Double-registration is low-risk, not a blind trace ([LINA R2]):** the conflict `allowOverwrite` handles is plausibly a **local-mode dual-path artifact** (local copy + package `src` both `require`d); pure package mode likely has a single path → no conflict. Residual question — "is there a second registration path in package mode?" — confirmable at fix time. Safe disposition either way: enable `allowOverwrite` with the loader (harmless if single-path; benign-last-wins if dual-path). **Masking safety net:** R4's `components.yaml` semantic-reproduction-of-the-committed-27 check catches a wrong-definition overwrite.
  - "Source presence" = convention dir (Source-1, `{tokenSourceRoot}/component/`) **and** `componentTokenDirs` (Source-2).
  - Verify call-site un-gating is **sufficient** (no second downstream mode-assumption).

  **Primary Artifacts:** `src/cli/designerpunk.ts`, `src/cli/loadComponentTokens.ts`; regenerated `components.yaml` + `dist/ComponentTokens.*`.
  **Completion Documentation:** Detailed `.../completion/task-4-completion.md`; Summary `docs/specs/.../task-4-summary.md`.

  - [ ] 4.1 _Mechanics authored by Ada from the audit findings (R4 loader fix + N2 dist coverage + double-registration trace)._
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Generation-Integrity Verification & End-to-End Re-Verification (R2 / R6)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive

  **Success Criteria:**
  - The repeatable `GenerationIntegrityCheck` passes: fresh generate semantically reproduces committed artifacts, OR every divergence is in the ratified `IntentionalDivergenceManifest`.
  - Application MCP re-indexed; serves OKLCH primitive colors, full component-token tier, correct theme-varying flags.
  - **Non-provisional certification achieved via documented-CLI reproduction** — now attainable because Task 2 fixes the documented CLI.

  **Completion Documentation:** Detailed `.../completion/task-5-completion.md`; Summary `docs/specs/.../task-5-summary.md`.

  - [ ] 5.1 Finalize the verification (manifest + normalization; repeatable check)
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood
    - Finalize `NormalizationRule[]`; populate `IntentionalDivergenceManifest` (each entry `approvedBy`/`date`/`reason`).
    - **Inventory note:** BlendUtilities removed (N1 deferred); confirm the manifest/inventory reflect the corrected set.
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ] 5.2 Consumer-repo fixture + package-mode warning test
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Thurgood
    - Package-mode fixture declaring its own `componentTokens` (silent-failure half (a)); R4 AC3 "none found" warning test in **package mode** (half (b)). Sequence after Task 4.
    - _Requirements: 4.3, 4.5_

  - [ ] 5.3 End-to-end re-verification + documented-CLI trust gate
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Thurgood + Ada
    **Depends on**: Task 2 (CLI fix) — formerly a Finding-2 Blocked-Task; the blocker is now in-scope and resolved by Task 2.
    - Re-diff after all fixes; regenerate → reindex Application MCP → confirm OKLCH colors, component tier (+ dist ComponentTokens), theme-varying.
    - Reproduce the baseline via the **documented CLI** (enabled by Task 2) → lift `provisional`; certify.
    - _Requirements: 6.1, 6.2, 6.3, 2.4_

- [ ] 6. Documentation & Clean-Exit (R7)

  **Type**: Parent
  **Validation**: Tier 1 - Minimal

  **Success Criteria:**
  - Ballot-measure steering proposals (Ada proposes; Peter approves) for the token-index OKLCH path, component-token loading gate, and theme-varying rule. *(Consider flagging the Rosetta-System-Architecture doc's `dist/BlendUtilities.*` listing — N1 found it inaccurate.)*
  - All deferred out-of-scope findings recorded in the issues registry. *(N1 logged ✅; N2 folded into R4.)*

  **Completion Documentation:** Detailed `.../completion/task-6-completion.md`; Summary `docs/specs/.../task-6-summary.md`.

  - [ ] 6.1 Ballot-measure steering-doc proposals
    **Type**: Documentation · **Validation**: Tier 1 · **Agent**: Ada → Peter
    - _Requirements: 7.1_

  - [ ] 6.2 Issues-registry logging (clean-exit)
    **Type**: Documentation · **Validation**: Tier 1 · **Agent**: Thurgood
    - _Requirements: 7.2_

---

## Sequencing & Gates

1. **Task 1 (audit) complete** — DecisionRecord ratified; fixes unlocked.
2. **Task 2 (CLI one-liner) first** — restores the documented `generate` so Tasks 3–4 verify via the documented CLI (not the workaround) and Task 5.3's trust gate is attainable.
3. **Task 3 = merged spine fix** (R3+R5) per `sharedRootCauseConfirmed: true` — one upstream-source correction, two verified readouts.
4. **Task 4 (R4) + N2** — disjoint artifacts from Task 3 (`components.yaml`/`dist/ComponentTokens.*` vs `primitives/semantics.yaml`), so single-variable attribution holds without interleaved re-diff; Task 5.3 confirms the whole. Double-registration traced here (carried from 1.2).
5. **Task 5.3** — now unblocked by Task 2; documented-CLI reproduction lifts `provisional`.
6. **Task 6** — clean-exit (N1 logged; ballot proposals).

## Validation-Tier Note

Tier 3: audit, checkpoint, harness, merged spine fix, E2E. Tier 2: CLI one-liner, R4 loader, fixture. Tier 1: documentation.
