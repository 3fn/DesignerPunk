# Task 1 Completion: Author the `certainty-calibration` register row

**Date**: 2026-08-02
**Task**: 1 — Author the `certainty-calibration` register row
**Type**: Documentation · **Validation**: Tier 1
**Unit**: U1 — window-free paper decisions (`task/119-B-u1-paper-decisions`)
**Status**: Complete on branch — row drafted and staged; **pending Peter's ratification** (see § Ratification below)

---

## What was done

Added the `certainty-calibration` entry to `governance/classification-map.md` § Entries, per design § Component 4a. Field-by-field conformance to the 4a sketch:

| 4a sketch element | Landed as |
|---|---|
| Rule (strong/partial/none; search before guessing; surface when unsure; go/no-go on partial/none) | `rule:` one-liner, preserving the agent-side contract phrasing (propose best-fit + confidence + rationale → go/no-go on partial; empty-contract handling on none) |
| Boundary call — education-owned; "CI validates function, never ideology"; no mechanical predicate for "calibrated well" | `boundary_call.class: ideological` with that rationale verbatim-in-substance |
| Verification `none`, no CI hook; narrow future hook noted as possible, not adopted | `verification.disposition: none`, `check_state: none`, `checks: []`, plus a rationale line recording the possible prompt-lint hook and why it is NOT adopted (verifies delivery, not compliance) |
| Education `KEEP` — durable, specific-but-stable by churn-rate test; canonical prose in AICP; delivery surfaces Kiro always-load + CLAUDE.md `@`-import + 4c cue | `education.disposition` carries all three delivery surfaces and the churn-rate-test justification |
| Trigger scope (R8 AC5) recorded in-row | `trigger_scope:` field — discovery-time uncertainty about where guidance lives, NOT a general epistemic protocol |
| Signal scope (R8 AC3) recorded in-row | `signal_scope:` field — signal emission is the operative test; signal-less surfaces out of scope; `search_tokens` gap routed to Ada's issue file |
| Canonical enumeration home designation + update-trigger note (Ada dR1 fork guard) | `enumeration_home.canonical` (THIS field is the single canonical home; current emitters: `find_docs`, keyworded `find_components`) + `enumeration_home.update_trigger` (new emitter updates THIS field; citing surfaces inherit hedged or are touched in the same edit) |
| Attribution (R1 AC3, steward-writes-register) | `attribution.drafted_by: thurgood`, `landed_by: thurgood`, `second_eye:` Peter's ratification |
| Entry-id grammar citation form (R1 AC4) | Recorded in the history line: cite as `governance/classification-map.md § "certainty-calibration"`, never entry count or position |

**Template conformance**: templated on the `record-first-ratification` entry (multi-surface, education-heavy). NO parallel structure created outside the register (R1 AC2) — the row lives in the existing Entries section of the existing register; the in-row fields beyond the base schema (`trigger_scope`, `signal_scope`, `enumeration_home`, `attribution`) are the fields design § 4a names as row content ("recorded in-row", "THIS field"), landed as named YAML keys inside the entry's single fenced block rather than as any structure outside it. Note: `record-first-ratification` is the *structural template* (education-heavy, multi-surface reasoning); this row is scalar (`verification.disposition: none`), not scoped — its boundary is not surface-dependent, so `scope[]` would be wrong per the lens-not-columns guard.

**Entry-id constraints verified** (Addressing and Citation rules): `certainty-calibration` is unique among the 11 entry-ids and satisfies the non-substring rule in both directions against all ten pre-existing ids.

## Verification (Tier 1)

- **Docs index rebuilt in-task** (R11 AC5): `rebuild_index` → healthy, 83 documents, 2,806 sections, 0 errors/warnings (2026-08-02).
- **Citation-grammar resolution verified**: `get_section({ path: "classification-map", heading: "certainty-calibration" })` resolves (sectionId `s15`, parent "Entries") — the `path § "heading"` grammar sweep-1 checks mechanically will resolve this heading.
- **Window discipline**: window-free per R1 AC1 — `governance/classification-map.md` is not a 125-B trigger surface (scope pass § 7.1); no canonical agent source touched, no regen, no regen-log line. The row lands pre-measurement under the ratified R11 AC2 exception; the keyword-shadowing check is scheduled in U2's case-study findings (tasks.md Task 3 acceptance line).

## Ratification (R1 AC3 — do not land unratified)

Per the task's gate: the row is **presented to Peter for ratification with the U1 PR**. The branch commit is staging, not landing — the row reaches `main` only through Peter's ratifying merge of the U1 PR, which is the recorded second eye (scope-pass A3-as-ratified). The PR body reproduces the presentation; the entry's own `history` line records the pending-ratification state (precedent: the `npm-test-before-complete` entry's awaiting-ratification history line). A light Ada/Lina consumer review may be added at Peter's option (R1 AC3).

## Requirements traceability

- **R1 AC1** — early, window-free task in U1: this task, first in execution order. ✓
- **R1 AC2** — settled methodology (boundary → verification → education), templated on `record-first-ratification`, no parallel structure. ✓ (table above)
- **R1 AC3** — drafted-by/landed-by attribution carried in-row; Peter's ratification as second eye: presented via the U1 PR. ✓ (pending his merge)
- **R1 AC4** — entry-id grammar citation form recorded in the row's history line. ✓
- **R11 AC5** — index rebuilt in-task. ✓

## Delegated-tier note (TCP exception-based capture)

Planned stamp: Thurgood (Sonnet). Actual: executed directly in the main-loop session (Fable 5) under Peter's explicit U1 execution grant, not delegated. Reason: the full 4a design context was already loaded in-session; delegation would have added a verify-round-trip for a single-file settled-sketch edit. Agent-evolution signal: none (routing correct — steward work). Model-evolution signal: over-tier for an implement-class task; cost accepted for context continuity.
