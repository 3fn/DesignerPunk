# Implementation Plan: Civitas Readiness Audit

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Status**: Implementation Planning
**Dependencies**: None (consumes findings from specs 020, 032, 033, 036 as inputs)

---

## Implementation Plan

Execution follows the dependency sequence from the design document: prior audit consumption → surface area inventory → terminology/staleness/governance in sequence → agent ownership → readiness recommendation. All work is Thurgood's, with ad-hoc consultation of Ada, Lina, or Stacy when domain clarification is needed.

All deliverables are findings documents in `.kiro/specs/098-civitas-readiness-audit/findings/`. No files outside this spec directory are created or modified.

**Audit discipline (Req 11):** If any subtask's analysis starts expanding beyond its stated scope boundary, stop and note the expansion pressure as a finding. The formalization spec can decide whether deeper analysis is warranted. When domain clarification is needed, consult the relevant agent (Ada for Rosetta, Lina for Stemma, Stacy for process quality) rather than making assumptions.

---

## Task List

- [x] 1. Surface Area Inventory and Prior Audit Consumption

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Complete categorized inventory of all intelligence layer artifacts with dual-axis tagging
  - Prior audit findings from specs 020, 032, 033, 036 consumed and assessed for current relevance
  - Foundation established for all subsequent dimensions
  - No files outside `findings/` were created or modified

  **Primary Artifacts:**
  - `.kiro/specs/098-civitas-readiness-audit/findings/surface-area-inventory.md`
  - `.kiro/specs/098-civitas-readiness-audit/findings/prior-audit-digest.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/098-civitas-readiness-audit/completion/task-1-completion.md`
  - Summary: `docs/specs/098-civitas-readiness-audit/task-1-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Surface Area Inventory and Prior Audit Consumption"`

  - [x] 1.1 Consume prior audit findings
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Read completion docs from specs 020, 032, 033, 036
    - Extract: what tooling was built, what processes were established, what recommendations were made
    - For each item: verify it still exists (check file paths, script existence), assess active usage (git log, references)
    - Deliver as `findings/prior-audit-digest.md` (consumed by Task 3.1, not deferred as mental context)
    - **Scope boundary:** Extract and verify — do not assess effectiveness or propose improvements. That's Task 3's job.
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.2 Produce surface area inventory
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Query docs MCP `get_documentation_map()` for steering doc inventory
    - Query component MCP `get_component_health()` and docs MCP `get_index_health()` for MCP state
    - Note Application MCP dual role: serves both component metadata (34 components) and token metadata (search_tokens, get_token_details, get_token_family, get_token_consumers)
    - Read `.kiro/agents/` for agent configs (JSON) and prompts
    - Read `.kiro/hooks/` for hook definitions
    - Read spec 087 KB guide for knowledge base inventory
    - Read MCP-Relationship-Model.md for MCP server boundaries
    - Tag each steering doc with content domain (Rosetta/Stemma/Process/Integration) and infrastructure role
    - Where a doc spans multiple content domains, tag the primary domain and note the secondary. Flag ambiguous cases rather than forcing a single classification.
    - Note Rosetta domain weighting (~29% of surface area including pipeline integration docs)
    - **Scope boundary:** Complete inventory of steering docs, MCPs, agents, and hooks. Spec infrastructure and knowledge bases at summary level (counts and scope), not exhaustive file-by-file listing.
    - Deliver as `findings/surface-area-inventory.md`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

---

- [x] 2. Terminology Audit and Staleness Assessment

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Complete terminology scan with blast radius estimate for naming rollout
  - Staleness assessment distinguishing stale-and-inaccurate from stale-but-stable
  - Both deliverables grounded in evidence from Dimension 1 inventory
  - No files outside `findings/` were created or modified

  **Primary Artifacts:**
  - `.kiro/specs/098-civitas-readiness-audit/findings/terminology-audit.md`
  - `.kiro/specs/098-civitas-readiness-audit/findings/staleness-assessment.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/098-civitas-readiness-audit/completion/task-2-completion.md`
  - Summary: `docs/specs/098-civitas-readiness-audit/task-2-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Terminology Audit and Staleness Assessment"`

  - [x] 2.1 Terminology audit
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Grep `.kiro/steering/*.md` for intelligence layer terms including: "steering doc," "intelligence layer," "governance infrastructure," "governance layer," "MCP system," "MCP server," "MCP documentation server," "knowledge layer," "shared knowledge layer," "documentation governance," and variants
    - Grep `.kiro/agents/*-prompt.md` AND `.kiro/agents/*.json` for the same terms (JSON configs contain steeringDocs path references that constitute terminology usage)
    - Grep for "Rosetta + Stemma" paired references (patterns: "Rosetta and Stemma," "Rosetta/Stemma," "two systems," "dual foundation," "two named systems") and "two-system" framing
    - Categorize matches: would benefit from collective noun | should remain specific | ambiguous
    - Count paired references and two-system instances for blast radius estimate
    - **Scope boundary:** Grep-based pattern matching for known terms. Not a semantic analysis of every paragraph. Manual review of ambiguous matches only.
    - Deliver as `findings/terminology-audit.md`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 2.2 Staleness assessment
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Attempt to run `scripts/detect-stale-metadata.js`; if non-functional, query `get_documentation_map()` for metadata dates, supplemented by direct file reads for docs not in the MCP index
    - For each stale doc (>6 months since review), cross-reference against spec log for domain changes
    - For Rosetta-domain docs, also cross-reference against pipeline architecture specs (080, 094) that changed token resolution or generation behavior — these create indirect staleness in "Cross-Platform Usage" and "Usage Guidelines" sections. IF uncertain which specs had pipeline-level impact, THEN consult Ada.
    - Classify: stale-and-inaccurate | stale-but-stable | never-reviewed
    - Tabulate by content domain for correlation analysis
    - Assess whether staleness script is actively used
    - **Scope boundary:** Metadata-based analysis using dates and spec log cross-reference. Not a content-level accuracy review of each document.
    - Deliver as `findings/staleness-assessment.md`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

---

- [x] 3. Governance Gap Analysis

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Prior governance tooling inventoried with adoption status (from Task 1.1 digest)
  - Enforcement mechanism inventory produced with active/dormant/missing status
  - Cross-reference fragility assessed with blast radius estimate
  - Process gaps identified and classified
  - All findings consolidated in single deliverable
  - No files outside `findings/` were created or modified

  **Primary Artifacts:**
  - `.kiro/specs/098-civitas-readiness-audit/findings/governance-gaps.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/098-civitas-readiness-audit/completion/task-3-completion.md`
  - Summary: `docs/specs/098-civitas-readiness-audit/task-3-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Governance Gap Analysis"`

  - [x] 3.1 Enforcement mechanism inventory
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Discovery is bidirectional: (a) identify governance expectations from steering docs, then search for mechanisms; AND (b) scan enforcement mechanisms in `src/__tests__/stemma-system/`, `.kiro/hooks/*.kiro.hook`, and `scripts/`, then identify which governance expectations they enforce
    - For Rosetta-domain governance, consult Ada for the complete enforcement mechanism inventory — token governance has ~11 distinct expectations across automated and process enforcement
    - For Stemma-domain governance, consult Lina for enforcement mechanisms not discoverable from steering docs alone
    - For test-based mechanisms: assess enforcement depth (does it validate the actual governance expectation?) rather than just last trigger (which is always "last CI run")
    - For script/hook-based mechanisms: assess last trigger via git log
    - Embed prior audit digest from `findings/prior-audit-digest.md` as preamble
    - Produce table: expectation → mechanism → last trigger/depth → status (active/dormant/missing)
    - **Scope boundary:** Major governance expectations, not every minor convention. Bidirectional discovery covers the important mechanisms; exhaustive enumeration is not required.
    - _Requirements: 5.1, 5.2, 5.3, 6.1, 6.2, 6.3_

  - [x] 3.2 Cross-reference fragility assessment
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Use docs MCP `list_cross_references()` on representative sample: all Layer 1 docs + high-connectivity Layer 2 docs (rosetta-system-principles, stemma-system-principles, Component-Development-Guide, Token-Governance, Process-Development-Workflow)
    - Count cross-references, estimate full inventory, assess maintenance process
    - Estimate update count for terminology change using Task 2.1 findings
    - Assess whether `Process-Cross-Reference-Standards.md` is followed in practice
    - **Scope boundary:** Representative sampling, not exhaustive scan of all 86 docs. The formalization spec can do targeted scanning during rollout.
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 3.3 Process gap assessment
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Assess process gaps: doc lifecycle (creation → review → update → deprecation), MCP health monitoring, prompt drift detection, new doc identification, contradiction handling
    - For each: classify as documented and active | documented but dormant | not documented
    - Consolidate all Dimension 4 findings (3.1 + 3.2 + 3.3) into `findings/governance-gaps.md`
    - **Scope boundary:** Qualitative assessment based on steering doc review. Not a behavioral analysis of how processes actually operate in practice.
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

---

- [x] 4. Agent Ownership Analysis and Readiness Recommendation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Boundary conflict matrix produced mapping responsibilities to current and proposed owners
  - Three agent options evaluated with evidence-grounded trade-offs
  - Readiness recommendation produced with go/no-go/conditional-go verdict
  - Schema-equivalent question explicitly addressed (substantive answer or meta-answer about what the formalization spec must resolve)
  - All findings traceable to evidence from prior dimensions
  - All findings cite specific evidence; requirement traces complete; readiness recommendation cross-references all prior dimensions
  - No files outside `findings/` were created or modified

  **Primary Artifacts:**
  - `.kiro/specs/098-civitas-readiness-audit/findings/agent-ownership-analysis.md`
  - `.kiro/specs/098-civitas-readiness-audit/findings/readiness-recommendation.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/098-civitas-readiness-audit/completion/task-4-completion.md`
  - Summary: `docs/specs/098-civitas-readiness-audit/task-4-summary.md`

  **Post-Completion:**
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Agent Ownership Analysis and Readiness Recommendation"`

  - [x] 4.1 Agent ownership analysis
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Read Agent Directory and each agent prompt's domain boundaries
    - Map governance responsibilities (from Dimension 4) to current owners; identify unowned responsibilities
    - Evaluate Model A (infrastructure steward) vs. Model B (documentation authority) against evidence
    - Produce boundary conflict matrix: responsibility × current owner × proposed Civitas owner
    - Evaluate three options with trade-offs: new agent, expand Thurgood, distributed ownership
    - Present options without recommending — Peter decides
    - **Scope boundary:** Analysis based on Agent Directory and prompt files. Not a behavioral analysis of how agents actually operate in practice — that would require reviewing conversation logs, which is out of scope.
    - Deliver as `findings/agent-ownership-analysis.md`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [x] 4.2 Readiness recommendation
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Synthesize findings from all dimensions
    - Assess boundary coherence: does the intelligence layer have a definable boundary?
    - Address schema-equivalent question: does Civitas have a unifying artifact format or is it a governance umbrella over heterogeneous artifacts? Explicitly state whether this question is answerable from audit evidence or whether it's a question the formalization spec must resolve.
    - Estimate formalization spec scope as concrete dimensions: number of steering docs requiring modification, number of new governance processes needed, whether agent creation is a prerequisite or can be deferred. Read spec 062 completion docs for scope estimation precedent.
    - Identify blocking issues, if any
    - Produce go / no-go / conditional-go verdict with specific conditions if conditional
    - **Scope boundary:** Recommendation grounded in findings with specific evidence citations. Not a detailed formalization spec plan — that's the formalization spec's job.
    - Deliver as `findings/readiness-recommendation.md`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_
