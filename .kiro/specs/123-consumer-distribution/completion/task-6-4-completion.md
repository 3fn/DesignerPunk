# Task 6.4 Completion — Tests and bites

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 6 · **Agent**: Ada (Opus)

## What changed

Three new suites, under the design's test ids (design.md § "Testing Strategy"):

| Test id | Location | Lane | Tests |
|---|---|---|---|
| `build-name-contract.test.ts` | `scripts/__tests__/` | `npm run test:scripts` | 19 |
| `sync.type-contract.test.ts` | `scripts/__tests__/` | `npm run test:scripts` | 8 |
| `sync.name-contract.test.ts` | `src/cli/__tests__/` | `npm test` (functional) | 12 |

Every bite for Task 6 is recorded in its subtask doc, with its red line and a `cmp`-confirmed restore:
- **6.1** (`task-6-1-completion.md` § "Bites"):
  - the own-index bite (`--border-border-default` → EXIT=1, routed to Lina);
  - bundle ⊆ src on the real bundle;
  - an unrecorded seventh site in real component source;
  - the patterns reverted to bare forms;
  - the ⊆ check disabled;
  - the own-index check disabled.
- **6.2** (`task-6-2-completion.md` § "Bites"): the three tier-filter mutations, no-output read as an empty set, and two string drifts.
- **6.3** (`task-6-3-completion.md` § "Bites"): the hash computed over members only, the hash over enums only, and `init` not passing the hash.

## Targeted tests + result

- `npx jest --config scripts/jest.config.js` → **11 suites, 206 tests passed**. Before Task 6 it was 9 suites and 179 tests; the difference is +2 suites and +27 tests.
- `npx jest src/cli/__tests__/sync src/cli/__tests__/Manifest.test.ts src/cli/__tests__/FileScanner.test.ts src/components/core/Container-Base/__tests__/ContainerBase.token-resolution.test.ts` → **9 suites, 110 tests passed**.
- `npm test` → **382 suites, 9241 tests passed**. Before Task 6 it was 381 suites and 9229 tests; the difference is +1 suite and +12 tests.

## Application-time adaptations

1. **Two of the three suites run in the `test:scripts` lane, which no CI workflow runs** (pre-existing; see `task-6-3-completion.md` adaptation 1). What CI does enforce is the build itself: `lane-timing` runs `npm run build`, which now runs `build:name-contract`, and every failure mode exits 1.
   - **For Thurgood (test governance)**: the `scripts/__tests__` lane has no CI home. `tool-manifest.test.ts` (Task 4) is in the same position.
2. **The real-surface cases need a built `dist`** (the bundle, the token CSS and the emitted `.d.ts`), as `pack-assert.ts` does. On a fresh tree they fail loudly with the `name-contract: <file> not found — build order is …` message. They never skip silently.
