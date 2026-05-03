# Civitas Readiness Audit

**Date**: 2026-05-03
**Purpose**: Audit the intelligence layer surface area, name it Civitas, assess readiness for formal governance, and determine whether a dedicated agent is warranted
**Organization**: spec-guide
**Scope**: 098-civitas-readiness-audit
**Status**: Design outline — pending review

---

## Problem Statement

DesignerPunk's two named systems — Rosetta (tokens) and Stemma (components) — have clear architectural boundaries, dedicated agents, and formal governance. The third layer — the intelligence infrastructure that governs how the entire system operates — has none of these.

This layer consists of:
- **86 steering documents** across 4 layers (meta-guide, foundation, frameworks, implementations)
- **8 AI agents** (3 system, 5 product) with JSON configurations and prompt files
- **3 MCP servers** (Docs, Application/Component, Product) serving structured knowledge
- **14+ hook definitions** for automation (file organization, release detection, compliance checks)
- **Per-agent knowledge bases** (spec 087) with domain-scoped search
- **97+ specs** encoding institutional decisions and implementation history
- **Spec workflows** (feedback protocol, formalization gates, completion documentation)

Today this layer is referred to inconsistently — "steering docs," "intelligence layers," "governance infrastructure," "the MCP system" — depending on which piece is being discussed. No collective noun exists. No agent owns it. No document defines its boundary.

### Why This Matters Now

1. **The portfolio site** (DraftFP01) references "AI intelligence layers" as a named feature. If we're presenting this publicly, it needs a coherent identity.

2. **The Agent Directory** shows a governance gap. MCP server health, documentation architecture, and steering doc maintenance have no primary owner. These responsibilities are distributed across agents without clear accountability.

3. **The Stemma precedent** (specs 062 → 063 → 078) demonstrated that naming and formalizing a subsystem reveals hidden scope. The contract system audit found 4 incompatible formats, 108 naming inconsistencies, and a governance enforcement gap — none of which were visible before the audit. We should expect similar findings here.

4. **Documentation staleness** is a recurring concern. Steering docs have `Last Reviewed` dates ranging from December 2025 to April 2026. Prior specs (020, 036) built governance tooling — including `scripts/detect-stale-metadata.js` and review process documentation — but it's unclear whether this tooling is actively used or has drifted from current practice. The gap may be adoption, not absence.

---

## Objectives

1. **Name the layer**: Formally adopt "Civitas" as the name for the intelligence/governance layer, paralleling Rosetta (tokens) and Stemma (components).

2. **Inventory the surface area**: Produce a complete, categorized inventory of everything that constitutes Civitas — steering docs, MCP servers, agent configurations, hooks, knowledge bases, spec workflows, and governance processes.

3. **Assess consistency**: Identify terminology inconsistencies, documentation gaps, stale references, and governance blind spots across the layer.

4. **Evaluate agent ownership**: Determine whether a dedicated Civitas agent is warranted, and if so, define its domain boundaries, responsibilities, and relationship to existing agents.

5. **Produce a readiness recommendation**: Recommend whether to proceed directly to a Civitas formalization spec (naming rollout + agent creation) or whether intermediate work is needed first.

---

## Scope

### In Scope

- Complete inventory of Civitas surface area (steering docs, MCPs, agents, hooks, KBs, specs, workflows)
- Prior audit findings inventory: consume relevant findings from specs 020, 032, 033, 036 as inputs rather than re-deriving them
- Terminology audit: how the layer is currently referenced across all steering docs and agent prompts
- Staleness assessment: which docs are outdated, which have never been reviewed, distinguishing stale-but-stable from stale-and-inaccurate
- Governance gap analysis: what processes and enforcement mechanisms exist vs. what's missing
- Agent ownership analysis: current distribution of governance responsibilities across agents, with options and trade-offs
- Readiness recommendation for formalization spec

**Note on scope weight:** The surface area here (86 docs, 3 MCPs, 8 agents, 14+ hooks) is significantly larger than the 062 Stemma audit (28 components). This is a medium-weight audit, not a lightweight one. Each dimension should have explicit "good enough" thresholds to prevent scope creep into exhaustive analysis.

### Out of Scope

- Actually renaming anything (that's the formalization spec)
- Creating the Civitas agent (that's the formalization spec)
- Updating steering docs or agent prompts (that's the formalization spec)
- MCP server code changes
- Token or component work

---

## Audit Dimensions

### Dimension 1: Surface Area Inventory

Produce a categorized inventory of every artifact that constitutes the intelligence layer.

**Dual-axis categorization:** Each artifact should be tagged along two axes to distinguish content ownership from infrastructure ownership — this prevents Civitas from becoming a grab-bag that absorbs domain content.

- **Content domain axis**: Rosetta (token docs), Stemma (component docs), Process (workflow/governance docs), Integration (cross-system docs)
- **Infrastructure role axis**: Which MCP serves it, which process governs it, which agent maintains it

**Categories:**
- Steering documents (by layer: 0-3, by content domain, by infrastructure role)
- MCP servers (Docs, Application, Product) with tool counts and content scope
- Agent configurations (JSON configs, prompt files, knowledge bases)
- Hook definitions (agent hooks, shell scripts, automation)
- Spec infrastructure (spec workflow, feedback protocol, completion documentation system)
- Cross-cutting governance (ballot measure model, agent directory, collaboration framework)

**Note:** Token docs represent ~23% of steering doc surface area (20 of 86 docs) — the largest single domain cluster. This weighting will disproportionately influence staleness and consistency findings and should be accounted for in analysis.

**Deliverable:** `findings/surface-area-inventory.md`

### Dimension 2: Terminology Audit

Scan all steering docs and agent prompts for how the intelligence layer is currently referenced.

**Questions:**
- What terms are used? ("steering docs," "intelligence layers," "governance infrastructure," "MCP system," etc.)
- How consistently are they used?
- Are there places where a collective noun would reduce ambiguity?
- Are there places where specific terms (e.g., "steering docs") should remain specific even after Civitas is adopted?
- How many "Rosetta + Stemma" paired references exist that would need to become "Rosetta + Stemma + Civitas" (or a collective noun)?
- How many "two-system" framing instances exist across steering docs and agent prompts?

The paired reference count and two-system framing instances give the formalization spec a concrete blast radius estimate for the naming rollout.

**Deliverable:** `findings/terminology-audit.md`

### Dimension 3: Staleness Assessment

Evaluate the currency of steering documentation, building on existing tooling rather than re-inventing it.

**Existing infrastructure:** Spec 020 built `scripts/detect-stale-metadata.js` with 6-month warning and 12-month error thresholds. This audit should run that script first, then layer additional analysis on top.

**Key distinction — stale-but-stable vs. stale-and-inaccurate:** A doc with a 6-month-old `Last Reviewed` date whose domain hasn't changed (no relevant specs since last review) is stale-but-stable. A doc whose domain has been modified by recent specs but whose content hasn't been updated is stale-and-inaccurate. The audit should cross-reference `Last Reviewed` dates against the spec log to distinguish these cases.

**Questions:**
- Which docs are stale-and-inaccurate (domain changed since last review)?
- Which docs are stale-but-stable (no domain changes since last review)?
- Which docs have never been reviewed (no `Last Reviewed` field)?
- Which docs reference specs, processes, or patterns that have since changed?
- Is there a correlation between staleness and content domain? (e.g., are process docs more current than token docs?)
- Is the existing staleness detection script (`scripts/detect-stale-metadata.js`) actively used? When was it last run?

**Deliverable:** `findings/staleness-assessment.md`

### Dimension 4: Governance Gap Analysis

Identify what governance processes and enforcement mechanisms exist vs. what's missing. This dimension has three sub-areas:

**4a. Prior governance tooling inventory:** Before assessing gaps, inventory what already exists. Specs 020, 032, 033, and 036 built governance tooling and produced findings about steering documentation. This audit should consume those as inputs. The distinction between "what exists and isn't being used" and "what doesn't exist at all" is critical for the readiness recommendation.

**4b. Enforcement mechanism inventory:** For each governance expectation, document what enforcement mechanism exists (automated check, process check, or nothing), when it last fired, and whether it's active or dormant. The 062→078 lesson: building a system and enforcing its use are different problems.

Deliverable format for 4b:

| Governance Expectation | Enforcement Mechanism | Last Known Trigger | Status |
|------------------------|----------------------|-------------------|--------|
| Steering docs have metadata | ? | ? | ? |
| Contracts authored before implementation | contract-existence-validation.test.ts | Spec 078 | Active |
| ... | ... | ... | ... |

**4c. Cross-reference fragility:** Civitas formalization will rename or relabel things across 86 docs. Assess the blast radius:
- How many cross-references exist between steering docs? (queryable via docs MCP `list_cross_references`)
- How are cross-references maintained today? (systematically or ad hoc?)
- What's the estimated update count for a terminology change?
- Is the current tooling (docs MCP cross-reference tracking) sufficient to manage a rollout?

**Questions (general):**
- Is there a defined lifecycle for steering docs? (creation → review → update → deprecation)
- Is there a process for MCP server health monitoring?
- Is there a process for detecting when agent prompts drift from steering doc standards?
- Is there a process for identifying when a new steering doc is needed?
- What happens when a steering doc contradicts another?

**Deliverable:** `findings/governance-gaps.md`

### Dimension 5: Agent Ownership Analysis

Map current governance responsibilities to agents and identify gaps. Produce options with trade-offs — not a recommended agent design. The formalization spec, with Peter's input, makes the design decision.

**Questions:**
- Which agent currently handles documentation quality concerns? (Answer: nobody primarily)
- Which agent monitors MCP server accuracy? (Answer: nobody primarily)
- Which agent ensures steering docs stay current? (Answer: nobody primarily)

**Ownership model evaluation:** Assess two models for how a Civitas agent (or expanded existing agent) would relate to domain agents:
- **Model A: Infrastructure steward (librarian)** — Owns health, metadata, staleness monitoring, cross-reference integrity. Does NOT own content accuracy. Ada still owns whether Token-Family-Color.md is correct; Civitas owns whether it has valid metadata, current cross-references, and a recent review date.
- **Model B: Documentation authority** — Owns content accuracy across all steering docs. Problematic because it duplicates domain expertise (Civitas would need to understand tokens to review token docs).

**Boundary conflict matrix:** Map every governance responsibility to its current owner AND the proposed Civitas owner, highlighting overlaps. The question isn't just "would a new agent help" — it's "where specifically would new boundaries create more coordination overhead than the current distributed model?"

**Options to evaluate:**
- Option A: New dedicated Civitas agent (trade-offs: clear ownership vs. coordination overhead)
- Option B: Expand Thurgood's scope to include documentation governance (trade-offs: natural fit vs. scope overload)
- Option C: Distributed ownership with explicit assignments in Agent Directory (trade-offs: no new agent vs. no single point of accountability)

**Deliverable:** `findings/agent-ownership-analysis.md`

### Dimension 6: Readiness Recommendation

Synthesize findings into a go/no-go recommendation for the formalization spec.

**Questions:**
- Is the surface area well-enough understood to define Civitas boundaries?
- Are there blocking issues that need resolution before naming rollout?
- What's the estimated scope of the formalization spec? (Informed by Stemma precedent)
- Should the agent be created in the formalization spec or deferred?
- Does Civitas have a unifying artifact format (the way Rosetta has token definitions and Stemma has component schemas), or is it a governance umbrella over heterogeneous artifacts? If the latter, does the Rosetta/Stemma naming parallel still hold, or should the naming acknowledge that Civitas is architecturally different from its siblings?

**Deliverable:** `findings/readiness-recommendation.md`

---

## Precedent: Stemma Contract System (062 → 063 → 078)

This audit is modeled on Spec 062 (Stemma Catalog Readiness Audit), which preceded the contract system formalization. Key lessons from that chain:

### What Worked

- **Audit-first approach** prevented scope surprises during formalization. The 062 audit discovered 4 incompatible formats and 108 naming inconsistencies that would have derailed a direct formalization attempt.
- **Findings documents** provided a shared evidence base that all agents could reference during formalization.
- **Readiness recommendation** gave Peter a clear decision point before committing to the larger spec.

### What We Should Watch For

- **Scope expansion**: 063 grew from "standardize the format" to "migrate 28 components + formalize inheritance + deprecate standard library + governance updates." The audit should surface this kind of hidden scope early.
- **Governance enforcement gap**: Even after 063 built the uniform system, 078 was needed because the workflow didn't enforce using it. We should assess enforcement mechanisms during the audit, not after.
- **Existence ≠ adoption**: The 062 audit discovered that the standard contracts library (16 abstract contracts) was completely disconnected from actual component implementations — governance and implementation had evolved independently. The same pattern may apply here: specs 020 and 036 built governance tooling (staleness detection, review processes) that may exist but not be actively used. The audit should verify adoption, not just existence.
- **Multi-spec chain**: 062 → 063 → 078 was three specs. We should plan for at least two (audit + formalization) and be prepared for a third (enforcement) if the audit reveals process gaps.

---

## Risks and Counter-Arguments

### Risk: Over-engineering governance

**Concern:** Naming the intelligence layer and creating a dedicated agent might add bureaucratic overhead without proportional benefit. The current distributed model works — things get done.

**Counter:** Things get done, but things also fall through cracks. Documentation staleness, MCP accuracy drift, and agent prompt inconsistencies are real recurring issues. The question isn't whether governance is needed, but whether the current implicit governance is sufficient. The audit will answer that with evidence.

### Risk: Agent proliferation

**Concern:** Adding a 9th agent increases routing complexity. Every new agent means more coordination overhead in feedback rounds, more boundary negotiations, and more potential for domain confusion.

**Counter:** This is a real cost. The audit should explicitly assess whether the governance gap is better filled by a new agent or by expanding an existing agent's scope (e.g., expanding Thurgood's domain to include documentation governance). The audit shouldn't assume a new agent is the answer.

### Risk: Naming without substance

**Concern:** "Civitas" could become a label without architectural meaning — unlike Rosetta and Stemma, which have distinct systems, APIs, and boundaries. If Civitas is just "everything that isn't tokens or components," the name adds confusion rather than clarity.

**Counter:** This is the most important risk. The audit must determine whether Civitas has a coherent architectural boundary or whether it's a grab-bag. If the audit finds that the intelligence layer is too diffuse to name coherently, that's a valid finding — and the recommendation should say so.

### Risk: Redundant discovery

**Concern:** This project has a strong audit culture — specs 020, 023, 032, 033, 036, 062, and the Phase 1 Discovery Audit all produced findings documents. Another audit risks producing findings that overlap with prior audit findings without advancing the state.

**Counter:** The audit should explicitly build on prior findings rather than re-derive them. Mitigation: the first task of the audit should inventory prior audit findings relevant to Civitas scope (particularly specs 020, 032, 033, 036) and consume them as inputs. The governance gap analysis (Dimension 4) should assess what those prior specs built and whether it's still in use — not re-audit the same territory.

---

## Expected Outputs

1. **Surface area inventory** — Complete categorized inventory of all Civitas artifacts
2. **Terminology audit** — Current terminology usage and inconsistencies
3. **Staleness assessment** — Documentation currency analysis
4. **Governance gap analysis** — Missing processes and enforcement mechanisms
5. **Agent ownership analysis** — Current distribution and gap assessment
6. **Readiness recommendation** — Go/no-go for formalization spec with scope estimate

---

## Relationship to Downstream Work

This audit is Phase 1. If the readiness recommendation is "go," Phase 2 would be a formalization spec covering:

- Civitas definition document (what it is, what it contains, what it doesn't)
- Terminology rollout across steering docs and agent prompts
- Agent creation (if warranted) with domain boundaries and prompt
- Agent Directory update
- Portfolio site update (ecosystem diagram)
- Governance process establishment (doc review cycles, MCP health checks)

The audit findings will directly inform the scope and task structure of the formalization spec, preventing the scope surprises that characterized the 062 → 063 transition.
