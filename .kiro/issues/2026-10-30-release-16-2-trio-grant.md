# Grant: write scope for release 16.2.0's onboarding trio (the protocol repoint, the 16.2.0 frozen prompts and the 16.2.0 run records)

**Date**: 2026-10-30
**Owner**: Leonardo (the grantee: the trio's operator and the owner of `tests/onboarding-trio/protocol.md`). **Filed by**: Thurgood, the 16.2.0 release author, under README rule 10, on Leonardo's stated precondition (collective round 1: "a grant record naming `tests/onboarding-trio/{protocol.md,prompts/16.2.0/**,records/16.2.0/**}`. Thurgood files it, and it must be merged before the trio PR (rule 10)"). Rule 9 governs every later edit.
**Trigger**: `manual` — the event that owes the close is the merge of the trio PR, which is written only after this record's activating merge; re-ruled to `merge:#<N>` at its open. The grant expires at that merge (README rule 8: "until that PR merges"), and the trio PR closes this record with rule 5's outcome line and the archive move.
**Class**: P3 improvement · grant *(set 2026-10-30, Thurgood, filer, rule 12, on the precedent of the 16.1.0 release grants: `.kiro/issues/archive/2026-10-26-release-16-1-notes-grant.md`. The owed act it serves is carried in `2026-10-15-123-onboarding-trio-recurring.md`, a P2; this record only carries the grant. The owner may re-class it.)*
**Source**:
- **The owed act**: `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`, Trigger `release:next:phase-1`, "release 6's prep: the release after 16.1.0 runs the trio before its S, against its own preview candidate, as § 5.0 says".
- **The ruling**: Peter's R8 item 8, "your launch time", read as: run the trio in full before S, Leonardo schedules it, and Peter launches the sessions. That is in `.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` § "R8", cited `R8@<squash>` once this PR merges.
- **The version**: 16.2.0, ratified at R8 item 1, so the paths below name a real version.
- **The disposition**: the collective's disposition sheet r2.1, row F ("now, run in full before S"), decided under `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`.
**Consulted**: Leonardo — the path list is his, verbatim from his collective round-1 file. Nothing else is needed: this is a filing on the grantee's own stated list.

---

**Grant paths**: `tests/onboarding-trio/protocol.md`, `tests/onboarding-trio/prompts/16.2.0/**`, `tests/onboarding-trio/records/16.2.0/**`

## What the paths are for

- **`tests/onboarding-trio/protocol.md`**: the repoint to 16.2.0's preview candidate, in the sections the 16.1.0 grant named for the same act (§§ 2, 5.0, 5.1, 8, 9, 11–13, 15.3). It also takes the `## Runs`-adjacent wording the walk owes: "native charter deltas unprobed" (Kenya, collective round 1). The 16.2.0 delta changes the kenya and data consumer charters, and the trio has no native probe.
- **`tests/onboarding-trio/prompts/16.2.0/**`**: the successor frozen prompts for the three cold runs and the probe sessions, committed before the runs.
- **`tests/onboarding-trio/records/16.2.0/**`**: the run records, one per persona, with every C30 field, the forced negative per persona, `session-launched-by` and `operator-log`.

**Not in the grant**:
- the trio record itself, `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`, which Leonardo owns already (rule 9);
- `tests/onboarding-trio/fixtures/**`, unchanged for 16.2.0;
- any `governance/**` path. An issue grant can never grant one (rule 8).

## Activation, expiry and discipline (README rule 8)

- **Activation**: Peter's merge of the record-only PR that adds this file, whose body names this record and lists the three paths above.
- **Expiry**: the merge of the trio PR, branch `chore/release-16.2.0-trio` (Leonardo's to cut). It carries the protocol repoint, the prompts and the records in one PR.
- **Discipline**: the trio PR's body cites this path list verbatim. Its `git diff --name-only` must be a subset of the list as it stood at the activating merge (`git show <activating merge>:<this path>`), apart from the trio record that Leonardo owns. An out-of-list path is a claims-pass finding on the executing agent.

## Close

The trio PR adds rule 5's dated outcome line here, naming its merge, and moves this file to `archive/` in the same PR. A grant still open at its fixing PR's merge is a walk finding (rule 11).

*Signed: Thurgood, 2026-10-30, as filer.*
