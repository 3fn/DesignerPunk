---
id: completion-documentation-guide
inclusion: manual
name: Completion-Documentation-Guide
description: Comprehensive completion and summary documentation guide — two-document workflow, documentation tiers, naming conventions, document templates, and cross-references. Load when creating completion docs, writing summary docs, or completing parent tasks.
---

# Completion Documentation Guide

**Date**: 2026-01-03
**Last Reviewed**: 2026-07-05
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
