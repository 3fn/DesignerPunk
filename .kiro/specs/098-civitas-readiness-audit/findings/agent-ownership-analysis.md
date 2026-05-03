# Agent Ownership Analysis

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Task**: 4.1 — Agent ownership analysis
**Purpose**: Map governance responsibilities to current owners, evaluate ownership models, present options with trade-offs

---

## Current Ownership Map

### Governance Responsibilities with Clear Owners

| Responsibility | Current Owner | Evidence |
|----------------|---------------|---------|
| Token content accuracy | Ada | Agent Directory, 20 Rosetta-domain steering docs |
| Token mathematical validation | Ada | 12 deep automated enforcement mechanisms |
| Token governance rules | Ada | Token-Governance.md ownership |
| Component content accuracy | Lina | Agent Directory, 26 Stemma-domain steering docs |
| Component schema/contract governance | Lina | Contract system tests, schema validation |
| Test suite health auditing | Thurgood | Agent Directory, 3 Thurgood hooks |
| Spec formalization | Thurgood | Agent Directory, spec workflow ownership |
| Product screen specifications | Leonardo | Agent Directory |
| Product quality auditing | Stacy | Agent Directory |

### Governance Responsibilities with No Primary Owner

| Responsibility | Currently Handled By | Gap Evidence |
|----------------|---------------------|--------------|
| **Steering doc metadata governance** | Nobody | 12 docs missing `Last Reviewed`; no enforcement on creation |
| **Steering doc lifecycle management** | Nobody | Quarterly review process dormant; no deprecation process |
| **MCP server health monitoring** | Nobody | Health endpoints exist but no monitoring process |
| **MCP index accuracy** | Nobody | No drift detection between index and source docs |
| **Agent prompt currency** | Nobody | No process detects prompt drift from steering docs; spec 078 found gap via human review |
| **Cross-reference maintenance** | Nobody | Validation scripts dormant; maintenance is ad hoc |
| **Governance tooling adoption** | Nobody | 13 scripts dormant; the dormancy pattern |
| **"Shared" doc maintenance** | Nobody | 13 docs (15.1%) have no primary maintainer |
| **Documentation architecture** | Nobody | No ongoing process for doc organization, consolidation, or gap identification |
| **Knowledge base currency** | Nobody | KB definitions exist (spec 087) but no process ensures they stay current as source files change |

**10 unowned responsibilities.** These are the governance gaps that a Civitas agent (or alternative) would need to address.

---

## Ownership Model Evaluation

### Model A: Infrastructure Steward (Librarian)

**Concept:** Civitas agent owns the health, metadata, and maintenance of the governance infrastructure. Does NOT own content accuracy — Ada still owns whether Token-Family-Color.md is correct; Civitas owns whether it has valid metadata, current cross-references, and a recent review date.

**What it would own:**
- Steering doc metadata enforcement (creation and update)
- Steering doc lifecycle management (review cycles, deprecation)
- MCP server health monitoring and drift detection
- Cross-reference maintenance and validation
- Governance tooling adoption and integration
- "Shared" doc maintenance (the 13 unowned docs)
- Agent prompt currency monitoring
- Knowledge base currency monitoring

**What it would NOT own:**
- Token content accuracy (Ada)
- Component content accuracy (Lina)
- Test suite health (Thurgood)
- Spec formalization (Thurgood)
- Product specifications (Leonardo)

**Strengths:**
- Clean boundary — infrastructure vs. content is a crisp distinction
- No domain expertise duplication — Civitas doesn't need to understand tokens to check metadata
- Natural fit for the dormancy pattern — the steward's job is to ensure tooling stays active
- Addresses all 10 unowned responsibilities

**Weaknesses:**
- Requires coordination with domain agents for content-related issues (e.g., "this doc is stale" → "Ada, please review Token-Family-Color.md")
- May feel like bureaucratic overhead if the steward flags issues faster than domain agents can address them
- The "Shared" docs (13) may need content expertise that a pure infrastructure steward lacks

### Model B: Documentation Authority

**Concept:** Civitas agent owns content accuracy across all steering docs, not just infrastructure health.

**Assessment: Problematic.** This would require the Civitas agent to understand tokens (to review Token-Family docs), components (to review Component-Family docs), testing (to review Test-Development-Standards), and processes (to review Process-Spec-Planning). It duplicates domain expertise that Ada, Lina, and Thurgood already have. It would also create boundary conflicts — who decides whether Token-Governance.md is correct, Ada or Civitas?

**Recommendation:** Model B is not viable. Model A (infrastructure steward) is the appropriate model if a new agent is created.

---

## Boundary Conflict Matrix

| Responsibility | Current Owner | Civitas (Model A) | Conflict? |
|----------------|---------------|-------------------|-----------|
| Token content accuracy | Ada | ❌ Not owned | No |
| Token doc metadata | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| Token doc staleness flagging | Nobody → **Civitas** | ✅ Flags | No — Civitas flags, Ada reviews |
| Component content accuracy | Lina | ❌ Not owned | No |
| Component doc metadata | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| Test suite health | Thurgood | ❌ Not owned | No |
| Spec formalization | Thurgood | ❌ Not owned | No |
| **Governance standards** | **Thurgood** | **⚠️ Adjacent** | **Potential overlap** |
| **Compliance test writing** | **Thurgood** | **⚠️ Adjacent** | **Potential overlap** |
| Steering doc lifecycle | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| MCP health monitoring | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| Agent prompt currency | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| Cross-reference maintenance | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| Governance tooling adoption | Nobody → **Civitas** | ✅ Owned | No — new ownership |
| "Shared" doc maintenance | Nobody → **Civitas** | ✅ Owned | No — new ownership |

**Two potential overlaps with Thurgood:**

1. **Governance standards:** Thurgood currently owns "governance standards" per Agent Directory. A Civitas agent would own governance *infrastructure* (the tooling, processes, and metadata that implement governance). The distinction: Thurgood defines what the standards are; Civitas ensures the infrastructure enforces them. This is analogous to Thurgood auditing test coverage (the standard) while Ada/Lina write the tests (the implementation).

2. **Compliance test writing:** Thurgood "audits but does not write domain-specific tests." If Civitas owns governance tooling, it might write governance enforcement scripts (e.g., metadata validation, cross-reference checking). This is infrastructure tooling, not domain-specific tests — but the boundary needs to be explicit.

**Resolution:** The boundary is "Thurgood defines governance standards and audits compliance; Civitas maintains the infrastructure that enforces those standards." This parallels the existing Thurgood-Ada/Lina boundary (Thurgood audits, domain agents implement).

---

## Three Options with Trade-Offs

### Option A: New Dedicated Civitas Agent

**What it is:** A 9th agent (4th system agent) with the infrastructure steward model. Named after a historical figure who championed institutional infrastructure or civic governance.

**Trade-offs:**
- ✅ Clear, dedicated ownership of all 10 unowned responsibilities
- ✅ Clean boundary with existing agents (infrastructure vs. content)
- ✅ Addresses the dormancy pattern directly — someone's job is to keep tooling active
- ✅ Parallels the Rosetta/Stemma naming with a dedicated agent
- ❌ 9th agent increases routing complexity
- ❌ Additional coordination overhead in feedback rounds
- ❌ Agent prompt to write and maintain
- ❌ May feel like overhead for a project with one human lead

**Best for:** If the governance infrastructure is expected to grow (more docs, more MCPs, more agents, more tooling) and needs sustained attention.

### Option B: Expand Thurgood's Scope

**What it is:** Add governance infrastructure responsibilities to Thurgood's existing domain. Thurgood becomes "Test Governance, Spec Standards, and Documentation Infrastructure Specialist."

**Trade-offs:**
- ✅ No new agent — no routing complexity increase
- ✅ Natural fit — Thurgood already owns governance standards and audit methodology
- ✅ Thurgood already has the deepest understanding of the governance layer (he formalizes specs, audits tests, writes completion docs)
- ❌ Scope overload risk — Thurgood already has 9 steering docs, 9 skills, 3 KBs, and owns spec formalization + test auditing + governance standards
- ❌ Blurs the "audit vs. implement" boundary — Thurgood currently audits but doesn't implement. Adding infrastructure maintenance means he'd both define standards AND maintain the tooling that enforces them
- ❌ Doesn't create a named "Civitas" agent to parallel Rosetta/Stemma naming

**Best for:** If the governance infrastructure is stable and needs monitoring rather than active development.

### Option C: Distributed Ownership with Explicit Assignments

**What it is:** Assign each unowned responsibility to an existing agent via Agent Directory updates. No new agent, no scope expansion — just explicit assignments.

| Responsibility | Assigned To | Rationale |
|----------------|-------------|-----------|
| Steering doc metadata | Thurgood | Governance standards |
| Doc lifecycle management | Thurgood | Audit methodology |
| MCP health monitoring | Lina (Application) + Thurgood (Docs) | Domain proximity |
| Cross-reference maintenance | Thurgood | Process standards |
| Agent prompt currency | Stacy | Process quality |
| "Shared" doc maintenance | Split by content domain | Closest domain agent |
| Governance tooling adoption | Thurgood | Governance standards |

**Trade-offs:**
- ✅ No new agent, no scope expansion
- ✅ Leverages existing domain expertise
- ✅ Minimal process change
- ❌ Distributes responsibility without accountability — the dormancy pattern exists precisely because responsibilities are distributed
- ❌ No single point of accountability for governance infrastructure health
- ❌ Coordination overhead when issues span multiple agents' assignments
- ❌ Doesn't address the root cause — the dormancy pattern is caused by distributed ownership

**Best for:** If the governance gaps are minor and don't warrant dedicated attention.

---

## Assessment

**The evidence points toward Option A (new agent) or Option B (expand Thurgood).** Option C doesn't address the root cause — the dormancy pattern exists because governance infrastructure is distributed without accountability. Distributing it more explicitly doesn't change the fundamental dynamic.

Between A and B, the key question is scope load. Thurgood's current scope is already substantial (spec formalization, test auditing, governance standards, 3 hooks, this audit). Adding 10 infrastructure responsibilities would make him the most heavily loaded agent. A dedicated agent distributes the load and creates a clean boundary.

**However:** This is Peter's decision, not mine. The evidence supports both A and B. I'm presenting the trade-offs, not making the call.
