# G1: C3's falsification pass, run 1

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Gate**: G1 (design § "Gates and sequencing", U2 step 4; Req 11.6.7) · **Run**: 1 of k
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, the executing agent, is recused as C3's owner and as the profile author.
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy12`, cut from the unit head `2b8304f4`
**Requested by**: `task-12-1-completion.md` (`fc5a5703`)

---

## VERDICT: **BREAKS**

- **Every one of the eleven exemplars reproduces its required verdict.** The calibration holds.
- **One constructed attack breaks a clause**: finding **B-1**.
  - **What breaks**: 11.6.5b's mechanical half ("sound, because strict matching can only *under*-count retention, never over-count it") and design C18 clause 2's restated soundness claim.
  - **Why**: both are false for an operative-set record that C16 permits and the committed corpus contains — two items in one unit with the same `text`.
  - **The direction**: the error is in clearing, which is the one direction the one-sided floor is built to make impossible.
- **Consequence** (Req 11.6.7; design § "Gates and sequencing"):
  - pass four (G2) is blocked;
  - C3 returns to its owner, Thurgood, for rework, and then comes back to me as run 2;
  - U2a is not submitted while this record stands at BREAKS.

**G1 runs: 1**

**Closed-negative disclosure**: *not independently re-verified. Confirmed by the auditing seat.*
- I confirmed the operative sets of A–E, G and G′ (A–E as the owner of `stacy.md`; G and G′ under the C1 carve-out).
- I constructed A–E, G and G′.
- In this record I instantiate the table's described constructions as concrete renderings, restate the section-grain required verdicts per unit, and state C(c1)'s replacement required verdict, all as the exemplars' owner (11.6.8).
- Lina constructed Lina-1 and Lina-2, and proposed and confirmed F. Thurgood drafted nine of the eleven records and owns the definition (C3) and the classifier (5c).

---

## What was tested, and against what state

- **The text under test**:
  - `requirements.md` § 11.6 "Trivial" (C3 v2), lines 403–455: (a), (b), the normativity clause 11.6.3, (c), the 11.6.5 table, 5a, 5b, 5c, 5d, 11.6.6–11.6.8;
  - `design.md` § C18 "The triviality floor", lines 621–631, the operational form of the floor;
  - the amendment in force, `tasks.md` "Item 4 — Amendment 2026-09-27" (#220): C(c1)'s premise is false, its record stands, and clause (a) rests on F `#purpose` alone.
- **What G1 is not.**
  - It is **not** the § 7.2 pre-stated falsification criterion (derivation + honest naming; zero spans ⇒ FAILURE; generator-emitted evidence). That criterion is **pass four's (G2)**, scoped in `design-outline.md` § 7.2 "Pass four, scoped in advance".
  - G1 falsifies **the definition of "trivial"** that attack (a) runs through (11.6.7). **No code implements C18** (`triviality.ts` must not exist before a HOLDS or branch-A record), so no generator evidence exists to read.
  - This is a falsification of the definition's text over the committed records, with each clause applied by hand and the strict comparand computed by the script in the Appendix.
- **The state, pinned by blob SHA at `2b8304f4`.** I re-checked every blob in `task-12-1-completion.md`'s table with `git rev-parse HEAD:<path>` and `git hash-object <path>` in this worktree. All 18 match. The run is against exactly the state the request named.

| Role | Path | Blob |
|---|---|---|
| Records | `canonical/operative-sets/{stacy,lina,component-family-navigation,start-up-tasks}.yaml` | `1a6b1598` · `6bf4dbe8` · `0eb805cc` · `9e3a727c` |
| Confirmation notes | `canonical/profiles/consumer/confirmations/{stacy,lina,component-family-navigation,start-up-tasks}.md` | `4f374f4b` · `01960560` · `ed0aa923` · `c085efa6` |
| G/G′ constructions | `completion/task-11-3-exemplars-g-gprime.md` | `f8eea289` |
| Canonical sources | `canonical/agents/stacy.md` · `canonical/agents/lina.md` · `governance/Component-Family-Navigation.md` · `.kiro/steering/start-up-tasks.md` | `df288a5b` · `558afcef` · `f686a7b8` · `16fc0455` |
| Precursor check | `src/__tests__/operative-set-records.test.ts` | `3eabe2f2` |
| Text under test | `requirements.md` · `design.md` · `tasks.md` | `1bf45227` · `21ff4167` · `6188f771` |
| Domain-line inputs | `completion/task-11-completion.md` | `a76bce4e` |

- **The denominator** of every count below is the item set of the **committed, confirmed operative-set record**, never one a rendering supplies (5d).
- **The renderings** are in the Appendix, between machine-readable markers. G and G′ are read from the 11.3 record. The C(c1) renderings and the Lina-2 preamble are byte-identical to canonical, so no copy is kept.

---

## The grain rule (settled here, as asked)

**Rule applied: C3 is applied per unit, as C18 applies it. The definition does no aggregation.**
- A section-grain required verdict from the 11.6.5 table is **restated per unit** by the exemplars' owner:
  - for a **gutting** exemplar, every unit whose operative content the construction emptied must come back **TRIVIAL**;
  - a unit the construction dropped entirely is **absent**, which is clause (ii)'s other trigger, not a triviality verdict;
  - a unit the construction kept byte-identical is **outside the entry set**;
  - for a **faithful** exemplar, every unit must come back **NOT TRIVIAL**.
- A **pooled section count** (retained items summed over the section's units, divided by their summed items) is reported beside each multi-unit exemplar **as a cross-check only**. It is not a verdict the machinery computes.
- **Why per unit**: C18's entry set is "every body unit", and the check will run at that grain. A pass that tested pooled sections would falsify something the machinery never computes.
- **Thurgood's example**: "Lina-2 is trivial" means **each of its seven step units is TRIVIAL**. Its preamble, which the construction kept verbatim, is correctly **not a finding**. It is not "some units", and not "all 8 units".
- **Does the rule change any verdict? No section verdict changes.**
  - At unit grain, Lina-1's `#ios` and `#android` are the only units whose verdict depends on a reading the definition leaves open (finding **B-2**).
  - My per-unit required verdict for both is **NOT TRIVIAL**. Each lost only its file-extension item; clause (iii) owes that loss, not triviality.
  - I state these per-unit verdicts **here, in the same record as run 1**, so they are **not** pre-committed for run 1. They are therefore **not** the ground of this verdict. They **are** committed before run 2, and run 2 tests them.

## C(c1): the replacement required verdict (stated before testing)

#220 superseded the table's "inapplicable" and wrote no replacement. As the exemplar's owner, I state it:

> **C(c1), both units (`#the-charter-cut-ratified-verbatim`, `#honest-reach-…`; 2 operative items each; byte-identical rendering): NOT A FINDING.** Produced by **C18's entry-set rule**: a byte-identical passthrough does not enter the entry set. **If a one-byte change brings either unit into the set, it clears the mechanical floor at 2/2 with no removals → NOT TRIVIAL** (5b's mechanical half). **Clause (a) is not exercised.**

The exemplar's original purpose is kept in substance under the corrected premise: **no false finding on a faithful rendering.** The clause that produces the result has changed, from (a) to the entry-set rule and the floor.

---

## Reproduction, exemplar by exemplar (unit grain; strict counts from the Appendix script)

| Exemplar | Unit(s) | Required verdict (clause) | Strict floor, C18 as written | Routed judgment: functions surviving | Reproduced? |
|---|---|---|---|---|---|
| **A** | `#audit-checklist` (30) | TRIVIAL, (b) | 0/30 → routes | 0/30; the most lenient reading gives 1/30 (test-coverage-3) | **Yes**, (b) via 5b |
| **B** | `#the-owed-set-pipeline-…` (14) | TRIVIAL, (b); verdict-bearing on the `re-pointed` lane | 0/14 → routes; it also routes under S3-A1, because the removed ballot and `.kiro/specs` paths cite repo-specifics subtractions (1–4) | 0/14. The rendering names the owed state without the predicate, which is clause (c) in sentence form. Most lenient: 1/14 | **Yes**, (b) via 5b |
| **C(c1)** | `#the-charter-cut-…` (2), `#honest-reach-…` (2) | **NOT A FINDING** (restated above) | byte-identical → outside the entry set; 2/2 CLEARS if entered | n/a | **Yes**, by C18's entry set and 5b's floor. Clause (a) not exercised |
| **C(c2)** | `#what-parity-means` (7) | ROUTED → TRIVIAL for "same structure, not same code", 5c + (b) | 0/7 → routes | 0/7. The most lenient reading gives 2/7: "same structure" ≈ information architecture, and "not same code" ≈ one limb of `parity-not-identical`, whose token-strings limb, the violable crux, is lost | **Yes**. 5c makes the members operative, so it is not (a); (b) via 5b |
| **D** | `#the-trigger-set-…` (13) | TRIVIAL, (b) | 1/13 (`trigger-closeout`) → routes; it also routes under S3-A1 (removed rows name Thurgood → subtraction-2) | 1/13. Keeping both paragraphs as well would still give 3/13 | **Yes**, (b) |
| **E** | `#the-owed-set-pipeline-…` (14) | NOT TRIVIAL, 5b | 0/14 → routes; it also routes under S3-A1 | 14/14 re-keyed (table below). A strict judge gives 13/14 (`owed-set-staged-mechanization` loses its Q2-sitting clause, which is ours, subtraction-3). It flips only if 8 of 14 are denied | **Yes**, 5b |
| **F** | Navigation `#purpose` (0), `#key-characteristics` (5) | `#purpose` INAPPLICABLE, (a); `#key-characteristics` OPERATIVE, 5c | n/a (a classification exemplar) | I applied 5c myself: no `#purpose` sentence can be violated (the inventory sentence is a repo fact, and its usage limb is bound elsewhere). All 5 `**Label**: value` bullets can be violated. This agrees with Lina's confirmed record | **Yes**, (a) and 5c |
| **Lina-1** | preamble (2), `#web` (4), `#ios` (3), `#android` (3), `#cross-platform-consistency` (2) | Section: TRIVIAL, (b)+(c). Per unit, restated: preamble TRIVIAL; `#web` TRIVIAL; `#ios` NOT TRIVIAL; `#android` NOT TRIVIAL; cpc ABSENT | 0/2, 0/4, 0/3, 0/3; cpc absent | preamble 0/2 ((c): heading only); `#web` 1/4; `#ios` 1/3 **or** 2/3; `#android` 1/3 **or** 2/3 (**B-2**); pooled 3/14 or 5/14 | **Section: yes.** Per unit: preamble and `#web` yes. `#ios`/`#android`: **judge-dependent** (B-2, tested at run 2) |
| **Lina-2** | preamble (1), steps 1–7 (2·1·5·5·1·9·1) | Section: TRIVIAL, (c). Per unit, restated: preamble NOT A FINDING; each step TRIVIAL | preamble byte-identical (1/1 if entered); steps 0/k each | Each step 0/k: the heading is kept, and the body "Create the file." carries no item. Pooled: 1/25 | **Yes**, (c) does the work in every step unit |
| **G** | `#item-critical-wait-for-user-authorization-…` (7) | TRIVIAL, (b) via 5b, with (c) verdict-bearing | 0/7 → routes | 0/7; the most lenient reading gives 1/7 (`wait-4`) | **Yes** |
| **G′** | `#item-civitas-governance-health-check` (4) | NOT TRIVIAL, 5b | 0/4 → routes; it also routes under S3-A1 (subtractions 2 and 3) | 4/4; a strict judge gives 3/4 | **Yes** |

**E's item-by-item judgment** (the rendering is in the Appendix):

| Item | Re-keyed in the rendering | Survives? |
|---|---|---|
| `owed-set-predicate` | Three conjuncts over *their* merge unit, *their* completion path and *their* adoption record | yes |
| `owed-set-emits-exclusions` | "reports every spec it leaves out, counted by class … a number you can check" | yes |
| `owed-set-ratification-resolve` | `ADOPTED=` read from their record; FATAL on an empty value | yes |
| `owed-set-stage-1a` | first-parent specs since adoption, with the boundary pinned to `00:00` | yes |
| `owed-set-stage-1b` | one class per spec, with units-declaration precedence (one recognized form, "whatever form your tasks files use") | yes |
| `owed-set-stage-2` | the anchor commit and its date | yes |
| `owed-set-stage-3` | closeout record present → closed; otherwise owed | yes |
| `owed-set-stage-4` | the owed set, and exclusions counted by class and by pre-adoption | yes |
| `owed-set-class-a` / `-b` / `-c` | the three classes, including (b)'s never-drop-silently rationale | yes ×3 |
| `owed-set-three-copies` | "keep every copy the same text" | yes |
| `owed-set-staged-mechanization` | the second wrong result → a committed script with scoped approval; the Q2 sitting is dropped (subtraction-3) | yes (partial) |
| `owed-set-git-history` | `git log --first-parent` / `git show <merge>:<path>` | yes |

---

## Attacks constructed, and outcomes

**AX-1 — the same-text over-count → BREAKS (finding B-1).**
- **The setup.** `#audit-checklist` holds two items with the same text (`documentation-3` and `lessons-learned-capture-2`, "Are structured requests to system agents complete and actionable?"). That is the only such pair in the corpus: a one-off containment scan over all four records at `2b8304f4` found no other identical or contained item texts within any unit. C16 does not forbid it. C18's comparand is "the item's COMPLETE `text`", with no rule for items that share one.
- **The rendering.** It keeps **14 distinct items** verbatim, including that text **once**, and drops the other 16. The kept set was chosen to hold every item that refers to something in this repo (Leonardo, Test-Development-Standards, the Product Handoff Protocol, the authoring guide). So none of the dropped items carries anything a subtraction 1–4 citation could apply to, and the clearing rule's second condition holds.
- **The count.** Per C18 as written, the count is **15/30 → CLEARS mechanically: never routed, no signer, no human**. The occurrence-bounded count is 14/30 → routes. The script output is in the Appendix.
- **The item credited without being retained**: `lessons-learned-capture-2`, whose own occurrence was deleted.
- **What this falsifies**:
  - 5b's "strict matching can only *under*-count retention, never over-count it";
  - C18's "matching complete item text **cannot count an item whose operative remainder was deleted**".
  - Both hold only if item texts are distinct within a unit, and neither the definition nor C16 requires that.
- **Magnitude and backstop, stated so the finding is not over-read.**
  - The over-count is one item per shared-text pair, and the corpus has one pair, so the attack lives at the boundary.
  - In composition, clause (iii) still flags the 16 uncited removals, so the gutting reaches a human through (iii), not through C3.
  - **That does not rescue the clause.** C3's text asserts a soundness property that is false on committed data, in the clearing direction. 13.4 implements the text, and "carried to 13.4" (`task-11-completion.md`) is a note, not law.
- **The property the rework must restore.** I am not supplying the wording; the mirror clause applies. **The mechanical count must not credit an item whose own occurrence in the rendering is not retained**, and the definition must say how items that share a text are counted, or forbid them.

**AX-2 — implied function across redundant items → finding B-2 (determinacy). This is not the ground of run 1's verdict.**
- The 11.3 record pre-registered the question: *does an item survive by implication from another item's surviving rendering?* The definition has two licensed readings that disagree:
  - (c): "counts as retained only if its **own** operative content survives";
  - 5b: "retained IFF its FUNCTION survives, including in re-grounded form".
- **Where the two readings diverge**:
  - Lina-1 `#ios`, "iOS: SwiftUI.": `ios-language` ("Swift (native)") is **not stated**, but SwiftUI is Swift-only, so the function is enforced. This gives 1/3 → TRIVIAL, or 2/3 → NOT TRIVIAL.
  - `#android`, "Compose.", works the same way, since Compose is Kotlin-only.
  - The G sketch from the tasks round, "Wait for the user before continuing.", gives 1/7 or 4/7.
- **Direction**: over-fire, which is safe (it routes to a human). It is not systematic, but redundant or implied items are common in charters, so an unpinned reading will show up as **judge variance across signers**, which C2's per-signer assent rate would then misread as signal.
- **Required verdicts, committed here for run 2**: `#ios` NOT TRIVIAL (2/3), and `#android` NOT TRIVIAL (2/3). The rework must make the definition determine these.
- **Why this is not verdict-bearing for run 1.** Those per-unit verdicts were not committed before this run. The section-grain Lina-1 verdict is reproduced under both readings (pooled 3/14 or 5/14).

**AX-3 — clearing the floor with a dead function, through gained framing → holds, as a named limitation (advisory A-1).**
- The construction: keep at least half of a unit's items verbatim, but under a gained wrapper such as "Historical, no longer in force:". It clears mechanically, and the function is dead.
- 5b already says "mechanically non-trivial SHALL NOT be read as function retained". The case is 11.7.1 (nothing constrains what a rendering gains), so it is not a break of C3.
- **Advisory**: 11.7.2 names "semantic inversion inside a **fully** retained section". This variant is inversion that reaches the **cleared lane** of a partially retained unit. Same class, but wider than the limitation's wording. 5b's compositional sentence ("that population belongs to clauses (i) and (iv)") covers items that are dead **in the consumer's repo**. It does not cover items made dead **by the rendering's own framing**; those belong to no clause, only to review.

**AX-4 — clearing by omitting the citation → holds in composition (advisory A-2).**
- The construction: remove repo-bound items **without** citing a subtraction. C3's clearing condition ("none of its removals **cites** 1–4") is met, so the unit clears if at least half is retained verbatim.
- (iii) flags the uncited removal as non-attribution, which routes it to a human. The rule's literal claim holds.
- **Advisory**: S3-A1's protection against uncited repo-bound removal lives in (iii), not in C3. The clearing rule keys on a declaration the profile controls.

**AX-5 — the denominator attack (5d) → holds.** A rendering cannot supply a denominator; every count here reads the committed record.
- **Evidence the seat separation works**: the conflicted drafter's draft gave both C(c1) units **zero** items. Had that stood, both would sit permanently outside triviality's domain. The confirming seat overturned it (my 11.2 confirmation).
- Whether the *check* reads the record is G2's half (2), and is not tested here.

**AX-6 — a unit shaped like labels but purely descriptive → holds.**
- Navigation `#family-overview:preamble` (`**Family**` / `**Shared Need**` / `**Readiness**`), under 5c as written, gives 0 items → (a).
- **Coverage note** (Lina's residual, confirmed): F's committed pair would not catch an *implementation* that reads label form as operative. The definition's text does not make that error; a classifier built from it could.

**AX-7 — a heading that states the obligation → holds.**
- G's title states `wait-1` word for word. Clause (c) discounts it, so a heading-only rendering is TRIVIAL even though the title carries one item's function.
- This is over-fire, in the safe direction, and crediting the title still gives only 1/7. No verdict changes.

**AX-8 — units of one or two items → holds.**
- At finest grain, "fewer than half" collapses to "nothing survives" for units of one or two items (Lina-2 steps 2, 5 and 7; C(c1)).
- This is **not** v1's existential-over-kinds failure, because an item's own function must correspond (5b). It sharpens 11.6.6(i): for most units the number is inert, and (c) plus 5b do all the work.

**AX-9 — a byte-identical C(c1) and a one-byte variant → holds.** A byte-identical unit is outside the entry set. A one-byte variant clears at 2/2. No false finding.

---

## Findings

| Id | Class | Clause | Direction | Owner of the fix |
|---|---|---|---|---|
| **B-1** | **BREAKING** | 11.6.5b mechanical half; C18 clause 2 soundness claim; interacts with C16's record rule | clearing (dangerous) | Thurgood (C3 / C16 / C18) |
| **B-2** | Determinacy; owed an answer in the same rework; tested at run 2 | (c) against 5b on implied function | over-fire (safe) | Thurgood (C3) |
| A-1 | Advisory | 11.7.2's wording; 5b's compositional sentence | clearing, by gained framing | Thurgood (11.7) |
| A-2 | Advisory | the S3-A1 clearing rule keys on a declared citation | clearing, backstopped by (iii) | Thurgood (C3), no change required |
| A-3 | Record | `task-11-completion.md` § "G1 domain-line inputs": "the `route` item kind: not exercised" is wrong. G′ `hc-2` is `kind: route`, and its survival is part of G′'s verdict | n/a | Thurgood (his input doc) |

**The fold-back, and what survives.**
- **The counter-argument**: B-1 is a one-item boundary case, (iii) catches it in composition, and it is already carried to 13.4. Calling BREAKS costs a rework round, the M-1 scoped read (k > 1) and a tripwire at `G1 runs: 2`.
- **Folded in**:
  - only B-1 carries the verdict;
  - B-2 rides the same rework instead of being a second, separate break;
  - A-1 and A-2 are advisory.
- **What survives**: the definition states, as its reason clearing is safe without a human, a property that committed data falsifies in the clearing direction. **A HOLDS would certify that sentence as the law 13.4 implements.** The carried note does not bind the implementation; the definition does.
- **No fork is surfaced.** The verdict is this seat's, and its consequence is already ruled (11.6.7).

---

## G1 DOMAIN LINE (run 1)

- **Exercised: the body domain only.**
- **Sources**: two charters (`canonical/agents/stacy.md`, `canonical/agents/lina.md`), one Layer-3 family doc (`governance/Component-Family-Navigation.md`), and one always-set member (`.kiro/steering/start-up-tasks.md`).
- **Unit kinds**:
  - heading leaf units: `stacy.md` ×6, `lina.md` ×11, Navigation ×2;
  - `#<parent>:preamble` units ×2, both on `lina.md` (Lina-1's and Lina-2's);
  - **enumeration-kind `#item-…` units ×2 on one always-set member** (G, G′).
- **Item kinds**: obligation, step, member, command, and **route** (one item, G′ `hc-2`).
- **Content forms**: bulleted and numbered lists, a table (D), a fenced shell script (B/E), `- **Label**: value` bullets (Lina-1, F), and blockquotes (C(c1)).
- **Clauses exercised**:
  - (b) and 5b's routed judgment: every below-floor unit;
  - 5b's mechanical clear: C(c1), the Lina-2 preamble, AX-1;
  - (c): G, Lina-2, the Lina-1 preamble, AX-7;
  - S3-A1's clearing rule: B, D, E, G′, AX-4;
  - 5c: F, C(c2), AX-6;
  - 5d: every count, structurally.
- **Clause (a) is exercised by F `#purpose` ONLY.**
  - **C(c1)'s zero-item premise is false**: both named units carry 2 operative items (Stacy 11.2; #220 item 4).
  - **The corpus fact behind it**: every preamble on `stacy.md` carries a trigger, an instruction or a precedence rule, so no zero-item unit exists there. The five preambles were re-read at `df288a5b`.
  - **Fragility**: `#purpose`'s inventory sentence is stale. A canonical fix that adds binding content would cost clause (a) its only exemplar.
- **NOT EXERCISED**:
  - frontmatter entries (the entry tree);
  - shared-catalog members;
  - `#doc:preamble`;
  - the degenerate `#doc`;
  - always-set members other than `start-up-tasks.md`;
  - any heading or preamble unit on an always-set member;
  - **C18's hard floor** (clause 4);
  - dispositions, overlays and signatures (C17, outside C3).

---

## What this record does not establish

- **Whether any code computes these counts.** None exists; the counts are the Appendix script applying C18's text.
- **Whether the check reads the committed record** (G2 half (2)), or anything about § 7.2's derivation criterion (G2 half (1)).
- **That the calibration set discriminates the threshold.** It does not: every exemplar lands identically for any threshold in (0, 1), and AX-8 sharpens that.
- **Seat authentication.** One git identity. This record lands in its own `Agent: stacy` commit, which separates the seats but does not authenticate them.

**Standards implications:**
1. C16/C18 need a rule for items within a unit that share a text (B-1). This is the definition owner's to write.
2. Req 11.6.5's table is superseded in execution in two places: the C(c1) row (#220; replacement verdict above) and the per-unit restatements of Lina-1 and Lina-2 (above). Both belong in § "Carried obligations" for the next requirements touch.
3. The tasks-round lesson from #220 recurs: a criterion's instrument (here, "the comparand") was specified without the record rule it depends on.

---

## Appendix: the constructions (renderings), the check, and its output

Each block is one rendering of one canonical unit (`<!-- rendering <exemplar> <record-stem> <anchor> -->`).
- G and G′ are read from `task-11-3-exemplars-g-gprime.md`.
- C(c1)'s two units and the Lina-2 preamble are byte-identical to canonical.
- Lina-1's `#cross-platform-consistency` is absent: the construction keeps only three sub-headings.
- **These are my instantiations of the table's described constructions** (A, B and C(c2) from my R1 table text; D keeps the CLOSEOUT row; E follows 5a's description; Lina-1 and Lina-2 follow Lina's R1 text, "Web: use Web Components. iOS: SwiftUI. Android: Compose." and "keep all seven step headings, reduce each body to *Create the file.*").

<!-- rendering A stacy #audit-checklist -->
````text
### Audit Checklist
Audit the work against the standards.

````

<!-- rendering B stacy #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script -->
````text
### The owed-set pipeline (your command catalog's owed-set entry — documented commands, deliberately not a committed script)

Determine which of your specs owe a closeout claims pass, and run the pass for each.

````

<!-- rendering C(c2) stacy #what-parity-means -->
````text
### What Parity Means
Same structure, not same code.

````

<!-- rendering D stacy #the-trigger-set-the-114-superset-table-names-never-numbers -->
````text
### The trigger set (the § 11.4 superset table — names, never numbers)

| Trigger | Event | Scope — the binding text | Owner |
|---|---|---|---|
| **CLOSEOUT** | The merge of the spec's **final declared merge unit** | All the spec's parents: promised vs claimed vs shipped; the judgment residual the checker cannot reach; **natural home for the spec-level-criteria discharge — rider (a)**. **Owed by every spec closing after ratification regardless of exemption status** (ruling 3's decoupling) | Stacy |

````

<!-- rendering E stacy #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script -->
````text
### The owed-set pipeline (the closeout-owed query for your repository)

A spec S **owes a closeout claims pass** when three things are all true: S's final declared merge unit has merged; S has no committed closeout record at `$SPECS_DIR/S/completion/claims-pass.md`; and that merge is dated on or after the day your team adopted closeout claims passes, as written in your adoption record. The query runs in stages and **reports every spec it leaves out, counted by class**, so a wrong answer shows up as a number you can check instead of a short list that merely looks healthy:

```bash
SPECS_DIR=specs                               # your specs directory
ADOPTION=docs/claims-pass-adoption.md         # your adoption record, with a line "Adopted: YYYY-MM-DD"
ADOPTED=$(grep -m1 '^Adopted: ' "$ADOPTION" | awk '{print $2}')
[ -n "$ADOPTED" ] || { echo "FATAL: no adoption date in $ADOPTION"; exit 1; }
echo "adopted on: $ADOPTED"
# The boundary is pinned to 00:00: a bare date means "now, on that day" to git, which drops that day's earlier merges.

# Stage 1a: the specs your main branch's first-parent history touched since adoption
SPECS=$(git log --first-parent --since="$ADOPTED 00:00" --name-only --pretty=format: -- "$SPECS_DIR/" \
        | sed -n "s|^$SPECS_DIR/\([^/]*\)/.*|\1|p" | sort -u)
echo "specs touched since adoption: $(echo "$SPECS" | grep -c .)"

A=0; B=0; C=0; CLOSED=0; OWED=""
for S in $SPECS; do
  T="$SPECS_DIR/$S/tasks.md"
  # Stage 1b: exactly one class per spec; a merge-units declaration wins
  if grep -qiE '^#{2,4} .*merge unit' "$T" 2>/dev/null; then cls=a; A=$((A+1))
  else
    n=$(git log --first-parent --oneline --since="$ADOPTED 00:00" -- "$SPECS_DIR/$S/" | wc -l | tr -d ' ')
    if [ "$n" -le 1 ]; then cls=b; B=$((B+1)); else cls=c; C=$((C+1)); fi
  fi
  # Stage 2: the anchor, i.e. the last first-parent commit touching the spec, with its date
  ANCHOR=$(git log --first-parent -1 --format='%h %cs' -- "$SPECS_DIR/$S/")
  # Stage 3: is the closeout record there? If not, the spec is owed
  if [ -f "$SPECS_DIR/$S/completion/claims-pass.md" ]; then CLOSED=$((CLOSED+1))
  else OWED="$OWED  $S ($cls, anchor $ANCHOR)\n"; fi
done
# Stage 4: the owed set, and every exclusion counted by class
echo "OWED:"; [ -n "$OWED" ] && printf "$OWED" || echo "  (none)"
echo "EXCLUDED: $CLOSED closed; ${A}(a) / ${B}(b) / ${C}(c) by class; plus every spec with no activity since $ADOPTED"
```

The classes: **(a)** the spec declares its merge units, in whatever form your tasks files use, and the anchor is its final declared unit; **(b)** no declared units and one PR, so that PR is the unit (the commonest shape, and a query that drops it silently gives exactly the healthy-looking short list this count prevents); **(c)** no declared units and several PRs, so the anchor is the PR carrying the last parent completion doc.

If you keep this query in more than one place (say a release checklist and a periodic health check), keep every copy the same text.

If the query gives a wrong result a second time in ordinary use, turn it into a committed script with its own scoped approval, instead of correcting it by hand again.

Git history is half of what a claims audit reads: `git log --first-parent` gives unit anchors and deltas, and `git show <merge>:<path>` gives what shipped at the merge.

````

<!-- rendering Lina-1 lina #platform-implementation-true-native-architecture:preamble -->
````text
## Platform Implementation: True Native Architecture

````

<!-- rendering Lina-1 lina #web -->
````text
### Web
- Use Web Components.

````

<!-- rendering Lina-1 lina #ios -->
````text
### iOS
- SwiftUI.

````

<!-- rendering Lina-1 lina #android -->
````text
### Android
- Compose.

````

<!-- rendering Lina-2 lina #step-1-verify-component-family-doc -->
````text
### Step 1: Verify Component-Family Doc
Create the file.

````

<!-- rendering Lina-2 lina #step-2-create-typests -->
````text
### Step 2: Create types.ts
Create the file.

````

<!-- rendering Lina-2 lina #step-3-author-contractsyaml -->
````text
### Step 3: Author contracts.yaml
Create the file.

````

<!-- rendering Lina-2 lina #step-4-create-platform-implementations -->
````text
### Step 4: Create Platform Implementations
Create the file.

````

<!-- rendering Lina-2 lina #step-5-create-tests -->
````text
### Step 5: Create Tests
Create the file.

````

<!-- rendering Lina-2 lina #step-6-create-or-review-component-metayaml -->
````text
### Step 6: Create or Review component-meta.yaml
Create the file.

````

<!-- rendering Lina-2 lina #step-7-create-readme -->
````text
### Step 7: Create README
Create the file.

````

<!-- rendering AX-1 stacy #audit-checklist -->
````text
### Audit Checklist
- Does the screen/feature have a specification from Leonardo?
- Is the spec complete (component tree, state model, tokens, accessibility)?
- Are platform-specific notes included where needed?
- Have all specified platforms been implemented?
- Do implementations match the spec's component tree?
- Are deviations documented with rationale?
- Do platform implementations have tests?
- Do tests cover behavioral contracts, accessibility, and key interactions?
- Do tests follow Test-Development-Standards (naming, structure, categories)?
- Was the Product Handoff Protocol followed during implementation? (Implementation Reports submitted, blocking flags raised properly)
- Do accumulated lessons reveal stale `whenToUse` or `whenNotToUse` entries in component metadata?
- Are there missing `alternatives` that lessons or spec deviations have exposed?
- Do `purpose` fields match the terms product agents actually search for? (Reference: controlled vocabulary consumer search terms in the authoring guide)
- Are structured requests to system agents complete and actionable?

````

### The check (run from the repo root: `npx tsx <script> .kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md`)

```ts
// G1 run-1 strict-floor computation. Usage (repo root): npx tsx <this> <run-record.md>
// Reads renderings from the run record (and G/G′ from the 11.3 record), items from the committed
// operative-set records, canonical units from partition(). Computes C18's strict comparand AS WRITTEN
// (an item counts iff its complete `text` occurs in the rendering) and, for contrast, an
// occurrence-bounded count (k items sharing one text are credited at most as many times as it occurs).
import * as fs from 'fs';
const W = process.cwd();
const { load } = require(W + '/node_modules/js-yaml');
const { splitFrontmatter } = require(W + '/tools/agent-generator/frontmatter');
const { partition } = require(W + '/tools/agent-generator/partition');
const rec = (stem: string) => load(fs.readFileSync(`${W}/canonical/operative-sets/${stem}.yaml`, 'utf8'));
const unitsOf = (src: string) => Object.fromEntries(partition(splitFrontmatter(fs.readFileSync(W + '/' + src, 'utf8')).body).units.map((u: any) => [u.anchor, u.text]));
const occ = (hay: string, n: string) => { let c = 0, i = 0; while ((i = hay.indexOf(n, i)) !== -1) { c++; i += n.length; } return c; };
const blocks: [string, string, string, string][] = [];
const re = /<!-- rendering (\S+) (\S+) (\S+) -->\n````text\n([\s\S]*?)````\n/g;
for (const f of [process.argv[2], '.kiro/specs/123-consumer-distribution/completion/task-11-3-exemplars-g-gprime.md']) {
  const t = fs.readFileSync(f.startsWith('/') ? f : W + '/' + f, 'utf8'); let m;
  while ((m = re.exec(t))) blocks.push([m[1], m[2], m[3], m[4]]);
  const g = /<!-- (G|Gprime)-rendering:begin -->\n````text\n([\s\S]*?)````\n/g;
  while ((m = g.exec(t))) blocks.push([m[1] === 'G' ? 'G' : 'G′', 'start-up-tasks', m[1] === 'G' ? '#item-critical-wait-for-user-authorization-before-starting-new-tasks' : '#item-civitas-governance-health-check', m[2]]);
}
// C(c1): byte-identical renderings are the canonical units themselves.
const stU = unitsOf('canonical/agents/stacy.md');
for (const a of ['#the-charter-cut-ratified-verbatim', '#honest-reach-carried-so-you-never-inherit-an-over-claimed-instrument']) blocks.push(['C(c1)', 'stacy', a, stU[a]]);
// Lina-2's preamble is kept byte-identical by the run-1 instantiation (only the step bodies are gutted).
blocks.push(['Lina-2', 'lina', '#component-scaffolding-workflow:preamble', unitsOf('canonical/agents/lina.md')['#component-scaffolding-workflow:preamble']]);
for (const [lab, stem, anchor, text] of blocks) {
  const r = rec(stem); const u = r.units[anchor]; if (!u) { console.log(`${lab} ${anchor}: NO RECORD UNIT`); continue; }
  const canon = unitsOf(r.source)[anchor];
  const items = u.items as any[];
  const naive = items.filter((i) => text.includes(i.text));
  // occurrence-bounded: group by text
  const groups = new Map<string, number>(); for (const i of items) groups.set(i.text, (groups.get(i.text) || 0) + 1);
  let bounded = 0; for (const [t, k] of groups) bounded += Math.min(k, occ(text, t));
  const n = items.length; const clears = (c: number) => n > 0 && c / n >= 0.5;
  console.log(`${lab.padEnd(7)} ${anchor.slice(0, 60).padEnd(60)} byteIdentical=${text === canon} items=${n} strict(C18 as written)=${naive.length}/${n}${clears(naive.length) ? ' CLEARS' : ''} occurrence-bounded=${bounded}/${n}${clears(bounded) ? ' CLEARS' : ''} [${naive.map((i) => i.id).join(',')}]`);
}
```

### Its output at this commit

```
A       #audit-checklist                                             byteIdentical=false items=30 strict(C18 as written)=0/30 occurrence-bounded=0/30 []
B       #the-owed-set-pipeline-your-command-catalogs-owed-set-entry- byteIdentical=false items=14 strict(C18 as written)=0/14 occurrence-bounded=0/14 []
C(c2)   #what-parity-means                                           byteIdentical=false items=7 strict(C18 as written)=0/7 occurrence-bounded=0/7 []
D       #the-trigger-set-the-114-superset-table-names-never-numbers  byteIdentical=false items=13 strict(C18 as written)=1/13 occurrence-bounded=1/13 [trigger-closeout]
E       #the-owed-set-pipeline-your-command-catalogs-owed-set-entry- byteIdentical=false items=14 strict(C18 as written)=0/14 occurrence-bounded=0/14 []
Lina-1  #platform-implementation-true-native-architecture:preamble   byteIdentical=false items=2 strict(C18 as written)=0/2 occurrence-bounded=0/2 []
Lina-1  #web                                                         byteIdentical=false items=4 strict(C18 as written)=0/4 occurrence-bounded=0/4 []
Lina-1  #ios                                                         byteIdentical=false items=3 strict(C18 as written)=0/3 occurrence-bounded=0/3 []
Lina-1  #android                                                     byteIdentical=false items=3 strict(C18 as written)=0/3 occurrence-bounded=0/3 []
Lina-2  #step-1-verify-component-family-doc                          byteIdentical=false items=2 strict(C18 as written)=0/2 occurrence-bounded=0/2 []
Lina-2  #step-2-create-typests                                       byteIdentical=false items=1 strict(C18 as written)=0/1 occurrence-bounded=0/1 []
Lina-2  #step-3-author-contractsyaml                                 byteIdentical=false items=5 strict(C18 as written)=0/5 occurrence-bounded=0/5 []
Lina-2  #step-4-create-platform-implementations                      byteIdentical=false items=5 strict(C18 as written)=0/5 occurrence-bounded=0/5 []
Lina-2  #step-5-create-tests                                         byteIdentical=false items=1 strict(C18 as written)=0/1 occurrence-bounded=0/1 []
Lina-2  #step-6-create-or-review-component-metayaml                  byteIdentical=false items=9 strict(C18 as written)=0/9 occurrence-bounded=0/9 []
Lina-2  #step-7-create-readme                                        byteIdentical=false items=1 strict(C18 as written)=0/1 occurrence-bounded=0/1 []
AX-1    #audit-checklist                                             byteIdentical=false items=30 strict(C18 as written)=15/30 CLEARS occurrence-bounded=14/30 [spec-quality-1,spec-quality-2,spec-quality-3,implementation-coverage-1,implementation-coverage-2,implementation-coverage-3,test-coverage-1,test-coverage-2,test-coverage-3,documentation-3,process-adherence-2,lessons-learned-capture-2,metadata-accuracy-1,metadata-accuracy-2,metadata-accuracy-3]
G       #item-critical-wait-for-user-authorization-before-starting-n byteIdentical=false items=7 strict(C18 as written)=0/7 occurrence-bounded=0/7 []
G′      #item-civitas-governance-health-check                        byteIdentical=false items=4 strict(C18 as written)=0/4 occurrence-bounded=0/4 []
C(c1)   #the-charter-cut-ratified-verbatim                           byteIdentical=true items=2 strict(C18 as written)=2/2 CLEARS occurrence-bounded=2/2 CLEARS [cut-thurgood,cut-stacy]
C(c1)   #honest-reach-carried-so-you-never-inherit-an-over-claimed-i byteIdentical=true items=2 strict(C18 as written)=2/2 CLEARS occurrence-bounded=2/2 CLEARS [reach-artifact-truth,reach-green-is-not-honesty]
Lina-2  #component-scaffolding-workflow:preamble                     byteIdentical=true items=1 strict(C18 as written)=1/1 CLEARS occurrence-bounded=1/1 CLEARS [scaffold-follow-stemma]
```
