# Charter: read each promoted harness context for demotion, at every monthly health check and every release

**Date**: 2026-11-07
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 8, which creates the obligation (`.kiro/specs/129-consumer-generation-completeness/tasks.md` § "Decision 6", "The promotion lifecycle", step 6). Stacy's read of that amendment found that it lived only in a plan line.
**Owners**: Thurgood (the monthly and release-S read), Stacy (the RELEASE read)
**Class**: P2 obligation (guard) · charter
**Trigger**: `manual` — the event that owes the close is either of two. One is that no harness context remains required, because each promoted context has been demoted or the harness retired. The other is that this read is written into a standing home by its owners' ballot: Thurgood's and Stacy's canonical charters, or `scripts/governance-check.sh`. The read starts at the first promotion's merge. Until then this charter is dormant. The monthly walk reads it like every root record, and that walk is where the read happens.

---

## What is read

From a stability record re-run at the read (`scripts/harness/stability.ts`, committed as `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` while Spec 129 is open), for each promoted context, the demotion triggers of `tasks.md` § "Decision 6", step 6:
- (a) any root record naming a false green, with its pasted evidence;
- (b) the script's infra finding (two or more consecutive infra runs at one head SHA), its infra rate above 10%, or two attempts-differ runs since the promotion's merge with no infra on either attempt.

A trigger offers the context to Peter for demotion. Demotion is Peter's act, under an issue-row grant that names it, and Stacy's ARMING read fires again.

## Where each read is recorded

- Thurgood: one line per promoted context in the monthly health-check record (`.kiro/docs/civitas-health-checks/`) and in his release-S pass, naming the stability record's commit and "no trigger" or the trigger found.
- Stacy: in her RELEASE claims-pass record.

## The push-run read

*(added 2026-11-08 by ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` item 1, site 1.4, RATIFIED for items 1 and 3 (Peter, 2026-11-08T20:36:57Z). Written by Thurgood and reviewed by Stacy, the co-owners (rule 9). The steps are the ballot's text at `d68460752`, verbatim. The bullets after them are site 1.4's, with "my seat" written as "Thurgood's seat".)*

From the merge of the ballot's site 1.1, `native-harness.yml` also runs on every push to `main`, with jobs named `<context> (main)`. **The reader is Thurgood.**

**What the reader does on a red**:
1. **Same session**: read each failed job's `harness-verdict` and `harness-infra` annotations (they outlive the logs).
2. **Classify**:
   - *infra* (`harness-infra`, no verdict): re-run the failed jobs once (`gh run rerun <id> --failed`). Green → one log line, nothing filed. Infra again → read it as *environment*.
   - *environment* (a toolchain-field mismatch, or the same red on a dispatch at the last green push run's head, with `git diff --quiet <that head> <red head> -- harness scripts/harness .github/workflows/native-harness.yml` exiting 0): route to the lane owner, Data (Android) or Kenya (iOS), under their standing repair scope.
   - *tag* (a `FAIL tag:` verdict line; `compare.ts`'s tag rules, which on a push run read the head's own first-parent history, L1141–1143): a list entry is tagged to a root record that has fired and is still open, or that is closed. Route to **the tagged record's owner(s)**, who close or re-rule it (rule 9). Where the entry itself should move to another record, route also to the lane owner whose list holds it. Never to the squash's author, who may not touch the record (`[STACY R1]` B-5; #791 → #796 is this class).
   - *tree regression* (anything else): find the first red squash between the last green push run's head and the red head (dispatch the squashes the concurrency group skipped), and route to that squash's PR author (its `Agent:` line) and to the owner of the failing entry's domain.
3. **Open a record for every routed red** under rule 10, in the same session, Owner the routed seat and filed by Thurgood, so that the owner sees it at session start through `issues-owned.sh` (`[KENYA]`: she reads only at session start). For a *tag* red, the record is a dated line appended to the tagged record (any seat may append; rule 9), not a new file. The record or line carries the run ID and URL, the red head SHA, the failing context, the runner image (`ImageOS` and `ImageVersion` from the job's "Set up job" log), and, for an environment red, the observed toolchain values the comparator printed against the pinned ones (`[DATA]`). Class **P1 consumer-blocking** when a tier that compiled stops compiling (a release carrying it ships it), else **P2 (guard)**. Trigger `release:next:phase-1`, or `merge:#<N>` once a fix PR exists, so the release walk reads it as a floor-class row.
4. **Tell Peter in that session** when the red context is in `EXPECTED_CONTEXTS`: every PR's merge ref now carries the break.
5. **Never** move an expected list, a pin or the protected set to turn a red green. Those acts are the lane owners' and Ada's, under their own scopes.

- **When**: at every session start in Thurgood's seat (this record's Trigger is `manual`, so `./scripts/issues-owned.sh Thurgood` prints it every session), at every monthly walk and every release S beside the demotion read, and whenever a seat or Peter reports a red push run.
- **The query**: `gh run list --workflow native-harness.yml --event push --branch main -L 5 --json databaseId,headSha,conclusion,status,createdAt`.
- **The log**: one dated line per red read, `<date> run <id> @ <sha> — <infra|environment|tag|tree> — <record filed or line appended, or re-run green>`, appended under the section.
- **Honest reach**: between Thurgood's sessions nothing reads a red but Peter's own GitHub notification for the push his merge made (GitHub notifies the actor of a failed run they triggered; that this reaches Peter depends on his notification settings, unverified).

### Log

*(No red read yet.)*

## Where it lives after Spec 129

The stability record's path is under Spec 129's folder. When 129 closes, its owners re-home the record path and this charter's text in the same act that closes or re-rules this charter.
