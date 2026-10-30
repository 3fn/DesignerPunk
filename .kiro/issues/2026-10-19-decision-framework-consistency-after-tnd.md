# Decision framework: internal consistency after the True Native ballot

**Date**: 2026-10-19
**Owner**: **Thurgood**, who flags this under Civitas content consistency (intra-domain path: the steward flags, the domain agent resolves).
**Resolver**: **Lina**, who owns `governance/cross-platform-vs-platform-specific-decision-framework.md`. She raised these items herself while applying her edit sites.
**Trigger**: `release:next:phase-1` — the next release's walk reads whether the three items below are resolved in the doc or ruled "keep, intentional", with the outcome recorded here. *(Re-ruled 2026-10-25, Thurgood, owner, rules 9 and 11, after the lapse below: the `path:` token named a file, not the event, and any edit to the doc fires it, so it fired twice on edits that did not touch the items (#459, and #472 will when it merges). A P2 that would ride another change takes the release token, ballot 2026-10-22-trigger-names-the-event-not-the-vehicle. Was: `path:governance/cross-platform-vs-platform-specific-decision-framework.md` — Lina's next edit to the framework doc, or the next full monthly walk (the event is unchanged). This pulled-forward walk is not that walk. *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: Lina's next edit to the framework doc, or the next monthly walk, whichever comes first.
**Class**: P2 obligation (record) · defect *(set 2026-10-20, Thurgood, rule 12. Internal-consistency items in a served doc that Lina raised herself. No item is yet shown false to a reader.)*
**Closes when**: each item below is resolved in the doc or ruled "keep, intentional", with the outcome recorded here, dated. The fix is a `governance/**` edit, so Peter merges it.
**Not the ballot**: ballot `2026-10-18-true-native-development-is-not-true-native-design` is RATIFIED and executed. These items are post-ratification consistency findings and do not reopen it. Sites 6.1, 6.2, 6.3 and 6.9 landed at `692a0cd18`.
**Related**: the § 6.5 pointer follow-up already lives at `2026-10-18-principles-kind-and-preserved-knowledge-triage.md`. It is not repeated here.

---

## Items (Lina's note, relayed by the orchestrator, 2026-10-19; lines as of branch `chore/tnd-execution`)

1. **Two "When to Pause and Ask" lists now contradict Decision Criteria Q4.** Site 6.2 changed Q4's "No" to "Record the departure" (L135). The two lists still route design-axis choices to a pause:
   - The motion list at L172–178: "Platform idiom conflicts with design system consistency", and "Animation is critical to brand expression".
   - The token-mapping list at L249–254.
   - The ballot's straggler sweep (§ 6) flagged the motion lines as candidates for Lina's read.
2. **The Overview's "fundamental tension" framing** (L21). The ratified principle and the floor treat consistency and idiom as two axes: development is fixed, and design is a choice. They no longer read as one tension.
3. **Required Documentation items 3 and 4** (L328–329) are still phrased as platform-idiom-only: "Which tokens still used despite platform idioms", and "How platform idiom affects accessibility". Site 6.3 made the section's lead line and item 1 symmetric (visual and behavioral choices, native or departure), so items 3 and 4 now read as a leftover.

## Walk log

- 2026-10-19: record opened (Thurgood), flagged for Lina.

## Lapse (2026-10-25)

Firing commit `6cf38d7b5` (#459, "Ballot audit fix-now: corrections and records (131)"). Signed Thurgood (owner, rule 11; observed at session start, Start Up Tasks item 9).

The `path:` trigger fired because #459 edited the framework doc. **The edit did not address this record.** It changed one line, the L360 "True Native Architecture" link, to a current home (Platform Implementation Guidelines), as a CORRECTION of a `preserved-knowledge/` pointer. Items 1–3 are untouched at `main`: the Overview's "fundamental tension" sentence (L21), the two "When to Pause and Ask" lists (L172, L249) and Required Documentation items 3 and 4 (L328–329). No commit that is an ancestor of `6cf38d7b5` closed or re-ruled the record, so it lapses (rule 11). It may fire again at #472's merge (Lina's token-name edit at `3544675f5`, lines 190–225); that edit does not touch the three items either, which is why the Trigger is re-ruled off the file.

Why the close was missed: #459 was merged from the other session as a pointer correction, and its author did not read this record's file-level Trigger against the diff; Lina, the resolver, was not in seat to see the fire.

Disposition: the ask stands (the three items are the post-ratification consistency findings Lina raised herself). A P2 `(record)` first lapse does not escalate (rule 11: the second lapse does). The Trigger above is re-ruled to `release:next:phase-1`. The fix is a `governance/**` edit by Lina, Peter-merged. A second lapse at the next release's S escalates to Peter with spec, drop or fix-now.

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
