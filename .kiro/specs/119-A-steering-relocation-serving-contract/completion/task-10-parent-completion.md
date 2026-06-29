# Task 10 — Parent Completion (PARTIAL: 10.1 / 10.2 / 10.3 / 10.4)

**Date**: 2026-06-29
**Spec**: 119-A — Steering Relocation & Serving Contract
**Task**: 10 — Discovery Dry-Run + Frozen Map-Oracle, then Gated Meta-Guide Removal
**Author**: Thurgood (Civitas steward)
**Status**: PARTIAL — subtasks 10.1, 10.2, 10.3, **10.4 (lift) complete. The hard gate did NOT clear: 79 PASS / 4 WEAK / 0 MISS, `clearsThreshold: false` — 4 concepts flagged as structurally unliftable via aliases-only (see § 10.4).** 10.5 (gated removal) **remains BLOCKED** by the unclear gate; 10.6 (no-regression) follows once the gate is resolved.

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

---

## 10.4 — LIFT baseline (post-aliases) (Req 13 AC4, AC6 / the hard removal gate)

Ran `runDiscoveryDryRun('lift', DISCOVERY_ORACLE)` after Task 8.4 seeded `aliases` against the 10.3 floor worklist. Same query set + answer key as floor, so the deltas are comparable.

**Lift result (final):**
- 83 concepts: **79 PASS / 4 WEAK / 0 MISS** (floor was 62 / 18 / 3).
- **clearsThreshold (HARD gate): `false`** — 4 concepts remain WEAK (see below). The gate is NOT cleared.
- **rank1StrongRate (SIGNAL): 69.9% (58/83)** — up from floor 54.2%; still below the ~80% review tripwire, recorded as a review item, NOT a block (Decision 4).

**Delta floor → lift:**
- All **3 floor MISSes** lifted to PASS (`dark mode theme overrides`, `modular scale mathematical foundation`, `focus management keyboard navigation`). **0 MISS remaining.**
- **17 of the 18 floor WEAKs** lifted to PASS. The 21-concept floor worklist is **17 lifted / 4 not liftable**.
- **No previously-passing concept regressed** — the 4 residual WEAK are all members of the original 21-concept floor worklist (`color token work`, `shadow token work`, `opacity token work`, `cross-platform implementation patterns`), not new breakage. (Intermediate seeding configs DID transiently regress sibling families via the generic `work` token; the final uniform-family-seeding config removes those regressions — see task-8 § 8.4.)

**Iterations to converge:** 3 measured lift runs.
1. Worklist-target seeding only → 79 PASS but the seeding introduced 10 sibling-family WEAKs (the `work`-token poison).
2. Uniform family seeding (all token-family + component-family docs get their `X token/family work` alias) → 79 PASS / 4 WEAK / 0 MISS — the fixpoint.
3. Confirmed-final re-run + reverted experiments → identical 79 / 4 / 0.

**The 4 residual WEAK — FLAGGED for adjudication (Req 13 AC6 says the threshold gate EXISTS and Req 11 depends on it; it does NOT authorize loosening it, and I did not):**
`color token work`, `shadow token work`, `opacity token work`, `cross-platform implementation patterns`.

These are **provably unliftable to rank ≤ 2 via aliases-on-intended-docs under the current `find_docs` rubric.** Full mechanism + the mutual-conflict proof are in task-8 § 8.4. One-line cause: the rubric weights all high-signal fields equally (`title = description = sections = aliases`), so the dedicated `token-family-X` doc cannot out-rank an alphabetically-earlier doc that merely *mentions* X, and exact ties fall to corpus (readdir) order — which aliases cannot move. For `color/shadow/opacity` there is **no alias configuration** in which both the family's "X token work" query AND its incidental-competitor's own query (e.g. `blend token work`) both pass, because the two docs mention each other's terms. For `cross-platform implementation patterns` the blocking competitors match via FROZEN body content, not my aliases.

**This blocks Task 10.5 (gated meta-guide removal).** Per Req 11 AC5 / Req 13 AC6, meta-guide removal is blocked until the dry-run clears its threshold. The threshold is `clearsThreshold === true`; it is `false`. **10.5 remains gated and the meta-guide stays in place.** Two non-gate-loosening resolution paths for Peter to adjudicate (neither is in 119-A's aliases-only scope):
- (a) **Rubric fix (preferred, owned by the docs `find_docs` rubric):** give `title`/`name` strictly higher weight than `description`/`sections` so a dedicated family doc out-ranks an incidental mention. This would let all 4 clear and is a legible-knob change (`WEIGHT` map in `QueryEngine.scoreDoc`). It is a scorer change, deferred out of 119-A's aliases-only seeding scope.
- (b) **Oracle adjudication:** accept that these 4 generic-phrase concepts (`X token work`, `cross-platform implementation patterns`) are oracle entries the discovery plane structurally cannot disambiguate to a single intended doc, and either relax their `expectedDocIds` (e.g. accept that "color token work" reasonably reaches a color-adjacent doc) or drop them, per the same R3 human-validation judgment that Req 13 AC2 already invokes for the oracle.

I did NOT touch the scorer (`QueryEngine`), the harness, or the oracle, and I did NOT loosen the gate.

---

## 10.4 Verification (run by Thurgood)

- **Lift `DryRunResult`:** `clearsThreshold: false`, 79 PASS / 4 WEAK / 0 MISS, `rank1StrongRate: 0.699`.
- **`check:id-uniqueness`:** **PASS** — 90 docs across both roots, 0 derived. Aliases did not touch any `id`.
- **`git diff governance/` is `aliases:`-only:** verified — every changed line is an added `aliases:` line; **zero `id:` lines changed** (grep of the diff).
- **Root `tsc --noEmit`:** exit 0.
- **Root `npm test`:** **377 suites / 8990 tests, all pass.**
- **mcp-server `tsc --noEmit`:** exit 0.
- **mcp-server `npx jest --runInBand`:** **36 suites / 598 tests, all pass** (the known property-parsing flake did not surface this run).

## Gate resolution (main loop, 2026-06-29) — title rank tie-breaker; gate CLEARED

The floor→lift seeding got to **79 / 4 / 0** with 4 concepts stuck WEAK (`color token work`, `shadow token work`, `opacity token work`, `cross-platform implementation patterns`) — all **rank 3–4 at *strong* confidence** (reachable, not top-2). Root cause: `find_docs` `scoreDoc` weighted all HIGH_SIGNAL fields (title/sections/description/purpose/aliases) equally, so the intended doc's *title* match tied with a competitor's *section/description* mention and ties fell to directory order — a fixpoint aliases cannot move.

**Resolution (Peter-approved): a Layer-3 RANK-only title tie-breaker** — `scoreDoc` adds a fractional bonus (`TITLE_RANK_TIEBREAK = 0.5`, smaller than the 1-point inter-tier gap) when a query token hits the **title**, so a doc that *is about* X edges out one that merely *mentions* X. **Rank only — `matchConfidence` (Layer-1) is untouched**, so Spec 121's confidence contract and calibration fixtures are unaffected.

**Result:** gate **CLEARS — 83 PASS / 0 WEAK / 0 MISS, `clearsThreshold: true`**; rank-1-strong **69.9% → 94%** (broad improvement, not overfit to the 4). Spec 121 `find-docs` rubric + calibration tests stay green (34→37 with 3 new guard tests); full suites green (mcp-server 36/601, root 8990).

**Documentation updated:** `mcp-server/src/query/QueryEngine.ts` (named constant + comment); `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md` § "Layer 3 — Usability" (attributed amendment); guard test in `find-docs-rubric.test.ts` (title hit out-ranks equal-coverage description hit; tier unchanged; only-breaks-exact-ties). Consumer-facing `MCP-Integration-Guide.md` / `MCP-Relationship-Model.md` describe the rank contract abstractly ("tool ranks per rubric") → no change needed.

**Dependency analysis (122 / 123 / 119-B):** all downstream references key off the Layer-1 `matchConfidence` signal (unchanged), NOT rank ordering — verified by broad sweep (the only rank dependents are 119-A's own gate, which the change *satisfies*). 121 does not pin the flat-tier weighting as a requirement. **No external dependent on rank-order; no contract violated.** A 119-B informational note is recorded in `119-B-deferred-obligations.md` so the deferred measurement case study's baseline accounts for the floor(54.2%)→lift→tie-breaker(94%) history.

**10.5 (meta-guide removal) is now UNBLOCKED** (gate cleared).
