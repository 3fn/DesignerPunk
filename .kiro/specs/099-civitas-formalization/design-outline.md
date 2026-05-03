# Civitas Formalization

**Date**: 2026-05-03
**Purpose**: Name the intelligence layer "Civitas," expand Thurgood's scope to Civitas infrastructure steward, roll out terminology, and activate dormant governance tooling
**Organization**: spec-guide
**Scope**: 099-civitas-formalization
**Status**: Design outline — pending review

---

## Problem Statement

Spec 098 (Civitas Readiness Audit) produced a conditional go verdict for formalizing the intelligence layer as "Civitas." The audit found:

- **86 steering documents** with well-distributed content ownership but no infrastructure ownership
- **10 unowned governance responsibilities** (metadata enforcement, doc lifecycle, MCP monitoring, cross-reference maintenance, prompt currency, tooling adoption, "Shared" doc maintenance, documentation architecture, knowledge base currency, dormant tooling activation)
- **The dormancy pattern**: 13 governance scripts, a quarterly review process, and multiple audit tools exist but are dormant — built during specs and abandoned after completion
- **A manageable naming rollout**: ~50-60 text changes across 17-19 files, no cross-reference breakage
- **Civitas is a governance umbrella**, not a unified artifact system — architecturally different from Rosetta and Stemma, but coherent as the governance layer that binds them together

The two conditions from the readiness recommendation have been resolved:
1. **Agent model decided**: Option B — expand Thurgood to Civitas infrastructure steward (no new agent)
2. **Scope separation**: This spec separates naming rollout from governance activation as distinct task groups

---

## Objectives

1. **Define Civitas**: Create a definition document establishing what Civitas is, what it contains, what it doesn't, and how it relates to Rosetta and Stemma.

2. **Roll out terminology**: Update Rosetta+Stemma paired references, restructure the Systems Overview from two-system to three-system framing, update Agent Directory and agent prompts.

3. **Expand Thurgood's scope**: Update Thurgood's prompt, config, and Agent Directory entry to include Civitas infrastructure steward responsibilities. Define the three-layer boundary: domain agents own content correctness, Thurgood owns content consistency (cross-surface alignment) and infrastructure health (metadata, cross-references, MCP monitoring, tooling adoption).

4. **Activate governance tooling, establish triggers, and define governance processes**: Assess the highest-impact dormant scripts from spec 020 for relevance, update or replace as needed, and integrate into event-driven triggers. Build new tooling where gaps exist (affected-doc detection, metadata enforcement on creation). Establish governance processes for metadata enforcement, MCP health monitoring, agent prompt currency, and steering doc lifecycle. This is one work stream — dormant tooling assessment, trigger implementation, and process definition inform each other.

---

## Scope

### In Scope

- Civitas definition document (new steering doc)
- Terminology rollout across steering docs and agent prompts (~50-60 changes, 17-19 files)
- Rosetta-Stemma-Systems-Overview restructure (two-system → three-system)
- Agent Directory update (Thurgood's expanded role, Civitas description)
- Thurgood prompt update (`thurgood-prompt.md` — Civitas steward responsibilities, new domain boundaries, trigger mechanisms)
- Thurgood config update (`thurgood.json` — new steering doc references, skills, knowledge bases as needed)
- Dormant tooling assessment and activation (highest-impact scripts from spec 020)
- Governance process establishment (metadata enforcement, MCP monitoring, prompt currency)
- Trigger mechanism design and implementation (event-driven hooks, cadence-driven checklists, discovery patterns)
- "Shared" doc reassignment: assign 13 unowned docs to primary maintainers, update Agent Directory, update affected agent prompts (3-4 prompts), update agent JSON configs where `file://` references are needed (0-2 configs)

  **Preliminary assignment mapping** (proposed — to be confirmed during requirements):

  | Document | Layer | Proposed Owner | Rationale |
  |----------|-------|---------------|-----------|
  | DesignerPunk-Systems-Overview (renamed) | 1 | Thurgood | Civitas steward owns the architectural overview of all three systems |
  | platform-implementation-guidelines | 2 | Lina | Stemma-adjacent — governs how components are implemented per-platform (Lina claimed in R1) |
  | Cross-Platform vs Platform-Specific Decision Framework | 2 | Lina | Stemma-adjacent — component platform implementation decisions (Lina claimed in R1) |
  | MCP-Relationship-Model | 2 | Thurgood | Civitas infrastructure — defines MCP server boundaries |
  | MCP-Evolution-Roadmap | 2 | Thurgood | Civitas infrastructure — tracks MCP knowledge gaps |
  | Platform-Resource-Map | 2 | Thurgood | Civitas infrastructure — cross-platform file path reference |
  | Process-Integration-Methodology | 2 | Thurgood | Process doc — integration methodology |
  | BUILD-SYSTEM-SETUP | 3 | Thurgood | Civitas infrastructure — build system documentation |
  | Rosetta-Stemma-Systems-Overview (current, pre-rename) | 1 | Thurgood | Becomes DesignerPunk-Systems-Overview |

  **Note:** The surface area inventory listed 13 "Shared" docs. Some were classified as Shared due to cross-cutting content but have obvious domain homes. The remaining docs above (9 unique, accounting for the rename) default to Thurgood/Civitas steward for infrastructure docs and Lina for Stemma-adjacent docs. Ada's scope is unaffected — her docs were already correctly assigned.
- Start Up Tasks update: add cadence-driven governance health check trigger with self-updating date
- Portfolio site ecosystem diagram update guidance (not implementation — that's a separate concern)

### Out of Scope

- Creating a new agent (decided: Option B, expand Thurgood)
- Writing enforcement tests for the 20 missing governance expectations (domain agent work)
- Fixing stale-and-inaccurate docs (domain agent work triggered by Civitas flagging)
- CI/CD integration for audit scripts (follow-up spec if warranted)
- MCP server code changes
- Token or component work

---

## Design Decisions

### Decision 1: Civitas Definition Document Placement

**Options:**
1. Layer 1 (Foundation, always loaded) — parallels Rosetta-Stemma-Systems-Overview
2. Layer 2 (Frameworks, MCP-queryable) — reduces always-loaded token cost

**Recommendation:** Layer 1. Civitas is a foundational concept that all agents should understand. The document should be concise (~3,000-4,000 tokens) to minimize context cost. It defines what Civitas is — every agent needs this context to understand the three-system architecture.

### Decision 2: Rosetta-Stemma-Systems-Overview Approach

**Options:**
1. Rename to "Rosetta-Stemma-Civitas-Systems-Overview" and restructure
2. Rename to "DesignerPunk-Systems-Overview" (system-neutral name) and restructure
3. Keep current name, add Civitas section

**Recommendation:** Option 2. The current name implies only two systems. A system-neutral name accommodates the three-system architecture without needing another rename if a fourth layer emerges. The document becomes the canonical architectural overview of all DesignerPunk systems.

### Decision 3: Dormant Tooling and Trigger Integration

**Options:**
1. Assess all 13 scripts separately, then build new trigger tooling separately
2. Assess and build as one work stream — evaluate dormant scripts as potential trigger implementations

**Recommendation:** Option 2. The dormant scripts and the trigger mechanisms serve the same purpose: automated governance enforcement. Rather than assessing old tooling AND building new tooling as separate tasks:
- Assess the 3-4 highest-impact dormant scripts (`detect-stale-metadata.js`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `validate-cross-reference-format.sh`) for relevance against current infrastructure (86 docs, MCP tools available)
- Where viable, update and integrate into event-driven triggers
- Where stale or superseded by MCP tools, build replacements that incorporate new requirements (affected-doc detection, metadata enforcement on creation)
- Build new tooling for gaps not covered by any existing script (post-spec affected-doc detection via `git diff --name-only`)

**Selection criteria for "highest-impact":** Scripts addressing the 4 process gaps with zero automated enforcement identified in spec 098 (metadata on creation, staleness detection, cross-reference maintenance, doc lifecycle).

### Decision 4: Thurgood Boundary Definition

The expanded Thurgood prompt needs a clear three-layer boundary:

- **Content correctness** (domain agents own this): Is the technical content accurate? Ada owns whether the modular scale ratio is 1.125. Lina owns whether Component-Family-Button.md correctly describes the inheritance structure. Domain agents have the expertise to validate their content.

- **Content consistency** (Thurgood/Civitas steward owns this): Does content align across surfaces? When the same concept is described in multiple docs, are the descriptions consistent? Examples:
  - Does Token-Governance's description of semantic token usage align with Core Goals' description?
  - Does Agent Directory's description of an agent's scope match the agent's prompt?
  - After a cross-cutting spec (e.g., 080 mode architecture), have all affected docs been updated consistently?
  - Does the Token Selection Framework in Component-Development-Guide align with the Token Selection Matrix in Token-Governance?
  
  This doesn't require domain expertise to detect — it requires reading two docs and asking "are these saying the same thing?" That's an audit skill, not a domain skill. However, some apparent inconsistencies are intentional (different abstraction levels for different audiences). The content consistency layer *flags* potential inconsistencies; it does not resolve them unilaterally.

  **Resolution path for flagged inconsistencies:**
  
  - **Intra-domain** (two docs owned by the same agent disagree): Thurgood flags with both references → domain agent determines which is correct and updates. Thurgood does not resolve, even if the fix seems obvious.
  - **Cross-domain** (docs owned by different agents disagree): Thurgood flags → both domain agents review → they agree on resolution. If they disagree, Peter arbitrates.
  - **Unowned** (involves a "Shared" doc or doc with no clear domain owner): Thurgood flags and resolves if it's infrastructure-level. If it requires domain expertise, Thurgood flags → closest domain agent resolves.

  Without an explicit resolution path, flagged issues accumulate unresolved — the dormancy pattern wearing a different hat.

- **Infrastructure health** (Thurgood/Civitas steward owns this): Valid metadata, current cross-references, recent review dates, MCP health, prompt currency, governance tooling adoption. The operational maintenance layer.

This three-layer model replaces the binary content-vs-infrastructure split from the audit's Model A. The addition of content consistency as a Civitas responsibility closes the gap where cross-surface alignment was unowned.

### Decision 5: Trigger Mechanisms for Governance Maintenance

The dormancy pattern's root cause is twofold: "nobody's job" AND "nothing triggers the work." Expanding Thurgood's scope solves the first. Trigger mechanisms solve the second.

**Three trigger types:**

1. **Event-driven triggers** — Tied to actions that already happen in the workflow:
   - Post-spec-completion: automated detection of affected steering docs via `git diff --name-only <last-tag>..HEAD -- .kiro/steering/`, plus judgment-based assessment of docs that *should have been* modified but weren't (indirect staleness). Basic version (~30 min to build); enhanced version with domain-tag cross-reference (~2-4 hours).
   - Post-steering-doc-creation/modification: validate metadata completeness, cross-reference integrity, layer assignment. This is the most common governance event and where the audit found the biggest gap (12 docs created without `Last Reviewed`).
   - Post-agent-prompt-modification: verify prompt-to-steering-doc alignment and Agent Directory consistency. Scoped as *verification* of work just done, not discovery of unknown drift.
   - Implementation: shell scripts or Node.js tools integrated into the post-completion workflow, potentially as additions to `commit-task.sh` or as standalone scripts called from the post-completion checklist.

2. **Cadence-driven triggers** — Periodic checks on a defined schedule:
   - Monthly: run staleness detection, check MCP health, scan for cross-reference breakage
   - Per-spec: verify content consistency across docs affected by the spec's domain
   - Implementation: Add to **all agents'** Start Up Tasks (not just Thurgood's): `IF it's been >30 days since last governance health check [DATE], THEN flag for Thurgood. IF Thurgood completes health check, update date.` This ensures the trigger fires regardless of which agent Peter is working with — a 6-week Ada/Lina sprint won't silently lapse the health check.

3. **Discovery triggers** — Governance issues surfaced during normal work:
   - During spec formalization: notice steering doc contradictions → flag
   - During feedback rounds: agent references outdated guidance → flag
   - During audits: find dormant tooling → assess and activate or deprecate
   - Implementation: codified as explicit responsibility in Thurgood's prompt. These happen naturally if the steward is actively involved in spec work.

**Recommendation:** Event-driven triggers are the most reliable (tied to existing actions) and should be implemented as tooling. Cadence-driven triggers are a backstop implemented via Start Up Tasks across all agents. Discovery triggers are codified in the prompt as an ongoing responsibility.

---

## Risks and Counter-Arguments

### Risk: Scope creep into governance activation

**Concern:** The governance activation work (dormant tooling, process establishment) is less bounded than the naming rollout. It could expand as we discover more dormant tooling or more processes that need establishing.

**Mitigation:** Scope separation. The naming rollout tasks are completable independently. Governance activation is timeboxed to the highest-impact items (staleness detection, metadata enforcement, MCP monitoring). Remaining items become follow-up work.

### Risk: Thurgood scope overload

**Concern:** Adding 10 responsibilities to an already-loaded agent.

**Counter:** The audit assessed this as ~10-15% workload increase during normal operations. The responsibilities are periodic monitoring, not daily active work. Context load increase is ~2,000-4,000 tokens (7-13%). If overload becomes apparent during execution, we can reassess.

### Risk: Terminology rollout introduces inconsistencies

**Concern:** Updating ~50-60 text references across 17-19 files risks introducing new inconsistencies if not done systematically.

**Mitigation:** Use grep-based verification before and after changes. Run cross-reference validation. The terminology audit (spec 098) provides the exact list of files and match counts to work from.

---

## Known Gaps (Not In Scope, Documented for Follow-Up)

- **Application MCP access gap for Ada**: Ada cannot query token tools on the Application MCP (`search_tokens`, `get_token_details`, etc.) despite owning Rosetta content. Thurgood can monitor MCP health but can't verify token content accuracy, and Ada can't either. This is a one-line JSON config fix that should be addressed independently of this spec.

- **Ada review checkpoint for Systems Overview restructure**: When the DesignerPunk-Systems-Overview Rosetta section is drafted during the terminology rollout, Ada should review it for content correctness. This is a task-level detail to include during tasks.md creation.

- **Trigger mechanism effectiveness measurement**: No mechanism exists to determine whether the triggers established by this spec actually prevent the dormancy pattern. A follow-up audit (6-12 months post-formalization) should assess whether governance tooling remained active.

---

## Relationship to Spec 098

This spec directly consumes the findings from Spec 098 (Civitas Readiness Audit):

| Spec 098 Finding | How This Spec Uses It |
|-------------------|----------------------|
| Surface area inventory | Civitas definition doc references the inventory |
| Terminology audit (blast radius) | Terminology rollout task uses exact file/match lists |
| Staleness assessment | Governance activation prioritizes metadata enforcement |
| Governance gaps (dormancy pattern) | Governance activation addresses root cause |
| Agent ownership analysis (Option B) | Thurgood prompt expansion |
| Readiness recommendation (conditional go) | Both conditions resolved; this spec proceeds |
