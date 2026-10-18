# Ballot Measure (B): Three kinds of governance edit — LAW, PRE-DECLARED EXECUTION, CONTENT CORRECTION

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at the ballot sitting Peter opened on 2026-10-18.
**Status**: **DRAFT** — not ratified. No edit site below is applied. **Merge = nothing; ratification is by Peter's word on the record**, committed to this file's Status line before any edit site is applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Authority for drafting**:
- the charter `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md` (§§ 1–4), from Peter's rulings (3) and (4)(b) of 2026-10-15 (recorded in `.kiro/specs/123-consumer-distribution/completion/task-28-completion.md` L16);
- release-4 rulings item 23: the sitting "also carries the governance-edit-kinds ballot (with CORRECTION widened to **'observed falsehood OR omission in instructional/descriptive text; never a change to what governance requires'**) and the normative-counterexample DRAFT".
**Sibling**: ballot A, `2026-10-18-obligation-drain-and-release-falsity-floor.md`.
**Required reviewer**: **Stacy** — § 3's claims-pass read is hers to apply, and § 6 is her text.
**Unit**: standalone record-first ballot; edits `.kiro/docs/ballots/README.md`, `governance/release-management-system.md`, `.kiro/steering/Task-Completion-Protocol.md` and `canonical/agents/stacy.md`, so **Peter merges it** under the governance carve-out.
**Severability**: §§ 2, 3a, 3b, 4 and 6 can each be struck alone; 3b reads 3a's line, so striking 3a leaves 3b reading the diff alone.

---

## 1. The gap

- **The instance** (charter, Source line): Spec 123 Task 26.5 edited `governance/DesignerPunk-Integration-Guide.md` (+4/−4) on the authority of design C8 ("U5's closeout edits it to the observed truth"). Thurgood asked whether it needed a ballot. Peter ruled **no ballot for that edit**, and ruled the class fix this ballot carries.
- **The kinds are already in use, unruled**: release-4 item 9 calls Component-Family-Button L34/L108 "correction kind, Peter-merged"; the item-8 erratum lands Sparky's caveat "as a CONTENT CORRECTION by analogy" (#377); row 28 names "a CORRECTION after the item-23 sitting" as C-3's fix home. Each was right, and none had a rule to be right against (boundary bound 1: compliant must be decidable without consulting the author).
- **The rot mode**: with no kinds, every governance edit is either a ballot (slow; queues behind sittings — W-1) or an author's judgment that none is needed (undecidable; the class that U5 met).

## 2. The three kinds (operative text)

**Law home** — `.kiro/docs/ballots/README.md`: insert a new section **between** `## Conventions` (ends L31, the "Edit discipline" bullet) **and** `## Ballots on record` (L33):

> ## When a governance edit needs a ballot — three kinds
>
> *(Ballot 2026-10-18-governance-edit-kinds.)* Every edit to `governance/**` is exactly one kind, named in the PR body (Task-Completion-Protocol § "Branch and PR Conventions"). **The kinds decide whether a ballot is needed, never who merges**: every `governance/**` PR stays Peter-merged under the carve-out.
>
> | Kind | What it is | Authority | Ratification |
> |---|---|---|---|
> | **LAW** | A change to what governance requires | a ballot | record-first ballot |
> | **PRE-DECLARED EXECUTION** | A merged design clause or a ratified ballot names the edit before it is made | the named clause | no ballot; the PR body cites the clause; the doc's owner reviews the text |
> | **CONTENT CORRECTION** | An observed falsehood **or omission** in instructional or descriptive text, with no clause naming the fix — **never a change to what governance requires** | the observation (record cited) **and a referent that is not governance text in the same PR** (the code — even if changed in the same PR —, the ratified law, or the observed behaviour the new text matches) | no ballot; the owner's fix PR, carrying a `**Consulted**:` line |
>
> **What passing establishes, and what it does not:**
> - **LAW** establishes that Peter ruled the requirement. It does not establish that the text is applied, or right in every reader's context; application is verified by the ballot's own mechanics.
> - **EXECUTION** establishes that the edit is the one the clause named, as the owner reads it. It does not establish that the clause was right, and it covers nothing beyond the named edit: excess text in the same hunk is LAW or CORRECTION and is named separately.
> - **CORRECTION** establishes that the old text was false or incomplete by the cited observation, and that the new text matches the cited referent. It establishes no requirement and changes none.
>
> **The test between CORRECTION and LAW**: a correction needs a referent that is not the PR's own governance text. If the only thing the new text agrees with is governance text written in the same PR — if a reader must now do something that nothing else already required — it is LAW. **When in doubt, LAW.**
>
> **The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").

- **Cost**: ~20 lines of law; per PR, one line per file (§ 3a). **If struck**: Task 26.5's class stays unruled.
- **Re-reading the instances under the text** (author's reading; Stacy may dispute at R1): Task 26.5 = EXECUTION (clause C8). Component-Family-Button L34/L108 = CORRECTION — its referent, Button-CTA's `contracts.yaml` v2.0.0, changed in the same PR, but it is component source, not governance text, so the test holds. #377 = outside scope (adapters, not `governance/**`; fork F-B1).

## 3. The two lines

### 3a — the PR-body line (Task-Completion-Protocol § "Branch and PR Conventions")
**Insert** after ballot A's M8 bullet (or after L121, the `Unit:` bullet, if M8 is struck):
> - **Edit kind** (ballot 2026-10-18-governance-edit-kinds): a PR whose diff touches `governance/**` carries one `**Edit kind**:` line per file — per hunk where a file's hunks differ — naming the kind and its authority: `LAW (<ballot path>)`, `EXECUTION (<clause>)`, or `CORRECTION (<observation record>; truth: <referent that is not this PR's governance text>)`.

- **[Author's addition — Stacy confirms decidability at R1]**: "one line per file, per hunk where kinds differ" is the author's reading of the charter's "every hunk names its kind"; per-hunk lines on every hunk would be decidable too, at a higher cost.
- **Identity-doc path**: as ballot A M8 — same section, so one application re-signs `#branch-and-pr-conventions` once (Stacy re-confirms the operative-set unit and re-signs the dispositions row; regeneration; lock hash disclosed). The consumer rendering is Stacy's disposition call (*unverified*: a born repo's own `governance/**` may make this line `retained`, not removed).

### 3b — the claims-pass line (charter § 2; Stacy applies)
**Where the method lives** (verified): `canonical/agents/stacy.md` § "The claims-pass record (`claims-pass.md` — the template)", the "Plus, on every pass:" list. (`docs/claims-pass-adoption.md` does not exist in this repo; it is the consumer profile's file and C-4's subject.) **Insert** a bullet between "The instruments read" (L427) and "The never-a-gate sentence" (L428):
> - **The governance-edit-kind read** *(ballot 2026-10-18-governance-edit-kinds)*: on every PR in the population whose diff touches `governance/**`, every hunk is covered by an `**Edit kind**:` line naming its kind and authority. **A hunk with neither is a finding on the authoring agent.** Counted: LAW hunks with no ratified ballot; CORRECTION hunks whose only referent is the PR's own governance text — the rot-mode count. Whether the named kind is right is your reading; whether the text is right is its owner's — **observation, not a guard**, never a gate.

- **Application** (the six-roots errata (f) precedent): a seat's own charter edit stales her signed unit, so Thurgood applies her R1-approved text byte for byte to `canonical/agents/stacy.md` and the matching `canonical/operative-sets/stacy.yaml` item; Stacy re-confirms the unit and re-signs in her own seat commit; the charter regenerates (`.claude/agents/stacy.md`, `.kiro/agents/`, the lock — hash disclosed). The consumer overlay (`canonical/profiles/consumer/stacy.overlay.md` L96–99) is her disposition call.
- **Cost**: one bullet; one re-confirm + re-sign; minutes per pass.

## 4. The trio's per-finding disposition sentence (charter § 3; a LAW change to the recipe, so it rides this ballot)

`governance/release-management-system.md` § "The Release Recipe" step 6 (L42):
- **Before**:
  > … Findings route to their owners. A regression against the recorded prior runs is a finding, not a release gate.
- **After**:
  > … Findings route to their owners. **Each release's trio record carries one disposition line per prior finding — `fixed-and-observed` / `fixed-not-observed` / `still-present`.** A regression against the recorded prior runs is a finding, not a release gate.
- The record that will carry the lines: `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`. **Cost**: one sentence; per release, one line per prior finding. Then `rebuild_index` (served doc) and `validate_metadata`.

## 5. Fork for Peter (not picked; merge = nothing; ratification by his word on the record)

- **F-B1 — the kinds' scope.** (a) `governance/**` only, as chartered; (b) also `.kiro/steering/**`, `.kiro/hooks/RELEASE-FLOW.md` and the prose of `canonical/agents/**` — every Peter-merged law path. For (b): the 16.0.0 corrections that were by analogy (#377) and C-3/C-4 sit there, and the same rot mode applies. Against (b): identity docs and charters are signed units, so every kind already costs a re-sign there; (b) adds a PR-body line to PRs that the signing chain already makes visible.

## 6. The 2026-09-27 normative-counterexample DRAFT (charter § 4)

`.kiro/docs/ballots/2026-09-27-normative-counterexample-routing.md` (DRAFT; Stacy's § 1 text; § 2 errata rule amended at her R1).

**Recommendation: ratify, with two amendments to its application section, and no change to Stacy's rule text.** (1) **Re-anchor**: the guide's blob is now `ccfbc354…`, not the drafted `acd8ea3d…`; the before-text still holds (verified: § "Authoring notes" item 3 at L349, then `### Authoring guidance — what each platform bullet verifies against` at L351), so the insertion point is unchanged. Its `Last Reviewed` bump is lawful — the guide is not a signed unit (not in `canonical/operative-sets/`). (2) **Composition lines**: under ballot B, a repair to a normative sentence in `governance/**` that a counterexample breaks is **LAW** (it changes a requirement), unless the sentence only described something, in which case it is a CORRECTION with the counterexample as its observation; under ballot A M1, the "explicit message" also files or appends a record in the same PR. Its § 1 SEPARABLE clause stays **Peter's pick**, unpicked here. **The residual**: nothing enforces either rule mechanically; whether a sentence is normative is still an edge-case judgment; and Spec 123, its origin, is closed, so the first application is in a future spec — the rule is ratified on one instance (G1 run 1, B-1). Withdrawal would leave the guide with no errata rule while every 16.0.0 record already uses dated errata (house practice, the bound-1 problem the draft names).

## 7. Counter-arguments, after fold-back

- **Folded in**: "CORRECTION is a loophole" → it needs a referent that is not the PR's own governance text; "when in doubt, LAW". "Omission widens it" → omission is bounded to instructional/descriptive text and cannot add a requirement (Peter's widening, verbatim). "Per-hunk lines are noise" → per file, per hunk only where kinds differ.
- **Surviving**:
  1. **The referent test is a judgment at the edge**: "what governance already requires" can be read wide. The claims pass catches a wrong kind only after the merge.
  2. **Kinds lower the cost of governance edits**, which is their point and their risk: more governance text will change between sittings.
  3. **The author is the steward of most governance docs**, so he will file most CORRECTIONs; Stacy's count is the only check on his readings.

## 8. Application (after ratification, exactly as ruled)

One PR with ballot A's application if both are ratified (they share the TCP section): the ballots README section; TCP bullet; Stacy's bullet (her seat commit for the signing acts); the recipe sentence; `rebuild_index`; straggler sweep `grep -rn 'governance-edit-kinds' .kiro/docs/ballots/README.md .kiro/steering/Task-Completion-Protocol.md canonical/agents/stacy.md governance/release-management-system.md` → one hit per site. No register row is proposed: the law home is single and the audit home is Stacy's charter; she may ask for one at R1. **Cost of the sitting**: shared with ballot A — three seats, one round plus the weave.

## 9. Review rounds

*(Stacy R1 follows this draft.)*

## 10. Rulings (Peter)

*(empty — and § 6's three options: ratify / amend / withdraw the 2026-09-27 DRAFT, plus its SEPARABLE pick)*

## 11. Consult ledger

- 2026-10-15: Thurgood (edit kinds, round 2 — rulings record L46); Peter's rulings (3), (4)(b).
- 2026-09-27: Stacy (the § 6 DRAFT's text and R1).
- 2026-10-18: none further before R1.
