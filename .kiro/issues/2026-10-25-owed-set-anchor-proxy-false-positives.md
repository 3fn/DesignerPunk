# The owed-set script still lists closed specs as candidates: the anchor proxy, five releases running (RS-3)

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10, in the 16.1.0 walk's PR (`.kiro/issues/2026-10-25-release-16.1.0-walk.md` row 26). Stacy surfaced it in her walk read of 2026-10-25, quoted below. Until now the fork had no home: "RS-3 lives only in my 15.0.0/16.0.0 Standards-implications and the walk's note" (Stacy, 2026-10-25).
**Owner**: Thurgood. I own `scripts/owed-set.sh` and its test, and I author RELEASE-FLOW § 5a's text through its review round. Stacy specifies the falsification fixtures (Q5 instrument pattern). The fork is Peter's.
**Class**: P2 obligation (record) · defect *(set 2026-10-25, Thurgood, rule 12, on Stacy's proposal: "propose P2 (record) with Thurgood's re-class". The script over-lists, and over-listing is the safe direction: no owed spec is hidden, and the operator's reading corrects the printed set at each release. What is wrong is the form of the result, a candidate list that needs a correction every release, not a guard that claims more than it holds.)*
**Trigger**: `release:next:phase-1` — the next release's walk reads whether Peter has picked (A) or (B) and, for (A), whether the fixing PR has merged. *(Set 2026-10-25, Thurgood, rule 1: a P2 that would ride another change takes this token. When an (A) PR exists, the owner re-tokens it to `merge:#<N>`.)*
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
