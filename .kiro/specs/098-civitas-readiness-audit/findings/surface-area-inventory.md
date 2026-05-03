# Surface Area Inventory

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 1.2 — Produce surface area inventory
**Purpose**: Complete categorized inventory of the intelligence layer with dual-axis tagging

---

## Executive Summary

The intelligence layer consists of **86 steering documents**, **2 active MCP servers** (+ 1 conceptual), **8 AI agents** with 51 file:// steering doc references and 109 skills, **13 hook definitions** (12 enabled), **24 knowledge base definitions**, and **97+ specs** encoding institutional history.

Total token footprint of steering documentation: **~339,530 tokens**.

---

## 1. Steering Documents (86 documents)

### By Layer

| Layer | Name | Doc Count | Token Count | % of Total |
|-------|------|-----------|-------------|------------|
| 0 | Meta-Guide | 1 | 4,082 | 1.2% |
| 1 | Foundation | 7 | 9,450 | 2.8% |
| 2 | Frameworks and Patterns | 38 | 218,597 | 64.4% |
| 3 | Specific Implementations | 40 | 107,401 | 31.6% |

Layer 2 dominates both in count and token weight — it contains the governance frameworks, system principles, and process standards that define how the system operates.

### By Content Domain (Primary)

| Content Domain | Doc Count | Token Count | % of Docs | % of Tokens |
|----------------|-----------|-------------|-----------|-------------|
| Stemma | 29 | ~120,306 | 33.7% | 35.4% |
| Rosetta | 23 | ~113,695 | 26.7% | 33.5% |
| Process | 19 | ~105,476 | 22.1% | 31.1% |
| Integration | 13 | ~42,234 | 15.1% | 12.4% |
| Foundation | 7 | ~15,686 | 8.1% | 4.6% |

**Note on Rosetta weighting:** Using strict primary-domain classification, Rosetta is 23 docs (26.7%). Using Ada's broader classification that includes pipeline integration docs (DTCG-Integration-Guide, Figma-Workflow-Guide, MCP-Integration-Guide, Transformer-Development-Guide) as Rosetta-domain, the count rises to ~25 docs (~29%). The difference reflects the content-vs-infrastructure ambiguity for pipeline docs.

### By Maintainer

| Maintained By | Doc Count | Token Count | % of Docs |
|---------------|-----------|-------------|-----------|
| Lina (Stemma) | 26 | ~113,906 | 30.2% |
| Ada (Rosetta) | 20 | ~101,073 | 23.3% |
| Thurgood (Process) | 16 | ~103,225 | 18.6% |
| Shared (Cross-cutting) | 13 | ~25,966 | 15.1% |
| Peter (Foundation) | 6 | ~13,683 | 7.0% |
| Leonardo (Product/Integration) | 5 | ~19,798 | 5.8% |

**Ownership gap:** 13 docs (15.1%) are classified as "Shared" with no primary maintainer. These include MCP-Relationship-Model, MCP-Evolution-Roadmap, Platform-Resource-Map, platform-implementation-guidelines, Cross-Platform Decision Framework, Rosetta-Stemma-Systems-Overview, and BUILD-SYSTEM-SETUP. This is the governance gap the audit is investigating.

### Ambiguous Classifications (10 flagged)

Documents where the primary domain assignment required judgment:

1. **Component-Development-Guide** (L3, 18,196 tokens) — Stemma primary, Rosetta secondary. Largest single doc. Token selection framework sections are deeply Rosetta.
2. **Token-Governance** (L2, 6,799 tokens) — Rosetta primary, Process secondary. Token rules are Rosetta content; governance framework is Process.
3. **Test-Behavioral-Contract-Validation** (L2, 4,888 tokens) — Stemma primary, Process secondary. Validates Stemma contracts using Process methodology.
4. **Cross-Platform vs Platform-Specific Decision Framework** (L2, 2,996 tokens) — Integration primary, Stemma secondary.
5. **platform-implementation-guidelines** (L2, 6,447 tokens) — Integration primary, Stemma secondary.
6. **AI-Collaboration-Framework** (L2, 2,906 tokens) — Process primary, Foundation secondary.
7. **Component-MCP-Document-Template** (L2, 4,395 tokens) — Stemma primary, Integration secondary.
8. **Process-Integration-Methodology** (L2, 1,647 tokens) — Process primary, Integration secondary.
9. **BUILD-SYSTEM-SETUP** (L3, 2,048 tokens) — Process primary, Shared maintainer (crosses Ada/Lina domains).
10. **Rosetta-Stemma-Systems-Overview** (L1, 2,003 tokens) — Foundation primary, Shared maintainer (spans both named systems).

### Full Document Inventory

**Layer 0 — Meta-Guide (1 doc)**

| Document | Domain | Secondary | Maintainer | Tokens |
|----------|--------|-----------|------------|--------|
| 00-Steering Documentation Directional Priorities | Process | — | Thurgood | 4,082 |

**Layer 1 — Foundation (7 docs)**

| Document | Domain | Secondary | Maintainer | Tokens |
|----------|--------|-----------|------------|--------|
| Agent-Directory | Foundation | — | Peter | 1,615 |
| AI-Collaboration-Principles | Foundation | — | Peter | 707 |
| Core Goals | Foundation | — | Peter | 1,137 |
| Personal Note | Foundation | — | Peter | 622 |
| Rosetta-Stemma-Systems-Overview | Foundation | — | Shared | 2,003 |
| Spec-Feedback-Protocol | Process | — | Thurgood | 1,801 |
| Start Up Tasks | Process | — | Thurgood | 1,565 |

**Layer 2 — Frameworks and Patterns (38 docs)**

| Document | Domain | Secondary | Maintainer | Tokens |
|----------|--------|-----------|------------|--------|
| AI-Collaboration-Framework | Process | Foundation | Thurgood | 2,906 |
| Completion Documentation Guide | Process | — | Thurgood | 2,987 |
| Component-Development-Standards | Stemma | — | Lina | 9,502 |
| Component-Inheritance-Structures | Stemma | — | Lina | 6,553 |
| Component-MCP-Document-Template | Stemma | Integration | Lina | 4,395 |
| Component-Primitive-vs-Semantic-Philosophy | Stemma | — | Lina | 2,891 |
| Component-Quick-Reference | Stemma | — | Lina | 3,726 |
| Component-Readiness-Status | Stemma | — | Lina | 5,745 |
| Component-Schema-Format | Stemma | — | Lina | 2,894 |
| Component-Templates | Stemma | — | Lina | 8,442 |
| Contract-System-Reference | Stemma | — | Lina | 2,838 |
| Cross-Platform vs Platform-Specific Decision Framework | Integration | Stemma | Shared | 2,996 |
| DesignerPunk-Integration-Guide | Integration | — | Leonardo | 6,497 |
| DTCG-Integration-Guide | Rosetta | Integration | Ada | 4,001 |
| Figma-Workflow-Guide | Rosetta | Integration | Ada | 4,921 |
| MCP-Evolution-Roadmap | Integration | — | Shared | 2,816 |
| MCP-Integration-Guide | Integration | Rosetta | Leonardo | 2,835 |
| MCP-Relationship-Model | Integration | — | Shared | 2,715 |
| Platform-Resource-Map | Integration | — | Shared | 938 |
| platform-implementation-guidelines | Integration | Stemma | Shared | 6,447 |
| Process-Cross-Reference-Standards | Process | — | Thurgood | 6,469 |
| Process-Development-Workflow | Process | — | Thurgood | 4,020 |
| Process-File-Organization | Process | — | Thurgood | 7,121 |
| Process-Hook-Operations | Process | — | Thurgood | 10,652 |
| Process-Integration-Methodology | Process | Integration | Thurgood | 1,647 |
| Process-Spec-Planning | Process | — | Thurgood | 26,220 |
| Process-Task-Type-Definitions | Process | — | Thurgood | 4,390 |
| Product-Handoff-Protocol | Integration | Process | Leonardo | 2,492 |
| Release Management System | Process | — | Thurgood | 810 |
| Rosetta-System-Architecture | Rosetta | — | Ada | 7,952 |
| rosetta-system-principles | Rosetta | — | Ada | 5,172 |
| stemma-system-principles | Stemma | — | Lina | 8,506 |
| Test-Behavioral-Contract-Validation | Stemma | Process | Lina | 4,888 |
| Test-Development-Standards | Process | — | Thurgood | 16,607 |
| Test-Failure-Audit-Methodology | Process | — | Thurgood | 14,949 |
| Token-Governance | Rosetta | Process | Ada | 6,799 |
| Token-Quick-Reference | Rosetta | — | Ada | 4,906 |
| Token-Resolution-Patterns | Rosetta | — | Ada | 3,900 |
| Transformer-Development-Guide | Rosetta | Integration | Ada | 4,071 |

**Layer 3 — Specific Implementations (40 docs)**

| Document | Domain | Secondary | Maintainer | Tokens |
|----------|--------|-----------|------------|--------|
| A Vision of the Future | Foundation | — | Peter | 8,856 |
| Browser Distribution Guide | Integration | — | Leonardo | 4,414 |
| BUILD-SYSTEM-SETUP | Process | — | Shared | 2,048 |
| Component-Development-Guide | Stemma | Rosetta | Lina | 18,196 |
| Component-Family-Avatar | Stemma | — | Lina | 2,781 |
| Component-Family-Badge | Stemma | — | Lina | 4,146 |
| Component-Family-Button | Stemma | — | Lina | 6,851 |
| Component-Family-Chip | Stemma | — | Lina | 3,636 |
| Component-Family-Container | Stemma | — | Lina | 6,435 |
| Component-Family-Data-Display | Stemma | — | Lina | 1,203 |
| Component-Family-Divider | Stemma | — | Lina | 1,067 |
| Component-Family-Form-Inputs | Stemma | — | Lina | 12,771 |
| Component-Family-Icon | Stemma | — | Lina | 3,129 |
| Component-Family-Loading | Stemma | — | Lina | 1,138 |
| Component-Family-Modal | Stemma | — | Lina | 1,297 |
| Component-Family-Navigation | Stemma | — | Lina | 3,286 |
| Component-Family-Progress | Stemma | — | Lina | 5,046 |
| Component-Meta-Data-Shapes-Governance | Stemma | Process | Lina | 1,382 |
| component-meta-authoring-guide | Stemma | — | Lina | 2,434 |
| component-metadata-schema-reference | Stemma | Integration | Lina | 2,400 |
| component-mcp-query-guide | Integration | Stemma | Leonardo | 3,460 |
| Layout-Specification-Vocabulary | Integration | Rosetta | Leonardo | 6,614 |
| Technology Stack | Foundation | — | Peter | 746 |
| Token-Family-Accessibility | Rosetta | — | Ada | 5,034 |
| Token-Family-Blend | Rosetta | — | Ada | 4,072 |
| Token-Family-Blur | Rosetta | — | Ada | 1,314 |
| Token-Family-Border | Rosetta | — | Ada | 3,675 |
| Token-Family-Color | Rosetta | — | Ada | 7,126 |
| Token-Family-Glow | Rosetta | — | Ada | 3,958 |
| Token-Family-Layering | Rosetta | — | Ada | 5,182 |
| Token-Family-Motion | Rosetta | — | Ada | 5,903 |
| Token-Family-Opacity | Rosetta | — | Ada | 4,567 |
| Token-Family-Radius | Rosetta | — | Ada | 3,566 |
| Token-Family-Responsive | Rosetta | — | Ada | 5,364 |
| Token-Family-Shadow | Rosetta | — | Ada | 6,647 |
| Token-Family-Sizing | Rosetta | — | Ada | 1,052 |
| Token-Family-Spacing | Rosetta | — | Ada | 6,485 |
| Token-Family-Typography | Rosetta | — | Ada | 4,925 |
| Token-Semantic-Structure | Rosetta | — | Ada | 9,103 |

---

## 2. MCP Servers

| MCP Server | Status | Tools | Content Scope | Key Metrics |
|------------|--------|-------|---------------|-------------|
| **Docs MCP** (`designerpunk-docs`) | 🟢 Healthy | 8 | Steering docs, token docs, architecture guides, governance, process standards | 86 docs, 2,753 sections, 332 cross-references, 1.7 MB index |
| **Application MCP** (`designerpunk-components`) | 🟢 Healthy | 16 | Component catalog + metadata, experience patterns, prop guidance, assembly validation, layout templates, **token metadata** (search, details, families, consumers) | 34 components, 9 patterns, 9 guidance families, 4 layout templates, 437 tokens (217 primitive + 193 semantic + 27 component) |
| **Product MCP** | 🔴 Conceptual | TBD | Brand tokens, user personas, business rules, product primitives, content standards, screen inventory | Not implemented — Spec 081 design, Spec 096 infrastructure, Spec 097 intelligence layer |

**Note:** The Application MCP serves dual roles — component metadata AND token metadata. This is relevant for agent ownership analysis: token query tools (search_tokens, get_token_details, get_token_family, get_token_consumers) are in Ada's content domain but served by infrastructure that Lina's component schemas also depend on.

**MCP Access by Agent:**

| Agent | Docs MCP | Application MCP | Product MCP |
|-------|----------|-----------------|-------------|
| Ada | ✅ | ❌ | ❌ |
| Lina | ✅ | ❌ (via JSON config) | ❌ |
| Thurgood | ✅ | ✅ | ❌ |
| Leonardo | ✅ | ✅ | ✅ (future) |
| Stacy | ✅ | ✅ | ✅ (future) |
| Data | ✅ | ✅ | ❌ |
| Sparky | ✅ | ✅ | ❌ |
| Kenya | ✅ | ✅ | ❌ |

---

## 3. Agent Configurations (8 agents)

| Agent | Tier | Steering Docs (file://) | Skills | JSON-Config KBs | CLI KBs | MCP Access |
|-------|------|------------------------|--------|-----------------|---------|------------|
| Ada | System | 7 | 16 | 3 | 0 | Docs |
| Lina | System | 8 | 24 | 1 | 1 | Docs |
| Thurgood | System | 9 | 9 | 0 | 3 | Docs, Application |
| Leonardo | Product | 4 | 15 | 0 | 3 | Docs, Application, Product |
| Stacy | Product | 4 | 10 | 0 | 2 | Docs, Application, Product |
| Data | Product | 6 | 12 | 0 | 3 | Docs, Application |
| Sparky | Product | 7 | 12 | 0 | 3 | Docs, Application |
| Kenya | Product | 6 | 11 | 0 | 3 | Docs, Application |

**Totals:** 51 file:// steering doc references, 109 skills, 4 JSON-config KBs, 20 CLI KBs = **24 total KB definitions**.

---

## 4. Hook Definitions (13 hooks + 5 shell scripts)

### Agent Hooks (12 enabled, 1 disabled)

| Hook | Agent Domain | Trigger | Enabled |
|------|-------------|---------|---------|
| Ada: Token Health Check | Rosetta | userTriggered | ✅ |
| Ada: Platform Parity Check | Rosetta | userTriggered | ✅ |
| Ada: Token Coverage Report | Rosetta | userTriggered | ✅ |
| Ada: Token Compliance Scan | Rosetta | userTriggered | ✅ |
| Lina: Platform Parity Check | Stemma | userTriggered | ✅ |
| Lina: Component Scaffold Validation | Stemma | userTriggered | ✅ |
| Lina: Component Token Audit | Stemma | userTriggered | ✅ |
| Lina: Stemma Compliance Check | Stemma | userTriggered | ✅ |
| Thurgood: Accessibility Test Coverage Audit | Process | userTriggered | ✅ |
| Thurgood: Spec Quality Scan | Process | userTriggered | ✅ |
| Thurgood: Test Suite Health Audit | Process | userTriggered | ✅ |
| Manual Release Detection | Process | manual | ✅ |
| Auto-Organize Files After Task Completion | Process | fileEdited | ❌ |

### Shell Scripts (5)

| Script | Purpose |
|--------|---------|
| commit-task.sh | Commit + push + release analysis |
| release-manager.sh | Manual release analysis trigger |
| organize-by-metadata.sh | File organization by metadata |
| commit-task-organized.sh | Commit with file organization |
| task-completion-commit.sh | Legacy commit script |

---

## 5. Knowledge Bases (24 definitions)

### By Agent

| Agent | KB Count | Scope |
|-------|----------|-------|
| Ada | 3 (JSON) | Token source, validators, generators |
| Lina | 2 (1 JSON + 1 CLI) | Component source, Application MCP source |
| Thurgood | 3 (CLI) | Test infrastructure, MCP tests, component tests |
| Leonardo | 3 (CLI) | Spec history, experience patterns, layout templates |
| Stacy | 2 (CLI) | Completion docs, spec summaries |
| Sparky | 3 (CLI) | Web components, web tests, semantic tokens |
| Kenya | 4 (CLI) | iOS components, iOS tests, semantic tokens, iOS platform tokens |
| Data | 4 (CLI) | Android components, Android tests, semantic tokens, Android platform tokens |

---

## 6. Spec Infrastructure (summary level)

- **97+ specs** in `.kiro/specs/` encoding institutional decisions
- **Spec workflow**: design outline → feedback → requirements → design → tasks → execution
- **Feedback protocol**: Spec-Feedback-Protocol.md (L1, always loaded)
- **Formalization process**: Thurgood-led, sequential gates with human approval
- **Completion documentation**: Two-document workflow (detailed + summary)
- **Release detection**: Summary docs in `docs/specs/` trigger release analysis
- **Task type system**: Setup / Implementation / Architecture / Documentation with three validation tiers

---

## 7. Cross-Cutting Observations

### The Content-vs-Infrastructure Distinction

The dual-axis tagging reveals a clear pattern: **content ownership is well-distributed but infrastructure ownership is not.**

- Ada owns 20 docs' content (Rosetta). Lina owns 26 docs' content (Stemma). Thurgood owns 16 docs' content (Process).
- But **all 86 docs** are served by the same infrastructure (Docs MCP), governed by the same processes (metadata schema, cross-reference standards, conditional loading), and maintained through the same workflows (ballot measure model, spec-driven updates).
- Nobody owns the infrastructure layer itself. The 13 "Shared" docs are the most visible symptom, but the gap extends to MCP health, metadata governance, cross-reference maintenance, and steering doc lifecycle management.

### The "Shared" Maintainer Problem

13 docs (15.1%) have no primary maintainer. These are cross-cutting docs that span domains:
- MCP-Relationship-Model, MCP-Evolution-Roadmap, Platform-Resource-Map (MCP infrastructure)
- platform-implementation-guidelines, Cross-Platform Decision Framework (cross-platform governance)
- Rosetta-Stemma-Systems-Overview (architectural overview)
- BUILD-SYSTEM-SETUP (build infrastructure)
- Process-Integration-Methodology (integration process)

These docs are the most likely to become stale because no agent has primary accountability for their accuracy.

### Application MCP Dual Role

The Application MCP serves both component metadata (Lina's domain) and token metadata (Ada's domain). This creates a shared infrastructure dependency that neither agent owns. If the token index drifts from steering doc content, neither Ada (who doesn't have Application MCP access) nor Lina (who owns component schemas, not token queries) is positioned to catch it.
