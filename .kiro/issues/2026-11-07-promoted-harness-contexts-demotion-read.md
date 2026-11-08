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

*(added 2026-11-08 by ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` item 1, site 1.4, RATIFIED for items 1 and 3 (Peter, 2026-11-08T20:36:57Z). Written by Thurgood and reviewed by Stacy, the co-owners (rule 9). The steps are the ballot's text at `d68460752`, verbatim. The four bullets after them are site 1.4's, with "my seat" written as "Thurgood's seat". The last three bullets are the co-owners' (rule 9): the F-2 read, from `.kiro/issues/2026-11-08-push-run-red-first-seen-on-a-pr.md`, which this section's PR closes; the closed-record tag line; and what a red is, added by Stacy on 2026-11-08 to agree with `stability.ts` at `5aa5a3fae` (#819).)*

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
- **The F-2 read** (ballot F-2 (a), the joint pick, `[STACY R3]` § 1 and `[THURGOOD R4]`): when step 2 classes a push-run red *environment*, the reader also runs `gh run list --workflow native-harness.yml --event pull_request -L 50 --json databaseId,headSha,conclusion,createdAt`. The reader then asks whether an earlier `pull_request` run concluded `failure` in the same context and the same environment class (a toolchain-field mismatch, or the same `harness-infra` host). That run must be at a head `h` where `git diff --quiet <h> <red head> -- harness scripts/harness .github/workflows/native-harness.yml` exits 0, and it must come before the first red push run. If yes, the reader offers Peter F-2 (b), a `schedule:` run on `main` every 6 days or less, with both runs' URLs. The offer is a question to Peter, never an act. The log line for an environment red ends `— first seen on PR run <id>` or `— not seen on a PR first`.
- **A tag red on a closed record**: the dated line of step 3 is still appended to the record in `archive/`. Because no session start prints an archived record, the reader also files a new root record under step 3, Owner the lane owner whose list holds the entry, and in it names the archived record and the entry to move.
- **What a red is** (co-owners, rule 9; it agrees with `stability.ts` at `5aa5a3fae`, #819): a push run is red when one of its jobs read `FAIL`, or concluded neither `success` nor `cancelled`. A push run that the concurrency group cancelled is **superseded, not red**. That covers a job that concluded `cancelled` with no `FAIL` verdict, and a run that ended `cancelled` with no job listed. Run 42525391424 at `b305b550a`, the first burst, was the second kind: it listed 0 jobs. A superseded run is not triaged and gets no log line, because the newer squash's run measures a tree that contains it. A cancelled job that had already read `FAIL` stays red. The `gh run list` query above prints `cancelled` for a superseded run, and the stability record lists it under `superseded (cancelled, not red)`.

### Log

*(No red read yet.)*

## Where it lives after Spec 129

The stability record's path is under Spec 129's folder. When 129 closes, its owners re-home the record path and this charter's text in the same act that closes or re-rules this charter.
