# Doc Inventory — Spec 119-A, Task 1 (Subtasks 1.1 + 1.2)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 1 — Doc Inventory + Comprehensive Steering-Path Coupling Sweep
**Author**: Thurgood (Civitas steward)
**Status**: Foundation artifact — introduces no code, modifies no document content
**Companion artifact**: `coupling-sweep.md` (Subtasks 1.3 + 1.4)

> **What this is.** The authoritative enumeration of every steering doc with current path, current `inclusion` mode, and intended post-migration role (identity / relocated / removed). This is a *re-audit against the live tree*, not a transcription of the spec's recorded figures. Where my verification diverges from the spec it is flagged explicitly.
>
> **Source of truth (Req 1 AC3).** "What exists" is established from the **MCP doc index** (`find_docs({ list: true })`), cross-checked against an on-disk enumeration of `.kiro/steering/`. No Documentation Directory artifact was consulted (it is dropped — Req 11).

---

## 1. Verified doc count (Subtask 1.1 / Req 1 AC2)

| Source | Count |
|---|---|
| On-disk `.kiro/steering/*.md` (top-level) | **89** |
| On-disk recursive (`find … -name '*.md'`) | **89** (no subdirectories exist under `.kiro/steering/`) |
| Docs MCP index (`get_index_health.documentsIndexed`) | **89** |
| `find_docs({ list: true })` result count | **89** |

**Verdict: exactly 89. No drift from the spec's "89 docs, verified 2026-06-27."** Disk and MCP index agree filename-for-filename (cross-checked the full 89-name list both ways). Index health is `healthy`, last indexed `2026-06-29T14:10:26Z`, 0 errors / 0 warnings.

This figure is a **gate assertion target** — the build-time uniqueness guard (Task 4) expects `totalDocs === 89`, the `id` backfill (Task 4.3) writes 89 `id:` values, and `sync-manifest.json` carries 89 path-keyed entries (verified — see `coupling-sweep.md`).

---

## 2. Role-assignment breakdown (Req 1 AC1)

| Role | Count | Definition |
|---|---|---|
| **identity** (stays in `.kiro/steering/`, `always`) | **8 on disk** (+1 NEW) | The locked identity always-set per Req 6 AC1 / design two-root topology. |
| **relocated** (→ `governance/`) | **80** | Every non-identity, non-removed doc. |
| **removed** | **1** | `00-Steering Documentation Directional Priorities.md` (the meta-guide leak-source, Req 11). |
| **TOTAL** | **89** | 8 + 80 + 1 = 89. ✓ |

**No un-assignable docs** — every one of the 89 maps cleanly to a role (Req 1 AC5: no explicit exceptions surfaced). See § 5 for the one role-adjacent nuance worth Peter's eye (the NEW 9th identity doc).

### 2a. The identity always-set (the locked ~9, Req 6 AC1)

The design's "identity always-set" is **9 docs**, but only **8 exist on disk today**. The 9th — **Task Completion Protocol** — is **NEW and does not yet exist** (authored in Task 8.1). So the on-disk identity count is 8; the post-119-A identity count is 9.

| Identity doc (on disk) | Current `inclusion` | AXA class (Req 6 overlay, non-binding in 119-A) |
|---|---|---|
| `Personal Note.md` | always | formative |
| `Core Goals.md` | always | formative / operational |
| `AI-Collaboration-Principles.md` | always | reflexive-principle (will carry the certainty-calibration rule text, Task 8.2) |
| `Spec-Feedback-Protocol.md` | always | reflexive-principle |
| `DesignerPunk-Systems-Overview.md` | always | orientation reference (will carry the 118 Module-Resolution pointer, Task 8.3) |
| `Civitas-System-Overview.md` | always | orientation reference |
| `Start Up Tasks.md` | always | governance-as-law (refocused, Task 8.1) |
| `Agent-Directory.md` | always | capability-routing (`always` in 119-A; migrates to generated catalog in 119-B/122) |
| **`Task Completion Protocol`** | **DOES NOT EXIST** | governance-as-law (NEW operational-law doc, authored Task 8.1) |

**Verified:** all 8 existing identity docs are currently `inclusion: always`. ✓

### 2b. Currently-`always` docs that are NOT identity (the demotion set)

Live-tree audit finds **11** docs currently `inclusion: always` (the leak-source meta-guide plus 10 others). Of those 11:

- 8 are identity (stay `always`).
- 1 is the meta-guide → **removed** (Task 10.5).
- **2 are relocated docs still wrongly carrying `always`** and must be demoted to `manual` in Task 8.1 (Req 6 AC3):
  - `Process-Development-Workflow.md` (always → manual, relocate)
  - `Process-File-Organization.md` (always → manual, relocate)

These two are the only docs where current state contradicts target state on the inclusion axis. Req 6 AC4 asserts that post-119-A *no doc outside the AC1 identity set remains `always`* — these two are the work that satisfies it.

---

## 3. Full role-assigned enumeration (all 89)

Columns: filename · current path · current `inclusion` · post-migration role · `Last Reviewed` (metadata-staleness signal, § 4).

| Doc | Current path | `inclusion` | Role | Last Reviewed |
|---|---|---|---|---|
| `00-Steering Documentation Directional Priorities.md` | `.kiro/steering/` | always | **removed** | 2026-03-13 |
| `A Vision of the Future.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `AI-Collaboration-Framework.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-15 |
| `AI-Collaboration-Principles.md` | `.kiro/steering/` | always | **identity** | 2026-01-16 |
| `Agent-Directory.md` | `.kiro/steering/` | always | **identity** | 2026-03-26 |
| `BUILD-SYSTEM-SETUP.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-26 |
| `Browser Distribution Guide.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-23 |
| `Civitas-System-Overview.md` | `.kiro/steering/` | always | **identity** | 2026-05-03 |
| `Completion Documentation Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-28 |
| `Component-Development-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `Component-Development-Standards.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Avatar.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-25 |
| `Component-Family-Badge.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-23 |
| `Component-Family-Button.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-25 |
| `Component-Family-Chip.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-04 |
| `Component-Family-Container.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-21 |
| `Component-Family-Data-Display.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Divider.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Form-Inputs.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-07 |
| `Component-Family-Icon.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Loading.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Modal.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Family-Navigation.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-18 |
| `Component-Family-Progress.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-09 |
| `Component-Inheritance-Structures.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-MCP-Document-Template.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Component-Meta-Data-Shapes-Governance.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-28 |
| `Component-Primitive-vs-Semantic-Philosophy.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-01 |
| `Component-Quick-Reference.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-07 |
| `Component-Readiness-Status.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-01 |
| `Component-Schema-Format.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-25 |
| `Component-Templates.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Contract-System-Reference.md` | `.kiro/steering/` | manual | **relocated** | 2026-04-03 |
| `Core Goals.md` | `.kiro/steering/` | always | **identity** | 2026-01-05 |
| `Cross-Platform vs Platform-Specific Decision Framework.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-19 |
| `DTCG-Integration-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-21 |
| `DesignerPunk-Integration-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-10 |
| `DesignerPunk-Systems-Overview.md` | `.kiro/steering/` | always | **identity** | 2026-05-03 |
| `Figma-Workflow-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-23 |
| `Layout-Specification-Vocabulary.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-23 |
| `MCP-Evolution-Roadmap.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-23 |
| `MCP-Integration-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-23 |
| `MCP-Relationship-Model.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-23 |
| `Personal Note.md` | `.kiro/steering/` | always | **identity** | 2025-12-15 |
| `Platform-Resource-Map.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-31 |
| `Process-Cross-Reference-Standards.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-03 |
| `Process-Development-Workflow.md` | `.kiro/steering/` | **always → demote** | **relocated** | 2026-01-04 |
| `Process-File-Organization.md` | `.kiro/steering/` | **always → demote** | **relocated** | 2026-06-23 |
| `Process-Hook-Operations.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-04 |
| `Process-Integration-Methodology.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-25 |
| `Process-Spec-Planning.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-15 |
| `Process-Task-Type-Definitions.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-15 |
| `Product-Handoff-Protocol.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-20 |
| `Product-Token-Governance.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-25 |
| `Release Management System.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-28 |
| `Rosetta-System-Architecture.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-26 |
| `Spec-Feedback-Protocol.md` | `.kiro/steering/` | always | **identity** | 2026-03-24 |
| `Start Up Tasks.md` | `.kiro/steering/` | always | **identity** | 2026-01-03 |
| `Technology Stack.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-26 |
| `Test-Behavioral-Contract-Validation.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `Test-Development-Standards.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-26 |
| `Test-Failure-Audit-Methodology.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-26 |
| `Token-Family-Accessibility.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Blend.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `Token-Family-Blur.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-31 |
| `Token-Family-Border.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Color.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-10 |
| `Token-Family-Glow.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Layering.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `Token-Family-Motion.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Opacity.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-06 |
| `Token-Family-Radius.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Responsive.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Shadow.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Sizing.md` | `.kiro/steering/` | manual | **relocated** | 2026-04-03 |
| `Token-Family-Spacing.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Family-Typography.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Token-Governance.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `Token-Quick-Reference.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-24 |
| `Token-Resolution-Patterns.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-19 |
| `Token-Semantic-Structure.md` | `.kiro/steering/` | manual | **relocated** | 2025-12-30 |
| `Transformer-Development-Guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-02-21 |
| `Web-Authoring-Standards.md` | `.kiro/steering/` | manual | **relocated** | 2026-06-01 |
| `component-mcp-query-guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-05-06 |
| `component-meta-authoring-guide.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-28 |
| `component-metadata-schema-reference.md` | `.kiro/steering/` | manual | **relocated** | 2026-03-28 |
| `platform-implementation-guidelines.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-02 |
| `rosetta-system-principles.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-03 |
| `stemma-system-principles.md` | `.kiro/steering/` | manual | **relocated** | 2026-01-01 |

**Counts re-tallied from this table:** removed 1, identity 8, relocated 80 = 89. ✓

### 3a. The 10 space-bearing files (Req 3 rename set) — cross-check

The mass-rename set (Req 3 AC2, verified 2026-06-27) is **10** files. Re-verified present on disk this session (all carry a space in the filename):

`00-Steering Documentation Directional Priorities.md`, `A Vision of the Future.md`, `Browser Distribution Guide.md`, `Completion Documentation Guide.md`, `Core Goals.md`, `Cross-Platform vs Platform-Specific Decision Framework.md`, `Personal Note.md`, `Release Management System.md`, `Start Up Tasks.md`, `Technology Stack.md`.

**Verdict: all 10 present, no drift.** Note 3 of these are identity (`Core Goals`, `Personal Note`, `Start Up Tasks`) and 1 is removed (`00-Steering …`), so the rename touches files across all three roles — consistent with Req 3's corpus-wide filename convention.

---

## 4. Staleness triage (Subtask 1.2 / Req 1 AC4) — FLAG, DO NOT FIX

> **Scope discipline.** Subtask 1.2 is **triage only**. No document content was read for editorial currency and **no content was modified**. What follows is a *metadata-staleness* signal (`Last Reviewed` age) — a cheap, objective proxy that routes docs to the **separate Thurgood-led governance audit (R3)**. Content-staleness *adjudication* (is the prose actually wrong?) is explicitly out of scope here and out of 119-A entirely (Req 1 out-of-scope note; § "Deferred to 119-B").

### Method
Today is **2026-06-29**. I extracted each doc's `Last Reviewed` frontmatter date and bucketed by age. This is a *review-cadence* signal, not a content-correctness claim — a doc reviewed long ago may still be perfectly current, and a recently-reviewed doc may still be wrong. It is a worklist prioritizer for R3, nothing more.

### Findings
- **64 of 89 docs** have a `Last Reviewed` older than ~90 days (before 2026-03-31). That is the bulk of the corpus — consistent with a corpus that has not had a cadence sweep recently (Civitas-steward monthly health-check territory).
- **The oldest cohort (2025-12-15 → 2025-12-30, ~10 docs)** is the highest-priority R3 triage candidate: `Personal Note` (identity), `Process-Spec-Planning`, `Process-Task-Type-Definitions`, `Cross-Platform vs Platform-Specific Decision Framework`, `Token-Resolution-Patterns`, `Browser Distribution Guide`, `Test-Failure-Audit-Methodology`, and most of the `Token-Family-*` reference docs (Accessibility, Border, Glow, Motion, Radius, Responsive, Shadow, Spacing, Typography, Semantic-Structure).
- **Freshest cohort (2026-06-2x)** — `Rosetta-System-Architecture`, `Test-Development-Standards`, `Technology Stack`, `BUILD-SYSTEM-SETUP` — these were touched by Spec 118 (Module-Resolution Contract) and are current; they are relocated *as-is* (Req 4 AC3).

### Routing
This metadata-staleness list is **handed to the R3 governance audit** as a prioritized worklist. It is NOT a 119-A remediation item. The one place staleness is *acted on* inside 119-A is the **frozen map-oracle stale-strip** (Task 10.1 / Req 13 AC2), which is a scoped R3-triage pass over the meta-guide's concept→doc map only — not the whole corpus.

> **Candor flag (avoiding inflated severity):** `Last Reviewed` age is a weak proxy. 64/89 "stale by cadence" sounds alarming but mostly reflects an un-run review cadence, not 64 broken docs. I am deliberately NOT escalating this to a content-quality finding — that would be asserting beyond what I verified. The real signal for Peter is narrow: the ~10-doc Dec-2025 cohort is where an R3 audit should start.

---

## 5. Exceptions & surprises (Req 1 AC5)

1. **No un-assignable docs.** All 89 mapped to a role with zero ambiguity. AC5's "explicit exception" path was not triggered.

2. **The 9th identity doc does not exist yet (expected, not drift).** `Task Completion Protocol` is NEW (Task 8.1). On-disk identity count is **8**, post-119-A is **9**. This is the design's intent (Req 6 AC2), recorded here so a downstream reader counting identity files on disk does not mistake 8-vs-9 for a missing doc.

3. **Two relocated docs still carry `inclusion: always`.** `Process-Development-Workflow.md` and `Process-File-Organization.md` are target-role `relocated` + target-inclusion `manual`, but are *currently* `always`. This is exactly the Req 6 AC3 demotion work — flagged so the relocation pass (Task 6) and the inclusion-lock (Task 8.1) both account for them.

4. **The `name:` frontmatter field is inconsistent across the corpus** (relevant to Req 2's `id` derivation). Many docs have **no `name:` field at all** — including 6 of the 8 identity docs (`Personal Note`, `Core Goals`, `AI-Collaboration-Principles`, `Agent-Directory`, `Civitas-System-Overview`, `Spec-Feedback-Protocol`, `Start Up Tasks` has one, `DesignerPunk-Systems-Overview` has one) and several others (`00-Steering…`, `A Vision of the Future`, `Release Management System`, `Component-MCP-Document-Template`, `Component-Primitive-vs-Semantic-Philosophy`, `Component-Templates`, `Process-Integration-Methodology`, `Component-Family-Progress`). Per Req 2 AC9 / Design Decision 3, the `id` for these docs derives from the **H1 fallback**, not `name:`. This is not a blocker for Task 1, but it **directly affects the Task 4.3 `id` backfill**: a meaningful fraction of the 89 will hit the `idSource: 'derived-h1'` path, so the backfill's collision check and `idSource` reporting will be exercised more than a "`name:`-everywhere" corpus would suggest. Flagged for the Task 2/4 owner.

5. **Three filename-casing conventions coexist** (orthogonal to role, relevant to Req 3): Title-Case-with-hyphens (`Token-Governance.md`), space-bearing (`Core Goals.md`), and all-lowercase-kebab (`component-mcp-query-guide.md`, `rosetta-system-principles.md`, `stemma-system-principles.md`). Req 3 normalizes only the 10 space-bearing files; the lowercase-kebab files are already convention-compliant. No action for Task 1; noted so the rename codemod (Task 5) is not surprised by the pre-existing lowercase set.
