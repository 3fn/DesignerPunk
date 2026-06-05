# Missing `sync` / `update` CLI Command

**Date**: 2026-06-01
**Version**: 11.8.0
**Reporter**: Thurgood (during upgrade from ^11.7.1 → 11.8.0)

## Problem

`npx designerpunk init` uses "never overwrite" semantics — it adds new files but skips existing ones. Package updates that modify existing steering docs, agent prompts, or agent configs are silently ignored. The consumer has no way to know files are stale without manually diffing against `node_modules/@3fn/core/`.

## Impact

After installing 11.8.0, the project was missing:
- 2 new steering docs (only discoverable by manual comparison)
- Content updates to 8 existing steering docs
- Content updates to 6 agent files (3 prompts + 3 configs)

All required manual `cp` from `node_modules/` to resolve.

## Suggestion

Add `npx designerpunk sync` (or `npx designerpunk update`) that:
1. Diffs package content against project content
2. Reports what's new, what's changed, and what's unchanged
3. Offers to apply changes (with confirmation or `--dry-run` flag)
4. Respects a `.designerpunkignore` or similar for intentionally customized files

## Design Considerations

- "Never overwrite" is correct for `init` (first-time setup). Upgrades need a different strategy.
- Consumer customizations must be preserved — merge-aware approach or clear diff report is essential.
- Prior art: `npx next upgrade`, `npx expo upgrade`.
