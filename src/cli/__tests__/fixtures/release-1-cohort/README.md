# Fixture: the release-1 cohort

**Spec 123, Task 16 (criterion C6 / Ada D-T-B2) — instrument rows 6.1–6.2** (see
`.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md`).

This is a committed snapshot of what `npx designerpunk init` wrote **before**
Task 16.3 edits `init.ts` — a "release-1" (U1-era) consumer manifest and file
list. The design's § "C7" names this case: a consumer born by release-1
`init` carries a **current-format** manifest whose `.kiro/agents` /
`.kiro/steering` / `governance` entries all have `origin: 'copy'`. U2's
`sync` must report these as **legacy copies** and offer `--migrate-legacy` +
`attach` — never silently leave them beside generated agents, never classify
them as `conflict`.

## Capturing commit

- **Captured at**: `3820b32f` (Task 16's instruments-block commit — the unit
  head when this fixture was captured, before any Task 16 subtask touched
  `init.ts`).
- **`init.ts` sha**: `d566b30f` (release-1's shape; unchanged between
  `d566b30f` and `3820b32f` — confirmed with
  `git diff d566b30f -- src/cli/init.ts` at capture time, zero output).
- **Package version at capture**: `14.1.0` (`package.json`'s `version` field
  at the capturing commit — this is incidental to the fixture, not a claim
  about which published npm version "release-1" refers to; the fixture
  captures `init.ts`'s COPY BEHAVIOR, not a specific release tag).

## Exact command

Run in-process against a scratch temp directory, chdir'd into, with a `.git`
directory marker so `findDesignSystemRoot`'s walk stops there — the same
convention `src/cli/__tests__/init.test.ts` uses (`runInitIn`'s helper),
except **without** that test file's default `--skip-agents` flag, because
this fixture needs `.kiro/agents` copied too:

```ts
await runInit(['--name', 'CohortFixture', '--abbreviation', 'CF']);
```

No pack, no network, no `--skip-agents`, no `--skip-components`. The capture
script lived at `src/cli/__tests__/__capture-cohort__.test.ts` (temporary —
run once via `npm test -- src/cli/__tests__/__capture-cohort__.test.ts`,
then deleted; it is not part of the committed suite).

## What's captured

- **`manifest.json`** — the complete `designerpunk.manifest.json` release-1
  `init` wrote, byte-for-byte (its stable key order, one entry per line).
  176 entries total: 124 `copy`, 46 `emitted-key`, 6 `generated`. Every
  `copy` entry sits under one of the three cohort roots.
- **`file-list.json`** — the relative file paths under `.kiro/agents`,
  `.kiro/steering`, and `governance` as they existed on disk in the scratch
  repo right after `init` ran, one sorted array per root (independent of the
  manifest — a cross-check, not a re-derivation of it).

### Counts

| Root | Files | Matches manifest `copy` entries under that root |
|---|---|---|
| `.kiro/agents` | 32 | yes |
| `.kiro/steering` | 9 | yes |
| `governance` | 83 | yes |
| **Total** | **124** | matches `manifest.json`'s 124 `copy`-origin entries |

## What's intentionally NOT captured

**File contents of the copied docs.** The manifest's `copy` entries already
carry the per-file `hash` release-1 `init` computed
(`src/cli/init.ts`'s `recordCopiedTree` → `ManifestBuilder.recordFile`), and
that hash is exactly what `src/cli/sync/Classifier.ts`'s three-way comparison
and `src/cli/sync/Manifest.ts`'s `managedCopyRoots` need — `classifyFiles`
keys its `unchanged` / `updated-safe` / `conflict` / `deleted-by-you` split on
`entry.hash` vs. the package's current hash vs. the project's current hash,
and `managedCopyRoots` only checks `entry.origin === 'copy'` plus
`isUnder(key, root)`. Neither reads file bytes. The **cohort classification**
itself (C6: report as legacy, offer `--migrate-legacy` + `attach`, never
silent-beside / never `conflict`) is read off `origin` alone — see
`src/cli/sync/Classifier.ts`'s `managedCopyRoots` and the `origin: 'copy'`
checks throughout. So no file bytes were captured — only the manifest (which
already carries the needed hashes) and the file-list cross-check.

If 16.5's cohort test needs an actual on-disk project tree (e.g. to run
`sync` end-to-end rather than only against the manifest), it can synthesize
placeholder files from `file-list.json` at the same relative paths — their
content doesn't matter to the `origin`-keyed classification this fixture
exists to support. If a future case needs true byte parity (e.g. testing the
`unchanged` vs. `updated-safe` vs. `conflict` split for cohort-era files
specifically), re-capture with file contents included — flag that need
rather than assuming this fixture already covers it.

## A finding worth flagging

Release-1 `init` copies `.kiro/steering` **wholesale**, with no exclusion
list. `personal-note.md` — Peter's personal note to the agent, a Civitas
identity doc — is one of the 9 captured `.kiro/steering` files and carries
`origin: 'copy'` like every other steering doc. It is not filtered out
anywhere in `init.ts`. Whether this is intended (every steering doc ships
and belongs to the consumer) or a gap (a personal note authored by this
project's human lead should never propagate into a consumer install) is a
content question for 16.3/Task 22 — Task 22 (U3) is where
`templates/personal-note.template.md` and `.designerpunk/personal-note.local.md`
degradation are introduced, which suggests this was already being tracked
for correction (C19's degradation). This fixture does not judge it; it only
records that release-1's behavior copies the file as of `d566b30f`.
