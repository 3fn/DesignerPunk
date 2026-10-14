# Issue: after a system-token failure, `generate` prints the `--product-only` tip even when no product tokens are configured

**Date**: 2026-10-13 · **Status**: ACTIVE · **Owner**: Lina (CLI surface, `src/cli/designerpunk.ts` `runGenerate`, ~L321–323 at `fc6d122d4`) · **Trigger**: Lina's next CLI `fix/` PR (she accepted it as a pre-existing defect on her surface, 2026-10-13; not part of release-3 item 1 or item 2).
**Source**: Ada's release-3 item-1 fix (PR #335, `.kiro/issues/2026-10-03-generate-reports-success-after-validation-abort.md` § Fixed, "Open, not mine to change" item 2); recorded by the orchestrator at Lina's request (she cannot write `.kiro/issues/` under her charter).

## The gap (by reading, Ada; not run)
When system-token generation fails, `runGenerate` prints `💡 Tip: Use --product-only to skip system token generation` unconditionally. With no `productTokens` configured, the tip names a flag that does nothing useful for that consumer. Cosmetic; the exit code is already correct after #335.

## Fix shape
Print the tip only when `productTokens` is configured; one assertion in the CLI tests. No grant needed (Lina's own surface).
