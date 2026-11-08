# Task 16.3 Completion: regenerate the agent layer for Kenya and Data

**Spec**: 129-consumer-generation-completeness
**Agent**: Lina

## What changed

- First regeneration (`80c29bb84`): the repository generator rewrote Kenya's and Data's generated outputs from Thurgood's committed charter, overlay and operative-set text. 20 files: `.claude/agents`, `.kiro/agents` prompts and `canonical/_consumer-output`, with attribution sidecars. No manifest was rewritten.
- Second regeneration (`e10072c9d`): after Kenya and Data each corrected one false sentence in their theming text. 10 files, the same Kenya and Data outputs.
- Only generated outputs were committed. No output was hand-edited, `canonical/generated.lock` was not refreshed and no `canonicalHash` moved.
- Lock refresh: made at b04322499 on `main`'s merge into U11, after U5 (#774) merged.

## Targeted checks run, and their results

- `npx tsx tools/agent-generator/diff-guard.ts` after the first regeneration: stale on 11 rows (6 operative-set confirmations, 5 dispositions signatures), unsigned-routed 0. Expected: signatures and the lock are still to come.
- The same check after the second regeneration: stale on 9 rows, unsigned-routed 0.
- After the lock refresh (b04322499): `diff-guard: full-run-green (input-closure-changed)`, stale 0, unsigned-routed 0; only `canonical/generated.lock` changed.

## Application-time adaptations

- A second regeneration was needed because the theming text was corrected after the first one.
- The MCP dists (`build:mcp`, docs and application servers) had to be built in the fresh worktree before the generator would boot.
