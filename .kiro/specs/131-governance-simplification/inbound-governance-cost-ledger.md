# Inbound to Spec 131: the governance-cost ledger

**Date opened**: 2026-11-05
**Holder**: Thurgood (Spec 131's formalizer), at Peter's direction.
**Status**: a running ledger, append-only. It is a **consideration, not direction** (Peter's rule for inbounds, below). It rules nothing, and no entry is a finding on any seat.
**Consulted**: none needed. An inbound records measurements and rules none; the entries name the rules that caused the costs, and the owners of those rules are not asked to defend them here.

---

## 1. What this is, and the words that shaped it

One running inbound to Spec 131, not a file per instance. It exists so that when 131's requirements round asks which governance rules cost more than they protect, the answer starts from dated, measured instances instead of recollection.

**Peter's words (verbatim; relay by the orchestrator):**
- **Standing rule for inbounds**, 2026-11-04T13:23:25Z, as recorded in `.kiro/docs/ballots/2026-11-04-waiting-spec-row.md` L223: "4. We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."
- **The orchestrator's proposal**, as Peter read it (received before 2026-11-05T13:43:14Z; the exact time is not recorded in any file I can read, so it is **unverified here**): "I think if you find instances worth further investigation for 131 you capture them as inbounds. Honest thoughts?"
- **His answer**, received 2026-11-05T13:43:14Z (`date -u` at receipt, orchestrator relay): "(a), and start the 131 ledger". The first part answers a different question (the Core Goals ballot, entry L-1); the second starts this file.

**What the ledger takes in, and what it refuses:**
- **Admitted**: an instance with a **measurable cost** (acts, parties, PRs, sessions or words) and a **nameable cause** (the rule that produced it).
- **Refused**: opinion, anecdote without a number, and any instance whose cost cannot be stated. An entry whose cause is not a rule is a control entry (L-5 is one, on the orchestrator's instruction): it is kept so that a cost with no rule behind it is not later read as one.
- **Both sides are measured.** Every entry says whether the rule protected anything real, with evidence. A rule that cost a lot and protected something real is a finding in the rule's favour, and the ledger records it as such.

## 2. Entry format and who appends

Each entry is dated and carries these six fields:
1. **Date** (the day it happened).
2. **What happened**, in plain words.
3. **Measured cost**: acts, parties, PRs, sessions or words, each number labelled **VERIFIED** (I counted it from git, a PR or a file, command or path given), **PROJECTED** (a plan's count, not yet done) or **UNVERIFIED** (stated by someone and not checkable by me).
4. **The rule that caused it**, by path and section.
5. **Did it protect anything real?** An answer, and the evidence for it; where there is none, the entry says "none found" and what I looked at.
6. **Pointers.**

**Who appends**: Thurgood, from instances the orchestrator or any seat sends with facts. The sender supplies the facts; the entry's numbers are re-counted before they are written, and anything not countable is labelled. A later correction is a new dated line under the entry, never a rewrite.

**What 131 does with it**: 131's next round (the requirements round, or the design round if it comes first) writes **one disposition line for the ledger as a whole** in its feedback document: taken into the requirements, taken into a named design decision, or parked with a trigger. It is one line, not one per entry.

---

## 3. Entries

### L-1. One ruled fact, "Android API 26", became a ballot and a seven-party path (2026-11-05)

- **What happened.** Peter ruled the Android minimum at 05:54:32Z ("Re: 5, 26"). The line it changes is `Android: Not yet constrained` in `.kiro/steering/core-goals.md`, one line of identity law. It could not simply be edited: the edit is LAW, and the paragraph is a signed unit (`canonical/operative-sets/core-goals.yaml`, confirmer Stacy). Peter chose the one-item ballot at 13:43:14Z ("(a)"). The ballot was drafted as PR #673 (opened 13:51:07Z, draft).
- **Measured cost.**
  - **VERIFIED**: the draft ballot is 4,218 words (`wc -w`, `.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` at `022e06f5a`) for a one-line change. It names six sites (a law line, a charter line, and four profile and overlay records) plus the generated copies.
  - **VERIFIED**: elapsed time from the ruling to an open draft: 05:54:32Z to 13:51:07Z, 7 h 56 min. Most of it is waiting on the question of how to authorize the edit (the ruling arrived at 05:54; the "(a)" at 13:43); I do not count it as work.
  - **PROJECTED** (the ballot's § 8 and § 10, none done yet): twelve acts by four parties: the draft, two reviews (Stacy, Data), Peter's ratification, the Status commit, the authoring commit, the profile-author commit, the regeneration, Stacy's confirm-and-sign, Data's confirm-and-sign, the lock refresh and Peter's merge. Two generator runs. Stacy's own count for the application PR was "about seven acts by four parties" (Thurgood twice, Data, Stacy, Peter, plus a regeneration; `[STACY R1]` § 3); the difference is that my twelve include the ballot's draft and review steps, hers only the application PR's.
  - **VERIFIED**: this unit's recent history. Core Goals changed in 3 PRs between 2026-10-25 and 2026-10-28: #472 (2026-10-25 08:48 -04:00), #491 (2026-10-25 20:39 -04:00), #535 (2026-10-28 22:20 -04:00) (`git log -- .kiro/steering/core-goals.md`). Stacy's record calls the 2026-10-27 act "my third re-confirmation of this unit in three days" (`canonical/profiles/consumer/confirmations/core-goals.md`). The Android line would be the fourth application in 11 days.
- **The rule that caused it.** Two rules compound: `.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds" ("When in doubt, LAW"; a correction needs a referent that held before the PR), and the signed-unit chain (Spec 123 C1/C16 and the signing-act ballot): every byte change to a unit forces the profile author's re-quote, the overlay re-pin, the confirmer's re-confirmation and the signer's re-signature, in order, as separate commits.
- **Did it protect anything real?** Partly, and I judge it honestly as **not shown to protect anything on this particular edit**.
  - *For*: the chain does guard steering drift mechanically. An authoring commit that moves a `canonicalHash` fails the signing chain (links 2 and 3, as the ballot's § 8 step 4 states). On this very unit Stacy's 2026-09-29 confirmation **corrected the item set from 6 to 8**, adding `platform-android` and `platform-web` that the profile author's draft had omitted (`confirmations/core-goals.md` L44): a real defect the confirm act caught. And Stacy's reading of the design surfaced two real wording questions (which Compose pin the floor means; the item's kind changing from member to obligation).
  - *Against*: the edit is one numeric fact that the human lead ruled in plain words, with the ruling recorded verbatim and Data's design inbound quoting it. Both wording questions were found by Stacy reading the design and not by any gate; I looked for an instance where the chain, as opposed to a person, caught a wrong Core Goals line and found none in the confirmation record (this is not an exhaustive search; **UNVERIFIED** beyond that file).
  - **The ratio is the finding.** The cost buys a guarantee that no unit changes unrecorded. Whether that guarantee needs twelve acts when the ruling is one number is the question; a lighter path for a fact Peter has already ruled word for word (a pre-declared execution of his ruling) was available in principle and Peter chose the ballot: the README's own test sent it to LAW.
- **Pointers.** PR #673; ballot `.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md` (§ 10 "What survives" carries the ratio); `.kiro/specs/129-consumer-generation-completeness/design.md` § 15 (PR #672); `[STACY R1]` § 3.

### L-2. Merging 129's `requirements.md` fired 17 records, and two PRs had to merge first (2026-11-05)

- **What happened.** Spec 129's `requirements.md` (PR #658) was written to merge on 2026-11-05. Seventeen open records name that file as their Trigger. Unless each owner's re-rule was already an ancestor of the merge, the 17 would lapse at the merge (`.kiro/issues/README.md` rule 11). The owners wrote two record-only PRs, and #658 waited for them.
- **Measured cost (VERIFIED, from the PRs).**
  - **2 extra PRs**: #661 (Ada: 13 re-rules, one charter edit, one blend-record note; **15 files**) and #662 (Lina: 3 re-rules, 1 close, plus corrected targets on 2 more records and an item-2 outcome line; **7 files**). That is 22 files across two parties for a spec PR that changed 4 files (#658: `changedFiles` 4).
  - **17 owner acts**: 13 (#661) + 4 (#662: records #14, #15, #17 re-ruled, #16 closed). The 13 + 4 = 17 is the count #661 and #662 state; I counted both bodies' tables.
  - **Ordering**: five merge preconditions in a fixed order (feedback/requirements.md § `[THURGOOD R2]`): #659, #660, #661, #662, and Peter's answer on D1. #661 merged at 05:20:08Z and #662 at 05:22:09Z; #658 merged at 05:34:06Z. It had been open since 04:51:23Z (42 min 43 s); I do not attribute the whole interval to the preconditions.
  - **Double handling (VERIFIED in #661's body)**: the re-rules point each record's Trigger at `completion/claims-pass.md`, and "under E2, each intake record is re-ruled again to its parent's completion doc once `tasks.md` numbers the parents". So at least 12 of #661's 13 acts will be repeated once. Whether Lina's three re-rules are likewise repeated is not stated in #662 (**UNVERIFIED**).
- **The rule that caused it.** Trigger grammar `path:` on a spec's `requirements.md` (`.kiro/issues/README.md` rule 1) plus rule 11 (a fired trigger with no ancestor re-rule lapses), applied by Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" (E2).
- **Did it protect anything real?** Yes in part, with evidence. The re-rules were not all rubber stamps: #662 **closed** record #16 (its premise was corrected, option (a) landed by Req 14.1, (c) went to Spec 132) and **corrected two planned targets** (`2026-09-26-native-component-theme-hardcoding.md`, `2026-10-18-drawn-control-drift-ios-android-web.md`), and #661 recorded that the OKLCH record's Class stays P3 with a reason. A lapse would have fired 17 obligations that the requirements had already placed. *Against*: the 15 repointed Triggers are, by #661's own text, re-ruled a second time at tasks, which makes the first pass a holding action.
- **Pointers.** #658, #661, #662; `.kiro/specs/129-consumer-generation-completeness/feedback/requirements.md` § `[THURGOOD R2]` (merge preconditions); `.kiro/issues/README.md` rules 1 and 11.

### L-3. Requirements grew 36% in review, mostly by closing real verifiability gaps (2026-11-05)

- **What happened.** Spec 129's `requirements.md` went through R1 (seven review entries: Stacy, Ada, Lina, Kenya, Data, Leonardo, Sparky) and an R2 fold.
- **Measured cost (VERIFIED, `wc -w` at the commits and the feedback record's own tally).**
  - `requirements.md`: **6,690 words at R1** (`a28ca761a`) → **9,108 at R2** (`66f588726`): **+2,418 words, +36.1%**. It was 9,182 at the merge (#658, `55004006b`) after Peter's D1 line. Numbered criteria 91 → 96 live (103 numbered, 7 of them removal markers).
  - **128 review items; 109 incorporated** (one narrowed), 6 no change, 13 carried (109 + 6 + 13 = 128; the tally is in `feedback/requirements.md` § `[THURGOOD R2]`).
  - The review entries themselves: seven R1 entries (Stacy, Ada, Lina, Kenya, Data, Leonardo, Sparky) plus the author's R1/R2/R3 and Peter's one line. I did not count their words.
- **The rule that caused it.** `.kiro/steering/Spec-Feedback-Protocol.md` (the sequential formalization gate and parallel review rounds), with Stacy's required-reviewer duty and the spec's own "every criterion verifiable without consulting the author" bar.
- **Did it protect anything real?** **Mostly yes, and this is the fairest entry to read before judging the others.** The R2 note's own account (the author is me; weigh accordingly): most additions "close a way an instrument could go green while the thing it checks is broken": Stacy found three such checks and four weakening routes, Kenya an unenforced pin worth 125 differing entries. The same class of gap was found again one round later in the design: Stacy's design review found that the comparator never read the build's exit status, so an empty list plus a pre-compile failure would read green (`[STACY R1]` § 2 item 1). *Honest limits*: the same note records that several additions "read as design detail" (the Kotlin multi-line rule, compile flags, the colour tolerance), and that "the file is now large enough that a reader needs the R2 notes to see why each line is there". The growth and the value are both real; the ledger cannot say how much of the 2,418 words was the other kind.
- **Pointers.** `.kiro/specs/129-consumer-generation-completeness/feedback/requirements.md` § `[THURGOOD R2]` ("Tally", "Thinning bar", "Counter-argument, worked against this fold").

### L-4. Parallel blind reviews crossed positions, and a cross-read round was needed (2026-11-05)

- **What happened.** Design R1 for Spec 129 ran as seven parallel reviews. On three open items the owners had each moved to a position the other held, so no pair agreed on the same side.
- **Measured cost (VERIFIED from `feedback/design.md` on `task/129-design` at `c8c2e4fd5`, PR #672 open; and `wc -w`).**
  - **O-1** (the iOS theme type): Ada R1 accepted Lina's protocol; Lina R1 accepted Kenya's struct lean; Kenya R1 accepted Lina's protocol. Three seats, three accepts of someone else's position.
  - **O-6** (the Android `CompositionLocal`): stated in the record itself, "In R1 each took the other's position. In R2, Ada yielded the call to Data, and Data restated his original" (`[THURGOOD R2]`, `[LINA R2]`).
  - **O-8** (the Android type table): Ada R1 took all four of Data's rows, and in R2 proposed "a combination neither of us has proposed"; the call's owner moved from Ada to Data. This is a crossing of ownership, not a clean swap of sides; I label it that way rather than overstate it.
  - **The cost of the round that resolved them: four more agent runs** (`[ADA R2]`, `[LINA R2]`, `[KENYA R2]`, `[DATA R2]`, "cross-read"), **3,663 words** in the record, against **14,615 words** in the seven R1 entries. `design.md` went from 6,890 words (R1) to 9,718 (R2, `c8c2e4fd5`, **unmerged**).
- **The rule that caused it.** The review protocol's parallel blind rounds (Spec-Feedback-Protocol § "Feedback Checkpoints"), plus the assignment of an item to two owners ("Ada decides, Data consulted") so that both reviewed it rather than one.
- **Did it protect anything real?** **Yes, and this is a deliberation cost, not paperwork** (my own point at ORDER R1). Without the cross-read, three design items would have closed on positions no pair held. The author's rule in `[THURGOOD R2]` ("where an item is a named owner's call, that owner's latest position is the decision, and other seats' accepts and residuals are recorded beside it; this was not a vote") is what made the round close. *Counter-evidence*: whether a single sequential round with the owner of each item reading the others' text before writing would have cost fewer runs is **untested**.
- **Pointers.** PR #672; `.kiro/specs/129-consumer-generation-completeness/feedback/design.md` §§ `[ADA R1]` … `[DATA R2]`, `[THURGOOD R2]` (O-1, O-6, O-8).

### L-5. The orchestrator contradicted itself on who decides web harvest; Lina's inbound was revised (2026-11-05) — a control entry

- **What happened.** Per the orchestrator's report: it told Peter that the web-harvest question would reach him only if it broke a web adopter, then listed it among his deferred design decisions. Lina's design inbound (#665) followed the listing: its first commit headed § 5 "Whether item (ii) harvests into the adopter's web output: **Peter's**" and said "One item is Peter's". 94 seconds later a second commit reclassified it as the team's decision under the rule "it comes to you only if it would break a web adopter".
- **Measured cost.**
  - **VERIFIED** (git): one extra commit on #665, `5edbf9722`, committed 94 seconds after the first (`a095ace2b`, 05:44:04Z → 05:45:38Z); 9 insertions and 7 deletions in one file.
  - **UNVERIFIED**: the orchestrator's two statements to Peter (chat, not in any file I can read), and the claim that an `**Open for Peter**:` line carried it (the merged body of #665 has none; the body may have been edited). #665 was open 7 h 31 min (05:44:04Z to 13:15:20Z); I do not attribute that to the revision.
- **The rule that caused it.** None. This was an orchestration error: a routing statement that two of the orchestrator's own messages made inconsistent. **No rule would have caught it**; the rule that applies after the fact (`Task-Completion-Protocol` § "Branch and PR Conventions", the `**Open for Peter**:` line holds the merge) was working as designed, and a question wrongly on that line would have held #665.
- **Did it protect anything real?** Not applicable: there is no rule to credit. This entry sits outside the ledger's admission test (no nameable rule) and is kept at the orchestrator's instruction as a **control**: a small cost with a non-rule cause, so that the ledger does not read every cost in this table as a rule's.
- **Pointers.** #665 (commits `a095ace2b`, `5edbf9722`); `.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-design-2026-11-05.md` § 5.

### L-6. The Q5 round and the native plan: deliberation that bought the first measurements (2026-11-04/05)

- **What happened.** Peter's Q5 question for Spec 129 (what "target" means for native compile verification) went to a seven-seat recommendation round with a cross-read, then to a native-platform plan round and an order consult. Peter answered three questions within 2 min 41 s on 2026-11-05 (04:05:02Z, 04:06:22Z, 04:07:43Z), per `evidence/2026-11-05-native-plan/README.md`.
- **Measured cost (VERIFIED, `wc -w` and entry counts).**
  - **14 seat entries** in `feedback/design-outline.md` § "Q5 recommendation round": seven recommendation entries (Kenya R2, Data R2, Lina R2, Ada R2, Stacy R2, Thurgood R3, Leonardo R2) and seven cross-reads (Kenya R3, Data R3, Lina R3, Ada R3, Stacy R3, Thurgood R4, Leonardo R3): **31,135 words** from the first Q5 entry to the end of the file (1,772 lines).
  - **The plan**: draft R1 5,703 words → `plan-r2.md` **8,984 words**; six seat reviews of R1 (Ada, Data, Kenya, Leonardo, Lina, Stacy) **18,195 words**; five seat answers at R2 **7,158 words**; the order consult (three seats' ORDER R1) **8,202 words**. The folder is 50,589 words in all.
- **The rule that caused it.** Not one rule: the recommendation-round-plus-cross-read pattern (Spec-Feedback-Protocol), the consult-first duty (Agent-Directory § "Primary Agent (Orchestrator)": consult before recommending, present a class option) and the "present the fork, never pick" requirement of the counter-argument rule (AI-Collaboration-Principles).
- **What it bought (the point of this entry).**
  - **Peter's decisions**: the two-spec plan (129 and a new Spec 132 under one goal) approved as a whole ("A yes"), 129's acceptance sentence narrowed (B (a)), checks D1 to D3 fixed as 129's part of "done" (C), and the order (x′).
  - **First-ever measurements** (recorded in the round): Data's Android token-tier compile reported 302 errors on the JVM lane and 300 in a library module, on the same files ("the same token-tier verdict", `feedback/design-outline.md` L501, L1196); Kenya measured 2 to 3 minutes per iOS run and about 25 seconds for plain `swiftc` over the components (L992, L1578). Six of seven seats had converged on B's reach *with no test runs* (`design-outline.md` L173); the measurements arrived in the round and settled which lane could go.
- **Did it protect anything real?** The deliberation is the product here, not a gate. What I can show is what it produced (above). What I cannot show is that a smaller round would not have reached the same plan: six of seven converged before the cross-read, so the cross-read's marginal value is **untested**. The cost is recorded for 131's measure, not as a verdict.
- **Pointers.** `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "Q5 recommendation round (2026-11-04/05)"; `evidence/2026-11-05-native-plan/` (`README.md`, `plan-r2.md`, `peter-2026-11-05.md`); Spec 129 `design-outline.md` § Q5.

---

## 4. Reading across the six

*(Not a finding; here so the next reader does not have to re-add.)*
- **Three of six (L-1, L-2, L-4)** are cost on a rule that did protect something in the same instance, in each case with a recorded catch. **One (L-3)** is mostly protective. **One (L-6)** is deliberation that produced measurements. **One (L-5)** has no rule behind it.
- **The unit where a rule's cost ratio is least defended by its own evidence is L-1** (one ruled number, twelve projected acts, no instance found of the chain catching a wrong Core Goals line). It is also the one instance in the table that is still in flight; its numbers are PROJECTED until the application PR merges, and the entry gets a dated line then.
- **Surviving counter-argument against the ledger itself.** A ledger of costs selects for costs: instances where a rule quietly prevented a bad outcome leave no cost to log, so the table over-represents expense. Entries record the protection side to offset it, but a rule's *prevented* failures are mostly invisible by construction. 131 should not read a six-row table as a sample.

## 5. Append here

*(Dated entries, L-7 onward. Each follows § 2's six fields. A correction to an earlier entry is a dated line under that entry.)*
