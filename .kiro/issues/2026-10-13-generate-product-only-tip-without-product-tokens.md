# Issue: after a system-token failure, `generate` prints the `--product-only` tip even when no product tokens are configured

**Date**: 2026-10-13 · **Status**: RESOLVED-pending-merge (PR named at open) · **Owner**: Lina (CLI surface, `src/cli/designerpunk.ts` `runGenerate`, ~L321–323 at `fc6d122d4`)
**Trigger**: `path:src/cli/designerpunk.ts` — the next CLI `fix/` PR that edits `runGenerate`, where the tip is printed (L324, unconditional on `productTokens`, read 2026-10-20). *(was: Lina's next CLI `fix/` PR (she accepted it as a pre-existing defect on her surface, 2026-10-13; not part of release-3 item 1 or item 2).)* *(Token set 2026-10-20, Ada, rules 1 and 9.)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. Cosmetic: the tip names a flag that does nothing useful when no product tokens are configured; the exit code is already correct after #335.)*
**Source**: Ada's release-3 item-1 fix (PR #335, `.kiro/issues/2026-10-03-generate-reports-success-after-validation-abort.md` § Fixed, "Open, not mine to change" item 2); recorded by the orchestrator at Lina's request (she cannot write `.kiro/issues/` under her charter).

## The gap (by reading, Ada; not run)
When system-token generation fails, `runGenerate` prints `💡 Tip: Use --product-only to skip system token generation` unconditionally. With no `productTokens` configured, the tip names a flag that does nothing useful for that consumer. Cosmetic; the exit code is already correct after #335.

## Fix shape
Print the tip only when `productTokens` is configured; one assertion in the CLI tests. No grant needed (Lina's own surface).

2026-10-17 — Lina: re-routed to Ada as `src/cli/**` owner (ballot 2026-10-17-standing-write-scope-six-roots § 2.1); the Owner header stands as the record of who owned it when filed.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 65, call BACK-FILL (Ada))**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Live (`src/cli/designerpunk.ts` L324). Proposed `path:src/cli/designerpunk.ts` · `P3 improvement · defect`.

**Outcome (2026-10-22, Ada, owner of `src/cli/**`; rule 5 — the fixing PR is named at open)**: `runGenerate` (`src/cli/designerpunk.ts`) now prints `💡 Tip: Use --product-only to skip system token generation` only when `systemFailed && !productFailed && config.productTokens`. The gate matches what `--product-only` can do: `runProductOnly` exits 1 with "No productTokens configured" otherwise, so the old unconditional tip pointed a consumer at a command that fails for them. The exit-code path (`process.exit(1)` on any failure, #335) is untouched. New `src/cli/__tests__/generateProductOnlyTip.test.ts` covers both arms (tip present with `productTokens`, absent without; exit 1 in both). Reviewed draft: Lina's `d51e1b1a2` on branch `fix/generate-product-only-tip` (she wrote it on an orchestrator brief that mistook the owner; she is kept as consulted draft author, branch left untouched as the draft record). Reviewed as owner and accepted with no change to the code or the test; the commit, message and this line are mine, on branch `fix/generate-product-only-tip-v2`. Archive (`git mv` to `archive/`) in this PR or at the next walk.
