# Implementation Plan: Civitas Formalization

**Date**: 2026-05-03
**Spec**: 099 - Civitas Formalization
**Status**: Implementation Planning
**Dependencies**: Spec 098 (Civitas Readiness Audit) — all findings consumed as inputs

---

## Implementation Plan

Two work streams executed sequentially. Work Stream A (naming rollout) is bounded and completable independently. Work Stream B (governance activation) depends on Thurgood's expanded prompt from Work Stream A. An explicit gate between work streams ensures all naming work is settled before governance activation begins.

All steering doc changes require Peter's approval via ballot measure model. Ada reviews the Systems Overview Rosetta section. Lina confirms metadata for reassigned docs.

---

## Task List

### Work Stream A — Naming Rollout

- [x] 1. Civitas Definition Document

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Civitas definition document exists at Layer 1 with `inclusion: always`
  - Document defines what Civitas contains, what it doesn't, and how it relates to Rosetta and Stemma
  - Document is ≤4,000 tokens
  - Peter has approved via ballot measure

  **Primary Artifacts:**
  - `.kiro/steering/Civitas-System-Overview.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/099-civitas-formalization/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/099-civitas-formalization/task-1-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Civitas Definition Document"`

  - [x] 1.1 Draft Civitas definition document
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Create `.kiro/steering/Civitas-System-Overview.md` with 7 sections per design Decision 1
    - Include: Overview, What Civitas Contains, What Civitas Does Not Contain, Relationship to Rosetta and Stemma, Three-Layer Boundary, Governance Processes (summary), External Representation
    - Rosetta relationship section: explicitly distinguish token documentation *infrastructure* (Civitas serves via MCP, metadata, cross-references) from token documentation *content correctness* (Ada/Rosetta owns) and token *pipeline* (Rosetta owns)
    - Target ≤4,000 tokens. IF draft exceeds budget, revise before presenting for ballot measure.
    - Present to Peter for ballot measure approval
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

---

- [x] 2. Systems Overview Restructure and Terminology Rollout

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Systems Overview renamed and restructured with three-system framing
  - Ada has reviewed and approved the Rosetta section
  - All ~30 Rosetta+Stemma paired references updated across 6 steering docs
  - All 8 agent prompts updated with Civitas awareness
  - All cross-references to old filename updated (steering docs + agent configs only)
  - Grep verification confirms zero remaining untreated paired references
  - Peter has approved all changes via ballot measure

  **Primary Artifacts:**
  - `.kiro/steering/DesignerPunk-Systems-Overview.md` (renamed + restructured)
  - 6 steering docs with terminology updates
  - 8 agent prompts with Civitas additions

  **Completion Documentation:**
  - Detailed: `.kiro/specs/099-civitas-formalization/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/099-civitas-formalization/task-2-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Systems Overview Restructure and Terminology Rollout"`

  - [x] 2.1 Draft Systems Overview restructure
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Rename `Rosetta-Stemma-Systems-Overview.md` to `DesignerPunk-Systems-Overview.md`
    - Restructure from two-system to three-system framing, adding Civitas section
    - Preserve existing Rosetta and Stemma content; review for accuracy
    - Maintain Layer 1 with `inclusion: always`
    - **Do NOT proceed to terminology rollout until Ada review (2.2) is complete**
    - _Requirements: 2.1, 2.2, 2.3, 2.7_

  - [x] 2.2 Ada review checkpoint
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood + Ada
    - Peter switches to Ada (`ctrl+shift+a`) to review the Rosetta section of the drafted `DesignerPunk-Systems-Overview.md`
    - Ada provides stamp [ADA ✓] or flags issues in conversation
    - Peter returns to Thurgood to resolve any findings before proceeding to 2.3
    - This subtask gates the terminology rollout (2.3)
    - _Requirements: 2.4, 2.6_

  - [x] 2.3 Terminology rollout
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Run pre-rollout grep to confirm baseline match counts from spec 098 terminology audit
    - **Steering docs (paired reference expansion):** Update ~30 Rosetta+Stemma paired references in 6 steering docs to acknowledge Civitas
    - **Agent prompts (new Civitas additions):** Add Civitas awareness to 8 agent prompts. These have zero paired references — additions are new Civitas context (e.g., in Identity or architectural overview sections), not paired-reference expansions.
    - **Key principle:** Civitas is additive. Domain-specific references are NOT updated — only paired architectural references change.
    - Example: UPDATE "Rosetta (tokens) and Stemma (components)" → "Rosetta (tokens), Stemma (components), and Civitas (governance)". DO NOT UPDATE "the Stemma component system" in Lina's domain boundary section. DO NOT UPDATE "Ada — Rosetta token specialist" in agent boundary response examples — references to other agents' domains are domain-specific, not paired.
    - Run post-rollout grep to verify all targets updated, no new inconsistencies
    - All terminology changes land in a single commit to avoid partial rollout states
    - Present to Peter for ballot measure approval
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 2.4 Cross-reference updates
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Update all cross-references to old filename (`Rosetta-Stemma-Systems-Overview.md`) in active steering docs and agent configs
    - Check `leonardo.json` skill:// reference (line 40) and Directional Priorities wiki-link
    - Spec artifacts (`.kiro/specs/`) SHALL NOT be updated — historical records
    - Verify via grep that zero references to old filename remain in active docs
    - _Requirements: 2.5_

---

- [x] 3. Thurgood Scope Expansion and Shared Doc Reassignment

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Thurgood's prompt includes Civitas steward responsibilities with three-layer boundary and resolution path
  - Thurgood's config updated with new references as needed
  - Agent Directory reflects expanded role and all Shared doc reassignments
  - Lina's prompt updated with 2 maintained docs
  - Lina has confirmed metadata accuracy for reassigned docs
  - All 13 formerly "Shared" docs have a primary maintainer

  **Primary Artifacts:**
  - `.kiro/agents/thurgood-prompt.md` (expanded)
  - `.kiro/agents/thurgood.json` (updated)
  - `.kiro/agents/lina-prompt.md` (updated)
  - `.kiro/steering/Agent-Directory.md` (updated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/099-civitas-formalization/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/099-civitas-formalization/task-3-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Thurgood Scope Expansion and Shared Doc Reassignment"`

  - [x] 3.1 Update Thurgood prompt, config, and Agent Directory
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Add "Operational Mode: Civitas Steward" section to `thurgood-prompt.md`
    - Define three-layer boundary (content correctness → content consistency → infrastructure health)
    - Define resolution path (intra-domain, cross-domain, unowned)
    - Add discovery triggers as explicit responsibility
    - Add governance processes (metadata enforcement, MCP monitoring, prompt currency, doc lifecycle — full lifecycle: creation → review → update → deprecation)
    - Update Identity section to include Civitas steward role
    - Update Domain Boundaries In Scope to include Civitas infrastructure
    - Update `thurgood.json` with new steering doc references and skills as needed
    - Update Agent Directory: Thurgood's expanded description, Civitas steward role
    - Present to Peter for ballot measure approval
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 9.1, 9.2, 9.3, 9.4_

  - [x] 3.2 Reassign Shared docs and update Lina
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Update Agent Directory with all 9 Shared doc reassignments (7 Thurgood, 2 Lina)
    - Update `lina-prompt.md`: add platform-implementation-guidelines and Cross-Platform Decision Framework to In Scope as maintained docs. "Maintained" means: Lina owns content correctness and updates these docs when component architecture or platform implementation patterns change. Thurgood monitors their infrastructure health (metadata, cross-references, staleness).
    - Existing `skill://` references in other agents' configs are NOT removed — ownership is maintenance accountability, not access restriction
    - Present to Peter for ballot measure approval
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 3.3 Lina metadata confirmation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood + Lina
    - Handoff to Lina: Peter switches to Lina (`ctrl+shift+l`) to confirm metadata accuracy for platform-implementation-guidelines and Cross-Platform Decision Framework
    - Lina confirms metadata is accurate and flags any obviously stale content
    - This is a quick validation, not a thorough content audit
    - IF stale content is minor (outdated example, missing new component), Lina fixes in the same commit. IF substantial (architectural drift), logged as finding in task-3 completion doc for a future spec.
    - _Requirements: 5.5_

---

### Gate: Work Stream A Complete

**Criteria:** All ballot measures approved. Ada review of Rosetta section resolved (Task 2.2). Lina metadata confirmation complete (Task 3.3). All naming rollout changes committed.

**Proceed to Work Stream B only after this gate is satisfied.**

---

### Work Stream B — Governance Activation

- [x] 4. Dormant Tooling Assessment and Trigger Implementation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - 4 highest-impact dormant scripts assessed (relevant/needs updating/superseded/deprecated)
  - Viable scripts updated and integrated into governance-check.sh
  - Post-spec affected-doc detection script built and functional
  - governance-check.sh wrapper operational with fast no-op path
  - All trigger scripts produce structured output and handle edge cases

  **Primary Artifacts:**
  - `scripts/governance-check.sh` (new wrapper)
  - `scripts/detect-affected-steering-docs.sh` (new)
  - `scripts/validate-steering-metadata.js` (updated or replaced)
  - `scripts/detect-stale-metadata.js` (updated or replaced)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/099-civitas-formalization/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/099-civitas-formalization/task-4-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Dormant Tooling Assessment and Trigger Implementation"`

  - [x] 4.1 Assess dormant governance scripts
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Assess 4 scripts for relevance: `detect-stale-metadata.js`, `validate-steering-metadata.js`, `scan-cross-references.sh`, `validate-cross-reference-format.sh`
    - Assessment is limited to these 4 named scripts. Do not assess, modify, or make recommendations about any other scripts in `scripts/`.
    - For each: determine still relevant | needs updating | superseded by MCP tools | should be deprecated
    - Scoped to governance infrastructure scripts ONLY — NOT domain validation scripts
    - Document assessment with rationale for each script
    - **Human checkpoint:** Present assessment to Peter for review before proceeding to 4.2. Assessment findings determine 4.2's implementation path.
    - _Requirements: 6.1, 6.2, 6.4, 6.5_

  - [x] 4.2 Update/build trigger scripts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **Update `detect-stale-metadata.js`**: Separate "missing metadata" from "genuinely stale" in output categories. Add structured JSON output option alongside human-readable. Update exit codes to 0/1/2 convention.
    - **Update `validate-steering-metadata.js`**: Update hardcoded task vocabulary to match current expanded set. Update valid organization values (add `architecture-overview`, `spec-guide`, `spec-summary`, `spec-completion`). Update valid inclusion values (add `manual`). Add structured JSON output option. Update exit codes to 0/1/2 convention.
    - **Update `validate-cross-reference-format.sh`**: Fix hardcoded output path (currently writes to spec-020 directory). Add structured output. Update exit codes.
    - **Deprecate `scan-cross-references.sh`**: Add deprecation header noting MCP `list_cross_references()` as replacement. Do not delete — preserve as historical artifact.
    - **Build `scripts/detect-affected-steering-docs.sh`**: New script using `git diff --name-only <last-tag>..HEAD -- .kiro/steering/`. Tag fallback: if no tags, compare against previous commit or produce informative message. Structured markdown output.
    - **Build post-prompt-modification verification script**: New script that checks prompt-to-steering-doc alignment and Agent Directory consistency for modified prompt files.
    - All scripts: structured markdown output, exit codes 0/1/2, edge case handling (no tags, no changes, file access errors)
    - Test each script: normal case, no-changes case, error case
    - _Requirements: 6.3, 6.4, 6.6, 6.7, 7.1, 7.2, 7.3, 7.5, 7.6 (7.5/7.6 shared with 4.3 — apply to both individual scripts and wrapper)_

  - [x] 4.3 Build governance-check.sh wrapper
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Create `scripts/governance-check.sh` that orchestrates trigger scripts
    - Check for `.kiro/steering/` changes via `git diff --name-only` — fast no-op if none
    - Call trigger scripts by explicit enumeration (not glob)
    - Present aggregated output
    - Integrate into post-completion workflow (callable from `commit-task.sh` or standalone)
    - Test end-to-end: commit with steering doc changes, commit without
    - _Requirements: 7.4, 7.5, 7.6_

---

- [ ] 5. Cadence Trigger and Process Documentation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Governance health check date added to Start Up Tasks
  - All agents' sessions can detect overdue health check
  - Monthly health check procedure documented in Thurgood's prompt
  - Governance process cross-references added to Process-File-Organization
  - All governance processes documented and discoverable

  **Primary Artifacts:**
  - `.kiro/steering/Start Up Tasks.md` (updated)
  - `.kiro/steering/Process-File-Organization.md` (cross-reference added)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/099-civitas-formalization/completion/task-5-parent-completion.md`
  - Summary: `docs/specs/099-civitas-formalization/task-5-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Cadence Trigger and Process Documentation"`

  - [ ] 5.1 Add cadence trigger to Start Up Tasks
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add governance health check conditional to Start Up Tasks: `IF it's been >30 days since last governance health check [YYYY-MM-DD], THEN flag for Thurgood`
    - Single file (`.kiro/steering/Start Up Tasks.md`), loaded by all agents
    - Set initial date to today's date
    - Present to Peter for ballot measure approval
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ] 5.2 Document monthly health check procedure
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add monthly health check procedure to Thurgood's prompt (Civitas Steward section)
    - Include: run staleness detection, check MCP health (`get_index_health`, `get_component_health`), scan cross-references, produce summary of findings
    - Specify: after completion, update the date in Start Up Tasks
    - _Requirements: 8.5, 9.1, 9.2, 9.3, 9.4_

  - [ ] 5.3 Add governance process cross-references
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Add cross-reference to Process-File-Organization pointing to Thurgood's prompt for governance processes (metadata requirements on doc creation, doc lifecycle)
    - Ensure other agents can discover governance requirements without reading Thurgood's prompt
    - Present to Peter for ballot measure approval
    - _Requirements: 9.5_
