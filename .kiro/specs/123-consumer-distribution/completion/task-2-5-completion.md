# Task 2.5 Completion — The `tsc` over-rewrite arbiter + its bite; U1 next steps + the restart line

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Ada (Sonnet)

## What changed

### The over-rewrite arbiter

New `src/cli/__tests__/init.overRewriteArbiter.test.ts` — a real, non-mocked `tsc --noEmit` run over an `init`-produced tree:
1. Runs `runInit` into a scratch dir (real filesystem, no mocking).
2. Symlinks `scratchDir/node_modules` to this repo's own `node_modules` (so `@types/jest`/`@types/node` resolve for the scaffolded `tsconfig.test.json`), then adds `scratchDir/node_modules/@3fn/core` → the real package root (so `@3fn/core/*` subpaths resolve through the real `package.json` `exports` map to `dist/**`, exactly as they would for a packed consumer).
3. Spawns the real `tsc` binary (`node_modules/.bin/tsc --noEmit -p tsconfig.test.json`) as a child process inside the scratch dir.
4. Asserts a clean exit (status 0, empty output) AND that all three `themes/*/SemanticOverrides.ts` files still literally contain `from '../types'` (the intra-tree specifier `rewriteByResolution` must never touch — D-B4's finding).

This required fixing a genuine pre-existing defect in the scaffolded `tsconfig.test.json` (`moduleResolution: 'bundler'` + `module: 'commonjs'` is rejected by TypeScript 5.9 — TS5095) — see task-2-3-completion.md's Application-time adaptations for the full reasoning; the fix (`module`/`moduleResolution` both `'node16'`) is what makes this arbiter runnable at all.

### U1 next steps + the restart line (C27 erratum; Req 15.8, 15.9, 19.6)

`printNextSteps()` in `src/cli/init.ts` — the terminal output for a successful `init`:
- Drops `npx jest # Run component tests` (nothing to test yet in a fresh, empty `src/components/`) and the separate `npm install --save-dev jest ...` step is KEPT (jest.config.js still ships, purpose restated per Task 2.3, for testing the consumer's OWN forked/authored components later).
- Adds, in order: the clone hatch (`cloneHatchMessage()`), the personal-note naming (`personalNoteNamingMessage()`), then the **sequenced** restart line (`restartLineSequencedMessage()`) — printed **LAST**, as the final next step (Le-T5: `init` and born-repo `attach` print the *sequenced* row last, because the note and `generate` come before the restart on those paths; only `attach --reference`, not built yet, would print the *now* row instead).
- All three strings are exact catalog transcriptions from `src/cli/shared/errorCatalog.ts` (Task 2.2's additions) — no paraphrasing.

## Targeted tests + result

- `npx jest src/cli/__tests__/init.overRewriteArbiter.test.ts` → **2/2 passed**: the clean-tree pass, and a built-in bite (see below) that reproduces D-B4's exact pre-implementation defect and confirms the arbiter catches it.
- `npx jest src/cli/__tests__/init.test.ts` → the "next steps" describe block (2 tests): the restart line is the LAST non-blank line printed, and no `Run component tests` string appears; the clone hatch → personal-note → restart ordering is asserted directly.

### Bites recorded red

1. **The arbiter's own built-in bite** (a permanent test, not a revert-restore cycle): reproduces D-B4's original defect — a naive string-regex rewrite of EVERY `'../types'` occurrence, including the theme files' intra-tree one — and asserts `tsc` now fails with `TS2305: Module '"@3fn/core/types"' has no exported member 'SemanticOverrideMap'` (DD17 never exported that from the public subpath). This is intentionally a standing part of the suite (not a one-off revert), since it directly demonstrates the arbiter's discriminating power on every run.
2. **Against the REAL production code path** (a genuine revert-run-restore, beyond the built-in bite above): mutated `rewriteByResolution` itself so it force-rewrites `'../types'` regardless of the intra-tree check. Re-ran the "passes" test → **RED**: `tsc` reported the exact same `TS2305` error, this time via the actual `rewriteByResolution` function rather than a hand-simulated string edit — confirming the arbiter would catch a REAL regression in the shipped transform, not just the test's own synthetic reproduction. Restored; `git diff --stat src/cli/shared/transforms.ts` confirmed clean (matches the Task 2.1 commit exactly).
3. **Next-steps ordering** — swapped the restart line to print FIRST instead of last. Re-ran `-t "restart line is the LAST"` → **RED**: `afterRestart` (text following the restart line) had 3 non-blank lines instead of 1 (the clone hatch and personal-note lines now trailed it). Restored.

## Application-time adaptations

1. **The over-rewrite arbiter is a heavier test** (spawns real `tsc` processes, ~300-650ms each) than the rest of the CLI suite — kept in its own file (`init.overRewriteArbiter.test.ts`) rather than folded into `init.test.ts`, so it's easy to identify in isolation if its cost ever needs managing separately. It still runs as part of the normal `npm test` lane (no separate npm script), since design.md frames it as the in-repo unit check Task 2.5 owes directly, not an optional/heavier tier.
2. **`Oklch` exported from the public types barrel** (`src/types/index.ts` → `export type { Oklch } from '../color/OklchConverter';`) — this is one of Task 2's own top-level success criteria ("`Oklch` is exported from the public types barrel"), implemented here because it's a hard precondition for the arbiter to pass at all (the two `color/primitives/{chromatic,neutral}.ts` files' `Oklch` type-only imports rewrite to `@3fn/core/types`, which must actually export it). Verified via `dist/types/index.d.ts` after a full root `tsc` build, and exercised live by the arbiter test itself (its clean pass depends on this export existing).

## Notes for whoever certifies the packed-install path (Task 9)

- This subtask's arbiter is explicitly the IN-REPO unit check (design.md's own scope line: "Scope: type resolution only"). It proves resolution correctness using a live symlink into this repo's own `dist/`, not an actual `npm pack`/install cycle. Task 9's `local-mode generate over the init-copied tree` (Ada D-T-A8) is the packed-install certification that exercises the SAME copied tree through a real tarball install.
