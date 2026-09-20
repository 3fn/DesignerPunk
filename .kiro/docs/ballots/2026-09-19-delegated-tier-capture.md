# Ballot: Delegated-tier capture — unconditional, fixed-form, audited

**Date**: 2026-09-19
**Status**: **RATIFIED (Peter, 2026-09-19)** — draft reviewed in-session with the § 6 fold presented; ratification directed ("Ratify — flip it and open the PR"); **Peter's merge of this PR is the record act** (PR-atomic; no `Ratified-machine:` line, per the orchestrator ballot's stated ground: that mechanism belongs to the one ballot the checker parses)
**Author**: Thurgood (standards authorship, per the Q5 cut), with Stacy's verifier-half review recorded in § 6 before submission
**Origin**: the F15 adjudication's un-absorbed residual (2026-09-19, recorded three times: the standards-package ballot's annex, the orchestrator ballot § 9.1/§ 10, and the `owned-artifact-authorship` row's history) — *owner-named work carrying no delegated-tier note at all is silent on every surface either seat owns, because a missing note is not a false note.* Peter directed the draft in-session ("Let's go ahead and draft the delegated-tier-accuracy duty").

---

## 1. The defect this repairs, stated precisely

Task-Completion-Protocol's delegated-tier capture is **exception-based**: *"A plan that held needs no note."* That single sentence is the missing-note gap's root — under it, **silence is ambiguous between "the plan held" and "a divergence went unrecorded"**, and no audit can tell the two apart from the record. The orchestrator ballot ships an ideological rule with, by its own § 10, *"no detector, no judgment dimension, and no pre-committed escalation"*; Stacy's F15 decline named the falsifiable surface adjacent to that gap — delegated-tier accuracy — and named it **under-used** (the CLOSEOUT pilot did not audit it despite Task 1 carrying a self-recorded divergence).

The repair is the law's own proven pattern, applied a third time: **the forced negative**. The forced-negative line removed "say nothing" from the unmet-criteria option set (M4: 0/22 → 3/3 on first contact); the artifact line did the same for promised artifacts. This measure does the same for *who executed*: silence stops being a recordable state.

## 2. The rule

> Every **parent** completion doc SHALL carry, in its header block, **exactly one** `**Delegated-tier**:` line, in one of two fixed forms:
>
> - `**Delegated-tier**: plan held` — the executing agent and model tier matched the task's planned `**Agent**:` stamp, and no additional agents were pulled in.
> - `**Delegated-tier**: planned <agent> (<tier>) → actual <agent> (<tier>) — <one-line reason>; class: agent-evolution` *(or `model-evolution`, or `both`)*.
>
> **Both forms admit an optional free tail after ` — `** *(folded at Stacy's review: the bare forms were lossier than current practice on the exact dimension the line exists to feed — 127's own `plan held` lines carry tier data-points in their tails, and a grammar that forces dropping them would make the audit raise findings against the more informative doc)*. The label may carry a parenthetical annotation. The grammar, decidable by rule:
> `^\*\*Delegated-tier\*\*(?: _\([^)]*\)_)?: (?:plan held(?: — .+)?|planned .+ → actual .+ — .+; class: (?:agent-evolution|model-evolution|both)(?: — .+)?)$`
> The decidable core is the head (prefix + one of the two forms); the tail is free and preserved.
>
> A missing line, or a free-prose variant, is **non-compliant on its face**. A recorded divergence is a **data point, never a charge** — overriding a stale or rote stamp remains the correct move; the line feeds model-tier recalibration and the claims passes.

**Grain**: parent docs only, forward from ratification, no backfill (rider-(c) discipline). The S-4 subtask floor stays three elements — this measure adds nothing at subtask grain.

### 2a. The corpus run (Stacy's condition (iii) — a grammar published without a correctness run is S-5's shape)

Run at drafting, recorded: **46 corpus instances** of the string across 46 completion docs. **43 are a `## Delegated-tier capture` *section*** (the 122/125-B/119-B house form) — so this measure is a **FORMAT CHANGE from section to header line, not a tightening**, and that is its true adoption cost, stated for the ratifier. **3 are header-line form** (127's own): the folded grammar **accepts 2** (Tasks 2–3, tails preserved) and **deliberately rejects 1** (Task 1 — its class marker is mid-prose `**Class: agent-evolution**`, predating the fixed `; class:` token; forward-binding means it stays compliant under the exception-based law it was written under, and the rejection is the intended behaviour of the new grammar on the old form).

## 3. The audit duty (the verifier's half — Stacy's seat)

Every claims pass over a population containing parent docs:

1. **Presence + form** on every parent doc — a missing or free-prose line is a **finding** on the authoring agent, with the failure **split by kind** (missing line vs free-prose variant — different remedies: forgot the duty vs didn't know the form; the split is composed-loop input). **This limb is INTERIM at the judgment seat and mechanical by nature** ("exhaustive, no judgment" — the GATE-row shape): its named successor is the `completion-criteria-parity` missing/malformed-line **emission** (§ 4); once built, the pass reads its emission lines instead of performing the check — the same interim-owner pattern as `promised-artifact-exists`.
2. **Consistency verification on divergence forms** — the note checked for contradiction against the spec's declared execution routes in `tasks.md`, the parent's planned `**Agent**:` stamp, and the doc's own routing statements. **Named as what it is (folded at Stacy's review): internal-consistency verification across self-attested surfaces, NOT promised/claimed/shipped** — no independent shipped-side referent for agent identity exists in this environment (git carries zero agent attribution: merges author as Peter, commit as GitHub; co-author trailers name the session's model, never a subagent's tier; PR `Agent:` fields are self-declared by the audited party). A contradiction between self-attested surfaces is a real, falsifiable catch; agreement between them is consistency, never proof.
3. **Spot-checks on `plan held` lines** at the pass's stated sample fraction, against the same surfaces — with the **reflexive-`plan held` rate watched as the ritual-stub signal**, the same way declared-none and `adaptations: none` rates are watched. No floor on the fraction — effort spent by signal, not by rule — **conditional on the fraction being counted** (item 4), which is what makes a decaying sample visible on the face of every pass.
4. **Counted**: presence rate; the non-compliance split (missing vs free-prose); divergence rate; class split (agent- vs model-evolution); **the spot-check fraction itself** (`plan held` lines checked / total) and its outcomes.

## 4. Honest reach — what this closes, and what it deliberately does not

**Closed**: the passive case. Omission becomes visible non-compliance; a recorded divergence becomes an auditable claim. The residual named at F15 — the *missing* note — is no longer silent.

**Open, stated at ratification — two paths, not one** *(the second folded in from Stacy's review)*:

- **Active falsification**: a false `plan held` line is artifact-undetectable — `owned-artifact-authorship`'s surface, untouched here. Evading the record by this path now requires written falsification rather than mere omission — **culpability shifts; auditability does not** (a false ✅ is falsifiable against shipped source; a false `plan held` is not — the two are *inverted* on the one axis this system measures, and this ballot does not equate them).
- **Truthful compliance against an accommodating plan**: a `plan held` line that is TRUE because the plan itself was authored — or amended — to the delegated shape. No lie is told; every § 3 surface agrees, because they are all self-attested by the same author. **This path is NAMED AND UNOWNED**: it is a planning-time question, belonging to neither `owned-artifact-authorship` (not an idiom matter) nor this row (the line is accurate), and it is deliberately not assigned — a quietly widened seat is the F15 error re-run. The tasks-round LENS is the planning-time surface where it could someday live, if its holder ever accepts it; recorded as a candidate, not a routing.

The perimeter shrinks; it does not seal. Anyone reading corpus-wide `plan held` as evidence that seats are respected repeats the error Spec 127 exists to prevent.

**Mechanization, named and unproposed** (the S-package precedent): `completion-criteria-parity` already parses every parent completion doc; a missing/malformed-line **emission** (never a red — the doc-not-found shape) would cost little. It is deliberately not proposed here — a separate, registered proposal with a Stacy fixture if wanted.

## 5. Edit sites

| Site | Edit | Route |
|---|---|---|
| `.kiro/steering/Task-Completion-Protocol.md` | the Key-Rules delegated-tier bullet rewritten: exception-based → unconditional, with both fixed forms and the pointer to the guide | carve-out; identity doc, not served |
| `governance/completion-documentation-guide.md` | new § "The delegated-tier line — unconditional" (the law home: forms, grammar, rationale, honest reach) | carve-out; MCP-served → `rebuild_index` post-merge |
| `canonical/agents/stacy.md` (+ regeneration, diff-guard) | the delegated-tier read added to her claims-pass standing duties + counting block | carve-out |
| `governance/classification-map.md` | new row `delegated-tier-capture` | carve-out; served |
| `.kiro/docs/ballots/README.md` | this ballot's entry; **plus the orchestrator ballot's deferred entry, discharged here** (owed to "the next ballot-touching commit after #185 merges" per its § 8 — this is that commit) | carve-out |

## 6. Stacy's review (the verifier's half, recorded before submission)

**[STACY R1 — verifier's-half review, 2026-09-19]: DECLINE-as-worded — five changes, all foldable.** Blocking: (1) the § 2 grammar matched **0 of 46** corpus instances (falsified by command), including all three of 127's own lines, and the bare `plan held` form was **lossier than current practice on the exact dimension the line feeds** — 127's live tails carry tier data-points the grammar would force authors to drop, making the audit raise findings against the more informative doc; she also surfaced that 43/46 corpus instances are a *section*, so the measure is a **format change**, and required the grammar run over the corpus with counts recorded before ratification (S-5, one day old). (2) § 3.2's "promised/claimed/shipped" was an over-claim: **no independent shipped-side referent for agent identity exists** (git attribution evidence quoted in § 3.2 as folded) — the duty is internal-consistency verification across self-attested surfaces and must be named as such. Required: § 3.1's interim-at-the-judgment-seat status stated in § 3 with the successor named (an unstated interim becomes permanent); the spot-check **fraction** counted (freedom on the fraction is right only if the denominator is visible). Advisory, all folded: the false-✅ equivalence phrase corrected to culpability-not-auditability; the **second residual path** (truthful `plan held` against a plan authored to the delegated shape — named and left unowned); the non-compliance split (missing vs free-prose). She held the authorship boundary throughout: falsification tests stated, no replacement text drafted.

**[THURGOOD R2 — incorporation]**: all five folded verbatim into §§ 2, 2a, 3, 4 (this revision); the corpus run executed and recorded at § 2a (46 → 3 header-form → 2 accept / 1 deliberate reject); nothing declined. Her review is the reason § 2a exists — the drafted grammar shipping unrun would have been S-5's failure shape in the ballot that cites S-5.

## 7. Counter-argument on the record (AICP — the surviving residual)

Fold-back applied: the first draft made the audit verify every `plan held` line; folded down to spot-checks-at-stated-fraction after the obvious cost objection (full verification of a line that is true ~95% of the time is the unbounded-duty shape Stacy declined at F15). **What survives**: (a) a one-line unconditional duty on every parent doc is real friction multiplied by every future spec — accepted deliberately, because the line is one of two fixed strings and the alternative is the ambiguous-silence state this measure exists to end; (b) the rote-`plan held` risk is the M4-shape at a new grain — mitigated by the watched rate and spot-checks, not eliminated; (c) the residuals in § 4 survive by design — active falsification stays `owned-artifact-authorship`'s, and the accommodating-plan path is named and deliberately unowned; this measure claims the perimeter, nothing further. *(Post-review note: the strongest counter-arguments in this ballot's lifecycle came from the § 6 review, not from this section's fold-back — the residual that survived my own pass (the second evasion path) was found by the verifier, which is the Q5 division doing its work.)*

---

**Status**: **RATIFIED (Peter, 2026-09-19)** — the § 6 review folded before submission; ruled in-session; merge is the record act.
