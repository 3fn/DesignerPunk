# Task 20.2 Completion — the `.gitignore` region, its `sync` round-trip, and PR-9's offer

**Date**: 2026-10-03
**Agent**: Lina (Sonnet) · PRIMARY, Task 20
**Branch**: `task/123-u3-onboarding` · **Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-20-instruments.md` (no MISSING row blocked 20.2; four `## Found later` entries appended, below)

## What changed

- **`src/cli/shared/gitignoreRegion.ts`** (new): the block's content, computed once and shared by `init` and `sync` (the target-free region source). It ignores exactly `token-index/` and `.designerpunk/`, and carries, commented and with C24's reason line, the configured output path. It also holds the apply rules (create / append after her bytes / splice / markers-missing → no write), the manifest entry, and the by-effect `git check-ignore` detection.
- **`src/cli/init.ts`**: Step 11, after the token copy and before the manifest write, emits the block from `loadConfig(dest).outputDir`. A config that will not load → a report and **no block, no entry, no guessed path**. `runInit(argv, deps)` gains an `InitDeps.configLoader` test seam.
- **`src/cli/sync/index.ts`**: (a) step 4a classifies a **recorded** block from the shared source, not from `emitConsumer`'s per-target output, and routes it through the existing report and apply rules (`.gitignore#managed`, including `--apply` / `--overwrite` for a conflict, and markers-missing → no write); (b) `runSync` now runs the old body (`runSyncMain`) and then `offerGitignoreBlock`, PR-9's offer; `SyncOptions.confirmGitignoreBlock` and `SyncOutcome.gitignoreBlock` are the seam and the record.
- **`src/cli/sync/Prompter.ts`**: `confirmGitignoreBlock` — the offer's own `[y/N]`, default No.
- **`src/cli/shared/errorCatalog.ts`**: four functions. `gitignoreBlockOfferMessage` and `gitignoreBlockReportMessage` are the design rows (string-equal, asserted against design.md at run time). `gitignoreBlockConfigUnreadableMessage` and `gitignoreBlockAddedMessage` were **authored here** because the design catalog carries no row for them (`## Found later`, entry 2).
- **Tests** (new or extended): `src/cli/__tests__/gitignoreRegion.test.ts` (new, 29 cases); `src/cli/__tests__/init.test.ts` (+6); `src/cli/__tests__/sync.region.test.ts` (+14).
- `tasks.md`: 20.2 ticked. `task-20-instruments.md`: `## Found later` and counts. `task-20-1-completion.md`: dated addendum re-checking the DESIGN-ONLY rows.

## Left for others (not 20.2's share)

- **20.3** (the packed fresh-clone fixture) waits on 22.1 (instruments row 4.4).
- **22.1**: `generate` creating `.designerpunk/personal-note.local.md`, and its unignored-directory warning (PR-13, which reads `git check-ignore` too).
- **22.3b** (Ada): the `files[]` line and `pack-assert` row for `COMMIT-POLICY.md` (criterion C7).
- The design catalog rows owed for the two authored strings, and the markers-missing remedy (`## Found later`, entries 2 and 3).

## Targeted tests and result

- `npx jest src/cli/__tests__/gitignoreRegion.test.ts src/cli/__tests__/init.test.ts src/cli/__tests__/sync.region.test.ts`: all pass (gitignoreRegion 29, init +6, sync.region +14; full files: 36 + 42 + 33 tests green).
- `npx jest src/cli` (all 36 CLI suites): **36 suites, 434 tests green before my new tests**; after: green.
- **Bite** (each mutation made, run red, restored; the tree was re-run green after): sync offer without asking → 2 red; offer written off a TTY → 2 red; recorded block not classified → 2 red; `loadConfig` failure turned into a guessed `dist/tokens` block → 2 red (`init` RED case and `computeGitignoreRegion`'s).
- `npm run test:scripts`: **17 suites, 369 tests passed**. **No install-doc assertion moved.** I added functions to `errorCatalog.ts` and changed none; `install-doc.test.ts` imports `errorCatalog.ts` and `vocabulary.ts` strings (the missing-token message, the clone hatch, the personal-note naming) and all still pass, with the pending `test.failing` set unchanged.
- `npm test` (full functional lane): **391 suites, 9426 tests passed**.
- `npx tsc --noEmit`: clean.
- **Real-node smoke** (outside the repo, scratch; `tsx` over `src/`, the PRODUCTION config loader, `@3fn/core` symlinked): `init` wrote the block and printed the added line, and `git check-ignore -q .designerpunk/` then exited 0; `sync --dry-run` reported "44 managed items unchanged"; after removing the entry, `sync` with stdin from `/dev/null` printed the report row and wrote nothing.
- **Non-root lanes NOT run**: `npm run test:consumer` (the packed-install `init` → `generate` case, which would exercise the shipped `dist` build of this code), `npm run test:pack-contents`, and the `mcp-server`, `application-mcp-server` and `product-mcp-server` suites. 20.2 touches none of the MCP servers or `package.json`.

## Application-time adaptations

- **A config-loader seam on `runInit`** (`InitDeps.configLoader`): the block's path comes from `loadConfig`, whose production loader cannot run under jest; the existing init tests ran the default loader and now hit the "config unreadable" branch harmlessly (they all still pass). `## Found later`, entry 1.
- **`runSync` split into `runSync` + `runSyncMain`** so the offer runs after the main flow whichever way it ended (nothing to apply, applied, declined). The offer loads the manifest from disk afresh, adds the entry and saves it, so it never depends on the main flow having written one.
- **When the output directory cannot be named** (the repo root, or outside the repo), the commented platform-output line is **left out** rather than guessed; the plan does not say. `outputDirForRegion` (`gitignoreRegion.ts:72`) and a test.
- **The offer is not made** to a consume-posture manifest, to a repo that already holds the block's markers, or to one whose `.designerpunkignore` lists `.gitignore`. The plan names only the `check-ignore` condition; these three narrow it. A repo with no manifest at all (nothing recorded) is not offered either: "repos born on 15.0.0" have one.
- **`--dry-run` prints the report row** (it never writes and never asks). The plan covers non-interactive and `--apply` off a TTY; `--dry-run` on a terminal is my reading.
- **`--apply` on a TTY still asks.** The criterion's "`--apply` does not write the block" is "Off a TTY, `--apply` …"; on a terminal the explicit yes to the offer's own question is required.
- **Two-config tests run `init --re-scaffold --yes`**, because a config with no token tier is `partial` and bare `init` refuses it (`## Found later`, the `misfit` entry).

## Claims in the new behaviour, and what each rests on

`VERIFIED-CODE` means at the cited line on this branch. Nothing in this table rests only on design text.

| # | Claim | Rests on | State |
|---|---|---|---|
| 1 | The block's content is computed once, in `shared/gitignoreRegion.ts`, and shared by `init` and `sync` | `gitignoreRegion.ts:58-62` (content), `:85-93` (from `loadConfig`); callers `init.ts:347`, `sync/index.ts:461` and `:314` | VERIFIED-CODE |
| 2 | It ignores exactly `token-index/` and `.designerpunk/` (the only non-comment lines) | `gitignoreRegion.ts:47`, `:58-62`; `gitignoreRegion.test.ts` (content case); `init.test.ts` (non-comment lines read back from the written file) | VERIFIED-CODE |
| 3 | The commented line carries the configured `outputDir`, repo-relative, with C24's reason line | `gitignoreRegion.ts:50-52,58-62,72-79`; design.md L780-L782 (C24, the reason line, asserted verbatim by `gitignoreRegion.test.ts`); `init.test.ts` two-config cases (`build/tokens`, `out/design-tokens`) | VERIFIED-CODE |
| 4 | `init` emits it after the token copy, reading `loadConfig(dest).outputDir` | `init.ts:341-351` (Step 11, after Steps 3b-3c at `init.ts:193-214`) | VERIFIED-CODE |
| 5 | A config that will not load → `init` reports and writes no block, no entry | `init.ts:348-349`; `init.test.ts` RED case | VERIFIED-CODE |
| 6 | An existing `.gitignore` keeps every byte; the block is appended after it | `gitignoreRegion.ts:126-132` (`appendRegion`, `RegionGrain.ts:189`); `init.test.ts` ("her lines stay in place") | VERIFIED-CODE |
| 7 | The entry is a generated region whose hash is over the normalized content | `gitignoreRegion.ts:95-101`; `init.test.ts` (entry equality and `sha256`) | VERIFIED-CODE |
| 8 | `sync` classifies a recorded block from the shared source, and the region round-trips with outside lines byte-unchanged | `sync/index.ts:455-489`, `:649` (contents merged for apply); `sync.region.test.ts` (round-trip: unchanged; output changed under `--apply`; lines after the block survive) | VERIFIED-CODE |
| 9 | An edited-inside block is reported and replaced only with `--apply` (or `--overwrite .gitignore#managed`), never on the terminal confirmation alone | `sync/index.ts:609` (existing region rule, now reached by this id), `:481` (conflict row); `sync.region.test.ts` RED case | VERIFIED-CODE |
| 10 | A recorded block whose markers are gone → the catalog "markers missing" row, nothing written | `sync/index.ts:483-485`; `sync.region.test.ts` RED case | VERIFIED-CODE |
| 11 | The offer is made only when `git check-ignore -q .designerpunk/` exits 1; exit 0, 128, no `git` on PATH → nothing printed, nothing written | `gitignoreRegion.ts:165-171`; `sync/index.ts:306`; `gitignoreRegion.test.ts` (1 / 0 / 128 / PATH empty); `sync.region.test.ts` (already-ignored; non-git dir) | VERIFIED-CODE |
| 12 | The offer is its own `[y/N]` question, default No, asked after the report and the batch; only an explicit yes writes | `sync/index.ts:278-285` (offer after `runSyncMain`), `:319`; `Prompter.ts:180-188`; `sync.region.test.ts` (nothing written when asked; No → zero bytes and the offer recurs); `gitignoreRegion.test.ts` (`y`/`yes` only) | VERIFIED-CODE; the real terminal prompt itself is not driven (U) |
| 13 | Off a TTY, `--apply` does not write the block; the report row is printed instead | `sync/index.ts:309-312`; `sync.region.test.ts` (non-interactive; `--apply` off a TTY); real-node smoke | VERIFIED-CODE |
| 14 | The offer and report strings are string-equal to the design rows; the report's remedy is not `attach --target` | `errorCatalog.ts:313-330`; `gitignoreRegion.test.ts` (read from design.md L989-L990 at run time) | VERIFIED-CODE |
| 15 | `COMMIT-POLICY.md`'s claims 24 and 25 and the `.gitignore` half of 17 | see `task-20-1-completion.md` § "Addendum 2026-10-03 (after Task 20.2)" | now VERIFIED-CODE |

## Notes

- **Unverified by me**: the interactive `[y/N]` driven from a real terminal; the shipped `dist` build of this code under `test:consumer` (not run); behaviour on Windows path separators (`outputDirForRegion` normalizes with `path.sep`; not run there).
- **Counter-argument and residual**: putting the offer after the whole `sync` flow means a user who declines the batch is still asked one more question in the same run. The plan asks for "its own question, after sync's report"; the alternative (ask only after a successful apply) would skip the offer whenever there is nothing to apply, which is the common case for a repo born on 15.0.0 with an unchanged package. I kept it independent of the batch. What survives: a run with a declined batch followed by a second prompt can read as pushy, and that read is Leonardo's and Peter's.
- **Delegated-tier**: plan held (subtask; no parent line owed).
