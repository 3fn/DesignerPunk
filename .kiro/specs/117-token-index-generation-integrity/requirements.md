# Requirements Document: Token-Index Generation Integrity

**Date**: 2026-06-13
**Spec**: 117 - Token-Index Generation Integrity
**Status**: Requirements Phase
**Dependencies**:
- Spec 112 (OKLCH migration) — Complete. This spec completes its token-index gap.
- Spec 115 (post-OKLCH stabilization) — Complete.
- Finding 2 (CLI tsx/ESM loader) — **Dependency, not owned here. Status: RESOLVED by Spec 118 Increment 1** (committed `041aaea8`, 2026-06-24). Required for the documented-CLI trust gate (R2); now satisfied — the documented `generate` CLI runs end-to-end, so baseline conclusions are no longer categorically *provisional* (R1 AC6 condition resolves). The originally-assumed one-line fix was empirically false; the genuine unblock is 118's TS-aware config loader + a `require` condition on `./config`. See [`findings/118-closeout-note.md`](findings/118-closeout-note.md). Restored trust is **config-load-path only**; raw-`.ts` exports stay unverified until 118 Increment 3b (outside this spec's scope).
- Spec 116 (sync/customization safety) — **Decoupled** (different priorities); no dependency.

---

## Introduction

The token-index generation path silently drifted out of sync — both from the OKLCH migration (it still emits legacy RGBA color values, which the Application MCP serves to every agent) and from the committed repository state (a fresh `generate` against current config diverges in component-token and theme-varying output). Investigation surfaced this as the *third* instance in two days of a generated artifact drifting with no signal.

This spec restores **generation integrity** holistically: it does not patch three symptoms in isolation — it fixes the shared causes and leaves behind a verification that makes silent drift detectable.

### Key Principles

1. **Guiding principle — "Get it right" over "Get it right now."** Every decision serves the holistic, sustainable health of DesignerPunk over the fastest local patch. When integrity and speed conflict, integrity wins. This is the explicit tie-breaker for scoping decisions — fix the shared root cause, prefer recurrence-preventing verification, investigate before fixing. It is bounded by clean-exit discipline (explicit completion criteria; out-of-scope findings logged, not absorbed): "get it right" means *don't leave the root cause to resurface*, not *fix everything here*.
2. **Investigation-first.** A complete baseline audit gates all fixes, preserving single-variable attribution. New findings reshape the approach before any code changes.
3. **Informed-placeholder.** These requirements specify *outcomes* (what "right" looks like) and the *investigation's contract* concretely. Exact fix mechanics finalize in design/tasks, informed by the audit. Requirements are investigation-informed, not frozen against assumptions.
4. **Semantic equality + trust gate.** "Reproduces" means semantic equality (volatile fields normalized), and certification requires reproduction via the documented `generate` CLI.

### Provenance Classification (four buckets)

Audit divergences are classified into exactly one of: **(a)** migration gap, **(b)** generation bug, **(c)** config drift, **(d)** hand-assembly — recording (b)→(c) causal links where one causes the other. Current diagnosis: Finding 1 = (a/b); Finding 3 component-token = (b) causing (c); Finding 3 theme-varying = (b), likely sharing Finding 1's root cause.

---

## Requirements

### Requirement 1: Bounded Investigation / Baseline Audit

**User Story**: As the Rosetta pipeline maintainer, I want a complete baseline audit of generation drift before any fix, so that scope is known up front and single-variable attribution is preserved.

#### Acceptance Criteria

1. WHEN the audit runs THEN it SHALL diff, committed-vs-fresh-generate, every artifact in the inventory: `token-index/{primitives,semantics,components}.yaml`; `dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}`; `dist/ComponentTokens.{web,ios,android}`; `dist/product/ProductTokens.*` (if configured); and theme/blend outputs.
2. WHEN an artifact diverges THEN the audit SHALL classify each divergence into exactly one of the four provenance buckets, recording (b)→(c) causal links where applicable.
3. The audit SHALL be considered complete only when every inventory artifact is both diffed AND classified.
4. The audit SHALL scan the Spec 112/115 OKLCH migration surface for exported-but-never-imported helpers (orphaned-helper class scan).
5. WHEN the audit surfaces findings beyond the three original findings THEN it SHALL log them to the issues registry and triage each as in-scope or deferred — never silently carry them.
6. IF the documented `generate` CLI cannot run (Finding 2) THEN all baseline conclusions SHALL be labeled *provisional* until reproduced via the documented command.
7. No fix SHALL be applied before the baseline audit completes.
8. WHEN the baseline audit completes THEN there SHALL be a **post-investigation checkpoint** (human review) to adjust the fix-side requirements (R3–R5), scope, and approach in light of the findings, *before* any fix is committed. Solutions SHALL NOT be locked in ahead of the investigation's conclusions: the audit may revise the diagnosis (e.g., confirm or refute the Finding 1 ↔ R5/Q4 shared-root-cause hypothesis), and the requirements/design SHALL be updated accordingly. This is a formalization re-gate, not a status check.
9. WHEN the post-investigation checkpoint occurs THEN it SHALL produce a **dated decision record** capturing, for each fix-side requirement (R3–R5), an explicit kept / revised / rescoped determination with rationale — so the re-gate is certifiable rather than aspirational.

### Requirement 2: Generation-Integrity Verification

**User Story**: As a maintainer, I want a repeatable check that `generate` reproduces the committed artifacts, so that silent drift becomes detectable rather than discovered by accident.

#### Acceptance Criteria

1. The verification SHALL assert that a fresh `generate` reproduces the committed token-index and dist artifacts, OR that every divergence is classifiable and intentional.
2. The verification SHALL define "reproduces"/"equals" as **semantic equality** — normalizing or excluding volatile fields (ISO timestamps, `lastIndexTime`) and ordering/formatting that differ without being wrong. Byte-equality SHALL NOT be the criterion.
3. The verification SHALL be runnable as the audit's exit criterion and repeatably thereafter.
4. WHEN the final baseline is certified THEN it SHALL be reproduced via the documented `generate` CLI (the trust gate); until then, results remain provisional.
5. The verification SHALL cover this pipeline surface only and SHALL NOT expand into a cross-cutting drift framework (Spec 116 is decoupled).

> **Ownership note:** Requirement 2 is Thurgood's (verification/governance). 117 states the requirement; Thurgood implements the check.

### Requirement 3: Token-Index Color Primitives in OKLCH (Finding 1)

**User Story**: As an agent querying the Application MCP, I want primitive color tokens served as OKLCH (matching the `dist` CSS output), so that I receive correct color values rather than legacy RGBA.

#### Acceptance Criteria

1. WHEN the token-index is generated THEN color primitive entries SHALL carry OKLCH representation (resolved value plus channels: hue, lightness, chroma), consistent with the `dist` CSS output.
2. The generated token-index color values SHALL NOT contain legacy `rgba(` representations.
3. The migration SHALL route through the intended OKLCH source data — wiring the previously-orphaned path (e.g., `getOklchMetadata` or equivalent) rather than leaving it unconnected.
4. The color entry `value` shape SHALL satisfy the Application MCP `get_token_details` contract; the choice between a single representative value plus OKLCH metadata versus a mode-aware value SHALL be finalized in design.

### Requirement 4: Component-Token Loading Gated on Source Presence (Finding 3a + Consumer Blast Radius)

**User Story**: As a maintainer — and as a consumer product authoring its own component tokens — I want component tokens loaded whenever component-token sources are configured, regardless of token-source mode, so that the component tier is never silently dropped.

#### Acceptance Criteria

1. WHEN `componentTokens` / `componentTokenDirs` are configured THEN `generate` SHALL load and index component tokens, regardless of `tokenSourceMode`.
2. The loading gate SHALL key on component-token-source presence, NOT on `tokenSourceMode`.
3. WHEN component tokens are configured but none are found THEN the CLI SHALL emit a warning in all modes (not only `local`).
4. WHEN the corrected loader runs against this repository's config THEN the regenerated `components.yaml` SHALL semantically reproduce the committed component-token set, closing the (c) provenance gap (doubling as Requirement 2 verification).
5. WHEN a consumer product in package mode authors its own component tokens THEN those tokens SHALL be loaded and indexed (consumer blast radius covered).

### Requirement 5: Theme-Varying Computation Independent of Empty Themes (Finding 3b / Q4)

**User Story**: As a maintainer, I want theme-varying computed from both config overrides and primitive light/dark differences, so that an empty `themes: []` does not wrongly mark mode-varying colors as static.

#### Acceptance Criteria

1. WHEN computing theme-varying tokens THEN the result SHALL be the union of (a) config theme override keys and (b) color tokens whose referenced primitive has differing light/dark `base` values.
2. Source (b) SHALL be independent of `config.themes`; an empty `themes: []` SHALL NOT zero the theme-varying set.
3. WHEN the corrected computation runs THEN it SHALL semantically reproduce the committed `themeVarying: true` entries for mode-varying color tokens.
4. IF the investigation confirms a shared root cause with Finding 1 (the post-OKLCH color-primitive value shape) THEN the fix SHALL address that shared cause once, and both Requirement 3 and Requirement 5 verification SHALL pass from that single fix (per the guiding principle: fix the spine, not each leaf).

### Requirement 6: End-to-End Re-Verification

**User Story**: As a maintainer, I want the full generation→index→MCP chain re-verified after fixes, so that the MCP serves correct, reproducible data.

#### Acceptance Criteria

1. WHEN fixes land THEN `generate` SHALL be re-run and the Application MCP re-indexed.
2. WHEN re-indexed THEN the MCP SHALL serve OKLCH primitive colors, the full component-token tier, and correct theme-varying flags.
3. WHEN the documented-CLI reproduction is achieved THEN the Requirement 2 verification SHALL pass with conclusions no longer provisional.

### Requirement 7: Documentation

**User Story**: As a future maintainer or agent, I want the corrected generation behavior documented, so that the pipeline's behavior is discoverable and not re-derived.

#### Acceptance Criteria

1. WHEN generation behavior changes (OKLCH in the token-index, the component-token loading gate, the theme-varying rule) THEN the affected steering docs (Rosetta-System-Architecture; Token-Quick-Reference theme-varying / context-resolution) SHALL be updated via the **ballot-measure process** (Ada proposes; Peter approves) — Ada does not edit steering directly.
2. WHEN out-of-scope findings are deferred THEN they SHALL be recorded in the issues registry with rationale (why, where, impact).

> **Documentation waiver note:** This spec modifies generation *behavior*, not the token vocabulary — no new tokens or families are introduced. Documentation requirements are therefore scoped to behavioral-accuracy updates of existing steering docs, not new token-family documentation. **Waiver scope ratified by project lead (Peter, 2026-06-13).**

---

## Open Items Carried From Design Outline

- **C5 (theme-varying) definitive classification** is deferred to the investigation phase (Requirement 1), per investigation-first — it is entangled with Finding 1 (Requirement 5 AC 4).
- **Fix-side mechanics** (R3–R5) are stated as outcomes; exact implementation finalizes in design/tasks, informed by the Requirement 1 audit.
