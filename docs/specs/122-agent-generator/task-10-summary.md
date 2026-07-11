# Task 10 Summary: Cutover — Lina (U3)

**Spec**: 122-agent-generator · **Date**: 2026-07-11 · **Unit**: U3 (single-parent, PR at completion)

## What happened

Lina is the second generator-SSOT agent. Her canonical source (`canonical/agents/lina.md`) now generates her Claude Code agent and Kiro config/prompt; her runtime artifacts are ledger-derived diff-guarded surfaces. The carry corrected years of accumulated drift by construction: 15 dead pre-119-A doc paths became live routes/cues, fake tool names became registry-verified grants, and the known L1 defect — her Kiro config granting no `@designerpunk-application` server despite her prompt depending on it — is fixed structurally (C7's grant leg now enforces it).

## Key outcomes

- **Acceptance signals (Req 23 AC2)**: ambient union 10 (both targets agree), per-agent lock = `contract-system-reference` only (== the pinned design set), ZERO family/standards docs ambient, baseline 35 → 27 demotions, each with a verified replacement cue.
- **Ground-truth render gap closed (Req 10 AC3)**: her `catalog-is-manifest` verdict now renders a `## Ground truth` section on both targets (assembly-grain faithfulness verbs, per-target tool naming) — the directive existed since Task 2 but no adapter consumed it.
- **Check-harness process leak found and fixed**: ~230 orphaned MCP server processes (accumulating since June 29) were wedging and massively slowing local check runs. A new child-process guard reaps spawned servers on parent exit/signal — with a pid snapshot that survives the MCP SDK's close-window pid-nulling. Local battery: ~30+ min → ~41 s. Server-side complement routed.
- **Three-gate validation held**: Lina's seat confirmation (CONFIRMED — every route live-resolved, grants set-identical, no half-false diff claims) and Stacy's independent re-derivation, recorded verbatim in the cutover report.

## Validation

Full suite 8987/8987 · agent-generator lane 322/322 · all ten 122-* checks + C7 clean + coverage audit green · zero unexplained regressions in the classified diff.

## Artifacts

`canonical/agents/lina.md` · `canonical/baselines/lina.ambient-baseline.json` · generated `.claude/agents/lina.md` + `.kiro/agents/lina.{json,-prompt.md}` + manifests + attribution + demotion-delta · `cutover/lina-cutover-report.md` · `cutover/lina-diff-vs-baseline.md`
