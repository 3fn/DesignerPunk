---
id: completion-documentation-guide
inclusion: manual
name: Completion-Documentation-Guide
description: Comprehensive completion and summary documentation guide — two-document workflow, documentation tiers, parent success-criteria fidelity (the verbatim criteria table, Evidence cell, forced-negative line and Additional verification section), naming conventions, document templates, and cross-references. Load when creating completion docs, writing summary docs, or completing parent tasks.
---

# Completion Documentation Guide

**Date**: 2026-01-03
**Last Reviewed**: 2026-09-19
**Purpose**: Comprehensive guide for creating completion and summary documentation
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: all-tasks

---

## Overview

This guide consolidates all guidance for creating completion documentation, including:
- When to create completion docs (subtasks vs parent tasks)
- What content to include (documentation tiers)
- Where to place files (directory structure)
- How to name files (naming conventions)
- Why summary docs matter (release-note source material)

**Key Principle**: Parent task completion requires TWO documents - a detailed completion doc for internal knowledge preservation and a summary doc as public-facing release-note source material.

---

## Two-Document Workflow

### Why Two Documents?

Parent task completion produces two complementary documents:

| Document Type | Location | Purpose | Audience |
|---------------|----------|---------|----------|
| **Detailed Completion Doc** | `.kiro/specs/[spec-name]/completion/` | Comprehensive internal documentation | Internal team, knowledge preservation |
| **Summary Doc** | `docs/specs/[spec-name]/` | Concise, commit-style summary | Public-facing, release-note source |

**Rationale**:
- **Dual Purpose**: Summary documents are the concise, public-facing record of each parent task — the source material the release recipe reads when authoring release notes.
- **Clear Separation**: Detailed completion docs (internal knowledge preservation) remain in `.kiro/`, while summaries (public-facing) live in `docs/`.
- *(Historical: the `docs/`-placement also served a Kiro release-detection hook, deleted 2026-08-12 — Q6 ballot. The placement stays: the public/internal split earns it on its own.)*

### When to Create Each Document

| Task Type | Detailed Completion Doc | Summary Doc |
|-----------|------------------------|-------------|
| **Subtask** | ✅ Required | ❌ Not required |
| **Parent Task** | ✅ Required (Tier 3) | ✅ Required |
| **Setup Task** | ✅ Required (Tier 1) | ❌ Not required (unless parent) |
| **Documentation Task** | ✅ Required (Tier 1) | ❌ Not required (unless parent) |
| **Implementation Task** | ✅ Required (Tier 2) | ❌ Not required (unless parent) |
| **Architecture Task** | ✅ Required (Tier 3) | ❌ Not required (unless parent) |

**Key Rule**: Summary docs are ONLY created for parent tasks, not subtasks.

---

## Documentation Tiers

Documentation tiers define the depth and comprehensiveness of completion documentation based on task type.

### Quick Reference

| Tier | Task Types | Documentation Depth |
|------|------------|---------------------|
| **Tier 1: Minimal** | Setup, Documentation | Artifact verification, basic notes |
| **Tier 2: Standard** | Implementation | Functional validation, implementation details |
| **Tier 3: Comprehensive** | Architecture, Parent Tasks | Full validation, architecture decisions, lessons learned |

### Tier Details

**For complete tier definitions and templates**, query Spec Planning Standards via MCP:

```
get_section({ path: "process-spec-planning", heading: "Three-Tier Completion Documentation System" })
```

---

## Parent Success-Criteria Fidelity

**In force from the ratification date recorded in `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`.** Parents completed before that date are not bound — there is no backfill. A parent in a spec that was in flight at ratification may carry the fixed-string exemption below.

### The rule

A parent task's completion doc SHALL reproduce **every** success criterion defined for that parent in `tasks.md` — **verbatim, in full: none dropped, none reworded, none added** (an exact set) — as a table with three mandatory columns:

| Criterion (verbatim) | Status | Evidence |
|---|---|---|

The rule binds parents in specs whose `tasks.md` declares `**Criteria mode**: per-parent`. A `spec-level` spec discharges once, at closeout, through the claims pass. A parent MAY declare `**Success Criteria:** none — <one-line reason>`, which waives **the criteria table only** — the Additional verification section below remains owed wherever it applies.

### Status vocabulary

- **✅ verified met**
- **⚠️ verified unmet or partial** — a ⚠️ row **MUST link a tracking issue or follow-up task**
- **❌ verified absent** — the "3.3 pattern": a tested module was created, and the seam it was meant to reach was never touched

Each mark SHALL reflect a check **actually performed against shipped source, never against intent or effort**. **A ✅ with an empty or prose-only Evidence cell is non-compliant on its face.**

### The Evidence cell — exactly four kinds

Every row carries evidence of one of four kinds. Nothing else qualifies.

1. **An artifact path** — `src/tokens/color/primitives/chromatic.ts`; `.kiro/specs/<spec>/reports/implementation-ios.md#navigation-stack`
2. **A test name** — `SemanticColorContrast.test.ts › success.text meets AA on canvas`; a jest suite or describe name
3. **A command + its result** — `npx tsc --noEmit → 0 errors`; `npm run check:drift → drift: none (3 platforms)`
4. **A decision record / approval citation** — which **MUST cite a locatable record**. The kinds that qualify span both tiers deliberately: a **ballot path with a section** (`.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md § 8`); a **dated approval note**; a **commit SHA**; a **PR review comment** (*"Approved in PR #123 review comment, 2026-09-15"*); a **design-critique note**; a **dated design-outline decision** (`design-outline.md § 8 Q1 RESOLVED (Peter, 2026-09-19)`). "Approved by Leonardo" with nothing to open is not a decision record.

### How a cell is compared — the four normalization rules

The `Criterion (verbatim)` cell is compared to its `tasks.md` bullet after exactly four normalizations, applied in order:

- **(i)** table-pipe escapes are unescaped — `\|` → `|`
- **(ii)** `<br>` and `<br/>` tags become a single space
- **(iii)** runs of Unicode whitespace collapse to a single space, and both ends are trimmed. **Rule (iii)'s scope is bounded, not exemplified**: it covers characters carrying the Unicode `White_Space` property — space, tab, line breaks, no-break space (U+00A0), thin space (U+2009), narrow no-break space (U+202F), and the rest of that property's set — **plus zero-width space (U+200B), zero-width non-joiner (U+200C), zero-width joiner (U+200D) and BOM (U+FEFF), which are stripped.** Those are the invisible copy-paste artifacts that arrive from Figma and spreadsheets: the same non-authorial class as a line wrap.
- **(iv)** **nothing else.** No case folding. No punctuation or markdown normalization. **Bold, backticks, arrows, math glyphs and platform phrasing reproduce exactly.**

Set comparison is **multiset equality, order-insensitive**: reordering is not a mutation class, and two identical bullets cannot collapse into one row.

**This list is closed-but-extendable by recorded amendment only.** If an exotic rendering artifact produces a false red, that is a loud, author-fixable failure — and if the artifact is genuinely non-authorial, the remedy is **an amendment to this list, with a record**, never a silent widening. A quietly growing normalization list is how verbatim comparison rots into fuzzy matching. Compressed criterion labels failing is the **intended** adoption cost: compression relocates to the Evidence cell, where this rule already demands content.

### The forced-negative line

Immediately after the table, the doc SHALL carry:

```
Unmet or partially met criteria: None
```

— or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.)

### Additional verification — required if applicable, never optional

WHEN the parent's `tasks.md` block defines promise blocks beyond Success Criteria — the closed vocabulary being `**Primary Artifacts:**` and gate clauses under the frozen label `**Merge gate:**` — THEN the completion doc SHALL carry an **"Additional verification"** section containing:

- **Gate conditions as criterion-style rows** — `Condition (verbatim) | Status | Evidence` — **evaluated under the same predicate as the criteria table**: verbatim cells, multiset equality against the `**Merge gate:**` bullets, a Status mark and an Evidence cell on every row. **Shape alone is not parity.**
- **Primary Artifacts as a single forced-negative line**: `Primary Artifacts: all shipped as declared` — or each deviation listed with its link.
- **A deliberate later-unit delivery, declared in the FIXED machine-readable form**, one line per deferred artifact:

  ```
  Artifact deferred: <path> → <unit>
  ```

  Path and delivering unit are extractable by rule. **A free-prose deferral is non-compliant** and earns no exclusion anywhere. (`->` is accepted at parse; `→` is the taught spelling.)

**The criteria table admits ONLY criteria.** Gate conditions and artifacts live in this section — never as extra rows in the criteria table.

A declared-none parent still owes this section wherever it applies: **declaring no criteria waives the table, never the Additional verification duties.**

### The in-flight exemption — one fixed string, no sunset

A parent that would otherwise owe the table, in a spec that was in flight at ratification, MAY carry, verbatim:

```
Criteria fidelity: exempt — spec in flight at ratification (<date>)
```

**Free-prose exemptions are non-compliant.** A freely-phrased exemption is an unfalsifiable claim — the failure mode this rule exists to close, wearing a different hat.

The string is required **only where a parent would otherwise owe the table**. A spec that defines no per-parent criteria is outside the rule entirely: no string, no noise.

**There is no sunset clause**, and the ground of that decline binds: the tightening was declined because **the claims-pass machinery is the abuse detector** — so **fixed-string exemption usage is a named counting duty of every claims pass**. And an exemption from the table format is **never** an exemption from being audited: every spec closing after ratification owes a claims pass regardless of exemption status.

### Why exact-set — the six mutation classes

The rule is exact-set because self-authored verification tables fail in six named ways. Five were measured in one spec's completion docs; the sixth was found in the same corpus.

| Class | What it looks like |
|---|---|
| **drop** | an unmet criterion is simply absent from the table |
| **reword** | *"all semantic pairs **pass** AA"* becomes *"**evaluated** against AA"*, marked ✅ |
| **relax** | a ratified threshold (`ΔE₀₀ < 1`) is restated at the value that happens to pass (`< 3`) |
| **omit-doc** | the required completion or summary doc is never written, so no table exists to police |
| **invent** | a criterion appears in the table that `tasks.md` never defined |
| **absorb** | two criteria are merged into one row — **harm stated accurately: the enumerated set stops mapping 1:1 to the promise set**, so a per-criterion verdict can no longer be read off the table even when nothing is hidden |

### Two authoring notes

1. **Copy the `tasks.md` bullet; never retranscribe it.** Retyping is where math-glyph and punctuation drift is produced, and normalization friction will concentrate there.
2. **The decomposition-scope boundary.** Success Criteria bullets decompose per-platform (the convention is in Process-Spec-Planning § "`tasks.md` Structural Conventions"). A `**Primary Artifacts:**` line that bundles platforms does **not** decompose — it has its own remedy in the Additional verification section's forced-negative line.

### Authoring guidance — what each platform bullet verifies against

*(Guidance, not a compliance condition. A missing reference is a quality observation at a claims pass; it is never a rule violation, and no check reads for it.)*

Each per-platform criterion bullet reads best when it names **what it verifies against** — on the product side, the screen spec, or the component contract / token / pattern it delegates to; illustratively on the system side, the registry, a formula, or platform-specific reference documentation. These are examples, not an exhaustive or ruled list. The same question is asked at the tasks feedback round by the verifiability lens.

### The instrument's honest reach

A verifier who inherits an over-claimed instrument inherits the author's blind spot, so the limits are stated where the rule is taught:

- **An Evidence cell containing a plausible-looking path is green to the checker regardless of whether the claim is true.** Format compliance is not truth.
- **For iOS and Android, "command + result" Evidence is trust-the-reported-result for any verifier in this environment** — nothing in this repository compiles generated Swift or Kotlin. The gap is chartered at `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`; until it closes, the honest form of an unverifiable platform row is `not re-verified — toolchain unavailable`, and such a row is **never rolled into a ✅**.
- **Artifact truth — did the promised artifact actually ship — is owned by the claims pass today**, as judgment. Its registered mechanical successor is `promised-artifact-exists` (`governance/classification-map.md § "promised-artifact-exists"`), which is **proposed and unbuilt**; until it is built and reading, the pass owns promised-artifact gaps.

> **Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.**

---

## Naming Conventions

### Detailed Completion Documents

**Location**: `.kiro/specs/[spec-name]/completion/`

| Task Type | Naming Pattern | Example |
|-----------|----------------|---------|
| Parent Task | `task-N-completion.md` | `task-1-completion.md` |
| Subtask | `task-N-M-completion.md` | `task-1-1-completion.md`, `task-2-3-completion.md` |

**Examples**:
```
.kiro/specs/cross-platform-build-system/completion/
├── task-1-completion.md           # Parent task 1 completion
├── task-1-1-completion.md         # Subtask 1.1 completion
├── task-1-2-completion.md         # Subtask 1.2 completion
├── task-2-completion.md           # Parent task 2 completion
├── task-2-1-completion.md         # Subtask 2.1 completion
└── task-2-2-completion.md         # Subtask 2.2 completion
```

### Summary Documents

**Location**: `docs/specs/[spec-name]/`

| Document Type | Naming Pattern | Example |
|---------------|----------------|---------|
| Parent Task Summary | `task-N-summary.md` | `task-1-summary.md`, `task-10-summary.md` |

**Hook Pattern**: `**/task-*-summary.md` - must have "task-" prefix and "-summary.md" suffix

**Examples**:
```
docs/specs/cross-platform-build-system/
├── task-1-summary.md              # Parent task 1 summary
├── task-2-summary.md              # Parent task 2 summary
└── task-10-summary.md             # Parent task 10 summary
```

---

## Directory Structure

### Two-Directory Structure

```
docs/specs/[spec-name]/                   # Public-facing documentation
├── task-1-summary.md                     # ✅ Parent task summary (release-note source)
├── task-2-summary.md                     # ✅ Parent task summary (release-note source)
└── task-N-summary.md                     # ✅ Parent task summary (release-note source)

.kiro/specs/[spec-name]/                  # Internal documentation (NO HOOK TRIGGERS)
├── requirements.md                        # ❌ Spec requirements (no hook trigger)
├── design.md                             # ❌ Spec design (no hook trigger)
├── tasks.md                              # ❌ Implementation tasks (no hook trigger)
└── completion/                           # ❌ Completion documentation (no hook trigger)
    ├── task-1-completion.md              # Parent task detailed docs
    ├── task-1-1-completion.md            # Subtask completion docs
    ├── task-1-2-completion.md            # Subtask completion docs
    └── task-2-completion.md              # Parent task detailed docs
```

### Key Distinctions

| Location | Purpose | Hook Trigger | Audience |
|----------|---------|--------------|----------|
| `docs/specs/[spec-name]/` | Concise summaries | — (hook retired) | Public-facing, release-note source |
| `.kiro/specs/[spec-name]/completion/` | Comprehensive docs | ❌ No | Internal, knowledge preservation |

---

## Document Templates

### Detailed Completion Document (Tier 2 Example)

```markdown
# Task N.M Completion: [Task Title]

**Date**: YYYY-MM-DD
**Task**: N.M [Task description from tasks.md]
**Type**: Implementation
**Status**: Complete
**Delegated-tier** _(optional — include ONLY if the executing agent/model diverged from the task's planned `**Agent**: <agent> (<Model>)`)_: planned `<agent> (<Model>)` → actual `<agent> (<Model>)` — <one-line reason; flag whether it was agent-evolution (routing/scope) or model-evolution (cognitive-demand)>. See `process-orchestration-model-selection`.

---

## Artifacts Created

- `path/to/file1.ts` - Description of what was created
- `path/to/file2.ts` - Description of what was created

## Implementation Details

### Approach

[Describe the implementation approach taken]

### Key Decisions

[Document any significant decisions made during implementation]

### Integration Points

[Describe how this integrates with other components]

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ TypeScript compilation passes
- ✅ ESLint passes

### Functional Validation
- ✅ [Specific test or validation performed]
- ✅ [Another validation]

### Requirements Compliance
- ✅ Requirement X.Y: [How it was satisfied]
```

### Summary Document Template

```markdown
# Task N Summary: [Brief Task Title]

**Date**: YYYY-MM-DD
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: [spec-name]

## What Was Done

[2-3 sentences describing what was implemented]

## Why It Matters

[1-2 sentences on business value or technical benefit]

## Key Changes

- [Change 1]
- [Change 2]
- [Change 3]

## Impact

- ✅ [Positive impact 1]
- ✅ [Positive impact 2]

---

*For detailed implementation notes, see [task-N-completion.md](../../.kiro/specs/[spec-name]/completion/task-N-completion.md)*
```

---

## Cross-References

### From Summary to Detailed Docs

Summary documents should include a link to the detailed completion document at the end:

```markdown
---

*For detailed implementation notes, see [task-N-completion.md](../../.kiro/specs/[spec-name]/completion/task-N-completion.md)*
```

**Example** from `docs/specs/release-detection-trigger-fix/task-1-summary.md`:
```markdown
---

*For detailed implementation notes, see [task-1-completion.md](../../.kiro/specs/release-detection-trigger-fix/completion/task-1-completion.md)*
```

### From Detailed Docs to Summary (Optional)

Detailed completion documents can optionally link to the summary document:

```markdown
## Related Documentation

- [Task N Summary](../../../../docs/specs/[spec-name]/task-N-summary.md) - Public-facing summary that triggered release detection
```

### Relative Path Calculation

| From | To | Path |
|------|-----|------|
| Summary → Detailed | `docs/specs/[spec]/` → `.kiro/specs/[spec]/completion/` | `../../.kiro/specs/[spec]/completion/task-N-completion.md` |
| Detailed → Summary | `.kiro/specs/[spec]/completion/` → `docs/specs/[spec]/` | `../../../../docs/specs/[spec]/task-N-summary.md` |

---

## Release Detection Integration

### How Summary Documents Feed Release Notes

1. **Summary document created** in `docs/specs/[spec-name]/`
2. **At release time**, the release author derives the shipped delta from squash-commit titles since the last tag (`git log <last-tag>..main --oneline`) and reads summary docs for each change's substance and classification (🔴/🟡/🔵)
3. **Release notes are hand-authored** at `docs/releases/release-X.Y.Z.md` from that material — summaries are the notes' source, and the durable per-task record

*(The automated release tool that formerly scanned summaries was retired 2026-08-12 — Q6 ballot `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md`. See Release Management System § "The Release Recipe".)*

---

## Common Mistakes to Avoid

### ❌ Wrong Summary Document Location

```bash
# WRONG - This won't trigger hooks (.kiro/ directory is filtered)
.kiro/specs/[spec-name]/task-1-summary.md

# CORRECT - This triggers hooks
docs/specs/[spec-name]/task-1-summary.md
```

### ❌ Wrong Naming Format

```bash
# WRONG - These don't match hook pattern
task-1-1-summary.md      # Subtask format
task-1-completion.md     # Completion doc format
summary-task-1.md        # Wrong order

# CORRECT - Matches **/task-*-summary.md pattern
task-1-summary.md
task-10-summary.md
```

### ❌ Creating Summary for Subtasks

Summary documents are ONLY for parent tasks. Subtasks only need detailed completion docs.


## Workflow Checklist

### For Subtasks

- [ ] Complete subtask work
- [ ] Create detailed completion doc: `.kiro/specs/[spec-name]/completion/task-N-M-completion.md`
- [ ] Mark subtask complete using `taskStatus` tool
- [ ] STOP and wait for user authorization

### For Parent Tasks

- [ ] Complete all subtasks first
- [ ] Run validation (`npm test` or `npm run test:all`)
- [ ] Create detailed completion doc: `.kiro/specs/[spec-name]/completion/task-N-completion.md`
- [ ] Reproduce every `tasks.md` success criterion verbatim with Status + Evidence, carry the forced-negative line, and add the Additional verification section if the parent declares `**Primary Artifacts:**` or `**Merge gate:**` (§ "Parent Success-Criteria Fidelity")
- [ ] Create summary doc: `docs/specs/[spec-name]/task-N-summary.md`
- [ ] Mark parent task complete using `taskStatus` tool
- [ ] Complete the parent on its unit branch: `./.kiro/hooks/complete-task.sh "..."` — completion and summary docs travel on the branch.
   - **If this parent IS its own merge unit** (a standalone task, or a small single-unit spec): the tooling opens the PR.
   - **If this parent is one of several in a declared multi-parent unit** (spec's tasks.md unit grouping): the tooling commits the docs on the branch — **no PR yet**; the PR opens at UNIT completion.
- [ ] STOP — if a PR opened, report the PR URL; otherwise report the on-branch parent completion. The task is **accepted when the UNIT merges**.

---

## Related Documentation

- **Spec Planning Standards** - Documentation tier definitions and templates
- **Development Workflow** - Task completion workflow steps
- **File Organization Standards** - Metadata and directory structure
- **Release Management System** - Release detection pipeline

**MCP Queries**:
```
get_section({ path: "process-spec-planning", heading: "Three-Tier Completion Documentation System" })
get_section({ path: "process-development-workflow", heading: "Task Completion Workflow" })
get_section({ path: "release-management-system", heading: "The Release Recipe" })
```
