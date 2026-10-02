# Task 13.4 completion: `triviality.ts` (the occurrence assignment with its witness, the tested properties, and the AX-1 bite) over the copied G1 fixtures

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Lina (Opus), tiered secondary for 13.0 and 13.4–13.6. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-lina-13-4`, cut from the unit head `7bd5a128`. The orchestrator merges it.
**Code commit**: `72f1e981c880d561cab4f0c72233acfbc949cdd9`. This doc and the tick are a follow-up docs-only commit.
**Write grant**: Task 13's row (tasks-row grant, `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`).
- **Inside the grant**: the Primary Artifacts name `tools/agent-generator/regrounding/triviality.ts` and `tools/agent-generator/__fixtures__/g1-renderings/`.
- **Out-of-list on a strict reading, disclosed as Thurgood did at 13.1**:
  - the five test files, `tools/agent-generator/__tests__/triviality.{assignment,records,g1,floor}.test.ts` and `g1-renderings.provenance.test.ts`;
  - the helper `triviality.helpers.ts`.

  The row names no tests, but its criteria each demand a test.
- **Not touched**: `dispositions.ts` and `check-catalog.ts`. `triviality.ts` only imports types from `dispositions.ts`.

**CI-provenance**: local

**Disclosure**: *built by the constructing seat.* I constructed Lina-1 and Lina-2, proposed F, confirmed my own units' operative sets (11.2, 13.0), and built the instrument that scores them.

## Criteria rows served (tasks.md Task 13, verbatim)

>   - **No `triviality.ts` precedes the G1 HOLDS (or branch-A) record in ancestry**: `git merge-base --is-ancestor <U2a's squash-merge commit on main> <first triviality.ts commit>` exits 0, **cited against the U2b PR's `refs/pull/<n>/head`**, which survives the branch deletion (S-T-A1; moved from Task 12 by the amendment of 2026-09-27). *Scope: it establishes that file's ordering, not the absence of triviality logic elsewhere.*
>   - The entry set is every body unit not byte-identical passthrough (a one-byte change enters; untouched does not).
>   - **The floor matches complete item `text`, per unit** (Req 11.6.5f): each of Lina-2's seven step units scores 0/k and ROUTES, and its byte-identical preamble is outside the entry set; a verbatim unit with a subtraction-1 removal ROUTES. *(Restated per unit, and the branch-A configuration clause dropped: G1 HOLDS at run 2, so branch A was not invoked — amendment 2026-09-27, U2b cut.)*
>   - **The strict count is a valid occurrence assignment, not per-item `includes`** (design C18 clause 2; closes G1 run 2 finding DR-1 — amendment 2026-09-27, U2b cut):
>     - (i) **witness**: `triviality.ts` returns the assignment it counted — each credited item id paired with the offset of its occurrence — not only the count;
>     - (ii) **validity, as a property test** over generated renderings: every returned assignment is valid — each credited item's complete `text` occurs at its assigned offset, no two credited items share an occurrence, and no two assigned occurrences overlap;
>     - (iii) **live-record invariants**, over every unit with a non-empty item set in every committed `canonical/operative-sets/*.yaml` record (units derived from the records, count asserted; zero-item units are 0/0, INAPPLICABLE): a rendering byte-identical to the canonical unit scores `|items|`/`|items|`; and, **for every item, deleting one occurrence of that item's `text` from the canonical unit gives a score below `|items|`** (the deletion invariant; per-item `includes` fails it on exactly `documentation-3` / `lessons-learned-capture-2`) *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*;
>     - (iv) **the AX-1 bite**: over the frozen AX-1 fixture, `#audit-checklist` scores 14/30 and ROUTES; with the assignment replaced by per-item `includes` the test turns RED at 15/30 CLEARS (exact strings recorded);
>     - (v) **per-unit search scope**: the text search runs **only within the unit's own rendered span, never the whole rendered charter**; a test asserts that an item whose `text` appears only in a sibling unit's rendering is not credited. *(The mechanical twin of Req 11.6.5e's scope (R2-F1): C18's "per unit" implies it; this states which text is searched. 13.4 does not implement 5e — entailment stays with the routed judge.)* *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*.
>     - *Scope: any valid assignment is sound (C18); whether it is maximal is 13.4's choice (G1 run 2, R2-A2), and a non-maximal choice only under-counts, which routes.*
>   - **The floor never condemns, per unit** (Req 11.6.5b, 11.6.5f — amendment 2026-09-27, U2b cut): `triviality.ts`'s verdict type has no TRIVIAL value; over the committed G1 renderings Lina-1 `#ios` and `#android` score 0/3 and ROUTE, and F's zero-item units (`#purpose` and `#family-overview:preamble`, read from the record) are INAPPLICABLE. *Scope: the TRIVIAL / NOT TRIVIAL verdicts of routed units are the routed judgment's (Req 11.6.5e), established at G1 (`completion/re-grounding-c3-falsification.md`), never by code.*
>   - **The G1 renderings are copied fixtures with pinned provenance** (pick pre-filled — amendment 2026-09-27, U2b cut; Peter may overturn on the amendment PR): every fixture under `tools/agent-generator/__fixtures__/g1-renderings/` names its source run record (`completion/re-grounding-c3-falsification-run-<n>.md` or `completion/task-11-3-exemplars-g-gprime.md`) and that record's blob SHA, and a test asserts the record's current bytes hash to the pinned blob and the fixture equals the marked rendering block in it. *Scope: it establishes the fixture is the gate's rendering, byte for byte; a changed run record turns it red rather than silently changing the fixture.*
>   - The hard floor fails when every non-empty-item unit is `no-consumer-counterpart`, including when a zero-item preamble is left retained.

**Where each row stands at 13.4** (all local):
- **No `triviality.ts` precedes G1 HOLDS.** The first `triviality.ts` commit on any ref is `72f1e981`, and `git merge-base --is-ancestor 24c7f060 72f1e981` exits 0 (`24c7f060` = U2a's squash-merge, #222). **The criterion's citation against `refs/pull/<U2b>/head` belongs to the U2b PR, not to this subtask.** The 13.0 confirming commit `6916f17c` is also an ancestor of `72f1e981` (exit 0), which is the 13.0 ordering row.
- **Entry set**: `triviality.floor.test.ts › the entry set`. The row states it as a rule; `triviality.ts` states it as a function.
- **Complete item text, per unit**: the seven Lina-2 step units → `triviality.g1.test.ts › each of Lina-2's seven step units scores 0/k and ROUTES`. The byte-identical preamble and the subtraction-1 case → `triviality.floor.test.ts`.
- **(i)–(v)**:
  - (i) and (ii): `triviality.assignment.test.ts`;
  - (iii): `triviality.records.test.ts`;
  - (iv): `triviality.g1.test.ts › (iv) the AX-1 bite`, with its bite below;
  - (v): `triviality.floor.test.ts › (v) per-unit search scope`.
- **Never condemns**:
  - `FloorVerdict` has no TRIVIAL value, enforced at compile time (bite 3);
  - Lina-1 `#ios` and `#android` score 0/3 and ROUTE;
  - F's `#purpose` and `#family-overview:preamble` are INAPPLICABLE, read from the record.
- **G1 fixtures**: `g1-renderings.provenance.test.ts`. The format is in `__fixtures__/g1-renderings/README.md`.
- **Hard floor**: `triviality.floor.test.ts › the hard floor (C18 clause 4)`.

## What changed

- **`tools/agent-generator/regrounding/triviality.ts`** (new) is C18's mechanical half.
  - `assignOccurrences(rendering, items) → Credit[]` returns the witness, `{ itemId, offset }` per credited item.
  - `assignmentViolations` states the validity property once.
  - `classifyUnit` returns one of: outside the entry set, `INAPPLICABLE`, `CLEARS`, or `ROUTES` with `routedBy: below-half | repo-specific-removal`.
  - `entrySet` returns entered, passthrough and absent units.
  - `classifyCharter` classifies per unit, and each unit sees only its own rendering.
  - `hardFloor` checks the whole charter.
- **The algorithm is greedy.** It takes candidate (item, occurrence) pairs longest text first, then leftmost, then in record order, skipping a used item or an overlapping occurrence. The result is valid by construction but not guaranteed maximal. Whether to maximise is 13.4's choice (G1 run 2, R2-A2), and an under-count only routes.
- **`tools/agent-generator/__fixtures__/g1-renderings/`** (new) holds the 22 renderings G1 scored: run 1's 17, run 2's 3, and G/G′ from 11.3.
  - Each is copied byte for byte; its file bytes are the rendering.
  - The sidecar `manifest.yaml` pins, per fixture: the source run record, its git blob SHA, the marker grammar and line, and the `canonicalHash` of the record unit it is scored against.
  - The directory also holds a `README.md` (format, and both marker grammars) and a read-only loader, `index.ts`.
  - No run record or G/G′ record was edited.
- **The five tests and the helper** are listed above. `includesCount`, the invalid implementation, exists only in the test helper, as the contrast the bites need.

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/triviality tools/agent-generator/__tests__/g1-renderings` → **`Test Suites: 5 passed, 5 total` · `Tests: 174 passed, 174 total`**:
  - assignment: 9;
  - records: 48 (4 + 22 units × 2);
  - g1: 50;
  - floor: 18;
  - provenance: 49.
- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit`: no error in any new file. The only errors are the pre-existing `Cannot find module '../../mcp-server/dist/index'` and its two knock-on `TS7006`s, in `workflow-rules-guard.ts`, its test and `render.ts`.
- **Full `npm run test:agent-generator` in this worktree** → `Tests: 421 passed, 421 total`, but `Test Suites: 11 failed, 26 passed`. All 11 fail to **run** on the missing `mcp-server/dist` build output, which the worktree's `node_modules` symlink does not provide. Per the brief, I did not build here. None of the 11 is mine. The unit-branch run is where the full suite is measured.
- `npm run check:completion-criteria-parity`, run after the tick → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`. For spec 123 it reports `16 parent(s) unticked — not evaluated`, because Task 13 is still open.
- **Live-record coverage** (iii): 22 units with a non-empty item set and 123 items, over all four committed records. The count is asserted as a floor plus exact iteration.
- **The AX-1 witness**: 14 credits, ending `metadata-accuracy-3@871`, `documentation-3@1025`. `lessons-learned-capture-2` shares that one occurrence and is not credited.

### Bites

Each bite mutated the working file, ran the triviality and g1-renderings suites, and restored the file (`cmp` clean, or `git checkout --` for tracked files). After all of them, the re-run was 174/174.

| # | Mutation | Red (exact) |
|---|---|---|
| 1 | **(iv) the assignment replaced by per-item `includes`** | `Expected: "AX-1 #audit-checklist: 14/30 ROUTES [below-half]"` / **`Received: "AX-1 #audit-checklist: 15/30 CLEARS"`**. Also: the deletion invariant on `stacy.yaml #audit-checklist` → `+ "documentation-3", + "lessons-learned-capture-2"`; the witness gains `"lessons-learned-capture-2@1025"`; the property test fails `"i0 and i1 share or overlap an occurrence"`. 10 failed. |
| 2 | overlap check removed | the property test fails, and AX-1 → `Received: "AX-1 #audit-checklist: 15/30 CLEARS"`. 9 failed. |
| 3 | `'TRIVIAL'` added to `FLOOR_VERDICTS` | `triviality.floor.test.ts:42:11 - error TS2322: Type 'false' is not assignable to type 'true'.` The suite fails to compile. |
| 4 | the clearing condition ignores removals | `Expected: "5/5 ROUTES [repo-specific-removal]"` / `Received: "5/5 CLEARS []"`, plus subtraction-2/3/4 → `Received: "CLEARS"`. 4 failed. |
| 5 | the entry set compares trimmed text | `the entry set › a one-byte change enters; untouched does not; …`. 1 failed. |
| 6 | **(v)** the search widened to the whole rendered charter | `Expected: "0/1 ROUTES"` / `Received: "1/1 CLEARS"`. 1 failed. |
| 7 | the hard-floor population includes zero-item units | `still fails when a zero-item preamble is left retained` → `Expected: true` / `Received: false`, plus the empty-population case. 2 failed. |
| 8 | the zero-item domain restriction removed | F's units INAPPLICABLE, and the live-record zero-item test. 2 failed. |
| 9 | one byte appended to `re-grounding-c3-falsification-run-1.md` | `Expected: "….md blob dd69678bf3a751db42837cbf4cb08a262d07bc89"` / `Received: "….md blob 6a43ada50f80ef50022f92bc065005df4a031172"`, on all 17 run-1 fixtures. |
| 10 | one byte changed in the AX-1 fixture | `AX-1 #audit-checklist › equals the marked block in its source, byte for byte`. 1 failed. |
| 11 | the `stacy.yaml #audit-checklist` hash moved (a simulated re-confirmation) | `Expected: "canonical/operative-sets/stacy.yaml #audit-checklist @ sha256:e8a4873d…d221"` / `Received: "… @ sha256:e8a4873d…d220"`, on A, AX-1 and A-blanket. 3 failed. |

## Application-time adaptations

1. **Algorithm: longest-first, not run 2's earliest-end greedy.** Longest-first credits a contained text that also occurs standalone (run 2's one `CHECK` edge case), and it gives |items|/|items| on every live identity rendering. It is still not maximal, which is sound. **Surviving residual**: a future record could hold a unit where greedy under-counts even on the identity rendering. (iii) would then turn red, and that is the right alarm; the fix is a maximal search.
2. **The hard floor fails on an empty population.** C18 clause 4 does not say what happens when no unit has items. I chose FAIL (*"zero is never a clean pass"*), because a vacuous pass is the silent-zero shape. **This is a fork I chose, surfaced for Peter**: the alternative is to pass vacuously and leave empty records to 13.5 and the freshness sweep.
3. **`classifyCharter` refuses** an entered unit with no committed operative-set entry, and never reads the absence as zero items (11.6.5d's denominator attack). The design does not state this; it follows from 5d.
4. **Absent units** (no rendering) are reported in `entrySet().absent`, per 5f's "clause (ii)'s trigger, not triviality". They are never silently dropped.
5. **Fixture format** is a sidecar manifest, not a header in each file, so the fixture bytes stay the rendering. It parses **both** marker grammars; neither was normalised, because parsing two was not ugly. **The record pin is extended from AX-1 to every fixture**: each names the `canonicalHash` its expected score assumes.
6. **(iii) "count asserted"** is asserted as exact iteration over the derived units plus a floor (≥ 22 units, ≥ 123 items, derived 2026-09-28), not as exact equality. An exact number would turn red on every new record (e.g. Task 15's). The floor still catches a silent drop to zero.
7. **"Deleting one occurrence"** is read as deleting the occurrence the identity witness assigned to that item. Every live item's text occurs exactly as often as items share it (measured: 0 exceptions over 123 items), so any occurrence gives the same result today.
8. **The 11.2 carried item "Lina-2 scores 0/7" is closed**: the #225 amendment restated it per unit, and each of the seven step units scores 0/k.
9. **Carried to 13.6 (mine)**: `diff-guard.ts` hard-codes `repoRoot` (`path.resolve(__dirname,'..','..')`, CLI entry). 13.6 adds a root argument or env var so the STANDING stale-fixture test can point it at `__fixtures__/stale-unit/`.
10. **Carried (Thurgood's read)**: `check-catalog.ts`'s "every registry entry has its `test:` filled" lands with 13.5. The hard floor's message is not one of the nine checks, so it is not in the catalog.
11. **A full-suite gap in the worktree**: 11 suites need the `mcp-server/dist` build output (see the tests section). Not built here.
