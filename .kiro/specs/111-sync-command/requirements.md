# Requirements Document: Sync Command

**Date**: 2026-06-05
**Spec**: 111 - Sync Command
**Status**: Requirements Phase
**Dependencies**: Spec 114 (complete before ship), package cleanup (avatar-sizing.tokens.ts removal)

---

## Introduction

`npx designerpunk init` uses "never overwrite" semantics, causing package updates to be silently ignored during upgrades. This spec adds `npx designerpunk sync` — a command that detects stale files, reports differences, and applies updates with two-tier handling (governance auto-applies, source confirms) while respecting consumer customizations.

---

## Requirements

### Requirement 1: Package Comparison

**User Story**: As a developer who just upgraded `@3fn/core`, I want to see what files are new or changed, so that I know what I'm missing.

#### Acceptance Criteria

1. WHEN `sync` is run THEN it SHALL resolve the installed `@3fn/core` package location using `require.resolve` (supporting monorepos and hoisted deps)
2. WHEN `sync` is run THEN it SHALL compare package content against project content using SHA-256 content hashes
3. WHEN `sync` is run AND `@3fn/core` is not installed THEN it SHALL exit with error: "❌ @3fn/core not installed. Run `npm install` first."
4. WHEN `sync` is run THEN it SHALL only iterate files that exist in the package (package-direction guarantee — consumer-created files are never reported)
5. WHEN scanning managed directories THEN `__tests__/` and `generated/` subdirectories SHALL be excluded from scanning (matching `init` behavior)

---

### Requirement 2: File Classification

**User Story**: As a developer, I want sync to correctly identify whether each file is new, safely updatable, conflicting, or unchanged, so that I can make informed decisions.

#### Acceptance Criteria

1. WHEN a file exists in the package but NOT in the project THEN it SHALL be classified as **New**
2. WHEN a file exists in both AND the project hash matches the manifest hash (consumer hasn't edited) AND the package hash differs from the project hash THEN it SHALL be classified as **Updated-safe**
3. WHEN a file exists in both AND the project hash does NOT match the manifest hash (consumer edited) AND the package hash differs from the project hash THEN it SHALL be classified as **Conflict**
4. WHEN a file exists in both AND the package hash equals the project hash THEN it SHALL be classified as **Unchanged**
5. WHEN a file exists in both AND no manifest entry exists (first encounter) AND hashes differ THEN it SHALL be classified as **Conflict**
6. WHEN a file exists in the manifest but NOT in the package (removed upstream) THEN it SHALL be reported as "Removed from package" (informational warning, no auto-delete)

---

### Requirement 3: Manifest Tracking

**User Story**: As a team, we want sync state shared via git, so that everyone knows what version was last synced.

#### Acceptance Criteria

1. WHEN sync applies changes THEN it SHALL update `.kiro/sync-manifest.json` with the content hash of each applied file
2. The manifest SHALL include the synced package version and timestamp
3. The manifest SHALL store a `managed` flag per file (true for governance tier, false for source tier)
4. WHEN first-time sync is run (no manifest exists) THEN it SHALL bootstrap by hashing all project files with package counterparts, recording the project file's current hash as baseline for future edit detection, and writing the manifest without treating files as conflicts
5. The manifest SHALL be committed to git (not gitignored)

---

### Requirement 4: Two-Tier Apply Behavior

**User Story**: As a developer, I want governance files (steering docs, agent configs) to auto-update safely, while source files (tokens, components) always ask for confirmation, so that my build doesn't break unexpectedly.

#### Acceptance Criteria

1. WHEN a governance-tier file (`.kiro/steering/`, `.kiro/agents/`, `.kiro/skills/`) is classified as New or Updated-safe THEN it SHALL be auto-applied without prompting
2. WHEN a source-tier file (`src/tokens/`, `src/types/`, `src/components/core/`) is classified as New or Updated-safe THEN it SHALL require explicit confirmation before applying
3. WHEN any file is classified as Conflict THEN it SHALL prompt interactively: skip / overwrite / diff
4. WHEN a source-tier `.ts` file is applied THEN the `rewriteBuildImports()` transform SHALL be applied (same as `init`)

---

### Requirement 5: Interactive Conflict Resolution

**User Story**: As a developer with locally customized files, I want to decide per-file whether to keep my changes or accept the package version, so that I have granular control.

#### Acceptance Criteria

1. WHEN a conflict is encountered THEN the CLI SHALL prompt: `[s]kip / [o]verwrite / [d]iff`
2. WHEN the user selects `diff` THEN the CLI SHALL display an in-terminal unified diff with ANSI coloring
3. WHEN the user selects `diff` THEN the CLI SHALL re-prompt with skip/overwrite after displaying the diff
4. WHEN the user selects `skip` THEN the file SHALL not be modified and the manifest SHALL not be updated for that file
5. WHEN the user selects `overwrite` THEN the package version SHALL replace the project file and the manifest SHALL be updated

---

### Requirement 6: Dry-Run Mode

**User Story**: As a developer, I want to preview what sync would do before it does anything, so that I can assess the impact.

#### Acceptance Criteria

1. WHEN `sync --dry-run` is run THEN it SHALL report all classifications (new, updated, conflicts, unchanged) without applying any changes
2. WHEN `sync --dry-run` is run THEN it SHALL NOT modify any project files or the manifest
3. WHEN `sync` is run in a non-TTY environment (`!process.stdin.isTTY`) AND `--force` is NOT specified THEN it SHALL automatically behave as `--dry-run` with message: "Non-interactive environment detected — running in dry-run mode."
4. WHEN `sync --force` is run in a non-TTY environment THEN `--force` SHALL override the non-TTY dry-run guard and apply all changes without prompting

---

### Requirement 7: Force Mode

**User Story**: As a developer who wants to reset to upstream baseline, I want `--force` to overwrite everything without prompting, so that I can do a factory reset.

#### Acceptance Criteria

1. WHEN `sync --force` is run THEN all New, Updated-safe, and Conflict files SHALL be applied without prompting
2. WHEN `--force` overwrites a Conflict file THEN the CLI SHALL log: "⚠️ overwritten (was locally modified): [path]"
3. WHEN `--force` is used THEN content transforms SHALL still be applied to source-tier `.ts` files

---

### Requirement 8: Ignore Mechanism

**User Story**: As a developer who intentionally customized certain files, I want to permanently exclude them from sync, so that I'm never prompted about them.

#### Acceptance Criteria

1. WHEN a file path matches an entry in `.designerpunkignore` THEN it SHALL be excluded from all sync operations (no report, no prompt, no apply)
2. `.designerpunkignore` SHALL support `.gitignore` semantics (glob patterns, exact paths, comments with `#`, anchor on `/`)
3. `.designerpunkignore` SHALL be committed to git (shared team configuration)
4. WHEN `init` creates a new project THEN it SHALL create a default `.designerpunkignore` with a comment header explaining the format

---

### Requirement 9: Reporting

**User Story**: As a developer, I want clear, grouped output showing what's new, what's changing, and what conflicts exist, so that I can quickly understand the sync state.

#### Acceptance Criteria

1. WHEN sync completes scanning THEN it SHALL display a grouped summary: New files, Updated (auto-applying), Conflicts, Source updates (confirm), Unchanged count
2. WHEN sync reports a conflict THEN it SHALL show the file path and reason (e.g., "locally modified")
3. WHEN sync reports source updates THEN it SHALL note whether the consumer modified the file (e.g., "unchanged by you — package updated")
4. WHEN files are deleted from the package THEN it SHALL display: "⚠️ Removed from package: [file]" as informational warning

---

### Requirement 10: Documentation

**User Story**: As a developer new to DesignerPunk, I want to discover and understand the sync command, so that I use it during upgrades.

#### Acceptance Criteria

1. The `sync` command SHALL appear in `npx designerpunk --help` output with flags (`--dry-run`, `--force`)
2. The DesignerPunk Integration Guide SHALL include an "Upgrading" section documenting the `sync` workflow
3. WHEN `init` completes successfully THEN it SHALL display a message suggesting `sync` for future upgrades
