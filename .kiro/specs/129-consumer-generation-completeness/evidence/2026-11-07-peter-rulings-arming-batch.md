# Peter's rulings, 2026-11-07 20:43Z: the ARMING batch's two escalations

**Recorded by**: the orchestrator (primary session). This is a record of rulings, not law.
**Received**: 2026-11-07T20:43:17Z (`date -u`, at receipt).

## Peter's words, verbatim

> Re: Decision 1, (ii)
> Re: Decision 2, fix-now

## What each part answered

The paraphrase below is the orchestrator's. Only the quoted lines above are Peter's.

Peter had just read the orchestrator's brief on two escalations from Stacy's ARMING batch (`completion/arming-reads-2026-11-07.md`). Thurgood was consulted on both; Stacy found both and left both picks to Peter.

- **Decision 1, (ii): how future fixes to `.github/workflows/merge-hold.yml` are authorized.**
  - **The finding (F3, R9):** #732 (`cd340c59b`) edited that file, which defines the required check `law-ratified`. No grant or standing scope covered the edit, and the PR cited Peter's authority as an undated line.
    - Peter's words were "Yes, please. Should I merge 730?", received 2026-11-07T19:33:23Z. The orchestrator recovered that time from the session transcript log, because it was not taken at receipt.
    - They answered the orchestrator's question, "Shall I have Thurgood fix the `law-ratified`/`merge-hold` head read here, after U6 merges?" They did not name the file path.
  - **The instance remedy, either way:** Thurgood writes a dated correction record. It is not a retroactive grant (README rule 10: a record made after a merge cannot be that merge's authority).
  - **The ruling, (ii):** `merge-hold.yml` joins the charter-scope ballot Peter approved as a class option at 2026-11-07T20:21:05Z (`evidence/2026-11-07-peter-rulings-post-midpoint.md`, "Re: 3"). That ballot already covers `scripts/harness/stability.ts`, `scripts/harness/native-rules.ts` and their tests. The ballot:
    - carries a mechanical bound on what counts as a fix: no step, `if:`, floor or assertion is removed; `run:` lines are unchanged; deleted comment lines are quoted;
    - amends `2026-09-27` § 2 as needed;
    - is consulted with Stacy;
    - goes to Peter for ratification.

    The ballot stays sixth in Thurgood's queue, before U12, per Peter's "bottleneck plan, approved" (2026-11-07T20:24:04Z).
  - **The option not picked:** (i), one grant per fix.
- **Decision 2, fix-now: Stacy's lapsed P2 `(guard)` record `.kiro/issues/2026-11-07-merge-hold-promotion-reads.md`.**
  - **The finding:** its `path:` token fired on #732's edit of the file, not on the promotion its prose names. This is its first lapse, so under README rule 11 it goes to Peter as spec, drop or fix-now.
  - **The ruling, fix-now:** accept Stacy's re-keyed Trigger, made in her ARMING batch PR, branch `chore/129-arming-reads-batch` (`872e5e9b8`).
  - **The cost that survives:** the new token fires on any other edit of `verify-gate-registration.sh`, at one read-and-re-arm line each time.
