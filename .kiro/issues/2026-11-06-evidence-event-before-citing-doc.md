# Issue: a criterion's evidence can depend on an event that cannot occur before the doc that cites it is committed

**Date**: 2026-11-06
**Owners**: Thurgood, Stacy. Thurgood holds the planning-standard half (what a `tasks.md` criterion must satisfy at formalization); Stacy holds the LENS half (the tasks-round read that checks it). Each half's text is its holder's; the record is co-authored under `.kiro/issues/README.md` rule 9.
**Class**: P2 obligation (guard) · charter
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements. The first commit that adds them takes this record in, or leaves it out with a reason (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec"). At that event the owners close this record into 131 under rule 5, or re-rule it with a dated reason.
**Source**: Peter, verbatim, "let's also proceed with the class option" (his full answer: "1 A, 2 yes, 3 stand, 4 (b), 5 no rewrite; let's also proceed with the class option"), `date -u` at receipt 2026-11-06T14:04:52Z (orchestrator relay; **UNVERIFIED** beyond the relay). The class option, as he read it: a record now, owner Thurgood, co-owner Stacy, Trigger 131's requirements round.

---

## The class

A criterion is only as good as the event that produces its evidence. If that event cannot occur before the completion doc citing it is committed, the criterion can never be met as written. The parent then closes with a ⚠️ it was always going to carry, or with an evidence cell that misdescribes where the run happened. Today no check in formalization or in the tasks-round LENS asks the question.

**The check, as proposed** (Stacy's wording, from the 2026-11-06 consult): *for each evidence item, name the event that produces it, and check that the event can occur before the citing doc is committed.*

---

## Spec 129's three instances (2026-11-06)

1. **The dispatch limit.** U1's plan dispatched `native-harness.yml` against the unit branch before U1's PR opened (`tasks.md` Conventions; Task 5's forced-failure run and first full run; Req 2.11). GitHub triggers `workflow_dispatch` only for a workflow whose file is on the default branch (`.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` L197), and U1 creates the file. Formalization (Thurgood), the tasks round and its LENS (Stacy, Kenya, Data) all missed it. It surfaced at U1's execution. The repair is Spec 129 tasks amendment 2 (a dispatch stub on `main`, `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md`).
2. **Task 2's criterion 16, its second half** ("the `lane-functional-root` run on the U1 PR shows them selected"). Task 2 is a non-gating parent, so its doc is committed before U1's PR exists. The criterion was ⚠️ by construction. It is recorded as instruments row 21 (`MISSING`) in `.kiro/specs/129-consumer-generation-completeness/completion/task-2-instruments.md`, and is discharged by an in-place amendment after PR-open.
3. **Kenya's Xcode 26.6 fixture** (`tasks.md` 2.2's bullet). It is an obligation in a subtask bullet that no parent criterion covered, so no completion table would have tracked it. Its evidence (a CI log under the pinned Xcode) could not exist before Task 5's first full run. Tasks amendment 2 moves it into a Task 5 criterion.

---

## What the owners propose for 131 to weigh (not law)

- **Thurgood's half (planning standard)**: in `tasks.md` formalization, each criterion names its evidence event where the event is not a local command (a CI run, a PR run, a dispatched run, a merge). A criterion whose event cannot precede its parent's completion commit sits on the gating parent, under the H convention, or is written as an in-place amendment owed before the unit merges. An obligation stated only in a subtask bullet either has a parent criterion or is marked as not a criterion. Home: `governance/Process-Spec-Planning.md` § "Tasks Document Format". A change there is law and needs a ballot.
- **Stacy's half (LENS)**: one question in the tasks-round read: for each criterion's evidence item, is its producing event named, and can it occur before the citing doc is committed? This is presence and consistency only, under the mirror clause: she may say an event cannot occur; she does not say what the criterion should say. Home: her charter's LENS question list (`canonical/agents/stacy.md`, Peter-merged).
- **Data's mechanical form, as a manual LENS step** (Peter: a manual step in Stacy's tasks-round review): grep `tasks.md` for `gh workflow run <file>`, and check that `<file>` exists on `main` (`git cat-file -e origin/main:.github/workflows/<file>`). It catches exactly instance 1's subclass. It misses PR-only evidence (instance 2) and uncovered obligations (instance 3), so it is a step inside the check, not the check.
- **Interim, no law**: Thurgood applies the check to Spec 129's remaining units as author's diligence, and records each finding as a tasks amendment.

---

## Surviving counter-argument

This proposes a new planning rule and a new LENS question while Spec 131 exists to simplify governance. The evidence is three instances from one spec, found in one session, and one of them (instance 2) was already handled by an existing mechanism (the instruments block's `MISSING` row and the H convention). The ledger's own caution applies: one episode is not a rate. A reading against the rule: instance 1 was a single platform fact that one reviewer could have caught by knowing it, and a standing question is a cost on every tasks round. A reading for it: three reviewers and the formalizer missed it, and the repair cost an amendment, a grant, a stub PR and a probe. 131 decides which reading holds, with this record as one input.

---

## Pointers

- `.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md` entry L-9 (the session these instances came from).
- `.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md` § "Tasks amendment 2".
- `.kiro/specs/129-consumer-generation-completeness/completion/task-2-instruments.md` row 21 (on the U1 branch until U1 merges).
