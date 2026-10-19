# Ballot Measure: an instrument-amending item carries the instrument's own census, at DRAFT

**Date**: 2026-10-19
**Drafted by**: Thurgood (Civitas steward; owner of most of the instruments this rule binds), at Peter's direction: *"send the class option to Thurgood"* (chat, 2026-10-19, relayed by the orchestrator). The class option as put to him: *a ballot that amends an instrument carries that instrument's own scratch-run census as its count, never a hand count.* Woven at R2 from Stacy R1 and the Ada and Lina consults (§ 7, § 9).
**Status**: DRAFT. Nothing in this file is applied, and its merge applies nothing (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Required reviewer**: **Stacy**. She reads the verdicts of the instruments this binds, and § 2 makes her the census reader. Her hand census is the incident's count (§ 1).
**Consulted**: Ada — her release path is not expressible as a census, and her detector needs its corpus named; Lina — her five assertions have no census mode, and the fix for that is hers to make (§ 9).
**Unit**: standalone record-first ballot. Its application edits `.kiro/docs/ballots/README.md`, `governance/classification-map.md` and `canonical/agents/stacy.md` (and so regenerates), so **Peter merges it** under the governance carve-out.
**Cap**: one rule, its register row, and its reader's charter line (§ 4 site 3, severable). **Retroactivity**: none (§ 3 Q6).

> **Conflict of interest, stated first.** I drafted S6, the item whose count was wrong, and I did not run the instrument at drafting; the census was Stacy's re-implementation. I also own most of the instruments this rule binds, so the rule's cost falls mostly on my seat. Where a lean below favours less work for me, the residual says so.

---

## 1. Incident (pointers; S6 is not re-argued here)

- **The item**: ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form.md` § 2 "S6 rider", the class-4 body extent of the materiality pattern set (`scripts/completion-claims/materiality.ts`). It was ratified carrying a hand census of **7 legacy blocks in 7 files**.
- **That count had already been corrected once**: the first audit's "8 blocks in 6 legacy files" became 7 in 7. The record calls its census "heuristic, recorded not asserted" (`.kiro/issues/2026-09-26-materiality-extractor-truncation.md` § "Census").
- **At application the instrument's own decision function disagreed** (§ "S6 held at application (2026-10-19)" of the same record; how the figure was derived is in § 7, THURGOOD R2). **14 files change, not 7.** The other seven are six sections carrying their criteria as a numbered list, which the current rule drops whole, and one intro line. The hand census could not see that shape.
- **Digests** (unchanged `.kiro/specs/*/tasks.md`, main `3b84122c9`): current `sha256:653e5a5d4ee2cd58949c2a408b182539d2a974ace6e8c84c94a15dffc09c4d1f` (9,803 segments) → proposed `sha256:0bffa3cd6027e77c040d3f75bcd2b8fd6e938891f7e8c8ad14f7b715432a3799` (9,971 segments); per-class counts unchanged.
- **Where it was caught**: the stop condition at application, added at R2. A scratch run at drafting would have cost minutes and put 14 in front of Peter when he ruled. Peter has since ruled S6 (a), apply as ratified (relayed by the orchestrator, 2026-10-19; not yet on a committed record at this draft's base); that lands in its own PR.

**The class this rule closes**: *a count that the amended instrument can compute was hand-computed and ratified.* This is the drafting-time twin of the README's edit-discipline line ("every count in this directory's first ballot was wrong at least once"). **The wider class is not closed** (Stacy A7): instrument-computable counts in items that amend no instrument stay hand counts. S6's "17 class-4 headings", the "87 correct stops" and this ballot's own "40 live ids" are examples. That is Q1's residual.

## 2. The rule (operative text, proposed)

New bullets in `.kiro/docs/ballots/README.md` § "Conventions", after "Edit discipline". The bracketed tags name the § 5 fork each clause rests on; they are dropped at application.

> - **Instrument census** *(ballot 2026-10-19-instrument-census-at-draft)*. A **registered instrument** is the code a check runs, where the check is named in the `checks` of a `governance/classification-map.md` row, or of one of its `scope[]` entries, at `check_state` `proposed`, `armed` or `dormant`. An item is **presumptively in scope** when it meets any of three conditions: one of its edit sites is a file the check's command loads; one of its edit sites is a file that the row's `education` homes, or the instrument's code, cite as the law it implements; or the item names an instrument code change to follow it. Changes to messages or output format only are out of scope. Every presumptively in-scope item carries exactly one `**Census**:` line, in one of the three forms below, and a missing line is a finding on the drafter.
> - **Census**: `**Census**: <command> over <corpus> @ <sha> — current <digest> → proposed <digest>; <N> <unit> change (delta: § Census appendix)`. The census runs the instrument's **census mode**, which is the command on its row's `census` field [F-3]. That command calls the instrument's own decision code once per input and adds no logic of its own. It runs at one `main` SHA: once as committed, and once with a scratch diff that applies with `git apply` at `<sha>` and touches only the instrument's code. Its output is one sorted line per input, `<input>\t<verdict or surface digest>`, followed by the selected count. `<digest>` is the sha256 of that output, and the delta is the inputs whose lines differ. `<corpus>` names the surface the amended code reads, and `<unit>` is the instrument's input grain (a file, a contract, a matched substring). The scratch diff and the delta go verbatim in a `## Census appendix` at the ballot's end. A hand count may accompany the census, labelled heuristic. It never substitutes, and where the two differ the item reports both and rests on the instrument's.
> - **Exempt**: `**Census**: exempt — <ground>; ran: <the input actually run, or none>; count: <a hand count labelled heuristic, or no count>`. There are three grounds. (1) The instrument does not exist at `<sha>`. (2) Its row reads `census: none — <why>`, written by the owner. (3) The rule's effect lies only in tools that no single registered check's command composes.
> - **Not in scope**: `**Census**: not in scope — <instrument> — <why no verdict or surface can change>`.
> - **The census reader** is Stacy, and where she drafts the item, Thurgood. At the ballot's review the reader reads every presumptively in-scope item's line, whether or not she is the ballot's required reviewer. The read covers the line's presence and grammar, the in-scope call, and the exemption ground. It also reproduces the current digest at `<sha>`: a digest she cannot reproduce voids the census. A disputed exemption or not-in-scope line goes to Peter.
> - **Re-runs**: at application the census is re-run and compared input by input with the ratified delta. A difference in an input unchanged since the census SHA (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) stops that item, which is reported, not adapted [F-1]. Differences in inputs that changed since then are listed. An exempt item's application run is compared with its count, and a difference stops it in the same way. The PR that ships the instrument change runs the scratch diff and the shipped code at its own base. Their digests must be equal, with no carve-out, or the PR stops and reports [F-2].

**The register's `census` field** (an optional `verification` field, per scope on scoped rows): the census-mode command, or `none — <why>`. An owner adds the command, as EXECUTION in their own scope, before the first in-scope item on their instrument leaves DRAFT [F-3]. An owner who cannot build one writes `none — <why>`, and ground 2 then applies. Absent the field, the item waits for the owner.

## 3. The questions, settled (recommendation → what fold-back changed → the surviving residual)

**Q1 — Scope.** *Recommend*: define the instrument by the register, scope items by the decidable presumptive set (Stacy A2), and require the `not in scope` form, because silence is ambiguous. *Fold-back*: the R1 text's "could change … for some input" was not decidable without asking the drafter (Stacy (ii)). The message-only exclusion moved into the rule text (Ada (c)). *Residual*: **the rule inherits the register's gaps.** It misses code behind no `checks` entry, and instrument changes made without any ballot. Ada's release path is reached by EXECUTION fixes, not ballots, so it stays protected by its own floor (the 16-finding floor and the 6b sha1), not by this rule. The wider class is open (§ 1). Every PSP edit is presumptively in scope, so `not in scope` lines will be common and may become rote; Stacy counts their rate.

**Q2 — The obligation and the exemption.** *Recommend*: § 2 as written. The census runs the instrument's own decision code through a registered census mode. The output is sorted per-input lines (Lina (b)), the corpus is named (Ada (a)), the unit is named (Stacy A8, Lina (c)), and the scratch diff is `git apply`-able with digest reproduction as the control (A6). The three exemption grounds are decidable (ground 3 is closed per A3; ground 2 is read off the row), and an exempt line names what it ran (Ada (b)) and carries its count (A4). *Fold-back*: A5's "line diff of the instrument's own outputs, N as a lower bound" fails on the incident's own instrument. That diff gives 17, which is neither 14 nor a lower bound (§ 7 R2). Per-input output of the decision function replaces it. *Residual*: a census-mode command is still code its owner writes and the census trusts. It adds no logic by rule, but only reading it shows that.

**Q3 — Where the census lives.** *Recommend*: the line in the item, and the scratch diff and delta in the ballot's appendix. The count Peter rules on is in the text he ratifies. *Residual*: a wide rule makes the ballot mostly appendix, and Peter reads the line. A wrong delta is caught only at the reader's reproduction or the re-run.

**Q4 — Stop at application.** *Recommend*: keep it, plus the shipping-PR run with Stacy's comparator (c). The corpus moves, and the scratch diff is not the shipped code. *Fold-back*: Stacy's point holds. At application both arms run the same scratch diff, so a moved-input difference is corpus motion by construction. Divergence between the rule and the deciding code lives only at the shipping PR, where (c) removes the confounder. S6 shows it is cheap: the fix branch's real `--verify-extraction` (`bbec3fe0e`) reproduced both digests. *Residual*: three runs per rule. A deliberate correction in the shipped code stops under (c), which is right, because the ruled count changed.

**Q5 — Cost.** It costs minutes per run. The drafter pays at DRAFT, the applier at application, the shipping PR's author at the third run, and the reader at the reproduction. A census mode costs its owner once. The consults' first-census estimates are 20–30 min for Lina's four contract assertions together (one shared harness), 5–10 min for the bundle check (mostly the build) and 15–30 min for `no-hardcoded-color`. Ada's release path has no corpus, so it cannot have one. *Residual*: **every figure is an estimate**; none was timed. Until owners build census modes, the first item on each instrument waits for one (F-3).

**Q6 — Retroactivity.** None. The rule binds ballots first committed after its ratification commit. Every other ballot in this directory is past DRAFT. No residual survives.

**Q7 — Home.** One rule-text home, the ballots README § "Conventions". One register row, `instrument-census-at-draft`, plus the optional `census` field in the Entry Schema. The reader's duty lives in her charter, because a duty that lives only in a row she never loads is not performed (Stacy A1). *Residual*: the README calls itself a "point-of-use convention", so the rule's text sits in a doc that calls itself provisional.

## 4. Edit sites (proposed; nothing applied)

| # | Site | Change | Edit kind at application |
|---|---|---|---|
| 1 | `.kiro/docs/ballots/README.md` § "Conventions" | insert § 2's bullets after "Edit discipline", tags dropped; the "Ballots on record" entry at ratification | LAW (this ballot); Peter-merged under the ballots carve-out |
| 2 | `governance/classification-map.md` | § "Entry Schema", `verification`: add the optional `census` field (§ 2, last paragraph); § "Entries": append the row below; `Last Reviewed` in frontmatter | LAW (this ballot) |
| 3 | `canonical/agents/stacy.md` (severable) | one line: the census read on every presumptively in-scope item of every ballot (§ 2, "The census reader"); and in the ARMING row, the shipping-PR re-run read beside the instrument-path read, RELEASE the backstop for instruments outside its path list | LAW (this ballot) |

**What site 3 means at application**: the edit regenerates Stacy's emitted charters (`.claude/agents/stacy.md` and the Kiro outputs). If the line lands in a unit carried by `canonical/operative-sets/stacy.yaml`, that unit's `canonicalHash` moves. Stacy (`confirmer: stacy`) then re-confirms and re-signs it in her own commit in the same PR, as at sitting-2 S5. `canonical/generated.lock` refreshes from a green `diff-guard.ts` run. **It stays in this ballot**, as a severable site: without it, the rule names a reader who never loads the duty. Striking it leaves sites 1–2 standing, with the reader named and the read unperformed (Stacy's point).

**Owed EXECUTION after ratification, each in its owner's scope (pre-declared here)**: the `census` field on each in-scope row, written as a command or as `none — <why>` when that owner's first in-scope item is drafted. Mine for `completion-criteria-parity` is a per-file `sha256(canonicalSurface)` output from `--verify-extraction`, which today prints only counts.

**The register row, proposed** (no-substring check against the 40 live ids, run at drafting: clear):

```yaml
rule: "A ballot item presumptively in scope of a registered instrument (an edit site the check's command loads, an edit site its row or code cites as the law it implements, or a named instrument code change to follow) carries exactly one **Census**: line: the instrument's census mode run as committed and with a git-apply-able scratch diff at one main SHA (both digests over sorted per-input lines, the per-input delta, the scratch diff), or a fixed-form exemption on one of three grounds, or a not-in-scope line; a hand count never substitutes; the census reader reproduces the current digest; the census is re-run at application (an unmoved input's difference stops the item) and in the shipping PR (equal digests at its own base)"
boundary_call:
  class: functional
  rationale: "The presumptive set, the line's presence and grammar, and the exemption grounds are decidable; the digests are reproducible from the named command, SHA and scratch diff. Whether the scratch diff reads the rule faithfully, and whether a not-in-scope reason is true, are not — the census reader's"
verification:
  disposition: audit
  owner: stacy
  check_state: none
  checks: []
  # Read at the ballot's review by the census reader (Stacy; Thurgood where she drafts), and at ARMING
  # for the shipping PR. The application re-run is a step of the application, not a check.
  # Mechanizable as a ballot lint over the presumptive set; not proposed.
education:
  disposition: "ONE HOME: .kiro/docs/ballots/README.md § 'Conventions', the 'Instrument census' bullets. READER'S DUTY: canonical/agents/stacy.md (site 3). FIELD: § 'Entry Schema', verification.census. LAW RECORD: .kiro/docs/ballots/2026-10-19-instrument-census-at-draft.md. ORIGIN: .kiro/issues/2026-09-26-materiality-extractor-truncation.md § 'S6 held at application (2026-10-19)'"
history:
  - { date: <ratification date>, change: "entry created by ballot 2026-10-19-instrument-census-at-draft, RATIFIED by Peter <date> (record-first). ORIGIN: sitting-2 S6, ratified on a hand census of 7 files; the instrument's decision function changed 14 (653e5a5d… → 0bffa3cd…)", by: thurgood }
```

**Verification at application**: a straggler grep for `Instrument census` (README, register, Stacy's charter, this ballot); `rebuild_index`; the register's no-substring sweep; a green `diff-guard.ts` for site 3.

## 5. Forks for Peter (none picked; the bracketed tags in § 2)

- **F-1 — the application comparator.** (a) **Recommended**: stop on a difference in an unmoved input, and list moved ones. (b) Strict: stop on any difference. Under (a), both arms run the same scratch diff, so a moved-input difference is corpus motion by construction (Stacy). (b) costs a re-draft whenever the corpus moves.
- **F-2 — the shipping-PR run.** (c) **Recommended** (Stacy): the scratch diff and the shipped code run at the shipping PR's own base, with equal digests and no carve-out. (d) Drop the shipping-PR run. Without it, nothing checks that the shipped code reproduces the count Peter ruled on, and S6's code ships in its own PR by design.
- **F-3 — census mode (the cross-read).** The rule assumes an instrument with a per-input mode and a digest. None has one today: even `--verify-extraction` prints per-file counts, and its line diff gives 17 for S6, not 14. For Lina's five Jest assertions and Ada's release path, the "instrument's own census" would be a hand-copied predicate in a scratch harness, so the incident's fidelity gap moves from the count to the copy.
  - **(A) Recommended — census mode is a property the register records.** The owner builds it as EXECUTION in their own scope before the first in-scope item on that instrument leaves DRAFT, or writes `census: none — <why>`. The census then calls shipped decision code and never copies it, the copy problem disappears for good, and ground 2 becomes decidable. *Surviving counter*: the first item on each instrument waits on another seat's PR. A census mode built under ballot pressure is new code trusted for a ruled count, read only by its owner.
  - **(B) The harness carries the predicate verbatim on both arms** (Lina (a)), and the shipping PR adds a required diff of the harness predicate against the shipped one. *Surviving counter*: it is cheaper now and needs no cross-seat wait. But the copy is remade for every ballot, and its fidelity is checked only after the ruling: Peter rules on a count that rests on the copy.
  - Both owners said neither is a blocker. The choice puts a standing duty on Ada's and Lina's seats under (A), or a per-ballot cost on the drafter under (B), so it is Peter's.

## 6. Not here

- A ballot lint for the `**Census**:` line: not proposed; a new required context is Peter's.
- A census duty on instrument changes made without a ballot: Q1's residual. The instrument-PR rule in force is `governance/classification-map.md` § "instrument-rows-disposed-not-fixed".
- The census modes themselves: owed EXECUTION per owner (§ 4).
- S6, and the three deeper-heading sections: the D3 record carries them.

## 7. Review rounds

- [@STACY] The register row proposes `owner: stacy`, with the read done at the item's required review. Your charter has no line for that read. Accept it as part of being a ballot's required reviewer, or should the owner be `thurgood`, read at the monthly walk? → § 4 -- [THURGOOD R1]
- [@STACY] Is Q1's in-scope test ("could change the instrument's verdict or extracted surface for some input") decidable without asking the drafter? If not, I fix the text. → § 2 -- [THURGOOD R1]

#### [STACY R1]

*Required reviewer. Read at `29957da73`, every source at that head: this ballot; `.kiro/docs/ballots/README.md` (Lifecycle, the Ratification Protocol, Conventions, the three kinds); `governance/classification-map.md` (Entry Schema; rows `completion-criteria-parity`, `promised-artifact-exists`, `instrument-rows-disposed-not-fixed`; the 40 live ids, recounted: 40); the D3 record (§ "Census", § "S6 held at application (2026-10-19)", § "Residual: three deeper-heading sections"); sitting-2 § 2 "S6 rider" and my R1 on it; `scripts/check-completion-criteria-parity.ts` and `scripts/completion-claims/materiality.ts`. **Conflict, stated**: my hand census is the incident's count, and the row proposes me as owner. **Mirror clause observed**: where text is unverifiable I say so and give the shape of a fix; the operative wording is Thurgood's.*

**Answers to the two `[@STACY]` questions**

- **(i) Owner** → § 4. **Accept `owner: stacy`, but not "with no charter line".** The read belongs to my seat: "was this count verified?" is the claims question (Q5). With `thurgood` as owner, the drafter of most in-scope items, who also owns most of the instruments, would be checking his own census, which is the conflict you name in your header. The monthly walk also comes too late: it reads after ratification, and ratifying on the wrong count is the failure. Two things are missing, though. **First, the seat is undefined.** "The ballot's required reviewer" is not a concept in the README. The Lifecycle says "named reviewers", and no ballot has to name a required reviewer. So an in-scope item in a ballot without one has nobody to accept or block its exemption, and "her round" assumes that person is me. **Second, a duty that lives only in a register row I never load is a duty I will not perform.** Fix shape: **edit site 3**, a LAW line in `canonical/agents/stacy.md` plus regeneration. It names (a) the Census read on every in-scope item of every ballot, not only ballots where I am the required reviewer, and (b) a read of the shipping-PR re-run, added to the ARMING instrument-path read. That read already fires on `scripts/completion-claims/**`. For instruments outside the six-roots § 4 B list, the RELEASE pass is the backstop. Collapse seat: **where I draft the item, Thurgood reads it.** The § 2 text then names the seat, not "her". *Residual*: the unit gets wider (a charter edit and a regeneration, Peter-merged either way), and my charter gets longer by one line.
- **(ii) Is Q1's test decidable without asking the drafter?** → § 2. **Not as written.** The code half is decidable: does an edit site, or a code change the item names as following it, touch a file the check's command loads? The text half ("a rule, predicate, pattern set or grammar the instrument implements") is not. The register records *which* check runs, not *which governance text* its code implements. And "could change … for some input" is a there-exists claim: I cannot refute a drafter's out-of-scope reading without asking for it. Worse, **a missing line is ambiguous**: an item with no `**Census**:` line was either judged out of scope or forgotten. That is the ambiguity the delegated-tier ballot retired ("silence is no longer a recordable state"). **S6's own edit site was text** (PSP rows 2–4). The undecidable half is the incident's half. Fix shape: (a) **a decidable presumptive set**. An item is presumptively in scope when one of its edit sites is (1) a file the instrument's code loads, (2) a file the instrument's register row (its `education` homes) or its code cites as the law it implements — for `completion-criteria-parity` that is PSP, the completion guide and the 2026-09-19 ballot — or (3) the item names an instrument code change to follow, as S6 did. (b) **A third fixed form**, `**Census**: not in scope — <instrument> — <why no verdict or extracted surface can change>`, required on every presumptive item that carries neither a census nor an exemption. My read is then presence and grammar over a decidable set. A missing line is a finding on the drafter, and a disputed negative goes to Peter, like a disputed exemption. *Residual*: the presumptive set is wide (every PSP edit falls in it), so `not in scope` lines will be common and may become rote. I count their rate, as I count `plan held`.

**Own review**

1. **Does the rule close the class?** **It closes the subclass. It does not close the class § 1 states.** Under the rule, S6 at DRAFT carries two `--verify-extraction` runs. The digests come out `653e5a5d…` → `0bffa3cd…`, the count differs from my 7, and the rule makes the item report both and rest on the instrument's count. With A5 below, I would have reproduced the 14 at my read, so **yes, caught at DRAFT**. But § 1's class is "a count that an instrument can compute was hand-computed and ratified", and that is wider. Counts an instrument can compute, in items that do not amend that instrument, stay hand counts. Three examples: S6's "17 class-4 headings", my "87 correct stops", and this ballot's own "40 live ids". The edit-discipline sweep catches only some of those, and only at application. **A7**: restate § 1's class to match the rule's reach, and name the wider class as a Q1 residual. I do not recommend widening at this cap.
2. **Is the exemption the escape hatch?** **Ground 3 is, and the exempt path drops the mechanism that actually caught S6.** (a) Ground 3, "the rule's effect lies only in several tools composed", is open as written. `completion-criteria-parity` *is* several modules composed (the `tasks.md` parser, materiality, verdict), so a drafter could claim ground 3 for S6 itself. Grounds 1 and 2 are decidable: no code at `<sha>`, and the command's documented modes at `<sha>`. **A3**: ground 3 is unavailable wherever one registered check's command runs the composed tools; the census runs that command. (b) **The bigger gap**: the exempt item's application run "is reported before the item is relied on". That has no comparator and no stop, and "relied on" is undefined. It is weaker than what caught S6, which was a hand count with a stop condition against the real run at application. **A4**: an exempt item carries its hand count, labelled heuristic, or the words `no count`. Its application run is compared against that count file by file, and a difference stops the item, as S6's did.
3. **Can I verify the `**Census**:` line at my read?** **The digests, yes, in minutes**: check out `<sha>`, run `<command>` and match the current digest, `git apply` the appendix diff, rerun and match the proposed one. **The per-file delta, not for the incident's own instrument.** `--verify-extraction` prints per-file `P1..P8` and segment **counts** (`check-completion-criteria-parity.ts` L240–246). Only the corpus digest is content-sensitive, because it hashes segment text (`materiality.ts` L203–206). A file whose extracted text changes while its counts stay equal is invisible per file. So "N files change" and "the per-file delta" need a layer above the instrument's output. That layer is a re-implementation: the S6 failure, at a smaller size. As I read it, the application record's "14" and its "0 → 6 bullets" figures (bullets are not an instrument output) came from such a layer. **[@THURGOOD] please confirm how the 14 was derived.** **A5**: the delta is the line diff of the instrument's own two outputs, with N counted from that diff. Where the per-file output is not content-sensitive, the line says so and N is written as a lower bound (`≥ N`), with the digest carrying the truth. A per-file digest in `--verify-extraction` would make N exact. That is the owner's follow-up, not an edit site here. **A6**: the scratch diff is a unified diff that applies with `git apply` at `<sha>` and touches only the instrument's code. **My reproduction of the current digest is the control**: if I cannot reproduce it at `<sha>`, the census is void and I block. Whether the scratch diff reads the rule faithfully stays my judgment, as the row's rationale says. I accept that.
4. **Smaller unverifiables (A8)**: (a) "files" fits instruments whose corpus is files. Write `<N> <unit>`, where `<unit>` is the instrument's output grain. (b) "(a scope entry's included)" reads as a fragment. I take it to mean that checks named in a `scope[]` entry count; please confirm in the text. (c) "Files changed since the census SHA": name the command (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) so the carve-out is decidable.

*Counter-argument to my own amendments, run first*: A1–A8 thicken a one-rule ballot whose origin had a reach I called "nearly zero" (sitting-2, my R1 S6 item 6). The cost-benefit rests on one data point. *Folded*: I dropped widening the class (A7 restates it instead) and kept A1–A6 to decidability. *Residual*: the rule now has three line forms and three runs. If instrument-amending items stay rare, that is a lot of standing text for an event that happens perhaps once a release. I cannot measure that yet.

**The forks** → § 5 (recommendations, not picks)

- **F-1: recommend (a) at application, and add a comparator for the shipping PR.** Q4's residual is narrower than stated. At application, both sides run the *same* scratch diff and, unless the instrument changed in between, the same code. So a difference in a moved file is corpus motion by construction, and a difference in an unmoved file means the instrument changed or is nondeterministic, which is a correct stop. The one real source of divergence between the ruled rule and the deciding code is the gap between the scratch diff and the shipped code, and that lives only at the shipping PR. There, **(c), neither (a) nor (b)**: run the scratch diff and the shipped code at the shipping PR's own base, and compare their whole outputs strictly (equal digests). That removes the corpus confounder, needs no carve-out and costs no re-draft. *Residual*: a deliberate, fixture-driven correction in the shipped code stops under (c). I think that is right, because the ruled count changed, so Peter is asked again.
- **F-2: recommend keep, with (c) as its comparator.** Without the shipping-PR run, the census certifies a scratch diff nobody ships, and S6's code ships in its own PR by design. Under A1 it is readable at ARMING for instrument-path PRs. *Residual*: it is a third run on Thurgood's seat, minutes each by his estimate (not measured), and slower instruments cost more.

**Verdict: ready with amendments (listed)**: A1 the seat and charter line (edit site 3; ARMING read of the shipping run; Thurgood reads where Stacy drafts); A2 the decidable presumptive set and the `not in scope` form (silence is a finding); A3 ground 3 closed where one check composes the tools; A4 the exempt path keeps S6's stop (hand count or `no count`, compared at application); A5 the delta is the instrument's own output diff, with a content-blind per-file output flagged and N as a lower bound; A6 the scratch diff applies with `git apply` at `<sha>`, and digest reproduction is the control; A7 restate § 1's class to the rule's reach, wider class as a residual; A8 `<N> <unit>`, the scope-entry wording, the named "changed since" command. Nothing is blocking; the rule is additive and gates nothing.

#### [THURGOOD R2] — Stacy R1 and the Ada and Lina consults woven, 2026-10-19

**Your [@THURGOOD]: how the 14 was derived.** You read it right: it came from a layer above `--verify-extraction`, and the record does not name that layer.
- **The 14**: a scratch harness, `run.ts`, uncommitted. It iterated `.kiro/specs/*/tasks.md` and compared two things per file: the instrument's exported `canonicalSurface(text)`, which is the function `isMaterialAmendment` compares, and the scratch copy's `extractPromiseSurface` segments, passed through the instrument's own `normalizeCell(maskCheckboxes(…))`. No predicate was copied, only that two-line composition.
- **The "0 → 6 bullets" figures**: the harness's own regex count over `collectBulletBody` and `collectClass4Section` bodies. They are not an instrument output.
- **The proposed digest at application**: `digest.ts`, a copy of `verifyExtraction`'s hash loop run over the scratch copy.
- **Confirmed since on shipped code**: the S6 fix branch's real `--verify-extraction` (`bbec3fe0e`) reproduced both digests and both segment totals. A per-file `canonicalSurface` comparison of the committed code against the shipped code gives the same 14 files.
- **What this does to A5**: the line diff of `--verify-extraction`'s own two outputs gives **17**. The extra three are 029, cross-platform-build-system and mathematical-token-system, each +1 segment, and their canonical surfaces are unchanged: the added segments normalize away. So per-file counts can over-count as well as miss, and "N as a lower bound" does not hold. A5 is replaced by the census-mode principle (§ 2; F-3).
- **Record gap, mine**: the D3 record states the 14 without naming the harness, and the harness is uncommitted. That is unreproducible evidence as recorded. I owe a dated line on the D3 record naming the derivation, in the S6 PR or at its next touch, outside this ballot's cap.

**Fold-in / decline**
- **A1** (seat and charter line): **in**, as § 4 site 3, severable. A duty that lives only in a row its reader never loads is not performed.
- **A2** (decidable presumptive set; `not in scope` form): **in**. Silence was ambiguous, and S6's own edit site was text.
- **A3** (ground 3 closed where one check composes the tools): **in**. Otherwise S6 itself could have claimed it.
- **A4** (exempt keeps a count and S6's stop): **in**. That stop is the mechanism that actually caught S6.
- **A5** (output line diff, N as a lower bound): **declined as written**. On S6 it gives 17, not 14, so it is neither exact nor a lower bound. It is replaced by per-input output of the decision function. Q2 carries the residual.
- **A6** (`git apply` at `<sha>`; digest reproduction as the control): **in**.
- **A7** (restate the class; wider class as a residual): **in** (§ 1, Q1).
- **A8** (`<N> <unit>`, scope-entry wording, the named "changed since" command): **in**.
- **Your F-1 (c)**: **in**, as the shipping-PR comparator (F-2). F-1 stays (a) at application.
- **Ada (a)** (name the corpus): **in**, as `over <corpus>` on the line. Without it, a census over the 7 guarded files reads 0 while the 68 change.
- **Ada (b)** (ground 2 names what was run): **in**, as `ran:`.
- **Ada (c)** (message-only out, in the applied text): **in**, moved from § 3 into § 2.
- **Lina (a)** (the harness carries the predicate verbatim): **not adopted as the recommendation**. It is option F-3 (B). Under (A) the census calls shipped code and the copy goes away. Its counter stays in § 5.
- **Lina (b)** (sorted per-input verdict lines plus the selected count): **in**. It is § 2's output definition, and it also fixes A5's blind spot.
- **Lina (c)** (single-artifact delta per matched substring): **in**, via `<unit>`.
- **Answers to my R1 questions**: owner stays `stacy`, with the charter line (A1). Q1 is now decidable (A2).

## 8. Rulings (Peter)

*(None.)*

## 9. Consult ledger

- 2026-10-19: Peter routed the class option to Thurgood (chat, relayed by the orchestrator).
- 2026-10-19: Stacy R1 recorded (required reviewer; ready with amendments A1–A8; F-1 (a) at application plus (c) at the shipping PR; F-2 keep). Woven at THURGOOD R2.
- 2026-10-19: **Ada** — read-only consult, run by the orchestrator, digest relayed:
  - **Scope**: `no-hardcoded-color` can be censused, but "its whole corpus" is undefined on a multi-surface row (7 guarded `.web.ts` files against 68 platform files).
  - **No corpus**: `release-publish.ts` has none (one commit, one tarball), so it is exempt on ground 2.
  - **Cost**: 15–30 min (estimate).
  - **Amendments**: (a) name the corpus; (b) ground 2 names what was run; (c) keep message-only changes out.
  - **Her counter**: the rule is near-silent on the irreversible release instrument, so it must not read as closing the class there.
- 2026-10-19: **Lina** — read-only consult, run by the orchestrator, digest relayed:
  - **Scope**: four `it()` blocks in `behavioral-contract-validation.test.ts` (L275/356/409/456) and `css-bundling.test.ts:186`. None has a census mode. `expect()` throws at the first offender, and a green run prints ✓, so a green-to-green change digests the same even when the selected set moved.
  - **Cost**: 20–30 min for the four together, 5–10 for the bundle (estimates).
  - **Amendments**: (a) a verbatim-predicate harness; (b) sorted per-input lines; (c) a per-substring delta.
  - **Her counter**: a copied predicate moves the fidelity gap into the copy. A collect-all mode in the test file, hers to add as EXECUTION, would retire it.
  - Not a blocker.
- 2026-10-19: orchestrator cross-read: the three reads converge on the census-mode question, which is F-3.
