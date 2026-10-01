# Task 16.5 — release-1 cohort fixture capture (pulled forward)

**Spec**: 123-consumer-distribution
**Task**: 16.5 (instrument rows 6.1–6.2 of `task-16-instruments.md`) — a small, pulled-forward piece: the fixture capture ONLY, run before Task 16.3 edits `init.ts`. The 16.5 cohort case itself (sync reports, `--migrate-legacy` + `attach` offer, zero-copy-after-migration assertion) is NOT built here.
**Agent**: lina
**Written**: 2026-10-01, at unit head `3820b32f` (before any Task 16 subtask edits `init.ts`)

## What was captured

A committed fixture at `src/cli/__tests__/fixtures/release-1-cohort/`:

- **`manifest.json`** — the full `designerpunk.manifest.json` release-1 `init` wrote: 176 entries (124 `copy`, 46 `emitted-key`, 6 `generated`). Every `copy` entry sits under `.kiro/agents`, `.kiro/steering`, or `governance`.
- **`file-list.json`** — the relative file paths under those three roots, independently walked from disk (not re-derived from the manifest), one sorted array per root.
- **`README.md`** — capturing commit (`3820b32f`), the exact command, `init.ts`'s sha (`d566b30f`, confirmed unchanged between `d566b30f` and `3820b32f`), what is and isn't captured and why, and the counts table.

## Exact command

In-process `runInit` against a scratch temp dir with a `.git` boundary marker — the same convention `src/cli/__tests__/init.test.ts` uses — **without** that test's default `--skip-agents` (the cohort fixture needs `.kiro/agents` too):

```ts
await runInit(['--name', 'CohortFixture', '--abbreviation', 'CF']);
```

The capture script (`src/cli/__tests__/__capture-cohort__.test.ts`) was temporary: run once via `npm test -- src/cli/__tests__/__capture-cohort__.test.ts`, then deleted. It is not part of the committed suite.

## Counts

| Root | Files |
|---|---|
| `.kiro/agents` | 32 |
| `.kiro/steering` | 9 |
| `governance` | 83 |
| **Total** | **124** |

Matches `manifest.json`'s 124 `copy`-origin entries exactly (cross-checked by the smoke test).

## What was intentionally not captured

File contents of the copied docs. The manifest's `copy` entries already carry each file's hash (what `src/cli/sync/Classifier.ts`'s three-way comparison and `managedCopyRoots` read), and the C6 cohort classification itself reads `origin` alone — neither needs file bytes. See the fixture README's "What's intentionally NOT captured" section for the full reasoning and the re-capture note if a future case needs true byte parity.

## Tests + result

New smoke test: `src/cli/__tests__/cohort.fixture.test.ts` — asserts the fixture loads, every entry under the three roots has `origin: 'copy'`, the file-list count equals the README's documented total (124) and equals the manifest's copy-origin count under those roots, and no copy-origin entries exist outside the three roots (guards the fixture from silently drifting if a future capture touches unrelated roots).

```
npm test -- src/cli/__tests__/cohort.fixture.test.ts   → 6/6 passed
npm test -- src/cli/                                    → 31 suites / 333 tests passed
```

Jest only (`jest.functional.config.js`), no Vitest, no `--run`.

## Application-time adaptations

None. The capture ran exactly as tasks.md's criterion and the instruments row describe: release-1 `init.ts` unedited, before 16.3.

## A finding surfaced during capture (not fixed here — content question, not an instrument gap)

Release-1 `init` copies `.kiro/steering` wholesale, no exclusion list. `personal-note.md` is one of the 9 captured `.kiro/steering` files and carries `origin: 'copy'` like every other steering doc — it propagates into every consumer install today. Recorded in the fixture README under "A finding worth flagging" for 16.3/Task 22 (U3's `personal-note.template.md` / `.designerpunk/personal-note.local.md` work) to pick up; not adjudicated or fixed as part of this capture.
