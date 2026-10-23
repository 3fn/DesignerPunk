# Charter: one review of the signing act's shapes (row state × act), before more one-failure ballots

**Date**: 2026-10-23
**Status**: ACTIVE
**Owner**: Thurgood (the review ballot, and the instrument `tools/agent-generator/regrounding/verify-signing-chain.ts`). **Required reviewer**: Stacy (her passes read the (iv) list the review defines).
**Trigger**: `manual` — Spec 129's final unit merge or the merge of Spec 125-B U3 (`.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md`), whichever comes first. The review must ship before U3, whose re-attestation re-signs fresh rows that § 2 clause 5 and F5 reject. Second trigger (prose): if a second signed-unit rename lands before the review ships, output (ii) below (orphaned-key withdrawal in bound) ships ahead of the review, as its own micro-amendment. *(Set 2026-10-23, Thurgood, owner.)*
**Class**: P2 obligation (guard) · charter *(set 2026-10-23, Thurgood; Stacy may re-class, rule 12)*. `(guard)`: `--ci` link 1 is weaker than its claim. For an act that is not a first signature it passes on hash movement (`actMoved`, `verify-signing-chain.ts` L382, used at L873), not on list membership, so it does not mechanize § 2 clause 6(i); any withdrawal passes, a fresh row's included (read from code, not probed on a fresh row). Not P0 or P1: no consumer reads this, and Stacy recomputes the lists by hand until the fix ships.
**Filed by**: Thurgood, under rule 10, in the PR that records Peter's ruling (branch `chore/stacy-owed-set-heading-rename-v3`).
**Ruling**: Peter, chat, 2026-10-23, verbatim: *"Approved. Proceed as collectively recommended, please"* (relayed by the orchestrator), on the orchestrator's message carrying the clause-5 grant line, this consolidating review, and the v3 order of `.kiro/issues/2026-10-22-stacy-owed-set-heading-false-after-439.md` § 2a.
**Consult notes**: `scratchpad/consult-rename-thurgood.md` (probe, R1, R2) and `scratchpad/consult-rename-stacy.md` (R1, R2), in the orchestrator's session scratchpad (`/private/tmp/claude-501/-Users-3fn-Documents-Work-Projects-Kiro-DesignerPunk-v2/f6f839ac-be52-4d43-8a18-bf7959977f92/scratchpad/`). They are not committed and will not survive the session, so § 1 carries what this record relies on.

---

## 1. Why one review

The signing-act ballot (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2) was written for one act shape: re-signing a stale row. Each new shape has needed its own ballot or ruling: first signatures (the clause-3 erratum, 2026-10-21), holds (`2026-10-22-hold-act-recorded-in-pr-body`), the commit-line form (link 4, `2026-10-23-link4-candidate-first-sha-after-commit`), and now a withdrawal on a renamed unit (the clause-5 grant in the owed-set heading record § 2a). Stacy and I agree that the first three changes, and this one, share one root: row-lifecycle states the ballot never modelled. Link 4 is a separate problem, the form of the evidence, but its application rides the same instrument PR.

What the rename showed (both consult notes):
- A re-key is authoring (clause 4: `destination`, and the key itself). A signed row cannot be re-keyed by anyone: the signer's commit edits authoring, and the author's commit deletes another seat's signature. The lawful path was to withdraw first, then re-key the unsigned row, then sign it fresh (v3).
- At the withdrawal the old row is on neither list. The sweep reports it only as `[orphaned-key] … re-key or delete the row`, so clause 3's letter does not cover the act; it ran under a clause-5 grant.
- `--ci` passed the withdrawal anyway, through the `actMoved` path above. That pass is not evidence.
- U3 re-attestation (124 `signer:` rows at the 2026-10-15 listing) re-signs fresh rows, which the current bound rejects. It is the next shape already on record.

## 2. Required outputs

1. **The row-state × act table.** States: unsigned-routed, fresh, stale, held, refused, orphaned (`[orphaned-key]`), deleted, and the fresh-row state U3 meets. Acts: sign, re-sign, refuse, hold, withdraw, confirm, row add, row delete. Each cell: in bound / authoring / grant needed; the deciding link; and a fixture.
2. **A closed list of act kinds**, and the (iv)-line form for each kind.
3. **(ii)**: whether `[orphaned-key]` rows are in bound for withdrawal (Stacy reads an orphaned key as the limit case of stale). Ships ahead of the review on the second trigger.
4. **The link-1 fix**: `actMoved` (L382, L873) is replaced, for acts that are not first signatures, by list membership at the commit's first parent (stale, unsigned-routed and, if (ii) passes, orphaned), the way `unsignedAt` already tests first signatures. `freshness.ts` exports the lists it needs.
5. **U3's 124 rows classified** against the table, so U3's re-attestation runs under a stated bound.
6. **The link-4 application** (ballot `2026-10-23-link4-candidate-first-sha-after-commit`, record `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`) rides the same instrument PR, as separate law: its own ballot, its own tests.

Cost estimate (my R1): a ballot of about 100 lines with Stacy R1, about 10 fixtures, and one instrument PR, with an ARMING read at its merge.

## 3. Close

The review's instrument PR merges with outputs 1–6, or a dated ruling drops any of them. That PR adds rule 5's outcome line and `git mv`s this file to `archive/`.

**Found at the v3 run (2026-10-23, Thurgood; rule 9 dated line)**: `--audit` link 7 reads the rendering committed **at the act's own commit** (`renderingAt(an.sha)`). Stacy's first signature `999c4c6f` was judged against a fresh local rendering, and the regenerated outputs were committed after it (`460a4574e`). So it reads `record absent 7` ("the row renders nothing") and never `anchored`, and committing the regeneration later does not change that. This is not a defect in the act, which was signed against the right rendering. It is an ordering the ballot never stated. Output 1's table carries it: either the regeneration is committed before the first signature it is judged against (the regeneration needs the row re-keyed, not signed), or link 7 reads the first later commit that carries the row's rendering. Also on that branch: `12b3e98f` reads `record absent 4` because it was cherry-picked, not redone (link-4 record § 6, O9).
