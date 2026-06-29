# Task 10 — Parent Completion (PARTIAL: 10.1 / 10.2 / 10.3)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 10 — Discovery Dry-Run + Frozen Map-Oracle, then Gated Meta-Guide Removal
**Author**: Thurgood (Civitas steward)
**Status**: PARTIAL — subtasks 10.1, 10.2, 10.3 complete. 10.4 (lift), 10.5 (gated removal), 10.6 (no-regression) appended later, after the Task 8.4 alias seeding consumes the 10.3 floor worklist.

> **Scope discipline.** 10.4–10.6 are deliberately NOT done here. The meta-guide
> (`00-steering-documentation-directional-priorities.md`, renamed, still present,
> `inclusion: always`) is UNTOUCHED — its removal is gated to 10.5, which is blocked
> on 10.4 clearing the hard bar. The frozen oracle was captured BEFORE any removal
> (Req 11 AC4 hard precondition), which is the whole reason 10.1 runs first.

---

## 10.1 — Capture + human-validate the frozen map-oracle (Req 11 AC4 / Req 13 AC1, AC2, AC7)

**Artifact:** `scripts/__fixtures__/discovery-oracle.ts` — `OracleEntry[]`, a point-in-time
test fixture, NOT a living navigational doc. Also designated as 119-B's non-circular
"before" anchor (Req 13 AC7) — fixture/anchor use only; never to be re-wired as a fallback map.

**What was captured:** the meta-guide's "Tier 2: MCP-Only Documents" section, all 7
categories → doc pointers:

| Category | Concepts captured |
|---|---|
| Process & Workflow | 8 |
| Token System (Rosetta) | 19 (incl. principles + 13 token families) |
| Component System (Stemma) | 27 (incl. 12 component families) |
| Layout System | 1 |
| Integration & Tooling | 6 |
| Testing | 2 |
| Architecture & Vision | 5 |
| **Map-concept total (axis a)** | **69** |
| Agent domain queries (axis b) | 14 (Ada 4 / Lina 4 / Thurgood 4 / Leonardo 2) |
| **Full oracle total** | **83** |

**Stale-strip pass (Req 13 AC2 — the R3 triage over the map):**
Applying AC2's strict criteria (target no-longer-exists / superseded / not-in-served-set),
**ZERO map pointers qualified for stripping.** Every one of the meta-guide's Tier-2 doc
pointers resolves to a live `governance/` `id` (verified against the full 80-doc `id` set).
The rot AC2 anticipated did not materialize on the doc-pointer axis — plausibly because
Tasks 1/4/6 just touched every doc, so the corpus is fresh.

**Candor note:** no strips were manufactured to appear thorough. Two candidates were
explicitly evaluated and REJECTED (recorded in the fixture's STRIP LOG):
- `a-vision-of-the-future` — meta-guide marks it "(optional)"; a low-value Layer-3
  vision/narrative routing target. Kept: it exists, is not superseded, is in the served
  set. "Optional" is editorial preference, not staleness. **Flagged for Peter** — if the
  oracle should test only guidance-routing concepts, the concept `designerpunk vision
  context` is the single entry to drop.
- `ai-collaboration-framework` — could look redundant with always-loaded
  AI-Collaboration-Principles. Kept: it is the deeper manual-served protocol doc, a
  legitimate discovery target.

**Id-divergence-from-filename mappings resolved (NOT strips — recorded as judgment calls):**
five docs carry an `id` deliberately diverging from filename (Decision 3): Integration
Methodology → `integration-methodology`, Component Templates → `component-family-templates`,
Component-MCP-Document-Template → `mcp-component-family-document-template`,
Primitive-vs-Semantic → `primitive-vs-semantic-usage-philosophy`, Component-Family-Progress
→ `progress-indicator-components`. Each verified against live frontmatter `id:`.

---

## 10.2 — Discovery dry-run harness (Req 13 AC3, AC5; design Component 6 + B5)

**Artifacts:**
- `mcp-server/src/discovery-dry-run/discovery-dry-run.ts` — testable core
  (`runDiscoveryDryRun`, `scoreConcept`, `classify`, `aggregate`, `buildPathToId`,
  `DryRunResult`, `OracleEntry`).
- `mcp-server/src/discovery-dry-run/__tests__/discovery-dry-run.test.ts` — 16 unit tests.
- `scripts/discovery-dry-run.ts` — thin CLI runner (`tsx scripts/discovery-dry-run.ts
  [floor|lift|no-regression]`).

**Engine fidelity.** The harness instantiates its OWN `DocumentIndexer` over `governance/`
and calls the SAME `findDocsConcept` the live `find_docs` tool calls (verified: the live
engine emits per-entry `rank` + `matchConfidence: strong|partial` via `deriveMatchConfidence`).
So the dry-run measures real discovery, not a stand-in. (Chosen over hitting the live MCP so
the run is deterministic and self-contained; both are sanctioned by the task.)

**B5 (load-bearing) — path→id translation confirmed.** `find_docs` returns entries keyed on
`path` (the indexed relative key, e.g. `governance/Token-Governance.md`); the oracle is keyed
on `id` (e.g. `token-governance`). `scoreConcept` translates each result `path` → `id` via
`buildPathToId` (from `documentMap`) BEFORE computing `rankOfCorrect`. A dedicated unit test
("scores MISS when the path cannot be translated") proves the failure mode B5 warns about
(every concept scoring MISS on `path !== id`) is exactly what an untranslated map produces —
and the floor run's correct matched-ids prove the translation works end-to-end.

**Decision-4 scoring implemented:**
- PASS = rank ≤ 2 AND matchConfidence ∈ {strong, partial}.
- MISS = correct doc absent from results.
- WEAK = present but does not clear the bar (rank > 2, or — defensively — confidence none).
- `clearsThreshold` (HARD gate) = true iff no concept is WEAK/MISS.
- `rank1StrongRate` (SIGNAL) = share at rank-1-strong; review-if-below-~80%, NOT a block.

**Unit-test result:** 16/16 pass (classify boundaries, B5 translation, best-rank selection
across multiple acceptable ids, MISS paths, hard-gate vs soft-signal independence, empty-oracle
no-divide-by-zero).

---

## 10.3 — FLOOR baseline (pre-aliases) (Req 13 AC4, AC5 / Req 9 AC5)

Ran `runDiscoveryDryRun('floor', DISCOVERY_ORACLE)` NOW, before any alias seeding.

**Floor result:**
- 83 concepts: **62 PASS / 18 WEAK / 3 MISS**
- **clearsThreshold (HARD gate): false** — expected; aliases close the gap, the real gate is 10.4.
- **rank1StrongRate (SIGNAL): 54.2% (45/83)** — below the ~80% tripwire, as the design's
  recorded floor-probe (~62% on a smaller probe) predicted pre-seeding. This is a review signal,
  not a block.

**The weakOrMiss worklist (21 concepts) — THIS IS THE TASK 8.4 ALIAS-SEEDING WORKLIST (Req 13 AC5):**

MISS (3 — unreachable, highest priority):
- `dark mode theme overrides` → expected `token-semantic-structure` (Ada)
- `modular scale mathematical foundation` → expected `rosetta-system-architecture` (Ada)
- `focus management keyboard navigation` → expected `test-behavioral-contract-validation` / `component-development-guide` (Lina)

WEAK (18 — reachable but rank > 2):
- map-concept axis: `cross-spec integration dependency management`, `semantic token architecture mode keys`, `color token work`, `typography token work`, `shadow token work`, `opacity token work`, `accessibility token work`, `primitive vs semantic component decisions`, `cross-platform implementation patterns`, `platform-specific vs shared decisions`, `icon family work`, `programmatic dtcg token consumption`, `designerpunk vision context`
- agent-query axis: `how do i pick the right token` (Ada), `how do i scaffold a new component` (Lina), `true native architecture platform separation` (Lina), `steering doc metadata validation governance` (Thurgood), `system architecture overview rosetta stemma civitas` (Leonardo)

**Reading the worklist:** the agent-query WEAK/MISS cases are the cross-domain natural-language
queries `aliases` exists to backstop (`find_docs` does not index body prose). The map-concept
WEAK cases are mostly families/concepts where a more specific doc out-ranks the intended target
on shared tokens (e.g. "icon family work" → an icon token doc out-ranks the icon component
family). Both are seedable per Req 9.

---

## Verification (run by Thurgood)

- mcp-server `tsc --noEmit`: **clean (exit 0)** — type-checks the new harness core.
- root `tsc --noEmit`: **clean (exit 0)** — no regression (changes are under `scripts/` +
  `mcp-server/`, outside root's `src/**` include).
- mcp-server full jest: **597/598 + flake** — the one failure is the KNOWN pre-existing flake
  `tests/property/parsing-properties.test.ts` (fast-check fuzzer); **passes 12/12 on serial
  re-run** (`--runInBand`), confirmed unrelated to this change.
- Harness unit tests: **16/16 pass.**
- root `npm test`: **377 suites / 8990 tests, all pass.**

---

## Handoff to Peter (review gates before 8.4)

1. **Oracle strip judgment** — confirm ZERO strips is acceptable (vs. stripping the one
   borderline `designerpunk vision context` / `a-vision-of-the-future` entry).
2. **Floor worklist** — confirm the 21-concept weakOrMiss set is what gets handed to the 8.4
   alias-seeding dispatch (Ada/Lina/Leonardo author domain seeds; Civitas executes).

10.4 (lift re-run = hard removal gate) runs AFTER 8.4 seeds aliases against this worklist.
