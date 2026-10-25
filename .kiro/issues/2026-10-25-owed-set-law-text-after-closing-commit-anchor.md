# The law and charter text still describes the owed-set's retired path-proxy anchor, and the kind of edit is Peter's unanswered question

**Date**: 2026-10-25
**Filed by**: Thurgood, under README rule 10, in the PR that closes `archive/2026-10-25-owed-set-anchor-proxy-false-positives.md` (that record's script defect closed at #473; its law-text question did not). Rule 9 applies to every later edit.
**Owner**: Thurgood (I author RELEASE-FLOW § 5a's text through its review round and my own charter; Stacy drafts her charter and overlay lines; the kind of edit is Peter's).
**Class**: P2 obligation (record) · owed-act *(set 2026-10-25, Thurgood, rule 12. The script is correct and tested; the surfaces that describe it are wrong about `touch-only`, the anchor and the judgment point. A reader of § 5a or either charter is told the retired rule, so the record is wrong; the printed output still carries its own reasons, which is why this is not a guard and not P1.)*
**Trigger**: `release:next:phase-1` — closes at the follow-on PR's merge; `merge:#<N>` at its open. The kind (EXECUTION under fork (A) vs LAW rounds) is Peter's answer, asked on #473 and unanswered at its merge.

---

## Open for Peter

**Open for Peter**: do the four surfaces below ride fork (A) as **EXECUTION** (clause: your line-R ruling, 2026-10-25, "Fix all of them as the owners recommend; T is (A)") in one follow-on PR, or does each go through its own **LAW** or erratum round? Asked in #473's body; **not answered before its merge**, and a merge never answers (Peter, 2026-10-17).

**Orchestrator's recommendation** (from #473's body): one follow-on PR. RELEASE-FLOW § 5a and the two charters (mine and Stacy's, with her overlay) as EXECUTION; the 2026-09-19 ballot's § 7.5 counting block as an erratum per the ballots README. **The surviving counter-argument (Thurgood, Stacy)**: L72 (the "one judgment point" paragraph) and the erratum rewrite the judgment point, not just the anchor, and that edges toward LAW; the ballot is ratified text, and fork (A) ruled the script, not these sentences. Stacy reads the script as EXECUTION, her own charter lines as CORRECTION or EXECUTION following whichever kind Peter picks, and RELEASE-FLOW L72 plus the ballot erratum as edging toward LAW. My own read in the archived record is that L1 to L3 are LAW. Until Peter answers, none of it is applied, and the four surfaces keep describing `touch-only` by the old path rule (the printed reason strings are correct and say what they assumed).

## Write-scope gap (item; owner Thurgood; a `canonical/agents/**` edit)

My by-file write-scope list in `canonical/agents/thurgood.md` does not name `scripts/owed-set.sh`, `scripts/__tests__/owed-set.test.ts` or `scripts/__tests__/__fixtures__/owed-set/`. #473 acted on the charter clause that makes me author and maintainer of the owed-set query (LIVENESS, "The owed-set query") and on the record's ownership. The standing-scope rule says a test or fixture under `scripts/` follows the file it exercises, so naming `scripts/owed-set.sh` would carry them; the list names `scripts/__tests__/issues-owned.test.ts` explicitly, so naming the test as well follows precedent. A seat's write scope moves only by a `canonical/agents/**` edit, Peter-merged with every affected seat consulted (Stacy runs the same call; Ada is not affected). It rides the same follow-on PR or its own; Peter's pick.

---

## Source: the drafts, copied verbatim from the archived record

The two blocks below are on the record here so they are not left in a file nobody opens (the second block has two headings demoted one level to nest under this record; nothing else differs). The first is copied from `archive/2026-10-25-owed-set-anchor-proxy-false-positives.md`, its section "Law text this needs" through its closing paragraph (L1 to L4, the Kind paragraph, Stacy's cross-read). The second is Stacy's charter-line file, `owed-set-stacy-charter-lines.md` from the orchestrator's session scratchpad (uncommitted until now), whole.

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

### Stacy's charter and overlay lines (`owed-set-stacy-charter-lines.md`, verbatim)

#### Stacy's four charter/overlay lines (owed-set closing-commit fix, PR #473 follow-on)

Base: main 652074c6b. Each block is the whole line (one physical line, no trailing space), old then new; the new line is the old with only the clauses named below changed. Thurgood applies under six-roots errata (f); each file is Peter-merged and the charter regenerates.

**Kind (my read; Peter's pick on #473 governs)**: L445/L449 charter and L112/L116 overlay are EXECUTION of fork (A) (the script was ruled; these lines restate what it does). If Peter reads fork (A) as ruling the script only, they are CORRECTION (observation record: `.kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md`; truth: `scripts/owed-set.sh` at the #473 merge). Not LAW.

**Changes**: `touch-only` definition (closing commit predates ratification/adoption, no `completion/task-*` added after); anchor = closing commit, `closure undecidable` fallback; "heuristics over assertions and paths ... a path set is a proxy" becomes "read checkboxes ... a checkbox is an assertion"; wrong-exclusion shape = ticked before ratification/adoption, final work merged after, no `completion/task-*` added. The charter L445 carries a dated pointer (the file's convention is parenthetical dated citations); the overlay carries none, since a consumer does not hold `.kiro/issues/`.

**Unit I expect to re-confirm/re-sign**: `canonical/operative-sets/stacy.yaml` unit anchor `#the-owed-set-query-your-command-catalogs-owed-set-entry-the-committed-script`, items `owed-set-row-classes` and `owed-set-heuristics` (texts move; `owed-set-count-line` and `owed-set-candidate-not-verdict` unchanged), new canonicalHash. Overlay side: `canonical/profiles/consumer/stacy.dispositions.yaml` row for the same anchor (disposition `re-pointed`) re-judged against the moved body; rows' `removals` unaffected as far as I can see. Both are mine to sign after Thurgood's apply.

##### canonical/agents/stacy.md L445

OLD:

```
The output is one tab-separated row per spec touched since ratification, `<class>\t<spec>\t<reason>`, then one count line. Each spec has exactly one class: `closed` (`completion/claims-pass.md` exists); `stub` (no `tasks.md`, a charter-only spec; the reason names the files); `open` (at least one unticked parent; the reason reads `N of M parents unticked`); `touch-only` (no first-parent commit since ratification changed `tasks.md` or `completion/**`, so the touch was feedback, an inbound or a post-closure edit; the reason is the last touching commit); otherwise `candidate` (the reason keeps the unit class `a|b|c` and the anchor `<sha> <date>`). The count line reads `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = x/y/z; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>`, and for this repository `adoption` is the ratification date. **Read the row-sum identity first**: the candidate count plus the four excluded counts must equal the number of rows printed; a sum that does not add is a dropped class, and the output is not to be trusted.
```

NEW:

```
The output is one tab-separated row per spec touched since ratification, `<class>\t<spec>\t<reason>`, then one count line. Each spec has exactly one class: `closed` (`completion/claims-pass.md` exists); `stub` (no `tasks.md`, a charter-only spec; the reason names the files); `open` (at least one unticked parent; the reason reads `N of M parents unticked`); `touch-only` (the spec's closing commit, the oldest commit in the newest unbroken run of first-parent `tasks.md` states with no unticked parent, predates ratification, and no file under `completion/task-*` was added after it; the reason names the closing commit and the last touching commit); otherwise `candidate` (the reason keeps the unit class `a|b|c` and the anchor `<sha> <date>`, the anchor being the closing commit; where no closing commit exists the reason says `closure undecidable`). The count line reads `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = x/y/z; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>`, and for this repository `adoption` is the ratification date. **Read the row-sum identity first**: the candidate count plus the four excluded counts must equal the number of rows printed; a sum that does not add is a dropped class, and the output is not to be trusted. *(Closing-commit anchor, 2026-10-25: `.kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md`.)*
```

##### canonical/agents/stacy.md L449

OLD:

```
**`open` and `touch-only` are heuristics over assertions and paths, not merge facts**: a ticked box is a claim, and a path set is a proxy. The reason column says what was assumed, so read it. Before you call the set empty, spot-read any `open` or `touch-only` row whose spec could have merged its final unit (a stale unticked box; a closeout merge that changed neither `tasks.md` nor `completion/**`), because a wrong exclusion hides an owe and a wrong candidate only costs a look.
```

NEW:

```
**`open` and `touch-only` read checkboxes, and a checkbox is an assertion, not a merge fact**: a ticked box is a claim. The reason column says what was assumed, so read it. Before you call the set empty, spot-read any `open` or `touch-only` row whose spec could have merged its final unit (a stale unticked box; a spec ticked before ratification whose final work merged after it, with no `completion/task-*` file added), because a wrong exclusion hides an owe and a wrong candidate only costs a look.
```

##### canonical/profiles/consumer/stacy.overlay.md L112

OLD:

```
The output is one tab-separated row per spec touched since adoption, `<class>\t<spec>\t<reason>`, then one count line. Each spec has exactly one class: `closed` (`completion/claims-pass.md` exists); `stub` (no `tasks.md`, a charter-only spec; the reason names the files); `open` (at least one unticked parent; the reason reads `N of M parents unticked`); `touch-only` (no first-parent commit since adoption changed `tasks.md` or `completion/**`, so the touch was feedback, an inbound or a post-closure edit; the reason is the last touching commit); otherwise `candidate` (the reason keeps the unit class `a|b|c` and the anchor `<sha> <date>`). The count line reads `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = x/y/z; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>`. **Read the row-sum identity first**: the candidate count plus the four excluded counts must equal the number of rows printed; a sum that does not add is a dropped class, and the output is not to be trusted.
```

NEW:

```
The output is one tab-separated row per spec touched since adoption, `<class>\t<spec>\t<reason>`, then one count line. Each spec has exactly one class: `closed` (`completion/claims-pass.md` exists); `stub` (no `tasks.md`, a charter-only spec; the reason names the files); `open` (at least one unticked parent; the reason reads `N of M parents unticked`); `touch-only` (the spec's closing commit, the oldest commit in the newest unbroken run of first-parent `tasks.md` states with no unticked parent, predates adoption, and no file under `completion/task-*` was added after it; the reason names the closing commit and the last touching commit); otherwise `candidate` (the reason keeps the unit class `a|b|c` and the anchor `<sha> <date>`, the anchor being the closing commit; where no closing commit exists the reason says `closure undecidable`). The count line reads `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = x/y/z; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>`. **Read the row-sum identity first**: the candidate count plus the four excluded counts must equal the number of rows printed; a sum that does not add is a dropped class, and the output is not to be trusted.
```

##### canonical/profiles/consumer/stacy.overlay.md L116

OLD:

```
`open` and `touch-only` are heuristics over assertions and paths, not merge facts: a ticked box is a claim, and a path set is a proxy. The reason column says what was assumed, so read it. Before you call the set empty, spot-read any `open` or `touch-only` row whose spec could have merged its final unit (a stale unticked box; a closeout merge that changed neither `tasks.md` nor `completion/**`), because a wrong exclusion hides an owe and a wrong candidate only costs a look.
```

NEW:

```
`open` and `touch-only` read checkboxes, and a checkbox is an assertion, not a merge fact: a ticked box is a claim. The reason column says what was assumed, so read it. Before you call the set empty, spot-read any `open` or `touch-only` row whose spec could have merged its final unit (a stale unticked box; a spec ticked before adoption whose final work merged after it, with no `completion/task-*` file added), because a wrong exclusion hides an owe and a wrong candidate only costs a look.
```

