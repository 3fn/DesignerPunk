# Stemma Pre-Arm Adjudication — WCAG Re-arm + Validation Promotion (125-B U2)

**Spec**: 125-B-classification-map
**Task**: 4.2 — Stemma pre-arm audits (WCAG + validation-criteria): adjudication + fix preparation
**Agent**: Lina (Opus)
**Date**: 2026-07-14
**Requirements**: 12.1–12.3, 12.6 · **Design**: C7, DD3, DD4
**Branch**: `task/125-B-u2`

> **This table is surfaced in the U2 PR body. Peter's merge is its independent check.**
> Fix PREPARATION lands here; fix APPLICATION lands on 4.3's branch (same PR). 4.2 does NOT edit any `contracts.yaml` or the test file.

---

## TL;DR (quotable for the PR body)

- **Matcher**: `.kiro/specs/125-B-classification-map/completion/u2/wcag-required-matcher.ts` — exact four + `accessibility_*` + `content_*_label` (prefix AND suffix). 4.3 copies it VERBATIM; any change re-opens this audit.
- **WCAG selection**: **69 contracts** selected across 34 components (through the matcher + the armed check's own `COMPONENTS` loader → audit-clean ⇒ arm-green by construction).
- **WCAG nulls**: **7 total** → **4 genuine-defects (fix prepared)** + **3 legitimate-nulls (exempt via `wcag: "N/A"`, owner authority per Req 12.3)**.
- **Req 12.6 zero-validation inventory**: **0 zero-validation contracts** (234 non-inherited contracts, all carry validation). `:435` can flip to `withoutValidation === 0` with **no fixes and no escalations**.
- **PETER-ESCALATION CANDIDATE (1)**: the normative matcher's exact-four includes `state_disabled`, but the corpus has exactly **1 live `state_disabled` contract** (Button-CTA) against a documented design philosophy that disabled states should not exist (20 `excludes:` blocks). DD3's per-literal floor therefore couples the suite's green to a single contract under active philosophical pressure. See § Peter Escalation.
- **DESIGN-DOC DATUM CORRECTION**: DD3's recorded per-literal counts (11/11/21/4) are grep-counts that conflate live `contracts:` with `excludes:` entries. The armed check sees only `parsed.contracts` → **true live counts are 7/10/1/4**. 4.3's per-literal floor must use these.

---

## 1. The Normative Matcher (C7 / Req 12.2)

Source of truth: `wcag-required-matcher.ts` (this folder). Predicate, verbatim:

```ts
export const WCAG_REQUIRED_EXACT = new Set([
  'interaction_focusable',
  'interaction_focus_ring',
  'state_disabled',
  'state_error',
]);

export function isWcagRequiredContract(contractName: string): boolean {
  if (WCAG_REQUIRED_EXACT.has(contractName)) return true;
  if (contractName.startsWith('accessibility_')) return true;
  if (contractName.startsWith('content_') && contractName.endsWith('_label')) return true;
  return false;
}
```

**Placement decision (stated per task):** the matcher lives in the u2 completion folder, NOT in `src/__tests__/`. Rationale: 4.2's write scope excludes `src/__tests__/**`; the file is the **verbatim-copy source** for 4.3, which pastes it into the test file (replacing the legacy `:325–350` array). Continuity is guaranteed three ways: (a) 4.2's audit enumerated through this exact logic; (b) 4.3 copies it unmodified; (c) 4.3's bite fixtures re-verify the selection edges (the `content_` non-label exclusion; the four exact names). Any matcher edit re-opens this audit (LINA tasks-R1).

**Bare-prefix trap verified avoided:** `content_*_label` (prefix AND suffix) selects the 3 label contracts and **excludes 17** non-label `content_` contracts (content_displays_image, content_displays_count, content_label_text, content_renders, …). A bare `startsWith('content_')` would over-select all 17 — most legitimately `wcag: null` — and red the check. The suffix discipline is load-bearing. (Accepted residual: `content_label_text` on Progress-Indicator-Label-Base is label-adjacent but ends `_text`, so it is correctly NOT selected under the normative `_label` suffix rule.)

---

## 2. WCAG Selection Enumeration (Req 12.3)

Enumerated through `isWcagRequiredContract` + the armed check's `COMPONENTS` loader (auto-discovered dirs with non-empty `contracts.yaml`; 34 components).

**Selection totals — 69 contracts:**

| Selector | Live matches |
|---|---|
| exact `interaction_focusable` | 7 |
| exact `interaction_focus_ring` | 10 |
| exact `state_disabled` | **1** |
| exact `state_error` | 4 |
| `accessibility_*` | 44 |
| `content_*_label` | 3 |
| **Aggregate** | **69** |

**62 of 69 already carry valid WCAG refs** (enumerated below in condensed form; the 7 nulls are adjudicated in § 3).

Non-null selected contracts (component | contract | wcag):
- Avatar-Base | accessibility_decorative_mode | 1.1.1 · accessibility_alt_text | 1.1.1 · accessibility_color_contrast | 1.4.3
- Badge-Count-Base | accessibility_color_contrast | 1.4.3 · accessibility_text_scaling | 1.4.4
- Badge-Count-Notification | accessibility_announces_changes | 4.1.3 · accessibility_pluralized_announcements | 4.1.3
- Badge-Label-Base | content_displays_label | 1.3.1 · accessibility_color_contrast | 1.4.3 · accessibility_text_scaling | 1.4.4
- Button-CTA | interaction_focusable | 2.1.1 · state_disabled | 4.1.2 · interaction_focus_ring | 2.4.7
- Button-Icon | interaction_focusable | 2.1.1 · interaction_focus_ring | 2.4.7 · accessibility_aria_label | 4.1.2 · accessibility_touch_target | 2.5.5 · accessibility_color_contrast | 1.4.3
- Button-VerticalList-Item | interaction_focusable | 2.1.1 · state_error | 3.3.1 · interaction_focus_ring | 2.4.7
- Button-VerticalList-Set | accessibility_aria_roles | 4.1.2
- Chip-Base | interaction_focus_ring | 2.4.7 · interaction_focusable | 2.1.1 · accessibility_role | 4.1.2
- Chip-Filter | accessibility_aria_pressed | 4.1.2
- Chip-Input | accessibility_dismiss_label | 4.1.2
- Container-Card-Base | interaction_focus_ring | 2.4.7 · accessibility_aria_role | 4.1.2
- Icon-Base | accessibility_hidden | 1.1.1
- Input-Checkbox-Base | interaction_focusable | 2.1.1 · state_error | 3.3.1 · interaction_focus_ring | 2.4.7
- Input-Radio-Base | interaction_focusable | 2.1.1 · state_error | 3.3.1 · interaction_focus_ring | 2.4.7
- Input-Radio-Set | accessibility_error_announcement | 4.1.3 · accessibility_radiogroup_role | 4.1.2
- Input-Text-Base | interaction_focusable | 2.1.1 · content_float_label | 2.3.3 · state_error | 3.3.1 · interaction_focus_ring | 2.4.7 · accessibility_reduced_motion | 2.3.3
- Nav-Header-Base | accessibility_aria_roles | 4.1.2 · accessibility_touch_target | 2.5.5
- Nav-Header-Page | accessibility_heading | 1.3.1
- Nav-SegmentedChoice-Base | interaction_focus_ring | 2.4.7 · accessibility_aria_roles | 4.1.2 · accessibility_aria_controls | 4.1.2 · accessibility_alt_text | 1.1.1 · accessibility_reduced_motion | 2.3.3
- Nav-TabBar-Base | interaction_focus_ring | 2.4.7 · accessibility_aria_roles | 4.1.2 · accessibility_reduced_motion | 2.3.3 · accessibility_touch_target | 2.5.5 · accessibility_aria_label | 4.1.2
- Progress-Bar-Base | accessibility_progressbar_role | 4.1.2 · accessibility_milestone_announcements | 4.1.3
- Progress-Indicator-Node-Base | accessibility_reduced_motion | 2.3.3
- Progress-Pagination-Base | accessibility_actual_position | 4.1.2
- Progress-Stepper-Base | accessibility_progressbar_role | 4.1.2
- Progress-Stepper-Detailed | accessibility_list_role | 4.1.2

---

## 3. Null Adjudication (7 nulls → 4 fixes + 3 exemptions)

**Adjudication principle (owner read):** WCAG success criteria are *positive* requirements. A contract that expresses a **negative behavioral guarantee** (does-NOT-X: not interactive, renders NO heading) has no positive SC to satisfy and is a **legitimate-null** — exempted with reason (Req 12.3 sanctions "exempt or re-scope"; Req 12.2 anticipated the `accessibility_*` set would contain legitimate nulls). A contract that expresses a **positive accessibility behavior with a corpus precedent** for its SC is a **genuine-defect** — fixed by adding the ref.

| # | Component | Contract | Selector | Adjudication | Prepared fix (for 4.3) | Basis |
|---|---|---|---|---|---|---|
| 1 | Badge-Count-Base | `accessibility_non_interactive` | `accessibility_*` | **LEGITIMATE-NULL** → exempt | `contracts.yaml` line 105: `wcag: null` → `wcag: "N/A"  # legitimate-null: negative behavioral guarantee (non-interactive), no positive WCAG SC applies` | Negative guarantee ("does not respond to interaction"). 4.1.2 considered & rejected — a non-interactive badge is not a "UI component" under 4.1.2. |
| 2 | Badge-Label-Base | `accessibility_non_interactive` | `accessibility_*` | **LEGITIMATE-NULL** → exempt | `contracts.yaml` line 80: `wcag: null` → `wcag: "N/A"  # legitimate-null: negative behavioral guarantee (non-interactive), no positive WCAG SC applies` | Same as #1. |
| 3 | Nav-Header-App | `accessibility_no_heading` | `accessibility_*` | **LEGITIMATE-NULL** → exempt | `contracts.yaml` line 15: `wcag: null` → `wcag: "N/A"  # legitimate-null: negative behavioral guarantee (renders no heading), no positive WCAG SC applies` | Negative guarantee (absence of a heading). 1.3.1 considered & rejected — 1.3.1 is a positive-structure requirement; asserting *absence* satisfies no SC. |
| 4 | Nav-SegmentedChoice-Base | `content_displays_label` | `content_*_label` | **GENUINE-DEFECT** → fix | `contracts.yaml` line 125: `wcag: null` → `wcag: "1.3.1 Info and Relationships"` | Sibling precedent: Badge-Label-Base `content_displays_label` = `1.3.1 Info and Relationships`. A visible segment label provides the accessible name / info-relationship. (4.1.2 is a defensible alternative; 1.3.1 chosen for corpus consistency with the identically-named sibling.) |
| 5 | Progress-Indicator-Connector-Base | `accessibility_decorative` | `accessibility_*` | **GENUINE-DEFECT** → fix | `contracts.yaml` line 62: `wcag: null` → `wcag: "1.1.1 Non-text Content"` | Precedent: Icon-Base `accessibility_hidden` = `1.1.1 Non-text Content`. Hiding a decorative element from AT (aria-hidden) is the WCAG technique for 1.1.1 decorative content. |
| 6 | Progress-Indicator-Label-Base | `accessibility_decorative` | `accessibility_*` | **GENUINE-DEFECT** → fix | `contracts.yaml` line 68: `wcag: null` → `wcag: "1.1.1 Non-text Content"` | Same as #5. |
| 7 | Progress-Indicator-Node-Base | `accessibility_decorative` | `accessibility_*` | **GENUINE-DEFECT** → fix | `contracts.yaml` line 88: `wcag: null` → `wcag: "1.1.1 Non-text Content"` | Same as #5. |

**Post-fix state (for 4.3's arm):** after fixes 4–7 add refs and exemptions 1–3 set `"N/A"`, all 69 selected contracts satisfy the armed presence check (`contract.wcag && contract.wcag.length > 0`). Format check: `"N/A"` is explicitly whitelisted (test `:371`); the four added refs match `singleRefPattern`. **Audit-clean ⇒ arm-green by construction.**

### Note on the 3 `"N/A"` exemptions (surfaced for Peter's merge-check)

`wcag: "N/A"` is the honest "no positive SC applies" sentinel — it is the ONLY string the format test skips while still passing the presence check. This is within owner authority (Req 12.3 lists "exempt"), and the design expected legitimate nulls in the widened `accessibility_*` set (Req 12.2/12.3). Surfaced here transparently because marking an `accessibility_`-prefixed contract `"N/A"` is a slight semantic smell worth a human glance. **Not a blocker; not an escalation.** Re-scoping (renaming the contracts out of the matcher) was considered and rejected as heavier and less honest — the contracts genuinely belong to the accessibility category (they govern a11y-tree behavior), they simply have no *positive* SC.

---

## 4. Req 12.6 Zero-Validation Inventory (DD4)

Ran the corpus with the exact `:411–427` logic (non-inherited contracts; `validation` present and non-empty).

| Metric | Count |
|---|---|
| Non-inherited contracts with validation | 234 |
| Non-inherited contracts **without** validation | **0** |

**Result: the inventory is empty.** Every non-inherited contract carries validation criteria. Therefore:
- **Zero fixes prepared** (nothing to fix).
- **Zero Peter-escalations** under DD4 (no zero-validation candidate exists to escalate; DD4's "escalate-don't-self-exempt" discipline had no trigger).
- 4.3 may flip `:435` from `toBeGreaterThan(0)` to `withoutValidation === 0` **safely**, inherited-skip preserved. The assertion is green on the current corpus by inventory, not by weakening.

---

## 5. Prepared Fixes — consolidated apply-list for 4.3

All edits are single-line `wcag:` replacements under the named contract in `src/components/core/<Component>/contracts.yaml`. Apply on `task/125-B-u2` BEFORE arming the check.

| File | Line | From | To |
|---|---|---|---|
| `Badge-Count-Base/contracts.yaml` | 105 | `    wcag: null` | `    wcag: "N/A"  # legitimate-null: non-interactive negative guarantee, no positive WCAG SC (125-B 4.2)` |
| `Badge-Label-Base/contracts.yaml` | 80 | `    wcag: null` | `    wcag: "N/A"  # legitimate-null: non-interactive negative guarantee, no positive WCAG SC (125-B 4.2)` |
| `Nav-Header-App/contracts.yaml` | 15 | `    wcag: null` | `    wcag: "N/A"  # legitimate-null: renders-no-heading negative guarantee, no positive WCAG SC (125-B 4.2)` |
| `Nav-SegmentedChoice-Base/contracts.yaml` | 125 | `    wcag: null` | `    wcag: "1.3.1 Info and Relationships"` |
| `Progress-Indicator-Connector-Base/contracts.yaml` | 62 | `    wcag: null` | `    wcag: "1.1.1 Non-text Content"` |
| `Progress-Indicator-Label-Base/contracts.yaml` | 68 | `    wcag: null` | `    wcag: "1.1.1 Non-text Content"` |
| `Progress-Indicator-Node-Base/contracts.yaml` | 88 | `    wcag: null` | `    wcag: "1.1.1 Non-text Content"` |

> Line numbers verified 2026-07-14 on `task/125-B-u2`. 4.3 should confirm the `wcag: null` line under the named contract before replacing (a preceding edit in the same file could shift a line — the contract name + `wcag: null` is the stable anchor).

---

## 6. Floor Inputs for 4.3 (DD3) — supersedes DD3's recorded counts

DD3 sets an **aggregate floor PLUS per-literal presence** (each exact name ≥ 1). The floor inputs 4.3 must use:

| Input | Value | Note |
|---|---|---|
| Aggregate selection | **69** | total matcher selection on current corpus |
| `interaction_focusable` live | **7** | (DD3 recorded 11 — grep over-count) |
| `interaction_focus_ring` live | **10** | (DD3 recorded 11 — grep over-count) |
| `state_disabled` live | **1** | (DD3 recorded 21 — grep over-count; **see Peter escalation**) |
| `state_error` live | **4** | (DD3 recorded 4 — matches) |

**Why DD3's numbers differ:** DD3's 11/11/21/4 are `grep '^  <name>:'` counts that match the name wherever it appears at 2-space indent — including `excludes:` blocks. The armed check reads only `parsed.contracts`. Excluded entries are NOT live contracts. Corrected live counts (parsed): 7/10/1/4.

**Coupling note correction (for the register row):** DD3's coupling note names `state_error` (4 consumers) as the thin literal to watch. The **actual razor's edge is `state_disabled` = 1 live consumer**. The per-literal floor couples the suite's green to Button-CTA retaining its `state_disabled` contract. This is the DD3 backstop working as designed, but 4.3's register row should name the correct literal.

---

## 7. PETER ESCALATION — `state_disabled` per-literal floor vs. the no-disabled-states philosophy

> **Flagged prominently per DD4 discipline (escalate, do not self-resolve). This is a design tension, not a WCAG-null defect — Button-CTA's `state_disabled` HAS a valid ref (4.1.2), so it is not in the fix-list. It is escalated because it cannot be resolved inside 4.2/4.3's mechanical scope.**

**The finding:**
1. The normative matcher (C7 / Req 12.2 — **fixed; changing it re-opens the audit**) includes `state_disabled` in the exact-four that DD3 requires per-literal presence for (≥ 1 live match).
2. The corpus has **exactly one** live `state_disabled` contract: **Button-CTA**.
3. **Twenty** components carry an explicit `excludes: state_disabled` block whose recorded reason is a design philosophy: *"DesignerPunk does not support disabled states for usability and accessibility reasons. If an action is unavailable, the component should not be rendered."*

**The tension:** the per-literal floor on `state_disabled` couples the whole suite's green to a single contract that the system's own documented philosophy argues should not exist. If Button-CTA is ever brought into line with that philosophy (its `state_disabled` removed), the DD3 per-literal floor **reds the suite** — correct-by-design, but on a razor's edge DD3 did not name.

**Why it can't be resolved mechanically here:**
- Not a WCAG fix (Button-CTA's `state_disabled` has a ref).
- Cannot narrow the matcher out of `state_disabled` — the matcher is normative and fixed; changing it re-opens this audit (LINA tasks-R1).
- Whether Button-CTA *should* keep `state_disabled` at all is a component-design question broader than U2's check-arming.

**Owner read + options for Peter (I do not self-resolve):**
- **(a) Accept the razor's-edge floor, documented.** Keep `state_disabled` in the exact-four per-literal floor; record in the register row that green is coupled to Button-CTA's lone `state_disabled` contract, and that removing it is a conscious floor update in the same PR (per DD3's coupling discipline). Lightest; honest; leaves the philosophy tension unaddressed. **My lean.**
- **(b) Reconcile Button-CTA with the philosophy first** (separate component-design decision, likely its own spec/ballot), then revisit whether `state_disabled` belongs in the matcher's exact-four — which re-opens this audit by definition. Heavier; correct if the philosophy is meant to be absolute.
- **(c) Peter rules the matcher's exact-four is itself the question** — i.e., `state_disabled` shouldn't be a per-literal-floored literal given the philosophy. This is a matcher change → re-opens the audit; flagged only for completeness.

**Recommendation:** (a) for U2 — arm now with the razor's-edge documented in the register — and log the Button-CTA-`state_disabled`-vs-philosophy inconsistency as a separate component-design item for later (not U2). I flag (b)/(c) so the choice is conscious, not defaulted.

---

## 8. Verification provenance

- All counts produced by parsing `contracts.yaml` via `js-yaml` (the same parser the armed check uses), reading `parsed.contracts` / `parsed.excludes`, on `task/125-B-u2`, 2026-07-14.
- Matcher logic in the audit is character-identical to `wcag-required-matcher.ts`.
- Loader logic in the audit is character-identical to the armed check's `COMPONENTS` discovery (test `:64–73`).
- Line numbers in §5 verified against the working tree the same day.
