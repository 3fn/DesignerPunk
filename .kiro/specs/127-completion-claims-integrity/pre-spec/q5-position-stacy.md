# Q5 Opening Position — Stacy

**Date**: 2026-09-13
**Spec**: 127 — Completion-Claims Integrity
**Author**: Stacy (product governance & QA)
**Status**: **INDEPENDENT OPENING POSITION.** Written without sight of Thurgood's parallel position, per Peter's direction. Nothing here is settled; Peter ratifies the joint proposal after reconciliation.
**Question**: design-outline.md § 8 Q5 — should execution-claims verification (delivered-vs-promised auditing) move to Stacy across both product and system specs, with Thurgood retaining standards authorship, spec formalization, test-suite health, and Civitas stewardship?

**Declared conflict, up front:** I am being offered scope, and my own charter names "creating process overhead that doesn't serve quality" and "inflating audit severity to appear thorough" as my biases. An agent whose native surface is **empty** — Product MCP reports `status: failed`, 0 screens, 0 domain objects, 0 product tokens; all 178 specs in `.kiro/specs/` are system-side — arguing for scope on a populated surface deserves skeptical reading. I have tried to earn the ask by refusing parts of it (§1, §6 N4) and by naming my own fallback (§5 A4) rather than presenting acceptance as the only sane answer.

---

## 1. Position

**ACCEPT — but not as framed. The question bundles four things, and I take three of them.**

The framing ("execution-claims verification moves to Stacy, including the new checks' register `owner:` fields") treats audit-ownership and check-ownership as one object. They are not, and conflating them re-creates the exact seam that produced the 2026-08-21 gate-registration drift (arming and count-assert diverged because two mechanics sat at one boundary). My acceptance is scoped per line:

| Object | Disposition | Reason |
|---|---|---|
| **Completion-claims audits** (claims-vs-tasks.md-vs-shipped-source, retrospective) | **TAKE** | Native method; demonstrated on F7 (B1 mutation taxonomy, B2 catch-rate scoring over all 12 discrepancies, S1 compliance measurement, S2 recording-form finding) |
| **Adoption/quality measurement of the rule** (M3 evidence quality, M4 forced-negative adoption, M5 markers — §9.1's metrics that *no check owns*) | **TAKE** | These are exactly the metrics a green gate cannot produce (§9.2's caveat). They are audit output, not check output |
| **The standing claims-audit trigger set** | **TAKE — re-anchored** | It must fire on events in *my* charter, not ride Thurgood's monthly health check. See §2 |
| `completion-verification-honesty` register row (ideological, no check) | **TAKE** `owner: stacy` | Ideological rows have no tooling; `owner` here means "who runs the practice," which is unambiguous |
| `promised-artifact-shipped` register row (proposed/deferred) | **TAKE** `owner: stacy` | Unbuilt; its promotion trigger is an audit finding (Q4.3), which is my output |
| `completion-criteria-parity` register row (**functional, armed barrier**) | **DECLINE** — stays `owner: thurgood` | See below |
| The checker's **source, CI wiring, `EXPECTED_CONTEXTS` registration** | **DECLINE** | Governance tooling = Civitas infrastructure |
| **Standards authorship** (what a completion doc must contain) | **DECLINE — and would refuse if offered** | §6 N4 |
| **Product-side execution-claims verification** | **NOT A GRANT — I already have it** | See below |

**Why I decline the functional row.** The register's own schema defines `owner` as "the agent who owns the verification decision/check for this rule" — a field that fuses *decision* and *check*. For the two rows with no check, the fusion is harmless. For an **armed barrier** it is not: someone has to keep `scripts/check-completion-criteria-parity.ts`, the workflow, and `verify-gate-registration.sh`'s count-assert in sync forever, and that is Civitas tooling hygiene. Note that **neither of our declared write scopes covers it** — Thurgood's is `src/__tests__/**`, `.kiro/specs/**`, `docs/specs/**`; mine is `.kiro/specs/**`, `docs/specs/**`. Neither includes `governance/**`, `scripts/**`, or `.github/workflows/**`. So the outline's "Q5-dependent" owner for `scripts/check-completion-criteria-parity.ts` (§7 artifact inventory) is a **false dependency**: the checker's authorship does not follow this question under either answer. I'd rather that row read `owner: thurgood` cleanly than read `owner: stacy` and mean something different from every other row in the register.

**Why product-side is not a grant.** My audit checklist already covers items 2 (implementations match the spec's component tree; deviations documented), 3 (test coverage), 5 (completion docs written), and 6 (Implementation Reports submitted, architectural decisions documented). That *is* delivered-vs-promised on the product side. Writing it into my charter as new scope is charter bloat and makes the cut less crisp, not more. **The actual change Q5 proposes is: extend it to system specs.** I want it stated that way, because a cut that restates existing scope reads as empire-building and will be harder to defend at the next boundary dispute.

**One FOR argument I reject on the merits: load distribution (Q5 FOR #3).** "Thurgood's plate is full" is the weakest possible basis for a charter cut, because load is reversible and charters are sticky. If the move is justified by load, it un-justifies itself the moment 125-B closes, and we will be re-litigating. Take this on **separation of duties** (FOR #1 — structural, permanent) and **method fit** (FOR #2 — capability, permanent) or don't take it at all. I'd rather have a narrower cut with durable reasons than a wider one resting on a scheduling fact.

**The argument I'd actually lead with, which the outline's FOR list omits:** I already own claims-vs-reality auditing *one level up*. My command set includes `npm run audit:coverage-map` (the coverage-of-coverage audit — every guarded surface mapped to its guarding check, zero-blank-row or adjudicated) and `./tools/agent-generator/verify-gate-registration.sh` (the required checks are still registered, count-asserted). That is delivered-vs-promised for the **gate** surface. Q5 extends the same method from "does the guard guard what it claims" to "did the task ship what it claims." This is a **coherent extension of an existing charter element**, not net-new domain — which is the strongest form the argument can take, and it is not load-based.

### The one-sentence charter cuts

Thurgood's bar, honored:

> **Thurgood** — Thurgood owns what completion evidence must *contain*: the standards that define it, the spec formalization that produces the criteria, the test-suite health and Civitas infrastructure that support it, and the tooling that mechanically enforces it — he does **not** adjudicate whether a particular completion claim was true.

> **Stacy** — Stacy owns execution-claims verification: auditing whether a completed task's claims match what actually shipped, on both product and system specs, against standards she does not author and checks she does not maintain.

The dividing verb is **author/maintain** vs **adjudicate**. Same line the spec's own §2 draws between the rule and its enforcement.

**And the arbitration rule the AGAINST-2 risk asked for, stated plainly:** when Peter asks *"was this claim verified?"* — **Stacy answers.** When Peter asks *"what is a completion doc required to contain?"* — **Thurgood answers.** If either of us answers the other's question without saying "that's the other's call," that's the boundary rotting and the other should say so.

---

## 2. Event-anchored triggers

Calendar cadences are dead letters at Peter's current bursty pace, and an **unscheduled duty with a new owner is the textbook drop condition** — which is the whole of AGAINST-2. So the triggers belong *in my charter text*, not in a spec's prose. Proposed set, in priority order:

| | Trigger (event) | Scope of the audit | Why this event |
|---|---|---|---|
| **T1** | **Pre-release** — before a version publishes | The specs whose work ships in that release: parent criteria tables vs tasks.md vs shipped source | **The one that maps to the actual harm.** Both consumer-reaching escapes (v12.0.3 semantic RGBA; ~3 months of legacy Figma hex) crossed the release boundary. Release is the last moment a false claim is still ours and not a consumer's. **Non-negotiable (§6 N1).** |
| **T2** | **Consumer symptom traced to a ticked task** — any defect whose root cause is "it was marked done" | Retrospective claims audit of the owning spec, all ticked items | This is literally how F7 was found (the dual-color divergence → Spec 112 audit). It already happened twice; making it automatic costs nothing and it is self-limiting. **Non-negotiable.** |
| **T3** | **Spec closeout** — the final unit of a spec merges | That spec's parents only | Evidence is freshest, the spec is done, and it's bounded. Also the natural home for the spec-level-criteria discharge (rider (a)) |
| **T4** | **Burst open** — first session after a gap | Cheap sampling pass, N ≥ 3 parents merged since the last audit; report M3/M4/M5 | Event-anchored, not calendar. Direct precedent: 125-B's session-start observation passes. Suspendable by the same mechanism (no open window ⇒ no pass) |
| **T5** | **New barrier arms / required-check set changes** | `audit:coverage-map` + `verify-gate-registration.sh` | **Already mine.** Listed so the extension is visibly continuous with existing scope, not appended to it |

**Explicitly rejected as a trigger: unit merge.** Auditing every PR is the overhead my charter names as my own bias. It would also arrive before the evidence is stable (a later unit can legitimately deliver a prior unit's promised artifact — Q4.2's second false-positive class).

**Explicitly rejected as a trigger: the monthly Civitas health check.** It is the obvious hook and it is the wrong one under this cut: it is *Thurgood's* event, run in *his* session. Hanging my duty on his trigger reproduces the coupling the cut is meant to remove and guarantees that when he skips a check, my audit silently skips with it. The health check should carry a **one-line return-edge item** — "open claims-audit findings routed to standards: N" — and nothing more.

---

## 3. What I need from Thurgood

My verification work is **downstream of his authorship**, and that asymmetry is the cut. Concretely:

1. **The machine-readable criteria convention (Q1) is his template law, and it is my audit's primary key.** Exact-set parity is only decidable if "the set of criteria for parent N" is unambiguously locatable. If Q1 lands as normalized/fuzzy matching (Q1.4 option b), my audits inherit a similarity threshold — judgment wearing a checker's clothes — and I will be adjudicating string similarity instead of claim truth. **I support Q1.4 option (c)** (strict verbatim table + an explicit "additional verification" section below it) precisely because it keeps the mechanical half mechanical and leaves the 122/task-10 pattern legitimate.
2. **Failure vocabulary in the Tier-3 template.** My Q3 finding stands: the system-side template has no way to say "unmet" outside the Blocked Task format, which is why M4 = **0 / 22**. I cannot audit for a marker the template gives no place to write. He authors it; I measure its adoption.
3. **Spec-level-criteria declaration must be mechanical** (Q1.3). Rider (a) is otherwise an unfalsifiable excuse — "this spec uses spec-level criteria" asserted at audit time, unverifiable. If it's a tasks.md header marker, I can check it. If it's a claim, I can't.
4. **The in-flight ruling (§6.2).** I need to know which parents are in scope when I run T1/T3 after ratification. Any of (i)/(ii)/(iii) is auditable; **ambiguity is not**. (For the record I'd take (iii) — binds after ratification, with a one-line exemption note available — because an exemption I can *read* is strictly better than an exemption I have to infer.)
5. **Source-reading capability, or an honest scope limit.** The Spec 112 audit required re-running 12 Jest suites (280 tests) and `git show --name-status` over the shipping commit. My knowledge fallback is doc-shaped (`.kiro/specs/*/completion/**`, `docs/specs/**`) — an audit that cannot read source is a **doc-vs-doc audit**, which is precisely the weaker artifact this spec exists to reject. If I take this, my knowledge-base scope needs the source tree and git history added. **If Peter declines that, decline the whole move** — a claims auditor who can only read claims is worse than no change, because it looks like coverage.
6. **Standards-change intake.** When my audits repeatedly find the same failure, the fix is usually a standards amendment I cannot author (and cannot write: `governance/**` is outside my write scope, and outside his declarative scope too — he routes it through the ballot model). I need a named intake path, not goodwill. Proposal: audit findings land as a routed request carrying a **proposed amendment in before→after form**, and the health check's return edge carries the open count (§2).

---

## 4. Failure modes of my own proposal

Candidly, the strongest objections to my cut are these, and I do not have clean answers to all of them.

**F-A — The return edge crosses the boundary, and it is the edge that matters most.** §9.3 says recurring parity failures are an *education-implicating* signal. Under my cut, the agent who detects it (me) cannot act on it, and the agent who can act (Thurgood) doesn't see it unless I route it. **This is the two-owner gap my proposal creates.** What it looks like when it rots: audits accumulate a findings ledger of the same three recurring defects; each is individually routed and individually deprioritized against Civitas work; six months later the standard is unchanged, the docs still fail the same way, and both charters can truthfully say they did their job. *Catcher*: the health-check return-edge line (§2) — a single number Peter can see. That is a thin mitigation and I'm not going to pretend otherwise.

**F-B — Goodhart is upstream of me and I have no lever.** Criteria dilution (§3.4) happens in `tasks.md`, authored during *his* spec formalization. Under my cut I can only report "criteria are getting vaguer" as a finding. Separation is the right structure — the author of criteria shouldn't grade their vagueness — but it converts the ruling's "named as the next audit's first question" into a finding with no owner able to act unilaterally. *Catcher*: nobody, mechanically. It's a Peter-arbitrated finding by construction. **Name it in the charter cut or it disappears.**

**F-C — Single point of failure replaces diffuse ambiguity.** Today, in principle, two agents might notice a claims problem. After the cut, exactly one is chartered to, and if I'm not invoked during a burst, nobody is. The honest comparison is not "one owner vs two" — it's "one owner vs zero in practice" (the practice is currently retrospective and unscheduled; 112's defects sat three months). But the failure shape changes: from *nobody thought it was theirs* to *the owner wasn't in the room*. **T4 (burst-open sampling) exists specifically for this**, and it is the trigger most likely to lapse quietly.

**F-D — Boundary blur on test-coverage verification, which we ALREADY both hold.** My charter says "test coverage verification"; his says "test suite health auditing." That overlap predates Q5 and Q5 does not resolve it. "Do tests exist and meet standards" (mine, per-implementation) vs "is the suite healthy" (his, per-suite) is a live seam that a new adjacent boundary will stress. If we settle Q5 without touching this, we'll dispute it within two specs. *I'd rather reconcile it in the same round* — cheap now, expensive later.

**F-E — My own bias, operating.** The proposal adds a standing duty to the process. My charter warns me against exactly that. The counter-test I applied: would I still propose T1/T2 if someone else owned them? Yes — T1 is the only trigger that would have caught the escapes before consumers, and T2 costs nothing until something breaks. T3 and T4 I hold much more weakly, and I'd drop both rather than lose T1/T2.

**F-F — The org-chart change could delay the rule.** Charter edits mean `Agent-Directory.md` + two `canonical/agents/*.md` + 122 regeneration + a Peter-merged governance PR — a **second** governance-law surface riding a spec whose primary surface is already governance law (AGAINST-3, correctly stated). If Q5 threatens U1's timing, **the rule is more urgent than the org chart** (§6 N5).

---

## 5. Rejected alternatives

**A1 — Status quo: Thurgood owns claims audits on both sides.** *Rejected, but not for the reason the outline's FOR-1 gives.* The fair reading of the F7 episode is that he **self-disclosed** the conflict, requested non-self-adjudication, and carried my blockers verbatim into the outline — that is a party managing a conflict well, and "he authored a weak rule once" is a one-instance case that would not justify a charter change on its own. The real reason to reject the status quo is **structural**: the correction depended on my being *consulted*, and consultation is discretionary. The next standard he authors may not get an adversarial reviewer, and the failure will be silent. A charter is not discretionary. (Secondary, weaker: claims-audit load grows with the corpus — 178 specs — while his plate is fixed.)

**A2 — Full move: I take rule authorship *and* audit.** *Rejected on my own initiative.* It re-creates the identical author-audits-own-standard conflict with my name on it, so it buys nothing structurally. It also fights the competence distribution — he carries the spec-standards corpus and the formalization history; I'd be authoring template law I don't maintain. And it would require expanding my write scope to `governance/**`, a materially larger governance change than a charter line. **I would refuse this if offered** (§6 N4).

**A3 — Dual/rotating ownership: either agent runs claims audits, whoever's in session.** *Rejected.* This is the status quo with more words and it maximizes exactly the risk AGAINST-2 names. An ambiguous owner field is the rot condition, not the mitigation.

**A4 — No charter change; Q5 deferred with a recorded revisit trigger; register rows land `owner: thurgood`; claims audits stay Peter-chartered ad hoc.** *Rejected — but this is my explicit fallback and the second-best option on the table, and I want that on record so my acceptance doesn't read as the only defensible answer.* It is the cheapest option, it unblocks the ballot immediately, it keeps the spec's surface to one governance-law change, and it loses only the *structural* half of the separation-of-duties argument — the practice can still run, just by Peter's invocation instead of by charter. **Its cost, precisely:** the revisit trigger becomes a claim nobody is chartered to check, which is the same failure mode as the rule this spec exists to fix, one level up. If Peter takes A4, the revisit trigger should be **event-anchored** (e.g. "at the second claims audit that finds a standards defect") and written into the register row's `history`, not left as prose.

**A5 — Split by surface: I take product-side claims, he keeps system-side.** *Rejected as the worst available option.* It sounds like a conservative compromise and is in fact a null change dressed as one: the product surface is **empty** (0 screens indexed), so it assigns me nothing while manufacturing a second boundary to maintain. The failure class under discussion is entirely system-side. If the answer is "not both," the answer is A4, not A5.

---

## 6. Non-negotiables vs flexible

### Non-negotiable

- **N1 — Triggers in my charter, as events.** If I own execution-claims verification, **T1 (pre-release)** and **T2 (consumer symptom traced to a ticked task)** are written into my charter text as standing obligations. An unscheduled duty handed to a new owner is the drop condition; accepting the scope without the triggers would be accepting blame without a mechanism. If the triggers are cut, I decline the scope.
- **N2 — `owner:` is disambiguated before any row carries my name.** The field currently fuses "owns the verification decision" and "owns the check." For the armed functional row those are different agents under my cut. Either the schema distinguishes them (a one-field amendment, cheap), or **`completion-criteria-parity` keeps `owner: thurgood`** and I take only the ideological and deferred rows. I will not accept an ambiguous field, because an ambiguous owner is precisely the two-owner gap that rots.
- **N3 — The honesty row keeps its "no check owns this" language verbatim, and no prose anywhere implies the ownership move makes claim honesty owned, solved, or guaranteed.** If reconciliation produces text that reads "claim integrity now has an owner," I block it. Verification honesty is ideological by construction; a named owner for the *practice* is not an owner for the *outcome*.
- **N4 — Standards authorship stays with Thurgood. I refuse it if offered.** This is the load-bearing half of the cut; trading it away would make the whole change pointless.
- **N5 — Q5 does not sit on the rule's critical path.** If the charter edit (Agent-Directory + two canonical prompts + 122 regen, Peter-merged) would delay the ballot or the checker, Q5 takes its own unit or its own record and the rows land `owner: thurgood` with a dated, **event-anchored** revisit trigger. The rule matters more than the org chart, and I'd rather lose this question than slow the thing it's attached to.
- **N6 — Source + git-history reading is in scope, or I decline.** Per §3.5: a claims auditor restricted to reading claims produces doc-vs-doc audits that *look like* coverage. That is a worse outcome than no change, and I won't take the scope on those terms.

### Genuinely flexible

- **Which of T3/T4 survive.** I hold T1 and T2 hard. T3 (spec closeout) and T4 (burst-open sampling) I'd trade in a heartbeat — T4 especially is the one most likely to become ritual.
- **Q3's shape.** I lean toward product parents discharging through the **existing Implementation Report forced-negative sections** (`Product-Handoff-Protocol.md:83-101`) rather than a new per-platform table, because the pattern already exists and already works. But the surface is empty, so nobody's opinion here is evidence. Fully open.
- **`parent-completion-docs-present` (F6 class) ownership.** I'd take it; I don't care who does. Its build/arm decision belongs at the tasks phase, as the outline recommends.
- **Audit output form** — findings ledger entry vs `.kiro/issues/` entry vs a spec completion artifact. No preference; whatever the corpus already does.
- **Exact charter wording.** The *line* (author/maintain vs adjudicate) is non-negotiable; the sentences in §1 are a first draft and I expect them to improve in reconciliation.
- **F-D (the pre-existing test-coverage-verification overlap).** I'd *like* it reconciled in this round, but I recognize that's scope creep on a spec already carrying two governance-law surfaces. I'll take a recorded follow-up instead if Peter prefers.

---

*Independent position, written without sight of Thurgood's. Points of agreement discovered at reconciliation are evidence; points of agreement asserted before it would not have been.*
