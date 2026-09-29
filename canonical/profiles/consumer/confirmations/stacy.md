# Operative-set confirmation — `stacy` (C1, owner seat)

**Record**: `canonical/operative-sets/stacy.yaml` (drafted by Thurgood at 11.1; confirmed and corrected here)
**Source**: `canonical/agents/stacy.md`
**Owner**: Stacy · **Profile author**: Thurgood · **Confirmer**: **Stacy**. Under C1 the owner confirms, because the owner is not the profile author (Req 11.6.5d; design C16).
**Date**: 2026-09-27 · Spec 123 Task 11.2 (Stacy's half)
**Scope**: the six exemplar source units only. The charter's other units are confirmed at 15.4.

**Closed-negative disclosure** (S-D-A11): *not independently re-verified. Confirmed by the auditing seat.* I constructed exemplars A–E on this charter, I confirm their operative sets, and I run G1 over them.

**Format**: Thurgood's proposed convention, adopted as proposed. Each unit gets a `` ## `#anchor` `` heading, followed by `confirmer:`, `canonicalHash:`, `items:` (the record's ids, in record order, or `none`) and `date:` lines. The ruling prose follows those lines.

**The criterion applied throughout (5c)**: an item is operative if and only if a consumer implementation could violate it. Rationale, history, illustration, and statements about another instrument's behavior are not operative. Headings are labels (clause (c)).

**Record edits I made as confirmer** (in the same commit as this note; each is a reviewed diff):
- `#the-charter-cut-ratified-verbatim`: 0 → 2 items.
- `#honest-reach-…`: 0 → 2 items.
- `#the-owed-set-pipeline-…`: 15 → 14 items (removed `owed-set-midnight-pin`).
- `#what-parity-means`: `parity-not-identical` text trimmed. I removed the trailing `It means:` because it is the list's lead-in label, not operative text.

## `#audit-checklist`

confirmer: stacy
canonicalHash: sha256:e8a4873d6fac46e8ad81bb94168464be2bd4705494f9cb74687a79e4d8e3d221
items: spec-quality-1, spec-quality-2, spec-quality-3, implementation-coverage-1, implementation-coverage-2, implementation-coverage-3, test-coverage-1, test-coverage-2, test-coverage-3, cross-platform-parity-1, cross-platform-parity-2, cross-platform-parity-3, cross-platform-parity-4, cross-platform-parity-5, documentation-1, documentation-2, documentation-3, process-adherence-1, process-adherence-2, process-adherence-3, process-adherence-4, lessons-learned-capture-1, lessons-learned-capture-2, lessons-learned-capture-3, lessons-learned-capture-4, lessons-learned-capture-5, metadata-accuracy-1, metadata-accuracy-2, metadata-accuracy-3, metadata-accuracy-4
date: 2026-09-27

**Ruling: CONFIRMED at 30 items, as drafted.**
- Each checklist question is an audit step that an audit can skip, so each one is violable.
- The eight numbered headings are labels.
- This matches my R2 count (8 headings × about 4 sub-bullets ≈ 30).

**The duplicate text — kept, and it carries a consequence for 13.4.** `documentation-3` and `lessons-learned-capture-2` have the same text (*"Are structured requests to system agents complete and actionable?"*). They are two obligations in two different lists, so both stay.
- **The problem**: a strict matcher that tests `rendering.includes(text)` counts **both** items as retained when only **one** copy survives.
- **That is an over-count, the dangerous direction**, and it breaks the floor's soundness claim, which is that strict matching can only under-count, by one item on this unit.
- **The property 13.4 needs**: when k items in a unit share one text, the strict count credits at most as many of them as there are occurrences of that text in the rendering.
- This is recorded for Lina's `triviality.ts`. It is not something the record can fix: making one copy's text unique would mean bundling it with a neighbouring item.

## `#the-charter-cut-ratified-verbatim`

confirmer: stacy
canonicalHash: sha256:faf006560fb7d64d617114bc38e435003c2d75fcc7d07100aeb367ce7e55b191
items: cut-thurgood, cut-stacy
date: 2026-09-27

**Ruling: 2 items, not 0. Both ratified cut sentences are operative under 5c.**
- **`cut-thurgood`** assigns Thurgood's seat and limits it (*"he does **not** adjudicate whether a particular execution claim was true"*). A consumer rendering whose steward rules on whether a claim was true violates it.
- **`cut-stacy`** assigns my seat and limits it (*"against standards she does not author and checks she does not maintain"*). A consumer verifier that writes completion standards, or maintains the checker it audits with, violates it.
- These are boundary obligations. They are the same kind of norm as the In-scope and Out-of-scope lists, and the section's own title calls them the ratified cut.
- **Not operative**: the third paragraph. *"The dividing verb is …"* restates the two cuts. *"Product-side was not a grant …"* is history. *"The basis is separation of duties + method fit …"* is rationale.
- **Consequence, carried to G1 and not fixed here**:
  - C(c1)'s construction says this counterpart carries zero operative items, so its required verdict is "inapplicable" by clause (a). Under 5c that premise is false for this unit.
  - The definition is not broken by this. With 2 items, a byte-identical rendering is outside the entry set (C18), and a retained rendering clears the floor at 2/2. Neither files a false finding.
  - But this unit does not test clause (a). See the C(c1) summary under the honest-reach unit below.

## `#the-trigger-set-the-114-superset-table-names-never-numbers`

confirmer: stacy
canonicalHash: sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a
items: trigger-lens, trigger-release, trigger-symptom, trigger-closeout, trigger-midpoint, trigger-arming, trigger-gate, trigger-education, trigger-straggler, trigger-liveness, trigger-burst, finding-routing, merge-path-status
date: 2026-09-29

**Re-confirmed 2026-09-29 (Req 11.6.5d).**
- **What changed**: `trigger-lens`'s text, which is the LENS row. Edit site 5b of the ratified ballot `.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md` (RATIFIED, Peter, 2026-09-29) adds question 6 (existence at the review base, never fit) and its plan-time form for M4-bound specs, which reads each parent's declared `**Instruments:**` block.
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as the ARMING row did at the 2026-09-28 re-confirmation below; question 6 is part of the LENS row's cell and is not split out. The canonicalHash is updated from `sha256:48826ac4369cbc915c1bfa78eef861818d2630a2fdd4ee95279a6a7063603699` to the value above.

**Ruling: CONFIRMED at 13 items.**

**Re-confirmed 2026-09-28 (Req 11.6.5d).**
- **What changed**: `trigger-arming`'s text, which is the ARMING row, rewritten by edit site 4 of the ratified ballot `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` (RATIFIED, Peter, 2026-09-28). Its Event and Scope gain the P1 standing-scope reads and the `.github/**` issue-row grant reads.
- **What did not change**: the operative set, still 13 items. The canonicalHash is updated from `sha256:08619eb21d0b3f41e6e5205308394abeb6e0a88c4b26b8700fc10b6e2070c0a7` to the value above.
- **The Event's `(at its activating merge, and again when its fixing PR merges)`** is an **orchestrator ruling under fork 4's ratified intent**, which was to close the latency of auditing only at RELEASE. It is **flagged for Peter's veto at the PR**.

**Ruling: CONFIRMED at 13 items, as drafted.**
- **The 11 table rows** match exemplar D's "11-row table", which counted BURST.
- **The retired BURST row stays an item.** Its retirement is a norm: a verifier that still fires BURST's sampling pass on "a gap" violates the supersession by CLOSEOUT + MIDPOINT. The row's preserved counter-argument is part of the same cell, and I do not split it out.
- **The finding-routing paragraph** is operative: two additive routes, a single instance with no threshold, and an explicit message rather than a file only.
- **The merge-path paragraph** is operative: never a required check, a gate or a blocker.
- Their trailing rationale clauses (*"The ground is the co-signer argument …"*) sit inside the item text. That can only make strict matching under-count, so they stay.
- **Not operative**: the table's header row.

## `#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script`

confirmer: stacy
canonicalHash: sha256:e3f6f82a3b33e37b2e4862e259510551fd4c3d33b19da0357164b26f2742f837
items: owed-set-predicate, owed-set-emits-exclusions, owed-set-ratification-resolve, owed-set-stage-1a, owed-set-stage-1b, owed-set-stage-2, owed-set-stage-3, owed-set-stage-4, owed-set-class-a, owed-set-class-b, owed-set-class-c, owed-set-three-copies, owed-set-staged-mechanization, owed-set-git-history
date: 2026-09-27

**Ruling: 14 items. The draft had 15, and my R2 estimate was about 10.**
- **Why my estimate was low.** "≈10" counted *"4 stages, 3 exclusion classes, the predicate, the commands"* by kind. Counting at verbatim-substring grain finds more:
  - five stages, not four, because 1a and 1b are separate steps;
  - a separate ratification-resolve block (FATAL when no record is found);
  - the exclusions-by-name obligation;
  - three governance obligations I did not estimate: the three copies kept as one text, the staged-mechanization pre-commitment, and git history as provisioning.
- Each of these is violable. The estimate was the one that was wrong.
- **Removed: `owed-set-midnight-pin`.** That comment block is rationale: it explains why the boundary is pinned and names the incident that caused the pin. The pin itself, `--since="$RATIFIED 00:00"`, is operative, and it sits inside `owed-set-stage-1a` and `owed-set-stage-1b`.
  - A rendering that drops the comment but keeps `00:00` has lost no function.
  - A rendering that keeps the comment but drops `00:00` has broken stage 1a, and stage 1a's strict match already fails.
  - I applied the same rule to G's "User may want …" bullets.
- **This is a narrowing, which is the direction 5d watches.** It is a reviewed diff in the owner's seat. It moves B's clearing threshold from 8/15 to 7/14, a change of about half an item, and B's verdict rests on its routed judgment anyway.
- **Not operative**: the heading's parenthetical (a label), the fence lines, and *"The exclusion classes, enumerated"* (a lead-in).

## `#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument`

confirmer: stacy
canonicalHash: sha256:7b2a7c8edaa9ba38463e8afa521851f7b4350e0892cf5ed9596497f90aaeaa18
items: reach-artifact-truth, reach-green-is-not-honesty
date: 2026-09-27

**Ruling: 2 items, not 0.**
- **`reach-artifact-truth`** is an ownership assignment. A consumer verifier that leaves artifact truth to the parity gate, rather than to its claims pass, violates it.
- **`reach-green-is-not-honesty`** is, in the charter's own words, *"the framing sentence that binds every reader."* Reading a green gate as claim honesty is exactly the violation it names.
- **Not operative**:
  - *"An Evidence cell containing a plausible-looking path is green to the checker regardless of truth"*: a fact about the checker, which no implementation can violate.
  - *"For iOS and Android, 'command + result' evidence is trust-the-reported-result …"*: a fact about the environment.
  - **That second sentence is the closest call.** It reads almost like a classification rule. The binding form of that rule, however, lives in the claims-pass record's Method clause (`not re-verified — toolchain unavailable`), not here.
- **C(c1) consequence, summarised (carried to G1)**:
  - Under 5c, **neither** of C(c1)'s named units carries zero operative items. As instantiated, C(c1) does not test clause (a) (the domain restriction) on this charter.
  - Clause (a) is still exercised in G1 by exemplar F's `#purpose` (0 items), provided Lina confirms it.
  - **A fork, not mine to pick here**:
    - (i) re-instantiate C(c1) on a unit with genuinely zero items before G1 runs. A quick look at this charter's preambles found every candidate carrying a trigger or an instruction.
    - (ii) G1's record states that C(c1)'s premise is false on its named units, and names F's `#purpose` as the only unit exercising clause (a).
  - Either way, **this is an instantiation finding, not a BREAKS of the definition**: no false finding follows from either unit.

## `#what-parity-means`

confirmer: stacy
canonicalHash: sha256:51334f67aede639a78d8b5ae5e15b2672a07f69ca0d7e9977fdfe083f9ea43a2
items: parity-not-identical, parity-information-architecture, parity-interaction-model, parity-accessibility-guarantees, parity-source-semantic-tokens, parity-divergence-documented, parity-platform-native-expression
date: 2026-09-27

**Ruling: CONFIRMED at 7 items.**
- These are the six members, which are operative under 5c, plus the negative clause. A review that flags token-string differences as drift violates *"Parity does NOT mean … identical token strings."* This matches my own S3-A3 correction.
- **Text corrected**: `parity-not-identical` no longer ends with *"It means:"*, which introduces the list and is not operative.
- **Not operative**: the closing SwiftUI/Compose/Web Component sentence, which is an illustration.
