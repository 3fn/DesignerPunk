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

> **[PENDING — Stacy's amended text, to be pasted VERBATIM by Stacy (or the orchestrator from her committed consult record).]**
> The drafting seat does not hold her text, and does not reconstruct it: a rule she amended is not re-authored from memory in the owner's seat.
> **Her SEPARABLE clause is marked `[SEPARABLE]` in her text, for Peter's pick**: ratify the rule with it, or without it.

**The drafter's original proposal, for reference only.** It is superseded by Stacy's amendment, so the rule text above governs:

> *A carried note that states a counterexample to a normative claim in requirements or design (a soundness, safety, or "cannot" sentence) is a finding: it routes to that text's owner when noticed, not into a later task's carry list. The owner, on receipt, either repairs the claim or records why it holds; carrying it forward unanswered is itself a finding. Notes about implementation that contradict no normative sentence may still be carried.*

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

> **Errata to a completion doc.** A correction to a committed completion doc is appended as a dated `## Erratum <date>` (or `## Addendum <date>`) section that cites what it corrects and what found it. The original text is not edited. An erratum to a criterion row's Status or Evidence also updates that row in place, and says so in the erratum. **An erratum does not discharge or pre-empt a claims-pass finding on the original claim** — whether the original is a finding is the claims-pass seat's call.

### Before → after (`governance/completion-documentation-guide.md`)

- **Before**: (after § 1's insertion) the new `### Carried notes that contradict a normative claim` subsection, followed by `### Authoring guidance — what each platform bullet verifies against`.
- **After**: insert `### Errata to a completion doc` between them, with the rule text above, verbatim.

### Counter-argument, run before presenting

- **The counter-argument**: the rule could invite quiet rewriting of a false claim before a claims pass sees it.
- **Folded in**: the original is never edited, and "does not pre-empt a finding" is stated.
- **What survives**: an in-place row update, which the rule requires so that parity stays true, does change the row a claims pass reads. The erratum's citation is what keeps the change visible.

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
