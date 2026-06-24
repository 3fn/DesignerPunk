# Implementation Plan: Token-Index Generation Integrity

**Date**: 2026-06-13
**Spec**: 117 - Token-Index Generation Integrity
**Status**: Implementation — **reconciled 2026-06-24** to reflect Spec 118 Increment 1 (Finding 2 resolved externally; Task 2 retired; Task 5.3 trust gate now executable — see [`findings/118-closeout-note.md`](findings/118-closeout-note.md)). **Tasks 3 (R3+R5 spine fix) and 4 (R4 loading gate + N2) COMPLETE 2026-06-24** — Task 4 also corrected the committed `components.yaml` baseline (27→33; 6 silently-dropped tokens recovered). Next actionable: **Task 5** (generation-integrity verification + documented-CLI trust gate) — now unblocked end-to-end; the R3+R5+R4 fixes are in and the documented CLI runs (Spec 118 Inc 1).
**Dependencies**:
- Spec 112 / 115 — Complete (this spec completes 112's token-index gap).
- **Finding 2 (CLI tsx/ESM loader)** — **RESOLVED EXTERNALLY by Spec 118 Increment 1** (committed `041aaea8`). The one-line directory-import fix this spec originally folded in as Task 2 was empirically **false** (it only relocates the failure one hop down the barrel chain); the genuine unblock is 118's TS-aware config loader (Approach A) + a `require` condition on the `./config` export. The documented `generate` CLI now runs end-to-end, so Task 5.3's trust gate is **executable**. Authoritative correction: [`findings/118-closeout-note.md`](findings/118-closeout-note.md) (supersedes decision-record items 3 & 7). **Restored trust is config-load-path ONLY**; the raw-`.ts` exports (`./blend`/`./build`/`./types`) remain unverified until **118 Increment 3b** (out of 117's renewed scope).
- Spec 116 — Decoupled.

---

## Implementation Plan

Investigation-first and gated. **Task 1 (the baseline audit) is COMPLETE** and produced a dated `DecisionRecord` (Task 1.3) ratifying: **R3 + R5 merge** (`sharedRootCauseConfirmed: true`), **Finding 2 folded in** *(since superseded — Finding 2 is resolved externally by Spec 118 Increment 1; see the Dependencies note and Task 2 below)*, **N1 deferred** (tracked), **N2 folded into R4**. Tasks 3–4 below are the **rewritten** fix tasks (the informed placeholders, now concretized from the audit). Fix *mechanics* in R3/R5/R4 remain Ada's to finalize; this plan states the audit-grounded structure and the contracts the mechanics must satisfy.

**Agent ownership:** Thurgood — audit methodology + verification harness (test infra) + formalization. Ada — the merged spine fix (R3/R5) + R4-loader mechanics + Rosetta interpretation. Lina — consulted on R4 loading semantics. Peter — checkpoint + ballot-measure approvals. *(The Finding-2 CLI unblock, originally Ada's one-liner, is resolved externally by Spec 118 Increment 1 — no longer a 117 fix task.)*

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

  **Audit outcome (drives the restructure below):** F1(R3) + F3b(R5) share a confirmed **code** root cause — both read the post-OKLCH-collapsed `platforms.web.value` while dist reads the correct mode-resolved OKLCH source → **merge** (Task 3). F3a(R4) confirmed; also manifests in `dist/ComponentTokens.*` (N2). ~~Finding 2 = one-line directory-import fix (Task 2).~~ *(Superseded: the audit's one-line diagnosis was empirically false; Finding 2 is resolved externally by Spec 118 Increment 1 — see [`findings/118-closeout-note.md`](findings/118-closeout-note.md).)*

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

- [~] 2. ~~CLI Config-Import Fix (Finding 2 — folded in)~~ — **SUPERSEDED; RESOLVED EXTERNALLY by Spec 118 Increment 1**

  **Status**: Retired as a 117 fix task. No 117 action required. Retained as historical record (the closeout-note philosophy: supersede, don't erase).

  **Why retired:** This task's premise — that a one-line directory-import fix (`designerpunk.config.ts:16`, `'./src/config'` → `'./src/config/index.ts'`) unblocks the documented `generate` CLI — was confirmed **empirically false** by Spec 118 (resolution-matrix harness): the one-liner only relocates the failure one hop down the barrel chain. The genuine blocker was deeper (`loadConfig` did a raw `await import()` of the `.ts` config with no TS-aware resolution). **Spec 118 Increment 1** (committed `041aaea8`) fixed it: a TS-aware config loader (Approach A) + a `require` condition on the `./config` export. The documented consumer workflow now runs end-to-end (118's subprocess guard: `init` → config → `generate` → 217 tokens × 3 platforms). See [`findings/118-closeout-note.md`](findings/118-closeout-note.md).

  **What migrated to Task 5.3:** the `configLoadEquivalentToWorkaround` confirmation (resolved config under the documented CLI matches the ts-node workaround — `tokenSourceMode: 'package'`, `themes: []`) is now part of Task 5.3's trust gate, since the documented CLI itself is supplied by 118 rather than by a 117 fix.

  **Scope note (carried):** the `--force`-swallow CLI papercut (`2026-06-10-npx-force-flag-swallowed`) remains OUT of scope — 5.3 invokes `node bin/designerpunk.js generate` directly.

- [x] 3. Token-Index OKLCH Color + Theme-Varying — MERGED Spine Fix (R3 + R5) — ✅ COMPLETE (2026-06-24)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada

  **Outcome:** Implemented as **Option B** (single shared mode-resolution source — `generateTokenFiles` returns `ModeResolvedTokens`, consumed by the index). R3 ✅ (OKLCH in index, consistent with dist; `rgba(` 216→16, all shadow-family — see scope note); R5 ✅ (`themeVarying` = the 5 dist base-mode keys, not committed's stale 10). Dist provably unchanged; full suite **8955 tests** + `tsc` green (re-verified in main loop). Artifacts regenerated via the **documented CLI** (118-unblocked). Detail → [`completion/task-3-completion.md`](completion/task-3-completion.md).

  **R3 criterion scoping (ratified by Peter 2026-06-24):** "no `rgba`" is scoped to **OKLCH-migrated** color primitives. The 16 residual rgba are the shadow color family, which Spec 112 never migrated to OKLCH (no channel tokens; dist emits them as rgba too — so the index *matches* dist; **not** a divergence, **not** a manifest entry). Logged as [`.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md`](../../issues/2026-06-24-oklch-shadow-color-family-not-migrated.md) (token-foundation follow-on).

  **Follow-ups for Task 5:** (1) Task 5.1 R3 harness assertion must scope "no rgba" to `composedColorMap`-backed primitives. (2) Add an automated anti-conflation guard for the two distinct theme-varying sets (registry-wide 10 vs base-scoped 5), currently doc-comment-guarded only.

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

  - [x] 3.1 _Mechanics authored by Ada from the audit findings (R3 + R5 spine fix)._ — ✅ COMPLETE
    **Type**: Architecture · **Validation**: Tier 3 · **Agent**: Ada
    - Mechanics design authored + ratified (Option B) → [`findings/task-3-mechanics.md`](findings/task-3-mechanics.md); the residual unknown was pinned by a live experiment (§4.1: registry-wide Set = stale 10; index requires a base-scoped 5-key set, pass-through unsafe). Implemented and verified (see parent outcome). The open "primitive-intrinsic vs override" question (line 81) resolved to **semantic-override**: OKLCH primitives are mode-invariant (resolver ignores `mode`), so mode variance lives at the semantic layer — the index reuses dist's semantic light-vs-dark diff.
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.1, 5.2, 5.3, 5.4_

- [x] 4. Component-Token Loading Gated on Source Presence (R4) + dist ComponentTokens (N2) — ✅ COMPLETE (2026-06-24)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive
  **Agent**: Ada (Lina consulted on loading semantics)

  **Outcome:** Un-gated both `tokenSourceMode === 'local'` gates (call-site at `designerpunk.ts` + `allowOverwrite` at `loadComponentTokens.ts`); loading now keys on source presence. Un-gating alone populated the registry under the shipped package-mode config (sources resolve in both modes — confirmed by trace). **N2 resolved:** `components.yaml` AND `dist/ComponentTokens.{web,ios,android}` populated (0→33). Double-registration trace: package mode is single-path, 0 conflicts (confirms [LINA R2]). Full suite **8955 tests** + `tsc` green (re-verified in main loop). Detail → [`completion/task-4-completion.md`](completion/task-4-completion.md).

  **Baseline correction (ratified by Peter 2026-06-24):** the fix reproduced all **27** committed tokens value-identical **AND recovered 6** the bug had silently dropped (`inputcheckbox.box.{sm,md,lg}`, `inputradio.box.{sm,md,lg}`) — source files committed 2026-04-03, predating the stale 2026-06-11 `components.yaml` regen, so the committed 27 were themselves a product of the silent failure. **Committed baseline corrected to the 33-token set** (not a manifest entry) → Task 5.3 re-diff will see committed == fresh == 33.

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

  - [x] 4.1 _Mechanics authored by Ada from the audit findings (R4 loader fix + N2 dist coverage + double-registration trace)._ — ✅ COMPLETE
    **Type**: Implementation · **Validation**: Tier 2 · **Agent**: Ada
    - Both gates un-gated; source-presence trace + double-registration trace confirmed (single-path, 0 conflicts); 6 dropped tokens recovered; N2 dist populated. Verified full suite + tsc green.
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Generation-Integrity Verification & End-to-End Re-Verification (R2 / R6)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive

  **Success Criteria:**
  - The repeatable `GenerationIntegrityCheck` passes: fresh generate semantically reproduces committed artifacts, OR every divergence is in the ratified `IntentionalDivergenceManifest`.
  - Application MCP re-indexed; serves OKLCH primitive colors, full component-token tier, correct theme-varying flags.
  - **Non-provisional certification achieved via documented-CLI reproduction** — now attainable because **Spec 118 Increment 1** (not the retired Task 2 one-liner) makes the documented `generate` CLI run end-to-end. The decision-record item 3/7 superseded status is now **resolved**: its authoritative correction is [`findings/118-closeout-note.md`](findings/118-closeout-note.md). **Restored trust is config-load-path ONLY** — the raw-`.ts` exports (`./blend`/`./build`/`./types`) stay unverified until **118 Increment 3b** and are out of 117's renewed scope; 117's documented-`generate` path does not depend on those subpaths at runtime.

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
    **Depends on**: **Spec 118 Increment 1** (committed `041aaea8`) — supplies the runnable documented CLI. Formerly a Finding-2 Blocked-Task gated on the retired Task 2; that blocker is now resolved externally. The trust gate is **executable**; 117 re-runs it to certify on its own behalf (118 does not lift 117's provisional status for it).
    - Re-diff after all fixes; regenerate → reindex Application MCP → confirm OKLCH colors, component tier (+ dist ComponentTokens), theme-varying.
    - Reproduce the baseline via the **documented CLI** (now runnable via 118 Increment 1) → lift `provisional`; certify **non-provisionally**.
    - **Confirm `configLoadEquivalentToWorkaround` (migrated from the retired Task 2):** resolved config under the documented CLI matches the ts-node workaround (`tokenSourceMode: 'package'`, `themes: []`) — the equivalence that closes the audit's `provisional` ceiling.
    - **Scope guard:** certify the documented-`generate` path only; do NOT extend certification to the raw-`.ts` exports (`./blend`/`./build`/`./types`), which are tracked to 118 Increment 3b.
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
2. **Task 2 RETIRED** — the documented `generate` CLI is restored externally by **Spec 118 Increment 1** (not a 117 one-liner). Tasks 3–4 verify via the documented CLI, and Task 5.3's trust gate is now attainable, without any 117 CLI fix.
3. **Task 3 = merged spine fix** (R3+R5) per `sharedRootCauseConfirmed: true` — one upstream-source correction, two verified readouts. **Next actionable work.**
4. **Task 4 (R4) + N2** — disjoint artifacts from Task 3 (`components.yaml`/`dist/ComponentTokens.*` vs `primitives/semantics.yaml`), so single-variable attribution holds without interleaved re-diff; Task 5.3 confirms the whole. Double-registration traced here (carried from 1.2).
5. **Task 5.3** — unblocked by **Spec 118 Increment 1**; documented-CLI reproduction lifts `provisional` (config-load path only; raw-`.ts` exports tracked to 118 Increment 3b).
6. **Task 6** — clean-exit (N1 logged; ballot proposals).

## Validation-Tier Note

Tier 3: audit, checkpoint, harness, merged spine fix, E2E. Tier 2: R4 loader, fixture. Tier 1: documentation. *(The former Tier-2 CLI one-liner is retired — Finding 2 is resolved externally by Spec 118 Increment 1.)*
