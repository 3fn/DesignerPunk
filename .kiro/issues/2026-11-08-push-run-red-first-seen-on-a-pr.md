# Issue: the read that offers Peter a schedule (F-2) needs the PR runs, and the push-run read does not look at them

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event that owes the close is the merge of the PR that applies ballot site 1.4 (the push-run read, in `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`). That PR either carries the read below or rules it out with a reason. Only the steward sees when that PR is cut.
**Source**: ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md`, F-2 (a), ratified with items 1 and 3 (Peter, 2026-11-08T20:36:57Z, "Ratified"). The record of the ruling is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-cracks-ballot-items-1-3.md`. The source of the read is `[STACY R3]` § 1 (F-2), in the ballot's § 10.

---

## The gap

- **Under F-2 (a)** there is no schedule. My joint-pick answer set the trigger for offering Peter one: the first *environment* red that shows on a PR before any push run shows it.
- **Site 1.4's reader reads push runs only.** So a red seen first on a PR is not in the reader's query, and the trigger as stated never fires. Every outside break shows on a PR first, and the reader would see it only as a push-run red.

## The act

When a push-run red is classed *environment* (site 1.4, step 2), the reader also runs:

```bash
gh run list --workflow native-harness.yml --event pull_request -L 50 --json databaseId,headSha,conclusion,createdAt
```

The reader then asks whether an earlier `pull_request` run concluded `failure` the same way, at a head `h` with `git diff --quiet <h> <red head> -- harness scripts/harness .github/workflows/native-harness.yml` exiting 0, before the first red push run. "The same way" means the same context and the same environment class (a toolchain-field mismatch, or the same `harness-infra` host).
- **If yes**, that is the F-2 trigger. The reader offers Peter F-2 (b), a schedule on `main` every 6 days or less, with the two runs' URLs. The offer is a question to Peter, never an act.
- **The answer goes in the push-run read's log line**: `<date> run <id> @ <sha> — environment — first seen on PR run <id> | not seen on a PR first`.

**Where it lands**: in the PR that applies site 1.4, as one more line under "What the reader does on a red". That is my record section, and Stacy co-owns it (rule 9). Site 1.4 is ratified as written, so if that PR's author reads this addition as more than site 1.4 names, this record goes to a ballot line instead.
