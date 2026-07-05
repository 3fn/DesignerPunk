# Ballot Measure: Define the Documentation Task Type

**Date**: 2026-07-05 (v2 — revised same day after review round)
**Author**: Thurgood (Civitas steward)
**Origin**: 2026-07-05 A9 governance review, finding F1
**Status**: **RATIFIED** (Peter, 2026-07-05, unmodified) — applied same day; see Ratification Record below
**Placement note**: Prior ballots were spec artifacts (`118/findings/task-11-ballot-proposal.md`, `117/completion/task-6-ballot-proposals.md`). This measure arises from a governance review, not a spec, so it lives here per the loose-convention fallback.

---

## Ratification Record

- **Ratified**: Peter, 2026-07-05, unmodified ("Ballot measure approved," delivered directly in the main-loop session).
- **Applied**: 2026-07-05 by the main loop (Peter's ratification was firsthand there; Thurgood correctly declined to execute on relayed authority — see governance note below). Items 1–3 applied exactly as written via a count-asserted scripted pass; metadata validation PASS; docs MCP index rebuilt; straggler sweep zero.
- **F2 rider (applied, Peter informed with veto open)**: Thurgood's pre-application verification found a FOURTH occurrence of the `**Type**:` template (PSP § "Blocked Tasks → Blocked Task Format", ~line 2696, 2-space indent) — missed by v1, by STACY-A2's count of three, and by v2. Same before→after as occurrence 3, applied under the measure's plain intent ("every enumeration gains Documentation"). Meta-note for the record: the enumerated-edit-list form missed a site even after a dedicated straggler hunt — the same lesson as Spec 122's §8 (hand-lists drift; sweeps catch what lists miss), which is why application ended with a mechanical zero-straggler grep rather than trusting the list.
- **Governance note (ruling superseded same day)**: Thurgood refused to apply on a coordinator-relayed claim of ratification. An earlier version of this note preserved that refusal as precedent; **Peter overruled that framing (2026-07-05)**: the refusal added friction to a true ratification while providing no protection against a false one (the relaying session held the same write access and applied the edits itself) — friction without protection is not a guardrail. The structural gap was that authority existed only as a message claim. **Resolution adopted (Peter, all three layers): the record-first ratification protocol** — see `.kiro/docs/ballots/README.md`; PR-approval-as-ratification at 125 Phase 0; the agent-facing verify-the-record-never-judge-the-relay rule propagated via 122's generated prompts. Neither rubber-stamping relayed claims nor refusing legitimate orchestration is the desired behavior; checking the committed record replaces both judgments.

---

## Review Round Record

Per Spec-Feedback-Protocol stamp format. Resolutions live here; the proposal body below is the clean, post-incorporation state.

#### [STACY R1] — APPROVE-WITH-AMENDMENTS (required reviewer)
- Verified every cited instance; corrected the corpus to **23 specs** (v1 claimed 12) → § "The Problem"
- A1: missed edit site — PSP § Guidance for AI Agents → Clear Classification step 1 → Item 3f
- A2: `**Type**:` template has THREE occurrences, not two (third at ~line 829, 2-space indent) → Item 3b
- A3: missed sites ~1088, ~1110 (keep Parent as-is), MCP query block, Quick Reference Tier 1 label → Items 3h–3k
- A4: missed sites ~1223 + Tier 1 documentation heading/lists → Items 3l–3m
- A5: v1's governance-routing characteristic retroactively outlawed documented practice (102 Task 1.8; specs 020/036) — soften to law-vs-spec-authorized distinction → Item 1 Characteristics
- A6: make Tier-2 escalation explicitly conjunctive (contract semantics AND cross-spec dependency; 124-T6 as Tier 1 counterexample); define what Tier 2 means for a doc task → Item 1 Validation Tier
- A7: reword PSP line 617 "three-tier approach" → "structured approach"; exempt "Why Three Tiers?" rationale as historical → Items 3g + "Considered and left unchanged"
- A8: add `Type: Guard` and `Type: Investigation` to the Item 5 follow-up flag → Item 5

#### [ADA R1] — CLEAR
- Suggested the mixed-task classification rule (one sentence, both surfaces) → Item 1 Characteristics + Item 3d, unified with Lina's rule as a single boundary principle
- **Caution on record**: the Tier-2 qualifier "that other specs' decisions depend on" must survive future editing — the loose "this doc is important" reading is the failure mode. A6's conjunctive form encodes this; any future rewording must preserve the conjunction.

#### [LINA R1] — NEEDS-CLARIFICATION (minor) — both items resolved below
- Metadata artifacts consumed by tooling (component schemas, `component-meta.yaml`) are Implementation, not Documentation → Item 1 Characteristics (unified boundary principle)
- Generalize "docs MCP rebuild" → "rebuild the affected MCP index" → Item 1 Validation Tier + Item 3d

#### [THURGOOD R2] — incorporation notes
- All of A1–A8 incorporated; corpus claim corrected to 23 specs / 123 instances (independently re-verified: grep over `.kiro/specs/*/tasks.md`).
- 102 Task 1.8 precedent independently verified: direct edit to `DesignerPunk-Integration-Guide.md` as Tier 1 Documentation under spec authority, no ballot — A5's softening is required, not optional.
- Ada's mixed-task rule + Lina's metadata rule woven as ONE boundary principle ("the output decides"), not two exceptions — per the reviewers' convergence.
- No feedback was declined.

---

## The Problem (evidence)

The task-type taxonomy disagrees with itself across three governance surfaces:

1. **Task-Completion-Protocol** (Layer 1, always-loaded) enumerates FOUR types — its parent-task sequence explicitly covers "(Setup or Documentation type)".
2. **`governance/Process-Task-Type-Definitions.md`** defines only THREE (Setup / Implementation / Architecture) — while its own frontmatter description already promises four ("Setup, Implementation, Architecture, and Documentation task types").
3. **`governance/Process-Spec-Planning.md`** enumerates three at multiple sites (`**Type**: [Setup | Implementation | Architecture]`, etc.) — while its "Three Task Types" heading already contains a fourth subsection (Parent Tasks).

Meanwhile, practice has used `Type: Documentation` for months: **123 instances across 23 specs' tasks.md files** (verified by Stacy in review, independently re-confirmed): 020, 031, 036, 040, 046, 047, 048, 053, 054a, 054b, 061, 068, 069, 073, 074, 077, 083, 101, 102, 107, 117, 118, 124. The gap causes real friction: **Spec 121's F1** discovered the missing definition mid-formalization and worked around it by classifying documentation work as Implementation — the opposite workaround from every other spec.

**Tier-derivation sample** (the instances used to derive the definition's validation-tier rule; the full corpus is the 23 specs above):

| Spec / Task | Work | Tier used |
|---|---|---|
| 124 Task 5 / 5.1 | Completion documentation authoring | Tier 1 |
| 124 Task 6 / 6.1 | Gated cross-spec handback to 118 | Tier 1 |
| 118 Task 5.2 | Exemption-boundary doc drafted + staged for ballot | **Tier 2** |
| 118 Task 6 / 6.1 | Spec 117 closeout note (SHALL/SHALL NOT contract content) | **Tier 2** |
| 117 Task 6.1 | Ballot-measure steering proposals | Tier 1 |
| 117 Task 6.2 | Issues-registry logging of deferred findings | Tier 1 |
| 102 Task 1.8 | Spec-authorized steering-doc update (Integration Guide) | Tier 1 |
| 101 (×2), 102 (×2 more), 077 (×3) | Consumer/user-facing docs, doc updates | Tier 1 |
| 020, 036, 040, 054a, 054b, 074, others | Steering/component/user doc work (pre-tier-metadata era or Tier 1) | Tier 1 / unstated |

**Tier pattern**: Tier 1 is the overwhelming default (artifact-existence + content checks, no test suite). The two Tier 2 instances (118) share TWO distinguishing properties *jointly*: the artifact carried SHALL/SHALL NOT contract semantics, AND another spec's decisions depended on it. 124 Task 6 is the discriminating counterexample — cross-spec dependency *without* contract semantics stayed Tier 1. The definition encodes this as a conjunctive escalation criterion rather than flattening the observed exception.

---

## Considered Alternative (counter-argument)

Spec 121-F1's workaround points the other way: abolish `Type: Documentation` and classify doc-producing work as Implementation with testable acceptance criteria. This has merit — it forces doc tasks to carry runnable checks. **Rejected because**: (a) Layer-1 law (Task-Completion-Protocol) already enumerates Documentation and prescribes its parent-task sequence ("verify artifacts," no test run); (b) practice is 123 instances across 23 specs vs one spec's workaround; (c) the definition below keeps the good part of 121's instinct by requiring content acceptance criteria and artifact validation. Ratifying this measure also retires 121-F1's premise ("there is no Documentation task type") going forward — no retroactive reclassification of 121's tasks.

---

## Item 1 — New section in Process-Task-Type-Definitions.md

Insert between the end of "Architecture Tasks" (after its Documentation Tier subsection, before `## Update History`):

```markdown
## Documentation Tasks

### Definition

Documentation tasks are **writing work that produces or updates documentation artifacts** — completion documentation, cross-spec handoffs and closeout notes, issues-registry entries, consumer-facing guides, and drafts or spec-authorized updates of governance/steering content. They change what the project knows and records, not what the code does: no production code, test, or configuration behavior is modified.

### Characteristics

- **Artifact-producing**: Creates or updates documentation files; success is measured by artifact existence and content matching stated acceptance criteria
- **Content acceptance criteria**: Well-formed Documentation tasks state what the artifact SHALL contain (and, where relevant, SHALL NOT contain)
- **No runtime risk**: Cannot break builds, tests, or shipped behavior; the risk is informational — inaccuracy, staleness, broken cross-references
- **The output decides the classification**: Documentation applies only to tasks whose *entire* output is documentation artifacts — content read by humans and agents, not executed or consumed by tooling. Two corollaries: a task that modifies code AND documentation is classified by the code work (Implementation or Architecture); and metadata artifacts consumed by tooling (component schemas, `component-meta.yaml`) are Implementation, not Documentation — writing work that changes shipped-tool behavior fails the "no configuration behavior" test
- **Governance routing**: When the target is governance *law* (task taxonomy, process standards, steering content whose change is not already authorized by an approved spec), the task produces a *proposal* — the edit routes through the ballot-measure model (agent drafts, Peter ratifies). Steering-doc updates that an approved spec explicitly authorizes proceed under that spec's authority (precedent: Spec 102 Task 1.8; Specs 020 and 036 are entire steering-doc specs). Either way, rebuild the affected MCP index after application
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

6. **Spec-authorized steering-doc updates**
   - Apply steering-doc changes an approved spec explicitly authorizes; rebuild the affected MCP index
   (Precedent: Spec 102 Task 1.8; Specs 020, 036)

### Validation Tier

**Tier 1: Minimal (default)**

Documentation tasks default to minimal validation because they carry no runtime risk and have artifact-based success criteria:

- Verify all specified artifacts were created or updated
- Verify content satisfies the task's stated success criteria
- Verify cross-references resolve
- For governance/steering artifacts: metadata validates (`scripts/validate-steering-metadata.js`) and the affected MCP index is rebuilt after application

**Escalation to Tier 2 - Standard (planner's option)**: Escalate only when BOTH conditions hold — the artifact carries SHALL/SHALL NOT contract semantics, AND another spec's decisions depend on the artifact. The criterion is conjunctive: cross-spec dependency alone does not escalate (Spec 124 Task 6 — a gated cross-spec handback without contract semantics — stayed Tier 1), and neither does "this document is important." (Precedent for escalation: Spec 118 Tasks 5.2 and 6, which had both properties.)

**What Tier 2 means for a Documentation task**: all Tier 1 checks, PLUS per-criterion verification that each stated SHALL is satisfied and each stated SHALL NOT is absent from the artifact, PLUS verification that the receiving spec's cross-reference exists and resolves. (Grounded in Spec 118 Tasks 5.2/6 practice.)

### Documentation Tier

**Tier 1: Minimal**

Documentation tasks use minimal completion documentation:

- **Artifacts Created/Updated**: List of documentation files created or changed
- **Implementation Notes**: Brief description of what was written and any routing (ballot staging, MCP index rebuild)
- **Validation**: Document Tier 1 validation results (or Tier 2, if escalated)
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

**Pattern**: Tasks that produce or update documentation artifacts (completion docs, cross-spec handbacks, ballot proposals, issues-registry entries, consumer docs, spec-authorized steering updates) with no production code changes.
**Classification Decision**: Documentation (new task type)
**Rationale**: Practice used `Type: Documentation` in 123 tasks across 23 specs while this document defined only three types; Task-Completion-Protocol (Layer 1) already enumerated four. Ratified via ballot measure (2026-07-05, from the A9 governance review; reviewed by Stacy, Ada, Lina) to reconcile law with practice. Default Tier 1 - Minimal; escalate to Tier 2 only when the artifact BOTH carries SHALL/SHALL NOT contract semantics AND other specs' decisions depend on it (precedent: Spec 118 Tasks 5.2, 6; counterexample: Spec 124 Task 6 stayed Tier 1). Classification follows the output: mixed code+doc tasks are classified by the code work; tooling-consumed metadata is Implementation.
**Decided By**: Peter Michaels Allen + Thurgood
**Examples**: Spec 124 Tasks 5, 6; Spec 118 Tasks 5.2, 6; Spec 117 Tasks 6.1, 6.2; Spec 102 Task 1.8; Specs 101/077 doc tasks.
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

**3b. `**Type**:` template field — THREE occurrences** (count corrected per STACY-A2; v1 said two):

Occurrences 1 and 2 — Tasks Document Format template, N.1 and N.2 example blocks (4-space indent, followed by **Validation** and **Agent** fields). Before (each):
```markdown
    **Type**: [Setup | Implementation | Architecture]
```
After (each):
```markdown
    **Type**: [Setup | Implementation | Architecture | Documentation]
```

Occurrence 3 — § "Integration with Tasks Document Format" (~line 829; 2-space indent, no **Agent** field). Before:
```markdown
  **Type**: [Setup | Implementation | Architecture]
```
After:
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
- Applies only when the *entire* output is documentation artifacts: mixed code+doc tasks are classified by the code work (Implementation/Architecture), and tooling-consumed metadata (component schemas, `component-meta.yaml`) is Implementation, not Documentation
- Success measured by artifact existence and content acceptance criteria (SHALL/SHALL NOT where relevant)
- No runtime risk; risk is informational (inaccuracy, staleness, broken cross-references)
- Governance-*law* targets route through the ballot-measure model (agent drafts, Peter ratifies); spec-authorized steering updates proceed under the spec's authority; rebuild the affected MCP index after application either way
- Validated by artifact and content checks, not test suites

**Examples**:
- Author completion and summary documentation
- Deliver cross-spec handback or closeout notes
- Draft ballot-measure steering proposals
- Log deferred findings in the issues registry
- Write or update consumer-facing guides
- Apply spec-authorized steering-doc updates

**Validation & Documentation**: Tier 1 - Minimal (default; escalate to Tier 2 - Standard only when the artifact BOTH carries SHALL/SHALL NOT contract semantics AND other specs' decisions depend on it)
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

**3f. § Guidance for AI Agents → Clear Classification, step 1** (added per STACY-A1):

Before:
```markdown
1. Assign appropriate type (Setup, Implementation, Architecture)
```
After:
```markdown
1. Assign appropriate type (Setup, Implementation, Architecture, Documentation)
```

**3g. § Task Type Classification System → Overview, first sentence** (added per STACY-A7; v1 left this unchanged):

Before:
```markdown
The Task Type Classification System provides a three-tier approach to categorizing tasks based on their complexity, risk, and nature of work. Task types are determined during the planning phase (when creating tasks.md) and guide the appropriate level of validation and completion documentation during execution.
```
After:
```markdown
The Task Type Classification System provides a structured approach to categorizing tasks based on their complexity, risk, and nature of work. Task types are determined during the planning phase (when creating tasks.md) and guide the appropriate level of validation and completion documentation during execution.
```

**3h. § Three-Tier Validation System → Overview** (added per STACY-A3; Parent kept as-is):

Before:
```markdown
The Three-Tier Validation System aligns validation depth with task complexity and risk. Each task type (Setup, Implementation, Architecture, Parent) has a corresponding validation tier that specifies the checks required before marking a task complete.
```
After:
```markdown
The Three-Tier Validation System aligns validation depth with task complexity and risk. Each task type (Setup, Implementation, Architecture, Documentation, Parent) has a corresponding validation tier that specifies the checks required before marking a task complete.
```

**3i. § Validation Tier Definitions, first sentence** (added per STACY-A3; Parent kept as-is, Documentation mapped to its actual tier):

Before:
```markdown
The three validation tiers (Minimal, Standard, Comprehensive) align with task types (Setup, Implementation, Architecture/Parent). Each tier specifies the required checks before marking a task complete.
```
After:
```markdown
The three validation tiers (Minimal, Standard, Comprehensive) align with task types (Setup/Documentation, Implementation, Architecture/Parent). Each tier specifies the required checks before marking a task complete.
```

**3j. § Validation Tier Definitions, MCP query block** (added per STACY-A3):

Before:
```markdown
get_section({ path: "process-task-type-definitions", heading: "Setup Tasks" })
get_section({ path: "process-task-type-definitions", heading: "Implementation Tasks" })
get_section({ path: "process-task-type-definitions", heading: "Architecture Tasks" })
```
After:
```markdown
get_section({ path: "process-task-type-definitions", heading: "Setup Tasks" })
get_section({ path: "process-task-type-definitions", heading: "Implementation Tasks" })
get_section({ path: "process-task-type-definitions", heading: "Architecture Tasks" })
get_section({ path: "process-task-type-definitions", heading: "Documentation Tasks" })
```

**3k. § Validation Tier Definitions → Quick Reference, Tier 1 line** (added per STACY-A3):

Before:
```markdown
- **Tier 1 (Setup)**: Syntax validation, artifact verification, basic structure check
```
After:
```markdown
- **Tier 1 (Setup/Documentation)**: Syntax validation, artifact verification, basic structure check
```

**3l. § Three-Tier Completion Documentation System → Overview** (added per STACY-A4; Parent kept as-is):

Before:
```markdown
The Three-Tier Completion Documentation System aligns documentation detail with task complexity and type. Each task type (Setup, Implementation, Architecture, Parent) has a corresponding documentation tier that specifies the required sections and level of detail for completion documentation.
```
After:
```markdown
The Three-Tier Completion Documentation System aligns documentation detail with task complexity and type. Each task type (Setup, Implementation, Architecture, Documentation, Parent) has a corresponding documentation tier that specifies the required sections and level of detail for completion documentation.
```

**3m. § Tier 1: Minimal Documentation — heading + load-when + when-to-apply** (added per STACY-A4):

Before:
```markdown
### Tier 1: Minimal Documentation (Setup Tasks)
```
After:
```markdown
### Tier 1: Minimal Documentation (Setup and Documentation Tasks)
```

Before (Load when list, first bullet):
```markdown
- Documenting Setup task completion (Tier 1)
```
After:
```markdown
- Documenting Setup or Documentation task completion (Tier 1)
```

Before (When to Apply list):
```markdown
**When to Apply**:
- Setup tasks (directory creation, configuration files, dependency installation)
- Low complexity, low risk work
- Straightforward operations with clear outcomes
```
After:
```markdown
**When to Apply**:
- Setup tasks (directory creation, configuration files, dependency installation)
- Documentation tasks (completion docs, handbacks, guides — Tier 1 default)
- Low complexity, low risk work
- Straightforward operations with clear outcomes
```

**Considered and left unchanged** (per STACY-A7, exemption option chosen): the § "Rationale for Three-Tier Approach" narrative — including "Why Three Tiers?" and its "Three task types provide clear, objective classification criteria" passage — is the historical F1-vs-F2 origin story for the *validation/documentation tier* system and is exempted as historical rationale, not current enumeration. The three validation tiers themselves are unchanged by this measure (Documentation maps to Tier 1), so the section's tier-count claims remain true. If the type enumeration inside it proves misleading in practice, a rationale-section refresh is follow-up governance material (see Item 5's follow-up flag).

---

## Item 4 — Ratification mechanics

On approval:
1. Apply Items 1–3 exactly as written (Thurgood applies; both docs are Civitas-owned infrastructure).
2. Bump `Last Reviewed` on both docs to the ratification date.
3. Rebuild the affected MCP index (here: the docs MCP, `rebuild_index`) and verify healthy.
4. Verify metadata via `scripts/validate-steering-metadata.js`.

Task-Completion-Protocol (Layer 1) requires **no change** — it already enumerates Documentation and prescribes its parent-task sequence. This measure brings the Layer 2 docs into line with Layer 1 law.

---

## Item 5 — Scope decision for reviewers: undefined types still in the wild

Process-Spec-Planning defines Parent Tasks (under the same Task Types section) but Process-Task-Type-Definitions omits it — and Spec 121-F1 mis-cited the taxonomy as "Setup/Implementation/Architecture/Parent," evidence the ambiguity confuses agents. Additionally (per STACY-A8), Spec 118's tasks.md uses two more types defined nowhere: **`Type: Guard`** (Tasks 5.x guard suites) and **`Type: Investigation`** (Tasks 2.x, 7 evidence-gathering work).

**Position: OUT of this ballot.** Parent is a structural scope marker (container vs. leaf), and Guard/Investigation are so far single-spec patterns; folding any of them in would turn an evidence-backed one-type reconciliation into a taxonomy redesign. All three are flagged as one follow-up governance item: reconcile Parent (candidate: a short PTTD note that it is a structural marker defined in Process-Spec-Planning, not a work type) and decide whether Guard/Investigation are emerging types warranting definition or 118-local improvisations to be reclassified. Reviewers may vote to fold any of these in. *(Review outcome: no reviewer voted to fold them in; the flag stands as scoped.)*

---

## Item 6 — Review path (status: review round COMPLETE)

Per the ballot-measure model (author → accuracy review → Peter ratifies):

- **Author**: Thurgood (v1 2026-07-05; v2 same day incorporating all review feedback)
- **Stacy** (required, process-quality stake): **APPROVE-WITH-AMENDMENTS** — all 8 amendments incorporated (see Review Round Record)
- **Ada** (consumer review): **CLEAR** — mixed-task rule incorporated; conjunctive Tier-2 caution on record
- **Lina** (consumer review): **NEEDS-CLARIFICATION (minor)** — both items resolved in this revision
- **Remaining step**: **Peter** ratifies, modifies, or rejects.

---

*Drafted by Thurgood, 2026-07-05; revised same day after review round. Law docs untouched pending ratification.*
