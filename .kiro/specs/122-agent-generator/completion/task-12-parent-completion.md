# Task 12 Completion (Parent): Cutover — Leonardo (U6, the consumer/hub)

**Date**: 2026-07-11
**Task**: 12 — Cutover: Leonardo (Parent, Unit U6, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-leonardo (single-parent unit — opens U6's PR; accepted at Peter's merge, governance-law carve-out)

---

## Success criteria — all met

1. **Canonical source authored + both targets generated + checks green + sweep report + Stacy validation** ✅ — `canonical/agents/leonardo.md` (1 law lock; empty manifest verdict; handoff routing table → `routes.agents`; 15 capability cues + 12 demotion cues; first non-empty `skills: [impeccable]`; DesignerPunk-CLI consumer-repo commands; all-3-MCP toolSubset). All ten checks + C7 + coverage audit green. Report: `cutover/leonardo-cutover-report.md`.
2. **Handoff routing table preserved as `routes.agents` (Req 10 AC5); empty-by-design manifest verdict honored** ✅ — `routes.agents` carries sparky/thurgood (`resolves`) + kenya/data/stacy (`not-yet-ported`) — the LE-D1 live instance with both dispositions. The `empty` verdict renders no `## Ground truth` section (intentional, Req 10 AC2).
3. **Acceptance signal (Req 23 AC3)** ✅ — demotion-delta = **12 removals = exactly 60%** of the 20 baseline members (a per-MEMBER figure, LE-D4); check 8 green (12 removals, 12 `replaces:` keys, one-for-one); sweep 3 green (the `Product-Token-Governance` double-load fixed by construction).
4. **Diff-against-baseline, ZERO unexplained regressions** ✅ — `cutover/leonardo-diff-vs-baseline.md`: the ~60% trim (spec's highest-exposure channel-move surface) classifies as 12 channel-moves, EACH with a C7-resolving replacement cue; the tool set is a strict superset (zero dropped, 6 added); two CC-port-only sections (Onboarding Awareness, Testing Practices) carried rather than lost. Regression adjudications section: none.
5. **Leonardo in the cutover ledger; artifacts diff-guarded** ✅.

## Engineering / firsts delivered

- **First non-empty `skills:` round-trip** (`impeccable`) — sweep-2 exercised live: CC gains the `Skill` core tool + emitted `.claude/skills/impeccable/**`; Kiro emits the `skill://` resource; Direction-B ref-resolution verified. No generator change needed — the skills machinery (built at Task 3/5) worked on its first real agent.
- **First `empty` ground-truth verdict** honored — renders nothing.
- **First mixed-disposition `routes.agents`** — `resolves` and `not-yet-ported` in one agent (LE-D1 live instance).

## Found-and-fixed at this cutover

1. **Two CC-port-only sections carried, not lost** — Onboarding Awareness + Testing Practices (in the hand CC port, absent from his Kiro prompt) carried into canonical source, now delivered to both targets (fixed-before-merge).
2. **Impeccable detect.mjs adjudicated** — not a standalone command (not +x; would fail C7's script-path leg); delivered via the `skills: [impeccable]` declaration.

## Acceptance signals

Union 10, per-agent lock == {cross-platform-vs-platform-specific-decision-framework}, baseline 20 → 12 removals (60%, each replaces-covered), both targets agree, empty verdict renders nothing. Detail: `cutover/leonardo-cutover-report.md`.

## Validation signatures (amendment 4)

- **Leonardo (seat)**: recorded in `cutover/leonardo-cutover-report.md` — the key judgment being whether all 12 trims are genuinely fine as on-demand (not a real ambient need).
- **Stacy (independent)**: recorded in the cutover report.
- **Main loop (engineering)**: all checks re-run green after the body additions; final battery green.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · lane **326/326** · root + scripts + generator tsc clean · all ten checks + C7 + `audit:coverage-map` green · diff-guard full-run-green with lock refreshed.

## Carried forward (routed items)

1. U7+ cutovers: the skills round-trip and empty-manifest render are now both proven; verify FULL verbatim heading lines.
2. Leonardo's `routes.agents` will flip kenya/data/stacy to `resolves` automatically as each cutover lands (LE-D1 — body pointers that become true by regeneration).

## Delegated-tier capture

Planned `Agent: Thurgood + Leonardo (+ Stacy)`; executed: main loop (Fable 5) authoring; **Leonardo agent** (session model, now spawnable post-generation) seat confirmation; **Stacy agent** independent validation. Same calibration as prior cutovers.
