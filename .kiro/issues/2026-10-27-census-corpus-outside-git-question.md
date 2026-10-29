# Does a census corpus outside git count (for example the immutable npmjs version documents of published versions)?

**Date**: 2026-10-27
**Owners**: Stacy (owner of register row `instrument-census-at-draft`) and Thurgood (steward of the ballots README convention that holds the census rule). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, for ballot `2026-10-26-release-flow-batch-16-1` § "Plans (Peter's condition)", item P4. Source: ADA R3 residual (ii) on that ballot (supersedes that ballot's R4 note that the question would be "a dated line on the queue record": a dated line there would read as a disposition of the queue's rows, Stacy C1).
**Class**: P3 improvement · owed-act *(set 2026-10-27, Thurgood, rule 12: no reader is misled today; both census fields apply a "git holds the input verbatim" test, which is narrower than the rule needs to be only if the answer is yes)*
**Trigger**: `manual` — the event is the owners' answer, recorded here by a dated line; if the answer is yes, a ballot amending the census rule's ground (2) test is the fixing PR this token names, and both fields (`hermetic-publish-path`, `publish-rail-guard`) are re-read under it.

---

## The question

Ada's `hermetic-publish-path` field and the `publish-rail-guard` field both call a decision `none` when git holds its input verbatim nowhere. npm never lets a published version be re-published, so the version documents of published `@3fn/core` versions are close to immutable and could serve as a census corpus for the rail's PASS path. The census rule (ballots README § "Conventions", "Instrument census") does not say whether a corpus outside git counts.
