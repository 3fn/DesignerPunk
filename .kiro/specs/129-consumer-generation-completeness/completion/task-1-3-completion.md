# Task 1.3 Completion: `pack-assert`'s native resource rule and its red case

**Date**: 2026-11-06
**Task**: 1.3 `pack-assert`'s native resource rule and its red case (Spec 129, Task 1, Unit 1)
**Agent**: Ada (Sonnet) · **Type**: Implementation · **Status**: Rule and red case complete; the "passes at this unit's head" half is **pending Lina's PR** (below)

## What changed

- `scripts/pack-assert.ts`: new section 11, `nativeResourceFindings(paths)`, called at the end of `assertPackListing`. Every packed path under `…/platforms/android/res/` must be `res/<type>[-<qualifiers>]/<name>.<ext>`: exactly one folder under `res/`, a type in `ANDROID_RES_TYPES` (anim, animator, color, drawable, font, interpolator, layout, menu, mipmap, navigation, raw, transition, values, xml) with optional `-qualifier` parts, a name of `[a-z0-9_]` (`.9` allowed before `.png`), and an extension that type allows (`raw` takes any). One red per offending file, a non-vacuity finding (some file was inspected), and a summary finding. Labels start `native resources:`, not `publish path:`, so `PUBLISH_PATH_FLOOR` and `release-publish.ts`'s count are unchanged.
- `scripts/__tests__/pack-assert.test.ts`: 11 new cases in `nativeResourceFindings …`, including the red case: a `README.md` under `res/drawable/` fails once (the file's finding and the summary).

## Targeted tests run

- `npm run test:scripts -- scripts/__tests__/pack-assert` → 77 passed (11 new).
- `npm run test:scripts` (whole sub-suite, including `release-publish.test.ts`, which imports `pack-assert`) → 25 suites, 813 tests passed.
- `npx tsc -p tsconfig.scripts.json` → no errors.
- **The red case, exact strings** (from the test and from the real tree, both):
  - `FAIL: native resources: src/components/core/Icon-Base/platforms/android/res/drawable/README.md is a valid Android resource file — file name `README` must use only lowercase letters, digits and underscores`
  - `FAIL: native resources: every packed file under platforms/android/res/ is res/<type>[-<qualifiers>]/<name>.<ext> with an allowed extension — 51 checked, 1 not`
- **At this branch's head, the real tree, `npx tsx scripts/pack-assert.ts` (dry-run listing, 108 findings): `103/108 assertions passed`, 5 FAIL.** Two are the section-11 lines above: **pending Lina's PR**, which moves the README (the file is still at `src/components/core/Icon-Base/platforms/android/res/drawable/README.md` on this branch). Three are `publish path: dist/mcp/{application,docs,product}-mcp.js resolves every module from the root node_modules/` — an artifact of this worktree, whose `node_modules` is a symlink to the main checkout (`nested roots [../../../]`), not of the rule; the script's own message says it never shows in a fresh clone.
- **Simulation of the listing once the README is gone** (the real packed path list from `npm pack --dry-run --json`, with that one path removed, through `nativeResourceFindings`): `PASS 50 packed | PASS 50 checked, 0 not`. With it: `PASS 51 packed | FAIL … | FAIL 51 checked, 1 not`. That is a simulation, not the criterion's evidence.

## Application-time adaptations

1. **Criterion 5's second half ("passes at this unit's head") is not met on this branch.** It is `pending Lina's PR` (`fix/129-u1-preconditions-lina`, instruments row 16). When `main` carries it and is merged into the unit branch, the evidence is `npm run test:pack-contents` (or `npx tsx scripts/pack-assert.ts --tarball <tgz>` on a fresh clone's pack) showing no `native resources:` FAIL, to be re-run then.
2. **Lina's PR also edits `scripts/pack-assert.ts`** (my Primary Artifact): section 8's `androidRes.length === 51` → `=== 50`, on a line this subtask does not touch, so the two merge without conflict (separate hunks). I left that line alone for that reason; the 51 count is red for the same pending cause.
3. **Dotfiles are red too.** A `.gitkeep` under a `res/` folder fails the rule (no `<name>.<ext>`), as the criterion's shape reads; Android's merger would ignore it. None exists today (`.gitkeep`s sit at `platforms/android/`, outside `res/`).
4. The extension table (`ANDROID_RES_TYPES`) is my reading of what Android's resource merger takes from each folder; it is not in the criterion ("an Android resource type and an allowed extension"). A legitimate resource it wrongly rejects is a one-line table edit, and the test pinning the type list would then need the same edit.
