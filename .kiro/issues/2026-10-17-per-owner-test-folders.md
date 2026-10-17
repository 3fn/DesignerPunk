# Issue: per-owner test folders — make the tests-follow-the-file rule a glob every target enforces

**Date**: 2026-10-17
**Status**: ACTIVE
**Owner**: Thurgood (steward; the generator's checker tests), with **Lina co-owner** (the shared core; she owns the rendering tests) and **Ada** for `scripts/__tests__/` (her scripts' tests and fixtures).
**Trigger**: **the merge of the application PR of ballot `2026-10-17-standing-write-scope-six-roots`** (branch `chore/write-scope-six-roots`).
**Source**: Peter's ruling on Fork A (2026-10-17, relayed by the orchestrator): the class option — per-owner test subfolders, one glob per seat plus a shared-core folder — with sequencing (b): the application PR ships the prose rule and a named interim; the move is this issue. Recorded in the ballot's `## Errata` (e).

## The interim this issue ends

The ballot assigns tests and fixtures by rule (§ 2.2: a test follows the file it exercises; § 4 B as amended: the stem rule). A rule renders only as prose. Claude Code's write scope is behavioral, so the prose applies there; **Kiro's `allowedPaths` is mechanical and lists globs only, so a Kiro seat is blocked from every test file no glob names** (e.g. Lina from `render.test.ts`; Ada from her `scripts/__tests__/*.test.ts`). The three charters' In Scope bullets name this interim and cite this file.

## Scope (the fixing PR)

1. **Move, by `git mv`**:
   - `tools/agent-generator/__tests__/<seat>/**` (thurgood, lina) and `tools/agent-generator/__tests__/shared/**` (shared core: Lina primary, Thurgood consulted), assigned by the stem rule and the ballot's by-file exceptions; `__tests__/fixtures/**` moves with the test that reads it;
   - `scripts/__tests__/<seat>/**` (ada, thurgood, lina) with `scripts/__fixtures__/` and `scripts/__bites__/` placed under the owning seat (`__bites__/**` stays Ada's).
2. **Fix imports** (`../<module>` → `../../<module>`) and the jest roots/`testMatch` in `tools/agent-generator/jest.config.js` and `scripts/jest.config.js`; every moved suite passes with the same test count before and after (the count is pasted in the PR body).
3. **Charters**: one glob per seat per root in `canonical/agents/{thurgood,ada,lina}.md` `writeScope`, plus the shared folder in Lina's; the prose interim sentence is removed from the three In Scope bullets. Peter-merged under the `canonical/**` carve-out, every affected seat consulted.
4. **The follow-on re-sign round**: the new `writeScope[...]` dispositions rows (C1 first signatures) and the three `#in-scope` re-hashes (re-confirm + re-sign).
5. **Named cost (the author's surviving counter at the cross-read)**: the move rewrites every checker test in one diff, so **that PR's own ARMING read is large** — it touches the § 4 B checkers' tests, which ballot § 3 item 4 (as widened by erratum) puts in Stacy's instrument-path population. The PR body pastes `git diff --numstat` showing the moves as renames with 0 deletions under any fixture path, and the before/after test counts.

## Closing

Closes when the fixing PR merges: record the outcome here (dated) and `git mv` this file to `archive/` in that PR (README rule 5).
