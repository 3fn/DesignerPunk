# [STACY fixtures — owed-set definition]

**For**: Thurgood (owner of `scripts/owed-set.sh`, `scripts/__tests__/owed-set.test.ts`, RELEASE-FLOW § 5a text). **Record**: `.kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md` (fork (A), ruled 2026-10-25). **Specified**: Stacy, 2026-10-25, against `main` 652074c6b + walk.
**Status of what follows**: the fixtures are written as running TypeScript and were run, not just drafted. A reference sketch of the rule (`owed-set-proto.sh`) passes all 19 of them, and the unchanged script fails 16 (7 on class or row-set, 2 more that follow from those, 7 on reason strings only; see § 2). Both files sit beside this note in the scratchpad. The sketch is evidence the rule is implementable and the expected strings are self-consistent, **not code to ship**; the code is yours.

---

## 1. The definition, as the script should compute it

**Closing commit of S** = the first-parent commit that produced the *current unbroken run of fully-ticked states* of `<specs>/S/tasks.md`. Operationally:

1. List the first-parent commits that changed `tasks.md`, newest first (`git log --first-parent --format='%h%x09%cs' <ref> -- <dir>/tasks.md`; a true merge commit is listed when its tree differs from its first parent, so no `-m` is needed).
2. Walk back from the newest. For each, read `git show <sha>:<dir>/tasks.md`. If it has **no unticked parent**, it is part of the run; remember it and continue. The first state with an unticked parent, or a commit where `tasks.md` does not exist, ends the run.
3. The closing commit is the **oldest commit in the run** (its SHA and committer day `%cs`). A later edit that moves no checkbox is not a closing. A spec that was reopened (a new `- [ ]` added) and re-ticked closes at the re-tick.
4. "Unticked parent" for this scan = a column-0 line matching `^- \[[^xX]\]` (so `- [ ]`, `- [-]` and any other glyph all count). The existing `open` class keeps counting `- [ ]` only, unchanged.

**"Final declared unit merged" = the closing commit.** Ground: Task-Completion-Protocol makes a parent's status tick part of the work product that lands *at the unit's merge*; the last tick of `tasks.md` therefore lands in the final unit's merge. The rule is the same for every unit class: **no unit grouping, class (b) and class (c) use it as is, and the `## Declared Merge Units` block is parsed only for the class label (a), never for the anchor.** It replaces both proxies: (a)'s "most recent first-parent touch" and (c)'s "the PR carrying the last parent completion doc" (§ 5a's wording changes with it, § 3). I did not use "the declared unit grouping" as the rule because three recognized declaration forms exist and none names a merge SHA.

**Classification order is unchanged** (closed → stub → open → then):
- **touch-only** iff the closing commit's `%cs` is earlier than the adoption date. This subsumes the retired rule (no post-adoption change to `tasks.md` or `completion/**` implies a pre-adoption closing).
- **candidate** iff the closing commit's `%cs` is on or after the adoption date. Anchor = the closing commit. Class label (a/b/c) as today.

**Three corrections that travel with it, because the same definition needs them:**
- **Date comparison.** Compare `%cs` (the committer's recorded day) to the adoption date. Drop `--since` from the enumeration and from every date filter; walk the whole first-parent line and filter by `%cs` (a single `git log --name-only --format='@%cs'` piped through awk; 0.07 s here at 1711 first-parent commits). This is what removes the F-backdated dependency (§ 2) and also retires the 00:00 pin, which exists only because `--since` takes a time of day. The predicate's wording ("dated on or after the date") is met exactly.
- **Undecidable ⇒ fall back to the retired proxy, labeled, never exclude.** If `tasks.md` has no checkbox parents at all, or the ref's `tasks.md` still carries an unticked non-`- [ ]` parent (`- [-]`), no closing exists. Use the retired path rule (touch-only if no post-adoption change to `tasks.md` or `completion/**`; else candidate anchored on the last first-parent touch) and mark the candidate `closure undecidable: …`. This keeps the existing "in-progress parent stays a candidate, over-list never hide" property.
- **Belt for the costly direction** *(optional; your call and Peter's, § 5 Q2)*: a spec the rule would call touch-only stays a **candidate** if a first-parent commit dated on or after adoption *added* (`--diff-filter=A`) a file matching `completion/task-*completion.md`. A pre-adoption tick followed by post-adoption parent or subtask completion docs is exactly the shape that hides a real owe. It does not fire on #227 (a ruling doc, wrong name) or #452 (modified, not added).

**Row-sum identity and count line**: both unchanged. The class names, the order, the count-line grammar and the identities (`rows = n + c + o + s + t`, `x + y + z = n`) stay as they are. Two reason strings change (§ 2 pins them; the wording is yours, the *facts* in them are pinned: closing SHA and day, last-touch SHA and day).

---

## 2. Falsification cases (running TS, in the test's existing style)

**File**: `owed-set-definition.fixtures.test.ts` (same directory as this note). It reuses the existing file's helpers verbatim (`git`, `write`, `at`, `commit`, `init`, `run`, `rowFor`, `COUNT`, `GIT_ENV`) and adds `at2` for an explicit UTC offset; paste its three `describe` blocks into `owed-set.test.ts` after the existing ones. It carries a one-line env override of `SCRIPT` (`OWED_SET_SCRIPT`) that I used to point it at the sketch; drop that line when merging. Each case builds a throwaway repo with dated commits, as the file already does.

| Case | Shape | Expected | Fails on today's script? |
|---|---|---|---|
| **F-122** | closed 2026-03-01; another spec's PR adds `completion/ruling-from-another-spec.md` on 03-11 | `touch-only`, reason names the closing (03-01) and the last touch | **yes (class)**: today `candidate` |
| **F-023** | closed 03-01 (class b); 03-12 appends to `design.md` and *modifies* `completion/task-2-parent-completion.md` | `touch-only` | **yes (class)** |
| **F-tasks-edit** | closed 03-01; 03-12 a prose edit to `tasks.md`, no checkbox moves | `touch-only` | **yes (class)**: the retired rule read any post-adoption `tasks.md` change as work |
| **F-ticked** | open before adoption; both parents ticked 03-14; a post-closure design note 03-15 | `candidate`, class c, anchor = 03-14 tick (not the 03-15 touch) | anchor string only |
| **F-ticked-with-pass** | same tick, `completion/claims-pass.md` in the commit | `closed` | no (guards against regression) |
| **F-partial** | 03-14 ticks parent 1 of 2 | `open`, `1 of 2 parents unticked …` | no (regression guard) |
| **F-partial-done** | tick 1 on 03-14, tick 2 (final) on 03-16, feedback on 03-17 | `candidate`, anchor = **03-16**, not the first tick, not the last touch | anchor string only |
| **F-boundary** | last parent ticked 00:00:05 on 03-10; a twin ticked 23:59:59 on 03-09 then touched 03-12 | first `candidate` (class b); twin `touch-only` | twin: **yes (class)**, today `candidate` |
| **F-no-ff** | side branch ticks both parents on 03-02; true merge commit `--no-ff` on 03-18 | `candidate`, class b, anchor = the **merge** SHA, 03-18 (branch tick dates do not count) | anchor string only |
| **F-reopen** | closed 03-01; 03-12 adds `- [ ] 3`; one spec stays so, one ticks it 03-14 | `open` (1 of 3); the other `candidate` anchored 03-14 | anchor string only |
| **F-units** | class (a) block, ticked 03-14 | `candidate`, class a, anchor = tick | anchor string only |
| **F-undecidable** | (i) `- [-]` parent at HEAD; (ii) a `tasks.md` with prose and no checkbox, touched post-adoption in `feedback.md` only | (i) `candidate` anchored on the last touch, labeled `closure undecidable`; (ii) `touch-only` with the retired reason | label only |
| **F-late-doc** *(belt; drops if Q2 is declined, expectation then `touch-only`)* | closed 03-01; 03-13 *adds* `completion/task-3-completion.md` | `candidate`, anchor = the adding commit, labeled | **yes (class)** vs the belt-less rule, not vs today |
| **F-backdated** | spec `a` closes 03-12; then one first-parent commit with committer date 03-01; spec `b` closes 03-13 | **both** listed | **yes (class)**: today only `b`; `a` is dropped. I reproduced it: one back-dated first-parent commit hides everything below it |
| **F-backdated, known limit** | spec `c` closed by a commit that itself carries committer date 03-01 | no row; counted under `specs without activity` | the new known limit, pinned |
| **F-offset** | a close recorded `2026-03-09 23:30 -0500` (04:30 UTC on the 10th); one recorded `2026-03-10 00:30 +1000` (14:30 UTC on the 9th) | the first `touch-only`, the second `candidate` | **yes (class)** on a UTC runner |
| ordering, count line, identity | the shared repo: 8 candidates, 1 closed, 2 open, 0 stub, 5 touch-only, a/b/c = 1/4/3, 1 spec without activity, 16 rows | the exact count line is in the file | yes |

**Counts**: 19 new cases (16 in the shared `def` repo, 2 backdated, 1 offset), run against the sketch: 19 pass; against today's script: 16 fail, 3 pass. Of the 16, **7 fail on class or row-set** (F-122, F-023, F-tasks-edit, F-boundary's twin, F-backdated, its known-limit twin, F-offset), 2 more (the shared ordering test and count line) follow from those, and 7 fail only on the reason string (F-ticked, F-partial-done, F-no-ff, F-reopen, F-units, F-undecidable, F-late-doc). The 3 that pass today (shape check, F-ticked-with-pass, F-partial) are regression guards.

**Does the definition remove the `git log --since` dependency?** Yes, but only with the `%cs`-filter change in § 1: the definition by itself reads `tasks.md` history, which `--since` never touched. The dependence lived in the enumeration. Remaining dependence on date ordering: none in the walk; the one dependence left is on the *closing commit's own committer date*, which the predicate ("dated on or after") makes the ground truth. A closing commit carrying a pre-adoption committer date is outside the set by the predicate's own letter and is the pinned known limit above.

**Existing `owed-set.test.ts`: 10 of its 24 tests change against the sketch** (I ran it). All are expected movements, none a regression:
- the *known limit* test (`closed-elsewhere`) **inverts into F-122**: row becomes `touch-only`;
- `old-closed-pre`: the touch-only reason gains the new prefix;
- `midpoint-only` anchor moves to the unit-1 commit (03-11); `ticked-only` to its unit-1 commit (03-13);
- `units-a`, `early-bird`, `merged-side`: anchor SHAs unchanged, the label becomes `(last unticked parent ticked)`;
- ordering test: 5 candidates, then closed, open, stub, 2 touch-only;
- count line: `owed-set: 5 candidates; excluded: 1 closed, 1 open, 1 stub, 2 touch-only; classes a/b/c = 1/2/2; 2 specs without activity …`; rows total still 10, so the `--adoption-ballot` `toHaveLength(10)` stands;
- the defaults test (`127-x`): label only.

---

## 3. What the known-limit header note becomes

Delete the "Known limit (Stacy's claims view, 2026-10-22) … anchor is a path proxy" paragraph, and with it the `anchor = the last first-parent commit touching the spec (a proxy …)` sentence in the output block. Replace with:

> *Anchor.* For a spec with no unticked parent the anchor is the **closing commit**: the oldest commit of `tasks.md`'s newest unbroken run of fully ticked states (git first-parent history, read with `git show`). That commit is the final unit's merge because a parent's tick lands with its unit. A closing commit dated before the adoption day makes the spec `touch-only`, whatever later touched it. Where no closing exists (no checkbox parents, or an in-progress `- [-]` parent), the retired path rule applies and the reason says `closure undecidable`.
>
> *Assumed, and the new known limit* (Stacy's, 2026-10-25): a checkbox is an assertion. A spec ticked before adoption whose final work merged after it is hidden, except where the belt fires (a task completion doc added after adoption). A closing commit that itself carries a committer date before the adoption day is outside the set by the predicate's wording and prints no row. Both are pinned in `owed-set.test.ts`.

The old "first-parent committer dates rise; `--since` stops walking" assumption is gone and should be struck from the header. § 5a: replace "The one judgment point" paragraph (the proxy and the definition no longer disagree; the judgment that remains is the two limits above), change the `touch-only` bullet to "the closing commit predates the adoption day", and change class (c)'s anchor wording to the closing commit. Those edits are yours to author; I only name them.

---

## 4. My pass's state line for the owed set after the fix

I ran the sketch against this tree (`main` 652074c6b + walk). **Prediction for the fixed script's first paste**, to be confirmed when the real implementation runs:

`owed-set: 0 candidates; excluded: 2 closed, 0 open, 5 stub, 4 touch-only; classes a/b/c = 0/0/0; 170 specs without activity since 2026-09-19; adoption 2026-09-19 from .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md; ref <sha>`

The four touch-only rows, by hand-check of each closing commit (not read from the sketch's reason alone): `023` closing `f546c494c` 2025-12-19; `086` `278ad6d9b` 2026-03-28; `121` `7fb9641bf` 2026-06-23; `122` `cda5c5faf` 2026-07-11. All predate 2026-09-19; the row-sum identity holds (11 rows). `123` and `127` are `closed`; `113`, `128`–`131` are stubs.

**State line (to carry into the 16.1.0 release record once the fixed script has run):** `closeout-owed set: empty — answered by the query (0 candidates, row-sum 11 = 0+2+0+5+4); the 4 touch-only rows spot-read against their closing commits, all pre-adoption; unreadable: none.` Until the fix merges, today's output stays at 2 candidates, both closed specs, and I read them as I did at the walk.

---

## 5. Questions Thurgood must answer before implementing

- **Q1 — whose clock is "dated on or after"?** I specified the committer's recorded day (`%cs`), machine-independent, so a developer's timezone cannot move a fixture. It differs from today's `--since` only for commits within a few hours of midnight whose offset differs from the runner's, and F-offset pins my choice. The alternative, to keep the over-list direction, is a union (candidate if the recorded day *or* the UTC instant is on or after the adoption day); it costs one more clause and F-offset's first half flips to `candidate`. If you prefer the union, say so and I will flip that expectation.
- **Q2 — the belt (F-late-doc): in or out?** It guards the one wrong-exclusion shape the rule opens (tick before the final work). The cost is one more path read and a filename glob that covers `task-N-completion.md`, `task-N-M-completion.md`, `task-N-parent-completion.md`, but not the rarer `task-N-<agent>-…` forms. Because Peter's rule was "a wrong exclusion is the costly direction", I recommend **in**. Out is defensible if you read the protocol's "ticks land with the unit" as sufficient; then F-late-doc's expectation becomes `touch-only` and nothing else moves.
- **Q3 — the reason strings.** Wording is yours. I pinned `(last unticked parent ticked)`, `final unit merged before adoption (last unticked parent ticked <sha> <day>); last touch …`, and the two labels. Keep the SHA and day facts in any rewording and I will re-pin.

**Not a question, a note**: `scripts/__tests__/owed-set.test.ts` is not in the root jest `roots`; it runs under `npm run test:scripts` (`scripts/jest.config.js`). I ran it there.

---

## Counter-argument against my own proposal (run before presenting)

The recorded counter ("more logic puts 'never hides an owe' at risk") is real. What I folded in: the undecidable fallback and the optional belt (both keep over-listing where the definition cannot decide), the date-filter change (it fixes a hiding bug the old script already had, F-backdated), and fixtures that are mutations of the dangerous direction rather than only the pretty one.

**What survives, plainly:** the rule trusts that a tick lands with the final unit. It is an assertion, not a merge fact, as the script already says of `open`. If an agent ticks early, or a "bookkeeping" PR ticks a box long after the work, the closing date is wrong in either direction: later is an over-list (safe); earlier than the real merge, crossing the adoption day, hides an owe unless the belt fires. The belt covers only added `task-*completion.md` files. I judge the post-adoption-crossing, early-tick case rare (it needs a spec closed on paper before 2026-09-19 and real final work after), but I have not measured it, and the corpus shows none today. The release walk's operator reading still has to confirm any `touch-only` row whose spec is plausibly in flight, which is where § 5a's "operator says so in the pasted output" stays.

---

*Carrier note (Thurgood, 2026-10-25), not part of Stacy's text above: committed verbatim from the orchestrator's session scratch by the fixing PR, per the record (`.kiro/issues/2026-10-25-owed-set-anchor-proxy-false-positives.md`). Her 19 cases now run in `scripts/__tests__/owed-set.test.ts` (the three `describe` blocks after the first group), with Thurgood's reason strings and the Q1/Q2 answers applied: F-offset's `west` is a `candidate` (Q1, union), F-late-doc stays in (Q2). `owed-set-proto.sh`, the sketch, was not committed: evidence, not code.*
