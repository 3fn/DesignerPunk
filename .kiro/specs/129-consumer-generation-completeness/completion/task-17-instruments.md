# Task 17 — Instruments block

**Written**: 2026-11-08T14:27:43Z (`date -u`), before subtask 17.1 · **PRIMARY**: Ada (Sonnet), on U12's unit branch `task/129-closeout`, cut from `3f739b07f` (`origin/main`) with the ruling record `51e17e0e9` joined · **Sha convention**: commit that last touched the path as of `3f739b07f`.
**Criteria**: C1 four native root files no longer ship, `pack-assert` asserts each absent · C2 `dist/ComponentTokens.web.css` and the web CSS exports still ship, asserted present · C3 U6 (`5a6a7f32b`) and U8 (`1686fea35`) are ancestors · C4 CHANGELOG `[Unreleased]` entry · C5 charter item (iii) cites Peter's 7 (a).

| # | Criterion | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1, C2 | `scripts/pack-assert.ts` (`ROOT_TOKEN_FILES`, `PRODUCER_OUTPUTS`) and `scripts/__tests__/pack-assert.test.ts` | exists (`scripts/pack-assert.ts`) | `ROOT_TOKEN_FILES` is today the eight files "every release ships"; a presence assertion for the web CSS and an absence assertion for the four exist only as the eight-file list, so the split is built here | 17.1 |
| 2 | C1, C2 | `npm run test:pack-contents` on a clean tree | exists | packs and asserts the tarball; nested untracked `node_modules` give false reds, removed first | 17.1 |
| 3 | C1 | `package.json` `files[]` | exists | `dist/**/*.{js,d.ts,json,css,swift,kt}` ships the four; a negation is added | 17.1 |
| 4 | C3 | `git merge-base --is-ancestor` | exists | both succeed at the cut: `5a6a7f32b` yes, `1686fea35` yes | parent close |
| 5 | C4, C5 | text edits to `CHANGELOG.md` and the charter record | built here (17.1) | no instrument; read by Thurgood/Stacy at Task 18 and RELEASE | 17.1 |
| 6 | C1 (build side) | `scripts/generate-platform-tokens.ts` and the tests that read the four files: `src/generators/__tests__/RootTokenFreshness.test.ts`, `src/tools/integrity/inventory.ts`, `src/__tests__/integration/BuildSystemCompatibility.test.ts`, `src/generators/__tests__/GenerateDeterminism.test.ts`, `scripts/__fixtures__/discovery-fresh-set.ts` | exists | **outside Task 17's Primary Artifacts**: they pin the four files or `ROOT_TOKEN_FILES`; reported to Peter's orchestrator before any edit | 17.1 |
| 7 | the lock | the 122 diff-guard (`input-closure-changed`) | exists | a `package.json` `files[]` edit may move the closure; restore the lock and report | parent close |
| 8 | C1–C5 CI | the four contexts on the unit branch | exists | dispatched by `complete-task.sh`; not a PR yet | parent close |

**Records whose Trigger names `task-17-completion.md`**: none at the issues root at `3f739b07f` (grep of non-archive `.kiro/issues/*.md`).
**MISSING rows**: none.
