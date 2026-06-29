---
id: 119a-task-12-parent-completion
---

# Task 12 Parent Completion: Conventions Governance Doc (Req 12)

**Date**: 2026-06-29
**Spec**: 119-A - Steering Relocation & Serving Contract
**Task**: 12 — Conventions Governance Doc (ballot-measure)
**Status**: COMPLETE
**Purpose**: Record what was built for Task 12 — the standalone conventions doc, the removal from Process-File-Organization, the Gap 7 cross-link repoint, and all knock-on updates.
**Organization**: spec-completion
**Scope**: 119-A-steering-relocation-serving-contract

---

## What Was Built

### Peter's Ballot Decision: Standalone Doc (not an addition)

Task 12's original draft added the conventions content to `governance/Process-File-Organization.md`. Peter's ballot decision (communicated to Thurgood as Task 12 instructions) was to **promote to a standalone governance doc** — `governance/Steering-Addressing-Conventions.md` — rather than keeping the content embedded in PFO.

Rationale for standalone form:
1. **Independent discoverability.** The conventions are a distinct authoring reference that authors query independently of file organization. A standalone doc has its own index entry, its own `id`, and surfaces directly under alias queries like "doc id convention" or "naming convention" without requiring the reader to navigate PFO.
2. **`inclusion: manual` is appropriate here.** The conventions are reference material loaded on-demand — not ambient law that needs to be in every context window. The `manual` inclusion gives authors a signal: "load this when creating or renaming a steering doc."
3. **Agent-awareness backstop via `aliases:`.** The `aliases:` field is seeded with strong discovery vocabulary (13 terms) so `find_docs` surfaces it for authors even when the query doesn't match the title. This is the pattern the conventions themselves document in Convention 4 — the doc practices what it preaches.

### New Doc Created

**`governance/Steering-Addressing-Conventions.md`**

- `id: steering-addressing-conventions`
- `inclusion: manual`
- `aliases:` doc id convention, id addressing, addressing grammar, docid sectionid, steering filename convention, kebab-case filename, no-spaces filename, aliases seeding, discovery aliases, steering doc conventions, naming convention, semantically inert id, immutable id
- Full content: Documentation Requirements waiver preamble, Convention 1 (per-doc `id`), Convention 2 (`docid#sectionid` grammar), Convention 3 (kebab-case filename), Convention 4 (`aliases` seeding), Enforcement Mechanisms.

Reciprocal cross-ref (bare-id form, per Req 10 / Convention 1): Convention 4 references `[Process File Organization](process-file-organization)` for the author-facing `aliases:` field schema.

### Section Removed from Process-File-Organization.md

The `## Steering Corpus Addressing and Naming Conventions (Spec 119-A)` section (all four conventions + waiver preamble) was removed from `governance/Process-File-Organization.md`. Replaced with a single pointer line immediately after the `aliases:` schema entry:

```markdown
> **Steering-corpus addressing and naming conventions** (`id`, filename, `aliases`, the `docid#sectionid` grammar) are documented in [Steering Addressing Conventions](steering-addressing-conventions).
```

The pointer uses bare-id form (per Req 10 + Convention 1).

### MCP-Evolution-Roadmap Gap 7 Cross-Link Repointed

`governance/MCP-Evolution-Roadmap.md` Gap 7 "Trigger status" paragraph cross-link updated from `Process-File-Organization.md` § Convention 2 to `Steering-Addressing-Conventions.md` § Convention 2 (id: `steering-addressing-conventions`).

---

## Requirements Coverage

| Requirement | AC | Coverage |
|---|---|---|
| Req 12 | AC1 | Per-doc `id` convention, composite grammar, kebab-case filename, `aliases` seeding — all documented in `Steering-Addressing-Conventions.md` |
| Req 12 | AC2 | Enforcement mechanisms (`checkIdUniqueness` + Thurgood hook) referenced in Convention 1 + Enforcement Mechanisms section |
| Req 12 | AC3 | Documentation Requirements waiver preamble in the standalone doc |
| Req 2 | AC7 | Grammar is semantically inert, immutable; documented in Convention 1 + 2 |
| Req 2 | AC8 | Gap 7 cross-link repointed to new standalone doc; trigger-firing status retained; section-`id` noted as deferred/not-precluded |

---

## Design Decisions

**Decision 1 — Standalone doc over addition (Peter's ballot).** The standalone form wins on discoverability (independent `find_docs` surfacing, strong alias seeding, dedicated `id`), appropriate `inclusion: manual` signal, and self-demonstrating character (the doc uses `aliases:` seeding as documented in Convention 4). The addition path's original advantage (zero corpus-count knock-ons) was accepted as a known cost: init.test.ts updated 80→81, sync-manifest entry added.

**Decision 2 — `inclusion: manual` (not `always`).** Steering doc creation is a conscious act; the conventions are reference material, not ambient law. `manual` is correct: load on demand via `find_docs`, not pre-loaded in every context window.

**Decision 3 — Reciprocal cross-refs in bare-id form.** Both directions use bare-id (`[Steering Addressing Conventions](steering-addressing-conventions)`, `[Process File Organization](process-file-organization)`) per Req 10 / Convention 1. The conventions doc practices the immutable-id cross-referencing it documents.

**Decision 4 — Don't duplicate the 121 rubric.** Convention 4 cross-references the per-domain `matchConfidence` rubric rather than reproducing it (same as the original section).

**Decision 5 — Gap 7 cross-link format.** The update replaces the plain `Process-File-Organization.md` path reference with `Steering-Addressing-Conventions.md` § Convention 2 (id: `steering-addressing-conventions`) — the `id` is included explicitly so the cross-link is OB-1-durable.

---

## Knock-On Changes

| File | Change |
|------|--------|
| `governance/Steering-Addressing-Conventions.md` | **NEW** — standalone conventions doc |
| `governance/Process-File-Organization.md` | Section removed; one-line pointer added (bare-id form) |
| `governance/MCP-Evolution-Roadmap.md` | Gap 7 cross-link repointed to new doc |
| `src/cli/__tests__/init.test.ts` | 80→81 in three count assertions |
| `.kiro/sync-manifest.json` | New entry for `governance/Steering-Addressing-Conventions.md` + updated hashes for PFO and MCP-Evolution-Roadmap |

---

## Verification

### Tests — ALL GREEN

- `npm test` — 377 suites, 8990 tests — PASS
- Root `tsc --noEmit` — clean
- Root `npm run typecheck:scripts` — clean
- MCP server `npx jest --runInBand` — 36/37 suites pass; 1 known property-parsing flake in `tests/property/parsing-properties.test.ts` confirmed flake (passes on re-run)
- MCP server `npx tsc --noEmit` — clean

### id-Uniqueness Guard

`npm run check:id-uniqueness` — PASS. 90 total docs (81 governance + 9 steering), 0 collisions. `steering-addressing-conventions` is unique.

### MCP Index Rebuilt

`mcp__designerpunk-docs__rebuild_index` — healthy, 81 documents indexed.

### Discovery Verified

`find_docs({ concept: "doc id convention" })` → `governance/Steering-Addressing-Conventions.md` rank 1, `matchConfidence: strong`.

### Relocation-Integrity Gate

`npx tsx scripts/relocation-integrity-gate.ts` — PASS. Axis 3 shows `governance/ keys=81 (≥80)`.

---

## Post-Completion Steps

After Peter's review:
1. `npm test` — confirm green (Peter's re-run)
2. `npx tsx scripts/relocation-integrity-gate.ts` — confirm PASS
3. `find_docs({ concept: "doc id convention" })` — confirm discovery
4. Commit: `./.kiro/hooks/commit-task.sh "Task 12 Complete: Steering-Addressing-Conventions standalone doc (119-A)"`
5. Verify GitHub for committed changes
