# `verify-signing-chain --audit` prints false FAIL and anomaly verdicts: link 6 after branch deletion, link 4 double-print, link 7 line form

**Date**: 2026-10-26
**Owner**: Thurgood (the instrument, `tools/agent-generator/regrounding/verify-signing-chain.ts` and its tests). Stacy specifies the fixtures. **Owed acts by others**: Stacy (her acts' readings change under the fixes; she re-reads them on the fixed instrument), Peter (the ballot question below).
**Filed by**: Thurgood, under README rule 10, from the "look closer" reading on #514 (the 16.1.0 delegate audit, groups 3 and 4). Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · defect *(set 2026-10-26, Thurgood, rule 12)*. `(guard)`, not `(record)`: `--audit` is never a gate and every false verdict is loud, not a silent green, but a reader was misled. #514 put 63 `FAIL 6` and 4 `anomaly 4` in front of Peter as findings, and his "Accept and re-confirm" on #427 rested on a link-7 reading that was itself the matcher's artifact (see § 3). That is an instrument weaker than its claim, which is the `(guard)` definition. This differs from the link-4 sha-alone record (`2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`), whose readers were not misled. Being `(guard)`, this goes to Peter at its first lapse (rule 11).
**Trigger**: `release:next:phase-1` — the fixes (§ 2) land, and the next RELEASE walk re-runs the affected PRs (§ 2 table) on the fixed instrument and appends the result here. Re-ruled to `merge:#<N>` the day the fixing instrument PR opens (rule 1: the event, not the vehicle). Start condition (prose): the session-store fix on `fix/signing-chain-audit-session-stores` (a different defect) has merged, so the two instrument PRs do not collide on `verify-signing-chain.ts`.
**Related**:
- `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md`: a different link-4 form (sha-alone first line).
- `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`: the delegate audit whose first run found these.
- The delegate audit, `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.1.0-ada.md` @ `a15a0ee20`: the per-PR counts below are from it.
- Evidence of the link-6 re-run (not committed: a scratch file, `rerun-397-restored-ref.txt`): #397's 63 acts re-run with the session's branch ref restored.

---

## 1. The three causes

1. **Link 6 resolves the charter through the session's branch ref.** Branch Cleanup deletes that ref after the merge. The instrument's fallback, the parent of the seat's earliest commit, can carry a charter edited after the session began.
   - Evidence: #397, 63 acts, all from one session (`02bb479a…/agent-a3f9bf6a19197d1ed.jsonl`, branch `chore/write-scope-six-roots`, started 2026-10-17T19:23:13Z). Its `prompt_snapshot` byte-equals `stacy.md` at `bf30a6017`; the fallback picked `fc57947a`. With the ref restored in a scratch clone, the instrument's own rule picked `bf30a6017` and all 63 passed link 6.
2. **Link 4 removes duplicate candidates by the printed SHA string.** One call, `git commit … && git log -1 --format='%H %s'`, prints the commit twice: `[branch 3f4f6b265] …` (9 characters) and `3f4f6b2654…` (40). The instrument counts one commit as two candidates.
   - Evidence: #416, 4 acts (`3f4f6b26`, `17e0bf93`, `eded5709`, `2e7ae81d`), each read `anomaly 4 — 2 candidates`, both from `agent-aca32a7fec97c709f.jsonl`. The form meets the ballot's convention.
3. **Link 7 needs the rendered line exactly as rendered, with its list marker.** A seat that read the unit through an operative-set record's `text:` field, which carries no `- ` marker, or through a YAML-quoted or split form, does not match.
   - Evidence: `thurgood#in-scope` (`- Test suite health auditing (coverage gaps, failing tests, flaky tests)`) at #397 `0dc7213d` and `c628e112`, and at #427 `8674be2e` and `1ea854d1`; #285 `9ebc06ba` (`thurgood#trigger-types`, the split form).

## 2. The plan: three fixes, and the acts each would change

Each fix is its own commit in one instrument PR in Thurgood's seat, with a falsification fixture per fix (Stacy specifies them). The PR follows the session-store fix's merge (Start condition above). Counts are per PR, from Ada's file @ `a15a0ee20`; "expected" is what the look-closer re-run showed, and the fixture run decides.

| Fix | Change | Acts it changes (PR: acts, now → expected) |
|---|---|---|
| Link 6 | Match the snapshot by content against the committed versions of `.claude/agents/<seat>.md` dated no later than the session's start; FAIL only when no such version exists; name the matched commit in the line. | #397: 63 `FAIL 6` → 0. With link 6 passing, link 7 reads 59 `record absent 7` (write-scope rows that render nothing), 2 `FAIL 7` on `thurgood#in-scope` (cause 3) and 2 `FAIL 7` on Stacy's trigger table (the ballot question below). |
| Link 4 | Remove duplicate candidates by commit, not by printed SHA string. | #416: 4 `anomaly 4` → 2 anchor; the other 2 (`17e0bf93`, `2e7ae81d`) read `FAIL 7` on Stacy's claims-pass template unit (the ballot question below). |
| Link 7 | Normalize list markers, YAML quoting and item splits on both sides before matching. | #397: 2 (`0dc7213d`, `c628e112`); #427: 2 (`8674be2e`, `1ea854d1`); #285: 1 (`9ebc06ba`) → expected to anchor. |

Totals, so a dropped group reads as an arithmetic error: links 6 and 4 account for 67 verdicts (63 + 4); link 7 adds 3 more that are false on their own (#427's 2 and #285's 1), and re-reads 2 of #397's 63 after link 6 passes. The 6 acts of the ballot question (§ 3) are not counted as false.

What the fixes do not change: #415's one `anomaly 4` (§ 4), #396's and #472's one `FAIL 7` each, and #427's other act and the `record absent` rows, which are outside these three causes and are not read here.

## 3. Ballot question (carried; Peter's; not a tool fix)

Does a seat's loaded charter count as having read a unit of her own charter, for link 7?

Six acts hang on it, where the chosen rendered line (a table header or a first line) appears only in the seat's loaded `prompt_snapshot`, while the transcript shows her reading the unit's changed text through tools: #397 `acc8df54` and `ce4ead62` (Stacy's trigger table); #416 `17e0bf93` and `2e7ae81d` (Stacy's claims-pass template unit); #427's two trigger-table acts (`8674be2e` and `1ea854d1`, the `Trigger | Event | Scope` row). Widening the matcher to accept the loaded charter answers it one way by tool; the ballot text defines link 7's evidence, so a matcher change here may change what the law accepts. Whether it should is for Peter, at the shape-review or a ballot. The fixes in § 2 do not depend on the answer.

## 4. Two readings carried with this record

- **#415 is a commit-form slip, proven by its own output; no re-sign.** The seat committed with `git commit -F - <<EOF … EOF`, and `git log -1` followed on a new line. A newline counts as `;`, not `&&`, so the form is outside the closed success set and the instrument reads `anomaly 4` (L375, `a598cb50`). The same call's output shows `git log -1` printing the new `a598cb50d` with the matching subject, so the commit is proven. Whether the closed set should accept a heredoc form is a ballot-text matter (the convention is in `2026-10-01-signing-act-chain.md`), not part of the fixes above.
- **#427's "possibly real gap" was my search error (premise correction).** My § 2 annotation on #514 said #427's `thurgood#in-scope` line "appears nowhere in the transcript". That was wrong: my probe searched for the line with its `- ` marker, and the seat read the unit through the operative-set record, where the item reads `text: "Test suite health auditing (coverage gaps, failing tests, flaky tests)"` without it. It is cause 3, the same artifact as #285. Peter's "Accept and re-confirm" was given on my wrong premise and is back with him to confirm or withdraw.

## 5. Plan for closing

1. The session-store fix merges.
2. One instrument PR: the three fixes with Stacy's fixtures; the PR shows each affected act's verdict before and after on `--audit` (per-act output, not counts alone).
3. The next RELEASE walk re-runs #285, #397, #416 and #427 on the fixed instrument and appends the result; Stacy re-reads her acts' readings.
4. Close under rule 5 with the dated outcome line, or lapse under rule 11.

*Signed: Thurgood, 2026-10-26.*
