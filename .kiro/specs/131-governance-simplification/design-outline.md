# Design Outline: 131 — Governance Simplification

**Date**: 2026-10-24
**Spec**: 131-governance-simplification
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **R0 DRAFT — planning.** Nothing here is ruled. Every proposal below is for the R1 round. Execution starts only after the full spec process and after Peter's open release PRs close (§ 7).
**Priority**: after Spec 129, then 128, then 130. Peter, 2026-10-24: "Yes, immediately after 129: 129 → 131 → 128 → 130" (chat, relayed by the orchestrator; recorded in `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Walk log").
**Source**: `synthesis-2026-10-23.md` (v4.1, in this folder). It is kept as history and cited by § / F# / P# / L#, not restated. Where this outline and the synthesis differ, this outline is the current thinking.

> **Conflicts, stated.**
> - **The author wrote much of what this spec would retire.** I authored or co-drafted most of the ballots in § 3's map (synthesis F31). Retiring them lightens my seat. That pulls my judgment toward retiring them, and reviewers should read the "delivered?" cells with that in mind.
> - **Stacy specified several of these layers** (fixtures, the census reader, ARMING reads), and some of the proposed cuts are hers.
> - **Lina built the disposition modules** the signatures sit on.
> - **Every seat is one model family.** The synthesis's agreement is low-independence evidence (its § "Read this first", "Weight of this document"). The evidence that counts is the command-verified facts in its § 1.
> - **Required reviewer: Stacy.** The orchestrator also runs one charter-free outside read at R1.

---

## 1. The problem, in Peter's words

- **Concern (2026-10-23)**: we built too many layers while closing said-vs-built gaps; simplify, not slash.
- **Aim**: "I really want this project to be as self-governed and self-sustaining by the agents as possible; and many of these choices and directions to operate holistically, sustainably, thoroughly, and thoughtful have been in service of that aim."
- **The problem (2026-10-24)**: "what would governance simplification mean while sustaining, or enhancing, the outcomes that the accountability layers we aim to remove provide?"
- **Vehicle (2026-10-24)**: "If we were going to do this, I would want to do it in a spec and would consider this planning. Execution would begin after we follow spec development processes and I complete the series of open issues I'm resolving in the PRs that I've been keeping you aware of."
- **Gates (2026-10-24)**: "I'm not waiving the sequential gates. Most of the time, waiving those is how we get into situations like this, but that's a 'tomorrow problem'."

**What this spec is, then:** simplification is measured by outcomes, not by the number of layers removed. A layer can go when its outcome is sustained by something cheaper, when it is enhanced by something better, or when it is knowingly dropped for a stated reason. Where a layer never delivered its outcome, simplifying means building the replacement, not deleting and calling it a saving.

---

## 2. Settled context (pointers only)

- **Rulings already given**: synthesis § "Rulings". 16.1.0 ships under current rules through its tag (item 0a, (i)). P1's suspension scope, option (i), is a hypothetical planning input (item 1a), not a ruling to execute. No suspension record is issued outside this spec (vehicle ruling).
- **Facts**: synthesis § 1, F1–F31. The ones this outline leans on most are F3, F4, F13, F14, F17, F24 and F30.
- **The accountability tests** A1–A4: synthesis § 0. The outcome map (§ 3) checks each layer against these.
- **Not re-opened here**: L3, L5, L6, L7 and L8, which closed in round A (synthesis § 3 "Closed in round A"). L7 (vehicle = suspension record) is now superseded by the vehicle ruling: the vehicle is this spec.

---

## 3. The outcome map (PROPOSAL — the core of this outline)

**How to read it.**
- **Outcome**: what the layer was built to provide, taken from that layer's own ballot or requirement, at the § cited. Where no ballot exists, the cell says so.
- **Delivered?**: evidence from the synthesis (F#). "Unmeasured" means the synthesis has no fact either way, and R1 owes one.
- **Verdict**: **S** = sustains · **E** = enhances · **D** = knowingly dropped, with the reason · **B** = never delivered, so build the replacement.
- **Autonomy**: who acts, and the **non-model check** that verifies them. "None" is written out where there is none.

| # | Layer (synthesis ref) | Outcome it was built for (source) | Delivered? | What sustains or enhances it | Verdict | Autonomy: who acts / non-model check |
|---|---|---|---|---|---|---|
| 1 | Consumer-profile signatures and C1 routing (P1, P5) | Shipped agents re-grounded on the consumer's repo, "a capability rather than an imposter"; signed by the owning seat; "assent should cost at least as much as refusal" (Spec 123 `requirements.md` Req 11 user story; 11.5.2; 11.5.4; 11.5.6 VALVE 2) | **No, as measured**: 364 signatures, 0 refusals, 258 `surviving: []` (F3). 11.5.6 predicted this itself: per-row signing "holds syntactically and fails attentionally" | P10b: owners read only the rendered paths that changed, and record what they **found**. P10a: a consumer that actually runs the re-grounded agents | **E**, if P10b's found-items rule holds; per-row assent **D** | Owners of changed paths / CI prints the changed rendered paths; the consumer session exercises the agents |
| 2 | Signing chain: `verify-signing-chain`, fixtures, routes floor, hold act, link 4 (P1, P5) | "Assurance that the seat whose signature appears is the seat that signed"; threat model: error and shortcut, not forgery (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 1, "The threat model, in proportion") | **Mostly against its own shape**: about 6 signing-shape ballots in 22 days, none from shipped bytes (F21); #445 read `record absent 20` from a format slip (`2026-10-23-link4-candidate-first-sha-after-commit.md` § 1) | Nothing needed once row 1's signatures go: the chain protects a record that no longer exists. The honest-error class it also caught (a seat editing outside its box) moves to row 7 | **D** — the outcome is moot without row 1 | n/a |
| 3 | Confirmation-hash freshness sweep inside `runGuard` (P1; F6) | A consumer-shipped operative item never changes silently after its owner confirmed it (Spec 123 `design.md` C16; Req 11.6.5d; signing ballot § 4.1, F11) | **Unmeasured** for real drift caught. Its known cost: volatile metadata in signed units made the health check red the gate (`2026-10-17-no-volatile-metadata-in-signed-units.md` § 1) | P10b | **Fork F-3** (§ 6) | Owners / the CI path diff |
| 4 | Edit-kind lines (P1) | Whether a governance edit needs a ballot is "decidable without consulting the author" (`2026-10-18-governance-edit-kinds.md` § 1, "The rot mode") | **Unmeasured** | P1 keeps "a LAW edit cites its ballot" | **S** for LAW; the EXECUTION/CORRECTION distinction **D**, and the undecidability it closed returns | Author / git: the cited ballot exists and reads RATIFIED. No check for the kind |
| 5 | Delegated-tier line and its audit (P1) | End the ambiguity of silence between "plan held" and "divergence unrecorded"; feed tier recalibration (`2026-09-19-delegated-tier-capture.md` §§ 1, 4) | **Partly**: lines are present, but the ballot's own § 4 says a false `plan held` cannot be detected. Use for recalibration is **unmeasured** | Nothing proposed | **D**, unless R1 shows recalibration consumed the lines | n/a |
| 6 | Consulted-line presence count (P1) | Options reach Peter vetted by their owners; four skipped consults in one day each changed the plan (`2026-09-28-orchestrator-consult-first.md` § 1) | **The behaviour persists**: the synthesis consulted five seats and ran a cross-read. Whether the count adds anything is unmeasured | The consult rule stays; only the count goes | **S** (the behaviour); the count **D** | Orchestrator / none. Knowingly |
| 7 | Write-scope grants: tasks-row grant, issue-row grants (README rule 8), their ARMING reads, the grant-activation query (P1) | **Two outcomes, not one.** (a) Enablement: seats can do the work they are seated for instead of declining it (`2026-09-26-tasks-row-write-scope-grant.md` § 1; `2026-09-27-ci-regime-standing-scope.md` § 1, "the owner may not touch what he owns"). (b) Decidable reads of `.github/**` changes (`2026-10-20-grant-ci-deletions-and-activating-merge-read.md` § 1) | (a) **Yes.** (b) **Partly**; and the out-of-scope class recurred four times, once through a Peter merge (MP-2, F30) | (a) **Only if the charters' "treat paths outside this set as read-only" clause changes in the same unit.** Otherwise retiring the grants brings back the refusals of 2026-09-27. P7's OWNERS file is the likely home. (b) A computed owners/touch report (L2, § 6) | (a) **S** only if done together; (b) **B** | Seats / OWNERS file vs the changed paths, printed in CI. The `Agent:` trailer is still typed text (L2) |
| 8 | Instrument census at draft (P1) | No hand count is ratified where the instrument can compute it (`2026-10-19-instrument-census-at-draft.md` § 1, "The class this rule closes") | **Its one real catch came from a stop condition, before the full rule** (F22) | P1's one sentence: run it, don't hand-count it | **S**; the census mode, register field and reader **D** | Drafter / the instrument itself |
| 9 | Subtask completion docs, S-4 (P1) | Application-time adaptations get recorded (the loss in 127 Task 1) (`2026-09-19-completion-audit-standards-package.md` § S-4) | **Unmeasured** | A one-line adaptations entry in the parent doc, checkable at a sha (L6, closed) | **S** | Author / proposed: the parity checker reports the entry's presence |
| 10 | Claims-pass shape: MIDPOINT optional, ARMING narrowed, records under about 3k words (P6) | Claims match what shipped (A1); RELEASE and SYMPTOM non-negotiable (`2026-09-17-spec-127-outline-settle.md` § 11.4) | **For packaging and text, yes**: they ran things (F14). **For behaviour, never**: no compiler or browser (F13) | P4's fixture covers behaviour; the pack-diff runs before the tag (F27) | **E**, once P4 exists. Until then the blind spot is unchanged, and it is stated in each pass | Stacy / pack-diff and fixture results |
| 11 | EDUCATION route (P6; F29) | The docs stop teaching the wrong thing (127 settle § 11.4, EDUCATION row) | **Yes**, and it is a growth engine (F29) | It defaults to deleting or narrowing a rule | **S**, with growth bounded | Thurgood / none |
| 12 | Instruments block → an evidence-command column (P7) | No parent starts with criteria whose evidence doesn't exist (`2026-09-28-parent-instrument-existence-check.md` § 1) | **Unmeasured** since ratification | The column's commands are run at branch cut | **S**, if run rather than read | PRIMARY / the commands' exit codes |
| 13 | Issues README, 12 rules → about 5 (P7) | A3: problems are recorded, routed, and read when their event fires (`2026-10-18-obligation-drain-and-release-falsity-floor.md` § 1; `2026-10-20-manual-records-routed-readers.md` § 1) | **Partly.** A3 failed inside one seat under these rules (F17). P0/P1 ages run to 2026-06-24 (F16) | A filing rule with an owner and a trigger; `issues-owned.sh`; the oldest-P0/P1-age signal (§ 5, metric 4) | **E**, if the age signal triggers action; otherwise **S** at lower cost | Owners / the age query |
| 14 | Register → a table (P7) | Each rule's enforcement owner is decided and addressable (`.kiro/specs/125-B-classification-map/requirements.md` Req 1) | **Yes** | The same content in a table | **S** | Thurgood / `audit:coverage-map` |
| 15 | Charters rewritten around duties; six-roots scope moved to an OWNERS file (P7) | Charters state the scope practice uses (`2026-10-17-standing-write-scope-six-roots.md` § 1) | **Yes**, as of that ballot | One OWNERS file, rendered into the charters | **S** | Generator / diff-guard |
| 16 | Record-first ratification, shortened (P7) | A2: authority is a committed record (`.kiro/docs/ballots/README.md` § "The Ratification Protocol") | **Yes** | Kept; shorter text | **S** | Ratifying session / git |
| 17 | Process law in the shipped and served corpus (P8) | Consumer agents get content about their own repo: "law I cannot follow does not arrive as always-loaded context" (Spec 123 Req 12 user story) | **No**: 84 `governance/` docs ship, and process law outweighs the domain docs (F15) | Move process law out; a short always-set authored by the consumer | **B** | Leonardo, Ada, Lina / the pack listing |
| 18 | Ada's hooks; component-token approval (P9) | No autonomous token creation (Core Goals § "Token Governance"; **no ballot**) | Hooks: **no** — they enforce nothing (F23). Creation review: **yes** | Creation review stays via the PR gate | Hooks **D**; review **S** | Peter / validators check fit, not need (Ada) |
| 19 | Readiness claims (P2) | A consumer knows what they can use, per platform (**no ballot**: the schema `readiness` fields and `Component-Readiness-Status.md`) | **No**: three disagreeing answers (F11); native "scaffold" only because of a pattern miss (F12) | Evidence per platform: `compiles`, `contractEvidence`, generated `knownDefects` | **B** | Lina / compile-lane results, generated fields |
| 20 | Peter's sample of Stacy-signed acts (signing ballot § 5.3) | An independent check on the verifier's own acts | **Never performed**: 0/297, then 0/309 (F4) | L4 (§ 6) | **B** or **D**: Peter's call | Peter / none |

**What the map shows, in four lines.**
- Five rows were **never delivered** (1 as measured, 17, 19, 20, and row 7's (b)). Simplifying them means building their replacements: P10b, P8, P2 and a touch report.
- Rows 2, 5, 18 (hooks) and the apparatus in row 8 are **true deletions**. Each one's outcome is moot, unmeasured, or already covered.
- Row 7 is the trap: **the grants were built to enable work, not to police it.** Deleting them alone brings back the refusals.
- **Nothing in the map covers new defect classes.** Only use does that (synthesis § 0, thesis 3), and today use has stopped (F24). So P10a is not optional for A1, even though it is not a "layer".

---

## 4. Design principles (PROPOSAL)

**Peter's definitions (2026-10-24), verbatim:**
- **Thorough**: that all decisions have been made by a clear, informed understanding of the problem space and the dependencies a solution relies on or creates.
- **Sustainable**: the solution is scalable and elegantly manages exponential weight of load-bearing supports in the long-term
- **Holistic**: consideration for the needs stakeholders in the blast radius of a decision or solution, and that the needs of those negatively impacted are appropriately mitigated
- **Thoughtful**: multiple solutions were explored, the solutions were evaluated from an immediate, intermediate, and long-term perspective, stakeholders were consulted, dissenting options were used to better inform solutions, solutions were tested to ensure they delivered on their proposes

**Two proposed additions, for reviewers to accept or reject:**
1. **Proportionality**: how deep each definition goes scales with how irreversible the decision is and how wide its blast radius. A reversible process tweak needs a line, not a ballot.
2. **A paired check for each definition**, so that each one can be verified rather than asserted:
   - *Thorough*: each named dependency is verified. A dependency found later is recorded as a miss.
   - *Sustainable*: "does this need another mechanism to work?" A yes is the warning sign.
   - *Holistic*: the stakeholder list names consumers, Peter's time, and future agents' context.
   - *Thoughtful*: each solution names its success check up front, and the check is re-run after shipping.

**My counter to addition 2, after fold-back**: four checks per decision is itself a mechanism, which is the pattern this spec diagnoses. Proportionality (addition 1) absorbs most of that, because a small decision owes one line per check. **What survives**: the "re-run after shipping" half of *thoughtful* is a standing obligation, so it needs a home with a trigger, or it is the F20 pattern again (an instrument with no owner).

**Open for Peter, not a proposal**: whether the definitions belong in Core Goals.

---

## 5. Requirements approach, aim and metrics (PROPOSAL)

**Requirements are written as outcomes, not mechanisms.** Each requirement states an outcome (A1–A4, or one from § 3's map) and the observable evidence that it holds. Mechanisms belong to design. **Any future layer names the unmet outcome requirement it serves**, or it is not admitted. That is L1 part 1's admission rule, re-keyed to outcomes. No requirements are written in this outline.

**What "self-sustaining" requires** (from the synthesis's lens):
1. **Non-model sensors**: compilers, a browser, registry bytes, the fixture (P4).
2. **A direction feedback loop**: computed signals that trigger action without Peter (metrics 2 and 4 below).
3. **The power to prune**: deletion is easier than addition, and kept rules sunset (P10c; § 6 F-2).
4. **Explicit, bounded authority**: one OWNERS file and stated lines (synthesis § 4).
5. **An outside source of purpose**: real use and Peter's direction (P10a).

**Peter's role** shrinks to direction, identity and the independent check. It likely does not go below that, because every seat is the same model family and cannot supply independent judgment of itself (synthesis § 0, thesis 1).

**Success metrics for the aim, each paired with how it can be gamed:**

| # | Metric | Direction | How it can be gamed, and the guard |
|---|---|---|---|
| 1 | Peter's required decisions per release | ↓ | By not asking. Guard: "Open for Peter" lines are counted with their answers, and a dropped question is a finding |
| 2 | Share of claims verified by non-model checks | ↑ | By redefining "claim". Guard: the denominator is the shipped claim surfaces in row 17/19's sense, enumerated |
| 3 | Governance share of commits | ↓ | By batching governance into fewer, larger commits. Guard: measure in changed lines under `.kiro/`, `governance/` and `canonical/` as well (F1's method) |
| 4 | Age of the oldest open P0/P1 | ↓ | By re-classing records. Guard: a downgrade carries a dated reason (README rule 11's re-rule form) |
| 5 | Rules retired by agents ≥ rules added | ≥ | By splitting or merging rules. Guard: measure law in words and count required checks, not rules |

Metrics 1 and 3 can move the wrong way for a good reason: a release that needs Peter's judgment should get it. These are signals for a walk to read, not targets.

---

## 6. Open forks (attributed, unresolved)

- **F-1 · L2, the `Agent:`-trailer check.** Now likely part of an owners/touch report (row 7 (b)). *For* (Thurgood, Stacy): honest error is the realistic failure; the class recurred four times (F30), and MP-2 got through a Peter merge. *Against* (outside reader): the trailer is typed text, "apparatus, not a truth check". *Fact* (Lina): every `canonical/agents/**` edit is already Peter-merged; the check only detects ahead of his merge. Synthesis § 3 L2.
- **F-2 · § 4 boundary, where self-governance stops.** The seats converged on (b) with a deletion asymmetry, and (c) later. The counter-position no seat took: **"Peter samples deletions too."** Under (b), Peter's merge of a seat-authored deletion becomes de facto ratification, which Task-Completion-Protocol § "Completion State in the PR Flow", point 9, says a checks-only merge is not. Synthesis § 4.
- **F-3 · The freshness gap.** Keep freshness until P10b runs, or accept a gap. **Ruling 0a changes this fork.** 16.1.0 ships under current rules, so the gap is no longer at 16.1.0. It falls at the first release under the reduced regime, if P10b is still "after one release". Synthesis P1, "A gap release".
- **F-4 · L1 part 2, the word budget.** It is the only mechanical part, and it is itself a new check, in a spec arguing that growth came from additions. Synthesis § 3 L1.
- **F-5 · L1 part 3, the freeze.** It fires today on Ada's four P1s. **Does it exempt Spec 129?** Peter ranked 129 first, and Ada's objection is not answered. Synthesis § 3 L1.
- **F-6 · L4, Peter's read.** No read duty for Peter as law unless he commits to it. Still open: whether the fixture plus a scripted pack-diff covers what a human read covers (Leonardo: no; Stacy: a narrow, real 10–15 minutes; Ada: on the token tier, the compile lane replaces any human read). Synthesis § 3 L4.
- **F-7 · Unset numbers.** N for the freeze; N for P10b's sunset; N green releases before (c); the word budget's size; an acceptable regeneration time (L5). Synthesis § 5 item 8.
- **F-8 · Signatures as a partnership ritual.** Peter's personal note values agents as partners. Signatures are, among other things, each seat speaking for its own text. Is P10b's own-voice "found items" read enough of that, or does something else carry it? No seat has answered.

---

## 7. Dependencies

- **Spec 129 owns the compile lane and the platform harness** (its first task: `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3, item 1). 131 depends on it and does not build it. Rows 10 and 19 of § 3 cannot reach **E** or close **B** until it exists.
- **Open question: who owns the consumer fixture, and where does it live (129 or 131)?** P4's owner seat is unnamed (synthesis P4, "Survives"), which is the F20 pattern. This goes to the R1 round, with Kenya and Data on its native half.
- **Peter's open PRs and 16.1.0.** At last check #450 and #453 were open. 131's execution waits for them, and 16.1.0 ships under current rules (ruling 0a).
- **No suspension record is issued outside this spec** (vehicle ruling).
- **Spec 123 requirement amendments**: removing the signatures (rows 1–2) amends Req 11.5 and VALVE-1 (F19). That is a law change, and it is Peter's to ratify.

---

## 8. Tasks phase: an idea, noted only

**The first merge unit is pure deletion, effective at its merge.** Two cautions from the map, for the tasks round to settle:
- **"Pure deletion" needs a definition.** Row 3's freshness removal is a code change in `runGuard` (F6), in Lina's scope. Row 7's grants cannot go without changing the charters' read-only clause in the same unit.
- **Deletions with no replacement go first** (rows 2, 5, the hooks in 18, and row 8's apparatus). Deletions whose outcome needs a replacement (rows 1, 3 and 20) wait for that replacement, or carry an explicit **D** ruled by Peter.

No tasks are planned here.

---

## 9. Counter-argument (fold-back applied)

**The strongest counter**: this outline is itself governance work — a 20-row map, eight forks and five metrics — in a spec about too much governance, while native output does not compile (F8). The cheapest act with the most outcome is still P3's fixes plus P4's compile lane, and those are 129's.

**What fold-back changed**: the map cites the synthesis rather than restating it; requirements are deferred to outcomes; and the tasks idea makes deletions with no replacement go first, so the first unit removes weight before anything is added.

**What survives**: this spec cannot deliver its main outcome (A1 for behaviour) on its own. That outcome depends on 129's compile lane and on restoring real use (P10a), which no governance document can do. If 129 slips, 131 can only delete. Deleting without the replacements turns rows 1, 3 and 20 from **E** into **D**, and that is Peter's call to make knowingly, not a default.

---

## 10. Left out on purpose

- **Requirements, design and tasks**: the sequential gates hold.
- **Restating the synthesis**: § 1 facts, P1–P10 text and the § 4 options are cited, not copied.
- **The release work**: disclosure wording, Ada's parse fixes and #450's held questions (synthesis § "Rulings", item 0 scope).
