# Spec Feedback: Mechanical Enforcement Strategy

**Spec**: 125-mechanical-enforcement-strategy
**Created**: 2026-07-02

---

## Design Outline Feedback

### Context for Reviewers

This spec is a **STUB** capturing a 2026-07-02 working session (Peter + Claude) triggered by Polar's "Orbit" LLM-safe design system article. It records verified findings and proposes a phased scope. It has not been formalized. Before the first review round, note:

**Decisions already made (do not re-litigate):**
- Adopt a PR-gated workflow → design-outline.md § "4. Scope — phased" / § "8. Decisions on record" (Peter, 2026-07-02)
- This is a separate spec, not folded into 122 → design-outline.md § "6. Relationship to Spec 122" / § "8"
- The per-rule classification map is the spine → design-outline.md § "5. The spine"
- Stub now; extracting `.kiro/specs/` out of `.kiro` is a separate future concern → § "8"

**Scope boundaries:**
- Phase 3 (consumer-side reach) is **Spec 123 territory**, referenced not owned here → § "4" / § "6a"
- 125 does NOT re-decide token math or component architecture (Ada/Lina own content correctness); it decides *enforcement mechanism* only.
- The coupling to 122 is coordination on one artifact (the classification map), NOT a build dependency → § "6"

**Dependencies on prior artifacts:**
- Verified inventory rests on `.github/workflows/consumer-guard.yml`, `package.json` scripts, `tsconfig*.json`, and the Stemma test files → § "2"
- 122's §3a / §5(e) / §6 for the shared-artifact coupling

### Stakeholders (Spec-Feedback-Protocol § "Stakeholder Identification")

- **[@THURGOOD]** — proposed lead. CI/test-infrastructure standards, governance-tooling adoption, spec formalization, and the workflow migration's effect on the always-loaded Task-Completion-Protocol. Owns the classification-map methodology.
- **[@ADA]** — token-side enforcement: arming `build:validate`, the `no-hardcoded-color` lint, token-autonomy diff-gates.
- **[@LINA]** — Stemma enforcement: arming the contract/composition lane, warn→fail strictness on contract assertions, component code-style rules.
- **[@STACY]** — process/quality impact of the PR-flow migration; whether Phase 0 warrants full formalization vs. a right-sized increment.
- **Peter** — workflow-migration decision (made) and all warn→fail strictness calls.

*Consumers to keep informed:* whoever carries **122** (shared classification map) and **123** (Phase 3 hand-off).

---

## Requirements Feedback

### Context for Reviewers
- (Populated by the spec author before requesting review — spec is pre-requirements.)

---

## Design Feedback

### Context for Reviewers
- (Populated by the spec author before requesting review.)

---

## Tasks Feedback

### Context for Reviewers
- (Populated by the spec author before requesting review.)
