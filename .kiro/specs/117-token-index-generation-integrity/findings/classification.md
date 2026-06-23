# Divergence Classification & Shared-Root-Cause Verdict — Spec 117 Task 1.2b

**Date**: 2026-06-13
**By**: Ada (Rosetta classification) — on Thurgood's empirical evidence pack (`findings/raw-divergences.md`)
**Status**: provisional (inherits Finding-2 provisional — documented CLI not run)
**Method**: source-verified, not document-only — read `themeVarying.ts`, `OklchTokenIndexMetadata.ts`, `generateTokenIndex.ts`, the token-index primitives' resolved values, and the canonical `dist/DesignTokens.web.css`.

> **Headline:** the F1↔F3b shared **code** root cause is **CONFIRMED** → `sharedRootCauseConfirmed: true` → recommend **merging Tasks 2 and 4**. Evidence below.

---

## The spine (one defect, two faces)

The token-index generation path reads the legacy **`primitive.platforms.web.value`** field. Post-OKLCH (Spec 112/115), that field is a **collapsed, single-mode rgba snapshot** — it lost *both* the OKLCH format *and* the light/dark differentiation. The canonical dist path (`generateTokenFiles`) instead reads the OKLCH **mode-resolved** data and is correct.

**Proof of collapse** (committed token-index `platforms.web.value`):
| Primitive | light.base | dark.base | dist emits |
|---|---|---|---|
| white100 (backs `color.structure.canvas`) | `rgba(255,255,255,1)` | `rgba(255,255,255,1)` | `light-dark(oklch(1 0 260), oklch(0.42 0.018 260))` |
| cyan300 / cyan500 / gray300 / teal400 / black500 | = light | = light (collapsed) | mode-varying via `light-dark()` |

`white100.dark.base` is **white** in `platforms.web.value`, but dist resolves canvas-dark to **near-black** (`oklch(0.42…)`). The variance is real; `platforms.web.value` cannot see it.

- **F1 reads this field** → emits rgba (wrong format).
- **F3b reads this field** → compares `light.base !== dark.base` → always equal (collapsed) → detects **0** theme-varying.

Both fail for the *same* reason: the token-index path was left behind by the OKLCH migration and reads the deprecated field instead of the mode-resolved OKLCH source dist uses.

### What "merge" means (and the counter-argument)
**Counter-argument (mandatory):** F1 and F3b are different *operations* — F1 emits a value, F3b compares two values — so they aren't "one fix."
**Response:** they share one *root*: the token-index path's disconnection from the OKLCH mode-resolution source. The spine fix is **give the token-index path the mode-resolved OKLCH data** (the resolved light/dark sets `generateTokenFiles` already uses); from that single source, F1 reads the value (oklch + channels) and F3b compares mode-resolved light vs dark. The merge is **"one shared source, two readouts,"** NOT "one function does both." Merging matters precisely *because* splitting risks each fix re-deriving mode data differently — reproducing the inconsistency we're removing.

**Precision on the shared source (don't mis-scope the merged fix):** `getOklchMetadata(ComposedColor)` returns `color.resolved` (a *single* Oklch) + channels — it is **not** mode-aware. So it alone supplies F1's channels/value but **not** the light/dark F3b needs. The mode-aware truth (canvas light=white / dark=near-black) is the **Stage-4 mode resolution** (resolved light/dark sets) that `generateTokenFiles` consumes to emit `light-dark()`. The merged fix therefore wires the token-index path to that **mode-resolution output**, with `getOklchMetadata` supplying channel metadata. This also pre-informs the **R3 value-shape decision (Q1/Q2): lean mode-aware** — the token-index color `value` should carry light/dark oklch to match dist *and* to let R5 derive theme-varying from the same data. *(Exact resolver wiring — which Stage-4 function the token-index path calls — confirmed during the fix; not yet traced to the call site. The verdict does not depend on it: the token-index reading stale `platforms.web.value` instead of mode-resolved OKLCH is conclusive regardless of the plumbing.)*

---

## Four-bucket classification

### Finding 1 (R3) — token-index color is legacy rgba
- **Bucket: (a) migration-gap.** OKLCH migration updated dist generation but never wired the token-index generator to the OKLCH source; `getOklchMetadata` orphaned (test-only import); `generateTokenIndex.ts:~117` emits `token.platforms.web.value`.
- **`correctTarget: neither`.** Committed & fresh both rgba; the correct answer is the OKLCH mode-resolved value (as dist emits). Invisible to committed-vs-fresh (both legacy) — caught by the absolute scan.

### Finding 3a (R4) — component tier dropped
- **Bucket: (b) generation-bug → (c).** Package-mode gate skips `loadComponentTokens` despite configured sources (b); committed `components.yaml` (27 tokens) is the stale-but-correct reference (c) the fix should reproduce.
- **`correctTarget: committed`** for `token-index/components.yaml`. The R4 fix (gate on source presence) makes fresh reproduce the 27.

### Finding 3b (R5) — theme-varying collapses to zero
- **Bucket: (b) generation-bug.** `computeThemeVaryingTokens` reads the collapsed `platforms.web.value` → 0 detected.
- **`correctTarget: neither (exactly)`.** Fresh (0) definitively wrong (canvas et al. ARE mode-varying — dist proves). Committed (10) approximates but is **not certified**: dist emits **7** `light-dark()` tokens vs committed's 10. The fix must derive theme-varying from the mode-resolution source and **verify against dist's mode-aware set**, reconciling the 10-vs-7 gap (likely WCAG-varying or feedback/teal tokens emitted via a non-`light-dark()` mechanism). Do NOT hardcode "restore committed's 10."

### Shared verdict (Decision 4 / `DecisionRecord.sharedRootCauseConfirmed`)
**`true` — shared CODE root cause.** F1 and F3b both read `platforms.web.value`; the fix is one shared-source correction with two readouts. **Recommend merging Task 2 (R3) and Task 4 (R5)** into a single spine fix, verified by both R3 (no rgba; oklch + channels matching dist) and R5 (theme-varying matches dist's mode-resolved set). This is "fix the spine, not the leaf" — now empirically earned, not assumed.

---

## New-finding dispositions (R1 AC5)

### N1 — BlendUtilities: **in-scope inventory correction + deferred finding**
- Inventory error: web entry was `.web.css`; `TokenFileGenerator` writes `BlendUtilities.web.**ts**` / `.ios.swift` / `.android.kt`.
- BUT even corrected, **none exist** in committed or fresh dist — `generate` is not producing them (the code at `TokenFileGenerator.ts:177–222` isn't exercised in this config).
- **Disposition:** (1) **Thurgood: remove the 3 BlendUtilities entries from `src/tools/integrity/inventory.ts`** (false `missing-committed` noise; not a current generate output). (2) **Log a deferred finding** to the issues registry: *"BlendUtilities generation code exists in TokenFileGenerator but is not exercised by `generate`; no `dist/BlendUtilities.*` produced."* — **out of scope for 117** (token-index integrity); separate investigation. Why/where/impact recorded.

### N2 — ComponentTokens dist: **the dist-side manifestation of F3a (not separate)**
- Committed `dist/ComponentTokens.web.css` is **header-only / empty**; committed `components.yaml` has 27 → committed state is internally inconsistent.
- `dist/ComponentTokens.*` are "equal" committed-vs-fresh only because **both are wrong (empty)** — same masking as F1.
- **Disposition:** fold into F3a. The R4 fix (load component tokens on source presence) will populate **both** `components.yaml` *and* `dist/ComponentTokens.*`. So `dist/ComponentTokens.*` `correctTarget: neither` (should be populated post-fix). The R4 verification (P4) must assert the dist component output is populated too, not only the token-index tier.

---

## Recommendation for the 1.3 checkpoint (DecisionRecord inputs)

- **R3:** kept (contract holds) — folds into the merged spine fix.
- **R4:** kept — **scope note:** verification must cover the dist `ComponentTokens.*` side (N2), not just `components.yaml`.
- **R5:** kept — **scope note:** correct target is dist's mode-resolved set, not committed's 10; reconcile the 10-vs-7 gap in the fix.
- **`sharedRootCauseConfirmed: true`** → merge Tasks 2 & 4 (shared source, two readouts).
- **New findings:** N1 → inventory correction (Thurgood) + deferred issue; N2 → folded into R4 scope.
- **Provisional** until documented-CLI reproduction (Finding 2 / Task 5.3).

→ Handing back to Thurgood for AuditReport assembly + completeness (Task 1.2c), then Peter's checkpoint (Task 1.3).
