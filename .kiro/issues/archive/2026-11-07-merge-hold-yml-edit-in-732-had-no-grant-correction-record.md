# Record: #732's edit to `.github/workflows/merge-hold.yml` had no grant or standing scope; the authority line was undated

**Date**: 2026-11-07
**Owner**: Thurgood
**Class**: correction record (a dated record, not a grant)
**Trigger**: manual — closed when the charter-scope ballot that carries `merge-hold.yml` is ratified or Peter drops it; it is queued sixth in Thurgood's queue, before U12 (Peter, 2026-11-07T20:24:04Z, "bottleneck plan, approved").
**Source**: `.kiro/specs/129-consumer-generation-completeness/completion/arming-reads-2026-11-07.md` R9 and F3 (Stacy's ARMING read, `chore/129-arming-reads-batch`); `completion/claims-pass-midpoint.md` MP-3's neighbour in the same window; Peter's ruling "Re: Decision 1, (ii)", received 2026-11-07T20:43:17Z (`evidence/2026-11-07-peter-rulings-arming-batch.md`).

---

## What happened

#732 (`cd340c59b`, merged 2026-11-07T19:47:55Z, head `4d19b33b9`) edited `.github/workflows/merge-hold.yml`: 6 lines added, 1 deleted. The deleted line is a comment line, rewritten with its continuation. The added lines are two comment lines and, in each job, two `env:` entries (`BASE_SHA`, `BASE_REF`). No step, `if:`, floor or assertion is removed or weakened, and the `run:` line is unchanged. The edit made the `law-ratified` and `merge-hold` checks judge the checked-out head and the fetched base.

The file defines a required check. No grant covered the edit (the `merge-hold-checks-build-grant` expired at #728), and Thurgood's standing CI scope is the `lane-timing.yml` test-script steps and `.github/in-lane-guards.json` entries, which `merge-hold.yml` is neither. The PR body's authority was one undated line: `Peter approved the fix: "Yes, please" (2026-11-07)`.

## The authority line, dated

- **Peter's words, verbatim**: "Yes, please. Should I merge 730?"
- **Received**: 2026-11-07T19:33:23Z. This is taken from the session transcript log (the user turn is stamped 19:33:23.648Z). It was not taken at receipt, so it is a transcript time and not a `date -u` reading.
- **The question it answered**, asked by the orchestrator at 19:29:53Z: "Shall I have Thurgood fix the `law-ratified`/`merge-hold` head read here, after U6 merges?" The words did not name the file path. "Should I merge 730?" was a second question in the same message and is not answered by this record.

## Status of this record

**Recorded after #732's merge; not a grant.** README rule 10: a record made after a merge cannot be that merge's authority. It dates the words and names the question they answered, so a reader of #732's body no longer meets an undated line. It makes no edit retroactively authorised, and it widens no one's scope.

## The class fix

Peter's Decision 1, (ii) (2026-11-07T20:43:17Z): `merge-hold.yml` joins the charter-scope ballot approved as a class option at 2026-11-07T20:21:05Z. That ballot covers `scripts/harness/stability.ts`, `scripts/harness/native-rules.ts` and their tests. It carries a mechanical bound on what counts as a fix (no step, `if:`, floor or assertion removed; `run:` lines unchanged; deleted comment lines quoted), amends `2026-09-27-ci-regime-standing-scope` § 2 as needed, is consulted with Stacy, and goes to Peter for ratification. Option (i), one grant per fix, was not picked.

Until that ballot is ratified, a further edit to `merge-hold.yml` needs an issue-row grant (README rule 8) or Peter's dated direction outside the diff (rule 10).

## Outcome

**Outcome** (2026-11-07): closed on the ratification of ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` (Peter, 2026-11-07T22:30:08Z). `merge-hold.yml` fixes now sit inside P1c's bound B1–B5 (F-1 (a)), applied in the charter-scope application PR. The edit in #732 is not retroactively authorised; this record stays a dated correction. Archived in the application PR (README rule 5).
