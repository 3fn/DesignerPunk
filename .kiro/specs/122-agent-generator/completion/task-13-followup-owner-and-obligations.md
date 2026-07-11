# Task 13 follow-up: Sparky owner fix + OB-8/OB-9 recorded

**Date**: 2026-07-11
**Branch**: chore/122-owner-audit-and-routing-obligations (Peter-merged — touches agent-prompt canonical source + governance ledger)
**Origin**: the two findings surfaced at the Data cutover (Task 13 / U7); dispositioned by Peter 2026-07-11.

---

## What changed (4 files, low-risk)

1. **`canonical/agents/sparky.md`** — corrected his three `governanceAsLaw` `owner:` values from `sparky` to the doc's substance owner (schema.ts:51):
   - `contract-system-reference` → **lina**
   - `product-token-governance` → **ada**
   - `web-authoring-standards` → **lina** (Lina's ruling, 2026-07-11 — she owns the component-CSS Hard Rules that are its load-bearing core; Sparky is a governed consumer, not the adjudicator)

   **Sparky's generated runtime prompt is byte-identical** — `owner:` is a C7-internal adjudicator field that does not render into the prompt. This changes only *who gets asked* if a future check flags a substance mismatch, not what Sparky reads.

2. **`.kiro/specs/119-.../119-B-deferred-obligations.md`** — recorded **OB-8** (routing `not-yet-ported` staleness → C7(b) strict-check + one-time backfill, decided option A) and **OB-9** (owner-value audit across all agents). Both dispositioned to 122 closeout (Task 18 / U11).

3. **`.kiro/specs/122-agent-generator/tasks.md`** — added OB-8/OB-9 as explicit **Task 18 (Closeout) success criteria + subtask 18.3**, so the closeout sweep is a gate, not a verbal intention.

4. **`canonical/generated.lock`** — refreshed (input-closure changed; outputs unchanged).

## Why now vs. at closeout

- **Sparky's owners** were a *known* defect (Ada flagged the exact docs) — fixed promptly rather than deferred.
- **The systematic sweep** (all agents) + the **routing backfill/strict-check** are inherently post-all-cutover: arming the C7(b) strict check before U9 would force every remaining cutover to edit predecessors' files (the churn the self-contained-PR design avoids). So they land at U11, recorded as OB-8/OB-9 gates.
- Recording the obligations is the deliberate antidote to the very failure that produced OB-8 — an untracked "it'll flip automatically / get handled later" assumption that rotted into a false belief.

## Validation

All ten `122-*` checks green (diff-guard **no-op-green** with lock refreshed; C7 green with the new owner attribution; sweeps 1–8) · `audit:coverage-map` green · generator lane **330/330**. No `.ts` touched and Sparky's prompt is byte-identical, so the root/mcp-server suites are unaffected (not re-run).
