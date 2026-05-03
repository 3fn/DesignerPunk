# Spec Feedback: Civitas Readiness Audit

**Spec**: 098-civitas-readiness-audit
**Created**: 2026-05-03

---

## Design Outline Feedback

### Context for Reviewers
- "Civitas" was chosen as the name for the intelligence/governance layer, paralleling Rosetta (tokens) and Stemma (components) → design-outline.md § "Problem Statement"
- This is an audit spec, not a formalization spec. It produces findings and a readiness recommendation, not implementation changes → design-outline.md § "Scope"
- The Stemma contract system chain (062 → 063 → 078) is the explicit precedent for the audit-first approach → design-outline.md § "Precedent"
- The audit explicitly does NOT assume a new agent is the answer — it evaluates whether one is warranted → design-outline.md § "Risks and Counter-Arguments"

#### [STACY R1]

1. **Missing dimension: existing governance tooling inventory** — Specs 020 and 036 already built governance tooling (staleness detection script, review processes, category prefix governance). The audit needs a sub-dimension in Dimension 4 (or a Dimension 0) that inventories existing governance tooling before assessing gaps. Without this, the gap analysis will be inaccurate — it should distinguish "what exists and isn't being used" from "what doesn't exist at all." → design-outline.md § "Audit Dimensions" **[HIGH]**

2. **Soft edge on agent design in Dimension 5** — Answering "What would the agent's domain boundaries be?" is dangerously close to implementation. 062 stayed disciplined by producing findings, not designs. Recommend Dimension 5 produce *options with trade-offs* (new agent vs. expand Thurgood vs. distributed ownership) rather than a recommended agent design. → design-outline.md § "Scope" **[MEDIUM]**

3. **Missing precedent lesson: existence ≠ adoption** — 062 found the standard contracts library (16 contracts) was completely disconnected from implementations. Governance and implementation had evolved independently. Same risk here: spec 020 built staleness detection tooling that may not be in active use. Add a "What We Should Verify" bullet about adoption vs. existence. → design-outline.md § "Precedent" **[MEDIUM]**

4. **Missing risk: audit fatigue / redundant discovery** — Specs 020, 032, 033, 036 already audited steering documentation. This audit should consume those findings as inputs, not re-derive them. Add a risk entry with mitigation: "Task 1 should begin by inventorying prior audit findings relevant to Civitas scope." → design-outline.md § "Risks and Counter-Arguments" **[HIGH]**

5. **Staleness threshold inconsistency** — Design outline proposes 3-month threshold; spec 020 built `scripts/detect-stale-metadata.js` with 6-month warning / 12-month error thresholds. Reference existing infrastructure or explain why threshold changed. → design-outline.md § "Dimension 3: Staleness Assessment" **[LOW]**

6. **Deliverable structure: strong** — Six deliverables tied to dimensions, readiness recommendation as separate deliverable. No concerns. → design-outline.md § "Expected Outputs"

#### [LINA R1]

1. **Missing dimension: enforcement mechanism inventory** — The biggest lesson from 062→078: nothing enforced using the uniform contract system after 063 built it. The audit should inventory what automated checks enforce governance, what process checks enforce governance, which actually fire, and which governance expectations have no enforcement at all. Recommend adding to Dimension 4 or creating Dimension 4b. Deliverable: governance expectation → enforcement mechanism → last known trigger → status (active/dormant/missing). → design-outline.md § "Audit Dimensions" **[HIGH]**

2. **"Lightweight" is aspirational** — Surface area is significantly larger than 062's (86 docs + 3 MCPs + 8 agents vs. 28 components). The terminology audit alone requires scanning 86 docs and 8 agent prompts. Either timebox each dimension with "good enough" thresholds, or drop the "lightweight" framing and call it a medium-weight audit. → design-outline.md § "Scope" **[MEDIUM]**

3. **Cross-reference fragility** — Civitas formalization will rename/relabel things across 86 docs. The audit should assess: how many cross-references exist between steering docs, how they're maintained today (answer: not systematically), and what the blast radius of a terminology change would be. The docs MCP has `list_cross_references` — this is queryable. Without this, the formalization spec discovers it mid-flight. → design-outline.md § "Audit Dimensions" / Dimension 4 **[HIGH]**

4. **Thurgood-Civitas boundary conflict matrix** — Dimension 5 should produce a specific deliverable mapping every governance responsibility to current owner AND proposed Civitas owner, highlighting overlaps. The question isn't just "would a new agent help" — it's "where specifically would new boundaries create more coordination overhead?" → design-outline.md § "Audit Dimensions" / Dimension 5 **[MEDIUM]**

5. **Blast radius on Stemma documentation** — 27 references to "Rosetta + Stemma" as a pair across 6 steering docs. Rosetta-Stemma-Systems-Overview is Layer 1 (always loaded). Introducing Civitas means restructuring from two-system to three-system framing. The terminology audit should quantify this specifically. → design-outline.md § "Objectives" / Objective 1 **[MEDIUM]**

6. **Does Civitas have a "schema equivalent"?** — Rosetta has token definitions, Stemma has component schemas. What's the Civitas equivalent? If the answer is "it's inherently heterogeneous," that's legitimate but means Civitas is architecturally different from its siblings. The readiness recommendation should explicitly address whether the naming parallel holds. → design-outline.md § "Risks and Counter-Arguments" **[HIGH]**

#### [ADA R1]

1. **Boundary clarity: content vs. infrastructure** — Token docs are Rosetta *content* served by Civitas *infrastructure*. The audit must distinguish content ownership (Rosetta, Stemma) from infrastructure ownership (Civitas). Recommend dual-axis categorization in Dimension 1: each artifact tagged by both content domain (Rosetta/Stemma/Process/Integration) and infrastructure role (served by which MCP, governed by which process). → design-outline.md § "Audit Dimensions" / Dimension 1 **[HIGH]**

2. **Staleness methodology for token docs** — 3-month threshold is blunt. 10 of 15 Token-Family docs would be flagged, but most are stable (no spec has changed their domain). Recommend distinguishing stale-and-potentially-inaccurate from stale-but-stable by cross-referencing Last Reviewed dates against the spec log. → design-outline.md § "Dimension 3: Staleness Assessment" **[MEDIUM]**

3. **Agent interaction model** — Two models to evaluate: (A) Civitas as infrastructure steward (librarian — owns health, metadata, staleness; does NOT own content accuracy) vs. (B) Civitas as documentation authority (problematic — duplicates domain expertise). Recommends the audit explicitly evaluate both. → design-outline.md § "Audit Dimensions" / Dimension 5 **[HIGH]**

4. **Token-specific governance gaps** — Four gaps to surface: (1) token doc ↔ source code drift with no automated verification, (2) MCP token index ↔ steering doc parity gap, (3) cross-reference fragility across 15+ interconnected token docs, (4) theme documentation gap where Spec 094 changes aren't reflected in older Token-Family docs. → design-outline.md § "Audit Dimensions" / Dimension 4 **[MEDIUM]**

5. **Support for audit-first** — Strong endorsement. Adds that governance enforcement should be assessed separately from governance definition, per the 063→078 lesson. → design-outline.md § "Precedent" **[LOW]**

6. **Token docs are ~23% of surface area** — 20 of 86 steering docs are token-related. Largest single domain cluster. Will disproportionately influence staleness/consistency findings. Audit should be aware of this weighting. → design-outline.md § "Audit Dimensions" / Dimension 1 **[LOW]**

#### [THURGOOD R2] — Incorporation Notes

All R1 feedback from Stacy, Lina, and Ada has been incorporated into the design outline. Summary of changes:

**From STACY R1:**
- Item 1 (existing governance tooling): Added prior audit findings inventory to In Scope list. Added sub-area 4a to Dimension 4 requiring inventory of existing tooling from specs 020/032/033/036 before assessing gaps. Updated Problem Statement point 4 to acknowledge existing tooling and reframe gap as potentially adoption rather than absence.
- Item 2 (soft edge on agent design): Restructured Dimension 5 to produce options with trade-offs rather than a recommended design. Three explicit options listed (new agent, expand Thurgood, distributed ownership).
- Item 3 (existence ≠ adoption): Added as fourth bullet under "What We Should Watch For" in Precedent section.
- Item 4 (audit fatigue): Added as new risk "Redundant discovery" in Risks section with mitigation.
- Item 5 (staleness threshold): Replaced 3-month threshold with reference to existing `scripts/detect-stale-metadata.js` and its 6-month/12-month thresholds. Added question about whether the script is actively used.

**From LINA R1:**
- Item 1 (enforcement mechanisms): Added sub-area 4b to Dimension 4 with enforcement mechanism inventory table format.
- Item 2 ("lightweight" framing): Replaced with explicit "medium-weight audit" acknowledgment and "good enough" threshold guidance in Scope section.
- Item 3 (cross-reference fragility): Added sub-area 4c to Dimension 4 with specific questions about cross-reference counts, maintenance processes, and blast radius estimation.
- Item 4 (boundary conflict matrix): Added to Dimension 5 as explicit deliverable requirement.
- Item 5 (Rosetta+Stemma blast radius): Added two questions to Dimension 2 about paired reference counts and two-system framing instances.
- Item 6 (schema equivalent): Added as final question in Dimension 6.

**From ADA R1:**
- Item 1 (dual-axis categorization): Added to Dimension 1 with content domain axis and infrastructure role axis.
- Item 2 (stale-but-stable distinction): Added to Dimension 3 as key distinction with cross-referencing methodology.
- Item 3 (steward models): Added Model A (infrastructure steward) and Model B (documentation authority) to Dimension 5 for explicit evaluation.
- Item 4 (token-specific gaps): Covered by Dimension 4's expanded scope (enforcement mechanisms, cross-reference fragility). Token-specific instances will surface during execution.
- Item 5 (audit-first endorsement): No change needed — already aligned.
- Item 6 (surface area weighting): Added note to Dimension 1 about token docs being ~23% of surface area.

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
- All tasks assigned to Thurgood as sole executor with ad-hoc consultation → tasks.md § "Implementation Plan"
- 6 audit dimensions collapsed into 4 parent tasks (Dim 2+3 merged, Dim 5+6 merged) → tasks.md § "Task List"
- Task types: 1.1-3.3 are Implementation/Tier 2; 4.1-4.2 are Architecture/Tier 3 → tasks.md § individual tasks
- Audit discipline (Req 11) enforced by preamble statement and per-task scope boundaries → tasks.md § "Implementation Plan"

#### [STACY R1]

1. **"Good enough" thresholds inconsistently reflected** — Design doc defines explicit thresholds per dimension but several subtasks (2.2, 4.1, 4.2) don't restate them. Creates scope-creep risk. Recommend adding "Scope boundary" line to each subtask. → tasks.md § all subtasks **[HIGH]**
2. **Req 11 enforcement is implicit** — Scope-creep detection mechanism from design doc ("stop and note expansion pressure as a finding") should be promoted into tasks preamble. Add explicit consultation decision points. → tasks.md § "Implementation Plan" **[HIGH]**
3. **Task 3.1 parallelism note** — Task 3.1 has no dependency on Task 2; only Task 3.2's blast radius estimate depends on Task 2 findings. → tasks.md § Task 3 **[MEDIUM]**
4. **Task 4.1 type classification** — Architecture is defensible given boundary conflict matrix work. Ensure Tier 3 completion documentation. → tasks.md § Task 4.1 **[MEDIUM]**
5. **Missing cross-validation step** — No task verifies findings quality (evidence citations, requirement traces, cross-dimension references). Add to Task 4 success criteria. → tasks.md § Task 4 **[MEDIUM]**
6. **Spec 062 as data source for Task 4.2** — Spec 062 completion docs needed for scope estimation but not covered by Task 1.1's prior audit consumption. → tasks.md § Task 4.2 **[LOW]**
7. **Req 1 trace consistent** — No action needed. → tasks.md § Task 1.1 **[LOW]**

#### [LINA R1]

1. **Task 1.1 deferred output is context-loss risk** — Produce a standalone artifact in findings/ rather than holding preamble content mentally until Task 3. → tasks.md § Task 1.1 **[MEDIUM]**
2. **Task 2 granularity: good** — Clean split, no concerns. → tasks.md § Task 2
3. **Task 3.2 is overloaded** — Covers cross-reference fragility (Req 7) AND process gaps (Req 8) AND consolidation. Split into two subtasks. → tasks.md § Task 3.2 **[HIGH]**
4. **Grep targets incomplete** — Add `.kiro/agents/*.json` to scan targets. JSON configs contain steeringDocs path references. → tasks.md § Task 2.1 **[MEDIUM]**
5. **Grep term list incomplete** — Add "shared knowledge layer," "documentation governance," "MCP server," "MCP documentation server." → tasks.md § Task 2.1 **[MEDIUM]**
6. **Staleness script fallback underspecified** — Specify `get_documentation_map()` as MCP fallback for date extraction. → tasks.md § Task 2.2 **[LOW]**
7. **Enforcement discovery must be bidirectional** — Scan mechanisms AND expectations, not just expectations→mechanisms. Scan `src/__tests__/stemma-system/`, `.kiro/hooks/*.kiro.hook`, `scripts/`. → tasks.md § Task 3.1 **[HIGH]**
8. **Test-based enforcement needs depth assessment** — "Does it validate the actual governance expectation?" not just "does it exist?" → tasks.md § Task 3.1 **[MEDIUM]**
9. **Schema-equivalent question needs meta-framing** — Explicitly state whether answerable from audit evidence or deferred to formalization spec. → tasks.md § Task 4.2 **[MEDIUM]**
10. **Scope estimation output format underspecified** — Specify concrete dimensions: docs requiring modification, new processes needed, agent creation prerequisite or deferrable. → tasks.md § Task 4.2 **[MEDIUM]**

#### [ADA R1]

1. **Surface area weighting undercounted** — ~29% Rosetta (including pipeline integration docs), not ~23%. → tasks.md § Task 1.2 **[LOW]**
2. **Staleness heuristic misses indirect staleness** — Pipeline architecture specs (080, 094) create indirect staleness in Token-Family docs. Add cross-reference against pipeline specs. Consult Ada if uncertain. → tasks.md § Task 2.2 **[MEDIUM]**
3. **Token governance enforcement is richer than implied** — ~11 distinct expectations. Task 3.1 needs pointer to consult Ada. → tasks.md § Task 3.1 **[HIGH]**
4. **Dual-axis tagging needs ambiguity escape hatch** — Carry design doc's "flag ambiguous cases" instruction into task steps. → tasks.md § Task 1.2 **[MEDIUM]**
5. **Application MCP token tools missing from inventory** — Note dual role: component metadata AND token metadata. → tasks.md § Task 1.2 **[LOW]**

#### [THURGOOD R2] — Incorporation Notes

All R1 feedback from Stacy, Lina, and Ada has been incorporated into the tasks document. Summary of changes:

**Structural changes:**
- Task 3.2 split into 3.2 (cross-reference fragility) and 3.3 (process gaps) per Lina R1-3. Now 4 parent tasks, 9 subtasks.
- Task 1.1 now produces `findings/prior-audit-digest.md` as standalone artifact per Lina R1-1, eliminating context-loss risk.

**Preamble changes:**
- Added audit discipline rule from design doc per Stacy R1-2: "If any subtask's analysis starts expanding beyond its stated scope boundary, stop and note the expansion pressure as a finding."
- Added consultation instruction per Stacy R1-2.

**Per-subtask scope boundaries added (Stacy R1-1):**
- Task 1.1: "Extract and verify — do not assess effectiveness"
- Task 1.2: "Complete inventory of steering docs, MCPs, agents, hooks. Spec infrastructure and KBs at summary level"
- Task 2.1: "Grep-based pattern matching. Not semantic analysis. Manual review of ambiguous matches only"
- Task 2.2: "Metadata-based analysis. Not content-level accuracy review"
- Task 3.1: "Major governance expectations, not every minor convention"
- Task 3.2: "Representative sampling, not exhaustive scan"
- Task 3.3: "Qualitative assessment. Not behavioral analysis of how processes operate in practice"
- Task 4.1: "Analysis based on Agent Directory and prompt files. Not behavioral analysis from conversation logs"
- Task 4.2: "Recommendation grounded in findings. Not a detailed formalization spec plan"

**Task 1.2 changes (Ada R1-1, R1-4, R1-5):**
- Updated Rosetta weighting to ~29%
- Added ambiguity escape hatch: "Where a doc spans multiple content domains, tag primary and note secondary"
- Added Application MCP dual role note (component + token metadata)

**Task 2.1 changes (Lina R1-4, R1-5):**
- Expanded grep targets to include `.kiro/agents/*.json`
- Expanded term list: added "governance infrastructure," "governance layer," "MCP server," "MCP documentation server," "shared knowledge layer," "documentation governance"

**Task 2.2 changes (Ada R1-2, Lina R1-6):**
- Added pipeline architecture spec cross-reference (080, 094) for indirect staleness
- Added Ada consultation point for pipeline-level impact uncertainty
- Specified `get_documentation_map()` as MCP fallback for date extraction

**Task 3.1 changes (Lina R1-7, R1-8, R1-9, Ada R1-3):**
- Made discovery bidirectional: scan mechanisms AND expectations
- Added scan targets: `src/__tests__/stemma-system/`, `.kiro/hooks/*.kiro.hook`, `scripts/`
- Added Ada and Lina consultation points for domain-specific enforcement mechanisms
- Added enforcement depth assessment for test-based mechanisms (vs. just last trigger)

**Task 4 success criteria changes (Stacy R1-5):**
- Added cross-validation criteria: "All findings cite specific evidence; requirement traces complete; readiness recommendation cross-references all prior dimensions"

**Task 4.2 changes (Lina R1-9, R1-10, Stacy R1-6):**
- Added meta-framing for schema-equivalent question: "Explicitly state whether answerable from audit evidence or deferred to formalization spec"
- Specified concrete scope estimation dimensions: docs requiring modification, new processes needed, agent creation prerequisite or deferrable
- Added spec 062 completion docs as data source for scope estimation
