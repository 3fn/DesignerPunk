# Fixture spec: normalization-one-word-differs

**Case**: `normalization-one-word-differs`
**Class**: normalization — *proposed manifest extension, see INDEX.md* (the (c′) predicate's edge; adjacent to `reword`)
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The other side of the normalization boundary, and the reason `normalization-absorbed-artifacts-control` is dangerous on its own: a build that passes the control by **loosening the comparison** — stripping punctuation, folding whitespace aggressively, comparing token bags, or applying an edit-distance threshold — also passes this fixture, and the law is gone.

Two rows, each differing from its promise by the smallest authorial amount available:

- **Row 1** differs by **one word**: `re-verified` → `verified`. Under any similarity metric this is a 97% match. It is also a substantive claim change — *re*-verification is what an audit does and what the platform-toolchain gap makes impossible for Swift and Kotlin, which is why the honest form of that row is the fixed string `not re-verified — toolchain unavailable`. The word carries the whole meaning.
- **Row 2** differs by **one character of punctuation**: a trailing full stop the author added for tidiness. Nothing is claimed differently. It **still fails**, and it must: rule (iv) admits no punctuation normalization, and a list of "harmless" characters that may be ignored is precisely how (c′) rots into fuzzy matching. The remedy is the guide's authoring note — copy the bullet, do not retype it — and the failure is loud and author-fixable, which is the design's stated intent.

The two rows are deliberately of different moral weight. A build tempted to "fix" row 2 by adding a punctuation rule will fail this fixture, and that failure is the correct governance event: the normalization list is **closed-but-extendable by recorded amendment only**, so widening it is a ballot, not a commit.

## tasks.md fragment

```markdown
# Implementation Plan: 151 — Android Consumer Path

**Date**: 2027-01-19
**Spec**: 151 — Android Consumer Path
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 2. Verify the generated Kotlin constants

  **Type**: Implementation
  **Agent**: Data (main session)

  **Success Criteria:**
  - Every generated Kotlin token constant is re-verified against its registry entry
  - The Android consumer smoke test passes against the published artifact
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Verify the generated Kotlin constants

**Date**: 2027-01-22
**Task**: 2. Verify the generated Kotlin constants
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Every generated Kotlin token constant is verified against its registry entry | ✅ | `KotlinRegistryParity.test.ts › constants match registry` |
| The Android consumer smoke test passes against the published artifact. | ✅ | `npm run smoke:android → 1 passed` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 2.
- **Reported diff**: two unmatched pairs —
  - promised `Every generated Kotlin token constant is re-verified against its registry entry` / claimed `… is verified against …`
  - promised `The Android consumer smoke test passes against the published artifact` / claimed `The Android consumer smoke test passes against the published artifact.`
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS` on either row. `expected.json` MUST enumerate **both** so that a build passing only the punctuation row still fails the fixture.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- Keep this fixture and `normalization-absorbed-artifacts-control` adjacent in the encoded tree. Together they pin the predicate from both sides: the control fails a checker that is too strict, this one fails a checker that is too loose, and no single implementation trick passes both except the four rules as written.
