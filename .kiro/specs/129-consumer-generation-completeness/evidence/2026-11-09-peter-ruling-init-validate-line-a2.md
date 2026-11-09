# Peter's ruling: fix init's false `validate` line in 16.3.0 and re-pack; the trio sittings run on the first candidate stand, with a measured delta (a2)

**Recorded by**: the orchestrator. Times are from `date -u` at receipt.

## The exchange

1. **The finding.** During sitting 4, the Kiro conformance pair (step 6, founder setup), `init`'s closing output printed this line:

   > "`npx designerpunk validate`'s check for them currently fails even on unmodified token source (a known defect in the checker, not in your tokens)."

   It comes from `src/cli/shared/errorCatalog.ts` L704–705 and is pinned by `src/cli/__tests__/errorCatalog.test.ts` L307.

   Ada checked it on the 16.3.0 candidate (F1 `bd7e340b3`, sha1 `7c0fc157…`). On a fresh project, `validate` prints "✅ Mathematical relationships (217 checked)" and "✨ All validation checks passed". The line is false. It is the same claim as Integration Guide L407/L584, which #852 corrects; this copy was missed.
2. **What was put to Peter** (orchestrator, 2026-11-09):
   - **(a1)** Fix it, re-pack, and re-run sittings 2–4.
   - **(a2)**, recommended: fix it and re-pack, and let sittings 2–4 stand on F1 with a measured candidate delta. Sitting 1 runs on F2.
   - **(b)** Ship as is. This is floor-class, so it would need Peter's waiver.
   - **Consulted:**
     - Ada: false; leans (a).
     - Leonardo: (a2) holds only if the delta is measured. He asked for a `candidate-delta:` field in every record, carrying F1/F2, both sha1s, `git diff --stat`, the packed file-list diff, and the line "sittings 2–4 read the old string and could not observe the fix". Corrected wording: "`generate` does not check these relationships; run `npx designerpunk validate` to check them."
     - Thurgood: a re-pack is cheap (no lock refresh, one CI round). RELEASE-FLOW allows a candidate that differs from S if the diff is recorded.
   - **Surviving counter:** protocol § 17.2 says the pair runs on "the same candidate and F". The fix is `fixed-not-observed` in sittings 2–4. Records 1–4 span two candidates.
3. **2026-11-09T23:28:14Z**, Peter: **"(a2), proceed as recommended"**

## What was ruled

- **The fix:** `init`'s false line is fixed in 16.3.0, with Leonardo's wording. Ada edits `errorCatalog.ts` and its pinning test in one commit. The CHANGELOG history lines L285/L293 stay as written.
- **The candidate:** it is re-packed as F2.
- **The trio:** sittings 2, 3 and 4 stand on F1. Sitting 1 runs on F2.
- **The records:** every trio record carries Leonardo's `candidate-delta:` field, measured, not asserted. The release PR body carries the same delta.
- **Protocol § 17.2:** "the same candidate and F" is applied this once, under this ruling.
