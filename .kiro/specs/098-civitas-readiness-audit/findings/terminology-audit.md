# Terminology Audit

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 2.1 — Terminology audit
**Purpose**: Scan all steering docs and agent files for how the intelligence layer is currently referenced; estimate naming rollout blast radius

---

## Summary

The intelligence layer has no collective noun. It is referenced through **5 distinct term families** across 86 steering docs and 8 agent configurations. The most common term is "steering doc/document" (35 matches in 16 files). The term "intelligence layer" appears **zero times** in steering docs — it exists only in specs 097 and 098 (this audit). The Rosetta+Stemma paired reference count is **30 matches in 6 steering docs**, all of which would need updating to acknowledge Civitas as a third named system.

---

## Term Families

### 1. "Steering doc/document" — The dominant term

| Location | Matches | Files |
|----------|---------|-------|
| Steering docs | 35 | 16 |
| Agent prompts | ~30 (subset of 98 total governance terms) | 8 |
| Agent JSON configs | 160 (steeringDocs array references) | 8 |

**Assessment:** This is the most concrete and widely used term. It refers specifically to `.kiro/steering/*.md` files. After Civitas adoption, "steering doc" should **remain specific** — it describes a specific artifact type within Civitas, not the layer itself. Replacing "steering doc" with "Civitas doc" would lose precision.

### 2. "MCP server/system/documentation server" — Infrastructure references

| Location | Matches | Files |
|----------|---------|-------|
| Steering docs | 28 | 12 |
| Agent prompts | ~20 (subset of 98 total) | 8 |

**Top files:** DesignerPunk-Integration-Guide (8), Component-Development-Standards (3), component-mcp-query-guide (2), MCP-Integration-Guide (2), MCP-Evolution-Roadmap (2)

**Assessment:** These terms refer to specific MCP servers (Docs MCP, Application MCP). They should **remain specific** after Civitas adoption. "The Civitas MCP" would be ambiguous — there are multiple MCP servers serving different content.

### 3. "Governance" — Process references

| Location | Matches | Files |
|----------|---------|-------|
| Steering docs (governance infrastructure/layer/core/system) | 1 | 1 |
| Steering docs (documentation governance) | 0 | 0 |
| Agent prompts (governance + documentation governance) | ~25 (subset of 98 total) | 8 |

**Assessment:** "Governance" is used primarily in agent prompts to describe the ballot measure model and domain boundaries. The term is generic — it describes a function, not a layer. Civitas would provide a proper noun for what "governance" currently describes loosely.

### 4. "Intelligence layer" — Absent from steering docs

| Location | Matches | Files |
|----------|---------|-------|
| Steering docs | 0 | 0 |
| Spec 097 (Product MCP Intelligence Layer) | 7 | 5 |
| Spec 098 (this audit) | 28 | 6 |
| component-mcp-query-guide | 1 | 1 |

**Assessment:** The term "intelligence layer" is essentially a spec-097/098 invention. It does not exist in the steering documentation vocabulary. This means Civitas would be introducing a new concept, not renaming an existing one. The formalization spec needs to define what "the Civitas layer" means from scratch — there's no existing term to replace.

### 5. "Knowledge layer/base/system" — Scattered references

| Location | Matches | Files |
|----------|---------|-------|
| Steering docs | 10 | 4 |

**Top files:** Platform-Resource-Map (4), DesignerPunk-Integration-Guide (3), Process-Development-Workflow (2), MCP-Evolution-Roadmap (1)

**Assessment:** "Knowledge base" refers to the `/knowledge` CLI tool's indexed content. "Knowledge layer" is used loosely in a few docs. These should **remain specific** — they describe a specific infrastructure component, not the governance layer.

---

## Rosetta + Stemma Paired References

| File | Matches | Context |
|------|---------|---------|
| Rosetta-Stemma-Systems-Overview.md | 9 | Architectural overview of both systems |
| rosetta-system-principles.md | 7 | References Stemma as sibling system |
| stemma-system-principles.md | 7 | References Rosetta as sibling system |
| 00-Steering Documentation Directional Priorities.md | 4 | Meta-guide describing both systems |
| MCP-Relationship-Model.md | 2 | MCP boundaries for both systems |
| Component-Primitive-vs-Semantic-Philosophy.md | 1 | Compares token vs component philosophy |

**Total: 30 matches in 6 steering docs.**

**Agent prompts: 0 matches.** Agent prompts reference Rosetta and Stemma individually but never as a paired "Rosetta + Stemma" construction. This means agent prompts don't need "two-system → three-system" updates — they need Civitas added as a new concept alongside existing Rosetta/Stemma references.

---

## Blast Radius Estimate

### Steering Docs Requiring Updates

| Update Type | Doc Count | Estimated Changes |
|-------------|-----------|-------------------|
| Rosetta+Stemma paired references → add Civitas | 6 | ~30 text changes |
| "Steering doc" references that should mention Civitas context | 0 | None — "steering doc" remains specific |
| MCP references that should mention Civitas context | 0 | None — MCP names remain specific |
| New Civitas definition/context needed | 3-5 | Rosetta-Stemma-Systems-Overview, Core Goals, Agent-Directory, meta-guide, possibly MCP-Relationship-Model |

### Agent Files Requiring Updates

| Update Type | File Count | Estimated Changes |
|-------------|------------|-------------------|
| Agent prompts — add Civitas as third named system | 8 | ~8-16 additions (1-2 per prompt) |
| Agent JSON configs — no changes needed | 0 | steeringDocs arrays reference file paths, not system names |

### Total Estimated Blast Radius

- **~6 steering docs** with Rosetta+Stemma paired reference updates (~30 text changes)
- **~3-5 steering docs** needing new Civitas definition/context
- **~8 agent prompts** needing Civitas additions
- **0 agent JSON configs** needing changes
- **1 new steering doc** (Civitas definition document)

**Estimated total: 17-19 files, ~50-60 text changes.** This is a manageable rollout — significantly smaller than the 063 contract migration (28 component files + 14 schema files + governance docs).

---

## Classification: Where Civitas Would Add Clarity vs. Where Specific Terms Should Remain

### Would benefit from collective noun (Civitas)

- Architectural overviews that describe "the system" without naming the governance layer
- Agent Directory descriptions of what agents interact with
- Core Goals references to "development practices" that are actually Civitas infrastructure
- Any new documentation about the governance layer itself

### Should remain specific (not replaced by Civitas)

- "Steering doc" — specific artifact type within Civitas
- "MCP server" / "Docs MCP" / "Application MCP" — specific infrastructure components
- "Knowledge base" — specific tool (`/knowledge` CLI)
- "Hook" — specific automation mechanism
- "Spec workflow" — specific process within Civitas
- "Ballot measure model" — specific governance process within Civitas

### Key Insight

Civitas is an **umbrella term**, not a replacement term. It names the layer that contains steering docs, MCP servers, agent configurations, hooks, knowledge bases, and governance processes. None of those specific terms should be replaced — they should be contextualized as "part of Civitas."
