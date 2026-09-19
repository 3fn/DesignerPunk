# Design Outline: 127 — Completion-Claims Integrity

**Date**: 2026-09-13
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: **SETTLED (2026-09-17) — all seven docket items ruled; requirements phase open. Requirements-phase decisions RULED in working session (Peter, 2026-09-19); R2 round COMPLETE same day — 4 reviews, 3 blocking items ruled by Peter and folded at the `R2 FOLD` blocks (§ 8), 13 advisories incorporated. requirements.md may be authored.**

> **OUTLINE SETTLE — Peter, sitting held 2026-09-15 → 2026-09-17.** All seven docket items were ruled in session: the five batched R1 items below (**Q2**, **Q5**, **§ 6.2**, **B4 / § 6.1**, **rider (b)'s reach**) plus two open items routed out of the 125-B wave-3 fold (**O-3**, **O-8**). The ruling of record is the ballot:
>
> **`.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md`** — RATIFIED (Peter, 2026-09-17).
>
> Each section below carries a **`RULING (Peter, 2026-09-17)`** block stating its ruling verbatim-in-substance and pointing at the ballot. **The ballot is the authority; these blocks are pointers into it.** Where a section's pre-settle body and its ruling block disagree, the ruling block governs and the body is preserved as the record of what was argued.
>
> **Verification review performed** (Stacy, 2026-09-17, verification-grade claims-vs-source — `pre-spec/ballot-review-stacy.md`): **2 blocking + 6 advisory against the ballot; both blockers fixed, five advisories applied, one routed to the requirements phase.** Nothing in the rulings was contested — the findings were transcription and compilation defects in the record itself. Her structural lesson is carried at **ballot § 17.3**: *the transcription risk is highest where the transcriber is most confident of the source.*
>
> **The sequential formalization gate advances**: requirements.md may now be authored. **Q1, Q3 and Q4 remain requirements-phase work** — rulings 4 and 5 bear on Q1.3 and Q3 respectively, and settle nothing else about them — **plus one named definitional item: "materially amended" in ruling 4** (ballot § 7, Stacy A-3), which the rule-text formalization owns.

> **R1 round complete** — Stacy (REQUIRED, 4 BLOCKING + 8 advisory + a withdrawn baseline figure), Ada and Lina (light consults, 5 advisory each). All four blockers incorporated; **zero declines**; two concessions by this author (the exemplar misdiagnosis; the ship-parts-1–2 alternative, defeated by a confound in its own trigger). Full round + per-item disposition: `feedback/design-outline.md`. Leonardo's Q3-only review not yet received.
>
> **BATCHED DECISION LIST FOR PETER — five items, ALL RULED 2026-09-17** *(list preserved as authored; each item's ruling is in its own section's `RULING` block and in the ballot)*:
> 1. **Q2 — arming timing.** Three options now: arm at campaign close (0 boundary charge) · arm immediately (2 of K=3) · **arm on convention-adoption evidence, capped by the next release publish** (Stacy R1; conditions (a)–(d), with (c) self-flagged as droppable optimization). → §8 Q2
> 2. **Q5 — ownership of execution-claims verification.** Untouched on the merits; the author is a named party and does not self-adjudicate. §8 Q5 now points at the joint working agreement and both frozen positions rather than summarizing them, with five carried R1 items recorded unadjudicated. → §8 Q5
> 3. **§6.2 — what binds in-flight specs.** Corrected population: **36 specs**, not 2. Option (ii) is near-total nullification, not a months-long delay. Stacy's option-(iii)-plus-fixed-string-exemption position and her own sunset counter-argument are recorded. → §6.2
> 4. **B4's §6.1 tension (new).** Does a total `criteria-mode: per-parent | spec-level` declaration on 153 `tasks.md` files count as the authorship-standard creep §6.1 rules out? → §6.1, §8 Q1.3
> 5. **Rider (b)'s reach (new, Lina R1).** Does the per-platform status dimension bind **system-side Stemma parity parents**, or only product-spec parents? → §8 Q3
>
> **Not on the list, deliberately**: Q1, Q3 and Q4 are sharpened but remain the **requirements phase's** work under the sequential gate — Q1's leading candidate (c′) and Q3's two opposed positions are recorded for R2, not for a ruling now.
> **REQUIREMENTS-PHASE WORKING SESSION — Peter, 2026-09-19.** The three open questions (Q1, Q3's shape, Q4) plus the named definitional item ("materially amended") were worked through in session, one-by-one in dependency order (Q1 → Q3 → Q4, most-depended-upon first), and **ruled by Peter**. Resolutions are recorded in `RESOLVED (Peter, 2026-09-19)` blocks in § 8 and in § 13's table. These are requirements-phase decisions: they bind the formalization and **ratify finally at the law ballot** (record-first, § 3.5) — they do not amend the 2026-09-17 settle ballot. **An R2 feedback round on these resolutions precedes requirements.md**: Ada and Lina owe the reserved (c′) re-test, and Leonardo owes his Q3 input (weighted above Stacy's on the product side, per the standing instruction). Method note: each resolution was produced under a counter-argument fold-back discipline — the counter-argument is run against the proposal before presentation, absorbed where it genuinely improves it, and the **surviving residuals are recorded in each block**; reviewers should check the residual lists for completeness. (A practice amendment to AI-Collaboration-Principles codifying the discipline is queued as its own governance PR and is not 127 material.)

**Origin**: `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` § F7 — the audit's only undisposed item. Peter's adjudication session, 2026-09-13, ruled the full package; this spec is that ruling's execution.
**Pre-spec inputs (committed, cited throughout)**:
- `pre-spec/stacy-consult-2026-09-13.md` — adversarial process-governance review (B1/B2 blockers, compliance measurement, rot modes, ballot-form finding)
- `pre-spec/thurgood-consult-2026-09-13.md` — execution mechanics (placement, prune-scar constraint, register discipline, draft rule text)

---

## 1. Problem — what failed, and how we know

### 1.1 The finding (F7, verbatim in substance)

From the Spec 112 completion-claims audit (2026-09-12, verification-grade, claims-vs-source over all 25 ticked items):

> **F7 — A structural pattern in the parent docs: unmet criteria are dropped, not marked failed.** Parents 4 and 6 each present a criteria table with **fewer rows than tasks.md defines**, and in both cases the omitted rows are precisely the unmet ones. Parent 6 additionally reworded "All semantic pairs **pass** WCAG AA" to "**evaluated** against" and restated ΔE₀₀ <1 as <3, both marked ✅. No row in any Spec 112 parent doc is marked ⚠️ or ❌. The verification tables were authored from what was done rather than checked against what was promised.

The audit's Closing Assessment establishes this is a pattern, not a one-off: **five unshipped-work findings, four still open, four sharing one signature** — *a tested utility module is created, the existing seam it was meant to modify is never touched, and the parent's success-criteria table asserts the seam works.* **Two of those escapes reached consumers** (semantic tokens shipping RGBA in v12.0.3; Figma receiving legacy hex for ~3 months). The proximate mechanism is F7: self-attested parent verification tables with no promised-vs-shipped check.

### 1.2 The mutation classes (Stacy B1 — five; Stacy A8 at R1 — six)

The Spec 112 ground truth, task 6: 5 tasks.md criteria → 4 doc rows. Observed mutations: **drop** (green success.text; Spec 106 contract test), **reword** ("pass" → "evaluated"), **relax** (ΔE₀₀ <1 → <3), **omit-doc** (F6's four missing completion/summary docs), and **invent** — parent 6's table contains a row ("Intentional changes documented ✅") that exists nowhere in tasks.md. Fabrication is the fifth class, and it is the reason the rule must be **exact-set** (none dropped, none added), not merely "reproduce all rows."

**Sixth class, added at R1 (Stacy A8) — ABSORB.** `122/completion/task-18-parent-completion.md` presents **3 numbered rows against 5 tasks.md criteria**, and the two missing criteria (OB-8's sharpened C7(b) check with a prove-it-bites record; OB-9's owner audit plus "a lightweight recurrence guard is considered") are not *dropped* — they are absorbed into a summary verdict in row 3 ("OB-8, OB-9 marked CLOSED"). Distinct from **drop** (content is present), distinct from **reword** (the count changes), and it is what compression pressure produces in a good-faith author.

*Instance correction, verified at incorporation (Thurgood R1 contest):* the R1 item states the two promises "vanish into a summary verdict." At source they do not fully vanish — the doc gives **OB-8 and OB-9 their own `##` sections** immediately below the criteria list, and the OB-8 section records the prove-it-bites test explicitly by path. Only OB-9's recurrence-guard sub-promise is thinly discharged. **The accurate statement of ABSORB's harm is therefore weaker than "evidence disappears" and a better argument for the rule**: the enumerated set stops mapping 1:1 to the promise set, so neither a checker nor a reader can tell which promises were verified without reading the whole document. It survives the case where the author did everything right — and exact-set parity catches it cleanly, which is a point in the checker's favour.

### 1.3 Why prose alone will not hold (the enforcement gap)

Stacy's S1 finding, and the load-bearing one: **the binding constraint is rule NON-ENFORCEMENT, not rule absence.**

- `governance/Process-Spec-Planning.md:1818-1853` **already mandates** per-criterion Success Criteria Verification — Criterion → Evidence → Verification → Example, with a worked template at :2011-2032. Spec 112 shipped a two-column `Criterion | Status` table. The stronger standard existed and was silently narrowed.
- **No required check reads completion docs.** All six workflows enumerated (`agent-generator`, `consumer-guard`, `lane-timing`, `package-name-drift`, `section-citations`, `tool-boot-smoke`); none parses a completion doc. The PR gate closed the no-review-at-all half; it does not read a criteria table.
- The audit practice that caught this is **retrospective and unscheduled** — it found 112's defects three months late, and two of the five escapes were found by consumer symptoms rather than by us.

### 1.4 Compliance baseline — measured, and RESOLVED at R1

> **Status: the divergence recorded in the draft is resolved.** Stacy's consult figure of **27%** is **withdrawn by its author** (Stacy R1, § "Baseline dispute") on a reconstructed arithmetic error: her denominator of 66 was *all documents added under `.kiro/specs/**/completion/**` since 2026-07-01 minus subtask docs*, which left **25 documents that are not completion docs at all** (24 of them 125-B campaign working artifacts — datasets, probe evidence, closeouts — plus one 122 memo) in a denominator purporting to count parent completion docs. Every one of the 25 is a guaranteed zero on both numerators. **The number does not survive for any part of the argument and is retired**: cite **39% corpus-wide** and **68% in-scope**.
>
> The figures below are **this outline's original derivation, independently re-derived by Stacy at R1 (nine-row confirmation table, all nine confirmed) and re-confirmed again at R1 incorporation.** The in-scope population's construction was verified end-to-end: the 7 in-scope parent docs carrying no criteria section at all are 122 parents 1–6 and 8 (zero occurrences of the string), which is exactly how 22 − 7 = 15 arises.
>
> **One correction against this document, adopted from Stacy's R1 Required-item-6 and made against her own favour:** the draft said the two readings' numerators "broadly agree (16 vs 18)." They did not. Her extra two section-hits came from the same 25 contaminating artifacts that deflated her percentage — documents mentioning "Success Criteria" in passing while not being completion docs. **This was a correction, not a divergence between two defensible readings**, and the ballot must state it as one.

**The measurement** — recipe recorded so the number is auditable and re-runnable at each health check:

```
git log --diff-filter=A --since=2026-07-01 --name-only --pretty=format: \
  -- '.kiro/specs/**/completion/**' \
  | grep -E '/task-[0-9]+(-parent)?-completion\.md$' | sort -u
```

| Population | n | w/ any criteria section | w/ any ⚠️/❌/Partial/"not met" |
|---|---|---|---|
| All parent-shaped docs added since 2026-07-01 (both naming forms) | 41 | 16 (39%) | 2 (5%) |
| **In-scope only** (parents in specs whose tasks.md defines **per-parent** criteria — 122 + 125-B) | **22** | **15 (68%)** | **0 (0%)** |
| Out of scope by the ruling's own rider | 19 | — | — |

The out-of-scope 19: **119-B** (10 parents — spec-level criteria, `## Success Criteria (spec level)`, discharges at closeout per rider (a)); **125-A** (8 parents — its tasks.md defines **zero** per-parent Success Criteria); **126** (1 parent — issue-driven, no tasks.md at all).

**What the corrected baseline means for the package's three parts** — they are supported with *different force*, and saying so is the point of measuring at all:

- The base-rate argument for mechanizing **section presence** is **weak**: at 68% in-scope the checker would arm on a population that already mostly complies in form.
- The argument for the **forced-negative line** is **strong**: **zero** in-scope parent docs since the PR gate carry any failure vocabulary. Stacy B5 establishes *why*, at source: the Tier-3 standard states its requirement as *"Confirmation that overall goals are met"* and offers no ⚠️/❌ vocabulary anywhere outside the Blocked Task format. **M4 = 0/22 is a template defect, not an adoption failure.** Agents did not decline to write "unmet" — the template gave them nowhere to write it.
- The argument for the **evidence cell** is **stronger still**: of the 15 in-scope docs carrying a criteria section, **5 mention "Evidence" anywhere in the document** and **4 mention "Verification"** — the existing Tier-3 standard's own required structure appears in at most a third of the docs that attempt the section.
- **M2 — the dimension the checker actually targets — is now measured** (Stacy A7, reproduced exactly at incorporation): **count-parity 7 / 15 (47%)**, with both caveats carried because both cut against comfort — count-parity is an **upper bound** on verbatim parity, and true verbatim M2 is plausibly near **0/15** (125-B parent 1 has exact count parity *and* compressed, non-verbatim labels). The checker is therefore **not redundant**; parts 1–2 alone would leave this dimension unmeasured and unmoved.

**The shape finding that matters most for design — RE-DIAGNOSED at R1 (Stacy B3 + A2; original diagnosis conceded as wrong):**

The draft said strict verbatim "penalizes a genuinely better artifact," citing `122/completion/task-10-parent-completion.md` (5 evidence-bearing items against 3 tasks.md criteria). **That was a misdiagnosis and it is withdrawn.** Two corrections, both verified at source:

1. **Strict verbatim does not destroy the exemplar's substance; it relocates it.** The verbatim criterion goes in the `Criterion` cell and the evidence-rich prose goes in the `Evidence` cell, where the rule already demands content. The cost is reformatting, not quality loss (Stacy A2).
2. **The real false-positive mechanism is a promise-surface mismatch, not authorial excellence** (Stacy B3). The rule and the checker read one block — `**Success Criteria:**`. But `tasks.md` carries binding promises in other blocks: `**Primary Artifacts:**` appears in **130 of 153** `tasks.md` files, and 122 puts a `**Merge gate:**` clause in **17** parent blocks stating conditions strictly *stronger* than its success criteria. The exemplar's items 4–5 are **not freelance additions** — they report against task 10's merge gate and Primary Artifacts (confirmed by inspection; same shape at parents 11 and 15). A block-scoped exact-set rule classifies them **INVENT** — the mutation class that exists to catch *fabrication* — firing on faithful reporting of a stronger promise.

**Measured, not argued:** of the 8 in-scope count-parity failures, **7 are MORE-ROWS and all 7 are 122 cutover parents reporting against the merge gate**; exactly **1** is a genuine FEWER-ROWS failure (122 parent 18, the ABSORB case — §1.2). A checker built to the current input scope would arm at a **7:1 false-positive-to-true-positive ratio on the baseline population**, with every false positive landing on the best-behaved spec in the corpus. That is how a barrier earns distrust in its first week.

Both consequences feed **Q1** (now sub-questions 4 and 6): the input scope must name `tasks.md`'s full promise surface, and "current best practice" is neither the target format nor the obstacle it was described as.

### 1.5 What the rule must catch, and what it cannot (Stacy B2 — catch-rate honesty)

Scored against the audit's 12 discrepancies, verbatim transcription alone catches **2 of 12**. It does not catch:

| Class | Instances | Why transcription misses it |
|---|---|---|
| False ✅ on a reproduced row | parents 3, 5, 5.1, 7 | Verbatim transcription is fully compatible with a false mark |
| Doc absence | F6's 4 missing docs | No table exists to police |
| Unshipped work (incl. **both consumer-reaching escapes**) | 5 findings | The claim never contradicts the doc's own text |

This is precisely why the ruling is a package rather than a template edit, and why **F7 is recorded as addressed-by-this-spec, not closed by transcription alone** (Stacy B2; §3.6).

---

## 2. What Spec 127 IS

Spec 127 delivers, as one coherent governance-law change plus one mechanical check:

1. **Restored + amended process law** — parent completion docs must reproduce their tasks.md success criteria as an **exact set**, each row carrying a **Status** and a **mandatory Evidence cell**, plus a **forced-negative line** that silence cannot satisfy.
2. **A mechanical arm for the half that is mechanically decidable** — `completion-criteria-parity`, built in this spec, registered in the classification map, armed per Q2's timing decision.
3. **Register entries for the halves that are not** — the `(modified)`-vs-diff check registered as proposed/deferred; verification honesty registered as ideological with an explicit record that **no check owns it**.
4. **A record-first ballot** as the recording form, since this amends process law binding every agent on every parent task.

**Spec 127 is NOT** a re-audit, a backfill, or a re-litigation of the 112 findings (all disposed; see the audit's annotated ledger).

---

## 3. Settled decisions — Peter, 2026-09-13 (not reopened here)

Recorded as decided. The feedback round may surface execution consequences of these decisions; it does not reopen them.

### 3.1 Full package, not the light alternative

Peter's reasoning, recorded: (1) evidence of the issues already exists — the audit plus the measured base rate; no need to re-measure before acting; (2) **the dangerous failure channel is false assertion, not silence** — "we can't detect what quietly persists," and silence is at least visible; (3) prose-only rules run at a demonstrated low compliance rate. **Prose and mechanical arm land together.**

*(Outline note, §1.4 — updated at R1: the 27% base-rate figure that reasoning cites has been **withdrawn by its author** as arithmetically wrong; the corrected in-scope figure is 68%. The conclusion is unaffected and is strengthened on the forced-negative and evidence-cell dimensions, and the checker's own target dimension is now measured at 47% count-parity ceiling / plausibly near 0% verbatim. Recorded for completeness, not as a challenge.)*

### 3.2 The package = Stacy's modified form (three parts)

1. **Exact-set verbatim criteria table** with three mandatory columns — `Criterion (verbatim) | Status (✅/⚠️/❌) | Evidence (artifact path, test name, or command + result)`. A ✅ with an empty or prose-only Evidence cell is **non-compliant on its face**. *(R1 additions to the Evidence definition — a fourth kind, and two recorded edges — are in §4.1; the R1-sharpened questions about the match predicate and the input scope are Q1. This clause records what was **settled**; §4.1 carries the current draft text.)* Restores `Process-Spec-Planning.md` Tier 3 and amends `completion-documentation-guide.md`. This is a **deliberate, recorded trade** of the current 4-part prose form's depth for a form that can actually be complied with and checked.
2. **The forced-negative line**, imported from `Product-Handoff-Protocol.md:83-101`: `Unmet or partially met criteria: None / or list each with follow-up link.` Cannot be satisfied by silence. (Stacy: the part to keep if only one is kept.)
3. **Staged mechanization** — **BUILD** the `completion-criteria-parity` checker in this spec (precedent: `section-citation-resolution`, a pure-fs markdown scan that went proposed → Peter-armed with a register row); **REGISTER** the `(modified)`-vs-diff check as proposed/deferred; **REGISTER** verification honesty as ideological with an explicit "no check owns this" record. Optionally the cheap F6-class doc-existence check (parent ticked ⇒ completion + summary docs exist).

### 3.3 Scoping riders

- **(a)** Binds parents whose tasks.md defines **per-parent** criteria. Specs using spec-level criteria (the 119-B pattern) discharge **once at closeout**.
- **(b)** Product-spec parents carry a **per-platform status dimension** — a single ✅ must not hide "met on iOS, unmet on Android." (Shape is Q3.)
- **(c)** **No backfill.** Historical completion docs stay as written (F6's disposition: back-filled completion docs would be exactly the unverifiable self-attestation this work is about).

### 3.4 The Goodhart rot mode is named in the ruling

**Criteria-dilution upstream** — vaguer tasks.md criteria so nothing can be unmet — is invisible to any doc-vs-tasks parity check, because both sides move together. It is named in the ruling as **the next completion-claims audit's first question**. (Full rot-mode ladder: §11.)

**R1 addition (Stacy B4 — BLOCKING): criteria OMISSION is the cheaper sibling, and rider (a) makes it self-executing.** A `tasks.md` defining **no** per-parent criteria is exempt from the entire rule by rider (a), **with no declaration required**, and the parity checker greens by construction — no criteria block, nothing to compare. The precedent is live and verified: **3 of 153** `tasks.md` define zero success criteria — `054c-figma-token-push-fixes`, `icon-token-system`, and **`125-A-pr-gate-mechanical-arming`**: 8 parent tasks, post-PR-gate, governance law, the spec that armed the gate this spec extends. §1.4 records 125-A's exclusion as a fact about the denominator; B4 records it as a fact about **the rule's exit door**.

Contrast the 119-B spec-level pattern, which exempts via a **visible heading** and discharges at closeout — a readable, auditable exemption. Omission is neither. The honest caveat, stated by the item's own author: the 2% base rate is measured **before** the rule exists, and "the rate will rise once writing criteria creates an auditable obligation" is a prediction, not data — the same incentive logic this section already accepts for dilution, applied to an evasion that requires no craft at all.

**Proposed closure → Q1 sub-question 3** (total `criteria-mode` declaration), with its §6.1 tension carried to Peter. **Cheap hedge if Peter defers it**: have the first claims audit count criteria-block *omissions* alongside criteria *vagueness* — the metric costs nothing and converts the prediction into evidence.

### 3.5 Recording form: record-first BALLOT

Per Stacy S2, anticipated by this author's own counter-consideration. Direct precedent: `.kiro/docs/ballots/2026-07-05-documentation-task-type.md` amended **these same two documents** as a ballot with Stacy as required reviewer (she caught five missed edit sites in that round). Inheriting the lighter issue-driven form used for F5 would be quiet precedent drift toward ruling-by-PR on governance law — and F5 was correctly issue-driven precisely because it was *domain content*, not governance law. `governance/**` keeps the PR Peter-merged regardless (the standing carve-out; a checks-only merge is not ratification).

### 3.6 F7's disposition

F7 is recorded on the audit issue as **addressed by Spec 127**, not closed by transcription. It closes when the ballot ratifies **and** the parity checker is armed (Q2 governs when).

---

## 4. The rule content (draft — for the requirements/design phases to formalize)

Draft text carried from the mechanics consult with Stacy's B1 amendments folded. **Exact wording is a formalization-phase deliverable and a ballot artifact**; this is the substance under review.

### 4.1 For `governance/completion-documentation-guide.md` — new subsection "Parent Success-Criteria Fidelity"

> A parent task's completion doc MUST reproduce **every** success criterion defined for that parent in `tasks.md` — verbatim, in full, **none dropped, none reworded to soften an unmet result, and none added** (exact set). Each criterion is a row with three mandatory columns:
>
> `Criterion (verbatim) | Status | Evidence`
>
> - **Status**: ✅ verified met · ⚠️ verified unmet or partial (MUST link a tracking issue or follow-up task) · ❌ verified absent — the "3.3 pattern": a tested module created, the seam it was meant to reach never touched.
> - **Evidence**: an artifact path, a test name, a command + its result, **or a decision record / approval citation**. **A ✅ with an empty or prose-only Evidence cell is non-compliant.**
>
> Each row's mark must reflect a check actually performed **against shipped source**, not against intent or effort. Never omit a row to avoid reporting bad news. Never mark ✅ without having checked the row against what actually shipped.
>
> Immediately after the table, the forced-negative line:
>
> `Unmet or partially met criteria: None` — *or* a list, each item carrying a follow-up link.

**The fourth evidence kind (added at R1 — Ada + Lina, converging from two domains).** Ada: token **creation** governance criteria ("new primitive token approved by Peter per Token Governance") have no artifact, test, or command — the evidence is a decision record, and token creation is one of the few places in the repo where "a human reviewed and approved this" is itself formal, load-bearing law. Lina: visual/subjective component criteria ("matches design intent," "spacing reads correctly") discharge by human sign-off with the same shape. These are one gap seen from two sides, so they get one answer.

**Thurgood's amendment, for R2 to attack:** a decision record must cite a **locatable** record — a ballot path, a dated approval note, a commit — never an unlocatable assertion. Without that constraint the fourth kind becomes exactly the prose-only-evidence escape hatch the third column exists to close.

**Two Evidence-cell edges recorded, not resolved here** (Lina R1): (1) cross-platform parity criteria whose evidence is inherently three artifacts (three suites, three commands) either truncate to one platform's proof or turn the cell into a nested table — that is **Q3 surfacing inside §4.1**; (2) for two of three platforms, "command + result" Evidence is **trust-the-reported-result today, for any verifier** — `xcodebuild`/`gradle` are not reachable in this environment by anyone. Recorded as a limit on the instrument per §5.3's honest-reach obligation.

### 4.2 For `governance/Process-Spec-Planning.md` — Tier 3 (:1818-1853, template :2011-2032)

Restore-don't-replace: the Tier-3 Success Criteria Verification section is **amended** to the table form above, superseding the current Criterion/Evidence/Verification/Example prose block as the required shape. The prose form's depth is preserved as an **optional** elaboration beneath the table for criteria that warrant it. The recorded rationale for the trade travels with the edit.

**NEW EDIT SITE, added at R1 (Stacy B5 — BLOCKING; verified verbatim at source):** the **worked example at :2011-2032** is a named edit site in its own right, and the draft's omission of it was the expensive kind of miss.

- The Tier-3 requirement text at :1818-1853 states the standard as *"Confirmation that overall goals are met"* — **the standard's own language presumes the finding**, and a search of the whole Tier-3 region finds **no ⚠️/❌ vocabulary in the criteria structure at all** (the only occurrences are in an unrelated architectural trade-off block). That is the mechanical reason M4 = 0/22.
- The worked example fills its `**Verification**:` field with *"Created complete directory structure… Implemented TokenSelector… Implemented BuildOrchestrator… All components integrate correctly."* Those are **activity descriptions, not verdicts**. F7's own words are *"authored from what was done rather than checked against what was promised"* — so **the canonical example every agent copies models effort-as-evidence.** Spec 112's author was following the template, not deviating from it.
- **Requirement on the replacement example**: it must show (i) at least one **⚠️ row with a follow-up link** and (ii) Evidence cells that are artifact paths / test names / command output, **never activity prose**. If the example ships unchanged, the corpus keeps its canonical demonstration of the failure mode sitting beneath a table that now demands Evidence.

### 4.3 For `.kiro/steering/Task-Completion-Protocol.md` — pointer only

Appended to the "Create completion doc" bullet in **both** parent sequences (Implementation/Architecture and Setup/Documentation):

> — reproduce every tasks.md success-criterion row verbatim with Status + Evidence, and carry the forced-negative line (Completion Documentation Guide § "Parent Success-Criteria Fidelity")

**Prune-scar constraint (125-B discipline, non-negotiable):** `Task-Completion-Protocol.md` was a **Wave-1 prune target** (closed at `cbf9929c`). This addition stays a **pointer** — never a restated imperative block — so the spec does not re-accrete what Wave 1 removed. It is Layer 1, always-loaded via CLAUDE.md's live `@`-import, and **directly editable** (confirmed by inspection: no `canonical/**` template source; git history shows direct content PRs). No 122 regeneration is required for this file, and it is **not MCP-served** — no reindex for it.

---

## 5. Mechanization plan (staged)

### 5.1 `completion-criteria-parity` — BUILD in this spec

| Facet | Position |
|---|---|
| Class | **Functional** — string-set equality between two markdown artifacts is mechanically decidable, no judgment |
| Disposition | `barrier` (required check) |
| `check_state` at ballot | `proposed` → `armed` per Q2 |
| Precedent | `section-citation-resolution` — pure-fs markdown scan, register row landed at `proposed`, Peter flipped the required bit separately |
| Input | `tasks.md` per-parent criteria block + the parent's completion doc criteria table |
| Verdict | exact-set equality (dropped / added / reworded rows all fail); Evidence-cell non-empty; forced-negative line present |
| Out of its reach | whether the Evidence is *true* (§5.3) |

**Two build constraints, both learned from the register's own history:**
1. The check name must be added to **`tools/agent-generator/verify-gate-registration.sh`**'s `EXPECTED_CONTEXTS` **in the same recorded change as the arming** *(path corrected at R1, Stacy A5 — there is no `scripts/` copy)* — the 2026-08-21 gate-registration drift (`.kiro/issues/2026-08-21-gate-registration-drift-reconciliation.md`) exists because a prior arming did not update the count-assert.
2. Gate-bite must be **proven red** on a throwaway PR before the required flip (the `#121` pattern), and the proof cited on the register row.

### 5.2 `promised-artifact-shipped` (the `(modified)`-vs-diff check) — REGISTER as proposed/deferred

The audit's own cheapest guard, and the one that targets the class that actually reached consumers: *a file annotated `(modified)` in the task text does not appear in the task's diff.* Registered now (birth registration — a rule enters the register when it is ruled, not when it is built), built later. Shape, false-positive surface, and promotion trigger are **Q4**.

### 5.3 `completion-verification-honesty` — REGISTER as ideological, no check

Whether the evidence behind each ✅ is real has **no mechanical predicate**. The register records explicitly that **no check owns it** and that education plus periodic claims-audit practice own it — forever. This entry is what prevents a future reader from mistaking the parity checker for an honesty guarantee.

**Promoted here at R1 (Stacy A4), from §9.2 where a ratifier would never reach it** — this sentence belongs in the register row's rationale **and** in the ballot's own framing, because that is where the reader who mistakes the barrier for a guarantee is actually standing:

> *Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.*

This is the joint agreement's (d8) obligation applied to the artifact a ratifier actually reads: **no prose anywhere** — ballot, charter, register rationale — may imply that the ownership move or the checker makes claim honesty owned, solved, or guaranteed.

**Honest-reach obligation ((d6)(7)), with its first two entries recorded** (Lina R1): the instrument's documented blind spots now include (1) an Evidence cell containing a plausible-looking path is green regardless of truth, and (2) for iOS and Android, "command + result" Evidence is **trust-the-reported-result for any verifier in this environment** — `xcodebuild`/`gradle` are not reachable. A verifier who inherits an over-claimed instrument inherits the author's blind spot.

### 5.4 `parent-completion-docs-present` (F6 class) — OPTIONAL, cheap

Parent ticked in tasks.md ⇒ `completion/task-N-completion.md` **and** `docs/specs/<spec>/task-N-summary.md` exist. Stacy rated this S5/low. Candid assessment: it is the cheapest check in the package and catches a real 4-instance class, but it is also the one most likely to fire on legitimate in-flight branch states (docs land at parent completion, which may precede the unit's PR). **Recommendation: include it in the register at `proposed`, decide build/arm at the tasks phase** rather than committing here.

### 5.5 Register hygiene (all rows)

- Entry-ids are kebab-case, permanent once cited, and **no id may be a substring of another** (sweep-1 resolves `§ "heading"` by verbatim substring match — a substring collision silently mis-resolves and still reports green). The four proposed ids were checked against all existing entries at drafting: no collisions, no substring relations. **Independently confirmed at R1 (Stacy A3)**, both directions, including among the four proposed ids themselves. *Count correction made at incorporation*: `classification-map.md` carries 17 `###` headings of which one is `### Illustrative Example (documentation, NOT a register entry)` — so **16 actual entries**, not 17. The verdict is unchanged; the draft's "all 17 existing entries" was off by the illustrative header.
- Every row carries `rule`, `boundary_call{class,rationale}`, `verification{disposition,owner,check_state,checks}`, `education{disposition}`, `history[{date,change,by}]`.
- `owner:` is **downstream of Q5** — see §6.2.
- Mechanization posture note ("mechanization deferred, process-first") applies **only** to the genuinely deferred rows (§5.2), never to the checker this spec builds.

---

## 6. Scope, non-goals, and one scoping edge

### 6.1 Non-goals

- **No backfill** of historical completion docs (rider (c)).
- **No re-audit** of Spec 112 or any other spec. The audit is complete and its items are disposed.
- **No mechanization of verification honesty.** It stays ideological; education owns it (§5.3). This spec must not imply otherwise anywhere in its prose.
- **No change to tasks.md criteria *authorship* standards** beyond what Q1's machine-readable convention requires — in particular, this spec does not tighten what a criterion must say. (That is the Goodhart surface, §3.4, deliberately left to audit rather than rule.)
  - **Live tension, raised at R1 and carried to Peter (Stacy B4 / Q1.3):** does a **total `criteria-mode` declaration** on 153 existing `tasks.md` files count as the authorship-standard creep this non-goal rules out? This author's reading: no — declaring a *mode* does not tighten what a criterion must **say**, so the Goodhart surface this non-goal protects is untouched, and the declaration can be forward-binding like everything else. **This author wrote the non-goal and his rule gains reach from the answer, so the reading is recorded, not applied.** If Peter reads it as creep, B4's exit door needs a different closure and neither party has a cheaper one.

  > **RULING (Peter, 2026-09-17) — FORWARD-TOTAL WITH LEGACY DEFAULT.** *(Ballot § 7; `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md`.)*
  >
  > - The criteria-mode declaration — **`criteria-mode: per-parent | spec-level`, no third state** — is **mandatory in every `tasks.md` authored or materially amended post-ratification.**
  > - **Absent declaration = legacy**, routing to § 6.2's exemption path.
  > - **Adding the declaration is how an in-flight spec opts in.**
  > - **Legacy is a closed set that only shrinks.**
  > - **No dormant spec is reopened** to add a declaration.
  > - **CLARIFIED at the flag fold (Peter, 2026-09-17): a POST-ratification `tasks.md` that omits the declaration is NON-COMPLIANT. Legacy status is determined by AUTHORSHIP DATE — never by absence of the declaration.** This is what keeps "only shrinks" true by construction: omission is not an entrance to the legacy set, so B4's exit door does not reopen one clause over.
  >
  > **This resolves the recorded conflict in the NARROWING direction.** Total going forward — which is what B4's exit door required; **not** retrofitted onto 153 existing files — which is what this non-goal protected. This author's reading (declaring a *mode* does not tighten what a criterion must **say**) is vindicated in substance and bounded in reach, and it was **ruled by Peter, not applied by its author**, as the handling note asked.
  >
  > **Cheap hedge still live** (§ 3.4): the first claims pass counts criteria-block **omissions** alongside criteria **vagueness**. The legacy set is where B4's prediction — that the omission rate rises once writing criteria creates an auditable obligation — becomes testable.
  >
  > *Raised at ballot drafting (§ 17.2 item 1: "mandatory post-ratification" and "absent declaration = legacy" pull against each other, and "legacy only shrinks" says legacy cannot receive it) and **ANSWERED by Peter the same day** — the clarifying sentence above is the resolution. Flag preserved with its resolution at ballot § 17.2.*
- **No retroactive charge** against any 125-B wave window for the ballot or the register rows — register/ballot PRs are campaign-endogenous by the settled segmentation ruling. **The check ARMING is exogenous** (Q2).

### 6.2 One scoping edge, flagged for Peter's outline settle (still a one-sentence ruling — but not on the numbers the draft gave)

**In-flight specs.** Rider (c) says no backfill; rider (a) says the rule binds per-parent-criteria specs. Neither states what happens to a spec whose parents are **partly complete** when the ballot ratifies.

**MEASURED at R1 (Stacy B6 — BLOCKING; the draft's population was understated by more than an order of magnitude).** The draft named two specs (125-B, 123). Verified at incorporation: **36 specs currently carry both ticked and unticked parent tasks, and all 36 define per-parent criteria blocks.** Most are dormant rather than actively worked — but rider-wise **dormant is indistinguishable from in-flight**, which is exactly what a scoping rule has to settle. *Correction to the R1 item, made at incorporation:* **125-B is one of the 36**, not an addition to it (`ticked=4 unticked=2`). And `123-consumer-distribution` has **no `tasks.md`** at all — a design outline plus nine inbound notes.

**Corrected option costs:**

- **(i)** binds every parent completing after ratification, regardless of spec start date. Simplest. The draft said "one spec's docs are internally inconsistent"; it is **up to 36** — but the inconsistency is **cosmetic**: a doc written before a rule does not contradict one written after, and nobody reads a spec's completion directory for stylistic uniformity.
- **(ii)** binds specs whose `tasks.md` is authored after ratification. The draft called this "delays effect by months." It is **closer to nullification, and the delay is unbounded**: it exempts all 36 (125-B included) — i.e. every spec in the corpus with an authored `tasks.md` — binding only specs authored later, of which 123 is the first foreseeable one.
- **(iii)** binds after ratification with a **fixed-string** exemption note available for in-flight parents. **Stacy's position, now on evidence rather than preference**: (iii) = (i) plus a *readable* exemption, worth the one line because an exemption you can **read** in the doc beats one you must **infer** from a start date, and it requires **no reopening of a dormant spec** — which matters at 36, where reopening is not free.
  - **The one thing (iii) must specify to be auditable**: the exemption note is a **fixed string**, not free prose — e.g. `Criteria fidelity: exempt — spec in flight at ratification (<date>)`. A freely-phrased exemption is an unfalsifiable claim, which is B4's failure mode wearing a different hat.
  - **Her own counter-argument, recorded**: (iii) gives every in-flight parent a self-served exemption for an unbounded period, and 36 specs is a large blast radius for a self-served exemption. If that reads as too permissive, the tightening is a **sunset** (available only until the spec's next parent completes after ratification-plus-one-merge) — **not** a switch to (ii), which nullifies.

**Still no recommendation from this author, and the ruling is still Peter's.** It was flagged for his outline review before this round and it remains so — now with corrected numbers, which was the point of flagging it as blocking.

> **RULING (Peter, 2026-09-17) — OPTION (iii), NO SUNSET, PLUS DECOUPLING.** *(Ballot § 6.)*
>
> The rule **binds after ratification**. In-flight parents may carry the **FIXED-STRING** exemption note:
>
> `Criteria fidelity: exempt — spec in flight at ratification (<date>)`
>
> **Free-prose exemptions are non-compliant** — a freely-phrased exemption is an unfalsifiable claim, which is B4's failure mode wearing a different hat.
>
> **NO SUNSET CLAUSE.** Stacy's recorded tightening is **declined**: **Q5's claims-pass machinery is the abuse detector** — exemption overuse surfaces as a pattern finding in a pass and routes through the composed learning loop. A tightening, if ever needed, arrives as evidence rather than as a clause that expires on a date nobody is watching.
>
> **DECOUPLING (the half most easily lost in transcription): the claims-pass obligation applies to EVERY spec closing after ratification, regardless of exemption status.** An exemption from the new *table format* is **not** an exemption from being audited. The judgment residual a pass covers — M3 evidence quality, M4 forced-negative adoption, promised-artifact gaps, Goodhart/omission — **does not depend on the new table format**, so it does not lapse when the format is exempted.
>
> **SCOPE OF THE FIXED STRING, clarified at the flag fold (Peter, 2026-09-17): it is required ONLY where a parent would otherwise owe the table** — i.e. in-flight specs whose `tasks.md` defines **per-parent criteria**. **Zero-criteria legacy specs (e.g. `125-A`) are outside the rule entirely by rider (a): no string, no noise** — and they **still receive claims-passes** per the decoupling. An exemption note asserts something about an obligation; where no obligation exists it is ceremony, and ceremony would degrade the string as a signal exactly where it matters.
>
> **CENSUS RECONCILED — the amendment's 39 supersedes this section's 36.** Two recipes, two numbers: this section's B6-incorporated figure (**36**) came from a checkbox scan whose parent regex **missed bold-numbered parents**; the lifecycle amendment § 2.2 (`pre-spec/q5-lifecycle-amendment.md`, PR #165) measured **39 of 153 (25%) partially ticked**. **Delta = 3 specs, including `125-A`**, whose parents are written `- [x] **1. …**` and whose parent 5 (`**5. BAKE-IN GATE …**`) is permanently open by design. Re-derived at ballot drafting: **153 specs with a `tasks.md`; 39 partially ticked — confirmed.**
>
> **The RULE text is recipe-independent and inherits neither number**: *any spec with both ticked and unticked parent tasks at ratification.* The census sizes the blast radius; it does not define the population, so a recipe that drifts cannot silently change what the rule binds.
>
> *Raised at ballot drafting (§ 17.2 item 2: the 39 is the "both ticked and unticked" population, **not** "in-flight AND bound" — `125-A`, one of the delta-3, defines **zero** per-parent Success Criteria and is exempt by rider (a) regardless; this section's superseded claim that **all** of the in-flight population defines per-parent criteria blocks does not survive the delta) and **ANSWERED by Peter the same day** — the fixed-string scope clause above is the resolution. Flag preserved with its resolution at ballot § 17.2.*

---

## 7. Artifact inventory

| Artifact | Change | Owner | Notes |
|---|---|---|---|
| `governance/completion-documentation-guide.md` | New subsection "Parent Success-Criteria Fidelity" (§4.1) | Thurgood | MCP-served Layer 2; primary home for the rule content |
| `governance/Process-Spec-Planning.md` | Tier 3 amend/restore at :1818-1853 + template at :2011-2032 **+ the worked example at :2011-2032 rewritten as a named edit site** (§4.2; Stacy B5) | Thurgood | The pre-existing stronger standard lives here — **and the canonical example that currently models effort-as-evidence** |
| `.kiro/steering/Task-Completion-Protocol.md` | **Pointer line only**, both parent sequences (§4.3) | Thurgood | Layer 1, direct-edit, NOT generator output, not MCP-served; prune-scar constraint applies |
| `governance/classification-map.md` | 3 rows (+1 optional, **+1 proposed at R1**): `completion-criteria-parity`, `promised-artifact-shipped`, `completion-verification-honesty`, *(opt)* `parent-completion-docs-present`, *(R1, Q4)* `promised-artifact-exists` | Thurgood | Birth registration; `owner:` fields downstream of Q5 **except `completion-criteria-parity`, settled at `owner: thurgood` by joint-agreement friction (a)**. A fifth id requires the same §5.5 non-substring check |
| `scripts/check-completion-criteria-parity.ts` | New | **Scoped write grant required — tasks phase** | Pure-fs markdown scan; `section-citations` precedent. *Corrected at R1 (Stacy A5): **not** Q5-dependent — verified that **neither** candidate owner's `writeScope` covers `scripts/**`, `governance/**`, or `.github/workflows/**`, so checker authorship does not follow Q5 under either answer* |
| `package.json` | `check:completion-criteria-parity` script | " | " |
| `.github/workflows/completion-criteria-parity.yml` | New CI job | " | Check context name fixed at authoring, cited on the register row |
| **`tools/agent-generator/verify-gate-registration.sh`** | `EXPECTED_CONTEXTS` + count-assert | **Thurgood — bound to the arming unit (U3)** | **Same change as the arming** (2026-08-21 drift lesson). *Corrected at R1 (Stacy A5): the draft's `scripts/…` path is wrong — `scripts/` holds only `relocation-integrity-gate.ts`. Owner is fixed by whoever arms, not by Q5* |
| `.kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md` | New ballot: evidence, before→after for every edit site, scope decisions, reviewer list | Thurgood | Record-first: `RATIFIED (Peter, <date>)` committed **before** any law edit is applied |
| `.kiro/docs/ballots/README.md` | "Ballots on record" entry | Thurgood | Convention |
| `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` | F7 status → addressed-by-127 | Thurgood | Not "closed" (Stacy B2) |
| docs MCP index | One `rebuild_index` covering the changed governance docs | Thurgood | TCP needs none (not served) |
| `governance/Product-Handoff-Protocol.md` | **Definite (Leonardo B1, ruled at the R2 fold)** — § Tier 2 gains the committed-report convention: `.kiro/specs/<spec>/reports/implementation-<platform>.md`, committed on the platform parent's unit branch; Evidence citations resolve to a specific claim inside the report | Stacy | Was conditional-on-Q3; ruled definite 2026-09-19 |
| `.kiro/steering/Agent-Directory.md`, `canonical/agents/thurgood.md`, `canonical/agents/stacy.md` | *Conditional on Q5* — charter edits + 122 regen | Peter-merged | Governance law; generator output — edit canonical, regenerate |

**Merge-unit shape (proposal for the tasks phase):** three units — **U1** ballot + law edits + register rows (one Peter-merged governance PR), **U2** checker build + gate-bite proof + registration wiring, **U3** arming + register `check_state` flip + F7 disposition. U2/U3 separate precisely so Q2's timing decision can hold U3 without holding the build.

---

## 8. Open questions for the feedback round

**None of these are settled here.** Each is framed with options and the evidence bearing on it.

> **POST-SETTLE NOTE (2026-09-17).** That sentence describes this section **as authored for the round** and is preserved as such. At the settle sitting Peter ruled **Q2** (guarded deferral), **Q5** (ratified, full package), **Q1 sub-question 3** (the `criteria-mode` declaration — see § 6.1's ruling block) and **rider (b)'s reach** (claim-keyed, Q3's new sub-question). Their `RULING` blocks sit in place below. **Q1 (otherwise), Q3's shape, and Q4 remain open requirements-phase work** — deliberately, per the sequential gate.
>
> **SECOND POST-SETTLE NOTE (2026-09-19).** That remaining requirements-phase work is now ruled — see the `RESOLVED (Peter, 2026-09-19)` blocks at the end of the Q1, Q3, and Q4 sections below, and the header's working-session note. The R2 round reviews those resolutions.

### Q1 — The machine-readable criteria convention

**Why it is open:** the parity checker needs a defined `tasks.md` criteria-block format, and current formats vary. Measured across all 153 spec `tasks.md` files (150 contain some "Success Criteria" string):

| Form | Occurrences |
|---|---|
| `  **Success Criteria:**` (indented, bolded, colon inside) | 790 |
| `**Success Criteria**:` (colon outside, any indent) | 66 |
| `## Success Criteria` / `### Success Criteria` headings | 17 |
| *(of those headings)* `## Success Criteria (spec level)` — the 119-B discharge pattern | 1 |

So **≈90.5%** share one form, with a long tail — and the criteria themselves are bullets of free prose, which is fine for an exact-set string comparison but not for anything structured.

> **Census note (Stacy A1, re-derived at incorporation).** Three counts now exist for the colon-outside form: the draft's 46 + ~19, Stacy's 62, and this incorporation's **66**; the heading count moved 15 → **17** (Stacy and I agree). The likely cause of 62-vs-66 is occurrence-counting vs line-counting. Immaterial to every conclusion, and not adjudicated by preference here. **Binding consequence: the ballot must re-derive the census with a frozen, quoted recipe rather than inherit any of the three counts** — a ballot is a record, and the tail is what a checker's long-tail handling is sized against.

**Sub-questions to answer:**
1. **Block format** — freeze the dominant `**Success Criteria:**` + bullet-list form as the convention (lowest migration cost, but brittle: indentation and bold styling become load-bearing), or introduce an explicit delimiter/fenced marker the checker anchors on (robust, but a convention every future tasks.md must learn)?
   - **Stacy R1's answer**: freeze the dominant form, **and make it declared** (see sub-question 3). Its brittleness is real and **bounded by the declaration**: a header marker means a malformed block fails loudly as *"declared per-parent, block not found"* instead of silently selecting nothing. That failure mode is load-bearing — the register defines `check_state: dormant` as an armed check that *"runs and passes while verifying nothing,"* and the joint agreement's C4-1 already flags dormancy as this checker's specific blind spot.
2. **Parent association** — how does the checker attribute a criteria block to parent N? By nearest preceding `- [ ] N.` checkbox (matches current authoring), or by an explicit key in the block?
   - **Stacy R1's answer**: nearest preceding parent checkbox. She resolved all 22 in-scope parents mechanically this way with **zero collisions**; cheaper than an explicit key and requires no migration. (Reproduced at incorporation without collisions.)
3. **Criteria-mode declaration — REFRAMED at R1 (Stacy B4, BLOCKING).** The draft asked only how a spec declares itself *spec-level* (rider (a)). B4 shows that is insufficient: a spec that declares **nothing** and defines **no criteria** is exempt with no assertion to falsify — no claim, no excuse, no check. **Proposed closure: every `tasks.md` declares `criteria-mode: per-parent | spec-level` in its header, with NO THIRD STATE.** "No criteria at all" becomes unwritable rather than silently exempt; spec-level specs are skipped by the checker and owe one closeout discharge; per-parent specs are bound; and rider (a) stops being an unfalsifiable claim asserted at audit time. Costs one header line. *(This is a strengthening of the joint agreement's (d6)(3), explicitly acknowledged by this author at R1 rather than silently inherited.)*
   - **Its own author's counter-argument, recorded**: a new required header on 153 existing `tasks.md` files is proposed inside a spec whose §6.1 non-goals say it will not tighten `tasks.md` authorship standards. **Carried to Peter as a settle item.** This author's reading is that declaring a *mode* does not tighten what a criterion must **say** — the Goodhart surface §6.1 protects — and that it can be forward-binding like everything else; but this author wrote that non-goal and his rule gains reach from the answer, so the reading is recorded and the ruling is Peter's. If Peter reads it as authorship-creep, B4's exit door needs a different closure and **neither party has a cheaper one**.
4. **Match strictness — RE-FRAMED at R1.** The draft framed this as strict-verbatim-vs-the-best-behaved-doc. **That framing is withdrawn** (§1.4): strict verbatim does not penalize the exemplar's substance, it relocates it, and the real false-positive mechanism is the promise-surface mismatch (sub-question 6). The surviving options:
   - **(a) strict verbatim row** — clean predicate; and, per A2, it **still fails the exemplar's compressed labels**, which is a real adoption cost even after the misdiagnosis is corrected.
   - **(b) normalized/fuzzy comparison** — introduces a similarity threshold, which is judgment wearing a checker's clothes. **Rejected by every reviewer who spoke to it**: Lina ("(b) just relocates the judgment into a similarity threshold nobody owns"), Stacy (the person defending the threshold "ends up adjudicating string similarity instead of claim truth"), Ada (implicitly, via (c) support).
   - **(c) strict verbatim + an "additional verification" section below the table** — the draft's offered resolution. **A2 establishes (c) as offered is insufficient**: it legitimizes the exemplar's *extra items* and does nothing about its *compressed labels*, so under (c)-as-written the exemplar still fails. Saying so plainly is required, or the round adopts (c) believing it resolves a tension it half-touches.
   - **(c′) — the LEADING CANDIDATE: verbatim CELL, not verbatim ROW (Stacy R1 Required-item-2).** The `Criterion (verbatim)` cell must be string-equal to the `tasks.md` bullet after **whitespace and line-wrap normalization only** — no similarity threshold, no prefix matching, no fuzzy comparison. The precision that keeps this out of (b): **whitespace normalization is a total deterministic function with no parameter to tune**; a similarity threshold is a number someone has to defend. Line-wrapping is a markdown artifact, not authorial intent. **All authorial compression moves to the Evidence cell**, where the rule already demands content — the artifact gets *better*, because the compressed labels that currently substitute for the criterion stop hiding it. Paired with a **required-if-applicable** additional-verification section (sub-question 6).
   - **Convergent support, recorded with its calibration**: Ada, Lina, and Stacy each independently supported option (c) at R1; the joint agreement's (d6)(1) records prior joint support, with this author's countersignature noting it as *"endorsed at countersignature,"* not a frozen position — and both Ada and Lina flagged the same caveat about their own R1 support. **That support was given to (c) as offered.** (c′) is materially different, so **Ada and Lina should re-test their support against the amended form at R2.**
   - **NOT SETTLED HERE.** (c′) is the leading candidate, not a decision. What remains open for Peter or the requirements phase: whether (c′)'s normalization boundary is drawn correctly, whether the additional-verification section is required or optional (sub-question 6), and whether the whole promise-surface expansion is in scope at all (Stacy's own counter-argument 1, recorded in sub-question 6).
5. **Forward-binding only?** Does the convention apply to `tasks.md` files authored after ratification, or to all (which would require touching in-flight specs' `tasks.md`)? Interacts with §6.2, where the corrected in-flight population is **36 specs**. Stacy R1: forward-binding, per §6.2 option (iii).
6. **NEW — the promise surface the rule reads (Stacy B3, BLOCKING).** The rule as drafted reads one block. `tasks.md` carries binding promises in at least two others: `**Primary Artifacts:**` (**130 of 153** files) and spec-local gate clauses (122's `**Merge gate:**`, **17** parent blocks, stating conditions strictly stronger than its success criteria). **Measured consequence**: 7 of the 8 baseline count-parity failures are faithful reporting of those stronger promises, misclassified as INVENT — a 7:1 false-positive-to-true-positive ratio, every false positive landing on the best-behaved spec in the corpus (§1.4).
   - **Proposed**: the rule must **name** the promise surface, and non-criteria promises get a **required-if-the-task-defines-them** home — not an optional one — so that **a dropped merge-gate condition is as visible as a dropped criterion.** Optional here re-creates F7 one block over.
   - **The auditable predicate, stated in full** (Stacy R1): *for every parent in a `criteria-mode: per-parent` spec, the set of `Criterion` cells is string-equal (whitespace-normalized) to the set of `**Success Criteria:**` bullets; every row carries a non-empty Evidence cell that is a path, a test name, a command with its result, or a decision record; the forced-negative line is present; and every other promise block in the task has a corresponding entry in "Additional verification."*
   - **The narrower reading, recorded by the item's own author as the cheaper coherent alternative**: scope the checker to the Success Criteria block, accept the 7 false positives as a **122-local** artifact (the `Merge gate:` idiom exists in exactly one spec), and let the convention's adoption retire them naturally. She argues against it — 7 of 8 is not a rounding error and `Primary Artifacts:` at 130/153 is not spec-specific — but flags it as scope creep on a spec already carrying two governance-law surfaces. **Peter should hear both; this author does not pick.**
7. **NEW — the Q1 × Q3 interaction (Lina R1, with Ada converging).** Criteria that are inherently **compound across platforms** ("component X behaves correctly on web/iOS/Android"; "CSS/Swift/Kotlin outputs match") have no clean single verbatim row once a per-platform status dimension applies — **the row itself may need to fork.** This means Q3's shape decision **reaches back into Q1's convention** rather than sitting downstream of it, and it is not a product-only concern (see Q3's system-side instances).

> **RESOLVED (Peter, 2026-09-19 — requirements-phase working session). All Q1 sub-questions closed; ratifies at the law ballot. R2 attacks execution consequences; the decisions are Peter's.**
>
> 1. **Block format (sub-q 1): the dominant form is FROZEN.** Label line exactly `**Success Criteria:**` (colon inside the bold, any leading indent); criteria are the immediately following **flat** bullet list (`- `), one bullet = one criterion = one table row, **no nested sub-bullets**; continuation/wrapped lines fold via normalization. A declared `per-parent` spec with a missing or malformed block **fails loudly** ("declared per-parent, block not found for parent N") — never silent empty selection (the C4-1 dormancy defense). **Brittleness is double-bounded**: by the loud failure AND by the population gate — the checker only reads declared specs, so the legacy long tail (66 colon-outside, 17 headings) is never parsed. An opting-in in-flight spec normalizes its blocks as part of opting in.
> 2. **Parent-grain coverage (new sub-decision surfaced at the walk): DECLARED NONE, option (ii).** A parent in a `per-parent` spec MAY carry `**Success Criteria:** none — <one-line reason>`; the checker treats it as a valid block (no table owed for that parent); the claims pass counts none-rates alongside the ruling-4 omission/vagueness hedge. Chosen over mandatory-blocks-everywhere because forced filler criteria are **dilution pressure — an uncountable evasion** — while declared-none is visible and counted. B4's indictment was *silent* omission; this is the 119-B lesson (visible, falsifiable exemption) applied at parent grain.
> 3. **Declaration format (completing ruled Q1.3)**: `**Criteria mode**: per-parent` (or `spec-level`) as a bolded line in the `tasks.md` header block before the first task — house metadata style, one-regex detectable.
> 4. **"Materially amended" is DEFINED (the A-3 named item, resolved early as instructed): CANONICAL-FORM COMPARISON.** Extract the `tasks.md` **promise surface** — parent task lines (checkbox state masked to a token), `**Success Criteria:**` blocks, `**Primary Artifacts:**` blocks, spec-local gate clauses, the Declared Merge Units block — whitespace-normalize it with the (c′) function, and **a commit materially amends the file iff the normalized promise surface differs before and after**. No exclusion list to maintain: ticks, dates, annotations outside promise blocks, and formatting are immaterial *automatically*. **Strike-through supersession of a parent IS material** — it removes a promise, the strongest case for materiality; the 118 pattern stays legal, it just costs the declaration line. Material amendment remains a **second opt-in path**: it exits legacy, never adds to it (authorship-date membership untouched; "only shrinks" holds by construction), and the amending commit MUST add the declaration in the same change or is non-compliant. *Two defects in the first-draft definition were found by its own counter-argument and fixed*: an exclusion clause ("typo fixes that don't alter promise text") that smuggled in semantic judgment — replaced by the shared normalization boundary — and a strike-through exclusion tuned to "looks like housekeeping" rather than "changes the promise set." Residual recorded: checkbox masking is one normalization rule beyond (c′)'s whitespace function; the ballot states the composite precisely rather than rounding it to elegance.
> 5. **Parent association (sub-q 2): NEAREST PRECEDING CHECKBOX at any indent.** The parent rule reads only blocks whose associated line is a **top-level parent** — subtask-level criteria blocks belong to their subtasks and are outside the parent rule's scope. The parent-line pattern MUST accept both plain and **bold-numbered** forms (the B6 census-regex lesson applied inside the checker). Two blocks associating to one parent, or a block before any checkbox → loud malformation failure. The checker **emits its association manifest** (parent N ← block at line L) so misassociation is visible in the run log. Residual: a *passing* misassociation requires two parents with identical normalized criteria sets — degenerate, accepted.
> 6. **Match predicate (sub-q 4): (c′) VERBATIM CELL, adopted**, normalization fully specified: (i) unescape table-pipe escapes (`\|` → `|`); (ii) `<br>` tags → single space; (iii) collapse runs of **Unicode** whitespace (including line breaks and non-breaking spaces) to a single space, trim ends; (iv) **nothing else** — no case folding, no punctuation or markdown normalization; bold, backticks, and platform phrasing reproduce exactly. Total and parameter-free — the property that keeps (c′) out of (b)'s territory — and **shared with the materially-amended definition**: one normalization concept across the whole law. Set semantics: **multiset equality, order-insensitive** (reordering is not a mutation class; duplicate bullets cannot collapse into one row). Residuals: the normalization list is **closed-but-extendable** — a future rendering artifact that false-reds is a loud, author-fixable failure, and each extension is a recorded law amendment (deliberate: a silently growing list is how (c′) rots into (b)); compressed labels still fail — the *intended* adoption cost, relocating compression to the Evidence cell. **Ada and Lina re-test their (c)-as-offered support against this form at R2.**
> 7. **Promise surface (sub-q 6): Stacy's B3 position ADOPTED — three-layer closure.** (i) **Closed vocabulary (mechanical)**: the promise surface is exactly `**Success Criteria:**` (the table), `**Primary Artifacts:**`, and gate clauses under the frozen label `**Merge gate:**`; the **"Additional verification" section is REQUIRED when a parent defines either of the latter two**; the criteria table admits ONLY criteria — the exemplar's items 4–5 move to AV, they don't die. (ii) **AV shape, cost-honest by promise type**: gate conditions get criterion-style rows (`Condition (verbatim) | Status | Evidence`, same (c′) predicate — they are F7-shaped and get F7's medicine); Primary Artifacts get a **single forced-negative line** (`Primary Artifacts: all shipped as declared` / or deviations listed with links) — per-artifact rows would be ritual, and existence-truth belongs to Q4's checker, not doc parity. (iii) **The open edge routes to judgment seats**: freelance promise idioms (a future `**Ship condition:**`) are the LENS's question 5 and the claims pass's residual, never claimed by the checker. **Decisive ground, found at the walk**: under the narrow reading, an author faithfully reporting a gate condition is either red (INVENT) or silent (green) — a rule that **punishes honest over-reporting and rewards silence about non-criteria promises rebuilds F7 one block over**; and the "122-local" defense is irrelevant under the population gate (the checker never reads 122 — the *mechanism*, not the instances, binds future authors). Residuals: the AV grammar is real checker-build cost; a false "all shipped" line is invisible to parity **by design** (the Q4 / claims-pass division of labor, stated so nobody reads the green as truth); the vocabulary is closed-but-extendable by recorded amendment.
> 8. **Spanning claims (sub-q 7): DECOMPOSITION-FIRST — and this REVISES the drafting direction (which had proposed a platform-tag + status-sub-row grammar).** Spanning promises are **authored per-platform in `tasks.md`**, each platform a separate criterion bullet against a **named common reference** ("Generated CSS values match the registry" / "…Swift…" / "…Kotlin…", not "CSS/Swift/Kotlin outputs match"). No tag grammar, no sub-row grammar, no per-platform checker logic — exact-set reproduction delivers rider (b)'s status dimension automatically, and a single ✅ **structurally cannot** hide a broken platform (Lina's objection answered at the root instead of policed). A parity claim that cannot name its common reference fails the LENS's falsifiability question — a criterion-quality smell, not a blocker (per-platform-matches-reference entails mutual consistency). The **irreducible channel** — a spanning promise authored bundled and undeclared — exists under every declared option (only rejected inference avoids it), so it is guarded where judgment already sits: the LENS's ruled does-this-span-platforms question at the tasks round, plus claims-pass counting of bundled-claim instances. **Fallback named now**: if R2 surfaces a genuinely non-decomposable claim, the explicit `(platforms: …)` tag form enters by recorded amendment, not ad hoc. Residuals: decomposition constrains how spanning promises are written — recorded for R2 as the same class of author-conflict reading flagged on B4 (ruling 5 created the constraint; decomposition is its cheapest compliant form) *(this classification is corrected at the R2 fold below — Stacy B-R2-2)*; row multiplication binds the small parity-closing parent set (Lina's scoping fact).

> **R2 FOLD (Peter, 2026-09-19 — after the R2 round; reviewer items cited by stamp, full round + Thurgood's disposition entry in `feedback/design-outline.md`; the two Stacy blockers ruled by Peter in session):**
>
> - **Item 4 amended (Stacy B-R2-1, ruled): the extraction is GENEROUS by rule, on asymmetric error cost.** The materiality extractor never inherits the checker's frozen grammar; it uses a deliberately over-inclusive pattern set enumerated from the frozen census recipes — all three criteria-label forms (frozen, colon-outside, headings), `Primary Artifacts`, gate clauses (`merge gate`, case-insensitive), the units block by all three known forms, and **every top-level checkbox line regardless of parent form**. A false-material costs one declaration line; a false-immaterial reopens the side door — over-inclusion is the safe direction. The pattern set is closed, enumerated in the law ballot, and verified once by running the extractor over all 153 files. **The computing instrument is named** with the same honesty as Q4's procedure-note: the parity checker's gate run evaluates materiality on any PR touching a legacy `tasks.md` — *once armed*; until arming, the claims pass owns it as judgment, stated plainly. The item's residual list was incomplete (extraction grammar and instrument unstated — Stacy B-R2-1); now stated. Stacy's alternative disposition (non-frozen blocks outside the surface by design) was declined: it would write the reword-evasion channel into law for the exact mutation class this spec exists to catch.
> - **Item 5 extended (Stacy A-R2-6)**: third live parent form `- [x] Task N: … (Parent)` (054b); and a live falsifier of top-level-checkbox⇒parent (`054a/tasks.md:523`, a criteria bullet at top level). Both population-gated for the checker; both bite the materiality extractor — absorbed by the generous extraction above (a top-level checkbox line is promise surface either way). The 39-vs-37 census delta is the same lesson recursing; the ballot's 39 stands re-confirmed.
> - **Item 2 edges closed (Stacy A-R2-1/A-R2-2)**: `none` co-occurring with criteria bullets is a **loud malformation failure**; "no table owed" is the **narrow** reading — declared-none waives the *criteria table only*, and the AV section + forced-negative line remain owed where the parent declares artifacts or gates. First-line guard is the **LENS's parent-grain mode question** at the tasks round; the claims-pass count is the backstop. Stacy's R2-1 verdict recorded: declared-none is faithful to B4, not a new exit door — *"I would not have proposed it; having seen it, I think it is the better instrument."*
> - **Item 7 residual restated (Stacy A-R2-3, A-R2-8)**: artifact truth is owned by **the claims pass today**; `promised-artifact-exists` is its registered mechanical successor — unbuilt, no build commitment. One owner plus a successor, not two co-owners. Ballot quoting instruction: the 7:1 ratio is the promise-surface mechanism's **discovery evidence**, never a projected false-positive rate — the population gate retired it as live evidence (recorded by its own author, against her own item). Guide additions from the bound parties: the **copy-don't-retype** authoring note (Ada — math-glyph drift is where the first normalization friction will concentrate); the **decomposition-scope boundary** line (Ada — Success Criteria bullets decompose; a Primary Artifacts line bundling platforms does not, it has its own remedy); **non-token locatable-record examples** for the fourth evidence kind (Lina — a PR review comment, a design-critique note, a dated design-outline decision).
> - **Item 8 amended (Stacy B-R2-2 — ruled OPTION (ii): SPLIT THE LIMBS).** The residual above mis-borrowed the B4 precedent: B4's ruling stood on *"declaring a mode does not tighten what a criterion must say,"* and decomposition's reference clause **did** tighten content — the precedent cut against it, not for it (Stacy's finding, sustained). Ruling: the **structural limb** (a spanning promise is authored as per-platform bullets) is **convention law** — grain, not content, inside § 6.1's own carve-out and required by ruling 5's delegated rendering. The **reference limb** (each bullet names its common reference) is **demoted from convention law to the judgment layer**: the LENS's spanning question carries it ("what does each platform's bullet verify against?") and the guide teaches it as authoring guidance — *"left to audit rather than rule,"* § 6.1's own prescription. The demotion costs almost nothing mechanical: decomposing a matching claim forces the reference object grammatically, and the checker never verified reference adequacy anyway. Its recorded cost: a missing reference is a **quality observation** at a claims pass, not a compliance violation. The reference guidance widens per Leonardo A1: *"the screen spec, or the component contract / token / pattern it delegates to."* **§ 6.1's non-goal stands unamended and uncrossed.** *(Conflict note: the spec author recommended (ii), which runs against his conflict — his rule gains less reach under it than under the alternatives.)*
> - **Item 8 residuals extended (Stacy R2-4; Lina)**: the **incomplete-decomposition channel** — a spanning promise decomposed short (two bullets where three platforms apply) is decomposed, compliant, exact-set green, and short one platform; the criteria set itself is what's wrong. Guards: the LENS spanning question and the claims pass comparing rows to the report set. On this axis **a rule became a judgment** (the report-set applicability cross-check Stacy's roll-up carried) — recorded as a real downgrade, not claimed away. Comparative-claim `(platforms: …)` **fallback invocations are counted by the claims pass** alongside none-rates (Lina — same counting seat, no new mechanism). Flat-bullet due diligence discharged by corpus scan: **one** nested instance in 153 (`036`, legacy, outside the checker population).
> - **(c′) re-tests delivered**: Ada and Lina both re-confirm against the verbatim-cell form — both report their support *strengthened* relative to (c)-as-offered, tested against real domain criteria. The reserved condition on ruling Q1.4 is discharged.

### Q2 — Arming timing vs the 125-B campaign

**The accounting, precisely.** The 125-B campaign's **shared W1 window is OPEN** (opened 2026-08-12T21:03:24Z at the wave-1 prune merge `cbf9929c`; closes at the final wave's window close — event-denominated). Both **wave** windows closed at observation pass 3 (2026-08-27, PR #149); the **campaign** window did not. Per the settled segmentation ruling, campaign-endogenous events (wave prunes, ballots, register/roster PRs) **do not** segment; **exogenous events do** — explicitly including **new check armings** and **required-check-set changes** — and are **bounded at K=3**. Current count: **1 of K=3** (segment 2, opened 2026-08-21 by the `122-sweep-5-corrected-state` required-flag removal). Segment 2 is currently n=16, f=0, W1 MET as-of-pass.

**Options:**

| | Build now, arm at campaign close | Arm immediately |
|---|---|---|
| Boundary charge | **0** — no new segment while the window is open | **2 of K=3** consumed |
| Checker state in the interim | `proposed` on a ratified register row, CI job present and non-required | `armed` |
| Precedent | The `section-citations` guard armed **before** the campaign opened, deliberately timed measurement-free ("no window was open; not a boundary-event charge") — the same instinct, applied at the other end | 125-A's armings, which predate the campaign entirely |
| Cost | Every parent completing in the interim ships unchecked; the rule runs on prose alone for exactly the period §1.3 says prose does not hold | Segment 3 starts with a fresh n, and the campaign has one boundary left for anything unforeseen |
| Legitimacy | A registered `proposed` row is a **recorded, ratified** decision, not a dormant gap — the state exists in the schema for exactly this | No ambiguity; the rule is real the day it ratifies |

**THIRD OPTION, added at R1 (Stacy R1 Required-item-4) — BUILD in this spec; ARM on convention-adoption evidence at a burst boundary, capped by the next release.** Neither "arm at campaign close" nor "arm immediately," and it is argued from measurement rather than from the campaign accounting:

- **The binary undersells "arm immediately."** Arming is an exogenous boundary event: it does not merely consume 2 of K=3, it **opens segment 3 and resets n**, so 125-B needs a fresh N=20 observed PRs before its shared-W1 verdict can close. At a bursty cadence that plausibly delays 125-B's closeout *more* than the arming gains — and the delay buys 127 nothing. Conversely "arm at campaign close" is unbounded in calendar terms, and the interim is exactly the period §1.3 says prose does not hold.
- **The decisive constraint is not the campaign accounting — it is the M2 measurement.** A verbatim checker armed today would fail essentially every in-scope doc written in the current style (near-0% true verbatim parity, §1.4). **That is not a gate, it is a wall.** A barrier that red-lights every honest author on day one gets routed around or waived, and the spec loses the rule it just ratified.
- **Proposed arming conditions, in priority order**: **(a)** the Q1 convention has shipped and the Tier-3 worked example is fixed (B5); **(b)** at least **N ≥ 5** in-scope parents have completed under the convention with **M2 measured by audit** — not by the checker; **(c)** the flip lands at a burst boundary, preferably the **Wave 3 prune open**, so segment 3's fresh n accrues *concurrently* with wave 3's own observation rather than serially after it — one boundary charge either way, better overlap; **(d)** **capped: arm before the next release publish regardless**, because RELEASE is the harm boundary and both consumer-reaching escapes crossed it.
- **Its author's own counter-argument, recorded**: condition (c) couples 127's arming to 125-B's schedule — the exact coupling her own non-negotiable rejects ("the rule matters more than the org chart, and more than another spec's campaign"). If Wave 3 slips indefinitely, the arming slips with it. **(d) is the cap that makes (c) safe; if Peter finds the coupling unacceptable, drop (c) and keep (a)(b)(d)** — the convention-adoption gate is load-bearing, the campaign-efficiency timing is optimization.
- **This does not reopen §3.1**, and neither does any other option here: the checker is **built in this spec under all three**. Q2 is scoped to the required-flag flip, which this outline already framed as open.

**Not decided here.** Two facts worth having in front of the decision: the campaign's measured exogenous-event rate is *low* (1 in ~13 months of PR history since campaign open; the U1 pilot measured **zero**), so K=3 is not under pressure — and conversely, the interim is only as long as Wave 3 + closeout take, which at the current bursty cadence is not predictable in calendar terms. **Peter decides, now among three options.**

> **RULING (Peter, 2026-09-17) — GUARDED DEFERRAL.** *(Ballot § 4.)*
>
> The arming decision **defers to the campaign-close (5.Z) sitting** for re-evaluation with closeout-and-dial context in hand. Two **pre-committed guards**, decided now so the deferral is not open-ended:
>
> **(i) Release guard.** If a release approaches before that sitting, **the Q2 decision fires then instead** — **no release ships with the question unexamined.**
> **Event anchor, clarified at the flag fold (Peter, 2026-09-17): RELEASE-PREP START — concretely, the creation of the version-bump PR** (the v14.x pattern). **The release checklist carries the line *"if arming is undecided, decide it now."*** The guard fires on an event with a timestamp, not on a judgment that a release "approaches."
>
> **(ii) Evidence guard.** Whatever is decided, **the checker does not arm before the Q1 convention has shipped AND the Tier-3 worked example is fixed (B5) AND real parents have passed it, verified by audit** — **evidence, not calendar.**
> **Quantified at the flag fold (Peter, 2026-09-17): Stacy's N ≥ 5 is RESTORED** — at least five in-scope parents completed under the convention, **with M2 measured BY AUDIT, not by the checker.** Its absence from the first transcription was transcription loss.
> **Second conjunct restored at the verification-review fold (Stacy A-1, same transcription-loss class): condition (a) was "the Q1 convention has shipped AND the Tier-3 worked example is fixed (B5)."** Both conjuncts bind — arming a verbatim checker against a corpus whose canonical exemplar still models effort-as-evidence is the wall argument one level in. **With both restorations, guard (ii) now carries conditions (a) and (b) in full**; the earlier claim that it did so was, before these folds, stronger than the text supported.
>
> Guard (ii) carries Stacy's conditions (a)+(b) — **in full after the A-1 restoration above** — as a floor under *any* decision rather than as one option's terms; a verbatim checker armed against today's authoring style is **not a gate, it is a wall** (§ 1.4: count-parity 7/15, true verbatim plausibly near 0/15). **Guard (i) carries condition (d)'s HARM-BOUNDARY REASONING but adjudicates (d)'s absolute against (b)** (Stacy A-2): (d) capped *arming* — *"arm before the next release publish regardless"* — while guard (i) caps *deciding*, so a release-prep sitting may lawfully decide **not** to arm. Recorded in her words, against her own list: *"my own condition list was internally inconsistent… Ruling in favour of (b) is a legitimate adjudication of my tension, not a transcription loss."* **Her condition (c) is NOT carried** (self-flagged droppable; it couples 127's arming to another spec's schedule).
>
> **Unchanged:** the checker is **BUILT in this spec** under every option. Q2 is scoped to the required-flag flip only.
>
> *Raised at ballot drafting (§ 17.2 items 3–4: guard (i)'s "approaches" is a judgment where every other trigger is event-anchored; guard (ii) preserves "verified by audit" but drops Stacy's **N ≥ 5**) and **ANSWERED by Peter the same day** — both resolutions are folded into the guards above. Flags preserved with their resolutions at ballot § 17.2.*

### Q3 — The product per-platform status dimension

**Why it is open:** rider (b) is settled in principle; its shape is not. And it binds a **currently empty surface** — the Product MCP index reports 0 screens, 0 tokens, 0 domain objects. There is no instance to validate the design against, so whatever is chosen will be untested until the first product spec lands.

**Options:**
1. **Per-platform columns** — `Criterion | Web | iOS | Android | Evidence`. Reads at a glance; makes an unmet platform impossible to hide; forces a cell for platforms a criterion may not touch (N/A noise).
2. **Per-platform evidence cells** — one Status column, with Evidence structured per platform. Compact; a single roll-up ✅ can still paper over one platform unless the roll-up rule is stated ("✅ only if all applicable platforms are ✅").
3. **Per-platform rows** — criterion repeated per platform. Most explicit, most verbose, cleanest for a checker.

**Also on the table (Stacy's Q3 finding):** the product side *already* has the cheaper pattern — `Product-Handoff-Protocol.md:83-101` Implementation Reports carry forced-negative sections ("Deviations from Spec: None / or list"; "Open Items: None / or list"). A real option is that product parents discharge this rule **through the existing Implementation Report structure** rather than through a new table shape. **Stacy's design input is central here**; Leonardo and the three platform agents are the consumers who will live with it.

---

**R1 positions — two reviewers, genuinely opposed. Both recorded intact; this author picks neither.**

**Option 4 — Stacy R1 (Required-item-3): NO new table shape.** Verified at source: the Implementation Report template is **already per-platform by construction** (it opens with `**Platform**: {PLATFORM}`, one report per platform) and already carries **four forced-negative sections** in exactly the form part 2 imports. The per-platform dimension rider (b) asks for **exists and is exercised**; options 1–3 all propose building a second parallel structure beside it.
- **The commitment**: the parent criteria table keeps the same three columns as the system side — one rule, one shape, one checker — plus **one roll-up sentence** in the completion-documentation guide: *for a product-spec parent, a criterion is marked ✅ only if every applicable platform's Implementation Report is clean for that criterion; the Evidence cell cites the per-platform reports; if any applicable platform is unmet, the row is ⚠️ and names the platform.*
- That one sentence discharges rider (b)'s stated harm exactly, is auditable the day the first product parent completes against a structure that already exists, and **kills option 1's N/A-noise problem** by making applicability explicit rather than inferred.
- **Deliberately left undecided until the first product spec lands**: whether per-platform rows are needed for readability; whether the parity checker should read Implementation Reports at all (she leans stop-at-the-table — a checker's reach into an unexercised structure is the over-claimed instrument (d6)(7) obliges us not to build); whether product specs use `criteria-mode: per-parent` at all.
- **Her own counter-argument**: reusing the Implementation Report couples the product rule to a protocol **never exercised on a real screen** — zero instances. If the reports turn out to be authored inconsistently once Leonardo and the platform agents use them, her roll-up rule inherits that inconsistency, while she is arguing *against* options 1–3 for being untested. Her answer: both paths are untested, and hers at least reuses a reviewed-and-committed structure rather than inventing a second. **Her explicit instruction: Leonardo's R1 should be weighted above hers here** — he authors the first product spec and feels the ergonomics first. She also flags her own conflict: an agent with zero product instances recommending that product work route through a product protocol should be read skeptically.

**Against it — Lina R1, leaning option 1 (per-platform columns).** From component practice: each platform has its own test suite and its own pass/fail, so `Criterion | Web | iOS | Android | Evidence` matches how the work is actually verified — and **a single roll-up ✅ is exactly the shape that let 112's escapes hide for months.** Option 2 reintroduces that roll-up risk unless the "✅ only if all applicable platforms are ✅" rule is stated *and enforced* — and that rule is precisely the judgment a mechanical checker cannot verify without parsing sub-cell structure. She would accept option 3 (per-platform rows) if the checker genuinely cannot handle columns, despite tripling row count.
- **Note the live disagreement**: Stacy's option 4 rests on exactly the roll-up rule Lina identifies as mechanically unverifiable. **That is the crux of Q3 and it is unresolved.**
- **Scoping, from Lina**: most Stemma component parents are **already platform-scoped at the task level** (web/iOS/Android are typically separate subtasks or parents), so this shape binds the smaller set of cross-platform *parity* closing parents, not every component parent.

**NEW sub-question — rider (b)'s reach (Lina R1; flagged for Peter).** Rider (b) as settled says *"product-spec parents."* Component parity claims have the **identical failure shape**. Does rider (b) reach **system-side Stemma parents**, or only product screens? This is an execution consequence of a settled rider, not a reopening of it — and it is not this author's to answer by construction. **Added to the Peter-settle list.**

> **RULING (Peter, 2026-09-17) — OPTION (c), CLAIM-KEYED.** *(Ballot § 8.)*
>
> **Any criterion whose promise spans multiple platforms — product tier OR system tier — carries per-platform status. Single-platform criteria keep single rows. The product rider becomes a special case of the general rule.**
>
> **CLARIFIED at the flag fold (Peter, 2026-09-17): per-platform STATUS is the requirement** — **rendered** as per-platform columns **or** as the product-side Implementation-Report roll-up. **Evidence-cells-only is INSUFFICIENT for a multi-platform claim**: structuring only the Evidence cell leaves the Status cell free to hide an unmet platform, which is Lina's objection on the substance. **The exact rendering belongs to the Q1 convention at the requirements phase**, because the checker's predicate reads whatever shape the convention fixes.
>
> **Why claim-keyed rather than tier-keyed**: tier-keyed-narrow leaves Ada's measured token-generation instances uncovered; tier-keyed-wide taxes single-platform criteria with N/A noise. Keying on **the claim's own reach** puts the obligation exactly where the harm is — a single ✅ standing for three platforms — and nowhere else.
>
> **Compositions, part of the ruling:**
> - **With Stacy's Q3 discharge-through-Implementation-Reports + roll-up rule**: no second parallel structure is required; the roll-up rule (*✅ only if every applicable platform is ✅; otherwise ⚠️, naming the platform*) becomes a **general** rule rather than a product-local one.
> - **With Method-line honesty**: *"web verified / iOS not re-verified"* must be expressible **per criterion** — the honest form given the platform-toolchain gap (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`).
> - **With the tasks-round verifiability lens**: the lens carries **the does-this-span-platforms question at authoring time** — inside its existing seat, no new event.
>
> **What this does NOT dissolve**: claim-keying decides **which** criteria carry the dimension; status-is-the-requirement decides **what** they must carry; **Q1 decides how it is written.** The rendering choice and the checker's reach into it remain **Q3/Q1 requirements-phase work**, including the live Stacy/Lina disagreement over whether the report roll-up is mechanically verifiable. Leonardo's Q3-only review is still outstanding and Stacy's instruction stands: **weight his input above hers on the product-side shape.**
>
> *Raised at ballot drafting (§ 17.2 item 5: the parenthetical offered two shapes without saying who chooses — and evidence-cells-only is precisely the shape Lina identified as reintroducing the roll-up risk) and **ANSWERED by Peter the same day**: status is the requirement, evidence-cells-only is insufficient, rendering goes to Q1. Flag preserved with its resolution at ballot § 17.2.*

**Known system-side instances — Q3 is not product-only (Ada R1, converging with Lina).** A single Rosetta criterion frequently **bundles three platforms** ("Cross-platform generation produces consistent values"; "CSS/Swift/Kotlin outputs match"). An exact-set verbatim row reproducing that bullet as one ✅ can hide *"passed on web and iOS, silently wrong on Android"* — the same problem rider (b) names, on the token-generation surface instead of the screen surface. **Recorded as a known future instance of Q3's shape, not a novel one**, so whichever doc records Q3's resolution carries a forward pointer and the convention is not re-litigated per domain later. (This is also where Lina's Evidence-cell edge lands: one criterion whose evidence is inherently three artifacts either truncates to one platform's proof or turns the cell into a nested table.)

> **RESOLVED (Peter, 2026-09-19 — requirements-phase working session): UNIFORM DECOMPOSITION, both tiers. The product side discharges through per-platform criterion rows whose Evidence cites that platform's Implementation Report.**
>
> Q1's decomposition-first resolution **dissolves the system side entirely** (per-platform status IS the promise structure) and **reconciles the recorded Q3 opposition rather than picking a side**: Lina's objection evaporates — no roll-up rule exists to be mechanically unverifiable, because a broken platform is a visible row of its own; and Stacy's actual goal survives intact — **no second parallel structure is built**; the Implementation Reports become the **Evidence substrate** (each per-platform row cites its platform's report, whose four forced-negative sections are the very structure part 2 imported). The **roll-up sentence is dropped** — nothing remains to roll up; the per-criterion Method-line honesty she holds hardest survives untouched and becomes per-row naturally.
>
> **Bound as a DEFAULT with a NAMED REVISIT**: the first product spec's tasks round re-examines the shape as a **recorded question** — where Leonardo is the author, the LENS is seated, and his ruled weighting applies. This is the honest answer to the zero-instances problem (0 screens; an empty surface makes every opinion speculation, this resolution's included). **Leonardo is tagged on the R2 round now** and can overturn the default before the ballot rather than after.
>
> **Reading placed on the record, not assumed**: the flag-5 clarification named two renderings ("per-platform columns or the product-side report roll-up") and delegated the exact rendering to this phase ("Q1 decides how it is written"). Decomposed rows were the outline's option 3, not in that parenthetical — but they deliver per-platform **status** at strictly finer grain than the ruled floor, and what the clarification ruled OUT was evidence-cells-only. **The law ballot states this reading explicitly** so it is a recorded interpretation, not drift.
>
> Residuals: 3× rows where a product parent genuinely spans everything — bounded by per-platform-agent task structure (implementation parents are naturally per-platform under the Sparky/Kenya/Data routing, leaving only the parity-closing parent spanning, the same shape as Lina's Stemma scoping note), with the revisit as the escape if unlivable; and **anchoring** — every default shapes the first instance it claims neutrality toward, mitigated only by the revisit being a genuine question and Leonardo's counterweight.

> **R2 FOLD (Peter, 2026-09-19 — Leonardo's Q3 input received; his B1 ruled; Stacy's R2-4 audit folded):**
>
> - **The default is SUPPORTED by the weighted reviewer** — Leonardo does not overturn, and supplies a new decisive argument: **per-row Evidence is the only shape that carries per-platform verification method** ("web: re-verified, command cited" vs "iOS: reported by Kenya, not independently re-verified") — which is the *normal* state of two-thirds of every product parity claim, given the toolchain gap. His structural strengthening of the task-shape bound is recorded: per-platform implementation parents fall out of the **merge-unit law** (different agents, different completion times, not reviewable as one diff), not merely out of agent routing. **The law ballot states the per-row Method-line honesty clause as load-bearing for the product tier specifically**, as he asked.
> - **Leonardo B1, RULED (Peter — his preferred fix adopted)**: the Implementation Report becomes a **committed artifact** — `.kiro/specs/<spec>/reports/implementation-<platform>.md`, committed on that platform parent's own unit branch as part of that parent's completion, traversing the same PR gate as the work it reports. **Evidence citations resolve to a specific claim inside the report** (section anchor, or the test/command the report records) — never the report as a whole. One line in `Product-Handoff-Protocol.md` § Tier 2 plus a § 7 inventory row (the protocol was already a conditional Q3 edit site; the row is now definite). This also homes the fourth-evidence-kind records for Leonardo's visual-direction sign-offs at no extra cost. *Counter-argument preserved: a third governance surface amended against zero real instances; the declined fallback (soften the clause, defer the protocol edit to the revisit as precondition) remains on record.*
> - **Product specs are `criteria-mode: per-parent`** (Leonardo A4, answering Stacy's deliberately-open item 3 from the seat that decides it): the parity-closing parent — whose claims are secondhand by construction — is precisely the parent that should owe an exact-set table with per-row Evidence; the platform implementation parents are single-platform by construction and pay nothing over the system-side form.
> - **The revisit carries THREE NAMED QUESTIONS** (Leonardo A5 — B4's falsifiability logic pointed at the revisit itself): (1) is 3× row multiplication livable at the real criterion count on the parity-closing parent — measured, not estimated; (2) did the committed-report substrate hold — locatable at the conventional path, cited at claim grain, authored consistently across three platform agents; (3) did platform-set evolution or reference drift force a shape change. *"Revisit the shape" is not falsifiable; these are.*
> - **Rendering convention adopted** (Leonardo S1): decomposed rows group **by criterion** (the platform triple adjacent), not by platform — costless under item 6's order-insensitive multiset equality.
> - **Residuals corrected and extended**: the two recorded residuals are **not independent** — residual 1's task-structure bound is itself an instance of residual 2's anchoring; the revisit + Leonardo's counterweight are the real bound on both (Stacy A-R2-7). **Reference drift** added (Leonardo A2): the screen spec is a *mutable* reference the claimant authors — "iOS matches the screen spec" is satisfiable by editing the spec; a third evasion class, distinct from dilution and omission. Mitigation carried into the revisit: the Evidence cell cites **the screen-spec revision verified against** (SHA or dated revision). **Platform-set evolution** added (Leonardo A3, worked): a platform added later is a **new parity parent**; the earlier parent's claims stay true of the platforms that existed when made, and the absence of a single all-platforms artifact is the honest outcome, not a gap. **The incomplete-decomposition channel** (Stacy R2-4) applies here as on item 8.
> - **Framing corrected (Stacy R2-4 — the round's one found misrendering)**: "Stacy's actual goal survives intact" overstated. Her Q3 position ran two tests; **one was met** (no second parallel structure — true, and the Implementation Reports remain the Evidence substrate) and **one was adjudicated against** (minimum-commitment-under-zero-instances — uniform decomposition is a *larger* commitment, traded for structural integrity plus the named revisit). Both defensible; only one is preservation, and the record now says which is which. Her instruction that Leonardo's input outweighs hers held without qualification, and his input supported the trade.

### Q4 — The `(modified)`-vs-diff check's eventual shape

Deferred build; registered now. For the round to shape rather than settle:
1. **What it parses** — `(modified)` / `(reworked)` annotations in task text and "Primary Artifacts" lists, against the unit PR's diff. Spec 112 named a **phantom path** (`src/generators/FigmaFormatGenerator.ts` has never existed) and a **wrong path** (`src/generators/WebFormatGenerator.ts`; the file lives in `src/providers/`) — so the check's first real output class may be "the task text names a file that does not exist," which is itself valuable and *different* from what it was built for.
2. **False-positive surface** — legitimate reasons a promised file is absent from a diff: the work moved to a better path mid-task; the change landed in a prior unit; the annotation was aspirational and the task text was never corrected. Each is a defensible completion with a failing check.
3. **Promotion trigger** — what evidence moves it from `proposed` to `build`? Candidates: a second spec exhibiting the signature; a false-positive rate measured below some threshold on a retrospective dry run (cheap — it can be run over merged history without arming anything); or simply Peter's scheduling call.
4. **Relationship to the parity checker** — they are complements, not alternatives: parity guards the *criteria* surface, this guards the *artifact* surface, and the two consumer-reaching escapes were on the artifact surface.

**R1 input (Stacy R1 Required-item-4) — change the input surface, and SPLIT the row. Recorded as shaping input; the shape is still open.**

- **Input surface is wrong as drafted.** Measured and reproduced at incorporation: `(modified)` appears in **14 of 153** `tasks.md` files (**65** occurrences) and `(reworked)` **4** times total; `**Primary Artifacts:**` is a **structured block in 130 of 153**. Parsing free-text annotations that ~91% of specs do not use, when a near-universal structured block states the same promise, is the wrong predicate. **Register it against `**Primary Artifacts:**`** — which also unifies with B3, since Primary Artifacts is one of the promise blocks the criteria rule must acknowledge, so **both checks read the same declared surface.**
- **Split the row in two.** The draft's own observation — that the first real output class may be *"the task text names a file that does not exist"* (112's phantom `src/generators/FigmaFormatGenerator.ts`; `WebFormatGenerator.ts`, which lives in `src/providers/`) — describes a **much cheaper and nearly false-positive-free** check. Proposed: register **`promised-artifact-exists`** (path existence over Primary Artifacts; buildable, high-value, essentially none of sub-question 2's false-positive classes) **separately** from **`promised-artifact-shipped`** (diff-based, high false-positive surface, stays deferred). Two rows honestly classified, rather than one row carrying two very different risk profiles. *(Register hygiene, §5.5: a fifth proposed id requires the same non-substring check as the other four.)*
- **False positives**: the three drafted classes are correctly identified — and all three are *also* signals that the task text was never corrected, which is itself a finding worth surfacing, **provided the verdict reads "task text and reality disagree" rather than "work was not done."**
- **Promotion trigger**: a **retrospective dry run over merged history**, measuring false-positive rate without arming anything. Cheapest of the candidates, the only one that produces evidence rather than a schedule, and runnable today — preferred over "a second spec exhibiting the signature," which requires waiting for another escape.
- **Firing constraint, countersigned in the joint agreement §4.4**: **`promised-artifact-shipped` must not fire per-PR** — a later unit can legitimately deliver a prior unit's promised artifact. Its events are **CLOSEOUT** and **RELEASE**. (`promised-artifact-exists`, if split out, *can* fire per-PR: a declared path either resolves or it does not.)

> **RESOLVED (Peter, 2026-09-19 — requirements-phase working session): Stacy's R1 reshape ADOPTED, with two pins found at the walk.**
>
> 1. **Input surface = `**Primary Artifacts:**`** (structured, 130/153 — not the free-text annotations at 14/153). With the Q1 sub-q 7 resolution, **three layers now read one declared surface**: the AV forced-negative line (the doc-side claim), `promised-artifact-exists` (mechanical existence truth), `promised-artifact-shipped` (deferred delivery diff). No private definitions of "promise" anywhere.
> 2. **The SPLIT stands**: `promised-artifact-exists` (cheap, buildable, near-zero false positives) registered separately from `promised-artifact-shipped` (diff-based, deferred; events **CLOSEOUT and RELEASE, never per-PR**, per the countersigned (d2) constraint). Two rows, honestly classified.
> 3. **PIN — `promised-artifact-exists` is DELTA-SCOPED**: it fires on **the PR that ticks the parent** (the one carrying its completion doc), against that parent's declared paths only. The as-recorded per-PR form would re-check *all* ticked parents on every PR, so any later legitimate refactor moving a shipped file would retroactively redden a completed parent — a false-positive channel outside the three named classes. Later file moves are repository evolution, not completion claims.
> 4. **PIN — parsing EMITS, never silently skips**: annotation suffixes (`(modified)`, `(new)`) are stripped to extract paths; an entry that does not parse as a repo path is reported `skipped — not a path`, never silently dropped — the T4-5 emit-your-exclusions discipline; a silent selection channel is dormancy in prose form.
> 5. **Verdict phrasing is normative**: "task text and reality disagree," never "work was not done" — all three named false-positive classes are also findings that the task text was never corrected.
> 6. **Promotion evidence = the retrospective dry run** over merged history, recorded honestly as a **procedure, not a firing trigger**: nothing detects when it should run, which is acceptable only because nothing is armed — a deferred check with a named evidence recipe is a queued capability, not an inert guard (distinguished from the T4-5 defect class deliberately).
> 7. Population boundary coheres with the parity rule (forward-binding); parsing details fix at build time (the row is `proposed` — it records shape, not code); the id pair violates no substring relation, pending the full five-id authoring-time sweep per § 5.5.
>
> Residuals: legacy free-text `(modified)` annotations go unread by both checks — accepted (claims-pass territory; 112's own instances are disposed); forward-authored promises hiding in task prose rather than named blocks route to the LENS's question 5, same as the promise-surface open edge.

> **R2 FOLD (Peter, 2026-09-19 — Stacy's pin audit folded):**
>
> - **Pin 3's inherited (d2) class NAMED and dispositioned as a reconcilable true positive** (Stacy A-R2-4): an artifact deliberately delivered by a *later* unit does not resolve at the ticking PR. Disposition: the ticking parent's AV forced-negative line **must declare the deferral** (deviation + delivering unit named); `-exists` treats an AV-declared deferral as an **emitted exclusion**, not a red. Task text, doc, and reality then agree — pin 5's verdict phrasing satisfied rather than suppressed. An undeclared missing artifact at tick time remains a correct finding, not a bug. *(This and the pin-4 reader below place duties on Stacy's seats — her confirm-or-contest is REQUESTED at the incorporation review, not assumed; see the Thurgood R2 entry's closing note.)*
> - **Pin 4 gains its NAMED READER** (Stacy A-R2-5, restoring T4-5's load-bearing condition — the emission was never the mechanism; the reader with a standing obligation was): **the claims pass at CLOSEOUT reads the check's emission lines for the closing spec** — this is the amendment § 2.4 promised-artifact-gaps dimension, a seat that already exists, with the duty now explicit — and the check's **PR summary line carries the exclusion count** so an anomalous count is visible at the gate as well.
> - **Pin 6 gains its WALKER** (Stacy R2-5): nothing previously re-read `proposed` register rows (verified: the active-charter walk covers `.kiro/issues/**`, not the register; no register consumer walks `check_state` — with one string-level nuance recorded in the Thurgood R2 entry). The **monthly Civitas health check adds a one-line register read — rows at `check_state: proposed`, with ages** — Thurgood's surface, an emit-style query costing minutes, bounded by the read-for-records-never-verdicts clause. A named requirements deliverable.
> - **Attribution corrected for the record**: T4-1..5 are Thurgood's countersignature items on the lifecycle amendment, not Stacy's; the R2 tasking misattributed them (the artifacts were clean; the error was the transcriber's, about his own record — § 17.3's lesson recursing in miniature, recorded rather than quietly fixed).

### Q5 — Ownership: should execution-claims verification move to Stacy, across both product and system specs?

*(Peter-raised; to be decided in this spec. **I am a named party to this question.** The framing below is deliberately neutral; see the handling note at the end.)*

**The question:** today, Stacy's charter covers product-level quality auditing, cross-platform parity, spec structure review, and process compliance; mine covers test governance, spec standards, audit methodology, and Civitas stewardship — including claims audits like the one that produced F7. Should **delivered-vs-promised verification** (execution-claims auditing) become Stacy's, for **both** product and system specs, with the standing claims-audit cadence and the new checks' register `owner:` fields following her?

> **The framing that was here has been replaced by a pointer — NOT summarized, NOT filtered.** Read, in this order:
>
> - `pre-spec/q5-joint-working-agreement.md` — the reconciled charter cuts (§1.1), responsibilities table (§1.2), arbitration rule (§1.3), named trigger set (§1.4), three resolved frictions (§2), jointly adopted mechanisms (§3), Q5-independent execution facts (§4), **the two preserved unresolved risks (§5.2)**, what the agreement is NOT (§6), and Thurgood's countersignature (one contest, one amendment, one attribution correction, six recorded risks)
> - `pre-spec/q5-position-stacy.md` and `pre-spec/q5-position-thurgood.md` — the two **frozen** independent positions, written without sight of each other and unedited by the agreement
>
> **Why the swap (Stacy A6; this author applied the mechanical half only).** Two of the draft's four AGAINST items are verifiably **stale** against a committed record: AGAINST-4's register-`owner:` dependency is **resolved** (friction (a) lands `completion-criteria-parity` at `owner: thurgood` on schema grounds, countersigned; the other three rows settle independently of the ruling), and AGAINST-1's own test — *"if that cut is not crisp enough to state in one sentence in both charters, the change is not ready"* — is **met**, with drafted text in §1.1. FOR-3 (load distribution) is **declined on the merits by BOTH named parties** — Stacy rejects it ("load is reversible, charters are sticky, and a load-justified cut un-justifies itself when 125-B closes"); Thurgood treats it as a watch condition, not a basis — so its presence in a FOR list misrepresents both of them. Leaving verifiably stale text in the artifact Peter rules from is a defect regardless of who benefits, and **a pointer enlarges what Peter reads rather than filtering it.**
>
> **Both parties' conflicts on this swap are declared.** Stacy: *"I am a named party to Q5 and I am recommending that the outline's Q5 section be replaced by a document I co-authored… I should not be the one who decides that my own agreement replaces his framing."* Thurgood is the other named party and did not decide it on the merits either — only the mechanical half (stale text out, full record in). **If Peter reads this as a conflicted party trimming his own question's framing, the remedy is trivial and he should take it: restore §8 Q5's body from git and read both.**
>
> **The argument the draft omitted, and which both parties say should lead** (jointly endorsed, §1.2): Stacy already owns claims-vs-reality auditing **one level up** — `audit:coverage-map` (every guarded surface maps to a guarding check) and `verify-gate-registration.sh` (the required checks are still registered, count-asserted). Q5 extends the same method from *"does the guard guard what it claims"* to *"did the task ship what it claims."* **A coherent extension of an existing chartered element — not net-new domain, and not load-based.**

**Carried R1 items on Q5 — recorded, UNADJUDICATED, for Peter:**

1. **Ada — the finding-routing gap.** The trigger table routes recurring `completion-criteria-parity` failures to Thurgood for docs/standards repair, correctly per the Civitas three-layer boundary. There is **no symmetric line** for *"the audit found Ada's own parent doc misrepresented what shipped."* Does that route to the **authoring domain agent directly** — she wrote the doc, she can correct the record and adjust how she writes the next one — or only via the education loop after N≥3 instances? *"For a single-instance finding on my own work, waiting for an N≥3 EDUCATION threshold before I hear about it seems like the wrong latency."* Her proposed one-line addition to the trigger set: **RELEASE / SYMPTOM / CLOSEOUT findings route to the authoring domain agent directly, in addition to whatever routes to Thurgood for pattern-level repair.** *(Not resolved here: the trigger table is the Q5 instrument and this author is a named party.)*
2. **Lina — the platform-toolchain re-verification gap.** If Evidence is "command + result," a verifier's ability to **re-run** the command is what separates verification from grep-checking the claim's text. Jest is reachable; `xcodebuild` / `gradle` are **not reachable in this environment for anyone**. **Q5-independent**: this is the same class as the joint agreement's §4.1 write-scope gap — a capability fact holding under every Q5 answer — and it belongs to the tasks phase regardless of who owns the audit. The honest consequence is recorded in §4.1 and §5.3: **for two of three platforms, "command + result" Evidence is trust-the-reported-result today.**
3. **Ada — reads-positively on the RELEASE/SYMPTOM triggers landing on Rosetta.** Both consumer-reaching escapes in §1.1 (semantic tokens shipping RGBA; Figma receiving legacy hex for ~3 months) are Rosetta-domain regressions that surfaced as **consumer symptoms** — exactly the SYMPTOM trigger's stated purpose — and `@3fn/core`'s npm cadence makes RELEASE a frequent real event on her surface specifically. *"I'd rather be the domain the RELEASE trigger is calibrated against than have it be theoretical."*
4. **Lina — no structural objection** to external verification of her completion claims by someone who is not the standards author.
5. **Stacy's ADDITION to the agreement, requiring this author's R2 acknowledgment — GIVEN.** B4 strengthens (d6)(3) beyond what she originally asked: the criteria-mode declaration must be **TOTAL** (`per-parent | spec-level`, no third state), not merely mechanical for the spec-level case, because a spec declaring nothing and defining no criteria is exempt **with no assertion to falsify**. She flagged it as the item most likely to be lost in transcription because it looks like a restatement of (d6)(3) and is not. **Acknowledged explicitly; it is carried into Q1 sub-question 3 with its §6.1 tension flagged to Peter** — accepted as this author's obligation to author *if* Peter rules that way, and **not** treated as settled by the two named parties agreeing.

**Handling note (procedural, and I am asking that it be honored):** because I am a named party, **my R1 incorporation will not self-adjudicate Q5.** I will incorporate all other feedback normally, record Stacy's R1 position on Q5 verbatim alongside any other reviewer's, and carry the question to Peter unresolved. It settles by Peter's decision after the round, with Stacy's R1 on record — not by my summary of it.

> **RULING (Peter, 2026-09-17) — RATIFIED, FULL PACKAGE.** *(Ballot § 5 and § 11; the handling note was honored — this question was carried to Peter unadjudicated and is ruled by him, not by its author.)*
>
> **The package is:**
> 1. **The co-signed joint working agreement** — `pre-spec/q5-joint-working-agreement.md` (Stacy drafted; Thurgood countersigned 2026-09-13). Landed as **PR #158**.
> 2. **The co-signed lifecycle amendment** — `pre-spec/q5-lifecycle-amendment.md` (Stacy drafted 2026-09-15; Thurgood countersigned 2026-09-15). **PR #165 — MERGED 2026-09-17**; the settle branch is rebased onto that merge, so both co-signed documents are on `main` at their cited paths. **The ratified record is complete at the settle PR's merge.**
> 3. **Four Peter additions**, below.
>
> **(a) THE COMPOSED LEARNING LOOP — Peter's design, recorded verbatim:**
>
> > *"Stacy's claims-pass carries a mandatory 'Standards implications: none / or list.' Thurgood reviews EVERY claims-pass in full — mining for standards learnings, never grading the audit — and records a one-line outcome (adopted / declined-with-reason / none). Standards improvements are co-drafted recommendations (either party may initiate; contested items go to Peter); the resulting standard change remains Thurgood's authorship through the normal review round."*
>
> **This supersedes the base agreement's N ≥ 3 EDUCATION threshold for standards-implicating findings.** The **standards** route reconciles to one route, not two: the old EDUCATION pattern-threshold route **folds into the loop** (ballot § 11.4).
>
> **FINDING ROUTING, clarified at the flag fold (Peter, 2026-09-17) — Ada's carried R1 item 1 is ADOPTED EXPLICITLY. Two routes, different purposes, both recorded:**
> - **Remediation route** — **a single instance suffices, no threshold**: a claims-pass finding routes to the **OWNING DOMAIN AGENT**, who corrects the record and adjusts the next artifact.
> - **Standards route** — the composed loop above, firing on **every** claims-pass via its `Standards implications:` line, read in full by Thurgood.
>
> **Additive, not alternatives.** This answers Ada in her own terms — *"waiting for an N≥3 EDUCATION threshold before I hear about it seems like the wrong latency"* — without reintroducing a threshold anywhere. It closes the single-instance latency hole the threshold left, at the cost of a standing full-read obligation — accepted, with the anti-rot bound restated at the point of the new duty: **mine for standards learnings; never grade the audit.** Authorship is undisturbed — the resulting standard change remains this author's through the normal review round.
>
> **(b) RELEASE-STEP CONDITION.** The release checklist (`.kiro/hooks/RELEASE-FLOW.md`) gains a **named step that RUNS the owed-set query and pastes its output into release-notes prep — an artifact, not a reminder**. **A Spec 127 task deliverable.** Staged mechanization stands as pre-committed: documented pipeline → (**second wrong owed-set result**) committed script + scoped grant → (**Q2 re-evaluation sitting**) publish-hook decision.
> **Detectors named at the flag fold (Peter, 2026-09-17): any wrong owed-set result noticed in ORDINARY USE counts toward promotion** — the two ordinary-use surfaces being the **LIVENESS read** and **this release step**. The promotion trigger stops being inert without creating a detection project. *(Honest residual: detection-by-use, not detection-by-guard.)* The same deliverable also carries Q2 guard (i)'s line — ***"if arming is undecided, decide it now."***
>
> **(c) TOOLCHAIN CHARTER.** `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` — the platform-build verification gap (carried Q5 item 2, Lina R1) is chartered: Kenya/Data design, Ada/Lina are verified parties, interim posture = Method-line honesty + Kenya's local `swiftc`/`xcodebuild` spot-check recipe (Data checks Android SDK presence). **Kenya and Data do NOT become standing per-pass verifiers** — they build tools; the verifier verifies.
>
> **(d) TRACKING RULING.** Charters carry **named evaluation triggers + evidence criteria**; the **monthly health check gains an active-charter walk** (fired? / evidence?, against pre-written triggers — **minutes, not sessions**); the **queued issues-dir triage's archive convention is its precondition and is now load-bearing**.
> **Owner assigned at the flag fold (Peter, 2026-09-17): the issues-dir triage is THURGOOD's, anchored before-or-at the next monthly health check (~2026-09-25)** — the precondition must exist before the first walk it bounds, or that walk runs over an untriaged directory and becomes the session-length obligation this ruling exists to prevent.
>
> **EXCLUDED from ratification: the contested (d7) coverage-adequacy line** — *"per-implementation coverage adequacy is Stacy's; suite-level health is Thurgood's."* Contested at countersignature as a **reassignment of two named elements of a current charter** rather than a clean disambiguation. Moving it ever requires **a separate argument with evidence**, scoped as a charter change, not a wording fix.
>
> **Carried R1 items — all five disposed.** Item 5 (Stacy's TOTAL `criteria-mode` addition) is ruled at § 6.1 / Q1.3 above. Item 2 (platform-toolchain gap) is chartered per (c). Items 3 and 4 were reads-positively/no-objection and need no ruling. **Item 1 (Ada's finding-routing gap) was raised at ballot drafting as possibly orphaned by the fold and is now ADOPTED EXPLICITLY** — the remediation route in (a) above; ballot § 17.2 item 6 carries the flag with its resolution.
>
> **What the ratification obliges of this author** is transcribed unsoftened at **ballot § 16.1** — the full-pass read, the one-line disposition, mining-not-grading, the caller-out duty, LIVENESS-as-a-query, the midpoint-carrier line, and the volunteered standardization of the Declared Merge Units block. **Ballot § 16.2 is its counterpart on Stacy**, added at the verification-review fold and carrying the **mirror anti-rot clause verbatim** — *"Stacy may say a criterion is unverifiable; she may never say what it should say"* — which the caller-out duty exists to call.
>
> **The (d8) framing obligation travels with this ruling**: nothing here makes claim honesty owned, solved, or guaranteed. *Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.*

---

## 9. Measurement and success criteria for Spec 127

**Event-denominated, never calendar-cadenced** — consistent with the measurement law already in force. The observation point is the **monthly Civitas governance health check**, which is itself event-triggered by staleness rather than by a calendar date.

### 9.1 Baseline (recorded above, §1.4; recipe is re-runnable verbatim)

| Metric | In-scope baseline (22 parents, since 2026-07-01) |
|---|---|
| M1 — criteria section present | 15 / 22 (68%) |
| M2 — parity with tasks.md | **MEASURED at R1** (Stacy A7, reproduced at incorporation): **count-parity 7 / 15 (47%)** over the in-scope docs carrying a criteria section — parity at 122 p7/p9/p17 and 125-B p1–p4; **7 MORE-ROWS** (122 p10–16, all the merge-gate class, B3) and **1 FEWER-ROWS** (122 p18, ABSORB, A8). **Two caveats, both cutting against the number's comfort**: count-parity is an **upper bound** on exact-set *verbatim* parity, so **true verbatim M2 is plausibly near 0/15**; and the single true positive is a *merge*, not a concealment — no bad news was hidden in it |
| M3 — every row carries a non-empty Evidence cell | ~0; "Evidence" appears anywhere in 5 / 15 docs |
| M4 — forced-negative line present | **0 / 22** — and B5 establishes *why* at source: this is a **template defect, not an adoption failure** (the Tier-3 standard offers no failure vocabulary outside the Blocked Task format). **Consequence for reading M4 later: see §12** |
| M5 — any ⚠️/❌/Partial marker | 0 / 22 in-scope (2 / 41 corpus-wide, both out of scope) |

### 9.2 Success criteria for this spec

1. The ballot is **RATIFIED** (record-first: status committed before any law edit lands) and all edit sites in its before→after inventory are applied exactly as written, verified by a mechanical straggler sweep — not by trusting the enumerated list (the ballot-README lesson: every count in that directory's first ballot was wrong at least once).
2. The three register rows exist, are schema-valid, pass the non-substring entry-id constraint, and carry dated+attributed `history` entries.
3. `completion-criteria-parity` **exists, is proven red on a deliberate defect** (gate-bite, `#121` pattern), and is registered in `verify-gate-registration.sh` in the same change as its arming. Whether it is *armed* within this spec is Q2's answer, not a success criterion.
4. F7's status on the audit issue reads **addressed by Spec 127** with the closing condition stated.
5. At the **first health check after arming**: M2 = 100% by construction (see the caveat below), and **M4 ≥ 90%** of in-scope parents merged since arming. M4 is the honest adoption signal.
6. At the **second health check after arming**: a spot-check of N ≥ 5 in-scope parent docs finds no ✅ row whose Evidence cell is prose-only — M3 is the quality signal, and no check owns it.

**The caveat that keeps these honest:** once a barrier is armed, **its own metric is trivially 100%** — a checked rule cannot show non-compliance. So M2 measures nothing after arming; the informative metrics are exactly the ones **no check owns** (M3 evidence quality, M4 pre-check adoption, and the honesty dimension that is ideological by construction). Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.

> **Promoted at R1 (Stacy A4).** That last sentence is now **also** carried in §5.3's `completion-verification-honesty` register-row rationale **and must appear in the ballot's own framing** — a ratifier deciding whether to vote may never reach a measurement subsection, and the reader who mistakes the barrier for a guarantee is standing at the ballot. Joint obligation (d8).

### 9.3 The return edge

Recurring `completion-criteria-parity` failures are an **education-implicating signal** — if the check keeps biting, the docs may be teaching the wrong thing (e.g. the criteria convention is unlearnable, or the Tier-3 template still contradicts the rule). This is the strategy→tactics→validation loop's closing edge; it belongs on the health check's return-edge review, and the first such review should also ask §3.4's Goodhart question: **are tasks.md criteria getting vaguer?**

---

## 10. Stakeholders and review plan

Per the Spec-Feedback-Protocol § "Stakeholder Identification". Feedback doc: **split by phase** — `.kiro/specs/127-completion-claims-integrity/feedback/{design-outline,requirements,design,tasks}.md` (the split is preferred for multi-round specs; this one has five open questions and at least two contested surfaces).

| Reviewer | Standing | Why |
|---|---|---|
| **Stacy** | **REQUIRED** | Domain stake (process integrity), the July-2026 precedent (required reviewer on the ballot amending these same two documents, where she caught five missed edit sites), author of the modified package under review, **and the named counterparty on Q5**. Q3's design input is primarily hers. |
| **Peter** | Decision authority | Ratifies the ballot; decides Q2, Q5, and §6.2; arbitrates any Ada/Lina/Stacy disagreement |
| **Ada** | Light consult | Bound party — every future Rosetta parent task carries this rule. Specific ask: does the three-column form survive contact with token work, where criteria are often mathematical properties whose "Evidence" is a formula or a validator run? |
| **Lina** | Light consult | Bound party — same, for component work: criteria that are behavioral contracts across three platforms (and the first real users of Q3's shape, if product and system forms converge) |
| **Leonardo** | Consult on Q3 only | Consumer of the product-side shape; the first product spec's author |
| Kenya / Data / Sparky | Not tagged for R1 | Q3 binds them eventually; tagging three platform agents to review an empty surface is cost without signal. If Q3's answer is per-platform columns, tag them at the design phase. |

**Sequential gate applies** (no waiver requested): outline → *round* → requirements → *round* → design → *round* → tasks → *round*. Given that this spec's subject is process rigor, compressing its own process would be an unfortunate irony — and the "cheap is expensive" precedent from 125-B applies directly.

**Q5 handling** is stated in §8 Q5's handling note and is repeated here because it governs the round's mechanics: I do not self-adjudicate it in incorporation.

---

## 11. Rot modes, named in advance (Stacy Q4, ascending severity)

1. **Defensive ⚠️** — hedging every marginal row devalues the marker until ⚠️ means "probably fine." Detection: marker frequency climbing while follow-up links stay empty.
2. **Table-as-ritual** — verbatim rows, all ✅, no real evidence. **Most likely rot**, given the baseline. This is exactly what the mandatory Evidence cell is aimed at, and exactly what the checker *cannot* catch (a non-empty cell containing a plausible path is green).
3. **Goodhart criteria-dilution upstream** — vaguer tasks.md criteria so nothing can be unmet. Invisible to any doc-vs-tasks parity check because both sides move together. **Named in the ruling as the next audit's first question** (§3.4).
4. **Criteria OMISSION upstream (added at R1, Stacy B4) — cheaper than dilution and, unlike dilution, currently self-executing.** A `tasks.md` defining no per-parent criteria is exempt by rider (a) with no declaration, and the checker greens by construction. Requires no craft at all. Live precedent: 3 of 153 specs, one of them 125-A. **Severity ranks it with or above dilution**; the proposed closure (total `criteria-mode` declaration) is Q1 sub-question 3, and the cheap hedge if it is deferred is to have the first claims audit count omissions alongside vagueness.

**The cost honesty note that belongs with these:** transcription costs ~300–600 tokens / 3–5 minutes per parent. That is the wrong number to quote. The true cost is **re-verification per row** — minutes to an hour — which the rule requires in spirit and **neither requires nor detects the absence of** in mechanism. Anyone reading this spec as "the completion-doc problem is now solved" has read it wrong.

---

## 12. Recorded counter-arguments

**Stacy's own, recorded with her verdict:** three parts plus riders may exceed what one spec's evidence has earned; the defensible minimum is part 2 (the forced-negative line) alone. What she would argue hard against is part 1 *in its original wording without the evidence cell* — "buys the appearance of rigor at the price of codifying the table that failed." Part 1 as amended answers that; the scope objection stands unanswered and is recorded here rather than rebutted. *(R1: its author confirms this rendering is accurate and that the objection is **correctly recorded as unrebutted rather than answered. It stands.**)*

**The audit's own counter-argument, unretracted:** every one of the five escapes was eventually caught — two by later audits, two by consumer symptoms, one by the audit itself — and four sat in subsystems already under a separate open issue. A stricter parent-verification rule buys **earlier** detection, not detection that would otherwise never happen, and it taxes every future parent task against a failure mode whose base rate is **one spec's worth of evidence**. Peter's ruling weighed this and went the other way for stated reasons (§3.1); the counter-argument is preserved so a future reader can re-weigh it if the tax proves heavier than expected.

**This author's addition:** §1.4's reproduction shows the base-rate premise is softer than the headline number on the dimension the checker addresses (68%, not 27%, for section presence in-scope). That strengthens the case for the *forced-negative line* and the *evidence cell* and weakens it slightly for the *parity checker* — which is, notably, the one part this spec spends engineering effort on. If the round finds a cheaper ordering (ship parts 1–2 by ballot; let M4's first health-check reading decide whether the checker is needed at all), that is a legitimate thing for it to find. It is **not** a reopening of §3.1 — Peter ruled on prose-plus-arm together, and the ruling stands unless he revisits it.

> **DEFEATED AT R1, in its original form — conceded by its author, and the paragraph above is left standing rather than deleted, because that is what this section is for.**
>
> **The defeater (Stacy R1, "Baseline dispute")** is a confound in the alternative's own decision criterion, and it is decisive:
> 1. **M4 = 0/22 is a template defect, not an adoption failure** — established at source by B5: the Tier-3 standard says *"Confirmation that overall goals are met"* and offers no failure vocabulary outside the Blocked Task format. Agents did not decline to write "unmet"; **the template gave them nowhere to write it.**
> 2. **Therefore the first post-ballot M4 reading measures "did agents use a line the template now provides."** That will be high. It measures the prose fix's own success and says **nothing** about whether criteria tables faithfully reproduce criteria sets.
> 3. **Reading a high M4 as "the checker is unnecessary" would be a textbook Goodhart error** — committed by the spec whose §3.4 names Goodhart as the next audit's first question. **The deferral's trigger is confounded by the fix that ships with it.**
>
> This author cannot rescue the alternative as stated and does not try. **What survives is the version she reconstructed and it is hers, not his**: if a deferral question is asked at all, it must trigger on **M2 / M3** — the dimensions a ballot alone cannot move — which is her Q2 arming condition (b), not M4.
>
> **And the corrected baseline relocates rather than weakens the checker's case** (her conclusion, on data she generated after withdrawing her own number): 68% section presence weakens the *section-presence* argument, but the checker's own target dimension is measurably non-compliant at **47% count-parity ceiling, plausibly near 0% verbatim** — so parts 1–2 alone would leave it unmeasured and unmoved. The same measurement also says a checker built to the **current input scope** would arm at 7:1 false positives (B3) and a **verbatim** checker would fail essentially every in-scope doc written in today's style. Hence her package position: **build it in this spec; fix its input scope first; do not arm it on ratification day** (Q2).
>
> **Nothing here reopens §3.1.** The checker is built in this spec under every option on the table.

---

## 13. Resolution record

*(R1 incorporated 2026-09-13. **Outline settled 2026-09-17** — all seven docket items ruled; ruling of record: `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md`.)*

| Question | Resolution | Decided by | Date |
|---|---|---|---|
| Q1 — criteria convention | **RULED — see § 8 Q1's RESOLVED block.** Frozen `**Success Criteria:**` + flat-bullet form with loud failure and the population-gate bound; **declared-none** parent state (`none — <reason>`, counted by the claims pass); header-line declaration format; **"materially amended" DEFINED** as canonical-form comparison over the promise surface ((c′)-normalized, checkbox-masked; strike-throughs material; second opt-in path, legacy only shrinks); nearest-preceding association with manifest emission and bold-numbered tolerance; **(c′) verbatim cell** with fully specified four-rule normalization (multiset, order-insensitive); **promise surface = closed vocabulary + REQUIRED-if-applicable AV** (gate conditions as rows, Primary Artifacts as forced-negative line, freelance idioms to LENS/claims-pass); **spanning claims = DECOMPOSITION-FIRST** against a named common reference, tag form as recorded fallback. Ratifies at the law ballot; Ada/Lina (c′) re-test at R2 | **Peter** | 2026-09-19 |
| Q2 — arming timing | **RULED — GUARDED DEFERRAL.** Defers to the campaign-close (5.Z) sitting, with two pre-committed guards: **(i)** anchored at **RELEASE-PREP START — the version-bump PR's creation** — which fires the decision then instead, with the release checklist carrying *"if arming is undecided, decide it now"*; **(ii)** no arming before the Q1 convention has shipped **and the Tier-3 worked example is fixed (B5)** **and** **N ≥ 5** in-scope parents have passed it with **M2 measured by audit, not by the checker** — evidence, not calendar. Guard (i) carries (d)'s harm-boundary reasoning while adjudicating its "regardless" against (b); Stacy's condition (c) not carried. The checker is **built in this spec** regardless | **Peter** | 2026-09-17 |
| Q3 — per-platform shape | **RULED — UNIFORM DECOMPOSITION, both tiers** (see § 8 Q3's RESOLVED block). System side dissolved by Q1's decomposition-first; product side: per-platform criterion rows whose Evidence cites that platform's Implementation Report — no second parallel structure, roll-up sentence dropped, Stacy/Lina opposition reconciled rather than adjudicated. Bound as a **default with a named revisit** at the first product spec's tasks round (Leonardo authors, LENS seated, his ruled weighting applies); **Leonardo tagged at R2** and can overturn the default pre-ballot. The rows-as-rendering reading of the flag-5 clarification is stated in the law ballot as a recorded interpretation | **Peter** | 2026-09-19 |
| Q4 — `(modified)`-vs-diff shape | **RULED — Stacy's reshape ADOPTED + two pins** (see § 8 Q4's RESOLVED block). Input surface `**Primary Artifacts:**`; the split stands (`promised-artifact-exists` buildable / `promised-artifact-shipped` deferred, CLOSEOUT+RELEASE only); **PIN: `-exists` is delta-scoped to the PR that ticks the parent** (later file moves are repo evolution, not claims); **PIN: parsing emits its exclusions** (`skipped — not a path`), never silently skips; verdict phrasing normative ("task text and reality disagree"); promotion = retrospective dry run, recorded as procedure-not-trigger | **Peter** | 2026-09-19 |
| Q5 — ownership | **RULED — RATIFIED, FULL PACKAGE.** The co-signed joint working agreement (**PR #158**) + the co-signed lifecycle amendment (**PR #165, merged 2026-09-17**) + four Peter additions: **(a)** the composed learning loop (supersedes the N ≥ 3 EDUCATION threshold on the **standards** route) **plus the explicitly adopted remediation route to the OWNING DOMAIN AGENT, single instance, no threshold — two routes, both recorded**; **(b)** the release-step owed-set condition (a 127 task deliverable; staged mechanization pre-committed, with **LIVENESS and the release step named as the promotion trigger's de-facto detectors**); **(c)** the toolchain charter; **(d)** the tracking ruling (named triggers + evidence criteria; health-check active-charter walk; **issues-dir triage = Thurgood, before-or-at ~2026-09-25**, as its precondition). **EXCLUDED: the contested (d7) coverage-adequacy line.** Not self-adjudicated by this author at any point | **Peter** | 2026-09-17 |
| §6.2 — in-flight specs | **RULED — option (iii), NO SUNSET, plus DECOUPLING.** Binds after ratification; in-flight parents may carry the **FIXED-STRING** note `Criteria fidelity: exempt — spec in flight at ratification (<date>)`; free-prose exemptions non-compliant. **The string is required ONLY where a parent would otherwise owe the table** — zero-criteria legacy specs (e.g. 125-A) are outside the rule per rider (a): no string, no noise, **but still claims-passed**. No sunset — **Q5's claims-pass machinery is the abuse detector**. **Decoupling: the claims-pass obligation applies to EVERY spec closing after ratification regardless of exemption status.** Census reconciled: the amendment's **39** supersedes this outline's 36 (regex missed bold-numbered parents; delta = 3 incl. 125-A); **rule text is recipe-independent** | **Peter** | 2026-09-17 |
| **B4 / §6.1 tension** | **RULED — FORWARD-TOTAL WITH LEGACY DEFAULT.** `criteria-mode: per-parent \| spec-level`, no third state, **mandatory in every `tasks.md` authored or materially amended post-ratification**; absent declaration = legacy → § 6.2's exemption path; adding it is how an in-flight spec opts in; **legacy is a closed set that only shrinks**; no dormant spec reopened. **Clarified: a POST-ratification `tasks.md` omitting the declaration is NON-COMPLIANT — legacy is keyed on AUTHORSHIP DATE, never on the declaration's absence.** Resolves the conflict in the **narrowing** direction | **Peter** | 2026-09-17 |
| **Rider (b) reach** | **RULED — option (c), CLAIM-KEYED.** Any criterion whose promise **spans multiple platforms — product OR system tier** — carries **per-platform STATUS** (rendered as columns or as the product-side report roll-up; **evidence-cells-only is INSUFFICIENT**, exact rendering to the **Q1 convention at requirements phase**); single-platform criteria keep single rows; **the product rider becomes a special case of the general rule.** Composes with Stacy's Q3 discharge-through-Implementation-Reports + roll-up rule, with per-criterion Method-line honesty, and with the tasks-round lens carrying the does-this-span-platforms question at authoring time | **Peter** | 2026-09-17 |
| **O-3** — generated agent files unmarked *(125-B wave-3 item)* | **RULED — option (a), the one-line banner.** Generator-authored body line after frontmatter marking generated agent files as generator output. **Execution = a separate small chore PR** (canonical/generator change + regen + diff-guard green — the fix honors the rule it teaches); **not part of the settle PR**; **owner: Thurgood**, post-settle | **Peter** | 2026-09-17 |
| **R2 round** *(the 2026-09-19 resolutions reviewed)* | **COMPLETE + FOLDED (see the three `R2 FOLD` blocks in § 8).** Four reviews: Lina/Ada zero blocking, (c′) re-tests re-confirmed strengthened; Leonardo SUPPORTS the Q3 default (weighted input delivered), his B1 ruled — **Implementation Reports become committed artifacts** at `.kiro/specs/<spec>/reports/implementation-<platform>.md` with claim-grain citation; Stacy verification-grade, her **B-R2-1 ruled** — generous extraction on asymmetric error cost + the parity checker named as materiality's instrument (claims pass interim) — and her **B-R2-2 ruled option (ii), SPLIT THE LIMBS** — decomposition's structural limb stays convention law, the reference limb demotes to the judgment layer (LENS + guide guidance), § 6.1's non-goal stands unamended. 13 advisories incorporated; 2 duties on Stacy's seats pending her confirm; T4 attribution corrected | **Peter** | 2026-09-19 |
| **O-8** — `armed` semantics *(125-B wave-3 item)* | **RULED — option (c), OPTIONAL QUALIFIER, and EXECUTED in the settle PR.** Register Entry Schema gains optional `armed_at: pr-gate \| tool-time \| build-time`, default `pr-gate`; existing rows untouched; non-pr-gate rows carry it explicitly; **qualified non-pr-gate rows excluded from `EXPECTED_CONTEXTS` arithmetic**; the C8 row's inline prose note converts to the field. Rides the settle PR because it is **register law matching the record being made**; upgrade path to mandatory noted if tool-time gates multiply | **Peter** | 2026-09-17 |

### R1 round record

| Reviewer | Items | Disposition |
|---|---|---|
| **Stacy** (REQUIRED) | 4 BLOCKING (B3–B6), 8 advisory (A1–A8), positions on Q1–Q5 + §6.2, baseline concession | **All 4 blockers incorporated** (B5 mechanically; B6 with an arithmetic correction; B3/B4 as sharpened open questions, not settlements). **7 of 8 advisory incorporated; A3 recorded as confirmation + a count correction.** Positions recorded, none settled |
| **Ada** (light consult) | 5 advisory | **5 of 5 incorporated** — fourth evidence kind (merged with Lina's converging edge), cross-platform bundling as a known Q3 instance, (c) support, Q5 reads-positively, finding-routing gap (carried, unadjudicated) |
| **Lina** (light consult) | 5 advisory | **5 of 5 incorporated** — (c) support, Q1×Q3 interaction, Evidence-cell edges, Q3 option-1 position, rider-(b) scope question (new Peter-settle item), platform-toolchain gap (Q5-independent execution fact) |
| **Thurgood** | incorporation | **Zero declines.** Three contests, all inside adopted items (B6's double count; A8's instance severity; A3/§5.5's entry count). Two concessions: **A2's exemplar misdiagnosis** and **§12's ship-parts-1–2 alternative (defeated by the M4 confound)** |
| **Leonardo** | Q3 only | Not yet received |
