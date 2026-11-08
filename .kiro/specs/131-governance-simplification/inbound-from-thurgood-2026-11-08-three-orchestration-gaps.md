# Inbound from Thurgood: three gaps in how a unit is run, found in Spec 129 U7 to U9

**Date**: 2026-11-08
**Author**: Thurgood (Spec 131's formalizer, and maintainer of the checks named below), at Peter's direction. **Verifier of the facts**: Stacy, for classes 1 and 3 (her read is in Consulted).
**Peter's words**, recorded with `date -u` at receipt (orchestrator relay; **UNVERIFIED** beyond the relay): 2026-11-08T04:01:15Z, "Yes, go ahead with the three inbounds". The three classes below, and their evidence, were supplied by the orchestrator; I re-counted what I could from git and `gh` and label the rest.
**Status of 131**: design outline merged, paused at the edge of requirements. Its park re-asks at `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`. This inbound may wait a long time.
**Consulted**: Stacy — classes 1 and 3 hold up apart from the anomaly count; class 1's option (b) uses `merge-hold` with no new grammar; class 3's option (b) would prove the brief named the doc, not that it was followed, so I wouldn't read that marker.
**Record**: none filed under README rule 10. See § 5.

This is **a consideration, not direction** (Peter's standing rule for inbounds, 2026-11-04T13:23:25Z, as `inbound-governance-cost-ledger.md` § 1 quotes it). It rules nothing.

---

## 1. Class 1: the head-H hold is a written line that nothing checks

**What happens.** A unit PR whose follow-up (post-merge evidence, a verifier read) has to land on the same head carries a written line, "hold for head H". No law names it: a search of `governance/` and `.kiro/steering/` finds no "hold for head" rule, so it is orchestrator practice. No check reads it. The platform shows all checks green.

**Instances (VERIFIED, `gh pr view`).**
- #739 (U7, "Task 12 Complete") was opened 2026-11-07T21:15:20Z and merged 21:23:47Z. Its follow-up #741 was opened 21:26:59Z, 3 min 12 s after the merge, and merged 21:36:16Z.
- #763 (U9, "Task 14 Complete") was opened 2026-11-08T03:28:19Z and merged 03:57:47Z. Its follow-up #765 was opened 03:59:48Z, 2 min 1 s after the merge, and was **not merged at this writing**.
- **Counter-instance (relayed)**: #757 (U8) carried a head-H hold, and it held: the follow-up joined before the merge, including `de41687ff`. So the practice has worked when followed; 2 of 3 units, not 2 of 2, lost it.
- Peter merged both before the follow-up had landed (orchestrator, **UNVERIFIED** beyond the relay: "twice"). Content cost: not counted here; each repair was a separate PR. That is **2 repair PRs in 3 units** with a head-H hold, a rate of one sample.

**Same shape as L-10.** A held condition, restated in a PR body, that no instrument reads (`inbound-governance-cost-ledger.md` L-10). `merge-hold` answers that class for `**Open for Peter**:` lines. It does not read a head-H line.

**The class option.** Extend `merge-hold` so that it also holds a unit PR until its head-H follow-up has landed.
- *Mechanism*: a second marker with a closed grammar, for example `**Hold for head H**: <40-hex sha> — follow-up: <PR number or path>`, and a release condition the check can read: the follow-up PR is merged, or the named path exists at the PR head. The grammar and the release condition are LAW in Task-Completion-Protocol § "Branch and PR Conventions", so a ballot is needed (the 2026-11-07 merge-hold ballot is the model). The workflow edit itself is P1c-bounded only if it adds `env` keys; a new job or a new read is not, and goes through an issue-row grant.
- *Cost*: one ballot, one `merge-hold.yml` change, one parser case and its falsification fixtures, and a promotion read (the existing `merge-hold` promotion needs 5 clean runs that parsed a marker; a second marker would need its own, or the count restarts). **PROJECTED**: about 1 ballot, 2 PRs, 1 session. A new rule for the author: write the line in the grammar.
- *Surviving counter-argument*: **the check cannot know when a follow-up is "done".** "Merged" is readable; "complete" is not. A follow-up PR can merge and still be wrong, and a hold with no release path blocks the unit forever. Closing the hole by naming a mergeable PR moves the memory problem one step: the author must open the follow-up before the unit merges, and in both instances above the follow-up did not exist until after the merge (VERIFIED: #741 and #765 opened after). So the grammar would force the follow-up to be opened first, which is a change to how units are run, not only a check. A second survivor: the check's own advisory period would repeat the 5-run bake for a pattern seen twice.
- *Cheaper alternatives the requirements round should weigh*: (a) fold the follow-up into the unit PR, so no hold exists (the follow-up exists because its evidence is a post-merge measure; where it is not, it can ride the unit); (b) treat "hold for head H" as an `**Open for Peter**:` question, so `merge-hold` already covers it with no new grammar. The orchestrator can already do (b) today; whether it should is the fork. That one is Peter's.

## 2. Class 2: Primary Artifacts omit files that a pinned test forces the unit to edit

**What happens.** A parent's assignment row grants write access to "exactly that parent's listed Primary Artifacts" (Task-Completion-Protocol § "Coherent Units", write scope). When a test pins text in a file the row will change, the unit must also edit the pinned test or the pinned text, and the planner did not list them. The gap is found at the red test, not at planning.

**Instances.**
- **U9, scope sentence (VERIFIED, file)**: `.kiro/issues/2026-11-08-u9-install-doc-scope-sentence-grant.md` (#761) is a grant for `README.md` and `scripts/__tests__/install-doc.test.ts`, whose scope sentence is pinned. Its fixing PR is #763.
- **U9, three disclosed edits outside the list in #763 (orchestrator, count not re-derived here)**: `scripts/generate-platform-tokens.ts` and the two Spec 123 catalog files, which `personalNote.test.ts` pins.
- **U8, a different cause (VERIFIED, file)**: the `d2-check` header grant (#760). The cause was a file with no owner after U8, not a pinned test. It is the other entry in this section only as the control; the class below does not cover it. It belongs to the unowned-paths inbound (`inbound-from-2026-10-29-unowned-paths.md`).

**The class.** A planning-time census of which tests pin text in files the row will change. A close relative already exists: `.kiro/issues/2026-10-01-plan-blast-radius-and-carry-tracking.md` item (a), "the tasks-round sweep for what a plan's changes will touch" (a `manual` P3 record, routed to this spec by § 13's second batch). **That record already covers the sweep**; what this inbound adds is the pinned-test instance and the U9 count. So the class option is to cite the instance in that record, not to open a second one.

- *Cost of the option*: a census step in the tasks round (Process-Spec-Planning, mine). **PROJECTED**: one `grep` of `__tests__/` for the file names and sentences each row changes, run once per parent; its cost is the planner's, and it grows with the number of rows. Under the grant model each miss costs one issue-row grant and a PR (U9 paid one grant and three disclosed edits).
- *Surviving counter-argument*: a census can only list pins it can search for. `personalNote.test.ts` pins the personal-note template through catalog files, and a text search for the path would not find that indirection. A pin by rendered output, by hash or by count is invisible to a path grep. So the census removes the direct misses and leaves the indirect ones, and may give a planner false confidence that the list is complete. The grant path stays needed either way.

## 3. Class 3: briefs that restate a governed procedure drift from it

**What happens.** The orchestrator wrote signing-seat briefs from memory instead of from `governance/signing-seat-brief.md`. Two results (orchestrator, **UNVERIFIED** beyond the relay except where marked):
- The briefs dropped `-q` from the commit command. VERIFIED (file): the governed form is `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'` (signing-seat-brief § "The commit line"). On #758 every link-4 act read a false `anomaly 4` except one (Data's `82907ca2`, which read `anchored`), about 15 acts; its writeScope rows read `record absent 7`, which is by design. On #763 its one act read `anomaly 4` (orchestrator's own `--audit` runs, relayed).
- The briefs had signers author their own charter text, which failed F12′ (rule S2 of the same doc: "your own charter" is authoring, not signing) and forced the re-cut of the native-lane application (#758's branch r2).

**Whether something already covers it: yes, in part.** The governed document says why it exists in the same terms: on PR #445 "the rule was in the ballot (§ 4.3); the seat briefs dropped it", and "signing briefs quote this document by path and commit (`governance/signing-seat-brief.md@<sha>`)" (VERIFIED, file, its "What this document is", pointing to the practice recorded in `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` § 6). So the answer, to link rather than retype, is already the recorded practice. What is missing is any read of whether it was followed. Nothing checks that a brief quoted the document: `--audit` link 4 reads the result (the commit print), not the brief. F12′ is a gate and caught the second result, after the work was done.

**The class.** A brief that restates a governed procedure can drift, and a drift costs a re-cut, not a warning. This is the recurrence of #445's own cause, six weeks later (VERIFIED, dates in the doc: 2026-10-23 against 2026-11-08).

**The class option.** Two defensible forms, and the pick is not mine:
- (a) *Practice only*: the orchestrator's briefs for any governed procedure link the document by path and commit and add no restated step. Cost: nothing written in law; no check. The #445 record already says it, and it failed to hold.
- (b) *Read it mechanically*: a brief carries a `**Brief source**: governance/signing-seat-brief.md@<sha>` line and a check that the PR body or the claims pass can read it. Cost: a marker, a reader, and an owner (Stacy's ARMING read would be the natural reader), plus a ballot if the marker is law.
- *Surviving counter-argument*: a link line proves the author named the document, not that the brief obeys it. The instance above is a brief that restated the rule from memory and would have carried the link line anyway. The real check is the one that already exists (link 4, F12′), and it runs after the act.

## 4. A fact, not a class

Fix 2 of `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md` leaves 131's intake. Peter ruled so at 2026-11-08T03:55:36Z (orchestrator relay, **UNVERIFIED** beyond it). The record's re-rule rides the combined link-4 PR, which is in flight; it is not done at this writing. Its § 13 row (map row 2) stays as the record of what was routed until that PR merges. Note that class 3's false `anomaly 4` is the symptom that record's fixes address; this inbound does not claim the cause is the same.

## 5. Rule 10: is a root record owed?

**No record is filed.** README rule 10 owes a record to "a ruling or a claims pass that creates an obligation". Peter's go ("go ahead with the three inbounds") creates this file and its two lines, and nothing else: no class option here is ruled, and none carries an owner's obligation. Class 1's ballot, class 2's census and class 3's marker are each a proposal; the first one that Peter rules creates the obligation, and that ruling files its own record. Class 2 and class 3 would each also land in an existing record (`2026-10-01-plan-blast-radius-and-carry-tracking.md`; the #445 record), which an appended dated line serves. **If Stacy reads it otherwise**, the cheapest record is one P3 `manual` file for class 1, Trigger `path:` on this spec's `requirements.md`.

## 6. What 131 is asked to weigh

Take each class into a requirement, or rule it out with a reason. All three bear on the same 131 question: how much of the unit's run is held by a written line that no instrument reads, and what a check on it costs against what it would have caught. Evidence so far is two units (class 1), one unit (class 2) and one recurrence of an earlier drift (class 3). **Forks that are 131's or Peter's**: whether `merge-hold` grows a second marker or "hold for head H" becomes an `**Open for Peter**:` question; whether a census step belongs in the tasks round; whether briefs carry a source line a check reads.
