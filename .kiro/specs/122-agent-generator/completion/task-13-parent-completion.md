# Task 13 Completion (Parent): Cutover — Data (U7, Android platform engineer)

**Date**: 2026-07-11
**Task**: 13 — Cutover: Data (Parent, Unit U7, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-cutover-data (single-parent unit — opens U7's PR; accepted at Peter's merge, governance-law carve-out)
**Type**: DIFF-VS-BASELINE (Data WAS CC-ported)

---

## Success criteria — all met

1. **Canonical source authored + both targets generated + checks green/adjudicated + sweep report + Stacy validation** ✅
   — `canonical/agents/data.md` (2 law locks after adjudication; none-trim-stale-snapshots verdict with 2 trims;
   Leonardo `routes.agents` `resolves`; 8 capability cues + 9 demotion cues; 4 Android skills; 2 android knowledge-base
   globs; all-3-MCP toolSubset). All ten checks + C7 + coverage-map green. Report: `cutover/data-cutover-report.md`.
2. **none-trim-stale-snapshots verdict honored** ✅ — each trimmed `dist/android/*.kt` emits a per-artifact
   hard-negative-plus-positive cue (Req 12 AC2(a)); the DesignTokens trim returns the per-theme SET via
   `shape: per-theme-set` (Req 12 AC2(b)); both `fires: unconditional` cover the orphaned case (K-D1).
3. **Sweep 8 exercises artifact-path members on his live trims** ✅ (D-A1) — demotion set = 11 removals (9 docs +
   2 `dist/*.kt` artifact-paths), 11 `replaces:` cues one-for-one.
4. **Diff-against-baseline, ZERO unexplained regressions** ✅ — `cutover/data-diff-vs-baseline.md`: full
   Baseline-subsection reconciliation table; every baseline line-item carried / channel-moved / renamed /
   dropped-with-reason; tool grant a strict superset (+`rebuild_product_index`, zero drops). Regression
   adjudications: none.
5. **Data in the cutover ledger; artifacts diff-guarded** ✅.

## The one substantive call — token-law adjudication (Ada)

The 119-A spine locked `token-quick-reference` as Data's token-first law. Ada (token substance owner, consulted per
Peter's direction) ruled it **does not materialize as law** — it is a routing table whose own Purpose disclaims being
a reference (the design.md C1 example's `"Selection Priority"` heading is a fake that does not exist in the doc).
Ruling: lock **`product-token-governance`** (the real System-First mandate, force-loaded in `data.json`, the same
token-law Sparky/Kenya lock) and demote `token-quick-reference` to an on-demand route. Recorded in
`canonical/adjudications.yaml` as `assessment-gap` (both directions), Ada's ruling as the cited record. C7 passes on
both law predicates (`owner: lina` / `owner: ada` per schema.ts:51).

## Firsts / notable

- **First cutover to consult a domain owner mid-authoring for a substance ruling** (Ada) — the design's C7
  owner-adjudication path exercised live, before authoring rather than at the review gate.
- **First diff-vs-baseline platform consumer** with a real dist-artifact trim (`shape: per-theme-set` exercised on
  live Android theme-varying tokens).
- **Baseline-parity tool addition** (`rebuild_product_index`) — the baseline body cued a tool its frontmatter never
  granted; the cutover closes that latent inconsistency (both reviewers ruled it legitimate).

## Found-and-fixed at this cutover

1. **Volatile-fact lint false-positive** on `Specs 108/109` (plural `Specs` + digit) — normalized to singular
   `Spec 108/109`, matching the existing `Spec 094` style. Not a content change.
2. **Product-Token-Governance double-load** in `data.json` (`file://` + `skill://`) — deduped by construction in the
   baseline (same class as Kenya/Leonardo/Sparky).

## Acceptance signals

Union **11** on both targets (agree); per-agent members **2** (platform-implementation-guidelines,
product-token-governance); baseline **19 → 11 removals** all `replaces:`-covered; verdict `none-trim-stale-snapshots`
renders 2 trims; tool grant strict superset. Detail: `cutover/data-cutover-report.md`.

## Validation signatures (amendment 4)

- **Data (seat)**: CONFIRMED — ground-truthed trims/skills/gradle-gap/token-law against live artifacts; no silent drop.
- **Stacy (independent)**: CONFIRMED — lock-independent full re-diff + coverage-of-coverage; no second missed
  regression; adjudication sound; tool add legitimate.
- **Ada (token owner)**: RULED — the token-law adjudication; re-verified independently.
- **Main loop (engineering)**: all checks re-run green; full battery green.

## Validation (Tier 3)

`npm test` **8987/8987** (377 suites) · `mcp-server` **602/602** (36 suites) · generator lane **330/330** · root +
scripts + generator tsc clean · all ten checks + C7 + `audit:coverage-map` green · diff-guard full-run-green with
lock refreshed (2-pass settle).

## Two findings routed to Peter (out-of-scope of this gate)

1. **Stale `not-yet-ported` route dispositions** accumulate — rendered as-authored, never flipped; C7(b) exempts them.
   The Leonardo completion-doc "flips automatically" claim is inaccurate. Suggest a C7(b) sharpening or a
   predecessor-backfill rule.
2. **Sparky's `owner:` values likely wrong** per schema.ts:51 (used `owner: sparky` for Lina's/Ada's docs). Data does
   it right. Suggest a small follow-up correction (touches a merged governance surface — Peter's call).

## Delegated-tier capture

Planned `Agent: Thurgood + Data` (13.1) / `Thurgood + Stacy` (13.2); executed: main loop (Opus 4.8) authoring +
engineering; **Ada agent** token substance ruling (added — an unplanned domain-owner consult, the correct move for a
non-materializing law lock); **Data agent** seat confirmation; **Stacy agent** independent validation. Agent-evolution
signal: Ada pulled in for a substance adjudication the plan didn't anticipate — a data-point that consumer cutovers
touching another owner's doc-as-law may need the doc owner mid-authoring, not only at review.
