# `issues-owned.sh` prints FIRED for a record its own fixing PR closed under rule 5, and a seat that trusts the token reads a lapse

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10, at the request of two owners who found it the same day while closing records on `chore/release-16.1.0-lina-closeouts` (Ada at `484d3c610`, Leonardo at `975f0bada` / `91cc9b33c`). Rule 9 applies to every later edit.
**Owner**: Thurgood (I own `scripts/issues-owned.sh` and `scripts/__tests__/issues-owned.test.ts`; the ballot that created the script is law, see "What is law").
**Class**: P2 obligation (guard) · defect *(set 2026-10-25, Thurgood, rule 12. The instrument reads weaker than its claim: Start Up Tasks item 9 says a FIRED record "that no ancestor of the firing commit closed or re-ruled has lapsed", and the script never asks whether an ancestor closed it. It misleads a reader who trusts the token. It hides no lapse, which is why this is not P1.)*
**Trigger**: `release:next:phase-1` — closes at the fix's merge; becomes `merge:#<N>` when the fixing PR opens (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle). The fix waits on Peter's re-ruling below, so the date is his to move.

---

## Source: two cases, both 2026-10-25

1. **`2026-10-13-generate-product-only-tip-without-product-tokens.md`**. Trigger `path:src/cli/designerpunk.ts` fired at `261982b63` (#438, 2026-10-22). That same commit added the rule-5 line `**Outcome (2026-10-22, Ada, … rule 5 — fixing PR: #438)**` and set Status `RESOLVED-pending-merge (PR #438)`. Only the `git mv` to `archive/` was missed. For three days `issues-owned.sh` printed `FIRED@261982b63` at every start.
2. **`2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`**. Trigger `merge:#442` fired at `722ea5bb0` (#442, 2026-10-22). That commit carried the rule-5 outcome line and Status `RESOLVED-pending-merge (PR #442)`; the Status flip to CLOSED and the `git mv` were missed. Same symptom.

Both are README rule 6's "closed as done-but-unclosed (no lapse)": rule 11 counts a commit as its own ancestor, so a record closed by the firing commit has not lapsed. Ada and Leonardo each closed the move by hand and added no `## Lapse` heading.

## What the script does (cite: `scripts/issues-owned.sh` at `83cfae189`)

- L113 reads the first `**Trigger**: ` line and nothing else of the body; L110 reads the first 15 lines for the Owner token only.
- L119–L129 (`path:`, `merge:#`) and L130–L132 (`tag:`) set `state=FIRED@<sha>` from git history alone. No branch reads `**Status**:` or an Outcome line.
- L140 counts every `FIRED@*` as fired. The header contract (L17–L26) and the ballot's contract (`2026-10-20-manual-records-routed-readers.md` § 2 E1, "Firing") define FIRED by path or merge touch alone, so the script matches its ballot. The ballot's contract is where the gap lives, and Start Up Tasks item 9's sentence on `FIRED@<sha>` is where the reader is told what the token means.

## The revisit clause: is this a "false FIRED"?

Start Up Tasks item 9 closes: "One false `FIRED` line … re-opens this item for re-ruling" (Peter, 2026-10-20). Its filed form, `2026-10-21-issues-owned-revisit.md`, tests a FIRED line for **whether the event happened** (M2). Here the event did happen, so on the record's literal test these are not false FIRED lines. The harm is the reading: the token tells a seat "lapsed unless closed", the seat cannot tell closed-at-fire from not-closed without opening the record, and Peter's stated reason for the clause was a read that misleads. **This is a call for Peter, not for me**: either the clause's test is "the event did not happen" (then the walk counts zero and this record is an ordinary defect), or its spirit is "the line misleads" (then item 9 re-opens now). I read it as the second, and I own the instrument, so I do not rule on my own reading. I have appended a pointer to `2026-10-21-issues-owned-revisit.md` so the first health-check walk counts these two cases under whichever reading Peter gives.

## Fix shape

Add a state for a fired record whose closing evidence is already in an ancestor of the firing commit (or the commit itself):

- Closing evidence, read from the record at `origin/main`: a line beginning `**Outcome (YYYY-MM-DD` (rule 5's dated outcome line), or a `**Status**:` line beginning CLOSED, RESOLVED (including `RESOLVED-pending-merge`), FIXED or EXECUTED, case-insensitive.
- **Order test, which is rule 11's own test and keeps this honest**: find the first commit on `origin/main` that added a closing-evidence line (`git log --reverse -G<regex> -i`), and print `DONE-UNARCHIVED@<fc>` only when that commit is the firing commit or its ancestor (`git merge-base --is-ancestor`). If the evidence arrived **after** the firing commit, the record did lapse at `<fc>`: it prints `FIRED@<fc>` as now, and the owner appends `## Lapse`, as rule 11 already says.
- `DONE-UNARCHIVED@<fc>` is **printed**, not suppressed: its action is "archive it (rule 5)". Suppressing it would leave the move unprompted and would make a wrong evidence match the costly direction (a hidden lapse).
- A closing-evidence record that has not fired prints as before (the evidence does not cancel a trigger that has not fired).
- Fixtures in `scripts/__tests__/issues-owned.test.ts`, one per case: (a) Outcome line added in the firing commit (path:), (b) Status CLOSED added in the firing commit (merge:#), (c) Status RESOLVED-pending-merge in the firing commit, (d) Outcome added a commit **after** the fire (stays `FIRED`), (e) neither (stays `FIRED`, the existing cases), (f) the two real cases above as regression names. The count line and the run log count `DONE-UNARCHIVED` apart from `FIRED`, so the walk's false-FIRED tally reads the log without a second correction.
- Mine to build, and not built here: the script's change is an instrument change under a ratified contract.

## What is law (route)

Yes, a law touch, in two sites; neither is mine to edit without a ballot ("owning an instrument never authorizes changing the law it serves without a ballot", standing write scope, six roots).

1. **The ballot's contract** (`2026-10-20-manual-records-routed-readers.md` § 2 E1, "Firing" and "Output"): amended by a ballot amendment adding the state. A ballot is Peter's to ratify, record-first.
2. **Start Up Tasks item 9** (`.kiro/steering/start-up-tasks.md`, Layer 1, steering): one bullet is added after `FIRED@<sha>`, `DONE-UNARCHIVED@<sha>: the event happened and the closing line is already in the record; archive it (README rule 5)`. Edit kind LAW (the amendment's path), Peter-merged, with the Last Reviewed bump. The same item's revisit sentence is the clause above; re-ruling it is Peter's, by ballot.

**To Peter, one line when the walk or the next options message carries it**: does the revisit clause test "the event did not happen" or "the line misleads"; and the fix shape above, or the alternative below.

## Surviving counter-argument, and the alternative

**Against the fix**: an Outcome line is prose. Parsing it adds a heuristic to an instrument whose value was being plain git. The forms in the corpus are several (`**Outcome (DATE`, `**Closed by`, "Owner line … outcome", the Status word list), and a form the regex misses prints `FIRED` as today (the safe direction), while a form it over-matches (a quoted "**Status**: CLOSED" inside body prose is excluded by the line-start anchor, but a Status line copied from another record is not) could hide a real lapse behind `DONE-UNARCHIVED`. The order test narrows that and printing the state keeps it visible, and it does not remove it.

**Alternative**: make the archive move mandatory in the fixing PR (README rule 5: "ideally in the PR that closes it, otherwise at the next health-check walk" becomes "in the PR that closes it"). No parsing, one sentence of rule text, a README edit (LAW by ballot like item 2 above). **What survives against the alternative**: both cases here are an owner or a relayed session that missed the move under a rule that already says "ideally", and a stricter rule is missed the same way; and the moment of the move is the fixing PR, before its merge, when the merge it depends on can still fail. A rule a seat can miss does not make the instrument true. The two are not exclusive; I recommend the instrument fix because it is correct under the failure the rule cannot prevent, and the rule edit as a cheap addition if Peter wants fewer such records. That recommendation is mine to give and the pick is his.

---

## Third case, 2026-10-25: the control (a real lapse; the fixed script must still print `FIRED`)

3. **`2026-10-12-steward-canonical-claims-theme-output.md`** (Thurgood, appended 2026-10-25 on `chore/close-steward-theme-claims-record`). Trigger `path:canonical/agents/[dk]*a.md` fired at `1524a96aa` (#472), whose diff edited exactly the sites the record names (kenya.md L281, data.md L283). That commit carried **no** Outcome line, no Status change and no Trigger change on the record, and #472 fixed only two of its four sites (kenya.md L178 and L202 remain). `issues-owned.sh` printed `FIRED@1524a96aa`, and that print was **correct**: rule 11's letter is a lapse, and I appended `## Lapse (2026-10-25)` there.

Why it belongs on this list: it is the shape a reader will want to call done-but-unclosed (the fix PR is the firing commit), and it is not. Cases 1 and 2 had the closing line in the firing commit; this one had the fix and not the line. The order test in "Fix shape" separates them without reading the fix's content: closing evidence absent from the firing commit and its ancestors means `FIRED`, and a human decides whether the fix PR also closed the record (here: half, so it stays ACTIVE with a re-ruled Trigger). It is a real-world instance of regression fixtures (d) and (e), and it guards against a fix that would read "the firing PR touched the files the record names" as closing evidence. On the class question: a fired record whose fix PR carried no closing line is a rule-11 lapse until someone proves it done. The cheaper prevention is the rule-10 habit of putting the record on the fixing branch, not reading this shape as rule-6 done-but-unclosed.

*Signed: Thurgood, 2026-10-25.*

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
