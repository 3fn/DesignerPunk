# Which paths are governance paths: four lists give different answers, and Spec 131's requirements round settles one list and one home

**Date**: 2026-10-29
**Filed by**: Thurgood, under rule 10, in the Status commit of ballot `.kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md`, which records Peter's F-1 ruling. Text drafted by Stacy (her F-1 consult, `[STACY R3]` in that ballot's § 8). Re-read at `24a527c91`.
**Owner**: Thurgood. He formalizes Spec 131, owns the ballots-README convention that holds the edit-kinds list, and is the Civitas steward for Task-Completion-Protocol and Agent-Directory. Stacy is an interested party: two of her reads key on these lists (the governance-edit-kind read and the orchestrator consult-line read), and she does not ask to own the record.
**Class**: P2 obligation (record) · defect *(set 2026-10-29, Thurgood, rule 12, as the drafter proposed. The four lists disagree in the form of the law, and authors already declare README edits inconsistently. No consumer meets a falsehood, and no edit is known to have skipped a ballot. The surviving argument for P3: no defect of this kind has been observed, and Peter's ruling already routes it to a spec.)*
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the first commit that adds Spec 131's requirements, where this record is taken in or left out with a reason. *(Set 2026-10-29, Thurgood, rule 9, as the drafter proposed. Spec 131 has no `requirements.md` at `24a527c91`. Rule 1 allows the `path:` token. This is not a vehicle under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2, question 2: the first requirements commit is the intake read that `governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec" already owes. On intake, the owner re-rules it to the carrying parent's completion doc, or to `completion/claims-pass.md` until `tasks.md` numbers that parent (same section). Precedent: `2026-10-24-token-creation-review-no-pr-signal.md` and `2026-10-24-native-theme-emission-owner-stated-two-ways.md`. Counter-argument: Spec 131 is paused, so this waits with no date, and `release:next:phase-1` would give it one. What survives: Peter named the event, Spec 131's requirements round, so a release date would escalate the record to Peter ahead of the spec he chose.)*

---

## The ruling — as relayed

Peter, chat, relayed by the orchestrator, received before 2026-10-29T03:52:42Z (the orchestrator's clock), verbatim: *"B with the wording and record"*. Its meaning:
- F-1 is (b): the two READMEs are not bound to the pointer rule.
- Site 1 takes Ada's rule wording.
- This record carries "which paths are governance paths" to Spec 131's requirements round.

## The four lists — VERIFIED by reading at `24a527c91`

1. **The merge carve-out** (who merges).
   - Where: `.kiro/steering/Task-Completion-Protocol.md` L129, § "The Merge Rule".
   - Paths: `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts and configs.
   - Restated in the register row `record-first-ratification`, at the `gated surfaces` scope (`governance/classification-map.md` L179).
2. **The edit-kinds list** (which edits declare LAW, EXECUTION or CORRECTION).
   - Where: `.kiro/docs/ballots/README.md` L42 (§ "When a governance edit needs a ballot — three kinds") and Task-Completion-Protocol L123 (the `**Edit kind**` bullet).
   - Paths: `governance/**`, `.kiro/steering/**`, `.kiro/hooks/RELEASE-FLOW.md`, the prose of `canonical/agents/**`.
   - Missing from it: `.kiro/docs/ballots/**`, including the README that holds this very list, and `.kiro/issues/README.md`.
   - Also restated in `canonical/operative-sets/task-completion-protocol.yaml` L306.
3. **The consult-line trigger surfaces** (which PRs carry `**Consulted**:`).
   - Where: `.kiro/steering/Agent-Directory.md` L42, § "Primary Agent (Orchestrator)", "Leave the record".
   - Paths: governance, steering, ballots, charters, a spec's `requirements.md` or `design.md`, a `tasks.md` hunk other than checkboxes, `canonical/adjudications.yaml`.
   - Restated as globs in the register row `orchestrator-consult-line` (`governance/classification-map.md` L1008–L1011) and in `canonical/agents/stacy.md` L426, population (iii).
   - It has `.kiro/docs/ballots/**`, and does not have RELEASE-FLOW or `.kiro/issues/README.md`.
4. **The dated-pointer bound and exempt list** (which documents carry a dated pointer).
   - Where: `.kiro/docs/ballots/README.md` § "Conventions", Edit discipline, "Where the pointer is owed". Added by the application of the ballot above, under F-1 (b), with Ada's wording (ratified 2026-10-29).
   - Bound: `governance/**`, `.kiro/steering/**`, RELEASE-FLOW.
   - Exempt: `canonical/agents/**`, `canonical/shared/**`.
   - Named as outside: both READMEs (inline citations instead), `docs/**`, `.cursor/rules/**`.
   - Until that application merges, the text is the ballot's § 3 site 1 "After".

**The disagreements**:
- `.kiro/docs/ballots/README.md` is governance law for merging (list 1) and for consulting (list 3), but not for declaring an edit kind (list 2) or carrying a pointer (list 4).
- `.kiro/issues/README.md` is on none of the lists, though its rules bind every seat (Start Up Tasks item 9).
- RELEASE-FLOW is on lists 2 and 4 but not on 1 or 3.
- `canonical/agents/**` is "agent prompts" on list 1, "the prose of" on list 2, whole on list 3, and exempt on list 4.

## What it costs today — VERIFIED from git, PR bodies UNVERIFIED (squash messages read)

- Since `c470a248f` (2026-10-18), 19 commits touched either README. 7 touched only `.kiro/docs/ballots/` files. 6 of those 7 carry an `**Edit kind**:` line with "none owed" or "none"; `3a41f0023` (#528) carries none.
- Of the README rule amendments sampled, `f985e2079` (#444) declared `.kiro/issues/README.md — LAW`, `58ec2aea5` declared "no Edit-kind line", and `a19481725` declared nothing for the README.
- Authors are guessing at a list that does not say.
- The one observed README history failure is an omission: `6cf38d7b5` (#459, 2026-10-24) restored 15 ballots missing from the roll, dated 2026-07-07 → 2026-10-23. A one-off audit found it. No standing reader keyed on these lists would have caught an absent edit.

## What Spec 131's requirements round settles

1. **One list**: the set of governance paths, with each purpose the old lists served (merge carve-out, edit kind, consult line, dated pointer) kept or dropped explicitly, and stated for each path. Each README is named, and so is RELEASE-FLOW. The charter exemption (prose, frontmatter, `canonical/shared/**`) stays as ruled, unless Peter re-rules it.
2. **One home**: the document that holds the list. The others point to it and do not restate it. This includes the register rows `record-first-ratification` and `orchestrator-consult-line`, the TCP operative-set item, and Stacy's population (iii).
3. **Which checks read it**:
   - the governance-edit-kind read (Stacy's);
   - `scripts/completion-claims/edit-kind-pointers.ts` (Thurgood's, built under the ballot above);
   - the consult-line read (Stacy's);
   - the merge carve-out (Peter's merge; CODEOWNERS when 125-B lands).
   - For each check: whether it reads the one list from its home, or keeps its own copy and why.
4. **Whether the roll needs a reader**: a check that each RATIFIED ballot has a roll entry. That is the omission class above, which no edit-based read reaches.

## Readers (trust, but verify)

- **Thurgood** (owner): the intake line at Spec 131's requirements round.
- **Stacy**: her two reads' populations follow whatever list 131 settles. She checks the settled list against her charter's population (iii) and the edit-kind read's key.
- **Peter**: he ruled the route. Any change to the merge carve-out is his.
- **Ada**: her site 1 wording and her history-homes test, which decided the charter exemption.

**No fix is authorized by this record.**
