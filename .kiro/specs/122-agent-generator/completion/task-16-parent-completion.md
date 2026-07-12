# Task 16 Completion (Parent): Cutover — Stacy (U9, product governance & QA) — THE FINAL CUTOVER

**Date**: 2026-07-11
**Task**: 16 — Cutover: Stacy (Parent, Unit U9, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-stacy (single-parent unit — opens U9's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: DIFF-VS-BASELINE (Stacy WAS CC-ported — the hand port was the transform dry-run, port-recon-stacy.md)

> **Milestone**: with U9 merged, the generator is SSOT for **all 8 agents** (U2 Ada → U9 Stacy). The cutover group is
> complete; only U10 (OB-7 CLAUDE.md retirement) and U11 (Closeout — incl. OB-8/OB-9) remain.

---

## Success criteria — all met

1. **Canonical source authored + both targets generated + checks green/adjudicated + diff-vs-baseline + independent validation** ✅
   — `canonical/agents/stacy.md` (sole law lock test-development-standards; collapses-into-catalog verdict;
   ALL 5 routes.agents resolve; audit cue set + 8 demotion cues; her 6-command audit catalog; zero skills;
   completion-docs/spec-summaries knowledge fallback). All ten checks + C7 + coverage-map green.
2. **Second differential-auditor; collapses-into-catalog renders NOTHING** ✅ (parity with Thurgood U4 — no `## Ground truth`).
3. **Audit-command catalog carried (C12-provisioned)** ✅ — audit:coverage-map, audit:mode-parity, audit:theme-drift,
   test:coverage, governance-check.sh, verify-gate-registration.sh (npm scripts verified; script-paths +x, C7 class-d).
4. **Diff-against-baseline, ZERO unexplained regressions** ✅ — `cutover/stacy-diff-vs-baseline.md`; tool grant
   IDENTICAL to the hand port (29==29, zero drops/adds); every audit block byte-identical (Thurgood-verified).
5. **THE SELF-REVIEW RULE honored (amendment 4)** ✅ — the independent second-reviewer signature is the DEFAULT
   done-condition: **Thurgood** (Peter-routed) is the gate-satisfying independent validator (CONFIRMED); Stacy's own
   seat review is recorded as NON-gate-satisfying (CONFIRMED as a signal); main loop did the mechanical verification.
6. **Stacy in the cutover ledger; artifacts diff-guarded** ✅ — all 8 agents now generator-SSOT.

## The final-cutover finding: 5 un-routed Product-MCP tools → routed to Leonardo

Sweep 6's declaration-diff is **complete for the first time at this final cutover** (all 8 subsets now exist), and it
surfaced 5 Product-MCP tools in no agent's subset: `find_principles`, `find_templates`, `get_domain_object`,
`get_product_component`, `list_product_templates`. Per Peter's routing, **Leonardo ruled** (product architect): route
all 5 to himself — each is the product-repo analog of a system-side capability he already uses; the empty Product-MCP
index in this design-system-source repo is index-state, not relevance (Req 7 AC2; Product-MCP is populated by the
consumer product that installs DesignerPunk). Applied: 5 tools + 5 cues added to `canonical/agents/leonardo.md`,
regenerated in this PR (a cross-agent change, documented). Both reviewers confirmed the routing sound and correctly
scoped; leaving them routed (vs an adjudications.yaml row) is correct (sweep 6 passes on routed tools). Leonardo's
candid caveat (`get_domain_object`/`find_templates` overlap; could trim to 3) is recorded for Peter.

## Acceptance signals

Union **10** both targets (agree); sole per-agent lock **test-development-standards**; baseline **15 → 8 removals**
all replaces-covered (no artifact trims — differential-auditor); verdict `collapses-into-catalog` renders nothing;
tool grant identical to hand port; **all 5 agent routes resolve** (first cutover with a fully-resolving roster).

## Validation signatures (amendment 4)

- **Thurgood — INDEPENDENT gate-satisfying reviewer (Peter-routed)**: CONFIRMED (byte-diff, 29==29 grants, 15→8→10
  reconstructed, predicate materialized, Leonardo routing sound). No DISPUTED items.
- **Stacy (seat — non-gate signal)**: CONFIRMED (audit catalog resolves; no content lost; tools correctly Leonardo's).
- **Main loop (engineering)**: full battery green; un-routed-tools finding resolved per Leonardo's ruling.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · `mcp-server` **602/602** (36 suites — relocation-integrity gate clean;
Stacy regenerated + Leonardo changed) · generator lane **330/330** · root + scripts + generator tsc clean · all ten
checks + C7 + `audit:coverage-map` green · diff-guard **no-op-green**.

## Delegated-tier capture

Planned `Agent: Thurgood + Stacy`; executed: main loop (Opus 4.8) authoring + engineering + mechanical verification;
**Leonardo agent** ruled the un-routed-tool routing (an unplanned Peter-directed domain-owner consult — the correct
move for a tool-routing call in his domain); **Thurgood agent** as the INDEPENDENT gate-satisfying validator (Peter's
routing, amendment 4); **Stacy agent** seat self-review (non-gate signal). Two domain-owner consults this cutover
(Leonardo routing, Thurgood independent validation) — both Peter-directed.

## Remaining in Spec 122 (post-cutover)

- **U10 — OB-7** (Task 17): generate the CLAUDE.md always-lane + retire the interim CLAUDE.md (record-first ballot).
- **U11 — Closeout** (Task 18): 119-B/123 handbacks + discharge **OB-8** (routing backfill + C7(b) strict-check) and
  **OB-9** (owner-value audit). Also: sweep-5's pre-cutover context retires now (a recorded protection-list change).
