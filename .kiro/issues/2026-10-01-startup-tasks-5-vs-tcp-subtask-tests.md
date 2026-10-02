# Issue: the always-loaded law contradicts itself on test scope — Start Up Tasks #5 says `npm test` for task completion; Task Completion Protocol says targeted tests, not the full suite, for subtasks

**Date**: 2026-10-01
**Status**: ACTIVE
**Owner**: Thurgood (drafts the ballot; both docs are Civitas governance-layer identity docs). **Decision**: Peter. Ratification is by ballot (`.kiro/docs/ballots/README.md`); an edit to either doc is an edit to a signed identity doc in the consumer profile (see "What an edit costs").
**Trigger**: **U2b's unit PR merges** (Spec 123, `task/123-u2b-profile`). At that event the ballot draft for this item is written on a branch and its option set is in front of Peter; the pick itself is not required at the merge. Why this event and not another:
- Before the merge, any edit to either doc stales Stacy's signed units on U2b's critical path (the cost table below), for a tension that has stood in the law since the subtask step was written. The merge is the first point at which the edit stops being a blocker and becomes an ordinary governance change.
- The tension is already in the always-loaded identity set every agent reads, and U2b's profile carries both docs into release 2. A consumer agent reads the contradiction as written until an edit lands; the later the pick, the more installed copies carry it. That is the honest cost of this trigger, stated rather than waved off.
- The ballot's **decision deadline** is the next ballot that edits either doc, whichever comes first: that ballot carries this pick as a rider so the re-sign is paid once. If the draft exists at the merge and no such ballot is open, Peter's pick is the next event.
**Source**:
- **Stacy's finding at Task 15 phase-two signing** (Spec 123, U2b), carried in `.kiro/specs/123-consumer-distribution/completion/task-15-completion.md` L119: "the Start Up Tasks #5 vs TCP subtask-tests tension (Thurgood drafts)" (on U2b's unit branch, reaching `main` at U2b's merge; read with `git show origin/task/123-u2b-profile:<path>`).
- **Peter's direction** (2026-10-01): carried items that live only in completion docs are captured as tracked issues by their owners.

---

## The two lines

Cited from this worktree (branched from `main` at `dff78bcd`):

- **`.kiro/steering/start-up-tasks.md` L79–80**, item 5 "Test Command Selection Guidelines":
  > **WHEN validating regular task completion THEN:**
  > - Use `npm test` (default - excludes performance tests)

  L81–82 add that this is "Fast, deterministic feedback loop (~1 minute warm)" and "Sufficient for most development validation". L84–86 then scope the **parent** case separately ("WHEN validating parent task completion THEN: Default: Use `npm test`"), and L108 repeats "Use `npm test` for parent tasks unless working on performance systems". The decision tree (L92–100) has a parent branch and a non-parent branch, and both non-performance leaves read `npm test`.
- **`.kiro/steering/Task-Completion-Protocol.md` L37**, § "For SUBTASKS" step 1:
  > 1. [ ] Run targeted tests relevant to the change (not the full suite)

  L150 restates it: "subtasks get targeted tests + a completion doc + an **optional, judgment-based** branch commit-and-push". Start Up Tasks #4 L65 also names the targeted form (`npm test -- <test-file-path>` — "Run specific test file").

**The contradiction, stated precisely.** "Regular task completion" in #5 is undefined, but #5 distinguishes it from "parent task completion", so it plainly covers subtasks. For a subtask, #5 (L80) says `npm test` and the TCP (L37) says "not the full suite". The two docs each say they own their half (TCP's preamble: Start Up Tasks owns the **start**, TCP owns the **end**), and test selection is at the boundary: Start Up Tasks #5 is a pre-task checklist item but its text governs the validation at completion. Neither doc defers to the other.

**Who it bites.** An agent finishing a subtask reads both, and the two instructions cannot both be followed to the letter. In practice an agent either runs a full ~1 minute suite on every subtask (the TCP's "not the full suite" is violated and the cost is real over a 10-subtask parent), or runs only targeted tests and treats #5 as parent-only (Start Up Tasks #5 L80 is violated as written). Stacy met it at signing time as a drafting question: which line is the operative text for the consumer overlay's subtraction rows? Either answer was a judgment, which is the defect.

## What an edit costs (the signed-unit surface)

Read from the operative-set records on U2b's unit branch (`canonical/operative-sets/task-completion-protocol.yaml`, `canonical/operative-sets/start-up-tasks.yaml`); **the staleness below is read from the unit anchors, not simulated** — the ballot draft must simulate it on a throwaway worktree of the merged tree, as the signing-act ballot did for F-2.

- **TCP L37 lives in the unit `#for-subtasks`** (item `for-subtasks-1`, text "Run targeted tests relevant to the change (not the full suite)"). An edit to it stales that unit's `canonicalHash`, the confirmer's (Stacy's) operative-set confirmation, her signature, and the consumer overlay's pin: three acts by two seats under the signing-act rule (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md`), the same shape its § 11 measured for F-2.
- **Start Up Tasks #5 lives in a numbered-item unit** of `start-up-tasks.md`. The operative-set file read here records only the two exemplar units (wait-for-authorization, Jest-not-Vitest); the other items' records are authored at 15.4, so the exact anchor and its re-sign cost for #5 are **not verified in this issue**. Counted as at least the same three acts until the ballot measures them.
- **The F-2 rider does not ride this edit for free.** The signing-act ballot's F-2 (b) carries the TCP "pointer" clause as a rider "on the next TCP edit that already stales `#coherent-units-the-merge-granularity`" (`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 11, F-2). An edit to `#for-subtasks` stales a **different unit**, so adding the pointer there would stale a **second** unit in the same commit: the rider's whole premise (pay one re-sign cycle) holds only if the test-scope fix also touches `#coherent-units-…`, or if Peter accepts two stale units in one change. That is a fork the ballot draft must surface, not a thing this issue decides.
- **Why this is a charge on U2b, not a free fix**: the order matters. If the fix lands on U2b's branch, the re-sign sits on its critical path (the cost U2b's trigger above avoids); if after, it is a post-merge re-sign across the same units, which the signing-act rule already provides for.

## Options (drafted, not picked — the pick is Peter's)

All three resolve the text; they differ in which doc owns test scope and how many signed units they stale.

### A. Scope Start Up Tasks #5 to parent tasks
Change L79 to "WHEN validating **parent** task completion", delete or fold the "regular task" branch (L79–82) and the decision tree's non-parent leaves, and let the TCP's subtask step own the subtask case.
- **Cost**: one Start Up Tasks edit (one signed unit at minimum, anchor to be measured); TCP untouched, so the F-2 rider has no home in this change. Smallest in re-sign acts (one doc).
- **Surviving counter-argument**: #5's decision tree and the "Key distinction" block (L102–106) are built around the regular-vs-parent split, so removing the regular branch means reworking the tree, not one word; and it makes a pre-task checklist item silent on a case the TCP then has to carry alone. It also leaves the TCP's "not the full suite" unqualified, which is the wrong default for widely-used code (see C).

### B. Add a "full suite when the change is widely used" clause to the TCP subtask step
Keep L37, amend it: "Run targeted tests relevant to the change (not the full suite — **unless the change touches widely-used code, then run `npm test`**)", and leave #5 as the parent/default rule with a pointer ("subtasks: see TCP § For SUBTASKS").
- **Cost**: one TCP edit (unit `#for-subtasks`: three acts, two seats). Fits the F-2 rider only if the pointer is also added to `#coherent-units-…` in the same commit (a second stale unit).
- **Surviving counter-argument**: "widely used" is an interpretation question the verifier raises every time it appears — the charter's boundary bound 1 says an interpretation question raised more than once is **a defect in the text**, so this option may import a new one. It also encodes the project memory's lesson (run the full suite for widely-used code) as law, which is a standard Peter has not ratified here.

### C. One doc defers to the other
Make TCP L37 read "…(test command selection: Start Up Tasks)" and let #5 own both cases, with a scoped `npm test -- <path>` sentence for subtasks; or the reverse, with #5 deferring to the TCP.
- **Cost**: two docs may change (the deferral pointer and the owner's new text), so up to two signed-unit stales (six acts across two seats) in the worst case; one if the deferring doc's text is only a pointer.
- **Surviving counter-argument**: a pointer rather than a rule is exactly how the TCP and Start Up Tasks drifted apart (each says "the other owns it"); a deferral keeps the single-owner shape but makes every reader follow a hop for a line they need every subtask.

### Thurgood's lean, and what survives
**A, with a one-clause TCP echo only if a TCP edit is happening anyway** — #5 is the doc whose text is wrong about its own scope, the TCP line is the older and more specific rule, and A is the fewest signed units. Working my own counter-argument against it changed the lean: I first leaned to B, then dropped it because "widely used" is undecidable without the author. **What survives**: A leaves "not the full suite" unqualified for a change that reaches many consumers, so the memory's lesson ("targeted checks miss blast-radius regressions") stays advice, not law; and my lean is formed as the author of the units it would edit, so I may weigh the re-sign cost more heavily than a reader would.
- **A fork this exposes, surfaced not picked**: whether the fix rides this issue's own ballot (paying a re-sign now or at the post-merge cycle) or waits for the next ballot that edits either doc (paying nothing extra, but leaving the contradiction in release 2's installed copies). The first is a governance cost, the second a latent-contradiction cost; the pick is Peter's.

## Not in scope here

Any edit to `.kiro/steering/start-up-tasks.md`, `.kiro/steering/Task-Completion-Protocol.md`, their canonical operative-set records, the consumer overlay, or the signed units. This issue is the tracked flag, the cited lines and the option set. The ballot draft is Thurgood's; the ratification and the pick are Peter's.
