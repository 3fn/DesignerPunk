# Issue: the owed-set query lists specs as OWED before their final unit has merged, so a fresh born repo prints its two starter specs as owed on day one

**Date**: 2026-10-18
**Status**: ACTIVE
**Owner**: Stacy (the owed-set query is in my command catalog on both tiers: `canonical/profiles/consumer/stacy.overlay.md` § "The owed-set pipeline", and `canonical/agents/stacy.md` § "The owed-set pipeline"). Thurgood is named for the copies in his LIVENESS item and `.kiro/hooks/RELEASE-FLOW.md` step 5a, which are kept to the same text.
**Trigger**: `release:next:phase-1` — the consumer text is a floor-class row (P0 below), so it is fixed, or Peter rules on it, before release 5's phase 1.
**Class**: P0 false-claim · defect *(my read as owner, rule 12; reasoning and the counter below. Only Peter downgrades a P0.)*
**Source**: found by Stacy while authoring the C-4 fix (`.kiro/issues/2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md` § "Fixed (2026-10-18)", "Found while fixing"); filed under rule 10 at the orchestrator's direction, in the C-4 fix PR (`fix/c3-c4-h4-served-text`).
**Grant paths**: none. `canonical/**` changes through the charter process; the consumer overlay is applied by Thurgood when I sign in the same range (F12′).

---

## The gap

**The predicate and the query disagree.** The consumer charter defines the owed set as specs whose **final declared merge unit has merged**, with no `claims-pass.md`, merged on or after adoption (overlay L104). The query never tests the first condition. Stage 1a takes every spec touched since adoption; stage 3 prints it under `OWED:` if it has no `claims-pass.md`. Class (b), "no declared units and one PR, so that PR is the unit", treats a spec touched by a single commit as complete by construction.

**VERIFIED (2026-10-18, Stacy, the query as applied at `1f660a1bc`, extracted from the overlay and run in a scratch git repo)**: a born-shaped repo whose one commit adds `designerpunk.manifest.json` and the two starter specs copied from `src/cli/templates/starter-specs/` prints:

```
adopted on: 2026-10-18 (from designerpunk.manifest.json, first committed)
specs touched since adoption: 2
OWED:
  ci-needs (b, anchor 9774715 2026-10-18)
  regrounding (b, anchor 9774715 2026-10-18)
EXCLUDED: 0 closed; 0(a) / 2(b) / 0(c) by class; plus every spec with no activity since 2026-10-18
```

Neither starter spec has started: every task is unticked, and `init` wrote them. The same holds for any spec in flight: one first-parent commit puts it in class (b), and a declared-units spec (class (a)) is listed whether or not its final declared unit has merged.

**It predates C-4.** Before C-4 the consumer query exited FATAL before stage 1a, so this never printed. C-4's fix is what makes it reachable in every born repo.

**This repo's own query shares it.** The 2026-10-17 health check (`.kiro/docs/civitas-health-checks/2026-10-17.md` L115–121) reads five printed rows as proxy false positives (post-closure touches, a pre-ratification final unit, stub charters without `tasks.md`), and asks Peter whether the repeat counts as "the second wrong owed-set result" that promotes the pipeline to a committed script. That question is Thurgood's and still open. Here the readers are Thurgood and me, and our reading is on the record, so I do not read the system copy as P0.

## Why P0 at the consumer tier (my read, and the counter)

- **The read**: the consumer charter is a packaged surface (`dist/consumer-canonical/agents/stacy.md`). A consumer agent running its owed-set query meets `OWED: ci-needs` and `OWED: regrounding` on day one, and the charter tells it nothing about reading those rows as candidates. Reporting that a closeout claims pass is owed on a spec that has not started is a false statement met at an agent charter (M7's P0 definition), the same shape as C-4 (an output of the charter's own query, false at the reader).
- **The counter, which survives**: the query was always a proxy with a judgment point. The classes paragraph names each class's anchor so that a reader can check it, and on this repo every reader so far has read the proxy rows correctly. On that view this is P2 `(guard)`: an instrument weaker than its claim. What keeps me at P0 is that the consumer text, unlike this repo's records, never tells its reader that the rows need reading. A charter's agent cannot know a convention that lives only in our health checks. If Peter reads it as P2 `(guard)`, that is his downgrade to make.

## Fix shapes (not done here; mine to write, Peter's go)

1. **Say so where the reader meets it (consumer text only)**: the output label and one sentence say that `OWED` rows are candidates, and that each is owed only once its anchor is its final unit's merge, which the reader confirms against `tasks.md`. This is cheapest and fixes the false statement. The over-listing stays.
2. **Narrow the query**: skip a spec whose `tasks.md` has an unticked parent (`- [ ]` at column 0), and count it under a new excluded class, `open`, so the count stays falsifiable. This is closer to the predicate. Its counter: the checkbox is an assertion, not a merge fact, and a spec without `tasks.md` (a stub charter) needs its own rule.
3. **Both tiers at once, through the ladder**: if Peter answers the 2026-10-17 health-check question "yes", the pipeline becomes a committed script under a scoped grant, and (2) is built and tested there, with the consumer text pointing at the same rule.

The pick is open. (1) and (2) compose; (3) is the class-level option, and costs a spec-sized grant and a Peter ruling that is already pending.

**No fix is authorized by this record.**
