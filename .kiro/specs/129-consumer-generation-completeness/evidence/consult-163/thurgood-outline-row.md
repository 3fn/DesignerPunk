# Thurgood: the 131 outline row and the waiting-spec figure (read-only consult, 2026-11-12)

**Short version.** Add the row (a). The cost you read in it is smaller than it looks: 131's last outcome line is `park`, and a park row is reprinted until its re-ask event fires, never by its figure. Only an `open` row is re-asked by figure (at 2). The class option is sound in aim, but it fixes a ratified residual that has no bite here, so it should not ride B2.

## 1. Your reading, and options missed
- **(a) and (b) read right.** Rule 11, sentence 2 (README L20): "A **spec** answer is carried out when the spec's design outline merges and names the record." (b) leaves it uncarried, so the record lapses again at 16.4.0's S with his answer quoted ("Until the outline merges, each later lapse returns the record to Peter with his spec answer quoted").
- **One correction to the cost of (a).** The figure's only action is Addition A: "an `open` row is re-asked once its figure reaches 2" (ballot 2026-11-04-waiting-spec-row, L71). 131's last outcome line is `Spec outcome (2026-11-05, Thurgood)**: park — re-ask: path:.kiro/specs/132-*/completion/first-family-measured-cost.md`. RELEASE-FLOW 3a reprints "a row whose last outcome is `park` and whose re-ask event has not fired", with no figure test. So the restart changes a printed number for 131 (0 instead of 1 at 16.4.0's S), and decides no re-ask. The ballot already names the reset: "Any outline edit resets the figure ... a residual, not a feature" (§ 2 L59, § 7, Counter-argument 2).
- **Options that avoid the outline, and why none carries it out on the text as it stands:**
  - an `**Outcome**:` line or a `**Routed**:` line in the record: rule 11 names the outline, not the record;
  - an `inbound-from-*.md` file in 131's directory (the directory holds eleven): it is the spec's intake, but it is not "the design outline", so a strict reader (Stacy) says the spec answer is not carried out;
  - a routing file per spec: no such convention exists.
  So there is no route that avoids the outline without a text change to rule 11 (see 2).
- **Option missed (c)**: put the record back to Peter as fix-now or drop. It is his answer to change, not mine, and the record's items are guard rows that 131 is parked on anyway. I do not propose it.

## 2. The class option
- **Sound in aim**: a routing-table row is not a review of the outline, and a reset on it hides the real wait.
- **Strongest counter-argument**: the reset is the conservative reading Peter ratified, and its only effect, on an `open` row, is to delay a re-ask, never to hide a decision from him. "Last moved" is a cheap, mechanical, falsifiable measure (`git log -1 -- design-outline.md`). Any carve-out ("edits outside the routing table don't count") needs a definition of the table, and the figure stops being a one-line git command.
- **Mechanical?** Not from the script as written. `baseline-snapshot.sh` L143 takes `git log -1 --format=%H -- <outline>` and has no notion of table bounds. 131's outline has several tables (rows at L290–L306 sit in more than one block). Doing it right needs a marker convention (a fenced `<!-- routed:start/end -->` pair) and a `git log -L` or hunk-diff read per commit. **Cost**: a RELEASE-FLOW 3a edit, a script change in the same PR (3a: "a change to the definition here changes the block in the same PR"), a marker retrofit in every waiting outline (128, 130, 131, 132, 133), and fixtures. That is a ballot-sized change, for a figure that moves a decision only on `open` rows, and none of the five waiting specs is `open` at S.
- **Rides B2?** No. B2 is rule 11's lapse reading; the figure lives in RELEASE-FLOW 3a and the script. Mixing them adds a RELEASE-FLOW site and a script change to a ballot that is currently one sentence and README-only.
- **What could ride B2, cheaply**: one clause in rule 11's spec sentence, "the spec's design outline, or an `inbound-*.md` file in the spec's directory, merges and names the record". That would carry out spec answers without touching the outline, and it does not touch the figure. It is a real option, and it is Peter's to take. I would draft it as a fork in the B2 ballot, not as a default.

## 3. Recommendation
**(a), in a small chore PR, with a `**Consulted**:` line.** It carries out Peter's answer on the text that exists, with the least new law. The row names the record, its owner, "RS queue, P2 (record)", and says it takes no round.
- **Residual**: (i) the precedent that a routing row resets a park's figure is repeated, and a longer-parked spec reads younger; (ii) the figure at 16.4.0's S for 131 reads 0, not 1; (iii) if Peter prefers no outline edit, the cost is one more lapse and one more return to him, which is real but small. The fork that survives is the one in 2: widening rule 11's "outline" to include inbound files. I surface it; Peter picks.
- **Not Peter's**: nothing else about the row needs his word, except the figure effect, which you are putting to him.

## 4. Who else reads the figure
- **Stacy**: the monthly health-check walk "reads that each release's walk record carries" the paste (3a); phase 1 does not read it. She wrote R2's tag-at-S correction and is the reader of rule 11's "names the record". Consult her on whether an inbound-file widening satisfies "the outline".
- **Lina, Leonardo, Ada**: the owners of the other waiting outlines (128, 130, 132, 133) see their figures reset by any routing row. They need telling only if the class option or the widening goes ahead.
- **Peter**: the orchestrator's one batch reprints `open` rows below 2 and `park` rows with unfired events. He reads these. For `park` rows he reads the event, not the figure.
- No one else; the figure feeds no CI check and no other script.
