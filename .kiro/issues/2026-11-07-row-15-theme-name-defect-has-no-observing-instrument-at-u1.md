# Row 15's theme-name defect is masked behind row 2 until U6, and no instrument observes it at U1

**Date**: 2026-11-07
**Filed by**: Thurgood, as the formalizer of Spec 129's `tasks.md`, on Stacy's read of U1's PR (#707 at `7f913164a`, Task 5 criterion 11, finding Medium-1), in the PR that carries the finding (README rule 10).
**Owner**: Thurgood (the plan wording). **Consulted**: Lina, as row 15's owner (`2026-09-26-native-component-theme-hardcoding.md`): her consult on the instrument below is owed before the tasks amendment that carries it merges; this record states the question and does not assume her answer.
**Class**: P2 obligation (guard) · owed-act *(set 2026-11-07, Thurgood, rule 12: a criterion's coverage is weaker than its claim. No reader of a release is misled.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-11-completion.md` — the merge of the unit that carries Task 11 (U6), when its completion doc reaches `main`. That is the first event at which row 15's defect can show, and it is before Task 12's check (U7). The act owed by then, in U6's PR or in a tasks amendment merged before it: the instrument named under "What is owed", and this record's rule 5 outcome line.

---

## The gap

Task 5's criterion 11 asks that every 129 row a harness context accepts has an entry tagged to its record on a baseline list, or that the completion doc names an interim instrument. Three rows are named in the criterion as exceptions (row 12's groups B and C, row 9, row 2's probe half). **Row 15's theme-name half is a fourth, and the criterion does not name it.**

- **The row is in scope.** Requirement 4.7 says row 15 is "accepted by the component contexts under the non-`DP` consumer", and Requirement 2.2 sets the harness consumer's abbreviation so that row 15's defect shows.
- **It is masked.** No theme types exist before U6, so every theme-name read in the component files fails for row 2's cause and is tagged to row 2. Row 15's defect (a component names the theme type or local with a hard-coded abbreviation) cannot be told apart from row 2's until row 2's entries leave. This is the same shape as row 12's groups B and C behind row 6.
- **No instrument observes it at U1.** The baseline lists, committed at `da3246b60` and `18cd819c0`, hold no entry tagged to row 15 and cannot. The other half of row 15 (the `ContainerCardBase.ios.swift` L816 parse defect) was fixed before U1 in #695.

## Why it matters: two later criteria assume entries that do not exist

1. **Task 11, 11.5** (`tasks.md`, the criterion beginning "The component contexts' lists show the entries tagged to row 2 and to row 15's theme-name defect removed in this diff"): there is nothing tagged to row 15 to remove.
2. **Task 12, 12.2** ("At this head, no entry on `harness-ios-components` is tagged to row 15", and the same for Android): already true at U1. It would pass at U7 whether or not the defect was ever seen. A green that cannot be red proves nothing.

## What is owed

Name the event at which row 15's defect first becomes observable and the instrument that reads it. Proposal, for Lina's consult:

- **The event**: U6's diff. When Task 11 removes row 2's entries, any theme-name key that remains in the component contexts' output is newly revealed. The comparator prints it as `unmasked: <key> +<n> <tags> (the diff lowers …)` under exception (c), because the same diff lowers row 2's counts.
- **The instrument**: U6's PR tags every newly revealed theme-name key to row 15's record (Lina, as owner, in that diff), and Task 11's completion doc pastes the `unmasked:` lines of that run for both component contexts, or states that there are none, with the run URL. Task 12's check at L825–826 then reads: entries tagged to row 15 at U6's head are zero **after** U6's tagging was observed, and the doc cites that run. A U7 head with no row 15 entry and no U6 observation fails the criterion.
- **The tasks wording**: an amendment to Task 11 (11.5) and Task 12 (12.2), which I author after Lina's consult. That is a non-checkbox `tasks.md` change, so it does not travel in U1's PR.

## Counter-argument, folded back

Counter: the theme-name defect might not exist as a separate cause at all. If every hard-coded name is row 2's `LocalDPTheme` import, row 15's theme-name half is row 2 in a different record, and an instrument would be built for a defect that has no entries. **Folded in**: the instrument is a read at an event, not a count, so it costs one pasted result; it is allowed to say "none". **What survives**: if the result is "none", the row 15 criterion at Task 12 should be rewritten to say the half was subsumed by row 2, with that run as evidence. That is a decision for Lina and Ada, not for the formalizer.

## Open questions

- [@LINA] Is there any theme-name read in the component files whose cause is not row 2's missing type or local, and so would still fail after U6? If you know of one, name the file and the read; it becomes this instrument's first expected entry.
