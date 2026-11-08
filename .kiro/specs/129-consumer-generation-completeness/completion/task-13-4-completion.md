# Task 13.4 Completion: The hand-written enums; row 18 R1; the missing-key report

**Date**: 2026-11-08
**Task**: 13.4 (Spec 129, Unit 8, parent 13)
**Agent**: Lina (Sonnet, as planned; Ada consulted on `src/cli/sync/**`)
**Branch**: `task/129-13-lina`, cut from Ada's unit head `9ec69be2e`

## 1. What changed

- **Hand-written enums removed (Req 5.1).**
  - `Avatar.ios.swift`: `enum AvatarTokens` deleted; `iconSizeXs` and `iconSizeXxl` now read the generated `AvatarTokens`. Border widths read `DesignTokens.borderWidth100` and `borderWidth200`; the heavy opacity reads `DesignTokens.opacity048`. The unused `borderColorXxl` went with the enum.
  - `BadgeLabelBase.ios.swift`: `enum BadgeLabelBaseTokens` deleted; `maxWidth` reads the generated enum; the corner radius reads `DesignTokens.radius025`.
  - `Avatar.android.kt`: the local `object AvatarTokens` and the `GeneratedAvatarTokens` import alias are gone. The generated `com.designerpunk.tokens.AvatarTokens` is imported under its own name, and border widths and opacity read `DesignTokens.border_width_100`, `border_width_200` and `opacity_heavy`. The name has one meaning.
  - `harness/expected/harness-android-components.tsv`: the two Avatar rows (`Unresolved reference 'AvatarTokens'`, `'GeneratedAvatarTokens'`) are removed, since the collision they record is resolved here. Unverified until the harness context runs on U8's PR.
- **Row 18 R1 (Req 5.7).** `src/cli/sync/Migration.ts`: `isSingleFamilyTokenFile` (one `defineComponentTokens(` call outside comments, primitives imported from two or more token families), a scan of `src/tokens/component/*.ts` and the `tokens.ts` / `*.tokens.ts` files under `src/components/core/<Name>/`, `MigrationAssessment.singleFamilyTokenFiles`, and `singleFamilyTokenFilesMessage`, which names each file by path and offers the record's fix (re-copy the package's split version, or split the call).
- **Missing-key report (Req 5.11).** New `src/cli/sync/ReplacedGroups.ts` (`findReplacedGroupGaps`, `replacedGroupGapLines`), called from Ada's `ComponentTier.ts` with a three-line hook, so `sync/index.ts` is untouched. A package entry in a group the consumer declares, whose key their source lacks, whose defining component is a package-rank winner, is reported by key and component.

## 2. Targeted tests run

- `npx jest src/cli/__tests__/replacedGroups.test.ts src/cli/__tests__/sync.migration.test.ts`: 57 passed (3 new `replacedGroups` cases; 3 new row 18 R1 cases).
- `Consumer Guard`, `-t "Spec 129 Task 13"` against a tarball packed from this branch: 11 passed, including the new case "a group of theirs that lacks a key our component reads: sync reports the key and the component (Req 5.11)".
- `npx jest src/cli src/components/core/Avatar-Base src/components/core/Badge-Label-Base`: 1052 passed; 2 failed in `init.overRewriteArbiter.test.ts`, both `ENOENT scandir node_modules` (the fresh worktree has no `node_modules`; the same two fail with my changes stashed). `tsc --noEmit` clean.

## 3. Application-time adaptations

- The Swift and Kotlin edits were not compiled here (no toolchain); the four harness contexts on U8's PR are the instrument.
- `BadgeLabelBase.android.kt` is unchanged: its private `BadgeLabelBaseTokens` refers to itself (a recursive type-check error already in the Android components list, tagged to the repair record) and does not collide with the generated object by import. The Req 5.1 criterion names the iOS enums and the Avatar Android collision only.
- The token-context rows for `AvatarTokens` and `BadgeLabelBaseTokens` (`harness-ios-tokens.tsv`, `harness-android-tokens.tsv`, probe keys) are the third source's, not this subtask's; they leave when the harness observes the third source on.
- The row 18 R1 detection is a text approximation of the #127 family guard, as `scanTokenFiles` is of the brand count; the migration never executes copied `.ts`.
- Files outside the Primary Artifacts list: `src/cli/sync/Migration.ts`, `src/cli/sync/ReplacedGroups.ts`, `src/cli/sync/ComponentTier.ts` (hook), `src/cli/__tests__/**` (sync scope, Ada consulted).
