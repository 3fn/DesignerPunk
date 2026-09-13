# Semantic Contrast Adjudication Queue — 16 Sub-AA Pairs Exempted at the F4 Remediation

**Date**: 2026-09-12
**Discovered by**: Ada, while shipping the `color.feedback.success.text` WCAG fix (Spec 112 audit F4 remediation) — the new `SemanticColorContrast.test.ts` guard measured every text-role pair for the first time
**Domain**: Ada (token remaps) — **color choices need Peter's adjudication** (visible design changes)
**Severity**: High — includes a dark-mode body-text failure more severe than the defect the fix session was sent for
**Status**: Open — queued for a dedicated session (possibly spec-sized; see root cause)

---

## Root cause, stated plainly

**The dark theme overrides only 6 of 62 semantic color tokens.** Every other token resolves its light primitive against the dark canvas (`gray400`), which is why the dark-mode column below fails almost across the board. This is a coverage gap in the dark theme's design, not a set of independent one-line bugs — which is why these were exempted for adjudication rather than patched piecemeal.

All ratios via the repo's `contrastRatio()` (OklchConverter), pinned in the exemption list of `src/tokens/__tests__/SemanticColorContrast.test.ts` — each exempt pair asserts BOTH still-failing AND still-measuring-what's-recorded, so any drift (regression or fix) breaks the test and forces re-adjudication here.

## The queue

**Light mode, on canvas (white100)** — AA floor 4.5:1:
| Pair | Ratio |
|---|---|
| `color.feedback.warning.text` (orange400) | 4.231 |
| `color.text.muted` (gray200) | 3.640 |
| `color.text.subtle` (gray100) | 2.480 |

**Dark mode, on canvas (gray400)** — the 6-of-62 root cause:
| Pair | Ratio |
|---|---|
| `color.text.default` (gray300) | **1.536 — dark-mode BODY TEXT; the most severe item here** |
| `color.feedback.info.text` | 1.155 |
| `color.feedback.error.text` | 1.561 |
| `color.feedback.warning.text` | 1.999 |
| `color.text.muted` | 2.324 |
| `color.text.subtle` | 3.411 |

**Light mode, on family `.background`** — pairing model itself needs adjudication first (see below):
| Pair | Ratio |
|---|---|
| `color.select.text.default` | 1.468 |
| `color.progress.current.text` | 1.573 |
| `color.progress.completed.text` (green400 on green100) | **2.632 — the IDENTICAL defect to F4, one-line fix once adjudicated** |
| `color.select.text.rest` | 2.820 |
| `color.feedback.warning.text` | 3.518 |
| `color.progress.pending.text` | 4.086 |
| `color.feedback.error.text` | 4.187 |
| `color.progress.error.text` | 4.187 |
| `color.feedback.success.text` (green500 on green100) | 4.369 |

## Decisions the session must settle (Peter)

1. **The pairing model**: is `.text` guaranteed against canvas only, or also against its family `.background`? Under the family model, NO step of the settled green ramp clears both pairings (green500 is the darkest) — meeting both would require a ramp design change, i.e., a Spec 112-design amendment, or a documented single-pairing contract.
2. **Dark-theme coverage**: fix the ~10 failing dark pairs individually, or treat 6-of-62 override coverage as the real defect and do a systematic dark-theme pass (spec-track).
3. **WCAG-theme threshold**: Spec 112 R8 AC4 asserts ≥7:1 (AAA) for the wcag theme; the F4 fix inherits base (AA) there — the AAA claim is itself unadjudicated (audit finding).
4. Text-hierarchy tokens (`muted`/`subtle`): sub-AA may be intentional for de-emphasized text under WCAG's incidental-text carve-outs — adjudicate rather than assume.

## Also carried here

- Lina advisory (F4 consult, 2026-09-12): dark-mode *inheritance* assertions may have no coverage in the component test layer (light-only in `colorInheritanceValidation.test.ts`) — flag for Thurgood's coverage view; the new contrast guard covers dark *resolution* but not component-layer inheritance.
