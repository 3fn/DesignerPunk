# Release 16.1.0's standards implications: the queue (RS-37, RS-42 to RS-49), each with its source, the law text it touches, a proposed disposition and a vehicle

**Date**: 2026-10-26
**Owner**: Thurgood (the composed loop's standards side, `canonical/agents/thurgood.md` § "The composed learning loop"; the instruments and RELEASE-FLOW text named below). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, from the orchestrator's routing of Stacy's RELEASE claims pass for 16.1.0 (phase 1 and addenda 1 to 5, #497 `55c218cfd`; phase 2, #510 `b1a07fb7b`). Source file for every row: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md`; line numbers hold at both SHAs (checked at filing).
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Thurgood, rule 12. One item is guard-class: **RS-44's build half**, the governance-examples guard checks the names a web example uses and not what it does, so it is weaker than the claim that served examples are true. Rule 12 allows one sub-tag per record, so the record takes the stricter one; the other rows are record-class (the text or the record is wrong, no reader is misled). The cost: at its first lapse the whole record goes to Peter (rule 11), not only the guard row. I chose that over splitting into two records because the orchestrator asked for one, and because Lina's `(guard)` record for the predicate half carries the same trigger. See "Surviving counter-argument".)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S: every row below has a merged vehicle or a dated disposition line by then. This record is filed after 16.1.0's S (`38f4ece47`, #505) and after the 16.1.0 walk record, so under rule 11's post-walk sentence its first firing is the release after 16.1.0. **Lapse condition**: a row with neither a merged vehicle nor a dated disposition line at that S lapses there; because the record is P2 `(guard)`, its first lapse goes to Peter with exactly spec, drop or fix-now.
**Consulted**: Stacy — <pending: RS-45/46 are her method, RS-47 her reading>
**Nothing here is ruled.** Every disposition is a proposal; Peter's ruling, or the named seat's own call where the row says so, makes it one.

---

## The queue at a glance

| RS | What it asks | Law text touched | Proposed disposition | Vehicle |
|----|--------------|------------------|----------------------|---------|
| RS-37 | a pre-phase-1 owed item so the delegate-audit file cannot be missed | RELEASE-FLOW § "Deriving the delta" 3a (the walk); signing-act ballot § 5.3 | LAW via ballot | RELEASE-FLOW batch ballot |
| RS-42 | check the index's platform names against generated output | none (Ada's record, plan items 2 and 3) | already done by pointer (index half); declined with reason (item 3), provisional | pointer + a line on Ada's record |
| RS-43 | must a CORRECTION's observation record land before, or travel in, the PR | README rule 10; ballots README § "three kinds" (CONTENT CORRECTION row); Task-Completion-Protocol § "Edit kind" | LAW via ballot | one rule-10 sentence, riding the batch ballot |
| RS-44 | the guard checks what web examples do, not only what they name | ballot `2026-10-26-governance-examples-guard` § 2, § 8.4; register row `governance-examples` | LAW via ballot (amendment) + build | the later guard-amendment ballot, with RS-47 |
| RS-45 | read the whole file once one falsity is found | `canonical/agents/stacy.md` § "Operational Mode: Claims Audit" (practice only today) | `none` for my authorship; Stacy's method | her record's Method sections |
| RS-46 | sort the 3a greps | RELEASE-FLOW 3a's two commands; Stacy's method | split: method note (Stacy's) + LAW edit to 3a (mine) | method note; batch ballot |
| RS-47 | a claims-pass record can home a rule for one release only | ballots README (no home for a release-scoped rule); the post-walk rule's clauses 1 and 6 | LAW via ballot (Peter's call on standing) | the later guard-amendment ballot, with RS-44 |
| RS-48 | npm's `+ <pkg>@<v>` line is not evidence; step 6's 404 sentence has a second reading | RELEASE-FLOW step 6 (L150), and 5.3/5.4 if the `+`-line point is taken | LAW via ballot | RELEASE-FLOW batch ballot |
| RS-49 | 5.4's "never a tarball the script did not produce" binds who produced it, not which version | RELEASE-FLOW step 5.4 (L136) | LAW via ballot, with Ada consulted | RELEASE-FLOW batch ballot |

Two vehicles carry everything that is law: **the RELEASE-FLOW batch ballot** (RS-37, RS-46's 3a half, RS-48, RS-49, and RS-43's sentence) and **the later guard-amendment ballot** (RS-44, RS-47). Both are due before the next release's walk. Neither is drafted here.

---

## RS-37 — the delegate-audit file has no owed item before phase 1

- **Source**: claims-pass § "Standards implications" L637 @ `55c218cfd` (finding RL-25); L2155 @ `b1a07fb7b` ("answered for its record half", #507).
- **Law touched**: RELEASE-FLOW § "Deriving the delta" item 3a (the walk record's rows and its two commands); `grep -n -i delegate .kiro/hooks/RELEASE-FLOW.md` finds nothing at `6615a6774`, so the file has no mention in the flow at all. Behind it: signing-act ballot `2026-10-01-signing-act-chain` § 5.3 (who briefs, who dispatches) and § 8 trigger (d).
- **Disposition (proposed)**: **LAW edit via ballot.** The record half is done: `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` carries the instance and its trigger. What remains is the class fix, a pre-phase-1 item in the walk so the first walk under § 5.3 cannot be missed again.
- **Vehicle**: the RELEASE-FLOW batch ballot.
- **Consult**: Stacy (her delegate-audit pointer, `canonical/agents/stacy.md` § "The claims-pass record"); Ada (the first delegate).

## RS-42 — the index's platform names are not checked against generated output

- **Source**: claims-pass addendum 2 § "Standards implications" L1284 @ `55c218cfd`; L1558 (plan item 3 "still Thurgood's to take"). Ada's record: `.kiro/issues/2026-10-26-token-index-platform-names-not-emitted.md`, plan items 2 and 3.
- **Law touched**: none. Both halves are plan items on Ada's record.
- **Index half — already done by pointer.** Ada's plan item 2 is a Jest test asserting every platform name in the index is defined in the generated output. The orchestrator reports it done in #517. **Unverified by me**: #517 is not on `origin/main` at `6615a6774` (fetched at filing) and `gh` is unauthenticated in this session. Close this half by pointer when #517's merge SHA is read.
- **Plan item 3 (a served-docs name scan against generated output, a CI lane entry) — proposed: declined with reason, provisional.** The ratified guard's name set is read from the committed `token-index/` only, and its R-4 refuses any other source (ballot `2026-10-26-governance-examples-guard` L47 and L410). With item 2's test, the index equals the output, so a name the guard resolves against the index is resolved against the output transitively. A second scan would duplicate the guard and add a CI lane entry for it. **Surviving counter**: transitivity covers names the index carries in the form a doc writes; a doc form the guard's predicate accepts but the index does not literally carry (a namespace or glob form) is not checked against output by any instrument. I have not read the guard's v1 predicate forms against item 3 to rule that out. **To do before I close it**: read them, then append the confirm-or-decline line to Ada's record (rule 9: any seat may append a dated line).
- **Vehicle**: a pointer line on this record, and the dated line on Ada's.

## RS-43 — an observation record that does not resolve at its CORRECTION's merge

- **Source**: addendum 2 § "Standards implications" L1287 @ `55c218cfd` (RL-30, finding at L1264); evidenced at L1559 (#504, the third) and L1770 (#505, the fourth). The orchestrator counts four instances: #500, #502, #504, #505 (the pattern is "an observation filed on a long-lived upkeep branch, then cited by a CORRECTION that merges first").
- **Law touched**: README rule 10 (the filing rule: "in the same PR that records the ruling or the pass"); ballots README § "When a governance edit needs a ballot — three kinds", the CONTENT CORRECTION row (L47: "the observation (record cited)"); Task-Completion-Protocol § "Edit kind" (`CORRECTION (<observation record>; truth: <referent>)`); Stacy's governance-edit-kind read, which reads the line and the record.
- **Disposition (proposed)**: **LAW edit via ballot.** The rule's text says "record cited" and nowhere says where the record must be, so today a CORRECTION can cite a record on an unmerged branch. A sentence would add a requirement on what a CORRECTION PR must carry, which is LAW, not CORRECTION or EXECUTION of any clause.
- **The question asked (before or travel in?)**: my proposal is **either, provided the record resolves at the merge commit** (it is in the CORRECTION PR's own diff, or an ancestor of the merge). **Surviving counter**: "travel in" puts the observation and the fix in one diff, the circularity the CORRECTION test already excludes for governance text and enforcement code as a referent; the record is the observation, not the referent, so I read the exclusion as not reaching it, but a reader could disagree. "Land first" is cleaner for the claims-pass read and is exactly what long-lived upkeep branches defeat. If Peter wants one, it is a fork he picks; I do not.
- **Vehicle**: one sentence in README rule 10, as the orchestrator proposed. Note that it is a ballot-cited edit (rule 11's own sentences carry their ballot), so it needs a ballot: I propose it rides the RELEASE-FLOW batch as a second surface. **Fork**: a separate small ballot instead, since the batch's subject is the release flow. I lean to one ballot with two named surfaces; the pick is Peter's.
- **Consult**: Stacy (her edit-kind read), Lina (the upkeep-branch practice is hers).

## RS-44 — check what web examples do, not only what they name

- **Source**: addendum 3 § "Standards implications" L1553 @ `55c218cfd` (RL-31); evidenced again at L1599, L1767 ("a candidate for the guard's next half"; owner "Thurgood (the instrument), with Lina (scope)") and answered for the next release by clause 6 at L1962. The rule's text: § "The rule (the consolidated text, verbatim)" L1837 onward; clause 6 is L1863.
- **Law touched**: ballot `.kiro/docs/ballots/2026-10-26-governance-examples-guard.md` (RATIFIED 2026-10-26; § 2 the predicates, § 8.4 the resolved rule texts, register row `governance-examples`, `owner: thurgood`). The amendment adds a predicate, so it is LAW. The clause-6 text it answers: "a behavior and attribute check, as a version bump of the governance-examples guard. It is Thurgood's instrument, and Lina writes the predicate."
- **Halves**: (1) **the predicate**: Lina's, filed: `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md` (P2 `(guard)`, `release:next:phase-1`; her plan item 1 is the predicate text for my amendment, due before the next walk). (2) **My half, unfiled until this row**: the ballot amendment, the guard's version bump and its build. Her record names them as mine ("this record does not file them for him"); this row files them.
- **Sequence and dependencies**: clause 6 says "after v1 is built". v1's build PR has not merged (`2026-10-26-governance-examples-guard-build-grant.md` is open, `merge:#<N>` not yet set). The grant covers `scripts/governance-examples/**` and **expires at v1's build PR's merge**, so the version bump's build needs its own scope (a second grant record, or a fresh grant line in the amendment's record; rule 8, Peter's direction or a merged record first, never authored only inside the diff it bounds). That grant is owed here too.
- **Disposition (proposed)**: **LAW via ballot (amendment) and a build.** The scratch script Stacy describes at L1767 (custom-element attributes in served docs against the element's observed and read attributes, plus values against exported unions) is the cheap half and has no fence-intent problem, because it reads only tags the package defines. That is Lina's to scope.
- **Vehicle**: the later guard-amendment ballot, with RS-47. **Guard-class**: this is the row that makes the record `(guard)`.
- **Consult**: Lina (the predicate, scope); Ada (v1's name-set predicate shares the guard's frame); Stacy (the instrument's future reader).

## RS-45 — read the whole file once a falsity is found

- **Source**: addendum 3 § "Standards implications" L1557 @ `55c218cfd` (O-40, finding at L1548); evidenced against Stacy twice, L1768.
- **Law touched**: none today. The nearest home is `canonical/agents/stacy.md` § "Operational Mode: Claims Audit" (§ "The claims-pass record" item 3, Method). **There is no standalone claims-pass method doc**: the method lives in each record's own Method section and in her charter. The orchestrator's "the claims-pass method doc, Stacy's" has no file behind it at `6615a6774`; correct me if one is meant.
- **Disposition (proposed)**: **`none` for my authorship; the method is Stacy's.** The Q5 boundary decides it: "what is a completion doc required to contain" is mine, "how a claims pass reads" is hers, and RS-45 is the second. She may hold it as practice in her Method sections; if she wants it as charter text, that edit to `canonical/agents/stacy.md` is LAW (a new duty), Peter-merged, with Thurgood consulted and regeneration. I record no adoption on my side and no decline of her rule: it is hers to keep.
- **Vehicle**: her Method sections (no edit needed from me). If a charter edit is wanted later: a ballot, not this record.
- **Consult**: Stacy.

## RS-46 — sort the 3a greps

- **Source**: addendum 4 § "Standards implications" L1769 @ `55c218cfd`.
- **Law touched**: (a) Stacy's method (comparing grep output across commits); (b) RELEASE-FLOW § 3a's two fenced commands (the `grep -nE ... .kiro/issues/*.md` pair), which Stacy asks me to consider piping through `sort` "so the walk record's paste is reproducible byte for byte".
- **Premise checked at filing, not taken**: I ran the 3a Class grep six times in this session's shell over `.kiro/issues/*.md` and got six different hashes; the Trigger grep three times, three different hashes. `grep` here is a shell function from the session's snapshot (a wrapper), and `/usr/bin/grep` is BSD grep. Not run: whether Peter's terminal or a consumer shell shows it. The failure is the environment's, not the command's.
- **Disposition (proposed)**: **split.** (a) A method note, **Stacy's** (sort, or call the system grep, when comparing across commits). No law from me. (b) The 3a commands: **LAW edit via ballot** (adding `| sort` changes what the walk record's pasted output must equal); I propose it, with the counter that it encodes an environment bug into law: a `| sort` is harmless on any grep, and the walk's commands are the walk's evidence. This half is an addition to the orchestrator's list; the pick whether it goes into the batch is Peter's.
- **Vehicle**: (a) her record; (b) the RELEASE-FLOW batch ballot.
- **Consult**: Stacy.

## RS-47 — a claims-pass record can home a rule for one release only

- **Source**: addendum 5 § "Standards implications" L1961 @ `55c218cfd`.
- **Law touched**: `.kiro/docs/ballots/README.md` (the ballot protocol has no home for a release-scoped rule ordered in chat and approved by seats); the post-walk rule itself, clause 1 ("making it standing for later releases needs a ballot") and clause 6 (L1863 @ `55c218cfd`: "if it is not built by then, the standing question returns to Peter at that walk").
- **Fact for the reader**: the rule expires at the v16.1.0 tag (clause 1). #510 records 16.1.0 published, so the rule's text has already stopped governing and its addendum is history, as Stacy says. What survives is the question RS-47 asks: is the rule to be standing, and where does a release-scoped rule live while it governs?
- **Disposition (proposed)**: **LAW via ballot, and the pick is Peter's.** A fork, not mine: (i) a **standing rule** needs a ballot as its home (clause 1 already says so) and the guard amendment ballot is the natural place, because RS-44's check is what makes the rule's waiver unnecessary; (ii) **no standing rule and no protocol change**: a release-scoped rule stays a claims-pass-record rule by its own Authority line and dies at the tag. My lean is (ii) for the protocol (do not bless release-scoped law ordered in chat by amending the ballot protocol) and a Peter ruling on the rule itself at the same sitting. **Surviving counter to that lean**: (ii) leaves the next release's author to reinvent the mechanism the way 16.1.0 did, under the same time pressure, with the same authority gap.
- **Vehicle**: the later guard-amendment ballot, with RS-44.
- **Consult**: **Stacy's reading is pending** (the orchestrator names it hers); Peter.

## RS-48 — npm's `+ <pkg>@<v>` line is not evidence; step 6's 404 sentence has a second reading

- **Source**: phase 2 § "Phase 2 standards implications" L2153 @ `b1a07fb7b` (O-45 at L2119; RL-36).
- **Law touched**: RELEASE-FLOW step 6 L150: "If the packument ... has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag (15.0.0's R-4)." Second reading, measured twice (16.0.0, 16.1.0): under npm's "is being processed" notice, an absent `time["<v>"]` can mean accepted and still processing. Related: whether the step should say npm's `+ <pkg>@<v>` line is not evidence of acceptance. Behind it: ballot `2026-10-03-hermetic-publish-path` § 3.4 (a RELEASE record is complete only with both phases), which ratified the step's rail.
- **Disposition (proposed)**: **LAW edit via ballot.** The rail's answer was right both times; the stated cause is what has two readings. Stacy names it and does not draft it; it is mine to draft, not here.
- **Vehicle**: the RELEASE-FLOW batch ballot.
- **Consult**: Stacy (the step-6 record).

## RS-49 — 5.4 binds the tarball's producer, not its version

- **Source**: phase 2 § "Phase 2 standards implications" L2154 @ `b1a07fb7b` (RL-36; the out-of-flow 16.0.0 republish at L2051 to L2052).
- **Law touched**: RELEASE-FLOW step 5.4 (L136): "**Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.**" The 16.0.0 republish met its letter, since the script produced that tarball for 16.0.0. Registry immutability made it harmless; a different version under `--tag latest` would not be. The script half sits in Ada's scope under § 2.6 of the six-roots ballot (`scripts/release-publish.ts`).
- **Disposition (proposed)**: **LAW edit via ballot, Ada consulted.** **Fork surfaced, not picked**: (i) text only: bind 5.4 to the version being released; (ii) the script hands over the exact 5.4 command with the version in it, with the text naming that command as the guard (RS-7: "guards live in the command the operator runs", and 5.4's is typed by hand). **Surviving counter to (ii)**: the tarball's name already carries its version, so a handed-over command adds a script change for a harm that is nil today; **counter to (i)**: a sentence an operator must remember in a terminal is the weakest guard in the flow.
- **Vehicle**: the RELEASE-FLOW batch ballot; the script half, if (ii), is Ada's change in her scope.
- **Consult**: Ada (required: § 2.6); Stacy.

---

## Adjacent, not dispositioned here (named so they are not read as covered)

- **RS-33, RS-34, RS-35, RS-36, RS-38, RS-39, RS-40, RS-41** (the same pass's first-round and addendum items): the orchestrator's routing did not list them. A search of `.kiro/issues/` and `.kiro/docs/` at `6615a6774` finds no record or ballot citing any of them (only RS-37 and RL-30's archived record match). Whether they are filed elsewhere under another name I have not checked beyond that search. Rule 10 says an obligation arising from a pass files in the pass's PR; they are Thurgood's per the pass (RS-33 to RS-36, RS-38, RS-39, RS-41 name him as owner; RS-40 left the standard "unwritten"). **I am not filing or dispositioning them in this record**; the orchestrator or Peter says whether to add them.
- **The composed-loop outcome line for this pass** is owed under `.kiro/issues/2026-10-24-composed-loop-outcome-lines-missing.md` ("The next RELEASE claims pass owes its own line at its merge as well"); Stacy's phase-2 record names it owed (L2114). It is a different duty from this queue and I have not written it here. The dispositions above are not the outcome line.
- **Anti-rot**: nothing in this record re-decides what Stacy concluded; each row reads her item, names the law it touches, and proposes what to do with the standard.

## Surviving counter-argument

*Run before filing; what it changed*: it split the single "disposition" into law vs method (RS-45, RS-46a stay Stacy's), declined to pre-draft any text, and made the RS-42 decline provisional with the unread predicate forms named.

*What survives*: (1) **One record for nine rows, classed by its strictest row**, means a lapse sends record-class items to Peter as a `(guard)` batch; the alternative (two records: the guard row and the rest) escalates correctly but splits the queue the orchestrator asked to keep whole. (2) **Two ballots in one cycle for a release-flow list of text edits** is the bulk the loop exists to avoid; most rows are small, and the benefit of a batch is Peter reads one diff, the cost is one ballot's surviving objection holds all of it. (3) **Several of these rows are `LAW via ballot` by my reading** and some (RS-46's `| sort`, RS-48's clarification) might be read as CORRECTION if the old text is false (RS-48's step-6 sentence is partly false for the measured cases, with a referent: the two measured runs). I have proposed ballots because the CORRECTION test needs the referent to hold before the PR and I cannot settle that for each row alone; the claims-pass read is the detector if I am wrong in either direction.

## Close

When each row has a merged vehicle, or a dated line here recording `declined-with-reason` or `none`, add rule 5's outcome line naming the PRs and archive. Rows move independently: a row's line is appended by its owner (rule 9).
