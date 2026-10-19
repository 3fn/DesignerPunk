# Operative-set confirmation — `start-up-tasks` (C1 carve-out)

**Record**: `canonical/operative-sets/start-up-tasks.yaml`
**Source**: `.kiro/steering/start-up-tasks.md`. This is an always-set member. Under path (B) (Req 12.1a), the shipped doc is the canonical counterpart.
**Owner**: Thurgood, because this is a Civitas governance-layer doc. **Profile author**: Thurgood.
**Confirmer**: **Stacy**. Under C1 (Req 11.6.5d; design C16), the owner is the profile author here, so the counterpart verification seat confirms.
**Date**: 2026-09-27 · Spec 123 Task 11.3
**Scope**: the two units that carry exemplars G and G′ only. The rest of the doc's units are confirmed at 15.4.
**Format**: each unit block opens with `confirmer:`, `canonicalHash:`, `items:` and `date:` lines (Thurgood's 11.1 convention). They were added at 11.2 so the confirmation check can be mechanical. The confirmed content did not change.

**Closed-negative disclosure (S-D-A11)**: *not independently re-verified. Confirmed by the auditing seat.* I confirm these two operative sets, I constructed exemplars G and G′ on them, and I run G1 over them.

**Seat reach (C16, stated at its true reach)**: this note lands in its own `Agent: stacy` commit. That separates the seats. It does not authenticate them, because one git identity cannot show which seat wrote a file. The open obligation still applies: interim records are re-attested once when 125-B U3 lands.

## How I classified the items

- **The criterion is normativity, not form (5c).** An item is operative if and only if a consumer implementation could violate it. I counted items. I did not check kinds (11.6.2).
- **Each item's `text` is the complete operative text** (C16's one dependence).
  - A **condition that scopes an obligation** is part of that obligation's text. `wait-1` therefore carries its `WHEN … THEN you MUST:` line.
  - A **pure group label** is not part of any item's text, because each member states its own modality (`must`, `Do NOT`, `❌`). `**User Authorization Required:**` and `**NEVER do this:**` are pure group labels.
  - The item's own title line (`N. **…**`) is a label, and clause (c) discounts it.
- **List markers are formatting**, so item texts start after the `- `.
- **Every `text` is a verbatim substring of its unit, and every hash is the unit's exact bytes.** I checked both mechanically (see the construction record).

## `#item-critical-wait-for-user-authorization-before-starting-new-tasks`

confirmer: stacy
canonicalHash: sha256:5b862be78bc845ce6770093cc0affb912163fe10eafae3ea84f52d46419bbc32
items: wait-1, wait-2, wait-3, wait-4, wait-5, wait-6, wait-7
date: 2026-09-27

- **canonicalHash**: `sha256:5b862be78bc845ce6770093cc0affb912163fe10eafae3ea84f52d46419bbc32` (body lines 20–49)
- **Operative items: 7.** `wait-1` … `wait-7`.

| id | Kind | Why it is operative |
|---|---|---|
| wait-1 | obligation | An agent that reports completion and keeps going violates it. The `WHEN` trigger is part of the text. |
| wait-2 | obligation | Auto-advancing through the task list violates it. |
| wait-3 | obligation | Treating silence or momentum as consent violates it. |
| wait-4 | obligation | Taking an implicit signal as authorization violates it. The required form is an explicit request. |
| wait-5 | member | Announcing completion and starting the next task in the same turn violates it. |
| wait-6 | member | Preparatory reading for the next task violates it. This is narrower than wait-2 and still a separate prohibition. |
| wait-7 | member | Starting implementation with no explicit request violates it. |

**Excluded as non-operative**:
- The three `User may want to …` bullets. They give the reasons for waiting, and nobody can violate a reason.
- The `**Example Completion Pattern:**` block. It illustrates wait-1, and its closing `[STOP HERE …]` line repeats wait-1 without adding a constraint.
- The item title and the two pure group labels.

## `#item-civitas-governance-health-check`

confirmer: stacy
canonicalHash: sha256:431d69a79f5a20615aeea797e290d1ed6f45e7e887e8bb43b4399336e363098a
items: hc-1, hc-2, hc-3, hc-4
date: 2026-10-17

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the cadence marker left the unit. Item 2 now tests the newest record in `.kiro/docs/civitas-health-checks/` instead of a typed date, and its footnote names the committed record as the date. Ballot `.kiro/docs/ballots/2026-10-17-no-volatile-metadata-in-signed-units.md` (RATIFIED, Peter, 2026-10-17, #393) §§ 3.1 and 3.3; authoring commit `0274210a8` (Thurgood, profile author), which also re-authored the texts of `hc-1`, `hc-3` and `hc-4` (signing-act ballot § 2 clause 4: items are authoring). `hc-2` did not change. The canonicalHash moves from `sha256:81d0a007…6c06552b` to the value above.
- **Re-ruled against the new text**: the same four functions, at the same seams. All four texts are verbatim substrings of the unit, one occurrence each, and together with the title and the `THEN flag:` seam they cover every sentence of the unit.
  - `hc-1`: the overdue test now reads the newest record's filename date; the duty to flag is unchanged. Its label still says "cadence marker"; labels are never matched (§ 3.3), so I leave it and say so.
  - `hc-3` now carries two clauses: only the steward runs the check, and the check's committed record is the date. I keep them as one item. Both bind the steward's run, and an agent violates the item by breaking either (running it from a non-steward seat, or typing a date instead of committing a record). Splitting would add an item without changing what a signature must account for, since a rendering that drops either clause cannot be credited with `hc-3` as written.
  - `hc-4`: the universal duty now names the read (the newest record's filename) instead of "check the date"; it stays wider than `hc-1`'s conditional flag.
- **The table below is updated to the new text**; the `[2026-09-19]` marker it cited no longer exists in the unit.

**Ruling: CONFIRMED at 4 items** (`hc-1`, `hc-2`, `hc-3`, `hc-4`).

- **canonicalHash**: `sha256:431d69a79f5a20615aeea797e290d1ed6f45e7e887e8bb43b4399336e363098a` (body lines 13–18 at this revision; was `sha256:81d0a007…6c06552b`, body lines 14–19)
- **Operative items: 4.** `hc-1` … `hc-4`.

| id | Kind | Why it is operative |
|---|---|---|
| hc-1 | obligation | Not flagging past the interval violates it. It covers the interval test against the newest health-check record (its `YYYY-MM-DD.md` filename is the date), and the duty to flag. *(Re-stated 2026-10-17; it cited the marker `[2026-09-19]`, which left the unit.)* |
| hc-2 | route | This is the flag's content. It routes the overdue check to the steward and orders it before proceeding. Flagging the wrong party violates it, and so does proceeding past the flag. |
| hc-3 | obligation | A non-steward agent running the health check violates it, and so does a steward run that leaves no committed record (the record is the date). |
| hc-4 | obligation | Any agent that skips reading the newest record violates it. This duty is universal, so it is wider than hc-1's conditional flag. |

**Decomposition note**: hc-1 and hc-2 come from one sentence. I split them at `THEN flag:` because the message carries a separate function: the route to the steward and the before-proceeding order. Each piece is a verbatim substring. Taken together they are the complete sentence, so no remainder is truncated. Splitting makes the denominator larger. That makes clearing harder, never easier, so the split is safe for the denominator attack in 5d.

**Excluded as non-operative**: the item title `2. **Civitas Governance Health Check**`.

## `#start-up-tasks:preamble`

confirmer: stacy
canonicalHash: sha256:9639643088d6d09683cc3c51a8bb0dd559413225f673b7c3c6d690aa8738f2ee
items: none
date: 2026-10-17

**Re-confirmed 2026-10-17 (Req 11.6.5d).**
- **What changed**: the body line `**Last Reviewed**: 2026-09-29` left the unit; the stamp now lives in the YAML frontmatter as `lastReviewed:`, which `splitFrontmatter` keeps outside `canonicalHash`. Ballot `.kiro/docs/ballots/2026-10-17-no-volatile-metadata-in-signed-units.md` (RATIFIED, Peter, 2026-10-17, #393) § 3.2; authoring commit `0274210a8` (Thurgood). No other text in the unit changed. The canonicalHash moves from `sha256:0001b5d0d0c61157fefff63a04af1d2f17f3d0031dd04c46d8ead8bab938cea4` to the value above.
- **Re-ruled**: what remains is the title and the metadata block (`Date`, `Purpose`, `Organization`, `Scope`, `Layer`, `Relevant Tasks`). No agent acts against doc metadata; the Purpose line's end-of-task pointer is orientation. The removed line was never an item. The zero stays declared (5d).

**Ruling: CONFIRMED at 0, declared.**

**Ruling: CONFIRMED at 0, declared.** Doc metadata. Its end-of-task pointer is orientation.

## `#item-check-the-current-date`

confirmer: stacy
canonicalHash: sha256:9a9fc4aa0317a163d7b39e97d9965444f12795d0f68b72b4b77b84e69f498941
items: check-the-current-da-1
date: 2026-09-29

**Ruling: CONFIRMED at 1, as drafted.** The title line is the whole instruction.

## `#item-critical-this-project-uses-jest-not-vitest`

confirmer: stacy
canonicalHash: sha256:f75f87b00a0dafa053d0b2da2229ab451e79ced7621723927163505605e171d0
items: critical-this-projec-2, critical-this-projec-3, critical-this-projec-4, critical-this-projec-5, critical-this-projec-6, critical-this-projec-7, critical-this-projec-8, critical-this-projec-9, lane-semantics, pre-july-void, critical-this-projec-10, critical-this-projec-11
date: 2026-09-29

**Ruling: CORRECTED 11 → 12.**
- Removed `critical-this-projec-1`: the item's own title line, a label under the 11.3 convention. Its content is restated by `-2`.
- Added `lane-semantics` and `pre-july-void`.
- **Not operative**: the ✅/❌ group labels, the "Key difference" explanation (it restates `-10`/`-11`), and the historical note.

## `#item-test-command-selection-guidelines`

confirmer: stacy
canonicalHash: sha256:3df356662cb6f1dbb2a10bd046eada681e3cac69ead4d3f3f2ffff6187bc47db
items: test-command-selecti-2, test-command-selecti-5, test-command-selecti-6, test-command-selecti-7, test-command-selecti-8, decision-tree, test-command-selecti-9, test-command-selecti-10, test-command-selecti-11, default-assumption
date: 2026-10-19

**Re-confirmed 2026-10-19 (Req 11.6.5d).**
- **What changed**: item 5's text, by ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S1 (RATIFIED, Peter, 2026-10-18/19), applied by Thurgood at `4f6de10f8`: the "regular task completion" branch becomes "WHEN validating a subtask THEN run targeted tests relevant to the change, not the full suite" (Task Completion Protocol § "For SUBTASKS", step 1), the parent branch is scoped to parent tasks, and the decision tree's non-parent leaf reads "targeted tests". The canonicalHash moves from `sha256:b4c82938bb3f353c5f5b20b055bddfd411f747dc8ab748e7bbe89cb86c9e6974` to the value above, as `operative-set-freshness` printed it and as recomputed with `partition` + `regrounding/hash.ts`.
- **Items stay at 10; ids unchanged, texts moved**: `test-command-selecti-2` is now "Run targeted tests for a subtask" and `decision-tree` carries the new leaf. Every one of the 10 items is a verbatim substring of the unit and occurs once (checked with check-items against the current tree).
- **Item grain unchanged**: `-2` stays one `obligation` (its `WHEN … THEN` condition travels with it, the 11.3 convention); `decision-tree` stays one `step`.
- **Consumer rendering (my decision, stated for the disposition)**: the consumer rendering does not change. The overlay prose already reads the subtask rule as the Task Completion Protocol does (the consumer TCP overlay's `#for-subtasks` carries it, so the overlay adds no second pointer), hence the overlay changes its `@ sha256:` pin only. `test-command-selecti-2` was dropped on 2026-09-29 because it said "regular task completion → npm test"; it now says targeted tests for a subtask and joins the survivors (6 → 7). `decision-tree` names DesignerPunk's lanes and stays out. The pin and the re-sign follow in later turns.

**Ruling: CONFIRMED at 10 items.**

**Confirmed 2026-09-29 (prior record, superseded)**: canonicalHash `sha256:b4c82938bb3f353c5f5b20b055bddfd411f747dc8ab748e7bbe89cb86c9e6974`, 10 items.

**Ruling: CORRECTED 11 → 10.**
- Removed `-1` (the title line), and `-3` and `-4` (rationale about `npm test`).
- Widened `-2`, `-5` and `-7` to carry their `WHEN … THEN` conditions (the 11.3 convention).
- Added `decision-tree` and `default-assumption`.

## `#item-delegation-and-model-tier-before-delegating-and-before-deciding-whether-to`

confirmer: stacy
canonicalHash: sha256:289ce23ec97eeb4f98c1bfb0a92a60668e2360c4bd0ac6b010f55c200b8baf65
items: first-ask-whether, delegation-and-model-2, delegation-and-model-3, delegation-and-model-4, delegation-and-model-5, delegation-and-model-6, delegation-and-model-7, policy-query
date: 2026-09-29

**Ruling: CORRECTED 7 → 8.** Removed `-1` (the title line). Added `first-ask-whether` and `policy-query`.

## `#item-ending-a-task-see-task-completion-protocol`

confirmer: stacy
canonicalHash: sha256:7c5b774f2a602dcd9239360a7e68f90273cc300c0e12e7f281c45ce2cdf44649
items: ending-a-task-see-ta-2, follow-tcp, ending-a-task-see-ta-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, recomposed.** Removed `-1` (the title line) and added `follow-tcp`.

## `#item-starting-a-parent-task-write-its-instruments-block-first`

confirmer: stacy
canonicalHash: sha256:450bc8ccda0592e81e09ec9b06ec82b08cf7c6a8512572d7a7674f27df86a2d2
items: write-block, missing-stops, starting-a-parent-ta-2, starting-a-parent-ta-3, format-route, starting-a-parent-ta-4
date: 2026-09-29

**Ruling: CORRECTED 4 → 6.** Removed `-1` (the title line). Added `write-block` (the rule's main obligation, missing from the draft), `missing-stops` and `format-route`.
