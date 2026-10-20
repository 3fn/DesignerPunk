# Obligation: the cold-human onboarding run (Spec 123 Req 23.9, exited at Task 28.4)

**Date**: 2026-10-15
**Status**: ACTIVE (unfired at Spec 123's closeout)
**Owner**: **Leonardo** — prepares and observes the run, and writes its record under the trio protocol's discipline. **Peter** is the one who finds the person.
**Trigger**: `manual` — the first willing stranger appears and Peter finds the person (no date by design, Req 23.9). *(was: **the first willing stranger** — the first person who has never used DesignerPunk and agrees to install it from the shipped install guide while being observed. **No date is set**: Req 23.9, "a date we would not honour is worse than a generic trigger".)*
**Class**: P2 obligation (record) · owed-act *(set 2026-10-20, Leonardo, rule 12. A Req 23.9 obligation owed as a committed record; P3 would let two unfired walks archive it stale, against its own line "unfired is not a finding".)*
**Source**: Req 23.9 (Leonardo R2 A7, extended by Stacy: "an item 'reported open' inside a closed spec's completion doc is, operationally, dropped"). Placed at Task 28.4 by `tasks.md` § "Carried obligations — placed".
**Grant paths**: none.
**Consulted**: none needed — Req 23.9 fixes the owner class, the trigger and the no-date rule.

---

## Why no agent run discharges it

- **Peter's own runs are mechanics validation, not cold** (Req 23.8: "He is the author; he cannot be cold"). Spec 123 records Req 25.2 as not run as a separate exercise: Peter launched every instrument run (3 trio, 2 join, 1 conformance) from macOS Terminal and observed the mechanics there — non-blocking, explicitly not a cold-human run (Peter, 2026-10-15; `completion/task-28-completion.md`).
- **The trio role-plays ignorance** (Req 23.10). It measures instruction clarity and path completeness; a human measures confusion.

## What the run is, when it fires

- One person, cold to DesignerPunk (never installed it, never read its docs), on a machine whose harness state is recorded (`harness-user-state`), following `node_modules/@3fn/core/docs/consumer/INSTALL.md` from the current release.
- The observer records, in the trio record's form: the path taken, every point of confusion in the person's own words, the stop event, and the forced negative.
- The record lands at `.kiro/specs/<the spec current then>/validation/` or, absent one, beside this file, and this record is closed and archived with a pointer to it.

## Leonardo's counter, recorded and not pretended away (Req 23.9)

A record walked monthly with a trigger that never fires is a recurring reminder of an item nobody is going to do, and the health check's cost is real. A visible undone item is still preferred to an invisible one.

## Walk

At each monthly health check: has a willing stranger appeared (Peter)? If one ran, is there a record? **Fired without a record = finding.** Unfired is not a finding.

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 73, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P2 obligation (record) · owed-act`. It is a Req 23.9 obligation; a P3 class would archive it stale after two unfired walks, against its own line "unfired is not a finding". The owner decides.
