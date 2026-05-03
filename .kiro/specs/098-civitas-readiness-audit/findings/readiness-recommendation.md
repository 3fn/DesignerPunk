# Readiness Recommendation

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 4.2 — Readiness recommendation
**Purpose**: Synthesize all findings into a go/no-go recommendation for the Civitas formalization spec

---

## Verdict: Conditional Go

**Proceed with the Civitas formalization spec, with two conditions:**

1. **Peter decides the agent model** (Option A: new agent, or Option B: expand Thurgood) before the formalization spec begins. The formalization spec's scope depends on this decision — a new agent requires prompt writing, Agent Directory restructuring, and MCP access configuration that expanding Thurgood does not.

2. **The formalization spec scopes governance tooling activation separately from the naming rollout.** The naming rollout (terminology changes, Rosetta+Stemma paired reference updates, new Civitas definition doc) is bounded and estimable. Governance tooling activation (integrating dormant scripts into workflows, establishing monitoring processes, building enforcement for unowned responsibilities) is larger and less bounded. These should be separate tasks within the spec, with the naming rollout completable independently.

---

## Evidence Summary by Dimension

### Dimension 1: Surface Area — Well Understood

The intelligence layer consists of 86 steering docs, 2 active MCP servers, 8 agents, 13 hooks, 24 knowledge bases, and 97+ specs. The dual-axis tagging (content domain × infrastructure role) reveals a clear pattern: content ownership is distributed (Ada 20 docs, Lina 26, Thurgood 16) but infrastructure ownership is not (13 docs have no primary maintainer, MCP health/drift/prompt currency have no owner).

**Implication:** The surface area is well-enough understood to define Civitas boundaries. The boundary is: Civitas owns the infrastructure that serves, governs, and maintains the steering documentation layer — not the content within it.

### Dimension 2: Terminology — Manageable Blast Radius

"Intelligence layer" appears zero times in existing steering docs. Civitas introduces a new concept, not renames an existing one. 30 Rosetta+Stemma paired references in 6 docs need updating. Estimated total blast radius: 17-19 files, ~50-60 text changes. Civitas is an umbrella term — specific terms (steering doc, MCP server, hook) remain.

**Implication:** The naming rollout is bounded and manageable. Significantly smaller than the 063 contract migration (28 component files + 14 schema files).

### Dimension 3: Staleness — Metadata Governance Gap, Not Age

No docs are genuinely >6 months old. The staleness problem is metadata governance: 12 docs (14%) have missing or invalid `Last Reviewed` fields. Process docs are most vulnerable to staleness (21% stale-and-inaccurate). The staleness detection script works but is dormant and needs enhancement.

**Implication:** The formalization spec should establish metadata enforcement on doc creation/modification as a priority governance process.

### Dimension 4: Governance Gaps — The Dormancy Pattern

88 governance expectations identified. 42% have active automated enforcement. 23% have no enforcement at all. The dominant finding is the **dormancy pattern**: governance tooling is built during specs and abandoned after completion. 13 scripts, a quarterly review process, cross-reference validators, and audit scripts all exist but are dormant. Root cause: no ownership of governance infrastructure itself.

**Implication:** The formalization spec should focus on activating existing tooling rather than building new tooling. The Civitas agent's (or expanded Thurgood's) primary job is preventing dormancy — ensuring governance tooling stays active after the spec that created it completes.

### Dimension 5: Agent Ownership — 10 Unowned Responsibilities

10 governance responsibilities have no primary owner. Model A (infrastructure steward) is the viable ownership model — it creates a clean boundary between content ownership (domain agents) and infrastructure ownership (Civitas). Two potential Thurgood boundary overlaps are resolvable. Evidence supports Option A (new agent) or Option B (expand Thurgood); Option C (distributed) doesn't address the root cause.

**Implication:** The agent decision is the formalization spec's most consequential design choice. It should be made before the spec begins, not during it.

---

## The Schema-Equivalent Question

**Question:** Does Civitas have a unifying artifact format (like Rosetta's token definitions or Stemma's component schemas), or is it a governance umbrella over heterogeneous artifacts?

**Answer: Civitas is a governance umbrella over heterogeneous artifacts.** This is answerable from the audit evidence.

The intelligence layer consists of:
- Markdown files with YAML frontmatter (steering docs)
- JSON configuration files (agent configs)
- Shell scripts and hook definitions (automation)
- Markdown files without frontmatter (agent prompts)
- TypeScript source files (validators, MCP servers)
- Indexed knowledge bases (various formats)

There is no shared schema, no common format, no unifying artifact type. Rosetta has token definition files with mathematical formulas. Stemma has component schemas with behavioral contracts. Civitas has... markdown files, JSON configs, shell scripts, and TypeScript validators. These are different formats serving different purposes.

**Does the naming parallel still hold?** Yes, but with an important qualification. Rosetta and Stemma are **architectural systems** — they have distinct data models, APIs, and validation pipelines. Civitas is a **governance system** — it has processes, standards, and tooling but no unified data model. The naming parallel holds because all three are named layers of the DesignerPunk ecosystem, but Civitas is architecturally different from its siblings.

This is not a problem. It's an honest description. The formalization spec should acknowledge this difference rather than forcing false symmetry. Civitas is the governance layer — it governs how Rosetta and Stemma operate, how agents collaborate, and how institutional knowledge is preserved. That's a coherent identity even without a unified artifact format.

---

## Formalization Spec Scope Estimate

### Concrete Dimensions

| Work Area | Estimated Scope | Precedent |
|-----------|----------------|-----------|
| **Civitas definition document** | 1 new steering doc (~3,000-5,000 tokens) | Rosetta-Stemma-Systems-Overview is 2,003 tokens |
| **Terminology rollout** | ~50-60 text changes across 17-19 files | 063 contract migration was 28 files + 14 schemas |
| **Agent Directory update** | 1 file, ~20-30 lines added | Spec 070 restructured Agent Directory |
| **Agent prompt updates** | 8 files, ~1-2 additions each | Spec 078 updated Lina's prompt |
| **Rosetta-Stemma-Systems-Overview restructure** | 1 file, significant restructure (two-system → three-system) | Currently 2,003 tokens, would grow to ~3,000 |
| **Agent creation (if Option A)** | 1 JSON config + 1 prompt file (~15,000-20,000 tokens) | Existing agent prompts range 13,000-20,000 tokens |
| **Governance process establishment** | 3-5 new processes (metadata enforcement, MCP monitoring, prompt currency, doc lifecycle, tooling adoption) | Spec 020 established 6 processes |
| **Dormant tooling activation** | Assess 13 scripts for relevance, integrate viable ones into workflows | New work — no direct precedent |

### Estimated Task Count

- **Naming rollout:** 2-3 parent tasks (definition doc, terminology changes, agent updates)
- **Agent creation (if Option A):** 1 parent task (config, prompt, Agent Directory, MCP access)
- **Governance process establishment:** 2-3 parent tasks (metadata enforcement, monitoring processes, tooling activation)
- **Total: 5-7 parent tasks, ~15-25 subtasks**

This is comparable to spec 063 (3 parent tasks, 11 subtasks) but broader in scope because it touches more file types (steering docs, agent configs, agent prompts, scripts) rather than a single artifact type (contracts.yaml).

### What Should NOT Be in the Formalization Spec

- Writing new enforcement tests for the 20 missing governance expectations — that's domain agent work (Ada, Lina, Thurgood)
- Fixing stale-and-inaccurate docs — that's domain agent work triggered by Civitas flagging
- Expanding cross-platform consistency tests beyond Form Inputs — that's Lina's domain
- CI/CD integration for audit scripts — that's infrastructure work that could be a follow-up spec

---

## Blocking Issues

**None identified.** The audit found no issues that must be resolved before the formalization spec can begin. The dormant tooling, metadata gaps, and process gaps are all issues the formalization spec itself would address.

The one prerequisite is Peter's decision on the agent model (Option A vs. Option B). This is a design input, not a blocking issue.

---

## Risk Assessment for Formalization

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Scope expansion (063 precedent) | Medium | Medium | Separate naming rollout from governance activation; naming is bounded, governance is not |
| Terminology rollout breaks cross-references | Low | Low | Cross-references use file paths, not system names; run validation scripts before/after |
| Agent boundary confusion (Thurgood overlap) | Low | Medium | Explicit boundary definition: Thurgood defines standards, Civitas maintains infrastructure |
| Dormant tooling is stale/superseded | Medium | Low | Assess each script's relevance before integrating; replace with MCP equivalents where appropriate |
| Governance enforcement spec needed (078 precedent) | Medium | Medium | Assess enforcement mechanisms during formalization, not after; learn from 063→078 gap |

---

## Summary

The intelligence layer is well-understood, the naming rollout is manageable, and the governance gaps are real but addressable. The dormancy pattern — governance tooling built and abandoned — is the central finding, and it points clearly toward dedicated ownership as the solution. The Civitas name is earned: the layer has a coherent identity as the governance system that binds Rosetta, Stemma, and the agent ecosystem together.

Proceed with formalization.
