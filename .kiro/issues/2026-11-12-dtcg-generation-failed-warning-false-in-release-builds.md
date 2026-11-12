# Issue: release and `generate` builds print a false "DTCG generation failed (non-blocking)", because a redundant second DTCG step in `scripts/generate-platform-tokens.ts` cannot load `themes/dark/SemanticOverrides` in the clone; the file ships regardless

**Date**: 2026-11-12
**Owner**: Ada
**Class**: P3 improvement · defect *(set 2026-11-12, Ada, rule 12. The message is false and a reader may take it for a failed output, but nothing is lost: the file is written and ships. A noisy false warning in a release log, no consumer harm.)*
**Trigger**: `release:16.4.0:phase-1` — the fix is deleting the redundant step or sharing the first step's result, one small PR in my scope; `merge:#<N>` when that PR opens.
**Source**: Peter's 16.3.0 lapse-batch ruling, add-on row, "As recommended" (2026-11-12T13:29:02Z): `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`. Observed in the 16.3.0 release logs.

---

## What was seen

The 5.1 dry-run log (`scratchpad/release/dryrun-S.log`) and the 5.3 publish log (`scratchpad/release/publish-5.3.log`, around L109) both carry, in the same run that also wrote the file at L88:

```
⚠️  DTCG generation failed (non-blocking): Token source at …/clone/src/tokens cannot be read: themes/dark/SemanticOverrides failed to load.
```

Two lines earlier (L88 in both logs): `✅ DTCG output written to …/clone/dist/DesignTokens.dtcg.json — Generated 217 primitive tokens, 193 semantic tokens`. **`dist/DesignTokens.dtcg.json` ships regardless**: it is written by the first DTCG step, before the warning prints.

## Why

`scripts/generate-platform-tokens.ts` L136 runs a second DTCG step (the "📊 DTCG Token Format Generation" block) after the first has already written the file; `src/generators/generateTokenFiles.ts` L483 holds the same message text. The second step reads the token source from the clone and cannot load `themes/dark/SemanticOverrides` there. Its failure is caught and printed as non-blocking. I have not run the step to confirm the load failure's cause beyond the message, so the "redundant" reading is from the logs and the source, not a trace.

## Fix shape

Delete the second step, or have it reuse the first step's result. A check that the second step's output was never what ships (the first writes the file the package lists). No fix is authorized by this record; it goes through a PR in my scope.
