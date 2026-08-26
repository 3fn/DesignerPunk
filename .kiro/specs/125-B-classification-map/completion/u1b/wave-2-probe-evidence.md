# Wave 2 — Probe Evidence (Task 5.3 step (b), probe leg)

**Date**: 2026-08-25
**Method**: pilot three-leg substitution + comparative A/B describe-grain probe (pre-committed in `wave-2-assessment.md` §6); probe scenario byte-fixed BEFORE any run (md5 `a7a284c13789497dd6b449511589bf70` — three questions: contract fields/location; accessibility obligations + verification; pre-implementation validation).
**Arms**: two fully isolated clones (own `.git`, own local bare origins, no credentials/.env by construction), base = wave-branch `69801315` + symmetric #81 revert (`33f1c307`, identical SHA both arms). Pruned arm additionally: the ratified 5-hunk candidate diff as in-world prune commit (`f619664c`). Live repo untouched.

## Substitution legs (verified with positive controls, both directions)

| Leg | Result |
|-----|--------|
| 1. Corpus files | Control: ALL FIVE Wave-A2 patterns present at their recorded locations (positive control). Pruned: ZERO hits |
| 2. Generated prompt surfaces | ZERO A2 embeds in `CLAUDE.md` + `.claude/agents/` + `canonical/` in BOTH arms — generator leg NULL as the assessment §4 expected (none of the three surfaces is a tracked generator input; grep-verified pre-build in the live repo and re-verified in-arm) |
| 3. MCP served output (LIVE) | Per-arm docs-MCP (each arm's own built `mcp-server/dist`, `WORKSPACE_ROOT` = the arm; server startup log confirms it indexes the ARM's governance tree) queried via direct JSON-RPC: CSR § "Contract Fields" serves the OLD `(null if not applicable)` row in control / the NEW rewritten row in pruned — **positive control in BOTH directions**. The tracked `.mcp.json`'s absolute live-repo paths (wave-1 MCP-leak hazard) excluded via per-arm `--mcp-config` + `--strict-mcp-config` on every session |

**Environment**: both arms at green baselines pre-probe — full `npm test` 367 suites / 8892 tests + clean `tsc`, BOTH arms. (Arm-construction note: the first control baseline ran 2 suites red — the MCP sub-package `tsc` builds were missing from the arm build script, an arm-construction gap, not a corpus defect; fixed in both arms, both suites green on re-run, pruned green first try with the fixed script.)

## Run ledger (probe)

| Run | Arm | Outcome | Notes |
|-----|-----|---------|-------|
| v1 | control | VOID (max-turns 4, no output) | Turn cap too low for a three-part scenario — execution parameter, raised symmetrically |
| v2 | control | VOID (max-turns 8, no output) | Same |
| v3 | control | VOID-WITH-CAUSE (completed, 29 turns) | **MCP tools permission-blocked in headless mode** — agent fell back to disk reads of the same substituted corpus (corpus-valid but off-method: the docs-MCP leg must be exercised in-session). Kept: `wave2b/probe-control-void1.jsonl` |
| final | control | **VALID** (success, 31 turns, 27 live MCP calls, 0 permission errors) | Fixed via scoped `--allowedTools` (MCP query tools + Read/Grep/Glob) — NOT `--dangerously-skip-permissions` (blocked by the parent harness's classifier; the narrow grant is the more contained mechanism anyway). `probe-control.jsonl` |
| final | pruned | **VALID** (success, 33 turns, 24 live MCP calls, 0 permission errors) | Identical parameters. `probe-pruned.jsonl` |

Runs SERIALIZED. Voids recorded, not discarded silently. Probe answers archived: `wave2b/probe-{control,pruned}-answer.md` (session scratchpad; texts summarized below are quoted from them).

## Comparative reading (pre-committed criteria: gross education loss in the pruned arm)

**Q1 (fields/location)** — substance identical (same file layout, header/per-contract/exclusion fields, naming convention, three-state model). ONE difference, on the rewritten line itself: control's field table teaches "`wcag` | WCAG criterion supported (`null` if N/A)" — **the old, gate-contradicting form**; pruned teaches "required for allowlisted contracts — `'N/A'` sentinel when genuinely not applicable; null only for non-allowlisted" — **the corrected form**. The W2-5 rewrite delivers exactly its intended education improvement.

**Q2 (obligations + verification)** — both arms surface: the WCAG-ref obligation, the schema accessibility block, platform-agnostic contracts, the no-disabled-states law (2026-07-15 adjudication), tiered validation (Basic/Extended/Full), and manual screen-reader verification. Differences: control grounds the obligation in the PRUNED CHECKLISTS ("CDS § Validation Checklist makes 'Contracts Reference WCAG' a pre-implementation gate; PIG § Phase 1 repeats it") and never names the armed check or its allowlist; pruned explicitly tables the four armed barriers from the register (`wcag-required-refs` with the exact allowlist matcher, `wcag-format-validity`, `validation-criteria-completeness`, `contract-platforms-specified`). **The pruned arm's authority chain is the gate + register; the control arm's is the imposter checklists — the design outline's education→verification thesis, observed live.**

**Q3 (pre-implementation validation)** — both arms fully reproduce the Phase-1 process education (schema validation, contract review, Human-AI checkpoint) and the development sequencing. Control additionally quotes the pruned PIG:468 line verbatim; pruned reproduces the same process without it and cites the rewritten CDS Stage-2 line ("allowlisted-contract wcag values" — accurate). No process education lost.

**Unprompted corroboration (both arms, independently)**: BOTH agents flagged the Component-Templates legacy-name drift unprompted — control via direct investigation (also catching PIG's `provides_float_label_animation` banned-prefix example, the pre-063 checklist field lists = the CDS:804-829 staleness Lina flagged at consult R2-1, and PIG's disabled-state contradictions); pruned via the register's education-drift hazard row, which it then confirmed firsthand against the tree and translated into practical authoring guidance ("author against the Concept Catalog, not the templates"). A blind control-arm agent independently reproducing the consult's staleness findings is strong corroboration that the U1 hazard is real and discoverable.

## Probe verdict

**NO GROSS LOSS DETECTED.** Every obligation, verification layer, and process step surfaced by the control arm is surfaced by the pruned arm. The observed differences run in the prune's favor: the pruned arm teaches the accurate sentinel semantics (control teaches the form that reds the gate) and cites the mechanical gates as the obligation's authority (control cites the imposter checklists). Reporting discipline: this is one paired describe-grain probe — evidence of no gross education loss, NOT proof the prune is safe; the trial and the wave window carry the behavioral question.
