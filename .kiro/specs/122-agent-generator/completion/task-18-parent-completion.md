# Task 18 Completion (Parent): Closeout — handbacks + OB-8/OB-9 discharge — SPEC 122 COMPLETE

**Date**: 2026-07-11
**Task**: 18 — Closeout (Parent, Unit U11, Tier 3) — the FINAL task of Spec 122
**Spec**: 122-agent-generator
**Branch**: task/122-closeout (single-parent unit — opens U11's PR; Peter-merged)

> **Milestone**: with U11 merged, **Spec 122 is complete** — the agent generator is delivered, all 8 agents are
> generator-SSOT on both runtimes, the CC always-layer is generated (OB-7), and every tracked closeout obligation is
> discharged.

---

## Success criteria — all met

1. **119-B handback written** ✅ — a closeout section in `119-B-deferred-obligations.md` with the full OB disposition
   table: OB-5/6/7/8/9 CLOSED by 122; OB-1–4 remain OPEN as Docs-MCP-infrastructure work (not 122's — OB-1's scanner
   repoint was routed out per Req 25 AC2).
2. **123 handback written** ✅ — `.kiro/specs/123-consumer-distribution/inbound-from-122.md`: what 122 delivered (the
   pipeline + adapters + CC always-layer), the 122↔123 boundary (consumer-side delivery is 123's; Product-MCP is
   intentionally empty here; Cursor is the proof-of-additivity target), and the `TargetAdapter` seam 123 extends.
3. **Deferred-obligations ledger reconciled** ✅ — OB-5 (steering-addressing cue, Thurgood U4), OB-6 (all ports
   regenerated), OB-8, OB-9 marked CLOSED; the CLAUDE.md interim-stopgap banner is retired (done at #66 — the generated
   `CLAUDE.md` carries the generated banner, no stopgap prose; no coexistence past 122).

## OB-8 discharged (routing backfill + C7(b) strict-check)

- **One-time backfill**: the 7 stale `not-yet-ported` routes flipped to `resolves` now that the full roster is ported
  — ada→lina/thurgood, leonardo→kenya/data/stacy, lina→thurgood, sparky→leonardo. The generated prompts no longer
  strand these agents on "seat not generated yet, route via Peter."
- **C7(b) sharpened** (`canonical-vs-truth.ts` checkAgentRoutes): a `not-yet-ported` whose target IS in the ledger now
  FAILs (a stale escape hatch); a `not-yet-ported` whose target is genuinely un-ported stays exempt (the valid LE1
  escape hatch). **Prove-it-bites recorded** as a unit test (`canonical-vs-truth.test.ts` — a stale not-yet-ported →
  FAIL). The fixture's escape-hatch route was retargeted to a non-ledger placeholder (`_fixture-peer`) so the valid
  case stays exercised without tripping the sharpened check.
- Done here (not earlier) so the intermediate cutovers stayed self-contained — arming the strict check before the last
  cutover would have forced predecessor-churn at each step.

## OB-9 discharged (owner-value audit)

Audited every agent's governance-as-law `owner:` against the doc's substance owner (schema.ts:51). All correct except
**Leonardo's `cross-platform-vs-platform-specific-decision-framework`** (`owner: leonardo` → **`lina`**). Consulted
Lina (the Agent-Directory-listed doc owner); she ruled the doc's content is component cross-platform IMPLEMENTATION
(her domain), so `owner` = lina; Leonardo keeps LOCKING it (his signature law) — the field names the content-domain
adjudicator, not the lock holder. **Peter confirmed** (boundary doc). A per-lock rationale comment is recorded in
canonical source so the audit doesn't re-open it. Sparky's three were corrected earlier (#63).

## Sweep-5 retirement (a recorded protection-list change — flagged for Peter)

Sweep 5 (`122-sweep-5-corrected-state`) is a **pre-cutover-window-only** gate (Req 19 AC1's named exception;
re-entry protection lives in the standing class checks). All cutovers are done, so its required-check context is due
for removal from branch protection — a **Peter Settings action** (like enabling branch protection), paired with an
update to `verify-gate-registration.sh`'s count-assert. It is NOT removed in this PR (that's a protection-list/Settings
change, not a code change); flagged here as the one closeout follow-up. Leaving it registered is harmless (it still
passes).

## Validation (Tier 3)

All ten `122-*` checks + coverage-map green (diff-guard **no-op-green**); generator lane **331/331** (incl. the new
OB-8 prove-it-bites test); root + scripts + generator tsc clean; root `npm test` + `mcp-server` suites green. The
backfill correctly re-rendered ada/leonardo/lina/sparky (routes now `resolves`); Leonardo's owner change doesn't render
(C7-internal), so only his lock refreshed.

## Delegated-tier capture

Planned `Agent: Thurgood`; executed: main loop (Opus 4.8) authoring + engineering (the C7(b) strict-check + test, the
backfill, the handbacks); **Lina agent** ruled the one ambiguous OB-9 owner value (Peter-directed pattern), **Peter
confirmed**. One domain-owner consult (Lina, for the boundary doc).

## Spec 122 — COMPLETE

All 18 tasks done across 11 units (U1 substrate → U9 cutovers → U10 OB-7 → U11 closeout). The generator is the single
source of truth for all 8 agents on both runtimes; the CC always-layer is generated and the interim CLAUDE.md retired;
the guard surface (diff-guard + canonical-vs-truth + 8 sweeps) is on the PR gate. Downstream: 119-B (routing +
measurement) and 123 (consumer distribution) have their handbacks. One follow-up: the sweep-5 protection-list removal
(Peter's Settings action).
