# Task 12 — Instruments block

**Written**: 2026-11-07T20:29Z (`date -u`) · **PRIMARY**: Lina (Sonnet), on unit branch `task/129-12-component-theme-reads`, cut from `3610718aa` (`refs/remotes/origin/main`; U6 #730, MIDPOINT pass #733 merged)
**Order, stated plainly**: the draft of 12.1's guard file (`NativeThemeReads.guard.test.ts`) existed in the worktree, uncommitted, when this block was written. Nothing in it depended on a row below being resolved; it is not committed before this block.

**Form**: Start Up Tasks item 8. **Sha convention**: commit that last touched the path as of `3610718aa`.
**Criteria**: Task 12's 13 Success Criteria in `tasks.md` order (as amended by amendment 9 once it merges): C1 two-sided guard · C2 `@category temporary` · C3 iOS row 16 · C4 Android row 16 · C5 iOS no row-15 entry · C6 Android no row-15 entry · C7 iOS no row-2 entry · C8 Android no row-2 entry · C9 `rememberRipple` replaced at three files · C10 text guard on `VerticalListButtonItem.android.kt` · C11 row 14's record, A3, I1–I3, A1, A2, A4 and A6 non-ripple to Spec 132 · C12 four contexts on the PR at head H · C13 root records naming `task-12-completion.md`.

| # | Criterion | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1, C2 | `src/components/__tests__/NativeThemeReads.guard.test.ts` | built here (12.1) | Jest, `lane-functional-root`; declared set from `TokenFileGenerator.generateNativeThemes` on `realThemeContexts()`; imports nothing from `scripts/harness/` (Ada). Not registered as a named instrument, so no Thurgood consult (Req 4.4) | 12.1 |
| 2 | C1 | `src/generators/native/ThemeEmitter.ts`, `src/generators/__tests__/helpers/realThemeContexts.ts` | exists (U6, #730) | the declared set the guard reads | 12.1 |
| 3 | C3–C8, C9 the compile verdicts | `.github/workflows/native-harness.yml`, `scripts/harness/compare.ts`, the two component lists, `harness/pins.yaml` | exists (`native-harness.yml` and the lists last touched @ `5a6a7f32b`) | `gh workflow run native-harness.yml --ref task/129-12-component-theme-reads` runs the branch copy; verdicts from `harness-verdict` annotations | 12.2, 12.3 |
| 4 | C3, C5, C7 iOS compile, locally | `/usr/bin/swiftc`; `harness/ios/lane.ts` | exists (external; local Xcode 27.2 vs pin 26.6, so the lane reports `toolchain`, the diagnostics still print) | a read of the six iOS keys before CI; not the verdict | 12.2 |
| 5 | C4, C6, C8, C9 Android compile | CI only | exists | no `kotlinc` or Gradle here; Kotlin is read from dispatched runs, and Data verifies | 12.2, 12.3 |
| 6 | C5, C6 the removal of each of the eight row-15 keys | the diff of the two lists, and the diff's zero added lines tagged to row 15 or row 2 | built here (12.2), as a pasted `git diff` of the lists | amendment 9 rewords both criteria to "removed in this diff"; a retag counts as ⚠️. It merges before the PR opens | 12.2 |
| 7 | C10 | a text guard on `VerticalListButtonItem.android.kt`, in `lane-functional-root` | built here (12.3) | fails on a `rememberRipple` import (L38 today) | 12.3 |
| 8 | C11 | `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` | exists (@ `3610718aa`) | Lina's record, rule 9; a dated signed line | 12.3 |
| 9 | C13 | records naming `task-12-completion.md`: `2026-09-26-native-component-theme-hardcoding.md` (row 15), `2026-11-04-progress-bar-native-theme-reads-malformed.md` (row 16) | exists | both Lina's; rule 5 outcome lines and archive at the parent close | parent close |
| 10 | the Android twins, § E | `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` § E | exists | take (ii); a dated partial-take line by its owner (Lina) | 12.2 |
| 11 | C12 this PR's four runs | the unit PR | MISSING → Lina at the parent close: the PR does not exist yet, and I stop before opening it. Stops no subtask. → resolved 2026-11-07: exists (`native-harness.yml` run https://github.com/3fn/DesignerPunk/actions/runs/42414978519 at PR head `f257dc09e`, #739; four contexts PASS, summary lines in `task-12-completion.md` § Post-merge notes; the follow-up landed after the merge, the orchestrator's miss) | — | parent close |
| 12 | C12 the amendment-9 wording | `tasks.md` Task 12's two row-15 criteria | MISSING → Thurgood: amendment 9 (`task/129-tasks-amendment-9`) not yet merged. Stops the PR opening only, not 12.1–12.3 → resolved 2026-11-07: exists (`.kiro/specs/129-consumer-generation-completeness/tasks.md` @ `534a5ff43`, #737) — the row-15 and row-2 wording the doc quotes verbatim; the lists and pins at the merge base equal `5a6a7f32b` (`git diff --stat 5a6a7f32b ee9996840 -- harness/expected harness/pins.yaml` is empty) | — | PR open |
| 13 | Kenya's precondition | `ios-readonly-focusable-prototype.md` (trigger `path:…/Input-Text-Base/platforms/ios/**`) | exists (@ `3610718aa`) | no Task 12 edit touches `Input-Text-Base/platforms/ios/**`; the guard finds no read there to repair | 12.1 |

## Files I expect to touch outside Task 12's Primary Artifacts

Named before code:
- `.kiro/specs/129-consumer-generation-completeness/completion/task-12-*.md`, `docs/specs/129-consumer-generation-completeness/task-12-summary.md`, `tasks.md` checkboxes: Conventions.
- `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md`, `2026-09-26-native-component-theme-hardcoding.md`, `2026-11-04-progress-bar-native-theme-reads-malformed.md`: standing scope (`.kiro/issues/**`), owner lines.
- `.github/in-lane-guards.json`: only if a guard needs registering; I do not expect to.

## Found later

- **unlisted** (2026-11-07, 12.2; criteria C5–C8): amendment 9's message-keyed row 2 pattern `Q` (`crossread-lina.md` § 1) is an instrument the block never named; the criterion that uses it is not yet written. State: not yet an artifact (the coordinator drafts it). Route: the completion doc cites it once amendment 9 has merged.
- **unlisted** (2026-11-07, 12.2; C3–C8): `docs/tokens.css`, rewritten by a test run in the worktree and committed in `dfdc47760`, restored in the next checkpoint. It is not a Task 12 artifact.
- **misfit** (2026-11-07, 12.3; C9): the block's row 3 said dispatched runs would catch a wrong `ripple` import, and they did (run 42411441442, `Unresolved reference 'ripple'` for `androidx.compose.material.ripple.ripple`); the fault was my import choice, not the instrument. Fixed to `androidx.compose.material3.ripple`.
