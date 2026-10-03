# Design Outline: 128 — Platform Admission, React and React Native (STUB)

**Date**: 2026-10-03
**Spec**: 128 — Platform Admission, React and React Native
**Author**: Thurgood (to formalize); this STUB opened by the orchestrator at Peter's direction, 2026-10-03
**Status**: **STUB — do not formalize until the v15.0.0 tag is cut AND the completion-criteria-parity required-flip has merged** (ballot 70f8fe54). Per Process-Spec-Planning § "Phase 0" a STUB captures scope, dependencies, and cross-references only; architecture decisions live in the inbound as *recorded positions*, not rulings.

---

## Scope (as directed, not yet settled)

- A **platform admission rule** with declared support tiers and a **platform registry** replacing the hard-coded three-platform lists (the class-level option).
- **React web** as a framework binding over the existing web platform; **React Native** as a registered target (two emissions, rn-ios and rn-android, one entry).
- **Adopter-authored tokens and components of their own shape**: contract-conformance declaration, adopter-root indexing with provenance, conformance-based assembly validation.
- Theme emission completed on the existing platforms as a prerequisite inside the same arc.

## Out of scope until Peter rules otherwise

- Any inversion of Spec 070's True Native commitment (P4) and any project split (P5). See the inbound § 4 and § 8.

## Inputs (read first, in this order)

1. `inbound-from-react-rn-sitting-2026-10-02.md` — the sitting record: direction, verified facts, converged classification, proposals and dispositions, recommended sequence, component expression, records that change, **open forks (§ 8)**, questions (§ 10), consult ledger.
2. `docs/roadmap/2026-10-03-react-react-native-platform-admission-roadmap-update.md` — strategy altitude, where this arc sits relative to Spec 123.
3. `.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` — owner and named trigger.

## Dependencies

- v15.0.0 tag; parity required-flip (gate).
- `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md` (Ada) — absorbed as a step.
- `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` (Kenya/Data) — prerequisite before any platform is called "reference".
- Specs 118, 123, 125 one-package assumptions; Spec 123 Model B ruling (2026-09-26); Spec 070 Working Class commitment.

## Formalization pre-steps

- Peter's rulings on the inbound's § 8 forks, or an explicit decision to carry them into the outline round as open items.
- The identity ballot (Core Goals platform list, admission rule, tiers) precedes the outline settle — a Layer 1 change is a ballot, not an outline decision.
- Stakeholders for R1: Ada, Lina, Thurgood, Leonardo (owning seats); Sparky, Kenya, Data (platform seats); Stacy (claims-pass verifiability LENS at the tasks round).
