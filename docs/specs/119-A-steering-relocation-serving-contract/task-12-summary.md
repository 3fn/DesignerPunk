---
id: 119a-task-12-summary
---

# Task 12 Summary: Steering Addressing Conventions — Standalone Doc

**Date**: 2026-06-29
**Spec**: 119-A - Steering Relocation & Serving Contract
**Task**: 12 — Conventions Governance Doc (ballot-measure)
**Status**: COMPLETE
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

---

## What

Created `governance/Steering-Addressing-Conventions.md` as a **standalone governance doc** (Peter's ballot decision). The doc carries `id: steering-addressing-conventions`, `inclusion: manual`, and a rich `aliases:` field (13 terms) so `find_docs` surfaces it for authors under queries like "doc id convention", "naming convention", "kebab-case filename", and "immutable id".

Content: Documentation Requirements waiver preamble + four Spec 119-A conventions (per-doc `id`, `docid#sectionid` grammar, kebab-case filename standard, `aliases` seeding guidance) + enforcement mechanisms note.

Removed the `## Steering Corpus Addressing and Naming Conventions (Spec 119-A)` section from `governance/Process-File-Organization.md` and replaced it with a one-line pointer using bare-id cross-ref form: `[Steering Addressing Conventions](steering-addressing-conventions)`. A reciprocal back-ref using bare-id form was added inside the new doc (Convention 4 → `[Process File Organization](process-file-organization)`).

Updated `governance/MCP-Evolution-Roadmap.md` Gap 7 cross-link to point at the new doc instead of PFO.

## Why

The conventions 119-A established — immutable `id`, `docid#sectionid` grammar, kebab-case filename, `aliases` seeding — are authoring reference material that authors query independently of file organization. A standalone doc with its own index entry and strong alias seeding makes them discoverable on their own terms. The standalone form also practices Convention 4: `aliases:` seeding is exactly what makes the conventions findable when an author doesn't know where to look.

The `inclusion: manual` signal is correct: steering doc creation is a conscious act; these conventions are loaded on-demand, not always present.

## Impact

- Governance corpus: 80 → 81 docs (init.test.ts updated; sync-manifest entry added).
- `find_docs({ concept: "doc id convention" })` → new doc ranks 1st, `matchConfidence: strong`.
- Relocation-integrity gate: PASS, Axis 3 confirms `governance/ keys=81 (≥80)`.
- All 377 test suites green; root tsc + typecheck:scripts clean; MCP server tsc clean.
- id-uniqueness guard: PASS, 90 total docs, 0 collisions.
- The two docs are now bidirectionally cross-referenced in bare-id form (OB-1 durable).

## Detailed Completion Doc

`.kiro/specs/119-A-steering-relocation-serving-contract/completion/task-12-parent-completion.md`
