# Task 8 Summary — The lanes are REQUIRED (125-A)

**Status**: Complete (2026-07-10). **The gate is armed.**

The five CI lanes were promoted to required status checks on `main` (7 total contexts, set-asserted via the API read pasted in the completion doc). The ratified per-lane gate-bites proof ran: five deliberate-failure PRs (#46–#50), one per lane — type error, thrown validation error, and one failing test seeded per suite — **every one concluded FAILURE on its target lane and showed `mergeStateStatus: BLOCKED` at the platform.** All five closed unmerged.

What's now mechanically true: no PR merges to `main` without passing full typecheck, build validation, the 8987-test functional suite, and both sub-package suites — each lane carrying Task 7's did-it-really-run guards, so an empty or mis-scoped green is structurally hard. The authored-but-unarmed finding that opened Spec 125 is closed for these surfaces.

Next: Task 9 closeout — completion docs, the 122 handback ("the gate is armed and OPEN for your registrants," with the five context names for its standing count-assert), and the 125-B seed note.
