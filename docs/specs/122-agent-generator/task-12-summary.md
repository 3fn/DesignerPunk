# Task 12 Summary: Cutover — Leonardo (U6, the consumer/hub)

**Spec**: 122-agent-generator · **Date**: 2026-07-11 · **Unit**: U6 (single-parent, PR at completion) · cutover position 5

## What happened

Leonardo is the fifth generator-SSOT agent and the consumer/hub — his cutover carries the **spec's largest channel-move surface**: a ~60% on-demand trim (12 of his 20 ambient members demoted to on-demand cues). That made the rule-of-the-bucket the whole game here: a demotion counts as a faithful "channel-move" only if its replacement cue actually resolves against ground truth, otherwise it's lost capability (a regression). All 12 passed — C7 resolved every replacement cue, and sweep-8 verified one-for-one coverage (12 removals, 12 replaces keys). Zero regressions.

He also exercised three pipeline firsts, all clean and needing no generator change: the **first non-empty `skills:` field** (the Impeccable design-creation skill — CC gains the `Skill` tool, the skill tree emits, and sweep-2's round-trip verified it), the **first `empty` ground-truth verdict** (a consumer owns no source, so it correctly renders nothing), and the **first mixed-disposition handoff routing** (his `routes.agents` points at both already-cut-over seats — Sparky, Thurgood — as `resolves` and not-yet-cut-over seats — Kenya, Data, Stacy — as `not-yet-ported`).

## Key outcomes

- **Acceptance signals**: union 10 (9 always-set + 1 law lock: his cross-platform-vs-platform-specific decision framework, the silent-failure law); demotion = exactly 60% as a per-member figure; the hand config's `Product-Token-Governance` double-load fixed by construction.
- **Two CC-port-only sections carried, not lost**: Onboarding Awareness and Testing Practices existed in the hand port but not his Kiro prompt; carried into canonical, they now deliver to both targets.
- **Impeccable detect.mjs** rides the skill declaration rather than a standalone command (it isn't executable, so a command entry would fail C7).

## Validation

Full suite 8987/8987 · agent-generator lane 326/326 · all ten 122-* checks + C7 clean + coverage audit green · zero unexplained regressions on the highest-exposure channel-move surface.

## Artifacts

`canonical/agents/leonardo.md` · `canonical/baselines/leonardo.ambient-baseline.json` · generated `.claude/agents/leonardo.md` + `.kiro/agents/leonardo.{json,-prompt.md}` + emitted `.claude/skills/impeccable/**` + manifests + attribution + demotion-delta · `cutover/leonardo-cutover-report.md` · `cutover/leonardo-diff-vs-baseline.md`
