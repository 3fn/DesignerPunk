# Peter's ruling: the release records move to `.kiro/docs/releases/` now, in one ballot (records-home fallback, 16.3.0)

**Recorded by**: the orchestrator. Times are from `date -u` at receipt.

## The exchange

1. **The question.** RELEASE-FLOW step 6's records-home fallback (ballot `2026-10-29-release-claims-pass-record-home`, F-1 (ii), F-2 (a)) was owed at the 16.3.0 walk, the second release after the application merge. It was not asked there. Stacy's RELEASE 16.3.0 phase-1 read raised it as RL-51 (draft PR #857, `.kiro/issues/2026-11-10-release-16.3.0-phase-1-findings.md`). The capture record `.kiro/issues/2026-10-29-release-records-home-switch.md` lapses at 16.3.0's S.
2. **2026-11-12**, Peter: "Run the consults, please". The orchestrator consulted Thurgood, Stacy, Lina and Ada (read-only, three rounds). Round files are in the orchestrator's scratchpad, `consult-163/`.
3. **What was put to Peter** (orchestrator, 2026-11-12):
   - **(a)** Keep waiting this release, as the law's default. The records stay in Spec 123's completion directory, and the question returns next release.
   - **(b)** Move now: standing write scope over `.kiro/docs/releases/**` for the five writing seats (Stacy, Thurgood, Ada, Lina, Leonardo), in one ballot. Cost: five charter edits and a signing round. Risk: some work is redone if Spec 131 later re-homes ownership.
   - **(c)** Keep waiting until Spec 131's switch, plus a one-site RELEASE-FLOW ballot so the question stops recurring.
   - Orchestrator's lean: (b). Peter's 10-29 F-1 chose the destination; the deferral rested on 131 being near, and 131 is now parked behind 132 (order (x′)).
   - Positions: Thurgood (final) (b); Stacy (final) (c).
   - Surviving counter: a five-seat signing round for a folder move no outside reader sees, and the seats switched sides twice in three rounds.
4. **2026-11-12T13:25:17Z**, Peter: **"(b), move now in one ballot"**

## What was ruled

- The release claims-pass records (and the § 5.3 delegate file) move to `.kiro/docs/releases/<v>/` (F-1 (ii)) **now**, without waiting for Spec 131's owners file. This supersedes F-2 (a)'s "applied when Spec 131's owners file gives the five writing seats access".
- **Vehicle**: one ballot that carries every site:
  - standing write scope over `.kiro/docs/releases/**` for Stacy, Thurgood, Ada, Lina and Leonardo (five `canonical/agents/**` frontmatter edits, each seat consulted per the standing-write-scope ballot § 3);
  - the RELEASE-FLOW step 6 switch, which removes the interim-home and fallback bullets;
  - the capture record's close.
- The ballot is drafted by Thurgood (owner of RELEASE-FLOW and drafter of the 10-29 ballot) and ratified by Peter, record-first. **This ruling directs the vehicle. It does not ratify text not yet written.**
- Records already written (15.0.0–16.3.0) stay where they are, per the 10-29 ballot § "Retroactivity", unless the new ballot says otherwise.
