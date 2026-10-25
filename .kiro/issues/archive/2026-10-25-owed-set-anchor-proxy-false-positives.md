# The owed-set script still lists closed specs as candidates: the anchor proxy, five releases running (RS-3)

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10, in the 16.1.0 walk's PR (`.kiro/issues/2026-10-25-release-16.1.0-walk.md` row 26). Stacy surfaced it in her walk read of 2026-10-25, quoted below. Until now the fork had no home: "RS-3 lives only in my 15.0.0/16.0.0 Standards-implications and the walk's note" (Stacy, 2026-10-25).
**Owner**: Thurgood. I own `scripts/owed-set.sh` and its test, and I author RELEASE-FLOW § 5a's text through its review round. Stacy specifies the falsification fixtures (Q5 instrument pattern). The fork is Peter's.
**Class**: P2 obligation (record) · defect *(set 2026-10-25, Thurgood, rule 12, on Stacy's proposal: "propose P2 (record) with Thurgood's re-class". The script over-lists, and over-listing is the safe direction: no owed spec is hidden, and the operator's reading corrects the printed set at each release. What is wrong is the form of the result, a candidate list that needs a correction every release, not a guard that claims more than it holds.)*
**Trigger**: `merge:#473` — the fixing PR, which closes this record (rule 11) by recording the outcome and archiving it. *(was: `release:next:phase-1` — the next release's walk reads whether Peter has picked (A) or (B) and, for (A), whether the fixing PR has merged.)* *(Re-ruled 2026-10-25, Thurgood, rules 1 and 9: the vehicle PR now exists, so the Trigger names its number, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle. The earlier token was set 2026-10-25, Thurgood, rule 1.)*
**Status**: CLOSED for the script defect (2026-10-25, rule 5; fixing PR #473 merged as `1eced6cd5`). The law-text question did NOT close with it: it moved to `.kiro/issues/2026-10-25-owed-set-law-text-after-closing-commit-anchor.md`.
**Consulted**: Stacy — her walk read of 2026-10-25 (quoted below) is the consult. She specifies the fixtures.

---

## What happens

At the 16.1.0 walk (`main` `652074c6b`), `bash scripts/owed-set.sh` printed **2 candidates**, and both are closed specs:
- **`122`** (class a): its final unit is #67, merged 2026-07-11, before ratification. The anchor `7fa64c6d8` is a later touch.
- **`023`** (class b): new this run. The anchor `a6ed875a9` is #452, which appended a supersession to `design.md` and a correction to `completion/task-4-parent-completion.md`. That is an erratum to a closed spec. Its last unit merged 2025-12-19 (`f546c494c`).

Stacy, 2026-10-25: "the script's documented known limit (anchor = path proxy) has now produced a false candidate in 2 of 2 candidate rows at this release (5th consecutive release needing operator correction; 15.0.0 RS-3 fork never homed). Over-listing is the safe error, so (B) 'working as designed' is defensible; but the script was built to remove the operator correction and the correction is still being made every release."

## The fork (Peter's)

- **(A) Replace the proxy with the definition**, plus Stacy's falsification fixtures. Stacy's class option, quoted: "replace the anchor proxy with the definition — candidate iff the post-adoption history contains a first-parent commit that ticked the last `- [ ]` of `tasks.md` (or merged the declared final unit). Cost: script change + falsification fixtures (I specify them: a pre-adoption-closed spec touched post-adoption in completion/ and design.md must print touch-only)."
- **(B) Accept the over-list and document it.** Stacy: "(B) accept the over-list and document 2/2 as the expected rate."
- **The surviving counter-argument against (A)**, Stacy's words: "more logic puts the script's 'never hides an owe' property at risk; a wrong exclusion is the costly direction."

## Effort

My estimate, not measured: for (A), the classification change in `scripts/owed-set.sh`, plus Stacy's fixtures in `scripts/__tests__/owed-set.test.ts`, about half a day, plus her fixture specification. For (B), one sentence in RELEASE-FLOW § 5a under "The one judgment point", a governance path, Peter-merged.

## What closes it

(A): the fixing PR merges, with the fixtures, and names this record. (B): the § 5a sentence merges. Either PR adds rule 5's dated outcome line, and the record moves to `archive/`.

## Ruled (2026-10-25)

**Fork (A)**, on Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". Line R of the 16.1.0 walk's batch adopts Stacy's class option: replace the anchor proxy with the definition, with her falsification fixtures. *Unverified here: chat only. Peter may confirm the relay on the PR, and his words are now committed in this record.*
- **Owed by Thurgood**: the `scripts/owed-set.sh` change, and the fixtures in `scripts/__tests__/owed-set.test.ts` once Stacy specifies them. Her named case: "a pre-adoption-closed spec touched post-adoption in completion/ and design.md must print touch-only." Plus her guard on the change: a wrong exclusion is the costly direction.
- **Trigger**: unchanged until the fixing PR exists, then re-tokened to `merge:#<N>`.

*Signed: Thurgood, 2026-10-25.*

## Specified (Stacy, 2026-10-25)

**Fork (A) RULED.** Peter, 2026-10-25, in chat, relayed by the orchestrator (typos fixed, meaning unchanged): "Fix all of them as the owners recommend; T is (A)". The walk's line R. This is my spec line, not the implementation: Thurgood implements, in `scripts/owed-set.sh` and `scripts/__tests__/owed-set.test.ts` (it runs under `npm run test:scripts`, not the root jest `roots`), and authors § 5a's text.

**The operable rule.** The *closing commit* of a spec is the oldest commit in the newest unbroken run of first-parent states of its `tasks.md` that have no unticked parent (a column-0 `^- \[[^xX]\]` line counts as unticked; the existing `open` class keeps counting `- [ ]` only). A later edit that moves no checkbox is not a closing; a reopened spec closes at its re-tick. A closing commit whose `%cs` precedes the adoption day makes the spec `touch-only`, whatever touched it afterwards; on or after the adoption day it is a `candidate`, anchored on the closing commit, with its a/b/c label as today. Where no closing is decidable (no checkbox parents, or an in-progress `- [-]` parent), the retired path rule applies and the candidate is labeled `closure undecidable`: the fallback never excludes. The enumeration drops `--since` and filters by `%cs` over the whole first-parent line (this also removes a hiding bug the old walk has: one back-dated first-parent commit hides every spec below it).

**Fixtures delivered.** 19 test cases, written as running TypeScript in the existing test file's style: F-122, F-023, F-tasks-edit, F-ticked, F-ticked-with-pass, F-partial, F-partial-done, F-boundary, F-no-ff, F-reopen, F-units, F-undecidable, F-late-doc (the belt), F-backdated, F-backdated known limit, F-offset, plus a shape check, the ordering test and the count-line/row-sum test. A reference sketch of the rule passes all 19; the unchanged script fails 16 (7 on class or row-set, 2 that follow from those, 7 on reason strings only). Of the 24 existing tests, 10 move, all expected (the known-limit test inverts into F-122). Files, **uncommitted, in the orchestrator's session scratch**: `scratchpad/owed-set-fixtures-stacy.md` (the spec, with every case's expectation), `owed-set-definition.fixtures.test.ts` (the cases), `owed-set-proto.sh` (the sketch: evidence the rule is implementable and the expected strings are self-consistent, **not code to ship**).

**Expected real-tree output — sketch output, pending the real script.** On `main` `652074c6b` + the walk, hand-checked against each closing commit: `owed-set: 0 candidates; excluded: 2 closed, 0 open, 5 stub, 4 touch-only` (11 rows; identity holds). Touch-only: `023` closing `f546c494c` 2025-12-19; `086` `278ad6d9b` 2026-03-28; `121` `7fb9641bf` 2026-06-23; `122` `cda5c5faf` 2026-07-11. `123` and `127` closed; `113`, `128`–`131` stubs. The real script's first paste replaces this.

**Three questions Thurgood must answer before implementing.**
1. *Whose clock is "dated on or after"?* I specified the committer's recorded day (`%cs`), machine-independent. The alternative that keeps the over-list direction is a union (the recorded day *or* the UTC instant on or after the adoption day); F-offset's first half then flips to `candidate`.
2. *The belt, in or out?* A spec the rule calls `touch-only` stays a `candidate` if a first-parent commit on or after adoption *added* a `completion/task-*completion.md`. **I recommend in**: it guards the one wrong-exclusion shape the rule opens, and a wrong exclusion is the costly direction. Out is defensible; F-late-doc then expects `touch-only` and nothing else moves.
3. *The reason strings.* The wording is Thurgood's. The facts are pinned: closing SHA and day, last-touch SHA and day, and the two labels. A rewording that keeps them, I re-pin.

**My surviving counter-argument (Peter's recorded one, narrowed).** The rule trusts that a tick lands with the final unit, and a checkbox is an assertion, not a merge fact. A tick that precedes the real merge and crosses the adoption day hides an owe unless the belt fires; the belt covers only an added `task-*completion.md`. I judge the case rare (it needs a spec closed on paper before 2026-09-19 with real final work after) and the corpus shows none, but I have not measured the frequency. The operator's reading of any `touch-only` row whose spec is plausibly in flight stays at the release step.

*Signed: Stacy, 2026-10-25 (re-rule seat).*

## Answered (Thurgood, 2026-10-25)

1. **Whose clock: the union.** A commit is post-adoption when its recorded day (`%cs`) **or** its UTC day is on or after the adoption date. Reason: Peter's guard says a wrong exclusion is the costly direction, and the union only ever adds a near-midnight commit, never drops one. Both clocks are machine-independent (the script sets `TZ=UTC0` only for `%cd`), so nothing moves with a developer's timezone. F-offset's `west` flips to `candidate`, and its reason prints `<%cs> (UTC <day>)` wherever the UTC day, not the recorded day, decided.
2. **The belt: in, and wider.** It fires on any file *added* under `completion/task-*` after adoption, not only `task-*completion.md`. Reason: it is the one guard on the wrong-exclusion shape the rule opens (a tick before the final work). Any `task-`-named artifact added after the tick, including an instruments block, is evidence of task work. The wider glob costs nothing on the real tree (still 0 candidates). It still does not fire on #227 (a ruling doc) or #452 (modified, not added).
3. **The reason strings.** They keep every pinned fact (the closing SHA and day, the last-touch SHA and day, both labels). `closing commit` is the header's term, and none of the strings asserts a merge from a checkbox:
   - candidate: `unit class <x>; anchor <sha> <day> (closing commit: last unticked parent ticked)`
   - candidate, belt: `unit class <x>; anchor <sha> <day> (a completion/task-* file added after the pre-adoption closing commit <csha> <cday>)`
   - candidate, undecidable: `unit class <x>; anchor <sha> <day> (last first-parent touch; closure undecidable: <why>)`
   - touch-only: `closing commit <csha> <cday> predates adoption (last unticked parent ticked); last touch <sha> <day> <subject>`
   - touch-only, undecidable: `no post-adoption change to tasks.md or completion/ (closure undecidable: <why>); last touch <sha> <day> <subject>`
   - `<why>` is `no checkbox parents in tasks.md` or `a parent in tasks.md is marked neither [ ] nor [x]`.

   I changed Stacy's touch-only wording "final unit merged before adoption" because the script reads a checkbox, not a merge. The undecidable touch-only row now carries the `closure undecidable` label too, so every reason says what it assumed. Stacy re-pins.

*Signed: Thurgood, 2026-10-25.*

---

## Law text this needs (drafts; NOT applied; each surface is Peter-merged)

The script no longer does what four law or charter surfaces say it does. Here is each drafted sentence, labeled by kind.

### (L1) `.kiro/hooks/RELEASE-FLOW.md` § 5a (governance path; Peter-merged law)

- **L60**, replace "and pins the boundary to 00:00 on that day (CLOSEOUT pilot F-1, 2026-09-19: a bare date resolves to the current time of day and drops that day's earlier merges). It prints one row per spec that a first-parent commit since then touched" with:
  > and counts a commit as post-ratification when its committer's recorded day or its UTC day is on or after that date. It reads the whole first-parent line and filters by date, with no `git log --since`, so it assumes neither a 00:00 pin nor date-ordered history. It prints one row per spec that a post-ratification first-parent commit touched
- **L65** (`touch-only` bullet), replace with:
  > - `touch-only`: the spec's closing commit (below) predates ratification, and no file under `completion/task-*` was added after ratification. The reason names the closing commit and the last touching commit.
- **L66** (`candidate` bullet), replace with:
  > - `candidate`: everything else. The reason gives the unit class and the anchor, which is the closing commit.
- **L68**, replace "`open` and `touch-only` are heuristics over checkboxes and paths, not merge facts" with "`open` and `touch-only` read checkboxes, and a checkbox is an assertion, not a merge fact".
- **L70**, in class (a) replace "so CLOSEOUT anchors on the **final declared unit**" with "a label: every class anchors on the closing commit, the final unit's merge". In class (c) delete ": the anchor is the PR carrying the **last parent completion doc**".
- **L72** ("The one judgment point"), replace the whole paragraph with:
  > **The anchor, and the judgment that remains**: the anchor is the spec's *closing commit*, the oldest commit in the newest unbroken run of first-parent states of its `tasks.md` with no unticked parent. It is the final unit's merge because a parent's tick lands with its unit (Task-Completion-Protocol). Where no closing exists (no checkbox parents, or a parent marked neither `[ ]` nor `[x]`), the retired path rule applies and the reason says `closure undecidable`. Two limits remain, and they are the operator's to read. First, a checkbox is an assertion: a spec ticked before ratification whose final work merged after it is hidden, unless a `completion/task-*` file was added after ratification. Second, a closing commit that itself carries a pre-ratification committer date is outside the set by the predicate's wording. **Where the operator knows a row is wrong, the operator says so in the pasted output.** A wrong owed-set result noticed here is fixed in the script, with a falsification case in `scripts/__tests__/owed-set.test.ts`.

### (L2) Ballot `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md`: erratum to the counting block (ballot README errata convention; append, never rewrite the ratified text)

> **Erratum (2026-10-25, Thurgood; fork (A) of `.kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md`, Peter 2026-10-25) — to § 7.5's stage 2 and its "one judgment point" paragraph.** Stage 2 no longer resolves the anchor as "the most recent first-parent commit touching the spec". `scripts/owed-set.sh` resolves it as the spec's *closing commit*: the oldest commit in the newest unbroken run of first-parent `tasks.md` states with no unticked parent. A pre-ratification closing commit excludes the spec as touch-only, unless a `completion/task-*` file was added after ratification. Stage 1a's "post-ratification" is the recorded day or the UTC day on or after the ratification date, read over the whole first-parent line (no `--since`). The predicate is unchanged. This edit is to its operationalization: the proxy and the definition no longer disagree, so the judgment point that remains is the two limits named in RELEASE-FLOW § 5a.

### (L3) `canonical/agents/thurgood.md` L540 and L542 (my charter; a `canonical/agents/**` edit: Peter-merged, regenerate, re-sign the operative-set unit in `canonical/operative-sets/thurgood.yaml`)

- **L540**, replace "pins the boundary to 00:00 on that day (CLOSEOUT pilot F-1: a bare date drops that day's earlier merges), and prints one row per spec a first-parent commit since then touched" with "counts a commit as post-ratification by its recorded day or its UTC day, over the whole first-parent line, and prints one row per spec a post-ratification first-parent commit touched". Replace the `touch-only` parenthesis with "(the closing commit predates ratification and no `completion/task-*` file was added after it; the reason names both commits)".
- **L542**, replace "The anchor printed is the last first-parent commit touching the spec, a proxy for that merge; where the two differ, the definition governs." with "The anchor printed is the closing commit (the oldest commit in the newest unbroken run of `tasks.md` states with no unticked parent); where no closing exists the row says `closure undecidable` and the path rule applies." In (c), delete "— the PR carrying the last parent completion doc".

### (L4) Stacy's charter and consumer overlay (her seat's prose; facts only, wording hers)

`canonical/agents/stacy.md` L445 and `canonical/profiles/consumer/stacy.overlay.md` L112 still define `touch-only` as "no first-parent commit since ratification/adoption changed `tasks.md` or `completion/**`". It is now "the closing commit predates ratification/adoption and no `completion/task-*` file was added after". Her L449 and overlay L116 still say "a path set is a proxy" and name "a closeout merge that changed neither `tasks.md` nor `completion/**`" as the wrong-exclusion shape. The shape is now "a spec ticked before ratification whose final work merged after, with no `completion/task-*` file added". The consumer overlay ships, so its sentence reaches consumers at the next release.

**Kind**: I read L1–L3 as LAW, and so they carry the PR's one `**Open for Peter**:` line. They describe a ratified operationalization, and fork (A) ruled the script, not these sentences. The other defensible reading is EXECUTION of fork (A) ("fix all of them as the owners recommend"). That pick is Peter's.

Stacy's cross-read (2026-10-25) accepted the union clock, the wider belt and the strings (43/43; real tree 0 candidates, 11 rows; her named over-inclusions are the cheap direction). She drafts her own charter lines L445/L449 and overlay L112/L116 in the follow-on, kind to follow Peter's pick. The law-text kind question (LAW or EXECUTION for L1–L3) is the `**Open for Peter**:` line on #473.

---

## Lapse (2026-10-25)

Trigger `merge:#473` fired at `1eced6cd5` (#473, merged by Peter 2026-10-25). No ancestor of that commit closed or re-ruled this record: the fixing PR landed the script and tests but carried no rule-5 outcome line, and the `## Outcome` below is added after the merge. Rule 11 therefore counts a lapse, named by its firing commit. First lapse of a P2 (record): it does not escalate (rule 11). The next section closes the script defect.

*Signed: Thurgood, 2026-10-25.*

---

## Outcome (2026-10-25, Thurgood; rule 5, fixing PR: #473)

**What #473 shipped** (merged by Peter 2026-10-25 as `1eced6cd5`, "owed-set anchors on the closing commit of tasks.md, with Stacy's 19 falsification fixtures"): `scripts/owed-set.sh` anchors on the spec's *closing commit* (the oldest commit in the newest unbroken run of first-parent `tasks.md` states with no unticked parent) instead of the last path touch. A pre-adoption closing makes the spec `touch-only`; a post-adoption closing makes it a `candidate`; closure undecidable falls back to the retired path rule and says so; the belt keeps a pre-adoption closing a candidate when a `completion/task-*` file was added after adoption; the post-adoption test is the union of the recorded day and the UTC day, over the whole first-parent line with no `--since`. `scripts/__tests__/owed-set.test.ts` went from 24 to 43 cases (Stacy's 19 are three describe blocks; the 10 expected movements are in the first group), and her specification is committed verbatim at `scripts/__tests__/__fixtures__/owed-set/owed-set-fixtures-stacy.md`. On the real tree (`652074c6b`) `bash scripts/owed-set.sh` prints 0 candidates, 11 rows (0 + 2 closed + 0 open + 5 stub + 4 touch-only), matching Stacy's hand-check with the four closing commits she named. Stacy's cross-read of the commit (2026-10-25) accepted the union clock, the wider belt and the reason strings (43/43; no blocker; the early-tick limit stays an operator read).

**Claimed vs closed.** Claimed by the PR and closed by it: the script defect this record names (false candidates 122 and 023; the back-dated-commit hiding bug as a by-product). **Not closed, and not claimed closed**: (1) the four law and charter surfaces that still describe the retired path rule (the "Law text this needs" section above, L1 to L4); (2) the question of what *kind* of edit they are. The PR body carried that question as an `**Open for Peter**:` line, and **it was not answered before the merge**. A merge never answers (Peter, 2026-10-17; Task-Completion-Protocol, "A question to Peter holds the merge"). This outcome line does not answer it either. It moved, with its drafts and Stacy's charter-line drafts copied verbatim, to the new record `.kiro/issues/2026-10-25-owed-set-law-text-after-closing-commit-anchor.md` (Trigger `release:next:phase-1`), where it can be read and where the follow-on PR will close it.

**Also surfaced by #473, filed in that new record**: `scripts/owed-set.sh`, its test and its fixtures are not in my by-file write-scope list in `canonical/agents/thurgood.md` (a `canonical/agents/**` edit, Peter-merged).

*Signed: Thurgood, 2026-10-25.*
