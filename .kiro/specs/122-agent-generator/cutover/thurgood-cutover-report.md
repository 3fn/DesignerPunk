# Thurgood cutover report (U4)

**Date**: 2026-07-11
**Branch**: task/122-cutover-thurgood · **Spec**: 122-agent-generator Task 11
**Sequence**: C10.1 steps 1–8 (content readiness → baseline → generate → checks → this report
→ diff-vs-baseline → validations → signals → PR)

---

## Per-check results (local runs on the final branch state; CI URLs on the PR checks tab — the platform record)

| Check | Result | Notes |
|---|---|---|
| 122-diff-guard (C6) | **PASS** (full-run-green) | Thurgood's runtime artifacts now LEDGER-DERIVED guarded surfaces; lock refreshed |
| 122-canonical-vs-truth (C7) | **PASS** (clean, exit 0) | Class (d) script-path leg exercised for the FIRST time on real seat commands: the 4 governance scripts verified exists+executable at every regeneration |
| 122-sweep-1-refs | **PASS** (0 fail, 1 info) | Both law entries' claims (4 predicates) + 8 doc routes live-resolved (standing interim crossRef INFO) |
| 122-sweep-2-skills | **PASS** | `skills: []` recorded PASS (0 declared / 0 emitted) |
| 122-sweep-3-dupes | **PASS** | Regenerated config has zero double-loads |
| 122-sweep-4-ambient | **PASS** (0 info) | designed (§ Thurgood block ∪ always-set) == generated, both targets — ZERO deltas |
| 122-sweep-5-corrected-state | **PASS** | count-asserts unchanged (0 `.web.tsx`; single concept-count 136) |
| 122-sweep-6-declarations | **PASS** (1 info) | Fleet-partial INFO shrinks again (Thurgood routes the steward docs verbs: list_cross_references, validate_metadata) |
| 122-sweep-7-dispositions | **PASS** | All configs fully disposition-covered |
| 122-sweep-8-demotion | **PASS** | 9 removals, EVERY one covered by a `replaces:` cue |
| audit:coverage-map | **PASS** | Thurgood's artifacts auto-appear as guarded rows (ledger-derived) |
| Full suite / lane / tsc | recorded at parent completion (Tier 3) | |

## Firsts at this cutover

- **First `differential-auditor` agentType** through the pipeline.
- **First `collapses-into-catalog` ground-truth verdict** honored live: renders NOTHING
  (verified: zero `## Ground truth` sections on both targets) — ground truth is COMPUTED by
  the governance scripts at audit time, never snapshot (Req 10 AC2; AXA §7).
- **First live exercise of C7 class (d)'s script-path leg on real seat commands**: the four
  governance instruments (`governance-check.sh --full`, `validate-steering-metadata.js`,
  `scan-cross-references.sh`, `detect-affected-steering-docs.sh`) are `commands:` entries —
  each verified exists+executable at every regeneration. The catalog IS the ground-truth
  provisioning for this seat.
- **First TWO-entry law lock**, and the second entry RESOLVES the 119-A granularity flag by
  construction: process-development-workflow's git/commit CORE (§ "Task Completion
  Workflow") rides ambient as an asserted-section embed while the doc's remaining sections
  stay on-demand — the section-grain keep 119-A could only flag at doc grain.
- **First cutover whose `routes.agents` ALL carry `disposition: resolves`** (ada U2, lina U3).
- **OB-5 delivered (Req 14)**: the steering-addressing-conventions cue is live in his
  Routing section (per-doc id, docid#sectionid grammar, kebab-case filenames, aliases).

## Found-and-fixed during authoring (the gates biting, recorded)

1. **Verbatim-heading discipline, sharpened**: the spec-requirements route was authored as
   "Requirements Document Format"; the doc's real heading is "Requirements Document Format
   (Conditional Loading)" — a grep prefix-match false-positive the resolver's fail-loud
   caught at emission. U3's lesson said verify DECLARED ids; U4 adds: verify the FULL
   heading line, not a prefix.
2. **Dead route heading in the hand prompt**: "Task Type Classification" does not exist in
   process-task-type-definitions — routed to the live § "Overview" (classified as
   improvement in the diff artifact).
3. **Registry-ghost tool**: the CC port granted `mcp__designerpunk-application__validate_component`,
   which no server declares (C5 introspection) — replaced with the real `validate_assembly`
   + `check_composition` (both registry-verified). A grant pointing at nothing corrected.

## Acceptance signals (design C10.2, Thurgood row — A-D5/LE-D4 discipline)

| Signal | Predicted (design) | Measured | Verdict |
|---|---|---|---|
| Lock-set == pinned set (`per-agent-ambient-design.md` § Thurgood) | universals (always-set) + test-development-standards + process-development-workflow (git/commit core) | per-agent members == {process-development-workflow, test-development-standards}; core delivered section-grain via asserts | ✅ |
| Computed-manifest verdict honored (Req 10 AC2) | no standing manifest; nothing rendered | `collapses-into-catalog` → base directive; ZERO Ground-truth sections both targets | ✅ |
| \|union\| (ambient manifest members) | always-set 9 + 2 | **11** | ✅ |
| \|per-agent members\| | 2 | **2** | ✅ |
| Both targets agree | equal member sets | cc == kiro (id-set equality verified) | ✅ |
| Observed baseline (committed `thurgood.json` at cutover) | ~18 resources | **18** (`canonical/baselines/thurgood.ambient-baseline.json`, mechanically normalized — all doc resources, no KBs) | ✅ |
| Shrink (delta against the baseline) | the ~85% on-demand trim | **9 removals** (`demotion-delta.json`), each `replaces:`-covered | ✅ |

## Validation signatures (independent-validation default, amendment 4)

**Owning seat — Thurgood (content confirmation, 11.1):** PENDING

**Independent validation — Stacy (re-derivation + coverage-of-coverage):** PENDING

**Main-loop engineering verification:** PENDING

## Adjudication notes (owner-ruled interpretation calls, this cutover)

1. **`@figma-console-mcp` dropped (accepted-with-reason)** — see the diff artifact's
   Regression adjudications: the grant is dead (server not in `.mcp.json`, referenced
   nowhere); dropping it loses no reachable capability. Reviewed by both validation seats.
2. **Prompt KB table dropped** — the hand Kiro config defines zero knowledgeBase resources;
   the table described indexes that were never wired (stale-falsehood class, same as
   Lina's). Grep/Glob capability carried in MCP Practice Notes.

## Routed items (non-blocking, carried forward)

1. **U5+ cutovers inherit**: verify the FULL verbatim heading line (not a prefix) for every
   route; registry-ghost grants (validate_component class) exist in other hand ports — check
   each cutover's tool list against C5 introspection.
2. **Sparky (U5) heads-up**: first-generation seat (no CC port to diff) — content-completeness
   check replaces the diff artifact; content-authoring is the first subtask.
