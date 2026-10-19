# Ballot Measure: an instrument-amending item carries the instrument's own census, at DRAFT

**Date**: 2026-10-19
**Drafted by**: Thurgood (Civitas steward; owner of most of the instruments this rule binds), at Peter's direction: *"send the class option to Thurgood"* (chat, 2026-10-19, relayed by the orchestrator). The class option as put to him: *a ballot that amends an instrument carries that instrument's own scratch-run census as its count, never a hand count.*
**Status**: DRAFT. Nothing in this file is applied, and its merge applies nothing (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Required reviewer**: **Stacy**. She reads the verdicts of the instruments this binds, the register row below proposes her as owner, and her hand census is the incident's count (§ 1).
**Consult owed before ratification**: **Ada** and **Lina**, bounded and read-only. Their instruments are in scope (§ 3 Q1), by register owner: Ada's `hermetic-publish-path` (`scripts/release-publish.ts`) and the dormant `no-hardcoded-color` assertion; Lina's behavioural-contract assertions on `wcag-format-validity`, `wcag-required-refs`, `validation-criteria-completeness`, `contract-platforms-specified` and `no-disabled-states`.
**Unit**: standalone record-first ballot. Its application edits `.kiro/docs/ballots/README.md` and `governance/classification-map.md`, so **Peter merges it** under the governance carve-out.
**Cap**: one rule, one register row. **Retroactivity**: none (§ 3 Q6).

> **Conflict of interest, stated first.** I drafted S6, the item whose count was wrong, and I did not run the instrument at drafting; the census was Stacy's re-implementation. I also own most of the instruments this rule binds, so the rule's cost falls mostly on my seat. Where a lean below favours less work for me, the residual says so.

---

## 1. Incident (pointers; S6 is not re-argued here)

- **The item**: ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form.md` § 2 "S6 rider", the class-4 body extent of the materiality pattern set (`scripts/completion-claims/materiality.ts`). It was ratified carrying a hand census of **7 legacy blocks in 7 files**.
- **That count had already been corrected once**: the first audit's "8 blocks in 6 legacy files" became 7 in 7. The record calls its census "heuristic, recorded not asserted" (`.kiro/issues/2026-09-26-materiality-extractor-truncation.md` § "Census").
- **At application the real instrument disagreed** (§ "S6 held at application (2026-10-19)" of the same record). The current rule is the committed file; the proposed rule is a scratch copy with only the class-4 caller changed. **14 files change, not 7.** The other seven are six sections carrying their criteria as a numbered list, which the current rule drops whole, and one intro line. The hand census could not see that shape.
- **Digests** (unchanged `.kiro/specs/*/tasks.md`, main `3b84122c9`): current `sha256:653e5a5d4ee2cd58949c2a408b182539d2a974ace6e8c84c94a15dffc09c4d1f` (9,803 segments) → proposed `sha256:0bffa3cd6027e77c040d3f75bcd2b8fd6e938891f7e8c8ad14f7b715432a3799` (9,971 segments); per-class counts unchanged.
- **Where it was caught**: the stop condition at application, added at R2. A scratch run at drafting would have cost minutes and put 14 in front of Peter when he ruled. Peter has since ruled S6 (a), apply as ratified (relayed by the orchestrator, 2026-10-19; not yet on a committed record at this draft's base); that lands in its own PR.

The class: **a count that an instrument can compute was hand-computed and ratified.** This is the drafting-time twin of the README's edit-discipline line ("every count in this directory's first ballot was wrong at least once … the sweep caught what the lists missed").

## 2. The rule (operative text, proposed)

A new bullet in `.kiro/docs/ballots/README.md` § "Conventions", after "Edit discipline":

> - **Instrument census** *(ballot 2026-10-19-instrument-census-at-draft)*. An item that amends what a **registered instrument** decides carries that instrument's own census at DRAFT. A registered instrument is the code a check runs, where the check is named in a `governance/classification-map.md` row's `checks` (a scope entry's included) at `check_state` `proposed`, `armed` or `dormant`. An item amends what it decides when, applied, it could change the instrument's verdict or extracted surface for some input: a rule, predicate, pattern set or grammar the instrument implements, or its code. The census is the instrument run twice over its whole corpus at one named `main` SHA, once as committed and once with a scratch diff implementing the proposed rule. The item carries one line, `**Census**: <command> @ <sha> — current <digest> → proposed <digest>; <N> files change (delta: § Census appendix)`. `<digest>` is the instrument's own corpus digest where it emits one, otherwise the sha256 of its whole-corpus output. The scratch diff and the per-file delta go, verbatim, in a `## Census appendix` at the ballot's end. A hand count may accompany, labelled heuristic. It never substitutes, and where the two differ the item reports both and rests on the instrument's.
> - **Exemption**: where no scratch run can express the rule, the item carries `**Census**: exempt — <ground>` instead. There are three grounds: the instrument does not exist yet; it has no whole-corpus mode; or the rule's effect lies only in several tools composed. The drafter declares it. The ballot's required reviewer accepts or blocks it in her round, and Peter rules if they disagree.
> - **Re-runs**: the census is re-run at application, and again in the PR that ships the instrument change, and each is compared file by file with the ratified delta. A difference in any file unchanged since the census SHA stops that item, which is reported, not adapted. Differences in files changed since are listed in the PR and do not stop it. An exempt item's application run is its first census, and its result is reported before the item is relied on.

## 3. The questions, settled (recommendation → what fold-back changed → the surviving residual)

**Q1 — Scope.** *Recommend*: define "instrument" by the register's `checks` at `proposed`/`armed`/`dormant`, limited to checks that run as code here. Platform configuration (branch protection, merge method) and the PROCEDURAL record-first check name no runnable code, so they are out by the definition, not by a list. *Fold-back*: I considered borrowing the six-roots ballot's enforcement-code list (§ 3 item 4, cited by the governance-edit-kinds README section). I rejected it, because two lists of the same set drift, and the register is where enforcement ownership is already decided. Message-only and output-format changes are out (they change no verdict). *Residual*: the rule inherits the register's coverage gaps. Code that decides but sits behind no `checks` entry escapes, for example a `proposed` row with empty `checks`. So does an instrument change made without any ballot (a standing-scope EXECUTION fix), because this is a ballot-drafting rule.

**Q2 — The obligation and the exemption.** *Recommend*: § 2 as written. Two runs at one SHA, both digests, the per-file delta and the scratch diff, all at DRAFT. A hand count may accompany but never substitutes. Three named exemption grounds; the drafter declares, the required reviewer accepts or blocks, and Peter rules on a dispute. *Fold-back*: "a hand count never substitutes" alone would leave a new instrument with no lawful count, so the exemption is named, closed and fixed-form rather than left to judgment. *Residual*: **the census measures the drafter's scratch diff, not the rule.** A scratch diff that misreads the rule yields a precise wrong count with a digest on it, which reads as more authoritative than a hand count. The shipping-PR re-run (Q4) narrows this but does not remove it. A closed list of three grounds can also become the escape hatch; the required reviewer's block is the only check on that.

**Q3 — Where the census lives.** *Recommend*: in the ballot. The `**Census**:` line goes in the item, and the scratch diff and per-file delta go in a `## Census appendix` at the end. Peter rules on the ballot, so the count he rules on must be in its text. A pointer to an instrument record would put the ratified number in a file that is not ratified. *Fold-back*: I had a size threshold, with large deltas moved to the instrument's issue record. I dropped it: it gives one fact two homes, and not every instrument has a record. *Residual*: a census of a wide rule makes the ballot mostly appendix, and Peter reads the line, not the appendix. A wrong delta can therefore sit in ratified text unread, which is caught only at the re-run.

**Q4 — The stop condition at application: keep it, or let the drafting census retire it?** *Recommend*: **keep it**, and add a run in the PR that ships the instrument change. The drafting census retires neither, for two reasons. The corpus moves between draft and application. And the scratch diff is not the shipped fix: S6's law text and its code fix land in separate PRs, so only the shipping PR's run tests the code that will decide. *Fold-back*: a strict file-by-file comparison would stop on every legitimate corpus move, so differences in files changed since the census SHA are listed, not stopped on. *Residual*: one rule now costs three runs of the same command. **The moved-file carve-out lets a real divergence in a file that also moved pass as "listed".** The strict alternative is in § 5, F-1.

**Q5 — Cost.** *Recommend*: accept it, stated plainly. It costs minutes per instrument per run: a scratch copy, two runs of an existing command, and pasting digests and a delta. The **drafting agent** pays at DRAFT, the **applying agent** at application, and the **shipping PR's author** at the third run; mostly that is my seat. *Fold-back*: none; this is a fact, not a design. *Residual*: **the figure is an estimate, not a measurement.** S6's application run is the only data point, and its time was not recorded. Instruments without a whole-corpus mode, or slow ones, cost more. That cost lands on the exemption path rather than disappearing.

**Q6 — Retroactivity.** *Recommend*: none. The rule binds items in ballots whose first commit follows this ballot's ratification commit. S6 is ruled (Peter, 2026-10-19, apply as ratified), and its stop condition already ran. Read at drafting: every other ballot in this directory is past DRAFT, so no in-flight item is caught. *Residual*: none that survives; a retroactive census of ratified items would re-open settled rulings to fix no live defect.

**Q7 — Home.** *Recommend*: **one rule-text home**, the ballots README § "Conventions", next to the edit-discipline line it mirrors. Every drafter reads that file, and the rule binds the act of drafting. **One register row**, `instrument-census-at-draft`, records the classification and its owner. *Fold-back*: I considered a line in each instrument's charter or register row, and rejected it: one rule in N homes is the drift class. *Residual*: the README's own Status line calls it "point-of-use convention", with the durable law home a classification-map decision. So the rule's text sits in a doc that calls itself provisional. The row is what makes it citable and walkable.

## 4. Edit sites (proposed; nothing applied)

| # | Site | Change | Edit kind at application |
|---|---|---|---|
| 1 | `.kiro/docs/ballots/README.md` § "Conventions" | insert § 2's three bullets after "Edit discipline"; add the "Ballots on record" entry at ratification | LAW (this ballot); not a governance path, Peter-merged under the ballots carve-out |
| 2 | `governance/classification-map.md` § "Entries" | append the row below; bump `Last Reviewed` in frontmatter | LAW (this ballot) |

**The register row, proposed** (non-substring check against the 40 live ids, run at drafting: no id contains it, and it contains none):

```yaml
rule: "A ballot item that amends what a registered instrument decides carries, at DRAFT, the instrument's own census (current vs a scratch diff of the proposed rule, over the whole corpus at one named main SHA: both digests, the per-file delta, the scratch diff) or a fixed-form exemption on one of three grounds; a hand count never substitutes; the census is re-run at application and in the PR that ships the change, and a difference in a file unchanged since the census SHA stops the item"
boundary_call:
  class: functional
  rationale: "Whether an item is in scope is decidable from the register (does an edit site amend text or code behind a checks entry at proposed/armed/dormant); the Census line's presence and grammar are decidable; the census itself is reproducible from the named command, SHA and scratch diff. Whether an exemption's ground is TRUE, and whether the scratch diff reads the rule faithfully, are not — the required reviewer's"
verification:
  disposition: audit
  owner: stacy
  check_state: none
  checks: []
  # Read at the item's required review (presence, grammar, in-scope call, exemption ground) and at
  # application by the applying agent (the re-run: a step of the application, not a check).
  # Mechanizable as a ballot lint (a Census line on any item whose edit site is behind a checks
  # entry); not proposed.
education:
  disposition: "ONE HOME: .kiro/docs/ballots/README.md § 'Conventions', bullets 'Instrument census', 'Exemption', 'Re-runs'. LAW RECORD: .kiro/docs/ballots/2026-10-19-instrument-census-at-draft.md. ORIGIN RECORD: .kiro/issues/2026-09-26-materiality-extractor-truncation.md § 'S6 held at application (2026-10-19)'"
history:
  - { date: <ratification date>, change: "entry created by ballot 2026-10-19-instrument-census-at-draft, RATIFIED by Peter <date> (record-first). ORIGIN: sitting-2 S6, ratified on a hand census of 7 files; the instrument's census at application changed 14 (653e5a5d… → 0bffa3cd…)", by: thurgood }
```

**Verification at application**: a straggler grep for `Instrument census` (expected: README × 1, register × 1 citation, this ballot); `rebuild_index` after the register edit; the register's non-substring sweep re-run.

## 5. Forks for Peter (none picked)

- **F-1 — the stop rule's comparator.** (a) **Recommended**: stop on a difference in any file unchanged since the census SHA, and list differences in moved files. (b) Strict: stop on any difference, moved files included. (b) costs a re-draft round whenever the corpus moves between draft and application, which is common. (a) carries Q4's residual: a moved file can hide a real divergence.
- **F-2 — the shipping-PR re-run** (severable; the third sentence of § 2's "Re-runs" bullet). Keep it (recommended), or limit the rule to ballots and application. Without it, nothing checks that the shipped code reproduces the census Peter ruled on, which is Q2's residual left open.

## 6. Not here

- A ballot lint mechanizing the `**Census**:` line: not proposed; a new required context is Peter's.
- A census duty on instrument changes made without a ballot (standing-scope EXECUTION fixes): that is Q1's residual. The instrument-PR rule already in force is `governance/classification-map.md` § "instrument-rows-disposed-not-fixed".
- S6 itself, and the three deeper-heading sections: the D3 record carries them.

## 7. Review rounds

*(Stacy R1 owed.)*

- [@STACY] The register row proposes `owner: stacy`, with the read done at the item's required review. Your charter has no line for that read. Accept it as part of being a ballot's required reviewer, or should the owner be `thurgood`, read at the monthly walk? → § 4 -- [THURGOOD R1]
- [@STACY] Is Q1's in-scope test ("could change the instrument's verdict or extracted surface for some input") decidable without asking the drafter? If not, I fix the text. → § 2 -- [THURGOOD R1]

## 8. Rulings (Peter)

*(None.)*

## 9. Consult ledger

- 2026-10-19: Peter routed the class option to Thurgood (chat, relayed by the orchestrator).
- Owed: Stacy R1 (required reviewer); Ada and Lina, bounded read-only consults on Q1's scope over their instruments.
