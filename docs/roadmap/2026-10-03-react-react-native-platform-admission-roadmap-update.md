# Roadmap Update: Platform Admission, React and React Native (Spec 128) — Direction and Gates

**Date**: 2026-10-03
**Status**: **Next arc, gated.** Does NOT supersede the 2026-09-20 consumer-distribution view; the 123 arc remains the current strategic view until its release is published. This note records the arc that follows it.

> **THE ADOPTION DIRECTION (Peter, 2026-10-02):** "So much of the industry is on the React + React Native train, and that's something I just have to accept if I'm interested in people adopting this thing … An adopter should be able to create and leverage tokens and components of their own shape." Composes with the Model B identity ruling (2026-09-26): DesignerPunk births and runs the consumer's OWN design system — now on the platforms consumers actually use.

**Source**: the 2026-10-02 sitting (Peter + orchestrator + seven seats, two consult rounds and two cross-reads). Canonical record: `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md`.
**Rule**: strategy altitude, pointer-heavy. Detail and every position live in the inbound; this doc is never the only home of a decision. Open forks are **noted, not resolved** (§ 4).

---

## 1. What was decided, and what was not

- **Decided (Peter)**: adoption is the goal; React and React Native are in scope as platforms; adopter-authored tokens and components are the product shape.
- **Recommended by all four owning seats (Ada, Lina, Thurgood, Leonardo) and captured for formalization**: do not split the project; split the front door and later the packaging (one core, platform packages, declared tiers); admit platforms by rule through a registry; React web is a binding, React Native is two emissions behind one target.
- **Declined by the seats**: a project split into DesignerPunk Native and DesignerPunk React (doubles the gate, loses ballots' home, forks tokens and contracts); React-primary inversion of Spec 070 ("reference" is a museum without the native harness).
- **Not decided**: the identity forks in § 4. They are Peter's.

## 2. Where this sits in the spine

`125-A → 122 → 123 (current, release 15.0.0 merged, tag pending) → 128`. The gate is the **v15.0.0 tag plus the parity required-flip**; from then on 128's parents run under the 127 convention and the armed parity check from day one. Theme emission (094 issue) and the native build-verification harness (2026-09-17 charter) are absorbed as a step and a prerequisite respectively, not run in parallel.

## 3. The sequence (seat-estimated; detail in inbound § 5)

identity ballot → emit-time platform values + registry (three existing platforms as first tenants) → theme emission → adopter contract conformance + provenance indexing → React Native token emitter + typed React export → React web wrappers + element API cleanup (16.0.0) → React Native reference set by contract-category coverage → physical package split only when a second package is ready.

Two findings set this order: the registry goes **before** React Native (or the new keys are added to ~17 hard-coded lists and migrated twice — Ada, Thurgood), and adopter conformance goes **before** the reference set (adopter components need something to validate against first — Leonardo).

## 4. Open forks (Peter's; noted, not resolved)

| # | Fork | Raised by |
|---|---|---|
| 1 | Uniform governance vs tier-scoped gates (lighter criteria for experimental/community) | Thurgood |
| 2 | Adopter tokens: enforce Rosetta mathematics or structure only | Ada, Thurgood |
| 3 | Lead with copy-and-own reference components or with contracts | Leonardo |
| 4 | Is the split about code or identity | Lina |
| 5 | Does Working Class remain the True Native proof case (070) | Kenya, Lina |
| 6 | React web: generated binding everywhere, or hand-written vertical | Sparky |

## 5. Surviving counter-arguments (kept, not erased)

Six readiness columns behind one contract core make every contract change a six-way re-verification, and that lands on velocity. Deferring React Native keeps DesignerPunk a proof its likely adopters cannot use — which is why it is sequenced, not deferred indefinitely. Native-first architects will read the experimental tier as a retreat.

## 6. The record

| Input | Home |
|---|---|
| Sitting record, verified facts, positions, sequence, forks, questions, consult ledger | `.kiro/specs/128-react-react-native-platform-admission/inbound-from-react-rn-sitting-2026-10-02.md` |
| STUB outline (gate, scope, inputs) | `.kiro/specs/128-react-react-native-platform-admission/design-outline.md` |
| Charter: owner + trigger | `.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` |
| Prerequisites | `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`; `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` |
| What this changes if ratified | Core Goals (Layer 1), Spec 070 alignment record, Spec 034 outline, technology-stack, platform-implementation-guidelines, decision framework, System Overviews, Agent-Directory, Integration Guide — inbound § 7 |
