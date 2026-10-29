# The two publish register rows have no `census` field; one steward register PR writes both, and splits `hermetic-publish-path` by scope

**Date**: 2026-10-27
**Owner**: Thurgood (register steward; owner of `publish-rail-guard`), writing `hermetic-publish-path`'s field on Ada's word (its owner). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, for ballot `2026-10-26-release-flow-batch-16-1` § "Plans (Peter's condition)", item P2. Source: Stacy's S-5 finding (STACY R1 on that ballot), filed on the queue record `2026-10-26-release-16-1-standards-implications.md` (`0a07a3601`); this record carries the act.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-27, Thurgood, rule 12: a ballot item in either row's scope cannot carry a lawful census line until the field exists)*
**Trigger**: `release:next:phase-1` — closes at the merge of one steward register PR, Peter-merged, that writes both fields verbatim from ballot § 4 E8 (`hermetic-publish-path`: Ada's R3 text and history line; `publish-rail-guard`: the text Ada offered at R3, on my word) and, because F-49 is (ii-b), splits `hermetic-publish-path` by scope (the live-state scope reads `none`; the commit-held scope's `census` field is written when Ada's mode lands, record `2026-10-27-npmjs-mode-and-commit-held-census-mode-owed.md`). `**Edit kind**: governance/classification-map.md — EXECUTION (ballot 2026-10-19-instrument-census-at-draft § 2, "The register's census field")`. Sequenced before the batch ballot's application PR.

---

## Not a gate on ratification

The census rule (`governance/classification-map.md` Entry Schema L109–L110): "Until the field exists, the item waits", and "A missing field is a finding from the reader, never a gate: Peter may ratify past it." Peter ruled the batch with Ada's plan, which builds the commit-held mode after ratification; this PR closes the field half of the same finding before the application.

## Close

Rule 5's dated outcome line, naming the PR, and the archive move, in that PR. The commit-held scope's field stays owed under the other record.
