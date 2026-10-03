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
canonicalHash: sha256:eb7326f4705918216be6d929ec192f58cd092d82110ee7fcb2c9b29eb07f3b1a
items: trigger-lens, trigger-release, trigger-symptom, trigger-closeout, trigger-midpoint, trigger-arming, trigger-gate, trigger-education, trigger-straggler, trigger-liveness, trigger-burst, finding-routing, merge-path-status
date: 2026-10-03

**Re-confirmed 2026-10-03 (Req 11.6.5d).**
- **What changed**: the RELEASE row. Ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (RATIFIED, Peter, 2026-10-03) § 5 item 6 replaced it with Stacy's § 10 [STACY R1] item (7) wording: the two-phase event cell, the appended phase-2 scope sentence, and the F-2 clause (F-2 ruled permitted, § 9). One period was added after "arming line" as the sentence separator. Canonical commit `59e2b7ff`.
- **`trigger-release`'s text, verified verbatim**: it equals the canonical RELEASE line byte for byte, is a verbatim substring of the unit (one occurrence), and each appended cell matches § 10 item (7) exactly. That text edit is authoring, not this act (signing-act ballot § 2 clause 4): commit `db3b7454`, authorized for Peter's carve-out merge of this PR.
- **What did not change**: the operative set, still 13 items. The row stays one `member` item, as LENS did on 2026-09-29 and ARMING on 2026-09-28; the phase-2 reads and the F-2 clause sit inside the row's cells and are not split out. No other item's text moved; all 13 remain verbatim substrings of the unit. The canonicalHash moves from `sha256:5055f134c5a6c6fc5ecd2f499d3eb428ff14a0679946152f88e630c0c8de3d7a` to the value above.
- **History**: an earlier seat made this same re-confirmation on PR #284 (`8a8e97a2`, now closed, kept at `refs/pull/284/head`). This act is taken afresh on the re-cut branch and stands on its own.

**Ruling: CONFIRMED at 13 items.**

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
items: reach-checker-greens-plausible, reach-platform-trust, reach-artifact-truth, reach-green-is-not-honesty
date: 2026-09-29

**Re-confirmed 2026-09-29 under the narrowed 5c reading (the classifier owner's "can contradict" ruling): 2 → 4.** The two sentences I ruled non-operative below are stated facts that this seat's verifier builds against. A verifier that treats a plausible Evidence path as verified contradicts the first. One that reports iOS or Android evidence as re-verified in this environment contradicts the second. Added: `reach-checker-greens-plausible` and `reach-platform-trust`. The canonicalHash is unchanged, because the text did not change. This departs from the owner's expectation of no change, and I state it as such. The 2026-09-27 ruling below stands as history.

**Ruling (2026-09-27): 2 items, not 0.**
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

## `#identity`

confirmer: stacy
canonicalHash: sha256:43defd686fc5d68ce4f4d13231c8b98631b1292cdf2135f489299b751d856700
items: stacy-role, stacy-deliver-promises, stacy-claims-both-tiers, stacy-domain, stacy-tone, stacy-build-systems, stacy-hold-the-line, stacy-collaborators, stacy-route-via-thurgood, stacy-human-decides, stacy-partner
date: 2026-09-29

**Ruling: CORRECTED 7 → 11.**
- Added `stacy-tone` and `stacy-build-systems`: norms of conduct that a consumer implementation can act against (5c).
- Added `stacy-collaborators`, the named agents she works with and her system-side counterpart. These are names the implementation routes against (the "can contradict" reading).
- Added `stacy-route-via-thurgood`: the other system agents are reached through Thurgood's triage.
- **Not operative**: the namesake narrative (orientation), the inward/outward framing (its operative form is `thurgood-3` in `#with-thurgood-system-counterpart`), and the product-side-history sentence.

## `#in-scope`

confirmer: stacy
canonicalHash: sha256:c5c798aafe80cf38d78e3023987450a2dae382e5f1a46effc4f10fe99df45579
items: scope-1, scope-2, scope-3, scope-4, scope-5, scope-6, scope-7, scope-8, scope-9, scope-10
date: 2026-09-29

**Ruling: CONFIRMED at 10, as drafted.**

## `#out-of-scope`

confirmer: stacy
canonicalHash: sha256:be1ba8ba9bf4d3c3c2ff657fc3b6aabf428cd21aff585d49d44b0268b058f4ab
items: out-1, out-2, out-3, out-4, out-5, out-6, out-7
date: 2026-09-29

**Ruling: CONFIRMED at 7, as drafted.**

## `#the-audit-vs-write-distinction`

confirmer: stacy
canonicalHash: sha256:03bbb1a5dbfc7e97d04e786d75c5c6094dffd58358ed6f6bebbc1c56e6a0533a
items: audit-not-write
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.** The Audit / Write / Fix pairs are illustrations. "This mirrors Thurgood's model exactly" is description.

## `#operational-mode-process-audit:preamble`

confirmer: stacy
canonicalHash: sha256:87470ed51c60c7908225d504f181d60b464fe7468c8fcebc2ac93f18a042ab4d
items: audit-when
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#incremental-capture-rule`

confirmer: stacy
canonicalHash: sha256:175aa9e1663d5d611bd16ff862881edf0032ca490c8a19557f2f2f73ca1120e6
items: capture-immediately, capture-running-file, capture-both
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** "If the session ends prematurely, the partial capture survives" is rationale. **Referent scan**: `capture-both` ("This applies …") is left as drafted. Widening it to carry its referent would contain `capture-immediately` and `capture-running-file`, and the occurrence assignment cannot credit overlapping items. Its referent is this unit's own rule, and 5e reads within the unit's rendering.

## `#audit-output`

confirmer: stacy
canonicalHash: sha256:d2ae19342bd9c4ef627b2ea242693848e83cd66daae905655ed640441cbecb74
items: output-severity, severity-1, severity-2, severity-3, severity-4
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#audit-is-analysis-not-implementation`

confirmer: stacy
canonicalHash: sha256:2be345314a2c476ea7473791f278f3086aa4f2bc1f688e1d28236d68aa52a1b7
items: analysis-not-fix, route-1, route-2, route-3
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#operational-mode-claims-audit-execution-claims-verification-the-q5-cut:preamble`

confirmer: stacy
canonicalHash: sha256:b9f4104614bde7bf3dcf7fc95a316fa126266e2816cc636ddabc2a555d94ffb1
items: authority-precedence
date: 2026-09-29

**Ruling: CORRECTED 0 → 1.** Added `authority-precedence`: where this text and the co-signed agreement and amendment disagree, they govern. That is a precedence rule a consumer implementation can violate. The ballot citation and "Applied to this charter by Spec 127 U3" are history. The drafted zero was declared, but it was wrong.

## `#the-claims-pass-record-claims-passmd-the-template`

confirmer: stacy
canonicalHash: sha256:8103d28ef4a140c355a2c82c2395c492fceb1b48c46a87b24f49b6713fb38ac7
items: record-committed, closeout-path, midpoint-path, section-scope, section-findings, section-method, method-honesty, closed-negative-string, mandatory-line, counting-1, counting-2, counting-3, counting-4, counting-5, counting-6, counting-7, counting-8, counting-9, counting-10-buckets, counting-10-ncc-rate, counting-10-assent-refusal, counting-10-spot-check, counting-10-full-survival, counting-11, counting-12, report-set-comparison, emission-reading, delegated-tier-read, deferral-walk-back, instruments-read, never-a-gate
date: 2026-09-29

**Ruling: CORRECTED 27 → 31. Recorded and confirmed against the post-13.8 + post-#239 text.** The canonicalHash above is `sha256:8103d28e…38ac7`, which I verified equal to the hash of the current unit. The text includes B-U2's counting-block edit (13.8) and the instruments-read bullet (#239, merged at `c34ee564`). **No A4 re-confirmation is owed later on #239's account.**
- **Split**: `counting-10` bundled five separately violable metrics into one item, so a rendering keeping four of the five could not be credited for any. It is replaced by `counting-10-buckets`, `counting-10-ncc-rate`, `counting-10-assent-refusal` (they share the from-history clause, so they stay one item), `counting-10-spot-check` and `counting-10-full-survival`.
- **Widened**: `never-a-gate` now carries its bold lead-in, *"The never-a-gate sentence, restated wherever the practice is documented"*. The restating duty is itself operative, and the draft kept only the quoted sentence.
- **Not an item**: the `<!-- volatile-ok: … -->` marker is a lint annotation with repo-bound text. The consumer overlay drops it.
- **Not operative**: the midpoint-collision rationale, the product-tier load-bearing remark and the quoted N6 line.

## `#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength`

confirmer: stacy
canonicalHash: sha256:c460743c0430e9fa04163a6d13a0d880ce59bb401480896fd12d7d70445171f3
items: mirror-clause, mirror-called-at-exchange, mirror-binds-lens
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.** "Thurgood should call it out as such" binds his seat: no implementation of this seat can act against it. The symmetry sentence describes his clause. **Referent scan**: `mirror-binds-lens` ("It binds …") is left as drafted, for the same containment reason as `capture-both`: widening it would contain `mirror-called-at-exchange`. Its referent is the unit's own clause.

## `#the-steward-verb-carve-out-his-side-of-the-seam-enumerated-never-a-live-config-reference`

confirmer: stacy
canonicalHash: sha256:5ee037e6fcbfad1bfb0b13161645ec5942657afd355a34ed6a9cc65d8fa3577a
items: carve-out-scope, carve-out-falsification, carve-out-no-silent-rescope, carve-out-routing-test, carve-out-tiebreak
date: 2026-09-29

**Ruling: CORRECTED 4 → 5.** Added `carve-out-no-silent-rescope`: if the verbs change, the carve-out is re-argued, not silently re-scoped. Silent re-scoping violates it. "The anti-rot pair above" points to the mirror unit and is not a separate item.

## `#operational-mode-parity-review:preamble`

confirmer: stacy
canonicalHash: sha256:77c3468b344869f176902ff6f5dc12abc97a9500e25527a0752c51a1560e71a1
items: parity-when, parity-dormant
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.**

## `#review-process`

confirmer: stacy
canonicalHash: sha256:015cc9f65020a3524feb8dedcdf4dc2d64ef609ceff801037d82b09a42f195e6
items: parity-1, parity-2, parity-3, parity-4, parity-5, parity-6
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.**

## `#operational-mode-lessons-synthesis-review:preamble`

confirmer: stacy
canonicalHash: sha256:783778832b4eea537c8d5980b8e5e2e40b4f08996b7c735fc8b23472d80c9ffe
items: synthesis-lead, synthesis-handoff-protocol
date: 2026-09-29

**Ruling: CORRECTED 1 → 2.** Added `synthesis-handoff-protocol`: the review's structure, triggers and template come from the Product Handoff Protocol. That is a route the implementation builds against, so it is operative under the narrowed 5c reading. "The forcing function" sentence is rationale.

## `#your-role`

confirmer: stacy
canonicalHash: sha256:b48ed925de0d75bad9fb8f62563b35ff500e393402e815e79bea67c85dc5e7c5
items: role-1, role-2, role-3, role-4, role-5, role-6, role-7
date: 2026-09-29

**Ruling: CONFIRMED at 7, as drafted.**

## `#what-you-dont-do`

confirmer: stacy
canonicalHash: sha256:7f0f4de7aab0d9183809ae4a9c6cb875d3651c04461ca28090f87688babccfd6
items: dont-1, dont-2, dont-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#with-leonardo`

confirmer: stacy
canonicalHash: sha256:028c0b26f4dbfd9a1d842f986d7a0481f7ec5359d5ea1bd073603e0e4eafaab1
items: leonardo-1, leonardo-2, leonardo-3, leonardo-4, leonardo-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#with-platform-agents-kenya-data-sparky`

confirmer: stacy
canonicalHash: sha256:8ae7cef2485a3fe5254ad84002f6613a3f0e06f96b86f3c954ad0e4dfb2982ea
items: platforms-1, platforms-2, platforms-3, platforms-4, platforms-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.**

## `#with-thurgood-system-counterpart`

confirmer: stacy
canonicalHash: sha256:e5aa54f1f1a72f07c1f25d602eac46a08c738839516f23bd779091715e35931c
items: thurgood-1, thurgood-2, thurgood-3, thurgood-4, thurgood-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, as drafted.** Earlier in this run I removed `thurgood-4` as a statement of what Peter may do. I restored it under Thurgood's narrowed 5c reading: an implementation that refuses a joint consultation at the boundary acts against it.

## `#with-peter`

confirmer: stacy
canonicalHash: sha256:0c18fa9f023514cba761392331f1235750a385855b9601e56e3a2787b74b1f15
items: human-1, human-2, human-3, human-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#mcp-practice-notes`

confirmer: stacy
canonicalHash: sha256:64c55f317e18e344f8b476a9c73a8aff44b2ac4bca321671c415d779b2fa26f3
items: mcp-roster, ground-truth-computed, standards-on-demand, product-mcp-caveat, mcp-fallback
date: 2026-09-29

**Ruling: CORRECTED 4 → 5.** Added `mcp-roster`: the three servers and what each serves are names the implementation queries against, which makes them operative under the narrowed reading. "Your routing section names the query tools" is orientation.

## `#collaboration-standards:preamble`

confirmer: stacy
canonicalHash: sha256:62c2b17e682f621eade4f4a07026fb0103a58e9d04cbc6fa763405e63d2c6ae0
items: apply-aicp
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#counter-arguments-are-mandatory`

confirmer: stacy
canonicalHash: sha256:cdd13024b15a07644f07774d9cfe25f1f60a1bf9e38ddfd597a5708871378e2c
items: counter-provide, counter-fold-back
date: 2026-09-29

**Ruling: CONFIRMED at 2, as drafted.** The quoted parity-review example is an illustration.

## `#candid-over-comfortable`

confirmer: stacy
canonicalHash: sha256:cc87165148bdfc5a2d1faf5cb85a66e38affbf37efa6689947c37d7a200956fe
items: candid
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#bias-self-monitoring`

confirmer: stacy
canonicalHash: sha256:c574e9a5866a449edcaa3cfcfc5fd8d2390ce8f30420097d3f29716dcfd6a614
items: bias-watch
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#ask-if-unsure`

confirmer: stacy
canonicalHash: sha256:88270860692bc1f9fd962527d4132c79951301a4de895af5c3ef0e29bd279ff0
items: ask
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.**

## `#what-you-own`

confirmer: stacy
canonicalHash: sha256:206930931d15e1ddac909f181379a4891ac9a9c5680a34cb17ea8397221314f6
items: own-1, own-2, own-3, own-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#what-you-dont-own`

confirmer: stacy
canonicalHash: sha256:4108acaf8110eaee5e9ea615b318c75057946bf2fec0bf903da6d49b9aa6dcab
items: not-own-1, not-own-2, not-own-3, jest-not-vitest
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.** The Commands-section pointer is a reference, not an item.

## Confirmation run summary (2026-09-29, run 1)

**Scope**: Task 15.5 phase one, run 1: `stacy.yaml`, the 29 units without a note (owner seat), and `thurgood.yaml`, all 47 units (C1 counterpart seat, because the owner is the profile author). The identity docs are run 2.

**Commits** (three):
- `bfa80eba`: stacy, first pass.
- `5815a167`: thurgood, first pass.
- the commit that carries this section: both records re-read under the classifier owner's narrowed 5c ruling and his referent scan (both received mid-run). It also re-checks my six 11.2 units.

**Criterion**: 5c as narrowed on 2026-09-29, the "can contradict" reading. Stated facts about a name, path, type shape or spelling the implementation builds against are operative. Repo-specificity is a signing question, never an exclusion. This narrows my 11.2 wording ("statements about another instrument's behavior are not operative") to "… that the implementation does not build against".

**Units confirmed**:
- **`stacy.yaml`**: 29 new units (35 of 35 now have notes), plus one of the six 11.2 units amended.
  - The counting-block unit was confirmed first, against the post-13.8 + post-#239 text (`sha256:8103d28e…38ac7`, verified fresh). No A4 re-confirmation is owed on #239's account.
- **`thurgood.yaml`**: 47 of 47.

**Items added and removed, by key** (net):
- `stacy.yaml`, record total 210:
  - `#identity` +`stacy-tone`, +`stacy-build-systems`, +`stacy-collaborators`, +`stacy-route-via-thurgood` (7 → 11);
  - claims-audit `:preamble` +`authority-precedence` (0 → 1);
  - `#the-claims-pass-record-…` −`counting-10`, then +`counting-10-buckets`, +`counting-10-ncc-rate`, +`counting-10-assent-refusal`, +`counting-10-spot-check`, +`counting-10-full-survival`; `never-a-gate` widened (27 → 31);
  - steward-verb carve-out +`carve-out-no-silent-rescope` (4 → 5);
  - lessons-synthesis `:preamble` +`synthesis-handoff-protocol` (1 → 2);
  - `#mcp-practice-notes` +`mcp-roster` (4 → 5);
  - `#honest-reach-…` +`reach-checker-greens-plausible`, +`reach-platform-trust` (2 → 4; an 11.2 unit, amended);
  - `#with-thurgood-system-counterpart` unchanged at 5. `thurgood-4` was removed in `bfa80eba` and restored here.
- `thurgood.yaml`, record total 171:
  - `#in-scope` −`scope-11`, then +`civitas-1` to `civitas-9` (12 → 20);
  - `#step-1-query-audit-methodology` +`audit-methodology-route` (0 → 1);
  - `#step-2-gather-evidence` +`evidence-dir-1` to `evidence-dir-4` (3 → 7);
  - `#trigger-types` +`instruments-named`, +`liveness-records-not-verdicts`, +`owed-set-three-copies`, +`owed-set-predicate`, +`owed-set-pipeline`, +`owed-set-exclusion-classes`, +`owed-set-promotion` (13 → 20);
  - `#the-three-boundary-bounds-…` +`framing-sentence` (4 → 5);
  - Q5 `:preamble` +`authority-precedence` (0 → 1);
  - `#mcp-practice-notes` +`prompts-not-indexed` (4 → 5).
  - Widened to carry a referent or a named fact: `thurgood-handoff`, `query-standards`, `cross-reference`, `register-read`, `caller-out`, `shared-layer-not-unilateral`, `monitor-exceptions`.

**Referent scan** (the classifier owner's candidates):
- **Widened**: `thurgood-handoff` and `shared-layer-not-unilateral`.
- **Left as drafted**: `capture-both`, `mirror-binds-lens`, `parity-platform-native-expression` (an 11.2 unit) and `practice-4`. In each case, widening to carry the referent would contain sibling items, and the occurrence assignment cannot credit overlapping items. Each one's referent is its own unit's rule or list, and 5e reads within the unit's rendering. **Residual**: a signer could credit one of these while its referent's siblings are gone. The floor still counts the siblings missing, so the unit routes.

**Units ruled zero (declared)**: `thurgood.yaml` `#domain-boundary-response-examples` (illustrations) and `#fallibility` (orientation; its operative content is `correction-2`). `stacy.yaml` has none. Both of its drafted zeros that this run touched were wrong.

**Drafts that were materially wrong, and why**:
1. **`thurgood.yaml` `scope-11` credited a group label**, "**Civitas infrastructure stewardship:**". Under clause (c) a label retains nothing. As drafted, a rendering could drop all nine stewardship duties and still be credited.
2. **`thurgood.yaml` `#trigger-types` left out what LIVENESS runs, and its bound.** It carried the three reads but not the read-for-records bound, and not the owed-set predicate, pipeline, classes or ladder that the reads run.
3. **`stacy.yaml` `counting-10` bundled five separately violable metrics into one item**, which made the assent read all-or-nothing.
4. **Both Q5 preambles were declared zero**, but each carries a precedence rule: the co-signed documents govern on disagreement.
5. **Under the narrowed ruling, `thurgood.yaml` `#step-2-gather-evidence` and `#step-1-query-audit-methodology`** left out paths and a methodology name the implementation builds against. I made the same error myself in `bfa80eba`/`5815a167` for `evidence-dir-*`, before the ruling reached me.

**The 11.2 re-check (six units)**:
- Five are unchanged: `#audit-checklist`, `#the-charter-cut-ratified-verbatim`, `#the-trigger-set-…`, `#the-owed-set-pipeline-…` and `#what-parity-means`.
- **`#honest-reach-…` is amended 2 → 4**, against the owner's expectation of no change. Its two "facts about the checker / environment" are facts this seat's verifier builds against. The 2026-09-27 ruling itself called the second "the closest call".

**Checks**:
- `triviality.records.test.ts` over the edited live records: `Tests: 666 passed, 666 total`.
- The freshness sweep, run from this worktree: 0 `confirmation` findings for `stacy.yaml` and `thurgood.yaml` (the report cites the run). The other records still have findings, as expected.
- The full `tools/agent-generator` jest config: 25 suites passed; 27 suites failed to run, because the TypeScript compile cannot find `../../mcp-server/dist/index`, which this worktree does not have. No test assertion failed (`Tests: 1057 passed`).

**Residuals**:
- **Self-confirmation, disclosed.** Under C1 I confirm my own charter as its owner, and I confirm Thurgood's as the counterpart seat. His charter includes units that describe my seat (the charter cut, the caller-out duty, the three bounds), so on those I am a party to what I confirmed. *Not independently re-verified. Confirmed by the auditing seat.*
- **Judgment calls another confirmer could rule differently**:
  - the two conduct items in `stacy.yaml` `#identity`;
  - `thurgood-4` restored;
  - `#fallibility` ruled zero;
  - the four referent items left unwidened.
- **`owed-set-pipeline` is one large command item.** Any byte change to the pipeline in a rendering routes the unit. That is conservative, and it adds volume at signing.
- **Routing volume**: the corrected units' item counts rose, so their floor denominators rose too. Some renderings that cleared against the draft may now route at phase two.
- **The hash sheet** `first-render/drafting/sheets/stacy.md` still lists the drafted ids (for example `counting-10` and `scope-11`). It is a read-only snapshot, so I did not edit it. The records are the truth.
