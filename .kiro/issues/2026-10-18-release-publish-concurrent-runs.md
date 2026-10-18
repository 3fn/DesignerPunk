# Nothing stops two concurrent release-publish 5.3 runs: the 16.0.0 duplicate run and what held (RS-32)

**Date**: 2026-10-18
**Status**: FIXING — law text reverted pending ratification (2026-10-18); the fix closes at the merge of the PR carrying the ratified text, with (b) held; archive at the next walk
**Owner**: Thurgood (RELEASE-FLOW text) · Ada (the script)
**Trigger**: `manual` — the held option (b), a script lock, is owed at the SECOND duplicate 5.3 run (the event is a duplicate run, which no token expresses: not a tag, merge, path or release). *(Re-ruled 2026-10-18, Thurgood, rule 11: fork (a) was taken, so the `release:next:phase-1` close is met by the text fix; what remains is an event-held option. Authority: Peter's "proceed as recommended", 2026-10-18, relayed by the orchestrator, taking this record's fork (a) with (b) held behind "a second duplicate run". The superseded trigger, verbatim:)* `release:next:phase-1` — the fix lands first, or a dated waiver line here. *(Re-ruled 2026-10-18, Thurgood, for both owners: was "before release-5 step 5.3". Step 5.3 runs `scripts/release-publish.ts` in a fresh clone at the tag, so a fix that is not in the tagged release squash S does not hold at 5.3; the phase-1 token fires at S. Authority: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2 back-fill, the application PR `chore/ballot-sitting-application`.)*
**Source**: RS-32, Stacy's RELEASE phase 2 for 16.0.0 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.0.0.md`, L735 and L793). Stacy named the gap and asked the question; she did not draft it. Run record: `docs/releases/16.0.0/publish-verification.txt`, the 5.3 duplicate-run section.
**Grant paths**: none here — the fixing PR touches `.kiro/hooks/RELEASE-FLOW.md` (law; `**Consulted**: Ada`, Peter-merged) and/or `scripts/release-publish.ts` (Ada, standing)
**Consulted**: none needed — filing only
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-18, Thurgood, under `.kiro/issues/README.md` rule 12; the `(guard)` reading is ballot 2026-10-18-obligation-drain-and-release-falsity-floor M5's; under F-A1 (b) a P2 `(guard)` escalates at its first lapse, rule 11)*

## The incident

2026-10-16, Peter ran `npx tsx scripts/release-publish.ts 16.0.0 --expect-sha 13adf005…` from two terminal tabs about 4 s apart. Each built from the tag in its own fresh clone. Tab 0's PUT to GitHub Packages landed first (14:31:56Z). The registry refused tab 1's with E409 (`Cannot publish over existing version`), and the script printed `REFUSED … Nothing was published.`

Two tarballs now exist in the OS temp dir:
- **The artifact**: `e9d8bfca5371eacc6fdf30579a512b280c1c165a`, in tab 0's work dir (`dp-release-vFNgYW`), with `release-publish-record.json`. It is what both registries hold.
- **The orphan**: `c543b5534f9923d53567d7aa3f914fc55a3c1577`, in tab 1's kept work dir (`dp-release-UuoCX1`), with **no** record. It differs from the artifact in exactly the three build-timestamp files. It was never published and is not an artifact of 16.0.0.

## What held, and what did not

Held: the registry will not overwrite a version, and the 5.4 sha1 check compares against the record. Neither is something 5.3 does to prevent two runs; the safety was incidental to the order in which the registry accepted them. Did not: nothing in the script or in RELEASE-FLOW 5.3 stops, warns of, or names a second run. A losing run leaves a kept tarball that looks like a release candidate. If someone took the orphan to 5.4, the sha1 check against the 5.3 record is what would catch it (my reading of the 5.4 text, not a tested path); the script itself would not refuse.

## Fix shape — not picked

- **(a) Text in RELEASE-FLOW 5.3**: "one run at a time, from one terminal; wait for the tally; a kept work dir with no record is not a candidate." Cost: one law PR, Peter-merged. Surviving counter: it relies on the operator remembering a line, and this incident was the operator running the command twice.
- **(b) Script lock**: refuse to start when a lock for the same version is live — a lock file in the OS temp dir keyed by version (`mkdtemp` names are random, so the work dir cannot be the lock), cleared at exit. Stale-lock handling must be named: a crashed run's lock needs a pid-liveness check or a documented manual clear. Cost: new state in a script that runs about once per release, plus its test. Surviving counter: it guards a hazard the registry already makes inert, and a stale lock can block a real release at the worst moment.
- **(c) Both, text now and lock later.** Cost: two PRs, and the lock then needs its own trigger to avoid never landing. Surviving counter: that "later" is how RS-31-class gaps recur.

**My lean** (a lean, not a pick): **(a) now**, with (b) held behind a trigger — a second duplicate run, or any release where the orphan is mistaken for the artifact. The registry plus the 5.4 sha1 check make the harm bounded; the missing piece is that the line was never written. The fork between (a) and (c) is Peter's.

## The orphan tarball

The operator may delete `dp-release-UuoCX1` from the OS temp dir; nothing reads it. The record pastes its sha1 (`c543b553…`) so nobody mistakes it for the artifact if it is not deleted. I have not touched it. That directory is on Peter's machine and I did not check that it still exists.

## Unverified

I did not re-run or re-read the registries. The incident facts are from Stacy's phase 2 and the `.txt` run record, read in this worktree.

## Fixed (2026-10-18)

**Fork taken**: (a), per Peter's "proceed as recommended" (2026-10-18, relayed by the orchestrator; the owners' lean, recorded above). (b) is held; (c) is not taken.

**What changed**: `.kiro/hooks/RELEASE-FLOW.md` step 5.3 gains a sub-bullet: run 5.3 once, from one terminal, and wait for its tally; a second concurrent run builds a second tarball the registry refuses (E409) and leaves an orphan work dir with no record that looks like a candidate; the 16.0.0 record's duplicate-run section is the precedent; the script does not yet lock. The same PR carries RS-31's sentence (Ada's record) and the script change `87d3407f2`.

**Held, with its trigger**: option (b), a lock keyed by version in the OS temp dir with the stale-lock handling named above, is owed at the second duplicate 5.3 run. The Trigger line is re-ruled to `manual` with that event in prose; no token expresses it. The surviving counter-argument stands: the text relies on the operator remembering a line, and the incident was the operator running the command twice; the registry (E409) and the 5.4 sha1 check against the record bound the harm.

**Not done**: the orphan work dir `dp-release-UuoCX1` is on Peter's machine; untouched.

**Archive note (Thurgood)**: rule 5 archives this record at the next walk, and rule 1 keeps a trigger only on root records. If (b) is to stay watched after the archive, the walk files a successor record for the held lock then; I have not filed one here, because Peter's relay said "held behind a trigger" and did not rule a second record.

**2026-10-18 (Thurgood)**: law text reverted pending ratification; micro-ballot drafted (`.kiro/docs/ballots/2026-10-18-release-flow-5-3-single-run-and-both-logins.md`). The revert `1cac2e986` undoes `117254bcc`; this record's `## Fixed` section above states the intended outcome and takes effect at the ratified re-apply.
