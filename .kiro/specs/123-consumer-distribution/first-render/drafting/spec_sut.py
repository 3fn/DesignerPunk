from spec_identity_common import identity, R, RP, NCC, HUMAN, unit_texts
from build_profile import normative_items
T = unit_texts('.kiro/steering/start-up-tasks.md', 'start-up-tasks')
N = lambda a, p: normative_items(T[a], p)
I4 = '#item-critical-this-project-uses-jest-not-vitest'
I5 = '#item-test-command-selection-guidelines'
I8 = '#item-starting-a-parent-task-write-its-instruments-block-first'
body = lambda a: T[a][:T[a].rstrip('\n').__len__()]  # the unit without its trailing blank lines
trail = lambda a: T[a][len(T[a].rstrip('\n')):]
units = {a: {'items': N(a, a.strip('#').replace('item-', '')[:20]), 'disp': R} for a in T}
units['#start-up-tasks:preamble']['items'] = []
units['#item-critical-wait-for-user-authorization-before-starting-new-tasks'] = {'disp': R}          # confirmed at 11.3 (G)
units['#item-civitas-governance-health-check'] = {                                                   # confirmed at 11.3 (G′)
    'disp': RP(('**[2026-09-19]**', 'subtraction-3'), ('the monthly health check', 'subtraction-3')),
    'overlay': [("IF it's been >30 days since last governance health check **[2026-09-19]**", "IF it's been longer than your team's cadence since the last governance health check (keep its date recorded here)"),
                ('should run the monthly health check before proceeding.', 'should run the health check before proceeding.')],
}
units[I4].update({
    'disp': RP((body(I4), 'subtraction-1')),
    'overlay': [(body(I4), '''4. **CRITICAL: Use your repo's own test runner**
   
   **WHEN running tests THEN you MUST use the commands your repo defines** — read them from its `package.json` (or its build tool's config) before you run anything, and never guess a runner's flags.''')],
})
units[I5].update({
    'disp': RP((body(I5), 'subtraction-1')),
    'overlay': [(body(I5), '''5. **Test Command Selection Guidelines**
   
   **WHEN validating a subtask THEN** run the tests relevant to the change (not the full suite).
   
   **WHEN validating a parent task THEN** run your repo's full functional suite.
   
   **WHEN the task involves performance changes THEN** also run your performance suites, on an otherwise-idle machine (they are wall-clock-sensitive).''')],
})
units[I8].update({
    'disp': RP((body(I8), 'subtraction-4')),
    'overlay': [(body(I8), '''8. **Starting a PARENT task: list its instruments first**

   Before a parent's first subtask starts, list every instrument each success criterion's evidence depends on (test, check, fixture, file, command, upstream artifact) — each one that exists (with where, and what in it the criterion reads), is built by one of this parent's subtasks, or is MISSING (with who owns it). **Any MISSING stops the subtasks that depend on it, before code**; route it. A gap found later is recorded with its kind (never listed, or listed but not fit for the criterion), never silently fixed.''')],
})
identity('start-up-tasks', 'start-up-tasks', units)
