# Task 4 Parent Completion: U2 — Net-New Checks + Re-arms

**Date**: 2026-07-14
**Spec**: 125-B-classification-map
**Unit**: U2 (single-PR unit; branches from main post-U1-s, rebased onto post-prune main pre-PR)
**Validation**: Tier 3 — full `npm test` (377 suites / 8,987 tests, green, post-rebase) + `tsc --noEmit --skipLibCheck` (clean)
**Coordination**: Claude Opus 4.8 (main loop); per-subtask agents/tiers below

---

## Success criteria — all met

| Criterion | Evidence |
|---|---|
| Exp 3 evidence exists (boundary call + FP/FN + hygiene caveat as recorded finding) | `completion/u2/exp3-spike-evidence.md` (4.1) — Thurgood audit PASS |
| WCAG check re-armed at canonical allowlist with floors; audit-clean ⇒ arm-green; validation promotion audit-first | 4.2 audit (69 contracts THROUGH the armed matcher) + 4.3 implementation; suite green with all fixes applied; `:435` flipped clean-by-inventory |
| Console-fail armed on root lanes with seeded allowlist; churn countable | 4.4 — net-new `setupFilesAfterEnv` wiring; 12-entry (suite × pattern × reason) allowlist, one object per line |
| All U2 register entries recorded | Six landed this unit: `no-autonomous-token-creation`, `console-fail-root-lanes`, `console-fail-subpackage-deferred`, `wcag-format-validity` (record-only), `inverse-drift-incremental-build` (WATCH), `wcag-required-refs`, `validation-criteria-completeness` — register at TEN entries |

## Subtask ledger

| Subtask | Agent (planned → actual) | Outcome |
|---|---|---|
| 4.1 Exp 3 | Ada/Opus + Thurgood/Sonnet audit+register → as planned | Verdict: structural detection merely-hard (flat ~100%; hierarchical inverts); approval-verification UNMECHANIZABLE at diff surface → warn-tier, never barrier. First register disposition set by measurement. |
| 4.2 Pre-arm audits | Lina/Opus (recorded upward divergence) → as planned | 69 selected; 7 nulls adjudicated (3 N/A, 4 fixes); 12.6 inventory ZERO; DD3 counts corrected (7/10/1/4); `state_disabled` razor's-edge escalated per never-self-exempt |
| 4.3 Re-arm + promotion | Lina/Sonnet → as planned | DORMANT→armed at the canonical allowlist; **Peter amendment (2026-07-14): three-literal floor, `state_disabled` excluded PENDING the Button-CTA adjudication**; `:435` promoted; 4 bite fixtures mutate→red→restore→green |
| 4.4 Console-fail | Lina/Sonnet + Thurgood/Sonnet register landing → as planned | Armed root-lanes-only; two self-caught hook bugs documented; jsdom doc-ballot discharged; sub-package deferral an explicit register row |

## Peter decisions recorded this unit

1. **Three-literal floor** (2026-07-14): `state_disabled` excluded from the per-literal presence floor — *pending adjudication*, not pre-judged; the matcher still requires refs on its contracts. Deviation from design DD3-as-written, by the ratifier, on the corrected counts; recorded as a dated history fact on `wcag-required-refs`.
2. **Button-CTA disabled-state question routed** as its own component-design item (chip spawned; Lina investigates, Peter rules). Explicitly NOT resolved inside CI work.
3. **U1b candidate row logged**: philosophy-conformance check (red on *presence* of a disabled-state declaration outside an allowlist) — Peter's instinct, classify via the U1b wave process.

## Governance notes

- The steward-writes-register convention held under load: Lina twice declined `governance/**` writes on committed-rule grounds and drafted rows for Thurgood, who audited (spot-checking factual claims against source) and landed with drafted-by/landed-by attribution.
- Exp 3's U3 recommendation recorded: compose token-grain detection (flat families) with file-grain routing (nested families); buy AST tooling only if experienced noise justifies it.

## Post-completion obligations

- U2's PR is an **instrument PR**: excluded from the observation window's observed set; its merge is a Req 8.4 material-change event → DD8 segment boundary (console-fail arming changes the failure surface). Record in the window dataset at U1-c.
- Gate-bite proofs post-merge (throwaway PRs, 125-A pattern): console-fail and the re-armed WCAG floors.
- docs-MCP reindex post-merge on main.
