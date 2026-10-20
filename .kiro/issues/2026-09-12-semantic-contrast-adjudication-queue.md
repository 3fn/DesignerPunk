# Semantic Contrast Adjudication Queue — 16 Sub-AA Pairs Exempted at the F4 Remediation

**Date**: 2026-09-12
**Discovered by**: Ada, while shipping the `color.feedback.success.text` WCAG fix (Spec 112 audit F4 remediation) — the new `SemanticColorContrast.test.ts` guard measured every text-role pair for the first time
**Domain**: Ada (token remaps) — **color choices need Peter's adjudication** (visible design changes)
**Severity**: High — includes a dark-mode body-text failure more severe than the defect the fix session was sent for
**Status**: **DEFERRED (re-anchored 2026-10-18 to Peter's planned redesign; the 125-B campaign-close trigger fired and was superseded)** — spec-track; see § "The sustained fix", § "Deferral ruling" and § "Measured at the Spec 130 switch read (2026-10-18) — pinned, deferred" below. Interim dark-text fix carved out and shipped (see § "Interim fix"). **Exemption count (2026-10-18)**: the title's 16 is the F4-time count; the guard's `EXEMPT` list pins 15 live text pairs today, and the 2026-10-18 section adds 5 non-text pairs pinned in this record only, for **20 live pinned pairs**.

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
- Known re-break point for the spec (interim fix, 2026-09-13): `src/generators/__tests__/ModeAwareGeneration.test.ts` needs a genuinely non-theme-varying token as its example; the interim fix moved it OFF `color.text.default` and onto `color.feedback.error.text` — which is itself on this queue. When the spec adds dark feedback overrides, that test premise breaks again; expect it, swap the example (or rewrite the test to derive a non-varying token instead of naming one).

---

## The sustained fix (design sketch, settled in discussion with Peter 2026-09-13 — the future spec's seed)

A "Semantic Contrast & Theme Coverage" spec (Thurgood formalizes, Ada central, Lina consult on component compositions). The class being killed: **contrast guarantees that exist only as assumptions.** Five deliverables:

1. **Declared pairing contracts** — every text-role token declares (machine-readable, MCP-served) what it is guaranteed against: canvas, family background, or both. Evidence base: shipped components compose BOTH models (BVLI/Chip-Filter: select text on select background; Progress nodes: text on family background; validation messages: text on canvas). Families needing both surfaces get distinct tokens via the existing `contrast.on*` pattern — one token does not serve two surfaces it cannot satisfy.
2. **Complete dark theme** — a designed pass over all 62 semantic color tokens: every token gets an explicit dark override OR an explicit same-in-both-modes declaration that passes its contract. The silent fallback-to-light (56/62 today) stops being a valid state — it is the root cause of 10 of the 16 queue failures.
3. **Ramp completeness where the math demands it** — three proven gaps where NO existing step satisfies AA: light gray (nothing between gray200 3.64 and gray300 5.51 — muted's gap), orange (4.23 → 7.53 jump — warning's gap), green (no step clears green100 — the family-background problem). Each resolves by a new primitive (Peter review, token governance) or a ratified usage constraint (e.g. large-text-only).
4. **Guard graduates to contract enforcement** — `SemanticColorContrast.test.ts` asserts each token's DECLARED contract in every theme/mode; the exemption list burns down to empty at spec close and stays the spec's progress chart.
5. **wcag theme gets an honest definition** — today 8 role-remap overrides wearing Spec 112 R8 AC4's unsubstantiated ≥7:1 AAA label. Decide: AAA contrast theme (build the machinery) or color-vision-safety theme (re-scope the claim); either way, contract + guard.

**Definition of done**: no semantic color token resolves anywhere, in any theme/mode, without a declared contract and a passing assertion behind it.

**Precondition**: fix `.kiro/issues/2026-09-12-mcp-token-details-dark-value-stale.md` first — dark-theme work needs the MCP to report true dark values.

## Deferral ruling (Peter, 2026-09-13)

Deferred until **125-B campaign close** (waves 3–4 + 5.Z), on three grounds settled in discussion: (1) Peter's decision bandwidth is the shared bottleneck — the spec is decision-dense and would contend with campaign ballots/prunes for the same reviewer; (2) Wave 3 (5.4 C7–C9) measures exactly the doc surfaces this spec would churn (Token-Governance, Token-Quick-Reference, rosetta docs, color guidance) — quiet surfaces make better instruments; (3) deferral is cheap NOW because the guard pins all queue failures with exact ratios and breaks on regression or unadjudicated fix — a known, pinned, guarded queue is a scheduling decision, not silent drift. Recorded counter-argument: the remaining failures (notably dark feedback text 1.16–2.0:1) stay live for the deferral's duration. At campaign close, sequencing against Spec 123 is Peter's call.

## Interim fix (carved out, Peter-ratified 2026-09-13)

**Dark text hierarchy only**: Level 2 dark overrides `color.text.default → white100` (8.46:1), `color.text.muted → white300` (6.28:1), `color.text.subtle → white500` (4.53:1) — all vs. dark canvas gray400, ratios from the repo's `contrastRatio`. Kills the queue's most severe item (dark body text 1.536:1) with existing primitives and zero design invention; the picks form a clean preserved hierarchy the spec is expected to keep. The three dark text-hierarchy rows above are thereby REMEDIATED; all other queue rows stand.

## Measured at the Spec 130 switch read (2026-10-18) — pinned, deferred

*Signed: Ada, 2026-10-18.* Measured during the read-only G1 switch consult (`.kiro/specs/130-input-switch-base/inbound-from-ada.md`, commit `9e3d1aa00`). Method: the repo's `contrastRatio()` (`src/color/OklchConverter.ts`) over primitive values from `composedColorMap` (`src/tokens/color`), cross-checked against `dist/DesignTokens.web.css`. Floor: WCAG 2.1 SC 1.4.11, **3:1 for non-text UI components**. Canvas = `color.structure.canvas`: white100 `oklch(1 0 260)` in light, gray400 `oklch(0.42 0.018 260)` in dark (CSS line 558).

These are **non-text** pairs. `SemanticColorContrast.test.ts` asserts text pairs only, so these 5 are pinned **in this record only**; no test breaks if they regress or are fixed.

| # | Pair (token → primitive) | Context | Ratio | Read from |
|---|---|---|---|---|
| 1 | `accessibility.focus.color` → cyan300 `oklch(0.76 0.148 202.5)` vs canvas white100 | light, every theme (the value is fixed; it does not follow the wcag theme's teal swap) | **1.983** | CSS line 834 |
| 2a | `color.feedback.select.border.default` → gray200 `oklch(0.62 0.02 260)` vs canvas gray400 (Input-Checkbox-Base / Input-Radio-Base unchecked border) | dark | **2.324** | CSS line 540 |
| 2b | `color.feedback.select.border.rest` → cyan400 `oklch(0.64 0.125 202.5)` vs canvas gray400 (checked border: checkbox, radio, Chip-Filter) | dark | **2.711** | CSS line 539 |
| 3a | `color.action.primary` → cyan300 vs canvas white100, as a non-text fill | light-base | **1.983** | CSS line 545 |
| 3b | `color.action.primary` → teal300 `oklch(0.52 0.08 209)` vs canvas gray400, as a non-text fill (no dark-wcag override exists for it) | dark-wcag | **1.588** | CSS line 935 (wcag block) |

Passing for the record: `action.primary` dark-base 4.27; light-wcag 5.33. Focus ring dark 4.27.

**The class (4)**: (i) the guard has no non-text 3:1 pairing; its header lists "Non-text roles … and their 3:1 floor" under NOT COVERED. (ii) The select family has no dark overrides: none of the six `color.feedback.select.*` tokens appears in `src/tokens/themes/dark/SemanticOverrides.ts`, so 2a/2b are the same root cause as the § "The queue" dark rows (light primitives resolving against the dark canvas). Both belong to deliverables 2 and 4 of § "The sustained fix".

**Ruling**: Peter, 2026-10-18 (relayed): accessibility contrast issues are punted for now; a larger redesign is being considered to complement DesignerPunk's development maturation. These pairs are pinned here as exemptions; the queue's new trigger is that redesign (or Peter's go), replacing the fired 125-B campaign-close trigger.

*Provenance note (Ada)*: the ruling arrived by coordinator relay and is recorded as relayed; there is no ballot for it, since it re-anchors a deferral rather than changing governance law.

**Not deferred**: Spec 130's own switch tokens are designed to pass 3:1 now, irrespective of this deferral: an outlined off state (theme-varying off outline gray300 / gray100: 5.51 / 3.41 vs canvas) and a theme-varying on fill (cyan400 or cyan500 / cyan300 / teal300 / teal200: all ≥ 3.12 vs canvas). See `.kiro/specs/130-input-switch-base/inbound-from-ada.md` § (d).

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 17, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (Peter's redesign or his go, per the 2026-10-18 ruling) · `P2 obligation (guard) · owed-act` (the contrast guard carries pinned exemptions). Add an `**Owner**:` line.
