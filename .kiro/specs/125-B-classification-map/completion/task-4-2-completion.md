# Task 4.2 Completion — Stemma Pre-Arm Audits (WCAG + Validation-Criteria)

**Spec**: 125-B-classification-map
**Task**: 4.2 — Stemma pre-arm audits (WCAG + validation-criteria): adjudication + fix preparation
**Type**: Architecture · **Validation**: Tier 2 - Standard
**Agent**: Lina (Opus)
**Date**: 2026-07-14
**Branch**: `task/125-B-u2`
**Requirements**: 12.1–12.3, 12.6 · **Design**: C7, DD3, DD4

## Tier divergence (recorded per task text)

Planned agent/tier held: **Lina (Opus)**, as authored in tasks.md. The upward divergence from implementation-adjacent work is deliberate and pre-recorded in the task: legitimate-null-vs-defect AND fix-vs-escalate adjudication is domain-owner judgment, not mechanical application. No agent-evolution or model-evolution delta to report — the plan matched execution.

## What this task produced (preparation only — no contracts/test edits)

1. **Normative matcher** — `completion/u2/wcag-required-matcher.ts`. Exact four (`interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`) + `accessibility_*` (prefix) + `content_*_label` (prefix AND suffix). Placed in the u2 folder (not `src/__tests__/`, outside 4.2's write scope) as the **verbatim-copy source** for 4.3. Any matcher change re-opens the audit (LINA tasks-R1).
2. **WCAG audit through the matcher + the armed check's own `COMPONENTS` loader** — 69 contracts selected across 34 components; audit-clean ⇒ arm-green by construction.
3. **Null adjudication** — 7 nulls: 4 genuine-defects (fix prepared), 3 legitimate-nulls (exempt via `wcag: "N/A"`, owner authority per Req 12.3).
4. **Req 12.6 zero-validation inventory** — 0 zero-validation contracts (234 non-inherited, all carry validation). No fixes, no DD4 escalations.
5. **Adjudication table** — `completion/u2/stemma-pre-arm-adjudication.md` (surfaces in the U2 PR body). Contains the matcher, the full selection enumeration, per-null adjudication with prepared fixes, the 12.6 inventory, floor inputs for 4.3, and the Peter-escalation.

## Key findings

- **DD3 count correction (feeds 4.3's floor):** DD3's recorded per-literal counts (11/11/21/4) are grep-counts conflating live `contracts:` with `excludes:` entries. The armed check reads only `parsed.contracts` → **true live counts 7/10/1/4**. 4.3's per-literal floor must use these.
- **PETER-ESCALATION (1):** the normative exact-four includes `state_disabled`, but only **1** live `state_disabled` contract exists (Button-CTA) against a documented no-disabled-states philosophy (20 `excludes:` blocks). DD3's per-literal floor couples the suite's green to that lone contract. Not a WCAG defect (it has a 4.1.2 ref); cannot be resolved by narrowing the fixed matcher. Owner lean: accept the razor's-edge floor for U2 with the register row corrected to name `state_disabled` (not `state_error`) as the thin literal; log Button-CTA-vs-philosophy as a separate later component-design item. Options (a)/(b)/(c) laid out in the table § 7.

## Handoff to 4.3 (same branch, same PR)

- Copy `wcag-required-matcher.ts` VERBATIM into the test file, replacing the `:325–350` legacy array.
- Apply the 7 prepared `wcag:` edits (table § 5) to `contracts.yaml` files BEFORE arming.
- Set the DD3 floor from the corrected live counts (table § 6): aggregate 69; per-literal 7/10/1/4.
- Flip `:435` to `withoutValidation === 0` (inventory empty; inherited-skip preserved).
- Register row: correct the coupling note to name `state_disabled` (1 live) as the razor's-edge literal.

## Validation

Tier 2 - Standard. This subtask writes no source/test code — outputs are the matcher module + adjudication artifacts. All counts produced by parsing `contracts.yaml` with `js-yaml` (the armed check's parser), reading `parsed.contracts`/`parsed.excludes`, on `task/125-B-u2`. Matcher and loader logic in the audit are character-identical to the shipped matcher module and the armed check's `:64–73` loader respectively. No test suite run applies (no runnable change landed in this subtask; the arm + its bite fixtures are 4.3's).

## Scope discipline

Did NOT edit any `contracts.yaml`, the test file, or `tasks.md` beyond marking 4.2's own checkbox. Fix APPLICATION is 4.3's. 4.1 runs in parallel in the same u2 folder (its `exp3-detect.sh` untouched).
