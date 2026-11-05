# Signing-act prevention: four fixes Peter ruled with #676's "(a)"

**Date**: 2026-11-05
**Owner**: Thurgood (the instrument `verify-signing-chain`, the wrapper, and this record). Fixtures: Stacy specifies them (signing-act ballot § 4.5). **Consulted on the items**: Stacy (items 1, 3 and 4), Data (item 2).
**Filed by**: Thurgood, under README rule 10, from Peter's ruling on PR #676's `**Open for Peter**:` line. Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · owed-act *(set 2026-11-05, Thurgood, rule 12. Each item closes a way in which a signing act can pass a seat's own care but fail, or falsely pass, the audit. Until they land, `--audit` is weaker than its claim in the late-read case (item 3), and the act's form and read rest on the brief writer (items 2 and 4). Kind owed-act: Peter ruled the four fixes on 2026-11-05.)*
**Trigger**: `release:next:phase-1` — the next RELEASE's phase 1 owes the close: items 1 and 2 merged with their fixtures, item 3 in the ratified RS-36 signing-act amendment ballot and its checker PR, item 4 in the template at its final home. Start condition (prose): items 2 and 3 change what the audit counts (below), so they ride the RS-36 ballot. Re-ruled to `merge:#<N>` once that ballot's PR exists (rule 1: the event, not the vehicle).
**Related**:
- `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`: item 3's fix shape (`late-read 7`), my 2026-10-27 line and the 2026-11-05 instance (#677).
- `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 4.3 (the lookup rule and the closed success-evidence set) and § 4.4 (the verdict vocabulary).
- The consult notes Peter read: Stacy's `[STACY PREV]` and Data's `[DATA PREV]` (orchestrator scratch, 2026-11-05). Their substance is restated below.

**Grant paths** (item 2 only; activated by Peter's merge of the PR whose body names this section, README rule 8; expires at the fixing PR's merge): `scripts/seat-commit.sh`, `scripts/__tests__/seat-commit.test.ts`, `scripts/seat-brief-template.md`

---

## The ruling

Peter, chat, relayed by the orchestrator, received 2026-11-05T23:42:17Z (`date -u` at receipt), verbatim: *"6 (a) with Kenya's condition; #676 (a) with the four fixes"*. "#676 (a)" lets all three of #676's audit results stand on the record: Stacy's `ef3b60fb0` `FAIL 7`, and Data's `ff9d1423e` and `b9361f02a` `anomaly 4`. "The four fixes" are the items below, as Peter read them after the orchestrator vetted them with Stacy and Data. *Unverified here: the relay is chat only.* ("6 (a) with Kenya's condition" answers a different PR's question and is not this record's.)

## The four items

1. **A verifier mode that prints the whole unit and its hash in one tool result, paired with a confirm-record line that says the whole unit was read** (Stacy).
   - The mode lives in `verify-signing-chain.ts`, in my standing scope. Given `<record file>#<anchor>`, it prints the unit's full text (`partition(splitFrontmatter(...).body).units`), then `hashText` of it, in one output.
   - It replaces a confirmer's hash-only script. All three of Stacy's true link-7 FAILs (`c989dacf2`, `82faa95b1`, `ef3b60fb0`) checked the hash and the items by script without printing the unit.
   - **The record line.** A confirmation record's read line says "the whole unit, from the print-mode output at `<sha>`", not a line range. A line range was the tell on #676 ("L27–31"). This line is carried in the seat-brief template now (below); Stacy says whether it also belongs in her charter's record form.
   - Stacy's caveat stands: printing is not reading, so the mode is necessary, not sufficient.
   - **Fixtures (Stacy)**: the mode's output contains the unit's evidence line, so a print before the commit anchors link 7; the hash equals the freshness sweep's for a stale unit.
   - **Closes**: its PR merged.
2. **A committed wrapper, `scripts/seat-commit.sh`, that enforces the proven commit form** (Data). It replaces the "brief template carries the form" idea as the enforcement. The template keeps the form only as the interim rule (below).
   - It runs `git commit -F <message-file> && git log -1 --format='%H %s'`, refuses `-q` and any push in that chain, and pushes only after it.
   - Then it runs `verify-signing-chain --audit --branch <branch>` and prints the new commit's verdict, so the seat sees a link-4 or link-7 problem before it reports. It does not re-make or hide anything, and a non-`anchored` verdict is reported, not retried.
   - **What it needs from the law.** The audit recognises a commit call by `git commit` in the tool call's command text (`GIT_COMMIT_RE`), so a call to the wrapper would read `record absent`. Making the audit count the wrapper's call changes § 4.3's candidate and success-evidence definitions, which are law, so that part rides the RS-36 amendment ballot. The script itself and its test are execution of that ballot, under the grant above.
   - Data asked whether link 4 should also accept a `git log -1` in a later separate call, with a matching subject and no other commit in between. **My reading: not widened.** That is exactly the H2b gap the closed set exists to hold (a quiet commit made by another actor just before). The wrapper removes the need.
   - **Closes**: the ballot's ratification and the wrapper PR merged, with Stacy's fixtures: the wrapper's call anchors; a failed commit through the wrapper reads `anomaly` or `record absent`, never `anchored`.
3. **The `late-read 7` audit fix**, already queued. Its fix shape is in the related record: link 7 anchors only on a tool result that comes before the commit call, and a match after it prints `late-read 7`. A new verdict is law (§ 4.4), so it rides the RS-36 ballot. Also add #677's self-anchoring fixture: the audit's own `FAIL 7` output re-read in the same transcript reads `late-read 7`. **Closes**: the ballot's ratification and the checker PR merged.
4. **Briefs never hand the confirmer the target hash before the read** (Stacy). The #676 brief listed "move `canonicalHash` to `b7713a75…`" beside "recompute it yourself", which invites a hash-first act.
   - The rule is in the seat-brief template below now, and the orchestrator follows it from this record's merge.
   - **Closes**: the template moved to its final home with the wrapper (item 2's PR), with a pointer left here.

## Seat-brief template (interim home; moves to `scripts/seat-brief-template.md` with item 2)

A brief for a **signing or confirming act** (signing-act ballot M1) carries these steps in this order. A brief writer copies them; they are not paraphrased.

1. **Read first.** Print the whole unit through a tool before anything else: the canonical unit for a confirmation, the consumer rendering for a signature. Until item 1 lands, use `sed -n '<first>,<last>p' <file>` over the unit's whole span, or `cat` the rendering. **The brief does not give the target hash or the author's recomputed value.** It names only the unit, the record file and the reason it is stale.
2. **Recompute, then compare.** Recompute the hash yourself (`hashText` over `partition(splitFrontmatter(...).body).units`). Only then compare it with the freshness sweep's value (`npm run -s check:122:diff-guard`) and the overlay pin. If they differ, stop and report; do not act.
3. **Write the record.** The read line says "the whole unit, read at `<sha>`" (after item 1: "from the print-mode output at `<sha>`"), never a line range.
4. **Commit in the proven form, one act per commit, in its own tool call, with no `-q` and no push in the chain:**
   `git commit -F <message-file> && git log -1 --format='%H %s'`
   (or `git commit -m "<subject>" -m "<body>" -m "Agent: <Seat>` + newline + `Co-Authored-By: …" && git log -1 --format='%H %s'`). The `Agent:` and `Co-Authored-By:` trailers share the message's final paragraph. Never amend, rebase or reset.
5. **Push in a separate call.** Report the line `git log -1` printed.

*Signed: Thurgood, 2026-11-05.*
