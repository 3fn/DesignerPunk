# Task 7 Completion: OB-1 — Cross-ref Parser `id`-Awareness + Scanner Repoint

**Date**: 2026-08-02
**Task**: 7 (parent) — Implement OB-1 per design § Component 6
**Type**: Implementation · **Validation**: Tier 3
**Unit**: OB-1 (`task/119-B-ob1-crossref-parser`) — parallel unit, mcp-server code only, zero window/corpus interaction (R9 AC1)
**Status**: Complete on branch — subtasks 7.1–7.4 complete (see their docs)

---

## The bundle, moved whole (R9 AC4)

Parser `id`-awareness (7.2) + indexer validation on the existing post-index hook (7.3) + dropped-candidate surfacing on two channels + scanner repoint to both roots + D5 addressing-contract normalization (7.4) — one unit, one PR, per Peter's ratified 2026-07-05 routing.

## Before/after evidence (the D1 record — CIVITAS HEALTH-CHECK ATTRIBUTION NOTE)

| Measure | Before (2026-08-02, pre-change) | After (2026-08-02, this unit's code over the live corpus) |
|---|---|---|
| `totalCrossReferences` (index-health) | **116** (`.md` refs only — bare-id refs invisible, V6 re-probed) | **327 validated** (+211 bare-id refs now enumerated) |
| Invisible bare-id population | 237 across 47 docs (217 in indexed governance docs; 20 in the identity root) | 211 validated into the index; **6 dropped with record** (below); 20 scanner-visible only (identity root, unindexed by design) |
| Health status/warnings | healthy, no cross-ref signal | **degraded by design**: ONE aggregate warning — `6 unresolved bare-id link targets — run scan-cross-references.sh for the list` |

**⚠ ATTRIBUTION (for the monthly Civitas health check — cite THIS doc): the `crossReferences` metric STEPS UP 116 → ~327 at this unit's merge.** The step-up is THIS unit making the existing invisible population visible — not corpus drift. Baseline figures citing "~116 cross-references" (and the always-loaded "115" from earlier snapshots) move because of OB-1. The count is measured by the new code over the live corpus at completion; the served figure refreshes when the merged server build next indexes (expect small drift only if corpus edits land in between — D1 applies).

**The 6 dropped candidates** (all genuinely unresolvable — the channel carries real signal on day one): `doc-id` (Process-Cross-Reference-Standards :122 — a format-teaching placeholder; the parser is fence-unaware by known design, same as sweep-1); `core-goals` (Token-Governance :648); `civitas-system-overview` + `designerpunk-systems-overview` (rosetta-system-principles :586–587, stemma-system-principles :890–891) — identity-doc targets, never MCP-served, so these governance-doc links cannot resolve through the MCP. **Routed to Task 8's audit** (content-quality dimension) for disposition — content fixes are corpus edits, out of this code unit's scope. The resulting `degraded` health status is the designed behavior of the warning channel, not a defect.

## Validation (Tier 3)

- mcp-server suite: **38 suites / 636 tests green** (was 36/598; new suite `bare-id-crossrefs.test.ts` adds 15; existing `cross-ref-parser.test.ts` 20/20 UNCHANGED — the property surface preserved).
- `tsc --noEmit` (mcp-server): exit 0.
- Root full `npm test`: **378 suites / 9,020 tests green** locally.
- Scanner: run against both roots exits green; 92 docs scanned (> the old 9) — Component 6 test list satisfied.
- Public API: `list_cross_references` response shape unchanged; the candidate tag never escapes the indexer (tested).

## Requirements traceability

- **R9 AC1** — declared parallel unit, own branch/PR; mcp-server + scripts only; zero window/corpus interaction. ✓
- **R9 AC2** — V6 re-probed + invisible population re-counted at unit start (7.1). ✓
- **R9 AC3** — bare-id refs enumerated, validated against idIndex, disambiguation guards tested (7.2/7.3). ✓
- **R9 AC4** — bundle moved whole: parser + scanner repoint + D5 in one unit (7.4). ✓
- **R9 AC5** — (closeout gate; this unit merging is the intended discharge path.)
- **R11 AC4** — re-probe recorded (7.1).

## Delegated-tier note (TCP exception-based capture)

Planned stamp: Thurgood (Sonnet), escalate only on a Decision-1 premise break. Actual: main-loop session (Fable 5). **No Decision-1 premise broke** — one architecture nuance surfaced and was absorbed within the design's intent: consumers were re-extracting at query time, so "validation at index time" required repointing three read surfaces to the stored validated set (exactly Decision 1's "one validation point, stable metrics" rationale — an implementation detail, not a design change). Agent-evolution: none. Model-evolution: none material.
