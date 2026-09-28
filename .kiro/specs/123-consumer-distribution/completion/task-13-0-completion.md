# Task 13.0 completion: exemplar F's third unit, `#family-overview:preamble`, recorded and confirmed under C1

**Spec**: 123 (Consumer Distribution) · **Unit**: U2b · **Parent**: Task 13 · **Agent**: Lina (Opus), tiered secondary for 13.0. Thurgood (Opus) is PRIMARY.
**Date**: 2026-09-28 · **Branch**: `task/123-u2b-lina-13-0`, cut from the unit branch `task/123-u2b-profile` @ `ba015900` (= `main`). The orchestrator fast-forwards it into the unit branch.
**Write grant**: Task 13's row as amended by **#225** (`00078f11`, the U2b-cut amendment). Its Primary Artifacts name `canonical/operative-sets/component-family-navigation.yaml` and `canonical/profiles/consumer/confirmations/component-family-navigation.md` for 13.0's third F unit only. Other files written:
- this doc;
- the 13.0 checkbox in `tasks.md`;
- the Item 1 EXECUTED block in `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md`, on the orchestrator's instruction. `.kiro/issues/` is outside my charter scope. The file is my own filed issue, and the block records execution only.

**CI-provenance**: local

**Disclosure**: *confirmed by the proposing seat.* I proposed F at R2, raised this residual at 11.2, and build `triviality.ts` at 13.4, which reads this unit's verdict from the record.

**Criterion served** (Task 13, verbatim):
> **Exemplar F's third unit is recorded and C1-confirmed before 13.4** (amendment 2026-09-27, U2b cut; `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md` Item 1): `canonical/operative-sets/component-family-navigation.yaml` carries `#family-overview:preamble` with its confirmed item set (expected 0), confirmed against that unit's `canonicalHash` as of #223's merge (`14aa8c23` on `main`; the Readiness line 2 → 5), with zero items re-verified on that text *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*; its note block resolves in `canonical/profiles/consumer/confirmations/component-family-navigation.md`, and `src/__tests__/operative-set-records.test.ts` is green over it, output cited; the confirming commit precedes the first `triviality.ts` commit in ancestry.

## What changed

- **`canonical/operative-sets/component-family-navigation.yaml`** gains a third unit, `#family-overview:preamble`, with `items: []` and `canonicalHash: sha256:0b09be78566cb1466b5d4ea062b5c3344499cbf60ef4f4e4f4f0bb9e28c81f0c`. The header comment records that the 11.2 decline is superseded.
- **`canonical/profiles/consumer/confirmations/component-family-navigation.md`** gains the unit's C1 block (`confirmer: lina`, the same hash, `items: none`, `date: 2026-09-28`). The block carries a per-line ruling, re-verified on the post-#223 text. The 11.2 "KEPT" section is marked superseded *in part*: the `#purpose` / `#key-characteristics` pair still stands; only the decline of the third unit is superseded.
- **Preconditions verified**:
  - `git merge-base --is-ancestor 14aa8c23 HEAD` exits 0.
  - `git diff 14aa8c23 -- governance/Component-Family-Navigation.md` is empty.
  - `git log --all -- tools/agent-generator/regrounding/triviality.ts` is empty (no such file on any ref). The confirming commit therefore precedes any `triviality.ts` commit. The ancestry form of the check can be run only once 13.4 creates the file.
- **Hash provenance**: the unit hashes to `sha256:0b09be78…` at `14aa8c23` and to `sha256:995a525f…` at `14aa8c23^`. #223's Readiness edit is the only change. The recipe is the yaml header's: partition(splitFrontmatter(body)), SHA-256 over the unit's UTF-8 bytes (170 bytes). The same recipe reproduces the record's existing `#purpose` and `#key-characteristics` hashes.

## Targeted tests + result

- `npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts` → **`Tests: 22 passed, 22 total`**. The test was not edited. The count stays at 22 because each record gets five tests that loop over its units internally, so a new unit adds none.
- **Bites on the new unit** (each restored, then re-run 22/22):
  - A corrupted note hash → `"note hash: #family-overview:preamble"` (1 failed).
  - The record hash one byte off → `"stale canonicalHash: #family-overview:preamble"` + `"note hash: …"` (2 failed).
  - Note `items: none` → one id → `"note items != record items: #family-overview:preamble (1 vs 0)"` (1 failed).
- `npm run check:completion-criteria-parity`, run after the tick → `SUMMARY: parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`. For spec 123 it reports `16 parent(s) unticked — not evaluated`, because Task 13 is still open.

## Application-time adaptations

- **The expected test count was wrong in the brief** (22 → 23+). The coverage is shown by the bites above, not by a count.
- **Surfaced residual, not absorbed (for Peter)**: the unit holds the `**Label**: value` shape constant but **not the list marker**. Its lines have no `- `, while `#key-characteristics` is a `- **Label**: value` list. So a classifier keyed on list-item label bullets still passes all three F units. The only in-doc unit that holds the marker too is `#stemma-system-integration`. It is stale, and its `**Cross-Platform**` bullet is a borderline obligation, so it is not a clean 0-item substitute. The unit named by tasks.md is still the right one for the error it targets, so I kept it (Q1).
- **Issue file written outside charter scope**, on the orchestrator's instruction (see the header).
