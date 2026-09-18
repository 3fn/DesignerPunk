# Ballot Measure: Spec 127 Outline Settle — the seven-item docket

**Date**: 2026-09-17
**Spec**: 127 — Completion-Claims Integrity (`.kiro/specs/127-completion-claims-integrity/`)
**Drafted by**: Thurgood (Civitas steward) — compiling rulings made by Peter in session
**Status**: **RATIFIED (Peter, 2026-09-17)** — all seven docket items ruled in-session at the outline-settle sitting, **2026-09-15 → 2026-09-17**, **plus seven same-day clarifications** answering the drafter's transcription flags (§ 17.2; folded at §§ 4, 5.2, 5.3, 5.5, 6, 7, 8, 9). Peter's **merge of this PR is the ratifying record act**.
**Reviewer (verification)**: **Stacy — review PERFORMED 2026-09-17** (verification-grade claims-vs-source; `.kiro/specs/127-completion-claims-integrity/pre-spec/ballot-review-stacy.md`). **2 BLOCKING + 6 advisory; both blockers fixed, five advisories applied, one routed to requirements phase** (§ 17.3). Formal confirmations **(a) / (b) / (c) all CONFIRM**, (b) on the amendment now applied at § 16.2. This ballot is a transcription of rulings the drafter did not witness, on a docket where he is a named party to one item (Q5) — transcription drift was the named risk, and the pass found two instances of it.

---

## 1. What this ballot records

Spec 127's design outline (`design-outline.md`, R1 incorporated 2026-09-13) carried a **batched decision list for Peter**: five items from the R1 round, plus two open items routed out of the 125-B wave-3 fold (`#160`). Peter held a settle sitting 2026-09-15 → 2026-09-17 and **ruled all seven in session**. This ballot is the record of those rulings.

**The docket, and where each ruling lives below:**

| # | Item | Origin | Ruling | § |
|---|---|---|---|---|
| 1 | **Q2** — arming timing for `completion-criteria-parity` | outline § 8 Q2 | **GUARDED DEFERRAL** to the 5.Z campaign-close sitting | § 4 |
| 2 | **Q5** — ownership of execution-claims verification | outline § 8 Q5 | **RATIFIED, FULL PACKAGE** (+ four Peter additions) | § 5 |
| 3 | **§ 6.2** — what binds in-flight specs | outline § 6.2 | **Option (iii)**, no sunset, plus decoupling | § 6 |
| 4 | **B4 / § 6.1** — the `criteria-mode` declaration tension | outline § 6.1, § 8 Q1.3 | **FORWARD-TOTAL WITH LEGACY DEFAULT** | § 7 |
| 5 | **Rider (b)'s reach** — per-platform status dimension | outline § 8 Q3 | **Option (c), CLAIM-KEYED** | § 8 |
| 6 | **O-3** — generated agent files are unmarked | 125-B wave 3 (`#160`) | **Option (a), the one-line banner** | § 9 |
| 7 | **O-8** — `armed` means PR-gate *and* point-of-use | 125-B wave 3 (`#160`) | **Option (c), OPTIONAL QUALIFIER** — executed in this PR | § 10 |

**What this ballot is NOT.** It is not the Spec 127 law ballot. The completion-doc law itself — the exact-set criteria table, the Evidence cell, the forced-negative line, the register rows, the before→after edit inventory for `governance/completion-documentation-guide.md` and `governance/Process-Spec-Planning.md` — remains a **requirements/design/tasks-phase deliverable** recorded in a separate ballot (`.kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md`, outline § 7). This ballot settles the docket that was blocking the requirements phase from opening. **Q1, Q3 and Q4 remain the requirements phase's work** and are not ruled here, except where rulings 4 and 5 bear on them.

---

## 2. Recording form, and why this ballot is Peter-merged

The record-first protocol (`.kiro/docs/ballots/README.md` § "The Ratification Protocol") requires the `RATIFIED` record to be **committed before any law edit is applied**. One law edit rides this PR: the O-8 register-schema amendment (§ 10). That is the protocol's own stated **end state** rather than a departure from it:

> *"Once the PR-gated workflow exists, ratification of governance-law changes becomes **Peter's PR approval** (branch protection + code-owner review on `governance/`) — platform-verified authority, superseding step 1's manual record for the cases the gate covers."* — ballots README

`governance/**` sits under the **standing governance carve-out** (Task-Completion-Protocol § "The Merge Rule"): the PR is Peter-merged regardless of check state, and a checks-only merge is not ratification. So the record and the single law edit it authorizes land in **one Peter-merged act**, and the record is auditable from the commit. O-8 was chosen for this treatment deliberately and narrowly — it is **register law about the register's own schema**, matching the record being made. No other governance file is edited by this PR (§ 15).

---

## 3. Carried in: the F7 full-package ruling (2026-09-13)

This docket sits on a prior ruling, cited not re-litigated.

**Ruled by Peter, 2026-09-13**, after an adversarial Stacy consult (`pre-spec/stacy-consult-2026-09-13.md`) and a mechanics consult (`pre-spec/thurgood-consult-2026-09-13.md`): **the FULL PACKAGE**, in Stacy's modified three-part form — (1) the exact-set verbatim criteria table with a mandatory Evidence cell, (2) the forced-negative line, (3) staged mechanization (build `completion-criteria-parity` in this spec; register the `(modified)`-vs-diff check proposed/deferred; register verification honesty as ideological with an explicit "no check owns it"). Peter's recorded reasoning: evidence of the failure already exists (the Spec 112 audit plus the measured base rate); **the dangerous failure channel is false assertion, not silence**; prose-only rules run at a demonstrated low compliance rate. **Prose and mechanical arm land together.**

Recorded with it: three scoping riders — (a) binds parents whose `tasks.md` defines per-parent criteria; (b) product-spec parents carry a per-platform status dimension; (c) **no backfill**. Source: `design-outline.md` § 3; origin `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` § F7.

**Nothing in this ballot reopens that ruling.** Rulings 1, 3, 4 and 5 below execute or scope it; ruling 5 extends rider (b)'s reach, which is an execution consequence of a settled rider rather than a reopening.

---

## 4. Ruling 1 — Q2 (arming timing): **GUARDED DEFERRAL**

**The question** (outline § 8 Q2): when does `completion-criteria-parity` flip to a required check? Three options were on the table: arm at 125-B campaign close (0 boundary charge); arm immediately (consumes 2 of K=3 exogenous boundary events and resets 125-B's segment n); or Stacy's R1 third option — arm on convention-adoption evidence, capped by the next release publish.

**RULING (Peter, 2026-09-17).** The arming decision **defers to the campaign-close (5.Z) sitting**, to be re-evaluated there with closeout-and-dial context in hand. The deferral carries **two pre-committed guards**, decided now so that deferral is not open-ended:

> **(i) Release guard.** If a release approaches before that sitting, **the Q2 decision fires then instead** — no release ships with the question unexamined.
>
> **(ii) Evidence guard.** Whatever is decided, **the checker does not arm before the Q1 convention has shipped AND real parents have passed it, verified by audit** — evidence, not calendar.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — §§ 17.2 items 3 and 4):**

> **Guard (i)'s event anchor is RELEASE-PREP START — concretely, the creation of the version-bump PR** (the v14.x pattern: the release branch's `package.json` bump + notes PR, `.kiro/hooks/RELEASE-FLOW.md` § "The sequence" steps 1–3). "A release approaches" is no longer a judgment: it is an event with a timestamp, anchored at the same grain as every other trigger in this system. **The release checklist carries the line: *"if arming is undecided, decide it now."*** That line is a second named step on the same deliverable as § 5.3's owed-set step.
>
> **Guard (ii) restores Stacy's N ≥ 5** — at least **five in-scope parents completed under the Q1 convention, with M2 measured BY AUDIT, not by the checker.** The number's omission from the first transcription of this ruling was **main-session transcription loss, now corrected**; the audit-not-checker clause was never in doubt and is why the number means anything (a checker measuring its own target dimension after arming reads 100% by construction).
>
> **Guard (ii)'s second conjunct, RESTORED at the verification-review fold (Stacy A-1 — same transcription-loss class as flag 4): the convention condition is "the Q1 convention has shipped AND the Tier-3 worked example is fixed (B5)."** Both conjuncts bind. B5 is a BLOCKING R1 item whose finding is that the Tier-3 worked example *"models effort-as-evidence"* — **arming a verbatim checker against a corpus whose canonical exemplar still teaches the defect is the wall argument one level in.** The practical risk was low (§ 15 bundles the example with the convention in the same U1 deliverable, so shipping one will in practice entail the other), but the conjunct was neither carried nor excluded, which is the accountability gap flag 4 already caught once in this same condition list. It is carried, not entailed.

**The carry, stated accurately (Stacy A-2 — correcting an overstatement in the first draft):**

> The first draft said *"guard (i) is her condition (d)."* It is not, and the record should not call an adjudication a preservation. **Condition (d) was a cap on ARMING** — *"capped: arm before the next release publish **regardless**."* **Guard (i) is a cap on DECIDING** — the Q2 decision fires at release-prep start. Guard (ii) then forbids arming before N ≥ 5, so a release-prep sitting may lawfully decide **not** to arm; **(d)'s "regardless" is resolved against, in favour of guard (ii)'s evidence floor.**
>
> **Guard (i) therefore adjudicates the tension inside her own (c)/(d) pair rather than carrying (d) intact**: it takes (d)'s **harm-boundary reasoning** (RELEASE is where both consumer-reaching escapes crossed) and drops (d)'s absolute. Recorded in her words, against her own list: *"my own condition list was internally inconsistent — (d) and (b) conflict whenever a release arrives before N ≥ 5, and I listed them 'in priority order' with (b) above (d). Ruling in favour of (b) is a legitimate adjudication of my tension, not a transcription loss."*

**What this preserves.** Guard (ii) carries Stacy's R1 conditions (a) and (b) **in full after the A-1 restoration**, restated as a floor under *any* decision rather than as one option's terms: a verbatim checker armed against the current authoring style would fail essentially every in-scope doc (§ 1.4's measurement: count-parity 7/15, true verbatim parity plausibly near 0/15). **That is not a gate, it is a wall** — and a barrier that red-lights every honest author on day one gets routed around or waived. Guard (i) carries condition (d)'s **harm-boundary reasoning** — RELEASE is the harm boundary, and both consumer-reaching escapes crossed it — while adjudicating (d)'s absolute against (b), per the paragraph above. Her condition (c) (time the flip to Wave 3's prune open for boundary-charge efficiency) is **not carried**; she self-flagged it as droppable optimization and as the one condition that couples 127's arming to another spec's schedule.

**Unchanged by this ruling:** the checker is **BUILT in this spec** under every option (§ 3.1's package; outline § 5.1). Q2 is scoped to the required-flag flip only.

**Counter-argument on the record.** Deferral means every parent completing in the interim ships unchecked — the rule runs on prose alone for exactly the period § 1.3 says prose does not hold. Peter weighed this against the wall argument and the campaign accounting and deferred with guards; the counter stands preserved so a later reader can re-weigh it if the interim runs long.

---

## 5. Ruling 2 — Q5 (ownership of execution-claims verification): **RATIFIED, FULL PACKAGE**

**The question** (outline § 8 Q5, Peter-raised): should delivered-vs-promised verification (execution-claims auditing) become **Stacy's**, for **both** product and system specs? The outline's author is a named party and **did not self-adjudicate**; the § 8 Q5 body was replaced by a pointer to the co-signed record and both frozen positions, and five carried R1 items were recorded unadjudicated.

### 5.1 What is ratified

**RULING (Peter, 2026-09-17): the FULL PACKAGE.** That is:

1. **The co-signed joint working agreement** — `.kiro/specs/127-completion-claims-integrity/pre-spec/q5-joint-working-agreement.md` (drafted by Stacy from the two frozen positions; countersigned by Thurgood 2026-09-13 with one contest, one amendment, one attribution correction and six recorded risks). Landed as **PR #158**.
2. **The co-signed lifecycle amendment** — `.kiro/specs/127-completion-claims-integrity/pre-spec/q5-lifecycle-amendment.md` (drafted by Stacy 2026-09-15; countersigned by Thurgood 2026-09-15 with one contest, three corrections and five § 5 additions). **PR #165 — MERGED 2026-09-17**; this branch is rebased onto that merge, so the amendment is present at the cited path and both co-signed documents are on `main`. **The ratified record is complete at THIS PR's merge.**
3. **Four Peter additions** — §§ 5.2–5.5 below.

**Excluded from ratification:** the contested **(d7) coverage-adequacy line** — § 5.6.

### 5.2 Peter addition (a) — **THE COMPOSED LEARNING LOOP** (his design)

Recorded verbatim, as given:

> **"Stacy's claims-pass carries a mandatory 'Standards implications: none / or list.' Thurgood reviews EVERY claims-pass in full — mining for standards learnings, never grading the audit — and records a one-line outcome (adopted / declined-with-reason / none). Standards improvements are co-drafted recommendations (either party may initiate; contested items go to Peter); the resulting standard change remains Thurgood's authorship through the normal review round."**

**What it supersedes.** The base agreement's **EDUCATION** trigger fired at **N ≥ 3** `completion-criteria-parity` failures in one observation window, with Stacy detecting and routing and Thurgood owning the repair (joint agreement § 1.4). **The composed loop supersedes that threshold for standards-implicating findings.** The trigger table is reconciled to **one route, not two**: the N≥3 pattern-threshold route **folds into the loop**. Every claims-pass now carries the standards question on its face, and every pass is read in full for it. See § 11.4 for the reconciled table.

**Why the fold matters, stated so it can be argued with.** The N≥3 threshold was the agreement's answer to Stacy's F-A (the return edge crosses the boundary: the agent who detects a standards defect cannot act on it, and the agent who can act does not see it unless it is routed). Her own verdict on her weaker alternative was *"a thin mitigation and I'm not going to pretend otherwise."* The loop closes the latency hole the threshold left — a single-instance standards learning no longer waits for two more instances — at the cost of a standing full-read obligation on Thurgood. That cost is his and it is accepted in § 16.1.

**The two constraints inside the loop are not decoration:**
- **"in full"** — the whole pass, not the Standards-implications line alone. A learning that the pass's author did not recognize as standards-implicating is exactly the learning a summary line would lose.
- **"mining for standards learnings, never grading the audit"** — this is the **anti-rot clause of joint agreement § 1.3.3 applied to a new surface**: Thurgood may check that an audit happened; he may never re-decide what it concluded. A full read of every pass is the configuration in which that rot mode is most available, so the prohibition is restated at the point of the new duty.
- **Authorship is undisturbed.** Standards improvements are **co-drafted recommendations, either party may initiate, contested items go to Peter** — and **the resulting standard change remains Thurgood's authorship through the normal review round**. That preserves the base agreement's dividing verb (author/maintain vs adjudicate, § 1.1) and Stacy's own N4 ("would refuse if offered" — standards authorship).

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 6): Ada's carried R1 routing item is ADOPTED EXPLICITLY. There are TWO routes, with different purposes, and both are recorded.**

| Route | Fires on | Goes to | For |
|---|---|---|---|
| **Remediation route** *(Ada's R1 item 1, adopted)* | **A single instance suffices** — no threshold | **The OWNING DOMAIN AGENT** — the agent whose work the finding lands on | Correcting the record and the next artifact: she wrote the doc, she can fix it and adjust how she writes the next one |
| **Standards route** *(the composed loop)* | **Every claims-pass**, via its mandatory `Standards implications:` line | **Thurgood**, who reads the pass in full and records a one-line outcome | Pattern-level repair of what the docs teach |

**They are additive, not alternatives**: a finding routes to the owning domain agent for remediation **and** its standards implications *additionally* follow the composed loop. This answers Ada's stated objection in her own terms — *"for a single-instance finding on my own work, waiting for an N ≥ 3 EDUCATION threshold before I hear about it seems like the wrong latency"* — and it does so without reintroducing a threshold anywhere: the remediation route has none, and the standards route fires on every pass. **The fold of the N ≥ 3 threshold into the loop removed a threshold from the standards route; it did not create a gap on the remediation side, because the remediation route is now named rather than assumed.**

### 5.3 Peter addition (b) — the **RELEASE-STEP CONDITION**

> **The release checklist gains a named step that RUNS the owed-set query and pastes its output into release-notes prep — an artifact, not a reminder. This is a Spec 127 task deliverable.**

**Where it lands**: `.kiro/hooks/RELEASE-FLOW.md` — the release sequence under the PR gate. The natural home is its second section, `## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)`, which the release author already works through before § "The sequence" step 1. **The edit is a Spec 127 tasks-phase deliverable and does NOT ride this PR** (§ 15).

**What the query is.** The owed-set predicate, from the lifecycle amendment § 2.3:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ballot's ratification date.

**Artifact, not reminder** is the operative word. A step that says "check whether a claims pass is owed" is a recollection; a step that **runs the query and pastes its output** produces a record that a later reader can audit — including a record that the set was empty. This is the same recollection→query sharpening the amendment applied to LIVENESS (§ 2.3), applied a second time at the release surface, which is where both consumer-reaching escapes crossed.

**Staged mechanization stands as pre-committed** (amendment § 6.2 rot mode 2, unchanged by this ruling): the predicate lives as a **documented pipeline**, not a committed script, because `scripts/**` is outside both agents' write scopes and this should not spend a scoped grant on convenience. **Promotion ladder, both rungs pre-committed here:** the **second wrong owed-set result** earns a committed script and a scoped grant; **once a script exists**, whether it becomes a publish-hook is decided at the **Q2 re-evaluation sitting** (5.Z campaign close, § 4) — the same sitting, so the release-surface mechanization question and the arming question are weighed together rather than drifting apart.

**The recorded trigger defect — RESOLVED at the flag fold (Peter, 2026-09-17; § 17.2 item 7a).** Thurgood's countersignature § T4-5 objected that the promotion trigger has no detector: *"a trigger nobody can fire is not weaker than a guarantee, it is inert."*

> **The de-facto detectors are NAMED: any wrong owed-set result noticed in ORDINARY USE counts toward promotion. The two ordinary-use surfaces are (1) the LIVENESS read at the monthly health check and (2) the release step above.**

No detection project is created and no new obligation is added — the two places the query is *already run* are the two places a wrong answer is *already visible*. The trigger stops being inert because it stops depending on a dedicated watcher: **the second wrong result noticed at either surface promotes the pipeline to a committed script with a scoped grant.** Candidly, this is detection-by-use rather than detection-by-guard, and it will not catch an omission that neither reader happens to recognize — but "noticed in ordinary use" is a fireable condition where "someone notices" was not.

**Second named step on this same deliverable** (§ 4's guard (i)): the release checklist also carries ***"if arming is undecided, decide it now."*** Release-prep start is Q2's event anchor, so the release surface carries **two** named lines — run-and-paste the owed set, and decide the arming if it is still open.

### 5.4 Peter addition (c) — the **TOOLCHAIN CHARTER**

A charter is opened for the platform-build verification gap surfaced by Lina's R1 item 2 and recorded in outline §§ 4.1 / 5.3: **nothing verifies that generated Kotlin/Swift compiles**, so for two of three platforms "command + result" Evidence is trust-the-reported-result **for any verifier**.

**Chartered as**: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` — problem statement, owners (Kenya/Data as designers; Ada/Lina as verified parties), the interim posture, named evaluation triggers, the evidence criterion, and sequencing. See that file for the full charter; it is not restated here.

**Two boundaries the charter fixes, restated because they are the ruling's substance and not the charter's detail:**
- **The audit gap is the symptom, not the problem.** The consumer-facing gap is that generated platform code is never compiled by anything we run. A claims auditor's inability to re-run `swiftc`/`gradle` is one consequence of it.
- **Kenya and Data do NOT become standing per-pass verifiers.** They design the harness; the verifier verifies. Making platform agents into per-pass verifiers would muddy the Q5 cut this same ballot ratifies.

### 5.5 Peter addition (d) — the **TRACKING RULING**

> **Charters carry named evaluation triggers + evidence criteria. The monthly Civitas health check gains an active-charter walk (fired? / evidence?, against pre-written triggers — minutes, not sessions). The queued issues-dir triage's archive convention is its precondition, and is now load-bearing.**

**The problem this answers.** A charter without a named trigger is a queued good intention; the corpus has ~145 files in `.kiro/issues/` and no convention that distinguishes a live charter from a closed record. An active-charter walk over an untriaged directory is not minutes — it is a session, and it is the kind of obligation that lapses quietly (the failure mode both Q5 parties independently named about BURST).

**Consequences, both ratified:**
1. **Every charter opened from here carries, in its own text, named evaluation triggers and an evidence criterion.** The toolchain charter (§ 5.4) is written to this standard and is its first instance.
2. **The issues-dir triage session moves from "queued nice-to-have" to a precondition** of the active-charter walk. Its archive convention is what makes the walk bounded.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 7b): the triage has an owner and an anchor.**

> **Owner: THURGOOD.** **Anchored before-or-at the next monthly Civitas health check (~2026-09-25).**

The anchor is the health check because that is the event the precondition serves — the archive convention must exist before the walk it bounds is first attempted. Doing the triage *at* the check is acceptable; doing it *after* is not, because the first walk would then run over an untriaged directory and be the session-length obligation this ruling exists to prevent. **Carried into the health-check items as an owned, dated precondition rather than a queued intention** — which is the tracking ruling applied to itself.

### 5.6 Excluded from ratification — the (d7) coverage-adequacy line

**EXCLUDED.** The joint agreement's (d7) recorded a pre-existing overlap — Stacy's charter says "test coverage verification," Thurgood's says "test suite health auditing" — deferred it as a follow-up, and offered a candidate disambiguating line *explicitly not adopted*: *"per-implementation coverage adequacy is Stacy's; suite-level health is Thurgood's."* Thurgood **contested that line at countersignature** (§ C2, (d7)): his charter's In-Scope list enumerates *accessibility test coverage auditing* and *behavioral contract test health auditing* as explicitly his, and both are per-implementation coverage adequacy by the candidate line's own definition — so the line does not disambiguate an overlap, **it reassigns two named elements of a current charter**.

**Peter's ruling: the contested line is excluded from this ratification, and moving it ever requires a separate argument with evidence.** Nothing in the ratified package turns on it. The overlap survives untouched, as it did before Q5.

---

## 6. Ruling 3 — § 6.2 (in-flight specs): **OPTION (iii), no sunset, plus decoupling**

**The question** (outline § 6.2): rider (c) says no backfill; rider (a) says the rule binds per-parent-criteria specs. Neither states what happens to a spec whose parents are **partly complete** when the ballot ratifies.

**RULING (Peter, 2026-09-17): option (iii).**

> The rule **binds after ratification**. In-flight parents may carry the **FIXED-STRING** exemption note:
>
> `Criteria fidelity: exempt — spec in flight at ratification (<date>)`
>
> **Free-prose exemptions are non-compliant.** A freely-phrased exemption is an unfalsifiable claim, which is B4's failure mode wearing a different hat.

**NO SUNSET CLAUSE.** Stacy recorded her own counter-argument against (iii) — it gives every in-flight parent a self-served exemption for an unbounded period, across a large population — and offered a sunset as the tightening. **The sunset is declined**, on the ground that **Q5's claims-pass machinery is the abuse detector**: exemption overuse surfaces as a pattern finding in a pass, routed through the composed learning loop (§ 5.2). The tightening, if one is ever needed, arrives as evidence rather than as a clause that expires on a date nobody is watching.

**DECOUPLING (the second half of the ruling, and the half most likely to be lost in transcription).** **The claims-pass obligation applies to EVERY spec closing after ratification, regardless of exemption status.** An exemption from the new table format is **not** an exemption from being audited. The judgment residual a pass covers — M3 evidence quality, M4 forced-negative adoption, promised-artifact gaps, Goodhart/omission (amendment § 2.4) — **does not depend on the new table format existing**, so it does not lapse when the format is exempted.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 2): the fixed string's scope.**

> **The fixed exemption string is required ONLY where a parent would otherwise owe the table** — i.e. in-flight specs whose `tasks.md` defines **per-parent criteria**. **Zero-criteria legacy specs (e.g. `125-A`) are outside the rule entirely by rider (a): no string, no noise.** They **still receive claims-passes**, per the decoupling above.

**The reasoning, stated so the rule stays falsifiable.** An exemption note is an assertion about an obligation. Where no obligation exists, the note asserts nothing and is pure ceremony — and requiring ceremony on specs the rule does not bind would make the fixed string a poor signal precisely where it matters (an auditor scanning for the string wants to find *parents that owe a table and are excused*, not every spec in the corpus). **This does not weaken B4's closure**, because B4's exit door is shut by ruling 4's forward-total declaration, not by the exemption string: a zero-criteria spec authored *post*-ratification is non-compliant for lacking the declaration, and a zero-criteria spec authored *pre*-ratification is legacy and audited by claims-pass. The string covers the middle case and only the middle case.

### 6.1 Census reconciliation (recorded so the number is auditable)

Two recipes produced two numbers for the in-flight population. **The amendment's 39 supersedes the outline's 36.**

| Source | Figure | Recipe |
|---|---|---|
| `design-outline.md` § 6.2 (Stacy B6, incorporated 2026-09-13) | **36** specs carrying both ticked and unticked parent tasks | checkbox scan whose parent regex **missed bold-numbered parents** |
| `pre-spec/q5-lifecycle-amendment.md` § 2.2 (2026-09-15) | **39** of 153 (25%) partially ticked | checkbox scan over top-level `- [x]` / `- [ ]` |

**Delta = 3 specs, including `125-A`** — whose parents are written `- [x] **1. Draft the workflow-law ballot**` (bold-numbered inside the checkbox), and whose parent 5 is `**5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**`, permanently open by design. Re-derived at ballot drafting: **153 specs with a `tasks.md`; 39 partially ticked.** The 39 is confirmed.

**The RULE text is recipe-independent** and does not inherit either number:

> **any spec with both ticked and unticked parent tasks at ratification**

This is deliberate. The census sizes the blast radius; it does not define the population. A recipe that drifts cannot silently change what the rule binds.

*Flagged at drafting and **RESOLVED at the flag fold** (§ 17.2 item 2): the 39 is the "both ticked and unticked" population, which is **not** the same set as "in-flight AND bound by the rule" — `125-A` defines zero per-parent Success Criteria and is exempt by rider (a) regardless of its in-flight status. **Consequence now ruled**: the 39 sizes the blast radius; the **bound-and-owing-a-string** subset is the per-parent-criteria members of it, and `125-A` and its two zero-criteria peers are not among them.*

---

## 7. Ruling 4 — B4 / § 6.1 (the `criteria-mode` declaration): **FORWARD-TOTAL WITH LEGACY DEFAULT**

**The question** (outline § 6.1 live tension; § 8 Q1.3): Stacy's B4 established that criteria **omission** is the cheaper sibling of Goodhart dilution and is **self-executing** — a `tasks.md` defining no per-parent criteria is exempt by rider (a) with no declaration required, and the parity checker greens by construction (live precedent: 3 of 153, one of them 125-A). Her proposed closure was a **total** `criteria-mode: per-parent | spec-level` declaration with no third state. The outline's author recorded the conflict against his own § 6.1 non-goal (*"no change to tasks.md criteria authorship standards"*) **and did not apply his own reading**, because he wrote that non-goal and his rule gains reach from the answer.

**RULING (Peter, 2026-09-17): FORWARD-TOTAL WITH LEGACY DEFAULT.**

> - The criteria-mode declaration — **`per-parent | spec-level`, no third state** — is **mandatory in every `tasks.md` authored or materially amended post-ratification**.
> - **Absent declaration = legacy**, routing to § 6.2's exemption path.
> - **Adding the declaration is how an in-flight spec opts in.**
> - **Legacy is a closed set that only shrinks.**
> - **No dormant spec is reopened** to add a declaration.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 1). The clarifying sentence, which governs the apparent conflict between "mandatory" and "absent declaration = legacy":**

> **A POST-ratification `tasks.md` that omits the declaration is NON-COMPLIANT. Legacy status is determined by AUTHORSHIP DATE — never by absence of the declaration.**

**What this fixes.** Read without it, "absent declaration = legacy" could be mistaken for a rule keyed on the *declaration's* absence, which would make omission a self-serve exit from the rule — **B4's exit door reopened one clause over**, and directly contrary to "legacy is a closed set that only shrinks." Keying legacy on **authorship date** closes that: the set was fixed at ratification and can only lose members (by opting in), never gain them. A post-ratification author who omits the declaration has not joined the legacy set; they have authored a non-compliant `tasks.md`.

**This resolves the recorded conflict in the NARROWING direction.** The declaration is total **going forward**, which is what B4's exit door required; it is **not** retrofitted onto 153 existing files, which is what § 6.1's non-goal protected against. The author's recorded reading (declaring a *mode* does not tighten what a criterion must **say**, so the Goodhart surface is untouched) is **vindicated in substance but bounded in reach** — and it was ruled by Peter, not applied by its author, which is what the handling note asked for.

**Cheap hedge, still live** (outline § 3.4): the first claims pass should count criteria-block **omissions** alongside criteria **vagueness**. The metric costs nothing and converts B4's prediction — that the omission rate rises once writing criteria creates an auditable obligation — into evidence. The legacy set is where that prediction is testable.

*Flagged at drafting and **RESOLVED at the flag fold** (§ 17.2 item 1) by the clarifying sentence above: **non-compliant**, and legacy is keyed on authorship date.*

**NAMED REQUIREMENTS-PHASE ITEM — "materially amended" is deliberately NOT defined here (Stacy A-3).** Ruling 4 binds `tasks.md` files *"authored **or materially amended** post-ratification."* A legacy file materially amended post-ratification is bound by that clause and legacy by the authorship-date key; the reconciling reading is that **material amendment is a second opt-in path — it does not alter authorship-date legacy membership, it exits it** (legacy still only shrinks). **The reading is recorded; the definitional grain is not set here.** A ballot compiling rulings is the wrong instrument for a threshold term — that is exactly the judgment-vs-event defect flag 3 was resolved by removing, and inventing a definition in a settle record would be the drafter legislating past the ruling. **The rule-text formalization owns it**: defining "materially amended" is a named deliverable of the requirements phase, carried in § 15's deferred table. Until it is defined, adding the declaration is the unambiguous opt-in path and should be preferred.

---

## 8. Ruling 5 — Rider (b)'s reach: **OPTION (c), CLAIM-KEYED**

**The question** (outline § 8 Q3, new sub-question, Lina R1): rider (b) as settled says *"product-spec parents"* carry a per-platform status dimension. Component parity claims have the identical failure shape, and Ada recorded known system-side instances on the token-generation surface (*"CSS/Swift/Kotlin outputs match"* as one ✅ that can hide a silently-wrong Android). Does rider (b) reach **system-side Stemma parity parents**, or only product screens?

**RULING (Peter, 2026-09-17): option (c) — CLAIM-KEYED.**

> **Any criterion whose promise spans multiple platforms — product tier OR system tier — carries per-platform status (or per-platform evidence cells). Single-platform criteria keep single rows. The product rider becomes a special case of the general rule.**

**Why claim-keyed rather than tier-keyed.** Neither "product only" nor "everything product and system" survives the evidence: tier-keyed-narrow leaves Ada's measured token-generation instances uncovered, and tier-keyed-wide taxes single-platform criteria with N/A noise (option 1's cost, named by Stacy). Keying on **the claim's own reach** puts the obligation exactly where the harm is — a single ✅ standing for three platforms — and nowhere else.

**Compositions, recorded as part of the ruling:**
- **With Stacy's Q3 discharge-through-Implementation-Reports + roll-up rule** (her option 4): the product side already has a per-platform structure (`Product-Handoff-Protocol.md:83-101`; one Implementation Report per platform, four forced-negative sections). Claim-keying does not require a second parallel structure; the roll-up rule — *a criterion is ✅ only if every applicable platform is ✅; if any applicable platform is unmet the row is ⚠️ and names the platform* — is what makes the discharge honest, and it is now a **general** rule rather than a product-local one.
- **With Method-line honesty**: the claims-pass Method line (amendment § 2.5, required section 3) must be able to express *"web verified / iOS not re-verified"* **per criterion**. That is the honest form given the toolchain gap (§ 5.4) and it is what keeps a spanning criterion from being silently rolled up at audit time as well as at authoring time.
- **With the tasks-round verifiability lens** (amendment § 1): the lens carries **the does-this-span-platforms question at authoring time**. Catching a spanning claim when the criterion is written is cheaper than catching it when the parent completes, and it is inside the lens's existing seat — no new event.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 5). The parenthetical is resolved in favour of status:**

> **Per-platform STATUS is the requirement.** It may be **rendered** as per-platform columns **or** as the product-side Implementation-Report roll-up. **Evidence-cells-only is INSUFFICIENT for a multi-platform claim.** The exact rendering belongs to the **Q1 convention at the requirements phase.**

**This is a ruling for Lina's objection on the substance and for Stacy's on the mechanism.** Lina's point was that a single roll-up ✅ *"is exactly the shape that let 112's escapes hide for months"*, and that structuring only the **Evidence** cell per platform leaves the **Status** cell free to hide an unmet platform. Requiring the **status** dimension is what closes that; allowing two renderings is what lets the product side discharge through the structure it already has (one Implementation Report per platform, four forced-negative sections) rather than building a second parallel one. **What is ruled out is the option that carried the harm**: per-platform evidence with a single undifferentiated status.

**What remains open, and where**: the rendering choice — columns vs rows vs the report roll-up — is **Q1 convention work at requirements phase**, because the checker's predicate reads whatever shape the convention fixes. Claim-keying decides **which** criteria carry the dimension; **status-is-the-requirement** decides **what** they must carry; **Q1 decides how it is written.**

**The live disagreement this ruling narrows but does not dissolve, recorded** (outline § 8 Q3): Stacy's discharge route rests on the roll-up rule; Lina identified the roll-up rule as *precisely what a mechanical checker cannot verify without parsing sub-cell structure.* That remains true of the report-roll-up rendering — and it is now a **rendering** question with a stated requirement above it, rather than an open choice about whether the dimension exists. Leonardo's Q3-only review was not received at R1 and Stacy's explicit instruction stands: **weight his input above hers on the product-side shape.**

---

## 9. Ruling 6 — O-3 (generated agent files are unmarked): **OPTION (a), the one-line banner**

**The question** (125-B wave 3, open item O-3, PR `#160`): generated agent files carry no in-file marking that they are generator output, so the "never hand-edit 122-generated files" rule depends on a reader knowing the provenance from elsewhere.

**RULING (Peter, 2026-09-17): option (a) — the one-line banner.**

> A **generator-authored body line, immediately after the frontmatter**, in generated agent files, marking them as generator output.

**Execution: a separate small chore PR — NOT part of this settle PR.** The unit is: change `canonical/**` + the generator, regenerate, and land with the **agent-generator diff-guard green**. The sequencing is the point: **the fix honors the rule it teaches** — a banner announcing "this file is generated, edit the canonical source" must itself arrive by editing the canonical source and regenerating, never by hand-editing the generated file.

**CLARIFIED (Peter, 2026-09-17, at the flag fold — § 17.2 item 7c): owner = THURGOOD**, as a **small chore PR post-settle**. No date is fixed and none is needed: it is a bounded, single-purpose change with a mechanical green condition (the diff-guard), not a dated obligation.

---

## 10. Ruling 7 — O-8 (`armed` means PR-gate *and* point-of-use): **OPTION (c), OPTIONAL QUALIFIER** — EXECUTED IN THIS PR

**The question** (125-B wave 3, open item O-8, PR `#160`): the `never-hand-edit-generated-token-outputs` row is the first to carry `check_state: armed` for a check that blocks **at its point of use** (the `figma:push` drift detection in a CLI workflow), not at the PR gate. Every other `armed` in the register means a required PR check. The wave fold stated the distinction **inline on the row** as an `armed_semantics_note` and raised the schema question to Peter, because *a schema amendment is a governance-law change to this document's own Entry Schema and belongs to Peter, not to a wave fold.*

**RULING (Peter, 2026-09-17): option (c) — OPTIONAL QUALIFIER.**

> - The register's **Entry Schema gains an optional `armed_at: pr-gate | tool-time | build-time` field**, **default `pr-gate`**.
> - **Existing rows untouched** — omission means a required PR check, which is what every prior `armed` already meant.
> - **Non-PR-gate rows MUST carry it explicitly.**
> - **The gate-registration counting excludes qualified non-pr-gate rows from `EXPECTED_CONTEXTS` arithmetic.**
> - **The C8 row's inline prose note converts to the field.**
> - **Upgrade path noted, not adopted**: if tool-time gates multiply, the field becomes mandatory — a later amendment with its own record.

**Execution: RIDES THIS SETTLE PR.** It is **register law, matching the record being made** — a schema amendment to the same document whose ratification protocol this ballot is exercising. Applied edits, before→after:

**Edit site 1 — `governance/classification-map.md` § "Entry Schema", `verification` field list.**
*Before*: the list ran `disposition` → `owner` → `check_state` → `checks` → `scope[]`; no field expressed how an `armed` check blocks.
*After*: an `armed_at` bullet is inserted **between `checks` and `scope[]`**, defining the three values and the default, and carrying four sub-rules — existing rows untouched (omission is not a defect); non-PR-gate rows carry it explicitly (`tool-time` = blocks at point of use; `build-time` = blocks the build); the `EXPECTED_CONTEXTS` counting rule (rows qualified `tool-time`/`build-time` register no PR context and are excluded, *"so counting them would manufacture the drift the count-assert exists to catch"*); and per-scope applicability (like `check_state` and `checks`, `armed_at` is per-scope on a scoped row). The upgrade path is recorded as noted-not-adopted.

**Edit site 2 — the same section's Illustrative Example.**
*Before*: the example's `checks:` line was followed directly by `scope:`.
*After*: three comment lines beneath `checks:` show the optional qualifier, its values, its default, and the counting exclusion. **This is a drafter's judgment call inside the ruled scope**, and the reason is the spec's own § 4.2 lesson (Stacy B5): *the canonical example every author copies is itself an edit site* — an example that omits the new field teaches its absence. Recorded here so a reviewer can strike it if Peter reads the ruling as schema-text-only.

**Edit site 3 — `governance/classification-map.md` § `never-hand-edit-generated-token-outputs` (the C8 row).**
*Before*: `verification.armed_semantics_note` carried a prose paragraph describing the PR-gate-vs-point-of-use distinction and recording the schema clarification as *"PROPOSED, not applied … (open item O-8)"*; the Figma scope entry's `checks[]` string cross-referenced `verification.armed_semantics_note`.
*After*: the `armed_semantics_note` field is **removed**; the Figma Variables + Styles scope entry carries **`armed_at: tool-time`** between `check_state: armed` and `checks:`; the `checks[]` cross-reference is re-aimed to *"see `armed_at: tool-time` on this scope entry; the O-8 schema qualifier ratified 2026-09-17 replaced this row's former inline `armed_semantics_note` prose."*

**Edit site 4 — that row's `history`.** A dated, attributed entry records O-8's execution and states explicitly that **the change is representational, not classificatory**: no disposition, `check_state`, `owner`, scope membership or education disposition changed — the Figma gate was tool-time before the edit and is tool-time after it.

**Straggler sweep performed, and RE-RUN with a corrected count** (ballots README § Conventions — sweep, never trust the enumerated list). The first draft reported *"the two live `classification-map.md` lines"*; **the grep returns three** (Stacy A-6), and in a ballot whose subject is claims matching their evidence, the stated result must match the command's actual output. Re-run, classified:

`grep -rn 'armed_semantics_note'` over the corpus (excluding worktrees and `node_modules`) — **10 hits in 4 files**, all accounted for:

| File | Hits | Classification |
|---|---|---|
| `governance/classification-map.md` | **3** | `:524` — a **live field**, the re-aimed `checks[]` cross-reference that names the removed field to explain the conversion (described separately at edit site 3). `:535`, `:536` — **historical prose** in two `history` entries, correctly naming the field the 2026-09-13 fold added and this one removed |
| `.kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md` | 2 | **Historical record of the wave-3 fold** — correctly stays as written (confirmed exact by the verification review) |
| `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` | 5 | This ballot's own before→after description of the conversion |
| `.kiro/specs/127-completion-claims-integrity/pre-spec/ballot-review-stacy.md` | 1 | The verification review that caught the miscount |

**No dead reference remains**; every hit is either a deliberate live cross-reference or a historical record. *The under-report was one line and mechanically harmless — recorded in full because "the count was approximately right" is the class of claim this spec exists to stop accepting.*

**MCP consequence: `governance/classification-map.md` is MCP-served. A `rebuild_index` is owed POST-MERGE.**

---

## 11. The Q5 charter change, summarized

Compiled from the two co-signed documents so a ratifier reads the substance in one place. **The co-signed documents are the authority; this is a summary, not a replacement.** Where they disagree with this section, they win.

### 11.1 The two charter cuts (proposed text, now ratified)

> **Thurgood** — Thurgood owns what completion evidence must *contain*: the standards that define it, the spec formalization that produces the criteria, the test-suite health and Civitas infrastructure that support it, the mechanical checks that enforce it, and the verification of claims whose evidence requires the steward toolset — he does **not** adjudicate whether a particular execution claim was true.

> **Stacy** — Stacy owns execution-claims verification: auditing whether a completed task's claims match what actually shipped, on both product and system specs, and owning those findings and the events that fire them — against standards she does not author and checks she does not maintain.

The dividing verb is **author/maintain** vs **adjudicate**.

**Product-side is not a grant.** Stacy's audit checklist already covers delivered-vs-promised on the product side. **The actual change is extension to system specs**, and the joint recommendation asked that the ballot state it that way — so the cut does not read as restating existing scope. It is stated that way here.

**The basis is separation of duties + method fit, NOT load.** Both parties rejected load-distribution on the merits (load is reversible; charters are sticky; a load-justified cut un-justifies itself when 125-B closes). The strongest argument, jointly endorsed: **Stacy already owns claims-vs-reality auditing one level up** — `audit:coverage-map` (every guarded surface maps to a guarding check) and `verify-gate-registration.sh` (the required checks are still registered, count-asserted). Q5 extends the same method from *"does the guard guard what it claims"* to *"did the task ship what it claims."* A coherent extension of an existing chartered element, not net-new domain.

### 11.2 What moves to Stacy

- Completion-claims audits (promised → claimed → shipped source) on **any** spec, product or system.
- The criteria-parity findings the check cannot reach — false ✅ on a reproduced row, prose-only evidence, Goodhart criteria-dilution.
- The rule's adoption/quality metrics (M3 evidence quality, M4 forced-negative adoption, M5 markers) — audit output, not check output.
- The claims-audit practice and its event triggers, **written into her charter text, not left as convention**.
- Register rows: `completion-verification-honesty` (ideological), `promised-artifact-shipped` (proposed/deferred), and `parent-completion-docs-present` if unbuilt/ideological.
- **NEW from the amendment**: the tasks-round **verifiability lens** seat, the specified **CLOSEOUT** pass, and (if adopted) **MIDPOINT**.
- Knowledge-base provisioning follow-on: source tree + git history added to her `knowledgeBases` (`canonical/agents/stacy.md`) — provisioning polish, not a blocker.

### 11.3 What Thurgood retains, and the carve-out

- **Standards authorship** — what a completion doc must contain. (Total agreement, independently reached: Stacy N4 *"would refuse if offered"*; Thurgood NN1.)
- Spec formalization, test-suite health, Civitas stewardship — unchanged by Q5.
- **The instrument**: checker source, CI wiring, `EXPECTED_CONTEXTS` registration and count-assert. **Stacy specifies the falsification fixtures.**
- The `completion-criteria-parity` register row at **`owner: thurgood`** — friction (a), resolved **against** Thurgood's own four-row enumeration on the register's schema text (`owner` fuses decision and check; for an armed barrier the decision *is* the check, so the field records who keeps the instrument true). The uncheckable residual attaches to `completion-verification-honesty` (`owner: stacy`), the row whose entire purpose is that no check owns it.
- **Education repair** when findings implicate the docs — now via the composed loop (§ 5.2).
- **STRAGGLER** and **LIVENESS** (below).

**The carve-out, in its narrowed tool-gated form** — adopted as written, including *ambiguity resolves to Stacy*:

> **Thurgood owns the verification decision on claims whose evidence *requires* the steward MCP verbs — `validate_metadata`, `list_cross_references`, `rebuild_index` — the three verbs D4 withholds by design. Every other claim, including gate registration, coverage-of-coverage, ballot straggler sweeps reachable by grep/git, and anything answerable from source, git, a test run, or a completion doc, is Stacy's. Ambiguity resolves to Stacy.**

**Both falsification conditions stay live and are ratified with it**: if Thurgood invokes the exclusion **more than once across the first three claims passes**, it narrows further; if the passes **never** encounter a steward-verb-gated claim, the exclusion is **dropped, not carried**. The carve-out is the **enumerated three verbs as of the agreement**, not a reference to whatever `canonical/agents/stacy.md` says later (C4-2) — if the verbs change, the carve-out is re-argued, not silently re-scoped.

**Arbitration** — all three adopted: the **question-routing test** (*"was this claim verified?"* → Stacy; *"what is a completion doc required to contain?"* → Thurgood; answering the other's question without saying so is boundary rot and the other should say so); the **tiebreaker direction** (ambiguity resolves to Stacy, always — the seam fails toward the verifier); the **anti-rot clause** (Thurgood may check that an audit happened, never re-decide what it concluded).

### 11.4 The reconciled trigger set — names, never numbers

Per (d1): *any ballot text must use the names, never the numbers* — a bare "T3" is ambiguous across the frozen record. This table is the joint agreement § 1.4 set **as amended by the lifecycle amendment § 4 and by Peter's composed learning loop**.

> **THE SUPERSET RULE, APPLIED HERE (restored at the verification-review fold, Stacy B-1).** The lifecycle amendment's one contest (T2-d) was against its own § 4 table, in exactly this role: ***"if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it."*** The first draft of this ballot's table **dropped the Scope column entirely** — reproducing the contested compression at greater magnitude, in the record that ratifies the contest's own document. **The Scope column is restored below, carrying § 1.4's binding text as amended, including all four clauses the contest asked restored.** The contest's disposition is recorded at § 12.1.

| Trigger | Event | Scope — the binding text | Owner | Δ at this ratification |
|---|---|---|---|---|
| **LENS** | The **tasks feedback round** of any spec | Verifiability review of every parent's criteria set — five questions (amendment § 1.2). **Not a gate; feedback entries only.** Bounded by the mirror anti-rot clause (§ 16.2) | Stacy | **NEW** (amendment § 1) — a *seat*, not a trigger; uses the existing Spec-Feedback-Protocol checkpoint, zero new events. **Now also carries the does-this-span-platforms question** (ruling 5) |
| **RELEASE** | Before a version publishes / at the release tag | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source** *(the specifying clause T2-d asked restored)* | Stacy | Unchanged — **non-negotiable**. **Now paired with the release-step condition** (§ 5.3): the checklist runs the owed-set query and pastes its output, and carries Q2 guard (i)'s arming line |
| **SYMPTOM** | A consumer symptom traced to "it was reported done" | Retrospective claims audit of the originating spec, **all ticked items** | Stacy | Unchanged — **non-negotiable** |
| **CLOSEOUT** | The merge of the spec's **final declared merge unit** | All the spec's parents: promised vs claimed vs shipped; the judgment residual the checker cannot reach (amendment § 2.4); **natural home for the spec-level-criteria discharge — rider (a)** *(the base-agreement clause T2-d's class asks carried; load-bearing after ruling 4 makes `spec-level` a declared state)* | Stacy | **SPECIFIED** (amendment § 2) — firing predicate, owed-set, output form, forced Method line, replacing a nine-word stub. **Now owed by every spec closing after ratification regardless of exemption status** (ruling 3's decoupling) |
| **MIDPOINT** | The merge of the unit **declared at the tasks round** as midpoint carrier, for specs declaring ≥ 3 merge units | Same as CLOSEOUT, **scoped to parents merged so far** | Stacy | **NEW, conditional** (amendment § 5); fires at most once per long spec |
| **ARMING** | A new barrier arms / the required-check set changes | `audit:coverage-map` + `verify-gate-registration.sh`; **plus `completion-criteria-parity` dormancy** (C4-1) | Stacy | C4-1 folded in — she detects dormancy on the row Thurgood owns; he repairs |
| **GATE** | Every PR carrying a parent completion doc | `completion-criteria-parity` fires mechanically — **exhaustive, no judgment** | **Instrument** (Thurgood maintains) | Unchanged — **the only per-PR grain that exists** |
| **EDUCATION** | **Every claims-pass**, via its mandatory `Standards implications: none / or list` line | The docs may be teaching the wrong thing. Thurgood reads the pass **in full**, records a one-line outcome, **mines for learnings and never grades the audit**; repair is co-drafted, authored by Thurgood | Stacy surfaces → **Thurgood** repairs | **SUPERSEDED AND FOLDED** — the N ≥ 3 pattern-threshold route is replaced by the composed learning loop (§ 5.2). **One route, not two**, on the standards side |
| **STRAGGLER** | Ballot ratification of a law that claims bind | **Edit-site straggler sweep — did every enumerated site get applied** *(the specifying clause T2-d asked restored)* | Thurgood (corpus-state) | Unchanged |
| **LIVENESS** | Monthly Civitas health check (staleness-triggered, not calendar) | **Meta-item only** *(restored — the textual anchor of the friction-(c) bound on Thurgood's own row)*: **"Is the closeout-owed set empty?"** — a query, not a recollection — **plus: did RELEASE / SYMPTOM fire in the window, and did each produce a committed record? Events without records = finding** *(restored — what makes a missing record a finding rather than a judgment call)*. **Plus the active-charter walk** (§ 5.5) | Thurgood | **SHARPENED** on the CLOSEOUT half (amendment § 2.3); the RELEASE/SYMPTOM detector half is **unchanged and carried**; the meta-item bound is **unchanged and carried** |
| ~~**BURST**~~ | ~~First session after a gap; N ≥ 3 parents merged since last audit~~ | ~~Cheap sampling pass; report M3/M4/M5~~ | ~~Stacy~~ | **RETIRED** — superseded by CLOSEOUT + MIDPOINT (amendment § 5.3). Its counter-argument is preserved: BURST was the only trigger firing on *nothing having happened* |

**Why the LIVENESS restoration is not housekeeping.** `closeout-owed(S)` is keyed on final-unit merge + `claims-pass.md` existence, so **it cannot see a missed RELEASE pass** — RELEASE has no owed-set by construction. Rendering LIVENESS as the owed-set query *alone* would have left the non-negotiable RELEASE trigger **with no lapse detector at all**, and would have contradicted this ballot's own § 18, which argues against the transfer on the ground that *"a missed RELEASE pass can sit undetected until the next health check"* — a sentence that presupposes the health check detects it. **Both halves of LIVENESS are carried; § 18's counter-argument now rests on a mechanism the record actually contains.** And "Meta-item only" is restored in the same document that *expands* Thurgood's reading surface twice (the active-charter walk at § 5.5, the full-pass read at § 16.1 item 1) — which is precisely when the bound matters most.

**Finding routing — TWO routes, added at the flag fold** (§ 5.2's clarification; § 17.2 item 6). The table's EDUCATION row is the **standards** route. Alongside it, and firing on **a single instance with no threshold**, the **remediation** route sends a claims-pass finding to the **OWNING DOMAIN AGENT** — the agent whose work it lands on — to correct the record and adjust the next artifact. **Both fire; they are additive, not alternatives.** A finding's standards implications *additionally* travel the loop.

**Merge-path status, explicit and unambiguous** (amendment § 3): **execution-claims verification is a POST-ACCEPTANCE AUDIT. No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** The load-bearing ground is the **co-signer argument**, not latency or overhead: if the verifier approves at the merge, her later audit audits her own approval — the self-attestation that friction (c) already rejected when it kept LIVENESS off her own command. *Even with infinite availability and zero overhead, a merge-path seat would still be wrong.*

### 11.5 Adopted mechanisms, carried unchanged

- **The fixture obligation** — *she specifies the falsification fixtures; he builds the checker; the checker must go red on her fixtures before it arms.* **No fixtures, no arming.** Adopted **regardless of Q5's answer**. Mitigation against a verifier-side arming veto: fixtures are reviewable on-branch, Thurgood may contest a fixture as out-of-scope for the rule as authored, and **Peter arbitrates a contested fixture**; a contested fixture that simply disappears from the set is the failure, and the record is how anyone sees it. **Timeliness amendment (C3-2), adopted**: the fixture set is a named deliverable of the checker-build unit, due at that unit's completion, not at arming; if undelivered, the condition escalates to **Peter** as a blocked deliverable — **neither agent may waive the obligation: not her by omission, and not him by declaring his own bar satisfied.**
- **The pilot** — Stacy's first claims pass is on **Spec 127's own completion docs**. Chartered **under any Q5 answer** (C4-4). *The spec that says self-attestation is not verification does not self-attest.* Honest caveat carried: 127's completion docs will be written knowing they are the pilot subject, so the pass measures the rule's ceiling, not its typical case; the first CLOSEOUT pass on an unrelated spec is the one that measures adoption.
- **`promised-artifact-shipped` must not fire per-PR** (d2/§ 4.4) — a later unit can legitimately deliver a prior unit's promised artifact. Its events are **CLOSEOUT** and **RELEASE**.
- **Separate ratifiability** (§ 4.5) — the charter change is separately ratifiable from the completion-doc law, even if both ride one ballot document. *If Q5 would delay the rule, Q5 yields.* Both parties stated it independently, from opposite directions (ballot hygiene; critical-path protection).

### 11.6 Execution note — charter edits are generator output

`Agent-Directory.md`, `canonical/agents/thurgood.md`, `canonical/agents/stacy.md` are **generator output** (Spec 122). The charter text is applied by editing **`canonical/**` and regenerating** — never by hand-editing `.claude/agents/*` or the generated `CLAUDE.md`. The regeneration lands on a **Peter-merged governance PR** under the standing carve-out, with the **agent-generator diff-guard green**.

**None of that rides this PR.** This ballot ratifies the charter change; **applying it is a Spec 127 tasks-phase unit** (§ 15). The joint agreement's § 4.5 recommendation stands: the charter edit + 122 regeneration should be **separable from U1** (the law-and-rows unit), as its own unit or its own separately-ratifiable ballot section — a decision for the tasks phase rather than a default.

---

## 12. Supersessions recorded

### 12.1 The two open contests across the co-signed documents

Two contests exist in the co-signed record. **The first draft of this ballot recorded one.** Both are recorded here, because a ratifying record that reports one of two contests is understating the open surface it ratifies.

**Contest 1 — the (d7) coverage-adequacy line** (joint agreement countersignature § C2). **EXCLUDED from ratification**; full disposition at § 5.6.

**Contest 2 — the lifecycle amendment's § 4 trigger table (countersignature § T2-d).** Verbatim: ***"COUNTERSIGN every delta on the merits — and CONTEST the replacement table as drafted, because it silently drops binding language from three rows it marks 'unchanged.' … Contest is narrow and entirely drafting: if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it. Restoring four clauses resolves it; no delta changes."***

The four clauses: LIVENESS's **"Meta-item only"** and **"Events without records = finding"**; RELEASE's **"— parent criteria tables vs `tasks.md` vs shipped source"**; STRAGGLER's **"— did every enumerated site get applied."**

**DISPOSITION: the contest is SUSTAINED and DISCHARGED in this ballot.** All four clauses are carried in § 11.4's restored Scope column, together with CLOSEOUT's rider-(a) discharge clause from the base agreement. No delta changes, exactly as the contest said — it was narrow and entirely drafting on both occasions it was needed.

**Recorded plainly, because the failure is instructive and the drafter is the one it lands on**: the first draft of § 11.4 dropped the **entire Scope column**, reproducing at greater magnitude the exact compression this contest was raised against — in the ballot that ratifies the contested document, by the party who wrote the contest. It was caught by the verification review (Stacy B-1), not by the drafter's own flag pass. The structural reason is at § 17.3.

### 12.2 Supersession table

| Superseded | By | Effect |
|---|---|---|
| Joint agreement **§ 1.4 trigger-table parenthetical** (BURST adopted-as-droppable; CLOSEOUT as a nine-word stub; LIVENESS as a recollection question) | **Lifecycle amendment § 3 table** (PR #165) | CLOSEOUT specified; MIDPOINT added; BURST retired; LIVENESS sharpened to a query; LENS seated; ARMING gains dormancy scope. **Net standing trigger count: zero change** (BURST out, MIDPOINT in) plus one seat inside an existing process |
| Joint agreement **EDUCATION trigger at N ≥ 3** parity failures in one observation window | **Peter's composed learning loop** (§ 5.2) | For standards-implicating findings there is now **one route, not two**: every claims-pass carries `Standards implications:`; Thurgood reads every pass in full and records a one-line outcome. The pattern-threshold route **folds into the loop** |
| Outline § 6.2's **36-spec** in-flight census | Amendment § 2.2's **39** (re-derived and confirmed at ballot drafting) | Blast radius sized correctly; the **rule text is recipe-independent** and inherits neither figure |
| Outline § 8 Q3's **"product-spec parents"** reading of rider (b) | **Ruling 5** (claim-keyed) | The product rider becomes a special case of a general, claim-keyed rule spanning both tiers |
| The C8 row's inline **`armed_semantics_note`** prose | **`armed_at`** schema field (§ 10) | Representational only — no classification changed |

**Two prior supersessions carried forward, not re-ruled** (recorded so the chain is readable): Stacy's **27% compliance figure is withdrawn by its author** on a reconstructed arithmetic error and is retired — cite **39% corpus-wide / 68% in-scope**; and the outline's **"strict verbatim penalizes a genuinely better artifact"** diagnosis is **withdrawn** — strict verbatim relocates the exemplar's substance rather than destroying it, and the real false-positive mechanism is the promise-surface mismatch (7 of 8 in-scope count-parity failures are faithful reporting of a stronger promise).

---

## 13. Exclusions

1. **The (d7) coverage-adequacy line** — excluded from ratification; § 5.6. Moving it ever requires a **separate argument with evidence**, scoped as a charter change rather than a wording fix.
2. **Q1, Q3 and Q4 are not ruled here** — they remain requirements-phase work under the sequential gate. Rulings 4 and 5 bear on Q1.3 and Q3 respectively and are recorded as such; nothing else about those questions is settled.
3. **Stacy's § 6.2 sunset** — declined; § 6.
4. **Stacy's Q2 condition (c)** (timing the flip to Wave 3's prune open) — not carried; § 4.
5. **A `verification.instrument_owner` schema field** — recorded as an option and **not adopted**, consistent with the joint agreement's own recommendation against a third governance-law surface on this spec. (Note that O-8 *did* amend the Entry Schema — a narrower change, and one that was already routed to Peter as an open item rather than proposed as part of 127's package.)

---

## 14. Release-manager inbounds (also ruled in-session)

Peter asked how this docket touches the retired release manager. **Three touchpoints, recorded:**

1. **Successor requirements now include the owed-set release step.** Any future release tooling inherits § 5.3's named step as a requirement, not as a convention it may re-derive.
2. **The staged mechanization is a deliberate, evidence-gated micro-rebirth of ONE release-manager slice** — and it is bounded as such. There is to be **no parallel second mechanism later**: the ladder is documented-pipeline → (second wrong result) committed script → (Q2 re-evaluation sitting) publish-hook decision, and that ladder is the only path.
3. **Spec 127's parseable completion docs rebuild the substrate the retired release-analysis subsystem lacked.** `CompletionDocumentCollector` and its siblings died on unstructured prose. A future rewrite's data model **exists as a side effect** of the criteria convention — not as a goal of this spec, and not as a reason to rebuild anything.

Appended, dated, to `.kiro/issues/2026-08-12-release-manager-retirement-execution.md`.

---

## 15. Edit sites — what lands in this PR, and what does not

**Lands in this PR:**

| Artifact | Change |
|---|---|
| `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` | **This record** (new) |
| `.kiro/docs/ballots/README.md` | "Ballots on record" entry |
| `.kiro/specs/127-completion-claims-integrity/design-outline.md` | Status → **SETTLED**; a `RULING (Peter, 2026-09-17)` block in each docket section; § 6.2 census corrected; § 13 resolution record populated |
| `governance/classification-map.md` | **O-8 executed** — Entry Schema `armed_at` field + example comment; C8 row note → field; history entry (§ 10). **The only governance-law file edited by this PR.** MCP-served → **`rebuild_index` owed post-merge** |
| `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` | **The toolchain charter** (new; § 5.4) |
| `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` | Dated inbound note (§ 14) |

**Deliberately NOT in this PR — each with its named vehicle:**

| Deferred item | Vehicle |
|---|---|
| The **completion-doc law** itself (guide + Process-Spec-Planning + Tier-3 worked example + TCP pointer + register rows) | The Spec 127 law ballot and its U1 unit |
| The **charter edits + 122 regeneration** (`canonical/agents/{stacy,thurgood}.md`, `Agent-Directory.md`) | A Spec 127 tasks-phase unit, separable from U1 (§ 11.6) |
| The **release-step condition** in `.kiro/hooks/RELEASE-FLOW.md` — now **TWO named lines**: run-and-paste the owed set, **and** *"if arming is undecided, decide it now"* (Q2's guard-(i) anchor at release-prep start) | A Spec 127 task deliverable (§ 5.3, § 4) |
| The **active-charter walk** in the monthly health check | Civitas health-check surface (§ 5.5) |
| The **issues-dir triage + archive convention** — its precondition | **Thurgood**, before-or-at the next health check (~2026-09-25) (§ 5.5) |
| **O-3's banner** | A separate small chore PR — canonical/generator change + regen + diff-guard green. **Owner: Thurgood**, post-settle (§ 9) |
| The **criteria-mode declaration** convention and the **midpoint-carrier line** in the Declared Merge Units block, **plus standardizing that block** | Thurgood's formalization surface, tasks phase (§ 16.1) |
| **The definition of "materially amended"** in ruling 4 — a threshold term the settle record deliberately does not set (§ 7; Stacy A-3) | **Requirements phase**, with the rule text that owns definitional grain |

**Execution sequencing note — PR #165 MERGED 2026-09-17; this branch is rebased onto that merge.** Both co-signed documents of the ruling-2 package are on `main` and present at their cited paths (`pre-spec/q5-joint-working-agreement.md`, `pre-spec/q5-lifecycle-amendment.md`). **The ratified record is complete at THIS PR's merge** — there is no remaining external dependency. *(This note previously read as a caveat that #165 was unmerged; it is superseded by the merge and rebase, and is restated rather than deleted so the sequencing is legible.)*

---

## 16. Obligations this ratification places on the two named parties

*Both sets live here so a later reader finds them in one place. § 16.1 was in the ballot's first draft; § 16.2 was added at the verification-review fold (Stacy B-2) — its absence meant the party **gaining** scope had no transcribed obligation set in the record that grants the scope, while the party **losing** it did.*

### 16.1 On Thurgood

Transcribed without softening, because the drafter of this ballot is the party they bind.

1. **Read EVERY claims-pass in full** (§ 5.2). Not the Standards-implications line; the whole pass. The learning the pass's author did not label as standards-implicating is the one a summary line loses.
2. **Record a one-line outcome on every pass** — `adopted` / `declined-with-reason` / `none`. A decline carries its reason **in the line**, not in a later recollection.
3. **Mine for standards learnings; never grade the audit.** This is § 1.3.3's anti-rot clause on a new surface: check that an audit happened, never re-decide what it concluded. The full-read duty is the configuration where that rot mode is most available. **If I find myself re-adjudicating a finding under cover of the review, that is the rot arriving and either party should say so out loud.**
4. **Use the mirror anti-rot clause — the caller-out duty** (amendment § 1.3). The lens must not drift into authorship. Concretely, as countersigned: *if she asks "what would satisfy you" and I find myself about to answer with text she then carries, or if a lens finding arrives as proposed criterion language, I say so at that exchange — not later, not in a findings ledger, and not by quietly accepting the help.* **A clause with no caller is decoration.**
5. **Hold LIVENESS as a QUERY over the owed-set, not a recollection** (amendment § 2.3). The health-check item reads the owed-set. A prose version of the same item is the failure mode it exists to prevent. Bounded by the anti-rot clause: **read for records, never for verdicts.**
6. **Carry the midpoint-carrier line as a `tasks.md` convention** — for specs declaring ≥ 3 units, the units block names which unit's merge carries the midpoint pass, fixed at the tasks round, never judged at merge time.
7. **Standardize the Declared Merge Units block** — volunteered at countersignature and larger than what was asked, because the predicate does not work reliably without it: **3 of 153 specs declare merge units, and only 2 use a heading literally titled `## Declared Merge Units`** (`119-B`, `125-B`); **`122` does not** — it declares eleven units under a bold paragraph plus a table. A predicate keyed on the block *title* fails on one of the three specs it most needs to work on. A single canonical form (heading + table) so both CLOSEOUT's and MIDPOINT's predicates key on **structure, not phrasing**.
8. **Author the criteria-mode declaration convention** in its ruled forward-total form (§ 7), and the **failure vocabulary** the Tier-3 template currently lacks (M4 = 0/22 is a template defect: the standard says *"Confirmation that overall goals are met"* and offers no ⚠️/❌ vocabulary outside the Blocked Task format).
9. **"Compliant" must be decidable without consulting the author.** Any interpretation question the verifier raises more than once is **a defect in my text, not a question to answer conversationally** — I fix the text.
10. **Notification, not permission, on every standards change** — before→after and effective date, charter-level, not courtesy.
11. **Honest documentation of the instrument's reach.** *A verifier who inherits an over-claimed instrument inherits the author's blind spot.* Two entries already stand: an Evidence cell containing a plausible-looking path is green regardless of truth; and for iOS and Android, "command + result" Evidence is **trust-the-reported-result for any verifier in this environment** (§ 5.4's charter exists because of the second).

### 16.2 On Stacy

**THE MIRROR ANTI-ROT CLAUSE — verbatim from lifecycle amendment § 1.3, at the countersigned strength.** The amendment attached an explicit drafting instruction to it (*"The joint agreement gave him an anti-rot clause and gave me none… It belongs in the same place, in the same form, and it should be in the ballot text if this amendment is adopted"*); Thurgood countersigned it in the strong form at T2-(a) (*"I accept the duty, named, and in the strong form… I will use it"*). **It was absent from the ballot's first draft, which left § 16.1 item 4's caller-out duty pointing at a clause the record did not contain** — *a caller with no clause* being the same defect as *a clause with no caller*, from the other end. Restored:

> **Stacy may say a criterion is unverifiable; she may never say what it should say.** If she finds herself drafting criterion text — even helpfully, even because it would be faster — that is the two-owner rot mode arriving from her side, and Thurgood should call it out as such.

This sits at the same strength as joint agreement § 1.3.3's clause pointed at Thurgood, and the two are enforced the same way: **named prohibition, named caller-out, called at the exchange rather than in a later ledger.** It binds the LENS seat specifically, which is where § 18's residual risk on the verifier's side lives.

**The duties, compiled.** These were distributed across §§ 5.2, 8, 11.2, 11.4 and 11.5; Stacy located all fourteen in her verification review and confirmed each. They are gathered here rather than restated — each cell names its home, and the sections remain authoritative.

| Duty | Home | Confirmed |
|---|---|---|
| The mandatory `Standards implications: none / or list` line on **every** claims-pass, including the 127 pilot | § 5.2, § 11.4 EDUCATION row | Yes |
| Completion-claims audits on **any** spec, product or system; owning those findings and the events that fire them | § 11.1, § 11.2 | Yes |
| The criteria-parity findings the check cannot reach — false ✅ on a reproduced row, prose-only evidence, Goodhart criteria-dilution | § 11.2 | Yes |
| M3 / M4 / M5 adoption-and-quality metrics as audit output — the metrics a green gate cannot produce | § 11.2 | Yes |
| The claims-audit practice and its event triggers, **written into her charter text, not left as convention** | § 11.2 | Yes |
| Three register rows: `completion-verification-honesty`, `promised-artifact-shipped`, `parent-completion-docs-present` (if unbuilt/ideological) | § 11.2, friction (a) | Yes |
| The **LENS** seat at the tasks round, including the **does-this-span-platforms** question (ruling 5) — bounded by the mirror clause above | § 11.4, § 8 | Yes |
| The **CLOSEOUT** pass — firing predicate, owed-set, `claims-pass.md`, forced Method line; **owed by every spec closing after ratification regardless of exemption status** (ruling 3's decoupling) | § 11.4, § 6 | Yes |
| **MIDPOINT**, conditional on ≥ 3 declared merge units | § 11.4 | Yes |
| **RELEASE** and **SYMPTOM** as non-negotiable standing obligations, with RELEASE's scope as § 11.4 now states it | § 11.4 | Yes |
| **ARMING**, including `completion-criteria-parity` dormancy detection (C4-1) | § 11.4 | Yes |
| **Method-line honesty per criterion** — *"web verified / iOS not re-verified"*; an unverifiable row is recorded as unverified, **never rolled into a ✅** | § 8, § 5.4's charter, amendment § 2.5 | Yes — *"I hold this one hardest: it is the clause that keeps a claims pass from becoming the doc-vs-doc audit my own N6 called 'a worse outcome than no change'"* |
| **Specify the falsification fixtures**; no fixtures, no arming; due at the checker-build unit's completion (C3-2) — **not waivable by omission** | § 11.5 | Yes |
| The **127 pilot** on this spec's own completion docs | § 11.5 | Yes |

**Formal confirmation status.** Stacy's verification review returned **(a) CONFIRM** (the composed learning loop, both named elements, plus the flag-6 two-route clarification), **(b) AMENDED** — amended on exactly one ask: that the mirror anti-rot clause appear in the ballot, verbatim, preferably in a section that also gives her duties one home — and **(c) CONFIRM** (the N ≥ 5 restoration: *"It is my bar, not an approximation"*). **This section is that amendment, applied as asked. With it, (b) is confirmed without reservation.**

Recorded with it, in her words, because a confirmation without its stated cost is cheap: *"this loop costs Thurgood a standing full-read obligation and buys me a faster return edge. I am the beneficiary. § 18's unrecovered cost — that a full read is weaker contact than doing the audit — is real, is not recovered by this, and should not be treated as recovered by anyone later reading § 5.2."*

---

## 17. Framing note, the seven drafting flags (all answered), and the verification-review fold

### 17.1 The framing obligation (joint (d8) + outline § 9.2, promoted at R1)

Carried here because **the reader who mistakes the barrier for a guarantee is standing at the ballot**:

> **Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.**

Verification honesty is **ideological by construction**. A named owner for the *practice* is not an owner for the *outcome*, and **nothing in this ratification makes claim honesty owned, solved, or guaranteed.** Once a barrier is armed its own metric is trivially 100% — a checked rule cannot show non-compliance — so the informative metrics are exactly the ones no check owns.

### 17.2 Raised at drafting, ANSWERED at the flag fold — all seven

The drafter was not present at the sitting. He raised **seven** places where a ruling as relayed was internally inconsistent, under-specified, or in tension with a record it composes with. **Peter confirmed all seven on 2026-09-17**, at the same sitting, as clarifications to rulings already made — not as new rulings.

**The flag texts below are preserved verbatim as raised, each with its resolution appended.** They are not deleted and not silently absorbed: the record should show that the transcription was interrogated and answered, because that is the same discipline this spec is about. Each resolution is also folded at its own ruling site (§§ 4, 5.2, 5.3, 5.5, 6, 7, 8, 9) and in the outline's corresponding `RULING` blocks.

1. **[RAISED] Ruling 4's two clauses pull against each other.** "The declaration is **mandatory** in every `tasks.md` authored or materially amended post-ratification" and "**absent declaration = legacy**" cannot both govern a post-ratification file that omits it — and "legacy is a **closed set that only shrinks**" says legacy cannot receive it. Is such a file non-compliant, or legacy? The closed-set clause implies the former; the absent-declaration clause reads as the latter.
   > **[RESOLVED — Peter, 2026-09-17]** **A POST-ratification `tasks.md` that omits the declaration is NON-COMPLIANT. Legacy status is determined by AUTHORSHIP DATE — never by absence of the declaration.** Folded as the clarifying sentence at **§ 7**. The flag's own reading (closed-set implies non-compliant) is the ruled one; keying legacy on authorship date is what makes "only shrinks" true by construction.

2. **[RAISED] Ruling 3's census names a wider population than the rule binds.** The 39 is "both ticked and unticked." It is **not** "in-flight AND bound" — `125-A`, one of the delta-3, defines **zero** per-parent Success Criteria and is exempt by rider (a) regardless. Does an already-exempt spec ever carry the FIXED-STRING note, and does the outline's superseded claim that *all* the in-flight population defines per-parent criteria survive the delta? (It does not, on the delta's own evidence.)
   > **[RESOLVED — Peter, 2026-09-17]** **The fixed string is required only where a parent would otherwise owe the table** — per-parent-criteria in-flight specs. **Zero-criteria legacy specs (e.g. `125-A`) are outside the rule per rider (a): no string, no noise** — and they **still receive claims-passes** per the decoupling. Folded at **§ 6**. The superseded "all 36 define per-parent criteria" claim does not survive the delta and is not relied on anywhere.

3. **[RAISED] Q2 guard (i) has no event predicate.** "If a release **approaches**" is a judgment, where every other trigger in this system is event-anchored (RELEASE fires at publish / at the tag). Who decides that a release is approaching, and at what point does the Q2 decision become owed?
   > **[RESOLVED — Peter, 2026-09-17]** **The anchor is RELEASE-PREP START — concretely, the creation of the version-bump PR** (the v14.x pattern). **The release checklist carries the line *"if arming is undecided, decide it now."*** Folded at **§ 4** and as a second named line on § 5.3's release deliverable. The judgment is removed: the guard now fires on an event with a timestamp.

4. **[RAISED] Q2 guard (ii) does not quantify "real parents."** Stacy's condition (b) said **N ≥ 5** in-scope parents completed under the convention with M2 measured **by audit, not by the checker**. The guard preserves "verified by audit" and drops the number. Intentional, or transcription loss?
   > **[RESOLVED — Peter, 2026-09-17]** **Transcription loss — N ≥ 5 is RESTORED**, with M2 measured by audit, not by the checker. Folded at **§ 4**. Recorded as what it was: the flag caught a dropped number, which is the specific failure mode this ballot's own reviewer gate exists to catch, one level up from the spec's subject.

5. **[RAISED] Ruling 5's parenthetical leaves Q3's crux open.** "Per-platform status **(or per-platform evidence cells)**" offers two shapes without saying who chooses — and per-platform evidence cells are exactly the shape Lina identified as reintroducing the roll-up risk, enforceable only by a rule *"a mechanical checker cannot verify without parsing sub-cell structure."* Claim-keying decides **which** criteria; **who decides the shape, and when** is unstated.
   > **[RESOLVED — Peter, 2026-09-17]** **Per-platform STATUS is the requirement** — rendered as columns **or** as the product-side report roll-up. **Evidence-cells-only is INSUFFICIENT for multi-platform claims.** The exact **rendering** belongs to the **Q1 convention at requirements phase**. Folded at **§ 8**. The option the flag identified as carrying the harm is the one ruled out.

6. **[RAISED] Ada's carried R1 item 1 may be orphaned by the fold.** Her ask was that **RELEASE / SYMPTOM / CLOSEOUT findings route to the authoring domain agent directly**, in addition to whatever routes to Thurgood for pattern-level repair — *"for a single-instance finding on my own work, waiting for an N≥3 EDUCATION threshold before I hear about it seems like the wrong latency."* The composed loop fixes the latency **for standards learnings**; it routes to Thurgood, not to the doc's author. Is direct routing to the authoring domain agent adopted, absorbed, or still open?
   > **[RESOLVED — Peter, 2026-09-17] ADOPTED EXPLICITLY.** **Claims-pass findings route to the OWNING DOMAIN AGENT for remediation — a single instance suffices, no threshold. Standards implications ADDITIONALLY follow the composed loop.** **Two routes, different purposes, both recorded.** Folded at **§ 5.2** (with the route table) and noted under the trigger table at **§ 11.4**. Not absorbed, not orphaned — named.

7. **[RAISED] Two ratified mechanisms depend on things with no named owner or detector.**
   (a) § 5.3's promotion ladder fires on "the **second wrong** owed-set result" — and the countersignature already recorded that this trigger **has no detector**: if the pipeline silently omits a spec, the short list looks healthy and nobody notices. *A trigger nobody can fire is not weaker than a guarantee, it is inert.*
   (b) § 5.5 makes the **issues-dir triage's archive convention** a load-bearing precondition of the active-charter walk, and § 9's O-3 chore PR is ruled but unassigned — **neither carries an owner or a date.**
   > **[RESOLVED — Peter, 2026-09-17]**
   > **(a) The de-facto detectors are NAMED**: **any wrong owed-set result noticed in ordinary use counts toward promotion** — the two ordinary-use surfaces being the **LIVENESS read** and the **release step**. No detection project, no new obligation; the places the query is already run are the places a wrong answer is already visible. Folded at **§ 5.3**.
   > **(b) Owners assigned**: the **issues-dir triage is THURGOOD's, anchored before-or-at the next health check (~2026-09-25)** (§ 5.5); the **O-3 banner chore is THURGOOD's, a small chore PR post-settle** (§ 9).
   > *Residual honesty, recorded rather than claimed away*: (a) is detection-by-use, not detection-by-guard — it cannot catch an omission that neither reader recognizes. It converts an unfireable trigger into a fireable one; it does not make the pipeline self-checking.

---

### 17.3 Post-review fold (2026-09-17)

**Stacy's verification review** (`.kiro/specs/127-completion-claims-integrity/pre-spec/ballot-review-stacy.md`, verification-grade claims-vs-source, 17 sampled claims confirmed clean) returned **2 BLOCKING + 6 advisory**. **Both blockers are fixed in this record, and all six advisories are dispositioned** — five applied, one (A-3) deliberately routed to the requirements phase rather than answered here.

- **B-1** — § 11.4 had dropped the Scope column entirely, reproducing the lifecycle amendment's one contest at greater magnitude while recording only one of the two contests in the co-signed record. **Fixed**: Scope restored as a superset (§ 11.4), all four contested clauses plus CLOSEOUT's rider-(a) discharge carried, contest recorded and dispositioned (§ 12.1).
- **B-2** — no counterpart obligations section, and the countersigned **mirror anti-rot clause** absent from the record. **Fixed**: § 16 restructured into 16.1 (Thurgood) and **16.2 (Stacy)**, carrying the clause verbatim at countersigned strength plus her fourteen compiled duties. Her formal confirmation (b) — AMENDED pending exactly this — **is confirmed without reservation with it added**.

**The structural lesson, recorded here rather than left in the review file, because it is exactly what the standards route this ballot creates exists to capture:**

> **The transcription risk is highest where the transcriber is most confident of the source.** A flag discipline pointed only at *relayed* material will systematically miss a party's compilation of their **own co-signed record.**

All seven of the drafter's own flags (§ 17.2) were raised against **relayed rulings** — the surface where he knew he was transcribing something he had not witnessed. **§ 11 was the surface where he was compiling documents he co-signed and therefore believed he knew**, and it was worked as settled summary rather than as a transcription surface. That is precisely where the compression landed: a four-column table replacing a five-column one, in a record whose only outstanding contest was *"if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it"* — **a standard the drafter had set on himself, and did not apply to himself.** The self-audit could not have caught it, because the self-audit was not pointed there.

**Two consequences worth naming.** (1) This is a live instance of the case for external verification made by the artifact under verification — the ballot argued that self-attestation is not verification, and was then improved by a pass it did not perform on itself. (2) The lesson belongs on the **standards route**: the flag-discipline guidance the requirements phase authors should say that a transcriber's confidence is an inverse signal, and that compilation-of-own-record is a named flag surface. **Routed as a standards learning, disposition: adopted** — to be carried into the Q1/rule-text formalization rather than left as a review-file observation.

---

## 18. Counter-arguments on the record (AICP)

- **Against the whole package, unretracted** (the audit's own): every one of the five escapes was eventually caught, and four sat in subsystems already under a separate open issue. A stricter parent-verification rule buys **earlier** detection, not detection that would otherwise never happen, and it taxes every future parent task against a failure mode whose base rate is one spec's worth of evidence. Peter weighed this on 2026-09-13 and went the other way for stated reasons.
- **Against Q5's transfer, from the party who gains it**: two conflicted parties agreeing is not a decision — it is evidence for one. The lapse risk is real and the mitigation is thin; both parties said so independently, in the same words. **A missed RELEASE pass can sit undetected until the next health check, and nothing goes red, because no check reads completion docs.** The failure shape changes from *"nobody thought it was theirs"* to *"the owner wasn't in the room."*
- **Against Q5's transfer, from the party who loses it**: authorship quality came from verification contact. *"The F7 rule text exists because I did the 112 audit… Author standards long enough without touching the artifacts and the standards drift toward the elegant and unlearnable."* The composed learning loop (§ 5.2) is the strongest available answer to this — a full read of every pass is more contact than the routing the agreement originally offered — but it is **weaker contact than doing the audit**, and that cost is not recovered.
- **Goodhart is upstream of the verifier and nobody has a lever**: criteria dilution happens in `tasks.md` during formalization. The fixture obligation gives partial purchase; the residual stands. **Criteria-dilution findings resolve by Peter's arbitration or not at all** — named here so it does not disappear.
- **Against the deferrals** (§§ 4, 5.3): a deferral with pre-committed guards is stronger than an open one, and weaker than a decision. Both Q2 and the publish-hook question now land at the same 5.Z sitting; if that sitting slips, both slip together.

---

## 19. Ratification

**The rulings recorded in §§ 4–10 and § 14 were made by Peter in session at the outline-settle sitting, 2026-09-15 → 2026-09-17.** This document is their compiled record, drafted by Thurgood, who was not present at the sitting.

**The 2026-09-17 clarifications are part of the ratified record.** The drafter raised seven points where the relayed record read as inconsistent or under-specified (§ 17.2); **Peter confirmed all seven the same day**, as clarifications to rulings already made rather than as new rulings. They are folded at their own ruling sites — **§ 4** (Q2's release-prep-start anchor, the checklist's *"if arming is undecided, decide it now"* line, and the restored **N ≥ 5**), **§ 5.2** (the two finding routes, Ada's item adopted explicitly), **§ 5.3** (the named de-facto detectors), **§ 5.5** (issues-dir triage: **Thurgood**, before-or-at ~2026-09-25), **§ 6** (the fixed string's scope), **§ 7** (post-ratification omission is **non-compliant**; legacy keyed on authorship date), **§ 8** (per-platform **status** is the requirement; evidence-cells-only insufficient), and **§ 9** (O-3 banner: **Thurgood**, post-settle chore PR) — and each is recorded with its originating flag preserved in § 17.2.

**Both co-signed Q5 documents are on `main`**: PR #158 (joint working agreement) and **PR #165, merged 2026-09-17** (lifecycle amendment), with this branch rebased onto the latter. **No external dependency remains; the record is complete at this PR's merge.**

**Peter's merge of this PR is the ratifying record act.** Per the record-first protocol, an agent asked to apply any part of this measure verifies **one mechanical fact** — that the committed ballot says `RATIFIED` — and makes no authority judgment about who relayed the instruction. If the committed record is missing or says otherwise, report that rather than applying, and rather than refusing-and-stopping.

**Verification review: PERFORMED, and its findings are folded into this record.** Stacy reviewed this transcription against the source records — `design-outline.md`, `pre-spec/q5-joint-working-agreement.md` (PR #158), `pre-spec/q5-lifecycle-amendment.md` (PR #165, merged), the two frozen position files, `feedback/design-outline.md`, the 125-B wave-3 open items in PR #160, and the committed O-8 diff — at verification-grade claims-vs-source. Her record: `pre-spec/ballot-review-stacy.md`.

**Outcome: 2 BLOCKING + 6 advisory, 17 sampled claims confirmed clean.** Both blockers are fixed (§ 17.3); five advisories applied and one (A-3) routed to the requirements phase as a named item. **Formal confirmations: (a) CONFIRM, (b) CONFIRM — amended-pending the mirror anti-rot clause, which § 16.2 now carries verbatim — (c) CONFIRM.** She contests nothing in the ratification's substance and proposes no re-ruling; both blockers ran in the direction of **more** constraint, one of them on herself.

**The second pass found what the self-audit could not**: § 17.2's seven flags were pointed at *relayed* rulings; both blockers landed in § 11, where the drafter was compiling **his own co-signed record**. The lesson is at § 17.3 and is routed as a standards learning.

**Status**: **RATIFIED (Peter, 2026-09-17)**
