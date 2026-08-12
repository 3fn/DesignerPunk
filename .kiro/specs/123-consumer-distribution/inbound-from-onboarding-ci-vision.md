# Inbound from the Onboarding + Product-CI-Integration Vision — for Spec 123

**Date**: 2026-08-12
**Source**: Peter's product-vision sessions of 2026-08-02 and 2026-08-11/12 (in-session dialogue with Thurgood; assessments recorded here with his direction)
**Status**: VISION INPUT at design-outline grain — NOT a settled outline. The 123 kickoff folds this with the directory's other inbounds and the 119-B inbound (`.kiro/specs/119-B-capability-routing-measurement/inbound-to-123-from-119-B.md`) through the full formalization pipeline (Q5: no compressed forms).

---

## 1. The vision, and how it evolved (provenance preserved)

1. **Origin (2026-08-02)**: Peter's initial framing — the Agent Experience Architecture *in its entirety* ships in the package, so installers of DesignerPunk inherit it. Assessment recorded in-session: the vision is differentiating ("install the design system and the experts come with it"), but "in its entirety" conflates the **consumption experience** (shippable) with the **stewardship system** (repo-bound — Civitas law, spec workflow, this studio's merge authority), and shipping the latter would instruct consumer agents to obey governance that doesn't exist in their repos — the imposter problem, exported.
2. **Refinement (2026-08-11, after deliberate reflection)**: Peter's own two-part correction — (a) the package risks providing too much by *assuming alignment with the user's environment*; (b) scope can likely be *reduced*, not grown.
3. **The landing shape (this inbound's subject)**: expand the **onboarding CLI**. In the onboarding flow, a **(potentially optional) step creates a SPEC in the consumer's repo that configures DesignerPunk's CI needs to that user's environment** — and if they have no CI at all, the spec can establish it. An **install doc**, shipped in the package and read by the consumer's agent during onboarding, provides the context of those CI needs so the agent can sort out the technical integration with whatever environment it finds.

**The inversion that makes this work**: the package stops shipping environment *assumptions* and ships declared *needs* — "DesignerPunk's guarantees depend on these verifications existing" — and the consumer's own agent maps needs onto their CI reality (GitHub Actions, GitLab, Jenkins, none). Mechanism/policy split: we own the needs; they own the fulfillment. A quiet product bonus: the consumer's first DesignerPunk experience is *running a spec with their agent* — they inherit the method by doing it once.

## 2. Design principles settled in the dialogue (carry into formalization)

- **P1 — Needs-declaration over environment-assumption.** The install doc declares verification NEEDS with their *why*; it never assumes a CI vendor, workflow syntax, or repo topology.
- **P2 — Every need ships with its arming proof.** Each CI need comes with a **gate-bite recipe**: introduce this deliberate failure → your check must go red → revert. This exports 125-A's hardest-won lesson and closes the worst failure mode (a mis-wired check that runs green while verifying nothing — the register's DORMANT state, at consumer scale, in repos we never see). Treat as non-negotiable in the design.
- **P3 — Tiered needs.** A MINIMAL core (what DesignerPunk's guarantees actually require of a consumer repo — plausibly small: token-output drift, suite-runs-at-merge, perhaps a contract check) vs optional hardening. The internal 18-check set is mostly stewardship and does NOT ship as needs. Writing the install doc forces the valuable question: what do consumers actually need?
- **P4 — Priced optionality.** The CI step may be optional, but skipping it carries a NAMED degradation statement ("without X, token drift reaches your users undetected") — never fine print, never pretended harmless.
- **P5 — Harness-agnostic CLI.** The CLI scaffolds files (install doc, spec template); ANY agent (Claude Code, Kiro, Cursor, other) picks them up. The moment the CLI assumes a harness, the environment-alignment problem re-enters through the side door. (Composes with the existing 123 stub scope: `init --target` already targets multiple tools.)
- **P6 — Consumer agent profile is a SEPARATE, LATER question.** Which agents (if any) ship to consumers, and a consumer generation profile for the 122 generator, is deliberately NOT resolved by this inbound — the CLI/CI shape stands on its own and does not depend on it.

## 3. Recorded counter-arguments (AICP — carry them, don't erase them)

- **Spec quality in unknown harnesses**: our specs are good because of the pipeline around them; a consumer's agent of unknown quality produces a spec of unknown quality. Mitigations: P2's bite proofs (the spec isn't done until each need PROVES armed) + verification recipes in the install doc. Residual risk stands and is accepted knowingly.
- **Support surface**: shipping onboarding flows means owning their failure modes in environments we don't control (version skew, deleted docs, exotic CI). Price consciously at formalization; at solo scale this bounds how much the install doc promises.
- **Scope-creep risk**: the CLI must stay a scaffolder. If onboarding trends toward standing per-vendor CI integrations maintained by us, that is the escalate-don't-build smell at product scale.

## 4. Interactions the kickoff must check (cross-spec)

- **125-B U1b — the audience ruling (needed before waves 2–3)**: the imposter test scores prose against *our* armed gates; consumer repos have none of them. Once the education layer is explicitly consumer-serving, prunability becomes **audience-relative** (a clause redundant here can be load-bearing there). The register's per-surface `scope[]` qualifier exists for exactly this. A recorded Peter ruling on "who is the education layer for" should precede waves that prune consumer-served (`governance/`) docs. Wave 1 is unaffected (internal workflow law; verified during its classification).
- **Q6 (release manager keep/kill/evolve — parked, now with exhibit A)**: the v14.0.0 release (2026-08-12) proved the release tool blind to issue-driven work (recommended patch/"no consumer-facing changes" against a breaking component wave; recorded in `docs/releases/release-14.0.0.md` + the release PR #114). The install doc + spec template become *versioned release artifacts*, which raises Q6's stakes: release tooling must see and ship them correctly.
- **Existing 123 stub scope** (`design-outline.md`, lifted from 121): `init --target`, dual path-context, `files[]` wiring, `sync` repair. This vision **extends** `init` with the CI-integration step — scope-fit, not scope-replacement. The stub's formalization gate (Spec 118's direction decision) has been OPEN since 118 completed; a dated gate-status note rides this inbound's PR.
- **119-B inbound coordination**: consumer delivery constraints already recorded there (section-less route form, calibration-cue scoping, identity-doc links broken-by-construction on the MCP surface) all bind the install doc's authoring.

## 5. What this inbound is NOT

Not a settled outline; not a requirements draft; not a commitment to ship consumer agents (P6). It is the durable capture of Peter's vision and the dialogue's settled principles so the 123 kickoff starts from the record instead of a memory.
