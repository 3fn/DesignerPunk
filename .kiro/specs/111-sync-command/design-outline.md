# Design Outline: Sync Command

**Spec**: 111 - Sync Command
**Date**: 2026-06-01
**Status**: Design Outline (R2 — open questions resolved)
**Agent**: Thurgood (formalization) + Sparky (implementation)

---

## Problem Statement

`npx designerpunk init` uses "never overwrite" semantics — it adds new files but preserves existing ones. When consumers upgrade `@3fn/core` (e.g., 11.7.1 → 11.8.0), modified steering docs, agent prompts, and agent configs are silently ignored. The consumer has no way to know files are stale without manually diffing against `node_modules/@3fn/core/`.

After installing 11.8.0, one product team was missing 2 new steering docs, content updates to 8 existing steering docs, and updates to 6 agent files — all requiring manual `cp` from `node_modules/` to resolve.

---

## Proposed Solution

Add `npx designerpunk sync` command that:
1. Compares package content against project content
2. Reports what's new, what's changed, and what's unchanged
3. Auto-applies safe governance updates; interactively prompts for conflicts
4. Respects intentional consumer customizations via manifest tracking

---

## Scope

### In Scope
- New CLI command: `npx designerpunk sync`
- File comparison: package vs project for all managed directories
- Two-tier handling:
  - **Governance files** (`.kiro/steering/`, `.kiro/agents/`, `.kiro/skills/`): auto-apply if consumer hasn't modified
  - **Source files** (`src/tokens/`, `src/types/`, `src/components/core/`): always confirm, even if unchanged by consumer
- Diff reporting: new files, changed files, unchanged files, conflicts
- Manifest tracking: `.kiro/sync-manifest.json` (committed to git) stores hash of each file at last sync
- Interactive conflict resolution: per-file skip/overwrite/diff prompts
- `--dry-run` flag: preview without applying
- `--force` flag: overwrite all conflicts without prompting (factory reset)
- `.designerpunkignore` file for "never touch this" overrides

### Out of Scope
- Three-way merge (too complex for v1 — report conflicts, don't auto-resolve)
- Git integration (don't auto-commit)
- Rollback mechanism (consumer can use git for that)
- Partial directory sync flags (no `--only-steering` etc. in v1)
- CI/automated execution (manual command only)

---

## Architecture

### Sync Flow

```
npx designerpunk sync
  │
  ├── 1. Resolve package root (node_modules/@3fn/core)
  ├── 2. Load manifest (.kiro/sync-manifest.json) — or empty if first sync
  ├── 3. Load .designerpunkignore (if exists)
  │
  ├── 4. For each managed directory:
  │       ├── Scan package files
  │       ├── Scan project files
  │       ├── Compare hashes (package vs project vs manifest)
  │       └── Classify: new | updated-safe | conflict | unchanged | ignored
  │
  ├── 5. Report summary (grouped by action)
  │
  ├── 6. Apply:
  │       ├── New files → copy (governance: auto, source: confirm)
  │       ├── Updated-safe → overwrite (governance: auto, source: confirm)
  │       ├── Conflicts → prompt per-file (skip/overwrite/diff)
  │       │     └── --force: overwrite all without prompting
  │       └── Ignored → skip silently
  │
  └── 7. Update manifest with new hashes for all applied files
```

### Classification Logic

For each file that exists in the package:

| Project File | Manifest Entry | Project Hash vs Manifest | Classification |
|:---:|:---:|:---:|---|
| Missing | — | — | **New** (file doesn't exist in project) |
| Exists | None | — | **Conflict** (file exists but was never synced — consumer-created or pre-manifest) |
| Exists | Matches project | — | **Updated-safe** (consumer hasn't edited since last sync) |
| Exists | Doesn't match project | — | **Conflict** (consumer modified since last sync) |

Then compare package hash to determine if update is needed:
- Package hash == project hash → **Unchanged** (already current)
- Package hash != project hash → apply classification above

### Two-Tier Apply Behavior

| Tier | Directories | New Files | Updated-safe | Conflicts |
|------|-------------|-----------|--------------|-----------|
| **Governance** (managed) | `.kiro/steering/`, `.kiro/agents/`, `.kiro/skills/` | Auto-apply | Auto-apply | Prompt (skip/overwrite/diff) |
| **Source** (confirm-all) | `src/tokens/`, `src/types/`, `src/components/core/` | Confirm | Confirm | Prompt (skip/overwrite/diff) |

Rationale: Governance files are system-managed markdown/JSON that can't break a build. Source files are consumer-editable code that can break compilation.

**Package-direction guarantee**: Sync only iterates files that exist in the package. Consumer-created files (e.g., product-specific component tokens, custom theme directories) never appear in sync reports and are never touched.

### Content Transforms

When copying source-tier `.ts` files, sync applies the same `rewriteBuildImports()` transform that `init` applies. This ensures import paths are correct for the consumer's project structure (e.g., `import { defineComponentTokens } from '@3fn/core/build'` instead of relative paths internal to the package).

Without this, synced source files could have stale relative imports that worked inside the package but fail in consumer repos.

### Edge Cases

**Files deleted from package between versions**: Report as "⚠️ Removed from package: [file]" (informational warning). Do not auto-delete. Consumer decides whether to keep or remove.

**Non-TTY stdin** (CI/piped input): Behave as `--dry-run` automatically. Prevents accidental applies in automated environments. Print: "Non-interactive environment detected — running in dry-run mode."

**First-time sync (no manifest)**: Bootstrap mode — hash all project files that have a package counterpart, write manifest, report: "📋 First sync — manifest created (N files tracked)." Do not treat existing files as conflicts.

**Binary files**: SHA-256 works on binaries, but `diff` prompt is meaningless. Detect binary (null bytes in first 512 bytes) and offer only skip/overwrite (no diff option).

---

## Key Design Decisions

### Decision 1: Diff Strategy — Content Hash (SHA-256)

Simple, deterministic, no false positives from formatting. If the hash differs, the file changed. Consumer can inspect with the `diff` option during interactive prompts.

### Decision 2: Manifest — Committed at `.kiro/sync-manifest.json`

Committed to git so the team shares sync state. When one developer syncs, the PR shows manifest changes alongside content changes. Avoids "works on my machine" divergence. Merge conflicts in the manifest are trivial (last-write-wins on auto-generated JSON).

### Decision 3: Interactive Conflict Resolution

Normal `sync` prompts per-conflict:
```
⚠️  Conflict: .kiro/agents/leonardo-prompt.md (locally modified)
    [s]kip / [o]verwrite / [d]iff ?
```

`--force` overrides all prompts, overwrites everything, logs what was overwritten with warnings.

`--dry-run` reports only, applies nothing, shows what *would* happen.

### Decision 4: Two-Tier File Handling

Governance files (markdown, JSON configs) are safe to auto-apply — they can't break builds. Source files (TypeScript) always require confirmation because they can break compilation and are more likely to have intentional consumer edits.

The tier is determined by directory path, not file type. A single flag per file in the manifest (`managed: true/false`) tracks this, defaulting based on directory.

---

## Output Format

```
npx designerpunk sync

📦 Comparing @3fn/core@11.8.0 against project...

📥 New files (2):
  .kiro/steering/Web-Authoring-Standards.md
  .kiro/skills/android/edge-to-edge/SKILL.md

🔄 Updated (auto-applying) (6):
  .kiro/steering/platform-implementation-guidelines.md
  .kiro/steering/Component-Development-Guide.md
  .kiro/agents/sparky-prompt.md
  .kiro/agents/sparky.json
  .kiro/agents/ada-prompt.md
  .kiro/agents/ada.json

⚠️  Conflicts (1):
  .kiro/agents/leonardo-prompt.md (locally modified)
    [s]kip / [o]verwrite / [d]iff ? _

📋 Source updates (confirm individually) (3):
  src/tokens/SpacingTokens.ts (unchanged by you — package updated)
  src/types/PrimitiveToken.ts (unchanged by you — package updated)
  src/components/core/Avatar-Base/avatar.tokens.ts (unchanged by you — package updated)
    Apply 3 source updates? [Y/n/list]

✓ Unchanged (74)
```

---

## Manifest Format

`.kiro/sync-manifest.json`:
```json
{
  "version": "11.8.0",
  "syncedAt": "2026-06-01T17:15:00.000Z",
  "files": {
    ".kiro/steering/Core Goals.md": {
      "hash": "a1b2c3d4...",
      "managed": true
    },
    "src/tokens/SpacingTokens.ts": {
      "hash": "e5f6g7h8...",
      "managed": false
    }
  }
}
```

---

## Dependencies

- Spec 114 (Generation Pipeline Data Flow) — should complete first so that synced source files integrate with the fixed pipeline
- `init` command — `sync` reuses the same directory/file list that `init` copies
- **Package cleanup (pre-requisite)**: Remove `src/components/core/Avatar-Base/avatar-sizing.tokens.ts` from the package before sync ships. This duplicate token file causes double-registration conflicts (documented in `.kiro/issues/ada-2026-05-09-generator-bypass.md`). Consumers who hit this bug deleted the file locally — sync would reintroduce it as a "new file" if the package still ships it. Fix at source, not via workaround.

---

## Success Criteria

1. After `npm install @3fn/core@<new-version>`, running `npx designerpunk sync` shows all new/changed files
2. Governance files are auto-applied without prompting (when consumer hasn't edited)
3. Source files always require confirmation before applying
4. Consumer-modified files are flagged as conflicts with interactive resolution
5. `--dry-run` shows what would happen without applying
6. `--force` applies everything (including conflicts) with logged warnings
7. `.designerpunkignore` files are never touched
8. Manifest tracks sync state for future runs

---

## Stakeholder Review

- **Sparky** — implementer (CLI/Node tooling)
- **Ada** — reviewer (token/component source sync affects her domain)
- **Thurgood** — formalization and governance boundaries
