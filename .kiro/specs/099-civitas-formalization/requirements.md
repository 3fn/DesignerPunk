# Requirements Document: Civitas Formalization

**Date**: 2026-05-03
**Spec**: 099 - Civitas Formalization
**Status**: Requirements Phase
**Dependencies**: Spec 098 (Civitas Readiness Audit) — all findings consumed as inputs

---

## Introduction

This spec formalizes the intelligence/governance layer as "Civitas," expands Thurgood's scope to Civitas infrastructure steward, rolls out terminology across steering docs and agent configurations, and activates dormant governance tooling with trigger mechanisms to prevent the dormancy pattern from recurring.

The spec is structured as two separable work streams: naming rollout (bounded, ~50-60 changes) and governance activation (tooling, triggers, processes). The naming rollout is completable independently.

---

## Requirements

**Work Stream A — Naming Rollout** (bounded, completable independently): Reqs 1, 2, 3, 4, 5
**Work Stream B — Governance Activation** (tooling, triggers, processes): Reqs 6, 7, 8, 9

### Requirement 1: Civitas Definition Document

**User Story**: As any DesignerPunk agent, I want a concise definition of what Civitas is, so that I understand the three-system architecture (Rosetta, Stemma, Civitas) and my relationship to the governance layer.

#### Acceptance Criteria

1. A new steering document SHALL be created defining Civitas as the governance layer of DesignerPunk.
2. The document SHALL be placed at Layer 1 (Foundation, always loaded) with `inclusion: always`.
3. The document SHALL define what Civitas contains (steering docs, MCP servers, agent configurations, hooks, knowledge bases, spec workflows, governance processes).
4. The document SHALL define what Civitas does NOT contain (token definitions, component implementations, product screens).
5. The document SHALL describe how Civitas relates to Rosetta (token content served by Civitas infrastructure) and Stemma (component content served by Civitas infrastructure).
6. The document SHALL acknowledge that Civitas is a governance umbrella over heterogeneous artifacts, architecturally different from Rosetta and Stemma but coherent as the governance layer.
7. The document SHALL be concise (~3,000-4,000 tokens) to minimize always-loaded context cost. WHEN the draft exceeds 4,000 tokens, THEN it SHALL be revised to reduce token count before merging.
8. The document SHALL include a section describing how Civitas should be represented in external-facing materials (e.g., portfolio site ecosystem diagram), positioning it as the governance layer that binds Rosetta and Stemma together.

---

### Requirement 2: Systems Overview Restructure

**User Story**: As any DesignerPunk agent, I want the architectural overview to reflect the three-system architecture, so that I understand how Rosetta, Stemma, and Civitas relate to each other.

#### Acceptance Criteria

1. The document `Rosetta-Stemma-Systems-Overview.md` SHALL be renamed to `DesignerPunk-Systems-Overview.md`.
2. The document SHALL be restructured from two-system to three-system framing, adding a Civitas section alongside Rosetta and Stemma.
3. The Civitas section SHALL describe the governance layer's purpose, components, and relationship to the other two systems.
4. The Rosetta and Stemma sections SHALL be reviewed for accuracy during restructuring. WHEN the Rosetta section is drafted, THEN Ada SHALL review it for content correctness.
5. All cross-references to the old filename SHALL be updated across active steering docs and agent configurations. Spec artifacts (`.kiro/specs/`) SHALL NOT be updated — they are historical records.
6. WHEN Ada flags content correctness issues in the Rosetta section, THEN those issues SHALL be resolved before the Systems Overview restructure is considered complete.
7. The document SHALL remain at Layer 1 with `inclusion: always`.

---

### Requirement 3: Terminology Rollout

**User Story**: As Peter, I want all steering docs and agent configurations to use consistent terminology that acknowledges Civitas as the third named system, so that the documentation reflects the actual architecture.

#### Acceptance Criteria

1. All Rosetta+Stemma paired references (~30 instances in 6 steering docs) SHALL be updated to acknowledge Civitas as a third system.
2. Agent prompts (8 files) SHALL be updated to include Civitas as a named system alongside Rosetta and Stemma.
3. Agent JSON configs SHALL NOT require terminology changes (they use file paths, not system names).
4. Specific terms ("steering doc," "MCP server," "hook," "knowledge base") SHALL remain as specific artifact types within Civitas — they are NOT replaced by "Civitas."
5. Civitas SHALL be used as an umbrella term for the governance layer, not as a replacement for any existing specific term.
6. Grep-based verification SHALL be run before and after the rollout to confirm all targeted references were updated and no new inconsistencies were introduced.
7. Agent prompt terminology updates SHALL add Civitas awareness without diluting domain-specific Rosetta or Stemma references. Domain agents' prompts reference their own system extensively — these are domain-specific references, not paired references requiring Civitas addition.

---

### Requirement 4: Thurgood Scope Expansion

**User Story**: As Peter, I want Thurgood's role formally expanded to include Civitas infrastructure stewardship, so that the 10 unowned governance responsibilities have a primary owner.

#### Acceptance Criteria

1. Thurgood's prompt (`thurgood-prompt.md`) SHALL be updated to include Civitas infrastructure steward responsibilities.
2. Thurgood's config (`thurgood.json`) SHALL be updated with new steering doc references, skills, and knowledge bases as needed for the expanded role.
3. The Agent Directory SHALL be updated to reflect Thurgood's expanded role, including the Civitas steward description.
4. The prompt SHALL define the three-layer boundary:
   - Content correctness: domain agents own this
   - Content consistency: Thurgood owns this (cross-surface alignment detection)
   - Infrastructure health: Thurgood owns this (metadata, cross-references, MCP health, tooling adoption)
5. The prompt SHALL define the resolution path for flagged inconsistencies:
   - Intra-domain: Thurgood flags → domain agent resolves
   - Cross-domain: Thurgood flags → both domain agents review → Peter arbitrates if they disagree
   - Unowned: Thurgood resolves infrastructure-level issues; routes domain-expertise issues to closest domain agent
6. The prompt SHALL include discovery triggers as an explicit responsibility (flag contradictions during spec formalization, outdated guidance during feedback rounds, dormant tooling during audits).

---

### Requirement 5: "Shared" Doc Reassignment

**User Story**: As Peter, I want the 13 unowned steering docs assigned to primary maintainers, so that every doc has clear accountability for content correctness and infrastructure health.

#### Acceptance Criteria

1. Of the 13 docs identified as "Shared" in spec 098, 4 were already correctly assigned to domain agents during the surface area inventory (ambiguous classifications with clear primary domains). The remaining 9 SHALL be reassigned:
   - Thurgood: DesignerPunk-Systems-Overview (renamed), MCP-Relationship-Model, MCP-Evolution-Roadmap, Platform-Resource-Map, Process-Integration-Methodology, BUILD-SYSTEM-SETUP (7 docs)
   - Lina: platform-implementation-guidelines, Cross-Platform vs Platform-Specific Decision Framework (2 docs)
2. The Agent Directory SHALL be updated to reflect all reassignments.
3. Affected agent prompts (Thurgood, Lina) SHALL be updated to include the new docs in their domain boundary descriptions.
4. Agent JSON configs SHALL be updated with `file://` references only where the doc needs to be available at session start. Existing `skill://` references in other agents' configs SHALL NOT be removed — ownership reassignment establishes maintenance accountability, not access restriction.
5. WHEN a doc is reassigned, THEN the receiving agent SHALL confirm the doc's metadata is accurate and flag any obviously stale content for follow-up. A full content accuracy audit is out of scope for this spec.

---

### Requirement 6: Dormant Tooling Assessment and Activation

**User Story**: As Peter, I want the highest-impact dormant governance scripts assessed for relevance and either activated or replaced, so that governance enforcement is automated rather than manual.

#### Acceptance Criteria

1. The following scripts SHALL be assessed for relevance against current infrastructure (86 docs, MCP tools available): `detect-stale-metadata.js`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `validate-cross-reference-format.sh`.
2. For each script, the assessment SHALL determine: still relevant and functional | needs updating | superseded by MCP tools | should be deprecated.
3. Scripts assessed as relevant SHALL be updated if needed and integrated into event-driven triggers or the post-completion workflow.
4. Scripts assessed as superseded SHALL be documented as deprecated with a reference to the MCP equivalent.
5. The assessment SHALL be scoped to governance infrastructure scripts only — NOT domain validation scripts (token math validators, component contract validators).
6. WHEN a gap exists that no dormant script covers (e.g., post-spec affected-doc detection), THEN new tooling SHALL be built. The post-spec affected-doc detection script SHALL use `git diff --name-only` to identify modified steering docs.
7. New governance tooling SHALL produce clear, parseable output identifying specific files and issues. New tooling SHALL handle edge cases (no changes detected, no tags exist) gracefully with informative messages.

---

### Requirement 7: Event-Driven Trigger Implementation

**User Story**: As Thurgood/Civitas steward, I want event-driven triggers that automatically prompt governance checks when relevant actions occur, so that governance maintenance is tied to the workflow rather than dependent on human memory.

#### Acceptance Criteria

1. A post-spec-completion trigger SHALL be implemented that detects which steering docs were modified during the spec (via `git diff --name-only <last-tag>..HEAD -- .kiro/steering/`). IF no git tags exist, THEN the trigger SHALL fall back to comparing against the previous commit or produce an informative message.
2. A post-steering-doc-creation/modification trigger SHALL be implemented that validates metadata completeness (`Last Reviewed`, required fields), cross-reference integrity, and layer assignment.
3. A post-agent-prompt-modification trigger SHALL be implemented that verifies prompt-to-steering-doc alignment and Agent Directory consistency. This trigger is scoped as verification of work just done, not discovery of unknown drift.
4. Triggers SHALL be implemented as shell scripts or Node.js tools integrated into the post-completion workflow.
5. WHEN a trigger detects an issue, THEN it SHALL produce a clear, actionable message identifying the specific doc, the specific issue, and the recommended action.
6. Triggers SHALL be advisory (produce warnings) rather than blocking (halt the workflow). WHEN a trigger script encounters an error (missing git tags, file access failure), THEN it SHALL exit with a non-zero status and a descriptive error message.

---

### Requirement 8: Cadence-Driven Trigger Implementation

**User Story**: As Peter, I want a monthly governance health check that fires regardless of which agent I'm working with, so that governance monitoring can't silently lapse during extended work with non-Thurgood agents.

#### Acceptance Criteria

1. A governance health check date SHALL be added to Start Up Tasks with the format: `IF it's been >30 days since last governance health check [DATE], THEN flag for Thurgood.`
2. The governance health check date SHALL be added to ALL agents' Start Up Tasks, not just Thurgood's.
3. WHEN any agent detects the health check is overdue, THEN it SHALL flag the need for a Thurgood governance health check before proceeding with task work.
4. WHEN Thurgood completes a governance health check, THEN the date in Start Up Tasks SHALL be updated.
5. The monthly governance health check SHALL include: staleness detection, MCP health verification, cross-reference scan, and a summary of any flagged issues.

---

### Requirement 9: Governance Process Documentation

**User Story**: As Thurgood/Civitas steward, I want governance processes documented in my prompt and relevant steering docs, so that the processes are discoverable and actionable.

#### Acceptance Criteria

1. The steering doc lifecycle process SHALL be documented: creation (metadata requirements, MCP registration) → review (cadence-driven health check) → update (event-driven triggers) → deprecation (ballot measure with rationale).
2. The MCP health monitoring process SHALL be documented: what to check (index health, drift detection, tool availability), when to check (monthly cadence + post-spec event), how to remediate (rebuild index, flag content drift to domain agent).
3. The agent prompt currency process SHALL be documented: what to check (prompt-to-steering alignment, Agent Directory consistency), when to check (post-prompt-modification event), how to remediate (flag to Peter for prompt update).
4. All governance processes SHALL be documented in Thurgood's prompt as operational responsibilities, not in a separate steering doc. The prompt is the authoritative source for Thurgood's operational behavior.
5. WHEN governance processes affect other agents' workflows (e.g., metadata requirements on doc creation), THEN the relevant process summary SHALL be cross-referenced in the appropriate shared steering doc (e.g., Process-File-Organization) with a pointer to Thurgood's prompt as the authoritative source.


