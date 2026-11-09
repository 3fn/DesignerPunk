# Grant: write scope for release 16.3.0's onboarding trio (the protocol repoint, the 16.3.0 frozen prompts and the 16.3.0 run records)

**Date**: 2026-11-09
**Owner**: Leonardo (the grantee: the trio's operator and the owner of `tests/onboarding-trio/protocol.md`). **Filed by**: Thurgood, the 16.3.0 release author, under README rule 10, on the path list the owed act names (the trio record's owner line: "The grant row for `tests/onboarding-trio/**` naming Leonardo. Thurgood files it"; the 16.2.0 precedent, `.kiro/issues/archive/2026-10-30-release-16-2-trio-grant.md`). Rule 9 governs every later edit.
**Trigger**: `manual` — the event that owes the close is the merge of the trio PR, which ends the grant (README rule 8: "until that PR merges"). It is re-ruled to `merge:#<N>` when that PR opens.
**Class**: P3 improvement · grant *(set 2026-11-09, Thurgood, filer, rule 12, on the precedent of the 16.1.0 and 16.2.0 trio grants. The owed act is carried in `2026-10-15-123-onboarding-trio-recurring.md`, a P2; this record only carries the grant. The owner may re-class it.)*
**Source**:
- **The owed act**: `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`, Trigger `release:next:phase-1`: the release after 16.2.0 runs the trio before its S, against its own preview candidate (§ 5.0).
- **The ruling**: Peter, 2026-11-09T03:33:57Z, "Re: 1, Yes. Re: 2, (a) …". That is release 16.3.0 now, with the trio run as written (each persona once against the 16.3.0 preview candidate, before S, under the current protocol, Peter launching each session). Recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-rulings-release-16-3-0.md` (PR #844).
- **The version**: 16.3.0, a minor, per the same ruling. So the paths below name a real version.
**Consulted**: Leonardo — the path list is his request, relayed by the orchestrator; it is the 16.2.0 grant's list with the version moved. Nothing else is needed: this is a filing on the grantee's own list.

---

**Grant paths**: `tests/onboarding-trio/protocol.md`, `tests/onboarding-trio/prompts/16.3.0/**`, `tests/onboarding-trio/records/16.3.0/**`

## What the paths are for

- **`tests/onboarding-trio/protocol.md`**: the repoint to 16.3.0's preview candidate, in the sections the 16.1.0 and 16.2.0 grants named for the same act (§§ 2, 5.0, 5.1, 8, 9, 11–13, 15.3).
- **`tests/onboarding-trio/prompts/16.3.0/**`**: the successor frozen prompts for the three cold runs and the probe sessions, committed before the runs.
- **`tests/onboarding-trio/records/16.3.0/**`**: the run records, one per persona. Each carries every C30 field, the forced negative, `session-launched-by`, `operator-log`, and one disposition line per prior finding (`governance/release-management-system.md` step 6).

**Not in the grant**:
- the trio record itself, `.kiro/issues/2026-10-15-123-onboarding-trio-recurring.md`, which Leonardo owns already (rule 9);
- `tests/onboarding-trio/fixtures/**`;
- any `governance/**` path, which an issue grant can never grant (rule 8);
- the preview candidate itself. That is built by the release's batching PR (Thurgood) and named by its pack, sha1, sha256 and commit.

## Activation, expiry and discipline (README rule 8)

- **Activation**: Peter's merge of the record-only PR that adds this file. Its body names this record and lists the three paths above.
- **Expiry**: the merge of the trio PR, on Leonardo's branch. It carries the protocol repoint, the prompts and the records.
- **Discipline**: the trio PR's body cites this path list verbatim. Its `git diff --name-only` must be a subset of the list as it stood at the activating merge (`git show <activating merge>:<this path>`), apart from the trio record that Leonardo owns. An out-of-list path is a claims-pass finding on the executing agent.

## Close

The trio PR adds rule 5's dated outcome line here, naming its merge, and moves this file to `archive/` in the same PR. A grant still open at its fixing PR's merge is a walk finding (rule 11).
