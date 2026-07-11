# Task 9 Completion (Parent): Cutover — Ada (U2, the FIRST CC cutover)

**Date**: 2026-07-10
**Task**: 9 — Cutover: Ada (Parent, Unit U2, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-ada (single-parent unit — this completion opens U2's PR; accepted at Peter's merge, governance-law carve-out)

---

## Success criteria — all met

1. **Canonical source authored + both targets generated + checks green + sweep report + Stacy validation** ✅ — `canonical/agents/ada.md` (two-claim token-governance law; 6 doc routes; 2 agent routes; 27 cues incl. 20 demotion-coverage `replaces:` cues; 4 commands; 3 rich knowledgeBases; full toolSubset/writeScope/kiro fields; de-Kiro'd body). All ten checks + C7 + coverage audit green on the final state. Report: `cutover/ada-cutover-report.md`.
2. **Acceptance signal (Req 23 AC1)** ✅ — observed baseline **30** (correcting the stale 27; mechanically normalized from the committed hand config), |union| **10**, |per-agent members| **1**, both targets agree, shrink recorded as **20 removals** against the members count. Measured twice independently (main loop + Stacy's re-derivation).
3. **Ada in the cutover ledger; her artifacts diff-guarded** ✅ — `guardedRoots(repoRoot)` now LEDGER-DERIVES the per-agent runtime files + attribution sidecars (file-grain, so the 7 not-yet-cut-over hand agents are never flagged).
4. **Diff-against-baseline artifact, ZERO unexplained regressions** ✅ — `cutover/ada-diff-vs-baseline.md`: 14 classified rows; three regression-class defects found by the gates themselves, ALL **fixed-before-merge** (none adjudicated-away): the cue-namespacing misroute (Ada's DISPUTE), the completion-doc/spec-planning routing parity, and the routes.agents structured-but-not-rendered gap (Stacy's Medium finding).

## Engineering delivered with this cutover (the runtime lane going live)

- **generate.ts runtime per-agent lane** (`resolveForEmission` shared with the fixture): ledger agents emit real `.claude/agents/<a>.md` + `.kiro/agents/<a>.{json,-prompt.md}` + per-target manifests; demotion-delta generator-emitted (fresh side = manifest ids ∪ regenerated-config resources via ONE shared normalizer, so preserved KBs cancel and real trims register).
- **Rich knowledgeBase carry** (Task 5 open item CLOSED): schema fields + Kiro emission of the full objects; `expected-empty` formalized on the schema (Task 6 one-liner CLOSED).
- **CC core-tools rule** (complete-allowlist; `Skill` iff skills declared) — matches all six hand ports.
- **C7 grant surfaces armed** (leg 2 reads emitted configs, both targets — the lina.json bug class now fires).
- **Sweep 6 fleet-partial scoping** (29 pending-fleet tools = visible INFO, hard-arms at U9); sweeps 2/3/7 hardened against sidecars + rich-KB objects.
- **`cueToolRef`** (Ada's find): cues namespace by their OWN `mcp` field, fail-loud on ungranted; `MCP_TO_SERVER` hoisted to the shared adapters seam; regression-tested.
- **`renderAgentRoute`** (Stacy's find): both adapters render `routes.agents` in Routing — LE-D1's loop closed for the six remaining cutovers.

## Validation signatures (amendment 4)

- **Ada (seat)**: initial **DISPUTED** (the misroute — a REAL catch on her first read) → **CONFIRMED 2026-07-10** after fix+regeneration, verified by her at the seam, the test, and the artifact.
- **Stacy (independent)**: **CONFIRMED 2026-07-10** — own check runs (incl. her own full-suite run), signals re-derived by set arithmetic, classification audited (one Medium finding, fixed-before-merge), coverage-of-coverage clean (all 11 Ada artifacts guarded rows).
- **Thurgood (engineering, main loop)**: all fixes re-verified; final battery green.

## Validation (Tier 3)

`npm test` **8987/8987** · lane **308/308** · root + project tsc clean · all ten checks + C7 + `audit:coverage-map` green on the final branch state · diff-guard full-run-green with lock refreshed.

## Carried forward (routed items)

1. Route-tuning pass (Ada): a cue for token-governance's non-embedded sections; the routed-section-also-embedded dedupe rule candidate.
2. U3+ cutovers inherit: the find_docs-in-docs-subset rule; `.claude/agents` guarded-file derivation is automatic now (ledger-driven); the three-gate layering (seat → classification → governance) proven at debut and to be replicated as-is.

## Delegated-tier capture

Planned `Agent: Thurgood + Ada (+ Stacy)`; executed: main loop (Fable 5) engineering + authoring; **Ada agent** (session model) seat confirmation — her dispute materially improved the adapter; **Stacy agent** (session model) independent validation — her audit closed the LE-D1 delivery gap. Both seat validations were load-bearing, not ceremonial.
