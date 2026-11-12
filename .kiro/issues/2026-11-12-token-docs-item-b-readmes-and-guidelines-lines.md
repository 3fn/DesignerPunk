# Token-name hits in 24 component README lines and four platform-implementation-guidelines lines, unvetted against the token index

**Date**: 2026-11-12
**Owner**: Lina (component READMEs; `platform-implementation-guidelines.md`, a doc whose content she maintains).
**Filed by**: Lina, under rule 10, from `2026-10-25-token-docs-unvetted-name-hits.md` § "Outcome (2026-11-01, Ada, owner)", which routed item B and the four guidelines lines to her and did not carry them. Ada writes the move in that record. Authority: Peter, received 2026-11-12T13:29:02Z, "As recommended"; ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` (the consult's note on that batch: item B goes to a new Lina record).
**Class**: P2 obligation (record) · defect *(set 2026-11-12, Lina, rule 12. The hits are raw: strings that look like token names, not yet vetted as keys the index lacks. The README lines are not shipped in `package.json` `files[]` and not MCP-served (the correction in the parent's § "Corrections and the vetted list", item 1), so the record is wrong in places and no served reader is misled; the guidelines lines are served.)*
**Trigger**: `release:16.4.0:phase-1` — the event that owes the close is the merge of the PR that vets and corrects the lines below; `merge:#<N>` once it opens. *(Fix-now per the ruling above; no prior Trigger on this record.)*

---

## What is owed

1. **Item B**: the 24 component README lines on the five-name grep, listed in `2026-10-25-token-docs-unvetted-name-hits.md` § "What is owed", item B. They are not renames: Button-VerticalList-Item's table also names the retired `color.select.*` and `color.error.*` palette, which maps onto `color.feedback.select.*` by state, so each state needs a read of the CSS. Each line is vetted against `token-index/` and corrected, or marked as not a token name.
2. **`governance/platform-implementation-guidelines.md` L145, L156, L310 and L321** (routed to Lina in that record's § "Corrections and the vetted list", item 2). Content correction is mine; the doc is under `governance/`, so the edit goes through the ballot measure model, with its Edit kind line on the PR.

Token gaps found while vetting are flagged to Ada; no token is created here.

## Done

All 24 README lines and the four guidelines lines are read against the token index and each corrected or marked. This record closes under rule 5 in the fixing PR.

*Signed: Lina, 2026-11-12.*
