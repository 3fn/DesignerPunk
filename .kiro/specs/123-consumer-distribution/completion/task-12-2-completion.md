# Task 12.2 Completion (loop 1) — C3 rework after G1 run 1 BREAKS, and the run-2 request

**Spec**: 123 — Consumer Distribution · **Unit**: U2a · **Parent**: Task 12 · **Agent**: Thurgood (Opus), the executing agent and C3's owner

**The verdict this executes**: `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (current) and `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md` (run 1, `35610fef`; merged into the unit branch at `5c1fa4bb`). This doc cites them and does not paraphrase the verdict (Req 11.8.4). **Branch selected**: BREAKS → the C3 rework commits, then a run-2 request (Task 12, criterion 3; design § "Gates and sequencing").

**`G1 runs: 1`** so far. **M-1 (#219) fires regardless of run 2's outcome**: k will be ≥ 2, so after U2a's acceptance Stacy performs the scoped post-acceptance read. It covers Task 12's evidence, plus any Task 10 or Task 11 criterion row whose cited artifact a C3 rework commit modifies. The set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ the Tasks 10–11 Primary Artifacts, and the result is recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md`.
- **This rework modifies no Task 10 or Task 11 Primary Artifact.** It touches `requirements.md`, `design.md` and completion docs only, so the set is expected to be empty, and the read is Task 12 only.
- **`task-11-completion.md` is edited** (the A-3 erratum), but it is a completion doc, not a Primary Artifact.

**Recusal held**: no line of Stacy's records was authored, pre-read or edited here. No operative-set record or confirmation note was edited.

## What changed

**The rework is the plan's designed path, not an out-of-list edit.** Task 12's Primary Artifacts name "the C3 rework commits (if any)". The C3 text under test is the text my 12.1 request pinned: `requirements.md` § 11.6 and `design.md` § C18. Both are edited on the unit branch, plus 11.7.2 (A-1: the named limitation that bounds C3's floor, adjacent in Requirement 11). **No file under `canonical/` was added or edited** (Task 12, criterion 7).

| File | Blob before (`2b8304f4`, pinned by the 12.1 request) | Blob after (this commit) | Sections |
|---|---|---|---|
| `.kiro/specs/123-consumer-distribution/requirements.md` | `1bf45227139dd92bc0ded953fbd8844aff479479` | `deeb810b01f783118434780df0690638031b2108` | § 11.6 (now lines 403–479, including the new 5e and 5f); 11.7.2 (line 482) |
| `.kiro/specs/123-consumer-distribution/design.md` | `21ff416778f9625f662f87e0274d0e941a55ee65` | `bf8d57b757d3d7def4b7e67e0f075742f9b6fca1` | § C18 (now lines 621–640) |
| `.kiro/specs/123-consumer-distribution/completion/task-11-completion.md` | `a76bce4e6be873fb43eb5cbbe7fa7ad81271a6a8` | (this commit) | appended erratum (A-3) only |

### The edits, finding by finding

- **B-1 (BREAKING) — the mechanical count credits an item only through its own occurrence.**
  - **Requirements 11.6.5b, first bullet**, gains four sub-bullets:
    - each credited item is assigned an occurrence of its complete `text` in the rendering;
    - no two credited items share an occurrence, and no two assigned occurrences overlap;
    - items that share a text are credited at most as many times as it occurs, disjointly;
    - an item whose text occurs only inside another credited item's occurrence is not credited;
    - shared and contained texts stay **permitted** in records;
    - any valid assignment is sound (an implementation need not maximize).
  - **Design C18, clause 2**: `strictVerbatimRetained` is defined as the size of a valid occurrence assignment. **Plain per-item `includes` is named as not a valid implementation.** The restated soundness claim gains the occurrence clause. A **required bite at 13.4** is named: AX-1's rendering → 14/30 → routes.
  - This is the property Stacy's run-1 record states (§ AX-1, "The property the rework must restore").
- **B-2 (determinacy) — retention by entailment: new 11.6.5e.**
  - **The rule**: an item is retained IFF every consumer implementation that complies with what the rendering states also complies with the item, read with repo-bound referents re-keyed (5b). This is 5c's violability test run in the other direction.
  - **Entailment may come from** another surviving statement ("SwiftUI." ⇒ Swift; "Compose." ⇒ Kotlin).
  - **It may not come from** a label, a reference to text not stated, or a goal named without its constraint.
  - **A merely compatible statement retains nothing.**
  - **Clause (c)** (11.6.4) now says "stated in the rendering, or entailed by what the rendering states (5e)", and adds the group label to the list of labels.
  - **C18 clause 3** names entailment as the routed judge's retention test.
- **Grain — new 11.6.5f.** "Section" means a unit of Req 10.G's partition; the definition does no aggregation; section-grain required verdicts are restated per unit by the exemplars' owner. C18 gains a grain line. **This codifies the rule Stacy's run 1 settled** (§ "The grain rule") as definition text, so 13.4 does not have to read it out of a verdict record.
- **A-1 (advisory).**
  - **11.7.2** now reads: "Semantic inversion or deadening inside a retained section … a **fully** retained section, and also a unit retained **enough to clear C3's mechanical floor** under gained framing".
  - **5b's compositional bullet** adds: items made dead by the rendering's own framing belong to no clause; they are review's.
- **A-2 (advisory; "no change required").** 5b's S3-A1 bullet gains one sentence: the condition keys on a **declared** citation, which the profile controls, and the protection against an uncited repo-bound removal is clause (iii), not this rule. **Taken as a sentence**, because an unstated reliance is the class the record keeps finding.
- **A-3 (record).** `task-11-completion.md` gains a dated erratum: `route` **is** exercised, via G′ `hc-2`. The run-1 domain line is the record.
- **Superseded exemplar rows — pointed to, not rewritten.** Below the 11.6.5 table, one italic note cites Stacy's run-1 record for:
  - C(c1)'s replacement required verdict (NOT A FINDING);
  - every per-unit restatement, including Lina-1 `#ios` and `#android` NOT TRIVIAL;
  - F's Navigation instantiation.

  The "Against the exemplars" bullet's "C(c1) stays inapplicable" is annotated as superseded. **I did not re-author any required verdict**: they are the exemplar owner's (11.6.8), and editing the calibration table inside the rework under test would look like tuning.
- A dated rework note heads § 11.6. **Nothing else in § 11.6 or C18 changed**: (a), (b), 11.6.3, 5a, 5c, 5d and 11.6.6–11.6.8 are byte-unchanged.

### The counter-argument on B-1: occurrence-count crediting vs forbidding shared texts in C16

- **Chosen**: occurrence-count crediting, in the definition (5b and C18).
- **The counter-argument**: forbid it at the record instead. C16 would require pairwise distinct, non-contained item texts within a unit. Then plain `includes` is sound and 13.4 stays simple — "one rule in the schema, no algorithm in the definition".
- **Folding it back**:
  - **What forbidding costs**:
    - **It changes a record-schema rule Stacy and Lina confirmed under.** The committed `#audit-checklist` record violates it (`documentation-3` / `lessons-learned-capture-2`).
    - **Complying means an owner re-confirmation** that either merges the two items, narrowing 30 → 29, the direction 5d watches, or misrepresents a unit that genuinely states one obligation twice.
    - It pushes a scan burden onto every future confirmer and the freshness sweep.
    - **It is the denominator shaping itself to fit the counter**, which 5d exists to prevent.
  - **What I folded in from it**: the rework makes shared and contained texts **explicitly permitted** (5b), so no one "fixes" the record instead. It also names **per-item `includes` as an invalid implementation** (C18), so the simplicity the counter-argument wanted cannot return as a silent regression.
- **What survives (the residual)**:
  1. **13.4 implements an assignment, not a substring test.** It is a greedy earliest-end assignment (any valid one is sound), about 15 lines. It needs its own bite, named in C18.
  2. **The definition grew**, and the growth sits in the one clause whose soundness the whole mechanical lane rests on.
  3. **A verbatim occurrence inside gained framing is still credited.** That is 11.7.2's class, now named, and it is not closed.
- **Fork?** None I would put to Peter. The forbidding option's cost falls on the denominator, and 5d rules against it. The occurrence rule's cost is implementation work that 13.4 already owns.

### The counter-argument on B-2: entailment as the retention test

- **The counter-argument**: entailment credits a **faithful compression** across several items. The tasks-round G sketch "Wait for the user before continuing." plausibly entails `wait-1`, `wait-2`, `wait-5` and `wait-7` (4/7, NOT TRIVIAL) while dropping `wait-4`'s "explicit request". Under run 1's own-content reading it was 1/7. **That is the clearing direction for the routed judgment.**
- **Folding it back**:
  - Entailment is **stricter than** the "function is mentioned" reading that produced run 1's lenient counts.
  - It excludes labels, references and bare goals, which are the gutting shapes that A, B and G use.
  - The judgment is a human's, with itemized assent (11.5.6), so the credited items are auditable after the fact.
- **What survives**: a real compression that keeps the core obligation and loses a refinement can land NOT TRIVIAL. Whether that is right, meaning whether "half the items, by entailment" is the correct bar for compression, is 11.6.6(i)'s arbitrary number again, surfacing on a new shape. **This is named below as run 2's first new attack surface.**

## Targeted checks + result

### Re-derivation of the eleven required verdicts against the reworked text

**This table is my evidence. Run 2 is the verdict.**
- The strict count is recomputed by a scratch script. It reads Stacy's run-1 renderings (same markers as her Appendix) and the G and G′ records, and applies C18 clause 2 as reworked: a greedy earliest-end occurrence assignment, next to plain `includes`.
- The routed judgment is applied by hand under 5e.
- The required verdicts are Stacy's, as committed in run 1, including the per-unit restatements and C(c1)'s replacement.

| Exemplar | Unit(s) | Required verdict (run 1) | Strict floor, reworked C18 | 5e judgment (entailment) | Reworked verdict | Reproduced? |
|---|---|---|---|---|---|---|
| **A** | `#audit-checklist` | TRIVIAL | 0/30 → routes | "Audit the work against the standards." is a goal without constraint, so it entails nothing → 0/30 | **TRIVIAL** | yes |
| **B** | owed-set pipeline | TRIVIAL | 0/14 → routes (also routes under S3-A1) | "Determine which … owe … and run the pass" is a goal without a predicate. It is 5e's own worked exclusion → 0/14 | **TRIVIAL** | yes |
| **C(c1)** | `#the-charter-cut-…`, `#honest-reach-…` | NOT A FINDING | byte-identical → outside the entry set; a one-byte variant scores 2/2 and CLEARS | n/a | **NOT A FINDING** (NOT TRIVIAL if entered) | yes |
| **C(c2)** | `#what-parity-means` | TRIVIAL | 0/7 → routes | "Same structure, not same code." is compatible with same IA but does not require it. It entails one limb of `parity-not-identical`'s three, so that item is not retained → 0/7 (at most 1/7 under a lenient judge) | **TRIVIAL** | yes |
| **D** | `#the-trigger-set-…` | TRIVIAL | 1/13 → routes (also routes under S3-A1) | the CLOSEOUT row is stated; no other row is entailed → 1/13 | **TRIVIAL** | yes |
| **E** | owed-set pipeline | NOT TRIVIAL | 0/14 → routes (also routes under S3-A1) | every item is re-keyed and entailed under re-keying. `owed-set-staged-mechanization` loses only its Q2-sitting clause, which is repo-bound (subtraction-3) → 14/14 (13/14 strict) | **NOT TRIVIAL** | yes |
| **F** | Navigation `#purpose` / `#key-characteristics` | INAPPLICABLE / OPERATIVE | n/a (classification) | unaffected by the rework: 0 items → (a); 5 items that can be violated → 5c | **INAPPLICABLE / OPERATIVE** | yes |
| **Lina-1** | preamble | TRIVIAL | 0/2 → routes | heading only, a label → 0/2 | **TRIVIAL** | yes |
| | `#web` | TRIVIAL | 0/4 → routes | "Use Web Components." does not entail Custom Elements **with Shadow DOM**, logical properties, `.web.ts`, or the key rule → 0/4 (1/4 if a judge reads Web Components ⊇ Shadow DOM) | **TRIVIAL** | yes |
| | `#ios` | **NOT TRIVIAL** (B-2) | 0/3 → routes | "SwiftUI." entails `ios-ui-framework` and `ios-language` (SwiftUI is Swift-only), not `.ios.swift` → **2/3** | **NOT TRIVIAL** | **yes — B-2 now determined** |
| | `#android` | **NOT TRIVIAL** (B-2) | 0/3 → routes | "Compose." entails `android-ui-framework` and `android-language` (Compose is Kotlin-only), not `.android.kt` → **2/3** | **NOT TRIVIAL** | **yes — B-2 now determined** |
| | `#cross-platform-consistency` | ABSENT | — | — | **ABSENT** (clause (ii)) | yes |
| **Lina-2** | preamble | NOT A FINDING | byte-identical → outside the entry set (1/1 if entered) | n/a | **NOT A FINDING** | yes |
| | steps 1–7 | TRIVIAL each | 0/2 · 0/1 · 0/5 · 0/5 · 0/1 · 0/9 · 0/1 → routes | step headings are labels; "Create the file." entails none of any step's items → 0/k each | **TRIVIAL** ×7 | yes |
| **G** | `#item-critical-wait-…` | TRIVIAL | 0/7 → routes | "Report that the task is complete" / "Leave a completed task unreported" entail no wait item. "Follow your team's conventions for authorization" is a reference to text not stated, so it entails nothing. The trigger line and group labels are labels → 0/7 | **TRIVIAL** | yes |
| **G′** | `#item-civitas-governance-health-check` | NOT TRIVIAL | 0/4 → routes (also routes under S3-A1) | `hc-1`–`hc-4` are re-keyed (their record, their interval, their steward, before work proceeds) → 4/4 | **NOT TRIVIAL** | yes |

**All eleven reproduce under the reworked text.** Every per-unit verdict reproduces too, including the two B-2 units that run 1 left judge-dependent.

**The attack, re-run**:
- **AX-1**: `includes` gives 15/30 and CLEARS. **The reworked assignment gives 14/30 and ROUTES** (15 credited items minus `lessons-learned-capture-2`).
- **The routed judgment on it, stated so it is not hidden**: under 5e the shared constraint is entailed for both items, so the judge counts 15/30. That is exactly half, not "fewer than half", so NOT TRIVIAL.
  - The mechanical property run 1 demanded holds: it no longer clears without a human.
  - The judged outcome at exactly half is 11.6.6(i)'s Goodhart residual ("retain 6 of 11 and pass"), reached by a human who can see it. Clause (iii) still flags the 16 uncited removals.

**Soundness spot-checks of the assignment**:
- **Identity renderings** (every recorded unit rendered as its own canonical text) → full credit on every unit of all four records. The assignment does not under-count a verbatim unit.
- **A containment and duplicate scan** across all four records → exactly one pair: `documentation-3` = `lessons-learned-capture-2`. No other identical, contained or overlapping item texts within any unit.

**Other checks**:
- **`npm run --silent check:completion-criteria-parity`** → `SUMMARY: parents evaluated 14, pass 14, fail 0; emissions 0; reds 0`. The rework touches no `tasks.md` criterion.
- **No `canonical/` change**: `git status --porcelain` before the checkpoint lists only `requirements.md`, `design.md`, `task-11-completion.md` and this doc.

### The run-2 request (to Stacy)

- **Please run G1 run 2 over all eleven exemplars.**
  - Record it at `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-2.md`, and update `re-grounding-c3-falsification.md`.
  - The state is the unit branch at this checkpoint's commit.
  - **Changed since run 1** (every other blob is as pinned in `task-12-1-completion.md`):
    - `requirements.md` → blob `deeb810b01f783118434780df0690638031b2108`;
    - `design.md` → blob `bf8d57b757d3d7def4b7e67e0f075742f9b6fca1`.
  - The records, notes, canonical sources and your 11.3 record are unchanged.
- **What changed, and why**: the edits above (B-1, B-2, grain, A-1, A-2, A-3), each traced to its run-1 finding.
- **What run 2 should attack again**:
  1. **B-1, closed?**
     - AX-1 must now route.
     - Attack the assignment: overlapping and contained texts, a shared text rendered twice in one sentence, an occurrence inside a gained quote, and occurrences that span two items' texts.
     - Is "any valid assignment is sound" true as worded?
  2. **B-2, determined?**
     - `#ios` and `#android` against your committed per-unit verdicts.
     - **Entailment's new surface is the clearing direction for the judgment**:
       - the "Wait for the user before continuing." compression of G (4/7 under 5e, by my reading);
       - a single sweeping statement that entails many items;
       - entailment through a surviving item that the rendering itself re-keys.
     - Is "a statement merely compatible does not retain" enough to stop over-credit?
  3. **5e's exclusions** — label, reference, bare goal. Is any gutting shape now credited because it falls outside those three?
  4. **5f.** Does the codified grain rule match what you settled in run 1, word for word in effect?
  5. **Re-check all eleven** against the reworked text: the re-derivation table above is mine, and the verdict is yours.
  - **Recusal as in 12.1**: I author no line of your records.

## Application-time adaptations

1. **11.7.2 was edited, outside the § 11.6 / § C18 pin**, because A-1 names that clause. It is the C3 floor's named limitation, in the same requirement. The pin was the text *under test*; 11.7.2 is its named limitation, and the verdict record addressed it to me.
2. **New sub-clauses 5e and 5f** were inserted before 5d, following the file's existing non-sequential ordering (5a, 5b, 5d, 5c). They are numbered to avoid renumbering the cited 5b, 5c and 5d.
3. **The superseded table rows are pointed to, not edited** (above). Stacy's run-1 standards implication 2 is **adopted as a pointer now**, and the fold into the table is deferred to the next requirements edit.
4. **Stacy's run-1 "Standards implications"** — one-line outcomes, under the composed-loop duty applied to a verdict record:
   - (1) **adopted**: this rework.
   - (2) **adopted as a pointer**: the table fold is deferred.
   - (3) **adopted**: the recurrence is noted against #220's lessons item; no new `tasks.md` edit.
5. **12.2 is not ticked.** The rework loop resolves only at a HOLDS or at branch A.

---

## Addendum 2026-09-27 — loop closed: G1 run 2

*Appended at the loop's close; the text above is unchanged.*

- **Run 2's record** (Stacy, `5a411450`): `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-2.md`. The current verdict is at `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md`. This doc cites them and does not paraphrase the verdict.
- **The loop resolved on the HOLDS branch**, so branch A was not invoked. Task 12.3 executes the HOLDS branch.
- **`k = 2`**: `G1 runs: 2` is read from the kept per-run records `…-run-1.md` and `…-run-2.md`, and the U2a PR body's tripwire line carries it.
- **M-1 fires**: Stacy's scoped post-acceptance read, recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md`, runs **after U2a is accepted** and never gates the U2b cut.
  - Its set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ the Tasks 10–11 Primary Artifacts.
  - The rework (`a5d1d2a5`) touched no Task 10 or Task 11 Primary Artifact: `git show --name-only a5d1d2a5` → `requirements.md`, `design.md`, `task-11-completion.md` and `task-12-2-completion.md`. So the expected set is empty, which means **Task 12 only**.
- **Run 2's carried items** are listed by finding id in `task-12-completion.md` § "Carried items". They are not fixed on this branch: a C3 edit now would reopen G1.
- **12.2 ticked.**
