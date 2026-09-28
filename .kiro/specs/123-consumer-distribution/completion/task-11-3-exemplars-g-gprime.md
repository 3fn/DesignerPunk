# Task 11.3: Exemplars G and G′, with their constructions and required verdicts

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Parent**: Task 11 · **Author**: Stacy (Opus). I own the exemplars (Req 11.6.8), and G and G′ are my constructions (S-T6).
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy`, cut from `task/123-u2a-g1` @ `285d8bd4`
**Status of the verdicts**: **REQUIRED verdicts, committed before G1 runs** (the 11.6.5 table rule). **G1 has not run.** This record states what the definition must reproduce. It is not a G1 result, and Task 12 cites it; it never paraphrases it.

**Closed-negative disclosure** (S-D-A11; Task 12's record carries the same line): *not independently re-verified. Confirmed by the auditing seat.* I confirmed exemplars A–E, G and G′. I constructed G and G′. I run G1 over all eleven.

---

## The units

Both units are enumeration-kind item units of an always-set member. Their source is `.kiro/steering/start-up-tasks.md`, the canonical counterpart under path (B).

- **Addresses resolved by Task 10's partitioner** (`splitFrontmatter` → `partition`, run at `285d8bd4`). The Task 10 golden test `the start-up-tasks item anchors Task 11 names (G and G′) exist` asserts the same two anchors.

| Exemplar | Anchor | Body lines | canonicalHash | Operative items |
|---|---|---|---|---|
| **G** | `#item-critical-wait-for-user-authorization-before-starting-new-tasks` | 20–49 | `sha256:5b862be7…19bbc32` | 7: `wait-1`…`wait-7` |
| **G′** | `#item-civitas-governance-health-check` | 14–19 | `sha256:81d0a007…c06552b` | 4: `hc-1`…`hc-4` |

- **Operative sets**: `canonical/operative-sets/start-up-tasks.yaml`.
- **C1 confirmation, with classification reasons**: `canonical/profiles/consumer/confirmations/start-up-tasks.md`.
- **Why the pair exists** (S-T6): G alone would let a rule that calls every enumeration unit "trivial" pass on this unit kind. G′ is the opposite-direction case, playing E's role for this kind.
- **What they add to G1's domain line**: always-set members and enumeration-kind units were "not exercised" by the nine-exemplar set (design § "Gates and sequencing"). G and G′ exercise **enumeration-kind item units on one always-set member, the operational-law checklist.** They do not cover the other eight always-set members, and they do not cover preamble units on always-set members.

---

## G: the gutted rendering (required verdict **TRIVIAL**)

**Construction.** The rendering keeps the item title, which spells out the obligation, verbatim. It keeps the `WHEN … THEN you MUST:` trigger line verbatim, both group labels, and the first line of the example block. Every obligation under them is emptied. Some are replaced with tautologies. `wait-4` is re-pointed to an unspecified external norm (*"your team's conventions"*). Nothing in the rendering is repo-specific.

This is a realistic gutting. A profile author who reads the authorization rule as "DesignerPunk's workflow, not the consumer's" and defers it to the consumer's own practice produces this shape. It is Lina-2's shape carried over to the enumeration kind: the labels survive, and their contents do not.

<!-- G-rendering:begin -->
````text
3. **CRITICAL: Wait for User Authorization Before Starting New Tasks**
   
   **WHEN reporting the completion of a task THEN you MUST:**
   - Report that the task is complete
   
   **User Authorization Required:**
   - Follow your team's conventions for authorization
   
   **Example Completion Pattern:**
   ```
   ✅ Task 2.2 Complete: Implemented Icon iOS confirmed actions
   ```
   
   **NEVER do this:**
   - ❌ Leave a completed task unreported
````
<!-- G-rendering:end -->

**Strict floor (5b's mechanical half)**: **0 of 7** items retained verbatim, checked mechanically below. 0/7 is below half, so the unit **ROUTES**. None of the removals cites subtraction 1–4, because the unit contains nothing repo-bound. The clearing rule's second condition is therefore met, and the ratio alone decides the route. *(Clause (iii) separately flags the uncited removals. G1 tests only the definition.)*

**Routed judgment (5b's semantic correspondence rule), item by item**:

| Item | Canonical function | In the rendering | Function survives? |
|---|---|---|---|
| wait-1 | At completion: stop, and wait for authorization before the next task | The trigger line is kept verbatim. Its obligation is replaced by *"Report that the task is complete"*, which restates the trigger. There is no stop and no wait. | **No.** Clause (c): the retained trigger line has emptied content. |
| wait-2 | Do not auto-advance through the task list | Absent | **No** |
| wait-3 | Do not assume continuation | Absent | **No** |
| wait-4 | Authorization means the user explicitly requests the next task | *"Follow your team's conventions for authorization"* | **No.** This is a pointer to an unstated norm, not the obligation re-keyed. No explicit-request requirement survives. It is clause (c) at member grain: the word "authorization" is kept and the content is empty. |
| wait-5 | Never announce-and-start | Replaced by a different prohibition (*"Leave a completed task unreported"*) | **No** |
| wait-6 | Never read ahead for the next task | Absent | **No** |
| wait-7 | Never implement without an explicit request | Absent | **No** |

- **Judged: 0 of 7.** The most lenient defensible reading reaches **1 of 7**, by counting wait-4's re-pointing as re-grounding. **For the verdict to flip, a judge who respects clause (c) would have to find 4 of 7 surviving.**
- **Label-retained, content-empty lines, all discounted by clause (c)**: the title, the `WHEN` trigger line and the two group labels.
- **Retained non-operative text earns nothing.** The first line of the example block survives verbatim, but it is outside the fixed operative set (5d), so it adds nothing to the count.

**Required verdict: TRIVIAL.**
- **Producing clauses**: **(b)**, because 0 of 7 is below half, reached through **5b** (below the strict floor → routed → no function survives).
- **Clause (c) is verdict-bearing**, as it is for Lina-2. The retained title and group labels name every obligation in the unit. A judge who counted a retained label as its members' retention could reach 4 of 7 or more from the labels alone. Only clause (c) keeps G trivial.

---

## G′: the honestly re-grounded rendering (required verdict **NOT TRIVIAL**)

**Construction.** Every function is re-keyed to the consumer's repo, and no item's text is kept verbatim:

- the last-check marker `[2026-09-19]` becomes the date in *their* health-check record;
- the fixed 30-day interval stays as the default, and *their* recorded cadence can replace it;
- *Thurgood (Civitas steward)* becomes *their* designated governance steward;
- "monthly" and the Civitas name are dropped as our cadence and instrument;
- the flag's routing and its before-proceeding order are kept, re-addressed.

This is E's mirror for the enumeration kind.

<!-- Gprime-rendering:begin -->
````text
2. **Governance Health Check**
   
   Look up the date of the most recent entry in your repository's governance health-check record. IF more than 30 days have passed since that entry (or more than the interval your team has recorded for health checks), THEN raise this flag before doing anything else: "Governance health check overdue — your repository's governance steward should run the health check before work proceeds."
   
   *The health check is run only by your repository's designated governance steward. Every agent checks the date in the health-check record and raises the flag when the check is overdue.*
````
<!-- Gprime-rendering:end -->

**Strict floor**: **0 of 4** items retained verbatim, checked mechanically below, so the unit **ROUTES**.
- It **routes on a second, independent ground** as well: its removals cite repo-specifics subtractions, and under S3-A1 a unit with any such removal routes regardless of its ratio.
  - **subtraction-2** (an authority claim naming this repo's people): *Thurgood (Civitas steward)* in hc-2, and *Thurgood* in hc-3.
  - **subtraction-3** (our stewardship cadences and instruments as obligations): the `[2026-09-19]` marker in hc-1, "monthly" in hc-2, and "Civitas" in the title.

**Routed judgment, item by item**:

| Item | Canonical function | Re-keyed rendering | Function survives? |
|---|---|---|---|
| hc-1 | Test the interval since the last check against the marker; flag if more than 30 days | The date comes from *their* record; more than 30 days, or *their* recorded interval; raise the flag | **Yes.** The same conditional duty, re-keyed. |
| hc-2 | The flag routes the overdue check to the steward, before proceeding | The flag names *their* governance steward and *"before work proceeds"*; the flag is raised *"before doing anything else"* | **Yes** |
| hc-3 | Only the steward runs the check | *"run only by your repository's designated governance steward"* | **Yes** |
| hc-4 | Every agent checks the date and flags if overdue | *"Every agent checks the date … and raises the flag when the check is overdue"* | **Yes** |

- **Judged: 4 of 4.** A judge who withheld hc-1, on the grounds that the recorded-interval option changes the threshold, still reaches **3 of 4**. **For the verdict to flip, a judge would have to deny 3 of the 4.**

**Required verdict: NOT TRIVIAL.**
- **Producing clause**: **5b**. G′ is below the strict floor (0/4), and it routes on the S3-A1 ground as well. The semantic correspondence rule then finds every function surviving in re-grounded form. **No false finding is filed.**
- *Required, not current*: under a purely mechanical reading, G′ would score 0/4 and be called trivial. That is the E failure, and G′ exists to catch it.

---

## What G and G′ cannot discriminate (stated so no one over-reads the pair)

- **The threshold.** G lands at 0/7 and G′ at 4/4, so every threshold in (0, 1] gives the same verdicts. The pair repeats 11.6.6(i)'s finding: the exemplar set does not discriminate the number.
- **Inflation from entailment across redundant items is not tested.** I record this as a named question for G1, not as a twelfth exemplar; the plan asserts the count at eleven, and adding one needs a tasks amendment from Peter.
  - **The construction changed from my tasks-round sketch** (`feedback/tasks.md` § "(b) Input 7"). The sketch rendered G as the single sentence *"Wait for the user before continuing."*
  - **Worked item by item, that sentence is judge-dependent.** A strict judge finds 1 of 7 (wait-1). A judge who counts entailment finds wait-2, wait-3 and wait-5 surviving too, because each follows from "wait before continuing". That gives **4 of 7, which is not trivial.**
  - **So the sketch cannot carry a required verdict**, and I replaced it with the (c)-shaped construction above. The unit, the required verdict, and my stated count of about 7 operative items are unchanged.
  - **The question the sketch exposes is real, and it belongs to G1**: *does an item survive by entailment from another item's surviving rendering?* 11.6.2 says items are "counted, never kind-checked". It does not say whether one surviving sentence can discharge several redundant items. **I am naming it here, before the run**, so that G1 either answers it or reports that it could not, and cannot drop it quietly.

---

## Mechanical checks (run at this commit's parent, `285d8bd4`, in the worktree)

The script is described in the 11.3 subtask doc (`task-11-3-completion.md`). Results:

- **Both anchors resolve** under `partition()`, and **both canonicalHash values match** `sha256(unit.text)`.
- **All 11 item `text` values are verbatim substrings of their unit.**
- **Both `confirmation:` fragments resolve** to headings in the confirmation note.
- **Strict retention over the committed renderings above**: **G = 0/7; G′ = 0/4.**
