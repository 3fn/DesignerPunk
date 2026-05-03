# Design Document: Civitas Readiness Audit

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Status**: Design Phase
**Dependencies**: None (consumes findings from specs 020, 032, 033, 036 as inputs)

---

## Overview

This audit produces six findings documents and a readiness recommendation. It is analysis work, not implementation — no files are modified outside the spec's `findings/` directory. The design focuses on methodology: how to gather evidence efficiently, what "good enough" means for each dimension, and how findings feed into the readiness recommendation.

**Primary agent**: Thurgood (audit methodology, governance analysis)
**Consultation**: Ada (token doc clarification), Lina (Stemma precedent clarification), Stacy (process quality clarification) — queried as needed, not as formal reviewers during execution.

---

## Architecture

### Execution Sequence

The six dimensions have natural dependencies:

```
Dimension 1 (Surface Area Inventory)
    ├── Dimension 2 (Terminology Audit) — needs inventory to know what to scan
    ├── Dimension 3 (Staleness Assessment) — needs inventory for doc list
    └── Dimension 4 (Governance Gaps) — needs inventory for enforcement mapping
            └── Dimension 5 (Agent Ownership) — needs gaps to map responsibilities
                    └── Dimension 6 (Readiness Recommendation) — synthesizes all
```

Dimension 1 must complete first. Dimensions 2, 3, and 4 can run in parallel after Dimension 1. Dimension 5 depends on Dimension 4. Dimension 6 depends on all others.

However, since Thurgood is the sole executor, parallelism is sequential in practice. The dependency graph matters for ensuring findings are available when needed, not for parallel execution.

### Prior Audit Consumption

Before Dimension 1 begins, the audit consumes findings from prior specs. This is a prerequisite step, not a dimension.

**Specs to consume:**
- **Spec 020** (Steering Documentation Refinement) — built `scripts/detect-stale-metadata.js`, quarterly review process, metadata maintenance guidelines
- **Spec 032** (Documentation Architecture Audit) — produced architecture findings, consolidation proposals
- **Spec 033** (Steering Documentation Enhancements) — produced enhancement recommendations
- **Spec 036** (Steering Documentation Audit) — produced impact prioritization, category prefix governance

**Method:** Read each spec's findings/completion documents. Extract: what tooling was built, what processes were established, what recommendations were made. Assess current relevance.

**Deliverable:** Embedded as preamble in `findings/governance-gaps.md` (Req 5), not a separate document.

---

## Methodology by Dimension

### Dimension 1: Surface Area Inventory

**Method:**
1. Query docs MCP `get_documentation_map()` for complete steering doc inventory with layers and token counts
2. Query component MCP `get_component_health()` for Application MCP state
3. Read `.kiro/agents/` directory for agent configurations
4. Read `.kiro/hooks/` directory for hook definitions
5. Read `.kiro/specs/087-agent-knowledge-base-strategy/knowledge-base-configuration-guide.md` for KB inventory
6. Read `.kiro/steering/MCP-Relationship-Model.md` for MCP server boundaries

**Dual-axis tagging:** For each steering doc, assign:
- Content domain: Rosetta | Stemma | Process | Integration (based on doc prefix and content)
- Infrastructure role: which MCP serves it (Docs MCP for all steering docs), which agent maintains it (based on Agent Directory domain mapping)

**Good enough threshold:** Complete inventory of steering docs, MCPs, agents, and hooks. Spec infrastructure and knowledge bases documented at summary level (counts and scope), not exhaustive file-by-file listing.

**Traces to:** Req 2

### Dimension 2: Terminology Audit

**Method:**
1. Grep all `.kiro/steering/*.md` files for intelligence layer terminology: "steering doc," "intelligence layer," "governance," "MCP system," "knowledge layer," and variants
2. Grep all `.kiro/agents/*-prompt.md` files for the same terms
3. Grep for "Rosetta + Stemma" paired references (patterns: "Rosetta and Stemma," "Rosetta/Stemma," "two systems," "dual foundation," "two named systems")
4. Categorize each match: would benefit from collective noun | should remain specific | ambiguous

**Good enough threshold:** Grep-based scan of steering docs and agent prompts. Not a semantic analysis of every paragraph — pattern matching for known terms is sufficient. Manual review of ambiguous matches only.

**Traces to:** Req 3

### Dimension 3: Staleness Assessment

**Method:**
1. Attempt to run `scripts/detect-stale-metadata.js` — if functional, use its output as baseline
2. If script is non-functional or missing, extract `Last Reviewed` dates from all steering doc metadata headers manually
3. For each doc flagged as stale (>6 months since review), cross-reference against spec log: did any spec since the last review modify this doc's domain?
4. Classify: stale-and-inaccurate (domain changed) | stale-but-stable (domain unchanged) | never-reviewed (no date)
5. Tabulate by content domain to check for correlation

**Good enough threshold:** Metadata-based analysis using dates and spec log cross-reference. Not a content-level accuracy review of each document — that would be a separate, much larger effort.

**Traces to:** Req 4

### Dimension 4: Governance Gap Analysis

**4a. Prior tooling inventory (Req 5):**
1. Read completion docs from specs 020, 032, 033, 036
2. For each piece of tooling or process established: verify it still exists (check file paths, script existence), assess whether it's actively used (check git log for recent invocations or references)

**4b. Enforcement mechanism inventory (Req 6):**
1. Identify governance expectations from steering docs (metadata requirements, contract authoring order, token governance levels, ballot measure model, etc.)
2. For each expectation, search for automated enforcement (test files, validation scripts, MCP checks) and process enforcement (documented in workflows, agent prompts)
3. Produce table: expectation → mechanism → last trigger → status

**4c. Cross-reference fragility (Req 7):**
1. Use docs MCP `list_cross_references()` on a representative sample of steering docs (Layer 1 docs + high-connectivity Layer 2 docs)
2. Count total cross-references and estimate full-inventory count
3. Assess maintenance process: is there a documented process? Is `Process-Cross-Reference-Standards.md` followed?
4. Estimate update count for terminology change based on Dimension 2 findings

**4d. Process gaps (Req 8):**
1. For each process question (doc lifecycle, MCP health monitoring, prompt drift detection, etc.), search steering docs for documented processes
2. Classify: documented and active | documented but dormant | not documented

**Good enough threshold:** Representative sampling for cross-references (not exhaustive scan of all 86 docs). Enforcement mechanism inventory covers major governance expectations, not every minor convention.

**Traces to:** Reqs 5, 6, 7, 8

### Dimension 5: Agent Ownership Analysis

**Method:**
1. Read Agent Directory for current domain assignments
2. Read each agent prompt's "Domain Boundaries" section for in-scope/out-of-scope lists
3. Identify governance responsibilities from Dimension 4 findings that have no primary owner
4. Evaluate Model A (infrastructure steward) vs. Model B (documentation authority) against the evidence
5. Produce boundary conflict matrix: responsibility × current owner × proposed Civitas owner
6. Assess three options (new agent, expand Thurgood, distributed ownership) with trade-offs grounded in findings

**Good enough threshold:** Analysis based on Agent Directory and prompt files. Not a behavioral analysis of how agents actually operate in practice — that would require reviewing conversation logs, which is out of scope.

**Traces to:** Req 9

### Dimension 6: Readiness Recommendation

**Method:**
1. Synthesize findings from all dimensions
2. Assess boundary coherence: does the intelligence layer have a definable boundary, or is it "everything else"?
3. Assess schema-equivalent question: is there a unifying artifact format, or is Civitas inherently heterogeneous?
4. Estimate formalization spec scope based on: terminology blast radius (Dim 2), staleness remediation needed (Dim 3), governance gaps to fill (Dim 4), agent decision complexity (Dim 5)
5. Produce go / no-go / conditional-go verdict

**Good enough threshold:** Recommendation grounded in findings with specific evidence citations. Not a detailed formalization spec plan — that's the formalization spec's job.

**Traces to:** Req 10

---

## Data Sources

| Source | Access Method | Used By |
|--------|--------------|---------|
| Steering docs metadata | Docs MCP `get_documentation_map()` | Dim 1, 3 |
| Steering doc content | File read / grep | Dim 2, 4 |
| Agent prompts | File read (`.kiro/agents/*-prompt.md`) | Dim 2, 5 |
| Agent configs | File read (`.kiro/agents/*.json`) | Dim 1, 5 |
| Hook definitions | File read (`.kiro/hooks/`) | Dim 1, 4 |
| MCP server state | `get_component_health()`, `get_index_health()` | Dim 1 |
| MCP relationship model | File read | Dim 1 |
| Prior spec findings | File read (specs 020, 032, 033, 036 completion docs) | Dim 4 |
| Staleness script | Shell execution or file read | Dim 3 |
| Cross-references | Docs MCP `list_cross_references()` | Dim 4c |
| Spec log | File read (`.kiro/specs/` directory listing by date) | Dim 3 |
| KB configuration | File read (spec 087 guide) | Dim 1 |

---

## Error Handling

**Missing data:** If a data source is unavailable (e.g., staleness script doesn't run, MCP server is down), document the gap as a finding rather than blocking the audit. Fall back to manual methods where possible.

**Ambiguous classification:** When a steering doc's content domain or a governance responsibility's ownership is ambiguous, flag it explicitly in the findings rather than forcing a classification. Ambiguity is itself a finding.

**Scope creep detection:** If any dimension's analysis starts expanding beyond its "good enough" threshold, stop and note the expansion pressure as a finding. The formalization spec can decide whether deeper analysis is warranted.

---

## Testing Strategy

This is an audit spec — it produces findings documents, not code. There is no automated test suite.

**Quality validation:**
- Each findings document references specific evidence (file paths, grep results, MCP query outputs)
- Each findings document traces to its requirements
- The readiness recommendation cites specific findings from other dimensions
- Findings are falsifiable — they make claims that can be verified by reading the cited sources

---

## Design Decisions

### Decision 1: Single-agent execution with consultation

**Options Considered:**
1. Multi-agent pipeline (parallel execution across agents)
2. Single-agent execution with formal review rounds
3. Single-agent execution with ad-hoc consultation

**Decision:** Option 3

**Rationale:** The audit is analysis work that benefits from a single consistent perspective. Multi-agent execution would add coordination overhead without proportional benefit — the dimensions are sequential in practice. Formal review rounds between dimensions would slow execution for findings that are primarily factual (counts, dates, file existence). Ad-hoc consultation (querying Ada about token doc accuracy, Lina about Stemma precedent) provides domain expertise when needed without process overhead.

**Trade-offs:**
- ✅ Efficient execution, minimal coordination overhead
- ❌ Single perspective may miss domain-specific nuances
- Mitigated by: consultation when domain expertise is needed, and the design outline feedback round already captured domain concerns

### Decision 2: Prior audit findings as preamble, not separate deliverable

**Options Considered:**
1. Separate `findings/prior-audit-inventory.md` document
2. Preamble section in `findings/governance-gaps.md`

**Decision:** Option 2

**Rationale:** The prior audit inventory exists to inform the governance gap analysis — it's context, not a standalone finding. A separate document would add a deliverable that exists only to be consumed by another deliverable. Embedding it as a preamble keeps the context adjacent to the analysis it informs.

**Trade-offs:**
- ✅ Reduces deliverable count, keeps context co-located
- ❌ Prior audit findings less discoverable as a standalone reference
- Acceptable because: the formalization spec will reference `governance-gaps.md` directly

### Decision 3: Representative sampling for cross-references

**Options Considered:**
1. Exhaustive `list_cross_references()` on all 86 steering docs
2. Representative sample (Layer 1 + high-connectivity Layer 2 docs)
3. Skip cross-reference analysis entirely

**Decision:** Option 2

**Rationale:** Exhaustive scanning of 86 docs would be time-intensive and likely show diminishing returns after the first 15-20 high-connectivity docs. Layer 1 docs (always loaded, referenced by everything) and high-connectivity Layer 2 docs (Rosetta/Stemma principles, Component Development Guide, Token Governance) will capture the majority of cross-reference patterns. The sample provides a reliable estimate of total cross-references and blast radius without exhaustive enumeration.

**Trade-offs:**
- ✅ Efficient, captures majority of cross-reference patterns
- ❌ May miss isolated cross-references in low-connectivity Layer 3 docs
- Acceptable because: the formalization spec can do targeted scanning of specific docs during rollout
