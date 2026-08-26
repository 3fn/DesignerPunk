# Contract-Education Content Debt — Lina's Batch (from the Wave-2 Repair's Deliberately-Left Items)

**Date**: 2026-08-25
**Discovered By**: Lina (contract-name education-drift repair, PR #132 — her "deliberately left" list, steward-verified) + steward spot-checks
**Spec**: None — issue-driven batch (the designs are either already ratified, already patterned, or bounded content edits; no spec formalization warranted)
**Status**: OPEN — batch authorized by Peter 2026-08-25 ("batch the rest for Lina"); CDS:322 split out and fixed same day (this file's carrying PR)
**Owner**: Lina (all items; Peter decision points marked)
**Priority order**: as listed (Peter-set sequencing rationale in each item)

---

## Context

PR #132 repaired contract-NAME drift on teaching surfaces (141 occurrences, 9 of 13 family docs). It deliberately left everything that was a CONTENT change rather than a name repair. Peter ruled 2026-08-25: fix the law-contradiction item immediately (done — the PR carrying this file), batch the rest here for Lina. Full context: `.kiro/specs/125-B-classification-map/completion/u1b/wave-2-consult-lina.md` (her U1/U3/R2 findings and the "deliberately left" report in PR #132's body).

## Items

### 1. ~~CDS:322 `disabled` prop in the Input-Text-Base example~~ — DONE (this PR)
The development standards' worked example taught a `disabled: boolean` prop contradicting the ratified 2026-07-15 no-disabled-states adjudication (zero exceptions). Fixed: prop removed with an in-place comment citing the adjudication and the `excludes: state_disabled` convention; the :116 planning-checklist "shared visual states" line now says loading instead of disabled.

### 2. `excludes:` blind spot in the catalog validator — mechanical gap, U2 pre-arm pattern
`contract-catalog-name-validation.test.ts` scans `contracts:` names but never `excludes:` names. Live instance: `interaction_segment_disabled` (Nav-SegmentedChoice-Base/contracts.yaml:432) is not a Concept Catalog concept. Exclusion names are load-bearing (the disabled-state adjudication is cited BY its exclusion name), so they should be catalog-governed.
**Shape (the U2 wcag re-arm pattern — audit BEFORE arming):** (a) sweep ALL `excludes:` blocks corpus-wide; (b) adjudicate findings — rename non-catalog names or ballot them into the catalog (`interaction_segment_disabled`: rename vs ballot is Lina's proposal, **Peter ratifies**); (c) THEN extend the validator to scan `excludes:`.
**Campaign bookkeeping note:** this tightens an existing test inside `lane-functional-root` — NOT a required-check-set change, so no window boundary event; the pre-arm-audit discipline applies anyway. Log the arming on a register history line (which row: `contract-platforms-specified`'s sibling question — likely a new row or a scope note on the catalog-validation territory; steward consult at landing).

### 3. Schema-embed staleness — three Component-Templates schema templates + CDS example
CT:~122/~277/~430 and CDS's `#### Behavioral Contracts` example (~:272) still embed `contracts:` inside schema.yaml — the pre-Spec-063 shape. An author following them ships no `contracts.yaml`; `contract-existence-validation` reds the lane (the gate contains it) but the failure arrives pointing at a file the template never mentioned — gate-as-teacher. Fix: restructure the templates/examples to the two-file shape (schema = structure, contracts.yaml = behavior). Genuine content change; Lina drafts, normal review.

### 4. `custom_validation` — no Concept Catalog concept (CT:996 + selection table :1089)
A template teaching an uncatalogued concept. **Peter decision point: ballot `validation_custom` into the catalog, or delete the template.** Steward lean (recorded at the 2026-08-25 discussion, counter-argument acknowledged): DELETE — a custom-validation catch-all invites the uncatalogued sprawl the catalog exists to prevent; Lina argues her own position when she takes the item.

### 5. Eight phantom rows — documented contracts with no live counterpart
Avatar `error_handling` + `wrapper_delegation`; Container(CIS) `responsive_layout`; Icon(CIS) `accessible_label` + `decorative_mode`; Button(CIS) `icon_support` + `reduced_motion_support`; Form-Inputs `required_indicator`. Need owner re-derivation against each component's contracts.yaml (some may be planned, some ghosts) — delete or re-derive per row, recorded. No gate consumes these; low urgency, Lina's pace.

## Explicitly NOT in this batch (assessed 2026-08-25, leave-as-is)

- CIS's self-disclaimed planned sections and the four placeholder family docs (Divider/Loading/Modal/Data-Display) — aspirational, self-disclaiming, MCP named authoritative; editing them would launder them into looking settled.
- Concept Catalog bare names in Contract-System-Reference and historical-record uses (register history, adjudication prose) — correct by design.

## Done criteria

Each item lands via its own PR (or small coherent groups), normal review; item 2's validator extension proves its bite (mutation red/green) before the sweep is called closed; docs-MCP reindex after any served-surface change. This issue closes when items 2–5 are each resolved-or-explicitly-parked with a dated note here.
