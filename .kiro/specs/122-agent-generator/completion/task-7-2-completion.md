# Task 7.2 Completion: Sweeps 5–8 with prove-it-bites

**Date**: 2026-07-10
**Task**: 7.2 Implement sweeps 5–8 with prove-it-bites (Implementation, Tier 2)
**Agent (planned)**: Thurgood — **executed by the main loop (Fable 5)**; same delta rationale as 7.1
**Spec**: 122-agent-generator
**Branch**: task/122-substrate

---

## What was built

- **`sweep-5-corrected.ts`** (`122-sweep-5-corrected-state` — **PRE-CUTOVER GATE ONLY**,
  Req 19 AC1's named exception): zero `.web.tsx` in canonical source (count-asserted, the
  recorded count is an INFO line — a number, not a vibe); single distinct concept-count
  across `contract-system-reference` AFTER the L3 historical-line exclusion
  (`Originally|historical|migration|source names`). Zero extracted counts is a LOUD FAIL
  (broken extractor ≠ green).
- **`sweep-6-declarations.ts`** (`122-sweep-6-declarations`): phantom routes (cues — canonical
  `routes.cues` ∪ shared-catalog tool-cues — ∖ live `tools/list` declarations = FAIL) +
  un-routed declarations (declarations ∖ (∪ toolSubsets ∪ deferred-discoverable set) =
  ADJUDICATE routed to `declaring-owner:<server>`, the Req 7 AC5 seam — no consuming seat
  exists for an un-routed tool). Declaration-keyed; index state never enters. With zero
  canonical agents the declarations-diff records a vacuous PASS (no 43-tool ADJUDICATE storm
  pre-cutover); the cue leg always runs.
- **`sweep-7-dispositions.ts`** (`122-sweep-7-dispositions`): every dotted key path in every
  `.kiro/agents/*.json` (source + emitted — full population from day one) ∈
  `field-dispositions.yaml`. Mixed-granularity coverage: a path is covered by its own row,
  recursed when finer rows exist under it, else FAIL at the exact dotted path. Arrays are
  leaves.
- **`sweep-8-demotion.ts`** (`122-sweep-8-demotion`): `removals = baseline ∖ fresh manifest`
  over the **D-A1 namespace (doc-ids ∪ artifact-path members)**; every removal needs a
  `replaces:` cue (canonical `routes.cues[].replaces` ∪ trims' `cue.replaces`) else FAIL;
  **K-D1**: `fires: unconditional` trims must have their negative present in the emitted
  output regardless of removal-set membership (orphaned-artifact coverage, decoupled from
  the diff). Emits `canonical/manifests/demotion-delta.json` (deterministic serialization)
  when agents are in scope.

## Prove-it-bites (Req 19 AC2)

| Sweep | Bite | Result |
|---|---|---|
| 5 | re-introduced `.web.tsx` in scanned input | FAIL naming file:line, count-assert records 1 (test) |
| 5 | two distinct non-historical counts (the 117-vs-136 class) | FAIL naming both values (test) |
| 6 | induced cue naming a nonexistent tool (`get_documentation_map_v2`) | PHANTOM ROUTE FAIL naming tool + server (test) |
| 7 | fake config key (`fakeInventedField`) | FAIL naming the exact dotted path (test); nested `toolsSettings.write.sneakyExtra` separately proven |
| 8 | removal from a fixture agent's ambient without a `replaces` cue | FAIL naming the removed member (test); D-A1 artifact-path member + K-D1 orphaned-negative separately proven |

## Live runs (current substrate)

- Sweep 5 **PASS**: `.web.tsx` count-assert **0**; single concept-count **136** with exactly
  the two Lina-flagged lines excluded (**49, 113**) — the design's L3 prediction verified
  against the live doc.
- Sweep 6 **PASS**: cue leg live against all three MCPs' declarations (the shared-catalog
  find_docs cue resolves); the **declared-but-index-empty carve-out exercised live** — the
  Product MCP booted "with empty data" and its declarations still counted (structural, not
  special-cased). Declarations-diff vacuous (0 canonical agents), recorded INFO.
- Sweep 7 **PASS on all 8 live hand configs** — Task 1.3's disposition table covers the full
  observed key-path union (the day-one-red risk did not materialize).
- Sweep 8 **PASS** (vacuous: 0 committed baselines pre-cutover), recorded INFO.

## Validation (Tier 2)

- `npx tsc --noEmit -p tools/agent-generator/tsconfig.json` — clean.
- `npm run test:agent-generator` — **276/276** (24 suites; +23 over 7.1).
- Live CLI exits verified: 0/0/0/0.

## Notes for downstream tasks

1. **Sweep 8 will bite the adapters at first emission**: no adapter currently renders
   ground-truth trim NEGATIVES into emitted output (verified by grep — `deriveGroundTruthDirective`
   carries `trims` but no renderer consumes them). The Task 8 fixture exercises a `trims`
   entry, so sweep 8 FAILs there until the negative-rendering lane lands — fail-loud is the
   designed behavior; noting it here so Task 8 expects the red.
2. **Sweep 5's context registration is cutover-windowed** (C9): registered in 7.3 like the
   others; its post-last-cutover removal is a recorded protection-list change.
3. **`deferred-discoverable` set** is an input (default empty) — first population happens at
   a cutover when a seat consciously defers tools (Req 7 AC4), recorded per the seam.

## Delegated-tier capture

Planned `Agent: Thurgood`; executed in the **main loop (Fable 5)** — same continuity
rationale as 7.1 (single session holds the C8 table + the 7.1 idiom). Agent-evolution
signal, not model-evolution.
