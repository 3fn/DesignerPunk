# Thurgood R1 (blind): the 16.3.0 records questions

**Plain version.** Q1 is Peter's. On Q2, B2 goes to its own small ballot, which I draft. Of my four records, b-ci, the RS queue and github-grant go to Peter, and link7 is mine to settle. Peter can rule all the escalations as one batch. On Q3, his ruling covers Stacy's 12 acts only. 19 of the other 24 are the link-7 defect; I still owe a read of 3 more. The link-7 record's own fix text is wrong.

## Q1 (RL-51): the records' home
- **Recommend (b) now**: `.kiro/docs/releases/**` exactly, for the five seats. 131 is parked behind 132, so the interim would otherwise carry on with no end date. Peter's F-1 words were "only gets worse the longer we let it persist." Also, `writeScope` already generates Kiro's `allowedPaths` (Ada, verified), so (b) settles Lina's unverified item 2.
- **Counter, folded back**: (b) means five `canonical/agents/**` edits, each with its signing acts, and 131's OWNERS file may move scope again. Putting all five sites in one ballot keeps it to one round. **What survives**: duplicated work if 131 re-homes scope, and Stacy's separation-of-duties point.
- **Class option** (*unverified*): a home under paths all five seats already write, so no scope has to move. Cost: one ballot amendment.
- **Peter's words required**: yes. Step 6's fallback puts the question to him. Under (b), scope moves only by Peter-merged charter edits, and their LAW lines need a RATIFIED ballot, while that ballot's ruling was F-2 (a). **Owed by me**: the record-only re-rule PR carrying the line alone, and the capture record's `## Lapse` (P2 record, first lapse: no escalation).

## Q2 (RL-52)
**(a) B2 goes to its own ballot now.** The record's own Trigger prose decides it ("or the working reading B2 goes to its own ballot then"). I draft it as owner, and Peter ratifies it (LAW, record-first). Bringing 131 forward would change his merged order, so that is his call alone.
- *Counter*: it is new law in the middle of a simplification that rewrites rule 11 anyway. *Folded*: the sentence is written as text 131 adopts as is. It also settles the dispute Stacy and I have now, whether a format-only Trigger change "sets" the token, and bound 1 makes that a defect in my text. *Survives*: one more ballot round. **Fork for Peter**: B2 alone, or B2 plus the standing-records sentence (that record's § "The fix").

**(b) My records:**
- **b-ci** (P2 guard, second lapse, so it goes to Peter). **Fix-now**: Peter rules #460's F-1 to F-4 in one sitting; the application is small (the `complete-task.sh` array and one CDG sentence); the trigger becomes `release:16.4.0:phase-1`. *Survives*: it has already lapsed twice waiting on that sitting, and a lapsed fix-now loses the option. The alternative is spec→131, with the dispatch line over-claiming in the meantime.
- **RS queue** (P2 guard, first lapse, so it goes to Peter). **Spec (131)**: the outline names it. The miss is mine: I never re-ruled it to 131's `path:` token. I also move RS-44's build half, its only guard row, to Lina's matching guard record and re-class the queue `(record)`, so it stops escalating at its first lapse.
- **github-grant-coverage**: **a lapse, on my reading**; Stacy reads no lapse. At `9d89982f8` the token had no backticks, so it was not a rule-1 token. #851 set it, and B2 says "the commit that set the token is not itself a re-rule." No event moved. It is P2 guard, so it goes to Peter. **Fix-now**: a warn-only check in `scripts/completion-claims/` (my scope), with Stacy's fixtures first, in one PR. RL-55 and RL-62 show the ARMING read at merge misses things. **Class option**: a scope-coverage check over every path, which would have caught RL-55. Its cost is spec-sized, so it is a candidate for spec→131.
- **link7** (P2 record, first lapse, no escalation): **mine, fix-now** in my tooling PR. **New defect**: its fix test, "not an ancestor of `8c31c7fa1`", cannot work. Signing acts are PR-branch commits, and a squash merge never makes them ancestors: `d85aaa85` and `c08bf675` predate #816 and are not ancestors of it. The cut has to key on the act's PR squash, or on the act's time against #816's `mergedAt`. I amend the record first.
- **I withdraw #856's Open-for-Peter line; it asks the wrong question.** A lapse is not a choice, re-ruling is the owner's act (rules 1 and 9), and a later re-rule "never erases" a lapse. link7 needs no Peter. github-grant goes to him inside the batch, as spec / drop / fix-now.

**(c) One batch**: yes. Rule 6 says "the escalations owed to Peter go to him as one batch". Each record still gets its own answer, and one "as recommended" can rule them all. The lapses that do not escalate (link7, the capture record, u5, composed-loop) are the owners' to settle.

## Q3 (RL-60): the signing flags
- **Coverage**: no. The ruling reads "The 12 flagged Stacy-signed acts stand as recorded." Extending it to the other 24 would be our reading, not his words.
- **Instrument read**:
  - The 19 #758 `writeScope` FAILs (rows that render nothing) are the **link-7 defect**. They predate #816 and read `record absent 7` before it. I add them to the link7 record.
  - The 3 rendered-line FAILs (Data `#in-scope` on #758, Kenya ×2 on #775) come from link 7's **original** branch, so the #816 cut does not cover them. The cause could be a store miss, a matching issue (Kenya's line carries backticks), or a real act defect: a seat that signed without its rendering in view. **Unclassified**; I owe a read of each act.
  - The 2 #676 anomaly 4s are link-4 slips like #752's. The commits exist, so they are evidence-form slips, not false acts.
- **Who decides**: § 5.1/§ 5.3 name no reader for non-Stacy flags, so Peter's words are not legally required. That silence is a gap; RS-36's amendment should name a reader.
- **The ask**: "Do the 19 pre-#816 acts and the 2 #676 slips stand as recorded, on the grounds of your 2026-11-09 ruling? The 3 rendered-line FAILs come back to you after my per-act read." *Survives*: this adds to Peter's load for acts the law does not send him, but until a reader is named, no one else can stand them.
