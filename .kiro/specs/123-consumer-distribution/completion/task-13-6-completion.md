# Task 13.6 completion: `operative-set-freshness` inside `122-diff-guard`, the STANDING stale-unit test, the coverage rows, the expired adjudications, the precursor test absorbed and deleted

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Lina (Opus), tiered secondary. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-lina-13-4` · **Code commit**: `6cf42d43e1846e528dd2f2574d04ed334dbc19f1`. This doc and the tick follow in a docs-only commit.

**Write grant**: Task 13's row.
- **Inside the grant**:
  - `tools/agent-generator/diff-guard.ts`;
  - `__fixtures__/stale-unit/`;
  - `canonical/adjudications.yaml` ("13.6 removes the expired U2a rows only — F3");
  - `src/__tests__/operative-set-records.test.ts` ("13.6 deletes the Task 11 precursor test only").
- **Out-of-list on a strict reading, disclosed**:
  - **`tools/agent-generator/regrounding/freshness.ts`** (new). It is the sweep, read under "schemas + validator" as Thurgood read it at 13.1–13.3.
  - **`tools/agent-generator/coverage-map.ts`** and **`__tests__/coverage-map.test.ts`** (both Spec 122). Criterion (ii) cannot be met without changing the diff-guard manifest's derivation (adaptation 3).
  - **`canonical/coverage-manifest.yaml`** and **`canonical/coverage-map.yaml`**: generated outputs, rewritten by the audit run (a stale map would fail the diff-guard).
  - **The new test** `__tests__/operative-set-freshness.test.ts` (the design's named file).
- **Not touched**: every 13.1–13.3 module of Thurgood's.

**CI-provenance**: local

## Criteria rows served (tasks.md Task 13, verbatim)

>   - **`operative-set-freshness` inside `122-diff-guard`, with ARMING read-ready** (input 4, corrected):
>     - (i) **a STANDING test** runs `npx tsx tools/agent-generator/diff-guard.ts` against a **committed stale-unit fixture** and expects non-zero. *This catches a future restructure that drops the sweep.*
>     - (ii) **`npm run audit:coverage-map` shows that the rows for `canonical/operative-sets/**` and `canonical/profiles/consumer/**` LIST `122-diff-guard`**, output cited. *(Stacy R2: zero blank rows would prove only that some check covers them, not this one. She measured no broad `canonical/**` glob.)*
>     - (iv) **The U2a time-boxed adjudications expire here**: the same change removes every `canonical/adjudications.yaml` row whose `record` reads "expires when 123 Task 13.6 lands in U2b" — `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → 0, output cited — and (ii)'s output shows **the same N paths U2a listed** (Task 11) now non-blank, without them (F3 RULED, Peter 2026-09-27; B-CI ballot § 11 `[STACY R1]` § 6 condition (a): the → 0 alone would pass vacuously if the rows never carried the string). *Limit: the audit consults adjudications only for blank rows, so an unremoved row would linger silently; the grep is what catches it.*
>     - (iii) Stacy is notified that ARMING fires at U2b's merge (amended 2026-09-27; was U2's merge).
>     - (v) **The Task 11 precursor test is absorbed and deleted**: the freshness sweep (with 13.3's confirmer and verbatim checks) covers every assertion of `src/__tests__/operative-set-records.test.ts` — confirmer = C1, anchors resolve, fresh `canonicalHash`, verbatim substring, `confirmation:` resolves with matching key lines — and the same change DELETES that file: `git ls-tree -r --name-only refs/pull/<U2b>/head -- src/__tests__/operative-set-records.test.ts` returns empty, output cited. *(amendment 2026-09-27, ruled by Peter — found at 11.4: no instrument existed)* *Scope: it establishes the file's absence and the assertion list absorbed, so no second instrument lingers; the absorbed checks' bites are the nine-check criterion's.*
>   - **Ballot B-U2 is RATIFIED before its edits apply.** It carries **the C2 counting-block edit** (per-agent `no-consumer-counterpart` rate, per-signer assent rate, refusal count; baseline-in-123 / first-render annotations) **and the `classification-map` L686 edit** (applied at 17.3) (S-T2).

**Where each item stands** (all local):
- **(i)**: `operative-set-freshness.test.ts › (i) STANDING — … exits non-zero naming the stale canonicalHash`. It spawns `npx tsx tools/agent-generator/diff-guard.ts --root tools/agent-generator/__fixtures__/stale-unit`, expects a non-zero status, and asserts stderr carries `diff-guard: FAIL (operative-set-freshness)`, the exact stale-hash line, and exactly one finding. Run directly:
  ```
  diff-guard: FAIL (operative-set-freshness)
  operative-set-freshness: FAIL — 1 record(s), 1 unit(s), 1 note(s), 0 dispositions file(s), 0 overlay(s)
    [operative-set-freshness] operative set canonical/operative-sets/fixture.yaml #alpha: canonicalHash sha256:13d322a0e44fa36b7bee580b15fe2134c24783138fb2d6087302b8d8a39c6ad4 is stale — the canonical unit is now sha256:c15f9d64f00a7acd9c6c200a49b0891f09bd34e439e68d703877cfe076ecac2c; the C1 confirmer re-confirms the unit's set (C16)
  exit 1
  ```
- **(ii)**: `npm run audit:coverage-map` → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`.
  - **Surfaces pass**: `total surfaces : 306` · `guarded : 305` · `blank : 1` · `adjudicated-blank : 1` (`canonical/generated.lock`, a standing ruling). Before this change it was `blank : 9` · `adjudicated-blank : 9`.
  - **Lanes pass**: `lanes (required-check steps vs local lane roots; sweep: audit:coverage-map:lanes): PASS` (18 required contexts, 7 local jest configs).
  - The rows the audit wrote, **the same 8 paths U2a listed (Task 11)**, now non-blank without any adjudication. Each reads `checks: - 122-diff-guard`:
    ```
    - surface: canonical/operative-sets/component-family-navigation.yaml   checks: - 122-diff-guard
    - surface: canonical/operative-sets/lina.yaml                          checks: - 122-diff-guard
    - surface: canonical/operative-sets/stacy.yaml                         checks: - 122-diff-guard
    - surface: canonical/operative-sets/start-up-tasks.yaml                checks: - 122-diff-guard
    - surface: canonical/profiles/consumer/confirmations/component-family-navigation.md   checks: - 122-diff-guard
    - surface: canonical/profiles/consumer/confirmations/lina.md           checks: - 122-diff-guard
    - surface: canonical/profiles/consumer/confirmations/stacy.md          checks: - 122-diff-guard
    - surface: canonical/profiles/consumer/confirmations/start-up-tasks.md checks: - 122-diff-guard
    ```
  - `canonical/coverage-manifest.yaml` gains exactly `canonical/operative-sets/**` and `canonical/profiles/consumer/**` under `122-diff-guard`, with no broad `canonical/**` glob.
- **(iv)**: `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → **`0`**. Before, it was `8`. The removed rows (all `sweep: audit:coverage-map`, `ruling: assessment-gap`, `owner: stacy`), by key:
  1. `canonical/operative-sets/component-family-navigation.yaml`
  2. `canonical/operative-sets/lina.yaml`
  3. `canonical/operative-sets/stacy.yaml`
  4. `canonical/operative-sets/start-up-tasks.yaml`
  5. `canonical/profiles/consumer/confirmations/component-family-navigation.md`
  6. `canonical/profiles/consumer/confirmations/lina.md`
  7. `canonical/profiles/consumer/confirmations/stacy.md`
  8. `canonical/profiles/consumer/confirmations/start-up-tasks.md`

  The (ii) output above shows those 8 paths non-blank without them. `adjudications.yaml` is a trigger surface for the unit PR's `Consulted:` line, and the orchestrator handles that at PR time.
- **(iii)**: the ARMING notice is below. The orchestrator delivers it to Stacy's seat; I did not contact her.
- **(v)**: the precursor test is deleted in the same change. `git ls-tree -r --name-only HEAD -- src/__tests__/operative-set-records.test.ts` on `6cf42d43` returns empty (0 lines). **The criterion's citation on `refs/pull/<U2b>/head` belongs to the U2b PR.** The absorption map is below. Every assertion bites **through the sweep**, and all five bites below were run before the deletion.

## ARMING notice — for Stacy (delivered by the orchestrator)

> **ARMING — `operative-set-freshness` (Spec 123 U2b, Task 13.6).**
> - **When**: ARMING fires at **U2b's merge** (amended 2026-09-27; was U2's merge). From that merge, `122-diff-guard` (an existing required context, not a new one) runs the `operative-set-freshness` sweep on every run, including the fast no-op path.
> - **What it covers**: `canonical/operative-sets/**` and `canonical/profiles/consumer/**` now list `122-diff-guard` in the coverage map.
>   - A canonical edit to a recorded unit without re-confirmation fails CI.
>   - So does any of: a wrong confirmer; a non-verbatim item; an orphaned record, disposition or overlay key; a missing disposition row; a stale overlay pin; a wrong signer; a stale signature.
> - **Expired**: the 8 time-boxed U2a coverage-map adjudications (F3, keys listed in `task-13-6-completion.md` § (iv)) are removed. `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → 0.
> - **Limits you inherit**:
>   - seat authorship is not established (one git identity — C16);
>   - a prefix truncation of an item's text passes (the confirmer's responsibility);
>   - a signed row is REFUSED, fail-closed, until Task 15 supplies the rendered hash. No signature exists today.
> - **Evidence**: this doc; `tools/agent-generator/__tests__/operative-set-freshness.test.ts`; the STANDING fixture `tools/agent-generator/__fixtures__/stale-unit/`.

## The absorption map — every precursor assertion, its new home, and the test that bites it through the sweep

| Precursor assertion (`src/__tests__/operative-set-records.test.ts`, deleted) | New home | Bites through the sweep in `operative-set-freshness.test.ts` |
|---|---|---|
| finds records to check (non-vacuity) | the sweep's counts, printed on every run | `the sweep over the real repo › is clean, and not vacuous` (≥ 4 records, ≥ 24 units, ≥ 4 notes; today exactly 4 / 24 / 4) |
| computes the C1 function (owner / carve-out / collapse) | `regrounding/c1.ts` (13.3) | `signatures.test.ts › is the owner, the counterpart seat for the profile author, peter on collapse` (Thurgood's). Not a sweep assertion: it tests a function. |
| declares the confirmer the C1 function requires | `checkConfirmer` (13.3), run by the sweep | `absorbs: "declares the confirmer the C1 function requires"` |
| names a source file that exists | the sweep | `absorbs: "names a source file that exists"` |
| keys every unit by a current partition anchor | `checkRecordKeys` (13.5), run by the sweep | `absorbs: "keys every unit by a current partition anchor"` |
| … with a fresh canonicalHash | the sweep | `absorbs: "edit a canonical unit without re-confirming" / "fresh canonicalHash"`, plus the STANDING test |
| carries unique ids, known kinds | `checkItems` (13.3), run by the sweep | `absorbs: "unique ids, known kinds, no edge whitespace"` (kind). Duplicate ids and edge whitespace: `operative-set.checks.test.ts › refuses duplicate ids, unknown kinds, edge whitespace and missing text` (same function) |
| item text verbatim from its unit | `checkItems` (13.3), run by the sweep | `absorbs: "item text verbatim from its unit"` |
| `confirmation:` fragment names its unit | the sweep | `absorbs: "confirmation: fragment names its unit"` |
| … resolves to an existing note | the sweep | `absorbs: "confirmation note exists"` |
| … that is committed (git-tracked) | the sweep (`git ls-files`; fail-closed if git cannot answer) | `absorbs: "confirmation note is committed"` |
| … with exactly one `## ` block for the unit, matched literally (not slugged) | the sweep | `absorbs: "exactly one note block for the unit"`; the real-repo run resolves the three `:preamble` units (bite 3) |
| … whose confirmer / canonicalHash / items lines equal the record's, plus a date line | the sweep | `absorbs: "note confirmer / canonicalHash / items / date lines match the record"` |
| (per record) at least one unit | the sweep | `absorbs: "each record declares at least one unit"` |

No suite imported anything from the precursor test (`git grep operative-set-records` finds only comments and the Task 11 summary), so no other suite needed re-running for it.

## What changed

- **`regrounding/freshness.ts`** (new) is the sweep. Its header lists the call set per file kind.
  - **Records**: source exists and ≥ 1 unit; `checkOperativeSet` (13.3); `checkRecordKeys` (13.5); **canonicalHash freshness**; confirmation-note resolution.
  - **Dispositions files**: `validateDispositions` (13.1, including bare signatures and the rejected term); `checkDispositionKeys` (13.5); `checkDispositionSigners` (13.3); `checkSignatureFreshness` (13.2).
  - **Overlays**, paired with their same-stem dispositions file for `source:`: `parseOverlay` (format); `checkOverlayKeys` (13.5); `checkOverlayPins` (13.2).
  - `surfaceGlobs()` returns the two canonical globs.
- **`diff-guard.ts`**:
  - `runGuard` runs the sweep **first, on every run**, including the fast no-op path, which would otherwise skip it. On any finding it returns `FAIL` with `failedBy: 'operative-set-freshness'` and **never refreshes the lock**.
  - `GuardResult` gains `freshness` and `failedBy`.
  - **CLI surface change (disclosed)**:
    - `--root <dir>` is added;
    - the freshness report prints on every run (to stdout on green, stderr on fail);
    - an invalid `--root` exits 2.
  - **`generate.ts` is now loaded lazily**, the same idiom `generate.ts` uses for `coverage-map.ts`. The sweep's verdict therefore does not depend on the MCP dist loading. Green-path behaviour is unchanged.
- **`coverage-map.ts`**: `diffGuardSurfaceGlobs()` = the `guardedRoots()` globs **plus** the sweep's own `surfaceGlobs()`, imported from it (S-D1: one symbol, two consumers). `coverage-map.test.ts`'s S-D1 spot-check now asserts both sources, including the length.
- **`__fixtures__/stale-unit/`**: a minimal repo shape (charter, record, note and README) whose single defect is the stale hash.
- **`canonical/adjudications.yaml`**: the 8 rows and **their group's 6-line header comment** removed (adaptation 5).
- **`canonical/coverage-manifest.yaml`** and **`canonical/coverage-map.yaml`**: regenerated by the audit run.
- **`src/__tests__/operative-set-records.test.ts`**: deleted (`git rm`).

## Targeted tests + result

- `npx jest --config tools/agent-generator/jest.config.js tools/agent-generator/__tests__/operative-set-freshness.test.ts` → **`Tests: 22 passed, 22 total`**.
- **Full `npm run test:agent-generator`** → **`Test Suites: 42 passed, 42 total` · `Tests: 692 passed, 692 total`**. This was measured with a **read-only symlink** `mcp-server/dist` → the main checkout's built `mcp-server/dist`. The main checkout's `mcp-server/src` is identical (same last commit `d566b30f`, empty diff), and nothing was built or written there. The symlink is untracked, was never committed, and is removed before this doc's commit. It is how the 11 suites that could not load at 13.4/13.5 ran here.
- `npx tsc -p tools/agent-generator/tsconfig.json --noEmit` → exit 0, clean, with the same symlink.
- **Not measured locally; the unit branch measures these**:
  - **the full `122-diff-guard` run on the real repo**: the sweep passes (`4 record(s), 24 unit(s), 4 note(s)`), then generation needs `application-mcp-server/dist`, which this worktree lacks (`Registry introspection: server "designerpunk-application" … failed to boot`). So the full-run comparison of the regenerated coverage files, and the lock, are unmeasured here. `canonical/generated.lock` is **stale**, so CI takes a full run; a stale lock does not fail it.
  - **root `npm test`**: `Test Suites: 38 failed, 346 passed, 384 total`. All 38 fail on missing build artifacts (`@3fn/core/types`, `./generated/TokenTypes`, `dist/browser/*`, `dist/cli/*`). This is the known fresh-worktree class, and none touches a changed file.
- `npm run check:completion-criteria-parity` after the tick → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`.

### Bites (each mutated, run, and restored; `cmp` clean; re-run green) — all run BEFORE the precursor was deleted

| # | Mutation | Red (exact) |
|---|---|---|
| 1 | the canonicalHash comparison removed from the sweep | the STANDING test; `absorbs: "edit a canonical unit…"` loses `"operative set canonical/operative-sets/fixture.yaml #alpha: canonicalHash sha256:c15f9d64… is stale — the canonical unit is now sha256:5386e436…; the C1 confirmer re-confirms the unit's set (C16)"`; runGuard loses `"operative-set-freshness"`. 3 failed. |
| 2 | **the guard restructured without the sweep** (what (i) exists to catch) | the STANDING test and the runGuard test go red. 2 failed. **The guard CLI still exits non-zero here, on `diff-guard: ERROR — ENOENT: … stale-unit/canonical/shared/skills-map.yaml`**, so a status-only assertion would have passed. The test asserts the freshness line; that is why it catches this. |
| 3 | note blocks matched by slug (the precursor's pre-11.4 rule) | the real-repo sweep: `"operative set canonical/operative-sets/component-family-navigation.yaml #family-overview:preamble: confirmation resolves to 0 note blocks in canonical/profiles/consumer/confirmations/component-family-navigation.md (want 1)"`, plus both `lina.yaml` `:preamble` units. |
| 4 | the committed check skipped | `absorbs: "confirmation note is committed"` loses `"operative set canonical/operative-sets/fixture.yaml #alpha: confirmation note canonical/profiles/consumer/confirmations/fixture.md is not committed"`. 1 failed. |
| 5 | coverage-map drops the sweep's globs from `122-diff-guard` | `coverage-map — S-D1 spot-check › every diffGuardSurfaceGlobs() entry traces to …`. 1 failed. (The audit would re-blank the 8 rows.) |

## Application-time adaptations

1. **The sweep runs before the lock's no-op check.** Otherwise a no-op run would skip it, and `canonical/**` is in the input closure only as a hash, not as a check. It is filesystem-only and fast.
2. **`generate.ts` is lazy-loaded in `diff-guard.ts`.** Without this, the CLI crashes on import wherever the MCP dist is absent, and the STANDING test could not tell "the sweep failed" from "the guard crashed". Bite 2 shows that difference is real.
3. **`coverage-map.ts` changed (out-of-list, Spec 122).** The `122-diff-guard` manifest was derived only from `guardedRoots()`. Adding the operative-set dirs to `guardedRoots()` would be wrong: they are compared against regeneration, so they would read as "extra". The S-D1-faithful change imports the sweep's `surfaceGlobs()`. **Surfaced for the orchestrator**: this touches a Spec 122 instrument; if Thurgood wants it expressed differently, the alternative is the same import made from `generate.ts`.
4. **Signature freshness is fail-closed until Task 15.** A signed row cannot have its `renderedHash` checked without the consumer renderer, so the sweep refuses any signature it meets rather than checking the canonical half only. No signature exists today. **Carried to Task 15**: pass `renderedHash` into `runFreshnessSweep`.
5. **The 8 rows' group header comment was removed with them.** It described rows that no longer exist. The "rows only" scope is read as "no other rows"; no other line of `adjudications.yaml` changed. The orchestrator can restore the comment in one line if that reading is too wide.
6. **The note-is-committed check fails closed when git cannot answer** (`cannot establish that … is committed (git ls-files failed)`). The runGuard test over a non-git temp tree shows it.
7. **The mcp-server/dist symlink** was used for local measurement only. It was never committed and is removed.
8. **`canonical/generated.lock` is not refreshed** (13.1's precedent): it would need a full generation run, which this worktree cannot do.

## Addendum 2026-09-28 (Stacy's ARMING-read asks)

*Append-only. The original notice above is unchanged; it is quoted and extended here, per the completion guide's errata convention. Asked by Stacy on reading the ARMING notice, relayed by the orchestrator.*

### (a) The instrument that certifies the coverage changed in the change it certifies

The original notice says:

> **What it covers**: `canonical/operative-sets/**` and `canonical/profiles/consumer/**` now list `122-diff-guard` in the coverage map.

**Extended.** That listing is produced by `tools/agent-generator/coverage-map.ts`, and **this same change modified it**:
- **The files**: the code commit `6cf42d43` edited `tools/agent-generator/coverage-map.ts` (`diffGuardSurfaceGlobs()` now appends the sweep's own `surfaceGlobs()`) and its test, `tools/agent-generator/__tests__/coverage-map.test.ts` (the S-D1 spot-check). Both are Spec 122 files, outside Task 13's Primary Artifacts, and were disclosed as adaptation 3.
- **Which instrument ran**: `git rev-parse 6cf42d43:tools/agent-generator/coverage-map.ts` → **`53eb157d377f6e0c8887a332b0355febf725f9f9`**. The unit head `9395258b` carries the same blob (`git rev-parse 9395258b:tools/agent-generator/coverage-map.ts` → `53eb157d377f6e0c8887a332b0355febf725f9f9`). The (ii) audit output above was produced by that blob.
- **What stops the edit from simply asserting coverage**: the change is a derivation, not a declaration. The new globs are imported from `regrounding/freshness.ts`'s `surfaceGlobs()`, the same symbol the sweep reads from (S-D1), so the two cannot drift. **Bite 5** (§ "Bites") shows it is load-bearing: dropping the sweep's globs from `diffGuardSurfaceGlobs()` turns `coverage-map.test.ts › … S-D1 spot-check …` red, and the audit re-blanks the 8 rows.
- **Classification (Stacy's)**: the out-of-list Spec 122 edit is a **MIDPOINT** item, not an ARMING one. ARMING reads which `coverage-map.ts` ran (the blob above); whether that edit was in scope is for the midpoint read.

### (b) The baseline required-context count, measured at the U2b head

At U2b's merge Stacy compares two **measured** numbers, not a measurement against a claim. This is the pre-merge measurement.

- **Command**: `bash tools/agent-generator/verify-gate-registration.sh`. It reads GitHub's branch-protection API for `main`'s required status checks and count-asserts them against the script's `EXPECTED_CONTEXTS`.
- **Measured by the orchestrator, main checkout, `9c1bf86a`, 2026-09-28.** The script needs a `GITHUB_TOKEN`, and this worktree holds none. My own run at `9395258b` exited 1 with `FAIL: no GITHUB_TOKEN in the environment or …/.env`, and I did not source a credential file.
- **Why `9c1bf86a` is valid for `9395258b`**: `9c1bf86a` is Thurgood's R3 ballot commit on top of `9395258b`. `git merge-base --is-ancestor 9395258b 9c1bf86a` exits 0, and `git diff --name-only 9395258b 9c1bf86a` lists only `.kiro/docs/ballots/2026-09-28-123-b-u2.md`. So the script and everything it reads in-tree are byte-identical between the two.
- **Output** (the tail of the context enumeration; the first four contexts scrolled above the capture):
  ```
    122-sweep-3-dupes
    122-sweep-4-ambient
    122-sweep-6-declarations
    122-sweep-7-dispositions
    122-sweep-8-demotion
    125B-tool-boot-smoke
    Check package name drift
    Consumer Guard
    Section Citation Guard
    lane-application-mcp-server-suite
    lane-build-validate
    lane-functional-root
    lane-mcp-server-suite
    lane-typecheck
  PASS: all 18 required contexts present, count-asserted (N=18 recorded in this script)
  ```
- **Baseline: N = 18** required contexts, all present. The full list can be reproduced by any seat that holds the credential.
- **For the ARMING record**: 13.6 added **no** required context. The sweep runs inside the existing `122-diff-guard` context (design C16, "no new CI context"), so the count at U2b's merge is expected to equal this baseline.
