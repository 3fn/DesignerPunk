# Grant: F-4 (a)'s disposition pin in `derive.ts`, for the shape-review application PR 2

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:tools/agent-generator/derive.ts` — the event that owes the close is the merge of the fixing PR (branch `chore/apply-signing-act-shape-review-pr2`). The close is this record's rule 5 outcome line, giving the fixing PR's number and the granted-file diff.
**Source**:
- ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md`, RATIFIED with F-4 (a) (Peter, 2026-11-08T17:45:34Z, "Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)"), § 5 "PR 2" step 2: "`tools/agent-generator/derive.ts` — for a row with no rendered span, `renderedHash` is `hashEntry({ disposition, destination })`, `destination` omitted where absent; the sweep and the print mode use it. Lina is consulted (shared core)";
- its two-PR form (Peter, 2026-11-08T19:06:05Z, "Re: Buckets 3 and 4, proceed as the relevant team members recommend");
- the obligation record `.kiro/issues/2026-11-08-shape-review-pr2-pin-and-resigns.md`.

---

## What is needed

The pin is one rendered-hash rule in `derive.ts`, in Lina's standing scope (`canonical/agents/lina.md`). The ballot asks for her consult, not her authorship. One test file of hers pins the value the rule changes.

**Consulted**: Lina, read-only, at `5aa5a3fae` (relayed by the orchestrator, 2026-11-08). She picks this grant over writing the hunk on a seat branch, so that the pin stays one atomic commit. **Her condition: she reviews the exact `derive.ts` hunk before it is pushed.** Her shape for the change, carried here:
- `renderedHashOf` stays as it is.
- A row-aware wrapper is added. A row with rendered pieces hashes them exactly as today. A row with none hashes `hashEntry({ disposition, destination })`, with `destination` omitted where the row has none.
- The SCOPE comment at `derive.ts` L547–553 is rewritten, because "hashes the empty piece list" becomes false.
- In `consumer-rendering.test.ts`, the L254 assertion of the empty-list hash asserts the new value. Two assertions are added: a re-disposition moves the hash, and a destination change moves it. `consumer-rendering.ground-truth-spans.test.ts` L216 stays unchanged.

The callers, `regrounding/freshness.ts` (the sweep) and `regrounding/verify-signing-chain.ts` (the print mode), are already in my standing scope and are not listed below.

---

**Grant paths**: `tools/agent-generator/derive.ts` (the row-aware rendered-hash wrapper and its SCOPE comment; `renderedHashOf` unchanged); `tools/agent-generator/__tests__/consumer-rendering.test.ts` (the L254 empty-row assertion updated to the new value, and two added assertions: a re-disposition and a destination change each move it)

Not `.github/**`, so no `**ARMING**:` line is owed (rule 8). No governance-law path.

---

## The fixing PR

Branch `chore/apply-signing-act-shape-review-pr2` (Thurgood), the application's PR 2. Its pin commit is pushed only after this grant merges and Lina approves the hunk.

## Acceptance

1. The `derive.ts` diff is the wrapper plus the rewritten SCOPE comment, and `renderedHashOf` is byte-unchanged.
2. The `consumer-rendering.test.ts` diff is the L254 assertion plus the two added assertions.
3. Lina's review of the hunk is cited in the fixing PR's body.
