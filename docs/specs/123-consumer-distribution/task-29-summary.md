# Task 29 Summary: the corrected derivation check (Spec 123, U3g)

**Date**: 2026-10-12 · **Agent**: Lina (Opus) · **Unit**: U3g (Task 30 is the gating parent)

## What changed
- **Clause (2) is identity** (G2 ruling R1). A disposition's destination must be the same node as a span source in `D`. An ancestor or a sibling no longer passes, so attack (f) is closed. The one shared-catalog row is decided by member id.
- **Clause (1) ignores empty spans** (R2). A body or member span that is blank after `trim()` derives nothing, and neither does a frontmatter entry whose derived value is empty. Attack (a), as the generator actually emits it (one blank line attributed to S), is now `FAIL_NO_DERIVATION`.
- **The check runs on the shipped profile.** `derivation.shipped-profile.test.ts` checks every re-pointed row of the committed consumer profile against every committed rendering, Kiro JSON included. It runs on every PR in the required `lane-functional-root` job. Today 169 of 169 rows verify, and the count is derived, never a literal.
- **Kiro attribution** (Peter's ruling (A)):
  - the agent JSON carries per-entry spans, with its bytes unchanged;
  - glob-only knowledge bases, which Kiro used to drop on both legs, now render as a fallback note in the Kiro prompt.

## Why it matters
- G2 pass four found three gaps:
  - the check accepted any ancestor as the destination;
  - the check was applied to nothing that ships;
  - its clause-1 tests modelled the attack instead of running the generator's own emission.
- All three are fixed and two-sided bitten. Stacy's cycle-2 verdict (Task 30) now judges this head.

## Cost and carries
- **One re-sign**: Stacy's `knowledgeBases[spec-summaries]`. It is disclosed for Peter's trigger-(d) sample.
- **One lock refresh.**
- **Four out-of-list edits**, granted by Peter.
- **Named limits** L1–L5 (hollowing in place with S as the destination) are carried to the verdict's "does not mean" list.
- **Not verified**: two publish-path pack rows fail locally, outside this diff. Whether they also fail at the cut is unverified.

Detail: `.kiro/specs/123-consumer-distribution/completion/task-29-completion.md`.
