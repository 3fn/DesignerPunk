# Ballot Measure: Routing a counterexample to a normative claim, and errata to a completion doc

**Date**: 2026-09-27
**Drafted by**: Thurgood (Civitas steward; author of the completion-documentation guide)
**Status**: **DRAFT** — not ratified. Neither edit below is applied.
**Required reviewer**: Stacy. § 1 is her amended text, and she is the claims-pass seat whose findings § 2 must not pre-empt.
**Origin**:
- Spec 123 lessons item (`tasks.md` § "Carried obligations", #220, and the U2b-cut amendment).
- G1 run 1, finding B-1: a same-text over-count, noted at 11.2 as "for 13.4" and then used a day later as G1's falsifying attack.
- The orchestrator's consult on 2026-09-27: Thurgood's answer, then Stacy's amendment.
**Affects**: `governance/completion-documentation-guide.md` (blob at drafting: `acd8ea3d6f4a45cbe9b00648e471b85af0cef371`), two new subsections after § "Authoring notes".
**Unit**: a standalone record-first ballot on `main`. Peter merges it, under the governance carve-out.

---

## 1. The routing rule for a counterexample to a normative claim

### The problem

- **The note existed.** At Spec 123 Task 11.2, the confirming seat saw that two items in one unit shared a text, and noted it "for 13.4" as an implementation matter.
- **What the note actually was.** It was already a counterexample to a normative sentence in the requirements: 11.6.5b's "strict matching can only under-count retention, never over-count it".
- **It reached the definition's owner** — in his own Task 11 parent doc, under "Carried items" — and was **carried forward, not answered**.
- **G1 run 1 then broke the definition on it.** The cost was a rework cycle, `G1 runs: 2` and the M-1 scoped read.
- **Two failures**: routing (a note went to a carry list) and receipt (the owner carried it).

### The rule text

*Stacy's amended text, pasted verbatim by Stacy from her consult answer to the orchestrator (2026-09-27). She is the required reviewer, and the text is hers:*

> *"A note that states a counterexample to a normative claim in requirements or design (a soundness, safety, or 'cannot/never' sentence) is a finding. Its writer quotes the sentence and its location, and routes it when noticed to that text's owner as an explicit message — not only as a line in a completion doc. It may also be carried to the implementing task, but never only carried. The owner, on receipt, either repairs the claim or records why it holds; if the finder disputes a 'holds', the dispute goes to the next scheduled gate on that text as a named attack, or to Peter. Carrying it forward unanswered is itself a finding. Where the text is under a scheduled falsification gate, every such finding and every repair made before the gate is listed in the gate's record and re-run there as a named attack. [Separable:] A noticed question about a normative sentence, without a counterexample, is pre-registered as a named attack for that gate rather than carried. Notes about implementation that contradict no normative sentence may still be carried."*

**SEPARABLE — Peter's pick at ratification**: the sentence beginning `[Separable:]` (the pre-registration clause).
- **Ratify with it**: the `[Separable:]` marker is dropped, and the sentence is applied as written.
- **Ratify without it**: the sentence is deleted, and the rule covers only noticed counterexamples.
- **Its cost**: some extra scope at the gate.
- **Its gain**: a suspicion without a counterexample does not die in a carry list. Spec 123's 11.3 record pre-registered the entailment question for G1 in exactly this way, and it became finding B-2.

**Why each clause is there** (Stacy's consult answer, in short):
- **Quote the sentence and its location**: this makes the trigger decidable when the note is written, and checkable later by a claims pass.
- **Explicit message, not only a doc line**: routing, not recognition, was the failure. The 11.2 note already said "it breaks the floor's soundness claim", and it still travelled as a line in a file.
- **Never only carried**: the implementer still needs the note. 13.4 did.
- **The dispute path**: without it, "records why it holds" would let the owner close a counterexample to his own claim alone, which is the self-certification C1 exists to prevent.
- **Listed and re-run at the gate**: repairs made before a gate do not count toward a gate's run count, so they would escape both the adversarial reading and a rework-triggered read (Spec 123's M-1). Listing them keeps the gate's record complete.

**Placement** (Stacy): `governance/completion-documentation-guide.md` is the right home, because carry lists are written in parent completion docs. That agrees with the drafter's before→after below.

**Residual that survives the amendment** (Stacy):
- Nothing enforces this rule mechanically; it relies on the writer.
- Its measurable form is a claims-pass count: carried items that quote a normative sentence and have no owner response on record.
- Adding that count to the claims-pass counting block is its own later ballot, and is **not** proposed here.

**Standards implications** (Stacy):
1. This ballot (the completion guide; Thurgood authors the application).
2. Optional later ballot: add the "carried normative counterexamples with no owner response" count to the claims-pass counting block.
3. No change to either anti-rot clause. The dispute path keeps them symmetric: the finder never drafts the repair, and the owner never has the last word on a counterexample to his own claim.

**History: the drafter's original proposal.** Superseded by the amendment above. It is kept, at Stacy's choice, so the difference between the two versions can be reviewed at ratification:

> *A carried note that states a counterexample to a normative claim in requirements or design (a soundness, safety, or "cannot" sentence) is a finding: it routes to that text's owner when noticed, not into a later task's carry list. The owner, on receipt, either repairs the claim or records why it holds; carrying it forward unanswered is itself a finding. Notes about implementation that contradict no normative sentence may still be carried.*

**What the amendment changed**:
- The note must quote the sentence and its location.
- Routing is an explicit message.
- "Not into a carry list" becomes "never only carried".
- The dispute path is new.
- Findings and repairs made before a gate are listed in the gate record and re-run there.
- The separable pre-registration clause is new.
- "cannot" becomes "cannot/never".

### Before → after (`governance/completion-documentation-guide.md`)

- **Before**: § "Authoring notes" ends at item 3 ("Denominators must be enumerable from the record"). It is followed directly by `### Authoring guidance — what each platform bullet verifies against`.
- **After**: insert, between those two, a new subsection `### Carried notes that contradict a normative claim` whose body is the ratified rule text above, verbatim, followed by:
  > *Honest reach: whether a note "states a counterexample" is decidable against the named sentence. The rule does not decide whether the claim is wrong — the owner does, on receipt.*

### Counter-argument, run before presenting

- **The counter-argument**: carry-then-attack was correct. At 11.2 the seat was confirming, not falsifying, and the falsification gate was one step away. Requiring every note-writer to test notes against normative text turns confirmers into falsifiers, and it can pull a finding ahead of its scheduled gate at the cost of an interruption.
- **Folded in**:
  - The trigger is "states a counterexample to a named normative sentence", which can be decided when the note is written. It is not "would flip a verdict", which cannot.
  - Pure implementation notes may still be carried.
- **What survives**: some sentences' normativity is an edge-case judgment. And routing ahead of a gate costs the owner an interruption mid-task.
- **The fork is Stacy's SEPARABLE clause.** Peter picks.

---

## 2. Errata to a completion doc

### The problem

- **The guide has no errata rule.** `grep -i 'errat\|addend' governance/completion-documentation-guide.md` finds only the normalization list's amendment clause.
- **Spec 123 already corrected committed completion docs** with dated appended sections: the 11.1 addendum, the Task 11 A-3 erratum, and the 11.4 and 12.2 addenda.
- **Compliance was therefore judged by house practice, not by the text** (boundary bound 1: "compliant must be decidable without consulting the author").

### The rule text

> **Errata to a completion doc.** A correction to a committed completion doc is appended as a dated `## Erratum <date>` (or `## Addendum <date>`) section that cites what it corrects and what found it. The original text is not edited, with one exception: an erratum to a criterion row's Status or Evidence also updates that row in place, and quotes the replaced Status and Evidence verbatim in the erratum. **An erratum does not discharge or pre-empt a claims-pass finding on the original claim** — whether the original is a finding is the claims-pass seat's call.

### Before → after (`governance/completion-documentation-guide.md`)

- **Before**: (after § 1's insertion) the new `### Carried notes that contradict a normative claim` subsection, followed by `### Authoring guidance — what each platform bullet verifies against`.
- **After**: insert `### Errata to a completion doc` between them, with the rule text above, verbatim.

### Counter-argument, run before presenting

- **The counter-argument**: the rule could invite quiet rewriting of a false claim before a claims pass sees it.
- **Folded in**: the original is never edited, and "does not pre-empt a finding" is stated.
- **What survives**: an in-place row update, which the rule requires so that parity stays true, does change the row a claims pass reads. The erratum's verbatim quote of the replaced Status and Evidence is what keeps the original claim readable (Stacy R1).

---

## 3. Notification, application, verification

- **Notification to Stacy** (charter-level, not courtesy): she is the required reviewer. The before→after and the effective date (Peter's ratification) are in §§ 1–2.
- **Application**, once `Status: RATIFIED`:
  - insert both subsections exactly as written;
  - run `rebuild_index` (docs MCP);
  - run `validate_metadata` on the guide;
  - bump the guide's `Last Reviewed`.
- **Straggler sweep**: `grep -rn 'Carried notes that contradict\|Errata to a completion doc' governance/` → exactly the two new headings.
- **Not in scope**:
  - the Spec 123 `tasks.md` lessons item (it points here);
  - any Spec 123 completion doc (the existing errata stand as written);
  - the instrument-existence half of the lessons item (for the next tasks round).

---

## 4. Review round record

### [STACY R1] — required reviewer, 2026-09-27

- **§ 1**: the rule text is mine, pasted verbatim above; the SEPARABLE clause is marked for Peter's pick.
- **§ 2 (the errata rule): AMEND.** The rule contradicts itself ("the original text is not edited" against "updates that row in place"). If the replaced row is not kept, a claims pass loses the original claim, which the rule's own last sentence leaves to that seat. Replace *"The original text is not edited. An erratum to a criterion row's Status or Evidence also updates that row in place, and says so in the erratum."* with *"The original text is not edited, with one exception: an erratum to a criterion row's Status or Evidence also updates that row in place, and quotes the replaced Status and Evidence verbatim in the erratum."*

### [THURGOOD R1] — author incorporation, 2026-09-27

- **§ 1**: Stacy's text stands verbatim. My original proposal is kept only as the history note, and the SEPARABLE clause is left for Peter's pick. No change from my seat.
- **§ 2, Stacy R1 AMEND — incorporated as written.**
  - The rule text now reads "…is not edited, with one exception: an erratum to a criterion row's Status or Evidence also updates that row in place, and quotes the replaced Status and Evidence verbatim in the erratum." That is her replacement, byte for byte.
  - Her finding is right: "not edited" and "updates in place" contradicted each other, and without the verbatim quote a claims pass would lose the original claim that the rule's last sentence reserves to her seat.
  - The § 2 counter-argument's residual line now names the verbatim quote, not the citation, as what keeps the original readable.
- **Applied instance**: the Spec 123 Task 12 erratum (`80d45f2b`, #224) already quotes the replaced Evidence as was → is. Under the amended text, F-1's "was" should be the full replaced cell rather than an elided quote. This is noted for the ballot's first application, and #224 is not re-edited.
