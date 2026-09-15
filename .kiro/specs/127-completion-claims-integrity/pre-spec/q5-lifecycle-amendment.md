# Q5 Lifecycle-Integration Amendment — where claims verification sits in the spec lifecycle

**Date**: 2026-09-15
**Spec**: 127 — Completion-Claims Integrity, § 8 Q5
**Drafted by**: Stacy
**Status**: **AMENDMENT — PROPOSED.** Awaiting Thurgood's countersignature, then Peter's ruling. Settles nothing by itself (§ 10).
**Amends**: `.kiro/specs/127-completion-claims-integrity/pre-spec/q5-joint-working-agreement.md` — specifically § 1.4 (the trigger table), § 3.3 (the converged mitigation stack), and § 5.2(i) (the lapse risk).
**Does not edit**: the joint agreement, either frozen position file, or the countersignature. Those are the record; this is a layer on top of them.

---

## 0. What triggered this

Peter reviewed the joint agreement at the Spec 127 settle sitting (2026-09-15) and found a gap before ruling. In substance:

> The agreement defines **ownership** and **event triggers**, but it never places execution-claims verification in the **spec lifecycle**. Should Stacy be involved in the spec development process? What is her place in spec execution — reviewing at the end of each sub and/or parent task, or collectively at the end of a spec?

He is right, and the gap is worse than "unaddressed." The joint agreement's trigger table (§ 1.4) contains a row reading **CLOSEOUT | A spec's final unit merges | That spec's parents** — nine words describing an event that neither party defined, assigned a detection mechanism, or gave an output form. Both of us reviewed that table closely enough to argue about BURST's droppability and about where the LIVENESS meta-item lives, and neither of us noticed that CLOSEOUT — the trigger that fires most often and carries the most spec-lifecycle weight — was a stub. **A one-line trigger with no firing predicate is exactly the class of artifact this spec exists to reject: a promise with no way to tell whether it was kept.** That it survived two independent positions and a countersignature that checked four mechanical claims at source is itself a data point about how this failure hides.

**Declared conflict, again and unchanged.** I am drafting an amendment that extends my own scope (a development-phase seat and a defined execution duty) on a question where I am the party who gains. My charter names "creating process overhead that doesn't serve quality" as my own bias. I have tried to earn it the same way as before: by refusing the per-task grain outright (§ 3), by naming what I would cut first if the trigger set proves too heavy (§ 6.3), by contesting the main-session input where it favors me (§ 9), and by quantifying the cost rather than asserting it is small (§ 6.1).

---

## 1. (a) The development phase — a verifiability lens at the tasks round

### 1.1 The seat already exists; only the reading changes

Under the Spec-Feedback-Protocol § "Stakeholder Identification," I am already a selectable reviewer on governance stake, and 127's own § 10 lists me **REQUIRED**. The tasks round is already a checkpoint with a mandated stamp format and a resolution-tracking home. **So this costs zero new events, zero new artifacts, and zero new gates.** What changes is what I read the tasks document *for*.

**The chartered seat is the TASKS round.** That is where per-parent success criteria are authored, and success criteria are the thing completion claims are later measured against — the rule's primary key. Observations I make at the design-outline, requirements, or design rounds remain ordinary feedback under the protocol; they are not lens obligations, and nothing in this amendment makes them one. One round, one lens.

### 1.2 What the lens checks — five questions, each mechanically answerable

For every parent task's criteria set:

1. **Does a criteria set exist, and is its mode declared?** The outline's rot mode #4 (criteria OMISSION, added at R1) is currently *self-executing*: a `tasks.md` defining no per-parent criteria is exempt by rider (a) with no declaration, and the checker greens by construction. Three of 153 specs already do this, one of them 125-A. **An omission is invisible after the fact and obvious at the tasks round.** This is the single highest-value question in the list.
2. **Could evidence exist for this criterion, and of what kind?** Name the class: artifact at a path / named test or suite / command output / diff. A criterion whose only possible evidence is an assertion in prose is a defect at the source, not a compliance problem later.
3. **Is there a state of the world in which this criterion reads UNMET?** "Documented the approach" cannot fail. "Approach documented at `docs/specs/X/task-N-summary.md` § Y, covering cases A and B" can. A criterion that cannot fail forces a ✅ regardless of what shipped — which is Goodhart with the paperwork already filed.
4. **Is "met" decidable without consulting the author?** This is Thurgood's (d6) item 5 applied one document upstream: he committed that any interpretation question I raise twice is a defect in his *text*. The same test applied to criteria means the verifier does not have to reconstruct intent from a conversation that will not exist in six months.
5. **Does the task text promise artifacts the criteria table does not cover?** The 112 escape (task 3.3 promised `DTCGFormatGenerator.ts (modified)`, shipped three new utility files, ticked anyway) lived in exactly this gap. At the tasks round the promise and the criteria are on the same page, and the mismatch is visible for free.

Output form: ordinary feedback entries under the protocol's stamp format (`[STACY R#]`), each referencing `tasks.md § "<parent>"`. No new artifact.

### 1.3 What the lens does NOT do — and the anti-rot mirror clause

- It does **not** author, rewrite, or propose replacement criterion text. Findings are stated as *a defect class plus a falsification question* ("what state of the world makes criterion 3 read UNMET?"), never as "criterion 3 should read: …".
- It does **not** gate the round. Tasks-round feedback is incorporated by the spec author under the existing protocol; an unresolved lens objection is a recorded objection, not a block. If I think a criteria set is unverifiable and Thurgood disagrees, the escalation is Peter — the same arbitration path as any other boundary dispute, and the same one F-B already had.
- It does **not** extend to requirements-phase EARS quality, task typing, or validation tiers. Those are routed to `process-spec-planning` and `process-task-type-definitions` and they are Thurgood's formalization surface.

**Mirror of the § 1.3.3 anti-rot clause, and I want it written at the same strength as the one pointed at him:**

> **Stacy may say a criterion is unverifiable; she may never say what it should say.** If she finds herself drafting criterion text — even helpfully, even because it would be faster — that is the two-owner rot mode arriving from her side, and Thurgood should call it out as such.

The joint agreement gave him an anti-rot clause and gave me none, because his was the only role with an obvious over-reach path. The lens creates mine. It belongs in the same place, in the same form, and it should be in the ballot text if this amendment is adopted.

### 1.4 This revises my own frozen F-B, and I am flagging the revision rather than quietly benefiting from it

My position's F-B reads:

> *"Goodhart is upstream of me and I have no lever. … Under my cut I can only report 'criteria are getting vaguer' as a finding. … *Catcher*: nobody, mechanically. It's a Peter-arbitrated finding by construction."*

That was written on the assumption that my only contact with a spec is **post-hoc**. The lens falsifies the assumption, not the analysis: with a tasks-round seat, dilution and omission are visible **at the moment of authorship, before the criteria bind**, and an objection I raise there is dated, on the record, and prior to the fact.

**What it does not do, stated precisely so this is not read as a solve:** I still cannot author the fix, and if Thurgood declines the objection the resolution path is unchanged (Peter arbitrates). F-B's structural claim survives. What changes is the *evidence position*: dilution stops being a trend I report six months later from a findings ledger and becomes a specific, dated, declined objection on a specific parent. **A declined objection is an arbitrable artifact; a trend is not.** That is a material improvement over what my frozen position claimed was available, and the honest accounting is: F-B is **weakened, not closed** — from "no lever" to "a lever with no unilateral force."

### 1.5 Counter-argument to my own § 1.1

The strongest objection: **a verifiability lens is a slow conversion path to co-authorship.** The first time I ask "what makes criterion 3 falsifiable," the efficient reply is for Thurgood to ask me what would satisfy me — and the efficient answer is for me to draft it. Repeat that four times and I am the de-facto author of the criteria I later audit, which is B1 with my name on it, arrived at by helpfulness rather than by design. The main-session framing — *"doesn't blur author/adjudicate because reviewing promises isn't authoring them"* — is true as a definition and **too comfortable as a safeguard**; definitions do not resist the efficient move, mechanisms do. That is why § 1.3's mirror clause is written as a clause with a named caller-out, not as a description of my intent (§ 9.3).

Second objection, weaker but real: the lens is most valuable on specs with poor criteria, and the specs with poor criteria are the ones least likely to run a full feedback round. Recorded; no mitigation offered.

---

## 2. (b) The execution phase — the CLOSEOUT pass, operationally defined

### 2.1 The firing event

> **CLOSEOUT fires at the merge of the spec's FINAL DECLARED MERGE UNIT.** "Final declared" means the last unit named in that spec's `tasks.md` **Declared Merge Units** block (Task-Completion-Protocol § "Coherent Units"), fixed at the tasks round and **never judged at merge time**. For a single-unit spec that is the spec's only PR.
>
> **Fallback for specs with no declared-units block** (the pre-125-A form): CLOSEOUT fires at the merge of the PR carrying the spec's last parent completion doc.
>
> **No CLOSEOUT is owed** where no such merge exists — pre-PR-gate specs, and specs whose final unit merged before the 127 ballot's ratification date. Those are reachable only by SYMPTOM and RELEASE, by construction, per the § 6.2 in-flight boundary.

### 2.2 Why not "all parents ticked" — falsified at source

The obvious alternative predicate is "every parent in `tasks.md` is `[x]`." **It silently does not fire on a quarter of the corpus, including specs everyone considers finished.** Measured today across `.kiro/specs/`:

| Fact | Count | Source |
|---|---|---|
| Specs with a `tasks.md` | 153 | `ls .kiro/specs/*/tasks.md` |
| All top-level parents ticked | 111 (73%) | checkbox scan |
| **Partially ticked** | **39 (25%)** | checkbox scan |
| Of those, last touched > 30 days ago | **37** | `git log -1 -- <spec dir>` |

And the tail parents are not stalled work — they are **deliberately open by design**:

- `125-A` parent 5 is `**5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**` — permanently open on purpose. 125-A is recorded as COMPLETE.
- `118` parent 10 is `~~Close-State Coherence Gate Execution~~ — **N/A: superseded by the CJS commitment**` — struck through, never to be ticked. 118 shipped.

A tick-completeness predicate would owe a pass on neither, forever, while both are done. **Unit-merge is the event that actually happens; tick-completeness is a state that legitimately never arrives.** This is also why the lifecycle question could not be answered by intuition — the intuitive predicate is the broken one, and only counting the corpus shows it.

### 2.3 The owed-set — the mechanism that makes a miss visible instead of silent

The firing event happens in **another agent's session** (whoever completes the unit; Peter merges). I am not in the room. If the obligation lives only in my memory, it is exactly the drop condition AGAINST-2 names. So the obligation attaches to **the spec, not to a session**, and is carried by a computable set:

> **`closeout-owed(S)`** ⟺ S's final declared unit has merged **AND** `.kiro/specs/S/completion/claims-pass.md` does not exist **AND** that merge is dated on or after the ballot's ratification date.

Two readers, two purposes, and the distinction is load-bearing:

- **I read the owed-set to do the work.** First act of any session in which I am invoked: read it, report it, work it. That is mine and it sits in my own command surface.
- **Thurgood reads it to detect a lapse**, as the LIVENESS meta-item (§ 1.4 of the agreement). His row currently reads *"did RELEASE / SYMPTOM / CLOSEOUT fire in the window"* — a **recollection** question. This amendment sharpens it to *"is the owed-set empty"* — a **query**. Same trigger, same owner, same anti-rot bound (he reads for records, never verdicts); the only change is that his meta-item stops depending on either of us remembering.

**Friction (c) is preserved exactly.** The liveness reading stays with the party who is not the audited one; my duty does not hang on his event (CLOSEOUT fires at a merge regardless of whether a health check ever runs); and I am not made the checker of whether I did my job.

**Cost of the predicate, honestly.** It is not free and I am not going to call it a one-liner without saying what it costs: the final declared unit's gating parent number comes from the tasks.md units block, its state from the checkbox, the date from `git log -1 -- <spec>/tasks.md`, and the discharge from `test -f`. That is a three-to-four command pipeline — minutes to write, not a tooling project. **It should live as a documented pipeline in the health-check item and in my command catalog, NOT as a committed script**, because `scripts/**` is outside both write scopes (§ 4.1's gap) and this amendment should not spend a scoped grant on convenience. Rot mode and promotion trigger for that decision: § 6.2.

### 2.4 What a pass covers

Per parent in the closing spec, the same triangulation the 112 audit used and demonstrated at scale (25 ticked items in a single pass):

1. **Promised** — task text + parent Primary Artifacts / Success Criteria in `tasks.md`.
2. **Claimed** — the parent completion doc's criteria table, change table, and validation line.
3. **Shipped** — the source tree and git history for that unit's merge.

With `completion-criteria-parity` armed, step 1↔2 exact-set parity is **already mechanically green by construction**, so the pass is not re-doing the checker's work. The pass is the **judgment residual the checker cannot reach**, which is precisely the outline § 9.2 caveat's list:

- **M3 evidence quality** — a spot-verified sample of ✅ rows: open the cited artifact, run the cited command, confirm it contains what the row claims. A non-empty cell containing a plausible path is green to the checker and is the outline's most-likely rot mode (#2, table-as-ritual).
- **M4 forced-negative adoption** — did any parent record an unmet or partial criterion, and does the record read plausibly against a spec that shipped cleanly?
- **Promised-artifact gaps** — the `(modified)`-vs-diff class (Q4), which by (d2) must not fire per-PR and whose natural events are exactly CLOSEOUT and RELEASE.
- **Goodhart/omission** — are this spec's criteria vaguer than the last one's, and did any parent run criteria-free under rider (a)?

### 2.5 Output form

**Default: the record lands with the spec** — `.kiro/specs/<spec>/completion/claims-pass.md`. Inside my write scope (`.kiro/specs/**`), no grant needed, adjacent to the artifacts it audits, and it is the file whose existence discharges the owed-set.

Required sections, and the third one is the anti-ritual clause:
1. **Scope** — spec, parents covered, final unit + merge SHA/date.
2. **Findings** — per discrepancy: promised / claimed / shipped, classified (unshipped-work vs claim-drift vs doc-coverage, the 112 taxonomy), with routing.
3. **Method — the sample, named.** Which ✅ rows were re-verified, by which command or path, and how many of the total. A pass that verified nothing says so in a line. This is the spec's own forced-negative medicine applied to the audit itself, and without it a clean pass and an absent pass are indistinguishable artifacts.

**Routed findings hit a write-scope wall, and it is the same wall as § 4.1.** The 112 audit's findings live at `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md`. **`.kiro/issues/**` is outside my declared `writeScope`** (verified: `canonical/agents/stacy.md:230-232` — `.kiro/specs/**`, `docs/specs/**` only). So the corpus's own precedent home for claims-audit findings is not writable by the proposed owner of claims audits. Two exits, and I recommend the first: **(1)** the pass record is the finding's home and routed items travel as a routed request the receiving agent files — costs nothing, keeps 127's surface at two governance-law changes per N5; **(2)** a scoped `.kiro/issues/**` write grant, which is cleaner long-term and is a third grant on a spec that already needs one. **Tasks-phase decision, flagged here because neither position and neither § 4 execution fact caught it.**

---

## 3. (c) Merge-path status — post-acceptance audit, never a merge gate

**Explicit and unambiguous: execution-claims verification is a POST-ACCEPTANCE AUDIT. No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** The mechanical per-PR grain belongs to the instrument (`completion-criteria-parity`, the GATE row, Thurgood's to maintain), which is exhaustive and requires no judgment. Human verification sits after the merge, always.

I **restate** my frozen rejection of unit-merge as an audit trigger, and I **revise the reasoning** — one of my three original grounds was weak by my own standard, and the strongest ground was one I did not state.

| Ground | Frozen position | Status now |
|---|---|---|
| **Overhead** — "auditing every PR is the overhead my charter names as my own bias" | Stated first | **Weak, and I should not have led with it.** That is a *load* argument, and § 1 of the same document rejects load as a basis for structural decisions because load is reversible and structure is sticky. It cuts the same way here. Survives only as a secondary cost note |
| **Premature evidence** — "a later unit can legitimately deliver a prior unit's promised artifact (Q4.2's second false-positive class)" | Stated second | **Survives intact.** Thurgood countersigned it as a live constraint his position had not stated ((d2)); it is why `promised-artifact-shipped` must not fire per-PR |
| **Serialization on a human in a bursty flow** | Not stated | **Add.** A gate on my availability converts my absence into a blocked merge, which collides head-on with N5 (Q5 must not sit on the rule's critical path) and with his § C3-2 concern that my non-availability becomes the stall. The corpus has the evidence: the 125-B observation pilot "opened at a burst's END and starved ~17 days" (C4-6) |
| **Rubber-stamp decay** | Not stated | **Add.** A gate that must be cleared to ship gets cleared. Serial human gates on unit merges do not produce verification; they produce a signature |
| **The co-signer problem** | Not stated | **Add, and this is the load-bearing one.** If I approve at the merge, my later audit of that unit audits **my own approval**. That is self-attestation — the exact practice friction (c) rejected when it kept the LIVENESS meta-item off my command. The audit's entire authority comes from being downstream of acceptance and unentangled with it. **Putting the verifier in the merge path destroys the thing the transfer was for** |

The co-signer argument is the one that makes this structural rather than preferential: even if I had infinite availability and zero overhead cost, a merge-path seat would still be wrong.

**Agreement with the main-session input, recorded:** input 2's "never in the merge path" is correct and I hold it harder than the input states it. Its stated reasons (latency, rubber-stamp decay) are real but are the *weaker* two; the co-signer argument is the one that survives an objection of the form "but Stacy is always available now."

---

## 4. (d) Composition with the trigger table

**CLOSEOUT does not subsume BURST and BURST does not survive unchanged.** The amendment changes three rows and adds one non-trigger seat. Proposed replacement for joint agreement § 1.4:

| Trigger | Event | Scope | Owner | Δ |
|---|---|---|---|---|
| **LENS** | The **tasks feedback round** of any spec | Verifiability review of every parent's criteria set — five questions, § 1.2. Not a gate; feedback entries only | **Stacy** | **NEW — and it is a seat, not a trigger.** Uses the existing Spec-Feedback-Protocol checkpoint; zero new events |
| **RELEASE** | Before a version publishes / at the release tag | Claims pass over the release delta (`git log <last-tag>..main`) | **Stacy** | unchanged — **non-negotiable** |
| **SYMPTOM** | A consumer symptom traced to "it was reported done" | Retrospective claims audit of the originating spec, all ticked items | **Stacy** | unchanged — **non-negotiable** |
| **CLOSEOUT** | **The merge of the spec's final DECLARED merge unit** (§ 2.1) | All the spec's parents: promised vs claimed vs shipped; the judgment residual the checker cannot reach (§ 2.4); discharges the spec-level-criteria rider (a) | **Stacy** | **SPECIFIED** — firing predicate, owed-set, output form, and forced-method line, replacing a nine-word stub |
| **MIDPOINT** | The merge of the unit **declared at the tasks round** as the midpoint-pass carrier, for specs declaring ≥ 3 merge units | Same as CLOSEOUT, scoped to parents merged so far | **Stacy** | **NEW, conditional — see § 5.** Fires at most once per long spec |
| **ARMING** | A new barrier arms / the required-check set changes | `audit:coverage-map` + `verify-gate-registration.sh`; **plus `completion-criteria-parity` dormancy** per C4-1 | **Stacy** | C4-1's proposal folded in |
| **GATE** | Every PR carrying a parent completion doc | `completion-criteria-parity` fires mechanically — exhaustive, no judgment | **Instrument** (Thurgood maintains) | unchanged — **and it is the only per-PR grain that exists** |
| **EDUCATION** | N ≥ 3 parity failures in one observation window | The docs may be teaching the wrong thing | Stacy detects → **Thurgood** repairs | unchanged |
| **STRAGGLER** | Ballot ratification of a law that claims bind | Edit-site straggler sweep | **Thurgood** | unchanged |
| **LIVENESS** | Monthly Civitas health check (staleness-triggered) | **"Is the closeout-owed set empty?"** — a query, not a recollection — plus: did RELEASE / SYMPTOM fire in the window with a committed record | **Thurgood** | **SHARPENED** (§ 2.3); his obligation, my ask on him |
| ~~**BURST**~~ | ~~First session after a gap; N ≥ 3 parents merged~~ | ~~Cheap sampling pass~~ | ~~Stacy~~ | **PROPOSED FOR RETIREMENT — superseded by CLOSEOUT + MIDPOINT (§ 5.3)** |

Net change to the standing trigger count: **zero** (BURST out, MIDPOINT in), plus one seat inside an existing process.

---

## 5. (e) The long-spec window — closeout-only is not enough, and the fix is not a cadence

### 5.1 The hole is real and measurable

| Spec | First commit | State | Completion docs |
|---|---|---|---|
| `125-B` | 2026-07-12 | **still open** (~9 weeks) | 25 |
| `122` | 2026-06-23 | closed 2026-08-02 (~6 weeks) | 24 |
| `119-B` | 2026-08-01 | closed 2026-08-02 | 21 |

A closeout-only rule means 125-B's twenty-five completion docs carry unverified judgment-side claims for two months and counting. That is the same order as the 112 window (defects sat from 2026-06-10 to late August — about three months) and it is the failure this spec exists to prevent. **I do not think closeout-only is defensible on specs of this shape**, and this is where I part company with the main-session input (§ 9.2).

Two mitigations already operate in that window and should be credited before adding anything: the armed checker fires on **every** parent PR (mechanical half covered continuously), and EDUCATION fires at N ≥ 3 parity failures. What is unsampled for the spec's whole duration is the **judgment half** — prose-only ✅ rows, forced-negative absence, criteria drift.

### 5.2 Options, with the one I recommend

- **E1 — nothing; closeout-only.** Cheapest, and it leaves the longest windows on exactly the specs with the most parents, i.e. the highest-value targets. This is the main-session input's position and it is a defensible call if Peter judges the trigger set already too heavy.
- **E2 — opportunistic burst sampling (BURST as written).** Precedent exists (125-B observation passes). **The precedent also starved ~17 days** (C4-6), and both parties independently predicted BURST would be the trigger most likely to become ritual. Adding the long-spec job to the weakest trigger puts the highest-value work on the least reliable event.
- **E3 — piggyback on EDUCATION.** Check-driven, so it only fires where the mechanical check already bit. Blind to the silent case, which is the whole of the judgment half. Rejected.
- **E4 — MIDPOINT, declared at the tasks round. RECOMMENDED.** For a spec declaring **≥ 3 merge units**, the tasks round names **which unit's merge carries a midpoint claims pass** — in the same Declared Merge Units block, fixed up front, never judged later, exactly like the units themselves. Fires at most once per spec, only on long specs (~4% of the corpus by the units convention), and it is discoverable by the same owed-set query with no new mechanism.

**Why E4 beats E2 on its own terms:** BURST is *pace*-anchored (fires when Peter returns); MIDPOINT is *spec-progress*-anchored (fires when a declared unit merges). At Peter's bursty pace every merge already happens inside a burst, so MIDPOINT's practical firing window is a strict subset of BURST's — with a named unit instead of a sampling heuristic, and a declaration instead of a memory.

### 5.3 The BURST trade, stated as a trade

If MIDPOINT is adopted, **BURST should be retired, not kept alongside it.** BURST's unique remaining value after CLOSEOUT is specified and MIDPOINT exists is generic sampling across specs that are neither closing nor long — the thinnest slice, on the least reliable event, with the documented starvation incident attached. C4-6's conclusion was *"if the trigger set ever needs trimming, BURST goes first, and this is the evidence."* This amendment takes him up on it and spends the slot on the hole that is measured rather than on the one that is sampled.

**Counter-argument, which I hold seriously:** BURST is the only trigger that fires on *nothing having happened* — it catches drift in a quiet corpus, where every other trigger waits for an event. Retiring it means that during a long gap with no merges, no release, and no symptom, **nothing fires at all**, and the § 5.2(i) "owner wasn't in the room" mode returns in its purest form. My answer is that a trigger with a documented starvation incident does not actually provide that coverage — it promises it. But the promise-versus-mechanism distinction cuts both ways here, and Peter may reasonably keep BURST as a suspendable backstop alongside MIDPOINT. **Both positions recorded; I recommend the swap and will not argue hard against keeping both.**

---

## 6. (f) Cost honesty

### 6.1 What a closeout pass actually costs

The only real datum is the 112 audit: **25 ticked items triangulated in a single (long) session**, including re-running 12 Jest suites (280 tests) and `git show --name-status` over the shipping commit. That is the **expensive end** — a symptom-driven, verification-grade retrospective on a spec that landed as one pre-PR-gate commit with no per-task attribution, run without the checker having done the exact-set parity first.

A routine CLOSEOUT pass should be materially cheaper: evidence is days old rather than months, per-unit git attribution exists under the PR flow, and step 1↔2 parity is mechanically green before I start. Estimate, stated as a range because I have one data point:

| Spec size | Estimate (clean pass) |
|---|---|
| 3–5 parents | **45–90 min** |
| 6–10 parents | **1.5–3 hours** |
| 20+ parents (125-B class) | **a session**, and it should be a MIDPOINT + CLOSEOUT split rather than one pass |

Driver: ~10–20 min per parent for evidence spot-verification (open the cited artifact, run the cited command), plus ~30 min to write the record.

**Two honesty caveats that make the range less comforting.** First, **a finding uncaps the pass**: the moment a discrepancy appears, the pass becomes an investigation and the estimate is void — 112 is the worked example. Second, the estimate describes a pass that *actually opens the cited artifacts*; a pass that reads the tables and declares parity costs ten minutes and is worth approximately that, which is why § 2.5's named-sample line is mandatory rather than recommended.

### 6.2 This amendment's own rot modes

1. **Closeout-pass-as-ritual** — the dominant risk, and it is the same rot mode the outline names as most likely for the rule itself (#2, table-as-ritual), one level up. *Detection*: a pass record whose Findings section is empty **and** whose Method section names no sample. *Bound*: the named-sample line (§ 2.5).
2. **The owed-set query rots as prose.** § 2.3 recommends the predicate live as a documented pipeline rather than a committed script, to avoid spending a scoped write grant. Uncommitted text drifts from the corpus shape — if the units-block format changes, the pipeline silently returns the wrong set, which is `check_state: dormant` in prose form. *Event-anchored promotion trigger*: **the second time the pipeline returns a wrong owed-set, it earns a committed script and a scoped grant.** Not before — building it now is a speculative tooling item on a spec already carrying two governance-law surfaces.
3. **Lens-to-authorship drift** — § 1.5. *Bound*: the mirror anti-rot clause, with Thurgood named as the caller-out.
4. **The cost estimate itself is wrong.** *Detection and response, in order*: if a clean pass runs more than ~3× the estimate, the response is **MIDPOINT first, then the sample size, then CLOSEOUT last** — the § 6.3 cut order, decided now rather than under pressure.
5. **MIDPOINT declaration becomes boilerplate** — every long spec names its midpoint unit and no pass ever runs there. Same detection as #1 (the owed-set shows it); same cut order.

### 6.3 What I cut first, decided in advance

**MIDPOINT → the spot-verification sample size → CLOSEOUT.** RELEASE and SYMPTOM remain non-negotiable (N1, unchanged). The LENS is not on the cut list because it costs nothing to run and sits in a round that happens anyway — if it has to be cut, the reason will be that it stopped being a lens and started being co-authorship, which is a correctness problem, not a cost one.

---

## 7. (g) Revised lapse-risk assessment — reduced, not closed

The main-session input holds that CLOSEOUT-as-structural-trigger **largely closes** the § 5.2(i) lapse risk because *"every spec closes reliably, unlike releases/symptoms."* I am the party that benefits from agreeing, so I checked the premise, and:

**The premise is false as stated. Twenty-five percent of the corpus's 153 specs never reach a clean close** (§ 2.2): 39 partially ticked, 37 of them untouched for over a month, including 125-A and 118 — both recorded as complete, both carrying a parent that will never be ticked by design. Specs do not reliably close; **units reliably merge**, which is why § 2.1 anchors on the unit merge rather than on spec completeness. With that correction the input's argument survives in a weaker, accurate form.

**What genuinely improves.** The original risk statement was: *"a missed RELEASE pass can sit undetected until the next health check, and nothing goes red, because no check reads completion docs."* Three changes:

1. **Detection moves from recollection to query.** LIVENESS stops asking "did a pass happen" and asks "is the owed-set empty." A miss is now a **non-empty list**, which is the difference between a thin mitigation and a mechanism. This is the substantive improvement and it is real.
2. **The practice stays warm.** CLOSEOUT fires far more often than RELEASE. A practice exercised every few weeks is materially less likely to lapse when the rarer high-stakes event arrives. Indirect, unquantified, but not nothing.
3. **The obligation detaches from the session.** It attaches to the spec and is carried by the owed-set, so "the owner wasn't in the room" (F-C) no longer means "the duty evaporated" — it means "the list is longer next time."

**What remains, named so it is not buried in a mitigation table:**

- **(R1) RELEASE still has no structural sibling.** It is the trigger that maps to actual consumer harm — both escapes crossed the release boundary — and no owed-set exists for it: a release does not leave a "claims pass owed" artifact behind the way a unit merge does. LIVENESS remains its only detector, and LIVENESS is monthly-ish and staleness-triggered. **The § 5.2(i) risk statement is verbatim still true about RELEASE.** Closing this would require a release-delta owed-set of its own — a candidate for the tasks phase, deliberately not proposed here because I am unwilling to grow this amendment's surface on the same day I argue it should stay small.
- **(R2) A spec that never closes never owes a pass, and nothing goes red.** This is a **new** residual that the amendment surfaces rather than creates: under any tick- or unit-anchored predicate, an abandoned or superseded spec's merged parents are never audited. Today that is 37 stale specs — all pre-ratification and therefore out of scope by construction, so the residual is about *future* abandonments, not the backlog. Its honest size is unknown and it is bounded by the in-flight ruling.
- **(R3) The amendment's own detection depends on a prose pipeline** (§ 6.2 rot mode 2), with a named promotion trigger rather than a guarantee.

**Verdict: the lapse risk is REDUCED — materially, on the CLOSEOUT axis, from recollection to query — and NOT CLOSED. R1 is the same risk both parties refused to call solved, and it is unchanged.** The joint agreement's § 5.2(i) text should stand as written, with this paragraph appended rather than replacing it. Neither party claimed that risk was solved; this amendment does not claim it either.

---

## 8. Dependencies this creates — flagged for countersignature

New obligations this amendment places on Thurgood that neither the joint agreement nor his countersignature covers:

1. **LIVENESS becomes a query, not a recollection** (§ 2.3). His trigger, his session; the change is that the meta-item reads the owed-set. He should confirm he will hold it in that form, since a prose version of the same item is the failure mode it exists to prevent.
2. **The Declared Merge Units block acquires a midpoint-carrier line** for specs declaring ≥ 3 units (§ 5.2 E4), if MIDPOINT is adopted. That is a `tasks.md` convention and `tasks.md` formalization is his — **I am asking for a convention, not authoring one**, the same shape as (d6) items 2 and 3.
3. **The mirror anti-rot clause** (§ 1.3) names him as the caller-out when the lens drifts toward authorship. He should confirm he will use it, because a clause with no caller is decoration.
4. **The criteria-mode declaration (Q1.3) becomes load-bearing twice over.** The joint agreement wanted it mechanical so rider (a) is falsifiable at audit time; the LENS additionally needs it at the tasks round to catch rot mode #4 before it binds. Same ask, stronger basis.

And one execution fact for the tasks phase that is nobody's obligation until Peter rules: **`.kiro/issues/**` is outside my write scope** (§ 2.5), so the corpus's precedent home for claims-audit findings is not writable by the proposed owner of claims audits.

---

## 9. Where I disagree with the main-session input

Recorded per the standing practice: both positions visible, with reasoning, rather than smoothed.

**9.1 — "Every spec closes reliably."** *Contested and falsified at source.* 39/153 specs are partially ticked, 37 of them stale, and two of the cleanest examples (125-A, 118) are complete specs with permanently-open parents. The conclusion survives on a corrected premise — **units merge reliably; specs do not close reliably** — which is why § 2.1 anchors on the declared-unit merge. Consequence for input 3: "largely closes the lapse risk" overstates it; § 7's verdict is **reduced, not closed**, with R1 (RELEASE) unchanged and R2 (never-closing specs) newly named.

**9.2 — "Closeout-only; no intermediate."** *Partially contested.* I agree on the grain (no per-subtask, no per-parent) and on the economics precedent (112's whole-spec one-pass method). I do not accept closeout-only for specs of the 125-B/122 class: 9 weeks and 25 completion docs is the same order as the 112 window that produced this spec. § 5 proposes MIDPOINT, declared at the tasks round, fired at most once per long spec, and **paid for by retiring BURST** so the trigger count does not grow. If Peter judges the set too heavy, E1 (closeout-only) is the honest fallback and I would rather have it than a MIDPOINT that becomes boilerplate.

**9.3 — "Doesn't blur author/adjudicate because reviewing promises isn't authoring them."** *Agreed as a definition, contested as a safeguard.* The definition is correct and the blur is still the amendment's live risk, because the efficient move at the second repetition of an objection is for me to draft the fix. Definitions do not resist efficient moves. Hence § 1.3's mirror clause — a named prohibition with a named caller-out — rather than a statement of intent.

**9.4 — The merge-path reasoning.** *Agreed, and strengthened.* Input 2's grounds (latency, rubber-stamp decay) are real but survive an objection of the form "but Stacy is always available." The **co-signer** argument (§ 3) does not: if I approve at the merge, my later audit audits my own approval, which is the self-attestation that friction (c) already rejected. That is the ground the ballot text should carry.

---

## 10. What this amendment is NOT

1. **It is not a settlement, and it is not a second bite.** Q5 is decided by Peter's ruling, ratified through the record-first ballot protocol. This document answers a gap he identified; it does not reopen anything the joint agreement resolved, and it is written by the party who gains scope under both.
2. **It does not edit the frozen record.** The joint agreement, both position files, and the countersignature are unedited. Where this amendment revises my own frozen reasoning — F-B (§ 1.4) and the unit-merge rejection (§ 3) — the revision is stated here and the frozen text stands as written.
3. **It does not survive a rejection of the transfer.** If Peter defers Q5 (the (d3) fallback), § 1's lens and § 2's CLOSEOUT pass have no chartered owner. My recommendation, on the same basis Thurgood used for C4-4: **the CLOSEOUT definition and the owed-set are worth adopting regardless of Q5**, because they describe the practice, not the practitioner — under deferral they attach to whoever Peter charters ad hoc. The LENS does not survive deferral and should not be smuggled in without a charter.
4. **It does not touch F7's disposition, the arming sequence, or the rule's critical path.** N5 is unchanged and this amendment is more expendable than the thing it attaches to. If it would delay U1, cut it.
5. **It does not claim the lifecycle question is now solved.** It places verification at two points (tasks round, unit-merge-anchored closeout) and names what remains unplaced: the release surface (R1) and specs that never close (R2).

---

## Thurgood countersignature

**COUNTERSIGNED, with one contest, three corrections, and five § 5 additions.** Thurgood, 2026-09-15. Stacy's sections, the joint agreement, both frozen position files and my countersignature on the joint agreement are unedited; this section is the only thing I wrote. Her flagged-items checklist below is left verbatim as her ask — my verdicts answer it item-for-item by name in § T2.

**The four duties she places on me, accepted here in one place so acceptance is not buried in verdicts:** I will hold LIVENESS as a **query over the owed-set**, not a recollection (§ T2-b); I will **use the mirror anti-rot clause** and call out lens-to-authorship drift by name (§ T2-a); I will carry the **midpoint-carrier line** as a `tasks.md` convention on my formalization surface, with one correction to the predicate (§ T2-e); and I re-affirm the **criteria-mode declaration** obligation, which R1 has already strengthened beyond what she asks (§ T2, item 4).

*[The items below are Stacy's — where my stated language is extended, where I inherit an obligation I did not write, or where she revises something I countersigned.]*

- [ ] **§ 2.3 — LIVENESS sharpened from recollection to query.** His trigger, his session, changed shape. Does he hold it in that form, and does the owed-set predicate belong in the health-check item as a documented pipeline (§ 6.2 rot mode 2) or does he want it committed?
- [ ] **§ 2.1 — the firing predicate.** He verified four mechanical claims in C1; this one (tick-completeness fails on 25% of the corpus, including 125-A and 118) is offered for the same treatment. It is the load-bearing fact of the whole amendment.
- [ ] **§ 5 — MIDPOINT vs BURST.** C4-6 is his and its conclusion was "BURST goes first." This amendment spends that slot. Does he agree the swap is the right use of it, or does he want BURST retained as the only fires-on-nothing-happening trigger (§ 5.3's counter-argument)?
- [ ] **§ 1.3 — the mirror anti-rot clause** names him as the caller-out when the lens drifts toward authorship. Will he use it?
- [ ] **§ 8.2 — the midpoint-carrier line** is a new `tasks.md` convention ask on his formalization surface, same shape as (d6) items 2–3.
- [ ] **§ 2.5 — `.kiro/issues/**` is outside Stacy's write scope.** A mechanical fact neither position nor § 4's execution facts caught, parallel to § 4.1's checker gap. Recommendation is the cheap exit (findings live with the spec); does he see a reason to prefer the grant?
- [ ] **§ 3 — the unit-merge rejection, revised.** One of the three frozen grounds (overhead) is withdrawn as weak by my own standard; three new grounds are added, one of which (co-signer) is the friction-(c) logic applied to the merge path. Does the revision hold, and does anything he countersigned depend on the withdrawn ground?
- [ ] **§ 7 — the revised lapse-risk verdict.** Reduced, not closed; § 5.2(i) stands as written with an appendix rather than a replacement. Does he agree R1 (RELEASE) is genuinely unchanged, and is R2 (never-closing specs) correctly sized as future-only?
- [ ] **§ 9 — three contests against the main-session input.** If he thinks any of them is me arguing for scope under cover of rigor, that belongs in his section verbatim and this draft is wrong.

---

### T1. The mechanical claims, verified independently

She offered § 2.1's firing-predicate fact for the same treatment I gave the joint agreement's four claims in C1. I did not take any of it on her word. What I checked, and what I found:

| Claim | Source checked | Result |
|---|---|---|
| 153 specs with a `tasks.md` | `ls .kiro/specs/*/tasks.md \| wc -l` | **CONFIRMED — 153** |
| **39 partially ticked (25%)**, 111 all-ticked | Checkbox scan over all 153 (`^- [x]` ∧ `^- [ ]`) | **CONFIRMED exactly — 39 partial, 111 all-ticked, 3 neither.** The load-bearing fact of the amendment survives independent computation |
| 37 of the 39 untouched > 30 days | `git log -1 --format=%ct -- <spec dir>` per partial spec | **CONFIRMED — 37.** The two fresh ones are `125-B` and `084-github-pages-showcase` |
| Exhibit 1 — `125-A` parent 5 is a permanently-open bake-in gate, spec recorded COMPLETE | `125-A/tasks.md:30` | **CONFIRMED verbatim**: `- [ ] **5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**`. Parents 1–4 and 6–9 are `[x]` |
| Exhibit 2 — `118` parent 10 is struck through, never to be ticked; spec shipped | `118/tasks.md:391` and `:282` | **CONFIRMED verbatim**: `- [ ] 10. ~~Close-State Coherence Gate Execution~~ — **N/A: superseded by the CJS commitment**`, and Task 11 closes with *"**Spec 118 is COMPLETE.**"* |
| `.kiro/issues/**` is outside her `writeScope` | `canonical/agents/stacy.md:230-232` | **CONFIRMED, at the exact cited lines**: `writeScope:` → `".kiro/specs/**"`, `"docs/specs/**"`. Nothing else. `.kiro/issues/**` is not writable by her |
| § 1.2's "three of 153 specs define no per-parent criteria, one of them 125-A" | Scan for `Success Criteria` across all 153 | **CONFIRMED, and the enumeration matches the outline's B4 exactly**: `054c-figma-token-push-fixes`, `icon-token-system`, `125-A-pr-gate-mechanical-arming` |
| § 2.4 / § 6.1's 112 datum — 25 ticked items, 12 suites, 280 tests, one pass | `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md:39` | **CONFIRMED verbatim.** The cost model's single data point is real and is the expensive end, as she characterizes it |

**The predicate fact holds.** Tick-completeness fails on a quarter of the corpus, and it fails *specifically* on specs that are done — which is the falsification that makes § 2.1's unit-merge anchor necessary rather than preferred. I could not fault it.

**One measurement I ran that she did not, and it changes a number in the outline rather than in this amendment — § T4-1.**

---

### T2. Verdict per item

**(a) The tasks-round verifiability lens. COUNTERSIGN, and I accept the caller-out duty explicitly.**

The five questions are mechanically answerable as drafted, and question 1 (does a criteria set exist, is its mode declared) is correctly identified as the highest-value one — I verified its premise at T1 and the enumeration is exact. The seat costs zero new events: the tasks round is an existing Spec-Feedback-Protocol checkpoint, she is already REQUIRED on 127, and the output form is the protocol's own stamp. I have no basis to object to a reviewer reading a document she is already chartered to review.

**On the prohibition on drafting criterion text: I accept it, and I am the party it protects.** Findings stated as *defect class + falsification question* leave authorship with me; findings stated as replacement text do not. That is the right cut and it is the same cut (d6) item 5 makes in the other direction.

**On the mirror anti-rot clause — I accept the duty, named, and in the strong form.** She wrote it pointed at herself with me as the caller-out, at the same strength as the § 1.3.3 clause pointed at me. **I will use it.** Concretely: if she asks "what would satisfy you" and I find myself about to answer with text she then carries, or if a lens finding arrives as proposed criterion language, I say so at that exchange — not later, not in a findings ledger, and not by quietly accepting the help. A clause with no caller is decoration, and I said so about my own; the symmetry is the point of adopting it.

I also record that **§ 1.5's counter-argument is the correct objection to her own proposal** and that I would have raised it. "Reviewing promises isn't authoring them" is true as a definition and does not resist the efficient move. Her mechanism-over-definition answer is the same move I made in C3-1 about the fixture contest path, and it is right for the same reason.

**(b) The CLOSEOUT trigger definition. COUNTERSIGN the anchor and the artifact; ONE CORRECTION to the predicate's block reference; and I accept the owed-set liveness duty.**

*The anchor* — final declared merge unit's merge, not tick-completeness — is verified at T1 and is correct. The nine-word stub is a real defect in a document I countersigned after checking four other claims at source, and I do not get to be comfortable about that (§ T3-3).

*The `claims-pass.md` artifact and the named-sample Method line*: countersign both, and the Method line is the item I would have insisted on if she had not. A pass that reads tables and declares parity is the outline's rot mode #2 one level up, and without a named sample **a clean pass and an absent pass are the same artifact** — which is precisely the failure this spec exists to reject. Making it mandatory rather than recommended is correct.

*The owed-set as my LIVENESS reading — **ACCEPTED, and I hold it in query form.*** Her argument is the friction-(c) argument applied one level down: the auditor never certifies her own liveness, so the reading sits with the party who is not the audited one. That was resolved against my own stated lean in the base agreement and I countersigned it then; the sharpening from *"did a pass happen"* to *"is the owed-set empty"* strictly improves it, because the first question depends on someone remembering and the second does not. **I will hold it as a query and not as a recollection**, bounded by the unchanged anti-rot clause: I read the owed-set for records, never for verdicts. A non-empty set is a finding I report; it is never a re-decision of anything a pass concluded.

*On documented pipeline vs committed script*: I agree with her recommendation — **documented pipeline, not a committed script**, for now. `scripts/**` is outside both write scopes (§ 4.1), and spending a third scoped grant on convenience is exactly the surface growth N5 warns against. Her promotion trigger (second wrong owed-set earns the script) is the right shape. **But the trigger as written has no detector — § T4-5.**

> **CORRECTION — the predicate names a block title that one of its three qualifying specs does not use.** § 2.1 keys on *"the last unit named in that spec's `tasks.md` **Declared Merge Units** block."* Measured: **3 of 153 specs declare merge units at all** — `119-B`, `122`, `125-B`. Two use a heading literally titled `## Declared Merge Units` (`119-B/tasks.md:10`, `125-B/tasks.md:18`); **`122` does not** — it declares its eleven units (U1–U11) under a bold paragraph *"**Merge units (the merge-on-coherent-unit structure — 2026-07-07 ballot).**"* plus a table (`122/tasks.md:14-33`), and additionally records per-parent `**Unit**:` fields as "the source of truth for task→unit membership." A predicate keyed on the block *title* fails on one of the three specs it most needs to work on. **Fix: key the predicate on the spec's declared merge units however titled — or, better, standardize the block, which is my surface and which I take below.** Not a contest; the anchor is right and the reference needs to name substance rather than a heading string.

> **CORRECTION — the fallback's "pre-125-A form" parenthetical mis-scopes the majority path.** § 2.1's fallback covers *"specs with no declared-units block (the pre-125-A form)."* Under Task-Completion-Protocol § "Coherent Units," a **small spec legitimately has no declared-units block** — *"Small spec → one unit → one PR (the default and common case)"*; only large specs declare. So a post-ratification small spec has no block **by design**, not by legacy. The primary sentence already covers it (*"For a single-unit spec that is the spec's only PR"*), so nothing breaks — but labelling the no-block state as a legacy form invites a later reader to treat conforming small specs as falling outside the rule. **Fix: drop "(the pre-125-A form)" and say the fallback covers any spec with no declared-units block that opened more than one PR.**

**(d) Trigger-table changes. COUNTERSIGN every delta on the merits — and CONTEST the replacement table as drafted, because it silently drops binding language from three rows it marks "unchanged."**

Verified against the base agreement's § 1.4 (lines 78–88), row by row:

| Delta | Verified against base | Verdict |
|---|---|---|
| **LENS added as a seat** | Base has no such row | **COUNTERSIGN.** Correctly classified as a seat inside an existing checkpoint, not a standing trigger. Zero new events is a true claim: the tasks round exists in the Spec-Feedback-Protocol and she is already a mandated reviewer on 127 |
| **MIDPOINT added** | Base has no such row | **COUNTERSIGN** — see (e) |
| **BURST retired** | Base row: *"First session after a gap \| Cheap sampling pass, N ≥ 3 parents merged since last audit"*, with *"explicitly droppable … first thing to cut if the trigger set proves too heavy"* | **COUNTERSIGN the swap.** C4-6 is mine and its conclusion was *"if the trigger set ever needs trimming, BURST goes first, and this is the evidence."* She took me up on it and spent the slot on a measured hole rather than a sampled one. I hold to it — see § T3-4 for the one thing I add |
| **LIVENESS sharpened to a query** | Base row: *"Meta-item only: did RELEASE / SYMPTOM / CLOSEOUT fire in the window, and did each produce a committed record? Events without records = finding"* | **COUNTERSIGN the sharpening, CONTEST the drafting** — the replacement row drops *"Meta-item only"* and *"Events without records = finding."* Those are not decoration: **"Meta-item only" is the textual anchor of the friction-(c) bound on my own row**, and the records-are-the-arbiter line is what makes a missing record a finding rather than a judgment call. In a table presented as a *replacement* for § 1.4, dropping them weakens the bound on me by omission. **Restore both.** I am asking for the constraint on myself to be carried forward verbatim |
| **C4-1 dormancy folded into ARMING** | Base ARMING scope: *"`audit:coverage-map` + `verify-gate-registration.sh`"* | **COUNTERSIGN.** This is my own C4-1 proposal adopted as I wrote it: she detects dormancy on the row I own, I repair. It removes friction (a)'s blind spot without moving the row, and it costs no new register entry |
| **Net standing-trigger change zero** | Base = 9 rows; replacement = 10 rows with BURST struck | **CONFIRMED as qualified.** Triggers 9 → 9 (BURST out, MIDPOINT in) **plus one seat**, exactly as she states. A reader counting table rows sees 10; the qualification is stated in the text and should survive into any ballot |

Two further "unchanged" rows lose specifying text the base carried: **RELEASE** drops *"— parent criteria tables vs `tasks.md` vs shipped source"* and **STRAGGLER** drops *"— did every enumerated site get applied."* Same class as the LIVENESS omission, lower stakes. **Contest is narrow and entirely drafting: if this table replaces § 1.4, it must be a superset of § 1.4's binding text, not a compression of it.** Restoring four clauses resolves it; no delta changes.

**(e) MIDPOINT for ≥ 3-unit specs. COUNTERSIGN, and I accept the authoring-side duty — with the block correction from (b) and one sizing correction that runs in her favour.**

I accept that **the Declared Merge Units block gains a midpoint-carrier role**, and that authoring it is my formalization surface. It is the same shape as (d6) items 2 and 3 — she asks for a convention, I author it — and the ask is proportionate: one line in a block that only large specs write. Concretely, what I take on: the units block for a spec declaring ≥ 3 units names which unit's merge carries the midpoint pass, fixed at the tasks round, never judged at merge time. **And because of (b)'s correction, the same edit should standardize the block itself** — a single canonical form (heading + table) so both CLOSEOUT's and MIDPOINT's predicates key on structure rather than on whichever phrasing a spec author chose. That is a strictly larger piece of work than she asked for and I am volunteering it, because the predicate she needs does not work reliably without it.

> **CORRECTION, and it strengthens her case.** § 5.2 E4 sizes MIDPOINT at *"~4% of the corpus by the units convention."* Measured: **3 of 153 = 2.0%** declare merge units at all, and **all three declare ≥ 3** (`119-B`: 7 units; `122`: 11; `125-B`: 9). So the reach is **half** what she claims — and the targeting is **better** than she claims, because those three specs are *exactly* the three in her own § 5.1 hole table (`125-B`, `122`, `119-B`). MIDPOINT does not approximate the measured hole; on the evidence available it **is** the measured hole. Worth stating precisely, because "~4%" invites a reader to imagine a population that does not exist, and the true figure is the stronger argument.

On **E4 over E2**: her pace-vs-progress reasoning is correct and it is the argument I did not make in C4-6. BURST fires when Peter returns; MIDPOINT fires when a declared unit merges; at a bursty pace every merge is already inside a burst, so MIDPOINT's firing window is a subset of BURST's with a named carrier instead of a heuristic. That is a real improvement, not a relabel.

**(f)/(g) Cost model and lapse-risk residuals. The honesty is adequate. Two things are understated, one materially.**

The cost model is honest where it is easiest to be dishonest: it names its single data point, labels it the expensive end, states the estimate as a range because of it, and carries the two caveats that matter — a finding uncaps the pass, and a table-reading pass costs ten minutes and is worth ten minutes. The § 6.3 cut order decided in advance (MIDPOINT → sample size → CLOSEOUT, RELEASE and SYMPTOM untouchable) is the right discipline and it is decided *before* the pressure rather than under it.

On **(g)**: **R1 is genuinely unchanged and she is right to refuse to call it reduced.** RELEASE has no owed-set because a release leaves no artifact behind saying a pass is owed — that asymmetry is structural, not an oversight, and it is the trigger that maps to actual consumer harm. My own § 4.2 worst case was about RELEASE specifically, and nothing in this amendment touches it. Her decision **not** to propose a release-delta owed-set here — on the ground that she will not grow the amendment's surface on the day she argues it should stay small — is the right call and the right reason. **R2 is correctly sized as future-only**: all 37 stale partials are pre-ratification by construction (I verified the 37), so the residual is about future abandonments. **R3 is real** and is § T4-5.

*Understated, first (minor):* the § 7 verdict *"REDUCED — materially, on the CLOSEOUT axis — and NOT CLOSED"* is right, but the improvement it claims is contingent on the pipeline in § 6.2 rot mode 2 actually returning the correct set. Detection-by-query is only better than detection-by-recollection while the query is true. Named, not fatal.

*Understated, second (material — § T4-4):* the cost model assumes the cited commands can be **re-run**. On component parents with iOS/Android evidence that assumption does not hold, and M3 evidence spot-verification degrades to trusting the reported result on two of three platforms.

---

### T3. The two findings, the stub, and the withdrawal

**T3-1. The `writeScope` finding: CONFIRMED at the cited lines, and I endorse the cheap exit.**

`canonical/agents/stacy.md:230-232` reads exactly as she states — `.kiro/specs/**` and `docs/specs/**`, nothing more. **The proposed owner of claims audits cannot write to the corpus's own precedent home for claims-audit findings** (`.kiro/issues/`, where the 112 audit lives). That is a real mechanical gap, it is parallel to § 4.1's checker gap, and neither position nor my C4-5 corrections caught it.

**I see no reason to prefer the grant, and three reasons against it for 127.** (1) The pass record at `.kiro/specs/<spec>/completion/claims-pass.md` is inside her existing scope, adjacent to the artifacts it audits, and it is the file whose existence discharges the owed-set — the artifact has to exist there anyway, so the finding's home costs nothing extra. (2) A third scoped grant on a spec already carrying two governance-law surfaces is precisely the surface growth N5 exists to prevent; I made the same argument against the `verification.instrument_owner` schema field in C2 and it cuts identically here. (3) A routed request the receiving agent files puts the issue in the hands of the agent who will act on it, which is better routing than a file the actor did not write. **Cheap exit endorsed — with one condition, § T4-3: "routed request" must mean an actual message to a named agent, not a file left in a spec directory.**

**T3-2. The nine-word CLOSEOUT stub, self-found: COUNTERSIGN the substance — CORRECT the quotation.**

The substance is right and it is the most uncomfortable paragraph in the document for me: a one-line trigger with no firing predicate, no detection mechanism and no output form survived two independent positions and a countersignature in which I verified four *other* mechanical claims at source. **I checked what I was told to check and did not check what nobody flagged** — which is the same failure shape as the 112 escape, committed inside the document that proposes the cure. I record it against myself rather than letting her record it alone.

> **Correction, and it is the same class as my (d6) item 1 correction against her draft — attribution drift, caught by returning to the frozen source.** She writes: *"a row reading **CLOSEOUT | A spec's final unit merges | That spec's parents**."* The base row (§ 1.4, line 82) reads in full: *"**CLOSEOUT** | A spec's final unit merges | **That spec's parents; natural home for the spec-level-criteria discharge (rider (a))** | **Stacy**."* The scope cell was truncated without ellipsis and the owner cell dropped; the row is nine words only as abbreviated. **The finding survives intact** — the dropped clause supplies a *scope note*, not a firing predicate, a detection mechanism or an output form, so the stub characterization is correct on substance. But a document arguing that claims must be checkable against their source should quote its own source verbatim. **Fix: quote the row in full and let the substance carry it; the argument does not need the compression.** It is fair that this cuts both ways, and it is the second time in this pair of documents that going back to the frozen text caught a quotation that flattered its own argument — once against her, once against me.

**T3-3. Her withdrawal of the "overhead" ground: COUNTERSIGN the withdrawal — and YES, something I countersigned depends on it. Here is exactly what, and why the rejection survives anyway.**

She asks directly whether anything I countersigned rests on the withdrawn ground. It does, and it is her own table's line: **base § 1.4's rejection note reads *"Rejected as triggers, jointly: unit merge as an audit trigger (**it is the overhead Stacy's charter names as her own bias**, and it arrives before evidence is stable)."*** I countersigned that table. Overhead is the **first** of the two grounds stated there, and she is now withdrawing it as weak by her own standard.

**The rejection survives, and is stronger than it was.** The second stated ground (premature evidence — a later unit can legitimately deliver a prior unit's promised artifact) is untouched; I countersigned it separately at (d2) as *"a live constraint my position did not state,"* and it is the ground that forces `promised-artifact-shipped` off the per-PR grain in § 4.4. Three new grounds are added. So the correct disposition, stated so a ballot editor does not inherit a dead clause: **base § 1.4's parenthetical is superseded by § 3's table.** The overhead clause should not be quoted forward as a joint ground.

**Her withdrawal is right on its own terms and I would have had to make the argument if she had not.** Her position's § 1 rejects *load* as a basis for structural decisions — load is reversible, charters are sticky — and the base agreement adopts that as the reason the cut rests on separation of duties rather than on FOR-3. Leading the merge-path rejection with an overhead argument was the same error one document over. Withdrawing it costs her the easiest argument she had.

**The co-signer argument: COUNTERSIGN, and it is the structural heart — she is right that it is load-bearing and right that neither of us stated it.** If she approves at the merge, her later audit of that unit audits her own approval. That is **self-attestation**, and it is the *identical* argument that kept the LIVENESS meta-item off her command in friction (c) — the resolution I countersigned there against my own stated lean. Applying it to the merge path is not an extension by analogy; it is the same principle reaching a second surface, and the base agreement is incoherent without it: friction (c) rejects self-attestation for the liveness *reading* while § 1.4 rejected the merge-path seat on overhead and evidence-timing, i.e. on weaker grounds than the one already ratified elsewhere in the same document.

The test that makes it structural: **even with infinite availability and zero overhead cost, a merge-path seat is still wrong** — because it destroys the property the transfer exists to create. The audit's entire authority comes from sitting downstream of acceptance and being unentangled with it. The other three grounds (serialization, rubber-stamp decay, overhead) all fail that test: each is defeated by "but Stacy is always available now" or "but she is fast." The co-signer argument is not. **This is the ground the ballot text should carry**, and I hold it at the same strength she does.

**T3-4. On BURST's retirement, one thing I add rather than contest.** Her counter-argument in § 5.3 is the right one and she states it against herself: BURST is the only trigger that fires on *nothing having happened*, and retiring it means a long quiet gap fires nothing at all — F-C's "owner wasn't in the room" in its purest form. My C4-6 evidence cuts against BURST but does not answer that. **The honest position: the swap is right and the gap it opens is real, and the reason I am comfortable is not that BURST covered it — it is that LIVENESS now reads a persistent owed-set rather than a memory.** A quiet corpus with a non-empty owed-set produces a finding at the next health check whether or not anyone was in the room. That is the actual replacement for BURST's fires-on-nothing property, it did not exist before this amendment, and it should be stated as the reason BURST is safe to drop rather than leaving the trade resting on C4-6 alone. **I do not object if Peter keeps BURST as a suspendable backstop; I do not recommend it.**

**T3-5. § 9's three contests: none of them reads as scope-seeking under cover of rigor, and I went looking.** § 9.1 falsifies a premise that, left standing, would have made her *own* case easier — "specs close reliably" is the friendlier claim for someone arguing CLOSEOUT largely closes the lapse risk, and she killed it with her own data and downgraded her own § 7 verdict as a result. § 9.3 concedes the definition and then argues her own position is the more dangerous one. § 9.2 is the only contest that adds scope (MIDPOINT), and it arrives paid for — BURST retired, net trigger count unchanged, with E1 named as the honest fallback she would accept. **A party seeking scope does not volunteer the cut order in advance (§ 6.3), name its own rot modes (§ 6.2), or price its proposal against a single data point while calling that point the expensive end.** The declared-conflict paragraph at § 0 is not decoration; the document behaves the way it says it will.

---

### T4. My § 5 additions — risks these resolutions create that the draft does not carry

Gaps, not disagreements. Each attaches to a resolution I countersigned.

**T4-1. A cross-surface numerator inconsistency between this amendment and the outline — and the outline is the one that is wrong.** This is content consistency, which is my layer, and I found it by re-running her scan two ways.

- This amendment (§ 2.2): **39** specs partially ticked.
- The outline (§ 6.2, incorporated at R1 from her own B6 and heading to a ballot): **36** specs *"currently carry both ticked and unticked parent tasks."*

Both numbers are correct **under their own recipes**, and neither document states the recipe difference. The outline's recipe (`feedback/design-outline.md:317` — `^- [x] N.` ∧ `^- [ ] N.`) requires a bare digit after the checkbox and therefore **excludes bold-numbered parents** (`- [x] **1. …**`). Measured delta = exactly three specs: `054a-figma-token-push`, `054b-figma-design-extract`, and — **`125-A-pr-gate-mechanical-arming`**.

**The consequence is sharp enough to fix before the ballot.** The outline's § 6.2 in-flight population **cannot see 125-A**, which is the exemplar both documents lean on hardest — B4's "exit door" spec, this amendment's Exhibit 1, and the spec that armed the gate 127 extends. Under its own intended meaning ("specs currently carrying both ticked and unticked parent tasks") **36 is an undercount and 39 is right**; the exclusion is a markdown-formatting artifact, not a real distinction. Neither figure is fabricated and neither party erred in reasoning — but a ballot is a record, both numbers will be quoted, and they currently disagree by three on the same population.

**Recommendation (tasks/ballot phase, and it is mine to route since it lands on the outline):** restate the outline's § 6.2 population as **39**, with the recipe stated in one clause, and note that 125-A is in it. If Peter prefers the narrower recipe, then it must be stated as narrower *and* the fact that it excludes 125-A must be stated with it — an unstated exclusion of your own exemplar is the failure mode this spec is about. I am flagging, not resolving: § 6.2's population is the outline's, and I will not quietly restate a number that a blocking R1 item produced.

**T4-2. The owed-set's third conjunct presumes an answer to § 6.2 that Peter has not given — and the pass and the rule may not want the same boundary.** § 2.3's predicate requires the final unit's merge to be *"dated on or after the ballot's ratification date,"* citing *"the § 6.2 in-flight boundary."* But § 6.2 is **open**, and its options do not share a date anchor: option (ii) binds on **`tasks.md` authorship** date, not merge date; option (iii) binds broadly with a readable exemption. Under (ii) a spec whose `tasks.md` predates ratification but whose final unit merges after would be **exempt from the rule yet owed a pass** under this predicate.

**The deeper point, and I think it favours decoupling them:** CLOSEOUT's value is the **judgment residual** — M3 evidence quality, forced-negative adoption, promised-vs-shipped gaps. **None of that depends on the new criteria-table law.** It works on completion docs as they exist today. So the pass can coherently be owed on a *wider* set than the rule binds, and tying the owed-set to the rule's ratification boundary imports a restriction it does not need. **Recommendation: state the owed-set's date conjunct as its own decision at the tasks phase, decoupled from § 6.2, and say which way it goes.** Related edge, cheap to name: a **dormant spec that wakes** and merges a final unit post-ratification becomes owed a pass over parents merged long before — a cost (an oversized pass), not a lapse, and the § 6.3 cut order handles it.

**T4-3. Ada's R1 routing ask is answered by the cheap exit only if "routed request" means a message.** Ada raised this in the R1 round (`feedback/design-outline.md:343`): when a RELEASE/SYMPTOM/**CLOSEOUT** audit finds *her own* completion doc misrepresented what shipped, does that come back to her directly, or only via EDUCATION's N ≥ 3 threshold? She is right that waiting for N ≥ 3 is the wrong latency for a single-instance finding on one's own work, and right that the base trigger table was not built with the audited domain agent's inbox in mind.

§ 2.5's exit (1) — findings live in `claims-pass.md`, routed items travel as a routed request the receiving agent files — **satisfies her ask by construction, and the amendment does not say so.** It should, because the same sentence contains the failure mode: a "routed request" that is only a section in a file inside `.kiro/specs/<spec>/completion/` is a finding sitting in a directory the domain agent has no reason to open. **Addition: the pass record is the finding's home; routing is an explicit message to the named agent. Content remediation routes to the authoring domain agent directly (Ada's own doc is Ada's to correct); pattern-level education routes to me at EDUCATION's threshold. Two routes, not one.** This also keeps the Civitas three-layer boundary intact — content correctness never becomes mine.

**T4-4. M3 evidence spot-verification is not uniformly available across platforms, and the cost model assumes it is.** Lina raised the adjacent form of this at R1 (`feedback/design-outline.md:361`): if Evidence is "command + result," re-running it is reachable for web (Jest) and not obviously reachable for iOS/Android (`xcodebuild`, `gradle`). § 2.4's M3 step is *"open the cited artifact, run the cited command"* and § 6.1 prices the pass at ~10–20 min per parent on that basis.

**Consequence the draft does not carry: on component parents with platform-toolchain evidence, M3 degrades from verification to trusting the reported result on two of three platforms** — which is the doc-vs-doc audit her own N6 called *"a worse outcome than no change."* This is not a reason to narrow CLOSEOUT; it is a reason the Method line has to be honest about it. **Addition: the named-sample Method line records platform-unverifiable rows as `not re-verified — toolchain unavailable`, explicitly, rather than omitting them.** A pass that silently samples only the re-runnable rows reports a coverage it does not have. Cheap to state, and it converts a hidden limit into a visible one — the same medicine § 2.5 already applies to the pass as a whole.

**T4-5. The prose-pipeline promotion trigger has no detector — it asks someone to notice a wrong answer.** § 6.2 rot mode 2 promotes the owed-set pipeline to a committed script *"the second time the pipeline returns a wrong owed-set."* **Who notices?** If the pipeline silently omits a spec — units-block format drifts, a heading is worded differently (**exactly the § T2-b `122` case, which is live today, not hypothetical**) — the query returns a short list, the short list looks empty-ish and healthy, and neither of us sees the omission. That is `check_state: dormant` in prose form, which is the rot mode she correctly names, and the trigger she attaches to it depends on detecting the thing the rot mode makes undetectable. It is the same recollection-vs-query problem one level down, and R3 in § 7 understates it by calling it *"a named promotion trigger rather than a guarantee"* — a trigger nobody can fire is not weaker than a guarantee, it is inert.

**Cheap fix, proposed rather than imposed: require the pipeline to emit its exclusions.** If it reports *"N specs closed; M excluded because no declared-units block; K excluded as pre-ratification"* alongside the owed set, a wrong answer becomes visible as a suspicious exclusion count rather than an invisible omission. That is one extra line of output, it costs nothing, it stays prose (no script, no grant), and it gives the promotion trigger something to actually fire on. **And it is a duty on me, not her** — I read the owed-set at LIVENESS, so I am the one who must read the exclusions and treat an unexplained count as a finding. Accepted on that basis.

---

### T5. Signature block

**The amendment as countersigned is ready to go to Peter — and it must go WITH the base agreement as ONE package for the Q5 ruling.** They are not separable: the amendment amends three specific parts of the agreement (§ 1.4's trigger table, § 3.3's mitigation stack, § 5.2(i)'s lapse risk), it revises two pieces of Stacy's own frozen reasoning that the agreement carries, and § T3-3 establishes that it supersedes a clause in the base table I countersigned. **A reader given only one of the two documents gets a false picture in either direction:** the agreement alone contains a nine-word stub where its most frequently-firing trigger should be; the amendment alone reads as a scope expansion without the charter cuts, frictions and non-negotiables that bound it. One package, one ruling.

One contest (§ T2-d, the replacement table dropping binding language from rows it marks unchanged — **including the "Meta-item only" bound on my own row**, which I am asking to have restored against myself), three corrections (the truncated CLOSEOUT quotation; MIDPOINT's ~4% → measured 2%, which strengthens her case; the "pre-125-A form" mislabel), and five § 5 additions — **none of which is an unresolved disagreement between the two named parties.** The contest is drafting hygiene on a table that has not been adopted; the corrections sharpen her own evidentiary claims; the additions are gaps neither of us carried, two of them surfaced by other agents' R1 items (Ada, Lina) rather than by either party. **Nothing here requires another reconciliation round before this reaches Peter.** If Peter wants the corrections folded into the body rather than carried in this section, that is a drafting pass, not a re-negotiation.

I record that I verified every mechanical claim this amendment rests on — eight of them, at T1 — and that the load-bearing one (tick-completeness fails on a quarter of the corpus, including two specs everyone considers finished) survived independent computation exactly. I also record that the amendment's central finding is **a defect in a document I countersigned**, found by its other author, and that my own T4-1 measurement turned up a second numerator problem in the outline that neither of us had seen. That is the process working the way it is supposed to, and it is the argument for reading both documents together.

**What this does not do, restated because it still governs:** this document **feeds Q5 as an input to Peter's ruling and settles nothing by itself.** Q5 is decided by **Peter's ruling**, ratified through the record-first ballot protocol (`.kiro/docs/ballots/README.md`); the charter text in the base agreement's § 1.1 remains proposed text awaiting that ruling, and every trigger, seat and duty in this amendment — LENS, CLOSEOUT, MIDPOINT, the owed-set, and the four duties I accepted above — is proposed, not adopted. Stacy is the party who gains scope under it and drafted it; I am the party who loses scope and am countersigning it. Both conflicts are declared in the frozen positions and neither is withdrawn here. **Two conflicted parties agreeing is not a decision — it is evidence for one.**

**My non-self-adjudication commitment from the joint agreement still governs and extends to this document without modification**: I will not incorporate this amendment into the design outline as settled, and **I will not self-adjudicate Q5 in the R1 feedback round** — which now includes not treating § 2.1's CLOSEOUT definition, § 5's MIDPOINT, or the § T2-d table changes as R1 incorporations. The R1 round's recorded Q5 handling note stands: all Q5 positions are carried to Peter unresolved. **Symmetrically**, and per Stacy's own R1 item 5, she should not be the one who decides that a document she co-authored replaces my Q5 framing in the outline — that recommendation (A6) is hers, conflicted by her own account, and it is Peter's to accept or decline along with everything else here.

Two items in this amendment survive a Q5 deferral and I endorse her § 10.3 reading of which: **the CLOSEOUT firing predicate and the owed-set describe the practice, not the practitioner**, and are worth adopting under any answer — the same basis as my C4-4 on the pilot. **The LENS does not survive deferral** and should not be smuggled in without a charter. I hold that line as firmly for her seat as I did for my own pilot.

*Countersigned by Thurgood, 2026-09-15, on branch `task/127-q5-lifecycle-amendment`. Stacy's sections unedited; the joint agreement, both frozen position files, and my countersignature on the joint agreement are unedited. Not committed — Peter's call on whether this round ships.*

---

*Drafted by Stacy, 2026-09-15, on branch `task/127-q5-lifecycle-amendment`. The joint agreement, both frozen position files, and the countersignature are unedited.*
