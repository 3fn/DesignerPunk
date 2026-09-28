# Task 11.2 completion (Lina's half): owner confirmations under C1 for `lina.md` and exemplar F

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Parent**: Task 11 · **Agent**: Lina (Opus), tiered secondary. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-27 · **Branch**: `task/123-u2a-g1-lina`, cut from `task/123-u2a-g1` @ `dd37b31a`. The orchestrator merges it into the unit branch.
**Write grant (T1-(B))**: Task 11's row as amended by **PR #220** (merged `a4ad7e25`, ruled by Peter 2026-09-27). It names Lina (Opus) for 11.2's `lina.md` units and the component-family doc. Files written under it: `canonical/profiles/consumer/confirmations/{lina,component-family-navigation}.md` (new) and confirmer edits to `canonical/operative-sets/{lina,component-family-navigation}.yaml`. Nothing else, apart from this subtask doc.
**Tick**: not ticked here. Thurgood owns `tasks.md` on this unit.

**Disclosure**: *confirmed by the constructing seat.* I constructed Lina-1 and Lina-2, I proposed F, and I build `triviality.ts` at 13.4, which is scored against these sets.

## What changed

- **`canonical/profiles/consumer/confirmations/lina.md`** (new). C1 confirmation of the 13 Lina-1 and Lina-2 units, in the adopted format, with one ruling per unit.
- **`canonical/profiles/consumer/confirmations/component-family-navigation.md`** (new). The F instantiation ruling plus confirmations of `#purpose` and `#key-characteristics`.
- **`canonical/operative-sets/lina.yaml`** (edited as confirmer).
  - `step6-author-meta` and `step6-review-staleness` restored to include their `**For new components**:` / `**For component modifications**:` labels. These were **prefix truncations**: the label is the branch's trigger condition.
  - The header and the Step 6 comment are updated.
  - **Counts unchanged: 13 units, 39 items.**
- **`canonical/operative-sets/component-family-navigation.yaml`**: header comment only. Items unchanged.

**Per-unit rulings** (items before → after):

| Unit | Before → after | Ruling |
|---|---|---|
| `#component-scaffolding-workflow:preamble` | 1 → 1 | confirmed; a unit with dispositionable content (L2-B1) |
| `#step-1-verify-component-family-doc` | 2 → 2 | confirmed |
| `#step-2-create-typests` | 1 → 1 | confirmed (`types.ts` is carried in the Step 4 layout) |
| `#step-3-author-contractsyaml` | 5 → 5 | confirmed; overlapping pair kept (it errs toward routing) |
| `#step-4-create-platform-implementations` | 5 → 5 | confirmed at the four-group grain |
| `#step-5-create-tests` | 1 → 1 | confirmed |
| `#step-6-create-or-review-component-metayaml` | 9 → 9 | two texts corrected (prefix truncation); `step6-meta-content` operative |
| `#step-7-create-readme` | 1 → 1 | confirmed |
| `#platform-implementation-true-native-architecture:preamble` | 2 → 2 | confirmed; a unit with dispositionable content (L2-B1) |
| `#web` · `#ios` · `#android` | 4 · 3 · 3 → same | confirmed; these are exactly my A10 count of 10 `**Label**: value` bullets, all operative |
| `#cross-platform-consistency` | 2 → 2 | confirmed |
| F `#purpose` | 0 → 0 | confirmed → clause (a), inapplicable |
| F `#key-characteristics` | 5 → 5 | confirmed → operative |

**F decision: KEPT, not re-pointed.**
- The current pair tests the dangerous classifier error, reading label-shaped bullets as definitional. That error shrinks the denominator.
- Re-pointing, or adding `#family-overview:preamble`, would falsify the *"F's `#purpose` only"* wording ruled in #220.
- **Surviving residual, surfaced as a fork for Peter**: F does not catch a classifier that reads label form as operative. Covering that needs a third F unit and a tasks amendment.
- **Fragility flagged**: `#purpose`'s inventory sentence is stale. Five Nav components exist; the doc says two. A fix is a canonical edit that re-opens this unit's confirmation, and it could cost clause (a) its only exemplar.

## Targeted checks + result

- **Stacy's check script**, extracted verbatim from `task-11-2-stacy-completion.md`:
  - **Before**: `lina.yaml` and `component-family-navigation.yaml` aborted with `ENOENT` on the missing notes.
  - **After**: `component-family-navigation.yaml` → ALL PASS (32 checks). `lina.yaml` → `FAILURES: 2/214`: `confirmation resolves` on the two `:preamble` units.
  - **Cause**: the script resolves fragments with `slugify(heading)`, which strips `:`. No heading can slug to a `:preamble` fragment, so this is a script limitation, not a note defect.
  - **With literal-anchor resolution** (heading `` `#X` `` → `X`, a one-line change): `lina` ALL PASS (222) · `component-family-navigation` ALL PASS (32) · `stacy` ALL PASS (253) · `start-up-tasks` ALL PASS (50).
- **Bites** (literal variant, each restored afterwards and re-run ALL PASS):
  - An id dropped from a note → `FAIL note items == record items: key-characteristics (4 vs 5)`.
  - A corrupted note hash → `FAIL note hash: platform-implementation-true-native-architecture:preamble`.
  - `#purpose` `none` → one id → `FAIL note items == record items: purpose (1 vs 0)`.
  - **Limit shown**: reverting my Step 6 prefix fix still passes (222). **Truncation is invisible to the checks, as C16 states**; it is the confirmer's to catch.
- **The precursor test** (`src/__tests__/operative-set-records.test.ts`, from `9054de14`), run after committing `d05f1565` and merging `task/123-u2a-g1` into this branch: `npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts` → **22 passed, 22 total**. Its note resolution matches headings exactly, so the `:preamble` units resolve.
- **`npm run audit:coverage-map`** → FAIL as expected: 8 unadjudicated blank rows (four operative-set files and four confirmation notes, **my two notes included**), plus `adjudicated-blank: 1` (`generated.lock`). **11.5 (Stacy) handles these.** The audit's rewrite of `coverage-map.yaml` was reverted.
- **Main checkout**: `git -C …/DesignerPunk-v2 status --porcelain` shows nothing of mine.

## Application-time adaptations

- **Two confirmer text corrections** (Step 6 prefix truncations), made in the owner's seat as 11.6.5d places them. No narrowing and no widening: every count is unchanged.
- **Merged `task/123-u2a-g1` (`9054de14`) into this branch** at the coordinator's direction, to run the precursor test against committed notes. This adds a merge commit to this branch; the orchestrator merges the branch back.
- **Carried to 13.4 (mine)**: Task 13's criterion *"Lina-2 scores 0/7"* is section-grain wording. At finest grain, Lina-2 is 8 units and 25 items, and `triviality.ts` scores per unit. Restate or aggregate it at 13.4, consistent with Thurgood's 11.1 adaptation 3 (carried to Task 12).
- **Carried to 13.6 (mine)**: when the precursor test is absorbed, keep exact literal-anchor note resolution. Slug-based resolution cannot resolve `:preamble` fragments.
