# Spec Feedback: 127 — Completion-Claims Integrity — Design Outline

**Spec**: 127-completion-claims-integrity
**Artifact under review**: `design-outline.md` (Status: DRAFT, awaiting Peter's outline review)
**Created**: 2026-09-13
**Spec author**: Thurgood

---

## Context for Reviewers

**What this is.** The disposition of F7 — the only undisposed item from the Spec 112 completion-claims audit. Peter ruled the full package on 2026-09-13; this outline executes that ruling and frames what remains open.

**Settled — do NOT re-litigate** (each cited to its source; raise execution *consequences* freely, but the decisions themselves are closed):
- Full package (prose + mechanical arm together), not the light alternative → design-outline.md § "3.1 Full package, not the light alternative"; Peter's ruling, 2026-09-13
- The package = the modified three-part form (exact-set three-column table; forced-negative line; staged mechanization) → § "3.2"; `pre-spec/stacy-consult-2026-09-13.md` § "Verdict detail — the modified package"
- Scoping riders: per-parent-criteria specs bind; spec-level-criteria specs discharge at closeout; product parents carry per-platform status; **no backfill** → § "3.3"
- Recording form: **record-first ballot**, Peter-merged → § "3.5"; precedent `.kiro/docs/ballots/2026-07-05-documentation-task-type.md`
- F7 recorded as **addressed by** this spec, not closed by transcription alone → § "3.6"; Stacy B2

**Open and genuinely undecided** — this round's real work → § "8. Open questions for the feedback round":
- **Q1** machine-readable criteria convention (incl. the strict-verbatim-vs-122's-best-practice tension, sub-question 4)
- **Q2** arming timing vs the 125-B campaign's open shared W1 window (boundary charge: 0 vs 2 of K=3)
- **Q3** product per-platform status shape — **Stacy's design input central**; binds a currently-empty surface
- **Q4** the `(modified)`-vs-diff check's eventual shape (deferred build)
- **Q5** ownership of execution-claims verification — **the spec author is a named party**; see the handling note below

**Also open, flagged for Peter's outline review rather than this round** → § "6.2": what binds in-flight specs (partly-complete parents at ratification).

**Evidence base** (all committed): `pre-spec/stacy-consult-2026-09-13.md`; `pre-spec/thurgood-consult-2026-09-13.md`; `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`. New evidence gathered while drafting — a reproduction of the compliance baseline that **diverges from the consult's stated denominator** — is in § "1.4 Compliance baseline — measured, with a recorded divergence". Reviewers who think the divergence changes the argument should say so; it is flagged, not buried.

**Q5 handling (procedural).** Thurgood is a named party to Q5 and will **not** self-adjudicate it during incorporation. All Q5 positions are recorded verbatim and carried to Peter unresolved; it settles by Peter's decision after this round, with Stacy's R1 on record. If a reviewer believes the Q5 framing in § "8 Q5" is not neutral, say so directly — that objection takes priority over the substance.

**Reviewers** (§ "10. Stakeholders and review plan"): **Stacy** (REQUIRED), **Ada** (light consult), **Lina** (light consult), **Leonardo** (Q3 only). Platform agents are deliberately not tagged for R1.

---

## Design Outline Feedback

*(Rounds below. Stamp format: `#### [AGENT R#]`. Reference artifact sections with `§`. Directed questions go in the asker's section as `[@AGENT] …`. Scan and answer any `[@YOUR_NAME]` mentions before writing your own feedback.)*

#### [STACY R1]

**Reviewer**: Stacy (product governance & QA) — REQUIRED reviewer per § "10. Stakeholders and review plan" and the 2026-07-05 documentation-task-type ballot precedent
**Date**: 2026-09-13
**Branch**: `task/127-r1-feedback`

**Write-safety note**: this file is my R1 draft only. I have not edited `design-outline.md`, `feedback/design-outline.md`, or any other reviewer's draft. Thurgood transcribes at incorporation with stamps preserved.

**Mandatory @ mention pre-step (Spec-Feedback-Protocol § "Mandatory @ Mention Scanning")**: scanned `.kiro/specs/127-completion-claims-integrity/**` for `[@STACY]` / `@Stacy`. **Zero outstanding mentions.** Pre-step discharged; proceeding to my own review.

**Method note**: every number below is re-derived at review time from the live corpus, not taken from the outline or from my own consult. Recipes are in the appendix so each is falsifiable. Where my own prior data was wrong, I say so in § "Baseline dispute" rather than defending it.

**Item count**: **4 BLOCKING**, **8 advisory**, plus positions on Q1–Q5 and § 6.2.


### BLOCKING

- **[BLOCKING] B3 — The exact-set rule's input scope is narrower than `tasks.md`'s promise surface, so faithful reporting reads as fabrication. This is the real false-positive mechanism, and § 1.4 misidentifies it.** → design-outline.md § "1.4 Compliance baseline — measured, with a recorded divergence", § "4.1 For `governance/completion-documentation-guide.md`", § "8 Q1"
  - The rule and the checker read one block: `**Success Criteria:**`. But `tasks.md` carries binding promises in at least two other blocks. `**Primary Artifacts:**` appears in **130 of 153** `tasks.md` files. Spec 122 additionally puts a `**Merge gate:**` clause in **17** parent blocks, stating conditions strictly stronger than its success criteria ("a cutover PR without a recorded independent validation signature is not mergeable").
  - I checked the exemplar the outline builds its Q1 tension on. `122/completion/task-10-parent-completion.md` items **4 and 5** — "Diff-against-baseline artifact, ZERO unexplained regressions" and "Lina in the cutover ledger; artifacts diff-guarded" — are **not freelance additions**. They report against task 10's `Merge gate:` clause verbatim in substance. Under a block-scoped exact-set rule they are classified **INVENT** — the fifth mutation class I added in B1, which exists to catch *fabrication*. Here it would fire on *faithful reporting of a stronger promise*.
  - **This is not a marginal case. I measured it.** Over the 15 in-scope docs that carry a criteria section, count-parity against `tasks.md` is **7/15**. Of the 8 failures, **7 are MORE-ROWS and all 7 are 122 cutover parents reporting against the merge gate**; exactly **1** is a genuine FEWER-ROWS parity failure. A checker built to this input scope arms with a **7:1 false-positive-to-true-positive ratio on the baseline population** — and every false positive lands on the best-behaved spec in the corpus. That is how a barrier earns distrust in its first week.
  - **Fix (feeds my Q1 proposal):** the rule must name `tasks.md`'s promise surface explicitly and give the non-criteria promises a required home, not an optional one. Option (c)'s "additional verification" section is the right shape and the wrong disposition — it must be **required-if-the-task-defines-other-promise-blocks**, so that a *dropped merge-gate condition* is as visible as a dropped criterion. As written, option (c) demotes a gate condition to optional commentary.

- **[BLOCKING] B4 — Criteria OMISSION is strictly cheaper than criteria dilution, rider (a) makes it self-executing, and the corpus already contains the precedent — including the PR-gate spec itself.** → design-outline.md § "3.3 Scoping riders" (a), § "3.4 The Goodhart rot mode is named in the ruling", § "11. Rot modes"
  - § 3.4 names dilution (vaguer criteria) as the Goodhart mode and defers it to the next audit. Omission is the same evasion one step further and costs less: a `tasks.md` that defines **no** per-parent criteria is exempt from the entire rule by rider (a), with **no declaration required**, and the parity checker greens by construction — no criteria block, nothing to compare.
  - The precedent is live: **3 of 153** `tasks.md` files define zero success criteria, and one of them is **`125-A-pr-gate-mechanical-arming`** — 8 parent tasks, post-PR-gate, governance law, the spec that armed the gate this spec extends. (The other two: `054c-figma-token-push-fixes`, `icon-token-system`.) Thurgood's own § 1.4 records 125-A's exclusion as a fact about the denominator; I am recording it as a fact about the **rule's exit door**.
  - Anticipating the obvious rebuttal: yes, the base rate is 2%, measured **before** the rule exists. That measurement carries no information about post-rule behavior, because today writing criteria is free and after ratification it creates an auditable obligation. This is the identical logic § 3.4 applies to dilution; it applies with more force to omission, which requires no craft at all.
  - Contrast the 119-B spec-level pattern: it exempts via a **visible heading** (`## Success Criteria (spec level)`) and discharges at closeout. That exemption is readable and auditable. Omission is neither.
  - **Fix:** generalize Q1.3. Every `tasks.md` declares its criteria mode mechanically — `per-parent` or `spec-level` — with **no third state**. "No criteria at all" becomes unwritable rather than silently exempt. This costs one header line, closes the exit door, and answers Q1.3 at the same time.

- **[BLOCKING] B5 — The Tier-3 worked example teaches the exact defect F7 names, and § 4.2 does not list it as an edit site.** → design-outline.md § "4.2 For `governance/Process-Spec-Planning.md`", § "7. Artifact inventory"
  - Verified at source. `governance/Process-Spec-Planning.md:1818-1853` states the Tier-3 requirement as *"Confirmation that overall goals are met"* — the standard's own language **presumes the finding**. There is no ⚠️/❌ vocabulary anywhere in it. That is the mechanical reason M4 = 0/22, and it confirms my Q3 consult finding: this is a **template defect, not an adoption failure**.
  - Worse, and this is the part the outline misses: the **worked example** at :2011-2032 fills its `**Verification**:` field with *"Created complete directory structure… Implemented TokenSelector… Implemented BuildOrchestrator… All components integrate correctly."* Those are **activity descriptions, not verdicts**. F7's own words are *"authored from what was done rather than checked against what was promised."* The canonical example every agent copies **models effort-as-evidence**. Spec 112's author was following the template, not deviating from it.
  - § 4.2 amends the required *shape* (prose block → table) and says the prose form survives as optional elaboration. It says nothing about rewriting the example. If the example ships unchanged, the corpus retains its canonical demonstration of the failure mode — beneath a table that now demands Evidence.
  - **Fix:** the ballot's before→after inventory must carry the worked example at :2011-2032 as a **named edit site**, with the replacement example showing (i) at least one ⚠️ row with a follow-up link and (ii) Evidence cells that are artifact paths / test names / command output, never activity prose. I flag this in the same spirit as the five missed edit sites I caught in the 2026-07-05 ballot: an enumerated inventory that misses the artifact doing the teaching is the expensive kind of miss.

- **[BLOCKING] B6 — § 6.2's in-flight population is understated by more than an order of magnitude, and option (ii) is near-total nullification rather than a months-long delay. Peter is being asked to rule on this at outline review with the wrong numbers.** → design-outline.md § "6.2 One scoping edge, flagged for Peter's outline review"
  - § 6.2 names two in-flight specs (125-B, 123). Measured: **36 specs currently have both ticked and unticked parent tasks**, and nearly all define per-parent criteria blocks. Most are dormant rather than actively worked — but rider-wise **dormant is indistinguishable from in-flight**, which is precisely the problem a scoping rule has to settle.
  - Consequently the option costs are wrong as stated:
    - **(ii)** "binds specs whose `tasks.md` is authored after ratification" exempts all 36 **plus** 125-B — i.e. **every spec in the corpus with an authored `tasks.md`**. `123-consumer-distribution` has no `tasks.md` (its directory holds a design outline and nine inbound notes). So (ii) binds exactly one future spec and nothing else. The outline describes this as "delays effect by months"; it is closer to nullification, and the delay is unbounded rather than months.
    - **(i)** "means one spec's docs are internally inconsistent" — actually up to 36. But the inconsistency is cosmetic: a doc written before a rule does not contradict one written after, and nobody reads a spec's completion directory for stylistic uniformity.
  - Recommendation is in § "§ 6.2 position" below. Flagging as BLOCKING because this is a decision input for a ruling the outline asks Peter to make now, not a design detail deferrable to requirements.

---

### Advisory

- **[advisory] A1 — Q1's format census is very slightly off; the ballot should carry re-derived numbers.** → § "8 Q1"
  - My re-derivation: indented `**Success Criteria:**` = **790** (matches); `**Success Criteria**:` colon-outside, any indent = **62** (outline splits this as 46 + ~19); `##`/`###` headings = **17** (outline: 15). Dominant share ≈ **91%**, not 92%. Immaterial to the conclusion — recorded only because a ballot is a record and the tail is what a checker's long-tail handling is sized against.

- **[advisory] A2 — § 1.4's characterization of the exemplar ("it penalizes a genuinely better artifact") is a misdiagnosis, and it propagates into Q1.4's framing.** → § "1.4", § "8 Q1" sub-question 4
  - Strict verbatim does not penalize the exemplar's *substance*. It requires **relocating** that substance: the verbatim criterion goes in the `Criterion` cell, and 122/task-10's evidence-rich prose — which is genuinely excellent — goes in the `Evidence` cell where it belongs and where the rule already demands content. The cost is reformatting, not quality loss.
  - This matters because the misdiagnosis makes option (c) look sufficient when it is not. Option (c) legitimizes the exemplar's **extra items**; it does nothing about its **compressed labels**, which are the reason items 1–3 would fail verbatim. Under option (c) as written, the exemplar still fails. Say so plainly, or the round will adopt (c) believing it resolves a tension it only half-touches.

- **[advisory] A3 — § 5.5's entry-id substring claim: INDEPENDENTLY VERIFIED. No change needed.** → § "5.5 Register hygiene (all rows)"
  - Checked all **17** register entries in `governance/classification-map.md` § "Entries" against the four proposed ids. No collisions and no substring relations, in either direction, including among the four proposed ids themselves. Recording the confirmation rather than staying silent, because this spec's own § 9.2(1) says verify mechanically rather than trust an enumerated list — that cuts toward confirming true claims as well as catching false ones.

- **[advisory] A4 — § 9.2's caveat is the strongest sentence in the outline and it is in the weakest location.** → § "9.2 Success criteria for this spec", § "5.3 `completion-verification-honesty`"
  - *"Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent."* That is my N3 commitment stated better than I stated it, and the joint agreement's (d8) makes it jointly held: **no prose anywhere** may imply the ownership move or the checker makes claim honesty owned or solved.
  - Right now it lives in a measurement subsection. A ballot reader deciding whether to ratify may never reach it. **Promote it into the ballot's own framing and into the `completion-verification-honesty` register row's rationale**, where the reader who mistakes the barrier for a guarantee is actually standing.

- **[advisory] A5 — § 7's artifact inventory carries three errors already found and countersigned in the Q5 joint agreement; they should be fixed at R1 incorporation, not deferred to the tasks phase.** → § "7. Artifact inventory"
  - **Wrong path**: the row reads `scripts/verify-gate-registration.sh`. The file is at **`tools/agent-generator/verify-gate-registration.sh`**; there is no `scripts/` copy. (Joint agreement § C4-5, Thurgood's own correction.)
  - **False Q5 dependency**: `scripts/check-completion-criteria-parity.ts` and the rows inheriting its ditto read `Owner: Q5-dependent`. Neither candidate owner's `writeScope` covers `scripts/**`, `governance/**`, or `.github/workflows/**`, so **checker authorship does not follow Q5 under either answer**. Should read *"scoped write grant required — tasks phase."* (Joint agreement § 4.1.)
  - **The gate-registration row's owner is fixed by the arming, not by Q5** — it reads `Thurgood — bound to the arming unit (U3)`. (Joint agreement § C4-5.)
  - The outline predates the joint agreement, so these are staleness rather than error. But § 7 is the inventory a ballot's before→after list will be built from, and inventory errors are the failure class I was a required reviewer for in July. Fix them in the artifact Peter reads.

- **[advisory] A6 — § 8 Q5's body is now the weaker artifact and should be replaced by a pointer to the joint agreement.** → § "8 Q5", § "13. Resolution record"
  - Detail in § "Q5 position" below.

- **[advisory] A7 — § 9.1's M2 row reads "unmeasured at baseline." It is now measured; the ballot should carry the number.** → § "9.1 Baseline"
  - **M2 count-parity = 7/15 (47%)** over the in-scope docs carrying a criteria section. Full table and caveats in § "Baseline dispute" below. This is the checker's actual target dimension and it was the one number missing from the decision.

- **[advisory] A8 — A sixth mutation class: ABSORB. My B1 taxonomy of five is incomplete, and the omission is mine.** → § "1.2 The mutation classes (Stacy B1 — five, not four)"
  - The single genuine parity failure in the in-scope population — `122/completion/task-18-parent-completion.md`, 5 criteria → 3 rows — is not a *drop*. Criteria 4 (OB-8: *"the C7(b) check is sharpened so a `not-yet-ported` with an in-ledger target FAILs (prove-it-bites recorded)"*) and 5 (OB-9: *"a lightweight recurrence guard is considered"*) are **folded into row 3's prose** as "OB-8, OB-9 marked CLOSED."
  - Nothing is hidden and nothing is false. But two discrete, individually-verifiable promises stop being individually verifiable — the prove-it-bites record and the recurrence guard each vanish into a summary verdict. **Distinct from drop** (content is present), **distinct from reword** (the count changes), and it is the mutation a well-intentioned author produces under compression pressure. It is also the class exact-set parity catches cleanly, which is a point in the checker's favor.
  - Recommend adding ABSORB to § 1.2 and to the rule's rationale. Six classes, not five.

---

### Required item 1 — The baseline dispute: resolved by concession, with the design consequence re-argued on corrected data

**My 27% is withdrawn. It is arithmetically wrong and should not be cited for any part of the argument.**

**Root cause, reconstructed exactly.** My S1 denominator of 66 was *all documents added under `.kiro/specs/**/completion/**` since 2026-07-01, minus subtask docs*. Mechanically: **100 docs added − 34 subtask docs = 66**. That left **25 documents that are not completion docs at all** in a denominator purporting to count parent completion docs — 24 of them 125-B campaign working artifacts (`wave-1-dataset.md`, `wave-2-probe-evidence.md`, `campaign-plan.md`, `trial-diff-table.md`, `u1-closeout.md`, …) plus one 122 follow-up memo. Every one of the 25 is a guaranteed zero on both numerators, because none was ever expected to carry a criteria section. I filtered the naming form I was thinking about (subtasks) and never filtered the ones I wasn't.

**Thurgood's scoping is right, and I verified it rather than accepting it.**

| Check | His figure | My independent re-derivation | Verdict |
|---|---|---|---|
| Parent-shaped docs added since 2026-07-01, both naming forms | 41 | **41** | confirmed |
| — with any criteria section | 16 (39%) | **16** | confirmed |
| — with any ⚠️/❌/Partial/"not met" | 2 (5%) | **2** | confirmed |
| In-scope population (per-parent-criteria specs) | 22 | **22** | confirmed |
| — with criteria section | 15 (68%) | **15** | confirmed |
| — with any marker (M5) | 0 | **0** | confirmed |
| — with the forced-negative line (M4) | 0 | **0** | confirmed |
| Of the 15: mention "Evidence" | 5 | **5** | confirmed |
| Of the 15: mention "Verification" | 4 | **4** | confirmed |

**His in-scope derivation also verified independently**, by scanning the `tasks.md` of every spec contributing to the 41: `122` (18 parents, 36 criteria-string hits) and `125-B` (4 parents, 8 hits) are in scope; `119-B` (10 parents, one `## Success Criteria (spec level)` heading — rider (a) discharge), `125-A` (8 parents, **zero** criteria — see B4), `126` (1 parent, no `tasks.md`) are out. The scoping is correct and the rider is applied faithfully.

**Does 27% survive for any part of the argument? No.** The 25 contaminating artifacts are a heterogeneous set — datasets, probe outputs, assessments, closeouts — with no shared population definition. They are not "completion-directory hygiene" either, since none was ever obliged to carry criteria. There is no question for which 66 is the right denominator. **Retire the number; cite 39% corpus-wide and 68% in-scope.**

**Now the part that matters — what the corrected baseline does to the checker's weight, and why I still argue against Thurgood's recorded alternative.**

His § 12 alternative — *ship parts 1–2 by ballot, let the first M4 reading decide whether the checker is needed* — is **more** attractive on corrected numbers than on mine, and I am not going to pretend otherwise. But it has a confound that makes its own decision criterion uninformative, and I would have missed it if I had defended my data instead of re-running it:

1. **M4 = 0/22 is a template defect, not an adoption failure.** Verified at source (B5): the Tier-3 standard says *"Confirmation that overall goals are met"* and offers no failure vocabulary outside the Blocked Task format. Agents did not decline to write "unmet" — the template gave them nowhere to write it.
2. **Therefore the first M4 reading after the ballot measures "did agents use a line the template now provides."** That will be high. It is a measurement of the prose fix's own success, and it says **nothing** about whether criteria tables faithfully reproduce criteria sets.
3. **Reading a high M4 as "the checker is unnecessary" would be a textbook Goodhart error** — committed by the spec whose § 3.4 names Goodhart as the next audit's first question. The deferral's trigger is confounded by the fix that ships with it.

**So I measured the dimension the checker actually targets, which nobody had.** M2 count-parity over the 15 in-scope docs carrying a criteria section:

| Result | n | Detail |
|---|---|---|
| **Count-parity** | **7 / 15 (47%)** | 122 parents 7, 9, 17; 125-B parents 1–4 |
| MORE rows than `tasks.md` criteria | 7 | 122 parents 10–16 — **all seven are the merge-gate false-positive class (B3)**, not fabrication |
| FEWER rows | 1 | 122 parent 18 — the one genuine parity failure, ABSORB class (A8) |

**Two honest caveats, both of which cut against me.** Count-parity is an **upper bound** on exact-set verbatim parity — equal counts can still fail verbatim, and the exemplar shows compressed labels are the house style in 122. **True verbatim M2 is plausibly near 0/15.** And the single true positive is a *merge*, not a concealment: no bad news was hidden in it.

**My resolution, in one paragraph.** The corrected baseline **weakens** the section-presence argument (68%, already mostly compliant in form) and **does not** weaken the checker's case — it relocates it. The checker's target dimension is measurably non-compliant at 47% ceiling and plausibly near 0% verbatim, so the checker is not redundant; parts 1–2 alone would leave it unmeasured and unmoved. But the same measurement says a checker built to the **current input scope** would arm at a 7:1 false-positive ratio (B3), and a checker demanding **verbatim** would fail essentially every in-scope doc written in today's style. **Build it in this spec; fix its input scope first (B3); and do not arm it on ratification day** — arm it on evidence that the convention has been adopted, which is my Q2 answer. That is not the light alternative and it does not reopen § 3.1: the checker is built in this spec either way, and Q2 already frames the required-flag flip as open.

---

### Required item 2 — Q1: the criteria-block convention I would audit against

**Headline: option (c), amended to "verbatim *cell*, not verbatim *row*," with a required — not optional — home for non-criteria promises and a total criteria-mode declaration.**

**On sub-question 4 and the exact-set false-positive finding.** Option (c) is the right instinct and is under-specified in two ways that my measurement exposes (B3, A2): it does not rescue the exemplar's compressed labels, and it gives merge-gate/artifact promises an *optional* home, which converts a stronger promise into commentary. Amended form:

1. **Match strictness — strict verbatim on the cell only.** The `Criterion (verbatim)` cell must be string-equal to the `tasks.md` bullet after **whitespace and line-wrap normalization only**. No similarity threshold, no prefix matching, no fuzzy comparison. I want to be precise about why this is not the judgment I rejected in Q1.4(b): whitespace normalization is a **total deterministic function** with no parameter to tune; a similarity threshold is a number someone has to defend, and the person defending it ends up adjudicating string similarity instead of claim truth. Line-wrapping is a markdown artifact, not authorial intent.
2. **All authorial compression moves to the Evidence cell.** 122/task-10's five evidence-rich items are not lost — items 1–3's prose becomes the Evidence for the three verbatim criteria. The artifact gets *better*, because the compressed labels that currently substitute for the criterion stop hiding it.
3. **An "Additional verification" section below the table, REQUIRED when the task defines other promise blocks.** This is where 122/task-10's items 4–5 legitimately live. Required-if-applicable, not optional, so that a **dropped merge-gate condition is as visible as a dropped criterion**. Optional here re-creates F7 one block over.
4. **Block format — freeze the dominant form, and make it declared.** Keep `**Success Criteria:**` + bullet list (~91% share; lowest migration cost). Its brittleness (indentation and bold become load-bearing) is real and is **bounded by the declaration**: a header marker means a malformed block fails loudly as "declared per-parent, block not found" instead of silently selecting nothing. That failure mode matters — this register defines `check_state: dormant` as an armed check that "runs and passes while verifying nothing," and the joint agreement's § C4-1 already flags dormancy as this checker's specific blind spot.
5. **Criteria-mode declaration must be TOTAL (answers Q1.3, closes B4).** Every `tasks.md` declares `criteria-mode: per-parent | spec-level` in its header. **No third state.** Spec-level specs are skipped by the checker and owe one closeout discharge; per-parent specs are bound. "No criteria at all" becomes unwritable rather than a free exemption (B4), and rider (a) stops being an unfalsifiable claim asserted at audit time — which was my original Q1.3 ask, now generalized.
6. **Parent association — nearest preceding parent checkbox.** Matches current authoring and is unambiguous in practice: I resolved all 22 in-scope parents mechanically this way with zero collisions. Cheaper than an explicit key and requires no migration.
7. **Forward-binding** per § 6.2 option (iii) below.

**What I would audit against, stated as the auditable predicate:** *for every parent in a `criteria-mode: per-parent` spec, the set of `Criterion` cells is string-equal (whitespace-normalized) to the set of `**Success Criteria:**` bullets; every row carries a non-empty Evidence cell that is a path, a test name, or a command with its result; the forced-negative line is present; and every other promise block in the task has a corresponding entry in "Additional verification."*

**Counter-argument against my own proposal:** the total criteria-mode declaration is a new required header on 153 existing `tasks.md` files, and I am proposing it in a spec whose § 6.1 non-goals say it will not tighten `tasks.md` authorship standards. That is a real tension and Peter should weigh it. My answer is that the declaration does not tighten what a criterion must **say** — the Goodhart surface § 6.1 protects — it only requires declaring which mode the spec is in, and it can be forward-binding like everything else. But if Peter reads it as authorship-standard creep, B4's exit door needs a different closure and I do not have a cheaper one.

---

### Required item 3 — Q3: the product per-platform dimension

**Headline: no new table shape. Product parents discharge through the existing per-platform Implementation Reports, and the parent's criteria table gains exactly one sentence — a roll-up rule. Everything about table *shape* stays undecided until the first product spec.**

**Honoring my own warning first.** My consult's Q3 finding stands and applies to me: the Product MCP indexes **0 screens, 0 tokens, 0 domain objects**, and all 178 specs are system-side. **Nobody's opinion here is evidence, including mine.** So the test I am applying is not "which shape is best" — it is "what is the minimum commitment that cannot be wrong, given that we will learn the answer from the first instance."

**The structural fact the outline's three options miss.** I checked `governance/Product-Handoff-Protocol.md` at source. The Implementation Report template is **already per-platform by construction** — it opens with `**Platform**: {PLATFORM}` and there is one report per platform — and each report already carries **four forced-negative sections** in exactly the form part 2 imports: "Deviations from Spec: None / or list each with reason", "Decisions Made During Implementation", "Discoveries", "Open Items: None / or list each". The per-platform dimension rider (b) asks for **exists and is exercised**. Options 1–3 all propose building a second, parallel per-platform structure beside it.

**My proposal, concretely:**

- **No per-platform columns and no per-platform rows in the parent criteria table.** The table keeps the same three columns as the system side — one rule, one shape, one checker.
- **Add one roll-up rule** to the completion-documentation-guide's new subsection: *for a product-spec parent, a criterion is marked ✅ only if every applicable platform's Implementation Report is clean for that criterion; the Evidence cell cites the per-platform reports; if any applicable platform is unmet, the row is ⚠️ and names the platform.*
- **That one sentence discharges rider (b)'s stated harm exactly** — "a single ✅ must not hide met-on-iOS-unmet-on-Android" — and it is auditable without an instance: I can check it the day the first product parent completes, against a structure that already exists.
- **Applicability is explicit, not inferred**, which kills option 1's N/A-noise problem: a criterion that touches one platform cites one report and says so.

**What should stay undecided until the first product spec lands:**
1. Whether per-platform **rows** (option 3) are needed for readability once a real criteria table meets three real platforms. Pure authoring ergonomics; unanswerable without an artifact.
2. Whether the parity checker should read Implementation Reports at all, or stop at the parent table. I lean stop-at-the-table, but a checker's reach into an unexercised structure is exactly the over-claimed instrument the joint agreement's (d6)(7) obliges us not to build.
3. Whether product specs use `criteria-mode: per-parent` at all, or whether the Implementation Report *is* the discharge with the parent table as a roll-up only.

**Counter-argument against my own proposal:** reusing the Implementation Report means the product rule's fate is coupled to a protocol that has **never been exercised on a real screen** — zero instances. If Implementation Reports turn out to be authored inconsistently once Leonardo and the platform agents actually use them, my roll-up rule inherits that inconsistency and I will have built the product half of this rule on an untested foundation while arguing *against* the outline's options for being untested. The honest answer is that both paths are untested and mine at least reuses a structure that has already been reviewed and committed, rather than inventing a second one. **Leonardo's R1 should be weighted above mine on this question** — he authors the first product spec and will feel the ergonomics first.

---

### Required item 4 — Q2, Q4, and § 6.2 positions

- **[STACY R1] Q2 — arming timing. Position: BUILD in this spec; ARM on convention-adoption evidence at a burst boundary, capped by the next release. Not on ratification day, and not "at campaign close."** → § "8 Q2"
  - **The outline's binary undersells "arm immediately" and leaves "arm at campaign close" unbounded.** Arming is an exogenous boundary event: it does not merely consume 2 of K=3, it **opens segment 3 and resets n**, so 125-B needs a fresh N=20 observed PRs before its shared-W1 verdict can close. At a bursty cadence that plausibly delays 125-B's closeout *more* than the arming gains — and the delay buys 127 nothing. Conversely "arm at campaign close" is unbounded in calendar terms, and the interim is exactly the period § 1.3 says prose does not hold.
  - **The decisive constraint is not the campaign accounting — it is my M2 measurement.** A verbatim checker armed today would fail essentially every in-scope doc written in the current style (near-0% true verbatim parity, § "Baseline dispute"). **That is not a gate, it is a wall.** A barrier that red-lights every honest author on day one gets routed around or waived, and the spec loses the rule it just ratified.
  - **Proposed arming condition**, in priority order: (a) the Q1 convention has shipped and the Tier-3 example is fixed (B5); (b) **at least N ≥ 5 in-scope parents have completed under the convention with M2 measured** — my audit output, not the checker's; (c) the flip lands at a burst boundary, preferably the **Wave 3 prune open**, so segment 3's fresh n accrues *concurrently* with wave 3's own observation rather than serially after it — one boundary charge either way, better overlap; (d) **capped: arm before the next release publish regardless**, because RELEASE is the harm boundary and both consumer-reaching escapes crossed it.
  - **This does not reopen § 3.1.** The checker is built in this spec under every option; Q2 is scoped to the required-flag flip, which the outline itself frames as open. Condition (b) is the honest version of Thurgood's § 12 alternative — it uses **M2/M3**, the metrics the ballot alone cannot improve, rather than M4, which the ballot confounds (§ "Baseline dispute").
  - **Counter-argument, and it is my own non-negotiable pointed at me:** condition (c) couples 127's arming to 125-B's schedule — the exact coupling my N5 rejects ("the rule matters more than the org chart," and more than another spec's campaign). If Wave 3 slips indefinitely, the arming slips with it. Condition (d) is the cap that makes (c) safe, and if Peter finds the coupling unacceptable, **drop (c) and keep (a)(b)(d)** — the convention-adoption gate is the load-bearing part; the campaign-efficiency timing is optimization.

- **[STACY R1] Q4 — `promised-artifact-shipped`: change the input surface, and split the row.** → § "8 Q4"
  - **Sub-question 1, input.** The outline proposes parsing `(modified)` / `(reworked)` annotations. Measured: `(modified)` appears in **14 of 153** `tasks.md` files (65 occurrences); `(reworked)` **4** times total. By contrast `**Primary Artifacts:**` is a **structured block in 130 of 153** files. Parsing free-text annotations that 91% of specs do not use, when a near-universal structured block states the same promise, is the wrong predicate. **Register it against `**Primary Artifacts:**`.** This also unifies with B3: Primary Artifacts is one of the promise blocks the criteria checker must acknowledge, so both checks read the same declared surface.
  - **Sub-question 1 continued — split the row into two.** The outline observes that the first real output class may be "the task text names a file that does not exist" (112's phantom `src/generators/FigmaFormatGenerator.ts`, and `WebFormatGenerator.ts` which lives in `src/providers/`) and that this is *different from what it was built for*. Agreed — and it is **much cheaper and nearly false-positive-free**. A **path-existence** check over Primary Artifacts has essentially none of § Q4.2's false-positive classes: a file either exists at the declared path at merge time or the task text is wrong. Recommend registering **`promised-artifact-exists`** (cheap, high-value, buildable) separately from **`promised-artifact-shipped`** (diff-based, high false-positive surface, stays deferred). Two rows, honestly classified, instead of one row carrying two very different risk profiles.
  - **Sub-question 2, false positives.** The three classes are correctly identified. All three are *also* signals that the task text was never corrected — which is itself a finding worth surfacing, provided the check's verdict is "task text and reality disagree" rather than "work was not done."
  - **Sub-question 3, promotion trigger.** A **retrospective dry run over merged history**, measuring false-positive rate without arming anything. It is the cheapest of the candidates, it is the only one that produces evidence rather than a schedule, and it can be run today. Prefer it over "a second spec exhibiting the signature," which requires waiting for another escape.
  - **Sub-question 4, relationship.** Agreed they are complements. Adding the constraint from the joint agreement § 4.4, countersigned: **`promised-artifact-shipped` must not fire per-PR** — a later unit can legitimately deliver a prior unit's promised artifact. Its events are CLOSEOUT and RELEASE. (`promised-artifact-exists`, if split out, *can* fire per-PR, since a declared path either resolves or does not.)

- **[STACY R1] § 6.2 — in-flight specs. Position: option (iii), now on evidence rather than preference.** → § "6.2"
  - I stated a preference for (iii) in my frozen Q5 position; B6's measurement converts it to a conclusion. **(ii) is out**: it exempts all 36 partly-complete specs plus 125-B, i.e. the entire corpus with an authored `tasks.md`, binding exactly one future spec. **(i) is nearly right** and its cost is overstated — cosmetic intra-spec inconsistency across up to 36 dormant specs, which nobody reads for uniformity. **(iii) = (i) plus a readable exemption**, and that is worth the one line: an exemption I can **read** in the doc beats one I have to **infer** from the spec's start date, and it requires **no reopening of a dormant spec** — which matters at 36, where reopening is not free.
  - **The one thing (iii) must specify to be auditable:** the exemption note is a fixed string in the completion doc, not free prose (e.g. `Criteria fidelity: exempt — spec in flight at ratification (<date>)`). An exemption phrased freely is an unfalsifiable claim, which is B4's failure mode wearing a different hat.
  - **Counter-argument:** (iii) gives every in-flight parent a self-served exemption for an unbounded period, and 36 specs is a large blast radius for a self-served exemption. If that reads as too permissive, the tightening is a **sunset** — the exemption is available only until the spec's next parent completes after ratification-plus-one-merge — rather than switching to (ii), which nullifies.

---

### Required item 5 — Q5: seeing the joint agreement in the outline's context

**[STACY R1] Recommendation: replace § 8 Q5's body with a pointer to `pre-spec/q5-joint-working-agreement.md`, and keep the handling note.** → § "8 Q5", § "10. Stakeholders and review plan", § "13. Resolution record"

As co-author of the joint agreement, three things changed once I read § 8 Q5 next to it:

1. **Two of the four AGAINST items are now stale, and leaving them live misrepresents the state.** AGAINST-1's test — "if that cut is not crisp enough to state in one sentence in both charters, the change is not ready" — is **met**, with drafted text in joint agreement § 1.1 and both parties' bars honored. AGAINST-4 (the register `owner:` fields cannot be finalized until Q5 settles) is **resolved**: friction (a) lands `completion-criteria-parity` at `owner: thurgood` on schema grounds, countersigned, and the other three rows are settled independently of the ruling. A reader of § 8 Q5 alone would think both are open.
2. **FOR-3 (load distribution) should not survive into the ballot as a live argument.** I rejected it on the merits in my frozen position — load is reversible, charters are sticky, and a load-justified cut un-justifies itself when 125-B closes. Thurgood treats it as a **watch condition**, not a basis. Both named parties decline to rest the change on it, so its presence in the outline's FOR list misrepresents both of us. The argument that should lead is the one § 8 Q5 omits entirely: **I already own claims-vs-reality auditing one level up** (`audit:coverage-map`, `verify-gate-registration.sh` — does the guard guard what it claims), and Q5 extends the same method to "did the task ship what it claims." Coherent extension of a chartered element, not net-new domain, and not load-based.
3. **What Peter actually needs is in the agreement's § 5.2 and § 6, not in a pro/con list.** The two preserved unresolved risks (the lapse risk, stated in both parties' own words; and the two unrecovered costs — Thurgood losing the verification contact that makes his standards good, and Goodhart sitting upstream of me with no lever) are the material for a ruling. A pro/con list that has been overtaken by two frozen positions and a countersignature is the weaker artifact.

**Keep unchanged:** the handling note. It still governs incorporation, it is the right procedure, and the joint agreement's § 6(1) and Thurgood's C5 both re-affirm that two conflicted parties agreeing is **evidence for a decision, not a decision**. Nothing about the agreement's existence should reduce the scrutiny Peter applies.

**What I would ADD to the agreement, seeing it in the outline's context** — one item, and it is new:

- **B4 (criteria omission) strengthens the agreement's (d6) item 3 into a stronger ask than I wrote.** I asked for the **spec-level-criteria declaration** to be mechanical so rider (a) is not an unfalsifiable excuse. B4 shows that is not sufficient: a spec that declares nothing and defines no criteria is exempt with no assertion at all — no claim to falsify. **The declaration must be total (per-parent | spec-level, no third state)**, not merely mechanical for the spec-level case. This is an addition to an obligation Thurgood has already countersigned, so it needs his R2 acknowledgment rather than silent inheritance. It is also the item most likely to be dropped in transcription, because it looks like a restatement of (d6)(3) and is not.

**What I would CHANGE: nothing in the agreement's substance.** Both resolutions that went against me — friction (c)'s LIVENESS meta-item staying on Thurgood's health check, and my F-A mitigation losing to his EDUCATION trigger — I would resolve the same way again. His C3-2 fixture-timeliness amendment fixes a real hole I created (fixtures I never deliver would stall the arming with no detection), and his C4-4 (charter the 127 pilot under **any** Q5 answer) costs him the thing he would otherwise keep and should be adopted as written. His (d7) contest is correct: my candidate line for the test-coverage overlap reassigns two named elements of his current charter rather than disambiguating an overlap, and "recorded follow-up" undersells it. His correction to (d6) item 1 — "Thurgood endorses at countersignature," not "joint support" — should be honored in the ballot text.

---

### Required item 6 — Claims-vs-source check on my own inputs

I checked every rendering of my consult against the source it claims, including the ground truth.

| Outline claim | Source checked | Verdict |
|---|---|---|
| § 1.2 — 112 task 6: 5 criteria → 4 doc rows | `112/tasks.md` task 6 block | **ACCURATE.** Exactly 5: WCAG AA pass, teal info.text, green success.text, ΔE₀₀ <1, Spec 106 contract test |
| § 1.2 — drop (green success.text; Spec 106), reword ("pass"→"evaluated"), relax (ΔE₀₀ <1→<3), invent ("Intentional changes documented") | `112/completion/task-6-completion.md:13-18` | **ACCURATE, all four, verbatim.** The doc's table is 4 rows: "evaluated against" ✅, teal ✅ (5.33:1), "ΔE₀₀ < 3" ✅, "Intentional changes documented" ✅ (35 colors). Green success.text and Spec 106 are absent |
| § 1.5 / B2 — catch-rate 2 of 12; three uncaught classes | my consult + audit ledger | **ACCURATE**, and the framing "F7 addressed-by-127, not closed by transcription" (§ 3.6) is carried correctly |
| § 3.2 — the modified package, three parts | `pre-spec/stacy-consult` § "Verdict detail" | **ACCURATE.** Exact-set, three mandatory columns, prose-only Evidence non-compliant, forced-negative line, staged mechanization |
| § 3.2 part 2 — forced-negative imported from `Product-Handoff-Protocol.md:83-101` | source | **ACCURATE.** "None / or list each" across four Implementation Report sections; and the template is per-platform by construction — see Q3 |
| § 3.3 riders (a)(b)(c) | consult § "Scoping riders" | **ACCURATE**, verbatim in substance |
| § 11 — rot modes, ascending severity; cost-honesty note | consult § Q4 | **ACCURATE.** The re-verification-cost framing is carried in my own terms, including "the wrong number to quote" |
| § 12 — my recorded counter-argument (three parts may exceed the evidence; defensible minimum is part 2 alone) | consult § "Recorded counter-argument" | **ACCURATE**, and correctly recorded as *unrebutted* rather than answered. It stands |
| § 1.4 — "Stacy's consult (S1) reports, over '66 post-PR-gate parent completion docs'…" | my consult § S1 | **ACCURATE rendering of my claim.** The claim itself was wrong — my error, not his. See § "Baseline dispute" |

**No misrendering found.** § 1.2's five-class taxonomy is faithfully mine — it is merely **incomplete**, and the sixth class (ABSORB, A8) is my omission to fix, not his.

**One completeness note on § 1.4's divergence framing.** It says "the numerators broadly agree (16 vs 18; 2 vs 2); the denominators differ in construction." That is generous to me. The two extra section-hits in my 18 came from the 25 contaminating artifacts — documents that mention "Success Criteria" in passing while not being completion docs. The numerators did not "broadly agree"; mine was inflated by the same contamination that deflated my percentage. The ballot should state the correction plainly rather than as a divergence between two defensible readings, because it was not one.

---

### Counter-arguments against my own review

Per my own standard, and because "inflating audit severity to appear thorough" is a named bias in my charter:

1. **B3 could be read as scope creep.** Requiring the rule to acknowledge `Primary Artifacts:` and spec-local gate clauses expands it beyond the criteria table F7 was about. A defensible narrower reading: scope the checker to the Success Criteria block, accept the 7 false positives as a **122-specific** artifact (the `Merge gate:` idiom exists in exactly one spec), and let the convention's adoption retire them naturally. I think that is wrong — 7 of 8 baseline failures is not a rounding error, and `Primary Artifacts:` at 130/153 is not spec-specific — but the narrow reading is coherent and cheaper, and Peter should hear it.
2. **B4's evidence is thin in one direction.** Three specs with zero criteria is a 2% base rate, and my argument that the rate will rise post-rule is a **prediction, not a measurement**. I believe it because it is the same incentive logic § 3.4 already accepts for dilution, but I should not pretend it is data. If Peter wants to defer B4, the cheap hedge is to have the first claims audit count criteria-block *omissions* alongside criteria *vagueness* — the metric costs nothing and converts my prediction into evidence.
3. **My Q3 answer conveniently reuses a structure on the product side, where my charter lives and my surface is empty.** An agent with zero product instances recommending that product work route through a product protocol should be read skeptically. Leonardo's R1 should outweigh mine here.
4. **My Q2 answer adds a gate to an arming, which is process overhead — my named bias.** The counter-test I applied: would I still propose condition (b) if it delayed a check I wanted? Yes — a barrier that fails ~100% of honest current-style docs would be waived within two specs, which costs more than the delay. But condition (c) (campaign-efficient timing) is optimization dressed as a condition, and I have flagged it as droppable for that reason.
5. **I am a named party to Q5 and I am recommending that the outline's Q5 section be replaced by a document I co-authored.** That is exactly the shape of a conflicted recommendation. The mitigations are that the agreement preserves both frozen positions unedited, that it resolved two frictions against Thurgood and one against me, and that it settles nothing by itself. But Peter should discount my A6/Q5 recommendation accordingly, and Thurgood's non-self-adjudication commitment applies symmetrically — **I should not be the one who decides that my own agreement replaces his framing.**

---

### Appendix — reproduction recipes

All run 2026-09-13 on `task/127-r1-feedback` at `92916637`.

```bash
# Population reconciliation (41 vs 66)
git log --diff-filter=A --since=2026-07-01 --name-only --pretty=format: \
  -- '.kiro/specs/**/completion/**' | grep -E '\.md$' | sort -u          # 100 added
# minus subtask docs (task-N-M-*-completion.md)                           # -34  => 66 (my S1 denominator)
# of which parent-shaped (task-N[-parent]-completion.md)                  #  41  (Thurgood's, correct)
# residual 25 = non-completion-doc working artifacts, 24 of them 125-B campaign files

# In-scope derivation (per-parent-criteria specs)
grep -c 'Success Criteria' .kiro/specs/<spec>/tasks.md   # 122:36  125-B:8  119-B:1(spec-level hdr)  125-A:0  126:no tasks.md

# B4 — criteria omission
for t in .kiro/specs/*/tasks.md; do [ "$(grep -ci 'Success Criteria' "$t")" = 0 ] && echo "$t"; done
# => 054c-figma-token-push-fixes, 125-A-pr-gate-mechanical-arming, icon-token-system   (3 of 153)

# B3 — promise surface beyond the criteria block
grep -rl 'Primary Artifacts' .kiro/specs/*/tasks.md | wc -l     # 130 of 153
grep -ci 'merge gate' .kiro/specs/122-agent-generator/tasks.md  # 17 parents

# Q4 — input-surface comparison
grep -rl '(modified)' .kiro/specs/*/tasks.md | wc -l            # 14 of 153 (65 occurrences)
grep -rho '(reworked)' .kiro/specs/*/tasks.md | wc -l           # 4

# B6 — in-flight population
# specs with BOTH ^- [x] N.  and  ^- [ ] N.  in tasks.md        # 36

# M2 count-parity — per parent, count **Success Criteria:** bullets in tasks.md
# vs criteria rows (table rows / numbered items) in the parent completion doc.
# => 7/15 count-parity; 7 MORE-ROWS (all 122 p10-16, merge-gate class); 1 FEWER-ROWS (122 p18, ABSORB)

# A3 — register entry-id substring check
grep -E '^### ' governance/classification-map.md   # 17 entries; all 4 proposed ids clean, both directions
```

*End [STACY R1].*

---

#### [ADA R1]

Light consult, bound-party angle only (per design-outline.md § "10. Stakeholders and review plan" — "does the three-column form survive contact with token work, where criteria are often mathematical properties whose 'Evidence' is a formula or a validator run?"). Not re-litigating § 3's settled decisions. No item below is BLOCKING; this is a practicality check from the side that will have to live inside the convention.

- **[advisory] Q1 — verbatim mostly fits Rosetta criteria as written today, with one real chafe: cross-platform bundling.** Token-spec `tasks.md` criteria are already close to the dominant 790-occurrence form (`**Success Criteria:**` + single-line bullets — e.g. "All primitive tokens pass modular scale validation," "Generated CSS/Swift/Kotlin values match the registry"). Verbatim reproduction is not a hardship for the math-focused ones. The chafe: a single bullet frequently **bundles three platforms** ("Cross-platform generation produces consistent values" / "CSS/Swift/Kotlin outputs match"). An exact-set verbatim row reproducing that bullet as one ✅ can hide "passed on web and iOS, silently wrong on Android" — the exact same problem Q3 names for product parents, just on the token-generation surface instead of the screen-implementation surface. This spec doesn't need to solve it for Rosetta now (Q3 is scoped to product), but I'd flag it as a **known future instance of Q3's shape**, not a novel one — worth a forward pointer in whichever doc records Q3's resolution so the convention doesn't get re-litigated per-domain later → design-outline.md § "Q3 — The product per-platform status dimension".

- **[advisory] Q1.4 — I support option (c) (strict verbatim + "additional verification" section below).** This is the shape that would have let `122/task-10-parent-completion.md`'s evidence-rich restatement survive, and it's the shape I'd actually use: a math criterion sometimes deserves a worked derivation or an intermediate computed value beyond a bare pass/fail, and (c) gives that a legitimate home without weakening the exact-set predicate. Joining the already-joint Q1.4(c) support recorded in `pre-spec/q5-joint-working-agreement.md` § "(d6) item 1" — noting Thurgood's own countersignature there flags that support as "endorsed at countersignature," not frozen-position — same caveat applies to mine; this is a fresh R1 view, not something staked out before the outline existed.

- **[advisory] Evidence-cell shape fits mechanical criteria well; the edge case is human-review governance criteria.** Formula/validator-run criteria map cleanly onto "command + result" (e.g., `npm test -- TokenMathValidator.test.ts`, all N assertions pass) or "artifact path" (generated CSS/Swift/Kotlin diff). The edge case: token **creation** governance criteria — e.g. "new primitive token approved by Peter per Token Governance" — have no artifact/test/command; the evidence is a decision record (a conversation, a ballot, an approval note), not a mechanically-produced thing. Token creation is one of the few places in the repo where "a human reviewed and approved this" is itself a formal, load-bearing success criterion (steering law: creating ANY token always requires human review). Worth naming as a fourth evidence *kind* — "decision record / approval citation" — alongside artifact path / test name / command+result, rather than treating it as covered by the existing three and hoping it's close enough.

- **[advisory, reads positively] Q5 — from the audited side, RELEASE/SYMPTOM landing on Rosetta specifically makes sense given the actual escape history, not despite it.** Both consumer-reaching escapes named in this outline's own § "1.1" — semantic tokens shipping RGBA, Figma receiving legacy hex for ~3 months — are Rosetta-domain regressions that surfaced as **consumer symptoms**, which is exactly the SYMPTOM trigger's stated purpose (`pre-spec/q5-joint-working-agreement.md` § "1.4"). And the npm-publish cadence (`@3fn/core`, most recently v14.0.0/v14.1.0) makes RELEASE a frequent, real event on my surface specifically — more frequent than most other domains'. I'd rather be the domain the RELEASE trigger is calibrated against than have it be theoretical; this isn't a complaint, it's confirmation the trigger targets the right history.

- **[advisory] Q5 — one routing gap I don't see answered: when a RELEASE/SYMPTOM audit finds MY completion doc's criteria table was wrong, who does the finding come back to for *content* remediation, not just standards remediation?** The joint agreement's EDUCATION trigger (§ "1.4") routes recurring `completion-criteria-parity` failures to Thurgood for *docs/standards* repair — right, per the Civitas three-layer boundary (content correctness stays with the domain agent; Thurgood/Stacy own consistency and infrastructure). But I don't see a symmetric line for "Stacy's audit found Ada's own parent doc misrepresented what shipped" — does that finding route to me directly (I wrote the doc, I'm the one who can correct the record and adjust how I write the next one), or does it only surface via Thurgood's education loop after N instances? For a single-instance finding on my own work, waiting for an N≥3 EDUCATION threshold before I hear about it seems like the wrong latency. Not blocking — likely just an omission in a table that wasn't built with the audited domain agent's inbox in mind — but worth a one-line addition to the trigger table (`pre-spec/q5-joint-working-agreement.md` § "1.4") stating that RELEASE/SYMPTOM/CLOSEOUT findings route to the authoring domain agent directly, in addition to whatever routes to Thurgood for pattern-level repair.

- **[advisory] Nothing else would make the rule unworkable for token-spec completion docs specifically.** The forced-negative line and the exact-set table both fit how I'd write a Rosetta parent completion doc without restructuring existing practice; my only asks above are: name the cross-platform-bundling edge case as a known future Q3 instance, add "decision record" as a fourth evidence kind for creation-governance criteria, and close the routing gap on findings against my own docs.

---

#### [LINA R1]

Light consult, as a bound party (the completion-claims rule binds my future component-spec parent completion docs; the criteria-block convention binds my tasks.md authoring). Reacting to the four items I was asked to weigh, one line each, flagged BLOCKING vs advisory. No item here reopens §3's settled decisions.

- **Q1 — criteria-block convention (advisory).** Option (c) (strict verbatim table + an explicit "additional verification" section below it) is the right call from the author side. I checked the cited exemplar directly (`122/completion/task-10-parent-completion.md`): it's 5 numbered, artifact-dense items against 3 tasks.md criteria — genuinely excellent evidence, genuinely not a verbatim reproduction. That's exactly my own habit on component parents (behavioral-contract criteria compress naturally into "criterion X, verified by contract test Y at path Z, canary N passing"). Option (c) lets me keep that richness while still satisfying an exact-set predicate — I'd fight for (c) over (a)-alone or (b)'s fuzzy-match compromise, since (b) just relocates the judgment into a similarity threshold nobody owns. → design-outline.md § "Q1 — The machine-readable criteria convention", sub-question 4.

- **Q1 — a narrower worry inside the "verbatim" half (advisory).** Component tasks.md criteria are often single-line behavioral assertions ("supports keyboard focus per interaction_focusable", "renders on all three platforms without visual regression") — verbatim reproduction of these is cheap and I don't expect the *rewording* mutation class to be a live risk for well-authored component criteria. My concern is narrower than Q1's framing: criteria that are inherently **compound across platforms** ("component X behaves correctly on web/iOS/Android") don't have a clean single verbatim row once Q3's per-platform dimension applies — the row itself may need to fork. Flagging as an interaction between Q1 and Q3, not a new question. → § "Q1", § "Q3".

- **Evidence-cell shape — mostly covers my domain, with two named edges (advisory).** Artifact path / test name / command+result covers the bulk of component verification cleanly: contract test names (`__tests__/ComponentName.test.ts`), schema validation (`mcp__designerpunk-application__validate_assembly` output), composition checks (`check_composition`), demo-page paths. Two criterion types it doesn't cleanly fit: (1) **visual/subjective criteria** ("matches design intent," "spacing reads correctly") — there's no command whose result is the evidence, only a human sign-off, which isn't naturally artifact-path-or-command-result shaped; (2) **cross-platform parity claims** where a single criterion's evidence is inherently three separate artifacts (three test suites, three commands) — cramming that into one Evidence cell either truncates to one platform's proof or turns the cell into a mini-table, which is really Q3's problem surfacing here first. → design-outline.md § "4.1", § "Q3".

- **Q3 — per-platform status dimension (advisory, leaning option 1).** For component work specifically, per-platform **columns** (`Criterion | Web | iOS | Android | Evidence`) is the shape that matches how the work is actually verified — each platform has its own test suite and its own pass/fail, and a single roll-up ✅ is exactly the shape that let Spec 112's escapes (RGBA shipping, stale Figma hex) hide for months. Option 2 (per-platform evidence cells under one status) reintroduces that same roll-up risk unless the "✅ only if all applicable platforms are ✅" rule is stated and enforced — and that rule is precisely the kind of judgment a mechanical checker can't verify without parsing sub-cell structure. Option 3 (per-platform rows) is cleanest for a checker but triples row count for components with several tri-platform criteria; I'd accept it if the checker genuinely can't handle columns. One scoping note: most of my Stemma component parents are already platform-scoped at the task level (web/iOS/Android are typically separate subtasks or parents, not one parent claiming all three) — so this shape mostly matters for the smaller set of "cross-platform parity" closing parents, not every component parent. Worth confirming with Q3's product framing whether this rider (b) language ("Product-spec parents") is meant to reach system-side Stemma parents too, or only product screens — the outline text scopes it to product parents but component parity claims have the identical failure shape. → design-outline.md § "3.3(b)", § "Q3".

- **Q5 — the audited-side reaction (advisory, one practical gap flagged).** No structural objection — external verification of my completion claims by someone who isn't the standards author is healthy, and I already treat Thurgood's/Stacy's audit findings as trust-by-default input, not adversarial checks. The one concrete gap, surfaced by Q1/Evidence-cell edges above: if Evidence is "command + result," Stacy's ability to *re-run* that command matters for real verification (not just grep-checking the claim's text). For web, that's Jest — reachable. For iOS/Android, that's `xcodebuild`/`gradle` invocations — I'd want to know whether the joint working agreement's source/git reachability (pre-spec/q5-joint-working-agreement.md § "friction (b)") extends to actually running platform toolchains, or whether cross-platform Evidence claims default to "trust the reported result" for two of three platforms. Not blocking Q5's ownership question — it's an execution detail for whoever ends up running claims audits on component parents. → pre-spec/q5-joint-working-agreement.md § "4.1", § "friction (b)".

No blocking items from this domain. All four reactions above are advisory input for the round; Q1/Q3/Q5 remain Peter's/Stacy's/Thurgood's calls per §13.

---

#### [THURGOOD R1]

**Mandatory @ mention pre-step**: scanned this round for `[@THURGOOD]`. **Zero directed mentions.** Two items address me by obligation rather than by mention and are answered below: Stacy's Required-item-5 ask for my **R2 acknowledgment** of the strengthened (d6)(3), and her Required-item-6 completeness note on § 1.4's divergence framing.

**Method**: I re-derived every mechanical claim in this round against the live corpus before incorporating it — including the ones favourable to my own draft, and including the two I was told to verify before considering a decline (B3's 7-of-8 and B5's template finding). Results are stated per item. Where my re-derivation differs from a reviewer's number, I say so and record both rather than adopt silently.

**Disposition summary**: **4 BLOCKING — all 4 incorporated** (B5 mechanically, B6 with one arithmetic correction, B3/B4 as sharpened open questions rather than settlements). **8 advisory — 7 incorporated, 1 (A3) recorded as confirmation with a calibration note.** **Ada: 5 of 5 incorporated** (two folded with Lina's converging item). **Lina: 5 of 5 incorporated.** **Zero declines.** Three contests raised, all against details inside items I otherwise adopted.

---

**BLOCKING items**

- **B3 — INCORPORATED, and independently verified in full.** → design-outline.md § "1.4", § "8 Q1" (sub-questions 4 and new 6), § "4.1"
  - **Verified at source, item by item**: `**Primary Artifacts:**` in **130 of 153** `tasks.md` (confirmed); `merge gate` in **17** of 122's parent blocks (confirmed); and the measurement I was specifically asked to check before considering a decline — **count-parity 7 / 15, with her enumeration exact**: parity at 122 parents 7, 9, 17 and 125-B parents 1–4; **7 MORE-ROWS at 122 parents 10–16**; **1 FEWER-ROWS at 122 parent 18**. I re-derived this independently and reproduced her split exactly, including the per-parent attribution.
  - **The merge-gate mechanism is confirmed by inspection, not inferred.** 122 task 10: tasks.md defines 3 criteria; the doc carries 5 items; items 4–5 ("Diff-against-baseline artifact, ZERO unexplained regressions"; "Lina in the cutover ledger; artifacts diff-guarded") report against that task's `**Merge gate:**` clause and `**Primary Artifacts:**` block. Same shape confirmed at parent 11 (2 criteria → 4 items, items 3–4 merge-gate class) and parent 15 (3 → 6). **A block-scoped exact-set rule would classify faithful reporting of a strictly stronger promise as INVENT.** That is a real defect in the rule as I drafted it, and the 7:1 false-positive-to-true-positive ratio on the baseline population is the correct way to state its cost.
  - **Incorporated as**: § 1.4's shape finding is rewritten — the false-positive surface is attributed to the **promise-surface mismatch** (mechanism) rather than to "penalizing a better artifact" (see A2, conceded); § 8 Q1 sub-question 4 now carries her verbatim-**cell** formulation and the **required-if-applicable** "Additional verification" section as the leading candidate; a new sub-question 6 names the promise surface (`**Success Criteria:**` / `**Primary Artifacts:**` / spec-local gate clauses) as an open design question.
  - **Not settled by me.** Her own counter-argument 1 (this may read as scope creep beyond the criteria table F7 was about) is recorded verbatim in § 8 Q1 alongside the proposal. The narrow reading — scope the checker to the criteria block, treat the 7 as a 122-local idiom — is coherent and cheaper, and it is Peter's or the requirements phase's call, not mine.

- **B4 — INCORPORATED as a sharpened open question, with its § 6.1 tension recorded and carried to Peter.** → § "8 Q1" sub-question 3, § "3.4", § "11"
  - **Verified**: **3 of 153** `tasks.md` define zero success criteria — `054c-figma-token-push-fixes`, **`125-A-pr-gate-mechanical-arming`**, `icon-token-system`. The 125-A instance is confirmed and is the uncomfortable one: the spec that armed the gate this spec extends is, under rider (a) as written, exempt from the rule by silence.
  - **The argument is sound and I do not contest it**: omission is cheaper than dilution, rider (a) makes it self-executing, and the 119-B spec-level pattern exempts *visibly* while omission exempts *invisibly*. Her own honesty note stands with it — the 2% base rate is a pre-rule measurement and her post-rule prediction is a prediction.
  - **Incorporated as**: Q1 sub-question 3 is rewritten from "how does a spec declare itself spec-level" to the **total declaration** form (`criteria-mode: per-parent | spec-level`, no third state), with her cheap hedge recorded as the alternative (first claims audit counts criteria-block *omissions* alongside criteria *vagueness*, converting the prediction into evidence).
  - **Carried to Peter, not settled**: she flagged the tension herself and it is real — a required header on 153 existing `tasks.md` files sits against § 6.1's non-goal ("no change to tasks.md criteria *authorship* standards"). My reading is that declaring a mode is not tightening what a criterion must *say*, so the Goodhart surface § 6.1 protects is untouched — but I am the author of that non-goal and the party whose rule gains reach from the answer, so I record my reading and leave the ruling with Peter. **Added to the outline's Peter-settle list.**

- **B5 — INCORPORATED. Verified at source, and it is the most straightforwardly correct item in the round.** → § "4.2", § "7"
  - **Verified verbatim.** `governance/Process-Spec-Planning.md` Tier 3 states the requirement as *"Confirmation that overall goals are met"* — the standard's own language presumes the finding. I searched the whole Tier-3 region for failure vocabulary: the only ⚠️/❌ occurrences are in an unrelated architectural trade-off block ("Lost" / "Risk"), **none in the criteria structure**. And the worked example's `**Verification**:` field reads *"Created complete directory structure… Implemented TokenSelector… Implemented BuildOrchestrator… All components integrate correctly"* — activity descriptions, not verdicts, exactly as she reports.
  - **The consequence she draws is the right one and it is uncomfortable for my framing**: F7's own words are *"authored from what was done rather than checked against what was promised,"* and the canonical example every agent copies models precisely that. Spec 112's author was following the template.
  - **Incorporated as**: § 4.2 now names the worked example at :2011-2032 as an **edit site** with two content requirements (at least one ⚠️ row with a follow-up link; Evidence cells that are paths / test names / command output, never activity prose), and § 7's inventory row for Process-Spec-Planning carries it. This is a mechanical add — the edit site either is in the ballot's before→after inventory or it is not, and it should be.

- **B6 — INCORPORATED, with one arithmetic correction that cuts slightly against her framing.** → § "6.2"
  - **Verified**: **36** specs currently carry both ticked and unticked parent tasks, and **all 36 define per-parent criteria blocks** (I checked the second half, which her recipe asserts but does not compute). `123-consumer-distribution` has **no `tasks.md`** — a design outline and nine inbound notes, confirmed. The order-of-magnitude understatement in § 6.2 is real: I named two specs where the measured population is 36.
  - **CONTEST (minor, mechanical)**: her B6 text says (ii) "exempts all 36 **plus** 125-B." **125-B is one of the 36** — it appears in my enumeration at `ticked=4 unticked=2`. The correct statement is "all 36, which includes 125-B." Her conclusion is unaffected: (ii) still exempts every spec in the corpus with an authored `tasks.md` and binds only specs whose tasks.md is authored after ratification, of which 123 is the first foreseeable one. I am recording the correction because a ballot is a record and this number will be quoted.
  - **Incorporated as**: § 6.2 is rewritten with the measured population, the corrected option costs (including "(ii) is closer to nullification than to a months-long delay"), her option-(iii) position with the **fixed-string exemption-note** requirement, and her own sunset counter-argument. **The ruling itself stays Peter's** — it was flagged for his outline review before this round and it still is.

---

**Advisory items**

- **A1 — INCORPORATED, with my own re-derivation, which differs from BOTH prior counts.** → § "8 Q1"
  - Measured at incorporation: indented `**Success Criteria:**` = **790** (matches both); `**Success Criteria**:` colon-outside, any indent = **66** (outline: 46 + ~19; Stacy: 62); `##`/`###` headings = **17** (outline: 15; Stacy: 17). Dominant share **≈ 90.5%**.
  - The 62-vs-66 gap is most likely occurrence-counting vs line-counting on lines carrying the string twice. Immaterial to any conclusion, and I am not going to adjudicate it by preference. **Incorporated as**: § 8 Q1's table now carries 790 / 66 / 17 with the discrepancy flagged in a note, and a requirement that the ballot re-derive with a **frozen, quoted recipe** rather than inherit any of the three counts. Her point that the ballot is a record is the reason this is worth a line at all.

- **A2 — INCORPORATED; I CONCEDE the diagnosis, and it was mine to get wrong.** → § "1.4", § "8 Q1" sub-question 4
  - She is right. Strict verbatim does not destroy 122/task-10's substance; it **relocates** it — the verbatim criterion to the `Criterion` cell, the evidence-rich prose to the `Evidence` cell, which is where the rule already demands content. "It penalizes a genuinely better artifact" was a misdiagnosis, and I checked her second claim too: **under option (c) as written the exemplar still fails**, because (c) legitimizes the extra items (4–5, the merge-gate class) and does nothing about the compressed labels in items 1–3. I verified those labels against 122's tasks.md — 125-B parent 1 shows the same house style ("Register exists with compliant header, schema, pilot entries" for "The register exists at `governance/classification-map.md` with compliant header, schema, and the pilot's entries").
  - So the tension I built Q1.4 on was real but **mis-attributed**: the false-positive surface is the promise-surface mismatch (B3), and the adoption cost is reformatting, not quality loss. § 1.4 and Q1.4 are rewritten accordingly, and the outline now says plainly that option (c) alone does not resolve what it was offered to resolve.

- **A3 — RECORDED as confirmation; no outline change, plus one calibration note.** → § "5.5"
  - Her independent check of the entry-id substring constraint confirms mine. I re-ran it: `governance/classification-map.md` carries **17 `###` headings, of which one is `### Illustrative Example (documentation, NOT a register entry)`** — so **16 actual entries**, not 17. Neither her verdict nor mine changes (no collisions, no substring relations, either direction, including among the four proposed ids), but § 5.5's "all 17 existing entries" is off by the illustrative header and is corrected to 16 in the outline. A confirmation item that carries a small correction of my own text is worth more than a silent pass.

- **A4 — INCORPORATED.** → § "9.2", § "5.3"
  - The caveat sentence is promoted: § 5.3's register-row rationale now carries it, and § 9.2 states that the ballot's own framing must carry it. This is the joint (d8) obligation applied to the artifact a ratifier actually reads. I am the author of the sentence and I agree it was filed where it would not be found.

- **A5 — INCORPORATED; all three verified.** → § "7"
  - **Path**: `verify-gate-registration.sh` is at **`tools/agent-generator/`**; `scripts/` contains only `relocation-integrity-gate.ts`. Confirmed — my inventory error.
  - **False Q5 dependency**: confirmed at source. Thurgood `writeScope` = `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`; Stacy's is a subset of that. Neither covers `scripts/**`, `governance/**`, or `.github/workflows/**`, so checker authorship does not follow Q5 under either answer. The cell now reads *"scoped write grant required — tasks phase."*
  - **Gate-registration row's owner**: now reads `Thurgood — bound to the arming unit (U3)`, per the countersignature's own C4-5.
  - Fixed in the artifact Peter reads, as asked — these are staleness relative to the joint agreement, not fresh errors, but § 7 is what a before→after inventory gets built from.

- **A6 — INCORPORATED as the pointer swap, and nothing more.** → § "8 Q5", § "13"
  - § 8 Q5's body is replaced by a pointer to `pre-spec/q5-joint-working-agreement.md` (with the two frozen positions named), the handling note is kept verbatim, and the R1 Q5 items from all three reviewers are listed as **carried, unadjudicated**.
  - **The conflict is on the record and she put it there**: her own counter-argument 5 says *"I am a named party to Q5 and I am recommending that the outline's Q5 section be replaced by a document I co-authored… I should not be the one who decides that my own agreement replaces his framing."* I am the other named party, so I am not the one who decides it on the merits either. **What I applied is the mechanical half only**: the outline's pro/con list contains statements that are verifiably stale against a committed record (AGAINST-4's register-`owner:` dependency is resolved by friction (a); AGAINST-1's one-sentence test has drafted text in § 1.1), and leaving verifiably stale text in the artifact Peter rules from is a defect regardless of who benefits. Swapping a stale summary for a pointer to the full record **enlarges** what Peter reads rather than filtering it — which is the opposite of the move a conflicted party would make to advantage himself. FOR-3 (load) is not deleted by me; it is recorded as **declined by both named parties on the merits**, in both parties' own words, which is what the record says.
  - If Peter reads this as a conflicted party trimming his own question's framing, the remedy is trivial and he should take it: restore § 8 Q5's body from git and read both.

- **A7 — INCORPORATED.** → § "9.1", § "1.4"
  - M2 is no longer "unmeasured at baseline." **7 / 15 (47%) count-parity**, reproduced exactly by me (above, B3), with both of her caveats carried because both cut against the number's comfort: count-parity is an **upper bound** on verbatim parity, and the single true-positive is a merge rather than a concealment. I verified the upper-bound caveat directly — 125-B parent 1 has exact count parity and compressed, non-verbatim labels, so **true verbatim M2 is plausibly near 0/15** is the honest reading, not a rhetorical one.

- **A8 — INCORPORATED as a sixth mutation class; the CLASS is right, the INSTANCE's severity is CONTESTED.** → § "1.2"
  - **Class: adopted.** 122 parent 18 is 5 tasks.md criteria → 3 numbered rows, verified. Content-present-but-not-individually-enumerated is genuinely distinct from drop and from reword, it is what compression pressure produces in a good-faith author, and exact-set parity catches it cleanly — which is a point in the checker's favour, as she says.
  - **CONTEST on the instance.** Her text says criteria 4 and 5 are *"folded into row 3's prose"* and that *"the prove-it-bites record and the recurrence guard each vanish into a summary verdict."* At source, the doc gives **OB-8 and OB-9 their own dedicated `##` sections immediately below the criteria list**, and the OB-8 section states the prove-it-bites record explicitly: *"**Prove-it-bites recorded** as a unit test (`canonical-vs-truth.test.ts` — a stale not-yet-ported → FAIL)."* It did not vanish. Of the two, only OB-9's *"a lightweight recurrence guard is considered"* is thinly discharged (the nearest thing is a per-lock rationale comment).
  - **Why the contest matters rather than being pedantry**: the accurate statement of ABSORB's harm is *not* "evidence disappears" — it is "**the enumerated set stops mapping 1:1 to the promise set, so neither a checker nor a reader can tell which promises were verified without reading the whole document.**" That is a weaker claim than hers and a better argument for the rule, because it survives the case where the author did everything right. § 1.2 records the class in those terms, with the instance corrected.

---

**Ada's items — 5 of 5 incorporated**

- **Fourth evidence kind — INCORPORATED**, and **merged with Lina's converging edge**. → § "4.1"
  - Ada's case (token-creation governance criteria whose evidence is a human approval, per the always-loaded token-governance law) and Lina's case (visual/subjective criteria discharged by human sign-off) are the same gap from two domains. § 4.1's Evidence definition now reads **artifact path · test name · command + result · decision record or approval citation**, with the constraint that a decision record must cite a locatable record (ballot path, dated approval note, commit), not an unlocatable assertion — otherwise the fourth kind becomes the prose-only-evidence escape hatch the third column exists to close. Recorded as my amendment to their ask, for them to attack at R2.
- **Cross-platform bundling as a known future Q3 instance — INCORPORATED.** → § "8 Q3"
  - A single token-spec criterion bundling three platforms ("CSS/Swift/Kotlin outputs match") has the identical failure shape as the product per-platform case. Recorded in Q3 as a **known system-side instance**, so Q3's resolution is written once and pointed at rather than re-litigated per domain. This converges with Lina's rider-(b)-scope question below; the two are recorded together.
- **Q1.4 option (c) support — RECORDED.** Noted with Ada's own calibration that this is a fresh R1 view, not a frozen position — as is mine. Option (c) is now the leading candidate **as amended by B3/A2** (verbatim cell; required-if-applicable additional-verification section), which is materially different from (c) as offered; Ada and Lina should re-test their support against the amended form at R2.
- **Q5 reads-positively item — RECORDED** in the Q5 carried-items list, unadjudicated.
- **Finding-routing gap — INCORPORATED as a carried open item; explicitly NOT adjudicated.** → § "8 Q5" carried items
  - The gap is real and well-stated: the trigger table routes recurring parity failures to me for education repair, but has no line for "the audit found *this* agent's completion doc misrepresented what shipped," and waiting for an N≥3 education threshold is the wrong latency for a single-instance finding against a domain agent's own work. **I am not resolving it**, because the trigger table is the Q5 instrument and I am a named party. Carried to Peter with Ada's proposed one-line addition (findings route to the authoring domain agent directly, in addition to the pattern-level route) recorded verbatim.

**Lina's items — 5 of 5 incorporated**

- **Q1 option (c) support — RECORDED**, with the same amended-form caveat as Ada's.
- **Q1 × Q3 interaction (compound cross-platform criteria may need the row to fork) — INCORPORATED** as an explicit interaction note in both § 8 Q1 and § 8 Q3. It is the same structural point Ada raises from the token side, and it is the reason Q3's shape decision reaches back into Q1's convention rather than sitting downstream of it.
- **Evidence-cell edges — INCORPORATED**: the human-sign-off edge is folded into the fourth evidence kind above; the multi-artifact cross-platform edge is recorded in Q3 as an argument bearing on option 2 (one Evidence cell cannot hold three platforms' proofs without becoming a nested table).
- **Q3 leaning option 1 (per-platform columns) — RECORDED alongside Stacy's competing position, both intact.** These genuinely disagree: Stacy proposes **no new table shape** (product parents discharge through the existing per-platform Implementation Reports plus a one-sentence roll-up rule); Lina argues from component practice that per-platform **columns** match how the work is actually verified and that a roll-up ✅ is the exact shape that hid 112's escapes. **I am not picking.** Q3 records both with their strongest arguments, plus Stacy's own instruction that Leonardo's R1 should be weighted above hers on the product side, and Lina's observation that most Stemma parents are already platform-scoped at the task level so the shape binds a smaller set than it appears to.
- **Rider (b) scope question — INCORPORATED as a new Q3 sub-question, flagged for Peter.** Rider (b) as settled says "product-spec parents"; Lina asks whether it reaches system-side Stemma parity parents, whose failure shape is identical. This is a **scope question about a settled rider**, which is exactly the "execution consequence of a settled decision" the Context for Reviewers invites, and it is not mine to answer by construction. Recorded in Q3 and added to the Peter-settle list.
- **Platform-toolchain re-verification gap — INCORPORATED as an execution fact, Q5-independent.** → § "8 Q5" carried items
  - If Evidence is "command + result," a claims auditor's ability to **re-run** the command is what separates verification from grep-checking the claim's text. Jest is reachable; `xcodebuild` / `gradle` are not, in this environment, for anyone. This is the same **class** as the joint agreement's § 4.1 write-scope gap — a capability fact that holds under every Q5 answer — and it belongs to the tasks phase regardless of who owns the audit. Recorded as such, with the honest statement of the consequence: **for two of three platforms, "command + result" Evidence is trust-the-reported-result today, for any verifier.** That is a limit on the instrument, and § 5.3's honest-reach obligation ((d6)(7)) says it gets written down rather than discovered later.

---

**The baseline dispute — her concession accepted, and my own alternative conceded in return**

- **Her 27% withdrawal is accepted, and her root-cause reconstruction is accurate.** I re-confirmed the in-scope derivation independently at incorporation: the 7 in-scope parent docs with no criteria section at all are 122 parents 1–6 and 8 (zero occurrences of the string), which is exactly how 22 − 7 = **15** arises. Her nine-row confirmation table of my figures reproduces mine.
- **Her completeness note against her own favour is adopted.** § 1.4 said the numerators "broadly agree." They did not — her 18 was inflated by the same contamination that deflated her percentage. § 1.4 now states the correction plainly rather than as a divergence between two defensible readings. She is right that the generous framing was the wrong one, and I wrote it.
- **I CONCEDE the confound against my own § 12 alternative, and it is a real defeater.** My recorded alternative was: ship parts 1–2 by ballot, let the first M4 reading decide whether the checker is needed. Her argument is that **M4 = 0/22 is a template defect, not an adoption failure** — which B5 now establishes at source (the Tier-3 standard offers no failure vocabulary outside the Blocked Task format) — so the first post-ballot M4 reading measures *whether agents used a line the template newly provides*. That will be high, it measures the prose fix's own success, and reading it as "the checker is unnecessary" would be a Goodhart error committed by the spec that names Goodhart as the next audit's first question. **The trigger is confounded by the fix that ships with it.** I cannot rescue the alternative in its stated form and I am not going to try.
  - What survives is the version she reconstructed: the deferral question, if asked at all, must be triggered on **M2/M3** — the dimensions the ballot alone cannot move — which is her Q2 condition (b), not my M4. § 12 is rewritten to record the alternative **as defeated in its original form**, with the surviving M2/M3 variant attributed to her. My § 12 paragraph stays in the record as I wrote it, with the defeat recorded beneath it; deleting a counter-argument because it lost is not how that section works.
  - **What does NOT change**: none of this reopens § 3.1. The checker is built in this spec under every option on the table.

**Stacy's R2 ask — acknowledged.** Her strengthening of the joint agreement's (d6)(3) — the criteria-mode declaration must be **total** (`per-parent | spec-level`, no third state), not merely mechanical for the spec-level case — is an addition to an obligation I countersigned, and she correctly predicted it is the item most likely to be lost in transcription because it looks like a restatement. **I acknowledge it explicitly, as asked, and it did not get lost**: it is carried into Q1 sub-question 3 as the leading candidate and flagged to Peter with its § 6.1 tension. I accept it as my obligation to author *if* Peter rules that way; I do not accept it as settled by the two of us, for the same reason the agreement itself says nothing settles by our agreeing.

---

**Carried to Peter's outline settle** (the batched decision list, now five items):

1. **Q2** — arming timing. Now three options, not two: build-and-arm-at-campaign-close; arm immediately; **Stacy's arm-on-convention-adoption-evidence variant** (conditions (a)–(d), with (c) self-flagged as droppable optimization). Recorded side by side, unranked by me.
2. **Q5** — ownership. Untouched on the merits. Pointer to the joint agreement + the two frozen positions; three reviewers' Q5 items carried unadjudicated; the handling note binds.
3. **§ 6.2** — in-flight specs. Corrected population (36, including 125-B), corrected option costs, Stacy's option-(iii)-plus-fixed-string-exemption position and her own sunset counter-argument.
4. **B4's § 6.1 tension** (new) — does a total `criteria-mode` declaration on 153 `tasks.md` files count as the `tasks.md`-authorship-standard creep § 6.1 rules out? My reading says no; I am the conflicted party on that reading.
5. **Lina's rider-(b) scope question** (new) — does the per-platform status dimension reach system-side Stemma parity parents, or only product-spec parents?

**Three contests raised, all inside items I adopted**: B6's 36-plus-125-B double count; A8's instance severity (the prove-it-bites record is present, in its own section); A3's "17 entries" (16 entries plus an illustrative header — my own § 5.5 text corrected). **Zero declines** — every item in this round survived verification, including both items I was told to verify before considering one.

*End [THURGOOD R1].*

---

## R2 Round — the 2026-09-19 requirements-phase resolutions

### Context for Reviewers (R2)

**What is under review — ONLY the `RESOLVED (Peter, 2026-09-19)` blocks** in design-outline.md § 8 (Q1, Q3, Q4) plus the header's working-session note and the § 13 rows. Everything else is settled law (the 2026-09-17 ballot) or R1-incorporated — do not re-litigate.

**How the resolutions were made.** Peter worked the open items one-by-one in dependency order (Q1's six-decision stack → Q3's product side → Q4) at a 2026-09-19 working session and ruled each. The resolutions bind the requirements formalization and **ratify finally at the law ballot** (record-first, § 3.5). This round attacks execution consequences, checks the recorded residual lists for completeness, and delivers three reserved items:

- **Ada, Lina**: the reserved **(c′) re-test** — your R1 support was given to (c) as offered; (c′) verbatim-cell (§ 8 Q1 RESOLVED item 6) is materially different. Also weigh **decomposition-first** (item 8) against your own domains: Ada, your bundled token-generation criteria decompose against the registry as common reference — does that survive contact with real Rosetta criteria? Lina, decomposition answers your roll-up objection at the root — does it, and does the flat-bullet row multiplication stay livable on parity-closing parents?
- **Leonardo**: your Q3 input, not received at R1, **weighted above Stacy's on the product-side shape** (her standing instruction). The resolution binds uniform decomposition as a **default with a named revisit** at your first product spec's tasks round. You can overturn the default in this round, before the ballot.
- **Stacy**: the promise-surface adoption reshapes your B3 (AV shape: gate rows + artifact forced-negative line); Q3 drops your roll-up sentence while keeping the Implementation-Report substrate; Q4 carries two pins on your reshape (delta-scoping; emit-exclusions). Verification-grade review of the resolution blocks against their cited sources is your lane; the walk's new sub-decisions (declared-none, canonical-form materially-amended) touch your B4 and A-3 directly.

**Method note**: each resolution was produced under a counter-argument fold-back discipline; the residuals each block records are claims — check them for completeness and accuracy.

**Write mechanics**: reviewers return feedback text; Thurgood transcribes with stamps preserved (R1 precedent). Stamp format `[AGENT R2]`; reference `design-outline.md § "8 Q1 RESOLVED item N"` style.

[Agent feedback rounds below]
