# Peter ratifies the signing-act shape-review ballot: F-1 (d), F-2 (b), F-3 (a), F-4 (a)

**Recorded by**: the orchestrator, timestamped from the clock at receipt (`date -u`).

## The exchange

1. **The trigger.** `.kiro/issues/2026-10-23-signing-act-shape-review.md` (owner Thurgood) has the Trigger "Spec 129's final unit merge or 125-B U3's merge, whichever first". It fired at U12's merge (#781). Peter's go to draft came at 2026-11-08T16:33:36Z ("go for the shape review").
2. **What was put to Peter** (orchestrator, 2026-11-08): the ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` on `origin/chore/ballot-signing-act-shape-review` at `b32d43870` (R4).
   - **What it does:**
     - a row-state × act table, with a closed list of act kinds;
     - `--ci` link 1 checks list membership at the act (today a withdrawal on a fresh row, or a withdraw-then-re-sign in two commits, passes);
     - withdrawal is in bound for orphaned and unrouted rows;
     - the rendering is committed before the act;
     - U3's rows are classified, and none is in bound.
   - **The forks**, with the leans of Thurgood and Stacy:
     - **F-1**, granted or re-attesting acts: (a) a committed grant list; (b) U3 writes its own record; (d) settle at U3's tasks round. Both leaned (d).
     - **F-2**, rows that render nothing: (a) unchanged; (b) read the print-mode output; (c) a new verdict. Both leaned (b).
     - **F-3**, an act committed before its rendering: (a) never anchors; (b) anchors by hash. Both leaned (a).
     - **F-4**, re-disposing a row that renders nothing: (a) pin the disposition; (b) a history rule; (c) the claims pass reads it. Both leaned (a), timed with U3's round. Cost: 261 re-signs across seven seats.
   - **Surviving counter-argument:** gaps now fail closed rather than ending, and the authoring round trip and F-4's gap show only in history.
   - **Review:** Stacy, the required reviewer, passed it at R3 with no objection. Over three rounds she raised blocks B-1 to B-7, and every one was met and withdrawn. One expected census difference stands: act `7eb517fca`, the 1 of 218.
3. **2026-11-08T17:45:34Z**, Peter: **"Ratified, F-1 (d), F-2 (b), F-3 (a), F-4 (a)"**

## What was ruled

The ballot is ratified with F-1 (d), F-2 (b), F-3 (a) and F-4 (a). Application follows the ballot's own application section. The re-signs that F-4 (a) requires are timed with 125-B U3's round, as the seats leaned.
