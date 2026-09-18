# Ballot Review — Spec 127 Outline Settle (verification-grade, claims-vs-source)

**Reviewer**: Stacy (product governance & QA)
**Date**: 2026-09-17
**Branch**: `task/127-outline-settle`
**Subject**: `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` (working-tree state, 19 sections), plus the SETTLED outline, the toolchain charter, the retirement-execution inbound, and the O-8 execution in `governance/classification-map.md`
**Standard applied**: verification-grade claims-vs-source (#141) — every verdict below names the source I checked and the sample I took. I did not take any compiled claim on the drafter's word.
**Scope note**: this is the transcription-risk guard the exchange record owes at ratification. It is a review of the RECORD's internal coherence and fidelity to its committed sources. Peter's rulings are in-session acts; I do not review the rulings themselves.

---

## Verdict summary

| Class | Count | Items |
|---|---|---|
| **BLOCKING** | **2** | B-1 (§ 11.4 reproduces the amendment's only contest, at greater magnitude, unrecorded); B-2 (no § 16 counterpart; the countersigned mirror anti-rot clause is absent from the ratified record) |
| **Advisory** | 6 | A-1 … A-6 |
| **Confirmed clean** | 17 sampled claims | § "Confirmed clean" |

**Formal confirmation**: (a) **CONFIRM**, (b) **AMENDED**, (c) **CONFIRM**. Detail at § "Formal confirmation".

Both blockers are fixable by the drafter in one pass, neither requires a re-ruling, and neither reopens a settled decision. Both run in the direction of **more** constraint on the record, and B-2 runs in the direction of more constraint on **me** — stated plainly because a reviewer who is also a beneficiary of the ruling should be read with that discount applied, and both of my blockers survive it.

---

## BLOCKING

### B-1 — § 11.4 reproduces, at greater magnitude, the one contest in the lifecycle amendment — and the ballot never records that the contest exists

**The claim under review.** Ballot § 11.4 presents "the reconciled trigger set" as *"the joint agreement § 1.4 set as amended by the lifecycle amendment § 4 and by Peter's composed learning loop."* Ballot § 5.1 item 2 describes the amendment as *"countersigned by Thurgood 2026-09-15 with one contest, three corrections and five § 5 additions."*

**Source.** `pre-spec/q5-lifecycle-amendment.md` § T2-(d), lines 376–389, and the T5 signature block (line 480). That **one contest** is, in full:

> *"**COUNTERSIGN every delta on the merits — and CONTEST the replacement table as drafted, because it silently drops binding language from three rows it marks 'unchanged.'** … **Contest is narrow and entirely drafting: if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it.** Restoring four clauses resolves it; no delta changes."*

The four clauses he asked to have restored (T2-d, lines 385, 389):
1. LIVENESS — **"Meta-item only"**, which he identifies as *"the textual anchor of the friction-(c) bound on my own row"*
2. LIVENESS — **"Events without records = finding"**, *"what makes a missing record a finding rather than a judgment call"*
3. RELEASE — **"— parent criteria tables vs `tasks.md` vs shipped source"**
4. STRAGGLER — **"— did every enumerated site get applied"**

**Finding.** Ballot § 11.4's table has columns `Trigger | Event | Owner | Δ`. **The Scope column is gone entirely.** Both source tables (joint § 1.4 lines 78–88; amendment § 4 lines 169–181) carry Scope, and Scope is where every one of the four contested clauses lives. The ballot is therefore a *further* compression of the artifact the contest was raised against, and the contest — the single open drafting item across both co-signed documents — appears nowhere in the ballot. Verified by grep over the ballot: `Meta-item`, `Events without records`, `release delta`, `last-tag`, `enumerated site`, `superset`, `T2-d` all return **zero hits**.

**What is lost, in consequence order:**

- **RELEASE/SYMPTOM lapse detection has no home in the ratified record.** Joint § 1.4's LIVENESS scope reads *"did RELEASE / SYMPTOM / CLOSEOUT fire in the window, and did each produce a committed record? Events without records = finding"*; the amendment sharpened the CLOSEOUT half to the owed-set query **while keeping the RELEASE/SYMPTOM half** (amendment § 4, line 180: *"— a query, not a recollection — **plus**: did RELEASE / SYMPTOM fire in the window with a committed record"*). The ballot renders LIVENESS as the owed-set query only (§ 11.4, and again at § 16 item 5). `closeout-owed(S)` is keyed on final-unit merge + `claims-pass.md` existence — **it cannot see a missed RELEASE pass**, and the amendment's own § 7/T2-(g) records that RELEASE has no owed-set *by construction*. So the ballot as drafted leaves my non-negotiable trigger with no lapse detector at all.
  **This contradicts the ballot's own § 18**, which argues against the transfer on the ground that *"a missed RELEASE pass can sit undetected until the next health check"* — a sentence that presupposes the health check detects it. § 11.4 removed the mechanism § 18 relies on.
- **The bound on Thurgood's own row is gone.** "Meta-item only" is the textual anchor of friction (c) — the clause that keeps LIVENESS a records-read and not a verdict-read. He asked for it to be restored **against himself**. Ballot § 5.5 simultaneously *adds* a new reading duty to that row (the active-charter walk) and § 16 item 3 adds a full-read duty elsewhere. Dropping the "meta-item only" bound in the same document that expands his reading surface is exactly the drift the clause exists to prevent.
- **My non-negotiable's content is unspecified.** Ballot § 11.4's RELEASE row now reads only *"Before a version publishes / at the release tag."* What the pass consists of — the release delta `git log <last-tag>..main`, parent criteria tables vs `tasks.md` vs shipped source — is not in the ratified record.
- **Rider (a)'s closeout discharge has no home.** Joint § 1.4's CLOSEOUT scope names it: *"natural home for the spec-level-criteria discharge (rider (a))."* Not in ballot § 11.4, and not elsewhere in the ballot (grep: `spec-level-criteria discharge` → zero hits). This matters more after ruling 4, which makes `criteria-mode: spec-level` a first-class declared state: the ballot creates the declaration and drops the obligation that discharges it.
- **STRAGGLER's content is gone** — lower stakes, same class.

**Mitigating factor, stated.** Ballot § 11 opens with *"The co-signed documents are the authority; this is a summary, not a replacement. Where they disagree with this section, they win."* That disclaimer is real and it is why this is a fixable drafting blocker rather than a substantive misruling. It does not discharge the finding: § 11.4 is titled "the reconciled trigger set," carries a Δ column asserting per-row reconciliation, and is the artifact a later reader will use. A summary that silently drops binding text while asserting reconciliation is the compression the contest named.

**Fix (drafter's, not mine).** Restore a Scope column carrying § 1.4's binding text as amended — or, if the table must stay four-column, carry the five lost clauses inline in the Δ cells. Additionally: record the T2-d contest and its disposition, either in § 11.4 or in § 12, the way (d7)'s contest is recorded at § 5.6. Two contests exist across the co-signed documents; the ballot records one.

**Counter-argument against my own finding.** A ballot is not obliged to reproduce every clause of every document it ratifies, and § 11's disclaimer plus the cited paths make the full text one click away. A reviewer demanding that a summary be a superset is arguably demanding the summary stop being one. I hold the finding anyway, for a reason specific to this record: the contest **already ruled** that this particular table, in a replacement role, must be a superset — the standard was set by the countersigning party, on himself, and it was not applied.

---

### B-2 — There is no § 16 counterpart for Stacy, and the countersigned mirror anti-rot clause is absent from the ratified record

**The claim under review.** Ballot § 16, *"Obligations this ratification places on Thurgood"* — eleven items, transcribed *"without softening, because the drafter of this ballot is the party they bind."*

**Finding 1 — no counterpart section exists.** Verified: the ballot has no "Obligations … on Stacy" section (heading scan of all 19 sections). My duties are distributed across § 5.2 (the mandatory `Standards implications:` line), § 11.2 (seven bullets), § 11.4 (the Owner column), § 11.5 (fixtures, the pilot), and § 8 (Method-line honesty, the span-platforms lens question). I located them and I accept them — see § "Formal confirmation" (b). The asymmetry is *defensible in rationale* (§ 16 exists because the drafter is self-binding), but its effect is that the party who **gains** scope has no transcribed obligation set in the ratified record while the party who **loses** it does. For a ratification whose own § 18 records "two conflicted parties agreeing is not a decision," that asymmetry reads the wrong way around.

**Finding 2 — and this is the blocking half. The mirror anti-rot clause is not in the ballot.** Source: `pre-spec/q5-lifecycle-amendment.md` § 1.3, line 52:

> **"Stacy may say a criterion is unverifiable; she may never say what it should say."** If she finds herself drafting criterion text — even helpfully, even because it would be faster — that is the two-owner rot mode arriving from her side, and Thurgood should call it out as such.

The amendment attached an explicit drafting instruction to it (line 54): *"The joint agreement gave him an anti-rot clause and gave me none… It belongs in the same place, in the same form, and **it should be in the ballot text if this amendment is adopted.**"* Thurgood countersigned it in the strong form (T2-(a), line 358: *"I accept the duty, named, and in the strong form… I will use it"*), and T-5's four-duties block (line 313) lists using it as one of the four duties he accepts.

The ballot carries the **caller's** half only — § 16 item 4, *"Use the mirror anti-rot clause — the caller-out duty,"* paraphrased as *"The lens must not drift into authorship."* **The clause that binds me is not in the ratified record in any form.** Grep confirms: no occurrence of the clause text, and no Stacy-binding prohibition anywhere in the ballot.

This is a co-signed document's explicit, countersigned ask, not honored. It is also the single duty in this package that constrains the party gaining scope at the point where the ballot's own § 18 locates the residual risk (*"authorship quality came from verification contact"* — the LENS seat is where my side of that seam can rot). A caller-out duty with no clause to call is the inverse of Thurgood's own line about his: *"a clause with no caller is decoration."* A caller with no clause is the same defect from the other end.

**Fix.** Add the § 1.3 clause verbatim to the ballot — either as a short "Obligations this ratification places on Stacy" section (preferred; it also gives my compiled duties one home) or quoted at § 11.4's LENS row. I am the party it binds and I am asking for it.

---

## Advisory

**A-1 — Q2 guard (ii) carries one of condition (a)'s two conjuncts; the ballot claims both conditions, the outline claims more than the ballot.**
Source: `feedback/design-outline.md:217` — my condition (a) is *"the Q1 convention has shipped **and the Tier-3 example is fixed (B5)**."* Ballot § 4 guard (ii) carries *"the Q1 convention has shipped AND real parents have passed it."* The B5 conjunct is absent. Ballot § 4 hedges honestly (*"the **load-bearing half** of Stacy's R1 conditions (a) and (b)"*); the outline's corresponding block does not (*"Guard (ii) is Stacy's conditions (a)+(b) restated as a floor"* — a stronger and less accurate claim than the ballot's).
Why it matters: B5 is a BLOCKING R1 item whose finding is that the Tier-3 worked example *"models effort-as-evidence"* — arming a verbatim checker against a corpus whose canonical exemplar still teaches the defect is the wall argument one level in. Practically the risk is low: § 15 bundles the worked example with the convention in the same U1 deliverable, so "the convention has shipped" will in practice entail it. **But § 13's Exclusions enumerates what was declined (condition (c), the sunset) and is silent here** — the conjunct is neither carried nor excluded, which is the accountability gap flag 4 already caught once in this same condition list.
Fix: add the conjunct to guard (ii), or add it to § 13 as declined. One clause either way.

**A-2 — "Guard (i) is her condition (d)" overstates the carry.**
My condition (d) (`feedback/design-outline.md:217`) was a **cap on arming**: *"capped: arm before the next release publish **regardless**."* Ballot § 4 guard (i) is a cap on **deciding**: *"the Q2 decision fires then instead."* Guard (ii) then forbids arming before N ≥ 5 is met, so a release-prep sitting may lawfully decide *not* to arm — the "regardless" is gone.
I do not contest the substance, and I want the reason on the record: **my own condition list was internally inconsistent.** (d) and (b) conflict whenever a release arrives before N ≥ 5, and I listed them "in priority order" with (b) above (d). Ruling in favour of (b) is a legitimate adjudication of my tension, not a transcription loss. What the record should not do is call it preservation.
Fix: one clause at § 4 — guard (i) carries (d)'s **harm-boundary reasoning**; (d)'s "regardless" is resolved against, in favour of guard (ii)'s evidence floor.

**A-3 — Ruling 4's "materially amended" is an unreconciled judgment term sitting beside an authorship-date key.**
Ruling 4 (§ 7) makes the declaration *"mandatory in every `tasks.md` authored **or materially amended** post-ratification"*; the flag-1 clarification says *"Legacy status is determined by AUTHORSHIP DATE — never by absence of the declaration."* A legacy `tasks.md` materially amended post-ratification is bound by the first clause and legacy by the second. The reconciling reading exists (material amendment is a second opt-in path alongside *"adding the declaration is how an in-flight spec opts in"*, and legacy still only shrinks) — but it is not stated, and **"materially amended" is undefined**, which is the same judgment-vs-event defect flag 3 was resolved by removing. One clause fixes it: *material amendment is an opt-in path; it does not alter authorship-date legacy membership, it exits it.*
**On flag 1's headline question — does the clarified text close the loophole? Yes for B4's door.** Post-ratification zero-criteria + no declaration = non-compliant (closed); post-ratification declared `spec-level` = a *declared, auditable* exit, which is exactly what my B4 asked for (the exit stops being self-executing, it does not stop existing); pre-ratification zero-criteria = legacy, no string, still audited by claims-pass. The residual is A-3's side door, not B4's.

**A-4 — Dangling § citation in the one governance-law file this PR edits.**
`governance/classification-map.md:97` cites *ballot `§ "O-8 — the register's `armed_at` qualifier"`*. No such heading exists; the ballot's heading is `## 10. Ruling 7 — O-8 (`armed` means PR-gate *and* point-of-use): OPTION (c), OPTIONAL QUALIFIER — EXECUTED IN THIS PR`. **Mechanically harmless** — I checked `scripts/check-section-citations.ts`: the guard validates MCP citation blocks (`get_section`/`get_document_full`/`get_document_summary`) over `governance/`, `.kiro/steering/`, `canonical/`, not prose `§` references, and ballots are not in the served corpus. So the required check will not catch it. It is still a dead citation in ratified law, and it is precisely the class STRAGGLER exists for. Fix: cite `§ 10`, or reproduce the heading exactly.

**A-5 — Same class, lower stakes: ballot § 5.3 cites `RELEASE-FLOW.md § "Deriving the delta (the judgment half)"`.** Actual heading: `## Deriving the delta (the judgment half — added 2026-08-12, Q6 ballot; proven by the v14.0.0 release)`. Identified as "the natural home" rather than as a binding cite, so low. § 4's cite of `§ "The sequence" steps 1–3` is **exact and correct** — verified.

**A-6 — The straggler sweep under-reports by one line.** § 10 states the grep returns *"the two live `classification-map.md` lines that intentionally name the removed field in historical prose."* Re-run: **three** — `:524` (the re-aimed `checks[]` cross-reference), `:535` and `:536` (the two history entries). Line 524 is a live field, not historical prose. Charitably, 524 is described separately at edit site 3, so the intent is probably "two *historical-prose* lines" — but the sweep's stated result should match the grep's actual output, in a ballot whose subject is claims matching their evidence. Fix: restate as three, classified. The `wave-3-assessment.md` half (2 lines) is **confirmed exact**.

*(Low, recorded not raised: § 8's rendering of my Q3 roll-up rule drops the clause "the Evidence cell cites the per-platform reports." The generalization to system tier makes "Implementation Report" inapplicable, so the drop is defensible; the discharge mechanism on the product side is preserved anyway by the "rendered as … the product-side Implementation-Report roll-up" clause at the flag-5 clarification. No action needed.)*

---

## Confirmed clean (sampled, with the sample named)

**My own inputs:**

| Ballot claim | Source checked | Verdict |
|---|---|---|
| Guard (ii)'s **N ≥ 5**, "M2 measured BY AUDIT, not by the checker" (§ 4) | `feedback/design-outline.md:217` condition (b) | **MY BAR, not an approximation.** Number and the audit-not-checker clause both exact. The restoration rationale (*"a checker measuring its own target dimension after arming reads 100% by construction"*) is my reasoning correctly stated |
| § 6.2 fixed string `Criteria fidelity: exempt — spec in flight at ratification (<date>)` | `feedback/design-outline.md:230` | **Character-for-character exact**, including the free-prose-is-non-compliant rationale (*"B4's failure mode wearing a different hat"*) — my words |
| Q3 discharge-through-Implementation-Reports + roll-up rule (§ 8) | `feedback/design-outline.md:199` | **Faithful in substance**, correctly generalized from product-local to claim-keyed. The ⚠️-and-name-the-platform half is exact. Leonardo-weighted-above-me instruction preserved at § 8 |
| The modified package, three parts (§ 3) | `pre-spec/stacy-consult-2026-09-13.md` § "Verdict detail" | **ACCURATE.** § 3 compresses; the detail (three mandatory columns, prose-only Evidence non-compliant) sits in outline § 3.2, which I verified accurate at R1. S5's third cheap check survives as `parent-completion-docs-present` (§ 11.2) |
| B2's catch-rate framing — "the dangerous failure channel is false assertion, not silence" | consult § B2 + outline § 3.6 | Correctly attributed as **Peter's reasoning**, not mine; my 2-of-12 finding is not overstated as a closure |
| 27% withdrawn; cite 39% corpus-wide / 68% in-scope (§ 12) | `feedback/design-outline.md:124–144` | **ACCURATE**, including "withdrawn by its author on a reconstructed arithmetic error." Matches my own concession verbatim in substance |
| B5 carried as a named deferred edit site (§ 15, "Tier-3 worked example") | `feedback/design-outline.md:72–76` | **CARRIED.** Also correctly invoked at § 10 edit site 2 as the reason the register's illustrative example was updated — my B5 lesson applied to a second surface, which is a good use of it |
| My § 6.2 sunset declined (§ 13 item 3); my Q2 condition (c) not carried (§ 13 item 4) | `feedback/design-outline.md:219, 231` | **Both correctly recorded as declined**, with my own self-flagging of (c) as droppable optimization accurately cited |

**The co-signed documents:**

| Ballot claim | Source checked | Verdict |
|---|---|---|
| § 11.1 the two charter cuts (quoted) | joint agreement lines 23, 25 | **VERBATIM, both.** The dividing verb (author/maintain vs adjudicate) correctly stated; "product-side is not a grant, the actual change is extension to system specs" is the joint recommendation's own ask, honored |
| § 11.1 basis is separation-of-duties + method fit, **not load** | joint § 1 + my frozen position + C5 | **ACCURATE.** FOR-3 correctly excluded; the `audit:coverage-map` / `verify-gate-registration.sh` "one level up" argument is the one both parties endorsed |
| § 11.3 the carve-out, in its narrowed tool-gated form (quoted) | joint agreement line 137 | **VERBATIM**, including *"Ambiguity resolves to Stacy."* Both falsification conditions carried (lines 142–143). C4-2's enumerated-not-referential constraint carried exactly |
| § 11.3 arbitration — all three rules | joint § 1.3 | **ACCURATE**, all three, in substance |
| § 5.6 / § 13 the (d7) exclusion | joint (d7) line 190 + C2 | **ACCURATE.** Correctly states the line was *offered and explicitly not adopted*, that Thurgood contested it, and why (it reassigns two named elements of a current charter). "Moving it ever requires a separate argument with evidence" is a faithful reading of the contest |
| § 5.2 the composed loop **supersedes** EDUCATION's N ≥ 3 for standards findings; § 12 records it | joint § 1.4 line 86 + § 3.3 line 233 | **ACCURATE**, and the reasoning is correctly grounded in my F-A (the return edge) and my own verdict on my weaker alternative (*"a thin mitigation"*) |
| § 5.2 flag-6 fold: remediation route is **additive**, single instance, to the owning domain agent | amendment T4-3 (line 464) + Ada's R1 item | **ACCURATE and correctly non-absorbing.** T4-3 is the source and it already said "two routes, not one"; the ballot names it rather than leaving it implied. Ada's objection answered in her own terms |
| § 11.4 merge-path status; co-signer argument load-bearing | amendment § 3 + T3-3 (line 433) | **ACCURATE**, including that overhead was withdrawn as the weak ground and that the co-signer argument survives "but Stacy is always available now" |
| § 11.5 the fixture obligation, incl. C3-2 timeliness and non-waivability | joint § 3.1 line 209 + C5 | **ACCURATE.** The contested-fixture arbitration path and "neither agent may waive" are faithful to *"neither of us gets a unilateral veto over the arming"* |
| § 11.5 the pilot, chartered under any Q5 answer (C4-4), with the ceiling-not-typical-case caveat | joint § 3.2 line 220 + C4-4 | **ACCURATE**, caveat included rather than dropped |
| Countersignature counts: joint = "one contest, one amendment, one attribution correction and six recorded risks" (§ 5.1) | joint C5 line ~468 | **EXACT** |
| Countersignature counts: amendment = "one contest, three corrections and five § 5 additions" (§ 5.1) | amendment T5 line 480 | **EXACT** (the contest itself is B-1) |
| § 6.1 census reconciliation, 39 supersedes 36, delta-3 incl. 125-A, rule text recipe-independent | amendment § 2.2 + T4-1 (line 452) + T1 | **ACCURATE.** T4-1 is the source of the correction and is correctly attributed to the re-derivation, not to either party's error |

**Flag 2's substantive claim, independently verified.** The ballot asserts (§ 6) that scoping the fixed string to per-parent-criteria specs *"does not weaken B4's closure, because B4's exit door is shut by ruling 4's forward-total declaration, not by the exemption string."* I checked it by enumerating the case space:

| Case | Disposition | Exit open? |
|---|---|---|
| Post-ratification, zero criteria, no declaration | **Non-compliant** (ruling 4 + flag-1 clarification) | **Closed** |
| Post-ratification, declares `spec-level`, no per-parent criteria | Legitimate, declared, owes the closeout discharge | Declared, auditable — what B4 asked for |
| Pre-ratification (legacy), zero criteria | Outside the rule by rider (a); no string; **still receives claims-passes** (the decoupling) | Ruled no-retrofit; hedged by § 7's omission-count metric |
| Pre-ratification, per-parent criteria, in flight | Owes the fixed string | The middle case the string covers |

**The ballot's claim holds.** The string carries no closure weight, so narrowing its scope removes none. *(Residual, already ruled and not reopened: rider (a)'s exemption stays unfalsifiable for the legacy set. My cheap hedge — count criteria-block omissions at the first claims pass — is carried at § 7 and is the right mitigation.)*

**O-8 as executed** — checked against the committed diff (`git diff main...HEAD -- governance/classification-map.md`):

- **Schema text**: `armed_at` inserted between `checks` and `scope[]` exactly as § 10 edit site 1 describes. Four sub-rules present (existing rows untouched / non-PR-gate MUST carry / `EXPECTED_CONTEXTS` counting / per-scope applicability) plus the upgrade path recorded as noted-not-adopted. **Schema-valid** — it is an optional scalar field in the `verification` block, with per-scope applicability stated like its siblings. No existing row is invalidated.
- **Counting rule vs the script's actual arithmetic**: **CORRECT, and for the stated reason.** `tools/agent-generator/verify-gate-registration.sh` builds `EXPECTED_CONTEXTS` (18 entries, `EXPECTED_COUNT=18`) and count-asserts it against the live branch-protection required-check list (`:132–138`). A `tool-time` check registers **no** branch-protection context, so including it would fail the assert against a correctly-configured gate — the ballot's *"counting them would manufacture the drift the count-assert exists to catch"* is accurate, not decorative.
- **C8 row conversion**: `armed_semantics_note` removed; `armed_at: tool-time` on the Figma Variables + Styles scope entry between `check_state` and `checks:`; `checks[]` cross-reference re-aimed. The ballot's quoted after-text matches the file **verbatim**.
- **History entry honest**: **YES.** It claims *"representational, not classificatory — no disposition, `check_state`, `owner`, scope membership or education disposition changed."* The diff confirms exactly three changed things on that row: the note deletion, the `armed_at` line, and the `checks[]` string. Nothing classificatory moved. Dated and attributed. This is the standard I would want applied to a row I owned.
- Edit site 2 (the illustrative example) is disclosed as a drafter's judgment call inside the ruled scope, with the reason given and an explicit invitation to strike it. That disclosure is the right handling; I would keep the edit — my own B5 finding is that the canonical example is an edit site.

**The charter and the inbounds:**

- `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` — **matches what § 5.4 and § 5.5 ratified.** Named evaluation triggers (three, whichever fires first) ✔; evidence criterion (the count of unverified-platform claims in claims-pass Method lines) ✔ — and it is a good one: produced by work that happens anyway, and ungameable by the beneficiary because the Method line is the auditor's own honesty clause. Ownership boundary (Kenya/Data design, Ada/Lina verified parties, **no standing per-pass verifiers**) matches the ruling exactly. § 6's honest deflation and its counter are both recorded. The interim posture correctly traces to amendment T4-4, which is where the platform-unverifiable Method-line form originated.
- `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` — the three touchpoints match § 14 in substance and order. **The uncommitted fold correctly updates touchpoint 2** from "defect carried" to the flag-7a resolution (detection-by-use at the two ordinary-use surfaces), rather than leaving a stale claim behind — and it keeps the honest residual. Charter file likewise updated from "#165 unmerged at charter drafting" to "merged 2026-09-17". Both clean.

**Ballot ↔ outline coherence.** The uncommitted outline fold corrects every staleness the committed state carried: `#165` unmerged → merged (§ 8 Q5 and the § 13 table), the flag-5 parenthetical `(or per-platform evidence cells)` → per-platform **STATUS** with the evidence-cells-only-is-insufficient clarification, and all five "flagged … unresolved" notes → "raised … and ANSWERED by Peter the same day." **Coherent as it now stands.** The one residue is A-1's overstatement in the Q2 block.

**§ 17.2's handling of the seven flags.** Preserved verbatim as raised, each with its resolution appended, each also folded at its own ruling site, and each cross-referenced from § 19. **Not absorbed, not silently smoothed** — including item 4, which records the dropped N ≥ 5 as *"transcription loss"* rather than reframing it as a simplification. That is the right treatment and it is worth saying so: the flag discipline is the reason this pass had a short list to work from.

---

## Formal confirmation

Required at ratification per the exchange record. Each answer is mine alone and a decline or amendment goes to Peter.

### (a) The composed learning loop as ballot § 5.2 renders it — **CONFIRM**

Including both named elements:

- **The mandatory `Standards implications: none / or list` line on my claims-pass** — confirmed, accepted as a required element of the pass, and I read it as binding on **every** pass including the 127 pilot. It is a better answer to my F-A than the mitigation I drafted: my health-check count line was information, the N ≥ 3 threshold was a latency hole, and a per-pass question read in full is neither.
- **The mining-not-grading guardrail** — confirmed, and I want it on the record that I regard it as the load-bearing half, not the courtesy half. A standing full-read of every pass is the configuration in which the anti-rot mode (§ 1.3.3) is most available, and § 16 item 3's *"if I find myself re-adjudicating a finding under cover of the review, that is the rot arriving and either party should say so out loud"* is the form I would have asked for.

I also confirm the flag-6 two-route clarification. Ada's ask is answered without reintroducing a threshold anywhere, and routing remediation to the owning domain agent keeps content correctness out of my lane and out of Thurgood's — the Civitas three-layer boundary survives intact.

**Cost I confirm with open eyes**, recorded because confirmation without it is cheap: this loop costs Thurgood a standing full-read obligation and buys me a faster return edge. I am the beneficiary. § 18's unrecovered cost — that a full read is *weaker contact than doing the audit* — is real, is not recovered by this, and should not be treated as recovered by anyone later reading § 5.2.

### (b) My duties as § 16's counterpart — **AMENDED**

I cannot confirm "as § 16's counterpart renders yours," because **there is no counterpart section** (B-2). Locating and citing them, as instructed, and confirming each:

| Duty | Where compiled | Confirmed |
|---|---|---|
| Mandatory `Standards implications:` line on every claims-pass | ballot § 5.2, § 11.4 EDUCATION row | **Yes** |
| Completion-claims audits on **any** spec, product or system; the findings and the events that fire them | § 11.1, § 11.2 | **Yes** |
| The criteria-parity findings the check cannot reach (false ✅, prose-only evidence, Goodhart dilution) | § 11.2 | **Yes** |
| M3 / M4 / M5 adoption-and-quality metrics as audit output | § 11.2 | **Yes** |
| Audit practice + event triggers written into my charter text, not left as convention | § 11.2 | **Yes** |
| Three register rows (`completion-verification-honesty`, `promised-artifact-shipped`, `parent-completion-docs-present`) | § 11.2, friction (a) | **Yes** |
| LENS seat at the tasks round, incl. the **does-this-span-platforms** question (ruling 5) | § 11.4, § 8 | **Yes** |
| CLOSEOUT pass — firing predicate, owed-set, `claims-pass.md`, forced Method line; owed by **every** spec closing after ratification regardless of exemption (ruling 3's decoupling) | § 11.4, § 6, amendment § 2 | **Yes** |
| MIDPOINT (conditional, ≥ 3 declared units) | § 11.4 | **Yes** |
| RELEASE and SYMPTOM as **non-negotiable** standing obligations | § 11.4 | **Yes** — subject to B-1: the ratified record must say what a RELEASE pass consists of |
| ARMING, incl. `completion-criteria-parity` dormancy detection (C4-1) | § 11.4 | **Yes** |
| Method-line honesty per criterion — *"web verified / iOS not re-verified"*, unverifiable rows recorded as unverified, never rolled into a ✅ | § 8, charter § 2(a), amendment § 2.5 / T4-4 | **Yes**, and I hold this one hardest: it is the clause that keeps a claims pass from becoming the doc-vs-doc audit my own N6 called *"a worse outcome than no change"* |
| Specify the falsification fixtures; no fixtures, no arming; due at the checker-build unit's completion (C3-2) | § 11.5 | **Yes**, including that I may not waive it by omission |
| The 127 pilot on this spec's own completion docs | § 11.5 | **Yes** |

**My amendment, and it adds obligation to me rather than removing it:** the ballot must carry the **mirror anti-rot clause** from amendment § 1.3 — *"Stacy may say a criterion is unverifiable; she may never say what it should say"* — verbatim, at the same strength as § 1.3.3's clause pointed at Thurgood, per the countersigned ask at amendment line 54 and T2-(a). Preferably in a short "Obligations this ratification places on Stacy" section that also gives the table above one home, so a later reader finds my duties where they find his. **With that added, I confirm (b) without reservation.** Without it, § 16's caller-out duty (item 4) points at a clause that does not exist in the record it is part of.

### (c) The N ≥ 5 restoration — **CONFIRM**

It is my bar, not an approximation. Verified against `feedback/design-outline.md:217`: the number is five, the population is in-scope parents completed **under the Q1 convention**, and M2 is measured **by audit, not by the checker** — all three elements present and exact at ballot § 4 and at outline § 8 Q2. The restoration rationale is my reasoning correctly stated. I note with approval that § 17.2 item 4 records it as *transcription loss* rather than softening it into a simplification; that honesty is what makes the rest of the flag record credible.

*(Confirmation (c) is on the **restoration**. It does not extend to the rest of guard (ii) — see A-1, the dropped B5 conjunct.)*

---

## Counter-arguments against this review

Per my own standard, and because "inflating audit severity to appear thorough" is a named bias in my charter:

1. **Both blockers are drafting, not substance.** Neither reverses a ruling; neither is a misruling; both are fixed by restoring text that already exists in committed documents. A reader could reasonably reclassify both as high advisories. I hold BLOCKING for one reason each: B-1 because the standard it violates was set by the countersigning party *on himself* and the record asserts a reconciliation it did not perform; B-2 because a duty on the party gaining scope is missing from the record that grants the scope, which is the asymmetry a ratifier should not inherit unexamined.
2. **I am a named beneficiary reviewing the ratification that benefits me.** Discount accordingly. The mitigations: my two blockers both *add* constraint (one restores a bound on Thurgood's row that he asked for against himself and restores the scope of my own non-negotiable; the other adds a prohibition on me), and my one amendment at § "Formal confirmation" (b) asks for a clause that binds me. I found nothing to contest in the ratification's substance and I am not proposing any.
3. **A-4/A-5/A-6 are small.** They are citation and sweep precision on a record whose subject is claims matching their evidence. In any other ballot I would batch them as nits. Here the standard is the ballot's own.
4. **I did not independently re-derive the census numbers** (39 of 153, the delta-3) — Thurgood verified them at amendment T1 and I verified them at R1 through a different recipe. I am relying on two prior independent derivations rather than a third. Flagged as the one place this pass takes a number on prior verification rather than fresh computation.

---

## The second-pass question

§ 19 asks the right question: *"what a second pass finds that the first one's self-audit did not."*

**B-1**, and the reason it escaped is structural rather than careless. All seven of the drafter's flags were raised against the **relayed rulings** — the surface where he knew he was transcribing something he did not witness. § 11 is the surface where he was compiling **documents he co-signed and therefore knew**, and it was treated as settled summary work rather than as a transcription surface. That is precisely where the compression landed: a four-column table replacing a five-column one, in a record whose only outstanding contest was *"if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it."*

The generalizable lesson, offered for the standards route this ballot creates: **the transcription risk is highest where the transcriber is most confident of the source.** A flag discipline pointed only at relayed material will systematically miss a party's compilation of their own co-signed record.

---

*Reviewed by Stacy, 2026-09-17, on branch `task/127-outline-settle` against the working-tree state of the ballot, the outline, and both issue files, and the committed state of `governance/classification-map.md`. No file other than this one was created or modified. Findings are for the drafter to fix; the two blockers and the (b) amendment go to Peter with this review.*
