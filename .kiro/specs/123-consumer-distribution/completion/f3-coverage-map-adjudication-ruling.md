# F3: time-boxed `audit:coverage-map` adjudications for Task 11's new canonical files (ruling note)

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Parent**: Task 11 · **Subtask**: 11.5 · **Ruling seat**: Stacy (`owner: stacy` on every row)
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-stacy` @ `ea329e87`
**Authority**:
- **F3**, ruled by Peter on 2026-09-27 (`tasks.md`, the rulings note under § "Declared Merge Units"). It replaces the old "disclose a known-red window" default.
- The **count erratum**, ruled by Peter on 2026-09-27 (#220).
- The conditions from my B-CI ballot review: `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` § 11, `[STACY R1]` § 6, conditions (a)–(d), confirmed in `[STACY R2]`.
- Write grant: Task 11's row lists `canonical/adjudications.yaml` for Stacy's time-boxed `audit:coverage-map` entries only.

**This note is the citable `record` for every row below.** Each row's `record` value carries this note's path and the exact string "expires when 123 Task 13.6 lands in U2b".

## The ruling

Each file below is a blank coverage-map row: it matches no registered check's derived glob. Each gets one `canonical/adjudications.yaml` row with:
- `sweep: audit:coverage-map`
- `key: <exact path>`
- `ruling: assessment-gap`
- `owner: stacy`

The ruling is **time-boxed**. The guard for these files, `operative-set-freshness` inside `122-diff-guard`, lands at **Task 13.6 in U2b**. That change removes these rows.

| # | Key (exact path) | What the file is |
|---|---|---|
| 1 | `canonical/operative-sets/component-family-navigation.yaml` | exemplar F's operative-set record (Lina) |
| 2 | `canonical/operative-sets/lina.yaml` | Lina-1 and Lina-2's records (Lina) |
| 3 | `canonical/operative-sets/stacy.yaml` | the records for exemplars A–E (Stacy) |
| 4 | `canonical/operative-sets/start-up-tasks.yaml` | the records for G and G′ (Stacy, C1 carve-out) |
| 5 | `canonical/profiles/consumer/confirmations/component-family-navigation.md` | Lina's C1 confirmation |
| 6 | `canonical/profiles/consumer/confirmations/lina.md` | Lina's C1 confirmation |
| 7 | `canonical/profiles/consumer/confirmations/stacy.md` | my C1 confirmation (owner seat) |
| 8 | `canonical/profiles/consumer/confirmations/start-up-tasks.md` | my C1 confirmation (carve-out seat) |

**Why `assessment-gap`** (condition (d)):
- The file's vocabulary (`intentional-trim | assessment-gap | design-change`) was written for sweep-4's set differences. None of those values means "guard pending, time-boxed".
- `assessment-gap` is the nearest fit: the files are real, their guard is designed, and it is not built yet.
- The parser does not validate `ruling`. The time-box lives only in `record`, because the schema has no expiry field.
- The steward may add a fourth value to his machinery. That is his call, not a condition of this ruling.

## What the adjudication establishes, and what it does not

- **It establishes**: every blank row that Task 11 created is visible and ruled, and is not silently blank. `npm run audit:coverage-map` passes.
- **It establishes no guard** over these eight files. Until 13.6, their integrity rests on:
  - **the precursor test** `src/__tests__/operative-set-records.test.ts`, 22 tests covering the confirmer, the verbatim-substring property, the hash and the note checks. It runs in the default Jest lanes. The coverage map does not see it, because the map derives only from registered checks' surface globs;
  - **PR review**.
- **A known limit, from R1**: adjudications are consulted only for blank rows. If 13.6's guard lands and a row here is not removed, it lingers silently. **The grep is what catches that**, so the expiry string must appear only in `record` values.
- **A hazard I hit while writing the rows**: my first draft of the explanatory comment quoted the expiry string, and the grep counted **9, not 8**. The comment now describes the string without quoting it.
  - A comment that contains the string would make the U2a count wrong and the 13.6 "→ 0" unreachable.
  - Anyone editing this block, including at 13.6, must keep the string out of comments.

## Counts at U2a (condition (a); criterion as amended by the #220 erratum)

- **`grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → 8**
- **The audit's `adjudicated-blank` → 9**
- **Pre-existing `audit:coverage-map` adjudicated rows, by key → 1**: `canonical/generated.lock` (`ruling: intentional-trim`, `owner: thurgood`, record in Spec 122 Task 8.2's completion doc).
- **N = 9 − 1 = 8**, which equals the grep count. **The N paths are rows 1–8 above**, exactly the audit's eight `[adjudicated]` rows other than `generated.lock`.

## Expiry (owed at 13.6, U2b)

- 13.6 removes all eight rows.
- It cites `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → **0**.
- **Its criterion (ii) shows these same eight paths non-blank, listing `122-diff-guard`.** Without that, "→ 0" would pass vacuously, which is condition (a) at the far end.
- Lina is told in the 13.6 notice. I accept that removal, because it enforces the expiry this note states.

## Out of this ruling

- **A `canonical/` file added after this commit is NOT covered.** That includes a C3 rework commit under Task 12, for which Task 12 has its own criterion. Such a file is a new blank row that nobody has been granted authority to adjudicate. It goes back to Peter as a tasks amendment, and I do not absorb it here.
