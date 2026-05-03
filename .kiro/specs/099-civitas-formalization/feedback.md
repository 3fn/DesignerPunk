# Spec Feedback: Civitas Formalization

**Spec**: 099-civitas-formalization
**Created**: 2026-05-03

---

## Design Outline Feedback

### Context for Reviewers
- Agent model decided: Option B (expand Thurgood), not Option A (new agent) → design-outline.md § "Problem Statement"
- Scope separated into naming rollout (bounded) and governance activation (timeboxed) → design-outline.md § "Scope"
- Civitas is a governance umbrella, not a unified artifact system → spec 098 findings/readiness-recommendation.md § "The Schema-Equivalent Question"
- Thurgood boundary: three-layer model — content correctness (domain agents), content consistency (Thurgood/Civitas), infrastructure health (Thurgood/Civitas) → design-outline.md § "Decision 4"
- Dormant tooling approach: highest-impact scripts only, not all 13 → design-outline.md § "Decision 3"

---

## Requirements Feedback

### Context for Reviewers
- [To be populated before requirements review]

---

## Design Feedback

### Context for Reviewers
- [To be populated before design review]

---

## Tasks Feedback

### Context for Reviewers
- [To be populated before tasks review]

#### [ADA R1]
**Task 2.2 — Ada review checkpoint: Rosetta section of DesignerPunk-Systems-Overview.md**

**[ADA ✓]** — Rosetta content approved. No content correctness issues.

- Rosetta token pipeline diagram (Definition → Validation → Registry → Generation → Platform output) is accurate → DesignerPunk-Systems-Overview.md § "Rosetta System: Token Pipeline and Layers"
- Three-layer token hierarchy (Primitive → Semantic → Component) is correct → DesignerPunk-Systems-Overview.md § "Rosetta System: Token Pipeline and Layers"
- High-level diagram preserves Rosetta internal structure and `R_CompTok --> Stemma` connection; Civitas additions are purely additive → DesignerPunk-Systems-Overview.md § "High-Level: DesignerPunk Three-System Architecture"
- Integration and Combined Overview diagrams: Rosetta content unchanged, Civitas governance overlay is additive → DesignerPunk-Systems-Overview.md § "Integration: Tokens → Components → Platforms"
- Related Documentation: Rosetta links preserved and correct → DesignerPunk-Systems-Overview.md § "Related Documentation"

**Non-blocking observation:** The pipeline diagram omits Stage 4 (Mode Resolution, Spec 080) — the two-level light/dark resolver between Registry and Generation. This is a pre-existing simplification carried over from the original document, not a regression. Acceptable for a high-level visual overview. If this document is revised for accuracy beyond the Civitas restructure, the pipeline should show the six-stage flow: Definition → Validation → Registry → Mode Resolution → Generation → Platform Output.

**Verdict:** Approved to proceed to Task 2.3 (terminology rollout).

#### [LINA R1]
**Task 3.3 — Lina metadata confirmation: platform-implementation-guidelines.md and Cross-Platform vs Platform-Specific Decision Framework.md**

**[LINA ✓]** — Metadata confirmed accurate for both docs. Two staleness findings.

**Metadata validation:**
- `platform-implementation-guidelines.md`: MCP validation passes, zero issues. All required fields present. Date/Last Reviewed: 2026-01-02, Layer 2, `inclusion: manual`. Front-matter description accurate.
- `Cross-Platform vs Platform-Specific Decision Framework.md`: MCP validation passes, zero issues. All required fields present. Date/Last Reviewed: 2025-12-19, Layer 2, `inclusion: manual`. Front-matter description accurate. All cross-references valid (Component-Development-Guide.md, Token-Resolution-Patterns.md, true-native-architecture-concepts.md all exist at referenced paths).

**Finding 1 — Contract location reference outdated** (moderate, log for future spec)
`platform-implementation-guidelines.md` line 31 says contracts are "defined in the component schema." Line 809 links to Component-Schema-Format.md as "Schema structure for contracts." Since Spec 063, contracts live in per-component `contracts.yaml` files, not in schema YAML. The doc never mentions `contracts.yaml`. The guidance itself is correct ("honor all behavioral contracts") but the location reference is wrong — an agent following this doc to find contracts would look in schema YAML and not find them. Recommend logging for a future targeted update spec.

**Finding 2 — Android token access pattern outdated** (moderate, resolve immediately)
`Cross-Platform vs Platform-Specific Decision Framework.md` lines 188 and 226 show Android token usage as `spaceInsetNormal.dp`. Both the naming convention (`spaceInsetNormal` camelCase) and the `.dp` suffix contradict the current pattern in `platform-implementation-guidelines.md`, which uses `DesignTokens.space_200` (object access, snake_case, no `.dp`). The platform-implementation-guidelines has a dedicated "Android Token Usage: The `.dp` Pattern" section explicitly calling `.dp` an anti-pattern. The Cross-Platform doc predates this guidance (Dec 2025 vs Jan 2026). This finding should be resolved in the Task 3 commit to prevent agents from learning the wrong Android token pattern.

**Verdict:** Metadata confirmed. Finding 1 logged for future spec. Finding 2 to be resolved in Task 3 commit.
