# Design Document: Civitas Formalization

**Date**: 2026-05-03
**Spec**: 099 - Civitas Formalization
**Status**: Design Phase
**Dependencies**: Spec 098 (Civitas Readiness Audit) — all findings consumed as inputs

---

## Overview

This spec has two work streams executed sequentially:

**Work Stream A (Naming Rollout):** Create the Civitas definition document, restructure the Systems Overview, roll out terminology across steering docs and agent configs, expand Thurgood's scope, and reassign "Shared" docs. This is bounded work with a known blast radius (~50-60 text changes across 17-19 files).

**Work Stream B (Governance Activation):** Assess and activate dormant governance tooling, implement event-driven and cadence-driven triggers, and document governance processes. This is less bounded but timeboxed to the highest-impact items.

Work Stream A is completable independently. Work Stream B depends on the Thurgood prompt expansion from Work Stream A (the prompt needs to exist before triggers reference it).

**Primary agent:** Thurgood (all tasks — this is Civitas infrastructure work)
**Review checkpoints:** Ada reviews Rosetta section of Systems Overview. Lina reviews reassigned doc metadata. Peter approves all steering doc changes via ballot measure model.

---

## Architecture

### Execution Sequence

```
Work Stream A (Naming Rollout):
  Task 1: Civitas Definition Document (Req 1)
  Task 2: Systems Overview Restructure + Terminology Rollout (Reqs 2, 3)
    2.1: Draft Systems Overview restructure (three-system framing)
    2.2: Ada reviews Rosetta section → resolve any findings
    2.3: Terminology rollout across steering docs and agent prompts
    2.4: Cross-reference updates for renamed file + grep verification
  Task 3: Thurgood Scope Expansion + Shared Doc Reassignment (Reqs 4, 5)
    3.1: Update Thurgood prompt, config, Agent Directory
    3.2: Reassign Shared docs, update Lina prompt + Agent Directory
    3.3: Lina confirms metadata accuracy for 2 reassigned docs (handoff)

  ** Gate: Work Stream A complete (all ballot measures approved, Ada review resolved) **

Work Stream B (Governance Activation):
  Task 4: Dormant Tooling Assessment + Trigger Implementation (Reqs 6, 7)
  Task 5: Cadence Trigger + Process Documentation (Reqs 8, 9)
```

Task 1 must complete first (the definition doc is referenced by everything else). Task 2 is non-atomic due to the Ada review checkpoint — the terminology rollout (2.3) waits on Ada sign-off of the Rosetta section (2.2). Task 3 includes a handoff to Lina for metadata confirmation of reassigned docs. The gate between Work Streams ensures all naming work is settled before governance activation begins. Task 4 depends on Task 3 (Thurgood's expanded prompt defines the trigger responsibilities). Task 5 depends on Task 4 (cadence trigger references the tooling activated in Task 4).

### Data Sources

| Source | Used By | Access Method |
|--------|---------|---------------|
| Spec 098 terminology audit (blast radius) | Task 2 | File read: `findings/terminology-audit.md` |
| Spec 098 surface area inventory (doc list, domain tags) | Tasks 1, 2, 3 | File read: `findings/surface-area-inventory.md` |
| Spec 098 governance gaps (dormancy pattern, enforcement inventory) | Tasks 4, 5 | File read: `findings/governance-gaps.md` |
| Spec 098 prior audit digest (dormant scripts) | Task 4 | File read: `findings/prior-audit-digest.md` |
| Current steering docs | Tasks 2, 3 | File read + grep |
| Current agent configs | Task 3 | File read: `.kiro/agents/*.json`, `.kiro/agents/*-prompt.md` |
| Dormant scripts | Task 4 | File read + execution: `scripts/detect-stale-metadata.js`, etc. |
| Start Up Tasks | Task 5 | File read + edit: `.kiro/steering/Start Up Tasks.md` |

---

## Components and Interfaces

### New Artifacts

| Artifact | Type | Location | Req |
|----------|------|----------|-----|
| Civitas definition document | Steering doc (L1) | `.kiro/steering/Civitas-System-Overview.md` | 1 |
| DesignerPunk-Systems-Overview | Renamed steering doc (L1) | `.kiro/steering/DesignerPunk-Systems-Overview.md` | 2 |
| Post-spec affected-doc detection script | Shell/Node.js | `scripts/detect-affected-steering-docs.sh` | 6, 7 |
| Governance check wrapper | Shell | `scripts/governance-check.sh` | 7 |
| Steering doc metadata validator (updated or new) | Node.js | `scripts/validate-steering-metadata.js` (updated) or new | 6, 7 |

### Modified Artifacts

| Artifact | Change | Req |
|----------|--------|-----|
| Agent Directory | Thurgood expanded role, Civitas description, Shared doc reassignments | 4, 5 |
| `thurgood-prompt.md` | Civitas steward responsibilities, three-layer boundary, resolution path, discovery triggers, governance processes | 4, 9 |
| `thurgood.json` | New steering doc references, skills as needed | 4 |
| `lina-prompt.md` | Add 2 reassigned docs to In Scope as maintained docs (not just consumed); add to Domain Boundaries | 5 |
| 6 steering docs | Rosetta+Stemma paired reference updates | 3 |
| 8 agent prompts | Civitas terminology additions | 3 |
| Start Up Tasks (all agents) | Governance health check date | 8 |
| Process-File-Organization | Cross-reference to governance processes | 9 |

---

## Design Decisions

### Decision 1: Civitas Definition Document Structure

The definition document follows the pattern established by Rosetta-Stemma-Systems-Overview — concise architectural overview with clear boundaries.

**Proposed sections:**
1. Overview (what Civitas is, one paragraph)
2. What Civitas Contains (categorized list: steering docs, MCPs, agents, hooks, KBs, spec workflows)
3. What Civitas Does Not Contain (token definitions, component implementations, product screens)
4. Relationship to Rosetta and Stemma (content vs. infrastructure ownership model — explicitly distinguishes: Civitas governs the documentation and governance rules *about* tokens/components; Rosetta/Stemma own the definitions and pipelines themselves)
5. The Three-Layer Boundary (content correctness, content consistency, infrastructure health)
6. Governance Processes (summary with pointer to Thurgood's prompt as authoritative source)
7. External Representation (portfolio site guidance)

**Token budget:** ~3,000-4,000 tokens. Each section should be 400-600 tokens. The document is a reference, not a tutorial.

### Decision 2: Terminology Rollout Methodology

The rollout uses the spec 098 terminology audit as its work list:

1. **Pre-rollout verification:** Grep all target files to confirm baseline match counts match the audit's findings
2. **Systematic updates:** Work through the 6 steering docs with Rosetta+Stemma paired references, then the 8 agent prompts
3. **Post-rollout verification:** Re-grep to confirm all targets updated, no new inconsistencies introduced
4. **Cross-reference update:** Update all references to the renamed Systems Overview file (steering docs + agent configs only, not spec artifacts)

**Key principle:** Civitas is additive. "Rosetta and Stemma" becomes "Rosetta, Stemma, and Civitas" — not a replacement of existing terms.

### Decision 3: Thurgood Prompt Expansion Approach

The prompt expansion adds a new "Operational Mode: Civitas Steward" section alongside the existing Spec Formalization, Audit, and Test Governance modes. This keeps the new responsibilities clearly separated from existing ones.

**New prompt sections:**
- Civitas Steward identity and three-layer boundary definition
- Resolution path for flagged inconsistencies
- Discovery triggers (explicit responsibility)
- Governance processes (operational procedures for metadata enforcement, MCP monitoring, prompt currency)
- Monthly health check procedure

**Existing sections modified:**
- Identity section: add Civitas steward role alongside existing roles
- Domain Boundaries: add Civitas infrastructure to "In Scope"

### Decision 4: Trigger Implementation Architecture

Event-driven triggers are implemented as standalone scripts callable from a governance check wrapper. They are NOT hooks (`.kiro.hook` files) — the audit found that agent hooks are "universally shallow" because they're user-triggered prompts, not deterministic checks. Scripts provide deterministic, repeatable validation.

**Script architecture:**
- Each trigger is a standalone script in `scripts/` that can be run independently
- Scripts produce structured output (markdown-formatted findings) to stdout
- Scripts exit 0 on success (no issues), exit 1 on findings (issues detected), exit 2 on error (script failure)
- Trigger scripts are identified by **explicit enumeration** in the wrapper, not by glob or naming convention. This prevents accidentally sweeping in domain scripts (e.g., `validate-examples.js` is Rosetta domain, not governance) that share the `scripts/` directory.

**Integration point:** A new `scripts/governance-check.sh` wrapper that:
- Checks whether `.kiro/steering/` files are in the changeset (via `git diff --name-only`)
- If no steering docs changed: fast no-op exit with "No governance-relevant changes detected"
- If steering docs changed: calls the relevant trigger scripts by explicit name and presents output
- Can be called from `commit-task.sh` post-commit or run standalone

### Decision 5: Cadence Trigger in Start Up Tasks

The project has a single `Start Up Tasks.md` file (`.kiro/steering/Start Up Tasks.md`) with `inclusion: always` — loaded by all agents at session start. The governance health check date is added as a single conditional line, placed after the existing date verification check:

```
IF it's been >30 days since last governance health check [YYYY-MM-DD], THEN flag: "Governance health check overdue — switch to Thurgood (ctrl+shift+t) to run monthly health check before proceeding."
```

This is added to ALL agents' Start Up Tasks. When any agent detects it's overdue, the message directs Peter to switch to Thurgood. Thurgood's prompt includes the health check procedure. After completion, Thurgood updates the date.

---

## Error Handling

**Terminology rollout errors:** If grep verification reveals missed references or new inconsistencies after the rollout, fix them before committing. The pre/post grep comparison is the safety net.

**Trigger script errors:** Scripts handle missing git tags, missing files, and access errors gracefully with descriptive messages and non-zero exit codes. Triggers are advisory, not blocking — a script failure doesn't halt the workflow.

**Token budget overrun:** If the Civitas definition document exceeds 4,000 tokens, revise before merging. The section structure (7 sections × ~500 tokens) provides natural cut points.

**Ballot measure rejection:** If Peter rejects a steering doc change during the ballot measure process, document the alternative and adjust. The rollout is incremental — individual changes can be revised without rolling back the entire spec.

---

## Testing Strategy

This spec produces documentation and scripts, not application code. Testing is verification-based:

**Documentation verification:**
- Grep-based pre/post verification for terminology rollout
- Cross-reference validation after Systems Overview rename
- Token count verification for Civitas definition document
- Agent config validation (JSON syntax, file path resolution)

**Script verification:**
- Each trigger script tested with: normal case, no-changes case, error case (missing tags/files)
- Scripts tested against current repo state to verify they produce expected output
- Integration test: run full post-completion workflow with trigger scripts to verify end-to-end behavior

**Process verification:**
- Start Up Tasks governance date check verified by reading the file and confirming the conditional is present
- Thurgood prompt governance processes verified by reading the prompt and confirming all processes are documented
- Cross-reference from Process-File-Organization to Thurgood's prompt verified
