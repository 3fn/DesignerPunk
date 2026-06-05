# Implementation Plan: Sync Command

**Date**: 2026-06-05
**Spec**: 111 - Sync Command
**Status**: Implementation Planning
**Dependencies**: Spec 114 (complete before ship), package cleanup (avatar-sizing.tokens.ts removal)

---

## Implementation Plan

Implementation follows a layered approach: infrastructure first (resolution, scanning, manifest), then core logic (classification, ignore), then UX layer (reporting, prompting), then integration (CLI wiring, apply, transforms), and finally documentation.

---

## Task List

- [x] 1. Sync Infrastructure

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Package resolution works across standard and monorepo layouts
  - File scanning produces correct hashes for all managed directories
  - Manifest loads, saves, and bootstraps correctly
  - Ignore filter parses .gitignore-style patterns

  **Primary Artifacts:**
  - `src/cli/sync/PackageResolver.ts`
  - `src/cli/sync/FileScanner.ts`
  - `src/cli/sync/Manifest.ts`
  - `src/cli/sync/IgnoreFilter.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/111-sync-command/completion/task-1-completion.md`
  - Summary: `docs/specs/111-sync-command/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Sync Infrastructure"`
  - Verify: Check GitHub for committed changes

  - [x] 1.0 Remove duplicate avatar-sizing.tokens.ts from package
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Delete `src/components/core/Avatar-Base/avatar-sizing.tokens.ts` (duplicate of `avatar.tokens.ts`, causes double-registration)
    - Verify `npm test` still passes (no remaining references)
    - _Requirements: pre-requisite for sync — prevents reintroduction of known-problematic file_

  - [x] 1.1 Create sync directory structure and PackageResolver
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Create `src/cli/sync/` directory
    - Extract `rewriteBuildImports` from `init.ts` to `src/cli/shared/transforms.ts`; update `init.ts` to import from shared location; verify existing init tests pass
    - Implement `PackageResolver.ts`:
      - Use `require.resolve('@3fn/core/package.json', { paths: [projectRoot] })` + `path.dirname()`
      - Fallback to `node_modules/@3fn/core` if resolve fails
      - Read version from package.json
      - Throw clear error if not installed
    - Write unit tests
    - _Requirements: R1 AC1, R1 AC3_

  - [x] 1.2 Implement FileScanner
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `FileScanner.ts`:
      - Accept root path and `ManagedDir[]`
      - Recursively scan directories, excluding `ManagedDir.excludeDirs` patterns (e.g., `__tests__/`, `generated/`)
      - Handle missing directories gracefully (return empty array, not throw)
      - Compute SHA-256 hash per file
      - Return `ScannedFile[]` with relativePath, absolutePath, hash, tier
    - Define `MANAGED_DIRS` constant with tier assignments and excludeDirs
    - Write unit tests (mock fs or use temp dirs)
    - _Requirements: R1 AC2, R1 AC4-5_

  - [x] 1.3 Implement Manifest load/save/bootstrap
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `Manifest.ts`:
      - `loadManifest()`: read `.kiro/sync-manifest.json`, parse, return or null
      - `saveManifest()`: write JSON with version, timestamp, file entries
      - `bootstrapManifest()`: create from current project state (hash all files with package counterparts)
      - Handle corrupt/missing JSON gracefully (treat as first-time)
    - Write unit tests (roundtrip, bootstrap, corrupt file recovery)
    - _Requirements: R3 AC1-5_

  - [x] 1.4 Implement IgnoreFilter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Add `minimatch` and `diff` as direct `dependencies` in `package.json`
    - Implement `IgnoreFilter.ts`:
      - Load `.designerpunkignore` from project root
      - Parse with .gitignore v1 subset (globs, exact paths, `#` comments, anchor on `/`, `**` recursion; negation patterns deferred to v2)
      - Use `minimatch` for glob matching
      - Return `IgnoreFilter` object with `isIgnored(relativePath)` method
      - Handle missing file (return filter that ignores nothing)
    - Write unit tests (globs, exact, comments, empty, missing file)
    - _Requirements: R8 AC1-2_

---

- [x] 2. Classification Engine

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All classification paths produce correct results (new, updated-safe, conflict, unchanged, removed)
  - First-time sync classifies correctly (no manifest)
  - Ignored files never appear in results
  - Consumer-created files (in project but not package) never appear

  **Primary Artifacts:**
  - `src/cli/sync/Classifier.ts`
  - `src/cli/sync/__tests__/Classifier.test.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/111-sync-command/completion/task-2-completion.md`
  - Summary: `docs/specs/111-sync-command/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Classification Engine"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Implement Classifier
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Sparky
    - Implement `Classifier.ts` with `classifyFiles()`:
      - Iterate package files only (package-direction guarantee)
      - For each: look up project file hash and manifest entry
      - Apply classification logic per design table
      - Detect removed files (in manifest but not in package)
      - Exclude ignored files
    - Write comprehensive unit tests covering all classification paths:
      - New file (in package, not in project)
      - Updated-safe (manifest matches project, package differs)
      - Conflict (manifest differs from project, package differs)
      - Unchanged (package hash == project hash)
      - First-encounter conflict (no manifest entry, hashes differ)
      - Removed from package (in manifest, not in package)
      - Ignored file (matches .designerpunkignore)
      - Consumer-created file (in project, not in package — should not appear)
    - _Requirements: R2 AC1-6_

---

- [x] 3. UX Layer (Reporting and Prompting)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Report output matches design spec format (grouped, colored, with counts)
  - Interactive prompts work correctly with skip/overwrite/diff
  - Diff displays unified format with ANSI coloring
  - Non-TTY detection triggers auto dry-run

  **Primary Artifacts:**
  - `src/cli/sync/Reporter.ts`
  - `src/cli/sync/Prompter.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/111-sync-command/completion/task-3-completion.md`
  - Summary: `docs/specs/111-sync-command/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: UX Layer"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Implement Reporter
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `Reporter.ts`:
      - Format grouped output: 📥 New, 🔄 Updated, ⚠️ Conflicts, 📋 Source updates, ✓ Unchanged
      - Include file counts per group
      - Show reasons for conflicts ("locally modified")
      - Show context for source updates ("unchanged by you — package updated")
      - Report removed files as informational warnings
    - Write unit tests (verify output format for each classification group)
    - _Requirements: R9 AC1-4_

  - [x] 3.2 Implement Prompter with interactive conflict resolution
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `Prompter.ts`:
      - Use `readline.createInterface` for prompts
      - Per-conflict: display `[s]kip / [o]verwrite / [d]iff`
      - On `diff`: compute unified diff, display with ANSI colors (green/red), re-prompt
      - On `skip`: record decision, continue
      - On `overwrite`: record decision, continue
      - For source-tier batch: `Apply N source updates? [Y/n/list]`
      - Detect binary files: offer only skip/overwrite (no diff)
    - Guard: check `process.stdin.isTTY` — if false, return dry-run mode
    - Write tests (mock readline, verify decision recording)
    - _Requirements: R5 AC1-5, R6 AC3_

---

- [x] 4. Apply Logic and CLI Integration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Files are correctly copied from package to project
  - Content transforms applied to source-tier .ts files
  - Manifest updated after successful applies
  - --dry-run applies nothing
  - --force overwrites all without prompting
  - CLI entry point wired correctly

  **Primary Artifacts:**
  - `src/cli/sync/Applier.ts`
  - `src/cli/sync/transforms.ts`
  - `src/cli/sync/index.ts`
  - `src/cli/designerpunk.ts` (modified — add `sync` command)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/111-sync-command/completion/task-4-completion.md`
  - Summary: `docs/specs/111-sync-command/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Apply Logic and CLI Integration"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Implement content transforms
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/cli/sync/transforms.ts`
    - Import and reuse `rewriteBuildImports` from init (or extract shared utility)
    - Apply transform only to source-tier `.ts` files during copy
    - Write unit tests (verify transform applied to .ts, skipped for .md/.json)
    - _Requirements: R4 AC4, R7 AC3_

  - [x] 4.2 Implement Applier
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Implement `Applier.ts`:
      - `applyFile()`: read from package, apply transform if .ts source-tier, write to project
      - Handle governance tier: apply directly (auto-apply for new + updated-safe)
      - Handle source tier: apply only after confirmation
      - Handle force mode: apply all without prompting, log warnings for conflicts
      - Update manifest entries for each applied file
      - Create parent directories if needed
    - Write unit tests (mock fs, verify copy + transform + manifest update)
    - _Requirements: R4 AC1-3, R7 AC1-2_

  - [x] 4.3 Implement runSync entry point and wire CLI
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Create `src/cli/sync/index.ts` with `runSync(options)`:
      - Orchestrate: resolve → load manifest → load ignore → scan → classify → report → apply → save manifest
      - Handle --dry-run (report only)
      - Handle --force (apply all without prompts)
      - Handle non-TTY (auto dry-run)
    - Add `sync` case to `designerpunk.ts` switch statement
    - Parse --dry-run and --force flags from process.argv
    - Write integration tests (full flow with mock fs)
    - _Requirements: R1 AC1-4, R6 AC1-3, R7 AC1-3_

---

- [x] 5. Documentation and Polish

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - CLI --help includes sync command with flags
  - Integration Guide has Upgrading section
  - init suggests sync for future upgrades
  - Default .designerpunkignore created by init
  - Full test suite passes

  **Primary Artifacts:**
  - `.kiro/steering/DesignerPunk-Integration-Guide.md` (modified)
  - `src/cli/designerpunk.ts` (modified — printHelp)
  - `src/cli/init.ts` (modified — add .designerpunkignore + sync suggestion)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/111-sync-command/completion/task-5-completion.md`
  - Summary: `docs/specs/111-sync-command/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Documentation and Polish"`
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Update CLI help and Integration Guide
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Sparky
    - Add `sync` to `printHelp()` in `designerpunk.ts` with `--dry-run` and `--force` flags
    - Add "Upgrading" section to DesignerPunk-Integration-Guide.md documenting sync workflow
    - Include example output and flag descriptions
    - _Requirements: R10 AC1-2_

  - [x] 5.2 Update init to create .designerpunkignore and suggest sync
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Modify `init.ts` to create default `.designerpunkignore` with comment header
    - Add post-init message: "💡 After future upgrades, run `npx designerpunk sync` to apply updates."
    - Write test verifying .designerpunkignore creation and message output
    - _Requirements: R8 AC3-4, R10 AC3_

  - [x] 5.3 Run full test suite and verify backward compatibility
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Sparky
    - Run `npm test` — all existing tests must pass
    - Verify `init` still works unchanged (sync additions are additive)
    - Verify no TypeScript compilation errors
    - Manual smoke test: run sync in a test project
    - _Requirements: all_
