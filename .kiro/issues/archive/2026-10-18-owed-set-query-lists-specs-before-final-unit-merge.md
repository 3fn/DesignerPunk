# Issue: the owed-set query lists specs as OWED before their final unit has merged, so a fresh born repo prints its two starter specs as owed on day one

**Date**: 2026-10-18
**Status**: FIXED — closes at the merge of the follow-up PR that carries the disclosure sentence (§ "Fixed (2026-10-19)"); archive in that PR or at the next walk (rule 5). *(Was: ACTIVE.)*
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

---

## Fixed (2026-10-19)

**Signed: Stacy (owner, overlay text), 2026-10-19.** I wrote the text. Thurgood applies it byte for byte on the follow-up branch under F12′, because I re-sign the row in the same range. The record closes at that PR's merge.
- **Authority**: Peter's ruling in chat, 2026-10-19: "agreed" to "one disclosure sentence, Stacy's text" (fix shape 1 below). The record of that go is the orchestrator's, not this file. The P0 class is Peter's to downgrade and he did not; the fix removes the false claim instead.
- **The shape: fix shape 1, consumer text only.** One sentence in `canonical/profiles/consumer/stacy.overlay.md`, under the query's closing fence and above the `The classes:` paragraph (L141 after the patch): `OWED:` rows are candidates, not verdicts; a spec owes a closeout claims pass only once its final declared merge unit has merged (the unit's PR has merged and its tasks are ticked in `tasks.md`), so rows for specs still in progress, such as your two starter specs on day one, are expected and are not findings. The sentence is verbatim in `<scratchpad>/stacy-owedset/sentence.txt` and in the three consumer renderings after regeneration.
  - **Where, and not the script**: the reader meets the output, then the classes paragraph that explains `OWED`. I did not change the `echo "OWED:"` label: it is query text, and query copies are kept to the same text (overlay L143 before the patch, L145 after). Changing it is shape 2's decision.
  - **The parenthesis names the merge, then the ticks**: the PR merge is the fact; a tick is an assertion awaiting that merge (Task Completion Protocol, "A task is complete at MERGE"). A consumer agent that sees every box ticked on an unmerged branch reads "has merged" first and is not misled by the tick.
- **Verified (2026-10-19)**: the patched overlay passes `derive()`, and its body carries the sentence verbatim; a fresh `generateAll` → `writeOutputs(<temp>)` over the patched tree changes exactly the three Stacy renderings and their sidecars (+2 lines each, nothing else), and the canonical unit hash is unchanged (`sha256:e3f6f82a…`, equal to the overlay pin). Predicted renderedHash `sha256:19cef6df…`; control: the unpatched tree gives the committed `c821fc77…`. Detail: `<scratchpad>/stacy-owedset/predict.md`.
- **Not dragged**: the two frozen G1 renderings (`run1.E.…txt`, `semguard.overlay.md`) pin run-1 blobs and do not read the live overlay; the `born-{cc,kiro}` fixtures carry the old rendering as founder repos and no test compares them to the generator. Not run here: the suites (read-only seat).
- **Still open, deliberately not done here**: the over-listing itself.
  - **Shape 2 (a counted `open` exclusion)** is a query change on both tiers' copies, needs the stub-charter rule (a spec with no `tasks.md`), and treats a checkbox as a fact. Filed as a P3 record (Edit C) with a `manual` trigger.
  - **Shape 3 (a committed script)** waits on Peter's answer to the 2026-10-17 health-check question (`.kiro/docs/civitas-health-checks/2026-10-17.md` L115–121), which is Thurgood's to put to him. Filed in the same P3 record, not as a second one, because 2 is built inside 3 if 3 is chosen.
- **The surviving counter**: a sentence is a reader's duty, not a guard. An agent that does not read the prose after the query still prints `OWED: ci-needs` and may report it. The disclosure removes the false statement; it does not stop the misreading. What the over-listing costs a consumer who skips prose is a mis-stated owed set in a report the claims pass reads, which is a visible-number direction (the reader of the report sees `ci-needs` with an untouched `tasks.md`), and shape 2 closes it only by trusting a checkbox. That residual is why the P3 record exists.

## Archived (2026-10-20)

*Signed: Thurgood (Civitas steward), archived by the steward, early walk act, Peter's go 2026-10-20 ("Go on the records PR with the class option and resolving F-1 and F-2, please", chat, relayed by the orchestrator); README rule 5, "otherwise at the next health-check walk".*

- **Outcome**: the disclosure sentence (§ "Fixed (2026-10-19)") merged as #415, `e92742a1f` (2026-10-19), before release-5 phase 1; the over-listing residual (shapes 2 and 3) is filed as the P3 record `2026-10-19-owed-set-query-over-lists-in-progress-specs.md`, which stays at the root. The outcome above is the owner's (Stacy); this line adds only the merge SHA. Moved to `archive/` by `git mv` in the same commit as this line.
