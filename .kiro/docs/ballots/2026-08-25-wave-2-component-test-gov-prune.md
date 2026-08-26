# Ballot: Wave 2 Component/Test-Governance Education Prune (125-B, Task 5.3 step (c))

**Date**: 2026-08-25
**Proposer**: Thurgood (steward), per tasks.md 5.W(c)
**Status**: RATIFIED (Peter, 2026-08-25, record-first — ratified in-session BEFORE the wave-2 unit PR merges; this record is the ratification artifact)

---

## What this ballot ratifies

Application of the **wave-2 candidate prune diff** — 5 hunks, 3 files — to the education corpus, as classified at 5.W(a) and verified at 5.W(b):

1. **W2-1** DELETE `governance/Component-Development-Standards.md:686` — checklist restatement of the armed WCAG-required-refs check
2. **W2-2** DELETE `governance/Component-Development-Standards.md:513` — dual-rule checklist restatement (C4 + wcag-format-validity, the latter rostered into wave 2 by Peter's 2026-08-25 amendment)
3. **W2-3** DELETE `governance/platform-implementation-guidelines.md:468` — review-template restatement (decorative yaml fence; scored on function)
4. **W2-4** REWRITE `governance/Component-Development-Standards.md:824` — wrong-trigger contradiction → accurate allowlist semantics
5. **W2-5** REWRITE `governance/Contract-System-Reference.md:183` — "(null if not applicable)" gate-contradiction → owner-authored accurate field-table row

**Authority chain**: rows + diff RATIFIED (Peter, 2026-08-25, record-first, at 5.W(a) completion — recorded in `governance/classification-map.md` § wcag-required-refs history and campaign-plan.md); owner consult Lina R1+R2 (zero declined; `wave-2-consult-lina.md`); probe **NO GROSS LOSS DETECTED** (`wave-2-probe-evidence.md` — pruned arm surfaces every obligation, teaches the CORRECTED sentinel semantics, and cites the armed gates as authority); trial **NO-DIFFERENCE-DETECTED** (1 paired valid run on the #81-replay battery task, relevance gate passed, `wave-2-trial-diff-table.md`; pre-committed consequence: proceed).

## Rule count + sizing (Req 10.4)

3 rostered rules (C4/C5/C6) + wcag-format-validity's education layer (amendment). C5/C6: rows-only (zero imposters, corpus-wide evidence). All 5 hunks are C4/format-validity territory. One battery task covered relevance (C4 R1'-PRESENT in control).

## Revert path (recorded per campaign law)

Revert the wave-2 unit's squash-merge commit on `main` (single `git revert <squash-SHA>` PR). The wave-2 observation window (N=10, opens at this PR's merge) is the detection mechanism; a W2 re-accretion UNMET or DIFFERENCE-DETECTED finding triggers this path per the wave record's verdict discipline.

## Sequencing (Peter's §5.4 ruling, honored)

Lina's contract-name education-drift repair (`fix/contract-name-education-drift` — Component-Templates canonical names, CIS, family docs, CDS stale block) lands BEFORE/WITH this prune's merge, closing the compound-exposure window (zero authoring-time WCAG cue + templates teaching unselectable names).

## Window consequences at merge

- Wave-2 window OPENS at this PR's squash-merge (N=10 observed PRs; wave-2 dataset created per protocol §7 with the §6b frozen A1/A2).
- This PR is campaign-endogenous — it does NOT segment the shared campaign W1 window.
- Docs-MCP reindex after merge (three served surfaces changed).
