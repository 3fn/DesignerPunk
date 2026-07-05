# Ballot Measure: Define the Documentation Task Type

**Date**: 2026-07-05
**Author**: Thurgood (Civitas steward)
**Origin**: 2026-07-05 A9 governance review, finding F1
**Status**: DRAFT — awaiting accuracy review, then Peter's ratification
**Placement note**: Prior ballots were spec artifacts (`118/findings/task-11-ballot-proposal.md`, `117/completion/task-6-ballot-proposals.md`). This measure arises from a governance review, not a spec, so it lives here per the loose-convention fallback.

---

## The Problem (evidence)

The task-type taxonomy disagrees with itself across three governance surfaces:

1. **Task-Completion-Protocol** (Layer 1, always-loaded) enumerates FOUR types — its parent-task sequence explicitly covers "(Setup or Documentation type)".
2. **`governance/Process-Task-Type-Definitions.md`** defines only THREE (Setup / Implementation / Architecture) — while its own frontmatter description already promises four ("Setup, Implementation, Architecture, and Documentation task types").
3. **`governance/Process-Spec-Planning.md`** enumerates three at multiple sites (`**Type**: [Setup | Implementation | Architecture]`, etc.) — while its "Three Task Types" heading already contains a fourth subsection (Parent Tasks).

Meanwhile, practice has used `Type: Documentation` for months: **20+ instances across at least 12 specs** (020, 040, 054a, 054b, 074, 077, 101, 102, 107, 117, 118, 124). The gap causes real friction: **Spec 121's F1** discovered the missing definition mid-formalization and worked around it by classifying documentation work as Implementation — the opposite workaround from every other spec.

**Empirical instances used to derive the definition below:**

| Spec / Task | Work | Tier used |
|---|---|---|
| 124 Task 5 / 5.1 | Completion documentation authoring | Tier 1 |
| 124 Task 6 / 6.1 | Gated cross-spec handback to 118 | Tier 1 |
| 118 Task 5.2 | Exemption-boundary doc drafted + staged for ballot | **Tier 2** |
| 118 Task 6 / 6.1 | Spec 117 closeout note (SHALL/SHALL NOT contract content) | **Tier 2** |
| 117 Task 6.1 | Ballot-measure steering proposals | Tier 1 |
| 117 Task 6.2 | Issues-registry logging of deferred findings | Tier 1 |
| 101 (×2), 102 (×3), 077 (×3) | Consumer/user-facing docs, doc updates | Tier 1 |
| 020, 040, 054a, 054b, 074 | Steering/component/user doc work (pre-tier-metadata era or Tier 1) | Tier 1 / unstated |

**Tier pattern**: Tier 1 is the overwhelming default (artifact-existence + content checks, no test suite). The two Tier 2 instances (118) share a distinguishing property: the documentation artifact itself carried SHALL/SHALL NOT contract semantics that another spec's decisions depended on. The definition encodes Tier 1 default with a principled Tier 2 escalation, rather than flattening the observed exception.

---

## Considered Alternative (counter-argument)

Spec 121-F1's workaround points the other way: abolish `Type: Documentation` and classify doc-producing work as Implementation with testable acceptance criteria. This has merit — it forces doc tasks to carry runnable checks. **Rejected because**: (a) Layer-1 law (Task-Completion-Protocol) already enumerates Documentation and prescribes its parent-task sequence ("verify artifacts," no test run); (b) practice is 20+ instances for Documentation vs one spec's workaround; (c) the definition below keeps the good part of 121's instinct by requiring content acceptance criteria and artifact validation. Ratifying this measure also retires 121-F1's premise ("there is no Documentation task type") going forward — no retroactive reclassification of 121's tasks.

---

## Item 1 — New section in Process-Task-Type-Definitions.md

Insert between the end of "Architecture Tasks" (after its Documentation Tier subsection, before `## Update History`):

```markdown
## Documentation Tasks

### Definition

Documentation tasks are **writing work that produces or updates documentation artifacts** — completion documentation, cross-spec handoffs and closeout notes, issues-registry entries, consumer-facing guides, and drafts of governance/steering content. They change what the project knows and records, not what the code does: no production code, test, or configuration behavior is modified.

### Characteristics

- **Artifact-producing**: Creates or updates documentation files; success is measured by artifact existence and content matching stated acceptance criteria
- **Content acceptance criteria**: Well-formed Documentation tasks state what the artifact SHALL contain (and, where relevant, SHALL NOT contain)
- **No runtime risk**: Cannot break builds, tests, or shipped behavior; the risk is informational — inaccuracy, staleness, broken cross-references
- **Governance routing**: When the target is a steering/governance doc, the task produces a *proposal* — the edit itself routes through the ballot-measure model (agent drafts, Peter ratifies), and the docs MCP index is rebuilt after application
- **Artifact-based validation**: Validated by artifact and content checks (files exist, criteria met, cross-references resolve, metadata valid), not by test suites

### Examples

1. **Author completion documentation**
   - Write detailed completion doc + concise summary doc for a parent task
   - Record decisions, deferred items, and out-of-scope routing
   (Precedent: Spec 124 Task 5)

2. **Deliver a cross-spec handback or closeout note**
   - Write a guidance note into another spec's directory with defined SHALL/SHALL NOT content
   - Cross-reference it from the receiving spec's decision record
   (Precedent: Spec 124 Task 6; Spec 118 Task 6)

3. **Draft ballot-measure steering proposals**
   - Draft proposed steering-doc changes with before/after text for Peter's ratification
   (Precedent: Spec 117 Task 6.1; Spec 118 Task 5.2)

4. **Log deferred findings in the issues registry**
   - Record out-of-scope findings with rationale; mark superseded issues resolved
   (Precedent: Spec 117 Task 6.2)

5. **Write or update consumer-facing documentation**
   - README, onboarding, and usage guides
   (Precedent: Specs 101, 102, 077)

### Validation Tier

**Tier 1: Minimal (default)**

Documentation tasks default to minimal validation because they carry no runtime risk and have artifact-based success criteria:

- Verify all specified artifacts were created or updated
- Verify content satisfies the task's stated success criteria
- Verify cross-references resolve
- For governance/steering artifacts: metadata validates (`scripts/validate-steering-metadata.js`) and the docs MCP index is rebuilt after application

**Escalation to Tier 2 (planner's option)**: When the documentation artifact is itself load-bearing — carrying SHALL/SHALL NOT contract semantics that other specs' decisions depend on — assign Tier 2 - Standard. (Precedent: Spec 118 Tasks 5.2 and 6.)

### Documentation Tier

**Tier 1: Minimal**

Documentation tasks use minimal completion documentation:

- **Artifacts Created/Updated**: List of documentation files created or changed
- **Implementation Notes**: Brief description of what was written and any routing (ballot staging, MCP rebuild)
- **Validation**: Document Tier 1 validation results
```

---

## Item 2 — Enumeration reconciliation in Process-Task-Type-Definitions.md

**2a. Frontmatter (line 5): NO CHANGE REQUIRED.** The description already promises four types ("Setup, Implementation, Architecture, and Documentation task types"). This measure makes the content catch up to its own frontmatter.

**2b. AI Agent Reading Priorities:**

Before:
```markdown
2. ✅ **All Task Type Definitions** (Setup, Implementation, Architecture)
```
After:
```markdown
2. ✅ **All Task Type Definitions** (Setup, Implementation, Architecture, Documentation)
```

**2c. Overview:**

Before:
```markdown
This document defines the three task types used in the Spec Planning Standards to determine appropriate validation depth and completion documentation detail. Task types are determined during the planning phase and guide execution practices.
```
After:
```markdown
This document defines the four task types used in the Spec Planning Standards to determine appropriate validation depth and completion documentation detail. Task types are determined during the planning phase and guide execution practices.
```

**2d. Update History — Update Format template:**

Before:
```markdown
**Classification Decision**: [Setup / Implementation / Architecture]
```
After:
```markdown
**Classification Decision**: [Setup / Implementation / Architecture / Documentation]
```

**2e. Update History — new entry** (append after the "Informed Placeholder Tasks" entry):

```markdown
### July 5, 2026 - Documentation Task Type Ratified

**Pattern**: Tasks that produce or update documentation artifacts (completion docs, cross-spec handbacks, ballot proposals, issues-registry entries, consumer docs) with no production code changes.
**Classification Decision**: Documentation (new task type)
**Rationale**: Practice used `Type: Documentation` in 20+ tasks across 12+ specs while this document defined only three types; Task-Completion-Protocol (Layer 1) already enumerated four. Ratified via ballot measure (2026-07-05, from the A9 governance review) to reconcile law with practice. Default Tier 1 - Minimal; escalate to Tier 2 when the artifact carries contract semantics other work depends on (precedent: Spec 118 Tasks 5.2, 6).
**Decided By**: Peter Michaels Allen + Thurgood
**Examples**: Spec 124 Tasks 5, 6; Spec 118 Tasks 5.2, 6; Spec 117 Tasks 6.1, 6.2; Specs 101/102/077 doc tasks.
```

---

## Item 3 — Enumeration reconciliation in Process-Spec-Planning.md

**3a. AI Agent Reading Priorities:**

Before:
```markdown
2. ✅ **Task Type Classification System** (MUST READ - understand Setup/Implementation/Architecture)
```
After:
```markdown
2. ✅ **Task Type Classification System** (MUST READ - understand Setup/Implementation/Architecture/Documentation)
```

**3b. Tasks Document Format template — subtask Type field (TWO identical occurrences, N.1 and N.2 example blocks):**

Before (each):
```markdown
    **Type**: [Setup | Implementation | Architecture]
```
After (each):
```markdown
    **Type**: [Setup | Implementation | Architecture | Documentation]
```

**3c. Section heading rename** (the current heading is already inaccurate — it contains four subsections including Parent Tasks):

Before:
```markdown
### Three Task Types
```
After:
```markdown
### Task Types
```

*Rationale for rename over re-counting: avoids "Three"→"Four"→"Five" churn and sidesteps the Parent question (Item 5). The docs MCP sectionId is stable across heading rewording; a rebuild is required at ratification regardless.*

**3d. New subsection** — insert after the "Architecture Tasks" block (after its "**Validation & Documentation**: Tier 3 - Comprehensive" line), BEFORE "#### Parent Tasks":

```markdown
#### Documentation Tasks

**Definition**: Writing work that produces or updates documentation artifacts

**Characteristics**:
- Produces or updates documentation files; no production code, test, or configuration behavior changes
- Success measured by artifact existence and content acceptance criteria (SHALL/SHALL NOT where relevant)
- No runtime risk; risk is informational (inaccuracy, staleness, broken cross-references)
- Steering/governance targets route through the ballot-measure model (agent drafts, Peter ratifies) and trigger a docs MCP rebuild
- Validated by artifact and content checks, not test suites

**Examples**:
- Author completion and summary documentation
- Deliver cross-spec handback or closeout notes
- Draft ballot-measure steering proposals
- Log deferred findings in the issues registry
- Write or update consumer-facing guides

**Validation & Documentation**: Tier 1 - Minimal (default; escalate to Tier 2 - Standard when the artifact carries contract semantics that other work depends on)
```

**3e. Classification Process step 5:**

Before:
```markdown
5. **Assign task type** (Setup, Implementation, or Architecture)
```
After:
```markdown
5. **Assign task type** (Setup, Implementation, Architecture, or Documentation)
```

**Considered and left unchanged**: the Classification System overview's "three-tier approach" phrasing — it refers to the three *validation tiers* (Tier 1/2/3), which this measure does not change.

---

## Item 4 — Ratification mechanics

On approval:
1. Apply Items 1–3 exactly as written (Thurgood applies; both docs are Civitas-owned infrastructure).
2. Bump `Last Reviewed` on both docs to the ratification date.
3. Rebuild the docs MCP index (`rebuild_index`) and verify healthy.
4. Verify metadata via `scripts/validate-steering-metadata.js`.

Task-Completion-Protocol (Layer 1) requires **no change** — it already enumerates Documentation and prescribes its parent-task sequence. This measure brings the Layer 2 docs into line with Layer 1 law.

---

## Item 5 — Scope decision for reviewers: the `Type: Parent` inconsistency

Process-Spec-Planning defines Parent Tasks (under the same Task Types section) but Process-Task-Type-Definitions omits it — and Spec 121-F1 mis-cited the taxonomy as "Setup/Implementation/Architecture/Parent," evidence the ambiguity confuses agents.

**Position: OUT of this ballot.** Parent is a structural scope marker (container vs. leaf), orthogonal to the work-type classification this measure fixes, and folding it in would turn an evidence-backed one-type reconciliation into a taxonomy redesign. Flagged as a follow-up governance item (candidate: a short PTTD note that Parent is a structural marker defined in Process-Spec-Planning, not a work type). Reviewers may vote to fold it in.

---

## Item 6 — Review path

Per the ballot-measure model (author → accuracy review → Peter ratifies):

- **Author**: Thurgood (this document)
- **Stacy** — required accuracy reviewer. Process quality and spec structure governance are her explicit stake (Spec-Feedback-Protocol stakeholder criteria); this measure changes the tasks.md authoring standard she audits against.
- **Ada + Lina** — lightweight consumer review (optional, one pass). They classify tasks in their specs daily; asked only: "do the definition, examples, and tier default match how you'd classify your documentation tasks?" (Both docs are Civitas-owned, so no domain-content adjudication is needed — this is consumer sanity-checking, not domain review.)
- **Peter** — ratifies, modifies, or rejects.

---

*Drafted by Thurgood, 2026-07-05. Law docs untouched pending ratification.*
