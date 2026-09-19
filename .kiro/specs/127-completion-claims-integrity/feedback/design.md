# Spec Feedback: 127 — Completion-Claims Integrity — Design

**Spec**: 127-completion-claims-integrity
**Artifact under review**: `design.md` (authored 2026-09-19)
**Created**: 2026-09-13
**Spec author**: Thurgood

---

## Context for Reviewers

**Phase gate discharged**: requirements accepted at PR #175 (2026-09-19). The decision surface is closed; **requirements decide WHAT, this document decides HOW, and this round reviews the HOW**: implementation accuracy, architectural soundness, and whether any design element gains or loses against a ruled requirement. Authority order on disagreement unchanged (requirements.md § Traceability).

**What is genuinely new in the design and therefore this round's real surface**: the module layout (C1–C5); DD1 (full-scan parity vs diff-scoped materiality); **DD2 (dates from artifacts — in-force date parsed from the ballot's RATIFIED line; authorship date from git first-commit)**; the output/emission contract (C5, DD3); the fixture pipeline solving the write-scope wall (C7, DD4); the worked example's maximal scope (DD5); the deferral-arrow tolerance (DD6); the however-titled fallback placement (DD7); 127's voluntary opt-in (DD8); the loud-failure catalog's exact strings; and the proposed three-unit merge shape with U2 as midpoint carrier.

**Named asks**:
- **Stacy (REQUIRED)**: verification-grade — does every design element trace to its requirement without gain/loss; DD1/DD2/DD3 against your CLOSEOUT/ARMING duties (the emission contract is your reading surface); C7 against the fixture obligation as countersigned (does spec-encoded-with-provenance satisfy "no fixtures, no arming" and your non-waivability bar); C9's pipeline + template against the lifecycle amendment.
- **Ada / Lina**: bound-party check of C1–C3's grammar against how you actually author (parent forms, criteria blocks, evidence kinds); DD6; the worked example's content (DD5) against your domains.
- **Leonardo**: C8.6 (the PHP Tier-2 text plan) and the worked example's decomposed-triple rendering against your R2 items.

**Stamp**: `[AGENT R1]` (rounds reset per artifact). Reviewers return text; Thurgood transcribes with stamps preserved.

---

## Design Feedback

*(Rounds below.)*
