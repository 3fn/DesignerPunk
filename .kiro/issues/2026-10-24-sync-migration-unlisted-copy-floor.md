# `sync`'s component-copy migration can still call a pre-13.0.0 copy "modified" when the registry lists nothing that old: which floor should it use? (a fork for Peter)

**Date**: 2026-10-24
**Owner**: Lina
**Consulted**: Ada. The code is `src/cli/sync/Migration.ts`, in her standing scope (ballot `2026-10-17-standing-write-scope-six-roots` § 2.1); option B below is her proposal, from her review of the R2/R4/R6 fix PR.
**Class**: P2 obligation (guard) · defect *(set 2026-10-24, Lina, rule 12. The verdict is weaker than what the report then says. A copy that only looks edited because its version cannot be reached gets the "modified copies now override the package's …" line, and `--migrate-components` relocates it as a fork. That is a false line in CLI output, which is not one of M7's P0 surfaces, and the relocation deletes nothing. The consumer-facing strings no longer promise more than this: see Source.)*
**Trigger**: `release:next:phase-1` — Peter's pick between the options below, and the fixing PR that applies it, before the next release's RELEASE phase 1. At that walk this record is fixed, or carried with the fork still open for Peter (rule 1: a P2 that rides another change takes this token).
**Source**:
- Ada's review of the R2/R4/R6 fix (commit `536acc204`), item (2), recorded under § Grant in `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`; the coordinator's relay of it, 2026-10-24.
- design.md § C7 L384, Spec 123: the legacy manifest's `version` is the last sync, not the copy version, and a skipped source update leaves older copies.
- test01 upgrade rehearsal (Spec 131 evidence `.kiro/specs/131-governance-simplification/evidence/2026-10-24-test01-upgrade-rehearsal.md`, F-3 and F-5): the copy migration's verdicts decide what is removed and what is relocated, and a relocated fork can break imports.
- Pinned in code by the test "the guard's RESIDUAL, pinned so it stays visible" (`src/cli/__tests__/sync.migration.test.ts`).

---

## The problem

A pre-123 consumer's component copies are judged against every version the registry lists, up to the installed one. The public npm registry lists 13.0.0 and later only; versions before 13.0.0 exist only on GitHub Packages, which needs a working token. A copy made from 12.x that matches nothing listed is not edited. Its version just cannot be reached.

The R2/R4/R6 fix added a guard (`MigrationAssessment.unlistedBefore`). When the registry lists nothing as old as a **floor**, an unmatched copy is `cannot-tell` (left in place, with the "decide by hand" remedy), not `modified`. The floor is the legacy manifest's last sync, else the installed bound. **That floor is a heuristic, not a proven lower bound** (design C7). So the guard misses:
- a repo last synced at 13.0.0 or later that still holds copies made before 13.0.0 (legacy sync never managed `src/components/core`, so those copies were never updated);
- any repo with no legacy manifest, where the floor is the installed bound.

In both cases the copy reads as `modified`, the report calls it the consumer's fork, and `--migrate-components` moves it to `src/components/<Name>/`.

The guard only ever turns `modified` into `cannot-tell`, never into `unmodified`, so it cannot cause a deletion. The strings now say what is covered and what is not (`registryPinRefusedTokenMessage`; the CHANGELOG `[Unreleased]` `### Fixed` entry): renewing the token is the safe route for pre-13 copies.

## The options (Peter picks)

**A. Keep the heuristic floor (today's code).**
- Risk: the misses above. A false "you edited this" line, and a relocation that can break imports (F-5).
- Opportunity: a real 13.x+ fork judged on the public registry is still called a fork, which is precise and needs no hand decision.

**B. A sound constant floor: the first version that ever shipped `src/components/core` copies** (Ada's proposal). The exact version is to be confirmed from release history; the migration fixture's oldest is 11.2.1.
- Risk: on the public registry, every copy that matches nothing becomes `cannot-tell`, real 13.x+ forks included. Each is left in `src/components/core/` for the consumer to decide by hand (test01 would have had 10). Precision is traded for safety.
- Opportunity: the migration never calls an unreachable copy edited. With a working GitHub Packages token the full list is visible, the floor is met, and precision returns.

**C. A narrower floor from evidence in the repo**, for example the oldest `@3fn/core` version in the git history of `package-lock.json`.
- Risk: more code and more ways to be wrong (no git history, a squashed history, no lockfile), and it falls back to A or B when the evidence is missing.
- Opportunity: precise and safe where the evidence exists.

**Class option**: B, stated as a rule. The migration says `modified` only when every version from the earliest one that could have made the copy up to the installed one was retrieved. Otherwise it says `cannot-tell`. Cost: as B. It ends this class of false verdict for every registry, not just the public one.

**My reading** (one line, not a pick): B, because a false "you edited this", followed by a relocation, is the worse error, and `cannot-tell` already carries an actionable remedy. What survives against it: consumers without GitHub Packages access lose every automatic fork verdict, and that may be most migrating consumers.

## How to stop it recurring

Whichever option is picked, the test that pins the residual today flips to pin the new rule. If A is kept, the residual stays pinned as a known limit, and the strings keep saying so.

## Lapse (2026-10-29)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S). No ancestor of S closed or re-ruled this record: it is in Stacy's recount, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S", and no heading named this SHA. Appended by the walker at release 16.2.0's walk (`.kiro/issues/2026-10-29-release-16.2.0-walk.md`; rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else; the owner's disposition stands. Signed Thurgood (steward, rule 11), 2026-10-29.
