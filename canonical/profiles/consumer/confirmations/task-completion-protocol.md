# Operative-set confirmation — `task-completion-protocol` (C1 carve-out)

**Record**: `canonical/operative-sets/task-completion-protocol.yaml`. Heuristically drafted by Thurgood (profile author) at Spec 123 Task 15.4, then confirmed and corrected here.
**Source**: `.kiro/steering/Task-Completion-Protocol.md`. This is an always-set identity doc, loaded into every consumer agent's context.
**Owner**: no domain seat; the profile author drafted it. **Confirmer**: **Stacy**, under the C1 carve-out: the owner's seat is the profile author's, so the counterpart verification seat confirms (Req 11.6.5d).
**Date**: 2026-09-29 · Spec 123 Task 15.5, phase one, run 2.

**Criterion**: 5c as narrowed on 2026-09-29, the classifier owner's "can contradict" reading: an item is operative if and only if a consumer's agents could act against it.
- That includes stated facts about a name, path, type shape or spelling they build against.
- Orientation, rationale, history, illustration, and rosters or counts that no agent acts on are not operative.
- Repo-specificity is a signing question, never an exclusion.

**The 11.3 convention**:
- A condition that scopes an obligation is part of that obligation's text.
- An item's own title line, and pure group labels, are labels (clause (c)).
- List markers are formatting.

**5d**: every zero is declared.

**Format**: the convention in `confirmations/stacy.md`. Record edits are made in the same commit as this note.

## `#task-completion-protocol:preamble`

confirmer: stacy
canonicalHash: sha256:470b82059538dd17eeebcea849187caecfa75fc0afc0479ad294c921350e4baf
items: operational-law
date: 2026-09-29

**Ruling: CONFIRMED at 1, recomposed.** Removed `task-completion-prot-1`, the **Purpose** metadata line. Added `operational-law`, the call-out: TCP owns the end of a task, and Start Up Tasks owns the start.

## `#critical-do-not-mark-a-task-complete-before-its-required-steps`

confirmer: stacy
canonicalHash: sha256:ebe9ae3c776f236e195e92ffc5c5fd5f80cd00fd41083417e4fa6c49cc46500d
items: critical-do-not-mark-1, completion-guide-query
date: 2026-09-29

**Ruling: CORRECTED 1 → 2.** Added `completion-guide-query`.

## `#for-subtasks`

confirmer: stacy
canonicalHash: sha256:d3441b73b9ced68042b67726692b8f87d3ce9e086d7e68336292da8b69895d75
items: for-subtasks-1, for-subtasks-2, for-subtasks-3, for-subtasks-4, for-subtasks-5
date: 2026-09-29

**Ruling: CONFIRMED at 5, with the `[ ] ` checkbox markers stripped from the item texts.** List markers are formatting. As drafted, the texts would have failed any rendering that presents the checklist differently.

## `#for-parent-tasks-implementation-or-architecture-type`

confirmer: stacy
canonicalHash: sha256:e2958dd6f1a60a5f2b1054e109efe5e8ebd176f263302b87d096772c9243a1c5
items: for-parent-tasks-imp-1, for-parent-tasks-imp-2, for-parent-tasks-imp-3, for-parent-tasks-imp-4, for-parent-tasks-imp-5, for-parent-tasks-imp-6, for-parent-tasks-imp-7, for-parent-tasks-imp-8
date: 2026-09-29

**Ruling: CONFIRMED at 8, with the checkbox markers stripped.**

## `#for-parent-tasks-setup-or-documentation-type`

confirmer: stacy
canonicalHash: sha256:d74afc384873f1861a195770544dcb456c4e952028d9ca37e3e5d6e39b19a6e4
items: for-parent-tasks-set-1, for-parent-tasks-set-2, for-parent-tasks-set-3, for-parent-tasks-set-4, for-parent-tasks-set-5, for-parent-tasks-set-6, for-parent-tasks-set-7, for-parent-tasks-set-8
date: 2026-09-29

**Ruling: CONFIRMED at 8, with the checkbox markers stripped.**

## `#completion-state-in-the-pr-flow:preamble`

confirmer: stacy
canonicalHash: sha256:b59a35369cc72af0278db7c994f6fcdd75e5dc9202494bcc80a59ec96bb9c955
items: completion-state-in--1, merge-unit-definition, completion-state-in--2, one-branch-per-unit, completion-state-in--3, completion-state-in--4, completion-state-in--6, completion-state-in--7, completion-state-in--8, completion-state-in--9, completion-state-in--10, completion-state-in--11, complete-at-merge, completion-state-in--12, completion-state-in--13, completion-state-in--14, completion-state-in--15, completion-state-in--16, completion-state-in--17, completion-state-in--18, completion-state-in--19, completion-state-in--20
date: 2026-09-29

**Ruling: CORRECTED 20 → 22.**
- Added `merge-unit-definition`, `one-branch-per-unit` and `complete-at-merge`.
- Removed `completion-state-in--5`, the "AMENDED FROM THE OLD FLOW" paragraph: it is history and justification. Its one operative clause (unit-branch dispatches are feedback, not the gate) is carried by `-4`.
- The law-source line is history.

## `#coherent-units-the-merge-granularity`

confirmer: stacy
canonicalHash: sha256:4bd3b64a6e82bcdcc9065d9eb7c42162e1da6c6fbd00988fa2d3f74137684632
items: coherent-units-the-m-1, coherent-units-the-m-2, coherent-units-the-m-3, coherent-units-the-m-4, coherent-units-the-m-5, coherent-units-the-m-6, coherent-units-the-m-7
date: 2026-09-29

**Ruling: CONFIRMED at 7, as drafted.**

## `#branch-cleanup`

confirmer: stacy
canonicalHash: sha256:f6e97dd4c99e8e9e2143a984ccf2fb4b85e62a04da4965d0a6f01fc341c4ff8e
items: branch-cleanup-1, branch-cleanup-2, branch-cleanup-3, branch-cleanup-4
date: 2026-09-29

**Ruling: CONFIRMED at 4, as drafted.**

## `#branch-and-pr-conventions`

confirmer: stacy
canonicalHash: sha256:920fbf9e608725a083053d158bcb195209a2993b1e00037764621cbf1a71b2cf
items: branch-and-pr-conven-1, branch-and-pr-conven-2, branch-and-pr-conven-3, branch-and-pr-conven-4, branch-and-pr-conven-5, branch-and-pr-conven-6
date: 2026-09-29

**Ruling: CONFIRMED at 6, as drafted.**

## `#the-merge-rule`

confirmer: stacy
canonicalHash: sha256:d9fdd24e86b6c31126977969bbe4d47e0df9b05bc4c3a2bf6274d8cfd801e34e
items: the-merge-rule-1, the-merge-rule-2, the-merge-rule-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#emergency-procedure`

confirmer: stacy
canonicalHash: sha256:fcb97d3f697a6b4cc3bd45b2478e22e305abdf1626258e220b5ac507f4bcbb4d
items: emergency-procedure-1, no-convenience-lift, rollback-not-exempt
date: 2026-09-29

**Ruling: CORRECTED 1 → 3.** Added `no-convenience-lift` and `rollback-not-exempt`.

## `#tier-selection-which-docs-how-much-detail`

confirmer: stacy
canonicalHash: sha256:d1d5429b6114ae0abd5e62cfd4a88039d25755d3c8ea249057c2dd971fa03c60
items: tier-selection-which-1, tier-selection-which-2, tier-selection-which-3
date: 2026-09-29

**Ruling: CONFIRMED at 3, as drafted.**

## `#key-rules`

confirmer: stacy
canonicalHash: sha256:80c2462bf7a9e6c1e7a3bd7edc6e36abb523168f644fe3c777eec59993d53977
items: key-rules-1, key-rules-2, key-rules-3, key-rules-4, key-rules-5, key-rules-6, key-rules-7, key-rules-8, key-rules-9
date: 2026-09-29

**Ruling: CONFIRMED at 9, as drafted.**

## Confirmation run summary (2026-09-29, run 2)

**Scope**: Task 15.5 phase one, run 2. The eight identity-doc records, 81 units, all confirmed in the C1 carve-out seat. The two `start-up-tasks` units confirmed at 11.3 are byte-identical; their notes and items are untouched. **This is the run-2 summary's one home.** The run-1 summary is in `confirmations/stacy.md`.

**Commits**:
- `b1f4a4f1`: agent-directory, core-goals, ai-collaboration-principles.
- `55e968a0`: civitas-system-overview, designerpunk-systems-overview, spec-feedback-protocol.
- the commit carrying this section: start-up-tasks and task-completion-protocol.

**Units confirmed, and record totals** (items, before → after):

| Record | Units | Items |
|---|---|---|
| agent-directory | 15 | 48 → 52 |
| ai-collaboration-principles | 9 | 24 → 30 |
| civitas-system-overview | 9 | 35 → 31 |
| core-goals | 3 | 27 → 31 |
| designerpunk-systems-overview | 10 | 22 → 5 |
| spec-feedback-protocol | 15 | 32 → 48 |
| start-up-tasks | 7 (+2 from 11.3, untouched) | 48 → 51 |
| task-completion-protocol | 13 | 76 → 81 |

The `b1f4a4f1` commit message gives agent-directory as "46 → 52". The correct starting count is 48.

**Items added, removed and widened, by key** (per-unit detail is in each note's ruling):
- **agent-directory**:
  - added: `tier-system`, `tier-product`, `scope`, `consult-line-on-brief`;
  - widened: `owners` (referent), `brief-once` (trigger and limit), `class-option` (its counter-argument duty).
- **ai-collaboration-principles**:
  - added: `conf-strong`, `conf-partial`, `conf-none`, `signal-contract`, `framework-query-full`, `framework-query-sections`;
  - widened: `disagree-1` and `calibrate-1` (their conditions).
- **civitas-system-overview**:
  - removed: `what-civitas-con-1`, `-11`, `-12`, `-13`, `-14`, `-15`, `-16`, `-18` (inventory);
  - added: `layer-correctness`, `layer-consistency`, `layer-infrastructure`, `document-access-2`;
  - widened: `external-represe-1` (its condition).
- **core-goals**:
  - added: `platform-android`, `platform-web`, `practice-3`, `token-governance-query`;
  - widened: `practice-15` ("MUST follow this order").
- **designerpunk-systems-overview**:
  - added: `module-resolution-pull`, `module-resolution-route`;
  - removed: `related-document-1` to `-19`.
- **spec-feedback-protocol**:
  - added: `single-file-path`, `split-path`, `single-file-valid`, `feedback-location`, `multiple-rounds`, `stamp-pattern`, `round-reset`, `entry-format`, `section-reference`, `directed-format`, `directed-asker`, `directed-response`, `incorporation-format`, `context-block`, `follow-references`, `context-format`, `resolutions-in-feedback`, `clean-artifacts`, `template`;
  - removed: `stamp-format-2`, `-3`, `-4` (examples);
  - widened: `the-feedback-document-2`, `stakeholder-identificati-2`, `stakeholder-identificati-6`, `mandatory-mention-scanni-2`.
- **start-up-tasks**:
  - removed: `critical-this-projec-1`, `test-command-selecti-1`, `delegation-and-model-1`, `ending-a-task-see-ta-1`, `starting-a-parent-ta-1` (title lines), and `test-command-selecti-3` and `-4` (rationale);
  - added: `lane-semantics`, `pre-july-void`, `decision-tree`, `default-assumption`, `first-ask-whether`, `policy-query`, `follow-tcp`, `write-block`, `missing-stops`, `format-route`;
  - widened: `test-command-selecti-2`, `-5` and `-7` (their `WHEN … THEN` conditions).
- **task-completion-protocol**:
  - removed: `task-completion-prot-1` (a metadata line) and `completion-state-in--5` (history);
  - added: `operational-law`, `completion-guide-query`, `merge-unit-definition`, `one-branch-per-unit`, `complete-at-merge`, `no-convenience-lift`, `rollback-not-exempt`;
  - corrected: the `[ ] ` checkbox markers stripped from 18 item texts.

**Units ruled zero (declared)**, 19 in all:
- the eight doc-metadata preambles;
- agent-directory `#system-agents:preamble` and `#product-agents:preamble` (roster tables, inventory);
- civitas-system-overview `#overview`;
- designerpunk-systems-overview's six diagram units and `#related-documentation`;
- spec-feedback-protocol `#purpose`.

**Drafts that were materially wrong, and why**:
1. **Instructions drafted as zero.** DesignerPunk-Systems-Overview `#pointer-1-…` is an instruction ("pull it before touching those surfaces"). Spec-Feedback-Protocol's four format units (`#standard-feedback`, `#directed-questions`, `#incorporation-notes`, `#spec-feedback-template`) and `#resolution-tracking` define the shapes and places agents write in. Agent-Directory `#agent-tiers` and AICP `#mcp-query-…` were also zeroed.
2. **Inventory counted as obligations.** Systems-Overview `#related-documentation` counted 19 links, and Civitas-Overview `#what-civitas-contains` counted eight inventory lines, all as `obligation`. The draft credited lists no agent can act against, which inflates the floor's denominator with nothing a rendering must keep.
3. **Lead-ins kept, their content dropped.** AICP `calibrate-2` kept the "Weight by match strength:" lead-in but not the three responses. SFP `stamp-format-1` kept "using this exact format:" but not the format. Start-Up-Tasks item 8 kept its title but not its main obligation (`write-block`). Civitas `#the-three-layer-boundary` kept the resolution path but not the three ownership rules.
4. **Labels and metadata credited as items**: five Start-Up-Tasks title lines, and TCP's **Purpose** metadata line.
5. **Conditions split from their obligations**, against the 11.3 convention: the Start-Up-Tasks `WHEN … THEN` lines, the AICP disagree and calibration triggers, and the SFP selection and mention lead-ins.
6. **TCP item texts carried the `[ ] ` checkbox markers.** Any rendering that presents the checklist differently fails to match them.

**Checks**:
- `triviality.records.test.ts` over the edited live records: `Tests: 688 passed, 688 total`.
- The freshness sweep, run from this worktree after the final commit: the report cites the result. `{"confirmation":0}` is the target, because this is the last record set.

**Residuals**:
- **The weighting was a judgment**: "a consumer's agents act against it", per the run-2 brief. Another confirmer could rule differently on:
  - the three system definitions in Systems-Overview `#overview` (kept);
  - the Civitas inventory split (four layers, three MCP roles, two tiers and the workflow kept; the rest removed);
  - the four explicit MCP query commands kept as `command` items, while "For detailed … see:" further-reading lists are orientation.
- **Large multi-line items**: `template` (SFP), `decision-tree` (Start Up Tasks) and the format blocks. Any byte change routes the unit, which is conservative and adds volume at signing.
- **Kinds**: many drafted `obligation` kinds would fit `member` better. Kind is never matched, so I left them. This is noted, not corrected.
- **Self-description**: agent-directory `#stacy-…`, and Start Up Tasks and TCP clauses that name my claims duties, are confirmed by the seat they describe. *Not independently re-verified.*
- **Referents**: where widening an item would contain a sibling item, I left the text as drafted: SFP `sequential-formalization-5` ("The waiver must be explicit"). Its referent is the preceding `waiver` item in the same unit.
