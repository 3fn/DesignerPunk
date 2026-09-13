# Q5 Position — Thurgood (opening, independent)

**Date**: 2026-09-13
**Spec**: 127 — Completion-Claims Integrity, § 8 Q5 (ownership of execution-claims verification)
**Author**: Thurgood — **writing here as a named party, not as outline author**
**Status**: Opening position for the collaborative boundary-definition exercise Peter directed. Written without sight of Stacy's parallel position. Nothing here settles anything; Peter ratifies the joint proposal.

**Conflict disclosure, stated up front**: I wrote the neutral Q5 framing in the design outline, and I am the agent who would lose scope under the transfer. The outline's handling note (no self-adjudication in R1 incorporation) governs the feedback round; it does not govern this document. This one is argued.

**Second disclosure, the harder one**: the bias that would show here is not the obvious one. Defending my scope would be visible and cheap to discount. The bias worth watching is the *reverse* — endorsing the transfer to look impartial, while quietly retaining the interesting part via a carve-out. That is exactly the shape of what follows, so I have grounded my carve-out in a mechanically checkable fact (Stacy's `toolSubset`, deliberately withheld steward verbs — `canonical/agents/stacy.md` D4 note, lines 201–229) rather than in a judgment about who is better at it. If the carve-out does not survive that test in reconciliation, it should fall.

---

## 1. Position

**I endorse the transfer**, across both product and system specs, with **one named class excluded** and **one named dependency built in**.

### 1.1 What moves to Stacy

Delivered-vs-promised verification of execution claims, on **any** spec, product or system:

- Completion-claims audits (the `2026-09-12-spec-112` method: promised outputs → claimed outputs → shipped source).
- Criteria-parity compliance findings — whether a given parent's table told the truth, including the classes no check can reach (false ✅ on a reproduced row; prose-only evidence; the Goodhart criteria-dilution question, §3.4 of the outline).
- The claims-audit practice itself, and its event triggers (§2 below).
- The register `owner:` field on `completion-criteria-parity`, `promised-artifact-shipped`, `completion-verification-honesty`, and (if built) `parent-completion-docs-present`.

### 1.2 What I retain

- **Standards authorship** — `completion-documentation-guide.md` § Parent Success-Criteria Fidelity, `Process-Spec-Planning.md` Tier 3, the TCP pointer, the ballot.
- **Spec formalization**, **test-suite health**, **Civitas stewardship** (unchanged).
- **The mechanical instruments**: I build and maintain `check-completion-criteria-parity.ts` and its CI wiring — against falsification fixtures Stacy specifies (§3).
- **One excluded verification class**: **Civitas-infrastructure claims** — claims whose *evidence is corpus or governance-machinery state* rather than shipped product/system source. Concretely: steering-doc metadata validity, cross-reference resolution, MCP index state, register-row schema validity and substring-collision safety, gate registration (`EXPECTED_CONTEXTS` count-assert), ballot edit-site straggler sweeps.

The exclusion is not a judgment call at audit time. It is decided by **evidence type**, and the evidence type is decided by **which instrument answers the question**: if the answer comes from `validate_metadata`, `list_cross_references`, `rebuild_index`, or the register/ballot straggler method, it is mine — and those are precisely the verbs Stacy's toolSubset withholds by design. If the answer comes from git, the source tree, a test run, or a completion doc, it is hers. **Ambiguity resolves to her**, always (§4.1).

This exclusion costs **zero new register rows**: the Civitas-infrastructure claims are already registered under existing `owner: thurgood` entries (`section-citation-resolution`, the metadata/cross-ref rows). I am not carving out new territory; I am declining to hand over territory I already hold under a different rule.

### 1.3 The charter cuts — one sentence each (my own bar, from the outline's AGAINST-1)

> **Thurgood**: I author the standards that define what a completion claim must contain, build the mechanical checks that enforce them, and verify claims whose evidence is governance-corpus state — I do not adjudicate whether any given execution claim told the truth.

> **Stacy**: Stacy verifies delivered-vs-promised on every spec, product and system — whether a completion claim matches what actually shipped — and owns those findings, their register `owner:` fields, and the events that fire them; she does not author the standards she audits against.

Both fit in one sentence. Both state a positive scope and an explicit negative. If reconciliation cannot preserve that property, my own bar says the change is not ready.

### 1.4 Why I endorse it, on the evidence rather than on deference

1. **B1 is real and I must engage it directly, not soften it.** My F7 draft rule was satisfiable by exactly the two-column table that failed — weaker than `Process-Spec-Planning.md:1818-1853`, a standard I own. The tempting defense is that B1 caught an *authorship* failure while the *audit* (25/25 items, 12 discrepancies, 5 unshipped-work findings) was thorough — so the evidence argues for moving authorship, not verification. I considered arguing that and I reject it: drafting "what would have caught this class" **is** a verification-design act, and I erred in the direction of under-strictness on my own standard's behalf. That is the conflict in its textbook form. Conceding it is the honest reading.
2. **The artifact surface is already hers, mechanically.** Stacy's knowledge bases (`canonical/agents/stacy.md:194-200`) are `.kiro/specs/*/completion/**` and `docs/specs/**` — **unscoped by product/system**. The corpus Q5 is about is already her provisioned ground truth. Her charter already carries "are completion docs written?" and Process Adherence (her Audit Checklist items 5–6). The transfer consolidates an adjacent slice she already holds; retention keeps it split across two agents for no reason but my scope.
3. **The register cannot express a surface split.** `scope[]` carries `surface`, `disposition`, `check_state`, `checks`, `rationale` — **not `owner`** (`governance/classification-map.md:88-104`). "Stacy for product, me for system" is not writable in the register without a schema amendment. If the transfer happens at all, *both surfaces* is the only cut the machinery expresses today. That decides the "both" half of Peter's phrasing on mechanics, not preference.
4. **Spec 127 itself is the reductio.** Under retention, the author of the completion-claims standard writes 127's completion docs and then verifies his own claims against the standard he just wrote, for a spec whose entire subject is that this does not work. I would rather not be in that position, and I do not think Peter should put anyone in it.
5. **There is no running cadence to hand over.** `scripts/governance-check.sh` has no claims item; the 112 audit was chartered ad hoc. Q5 assigns a *practice that does not yet exist*. That makes the transfer cheap (no machinery handoff, no in-flight work stranded) and makes the lapse risk the dominant one (§4.2) — which is why every trigger below is written to fire on an event someone else causes, not on my remembering.

---

## 2. Event-anchored triggers

Calendar cadences lapse silently and Peter's own pace is bursty; these fire on events other agents cause. **Written into Stacy's charter, not left as convention** — a trigger that lives only in a reconciliation record is a trigger that stops existing at the next context reset.

| # | Event | Fires | Owner |
|---|---|---|---|
| T1 | **Every PR** carrying a parent completion doc | `completion-criteria-parity` at the gate — exhaustive, mechanical, no judgment | instrument (mine to maintain) |
| T2 | **Spec closeout** | Claims pass over that spec's parent docs — the natural unit, and it matches rider (a)'s spec-level discharge | Stacy |
| T3 | **Release tag** | Claims pass over the release delta (`git log <last-tag>..main`) — both consumer-reaching escapes were release-surface; a tag is the last moment before a claim becomes a consumer's reality | Stacy |
| T4 | **Consumer symptom traced to "it was reported done"** | Claims pass over the originating spec — this is empirically the trigger that works; it is how the 112 audit started | Stacy |
| T5 | **N ≥ 3 `completion-criteria-parity` failures in one observation window** | Education-implicating return-edge signal: the docs may be teaching the wrong thing | Stacy detects → routes to me; I own the education repair |
| T6 | **Ballot ratification of a law that claims bind** | Edit-site straggler sweep (did every enumerated site actually get applied) | **Mine** — corpus-state evidence, §1.2 |
| T7 | **Monthly Civitas health check** (itself staleness-triggered, not calendar) | *Liveness meta-item*: did T2/T3/T4 fire in the window, and did each produce a committed record? Events without records = finding | **Mine** — this is governance-process liveness, not claims adjudication |

T7 is the anti-lapse guard and it is deliberately **meta**: I check that the audit happened, never whether its verdicts were right. If I ever find myself re-deciding one of her findings under cover of T7, that is the two-owner rot mode arriving and it should be called out as such.

---

## 3. The dependency contract

### 3.1 What the verifier needs from me

- **A machine-readable criteria convention** (Q1's deliverable). Without it her audits are archaeology; with it they are diffs. This is my obligation and it is on 127's critical path.
- **The standard stated so that "compliant" is decidable without asking me.** If she has to consult the author to know whether a row passes, the separation is nominal. Any interpretation question she raises more than once is a defect in my text, not a question for me to answer conversationally — I fix the text.
- **Notification, not permission, on every standards change**: when the rule text changes, she gets the before→after and the effective date. Charter-level, not courtesy.
- **The instruments**: the parity checker, its CI context, and honest documentation of its reach — specifically, what it **cannot** see (`completion-verification-honesty`, registered ideological, no check). A verifier who inherits an over-claimed instrument inherits my blind spot.

### 3.2 What I need from her — the fixture obligation

**She specifies the falsification fixtures; I build the checker; the checker must go red on her fixtures before it arms.**

This is the concrete mitigation for B1 and I want it written into both charters rather than left as good practice. B1's failure mode was that I decided what "caught" meant and set the bar at my own standard's ankles. Gate-bite proof (the `#121` pattern) is already a 127 success criterion; this makes the *defect set* adversarial rather than self-authored. **No fixtures, no arming** — that is the condition I am volunteering against my own delivery schedule, and it is the part of my position I would most like on the record.

### 3.3 Findings route back to me for education response

Her findings land with me when they implicate education (T5, and any finding whose cause is "the standard is unlearnable"). I respond by fixing docs, not by re-adjudicating the finding. This mirrors the pairing that already exists: my health-check return-edge review is the SYSTEM half, her Lessons Synthesis Review (`governance/Product-Handoff-Protocol.md` § "Lessons Synthesis Review") is the PRODUCT half, and the two name each other by design. Q5's answer should extend that pattern, not invent a new one.

---

## 4. Failure modes of my own proposal

### 4.1 The carve-out is a seam, and seams are where this rots

A claim can be both: *"the register row exists, the check is armed, and the docs say so"* is corpus-state (mine) and delivered-vs-promised (hers) at once. My rule — **ambiguity resolves to her** — is designed so the seam fails toward the verifier rather than toward the author. But I should be honest that I wrote a rule whose default direction I control the framing of. The check on me: if over the first three claims passes I invoke the exclusion more than once, the exclusion is too wide and should be narrowed to *tool-gated evidence only* (i.e. only what `validate_metadata` / `list_cross_references` / `rebuild_index` can answer, nothing else). I would accept that narrowing now if Stacy asks for it.

### 4.2 The two-owner rot mode: "I thought you had it"

Worst case is not conflict; it is the **release-surface pass (T3) that neither of us runs** because each assumes the other did — and nothing goes red, because no check reads completion docs. Mitigation is that **the record is the arbiter**: a claims pass with no committed record did not happen, and T7 reads for records, not for memory. The residual risk is real: T7 is monthly-ish and staleness-triggered, so a missed pass can sit undetected for weeks. I do not have a cheaper guard and I am not going to pretend one exists.

### 4.3 I lose the feedback loop that makes my standards good

Candidly, this is the cost I feel most. The F7 rule text exists *because* I did the 112 audit — authorship quality came from verification contact. Author standards long enough without touching the artifacts and the standards drift toward the elegant and unlearnable. §3.3's routing (findings come back to me) preserves contact without the conflict, but it is weaker contact than doing the audit. I am recording this as a genuine cost of my own proposal, not arguing it away.

### 4.4 Load lands well now and badly later

Stacy's product plate is near-empty today (Product MCP: index failed, 0 screens). System claims verification fits now. When the first product spec lands, she has product audits, parity reviews, lessons synthesis, **and** corpus-wide claims verification. The honest read: I am handing her work at the moment it is cheapest for her to accept and most likely to collide later. Watch condition: first product spec closeout.

### 4.5 Capability pressure on the steward boundary

If her audits repeatedly need corpus-state evidence, pressure builds to grant her the steward verbs — and D4 withheld them deliberately. Two exits: grant them (erodes the boundary Spec 122 drew) or keep routing through me (adds latency to her audits). Neither is free. Name it now so it is a decision later rather than a drift.

### 4.6 If Peter rejects the transfer — the mitigation without it

Asked and answered honestly, since I must not present retention as unmitigable to force my preferred outcome. Three guards, none as good as the transfer:
1. **Stacy as required adversarial reviewer on every claims-audit finding set and every standards amendment** — the arrangement that produced B1, made mandatory rather than discretionary. Weakness: it still depends on *me* choosing to route, which is the thing at issue.
2. **The fixture obligation (§3.2) regardless of Q5's answer** — adversarial fixtures are the mechanical half of B1's lesson and they do not require the transfer. I want this one adopted either way.
3. **Peter charters claims audits, not me** — the 112 precedent. Removes my discretion over *whether* an audit happens; leaves my discretion over what it concludes, which is the weaker half of the conflict.

Residual under retention: nobody independent ever asks "is this standard adequate?" — and that is precisely the question B1 answered no to.

---

## 5. Rejected alternatives

**A. Status quo — I keep all execution-claims verification.** *Rejected.* B1 is on the record; the structural conflict is demonstrated, not hypothetical; and 127 would ship with its author verifying his own claims against his own new standard. The mitigations in §4.6 are real but all route through my discretion, which is the defect.

**B. Surface split — Stacy takes product claims, I keep system claims.** *Rejected on three independent grounds.* (i) The register cannot express it: `scope[]` has no `owner` field, so it needs a schema amendment before it can be written down, and an ownership split that cannot be recorded will not survive a context reset. (ii) It assigns her the surface with **zero instances** — a transfer that transfers nothing, dressed as a compromise. (iii) All twelve discrepancies in the F7 evidence are **system-side**; a split that leaves system claims with me moves ownership away from the evidence that motivated the question. This is the alternative I most expected to want, and the mechanics killed it.

**C. Full transfer exactly as Peter phrased it, unqualified.** *Rejected as stated, endorsed as amended.* Unqualified, it sweeps in claims whose evidence is `validate_metadata` / `list_cross_references` / register-schema state — verbs Stacy's toolSubset withholds by design (D4). That leaves two bad exits: the claims are stranded (nobody verifies them, a silent regression from today), or she gets the steward verbs (§4.5 erodes the 122 boundary on an unrelated spec's PR). My §1.2 exclusion is the smallest amendment that avoids both. If reconciliation shows the excluded class is narrower than I think, I narrow it — see §4.1.

**D. Rotate the auditor, or stand up a third reviewer.** *Rejected.* No third agent carries the method or the KB; rotation discards accumulated audit technique (the 112 method took a full session to build), and the "fresh eyes" benefit is already supplied by moving the seat once, permanently, to someone who never authored the standard.

**E. Split by artifact — she audits completion docs, I audit tasks.md criteria quality.** *Rejected, and worth recording as a trap.* It sounds tidy and it hands me the **Goodhart surface** (§3.4: are criteria getting vaguer?) — which is the one question where the standards author has the strongest incentive to find no problem, because vaguer criteria make his standard look more complied-with. Whoever verifies claims must own the dilution question too. I flag this because it is the version of the compromise I would be most likely to talk myself into.

---

## 6. Non-negotiables vs flexible

### Non-negotiable

1. **Standards authorship stays with me.** A verifier who also authors the standard reproduces the exact conflict this transfer exists to break, mirrored. If Stacy's position is that authorship should follow verification, that is the one place I will argue hard.
2. **Civitas-infrastructure claims stay mine, and the steward toolset does not move.** Narrowable (§4.1); not removable in this spec. Moving steward verbs is a Spec-122-boundary change and does not belong on 127's back.
3. **The one-sentence test, applied to both charters.** My bar from the outline, and I will hold myself to it: if the agreed cut cannot be stated in one sentence per charter, the change is not ready and should be deferred rather than shipped vague.
4. **Triggers are event-anchored and written into the receiving charter.** No calendar cadence, no convention-only triggers.
5. **The fixture obligation (§3.2) is adopted regardless of Q5's outcome.** No fixtures, no arming.
6. **Q5 does not change F7's disposition or the arming sequence.** Ownership is orthogonal to whether the ballot ratifies and the checker bites.
7. **Nothing settles because Stacy and I agree.** Charter edits are governance law: ballot record, Peter-merged, `canonical/**` edited and regenerated (122) — never hand-edited output. Our joint proposal is a recommendation.

### Flexible — genuinely open

- **The carve-out's boundary**: evidence-type (my framing) vs tool-gated-only (narrower) vs doc-surface. I lean evidence-type; I will take the narrower version on request.
- **Who builds the checker.** I proposed me-builds / she-specifies-fixtures because my write scope is closer — but neither of us has `scripts/**` (mine: `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`; hers: the latter two). **A scoped write grant is required either way**, and it is an execution fact the tasks phase must settle regardless of Q5. Happy to invert: she owns the checker, I review.
- **Where the liveness meta-item lives** — my health check (T7) or her `audit:coverage-map`. Hers is arguably the better home; I kept it because process-liveness is infrastructure, not because I want the hook.
- **The `owner:` on `completion-verification-honesty`** (the ideological row). Verification practice is hers; the education half is mine; the schema has one owner field. Arguable either way and I have no strong view.
- **Trigger membership and sampling depth** — T1–T7 is an opening set, not a demand.
- **Staging.** I lean to a pilot and will say which one: **her first claims pass is on Spec 127's own completion docs.** Cheap, immediate, and the symbolism is correct — the spec that says self-attestation is not verification does not self-attest.
- **Record form.** I have a strong preference, not a red line: the charter change should be **separately ratifiable** from the completion-doc law, even if both ride one ballot document. A single up/down vote bundling "what completion docs must contain" with "who audits them" is two questions and one signature, and the second question is the one with a named party drafting the ballot.

---

## 7. What I would need to see to change my mind

Recorded so that reconciliation can falsify me rather than just negotiate with me:

- **Evidence that the excluded class is empty in practice** — if the first claims passes never encounter a corpus-state claim, my §1.2 exclusion is theoretical and should be dropped rather than carried.
- **A demonstration that the split raises verification latency materially** — if every audit stalls waiting on me for corpus evidence, the boundary is wrong and the steward-verb question comes forward on its own merits.
- **Stacy declining the system surface on load grounds.** If the receiving agent's honest read is that she cannot run T2–T4 across the whole corpus, the transfer fails on capacity and I would rather hear it now than discover it at the first missed release pass. In that case my fallback is **C-minus**: transfer T4 (consumer-symptom-triggered audits) only — the trigger with the strongest empirical record and the lowest volume — and revisit at the first product spec.
