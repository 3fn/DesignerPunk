# Design Outline: Token-Index Generation Integrity (OKLCH completion + drift closure)

**Date**: 2026-06-13
**Spec**: 117 - Token-Index Generation Integrity
**Status**: Design Outline (exploratory — pre-requirements). Revised after Thurgood R1 (2026-06-13).
**Owner**: Ada (Rosetta pipeline)
**Reviewers**: Thurgood (verification/governance, co-reporter), Lina (component-token loading angle)
**Source issue**: `.kiro/issues/2026-06-13-token-index-generation-gaps.md`
**Related specs**: 112 (OKLCH migration), 115 (post-OKLCH stabilization), 116 (sync/customization safety — **decoupled**, see §4)

> This is a thinking document. It explores the problem space, records verified root causes, lays out
> design directions with open questions, and frames scope. It deliberately does **not** contain formal
> EARS requirements, final implementation detail, or task breakdowns — those come after this outline is
> reviewed. Revisions from review feedback are tagged inline (e.g. "Thurgood R1").

---

> **⚠ FORWARD CONTEXT — captured note (not the substantive decision-record correction, which is gated on 118 Inc 1)**
>
> Spec 117 is **provisional**. The genuine unblock for **Task 5.3** is **Spec 118 Increment 1** (the TS-aware
> config loader) — **NOT** 117's own Task 2 one-liner. The Task 2 one-liner only relocates the failure one hop
> down the barrel chain; it does not make the documented-CLI config-load path certain.
>
> - **Closeout mechanism:** a 118 subtask writes the authoritative guidance note into 117's dir once 118 Inc 1
>   makes the config-load path certain; 117 then re-runs its **own** Task 5.3.
> - **Positioning:** 117 closes out right after 118 Increment 1, before 122/123.
> - **Scope of restored trust:** scoped to the **config-load path** only. The **exports path stays unverified**
>   until **118 Increment 3b**.
> - **See:** `.kiro/specs/118-module-resolution-coherence/design-outline.md` § "Relationship to Spec 117" +
>   Decision 4.

---

## Guiding Principle — "Get it right" over "Get it right now" (Peter, 2026-06-13)

Every decision in this spec must serve the **holistic, sustainable health of DesignerPunk** — not the fastest local patch. Short-term fix-its are precisely what produced this spec: silent drift accumulating unnoticed across three artifacts in two days. When a choice trades long-term integrity for speed, **long-term integrity wins.**

**This governs requirements, design, and tasks, and is the explicit tie-breaker when scoping decisions arise:**
- Fix the **shared root cause**, not the symptom (e.g., the suspected single color-primitive-shape cause behind Finding 1 + Q4 — fix the spine, not each leaf).
- Prefer a **verification that prevents recurrence** over a one-time correction (the generation-integrity check *is* the point, not just re-emitting OKLCH once).
- **Investigation-first** — understand the full picture before committing fixes.

**Honest counter-balance (so this stays a discipline, not a slogan):** "get it right" is NOT a license for unbounded scope or gold-plating. The guardrail is the clean-exit discipline already in this spec — the investigation surfaces everything, but the spec keeps **explicit completion criteria** and **logs out-of-scope findings to the issues registry** rather than absorbing them infinitely. "Get it right" means *don't ship a patch that leaves the root cause to resurface*; it does not mean *fix everything here*. Bounded scope and root-cause fixes aren't in tension — they're how sustainability actually works.

---

## 1. Problem Statement

The OKLCH color migration (Spec 112) is silently incomplete for the **token-index** generation path.
The Application MCP reads the token-index, so it currently serves **legacy RGBA color values** to every
agent that queries primitive colors — despite the migration being considered complete (Spec 115). The
semantic layer is correct (refs resolve fine); the primitive color *values* are stale-by-generation.

Investigation surfaced this as the **third instance in two days** of a generated artifact silently
drifting out of sync with no signal (alongside the consumer's promoted-token loss and the gitignore
source-tracking gap). The unifying theme — and the reason this is a spec rather than three patches — is
**generation integrity**: does `generate` produce internally-consistent output across all artifacts, and
does that output match what is committed?

**Why not deadline-bound:** Peter has confirmed no deadline pressure. The live MCP-serves-RGBA problem is
"wrong shade, not broken rendering" (RGBA still renders; most agent color decisions flow through semantic
tokens, which are correct). So completeness and sustainability are prioritized over speed.

---

## 2. Verified Root Causes

All three findings independently confirmed against the repo (not taken on report's word).

### Finding 1 (Primary, Ada) — token-index never migrated to OKLCH
- **Confirmed:** `token-index/primitives.yaml` = 216 `rgba(` / 0 `oklch(`; same-run `dist/DesignTokens.web.css` = 120 `oklch(`. Divergent formats from one run → token-index path bypassed the migration.
- **Confirmed:** `src/generators/generateTokenIndex.ts` emits `value: token.platforms.web.value` for primitives. For colors that field is the legacy mode-aware RGBA object.
- **Confirmed:** the purpose-built helper `src/generators/oklch/OklchTokenIndexMetadata.ts → getOklchMetadata` (Spec 112 R9) is **orphaned** — nothing imports it.
- **Helper shape:** `getOklchMetadata(color: ComposedColor) → { oklch: color.resolved, channels: { hue, lightness, chroma } }`. It needs a `ComposedColor`, not a resolved `PrimitiveToken`.

### Finding 3 (Ada) — committed token-index ≠ plain `generate` against current config
- A clean regeneration diverged from the committed index in ways beyond Finding 1:
  - `components.yaml` emptied (217 → 0) — CLI loads component tokens only in `tokenSourceMode: 'local'`; this repo's config is `'package'` mode.
  - `semantics.yaml` `themeVarying` flipped true → false — config has `themes: []`.
- **Implication:** the committed index was not produced by a plain `generate` against current config. Provenance unclear — must be **classified into four buckets** (see §4), not a bug/intended binary.

### Finding 2 (CLI/tooling — dependency, not core scope)
- `npx designerpunk generate --force` fails via the CLI's tsx/ESM loader; regeneration only completed via a `ts-node` CommonJS workaround.
- Likely the known June 10–11 CLI cluster. **Load-bearing here** because it blocks normal-path verification of the Finding 1 fix. Config-loading slice may touch Ada's `ConfigLoader`/`defineConfig`.
- **Baseline-validity threat (Thurgood R1):** since Finding 2 *is* a config-load failure, the `ts-node` workaround may load config **differently** than the documented CLI. An audit baseline built on the workaround diffs committed-vs-workaround, not committed-vs-documented-CLI — potentially invalidating conclusions. Until `generate` runs via the documented command, all baseline/audit conclusions are **provisional**. (Ada extension: this elevates Finding 2 from pure dependency toward a near-prerequisite — at minimum, characterize whether ts-node-load and CLI-load resolve config identically.)

---

## 3. Scope

### In scope
- **Finding 1:** migrate color primitives in the token-index generator to OKLCH (channels + resolved value), via the orphaned `getOklchMetadata` (or equivalent).
- **Finding 3:** investigate, classify (four buckets), and resolve the package-mode component-token loading and theme-varying-with-empty-themes anomalies.
- **Consumer blast radius (in-scope — Peter):** the same wrong-axis component-token loading gate also silently drops a *consumer product's* own component tokens in package mode — same root-cause fix, covered here per the guiding principle.
- **Generation-integrity verification (in 117, scoped — see §4):** a repeatable check that `generate` output is internally consistent and reproduces the committed artifacts.
- **Up-front bounded audit phase** (see §5). **Artifact inventory to diff (committed vs. fresh-generate) (Thurgood R1):** `token-index/{primitives,semantics,components}.yaml`; `dist/DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}`; `dist/ComponentTokens.{web,ios,android}`; `dist/product/ProductTokens.*` (if configured); theme/blend outputs. **Completion criterion (not "we feel done"):** every artifact diffed AND classified into one of the four provenance buckets (§4).

### Dependencies (not owned here, but tracked)
- **Finding 2 (CLI loader):** verification dependency / near-prerequisite (see §2 baseline-validity threat). Either resolved first by CLI/tooling, or the `ts-node` workaround is accepted with all baseline conclusions labeled **provisional**.

### Out of scope (proposed)
- Broad CLI/tsx architecture rework beyond the config-load slice.
- Re-litigating semantic-layer correctness (it's verified correct).
- The token-removal investigation (separate, still-open issue).
- A cross-cutting drift framework — Spec 116 is decoupled (different priorities/problems).

**Clean-exit discipline (Thurgood R1):** out-of-scope findings the audit surfaces are logged to the issues registry, not silently carried — the accumulation pattern is exactly what produced this spec.

---

## 4. Design Directions & Open Questions

### Finding 1 — wiring OKLCH into the token-index
- **The real question is data flow, not formatting.** `generateTokenIndex.ts` currently receives resolved `PrimitiveToken`s (web value = RGBA). `getOklchMetadata` needs the `ComposedColor` (with `.resolved` + `.channels`). The CSS generator already emits OKLCH, so the source data exists somewhere — design phase determines how to route `ComposedColor`/OKLCH source into the token-index path.
- **Open Q1:** correct `value` shape for a color entry — single representative `value` + `oklch`/`channels` metadata (matches the helper's "metadata on composed colors" intent), or mode-aware `value`? The MCP's `get_token_details` contract drives this.
- **Open Q2:** mode-awareness — one canonical OKLCH per token + channels, or all light/dark/wcag contexts? (Semantic layer handles theming via refs; primitives may only need base composed OKLCH + channels.)

### Finding 3 — classify into four provenance buckets (Thurgood R1)
Each anomaly is classified into one of four buckets (conflating them is the central risk):
- **(a) Migration gap** — generator never updated (the Finding 1 class).
- **(b) Generation bug** — wrong output for the *current* config.
- **(c) Config drift** — committed artifact predates a config change (stale-but-not-wrong).
- **(d) Hand-assembly** — manually edited.

- **Open Q3 (→ Lina) — ✅ classified (Lina R1):** `components.yaml` emptied in package mode = **bucket (b) Generation bug** (with a (c)-flavored consequence: the committed 217-entry artifact is stale-but-*correct* content the documented CLI can't currently reproduce). Package-mode exclusion of component tokens is NOT intended — they're a first-class served tier. **Root cause (Lina's domain):** the loading gate is on the **wrong axis** — gated on `tokenSourceMode` (where primitives/semantics resolve) when it should be gated on `componentTokens`/`componentTokenDirs` *presence*. Fixing the gate reproduces the committed artifact AND closes its provenance gap (doubles as exit-criterion verification). Recorded as (b) with the (c) consequence noted, since the (b)→(c) link is causal.
  - **Consumer blast radius (Lina R1, beyond original ask):** the same wrong-axis gate means a product consuming `@3fn/core` in package mode while authoring its *own* product component tokens would have them **silently dropped** — and the "none found" warning only fires in local mode. **Recommendation (Ada): in-scope for 117** — it's the *same* root-cause fix (the gate), so one fix covers both the source-repo index and the consumer case; the missing package-mode warning is a small adjacent facet. **✅ In-scope (Peter, 2026-06-13).**
- **Open Q4 (→ Ada, ThemeRegistry) — pre-analysis (C5, Ada):** Theme-varying has **two sources** in `computeThemeVaryingTokens` (`src/cli/themeVarying.ts`): (1) override keys from `config.themes`; (2) color tokens whose *primitive* has differing light/dark `base` values — **source 2 is independent of `config.themes`.** So `themes: []` zeroes source 1 but must NOT zero source 2. Correct rule: theme-varying = (config override keys) ∪ (primitive light/dark differences). A fresh generate yielding **all-false is therefore a generation bug (b)** — the committed `true` is likely correct, NOT config-drift.
  - **⚠️ Likely shared root cause with Finding 1 (hypothesis for the investigation):** source 2 reads `primitive.platforms.web.value`, requires the `{ light:{base}, dark:{base} }` object, and skips refs starting with `rgba(`. The same post-OKLCH-migration color-primitive value representation that leaves RGBA in the index (Finding 1) is the prime suspect for why source 2 stopped firing. **Finding 1 and Q4 may be ONE root cause, not two** — fixing the color-primitive shape may resolve both. To be confirmed in the audit. (Pre-analysis from code reading, not yet verified.)

### Generation-integrity verification (C2 resolved — Thurgood R1)
**Decision:** stays **in 117, scoped to this pipeline surface** (does `generate` reproduce the committed token-index + dist artifacts?) — NOT a cross-cutting drift framework. Spec 116 is decoupled; the earlier "unify with 116 Q5" framing is withdrawn. 117 states the requirement and implements it as the audit's exit criterion plus a repeatable check. Owner: Thurgood (verification).
- **Open Q5 (sharpened):** the requirement must define what **"equals" means** — *semantic* equality, not byte-equality. Generated artifacts carry volatile fields (ISO timestamps in headers, e.g. `generated ${new Date().toISOString()}`, `lastIndexTime`) and theme/mode ordering/formatting that can differ without being wrong. The check must normalize/exclude volatile fields and compare semantic content. (Byte-equality is definitionally impossible given the timestamps — Ada concurs and notes this is a concrete implementation constraint.)

---

## 5. Proposed Sequencing — investigation-first (Peter, 2026-06-13)

**Governing principle:** run the *full investigation/audit first* — before committing to any fixes — so anything it surfaces can reshape the holistic, sustainable view of the issues. Fix-side work is deliberately not pre-planned in detail; its steps are derived from what the investigation finds (see "Informed-placeholder approach").

1. **Investigation / full baseline audit (first — gates everything).** Diff committed vs. fresh-generate across the full artifact inventory (§3); classify every anomaly into the four buckets (§4); run the orphaned-helper-class scan (§8); characterize Finding 2's config-load behavior. **Scope freezes at the end of this phase.** Do **not** fix Finding 1 (or anything) mid-investigation — a complete baseline before any fix preserves single-variable attribution and lets new findings reshape the approach.
   - **➤ Post-investigation checkpoint (Peter, 2026-06-13):** before any fix, a human review of the audit findings to adjust the fix-side requirements (R3–R5), scope, and approach. Solutions are NOT locked in ahead of understanding the problems — the audit may revise the diagnosis (e.g., confirm/refute the Finding 1 ↔ Q4 shared-root-cause hypothesis), and requirements/design are updated accordingly. A formalization re-gate, not a status check.
2. **Finding 1 fix** — after the baseline. Then **re-diff** to confirm Finding 1 resolved AND isolate the Finding 3 residue.
3. **Finding 3 resolution** — after four-bucket classification (Q3/Q4).
4. **Generation-integrity verification** — Thurgood-led; the repeatable check + the semantic "equals" definition (Q5).
5. **Re-verify end-to-end** — regenerate → reindex Application MCP → confirm OKLCH served.

**Exit criteria (C3 resolved — Peter, 2026-06-13):** the spec completes only when (a) all three original findings are resolved (or classified-and-resolved); (b) any new findings the investigation surfaces are logged and triaged (in-scope or deferred to the issues registry); and (c) the final baseline is **reproduced via the documented `generate` CLI** — the trust gate that makes "fully investigated" certifiable. Until (c), all baseline conclusions are labeled **provisional**.

**Informed-placeholder approach (proposed — for tasks.md):** matches the documented *Informed Placeholder Tasks* pattern (Process-Task-Type-Definitions, 2026-03-01) — the investigation is the upstream task; the fix tasks (Finding 1 / Finding 3 / verification) are *informed placeholders* whose steps are written from the investigation's findings, not guessed up front. Implication: requirements can fully specify the **investigation's contract** now (audit scope, four-bucket classification, "equals" definition, documented-CLI trust gate); **fix-side** requirements/tasks are finalized after the investigation. Requirements are investigation-*informed*, not frozen pre-investigation.

---

## 6. Dependencies & Ownership

| Item | Owner | Notes |
|------|-------|-------|
| Finding 1 (token-index OKLCH) | Ada | Core Rosetta pipeline |
| Finding 3 (package-mode / theme-varying) | Ada | Intersects ThemeRegistry; classify first |
| Finding 2 (CLI loader) | CLI/tooling | Verification dependency/near-prerequisite; config-load slice may be Ada |
| Generation-integrity verification | Thurgood | In 117, scoped to this surface; loop early |
| Application MCP reindex | Thurgood | Deferred until Finding 1 lands |

Per Spec-Feedback-Protocol, Thurgood (R1 received) and Lina (pending) are identified reviewers.

---

## 7. Open Questions / Checkpoints

- **C1 (Peter):** ✅ Resolved — spec name/number `117-token-index-generation-integrity` confirmed (Peter, 2026-06-13).
- **C2 (Peter + Thurgood):** ✅ Resolved — verification stays in 117, scoped to this pipeline surface; 116 decoupled (Thurgood R1; Peter confirmed).
- **C3 (Ada + Thurgood + Peter):** ✅ Resolved — investigation-first; proceed on the `ts-node` workaround with conclusions *provisional*; exit criteria include documented-CLI reproduction as the trust gate (§5). (Peter, 2026-06-13)
- **C4 (→ Lina):** ✅ Resolved — bucket (b) generation bug **confirmed (Peter)**; wrong-axis loading gate (`tokenSourceMode` vs `componentTokens` presence); committed artifact stale-but-correct, reproduced by the fix. Consumer-blast-radius facet **in-scope (Peter)**.
- **C5 (Ada, ThemeRegistry):** ✅ Pre-analysis complete — leans bucket **(b) generation bug** (theme-varying source 2 is config-independent; `themes: []` must not zero it; committed `true` likely correct). **Surfaced a likely shared root cause with Finding 1** (color-primitive value shape) — to confirm in the audit. *Definitive classification deferred to the investigation phase.*

---

## 8. Observations / Learnings

- **The silent-drift pattern is the real target.** Three instances in two days, each a generated artifact diverging with no signal. Point fixes treat symptoms; this spec should leave behind a *verification* that makes the class detectable.
- **Orphaned-helper smell — scan as a class, not an instance (Thurgood R1).** `getOklchMetadata` was built for exactly this in Spec 112 but never wired in. Cheap, high-value audit extension: scan the Spec 112/115 OKLCH migration surface for *exported-but-never-imported* helpers — a migration that left one connection unmade may have left siblings. The integrity check (Open Q5) would also catch "helper exists, output unchanged" cases.
- **Provenance matters.** Finding 3 shows the committed index can't currently be reproduced by the documented `generate`. Reproducibility-from-committed-state is the same principle that bit us in the v12 publish incident — worth treating as a first-class property.
