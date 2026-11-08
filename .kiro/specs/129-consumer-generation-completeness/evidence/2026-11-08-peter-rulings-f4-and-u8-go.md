# Peter's rulings, 2026-11-08 00:33Z: F-4 as recommended; go for U8

**Recorded by**: the orchestrator (primary session). This is a record of rulings, not law.
**Received**: 2026-11-08T00:33:06Z (`date -u`, at receipt).

## Peter's words, verbatim

> Re: 1, as recommended
> Re: 2, Go

## What each part answered

The paraphrase below is the orchestrator's. Only the quoted lines above are Peter's.

### "Re: 1, as recommended": F-4 of the native-lane ownership ballot

The question was `scripts/harness/d2-check.ts` after U8, which Peter had sent back at 2026-11-08T00:24:24Z with "Do they collectively have a better idea?". The seats held an idea round and then a cross-read: Thurgood, Stacy, Ada, Kenya, Lina and Data. All six arrived at **(b)**, some weakly, with Ada and Lina saying they would accept (a). The orchestrator recommended that result.

**The ruling: no standing holder.** After U8 the file changes by spec row or per-fix grant. From U8's merge, a grant over it never goes to the seat holding `src/generators/**` in that unit, which means never to Ada for her own generator's output. Thurgood declined standing scope.

**Conditions:**
1. **The design rule.** `d2-check.ts` works out no names itself. It takes every expected name from the index (`components.yaml`, the `platforms.<p>` fields). It imports nothing from `src/generators/**`, `src/build/**` or `node_modules/@3fn/core`, and it does not list its own definition files. A grep in its test enforces this. There is one exception: the completeness half's `component.key` derivation is restated as a one-line rule in the script (Ada).
2. **The floors.** These are Stacy's, as amended.
   - Its falsification cases can only be added to, never removed or weakened, and they include a case for Swift backtick-escaped names (Kenya).
   - Each verdict line prints a token count that may never be 0, and may never shrink without a spec row.
   - Floor 2 compares the base's script and the head's script on the same consumer (Kenya).
3. **The probe-coverage note** (Kenya; Data checked the Android premise). The lane probes already check D2's inclusion half with the compiler.

**Timing.** Thurgood writes the contract change on the D2 grant record (`.kiro/issues/2026-11-07-d2-check-step-grant.md`), and Ada adds her agreement line. It merges before 13.3 is written. That grant record expires at U8's merge, so the rules for later edits go into the ballot's F-4 text and are carried by its application PR.

**What survives against it.** A name that is wrong in both the index and the output still passes, because the same generators produce both. The probes catch part of that, not all.

**Not adopted.** Stacy's class option, applying the same floors to `compare.ts` and `stability.ts`, was not tested with Thurgood. The orchestrator suggested recording it rather than adopting it now.

### "Re: 2, Go": U8 (Task 13)

Peter's go for U8, "Ship and harvest DesignerPunk's component tokens; precedence; the name contract".
- **Seats:** PRIMARY Ada (Sonnet). Lina for 13.4 and 13.5. Thurgood for 13.6, the `harness-generate` step under its issue-row grant (amendment 11, #749).
- **Gate:** 13.3, the D2 check, starts only after the contract-change record above merges.
