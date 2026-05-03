# Governance Gap Analysis

**Date**: 2026-05-03
**Spec**: 098 - Civitas Readiness Audit
**Tasks**: 3.1 (Enforcement Mechanisms), 3.2 (Cross-Reference Fragility), 3.3 (Process Gaps)
**Purpose**: Identify what governance processes and enforcement mechanisms exist vs. what's missing

---

## Preamble: Prior Governance Tooling

*Consumed from `findings/prior-audit-digest.md` (Task 1.1)*

Four prior specs (020, 032, 033, 036) built governance tooling including 13 scripts, a quarterly review process, metadata maintenance guidelines, and comprehensive audit artifacts. **All tooling exists but is dormant** — scripts last modified Dec 2025, not integrated into any automation, quarterly review never executed. The dormant tooling may also be stale or superseded: scripts were built for 12 docs (now 86), and MCP tools may functionally replace several scripts.

**Key implication:** The governance gap is adoption and integration, not absence. A Civitas formalization spec should focus on activating existing tooling rather than building from scratch — but must first assess whether the tooling is still relevant.

---

## Section 1: Enforcement Mechanism Inventory (Task 3.1)

### Methodology

Discovery was bidirectional per task instructions:
- **Direction A:** Identified governance expectations from steering docs (626 SHALL/MUST/required matches across 66 docs), then searched for enforcement mechanisms
- **Direction B:** Scanned enforcement mechanisms in `src/__tests__/stemma-system/` (7 tests), `src/validators/` (39 files), `scripts/` (13 governance scripts), `.kiro/hooks/` (13 hooks), and `package.json` (5 audit scripts), then mapped to governance expectations

Domain-specific inventories produced by Ada (Rosetta: 36 expectations) and Lina (Stemma: 52 expectations) via consultation.

### Summary

| Category | Count | % |
|----------|-------|---|
| Automated enforcement (active) | 37 | 42% |
| Automated enforcement (partial/limited scope) | 10 | 11% |
| Automated enforcement (dormant — exists, not in CI) | 8 | 9% |
| Process-based enforcement (active) | 13 | 15% |
| Missing enforcement | 20 | 23% |
| **Total governance expectations** | **88** | |

### Cross-Cutting Findings

#### 1. Agent hooks are universally shallow

All 12 enabled agent hooks (4 Ada, 4 Lina, 3 Thurgood, 1 release) are `userTriggered` — they require manual invocation and rely on agent analysis quality rather than deterministic validation. They are prompts, not checks. Several duplicate what automated tests already do (e.g., `lina-component-token-audit.kiro.hook` duplicates `scripts/audit-component-tokens.js`).

**Assessment:** Agent hooks provide a user-facing interface to governance checks but are not enforcement mechanisms. They should be classified as "convenience wrappers" rather than "enforcement."

#### 2. Audit scripts exist but aren't in CI

Five npm audit scripts exist (`audit:tokens`, `audit:tokens:detailed`, `audit:mode-parity`, `audit:theme-drift`, `validate:release-setup`) plus 13 governance scripts in `scripts/`. None are wired into CI, pre-commit hooks, or any automated pipeline. They are manual-run tools.

**Assessment:** These are enforcement mechanisms in capability but not in practice. The gap is integration, not implementation.

#### 3. Governance autonomy levels have zero automated enforcement

The core of Token-Governance.md — the semantic/primitive/component token usage autonomy levels — relies entirely on agent system prompts. No automated check validates that:
- Semantic tokens are used in semantically correct contexts
- Primitive token usage was preceded by prior context or human acknowledgment
- Component token usage received explicit human approval
- Token creation was human-reviewed

**Assessment:** This is the highest-impact governance gap. The autonomy levels are the primary governance framework for token usage, and they have no enforcement beyond agent compliance.

#### 4. Process-based enforcement relies entirely on agent compliance

13 governance expectations are enforced only through agent system prompts and the ballot measure model. These include:
- Family creation approval
- Base contract modification approval
- Documentation change approval (ballot measure)
- Status transition approval
- Dimension governance (new modes/dimensions)
- Modifier type governance

No automated gate prevents violations. The only backstop is human review of git diffs.

### Enforcement by Domain

#### Rosetta Domain (36 expectations)

| Enforcement Level | Count | Examples |
|-------------------|-------|---------|
| **Automated (deep)** | 12 | Baseline grid validation, modular scale, three-tier tolerance, primitive reference validation, RGBA pipeline, cross-platform consistency |
| **Automated (moderate)** | 7 | Component token reasoning, semantic-first composition, WCAG validation, mode parity audit, theme drift detection |
| **Process-based** | 8 | Token autonomy levels (4), agent hooks (4) |
| **Missing** | 5 | Dimension governance, modifier type governance, token-first in specs, prior acknowledgment tracking, ballot measure model |
| **Partial/dormant** | 4 | Strategic flexibility guard (in-process only), naming convention manager (utility, not gate), audit scripts (manual only) |

**Rosetta strengths:** Mathematical foundation enforcement is excellent. The BaselineGridValidator → ThreeTierValidator → MathematicalRelationshipParser chain provides deep, automated coverage of the mathematical principles that underpin the token system.

**Rosetta gaps:** Governance autonomy levels (the core governance framework) have zero automated enforcement. Audit scripts exist but aren't in CI.

#### Stemma Domain (52 expectations)

| Enforcement Level | Count | Examples |
|-------------------|-------|---------|
| **Automated (active)** | 18 | Contract naming, contract existence, behavioral contract validation, family name registry, readiness compliance, composition compliance, MCP documentation structure, component naming, token usage, accessibility |
| **Automated (partial/limited)** | 6 | Cross-platform consistency (Form Inputs only), inheritance resolution (shallow), schema field validation (5 of 9 fields) |
| **Dormant** | 4 | 4 Lina hooks (user-triggered agent prompts) |
| **Process-based** | 5 | Family creation approval, base contract modification, documentation ballot measure, status transitions |
| **Missing** | 11 | Category field redundancy validation, exclusion field validation, schema type enum, single-primitive-per-family, semantic-extends-not-replaces, component token construction rule, CSS logical properties, component-meta.yaml existence, browser entry registration, composition documentation, per-family contract implementation tests (only Form Inputs covered) |
| **Stale** | 1 | StemmaComponentNamingValidator KNOWN_FAMILIES list missing Chip/Progress/Badge |

**Stemma strengths:** Contract system governance is excellent — the catalog name validation test is one of the deepest enforcement mechanisms in the system. Composition compliance and MCP documentation structure are well-validated.

**Stemma gaps:** Cross-platform consistency tests cover only Form Inputs (1 of 9 production families). 11 governance expectations have no enforcement at all. Behavioral contract implementation tests are regex-based (pattern presence, not behavioral correctness).

#### Process Domain (cross-cutting)

| Enforcement Level | Count | Examples |
|-------------------|-------|---------|
| **Automated** | 0 | — |
| **Process-based** | 5 | Spec feedback protocol, sequential formalization gates, completion documentation workflow, task type classification, ballot measure model |
| **Dormant** | 13 | All 13 governance scripts from spec 020 |
| **Missing** | 4 | Steering doc metadata enforcement on creation, `Last Reviewed` update enforcement on modification, cross-reference maintenance, steering doc lifecycle management |

**Process assessment:** Process governance has **zero automated enforcement**. All process governance relies on agent compliance with system prompts and documented workflows. The 13 dormant scripts from spec 020 could provide automated enforcement for metadata and cross-references, but they're not integrated into any workflow.

---

*Sections 2 (Cross-Reference Fragility) and 3 (Process Gaps) to be added by Tasks 3.2 and 3.3.*

---

## Section 2: Cross-Reference Fragility (Task 3.2)

### Methodology

Scanned cross-references on a representative sample of 12 docs (all Layer 0-1 docs + high-connectivity Layer 2 docs) using docs MCP `list_cross_references()`. Assessed maintenance process by reviewing `Process-Cross-Reference-Standards.md` and dormant tooling from spec 020.

### Cross-Reference Landscape

**Index total:** 332 cross-references across 86 documents.

**Representative sample results:**

| Document | Layer | Cross-Refs | Role |
|----------|-------|------------|------|
| Rosetta-Stemma-Systems-Overview | 1 | 18 | Hub — links to all 13 component families + system docs |
| Rosetta-System-Architecture | 2 | 13 | Hub — links to token docs, integration guides, component docs |
| Token-Governance | 2 | 10 | Hub — links to token families, architecture, integration |
| stemma-system-principles | 2 | 10 | Hub — links to component infrastructure docs |
| Component-Development-Guide | 3 | 6 | Moderate — links to decision frameworks, token patterns |
| Process-Spec-Planning | 2 | 6 | Template refs — links to completion doc examples |
| rosetta-system-principles | 2 | 5 | Moderate — links to token docs, component guide |
| Agent-Directory | 1 | 0 | Target only — referenced by others, references nothing |
| Core Goals | 1 | 0 | Target only |
| Spec-Feedback-Protocol | 1 | 0 | Target only |
| Process-Development-Workflow | 2 | 0 | Target only (uses MCP query patterns instead of links) |
| meta-guide | 0 | 0 | Target only |

**Sample captured:** 68 refs from 12 docs (~20% of total from ~14% of docs). The high-connectivity docs are concentrated in the Rosetta-Stemma-Systems-Overview (18) and Rosetta-System-Architecture (13) — these are the hub documents.

### Maintenance Process Assessment

| Aspect | Status |
|--------|--------|
| **Standards document** | ✅ `Process-Cross-Reference-Standards.md` exists (L2, 6,469 tokens) — defines formatting rules, common patterns, anti-patterns |
| **Automated scanning** | ❌ Dormant — `scripts/scan-cross-references.sh` exists but unused since Dec 2025 |
| **Automated format validation** | ❌ Dormant — `scripts/validate-cross-reference-format.sh` exists but unused since Dec 2025 |
| **MCP tracking** | ⚠️ Passive — docs MCP indexes 332 cross-references but doesn't validate them (no broken-link detection) |
| **Manual maintenance** | Ad hoc — spec 036 found and fixed 10 broken cross-references during audit, not through systematic monitoring |
| **Enforcement on creation** | ❌ None — no check validates that new docs include appropriate cross-references or that existing cross-references remain valid after doc changes |

### Blast Radius for Civitas Terminology Rollout

**Good news:** Cross-references use file paths, not system names. A Civitas naming rollout would not break any cross-reference links. The blast radius is in **prose text** (Rosetta+Stemma paired references, system descriptions), not in cross-reference infrastructure.

**From the terminology audit (Task 2.1):**
- ~30 Rosetta+Stemma paired references in 6 steering docs need text updates
- ~8 agent prompts need Civitas additions
- ~3-5 docs need new Civitas definition/context
- **Total: ~50-60 text changes across 17-19 files**

**Cross-reference-specific risk:** The 6 hub documents (Rosetta-Stemma-Systems-Overview, Rosetta-System-Architecture, Token-Governance, stemma-system-principles, Component-Development-Guide, rosetta-system-principles) contain the majority of cross-references. If these docs are modified during the terminology rollout, their cross-references should be verified — not because the links would break, but because the surrounding prose context may need updating to reflect the three-system framing.

### Fragility Assessment

**Current fragility: Moderate.** The cross-reference network is structurally sound (332 refs, no known broken links after spec 036 fixes) but has no ongoing maintenance mechanism. Cross-references are validated only during periodic audits, not continuously. The dormant scripts from spec 020 could provide continuous validation but aren't integrated.

**Risk for Civitas rollout: Low.** The terminology change doesn't affect cross-reference links (file paths don't change). The risk is limited to prose context around cross-references in the 6 hub documents.

**Recommendation for formalization spec:** Run `scripts/scan-cross-references.sh` and `scripts/validate-cross-reference-format.sh` before and after the terminology rollout to verify no cross-references were broken. If the scripts are stale (built for 12 docs), update them first or use the docs MCP `list_cross_references()` as a verification tool.

---

*Section 3 (Process Gaps) to be added by Task 3.3.*

---

## Section 3: Process Gaps (Task 3.3)

### Methodology

For each process question from the requirements, searched steering docs for documented processes and classified as: documented and active | documented but dormant | not documented.

### Process Gap Inventory

#### 1. Steering doc lifecycle (creation → review → update → deprecation)

| Phase | Status | Evidence |
|-------|--------|---------|
| **Creation** | Partially documented | Component-MCP-Document-Template defines templates for component family docs. Process-File-Organization defines metadata requirements. No general-purpose "how to create a new steering doc" guide exists. |
| **Review** | Documented but dormant | Spec 020 created `quarterly-review-process.md` with detailed workflow. Never executed. Staleness detection script exists but isn't run. |
| **Update** | Documented but dormant | Spec 020 created `metadata-maintenance-guidelines.md` with decision frameworks for when to update. No evidence of use. Ballot measure model governs content changes but not metadata updates. |
| **Deprecation** | Not documented | No process exists for deprecating a steering doc. Spec 063 deprecated the standard contracts library via ballot measure, but this was ad hoc — no reusable deprecation process was established. |

**Classification: Partially documented, mostly dormant.** The review and update phases have documented processes that aren't used. Creation and deprecation have gaps.

#### 2. MCP server health monitoring

| Aspect | Status | Evidence |
|--------|--------|---------|
| **Health check availability** | ✅ Active | Both MCPs expose health endpoints: `get_index_health()` (Docs), `get_component_health()` (Application). Both currently healthy. |
| **Scheduled monitoring** | Not documented | No process defines when or how often to check MCP health. No hook, script, or agent responsibility for periodic health checks. |
| **Drift detection** | Not documented | No process detects when MCP index content drifts from steering doc content (e.g., token index ≠ Token-Family docs). Ada flagged this as a gap in R1 feedback. |
| **Recovery process** | Partially documented | `rebuild_index` tool exists for Docs MCP. No documented recovery process for Application MCP index issues. |

**Classification: Not documented.** Health check tools exist but no monitoring process uses them.

#### 3. Agent prompt drift detection

| Aspect | Status | Evidence |
|--------|--------|---------|
| **Prompt-to-steering alignment** | Not documented | No process detects when agent prompts reference outdated steering doc content, use superseded terminology, or contain instructions that conflict with current standards. |
| **Prompt update triggers** | Not documented | No defined trigger for when agent prompts should be updated after steering doc changes. Spec 078 discovered that Lina's prompt lacked a contracts.yaml scaffolding step — this was caught by human review, not by any systematic check. |
| **Prompt versioning** | Not documented | Agent prompts have no version metadata. No way to determine when a prompt was last aligned with steering docs. |

**Classification: Not documented.** This is a significant gap. Agent prompts are the primary mechanism for process enforcement (13 governance expectations rely on agent compliance), but there's no process to ensure prompts stay current.

#### 4. New steering doc identification

| Aspect | Status | Evidence |
|--------|--------|---------|
| **When to create** | Partially documented | Component-MCP-Document-Template defines when to create component family docs. No equivalent for process docs, token docs, or integration docs. |
| **Naming conventions** | Documented and active | Spec 036 established category prefixes (Token-Family-*, Component-Family-*, Process-*, Test-*). 43 of 86 docs follow the convention. |
| **MCP registration** | Not documented | No process defines when a new steering doc should be added to the Docs MCP index. The index auto-discovers files in `.kiro/steering/` but there's no checklist for ensuring metadata, cross-references, and layer assignment are correct. |

**Classification: Partially documented.** Naming conventions are active. Creation triggers and MCP registration are gaps.

#### 5. Steering doc contradiction handling

| Aspect | Status | Evidence |
|--------|--------|---------|
| **Detection** | Not documented | No process or tool detects when steering docs contradict each other. The redundancy analysis from spec 036 identified "harmful redundancy" (duplicated definitions that could diverge) but this was a one-time audit, not an ongoing process. |
| **Resolution** | Partially documented | The ballot measure model provides a resolution mechanism (propose change → Peter approves), but there's no defined process for identifying contradictions in the first place. |
| **Prevention** | Partially documented | Spec 036's redundancy classification (intentional priming vs. harmful redundancy) provides a framework, but it's not enforced. The consolidation proposals from spec 036 were designed to reduce contradiction risk, but not all were executed. |

**Classification: Not documented for detection; partially documented for resolution.**

### Summary Table

| Process | Creation | Review | Update | Deprecation | Monitoring |
|---------|----------|--------|--------|-------------|------------|
| Steering doc lifecycle | Partial | Dormant | Dormant | Missing | — |
| MCP health | — | — | — | — | Missing |
| Agent prompt alignment | — | Missing | Missing | — | Missing |
| New doc identification | Partial | — | — | — | — |
| Contradiction handling | — | — | — | — | Missing |

### Cross-Cutting Finding: The Dormancy Pattern

The most striking finding across all three sections of this governance gap analysis is the **dormancy pattern**: governance processes and tooling are documented and built, but not adopted. This pattern repeats across:

- **13 scripts** from spec 020 (built Dec 2025, never used since)
- **Quarterly review process** (documented, never executed)
- **Metadata maintenance guidelines** (documented, never used)
- **Cross-reference validation scripts** (built, never integrated)
- **Audit scripts** (exist in package.json, not in CI)
- **Agent hooks** (defined, user-triggered only, rarely invoked)

The root cause appears to be **no ownership of the governance infrastructure itself.** Tooling is built during specs as deliverables, but no agent or process is responsible for ensuring the tooling continues to be used after the spec completes. Each spec creates governance artifacts and moves on. The artifacts persist but the practice doesn't.

This is the strongest evidence for the Civitas agent hypothesis: not that governance tooling needs to be built, but that someone needs to be responsible for ensuring it stays active.

