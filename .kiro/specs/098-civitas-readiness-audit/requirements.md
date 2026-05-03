# Requirements Document: Civitas Readiness Audit

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Status**: Requirements Phase
**Dependencies**: None (consumes findings from specs 020, 032, 033, 036, 062 as inputs)

---

## Introduction

This spec audits the intelligence/governance layer of DesignerPunk — the steering documents, MCP servers, agent configurations, hooks, knowledge bases, and spec workflows that govern how the system operates. The audit produces findings and a readiness recommendation for a subsequent formalization spec that would name this layer "Civitas," potentially create a dedicated agent, and roll out terminology changes.

The audit is modeled on Spec 062 (Stemma Catalog Readiness Audit), which preceded the contract system formalization chain (062 → 063 → 078). The key lesson from that chain: audit first, formalize second, enforce third.

---

## Requirements

### Requirement 1: Prior Audit Findings Inventory

**User Story**: As the spec author, I want to consume relevant findings from prior governance audits, so that this audit builds on existing knowledge rather than re-deriving it.

#### Acceptance Criteria

1. The audit SHALL inventory relevant findings from specs 020 (Steering Documentation Refinement), 032 (Documentation Architecture Audit), 033 (Steering Documentation Enhancements), and 036 (Steering Documentation Audit).
2. The audit SHALL identify governance tooling built by prior specs, including `scripts/detect-stale-metadata.js` and any review process documentation.
3. The audit SHALL assess whether prior governance tooling is actively used or has drifted from current practice.
4. The audit SHALL NOT re-derive findings that prior audits already produced; it SHALL reference them and assess their current relevance.

---

### Requirement 2: Surface Area Inventory

**User Story**: As Peter, I want a complete categorized inventory of the intelligence layer, so that I can understand what Civitas would encompass before committing to formalization.

#### Acceptance Criteria

1. The audit SHALL produce an inventory of all artifacts constituting the intelligence layer, categorized by: steering documents, MCP servers, agent configurations, hook definitions, knowledge bases, spec infrastructure, and cross-cutting governance.
2. Each artifact SHALL be tagged along two axes: content domain (Rosetta, Stemma, Process, Integration) and infrastructure role (which MCP serves it, which process governs it, which agent maintains it).
3. The inventory SHALL identify steering documents by layer (0-3) and content domain.
4. The inventory SHALL document each MCP server's tool count and content scope.
5. The inventory SHALL note that token documentation represents ~23% of steering doc surface area and account for this weighting in analysis.
6. The inventory SHALL be delivered as `findings/surface-area-inventory.md`.

---

### Requirement 3: Terminology Audit

**User Story**: As Peter, I want to know how the intelligence layer is currently referenced across all documentation, so that the formalization spec can plan a terminology rollout with a known blast radius.

#### Acceptance Criteria

1. The audit SHALL scan all steering documents and agent prompt files for terms used to reference the intelligence layer (e.g., "steering docs," "intelligence layers," "governance infrastructure," "MCP system").
2. The audit SHALL assess consistency of terminology usage across documents.
3. The audit SHALL identify places where a collective noun ("Civitas") would reduce ambiguity and places where specific terms should remain specific.
4. The audit SHALL count "Rosetta + Stemma" paired references that would need updating to include Civitas.
5. The audit SHALL count "two-system" framing instances across steering docs and agent prompts.
6. The audit SHALL be delivered as `findings/terminology-audit.md`.

---

### Requirement 4: Staleness Assessment

**User Story**: As Peter, I want to know which steering documents are outdated and which are merely old but still accurate, so that the formalization spec can prioritize updates.

#### Acceptance Criteria

1. The audit SHALL run the existing `scripts/detect-stale-metadata.js` (from spec 020) as a baseline, using its 6-month warning and 12-month error thresholds.
2. IF the staleness detection script is not functional or not found, THEN the audit SHALL note this as a governance gap finding and perform manual metadata analysis.
3. The audit SHALL distinguish stale-and-inaccurate documents (domain changed since last review) from stale-but-stable documents (no domain changes since last review) by cross-referencing `Last Reviewed` dates against the spec log.
4. The audit SHALL identify documents with no `Last Reviewed` field.
5. The audit SHALL assess whether there is a correlation between staleness and content domain.
6. The audit SHALL assess whether the existing staleness detection script is actively used and when it was last run.
7. The audit SHALL be delivered as `findings/staleness-assessment.md`.

---

### Requirement 5: Governance Gap Analysis — Prior Tooling

**User Story**: As Peter, I want to know what governance tooling already exists and whether it's being used, so that the formalization spec doesn't rebuild what already exists.

#### Acceptance Criteria

1. The audit SHALL inventory governance tooling and processes built by specs 020, 032, 033, and 036.
2. For each piece of governance tooling, the audit SHALL assess: whether it still exists, whether it's actively used, and whether it's still relevant.
3. The audit SHALL distinguish "exists but not adopted" from "does not exist" in all gap findings.

---

### Requirement 6: Governance Gap Analysis — Enforcement Mechanisms

**User Story**: As Peter, I want to know which governance expectations have enforcement mechanisms and which don't, so that the formalization spec can address enforcement gaps proactively rather than discovering them post-formalization (as happened with spec 078).

#### Acceptance Criteria

1. The audit SHALL produce an enforcement mechanism inventory mapping governance expectations to their enforcement mechanisms (automated check, process check, or none).
2. For each enforcement mechanism, the audit SHALL document when it last fired and whether it is active or dormant.
3. The audit SHALL identify governance expectations with no enforcement mechanism at all.
4. The enforcement mechanism inventory SHALL be included in `findings/governance-gaps.md`.

---

### Requirement 7: Governance Gap Analysis — Cross-Reference Fragility

**User Story**: As Peter, I want to know the blast radius of a terminology change across steering documentation, so that the formalization spec can plan the rollout realistically.

#### Acceptance Criteria

1. The audit SHALL assess how many cross-references exist between steering documents.
2. The audit SHALL assess how cross-references are currently maintained (systematically or ad hoc).
3. The audit SHALL estimate the number of cross-reference updates required for a Civitas terminology rollout.
4. The audit SHALL assess whether current tooling (docs MCP `list_cross_references`) is sufficient to manage the rollout.
5. Cross-reference fragility findings SHALL be included in `findings/governance-gaps.md`.

---

### Requirement 8: Governance Gap Analysis — Process Gaps

**User Story**: As Peter, I want to know what governance processes are missing from the intelligence layer, so that the formalization spec can establish them.

#### Acceptance Criteria

1. The audit SHALL assess whether a defined lifecycle exists for steering documents (creation → review → update → deprecation).
2. The audit SHALL assess whether a process exists for MCP server health monitoring.
3. The audit SHALL assess whether a process exists for detecting when agent prompts drift from steering doc standards.
4. The audit SHALL assess whether a process exists for identifying when a new steering doc is needed.
5. The audit SHALL assess what happens when steering documents contradict each other.
6. Process gap findings SHALL be included in `findings/governance-gaps.md`.

---

### Requirement 9: Agent Ownership Analysis

**User Story**: As Peter, I want to understand the current distribution of governance responsibilities and see options for addressing the ownership gap, so that I can make an informed decision about whether to create a new agent.

#### Acceptance Criteria

1. The audit SHALL map current governance responsibilities to their owning agents, identifying responsibilities with no primary owner.
2. The audit SHALL evaluate two ownership models: (A) infrastructure steward (owns health, metadata, staleness; does NOT own content accuracy) and (B) documentation authority (owns content accuracy — assessed as problematic due to domain expertise duplication).
3. The audit SHALL produce a boundary conflict matrix mapping governance responsibilities to current owners and proposed Civitas owners, highlighting overlaps.
4. The audit SHALL evaluate three options with trade-offs: (A) new dedicated Civitas agent, (B) expand Thurgood's scope, (C) distributed ownership with explicit Agent Directory assignments.
5. The audit SHALL NOT recommend a specific option; it SHALL present options with trade-offs for Peter's decision.
6. The audit SHALL be delivered as `findings/agent-ownership-analysis.md`.

---

### Requirement 10: Readiness Recommendation

**User Story**: As Peter, I want a clear go/no-go recommendation for the Civitas formalization spec, so that I can decide whether to proceed, defer, or adjust scope.

#### Acceptance Criteria

1. The audit SHALL synthesize all findings into a readiness recommendation delivered as `findings/readiness-recommendation.md`.
2. The recommendation SHALL assess whether the surface area is well-enough understood to define Civitas boundaries.
3. The recommendation SHALL identify any blocking issues that need resolution before naming rollout.
4. The recommendation SHALL estimate the scope of the formalization spec, informed by the Stemma precedent (062 → 063 → 078).
5. The recommendation SHALL address whether Civitas has a unifying artifact format (like Rosetta's token definitions or Stemma's component schemas) or is a governance umbrella over heterogeneous artifacts, and whether the naming parallel still holds.
6. The recommendation SHALL address whether agent creation should be included in the formalization spec or deferred.
7. The recommendation SHALL present a go, no-go, or conditional-go verdict with specific conditions if conditional.

---

### Requirement 11: Audit Discipline

**User Story**: As Peter, I want the audit to stay within its scope and not drift into implementation work, so that findings remain objective and the formalization spec retains design authority.

#### Acceptance Criteria

1. The audit SHALL NOT rename any artifacts, update any steering documents, modify any agent prompts, or make any MCP server changes.
2. The audit SHALL NOT produce a recommended agent design; it SHALL produce options with trade-offs.
3. The audit SHALL use explicit "good enough" thresholds for each dimension to prevent scope creep into exhaustive analysis.
4. WHEN the audit discovers findings that require domain-specific clarification, THEN the audit SHALL query the relevant domain agent (Ada, Lina, or Stacy) rather than making assumptions.
