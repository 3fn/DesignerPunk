# Task 22.1 Completion — the personal note: template, personalization, create-if-absent, all-`TODO`-as-absent

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · PRIMARY, Task 22
**Branch**: `task/123-u3-onboarding` · **Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-22-instruments.md` (committed alone, `c434d8466`); rows 2.1, 2.7, 5.5, 5.6, 17.1 resolved in-row this turn, and five `## Found later` entries appended.
**Delegated-tier**: plan held (subtask; no parent line owed).

## What changed

- **`src/cli/shared/personalNote.ts`** (new): `isNoteUnfilled` (the marked-block rule: remove `<!-- dp:template -->` … `<!-- /dp:template -->` as whole trimmed lines, first pair wins, after CRLF normalization; then every other HTML comment, every Markdown heading line and every bare `TODO` token; unfilled iff only whitespace remains), `ensurePersonalNote` (create when absent, never overwrite, the posture gate, `create: false` for a dry run), and `printPersonalNoteRows` (who prints what; never both a creation row and the warning).
- **`src/cli/templates/personal-note.template.md`** (new): the 22.0 template, placed **byte-equal** to `design-inputs/personal-note.template.md` (`git hash-object a1bfc86dd1a90216c320577a52015ede31ff7eac`, the hash the 22.0 record names). No `files[]` line: it ships through `src/cli/templates/` (FK-1 (b)).
- **Wiring**: `init` (Step 12, silent: its next steps carry the naming row), `generate` (after the banner), `attach` (not `--reference`; before the sequenced restart row, which stays last), and `sync` (`personalNoteStep`: the "created" row alone for a non-migrating run; the naming row for `--migrate-legacy`, printed before the restart row; `--dry-run` creates nothing).
- **`src/cli/shared/errorCatalog.ts`**: `personalNoteCreatedMessage`, `personalNoteUnfilledMessage`, `personalNoteUnignoredMessage` (each string-equal to its design row, read from design.md at run time) and `generateThemesLine` (Leonardo's FINAL wording, `catalog-wording.md` § 1).
- **`generate`'s `Themes:` line** now carries the honest suffix, one comma-joined line, one suffix (R3).
- **The three 16.6 flips** in `tests/consumer-integration.test.ts` (by title): the note is present after `init` with the template's content; the CC case's every import resolves; the Kiro case's named-but-absent exception is gone. One test added (zero `personal-note.example` in every emitted file) and one pending item (below). The L364 comment now names the FK-1 (b) path.

## Leonardo's catalog wording applied (from `design-inputs/catalog-wording.md`)

| § | String | Applied |
|---|---|---|
| 1 | `generate` `Themes:` suffix (22.1's scope) | **yes**, `generateThemesLine` |
| 2 | `.gitignore` block, config unreadable (my 20.2 string) | **yes**: the redundant sentence "Nothing was written to .gitignore" is cut |
| 3 | `.gitignore` block, added (my 20.2 string) | **yes**: paths reordered `.designerpunk/` then `token-index/` |
| 4, 5 | starter spec collision and written (my 21.3 strings) | accepted verbatim; **no change** |
| 6 | markers missing, split by file | **yes**: `managedRegionMarkersMissingMessage('.gitignore')` carries the new remedy; every other file keeps the design row's text. The design erratum itself is Thurgood's, in the 22.2 window |

## Targeted tests and result

- New: `personalNote.test.ts` (49), `generate.personalNote.test.ts` (9), `sync.personalNote.test.ts` (8). Extended: `attach.test.ts` (+5), `init.test.ts` (+3), `sync.cohort.test.ts` (+1 and one amended), `gitignoreRegion.test.ts` (updated strings, +3 for markers-missing).
- `npx jest src/cli`: **40 suites, 568 tests passed**. `npm run test:scripts`: **18 suites, 397 passed**. `npm test`: **394 suites, 9511 passed**. `npx tsc --noEmit`: clean.
- **Bites** (made, run red, restored): `generate` without the posture gate → the package-mode case red; the rule forced to "filled" and to "unfilled" are asserted directly (the template-as-created and one-slot-filled cases are each decided by the real function).
- **No install-doc assertion moved.** I changed no string `install-doc.test.ts` imports (`personalNoteNamingMessage` is unchanged; it moves at 22.2).
- **Not run**: `test:consumer` (runs after 20.3 this turn), `test:pack-contents`, the MCP sub-suites.

## Application-time adaptations

- **The example is not placed, and the template points at it.** The placed template says "see `node_modules/@3fn/core/src/cli/templates/personal-note.example.md`". That file does not exist until Peter approves the edited example (instruments rows 2.2/2.3) and a subtask places it. **Known forward reference**: the template is byte-equal and **not edited to hide it**. The existence assertions are explicit pending items, not skips: `personalNote.test.ts` (`test.failing`, with a named-list guard) and `tests/consumer-integration.test.ts` (`it.failing`); both fail once the example is placed, which is the cue to flip them. Logged under `## Found later` in the Task 22 block.
- **`sync` prints the "created" row alone** (`'created-only'`), without PR-13's unignored-directory row, which the plan names for `generate` and `attach`: `sync`'s answer to an unignored `.designerpunk/` is the `.gitignore` block's offer (PR-9), and printing both would ask twice.
- **`sync --dry-run` creates nothing** but still reports an unfilled note.
- **`sync.cohort.test.ts`** "attach unavailable … removes nothing" is amended: a born-posture `sync` now creates the note, so the test asserts the note was created, removes it, then compares the directory hash (`## Found later`, the `misfit` entry).
- **A new `sync.personalNote.test.ts`** carries the non-migrating `sync` cases instead of `sync.test.ts`/`sync.migration.test.ts`; the `--migrate-legacy` naming-row case sits in `sync.cohort.test.ts`, which owns the cohort fixture that run needs.
- **The note is written at the design system's root** (`findDesignSystemRoot`), so `generate` from a subdirectory writes it there, not under the cwd.
- **Unresolved mechanism gap, not fixed silently** (Leonardo's `catalog-wording.md` § 6): a person who deleted the `.gitignore` block on purpose sees the "markers missing" row on every `sync`. A remedy exists today (list `.gitignore` in `.designerpunkignore`) and the row does not say it. Options for Peter: drop the manifest entry after one report, or name the `.designerpunkignore` remedy in the row (wording Leonardo's). Logged under `## Found later`.

## Claims, and what each rests on

`VERIFIED-CODE`: at the cited line on this branch. `DESIGN-ONLY`: rests on design text, not yet true in code.

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The detection rule: unfilled iff only whitespace remains after the marked block, other comments, heading lines and bare `TODO` tokens are removed | `src/cli/shared/personalNote.ts:43-66`; `personalNote.test.ts` (16 cases + marker-matching + bite) | VERIFIED-CODE |
| 2 | An existing file is never overwritten, including an empty or unfilled one | `personalNote.ts:85-97`; `personalNote.test.ts` ("NEVER overwritten", three contents) | VERIFIED-CODE |
| 3 | Created only in a born repo: package mode, partial and unborn → nothing created or read | `personalNote.ts:86`; `personalNote.test.ts` (posture gate, three states); `generate.personalNote.test.ts` (package mode) | VERIFIED-CODE |
| 4 | `generate` creates an absent note, prints the creation row, then (git exits 1) the unignored row; an unfilled note → the warning only; never both | `src/cli/designerpunk.ts:252-263`; `printPersonalNoteRows` (`personalNote.ts:114-135`); `generate.personalNote.test.ts` | VERIFIED-CODE |
| 5 | On git exit 128 or no `git`, no unignored row | `gitignoreRegion.ts` `designerpunkDirIgnoreState`; `personalNote.test.ts` ("exits 128"); `generate.personalNote.test.ts` | VERIFIED-CODE |
| 6 | `init` creates the note and prints the naming row (in its next steps), no creation row | `src/cli/init.ts:371-379`; `init.test.ts` | VERIFIED-CODE |
| 7 | `attach` (not `--reference`) creates it; its rows come before the sequenced restart row, which stays last | `src/cli/attach.ts:470-480`; `attach.test.ts` | VERIFIED-CODE |
| 8 | Non-migrating `sync` creates it and prints the "created" row alone; `--migrate-legacy` prints the naming row before the restart row; `--dry-run` writes nothing | `src/cli/sync/index.ts:300-325` (`personalNoteStep`), the migrate branch call; `sync.personalNote.test.ts`; `sync.cohort.test.ts` | VERIFIED-CODE |
| 9 | The placed template is byte-equal to the 22.0 design input and to its recorded hash | `src/cli/templates/personal-note.template.md`; `personalNote.test.ts` (equality; `git hash-object`) | VERIFIED-CODE |
| 10 | The three catalog strings equal their design rows; `Themes:` equals Leonardo's final wording | `errorCatalog.ts:399-440`; `personalNote.test.ts` (read from design.md and `catalog-wording.md` at run time) | VERIFIED-CODE |
| 11 | `generate`'s `Themes:` line carries one suffix, string-equal to the catalog function | `designerpunk.ts:245`; `generate.personalNote.test.ts` | VERIFIED-CODE |
| 12 | The packed install has the note after `init`, with the template's content; every Claude Code import and Kiro resource resolves | `tests/consumer-integration.test.ts` (the three flips) | **DESIGN-ONLY until `test:consumer` runs** (edited and type-checked, not yet run; runs after 20.3) |
| 13 | The example the template points at exists | `src/cli/templates/personal-note.example.md` | **DESIGN-ONLY**: not placed; pending items hold the assertion (instruments rows 2.2/2.3) |
| 14 | CC's `@`-import of the note loads on a fresh clone | nothing yet | **DESIGN-ONLY**: unmeasured until U5 (C8(c)) |

## What the install guide, INSTALL.md, README and COMMIT-POLICY now say (no edits made)

- **Now VERIFIED-CODE**: guide L219 and L230 "(`generate` creates it)"; INSTALL.md L205 and L216 (the same sentence); the guide's § 3 step 4, L81, names the note's path correctly. `COMMIT-POLICY.md`'s claim that `generate` creates the note when absent (my 20.1 claims row 21) is now VERIFIED-CODE.
- **Now FALSE against what I built**: **guide L393** (the `generate` banner sample in § Reference › "Generating tokens — options") shows the bare line `Themes: dark (dark), wcag (light)`, and `generate` now prints that line with the suffix `— registered, not applied yet: …`. **L395**'s sentence ("lists what your config registers, not what was applied") is still true but now duplicates the suffix. INSTALL.md carries only the region, so the sample is not there; no other doc quotes the line.
- **Still DESIGN-ONLY / unchanged**: `init` in a born repo still prints the old `(generate creates it)` string (`initBornRepoMessage`, 22.2); the naming row is still the old two-slot text (22.2).

## Notes

- **Unverified by me**: the packed-install flips (`test:consumer` not yet run); a real terminal run of `generate` in a fresh clone (the cases run in-process under jest with the pipeline mocked, and `init`/`sync` under their usual harnesses).
- **Counter-argument and residual**: creating the note from every command makes `.designerpunk/` appear in repos where the person never asked for it, and `generate` runs on every token change. The unfilled warning therefore recurs until she fills the note or replaces it with a line of her own ("Rather not keep one?"); that is the cost of "an absent note cannot outlast any command". The fork is Leonardo's and Peter's (a quieter second warning), not mine.
